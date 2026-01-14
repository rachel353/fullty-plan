# Generate Quote

## Overview
미팅 요약, 요구사항, 이전 견적서를 기반으로 종합적인 견적서를 생성합니다. 배경 정보, IA 구조, 상세 명세 및 견적을 포함한 4개 파일을 생성하고 병합합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `quotes/[MM.DD]/note.md` 확인 (존재 시 최우선)
3. 필수 파일 읽기:
   - 모든 `meeting_scripts/[MM.DD]/summary.md` 파일
   - `meeting_scripts/[MM.DD]/requirements.md` (REQ IDs 필수)
   - `meeting_scripts/[MM.DD]/script.md` (선택)
   - 이전 견적서 파일들
   - `appendix/requirements.md` (존재 시 필수)
4. 서브 커맨드 순차 실행:
   - `generate_quote/guide` → `quotes/[MM.DD]/guide.md` (최우선)
   - `generate_quote/background` → `background.md`
   - `generate_quote/ia_structure` → `ia_structure.md`
   - `generate_quote/specification_and_quote` → `specification_and_quote.md`
   - `generate_quote/merge` → `[MM.DD]_combined.md` (자동 실행)
5. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] `note.md`가 읽혔는가? (존재 시)
- [ ] 모든 미팅 요약이 읽혔는가?
- [ ] `guide.md`가 먼저 생성되었는가?
- [ ] `appendix/requirements.md`가 반영되었는가? (존재 시)
- [ ] 모든 파일이 생성되었는가?
- [ ] `[MM.DD]_combined.md`가 생성되었는가?
- [ ] 커밋까지 완료했는가?
