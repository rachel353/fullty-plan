## Generate Company README

```
Generate company README for client [CLIENT_NAME]
```

Create or refresh `YY_MM_CLIENT_NAME/README.md` so anyone landing in the client folder instantly understands the project purpose and the latest meeting takeaways. The command takes only the **client name** (e.g., `세빛넥스`) and figures out the year/month prefix automatically.

---

## Inputs & Preconditions

- **Client name only**. The user does not provide `YY_MM`; find the folder whose suffix matches the provided name (e.g., `25_10_세빛넥스`).  
  - If multiple folders match (e.g., historical + current), pick the one with the most recent `YY_MM` value unless the user clarifies.
- The client folder must already exist and contain at least one of:
  - `quotes/[MM.DD]/background.md`
  - `meeting_scripts/[MM.DD]/summary.md`
- When both `note.md` and the standard docs exist inside a meeting folder, read `note.md` first for corrections.

---

## Data Sources

| Information Needed | Primary Files | Secondary / Fallback |
| --- | --- | --- |
| Project purpose & context | `quotes/[latest MM.DD]/background.md`, `quotes/[latest]/guide.md` | `meeting_scripts/[latest]/summary.md` Scope section |
| Scope snapshot & key requirements | `meeting_scripts/[latest]/requirements.md` (REQ IDs) | `quotes/[latest]/specification_and_quote.md`, `appendix/requirements.md` |
| Meeting digest bullets | Every `meeting_scripts/[MM.DD]/summary.md` (oldest → newest) | `meeting_scripts/[MM.DD]/note.md` or `script.md` if summary missing |
| Next actions / risks | Latest `summary.md` sections 5-6 | `feedback.md` for litmus-side todos |

> When a referenced file is missing, explicitly note that the section is based on the available sources only (do not fail).

---

## README Output Structure

Create the file at `YY_MM_CLIENT_NAME/README.md` with this template (fill each placeholder with concise content derived from the sources above):

```markdown
# [Client Name] Project README
_Last updated: YYYY-MM-DD_

## Project Purpose & Background
- 2–3 sentences summarizing why the project exists and the problem it solves.

## Scope Snapshot (Latest)
- REQ-XXX: [Requirement headline + 1-line impact]
- ...

## Meeting Notes Digest
### [MM.DD] Meeting
- Key decision/outcome 1
- Key decision/outcome 2
- Budget/timeline callout (if any)

### [Earlier MM.DD] Meeting
- ...

## Next Actions & Risks
- Action/Risk description — owner, due date (when available)

## Reference Files
- `meeting_scripts/[MM.DD]/summary.md` (latest)
- `quotes/[MM.DD]/background.md`
- Any appendix or quote docs you relied on
```

Writing guidelines:
- Keep bullets short (max ~20 words) and action-oriented.
- Preserve terminology from source docs (REQ IDs, section names) for traceability.
- Order meetings from newest to oldest so the reader can see the latest context first.
- Mention budget figures or contract models only if explicitly stated in the sources.
- If there are no meetings yet, state that the README currently reflects only the quote/background materials.

---

## Step-by-Step Flow

1. **Locate client folder**  
   - Search `/workspace` for directories that match `??_??_*`.  
   - Choose the directory whose suffix matches `[CLIENT_NAME]` (case-sensitive).  
   - If none found, stop and ask the user to run `Add New Client` first.

2. **Collect chronology metadata**  
   - List the subfolders inside `meeting_scripts/` and `quotes/`; sort by `MM.DD`.  
   - Keep both the newest date (for “latest snapshot”) and the full ordered list (for digest).

3. **Read inputs**  
   - For each meeting date (newest → oldest): read `summary.md` (preferring `note.md` if present). Extract 2–3 bullets focusing on agreements, blockers, or numbers.  
   - For the latest meeting: also read `requirements.md` + `feedback.md` (if available) to pull REQ summaries and action items.  
   - For the latest quote date (match latest meeting when possible): read `background.md` (primary) and `guide.md`/`specification_and_quote.md` for supporting info.

4. **Draft sections**  
   - Project Purpose: 2–3 sentences synthesizing the “why” from background + summary Scope section.  
   - Scope Snapshot: List the top 5–8 REQ IDs with a short explanation each; include MM/price only if the source explicitly states them.  
   - Meeting Digest: For each meeting, add a `### [MM.DD] Meeting` header with the extracted bullets.  
   - Next Actions & Risks: Pull from latest summary sections 5–6 and feedback items that require follow-up.  
   - Reference Files: Enumerate the files actually read so future users know where the content came from.

5. **Write README.md**  
   - Overwrite `YY_MM_CLIENT_NAME/README.md` (create the file if it does not exist).  
   - Include `_Last updated: YYYY-MM-DD_` using today’s date (KST or system date).  
   - Ensure Markdown is clean (no trailing spaces, use `-` for bullets).

6. **Verify**  
   - Re-open the README to confirm sections are populated.  
   - Mention in the response that the README was refreshed and list the files consulted.

---

## Example Usage

```
Generate company README for client 세빛넥스
```

Expected behavior:
1. Detects folder `25_10_세빛넥스/`.
2. Reads `meeting_scripts/11.06`, `12.01`, `12.02` summaries (most recent first) plus the latest `requirements.md` and `quotes/12.02/background.md`.
3. Writes a README containing purpose, key requirements with REQ IDs, digest bullets for each meeting date, action items, and reference links.

---

## Constraints & Tips

- Do **not** hallucinate requirements—every statement must trace back to a referenced file.  
- If budgets or dates conflict between meetings, call that out as a risk instead of choosing one.  
- Keep the README under ~400 words; prioritize clarity over exhaustiveness.  
- When a section lacks data, explicitly note “(No data available yet)” rather than leaving it blank.  
- This command is informational only (no downstream automation is triggered).

