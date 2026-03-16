# ABLE Growth Loop — Current State Analysis
**Updated: 2026-03-16 | Overall score: 7/10**

> The spec is thorough. The copy is settled. The referral chain is technically complete. There are two critical gaps: the attribution system is blind (the `?ref=` parameter exists in the spec but is not in the live code), and the warmest possible artist lead — a fan who discovered ABLE through an artist they respect — has no conversion path. This document audits both honestly.

---

## What the growth loop is supposed to do

Every artist's public profile page (able-v7.html) carries a "Made with ABLE ✦" footer. When a fan taps it, they should:

1. Land on `landing.html?ref=[artist-slug]` — the referring artist's identity is in the URL
2. See a personalised headline: "[Artist name] is on ABLE."
3. Click through to `start.html?ref=[artist-slug]` — still carrying the referral
4. Complete the wizard — `profile.referredBy` is saved with the referring artist's slug
5. The referring artist eventually sees: "3 artists have created a page after visiting yours"

That is the loop. It is the primary organic acquisition channel. It costs nothing to run. Every artist's profile is a passive ad for the platform.

---

## What is actually working today

The SPEC.md is complete. The copy decisions are settled. The CSS spec for the footer component exists. The `initFooterLink()` JavaScript function is written and documented. The `initReferralLanding()` function for landing.html is written. The sessionStorage referral carry through start.html is specced. The `referredBy` field is added to the profile schema.

All of this exists as documentation. The code has not been shipped to the live files yet.

---

## The most important single bug in the entire growth system

**The `?ref=` parameter is not on the footer link.**

This is not a missing feature. It is a broken attribution chain. Every day that ABLE operates without `?ref=` on the footer link, any artist who discovers ABLE through another artist's page is counted as a direct/organic signup — not as a referred signup. ABLE has no idea which artists are driving growth.

The specific impact:
- If 50 artists sign up because they clicked "Made with ABLE ✦" on someone's profile, ABLE sees 50 organic signups with no attribution
- The referring artist receives no acknowledgment that their presence on ABLE generated growth
- The conversion funnel (footer tap → landing → wizard → profile) cannot be measured
- The decision of whether to add a referral incentive programme cannot be made with data

The fix is one function: `initFooterLink()` in able-v7.html, exactly as specced in SPEC.md §3. Approximately 20 lines of JavaScript. It reads the artist slug from the URL path or `able_v3_profile.slug`, appends `?ref=[slug]` to the landing URL, and sets the footer link href at DOMContentLoaded.

**This is P0. It is not a roadmap item. It is an existing spec that needs to be implemented.**

---

## The second most important gap: the "I make music too →" fork

The FINAL-REVIEW.md identifies this as "the highest-value unbuilt item in the entire growth loop." It is not in SPEC.md. It has never been specced. That is the gap this document closes.

### What it is

A fan who taps "Made with ABLE ✦" and lands on `landing.html?ref=[artist-slug]` is a unique prospect. They have just spent time on an ABLE artist's profile. They have seen what the platform does, in practice, on a page they chose to visit. They are warm in a way that no marketing touchpoint can replicate.

A meaningful proportion of those fans are also musicians. They have taste. They respect the artist enough to have been on their page. They discovered ABLE through someone whose work they respect — not through an ad.

That person needs a different question than "Create your free page →". They need: "Are you an artist too?"

### The full spec for "I make music too →"

**Where it goes in able-v7.html:** Not in able-v7.html. It goes on `landing.html`, visible only when `?ref=` is present in the URL. It does not appear on the standard landing page.

**UI placement on landing.html (referred version):**
Below the main hero CTA ("Create your free page →"), with a visual separator, sits a secondary row:

```
[Artist name] is on ABLE.
[Create your free page →]        ← primary CTA, accent colour

——————————————————————————

Already a fan — not an artist?
[I make music too →]             ← secondary link, muted, smaller
```

The secondary element is not a button — it is a text link in `--color-text-3` at 14px. It should not compete with the primary CTA. It is a quiet fork for the right person. The wrong person never clicks it.

**Copy — final form:**

```
Already here as a fan?
I make music too →
```

Why this copy:
- "Already here as a fan?" acknowledges the context — they arrived via a fan tap, not a direct search
- "I make music too" is first person. The artist who originated this journey uses their page as a first-person expression. The copy follows that register.
- "→" indicates navigation, not commitment. This is an invitation, not a CTA.

