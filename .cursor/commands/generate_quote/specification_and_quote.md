# Generate Quote Specification and Quote

## Overview
견적 중심의 명세서 파일을 생성합니다. IA, 기능, 가격을 포함하며 가격 및 비용 분석에 집중합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `quotes/[MM.DD]/note.md` 확인 (존재 시 최우선)
3. 필수 파일 읽기:
   - `quotes/[MM.DD]/guide.md` (필수)
   - 모든 `meeting_scripts/[MM.DD]/requirements.md` 파일
   - `meeting_scripts/[MM.DD]/summary.md` (예산 정보 포함)
   - `quotes/[MM.DD]/ia_structure.md`
   - 이전 견적서 파일들
   - `appendix/requirements.md` (존재 시 필수, REQ ID 확인)
4. REQ ID 리뷰 및 검증:
   - 모든 미팅의 requirements.md에서 REQ ID 추출
   - appendix/requirements.md에서 REQ ID 추출 (존재 시)
   - 각 REQ ID가 specification에 포함되었는지 확인
   - 포함되지 않은 REQ ID 추가 또는 Section 9에 명시
5. 견적 기준 결정 (guide.md Section 6.2 참고):
   - 현실적인 견적 계산 (모든 REQ 반영)
   - 협의된 견적과 비교
   - 높은 견적을 기준으로 작성
6. 통합 명세서 테이블 생성:
   - IA 구조 참조
   - 각 화면별 기능 및 가격 포함
   - 총 비용 요약
   - 제외된 요구사항 (있는 경우)
7. `quotes/[MM.DD]/specification_and_quote.md` 생성 (기존 파일 덮어쓰기)

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 7) Integrated Specification (IA + Feature + Price)

(Visual Site Map의 그룹 순서대로 테이블 생성)

### Group 01. [그룹명]

| IA ID | Screen Name | Linked Requirements (REQ ID) | Feature Description (기능 상세) | Est. Price |
|-------|-------------|------------------------------|--------------------------------|------------|
| IA-001 | [화면명] | [REQ-XXX, REQ-YYY] | [FEAT-번호]. [기능명]<br>- [상세 구현 내용 1]<br>- [상세 구현 내용 2] | ₩X,XXX,XXX |

*(모든 그룹에 대해 위 테이블 반복)*

## 8) Total Cost Summary

**총 금액(견적): ₩XX,XXX,XXX KRW (VAT 별도)**

**세부 내역:**
- Group 01: ₩X,XXX,XXX
- Group 02: ₩X,XXX,XXX
- Group 03: ₩X,XXX,XXX
- **합계**: ₩XX,XXX,XXX

## 9) (선택) 제외된 요구사항

### Group 01. [그룹명]

| IA ID | Screen Name | Linked Requirements (REQ ID) | Feature Description (기능 상세) | Est. Price |
|-------|-------------|------------------------------|--------------------------------|------------|
| IA-XXX | [화면명] | [REQ-XXX, REQ-YYY] | [FEAT-번호]. [기능명]<br>- [상세 구현 내용] | ₩X,XXX,XXX |

**제외 항목 총액: ₩X,XXX,XXX KRW (VAT 별도)**
```

**중요 사항:**
- 맨먼스와 맨먼스 단가는 내부 계산용으로만 사용 (클라이언트 문서에 표시하지 않음)
- 클라이언트 문서에는 최종 가격(₩X,XXX,XXX)만 표시
- 모든 기능에 REQ ID 연결 필수

## Checklist
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] 모든 REQ ID가 수집되었는가?
- [ ] 각 REQ ID가 포함되었는지 확인되었는가?
- [ ] 견적 기준이 결정되었는가?
- [ ] 가격이 맨먼스 기준으로 계산되었는가? (내부 계산용)
- [ ] 클라이언트 문서에는 최종 가격만 표시되었는가?
- [ ] specification_and_quote.md가 올바른 구조로 생성되었는가?
