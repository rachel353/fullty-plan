# File Structure Plan - 쟈근친구들 V2 (Conture)

> Generated from: ia_structure.md, conceptual_model.json
> Date: 2026-01-06

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| State Management | Zustand | 4.x |
| Data Fetching | TanStack Query (React Query) | 5.x |
| Form Handling | React Hook Form + Zod | 7.x / 3.x |
| HTTP Client | Axios | 1.x |
| UI Components | Radix UI + shadcn/ui | - |
| Authentication | NextAuth.js | 4.x |
| Icons | Lucide React | - |

---

## Directory Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes group
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Splash → redirect
│   │   ├── login/
│   │   │   └── page.tsx          # Login
│   │   ├── signup/
│   │   │   └── page.tsx          # Signup
│   │   └── terms/
│   │       └── page.tsx          # Terms
│   │
│   ├── (auth)/                   # Authenticated routes group
│   │   ├── layout.tsx            # Auth check layout
│   │   ├── profile/
│   │   │   └── setup/
│   │   │       └── page.tsx      # Profile Setup
│   │   ├── mypage/
│   │   │   ├── page.tsx          # MyPage
│   │   │   └── wallet/
│   │   │       └── page.tsx      # Wallet
│   │   ├── home/
│   │   │   └── page.tsx          # Home
│   │   ├── explore/
│   │   │   └── page.tsx          # Explore
│   │   ├── search/
│   │   │   └── page.tsx          # Search Results
│   │   ├── stories/
│   │   │   └── [storyId]/
│   │   │       ├── page.tsx      # Story Detail
│   │   │       └── episodes/
│   │   │           └── [episodeId]/
│   │   │               └── page.tsx  # Episode Viewer
│   │   ├── creators/
│   │   │   └── [creatorId]/
│   │   │       └── page.tsx      # Creator Detail
│   │   └── shop/
│   │       └── page.tsx          # Ink Shop
│   │
│   ├── (creator)/                # Creator routes group
│   │   ├── layout.tsx            # Creator role check
│   │   └── studio/
│   │       ├── page.tsx          # Studio Dashboard
│   │       ├── episodes/
│   │       │   ├── page.tsx      # Episode Management
│   │       │   └── [episodeId]/
│   │       │       └── edit/
│   │       │           └── page.tsx  # Episode Editor
│   │       ├── proposals/
│   │       │   └── page.tsx      # Proposal Management
│   │       └── settlements/
│   │           └── page.tsx      # Settlement
│   │
│   ├── (admin)/                  # Admin routes group
│   │   ├── layout.tsx            # Admin role check
│   │   └── admin/
│   │       ├── page.tsx          # Admin Dashboard
│   │       ├── users/
│   │       │   └── page.tsx      # User Management
│   │       ├── contents/
│   │       │   └── page.tsx      # Content Management
│   │       ├── payments/
│   │       │   └── page.tsx      # Payment Management
│   │       └── settlements/
│   │           └── page.tsx      # Settlement Management
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts      # NextAuth handler
│   │   └── ...
│   │
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── providers.tsx             # Client providers
│
├── components/                   # Shared components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── BottomNav.tsx         # Mobile bottom navigation
│   │   ├── SideNav.tsx           # Side navigation
│   │   ├── AdminLayout.tsx
│   │   └── CreatorLayout.tsx
│   │
│   ├── auth/                     # Auth components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── SocialLoginButtons.tsx
│   │   └── ProfileSetupForm.tsx
│   │
│   ├── story/                    # Story domain components
│   │   ├── StoryCard.tsx
│   │   ├── StoryList.tsx
│   │   ├── StoryDetail.tsx
│   │   └── StoryBanner.tsx
│   │
│   ├── creator/                  # Creator domain components
│   │   ├── CreatorProfile.tsx
│   │   └── CreatorStoryList.tsx
│   │
│   ├── episode/                  # Episode domain components
│   │   ├── EpisodeList.tsx
│   │   ├── EpisodeCard.tsx
│   │   ├── EpisodeViewer.tsx
│   │   ├── EpisodeEditor.tsx
│   │   ├── ContentUploader.tsx
│   │   └── CreditSection.tsx
│   │
│   ├── proposal/                 # Proposal domain components
│   │   ├── ProposalCard.tsx
│   │   ├── ProposalList.tsx
│   │   ├── ProposalModal.tsx
│   │   ├── BackingModal.tsx
│   │   └── DirectBackingModal.tsx
│   │
│   ├── wallet/                   # Wallet domain components
│   │   ├── BalanceCard.tsx
│   │   ├── TransactionList.tsx
│   │   └── InkShop.tsx
│   │
│   ├── settlement/               # Settlement domain components
│   │   ├── SettlementSummary.tsx
│   │   ├── SettlementList.tsx
│   │   ├── WithdrawalModal.tsx
│   │   └── SettlementDetailModal.tsx
│   │
│   └── admin/                    # Admin domain components
│       ├── UserTable.tsx
│       ├── ContentTable.tsx
│       ├── PaymentTable.tsx
│       ├── SettlementTable.tsx
│       ├── SanctionModal.tsx
│       ├── DeleteConfirmModal.tsx
│       └── DashboardStats.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useWallet.ts              # Wallet operations
│   ├── useProposals.ts           # Proposal operations
│   ├── useEpisodes.ts            # Episode operations
│   ├── useSettlements.ts         # Settlement operations
│   ├── useInfiniteScroll.ts      # Infinite scroll
│   └── useDebounce.ts            # Debounce utility
│
├── services/                     # API service layer
│   ├── api.ts                    # Axios instance
│   ├── authService.ts            # Auth API calls
│   ├── userService.ts            # User API calls
│   ├── walletService.ts          # Wallet API calls
│   ├── transactionService.ts     # Transaction API calls
│   ├── paymentService.ts         # Payment API calls
│   ├── storyService.ts           # Story API calls
│   ├── creatorService.ts         # Creator API calls
│   ├── episodeService.ts         # Episode API calls
│   ├── proposalService.ts        # Proposal API calls
│   ├── backingService.ts         # Backing API calls
│   ├── creditService.ts          # Credit API calls
│   ├── settlementService.ts      # Settlement API calls
│   └── adminService.ts           # Admin API calls
│
├── stores/                       # Zustand stores
│   ├── authStore.ts              # Auth state
│   ├── walletStore.ts            # Wallet state
│   ├── uiStore.ts                # UI state (modals, toasts)
│   └── index.ts                  # Store exports
│
├── types/                        # TypeScript types
│   ├── user.ts                   # User types
│   ├── wallet.ts                 # Wallet types
│   ├── transaction.ts            # Transaction types
│   ├── payment.ts                # Payment types
│   ├── story.ts                  # Story types
│   ├── episode.ts                # Episode types
│   ├── episodeContent.ts         # EpisodeContent types
│   ├── proposal.ts               # Proposal types
│   ├── backing.ts                # Backing types
│   ├── credit.ts                 # Credit types
│   ├── escrow.ts                 # Escrow types
│   ├── withdrawal.ts             # WithdrawalRequest types
│   ├── sanction.ts               # Sanction types
│   ├── api.ts                    # API response types
│   └── index.ts                  # Type exports
│
├── lib/                          # Utility libraries
│   ├── utils.ts                  # General utilities
│   ├── cn.ts                     # className utility
│   ├── validators.ts             # Zod schemas
│   ├── constants.ts              # App constants
│   └── formatters.ts             # Date/number formatters
│
├── config/                       # Configuration
│   ├── site.ts                   # Site config
│   ├── navigation.ts             # Navigation config
│   └── routes.ts                 # Route constants
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── styles/                       # Additional styles
│   └── components/               # Component-specific styles
│
├── .env.local                    # Environment variables
├── .env.example                  # Environment example
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json
└── README.md
```

---

## File Mapping

### Pages (from IA Structure)

| Route | File Path | Component Name |
|-------|-----------|----------------|
| `/` | `app/(public)/page.tsx` | SplashPage |
| `/login` | `app/(public)/login/page.tsx` | LoginPage |
| `/signup` | `app/(public)/signup/page.tsx` | SignupPage |
| `/terms` | `app/(public)/terms/page.tsx` | TermsPage |
| `/profile/setup` | `app/(auth)/profile/setup/page.tsx` | ProfileSetupPage |
| `/mypage` | `app/(auth)/mypage/page.tsx` | MyPage |
| `/mypage/wallet` | `app/(auth)/mypage/wallet/page.tsx` | WalletPage |
| `/home` | `app/(auth)/home/page.tsx` | HomePage |
| `/explore` | `app/(auth)/explore/page.tsx` | ExplorePage |
| `/search` | `app/(auth)/search/page.tsx` | SearchPage |
| `/stories/:storyId` | `app/(auth)/stories/[storyId]/page.tsx` | StoryDetailPage |
| `/creators/:creatorId` | `app/(auth)/creators/[creatorId]/page.tsx` | CreatorDetailPage |
| `/stories/:storyId/episodes/:episodeId` | `app/(auth)/stories/[storyId]/episodes/[episodeId]/page.tsx` | EpisodeViewerPage |
| `/shop` | `app/(auth)/shop/page.tsx` | ShopPage |
| `/studio` | `app/(creator)/studio/page.tsx` | StudioPage |
| `/studio/episodes` | `app/(creator)/studio/episodes/page.tsx` | EpisodeManagementPage |
| `/studio/episodes/:episodeId/edit` | `app/(creator)/studio/episodes/[episodeId]/edit/page.tsx` | EpisodeEditorPage |
| `/studio/proposals` | `app/(creator)/studio/proposals/page.tsx` | ProposalManagementPage |
| `/studio/settlements` | `app/(creator)/studio/settlements/page.tsx` | SettlementPage |
| `/admin` | `app/(admin)/admin/page.tsx` | AdminDashboardPage |
| `/admin/users` | `app/(admin)/admin/users/page.tsx` | UserManagementPage |
| `/admin/contents` | `app/(admin)/admin/contents/page.tsx` | ContentManagementPage |
| `/admin/payments` | `app/(admin)/admin/payments/page.tsx` | PaymentManagementPage |
| `/admin/settlements` | `app/(admin)/admin/settlements/page.tsx` | SettlementManagementPage |

---

### Services (from Conceptual Model)

| Concept | Service File | Methods |
|---------|--------------|---------|
| User | `services/userService.ts` | getProfile, updateProfile, checkNickname |
| Wallet | `services/walletService.ts` | getBalance, getTransactions |
| Transaction | `services/transactionService.ts` | getAll, getById |
| Payment | `services/paymentService.ts` | createPayment, verifyPayment, getHistory |
| Story | `services/storyService.ts` | getAll, getById, create, update, delete, search |
| Creator | `services/creatorService.ts` | getById, getStories |
| Episode | `services/episodeService.ts` | getAll, getById, create, update, delete, publish |
| EpisodeContent | `services/episodeService.ts` | uploadContent, reorderContent, deleteContent |
| Proposal | `services/proposalService.ts` | getAll, getById, create, deal, drop |
| Backing | `services/backingService.ts` | createBacking, createDirectBacking |
| Credit | `services/creditService.ts` | getByEpisode |
| Escrow | - | (Backend internal, no frontend service) |
| WithdrawalRequest | `services/settlementService.ts` | requestWithdrawal, getRequests |
| Sanction | `services/adminService.ts` | createSanction, getSanctions |

---

### Types (from Conceptual Model)

| Concept | Type File | Exports |
|---------|-----------|---------|
| User | `types/user.ts` | User, UserRole, AuthProvider, UserStatus |
| Wallet | `types/wallet.ts` | Wallet |
| Transaction | `types/transaction.ts` | Transaction, TransactionType, TransactionDirection |
| Payment | `types/payment.ts` | Payment, PaymentMethod, PaymentStatus |
| Story | `types/story.ts` | Story, StoryStatus |
| Episode | `types/episode.ts` | Episode, EpisodeStatus |
| EpisodeContent | `types/episodeContent.ts` | EpisodeContent, ContentType |
| Proposal | `types/proposal.ts` | Proposal, ProposalStatus |
| Backing | `types/backing.ts` | Backing, BackingType, BackingStatus |
| Credit | `types/credit.ts` | Credit, Contributor |
| Escrow | `types/escrow.ts` | Escrow, EscrowStatus |
| WithdrawalRequest | `types/withdrawal.ts` | WithdrawalRequest, WithdrawalStatus |
| Sanction | `types/sanction.ts` | Sanction, SanctionType |

---

### Component Mapping (from User Stories)

| User Story | Component | Description |
|------------|-----------|-------------|
| US-001 | SignupForm, ProfileSetupForm | 회원가입/프로필 설정 |
| US-002 | LoginForm, SocialLoginButtons | 로그인 |
| US-003 | BalanceCard | 잔액 표시 |
| US-004 | TransactionList | 트랜잭션 내역 |
| US-005 | InkShop | 충전 옵션 선택 |
| US-006 | StoryBanner, StoryList, StoryCard | 홈/탐색 |
| US-007 | SearchInput, FilterOptions | 검색/필터 |
| US-033 | CreatorProfile, CreatorStoryList, StoryCard | 작가 상세 |
| US-008 | EpisodeViewer | 콘텐츠 뷰어 |
| US-009 | ProposalModal | 제안 생성 모달 |
| US-010 | BackingModal | 지지 모달 |
| US-011 | DirectBackingModal | 직접 후원 모달 |
| US-012 | CreditSection | 크레딧 표시 |
| US-013 | ProposalList, ProposalCard | 제안 목록 |
| US-014 | EpisodeEditor, ContentUploader | 에피소드 편집 |
| US-015 | EpisodeList, EpisodeCard | 에피소드 관리 |
| US-016 | ProposalList (Creator) | 제안 관리 |
| US-017 | DealConfirmModal | Deal 확인 |
| US-018 | DropConfirmModal | Drop 확인 |
| US-019 | EpisodeEditor (Final) | 완성본 업로드 |
| US-020 | SettlementSummary, SettlementList | 정산 현황 |
| US-021 | WithdrawalModal | 출금 요청 |
| US-022 | UserTable | 회원 목록 |
| US-023 | SanctionModal | 회원 제재 |
| US-024 | ContentTable, DeleteConfirmModal | 콘텐츠 관리 |
| US-025 | SettlementTable | 정산 요청 목록 |
| US-026 | SettlementDetailModal | 정산 승인 |
| US-027 | PaymentTable | 결제 내역 |
| US-028 | DashboardStats | 대시보드 통계 |

---

## Implementation Notes

### Routing Strategy

- **Route Groups**: `(public)`, `(auth)`, `(creator)`, `(admin)` for layout separation
- **Dynamic Routes**: `[storyId]`, `[episodeId]` for resource pages
- **Middleware**: Auth check in layout.tsx for each group

### State Management

- **Server State**: TanStack Query for API data (stories, episodes, proposals)
- **Client State**: Zustand for UI state (modals, auth)
- **Form State**: React Hook Form for forms

### Component Architecture

- **Page Components**: Minimal logic, composition of domain components
- **Domain Components**: Business logic, API calls via hooks
- **UI Components**: Stateless, styled with Tailwind

### Performance

- **Lazy Loading**: Dynamic imports for heavy components
- **Infinite Scroll**: TransactionList, ProposalList
- **Image Optimization**: next/image for all images
- **Caching**: TanStack Query caching strategy

### Error Handling

- **API Errors**: Global error boundary + toast notifications
- **Form Validation**: Zod schemas with React Hook Form
- **Auth Errors**: Redirect to login with return URL

---

## 문서 정보

- **생성일:** 2026-01-06
- **기반 문서:** ia_structure.md, conceptual_model.json
