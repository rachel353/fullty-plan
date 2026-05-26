---
name: design
description: |
  프로젝트 DESIGN.md를 생성합니다. IA 구조와 요구사항을 기반으로 UI/UX 설계 원칙을 정의합니다.
  Use when: (1) ia-structure 완료 후, (2) UI/UX 가이드라인 필요 시, (3) 디자인 원칙 문서화 필요 시
  Triggers: design, DESIGN.md, UI/UX 설계, 디자인 가이드, 디자인 원칙
  Dependencies: about-project, ia-structure
---

# Design

UI/UX 설계 기준 및 디자인 원칙을 문서화합니다.

## Workflow

### Step 1: Input Files 확인
| File | Required |
|------|----------|
| `quotes/[MM.DD]/guide.md` | Required |
| `quotes/[MM.DD]/ia_structure.md` | Required |
| `project-requirements.md` (UI/UX requirements) | Optional |

### Step 2: UI/UX Requirements 추출
`project-requirements.md`에서 UI/UX 관련 요구사항 식별 (REQ-13x 패턴).

### Step 3: DESIGN.md 생성
`quotes/[MM.DD]/DESIGN.md` 파일 생성. See [references/design_template.md](references/design_template.md).

**필수 포함 내용:**
- Design Requirements
- Typography Hierarchy
- Design Intent
- Design Notes

### Step 4: Validation
- [ ] guide.md 참조됨
- [ ] ia_structure.md 참조됨
- [ ] 필수 디자인 원칙 포함됨
- [ ] DESIGN.md 생성됨

## Output File
- `quotes/[MM.DD]/DESIGN.md`

## Global Rules
- 정보 부족 시: `(가정)` 또는 `(확인 필요)` 명시
- 파일명 및 디렉토리 구조는 절대 변경하지 않음
