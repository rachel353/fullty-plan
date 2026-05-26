#!/usr/bin/env python3
"""
Generate design system files from index.css

This script:
1. Parses index.css to extract design tokens
2. Creates semantic state mappings
3. Generates .claude/rules/design_system_rules.mdc
4. Generates app/globals.css
"""

import re
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any


def get_project_root() -> Path:
    """Find project root by looking for index.css"""
    current = Path.cwd()
    while current != current.parent:
        if (current / "index.css").exists():
            return current
        current = current.parent
    raise FileNotFoundError("Could not find project root (index.css not found)")


def parse_css_variables(css_content: str, selector: str = ":root") -> Dict[str, str]:
    """
    Parse CSS variables from a given selector block

    Args:
        css_content: Full CSS file content
        selector: CSS selector to parse (e.g., ':root', '.dark')

    Returns:
        Dictionary of variable names to values
    """
    # Find the selector block
    pattern = rf"{re.escape(selector)}\s*{{([^}}]+)}}"
    match = re.search(pattern, css_content, re.DOTALL)

    if not match:
        return {}

    block_content = match.group(1)

    # Extract all CSS variables
    var_pattern = r"--([a-z0-9-]+):\s*([^;]+);"
    variables = {}

    for match in re.finditer(var_pattern, block_content):
        var_name = match.group(1)
        var_value = match.group(2).strip()
        variables[var_name] = var_value

    return variables


def extract_tokens(css_content: str) -> Dict[str, Any]:
    """
    Extract all design tokens from index.css

    Returns:
        Dictionary with categorized tokens
    """
    root_vars = parse_css_variables(css_content, ":root")

    # Categorize tokens
    tokens = {
        "colors": {},
        "typography": {},
        "spacing": {},
        "shadows": {},
        "radius": {}
    }

    for var_name, var_value in root_vars.items():
        if var_name.startswith("font-"):
            tokens["typography"][var_name.replace("font-", "")] = var_value
        elif var_name.startswith("shadow-"):
            tokens["shadows"][var_name.replace("shadow-", "")] = var_value
        elif var_name == "radius":
            tokens["radius"]["base"] = var_value
        elif var_name == "spacing":
            tokens["spacing"]["base"] = var_value
        elif "oklch" in var_value or "hsl" in var_value:
            tokens["colors"][var_name] = var_value

    return tokens


