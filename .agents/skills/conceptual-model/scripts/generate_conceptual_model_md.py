#!/usr/bin/env python3
"""
Conceptual Model JSON to Markdown Converter

Usage:
    python generate_conceptual_model_md.py --data <json_path> --output <md_path>

Example:
    python generate_conceptual_model_md.py \
        --data docs/conceptual-model.json \
        --output docs/conceptual-model.md
"""

import json
import argparse
from pathlib import Path
from datetime import datetime


def load_json(path: str) -> dict:
    """Load JSON file."""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def generate_header(data: dict) -> str:
    """Generate document header."""
    project = data.get('project', {})
    return f"""# Conceptual Model - {project.get('name', 'Untitled')}

## 프로젝트 개요

**프로젝트명**: {project.get('name', '')}
**설명**: {project.get('description', '')}
**버전**: {project.get('version', '1.0.0')}

---
"""


def generate_summary(data: dict) -> str:
    """Generate summary section."""
    summary = data.get('summary', {})
    entities = summary.get('entityList', [])

    output = """## 요약

| 항목 | 수량 |
|------|------|
"""
    output += f"| **Entities** | {summary.get('totalEntities', 0)}개 |\n"
    output += f"| **Relationships** | {summary.get('totalRelationships', 0)}개 |\n"
    output += f"| **Domain Rules** | {summary.get('totalDomainRules', 0)}개 |\n"
    output += f"| **Data Flows** | {summary.get('totalDataFlows', 0)}개 |\n"
    output += f"| **Glossary Terms** | {summary.get('totalGlossaryTerms', 0)}개 |\n"

    output += "\n### Entity 목록\n\n"
    output += ", ".join([f"`{e}`" for e in entities])
    output += "\n\n---\n"

    return output


def generate_entities(data: dict) -> str:
    """Generate entities section."""
    entities = data.get('entities', [])

    output = "## Entities\n\n"

    for entity in entities:
        output += f"### {entity['name']}\n\n"
        output += f"**설명**: {entity.get('description', '')}\n\n"

        # User Stories mapping
        user_stories = entity.get('userStories', [])
        if user_stories:
            output += f"**User Stories**: {', '.join(user_stories)}\n\n"

        # Attributes table
        attributes = entity.get('attributes', [])
        if attributes:
            output += "#### Attributes\n\n"
            output += "| Name | Type | Required | Description |\n"
            output += "|------|------|----------|-------------|\n"

            for attr in attributes:
                name = attr.get('name', '')
                attr_type = attr.get('type', '')
                required = "Yes" if attr.get('required', False) else "No"
                description = attr.get('description', '')

                # Add enum values if present
                enum_values = attr.get('enumValues', [])
                if enum_values:
                    enum_str = ", ".join([f"`{v}`" for v in enum_values[:5]])
                    if len(enum_values) > 5:
                        enum_str += f" (+{len(enum_values) - 5} more)"
                    description += f" [{enum_str}]"

                output += f"| `{name}` | {attr_type} | {required} | {description} |\n"

            output += "\n"

        output += "---\n\n"

    return output


def generate_relationships(data: dict) -> str:
    """Generate relationships section."""
    relationships = data.get('relationships', [])

    if not relationships:
        return ""

    output = "## Relationships\n\n"
    output += "| From | To | Cardinality | Description |\n"
    output += "|------|-----|-------------|-------------|\n"

    for rel in relationships:
        from_entity = rel.get('from', '')
        to_entity = rel.get('to', '')
        cardinality = rel.get('cardinality', '')
        description = rel.get('description', '')

        output += f"| `{from_entity}` | `{to_entity}` | {cardinality} | {description} |\n"

    output += "\n### Entity Relationship Diagram (Text)\n\n```\n"

    for rel in relationships:
        from_entity = rel.get('from', '')
        to_entity = rel.get('to', '')
        cardinality = rel.get('cardinality', '')

        # Simple text diagram
        if cardinality == "1:1":
            output += f"{from_entity} (1) ─── (1) {to_entity}\n"
        elif cardinality == "1:N":
            output += f"{from_entity} (1) ─── (N) {to_entity}\n"
        elif cardinality == "N:1":
            output += f"{from_entity} (N) ─── (1) {to_entity}\n"
        elif cardinality == "N:M":
            output += f"{from_entity} (N) ─── (M) {to_entity}\n"
        else:
            output += f"{from_entity} ─── {to_entity}\n"

    output += "```\n\n---\n"

    return output


