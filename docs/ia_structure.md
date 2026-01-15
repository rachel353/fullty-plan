# Information Architecture - 쟈근친구들 V2 (Conture)

> Generated from: user_stories_data.json, conceptual_model.json
> Date: 2026-01-06

## Screen Hierarchy Overview

```
Root
├── Public (비인증)
│   ├── 스플래시 (/)
│   ├── 로그인 (/login)
│   ├── 회원가입 (/signup)
│   └── 약관 동의 (/terms)
│
├── Common (인증 공통)
│   ├── 프로필 설정 (/profile/setup)
│   ├── 마이페이지
│   │   ├── 내 정보 (/mypage)
│   │   ├── 내 지갑 (/mypage/wallet)
│   │   │   └── 진행 중인 제안 내역 (/mypage/wallet/pending)
│   │   └── 신고 내역 (/mypage/reports)
│   ├── 설정 (/settings)
│   └── Ink 충전 (/shop) ← 마이페이지에서 진입
│
├── Reader (독자)
│   ├── 홈 (/home)
│   ├── 탐색 (/explore)
│   ├── 검색 결과 (/search)
│   ├── 작품 상세 (/stories/:storyId)
│   ├── 작가 상세 (/creators/:creatorId)
│   └── 에피소드 뷰어 (/stories/:storyId/episodes/:episodeId)
│
├── Creator (작가)
│   ├── 크리에이터 스튜디오 (/studio)
│   │   ├── 에피소드 관리 (/studio/episodes)
│   │   ├── 에피소드 편집 (/studio/episodes/:episodeId/edit)
│   │   └── 제안 관리 (/studio/proposals)
│   └── 정산 관리 (/studio/settlements)
│
└── Admin (관리자)
    ├── 대시보드 (/admin)
    ├── 회원 관리 (/admin/users)
    ├── 콘텐츠 관리 (/admin/contents)
    ├── 결제 관리 (/admin/payments)
    ├── 정산 관리 (/admin/settlements)
    └── 신고 관리 (/admin/reports)
```

---

## Detailed Screen Definitions

### Public Pages (비인증 영역)

#### Page: Splash
- **Route**: `/`
- **Purpose**: 앱 진입점, 인증 상태에 따라 리다이렉트
- **User Stories**: -
- **Access**: 모든 사용자
- **Redirects**:
  - 로그인 상태 → `/home`
  - 비로그인 상태 → `/login`

#### Page: Login (로그인)
- **Route**: `/login`
- **Purpose**: 이메일/소셜 로그인
- **User Stories**: US-002
- **Access**: 비로그인 사용자
- **Components**:
  - 이메일 로그인 폼
  - 비밀번호 찾기 링크 (→ /password-reset) (change-2026-01-14-1500)
  - 카카오 소셜 로그인 버튼
  - 구글 소셜 로그인 버튼
  - 회원가입 링크

#### Page: Signup (회원가입)
- **Route**: `/signup`
- **Purpose**: 이메일/소셜 회원가입
- **User Stories**: US-001
- **Access**: 비로그인 사용자
- **Components**: (change-2026-01-14-1500 업데이트)
  - 이메일 입력 필드
  - 비밀번호 입력 필드 + 실시간 규칙 체크 UI
  - 비밀번호 확인 필드
  - 휴대폰 번호 입력 + 인증번호 전송 버튼
  - 인증번호 입력 필드 + 타이머 (5분)
  - 소셜 회원가입 버튼

#### Page: SignupComplete (회원가입 완료) (change-2026-01-14-1500)
- **Route**: `/signup/complete`
- **Purpose**: 회원가입 완료 안내
- **User Stories**: US-001
- **Access**: 회원가입 완료 직후 사용자
- **Components**:
  - 완료 메시지
  - 로그인 CTA 버튼

#### Page: PasswordReset (비밀번호 재설정) (change-2026-01-14-1500)
- **Route**: `/password-reset`
- **Purpose**: 비밀번호 재설정 Step 1 - 휴대폰 번호 입력
- **User Stories**: US-002-1
- **Access**: 비로그인 사용자
- **Components**:
  - 휴대폰 번호 입력
  - 인증번호 전송 버튼

#### Page: PasswordResetVerify (인증번호 확인) (change-2026-01-14-1500)
- **Route**: `/password-reset/verify`
- **Purpose**: 비밀번호 재설정 Step 2 - 인증번호 입력
- **User Stories**: US-002-1
- **Access**: Step 1 완료 사용자
- **Components**:
  - 인증번호 입력 필드 + 타이머

