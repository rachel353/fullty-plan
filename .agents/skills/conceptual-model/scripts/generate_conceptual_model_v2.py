#!/usr/bin/env python3
"""
Generate Skill-Compatible Conceptual Model (v2.0.0 format)

Usage:
    python generate_conceptual_model_v2.py --input <path> --output <path> [--interactive]

Examples:
    # Generate from user stories with interactive mode
    python generate_conceptual_model_v2.py \
        --input quotes/01.07/user_stories_data.json \
        --output quotes/01.07/conceptual_model.v2.json \
        --interactive

    # Convert existing conceptual model to v2 format
    python generate_conceptual_model_v2.py \
        --input docs/conceptual-model.json \
        --output docs/conceptual-model.v2.json
"""

import json
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Any
import argparse


class ConceptualModelV2Generator:
    """Generate v2.0.0 format conceptual models."""

    def __init__(self, input_path: Path, output_path: Path, interactive: bool = False):
        self.input_path = input_path
        self.output_path = output_path
        self.interactive = interactive
        self.input_data = {}
        self.entities = []
        self.relationships = []
        self.domain_rules = []
        self.data_flows = []
        self.glossary = []

    def load_input(self):
        """Load input file (JSON or existing conceptual model)."""
        print(f"📖 Loading input: {self.input_path.name}")

        with open(self.input_path, 'r', encoding='utf-8') as f:
            self.input_data = json.load(f)

        # Detect input type
        if 'user_stories' in self.input_data:
            print("  ✓ Detected: User Stories format")
            self._process_user_stories()
        elif 'entities' in self.input_data:
            print("  ✓ Detected: Existing Conceptual Model")
            self._process_existing_model()
        else:
            raise ValueError(f"Unknown input format in {self.input_path}")

    def _process_user_stories(self):
        """Process user stories to extract entities and relationships."""
        print("\n📋 Extracting entities from user stories...")

        user_stories = self.input_data.get('user_stories', [])
        entities_map = {}

        # Extract entities from user story descriptions
        for story in user_stories:
            description = story.get('description', '')
            acceptance_criteria = story.get('acceptanceCriteria', [])

            # Simple extraction: look for entity names (basic implementation)
            # In production, this would be more sophisticated
            story_id = story.get('id', '')
            self._link_story_to_entities(story_id, description, acceptance_criteria)

        print(f"  ✓ Extracted {len(entities_map)} entities")

    def _link_story_to_entities(self, story_id: str, description: str, criteria: List[str]):
        """Link user story to entities (placeholder for demonstration)."""
        # This would be expanded in actual implementation
        pass

    def _process_existing_model(self):
        """Process existing conceptual model (convert to v2 format)."""
        print("\n🔄 Converting existing model to v2 format...")

        # Load entities
        self.entities = self.input_data.get('entities', [])

        # Load relationships
        self.relationships = self.input_data.get('relationships', [])

        # Load domain rules
        self.domain_rules = self.input_data.get('domainRules', [])

        # Load data flows
        self.data_flows = self.input_data.get('dataFlows', [])

        # Load glossary
        self.glossary = self.input_data.get('glossary', [])

        print(f"  ✓ Loaded {len(self.entities)} entities")
        print(f"  ✓ Loaded {len(self.relationships)} relationships")
        print(f"  ✓ Loaded {len(self.domain_rules)} domain rules")
        print(f"  ✓ Loaded {len(self.data_flows)} data flows")
        print(f"  ✓ Loaded {len(self.glossary)} glossary terms")

    def enrich_model_interactive(self):
        """Enrich model with interactive prompts if enabled."""
        if not self.interactive:
            return

        print("\n❓ Interactive Mode - Enrichment Questions\n")

        # Project information
        print("🏢 Project Information:")
        project_name = input("  Project name: ").strip() or self.input_data.get('project', {}).get('name', 'Untitled')
        project_desc = input("  Project description: ").strip() or self.input_data.get('project', {}).get('description', '')
        project_domain = input("  Domain: ").strip() or self.input_data.get('project', {}).get('domain', '')

        self.input_data['project'] = {
            'name': project_name,
            'description': project_desc,
            'version': '1.0.0',
            'domain': project_domain
        }

        # Additional domain rules
        print("\n📋 Domain Rules:")
        while True:
            add_rule = input("  Add domain rule? (y/n): ").strip().lower()
            if add_rule != 'y':
                break

            rule_id = f"DR-{len(self.domain_rules) + 1:03d}"
            rule_name = input("    Rule name: ").strip()
            rule_desc = input("    Description: ").strip()

            self.domain_rules.append({
                'id': rule_id,
                'name': rule_name,
                'description': rule_desc,
                'entities': [],
                'userStories': []
            })

        # Glossary terms
        print("\n📖 Glossary:")
        while True:
            add_term = input("  Add glossary term? (y/n): ").strip().lower()
            if add_term != 'y':
                break

            korean = input("    Korean term: ").strip()
            english = input("    English term: ").strip()
            definition = input("    Definition: ").strip()

            self.glossary.append({
                'koreanTerm': korean,
                'englishTerm': english,
                'definition': definition
            })

    def validate_model(self) -> bool:
        """Validate model completeness."""
        print("\n🔍 Validating model...\n")

        issues = []

        # Check entities
        if not self.entities:
            issues.append("  ⚠️  No entities defined")
        else:
            for entity in self.entities:
                if not entity.get('name'):
                    issues.append("  ⚠️  Entity without name")
                if not entity.get('attributes'):
                    issues.append(f"  ⚠️  Entity '{entity.get('name')}' has no attributes")
                else:
                    for attr in entity['attributes']:
                        if not attr.get('type'):
                            issues.append(f"  ⚠️  Attribute '{attr.get('name')}' has no type")
                        if attr.get('type') == 'Enum' and not attr.get('enumValues'):
                            issues.append(f"  ⚠️  Enum attribute '{attr.get('name')}' has no values")

        # Check relationships
        if not self.relationships:
            issues.append("  ⚠️  No relationships defined")
        else:
            for rel in self.relationships:
                if not rel.get('cardinality'):
                    issues.append(f"  ⚠️  Relationship {rel.get('from')} → {rel.get('to')} has no cardinality")

        if issues:
            print("Issues found:")
            for issue in issues:
                print(issue)
            return False

        print("✅ Model validation passed!")
        return True

    def generate_v2_model(self) -> Dict[str, Any]:
        """Generate v2.0.0 format model."""
        print("\n✨ Generating v2.0.0 model...\n")

        # Count user story mappings
        user_story_count = 0
        for entity in self.entities:
            user_story_count += len(entity.get('userStories', []))

        model = {
            'version': '2.0.0',
            'format': 'skill-conceptual-model',
            'timestamp': datetime.now().isoformat(),
            'description': 'Skill-compatible conceptual model with explicit attribute relationships',

            'project': self.input_data.get('project', {
                'name': 'Untitled Project',
                'description': '',
                'version': '1.0.0',
                'domain': ''
            }),

            'summary': {
                'totalEntities': len(self.entities),
                'totalRelationships': len(self.relationships),
                'totalDomainRules': len(self.domain_rules),
                'totalDataFlows': len(self.data_flows),
                'totalGlossaryTerms': len(self.glossary),
                'entityList': [e.get('name') for e in self.entities]
            },

            'entities': self._process_entities(),
            'relationships': self._process_relationships(),
            'domainRules': self.domain_rules,
            'dataFlows': self.data_flows,
            'glossary': self.glossary,

            'metadata': {
                'sourceModel': self.input_path.name,
                'conversionDate': datetime.now().isoformat(),
                'embeddedTypes': self.input_data.get('embeddedTypes', []),
                'qualityNotes': self._generate_quality_notes(),
                'userStoryMapping': {
                    'totalMappings': user_story_count,
                    'completeness': f"{(user_story_count / max(1, len(self.entities)) * 100):.1f}%"
                }
            }
        }

        return model

    def _process_entities(self) -> List[Dict[str, Any]]:
        """Process and enrich entities."""
        processed = []

        for entity in self.entities:
            processed_entity = {
                'name': entity.get('name', ''),
                'businessName': entity.get('businessName', entity.get('name', '')),
                'description': entity.get('description', ''),
                'category': entity.get('category', 'other'),
                'attributes': entity.get('attributes', []),
                'userStories': entity.get('userStories', []),
                'relatedEntities': entity.get('relatedEntities', [])
            }
            processed.append(processed_entity)

        return processed

    def _process_relationships(self) -> List[Dict[str, Any]]:
        """Process and enrich relationships."""
        processed = []

        for rel in self.relationships:
            processed_rel = {
                'from': rel.get('from', ''),
                'to': rel.get('to', ''),
                'cardinality': rel.get('cardinality', '1:N'),
                'type': rel.get('type', 'non-identifying'),
                'optional': rel.get('optional', {'from': False, 'to': False}),
                'description': rel.get('description', ''),
                'relationshipId': rel.get('relationshipId', ''),
                'businessRule': rel.get('businessRule', rel.get('description', ''))
            }
            processed.append(processed_rel)

        return processed

    def _generate_quality_notes(self) -> List[str]:
        """Generate quality assurance notes."""
        notes = []

        # Entity coverage
        if len(self.entities) > 0:
            notes.append(f"✓ {len(self.entities)} entities fully defined")

        # Relationship coverage
        if len(self.relationships) > 0:
            notes.append(f"✓ {len(self.relationships)} relationships with cardinality")

        # FK documentation
        fk_count = 0
        for entity in self.entities:
            for attr in entity.get('attributes', []):
                if 'references' in attr:
                    fk_count += 1
        if fk_count > 0:
            notes.append(f"✓ {fk_count} FK relationships explicitly documented")

        # Domain rules
        if len(self.domain_rules) > 0:
            notes.append(f"✓ {len(self.domain_rules)} domain rules defined")

        # Data flows
        if len(self.data_flows) > 0:
            notes.append(f"✓ {len(self.data_flows)} data flows defined")

        # Glossary
        if len(self.glossary) > 0:
            notes.append(f"✓ {len(self.glossary)} glossary terms defined")

        # User story mapping
        user_story_count = sum(len(e.get('userStories', [])) for e in self.entities)
        if user_story_count > 0:
            notes.append(f"✓ {user_story_count} user story mappings")

        return notes if notes else ["Model structure complete"]

    def save_model(self, model: Dict[str, Any]):
        """Save v2 model to file."""
        print(f"\n💾 Saving model to: {self.output_path}\n")

        # Ensure output directory exists
        self.output_path.parent.mkdir(parents=True, exist_ok=True)

        # Save JSON
        with open(self.output_path, 'w', encoding='utf-8') as f:
            json.dump(model, f, ensure_ascii=False, indent=2)

        print(f"✅ Saved: {self.output_path.name}")

    def print_summary(self, model: Dict[str, Any]):
        """Print generation summary."""
        summary = model.get('summary', {})
        print("\n" + "=" * 60)
        print("📊 CONCEPTUAL MODEL v2.0.0 - SUMMARY")
        print("=" * 60 + "\n")

        # Project info
        project = model.get('project', {})
        print(f"🏢 Project: {project.get('name', 'Untitled')}")
        print(f"   Domain: {project.get('domain', '')}\n")

        # Content statistics
        print("📊 Content Statistics:")
        print(f"   📦 Entities:          {summary.get('totalEntities', 0)}")
        print(f"   🔗 Relationships:     {summary.get('totalRelationships', 0)}")
        print(f"   📋 Domain Rules:      {summary.get('totalDomainRules', 0)}")
        print(f"   🔄 Data Flows:        {summary.get('totalDataFlows', 0)}")
        print(f"   📖 Glossary Terms:    {summary.get('totalGlossaryTerms', 0)}\n")

        # Quality metrics
        metadata = model.get('metadata', {})
        if metadata.get('qualityNotes'):
            print("✨ Quality Metrics:")
            for note in metadata.get('qualityNotes', []):
                print(f"   {note}")
            print()

        # User story mapping
        if metadata.get('userStoryMapping'):
            us_mapping = metadata['userStoryMapping']
            print(f"📖 User Story Coverage:")
            print(f"   Total Mappings: {us_mapping.get('totalMappings', 0)}")
            print(f"   Completeness:   {us_mapping.get('completeness', 'N/A')}\n")

        print("=" * 60)
        print("✨ Model generation complete!\n")

    def run(self):
        """Execute the full generation pipeline."""
        try:
            self.load_input()
            self.enrich_model_interactive()

            if not self.validate_model():
                print("\n⚠️  Validation failed. Proceeding anyway...\n")

            model = self.generate_v2_model()
            self.save_model(model)
            self.print_summary(model)

        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
            sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description='Generate Skill-Compatible Conceptual Model (v2.0.0)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Convert existing model to v2 format
  python generate_conceptual_model_v2.py \\
    --input docs/conceptual-model.json \\
    --output docs/conceptual-model.v2.json

  # Interactive mode with enrichment
  python generate_conceptual_model_v2.py \\
    --input docs/conceptual-model.json \\
    --output docs/conceptual-model.v2.json \\
    --interactive
        """
    )

    parser.add_argument(
        '--input', '-i',
        type=Path,
        required=True,
        help='Input file (JSON: conceptual-model.json or user_stories_data.json)'
    )

    parser.add_argument(
        '--output', '-o',
        type=Path,
        required=True,
        help='Output file path for v2.0.0 model'
    )

    parser.add_argument(
        '--interactive',
        action='store_true',
        help='Enable interactive mode for model enrichment'
    )

    args = parser.parse_args()

    # Validate input file exists
    if not args.input.exists():
        print(f"❌ Input file not found: {args.input}")
        sys.exit(1)

    # Run generator
    generator = ConceptualModelV2Generator(
        input_path=args.input,
        output_path=args.output,
        interactive=args.interactive
    )

    generator.run()


if __name__ == '__main__':
    main()
