/**
 * Test Execution System Types
 */

// ============================================
// Testcase Types (from testcases.json)
// ============================================

export interface TestCase {
  id: string;
  name: string;
  priority: "P0" | "P1" | "P2" | "P3";
  category: string;
  userStory: string;
  preconditions: string[];
  testSteps: string[];
  expectedResult: string;
  status: "pending" | "passed" | "failed" | "skipped";
  lastRun: string | null;
  notes: string;
}

export interface TestCasesFile {
  meta: {
    createdAt: string;
    prdVersion: string;
    totalCases: number;
    categories: string[];
  };
  statistics: {
    completed: number;
    passed: number;
    failed: number;
    skipped: number;
    lastRun: string | null;
    currentStep: string | null;
  };
  testCases: TestCase[];
}

// ============================================
// Execution Types
// ============================================

export type OnFailAction = "continue" | "abort" | "skip_dependents";
export type UserRole = "C_LEVEL" | "GA" | "MANAGER" | "PM" | "SALES" | "DESIGNER" | "DEVELOPER" | "QA" | "MULTI";
export type ViewportType = "desktop" | "tablet" | "mobile";

export interface ExecutionStep {
  step: number;
  testcaseId: string;
  onFail: OnFailAction;
  requiredRole: UserRole | null;
  dependsOn: string[];
  skipIf: string | null;
  phase?: string;
}

export interface ExecutionConfig {
  baseUrl: string;
  defaultOnFail: OnFailAction;
  timeout: number;
  viewport: ViewportType;
}

export interface ExecutionFile {
  executionName: string;
  description: string;
  createdAt: string;
  config: ExecutionConfig;
  steps: ExecutionStep[];
}

// ============================================
// Result Types
// ============================================

export type TestStatus = "pending" | "passed" | "failed" | "skipped" | "aborted";

export interface TestResult {
  step: number;
  testcaseId: string;
  testcaseName: string;
  status: TestStatus;
  startedAt: string | null;
  finishedAt: string | null;
  duration: number | null;
  logs: string[];
  error: string | null;
  screenshots: string[];
}

export interface ExecutionSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  aborted: number;
}

export interface ExecutionReport {
  executionName: string;
  startedAt: string | null;
  finishedAt: string | null;
  status: "pending" | "running" | "completed" | "aborted";
  config: ExecutionConfig;
  summary: ExecutionSummary;
  results: TestResult[];
}

// ============================================
// Cursor Prompt Types
// ============================================

export interface CursorPromptInput {
  testcaseId: string;
  testcaseName: string;
  preconditions: string[];
  testSteps: string[];
  expectedResult: string;
  requiredRole: UserRole | null;
  baseUrl: string;
  viewport: ViewportType;
}

export interface CursorExecutionResult {
  testcase_id: string;
  status: "passed" | "failed";
  logs: string[];
  error: string | null;
}
