---
name: feature-spec
description: |
  Create or update feature-level execution specifications (docs/features/FXX_기능명_plan.md) by compiling information from existing project documents.
  Use when: (1) Starting frontend development for a feature, (2) Need consolidated context before running /frontend-design or task-level development, (3) User asks to create a feature plan or feature spec, (4) Preparing execution context for UI Tasks.
  Triggers: "feature plan", "feature spec", "기능 계획", "피처 스펙", "FXX plan"
---

# Feature Spec

Role: `feature-dev-plan`

## Purpose

Compile and re-organize existing project documents into a single, concise feature execution plan.

Output: `docs/features/FXX_기능명_plan.md`

## Source of Truth

ONLY use these sources. Do NOT invent information:

| Source | What to Extract |
|--------|-----------------|
| `docs/user_stories.json` | Purpose, intent, acceptance criteria context |
| `docs/ia.md` | Screens, routes, navigation structure |
| `docs/conceptual_model.json` | Data entities, relationships |
| `docs/logical_architecture.md` | Components, pages for each feature |
| `tasks/tasks.json` | Task list, dependencies, target files |

If information is **missing, ambiguous, or inconsistent** across documents → **ASK USER**.

## Workflow

1. **Identify feature scope**
   - Read `tasks/tasks.json` to find tasks belonging to the feature
   - Extract feature ID (FXX) and name from task metadata

2. **Gather context from sources**
   - Read all source documents listed above
   - Filter only information relevant to this feature

3. **Compile feature plan**
   - Follow output template in [references/output-template.md](references/output-template.md)
   - Keep content concise—this is execution context, not documentation

4. **Write output**
   - Create `docs/features/` directory if needed
   - Write `FXX_기능명_plan.md`

## Output Structure

See [references/output-template.md](references/output-template.md) for the complete template.

Key sections:
- Feature Overview (purpose, scope boundary)
- User Flows (summarized from user stories)
- Screens & Routes (from IA)
- Data Model (relevant entities from conceptual model)
- Component Strategy (from logical architecture)
- Task Mapping (task ID → what it implements)

## Guidelines

- **Concise over complete**: Only include what's needed for execution
- **No invention**: Every statement must trace to a source document
- **Ask when uncertain**: Better to clarify than to assume
- **Update existing**: If `FXX_plan.md` exists, update rather than recreate
