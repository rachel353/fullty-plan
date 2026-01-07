[claude] not-done yet

```
## Frontend Development Execution Rules (Mandatory)

1. **Before starting anything**, read and follow:
   * `@CLAUDE-FE-DEV.md`

2. Development is driven strictly by:
   * `@tasks.json`

3. Execute development **feature by feature**.
   * Tasks must be processed in their defined order and dependencies.

4. **When starting a new feature**:
   * You MUST run the `/feature-spec` skill first.
   * Do not start any task until the feature plan is generated or updated.

5. **For each task** within a feature:
   * You MUST use the `/frontend-design` skill.
   * Do not implement tasks without this skill.

6. Do not skip steps.
   * `feature-spec` → then `frontend-design` per task.
   * No direct coding outside this flow.

```