## Process Meeting Script Feedback

```
Process meeting script feedback for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Analyze the meeting script to identify areas where 리트머스 sales team can improve their approach, communication, and sales process. This command helps improve future client consultations.

**Context:**
- These meetings are between 리트머스 (outsourcing development company) and clients
- Focus on identifying 리트머스 sales team's communication patterns, missed opportunities, and areas for improvement
- Distinguish between 리트머스 side statements and client side statements

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `meeting_scripts/[MM.DD]/` folder:
   - If `note.md` exists, read it first for additional context or corrections
   - `note.md` may contain feedback-related notes or clarifications
3. **Check for `appendix/` folder** and read `appendix/*.md` files (optional, for additional reference materials)
4. Locate existing `meeting_scripts/[MM.DD]/script.md` file
5. Read the script content from `script.md` (consider note.md and appendix files if available)
5. Identify speakers and distinguish:
   - 리트머스 team members (sales, PM, developers, consultants)
   - Client representatives
6. Analyze the meeting to identify:
   - **Specific exchanges**: Extract exact client statements and 리트머스 responses with timing/context
   - **Communication issues**: Where did 리트머스 respond inappropriately to client statements?
   - **Missed opportunities**: When should 리트머스 have asked follow-up questions or clarified?
   - **Better response suggestions**: For each problematic exchange, provide specific alternative wording
   - **Consider note.md context**: If note.md exists, use it to understand corrections or additional context
7. Create `feedback.md` file in `meeting_scripts/[MM.DD]/` folder with:
   - Exact examples with timing/context
   - Client statement → 리트머스 response → issue → better alternative format
   - Brief strengths section (simple bullet points only)

**IMPORTANT:**
- The `script.md` file must already exist
- **`note.md` reference**: If `note.md` exists, read it for additional context, corrections, or feedback-related notes
- **모든 피드백은 구체적 예시와 시점을 포함해야 함**: 고객사 발언 → 리트머스 응답 → 문제점 → 개선 제안 형식
- **실제 발언 기반**: 스크립트에서 실제로 나온 발언을 정확히 인용하거나 요약해야 함
- **개선 제안은 구체적으로**: "이런 경우에는 이렇게 말했으면 좋았을 것 같다" 형식으로 대안 제시
- **장점은 간단히만**: Strengths 섹션은 단순한 내용만 몇 가지 bullet로 정리
- If `feedback.md` already exists, it will be overwritten

---

## Feedback Analysis Guidelines

### 1. Identify Speaker Roles
- Distinguish between 리트머스 team and client representatives
- Note who is speaking (PM, developer, client decision maker, etc.)
- Track who initiated topics and who responded
- **IMPORTANT**: Record exact timing/context when specific exchanges occurred

### 2. Extract Specific Examples with Context
- **For each feedback point, include:**
  - **Client's statement**: What the client said (exact quote or paraphrase with context)
  - **리트머스 response**: What 리트머스 team said in response (exact quote or paraphrase)
  - **Timing/Context**: When in the meeting this occurred (topic, sequence)
  - **Issue identified**: Why this exchange was problematic or could be improved
  - **Better alternative**: How 리트머스 could have responded differently

### 3. Communication Analysis Format
- **Use this structure for each improvement point:**
  ```
  **상황/시점**: [When this occurred - topic, sequence in meeting]
  
  **고객사 발언**: "[Client's exact statement or paraphrase]"
  
  **리트머스 응답**: "[What 리트머스 team said]"
  
  **문제점**: [Why this was problematic - specific aspect]
  
  **개선 제안**: "[What 리트머스 should have said instead]"
  
  **이유**: [Why the suggested response would be better]
  ```

### 4. Strengths Section (Keep Brief)
- Only include simple, straightforward positive aspects
- Keep it minimal - just a few bullet points
- Focus on basic things that went well, not detailed analysis

### 5. Focus Areas for Analysis
- **Client statements that weren't fully addressed**: What did client say that 리트머스 didn't respond to adequately?
- **Missed clarification opportunities**: When should 리트머스 have asked follow-up questions?
- **Response quality**: Were 리트머스 responses appropriate for what the client said?
- **Better wording suggestions**: For each problematic exchange, provide specific alternative wording

---

## Feedback File Structure

```
# Sales Feedback - [Meeting Date] Meeting

## Meeting Overview
- Client: [Client Name]
- Date: [MM.DD]
- Participants: [List of participants]
- Meeting Type: [Consultation / Estimation / Follow-up]

## Speaker Identification
- 리트머스 Team: [List of speakers and their roles]
- Client Team: [List of speakers and their roles]

## Strengths (간단히)
- [단순하고 간단한 긍정적 측면만 몇 가지 bullet로 정리]

## 개선이 필요한 대화 분석

### [주제/카테고리 1]

**상황/시점**: [대화가 발생한 맥락 - 주제, 회의 진행 순서]

**고객사 발언**: "[고객사가 한 정확한 발언 또는 요약]"

**리트머스 응답**: "[리트머스 팀이 한 정확한 발언 또는 요약]"

**문제점**: [이 대화가 왜 문제인지 - 구체적 측면]

**개선 제안**: "[이런 경우에는 이렇게 말했으면 좋았을 것 같다]"

**이유**: [제안한 응답이 왜 더 나은지]

---

### [주제/카테고리 2]

**상황/시점**: [대화가 발생한 맥락]

**고객사 발언**: "[고객사 발언]"

**리트머스 응답**: "[리트머스 응답]"

**문제점**: [문제점]

**개선 제안**: "[개선된 응답 제안]"

**이유**: [이유]

---

[필요한 만큼 반복]

## 종합 개선 권장사항

### 즉시 적용 가능한 개선사항
- [구체적이고 실행 가능한 액션 아이템]

### 향후 프로세스 개선
- [장기적 개선 방향]
```

---

## Analysis Focus Areas

### High Priority (구체적 예시와 함께):
1. **고객사 발언에 대한 부적절한 응답**: 
   - 고객사가 무엇을 말했는지 정확히 파악
   - 리트머스가 어떻게 응답했는지 기록
   - 왜 그 응답이 부적절했는지 분석
   - 더 나은 응답 제안 작성

2. **명확화 기회를 놓친 경우**:
   - 고객사가 불명확하게 말한 부분
   - 리트머스가 추가 질문을 해야 했지만 하지 않은 경우
   - 구체적 시점과 맥락 기록

3. **고객사 우려사항 미해결**:
   - 고객사가 표현한 우려
   - 리트머스의 응답이 우려를 해소하지 못한 경우
   - 더 나은 응답 제안

### Medium Priority:
1. **기술적 설명의 적절성**: 고객사 수준에 맞게 설명했는지
2. **일정 논의의 명확성**: 일정이 현실적이고 잘 전달되었는지
3. **가격 논의 방식**: 가격이 명확하고 투명하게 논의되었는지

### Format Requirements:
- **모든 피드백 포인트는 반드시 다음을 포함해야 함:**
  - 정확한 시점/맥락 (언제, 어떤 주제에서)
  - 고객사 발언 (인용 또는 요약)
  - 리트머스 응답 (인용 또는 요약)
  - 문제점 분석
  - 구체적인 개선 제안 ("이렇게 말했으면 좋았을 것 같다")
  - 개선 제안의 이유

---

**Example:**
```
Process meeting script feedback for client 세빛넥스 with meeting date 11.06
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. **Check for `note.md`** in `meeting_scripts/11.06/` folder (if exists, read for additional context)
3. Read existing file: `meeting_scripts/11.06/script.md`
4. Analyze meeting script to identify 리트머스 sales team improvement areas (consider note.md if available)
5. Create `feedback.md` file with recommendations

**Important Notes:**
- **구체적 예시 필수**: 모든 피드백은 정확한 시점, 고객사 발언, 리트머스 응답을 포함해야 함
- **실제 발언 기반**: 스크립트에서 실제로 나온 발언을 인용하거나 정확히 요약해야 함
- **개선 제안 형식**: "이런 경우에는 이렇게 말했으면 좋았을 것 같다" 형식으로 구체적 대안 제시
- **장점은 간단히**: Strengths 섹션은 단순하고 간단한 내용만 몇 가지 bullet로 정리
- **고객사 관점 우선**: 고객사가 무엇을 말했고, 우리가 어떻게 응답했는지에 초점
- **구성적 피드백**: 비판보다는 개선 방향과 구체적 대안 제시에 중점

