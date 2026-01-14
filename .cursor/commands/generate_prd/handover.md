# Generate PRD Handover

## Overview
승인된 범위의 실행 방법을 문서화합니다. 소유자, 환경, 의존성, 테스트 전략, 리스크, 후속 조치를 포함합니다.

## Steps
1. 견적서 수준의 약속을 전달 수준의 작업으로 변환 (스프린트, 마일스톤)
2. 작업 스트림별 RACI 정의 (Responsible, Accountable, Consulted, Informed)
3. 환경, 데이터 마이그레이션, 릴리스, QA 전략 캡처
4. 모든 미해결 이슈, 필요한 결정, 의존성 리스크 나열
5. `prd/[MM.DD]/handover.md` 저장

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 10) Implementation Guidelines & RACI
- Workstreams (Backend, Frontend, Infra, Ops, etc.) with Responsible teams
- Tooling / Environment requirements (dev/stage/prod, credentials, data seeds)
- RACI matrix table (Activity × Role)
- Communication cadence (syncs, demos, sign-off gates)

## 11) Delivery & Testing Checklist
- Sprint / milestone plan with target dates
- QA scope (manual suites, automation, performance, security)
- UAT owners & acceptance entry/exit criteria
- Deployment plan (cutover steps, rollback, monitoring)
- Compliance / audit tasks if mentioned in appendix

## 12) Open Issues, Risks & Follow-Ups
- Blockers, pending decisions, assumptions (each with owner + due date)
- External dependencies (vendors, APIs, data contracts)
- Scope changes awaiting approval (link to REQ IDs or quote sections)
- Post-handover next actions (e.g., readiness workshop, design handoff)
```

## Checklist
- [ ] RACI 매트릭스가 정의되었는가?
- [ ] 환경 요구사항이 문서화되었는가?
- [ ] 테스트 전략이 포함되었는가?
- [ ] 모든 리스크가 나열되고 소유자가 지정되었는가?
- [ ] 미해결 이슈가 문서화되었는가?
