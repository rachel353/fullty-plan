# 📋 PM Workflow README (Frontend)

**프롬프트/스킬 사용 가이드** — PM 입장에서 각 단계를 명확히 이해하고 실행하세요.

> 🎯 이 리포의 **단일 SSOT(Single Source of Truth)** 는 `tasks/tasks.json` 입니다.

---

## 🚀 전체 플로우 요약 (PM 관점)

```
1️⃣  PRD/SRS 시딩 + tweakcn 설치
       ↓
2️⃣  planning(workflow) 실행 → 문서/Task 자동 생성
       ↓
3️⃣  planning 피드백(HITL) → /change-doc로 정합성 업데이트
       ↓
4️⃣  design_validation_required=true 기능 먼저 개발
       ↓
5️⃣  피드백 루프 (반복 가능)
    ├─ /change-analyzer로 분석
    ├─ (자동) /change-doc로 복구
    └─ /feature-executor로 남은 기능 개발
```

---

## ✅ 공통 원칙 (PM이 지켜야 하는 것)

| 원칙 | 설명 |
|------|------|
| 🎯 **SSOT** | 진행/우선순위/완료는 항상 `tasks/tasks.json` 기준 |
| 🎨 **디자인 우선** | `design_validation_required: true` 기능부터 개발 |
| 📊 **상태값** | `pending` / `in_progress` / `completed` (3가지) |
| ✔️ **Design Review** | `[Design Review]` Task가 `done`이 될 때까지 Feature 미완료 |

---

## 1️⃣ PRD/SRS 생성 및 Seeding + tweakcn 설치

### 1-A. 📄 Seed 문서 준비 (PM 입력물)

**목표**: Sales 자료를 md 파일로 변환하여 `seed-docs` 폴더에 배치

```
seed-docs/
├── PRD.md                    # 제품 정의서 (목표/범위/성공지표)
├── SRS.md                    # 요구사항 명세서 (기능/비기능)
├── requirements.md           # 추가 요구사항
└── IA-rough.md              # 초기 IA 스케치
```

**팁**: 불명확한 사항은 TBD로 명시하면 workflow에서 자동으로 처리됩니다.

---

### 1-B. 🎨 tweakcn 설치 (디자인 시스템 구축)

**목적**: UI 스타일 기준을 미리 고정하여 개발 중 일관성 유지

