# Process Meeting Script Summary

## Overview
미팅 스크립트에서 최종 합의된 내용만 추출하여 요약 파일을 생성합니다. 클라이언트 발언과 합의사항에 우선순위를 둡니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `meeting_scripts/[MM.DD]/note.md` 확인 (존재 시 최우선)
3. 이전 미팅 스크립트 확인 (컨텍스트 파악)
4. `appendix/*.md` 파일 읽기 (선택)
5. `meeting_scripts/[MM.DD]/script.md` 파일 확인
6. 스크립트 내용 읽기 (이전 미팅, note.md, appendix 파일 참고)
7. 최종 합의된 내용만 추출 (한국어 프롬프트 사용, note.md 우선)
8. `meeting_scripts/[MM.DD]/summary.md` 생성 (기존 파일 덮어쓰기)
9. `git status` 확인 → `git add` → `git commit`

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
# [최종 합의 사항]

## 1) Scope (확정된 개발 범위)
- 항목별 bullet로 구체적 명확한 표현 사용

## 2) Budget & Model (금액 및 계약 방식)
- 확정 금액 또는 방식만 명시

## 3) Timeline (일정)
- 확정된 시작일, 마일스톤, 완료 목표만 작성

## 4) Responsibilities (역할/책임자)
- 누가 무엇을 제공/수행하기로 했는지

## 5) Next Actions (명확히 합의된 다음 행동만)
- 작업 단위 + 담당자 + 기한 포함

## 6) 미합의 항목 (향후 협의 예정)
- 결론 미확정이나 추가 논의 필수인 항목만 리스트업
```

**중요 사항:**
- 최종 합의된 내용만 포함 (의견, 논의 중 제안, 가정, 미확정 내용 제외)
- 불명확한 표현(예: '검토해보자', '가능할 것 같다')은 포함하지 않음
- 클라이언트 발언과 합의사항에 우선순위

## Checklist
- [ ] script.md 파일이 존재하는가?
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] 이전 미팅 컨텍스트가 확인되었는가?
- [ ] 최종 합의된 내용만 추출되었는가?
- [ ] summary.md가 올바른 구조로 생성되었는가?
- [ ] 커밋까지 완료했는가?
