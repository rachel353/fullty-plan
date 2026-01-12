## Design Requirements

- **Monochrome only** - no accent colors
- **Images → gray boxes** - use `bg-muted` placeholder divs
- **Minimal & reactive** - focus on layout, hierarchy, spacing
- **Follow globals.css** - use existing color tokens (foreground, background, muted, border)
- **Component by component** - implement incrementally
- **No decorative elements** - keep styling clean and restrained

## Alignment & Layout Standards

- **One primary column** - Use a single alignment axis per screen (usually a shared left edge). Titles, body text, cards, and primary actions should all snap to the same column—avoid ad‑hoc nudges (`ml-*`, `pl-*`) that break the line-up.
- **Consistent container & gutters** - Keep one container strategy across pages: `mx-auto` + one `max-w-*`, with fixed responsive side padding (e.g., `px-4 sm:px-6`). Don’t let the “content edge” drift between screens.
- **Spacing system (vertical rhythm)** - Use a small, repeatable spacing scale (Tailwind scale only). Prefer `gap-*` / `space-y-*` and layout primitives over one-off margins. If you need many exceptions, the layout is wrong.
- **Typography alignment & measure** - Default to `text-left`. Use `text-center` only for short, deliberate hero copy; never for multi-line paragraphs or dense lists. Keep line lengths readable and consistent within a section.
- **Structured layouts for repeated content** - Lists and galleries should use `grid` + `gap-*`. Keep card padding, header placement, and metadata alignment consistent so items “scan” cleanly. Responsive changes should primarily adjust column count, not redesign spacing.
- **Row alignment (baseline-aware)** - Within a row, align elements intentionally: use `items-center` for single-line rows, and `items-start` when text wraps. Avoid mixing icon sizes and text styles without compensating alignment.

## Design Notes 

- Keep styling clean and restrained
- Avoid decorative elements.
- Optimize for later image/content replacement
