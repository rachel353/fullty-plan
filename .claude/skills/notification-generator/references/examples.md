# Real-World Examples: Input → Output Transformations

## Example 1: End-User Action (Proposal Creation)

### Input

```json
{
  "id": "US-009",
  "actor_id": "actor-reader",
  "story": "As a 독자, I want to 제안(Proposal)을 생성하다, So that 스토리 전개에 개입하고 채택 시 크레딧에 이름을 남길 수 있다",
  "acceptance_criteria": [
    "AC-1: 제안 작성 모달에서 내용 입력 및 초기 베팅액(최소 100 Ink) 설정",
    "AC-2: 베팅액이 보유 Ink보다 많을 경우 '잔액이 부족합니다' 에러 표시",
    "AC-3: 제안 생성 시 즉시 Ink 차감 및 에스크로 처리",
    "AC-4: 제안 생성 완료 시 '제안이 등록되었습니다' 확인 메시지 표시"
  ],
  "domain": "스토리 인터벤션"
}
```

### Analysis

- **Actor Role:** end_user (독자)
- **Event Patterns Found:** "생성", "차감", "에스크로"
- **Event Type:** financial_event (잔액 차감)
- **Notification Worthy:** ✅ YES (affects asset: Ink 차감)
- **Targets:** end_user (자신의 액션)

### Generated Output

```json
{
  "event": "proposal_created",
  "title": "AC-1: 제안 작성 모달에서 내용 입력 및 초기 베팅액(최소 100 Ink) 설정",
  "description": "AC-1: 제안 작성 모달에서 내용 입력 및 초기 베팅액(최소 100 Ink) 설정 for 스토리 인터벤션",
  "channel": "email",
  "template": "{entityName} notification - AC-1: 제안 작성 모달에서 내용 입력 및 초기 베팅액(최소 100 Ink) 설정 [amount, date, entityName]"
}
```

**Interpretation:**
- Email sent when proposal created
- Documents Ink deduction
- User aware of escrow hold
- Event name: `proposal_created` (domain + action)

---

## Example 2: Provider Response (Proposal Approval/Rejection)

### Input

```json
{
  "id": "US-017",
  "actor_id": "actor-creator",
  "story": "As a 작가, I want to 제안을 채택(Deal)하다, So that 해당 제안의 Bounty를 정산 예정금으로 받을 수 있다",
  "acceptance_criteria": [
    "AC-1: Deal 버튼 클릭 시 확인 모달 표시",
    "AC-2: 확인 후 Proposal 상태 DEAL로 변경",
    "AC-3: 에스크로 된 Ink가 작가 payable_balance로 이동",
    "AC-4: Deal 완료 시 '제안이 채택되었습니다' 확인 메시지 표시"
  ],
  "domain": "제안 관리"
}
```

### Analysis

- **Actor Role:** provider (작가)
- **Event Patterns Found:** "상태 DEAL로 변경", "payable_balance 이동"
- **Event Types:** state_changed + financial_event
- **Notification Worthy:** ✅ YES (state change + money flow)
- **Targets:** provider (자신), but also end_user (제안자들)

### Generated Outputs

```json
// For provider (creator)
{
  "event": "proposal_approved",
  "title": "AC-2: 확인 후 Proposal 상태 DEAL로 변경",
  "description": "AC-2: 확인 후 Proposal 상태 DEAL로 변경 for 제안 관리",
  "channel": "email",
  "template": "{entityName} notification - AC-2: 확인 후 Proposal 상태 DEAL로 변경 [amount, date, entityName, result]"
}

// For end_user (proposal creators)
// → Generated when event is marked as affecting multiple roles
{
  "event": "proposal_approved",
  "title": "Your proposal was accepted!",
  "description": "Your proposal has been approved by the creator",
  "channel": "email",
  "template": "..."
}
```

---

## Example 3: Financial Event (Payment/Refund)

### Input

```json
{
  "id": "US-018",
  "actor_id": "actor-creator",
  "story": "As a 작가, I want to 제안을 거절(Drop)하다, So that 원하지 않는 제안을 거절하고 참여자에게 환불할 수 있다",
  "acceptance_criteria": [
    "AC-1: Drop 버튼 클릭 시 확인 모달 표시",
    "AC-2: 확인 후 Proposal 상태 DROP으로 변경",
    "AC-3: 해당 Proposal의 모든 Backer에게 Ink 100% 자동 반환",
    "AC-4: Drop 완료 시 '제안이 거절되었습니다' 확인 메시지 표시"
  ],
  "domain": "제안 관리"
}
```

