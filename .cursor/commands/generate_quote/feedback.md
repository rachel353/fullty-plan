# Generate Quote Feedback

## Overview
`note.md`의 클라이언트 피드백을 기존 견적서 파일에 적용하고 통합 견적서로 병합합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `quotes/[MM.DD]/note.md` 확인:
   - 존재 시: 피드백 읽기
   - 없으면: 사용자에게 요청하여 생성
3. 기존 파일 읽기: `guide.md`, `background.md`, `ia_structure.md`, `specification_and_quote.md`
4. `note.md` 피드백을 기반으로 모든 파일 업데이트
5. 업데이트된 파일 저장
6. `generate_quote/merge` 커맨드 실행
7. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] note.md가 읽혔거나 생성되었는가?
- [ ] 모든 견적서 파일이 업데이트되었는가?
- [ ] 기능 변경 시 가격이 재계산되었는가?
- [ ] merge 커맨드가 실행되었는가?
- [ ] 커밋까지 완료했는가?
