# ABLE — Tiers: Path to 10/10
**System:** Tiers
**Date:** 2026-03-16

---

## Current state assessment

The tier architecture is well-documented. The pricing is competitive. The gold lock philosophy is clear. The upgrade trigger moments are identified. The gap is entirely in implementation — none of the billing infrastructure exists.

**Current score: 5/10** (excellent spec, zero billing implementation)

---

## Path to 10

### Step 0: Free-tier fan cap enforcement (P0 — before any paying users)
**Must be implemented before billing ships. Without this, paying artists receive no differentiation.**
**Moves score from 5.2/10 to 6.5/10**

The 100-fan cap is the primary Free-tier constraint and the highest-intent upgrade trigger. It must be enforced in `able-v7.html` at the point of sign-up — not just shown as a number in admin.

**Exact implementation — add this check in the fan sign-up submit handler in able-v7.html:**

```javascript
// FREE TIER FAN CAP — check before writing to able_fans
// Add this check at the START of the fan sign-up submit handler,
// before any validation or localStorage write.
(function enforceFanCap() {
  var TIER_KEY = 'able_v3_profile';
  var FANS_KEY = 'able_fans';
  var FREE_TIER_CAP = 100;

  var profile = JSON.parse(localStorage.getItem(TIER_KEY) || '{}');
  var tier = profile.tier || 'free';  // 'free' | 'artist' | 'artist_pro' | 'label'

  // Only enforce cap on free tier
  if (tier !== 'free') return;  // paid tiers: no cap, proceed normally

  var fans = JSON.parse(localStorage.getItem(FANS_KEY) || '[]');
  var activeFans = fans.filter(function(f) { return !f.deleted_at; });

  if (activeFans.length >= FREE_TIER_CAP) {
    // Show the cap gate overlay — do NOT write the fan record
    showFanCapGate(activeFans.length);
    return;  // stop sign-up processing here
  }
  // Under cap — proceed with sign-up normally
})();

function showFanCapGate(currentCount) {
  // Show the upgrade prompt instead of the success state
  // Find the sign-up form container and replace its content with the gate message
  var formEl = document.getElementById('fan-signup-form');  // adjust selector to match actual element ID
  if (!formEl) return;

  formEl.innerHTML = [
    '<div style="text-align:center;padding:24px 16px;">',
    '  <div style="font-size:13px;font-weight:600;color:var(--color-text-1,#fff);margin-bottom:8px;">',
    '    100 people are on this list.',
    '  </div>',
    '  <div style="font-size:12px;color:var(--color-text-2,rgba(255,255,255,0.6));line-height:1.5;margin-bottom:16px;">',
    '    Sign-ups are paused while this artist is on the free plan.',
    '    If you want to stay close, check back soon.',
    '  </div>',
    '</div>'
  ].join('');
}
```

**What this does:**
- Reads `able_v3_profile.tier` to determine if this is a free-tier page
- Counts active (non-deleted) fans in `able_fans`
- If count is at or above 100 and the artist is on free tier: shows the cap message instead of accepting the sign-up
- If the artist has upgraded: no cap is applied, sign-ups proceed normally

**The gate message for the fan (on able-v7.html):** The fan-facing message must not be embarrassing to the artist. It says "Sign-ups are paused" — not "this artist hasn't paid." Artists care deeply about how their page represents them.

**The gate message for the artist (in admin.html):**
When the fan count reaches 95, show this in-dashboard nudge (not a modal — an inline card in the fans section):

```javascript
// In admin.html renderFanList() or equivalent:
var activeFans = fans.filter(function(f) { return !f.deleted_at; });
var tier = (profile.tier || 'free');

if (tier === 'free' && activeFans.length >= 95 && activeFans.length < 100) {
  // Show amber progress warning
  showNudge('fan-cap-warning',
    activeFans.length + '/100 — ' + (100 - activeFans.length) + ' spots left on your list.');
}
if (tier === 'free' && activeFans.length >= 100) {
  // Show the upgrade prompt
  showNudge('fan-cap-full',
    '100 people asked to hear from you. Your list is full.');
}

function showNudge(id, message) {
  var dismissed = JSON.parse(localStorage.getItem('able_dismissed_nudges') || '[]');
  if (dismissed.indexOf(id + '-session') !== -1) return;  // dismissed this session
  // Render the nudge card in the admin UI
  // The nudge card should show: message + "Keep your list growing — Artist plan" CTA
  // Dismiss stores the id in able_dismissed_nudges with a session suffix
}
```

**Verification test before shipping billing:**
1. Set `able_v3_profile.tier = 'free'` in localStorage
2. Add 99 records to `able_fans`
3. Attempt to sign up fan 100 — should succeed
4. Attempt to sign up fan 101 — should show the gate message, not add to the list
5. Change `able_v3_profile.tier = 'artist'`
6. Attempt to sign up fan 101 again — should succeed (no cap on paid tiers)

---

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
