# Requirements Template

## Output Location
`meeting_scripts/[MM.DD]/requirements.md`

## Template Structure

```markdown
# Client Requirements - [Meeting Date]

## 핵심 기능 요구사항

### 1. [카테고리명]

#### [REQ-101] [요구사항 제목]
- [요구사항 상세 내용]

#### [REQ-102] [요구사항 제목]
- [요구사항 상세 내용]

## 비기능 요구사항

#### [REQ-111] [요구사항 제목]
- [요구사항 상세 내용]

## 통합 요구사항

#### [REQ-121] [요구사항 제목]
- [요구사항 상세 내용]

## UI/UX 요구사항

#### [REQ-131] [요구사항 제목]
- [요구사항 상세 내용]

## 비즈니스 로직 요구사항

#### [REQ-141] [요구사항 제목]
- [요구사항 상세 내용]

## 미확정 항목 (Unconfirmed Items)
- [확정되지 않은 항목들]
```

## Extraction Source
- summary.md 섹션 1-4에서 추출:
  - Section 1: Scope (확정된 개발 범위)
  - Section 2: Budget & Model (금액 및 계약 방식)
  - Section 3: Timeline (일정)
  - Section 4: Responsibilities (역할/책임자)

## Category Guidelines
| Category | Description | ID Range |
|----------|-------------|----------|
| 핵심 기능 | Core features | X01-X10 |
| 비기능 | Non-functional (성능, 보안 등) | X11-X20 |
| 통합 | Integration requirements | X21-X30 |
| UI/UX | User interface/experience | X31-X40 |
| 비즈니스 로직 | Business logic | X41-X50 |

## Rules
- 클라이언트가 명시적으로 요청하거나 합의한 내용만 포함
- 확정되지 않은 항목은 "미확정 항목" 섹션에 별도 명시
- REQ ID 할당은 [req_id_scheme.md](req_id_scheme.md) 참조
