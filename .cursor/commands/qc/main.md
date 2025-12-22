# QC Workflow - Main

## Overview
QC 워크플로우 전체를 순차적으로 실행합니다.

## Steps
1. Step 1 실행: `/qc/step1_init_qc` - QC 프로젝트 초기화
2. Step 2 실행: `/qc/step2_generate_testcases` - 테스트케이스 생성
3. Step 3 실행: `/qc/step3_review_testcases` - 테스트케이스 리뷰
4. Step 4 실행: `/qc/step4_create_execution` - 실행 계획 생성
5. Step 5 실행: `/qc/step5_execute_tests` - 테스트 실행
6. Step 6 실행: `/qc/step6_generate_report` - 리포트 생성
7. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] Step 1 완료 (config.json, credentials.json 생성)
- [ ] Step 2 완료 (testcases.json 생성 - 테스트케이스 및 상태 추적 정보 포함)
- [ ] Step 3 완료 (테스트케이스 리뷰 완료)
- [ ] Step 4 완료 (execution 파일 생성 - 실행 순서 및 의존성 정의)
- [ ] Step 5 완료 (테스트 실행 및 결과 기록)
- [ ] Step 6 완료 (리포트 생성 및 분석)
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Folder Structure
```
docs/qc/
├── config.json           # 프로젝트 설정
├── credentials.json      # 테스트 계정 정보
└── testcases.json        # 테스트케이스 정의

tests/
├── executions/           # 실행 정의 파일
│   ├── auth_flow.json
│   └── full_regression.json
├── reports/              # 실행 결과 리포트
│   └── <execution>_<timestamp>.json
└── runner/               # 테스트 실행 엔진
    ├── types.ts
    ├── prompt-generator.ts
    └── execute.ts

.templates/
├── testcases.template.json
├── execution.template.json
├── execution-step.template.json
├── execution-report.template.json
└── test-result.template.json
```

