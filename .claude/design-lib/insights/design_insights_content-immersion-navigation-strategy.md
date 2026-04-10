# Design Insights: Content Immersion Navigation Strategy

> Extracted from: Story/Episode 구조 재정의 피드백 (2026-01-15)

---

## Insight 1: Navigation density must match service type - exploration vs. immersion

### Context

* Screen type: Content consumption platform (webtoon/story)
* User decision: Consume content vs. navigate to other sections

### Observation

* Platform type: Content immersion-focused (not exploration/discovery-focused)
* Mobile bottom navigation bar: Removed
* Reader sidebar: Removed
* Creator studio: Sidebar retained (different context - management task)
* Access points: Reduced to minimal entry points

### Interpretation

Exploration-focused platforms (e.g., e-commerce, social media) benefit from persistent navigation as users frequently switch contexts. Immersion-focused platforms (e.g., reading, video) suffer from persistent navigation because it creates visual noise and exit temptation during content consumption. Users in immersive contexts have a single primary task (consume the content), and every navigation element is a potential distraction that competes with that task. By removing navigation chrome, the design signals that the content itself is the destination, not a waypoint to somewhere else.

### Principle

Match navigation density to service intent: immersion-focused experiences minimize persistent navigation to reduce exit friction, while exploration-focused experiences maximize navigation visibility for discovery.

### Applicability

* Reading apps (e-books, webtoons, articles)
* Video players (streaming, education)
* Gaming interfaces during gameplay
* Any single-task focused interface vs. multi-task dashboards

---

## Insight 2: Unified contribution lists enable fair value comparison

### Context

* Screen type: Episode detail page, contribution/participation section
* User decision: Understand who contributed and their relative value to the episode

### Observation

* Previous design: Proposals tab / Supports tab (separated by type)
* New design: Single unified list (Proposal + Backing + Sponsor combined)
* Sorting criterion: Contribution amount (Ink), descending
* No tab switching required for comparison

### Interpretation

When the primary comparison metric is the same across categories (total Ink contributed), separating items into tabs based on type forces users to mentally aggregate across views. This increases cognitive load for the core task: "Who contributed most to this episode?" Tab separation is useful when categories have fundamentally different comparison criteria. Here, all contribution types share the same value unit (Ink), making unified presentation more efficient for comparison tasks.

### Principle

When multiple item types share the same primary comparison metric, present them in a unified list sorted by that metric. Reserve tab/category separation for when items have different comparison dimensions.

### Applicability

* Leaderboards with multiple contribution types
* Combined transaction histories
* Mixed media galleries sorted by engagement
* Any ranking where different input types produce comparable output values

---

## Insight 3: Visual uniformity for neutral choice architecture

### Context

* Screen type: Ink purchase page (currency selection)
* User decision: Select a purchase amount (10, 20, 30, or 100 Ink)

### Observation

* Card layout: Simple, identical treatment for all options
* Visual hierarchy: All options have equal visual weight
* Removed elements: Bonus, discount, recommendation badges, event highlights
* No "popular" or "best value" indicators
* Copy direction: "참여를 위한 Ink 구매" (neutral, functional)

### Interpretation

Many purchase interfaces use visual asymmetry (larger cards, badges, color accents) to nudge users toward specific options. This works for conversion optimization but creates decision pressure and potential buyer's remorse. When the platform philosophy prioritizes user autonomy over conversion, uniform visual weight signals "all choices are equally valid." This removes anchoring bias and lets users decide purely on their actual need rather than visual persuasion. The neutral approach builds trust but requires that the business model doesn't depend on upselling.

### Principle

When user autonomy matters more than conversion optimization, apply equal visual weight to all options. Remove recommendation signals, size differences, and promotional badges to enable neutral, need-based decisions.

### Applicability

* Donation/tipping interfaces where amount should reflect genuine intent
* Ethical e-commerce with no margin differences between options
* Survey/polling UIs where all answers should be equally accessible
* Transparent pricing with no hidden incentives

---

## Summary

| Insight | Principle | Gate Validation |
|---------|-----------|-----------------|
| Navigation density | Immersion-focused = minimal nav | Decision: content consumption, Observable: nav removal, Generalizable: platform type pattern |
| Unified contribution list | Same metric = same list | Decision: value comparison, Observable: tab removal + single sort, Generalizable: mixed-type ranking |
| Visual uniformity for choice | Equal options = equal visual weight | Decision: purchase selection, Observable: removed badges/highlights, Generalizable: neutral choice architecture |
