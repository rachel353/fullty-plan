# Design Insight: Live Preview Must Reflect Actual Output to Prevent Misaligned Decisions

## Context

* Screen type: Content creation/management interface (banner editing)
* User decision: Configure banner design, finalize banner appearance

## Observation

* Admin edits banner properties in modal form
* Banner preview area exists but does not update with image changes
* Actual preview-to-output gap: image properties edited but not visible in preview
* Users cannot verify visual result before saving
* Manager must guess how banner will appear to end users

## Interpretation

When a preview area fails to update with content changes, users cannot verify their design decisions match the actual output. This creates a verification gap where users make choices blind to real-world results. The mental model of "seeing what users will see" is broken, forcing managers to edit-save-review cycles instead of iterative refinement. This delays decision-making and increases errors in content presentation.

## Principle

Preview windows in creation/editing interfaces must update in real-time with all content changes. This includes images, text, overlays, and styling. Real-time preview enables immediate feedback and confident decision-making.

## Applicability

* Content creation interfaces (banners, email templates, ads)
* Form previews and WYSIWYG editors
* Configuration interfaces with visual output
* Any editing flow where visual appearance is customer-facing
