# TBD 등록 (/decisions/register)

> **목적**: 새로운 미결정 항목(TBD)을 등록하고 의존 모듈과 연결

---

## 📥 입력

TBD 등록 시 필요한 정보:

| 필드 | 필수 | 설명 | 예시 |
|------|-----|------|------|
| `title` | ✅ | TBD 제목 | "MFA 재설정 기능 범위" |
| `description` | ✅ | 상세 설명 | "세빛넥스 관리자가 2차 인증 대기 상태로 변경하는 기능의 MVP 포함 여부" |
| `category` | ✅ | 카테고리 | Policy, Schema, UX, Technical, Business |
| `dependencies` | ✅ | 의존 모듈 | ["US-003", "F01"] |
| `priority` | ✅ | 우선순위 | Critical, High, Medium, Low |
| `owner` | ✅ | 결정권자 | "@고객사", "@PM", "@개발팀" |
| `due_date` | ⬜ | 결정 기한 | "2024-12-15" |
| `context` | ⬜ | 배경/근거 | QnA 문서 참조 등 |
| `options` | ⬜ | 선택지 | ["MVP 포함", "이후 버전", "구현 안 함"] |

---

## 📤 산출물

### `docs/decisions/tbd_registry.md` 업데이트

```markdown
## TBD-XXX: {title}

| 항목 | 내용 |
|------|------|
| **ID** | TBD-XXX |
| **상태** | 🔴 OPEN |
| **카테고리** | {category} |
| **우선순위** | {priority} |
| **결정권자** | {owner} |
| **결정 기한** | {due_date} |
| **등록일** | {today} |
| **의존 모듈** | {dependencies} |

### 설명
{description}

### 배경
{context}

### 선택지
- [ ] 옵션 A: {option_1}
- [ ] 옵션 B: {option_2}
- [ ] 옵션 C: {option_3}

### 결정
*(미결정)*

---
```

---

## 🔧 수행 절차

### 1. 기존 Registry 읽기

```
docs/decisions/tbd_registry.md 파일 존재 확인
- 있으면: 기존 내용 읽기, 마지막 TBD ID 확인
- 없으면: 템플릿으로 새로 생성
```

### 2. 새 TBD ID 생성

```
마지막 ID + 1
예: TBD-005 → TBD-006
```

### 3. 입력 정보 검증

```yaml
validation:
  - title: 필수, 비어있으면 에러
  - category: [Policy, Schema, UX, Technical, Business] 중 하나
  - dependencies: 최소 1개 이상
  - priority: [Critical, High, Medium, Low] 중 하나
  - owner: 필수
```

### 4. Registry에 추가

```
새 TBD 항목을 docs/decisions/tbd_registry.md에 추가
```

### 5. 의존 모듈 BLOCK 표시

```markdown
## 🚨 의존 모듈 영향

다음 모듈이 TBD-XXX에 의존합니다:
- US-003: MFA (2차 인증) → ⚠️ BLOCKED
- F01: 인증 시스템 → ⚠️ BLOCKED

→ TBD-XXX가 RESOLVED 될 때까지 해당 모듈 개발 시작 불가
```

---

## 📋 카테고리 가이드

### Policy (정책)
비즈니스 규칙, 운영 정책 관련 결정

```markdown
예시:
- MFA 재설정 정책
- 데이터 파기 정책
- 권한 범위 정의
- 플랜별 기능 차이
```

### Schema (스키마)
데이터 모델, 관계, API 구조 관련 결정

```markdown
예시:
- 근로자 다중 사업장 소속 허용 여부
- 사업장-법인 관계 구조
- 감사 로그 저장 구조
```

### UX (사용자 경험)
화면 구조, 플로우, 인터랙션 관련 결정

```markdown
예시:
- 모바일 UI 범위
- 알림 방식 (알림톡 vs 이메일)
- 에러 메시지 정책
```

### Technical (기술)
기술 선택, 아키텍처 관련 결정

