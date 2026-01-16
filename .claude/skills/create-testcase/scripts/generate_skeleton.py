#!/usr/bin/env python3
"""
QC Test Case Skeleton Generator

Generates a skeleton JSON with US/AC structure and coverage indices
from @docs documents.

Usage:
    python3 generate_skeleton.py --change change-2026-01-15-1000 --priority P1 --output tasks/qc/skeleton.json
"""

import argparse
import json
import re
import os
from pathlib import Path
from typing import Optional


def find_project_root() -> Path:
    """Find jyageunfriends project root by looking for docs folder."""
    current = Path.cwd()

    # Check if we're in the jyageunfriends directory
    if (current / "docs").exists():
        return current

    # Check parent directories
    for parent in current.parents:
        if (parent / "jyageunfriends" / "docs").exists():
            return parent / "jyageunfriends"
        if (parent / "docs").exists():
            return parent

    raise FileNotFoundError("Could not find project root with docs folder")


def read_file(path: Path) -> str:
    """Read file content, return empty string if not found."""
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        print(f"Warning: File not found: {path}")
        return ""


def extract_user_stories(content: str, priorities: list[str]) -> list[dict]:
    """Extract user stories and acceptance criteria from user_stories.md."""
    user_stories = []

    # Pattern to match US blocks: **US-XXX** `P1` or **US-XXX-X** `P1`
    # Block ends at next **US- or --- or end of file
    us_pattern = r"\*\*(US-[\d-]+)\*\*\s*`(P\d)`[^\n]*\n(.*?)(?=\*\*US-|\n---\n|\Z)"
    # AC pattern: - AC-N: text (possibly with (change-xxx) at end)
    ac_pattern = r"-\s*AC-(\d+):\s*([^\n]+)"
    statement_pattern = r"As a[^,]+,\s*I want to[^,]+,\s*So that[^\n]+"
    route_pattern = r"/[a-zA-Z0-9\-_/\[\]]+"
    dr_pattern = r"DR-\d+"
    change_pattern = r"change-[\d-]+"

    # Track current domain from section headers like "#### 인증/회원"
    current_domain = ""
    domain_pattern = r"####\s*([^\n]+)"

    # Split content by domain sections
    sections = re.split(r"(####\s*[^\n]+)", content)

    for i, section in enumerate(sections):
        # Check if this is a domain header
        domain_match = re.match(r"####\s*(.+)", section.strip())
        if domain_match:
            current_domain = domain_match.group(1).strip()
            continue

        # Find all US blocks in this section
        for us_match in re.finditer(us_pattern, section, re.DOTALL):
            us_id = us_match.group(1)
            priority = us_match.group(2)
            us_block = us_match.group(3)

            # Filter by priority
            if priority not in priorities:
                continue

            # Extract statement
            statement_match = re.search(statement_pattern, us_block)
            statement = statement_match.group(0).strip() if statement_match else ""

            # Extract title from statement (the "I want to X" part)
            title_match = re.search(r"I want to\s+([^,]+)", statement)
            title = title_match.group(1).strip() if title_match else us_id

            # Extract ACs
            acceptance_criteria = []
            for ac_match in re.finditer(ac_pattern, us_block):
                ac_num = ac_match.group(1)
                ac_text = ac_match.group(2).strip()
                # Remove trailing (change-xxx) references
                ac_text = re.sub(r"\s*\(change-[\d-]+\)\s*$", "", ac_text)
                acceptance_criteria.append({
                    "id": f"AC-{ac_num}",
                    "text": ac_text,
                    "testCases": []
                })

            # Extract routes from block
            routes = list(set(re.findall(route_pattern, us_block)))

            # Extract domain rules
            domain_rules = list(set(re.findall(dr_pattern, us_block)))

            # Extract change references
            changes = list(set(re.findall(change_pattern, us_block)))

            user_stories.append({
                "id": us_id,
                "priority": priority,
                "domain": current_domain,
                "title": title,
                "statement": statement,
                "acceptanceCriteria": acceptance_criteria,
                "tags": {
                    "routes": routes,
                    "changes": changes,
                    "domainRules": domain_rules
                }
            })

    return user_stories


def extract_domain_rules(content: str) -> list[str]:
    """Extract DR-xxx identifiers from conceptual_model.md."""
    pattern = r"DR-\d+"
    return list(set(re.findall(pattern, content)))


def extract_change_items(content: str) -> list[str]:
    """Extract CI-xxx identifiers from change document."""
    pattern = r"CI-\d+"
    return list(set(re.findall(pattern, content)))


