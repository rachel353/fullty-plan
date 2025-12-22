## Apply Quote Feedback

```
Apply quote feedback for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Apply client feedback from `note.md` to existing quote files, then merge into combined quote.

**Process:**
1. Find client folder (`YY_MM_CLIENT_NAME/`)
2. Check `quotes/[MM.DD]/note.md`:
   - If exists: Read feedback
   - If not: Prompt user and create `note.md`
3. Read existing files: `guide.md`, `background.md`, `ia_structure.md`, `specification_and_quote.md`
4. Update all files based on `note.md` feedback
5. Save updated files
6. Execute `generate_quote/merge` command

**IMPORTANT:**
- `note.md` takes highest priority
- All quote files must exist (run `generate_quote` first)
- Recalculate pricing: ₩6,500,000 per man-month if features change

---

## Example

```
Apply quote feedback for client 리크노스 with meeting date 12.05
```

**Result:**
1. Reads/creates `quotes/12.05/note.md`
2. Updates all quote files
3. Executes merge → `quotes/12.05_combined.md`
