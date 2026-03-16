# ABLE "Made with ABLE" Growth Loop — Analysis
**Created: 2026-03-16 | Overall score: 3.0/10**

> This document audits the current growth loop implementation across 8 dimensions. Starting point before the full spec is written. The footer exists — the system around it does not.

---

## Scoring summary

| # | Dimension | Score | Status |
|---|---|---|---|
| 1 | Footer visibility | 5/10 | Exists in able-v7.html — not audited across all themes |
| 2 | Referral tracking | 0/10 | No `?ref=` param on the link — zero attribution |
| 3 | Destination quality | 2/10 | landing.html is good but receives no referral context |
| 4 | Artist incentive | 4/10 | No incentive system, but the absence is deliberate for V1 |
| 5 | Fan-to-artist conversion | 1/10 | No flow — link goes to generic landing page |
| 6 | Discovery value | 0/10 | No artist directory or "artists like this one" surface |
| 7 | Copy quality | 7/10 | "Made with ABLE ✦" is correct — assessed and decided |
| 8 | Analytics | 0/10 | No growth loop source tracked — footer clicks are invisible |

**Overall: 3.0/10**
Current estimate (from brief) was ~3/10 — this audit confirms it.

---

## Dimension 1 — Footer visibility: 5/10

### What exists
A "Made with ABLE ✦" footer link is present in able-v7.html. It appears at the bottom of every artist profile page, below all content sections.

### What's missing
- **Theme audit**: the footer has not been confirmed to be readable across all 4 themes (Dark, Light, Glass, Contrast). On the Glass theme with a dark artwork background, `--color-text-3` may be unreadable. On the Light theme, the same muted token may have insufficient contrast.
- **Cross-page consistency**: admin.html, start.html, and fan.html do not have this footer — correct, as they are internal pages. But the confirmation email has no equivalent "I'm on ABLE" signal that could seed secondary discovery.
- **Tap target size**: 11px DM Sans at the footer may be below the 44px tap target minimum on mobile. The link itself needs a larger hit area than its visual size.
- **Scroll position**: a fan who never reaches the bottom of an artist's profile (because they signed up from the hero section) will never see the footer. This is structurally limiting — the growth loop only fires for engaged visitors who scrolled fully.

### Score note
5/10 because the footer exists and its visual approach (muted, non-promotional) is correct. The gaps are technical (tap target, theme contrast) and structural (only seen by scrollers).

---

## Dimension 2 — Referral tracking: 0/10

### What exists
The footer link points to `landing.html` (or `https://ablemusic.co/`). There is no `?ref=` parameter appended. There is no JavaScript in able-v7.html that reads the current artist slug and appends it to the footer URL.

### What's missing
- **`?ref=[artist-slug]`** on the footer link: the referring artist's identity is never captured. If 50 artists sign up because they clicked through from another artist's profile, ABLE has no idea which artists drove that growth.
- **Dynamic slug injection**: the footer link must read the current artist's slug from `able_v3_profile.slug` (or the URL) and inject it into the `href` at render time.
- **Fallback slug**: if the artist slug is not available (edge case: profile data not in localStorage on a direct URL visit), the link should fall back to `landing.html` without a `?ref=` rather than breaking.

### Gap impact
Critical. Without `?ref=`, the growth loop cannot be measured or rewarded. Attribution is zero. This is a one-line fix that unlocks the entire system.

---

## Dimension 3 — Destination quality: 2/10

### What exists
`landing.html` is a strong page — designed as the platform discovery entry point, with a clear "Your page is free →" hero CTA. It already converts visitors to start.html.

