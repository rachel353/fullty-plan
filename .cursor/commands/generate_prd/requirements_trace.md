# Generate PRD Requirements Trace

## Overview
각 REQ ID를 IA 노드, 페이지 스펙, 수용 기준, 작업량, 소유자에 연결하는 추적성 매트릭스를 생성합니다.

## Steps
1. 모든 REQ 항목 로드 (ID, 제목, 설명, 우선순위, 상태)
2. 각 REQ를 다음에 매핑:
   - IA 노드 / 페이지 이름
   - 견적서의 기능 번들 또는 모듈
   - 수용 기준, 성공 신호, 가드레일
   - 책임 소유자 (PM/Dev/외부)
3. 간격 식별:
   - IA/페이지가 없는 요구사항 (리스크로 표시)
   - REQ ID가 없는 견적서 기능 (가정 출처 문서화)
4. `prd/[MM.DD]/requirements_trace.md` 작성
5. `coverage_tracker.md`와 비교하여 미완료 배치 확인
6. 미완료 항목은 `handover.md`에 기록

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 5) Requirement Traceability Summary
- REQ coverage stats pulled from `coverage_tracker.md`
- Key changes vs 이전 회차 (if any)
- Non-negotiable constraints pulled from appendix/note

## 6) Requirement → Feature Matrix

| REQ ID | Requirement Summary | Priority | IA / Page | Feature / Module | Acceptance Criteria | Owner / Notes |
|--------|---------------------|----------|-----------|------------------|---------------------|---------------|
| REQ-001 | ... | P1 | (e.g., Admin > 사업장 관리) | Payroll Setup | - [ ] Condition... | PM / External Vendor |

- Include sub-sections for functional vs non-functional requirements if helpful.
- Use bullet lists inside table cells for multi-step acceptance criteria.
- Mark unmet or new requirements with ⚠️ and explain in `handover.md`.
```

## Checklist
- [ ] 모든 REQ ID가 로드되었는가?
- [ ] 각 REQ가 IA/페이지에 매핑되었는가?
- [ ] 간격이 식별되고 문서화되었는가?
- [ ] coverage_tracker.md와 일치하는가?
- [ ] 미완료 항목이 handover.md에 기록되었는가?
