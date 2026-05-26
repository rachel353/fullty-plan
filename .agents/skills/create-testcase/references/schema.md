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
    "name": "Jyageunfriends QC Test Cases (Skeleton)",
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
      "domain": "인증/회원",
      "title": "회원가입",
      "statement": "As a 독자, I want to 이메일 또는 소셜 계정으로 회원가입하다, So that ...",
      "acceptanceCriteria": [
        {
          "id": "AC-1",
          "text": "이메일/비밀번호 입력 시 비밀번호 규칙 실시간 체크",
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
  "title": "정상: 유효한 이메일/비밀번호 입력",
  "type": "positive",
  "precondition": "비로그인 상태",
  "steps": ["1. /signup 접속", "2. 이메일 입력", "3. 비밀번호 입력"],
  "expected": "비밀번호 규칙 체크 통과 표시",
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
