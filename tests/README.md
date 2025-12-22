# Test Execution System

JSON 기반 테스트 실행 시스템으로, Cursor 커맨드와 통합하여 E2E 테스트를 수행합니다.

## 폴더 구조

```
tests/
├── executions/           # 실행 정의 파일
│   ├── auth_flow.json    # 인증 플로우 테스트
│   └── full_regression.json  # 전체 리그레션 테스트
├── reports/              # 실행 결과 리포트
│   └── <execution>_<timestamp>.json
├── runner/               # 테스트 실행 엔진
│   ├── types.ts          # 타입 정의
│   ├── prompt-generator.ts  # Cursor 프롬프트 생성
│   ├── execute.ts        # 실행 엔진
│   └── index.ts          # 모듈 진입점
└── README.md
```

## 핵심 개념

### 1. 테스트케이스 (testcases.json)
- 위치: `docs/qc/testcases.json`
- 테스트케이스 정의 (ID, 이름, 단계, 예상 결과 등)
- 실행 순서는 포함하지 않음

### 2. 실행 정의 (Execution File)
- 위치: `tests/executions/<name>.json`
- 테스트 실행 순서 정의
- 의존성 및 실패 시 동작 설정

### 3. 실행 결과 (Execution Report)
- 위치: `tests/reports/<name>_<timestamp>.json`
- 각 테스트 결과 (통과/실패/스킵)
- 실행 로그 및 에러 정보

## 실행 정의 스키마

```json
{
  "executionName": "auth_flow",
  "description": "인증 관련 테스트",
  "config": {
    "baseUrl": "http://localhost:3000",
    "defaultOnFail": "continue",
    "timeout": 30000,
    "viewport": "desktop"
  },
  "steps": [
    {
      "step": 1,
      "testcaseId": "TC-001",
      "onFail": "abort",
      "requiredRole": null,
      "dependsOn": [],
      "skipIf": null
    }
  ]
}
```

### 필드 설명

| 필드 | 설명 |
|------|------|
| `step` | 실행 순서 (1부터 시작) |
| `testcaseId` | testcases.json의 테스트케이스 ID |
| `onFail` | 실패 시 동작: `continue`, `abort`, `skip_dependents` |
| `requiredRole` | 필요한 역할 (로그인 계정) |
| `dependsOn` | 의존하는 테스트케이스 ID 목록 |
| `skipIf` | 스킵 조건 (선택) |
| `phase` | 테스트 단계 그룹 (선택) |

## Cursor 프롬프트 형식

테스트 실행 시 생성되는 프롬프트:

```
You are executing an automated E2E test using browser automation.

═══════════════════════════════════════════════════════════════
TESTCASE INFORMATION
═══════════════════════════════════════════════════════════════

Testcase ID: TC-001
Title: 로그인 - 성공 시나리오

...

═══════════════════════════════════════════════════════════════
OUTPUT REQUIREMENTS (CRITICAL)
═══════════════════════════════════════════════════════════════

Return format:
{
  "testcase_id": "TC-001",
  "status": "passed | failed",
  "logs": [...],
  "error": null | "Error description"
}
```

## 사용 방법

### 1. QC 커맨드로 실행
```
/qc/step4_execute_tests
```

### 2. 프로그래매틱 실행
```typescript
import { executeTests } from "./tests/runner";

const report = await executeTests(
  { executionName: "auth_flow", verbose: true },
  async (prompt) => {
    // Cursor 또는 브라우저 자동화로 프롬프트 실행
    return JSON.stringify({ ... });
  }
);
```

## 템플릿 파일

`.templates/` 폴더에 템플릿 파일들이 있습니다:

- `execution.template.json` - 실행 정의 템플릿
- `execution-step.template.json` - 실행 단계 템플릿
- `execution-report.template.json` - 리포트 템플릿
- `test-result.template.json` - 테스트 결과 템플릿

## 의존성 해결

테스트 간 의존성은 `dependsOn` 필드로 정의됩니다:

```json
{
  "step": 6,
  "testcaseId": "TC-006",
  "dependsOn": ["TC-001"]
}
```

- `TC-001`이 실패하면 `TC-006`은 자동으로 스킵됩니다.
- 의존성은 여러 개 지정 가능합니다.

## 역할별 실행

`requiredRole` 필드로 필요한 역할을 지정합니다:

```json
{
  "step": 8,
  "testcaseId": "TC-008",
  "requiredRole": "C_LEVEL"
}
```

사용 가능한 역할:
- `C_LEVEL`, `GA`, `MANAGER`, `PM`, `SALES`
- `DESIGNER`, `DEVELOPER`, `QA`, `MULTI`

## 실패 시 동작

| onFail 값 | 동작 |
|-----------|------|
| `continue` | 다음 테스트 계속 실행 |
| `abort` | 전체 실행 중단, 나머지는 aborted 처리 |
| `skip_dependents` | 이 테스트에 의존하는 테스트만 스킵 |

