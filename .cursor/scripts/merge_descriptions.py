"""
Merge individual description markdown files into a combined document.

Merges:
  - text_content.md (if exists, from Word extraction)
  - descriptions/*.md (image descriptions, sorted by filename)
  
Output:
  - combined.md (final merged document)
"""

import argparse
import re
from pathlib import Path
from typing import List, Optional


def natural_sort_key(path: Path) -> tuple:
    """Generate sort key for natural sorting (e.g., slide_01, slide_02, ...)."""
    name = path.stem
    # Extract numbers from filename
    numbers = re.findall(r'\d+', name)
    if numbers:
        return (name, int(numbers[0]))
    return (name, 0)


def read_text_content(text_md_path: Path) -> Optional[str]:
    """Read text_content.md if it exists."""
    if text_md_path.exists():
        return text_md_path.read_text(encoding='utf-8')
    return None


def read_descriptions(descriptions_dir: Path) -> List[str]:
    """
    Read all description markdown files, sorted naturally.
    
    Returns:
        List of markdown content strings
    """
    if not descriptions_dir.exists():
        return []
    
    md_files = sorted(
        [f for f in descriptions_dir.iterdir() if f.is_file() and f.suffix == '.md'],
        key=natural_sort_key
    )
    
    contents: List[str] = []
    for md_file in md_files:
        content = md_file.read_text(encoding='utf-8')
        contents.append(content)
    
    return contents


def merge_content(
    text_content: Optional[str],
    descriptions: List[str],
    title: str = None
) -> str:
    """
    Merge text content and image descriptions into a single markdown document.
    
    Args:
        text_content: Text content from Word document (optional)
        descriptions: List of image description markdown strings
        title: Document title (optional)
    
    Returns:
        Combined markdown content
    """
    parts: List[str] = []
    
    # Add title if provided
    if title:
        parts.append(f'# {title}\n')
    
    # Add text content first (if exists)
    if text_content:
        parts.append('## 텍스트 내용\n\n')
        parts.append(text_content)
        parts.append('\n\n---\n\n')
    
    # Add image descriptions
    if descriptions:
        if text_content:
            parts.append('## 이미지 분석\n\n')
        else:
            parts.append('# 이미지 분석\n\n')
        
        for i, desc in enumerate(descriptions, 1):
            parts.append(desc)
            if i < len(descriptions):
                parts.append('\n\n')
    
    return ''.join(parts)


def main():
    parser = argparse.ArgumentParser(
        description='Merge text content and image descriptions into combined.md'
    )
    parser.add_argument(
        'analysis_dir',
        help='Analysis directory containing text_content.md and descriptions/'
    )
    parser.add_argument(
        '--title',
        default=None,
        help='Document title (default: analysis directory name)'
    )
    
    args = parser.parse_args()
    
    analysis_dir = Path(args.analysis_dir).expanduser().resolve()
    text_md_path = analysis_dir / 'text_content.md'
    descriptions_dir = analysis_dir / 'descriptions'
    output_path = analysis_dir / 'combined.md'
    
    # Read content
    text_content = read_text_content(text_md_path)
    descriptions = read_descriptions(descriptions_dir)
    
    if not text_content and not descriptions:
        raise SystemExit(f'No content found in {analysis_dir}')
    
    # Determine title
    title = args.title if args.title else analysis_dir.stem.replace('_analysis', '')
    
    # Merge content
    combined = merge_content(text_content, descriptions, title)
    
    # Write output
    output_path.write_text(combined, encoding='utf-8')
    
    print(f'[merge] Combined document created: {output_path}')
    if text_content:
        print(f'[merge] Included text content')
    print(f'[merge] Included {len(descriptions)} image descriptions')


if __name__ == '__main__':
    main()