### What's missing
- **Referral awareness**: landing.html does not read `?ref=` from the URL. It cannot personalise based on which artist drove this visit. A fan who just left Nadia's profile lands on a completely generic page about ABLE.
- **Personalised headline**: the strongest possible landing experience for a referred visitor is: "Nadia is on ABLE. Create your own free page →" — not the generic hero. This requires landing.html to query the artist's name from `?ref=` (either from localStorage if same device, or from Supabase once the backend is live).
- **Continuity of visual identity**: the transition from an artist's dark/glass profile to a fully generic landing page creates a perceptual break. A referred landing should at minimum acknowledge the relationship ("You came from Nadia's page").
- **Scroll depth**: the generic landing page requires the visitor to understand ABLE from scratch. A referred visitor already has context — they've seen what an ABLE page looks like. The destination should acknowledge this and skip the "what is ABLE" section.

### Score note
2/10 because landing.html is competent but completely unaware of the referral context. The gap is not the quality of the landing page itself — it's that the referred visitor is treated identically to a cold visit.

---

## Dimension 4 — Artist incentive: 4/10

### What exists
No formal incentive. Artists have the footer on their page but receive nothing visible in return for the growth it generates.

### Assessment: deliberate absence is correct for V1
The decision to launch without a referral reward programme is the right call. Referral incentives (credits, discounts, revenue share) change the psychology of the growth loop from "I'm on ABLE because it's good" to "I'm on ABLE and I'm getting rewarded for recruiting." The latter cheapens the platform's credibility with the artist audience ABLE is trying to reach. Artists with taste recognise incentivised referrals and distrust them.

### What should exist — Phase 2 consideration
- **Visibility, not reward**: in admin.html, a signal that says "3 artists have signed up after visiting your page" is social proof and pride — not a financial incentive. It reinforces the artist's sense that their presence on ABLE has value beyond their own page.
- **Referral reward evaluation criteria**: the question to answer before adding any reward is "are signups stalling despite organic growth being available?" If the growth loop is naturally producing 10-20% of signups without incentives, don't add them. Reward the loop only if organic growth plateaus below sustainable acquisition cost.

### Score note
4/10 for what it is, not for what it's missing. The deliberate absence of an incentive system is a product philosophy position. The missing piece is the visibility signal in admin — the artist should know their page is generating growth even if they receive no formal reward.

---

## Dimension 5 — Fan-to-artist conversion: 1/10

### What exists
Nothing. A fan who taps "Made with ABLE ✦" lands on landing.html with zero personalisation and zero acknowledgment that they were just on an artist's page.

### What's missing
The most powerful thing the growth loop can do is convert fans into artists. A significant proportion of ABLE's best future users are people who are fans of other ABLE artists but are also musicians themselves. The current footer gives them no signal that this is possible or easy.

The opportunity:
- **"You're a fan. Are you also an artist?"** — a moment in the referred landing experience that asks this question directly
- **"I make music too →"** — a secondary CTA on the referred landing page, below the main artist-facing hero
- **Identity recognition**: a fan who has already signed up at an artist's page has implicitly expressed trust in ABLE. That trust should be leveraged to reduce friction on the artist onboarding path.

### Score note
1/10 because the structural gap is large (no flow exists at all) but it is a known gap — the spec closes it.

---

## Dimension 6 — Discovery value: 0/10

### What exists
Nothing. "Made with ABLE ✦" is a single-destination link with no discovery layer.

### The missed opportunity
A fan who taps the footer could land on a page that shows them other ABLE artists — particularly artists in the same genre or city as the one they just visited. This is ABLE's organic discovery surface: a directory that fans find through artists, not through ABLE's own marketing.

### What would change this
- **A referred landing with a "You might also like..." artist strip** — three artists in the same genre as the referrer. Passive discovery at the moment of maximum interest (fan has just engaged with an ABLE profile).
- **An artist directory** — a browsable grid of ABLE artists, findable from the footer. This is referenced in `docs/reference/research/DISCOVERY_AND_GROWTH.md` as a platform goal.
- **Genre/vibe-based clustering** — the 7 genre vibes (defined in the design system) are the natural taxonomy for artist discovery. Two artists both tagged "Electronic / Club" should appear near each other in the directory.

### Score note
0/10 because nothing exists. This is Phase 2 scope — discovery requires Supabase to query other artists' profiles. It cannot be built without a backend.

---

