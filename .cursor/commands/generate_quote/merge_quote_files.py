#!/usr/bin/env python3
"""Merge quote files into combined document"""

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


def extract_section(content, section_number):
    """Extract section from markdown"""
    lines = content.split('\n')
    section_lines = []
    in_section = False
    section_header = f"## {section_number})"
    
    for line in lines:
        if line.startswith(section_header):
            in_section = True
            section_lines.append(line)
        elif in_section:
            if line.startswith('## ') and not line.startswith(section_header):
                break
            section_lines.append(line)
    
    return '\n'.join(section_lines).strip()


def merge_quote_files(client_folder, meeting_date):
    """Merge quote files into combined document"""
    client_path = Path(client_folder)
    quotes_dir = client_path / "quotes"
    meeting_quotes_dir = quotes_dir / meeting_date
    
    background_file = meeting_quotes_dir / "background.md"
    ia_structure_file = meeting_quotes_dir / "ia_structure.md"
    spec_quote_file = meeting_quotes_dir / "specification_and_quote.md"
    output_file = quotes_dir / f"{meeting_date}_combined.md"
    
    # Check files exist
    missing_files = [f for f in [background_file, ia_structure_file, spec_quote_file] if not f.exists()]
    if missing_files:
        print("Error: Required files not found:")
        for file in missing_files:
            print(f"  - {file}")
        sys.exit(1)
    
    # Read files
    background_content = read_file_content(background_file)
    ia_structure_content = read_file_content(ia_structure_file)
    spec_quote_content = read_file_content(spec_quote_file)
    
    # Extract client name
    client_name = client_path.name.split('_')[-1] if '_' in client_path.name else client_path.name
    
    # Build merged content
    merged_content = [f"# 견적서 - {client_name} - {meeting_date}\n"]
    
    # Background sections (0-5)
    for section_num in range(6):
        section_content = extract_section(background_content, section_num)
        if section_content:
            merged_content.append(section_content)
            merged_content.append("")
    
    merged_content.append("---\n")
    
    # IA Structure (section 6)
    if ia_structure_content.startswith("## 6)"):
        merged_content.append(ia_structure_content)
    elif ia_structure_content.startswith("# Visual Site Map"):
        ia_structure_content = ia_structure_content.replace("# Visual Site Map", "## 6) Visual Site Map (Structure)", 1)
        merged_content.append(ia_structure_content)
    else:
        merged_content.append("## 6) Visual Site Map (Structure)\n")
        merged_content.append(ia_structure_content)
    merged_content.append("")
    
    merged_content.append("---\n")
    
    # Specification sections (7-9)
    for section_num in range(7, 10):
        section_content = extract_section(spec_quote_content, section_num)
        if section_content:
            merged_content.append(section_content)
            merged_content.append("")
    
    # Write output
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(merged_content))
    
    print(f"Successfully merged: {output_file}")
    return output_file


def main():
    if len(sys.argv) != 3:
        print("Usage: python merge_quote_files.py [CLIENT_FOLDER] [MM.DD]")
        sys.exit(1)
    
    client_folder = sys.argv[1]
    meeting_date = sys.argv[2]
    
    try:
        if not Path(client_folder).exists():
            client_folder = find_client_folder(client_folder)
        else:
            client_folder = Path(client_folder)
        merge_quote_files(client_folder, meeting_date)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
