## Process Meeting Script

```
Process meeting script for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Context:**
- These meeting scripts are between **리트머스 (litmers)** - an outsourcing development company providing development consulting and estimation services - and their **clients**
- 리트머스 conducts sales consultations to understand client needs, provide technical consulting, and create project estimates
- **Priority**: Client needs and agreements are the top priority. Focus on what the client said, whether they agreed or disagreed
- Meeting scripts may not be perfectly accurate due to transcription limitations, so referencing previous meeting content helps with understanding

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. Locate existing `meeting_scripts/[MM.DD]/script.md` file
3. **Check for `note.md` file** in `meeting_scripts/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over `script.md` when there are conflicts
   - Use `note.md` as the primary source for corrections, clarifications, or additional context
4. **Check for previous meeting scripts** in the same client folder to understand context
5. **Check for `appendix/` folder** and read `appendix/*.md` files (optional, for additional reference materials)
6. Read the script content from `script.md` (consider previous meetings, note.md, and appendix files for better understanding)
6. Execute sub-commands in order:
   - First: `process_meeting/summary` - Creates `summary.md` (uses note.md if available)
   - Second: `process_meeting/requirements` - Creates `requirements.md` (with REQ IDs, uses note.md if available)
   - Third: `process_meeting/feedback` - Creates `feedback.md` (uses note.md if available)
7. **After summary and requirements are created, analyze if quote generation is needed:**
   - Read `summary.md` to check for quote-related indicators
   - If quote generation is needed, execute `generate_quote` command automatically

**IMPORTANT:**
- The `script.md` file must already exist in `meeting_scripts/[MM.DD]/` folder
- **`note.md` takes priority**: If `note.md` exists in `meeting_scripts/[MM.DD]/` folder, it must be read first and its content takes precedence over `script.md`
- **`note.md` usage**: Use `note.md` for corrections, clarifications, additional context, or overrides to `script.md` content
- **Reference previous meetings**: If there are earlier meeting scripts in the same client folder, read them first to understand the context and ongoing discussions
- `summary.md` MUST be created first before requirements
- If summary.md or requirements.md already exist, they will be overwritten
- **Client perspective priority**: When extracting information, prioritize what the client said and their agreements/disagreements over 레트머스 sales team's statements
- **Automatic feedback generation**: After requirements are created, automatically execute `process_meeting/feedback` to create `feedback.md`
- **Automatic quote generation**: After summary and requirements are created, automatically check if quote generation is needed and execute if conditions are met

---

## Sub-Commands

This command uses sub-commands located in the `process_meeting/` folder:

### 1. process_meeting/summary
- Extracts final agreed-upon items from script.md
- Creates `summary.md` file
- **MUST be executed first**
- **References previous meetings** if available for better context

### 2. process_meeting/requirements
- Reads `summary.md` (must exist)
- Creates `requirements.md` from summary sections 1-4
- **Assigns REQ IDs** to each requirement for traceability
- REQ ID format: `REQ-XXX` (e.g., REQ-001, REQ-002)

### 3. process_meeting/feedback
- **Automatically executed** after requirements are created
- Analyzes meeting script to identify 리트머스 sales team improvement areas
- Distinguishes between 리트머스 side and client side statements
- Creates `feedback.md` with sales improvement recommendations
- **References note.md if available** for additional context

### 4. generate_quote (Conditional - Auto-executed if needed)
- **Automatically executed** after summary and requirements are created
- **Trigger conditions**: Check if quote generation or update is needed based on summary.md
- Creates comprehensive quote documents
- See `generate_quote/main.md` for details

---

## Quick Task Checklist

### Phase 1: Input Collection & Validation ✅
- [ ] Get and validate client name
- [ ] Find client folder (search for `YY_MM_CLIENT_NAME/`)
- [ ] Get and validate meeting date (`MM.DD` format)
- [ ] Find and read existing `script.md` file
- [ ] **Check for `note.md` file** in `meeting_scripts/[MM.DD]/` folder
- [ ] **If `note.md` exists, read it first** and prioritize its content over `script.md`

### Phase 2: File System Verification 📁
- [ ] Verify `meeting_scripts/` folder exists in client directory
- [ ] Verify date folder `[MM.DD]/` exists inside `meeting_scripts/`
- [ ] Verify `script.md` exists in date folder
- [ ] **Check if `note.md` exists** in date folder (optional but takes priority if exists)

### Phase 3: Summary Extraction 🔍 (MUST BE DONE FIRST)
- [ ] **If `note.md` exists, provide it to summary command** (note.md takes priority)
- [ ] Execute `process_meeting/summary` command (with note.md if available)
- [ ] Verify `summary.md` file created

### Phase 4: Requirements Generation 📋
- [ ] **If `note.md` exists, provide it to requirements command** (note.md takes priority)
- [ ] Execute `process_meeting/requirements` command (with note.md if available)
- [ ] Verify `requirements.md` file created with REQ IDs

### Phase 5: Feedback Generation 📝
- [ ] **If `note.md` exists, provide it to feedback command** (note.md takes priority)
- [ ] Execute `process_meeting/feedback` command (with note.md if available)
- [ ] Verify `feedback.md` file created

