---
name: quotes
description: |
  화면 및 기능 단위로 견적서(quotes.md)를 산정합니다.
  IA 구조 기반으로 화면별 기능 및 가격을 산정하고, 모든 REQ ID를 추적합니다.
  Use when: (1) ia-structure, user-story 완료 후, (2) 견적 산정 필요 시, (3) specification 생성 요청 시
  Triggers: quotes, 견적서, 견적 생성, specification, 가격 산정
  Dependencies: about-project, user-story, ia-structure
---

# Quotes

화면(Screen) 단위로 기능별 견적서(Quote)를 생성합니다.

## 목표

- 화면(Screen) 단위로 기능별 견적서 MD를 생성
- REQ 단위로 견적 산정
- User Story의 Acceptance Criteria 충족 여부 검증

## Workflow

### Step 1: Input Files 확인

| 소스 | 필수 | 추출 정보 |
|------|------|----------|
| `quotes/[MM.DD]/ia_structure.md` | Required | Screen Hierarchy의 Route, Purpose, Access |
| `quotes/[MM.DD]/user_story.md` 또는 `user_stories.json` | Required | 해당 Screen에 연결된 US ID, 액션 문장 |
| `project-requirements.json` 또는 `meeting_scripts/*/requirements.md` | Required | REQ ID, 제목, 설명 |
| `quotes/[MM.DD]/guide.md` | Required | 예산 기준선 |
| `quotes/[MM.DD]/note.md` | Optional | 최우선 참고 (특이사항) |

### Step 2: Screen 목록 추출

`ia_structure.md`의 Screen Hierarchy에서 모든 Screen 추출:
- Screen Name
- Route
- Purpose
- Access (접근 권한)

**주의**: ia-structure.md에 없는 Screen은 생성하지 않는다.

### Step 3: Screen별 매핑

각 Screen에 대해:
1. **User Stories 매핑**: 해당 Screen에 연결된 US ID와 액션 문장 수집
2. **Requirements 매핑**: 해당 Screen에 연결된 REQ ID, 제목, 설명 수집

### Step 4: (추가됨) 항목 판별

User Story의 Acceptance Criteria를 충족하는데 REQ가 부족하다고 판단되면:
1. REQ를 임시로 추가
2. 제목에 `(추가됨)` 표기
3. 비고에 `추가됨 / 확인 필요` 표기

**주의**: project-requirements에 없는 기능은 반드시 `(추가됨)`으로만 생성

### Step 5: 견적 산정

각 REQ에 대해:
1. 중요도 배정 (1=필수, 2=중요, 3=선택)
2. 가격 산정 (VAT 미포함/포함)
3. 비고 작성

### Step 6: quotes.md 생성

`quotes/[MM.DD]/quotes.md` 생성. See [references/spec_template.md](references/spec_template.md).

**Output 구조:**
1. Meta (프로젝트명, 버전, 작성일)
2. 견적 산정 기준
3. 유저별 권한 (Screen/Feature별 Actor 접근 권한 테이블)
4. 화면별 기능 및 견적 (Screen 반복)
   - Screen 제목 (Route 포함)
   - 목적 / 접근 권한
   - 유저 액션 (US ID, 액션)
   - 기능 목록 및 견적 테이블
   - (추가됨) 항목 안내
5. 견적 요약 (필수/권장/옵션)
6. 확인 요청 사항

### Step 7: Validation

- [ ] ia-structure.md의 모든 Screen 포함됨
- [ ] 모든 REQ ID가 견적에 포함됨
- [ ] (추가됨) 항목이 명확히 분리됨
- [ ] 가격이 올바르게 계산됨 (VAT 별도/포함)
- [ ] 견적 요약 합계 정확함

## Pricing Rules

**내부 계산 (비공개):**
- 단가: ₩6,500,000/MM (맨먼스)
- 계산: `필요 맨먼스 × ₩6,500,000`

**클라이언트 문서:**
- 최종 금액만 표시 (만원 단위)
- VAT 별도/포함 모두 표기
- MM 수 및 단가 비공개

## 중요도 기준

| 중요도 | 기준 | 예시 |
|--------|------|------|
| 1 (필수) | 핵심 기능, 없으면 서비스 불가 | 로그인, 메인 콘텐츠 표시 |
| 2 (중요) | 사용성 향상, UX 개선 | 검색 필터, 정렬 기능 |
| 3 (선택) | 부가 기능, 추후 추가 가능 | 공유 기능, 추천 알고리즘 |

## (추가됨) 항목 처리

1. `(추가됨)` 태그는 기능명 뒤에 붙인다
2. 견적 테이블 비고란에 `추가됨 / 확인 필요` 표기
3. 별도 섹션에서 해당 항목과 연결된 US ID 명시
4. 견적 요약에서 "옵션 견적"으로 분리 표시

## Scripts

### merge_quote_files.py
```bash
python3 scripts/merge_quote_files.py "[CLIENT_FOLDER]" "[MM.DD]"
```
background, ia_structure, specification 파일을 통합 문서로 병합.

### extract_requirements.py
```bash
python3 scripts/extract_requirements.py "[CLIENT_FOLDER]" "[MM.DD]"
```
Combined quote에서 REQ ID를 추출하고 원본 요구사항 내용 추가.

## Output Files

- `quotes/[MM.DD]/quotes.md` - 화면별 기능 및 견적

## Global Rules

- 정보 부족 시: `(가정)` 또는 `(확인 필요)` 명시
- 분석 중 추가된 기능: `(추가됨)` 명시 및 확인 요청
- 원본 문서의 문구는 최대한 유지
- 추측이나 과도한 기획 확장 금지
- 파일명 및 디렉토리 구조는 절대 변경하지 않음
