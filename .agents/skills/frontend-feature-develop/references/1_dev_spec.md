---
name: 1_dev_spec
description: Task 요구사항을 구현 가능한 단위로 쪼개서 AC, 화면 범위, API, 컴포넌트까지 상세 명세로 확정한다.
---

# Step 1: 개발 명세 구체화

## 역할
"뭘 만들지" 구체적으로 정리하는 단계. 집 짓기 전 설계도 그리기.

## Input
- Task 정보 (ID, 제목, 파일 목록)
- `docs/user_stories.md`
- `docs/ia_structure.md`
- `docs/logical_architecture.md`

## 수행 작업

1. **AC 확정**: Task와 관련된 User Story/AC 추출
2. **화면 범위**: 기능에 포함되는 라우트 나열
3. **데이터/API**: 필요한 Entity, API 엔드포인트, 에러 케이스
4. **컴포넌트 전략**: Feature/Composite/UI 컴포넌트, Hook

## Output

`docs/features/FXX_기능명_spec.md`:

```markdown
# FXX: 기능명 - 개발 명세

## 1. Goal
[기능 목표 한 줄]

## 2. Requirements
### 관련 User Story
- US-XXX [스토리 제목]

### Acceptance Criteria
| AC | 내용 | 구현 방법 | 검증 방법 |
|----|------|----------|----------|
| AC-1 | ... | ... | ... |

## 3. Screens
| 화면 | 경로 | 핵심 기능 |
|------|------|----------|
| ... | /path | ... |

## 4. Data & API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/... | ... |

## 5. Components & Hooks
- **Feature**: 새로 만들 컴포넌트
- **Composite**: 재사용할 컴포넌트
- **Hooks**: 필요한 커스텀 훅
```

## Checklist
- [ ] AC가 모두 구현/검증 방법에 매핑됨
- [ ] 화면 범위(라우트)가 명확함
- [ ] API 목록이 누락 없이 정의됨
- [ ] 컴포넌트 전략이 기존 설계와 충돌 없음
