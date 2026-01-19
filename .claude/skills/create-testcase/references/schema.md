# QC Test Case Skeleton JSON Schema

## Structure Overview

```
{
  "meta": { ... },
  "userStories": [ ... ],
  "coverage": { ... }
}
```

## Meta Section

```json
{
  "meta": {
    "name": "QC Test Cases (Skeleton)",
    "baseChange": "change-2026-01-15-1000",
    "scope": { "priority": ["P1"] },
    "sources": {
      "userStories": "docs/user_stories.md",
      "conceptualModel": "docs/conceptual_model.md",
      "changes": "docs/changes/2026-01-15-1000.md",
      "ia": "docs/ia_structure.md",
      "credentials": "docs/test-credentials.md"
    },
    "idConvention": {
      "testCaseId": "TC-<US>-<AC>-<NN>",
      "status": ["todo", "in_progress", "pass", "fail", "blocked"]
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Project/test suite name |
| `baseChange` | string | Change ID being tested |
| `scope.priority` | string[] | Priority levels included |
| `sources` | object | Path references to source documents |
| `idConvention` | object | ID format and status values |

## User Story Section

```json
{
  "userStories": [
    {
      "id": "US-001",
      "priority": "P1",
      "domain": "Auth",
      "title": "Sign up",
      "statement": "As a user, I want to sign up with email or a social account, So that I can access the service.",
      "acceptanceCriteria": [
        {
          "id": "AC-1",
          "text": "When entering email/password, validate password rules in real time.",
          "testCases": []
        }
      ],
      "tags": {
        "routes": ["/signup", "/login"],
        "changes": ["change-2026-01-14-1500"],
        "domainRules": ["DR-001"]
      }
    }
  ]
}
```

### User Story Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | US-XXX format identifier |
| `priority` | string | P1, P2, or P3 |
| `domain` | string | Feature domain name |
| `title` | string | Short title |
| `statement` | string | Full user story statement |
| `acceptanceCriteria` | array | List of AC objects |
| `tags.routes` | string[] | Related route paths |
| `tags.changes` | string[] | Related change IDs |
| `tags.domainRules` | string[] | Related DR-xxx IDs |

### Acceptance Criteria Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | AC-N format (within US) |
| `text` | string | AC description |
| `testCases` | array | Empty in skeleton, filled later |

### Test Case Fields (when filled)

```json
{
  "id": "TC-US-001-AC-1-01",
  "title": "Happy path: valid email/password",
  "type": "positive",
  "precondition": "Logged out",
  "steps": ["1. Go to /signup", "2. Enter email", "3. Enter password"],
  "expected": "Password rule checks show as satisfied",
  "status": "todo",
  "tags": ["DR-001"]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | TC-US-XXX-AC-N-NN format |
| `title` | string | Test case title |
| `type` | string | positive, negative, edge, smoke, access |
| `precondition` | string | Required state before test |
| `steps` | string[] | Step-by-step actions |
| `expected` | string | Expected result |
| `status` | string | todo, in_progress, pass, fail, blocked |
| `tags` | string[] | Related DR/CI IDs |

## Coverage Section

```json
{
  "coverage": {
    "byUserStory": { "US-001": [], "US-009": [] },
    "byAcceptanceCriteria": {
      "US-001:AC-1": [],
      "US-001:AC-2": []
    },
    "byDomainRule": { "DR-002": [], "DR-003": [] },
    "byChangeItem": { "CI-004": [], "CI-012": [] },
    "byRoute": { "/signup": [], "/login": [] }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `byUserStory` | object | US ID → TC ID array |
| `byAcceptanceCriteria` | object | US:AC key → TC ID array |
| `byDomainRule` | object | DR-xxx → TC ID array |
| `byChangeItem` | object | CI-xxx → TC ID array |
| `byRoute` | object | route path → TC ID array |

## Coverage Check Rules

1. **US Coverage**: Every US must have at least 1 TC across all ACs
2. **AC Coverage**: Every AC must have `testCases.length >= 1`
3. **DR Coverage**: Every DR-xxx key must have at least 1 TC
4. **CI Coverage**: Every CI-xxx key must have at least 1 TC
5. **Route Coverage**: Critical routes need smoke + access TC
