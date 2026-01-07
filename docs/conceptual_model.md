# Conceptual Model - 쟈근친구들 V2 (Conture)

## 프로젝트 개요

**프로젝트명:** 쟈근친구들 V2 (Conture)
**설명:** 작가가 스토리 초안(콘티)을 올리면, 팬들이 창작에 참여하고 기여를 크레딧으로 인정받는 참여형 플랫폼

---

## Entity Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                  USER DOMAIN                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐    1:1    ┌──────────┐    1:N    ┌─────────────┐             │
│  │   User   │──────────▶│  Wallet  │──────────▶│ Transaction │             │
│  └──────────┘           └──────────┘           └─────────────┘             │
│       │                                                                     │
│       ├─── 1:N ──▶ ┌──────────┐                                            │
│       │            │ Sanction │                                            │
│       │            └──────────┘                                            │
│       │                 ▲                                                   │
│       │                 │ N:1 (연동)                                        │
│       │                 │                                                   │
│       └─── 1:N ──▶ ┌──────────┐                                            │
│        (reporter)  │  Report  │◀── N:1 ── User (reported)                  │
│                    └──────────┘                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                CONTENT DOMAIN                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐    1:N    ┌──────────┐    1:N    ┌────────────────┐          │
│  │  Story   │──────────▶│ Episode  │──────────▶│ EpisodeContent │          │
│  └──────────┘           └──────────┘           └────────────────┘          │
│       ▲                      │                                              │
│       │                      │ 1:1                                          │
│  N:1  │                      ▼                                              │
│  ┌──────────┐           ┌──────────┐                                        │
│  │   User   │           │  Credit  │                                        │
│  │(Creator) │           └──────────┘                                        │
│  └──────────┘                                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                             INTERVENTION DOMAIN                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐    1:N    ┌──────────┐    1:1    ┌──────────┐                │
│  │ Episode  │◀─────────│ Proposal │──────────▶│  Escrow  │                │
│  └──────────┘           └──────────┘           └──────────┘                │
│                              │                                              │
│                              │ 1:N                                          │
│                              ▼                                              │
│                         ┌──────────┐                                        │
│                         │ Backing  │                                        │
│                         └──────────┘                                        │
│                              ▲                                              │
│                              │ N:1                                          │
│                         ┌──────────┐                                        │
│                         │   User   │                                        │
│                         │ (Reader) │                                        │
│                         └──────────┘                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              PAYMENT DOMAIN                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐    N:1    ┌──────────┐                                        │
│  │ Payment  │──────────▶│   User   │                                        │
│  └──────────┘           └──────────┘                                        │
│                                                                             │
│  ┌───────────────────┐    N:1    ┌──────────┐                              │
│  │ WithdrawalRequest │──────────▶│   User   │                              │
│  └───────────────────┘           │(Creator) │                              │
│                                  └──────────┘                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Entity Definitions

### 1. User (사용자)

플랫폼을 사용하는 모든 사용자 (독자, 작가, 관리자)

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 사용자 고유 식별자 |
| email | String | O | 이메일 주소 (로그인 ID) |
| password | String | X | 암호화된 비밀번호 (소셜 로그인 시 null) |
| nickname | String | O | 닉네임 (크레딧 표기용, Unique) |
| profileImageUrl | String | X | 프로필 이미지 URL |
| bio | String | X | 자기소개 (작가 프로필용) |
| role | Enum | O | 사용자 역할 |
| authProvider | Enum | O | 인증 방식 |
| status | Enum | O | 계정 상태 |
| isVerified | Boolean | O | 본인인증 완료 여부 |
| createdAt | DateTime | O | 가입일시 |
| updatedAt | DateTime | O | 정보 수정일시 |

**Enum Values:**
- `role`: READER, CREATOR, ADMIN
- `authProvider`: EMAIL, KAKAO, GOOGLE
- `status`: ACTIVE, SUSPENDED, DELETED

**Relationships:**
- 1:1 → Wallet (사용자는 하나의 지갑을 보유)
- 1:N → Story (작가는 여러 작품을 소유)
- 1:N → Proposal (독자는 여러 제안을 생성)
- 1:N → Backing (독자는 여러 지지/후원을 수행)
- 1:N → WithdrawalRequest (작가는 여러 출금 요청을 생성)

**관련 User Story:** US-001, US-002, US-022, US-023, US-033

---

