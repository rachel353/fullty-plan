## Step 2: IA Update (User Story 기준)

## Overview
`docs/user_stories.md`를 기준으로 IA를 정리하고 **User Story 커버리지 100%**를 만든다.

## Steps
1. 기존 IA(`quotes/.../ia_structure.md`)와 User Story를 비교한다
2. 누락된 화면/흐름을 추가하고 불필요한 화면을 정리한다
3. 역할별(Route group 기준)로 IA를 정리해 `docs/ia.md`로 저장한다

## Checklist (선택)
- [ ] 모든 User Story가 최소 1개 화면에 매핑되는가?
- [ ] 역할(ADMIN/BUSINESS/WORKER 등) 단위로 구조가 일관적인가?
- [ ] 화면 간 이동 흐름이 자연스러운가?

## Output (문서 생성 시 예시)
`docs/ia.md`:

```markdown
# IA

## Role Routes
### Admin
- /admin/...

### Business
- /business/workers (US-001)
- /business/workers/new (US-001)

## User Story Mapping
| User Story | Routes |
|---|---|
| US-001 | /business/workers, /business/workers/new |
```

