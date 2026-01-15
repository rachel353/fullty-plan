# Logical Architecture - 쟈근친구들 V2 (Conture)

> Generated from: user_stories_data.json, conceptual_model.json, ia_structure.md
> Date: 2026-01-06

---

## Overview

### Architecture Pattern

**Modular Frontend Architecture** with domain-driven component design for a Next.js 14 application.

### Core Principles

1. **Single Responsibility Principle (SRP)**: Each component handles exactly one cohesive responsibility
2. **Domain Separation**: Components grouped by business domain
3. **Layered Architecture**: Pages → Components → Hooks → Services → Types
4. **Unidirectional Data Flow**: Props down, events up, state managed via hooks/stores

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Presentation Layer                          │
│  (Pages, Layouts, Navigation)                                       │
├─────────────────────────────────────────────────────────────────────┤
│                         Component Layer                             │
│  (Domain Components, UI Components, Modals)                         │
├─────────────────────────────────────────────────────────────────────┤
│                         Business Logic Layer                        │
│  (Custom Hooks, Store Actions)                                      │
├─────────────────────────────────────────────────────────────────────┤
│                         Data Access Layer                           │
│  (Services, API Client)                                             │
├─────────────────────────────────────────────────────────────────────┤
│                         Type Definition Layer                       │
│  (Types, Schemas, Validators)                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Component Identification

### Actor-Action Analysis

| Actor | Actions | Derived Components |
|-------|---------|-------------------|
| Reader | 회원가입, 로그인, 프로필 설정 | AuthenticationService, UserProfileService |
| Reader | Ink 잔액 확인, 트랜잭션 조회, 충전 | WalletService, TransactionService, PaymentService |
| Reader | 작품 탐색, 검색, 필터링 | StoryDiscoveryService, SearchService |
| Reader | 에피소드 열람 | EpisodeViewerService, ContentRenderer |
| Reader | 제안 생성, 지지, 직접 후원 | ProposalService, BackingService |
| Reader | 크레딧 확인 | CreditDisplayService |
| Creator | 에피소드 업로드, 관리 | EpisodeManagementService, ContentUploadService |
| Creator | 제안 Deal/Drop 결정 | ProposalDecisionService |
| Creator | 정산 조회, 출금 요청 | SettlementService, WithdrawalService |
| Admin | 회원 관리, 제재 | UserAdminService, SanctionService |
| Admin | 콘텐츠 관리 | ContentModerationService |
| Admin | 결제 내역 조회 | PaymentAdminService |
| Admin | 정산 요청 승인 | SettlementApprovalService |
| System | 에스크로 처리 | EscrowService |
| System | 크레딧 생성 | CreditGenerationService |
| Reader/Creator | 신고 제출 | ReportService, ReportModal |
| Admin | 신고 처리 | ReportAdminService, ReportTable, ReportDetailModal |

---

## Component Specifications

### 1. Authentication Domain

#### <AuthenticationService>
- **Primary Responsibility**: Handles user authentication including email login, social OAuth, session management, password reset, and account withdrawal.
- **Type**: Service
- **User Stories**: US-001, US-002, US-002-1, US-002-2
- **Dependencies**: API Client, AuthStore
- **Interfaces**:
  - `login(email, password): Promise<AuthResult>`
  - `socialLogin(provider): Promise<AuthResult>`
  - `signup(userData): Promise<AuthResult>`
  - `logout(): Promise<void>`
  - `verifyEmail(token): Promise<boolean>`
  - `resetPassword(phone, newPassword): Promise<void>` (change-2026-01-14-1500)
  - `withdrawAccount(password): Promise<void>` (change-2026-01-14-1500)
- **Validation**: ✓ Validated - Single responsibility (authentication), specific name

#### <UserProfileService>
- **Primary Responsibility**: Manages user profile data including nickname validation, profile updates, and identity verification status.
- **Type**: Service
- **User Stories**: US-001
- **Dependencies**: API Client
- **Interfaces**:
  - `getProfile(): Promise<User>`
  - `updateProfile(data): Promise<User>`
  - `checkNicknameAvailability(nickname): Promise<boolean>`
  - `verifyIdentity(data): Promise<VerificationResult>`
- **Validation**: ✓ Validated - Separated from auth (profile vs authentication)

#### <LoginForm>
- **Primary Responsibility**: Renders the login form UI and handles form validation for email/password login.
- **Type**: Component
- **User Stories**: US-002
- **Dependencies**: AuthenticationService, React Hook Form, Zod
- **Validation**: ✓ Validated - Form rendering only

#### <SignupForm>
- **Primary Responsibility**: Renders the signup form UI and handles multi-step registration flow.
- **Type**: Component
- **User Stories**: US-001
- **Dependencies**: AuthenticationService, UserProfileService
- **Validation**: ✓ Validated - Signup form rendering only

#### <SocialLoginButtons>
- **Primary Responsibility**: Renders OAuth provider buttons and initiates social authentication flows.
- **Type**: Component
- **User Stories**: US-001, US-002
- **Dependencies**: AuthenticationService
- **Validation**: ✓ Validated - Social button rendering only

#### <ProfileSetupForm>
- **Primary Responsibility**: Renders the profile setup form for nickname and identity verification after initial signup.
- **Type**: Component
- **User Stories**: US-001
- **Dependencies**: UserProfileService
- **Validation**: ✓ Validated - Profile setup form only

#### <PhoneVerification> (change-2026-01-14-1500)
- **Primary Responsibility**: Renders phone number input with verification code sending/validation and countdown timer.
- **Type**: Component
- **User Stories**: US-001, US-002-1
- **Dependencies**: usePhoneVerification hook
- **Interfaces**:
  - `onVerified(phone: string): void`
  - `initialPhone?: string`
- **Validation**: ✓ Validated - Phone verification UI only

#### <PasswordRuleChecker> (change-2026-01-14-1500)
- **Primary Responsibility**: Renders real-time password validation indicators (8+ chars, letters, numbers, special chars optional).
- **Type**: Component
- **User Stories**: US-001, US-002-1
- **Dependencies**: None (presentational)
- **Interfaces**:
  - `password: string`
  - `showOptionalRules?: boolean`
- **Validation**: ✓ Validated - Password rule display only

#### <PasswordResetForm> (change-2026-01-14-1500)
- **Primary Responsibility**: Renders the 3-step password reset flow UI (phone input → verification → new password).
- **Type**: Component
- **User Stories**: US-002-1
- **Dependencies**: PhoneVerification, PasswordRuleChecker, AuthenticationService
- **Validation**: ✓ Validated - Password reset form only

#### <WithdrawForm> (change-2026-01-14-1500)
- **Primary Responsibility**: Renders account withdrawal form with confirmation steps (password, confirmation text, agreement).
- **Type**: Component
- **User Stories**: US-002-2
- **Dependencies**: AuthenticationService
- **Interfaces**:
  - `onWithdraw(): void`
