---
name: ux-insight-extractor
description: Extract UI/UX design insights from YouTube video scripts and save as structured JSON. Use when analyzing YouTube video transcripts about web design, UI/UX discussions, or design tutorials. Triggers include requests to analyze design videos, extract UX insights from scripts, or convert design commentary to structured data.
---

# UX Insight Extractor

Extract structured UI/UX insights from YouTube video scripts about web design, converting unstructured commentary into entity-based JSON format.

## Workflow

1. Read the YouTube script file provided by user
2. Analyze content for UI/UX insights
3. Extract entities following the schema in [references/json_schema.md](references/json_schema.md)
4. Save output as JSON file

## Entity Extraction Guide

### Document Identity
- Generate unique `document_id` from video title/topic
- Set `document_type` to `ui_ux_design_insight`
- Include `source` with video title and URL if available

### UsageContext Entity
Identify when these design patterns apply:
- `applicable_when`: domains, content types, user behavior models, page goals
- `not_applicable_when`: contexts where insights should NOT be applied

### Domain Entity
- Identify the design domain (e.g., `design_asset_gallery`, `e_commerce`, `saas_dashboard`)
- Extract domain characteristics (e.g., `image_first`, `data_driven`, `task_oriented`)

### User Entity
- Primary user role and skill level
- User goals (what they want to achieve)
- Behavior flow (typical user journey)

### Product Entity
- Product type being designed for
- Evaluation logic (how users judge the product)

### Feature Entities
For each distinct UI/UX insight, create a feature entity with:
- `id`: snake_case identifier
- `purpose`: what problem it solves
- `design_rules`: specific implementation guidance
- `ux_intent`: user experience rationale

## Output

Save to `design-lib/ux_insights_{document_id}.json` in current directory.

## Example Usage

User: "이 유튜브 스크립트에서 UX 인사이트 추출해줘"

1. Read the script file
2. Identify key design insights
3. Structure into entities
4. Output JSON following schema

## Schema Reference

See [references/json_schema.md](references/json_schema.md) for complete JSON structure and field definitions.
