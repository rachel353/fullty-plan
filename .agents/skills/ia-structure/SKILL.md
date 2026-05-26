---
name: ia-structure
description: Generate Information Architecture (screen hierarchy, routes, role-based access) and file structure plan from user stories and conceptual model. Use when you need to define the screen structure, navigation flow, and codebase organization before implementation begins.
---

# IA Structure & File Structure Generation

## Context Detection

Check current working directory to determine output path:

| Context | Detection | Output Path |
|---------|-----------|-------------|
| **Sales/Quote** | Path contains `sales/` | `quotes/[MM.DD]/ia_structure.md` |
| **FE Development** | Default | `docs/ia_structure.md`, `docs/file_structure.md` |

**Sales Context:**
- Platform Definition 섹션 포함 (Web App / Mobile Web / Hybrid 등)
- 화면 구조도 (Visual Site Map) 중심
- file_structure.md는 생성하지 않음

**Sales Context Input Sources:**
- `quotes/[MM.DD]/user_stories_data.json`
- `quotes/[MM.DD]/conceptual_model.json`
- `quotes/[MM.DD]/guide.md`

## Overview

This skill generates two critical documents:
1. **IA Structure** - Screen hierarchy, routes, and navigation
2. **File Structure** - Codebase organization and component structure

Both are derived from User Stories and Conceptual Model to ensure 100% coverage and alignment.

## Workflow

```
1. Read inputs (user_stories_data.json, conceptual_model.md)
   ↓
2. Extract screen requirements from User Stories
   ↓
3. Map concepts to screens (from Conceptual Model)
   ↓
4. Design screen hierarchy (depth, grouping, routes)
   ↓
5. Apply role-based access control
   ↓
6. Validate 100% User Story coverage
   ↓
7. Generate file structure from IA + tech stack
   ↓
8. Output: ia_structure.md, file_structure.md
```

## Step 1: Read Inputs

### Required Files

1. **user_stories_data.json** - User stories with actors and acceptance criteria
2. **conceptual_model.md** - Core concepts, relationships, lifecycles, user interactions

If either file is missing, stop and report error.

### Data Extraction

Extract:
- **From User Stories**: Actors, actions (I want to...), priorities
- **From Conceptual Model**: Core concepts, user-concept interaction map, lifecycles

## Step 2: Extract Screen Requirements

For each User Story, identify implied screens:

### Screen Identification Patterns

| User Story Pattern | Implies Screen Type |
|-------------------|-------------------|
| "I want to **등록**하다" | Form/Create screen |
| "I want to **조회**하다" | List/Read screen |
| "I want to **수정**하다" | Form/Edit screen |
| "I want to **삭제**하다" | Delete confirmation (modal/page) |
| "I want to **검색**하다" | Search screen or filter UI |
| "I want to **다운로드**하다" | Export function (no separate screen) |

### Examples

**User Story:**
> "As a 운영 관리자, I want to 근로자 정보를 등록하다, So that 계약 관리를 시작할 수 있다"

**Implied Screens:**
- `/workers/new` - Worker registration form
- `/workers` - Worker list (to navigate to new)

## Step 3: Map Concepts to Screens

Use Conceptual Model's User-Concept Interaction Map:

```
For each (Actor, Concept) pair:
  - Create → Form screen (POST)
  - View → Detail screen (GET one)
  - List/Filter → List screen (GET many)
  - Edit → Form screen (PUT/PATCH)
  - Delete → Confirmation UI
  - Approve → Action screen/modal
```

### Concept Hierarchies Inform Screen Hierarchies

If Conceptual Model shows:
```
Course contains Lessons
  └─ 1:N relationship
```

IA Structure should reflect:
```
/courses/{courseId}/lessons
```

## Step 4: Design Screen Hierarchy

### Route Grouping Principles

1. **Role-based top-level grouping** (if multiple roles with different access patterns)
   ```
   /admin/*
   /user/*
   /public/*
   ```

2. **Feature-based grouping** (if shared access across roles)
   ```
   /workers/*
   /contracts/*
   /reports/*
   ```

3. **Depth guidelines**:
   - Shallow: ≤ 3 levels (e.g., `/admin/workers/new`)
   - Avoid: > 4 levels (hard to navigate)

