# UX Insight JSON Schema

## Complete Structure

```json
{
  "document_identity": {
    "document_id": "string (snake_case, unique identifier)",
    "document_type": "ui_ux_design_insight",
    "source": {
      "video_title": "string",
      "url": "string (optional)",
      "channel": "string (optional)"
    }
  },
  "usage_context": {
    "applicable_when": {
      "domain": ["array of domain types"],
      "primary_content": ["array of content types"],
      "user_decision_model": ["array of decision patterns"],
      "page_goal": ["array of page objectives"],
      "ui_focus": ["array of UI focus areas"]
    },
    "not_applicable_when": {
      "domain": ["array of excluded domains"],
      "primary_content": ["array of excluded content types"],
      "user_decision_model": ["array of excluded patterns"],
      "page_goal": ["array of excluded objectives"]
    },
    "interpretation": "string (guidance for AI agents)"
  },
  "domain": {
    "id": "string (snake_case)",
    "name": "string (human readable)",
    "description": "string",
    "characteristics": ["array of domain traits"]
  },
  "user": {
    "primary": {
      "role": "string",
      "skill_level": "string (beginner|intermediate|expert|intermediate_to_expert)"
    },
    "goals": ["array of user objectives"],
    "behavior_flow": ["array of sequential user actions"]
  },
  "product": {
    "type": "string",
    "examples": ["array of product examples"],
    "evaluation_logic": {
      "primary": "string",
      "secondary": "string",
      "tertiary": "string (optional)"
    }
  },
  "features": [
    {
      "id": "string (snake_case)",
      "name": "string (human readable)",
      "purpose": "string",
      "priority": "string (highest|high|medium|low) (optional)",
      "pattern": "string (optional)",
      "design_rules": ["array of implementation guidelines"],
      "ux_intent": "string",
      "ui_implications": ["array of UI considerations (optional)"]
    }
  ],
  "layout_strategy": {
    "name": "string",
    "explicit_grid_system": "boolean",
    "perceived_grid": "boolean",
    "notes": "string (optional)"
  },
  "interaction_hierarchy": {
    "strong": ["array of primary interactions"],
    "medium": ["array of secondary interactions"],
    "weak": ["array of tertiary interactions"]
  },
  "information_density": {
    "rule": "string",
    "notes": "string (optional)"
  },
  "non_goals": ["array of things explicitly NOT to do"],
  "design_philosophy": {
    "keywords": ["array of design principles"],
    "summary": "string (optional)"
  },
  "implementation_guardrails": {
    "apply_when": ["array of conditions"],
    "do_not_apply_when": ["array of exclusion conditions"]
  }
}
```

## Field Definitions

### document_identity
| Field | Required | Description |
|-------|----------|-------------|
| document_id | Yes | Unique snake_case identifier derived from video topic |
| document_type | Yes | Always `ui_ux_design_insight` |
| source.video_title | Yes | Original video title |
| source.url | No | YouTube URL if available |
| source.channel | No | Channel name if mentioned |

### usage_context
Defines when this insight document should be applied.

| Field | Description |
|-------|-------------|
| applicable_when.domain | Design domains where insights apply (e.g., `design_asset_gallery`, `e_commerce`) |
| applicable_when.primary_content | Content types (e.g., `image`, `text`, `video`, `data`) |
| applicable_when.user_decision_model | How users make decisions (e.g., `visual_first`, `task_execution`) |
| applicable_when.page_goal | Page objectives (e.g., `discovery`, `checkout`, `monitoring`) |
| applicable_when.ui_focus | UI emphasis areas (e.g., `thumbnail_dominance`, `form_completion`) |
| not_applicable_when | Contexts where insights should NOT be used |
| interpretation | Plain language guidance for AI agents |

### domain
| Field | Required | Description |
|-------|----------|-------------|
| id | Yes | snake_case domain identifier |
| name | Yes | Human-readable domain name |
| description | Yes | What this domain is about |
| characteristics | Yes | Array of domain traits (e.g., `image_first`, `data_driven`) |

### user
| Field | Required | Description |
|-------|----------|-------------|
| primary.role | Yes | Target user role (e.g., `Designer`, `Developer`, `Manager`) |
| primary.skill_level | Yes | Expected expertise level |
| goals | Yes | Array of what users want to achieve |
| behavior_flow | Yes | Sequential array of typical user actions |

### product
| Field | Required | Description |
|-------|----------|-------------|
| type | Yes | Product category |
| examples | No | Specific product examples |
| evaluation_logic | Yes | How users evaluate (primary > secondary > tertiary) |

### features
Array of feature entities. Each feature represents a distinct UI/UX insight.

| Field | Required | Description |
|-------|----------|-------------|
| id | Yes | snake_case feature identifier |
| name | Yes | Human-readable feature name |
| purpose | Yes | What problem this feature solves |
| priority | No | Importance level |
| pattern | No | Design pattern name if applicable |
| design_rules | Yes | Array of specific implementation guidelines |
| ux_intent | Yes | User experience rationale |
| ui_implications | No | Array of UI-specific considerations |

### layout_strategy
| Field | Required | Description |
|-------|----------|-------------|
| name | Yes | Layout approach name |
| explicit_grid_system | Yes | Whether explicit grid is used |
| perceived_grid | Yes | Whether visual grid alignment exists |
| notes | No | Additional layout considerations |

### interaction_hierarchy
| Field | Description |
|-------|-------------|
| strong | Primary CTA and important interactions |
| medium | Secondary actions |
| weak | Tertiary links and minor interactions |

### information_density
| Field | Required | Description |
|-------|----------|-------------|
| rule | Yes | Core density principle |
| notes | No | Additional guidance |

### non_goals
Array of things explicitly NOT to implement. Helps prevent scope creep and misapplication.

### design_philosophy
| Field | Required | Description |
|-------|----------|-------------|
| keywords | Yes | Core design principles |
| summary | No | One-line summary of design approach |

### implementation_guardrails
| Field | Description |
|-------|-------------|
| apply_when | Conditions when these insights should be applied |
| do_not_apply_when | Conditions when insights should be discarded |

## Example Values

### Domain Examples
- `design_asset_gallery`
- `e_commerce_product_listing`
- `saas_dashboard`
- `content_blog`
- `social_media_feed`
- `admin_panel`

### Characteristic Examples
- `image_first`
- `text_heavy`
- `data_driven`
- `task_oriented`
- `exploration_driven`
- `decision_by_visual`
- `low_text_dependency`

### User Decision Model Examples
- `visual_first`
- `scan_then_click`
- `task_execution`
- `data_analysis`
- `comparison_shopping`
- `browse_and_discover`

### Page Goal Examples
- `discovery`
- `asset_download`
- `purchase_completion`
- `workflow_completion`
- `monitoring`
- `content_consumption`
