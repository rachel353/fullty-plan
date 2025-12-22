## Merge Quote Files

```
Merge quote files for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Merge three quote files (background.md, ia_structure.md, specification_and_quote.md) into a single combined quote document, then extract and append requirement references.

**Process:**
1. Find client folder (format: `YY_MM_CLIENT_NAME/`)
2. Locate files in `quotes/[MM.DD]/`:
   - `background.md` (required)
   - `ia_structure.md` (required)
   - `specification_and_quote.md` (required)
3. Execute merge: `python .cursor/commands/generate_quote/merge_quote_files.py [CLIENT_FOLDER] [MM.DD]`
4. Creates `[MM.DD]_combined.md` in `quotes/` folder
5. **Execute extract requirements**: `python .cursor/commands/generate_quote/extract_requirements.py [CLIENT_FOLDER] [MM.DD]`
6. Appends `## 10) Requirements Reference` section to `[MM.DD]_combined.md`

**IMPORTANT:**
- All three files must exist
- Output: `quotes/[MM.DD]_combined.md` (with requirements reference appended)
- Requirements reference is automatically extracted after merge

---

## Merge Structure

```markdown
# 견적서 - [Client Name] - [MM.DD]

## 0-5) [From background.md sections 0-5]
---
## 6) Visual Site Map (Structure) [From ia_structure.md]
---
## 7-9) [From specification_and_quote.md sections 7-9]
---
## 10) Requirements Reference [Automatically extracted from requirements.md]
```

---

## Example

```
Merge quote files for client 리크노스 with meeting date 12.05
```

**Executes:**
```bash
python .cursor/commands/generate_quote/merge_quote_files.py "리크노스" "12.05"
python .cursor/commands/generate_quote/extract_requirements.py "리크노스" "12.05"
```

**Result:** Creates `quotes/12.05_combined.md` with requirements reference section
