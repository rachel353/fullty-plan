# Output Schema Documentation

## notification_scenarios.json Structure

### Root Object

```typescript
{
  version: "1.0",                    // Schema version
  description: string,               // Generator description
  channels: string[],                // ["email", "sms"]
  scenarios: {
    end_user: NotificationScenario[],
    provider: NotificationScenario[],
    operator: NotificationScenario[]
  }
}
```

### NotificationScenario Object

```typescript
{
  event: string,           // entity_action format
  title: string,           // Concise human-readable title
  description: string,     // What happened and why
  channel: string,         // "email" | "sms" | "optional"
  template: string         // Message with {variables}
}
```

---

## Field Details

### `event` (string)

**Format:** `<entity>_<action>`

**Purpose:** Backend event identifier for triggering notifications

**Rules:**
- kebab-case (lowercase, underscores)
- entity from domain or story context
- action from acceptance criteria/story intent
- no version/timestamp suffix

**Examples:**
```
proposal_created
wallet_depleted
episode_published
withdrawal_approved
report_resolved
```

---

### `title` (string)

**Purpose:** Email subject line or notification header

**Rules:**
- 40-60 characters preferred
- Human-readable, not technical
- Avoids jargon unless essential
- Present tense or past tense depending on context

**Examples:**
```
✅ "Your proposal has been accepted"
❌ "proposal_accepted_event_trigger"

✅ "Withdrawal approved - $100"
❌ "withdrawal state transition result"
```

---

### `description` (string)

**Purpose:** Email body intro or notification body

**Rules:**
- 1-2 sentences
- Explains what happened, not why
- Can reference {variables} for dynamic content
- Tone: neutral/professional

**Examples:**
```
"Your proposal to Episode 5 has been accepted by the creator and payment is now pending settlement."

"Your withdrawal request for {amount} has been approved. Funds will arrive within 3-5 business days."
```

---

### `channel` (string)

**Values:**
- `"email"` - Always send email
- `"sms"` - Always send SMS
- `"optional"` - Send if user opted in; default email

**Logic by Event Type:**
```
Financial  → "email"    (audit trail required)
Decision   → "email"    (confirmation needed)
State      → "email"    (important milestone)
Action     → "optional" (user sees in UI already)
System     → "optional" (informational)
```

**Override if urgent keywords present:**
```
If "긴급", "urgent", "immediately" in story:
  Financial → "email"
  Decision  → "email"  (could upgrade to SMS if critical)
```

---

### `template` (string)

**Purpose:** Email template with variable placeholders

**Format:** Mustache-style `{variableName}`

**Standard Variables:**
```
{entityName}    - What was affected (proposal, episode, payment)
{date}          - When it happened (ISO 8601 or localized)
{amount}        - If financial event (with currency)
{result}        - Outcome (APPROVED, REJECTED, etc.)
{reason}        - Why (if rejection/failure)
{userName}      - Who did it / who is affected
{period}        - Duration (e.g., "30 days")
```

**Template Patterns:**

```html
<!-- Pattern 1: Simple Confirmation -->
{entityName} notification - {title} [{variables}]

<!-- Pattern 2: Decision Result -->
Your {entityName} has been {result}.
{reason}
Amount: {amount}

<!-- Pattern 3: Status Update -->
{entityName} status changed to {result}.
Effective: {date}
```

**Backend Integration:**
- Substitution happens at runtime with user data
- Missing variables should have fallbacks
- Support i18n for {date}, currency formats

---

## Complete Example

```json
{
  "event": "proposal_approved",
  "title": "Your proposal has been accepted!",
  "description": "Your proposal to Episode 5 has been accepted by the creator. The bounty amount will be added to the creator's settlement balance.",
  "channel": "email",
  "template": "Dear {userName},\n\nYour proposal for {entityName} has been {result}.\n\nAmount: {amount}\nCreator: {creatorName}\nEffective: {date}\n\nBest regards,\nPlatform Team"
}
```

---

## Scenarios Organization

### By Role

Each role has dedicated notification flows:

**end_user scenarios:**
- User actions they initiated (upload, propose, back)
- Results affecting their wallet/status
- Approvals they requested

**provider scenarios:**
- Content/resource actions (publish, finalize)
- User feedback (proposal, backing)
- Settlement updates

**operator scenarios:**
- Admin actions (suspend, delete, approve withdrawal)
- System alerts (abuse reports, payment failures)
- Compliance notifications

---

## Important Design Principles

### 1. Avoid Over-Notification

✅ Notify when:
- User must take action
- User awaits result
- Irreversible change occurred
- Assets affected

❌ Don't notify when:
- User sees result immediately in UI
- Pure informational, user can check themselves
- Duplicate of previous notification

### 2. Specificity Over Generality

✅ "Your proposal to 'Summer Adventure' Episode 3 was approved"
❌ "Something happened"

### 3. Channel Appropriateness

- Email: Important, user may be offline
- SMS: Urgent, time-sensitive
- In-app: Informational, non-urgent

### 4. Template Flexibility

- Variables should map to actual data fields
- Avoid hardcoding domain-specific jargon
- Support both Korean and English at runtime