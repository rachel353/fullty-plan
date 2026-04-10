# Design Insight: Hierarchical Content Must Be Separated Into Distinct Pages to Support Parent-Child Operations

## Context

* Screen type: Content management dashboard (story/episode listing)
* User decision: Select and manage content at correct hierarchy level (story vs episode)

## Observation

* Stories (parent entities) and episodes (child entities) displayed in single list
* No visual distinction between hierarchy levels
* User must parse relationships mentally
* Actions on stories and episodes have different implications
* Selecting "story unit management" vs "episode review" requires scanning entire list

## Interpretation

When hierarchical content is mixed in a single list without clear separation, users cannot distinguish which entities are parents vs children or understand scope of operations. This creates decision ambiguity: Am I managing this story or this episode? What happens when I edit? Different operations apply to different levels, but the unified view makes this implicit rather than explicit. Users must spend cognitive effort maintaining context rather than executing tasks.

## Principle

Separate hierarchical entities into distinct pages where parent selection leads to child listing. Navigation path makes hierarchy explicit and ensures users always operate at intended scope level.

## Applicability

* Nested data management (product categories → products → variants)
* Organization structures (departments → teams → members)
* Content hierarchies (books → chapters → sections)
* Project management (projects → tasks → subtasks)
* Any parent-child entity relationship requiring scoped operations
