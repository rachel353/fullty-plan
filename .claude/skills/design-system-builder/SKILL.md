---
name: design-system-builder
description: Generate design system rules and CSS from base tokens. Reads index.css to extract colors, typography, and spacing tokens, then maps them to semantic UI states (info/action/success/warning/danger/frozen). Outputs .claude/rules/design_system_rules.mdc and app/globals.css.
---

# Design System Builder

## Overview
상태 기반 UI를 위한 디자인 시스템을 생성한다. `index.css`에서 디자인 토큰을 추출하고 6가지 Semantic State에 매핑한다.

## Workflow

```
1. index.css 읽기
   ↓
2. 디자인 토큰 추출 (색상, 타이포그래피, 스페이싱)
   ↓
3. Semantic State 매핑 (6가지)
   ↓
4. 출력 파일 생성
```

## Semantic States (6가지)

| State | 용도 | 매핑 |
|-------|------|------|
| **info** | 정보, 중립 | `accent` |
| **action** | 주요 액션, CTA | `primary` |
| **success** | 성공, 완료 | `secondary` (녹색 없으면 검토 필요) |
| **warning** | 경고, 주의 | `chart-4` 또는 amber |
| **danger** | 오류, 삭제 | `destructive` |
| **frozen** | 비활성, 잠김 | `muted` |

## 실행 방법

### Option 1: Python 스크립트 직접 실행
```bash
python .claude/skills/design-system-builder/scripts/generate_design_system.py
```

### Option 2: Claude가 수동으로 생성
1. `index.css` 읽기
2. `:root` 블록에서 CSS 변수 추출
3. 아래 템플릿으로 파일 생성

## 출력 파일

### 1. `.claude/rules/design_system_rules.mdc`

디자인 가이드라인 - 컴포넌트 작성 시 참조

### 2. `app/globals.css`

Semantic 유틸리티 클래스:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  /* Info State */
  .bg-info { background-color: var(--color-accent); }
  .text-info-foreground { color: var(--color-accent-foreground); }
  .border-info { border-color: var(--color-accent); }

  /* Action State */
  .bg-action { background-color: var(--color-primary); }
  .text-action-foreground { color: var(--color-primary-foreground); }
  .border-action { border-color: var(--color-primary); }

  /* Success State */
  .bg-success { background-color: var(--color-secondary); }
  .text-success-foreground { color: var(--color-secondary-foreground); }
  .border-success { border-color: var(--color-secondary); }

  /* Warning State */
  .bg-warning { background-color: var(--color-chart-4); }
  .text-warning-foreground { color: var(--color-foreground); }
  .border-warning { border-color: var(--color-chart-4); }

  /* Danger State */
  .bg-danger { background-color: var(--color-destructive); }
  .text-danger-foreground { color: var(--color-destructive-foreground); }
  .border-danger { border-color: var(--color-destructive); }

  /* Frozen State */
  .bg-frozen { background-color: var(--color-muted); }
  .text-frozen-foreground { color: var(--color-muted-foreground); }
  .border-frozen { border-color: var(--color-muted); }
}
```

## 사용 규칙

1. **Raw 토큰 사용 금지** - `bg-primary` 대신 `bg-action` 사용
2. **foreground 매칭** - `bg-action`과 `text-action-foreground` 함께 사용
3. **상태별 일관성** - 같은 의미는 같은 state 사용

### 사용 예시

```tsx
// 버튼
<button className="bg-action text-action-foreground">Submit</button>
<button className="bg-danger text-danger-foreground">Delete</button>
<button disabled className="bg-frozen text-frozen-foreground">Disabled</button>

// 알림
<div className="bg-success border border-success text-success-foreground">성공</div>
<div className="bg-warning border border-warning text-warning-foreground">경고</div>
<div className="bg-danger border border-danger text-danger-foreground">오류</div>
```

## 검토 필요 상황

`index.css`에 특정 색상이 없으면 플래그:

- **success**: 녹색 없음 → `secondary` 사용 (노란색과 혼동 가능)
- **warning**: amber 없음 → `chart-4` 사용

이 경우 `docs/semantic_state_mappings.json`에서 `needs_review: true` 확인 후 결정.