### 2. Wallet (지갑)

사용자의 Ink 재화를 관리하는 지갑

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 지갑 고유 식별자 |
| userId | UUID | O | 소유자 사용자 ID |
| availableBalance | Integer | O | 사용 가능한 Ink 잔액 (즉시 사용 가능) |
| pendingBalance | Integer | O | 진행 중인 제안에 묶인 Ink (Proposal/Backing 에스크로) |
| totalBalance | Integer | O | 총 보유 Ink (availableBalance + pendingBalance, 계산 필드) |
| payableBalance | Integer | O | 정산 예정금 (작가용) |
| withdrawableBalance | Integer | O | 출금 가능 금액 (작가용) |
| updatedAt | DateTime | O | 잔액 갱신일시 |

**Balance 계산 규칙:**
- `availableBalance`: 후원/제안에 즉시 사용할 수 있는 Ink
- `pendingBalance`: Proposal 생성 또는 Backing 시 에스크로로 이동한 Ink의 합계
- `totalBalance` = `availableBalance` + `pendingBalance`
- Proposal/Backing 생성 시: `availableBalance` 감소, `pendingBalance` 증가
- Proposal 채택/미채택 정산 시: `pendingBalance` 감소, 결과에 따라 `availableBalance` 증가 또는 작가에게 전달

**Relationships:**
- N:1 → User (지갑은 하나의 사용자에 속함)
- 1:N → Transaction (지갑은 여러 트랜잭션 내역을 보유)

**관련 User Story:** US-003, US-003-1, US-003-2, US-004, US-020

---

### 3. Transaction (트랜잭션)

Ink 재화의 모든 흐름을 기록하는 불변 로그

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 트랜잭션 고유 식별자 |
| walletId | UUID | O | 관련 지갑 ID |
| type | Enum | O | 트랜잭션 유형 |
| amount | Integer | O | 금액 (양수) |
| direction | Enum | O | 입출금 방향 |
| referenceType | Enum | X | 참조 엔티티 유형 |
| referenceId | UUID | X | 참조 엔티티 ID |
| description | String | X | 트랜잭션 설명 |
| createdAt | DateTime | O | 발생일시 |

**Enum Values:**
- `type`: CHARGE, USE_PROPOSAL, USE_BACKING, USE_DIRECT, REFUND, SETTLEMENT, WITHDRAWAL
- `direction`: IN, OUT
- `referenceType`: PAYMENT, PROPOSAL, BACKING, EPISODE, WITHDRAWAL_REQUEST

**관련 User Story:** US-004

---

### 4. Payment (결제)

실제 화폐로 Ink를 구매한 결제 내역

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 결제 고유 식별자 |
| userId | UUID | O | 결제자 ID |
| inkAmount | Integer | O | 충전된 Ink 양 |
| paymentAmount | Integer | O | 결제 금액 (원) |
| paymentMethod | Enum | O | 결제 수단 |
| pgTransactionId | String | O | PG사 거래 ID |
| status | Enum | O | 결제 상태 |
| createdAt | DateTime | O | 결제 요청일시 |
| completedAt | DateTime | X | 결제 완료일시 |

**Enum Values:**
- `paymentMethod`: CARD, KAKAO_PAY, TOSS, PAYPLE
- `status`: PENDING, COMPLETED, FAILED, CANCELLED

**관련 User Story:** US-005, US-027

---

### 5. Story (작품)

작가가 연재하는 작품 (웹툰/웹소설)

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 작품 고유 식별자 |
| creatorId | UUID | O | 작가 ID |
| title | String | O | 작품 제목 |
| description | String | X | 작품 소개 |
| thumbnailUrl | String | X | 썸네일 이미지 URL |
| totalBounty | Integer | O | 전체 에피소드 총 모금액 |
| status | Enum | O | 작품 상태 |
| createdAt | DateTime | O | 생성일시 |
| updatedAt | DateTime | O | 수정일시 |

**Enum Values:**
- `status`: DRAFT, ACTIVE, HIDDEN, DELETED

**관련 User Story:** US-006, US-007, US-024

---

### 6. Episode (에피소드)

작품의 개별 회차 (콘티 또는 완성본)

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 에피소드 고유 식별자 |
| storyId | UUID | O | 소속 작품 ID |
| episodeNumber | Integer | O | 회차 번호 |
| title | String | O | 에피소드 제목 |
| status | Enum | O | 에피소드 상태 |
| totalBounty | Integer | O | 해당 회차 총 모금액 |
| createdAt | DateTime | O | 생성일시 |
| publishedAt | DateTime | X | 공개일시 |

