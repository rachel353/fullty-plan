# Design Guide - 아테나올리바

> 작성일: 2026-01-07
> Reference: guide.md, ia_structure.md

---

## Design Requirements

### Core Principles

- **Accent colors discouraged** – 기능적으로 필요한 경우에만 사용; layout, spacing, typography로 계층 표현
- **Images → gray boxes** - 개발 시 `bg-muted` placeholder div 사용
- **Minimal & reactive** - layout, hierarchy, spacing에 집중
- **Follow globals.css** - 기존 color tokens 활용 (foreground, background, muted, border)
- **Component by component** - 점진적 구현
- **No decorative elements** - 깔끔하고 절제된 스타일링

### Project-Specific Requirements

| REQ ID | Requirement | Design Implication |
|--------|-------------|-------------------|
| REQ-131 | 심리스한 스캔 경험 | 비비노 수준의 자연스러운 스캔 UX, 최소한의 UI 요소로 집중도 향상 |
| REQ-132 | 웹앱 형태 유지 | PWA 최적화, 네이티브 앱과 유사한 경험 제공 |
| REQ-111 | 3초 이내 OCR 응답 | 로딩 인디케이터, Skeleton UI로 대기 시간 인지 최소화 |

---

## Platform & Device Strategy

### Platform Definition

| 항목 | 내용 |
|------|------|
| **유형** | Web App (PWA) |
| **우선순위** | Mobile-first |
| **지원 환경** | iOS Safari, Android Chrome, Desktop Chrome |

### Breakpoints

| Breakpoint | Width | Primary Use |
|------------|-------|-------------|
| `xs` | < 375px | Small phones |
| `sm` | 375px+ | Standard mobile (Primary) |
| `md` | 768px+ | Tablet, small laptop |
| `lg` | 1024px+ | Desktop (Admin panel) |
| `xl` | 1280px+ | Large desktop |

### Touch Targets

- **Minimum touch target**: 44px × 44px (iOS HIG 권장)
- **Spacing between targets**: 최소 8px
- **CTA buttons**: 48px height 이상

---

## Typography Hierarchy

### Principle

**Typography hierarchy requires both size AND weight differentiation.** Size alone is insufficient for information-dense interfaces.

### Weight System

| Level | font-weight | font-size | Use Case | Examples |
|-------|-------------|-----------|----------|----------|
| Page Title | font-bold (700) | text-2xl / text-3xl | Main page heading | 장바구니, 상품 상세 |
| Section Header | font-semibold (600) | text-xl | Section division | 리뷰, 상품 정보 |
| Card Title | font-semibold (600) | text-lg | Card headings | 상품명 |
| Table Header | font-medium (500) | text-sm | Labels, headers | 관리자 테이블 |
| Body Text | font-normal (400) | text-base | Default content | 상품 설명, 리뷰 내용 |
| Caption | font-normal (400) | text-sm | Secondary info | 가격, 원산지, 날짜 |
| Label | font-medium (500) | text-xs | Form labels | 입력 필드 레이블 |

### Font Stack (가정)

```css
--font-sans: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

> (확인 필요) 클라이언트 브랜드 폰트 사용 여부

---

## Color System

### Semantic Colors

| Token | Usage | Example |
|-------|-------|---------|
| `foreground` | Primary text | #0A0A0A |
| `background` | Page background | #FFFFFF |
| `muted` | Secondary text, placeholders | #6B7280 |
| `muted-foreground` | Disabled text | #9CA3AF |
| `border` | Borders, dividers | #E5E7EB |
| `accent` | CTA, highlights (제한적 사용) | (확인 필요) |

### Functional Colors

| State | Color | Usage |
|-------|-------|-------|
| Success | Green-600 | 결제 완료, 등록 성공 |
| Warning | Yellow-600 | 재고 부족 경고 |
| Error | Red-600 | 결제 실패, 유효성 오류 |
| Info | Blue-600 | 안내 메시지 |

> (확인 필요) 아테나올리바 브랜드 컬러 적용 여부

---

## Design Intent

### Scan Experience (핵심)

스캔 화면은 비비노(Vivino)를 벤치마킹한 심리스한 경험 제공:

1. **Full-screen camera view**: 카메라 뷰가 화면 대부분 차지
2. **Minimal overlay UI**:
   - 상단: 뒤로가기 버튼만
   - 하단: 가이드 프레임, 촬영 버튼
3. **Instant feedback**: 촬영 즉시 로딩 → 결과 표시
4. **No interruption**: 스캔 → 결과 → 상품 상세 자연스러운 전환

```
┌──────────────────────────────┐
│  ←                           │  ← Minimal header
├──────────────────────────────┤
│                              │
│                              │
│     ┌──────────────────┐     │
│     │                  │     │  ← Camera viewfinder
│     │   [라벨 가이드]   │     │
│     │                  │     │
│     └──────────────────┘     │
│                              │
│                              │
├──────────────────────────────┤
│         ( ◉ )                │  ← Capture button
└──────────────────────────────┘
```

### Loading States

| State | Duration | UI |
|-------|----------|-----|
| Scanning | 0-3초 | Skeleton + Progress indicator |
| Long wait | 3초+ | "분석 중..." 메시지 |
| Error | - | Toast notification |

### Rapid Visual Scanning

- 정보 계층화로 빠른 스캔 지원
- 가격/평점은 시각적으로 강조
- 긴 텍스트는 truncate + "더보기"

### Clear Information Hierarchy

```
┌─────────────────────────────────────┐
│ [상품 이미지]                        │
├─────────────────────────────────────┤
│ 상품명                    font-bold │
│ ₩45,000                 font-bold │
│ ★★★★☆ 4.2 (128)          caption │
├─────────────────────────────────────┤
│ 원산지: 이탈리아            caption │
│ 등급: Extra Virgin         caption │
└─────────────────────────────────────┘
```

### Reduced Cognitive Load

- 한 화면에 하나의 primary action
- 관련 정보 그룹핑
- 불필요한 선택지 최소화

---

## Component Patterns

### Navigation

#### Consumer App (Mobile)

```
Bottom Tab Navigation (Fixed)
┌─────┬─────┬─────┬─────┐
│ 홈  │스캔 │장바구니│마이 │
└─────┴─────┴─────┴─────┘

