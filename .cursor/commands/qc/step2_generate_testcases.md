# QC Step 2: Generate Test Cases

## Overview
PRD 문서(`docs/prd.md`) 또는 User Stories 문서(`docs/user_stories.md`)를 분석하여 체계적인 테스트케이스 목록을 JSON 형식으로 생성합니다. 테스트케이스 정보와 상태 추적 정보를 모두 포함합니다.

## Steps
1. PRD 또는 User Stories 문서 읽기:
   - `docs/prd.md` 또는 `docs/user_stories.md` 파일 확인
2. 테스트케이스 생성 기준 적용:
   - **Happy Path**: 정상 시나리오
   - **Edge Cases**: 경계값, 특수문자, 빈 값 등
   - **Error Cases**: 에러 상황 처리
   - **Priority**: P0(핵심)/P1(주요)/P2(보조)/P3(추가)
3. `docs/qc/testcases.json` 파일 생성:
   - `.templates/testcases.template.json` 참고하여 생성
   - 다음 구조로 생성:
   ```json
   {
     "meta": {
       "createdAt": "ISO-Date",
       "prdVersion": "1.0",
       "totalCases": N,
       "categories": ["Authentication", "Navigation", "CRUD", ...]
     },
     "statistics": {
       "completed": 0,
       "passed": 0,
       "failed": 0,
       "skipped": 0,
       "lastRun": null,
       "currentStep": null
     },
     "testCases": [
       {
         "id": "TC-001",
         "name": "Test Case Name",
         "priority": "P0",
         "category": "Authentication",
         "userStory": "US-001",
         "preconditions": ["Precondition 1", "Precondition 2"],
         "testSteps": [
           "Step 1 description",
           "Step 2 description",
           "Step 3 description"
         ],
         "expectedResult": "Expected result description",
         "status": "pending",
         "lastRun": null,
         "notes": ""
       }
     ]
   }
   ```
   - 각 User Story별로 테스트케이스 생성
   - 카테고리별 분류 (Authentication, Navigation, CRUD, Form, UI/UX, Responsive, Security, Performance)
   - 각 테스트케이스에 id, name, priority, category, preconditions, testSteps, expectedResult 포함
   - id 형식: "TC-XXX" (001부터 순차 할당)
   - meta.totalCases를 생성된 테스트케이스 수로 설정
   - meta.categories에 사용된 모든 카테고리 배열로 설정
   - 각 testCase의 status는 초기값 "pending"으로 설정
   - statistics는 초기값으로 설정 (모두 0, lastRun과 currentStep은 null)
4. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] PRD 또는 User Stories 문서 분석 완료
- [ ] testcases.json 파일 생성 완료 (.templates/testcases.template.json 구조 참고)
- [ ] meta.totalCases가 생성된 테스트케이스 수와 일치하는가?
- [ ] meta.categories에 모든 카테고리가 포함되어 있는가?
- [ ] 각 테스트케이스가 고유 ID를 가지고 있는가?
- [ ] 각 테스트케이스의 status가 "pending"으로 설정되었는가?
- [ ] statistics 필드가 초기값으로 설정되었는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

