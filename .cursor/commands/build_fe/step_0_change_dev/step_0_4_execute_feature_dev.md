# Step 0-4: 모듈별 Step 8 실행 (Feature Dev Loop)

## Overview
`docs/changes/YYYY-MM-DD.md`에서 확정된 영향 모듈을 기준으로, 모듈별로 Step 8(기능 단위 개발 루프)을 실행해 변경을 코드에 반영합니다.

## Steps
1. `docs/changes/YYYY-MM-DD.md`에서 우선순위가 가장 높은 “다음 모듈”을 하나 선택합니다.
2. 선택한 모듈에 대해 `build_fe/step_8_feature_dev/main.md` 루프를 그대로 수행합니다.
   - 8-1: 개발 명세 구체화
   - 8-2: UI/UX 계획 구체화
   - 8-3: Schema & Mock Data
   - 8-4: UI 개발
   - 8-5: 동작 확인
3. 모듈이 완료되면 `docs/changes/YYYY-MM-DD.md`의 모듈 상태를 업데이트합니다(TODO → In Progress → Done).
4. 다음 모듈로 이동하여 1~3을 반복합니다.
5. 변경이 커서 회귀 범위가 커졌다면, 마지막에 “변경된 핵심 플로우 회귀 테스트 목록”을 `docs/changes/YYYY-MM-DD.md`에 갱신합니다.
6. 모든 영향 모듈이 완료되면 Step 0-5(정책 충돌 점검)로 이동합니다.
7. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 현재 개발 대상 모듈이 `docs/changes/YYYY-MM-DD.md`의 우선순위/의존성과 일치하는가?
- [ ] 모듈별로 Step 8-1~8-5를 모두 수행했는가?
- [ ] 완료 후 변경 문서에 상태/검증 결과가 남았는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?