- **Validation**: ✓ Validated - Withdrawal form only

#### <usePhoneVerification> (change-2026-01-14-1500)
- **Primary Responsibility**: Custom hook for managing phone verification state, sending codes, and countdown timer (5 min).
- **Type**: Hook
- **User Stories**: US-001, US-002-1
- **Dependencies**: API Client
- **Interfaces**:
  - `sendCode(phone: string): Promise<void>`
  - `verifyCode(code: string): Promise<boolean>`
  - `timer: number`
  - `isCodeSent: boolean`
  - `isVerified: boolean`
- **Validation**: ✓ Validated - Phone verification logic only

---

### 2. Wallet Domain

#### <WalletService>
- **Primary Responsibility**: Retrieves and manages user wallet balance including current balance and creator settlement balances.
- **Type**: Service
- **User Stories**: US-003, US-020
- **Dependencies**: API Client
- **Interfaces**:
  - `getBalance(): Promise<Wallet>`
  - `getCreatorBalance(): Promise<CreatorWallet>`
- **Validation**: ✓ Validated - Balance retrieval only

#### <TransactionService>
- **Primary Responsibility**: Retrieves and filters Ink transaction history for user wallet.
- **Type**: Service
- **User Stories**: US-004
- **Dependencies**: API Client
- **Interfaces**:
  - `getTransactions(filter?): Promise<PaginatedList<Transaction>>`
  - `getTransactionById(id): Promise<Transaction>`
- **Validation**: ✓ Validated - Transaction reading only

#### <PaymentService>
- **Primary Responsibility**: Processes Ink purchase payments through PG integration and handles payment callbacks.
- **Type**: Service
- **User Stories**: US-005
- **Dependencies**: API Client, PG SDK (Toss/Payple)
- **Interfaces**:
  - `createPayment(amount): Promise<PaymentIntent>`
  - `verifyPayment(pgTransactionId): Promise<PaymentResult>`
  - `getPaymentHistory(): Promise<PaginatedList<Payment>>`
- **Validation**: ✓ Validated - Payment processing only

#### <BalanceCard>
- **Primary Responsibility**: Displays user's current Ink balance with formatting and visual styling.
- **Type**: Component
- **User Stories**: US-003
- **Dependencies**: WalletService (via hook)
- **Validation**: ✓ Validated - Balance display only

#### <TransactionList>
- **Primary Responsibility**: Renders paginated list of transactions with infinite scroll and filtering.
- **Type**: Component
- **User Stories**: US-004
- **Dependencies**: TransactionService (via hook)
- **Validation**: ✓ Validated - Transaction list rendering only

#### <InkShop>
- **Primary Responsibility**: Displays Ink purchase options in vertical list layout and initiates payment flow.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: PaymentService (via hook)
- **UI Layout** (change-2026-01-12-1444): **Vertical 1-column list** (changed from grid 2-column)
  - Card structure: Left (coin amount + bonus), Right (discount rate + price)
  - Consistent card height, dense spacing for comparison UX
- **Navigation** (change-2026-01-13-1640): 결제하기 버튼 클릭 → `/shop/payment` 페이지로 이동
- **Validation**: ✓ Validated - Shop UI only

#### <OrderInfoCard> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Displays order information including Ink amount, bonus, and payment total.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: None (props only)
- **Props**:
  - `inkAmount: number` - 충전 Ink 수량
  - `bonusInkAmount?: number` - 보너스 Ink 수량
  - `originalPrice: number` - 기본 금액
  - `discountRate?: number` - 할인율
  - `finalPrice: number` - 최종 결제 금액
- **Validation**: ✓ Validated - Order info display only

#### <PaymentMethodSelector> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Renders payment method radio options and handles selection.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: None (controlled component)
- **Props**:
  - `value: PaymentMethod` - 현재 선택된 결제 수단
  - `onChange: (method: PaymentMethod) => void` - 선택 변경 핸들러
- **Options**: CARD (기본값), BANK_TRANSFER, VIRTUAL_ACCOUNT, TOSS
- **Validation**: ✓ Validated - Payment method selection only

#### <PaymentTermsAgreement> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Renders terms agreement checkbox and handles agreement state.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: None (controlled component)
- **Props**:
  - `checked: boolean` - 동의 여부
  - `onChange: (checked: boolean) => void` - 동의 변경 핸들러
- **Validation**: ✓ Validated - Terms agreement UI only

#### <PaymentCTA> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Renders the payment action button with dynamic amount display.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: None (controlled component)
- **Props**:
  - `amount: number` - 결제 금액
  - `disabled: boolean` - 비활성화 여부 (약관 미동의 시)
  - `loading: boolean` - 결제 처리 중 상태
  - `onClick: () => void` - 클릭 핸들러
- **Validation**: ✓ Validated - CTA button only

#### <PaymentSuccessStatus> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Displays payment success state with icon and message.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: None
- **Display**: 체크 아이콘, "결제가 완료되었습니다", 서브 메시지
- **Validation**: ✓ Validated - Success status display only

#### <PaymentReceiptCard> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Displays payment receipt details including transaction info.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: None (props only)
- **Props**:
  - `payment: Payment` - 결제 정보 (Ink 수량, 보너스, 결제 수단, 결제 일시, 거래 번호, 결제 금액)
- **Validation**: ✓ Validated - Receipt display only

#### <ChargeResultCard> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Displays current Ink balance after charging.
- **Type**: Component
- **User Stories**: US-005
- **Dependencies**: WalletService (via hook)
- **Display**: 현재 보유 Ink 수량 (카드 형태로 시각적 구분)
- **Validation**: ✓ Validated - Balance result display only

#### <PaymentErrorModal> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Displays payment error with retry option.
- **Type**: Component (Modal)
- **User Stories**: US-005
- **Dependencies**: uiStore (modal control)
- **Props**:
  - `errorMessage: string` - PG 응답 기반 에러 메시지
  - `onRetry: () => void` - 재시도 핸들러
  - `onClose: () => void` - 닫기 핸들러
- **Validation**: ✓ Validated - Error modal only

#### <usePaymentProcess> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Manages payment flow including PG integration, state management, and duplicate prevention.
- **Type**: Hook
- **User Stories**: US-005
- **Dependencies**: PaymentService, walletStore
- **Interfaces**:
  - `processPayment(paymentData): Promise<PaymentResult>`
  - `isProcessing: boolean` - 중복 결제 방지
  - `error: PaymentError | null`
- **Validation**: ✓ Validated - Payment process logic only

