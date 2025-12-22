"""
Generate a client proposal document based on the following inputs:

- Client Name: [CLIENT_NAME]
- Proposal Overview/Content: [PROPOSAL_OVERVIEW]

Instructions:

1. Locate the client folder formatted as `YY_MM_CLIENT_NAME/`.
2. Read internal company introduction materials (e.g., `appendix/company_intro.md` or `appendix/*.md`) for up-to-date descriptions, history, achievements, team profiles, and core value proposition.
3. Consult the following files for client/project-specific information:
   - `quotes/[MM.DD]/guide.md` (for client priorities)
   - `meeting_scripts/[MM.DD]/requirements.md` (for technical/functional requirements)
   - `meeting_scripts/[MM.DD]/summary.md` (for meeting summary and relationship context)
   - `quotes/[MM.DD]/note.md` (**if exists, this takes top priority for corrections or clarifications**)
   - Any previous `quotes/*.md` files for historical reference 
   - `appendix/requirements.md` (**if present, must be reflected**)
4. Optionally, use `meeting_scripts/[MM.DD]/script.md` and any other `appendix/*.md` for detailed context.
5. Synthesize and generate a comprehensive proposal document including:
   - Cover page with project/client name, date, and title
   - Executive summary leveraging both the provided content ([PROPOSAL_OVERVIEW]) and company strengths found in internal materials
   - Project objectives, value propositions, and partnership rationale
   - Proposed methodology/approach tailored to the client needs
   - Timeline, deliverables, and team introduction (using latest company profiles)
   - Pricing (if present in `specification_and_quote.md` or other quote docs)
   - Contact information and next steps
6. Save as `quotes/[MM.DD]/proposal.md` within the client folder.
7. Use other commands (such as those for background generation, specification, etc.) where appropriate to enrich the document or fetch required sections.
8. Ensure that content in `quotes/[MM.DD]/note.md` (if exists) overrides or corrects all other references on conflicting points.
9. If any required file or folder does not exist, create it accordingly.
10. Never output the full internal file contents; summarize, synthesize, and appropriately cite.

Output format should resemble a complete, high-quality proposal in markdown, with logical structure and proper sections.

Example Command Usage:

```
Generate a proposal for client [CLIENT_NAME] using provided proposal content, referencing company profile and all related quote/meeting materials as described above. Output file: quotes/[MM.DD]/proposal.md
```
(Note: The actual command should allow variable insertion for [CLIENT_NAME], [MM.DD], and [PROPOSAL_OVERVIEW].)

---

