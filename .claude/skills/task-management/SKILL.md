---
name: task-management
description: "Task 생성 기준, 완료 판단, 상태 업데이트, 진행상황 확인. 트리거: 상태 업데이트, update, 완료 체크, done 확인, 진행상황, progress, 현황, Task 목록"
---

# Task Management Skill

## Overview

이 skill은 개발 Task의 생성과 완료 판단에 대한 표준을 정의합니다.

```
Task 생성 → 우선순위 할당 → 의존성 파악 → 상태 추적 → 완료 판단
```

---

## Part 1: Task 생성 기준

### 1.1 적절한 Task 크기

**원칙**: 1-3일 내 완료 가능하고, 한 문장으로 설명 가능해야 함

| 기준 | 적절 | 부적절 |
|------|------|--------|
| 기간 | 1-3일 | 1주일 이상 |
| 파일 수 | 1-3개 | 5개 이상 |
| 설명 | 한 문장 | "그리고", "또한" 필요 |
| 기능 | 단일 기능 | 복합 기능 |

### 1.2 너무 큰 Task 신호

Task가 다음 신호를 보이면 **분리 필요**:

```
❌ 너무 큰 Task 신호:
├─ "그리고" / "또한" / "및" 포함
├─ 여러 도메인에 걸침 (인증 + 대시보드)
├─ 5개 이상 파일 생성/수정
├─ 다양한 기능 포함 (CRUD 전체)
└─ "시스템", "모듈", "전체" 단어 포함
```

**분리 예시**:

```
❌ "인증 시스템 구축"
    ↓ 분리
✅ Task 1: "로그인 API 엔드포인트 구현"
✅ Task 2: "회원가입 폼 UI 구현"
✅ Task 3: "JWT 토큰 검증 미들웨어 구현"
✅ Task 4: "로그아웃 기능 구현"
```

### 1.3 우선순위 판단

| Priority | 기준 | 예시 |
|----------|------|------|
| **High** | 다른 작업의 전제 조건 | 인증, 레이아웃, 핵심 도메인 모델, DB 스키마 |
| **Medium** | 핵심 기능이지만 독립적 | 부가 기능, 특정 페이지, 개별 API |
| **Low** | 없어도 MVP 동작 | 최적화, UX 개선, 리팩토링 |

**우선순위 결정 트리**:

```
이 Task 없이 앱이 작동하는가?
├─ No → High
└─ Yes
   └─ 핵심 비즈니스 로직인가?
      ├─ Yes → Medium
      └─ No → Low
```

### 1.4 의존성 파악

**의존성 표현 규칙**: "A가 없으면 B를 시작할 수 없다"

```json
{
  "task_id": "task-005",
  "title": "대시보드 페이지 구현",
  "depends_on": ["task-001", "task-003"],
  "reason": "인증(task-001)과 레이아웃(task-003) 없이는 대시보드 접근 불가"
}
```

**의존성 유형**:

| 유형 | 설명 | 예시 |
|------|------|------|
| **Hard** | 필수, 차단됨 | 인증 → 보호된 페이지 |
| **Soft** | 권장, 진행 가능 | 디자인 시스템 → UI 컴포넌트 |

**일반적 의존성 패턴**:

```
1. 인증 → 모든 보호된 페이지
2. 레이아웃 → 모든 페이지 컴포넌트
3. DB 스키마 → API 엔드포인트
4. API → 프론트엔드 데이터 연동
5. 타입 정의 → 해당 타입 사용하는 코드
```

---

## Part 2: Task 완료 판단 기준

### 2.1 상태 정의

| 상태 | 의미 |
|------|------|
| `pending` | 시작 전 |
| `in_progress` | 작업 중 |
| `blocked` | 의존성으로 차단 |
| `done` | 완료 |

### 2.2 Done 조건

**모두 만족해야 done**:

```
✅ done 조건 체크리스트:
├─ [1] 관련 파일 존재
│   └─ 명시된 파일이 실제로 생성/수정됨
├─ [2] 기본 로직 구현됨
│   ├─ 필요한 import 문 존재
│   ├─ 주요 함수/컴포넌트 정의됨
│   └─ export 문 존재 (필요시)
├─ [3] 명백한 에러 없음
│   ├─ 문법 오류 없음
│   ├─ import 오류 없음
│   └─ 타입 에러 없음 (TS 프로젝트)
└─ [4] 커밋됨 (선택적)
    └─ 관련 변경사항이 커밋됨
```

**검증 방법**:

```bash
# 파일 존재 확인
ls -la [target_file]

# 문법/타입 에러 확인
npx tsc --noEmit  # TypeScript
npm run lint      # ESLint

# 빌드 확인
npm run build
```

### 2.3 In Progress 조건

**파일은 있지만 로직이 불완전**:

```
🔄 in_progress 신호:
├─ 파일 생성됨 but 내용 비어있음
├─ TODO/FIXME 주석 존재
├─ 함수 시그니처만 있고 구현 없음
├─ 하드코딩된 mock 데이터 사용 중
└─ console.log 디버깅 코드 존재
```

