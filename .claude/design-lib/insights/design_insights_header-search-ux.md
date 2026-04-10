# Design Insights: Header & Search UX

> Extracted from: 상단바(Header) & 상단 검색(Search) 통합 UI/UX 요구사항
> Date: 2026-01-09

---

## Insight: Responsive search transforms from input to icon on mobile

### Context

* Screen type: Global header, responsive navigation
* User decision: Access and use search functionality

### Observation

* Desktop (>= 1024px): Full search input field visible in center area
* Tablet (768px - 1023px): Reduced-width input, still visible
* Mobile (<= 767px): Search input replaced by search icon
* Icon click triggers slide-down or modal search UI
* Mobile content area preserved by not showing persistent input

### Interpretation

Mobile screen real estate is limited. A persistent search input consumes horizontal space needed for branding (logo) and actions (login/profile). Users don't search constantly; most visits are content consumption. Hiding the input behind an icon reduces visual noise and allows the header to prioritize navigation and identity while still providing one-tap access to search.

### Principle

On constrained viewports, transform persistent text inputs into icon triggers that expand on demand. Reserve persistent UI for the most frequent actions; provide accessible triggers for less frequent ones.

### Applicability

* Mobile headers with search functionality
* Any responsive form with filter/search inputs
* Sidebar collapse patterns (e.g., hamburger menus)
* Tool palettes that collapse to icons on narrow screens

---

## Insight: Separate exploratory preview from committed navigation

### Context

* Screen type: Global search, results navigation
* User decision: Browse quickly vs. commit to viewing full results

### Observation

* Typing 1+ characters: Real-time popup with 5-10 preview results
* Enter key: Navigation to /search?q=xxx results page
* Preview shows thumbnail, title, author, view count inline
* Results page shows full grid/list without inline search input
* Clear interaction modes: typing = exploring, Enter = committing

### Interpretation

Users have two mental modes during search: exploratory (quick scan to see if relevant results exist) and committed (ready to browse all matches). Mixing these modes creates confusion about what happens next. A lightweight preview popup satisfies the exploratory need without page navigation cost. Requiring explicit Enter signals user readiness to invest attention in full results.

### Principle

Separate exploratory interactions (preview, hover, typing) from commitment actions (Enter, click, submit). Exploratory feedback should be inline and reversible; commitment should trigger navigation or state change.

### Applicability

* Autocomplete search patterns
* Typeahead suggestions
* Filter preview vs. apply filter
* Draft save vs. publish
* Hover preview vs. click to open

---

## Insight: Single global entry point for repeated functionality

### Context

* Screen type: Search results page (/search)
* User decision: Where to perform re-search

### Observation

* /search page has NO inline search input
* Re-search is only available via global header search bar
* Header is present on all pages with consistent structure
* Eliminates duplicate search inputs on the same screen

### Interpretation

When functionality exists in the global header, duplicating it within a page creates ambiguity: "Which search box should I use?" Users may waste time trying both or feel uncertain which is correct. A single, consistent entry point builds muscle memory and reduces decision cost. The global header becomes the predictable location for search across the entire application.

### Principle

Consolidate repeated functionality to a single global entry point. Avoid duplicating header-level actions within page content when the header is persistently visible.

### Applicability

* Search bars (global header vs. page-level)
* User profile/account access
* Notification centers
* Navigation breadcrumbs vs. sidebar
* Any action available in persistent chrome

---