**단계**:
1. 🌐 [tweakcn.com](https://tweakcn.com) 접속
2. 📐 프로젝트에 어울리는 디자인 선택 & 커스텀
3. 📋 "Code" 버튼 클릭 → 설치 명령어 복사
4. 💻 터미널에서 실행:

```bash
pnpm dlx shadcn@latest add <tweakcn url>
```

---

## 2️⃣ planning(workflow) 실행

### 📝 PM이 실행하는 프롬프트

> 다음을 복사해서 Claude에게 **그대로** 붙여넣으세요.

```markdown
execute workflow. @.claude/scripts/FE-workflow/workflow.json with @seed-docs folder.
don't bother me until you finish.
```

**예상 소요 시간**: 10~30분 (Project 규모에 따라)

---

### 🔄 자동으로 실행되는 Phase 5단계

| Phase | 스킬 | 입력 | 출력 |
|-------|------|------|------|
| 1️⃣ User Story | `user-story` | `seed-docs/*.md` | `docs/user_stories.md` |
| 2️⃣ Conceptual Model | `conceptual-model` | User Stories | `docs/conceptual_model.md` |
| 3️⃣ IA Structure | `ia-structure` | User Stories + Model | `docs/ia_structure.md` |
| 4️⃣ Logical Architecture | `logical-architecture` | 위 3개 + Design Guide | `docs/logical_architecture.md` |
| 5️⃣ **Dev Plan** ✨ | `dev-planner` | IA + Architecture | **`tasks/tasks.json`** |

---

### ✔️ 이 단계 완료 확인 체크리스트

- [ ] `docs/` 폴더에 5개 문서가 모두 생성되었나?
- [ ] `tasks/tasks.json`이 생성되었나?
- [ ] `design_validation_required: true` Feature가 표시되어 있나?
- [ ] 각 Feature의 마지막에 `[Design Review]` Task가 있나?

---

## 3️⃣ planning 피드백 HITL (문서 정합성 업데이트)

### 🔧 PM 피드백 적용

> 핵심: 문서/Task를 "자동으로" 정합성 있게 갱신하는 단계

**프롬프트** (그대로 사용):

```markdown
/change-doc
<여기에 피드백 내용 입력>
```

**예시 피드백**:
```
기능 요구사항이 추가되었습니다: "서명 기능 추가"
이를 IA와 Tasks에 반영해주세요.
```

---

### 📊 기대 결과

✅ 자동 업데이트 대상:
- `docs/user_stories.md`
- `docs/conceptual_model.md`
- `docs/ia_structure.md`
- `docs/logical_architecture.md`
- **`tasks/tasks.json`** (SSOT)

✅ 불명확한 부분은 **TBD로 표시** → 개발 차단 없음

---

## 4️⃣ 디자인 검수 Feature부터 개발

### 🎬 시작하기

> 목표: 대표 화면(Home, Dashboard 등)부터 만들어 **디자인 톤앤매너** 조기 확인

**프롬프트** (그대로 사용):

```markdown
/feature-executor
@tasks/tasks.json에서 design_validation_required = true로설정된 feature들까지 개발해줘
```

---

### 🔄 `/feature-executor` 스킬 내부 자동 실행

> `/feature-executor`가 실행되면 다음 단계들을 순서대로 자동 처리합니다.

일반적인 흐름:
- 🗓️ `/feature-spec` → Feature 계획 문서 생성
- 🔧 각 Task 개발 실행 (Task별로 적절한 스킬 자동 선택)
- 🔍 `[Design Review]` Task → `/rams` 기반 자동 리뷰
  - Critical 이슈 0개가 될 때까지 반복 수정

---

### ✅ 완료 조건

`design_validation_required: true`인 모든 Feature의 **모든 Task가 `done`** 상태

---

## 5️⃣ Feedback Loop (반복 가능)

### 5-1️⃣ 재분석 & 재계획 (고객 Confirm 반영)

> 목적: "바로 고치기"가 아니라, **무엇이 어떻게 바뀌는지 구조적 분석**

**방법 1️⃣: 직접 프롬프트 입력**

```markdown
/change-analyzer
<고객 피드백 내용>
```

**방법 2️⃣: 피드백 문서로 관리** (권장 - 여러 건의 피드백 추적 가능)

```
seed-docs/feedback/
├── feedback-260120-01.md    # 첫 번째 피드백
├── feedback-260120-02.md    # 두 번째 피드백
└── feedback-260121-01.md    # 다음날 피드백
```

파일 생성 후 프롬프트:
```markdown
/change-analyzer
@seed-docs/feedback/feedback-260120-01.md 내용을 분석해줘
```

---

### 📋 자동 생성 & 갱신

✅ 생성:
- `docs/changes/YYYY-MM-DD-HHmm.md` (변경 분석서)
- `tasks/changes/change-YYYY-MM-DD-HHmm.json` (변경 로그)

✅ 갱신:
- **`tasks/tasks.json`** ← SSOT 최신 업데이트

✅ 평행 실행:
- **디자인 관련 피드백 자동 감지** → `/design-insight` 병렬 실행
  - UI/UX/레이아웃/타이포/간격 등 디자인 이슈에서 재사용 가능한 원칙 추출
  - `.claude/design-lib/insights/` 에 문서화

✅ 후속:
- 필요 시 TBD 질문 도출
- **자동으로 `/change-doc` 호출** → 문서 정합성 복구

---

### 5-2️⃣ 남은 Task 개발 (SSOT 기준)

> 목표: `tasks/tasks.json`에서 **`done`이 아닌 모든 Task 처리**

**프롬프트** (템플릿):

```markdown
/feature-executor

Use @tasks/tasks.json as the single source of truth.

Execution rules:

1. A feature is considered "remaining" if it contains at least one task with status != "done".
2. Execute all remaining features.
3. For each feature:
   - If a feature plan/spec already exists, DO NOT run /feature-spec.
   - If no plan/spec exists, run /feature-spec first.
4. After plan resolution, develop at the task level.
5. Skip tasks already marked as "done".
6. Execute tasks in logical order within a feature, considering dependencies.
7. If tasks are independent, execute them in parallel.
8. Do NOT ask the user for confirmation unless information is missing.
```

---

## 📌 부록) PM 빠른 체크리스트

| 단계 | 확인 항목 | 방법 |
|------|---------|------|
| 🌱 Seed | Seed가 충분한가? | `seed-docs/*.md` 확인 (MVP/비범위/정책) |
| 📚 Planning | 산출물이 생겼나? | `docs/` + `tasks/tasks.json` 확인 |
| 🎨 Design | 대표 화면 표시됐나? | `design_validation_required: true` 확인 |
| 📊 SSOT | 최신 상태인가? | Feedback 후 `tasks/tasks.json` 변경 확인 |
| ✅ Review | Design Review 완료? | `[Design Review]` Task = `done` 확인 |

---

## 💡 자주 하는 질문 (FAQ)

**Q: `/change-analyzer` 실행하면 `/design-insight`는 뭐가 자동으로 실행되는 건가요?**
- A: 피드백에 **UI/UX/레이아웃/타이포/간격** 같은 디자인 이슈가 있으면, 자동으로 `/design-insight`가 병렬 실행됩니다.
  - 🎨 재사용 가능한 디자인 원칙을 추출 → `.claude/design-lib/insights/` 에 저장
  - 예: "카드 높이 일관성 필요" → "선택 옵션 카드는 비교를 위해 일정한 높이 유지"로 원칙화
  - 이후 유사한 디자인 이슈가 나오면 이 원칙을 참고할 수 있습니다.

**Q: Design Review Task가 계속 실패하면?**
- A: Critical 이슈를 자동 수정 후 재검증합니다. PM은 기다리기만 하면 됩니다.

**Q: 중간에 피드백 반영하려면?**
- A: 언제든 `/change-analyzer` → 자동 `/change-doc` (+ 필요시 `/design-insight`) → 개발 재개. 루프는 여러 번 가능합니다.

---

**Last Updated**: 2026-01-20  
**문서 관리**: `.claude/scripts/FE-workflow/README_PM.md`
