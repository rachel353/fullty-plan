## Process Meeting Script Requirements

```
Process meeting script requirements for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Determine meeting sequence number** by checking all existing `meeting_scripts/[MM.DD]/` folders and sorting chronologically
3. **Check for `note.md` file** in `meeting_scripts/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over `summary.md` and `script.md` when there are conflicts
   - Use `note.md` for corrections, clarifications, or additional context
4. **Check for `appendix/` folder** and read `appendix/*.md` files (optional, for additional reference materials)
5. Locate existing `meeting_scripts/[MM.DD]/summary.md` file (required)
6. Optionally locate `meeting_scripts/[MM.DD]/script.md` file (for additional context)
7. Read the summary content from `summary.md` (primary source, but note.md takes priority if exists)
8. If needed, reference `script.md`, `note.md`, and `appendix/*.md` files to:
   - Clarify ambiguous items in summary
   - Verify client's exact wording for requirements
   - Understand context for agreed-upon items
   - Find details that may not be fully captured in summary
   - Apply corrections or clarifications from note.md
8. Create `requirements.md` file:
   - Extract and organize requirements from summary sections 1-4
   - **Prioritize note.md content if available** (note.md takes precedence)
   - **Use script.md as supplementary reference when needed**
   - **Focus on client-requested items and explicitly agreed-upon content only**
   - **Assign unique REQ IDs to each requirement based on meeting sequence number**
   - Organize by functional categories

**IMPORTANT:**
- The `summary.md` file must already exist (created by `process_meeting/summary`)
- **`note.md` takes highest priority**: If `note.md` exists, it must be read first and its content takes precedence over `summary.md` and `script.md`
- **`note.md` usage**: Use `note.md` for corrections, clarifications, additional context, or overrides to summary/script content
- **Primary source**: `summary.md` is the primary source for requirements extraction (unless note.md exists)
- **Supplementary source**: `script.md` can be referenced when:
  - Summary is unclear or ambiguous
  - Need to verify client's exact wording
  - Need additional context for understanding requirements
  - Summary may have missed some details
- Requirements are primarily extracted from summary sections 1-4
- **Focus on client requests**: Extract what the client explicitly requested or mentioned
- **Only include agreed-upon items**: Include only items that were explicitly agreed upon between client and development team
- **Exclude uncertain items**: Do NOT include items marked as "검토 중", "향후 결정", "미확정", or similar uncertain status
- **Exclude developer suggestions**: Do NOT include items that were suggested by the development team but not explicitly requested or agreed upon by the client
- **REQ IDs are mandatory**: Every requirement must have a unique REQ ID
- **REQ ID format**: `REQ-XXX` where XXX is a 3-digit number
- **First digit indicates meeting sequence**: 
  - REQ-1XX = First meeting (e.g., REQ-101, REQ-111)
  - REQ-2XX = Second meeting (e.g., REQ-201, REQ-211)
  - REQ-3XX = Third meeting (e.g., REQ-301, REQ-311)
  - And so on...
- **Last two digits indicate category and sequence within that meeting**
- REQ IDs should be sequential and organized by category within each meeting
- If `requirements.md` already exists, it will be overwritten

---

## REQ ID Assignment Rules

### ID Format
- Format: `REQ-XXX` where XXX is a 3-digit number
- **First digit (hundreds place)**: Indicates meeting sequence number
  - 1 = First meeting (e.g., REQ-101, REQ-111, REQ-121)
  - 2 = Second meeting (e.g., REQ-201, REQ-211, REQ-221)
  - 3 = Third meeting (e.g., REQ-301, REQ-311, REQ-321)
  - And so on...
- **Last two digits (tens and ones place)**: Indicate category and sequence within that meeting
- Use 3-digit numbers with leading zeros
- Sequential numbering within each category for each meeting

### ID Organization by Category (within each meeting)
Within each meeting (indicated by first digit), the last two digits follow this pattern:
- **REQ-X01 ~ REQ-X99**: Core functional requirements (회원가입, 인증, 근태관리 등)
  - REQ-X01, REQ-X02, REQ-X03... (sequential within category)
- **REQ-X10 ~ REQ-X19**: Non-functional requirements (성능, 보안, 기술 스택 등)
  - REQ-X10, REQ-X11, REQ-X12... (sequential within category)
- **REQ-X20 ~ REQ-X29**: Integration requirements (외부 연동, API 등)
  - REQ-X20, REQ-X21, REQ-X22... (sequential within category)
- **REQ-X30 ~ REQ-X39**: UI/UX requirements (화면, 디자인 등)
  - REQ-X30, REQ-X31, REQ-X32... (sequential within category)
