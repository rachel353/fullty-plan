## Generate Quote Background

```
Generate quote background for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Generate the background information file for the quote document. This includes project overview, service background, goals, scope, and technical considerations.

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `quotes/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over all other sources when there are conflicts
   - Use `note.md` as the primary source for corrections, clarifications, or additional context
3. Read the following files:
   - `quotes/[MM.DD]/guide.md` (required, created in first step)
   - `meeting_scripts/[MM.DD]/requirements.md` (required)
   - `meeting_scripts/[MM.DD]/summary.md` (required)
   - `meeting_scripts/[MM.DD]/script.md` (optional, for additional context)
   - `quotes/*.md` files (previous quotes for reference)
   - `appendix/requirements.md` (**REQUIRED if exists** - must be read and reflected)
   - `appendix/*.md` files (optional, for additional reference materials)
3. Extract and organize:
   - Project overview and core value proposition
   - Service background and business pain points
   - Project goals (quantitative and qualitative)
   - Development scope and deliverables
   - Technical and planning considerations
4. Create `background.md` file in `quotes/[MM.DD]/` folder

**IMPORTANT:**
- **`note.md` takes priority**: If `note.md` exists in `quotes/[MM.DD]/` folder, it must be read first and its content takes precedence over all other sources
- **`appendix/requirements.md` is REQUIRED**: If `appendix/requirements.md` exists, it must be read and reflected (not optional)
- `guide.md` must exist (created in first step) - reference for client priorities
- `requirements.md` and `summary.md` must already exist
- Create folder `quotes/[MM.DD]/` if it doesn't exist
- If `background.md` already exists, it will be overwritten

---

## Output Format

The file must follow this exact structure:

```markdown
## 0) 개편안 정리 핵심

(최종 합의 내용을 바탕으로 기존 요구사항과 IA의 핵심 변경 사항들과 협의사항을 정리하고 개편안에 대한 계획과 주안점을 정리. 특히, 기존의 견적 범위가 협의안을 초과하는 경우 견적 범위에 맞출 수 있는 안을 계획하고 이에 맞추어 제거 요구사항을 정리합니다.)

## 1) 프로젝트 개요

(요구사항 기반 핵심 가치·범위 요약)

## 2) 서비스 배경 및 필요성

(해결하려는 비즈니스 Pain Point, 시장·운영 상의 문제, 도입 필요성)

## 3) 프로젝트 주요 목표

(시스템 구축을 통해 달성해야 하는 비즈니스 성과, 정량·정성 목표)

## 4) 개발 범위 및 결과물

(제공될 기능 범위, 산출물, 인수인계 범위, 운영 단계 포함 여부)

## 5) 유의할 기술적/기획적 포인트

(아키텍처 제약, 외부 연동 리스크, 성능 요구사항, 운영·보안 고려사항)
```

---

## Content Guidelines

### Section 0: 개편안 정리 핵심
- Compare with previous quotes if available
- Identify key changes from previous meetings
- Highlight scope adjustments based on budget constraints
- List excluded requirements if budget is exceeded

### Section 1: 프로젝트 개요
- Extract from summary.md section 1 (Scope)
- Summarize core value proposition
- Highlight key features and capabilities
- Keep it concise and focused

### Section 2: 서비스 배경 및 필요성
- Extract from script.md or summary.md context
- Identify business pain points
- Market and operational problems
- Why this system is needed

### Section 3: 프로젝트 주요 목표
- Extract from summary.md section 3 (Timeline) and section 1 (Scope)
- Quantitative goals (e.g., user count, processing volume)
- Qualitative goals (e.g., efficiency improvement, cost reduction)
- Business outcomes expected

### Section 4: 개발 범위 및 결과물
- Extract from summary.md section 1 (Scope)
- List all deliverables
- Include handover scope
- Mention operational phase if applicable

### Section 5: 유의할 기술적/기획적 포인트
- Extract from requirements.md (non-functional requirements)
- Technical constraints
- External integration risks
- Performance requirements
- Security and operational considerations

---

## Example

```
Generate quote background for client 세빛넥스 with meeting date 12.01
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. Read required files
3. Create `quotes/12.01/background.md`

