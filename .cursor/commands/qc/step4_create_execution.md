# QC Step 3.5: Create Execution Plan

## Overview
`docs/qc/testcases.json`을 분석하여 최적의 실행 순서를 가진 `tests/executions/<execution_name>.json` 파일을 생성합니다.

## Prerequisites
- `docs/qc/testcases.json` 파일이 존재해야 함
- `docs/qc/config.json` 파일에서 baseUrl 확인

## Input
사용자에게 다음 정보를 질문:
1. **Execution Name**: 실행 파일명 (예: `auth_flow`, `full_regression`, `smoke_test`)
2. **Description**: 실행 목적 설명
3. **Scope**: 전체 테스트 / 특정 카테고리 / 특정 Priority / 특정 테스트케이스 ID 목록
4. **Viewport**: `desktop` | `tablet` | `mobile`

## Output
- 파일 위치: `tests/executions/<execution_name>.json`
- 템플릿: `.templates/execution.template.json`, `.templates/execution-step.template.json`

## Steps

### 1. 테스트케이스 분석
`docs/qc/testcases.json`에서 다음 정보 추출:
- 테스트케이스 ID, 이름, 카테고리, Priority
- preconditions에서 역할(Role) 정보 파싱
- preconditions에서 데이터 의존성 파싱

### 2. 실행 순서 결정 기준 (우선순위)

#### 🔐 1단계: 인증 & 세션 (Authentication)
- 로그인 테스트를 가장 먼저 배치
- 로그아웃 테스트는 해당 역할의 마지막에 배치
- 세션 관련 테스트는 별도 phase로 분리

#### 👤 2단계: 역할별 그룹핑 (Role Grouping)
- 같은 역할의 테스트를 연속 배치하여 재로그인 최소화
- 역할 우선순위: `C_LEVEL` → `GA` → `MANAGER` → `PM` → `SALES` → `DESIGNER` → `DEVELOPER` → `QA`
- 역할 없는 테스트(비로그인)는 가장 처음

#### 📊 3단계: 데이터 의존성 (Data Dependency)
- 부모 → 자식 엔티티 순서: `Client` → `Project` → `Contract` → `Invoice`
- CRUD 순서: `Create` → `Read` → `Update` → `Delete`
- 삭제 테스트는 해당 엔티티의 가장 마지막

#### 🔄 4단계: 상태 전이 (State Transition)
- 상태 흐름 순서대로 배치
- 예: `REQUESTED` → `APPROVED` → `PAID`

#### ⭐ 5단계: Priority
- 같은 조건 내에서 P0 → P1 → P2 → P3 순서
- P0 테스트는 `onFail: "abort"` 설정

#### 🧪 6단계: 테스트 유형 (Test Type)
- 순서: `Happy Path` → `CRUD` → `Validation` → `Error` → `Destructive`

#### 📄 7단계: 페이지 그룹핑 (Navigation)
- 같은 페이지의 테스트를 연속 배치
- 네비게이션 횟수 최소화

### 3. Execution Step 속성 결정

각 테스트케이스에 대해:

```json
{
  "step": <순서 번호>,
  "testcaseId": "<TC-XXX>",
  "onFail": "<continue | abort | skip_dependents>",
  "requiredRole": "<역할 | null>",
  "dependsOn": ["<의존하는 TC-ID 목록>"],
  "skipIf": "<스킵 조건 | null>",
  "phase": "<단계 그룹명>"
}
```

#### onFail 결정 규칙:
- `abort`: P0 테스트, 로그인 테스트, 핵심 플로우의 첫 번째 테스트
- `skip_dependents`: 데이터 생성 테스트 (실패 시 의존 테스트 스킵)
- `continue`: 그 외 모든 테스트

#### dependsOn 결정 규칙:
- 로그아웃 테스트 → 로그인 테스트에 의존
- 데이터 조회/수정/삭제 테스트 → 데이터 생성 테스트에 의존
- 자식 엔티티 테스트 → 부모 엔티티 생성 테스트에 의존
- 상태 B 테스트 → 상태 A 테스트에 의존

#### phase 분류:
- `authentication`: 로그인/로그아웃/세션
- `smoke`: 핵심 기능 빠른 검증
- `crud_<entity>`: 엔티티별 CRUD
- `validation`: 폼 유효성 검증
- `navigation`: 페이지 이동
- `responsive`: 반응형 테스트
- `error_handling`: 에러 처리
- `cleanup`: 데이터 정리/삭제

### 4. Execution 파일 생성

`.templates/execution.template.json` 기반으로:

```json
{
  "executionName": "<사용자 입력>",
  "description": "<사용자 입력>",
  "createdAt": "<현재 ISO 시간>",
  "config": {
    "baseUrl": "<docs/qc/config.json에서 가져오기>",
    "defaultOnFail": "continue",
    "timeout": 30000,
    "viewport": "<사용자 입력>"
  },
  "steps": [
    // 위 기준으로 정렬된 step 배열
  ]
}
```

### 5. 검증
- 모든 step 번호가 연속적인지 확인
- dependsOn에 명시된 테스트가 먼저 실행되는지 확인
- 순환 의존성이 없는지 확인

### 6. 저장
- `tests/executions/<execution_name>.json` 파일로 저장
- (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Example Output

```json
{
  "executionName": "auth_flow",
  "description": "인증 관련 테스트 플로우",
  "createdAt": "2025-01-15T12:00:00Z",
  "config": {
    "baseUrl": "http://localhost:3001",
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
      "skipIf": null,
      "phase": "authentication"
    },
    {
      "step": 2,
      "testcaseId": "TC-002",
      "onFail": "continue",
      "requiredRole": null,
      "dependsOn": [],
      "skipIf": null,
      "phase": "authentication"
    }
  ]
}
```

## Execution Scope 옵션

### 1. Full Regression
- 모든 테스트케이스 포함
- 권장 이름: `full_regression`

### 2. Smoke Test
- P0 테스트만 포함
- 권장 이름: `smoke_test`

### 3. Category-specific
- 특정 카테고리만 포함 (예: Authentication, Dashboard)
- 권장 이름: `<category>_tests`

### 4. Role-specific
- 특정 역할로 실행 가능한 테스트만 포함
- 권장 이름: `<role>_tests`

### 5. Custom Selection
- 사용자가 선택한 테스트케이스 ID 목록
- 권장 이름: `custom_<목적>`

## Checklist
- [ ] Execution Name 입력 받음
- [ ] Description 입력 받음
- [ ] Scope 결정됨
- [ ] 테스트케이스 분석 완료
- [ ] 실행 순서 결정 완료
- [ ] dependsOn 관계 설정 완료
- [ ] onFail 정책 설정 완료
- [ ] phase 분류 완료
- [ ] `tests/executions/<name>.json` 파일 생성됨
- [ ] 순환 의존성 검증 완료
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Related Files
- `docs/qc/testcases.json` - 테스트케이스 정의
- `docs/qc/config.json` - 프로젝트 설정 (baseUrl)
- `.templates/execution.template.json` - Execution 템플릿
- `.templates/execution-step.template.json` - Step 템플릿
- `tests/executions/*.json` - 생성된 실행 파일들
