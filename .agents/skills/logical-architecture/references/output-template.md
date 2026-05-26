# Logical Architecture Document Template

Use this exact structure for the output document.

```markdown
# Logical Architecture Document

## Overview
[High-level system architecture summary]

## Component Specifications

### [Component Name] ✓ Validated

**Primary Responsibility**: [Exactly ONE sentence, active verb form, stating the component's main purpose]

**Detailed Responsibilities**:
- [Specific responsibility 1]
- [Specific responsibility 2]
- [...]

**Interfaces**:
- **Input**: [What this component receives]
- **Output**: [What this component produces]

**Dependencies**:
- [Component X] - [Why this dependency exists]
- [Component Y] - [Why this dependency exists]

**Related Requirements**:
- REQ-XXX: [Requirement description]
- REQ-YYY: [Requirement description]

---

[Repeat for each component]

## Data Flow Diagrams

### [Critical Flow 1]
```
[Actor/Component] → [Component A] → [Component B] → [Output]
```

[Repeat for all major flows]

## Architecture Validation Summary

- Total Components: X
- All components validated: ✓
- Dependency cycles detected: [None/List]
- Overloaded components: [None/List with warnings]
```

## Completeness Checklist

Before finalizing, verify the document includes:
- ✓ Overview section
- ✓ Complete component specifications for ALL identified components
- ✓ Data flow diagrams for major workflows
- ✓ Validation summary