### Screen Naming Convention

```
/{resource}/{action}
/{resource}/{id}
/{resource}/{id}/{sub-resource}
```

Examples:
- `/workers` - List
- `/workers/new` - Create form
- `/workers/123` - Detail view
- `/workers/123/edit` - Edit form
- `/workers/123/contracts` - Related sub-resource

### Common Screen Types

| Type | Route Pattern | Purpose |
|------|--------------|---------|
| List | `/resources` | Show all items with filters |
| Detail | `/resources/:id` | Show one item |
| Create | `/resources/new` | Form to create |
| Edit | `/resources/:id/edit` | Form to edit |
| Dashboard | `/dashboard` or `/` | Overview/home |
| Settings | `/settings` | Configuration |

## Step 5: Apply Role-Based Access Control

For each screen, define:

```markdown
### Screen: /workers/new

**Access:**
- ✅ 운영 관리자 (Create permission)
- ❌ 조회자 (Read-only)

**Redirect:**
- Unauthorized → /403 or /login
```

### Permission Patterns

From Actor definitions in User Stories:
- Admin actors → Full CRUD access
- Manager actors → CRUD on assigned resources
- Viewer actors → Read-only
- Public actors → No auth required (landing, login)

## Step 6: Validate 100% User Story Coverage

**Critical Check:**

For each User Story:
- [ ] At least one screen mapped to it
- [ ] All acceptance criteria addressable in mapped screens

If any User Story has no screen:
1. Flag for human review
2. Suggest missing screen
3. Do NOT proceed until coverage = 100%

## Step 7: Generate File Structure

Based on IA Structure + Technology Stack.

### Input: Technology Stack

Detect or ask:
- Frontend framework (React, Vue, Next.js, etc.)
- State management (Redux, Zustand, Context, etc.)
- Styling approach (Tailwind, CSS Modules, styled-components, etc.)
- Backend (if applicable)

### File Structure Patterns

#### React + Vite + Tailwind Example

```
src/
├── pages/           # One file per screen from IA
│   ├── Dashboard.tsx
│   ├── workers/
│   │   ├── WorkerList.tsx
│   │   ├── WorkerDetail.tsx
│   │   └── WorkerForm.tsx
│   └── ...
├── components/      # Shared components
│   ├── ui/          # Generic UI components
│   └── domain/      # Domain-specific components
├── hooks/           # Custom React hooks
├── services/        # API calls (one per concept)
│   ├── workerService.ts
│   └── contractService.ts
├── stores/          # State management
├── types/           # TypeScript types (from Conceptual Model)
└── utils/           # Utilities
```

#### Next.js App Router Example

```
app/
├── (auth)/          # Auth layout group
│   ├── login/
│   └── signup/
├── (dashboard)/     # Dashboard layout group
│   ├── layout.tsx
│   ├── page.tsx     # Dashboard home
│   ├── workers/
│   │   ├── page.tsx          # List
│   │   ├── new/page.tsx      # Create
│   │   └── [id]/
│   │       ├── page.tsx      # Detail
│   │       └── edit/page.tsx # Edit
│   └── ...
├── api/             # API routes (if needed)
└── components/      # Shared components
```

### Mapping Rules

1. **Pages/Routes ↔ IA Screens** (1:1 mapping)
2. **Services ↔ Concepts** (1:1 or 1:N mapping)
3. **Types ↔ Concepts** (1:1 mapping from Conceptual Model)
4. **Components** - Extract from User Story acceptance criteria (e.g., "필수 항목 입력 시 버튼 활성화" → form validation component)

## Step 8: Generate Outputs

### Output 1: ia_structure.md

