# Design Insights: Financial Hierarchy and Flow Simplification

## Insight: Secondary financial metadata must be visually subordinate to prevent decision interference

### Context

* Screen type: Financial summary/settlement page
* User decision: Understand how much money is available for withdrawal

### Observation

* Fee amounts, pre-fee totals, and net settlement amounts displayed at similar visual weight
* Multiple currency-related numbers compete for attention
* User's primary concern is the final settlement amount (actionable number)
* Fee details are reference information, not decision-driving data

### Interpretation

When fee breakdowns and gross amounts share visual prominence with net settlement figures, users must mentally filter irrelevant numbers to find the actionable one. This increases cognitive load on financial screens where clarity is critical. The user's decision ("how much can I withdraw?") is obscured by supporting metadata that serves transparency but not action.

### Principle

On financial summary screens, subordinate non-actionable metadata (fees, gross amounts, rates) to minimal visual weight (small size, reduced opacity), and elevate the single actionable figure (net amount) to dominant visual prominence.

### Applicability

Settlement dashboards, invoice summaries, transaction receipts, pricing breakdowns, tax calculation displays, any screen showing derived financial figures alongside their components.

---

## Insight: Pre-action state change preview reduces decision uncertainty in irreversible transactions

### Context

* Screen type: Payment/purchase confirmation page
* User decision: Commit to a purchase (spend real money)

### Observation

* User sees current balance and purchase amount
* No visibility into post-purchase state before confirming
* Payment is irreversible once confirmed
* User must mentally calculate resulting balance

### Interpretation

In irreversible financial transactions, users need to verify the outcome is acceptable before committing. Forcing mental arithmetic ("current balance + purchase amount = new balance") adds friction and uncertainty at the highest-stakes moment. Showing before/after state eliminates this calculation and provides confidence to proceed.

### Principle

For irreversible transactions, display both the current state and the projected post-action state side by side, eliminating the need for user mental calculation at the decision point.

### Applicability

Currency purchases, subscription upgrades, point redemptions, balance transfers, any transaction where users need to verify the outcome before committing.

---

## Insight: Role-irrelevant navigation options create decision noise on identity-scoped pages

### Context

* Screen type: My page / personal dashboard
* User decision: Find relevant actions for current role (reader vs creator)

### Observation

* Reader-role users see creator-related menu items (setup, edit)
* Multiple navigation options visible that only apply to a different role context
* User must evaluate each option's relevance to their current intent
* Creator actions require context-switching to a different interface (Studio)

### Interpretation

Exposing role-inappropriate navigation items forces users to distinguish between "actions I can take here" and "actions that belong elsewhere." This creates decision noise - users scan irrelevant options before finding relevant ones. A single CTA to the appropriate context (Studio) eliminates per-item evaluation and provides a clear boundary between role contexts.

### Principle

On role-scoped pages, expose only actions relevant to the current role context. Cross-role functionality should be a single navigation CTA to the appropriate context, not individual action links mixed into the current view.

### Applicability

Multi-role dashboards, admin/user hybrid interfaces, freemium/premium feature displays, any interface where users operate in distinct capability contexts.
