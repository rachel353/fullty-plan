---
name: 2_ui_ux_plan
description: 1단계 명세를 기반으로 화면별 UX(레이아웃, 상태, 피드백, 에러, 반응형)를 확정한다.
---

# Step 2: UI/UX 계획

## 역할
"어떻게 보일지, 어떻게 동작할지" 계획하는 단계. 인테리어 디자인 정하기.

## Input
- 1단계 출력물 (`docs/features/FXX_*_spec.md`)
- Task 정보
- UX 인사이트 (`design-lib/insights/*.json`)

## 수행 작업

0. **UX Insight 매칭** (Sub-skill 호출):
   - `ux-insight-matcher` skill 호출
   - Task의 `description`, `acceptanceCriteria`를 분석하여 관련 인사이트 추출
   - 기존 디자인 규칙(`globals.css`)과 충돌 확인
   - 결과를 UI/UX 문서 상단에 포함

1. **핵심 Flow 선정**: 명세에서 1~3개 핵심 흐름 추출
2. **화면별 구성**: UI 블록 (헤더/필터/본문), 상태 (loading/empty/error)
3. **반응형 규칙**: 모바일/태블릿 변경 사항
4. **피드백 정의**: toast, inline error 등

## Output

`docs/features/FXX_기능명_ui_ux.md`:

```markdown
# FXX: 기능명 - UI/UX

## 0. UX Insight Summary
### Matched Insights
- [인사이트명] (매칭 이유)

### Design Rules to Apply
- 적용할 디자인 규칙들

### UI Implications
- 구체적 수치 (폰트, 여백 등)

### Non-Goals
- 하지 말아야 할 것들

### Conflicts with Design System
- 충돌 사항 (있을 경우)

## 1. User Flow
### Flow: [주요 흐름 이름]
1. [시작점]에서 [액션] → [결과]
2. [조건] 시: [피드백]
3. [성공] 시: [다음 화면]

## 2. 화면별 구성
### /path (화면명)
- **상단**: [컴포넌트]
- **본문**: [컴포넌트]
- **상태**:
  - loading: 스켈레톤
  - empty: 빈 상태 메시지
  - error: 에러 알림

## 3. 반응형 규칙
- Mobile: [변경 사항]
- Tablet: [변경 사항]

## 4. 피드백/에러
- 성공: toast
- 실패: inline error + toast
```

## Checklist
- [ ] UX Insight 매칭 및 요약 포함됨
- [ ] 사용자 Flow가 화면 요소와 연결됨
- [ ] empty/loading/error 상태 정의됨
- [ ] 재사용 컴포넌트 중심 설계
- [ ] 모바일 동작 규칙 정의됨
- [ ] 인사이트 규칙이 기존 디자인 시스템과 충돌하지 않음
