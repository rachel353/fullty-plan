# Decision Management System

> **목적**: 미결정 항목(TBD)을 체계적으로 추적하고, 모듈이 올바른 조건에서만 개발될 수 있도록 보장

---

## 🎯 핵심 원칙

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   "결정되지 않은 상태에서 개발이 진행되는 것"을 시스템적으로 방지 │
│                                                                 │
│   미결정 → 결정 요청 → 확정 → 개발 시작                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 시스템 구조

### 산출물 위치

```
{project}/docs/decisions/
├── tbd_registry.md         # 📋 미결정 항목 등록부 (SSOT)
└── decision_log.md         # 📝 결정 이력 (audit trail)
```

### TBD 상태 흐름

```
┌──────────┐    결정 요청     ┌─────────────────┐    확정      ┌──────────┐
│   OPEN   │ ─────────────► │ PENDING_REVIEW  │ ──────────► │ RESOLVED │
└──────────┘                └─────────────────┘              └──────────┘
     │                              │                              │
     │                              │                              │
     ▼                              ▼                              ▼
  의존 모듈                    의존 모듈                      의존 모듈
  BLOCKED                    BLOCKED                       READY
```

---

## 🔧 사용 가능한 명령어

### 1. `/decisions/register` - TBD 등록
새로운 미결정 항목을 등록합니다.

```
/decisions/register

입력:
- TBD 제목
- 설명
- 카테고리 (Policy, Schema, UX, Technical, Business)
- 의존 모듈 (User Story ID, Feature ID)
- 우선순위 (Critical, High, Medium, Low)
- 결정권자
```

### 2. `/decisions/resolve` - TBD 해결
미결정 항목을 해결 상태로 변경합니다.

```
/decisions/resolve

입력:
- TBD ID
- 결정 내용
- 결정 근거
- 결정자
```

### 3. `/decisions/check` - 모듈 차단 확인
특정 모듈의 시작 가능 여부를 확인합니다.

```
/decisions/check

출력:
- 모듈별 의존 TBD 목록
- BLOCKED / READY 상태
- 미해결 항목 상세
```

### 4. `/decisions` (현재 명령어) - 전체 현황
모든 TBD의 현재 상태를 조회합니다.

---

## 📋 TBD 카테고리

| 카테고리 | 설명 | 예시 |
|---------|------|------|
| **Policy** | 비즈니스 정책, 규칙 | MFA 재설정 정책, 데이터 파기 정책 |
| **Schema** | 데이터 모델, API 스키마 | 근로자 다중 소속 구조, 사업장-법인 관계 |
| **UX** | 화면 구조, 플로우 | 모바일 UI 범위, 알림 방식 |
| **Technical** | 기술 선택, 아키텍처 | PG사 선정, 감사 로그 저장소 |
| **Business** | 비즈니스 모델, 가격 | 플랜 구성, 요금 정책 |

---

## 🚦 의존성 체크 규칙

### 모듈 시작 전 체크

```yaml
# 모든 build_fe Step에서 자동 체크
before_start:
  - check: tbd_registry.md
  - filter: 해당 모듈 의존 TBD
  - if: OPEN or PENDING_REVIEW 존재
    then: BLOCK (시작 불가)
  - else: READY (시작 가능)
```

### BLOCK 상태 표시

```markdown
## ⚠️ BLOCKED: F01 인증 시스템

**미해결 TBD:**
- [ ] TBD-001: MFA 재설정 기능 (OPEN)
- [ ] TBD-002: 세빛넥스 일반 관리자 권한 (PENDING_REVIEW)

→ 위 항목이 RESOLVED 되어야 개발 시작 가능
```

---

## 🔄 build_fe 통합

### Step 시작 전 자동 체크

```markdown
# Step 8-4: 기능 개발 시작 전

## 🚦 TBD 체크

### 의존 TBD 확인
| TBD ID | 제목 | 상태 | 결정 필요일 |
|--------|------|------|------------|
| TBD-001 | MFA 재설정 | OPEN | 2024-12-15 |

### 판정
❌ **BLOCKED** - 미해결 TBD가 1건 있습니다.

→ `/decisions/resolve TBD-001` 실행 후 다시 시도하세요.
```

---

## 📝 수행 절차 (현재 명령어)

### 1. tbd_registry.md 읽기

```
docs/decisions/tbd_registry.md 파일을 읽어 현재 TBD 목록 파악
```

### 2. 전체 현황 출력

```markdown
# 📋 TBD 현황

## Summary
- 전체: X건
- OPEN: X건 (🔴)
- PENDING_REVIEW: X건 (🟡)
- RESOLVED: X건 (🟢)

## OPEN (미결정)
| ID | 제목 | 카테고리 | 의존 모듈 | 우선순위 |
|----|------|---------|----------|---------|
| TBD-001 | ... | Policy | US-003, F01 | Critical |

## PENDING_REVIEW (검토 중)
...

## Recently RESOLVED (최근 해결)
...
```

### 3. 다음 액션 제안

```markdown
## 🎯 권장 다음 액션

1. **Critical 우선 해결**: TBD-001, TBD-002
2. **BLOCKED 모듈 확인**: `/decisions/check F01`
3. **결정 요청 필요**: TBD-003 → 고객사 확인 필요
```

---

## 🧩 Human 체크포인트

```markdown
✅ TBD 현황 확인 완료.

확인 항목:
- [ ] OPEN 상태의 TBD가 모두 파악되었는가?
- [ ] 각 TBD의 결정권자가 명확한가?
- [ ] 우선순위가 적절하게 부여되었는가?
- [ ] BLOCKED 모듈이 있다면 해결 계획이 있는가?

→ 다음 단계:
- TBD 등록: `/decisions/register`
- TBD 해결: `/decisions/resolve`
- 모듈 체크: `/decisions/check`
```

---

## ➡️ 관련 명령어

- `/decisions/register` - TBD 등록
- `/decisions/resolve` - TBD 해결
- `/decisions/check` - 모듈 차단 확인
- `/build_fe/main` - FE 개발 (TBD 체크 통합)





