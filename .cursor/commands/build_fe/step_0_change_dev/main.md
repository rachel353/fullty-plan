# Step 0: Change Dev (기획 변경 반영) — UI Only

## Overview
> **⚠️ 이 커맨드는 UI 변경만 다룹니다.** API/DB/Migration 관련 분석 및 작업은 범위에 포함되지 않습니다.

기획/요구사항 변경이 들어왔을 때, 변경 유형/영향 범위를 분석하고 `docs/changes/YYYY-MM-DD.md`에 **원문 아카이브 + 변경 개발 계획**을 남긴 뒤, 영향 모듈별로 Step 8(기능 단위 개발 루프)를 실행하고 기존 정책/결정과의 충돌을 점검합니다.

## Steps
1. 변경 요구사항(원문)을 입력으로 받아 Step 0-1을 수행합니다: `step_0_1_change_type_analysis.md`
2. 변경된 요구사항이 실제로 어디까지 영향을 주는지 Step 0-2를 수행합니다: `step_0_2_impact_analysis.md`
3. 분석 결과를 바탕으로 `docs/changes/YYYY-MM-DD.md`를 생성/갱신합니다: `step_0_3_generate_change_doc.md`
4. `docs/changes/YYYY-MM-DD.md`에 정의된 “영향 모듈/우선순위” 순서대로 Step 8 루프를 모듈별로 수행합니다: `step_0_4_execute_feature_dev.md`
5. 변경이 기존 정책/문서/결정(TBD)과 충돌하지 않는지 점검합니다: `step_0_5_policy_conflict_check.md`
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist (선택)
- [ ] `docs/changes/YYYY-MM-DD.md`에 원문 + 변경 개발 계획(모듈/순서/리스크)이 남아 있는가?
- [ ] 영향 모듈별로 Step 8(8-1~8-5)을 모두 수행했는가?
- [ ] 충돌/미결정(TBD)이 있으면 등록/해결 흐름으로 연결했는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?
