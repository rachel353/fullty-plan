# Generate PRD Coverage Tracker

## Overview
모든 REQ ID와 IA 노드를 체크리스트로 나열하여 누락 없이 커버리지를 추적합니다.

## Steps
1. `prd/[MM.DD]/coverage_tracker.md` 생성
2. `meeting_scripts/[MM.DD]/requirements.md`에서 모든 REQ ID 목록 복사
3. `quotes/[MM.DD]/ia_structure.md`에서 IA 트리 복사
4. REQ와 IA 노드를 관리 가능한 배치로 그룹화
5. 각 배치를 체크리스트로 작성
6. `requirements_trace.md` 작성 시 REQ 배치 체크
7. `ia_pages.md` 작성 시 IA 배치 체크
8. `generate_prd/merge` 실행 전 coverage_tracker와 최종 파일들 비교 검증
9. 미완료 항목은 `handover.md`에 리스크로 기록

## Checklist
- [ ] 모든 REQ ID가 목록에 포함되었는가?
- [ ] 모든 IA 노드가 목록에 포함되었는가?
- [ ] 배치가 관리 가능한 크기로 그룹화되었는가?
- [ ] requirements_trace.md 작성 시 REQ 배치가 체크되었는가?
- [ ] ia_pages.md 작성 시 IA 배치가 체크되었는가?
- [ ] 미완료 항목이 handover.md에 기록되었는가?