def create_semantic_mappings(tokens: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create semantic state mappings from base tokens

    Returns:
        Dictionary of semantic states with bg/fg/border mappings
    """
    colors = tokens["colors"]

    mappings = {
        "info": {
            "background": "var(--color-accent)",
            "foreground": "var(--color-accent-foreground)",
            "border": "var(--color-accent)",
            "description": "Informational messages and neutral highlights"
        },
        "action": {
            "background": "var(--color-primary)",
            "foreground": "var(--color-primary-foreground)",
            "border": "var(--color-primary)",
            "description": "Primary actions and CTAs"
        },
        "success": {
            "background": "var(--color-secondary)",
            "foreground": "var(--color-secondary-foreground)",
            "border": "var(--color-secondary)",
            "description": "Success confirmations",
            "needs_review": True,
            "reason": "No green token available - using secondary (yellow)"
        },
        "warning": {
            "background": "var(--color-chart-4)",
            "foreground": "var(--color-foreground)",
            "border": "var(--color-chart-4)",
            "description": "Warning messages",
            "needs_review": True,
            "reason": "Using chart-4 as fallback - may need custom amber"
        },
        "danger": {
            "background": "var(--color-destructive)",
            "foreground": "var(--color-destructive-foreground)",
            "border": "var(--color-destructive)",
            "description": "Destructive actions and critical errors"
        },
        "frozen": {
            "background": "var(--color-muted)",
            "foreground": "var(--color-muted-foreground)",
            "border": "var(--color-muted)",
            "description": "Disabled states and locked content"
        }
    }

    return mappings


def generate_design_system_rules(
    tokens: Dict[str, Any],
    semantic_mappings: Dict[str, Any]
) -> str:
    """Generate design_system_rules.mdc content"""

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    content = f"""# Design System Rules

> Auto-generated from index.css
> Last updated: {timestamp}

## Color System

### Semantic States

All UI components MUST use semantic state tokens, never raw color variables.

"""

    # Add each semantic state
    state_order = ["info", "action", "success", "warning", "danger", "frozen"]

    for state in state_order:
        mapping = semantic_mappings[state]
        state_title = state.title()

        content += f"""#### {state_title} State
- **Purpose:** {mapping['description']}
- **Tokens:** `bg-{state}`, `text-{state}-foreground`, `border-{state}`
- **CSS Variables:**
  - Background: `{mapping['background']}`
  - Foreground: `{mapping['foreground']}`
  - Border: `{mapping['border']}`
"""

        if mapping.get("needs_review"):
            content += f"- ⚠️ **Needs Review:** {mapping['reason']}\n"

        content += "\n"

    content += """### Usage Rules

1. **Never use raw CSS variables** (e.g., `var(--primary)`) in components
2. **Always use semantic classes** (e.g., `bg-action`, `bg-danger`)
3. **Match foreground with background** (e.g., `bg-action` + `text-action-foreground`)

## Typography System

### Font Families

"""

    # Add typography
    for font_type, font_value in tokens["typography"].items():
        content += f"- **{font_type.title()}:** `font-{font_type}` ({font_value})\n"

    content += """
### Usage Rules

1. Use `font-serif` for h1-h6 elements
2. Use `font-sans` for all body text, buttons, labels
3. Use `font-mono` for code blocks, technical IDs

## Spacing System

### Scale

- Base unit: `""" + tokens["spacing"].get("base", "0.25rem") + """` (4px)
- Use Tailwind's spacing scale (4, 8, 12, 16, 24, 32, 48, 64...)

### Border Radius

- `rounded-sm`: Smaller than default
- `rounded-md`: Slightly smaller than default
- `rounded-lg`: Default radius
- `rounded-xl`: Larger than default

## Shadow System

### Elevation Levels

"""

    # Add shadows
    shadow_descriptions = {
        "xs": "Subtle elevation (dropdowns)",
        "sm": "Light elevation (cards)",
        "md": "Medium elevation (modals)",
        "lg": "High elevation (popovers)",
        "xl": "Maximum elevation (notifications)"
    }

    for shadow_level in ["xs", "sm", "md", "lg", "xl"]:
        if shadow_level in tokens["shadows"]:
            desc = shadow_descriptions.get(shadow_level, "")
            content += f"- `shadow-{shadow_level}`: {desc}\n"

    content += """
## Component Patterns

### Buttons

**Primary Action:**
```tsx
<button className="bg-action text-action-foreground hover:bg-action/90 px-4 py-2 rounded-lg">
  Submit
</button>
```

**Destructive Action:**
```tsx
<button className="bg-danger text-danger-foreground hover:bg-danger/90 px-4 py-2 rounded-lg">
  Delete
</button>
```

**Disabled:**
```tsx
<button disabled className="bg-frozen text-frozen-foreground cursor-not-allowed px-4 py-2 rounded-lg">
  Disabled
</button>
```

### Alerts

**Info:**
```tsx
<div className="bg-info border border-info text-info-foreground p-4 rounded-lg">
  Information message
</div>
```

**Success:**
```tsx
<div className="bg-success border border-success text-success-foreground p-4 rounded-lg">
  Success message
</div>
```

**Warning:**
```tsx
<div className="bg-warning border border-warning text-warning-foreground p-4 rounded-lg">
  Warning message
</div>
```

**Danger:**
```tsx
<div className="bg-danger border border-danger text-danger-foreground p-4 rounded-lg">
  Error message
</div>
```

### Form States

**Normal:**
```tsx
<input className="border-input bg-background px-3 py-2 rounded-md" />
```

**Disabled:**
```tsx
<input disabled className="bg-frozen text-frozen-foreground px-3 py-2 rounded-md" />
```

**Error:**
```tsx
<input className="border-danger focus:ring-danger px-3 py-2 rounded-md" />
```

## Validation Rules

Before using design system:

- [ ] All semantic states have clear mappings
- [ ] No direct use of CSS variables in components
- [ ] Typography usage is consistent
- [ ] Shadow elevations match component hierarchy
- [ ] Dark mode variants tested for all states
"""

    return content


def generate_globals_css(semantic_mappings: Dict[str, Any]) -> str:
    """Generate app/globals.css content with semantic utilities"""

    content = """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  /* Semantic State Utilities */

"""

    state_order = ["info", "action", "success", "warning", "danger", "frozen"]

    for state in state_order:
        mapping = semantic_mappings[state]
        state_title = state.title()

        content += f"""  /* {state_title} State */
  .bg-{state} {{
    background-color: {mapping['background']};
  }}
  .text-{state}-foreground {{
    color: {mapping['foreground']};
  }}
  .border-{state} {{
    border-color: {mapping['border']};
  }}

"""

    content += """}
