# DESIGN.md Template

## Output Structure

```markdown
# Design Guide - [Client Name]

## Design Requirements

- **Accent colors discouraged** – do not use accent colors unless functionally required; convey hierarchy via layout, spacing, and typography
- **Images → gray boxes** - use `bg-muted` placeholder divs
- **Minimal & reactive** - focus on layout, hierarchy, spacing
- **Follow globals.css** - use existing color tokens (foreground, background, muted, border)
- **Component by component** - implement incrementally
- **No decorative elements** - keep styling clean and restrained

## Typography Hierarchy

### Principle

**Typography hierarchy requires both size AND weight differentiation.** Size alone is insufficient for information-dense interfaces.

### Weight System

| Level | font-weight | Use Case | Examples |
|------|-------------|----------|---------|
| Page Title | font-bold (700) | Main page heading | Dashboard title |
| Section Header | font-semibold (600) | Section division | Card titles |
| Table Header | font-medium (500) | Labels | Table headers |
| Body Text | font-normal (400) | Default | Paragraphs |

### Design Intent

- Rapid visual scanning
- Clear information hierarchy
- Reduced cognitive load

## Design Notes

- Keep styling clean and restrained
- Avoid decorative elements
- Optimize for later image/content replacement
```

## Customization Guidelines

### Platform-Specific Adjustments

**Web Application:**
- Responsive breakpoints
- Desktop-first approach (unless mobile-first specified)
- Hover states for interactive elements

**Mobile Web/Webview:**
- Touch-friendly targets (min 44px)
- Mobile-first approach
- Swipe gestures consideration

### IA-Based Component Patterns

Based on `ia_structure.md`, identify:
- Recurring screen patterns (list views, detail views, forms)
- Navigation patterns (tabs, sidebar, bottom nav)
- Component reuse opportunities

### UI/UX Requirements Integration

From `project-requirements.md`, incorporate:
- Accessibility requirements (REQ-13x)
- Brand guidelines (if specified)
- Performance constraints (loading states, skeleton screens)