def generate_domain_rules(data: dict) -> str:
    """Generate domain rules section."""
    rules = data.get('domainRules', [])

    if not rules:
        return ""

    output = "## Domain Rules\n\n"
    output += "| ID | Name | Description | Entities | User Stories |\n"
    output += "|----|------|-------------|----------|---------------|\n"

    for rule in rules:
        rule_id = rule.get('id', '')
        name = rule.get('name', '')
        description = rule.get('description', '')
        entities = ", ".join([f"`{e}`" for e in rule.get('entities', [])])
        user_stories = ", ".join(rule.get('userStories', []))

        output += f"| {rule_id} | {name} | {description} | {entities} | {user_stories} |\n"

    output += "\n---\n"

    return output


def generate_data_flows(data: dict) -> str:
    """Generate data flows section."""
    flows = data.get('dataFlows', [])

    if not flows:
        return ""

    output = "## Data Flows\n\n"

    for flow in flows:
        output += f"### {flow.get('name', '')}\n\n"
        output += f"**설명**: {flow.get('description', '')}\n\n"

        user_stories = flow.get('userStories', [])
        if user_stories:
            output += f"**User Stories**: {', '.join(user_stories)}\n\n"

        steps = flow.get('steps', [])
        if steps:
            output += "#### Steps\n\n"
            output += "| Order | Action | Entity | Description |\n"
            output += "|-------|--------|--------|-------------|\n"

            for step in steps:
                order = step.get('order', '')
                action = step.get('action', '')
                entity = step.get('entity', '')
                description = step.get('description', '')

                output += f"| {order} | {action} | `{entity}` | {description} |\n"

            output += "\n"

            # Flow diagram
            output += "#### Flow Diagram\n\n```\n"
            for i, step in enumerate(steps):
                action = step.get('action', '')
                entity = step.get('entity', '')
                if i < len(steps) - 1:
                    output += f"[{action}] → "
                else:
                    output += f"[{action}]"
            output += "\n```\n\n"

        output += "---\n\n"

    return output


def generate_glossary(data: dict) -> str:
    """Generate glossary section."""
    glossary = data.get('glossary', [])

    if not glossary:
        return ""

    output = "## Glossary\n\n"
    output += "| Term (KR) | Term (EN) | Definition |\n"
    output += "|-----------|-----------|------------|\n"

    for term in glossary:
        korean = term.get('koreanTerm', term.get('term', ''))
        english = term.get('englishTerm', '')
        definition = term.get('definition', '')

        output += f"| {korean} | {english} | {definition} |\n"

    output += "\n---\n"

    return output


def generate_footer() -> str:
    """Generate document footer."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"""
---

*Generated from conceptual-model.json on {timestamp}*
"""


def main():
    parser = argparse.ArgumentParser(
        description='Convert conceptual-model.json to Markdown'
    )
    parser.add_argument(
        '--data', '-d',
        type=str,
        required=True,
        help='Path to conceptual-model.json'
    )
    parser.add_argument(
        '--output', '-o',
        type=str,
        default=None,
        help='Output path for Markdown file (default: same dir as input with .md extension)'
    )

    args = parser.parse_args()

    # Load JSON
    data = load_json(args.data)

    # Generate Markdown sections
    sections = [
        generate_header(data),
        generate_summary(data),
        generate_entities(data),
        generate_relationships(data),
        generate_domain_rules(data),
        generate_data_flows(data),
        generate_glossary(data),
        generate_footer(),
    ]

    markdown = "".join(sections)

    # Determine output path
    if args.output:
        output_path = Path(args.output)
    else:
        input_path = Path(args.data)
        output_path = input_path.with_suffix('.md')

    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Write Markdown
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(markdown)

    print(f"Generated: {output_path}")
    print(f"  - Entities: {data.get('summary', {}).get('totalEntities', 0)}")
    print(f"  - Relationships: {data.get('summary', {}).get('totalRelationships', 0)}")
    print(f"  - Domain Rules: {data.get('summary', {}).get('totalDomainRules', 0)}")
    print(f"  - Data Flows: {data.get('summary', {}).get('totalDataFlows', 0)}")
    print(f"  - Glossary Terms: {data.get('summary', {}).get('totalGlossaryTerms', 0)}")


if __name__ == '__main__':
    main()
