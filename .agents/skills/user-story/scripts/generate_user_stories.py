#!/usr/bin/env python3
"""
User Stories 문서 생성 스크립트

이 스크립트는 user_stories_data.json을 읽어서 user_stories.md 파일을 생성합니다.
- 출력 디렉토리가 없으면 생성
- 파일이 없으면 생성, 있으면 덮어쓰기

Usage:
    python generate_user_stories.py --data <json_path> --output <md_path>
"""

import argparse
import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict


def get_project_root() -> Path:
    """프로젝트 루트 디렉토리를 반환합니다."""
    script_dir = Path(__file__).resolve().parent
    # .claude/skills/user-story/scripts/ -> 프로젝트 루트
    return script_dir.parent.parent.parent.parent


def parse_story_field(story_text: str) -> Dict[str, str]:
    """
    "As a X, I want to Y, So that Z" 형식의 story 필드를 파싱합니다.
    
    Returns:
        {"actor": X, "action": Y, "value": Z}
    """
    result = {"actor": "", "action": "", "value": ""}
    
    if not story_text:
        return result
    
    # Pattern: "As a [actor], I want to [action], So that [value]"
    # 또는 한글: "As a [actor], I want to [action], So that [value]"
    
    # Try regex first
    pattern = r"As a\s+(.+?),\s*I want to\s+(.+?),\s*So that\s+(.+)"
    match = re.match(pattern, story_text, re.IGNORECASE)
    
    if match:
        result["actor"] = match.group(1).strip()
        result["action"] = match.group(2).strip()
        result["value"] = match.group(3).strip()
    else:
        # Fallback: split by comma
        parts = story_text.split(", ")
        if len(parts) >= 1:
            result["actor"] = parts[0].replace("As a ", "").replace("As a", "").strip()
        if len(parts) >= 2:
            result["action"] = parts[1].replace("I want to ", "").replace("I want to", "").strip()
        if len(parts) >= 3:
            result["value"] = parts[2].replace("So that ", "").replace("So that", "").strip()
    
    return result


