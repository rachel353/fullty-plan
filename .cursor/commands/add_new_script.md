# Add New Meeting Script

## Overview
첨부된 미팅 스크립트 파일을 클라이언트 폴더에 저장하고 자동으로 처리합니다. 클라이언트 폴더가 없으면 먼저 생성합니다.

## Steps
1. 첨부된 미팅 스크립트 파일 읽기
2. 클라이언트 이름 `[CLIENT_NAME]`과 미팅 날짜 `[MM.DD]` 확인
3. 클라이언트 폴더가 없으면 `add_new_client` 커맨드 실행: `Add a new client named [CLIENT_NAME] with the current year and month.`
4. `meeting_scripts/[MM.DD]/` 폴더 생성
5. 첨부된 파일을 `meeting_scripts/[MM.DD]/script.md`로 터미널 복사 명령어 사용 (파일 내용 출력 금지)
6. `process_meeting/main` 커맨드 실행: `Process meeting script for client [CLIENT_NAME] with meeting date [MM.DD]`
7. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 첨부 파일이 존재하는가?
- [ ] 클라이언트 폴더가 생성되었는가? (없는 경우)
- [ ] `script.md` 파일이 올바른 위치에 저장되었는가?
- [ ] `process_meeting/main` 커맨드가 실행되었는가?
- [ ] 커밋까지 완료했는가?
