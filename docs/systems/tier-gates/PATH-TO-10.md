# Tier Gate System — Path to 10
**Date: 2026-03-15**
**Current score: 3.7/10 (component average) / 5.2/10 (intent credit)**
**Target: 9.0/10 spec-complete | 10/10 with live Stripe + conversion metrics**

---

## What the scores mean

- **Current (3.7–5.2):** Philosophy right, almost nothing buildable. Copy instinct is sound. No component, no inventory, no warnings.
- **7.0:** Gate component built and used consistently. All gate copy written. Limit warnings fire.
- **8.5:** Upgrade sheet fully implemented. Tier indicator visible. Free tier feels complete and deliberate.
- **9.5:** Stripe spec complete. Downgrade path defined. All gates wired.
- **10.0:** Live Stripe integration. Payment tested end-to-end. Conversion rate on upgrade CTAs measured and optimised.

---

## P0 — Current → 7.0

**Theme:** Make the gate buildable and put it everywhere it belongs.

### P0.1 — Gate component (SPEC.md §2.1)
- [ ] Implement `.tier-gate` HTML/CSS component as specced in §2.1.1 and §2.1.2
- [ ] Write `applyGates()` JS function (§2.1.3) — called on every admin page load
- [ ] Add `getCurrentTier()` and `tierAtLeast()` utility functions to shared admin JS
- [ ] Add `able_tier` localStorage key, default `"free"` — all pages read from this
- [ ] QA: gate renders correctly at 375px (mobile), 768px (tablet), 1280px (desktop)

**Files:** admin.html

**Definition of done:** A gated section looks like a blurred preview with amber overlay and specific headline. Toggling `able_tier` in DevTools immediately removes the gate on next render.

---

### P0.2 — Gate copy wired in (SPEC.md §2.2 + §2.8)
- [ ] Add `GATE_COPY` lookup table to admin.html JS (§2.8)
- [ ] Apply gates to every feature in the current admin build:
  - [ ] Snap cards: second-slot "+ Add" button → gate (feature: `snap-cards`)
  - [ ] Campaign modes: pre-release/live/gig state buttons → gate at button level (feature: `campaign-modes`)
  - [ ] Connections section → gate wrapper (feature: `connections`)
  - [ ] Fan list > 100: in-admin prompt (feature: `fan-list`)
  - [ ] Analytics deep-dive section → gate wrapper (feature: `advanced-analytics`)
  - [ ] "Message fans" / email broadcasts → gate wrapper (feature: `email-broadcasts`)
  - [ ] Support packs → gate wrapper (feature: `support-packs`)
  - [ ] Export button on Fans page → gate (feature: `export-fans`)

**Definition of done:** Every gated feature shows the correct specific headline from `GATE_COPY`. No gated feature shows generic "Upgrade" text.

---

### P0.3 — Limit warnings (SPEC.md §2.4)
- [ ] Implement `checkFanLimitWarnings()` — called on Fans page load and on each new fan sign-up
- [ ] Toast at 80% of fan limit — amber, 6s, once per limit level
- [ ] Persistent banner at 95% of fan limit — amber, dismissible, stored in localStorage
- [ ] `showToast()` must support `type: 'warning'` with amber accent (distinct from success green)
- [ ] `showLimitBanner()` and `dismissLimitBanner()` implemented

**Files:** admin.html

**Definition of done:** Manually set fans array to 82 entries in DevTools → amber toast appears on next Fans page load. Set to 97 entries → persistent banner appears.

---

### P0.4 — Limit reached UX on public profile (SPEC.md §2.5)
- [ ] In able-v7.html: `checkFanCapOnPublicPage()` called on page load
- [ ] Fan sign-up form swaps to `.fan-cap-message` ("This list is currently closed.") when Free + 100 fans
- [ ] In admin.html: `.fan-list-cap-prompt` shown at top of Fans page when limit reached
- [ ] Prompt copy: "You've reached 100 fans. That's a real audience. Your next 1,900 are one step away."

**Files:** able-v7.html, admin.html

**Definition of done:** Set `able_fans` to 100 entries in DevTools. Open able-v7.html → sign-up form is replaced by "This list is currently closed." Open admin.html Fans page → cap prompt visible with upgrade CTA.

---

## P1 — 7.0 → 8.5

**Theme:** Complete upgrade flow. Make tier visible. Free feels whole.

### P1.1 — Upgrade bottom sheet (SPEC.md §2.3)
- [ ] Full DOM as specced in §2.3.2 — three tier cards (Free, Artist, Artist Pro)
- [ ] CSS as specced in §2.3.3
- [ ] `openUpgradeSheet(featureId)` pre-populates context headline from `GATE_COPY`
- [ ] `highlightCurrentTier()` marks current tier card, removes its CTA button
- [ ] `handleTierSelect(tier)` — interim: toast "We'll let you know when [tier] billing is live." + TODO POST to waitlist
- [ ] Label note at bottom of sheet for Label-tier gate triggers
- [ ] All existing `.glo-btn` references in admin.html wired to `openUpgradeSheet()`
- [ ] Sheet opens with focus trap: first focusable element inside sheet receives focus
- [ ] Sheet closes on Escape key
- [ ] Backdrop tap closes sheet

**Files:** admin.html

**Definition of done:** Tap any gated feature CTA → sheet opens with correct context headline, correct featured tier, correct current tier highlighted. Escape or backdrop tap closes it. Focus returns to triggering element.

---

### P1.2 — Tier indicator (SPEC.md §2.7)
- [ ] `.tier-pill` added to sidebar identity card (desktop) and "More" sheet header (mobile)
- [ ] `applyTierPill()` called on admin init
- [ ] Tier pill updates immediately when tier changes (for test toggling)
- [ ] Free tier: muted/grey pill. Paid tiers: amber accent