**Enum Values:**
- `status`: DRAFT, OPEN, PUBLISHED, HIDDEN, DELETED

**관련 User Story:** US-008, US-012, US-014, US-015, US-019

---

### 7. EpisodeContent (에피소드 콘텐츠)

에피소드를 구성하는 개별 콘텐츠 (이미지/텍스트)

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 콘텐츠 고유 식별자 |
| episodeId | UUID | O | 소속 에피소드 ID |
| contentType | Enum | O | 콘텐츠 유형 |
| contentUrl | String | X | 이미지 URL (IMAGE 유형) |
| textContent | String | X | 텍스트 내용 (TEXT 유형) |
| orderIndex | Integer | O | 표시 순서 |
| isFinal | Boolean | O | 최종 원고 여부 |
| createdAt | DateTime | O | 업로드일시 |

**Enum Values:**
- `contentType`: IMAGE, TEXT

**관련 User Story:** US-008, US-014, US-019

---

### 8. Proposal (제안)

독자가 스토리 전개에 개입하기 위해 생성한 제안

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 제안 고유 식별자 |
| episodeId | UUID | O | 대상 에피소드 ID |
| proposerId | UUID | O | 제안자 (독자) ID |
| description | String | O | 제안 내용 |
| seedMoney | Integer | O | 최초 베팅액 |
| totalBounty | Integer | O | 총 모금액 |
| backerCount | Integer | O | 지지자 수 |
| status | Enum | O | 제안 상태 |
| createdAt | DateTime | O | 생성일시 |
| decidedAt | DateTime | X | Deal/Drop 결정일시 |

**Enum Values:**
- `status`: PENDING, DEAL, DROP

**관련 User Story:** US-009, US-013, US-016, US-017, US-018

---

### 9. Backing (지지/후원)

독자가 제안에 지지하거나 직접 후원한 기록

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 지지/후원 고유 식별자 |
| backerId | UUID | O | 지지자/후원자 (독자) ID |
| type | Enum | O | 유형 |
| proposalId | UUID | X | 지지 대상 제안 ID |
| episodeId | UUID | X | 직접 후원 대상 에피소드 ID |
| amount | Integer | O | 지지/후원 금액 |
| status | Enum | O | 상태 |
| createdAt | DateTime | O | 생성일시 |

**Enum Values:**
- `type`: PROPOSAL_BACKING, DIRECT_BACKING
- `status`: ESCROWED, SETTLED, REFUNDED

**관련 User Story:** US-010, US-011

---

### 10. Credit (크레딧)

완성된 에피소드 하단에 표시되는 기여자 크레딧 데이터

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 크레딧 고유 식별자 |
| episodeId | UUID | O | 소속 에피소드 ID |
| contributors | JSON | O | 기여자 리스트 |
| mainProducers | Array[UUID] | O | 상위 3인 Main Producer 사용자 ID |
| createdAt | DateTime | O | 생성일시 (영구 박제) |

**관련 User Story:** US-012, US-019

---

### 11. Escrow (에스크로)

제안/지지 시 시스템이 보관하는 에스크로 계정

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 에스크로 고유 식별자 |
| proposalId | UUID | O | 관련 제안 ID |
| totalAmount | Integer | O | 보관 중인 총 금액 |
| status | Enum | O | 에스크로 상태 |
| createdAt | DateTime | O | 생성일시 |
| resolvedAt | DateTime | X | 해제/환불 처리일시 |

**Enum Values:**
- `status`: HOLDING, RELEASED, REFUNDED

**관련 User Story:** US-009, US-010, US-017, US-018

---

### 12. WithdrawalRequest (출금 요청)

작가가 출금 가능 금액을 실제 계좌로 출금 요청한 내역

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 출금 요청 고유 식별자 |
| creatorId | UUID | O | 요청자 (작가) ID |
| amount | Integer | O | 출금 요청 금액 |
| bankName | String | O | 은행명 |
| accountNumber | String | O | 계좌번호 |
| accountHolder | String | O | 예금주명 |
| status | Enum | O | 요청 상태 |
| adminNote | String | X | 관리자 메모 |
| createdAt | DateTime | O | 요청일시 |
| processedAt | DateTime | X | 처리 완료일시 |

