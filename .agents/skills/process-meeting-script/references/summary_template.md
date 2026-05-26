# Summary Template

## Output Location
`meeting_scripts/[MM.DD]/summary.md`

## Template Structure

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

## Extraction Rules

1. **최종 합의된 내용만 포함**
   - 의견, 논의 중 제안, 가정, 미확정 내용 제외
   - 불명확한 표현 제외: '검토해보자', '가능할 것 같다' 등

2. **클라이언트 발언 우선**
   - 클라이언트가 명시적으로 동의한 내용만 포함
   - 개발자 제안은 클라이언트 수락 시에만 포함

3. **note.md 최우선**
   - note.md 존재 시 해당 내용이 script.md를 override
