## Generate Quote

```
Generate quote for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Generate a comprehensive quote document based on meeting summaries, requirements, scripts, and previous quotes. This command creates four files: three separate files (background information, IA structure, and detailed specification with pricing) and one merged combined quote file.

**Context:**
- These quotes are for 리트머스 (Litmers) - an outsourcing development company
- Quotes should be based on final agreed-upon items from meetings
- Previous quotes and meeting history should be referenced for consistency
- Budget constraints from summary should be respected when scoping features

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `quotes/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over all other sources when there are conflicts
   - Use `note.md` as the primary source for corrections, clarifications, or additional context
3. Locate and read the following files:
   - `meeting_scripts/[MM.DD]/requirements.md` (required, must have REQ IDs)
   - `meeting_scripts/[MM.DD]/summary.md` (required)
   - `meeting_scripts/[MM.DD]/script.md` (optional, for additional context)
   - `quotes/*.md` files (previous quotes for reference)
   - `appendix/requirements.md` (**REQUIRED if exists** - must be read and reflected in quote generation)
   - `appendix/*.md` files (optional, for additional reference materials)
3. Execute sub-commands in order:
   - First: `generate_quote/guide` - Creates `guide.md` (analyzes all meeting summaries for key priorities)
   - Second: `generate_quote/background` - Creates `background.md` (references guide.md)
   - Third: `generate_quote/ia_structure` - Creates `ia_structure.md` (with screen features, references guide.md)
   - Fourth: `generate_quote/specification_and_quote` - Creates `specification_and_quote.md` (quote-focused, references guide.md)
   - Fifth: `generate_quote/merge` - Executes Python scripts to merge all files and extract requirements reference

**IMPORTANT:**
- **`note.md` takes priority**: If `note.md` exists in `quotes/[MM.DD]/` folder, it must be read first and its content takes precedence over all other sources
- **`appendix/requirements.md` is REQUIRED**: If `appendix/requirements.md` exists, it must be read and reflected in quote generation (not optional)
- **Guide must be created FIRST**: `generate_quote/guide` analyzes all meetings before other steps
- `requirements.md` and `summary.md` must already exist
- `requirements.md` must have REQ IDs assigned (created by `process_meeting/requirements`)
- **All meeting summaries should be read** for comprehensive guide generation
- **Pricing standard**: All estimates must use ₩6,500,000 per man-month (맨먼스 기준)
- **Man-month calculation**: Est. Price = Man-Months × ₩6,500,000
- Budget constraints from summary section 2 must be respected
- Features should be scoped to fit within agreed budget range
- Excluded requirements should be clearly listed with separate pricing and man-months
- Previous quotes should be referenced for consistency and comparison
- **All subsequent steps should reference guide.md** for client priorities and key agreements

---

## Sub-Commands

This command uses sub-commands located in the `generate_quote/` folder:

### 1. generate_quote/guide (MUST BE FIRST)
- Creates `guide.md` file
- Analyzes **ALL** meeting summaries to identify client priorities and important agreements
- Provides foundation for all subsequent quote generation work
- Output location: `quotes/[MM.DD]/guide.md`
- **This must be created FIRST** before any other steps

### 2. generate_quote/background
- Creates `background.md` file
- Contains: Project overview, background, goals, scope, technical points
- Output location: `quotes/[MM.DD]/background.md`

### 3. generate_quote/ia_structure
- Creates `ia_structure.md` file
- Contains: Visual site map (tree structure) **with screen-by-screen features**
- Each screen includes its key features
- References `guide.md` for prioritization
- Output location: `quotes/[MM.DD]/ia_structure.md`

### 4. generate_quote/specification_and_quote
- Creates `specification_and_quote.md` file
- Contains: **Quote-focused** specification with IA, features, and pricing
- **Pricing method**: Man-month based (₩6,500,000 per MM)
- Each screen/feature must include man-month estimate and calculated price
- Focus on pricing and cost breakdown rather than detailed feature descriptions
- Output location: `quotes/[MM.DD]/specification_and_quote.md`

### 5. generate_quote/merge (Required)
- Executes Python script to merge all three files into a single combined quote
- Script: `merge_quote_files.py`
- **Automatically executed** after specification_and_quote is created
- Creates `[MM.DD]_combined.md` file
- Output location: `quotes/[MM.DD]_combined.md`
- **This is a code execution, not AI processing**
- Requires all three files (background.md, ia_structure.md, specification_and_quote.md) to exist
- **Also executes `extract_requirements.py`** to append requirements reference section

