# Conceptual Model v2.0.0 - Quick Reference

빠르게 참조하기 위한 치트시트입니다.

## 명령어

### 기본 변환 (v2 형식으로 변환)

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json
```

### 대화형 모드 (정보 추가/수정)

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json \
  --interactive
```

### Markdown 문서 생성

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_md.py \
  --data docs/conceptual-model.v2.json \
  --output docs/conceptual-model-v2.md
```

---

## JSON 구조

### 최소 필수 항목

```json
{
  "version": "2.0.0",
  "format": "skill-conceptual-model",
  "timestamp": "2026-01-27T13:44:06.000000",
  "project": {
    "name": "프로젝트명",
    "description": "프로젝트 설명",
    "version": "1.0.0",
    "domain": "도메인"
  },
  "entities": [...],
  "relationships": [...],
  "domainRules": [...],
  "dataFlows": [...],
  "glossary": [...]
}
```

---

## 엔티티 정의

### 최소 엔티티

```json
{
  "name": "Partner",
  "businessName": "거래처",
  "description": "고객 및 공급처 정보",
  "category": "core",
  "attributes": [
    {
      "name": "id",
      "type": "UUID",
      "required": true,
      "description": "고유 식별자"
    },
    {
      "name": "name",
      "type": "String",
      "required": true,
      "description": "거래처명"
    }
  ],
  "userStories": ["US-301"],
  "relatedEntities": ["SalesOrder"]
}
```

### 속성 타입 빠른 참조

```
기본:        UUID, String, Integer, Float, Boolean, DateTime
선택:        Enum (enumValues 필수)
복합:        Array[Type], JSON
외래키:      references 정보 포함
```

### 외래키 속성 예시

```json
{
  "name": "partnerId",
  "type": "UUID",
  "required": true,
  "description": "거래처 ID",
  "references": {
    "entity": "Partner",
    "attribute": "id",
    "relationshipId": "rel-1",
    "onDelete": "RESTRICT",
    "onUpdate": "CASCADE"
  }
}
```

### Enum 속성 예시

```json
{
  "name": "status",
  "type": "Enum",
  "required": true,
  "enumValues": ["pending", "confirmed", "completed"]
}
```

---

## 관계 정의

### 기본 관계

```json
{
  "from": "Partner",
  "to": "SalesOrder",
  "cardinality": "1:N",
  "type": "non-identifying",
  "optional": { "from": true, "to": false },
  "description": "한 거래처는 여러 수주를 가질 수 있다",
  "relationshipId": "rel-1",
  "businessRule": "비즈니스 규칙"
}
```

### Cardinality 표 (참고용)

| 표기 | 의미 |
|------|------|
| `1:1` | 일대일 |
| `1:N` | 일대다 |
| `N:1` | 다대일 |
| `N:M` | 다대다 |
| `0:N` | 선택적 일대다 |
| `N:0-1` | 다대 선택적 |

### FK Constraint 옵션

```
onDelete:   RESTRICT, CASCADE, SET NULL, NO ACTION
onUpdate:   CASCADE, RESTRICT, SET NULL, NO ACTION
```

---

## 도메인 규칙

```json
{
  "id": "DR-001",
  "name": "규칙명",
  "description": "규칙 설명",
  "entities": ["Entity1", "Entity2"],
  "userStories": ["US-101"]
}
```

---

## 데이터 흐름

```json
{
  "name": "플로우명",
  "description": "플로우 설명",
  "userStories": ["US-101", "US-102"],
  "steps": [
    {
      "order": 1,
      "action": "Create",
      "entity": "SalesOrder",
      "description": "주문 생성"
    }
  ]
}
```

### Action 타입

```
Create, Read, Update, Delete, Add, Remove, Execute, Confirm, Wait, Archive
```

---

## 용어 정의

```json
{
  "koreanTerm": "거래처",
  "englishTerm": "Partner",
  "definition": "상품을 구매하거나 판매하는 고객, 공급자"
}
```

---

## 카테고리 타입

```
core          핵심 엔티티
sales         판매
production    생산
procurement   구매
inventory     재고
financial     재무
settings      설정
master        마스터 데이터
```

---

## 파일 위치

```
프로젝트 프로젝트 구조:
├── docs/
│   ├── conceptual-model.json          ← 기본 모델 (v1)
│   ├── conceptual-model.v2.json       ← 변환된 v2 모델
│   └── conceptual-model-v2.md         ← Markdown 문서

영업/견적:
└── sales/[YY_MM_거래처명]/
    └── quotes/[MM.DD]/
        ├── conceptual_model.json      ← 견적용 모델 (v1)
        └── conceptual_model.v2.json   ← 견적용 v2 모델
```

---

## 검증 체크리스트

모델 생성 전:

- [ ] 모든 엔티티에 `name`, `businessName`, `description` 포함
- [ ] 모든 엔티티에 최소 1개의 `attributes` 포함
- [ ] `Enum` 타입 속성에 `enumValues` 배열 정의
- [ ] 외래키 속성에 `references` 정보 포함
- [ ] 모든 관계에 `cardinality` 명시
- [ ] `userStories` 배열 채우기
- [ ] 도메인 규칙이 핵심 제약 커버
- [ ] 용어 정의에 한영 표현 통일

---

## 트러블슈팅

### JSON 유효성 검증

```bash
python3 -m json.tool docs/conceptual-model.v2.json > /dev/null
```

### 생성 로그 확인

```bash
# 상세 출력과 함께 실행
python3 -u .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json
```

### 마크다운 미리보기

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_md.py \
  --data docs/conceptual-model.v2.json \
  --output docs/conceptual-model-preview.md
```

---

## 실제 예시

### 간단한 엔티티-관계 구조

```json
{
  "entities": [
    {
      "name": "Customer",
      "businessName": "고객",
      "category": "core",
      "attributes": [
        {"name": "id", "type": "UUID", "required": true},
        {"name": "name", "type": "String", "required": true},
        {"name": "status", "type": "Enum", "enumValues": ["active", "inactive"]}
      ]
    }
  ],
  "relationships": [
    {
      "from": "Customer",
      "to": "Order",
      "cardinality": "1:N",
      "description": "고객은 여러 주문을 할 수 있다"
    }
  ]
}
```

---

## 팁과 베스트 프랙티스

### 1. 일관성 유지

- 엔티티명은 영문 Pascal Case: `SalesOrder`
- 속성명은 영문 Camel Case: `partnerId`
- 비즈니스명은 한글: `거래처`

### 2. 관계 명확화

- 모든 외래키를 `references` 필드로 명시
- `cardinality` 명확히 정의
- `optional` 필드로 필수 여부 표현

### 3. 문서화

- `description`은 왜 필요한지 설명
- `userStories`로 필요성 추적
- `businessRule`로 제약조건 문서화

### 4. 재사용성

- 공통 필드 패턴화 (id, code, name, status, createdDate)
- 관계 ID 규칙화 (rel-1, rel-2, ...)
- 도메인 규칙 ID 규칙화 (DR-001, DR-002, ...)

---

## 다음 단계

1. ✅ **Conceptual Model v2 생성** (이 가이드)
2. ➡️ Logical Architecture 설계
3. ➡️ Database Schema 설계
4. ➡️ API 스펙 작성

---

## 참고

- [상세 사용 가이드](./USAGE_GUIDE.md)
- [v2 템플릿](./templates/conceptual-model-v2-template.json)
- [Skill 설정](./SKILL.md)
