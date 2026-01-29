---
name: notification-generator
description: Generate comprehensive notification scenarios (email/SMS) from user story specifications. Use when: (1) designing notification strategy for new projects with user_stories_data.json, (2) translating user stories into backend event definitions and alert policies, (3) ensuring cross-actor notification coverage (end_user/provider/operator). Produces structured JSON with role-based notification templates, event types, and channel assignments. Works with any project structure that follows the standard user_stories_data.json format.
---

# Notification Generator

## Overview

Transform user story specifications into a comprehensive notification strategy. This skill analyzes user stories, acceptance criteria, and actor roles to automatically generate notification scenarios—identifying which events matter, who should be notified, and through which channels (email/SMS).

**Output:** `docs/notification_scenarios.json` with structured event definitions, title/description templates, and channel assignments for each actor role.

## How It Works

### 1. Input Requirements

Provide a **user_stories_data.json** file with structure:

```json
{
  "actors": [
    {
      "id": "actor-id",
      "name": "Actor Name",
      "permissions": ["permission1", "permission2"]
    }
  ],
  "user_stories": [
    {
      "id": "US-001",
      "actor_id": "actor-id",
      "story": "As a..., I want to..., So that...",
      "acceptance_criteria": ["AC-1: ...", "AC-2: ..."],
      "domain": "domain-name"
    }
  ]
}
```

### 2. Processing Pipeline (Automated)

**Step 1: Actor Role Normalization**
- Analyzes permissions to classify actors into abstract roles
- `end_user` - Uses service features
- `provider` - Creates/provides content
- `operator` - Manages/approves operations

**Step 2: Event Extraction**
- Scans acceptance criteria for event patterns
- Identifies state changes, financial transactions, approvals, completions

**Step 3: Notification Decision**
- Evaluates each event against notification criteria:
  - Affects user assets (money, status, permissions)
  - Irreversible state changes
  - Asynchronous results (user waiting)
  - Requires user awareness

**Step 4: Scenario Assembly**
- Generates notification object for each relevant event
- Assigns channels (email for financial/decisions, optional for completions)
- Creates role-specific groupings

### 3. Output Structure

```json
{
  "version": "1.0",
  "description": "...",
  "channels": ["email", "sms"],
  "scenarios": {
    "end_user": [
      {
        "event": "action_completed",
        "title": "Action Completed",
        "description": "Your {entityName} was completed",
        "channel": "email",
        "template": "..."
      }
    ],
    "provider": [...],
    "operator": [...]
  }
}
```

## Usage

### Basic Usage

```bash
python3 scripts/notification_generator.py \
  --input docs/user_stories_data.json \
  --output docs/notification_scenarios.json
```

### Output

- ✅ `notification_scenarios.json` with complete notification strategy
- Events organized by actor role
- Ready for backend event system integration

## Advanced Features

### Custom Rules

Edit `scripts/notification_generator.py` to adjust:
- Event worthiness criteria
- Channel assignment policies
- Template variable names

See [references/schema.md](references/schema.md) for detailed field documentation and [references/examples.md](references/examples.md) for pattern reference.

## Resources

### scripts/
- **notification_generator.py** - Main Python script implementing the complete extraction and generation pipeline

### references/
- **schema.md** - Output JSON schema and field descriptions
- **examples.md** - Real-world examples showing input → output transformations
- **api_reference.md** - Detailed actor role classification rules and event type taxonomy
