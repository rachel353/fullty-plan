"""
Extract images from supported files.

- PowerPoint: export slide screenshots via PowerPoint COM (Windows)
- Images: copy into images folder

Output structure (for input foo.pptx):
foo_analysis/
  images/
    slide_01.png
    ...
"""

import argparse
import os
import shutil
from pathlib import Path
from typing import List


SUPPORTED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
SUPPORTED_PPT_EXTS = {".pptx", ".ppt"}


def ensure_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def export_ppt_slides(ppt_path: Path, images_dir: Path, width: int = 1920, height: int = 1080) -> List[Path]:
    """Export all slides as PNG using PowerPoint COM."""
    import comtypes.client

    powerpoint = comtypes.client.CreateObject("PowerPoint.Application")
    powerpoint.Visible = 1
    output_paths: List[Path] = []

    try:
        presentation = powerpoint.Presentations.Open(str(ppt_path))
        for i, slide in enumerate(presentation.Slides, 1):
            out_path = images_dir / f"slide_{i:02d}.png"
            slide.Export(str(out_path), "PNG", width, height)
            output_paths.append(out_path)
            print(f"[ppt] slide {i} -> {out_path}")
        presentation.Close()
    finally:
        powerpoint.Quit()

    return output_paths


def copy_image(src: Path, images_dir: Path) -> Path:
    dest = images_dir / src.name
    if src.resolve() != dest.resolve():
        shutil.copy2(src, dest)
    print(f"[img] copied -> {dest}")
    return dest


def process_file(source: Path, target_dir: Path) -> Path:
    analysis_dir = target_dir / f"{source.stem}_analysis"
    images_dir = ensure_dir(analysis_dir / "images")

    ext = source.suffix.lower()
    if ext in SUPPORTED_PPT_EXTS:
        export_ppt_slides(source, images_dir)
    elif ext in SUPPORTED_IMAGE_EXTS:
        copy_image(source, images_dir)
    else:
        raise ValueError(f"Unsupported file type for image extraction: {ext}")

    return analysis_dir


def main():
    parser = argparse.ArgumentParser(description="Extract images (PPT screenshots / images).")
    parser.add_argument("source", help="Input file path (pptx/ppt or image)")
    parser.add_argument("-t", "--target-dir", default=".", help="Output base directory")
    args = parser.parse_args()

    src = Path(args.source).expanduser().resolve()
    if not src.exists():
        raise SystemExit(f"Source not found: {src}")

    target_dir = Path(args.target_dir).expanduser().resolve()
    ensure_dir(target_dir)

    analysis_dir = process_file(src, target_dir)
    print(f"Analysis directory: {analysis_dir}")


if __name__ == "__main__":
    main()

