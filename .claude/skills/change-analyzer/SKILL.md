---
name: change-analyzer
description: FE 변경 요구사항을 분석하여 변경 유형(Added/Removed/Modified/Impact-shift)과 영향 범위(화면/컴포넌트/상태/스타일)를 구조적으로 규명합니다. FE 개발 완료 후 디자인/기능/정책/화면구조 피드백이 들어왔을 때 사용합니다. 바로 수정하지 않고, 먼저 무엇이 어떻게 바뀌는지 분석합니다. 분석 완료 후 tasks.json을 갱신하고 change-doc 스킬을 자동 호출합니다. (project)
---

# FE Change Analyzer

FE 개발 완료 후 피드백이 들어왔을 때, **바로 고치지 않고** 변경의 성격과 범위를 먼저 구조적으로 분석합니다.

## 핵심 원칙

```
tasks.json = 현재 유효한 기획 상태 (SSOT, Single Source of Truth)
tasks/changes/*.json = 변경 이력 (append-only log)
```

- `tasks.json`은 **항상 최신 기획 상태**만 유지
- 변경 이력은 `tasks/changes/`에 **별도 로그로 관리**
- Change의 status ≠ Task의 status (분리 관리)

## Input

사용자로부터 전달된 **변경 요구사항 원문**:
- 디자인 피드백
- 기능/정책 피드백
- 화면 구조 변경 요청

## Process

### Phase A: 변경 유형 분석

1. **원문 보존**: 변경 요구사항을 요약/의역하지 않고 그대로 보존
2. **원자적 분해**: 변경 내용을 가능한 작게 쪼개 "원자적 변경 항목" 리스트 생성
3. **유형 분류**: 각 항목을 아래 중 하나로 분류
   - `Added`: 새 요구사항 추가
   - `Removed`: 기존 요구사항 제거
   - `Modified`: 동작/조건/내용 변경
   - `Impact-shift`: 요구는 동일하나 우선순위/범위/리스크 변경
4. **메타데이터 부착**:
   - 변경 요약 (1줄)
   - 근거 원문 인용
   - 영향 모듈 후보 (Route / Component / US-xxx 등)

### Phase B: 영향 범위 분석 (FE 한정)

> UI(화면/컴포넌트/상태/UX)만 분석. API/DB/Migration은 범위 밖.

1. **화면(Route)**: 신규 화면 필요 여부, 기존 화면 레이아웃/플로우 변경
2. **컴포넌트**: 기존 컴포넌트 수정, 신규 컴포넌트 필요
3. **상태/Interaction**: 훅/store 변경, 사용자 인터랙션 변화
4. **스타일/UX**: 디자인 변경, 접근성/반응형 영향
5. **모듈 의존성**: From → To → 이유
6. **TBD 분리**: 미결정 사항 별도 기록

### Phase C: 문서 생성

타임스탬프 생성 후 아래 파일 작성:

```
docs/changes/YYYY-MM-DD-HHmm.md      # 변경 분석 문서 (사람용)
tasks/changes/change-YYYY-MM-DD-HHmm.json  # 변경 로그 (기계용, append-only)
```

### Phase D: tasks.json 갱신 (NEW)

변경 분석 완료 후 `tasks/tasks.json`을 **SSOT로 갱신**:

1. **meta 섹션 업데이트**:
   - `meta.version` 증가 (날짜.순번 형식)
   - `meta.lastChange` = 생성된 change ID
   - `meta.lastUpdated` = 현재 타임스탬프

2. **영향받는 Task 갱신**:
   - `notes` 필드에 변경 참조 추가: `[완료] 설명 (change-YYYY-MM-DD-HHmm)`
   - 필요시 `status` 변경 (e.g., `completed` → `in_progress`)
   - 새 Task 필요시 추가

3. **Change Log 상태 설정**:
   - 생성 시: `status: "pending"`
   - tasks.json 반영 완료 시: `status: "applied"`

## Output Format

### docs/changes/YYYY-MM-DD-HHmm.md

