#!/usr/bin/env python3
"""Simple Perplexity Search API script."""

import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

try:
    from perplexity import Perplexity
except ImportError:
    print("Error: perplexityai package not found. Install it with: pip install perplexityai", file=sys.stderr)
    sys.exit(1)


def get_api_key() -> str:
    """Get Perplexity API key from environment variable."""
    api_key = os.environ.get("PERPLEXITY_API_KEY")
    if not api_key:
        print("Error: PERPLEXITY_API_KEY environment variable is not set.", file=sys.stderr)
        print("Please set it with: export PERPLEXITY_API_KEY='your_api_key'", file=sys.stderr)
        sys.exit(1)
    return api_key


def search(query: str, max_results: int = 10) -> str:
    """Search using Perplexity Search API and return formatted results."""
    try:
        api_key = get_api_key()
        client = Perplexity(api_key=api_key)
        
        search_result = client.search.create(
            query=query,
            max_results=max_results,
            max_tokens_per_page=2048
        )
        
        if not search_result.results:
            return "검색 결과를 찾을 수 없습니다."
        
        # 결과를 텍스트로 포맷팅
        output = []
        for i, result in enumerate(search_result.results, 1):
            output.append(f"[{i}] {result.title}")
            output.append(f"URL: {result.url}")
            if result.snippet:
                snippet = result.snippet[:500] + "..." if len(result.snippet) > 500 else result.snippet
                output.append(f"내용: {snippet}")
            if result.date:
                output.append(f"날짜: {result.date}")
            output.append("")
        
        return "\n".join(output)
    except Exception as e:
        return f"검색 중 오류 발생: {str(e)}"


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python perplexity_search.py <search_query>")
        sys.exit(1)
    
    query = " ".join(sys.argv[1:])
    result = search(query)
    print(result)


if __name__ == "__main__":
    main()

