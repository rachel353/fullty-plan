
/ralph-loop:ralph-loop "
You are running inside a Ralph Loop.

🎯 Goal:
Deploy the current local workspace (Next.js App Router project)
to a Vercel Preview environment successfully.

You must keep iterating until deployment succeeds.

--------------------------------------------------
📋 Mandatory Steps:
1. Inspect the entire workspace
2. Install dependencies if needed
3. Fix ALL build, type, or runtime errors
4. Ensure Next.js App Router works correctly
5. Deploy using Vercel CLI (preview)

--------------------------------------------------
✅ Success Criteria (ALL must pass):
1. `npm run build` succeeds with no errors
2. `vercel` (or `vercel --prebuilt`) succeeds
3. A valid Vercel Preview URL is printed in output
4. No TODOs, placeholders, or partial fixes remain

--------------------------------------------------
⚙️ Configuration Rules:
- If `vercel.json` does not exist or Vercel fails to detect framework:
  → Create `vercel.json` with at least:

  {
    "framework": "nextjs",
    "buildCommand": "npm run build",
    "outputDirectory": ".next"
  }

- Modify or extend this file ONLY if required for successful deployment

--------------------------------------------------
🧠 Loop Control Rules (IMPORTANT):
- After each iteration, self-check against ALL Success Criteria
- If ANY criterion fails:
  - Explain exactly why it failed
  - Fix only what is necessary
  - Retry deployment

- If the SAME error or blocker occurs twice:
  → Change your approach instead of retrying blindly
    (e.g. config change, dependency update, build strategy change)

--------------------------------------------------
🛑 Exit Condition:
ONLY when ALL Success Criteria are satisfied,
print EXACTLY the following line:

PREVIEW_DEPLOY_SUCCESS

Do NOT stop early.
Do NOT ask the user for help.
Do NOT skip self-review." \
--completion-promise "PREVIEW_DEPLOY_SUCCESS" \
--max-iterations 10
