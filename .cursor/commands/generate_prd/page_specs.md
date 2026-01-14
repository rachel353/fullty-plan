# Generate PRD Page Specs

## Overview
IA에 설명된 모든 페이지/화면에 대한 실행 가능한 스펙을 생성합니다. 흐름, 상태, 데이터 계약, 검증, 엣지 케이스를 포함합니다.

## Steps
1. `ia_pages.md`에 정의된 모든 페이지 반복
2. 각 페이지에 대해:
   - 관련된 모든 REQ ID 및 견적서 기능 불릿 추출
   - 시나리오, 흐름, UI 상태, 데이터 스키마, 검증으로 확장
   - 의존성 문서화 (API, 백그라운드 작업, 외부 파트너)
   - 수용 테스트 및 분석 훅 정의
3. 예산/우선순위 컨텍스트 강화 (Must/Should/Nice)
4. `prd/[MM.DD]/page_specs.md` 저장

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 9) Page-Level Functional Specifications

### [Module > Page Name]
- **Objective:** business outcome + KPIs
- **Users / Permissions:** roles, visibility rules
- **Primary Flows:** numbered steps w/ trigger → system response
- **Data Contract:** table with Field, Type, Source, Validation, Notes
- **Components & States:** sections for forms, tables, modals, mobile variants
- **Edge Cases / Errors:** fallback behaviors, retries, escalation paths
- **Integrations:** API names, payloads, schedules, failure handling
- **Notifications / Automations:** push, email, webhook details
- **Analytics & Logs:** events, parameters, dashboards, alert thresholds
- **Acceptance Criteria:** checklist referencing REQ IDs
- **Open Questions / Assumptions:** anything unresolved (link to `handover`)

> Repeat for every page. Use sub-headings for complex components.
```

## Checklist
- [ ] 모든 페이지가 반복되었는가?
- [ ] 각 페이지에 REQ ID가 연결되었는가?
- [ ] 데이터 계약이 정의되었는가?
- [ ] 엣지 케이스가 문서화되었는가?
- [ ] 수용 기준이 포함되었는가?
