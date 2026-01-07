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
  - 카카오 소셜 로그인 버튼
  - 구글 소셜 로그인 버튼
  - 회원가입 링크

#### Page: Signup (회원가입)
- **Route**: `/signup`
- **Purpose**: 이메일/소셜 회원가입
- **User Stories**: US-001
- **Access**: 비로그인 사용자
- **Components**:
  - 이메일 회원가입 폼
  - 소셜 회원가입 버튼
  - 약관 동의 체크박스

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

#### Page: Ink Shop (Ink 충전)
- **Route**: `/shop`
- **Purpose**: Ink 결제 및 충전
- **User Stories**: US-005
- **Access**: 로그인 사용자
- **Entry Point**: 마이페이지 → Ink 충전 바로가기
- **Components**:
  - 충전 옵션 카드 (1000/5000/10000 Ink)
  - PG 결제 연동 (토스/페이플)
  - 결제 완료 확인

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
  - 검색어 표시
  - 결과 리스트
  - 필터/정렬 옵션

#### Page: Story Detail (작품 상세)
- **Route**: `/stories/:storyId`
- **Purpose**: 작품 정보 및 에피소드 목록
- **User Stories**: US-006, US-008, US-033
- **Access**: 로그인 사용자
- **Components**:
  - 작품 정보 헤더 (썸네일, 제목, 작가, 총 모금액)
    - 작가 정보 클릭 시 작가 상세 페이지(`/creators/:creatorId`)로 이동
  - 에피소드 리스트
  - 에피소드별 상태(OPEN/PUBLISHED) 표시

#### Page: Creator Detail (작가 상세)
- **Route**: `/creators/:creatorId`
- **Purpose**: 작가 프로필 및 작품 목록 조회
- **User Stories**: US-033
- **Access**: 로그인 사용자
- **Components**:
  - 작가 프로필 헤더
    - 프로필 사진
    - 작가명 (닉네임)
    - 소개글
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
  - 제안 목록 섹션
    - 제안 카드 (내용, 모금액, 지지자 수)
    - 지지하기 버튼 → Backing Modal
  - 크레딧 섹션 (PUBLISHED 상태)
    - Main Producer (상위 3인)
    - Sponsored by 리스트

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
- **Purpose**: 에피소드 목록 조회 및 관리
- **User Stories**: US-015
- **Access**: CREATOR 역할
- **Components**:
  - 에피소드 리스트 (상태, 모금액 표시)
  - 새 에피소드 추가 버튼
  - 에피소드별 편집/삭제 액션

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
- **Purpose**: 받은 제안 목록 조회 및 Deal/Drop 결정
- **User Stories**: US-016, US-017, US-018
- **Access**: CREATOR 역할
- **Components**:
  - 에피소드별 제안 목록 (모금액 순 정렬)
  - 제안 카드 (내용, total_bounty, backer_count)
  - Deal 버튼 → 확인 모달
  - Drop 버튼 → 확인 모달

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
  - 신고 유형별 필터 (스팸, 욕설/비방, 부적절한 콘텐츠, 기타)
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
| `/terms` | Terms | US-001 | Public | 약관 동의 |
| `/profile/setup` | ProfileSetup | US-001 | Auth | 닉네임/본인인증 |
| `/mypage` | MyPage | US-001, US-002 | Auth | 내 정보 |
| `/mypage/wallet` | Wallet | US-003, US-003-1, US-003-2, US-004 | Auth | 내 지갑 |
| `/mypage/wallet/pending` | PendingProposals | US-003-1 | Auth | 진행 중인 제안 내역 |
| `/mypage/reports` | MyReports | US-030 | Auth | 신고 내역 |
| `/shop` | Shop | US-005 | Auth | Ink 충전 (마이페이지에서 진입) |
| `/home` | Home | US-006 | Auth | 메인 홈 |
| `/explore` | Explore | US-006, US-007 | Auth | 작품 탐색 |
| `/search` | Search | US-007 | Auth | 검색 결과 |
| `/stories/:storyId` | StoryDetail | US-006, US-008, US-033 | Auth | 작품 상세 |
| `/creators/:creatorId` | CreatorDetail | US-033 | Auth | 작가 상세 |
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
| DealConfirmModal | ProposalManagement | Deal 확인 | US-017 |
| DropConfirmModal | ProposalManagement | Drop 확인 | US-018 |
| WithdrawalModal | Settlement | 출금 요청 | US-021 |
| SanctionModal | UserManagement | 회원 제재 | US-023 |
| DeleteConfirmModal | ContentManagement | 삭제 확인 | US-024 |
| SettlementDetailModal | SettlementManagement | 정산 상세 | US-025, US-026 |
| ReportModal | EpisodeViewer, UserProfile | 사용자 신고 | US-029 |
| ReportDetailModal | MyReports | 신고 상세 (사용자용) | US-030 |
| ReportProcessModal | ReportManagement | 신고 처리 (관리자용) | US-031, US-032 |

---

## Navigation Structure

### Bottom Navigation (Reader/Common)

```
┌───────────┬───────────┬───────────┐
│    홈     │   탐색    │ 마이페이지 │
│   /home   │ /explore  │  /mypage  │
└───────────┴───────────┴───────────┘
```

> **Note:** Ink 충전 기능은 마이페이지 내에서 접근합니다.

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

- **Total User Stories**: 29
- **Mapped to Screens**: 29
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
| US-033 | /stories/:storyId, /creators/:creatorId |
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

---

## 문서 정보

- **생성일:** 2026-01-06
- **기반 문서:** user_stories_data.json, conceptual_model.json