```markdown
# Change Analysis: [간단한 제목]

> 생성일시: YYYY-MM-DD HH:mm
> 상태: pending | applied | reverted | deprecated

## 원문 (Raw Feedback)

[사용자 피드백 원문 그대로]

## 변경 항목 (Change Items)

### CI-001: [변경 요약]
- **유형**: Added | Removed | Modified | Impact-shift
- **근거 원문**: "[인용]"
- **영향 모듈**: Route-xxx, Component-xxx, US-xxx

### CI-002: ...

## 영향 범위 분석 (Impact Analysis)

### 화면 (Routes)
| Route | 변경 내용 | 신규 여부 |
|-------|----------|---------|
| /xxx  | ...      | Yes/No  |

### 컴포넌트 (Components)
| Component | 변경 내용 | 신규 여부 |
|-----------|----------|---------|
| XxxCard   | ...      | Yes/No  |

### 상태/Interaction
| Hook/Store | 변경 내용 |
|------------|----------|
| useXxx     | ...      |

### 스타일/UX
| 항목 | 변경 내용 |
|------|----------|
| ...  | ...      |

## 모듈 의존성

| From | To | 이유 |
|------|-----|------|
| ...  | ... | ...  |

## TBD (미결정 사항)

- [ ] TBD-001: [내용]
- [ ] TBD-002: [내용]

## 다음 단계

change-doc 스킬을 실행하여 문서 정합성을 복구합니다.
```

### tasks/changes/change-YYYY-MM-DD-HHmm.json

```json
{
  "id": "change-YYYY-MM-DD-HHmm",
  "createdAt": "YYYY-MM-DDTHH:mm:ss",
  "status": "pending",
  "title": "[간단한 제목]",
  "items": [
    {
      "id": "CI-001",
      "type": "Added|Removed|Modified|Impact-shift",
      "summary": "[변경 요약]",
      "quote": "[근거 원문]",
      "affectedModules": ["Route-xxx", "Component-xxx"],
      "impact": {
        "routes": [{"path": "/xxx", "action": "modify|create|delete"}],
        "components": [{"name": "XxxCard", "action": "modify|create|delete"}],
        "state": [{"name": "useXxx", "action": "modify|create|delete"}],
        "style": []
      }
    }
  ],
  "dependencies": [
    {"from": "...", "to": "...", "reason": "..."}
  ],
  "tbd": [
    {"id": "TBD-001", "content": "...", "resolved": false}
  ],
  "affectedTasks": ["task-xxx", "task-yyy"]
}
```

### tasks.json 갱신 형식

```json
{
  "meta": {
    "version": "YYYY-MM-DD.N",
    "lastChange": "change-YYYY-MM-DD-HHmm",
    "lastUpdated": "YYYY-MM-DDTHH:mm:ss",
    "project": "쟈근친구들 V2 (Conture)",
    "total_tasks": 92
  },
  "features": [
    // 기존 features 배열 유지
    // 영향받는 task의 notes 필드에 change 참조 추가
  ]
}
```

## 상태 관리 체계

### Change 상태 (변경 이력)
| 상태 | 설명 |
|------|------|
| `pending` | 분석 완료, tasks.json 미반영 |
| `applied` | tasks.json에 반영 완료 |
| `reverted` | 적용했다가 되돌림 |
| `deprecated` | 더 이상 유효하지 않은 변경 |

### Task 상태 (기능 개발)
| 상태 | 설명 |
|------|------|
| `pending` | 아직 시작 안 함 |
| `in_progress` | 개발 중 |
| `completed` | 완료 |
| `blocked` | 의존성 등으로 차단됨 |

> ⚠️ **중요**: Change의 status ≠ Task의 status. 분리해서 관리할 것.

## 완료 후 자동 액션

분석 및 tasks.json 갱신 완료 후 사용자에게 알림:

```
변경 분석이 완료되었습니다.

📝 생성된 파일:
- docs/changes/YYYY-MM-DD-HHmm.md
- tasks/changes/change-YYYY-MM-DD-HHmm.json

📋 tasks.json 갱신 내용:
- meta.version: X → Y
- meta.lastChange: change-YYYY-MM-DD-HHmm
- 영향받은 Task: task-xxx, task-yyy

이제 change-doc 스킬을 실행하여 기존 문서들의 정합성을 복구하시겠습니까?
```

사용자가 동의하면 `/change-doc` 스킬을 호출합니다.
