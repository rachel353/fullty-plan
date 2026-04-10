# proposal.md Template

## Output Structure

```markdown
# 프로젝트 제안서 - [Client Name]

## 6) 화면 구조도 (IA)

(ia_structure.md의 Visual Site Map 포함)

### Platform Definition
- **플랫폼**: [Web App / Mobile Web / Hybrid / etc.]
- **주요 접근 방식**: [Desktop-first / Mobile-first]

### Site Map
(IA 구조 텍스트 트리 포함)

---

## 7) 서비스 유저

| Actor | Description | Primary Goals |
|-------|-------------|---------------|
| [Actor 1] | [역할 설명] | [주요 목표] |
| [Actor 2] | [역할 설명] | [주요 목표] |

---

## 8) 견적서

(quotes.md에서 중요도별 견적과 기능별 비용만 추출)

### 8-1) 중요도별 견적 상세

| 구분 | 포함 기준 | 포함 기능 | 금액 (VAT 별도) | 비고 |
|------|----------|----------|----------------|------|
| 필수 견적 | 중요도 1 | [REQ ID 목록] | ₩XX,XXX,XXX | MVP 필수 |
| 권장 견적 | 중요도 1 + 2 | [추가 REQ ID] | ₩XX,XXX,XXX | 권장 |
| 옵션 견적 | (추가됨) | [추가됨 REQ ID] | ₩X,XXX,XXX | 포함 확인 필요 |

### 8-2) 주요 기능별 비용

#### [영역명 1]

| 기능 ID | 기능명 | 금액 |
|---------|--------|------|
| REQ-XXX | [기능명] | ₩X,XXX,XXX |

#### [영역명 2]

| 기능 ID | 기능명 | 금액 |
|---------|--------|------|
| REQ-XXX | [기능명] | ₩X,XXX,XXX |

> 모든 금액은 VAT 별도입니다.

---

## 9) 일정 안내

### 9-1) 예상 일정

| 단계 | 기간 | 비고 |
| --- | --- | --- |
| POC | X주 | [POC 목적/조건] |
| 기획 | X주 | [기획 범위] |
| 개발 Phase 1 | X주 | [Phase 1 범위] |
| 개발 Phase 2 | X주 | [Phase 2 범위] |
| 테스트/배포 | X주 | [테스트/배포 범위] |
| **총 기간** | **약 X개월** | [총 기간 비고] |

> 일정은 프로젝트 범위 및 피드백 주기에 따라 변동될 수 있습니다.

### 9-2) Next Steps

1. [다음 단계 1]
2. [다음 단계 2]
3. [다음 단계 3]
```

## Content Extraction Guidelines

### From ia_structure.md
- Platform Definition 섹션
- Visual Site Map (텍스트 트리)
- Screen 목록

### From user_stories_data.json
- `actors` 배열에서 유저 정보 추출
- Actor별 역할, 설명, 목표

### From quotes.md
- **견적 요약 > 중요도별 견적 요약** → 8-1) 중요도별 견적 상세
- **견적 요약 > REQ 원본 ID 기준 합계** 또는 **화면별 기능 및 견적** → 8-2) 주요 기능별 비용

### For 9) 일정 안내
- `background.md` 또는 `note.md`에서 일정 관련 논의 내용 참조
- 견적 규모와 프로젝트 복잡도에 따라 일정 산정
- 일정이 명시되지 않은 경우 `(확인 필요)` 표시 또는 합리적 추정치 제시
- Next Steps는 계약/협의 진행을 위한 다음 단계 안내

## Formatting Guidelines

### 권한 테이블
- IA 구조의 주요 화면/기능을 행으로 나열
- 각 Actor를 열로 배치
- 권한 수준을 이모지로 표시

### 견적 섹션
- 클라이언트 대면용이므로 깔끔하게 정리
- 내부 계산(MM, 단가)은 절대 포함하지 않음
- **8-1) 중요도별 견적 상세**와 **8-2) 주요 기능별 비용**만 포함
- POC, 옵션 비교, 추가됨 항목 확인 요청, 전체 예상 비용 등은 제외

### 일정 섹션
- 단계별 기간은 주(週) 단위로 표기
- 총 기간은 개월 단위로 환산하여 표기
- POC가 필요한 경우 별도 행으로 분리
- 비고에는 해당 단계의 주요 산출물/마일스톤 기재
- Next Steps는 번호 리스트로 3-5개 항목 제시
