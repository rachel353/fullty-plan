# Process Meeting Script Feedback

## Overview
미팅 스크립트를 분석하여 리트머스 영업팀의 개선 영역을 식별합니다. 구체적인 예시와 시점을 포함하여 피드백을 생성합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `meeting_scripts/[MM.DD]/note.md` 확인 (존재 시 추가 컨텍스트용)
3. `appendix/*.md` 파일 읽기 (선택)
4. `meeting_scripts/[MM.DD]/script.md` 파일 확인
5. 스크립트 내용 읽기 (note.md, appendix 파일 참고)
6. 발언자 식별:
   - 리트머스 팀 멤버
   - 클라이언트 대표
7. 미팅 분석:
   - 구체적인 교환 내용 추출 (정확한 시점/맥락 포함)
   - 커뮤니케이션 이슈 식별
   - 놓친 기회 식별
   - 개선 제안 작성
8. `meeting_scripts/[MM.DD]/feedback.md` 생성:
   - 정확한 예시와 시점 포함
   - 고객사 발언 → 리트머스 응답 → 문제점 → 개선 제안 형식
   - 간단한 장점 섹션
9. `git status` 확인 → `git add` → `git commit`

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
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
(필요한 만큼 반복)

## 종합 개선 권장사항

### 즉시 적용 가능한 개선사항
- [구체적이고 실행 가능한 액션 아이템]

### 향후 프로세스 개선
- [장기적 개선 방향]
```

**중요 사항:**
- 모든 피드백은 구체적 예시와 시점을 포함해야 함
- 고객사 발언 → 리트머스 응답 → 문제점 → 개선 제안 형식 사용
- 실제 발언 기반으로 작성 (인용 또는 정확한 요약)
- 장점은 간단히만 (단순 bullet 몇 가지)

## Checklist
- [ ] script.md 파일이 존재하는가?
- [ ] 발언자가 식별되었는가?
- [ ] 모든 피드백에 구체적 예시와 시점이 포함되었는가?
- [ ] 고객사 발언 → 리트머스 응답 → 문제점 → 개선 제안 형식이 사용되었는가?
- [ ] feedback.md가 올바른 구조로 생성되었는가?
- [ ] 커밋까지 완료했는가?