**Enum Values:**
- `status`: PENDING, APPROVED, REJECTED, COMPLETED

**관련 User Story:** US-021, US-025, US-026

---

### 13. Sanction (제재)

관리자가 악성 유저에게 부과한 제재 기록

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 제재 고유 식별자 |
| userId | UUID | O | 제재 대상 사용자 ID |
| adminId | UUID | O | 제재 처리 관리자 ID |
| reportId | UUID | X | 연동된 신고 ID (신고 기반 제재 시) |
| reason | String | O | 제재 사유 |
| type | Enum | O | 제재 유형 |
| startAt | DateTime | O | 제재 시작일시 |
| endAt | DateTime | X | 제재 종료일시 |
| createdAt | DateTime | O | 생성일시 |

**Enum Values:**
- `type`: WARNING, SUSPENSION, PERMANENT_BAN

**관련 User Story:** US-023, US-032

---

### 14. Report (신고)

사용자가 다른 사용자를 신고한 기록

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | O | 신고 고유 식별자 |
| reporterId | UUID | O | 신고자 사용자 ID |
| reportedUserId | UUID | O | 피신고자 사용자 ID |
| type | Enum | O | 신고 유형 |
| reason | String | O | 신고 사유 상세 (최소 10자) |
| referenceType | Enum | X | 신고 맥락 참조 유형 |
| referenceId | UUID | X | 신고 맥락 참조 ID |
| status | Enum | O | 처리 상태 |
| adminId | UUID | X | 처리 담당 관리자 ID |
| adminFeedback | String | X | 신고자에게 공개되는 처리 결과 피드백 |
| adminNote | String | X | 내부 관리자 메모 (비공개) |
| sanctionId | UUID | X | 연동된 제재 ID (제재 조치 시) |
| createdAt | DateTime | O | 신고 접수일시 |
| processedAt | DateTime | X | 처리 완료일시 |

**Enum Values:**
- `type`: SPAM, ABUSE, INAPPROPRIATE_CONTENT, OTHER
- `referenceType`: PROPOSAL, BACKING, COMMENT, PROFILE (신고가 발생한 맥락)
- `status`: PENDING, REVIEWING, RESOLVED, DISMISSED

**Business Rules:**
- 동일 신고자가 동일 피신고자를 중복 신고할 수 없음 (PENDING/REVIEWING 상태일 때)
- 신고 처리 시 제재 조치를 선택하면 Sanction 엔티티와 연동
- 처리 완료 시 신고자에게 결과 알림 발송 가능

**Relationships:**
- N:1 → User (reporterId: 신고자)
- N:1 → User (reportedUserId: 피신고자)
- N:1 → User (adminId: 처리 관리자)
- 1:1 → Sanction (제재 조치 시 연동, 선택적)

**관련 User Story:** US-029, US-030, US-031, US-032

---

## Domain Rules (비즈니스 규칙)

| ID | Rule Name | Description |
|----|-----------|-------------|
| DR-001 | 닉네임 고유성 | 닉네임은 플랫폼 전체에서 중복될 수 없음 (크레딧 표기용) |
| DR-002 | 최소 제안 금액 | 제안 생성 시 최소 100 Ink 이상 베팅해야 함 |
| DR-003 | 잔액 초과 사용 불가 | 제안/지지/후원 시 보유 Ink보다 많은 금액 사용 불가 |
| DR-004 | 에스크로 보관 | 제안/지지 시 Ink는 시스템 에스크로에 보관되며, Deal 또는 Drop 시까지 유지 |
| DR-005 | Drop 시 전액 환불 | 제안이 Drop되면 해당 제안의 모든 Backer에게 100% 환불 |
| DR-006 | Deal 시 정산 이관 | 제안이 Deal되면 에스크로 금액이 작가의 payable_balance로 이동 |
| DR-007 | 직접 후원 즉시 정산 | 직접 후원은 에스크로 없이 즉시 작가의 정산 예정금으로 이동 |
| DR-008 | 최종 원고 업로드 시 정산 전환 | 완성 원고 업로드 시 payable_balance가 withdrawable_balance로 전환 (수수료 차감) |
| DR-009 | 크레딧 영구 박제 | 에피소드 공개 시 생성된 크레딧 데이터는 이후 변경 불가 |
| DR-010 | 크레딧 정렬 규칙 | 채택된 제안자 우선 표시 후 금액순 정렬, 상위 3인 Main Producer 강조 |
| DR-011 | 출금 가능 금액 초과 불가 | 출금 요청 금액은 withdrawable_balance를 초과할 수 없음 |
| DR-012 | OPEN 상태에서만 제안/후원 가능 | 에피소드 상태가 OPEN일 때만 제안 생성, 지지, 직접 후원 가능 |
| DR-013 | 제재된 사용자 로그인 차단 | SUSPENDED 또는 PERMANENT_BAN 제재 적용 시 해당 사용자 로그인 차단 |

