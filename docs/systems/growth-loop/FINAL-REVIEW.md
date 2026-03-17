# ABLE Growth Loop — Final Review
**Date: 2026-03-16 | System: "Made with ABLE ✦" organic acquisition**

---

## Does the spec hold up under scrutiny?

Yes, with one significant caveat: the spec is rigorous about the mechanism but has zero validation data. Every claim about conversion uplift from personalised landing copy is plausible but unproven. "Nadia is on ABLE." outperforming the generic landing headline is a hypothesis that has not been tested — because there are no users yet. The spec correctly acknowledges this. It does not overclaim.

The mechanism itself is sound. The loop is:

```
Artist page → footer tap → landing.html?ref=[slug] → start.html wizard → referredBy saved
```

Each step is implementable today without a backend. The data flows are clean. The edge cases (corrupt profile, missing slug, XSS via ?ref=) are all handled. The spec earns trust because it does not pretend these gaps don't exist — it states what Phase 1 approximates and what Phase 2 fixes with real data.

The one structural limitation — fans who never scroll to the bottom — is stated honestly and accepted. The footer is attribution before it is acquisition. The loop only fires for engaged visitors. That is the right trade-off: an intrusive footer would be worse than a missed growth loop.

---

## Is the referral tracking system complete and correct?

For localStorage-only V1: yes, technically complete.

The `?ref=[artist-slug]` system works because:
- The slug is read from the URL path or `able_v3_profile.slug` in localStorage
- `encodeURIComponent` prevents URL injection
- `sessionStorage` carries the referral through the wizard without relying on cookies
- `referredBy` in the saved profile maps 1:1 to a Supabase column when backend lands
- `textContent` (not `innerHTML`) assignment prevents XSS on the personalised headline

The one correct concern: the system relies on the visitor completing the wizard in the **same browser session** as the footer tap. If they tap on mobile, get distracted, return on desktop three days later and complete the wizard — the referral is lost. This is not a bug; it is the fundamental limitation of sessionStorage. It is documented in the spec. It is acceptable for V1.

**The ?ref= parameter is injected and read correctly. The attribution chain is sound.**

---

## What's missing? What assumptions need validation?

**Missing from the spec:**

1. **"I make music too →" fork on referred landing** — the highest-conversion opportunity in the entire growth loop is unspecced. A fan who just left an ABLE profile is the warmest possible artist prospect. There is no secondary CTA for them on the personalised landing. The spec notes this as a gap. It is the most valuable unbuilt piece.

2. **What happens if the same artist drives >100 footer taps but zero conversions?** The spec has no floor on what counts as a successful loop. A vanity metric (many footer taps, no signups) would look fine in the analytics unless conversion rate is explicitly tracked.

3. **The admin nudge UI is not designed** — the copy is written ("1 artist has created a page after visiting yours") but there is no component spec, no placement decision, no dismissal behaviour. The spec points to where it should go but stops short of speccing the component.

**Assumptions that need validation:**

- "Nadia is on ABLE." converts better than the generic headline. (Assumption: unproven. Test when traffic exists.)
- Artists feel motivated by seeing referred signup counts. (Assumption: likely true, but the admin nudge has never been shown to a real artist.)
- Fans who tap the footer are meaningfully more likely to be musicians themselves. (Assumption: not measured. The "I make music too →" fork is built on this premise.)
- Slug-capitalisation produces readable display names in Phase 1. (Assumption: roughly true. "Dj Shadow" capitalising oddly is the confirmed failure case.)

---

## V1 scope: what works with localStorage only vs what needs Supabase?

**Works with localStorage only (P0 + P1):**
- `?ref=[slug]` injection on footer link
- sessionStorage referral carry through wizard
- `referredBy` field in `able_v3_profile`
- Personalised landing headline (slug-capitalisation approximation)
- Footer click tracking in `able_clicks`
- Admin nudge for referred signups (reads localStorage profiles on same device — works in private beta where all artists onboard on the same machine or via direct wizard completion)

**Blocked on Supabase (P2):**
- Accurate artist name on personalised landing (requires DB lookup)
- Referred signup count in admin across different devices (the localStorage scan only catches signups that happened on the same browser)
- "Artists like this" discovery strip on referred landing (requires genre-clustered query)
- Platform-level growth loop analytics (top referring artists, footer conversion rate)

**The honest V1 limitation:** the admin nudge for referred signups only works reliably in a single-device localhost scenario or when Supabase is live. In the real world, an artist on their phone won't have other artists' localStorage. This is the most meaningful gap in the localStorage-only implementation. The nudge should be marked as "Phase 1 approximation, real data requires Supabase."

---

## Final score: 7/10

**What earns the 7:**
- The spec is technically complete and implementable without a backend
- The referral chain is end-to-end and correct
- Edge cases are documented and handled
- The copy decisions are settled and defended
- The phased approach (P0 → P1 → P2) is realistic and sequenced correctly

**What keeps it from 10:**
- No live data. Zero validation of any conversion claim.
- The "I make music too →" fork is unspecced — the most valuable growth lever in the system
- Admin nudge UI is not designed, only copywritten
- The V1 localStorage limitation on referred signup counting is a real gap for multi-device usage

The growth loop spec is ready to implement. The score reflects a complete, honest spec — not a live, measured system.

---

## Top 3 changes that would move it to 10/10

### 1. Spec and build the "I make music too →" fork on the referred landing

This is the highest-value unbuilt item in the entire growth loop. A fan who has just spent 2 minutes on an ABLE profile — who saw the campaign states, the real bio, the fan sign-up — is already sold on what ABLE is. The only missing step is "and you can have one of these." A secondary CTA on the personalised landing that asks "Are you an artist?" and routes them to start.html would capture conversions that currently fall through entirely.

Spec it in this system doc. Build it in landing.html alongside P0.3.

### 2. Design the admin nudge as an actual component

"1 artist has created a page after visiting yours." is great copy sitting in a doc. It needs to be a real admin component: placement decision (Fans section, below the fan count stat), dismissal behaviour (stored in `able_dismissed_nudges`), and a zero-state (not shown until first referral). Until it is designed and built, an artist has no reason to know their page is generating growth. That motivation signal is the emotional core of the growth loop for artists — without it, the loop is invisible to them.

### 3. Add a conversion rate target before P2 ships

The spec correctly defers conversion measurement to "when we have real traffic." But it does not set a threshold for what conversion rate would be considered successful. Before Supabase ships, decide: what percentage of footer taps becoming new artist profiles would validate the loop? 0.5%? 2%? If the answer is unknown, the loop could be running at 0.1% and everyone would call it working. Set the target now so the measurement is meaningful when it exists.
