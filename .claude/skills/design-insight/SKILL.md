---
name: design-insight
description: Extract reusable design insights from UI/UX feedback by analyzing how specific design choices cause user decision failures or hesitation. Use when (1) change-analyzer detects design-related feedback and automatically invokes this skill in parallel, or (2) user discusses UI/UX/layout/spacing/typography/visual hierarchy issues. Processes both problem-diagnostic feedback ("X causes user confusion") and requirement-based feedback ("do Y") to infer underlying design principles. Outputs structured insights to .claude/design-lib/insights/.
---

# Design Insight Extractor

Extract reusable design principles from design feedback by analyzing how specific design choices impact user decision-making.

## Core Rule

Only extract insights that explain:

> **How a specific design choice causes user decision failure or hesitation.**

An insight is **not an opinion**. It is an explanation of **why a user's decision becomes unclear or costly due to observable design signals**.

## When to Extract

Extract insights from feedback related to:
- UI/UX design problems or requirements
- Layout, spacing, alignment, density
- Typography, visual hierarchy
- Color, contrast, visual signals
- Interactive states, affordances
- Responsive design patterns

## Insight Validation Gates

An insight is valid **only if ALL three gates pass**:

1. **Decision gate**: Directly linked to a specific user decision on the screen
2. **Observable gate**: Based on measurable design facts (spacing, size, contrast, alignment, density, weight)
3. **Generalization gate**: Can be rewritten as a reusable design principle applicable beyond the specific case

If any gate fails, **do not write the insight**.

## Extraction Process

For each potential insight:

1. **Identify the user decision**: What is the user trying to do on this screen?
2. **Find the interfering signal**: Which visual element or pattern makes this decision difficult?
3. **Verify it's a signal problem**: Is this about visual design, not missing information or functionality?
4. **Generalize to a principle**: Can this be expressed as a one-sentence reusable rule?

Extract **maximum 3 insights** per feedback.

## Output Format

Create a file at:

```
.claude/design-lib/insights/design_insights_{descriptive-name}.md
```

Use this structure for each insight:

```markdown
## Insight: {one-line summary}

### Context

* Screen type: {e.g., selection page, form, dashboard}
* User decision: {what the user is trying to decide or do}

### Observation

{Observable design facts only - measurements, comparisons, visual relationships}

### Interpretation

{How the observed design causes decision failure, hesitation, or cognitive cost}

### Principle

{A reusable design principle - generalized, one sentence}

### Applicability

{Other screens or scenarios where this principle applies}
```

## Examples

### Example 1: Responsive Navigation Positioning

**Feedback:**
> 모바일 화면일 때는 하단네비게이션바가 나와야하는데, 데스크탑 화면일 때는 하단네비게이션바가 사라지고, 왼쪽에 메뉴사이드바가 들어가야해.

**Extracted Insight:**

```markdown
## Insight: Navigation position must match input modality and screen size

### Context

* Screen type: Responsive layout, primary navigation
* User decision: Navigate to different pages/sections

### Observation

* Mobile: Bottom navigation bar
* Desktop: Left sidebar navigation
* Different input modalities: touch (mobile) vs mouse (desktop)

### Interpretation

Mobile users rely on thumb reach zones (bottom of screen is optimal). Desktop users use mouse with left-to-right reading flow, making left sidebar natural. Forcing desktop users to reach for bottom navigation or mobile users to stretch to top navigation increases interaction cost and breaks expected patterns.

### Principle

Position primary navigation based on input modality: touch-based interfaces optimize for thumb zones, pointer-based interfaces optimize for scanning flow and sidebar access.

### Applicability

All responsive layouts with primary navigation, multi-platform apps, progressive web apps.
```

### Example 2: Typographic Weight Hierarchy

**Feedback:**
> 텍스트 크기와 무관하게 font-weight가 거의 동일하게 사용되고 있어, 텍스트 위계가 시각적으로 충분히 드러나지 않는 문제가 있습니다. 페이지 제목, 섹션 헤더, 테이블 헤더는 본문 텍스트보다 명확히 더 무거운 font-weight를 가져야 합니다.

**Extracted Insight:**

```markdown
## Insight: Typographic hierarchy requires both size and weight differentiation

### Context

* Screen type: Information-dense screens (creator studio, admin panels)
* User decision: Scan page structure, locate specific sections quickly

### Observation

* Titles, headers, and body text use similar font-weight
* Only font-size differs between hierarchy levels
* High information density requires rapid scanning

### Interpretation

Size alone provides insufficient visual contrast for information hierarchy. Users must read text to understand structure instead of scanning visually. This increases cognitive load and slows information retrieval. Headers that look similar to body text fail to establish clear entry points for scanning.

### Principle

Express information hierarchy through combined font-size and font-weight changes, not size alone. Higher-level headings must be visually heavier to enable scanning without reading.

### Applicability

All information-dense interfaces: dashboards, tables, forms, settings, documentation, admin panels.
```

### Example 3: Card Height Consistency in Option Grids

**Feedback:**
> ink 충전 페이지에서, 각 선택지 카드들의 높이가 콘텐츠 길이에 따라 달라져 그리드 상에서 시각적 정렬이 깨지고 있습니다. 동일한 컴포넌트인 만큼 카드 전체 높이를 고정하거나 모든 카드가 동일한 높이를 가지도록 맞춰야 합니다.

**Extracted Insight:**

```markdown
## Insight: Selection option cards must maintain consistent height for comparison

### Context

* Screen type: Selection/purchase page (Ink charging), grid layout
* User decision: Compare multiple options, select one

### Observation

* Same component used for all cards
* Card heights vary based on content length
* Grid alignment breaks visually
* Cards don't appear as a unified option set

### Interpretation

Inconsistent card heights prevent users from perceiving options as a comparable set. Visual misalignment creates scanning difficulty and makes comparison harder. Users expect uniform presentation for uniform choices. Height variation suggests cards are unrelated items rather than alternatives in the same category.

### Principle

Selection option cards must maintain consistent height regardless of content length. Use fixed height or uniform spacing to preserve grid alignment and support comparison tasks.

### Applicability

Pricing plans, product selection grids, tier comparisons, package options, any multi-choice selection interface.
```

## Forbidden

Do not write insights that include:

- **Subjective language**: "good", "bad", "ugly", "messy", "clean", "beautiful"
- **Solutions without problems**: Describing what to do without explaining the user decision impact
- **Non-decision-linked observations**: Design facts not connected to specific user tasks
- **Screen-specific trivia**: One-off details that don't generalize to principles
- **Personal preferences**: Opinions not grounded in observable design-decision relationships

## Integration

### With change-analyzer

When change-analyzer detects design-related feedback (UI/UX/layout/typography), it automatically invokes design-insight in parallel to extract reusable principles while analyzing changes.

### Standalone usage

Users can explicitly trigger this skill when discussing design feedback or reviewing design decisions.
