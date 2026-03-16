# ABLE — Tiers: Path to 10/10
**System:** Tiers
**Date:** 2026-03-16

---

## Current state assessment

The tier architecture is well-documented. The pricing is competitive. The gold lock philosophy is clear. The upgrade trigger moments are identified. The gap is entirely in implementation — none of the billing infrastructure exists.

**Current score: 5/10** (excellent spec, zero billing implementation)

---

## Path to 10

### Step 1: Subscription billing (prerequisite)
**Moves score to: 7/10**

- Stripe subscriptions wired for all four tiers
- Pricing modal in admin.html (monthly / annual toggle)
- Upgrade flow: pricing modal → Stripe Checkout → return to admin with tier unlocked
- Tier stored in Supabase on `profiles` table: `tier: 'free' | 'artist' | 'artist_pro' | 'label'`
- Tier gates enforced server-side (not just UI — a user should not be able to bypass a tier gate by editing localStorage)
- Downgrade flow: cancellation → downgrade to Free → correct feature state
- Pause option: 1 month pause in cancellation flow

---

### Step 2: Gold lock UI (visible gates in admin.html)
**Moves score to: 8/10**

- Every gated feature in admin.html has the gold lock overlay component built and tested
- Blurred preview with real placeholder data that matches the feature's actual appearance
- Key icon, specific copy, tier-named CTA
- `able_dismissed_nudges` localStorage key implemented — dismissed gates don't re-appear this session
- One nudge per session enforced across all gates

---

### Step 3: Upgrade trigger moments (event-driven nudges)
**Moves score to: 8.5/10**

- 100-fan limit: progress bar from fan 1, amber at 90, nudge at 95 and 100
- Release date set: 14-day Artist trial auto-created via Stripe trial subscription
- Gig mode: same 14-day trial
- 10 CTA clicks in a day: in-dashboard notification (not modal)
- Broadcast attempt: gate overlay with fan count
- Second snap card: gate overlay
- Full implementation per the trigger spec in SPEC.md §4

---

### Step 4: Annual billing and trial management
**Moves score to: 9.0/10**

- Annual billing toggle on pricing modal
- Annual price display: "£90/yr — 2 months free"
- After 3 months on Monthly: dashboard prompt to switch to annual
- Trial expiry: email notification at day 10 of 14-day trial
- Trial expiry: second notification at day 13
- Trial expiry: downgrade at day 15 if no payment method added
- Trial win-back: email at day 3 post-expiry ("Your campaign tools are still here")

---

### Step 5: Churn prediction and win-back
**Moves score to: 9.5/10**

- Usage health score per artist (snap card posts, broadcasts sent, profile visits, login frequency)
- Low-health artists (no logins in 14 days, no snap cards in 21 days) → one nudge: "your fans haven't heard from you lately"
- Exit survey: cancellation flow captures one optional question ("why are you leaving?")
- Win-back sequence: day 7 post-cancel, day 30, day 90 — each with a specific reason to return
- Pause usage data: track pause → resume rate, compare to cancel → return rate

---

### Step 6: Label tier and team access
**Moves score to: 10/10**

- Multi-artist account: 10 sub-profiles under one Label login
- Team access: invite by email, role assignment (Admin / Editor / Viewer)
- Switch artist context from label dashboard
- Aggregate analytics dashboard
- Bulk broadcast to roster
- White-label email sending (custom sending domain)
- Dedicated account manager assignment in Supabase (admin field, not self-serve)

---

## Honest ceilings

**The Free tier must remain genuinely useful.** If Free is ever made so limited that it becomes a demo rather than a product, the "Made with ABLE" acquisition loop collapses (why would an artist recommend a product that's been crippled?). The 100-fan limit is the hard gate. Everything else on Free should work.

**The Label tier will be slow to fill.** At launch, most Label-tier accounts will be manager/artist combos (one manager, 2–3 artists) rather than actual labels. This is fine. Price it to be good value for that use case (it is: £4.90/artist/month is genuinely better than £9/artist). Marketing to indie labels comes after the artist base is established.

**The 2,000 broadcast recipient cap on Artist Pro may need revisiting.** Artists with large email lists (20,000+) are potential Artist Pro users who would find this cap frustrating. Consider either: (a) a per-send add-on after 2,000, or (b) a separate broadcast tier. Do not raise the cap across the board without modelling the Resend cost impact.
