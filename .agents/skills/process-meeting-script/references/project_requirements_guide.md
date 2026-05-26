# Project Requirements JSON Guide

## Output Location
`sales/[프로젝트폴더]/project-requirements.json`

## JSON Schema

### Root Structure
```json
{
  "meta": { ... },
  "statusDefinitions": { ... },
  "requirements": { ... }
}
```

### meta Object
```json
{
  "project": "프로젝트명 (폴더명에서 추출)",
  "currentVersion": "1.0.0",
  "lastMeeting": "YYYY-MM-DD",
  "description": "프로젝트 간략 설명 (summary.md에서 추출)"
}
```

### statusDefinitions Object
```json
{
  "ACTIVE": "현재 유효한 요구사항",
  "ACTIVE_MODIFIED": "수정되어 유효한 요구사항",
  "DEFERRED": "향후 검토 예정",
  "REMOVED": "삭제됨",
  "UNCONFIRMED": "미확정 (협의 필요)"
}
```

### requirements Object
| 키 | requirements.md 섹션 | label |
|----|---------------------|-------|
| CORE_FUNCTIONAL | 핵심 기능 요구사항 | "핵심 기능 요구사항" |
| NON_FUNCTIONAL | 비기능 요구사항 | "비기능 요구사항" |
| INTEGRATION | 통합 요구사항 | "통합 요구사항" |
| UI_UX | UI/UX 요구사항 | "UI/UX 요구사항" |
| BUSINESS_LOGIC | 비즈니스 로직 요구사항 | "비즈니스 로직 요구사항" |

### Requirement Item Structure
```json
{
  "id": "REQ-101",
  "title": "요구사항 제목",
  "category": "소분류 (### 아래 카테고리명)",
  "status": "ACTIVE",
  "description": [
    "상세 내용 1",
    "상세 내용 2"
  ],
  "versioning": {
    "createdAtMeeting": "YYYY-MM-DD",
    "lastUpdatedAtMeeting": "YYYY-MM-DD",
    "changeLog": [
      { "meeting": "YYYY-MM-DD", "type": "CREATED" }
    ]
  }
}
```

---

## Conversion Rules

### requirements.md → JSON 변환

1. **섹션 매핑**
   - `## 핵심 기능 요구사항` → `CORE_FUNCTIONAL`
   - `## 비기능 요구사항` → `NON_FUNCTIONAL`
   - `## 통합 요구사항` → `INTEGRATION`
   - `## UI/UX 요구사항` → `UI_UX`
   - `## 비즈니스 로직 요구사항` → `BUSINESS_LOGIC`

2. **카테고리 추출**
   - `### 1. OCR 라벨 스캔` → category: "OCR 라벨 스캔"

3. **REQ 항목 파싱**
   ```markdown
   #### [REQ-101] 올리브오일 라벨 스캔 기능
   - 상세 내용 1
   - 상세 내용 2
   ```
   →
   ```json
   {
     "id": "REQ-101",
     "title": "올리브오일 라벨 스캔 기능",
     "description": ["상세 내용 1", "상세 내용 2"]
   }
   ```

4. **미확정 항목 처리**
   - `## 미확정 항목 (Unconfirmed Items)` 섹션의 각 항목
   - REQ ID 부여: 기존 마지막 ID 이후 순차 할당
   - status: "UNCONFIRMED"
   - 가장 적합한 requirements 카테고리에 배치 (내용 기반 판단)

---

## Version Management

### 첫 번째 미팅
- `currentVersion`: "1.0.0"
- 모든 항목 changeLog: `{ "type": "CREATED" }`

### 후속 미팅 (버전 증가)
- Minor 버전 증가: 1.0.0 → 1.1.0 → 1.2.0

### Status 변경 규칙

| 상황 | status | changeLog type |
|------|--------|----------------|
| 신규 추가 | ACTIVE | CREATED |
| 내용 수정 | ACTIVE_MODIFIED | MODIFIED |
| 삭제 | REMOVED | REMOVED |
| 보류 | DEFERRED | STATUS_CHANGED |
| 미확정→확정 | ACTIVE | STATUS_CHANGED |

### changeLog Entry Format
```json
{
  "meeting": "YYYY-MM-DD",
  "type": "MODIFIED",
  "from": "이전 값",
  "to": "변경 값",
  "note": "변경 사유 (선택)"
}
```

---

## Processing Steps

1. **기존 파일 확인**
   - `sales/[프로젝트폴더]/project-requirements.json` 존재 여부 확인

2. **첫 미팅 (파일 없음)**
   - meta 생성 (프로젝트명, 버전 1.0.0, 미팅 날짜)
   - statusDefinitions 기본값 설정
   - requirements.md 파싱 → JSON 구조 생성
   - 모든 항목 status: ACTIVE, changeLog: CREATED
   - 미확정 항목도 REQ ID 부여 + status: UNCONFIRMED

3. **후속 미팅 (파일 있음)**
   - 기존 JSON 로드
   - meta.lastMeeting 업데이트
   - meta.currentVersion minor 증가
   - 새 requirements.md와 비교:
     - 신규 REQ → ACTIVE + CREATED
     - 수정된 REQ → ACTIVE_MODIFIED + MODIFIED
     - 삭제된 REQ → REMOVED + REMOVED
     - 상태 변경 → STATUS_CHANGED

4. **JSON 저장**
   - 들여쓰기 2칸으로 포맷팅
   - UTF-8 인코딩

---

## Example Output

```json
{
  "meta": {
    "project": "아테나올리바",
    "currentVersion": "1.0.0",
    "lastMeeting": "2026-01-07",
    "description": "올리브오일 라벨 스캔 OCR + 커머스 플랫폼"
  },
  "statusDefinitions": {
    "ACTIVE": "현재 유효한 요구사항",
    "ACTIVE_MODIFIED": "수정되어 유효한 요구사항",
    "DEFERRED": "향후 검토 예정",
    "REMOVED": "삭제됨",
    "UNCONFIRMED": "미확정 (협의 필요)"
  },
  "requirements": {
    "CORE_FUNCTIONAL": {
      "label": "핵심 기능 요구사항",
      "items": [
        {
          "id": "REQ-101",
          "title": "올리브오일 라벨 스캔 기능",
          "category": "OCR 라벨 스캔",
          "status": "ACTIVE",
          "description": [
            "카메라로 올리브오일 라벨 촬영 시 제품 정보 자동 인식",
            "비비노(Vivino) 와인 스캔과 유사한 사용자 경험 제공",
            "라벨 DB와 매칭하여 제품 정보 표시"
          ],
          "versioning": {
            "createdAtMeeting": "2026-01-07",
            "lastUpdatedAtMeeting": "2026-01-07",
            "changeLog": [
              { "meeting": "2026-01-07", "type": "CREATED" }
            ]
          }
        }
      ]
    },
    "UI_UX": { "label": "UI/UX 요구사항", "items": [] },
    "NON_FUNCTIONAL": { "label": "비기능 요구사항", "items": [] },
    "INTEGRATION": { "label": "통합 요구사항", "items": [] },
    "BUSINESS_LOGIC": { "label": "비즈니스 로직 요구사항", "items": [] }
  }
}
```
