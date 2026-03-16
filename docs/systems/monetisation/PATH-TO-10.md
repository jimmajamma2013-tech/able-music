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

## P0 — Fan cap upgrade prompt (the most important monetisation activation in V1)

**Score impact: 0/10 → 5/10**
**Why this is P0:** This is the highest-leverage monetisation action available right now, with no backend dependency. It requires only front-end JavaScript in admin.html. The fan cap already exists as a hard limit. The only missing piece is the UI that surfaces it — the progress bar at 80 fans and the upgrade overlay at 100 fans.

**The logic:** A Free artist who has signed up 80 fans has already proved they can grow an audience. That is the exact moment when upgrading makes sense to them — not before. At 100, they've hit the wall. The upgrade prompt at that moment is not a dark pattern; it is honest information delivered at the moment it is most relevant.

---

### P0.1 — Fan count progress bar in admin.html (at 80 fans)

When `able_fans.length >= 80` and `able_tier === 'free'`, show a progress bar in admin.html on the Fans page header, above the fan list.

**Exact component HTML:**

```html
<!-- Fan cap progress bar — shown when Free tier artist has 80+ fans -->
<!-- Inject before the fan list, hidden by default -->
<div class="fan-cap-progress" id="fanCapProgress" style="display:none;">
  <div class="fan-cap-progress-header">
    <span class="fan-cap-progress-label" id="fanCapProgressLabel">
      80 of 100 fans — your free list is nearly full
    </span>
    <button
      class="fan-cap-progress-cta"
      onclick="openUpgradeSheet('fan-list')"
      aria-label="See Artist plans to grow your fan list">
      See Artist plans
    </button>
  </div>
  <div class="fan-cap-bar-track" role="progressbar"
       aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
       aria-label="Fan list capacity">
    <div class="fan-cap-bar-fill" id="fanCapBarFill" style="width: 80%;"></div>
  </div>
  <p class="fan-cap-progress-sub" id="fanCapProgressSub">
    20 spots left. Artist gives you 2,000.
  </p>
</div>
```

**CSS:**

```css
/* ── Fan cap progress bar ── */
.fan-cap-progress {
  padding: 14px 16px;
  background: rgba(var(--acc-rgb), 0.07);
  border: 1px solid rgba(var(--acc-rgb), 0.22);
  border-radius: 12px;
  margin-bottom: 20px;
}

.fan-cap-progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.fan-cap-progress-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--dash-text);
  flex: 1;
}

.fan-cap-progress-cta {
  font-size: 11px;
  font-weight: 700;
  color: var(--acc);
  background: none;
  border: 1px solid rgba(var(--acc-rgb), 0.35);
  border-radius: 100px;
  padding: 5px 12px;
  cursor: pointer;
  font-family: var(--font);
  white-space: nowrap;
  min-height: 30px;
  transition: background 0.14s ease, border-color 0.14s ease;
}

.fan-cap-progress-cta:hover {
  background: rgba(var(--acc-rgb), 0.12);
  border-color: rgba(var(--acc-rgb), 0.55);
}

.fan-cap-bar-track {
  height: 4px;
  background: rgba(var(--acc-rgb), 0.15);
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 8px;
}

.fan-cap-bar-fill {
  height: 100%;
  background: var(--acc);
  border-radius: 100px;
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fan-cap-progress-sub {
  font-size: 11px;
  color: var(--dash-t2);
  margin: 0;
}
```

**JS — call this on Fans page load and after every new fan sign-up:**

```javascript
function renderFanCapProgress() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const tier = localStorage.getItem('able_tier') || 'free';
  const cap = document.getElementById('fanCapProgress');
  if (!cap) return;

  // Only show for Free artists with 80+ fans
  if (tier !== 'free' || fans.length < 80) {
    cap.style.display = 'none';
    return;
  }

  const count = fans.length;
  const limit = 100;
  const pct = Math.min(100, Math.round((count / limit) * 100));
  const remaining = limit - count;

  document.getElementById('fanCapProgressLabel').textContent =
    count >= limit
      ? `You've reached 100 fans — your free list is full`
      : `${count} of ${limit} fans — your free list is nearly full`;

  document.getElementById('fanCapBarFill').style.width = `${pct}%`;
  document.getElementById('fanCapBarFill').parentElement.setAttribute('aria-valuenow', pct);

  document.getElementById('fanCapProgressSub').textContent =
    count >= limit
      ? `Your list is full. Upgrade to keep growing.`
      : `${remaining} spot${remaining === 1 ? '' : 's'} left. Artist gives you 2,000.`;

  // Amber fill when >= 95%, red fill when full
  const fill = document.getElementById('fanCapBarFill');
  if (count >= limit) {
    fill.style.background = 'var(--color-error, #e05242)';
  } else if (pct >= 95) {
    fill.style.background = 'var(--acc)';
  }

  cap.style.display = 'block';
}
```

**Copy for each threshold:**

| Fans | Label text | Sub text | Bar colour |
|---|---|---|---|
| 80–94 | "80 of 100 fans — your free list is nearly full" | "[N] spots left. Artist gives you 2,000." | Amber |
| 95–99 | "95 of 100 fans — almost at your limit" | "[N] spots left. Artist gives you 2,000." | Amber |
| 100 | "You've reached 100 fans — your free list is full" | "Your list is full. Upgrade to keep growing." | Red (error) |

---

### P0.2 — Upgrade overlay at 100 fans in admin.html

When `able_fans.length >= 100` and `able_tier === 'free'`, show the full upgrade overlay above the fan list. The progress bar (P0.1) transitions to this state automatically — the bar fills completely and the label changes to the 100-fan state. Additionally, show the dedicated cap prompt component from `docs/systems/tier-gates/SPEC.md §2.5`:

**Exact copy for the overlay (admin.html Fans page, 100-fan state):**

```
Headline: You've reached 100 fans.

Body: That's a real audience. Your next 1,900 are one step away.

CTA: See Artist plans

Dismiss: Stay on Free
```

**What the upgrade sheet shows when opened from this prompt:**
- Context headline (pre-populated): "You've reached 100 fans. Your next 1,900 are one step away. Artist."
- Featured tier card: Artist (£9/mo)
- This uses the existing `openUpgradeSheet('fan-list')` call from `GATE_COPY`

---

### P0.3 — Fan cap message on able-v7.html (fan-facing)

When `able_fans.length >= 100` and `able_tier === 'free'`, the fan sign-up form on the public profile converts to a neutral closed message. Fans never see upgrade prompts — that is the artist's problem, not theirs.

**Exact copy:**

```
This list is currently closed.
```

No explanation. No upgrade language. No broken form. The fan experience is clean. The artist-facing admin.html has the upgrade prompt; the fan-facing profile has a graceful closed state.

---

### P0 score impact

| State | Score |
|---|---|
| Before P0 (no fan cap UI) | 0/10 execution |
| After P0.1 (progress bar at 80 fans) | 4/10 execution |
| After P0.2 (upgrade overlay at 100 fans) | 5/10 execution |
| After P0.3 (fan-facing closed message) | 5/10 execution |

**The fan cap + upgrade prompt is the most important monetisation activation mechanism in V1.** An artist who sees their list filling up, with a specific number ("20 spots left") and a specific next step ("Artist gives you 2,000"), has all the information they need to make a rational decision to upgrade. This is honest, direct, and not manipulative — it is exactly the kind of information the artist needs at exactly the right moment.

---

## Step 1: Wire subscription billing (prerequisite for everything beyond P0)
**Priority: P1 — must happen before launch**
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