#### <useReceiptDownload> - NEW (change-2026-01-13-1640)
- **Primary Responsibility**: Handles receipt PDF download functionality.
- **Type**: Hook
- **User Stories**: US-005
- **Dependencies**: PaymentService
- **Interfaces**:
  - `downloadReceipt(paymentId): Promise<void>`
  - `isDownloading: boolean`
- **Validation**: ✓ Validated - Receipt download only

---

### 3. Story Discovery Domain

#### <StoryDiscoveryService>
- **Primary Responsibility**: Retrieves story listings with filtering, sorting, and recommendation logic.
- **Type**: Service
- **User Stories**: US-006, US-007
- **Dependencies**: API Client
- **Interfaces**:
  - `getFeaturedStories(): Promise<Story[]>`
  - `getPopularStories(): Promise<Story[]>`
  - `getLatestStories(): Promise<Story[]>`
  - `getStories(filter, sort, page): Promise<PaginatedList<Story>>`
  - `getStoryById(id): Promise<Story>`
- **Validation**: ✓ Validated - Story retrieval only

#### <SearchService>
- **Primary Responsibility**: Handles search queries for stories and creators with debouncing and result ranking.
- **Type**: Service
- **User Stories**: US-007
- **Dependencies**: API Client
- **Interfaces**:
  - `search(query): Promise<SearchResults>`
  - `getSuggestions(query): Promise<string[]>`
- **Validation**: ✓ Validated - Search functionality only

#### <StoryBanner>
- **Primary Responsibility**: Renders featured story carousel/banner on home page.
- **Type**: Component
- **User Stories**: US-006
- **Dependencies**: StoryDiscoveryService (via hook)
- **Validation**: ✓ Validated - Banner rendering only

#### <StoryList>
- **Primary Responsibility**: Renders grid/list of story cards with responsive layout.
- **Type**: Component
- **User Stories**: US-006, US-007
- **Dependencies**: None (receives stories as props)
- **Validation**: ✓ Validated - List layout only

#### <StoryCard>
- **Primary Responsibility**: Renders individual story preview with thumbnail, title, author, and bounty amount.
- **Type**: Component
- **User Stories**: US-006
- **Dependencies**: None (presentational)
- **Validation**: ✓ Validated - Card rendering only

#### <StoryDetail>
- **Primary Responsibility**: Renders complete story information page with episode list.
- **Type**: Component
- **User Stories**: US-006, US-008
- **Dependencies**: StoryDiscoveryService, EpisodeService (via hooks)
- **Validation**: ✓ Validated - Story detail page only

---

### 4. Episode Viewer Domain

#### <EpisodeViewerService>
- **Primary Responsibility**: Retrieves episode content and metadata for viewing.
- **Type**: Service
- **User Stories**: US-008
- **Dependencies**: API Client
- **Interfaces**:
  - `getEpisode(storyId, episodeId): Promise<Episode>`
  - `getEpisodeContent(episodeId): Promise<EpisodeContent[]>`
- **Validation**: ✓ Validated - Episode data retrieval only

#### <ContentRenderer>
- **Primary Responsibility**: Renders episode content (images/text) with scroll tracking and lazy loading.
- **Type**: Component
- **User Stories**: US-008
- **Dependencies**: EpisodeContent data
- **Validation**: ✓ Validated - Content rendering only

#### <EpisodeViewer>
- **Primary Responsibility**: Composes episode viewing experience including content, action bar, and proposal list.
- **Type**: Component (Container)
- **User Stories**: US-008, US-012, US-013
- **Dependencies**: ContentRenderer, ActionBar, ProposalList, CreditSection
- **Validation**: ✓ Validated - Viewer composition only

#### <ActionBar>
- **Primary Responsibility**: Renders fixed bottom action bar with proposal and backing buttons (OPEN state only).
- **Type**: Component
- **User Stories**: US-008, US-009, US-011
- **Dependencies**: Episode status
- **Validation**: ✓ Validated - Action buttons only

#### <CreditSection>
- **Primary Responsibility**: Renders contributor credits including Main Producers and sponsor list.
- **Type**: Component
- **User Stories**: US-012
- **Dependencies**: CreditDisplayService
- **Validation**: ✓ Validated - Credit display only

#### <CreditDisplayService>
- **Primary Responsibility**: Retrieves and formats credit data for episode display.
- **Type**: Service
- **User Stories**: US-012
- **Dependencies**: API Client
- **Interfaces**:
  - `getCredits(episodeId): Promise<Credit>`
- **Validation**: ✓ Validated - Credit retrieval only

---

### 5. Intervention Domain (Proposal & Backing)

#### <ProposalService>
- **Primary Responsibility**: Handles proposal CRUD operations including creation with escrow initialization.
- **Type**: Service
- **User Stories**: US-009, US-013
- **Dependencies**: API Client, EscrowService
- **Interfaces**:
  - `createProposal(episodeId, data): Promise<Proposal>`
  - `getProposals(episodeId, sort?): Promise<Proposal[]>`
  - `getProposalById(id): Promise<Proposal>`
- **Validation**: ✓ Validated - Proposal operations only

#### <BackingService>
- **Primary Responsibility**: Handles backing operations for both proposal backing and direct backing.
- **Type**: Service
- **User Stories**: US-010, US-011
- **Dependencies**: API Client, EscrowService
- **Interfaces**:
  - `createBacking(proposalId, amount): Promise<Backing>`
  - `createDirectBacking(episodeId, amount): Promise<Backing>`
- **Validation**: ✓ Validated - Backing operations only

#### <EscrowService>
- **Primary Responsibility**: Manages escrow state for proposal funds including hold, release, and refund operations.
- **Type**: Service (Internal)
- **User Stories**: US-009, US-010, US-017, US-018
- **Dependencies**: API Client
- **Interfaces**:
  - `holdFunds(proposalId, amount): Promise<Escrow>`
  - `releaseFunds(proposalId): Promise<void>`
  - `refundFunds(proposalId): Promise<void>`
- **Validation**: ✓ Validated - Escrow management only

#### <ProposalList>
- **Primary Responsibility**: Renders list of proposals with sorting and backing actions.
- **Type**: Component
- **User Stories**: US-013
- **Dependencies**: ProposalService (via hook)
- **Validation**: ✓ Validated - Proposal list rendering only

#### <ProposalCard>
- **Primary Responsibility**: Renders individual proposal with proposer profile, content, Backers summary, and back button.
- **Type**: Component
- **User Stories**: US-013
- **Dependencies**: UserProfile (presentational)
- **Enhanced Features** (change-2026-01-12-1444):
  - Proposer profile display (avatar, nickname, "제안자" label)
  - Backers summary (backer count, total Ink) - clickable to open BackersDetailModal
  - Interaction: Backers summary area onClick → trigger modal
- **Validation**: ✓ Validated - Card rendering only

