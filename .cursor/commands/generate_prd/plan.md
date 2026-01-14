# Generate PRD Plan

## Overview
PRD 작업 계획 체크리스트를 생성하고 관리합니다. 모든 단계를 추적하여 진행 상황을 명확히 합니다.

## Steps
1. `prd/[MM.DD]/plan.md` 파일 생성 또는 갱신
2. 다음 섹션들을 체크리스트로 포함:
   - Pre-Flight: `generate_prd/main`의 체크리스트 복사
   - Sources & Setup: 필수 파일 수집
   - Coverage & Writing: coverage_tracker, requirements_trace, ia_pages, page_specs, handover
   - Merge & Review: merge_prd, 최종 검토
3. 작업 진행 중 각 항목 체크박스 업데이트 (`[ ]` → `[x]`)
4. 각 항목에 간단한 노트 추가 (예: "note.md 읽음 - 충돌 없음")
5. `generate_prd/merge` 실행 후 plan.md 재검토하여 모든 항목 완료 확인

## Checklist
- [ ] plan.md 파일이 생성되었는가?
- [ ] 모든 섹션이 체크리스트로 포함되었는가?
- [ ] 작업 진행 중 체크리스트가 업데이트되고 있는가?
- [ ] 최종 검토가 완료되었는가?
