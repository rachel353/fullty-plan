---
name: ux-insight-matcher
description: Match and extract relevant UX insights from .claude/design-lib/youtube/insights for UI Tasks. Called as a sub-skill during frontend-feature-develop Step 2 (UI/UX Plan). Analyzes task description and acceptanceCriteria to find applicable design insights, then provides a merged summary for development guidance.
---

# UX Insight Matcher

Match UX design insights to UI Tasks and provide actionable guidance for frontend development.

## When to Use

This skill is automatically invoked by `frontend-feature-develop` during **Step 2 (UI/UX Plan)** when:
- Task `type` is `ui`
- Task has `description` and `acceptanceCriteria`

## Workflow

### 1. Load Existing Design Rules (Priority 1)

**CRITICAL**: These rules take precedence over any insight recommendations.

```
aging-lab/app/globals.css          # Main design tokens
.claude/rules/design_system_rules.mdc  # If exists
```

Extract and note:
- Color variables (--primary, --secondary, --muted, etc.)
- Font families (--font-sans, --font-serif, --font-mono)
- Spacing (--spacing, --radius)
- Shadow styles

### 2. Analyze Task Context

From the Task, extract keywords from:
- `description`
- `acceptanceCriteria[]`

Example - TASK-006:
```json
{
  "description": "챗봇 형태의 진단 플로우 컨테이너",
  "acceptanceCriteria": ["ChatContainer", "ChatBubble", "StepIndicator"]
}
```

Keywords: `챗봇`, `채팅`, `Chat`, `대화`, `플로우`, `컨테이너`

### 3. Match Insights

Read all JSON files from `.claude/design-lib/youtube/insights/`:

```
.claude/design-lib/youtube/insights/ux_insights_*.json
```

For each insight, check `usage_context.applicable_when`:
- `domain`: Does task domain match?
- `primary_content`: Does content type match?
- `user_decision_model`: Does interaction model match?
- `page_goal`: Does page purpose match?
- `ui_focus`: Does UI focus match?

**Semantic Matching Examples**:
| Task Keyword | Matches usage_context |
|--------------|----------------------|
| 챗봇, Chat, 대화 | `conversational_ui`, `chat_messages`, `ai_chat_interface` |
| 검색, Search | `search_interface`, `information_scanning` |
| 입력, Input, Form | `user_input`, `form_completion`, `task_execution` |
| 카드, Card, 목록 | `cards`, `information_display` |
| 버튼, Button, CTA | `cta`, `task_execution` |
| 업로드, Upload | `file_upload`, `task_execution` |
| 결과, Result | `information_display`, `content_consumption` |

Also check `not_applicable_when` to exclude irrelevant insights.

### 4. Merge Matched Insights

When multiple insights match:

1. **Collect all** `features[].design_rules` and `features[].ui_implications`
2. **Collect all** `non_goals`
3. **Resolve conflicts**:
   - If insight conflicts with `globals.css` → Use `globals.css`
   - If insights conflict with each other → List all options for developer choice
4. **Prioritize by specificity**: More specific domain matches rank higher

### 5. Generate Summary

Output a structured summary for the UI/UX Plan:

```markdown
## UX Insight Summary

### Matched Insights
- [insight_name_1] (match reason)
- [insight_name_2] (match reason)

### Design Rules to Apply
#### From: [insight_name]
- Rule 1
- Rule 2

### UI Implications
- Specific value 1 (e.g., font-size: 16px minimum)
- Specific value 2

### Non-Goals (Don't Do)
- Don't do X
- Avoid Y

### Conflicts with Existing Design System
- [If any] Insight suggests X, but globals.css defines Y → Use Y

### Developer Notes
- Additional context or choices needed
```

## Output Location

The summary is embedded in `docs/features/FXX_기능명_ui_ux.md` as a new section:

```markdown
# FXX: 기능명 - UI/UX

## 0. UX Insight Summary
[Generated content here]

## 1. User Flow
...
```

## Example

### Input: TASK-006
```json
{
  "id": "TASK-006",
  "title": "DiagnosisPage 컨테이너 구현",
  "type": "ui",
  "description": "챗봇 형태의 진단 플로우 컨테이너",
  "acceptanceCriteria": [
    "ChatContainer 컴포넌트",
    "ChatBubble 컴포넌트 (Bot/User)",
    "StepIndicator 컴포넌트",
    "Step 라우팅 로직"
  ]
}
```

### Matched Insights
- `typography_and_flow` (domain: `conversational_ui`, content: `chat_messages`)

### Output Summary
```markdown
## 0. UX Insight Summary

### Matched Insights
- typography_and_flow (챗봇/대화형 UI 매칭)

### Design Rules to Apply
#### From: typography_and_flow
- 가운데 정렬 금지 - 질문은 우측, 답변은 좌측 정렬
- 입력 필드 명확한 경계와 충분한 크기
- 상태별 UI 변화 필수 (입력 전/중/완료)

### UI Implications
- 폰트 사이즈: 최소 14px, 본문 16px 권장
- 입력 필드 배경: white, 충분한 패딩
- 메시지 정렬: User → 우측, Bot → 좌측

### Non-Goals
- 가운데 정렬로 대화 메시지 배치
- 폰트 사이즈 13px 이하 사용
- 장식용 색상 베리에이션

### Conflicts with Existing Design System
- None (기존 디자인 시스템과 호환)

### Developer Notes
- ChatBubble 구현 시 발신자별 정렬 주의
- 키보드 표시 상태 고려 필요
```

## Integration with frontend-feature-develop

In `2_ui_ux_plan.md`, add this step before defining User Flow:

```markdown
## 수행 작업

0. **UX Insight 매칭**: `/ux-insight-matcher` 호출하여 관련 인사이트 추출
1. **핵심 Flow 선정**: 명세에서 1~3개 핵심 흐름 추출
...
```

## Files Reference

```
.claude/design-lib/youtube/insights/           # UX insight JSON files
aging-lab/app/globals.css      # Design tokens (PRIORITY 1)
.claude/rules/design_system_rules.mdc  # Design rules (if exists)
```