#### <ProposalModal>
- **Primary Responsibility**: Renders proposal creation modal with form validation and submission.
- **Type**: Component
- **User Stories**: US-009
- **Dependencies**: ProposalService, React Hook Form
- **Validation**: ✓ Validated - Modal form only

#### <BackingModal>
- **Primary Responsibility**: Renders proposal backing modal with amount input and confirmation.
- **Type**: Component
- **User Stories**: US-010
- **Dependencies**: BackingService
- **Validation**: ✓ Validated - Modal form only

#### <DirectBackingModal>
- **Primary Responsibility**: Renders direct backing modal with amount input and confirmation.
- **Type**: Component
- **User Stories**: US-011
- **Dependencies**: BackingService
- **Validation**: ✓ Validated - Modal form only

#### <BackersDetailModal>
- **Primary Responsibility**: Displays detailed list of all backers for a specific proposal in modal format.
- **Type**: Component (Modal)
- **User Stories**: US-010
- **Dependencies**: BackersList, BackingService (via hook)
- **Added** (change-2026-01-12-1444): New modal component
- **Trigger**: ProposalCard Backers summary area click
- **Content**: Full list of backers with profile, nickname, Ink amount, backing timestamp
- **Validation**: ✓ Validated - Modal rendering only

#### <BackersList>
- **Primary Responsibility**: Renders paginated list of backers with profile information and contribution amounts.
- **Type**: Component
- **User Stories**: US-010
- **Dependencies**: UserProfile (presentational)
- **Added** (change-2026-01-12-1444): New list component for displaying backer details
- **Features**: Avatar, nickname, Ink amount, backing timestamp
- **Validation**: ✓ Validated - List rendering only

#### <SupportsList>
- **Primary Responsibility**: Renders paginated list of direct supporters with profile and support details.
- **Type**: Component
- **User Stories**: US-011
- **Dependencies**: UserProfile (presentational)
- **Added** (change-2026-01-12-1444): New list component for Supports tab
- **Features**: Supporter profile, Ink amount, support message, timestamp, pagination (page numbers)
- **Validation**: ✓ Validated - List rendering only

#### <UserProfile>
- **Primary Responsibility**: Reusable user profile display component (avatar + nickname) used across proposers, backers, supporters.
- **Type**: Component (Common/Shared)
- **User Stories**: US-010, US-011, US-013
- **Dependencies**: None (presentational)
- **Added** (change-2026-01-12-1444): New shared component for consistent profile display
- **Usage**: ProposalCard, BackersList, SupportsList, TopProducersCard, ProducersList
- **Props**: `user: {avatar, nickname}`, `label?: string`, `size?: 'small' | 'medium' | 'large'`, `interactive?: boolean`
- **Validation**: ✓ Validated - Profile display only

