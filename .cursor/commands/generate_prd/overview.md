# Generate PRD Overview

## Overview
최신 견적서의 배경과 가이드를 PRD 소개 섹션으로 변환합니다. 제품 비전, KPI, 이해관계자, 범위 경계를 정의합니다.

## Steps
1. `generate_prd/main`의 Pre-Flight 체크리스트 완료 확인
2. 다음 정보 추출:
   - 핵심 비즈니스 문제와 동기
   - 비전 및 성공 지표
   - 이해관계자 유형 및 목표
   - 범위 경계, 예산, 릴리스 단계
3. 견적서 용어와 일관성 유지 (note.md에 명시된 경우 제외)
4. `prd/[MM.DD]/overview.md` 작성 (기존 내용 덮어쓰기)

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 0) Engagement Snapshot & Quote Alignment
- 프로젝트 명, 회차(날짜), 최신 견적 버전 요약
- 이번 PRD가 커버하는 범위 vs 제외 범위
- 예산/맨먼스 범위 및 변동 요인

## 1) Product Vision & Success Metrics
- 비즈니스 가치 서술 (guide/background 기반)
- 정량 KPI / 정성 목표 (측정 방식 포함)
- 고객/사용자 관점 기대 결과

## 2) Stakeholder & User Matrix
- 주요 이해관계자, 최종 사용자, 운영자 역할
- 각 역할별 Pain point + 성공 요건
- 의사결정 권한/책임 (연결된 팀 명시)

## 3) Release Scope vs Non-Goals
- Must / Should / Nice 구분된 기능 범위
- 제외(Out-of-scope) 항목과 근거 (budget, dependency 등)
- 향후 라운드로 이관할 요구사항

## 4) Delivery Constraints & Budget Envelope
- 일정, 마일스톤, 외부 의존성
- 기술/정책 제한 사항
- 예산 한도, 맨먼스 가정, 리스크 요약
```

## Checklist
- [ ] Pre-Flight 체크리스트가 완료되었는가?
- [ ] guide.md와 background.md가 읽혔는가?
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] overview.md가 올바른 구조로 작성되었는가?
