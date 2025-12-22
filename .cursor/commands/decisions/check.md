# 모듈 차단 확인 (/decisions/check)

> **목적**: 특정 모듈의 개발 시작 가능 여부를 확인하고 미해결 TBD 목록 표시

---

## 📥 입력

| 필드 | 필수 | 설명 | 예시 |
|------|-----|------|------|
| `module_id` | ⬜ | 확인할 모듈 ID | "US-003", "F01", "Step-4" |
| `--all` | ⬜ | 모든 모듈 확인 | (플래그) |
| `--blocked-only` | ⬜ | BLOCKED 모듈만 표시 | (플래그) |

---

## 📤 산출물

### 1. 단일 모듈 확인 결과

```markdown
# 🚦 모듈 상태 확인: {module_id}

## 판정: {BLOCKED | READY}

### 의존 TBD 목록
| TBD ID | 제목 | 상태 | 우선순위 | 결정 기한 |
|--------|------|------|---------|----------|
| TBD-001 | MFA 재설정 | 🟢 RESOLVED | High | - |
| TBD-002 | 관리자 권한 | 🔴 OPEN | Critical | 2024-12-15 |

### 미해결 TBD 상세
## TBD-002: 세빛넥스 일반 관리자 권한

**상태**: 🔴 OPEN
**결정권자**: @고객사
**결정 기한**: 2024-12-15

**설명**:
세빛넥스 일반 관리자가 가질 권한 범위 정의 필요

**선택지**:
- [ ] 슈퍼 마스터와 동일
- [ ] 조회만 가능
- [ ] 제한적 수정 (일부 기능)

---

### 결론
❌ **BLOCKED** - 미해결 TBD 1건

→ TBD-002가 RESOLVED 되어야 개발 시작 가능
→ `/decisions/resolve TBD-002` 실행 필요
```

### 2. 전체 모듈 확인 결과 (`--all`)

```markdown
# 🚦 전체 모듈 상태 현황

## Summary
- 전체 모듈: XX개
- 🟢 READY: XX개
- 🔴 BLOCKED: XX개

---

## 🔴 BLOCKED 모듈

### US-003: MFA (2차 인증)
- 미해결 TBD: 1건
  - TBD-001: MFA 재설정 (🔴 OPEN)

### F01: 인증 시스템
- 미해결 TBD: 2건
  - TBD-001: MFA 재설정 (🔴 OPEN)
  - TBD-002: 관리자 권한 (🔴 OPEN)

### Step-4: Logical Architecture
- 미해결 TBD: 1건
  - TBD-003: 데이터 스키마 (🟡 PENDING_REVIEW)

---

## 🟢 READY 모듈

### US-010: 근로계약서 작성
- 관련 TBD: 없음

### US-020: 스케줄 관리
- 관련 TBD: 1건 (모두 해결됨)
  - TBD-005: 스케줄 범위 (🟢 RESOLVED)

(... 기타 READY 모듈 ...)
```

---

## 🔧 수행 절차

### 1. TBD Registry 읽기

```
docs/decisions/tbd_registry.md 파일 읽기
모든 TBD 목록 및 상태 파악
```

### 2. 모듈-TBD 의존성 매핑

```yaml
# 각 TBD의 dependencies 필드에서 추출
dependency_map:
  US-003:
    - TBD-001
    - TBD-002
  F01:
    - TBD-001
    - TBD-002
  US-010:
    - (없음)
```

### 3. 모듈별 상태 판정

```yaml
for each module:
  related_tbds = dependency_map[module]
  
  if related_tbds is empty:
    status = READY
  else:
    unresolved = filter(related_tbds, status != RESOLVED)
    if unresolved is empty:
      status = READY
    else:
      status = BLOCKED
```

### 4. 결과 출력

```
모듈 ID, 상태, 관련 TBD 목록 출력
BLOCKED인 경우 미해결 TBD 상세 정보 포함
```

---

## 🎯 판정 기준

### READY (🟢)

```yaml
조건:
  - 관련 TBD가 없음
  OR
  - 모든 관련 TBD가 RESOLVED 상태
```

### BLOCKED (🔴)

```yaml
조건:
  - 1개 이상의 관련 TBD가 OPEN 또는 PENDING_REVIEW 상태
```

---

## 📊 우선순위 기반 정렬

BLOCKED 모듈은 미해결 TBD의 우선순위에 따라 정렬:

```yaml
priority_order:
  1. Critical TBD가 있는 모듈
  2. High TBD가 있는 모듈
  3. Medium TBD가 있는 모듈
  4. Low TBD가 있는 모듈
```