#### <TopProducersCard>
- **Primary Responsibility**: Renders Main Producer Top 3 contributors in horizontal card format with emphasis.
- **Type**: Component
- **User Stories**: US-012
- **Dependencies**: UserProfile (presentational)
- **Added** (change-2026-01-12-1444): New component for credit display
- **Features**: Large profile image, nickname, PROPOSER label (1 person only), contribution Ink, rank badge (#1/#2/#3)
- **Layout**: 3 horizontal cards, sorted by total contribution Ink (proposal + backing) descending
- **Interactive**: Non-interactive (no click), display only
- **Validation**: ✓ Validated - Card rendering only

#### <ProducersList>
- **Primary Responsibility**: Renders Main Producer contributors beyond Top 3 in vertical list format.
- **Type**: Component
- **User Stories**: US-012
- **Dependencies**: UserProfile (presentational)
- **Added** (change-2026-01-12-1444): New component for credit display
- **Features**: Small avatar, nickname, contribution Ink (right-aligned), optional progress bar
- **Layout**: Vertical list, sorted by contribution Ink descending, starting from 4th rank
- **Interactive**: Non-interactive (no click), display only
- **Validation**: ✓ Validated - List rendering only

#### <SponsoredByList>
- **Primary Responsibility**: Renders Sponsored by contributors in compact list or pill format with lower visual priority.
- **Type**: Component
- **User Stories**: US-012
- **Dependencies**: None (simple display)
- **Added** (change-2026-01-12-1444): New component for secondary sponsor display
- **Features**: Name/logo, Ink amount (secondary), compact format
- **Layout**: Compact list or pill style, visually de-emphasized
- **Interactive**: Non-interactive (no click), display only
- **Validation**: ✓ Validated - List rendering only

---

### 6. Creator Studio Domain

#### <EpisodeManagementService>
- **Primary Responsibility**: Handles episode CRUD operations for creators including status management.
- **Type**: Service
- **User Stories**: US-014, US-015, US-019
- **Dependencies**: API Client
- **Interfaces**:
  - `getCreatorEpisodes(): Promise<Episode[]>`
  - `createEpisode(storyId, data): Promise<Episode>`
  - `updateEpisode(id, data): Promise<Episode>`
  - `deleteEpisode(id): Promise<void>`
  - `publishEpisode(id): Promise<Episode>`
- **Validation**: ✓ Validated - Episode management only

#### <ContentUploadService>
- **Primary Responsibility**: Handles multi-image upload, ordering, and content management for episodes.
- **Type**: Service
- **User Stories**: US-014, US-019
- **Dependencies**: API Client, Storage API
- **Interfaces**:
  - `uploadImages(files): Promise<UploadResult[]>`
  - `reorderContent(episodeId, order): Promise<void>`
  - `deleteContent(contentId): Promise<void>`
- **Validation**: ✓ Validated - Content upload only

#### <ProposalDecisionService>
- **Primary Responsibility**: Handles creator's Deal/Drop decisions with escrow settlement.
- **Type**: Service
- **User Stories**: US-016, US-017, US-018
- **Dependencies**: API Client, EscrowService
- **Interfaces**:
  - `getCreatorProposals(): Promise<Proposal[]>`
  - `dealProposal(proposalId): Promise<DealResult>`
  - `dropProposal(proposalId): Promise<DropResult>`
- **Validation**: ✓ Validated - Decision processing only

#### <CreditGenerationService>
- **Primary Responsibility**: Generates immutable credit data when episode is published.
- **Type**: Service (Internal)
- **User Stories**: US-019
- **Dependencies**: API Client
- **Interfaces**:
  - `generateCredits(episodeId): Promise<Credit>`
- **Validation**: ✓ Validated - Credit generation only

#### <CreatorStoryList> (change-2026-01-13-1430)
- **Primary Responsibility**: Renders creator's story list as primary entry point for Episode Management.
- **Type**: Component
- **User Stories**: US-015
- **Dependencies**: useCreatorStories hook
- **Features**:
  - Story 목록 표시 (대량 데이터 10~100+ 고려)
  - Search/Filter/Pagination 지원
  - 리스트 스크롤과 페이지 스크롤 분리
- **Validation**: ✓ Validated - Story list rendering only

#### <CreatorStoryCard> (change-2026-01-13-1430)
- **Primary Responsibility**: Renders individual story card with Navigate/Edit/Preview actions for creators.
- **Type**: Component
- **User Stories**: US-015
- **Dependencies**: None (presentational)
- **Actions**:
  - Navigate: Story 클릭 → Episode List 표시
  - Edit: Story 메타데이터 편집
  - Preview: 독자 관점 미리보기
- **Validation**: ✓ Validated - Story card UI only

#### <EpisodeSelector> (change-2026-01-13-1430)
- **Primary Responsibility**: Renders episode selector for Proposal Management (OPEN episodes only, searchable).
- **Type**: Component
- **User Stories**: US-016
- **Dependencies**: useStoryEpisodes hook
- **Features**:
  - 동일 Story 내 OPEN 상태 Episode만 표시
  - Desktop: Vertical list / Mobile: Dropdown
  - Episode 개수 많을 경우 검색 지원
- **Validation**: ✓ Validated - Episode selection UI only

#### <useCreatorStories> (change-2026-01-13-1430)
- **Primary Responsibility**: Fetches and manages creator's own story list for Episode Management.
- **Type**: Hook
- **User Stories**: US-015
- **Dependencies**: StoryService, TanStack Query
- **Interfaces**:
  - `useCreatorStories(options?): { stories, isLoading, error, refetch }`
- **Validation**: ✓ Validated - Creator story data fetching only

#### <useStoryEpisodes> (change-2026-01-13-1430)
- **Primary Responsibility**: Fetches episodes by story ID for Story-context rendering.
- **Type**: Hook
- **User Stories**: US-015, US-016
- **Dependencies**: EpisodeService, TanStack Query
- **Interfaces**:
  - `useStoryEpisodes(storyId, options?): { episodes, isLoading, error, refetch }`
  - `options.status`: Filter by episode status (e.g., 'OPEN' for Proposal Management)
- **Validation**: ✓ Validated - Story-scoped episode data fetching only

#### <EpisodeList> (Creator)
- **Primary Responsibility**: Renders creator's episode list with status and bounty information.
- **Type**: Component
- **User Stories**: US-015
- **Dependencies**: EpisodeManagementService (via hook)
- **Validation**: ✓ Validated - List rendering only

#### <EpisodeEditor>
- **Primary Responsibility**: Renders episode editing interface with content upload and ordering.
- **Type**: Component
- **User Stories**: US-014, US-019
- **Dependencies**: ContentUploadService, EpisodeManagementService
- **Validation**: ✓ Validated - Editor UI only

#### <ContentUploader>
- **Primary Responsibility**: Renders drag-and-drop image upload interface with preview and reordering.
- **Type**: Component
- **User Stories**: US-014
- **Dependencies**: ContentUploadService
- **Validation**: ✓ Validated - Upload UI only

#### <ProposalManagementList>
- **Primary Responsibility**: Renders creator's received proposals with Deal/Drop actions.
- **Type**: Component
- **User Stories**: US-016
- **Dependencies**: ProposalDecisionService (via hook)
- **Validation**: ✓ Validated - Management list only

#### <DealConfirmModal>
- **Primary Responsibility**: Renders Deal confirmation modal with impact preview.
- **Type**: Component
- **User Stories**: US-017
- **Dependencies**: ProposalDecisionService
- **Validation**: ✓ Validated - Confirmation modal only

#### <DropConfirmModal>
- **Primary Responsibility**: Renders Drop confirmation modal with refund preview.
- **Type**: Component
- **User Stories**: US-018
- **Dependencies**: ProposalDecisionService
- **Validation**: ✓ Validated - Confirmation modal only

---

### 7. Settlement Domain

#### <SettlementService>
- **Primary Responsibility**: Retrieves creator settlement status including payable and withdrawable balances.
- **Type**: Service
- **User Stories**: US-020
- **Dependencies**: API Client
- **Interfaces**:
  - `getSettlementSummary(): Promise<SettlementSummary>`
  - `getSettlementHistory(): Promise<SettlementRecord[]>`
- **Validation**: ✓ Validated - Settlement retrieval only

#### <WithdrawalService>
- **Primary Responsibility**: Handles withdrawal request creation and status tracking.
- **Type**: Service
- **User Stories**: US-021
- **Dependencies**: API Client
- **Interfaces**:
  - `createWithdrawalRequest(amount, bankInfo): Promise<WithdrawalRequest>`
  - `getWithdrawalRequests(): Promise<WithdrawalRequest[]>`
- **Validation**: ✓ Validated - Withdrawal operations only

#### <SettlementSummary>
- **Primary Responsibility**: Renders settlement balance summary cards.
- **Type**: Component
- **User Stories**: US-020
- **Dependencies**: SettlementService (via hook)
- **Validation**: ✓ Validated - Summary display only

#### <SettlementList>
- **Primary Responsibility**: Renders episode-by-episode settlement history.
- **Type**: Component
- **User Stories**: US-020
- **Dependencies**: SettlementService (via hook)
- **Validation**: ✓ Validated - List rendering only

#### <WithdrawalModal>
- **Primary Responsibility**: Renders withdrawal request form with amount and bank info.
- **Type**: Component
- **User Stories**: US-021
- **Dependencies**: WithdrawalService
- **Validation**: ✓ Validated - Modal form only

---

### 8. Admin Domain

#### <UserAdminService>
- **Primary Responsibility**: Retrieves and manages user data for admin operations.
- **Type**: Service
- **User Stories**: US-022
- **Dependencies**: API Client
- **Interfaces**:
  - `getUsers(filter, page): Promise<PaginatedList<User>>`
  - `getUserById(id): Promise<User>`
  - `searchUsers(query): Promise<User[]>`
- **Validation**: ✓ Validated - User admin retrieval only

#### <SanctionService>
- **Primary Responsibility**: Handles user sanction operations including suspension and ban.
- **Type**: Service
- **User Stories**: US-023
- **Dependencies**: API Client
- **Interfaces**:
  - `createSanction(userId, data): Promise<Sanction>`
  - `getSanctions(userId): Promise<Sanction[]>`
  - `revokeSanction(sanctionId): Promise<void>`
- **Validation**: ✓ Validated - Sanction operations only

#### <ContentModerationService>
- **Primary Responsibility**: Handles content hiding and deletion for moderation.
- **Type**: Service
- **User Stories**: US-024
- **Dependencies**: API Client
- **Interfaces**:
  - `getContents(filter, page): Promise<PaginatedList<Content>>`
  - `hideContent(contentId): Promise<void>`
  - `deleteContent(contentId): Promise<void>`
  - `restoreContent(contentId): Promise<void>`
- **Validation**: ✓ Validated - Moderation operations only

#### <PaymentAdminService>
- **Primary Responsibility**: Retrieves payment history for admin reporting.
- **Type**: Service
- **User Stories**: US-027
- **Dependencies**: API Client
- **Interfaces**:
  - `getPayments(filter, page): Promise<PaginatedList<Payment>>`
  - `getPaymentById(id): Promise<Payment>`
- **Validation**: ✓ Validated - Payment admin retrieval only

#### <SettlementApprovalService>
- **Primary Responsibility**: Handles withdrawal request approval and rejection by admin.
- **Type**: Service
- **User Stories**: US-025, US-026
- **Dependencies**: API Client
- **Interfaces**:
  - `getWithdrawalRequests(filter, page): Promise<PaginatedList<WithdrawalRequest>>`
  - `approveWithdrawal(requestId): Promise<WithdrawalRequest>`
  - `rejectWithdrawal(requestId, reason): Promise<WithdrawalRequest>`
  - `markAsCompleted(requestId): Promise<WithdrawalRequest>`
- **Validation**: ✓ Validated - Approval operations only

#### <DashboardStatsService>
- **Primary Responsibility**: Retrieves aggregated statistics for admin dashboard.
- **Type**: Service
- **User Stories**: US-028
- **Dependencies**: API Client
- **Interfaces**:
  - `getOverviewStats(): Promise<DashboardStats>`
  - `getSignupTrend(days): Promise<TrendData[]>`
- **Validation**: ✓ Validated - Stats retrieval only

#### <UserTable>
- **Primary Responsibility**: Renders paginated user list table with search and filter.
- **Type**: Component
- **User Stories**: US-022
- **Dependencies**: UserAdminService (via hook)
- **Validation**: ✓ Validated - Table rendering only

#### <SanctionModal>
- **Primary Responsibility**: Renders sanction creation modal with reason input.
- **Type**: Component
- **User Stories**: US-023
- **Dependencies**: SanctionService
- **Validation**: ✓ Validated - Modal form only

#### <ContentTable>
- **Primary Responsibility**: Renders content list table with moderation actions.
- **Type**: Component
- **User Stories**: US-024
- **Dependencies**: ContentModerationService (via hook)
- **Validation**: ✓ Validated - Table rendering only

#### <DeleteConfirmModal>
- **Primary Responsibility**: Renders delete confirmation modal for destructive actions.
- **Type**: Component
- **User Stories**: US-024
- **Dependencies**: ContentModerationService
- **Validation**: ✓ Validated - Confirmation modal only

#### <PaymentTable>
- **Primary Responsibility**: Renders payment history table with filters.
- **Type**: Component
- **User Stories**: US-027
- **Dependencies**: PaymentAdminService (via hook)
- **Validation**: ✓ Validated - Table rendering only

#### <SettlementTable>
- **Primary Responsibility**: Renders withdrawal request table with approval actions.
- **Type**: Component
- **User Stories**: US-025
- **Dependencies**: SettlementApprovalService (via hook)
- **Validation**: ✓ Validated - Table rendering only

#### <SettlementDetailModal>
- **Primary Responsibility**: Renders withdrawal request detail with approve/reject actions.
- **Type**: Component
- **User Stories**: US-025, US-026
- **Dependencies**: SettlementApprovalService
- **Validation**: ✓ Validated - Detail modal only

#### <DashboardStats>
- **Primary Responsibility**: Renders dashboard statistics cards and charts.
- **Type**: Component
- **User Stories**: US-028
- **Dependencies**: DashboardStatsService (via hook)
- **Validation**: ✓ Validated - Stats display only

---

### 9. Report Domain (change-2026-01-12-1530)

#### <ReportService>
- **Primary Responsibility**: Handles report creation and user's own report history retrieval.
- **Type**: Service
- **User Stories**: US-029, US-030
- **Dependencies**: API Client
- **Interfaces**:
  - `createReport(data: CreateReportRequest): Promise<Report>`
  - `getMyReports(): Promise<PaginatedList<Report>>`
- **Validation**: ✓ Validated - Report submission and retrieval only

#### <ReportAdminService>
- **Primary Responsibility**: Handles admin operations for report management including listing, filtering, and processing.
- **Type**: Service
- **User Stories**: US-031, US-032
- **Dependencies**: API Client, SanctionService
- **Interfaces**:
  - `getReports(filter, page): Promise<PaginatedList<Report>>`
  - `getReportById(id): Promise<Report>`
  - `processReport(id, decision): Promise<Report>`
  - `createSanctionFromReport(reportId, sanctionData): Promise<Sanction>`
- **Validation**: ✓ Validated - Admin report operations only

#### <ReportModal>
- **Primary Responsibility**: Renders report creation modal with target type selection, reason selection (6 types), and detail input.
- **Type**: Component
- **User Stories**: US-029
- **Dependencies**: ReportService, React Hook Form
- **Props**:
  - `targetType: 'STORY' | 'PROPOSAL_AUTHOR'`
  - `targetId: string`
  - `targetUserId?: string` (for PROPOSAL_AUTHOR)
  - `onClose: () => void`
  - `onSuccess?: () => void`
- **Report Types**: 스팸, 욕설/비방, 부적절한 콘텐츠, 저작권 침해, 허위 정보, 기타 (6가지)
- **Trigger Locations**: StoryDetail, ProposalCard, EpisodeViewer, UserProfile
- **Permission**:
  - 독자: 스토리/Proposal 작성자 신고 가능
  - 작가: 본인 스토리에 달린 Proposal 작성자만 신고 가능
- **Validation**: ✓ Validated - Report modal form only

#### <MyReportList>
- **Primary Responsibility**: Renders user's own report history with status badges and detail modal trigger.
- **Type**: Component
- **User Stories**: US-030
- **Dependencies**: ReportService (via useMyReports hook)
- **Features**:
  - Report list with: target, type, date, status badge (접수됨/검토 중/처리 완료/기각)
  - Click → ReportDetailModal (user version)
  - Empty state handling
- **Validation**: ✓ Validated - User report list only

#### <ReportTable>
- **Primary Responsibility**: Renders admin report list table with filtering and sorting.
- **Type**: Component
- **User Stories**: US-031
- **Dependencies**: ReportAdminService (via useAdminReports hook)
- **Features**:
  - Columns: 신고 대상, 유형, 신고자, 피신고자, 상태, 작업
  - Filters: 상태별 (전체/접수됨/검토 중/처리 완료/기각), 유형별 (6가지)
  - Sort: 최신순/오래된순
  - Row click → ReportDetailModal
- **Validation**: ✓ Validated - Admin report table only

#### <ReportDetailModal>
- **Primary Responsibility**: Renders report detail with processing actions (admin) or status view (user).
- **Type**: Component
- **User Stories**: US-030, US-031, US-032
- **Dependencies**: ReportAdminService, SanctionService
- **Props**:
  - `reportId: string`
  - `mode: 'admin' | 'user'`
  - `onClose: () => void`
- **Admin Features**:
  - Report content display
  - Process actions: 기각, 경고, 정지 (Sanction 연동)
  - Admin note input
- **User Features**:
  - Report content display
  - Status display
  - Admin feedback (처리 완료 시)
- **Validation**: ✓ Validated - Report detail modal only

#### <useReportSubmit>
- **Primary Responsibility**: Custom hook for report submission with loading, error, and success states.
- **Type**: Hook
- **User Stories**: US-029
- **Dependencies**: ReportService
- **Returns**: `{ submit, isLoading, error, isSuccess }`
- **Validation**: ✓ Validated - Report submission hook only

#### <useMyReports>
- **Primary Responsibility**: Custom hook for fetching and managing user's own report history.
- **Type**: Hook
- **User Stories**: US-030
- **Dependencies**: ReportService
- **Returns**: `{ reports, isLoading, error, refetch }`
- **Validation**: ✓ Validated - User reports hook only

#### <useAdminReports>
- **Primary Responsibility**: Custom hook for admin report management with filtering, pagination, and processing.
- **Type**: Hook
- **User Stories**: US-031, US-032
- **Dependencies**: ReportAdminService
- **Returns**: `{ reports, filters, setFilters, processReport, isLoading, error }`
- **Validation**: ✓ Validated - Admin reports hook only

---

## Phase 2: Requirement Mapping

### User Story to Component Mapping

| User Story | Primary Component(s) | Supporting Component(s) |
|------------|---------------------|------------------------|
| US-001 | AuthenticationService, UserProfileService | SignupForm, ProfileSetupForm, SocialLoginButtons |
| US-002 | AuthenticationService | LoginForm, SocialLoginButtons |
| US-003 | WalletService | BalanceCard |
| US-004 | TransactionService | TransactionList |
| US-005 | PaymentService | InkShop |
| US-006 | StoryDiscoveryService | StoryBanner, StoryList, StoryCard, StoryDetail |
| US-007 | SearchService, StoryDiscoveryService | StoryList |
| US-008 | EpisodeViewerService | EpisodeViewer, ContentRenderer, ActionBar |
| US-009 | ProposalService, EscrowService | ProposalModal |
| US-010 | BackingService, EscrowService | BackingModal |
| US-011 | BackingService | DirectBackingModal |
| US-012 | CreditDisplayService | CreditSection |
| US-013 | ProposalService | ProposalList, ProposalCard |
| US-014 | EpisodeManagementService, ContentUploadService | EpisodeEditor, ContentUploader |
| US-015 | EpisodeManagementService | EpisodeList (Creator) |
| US-016 | ProposalDecisionService | ProposalManagementList |
| US-017 | ProposalDecisionService, EscrowService | DealConfirmModal |
| US-018 | ProposalDecisionService, EscrowService | DropConfirmModal |
| US-019 | EpisodeManagementService, CreditGenerationService | EpisodeEditor |
| US-020 | SettlementService | SettlementSummary, SettlementList |
| US-021 | WithdrawalService | WithdrawalModal |
| US-022 | UserAdminService | UserTable |
| US-023 | SanctionService | SanctionModal |
| US-024 | ContentModerationService | ContentTable, DeleteConfirmModal |
| US-025 | SettlementApprovalService | SettlementTable, SettlementDetailModal |
| US-026 | SettlementApprovalService | SettlementDetailModal |
| US-027 | PaymentAdminService | PaymentTable |
| US-028 | DashboardStatsService | DashboardStats |
| US-029 | ReportService | ReportModal, useReportSubmit |
| US-030 | ReportService | MyReportList, ReportDetailModal, useMyReports |
| US-031 | ReportAdminService | ReportTable, ReportDetailModal, useAdminReports |
| US-032 | ReportAdminService, SanctionService | ReportDetailModal |

---

### Component Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SERVICE DEPENDENCIES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AuthenticationService ──────────────────────────┐                          │
│         │                                        │                          │
│         ▼                                        │                          │
│  UserProfileService                              │                          │
│                                                  │                          │
│  WalletService ◄──────────────────────────────── │                          │
│         │                                        │                          │
│         ├──► TransactionService                  │                          │
│         │                                        │                          │
│         └──► PaymentService                      │                          │
│                                                  │                          │
│  ProposalService ────┬──► EscrowService ◄──── BackingService               │
│                      │                                                      │
│                      └──► ProposalDecisionService                          │
│                                     │                                       │
│                                     └──► EscrowService                      │
│                                     └──► CreditGenerationService            │
│                                                                             │
│  EpisodeManagementService ──► ContentUploadService                          │
│                                                                             │
│  SettlementService ◄──────────────── WithdrawalService                     │
│                                                                             │
│  SettlementApprovalService (Admin) ──► WithdrawalService (internal)         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 3: Data Flow Diagrams

### Flow 1: User Authentication

```
┌──────────────┐    ┌─────────────┐    ┌───────────────────────┐    ┌─────────┐
│  LoginForm   │───►│ useAuth     │───►│ AuthenticationService │───►│   API   │
│  SignupForm  │    │ hook        │    │                       │    │         │
└──────────────┘    └─────────────┘    └───────────────────────┘    └─────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  AuthStore  │
                    └─────────────┘
```

### Flow 2: Proposal Creation & Backing

```
┌───────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   ProposalModal   │───►│ useProposal hook │───►│ ProposalService │
└───────────────────┘    └──────────────────┘    └────────┬────────┘
                                                          │
                                                          ▼
┌───────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   BackingModal    │───►│ useBacking hook  │───►│ BackingService  │
└───────────────────┘    └──────────────────┘    └────────┬────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  EscrowService  │
                                                 └─────────────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  WalletService  │ (balance update)
                                                 └─────────────────┘
```

### Flow 3: Deal/Drop Decision

```
┌───────────────────────┐    ┌────────────────────┐    ┌─────────────────────────┐
│ ProposalManagementList│───►│ useProposalDecision│───►│ ProposalDecisionService │
└───────────────────────┘    │ hook               │    └───────────┬─────────────┘
         │                   └────────────────────┘                │
         ▼                                                         │
┌───────────────────────┐                                          │
│ DealConfirmModal      │◄─────────────────────────────────────────┤
│ DropConfirmModal      │                                          │
└───────────────────────┘                                          │
                                                                   ▼
                                              ┌─────────────────────────────────┐
                                              │        EscrowService            │
                                              │ (release for Deal / refund Drop)│
                                              └─────────────────────────────────┘
                                                                   │
                                       ┌───────────────────────────┼───────────────────────────┐
                                       ▼                           ▼                           ▼
                              ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
                              │  WalletService  │         │ CreditGeneration│         │ TransactionLog  │
                              │ (creator balance)│         │ (if publish)    │         │                 │
                              └─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Flow 4: Episode Publishing

```
┌───────────────────┐    ┌─────────────────────┐    ┌──────────────────────────┐
│   EpisodeEditor   │───►│ useEpisodeManagement│───►│ EpisodeManagementService │
└───────────────────┘    │ hook                │    └────────────┬─────────────┘
         │               └─────────────────────┘                 │
         ▼                                                       │ (publish)
┌───────────────────┐                                            │
│  ContentUploader  │───►ContentUploadService                    │
└───────────────────┘                                            ▼
                                                   ┌──────────────────────────────┐
                                                   │   CreditGenerationService    │
                                                   │ (auto-generate credits)      │
                                                   └──────────────────────────────┘
                                                                 │
                                                                 ▼
                                                   ┌──────────────────────────────┐
                                                   │      SettlementService       │
                                                   │ (payable → withdrawable)     │
                                                   └──────────────────────────────┘
```

---

## Phase 2 Continued: Additional Components

### 11. Layout & Navigation Domain

#### <TopNav>
- **Primary Responsibility**: Renders the global top navigation bar with 3-zone layout (Left: hamburger+logo / Center: search / Right: account button).
- **Type**: Component
- **User Stories**: Navigation structure (change-2026-01-09-1137)
- **Dependencies**: SearchBar, useAuth, uiStore, next/link
- **Props**:
  - None (global component)
- **State**:
  - `sidebarOpen: boolean` (from uiStore) - 사이드바 토글 상태
  - `isAuthenticated: boolean` (from useAuth) - 로그인 상태
- **Interfaces**:
  - Hamburger button → toggles sidebar via uiStore
  - Logo (small.png) → routes to `/home`
  - SearchBar integration (center, Desktop/Tablet only)
  - Account button → `/login` (비로그인) or `/mypage` (로그인)
  - Responsive: Desktop/Tablet shows search input, Mobile shows search icon
  - Sticky positioning across all screen sizes
- **Validation**: ✓ Validated - Single responsibility (global navigation bar with 3-zone layout)

#### <SearchBar>
- **Primary Responsibility**: Renders search input with real-time search popup and responsive icon mode for mobile.
- **Type**: Component
- **User Stories**: Navigation structure (change-2026-01-09-1137)
- **Dependencies**: useRouter, useSearch, SearchPopup
- **Props**:
  - `placeholder?: string` - Placeholder text (default: "검색어를 입력하세요")
  - `className?: string` - Additional styling
  - `mode?: 'input' | 'icon'` - Display mode (Desktop: input, Mobile: icon)
- **State**:
  - `query: string` - Current search input
  - `showPopup: boolean` - Real-time search popup visibility
  - `showMobileInput: boolean` - Mobile slide-down input visibility
- **Interfaces**:
  - 1자 이상 입력 → SearchPopup 표시 (debounce 적용)
  - Enter key → `/search?q={query}` 라우팅, popup 닫힘
  - Mobile icon 클릭 → 슬라이드다운 검색 input 표시
  - 외부 클릭 → popup 닫힘
- **Validation**: ✓ Validated - Single responsibility (search input with preview popup)

#### <SearchPopup>
- **Primary Responsibility**: Renders real-time search results popup below search input with preview items.
- **Type**: Component
- **User Stories**: Navigation structure (change-2026-01-09-1137)
- **Dependencies**: useSearch, StoryCard (mini variant)
- **Props**:
  - `query: string` - Current search query
  - `onSelect?: (story: Story) => void` - Item selection handler
  - `onClose?: () => void` - Close handler
- **State**:
  - None (controlled component, data from useSearch)
- **Interfaces**:
  - 최대 5~10개 결과 표시
  - 각 아이템: 썸네일, 작품명, 작가명, 조회수
  - 결과 없음: "검색 결과가 없습니다" 문구
  - 아이템 클릭 → 해당 작품 상세 페이지로 이동
- **Validation**: ✓ Validated - Single responsibility (real-time search results preview)

#### <BottomNav>
- **Primary Responsibility**: Renders bottom navigation for mobile devices with responsive visibility (hidden on desktop).
- **Type**: Component
- **User Stories**: Navigation structure
- **Dependencies**: next/link, next/navigation
- **Props**:
  - None
- **State**:
  - `pathname: string` - Current route for active state
- **Interfaces**:
  - Three nav items: Home, Explore, MyPage
  - Active state indication
  - Mobile-only display (`lg:hidden`)
- **Validation**: ✓ Validated - Single responsibility (mobile bottom navigation)

#### <SideNav>
- **Primary Responsibility**: Renders side navigation for desktop devices with role-specific menu items.
- **Type**: Component
- **User Stories**: Navigation structure
- **Dependencies**: next/link, next/navigation
- **Props**:
  - `title: string` - Navigation title
  - `items: NavItem[]` - Navigation menu items
  - `backHref?: string` - Back link destination
  - `backLabel?: string` - Back link label
- **State**:
  - `pathname: string` - Current route for active state
- **Interfaces**:
  - Flexible nav items configuration
  - Desktop-only display (`hidden lg:flex`)
  - Supports Reader, Creator, and Admin modes
- **Validation**: ✓ Validated - Single responsibility (desktop side navigation)

---

## Validation Summary

### Component Count by Domain

| Domain | Services | Components | Hooks | Total |
|--------|----------|------------|-------|-------|
| Authentication | 2 | 4 | - | 6 |
| Wallet | 3 | 3 | - | 6 |
| Story Discovery | 2 | 5 | - | 7 |
| Episode Viewer | 2 | 5 | - | 7 |
| Intervention | 3 | 6 | - | 9 |
| Creator Studio | 4 | 7 | - | 11 |
| Settlement | 2 | 3 | - | 5 |
| Admin | 6 | 8 | - | 14 |
| Report (change-2026-01-12-1530) | 2 | 4 | 3 | 9 |
| Layout & Navigation | 0 | 5 | - | 5 |
| **Total** | **26** | **50** | **3** | **79** |

### Validation Checklist

- [x] All 3 phases executed in order
- [x] Every component marked "✓ Validated"
- [x] Every Primary Responsibility follows one-sentence active-verb rule
- [x] All US-XXX identifiers mapped to components (32/32)
- [x] Data flows complete and accurate
- [x] No component has >5 responsibilities
- [x] All component names are specific nouns

### User Story Coverage

- **Total User Stories**: 32
- **Mapped to Components**: 32
- **Coverage**: 100%

---

## 문서 정보

- **생성일:** 2026-01-06
- **기반 문서:** user_stories_data.json, conceptual_model.json, ia_structure.md
