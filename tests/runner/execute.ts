/**
 * Test Execution Runner
 * 
 * Orchestrates test execution based on execution definition files.
 * Manages step ordering, dependencies, and result aggregation.
 */

import * as fs from "fs";
import * as path from "path";
import type {
  TestCase,
  TestCasesFile,
  ExecutionFile,
  ExecutionStep,
  ExecutionReport,
  TestResult,
  TestStatus,
  CursorPromptInput,
} from "./types";
import { generateCursorPrompt, parseCursorResponse } from "./prompt-generator";

// ============================================
// File Paths
// ============================================

const PATHS = {
  testcases: path.resolve(__dirname, "../../docs/qc/testcases.json"),
  executions: path.resolve(__dirname, "../executions"),
  reports: path.resolve(__dirname, "../reports"),
};

// ============================================
// File Loaders
// ============================================

function loadTestCases(): TestCasesFile {
  const content = fs.readFileSync(PATHS.testcases, "utf-8");
  return JSON.parse(content);
}

function loadExecution(executionName: string): ExecutionFile {
  const filePath = path.join(PATHS.executions, `${executionName}.json`);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

function saveReport(report: ExecutionReport): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${report.executionName}_${timestamp}.json`;
  const filePath = path.join(PATHS.reports, fileName);
  
  if (!fs.existsSync(PATHS.reports)) {
    fs.mkdirSync(PATHS.reports, { recursive: true });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
  return filePath;
}

// ============================================
// Test Case Lookup
// ============================================

function findTestCase(testCases: TestCase[], testcaseId: string): TestCase | null {
  return testCases.find((tc) => tc.id === testcaseId) || null;
}

// ============================================
// Dependency Resolution
// ============================================

function checkDependencies(
  step: ExecutionStep,
  results: TestResult[]
): { canRun: boolean; reason?: string } {
  if (step.dependsOn.length === 0) {
    return { canRun: true };
  }

  for (const depId of step.dependsOn) {
    const depResult = results.find((r) => r.testcaseId === depId);
    
    if (!depResult) {
      return {
        canRun: false,
        reason: `Dependency ${depId} has not been executed yet`,
      };
    }
    
    if (depResult.status === "failed" || depResult.status === "aborted") {
      return {
        canRun: false,
        reason: `Dependency ${depId} failed with status: ${depResult.status}`,
      };
    }
  }

  return { canRun: true };
}

// ============================================
// Prompt Generation
// ============================================

function createPromptInput(
  testCase: TestCase,
  step: ExecutionStep,
  config: ExecutionFile["config"]
): CursorPromptInput {
  return {
    testcaseId: testCase.id,
    testcaseName: testCase.name,
    preconditions: testCase.preconditions,
    testSteps: testCase.testSteps,
    expectedResult: testCase.expectedResult,
    requiredRole: step.requiredRole,
    baseUrl: config.baseUrl,
    viewport: config.viewport,
  };
}

// ============================================
// Execution Engine
// ============================================

export interface ExecutionOptions {
  executionName: string;
  dryRun?: boolean;
  startFromStep?: number;
  stopAtStep?: number;
  verbose?: boolean;
}

export interface StepExecutor {
  (prompt: string): Promise<string>;
}

export async function executeTests(
  options: ExecutionOptions,
  executor: StepExecutor
): Promise<ExecutionReport> {
  const { executionName, dryRun = false, startFromStep = 1, stopAtStep, verbose = false } = options;

  // Load files
  const testCasesFile = loadTestCases();
  const executionFile = loadExecution(executionName);
  const { testCases } = testCasesFile;
  const { config, steps } = executionFile;

  // Initialize report
  const report: ExecutionReport = {
    executionName,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    status: "running",
    config,
    summary: {
      total: steps.length,
      passed: 0,
      failed: 0,
      skipped: 0,
      aborted: 0,
    },
    results: [],
  };

  // Sort steps by step number
  const sortedSteps = [...steps].sort((a, b) => a.step - b.step);

  // Filter steps by range
  const stepsToRun = sortedSteps.filter((s) => {
    if (s.step < startFromStep) return false;
    if (stopAtStep && s.step > stopAtStep) return false;
    return true;
  });

  let shouldAbort = false;

  // Execute each step
  for (const step of stepsToRun) {
    if (shouldAbort) {
      // Mark remaining steps as aborted
      const result: TestResult = {
        step: step.step,
        testcaseId: step.testcaseId,
        testcaseName: "Aborted",
        status: "aborted",
        startedAt: null,
        finishedAt: null,
        duration: null,
        logs: ["Execution aborted due to previous failure"],
        error: "Aborted due to previous step failure with onFail=abort",
        screenshots: [],
      };
      report.results.push(result);
      report.summary.aborted++;
      continue;
    }

    // Find test case
    const testCase = findTestCase(testCases, step.testcaseId);
    if (!testCase) {
      const result: TestResult = {
        step: step.step,
        testcaseId: step.testcaseId,
        testcaseName: "Unknown",
        status: "failed",
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
        duration: 0,
        logs: [],
        error: `Test case ${step.testcaseId} not found in testcases.json`,
        screenshots: [],
      };
      report.results.push(result);
      report.summary.failed++;
      
      if (step.onFail === "abort") {
        shouldAbort = true;
      }
      continue;
    }

    // Check dependencies
    const depCheck = checkDependencies(step, report.results);
    if (!depCheck.canRun) {
      const result: TestResult = {
        step: step.step,
        testcaseId: step.testcaseId,
        testcaseName: testCase.name,
        status: "skipped",
        startedAt: null,
        finishedAt: null,
        duration: null,
        logs: [`Skipped: ${depCheck.reason}`],
        error: null,
        screenshots: [],
      };
      report.results.push(result);
      report.summary.skipped++;
      continue;
    }

    // Generate prompt
    const promptInput = createPromptInput(testCase, step, config);
    const prompt = generateCursorPrompt(promptInput);

    if (verbose) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`Step ${step.step}: ${testCase.id} - ${testCase.name}`);
      console.log("=".repeat(60));
    }

    if (dryRun) {
      // Dry run - just log the prompt
      const result: TestResult = {
        step: step.step,
        testcaseId: step.testcaseId,
        testcaseName: testCase.name,
        status: "skipped",
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
        duration: 0,
        logs: ["[DRY RUN] Would execute with prompt", prompt.substring(0, 200) + "..."],
        error: null,
        screenshots: [],
      };
      report.results.push(result);
      report.summary.skipped++;
      continue;
    }

    // Execute test
    const startTime = Date.now();
    let result: TestResult;

    try {
      const response = await executor(prompt);
      const parsed = parseCursorResponse(response);
      const endTime = Date.now();

      if (parsed) {
        result = {
          step: step.step,
          testcaseId: step.testcaseId,
          testcaseName: testCase.name,
          status: parsed.status as TestStatus,
          startedAt: new Date(startTime).toISOString(),
          finishedAt: new Date(endTime).toISOString(),
          duration: endTime - startTime,
          logs: parsed.logs,
          error: parsed.error,
          screenshots: [],
        };
      } else {
        result = {
          step: step.step,
          testcaseId: step.testcaseId,
          testcaseName: testCase.name,
          status: "failed",
          startedAt: new Date(startTime).toISOString(),
          finishedAt: new Date(endTime).toISOString(),
          duration: endTime - startTime,
          logs: ["Failed to parse Cursor response"],
          error: `Invalid response format: ${response.substring(0, 200)}`,
          screenshots: [],
        };
      }
    } catch (error) {
      const endTime = Date.now();
      result = {
        step: step.step,
        testcaseId: step.testcaseId,
        testcaseName: testCase.name,
        status: "failed",
        startedAt: new Date(startTime).toISOString(),
        finishedAt: new Date(endTime).toISOString(),
        duration: endTime - startTime,
        logs: [],
        error: error instanceof Error ? error.message : String(error),
        screenshots: [],
      };
    }

    report.results.push(result);

    // Update summary
    if (result.status === "passed") {
      report.summary.passed++;
    } else if (result.status === "failed") {
      report.summary.failed++;
      if (step.onFail === "abort") {
        shouldAbort = true;
      }
    } else if (result.status === "skipped") {
      report.summary.skipped++;
    }

    if (verbose) {
      console.log(`Status: ${result.status}`);
      if (result.error) {
        console.log(`Error: ${result.error}`);
      }
    }
  }

  // Finalize report
  report.finishedAt = new Date().toISOString();
  report.status = shouldAbort ? "aborted" : "completed";

  // Save report
  const reportPath = saveReport(report);
  if (verbose) {
    console.log(`\nReport saved to: ${reportPath}`);
  }

  return report;
}

// ============================================
// CLI Entry Point
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const executionName = args[0];

  if (!executionName) {
    console.error("Usage: npx ts-node execute.ts <execution_name> [--dry-run] [--verbose]");
    process.exit(1);
  }

  const dryRun = args.includes("--dry-run");
  const verbose = args.includes("--verbose");

  // Mock executor for testing
  const mockExecutor: StepExecutor = async (prompt) => {
    console.log("\n[Mock Executor] Received prompt:");
    console.log(prompt.substring(0, 500) + "...\n");
    
    // Simulate a passed test
    return JSON.stringify({
      testcase_id: "mock",
      status: "passed",
      logs: ["Mock execution completed"],
      error: null,
    });
  };

  try {
    const report = await executeTests(
      { executionName, dryRun, verbose },
      mockExecutor
    );

    console.log("\n" + "=".repeat(60));
    console.log("EXECUTION SUMMARY");
    console.log("=".repeat(60));
    console.log(`Execution: ${report.executionName}`);
    console.log(`Status: ${report.status}`);
    console.log(`Total: ${report.summary.total}`);
    console.log(`Passed: ${report.summary.passed}`);
    console.log(`Failed: ${report.summary.failed}`);
    console.log(`Skipped: ${report.summary.skipped}`);
    console.log(`Aborted: ${report.summary.aborted}`);
  } catch (error) {
    console.error("Execution failed:", error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
