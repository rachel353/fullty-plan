---
name: conceptual-model
description: Define the fundamental conceptual structure of a system and output as docs/conceptual-model.json. Use when (1) requirements are gathered but technical architecture not yet designed, (2) team needs shared vocabulary for system entities, (3) before database schema, API specification, or UI wireframing begins, (4) ambiguity exists about core entities, relationships, or lifecycles, (5) during Build FE workflow Step 3 (Conceptual Model creation), or (6) terminology confusion needs resolution (e.g., "enrollment" vs "registration").
---

# Conceptual Model Architect

## Context Detection

Check current working directory to determine output path:

| Context | Detection | Output Path |
|---------|-----------|-------------|
| **Sales/Quote** | Path contains `sales/` | `quotes/[MM.DD]/conceptual_model.json` |
| **FE Development** | Default | `docs/conceptual-model.json` |

**Sales Context Input Sources:**
- `quotes/[MM.DD]/user_stories_data.json`
- `quotes/[MM.DD]/guide.md`
- `meeting_scripts/[MM.DD]/requirements.md`

Define **what exists in the system** and output to `docs/conceptual-model.json`.

## Output File

**Location:** `docs/conceptual-model.json`

See [references/output-schema.md](references/output-schema.md) for complete JSON schema.

## Working Method

1. **Read all context** — requirements, user stories, meeting summaries, CLAUDE.md
2. **Extract entities** — What are the "nouns" users care about? What has identity or state?
3. **Define attributes** — For each entity: name, type, required, description
4. **Define enums** — List all possible values for enum-type attributes
5. **Map relationships** — Cardinality (1:1, 1:N, N:1, N:M), related entity, description
6. **Document domain rules** — Business constraints and validation rules
7. **Map data flows** — Key user journeys through entities
8. **Create glossary** — Define domain-specific terms
9. **Link user stories** — Map entities to US-XXX identifiers

## Entity Attribute Types

Use these types for attributes:
- `UUID` — Unique identifier
- `String` — Text value
- `Integer` — Whole number
- `Float` — Decimal number
- `Boolean` — true/false
- `DateTime` — Timestamp
- `Enum` — Fixed set of values (define in enumValues)
- `Array[Type]` — List of values
- `JSON` — Flexible object

## Quality Standards

- Use business language stakeholders understand
- Be explicit — no implied relationships
- Be complete — all attributes, all enum values, all relationships
- Map every entity to at least one user story
- Document all domain rules that constrain behavior

## Self-Verification

Before saving output:
- [ ] All entities have complete attribute definitions
- [ ] All enum attributes have enumValues defined
- [ ] All relationships specify cardinality
- [ ] Domain rules cover key business constraints
- [ ] Glossary defines domain-specific terms
- [ ] User story mapping is complete

## When to Seek Clarification

Stop and ask if you encounter:
- Ambiguous entity definitions
- Missing information about relationships or cardinality
- Unclear enum values or attribute types
- Business rules that seem contradictory
