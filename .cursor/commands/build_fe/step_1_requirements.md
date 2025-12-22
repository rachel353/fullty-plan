## Step 1: Requirements + User Stories

## Overview
입력 문서에서 요구사항을 정리하고 **핵심 User Story + Acceptance Criteria**를 확정하여 이후 Step(IA/설계/개발)의 기준을 만든다.

## Steps
1. 입력 문서 4종을 읽고 핵심 목표/제약/기능 목록을 뽑는다
2. Actor(역할)을 확정하고, Actor별 핵심 행동을 User Story로 변환한다
3. 각 User Story에 **테스트 가능한 AC**를 붙인다
4. 우선순위를 매겨 `docs/user_stories.md`로 저장한다

## Checklist (선택)
- [ ] Actor가 실제 사용자/운영 역할과 일치하는가?
- [ ] User Story가 “가치(So that)”까지 포함하는가?
- [ ] AC가 모호하지 않고 검증 가능한가?
- [ ] 이후 Step에서 참조할 우선순위가 있는가?

## Output (문서 생성 시 예시)
`docs/user_stories.md`:

```markdown
# User Stories

## Actors
- Admin:
- Business:
- Worker:

## User Stories
### US-001: {제목}
As a {Actor}
I want to {행동}
So that {가치}

Acceptance Criteria:
- [ ] {AC 1}
- [ ] {AC 2}
```

