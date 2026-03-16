# Tier Gate System — Analysis
**Date: 2026-03-16**
**Overall score: 3.7/10**
**Status: Spec complete in SPEC.md — implementation is prototype-grade**

---

## Summary

The tier gate system has a complete spec (`SPEC.md`), correct copy philosophy, and a detailed component inventory. The SPEC.md is buildable: it has exact HTML, exact CSS, exact JS, and exact copy for every gated feature. The gap is that none of it is implemented consistently in the live admin.html. The philosophy is right; the execution is prototype-grade.

---

## Critical security vulnerability: localStorage manipulation bypasses every gate

**This is the most important thing to understand about the current tier gate system.**

Every tier check reads from `localStorage.getItem('able_tier')`. A fan — or a curious user — can open browser DevTools, type:

```javascript
localStorage.setItem('able_tier', 'artist-pro')
```

and immediately access every Artist Pro feature. No authentication. No server validation. Every tier gate is bypassable in 10 seconds.

**This is a V1 acceptable risk.** Here is why:

1. **No real money is at stake yet.** There is no Stripe integration. No subscriptions are being charged. There is nothing to steal — the "Pro features" that would be unlocked are analytics displays and broadcast UIs, not paid content or financial transactions. The risk ceiling is currently zero.

2. **ABLE has no registered users yet.** The product is in pre-launch. There is no population of bad actors to exploit this.

3. **The correct fix (server-side enforcement via Supabase RLS) is the right V2 architecture.** Implementing it before Supabase auth is wired would create false security — secure-looking localStorage gates that could still be manipulated once the backend is added incorrectly.

**This vulnerability must be documented, accepted for V1, and closed in V2.**

**Document this as a known vulnerability in SPEC.md and PATH-TO-10.md.** Any developer who reads the codebase must know: the tier gates are currently client-side only, bypassable via DevTools, and protected only by the fact that there is nothing of monetary value to steal yet.

**The V2 fix:** Supabase Row Level Security (RLS) on all artist data tables. Tier is read from the authenticated user's profile record, not from localStorage. The client receives only what the server authorises. See PATH-TO-10.md §V2 for the exact architecture.

---

## Dimension scores

### 1. Visual gate pattern — 5/10

**What exists:** SPEC.md §2.1 has the complete `.tier-gate` component: HTML structure, full CSS, JS gate check function (`applyGates()`). The component is not yet applied consistently in admin.html — it is present for some features and absent or inconsistent for others.

**Gap:** The `applyGates()` function is not called on page load in the current admin.html. Some features show a basic toast or redirect rather than the blur/overlay pattern. The `--acc-rgb` CSS variable may need to be added to admin.html's CSS token set if not already present (the overlay border uses `rgba(var(--acc-rgb), 0.22)`).

---

### 2. Gate copy specificity — 7/10

**What exists:** SPEC.md §2.2 has a complete inventory of 14 gated features with specific headline and CTA for each. The `GATE_COPY` JS lookup table (SPEC.md §2.8) maps every feature ID to its headline, CTA text, and required tier. The copy philosophy is correct and consistent: specific value prop, never generic "Upgrade."

**Gap:** The `GATE_COPY` object is not yet in admin.html's JavaScript. Some gates in the current admin.html either don't exist or use placeholder copy that doesn't match the spec.

---

### 3. Upgrade bottom sheet — 5/10

**What exists:** SPEC.md §2.3 has the complete upgrade sheet: full DOM with three tier cards, CSS, `openUpgradeSheet(featureId)` and `closeUpgradeSheet()` functions, tier highlighting logic, and `handleTierSelect()` interim toast.

**Gap:** The upgrade sheet in current admin.html is a partial implementation. The context headline pre-population (which populates the sheet with the specific gate reason) is not consistently wired. The tier cards may not reflect the exact SPEC.md structure. Focus trap on sheet open is not implemented.

---

### 4. Free tier experience — 5/10

**What exists:** SPEC.md §2.6 has a complete feature-by-feature table of Free tier behaviour. Basic stats, fan sign-up, profile state, first-run checklist — all Free and ungated. Campaign modes, snap cards beyond 1, connections, email broadcasts — all gated.

**Gap:** The Free experience has not been formally audited against the spec table. Some gates may be missing (a feature that should be gated is silently inaccessible), and some features that should be Free may accidentally have gate logic applied to them. The P1 audit task (`PATH-TO-10.md §P1.3`) is the moment to reconcile this.

