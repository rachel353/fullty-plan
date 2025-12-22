## Build FE (9-step)

## Overview
견적/기획 문서를 기반으로 **FE 문서 + 코드**를 9단계로 생성/정리하는 워크플로우 커맨드입니다. 각 Step은 “산출물 생성 → Human 승인 → 다음 Step” 흐름을 강제합니다.

## Steps
1. **입력(자동 탐색) 준비**
   - `{client}/quotes/{date}/background.md`
   - `{client}/quotes/{date}/guide.md`
   - `{client}/quotes/{date}/ia_structure.md`
   - `{client}/quotes/{date}/specification_and_quote.md`
2. **커맨드 실행**
   - 자동 최신 quotes 사용:
     - `Build FE for {CLIENT_NAME}`
   - 특정 날짜 지정:
     - `Build FE for {CLIENT_NAME} - {MM.DD}`
3. **Step 진행 규칙**
   - Step 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8(반복) → 9 순서로 진행
   - 승인 없이는 다음 Step으로 이동하지 않음
4. **독립 반복 Step**
   - Step 4: `step_4_logical_architecture/` 반복 루프
   - Step 8: `step_8_feature_dev/` 기능 단위 반복 루프

## Checklist (선택)
- [ ] 입력 문서 4종을 찾을 수 있는가? (client/date 확인)
- [ ] 각 Step의 산출물이 `docs/`에 저장되는가?
- [ ] Step 4/8 반복 루프가 “승인 기반”으로 운영되는가?
