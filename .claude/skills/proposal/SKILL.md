---
name: proposal
description: |
  기존 산출물을 조합하여 클라이언트 제출용 최종 제안서(proposal.md)를 생성합니다.
  프로젝트 배경, IA, 유저 정보, 견적을 통합합니다.
  Use when: (1) 견적서 완료 후, (2) 클라이언트 제출용 제안서 필요 시, (3) 제안서 생성 요청 시
  Triggers: proposal, 제안서, 제안서 생성
  Dependencies: about-project, ia-structure, quotes
---

# Proposal

기존 산출물을 조합하여 클라이언트 제출용 최종 제안서를 생성합니다.

## Workflow

### Step 1: Input Files 확인
| File | Required |
|------|----------|
| `quotes/[MM.DD]/background.md` | Required |
| `quotes/[MM.DD]/ia_structure.md` | Required |
| `quotes/[MM.DD]/user_stories_data.json` (actors) | Required |
| `quotes/[MM.DD]/quotes.md` | Required |
| `appendix/company_intro.md` | Optional |
| `quotes/[MM.DD]/note.md` | Optional (최우선) |

### Step 2: Content Assembly
각 산출물에서 필요한 섹션 추출:
- `background.md` → 프로젝트 배경 정보
- `ia_structure.md` → 화면 구조도
- `user_stories_data.json` → 유저 종류 및 권한
- `quotes.md` → 견적서 섹션

### Step 3: proposal.md 생성
`quotes/[MM.DD]/proposal.md` 생성. See [references/proposal_template.md](references/proposal_template.md).
**CRITICAL: 템플릿 구조를 절대 변경하지 않는다. proposal_template.md의 섹션을 정확히 따라야 하며, 섹션 추가/삭제/이름 변경은 금지된다. 템플릿에 없는 내용을 추가하려면 반드시 사용자에게 먼저 확인을 받아야 한다.**

**Output Sections:**
- 6) 화면 구조도(IA)
- 7) 서비스 유저 (유저 종류 테이블만, 유저별 권한은 quotes.md에서 관리)
- 8) 견적서

### Step 4: Validation
- [ ] 모든 필수 input 파일 확인됨
- [ ] note.md 피드백 반영됨 (존재 시)
- [ ] 모든 섹션 포함됨
- [ ] proposal.md 생성됨

## Output File
- `quotes/[MM.DD]/proposal.md` - 클라이언트 제출용 제안서

## Global Rules
- 정보 부족 시: `(가정)` 또는 `(확인 필요)` 명시
- 파일명 및 디렉토리 구조는 절대 변경하지 않음
