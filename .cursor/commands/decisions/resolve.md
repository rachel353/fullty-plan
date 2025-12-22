# TBD 해결 (/decisions/resolve)

> **목적**: 미결정 항목(TBD)을 해결하고 의존 모듈의 BLOCK 상태 해제

---

## 📥 입력

TBD 해결 시 필요한 정보:

| 필드 | 필수 | 설명 | 예시 |
|------|-----|------|------|
| `tbd_id` | ✅ | TBD ID | "TBD-001" |
| `decision` | ✅ | 최종 결정 내용 | "MVP 포함: 이메일 기반 MFA 재설정 기능 구현" |
| `rationale` | ✅ | 결정 근거 | "고객사 요청 및 보안 정책 준수 필요" |
| `decided_by` | ✅ | 결정자 | "@고객사 담당자 홍길동" |
| `impact` | ⬜ | 영향 범위 | "US-003 AC 추가, F01 범위 확정" |
| `action_items` | ⬜ | 후속 조치 | ["US-003 AC 업데이트", "F01 Spec 확정"] |

---

## 📤 산출물

### 1. `docs/decisions/tbd_registry.md` 업데이트

```markdown
## TBD-XXX: {title}

| 항목 | 내용 |
|------|------|
| **ID** | TBD-XXX |
| **상태** | 🟢 RESOLVED |
| **카테고리** | {category} |
| **우선순위** | {priority} |
| **결정권자** | {owner} |
| **결정일** | {today} |
| **결정자** | {decided_by} |
| **등록일** | {registered_date} |
| **의존 모듈** | {dependencies} |

### 설명
{description}

### 결정
✅ **{decision}**

### 결정 근거
{rationale}

### 후속 조치
- [ ] {action_item_1}
- [ ] {action_item_2}

---
```

### 2. `docs/decisions/decision_log.md` 기록 추가

```markdown
## [2024-12-10] TBD-XXX 해결

| 항목 | 내용 |
|------|------|
| **TBD** | TBD-XXX: {title} |
| **결정** | {decision} |
| **결정자** | {decided_by} |
| **근거** | {rationale} |

### 영향받는 모듈
- US-003: MFA → 🟢 UNBLOCKED
- F01: 인증 시스템 → 🟢 UNBLOCKED

---
```

---

## 🔧 수행 절차

### 1. TBD 존재 확인

```
docs/decisions/tbd_registry.md에서 해당 TBD 확인
- 있으면: 현재 상태 확인
- 없으면: 에러 "TBD-XXX not found"
```

### 2. 상태 검증

```yaml
validation:
  - current_status: OPEN 또는 PENDING_REVIEW 여야 함
  - if: RESOLVED
    then: 에러 "TBD-XXX is already resolved"
```

### 3. 결정 내용 검증

```yaml
validation:
  - decision: 필수, 비어있으면 에러
  - rationale: 필수, 비어있으면 에러
  - decided_by: 필수, 비어있으면 에러
```

### 4. Registry 업데이트

```
TBD 상태를 RESOLVED로 변경
결정 내용, 근거, 결정자 기록
```

### 5. Decision Log 기록

```
docs/decisions/decision_log.md에 결정 이력 추가
```

### 6. 의존 모듈 UNBLOCK

```
해당 TBD에 의존하던 모듈들의 BLOCKED 상태 확인:
- 다른 OPEN TBD가 없으면: UNBLOCKED (🟢)
- 다른 OPEN TBD가 있으면: 여전히 BLOCKED (⚠️)
```

### 7. 후속 조치 알림

```markdown
## 📋 후속 조치 필요

TBD-XXX 해결로 인해 다음 문서 업데이트가 필요합니다:

### 자동 업데이트됨:
- ✅ docs/decisions/tbd_registry.md
- ✅ docs/decisions/decision_log.md

### 수동 업데이트 필요:
- [ ] docs/user_stories.md - US-003 AC 추가
- [ ] docs/features/F01_인증_spec.md - 범위 확정
```

---

