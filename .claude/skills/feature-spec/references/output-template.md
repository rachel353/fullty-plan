# Feature Plan Output Template

Use this structure for `docs/features/FXX_기능명_plan.md`:

```markdown
# FXX: 기능명

## 1. Feature Overview

**Purpose**: [1-2 sentences from user_stories.json]

**Scope Boundary**:
- IN: [what this feature includes]
- OUT: [what this feature explicitly excludes]

## 2. User Flows

| Flow ID | Actor | Goal | Key Steps |
|---------|-------|------|-----------|
| UF-01 | [actor] | [goal] | [step1 → step2 → step3] |

Source: user_stories.json

## 3. Screens & Routes

| Screen | Route | Purpose |
|--------|-------|---------|
| ScreenName | /path | [brief purpose] |

Source: ia.md

## 4. Data Model

**Relevant Entities**:

| Entity | Key Attributes | Relations |
|--------|----------------|-----------|
| EntityName | attr1, attr2 | → RelatedEntity |

Source: conceptual_model.json

## 5. Component Strategy

**Pages**:
- `PageName` - [responsibility]

**Components**:
- `ComponentName` - [responsibility]

**State**:
- [key state considerations]

Source: logical_architecture.md

## 6. Task Mapping

| Task ID | Title | Implements | Files |
|---------|-------|------------|-------|
| TASK-XX | [title] | [what it builds] | [target files] |

Source: tasks.json

## 7. Open Questions

[List any unresolved ambiguities or decisions needed]
```

## Section Guidelines

### Feature Overview
- Keep to 2-3 sentences max
- Scope boundary prevents scope creep during development

### User Flows
- Summarize, don't copy full user stories
- Focus on the happy path first
- Omit edge cases unless critical

### Screens & Routes
- Only screens relevant to this feature
- Include parent routes for context if nested

### Data Model
- Only entities this feature reads/writes
- Show key relationships, not all attributes

### Component Strategy
- High-level component breakdown
- Don't design components—just map what exists in architecture

### Task Mapping
- Direct link between tasks and what they implement
- Helps during task execution to understand context