```markdown
예시:
- PG사 선정
- 감사 로그 저장소 (RDBMS vs ElasticSearch)
- 인증 방식 (TOTP vs 이메일)
```

### Business (비즈니스)
비즈니스 모델, 가격 관련 결정

```markdown
예시:
- 플랜 구성 및 가격
- 결제 방식 (월/연)
- 환불 정책
```

---

## 📝 예시: TBD 등록

### 입력 예시

```
/decisions/register

제목: MFA 재설정 기능 범위
설명: 세빛넥스 관리자가 사용자의 2차 인증 대기 상태로 변경하는 기능을 MVP에 포함할지 결정 필요
카테고리: Policy
의존 모듈: US-003, F01
우선순위: High
결정권자: @고객사
결정 기한: 2024-12-15
배경: QnA_1209_Caleb.md에서 "검토 후 답변" 상태
선택지:
  - MVP 포함: 개발 범위에 포함하여 구현
  - 이후 버전: MVP 이후 고도화 시 구현
  - 구현 안 함: 별도 CS 프로세스로 대응
```

### 출력 예시

```markdown
✅ TBD 등록 완료

## TBD-001: MFA 재설정 기능 범위

| 항목 | 내용 |
|------|------|
| **ID** | TBD-001 |
| **상태** | 🔴 OPEN |
| **카테고리** | Policy |
| **우선순위** | High |
| **결정권자** | @고객사 |
| **결정 기한** | 2024-12-15 |
| **등록일** | 2024-12-10 |
| **의존 모듈** | US-003, F01 |

### 설명
세빛넥스 관리자가 사용자의 2차 인증 대기 상태로 변경하는 기능을 MVP에 포함할지 결정 필요

### 배경
QnA_1209_Caleb.md에서 "검토 후 답변" 상태

### 선택지
- [ ] MVP 포함: 개발 범위에 포함하여 구현
- [ ] 이후 버전: MVP 이후 고도화 시 구현
- [ ] 구현 안 함: 별도 CS 프로세스로 대응

### 결정
*(미결정)*

---

## 🚨 의존 모듈 영향

다음 모듈이 TBD-001에 의존합니다:
- US-003: MFA (2차 인증) - Level 2 전체 → ⚠️ BLOCKED
- F01: 인증 시스템 → ⚠️ BLOCKED

→ TBD-001이 RESOLVED 될 때까지 해당 모듈 개발 시작 불가
```

---

## 🔄 자동 연동

### user_stories.md 연동

TBD 등록 시 관련 User Story의 TBD 섹션 자동 업데이트:

```markdown
### US-003: MFA (2차 인증) - Level 2 전체

...

**⚠️ 관련 TBD:**
- TBD-001: MFA 재설정 기능 범위 (🔴 OPEN)

→ 이 User Story는 TBD-001이 해결될 때까지 BLOCKED 상태입니다.
```

### Feature Spec 연동

TBD 등록 시 관련 Feature Spec의 TBD 섹션 자동 업데이트:

```markdown
### F01: 인증 시스템

...

**⚠️ 관련 TBD:**
- TBD-001: MFA 재설정 기능 범위 (🔴 OPEN)
- TBD-002: 세빛넥스 일반 관리자 권한 (🔴 OPEN)

→ 이 Feature는 모든 TBD가 해결될 때까지 BLOCKED 상태입니다.
```

---

## 🧩 Human 체크포인트

```markdown
✅ TBD-XXX 등록 완료.

확인 항목:
- [ ] 제목이 결정 내용을 명확히 표현하는가?
- [ ] 의존 모듈이 모두 식별되었는가?
- [ ] 결정권자가 적절한가?
- [ ] 선택지가 충분한가?
- [ ] 결정 기한이 합리적인가?

→ 다음 단계:
- 결정권자에게 결정 요청
- `/decisions/check {모듈ID}` 로 영향 확인
```

---

## ➡️ 관련 명령어

- `/decisions` - 전체 현황
- `/decisions/resolve` - TBD 해결
- `/decisions/check` - 모듈 차단 확인





