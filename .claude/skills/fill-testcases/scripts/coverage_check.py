#!/usr/bin/env python3
"""
QC Test Case Coverage Checker

Parses testcases JSON and reports coverage gaps:
- ACs with empty testCases arrays
- Coverage keys (DR/CI/Route) with no TCs
"""

import argparse
import json
import sys
from pathlib import Path


def load_json(path: str) -> dict:
    """Load and parse JSON file."""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def check_ac_coverage(data: dict) -> list[dict]:
    """Find ACs with empty testCases arrays."""
    gaps = []
    for us in data.get('userStories', []):
        us_id = us.get('id', 'UNKNOWN')
        for ac in us.get('acceptanceCriteria', []):
            ac_id = ac.get('id', 'UNKNOWN')
            tc_count = len(ac.get('testCases', []))
            if tc_count == 0:
                gaps.append({
                    'type': 'AC',
                    'key': f"{us_id}:{ac_id}",
                    'text': ac.get('text', '')[:50]
                })
    return gaps


def check_coverage_keys(data: dict) -> list[dict]:
    """Find coverage keys with empty TC arrays."""
    gaps = []
    coverage = data.get('coverage', {})

    for category, keys in coverage.items():
        if not isinstance(keys, dict):
            continue
        for key, tcs in keys.items():
            if len(tcs) == 0:
                gaps.append({
                    'type': category,
                    'key': key,
                    'text': ''
                })
    return gaps


def calculate_stats(data: dict) -> dict:
    """Calculate coverage statistics."""
    stats = {
        'total_us': 0,
        'total_ac': 0,
        'total_tc': 0,
        'covered_ac': 0,
        'coverage_keys': {}
    }

    for us in data.get('userStories', []):
        stats['total_us'] += 1
        for ac in us.get('acceptanceCriteria', []):
            stats['total_ac'] += 1
            tc_count = len(ac.get('testCases', []))
            stats['total_tc'] += tc_count
            if tc_count > 0:
                stats['covered_ac'] += 1

    coverage = data.get('coverage', {})
    for category, keys in coverage.items():
        if isinstance(keys, dict):
            total = len(keys)
            covered = sum(1 for tcs in keys.values() if len(tcs) > 0)
            stats['coverage_keys'][category] = {'total': total, 'covered': covered}

    return stats


def print_report(ac_gaps: list, coverage_gaps: list, stats: dict):
    """Print coverage report."""
    print("=" * 60)
    print("QC COVERAGE CHECK REPORT")
    print("=" * 60)

    # Statistics
    print("\n## Statistics")
    print(f"  User Stories: {stats['total_us']}")
    print(f"  Acceptance Criteria: {stats['total_ac']}")
    print(f"  Test Cases: {stats['total_tc']}")

    if stats['total_ac'] > 0:
        ac_pct = (stats['covered_ac'] / stats['total_ac']) * 100
        print(f"  AC Coverage: {stats['covered_ac']}/{stats['total_ac']} ({ac_pct:.1f}%)")

    for category, data in stats['coverage_keys'].items():
        if data['total'] > 0:
            pct = (data['covered'] / data['total']) * 100
            print(f"  {category}: {data['covered']}/{data['total']} ({pct:.1f}%)")

    # AC Gaps
    if ac_gaps:
        print(f"\n## Missing TC for AC ({len(ac_gaps)} gaps)")
        for gap in ac_gaps:
            print(f"  - [{gap['key']}] {gap['text']}...")
    else:
        print("\n## AC Coverage: COMPLETE")

    # Coverage Key Gaps
    if coverage_gaps:
        print(f"\n## Uncovered Keys ({len(coverage_gaps)} gaps)")
        for gap in coverage_gaps:
            print(f"  - [{gap['type']}] {gap['key']}")
    else:
        print("\n## Coverage Keys: COMPLETE")

    # Summary
    print("\n" + "=" * 60)
    total_gaps = len(ac_gaps) + len(coverage_gaps)
    if total_gaps == 0:
        print("RESULT: ALL COVERAGE CHECKS PASSED")
    else:
        print(f"RESULT: {total_gaps} GAPS FOUND - ACTION REQUIRED")
    print("=" * 60)

    return total_gaps


def main():
    parser = argparse.ArgumentParser(description='Check QC test case coverage')
    parser.add_argument('--input', '-i', required=True, help='Path to testcases JSON')
    parser.add_argument('--json', action='store_true', help='Output as JSON')
    args = parser.parse_args()

    if not Path(args.input).exists():
        print(f"Error: File not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    data = load_json(args.input)

    ac_gaps = check_ac_coverage(data)
    coverage_gaps = check_coverage_keys(data)
    stats = calculate_stats(data)

    if args.json:
        result = {
            'stats': stats,
            'ac_gaps': ac_gaps,
            'coverage_gaps': coverage_gaps,
            'total_gaps': len(ac_gaps) + len(coverage_gaps)
        }
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        total_gaps = print_report(ac_gaps, coverage_gaps, stats)
        sys.exit(0 if total_gaps == 0 else 1)


if __name__ == '__main__':
    main()