"""

    return content


def main():
    """Main execution"""
    try:
        # Find project root
        project_root = get_project_root()
        print(f"📁 Project root: {project_root}")

        # Read index.css
        index_css_path = project_root / "index.css"
        print(f"📖 Reading {index_css_path}")

        with open(index_css_path, 'r', encoding='utf-8') as f:
            css_content = f.read()

        # Extract tokens
        print("🎨 Extracting design tokens...")
        tokens = extract_tokens(css_content)

        print(f"   ✓ Colors: {len(tokens['colors'])} tokens")
        print(f"   ✓ Typography: {len(tokens['typography'])} fonts")
        print(f"   ✓ Shadows: {len(tokens['shadows'])} levels")

        # Create semantic mappings
        print("🗺️  Creating semantic state mappings...")
        semantic_mappings = create_semantic_mappings(tokens)

        needs_review = [
            state for state, mapping in semantic_mappings.items()
            if mapping.get("needs_review")
        ]

        if needs_review:
            print(f"   ⚠️  {len(needs_review)} states need review: {', '.join(needs_review)}")

        # Generate design_system_rules.mdc
        rules_path = project_root / ".claude" / "rules" / "design_system_rules.mdc"
        rules_path.parent.mkdir(parents=True, exist_ok=True)

        print(f"📝 Generating {rules_path}")
        rules_content = generate_design_system_rules(tokens, semantic_mappings)

        with open(rules_path, 'w', encoding='utf-8') as f:
            f.write(rules_content)

        print(f"   ✓ Created {rules_path}")

        # Generate app/globals.css
        globals_path = project_root / "app" / "globals.css"
        globals_path.parent.mkdir(parents=True, exist_ok=True)

        print(f"📝 Generating {globals_path}")
        globals_content = generate_globals_css(semantic_mappings)

        with open(globals_path, 'w', encoding='utf-8') as f:
            f.write(globals_content)

        print(f"   ✓ Created {globals_path}")

        # Save semantic mappings as JSON for reference
        mappings_path = project_root / "docs" / "semantic_state_mappings.json"
        mappings_path.parent.mkdir(parents=True, exist_ok=True)

        with open(mappings_path, 'w', encoding='utf-8') as f:
            json.dump(semantic_mappings, f, indent=2, ensure_ascii=False)

        print(f"   ✓ Created {mappings_path}")

        # Print summary
        print("\n✅ Design system generated successfully!")
        print("\n📋 Next steps:")
        print("   1. Review .claude/rules/design_system_rules.mdc")
        print("   2. Check semantic_state_mappings.json for states needing review")

        if needs_review:
            print(f"\n⚠️  States requiring human review:")
            for state in needs_review:
                mapping = semantic_mappings[state]
                print(f"   - {state}: {mapping['reason']}")

    except FileNotFoundError as e:
        print(f"❌ Error: {e}")
        exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        exit(1)


if __name__ == "__main__":
    main()
