# Process Meeting Script

## Overview
미팅 스크립트를 처리하여 요약, 요구사항, 피드백을 생성합니다. 필요 시 자동으로 견적서 생성도 실행합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `meeting_scripts/[MM.DD]/script.md` 파일 확인
3. `meeting_scripts/[MM.DD]/note.md` 확인 (존재 시 최우선)
4. 이전 미팅 스크립트 확인 (컨텍스트 파악)
5. `appendix/*.md` 파일 읽기 (선택)
6. `process_meeting/summary` 실행 → `summary.md` 생성
7. `process_meeting/requirements` 실행 → `requirements.md` 생성 (REQ IDs 포함)
8. `process_meeting/feedback` 실행 → `feedback.md` 생성
9. `summary.md` 분석하여 견적서 생성 필요 여부 판단
10. 필요 시 `generate_quote/main` 자동 실행
11. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] `script.md` 파일이 존재하는가?
- [ ] `note.md`가 읽혔는가? (존재 시)
- [ ] `summary.md`가 먼저 생성되었는가?
- [ ] `requirements.md`에 REQ IDs가 포함되었는가?
- [ ] `feedback.md`가 생성되었는가?
- [ ] 견적서 생성 필요 여부가 판단되었는가?
- [ ] 커밋까지 완료했는가?
