# ABLE — Tiers: Final Review Gate
**System:** Tiers
**Date:** 2026-03-16

---

## Quality gate — 5 test questions

Before tier billing ships to production, all five questions must be answered "Yes."

---

### Question 1: Does the Free tier deliver a genuinely usable product?

**Test:** Create a new Free account from scratch. Complete onboarding. Set up the profile. Set a release date and activate pre-release state. Sign up 5 test fans. Check the fan list. View the analytics.

**Pass criteria:**
- Profile page renders correctly with all four themes and campaign states working
- Fan sign-up works end-to-end (fan receives confirmation email, artist sees fan in list)
- Analytics shows views and clicks for last 30 days
- "Made with ABLE" footer is present and links to `ablemusic.co?ref=[handle]`
- Snap card (1) can be created, edited, and published
- The 100-fan cap is enforced: fan 101 sees an error, artist sees the "list full" nudge

**Fail criteria:**
- Any core feature broken or non-functional on Free
- "Made with ABLE" footer missing or not tracking referrals
- Fan sign-up does not work end-to-end

---

### Question 2: Are all tier gates enforced server-side?

**Test:** On a Free account, manually set `localStorage['able_tier'] = 'artist_pro'`. Attempt to use Artist Pro features (full fan CRM, unlimited snap cards, unlimited broadcasts).

**Pass criteria:**
- Server-side tier check blocks Artist Pro API calls even with manipulated localStorage
- UI may briefly show wrong state, but any API call to gated features returns 403 or equivalent
- No fan data or broadcast sends are processed for wrong-tier requests

**Fail criteria:**
- Setting localStorage tier unlocks gated features without a valid Stripe subscription
- Any tier gate that exists only in the UI JavaScript

---

### Question 3: Is the gold lock overlay system consistent across all gated features?

**Test:** Open admin.html on a Free account. Find every gated feature. Check each overlay.

**Pass criteria:**
- Every gated feature has a blurred preview (not a blank space, not a "coming soon" placeholder)
- Every overlay has: amber key icon, specific value copy (not generic), tier name in the CTA
- No overlay uses the word "upgrade"
- No overlay uses the word "unlock"
- Dismissed overlays (via the dismiss X button) do not re-appear in the same session
- Only one upgrade nudge per session (if artist has already been shown one nudge, subsequent triggers are suppressed)

**Fail criteria:**
- Any gated feature shows a blank space instead of a blurred preview
- Any overlay uses banned copy phrases
- Multiple upgrade nudges shown in one session

---

### Question 4: Do the upgrade trigger moments fire at the right time with the right copy?

**Test:** Simulate each of the 7 upgrade trigger conditions from SPEC.md §4. Check that each fires exactly once and uses the correct copy.

**Pass criteria (per trigger):**
1. Fan 100: nudge fires, progress bar at 100/100, copy matches spec exactly
2. Release date set: 14-day Artist trial created in Stripe, confirmation shown to artist
3. Gig mode: same as trigger 2
4. 10 CTA clicks: in-dashboard notification (not modal), correct copy
5. Broadcast attempt (Free): gate overlay with fan count, correct copy
6. Second snap card attempt (Free): gate overlay, correct copy
7. CRM curiosity on Artist: gate overlay with city data (or generic if no geo data), correct copy

**Fail criteria:**
- Any trigger fires more than once in a session
- Any trigger fires at the wrong moment (e.g. CRM gate on Artist Pro)
- Trial not created in Stripe when trigger 2 or 3 fires

---

### Question 5: Is the downgrade and pause experience clean and data-preserving?

**Test:** On an Artist Pro account with fan data, snap cards over the Free limit, and analytics history, cancel the subscription. Verify the downgrade behaviour.

**Pass criteria:**
- Fan list preserved in full (artist can still see all fans, count and email addresses intact)
- Snap cards over Free limit hidden (not deleted) — re-appear immediately if artist re-upgrades
- Analytics history preserved (shown as locked preview, not deleted)
- "Your data is safe" copy present
- Pause option shown before cancellation confirmation screen
- If pausing: profile stays live, features downgrade to Free for 30 days, auto-resumes at day 31
- Post-cancel confirmation email: "Your fan list is safe — [N] fans are still there."

**Fail criteria:**
- Any fan data deleted on downgrade
- Any snap card deleted on downgrade (hiding is acceptable, deletion is not)
- No pause option shown in cancellation flow
- Post-cancel email missing or incorrect

---

## Sign-off

| Version | Date | Q1 | Q2 | Q3 | Q4 | Q5 | Sign-off |
|---|---|---|---|---|---|---|---|
| Billing V1 | TBD | — | — | — | — | — | — |