- 스캔 탭: 메인 CTA로 강조 (가능 시 floating action 스타일)
- 장바구니: 뱃지로 아이템 수 표시
```

#### Admin Panel (Desktop)

```
Sidebar Navigation (Left)
┌──────────────────┐
│ 아테나올리바     │
├──────────────────┤
│ 대시보드         │
│ 상품 관리        │
│ 라벨 관리        │
│ 회원 관리        │
│ 리뷰 관리        │
└──────────────────┘
```

### List Views

| Pattern | Use Case | Features |
|---------|----------|----------|
| Product List (Consumer) | 스캔 결과, 홈 | Card grid, 2 columns |
| Product List (Admin) | 상품 관리 | Table, pagination, filters |
| Review List | 상품 상세 | Vertical stack, load more |

### Form Patterns

| Pattern | Use Case | Notes |
|---------|----------|-------|
| Single column form | 회원가입, 로그인 | Mobile-friendly |
| Two column form | 상품 등록 (Admin) | Desktop only |
| Inline edit | 수량 변경 | 장바구니 |

### Card Components

```
Product Card (Consumer)
┌─────────────────┐
│ [Image]         │  ← aspect-ratio: 1/1
│                 │
├─────────────────┤
│ 제품명          │  ← font-semibold, truncate
│ ₩45,000        │  ← font-bold
│ ★4.2 (128)     │  ← text-sm, muted
└─────────────────┘
```

### Buttons

| Type | Use Case | Style |
|------|----------|-------|
| Primary | 결제하기, 등록 | Solid background, 100% width (mobile) |
| Secondary | 취소, 뒤로가기 | Outline or ghost |
| Ghost | 더보기, 필터 | Text only |
| Icon | 삭제, 편집 | Icon only, tooltip |

---

## Interaction Patterns

### Feedback

| Action | Feedback |
|--------|----------|
| Button tap | Haptic (if supported) + Visual state change |
| Add to cart | Toast: "장바구니에 담겼습니다" |
| Error | Toast or inline error message |
| Long action | Loading spinner + disabled state |

### Gestures (Mobile)

| Gesture | Action | Screen |
|---------|--------|--------|
| Swipe left | Delete item | 장바구니 |
| Pull down | Refresh | 목록 화면 |
| Pinch | Zoom image | 상품 이미지 |

### Modals & Sheets

| Type | Use Case |
|------|----------|
| Bottom Sheet | 필터, 옵션 선택 |
| Alert Dialog | 삭제 확인 |
| Full-screen Modal | 리뷰 작성 |

---

## Design Notes

### Do's

- ✅ 깔끔하고 절제된 스타일링
- ✅ 일관된 spacing 시스템 (4px base)
- ✅ 명확한 visual hierarchy
- ✅ 충분한 여백으로 가독성 확보
- ✅ 로딩 상태 명시

### Don'ts

- ❌ 불필요한 장식 요소
- ❌ 과도한 그림자/그라데이션
- ❌ 복잡한 애니메이션 (성능 저하)
- ❌ 작은 터치 타겟
- ❌ 브랜드 컬러 과용

### Placeholder Strategy

개발 초기에는 실제 이미지 대신 placeholder 사용:

```jsx
// 상품 이미지 placeholder
<div className="aspect-square bg-muted flex items-center justify-center">
  <span className="text-muted-foreground text-sm">상품 이미지</span>
</div>
```

### Performance Considerations

- **Image lazy loading**: viewport 진입 시 로드
- **Skeleton screens**: 콘텐츠 로딩 중 표시
- **Optimistic UI**: 장바구니 담기 등 즉각 반영

---

## Confirmation Required

| 항목 | 상태 | 비고 |
|------|------|------|
| 브랜드 컬러 | (확인 필요) | Primary/Accent 컬러 |
| 로고 | (확인 필요) | Header용 로고 이미지 |
| 폰트 | (가정) Pretendard | 브랜드 폰트 여부 |
| 이미지 스타일 | (확인 필요) | 상품 이미지 규격/스타일 |
