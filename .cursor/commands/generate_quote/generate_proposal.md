# Generate Quote Proposal

## Overview
클라이언트 제안서 문서를 생성합니다. 회사 소개 자료와 프로젝트 관련 정보를 통합하여 종합적인 제안서를 작성합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. 회사 소개 자료 읽기: `appendix/company_intro.md` 또는 `appendix/*.md`
3. 프로젝트 관련 파일 읽기:
   - `quotes/[MM.DD]/guide.md`
   - `meeting_scripts/[MM.DD]/requirements.md`
   - `meeting_scripts/[MM.DD]/summary.md`
   - `quotes/[MM.DD]/note.md` (존재 시 최우선)
   - 이전 견적서 파일들
   - `appendix/requirements.md` (존재 시 필수)
4. 제안서 생성:
   - 표지 (프로젝트/클라이언트 이름, 날짜, 제목)
   - 실행 요약
   - 프로젝트 목표 및 가치 제안
   - 제안 방법론
   - 타임라인, 결과물, 팀 소개
   - 가격 (있는 경우)
   - 연락처 및 다음 단계
5. `quotes/[MM.DD]/proposal.md` 저장
6. `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 회사 소개 자료가 읽혔는가?
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] appendix/requirements.md가 반영되었는가? (존재 시)
- [ ] proposal.md가 올바른 구조로 생성되었는가?
- [ ] 커밋까지 완료했는가?
