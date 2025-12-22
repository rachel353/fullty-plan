## Process Meeting Script Summary

```
Process meeting script summary for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Context:**
- These meeting scripts are between 레트머스 (Retmos) - an outsourcing development company - and their clients
- **Priority**: Client needs and agreements are the top priority. Focus on what the client said, whether they agreed or disagreed
- Meeting scripts may not be perfectly accurate, so referencing previous meeting content helps with understanding

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `meeting_scripts/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over `script.md` when there are conflicts
   - Use `note.md` for corrections, clarifications, or additional context
3. **Check for previous meeting scripts** in the same client folder (read earlier summaries if available)
4. **Check for `appendix/` folder** and read `appendix/*.md` files (optional, for additional reference materials)
5. Locate existing `meeting_scripts/[MM.DD]/script.md` file
6. Read the script content from `script.md` (use previous meeting context, note.md, and appendix files for better understanding)
6. Extract final agreed-upon items using the Korean prompt below (prioritize note.md content if available)
7. Create `summary.md` file in `meeting_scripts/[MM.DD]/` folder

**IMPORTANT:**
- The `script.md` file must already exist
- **`note.md` takes priority**: If `note.md` exists in `meeting_scripts/[MM.DD]/` folder, it must be read first and its content takes precedence over `script.md`
- **`note.md` usage**: Use `note.md` for corrections, clarifications, additional context, or overrides to `script.md` content
- **Reference previous meetings**: If there are earlier meeting scripts in the same client folder, read their summaries first to understand ongoing discussions and context
- **Client priority**: When extracting, prioritize client statements and agreements over 레트머스 team statements
- This command creates `summary.md` which is required before generating requirements
- If `summary.md` already exists, it will be overwritten
- **Meeting script limitations**: Transcripts may have inaccuracies - use previous meeting context and note.md to clarify ambiguous statements

---

## Summary Extraction Prompt

**Use the following prompt to extract the summary:**

다음 대화 요약을 분석해 "최종적으로 합의된 내용"만 구조화해서 출력하라.

---

조건:

- 의견, 논의 중 제안, 가정, 미확정 내용은 제외한다.

- 실제로 상대방이 "동의/확정/합의/진행" 의미를 표현한 내용만 포함하라.

- 불명확한 표현(예: '검토해보자', '가능할 것 같다', '논의 중')은 포함하지 않는다.

- 금액, 기간, 역할, 액션아이템, 책임자 기준으로 정제하라.

- 최종 산출물은 아래 구조로 정리해라.

**출력 형식:**

```
# [최종 합의 사항]

## 1) Scope (확정된 개발 범위)
- 항목별 bullet로 구체적 명확한 표현 사용

## 2) Budget & Model (금액 및 계약 방식)
- 확정 금액 또는 방식만 명시

## 3) Timeline (일정)
- 확정된 시작일, 마일스톤, 완료 목표만 작성

## 4) Responsibilities (역할/책임자)
- 누가 무엇을 제공/수행하기로 했는지

## 5) Next Actions (명확히 합의된 다음 행동만)
- 작업 단위 + 담당자 + 기한 포함

## 6) 미합의 항목 (향후 협의 예정)
- 결론 미확정이나 추가 논의 필수인 항목만 리스트업
```

---

## Summary Format Template

### 1) Scope (확정된 개발 범위)
- 항목별 bullet로 구체적 명확한 표현 사용
- 실제로 합의된 기능/범위만 포함
- 예시:
  - 스케줄 입력 기능: 과거 및 미래 3개월씩 입력 가능
  - 근태 A와 근태 B 구분 기능
  - 농업법인 전달 페이지 구현

### 2) Budget & Model (금액 및 계약 방식)
- 확정 금액 또는 방식만 명시
- 예시:
  - 계약 금액: 5억원 (부가세 포함)
  - 결제 방식: 334 (선금 30%, 중도금 30%, 잔금 40%)
  - 서버 비용: 초기 70-80만원/월

### 3) Timeline (일정)
- 확정된 시작일, 마일스톤, 완료 목표만 작성
- 예시:
  - 시작일: 12월 중순
  - 개발 기간: 4개월 (테스트 포함)
  - QA 기간: 2주-3주 (고객사)
  - 총 기간: 약 6개월

### 4) Responsibilities (역할/책임자)
- 누가 무엇을 제공/수행하기로 했는지
- 예시:
  - PM: 태준님 (국내)
  - 개발: 베트남 팀 (주로)
  - 고객사: 문서 및 정책 확인 자료 제공
  - 개발사: API 설계 문서 제공

### 5) Next Actions (명확히 합의된 다음 행동만)
- 작업 단위 + 담당자 + 기한 포함
- 예시:
  - 어제 질의한 내용 정리한 팩 링크 전달 - 담당자: 개발사 - 기한: 내일까지
  - 근태 A → 노무법인 전달 시 문서 양식 제공 - 담당자: 고객사 - 기한: 다음 주까지
  - 계약서 검토 및 결정 - 담당자: 고객사 - 기한: 12월 중

### 6) 미합의 항목 (향후 협의 예정)
- 결론 미확정이나 추가 논의 필수인 항목만 리스트업
- 예시:
  - 스케줄 입력 범위 정책 (과거/미래 3개월 vs 무한대) - 향후 협의 필요
  - 다운로드 정책 (수시 다운로드 vs 일주일 유효기간) - 추가 논의 필요
  - 명세서 자동 생성 vs 수동 생성 - 향후 결정 예정

---

## Extraction Rules

### ✅ Include (합의된 내용만):
- "동의합니다", "확정했습니다", "합의했습니다", "진행하겠습니다" 등 명확한 합의 표현
- 구체적인 금액, 기간, 역할이 확정된 내용
- "~하기로 했습니다", "~하기로 합의했습니다" 등 확정 표현

### ❌ Exclude (제외할 내용):
- "검토해보자", "가능할 것 같다", "논의 중" 등 불명확한 표현
- 의견, 제안, 가정
- 미확정 내용
- 추측이나 가능성 언급

### Format Guidelines:
- 각 섹션은 bullet point로 구체적이고 명확하게 작성
- Section 5는 반드시 작업 단위 + 담당자 + 기한 포함
- Section 6은 향후 협의가 필요한 항목만 포함

---

**Example:**
```
Process meeting script summary for client 세빛넥스 with meeting date 11.06
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. **Check for `note.md`** in `meeting_scripts/11.06/` folder (if exists, read first and prioritize)
3. Read existing file: `meeting_scripts/11.06/script.md`
4. Extract summary using Korean prompt (prioritize note.md content if available)
5. Create `summary.md` file