### 6. generate_quote/extract_requirements (Automatically called by merge)
- Extracts REQ IDs referenced in the combined quote
- Looks up original requirement content from `meeting_scripts/[MM.DD]/requirements.md`
- Appends `## 10) Requirements Reference` section to combined quote
- Script: `extract_requirements.py`
- **Automatically executed** as part of merge step

---

## File Naming Convention

Output files will be created:
- In `quotes/[MM.DD]/` folder:
  - `guide.md` - Quote generation guide (client priorities and key agreements)
  - `background.md` - Background information
  - `ia_structure.md` - IA tree structure with screen features
  - `specification_and_quote.md` - Quote-focused specification with pricing
- In `quotes/` folder:
  - `[MM.DD]_combined.md` - Merged file with requirements reference (automatically created)

Example for meeting date 12.01:
- `quotes/12.01/guide.md` (created first)
- `quotes/12.01/background.md`
- `quotes/12.01/ia_structure.md`
- `quotes/12.01/specification_and_quote.md`
- `quotes/12.01_combined.md` (automatically created with requirements reference)

---

## Data Sources

The command will read from:
1. **`quotes/[MM.DD]/note.md`** - **HIGHEST PRIORITY** - If exists, takes precedence over all other sources
2. **ALL meeting summaries** - All `meeting_scripts/[MM.DD]/summary.md` files (for guide generation)
3. **requirements.md** - Functional and non-functional requirements (with REQ IDs)
4. **summary.md** (latest) - Final agreed items, budget, timeline, responsibilities
5. **script.md** (optional) - Additional context from meeting transcripts
6. **Previous quotes** - For consistency and comparison (e.g., `quotes/11.06.md`)
7. **appendix/requirements.md** - **REQUIRED if exists** - Detailed requirements document that must be reflected in quote generation
8. **appendix/** - Other files in `appendix/` folder (if available) for additional reference materials

---

## Example

```
Generate quote for client 세빛넥스 with meeting date 12.01
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. **Check for `note.md`** in `quotes/12.01/` folder (if exists, read first and prioritize)
3. Read:
   - **ALL** `meeting_scripts/[MM.DD]/summary.md` files (for guide generation)
   - `meeting_scripts/12.01/requirements.md` (with REQ IDs)
   - `meeting_scripts/12.01/summary.md` (latest)
   - `meeting_scripts/12.01/script.md` (if available)
   - `quotes/11.06.md` (previous quote)
   - `appendix/requirements.md` (**REQUIRED if exists** - must be reflected in quote generation)
3. Execute sub-commands in order:
   - `generate_quote/guide` → Analyzes all meetings → Creates `quotes/12.01/guide.md`
   - `generate_quote/background` → References guide.md → Creates `quotes/12.01/background.md`
   - `generate_quote/ia_structure` → References guide.md → Creates `quotes/12.01/ia_structure.md`
   - `generate_quote/specification_and_quote` → References guide.md → Creates `quotes/12.01/specification_and_quote.md`
   - `generate_quote/merge` → Executes `merge_quote_files.py` + `extract_requirements.py` → Creates `quotes/12.01_combined.md` (with requirements reference)

---

## Important Notes

- **Man-month pricing standard**: All pricing must be calculated using ₩6,500,000 per man-month
- **Estimation process**: 
  1. Estimate development effort in man-months for each screen/feature
  2. Calculate price: Man-Months × ₩6,500,000
  3. Display both man-months and calculated price
- **Budget is key**: Always respect the budget range from summary.md section 2
- **Scope to budget**: If requirements exceed budget, clearly exclude them with pricing and man-months
- **REQ IDs required**: All requirements must reference REQ IDs from requirements.md
- **Reference previous quotes**: Maintain consistency with previous quotes when applicable
- **User roles matter**: IA structure should reflect different user roles (사업장, 근로자, 노무법인, 세무법인, etc.)
- **Technical constraints**: Consider technical limitations mentioned in summary and requirements
- **Timeline alignment**: Ensure feature scope aligns with agreed timeline from summary
- **IA with features**: IA structure must include screen-by-screen features
- **Quote-focused**: specification_and_quote should focus on pricing and cost breakdown

---

## Constraints

- Do not output unnecessary introductions or brainstorming processes - only final results
- IA and Features must be logically connected (clear which features belong to which screens)
- Maintain professional, objective proposal/documentation tone
- All pricing should be in Korean Won (KRW)
- VAT should be mentioned separately in total cost summary
- REQ IDs must be referenced in all feature descriptions

