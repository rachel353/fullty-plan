# QC Step 4: Execute Tests

## Overview
정의된 실행 파일(execution file)을 기반으로 테스트케이스를 순차적으로 실행하고, 결과를 JSON 리포트로 저장합니다.

## Prerequisites
- `docs/qc/testcases.json` 파일이 존재해야 함
- `tests/executions/<execution_name>.json` 파일이 존재해야 함

## Steps

### 1. 실행 파일 선택
- `tests/executions/` 폴더에서 실행할 파일 선택
- 예: `auth_flow.json`, `full_regression.json`

### 2. 테스트 실행
각 step에 대해 순차적으로:
1. `testcaseId`로 `testcases.json`에서 테스트케이스 정보 조회
2. `dependsOn`에 명시된 의존성 테스트 결과 확인
3. 의존성 테스트가 실패했으면 현재 테스트는 skip
4. 테스트 실행 (Browser MCP 사용)
5. 결과를 JSON 형식으로 기록

### 3. 테스트 실행 프롬프트 형식
각 테스트케이스 실행 시 다음 정보를 포함:
```
Testcase ID: TC-XXX
Title: 테스트 이름
Preconditions: [조건 목록]
Test Steps: [단계 목록]
Expected Result: 예상 결과

Required Role: (있는 경우) 역할 및 로그인 정보
Base URL: 테스트 대상 URL
Viewport: desktop/tablet/mobile
```

### 4. 실행 결과 JSON 형식
각 테스트 결과는 다음 형식으로 반환:
```json
{
  "testcase_id": "TC-XXX",
  "status": "passed | failed",
  "logs": ["실행된 액션 로그"],
  "error": null | "에러 메시지"
}
```

### 5. 실패 시 동작 (`onFail`)
- `continue`: 다음 테스트 계속 실행
- `abort`: 전체 실행 중단
- `skip_dependents`: 해당 테스트에 의존하는 테스트만 skip

### 6. 리포트 저장
- 파일 위치: `tests/reports/<execution_name>_<timestamp>.json`
- 리포트 구조:
```json
{
  "executionName": "auth_flow",
  "startedAt": "ISO-Date",
  "finishedAt": "ISO-Date",
  "status": "completed | aborted",
  "summary": {
    "total": N,
    "passed": N,
    "failed": N,
    "skipped": N,
    "aborted": N
  },
  "results": [...]
}
```

## Checklist
- [ ] 실행 파일 선택 완료
- [ ] 모든 step 순차 실행 완료
- [ ] 각 테스트 결과가 JSON 형식으로 기록됨
- [ ] 의존성 체크가 정상 동작함
- [ ] 리포트 파일이 생성됨
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Related Files
- `tests/runner/execute.ts` - 테스트 실행 엔진
- `tests/runner/prompt-generator.ts` - Cursor 프롬프트 생성
- `tests/runner/types.ts` - 타입 정의
- `tests/executions/*.json` - 실행 정의 파일
- `tests/reports/*.json` - 실행 결과 리포트
