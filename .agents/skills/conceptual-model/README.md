# Conceptual Model Skill v2.0.0

> Skill-compatible conceptual data model with explicit attribute relationships

## 개요

**Conceptual Model v2.0.0**은 기존의 conceptual model 포맷을 더욱 구체적이고 상세하게 만든 버전입니다.

### 핵심 특징

✨ **명시적 외래키 정의**
- 모든 FK를 `attribute` 레벨에서 `references` 필드로 명시
- 관계 타입, 제약조건 (onDelete, onUpdate) 문서화

📋 **도메인 규칙**
- 비즈니스 제약조건을 명확하게 정의
- 엔티티와 사용자 스토리에 매핑

🔄 **데이터 흐름**
- 사용자 여정(user journey)을 단계별로 정의
- 프로세스 전체를 시각화

📖 **용어 정의**
- 팀 전체가 사용할 한영 용어 통일
- 도메인 용어 명확화

📊 **메트릭과 추적**
- 모든 엔티티를 사용자 스토리와 연결
- 구현 범위와 커버리지 파악

---

## 디렉토리 구조

```
.claude/skills/conceptual-model/
├── README.md                              # 이 파일
├── SKILL.md                               # Skill 정의 (기존)
├── USAGE_GUIDE.md                         # 상세 사용 가이드
├── QUICK_REFERENCE.md                     # 빠른 참조 카드
│
├── templates/
│   └── conceptual-model-v2-template.json  # v2.0.0 포맷 템플릿
│
└── scripts/
    ├── generate_conceptual_model_v2.py    # ⭐ 새로운 v2 생성 스크립트
    ├── generate-skill-conceptual-model.py # 기존 변환 스크립트
    └── generate_conceptual_model_md.py    # JSON → Markdown 변환
```

---

## 시작하기

### 1️⃣ 설치

스크립트가 Python 3.6+ 필요합니다.

```bash
cd /Users/jiho/Documents/coding/develop-boilerplate
```

### 2️⃣ 기본 사용

기존 모델을 v2.0.0 포맷으로 변환:

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json
```

### 3️⃣ 고급 사용

대화형 모드로 정보 추가/수정:

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json \
  --interactive
```

### 4️⃣ Markdown 문서화

v2 모델을 읽기 쉬운 Markdown으로 변환:

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_md.py \
  --data docs/conceptual-model.v2.json \
  --output docs/conceptual-model-v2.md
```

---

## v2.0.0 포맷 vs v1

### 비교표

| 항목 | v1 | v2 |
|------|-----|-----|
| **외래키 표현** | 관계만 정의 | Attributes에 references 명시 |
| **제약조건** | 없음 | onDelete, onUpdate 정의 |
| **도메인 규칙** | 없음 | domainRules 섹션 |
| **데이터 흐름** | 없음 | dataFlows 섹션 |
| **용어 정의** | 없음 | glossary 섹션 |
| **메타데이터** | 기본 | 상세 메트릭 포함 |

### 예시: FK 표현 비교

**v1 (기존)**

```json
{
  "name": "partnerId",
  "type": "UUID",
  "required": true
}
```

**v2 (새로운)**

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

---

## 주요 파일 설명

### 📄 SKILL.md

- Skill 정의 및 사용법
- 입력 소스 정의
- 품질 표준

### 📖 USAGE_GUIDE.md

- v2.0.0 포맷 상세 설명
- 모든 필드 및 타입 가이드
- 실제 예시
- 문제 해결

### ⚡ QUICK_REFERENCE.md

- 빠른 참조 카드
- 주요 명령어
- JSON 구조
- 체크리스트

### 📋 generate_conceptual_model_v2.py

메인 스크립트 기능:

```
✅ 입력 포맷 자동 감지
✅ v2.0.0 포맷 자동 생성
✅ 모델 검증
✅ 대화형 모드 지원
✅ 상세 요약 출력
✅ 메트릭 계산
```

---

## 예시 출력

스크립트 실행 결과:

```
📖 Loading input: conceptual_model.json
  ✓ Detected: Existing Conceptual Model

🔄 Converting existing model to v2 format...
  ✓ Loaded 30 entities
  ✓ Loaded 24 relationships
  ✓ Loaded 7 domain rules
  ✓ Loaded 3 data flows
  ✓ Loaded 16 glossary terms

🔍 Validating model...
✅ Model validation passed!

✨ Generating v2.0.0 model...

💾 Saving model to: docs/conceptual-model.v2.json
✅ Saved: conceptual-model.v2.json

============================================================
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
   ✓ 22 FK relationships explicitly documented
   ✓ 7 domain rules defined
   ✓ 3 data flows defined
   ✓ 16 glossary terms defined

📖 User Story Coverage:
   Total Mappings: 45
   Completeness:   150.0%

============================================================
✨ Model generation complete!
```

---

## 워크플로우

### 1. 모델 생성

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json
```

### 2. 대화형 검토 및 확장

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_v2.py \
  --input docs/conceptual-model.json \
  --output docs/conceptual-model.v2.json \
  --interactive
