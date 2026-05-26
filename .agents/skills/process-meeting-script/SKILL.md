---
name: process-meeting-script
description: |
  미팅 스크립트를 처리하여 summary.md, requirements.md, sales-feedback.md, project-requirements.json을 생성합니다.
  Use when: (1) 새 미팅 스크립트 저장 후, (2) 미팅 내용 수정 후, (3) 스크립트 재분석 필요 시, (4) "미팅 스크립트 처리", "미팅 정리", "회의록 분석" 요청 시
  Triggers: 미팅 스크립트 처리, process meeting, 회의록 분석, 미팅 정리, 요약 생성
---

# Process Meeting Script

미팅 스크립트에서 요약, 요구사항, 피드백, 프로젝트 요구사항 JSON 4개 산출물을 생성한다.

## Inputs Required

- Client folder: `YY_MM_CLIENT_NAME/`
- Meeting date: `MM.DD`
- Script location: `meeting_scripts/[MM.DD]/script.md`

## Workflow

### Step 1: Context Setup
1. 클라이언트 폴더 탐색 (`YY_MM_CLIENT_NAME/`)
2. `meeting_scripts/[MM.DD]/note.md` 확인 (존재 시 최우선)
3. 이전 미팅 폴더 로드 (summary.md, requirements.md)
4. `appendix/*.md` 파일 확인 (선택)

> 파일 우선순위: [file_priority.md](references/file_priority.md)

### Step 2: Generate summary.md
- script.md에서 최종 합의된 내용만 추출
- note.md 내용이 script.md를 override
- 6개 섹션 구조로 작성

> 템플릿: [summary_template.md](references/summary_template.md)

### Step 3: Generate requirements.md
- summary.md 섹션 1-4에서 요구사항 추출
- 미팅 순서 기반 REQ ID 할당 (REQ-XYY)
- 카테고리별 그룹화

> 템플릿: [requirements_template.md](references/requirements_template.md)
> REQ ID 규칙: [req_id_scheme.md](references/req_id_scheme.md)

### Step 4: Generate feedback.md
- 발언자 식별 (리트머스 vs 클라이언트)
- 개선 필요 대화 분석
- 고객 발언 → 리트머스 응답 → 문제점 → 개선 제안 형식

> 템플릿: [feedback_template.md](references/feedback_template.md)

### Step 5: Update project-requirements.json
- `sales/[프로젝트폴더]/project-requirements.json` 확인
- 파일 없음: 새로 생성 (version 1.0.0)
- 파일 있음: 기존 데이터와 비교 후 업데이트 (minor version 증가)
- requirements.md의 각 REQ를 JSON 구조로 변환
- 미확정 항목도 REQ ID 부여 + status: UNCONFIRMED
- 상태 변경 이력(changeLog) 기록

> 가이드: [project_requirements_guide.md](references/project_requirements_guide.md)

### Step 6: Git Commit
```bash
git add meeting_scripts/[MM.DD]/*.md ../project-requirements.json
git commit -m "Process meeting script [MM.DD]: summary, requirements, feedback, project-requirements.json"
```

## Outputs

- `meeting_scripts/[MM.DD]/summary.md`
- `meeting_scripts/[MM.DD]/requirements.md` (REQ IDs 포함)
- `meeting_scripts/[MM.DD]/sales-feedback.md`
- `../project-requirements.json` (프로젝트 루트)

## Next Steps

견적서 생성 필요 여부 판단:

**견적서 필요 조건** (하나라도 해당 시):
- summary.md Section 2에 견적 범위, 예산, 결제 방식 언급
- Section 5에 "견적서", "상세 기능 명세" 등 언급
- 새로운/변경된 요구사항이 가격에 영향
- 첫 미팅 (이전 견적 없음)

→ 해당 시: `generate-quote-proposal` 스킬 사용 권장

## Checklist

- [ ] script.md 파일 존재 확인
- [ ] note.md 읽기 (존재 시)
- [ ] 이전 미팅 컨텍스트 확인
- [ ] summary.md 생성 완료
- [ ] requirements.md에 REQ ID 할당 완료
- [ ] sales-feedback.md 생성 완료
- [ ] project-requirements.json 업데이트 완료
- [ ] git commit 완료