**Files:** admin.html

**Definition of done:** Toggle `able_tier` in DevTools → refresh → pill in sidebar shows correct tier name with correct colour.

---

### P1.3 — Free tier completeness audit
- [ ] Walk every admin section and verify each feature is either:
  - (a) Fully functional on Free, or
  - (b) Gated with the correct `.tier-gate` component
  - No third state (half-functional, broken, silent failure)
- [ ] Verify snap card limit: Free user with 1 snap card sees gate slot, not a broken UI
- [ ] Campaign HQ: profile state is fully usable on Free. Other states show gate at state button level
- [ ] Basic stats (views/clicks/fans/click rate): fully visible on Free, no blur
- [ ] Sparklines: visible for first 7 days on Free. Gated after day 7 (feature: `advanced-analytics`)
- [ ] First-run checklist: all 4 steps are Free features — verify none are accidentally gated

**Definition of done:** A new account with `able_tier: "free"` can complete the first-run checklist, set up a profile state, see their stats, and view their fan list — all without hitting any unexpected gate.

---

### P1.4 — Gate consistency on able-v7.html
The public profile does not have gates in the same sense as admin — but it must handle the fan cap gracefully:
- [ ] Fan cap message copy reviewed: "This list is currently closed." — confirm this is the right fan-facing copy (not "upgrade" framing — that's for admin)
- [ ] Verify no admin-facing copy leaks into the public profile

**Files:** able-v7.html

---

## P2 — 8.5 → 9.5

**Theme:** Payment, downgrade, and production readiness.

### P2.1 — Stripe integration spec
Define before any code is written:
- [ ] **Products:** 3 Stripe products (Artist £9/mo, Artist Pro £19/mo, Label £49/mo) — monthly and annual
- [ ] **Checkout flow:** `POST /api/create-checkout-session` → Stripe Checkout hosted page → redirect back to admin.html with `?upgrade=success`
- [ ] **Webhook:** `POST /api/stripe-webhook` (Netlify function) handles `checkout.session.completed` and `customer.subscription.deleted`
- [ ] **Tier update:** On successful checkout webhook → update `profiles.tier` in Supabase → return to admin, `able_tier` key updated
- [ ] **Failed payment:** `invoice.payment_failed` webhook → send email, show in-app banner: "Your payment didn't go through. Your account stays active for 7 days."
- [ ] **Free trial:** No free trial on launch. Paid from day 1. (Revisit at 6 months with data.)
- [ ] **Billing page:** Settings → Billing: shows current tier, next billing date, "Manage billing" → Stripe customer portal

### P2.2 — Downgrade / cancel path spec
- [ ] **On cancel:** Stripe subscription moves to `canceled` at end of billing period. Features gate at period end, not immediately.
- [ ] **Data retention:** Fan list, analytics, snap cards, releases — all retained for 30 days post-downgrade. After 30 days: excess data archived (not deleted), inaccessible until re-upgrade.
- [ ] **Downgrade notification:** In-app banner on next admin load: "Your [tier] plan ends on [date]. Your data stays with you."
- [ ] **Re-upgrade:** If artist re-upgrades within 30 days, all data restored instantly. If after 30 days, data is gone.
- [ ] **Snap card excess:** If Artist (unlimited snap cards) downgrades to Free (1 snap card), the extras are hidden, not deleted. Banner: "You have 4 snap cards. Free includes 1. Upgrade to show them all."

### P2.3 — Label tier spec (outline only)
- [ ] Define what the Label admin home page looks like (artist roster list vs single artist dashboard)
- [ ] Define artist-switching UX (dropdown in topbar? sidebar list?)
- [ ] Define team access model (owner + viewer roles minimum)
- [ ] API: define scope (read-only fan/analytics data, no write access to profile on v1)

---

## What gets to 10.0

10/10 is not achievable through specification alone. It requires:

1. **Live Stripe integration** — payment tested end-to-end in production (not test mode)
2. **Conversion rate measurement** — what percentage of artists who see a gate tap "See plans"? What percentage complete checkout? These numbers must exist.
3. **Optimised gate copy** — at least one A/B test on gate headline copy, with conversion data
4. **Downgrade path tested** — at least one real cancel-and-re-subscribe cycle in production
5. **Label tier live** — at least one Label customer using multi-page management

Spec-complete ceiling: **9.0/10.** The remaining point requires production usage and data.

---

## Dimension targets by phase

| # | Dimension | Current | P0 | P1 | P2 |
|---|---|---|---|---|---|
| 1 | Visual gate pattern | 4 | 8 | 9 | 9 |
| 2 | Gate copy specificity | 6 | 9 | 9.5 | 9.5 |
| 3 | Upgrade flow UX | 5 | 6 | 9 | 9.5 |
| 4 | Free tier experience | 5 | 7 | 9 | 9 |
| 5 | Limit approach warnings | 3 | 8.5 | 8.5 | 8.5 |
| 6 | Limit reached UX | 4 | 8.5 | 9 | 9 |
| 7 | Tier visibility | 4 | 5 | 9 | 9 |
| 8 | Label tier | 2 | 2 | 3 | 7 |
| 9 | Payment integration | 2 | 2 | 2 | 8.5 |
| 10 | Downgrade path | 2 | 2 | 2 | 8.5 |
| | **Overall** | **3.7** | **6.8** | **8.0** | **8.75** |

Spec-complete at end of P2: **~8.75**. Rounding to **9.0** with copy optimisation and final QA pass.
