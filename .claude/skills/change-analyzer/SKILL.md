---
name: change-analyzer
description: FE 변경 요구사항을 분석하여 변경 유형(Added/Removed/Modified/Impact-shift)과 영향 범위(화면/컴포넌트/상태/스타일)를 구조적으로 규명합니다. FE 개발 완료 후 디자인/기능/정책/화면구조 피드백이 들어왔을 때 사용합니다. 바로 수정하지 않고, 먼저 무엇이 어떻게 바뀌는지 분석합니다. 분석 완료 후 change-doc 스킬을 자동 호출합니다. (project)
---

# FE Change Analyzer

FE 개발 완료 후 피드백이 들어왔을 때, **바로 고치지 않고** 변경의 성격과 범위를 먼저 구조적으로 분석합니다.

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

타임스탬프 생성 후 아래 두 파일 작성:

```
docs/changes/YYYY-MM-DD-HHmm.md
tasks/changes/YYYY-MM-DD-HHmm.json
```

## Output Format

### docs/changes/YYYY-MM-DD-HHmm.md

```markdown
# Change Analysis: [간단한 제목]

> 생성일시: YYYY-MM-DD HH:mm
> 상태: pending | in-review | applied

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

### tasks/changes/YYYY-MM-DD-HHmm.json

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
  ]
}
```

## 완료 후 자동 액션

분석 완료 후 사용자에게 알리고, **change-doc 스킬 실행을 제안**합니다:

```
변경 분석이 완료되었습니다.
- docs/changes/YYYY-MM-DD-HHmm.md
- tasks/changes/YYYY-MM-DD-HHmm.json

이제 change-doc 스킬을 실행하여 기존 문서들의 정합성을 복구하시겠습니까?
```

사용자가 동의하면 `/change-doc` 스킬을 호출합니다.
