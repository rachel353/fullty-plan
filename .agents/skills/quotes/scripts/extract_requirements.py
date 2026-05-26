#!/usr/bin/env python3
"""Extract requirements from combined quote and append original content from requirements.md"""

import re
import sys
from pathlib import Path


def find_client_folder(client_name):
    """Find client folder by name"""
    for folder in Path.cwd().iterdir():
        if folder.is_dir() and client_name in folder.name:
            return folder
    raise FileNotFoundError(f"Client folder containing '{client_name}' not found")


def read_file_content(file_path):
    """Read file content"""
    if file_path.exists():
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    return ""


def extract_req_ids_from_quote(quote_content):
    """Extract all REQ IDs from combined quote"""
    # Pattern to match REQ-xxx patterns
    pattern = r'\[?REQ-(\d+)\]?'
    matches = re.findall(pattern, quote_content)
    # Return unique sorted REQ IDs
    unique_ids = sorted(set(matches), key=lambda x: int(x))
    return [f"REQ-{id}" for id in unique_ids]


def extract_requirement_content(requirements_content, req_id):
    """Extract the content of a specific requirement from requirements.md"""
    lines = requirements_content.split('\n')
    result_lines = []
    in_section = False
    section_pattern = f"#### [{req_id}]"

    for i, line in enumerate(lines):
        if section_pattern in line:
            in_section = True
            result_lines.append(line)
        elif in_section:
            # Stop if we hit another section header (#### or ### or ##)
            if line.startswith('#### [REQ-') or line.startswith('### ') or line.startswith('## '):
                break
            result_lines.append(line)

    return '\n'.join(result_lines).strip()


def get_all_requirements_content(client_path):
    """Read all requirements.md files from all meeting dates"""
    meeting_scripts_dir = client_path / "meeting_scripts"
    all_content = []

    if not meeting_scripts_dir.exists():
        return ""

    # Get all meeting date folders and sort them
    meeting_folders = sorted([
        f for f in meeting_scripts_dir.iterdir()
        if f.is_dir()
    ])

    for folder in meeting_folders:
        req_file = folder / "requirements.md"
        if req_file.exists():
            content = read_file_content(req_file)
            if content:
                all_content.append(f"# From {folder.name}\n")
                all_content.append(content)
                all_content.append("\n")

    return '\n'.join(all_content)


def build_requirements_reference(quote_content, requirements_content):
    """Build the requirements reference section"""
    req_ids = extract_req_ids_from_quote(quote_content)

    if not req_ids:
        return None

    sections = []
    sections.append("---\n")
    sections.append("## 10) Requirements Reference\n")
    sections.append("본 견적서에서 참조된 요구사항의 원본 내용입니다.\n")

    for req_id in req_ids:
        content = extract_requirement_content(requirements_content, req_id)
        if content:
            sections.append(content)
            sections.append("")

    return '\n'.join(sections)


def extract_requirements(client_folder, meeting_date):
    """Extract requirements and append to combined quote"""
    client_path = Path(client_folder)
    quotes_dir = client_path / "quotes"
    combined_file = quotes_dir / f"{meeting_date}_combined.md"

    # Check files exist
    if not combined_file.exists():
        print(f"Error: Combined quote not found: {combined_file}")
        sys.exit(1)

    # Read combined quote
    quote_content = read_file_content(combined_file)

    # Read ALL requirements from all meeting dates
    requirements_content = get_all_requirements_content(client_path)

    if not requirements_content:
        print(f"Error: No requirements files found in meeting_scripts/")
        sys.exit(1)

    # Check if requirements reference already exists
    if "## 10) Requirements Reference" in quote_content:
        print(f"Requirements reference already exists in: {combined_file}")
        return combined_file

    # Build requirements reference section
    ref_section = build_requirements_reference(quote_content, requirements_content)

    if not ref_section:
        print("No REQ IDs found in combined quote.")
        return combined_file

    # Append to combined file
    with open(combined_file, 'a', encoding='utf-8') as f:
        f.write('\n')
        f.write(ref_section)

    print(f"Successfully extracted requirements to: {combined_file}")
    return combined_file


def main():
    if len(sys.argv) != 3:
        print("Usage: python extract_requirements.py [CLIENT_FOLDER] [MM.DD]")
        sys.exit(1)

    client_folder = sys.argv[1]
    meeting_date = sys.argv[2]

    try:
        if not Path(client_folder).exists():
            client_folder = find_client_folder(client_folder)
        else:
            client_folder = Path(client_folder)
        extract_requirements(client_folder, meeting_date)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
