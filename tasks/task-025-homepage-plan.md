# Home Page UI 구현 계획 (task-025)

## 개요
쟈근친구들 V2 프로젝트의 Home Page UI를 구현합니다. 의존성 태스크를 포함하여 전체 구현을 진행합니다.

## 의존성 트리
```
task-025 (Home Page UI)
├── task-009 (Auth Layout)
│   └── task-007 (Root Layout + Providers)
│       ├── task-005 (Zustand stores)
│       │   └── task-004 (TypeScript types)
│       └── task-006 (TanStack Query)
└── task-012 (Bottom Navigation)
    └── task-003 (shadcn/ui) - 필요 컴포넌트만 설치
```

## 구현 단계

### Phase 0: 패키지 설치
```bash
cd jyageunfriends
pnpm add zustand @tanstack/react-query clsx tailwind-merge lucide-react
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmk2dt04m000f04lbc9x47d7f
```

### Phase 1: 기반 코드 (types, stores, lib)

| 순서 | 파일 | 설명 |
|------|------|------|
| 1 | `types/user.ts` | User 타입 정의 |
| 2 | `types/story.ts` | Story, StoryCardData, BannerData 타입 |
| 3 | `types/index.ts` | 타입 export |
| 4 | `lib/utils.ts` | cn(), formatInk() 유틸 |
| 5 | `lib/queryClient.ts` | TanStack Query 설정 |
| 6 | `stores/authStore.ts` | 인증 상태 관리 |
| 7 | `stores/uiStore.ts` | UI 상태 관리 |
| 8 | `stores/index.ts` | 스토어 export |

### Phase 2: Provider & Layout

| 순서 | 파일 | 설명 |
|------|------|------|
| 9 | `app/providers.tsx` | QueryClientProvider 래퍼 |
| 10 | `app/layout.tsx` | Root Layout 수정 (Providers 포함) |
| 11 | `components/layout/BottomNav.tsx` | 하단 네비게이션 |
| 12 | `app/(auth)/layout.tsx` | Auth Layout + BottomNav |

### Phase 3: Service & Components

| 순서 | 파일 | 설명 |
|------|------|------|
| 13 | `services/storyService.ts` | Mock API + 데이터 |
| 14 | `components/story/StoryCard.tsx` | 작품 카드 |
| 15 | `components/story/StoryBanner.tsx` | 배너 캐러셀 |
| 16 | `components/story/StoryList.tsx` | 가로 스크롤 리스트 |
| 17 | `components/story/StoryListSkeleton.tsx` | 로딩 스켈레톤 |

### Phase 4: Home Page

| 순서 | 파일 | 설명 |
|------|------|------|
| 18 | `hooks/useHome.ts` | 홈 데이터 훅 |
| 19 | `app/(auth)/home/page.tsx` | 홈 페이지 |

### Phase 5: Dev Server 실행
```bash
pnpm dev
# http://localhost:3000/home 에서 확인
```

## 핵심 파일 목록
1. `app/(auth)/home/page.tsx` - 홈 페이지 메인 컴포넌트
2. `app/(auth)/layout.tsx` - Auth 레이아웃 + BottomNav
3. `components/story/StoryCard.tsx` - 작품 카드 (썸네일, 제목, 작가명, 모금액)
4. `services/storyService.ts` - Mock 데이터 서비스
5. `app/providers.tsx` - TanStack Query Provider

## 이미지 처리
Mock 데이터의 썸네일/배너는 **Placeholder 색상 박스**로 처리:
- 그라데이션 배경 + 이모지/텍스트로 시각적 구분
- 실제 이미지 없이 빠르게 구현

## 반응형 디자인 (Mobile-First)
모바일 유즈케이스가 많으므로 **Mobile-First** 접근:

### Breakpoints
- **Mobile** (default): ~640px - 1컬럼 레이아웃
- **Tablet** (sm/md): 640px~1024px - 2컬럼 그리드
- **Desktop** (lg+): 1024px~ - max-width 제한 (768px)

### 주요 반응형 요소
| 컴포넌트 | Mobile | Tablet/Desktop |
|---------|--------|----------------|
| 배너 | 가로 100%, aspect-[2/1] | max-width 제한 |
| StoryCard | width 140px | width 160px |
| StoryList | 가로 스크롤 | 가로 스크롤 유지 |
| BottomNav | 고정 하단 | 고정 하단 |
| 컨테이너 | px-4 패딩 | max-w-3xl 중앙정렬 |

### 터치 친화적 UI
- 탭 타겟 최소 44px
- 스와이프 지원 (배너 캐러셀)
- Safe area 하단 여백 (pb-16)

## 기대 결과
- 추천 배너 캐러셀 (자동 슬라이드 5초)
- 인기 작품 리스트 (가로 스크롤)
- 최신 작품 리스트 (가로 스크롤)
- 하단 네비게이션 (홈, 탐색, 충전, 마이페이지)
- 로딩 중 스켈레톤 UI
- 3초 이내 페이지 로드 (AC-3 충족)

## Acceptance Criteria 충족
- AC-1: 메인 홈에 추천/인기 배너 영역 표시 ✓
- AC-2: 작품 리스트에 썸네일, 제목, 작가명, 현재 총 모금액 표시 ✓
- AC-3: 페이지 로드 시 3초 이내 작품 리스트 표시 ✓
