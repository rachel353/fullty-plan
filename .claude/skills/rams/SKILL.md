---
name: rams
description: Run accessibility and visual design review
---

# Accessibility and Visual Design Review (RAMS)

Run comprehensive accessibility and visual design reviews of UI components, pages, and applications to identify issues and provide improvement recommendations.

## When to Use This Skill

Use this skill when you want to:
- **Review accessibility (A11y)** - Check WCAG compliance, aria labels, keyboard navigation, color contrast
- **Review visual design** - Analyze visual hierarchy, spacing, typography, color usage, consistency
- **Identify design issues** - Find problems with layout, responsiveness, component patterns
- **Improve design quality** - Get structured feedback on design decisions
- **Verify component compliance** - Ensure components meet design system standards
- **Test across devices** - Check responsiveness at multiple breakpoints
- **Audit design system** - Verify consistent use of design tokens

## What This Skill Reviews

### Accessibility (A11y)

**WCAG Compliance**
- Color contrast ratios (AA and AAA standards)
- Alt text for images
- ARIA labels and descriptions
- Semantic HTML usage
- Form labels and instructions
- Error messages and validation

**Keyboard Navigation**
- Tab order and focus management
- Focus visible indicators
- Keyboard shortcuts
- Trap prevention

**Screen Reader Support**
- Proper heading hierarchy
- List structure
- Table headers
- Dynamic content announcements

### Visual Design

**Visual Hierarchy**
- Size relationships
- Weight hierarchy
- Color prominence
- Spacing relationships
- Element positioning

**Typography**
- Font size scale consistency
- Font weight hierarchy
- Line height appropriateness
- Letter spacing
- Line length readability

**Color & Contrast**
- Color palette consistency
- Contrast ratios
- Color meaning (no color-only information)
- Gradient readability

**Spacing & Layout**
- Margin and padding consistency
- Alignment and grid usage
- Whitespace usage
- Responsive behavior
- Component spacing

**Component Design**
- Button styles and states
- Form input styling
- Card designs
- Modal layouts
- Navigation patterns

## How to Use This Skill

### Step 1: Take a Screenshot

Take a screenshot of the component or page you want to review:
```bash
# Using browser tools
```

### Step 2: Invoke the Skill

```bash
/rams
```

### Step 3: Provide Context

Claude will ask for:
- **URL or component description** (required)
- **What to focus on** (optional): accessibility, visual design, or both
- **Device/viewport** (optional): specific breakpoint to test
- **Design system reference** (optional): path to design guide for consistency check

### Step 4: Review Report

Claude will provide:
- **Accessibility Issues** - Specific WCAG violations with severity
- **Visual Design Issues** - Design problems with explanations
- **Recommendations** - Actionable improvements
- **Priority** - Critical, High, Medium, Low issues
- **Examples** - Specific elements with problems

## Example Output

```
## Accessibility Review

### CRITICAL ISSUES
- [ ] Button lacks visible focus indicator (WCAG 2.4.7)
  Location: "Submit" button in contact form
  Fix: Add outline or background change on :focus

- [ ] Color contrast insufficient
  Location: Gray text on light background
  Ratio: 3.5:1 (requires 4.5:1 for AA)

### HIGH ISSUES
- [ ] Missing alt text on decorative images
  Count: 3 images
  Fix: Add empty alt="" for decorative images

## Visual Design Review

### Typography Issues
- [ ] Multiple font sizes without clear hierarchy
  Found: 12px, 13px, 14px body text
  Fix: Use 12px and 16px for consistency

### Spacing Issues
- [ ] Inconsistent padding in cards
  Found: 16px, 18px, 20px padding
  Fix: Use 16px or 24px consistently

### Color Issues
- [ ] Too many accent colors
  Found: 5 different shades of blue
  Fix: Limit to primary, secondary, success, warning, error
```

## Integration with Design System

When reviewing, Claude will:
1. Read your design guide (`.claude/design-lib/web-design-guides.md`)
2. Compare components against defined tokens
3. Flag deviations from your design system
4. Provide specific recommendations based on your design language

## Quick Commands

```bash
# Review current page
/rams

# Review specific component
/rams ComponentName

# Full accessibility audit
/rams --accessibility

# Visual design review only
/rams --design

# Check at mobile breakpoint
/rams --viewport mobile

# Compare against design system
/rams --design-system
```

## Best Practices

### Before Review
- Have screenshots of the component ready
- Know your design system/brand guidelines
- Identify what you want to focus on
- Test at multiple breakpoints

### After Review
- Address CRITICAL and HIGH issues first
- Implement LOW issues as part of ongoing work
- Update design system if establishing new patterns
- Re-run review after fixes to verify

## WCAG Standards Reference

- **WCAG 2.1 Level A** - Minimum accessibility
- **WCAG 2.1 Level AA** - Standard, recommended for most sites
- **WCAG 2.1 Level AAA** - Enhanced, recommended for critical content

## Common Issues Found

### Accessibility
- Insufficient color contrast
- Missing ARIA labels
- Poor keyboard navigation
- Non-semantic HTML
- Missing form labels
- Focus not visible

### Visual Design
- Inconsistent spacing
- Unclear visual hierarchy
- Too many font sizes
- Overuse of accent colors
- Poor component alignment
- Confusing button states

## Tips for Best Results

### Screenshot Quality
- Use consistent device/viewport sizes
- Include interactive states (hover, focus, active)
- Capture both light and dark themes if applicable
- Include mobile, tablet, and desktop views

### Component Testing
- Test all interactive states
- Test with keyboard navigation
- Test with screen reader
- Test at multiple breakpoints
- Test with browser zoom at 200%

### Design System Alignment
- Ensure design guide is up to date
- Reference specific design tokens
- Check component variants
- Verify consistency across pages

## Output Deliverables

After review, you'll receive:

✅ **Accessibility Report** - WCAG issues with severity levels
✅ **Design Report** - Visual design issues and recommendations
✅ **Priority List** - Ordered by impact and effort
✅ **Specific Fixes** - Exact code/design changes needed
✅ **Re-audit Plan** - Next steps for verification

---

**Skill Version:** 1.0
**Last Updated:** 2026-01-20
**Standards:** WCAG 2.1 Level AA
