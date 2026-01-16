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
