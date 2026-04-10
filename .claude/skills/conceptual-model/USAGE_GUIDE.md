# Conceptual Model v2.0.0 - Usage Guide

## 개요

Conceptual Model v2.0.0은 더욱 구체적이고 상세한 포맷으로 시스템의 개념 구조를 정의합니다.

### 특징

- **명시적 속성 관계**: 모든 외래키(FK)를 attributes 수준에서 명시
- **도메인 규칙**: 비즈니스 제약조건 명확화
- **데이터 흐름**: 사용자 여정과 프로세스 단계 매핑
- **용어 정의**: 한영 용어 통일
- **사용자 스토리 추적**: 모든 엔티티를 US와 연결

---

## 파일 구조

```
.claude/skills/conceptual-model/
├── SKILL.md                           # 스킬 설정 (기존)
├── USAGE_GUIDE.md                     # 이 파일
├── templates/
│   └── conceptual-model-v2-template.json    # v2 포맷 템플릿
└── scripts/
    ├── generate_conceptual_model_v2.py      # v2 생성 스크립트 (새로운)
    ├── generate-skill-conceptual-model.py   # 변환 스크립트 (기존)
    └── generate_conceptual_model_md.py      # MD 변환 스크립트 (기존)
```

---

## 빠른 시작

### 1. 기존 모델을 v2.0.0 포맷으로 변환

```bash
python .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json
```

### 2. 대화형 모드로 생성 및 확장

```bash
python .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json \
  --interactive
```

### 3. 자동으로 Markdown 문서 생성

```bash
python .claude/skills/conceptual-model/scripts/generate_conceptual_model_md.py \
  --data docs/conceptual-model.v2.json \
  --output docs/conceptual-model-v2.md
```

---

## v2.0.0 포맷 상세 설명

### 1. Project 섹션

```json
{
  "project": {
    "name": "BaraeCNP MES/ERP System",
    "description": "Conceptual Data Model for Manufacturing...",
    "version": "2.0.0",
    "domain": "제조 및 판매 관리 시스템"
  }
}
```

### 2. Summary 섹션

```json
{
  "summary": {
    "totalEntities": 30,
    "totalRelationships": 24,
    "totalDomainRules": 7,
    "totalDataFlows": 3,
    "totalGlossaryTerms": 16,
    "entityList": ["Partner", "SalesOrder", "BoxProduct", ...]
  }
}
```

### 3. Entities 섹션

#### 기본 구조

```json
{
  "name": "SalesOrder",
  "businessName": "수주",
  "description": "고객으로부터 받은 주문 정보",
  "category": "sales",
  "attributes": [...],
  "userStories": ["US-101", "US-102"],
  "relatedEntities": ["Partner", "SalesOrderItem", "BoxProduct"]
}
```

#### 속성(Attributes) 정의

```json
{
  "name": "id",
  "type": "UUID",
  "required": true,
  "description": "수주 고유 식별자"
}
```

##### 타입 목록

| 타입 | 설명 | 예시 |
|------|------|------|
| `UUID` | 고유 식별자 | `550e8400-e29b-41d4-a716-446655440000` |
| `String` | 텍스트 | `"고객명"` |
| `Integer` | 정수 | `100` |
| `Float` | 소수점 | `99.99` |
| `Boolean` | 참/거짓 | `true` |
| `DateTime` | 날짜시간 | `2026-01-27T13:44:06Z` |
| `Enum` | 고정 선택지 | `"pending"`, `"confirmed"` |
| `Array[Type]` | 배열 | `Array[String]` |
| `JSON` | 유연한 객체 | `{key: value}` |

#### Enum 속성

```json
{
  "name": "status",
  "type": "Enum",
  "required": true,
  "description": "수주 상태",
  "enumValues": [
    "pending",
    "confirmed",
    "in_production",
    "completed",
    "cancelled"
  ]
}
```

#### 외래키(FK) 속성

