# Design Insights: Hierarchical Content Management

> Extracted from: feedback-250113.md (Episode/Proposal Management Layout)
> Date: 2026-01-13

---

## Insight: Hierarchical data requires hierarchical navigation entry points

### Context

* Screen type: Creator dashboard, content management
* User decision: Navigate to manage specific episodes or proposals

### Observation

* Data structure: Story (10-100+) → Episode (100+/story) → Proposal (100+/episode)
* Flat list rendering shows all episodes across all stories
* No visual grouping or hierarchy in the entry point
* Users must mentally filter by story context while scanning a flat list

### Interpretation

When data has inherent parent-child relationships, a flat list forces users to hold the parent context in memory while scanning children. This increases cognitive load and error rate. Users searching for "Episode 3 of Story X" must scan all episodes instead of first selecting Story X. The flat structure contradicts the mental model of hierarchical ownership.

### Principle

Content management interfaces should match navigation structure to data hierarchy. Parent-first navigation reduces cognitive load by constraining child item sets to their natural context.

### Applicability

* CMS dashboards with nested content (sites → pages → sections)
* E-commerce admin (stores → products → variants)
* Project management tools (projects → tasks → subtasks)
* File management systems (folders → files)

---

## Insight: Context-scoped rendering prevents cognitive overload in large datasets

### Context

* Screen type: Proposal management dashboard
* User decision: Review and process proposals for a specific episode

### Observation

* Proposal count: 100+ per episode
* Current: All proposals rendered regardless of parent episode
* Required: Single episode context with proposal list
* Cross-context rendering increases irrelevant information density

### Interpretation

Rendering items across multiple parent contexts forces users to perform mental filtering on every scan. When proposal count is 100+ per episode, showing proposals from multiple episodes creates an unmanageable list. Users cannot effectively compare or prioritize when items have different parent contexts. Context switching should be explicit, not implicit through scrolling.

### Principle

Never render child items across multiple parent contexts simultaneously. Explicit context selection (one parent at a time) enables focused decision-making and reduces comparison errors.

### Applicability

* Order management (customer orders → line items)
* Support ticket systems (tickets → comments)
* Version control UIs (branches → commits)
* Multi-tenant dashboards

---

## Insight: Large dataset management requires contained scroll zones

### Context

* Screen type: List-based management interface
* User decision: Navigate within a list without losing page context

### Observation

* Story count: 10-100+, Episode count: 100+, Proposal count: 100+
* Page scroll and list scroll combined creates position confusion
* Users lose header/navigation context during deep scrolling
* Requirement: "리스트 스크롤과 페이지 전체 스크롤은 분리"

### Interpretation

When list length exceeds viewport height significantly, combined page scrolling hides persistent UI elements (headers, filters, stats). Users lose orientation and must scroll back to access controls. Separating list scroll into a contained zone keeps navigation and status visible, maintaining user orientation during data exploration.

### Principle

Separate list scroll from page scroll when list content can significantly exceed viewport. Contain scrollable areas to preserve access to persistent UI elements.

### Applicability

* Admin dashboards with data tables
* Email/messaging clients
* Inventory management systems
* Any interface with filterable long lists