## Dimension 7 — Copy quality: 7/10

### What exists
"Made with ABLE ✦" — a deliberate copy decision.

### Copy alternatives considered and rejected

| Candidate | Why rejected |
|---|---|
| "Made with ABLE" (no ✦) | Too plain. Reads like a WordPress powered-by footer. No character. |
| "Powered by ABLE" | Corporate. "Powered by" is a hosting term, not an artist term. |
| "Built with ABLE" | Slightly better than "Powered by" but still sounds like a tool, not a community. |
| "Join ABLE" | Too direct. Promotes the platform over the artist who created the page. |
| "Create your own page →" | Transactional. A call-to-action masquerading as attribution. |
| "ABLE ✦" (just the name and symbol) | Too ambiguous — a visitor might not know what it is. |

### Why "Made with ABLE ✦" is correct
- **"Made"** implies authorship — the artist made something. The platform enabled it but the artist owns it.
- **"with ABLE"** is a collaboration framing — not "on ABLE" (rental) or "by ABLE" (platform ownership), but with.
- **"✦"** is ABLE's symbol. It adds visual weight and distinctiveness without being decorative. It's the same ✦ that appears in "Day 1 ✦" in the admin dashboard — a thread that connects the private and public faces of ABLE.
- The whole phrase is 16 characters. It is legible at 11px, fits on one line at 320px, and reads in under a second.

### What's missing
- **Voice**: the footer copy is in the third person ("Made with ABLE"). On a page where everything else is written in the artist's first person voice, this is a slight register break. A future consideration: could the footer read "I'm on ABLE ✦" — as if the artist is the one saying it? This requires careful evaluation (feels presumptuous without artist consent) but is worth testing.
- **Secondary CTA text**: on the referred landing page, the personalised headline has not yet been written. "Nadia's fans are on ABLE. Create your free page →" is the candidate — assessment in SPEC.md.

### Score note
7/10 because the copy decision is correct and defensible. The gap (3 points) is the absence of the referred landing copy and the unresolved question of voice register.

---

## Dimension 8 — Analytics: 0/10

### What exists
Nothing. Footer clicks are not tracked. Growth loop traffic is invisible in artist analytics and in ABLE's own platform data.

### What's missing

**For individual artists:**
- Footer link clicks should be tracked as `type: 'cta'`, `label: 'Made with ABLE'`, `source: _pageSource` in `able_clicks`
- This lets an artist see how many fans tapped the footer — confirming their page is generating platform growth

**For ABLE's platform analytics (future):**
- New signups with `referredBy` set should be trackable to the referring artist
- Conversion rate: footer clicks → landing page visits → wizard completions → live profiles
- Top referring artists: which artists are generating the most new signups?

**Source value needed:**
- `'footer'` should be added to the canonical `SOURCE_VALUES` list in `CROSS_PAGE_JOURNEYS.md` and `analytics/SPEC.md`
- On landing.html, a visit with `?ref=[slug]` should record source as `'footer'` in platform-level analytics (distinct from the artist source values, which are about where fans come from)

### Gap impact
Without analytics, ABLE cannot measure whether the growth loop is working. It is the primary organic acquisition channel — not measuring it means operating blind on the most important growth lever in the product.

---

## Key findings

1. **The most urgent fix is `?ref=[artist-slug]` on the footer link.** One line of JavaScript in able-v7.html. Unlocks attribution, referral tracking, and personalised landing — all blocked behind this single change.

2. **The second priority is landing.html `?ref=` detection.** Without this, the referred visitor experience is generic and the artist's brand equity (which drove the click) is immediately dissipated.

3. **Analytics are invisible.** Footer clicks are not in `able_clicks`. Growth loop traffic is untracked. This means ABLE cannot measure its most important organic acquisition channel.

4. **Discovery is a Phase 2 problem.** An artist directory requires Supabase. The referral tracking and landing page personalisation can be built now. Discovery cannot.

5. **The copy decision is settled.** "Made with ABLE ✦" is correct. Do not reopen this.