```json
{
  "name": "partnerId",
  "type": "UUID",
  "required": true,
  "description": "거래처 ID (FK: Partner)",
  "references": {
    "entity": "Partner",
    "attribute": "id",
    "relationshipId": "rel-1",
    "onDelete": "RESTRICT",
    "onUpdate": "CASCADE",
    "description": "외래키 - Partner의 id를 참조"
  }
}
```

### 4. Relationships 섹션

```json
{
  "from": "Partner",
  "to": "SalesOrder",
  "cardinality": "1:N",
  "type": "identifying|non-identifying",
  "optional": {
    "from": true,
    "to": false
  },
  "description": "한 거래처는 여러 수주를 가질 수 있다",
  "relationshipId": "rel-1",
  "businessRule": "Cannot delete partner with existing orders"
}
```

#### Cardinality 정의

| 표기 | 의미 | 예시 |
|------|------|------|
| `1:1` | 일대일 | User ↔ UserProfile |
| `1:N` | 일대다 | Partner (1) → (N) SalesOrder |
| `N:1` | 다대일 | SalesOrderItem (N) → (1) SalesOrder |
| `N:M` | 다대다 | Student (N) ↔ (M) Course |
| `0:N` | 선택적 일대다 | Partner (0) → (N) SalesOrder |
| `N:0-1` | 다대 선택적 | SalesOrderItem (N) → (0-1) BoxProduct |

### 5. Domain Rules 섹션

```json
{
  "id": "DR-001",
  "name": "거래처 삭제 제약",
  "description": "활성 주문이 있는 거래처는 삭제할 수 없다",
  "entities": ["Partner", "SalesOrder", "PurchaseOrder"],
  "userStories": ["US-101"]
}
```

### 6. Data Flows 섹션

```json
{
  "name": "수주 생성부터 배송까지",
  "description": "고객 주문을 받아서 배송하는 전체 프로세스",
  "userStories": ["US-101", "US-102", "US-301", "US-302"],
  "steps": [
    {
      "order": 1,
      "action": "Create",
      "entity": "SalesOrder",
      "description": "고객 수주 생성"
    },
    {
      "order": 2,
      "action": "Add",
      "entity": "SalesOrderItem",
      "description": "주문 품목 추가"
    }
  ]
}
```

#### 단계 Action 목록

| Action | 의미 |
|--------|------|
| `Create` | 엔티티 생성 |
| `Read` | 데이터 조회 |
| `Update` | 데이터 수정 |
| `Delete` | 엔티티 삭제 |
| `Add` | 하위 항목 추가 |
| `Execute` | 작업 실행 |
| `Confirm` | 승인/확정 |
| `Wait` | 대기 |
| `Archive` | 보관 |

### 7. Glossary 섹션

```json
{
  "koreanTerm": "거래처",
  "englishTerm": "Partner",
  "definition": "상품을 구매하거나 판매하는 고객, 공급자, 협력사"
}
```

---

## 카테고리 가이드

엔티티의 `category`는 시스템의 도메인 영역을 나타냅니다.

### 기본 카테고리

| 카테고리 | 설명 | 예시 |
|---------|------|------|
| `core` | 핵심 비즈니스 엔티티 | Partner, SalesOrder |
| `sales` | 판매 관련 | SalesOrder, Delivery, Invoice |
| `production` | 생산 관련 | ProductionPlan, Production, ProcessStep |
| `procurement` | 구매/조달 | PurchaseOrder, Receiving, Inventory |
| `inventory` | 재고 관리 | Inventory, Warehouse |
| `financial` | 재무/회계 | Invoice, Payment, AR, AP |
| `settings` | 설정/마스터 | CompanyProfile, User |
| `master` | 마스터 데이터 | Equipment, PaperCode, Manila |

---

## 품질 체크리스트

모델 생성 전 확인사항:

- [ ] 모든 엔티티에 완전한 attribute 정의 포함
- [ ] 모든 enum 속성에 enumValues 정의됨
- [ ] 모든 관계에 cardinality 정의됨
- [ ] 모든 FK에 references 정보 포함
- [ ] 도메인 규칙이 주요 제약조건 커버
- [ ] 용어 정의에 한영 용어 통일
- [ ] 모든 엔티티가 최소 1개의 user story와 연결
- [ ] Data flows가 주요 사용자 여정 커버