#### Page: PasswordResetNew (새 비밀번호 설정) (change-2026-01-14-1500)
- **Route**: `/password-reset/new`
- **Purpose**: 비밀번호 재설정 Step 3 - 새 비밀번호 설정
- **User Stories**: US-002-1
- **Access**: Step 2 완료 사용자
- **Components**:
  - 새 비밀번호 입력 + 규칙 체크 UI
  - 비밀번호 확인 입력
  - 재설정 완료 버튼

#### Page: Terms (약관 동의)
- **Route**: `/terms`
- **Purpose**: 서비스 이용 약관 동의
- **User Stories**: US-001
- **Access**: 회원가입 진행 중 사용자

---

### Common Pages (인증 공통)

#### Page: Profile Setup (프로필 설정)
- **Route**: `/profile/setup`
- **Purpose**: 닉네임 설정 및 본인인증
- **User Stories**: US-001
- **Access**: 로그인 사용자 (프로필 미설정)
- **Components**:
  - 닉네임 입력 및 중복 확인
  - 본인인증 모듈 (NHN)

#### Page: MyPage (마이페이지 - 내 정보)
- **Route**: `/mypage`
- **Purpose**: 사용자 프로필 정보 조회/수정 및 주요 기능 진입점
- **User Stories**: US-001, US-002, US-005
- **Access**: 로그인 사용자
- **Components**:
  - 프로필 정보 카드 (프로필 사진 설정, 닉네임, 소개글)
  - 닉네임 수정
  - 계정 설정
  - Ink 충전 바로가기 (→ `/shop`)

#### Page: Wallet (내 지갑)
- **Route**: `/mypage/wallet`
- **Purpose**: Ink 잔액 및 트랜잭션 내역 조회
- **User Stories**: US-003, US-003-1, US-003-2, US-004
- **Access**: 로그인 사용자
- **Components**:
  - 잔액 표시 카드
    - 사용 가능한 Ink (Available Ink)
    - 진행 중인 제안 Ink (Pending Ink) - 클릭 시 `/mypage/wallet/pending`으로 이동
    - 총 보유 Ink (Total Ink)
  - 트랜잭션 내역 리스트 (무한 스크롤)
  - 정산 내역 탭/필터 (완료된 제안 결과)
  - Ink 충전 버튼 (→ `/shop`)

#### Page: Pending Proposals (진행 중인 제안 내역)
- **Route**: `/mypage/wallet/pending`
- **Purpose**: Proposal/Backing으로 에스크로에 묶인 Ink 상세 내역 조회
- **User Stories**: US-003-1
- **Access**: 로그인 사용자
- **Components**:
  - 총 Pending Ink 금액 표시
  - 제안 내역 리스트
    - 작품명 / 에피소드 제목
    - 제안 유형 배지 (내가 생성한 Proposal / 내가 지지한 Backing)
    - 베팅/지지 금액
    - 제안 상태 배지 (진행 중 / 마감 임박)
    - 제안 마감일
  - 리스트 항목 클릭 → 해당 에피소드 제안 상세로 이동
  - 빈 상태 안내 ('진행 중인 제안이 없습니다')

#### Page: My Reports (신고 내역)
- **Route**: `/mypage/reports`
- **Purpose**: 내가 신고한 내역 및 처리 상태 조회
- **User Stories**: US-030
- **Access**: 로그인 사용자
- **Components**:
  - 신고 리스트 테이블
    - 신고 대상 (닉네임)
    - 신고 유형
    - 신고일
    - 처리 상태 배지 (접수됨, 검토 중, 처리 완료, 기각)
  - 리스트 항목 클릭 → 신고 상세 모달
    - 신고 내용 상세
    - 관리자 피드백 (처리 완료 시)
  - 빈 상태 안내 ('신고 내역이 없습니다')

#### Page: Settings (설정)
- **Route**: `/settings`
- **Purpose**: 프로필 정보 수정 및 약관 동의 관리
- **User Stories**: US-033, US-034
- **Access**: 로그인 사용자
- **Entry Point**:
  - Primary: MyPage → Settings 링크
  - Secondary: TopNav 프로필 드롭다운 → Settings
  - Mobile: 햄버거 메뉴 → MyPage → Settings
- **Components**:
  - **프로필 섹션** (ProfileSection)
    - 현재 프로필 이미지 표시 및 업로드 (ProfileImageUpload)
      - 드래그앤드롭 또는 클릭 업로드
      - 미리보기 제공
      - JPG/PNG/WEBP, 최대 3MB 제한
    - 닉네임 입력 (NicknameInput)
      - 실시간 중복 확인 (500ms debounce)
      - 2~12자, 한글/영문/숫자/`_`/`.`만 허용
      - 중복 시 에러 표시
  - **약관 동의 섹션** (ConsentSettings)
    - 필수 약관: 서비스 이용약관, 개인정보 처리방침, 커뮤니티 규칙 (고정, 변경 불가)
    - 선택 약관: 마케팅 정보 수신 (토글 가능)
    - 각 약관 항목 옆 '전문 보기' 링크
  - 저장 버튼
    - 성공 시 '프로필이 업데이트되었습니다' 메시지
    - authStore 동기화
  - **계정 관리 섹션** (change-2026-01-14-1500)
    - 비밀번호 변경 버튼 (→ /password-reset)
    - 회원 탈퇴 버튼 (→ /mypage/withdraw)

