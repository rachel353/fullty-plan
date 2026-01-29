---
name: notification-generator
description: Generate notification_scenarios.json from user_stories_data.json. Use when designing notification strategy for projects. Triggers: "알림 시나리오", "notification scenarios", "알림 설계", "notification strategy"
---

# Notification Generator

Read `docs/user_stories_data.json` and generate `docs/notification_scenarios.json`.

## Step 1: Ask Channel Configuration

Before generating, ask user to select channels for each role:

```
각 역할별 기본 알림 채널을 선택해주세요:

**Available Channels:**
- email (이메일)
- sms (문자)
- push (푸시 알림)
- in_app (인앱 알림)
- kakaotalk (카카오톡)

**Roles:**
1. end_user (독자/고객/사용자): ___
2. provider (작가/판매자/제공자): ___
3. operator (관리자/운영자): ___
```

## Step 2: Read Input

Read `docs/user_stories_data.json` containing `actors[]` and `user_stories[]`.

## Step 3: Classify Actors

Map each actor to abstract role by permissions:

| Keywords in Permissions | Role |
|------------------------|------|
| 관리, 승인, 제재, admin, approve | `operator` |
| 업로드, 제공, 정산, upload, provide | `provider` |
| (default) | `end_user` |

## Step 4: Extract Notification Events

For each user story, check if notification-worthy:

**✅ Include if AC contains:**
- Financial: 차감, 환불, 정산, 출금, 충전, amount, payment
- State change: 상태 변경, 승인, 거절, approved, rejected
- Async result: 완료, 결과, 처리, completed

**❌ Skip if:**
- Pure read/view: 조회, 열람, 확인하다
- Immediate UI result

## Step 5: Generate Output

Write `docs/notification_scenarios.json`:

```json
{
  "version": "1.0",
  "channel_config": {
    "end_user": "<user-selected>",
    "provider": "<user-selected>",
    "operator": "<user-selected>"
  },
  "scenarios": {
    "end_user": [
      {
        "us_id": "US-001",
        "event": "entity_action",
        "trigger": "When <action happens>",
        "title": "알림 제목",
        "message": "알림 내용 with {variables}",
        "channel": "<role-channel>"
      }
    ],
    "provider": [...],
    "operator": [...]
  }
}
```

## Event Naming

Format: `<entity>_<action>`
- entity: domain에서 추출 (지갑 → wallet, 제안 → proposal)
- action: created, completed, approved, rejected, changed

## Channel Override Rules

Even if user selected different channel:
- `financial_event` → keep user's choice (important audit)
- `action_completed` → `optional` (already visible in UI)

## Template Variables

Include based on story content:
- `{entityName}` - always
- `{amount}` - if 금액/Ink/payment mentioned
- `{result}` - if 상태/승인/거절 mentioned
- `{reason}` - if 사유/이유 mentioned
- `{date}` - always

## References

- **[schema.json](references/schema.json)** - JSON Schema for output validation
- **[template.json](references/template.json)** - Example output with sample scenarios
