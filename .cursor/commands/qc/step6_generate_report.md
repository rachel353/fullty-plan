# QC Step 5: Generate Report

## Overview
테스트 실행 결과를 분석하고 요약 리포트를 생성합니다.

## Prerequisites
- `tests/reports/<execution_name>_<timestamp>.json` 파일이 존재해야 함

## Steps

### 1. 리포트 파일 로드
- `tests/reports/` 폴더에서 최신 리포트 또는 지정된 리포트 로드

### 2. 결과 분석
```
총 테스트: N개
통과: N개 (XX%)
실패: N개 (XX%)
스킵: N개 (XX%)
중단: N개 (XX%)
```

### 3. 실패한 테스트 상세
각 실패한 테스트에 대해:
- 테스트케이스 ID 및 이름
- 에러 메시지
- 실행 로그

### 4. 카테고리별 분석
카테고리별 통과율 집계:
```
Authentication: 7/7 (100%)
Dashboard: 2/3 (67%)
Client Management: 5/9 (56%)
...
```

### 5. Priority별 분석
Priority별 통과율 집계:
```
P0 (Critical): 30/32 (94%)
P1 (High): 33/37 (89%)
P2 (Medium): 14/16 (88%)
```

### 6. 리포트 출력 형식

#### Markdown 형식 (화면 출력)
```markdown
# Test Execution Report

## Summary
- **Execution**: auth_flow
- **Status**: completed
- **Duration**: 5m 30s

## Results
| Status | Count | Percentage |
|--------|-------|------------|
| Passed | 25 | 83% |
| Failed | 3 | 10% |
| Skipped | 2 | 7% |

## Failed Tests
### TC-015: 고객사 - Designer/Developer/QA 조회만 가능
- **Error**: 추가 버튼이 노출됨
- **Logs**: [...]
```

### 7. 다음 단계 제안
실패한 테스트가 있는 경우:
- 재테스트 필요 목록
- 수정 필요 항목

## Checklist
- [ ] 리포트 파일 로드 완료
- [ ] 결과 분석 완료
- [ ] 카테고리별/Priority별 분석 완료
- [ ] 실패한 테스트 상세 정보 출력
- [ ] 다음 단계 제안 완료

## Related Files
- `tests/reports/*.json` - 실행 결과 리포트
- `docs/qc/testcases.json` - 테스트케이스 정의
