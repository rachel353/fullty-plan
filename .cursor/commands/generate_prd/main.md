# Generate PRD

## Overview
최신 견적서와 요구사항을 기반으로 Product Requirements Document (PRD)를 생성합니다. 프로젝트 매니저와 개발팀에게 전달할 수 있는 상세한 제품 가이드를 작성합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. 최신 견적서 버전 확인: `quotes/[MM.DD]/` 폴더
3. 필수 파일 확인:
   - `quotes/[MM.DD]/guide.md`, `background.md`, `ia_structure.md`, `specification_and_quote.md`
   - `quotes/[MM.DD]/note.md` (존재 시 최우선)
   - `meeting_scripts/[MM.DD]/requirements.md`, `summary.md`
   - `appendix/requirements.md` (존재 시 필수)
4. `prd/[MM.DD]/` 폴더 생성
5. `generate_prd/plan` 실행하여 `plan.md` 생성
6. `generate_prd/coverage_tracker` 실행하여 `coverage_tracker.md` 생성
7. 서브 커맨드 순차 실행:
   - `generate_prd/overview` → `overview.md`
   - `generate_prd/requirements_trace` → `requirements_trace.md`
   - `generate_prd/ia_pages` → `ia_pages.md`
   - `generate_prd/page_specs` → `page_specs.md`
   - `generate_prd/handover` → `handover.md`
8. `generate_prd/merge` 실행하여 `[MM.DD]_prd.md` 생성
9. `plan.md` 업데이트 (모든 항목 완료 표시)
10. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 최신 견적서가 확인되었는가?
- [ ] `note.md`가 읽혔는가? (존재 시)
- [ ] `appendix/requirements.md`가 읽혔는가? (존재 시)
- [ ] 모든 서브 커맨드가 순차적으로 실행되었는가?
- [ ] `coverage_tracker.md`가 모든 REQ와 IA를 포함하는가?
- [ ] 최종 `[MM.DD]_prd.md` 파일이 생성되었는가?
- [ ] 커밋까지 완료했는가?