### Phase 6: Quote Generation Decision 🔍
- [ ] Read `summary.md` to analyze if quote generation is needed
- [ ] Check for quote-related indicators:
  - [ ] Section 2 (Budget & Model) contains 견적 범위, 예산, 결제 방식
  - [ ] Section 5 (Next Actions) mentions 견적서, 견적, 상세 기능 명세 및 견적
  - [ ] New requirements or scope changes that affect pricing
- [ ] If quote generation needed:
  - [ ] Execute `generate_quote` command automatically
  - [ ] Verify quote files created in `quotes/[MM.DD]/` folder

### Phase 7: Verification ✨
- [ ] Verify all required files exist:
  - [ ] `script.md` ✅ (source file - should already exist)
  - [ ] `summary.md` ⚠️ (must exist first)
  - [ ] `requirements.md` (with REQ IDs)
  - [ ] `feedback.md` (sales improvement recommendations)
  - [ ] Quote files (if quote generation was triggered):
    - [ ] `quotes/[MM.DD]/guide.md`
    - [ ] `quotes/[MM.DD]/background.md`
    - [ ] `quotes/[MM.DD]/ia_structure.md`
    - [ ] `quotes/[MM.DD]/specification_and_quote.md`
    - [ ] `quotes/[MM.DD]_combined.md`

---

## Task Dependencies

```
Phase 1 (Input) 
    ↓
Phase 2 (File Verification) 
    ↓ (verify script.md exists)
Phase 3 (Summary) ──┐
    ⚠️ MUST        │
    BE FIRST       │
                   └──→ Phase 4 (Requirements)
                          ↓
                    Phase 5 (Feedback)
                          ↓
                    Phase 6 (Quote Decision)
                          ↓ (if needed)
                    Generate Quote ──┐
                          ↓          │
                    Phase 7 (Verification)
```

---

## Important Notes

- ⚠️ **script.md MUST exist before processing** (read from existing file)
- ⚠️ **Check previous meetings**: Look for earlier meeting scripts in the same client folder to understand context
- ⚠️ **summary.md MUST be created before requirements.md**
- **Client priority**: When extracting, prioritize client statements and agreements over 리트머스 team statements
- Requirements are extracted from summary.md sections 1-4 only
- Do NOT extract requirements directly from script - always use summary.md
- **REQ IDs are essential**: All requirements must have unique REQ IDs for traceability in quotes
- If summary.md or requirements.md already exist, they will be overwritten
- **Meeting script limitations**: Transcripts may have inaccuracies - use previous meeting context to clarify

---

## Quote Generation Decision Logic

After `summary.md` and `requirements.md` are created, analyze if quote generation is needed:

### Check Summary.md for Quote Indicators

**Section 2: Budget & Model** - Check for:
- 견적 범위, 예산, 결제 방식 언급
- Budget agreements or constraints
- Payment schedule discussions

**Section 5: Next Actions** - Check for:
- "상세 기능 명세 및 견적 내용 확정"
- "견적서", "견적" 관련 액션 아이템
- Quote-related tasks or deadlines

**Section 1: Scope** - Check for:
- Significant new requirements or scope changes
- Features that would affect pricing

### Decision Criteria

**Execute `generate_quote` if ANY of the following is true:**
1. ✅ Section 2 contains 견적 범위, 예산, 결제 방식 (Budget & Model section has quote-related content)
2. ✅ Section 5 mentions 견적서, 견적, 상세 기능 명세 및 견적 (Next Actions mentions quote-related tasks)
3. ✅ New requirements or significant scope changes that would affect pricing
4. ✅ First meeting with this client (no previous quotes exist)
5. ✅ Explicit request in summary to create or update quote

**Skip quote generation if:**
- ❌ Summary only contains discussions without concrete agreements
- ❌ No budget or pricing discussions in the meeting
- ❌ Only minor clarifications without scope changes

### Automatic Execution

If quote generation is needed:
1. Execute `generate_quote` command with same client name and meeting date
2. This will create all quote files in `quotes/[MM.DD]/` folder
3. Quote generation uses the newly created `summary.md` and `requirements.md`

---

**Example:**
```
Process meeting script for client 세빛넥스 with meeting date 11.06
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. **Check for `note.md`** in `meeting_scripts/11.06/` folder (if exists, read first)
3. Read existing file: `meeting_scripts/11.06/script.md`
4. Execute `process_meeting/summary` → Creates `summary.md` (uses note.md if available)
5. Execute `process_meeting/requirements` → Creates `requirements.md` with REQ IDs (uses note.md if available)
6. Execute `process_meeting/feedback` → Creates `feedback.md` (uses note.md if available)
7. **Analyze summary.md for quote indicators:**
   - Check Section 2: "견적 범위: 4천만원 초반~중반" ✅ (quote needed)
   - Check Section 5: "상세 기능 명세 및 견적 내용 확정" ✅ (quote needed)
8. **Execute `generate_quote` automatically** → Creates quote files in `quotes/11.06/`