- **REQ-X40 ~ REQ-X49**: Business logic requirements (정책, 규칙 등)
  - REQ-X40, REQ-X41, REQ-X42... (sequential within category)

### Examples
- **First meeting (11.06)**:
  - REQ-101: Core functional requirement #1
  - REQ-102: Core functional requirement #2
  - REQ-111: Non-functional requirement #1
  - REQ-112: Non-functional requirement #2
  - REQ-121: Integration requirement #1
  - REQ-141: Business logic requirement #1
- **Second meeting (12.01)**:
  - REQ-201: Core functional requirement #1
  - REQ-202: Core functional requirement #2
  - REQ-211: Non-functional requirement #1
  - REQ-212: Non-functional requirement #2
  - REQ-221: Integration requirement #1
  - REQ-241: Business logic requirement #1

### ID Assignment Process
1. **Determine meeting sequence number** by checking all existing meeting folders and sorting chronologically
2. Extract requirements from summary sections 1-4 (primary source)
3. Reference script.md if needed to clarify or verify details
4. Group requirements by category
5. Assign REQ IDs using the format: `REQ-[MeetingNumber][Category][Sequence]`
   - MeetingNumber: 1, 2, 3, etc. (based on chronological order)
   - Category: 0-4 (0=Core, 1=Non-functional, 2=Integration, 3=UI/UX, 4=Business logic)
   - Sequence: 1-9 (sequential within category)
6. Include REQ ID in the requirement title/header
7. Maintain a mapping table if needed for complex requirements

---

## Requirements Extraction Guidelines

**Extract requirements based on the summary.md file (primary source), with optional reference to script.md for clarification, focusing on client requests and explicit agreements:**

### Source Priority
1. **Highest priority**: `note.md` - If exists, use this as the highest priority source (takes precedence over all other sources)
2. **Primary source**: `summary.md` - Use this as the main source for requirements (unless note.md exists)
3. **Supplementary source**: `script.md` - Reference when:
   - Summary is unclear or ambiguous about a requirement
   - Need to verify the exact wording the client used
   - Need additional context to understand what was agreed upon
   - Summary seems to have missed some details mentioned in the meeting
   - Need to distinguish between client requests vs developer suggestions
4. **Additional reference**: `appendix/*.md` files - Reference for additional context, specifications, or reference materials

### Key Principles
1. **Client-centric**: Focus on what the client explicitly requested or mentioned during the meeting
2. **Agreement-based**: Only include items that were explicitly agreed upon between client and development team
3. **Exclude uncertainty**: Do NOT include items with uncertain status (검토 중, 향후 결정, 미확정, etc.)
4. **Exclude developer proposals**: Do NOT include items that were developer suggestions without client agreement
5. **Be specific**: Extract concrete, actionable requirements, not vague ideas or discussions

### From Summary Section 1: Scope (확정된 개발 범위)
- **Extract only confirmed and agreed-upon features**:
  - Features explicitly requested by client → Assign REQ-X01~X99 (Core functional)
  - Capabilities client specifically mentioned → Assign REQ-X01~X99 (Core functional)
  - Behaviors client explicitly described → Assign REQ-X01~X99 (Core functional)
  - Note: X = meeting sequence number (1, 2, 3, etc.)
- **Exclude**:
  - Items marked as "검토 중", "비용 정책에 따라 검토", "향후 결정"
  - Items marked as "별도 견적" (unless client explicitly requested it as a requirement)
  - Developer suggestions not explicitly agreed upon
- Organize by categories (e.g., Core Features, User Management, etc.)
- Each confirmed feature/capability gets a unique REQ ID based on meeting sequence

### From Summary Section 2: Budget & Model (금액 및 계약 방식)
- **Extract only agreed-upon constraints**:
  - Cost constraints explicitly agreed upon → Assign REQ-X10~X19 (Non-functional)
  - Contract model constraints explicitly agreed upon → Assign REQ-X10~X19 (Non-functional)
  - Payment schedule requirements explicitly agreed upon → Assign REQ-X10~X19 (Non-functional)
  - Note: X = meeting sequence number (1, 2, 3, etc.)
- **Exclude**:
  - Items marked as "예상", "검토 중", "향후 결정"
  - Items that are developer estimates without client agreement

### From Summary Section 3: Timeline (일정)
- **Extract only confirmed timeline requirements**:
  - Deadlines explicitly agreed upon → Assign REQ-X10~X19 (Non-functional)
  - Milestone constraints explicitly agreed upon → Assign REQ-X10~X19 (Non-functional)
  - Development phases explicitly agreed upon → Assign REQ-X10~X19 (Non-functional)
  - Note: X = meeting sequence number (1, 2, 3, etc.)
