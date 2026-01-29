# Notification Generator - API Reference

## Actor Role Classification Rules

### Role Mapping Logic

Actors are normalized into abstract roles based on permissions:

| Role | Classification | Example Permissions | Use Cases |
|------|-----------------|-------------------|-----------|
| **end_user** | Service consumer | "조회", "작성", "이용", "Create/Read/Use" | Readers, Customers, Users |
| **provider** | Content creator | "업로드", "제공", "정산", "Upload/Provide/Settle" | Writers, Sellers, Creators |
| **operator** | Administrator | "관리", "승인", "제재", "Manage/Approve/Enforce" | Admins, Moderators, Support |

### Permission Keywords

**Operator Detection (any match triggers operator role):**
- 관리, 승인, 제재, 검토, 거절
- manage, approve, reject, admin, moderate

**Provider Detection (any match triggers provider role, unless operator matched):**
- 업로드, 제공, 정산, 출금, 생성
- upload, provide, settle, create, generate

**Default:** end_user (if no operator/provider keywords found)

---

## Event Type Taxonomy

All events fall into 5 categories:

### 1. ACTION_COMPLETED

User performed a task and wants confirmation.

**Patterns:** "완료", "완료되었습니다", "등록되었습니다", "completed", "done"

**Examples:**
- Proposal created and stored in escrow
- Content uploaded and published
- Payment processed

**Worthiness:** ✅ Can skip unless explicitly mentioned in AC

---

### 2. STATE_CHANGED

Entity's status transitioned irreversibly.

**Patterns:** "상태 변경", "상태 → 변경", "변경됨", "changed to"

**Examples:**
- Proposal → DEAL / DROP
- Episode → PUBLISHED
- User → SUSPENDED

**Worthiness:** ✅ Always notify (irreversible state)

---

### 3. FINANCIAL_EVENT

Money/resources moved between parties.

**Patterns:** "차감", "환불", "증가", "금액", "정산", "출금", "충전"
- deducted, refund, amount, payment, withdraw, transfer

**Examples:**
- Ink deducted from wallet
- Refund issued to backers
- Settlement payment calculated

**Worthiness:** ✅ Always notify (affects user assets)

---

### 4. DECISION_EVENT

System or operator made a choice affecting user.

**Patterns:** "승인", "거절", "승인됨", "거절됨"
- approved, rejected, accepted, declined

**Examples:**
- Withdrawal request approved/rejected
- Report processed (basic/warning/suspend)
- Proposal decision made

**Worthiness:** ✅ Always notify (user awaiting result)

---

### 5. SYSTEM_NOTICE

Informational messages, no action required.

**Patterns:** "알림 발송", "안내", "notify", "alert"

**Examples:**
- Monthly statement summary
- Platform announcement
- Bonus credits applied

**Worthiness:** ⚠️ Optional (depends on channel policy)

---

## Notification Worthiness Decision Tree

```
Is this event notification-worthy?

├─ YES if: Affects user assets (money, status, permissions)
│  └─ Keywords: 잔액, 금액, Ink, 출금, 환불, 상태, 변경, ...
│
├─ YES if: Irreversible state change
│  └─ Keywords: 상태, 변경, approved, rejected, published
│
├─ YES if: Asynchronous result (user was waiting)
│  └─ Keywords: 완료, 결과, 처리, completed, result, processed
│
├─ YES if: Requires user awareness
│  └─ Keywords: 알림, 확인, 승인 필요, notify, confirm
│
└─ NO if: Synchronous UI result (happens in same session)
   └─ Examples: Search results, list filters, form validation
```

---

## Notification Target Rules

### By Event Type

| Event Type | end_user Action | provider Action | operator Action |
|----------|-----------------|-----------------|-----------------|
| **action_completed** | Own action: notify | Own action: notify | System action: skip |
| **state_changed** | Any change: notify | Own change: notify | Admin change: notify |
| **financial_event** | Wallet impact: notify | Settlement: notify | Ledger: skip |
| **decision_event** | Await result: notify | Await approval: notify | Make decision: skip |
| **system_notice** | Relevant info: optional | Relevant info: optional | Admin: notify |

### Cross-Actor Flow

```
User initiates → System event → Affected party notified

Scenario 1: Reader creates proposal
  - Reader initiates "proposal_created"
  - Creator receives "new_proposal" notification

Scenario 2: Creator deals proposal
  - Creator initiates "proposal_approved"
  - Readers receive "proposal_accepted" notification

Scenario 3: Admin processes report
  - Admin initiates "report_processed"
  - Reporter receives "report_result" notification
```

---

## Channel Assignment Policy

### Default Logic

| Event Type | Default Channel | Rationale |
|----------|-----------------|----------|
| FINANCIAL_EVENT | **email** | Audit trail required |
| DECISION_EVENT | **email** | Confirmation needed |
| ADMIN_ACTION | **email** | Legal/compliance |
| ACTION_COMPLETED | **optional** | User already sees in UI |
| STATE_CHANGED | **email** | Important milestone |

### Urgency Overrides

If event mentions "urgent", "긴급", "immediately", etc.:
- Financial: email + SMS
- Decision: email + SMS
- Otherwise: email

---

## Event Naming Convention

Format: `<entity>_<action>[_result]`

### Entity Names (from domain or context)

| Source | Example | Result |
|--------|---------|--------|
| domain field | "지갑/재화" | `wallet_`, `payment_` |
| story context | "에피소드" | `episode_`, `content_` |
| action context | "제안 생성" | `proposal_` |

### Action Names (from story/AC)

| Pattern | Action | Example |
|---------|--------|---------|
| 생성, created | `_created` | `proposal_created` |
| 완료, completed | `_completed` | `payment_completed` |
| 승인, approved | `_approved` | `withdrawal_approved` |
| 거절, rejected | `_rejected` | `report_rejected` |
| 변경, changed | `_changed` | `status_changed` |

### Result Suffix

Optional `_result` added when outcome impacts next step:

```
approval_denied_result  (needed because downstream steps differ)
refund_issued_result    (needed because user doesn't wait for completion)
```

---

## Template Variables

### Always Available

- `{entityName}` - What was affected (proposal, episode, account)
- `{date}` - When it happened

### Conditionally Injected

Based on story context:

| Keyword in Story | Variable | Example |
|------------------|----------|---------|
| 금액, amount | `{amount}` | "1000 Ink" |
| 상태, status | `{result}` | "APPROVED" |
| 사유, reason | `{reason}` | "Violates policy" |
| 사용자/작가 | `{userName}` | "JohnDoe" |
| 기간 | `{period}` | "30 days" |

### Template Example

```
Dear {userName},

Your {entityName} has been {result} on {date}.

Amount: {amount}
Reason: {reason}

Best regards,
Platform Team
```
