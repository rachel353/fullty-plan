# Design Insights: Payment UI Patterns

> Source: Ink 충전 결제 및 결제 완료 화면 요구사항 (change-2026-01-13-1640)
> Extracted: 2026-01-13

---

## Insight: Financial values require strong typographic weight for rapid comparison

### Context

* Screen type: Payment/purchase page (Ink charging flow)
* User decision: Compare amounts and prices across options, select a package

### Observation

* Multiple pricing options displayed as selectable cards
* Each option shows: Ink quantity, bonus amount, discount rate, final price
* Four distinct numerical values per option that must be compared across options
* Decision requires scanning multiple numeric values quickly

### Interpretation

Financial decisions involve comparing multiple numeric values simultaneously. When amounts and prices have weak visual weight, users must read each number rather than scan. This increases cognitive load and extends decision time. In payment contexts where trust is critical, harder-to-scan pricing creates hesitation. Bold treatment creates clear numeric entry points for rapid comparison without sacrificing the overall information hierarchy.

### Principle

Financial values (amounts, prices, quantities) in purchase flows require elevated font-weight (bold) to enable rapid scanning and comparison. This is distinct from general content hierarchy and applies specifically to numerical purchase-relevant data.

### Applicability

* Pricing pages with multiple tiers/options
* Shopping carts with line items
* Invoice/receipt displays
* Subscription plan comparisons
* Wallet balance displays
* Transaction history lists

---

## Insight: Primary CTA in transactional flows requires maximum visual contrast

### Context

* Screen type: Payment confirmation page (transactional endpoint)
* User decision: Confirm and execute payment action

### Observation

* Payment page has single primary action: "결제하기" (Make Payment)
* Button shows dynamic amount: "₩5,000 결제하기"
* Page contains multiple secondary elements (payment method options, terms checkbox)
* Action is irreversible/consequential (financial transaction)

### Interpretation

Transactional endpoints represent high-stakes user decisions. In environments with multiple interactive elements (form fields, checkboxes, radio buttons), the primary CTA must be immediately identifiable without scanning. Black fill buttons provide maximum contrast against white/light backgrounds and clearly signal "this is the action." Weaker button treatments (outlines, gray fills) in transactional contexts create hesitation as users question which element executes the action.

### Principle

Primary CTAs in transactional flows (payments, confirmations, submissions) should use maximum contrast treatment (filled, dark background). The visual weight of the CTA must clearly exceed all other interactive elements on the page.

### Applicability

* Payment confirmation pages
* Checkout flows
* Form submission endpoints
* Delete/destructive action confirmations
* Account creation final steps
* Subscription activation pages
