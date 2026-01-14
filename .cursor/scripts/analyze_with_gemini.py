"""
Analyze images using Gemini 3 Vision API and generate detailed descriptions.

This script processes images from the analysis directory and creates
individual markdown files with Gemini-generated descriptions.

For each image in images/ folder:
  - Calls Gemini 3 Vision API directly to analyze the image
  - Creates descriptions/<image_name>.md with detailed description
"""

import argparse
import base64
import os
from pathlib import Path
from typing import List, Optional

import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Gemini 3 모델명
MODEL_NAME = os.environ.get("GEMINI_MODEL", "gemini-3.0-flash-exp")


def _detect_mime_type(image_path: Path) -> str:
    """Detect MIME type from file extension."""
    ext = image_path.suffix.lower()
    mime_types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
    }
    return mime_types.get(ext, 'image/png')


def _load_image_bytes(image_path: Path) -> bytes:
    """Load image file as bytes."""
    with image_path.open('rb') as f:
        return f.read()


def _image_to_base64(image_bytes: bytes) -> str:
    """Convert image bytes to base64 string."""
    return base64.b64encode(image_bytes).decode('utf-8')


def _ensure_api_key():
    """Ensure GEMINI_API_KEY is set and configure genai."""
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise RuntimeError('GEMINI_API_KEY environment variable is not set')
    genai.configure(api_key=api_key)


def analyze_image(
    image_path: Path,
    prompt: str = '이 이미지를 한국어로 매우 상세하게 설명해주세요. 이미지에 포함된 모든 텍스트, 그래프, 차트, 다이어그램, UI 요소 등을 포함하여 설명해주세요.'
) -> str:
    """
    Analyze an image using Gemini 3 Vision API.
    
    Args:
        image_path: Path to the image file
        prompt: Analysis prompt
    
    Returns:
        Detailed description of the image
    """
    _ensure_api_key()
    
    image_bytes = _load_image_bytes(image_path)
    b64 = _image_to_base64(image_bytes)
    mime_type = _detect_mime_type(image_path)
    
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content([
        {
            'mime_type': mime_type,
            'data': b64,
        },
        prompt,
    ])
    
    return response.text.strip() if response and response.text else ''


def process_images(
    images_dir: Path,
    descriptions_dir: Path,
    prompt: Optional[str] = None
) -> List[Path]:
    """
    Process all images in images_dir and create description markdown files.
    
    Args:
        images_dir: Directory containing images to analyze
        descriptions_dir: Directory to save description markdown files
        prompt: Custom analysis prompt (optional)
    
    Returns:
        List of created markdown file paths
    """
    descriptions_dir.mkdir(parents=True, exist_ok=True)
    
    image_files = sorted([
        f for f in images_dir.iterdir()
        if f.is_file() and f.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif', '.webp'}
    ])
    
    if not image_files:
        print(f'[analyze] No images found in {images_dir}')
        return []
    
    default_prompt = '이 이미지를 한국어로 매우 상세하게 설명해주세요. 이미지에 포함된 모든 텍스트, 그래프, 차트, 다이어그램, UI 요소 등을 포함하여 설명해주세요.'
    analysis_prompt = prompt if prompt else default_prompt
    
    created_files: List[Path] = []
    
    for i, image_path in enumerate(image_files, 1):
        print(f'[analyze] Processing {i}/{len(image_files)}: {image_path.name}')
        
        try:
            description = analyze_image(image_path, analysis_prompt)
            
            if not description:
                print(f'[analyze] Warning: No description returned for {image_path.name}')
                continue
            
            # Create markdown file
            md_name = image_path.stem + '.md'
            md_path = descriptions_dir / md_name
            
            # Generate markdown content
            image_rel_path = f'../images/{image_path.name}'
            md_content = f"""# {image_path.stem}

![{image_path.stem}]({image_rel_path})

## 이미지 분석

{description}

---
"""
            md_path.write_text(md_content, encoding='utf-8')
            created_files.append(md_path)
            print(f'[analyze] Created: {md_path}')
            
        except Exception as e:
            print(f'[analyze] Error processing {image_path.name}: {e}')
            import traceback
            traceback.print_exc()
    
    return created_files


def main():
    parser = argparse.ArgumentParser(
        description='Analyze images with Gemini 3 Vision API and generate descriptions.'
    )
    parser.add_argument(
        'analysis_dir',
        help='Analysis directory containing images/ folder'
    )
    parser.add_argument(
        '--prompt',
        default=None,
        help='Custom analysis prompt (optional)'
    )
    
    args = parser.parse_args()
    
    # GEMINI_API_KEY 확인
    if not os.environ.get('GEMINI_API_KEY'):
        raise SystemExit('GEMINI_API_KEY environment variable is not set')
    
    analysis_dir = Path(args.analysis_dir).expanduser().resolve()
    images_dir = analysis_dir / 'images'
    descriptions_dir = analysis_dir / 'descriptions'
    
    if not images_dir.exists():
        raise SystemExit(f'Images directory not found: {images_dir}')
    
    created_files = process_images(images_dir, descriptions_dir, args.prompt)
    
    print(f'\n[analyze] Completed: {len(created_files)} description files created')


if __name__ == '__main__':
    main()
