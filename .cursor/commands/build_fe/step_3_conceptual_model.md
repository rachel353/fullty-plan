## Step 3: Conceptual Model

## Overview
User Story/IA를 기반으로 **도메인 개념(Entity)과 관계**를 정리한다. (DB 스키마가 아니라 “개념 모델”)

## Steps
1. `docs/user_stories.md`에서 주요 명사(개념)를 뽑는다
2. `docs/ia.md`에서 화면이 다루는 데이터(개념)를 보강한다
3. Glossary(용어), Entity 목록, 관계(1:1/1:N)를 `docs/conceptual_model.md`에 정리한다

## Checklist (선택)
- [ ] 용어가 팀/고객 용어와 충돌하지 않는가?
- [ ] 모든 핵심 User Story가 최소 1개 Entity로 설명 가능한가?
- [ ] 관계가 “현실 세계”를 과하게 단순화/복잡화하지 않는가?

## Output (문서 생성 시 예시)
`docs/conceptual_model.md`:

```markdown
# Conceptual Model

## Glossary
| Term | Meaning |
|---|---|
| Worker | ... |

## Entities
### Worker
- Description:
- Attributes:
- Relationships:
```

