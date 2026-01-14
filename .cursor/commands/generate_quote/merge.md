# Generate Quote Merge

## Overview
세 개의 견적서 파일을 단일 통합 문서로 병합하고 요구사항 참조를 추가합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. 필수 파일 확인:
   - `quotes/[MM.DD]/background.md` (필수)
   - `quotes/[MM.DD]/ia_structure.md` (필수)
   - `quotes/[MM.DD]/specification_and_quote.md` (필수)
3. 병합 스크립트 실행:
   ```
   python .cursor/commands/generate_quote/merge_quote_files.py [CLIENT_FOLDER] [MM.DD]
   ```
4. `quotes/[MM.DD]_combined.md` 생성 확인
5. 요구사항 추출 스크립트 실행:
   ```
   python .cursor/commands/generate_quote/extract_requirements.py [CLIENT_FOLDER] [MM.DD]
   ```
6. `[MM.DD]_combined.md`에 `## 10) Requirements Reference` 섹션 추가 확인
7. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 모든 필수 파일이 존재하는가?
- [ ] 병합 스크립트가 성공적으로 실행되었는가?
- [ ] `[MM.DD]_combined.md` 파일이 생성되었는가?
- [ ] 요구사항 참조 섹션이 추가되었는가?
- [ ] 커밋까지 완료했는가?