#### Page: Withdraw (회원 탈퇴) (change-2026-01-14-1500)
- **Route**: `/mypage/withdraw`
- **Purpose**: 회원 탈퇴 진행
- **User Stories**: US-002-2
- **Access**: 로그인 사용자
- **Entry Point**: Settings → 회원 탈퇴 버튼
- **Components**:
  - 탈퇴 유의사항 안내 박스
    - 개인정보 삭제 안내
    - 게시글 처리 방식 안내
    - 재가입 불가 안내
    - 포인트/혜택 소멸 안내
    - 복구 불가 강조
  - 본인 확인 영역
    - 현재 비밀번호 입력
    - 확인 문구 입력 ('회원탈퇴')
  - 동의 체크박스
  - 회원 탈퇴 버튼 (조건 미충족 시 비활성)
  - 하단 경고 문구

#### Page: Ink Shop (Ink 충전)
- **Route**: `/shop`
- **Purpose**: Ink 결제 및 충전
- **User Stories**: US-005
- **Access**: 로그인 사용자
- **Entry Point**: 마이페이지 → Ink 충전 바로가기
- **Components**:
  - 충전 옵션 카드 - **세로 1열 리스트 레이아웃** (change-2026-01-12-1444)
    - 좌측: 코인 수량 + 보너스 텍스트
    - 우측: 할인율, 결제 금액 (강조)
    - 모든 카드 높이 동일
    - 밀도 있는 간격
  - 충전 패키지: 1000/5000/10000 Ink
  - 결제하기 버튼 → `/shop/payment`로 이동 (change-2026-01-13-1640)

#### Page: Payment (결제하기) - NEW (change-2026-01-13-1640)
- **Route**: `/shop/payment`
- **Purpose**: 결제 수단 선택 및 결제 진행
- **User Stories**: US-005
- **Access**: 로그인 사용자
- **Entry Point**: Ink Shop에서 금액 선택 후 `결제하기` 클릭
- **Components**:
  - **헤더**: 뒤로가기 버튼, 타이틀 "결제하기"
  - **OrderInfoCard**: 주문 상품/가격 정보
    - Ink 수량 (예: `Ink 5,000`)
    - 보너스 Ink (예: `+ Ink 500 보너스`)
    - 기본 금액, 할인/보너스 표기, 최종 결제 금액
  - **PaymentMethodSelector**: 결제 수단 Radio 선택
    - 카드 결제 (기본값), 계좌이체, 무통장 입금, 간편결제(토스페이)
  - **PaymentTermsAgreement**: 전자금융거래 이용약관 동의 체크박스
  - **PaymentCTA**: `₩5,000 결제하기` 버튼 (약관 동의 시 활성화)
- **Flow**: 결제 버튼 클릭 → PG 연동 → 성공 시 `/shop/payment/complete`

#### Page: Payment Complete (결제 완료) - NEW (change-2026-01-13-1640)
- **Route**: `/shop/payment/complete`
- **Purpose**: 결제 완료 상태 및 결과 확인
- **User Stories**: US-005
- **Access**: 로그인 사용자
- **Entry Point**: Payment 페이지에서 결제 성공
- **Components**:
  - **PaymentSuccessStatus**: 성공 아이콘, "결제가 완료되었습니다" 메시지
  - **PaymentReceiptCard**: 결제 내역
    - Ink 수량, 보너스 Ink
    - 결제 수단, 결제 일시, 거래 번호
    - 결제 금액 강조
  - **ChargeResultCard**: 현재 보유 Ink 표시
  - **CTA 영역**:
    - `영수증 다운로드` 버튼 (PDF)
    - `확인` 버튼 → 이전 화면/메인 이동

---

### Reader Pages (독자 영역)

#### Page: Home (홈)
- **Route**: `/home`
- **Purpose**: 추천/인기 작품 표시
- **User Stories**: US-006
- **Access**: 로그인 사용자
- **Components**:
  - 추천 배너 캐러셀
  - 인기 작품 리스트
  - 최신 작품 리스트
  - 하단 네비게이션 바

