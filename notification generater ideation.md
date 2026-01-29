좋은 포인트야 👍
그럼 이걸 **“쟈근친구들 전용”이 아니라, 어떤 프로젝트에도 꽂아 쓸 수 있는 범용 Notification Scenario Generator 스킬**로 정리해줄게.

아래는 **유저스토리 JSON 형식은 고정**,
**도메인/문구/서비스 맥락만 바뀌어도 그대로 작동**하도록 만든 **범용 로직**이야.

---

# 🔔 Generic Notification Scenario Generator Skill Logic

## 0. 스킬의 전제 (변하지 않는 것)

### 고정 입력 형식

* `actors[]`
* `user_stories[]`
* 각 user_story는 최소 다음 필드를 가짐

  * `id`
  * `actor_id`
  * `story`
  * `acceptance_criteria[]`
  * `domain`

👉 **스토리 내용만 바뀌고 구조는 동일**하다는 가정

---

## 1. Actor Normalization Layer (범용화 핵심)

### 1.1 Actor Role 추상화

실제 이름과 무관하게, 역할을 **행동 성격 기준**으로 분류

| 추상 Role    | 판별 기준                 |
| ---------- | --------------------- |
| `end_user` | 서비스를 “이용”하는 주체        |
| `provider` | 콘텐츠/자원/서비스를 “제공”하는 주체 |
| `operator` | 승인, 제재, 관리 권한 보유      |

### 1.2 Actor → Abstract Role 매핑 규칙

```ts
if permissions include "관리", "승인", "제재" → operator
else if permissions include "업로드", "정산", "제공" → provider
else → end_user
```

결과 예시:

```json
{
  "actor-reader": "end_user",
  "actor-creator": "provider",
  "actor-admin": "operator"
}
```

> 🔑 이 단계 덕분에
> `독자/작가/관리자`, `고객/판매자/운영자`, `학생/강사/어드민`
> **모두 동일한 로직으로 처리 가능**

---

## 2. User Story → Event Candidate Extraction

### 2.1 이벤트 후보 스토리 판별 규칙

User Story 본문 + Acceptance Criteria 기준으로 판단

#### 이벤트 후보가 되는 조건

* **상태 변화**가 명시됨
* **금전/자원 이동**이 발생
* **관리자 판단 결과**가 존재

#### 제외 조건

* 단순 조회 / 열람 / 탐색
* 즉시 UI에서 결과 확인 가능

---

### 2.2 Acceptance Criteria 기반 이벤트 트리거 추출

AC 문장에서 다음 패턴 탐색:

| 패턴             | 의미               |
| -------------- | ---------------- |
| `상태 ~로 변경`     | state_changed    |
| `완료 시`         | action_completed |
| `차감 / 증가 / 환불` | financial_event  |
| `승인 / 거절`      | decision_event   |
| `알림 발송`        | system_notice    |

---

## 3. Generic Event Type Classification

모든 이벤트는 아래 5가지 중 하나로 귀속

```ts
enum EventType {
  ACTION_COMPLETED,
  STATE_CHANGED,
  FINANCIAL_EVENT,
  DECISION_RESULT,
  ADMIN_ACTION
}
```

예시:

* “출금 요청 승인” → DECISION_RESULT
* “Ink 환불” → FINANCIAL_EVENT
* “신고 처리 완료” → ADMIN_ACTION

---

## 4. Notification Worthiness Decision (범용 핵심 로직)

### 알림 생성 조건 (OR)

1. **사용자가 기다릴 가능성이 있는 결과**
2. **되돌릴 수 없는 상태 변화**
3. **금전/권한/평판에 영향**
4. **비동기 처리 결과**

```ts
shouldNotify =
  affectsUserAsset ||
  affectsUserStatus ||
  asyncResult ||
  requiresUserAwareness
```

---

## 5. Abstract Role → Notification Target 매핑

### 5.1 기본 매핑 규칙

| Event 성격   | 알림 대상    |
| ---------- | -------- |
| 사용자의 행동 결과 | end_user |
| 외부 입력 발생   | provider |
| 운영 개입 필요   | operator |

---

### 5.2 예시

* end_user가 제안 → provider에게 `new_input`
* provider가 승인 → end_user에게 `decision_result`
* end_user가 신고 → operator에게 `new_report`

---

## 6. Event Naming (완전 범용 규칙)

### 네이밍 포맷

```
<entity>_<action>[_result]
```

* entity: story / item / request / payment / report 등
* action: created / updated / approved / rejected / completed

예시:

* `request_approved`
* `payment_refunded`
* `report_resolved`
* `content_published`

👉 도메인 무관, 서비스명 무관

---

## 7. Notification Scenario Object 생성 규칙

### 필수 스키마 (고정)

```json
{
  "event": "string",
  "title": "short human readable title",
  "description": "what happened",
  "channel": "email | sms",
  "template": "message with variables"
}
```

---

### Template 생성 규칙 (범용)

* `{entityName}`
* `{amount}`
* `{result}`
* `{reason}`
* `{date}`

> 실제 프로젝트에서는 변수만 바뀜

---

## 8. Channel Selection (범용 정책)

| 이벤트 타입           | 기본 채널    |
| ---------------- | -------- |
| FINANCIAL_EVENT  | email    |
| DECISION_RESULT  | email    |
| ADMIN_ACTION     | email    |
| ACTION_COMPLETED | optional |
| URGENT (확장)      | sms      |

---

## 9. 최종 JSON Assemble Logic

```json
{
  "version": "1.0",
  "description": "Generic notification scenarios generated from user stories",
  "channels": ["email", "sms"],
  "scenarios": {
    "end_user": [...],
    "provider": [...],
    "operator": [...]
  }
}
```

> 💡 실제 서비스에선
> end_user → reader / customer
> provider → creator / seller
> operator → admin
> 로 UI에서 치환

---

## 10. 이 스킬의 범용 포지션

이 스킬은:

* 어떤 **PRD/User Story JSON**이 와도
* 알림 설계자가 없어도
* **백엔드 이벤트 설계 + 알림 정책**을 동시에 만들어주는

👉 **“User Story → System Event → Notification Policy Translator”**

---
