# Generate Quote Extract Requirements

## Overview
통합 견적서 문서에서 참조된 REQ ID를 추출하고 원본 요구사항 내용을 추가합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. 필수 파일 확인:
   - `quotes/[MM.DD]_combined.md` (필수)
   - `meeting_scripts/[MM.DD]/requirements.md` (필수)
3. 추출 스크립트 실행:
   ```
   python .cursor/commands/generate_quote/extract_requirements.py [CLIENT_FOLDER] [MM.DD]
   ```
4. `[MM.DD]_combined.md`에 `## 10) Requirements Reference` 섹션 추가 확인
5. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] `[MM.DD]_combined.md` 파일이 존재하는가?
- [ ] requirements.md 파일이 존재하는가?
- [ ] 추출 스크립트가 성공적으로 실행되었는가?
- [ ] Requirements Reference 섹션이 추가되었는가?
- [ ] 커밋까지 완료했는가?
