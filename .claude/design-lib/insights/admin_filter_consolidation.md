# Design Insight: Filter Controls Must Be Consolidated When Multiple Filters Exist

## Context

* Screen type: Admin management pages (users, content, payments, reports)
* User decision: Apply multiple filter conditions to narrow list results

## Observation

* Multiple filters (≥2) displayed horizontally at top of page
* Each filter has different UI form (inconsistent patterns)
* Filters occupy significant vertical space
* No clear visual hierarchy or relationship between filters
* Users must parse unrelated UI patterns in sequence

## Interpretation

When multiple filter controls are scattered horizontally across the top of a page, they create cognitive load through inconsistency and visual noise. Users must understand different UI patterns for each filter rather than a unified filter interface. The scattered layout makes it unclear whether filters are independent or related, and increases the perceived complexity of the page. This delays decision-making and increases the chance of filter application errors.

## Principle

Consolidate multiple filter controls (≥2) into a single dropdown component with unified interaction pattern. This reduces visual clutter, establishes clear filter grouping, and provides consistent mental model across pages.

## Applicability

* Information-dense admin dashboards and management pages
* Table-based list views with multiple sorting/filtering needs
* Any workflow where users apply multiple conditions to query results
* Systems with multi-page filter patterns that need consistency
