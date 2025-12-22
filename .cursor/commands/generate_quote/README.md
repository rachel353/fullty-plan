# Generate Quote Command

`generate_quote` builds the full quote package for a single meeting date. It consumes the processed meeting outputs (`summary.md`, `requirements.md`) plus any previously sent feedback (`note.md`) to create the four quote sections and the merged client-ready file. The command can run on demand or be triggered automatically after `process_meeting` whenever quote-related indicators are present.

## When to run
- A meeting script has already been processed (summary + requirements exist with REQ IDs).
- The client asked for a new or updated quote, or new scope/budget signals appear in `summary.md`.
- You need to refresh existing quote files after applying feedback that lives in `quotes/[MM.DD]/note.md`.

## Required inputs and files
- `client_name` and `meeting_date` (`MM.DD`).
- Client folder in the format `YY_MM_CLIENT_NAME/`.
- `meeting_scripts/[MM.DD]/summary.md` and `meeting_scripts/[MM.DD]/requirements.md` (with REQ IDs).
- If present, `quotes/[MM.DD]/note.md` **must** be read first and takes precedence over every other source.
- If present, `appendix/requirements.md` is **mandatory** reading and its REQ IDs must appear in the specification (included features or the exclusion table).
- Optional but recommended context: previous `quotes/*.md`, `meeting_scripts/[MM.DD]/script.md`, and `appendix/*.md` reference material.

## End-to-end workflow
1. Locate the client folder and ensure `quotes/[MM.DD]/` exists.
2. Read `quotes/[MM.DD]/note.md` (highest priority) and capture every correction, override, or requested focus.
3. Gather all summaries (for the guide), the current meeting's requirements, script, appendix files, and older quotes.
4. Execute the sub-commands **in order** so every downstream file references the guide and shares the same context.
5. After `specification_and_quote.md` is produced (or updated), run `generate_quote/merge` to call `merge_quote_files.py`, which writes `quotes/[MM.DD]_combined.md`.
6. If `note.md` changes later, rerun `generate_quote/feedback` → it reapplies the feedback to every file and re-merges.

### Main command (`generate_quote/main.md`)
The `main.md` file is the entry point Cursor uses when you say “Generate quote for client X with meeting date Y”. It performs the following in sequence:
- Validates that `summary.md` and `requirements.md` already exist for the given meeting.
- Reads `quotes/[MM.DD]/note.md` first (if present) to override every other source.
- Loads required context: the latest meeting artifacts, all prior summaries (for the guide), appendix files, and prior quotes.
- Calls each sub-command in the mandated order (guide → background → IA → spec → merge).
- Enforces hard rules such as ₩6.5M/MM pricing, REQ-ID coverage, platform definition requirements, and the automatic execution of the Python merge script.

## Sub-command quick reference
| Command | Output | What it does |
| --- | --- | --- |
| `generate_quote/guide` | `quotes/[MM.DD]/guide.md` | Synthesises **all** meeting summaries into priorities, agreements, budget adequacy, and recommended team/timeline. **Must run first.** |
| `generate_quote/background` | `quotes/[MM.DD]/background.md` | Describes project overview, goals, scope, and key considerations using the guide + requirements as sources. |
| `generate_quote/ia_structure` | `quotes/[MM.DD]/ia_structure.md` | Builds the platform definition plus IA tree (screen names only, grouped by user type). |
| `generate_quote/specification_and_quote` | `quotes/[MM.DD]/specification_and_quote.md` | Produces the pricing-focused specification. Every screen references REQ IDs, shows feature groupings, and lists client-facing prices (₩ only). |
| `generate_quote/merge` | `quotes/[MM.DD]_combined.md` | Runs `python .cursor/commands/generate_quote/merge_quote_files.py "[CLIENT_FOLDER]" "[MM.DD]"` to concatenate background, IA, and spec sections. |
| `generate_quote/feedback` | Updates all quote files | Applies the latest `quote/[MM.DD]/note.md` feedback, recalculates pricing if features change, then re-merges. |

## Output files
- `quotes/[MM.DD]/guide.md`
- `quotes/[MM.DD]/background.md`
- `quotes/[MM.DD]/ia_structure.md`
- `quotes/[MM.DD]/specification_and_quote.md`
- `quotes/[MM.DD]_combined.md` (created by `merge`)

## Quote guardrails
- Pricing is always computed internally as `man_months × ₩6,500,000`, but only the KRW totals are shown to the client (no MM counts or rates).
- Respect the hierarchy `note.md` → `appendix/requirements.md` → `meeting_scripts/requirements.md` → summaries/scripts.
- `guide.md` is the single source of truth for priorities, team mix, and budget adequacy; every downstream file must reference it.
- Every REQ ID from all meetings (plus appendix) must appear either in the main specification tables or the exclusion section with separate pricing.
- If realistic cost exceeds the agreed budget from `summary.md` Section 2, state the higher quote, explain the gap, and list scope trade-offs in Section 9.
- Always mention VAT separately in the Total Cost section and ensure platform notes (web/mobile/webview) match the IA tree.

## Example invocation
```text
Generate quote for client 세빛넥스 with meeting date 12.01
```
This reads every required source (prioritising `quotes/12.01/note.md`), runs the sub-commands in sequence, and produces `quotes/12.01_background.md`, `ia_structure.md`, `specification_and_quote.md`, and the merged `quotes/12.01_combined.md`.
