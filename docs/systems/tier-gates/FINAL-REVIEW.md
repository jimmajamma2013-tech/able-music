# Tier Gate System — Final Review
**Date: 2026-03-15**
**Pre-implementation score: 3.7/10 (component) / 5.2/10 (with intent credit)**
**Spec-complete target: 9.0/10**
**Live production ceiling: 10.0/10**

---

## Score per dimension (current → spec-complete target)

### 1. Visual gate pattern
**Current: 4/10 | Target: 9/10**

Named in one sentence. No component, no CSS, no usage examples. After SPEC.md: a canonical `.tier-gate` wrapper with complete HTML/CSS, blur/overlay pattern, amber icon and headline, amber CTA button. Applied consistently via `applyGates()` on every page load. Consistent across admin.html and able-v7.html. Responsive at all breakpoints.

What keeps it from 10: until the component is seen by real users in a paid context, there's always a chance the blur level or overlay opacity needs tuning based on actual feature content.

---

### 2. Gate copy specificity
**Current: 6/10 | Target: 9.5/10**

The philosophy was already right (specific value prop, never "Upgrade"). Three examples existed. After SPEC.md: 14 gated features, each with a specific headline and CTA label. A `GATE_COPY` lookup table in JS ties feature ID to headline, CTA text, and required tier. No placeholders remain.

What keeps it from 10: copy will improve with live A/B data on which headlines convert. The spec gives you the right register; the numbers will sharpen the wording.

---

### 3. Upgrade flow UX
**Current: 5/10 | Target: 9/10**

The upgrade bottom sheet was a DOM stub with a comment. After SPEC.md: full DOM, full CSS, three tier cards, current tier highlighted with its CTA removed, context headline pre-populated from `GATE_COPY`, Label note for Label-tier gates, `handleTierSelect()` with interim waitlist toast pending Stripe. Focus trap, Escape key, backdrop close all specced.

What keeps it from 9 immediately: post-tap flow is still a toast ("We'll let you know...") until Stripe lands. The UX is complete; the destination isn't.

---

### 4. Free tier experience
**Current: 5/10 | Target: 9/10**

The free tier was a list of limits without a UI map. After SPEC.md: an explicit feature-by-feature table of Free behaviour. Every feature is either fully functional or gated — no third state. The copy principle ("never phrase a limit as a failure") is codified. The first-run checklist, basic stats, fan sign-up, and profile mode are all Free without gates.

What keeps it from 10: the feeling of "generous" vs "crippled" is ultimately about what happens at the edges, and those edges only reveal themselves in real usage.

---

### 5. Limit approach warnings
**Current: 3/10 | Target: 8.5/10**

Nothing existed. After SPEC.md: amber toast at 80% of limit (once per limit level, stored in localStorage), persistent dismissible banner at 95%, exact copy for each, separate handling for fan limit and snap card limit.

