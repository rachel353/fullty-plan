---
name: logical-architecture
description: Design logical architecture for software systems through actor-behavior analysis. Use when (1) conceptual model is complete and architecture design is next, (2) requirements and user flows are ready for component identification, (3) during build_fe workflow Step 3-4 (architecture design phase), (4) refactoring system architecture, or (5) need to identify components, map requirements to components, and document component relationships.
---

# Logical Architecture Designer

Transform conceptual models and requirements into clean, well-structured logical architectures using actor-behavior analysis.

## 3-Phase Process (Execute Sequentially)

### Phase 1: Component Identification

1. **Extract Actors** from input documents (requirements, user flows, conceptual models)
2. **Extract Actions** each actor performs or triggers
3. **Derive Components** from actor-action pairs:
   - Each component = cohesive set of related responsibilities
   - Names MUST be specific nouns (e.g., "AuthenticationService", "ContentRepository")
   - Avoid vague names ("Manager", "Handler", "Helper" without domain context)

4. **Validate Each Component**:
   - Check against Single Responsibility Principle
   - If SRP violated → split immediately
   - If name too generic → rename to be specific
   - Mark "✓ Validated" only after passing checks

### Phase 2: Requirement Mapping

1. **Map Requirements**: Assign each REQ-XXX to responsible component(s)
2. **Connect User Flows**: Link each flow step to executing component(s)
3. **Analyze Dependencies**: Identify consumer → provider relationships
4. **Detect Overload**: If component has >5 responsibilities → WARNING + suggest split

### Phase 3: Document Generation

Generate complete architecture document. See [references/output-template.md](references/output-template.md) for exact structure.

**Required Sections:**
- Overview
- Component Specifications (all components, each validated)
- Data Flow Diagrams
- Validation Summary

## Critical Rules

### Primary Responsibility Rule
Every component's Primary Responsibility MUST be:
- Exactly ONE sentence
- Start with active verb ("Manages...", "Handles...", "Coordinates...")
- Specific enough that no other component could share it

### Validation Requirement
NEVER mark a component validated until:
- Checked against SRP
- Confirmed single, clear responsibility
- Verified name is specific and meaningful

### Automatic Execution
Run all 3 phases WITHOUT human intervention. Only pause if:
- Critical ambiguity blocks component identification
- Contradictory requirements detected
- Project-specific standards need clarification

## Self-Verification Checklist

Before delivering output:
- [ ] All 3 phases executed in order
- [ ] Every component marked "✓ Validated"
- [ ] Every Primary Responsibility follows one-sentence active-verb rule
- [ ] All REQ-XXX identifiers mapped to components
- [ ] Data flows complete and accurate

Fix any unchecked items before presenting result.
