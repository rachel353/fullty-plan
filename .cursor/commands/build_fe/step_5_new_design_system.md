# Step 5: New Design System 생성

## Overview
상태 기반 UI를 위한 디자인 시스템 룰을 생성한다. conceptual-model과 user_stories에서 추출한 패턴을 바탕으로 UI Semantic State(6가지)를 정의하고, semantic token 정책을 수립한다.

## Steps
1. `docs/conceptual-model.md`에서 **상태(State)와 권한 제약**만 확인한다. (전부 읽지 말고 필요한 부분만)
2. `docs/user_stories.md`에서 **반복되는 UX 패턴**을 식별한다. (승인/반려, 확정, 로그 보기 등)
3. **UI Semantic State**를 정의한다: info, action, success, warning, danger, frozen
4. **Semantic Token 정책**을 수립한다. (색깔은 "매핑"이지 "결정"이 아님)
5. `.cusor/rules/design_system_rules.mdc`를 `design_system_rules.mdc` 템플릿 기반으로 생성한다.
6. `app/globals.css`를 `index.css`의 CSS 변수들을 사용해 생성/수정한다.

## Checklist
- [ ] conceptual-model.md에서 상태와 권한 제약이 확인되었는가?
- [ ] user_stories.md에서 반복되는 UX 패턴이 식별되었는가?
- [ ] UI Semantic State가 6가지(info/action/success/warning/danger/frozen)로 정의되었는가?
- [ ] semantic token 정책이 "매핑" 기반으로 수립되었는가?
- [ ] design_system_rules.mdc가 템플릿 기반으로 생성되었는가?
- [ ] globals.css가 index.css의 CSS 변수들을 활용해 생성되었는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (생성/갱신 문서 예시)
생성해야 하는 문서: `.cusor/rules/design_system_rules.mdc`, `app/globals.css`

### UI Semantic State 정의 예시
```markdown
# UI Semantic States (6가지)

- **info**: 초안, 계산 중, 로딩 상태
- **action**: 승인 대기, 사용자 액션 필요
- **success**: 승인됨, 확정됨, 완료
- **warning**: 수기 수정됨, 주의 필요
- **danger**: 반려됨, 오류, 위험 상태
- **frozen**: 확정 후 잠김, 수정 불가
```

### Semantic Token Mapping 예시
```css
/* 상태 → 색상 매핑 */
--semantic-info: var(--primary);
--semantic-action: var(--warning);
--semantic-success: var(--success);
--semantic-warning: var(--warning);
--semantic-danger: var(--destructive);
--semantic-frozen: var(--muted);
```
