# Generate PRD Merge

## Overview
5개의 PRD 컴포넌트 파일을 단일 마크다운 파일로 병합합니다. Python 스크립트를 사용하여 `prd/[MM.DD]_prd.md`를 생성합니다.

## Steps
1. 필수 파일 확인:
   - `prd/[MM.DD]/overview.md`
   - `prd/[MM.DD]/requirements_trace.md`
   - `prd/[MM.DD]/ia_pages.md`
   - `prd/[MM.DD]/page_specs.md`
   - `prd/[MM.DD]/handover.md`
2. `coverage_tracker.md` 확인: 모든 REQ/IA 배치가 체크되었거나 handover.md에 명시되었는지 확인
3. Python 스크립트 실행:
   ```
   python .cursor/commands/generate_prd/merge_prd_files.py [CLIENT_FOLDER_OR_NAME] [MM.DD]
   ```
4. 병합된 파일이 `prd/[MM.DD]_prd.md`로 생성되었는지 확인
5. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 모든 필수 파일이 존재하는가?
- [ ] coverage_tracker.md가 완료되었는가?
- [ ] 병합 스크립트가 성공적으로 실행되었는가?
- [ ] `[MM.DD]_prd.md` 파일이 생성되었는가?
- [ ] 커밋까지 완료했는가?