---

## 스크립트 상세

### generate_conceptual_model_v2.py

#### 옵션

```
--input, -i PATH      입력 파일 경로 (필수)
--output, -o PATH     출력 파일 경로 (필수)
--interactive         대화형 모드 활성화
```

#### 입력 포맷 감지

- **User Stories**: `user_stories` 키 포함 시
- **Existing Model**: `entities` 키 포함 시

#### 대화형 모드 흐름

1. 프로젝트 정보 입력 (이름, 설명, 도메인)
2. 도메인 규칙 추가
3. 용어 정의 추가
4. 모델 검증
5. 최종 저장

#### 출력

```
📊 CONCEPTUAL MODEL v2.0.0 - SUMMARY
============================================================

🏢 Project: BaraeCNP MES/ERP System
   Domain: 제조 및 판매 관리 시스템

📊 Content Statistics:
   📦 Entities:          30
   🔗 Relationships:     24
   📋 Domain Rules:      7
   🔄 Data Flows:        3
   📖 Glossary Terms:    16

✨ Quality Metrics:
   ✓ 30 entities fully defined
   ✓ 24 relationships with cardinality
   ✓ 45 FK relationships explicitly documented
   ✓ 7 domain rules defined
   ✓ 3 data flows defined
   ✓ 16 glossary terms defined

📖 User Story Coverage:
   Total Mappings: 52
   Completeness:   86.7%

============================================================
✨ Model generation complete!
```

---

## 실제 예시

### 예시 1: 간단한 주문-배송 모델

```json
{
  "entities": [
    {
      "name": "SalesOrder",
      "businessName": "수주",
      "description": "고객 주문",
      "category": "sales",
      "attributes": [
        {
          "name": "id",
          "type": "UUID",
          "required": true,
          "description": "수주 ID"
        },
        {
          "name": "orderNumber",
          "type": "String",
          "required": true,
          "description": "주문번호"
        },
        {
          "name": "customerId",
          "type": "UUID",
          "required": true,
          "description": "고객 ID",
          "references": {
            "entity": "Partner",
            "attribute": "id",
            "relationshipId": "rel-1",
            "onDelete": "RESTRICT",
            "onUpdate": "CASCADE",
            "description": "외래키 - Partner의 id를 참조"
          }
        },
        {
          "name": "status",
          "type": "Enum",
          "required": true,
          "description": "주문 상태",
          "enumValues": ["pending", "confirmed", "delivered", "cancelled"]
        }
      ]
    }
  ],
  "relationships": [
    {
      "from": "Partner",
      "to": "SalesOrder",
      "cardinality": "1:N",
      "type": "non-identifying",
      "optional": { "from": true, "to": false },
      "description": "고객은 여러 주문을 할 수 있다",
      "relationshipId": "rel-1",
      "businessRule": "Customer와 함께 SalesOrder는 삭제된다"
    }
  ]
}
```

---

## 문제 해결

### Q: "Unknown input format" 오류

**원인**: 입력 파일 포맷을 감지하지 못함

**해결**:
1. 파일에 `entities` 또는 `user_stories` 키가 있는지 확인
2. 파일 인코딩이 UTF-8인지 확인
3. JSON 형식이 유효한지 검증

### Q: Validation failed 경고

**원인**: 모델이 완전하지 않음

**해결**:
1. 모든 엔티티에 `attributes` 정의 추가
2. Enum 속성에 `enumValues` 추가
3. 모든 관계에 `cardinality` 추가

---

## 다음 단계

1. **v2 모델 생성**: `generate_conceptual_model_v2.py` 실행
2. **Markdown 문서 생성**: `generate_conceptual_model_md.py` 실행
3. **팀 검토**: 용어, 관계, 규칙 검토
4. **Schema 설계**: 논리 아키텍처 및 DB 스키마 설계로 진행

---

## 참고

- [Conceptual Model Skill](./SKILL.md)
- [Template](./templates/conceptual-model-v2-template.json)
- [Reference Schema](./references/output-schema.md)
