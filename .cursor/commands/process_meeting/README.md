# Process Meeting Command

`process_meeting` turns a raw meeting transcript into three structured deliverables—`summary.md`, `requirements.md`, and `feedback.md`—and then decides whether to launch `generate_quote`. It should be run every time a new script is dropped into `meeting_scripts/[MM.DD]/`.

## When to run
- A client meeting transcript (or corrected `note.md`) has been saved to `meeting_scripts/[MM.DD]/`.
- You need to overwrite outdated summaries/requirements after revisions.
- Sales wants coaching feedback on how the conversation went.

## Inputs & prerequisites
- `client_name` plus `meeting_date` (`MM.DD`).
- Client folder formatted `YY_MM_CLIENT_NAME/` with `meeting_scripts/[MM.DD]/script.md` already present.
- If available, `meeting_scripts/[MM.DD]/note.md` **must** be read first and its content overrides all other files.
- Previous meeting folders and `appendix/*.md` files provide historical context and should be consulted when available.

## Workflow overview
1. **Context setup**
   - Locate the client folder and target meeting directory.
   - Read prior meeting summaries to understand ongoing agreements.
   - Load `note.md` (highest priority), then `script.md`, and any appendix references.
2. **Summary extraction (`process_meeting/summary`)**
   - Use the provided Korean prompt to capture only confirmed agreements across Scope, Budget, Timeline, Responsibilities, Next Actions, and Pending Items.
   - `summary.md` is the authoritative source for all downstream work and is overwritten on each run.
3. **Requirements generation (`process_meeting/requirements`)**
   - Pull requirements strictly from `summary.md` Sections 1-4 (overridden by `note.md` when present).
   - Assign REQ IDs using the `REQ-XYY` pattern where `X` equals the chronological meeting number.
   - Group items by category (core features, integrations, etc.) and exclude anything not fully agreed.
4. **Sales feedback (`process_meeting/feedback`)**
   - Analyze the transcript to document concrete conversation snippets, issues, and improved responses, plus a short strengths section.
5. **Quote decision**
   - Inspect `summary.md` Section 2 (Budget & Model), Section 5 (Next Actions), and major scope changes.
   - If any quote indicators exist, automatically call `generate_quote` with the same client/date so the quote folders stay in sync.

### Main command (`process_meeting/main.md`)
The `main.md` file is the orchestration script Cursor executes for “Process meeting script …” prompts. It:
- Validates the client folder, meeting date, and existence of `meeting_scripts/[MM.DD]/script.md`.
- Reads `meeting_scripts/[MM.DD]/note.md` first (if present) and keeps it attached to every sub-command so corrections override the transcript.
- Pulls context from earlier meetings and appendix files to resolve ambiguities before extraction.
- Runs `summary`, then `requirements`, then `feedback`, enforcing overwrites in that order.
- Evaluates `summary.md` against the quote trigger rules and, when needed, immediately launches `generate_quote` with the same parameters.

## Sub-command quick reference
| Command | Output | Notes |
| --- | --- | --- |
| `process_meeting/summary` | `meeting_scripts/[MM.DD]/summary.md` | Must run first. Only confirmed agreements; follows the fixed template with Sections 1-6. Prioritises `note.md` content. |
| `process_meeting/requirements` | `meeting_scripts/[MM.DD]/requirements.md` | Requires summary. Extracts Sections 1-4, assigns chronological REQ IDs, organises by category, and ignores undecided items. |
| `process_meeting/feedback` | `meeting_scripts/[MM.DD]/feedback.md` | Auto-run after requirements. Captures conversation snippets, issues, improvements, and brief strengths based on the transcript (+ note.md). |
| `generate_quote` (auto) | Quote files in `quotes/[MM.DD]/` | Triggered when summary shows budget/quote requests, new scope, or first-meeting situations. See `generate_quote/README.md` for details. |

## Outputs
- `meeting_scripts/[MM.DD]/summary.md`
- `meeting_scripts/[MM.DD]/requirements.md` (with REQ IDs such as `REQ-201`)
- `meeting_scripts/[MM.DD]/feedback.md`
- (Conditional) Quote artifacts under `quotes/[MM.DD]/` plus `[MM.DD]_combined.md`

## Quote trigger checklist
Run `generate_quote` when **any** of the following are true:
- Section 2 of `summary.md` mentions 견적 범위, 예산, 결제 방식, or any explicit budget agreement.
- Section 5 lists next actions such as "견적서", "상세 기능 명세", or similar commitments.
- New/changed requirements materially affect pricing compared to earlier meetings.
- It is the client’s first meeting (no prior quotes exist).

## Source priority & best practices
- Always consume sources in this order: `note.md` → previous meeting outputs → `script.md` → appendix materials.
- If `note.md` exists, treat it as canonical for corrections, overrides, and special handling instructions.
- Remember that transcripts may contain recognition errors—cross-check with earlier meetings before marking something as “agreed”.
- Requirements must reference the client’s own words; ignore developer suggestions unless the client explicitly accepted them.
- When assigning REQ IDs, determine the chronological meeting index by sorting existing `meeting_scripts/[MM.DD]/` folders.
- If you rerun the command after edits, the files will be overwritten, so keep any manual notes in `note.md` instead.

## Example invocation
```text
Process meeting script for client 세빛넥스 with meeting date 11.06
```
This locates `25_10_세빛넥스/meeting_scripts/11.06/`, prioritises `note.md` over `script.md`, produces `summary.md`, `requirements.md`, `feedback.md`, and—because the summary mentions quote deliverables—automatically starts `generate_quote` for the same client/date.
