## Generate Quote Guide

```
Generate quote guide for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Create a comprehensive guide document that summarizes all previous meetings with the client to identify key priorities, important agreements, and critical considerations. This guide serves as a foundation for all subsequent quote generation work (background, IA structure, specification).

**Context:**
- This guide analyzes all meeting summaries to understand the client's priorities and evolution of requirements
- It identifies what the client values most and what agreements are most critical
- It provides context for making decisions during quote generation
- **This must be created FIRST** before any other quote generation steps

---

## Internal Information (AI Reference Only)

**⚠️ IMPORTANT: This information is for AI reference only. DO NOT include in client-facing documents.**
**Use this knowledge to assess quote feasibility and team composition.**

### Man-Month Pricing Standard
- **Base rate**: ₩6,500,000 per man-month
- **Calculation**: Est. Price = Man-Months × ₩6,500,000
- **Estimation guidelines**:
  - Simple Features: 0.2-0.5 MM (Basic CRUD, simple forms)
  - Medium Features: 0.5-1.0 MM (Complex forms, API integration)
  - Complex Features: 1.0-2.0 MM (Complex business logic, real-time)
  - Very Complex Features: 2.0+ MM (AI/ML, enterprise integrations)

### Team Composition & Timeline
- Determine optimal team size based on requirements, budget, and agreed timeline
- Consider project complexity, parallel work possibilities, and risk buffer

---

## Process

1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `quotes/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over all other sources when there are conflicts
   - Use `note.md` as the primary source for corrections, clarifications, or additional context
3. Locate and read **ALL** meeting summaries in `meeting_scripts/` folder:
   - Read all `meeting_scripts/[MM.DD]/summary.md` files (chronologically from oldest to newest)
   - Read the latest `meeting_scripts/[MM.DD]/requirements.md` file
   - Read the latest `meeting_scripts/[MM.DD]/script.md` (optional, for additional context)
   - Read `appendix/requirements.md` (**REQUIRED if exists** - must be read and reflected)
   - Read `appendix/*.md` files (optional, for additional reference materials)
4. Analyze all summaries using the **Analysis Guidelines** below.
5. Create `guide.md` file in `quotes/[MM.DD]/` folder following the **Output Structure**.

---

## Analysis Guidelines (Chain of Thought)

Follow these steps to analyze the information before generating the output:

### 1. Read & Extract
- Read all `meeting_scripts/[MM.DD]/summary.md` files chronologically
- Extract key information: Scope, Budget (Section 2), Timeline, Agreements
- Read latest `requirements.md` and `appendix/requirements.md` (if exists)

### 2. Identify Client Priorities
- Look for repetition and emphasis indicators ("중요", "필수", "반드시", "우선")
- Note client concerns and business goals

### 3. Track Requirement Evolution
- Compare requirements across meetings
- Identify what was added, removed, or modified

### 4. Extract Critical Agreements
- Budget decisions, timeline decisions, scope decisions
- Technical and process decisions

### 5. Analyze Quote Feasibility (Decision Logic)
**Perform this analysis internally to fill Section 6:**

1.  **Check Agreed Budget**: Extract from summary.md Section 2.
2.  **Calculate Realistic Quote**:
    - Sum up all requirements (MM) × ₩6,500,000.
    - Analyze requirement changes (added/modified).
3.  **Judge Feasibility**:
    - If **Realistic > Agreed**: Quote increase needed. (Status: ⚠️ 부족)
    - If **Realistic ≤ Agreed**: Feasible within budget. (Status: ✅ 적정/여유)
4.  **Determine Strategy**:
    - **Increase Needed**: Propose increase or alternatives (cut scope, phased dev).
    - **Feasible**: Stick to agreed budget or offer lower realistic quote.

---

## Output Structure

The guide must follow this structure:

