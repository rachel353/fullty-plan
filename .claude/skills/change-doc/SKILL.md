---
name: change-doc
description: 변경 사항을 기존 FE 문서에 반영하여 정합성을 복구합니다. (1) change-analyzer 결과물(docs/changes/*.md)이 있을 때, (2) planning 피드백으로 즉시 문서 수정이 필요할 때 사용합니다. conceptual_model, ia_structure, logical_architecture, user_stories 등 모든 관련 문서를 업데이트합니다. (project)
---

# FE Doc Reconciler

변경 이후에도 **개발 문서들이 서로 모순 없이 작동하도록 정합성을 복구**합니다.

## 사용 맥락

1. **change-analyzer 완료 후**: `docs/changes/YYYY-MM-DD-HHmm.md` 기반 문서 업데이트
2. **planning 피드백 직후**: 기획/구조 문서 수정 요청 즉시 반영

## Input

다음 중 하나:
- `docs/changes/YYYY-MM-DD-HHmm.md` (change-analyzer 결과)
- 사용자가 직접 전달한 planning 피드백

## Process

### Step 1: 변경 문서 확인

change-analyzer 결과가 있다면:
```bash
ls docs/changes/*.md
```
최신 변경 문서를 읽고 영향 받는 모듈 목록 확인.

planning 피드백이라면:
- 피드백 내용에서 영향 범위 파악

### Step 2: 문서별 불일치 점검 및 갱신

아래 문서들을 순차적으로 점검하고 필요 시 수정:

#### 2-1. conceptual_model (중요)

**반드시 먼저 점검**. 개념 모델이 변경되면 다른 모든 문서에 영향.

- `docs/conceptual_model.md` - 개념 설명 업데이트
- `docs/conceptual_model.json` - 구조화된 데이터 업데이트

점검 항목:
- 새로운 Entity/Concept 추가 필요?
- 기존 Entity 속성/관계 변경?
- Entity 제거?

#### 2-2. user_stories

- `docs/user_stories.md`
- `docs/user_stories_data.json`

점검 항목:
- 새로운 User Story 추가 필요?
- 기존 AC(Acceptance Criteria) 수정?
- 우선순위 변경?

#### 2-3. ia_structure

- `docs/ia_structure.md`

점검 항목:
- 새로운 화면/라우트 추가?
- 화면 계층 구조 변경?
- 네비게이션 흐름 변경?

#### 2-4. logical_architecture

- `docs/logical_architecture.md`

점검 항목:
- 새로운 컴포넌트 추가?
- 컴포넌트 책임 변경?
- 의존성 변경?

#### 2-5. tasks.json

- `tasks/tasks.json`

점검 항목:
- pending/in-progress Task 조정 필요?
- 새로운 Task 추가?
- 영향 받는 Task? 

#### 2-6. file_structure

- `docs/file_structure.md`

점검 항목:
- 새로운 파일/폴더 추가?
- 파일 위치 변경?

#### 2-7. dev_plan

- `docs/dev_plan.md`

점검 항목:
- Task 추가/수정 필요?
- 의존성 변경?


### Step 3: 권한/Validation 일관성 확인

변경에 권한/validation 관련 내용이 있다면:
- 모든 문서에서 접근 제어 정책이 일관되는지 확인
- 불일치 발견 시 수정

### Step 4: 변경 문서에 결과 기록

`docs/changes/YYYY-MM-DD-HHmm.md`에 다음 섹션 추가:

```markdown
## 문서 정합성 복구 결과

### 수정된 문서
| 문서 | 변경 내용 |
|------|----------|
| conceptual_model.md | Entity X 속성 추가 |
| ia_structure.md | /new-route 추가 |

### 충돌 점검 결과
- [x] conceptual_model ↔ user_stories 일관성 확인
- [x] ia_structure ↔ file_structure 일관성 확인
- [x] logical_architecture ↔ file_structure 일관성 확인

### 후속 조치
- [ ] Task-xxx 생성 필요
- [ ] BE 팀에 API 변경 요청 필요
```

### Step 5: 사용자 확인 후 커밋

**자동 커밋하지 않음**. 반드시 사용자에게 변경 요약을 보여주고 확인 받음.

```
## 문서 변경 요약

다음 문서들이 수정되었습니다:
- docs/conceptual_model.md (Entity X 추가)
- docs/conceptual_model.json (동기화)
- docs/ia_structure.md (/new-route 추가)
- docs/changes/YYYY-MM-DD-HHmm.md (복구 결과 기록)

커밋 메시지 제안:
"docs: 변경 피드백 반영 (YYYY-MM-DD-HHmm)"

커밋하시겠습니까? (Y/n)
```

사용자 동의 후에만 커밋 실행.

## Output

- 수정된 문서 목록
- 정합성이 복구된 docs + tasks 상태
- (사용자 동의 시) Git 커밋

## 중요 원칙

1. **conceptual_model 우선**: 개념 변경은 모든 문서에 영향. 항상 먼저 점검.
2. **json 동기화**: `.md`와 `.json` 파일은 항상 동기화 유지.
3. **최소 변경**: 필요한 부분만 수정. 불필요한 리팩토링 금지.
4. **TBD 명시**: 결정할 수 없는 사항은 TBD로 명시하여 개발 BLOCK 방지.
5. **커밋 전 확인**: 항상 사용자 승인 후 커밋.
