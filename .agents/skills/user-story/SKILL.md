---
name: user-story
description: Transform raw requirements into structured User Stories with measurable Acceptance Criteria. Use when you need to analyze requirements documents (quotes/, meeting_scripts/, appendix/) and generate user_stories_data.json and docs/user_stories.md. This skill helps define Actors, assign priorities (P1/P2/P3), validate AC measurability, and identify ambiguities requiring human clarification.
---

# User Story Generation

## Context Detection

Check current working directory to determine output path:

| Context | Detection | Output Path |
|---------|-----------|-------------|
| **Sales/Quote** | Path contains `sales/` | `quotes/[MM.DD]/user_stories_data.json`, `quotes/[MM.DD]/user_stories.md` |
| **FE Development** | Default | `docs/user_stories_data.json`, `docs/user_stories.md` |

**Sales Context Input Sources:**
- `meeting_scripts/[MM.DD]/summary.md`
- `meeting_scripts/[MM.DD]/requirements.md`
- `appendix/**`
- `quotes/[MM.DD]/note.md` (최우선)
- `quotes/[MM.DD]/guide.md`

## Overview

This skill transforms raw requirements into structured User Stories following the format:
```
As a [Actor], I want to [action] so that [benefit]
```

Each User Story includes measurable Acceptance Criteria (AC), priority level (P1/P2/P3), and clear Actor definitions.

## Workflow

```
1. Read requirements (quotes/, meeting_scripts/, appendix/)
   ↓
2. Extract and define Actors
   ↓
3. Identify User Stories per Actor
   ↓
4. Write measurable Acceptance Criteria
   ↓
5. Assign priorities (P1/P2/P3)
   ↓
6. Validate AC measurability
   ↓
7. Flag ambiguities for human input
   ↓
8. Generate outputs (user_stories_data.json, docs/user_stories.md)
```

## Step 1: Read Requirements

Read all available requirement sources in priority order:

