# Step 4-0: Logical Architecture 판단 (MAIN)

## Overview
Step 4 산출물(`docs/logical_architecture.md`)이 **단일 책임/명확한 경계** 기준을 만족하는지 빠르게 판정한다. 부적절이면 4-1~4-3을 다시 돌려 재설계한다.

## Steps
1. 현재 `docs/logical_architecture.md`의 Component 목록(Feature/Composite/Hook)을 훑는다.
2. 각 Component 책임 문장을 아래 기준으로 빠르게 체크한다.
   - 동시적 표현 없음 (`/`, `,`, `그리고`, `또`, `및`)
   - 50자 이내
   - 단일 행위(“~하고 ~한다” 금지)
3. 하나라도 ❌이면 `step_4_1_initial_components.md`로 돌아가 분리/재명명/재구성한다.
4. 모두 ✅이면 Step 5로 진행한다.
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 모든 Component 책임이 단일 행위인가?
- [ ] 책임 문장에 동시적 표현(`/`, `,`, `그리고` 등)이 없는가?
- [ ] 책임 문장이 50자 이내인가?
- [ ] 부적절 시 4-1~4-3을 통해 수정했는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?