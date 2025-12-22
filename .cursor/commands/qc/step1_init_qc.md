# QC Step 1: Initialize QC Project

## Overview
QC 프로젝트를 초기화하고 필수 설정 파일(config.json, credentials.json)을 생성합니다.

## Steps
1. 사용자로부터 프로젝트 정보 수집:
   - 프로젝트명 (영문, 소문자, 하이픈 사용)
   - 웹사이트 URL
   - 테스트 환경 (production/staging/development)
   - 반응형 지원 여부
   - 테스트 계정 정보 (역할별)
   - Notion QA Database URL (선택)
2. `docs/qc/` 디렉토리 생성 (없는 경우)
3. `docs/qc/config.json` 생성:
   - `.templates/config.template.json` 참고하여 생성
   ```json
   {
     "projectName": "project-name",
     "baseUrl": "https://example.com",
     "environment": "production",
     "viewports": {
       "desktop": { "width": 1920, "height": 1080 },
       "tablet": { "width": 768, "height": 1024 },
       "mobile": { "width": 375, "height": 812 }
     },
     "testViewports": ["desktop", "mobile"],
     "features": {
       "auth": true,
       "responsive": true,
       "payment": false
     },
     "notionQaPageId": "notion-database-url-or-null",
     "createdAt": "ISO-Date",
     "lastTestedAt": null
   }
   ```
4. `docs/qc/credentials.json` 생성:
   - `.templates/accounts.template.json` 참고하여 생성
   ```json
   {
     "accounts": [
       {
         "role": "admin",
         "email": "admin@example.com",
         "password": "********",
         "description": "Administrator account"
       }
     ]
   }
   ```
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] config.json 생성 완료 (.templates/config.template.json 참고)
- [ ] credentials.json 생성 완료 (.templates/accounts.template.json 참고)
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Note
- testcases.json은 Step 2에서 생성되며, 테스트케이스 정보와 상태 추적 정보를 모두 포함합니다.
- test-status.json은 더 이상 사용하지 않으며, 모든 정보는 testcases.json에 통합되었습니다.

