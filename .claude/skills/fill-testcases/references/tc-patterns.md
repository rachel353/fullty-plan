# TC 작성 패턴 가이드

## TC 타입 정의

| Type | 용도 | 최소 개수 |
|------|------|----------|
| `positive` | 정상 동작 검증 | AC당 1개 필수 |
| `negative` | 실패/오류 케이스 | AC당 1개 권장 |
| `edge` | 경계값/특수 케이스 | 해당시 |
| `smoke` | 주요 경로 빠른 검증 | Route당 1개 |
| `access` | 권한/접근 제어 검증 | 보호된 Route당 1개 |

## TC ID 규칙

```
TC-<US-ID>-<AC-ID>-<NN>
```

예시: `TC-US-001-AC-1-01`, `TC-US-009-AC-2-03`

## 타입별 TC 예시

### Positive (정상 케이스)

```json
{
  "id": "TC-US-001-AC-1-01",
  "title": "정상: 유효한 이메일/비밀번호로 회원가입",
  "type": "positive",
  "precondition": "비로그인 상태",
  "steps": [
    "1. /signup 페이지 접속",
    "2. 유효한 이메일 입력 (test@example.com)",
    "3. 비밀번호 규칙 충족하는 비밀번호 입력",
    "4. 회원가입 버튼 클릭"
  ],
  "expected": "회원가입 성공, 이메일 인증 안내 표시",
  "status": "todo",
  "tags": ["DR-001"]
}
```

### Negative (실패 케이스)

```json
{
  "id": "TC-US-001-AC-1-02",
  "title": "실패: 이미 가입된 이메일로 회원가입 시도",
  "type": "negative",
  "precondition": "test@example.com 계정 이미 존재",
  "steps": [
    "1. /signup 페이지 접속",
    "2. 기존 가입된 이메일 입력",
    "3. 비밀번호 입력",
    "4. 회원가입 버튼 클릭"
  ],
  "expected": "이메일 중복 오류 메시지 표시",
  "status": "todo",
  "tags": ["DR-001"]
}
```

### Edge (경계값 케이스)

```json
{
  "id": "TC-US-001-AC-2-01",
  "title": "경계: 비밀번호 최소 길이 (8자)",
  "type": "edge",
  "precondition": "비로그인 상태, /signup 페이지",
  "steps": [
    "1. 이메일 입력",
    "2. 7자 비밀번호 입력 → 규칙 불충족 표시 확인",
    "3. 8자 비밀번호 입력 → 규칙 충족 표시 확인"
  ],
  "expected": "8자 이상에서만 비밀번호 규칙 통과",
  "status": "todo",
  "tags": ["DR-002"]
}
```

### Smoke (핵심 경로 검증)

```json
{
  "id": "TC-US-003-AC-1-01",
  "title": "스모크: 홈 → 에피소드 → 뷰어 이동",
  "type": "smoke",
  "precondition": "로그인 상태",
  "steps": [
    "1. / 홈 페이지 접속",
    "2. 작품 클릭 → /stories/:id 이동",
    "3. 에피소드 클릭 → /viewer/:id 이동",
    "4. 콘텐츠 정상 로드 확인"
  ],
  "expected": "전체 경로 정상 이동, 콘텐츠 표시",
  "status": "todo",
  "tags": []
}
```

### Access (권한 검증)

```json
{
  "id": "TC-US-020-AC-1-01",
  "title": "접근: 비로그인 시 관리자 페이지 접근 차단",
  "type": "access",
  "precondition": "비로그인 상태",
  "steps": [
    "1. /admin URL 직접 접속 시도"
  ],
  "expected": "/login으로 리다이렉트",
  "status": "todo",
  "tags": []
}
```

## 작성 가이드라인

### precondition 작성법
- 테스트 시작 전 필요한 상태만 기술
- 예: "로그인 상태", "비로그인 상태", "테스트 계정 존재", "특정 데이터 준비됨"

### steps 작성법
- 번호 붙여 순서대로 작성
- 행동 중심으로 기술 (클릭, 입력, 확인)
- 구체적인 값이 있으면 포함

### expected 작성법
- 검증 가능한 결과만 기술
- UI 변화, 메시지, 데이터 상태 등
- 애매한 표현 지양 ("잘 동작함" X → "성공 메시지 표시" O)

## 최소 TC 세트 규칙

각 AC에 대해 최소:
1. **Positive 1개** - 정상 동작 검증 (필수)
2. **Negative 1개** - 실패 케이스 (권장)
3. **Edge/Time/UX 1개** - 해당시 추가

## Domain Rule 커버리지

`docs/conceptual_model.md`의 Domain Rules (DR-xxx)는 최소 1개 TC로 커버해야 함.
TC의 `tags` 배열에 해당 DR-xxx 추가.

## Route 커버리지

중요 Route는 smoke + access TC 필요:
- **smoke**: 해당 경로 정상 접근/동작 확인
- **access**: 권한 없는 사용자 접근 차단 확인
