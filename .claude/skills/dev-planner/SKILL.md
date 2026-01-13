---
name: dev-planner
description: "프론트엔드 개발 계획 수립, Task 생성. 문서 분석 후 tasks/tasks.json 생성, task-management skill 기준으로 Task 분리. (백엔드/API 제외, UI/컴포넌트만) 트리거: 계획 세워줘, plan, Task 생성, 개발 계획"
---

# Dev Planner

프론트엔드 개발 계획 수립과 Task 생성을 담당하는 skill.

> **Note**: Task 상태 업데이트/진행상황 확인은 `task-management` skill 참조

## 범위 제한

> **IMPORTANT**: 프론트엔드(UI/컴포넌트)만 계획한다.

### 포함 (In Scope)
- React/Next.js 컴포넌트 구현
- 페이지 레이아웃 및 라우팅
- UI 상태 관리 (useState, useContext, zustand 등)
- 스타일링 (TailwindCSS, CSS Modules)
- 클라이언트 사이드 로직
- Mock 데이터를 사용한 UI 개발

### 제외 (Out of Scope)
- API 엔드포인트 구현 (app/api/*)
- 데이터베이스 스키마/마이그레이션 (Prisma)
- 서버 사이드 비즈니스 로직
- 인증/인가 백엔드 로직
- 외부 서비스 연동 (S3, AI API 등)

---

## 계획 수립

트리거: "계획 세워줘", "plan", "Task 생성", "개발 계획"

### 워크플로우

```
1. 문서 읽기
   ├─ docs/user_stories.md (MVP 범위 및 우선순위 확정)
   ├─ docs/logical_architecture.md (기능별 화면/컴포넌트/훅 파악)
   ├─ docs/ia_structure.md (페이지 구조 참조)
   └─ docs/conceptual-model.md (데이터 구조 참조용)
        ↓
2. 기능 단위(F01~)로 그룹화
   ├─ logical_architecture.md 기반으로 기능별 묶기
   ├─ 각 기능 단위에 필요한 화면/컴포넌트/훅 정리
   ├─ 기능별 description 작성
   └─ 관련 문서 경로(docs/*.md) 매핑
        ↓
3. 개발 순서 및 의존성 결정
   ├─ 컴포넌트 → 디자인 검증 화면 → 기능 페이지 순서
   ├─ file_structure.md와 충돌 없이 순서 정하기
   ├─ 기능 간 의존성 파악 (예: 인증 → 레이아웃 → 도메인 기능)
   └─ MVP 범위 vs 이후 범위 구분
        ↓
4. Task 생성 (task-management skill 적용)
   ├─ 각 기능 단위별로 Task 생성
   ├─ 프론트엔드 Task만 생성
   ├─ Mock 데이터는 conceptual-model.md 스키마 기반
   └─ 백엔드 요구사항은 conceptual-model.md에 기록
        ↓
5. tasks.json 생성/업데이트
   ├─ features 배열에 기능 단위별로 그룹화
   ├─ 각 feature에 description과 documents 포함
   └─ Python CLI 또는 직접 JSON 작성
        ↓
6. Git 커밋
   └─ git add tasks/ && git commit
```

### 🎯 개발 우선순위 원칙

```
1. 공통 컴포넌트 먼저 → 2. 디자인 검증 화면 → 3. 나머지 기능 페이지
```

- **디자인 검증 화면**: Home, Landing, Dashboard 등 시각적 대표 화면을 먼저 구현
- 목적: 디자인/레이아웃 이슈를 기능 구현 전에 조기 발견

---

### 기능 단위 계획 수립

1. **MVP 범위 확정** (`docs/user_stories.md` 기반)
   - MVP에 포함될 User Story와 우선순위 확정
   - 각 User Story를 기능 단위로 매핑

2. **기능 단위 정의** (`docs/logical_architecture.md` 기반)
   - 기능별로 필요한 화면/컴포넌트/훅을 묶어 "기능 단위(F01~)"로 정리
   - 각 기능 단위에 대한 간단한 description 작성
   - 관련 문서 경로(docs 폴더 내) 매핑

3. **개발 순서 결정**
   - `docs/file_structure.md`와 충돌 없이 순서 정하기
   - 컴포넌트 → 디자인 검증 화면 → 기능 페이지 순서
   - 기능 간 의존성 고려 (예: 인증 → 레이아웃 → 도메인 기능)
   - MVP 범위 우선 개발, 이후 범위는 별도로 관리

### 백엔드 요구사항 처리

프론트엔드 개발 중 발견되는 백엔드 요구사항은 `docs/conceptual-model.md`에 기록:

```markdown
## 백엔드 요구사항 (Frontend 완료 후 개발)

### API 엔드포인트
| 메서드 | 경로 | 설명 | 요청 | 응답 |
|--------|------|------|------|------|
| GET | /api/water-quality | 수질 데이터 조회 | region: string | WaterQualityData |

### 데이터 스키마
- User: { id, name, email, ... }
```

### Task 추가 명령어

```bash
python scripts/task_manager.py add \
  --title "Button 컴포넌트 구현" \
  --priority high \
  --feature "공통 컴포넌트" \
  --depends "" \
  --files "components/ui/Button.tsx"
```

> **주의**: `app/api/**`, `prisma/**` 파일은 Task에 포함하지 않는다.

---

## Task JSON 스키마

> **IMPORTANT**: tasks.json 파일을 생성/수정할 때는 반드시 아래 스키마를 준수해야 합니다.

파일: `tasks/tasks.json`
스키마: `@reference/schema.json` (JSON Schema Draft-07)
템플릿: `@reference/template.json` (복사해서 사용 가능)

### 예시 구조

```json
{
  "metadata": {
    "created_at": "2025-01-01T00:00:00",
    "last_updated": "2025-01-01T00:00:00",
    "version": "1.0"
  },
  "features": [
    {
      "number": "F00",
      "name": "프로젝트 설정",
      "design_validation_required": false,
      "tasks": [
        {
          "id": "task-001",
          "title": "TailwindCSS 설정",
          "status": "completed",
          "priority": "high",
          "dependencies": [],
          "files": ["tailwind.config.js"],
          "created_at": "2025-01-01T00:00:00",
          "updated_at": "2025-01-01T00:00:00"
        }
      ]
    },
    {
      "number": "F01",
      "name": "공통 컴포넌트",
      "design_validation_required": false,
      "tasks": [
        {
          "id": "task-002",
          "title": "Button 컴포넌트 구현",
          "status": "in_progress",
          "priority": "high",
          "dependencies": ["task-001"],
          "files": ["components/ui/Button.tsx"],
          "created_at": "2025-01-01T00:00:00",
          "updated_at": "2025-01-01T00:00:00"
        }
      ]
    },
    {
      "number": "F02",
      "name": "홈페이지",
      "design_validation_required": true,
      "tasks": [
        {
          "id": "task-003",
          "title": "홈페이지 UI 구현",
          "status": "blocked",
          "priority": "medium",
          "dependencies": ["task-002"],
          "files": ["app/page.tsx"],
          "created_at": "2025-01-01T00:00:00",
          "updated_at": "2025-01-01T00:00:00"
        }
      ]
    }
  ]
}
```

| 필드 | 타입 | 설명 |
|------|------|------|
| features | array | Feature별로 그룹화된 Task 목록 |
| features[].number | string | Feature 번호 (예: "F01", "F02") |
| features[].name | string | Feature 이름 (기능/도메인, 예: "F01 인증", "프로젝트 설정") |
| features[].design_validation_required | boolean | 디자인 검증 화면 여부 (true: Home, Landing, Dashboard 등) |
| features[].tasks | array | 해당 Feature의 Task 목록 |
| features[].tasks[].id | string | 고유 ID (task-XXX) |
| features[].tasks[].title | string | Task 제목 (한 문장) |
| features[].tasks[].status | enum | pending, in_progress, completed, blocked |
| features[].tasks[].priority | enum | high, medium, low |
| features[].tasks[].dependencies | string[] | 의존하는 Task ID 목록 |
| features[].tasks[].files | string[] | 관련 파일 경로 |
| features[].tasks[].blocked_reason | string? | blocked 상태일 때 사유 |