**예시**:

```typescript
// in_progress 상태
export function fetchUsers() {
  // TODO: API 연동 필요
  return [];
}
```

### 2.4 Blocked 조건

**의존성 Task가 done이 아님**:

```
🚫 blocked 조건:
├─ Hard 의존성 Task가 pending/in_progress
├─ 필요한 파일이 아직 생성 안됨
└─ 필요한 타입/인터페이스가 정의 안됨
```

**blocked 해제 조건**: 모든 Hard 의존성이 done

---

## Part 3: 예시

### 3.1 적절한 Task 예시

| Task | 이유 |
|------|------|
| ✅ "로그인 API 엔드포인트 구현" | 1개 파일, 명확한 범위 |
| ✅ "사용자 목록 테이블 컴포넌트 구현" | 단일 컴포넌트, 1-2일 |
| ✅ "JWT 토큰 검증 미들웨어 추가" | 단일 기능, 명확한 목적 |
| ✅ "회원가입 폼 유효성 검증 추가" | 한정된 범위 |

### 3.2 부적절한 Task 예시

| Task | 문제 | 분리 방안 |
|------|------|----------|
| ❌ "인증 시스템 구축" | 너무 큼 | 로그인/회원가입/토큰/로그아웃 분리 |
| ❌ "사용자 관리 CRUD 구현" | 복합 기능 | Create/Read/Update/Delete 각각 분리 |
| ❌ "대시보드 페이지 및 차트 구현" | "및" 포함 | 페이지 레이아웃 / 차트 컴포넌트 분리 |
| ❌ "API 최적화 및 에러 처리 개선" | 다중 목적 | 최적화 / 에러 처리 분리 |

### 3.3 전체 Task 목록 예시

```json
{
  "tasks": [
    {
      "id": "task-001",
      "title": "NextAuth 설정 및 로그인 API 구현",
      "priority": "high",
      "status": "done",
      "depends_on": [],
      "files": ["app/api/auth/[...nextauth]/route.ts"]
    },
    {
      "id": "task-002",
      "title": "공통 레이아웃 컴포넌트 구현",
      "priority": "high",
      "status": "done",
      "depends_on": [],
      "files": ["components/layout/MainLayout.tsx"]
    },
    {
      "id": "task-003",
      "title": "대시보드 페이지 기본 구조 구현",
      "priority": "medium",
      "status": "in_progress",
      "depends_on": ["task-001", "task-002"],
      "files": ["app/dashboard/page.tsx"]
    },
    {
      "id": "task-004",
      "title": "사용자 목록 API 구현",
      "priority": "medium",
      "status": "blocked",
      "depends_on": ["task-001"],
      "blocked_reason": "인증 미들웨어 완료 필요",
      "files": ["app/api/users/route.ts"]
    }
  ]
}
```

---

## Task 상태 판단 플로우차트

```
Task 상태 판단 시작
        │
        ▼
┌─────────────────────┐
│ 의존성 Task 확인    │
└─────────────────────┘
        │
        ▼
  모든 의존성 done?
    │         │
   No        Yes
    │         │
    ▼         ▼
 blocked   파일 존재?
              │
         No   │   Yes
          │   │    │
          ▼   │    ▼
       pending │  로직 완성?
              │    │
              │ No │ Yes
              │  │ │  │
              │  ▼ │  ▼
              │ in_progress
              │         │
              └────────▶│
                       done
```

---

## 검증 체크리스트

Task 생성 시:
- [ ] 한 문장으로 설명 가능한가?
- [ ] 1-3일 내 완료 가능한가?
- [ ] "그리고/및/또한" 없이 표현되는가?
- [ ] 의존성이 명확히 파악되었는가?
- [ ] 우선순위가 할당되었는가?

Task 완료 판단 시:
- [ ] 관련 파일이 존재하는가?
- [ ] 기본 로직이 구현되었는가?
- [ ] 명백한 에러가 없는가?
- [ ] TODO/FIXME 주석이 남아있지 않은가?

---

## Part 4: 상태 업데이트

트리거: "상태 업데이트", "update", "완료 체크", "done 확인"

### 워크플로우

```
1. Task 목록 확인 → 2. 파일 확인 → 3. done 조건 체크 → 4. 상태 업데이트
```

### CLI 명령어

```bash
python scripts/task_manager.py update task-001 --status done
python scripts/task_manager.py update task-003 --status blocked --blocked-reason "task-001 완료 필요"
```

---

## Part 5: 진행상황 확인

트리거: "진행상황", "progress", "현황", "Task 목록"

### CLI 명령어

```bash
python scripts/task_manager.py list                    # 전체 목록
python scripts/task_manager.py list --status pending   # 상태별 필터
python scripts/task_manager.py list --feature "인증"   # 기능별 필터
python scripts/task_manager.py show task-001           # 상세 보기
```