## 📝 예시: TBD 해결

### 입력 예시

```
/decisions/resolve

TBD ID: TBD-001
결정: MVP 포함 - 이메일 기반 MFA 재설정 기능 구현
근거: 
  - 고객사 요청: 보안 정책 준수 필요
  - 사용자 경험: 2차 인증 수단 분실 시 대응 방안 필수
  - 구현 복잡도: 낮음 (기존 이메일 인증 로직 재사용)
결정자: @고객사 담당자 홍길동
후속 조치:
  - US-003 Acceptance Criteria에 MFA 재설정 AC 추가
  - F01 인증 시스템 Spec에 MFA 재설정 기능 명세 추가
```

### 출력 예시

```markdown
✅ TBD-001 해결 완료

## TBD-001: MFA 재설정 기능 범위

| 항목 | 내용 |
|------|------|
| **ID** | TBD-001 |
| **상태** | 🟢 RESOLVED |
| **결정일** | 2024-12-10 |
| **결정자** | @고객사 담당자 홍길동 |

### 결정
✅ **MVP 포함 - 이메일 기반 MFA 재설정 기능 구현**

### 결정 근거
- 고객사 요청: 보안 정책 준수 필요
- 사용자 경험: 2차 인증 수단 분실 시 대응 방안 필수
- 구현 복잡도: 낮음 (기존 이메일 인증 로직 재사용)

---

## 🟢 UNBLOCKED 모듈

다음 모듈의 BLOCK 상태가 해제되었습니다:
- US-003: MFA (2차 인증) → 🟢 READY
- F01: 인증 시스템 → 🟢 READY (다른 TBD 없음)

---

## 📋 후속 조치 필요

- [ ] docs/user_stories.md - US-003 AC 추가
- [ ] docs/features/F01_인증_spec.md - 범위 확정
```

---

## 🔄 자동 연동

### user_stories.md 연동

TBD 해결 시 관련 User Story 업데이트:

```markdown
### US-003: MFA (2차 인증) - Level 2 전체

**Acceptance Criteria:**
- [ ] 이메일 기반 MFA 인증
- [ ] 인증 코드 발송 및 확인
- [ ] 인증 실패 시 보안 알림
- [ ] 인증 이력 조회
- [ ] Level 2 역할 (8개) 전체 MFA 필수
- [x] ~~(TBD) MFA 재설정 기능~~ → ✅ **RESOLVED: MVP 포함**
  - [ ] 세빛넥스 관리자가 2차 인증 대기 상태로 변경 가능
  - [ ] 사용자가 다음 로그인 시 새로 등록

**⚠️ 관련 TBD:**
~~- TBD-001: MFA 재설정 기능 범위 (🔴 OPEN)~~
*(모든 TBD 해결됨)*

→ 🟢 이 User Story는 개발 시작 가능합니다.
```

---

## ⚠️ 부분 해결 (Partial Resolution)

TBD를 완전히 해결하지 않고 일부만 결정하는 경우:

```
/decisions/resolve --partial

TBD ID: TBD-002
부분 결정: 조회 권한만 확정
남은 결정: 수정 권한 범위
새로운 기한: 2024-12-20
```

이 경우:
- 상태: 🟡 PENDING_REVIEW (완전 해결 아님)
- 의존 모듈: 여전히 BLOCKED

---

## 🧩 Human 체크포인트

```markdown
✅ TBD-XXX 해결 완료.

확인 항목:
- [ ] 결정 내용이 명확한가?
- [ ] 결정 근거가 충분한가?
- [ ] 후속 조치가 모두 식별되었는가?
- [ ] UNBLOCKED된 모듈이 개발 시작 가능한가?

→ 다음 단계:
- 후속 조치 실행 (User Story/Spec 업데이트)
- `/decisions/check {모듈ID}` 로 상태 재확인
- 개발 시작
```

---

## ➡️ 관련 명령어

- `/decisions` - 전체 현황
- `/decisions/register` - TBD 등록
- `/decisions/check` - 모듈 차단 확인





