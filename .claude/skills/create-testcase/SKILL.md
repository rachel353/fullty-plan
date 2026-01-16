---
name: create-testcase
description: |
  Generate QC test case skeleton JSON from @docs documents. Creates US/AC structure with empty test case arrays and coverage indices (DR/CI/Route) for gap analysis. Use when: (1) starting QC test planning, (2) need to ensure no AC is missed in test coverage, (3) preparing test case skeleton before manual/automated TC writing, (4) user asks for "테스트케이스", "QC", "test case skeleton", or "coverage check".
---

# QC Test Case Skeleton Generator

Generate a skeleton JSON that captures all User Stories and Acceptance Criteria with empty test case arrays, plus coverage indices for Domain Rules, Change Items, and Routes.

## Quick Start

```bash
# Generate skeleton JSON for P1 priority
python3 .claude/skills/create-testcase/scripts/generate_skeleton.py \
  --change change-2026-01-15-1000 \
  --priority P1 \
  --output tasks/qc/testcases-skeleton.json
```

## Workflow (6 Steps)

### Step 0: Fix Scope
- Identify base change ID (e.g., `change-2026-01-15-1000`)
- Set target priority: `P1` (default) or include `P2`
- Reference `docs/test-credentials.md` for default preconditions

### Step 1: Extract US/AC Skeleton
Read `docs/user_stories.md` and extract:
- All User Stories matching target priority
- All Acceptance Criteria per US (as array)
- **Leave testCases as empty array** - do not fill yet

This ensures no AC is structurally missed.

### Step 2: Build Coverage Indices
Extract coverage keys from:
- `docs/conceptual_model.md` → `coverage.byDomainRule` (DR-xxx keys)
- `docs/changes/<change-id>.md` → `coverage.byChangeItem` (CI-xxx keys)
- `docs/ia_structure.md` → `coverage.byRoute` (route path keys)

### Step 3: Generate Skeleton JSON
Run `scripts/generate_skeleton.py` to produce the skeleton with:
- `meta`: change ID, scope, sources, ID conventions
- `userStories[]`: US/AC structure with empty testCases
- `coverage`: empty arrays for each DR/CI/Route key

### Step 4: (Manual) Fill Test Cases
For each AC, create at least 1 TC following:
- **TC ID format**: `TC-<US>-<AC>-<NN>` (e.g., `TC-US-009-AC-2-01`)
- **Minimum set per AC**: Normal(1) + Failure/Validation(1) + Time/UX condition(1 if applicable)

### Step 5: Enrich from Conceptual Model
Review `docs/conceptual_model.md` for:
- **Domain Rules (DR-xxx)**: Ensure at least 1 TC per rule
- **Data Flows**: Add E2E TC for flows that span multiple ACs

### Step 6: Final Coverage Check
Verify all coverage indices have at least 1 TC:
- [ ] All US have all AC covered (`testCases.length >= 1`)
- [ ] All DR-xxx have at least 1 TC
- [ ] All CI-xxx have at least 1 TC (especially Removed items)
- [ ] Critical routes have smoke + access TC

## Input Documents

| Document | Purpose |
|----------|---------|
| `docs/user_stories.md` | US/AC extraction (requirements baseline) |
| `docs/conceptual_model.md` | Domain Rules, Data Flows |
| `docs/changes/<id>.md` | Change Items for regression |
| `docs/ia_structure.md` | Routes, permissions |
| `docs/test-credentials.md` | Test accounts, preconditions |

## Output Schema

See [references/schema.md](references/schema.md) for complete JSON schema and field descriptions.

## TC Status Values

| Status | Description |
|--------|-------------|
| `todo` | Not started |
| `in_progress` | Being executed |
| `pass` | Passed |
| `fail` | Failed |
| `blocked` | Cannot execute (dependency/env issue) |
