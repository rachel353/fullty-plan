# Acceptance Criteria Validation Guide

## Measurable AC Criteria

Every Acceptance Criterion (AC) must be **measurable** and **verifiable**. An AC is measurable when it can be objectively tested with a clear pass/fail result.

### ✅ Good ACs (Measurable)

| AC | Why It's Good | Test Method |
|---|---|---|
| "로그인 성공 시 3초 이내에 대시보드로 이동" | 구체적 시간, 명확한 결과 | 스톱워치 측정 |
| "이메일 형식이 아닐 경우 '유효한 이메일을 입력하세요' 에러 표시" | 구체적 조건, 구체적 메시지 | 입력 테스트 |
| "페이지당 20개 항목 표시" | 구체적 숫자 | 카운트 |
| "필수 항목 미입력 시 저장 버튼 비활성화" | 명확한 조건과 결과 | UI 검증 |
| "삭제 확인 모달에서 '삭제' 버튼 클릭 시 데이터 삭제" | 명확한 트리거와 결과 | 기능 테스트 |

### ❌ Bad ACs (Not Measurable)

| AC | Problem | How to Fix |
|---|---|---|
| "사용자 경험 향상" | 주관적, 측정 불가 | "페이지 로드 3초 이내" |
| "빠르게 응답" | "빠르게"가 모호함 | "API 응답 500ms 이내" |
| "직관적인 UI" | 주관적 | "3번 클릭 이내로 목표 달성" |
| "안정적인 시스템" | 측정 기준 없음 | "99.9% uptime" |
| "효율적인 처리" | "효율적"이 모호함 | "1000건/초 처리" |

## Subjective Words to Avoid

다음 단어들이 AC에 포함되면 측정 불가능:

| Korean | English | Alternative |
|---|---|---|
| 좋은/나쁜 | good/bad | 구체적 기준 제시 |
| 빠른/느린 | fast/slow | 시간(초, ms) 명시 |
| 많은/적은 | many/few | 숫자 명시 |
| 효율적인 | efficient | 처리량, 시간 명시 |
| 직관적인 | intuitive | 클릭 수, 단계 수 명시 |
| 안정적인 | stable | uptime %, 에러율 명시 |
| 적절한 | appropriate | 구체적 조건 명시 |
| 충분한 | sufficient | 수량 명시 |

## AC Validation Checklist

각 AC에 대해 다음 질문에 "예"라고 답할 수 있어야 함:

1. **구체성**: 숫자, 텍스트, 또는 명확한 행동이 포함되어 있는가?
2. **테스트 가능성**: 이 AC로 테스트 케이스를 작성할 수 있는가?
3. **관찰 가능성**: 결과를 눈으로 확인하거나 측정할 수 있는가?
4. **객관성**: 다른 사람이 봐도 같은 결론을 내릴 수 있는가?

## Common AC Patterns

### 입력 검증

```
- 필수 항목 미입력 시 "[필드명]을 입력하세요" 에러 표시
- 이메일 형식 불일치 시 "유효한 이메일을 입력하세요" 에러 표시
- 비밀번호 8자 미만 시 "비밀번호는 8자 이상이어야 합니다" 에러 표시
```

### 성능

```
- 페이지 로드 3초 이내
- API 응답 500ms 이내
- 1000건 데이터 조회 시 5초 이내 표시
```

### UI/UX

```
- 페이지당 20개 항목 표시
- 스크롤 시 추가 20개 항목 로드 (무한 스크롤)
- 3번 클릭 이내로 목표 화면 도달
```

### 권한

```
- 관리자만 삭제 버튼 표시
- 비로그인 사용자는 로그인 페이지로 리다이렉트
- 권한 없는 페이지 접근 시 403 에러 표시
```

## Transforming Vague ACs

| Original (Vague) | Transformed (Measurable) |
|---|---|
| "빠른 검색" | "검색 결과 1초 이내 표시" |
| "많은 데이터 처리" | "10,000건까지 한 번에 처리" |
| "안정적인 업로드" | "100MB 파일까지 업로드 가능, 실패 시 재시도 버튼 표시" |
| "직관적인 네비게이션" | "메인 메뉴에서 3번 클릭 이내로 모든 기능 접근" |
| "효율적인 워크플로우" | "기존 5단계 → 3단계로 축소" |

