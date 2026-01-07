# Tasks 폴더 구조

이 폴더는 프론트엔드 개발 워크플로우를 관리합니다.

## 파일 구조

```
worflow/
├── workflow.json          # 워크플로우 Phase 정의 및 상태
├── workflow.schema.json   # JSON 스키마 (유효성 검증용)
└── README.md              # 이 파일

tasks/
├── tasks.json          # 워크플로우 Phase 정의 및 상태

```

## 워크플로우 Phase 순서

```
Phase 1: User Story 생성
    ↓
Phase 2: Conceptual Model 설계
    ↓
Phase 3: IA Structure 설계
    ↓
Phase 4: Logical Architecture 설계
    ↓
Phase 5: Dev Plan 수립
    ↓
[개발 시작]
```

## Phase별 상세

### Phase 1: User Story 생성
- **Skill**: `user-story`
- **입력**: `seed-docs/*.md`
- **출력**: `docs/user_stories.md`, `docs/user_stories_data.json`
- **검증**: User Story 3개 이상 ("As a" 패턴)

### Phase 2: Conceptual Model 설계
- **Skill**: `conceptual-model`
- **입력**: `docs/user_stories.md`
- **출력**: `docs/conceptual_model.md`, `docs/conceptual_model.json`
- **검증**: Entity 3개 이상

### Phase 3: IA Structure 설계
- **Skill**: `ia-structure`
- **입력**: `docs/user_stories.md`, `docs/conceptual_model.md`
- **출력**: `docs/ia_structure.md`, `docs/file_structure.md`
- **검증**: Page/Screen 3개 이상
- **Design Guide 활용**: 스크린샷으로 화면 구조 참고

### Phase 4: Logical Architecture 설계
- **Skill**: `logical-architecture`
- **입력**: `docs/user_stories.md`, `docs/conceptual_model.md`, `docs/ia_structure.md`
- **출력**: `docs/logical_architecture.md`
- **검증**: Component 3개 이상
- **Design Guide 활용**: Component Patterns 섹션 참조

### Phase 5: Dev Plan 수립
- **Skill**: `dev-planner`
- **입력**: `docs/ia_structure.md`, `docs/logical_architecture.md`
- **출력**: `docs/dev_plan.md`, `tasks/tasks.json`
- **검증**: Task 5개 이상
- **Design Guide 활용**: 디자인 토큰을 Task에 첨부

## 사용법

### Claude에게 Phase 실행 요청

```
# Phase 1 시작
Phase 1 실행해줘

# 현재 상태 확인
워크플로우 상태 보여줘

# 특정 Phase 검증
Phase 2 검증해줘

# 전체 워크플로우 실행
Phase 1부터 5까지 순서대로 실행해줘
```

### 워크플로우 상태 확인

`workflow.json`의 `status` 필드로 각 Phase 상태 확인:
- `pending`: 대기 중
- `in_progress`: 진행 중
- `completed`: 완료
- `skipped`: 스킵됨
- `failed`: 실패

## Design Guide 활용 시점

| Phase | 활용도 | 참고 파일 |
|-------|--------|----------|
| 1 | - | - |
| 2 | - | - |
| 3 | 참고 | `viewport_screenshot.png`, `responsive_*.png` |
| 4 | 활용 | `design-guide.md` (Component Patterns) |
| 5 | 활용 | `design-guide.md`, `design_data.json` |
| 개발 | 핵심 | 모든 파일 |

## 주의사항

1. **Phase 순서 준수**: 의존성이 있는 Phase는 선행 Phase 완료 후 실행
2. **검증 필수**: 각 Phase 완료 후 validation rules 통과 확인
3. **Design Guide 참조**: Phase 4, 5에서는 반드시 Design Guide 참조
4. **tasks.json**: Phase 5 완료 후에만 생성됨