- **Exclude**:
  - Items marked as "예상", "목표" without explicit agreement
  - Items that are developer estimates without client confirmation

### From Summary Section 4: Responsibilities (역할/책임자)
- **Extract only confirmed role-based requirements**:
  - Access control requirements explicitly agreed upon → Assign REQ-X40~X49 (Business logic)
  - Permission requirements explicitly agreed upon → Assign REQ-X40~X49 (Business logic)
  - Responsibility assignments explicitly agreed upon → Assign REQ-X40~X49 (Business logic)
  - Note: X = meeting sequence number (1, 2, 3, etc.)
- **Focus on client-requested permissions and roles**, not developer-suggested structures

### Requirements File Structure:
- Organize by categories (e.g., Core Features, Security, Performance, etc.)
- **Include only client-requested technical specifications** (not developer suggestions)
- **Include only agreed-upon policy decisions and constraints**
- Format as structured markdown with clear sections
- Add project timeline and payment schedule sections (only if explicitly agreed upon)
- **Each requirement must have REQ ID in the format: `[REQ-XXX] Requirement Title`**
- **Add a section at the end for "미확정 항목" (Unconfirmed Items)** if there are items mentioned but not agreed upon

### What to Include vs Exclude

**INCLUDE:**
- ✅ Features explicitly requested by client
- ✅ Capabilities client specifically mentioned
- ✅ Items marked as "확정", "합의", "결정"
- ✅ Items that are clearly agreed upon in the meeting
- ✅ Client's explicit requirements and constraints

**EXCLUDE:**
- ❌ Items marked as "검토 중", "비용 정책에 따라 검토"
- ❌ Items marked as "향후 결정", "미확정"
- ❌ Items marked as "별도 견적" (unless client explicitly requested as requirement)
- ❌ Developer suggestions without client agreement
- ❌ Items marked as "예상", "목표" without explicit agreement
- ❌ Vague discussions or ideas without concrete agreement

---

## Requirements File Format Example

```markdown
# Client Requirements - [Meeting Date]

## 핵심 기능 요구사항

### 1. 회원가입 및 인증 시스템

#### [REQ-101] 회원 유형 분류 (첫 번째 미팅)
- 사업장 (담당자 포함)
- 근로자
- 노무법인 담당자
- 세무법인 담당자
- 세빛넥스 어드민

#### [REQ-102] 기본 인증 방식 (첫 번째 미팅)
- ID/PW + 이메일 인증
- 노무법인/세무법인 담당자: 가입시 1회 인증
- 근로자: 가입 인증만

#### [REQ-111] 보안 요구사항 (첫 번째 미팅)
- 주민번호 취급에 따른 보안 로그인 고려
- 법적 검토 필요
- 로그 기록으로 보완 가능
```

---

**Example:**
```
Process meeting script requirements for client 세빛넥스 with meeting date 11.06
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. Determine meeting sequence number by checking all meeting folders (11.06 = 1st meeting, 12.01 = 2nd meeting, etc.)
3. **Check for `note.md`** in `meeting_scripts/11.06/` folder (if exists, read first and prioritize)
4. Read existing file: `meeting_scripts/11.06/summary.md` (required)
5. Optionally read `meeting_scripts/11.06/script.md` if needed for clarification
6. Create `requirements.md` from summary sections 1-4, prioritizing note.md if available, using script.md as supplementary reference
7. Assign REQ IDs to each requirement based on meeting sequence:
   - First meeting (11.06): REQ-101, REQ-102, REQ-111, etc.
   - Second meeting (12.01): REQ-201, REQ-202, REQ-211, etc.

**Note:** 
- `summary.md` must exist before running this command
- Run `process_meeting/summary` first if summary.md doesn't exist
- **`note.md` takes highest priority**: If note.md exists, it must be read first and its content takes precedence over summary.md and script.md
- `script.md` is optional but recommended for better understanding and verification
- All requirements will have unique REQ IDs for traceability in quotes
- **Focus on client requests**: The requirements should reflect what the client wants, not what developers suggest
- **Only confirmed items**: Include only items that were explicitly agreed upon, not items under review or discussion
- **Be selective**: It's better to have fewer, confirmed requirements than many uncertain ones
- **Source priority**: note.md (if exists) > summary.md > script.md
- **Use note.md for corrections**: If note.md exists, use it to correct, clarify, or override content from summary.md or script.md

