## Extract Requirements

```
Extract requirements for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Extract REQ IDs referenced in the combined quote document and append the original requirement content from `requirements.md`.

**Process:**
1. Find client folder (format: `YY_MM_CLIENT_NAME/`)
2. Locate files:
   - `quotes/[MM.DD]_combined.md` (required - the merged quote)
   - `meeting_scripts/[MM.DD]/requirements.md` (required - original requirements)
3. Execute: `python .cursor/commands/generate_quote/extract_requirements.py [CLIENT_FOLDER] [MM.DD]`
4. Appends `## 10) Requirements Reference` section to `quotes/[MM.DD]_combined.md`

**IMPORTANT:**
- Both files must exist
- Combined quote must have been generated first (via `generate_quote/merge`)
- If requirements reference already exists, the script will skip without modifying
- Output: Modifies `quotes/[MM.DD]_combined.md` in place

---

## Output Structure

The script adds the following section to the end of `[MM.DD]_combined.md`:

```markdown
---

## 10) Requirements Reference

본 견적서에서 참조된 요구사항의 원본 내용입니다.

#### [REQ-101] 요구사항 제목 (첫 번째 미팅)
- 요구사항 상세 내용...

#### [REQ-102] 다른 요구사항 제목 (첫 번째 미팅)
- 다른 요구사항 상세 내용...
```

---

## Example

```
Extract requirements for client 리크노스 with meeting date 12.05
```

**Executes:**
```bash
python .cursor/commands/generate_quote/extract_requirements.py "리크노스" "12.05"
```

**Result:** Appends requirements reference section to `quotes/12.05_combined.md`