```markdown
# Quote Generation Guide - [Client Name] - [Meeting Date]

## 1) 고객사 핵심 가치 및 우선순위

(고객사가 여러 미팅에서 반복적으로 강조하거나 중요하게 생각하는 것들)
- [핵심 가치 1]
- [핵심 가치 2]
- [우선순위 1]
- [우선순위 2]

## 2) 중요 합의사항 요약

(모든 미팅을 통틀어 가장 중요한 합의사항들)
- [합의사항 1] - [미팅 날짜]
- [합의사항 2] - [미팅 날짜]
- [합의사항 3] - [미팅 날짜]

## 3) 요구사항 진화 과정

(미팅별로 요구사항이 어떻게 변화했는지)
- [첫 미팅]: [초기 요구사항]
- [두 번째 미팅]: [변경/추가된 요구사항]
- [최신 미팅]: [현재 확정된 요구사항]

## 4) 예산 및 일정 관련 중요 결정사항

(예산과 일정에 대한 고객사의 우선순위와 결정사항)
- [예산 관련 결정]
- [일정 관련 결정]
- [우선순위]

## 5) 기술적/기획적 제약사항 및 고려사항

(고객사가 강조한 기술적 제약이나 기획적 고려사항)
- [제약사항 1]
- [제약사항 2]
- [고려사항 1]

## 6) 견적 적정성 평가 및 범위 조정 제안

- **협의된 견적**: [X]원 (summary.md Section 2)
- **현실적인 견적**: [Y]원 ([X]맨먼스 × ₩6,500,000)
- **요구사항 변화**: 이전 [X]개 → 현재 [Y]개 (신규 추가 [Z]개)
- **적정성 판단**: [✅ 적정 / ⚠️ 부족 / ✅ 여유]
  - 판단 근거: [예: 신규 요구사항으로 인해 협의된 견적 초과]
- **제안 사항**:
  - **견적 전략**: [견적 증가 제안 / 협의된 견적 유지 / 기능 축소 제안]
  - **증가/조정 내역**: [X]원 → [Y]원 (+[Z]원) (필요 시)
  - **대안 (필요 시)**: 기능 축소 또는 단계별 개발 제안

## 7) 프로젝트 팀 구성 및 일정 최적안

(요구사항, 예산, 합의된 일정을 고려한 최적의 팀 구성 및 일정 제안)

### 개발팀 구성
- **프론트엔드 개발자**: [X]명 ([Junior/Mid/Senior], [기술 스택])
- **백엔드 개발자**: [X]명 ([Junior/Mid/Senior], [기술 스택])
- **기획자**: [X]명 ([Mid/Senior])
- **팀 구성 근거**: [요구사항 복잡도, 예산 범위, 합의된 일정]

### 프로젝트 일정
- **총 프로젝트 기간**: [X]개월 (기획: [X]개월, 개발: [X]개월, QA: [X]개월)
- **개발 시작일**: [날짜] (착수: 입금 후 2주 뒤)
- **마일스톤**:
  - 기획/디자인 완료: [날짜] (중도금 시점)
  - 개발 완료: [날짜]
  - 내부 QA 완료: [날짜]
- **일정 최적화 근거**: [합의된 일정 준수, 기획 수정사항 반영 시간, QA 기간, 리스크 버퍼]
```

---

## Important Notes & Constraints

- **`note.md` takes priority**: If `note.md` exists, its content takes precedence over all other sources.
- **`appendix/requirements.md` is REQUIRED**: Must be read and reflected if it exists.
- **Chronological Analysis**: Read ALL meetings from oldest to newest to understand evolution.
- **Client Perspective**: Focus on what the client emphasized and agreed to.
- **Action-Oriented**: The guide must help make decisions during quote generation.

## Key Questions to Answer (Self-Check)

Ensure the generated guide answers these:
1. What does the client value most?
2. What are the most critical agreements?
3. How have requirements evolved?
4. What are the non-negotiables?
5. Is the mentioned budget realistic for all requirements?
6. What should be included or excluded?

## Guide Usage

This guide will be used by:
- **background.md generation**: To understand project context and priorities
- **ia_structure.md generation**: To prioritize features and structure
- **specification_and_quote.md generation**: 
  - To assess quote adequacy first (Section 6)
  - To scope features based on quote adequacy assessment
  - To determine team composition and timeline
  - To calculate pricing using man-months (internal only)
