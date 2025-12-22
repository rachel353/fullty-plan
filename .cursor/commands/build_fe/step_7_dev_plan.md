# Step 7: 개발 계획 수립

## Overview
`docs/user_stories.md` + `docs/integration.md` + `docs/file_structure.md`를 기반으로 **개발 범위/우선순위/순서/의존성**을 정리해 Step 8(기능 단위 개발)을 진행할 수 있는 로드맵을 만듭니다.

## Steps
1. `docs/user_stories.md`에서 **MVP에 포함될 User Story**와 우선순위를 확정합니다.
2. `docs/integration.md`를 참고해 기능별로 필요한 **화면/컴포넌트/훅**을 묶어 “기능 단위(F01~)”로 정리합니다.
3. `docs/file_structure.md`와 충돌 없이, 기능 단위 개발이 자연스럽게 이어지도록 **개발 순서/의존성**을 정합니다.
4. 아래 항목이 포함되도록 `docs/dev_plan.md`를 작성/갱신합니다.
   - MVP 범위 vs 이후 범위
   - 개발 순서(스프린트/주차 단위 권장)
   - 기능 의존성(간단한 그래프/표)
   - 리스크/대응(핵심만)
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] `docs/dev_plan.md`가 Step 8에서 **기능 단위로 바로 실행 가능**한 수준인가?
- [ ] 개발 순서가 의존성을 고려했는가? (예: 인증/레이아웃 → 도메인 기능)
- [ ] MVP 범위가 과도하게 크지 않은가?
- [ ] 리스크/대응이 현실적인가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (생성/갱신 문서 예시)
생성해야 하는 문서: `docs/dev_plan.md`

```markdown
# 개발 계획 (Dev Plan)

## 1. MVP 범위
| Feature | 설명 | 관련 User Story | 우선순위 |
|---|---|---|---|
| F01 Auth | 로그인/권한 | - | High |
| F02 Layout | 공통 레이아웃 | - | High |
| F03 Worker | 근로자 관리 | US-001 | High |

## 2. 개발 순서(요약)
1. F01 Auth
2. F02 Layout
3. F03 Worker

## 3. 의존성(요약)
| From | To | 이유 |
|---|---|---|
| F01 | F02 | 권한/세션 기반 레이아웃 |
| F02 | F03 | 공통 컴포넌트/레이아웃 선행 |

## 4. 리스크(핵심)
- 계약 생성 단계 폼 복잡도 ↑ → 단계 축소/범위 조정 옵션 유지
```
