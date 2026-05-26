---
name: frontend-feature-develop
description: Develop UI features through a 4-step sequential process (Spec → UI/UX → Schema/Mock → Implementation). Use when working on UI-related tasks, building new frontend features, implementing screens/pages, or when run_tasks.py detects a UI Task. Triggers include feature development, page creation, component implementation, and frontend task execution.
---

# Frontend Feature Develop

Develop UI Tasks in 4 sequential steps. When `run_tasks.py` detects a UI-related Task, invoke each step in order.

## 4-Step Process

| Step | File | Purpose |
|------|------|---------|
| 1 | [1_dev_spec.md](references/1_dev_spec.md) | Define what to build (requirements, screens, API, components) |
| 2 | [2_ui_ux_plan.md](references/2_ui_ux_plan.md) | Plan how it looks/behaves (flows, layouts, states) |
| 3 | [3_schema_mock.md](references/3_schema_mock.md) | Prepare data (types, dummy data, mock API) |
| 4 | [4_ui_dev.md](references/4_ui_dev.md) | Implement actual code (routes, components, UI) |

## Quick Reference

### Step 1: Dev Spec
- **Input**: Task info, `docs/user_stories.md`, `docs/ia_structure.md`
- **Output**: `docs/features/FXX_기능명_spec.md`
- **Actions**: Extract AC, define screens/routes, list API/Entity, plan components

### Step 2: UI/UX Plan
- **Input**: Step 1 output
- **Output**: `docs/features/FXX_기능명_ui_ux.md`
- **Actions**: Define user flows, screen layouts, responsive rules, feedback/error handling

### Step 3: Schema & Mock
- **Input**: Step 1 Entity/API definitions, `docs/conceptual_model.md`
- **Output**: `types/*.ts`, `lib/dummy-data/*.ts`
- **Actions**: Create TypeScript types, generate dummy data, (optional) mock API adapter

### Step 4: UI Dev
- **Input**: Step 2-3 outputs
- **Output**: `app/**/page.tsx`, `components/feature/**`
- **Actions**: Create routes, implement feature components, connect dummy data, handle states

## Reference Docs

Read these when executing steps:

```
docs/user_stories.md        # Requirements
docs/ia_structure.md        # Screen structure
docs/logical_architecture.md # Component design
docs/conceptual_model.md    # Entity structure
```

## Completion

After Step 4:

```bash
python3 scripts/task_manager.py update {task_id} --status completed
```