---

### 5. Fan count progress bar — 0/10

**What exists:** SPEC.md §2.4 has `checkFanLimitWarnings()` with amber toast at 80 fans, persistent banner at 95 fans, and fan count progress component. `monetisation/PATH-TO-10.md §P0.1` has the complete `renderFanCapProgress()` function and the fan cap progress bar component with full HTML/CSS.

**Gap:** Not implemented. There is no visual progress bar in the current admin.html Fans page. A Free artist approaching their 100-fan limit sees nothing — just a number. This is the most important monetisation activation mechanism in V1 and it is at 0%.

---

### 6. Limit reached UX — 4/10

**What exists:** SPEC.md §2.5 has the complete fan cap UX: `.fan-list-cap-prompt` for admin.html and `.fan-cap-message` for able-v7.html. The fan-facing copy ("This list is currently closed.") is correct and neutral.

**Gap:** The cap prompt is not consistently shown in admin.html when fans.length >= 100. The able-v7.html sign-up form does not convert to the cap message on cap. The separation between what fans see (no upgrade language) and what artists see (upgrade prompt) is specced but not implemented.

---

### 7. Tier visibility (pill in admin sidebar) — 3/10

**What exists:** SPEC.md §2.7 has the `.tier-pill` component: HTML, CSS, and `applyTierPill()` JS function. The pill shows Free/Artist/Artist Pro/Label with amber accent for paid tiers.

**Gap:** The tier pill may not be present in the current admin.html sidebar or mobile "More" sheet. The artist's current tier is not visually surfaced in the primary navigation. An artist has no passive awareness of their tier.

---

### 8. localStorage manipulation vulnerability — documented, not mitigated
**Current risk: low (V1, no real money at stake). Future risk: high (once Stripe is live).**

As documented at the top of this file: `localStorage.setItem('able_tier', 'artist-pro')` bypasses every gate. This is a known, accepted, documented V1 vulnerability. It must be closed before Stripe goes live.

---

### 9. Payment integration readiness — 2/10

**What exists:** SPEC.md §P2.1 specifies the Stripe integration architecture: products defined, checkout flow, webhook handling for `checkout.session.completed` and `subscription.deleted`.

**Gap:** No Stripe integration is wired. The `handleTierSelect()` function shows a toast ("We'll let you know when billing is live.") instead of redirecting to Stripe Checkout. This is the correct interim state — but it means the upgrade sheet, while visually complete, leads nowhere actionable.

---

### 10. Downgrade path — 2/10

**What exists:** SPEC.md §P2.2 specifies the downgrade path: features gate at billing period end, 30-day data retention, snap card excess is hidden not deleted, re-upgrade within 30 days restores all data.

**Gap:** Not specced beyond the outline. The exact Stripe webhook handling for `customer.subscription.deleted`, the grace period logic, and the in-app notification are all P2 items. Correct to leave for P2 — there are no subscriptions to cancel yet.

---

## Score summary

| # | Dimension | Score |
|---|---|---|
| 1 | Visual gate pattern | 5/10 |
| 2 | Gate copy specificity | 7/10 |
| 3 | Upgrade flow UX | 5/10 |
| 4 | Free tier experience | 5/10 |
| 5 | Fan count progress bar | 0/10 |
| 6 | Limit reached UX | 4/10 |
| 7 | Tier visibility | 3/10 |
| 8 | localStorage vulnerability | documented, V1 acceptable |
| 9 | Payment integration readiness | 2/10 |
| 10 | Downgrade path | 2/10 |
| | **Overall** | **3.7/10** |

---

## What this analysis surfaces

The tier gate system is the most under-implemented major system relative to its spec completeness. SPEC.md is thorough and buildable. The gap is execution: `applyGates()` is not called, `GATE_COPY` is not in the codebase, the fan cap progress bar does not exist, the tier pill is not visible.

The P0 tasks are all mechanical: add the JS, add the CSS, call the functions on page load. The philosophy is already correct. The code just needs to be written and wired.

**The localStorage vulnerability is the most important architectural note in this file.** It is not an emergency in V1, but it becomes one the moment Stripe is live. The V2 plan — Supabase RLS + server-side tier enforcement — must be implemented before any real money changes hands.
