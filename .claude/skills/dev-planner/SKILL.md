---
name: dev-planner
description: "프론트엔드 개발 계획 수립, Task 생성/업데이트. 문서 분석 후 tasks/tasks.json 생성, task-management skill 기준으로 Task 분리 및 상태 관리. (백엔드/API 제외, UI/컴포넌트만) 트리거: 계획 세워줘, plan, Task 생성, 개발 계획, 상태 업데이트, update, 완료 체크, 진행상황, progress, 현황, Task 목록"
---

# Dev Planner

프론트엔드 개발 계획 수립과 Task 관리를 담당하는 skill.

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

## Mode 1: 계획 수립

트리거: "계획 세워줘", "plan", "Task 생성", "개발 계획"

### 워크플로우

```
1. 문서 읽기
   ├─ docs/user_stories.md
   ├─ docs/ia_structure.md
   ├─ docs/logical_architecture.md
   └─ docs/conceptual-model.md (데이터 구조 참조용)
        ↓
2. 분석 (프론트엔드만 필터링)
   ├─ UI 컴포넌트 추출
   ├─ 페이지 구조 파악
   ├─ 의존성 파악
   └─ API/DB 요구사항 → conceptual-model.md에 정리
        ↓
3. Task 생성 (task-management skill 적용)
   ├─ 프론트엔드 Task만 생성
   ├─ Mock 데이터는 conceptual-model.md 스키마 기반
   └─ 백엔드 요구사항은 conceptual-model.md에 기록
        ↓
4. Python CLI 실행
   └─ python scripts/task_manager.py add ...
        ↓
5. Git 커밋
   └─ git add tasks/ && git commit
```

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

## Mode 2: 상태 업데이트

트리거: "상태 업데이트", "update", "완료 체크", "done 확인"

### 워크플로우

```
1. 현재 Task 목록 확인
   └─ python scripts/task_manager.py list --status in_progress
        ↓
2. 각 Task의 파일 확인
   └─ Task에 명시된 파일들 Read
        ↓
3. done 조건 체크
   ├─ [1] 파일 존재?
   ├─ [2] 기본 로직 구현됨?
   ├─ [3] 명백한 에러 없음?
   └─ [4] TODO/FIXME 없음?
        ↓
4. 상태 결정
   ├─ 모두 만족 → done
   ├─ 파일 있지만 불완전 → in_progress 유지
   └─ 의존성 미완료 → blocked
        ↓
5. Python CLI로 업데이트
   └─ python scripts/task_manager.py update <task_id> --status done
```

### done 조건 체크리스트

```
✅ done 조건:
├─ [1] 관련 파일 존재
├─ [2] 기본 로직 구현됨 (import, 함수/컴포넌트 정의, export)
├─ [3] 명백한 에러 없음 (문법, import, 타입)
└─ [4] TODO/FIXME 주석 없음

🔄 in_progress 유지:
├─ 파일 있지만 내용 비어있음
├─ TODO/FIXME 존재
├─ 함수 시그니처만 있고 구현 없음
└─ mock 데이터 사용 중

🚫 blocked:
└─ 의존성 Task가 done이 아님
```

### 상태 업데이트 명령어

```bash
# 상태 업데이트
python scripts/task_manager.py update task-001 --status done

# blocked 처리 (사유 포함)
python scripts/task_manager.py update task-003 --status blocked --blocked-reason "task-001 완료 필요"
```

---

## Mode 3: 진행상황

트리거: "진행상황", "progress", "현황", "Task 목록"

### 명령어

```bash
# 전체 목록
python scripts/task_manager.py list

# 상태별 필터
python scripts/task_manager.py list --status pending
python scripts/task_manager.py list --status in_progress

# 기능별 필터
python scripts/task_manager.py list --feature "인증"

# 특정 Task 상세
python scripts/task_manager.py show task-001
```

### 출력 포맷

```
📋 프론트엔드 Task 진행상황
==========================

📊 통계
- 총: 10개
- 완료: 3개 (30%)
- 진행중: 2개
- 대기: 4개
- 차단: 1개

🔴 High Priority (프로젝트 설정)
-------------------------------
✅ task-001: TailwindCSS 및 디자인 시스템 설정
🔄 task-002: Button 컴포넌트 구현

🟡 Medium Priority (페이지 UI)
-----------------------------
🚫 task-005: 설문 페이지 UI 구현
   └─ 차단 사유: task-003 완료 필요
```

---

## Task JSON 스키마

파일: `tasks/tasks.json`

```json
{
  "metadata": {
    "created_at": "2025-01-01T00:00:00",
    "last_updated": "2025-01-01T00:00:00",
    "version": "1.0"
  },
  "tasks": [
    {
      "id": "task-001",
      "title": "TailwindCSS 설정",
      "status": "done",
      "priority": "high",
      "feature": "프로젝트 설정",
      "dependencies": [],
      "files": ["tailwind.config.js"],
      "created_at": "2025-01-01T00:00:00",
      "updated_at": "2025-01-01T00:00:00"
    },
    {
      "id": "task-002",
      "title": "Button 컴포넌트 구현",
      "status": "in_progress",
      "priority": "high",
      "feature": "공통 컴포넌트",
      "dependencies": ["task-001"],
      "files": ["components/ui/Button.tsx"],
      "created_at": "2025-01-01T00:00:00",
      "updated_at": "2025-01-01T00:00:00"
    },
    {
      "id": "task-003",
      "title": "설문 페이지 UI 구현",
      "status": "blocked",
      "priority": "medium",
      "feature": "페이지 UI",
      "dependencies": ["task-002"],
      "files": ["app/survey/page.tsx"],
      "blocked_reason": "task-002 완료 필요",
      "created_at": "2025-01-01T00:00:00",
      "updated_at": "2025-01-01T00:00:00"
    }
  ]
}
```

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | 고유 ID (task-XXX) |
| title | string | Task 제목 (한 문장) |
| status | enum | pending, in_progress, done, blocked |
| priority | enum | high, medium, low |
| feature | string | 관련 기능/도메인 |
| dependencies | string[] | 의존하는 Task ID 목록 |
| files | string[] | 관련 파일 경로 |
| blocked_reason | string? | blocked 상태일 때 사유 |

---

## Task 생성/완료 기준 (task-management skill 참조)

### Task 생성 시 확인
- [ ] 한 문장으로 설명 가능한가?
- [ ] 1-3일 내 완료 가능한가?
- [ ] "그리고/및/또한" 없이 표현되는가?
- [ ] 의존성이 명확히 파악되었는가?

### Task 완료 판단 시 확인
- [ ] 관련 파일이 존재하는가?
- [ ] 기본 로직이 구현되었는가?
- [ ] 명백한 에러가 없는가?
- [ ] TODO/FIXME 주석이 남아있지 않은가?
