# Design Insights: Comparison UI Patterns

Generated from: seed-docs/feedback-250109.md
Date: 2026-01-12

---

## Insight: Vertical list layout optimizes multi-option comparison tasks

### Context

* Screen type: Selection/purchase page (Ink charging, pricing plans)
* User decision: Compare multiple options across multiple attributes, select one

### Observation

* Original: Grid layout (2 columns)
* Requested: Vertical list layout (1 column)
* Comparison attributes: coin amount, bonus, discount rate, final price
* User behavior: Scroll vertically to compare options sequentially

### Interpretation

Grid layouts force users to compare options both horizontally and vertically, creating a non-linear scanning path. For multi-attribute comparisons (price, quantity, bonus), users must zigzag across the grid, increasing cognitive load. Vertical lists enable linear top-to-bottom scanning, allowing users to compare each option's full attribute set before moving to the next. This reduces eye movement distance and supports sequential decision-making patterns.

Feedback explicitly states: "여러 상품을 빠르게 비교하고 선택하는 것이 목적" (goal is to quickly compare and select from multiple products) and "위에서 아래로 자연스럽게 가격 비교 가능하도록" (enable natural top-to-bottom price comparison).

### Principle

For comparison tasks involving multiple attributes per option, use vertical list layouts instead of grids. Vertical lists support linear scanning and reduce eye movement cost for multi-attribute comparison.

### Applicability

Pricing plans, package selection, subscription tiers, product comparison pages, feature matrices, any selection interface where users compare 3+ attributes across 3+ options.

---

## Insight: Card height consistency signals uniform option set

### Context

* Screen type: Selection/purchase page, grid or list layout
* User decision: Compare options and select one

### Observation

* Requirement: "모든 카드는 **높이 동일**하게 유지" (all cards must maintain identical height)
* Same component type for all options
* Prevents visual misalignment in layout

### Interpretation

Inconsistent card heights prevent users from perceiving options as a comparable set. Visual misalignment creates scanning difficulty and makes comparison harder. Users expect uniform presentation for uniform choices. Height variation suggests cards are unrelated items rather than alternatives in the same category. Maintaining consistent height reinforces that all options are equal-tier alternatives, not hierarchically different content types.

Feedback states: "카드 간 간격은 너무 크지 않게 유지해 **밀도 있는 리스트 UX**" (maintain tight spacing for dense list UX), emphasizing that cards should be perceived as a unified, scannable set.

### Principle

Selection option cards must maintain consistent height regardless of content length. Use fixed height or uniform spacing to preserve visual alignment and signal that options belong to the same comparable set.

### Applicability

Pricing plans, product selection grids, tier comparisons, package options, subscription plans, feature add-ons, any multi-choice selection interface where options are peer alternatives.

---

## Insight: Visual format differentiation reinforces ranking hierarchy

### Context

* Screen type: Contribution/ranking display (Main Producers section)
* User decision: Understand contributor hierarchy at a glance

### Observation

* Top 3 contributors: Horizontal card format with larger profile images
* Remaining contributors: Vertical list format with smaller avatars
* Different visual formats for same data type (contributor profiles)
* Sorting: Total contribution amount (proposal + backing), descending

### Interpretation

When displaying ranked contributions, using the same visual format for all ranks fails to communicate hierarchy quickly. Users must read numbers to understand importance. By changing the visual format itself (cards vs list, large vs small images), the interface creates instant visual hierarchy. Top contributors receive symbolic emphasis through format, not just placement. This allows users to grasp the contribution distribution pattern before reading any numbers.

Feedback states: "*상위 기여자(Top 3)**는 상징적으로 강조" (Top 3 contributors are symbolically emphasized) and "그 외 기여자는 **공정하고 명확한 리스트 정렬**" (other contributors in fair, clear list sorting).

### Principle

For ranked displays, reinforce hierarchy through visual format changes, not just ordering. Use distinct presentation formats (cards vs lists, large vs small) to create instant recognition of top-tier vs standard-tier items.

### Applicability

Leaderboards, contributor rankings, top performers lists, featured vs standard items, priority-based displays, any interface showing ranked entities where top items deserve symbolic emphasis.

---

## Summary

These insights address:
1. **Layout choice for comparison tasks**: Vertical lists outperform grids for multi-attribute comparisons
2. **Visual consistency for option sets**: Uniform card heights signal comparable alternatives
3. **Format differentiation for rankings**: Visual format changes reinforce contribution hierarchy

All insights are grounded in observable design choices that directly impact user decision-making patterns.
