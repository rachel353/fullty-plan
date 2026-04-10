---
name: about-project
description: |
  프로젝트 개요 문서(guide.md, background.md)를 생성합니다.
  모든 미팅 요약을 분석하여 클라이언트 우선순위, 합의사항, 예산 적정성을 정리합니다.
  Use when: (1) 견적서 생성 프로세스 첫 단계, (2) 프로젝트 맥락 문서 필요 시, (3) guide.md 또는 background.md 생성 요청 시
  Triggers: about project, 프로젝트 개요, guide 생성, background 생성, 견적 가이드
---

# About Project

프로젝트 전반을 이해하고 이후 모든 스킬의 기준이 되는 **내부 가이드**와 **제안서 도입부**를 생성합니다.

## Workflow

### Step 1: Context Setup
1. 클라이언트 폴더 확인 (`sales/YY_MM_CLIENT_NAME/`)
2. 최신 미팅 날짜 `[MM.DD]` 확정
3. `quotes/[MM.DD]/` 폴더 생성 (없으면)

### Step 2: Input Files 수집 (우선순위순)
| Priority | File | Required |
|----------|------|----------|
| 1 | `quotes/[MM.DD]/note.md` | Optional (있으면 최우선) |
| 2 | 모든 `meeting_scripts/[MM.DD]/summary.md` | Required |
| 3 | `meeting_scripts/[latest]/requirements.md` | Required |
| 4 | `project-requirements.md` | Optional |
| 5 | `appendix/**` | Optional (있으면 필수 반영) |
| 6 | `notes.md` | Optional |

### Step 3: guide.md 생성
`quotes/[MM.DD]/guide.md` 파일 생성. See [references/guide_template.md](references/guide_template.md).

**핵심 로직:**
- 견적 적정성 평가: `man_months × ₩6,500,000`
- 협의된 견적 vs 현실적 견적 비교
- 적정성 판단: ✅ 적정 / ⚠️ 부족 / ✅ 여유

### Step 4: background.md 생성
`quotes/[MM.DD]/background.md` 파일 생성. See [references/background_template.md](references/background_template.md).

### Step 5: Validation
- [ ] 모든 미팅 요약 반영됨
- [ ] note.md 피드백 반영됨 (존재 시)
- [ ] appendix 내용 반영됨 (존재 시)
- [ ] 견적 적정성 평가 완료
- [ ] 두 파일 모두 생성됨

## Output Files
- `quotes/[MM.DD]/guide.md` - 내부용 견적 가이드 (7 sections)
- `quotes/[MM.DD]/background.md` - 제안서 도입부 (6 sections)

## Global Rules
- 정보 부족 시: `(가정)` 또는 `(확인 필요)` 명시
- 분석 중 추가된 항목: `(추가됨)` 명시
- 파일명 및 디렉토리 구조는 절대 변경하지 않음