```

### 3. 문서화

```bash
python3 .claude/skills/conceptual-model/scripts/generate_conceptual_model_md.py \
  --data docs/conceptual-model.v2.json \
  --output docs/conceptual-model-v2.md
```

### 4. 팀 검토

- Markdown 문서를 슬랙/이메일로 공유
- 엔티티, 관계, 규칙 검토
- 필요시 수정 후 다시 생성

### 5. 다음 단계

- ✅ Conceptual Model 완성
- ➡️ Logical Architecture 설계
- ➡️ Database Schema 설계
- ➡️ API 스펙 작성

---

## 지원되는 입력 포맷

### 1. 기존 Conceptual Model v1

```json
{
  "entities": [...],
  "relationships": [...],
  "domainRules": [...],
  "dataFlows": [...],
  "glossary": [...]
}
```

자동으로 v2 포맷으로 변환됩니다.

### 2. User Stories JSON

```json
{
  "user_stories": [
    {
      "id": "US-101",
      "description": "...",
      "acceptanceCriteria": [...]
    }
  ]
}
```

인터랙티브 모드에서 엔티티 추출을 지원합니다.

---

## 스크립트 옵션

### generate_conceptual_model_v2.py

```bash
python3 generate_conceptual_model_v2.py [OPTIONS]

옵션:
  --input, -i PATH        입력 파일 경로 (필수)
  --output, -o PATH       출력 파일 경로 (필수)
  --interactive           대화형 모드 활성화
  --help, -h              도움말 표시
```

### generate_conceptual_model_md.py

```bash
python3 generate_conceptual_model_md.py [OPTIONS]

옵션:
  --data, -d PATH         입력 JSON 파일 경로 (필수)
  --output, -o PATH       출력 Markdown 경로 (기본값: 같은 디렉토리 .md)
  --help, -h              도움말 표시
```

---

## 품질 기준

생성된 모델은 다음 기준으로 평가됩니다:

### 엔티티 완성도

- ✅ 모든 엔티티에 완전한 attribute 정의
- ✅ 모든 enum 속성에 enumValues 정의
- ✅ 모든 엔티티에 businessName 정의

### 관계 명확성

- ✅ 모든 관계에 cardinality 정의
- ✅ 모든 FK에 references 정보 포함
- ✅ 모든 관계에 businessRule 정의

### 문서화 완성도

- ✅ 모든 엔티티를 user story와 연결
- ✅ 도메인 규칙이 주요 제약 커버
- ✅ 용어 정의에 한영 용어 통일

---

## 트러블슈팅

### "Unknown input format" 오류

**원인**: 입력 파일이 지원되는 포맷이 아님

**해결**:
```bash
# 파일 내용 확인
cat docs/conceptual-model.json | head -20

# `entities` 또는 `user_stories` 키 확인
python3 -c "import json; f = json.load(open('docs/conceptual-model.json')); print(f.keys())"
```

### Validation 경고

**원인**: 모델이 완전하지 않음 (경고일뿐 계속 진행)

**개선**:
1. 모든 엔티티에 attributes 추가
2. Enum 속성에 enumValues 추가
3. 관계에 cardinality 추가

---

## 참고 자료

📚 **내부 가이드**
- [상세 사용 가이드](./USAGE_GUIDE.md)
- [빠른 참조](./QUICK_REFERENCE.md)
- [Skill 정의](./SKILL.md)

🎁 **템플릿**
- [v2.0.0 템플릿](./templates/conceptual-model-v2-template.json)

---

## 버전 히스토리

### v2.0.0 (현재)

✨ **새로운 기능**
- Explicit FK references at attribute level
- Domain rules section
- Data flows section
- Glossary section
- Enhanced metadata
- Quality metrics

📊 **메트릭**
- 30 entities
- 24 relationships
- 22 FK relationships explicitly documented
- 7 domain rules
- 3 data flows
- 16 glossary terms
- 45+ user story mappings

---

## 기여

이 스킬 및 스크립트 개선 사항:

1. 새로운 기능 제안
2. 버그 리포트
3. 문서 개선
4. 테스트 추가

---

## 라이선스

이 프로젝트는 [Your License] 하에 배포됩니다.

---

## 연락

질문이나 제안:

- 📧 Email: [contact@example.com]
- 💬 Slack: #claude-code-setup
- 🐙 GitHub: Issues

---

## 다음 단계

### ✅ 완료

- Conceptual Model v2.0.0 생성
- 모든 엔티티 정의
- 관계 및 규칙 문서화

### ➡️ 다음

1. **Logical Architecture** 설계
   - 컴포넌트 식별
   - 계층 구조 정의

2. **Database Schema** 설계
   - 테이블 정규화
   - 인덱스 전략

3. **API Specification** 작성
   - 엔드포인트 정의
   - 요청/응답 스키마

---

**Generated with Conceptual Model Skill v2.0.0**

*Last updated: 2026-01-27*
