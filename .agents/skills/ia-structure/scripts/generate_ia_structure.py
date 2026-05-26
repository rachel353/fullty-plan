#!/usr/bin/env python3
"""
IA Structure 문서 생성 스크립트

이 스크립트는 user_stories_data.json과 conceptual_model.md를 읽어서
ia_structure.md 파일을 생성합니다.

Usage:
    python generate_ia_structure.py --user-stories <json_path> --conceptual-model <md_path> --output <output_path>
"""

import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List


def get_project_root() -> Path:
    """프로젝트 루트 디렉토리를 반환합니다."""
    script_dir = Path(__file__).resolve().parent
    # .claude/skills/ia-structure/scripts/ -> 프로젝트 루트
    return script_dir.parent.parent.parent.parent


def parse_conceptual_model(md_content: str) -> Dict:
    """
    Conceptual Model 마크다운을 파싱하여 concepts와 user interactions를 추출합니다.
    """
    concepts = []
    user_interactions = {}

    # Extract concept names from "### Concept:" sections
    concept_pattern = r"### Concept: (.+?)\n"
    for match in re.finditer(concept_pattern, md_content):
        concepts.append(match.group(1).strip())

    # Extract user-concept interactions (simplified parsing)
    # Look for sections like "**일반 사용자:**" or "**관리자:**"
    actor_section_pattern = r"\*\*(.+?):\*\*\s*\n((?:- .+\n?)+)"
    for match in re.finditer(actor_section_pattern, md_content):
        actor = match.group(1).strip()
        actions_text = match.group(2).strip()
        # Extract actions (Create, View, Edit, etc.)
        actions = re.findall(r"- \*\*(.+?)\*\*:", actions_text)
        user_interactions[actor] = actions

    return {
        "concepts": concepts,
        "user_interactions": user_interactions
    }


def infer_screen_from_action(action: str, resource: str) -> Dict:
    """
    User Story의 action으로부터 필요한 screen을 추론합니다.

    Returns:
        {
            "route": "/path",
            "screen_type": "list|detail|form|modal",
            "method": "GET|POST|PUT|DELETE"
        }
    """
    action_lower = action.lower()

    # Common patterns
    if "등록" in action or "생성" in action or "추가" in action or "create" in action_lower:
        return {
            "route": f"/{resource}/new",
            "screen_type": "form",
            "method": "POST",
            "purpose": f"Create new {resource}"
        }
    elif "조회" in action or "확인" in action or "view" in action_lower or "see" in action_lower:
        # Could be list or detail - default to list
        return {
            "route": f"/{resource}",
            "screen_type": "list",
            "method": "GET",
            "purpose": f"View {resource} list"
        }
    elif "수정" in action or "편집" in action or "edit" in action_lower or "update" in action_lower:
        return {
            "route": f"/{resource}/:id/edit",
            "screen_type": "form",
            "method": "PUT",
            "purpose": f"Edit {resource}"
        }
    elif "삭제" in action or "제거" in action or "delete" in action_lower:
        return {
            "route": f"/{resource}/:id",
            "screen_type": "modal",
            "method": "DELETE",
            "purpose": f"Delete {resource}"
        }
    elif "검색" in action or "필터" in action or "search" in action_lower or "filter" in action_lower:
        return {
            "route": f"/{resource}",
            "screen_type": "list",
            "method": "GET",
            "purpose": f"Search/filter {resource}"
        }
    elif "다운로드" in action or "내보내기" in action or "export" in action_lower or "download" in action_lower:
        return {
            "route": f"/{resource}/export",
            "screen_type": "function",
            "method": "GET",
            "purpose": f"Export {resource}"
        }
    else:
        # Default to detail view
        return {
            "route": f"/{resource}/:id",
            "screen_type": "detail",
            "method": "GET",
            "purpose": action
        }


