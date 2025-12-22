# Step 4-3: 역할 & 책임 명문화

## Overview
각 Component에 대해 “한 문장 책임”을 확정하고, 4-0의 적절성 기준(단일/짧게/명확히)을 만족하도록 다듬는다.

## Steps
1. `docs/logical_architecture.md`의 Component 목록을 연다.
2. 각 Component에 대해 책임을 **동사로 끝나는 한 문장**으로 작성한다.
   - 50자 이내
   - “~하고 ~한다” 금지
   - `/`, `,`, `그리고`, `또` 같은 동시 표현 금지
3. 책임이 길거나 복합이면 Component를 분리하거나 이름/경계를 재정의한다.
4. 업데이트된 책임을 `docs/logical_architecture.md`에 반영한다.
5. 완료 후 `main.md`(4-0)로 돌아가 최종 판정한다.
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 모든 Component에 책임(한 문장)이 작성되었는가?
- [ ] 책임 문장이 50자 이내이며 단일 행위인가?
- [ ] 동시 표현(`/`, `,`, `그리고` 등)이 제거되었는가?
- [ ] 결과가 `docs/logical_architecture.md`에 반영되었는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?