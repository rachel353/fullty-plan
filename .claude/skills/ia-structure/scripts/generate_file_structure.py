#!/usr/bin/env python3
"""
File Structure 문서 생성 스크립트

이 스크립트는 ia_structure.md와 기술 스택 정보를 읽어서
file_structure.md 파일을 생성합니다.

Usage:
    python generate_file_structure.py --ia-structure <md_path> --tech-stack <stack> --output <output_path>
"""

import argparse
import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List


def get_project_root() -> Path:
    """프로젝트 루트 디렉토리를 반환합니다."""
    script_dir = Path(__file__).resolve().parent
    return script_dir.parent.parent.parent.parent


def parse_ia_structure(md_content: str) -> Dict:
    """IA Structure 마크다운을 파싱하여 routes를 추출합니다."""
    routes = []

    # Extract routes from Route Table
    # | Route | Screen Type | User Stories | Access | Method |
    route_pattern = r"\|\s*`([^`]+)`\s*\|\s*(\w+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*(\w+)\s*\|"

    for match in re.finditer(route_pattern, md_content):
        routes.append({
            "route": match.group(1).strip(),
            "screen_type": match.group(2).strip(),
            "user_stories": match.group(3).strip(),
            "access": match.group(4).strip(),
            "method": match.group(5).strip()
        })

    return {"routes": routes}


def generate_react_vite_structure(routes: List[Dict]) -> str:
    """React + Vite 기반 파일 구조 생성"""

    lines = []

    lines.append("```")
    lines.append("src/")
    lines.append("├── main.tsx              # App entry point")
    lines.append("├── App.tsx               # Root component with routing")
    lines.append("├── pages/                # Page components (one per route)")

    # Group routes by resource
    route_groups: Dict[str, List[Dict]] = {}
    for route_info in routes:
        route = route_info["route"]
        parts = route.strip("/").split("/")
        if parts[0]:
            resource = parts[0]
            if resource not in route_groups:
                route_groups[resource] = []
            route_groups[resource].append(route_info)

    # Generate pages structure
    for resource, route_list in sorted(route_groups.items()):
        resource_title = resource.replace("_", " ").title().replace(" ", "")
        lines.append(f"│   ├── {resource}/")

        for route_info in route_list:
            screen_type = route_info["screen_type"]
            route = route_info["route"]

            # Determine file name based on route and type
            if route.endswith("/new"):
                lines.append(f"│   │   ├── {resource_title}Form.tsx      # Create new")
            elif route.endswith("/edit"):
                lines.append(f"│   │   ├── {resource_title}Edit.tsx      # Edit")
            elif ":id" in route and not route.endswith("/edit"):
                lines.append(f"│   │   ├── {resource_title}Detail.tsx    # Detail view")
            elif route == f"/{resource}":
                lines.append(f"│   │   ├── {resource_title}List.tsx      # List view")

    lines.append("│   └── Dashboard.tsx     # Dashboard/home")
    lines.append("├── components/           # Shared components")
    lines.append("│   ├── ui/               # Generic UI components")
    lines.append("│   │   ├── Button.tsx")
    lines.append("│   │   ├── Input.tsx")
    lines.append("│   │   ├── Modal.tsx")
    lines.append("│   │   └── Table.tsx")
    lines.append("│   └── domain/           # Domain-specific components")
    lines.append("│       └── ...           # Business logic components")
    lines.append("├── hooks/                # Custom React hooks")
    lines.append("│   ├── useAuth.ts")
    lines.append("│   └── useFetch.ts")
    lines.append("├── services/             # API service layer")

    # Generate services for each resource
    for resource in sorted(route_groups.keys()):
        resource_camel = resource.replace("_", " ").title().replace(" ", "")
        lines.append(f"│   ├── {resource}Service.ts")

    lines.append("├── stores/               # State management")
    lines.append("│   └── authStore.ts")
    lines.append("├── types/                # TypeScript types")
    lines.append("│   ├── index.ts")

    # Generate types for each resource
    for resource in sorted(route_groups.keys()):
        lines.append(f"│   ├── {resource}.ts")

    lines.append("├── utils/                # Utility functions")
    lines.append("│   ├── api.ts            # API client setup")
    lines.append("│   └── helpers.ts")
    lines.append("├── styles/               # Global styles")
    lines.append("│   └── index.css")
    lines.append("└── router/               # Route configuration")
    lines.append("    └── index.tsx")
    lines.append("```")

    return "\n".join(lines)


def generate_nextjs_structure(routes: List[Dict]) -> str:
    """Next.js App Router 기반 파일 구조 생성"""

    lines = []

    lines.append("```")
    lines.append("app/")
    lines.append("├── layout.tsx            # Root layout")
    lines.append("├── page.tsx              # Home page")

    # Group routes by resource
    route_groups: Dict[str, List[Dict]] = {}
    for route_info in routes:
        route = route_info["route"]
        parts = route.strip("/").split("/")
        if parts[0]:
            resource = parts[0]
            if resource not in route_groups:
                route_groups[resource] = []
            route_groups[resource].append(route_info)

    # Generate app structure
    for resource, route_list in sorted(route_groups.items()):
        lines.append(f"├── {resource}/")
        lines.append(f"│   ├── page.tsx          # List view")
        lines.append(f"│   ├── new/")
        lines.append(f"│   │   └── page.tsx      # Create form")
        lines.append(f"│   └── [id]/")
        lines.append(f"│       ├── page.tsx      # Detail view")
        lines.append(f"│       └── edit/")
        lines.append(f"│           └── page.tsx  # Edit form")

    lines.append("├── api/                  # API routes (if needed)")
    lines.append("└── components/           # Shared components")
    lines.append("    ├── ui/")
    lines.append("    └── domain/")
    lines.append("```")

    return "\n".join(lines)