```markdown
# Information Architecture

> Generated from: user_stories_data.json, conceptual_model.md
> Date: YYYY-MM-DD

## Screen Hierarchy

### Role: 운영 관리자

#### Dashboard
- **Route**: `/dashboard`
- **Purpose**: Overview of key metrics
- **User Stories**: US-101, US-102
- **Access**: 운영 관리자, 조회자

#### Workers Management
- **Route**: `/workers`
- **Purpose**: Manage worker information
- **Screens**:
  - `/workers` - List all workers (US-103)
  - `/workers/new` - Create worker (US-104)
  - `/workers/:id` - View worker detail (US-105)
  - `/workers/:id/edit` - Edit worker (US-106)
- **Access**: 운영 관리자

...

## Route Table

| Route | Screen | User Stories | Access |
|-------|--------|-------------|--------|
| `/dashboard` | Dashboard | US-101, US-102 | All |
| `/workers` | Worker List | US-103 | Admin |
| `/workers/new` | Worker Create | US-104 | Admin |
| ... | ... | ... | ... |

## Navigation Structure

```
Root
├── Dashboard (/)
├── Workers (/workers)
│   ├── List
│   ├── Create
│   └── Detail
│       └── Edit
├── Contracts (/contracts)
└── Reports (/reports)
```

## User Story Coverage

- Total User Stories: 25
- Mapped to Screens: 25
- Coverage: 100% ✅

### Coverage Details

| User Story | Mapped Screens |
|-----------|---------------|
| US-101 | /dashboard |
| US-102 | /workers |
| ... | ... |
```

### Output 2: file_structure.md

```markdown
# File Structure Plan

> Generated from: ia_structure.md, tech stack
> Date: YYYY-MM-DD

## Technology Stack

- Framework: React 18 + Vite
- Routing: React Router v6
- State: Zustand
- Styling: Tailwind CSS
- API: Axios + React Query

## Directory Structure

[Show full tree based on pattern above]

## File Mapping

### Pages (from IA Structure)

| Route | File Path | Component Name |
|-------|-----------|---------------|
| `/dashboard` | `src/pages/Dashboard.tsx` | Dashboard |
| `/workers` | `src/pages/workers/WorkerList.tsx` | WorkerList |
| ... | ... | ... |

### Services (from Conceptual Model)

| Concept | Service File | Methods |
|---------|-------------|---------|
| Worker | `src/services/workerService.ts` | getAll, getById, create, update, delete |
| Contract | `src/services/contractService.ts` | getAll, getById, create, update, delete |
| ... | ... | ... |

### Types (from Conceptual Model)

| Concept | Type File | Exports |
|---------|-----------|---------|
| Worker | `src/types/worker.ts` | Worker, CreateWorkerDto, UpdateWorkerDto |
| Contract | `src/types/contract.ts` | Contract, CreateContractDto, ... |
| ... | ... | ... |

## Implementation Notes

- Each page component should be lazy-loaded
- Services use singleton pattern
- Types are auto-generated from backend schema (if available)
- Component library: Radix UI + Tailwind
```

## Validation Checklist

Before finalizing outputs:

- [ ] All User Stories have at least one mapped screen
- [ ] All screens have clear access control rules
- [ ] Screen hierarchy depth ≤ 4 levels
- [ ] Route naming is consistent and RESTful
- [ ] File structure matches chosen tech stack conventions
- [ ] All concepts from Conceptual Model have corresponding services/types
- [ ] No duplicate routes or file paths

## When to Ask for Human Input

Flag for clarification when:

1. **Multiple valid IA patterns** - e.g., flat vs. nested structure
2. **Complex role-based access** - unclear permission boundaries
3. **User Story coverage gaps** - missing screens that would break workflows
4. **Tech stack ambiguity** - no clear framework choice
5. **Conflicting requirements** - User Stories imply different screen structures

## Common Patterns

### Admin Dashboard Pattern

```
/
├── /dashboard (home)
├── /users (CRUD)
├── /settings (config)
└── /reports (read-only)
```

### B2C App Pattern

```
/
├── / (public landing)
├── /login
├── /signup
├── /app (authenticated)
│   ├── /dashboard
│   ├── /profile
│   └── /[feature]
```

### Multi-Tenant SaaS Pattern

```
/
├── / (marketing site)
├── /login
└── /orgs/:orgId
    ├── /dashboard
    ├── /settings
    └── /[feature]
```

## Resources

### scripts/
- `generate_ia_structure.py` - Generates ia_structure.md from user stories + conceptual model (TODO)
- `generate_file_structure.py` - Generates file_structure.md from IA + tech stack (TODO)

### references/
- `ia_patterns.md` - Common IA patterns by domain (TODO)
