# Design Insights: Typography Hierarchy

> Extracted from feedback on Creator Studio and Admin screens
> Date: 2026-01-08

## Insight: Typographic hierarchy requires both size and weight differentiation

### Context

* Screen type: Information-dense screens (creator studio, admin panels, dashboards)
* User decision: Scan page structure, locate specific sections quickly, understand information hierarchy

### Observation

* Page titles, section headers, table headers, and body text use similar font-weight
* Only font-size differs between hierarchy levels
* Titles and body text appear as "one block" visually
* High information density requires rapid scanning
* Users cannot immediately distinguish "where titles are" upon page entry

### Interpretation

Size alone provides insufficient visual contrast for information hierarchy. When font-weight remains uniform across heading levels, users must read text content to understand structure instead of scanning visually. This increases cognitive load and slows information retrieval. Headers that look similar to body text fail to establish clear entry points for scanning. The lack of weight differentiation forces users to process text semantically rather than structurally, creating unnecessary decision cost when navigating information-dense interfaces.

### Principle

Express information hierarchy through combined font-size and font-weight changes, not size alone. Higher-level headings must be visually heavier to enable scanning without reading.

### Applicability

* All information-dense interfaces: dashboards, tables, forms, settings pages
* Admin panels and creator tools with multiple sections
* Documentation and content-heavy pages
* Any interface where users need to quickly locate sections
* Multi-level navigation structures
* Data tables with headers and subheaders

---

## Insight: Weight differentiation is critical for rapid structure recognition

### Context

* Screen type: Multi-section pages with headers, subheaders, and body content
* User decision: Determine page structure on entry, identify section boundaries

### Observation

* Uniform font-weight across all text elements
* Section boundaries not immediately visible
* Users must read to understand "where titles are"
* Title and body text blend into "one block"

### Interpretation

When entering a page, users perform an initial scan to build a mental model of the page structure before engaging with content. Uniform font-weight eliminates the primary visual signal (weight contrast) that enables this rapid structure recognition. Users are forced to engage with text content to discover structure, converting a fast visual task into a slow semantic task. This breaks the natural information-seeking pattern: scan structure → identify relevant section → read content.

### Principle

Use font-weight as the primary signal for structural boundaries. Pages should reveal their structure through weight contrast before users begin reading.

### Applicability

* Landing pages after navigation
* Settings and configuration screens
* Multi-step forms with section headers
* Documentation with hierarchical content
* Email or message composition interfaces
* Any screen where users need to understand layout before interaction
