#!/usr/bin/env python3
"""Merge PRD component files into a single deliverable."""

import sys
from pathlib import Path

PRD_FILE_ORDER = [
    "overview.md",
    "requirements_trace.md",
    "ia_pages.md",
    "page_specs.md",
    "handover.md",
]


def find_client_folder(client_hint: str) -> Path:
    """Return the first client folder that contains the hint string."""
    cwd = Path.cwd()
    for folder in cwd.iterdir():
        if folder.is_dir() and client_hint in folder.name:
            return folder
    raise FileNotFoundError(f"Client folder containing '{client_hint}' not found")


def read_file_content(file_path: Path) -> str:
    """Read and return text content from a file."""
    with open(file_path, "r", encoding="utf-8") as handle:
        return handle.read().rstrip()  # strip trailing whitespace for clean merges


def merge_prd_files(client_folder: Path, meeting_date: str) -> Path:
    """Merge the five PRD component files."""
    prd_root = client_folder / "prd"
    meeting_dir = prd_root / meeting_date
    output_file = prd_root / f"{meeting_date}_prd.md"

    missing = []
    contents = []
    for filename in PRD_FILE_ORDER:
        file_path = meeting_dir / filename
        if not file_path.exists():
            missing.append(file_path)
            continue
        contents.append((filename, read_file_content(file_path)))

    if missing:
        error_lines = "\n".join(f"  - {path}" for path in missing)
        raise FileNotFoundError(f"Missing required PRD files:\n{error_lines}")

    client_name = client_folder.name.split("_", maxsplit=2)[-1]
    merged_parts = [f"# PRD - {client_name} - {meeting_date}", ""]

    for filename, body in contents:
        merged_parts.append(f"<!-- Source: {filename} -->")
        merged_parts.append(body)
        merged_parts.append("")  # blank line between sections

    prd_root.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as handle:
        handle.write("\n".join(merged_parts).rstrip() + "\n")

    print(f"Successfully merged PRD files into: {output_file}")
    return output_file


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python merge_prd_files.py [CLIENT_FOLDER_OR_NAME] [MM.DD]")
        sys.exit(1)

    client_hint = sys.argv[1]
    meeting_date = sys.argv[2]

    candidate = Path(client_hint)
    if candidate.exists():
        client_folder = candidate.resolve()
    else:
        client_folder = find_client_folder(client_hint)

    try:
        merge_prd_files(client_folder, meeting_date)
    except Exception as exc:  # pragma: no cover - simple CLI
        print(f"Error: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