def generate_ia_structure(user_stories_data: Dict, conceptual_model_data: Dict) -> str:
    """IA Structure 마크다운 생성"""

    lines = []

    # Header
    lines.append("# Information Architecture")
    lines.append("")
    lines.append(f"> Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append("> ")
    lines.append("> **Inputs:**")
    lines.append("> - User Stories Data (user_stories_data.json)")
    lines.append("> - Conceptual Model (conceptual_model.md)")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Extract data
    actors_data = user_stories_data.get("actors", [])
    stories_data = user_stories_data.get("user_stories", [])

    # Build screen map: actor -> resource -> screens
    screen_map: Dict[str, Dict[str, List[Dict]]] = {}
    story_to_screens: Dict[str, List[str]] = {}

    for story in stories_data:
        story_id = story.get("id", "")
        actor_id = story.get("actor_id", "")
        actor_name = next((a.get("name", "") for a in actors_data if a.get("id") == actor_id), "Unknown")

        # Parse story to extract action and resource
        story_text = story.get("story", "")
        # Pattern: "As a X, I want to [action], So that Y"
        action_match = re.search(r"I want to\s+(.+?),", story_text, re.IGNORECASE)
        if not action_match:
            continue

        action = action_match.group(1).strip()

        # Infer resource from domain or story content
        domain = story.get("domain", "").lower().replace(" ", "_")
        if not domain:
            # Try to infer from action
            domain = "general"

        # Infer screen from action
        screen_info = infer_screen_from_action(action, domain)
        screen_info["user_story"] = story_id
        screen_info["actor"] = actor_name

        # Add to screen map
        if actor_name not in screen_map:
            screen_map[actor_name] = {}
        if domain not in screen_map[actor_name]:
            screen_map[actor_name][domain] = []

        screen_map[actor_name][domain].append(screen_info)

        # Track story-to-screen mapping
        if story_id not in story_to_screens:
            story_to_screens[story_id] = []
        story_to_screens[story_id].append(screen_info["route"])

    # Generate Screen Hierarchy section
    lines.append("## Screen Hierarchy")
    lines.append("")

    for actor_name, resources in screen_map.items():
        lines.append(f"### Role: {actor_name}")
        lines.append("")

        for resource, screens in resources.items():
            resource_title = resource.replace("_", " ").title()
            lines.append(f"#### {resource_title}")
            lines.append("")

            # Group screens by type
            unique_screens = {}
            for screen in screens:
                route = screen["route"]
                if route not in unique_screens:
                    unique_screens[route] = screen
                else:
                    # Merge user stories
                    if screen["user_story"] not in unique_screens[route].get("user_story", ""):
                        unique_screens[route]["user_story"] += f", {screen['user_story']}"

            for route, screen in unique_screens.items():
                lines.append(f"- **Route**: `{route}`")
                lines.append(f"  - **Type**: {screen['screen_type']}")
                lines.append(f"  - **Purpose**: {screen['purpose']}")
                lines.append(f"  - **User Stories**: {screen['user_story']}")
                lines.append(f"  - **Access**: {screen['actor']}")
                lines.append("")

        lines.append("")

    # Route Table
    lines.append("## Route Table")
    lines.append("")
    lines.append("| Route | Screen Type | User Stories | Access | Method |")
    lines.append("|-------|-------------|--------------|--------|--------|")

    all_routes = []
    for actor_name, resources in screen_map.items():
        for resource, screens in resources.items():
            for screen in screens:
                route = screen["route"]
                if route not in [r["route"] for r in all_routes]:
                    all_routes.append(screen)

    for screen in sorted(all_routes, key=lambda x: x["route"]):
        lines.append(f"| `{screen['route']}` | {screen['screen_type']} | {screen['user_story']} | {screen['actor']} | {screen['method']} |")

    lines.append("")
    lines.append("---")
    lines.append("")

    # User Story Coverage
    lines.append("## User Story Coverage")
    lines.append("")
    lines.append(f"- **Total User Stories**: {len(stories_data)}")
    lines.append(f"- **Mapped to Screens**: {len(story_to_screens)}")
    coverage_pct = (len(story_to_screens) / len(stories_data) * 100) if stories_data else 0
    lines.append(f"- **Coverage**: {coverage_pct:.0f}% {'✅' if coverage_pct == 100 else '⚠️'}")
    lines.append("")

    lines.append("### Coverage Details")
    lines.append("")
    lines.append("| User Story | Mapped Screens |")
    lines.append("|-----------|---------------|")

    for story in stories_data:
        story_id = story.get("id", "")
        screens = story_to_screens.get(story_id, [])
        if screens:
            lines.append(f"| {story_id} | {', '.join(f'`{s}`' for s in screens)} |")
        else:
            lines.append(f"| {story_id} | ⚠️ No screen mapped |")

    lines.append("")
    lines.append("---")
    lines.append("")

    # Validation Notes
    if coverage_pct < 100:
        lines.append("## ⚠️ Validation Issues")
        lines.append("")
        lines.append("The following user stories have no mapped screens:")
        lines.append("")
        for story in stories_data:
            story_id = story.get("id", "")
            if story_id not in story_to_screens or not story_to_screens[story_id]:
                lines.append(f"- **{story_id}**: {story.get('story', '')}")
        lines.append("")
        lines.append("**Action Required:** Review these stories and add corresponding screens to achieve 100% coverage.")
        lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="IA Structure 문서를 생성합니다."
    )
    parser.add_argument(
        "--user-stories", "-u",
        type=str,
        required=True,
        help="User Stories 데이터 JSON 파일 경로"
    )
    parser.add_argument(
        "--conceptual-model", "-c",
        type=str,
        required=True,
        help="Conceptual Model 마크다운 파일 경로"
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        default=None,
        help="출력 파일 경로 (기본값: ia_structure.md)"
    )

    args = parser.parse_args()

    # 프로젝트 루트 결정
    project_root = get_project_root()

    # User stories 경로
    user_stories_path = Path(args.user_stories)
    if not user_stories_path.is_absolute():
        user_stories_path = project_root / user_stories_path

    if not user_stories_path.exists():
        print(f"❌ Error: User stories file not found: {user_stories_path}")
        return 1

    # Conceptual model 경로
    conceptual_model_path = Path(args.conceptual_model)
    if not conceptual_model_path.is_absolute():
        conceptual_model_path = project_root / conceptual_model_path

    if not conceptual_model_path.exists():
        print(f"❌ Error: Conceptual model file not found: {conceptual_model_path}")
        return 1

    # 출력 경로 결정
    if args.output:
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = project_root / output_path
    else:
        output_path = project_root / "ia_structure.md"

    # 데이터 로드
    print(f"📖 Reading user stories: {user_stories_path}")
    with open(user_stories_path, "r", encoding="utf-8") as f:
        user_stories_data = json.load(f)

    print(f"📖 Reading conceptual model: {conceptual_model_path}")
    with open(conceptual_model_path, "r", encoding="utf-8") as f:
        conceptual_model_content = f.read()

    conceptual_model_data = parse_conceptual_model(conceptual_model_content)

    # IA Structure 생성
    print("🔨 Generating IA structure...")
    ia_content = generate_ia_structure(user_stories_data, conceptual_model_data)

    # 파일 작성
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(ia_content)

    print(f"✅ IA Structure generated: {output_path}")

    return 0


if __name__ == "__main__":
    exit(main())