#### Page: Explore (탐색)
- **Route**: `/explore`
- **Purpose**: 전체 작품 리스트 및 필터
- **User Stories**: US-006, US-007
- **Access**: 로그인 사용자
- **Components**:
  - 검색 입력 필드
  - 정렬 옵션 (최신순/Bounty순)
  - 작품 카드 그리드
  - OPEN 상태 표시 배지

#### Page: Search Results (검색 결과)
- **Route**: `/search?q={query}`
- **Purpose**: 검색 결과 표시
- **User Stories**: US-007
- **Access**: 로그인 사용자
- **Components**:
  - 페이지 헤더: "검색 결과" (검색창 없음)
  - 검색 결과 개수 표시
  - 결과 리스트 (Grid/List)
- **Note**: 페이지 내 검색창 없음. 재검색은 상단바(TopNav) 검색을 통해서만 수행 (change-2026-01-09-1137)

#### Page: Story Detail (작품 상세)
- **Route**: `/stories/:storyId`
- **Purpose**: 작품 정보, 에피소드 목록, 제안/후원 내역
- **User Stories**: US-006, US-008, US-035
- **Access**: 로그인 사용자
- **Components**:
  - 작품 정보 헤더 (썸네일, 제목, 작가, 총 모금액)
    - 작가 정보 클릭 시 작가 상세 페이지(`/creators/:creatorId`)로 이동
  - 에피소드 리스트
  - 에피소드별 상태(OPEN/PUBLISHED) 표시
  - **Proposals & Supports 탭 구조** (change-2026-01-12-1444)
    - **Proposals 탭**: 제안 내역 리스트
      - 제안자 프로필 (avatar, 닉네임, "제안자" 라벨)
      - 제안 내용
      - Backers 요약 (Backer 수, 총 Ink 합계)
      - Backers 요약 클릭 → BackersDetailModal
    - **Supports 탭**: 직접 후원 내역 리스트 (페이지네이션)
      - 후원자 프로필 (avatar, 닉네임)
      - 후원 Ink 수량
      - 후원 메시지
      - 후원 시점
  - **Main Producers 섹션**
    - Top 3: 가로 카드 3개 (프로필 이미지 큼, 닉네임, PROPOSER 라벨, 기여 Ink, 순위 배지 #1/#2/#3)
    - 그 외: 세로 리스트 (작은 avatar, 닉네임, 기여 Ink 우측 정렬)
    - **정렬**: 제안 + 지지 총 기여 Ink 내림차순
    - **클릭 불가**: 모든 유저 카드/리스트 아이템 non-interactive
  - **Sponsored by 섹션**
    - Compact list 또는 pill 형태
    - 시각적 우선순위 낮음 (보조 표기)

#### Page: Creator Detail (작가 상세)
- **Route**: `/creators/:creatorId`
- **Purpose**: 작가 프로필 및 작품 목록 조회
- **User Stories**: US-035
- **Access**: 로그인 사용자
- **Components**:
  - 작가 프로필 헤더
    - 프로필 사진
    - 작가명 (닉네임)
    - 작가소개글
  - 작품 목록 섹션
    - 작가의 전체 작품 리스트 (StoryCard 그리드)
    - 각 작품별 썸네일, 제목, 총 모금액 표시
  - 빈 상태 안내 ('등록된 작품이 없습니다')

#### Page: Episode Viewer (에피소드 뷰어)
- **Route**: `/stories/:storyId/episodes/:episodeId`
- **Purpose**: 에피소드 콘텐츠 열람 및 참여
- **User Stories**: US-008, US-009, US-010, US-011, US-012, US-013
- **Access**: 로그인 사용자
- **Components**:
  - 콘텐츠 뷰어 (이미지/텍스트 스크롤)
  - 액션 바 (OPEN 상태만)
    - 제안하기 버튼 → Proposal Modal
    - 후원하기 버튼 → DirectBacking Modal
  - 제안 목록 섹션 (change-2026-01-12-1444)
    - 제안 카드
      - 제안자 프로필 (avatar, 닉네임, "제안자" 라벨)
      - 제안 내용
      - Backers 요약 (Backer 수, 총 Ink 합계) - 클릭 가능
    - Backers 요약 클릭 → BackersDetailModal (Backer 목록: avatar, 닉네임, Ink 수량, 시점)
    - 지지하기 버튼 → Backing Modal
  - 크레딧 섹션 (PUBLISHED 상태) (change-2026-01-12-1444)
    - **Main Producer Top 3**: 가로 카드 3개
      - 프로필 이미지 (상대적으로 큼)
      - 닉네임
      - PROPOSER 라벨 (제안자 1명에게만)
      - 기여 Ink 수
      - 순위 배지 (#1, #2, #3)
    - **Main Producer 그 외**: 세로 리스트 (4위~)
      - 작은 avatar
      - 닉네임
      - 기여 Ink 수 (우측 정렬)
    - **Sponsored by**: Compact list 또는 pill 형태 (보조 표기)
    - **정렬**: 제안 + 지지 총 기여 Ink 내림차순 (proposer 우선 불필요)
    - **클릭 불가**: 모든 유저 카드/리스트 아이템 non-interactive

---

### Creator Pages (작가 영역)

#### Page: Creator Studio (크리에이터 스튜디오)
- **Route**: `/studio`
- **Purpose**: 작가 대시보드
- **User Stories**: US-014, US-015
- **Access**: CREATOR 역할
- **Components**:
  - 작품 목록
  - 에피소드 관리 링크
  - 제안 관리 링크
  - 정산 현황 요약

#### Page: Episode Management (에피소드 관리)
- **Route**: `/studio/episodes`
- **Purpose**: Story-first 레이아웃으로 에피소드 목록 조회 및 관리
- **User Stories**: US-015
- **Access**: CREATOR 역할
- **Layout Structure** (change-2026-01-13-1430):
  ```
  Primary View: Story List
  └── Story 선택 시 → Episode List (해당 Story만)
  ```
- **Components**:
  - **Story List (Primary View)**:
    - CreatorStoryList 컴포넌트 (크리에이터 본인 Story 목록)
    - CreatorStoryCard (Navigate/Edit/Preview 액션)
    - Search/Filter/Pagination 지원
    - 리스트 스크롤과 페이지 스크롤 분리
  - **Episode List (Story Context)**:
    - 선택된 Story의 Episode만 표시
    - 에피소드 상태/모금액 표시
    - 새 에피소드 추가 버튼
    - 에피소드별 편집/삭제 액션
    - Pagination/Infinite scroll 지원
- **Navigation Flow**: Story → Episode → Proposal (단방향)
- **Data Scale**: Story 10~100+, Episode 100+/Story

#### Page: Episode Editor (에피소드 편집)
- **Route**: `/studio/episodes/:episodeId/edit`
- **Purpose**: 콘티/완성본 업로드
- **User Stories**: US-014, US-019
- **Access**: CREATOR 역할
- **Components**:
  - 이미지 다중 업로드 (드래그 앤 드롭)
  - 이미지 순서 변경
  - 텍스트 입력 영역
  - 콘티/완성본 구분 토글
  - 저장/공개 버튼

#### Page: Proposal Management (제안 관리)
- **Route**: `/studio/proposals`
- **Purpose**: Episode-scoped view로 받은 제안 목록 조회 및 Deal/Drop 결정
- **User Stories**: US-016, US-017, US-018
- **Access**: CREATOR 역할
- **Layout Structure** (change-2026-01-13-1430):
  ```
  ┌─────────────────────────────────────────────────────┐
  │  Left/Top: Episode Selector                         │
  │  └── OPEN 상태 Episode만 표시                       │
  │  └── 검색 가능 (Episode 수 많을 때)                 │
  │                                                     │
  │  Main: Proposal List (선택된 Episode만)             │
  │  └── Sorting/Filtering/Pagination                   │
  └─────────────────────────────────────────────────────┘
  ```
- **Components**:
  - **Episode Selector (Left/Top)**:
    - EpisodeSelector 컴포넌트
    - 동일 Story 내 OPEN 상태 Episode만 표시
    - Desktop: Vertical list / Mobile: Dropdown
    - Episode 개수 많을 경우 검색 지원
  - **Proposal List (Main)**:
    - 선택된 Episode의 Proposal만 렌더링
    - 제안 카드 (내용, total_bounty, backer_count)
    - Sorting/Filtering/Pagination or Virtualized list
    - Deal 버튼 → 확인 모달
    - Drop 버튼 → 확인 모달
- **Navigation Flow**: Story → Episode → Proposal (단방향)
- **Data Scale**: Proposal 100+/Episode
- **Performance**: 한 번에 하나의 Episode 컨텍스트만 렌더링

#### Page: Settlement (정산 관리)
- **Route**: `/studio/settlements`
- **Purpose**: 정산 현황 조회 및 출금 요청
- **User Stories**: US-020, US-021
- **Access**: CREATOR 역할
- **Components**:
  - 예정 정산금 표시
  - 출금 가능 금액 표시
  - 에피소드별 정산 내역 리스트
  - 출금 요청 버튼 → 출금 모달

---

### Admin Pages (관리자 영역)

#### Page: Admin Dashboard (관리자 대시보드)
- **Route**: `/admin`
- **Purpose**: 플랫폼 운영 현황 개요
- **User Stories**: US-028
- **Access**: ADMIN 역할
- **Components**:
  - 총 회원 수/작품 수/거래액 카드
  - 최근 7일 가입자 추이 그래프
  - 대기중 정산 요청 건수
  - 최근 활동 로그

#### Page: User Management (회원 관리)
- **Route**: `/admin/users`
- **Purpose**: 회원 목록 조회 및 제재
- **User Stories**: US-022, US-023
- **Access**: ADMIN 역할
- **Components**:
  - 회원 검색/필터
  - 회원 리스트 테이블 (닉네임, 이메일, 가입일, 역할)
  - 페이지네이션 (50개/페이지)
  - 상세 보기 → 회원 상세 모달
  - 제재 버튼 → 제재 모달 (사유 입력)

#### Page: Content Management (콘텐츠 관리)
- **Route**: `/admin/contents`
- **Purpose**: 작품/에피소드 관리
- **User Stories**: US-024
- **Access**: ADMIN 역할
- **Components**:
  - 작품/에피소드 탭
  - 콘텐츠 리스트 테이블
  - 숨김/삭제 액션 버튼
  - 삭제 확인 모달

#### Page: Payment Management (결제 관리)
- **Route**: `/admin/payments`
- **Purpose**: Ink 충전 결제 내역 조회
- **User Stories**: US-027
- **Access**: ADMIN 역할
- **Components**:
  - 날짜 범위 필터
  - 결제 리스트 테이블 (회원명, 금액, 결제일, 결제수단)
  - 상세 보기 링크

#### Page: Settlement Management (정산 관리 - 관리자)
- **Route**: `/admin/settlements`
- **Purpose**: 출금 요청 목록 조회 및 승인
- **User Stories**: US-025, US-026
- **Access**: ADMIN 역할
- **Components**:
  - 상태별 필터 (대기중/승인/거절/완료)
  - 정산 요청 리스트 테이블 (작가명, 요청 금액, 요청일, 상태)
  - 상세 보기 → 정산 상세 모달
  - 승인/거절 버튼

#### Page: Report Management (신고 관리 - 관리자)
- **Route**: `/admin/reports`
- **Purpose**: 신고 목록 조회 및 처리
- **User Stories**: US-031, US-032
- **Access**: ADMIN 역할
- **Components**:
  - 처리 상태별 필터 (전체, 접수됨, 검토 중, 처리 완료, 기각)
  - 신고 유형별 필터 (스팸, 욕설/비방, 부적절한 콘텐츠, 저작권 침해, 허위 정보, 기타) - 6가지 (change-2026-01-12-1530)
  - 정렬 옵션 (최신순/오래된순)
  - 신고 리스트 테이블
    - 신고자 닉네임
    - 피신고자 닉네임
    - 신고 유형
    - 신고일
    - 처리 상태 배지
  - 상세 보기 → 신고 처리 모달

---

## Route Table

| Route | Page Name | User Stories | Access | Notes |
|-------|-----------|--------------|--------|-------|
| `/` | Splash | - | Public | 리다이렉트 전용 |
| `/login` | Login | US-002 | Public | 이메일/소셜 로그인 |
| `/signup` | Signup | US-001 | Public | 회원가입 |
| `/signup/complete` | SignupComplete | US-001 | Public | 회원가입 완료 (change-2026-01-14-1500) |
| `/password-reset` | PasswordReset | US-002-1 | Public | 비밀번호 재설정 Step1 (change-2026-01-14-1500) |
| `/password-reset/verify` | PasswordResetVerify | US-002-1 | Public | 비밀번호 재설정 Step2 (change-2026-01-14-1500) |
| `/password-reset/new` | PasswordResetNew | US-002-1 | Public | 비밀번호 재설정 Step3 (change-2026-01-14-1500) |
| `/terms` | Terms | US-001 | Public | 약관 동의 |
| `/profile/setup` | ProfileSetup | US-001 | Auth | 닉네임/본인인증 |
| `/mypage` | MyPage | US-001, US-002 | Auth | 내 정보 |
| `/mypage/wallet` | Wallet | US-003, US-003-1, US-003-2, US-004 | Auth | 내 지갑 |
| `/mypage/wallet/pending` | PendingProposals | US-003-1 | Auth | 진행 중인 제안 내역 |
| `/mypage/reports` | MyReports | US-030 | Auth | 신고 내역 |
| `/mypage/withdraw` | Withdraw | US-002-2 | Auth | 회원 탈퇴 (change-2026-01-14-1500) |
| `/settings` | Settings | US-033, US-034, US-002-2 | Auth | 프로필 수정 및 약관 동의 관리 |
| `/shop` | Shop | US-005 | Auth | Ink 충전 (마이페이지에서 진입) |
| `/shop/payment` | Payment | US-005 | Auth | 결제하기 (change-2026-01-13-1640) |
| `/shop/payment/complete` | PaymentComplete | US-005 | Auth | 결제 완료 (change-2026-01-13-1640) |
| `/home` | Home | US-006 | Auth | 메인 홈 |
| `/explore` | Explore | US-006, US-007 | Auth | 작품 탐색 |
| `/search` | Search | US-007 | Auth | 검색 결과 |
| `/stories/:storyId` | StoryDetail | US-006, US-008, US-035 | Auth | 작품 상세 |
| `/creators/:creatorId` | CreatorDetail | US-035 | Auth | 작가 상세 |
| `/stories/:storyId/episodes/:episodeId` | EpisodeViewer | US-008~013 | Auth | 에피소드 뷰어 |
| `/studio` | Studio | US-014, US-015 | Creator | 크리에이터 홈 |
| `/studio/episodes` | EpisodeManagement | US-015 | Creator | 에피소드 관리 |
| `/studio/episodes/:episodeId/edit` | EpisodeEditor | US-014, US-019 | Creator | 에피소드 편집 |
| `/studio/proposals` | ProposalManagement | US-016~018 | Creator | 제안 관리 |
| `/studio/settlements` | Settlement | US-020, US-021 | Creator | 정산 관리 |
| `/admin` | AdminDashboard | US-028 | Admin | 대시보드 |
| `/admin/users` | UserManagement | US-022, US-023 | Admin | 회원 관리 |
| `/admin/contents` | ContentManagement | US-024 | Admin | 콘텐츠 관리 |
| `/admin/payments` | PaymentManagement | US-027 | Admin | 결제 관리 |
| `/admin/settlements` | SettlementManagement | US-025, US-026 | Admin | 정산 관리 |
| `/admin/reports` | ReportManagement | US-031, US-032 | Admin | 신고 관리 |

---

## Modal/Overlay Components

| Modal Name | Trigger Location | Purpose | User Stories |
|------------|------------------|---------|--------------|
| ProposalModal | EpisodeViewer | 제안 생성 | US-009 |
| BackingModal | EpisodeViewer | 제안 지지 | US-010 |
| DirectBackingModal | EpisodeViewer | 직접 후원 | US-011 |
| **BackersDetailModal** | **EpisodeViewer, StoryDetail** | **Backers 상세 목록** | **US-010** |
| DealConfirmModal | ProposalManagement | Deal 확인 | US-017 |
| DropConfirmModal | ProposalManagement | Drop 확인 | US-018 |
| WithdrawalModal | Settlement | 출금 요청 | US-021 |
| SanctionModal | UserManagement | 회원 제재 | US-023 |
| DeleteConfirmModal | ContentManagement | 삭제 확인 | US-024 |
| SettlementDetailModal | SettlementManagement | 정산 상세 | US-025, US-026 |
| ReportModal | StoryDetail, ProposalCard, EpisodeViewer, UserProfile | 사용자/콘텐츠 신고 | US-029 |
| ReportDetailModal | MyReports | 신고 상세 (사용자용) | US-030 |
| ReportProcessModal | ReportManagement | 신고 처리 (관리자용) | US-031, US-032 |
| **PaymentErrorModal** | **Payment** | **결제 실패 에러 표시 및 재시도** | **US-005** |

> **Note (change-2026-01-13-1640)**: PaymentErrorModal은 결제 실패 시 PG 응답 기반 에러 메시지를 표시하고 재시도 버튼을 제공합니다.

> **Note (change-2026-01-12-1444)**: BackersDetailModal은 Proposal 카드의 Backers 요약 영역 클릭 시 열리며, 해당 제안을 지지한 모든 Backer 목록(프로필, 닉네임, Ink 수량, 시점)을 표시합니다.

---

## Navigation Structure

### Global Top Navigation (Reader/Common)

**모든 화면 크기에서 표시 (Sticky)** - (change-2026-01-09-1137)

#### Desktop/Tablet (≥768px)
```
┌────────────────────────────────────────────────────────────┐
│ [☰][로고]        [      검색바      ]        [계정버튼] │
│  Left                 Center                    Right    │
└────────────────────────────────────────────────────────────┘
```

#### Mobile (≤767px)
```
┌────────────────────────────────────────────────────────────┐
│    [☰]              [로고]              [🔍][계정버튼]    │
│   Left              Center                   Right        │
└────────────────────────────────────────────────────────────┘
```

**3영역 구조 (Left / Center / Right)**

- **Left 영역**:
  - 햄버거 버튼: 사이드바 토글 (모든 해상도에서 노출)
  - 로고: 이미지 로고 (small.png), 클릭 시 `/home`으로 이동
- **Center 영역**:
  - Desktop/Tablet: 검색 입력창 (정확히 중앙 정렬)
  - Mobile: 로고 (검색창 대신 로고 배치)
- **Right 영역**:
  - Mobile: 검색 아이콘 (클릭 시 슬라이드다운 검색 UI)
  - 비로그인: `로그인` 버튼
  - 로그인: `마이페이지` 버튼 또는 프로필 아이콘

**검색 UX**:
- 입력 중: 실시간 검색 팝업 (Preview, 최대 5~10개 결과)
- Enter 입력: `/search?q={query}` 페이지로 이동
- 실시간 팝업 구성: 썸네일, 작품명, 작가명, 조회수

### Bottom Navigation (Reader/Common - Mobile Only)

**모바일 전용 (< 1024px, `lg:hidden`)**

```
┌───────────┬───────────┬───────────┐
│    홈     │   탐색    │ 마이페이지 │
│   /home   │ /explore  │  /mypage  │
└───────────┴───────────┴───────────┘
```

> **Note:** Ink 충전 기능은 마이페이지 내에서 접근합니다.

### Side Navigation (Reader/Common - Desktop Only)

**데스크탑 전용 (≥ 1024px, `hidden lg:flex`)** - (change-2026-01-09-1137)

```
독자 (로고 없음, 충전 탭 없음)
├── 홈 (/home)
├── 탐색 (/explore)
└── 마이페이지 (/mypage)
```

> **Note**: 로고는 TopNav에서 표시. 충전 기능은 마이페이지에서 접근.

### Side Navigation (Creator - Studio)

```
크리에이터 스튜디오
├── 대시보드 (/studio)
├── 에피소드 관리 (/studio/episodes)
├── 제안 관리 (/studio/proposals)
└── 정산 관리 (/studio/settlements)
```

### Side Navigation (Admin)

```
관리자
├── 대시보드 (/admin)
├── 회원 관리 (/admin/users)
├── 콘텐츠 관리 (/admin/contents)
├── 결제 관리 (/admin/payments)
└── 정산 관리 (/admin/settlements)
```

---

## Access Control Matrix

| Page Group | READER | CREATOR | ADMIN |
|------------|--------|---------|-------|
| Public (/, /login, /signup) | O | O | O |
| Common (/mypage, /profile, /shop) | O | O | O |
| Reader (/home, /explore, /stories/*, /creators/*) | O | O | O |
| Creator Studio (/studio/*) | X | O | O |
| Admin (/admin/*) | X | X | O |

**Legend:** O = 접근 가능, X = 접근 불가 (리다이렉트)

---

## User Story Coverage

### Coverage Summary

- **Total User Stories**: 31
- **Mapped to Screens**: 31
- **Coverage**: 100%

### Coverage Details

| User Story | Mapped Screens |
|------------|----------------|
| US-001 | /signup, /terms, /profile/setup, /mypage |
| US-002 | /login, /mypage |
| US-003 | /mypage/wallet |
| US-004 | /mypage/wallet |
| US-005 | /mypage, /shop |
| US-006 | /home, /explore, /stories/:storyId |
| US-007 | /explore, /search |
| US-008 | /stories/:storyId, /stories/:storyId/episodes/:episodeId |
| US-035 | /stories/:storyId, /creators/:creatorId |
| US-009 | /stories/:storyId/episodes/:episodeId (ProposalModal) |
| US-010 | /stories/:storyId/episodes/:episodeId (BackingModal) |
| US-011 | /stories/:storyId/episodes/:episodeId (DirectBackingModal) |
| US-012 | /stories/:storyId/episodes/:episodeId (Credit Section) |
| US-013 | /stories/:storyId/episodes/:episodeId (Proposal List) |
| US-014 | /studio, /studio/episodes/:episodeId/edit |
| US-015 | /studio/episodes |
| US-016 | /studio/proposals |
| US-017 | /studio/proposals (DealConfirmModal) |
| US-018 | /studio/proposals (DropConfirmModal) |
| US-019 | /studio/episodes/:episodeId/edit |
| US-020 | /studio/settlements |
| US-021 | /studio/settlements (WithdrawalModal) |
| US-022 | /admin/users |
| US-023 | /admin/users (SanctionModal) |
| US-024 | /admin/contents |
| US-025 | /admin/settlements |
| US-026 | /admin/settlements (SettlementDetailModal) |
| US-027 | /admin/payments |
| US-028 | /admin |
| US-033 | /settings |
| US-034 | /settings |

---

## 문서 정보

- **생성일:** 2026-01-06
- **기반 문서:** user_stories_data.json, conceptual_model.json