### Analysis

- **Actor Role:** provider (작가)
- **Event Patterns Found:** "상태 DROP", "환불", "Ink 자동 반환"
- **Event Type:** financial_event (환불)
- **Notification Worthy:** ✅ YES (refund = affects asset)
- **Targets:** end_user (모든 Backer들에게)

### Generated Output

```json
{
  "event": "proposal_refunded",
  "title": "AC-3: 해당 Proposal의 모든 Backer에게 Ink 100% 자동 반환",
  "description": "AC-3: 해당 Proposal의 모든 Backer에게 Ink 100% 자동 반환 for 제안 관리",
  "channel": "email",
  "template": "{entityName} notification - AC-3: 해당 Proposal의 모든 Backer에게 Ink 100% 자동 반환 [amount, date, entityName]"
}
```

**Interpretation:**
- End-users automatically notified
- Includes refund amount
- Clear reason (proposal dropped)

---

## Example 4: Decision Event (Admin Action)

### Input

```json
{
  "id": "US-032",
  "actor_id": "actor-admin",
  "story": "As a 관리자, I want to 신고를 처리하다, So that 신고 내용을 검토하고 적절한 조치를 취할 수 있다",
  "acceptance_criteria": [
    "AC-1: 신고 상세에서 신고자 정보, 피신고자 정보, 신고 사유 상세 확인 가능",
    "AC-3: 처리 액션 선택 가능: 기각, 경고 부여, 일시 정지, 영구 정지",
    "AC-5: 처리 완료 시 신고자에게 처리 결과 알림 발송 (선택적)",
    "AC-6: 제재 조치 선택 시 US-023 제재 프로세스와 연동"
  ],
  "domain": "관리자 - 신고"
}
```

### Analysis

- **Actor Role:** operator (관리자)
- **Event Patterns Found:** "처리 액션", "기각", "경고", "정지"
- **Event Type:** decision_event (관리자 판단)
- **Notification Worthy:** ✅ YES (user awaits result)
- **Targets:** end_user (신고자, 피신고자 모두)

### Generated Outputs

```json
// For end_user (reporter)
{
  "event": "report_processed",
  "title": "AC-5: 처리 완료 시 신고자에게 처리 결과 알림 발송",
  "description": "AC-5: 처리 완료 시 신고자에게 처리 결과 알림 발송 for 관리자 - 신고",
  "channel": "email",
  "template": "{entityName} notification - AC-5: 처리 완료 시 신고자에게 처리 결과 알림 발송 [date, entityName, reason, result]"
}

// For operator (admin)
{
  "event": "report_processed",
  "title": "Report processed",
  "description": "Report has been reviewed and action taken",
  "channel": "email",
  "template": "..."
}
```

---

## Example 5: Skipped Story (Not Notification-Worthy)

### Input

```json
{
  "id": "US-006",
  "actor_id": "actor-reader",
  "story": "As a 독자, I want to 홈에서 추천/인기 작품을 확인하다, So that 관심 있는 작품을 쉽게 발견할 수 있다",
  "acceptance_criteria": [
    "AC-1: 메인 홈에 추천/인기 배너 영역 표시",
    "AC-2: 작품 리스트에 썸네일, 제목, 작가명, 현재 총 모금액 표시",
    "AC-3: 페이지 로드 시 3초 이내 작품 리스트 표시"
  ],
  "domain": "작품 탐색"
}
```

### Analysis

- **Actor Role:** end_user
- **Event Patterns:** None (no state change, no money, no decision)
- **Worthiness Check:** ❌ NO
  - ✗ Not a state change
  - ✗ Not financial
  - ✗ Not a decision
  - ✗ Pure exploration/UI display
  - ✗ User sees result immediately in UI

### Output

**Skipped** - No notification scenario generated

---

## Summary: Pattern Recognition

### ✅ Always Generates Notification

- Keywords: 차감, 환불, 증가, 금액, 정산, 출금, 충전 (financial)
- Keywords: 상태 변경, 상태 → DEAL, 상태 → DROP (state)
- Keywords: 승인, 거절, 승인됨, 거절됨 (decision)
- Keywords: 완료, 결과, 처리 (async result)

### ❌ Usually Skipped

- Keywords: 조회, 열람, 탐색, 확인하다 (read-only)
- No state/money/decision impact
- Result visible in UI immediately

### ⚠️ Context-Dependent

- 에러 메시지: Only if user action required
- 안내 메시지: Only if user unaware
- 기다리는 상황: Always notify