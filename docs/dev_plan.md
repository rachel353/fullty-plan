# Frontend Development Plan - 쟈근친구들 V2 (Conture)

> Generated from: ia_structure.md, logical_architecture.md, file_structure.md
> Date: 2026-01-06

---

## Overview

### Project Summary

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + TanStack Query
- **Form Handling**: React Hook Form + Zod

### Scope

- **In Scope**: UI 컴포넌트, 페이지, 클라이언트 로직, Mock 데이터 기반 개발
- **Out of Scope**: API 엔드포인트, 데이터베이스, 서버 사이드 로직

---

## Development Phases

### Phase A: Project Setup (프로젝트 설정)

1. Next.js 14 프로젝트 초기화
2. Tailwind CSS 설정
3. shadcn/ui 설치 및 기본 컴포넌트
4. Zustand 스토어 설정
5. TanStack Query Provider 설정
6. 타입 정의 (types/)

### Phase B: Layout & Navigation (레이아웃)

1. Root Layout 및 Providers
2. Public Layout (비인증)
3. Auth Layout (인증 체크)
4. Creator Layout (작가 전용)
5. Admin Layout (관리자 전용)
6. Bottom Navigation (모바일)
7. Side Navigation (데스크톱)

### Phase C: Authentication (인증)

1. Login Page
2. Signup Page
3. Profile Setup Page
4. Auth Store (Zustand)
5. Auth Guard HOC/Hook

### Phase D: Reader Core (독자 핵심)

1. Home Page (홈)
2. Explore Page (탐색)
3. Search Page (검색)
4. Story Detail Page (작품 상세)
5. Episode Viewer Page (에피소드 뷰어)

### Phase E: Wallet & Payment (지갑/결제)

1. MyPage
2. Wallet Page (내 지갑)
3. Transaction List
4. Ink Shop Page (충전)

### Phase F: Intervention (제안/후원)

1. Proposal List Component
2. Proposal Modal
3. Backing Modal
4. Direct Backing Modal
5. Credit Section Component

### Phase G: Creator Studio (작가 스튜디오)

1. Studio Dashboard
2. Episode Management Page
3. Episode Editor Page
4. Content Uploader
5. Proposal Management Page
6. Settlement Page

### Phase H: Admin (관리자)

1. Admin Dashboard
2. User Management Page
3. Content Management Page
4. Payment Management Page
5. Settlement Management Page

---

## Task Breakdown

