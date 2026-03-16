# ABLE — Monetisation: Path to 10/10
**System:** Monetisation
**Current average:** 3.8/10 (see ANALYSIS.md)
**Date:** 2026-03-16

---

## What 10/10 looks like

A 10/10 monetisation system means:
- Artists on ABLE earn more than artists off ABLE, net of all fees
- ABLE earns sustainable revenue at every stage of its growth
- No artist is surprised by a fee they didn't expect
- The take rate is competitive at every tier
- Transaction infrastructure is clean, automatic, and trustworthy
- The "Made with ABLE" loop drives measurable organic acquisition
- Unit economics are understood and measured in real time

---

## The path, in order

### Step 1: Wire subscription billing (prerequisite for everything)
**Priority: P0 — must happen before launch**
- Stripe subscriptions for Free, Artist, Artist Pro, Label tiers
- Annual billing toggle ("2 months free" framing)
- Auto-trial: release date set → 14-day Artist trial (Stripe trial on subscription object)
- Auto-trial: gig mode → same
- Upgrade flow from within admin.html: pricing modal → Stripe Checkout → success → tier unlocked
- Trial expiry → email notification → 7-day grace → downgrade
- Churn: cancellation flow with "pause for 1 month" option before hard cancel

**Score after this step: 6.5/10** (billing live, but no transaction revenue)

---

### Step 2: Support Packs + Stripe Connect (first transaction revenue)
**Priority: P1 — Artist Pro feature**
- Stripe Connect Express onboarding in admin.html
- Support Pack creation (label, description, price, type: one-time / monthly)
- Stripe Product + Price creation via server function
- Fan payment: Stripe Payment Element bottom sheet
- Fee display: before artist enables, on every transaction
- Earnings dashboard in admin: gross / ABLE fee / Stripe fee / net / total received
- "We only earn when you earn" copy in setup flow

**Score after this step: 8.0/10** (transaction revenue live, architecture solid)

---

### Step 3: Close Circle subscriptions
**Priority: P2**
- Monthly fan subscription tiers
- Stripe Subscription management (artist Stripe Connect account)
- Fan access gating for Close Circle content (unlocked on payment confirmation)
- Dunning: failed payment → retry logic → suspension → cancellation (all via Stripe webhooks)
- Artist's Close Circle dashboard: fan count, monthly revenue, churn rate

**Score after this step: 8.5/10**

---

### Step 4: Unit economics and analytics dashboard
**Priority: P2**
- ABLE internal dashboard (not artist-facing): MRR, ARR, churn rate, LTV, CAC
- Per-artist: tier, tenure, transaction volume, lifetime value
- "Made with ABLE" click tracking + referral → registration → paid conversion funnel
- Monthly cohort analysis: which month's cohorts have lowest churn?
- This data is for ABLE operations, not surfaced to artists

**Score after this step: 9.0/10**

---

### Step 5: Annual billing and retention improvements
**Priority: P2**
- Annual subscription option across all paid tiers
- "Switch to annual — save 2 months" prompt in admin dashboard after 3 months monthly
- Churn save: "pause subscription for 30 days" option in cancellation flow
- Win-back email sequence: day 7 post-cancel, day 30, day 90 ("your list is still there whenever you're ready")
- Usage health score: artists who post snap cards, broadcast, and log in regularly → lower churn. Surface low-health artists for intervention.

**Score after this step: 9.5/10**

---

### Step 6: Affiliate, freelancer monetisation, API
**Priority: P3**
- Ticket affiliate wrapping (negotiate with Bandsintown / Dice)
- Freelancer Premium tier (Phase 2: £9/month)
- Booking deposit facilitation (freelancer Stripe Connect, 3% take)
- Label API read access (read-only analytics API, included in Label tier)
- Standalone API product evaluation (once 5,000+ artists)

**Score after this step: 10/10**

---

## Honest ceilings

**Transaction commission ceiling:** The commission model will never be the majority of ABLE's revenue. At mature scale with strong artist adoption, it may represent 15–20% of total revenue. The SaaS model is structurally more scalable and predictable. Commission is a differentiator, not the business.

**Take rate ceiling:** 8% on any transaction type, full stop. Any temptation to raise this to match Patreon or Gumroad must be resisted. The positioning as "the platform that charges less" is a long-term strategic asset. It cannot be compromised for short-term margin improvement.

**Advertising ceiling:** Zero. There is no monetisation scenario in which ABLE runs third-party advertising. The trust model depends on this absolutely.

**Data product ceiling:** Zero for external sale. Fan and artist data is used only to improve ABLE and give artists insight into their audience. GDPR compliance alone would require expensive legal scaffolding to operate a data product; the reputational risk makes it not worth pursuing at any price.

---

## Unit economics model (targets)

These are targets, not actuals. Review quarterly once billing is live.

| Metric | Target | Notes |
|---|---|---|
| CAC (artist) | < £25 | Organic: "Made with ABLE" footer. Paid: social ads if needed. |
| LTV (Artist tier, 24-month) | £216 | £9 × 24 months — ignores upgrade and transaction uplift |
| LTV (Artist Pro, 24-month) | £456 | £19 × 24 months |
| Payback period | < 3 months | CAC paid back within 3 months at Artist tier |
| Monthly churn target | < 3% | SaaS benchmark for SMB: 5–7%. ABLE target is lower due to high switching cost (fan list is on ABLE). |
| ARPU (all paid artists) | > £14 | Blended across Artist + Artist Pro + Label + transaction uplift |

---

## The most important number to watch

**Monthly churn rate.** Every percentage point of churn at scale is substantial MRR loss. An artist who cancels because they "aren't using it" often has a fan list that would take months to rebuild elsewhere. The goal is to make cancellation feel genuinely costly — not through dark patterns, but through genuine value delivered.

When artists understand that their fan list, their analytics history, and their campaign attribution data are on ABLE and exportable but not portable in their full context to another platform, churn falls. Build this understanding into every touchpoint.