def extract_routes(content: str) -> list[str]:
    """Extract route paths from ia_structure.md."""
    pattern = r"`(/[a-zA-Z0-9\-_/\[\]]+)`"
    routes = re.findall(pattern, content)
    # Also match routes without backticks
    pattern2 = r"(?:^|\s)(/[a-zA-Z0-9\-_/\[\]]+)(?:\s|$|,|\|)"
    routes.extend(re.findall(pattern2, content))
    return list(set(routes))


def build_skeleton(
    change_id: str,
    priorities: list[str],
    project_root: Path
) -> dict:
    """Build the complete skeleton JSON."""

    docs_path = project_root / "docs"

    # Read source documents
    user_stories_content = read_file(docs_path / "user_stories.md")
    conceptual_model_content = read_file(docs_path / "conceptual_model.md")
    ia_content = read_file(docs_path / "ia_structure.md")

    # Try to find change document
    change_content = ""
    change_file = change_id.replace("change-", "") + ".md"
    change_path = docs_path / "changes" / change_file
    if change_path.exists():
        change_content = read_file(change_path)

    # Extract data
    user_stories = extract_user_stories(user_stories_content, priorities)
    domain_rules = extract_domain_rules(conceptual_model_content)
    change_items = extract_change_items(change_content)
    routes = extract_routes(ia_content)

    # Build coverage indices
    coverage = {
        "byUserStory": {us["id"]: [] for us in user_stories},
        "byAcceptanceCriteria": {},
        "byDomainRule": {dr: [] for dr in sorted(domain_rules)},
        "byChangeItem": {ci: [] for ci in sorted(change_items)},
        "byRoute": {route: [] for route in sorted(routes)}
    }

    # Build AC coverage keys
    for us in user_stories:
        for ac in us["acceptanceCriteria"]:
            key = f"{us['id']}:{ac['id']}"
            coverage["byAcceptanceCriteria"][key] = []

    # Build skeleton
    skeleton = {
        "meta": {
            "name": "Jyageunfriends QC Test Cases (Skeleton)",
            "baseChange": change_id,
            "scope": {"priority": priorities},
            "sources": {
                "userStories": "docs/user_stories.md",
                "conceptualModel": "docs/conceptual_model.md",
                "changes": f"docs/changes/{change_file}",
                "ia": "docs/ia_structure.md",
                "credentials": "docs/test-credentials.md"
            },
            "idConvention": {
                "testCaseId": "TC-<US>-<AC>-<NN>",
                "status": ["todo", "in_progress", "pass", "fail", "blocked"]
            }
        },
        "userStories": user_stories,
        "coverage": coverage
    }

    return skeleton


def main():
    parser = argparse.ArgumentParser(
        description="Generate QC test case skeleton JSON"
    )
    parser.add_argument(
        "--change", "-c",
        required=True,
        help="Base change ID (e.g., change-2026-01-15-1000)"
    )
    parser.add_argument(
        "--priority", "-p",
        default="P1",
        help="Priority levels to include, comma-separated (default: P1)"
    )
    parser.add_argument(
        "--output", "-o",
        default="tasks/qc/testcases-skeleton.json",
        help="Output file path (default: tasks/qc/testcases-skeleton.json)"
    )
    parser.add_argument(
        "--root", "-r",
        help="Project root path (auto-detected if not specified)"
    )

    args = parser.parse_args()

    # Parse priorities
    priorities = [p.strip() for p in args.priority.split(",")]

    # Find project root
    if args.root:
        project_root = Path(args.root)
    else:
        project_root = find_project_root()

    print(f"Project root: {project_root}")
    print(f"Change ID: {args.change}")
    print(f"Priorities: {priorities}")

    # Build skeleton
    skeleton = build_skeleton(args.change, priorities, project_root)

    # Ensure output directory exists
    output_path = project_root / args.output
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Write output
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(skeleton, f, ensure_ascii=False, indent=2)

    # Print summary
    us_count = len(skeleton["userStories"])
    ac_count = sum(len(us["acceptanceCriteria"]) for us in skeleton["userStories"])
    dr_count = len(skeleton["coverage"]["byDomainRule"])
    ci_count = len(skeleton["coverage"]["byChangeItem"])
    route_count = len(skeleton["coverage"]["byRoute"])

    print(f"\n✅ Skeleton generated: {output_path}")
    print(f"   User Stories: {us_count}")
    print(f"   Acceptance Criteria: {ac_count}")
    print(f"   Domain Rules: {dr_count}")
    print(f"   Change Items: {ci_count}")
    print(f"   Routes: {route_count}")


if __name__ == "__main__":
    main()