---

## 📝 예시: 모듈 상태 확인

### 예시 1: 단일 모듈 확인

```
/decisions/check US-003
```

**출력:**

```markdown
# 🚦 모듈 상태 확인: US-003

## 판정: 🔴 BLOCKED

### 의존 TBD 목록
| TBD ID | 제목 | 상태 | 우선순위 | 결정 기한 |
|--------|------|------|---------|----------|
| TBD-001 | MFA 재설정 | 🔴 OPEN | High | 2024-12-15 |

### 미해결 TBD 상세

#### TBD-001: MFA 재설정 기능 범위

**상태**: 🔴 OPEN
**우선순위**: High
**결정권자**: @고객사
**결정 기한**: 2024-12-15

**설명**:
세빛넥스 관리자가 사용자의 2차 인증 대기 상태로 변경하는 기능을 MVP에 포함할지 결정 필요

**선택지**:
- [ ] MVP 포함
- [ ] 이후 버전
- [ ] 구현 안 함

---

### 결론
❌ **BLOCKED** - 미해결 TBD 1건

**권장 조치:**
1. 결정권자(@고객사)에게 결정 요청
2. 결정 완료 후 `/decisions/resolve TBD-001` 실행
3. 상태 재확인 `/decisions/check US-003`
```

### 예시 2: BLOCKED 모듈만 확인

```
/decisions/check --blocked-only
```

**출력:**

```markdown
# 🔴 BLOCKED 모듈 목록

## Summary
- BLOCKED 모듈: 3개
- Critical TBD 관련: 1개
- High TBD 관련: 2개

---

## 1. F01: 인증 시스템 (Critical)

**미해결 TBD: 2건**

| TBD ID | 제목 | 상태 | 우선순위 |
|--------|------|------|---------|
| TBD-001 | MFA 재설정 | 🔴 OPEN | High |
| TBD-002 | 관리자 권한 | 🔴 OPEN | Critical |

**긴급 조치 필요**: TBD-002 (Critical)

---

## 2. US-003: MFA (2차 인증) (High)

**미해결 TBD: 1건**

| TBD ID | 제목 | 상태 | 우선순위 |
|--------|------|------|---------|
| TBD-001 | MFA 재설정 | 🔴 OPEN | High |

---

## 3. Step-4: Logical Architecture (High)

**미해결 TBD: 1건**

| TBD ID | 제목 | 상태 | 우선순위 |
|--------|------|------|---------|
| TBD-003 | 데이터 스키마 | 🟡 PENDING | High |

---

## 🎯 권장 우선순위

1. **즉시 해결**: TBD-002 (Critical) → F01 UNBLOCK
2. **이번 주 내**: TBD-001 (High) → US-003, F01 UNBLOCK
3. **검토 완료 대기**: TBD-003 (PENDING) → Step-4 UNBLOCK
```

---

## 🔄 build_fe 통합

### Step 시작 전 자동 체크

```markdown
# Step 4: Logical Architecture 시작

## 🚦 TBD 체크 (자동)

/decisions/check Step-4 실행 결과:

### 의존 TBD 목록
| TBD ID | 제목 | 상태 |
|--------|------|------|
| TBD-003 | 데이터 스키마 | 🟡 PENDING_REVIEW |
| TBD-004 | 사업장-법인 관계 | 🔴 OPEN |

### 판정
❌ **BLOCKED** - 미해결 TBD 2건

---

⚠️ **Step 4를 시작할 수 없습니다.**

다음 TBD를 먼저 해결해주세요:
1. TBD-003: 데이터 스키마 (검토 완료 대기)
2. TBD-004: 사업장-법인 관계 (@고객사 결정 필요)

→ `/decisions/resolve TBD-003` 또는 `/decisions/resolve TBD-004` 실행 후 재시도
```

---

## 🧩 Human 체크포인트

```markdown
✅ 모듈 상태 확인 완료.

확인 항목:
- [ ] BLOCKED 모듈 목록이 정확한가?
- [ ] 미해결 TBD의 결정권자가 명확한가?
- [ ] 결정 기한이 합리적인가?
- [ ] 우선순위에 따라 해결 계획이 있는가?

→ 다음 단계:
- 결정권자에게 결정 요청
- `/decisions/resolve {TBD-ID}` 로 해결
- 해결 후 다시 `/decisions/check` 로 확인
```

---

## ➡️ 관련 명령어

- `/decisions` - 전체 현황
- `/decisions/register` - TBD 등록
- `/decisions/resolve` - TBD 해결





