# AI-Driven FRONTEND Development Workflow (HITL)

이 프로젝트는 **PRD → Planning → 개발 → 피드백 → 재개발** 전 과정을

AI가 주도하고, **Human은 문서·의사결정에만 개입(HITL)** 하는 구조를 따른다.

---

## 🎯 Core Principles

- **Single Source of Truth**: `tasks/tasks.json`
- **Human-in-the-loop(HITL)**:
    
    문서 변경 · 요구사항 수정 · 승인 단계에만 개입
    
- **Implementation Autonomy**:
    
    개발 단계에서는 AI가 확인 요청 없이 자율 실행
    
- **Design-first Validation**:
    
    디자인 검수 대상 feature를 우선 개발
    

---

## 📁 Key Artifacts

```
seed_docs/          # 초기 PRD / SRS 시드
docs/               # 요구사항, 설계, 변경 문서
tasks/tasks.json    # 전체 개발 상태의 단일 기준
.claude/scripts/    # workflow, executor 스크립트

```

---

## 1️⃣ PRD / SRS 생성 & 프로젝트 시딩

### 1. 문서 시딩

- PRD / SRS를 `seed_docs/` 기준으로 생성

### 2. tweakcn 테마 설치 (선행 필수)

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmk2dt04m000f04lbc9x47d7f

```

---

## 2️⃣ Planning (Workflow 실행)

### 목적

- FE 개발 문서 생성
- Feature 단위 plan / spec 정리
- `tasks/tasks.json` 자동 생성

### 규칙

- **디자인 검수 대상 페이지**
    
    ```json
    "design_validation_required": true
    
    ```
    

### 실행

```markdown
execute workflow. @.claude/scripts/workflow/workflow.json with @seed_docs folder.
don't bother me untill you finish.

```

---

## 3️⃣ Planning 피드백 (HITL)

### 목적

- Human이 커맨드를 통해
    
    **문서 + tasks.json을 구조적으로 수정**
    

### 사용 커맨드

```markdown
/change-doc
<피드백 내용>

```

### 결과

- `docs/` 문서 업데이트
- `tasks/tasks.json` 자동 반영

---

## 4️⃣ 디자인 검수 대상 Feature 우선 개발

### 조건

- `design_validation_required = true`
- 해당 feature **전부 완료 시 종료**

### 실행

```markdown
/feature-executor
@tasks/tasks.json에서 design_validation_required = true로설정된 feature들까지 개발해줘

```

---

## 5️⃣ Feedback Loop (반복 가능)

### 5-1. Replan HITL (Confirm 단계)

### 목적

- 요구사항 변경
- 디자인 수정
- TBD 정리

### 실행

```markdown
/change-analyzer
<피드백 내용>
```

### 처리 내용

- 변경사항 요구사항 문서화
- 디자인 인사이트 저장 (필요 시)
- TBD 질문 정리
- `/change-docs` 자동 호출

👉 승인 시 Loop 종료

---

### 5-2. Remaining Task 개발

```markdown
/feature-executor

Use @tasks/tasks.json as the single source of truth.

Execution rules:

1. A feature is "remaining" if at least one task is not completed.
2. Execute all remaining features.
3. If a feature spec exists, DO NOT run /feature-spec.
4. If no spec exists, run /feature-spec first.
5. Skip completed tasks.
6. Respect task dependencies.
7. Run independent tasks in parallel.
8. Do NOT ask for confirmation unless information is missing.

```

---

## ✅ 종료 조건

- `design_validation_required` feature 전부 완료
- Replan 승인 완료
- `tasks/tasks.json` 내 **모든 task = completed**

---

## 🧠 Why This Works

- Human은 **결정·검증·변경 관리**에만 집중
- AI는 **계획 → 실행 → 반복**을 자동 수행
- 문서 ↔ task ↔ 코드 간 정합성 유지
- 회의가 아닌 **커맨드 기반 개발 운영**