def generate_file_structure(ia_data: Dict, tech_stack: str) -> str:
    """File Structure 마크다운 생성"""

    lines = []

    # Header
    lines.append("# File Structure Plan")
    lines.append("")
    lines.append(f"> Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append("> ")
    lines.append("> **Inputs:**")
    lines.append("> - IA Structure (ia_structure.md)")
    lines.append(f"> - Tech Stack: {tech_stack}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Technology Stack
    lines.append("## Technology Stack")
    lines.append("")

    if tech_stack == "react-vite":
        lines.append("- **Framework**: React 18 + Vite")
        lines.append("- **Routing**: React Router v6")
        lines.append("- **State**: Zustand / React Query")
        lines.append("- **Styling**: Tailwind CSS")
        lines.append("- **API**: Axios")
        lines.append("")
    elif tech_stack == "nextjs":
        lines.append("- **Framework**: Next.js 14+ (App Router)")
        lines.append("- **Routing**: Built-in App Router")
        lines.append("- **State**: React Context / Zustand")
        lines.append("- **Styling**: Tailwind CSS")
        lines.append("- **API**: Fetch API / Server Actions")
        lines.append("")

    lines.append("---")
    lines.append("")

    # Directory Structure
    lines.append("## Directory Structure")
    lines.append("")

    routes = ia_data.get("routes", [])

    if tech_stack == "react-vite":
        structure = generate_react_vite_structure(routes)
    elif tech_stack == "nextjs":
        structure = generate_nextjs_structure(routes)
    else:
        structure = "Unknown tech stack"

    lines.append(structure)
    lines.append("")
    lines.append("---")
    lines.append("")

    # File Mapping
    lines.append("## File Mapping")
    lines.append("")
    lines.append("### Pages (from IA Structure)")
    lines.append("")
    lines.append("| Route | File Path | Component Name |")
    lines.append("|-------|-----------|---------------|")

    for route_info in routes:
        route = route_info["route"]
        parts = route.strip("/").split("/")

        if tech_stack == "react-vite":
            # React + Vite file paths
            if route == "/":
                file_path = "src/pages/Dashboard.tsx"
                component = "Dashboard"
            elif len(parts) == 1:
                resource = parts[0].replace("_", " ").title().replace(" ", "")
                file_path = f"src/pages/{parts[0]}/{resource}List.tsx"
                component = f"{resource}List"
            elif parts[-1] == "new":
                resource = parts[0].replace("_", " ").title().replace(" ", "")
                file_path = f"src/pages/{parts[0]}/{resource}Form.tsx"
                component = f"{resource}Form"
            elif parts[-1] == "edit":
                resource = parts[0].replace("_", " ").title().replace(" ", "")
                file_path = f"src/pages/{parts[0]}/{resource}Edit.tsx"
                component = f"{resource}Edit"
            elif ":id" in route:
                resource = parts[0].replace("_", " ").title().replace(" ", "")
                file_path = f"src/pages/{parts[0]}/{resource}Detail.tsx"
                component = f"{resource}Detail"
            else:
                file_path = f"src/pages/{'/'.join(parts)}.tsx"
                component = parts[-1].title()

        elif tech_stack == "nextjs":
            # Next.js App Router file paths
            if route == "/":
                file_path = "app/page.tsx"
                component = "HomePage"
            else:
                # Convert route to app directory path
                file_path = f"app/{route}/page.tsx"
                component = "Page"

        else:
            file_path = "N/A"
            component = "N/A"

        lines.append(f"| `{route}` | `{file_path}` | {component} |")

    lines.append("")
    lines.append("---")
    lines.append("")

    # Implementation Notes
    lines.append("## Implementation Notes")
    lines.append("")
    lines.append("### Key Principles")
    lines.append("")
    lines.append("1. **One route = One page component** - Clear 1:1 mapping from IA structure")
    lines.append("2. **Lazy loading** - All page components should be code-split")
    lines.append("3. **Type safety** - TypeScript types generated from Conceptual Model")
    lines.append("4. **Service layer** - One service per domain concept")
    lines.append("5. **Shared components** - Extract reusable UI patterns")
    lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="File Structure 문서를 생성합니다."
    )
    parser.add_argument(
        "--ia-structure", "-i",
        type=str,
        required=True,
        help="IA Structure 마크다운 파일 경로"
    )
    parser.add_argument(
        "--tech-stack", "-t",
        type=str,
        choices=["react-vite", "nextjs"],
        default="react-vite",
        help="기술 스택 (기본값: react-vite)"
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        default=None,
        help="출력 파일 경로 (기본값: file_structure.md)"
    )

    args = parser.parse_args()

    # 프로젝트 루트 결정
    project_root = get_project_root()

    # IA structure 경로
    ia_path = Path(args.ia_structure)
    if not ia_path.is_absolute():
        ia_path = project_root / ia_path

    if not ia_path.exists():
        print(f"❌ Error: IA structure file not found: {ia_path}")
        return 1

    # 출력 경로 결정
    if args.output:
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = project_root / output_path
    else:
        output_path = project_root / "file_structure.md"

    # 데이터 로드
    print(f"📖 Reading IA structure: {ia_path}")
    with open(ia_path, "r", encoding="utf-8") as f:
        ia_content = f.read()

    ia_data = parse_ia_structure(ia_content)

    # File Structure 생성
    print(f"🔨 Generating file structure for {args.tech_stack}...")
    file_structure_content = generate_file_structure(ia_data, args.tech_stack)

    # 파일 작성
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(file_structure_content)

    print(f"✅ File Structure generated: {output_path}")

    return 0


if __name__ == "__main__":
    exit(main())