---

## Data Flows (주요 흐름)

### 1. 독자 회원가입 및 Ink 충전
```
User 생성 → Wallet 자동 생성 → Payment (PG 결제) → Transaction 생성 → Wallet.currentBalance 증가
```

### 2. 제안 생성 플로우
```
Episode.status=OPEN 확인 → 잔액 확인 → Proposal 생성 → Escrow 생성 → Backing 생성 → Transaction → Wallet.currentBalance 감소
```

### 3. 제안 지지 플로우
```
Proposal.status=PENDING 확인 → 잔액 확인 → Backing 생성 → Escrow.totalAmount 증가 → Proposal 업데이트 → Transaction → Wallet 감소
```

### 4. 직접 후원 플로우
```
Episode.status=OPEN 확인 → 잔액 확인 → Backing 생성 (SETTLED) → Transaction → 독자 Wallet 감소 → 작가 payableBalance 증가
```

### 5. Deal (채택) 플로우
```
Proposal.status → DEAL → Escrow → RELEASED → Backing → SETTLED → 작가 payableBalance 증가 → Transaction
```

### 6. Drop (거절) 플로우
```
Proposal.status → DROP → Escrow → REFUNDED → Backing → REFUNDED → 각 Backer Wallet 복구 → Transaction (REFUND)
```

### 7. 완성 원고 공개 플로우
```
EpisodeContent (isFinal) → Episode.status → PUBLISHED → Credit 자동 생성 → payableBalance → withdrawableBalance (수수료 차감)
```

### 8. 출금 요청 플로우
```
잔액 확인 → WithdrawalRequest (PENDING) → 관리자 검토 → APPROVED/REJECTED → COMPLETED → Wallet.withdrawableBalance 감소 → Transaction
```

---

## Glossary (용어 사전)

| 용어 | 정의 |
|------|------|
| **Ink** | 플랫폼 내 유료 재화. 실제 화폐로 구매하며, 제안/지지/후원에 사용 |
| **콘티** | 작가가 업로드하는 스토리 초안 (이미지/텍스트). OPEN 상태에서 후원/제안을 받음 |
| **제안 (Proposal)** | 독자가 스토리 전개에 개입하기 위해 Ink를 걸고 생성하는 요청 |
| **지지 (Backing)** | 다른 독자의 제안에 추가로 Ink를 더해 채택 확률을 높이는 행위 |
| **직접 후원 (Direct Backing)** | 제안 없이 순수하게 창작을 지원하는 후원 방식 |
| **Bounty** | 제안에 모인 총 금액 (seedMoney + 모든 backing 금액) |
| **에스크로 (Escrow)** | 제안/지지 시 시스템이 Ink를 임시 보관하는 계정. Deal 또는 Drop 시 해제 |
| **Deal** | 작가가 제안을 채택하는 것. 에스크로 금액이 작가에게 이동 |
| **Drop** | 작가가 제안을 거절하는 것. 에스크로 금액이 참여자에게 100% 환불 |
| **크레딧 (Credit)** | 완성된 에피소드 하단에 표시되는 기여자 명단. 영구 박제됨 |
| **Main Producer** | 기여 금액 상위 3인에게 부여되는 특별 타이틀 |
| **payable_balance** | 정산 예정금. Deal 또는 직접 후원 시 누적되는 금액 |
| **withdrawable_balance** | 출금 가능 금액. 완성 원고 공개 후 수수료 차감된 금액 |
| **OPEN** | 에피소드 상태. 후원 및 제안을 받을 수 있는 상태 |
| **PUBLISHED** | 에피소드 상태. 완성 원고가 공개된 상태. 제안/후원 불가 |

---

## 문서 정보

- **생성일:** 2026-01-06
- **기반 문서:** user_stories_data.json, seed-docs/*