### Phase A: Project Setup

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-001 | Next.js 14 프로젝트 초기화 및 기본 설정 | high | - | next.config.js, package.json |
| task-002 | Tailwind CSS 설정 및 디자인 토큰 정의 | high | task-001 | tailwind.config.ts, app/globals.css |
| | **Typography 위계 강화 (2026-01-08)**: globals.css에 size + weight 조합 정의. Page Title (font-bold), Section Header (font-semibold), Table Header (font-medium), Body (font-normal) 시스템 확립 | | | |
| task-003 | shadcn/ui 설치 및 기본 UI 컴포넌트 설정 | high | task-002 | components/ui/*.tsx |
| task-004 | TypeScript 타입 정의 (Conceptual Model 기반) | high | task-001 | types/*.ts |
| task-005 | Zustand 스토어 설정 (Auth, UI) | high | task-004 | stores/*.ts |
| task-006 | TanStack Query Provider 설정 | high | task-001 | app/providers.tsx |

### Phase B: Layout & Navigation

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-007 | Root Layout 및 Provider 통합 | high | task-005, task-006 | app/layout.tsx |
| task-008 | Public Layout (비인증 영역) | high | task-007 | app/(public)/layout.tsx |
| task-009 | Auth Layout (인증 체크) | high | task-007 | app/(auth)/layout.tsx |
| task-010 | Creator Layout (작가 전용) | medium | task-009 | app/(creator)/layout.tsx |
| task-011 | Admin Layout (관리자 전용) | medium | task-009 | app/(admin)/layout.tsx |
| task-012 | Bottom Navigation 컴포넌트 | high | task-003 | components/layout/BottomNav.tsx |
| task-013 | Side Navigation 컴포넌트 (Creator/Admin) | medium | task-003 | components/layout/SideNav.tsx |
| task-014 | Header 컴포넌트 | high | task-003 | components/layout/Header.tsx |

### Phase C: Authentication

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-015 | Login Page UI | high | task-008 | app/(public)/login/page.tsx |
| task-016 | LoginForm 컴포넌트 | high | task-003 | components/auth/LoginForm.tsx |
| task-017 | SocialLoginButtons 컴포넌트 | high | task-003 | components/auth/SocialLoginButtons.tsx |
| task-018 | Signup Page UI | high | task-008 | app/(public)/signup/page.tsx |
| task-019 | SignupForm 컴포넌트 | high | task-003 | components/auth/SignupForm.tsx |
| task-020 | Terms Page UI | medium | task-008 | app/(public)/terms/page.tsx |
| task-021 | ProfileSetup Page UI | high | task-009 | app/(auth)/profile/setup/page.tsx |
| task-022 | ProfileSetupForm 컴포넌트 | high | task-003 | components/auth/ProfileSetupForm.tsx |
| task-023 | useAuth Hook 구현 | high | task-005 | hooks/useAuth.ts |
| task-024 | Auth Service (Mock API) | high | task-004 | services/authService.ts |

### Phase D: Reader Core

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-025 | Home Page UI | high | task-009, task-012 | app/(auth)/home/page.tsx |
| task-026 | StoryBanner 컴포넌트 | high | task-003 | components/story/StoryBanner.tsx |
| task-027 | StoryCard 컴포넌트 | high | task-003 | components/story/StoryCard.tsx |
| task-028 | StoryList 컴포넌트 | high | task-027 | components/story/StoryList.tsx |
| task-029 | Explore Page UI | high | task-009, task-028 | app/(auth)/explore/page.tsx |
| task-030 | Search Page UI | medium | task-009, task-028 | app/(auth)/search/page.tsx |
| task-031 | Story Detail Page UI | high | task-009 | app/(auth)/stories/[storyId]/page.tsx |
| task-032 | StoryDetail 컴포넌트 | high | task-027 | components/story/StoryDetail.tsx |
| task-033 | EpisodeCard 컴포넌트 | high | task-003 | components/episode/EpisodeCard.tsx |
| task-034 | EpisodeList 컴포넌트 | high | task-033 | components/episode/EpisodeList.tsx |
| task-035 | Episode Viewer Page UI | high | task-009 | app/(auth)/stories/[storyId]/episodes/[episodeId]/page.tsx |
| task-036 | ContentRenderer 컴포넌트 | high | task-003 | components/episode/ContentRenderer.tsx |
| task-037 | ActionBar 컴포넌트 | high | task-003 | components/episode/ActionBar.tsx |
| task-038 | Story Service (Mock API) | high | task-004 | services/storyService.ts |
| task-039 | Episode Service (Mock API) | high | task-004 | services/episodeService.ts |

### Phase E: Wallet & Payment

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-040 | MyPage UI | high | task-009, task-012 | app/(auth)/mypage/page.tsx |
| task-041 | Wallet Page UI | high | task-040 | app/(auth)/mypage/wallet/page.tsx |
| task-042 | BalanceCard 컴포넌트 | high | task-003 | components/wallet/BalanceCard.tsx |
| task-043 | TransactionList 컴포넌트 | high | task-003 | components/wallet/TransactionList.tsx |
| task-044 | Shop Page UI | high | task-009 | app/(auth)/shop/page.tsx |
| task-045 | InkShop 컴포넌트 | high | task-003 | components/wallet/InkShop.tsx |
| task-046 | Wallet Service (Mock API) | high | task-004 | services/walletService.ts |
| task-047 | Transaction Service (Mock API) | medium | task-004 | services/transactionService.ts |
| task-048 | Payment Service (Mock API) | high | task-004 | services/paymentService.ts |

### Phase F: Intervention

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-049 | ProposalCard 컴포넌트 | high | task-003 | components/proposal/ProposalCard.tsx |
| task-050 | ProposalList 컴포넌트 | high | task-049 | components/proposal/ProposalList.tsx |
| task-051 | ProposalModal 컴포넌트 | high | task-003 | components/proposal/ProposalModal.tsx |
| task-052 | BackingModal 컴포넌트 | high | task-003 | components/proposal/BackingModal.tsx |
| task-053 | DirectBackingModal 컴포넌트 | high | task-003 | components/proposal/DirectBackingModal.tsx |
| task-054 | CreditSection 컴포넌트 | high | task-003 | components/episode/CreditSection.tsx |
| task-055 | Proposal Service (Mock API) | high | task-004 | services/proposalService.ts |
| task-056 | Backing Service (Mock API) | high | task-004 | services/backingService.ts |
| task-057 | useProposals Hook 구현 | high | task-055 | hooks/useProposals.ts |
| task-058 | Episode Viewer 통합 (Proposal + Credit) | high | task-035, task-050, task-054 | app/(auth)/stories/[storyId]/episodes/[episodeId]/page.tsx |

### Phase G: Creator Studio

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-059 | Studio Dashboard Page UI | high | task-010, task-013 | app/(creator)/studio/page.tsx |
| task-060 | Episode Management Page UI | high | task-059 | app/(creator)/studio/episodes/page.tsx |
| task-061 | CreatorEpisodeList 컴포넌트 | high | task-033 | components/episode/CreatorEpisodeList.tsx |
| task-062 | Episode Editor Page UI | high | task-060 | app/(creator)/studio/episodes/[episodeId]/edit/page.tsx |
| task-063 | EpisodeEditor 컴포넌트 | high | task-003 | components/episode/EpisodeEditor.tsx |
| task-064 | ContentUploader 컴포넌트 | high | task-003 | components/episode/ContentUploader.tsx |
| task-065 | Proposal Management Page UI | high | task-059 | app/(creator)/studio/proposals/page.tsx |
| task-066 | ProposalManagementList 컴포넌트 | high | task-049 | components/proposal/ProposalManagementList.tsx |
| task-067 | DealConfirmModal 컴포넌트 | high | task-003 | components/proposal/DealConfirmModal.tsx |
| task-068 | DropConfirmModal 컴포넌트 | high | task-003 | components/proposal/DropConfirmModal.tsx |
| task-069 | Settlement Page UI | high | task-059 | app/(creator)/studio/settlements/page.tsx |
| task-070 | SettlementSummary 컴포넌트 | high | task-003 | components/settlement/SettlementSummary.tsx |
| task-071 | SettlementList 컴포넌트 | high | task-003 | components/settlement/SettlementList.tsx |
| task-072 | WithdrawalModal 컴포넌트 | high | task-003 | components/settlement/WithdrawalModal.tsx |
| task-073 | Episode Management Service (Mock API) | high | task-039 | services/episodeService.ts |
| task-074 | Settlement Service (Mock API) | high | task-004 | services/settlementService.ts |

### Phase H: Admin

| Task ID | Title | Priority | Dependencies | Files |
|---------|-------|----------|--------------|-------|
| task-075 | Admin Dashboard Page UI | medium | task-011, task-013 | app/(admin)/admin/page.tsx |
| task-076 | DashboardStats 컴포넌트 | medium | task-003 | components/admin/DashboardStats.tsx |
| task-077 | User Management Page UI | medium | task-075 | app/(admin)/admin/users/page.tsx |
| task-078 | UserTable 컴포넌트 | medium | task-003 | components/admin/UserTable.tsx |
| task-079 | SanctionModal 컴포넌트 | medium | task-003 | components/admin/SanctionModal.tsx |
| task-080 | Content Management Page UI | medium | task-075 | app/(admin)/admin/contents/page.tsx |
| task-081 | ContentTable 컴포넌트 | medium | task-003 | components/admin/ContentTable.tsx |
| task-082 | DeleteConfirmModal 컴포넌트 | medium | task-003 | components/admin/DeleteConfirmModal.tsx |
| task-083 | Payment Management Page UI | medium | task-075 | app/(admin)/admin/payments/page.tsx |
| task-084 | PaymentTable 컴포넌트 | medium | task-003 | components/admin/PaymentTable.tsx |
| task-085 | Settlement Management Page UI | medium | task-075 | app/(admin)/admin/settlements/page.tsx |
| task-086 | SettlementTable 컴포넌트 | medium | task-003 | components/admin/SettlementTable.tsx |
| task-087 | SettlementDetailModal 컴포넌트 | medium | task-003 | components/admin/SettlementDetailModal.tsx |
| task-088 | Admin Service (Mock API) | medium | task-004 | services/adminService.ts |

---

## Task Statistics

| Phase | Total Tasks | High Priority | Medium Priority |
|-------|-------------|---------------|-----------------|
| A. Project Setup | 6 | 6 | 0 |
| B. Layout & Navigation | 8 | 5 | 3 |
| C. Authentication | 10 | 8 | 2 |
| D. Reader Core | 15 | 14 | 1 |
| E. Wallet & Payment | 9 | 7 | 2 |
| F. Intervention | 10 | 10 | 0 |
| G. Creator Studio | 16 | 16 | 0 |
| H. Admin | 14 | 0 | 14 |
| **Total** | **88** | **66** | **22** |

---

## Recommended Execution Order

### Sprint 1: Foundation (task-001 ~ task-014)
- 프로젝트 설정
- 타입 정의
- 레이아웃 구조

### Sprint 2: Auth & Core Reader (task-015 ~ task-039)
- 인증 플로우
- 홈/탐색/검색
- 에피소드 뷰어 기본

### Sprint 3: Wallet & Intervention (task-040 ~ task-058)
- 지갑/결제
- 제안/지지/후원
- 크레딧 표시

### Sprint 4: Creator Studio (task-059 ~ task-074)
- 크리에이터 스튜디오
- 에피소드 관리
- 정산 관리

### Sprint 5: Admin (task-075 ~ task-088)
- 관리자 대시보드
- 회원/콘텐츠/결제/정산 관리

---

## Mock Data Strategy

각 서비스는 `services/mock/` 디렉토리에 Mock 데이터를 정의하고, 실제 API 연동 전까지 Mock을 사용합니다.

```typescript
// services/mock/users.ts
export const mockUsers: User[] = [
  { id: '1', nickname: 'reader1', role: 'READER', ... },
  { id: '2', nickname: 'creator1', role: 'CREATOR', ... },
];
```

---

## 문서 정보

- **생성일:** 2026-01-06
- **기반 문서:** ia_structure.md, logical_architecture.md, file_structure.md