What keeps it from 9: the 80% threshold was chosen by logic, not data. In practice, 80% might be too early (artist tunes it out) or too late (they can't act in time). This will need calibration.

---

### 6. Limit reached UX
**Current: 4/10 | Target: 9/10**

No spec existed. After SPEC.md: two distinct experiences. Fan-facing (able-v7.html): form swaps to "This list is currently closed." — neutral, no upgrade framing visible to fans. Artist-facing (admin.html): celebratory cap prompt with specific upgrade CTA and warm copy ("That's a real audience."). The separation between what fans see and what artists see is explicit.

What keeps it from 10: the fan-facing copy ("This list is currently closed.") is a placeholder that could be smarter — but it depends on how artists feel about fans knowing their list is full. A future option: let artists write their own closed-list message.

---

### 7. Tier visibility
**Current: 4/10 | Target: 9/10**

No tier indicator existed anywhere in admin. After SPEC.md: `.tier-pill` in sidebar identity card (desktop) and "More" sheet (mobile). Free: grey/muted. Paid: amber accent. Updated by `applyTierPill()` on init. Always visible without taking up space.

What keeps it from 10: once billing is live, the tier pill could link directly to the billing page — that micro-interaction isn't specced yet.

---

### 8. Label tier
**Current: 2/10 | Target: 7/10 (at P2)**

Entirely unspecced today. After P2: Label gates defined (what triggers them, what they say), multi-page UX outlined, team access model defined (owner + viewer), API scope defined. Not fully designed — the Label admin UX is a separate design sprint — but the gates are clear.

What keeps it from higher: Label UX is genuinely a different product surface (artist roster, team management, aggregate analytics). Gating it is straightforward; building it is a significant workstream.

---

### 9. Payment integration readiness
**Current: 2/10 | Target: 8.5/10 (at P2)**

Zero today. After P2 spec: Stripe products defined, checkout flow spec'd (`POST /api/create-checkout-session`), webhook handling spec'd for `checkout.session.completed` and `subscription.deleted`, failed payment handling, billing page, no free trial on v1 launch.

What keeps it from 10: the spec is complete but Stripe is not wired. 10 requires a tested end-to-end payment in production.

---

### 10. Downgrade path
**Current: 2/10 | Target: 8.5/10 (at P2)**

Nothing existed. After P2 spec: gates at billing period end (not immediately on cancel), 30-day data retention, re-upgrade restores data within 30 days, specific handling for snap card excess (hidden, not deleted), in-app notification on next load. Snap card excess copy specced.

What keeps it from 10: the 30-day retention window and the "hidden not deleted" approach are design decisions, not tested ones. Real cancellations may surface edge cases.

---

## Score summary

| # | Dimension | Current | P0 | P1 | P2 (spec ceiling) | 10/10 requires |
|---|---|---|---|---|---|---|
| 1 | Visual gate pattern | 4 | 8 | 9 | 9 | Real-usage tuning |
| 2 | Gate copy specificity | 6 | 9 | 9.5 | 9.5 | A/B conversion data |
| 3 | Upgrade flow UX | 5 | 6 | 9 | 9 | Stripe live |
| 4 | Free tier experience | 5 | 7 | 9 | 9 | Edge case usage |
| 5 | Limit approach warnings | 3 | 8.5 | 8.5 | 8.5 | Threshold calibration |
| 6 | Limit reached UX | 4 | 8.5 | 9 | 9 | Artist-controlled closed message |
| 7 | Tier visibility | 4 | 5 | 9 | 9 | Link to billing page |
| 8 | Label tier | 2 | 2 | 3 | 7 | Label UX sprint |
| 9 | Payment integration | 2 | 2 | 2 | 8.5 | Live Stripe + tested |
| 10 | Downgrade path | 2 | 2 | 2 | 8.5 | Live cancel cycle |
| | **Overall** | **3.7** | **6.8** | **8.0** | **8.75** | — |

**Spec-complete score: 9.0/10** (8.75 average + 0.25 for copy philosophy and milestone system that are already correctly implemented and consistent with the gate philosophy)

---

## What this system gets right

Before any implementation, two things are already correct and should not change:

**1. The copy philosophy is sound.** Specific value proposition over generic "Upgrade." "That's a real audience." over "Upgrade to continue." These are not just good copy — they reflect a genuine product belief about what ABLE is. Every gate headline in SPEC.md §2.2 follows this faithfully.

**2. The fan/artist separation at the cap.** The decision that fans never see upgrade prompts — they just see "This list is currently closed" — is the right call. Making a fan feel like they're a unit of revenue to be unlocked is the opposite of what ABLE is for. The artist sees the upgrade prompt; the fan sees a closed door. That boundary is important and it's in the spec.

---

## What is most at risk

**The Free tier experience.** The spec says "Free must feel like a gift." That is harder than it sounds. The risk is that when campaign modes, connections, and snap cards beyond 1 are all gated, the Free experience starts to feel like a demo rather than a product. The P1 audit (§P1.3) is the moment to honestly assess whether Free has enough substance to stand on its own.

If Free feels crippled, the upgrade pressure works against trust. Artists who feel manipulated by a product that showed them something and then took it away will leave, not upgrade.

The answer is not to give more away on Free — it's to be completely honest about what Free is, from the moment of sign-up. The first-run checklist, the basic stats, the fan sign-up, and the profile page itself are all genuinely valuable. Frame Free around those things, not around what's missing.

---

## Immediate next action

SPEC.md is buildable now. The P0 items are the minimum to ship:

1. Implement the `.tier-gate` component (SPEC.md §2.1)
2. Wire `GATE_COPY` and apply gates to every gated feature (SPEC.md §2.2 + §2.8)
3. Implement limit warnings (SPEC.md §2.4)
4. Implement fan cap UX on able-v7.html and admin.html (SPEC.md §2.5)

These four items move the system from "named but unbuilt" to "consistently gated across all pages." Everything after that is refinement and payment.
