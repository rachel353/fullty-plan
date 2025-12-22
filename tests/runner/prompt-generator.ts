/**
 * Cursor Prompt Generator
 * 
 * Generates structured prompts for Cursor to execute test cases.
 * Enforces strict JSON output format.
 */

import type { CursorPromptInput, UserRole, ViewportType } from "./types";

const ROLE_CREDENTIALS: Record<UserRole, { email: string; password: string; name: string }> = {
  C_LEVEL: { email: "clevel@litmers.com", password: "test1234", name: "김대표" },
  GA: { email: "ga@litmers.com", password: "test1234", name: "이총무" },
  MANAGER: { email: "manager@litmers.com", password: "test1234", name: "박매니저" },
  PM: { email: "pm@litmers.com", password: "test1234", name: "최PM" },
  SALES: { email: "sales@litmers.com", password: "test1234", name: "정영업" },
  DESIGNER: { email: "designer@litmers.com", password: "test1234", name: "한디자이너" },
  DEVELOPER: { email: "developer@litmers.com", password: "test1234", name: "강개발" },
  QA: { email: "qa@litmers.com", password: "test1234", name: "윤QA" },
  MULTI: { email: "multi@litmers.com", password: "test1234", name: "다중역할" },
};

const VIEWPORT_SIZES: Record<ViewportType, { width: number; height: number }> = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
};

/**
 * Generates a Cursor-executable prompt for a test case
 */
export function generateCursorPrompt(input: CursorPromptInput): string {
  const {
    testcaseId,
    testcaseName,
    preconditions,
    testSteps,
    expectedResult,
    requiredRole,
    baseUrl,
    viewport,
  } = input;

  const viewportSize = VIEWPORT_SIZES[viewport];
  const roleCredentials = requiredRole ? ROLE_CREDENTIALS[requiredRole] : null;

  const prompt = `
You are executing an automated E2E test using browser automation.

═══════════════════════════════════════════════════════════════
TESTCASE INFORMATION
═══════════════════════════════════════════════════════════════

Testcase ID: ${testcaseId}
Title: ${testcaseName}

Base URL: ${baseUrl}
Viewport: ${viewport} (${viewportSize.width}x${viewportSize.height})

${requiredRole ? `Required Role: ${requiredRole}
Login Credentials:
  - Email: ${roleCredentials?.email}
  - Password: ${roleCredentials?.password}
  - Expected User Name: ${roleCredentials?.name}
` : "Required Role: None (No login required for this test)"}

═══════════════════════════════════════════════════════════════
PRECONDITIONS
═══════════════════════════════════════════════════════════════

${preconditions.map((p, i) => `${i + 1}. ${p}`).join("\n")}

═══════════════════════════════════════════════════════════════
TEST STEPS
═══════════════════════════════════════════════════════════════

${testSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

═══════════════════════════════════════════════════════════════
EXPECTED RESULT
═══════════════════════════════════════════════════════════════

${expectedResult}

═══════════════════════════════════════════════════════════════
EXECUTION INSTRUCTIONS
═══════════════════════════════════════════════════════════════

1. Use browser automation tools (browser_navigate, browser_snapshot, browser_click, browser_type, etc.)
2. Execute each test step in order
3. Verify the expected result
4. Log each action taken
5. If any step fails, capture the error and stop

═══════════════════════════════════════════════════════════════
OUTPUT REQUIREMENTS (CRITICAL)
═══════════════════════════════════════════════════════════════

IMPORTANT: Your response MUST be valid JSON only.
- Do NOT include any markdown formatting
- Do NOT include any explanations before or after the JSON
- Do NOT use code blocks
- Output ONLY the JSON object

Return format:
{
  "testcase_id": "${testcaseId}",
  "status": "passed" | "failed",
  "logs": [
    "Step 1: Description of action taken",
    "Step 2: Description of action taken",
    ...
  ],
  "error": null | "Error description if failed"
}

═══════════════════════════════════════════════════════════════
BEGIN EXECUTION
═══════════════════════════════════════════════════════════════
`.trim();

  return prompt;
}

/**
 * Generates a simpler prompt for manual verification tests
 */
export function generateManualVerificationPrompt(input: CursorPromptInput): string {
  const { testcaseId, testcaseName, testSteps, expectedResult } = input;

  return `
Manual Verification Test

Testcase: ${testcaseId} - ${testcaseName}

Steps to verify:
${testSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Expected: ${expectedResult}

Please verify and respond with JSON only:
{
  "testcase_id": "${testcaseId}",
  "status": "passed" | "failed",
  "logs": ["verification notes"],
  "error": null | "reason for failure"
}
`.trim();
}

/**
 * Parses the Cursor response and extracts the JSON result
 */
export function parseCursorResponse(response: string): {
  testcase_id: string;
  status: "passed" | "failed";
  logs: string[];
  error: string | null;
} | null {
  try {
    // Try to parse directly
    const result = JSON.parse(response.trim());
    return result;
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}
