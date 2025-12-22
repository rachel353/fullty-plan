# Step 4-1: 초기 Component 식별

## Overview
`docs/user_stories.md`와 `docs/ia.md`를 기반으로 Feature/Composite/Hook의 **초기 후보 목록**을 만든다. (정답이 아니라 “초안”이 목표)

## Steps
1. `docs/user_stories.md`에서 Actor/Action을 빠르게 훑고, “행동(동사)” 단위로 후보를 뽑는다.
2. `docs/ia.md`에서 화면(라우트)을 보고, 화면마다 필요한 “큰 덩어리 UI”를 Feature 후보로 적는다.
3. 여러 화면에서 반복되는 UI 패턴은 Composite 후보로 분리한다. (예: Table, FormField, Modal)
4. 데이터/권한/상태 로직은 Hook 후보로 분리한다. (예: useAuth, usePermission, use{Domain})
5. 후보 목록을 `docs/logical_architecture.md`에 “초안”으로 기록한다.
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] Feature/Composite/Hook 후보가 최소 1개 이상씩 존재하는가?
- [ ] Feature는 “화면의 큰 덩어리 UI”, Composite는 “재사용 UI 패턴”, Hook은 “상태/로직”으로 분리했는가?
- [ ] 후보 목록이 `docs/logical_architecture.md`에 기록되었는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?