def generate_markdown(data: dict) -> str:
    """JSON 데이터를 기반으로 마크다운 문서를 생성합니다."""
    
    actors_data = data.get("actors", [])
    stories_data = data.get("user_stories", [])
    priority_levels = data.get("priority_levels", {
        "P1": "Must Have - MVP 필수",
        "P2": "Should Have - MVP 이후 가능",
        "P3": "Nice to Have - 편의 기능"
    })
    ambiguities = data.get("ambiguities", [])
    
    lines = []
    
    # 헤더
    lines.append("# User Stories")
    lines.append("")
    lines.append(f"> Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append("> ")
    lines.append("> 이 문서는 자동 생성되었습니다. 내용을 검토하고 필요에 따라 수정하세요.")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Priority Levels 섹션
    lines.append("## Priority Levels")
    lines.append("")
    for level, description in priority_levels.items():
        lines.append(f"- **{level}**: {description}")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Actors 섹션
    lines.append("## Actors")
    lines.append("")
    if actors_data:
        for actor in actors_data:
            actor_id = actor.get("id", "")
            actor_name = actor.get("name", actor_id)
            actor_desc = actor.get("description", "")
            permissions = actor.get("permissions", [])
            goals = actor.get("goals", [])
            
            lines.append(f"### {actor_name}")
            if actor_desc:
                lines.append(f"- **설명**: {actor_desc}")
            if permissions:
                lines.append(f"- **권한**: {', '.join(permissions)}")
            if goals:
                lines.append(f"- **목표**: {', '.join(goals)}")
            lines.append("")
    else:
        lines.append("<!-- Actor를 정의하세요 -->")
        lines.append("### {Actor Name}")
        lines.append("- **설명**: {Actor 설명}")
        lines.append("")
    
    lines.append("---")
    lines.append("")
    
    # User Stories 섹션 - Priority별로 그룹화
    lines.append("## User Stories")
    lines.append("")
    
    # Actor ID -> Actor Name 매핑
    actor_map = {a.get("id", ""): a.get("name", a.get("id", "Unknown")) for a in actors_data}
    
    if stories_data:
        # Priority별로 그룹화
        by_priority = {"P1": [], "P2": [], "P3": []}
        for story in stories_data:
            priority = story.get("priority", "P1")
            if priority not in by_priority:
                by_priority[priority] = []
            by_priority[priority].append(story)
        
        for priority in ["P1", "P2", "P3"]:
            stories = by_priority.get(priority, [])
            if not stories:
                continue
            
            lines.append(f"### {priority} - {priority_levels.get(priority, '')}")
            lines.append("")
            
            for story in stories:
                story_id = story.get("id", "US-XXX")
                
                # story 필드 파싱 (새 형식)
                story_text = story.get("story", "")
                if story_text:
                    parsed = parse_story_field(story_text)
                    actor = parsed["actor"]
                    action = parsed["action"]
                    value = parsed["value"]
                    story_title = action  # action을 제목으로 사용
                else:
                    # 기존 형식 (title, actor, action, value 개별 필드)
                    story_title = story.get("title", "{제목}")
                    actor = story.get("actor", "{Actor}")
                    action = story.get("action", "{행동}")
                    value = story.get("value", "{가치}")
                
                # actor_id가 있으면 이름으로 변환
                actor_id = story.get("actor_id", "")
                if actor_id and actor_id in actor_map:
                    actor = actor_map[actor_id]
                
                acceptance_criteria = story.get("acceptance_criteria", [])
                domain = story.get("domain", "")
                
                lines.append(f"#### {story_id}: {story_title}")
                if domain:
                    lines.append(f"*Domain: {domain}*")
                lines.append("")
                lines.append(f"**As a** {actor}")
                lines.append(f"**I want to** {action}")
                lines.append(f"**So that** {value}")
                lines.append("")
                lines.append("**Acceptance Criteria:**")
                if acceptance_criteria:
                    for ac in acceptance_criteria:
                        # AC가 이미 "AC-N:" 형식이면 그대로, 아니면 추가
                        if ac.startswith("AC-") or ac.startswith("- "):
                            lines.append(f"- [ ] {ac}")
                        else:
                            lines.append(f"- [ ] {ac}")
                else:
                    lines.append("- [ ] {AC 1}")
                    lines.append("- [ ] {AC 2}")
                lines.append("")
        
        lines.append("---")
        lines.append("")
    else:
        # 빈 템플릿
        lines.append("### P1 - Must Have")
        lines.append("")
        lines.append("#### US-001: {제목}")
        lines.append("")
        lines.append("**As a** {Actor}")
        lines.append("**I want to** {행동}")
        lines.append("**So that** {가치}")
        lines.append("")
        lines.append("**Acceptance Criteria:**")
        lines.append("- [ ] {AC 1}")
        lines.append("- [ ] {AC 2}")
        lines.append("")
    
    # Ambiguities 섹션 (있는 경우)
    if ambiguities:
        lines.append("## ⚠️ Ambiguities (Human Input Required)")
        lines.append("")
        for amb in ambiguities:
            amb_id = amb.get("id", "q?")
            amb_type = amb.get("type", "unknown")
            original = amb.get("original", "")
            question = amb.get("question", "")
            context = amb.get("context", "")
            impact = amb.get("impact", "")
            suggestions = amb.get("suggestions", [])
            
            lines.append(f"### {amb_id}: {original}")
            lines.append(f"- **Type**: {amb_type}")
            lines.append(f"- **Context**: {context}")
            lines.append(f"- **Question**: {question}")
            if suggestions:
                lines.append(f"- **Suggestions**: {', '.join(suggestions)}")
            if impact:
                lines.append(f"- **Impact**: {impact}")
            lines.append("")
        lines.append("---")
        lines.append("")
    
    # Summary
    lines.append("## Summary")
    lines.append("")
    lines.append(f"- **Total Actors**: {len(actors_data)}")
    lines.append(f"- **Total User Stories**: {len(stories_data)}")
    
    # Priority 분포
    p1_count = len([s for s in stories_data if s.get("priority") == "P1"])
    p2_count = len([s for s in stories_data if s.get("priority") == "P2"])
    p3_count = len([s for s in stories_data if s.get("priority") == "P3"])
    lines.append(f"  - P1: {p1_count}")
    lines.append(f"  - P2: {p2_count}")
    lines.append(f"  - P3: {p3_count}")
    
    if ambiguities:
        lines.append(f"- **Ambiguities**: {len(ambiguities)} (requires human input)")
    
    lines.append("")
    
    return "\n".join(lines)


def ensure_directory(path: Path) -> None:
    """디렉토리가 존재하지 않으면 생성합니다."""
    path.mkdir(parents=True, exist_ok=True)
    print(f"✓ Directory ensured: {path}")


def write_file(path: Path, content: str) -> None:
    """파일을 작성합니다 (존재하면 덮어쓰기)."""
    action = "Updated" if path.exists() else "Created"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✓ {action}: {path}")


def main():
    parser = argparse.ArgumentParser(
        description="User Stories 문서를 생성합니다."
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        default=None,
        help="출력 파일 경로 (기본값: docs/user_stories.md)"
    )
    parser.add_argument(
        "--data", "-d",
        type=str,
        required=True,
        help="User Stories 데이터 JSON 파일 경로"
    )
    
    args = parser.parse_args()
    
    # 프로젝트 루트 결정
    project_root = get_project_root()
    
    # 데이터 파일 경로
    data_path = Path(args.data)
    if not data_path.is_absolute():
        data_path = project_root / data_path
    
    if not data_path.exists():
        print(f"❌ Error: Data file not found: {data_path}")
        return 1
    
    # 출력 경로 결정
    if args.output:
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = project_root / output_path
    else:
        output_path = project_root / "docs" / "user_stories.md"
    
    # 데이터 로드
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # 출력 디렉토리 확인/생성
    ensure_directory(output_path.parent)
    
    # 마크다운 생성
    markdown_content = generate_markdown(data)
    
    # 파일 작성
    write_file(output_path, markdown_content)
    
    print(f"\n✅ User Stories 문서가 성공적으로 생성되었습니다!")
    print(f"   경로: {output_path}")
    
    return 0


if __name__ == "__main__":
    exit(main())