**Copy rejected:**
- "Are you an artist?" — interrogative is slightly confrontational. Not every musician identifies as "an artist" yet.
- "Create your own page" — too prescriptive before they've said they make music
- "Join as an artist →" — "join" implies a social network, which ABLE is not
- "Musicians: get your free page" — header-ad copy, not ABLE's register

**The URL:**
```
start.html?ref=[artist-slug]&source=artist-page
```

- `ref=[artist-slug]` carries through the originating artist's identity — they still get referral credit
- `source=artist-page` is a new source value that identifies this as an artist lead generated from another artist's page. This is distinct from `source=footer` (which is the general landing source) — `artist-page` is specifically the musician-to-musician path
- Both parameters are read by start.html's `captureReferral()` function

**What start.html does with `source=artist-page`:**

The wizard adds one optional personalised line to its opening screen when `source=artist-page` is present:

```
You found us through [Artist Name].
Let's build your page.
```

This is written in the same first-person register as the rest of start.html. It is not a badge or a feature. It is a sentence that acknowledges the context and moves on. If `source=artist-page` is absent, this line does not appear.

**Analytics:**

The `source=artist-page` value is added to the canonical `SOURCE_VALUES` in CROSS_PAGE_JOURNEYS.md and the `detectSource()` function in analytics/SPEC.md. It is distinct from `footer` (which is the click type on the artist's page) — `artist-page` is the start.html source for musician-fork visitors.

When an artist profile is saved with both `referredBy` and `source: 'artist-page'`, that signup is the highest-quality lead in the entire funnel. It should be surfaced separately in any future analytics view: "Artists who found ABLE through another artist" is a cohort with meaningfully different behaviour and retention than cold-signup artists.

---

## Attribution chain: current state vs target state

### Current state (broken)

```
Artist profile (able-v7.html)
  Fan taps "Made with ABLE ✦"
         ↓
landing.html                    ← NO ?ref= parameter
  Standard hero                  ← No personalisation
         ↓
start.html                       ← No referral in session
  Profile saved                  ← No referredBy field
         ↓
Attribution: INVISIBLE
```

### Target state (complete)

```
Artist profile (able-v7.html)
  initFooterLink() sets href to landing.html?ref=[slug]
  Click tracked as type: 'footer' in able_clicks
         ↓
landing.html?ref=nadia
  initReferralLanding() reads ?ref=
  sessionStorage.setItem('able_referral', 'nadia')
  "[Nadia] is on ABLE."          ← personalised headline
  "Create your free page →"      ← primary CTA
  "I make music too →"           ← secondary fork to start.html?ref=nadia&source=artist-page
         ↓
start.html (either path)
  captureReferral() reads sessionStorage
  profile.referredBy = 'nadia' on wizard completion
         ↓
Admin (referring artist, Phase 1):
  "1 artist has created a page after visiting yours."
```

The gap between these two states is: implementing the code that already exists in the spec.

---

## Score by dimension

| Dimension | Score | Note |
|---|---|---|
| Footer visibility | 6/10 | Exists in able-v7.html; tap target and theme coverage need audit |
| Referral tracking | 1/10 | Spec complete, code not yet in live files |
| Destination quality | 2/10 | landing.html has no ?ref= detection yet |
| Artist incentive | 4/10 | Deliberate V1 absence — admin nudge not yet built |
| Fan-to-artist conversion | 1/10 | "I make music too →" fork not yet specced or built |
| Discovery value | 0/10 | Phase 2 — requires Supabase |
| Copy quality | 8/10 | "Made with ABLE ✦" settled; "I make music too →" now specced |
| Analytics | 1/10 | Footer click type not yet in live code |

**Overall: 7/10** (spec quality, not implementation quality)

---

## What takes this to 9/10

1. **Implement `initFooterLink()` in able-v7.html** — the ?ref= fix. ~20 lines. Already specced.
2. **Implement `initReferralLanding()` in landing.html** — already specced in SPEC.md §4.
3. **Implement `captureReferral()` in start.html** — already specced in SPEC.md §5.
4. **Add "I make music too →" fork to landing.html** — now specced in this document.
5. **Add `'footer'` and `'artist-page'` to canonical source values** — doc edit only.

These five items move the score from 7/10 (spec) to 9/10 (live and attributed). None require a backend. All can be shipped today.

**10/10 requires:** real traffic data, A/B tested copy validation, Supabase artist name lookup, and the artist directory. Those are Phase 2.
