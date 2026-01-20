---
name: feature-executor
description: Execute feature development from tasks.json following a structured workflow. Use when the user asks to develop, implement, or build a specific feature listed in tasks.json. Triggers include "develop [feature name]", "implement feature", "build [feature]", "start working on [feature]", or any request to execute tasks from tasks.json in a coordinated manner.
---

# Feature Executor

Execute feature development from tasks.json following a mandatory workflow that ensures consistency, quality, and reviewability.

## Overview

This skill orchestrates the complete feature development workflow by:
1. Loading the feature and its tasks from tasks.json
2. Running /feature-spec to create a consolidated feature plan
3. Executing each task using /frontend-design skill
4. Ensuring all UI components are routable and reviewable

## Workflow

### Step 1: Load and Validate Feature

Read tasks.json and locate the requested feature.

```bash
# Expected user request format
"develop [feature name] feature"
"implement 독자 코어"
"start working on authentication feature"
```

**Actions:**
- Read tasks/tasks.json
- Find the feature by matching name (case-insensitive, partial match OK)
- Display feature summary: name, total tasks, task breakdown by status
- Identify the starting task (first pending task OR user-specified task ID)

**If user specifies a task ID:**
```
"develop 독자 코어 starting from task-031"
```
Skip completed tasks and start from the specified task ID.

### Step 2: Read Development Guidelines

**MANDATORY:** Before proceeding, remind the user to check:
- `jyageunfriends/CLAUDE-FE-DEV.md` - Core development patterns and requirements

You do NOT need to read this file automatically, but you MUST reference it and follow its guidelines if you have read it previously.

Key requirements from CLAUDE-FE-DEV.md:
- Monochrome design only
- Images as gray boxes (bg-muted)
- Use TanStack Query hooks for data
- Follow established code patterns (Service, Hook, Component, Page)
- Use existing type definitions

### Step 3: Run Feature Spec

**MANDATORY:** Before implementing any tasks, run the `/feature-spec` skill to generate or update the feature plan.

```
Run: /feature-spec [feature name]
```

This creates/updates `docs/features/FXX_[feature-name]_plan.md` with:
- Feature overview and acceptance criteria
- Consolidated context from design documents
- Implementation guidance

**Wait for feature spec completion before proceeding.**

### Step 4: Execute Tasks in Order

For each task in the feature (respecting dependencies):

1. **Check dependencies**: Verify all dependent task IDs are completed
2. **Run appropriate skill based on task title**:

   **If task title starts with `[Design Review]`:**
   ```
   1. Run /rams skill for files listed in the task
   2. If Critical issues found:
      - Automatically fix the issues
      - Re-run /rams (re-verify)
      - Repeat until Critical issues = 0
   3. When Critical issues = 0 → Task complete
   ```

   **Otherwise (normal tasks):**
   ```
   /frontend-design for [task title]
   ```

3. **Ensure routability**: Every UI component must be accessible via a route
   - Pages: Already routed by file structure
   - Components: Must be mounted in a page/layout
   - If no final route exists: create temporary route for review
4. **Mark task complete** in tasks.json after successful implementation

**Task execution rules:**
- Process tasks sequentially in dependency order
- Do NOT skip tasks unless user explicitly requests
- Do NOT start next task until current task is fully complete and routable
- Update task status in tasks.json: pending → in_progress → completed
- For `[Design Review]` tasks: Critical issues must be 0 before marking complete

### Step 5: Routability Verification

**CRITICAL REQUIREMENT:** All UI must be viewable in browser for human review.

**For pages:**
- Already routable by Next.js App Router file structure
- Verify route path matches IA structure

**For components:**
- Must be imported and rendered in a page
- If no page exists yet: create temporary demo page
- Route format: `/demo/[component-name]` or `/test/[feature]/[component]`

**Why this matters:**
- Enables visual verification before proceeding
- Catches layout/styling issues early
- Validates integration with navigation

### Step 6: Progress Tracking

Throughout development:
- Use TodoWrite to track task progress
- Mark tasks as in_progress when starting
- Mark tasks as completed immediately after finishing
- Update tasks.json with completion status and timestamps

## Usage Examples

**Example 1: Start a new feature**
```
User: "develop 독자 코어 feature"

Assistant workflow:
1. Read tasks/tasks.json
2. Find "독자 코어" feature (found: "독자 코어" with 16 tasks)
3. Display summary: 5 completed, 11 pending
4. Remind to check jyageunfriends/CLAUDE-FE-DEV.md
5. Run /feature-spec 독자코어
6. Wait for feature spec completion
7. Start with first pending task (task-035)
8. For task-035:
   - Verify dependencies (task-009) are complete
   - Run /frontend-design for "Episode Viewer Page UI"
   - Ensure route /stories/[storyId]/episodes/[episodeId] is accessible
   - Mark complete in tasks.json
9. Continue to next task (task-036)
```

**Example 2: Resume from specific task**
```
User: "continue 독자 코어 from task-036"

Assistant workflow:
1. Read tasks/tasks.json
2. Find "독자 코어" feature
3. Locate task-036: "ContentRenderer 컴포넌트"
4. Verify task-035 (dependency) is completed
5. Skip to task-036 and proceed
```

**Example 3: Feature with all tasks pending**
```
User: "implement authentication feature"

Assistant workflow:
1. Read tasks/tasks.json
2. Find "인증" feature (found: 10 tasks, all pending)
3. Remind to check CLAUDE-FE-DEV.md
4. Run /feature-spec 인증
5. Start from task-015 (first task)
6. Proceed sequentially through all tasks
```

## Error Handling

**Feature not found:**
- List all available features from tasks.json
- Ask user to clarify which feature they want

**Dependencies not met:**
- Display missing dependencies
- Ask if user wants to:
  - Implement dependencies first (recommended)
  - Skip dependency check (not recommended)

**No pending tasks:**
- Display "All tasks completed for [feature]"
- Ask if user wants to review or refactor

## Important Notes

1. **Never skip /feature-spec** - It provides critical context for all tasks
2. **Never skip /frontend-design** - It ensures consistent quality and design
3. **Always ensure routability** - No exceptions for "just a component"
4. **Follow dependency order** - Tasks have dependencies for a reason
5. **Update tasks.json** - Keep status current for team visibility

## Integration with Other Skills

This skill coordinates multiple skills:
- `/feature-spec` - Creates feature-level plan before task execution
- `/frontend-design` - Implements individual UI tasks
- `task-management` - Updates task status in tasks.json

Do NOT implement tasks directly without using these skills.