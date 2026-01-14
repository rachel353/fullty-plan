# Generate Company README

## Overview
클라이언트 폴더의 README.md 파일을 생성하거나 갱신합니다. 최신 견적서와 미팅 요약을 기반으로 프로젝트 목적과 핵심 내용을 요약합니다.

## Steps
1. 클라이언트 이름 `[CLIENT_NAME]`으로 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/` 형식)
2. 최신 견적서 파일 확인: `quotes/[MM.DD]/background.md` 또는 `quotes/[MM.DD]/guide.md`
3. 모든 미팅 요약 읽기: `meeting_scripts/[MM.DD]/summary.md` (최신순)
4. 최신 요구사항 읽기: `meeting_scripts/[latest]/requirements.md`
5. README.md 생성/갱신:
   - 프로젝트 목적 및 배경 (2-3문장)
   - 최신 범위 스냅샷 (REQ IDs 포함)
   - 미팅 노트 요약 (날짜별)
   - 다음 액션 및 리스크
   - 참조 파일 목록
6. `git status` 확인 → `git add` → `git commit`

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
# [Client Name] Project README
_Last updated: YYYY-MM-DD_

## Project Purpose & Background
- 2–3 sentences summarizing why the project exists and the problem it solves.

## Scope Snapshot (Latest)
- REQ-XXX: [Requirement headline + 1-line impact]
- ...

## Meeting Notes Digest
### [MM.DD] Meeting
- Key decision/outcome 1
- Key decision/outcome 2
- Budget/timeline callout (if any)

### [Earlier MM.DD] Meeting
- ...

## Next Actions & Risks
- Action/Risk description — owner, due date (when available)

## Reference Files
- `meeting_scripts/[MM.DD]/summary.md` (latest)
- `quotes/[MM.DD]/background.md`
- Any appendix or quote docs you relied on
```

**중요 사항:**
- Keep bullets short (max ~20 words) and action-oriented.
- Preserve terminology from source docs (REQ IDs, section names) for traceability.
- Order meetings from newest to oldest so the reader can see the latest context first.

## Checklist
- [ ] 클라이언트 폴더를 찾았는가?
- [ ] 최신 견적서와 미팅 요약을 읽었는가?
- [ ] README.md가 올바른 구조로 생성되었는가?
- [ ] 커밋까지 완료했는가?
