# Process Meeting Script Requirements

## Overview
summary.md에서 요구사항을 추출하고 각 요구사항에 고유한 REQ ID를 할당합니다. 미팅 순서 번호를 기반으로 REQ ID를 생성합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. 모든 미팅 폴더 확인하여 미팅 순서 번호 결정
3. `meeting_scripts/[MM.DD]/note.md` 확인 (존재 시 최우선)
4. `appendix/*.md` 파일 읽기 (선택)
5. `meeting_scripts/[MM.DD]/summary.md` 파일 확인 (필수)
6. `meeting_scripts/[MM.DD]/script.md` 파일 참고 (선택, 명확화용)
7. summary.md 섹션 1-4에서 요구사항 추출:
   - 섹션 1: Scope (확정된 개발 범위)
   - 섹션 2: Budget & Model (금액 및 계약 방식)
   - 섹션 3: Timeline (일정)
   - 섹션 4: Responsibilities (역할/책임자)
8. note.md 우선 적용 (존재 시)
9. 요구사항을 카테고리별로 그룹화
10. 미팅 순서 번호 기반으로 REQ ID 할당:
    - 첫 번째 미팅: REQ-1XX
    - 두 번째 미팅: REQ-2XX
    - 세 번째 미팅: REQ-3XX
    - 등등...
11. `meeting_scripts/[MM.DD]/requirements.md` 생성 (기존 파일 덮어쓰기)
12. `git status` 확인 → `git add` → `git commit`

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
# Client Requirements - [Meeting Date]

## 핵심 기능 요구사항

### 1. [카테고리명]

#### [REQ-101] [요구사항 제목] (첫 번째 미팅)
- [요구사항 상세 내용]

#### [REQ-102] [요구사항 제목] (첫 번째 미팅)
- [요구사항 상세 내용]

## 비기능 요구사항

#### [REQ-111] [요구사항 제목] (첫 번째 미팅)
- [요구사항 상세 내용]

## 통합 요구사항

#### [REQ-121] [요구사항 제목] (첫 번째 미팅)
- [요구사항 상세 내용]

## UI/UX 요구사항

#### [REQ-131] [요구사항 제목] (첫 번째 미팅)
- [요구사항 상세 내용]

## 비즈니스 로직 요구사항

#### [REQ-141] [요구사항 제목] (첫 번째 미팅)
- [요구사항 상세 내용]

## 미확정 항목 (Unconfirmed Items)
- [확정되지 않은 항목들]
```

**중요 사항:**
- 각 요구사항은 `[REQ-XXX]` 형식의 고유 ID를 가져야 함
- 미팅 순서 번호에 따라 첫 자리 숫자 결정 (1=첫 번째, 2=두 번째 등)
- 클라이언트가 명시적으로 요청하거나 합의한 내용만 포함
- 확정되지 않은 항목은 별도 섹션에 명시

## Checklist
- [ ] summary.md 파일이 존재하는가?
- [ ] 미팅 순서 번호가 결정되었는가?
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] 모든 요구사항에 REQ ID가 할당되었는가?
- [ ] REQ ID 형식이 올바른가? (REQ-XXX)
- [ ] requirements.md가 올바른 구조로 생성되었는가?
- [ ] 커밋까지 완료했는가?