1. **note.md** (if exists - HIGHEST priority, overrides all)
2. **appendix/requirements.md** (if exists - REQUIRED reading)
3. **meeting_scripts/*/summary.md** (confirmed agreements only)
4. **quotes/*/guide.md** (synthesized from all meetings)
5. **quotes/*/specification_and_quote.md**

### Source Priority Rule

If conflicting information exists, follow this priority:
```
note.md > appendix/requirements.md > latest summary.md > guide.md > specification_and_quote.md
```

## Step 2: Extract and Define Actors

Identify all actors (roles) mentioned in requirements.

### Actor Definition Format

For each actor:
```json
{
  "name": "Actor name",
  "description": "1-sentence role description",
  "permissions": ["permission 1", "permission 2"],
  "goals": ["goal 1", "goal 2"]
}
```

### Reference

See `references/actor_patterns.md` for common actor patterns by domain (Admin, B2C, B2B, Marketplace).

### Common Pitfalls

- ❌ Using person names ("김철수") instead of roles
- ❌ Vague actors ("사용자") without scope
- ✅ Use specific roles ("운영 관리자", "조회 전용 사용자")

## Step 3: Identify User Stories

Extract User Stories from requirements using this pattern:

```
As a [Actor],
I want to [action],
So that [benefit/goal]
```

### Examples

**Good:**
- "As a 운영 관리자, I want to 근로자 정보를 등록하다, So that 계약 관리를 시작할 수 있다"
- "As a 조회자, I want to 월별 리포트를 다운로드하다, So that 경영진에게 보고할 수 있다"

**Bad:**
- "근로자 관리 기능" (no actor, no benefit)
- "시스템이 데이터를 저장한다" (system is not an actor)

### Grouping

Group User Stories by:
1. Actor (primary)
2. Feature domain (secondary)

## Step 4: Write Measurable Acceptance Criteria

For each User Story, define 2-5 Acceptance Criteria (AC) that are **measurable** and **testable**.

### AC Format

```
AC-[number]: [Specific, measurable condition]
```

### Measurability Checklist

An AC is measurable if you can answer "yes" to all:

- [ ] Contains specific numbers, text, or behavior
- [ ] Can write a test case with clear pass/fail
- [ ] Observable (can see/measure the result)
- [ ] No subjectives ("좋은", "빠른", "효율적인")

### Reference

See `references/ac_validation_guide.md` for detailed examples of measurable vs. non-measurable ACs.

### Examples

**✅ Measurable:**
- "로그인 성공 시 3초 이내에 대시보드로 이동"
- "이메일 형식이 아닐 경우 '유효한 이메일을 입력하세요' 에러 표시"
- "페이지당 20개 항목 표시, 페이지네이션 제공"

**❌ Not Measurable:**
- "사용자 경험 향상" → How to measure?
- "빠르게 응답" → How fast is "fast"?
- "직관적인 UI" → What's the objective test?

### When ACs Are Vague

If requirements contain vague ACs:

1. **Mark for human clarification**:
   ```json
   {
     "ambiguity": "빠르게 응답",
     "question": "구체적인 응답 시간 목표는? (예: 3초 이내, 500ms 이내)",
     "impact": "성능 요구사항 정의 필요"
   }
   ```

2. **Suggest measurable alternatives**:
   - "빠르게" → "3초 이내"
   - "많은 데이터" → "10,000건까지"
   - "안정적" → "99.9% uptime"

## Step 5: Assign Priorities

Assign each User Story a priority:

| Priority | Label | Meaning |
|----------|-------|---------|
| **P1** | Must Have | MVP 필수, 시스템 작동 불가 시 |
| **P2** | Should Have | 중요하지만 MVP 이후 가능 |
| **P3** | Nice to Have | 편의 기능, 추후 개선 |

### Decision Framework

Use this decision tree:

```
Can the system function without this?
├─ No → P1
└─ Yes
   └─ Does it significantly disrupt workflow?
      ├─ Yes → P2
      └─ No → P3
```

### Reference

See `references/priority_framework.md` for domain-specific priority patterns and detailed decision framework.

### Priority Distribution Rule

- P1 should be < 30% of total stories
- If everything is P1, force ranking needed
- P1 stories should form a minimal working system

## Step 6: Validate AC Measurability

Run validation on all ACs:

1. Check for subjective words:
   - "좋은", "나쁜", "효율적", "빠른", "직관적", "안정적"

2. Check for missing metrics:
   - Time without numbers ("빨리" vs "3초 이내")
   - Quantity without numbers ("많이" vs "1000개까지")

3. For each failed AC:
   - Flag for human clarification
   - Suggest measurable alternative

## Step 7: Flag Ambiguities for Human Input

Collect all ambiguities found:

```json
{
  "ambiguities": [
    {
      "id": "q1",
      "type": "vague_ac",
      "original": "효율적으로 처리",
      "question": "구체적인 처리 시간 목표는?",
      "suggestions": ["10초 이내", "100건/초", "실시간 (1초 이내)"],
      "context": "US-101 AC-2",
      "impact": "성능 요구사항 불명확, 개발 범위 산정 어려움"
    },
    {
      "id": "q2",
      "type": "unclear_actor",
      "original": "관리자",
      "question": "어떤 관리자? (시스템 관리자 vs 운영 관리자)",
      "context": "US-105",
      "impact": "권한 설계 불가"
    }
  ]
}
```

### When to Ask for Human Input

- Vague ACs with no objective metric
- Unclear actor roles/permissions
- Conflicting requirements
- Missing critical information (e.g., data limits, performance targets)

## Step 8: Generate Outputs

### Output 1: user_stories_data.json

Generate structured JSON following this schema:

```json
{
  "actors": [
    {
      "id": "actor-1",
      "name": "운영 관리자",
      "description": "일상적인 사업 운영 데이터를 관리하는 담당자",
      "permissions": ["근로자 CRUD", "계약 CRUD"],
      "goals": ["근로자 정보 관리", "계약 관리"]
    }
  ],
  "user_stories": [
    {
      "id": "US-101",
      "actor_id": "actor-1",
      "story": "As a 운영 관리자, I want to 근로자 정보를 등록하다, So that 계약 관리를 시작할 수 있다",
      "priority": "P1",
      "acceptance_criteria": [
        "AC-1: 필수 항목(이름, 주민번호, 연락처) 입력 시 등록 버튼 활성화",
        "AC-2: 중복 주민번호 입력 시 '이미 등록된 근로자입니다' 에러 표시",
        "AC-3: 등록 완료 시 3초 이내에 근로자 목록 페이지로 이동"
      ],
      "domain": "근로자 관리"
    }
  ],
  "priority_levels": {
    "P1": "Must Have - MVP 필수",
    "P2": "Should Have - MVP 이후 가능",
    "P3": "Nice to Have - 편의 기능"
  }
}
```

### Output 2: docs/user_stories.md

Generate markdown documentation using the script:

```bash
python scripts/generate_user_stories.py \
  --data docs/user_stories_data.json \
  --output docs/user_stories.md
```

The script reads the JSON and generates formatted markdown with:
- Actor definitions
- User Stories grouped by priority
- Acceptance Criteria
- Ambiguities section (if any)

### Script Usage

The `scripts/generate_user_stories.py` script accepts:

- `--data`: Path to user_stories_data.json (optional, will prompt if not provided)
- `--output`: Path to output markdown file (default: docs/user_stories.md)

## Common Patterns

### Pattern 1: Admin CRUD Workflow

Most admin systems follow this pattern:

```
P1: List/Read (조회)
P1: Create (등록)
P1: Update (수정)
P1: Delete (삭제)
P2: Search/Filter (검색)
P2: Bulk operations (대량 작업)
P3: Export (엑셀 다운로드)
```

### Pattern 2: Approval Workflow

For workflows with approval steps:

```
P1: Submit request (신청)
P1: Approve/Reject (승인/반려)
P1: View status (상태 조회)
P2: Bulk approve (일괄 승인)
P2: Approval delegation (승인 위임)
P3: Approval reminders (승인 알림)
```

### Pattern 3: Multi-Role System

When multiple actors interact:

```
Actor A (신청자):
  P1: Submit → P1: Check status

Actor B (승인자):
  P1: Review → P1: Approve/Reject

Actor C (관리자):
  P1: Monitor all → P2: Generate reports
```

## Validation Checklist

Before finalizing User Stories:

- [ ] All actors have clear descriptions and permissions
- [ ] Every User Story follows "As a [Actor], I want [action], So that [goal]"
- [ ] All ACs are measurable (no subjectives)
- [ ] P1 stories < 30% of total
- [ ] P1 stories form a minimal working system
- [ ] Ambiguities are flagged with specific questions
- [ ] user_stories_data.json follows schema
- [ ] docs/user_stories.md generated successfully

## Resources

### scripts/
- `generate_user_stories.py` - Generates docs/user_stories.md from JSON data

### references/
- `ac_validation_guide.md` - Measurable AC examples and validation rules
- `priority_framework.md` - Priority decision framework by domain
- `actor_patterns.md` - Common actor patterns (Admin, B2C, B2B)

