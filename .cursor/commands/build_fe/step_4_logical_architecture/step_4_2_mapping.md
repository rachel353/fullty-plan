# Step 4-2: User Story / Flow → Component 매핑

## Overview
`docs/user_stories.md`(AC 포함)와 `docs/ia.md`를 기준으로 “모든 요구사항이 Component로 커버되는지”를 빠르게 검증하고, **누락 Component**를 찾아 추가한다.

## Steps
1. `docs/user_stories.md`에서 MVP User Story를 고른다. (우선순위 높은 3~7개)
2. 각 User Story의 AC를 읽고, “담당 Feature/Composite/Hook”을 1개 이상 매핑한다.
3. `docs/ia.md`의 주요 화면(라우트)별로, 화면에서 필요한 Feature를 연결해본다.
4. AC/Flow가 매핑되지 않으면 “누락 Component”로 기록하고 후보 목록에 추가한다.
5. 업데이트된 결과를 `docs/logical_architecture.md`에 반영한다.
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] MVP User Story의 모든 AC가 최소 1개의 Component에 매핑되었는가?
- [ ] 매핑이 불가능한 AC/Flow가 있다면 누락 Component로 추가했는가?
- [ ] `docs/logical_architecture.md`에 Component 목록이 업데이트되었는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?