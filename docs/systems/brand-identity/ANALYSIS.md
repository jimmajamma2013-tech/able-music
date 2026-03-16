# ABLE — Brand Identity Analysis
**Created: 2026-03-16 | Current score: 5/10**

> Brand identity for ABLE is complicated by a deliberate design decision: on artist pages, ABLE's identity is meant to recede. The artist's accent colour, vibe, and feel are the brand on that surface. But ABLE still needs to be a coherent brand on landing.html, admin.html, emails, and the "Made with ABLE" touchpoint. This document scores how well that coherence is currently achieved.

---

## Dimension 1 — Wordmark
**Score: 6/10**

### Current state
The ABLE wordmark uses Barlow Condensed 700 all-caps throughout the codebase. The typeface is consistently applied in landing.html, admin.html, and able-v7.html. However:
- Kerning is not formally specified (applied inconsistently across files)
- Size scale is not documented (each file defines its own sizing)
- No locked-up version exists (wordmark + the ✦ symbol as a unit)
- No dark-on-light and light-on-dark variants documented
- The wordmark has never been output as an SVG or standalone asset

### What good looks like
A defined wordmark that is:
- One spec: Barlow Condensed 700, all-caps, -0.02em kerning
- Two colour variants: white on dark, #0d0e1a on light
- One SVG file: used as `<img>` on landing.html rather than a styled `<span>`
- A locked-up version with the ✦ symbol for use in footers and emails

**Gap to 10:** Formalise the spec, output the SVG, document the rules.

---

## Dimension 2 — The ✦ symbol
**Score: 5/10**

### Current state
The ✦ symbol appears throughout the codebase as a decorative element. It is used in:
- Section dividers on able-v7.html
- Admin.html decorative moments
- Landing.html hero area
- Email footers (assumed — not verified)

But its rules are not documented. Current ambiguities:
- When does ✦ appear vs. when does it not? (no rule)
- What size relative to surrounding text? (not specified)
- What colour? (varies — sometimes accent, sometimes white, sometimes muted)
- Is it ever the primary symbol for the brand? (it should not be)
- Is it a Unicode character (✦ U+2726) or an SVG asset? (varies in practice)

### What the ✦ symbol is
It is punctuation. It is a breath. It marks a moment of particular craft or care. It is never a logo. It is never used in isolation as a brand identifier. It is not a badge or a bullet point. When it appears, the reader should feel it rather than notice it.

**Use it:** section transitions, emphasis in headlines, end-of-sentence pauses in copy, the "Made with ABLE" footer mark.

**Never use it:** as a loading indicator, as a star rating, in clusters of 3 or more, larger than 1em relative to surrounding text.

**Gap to 10:** Document the rules. Audit every instance in the codebase. Remove non-compliant uses.

---

## Dimension 3 — Favicon
**Score: 2/10**

### Current state
No custom favicon exists. The browser default (blank or browser chrome) is shown on all pages. This is a visible, immediate credibility gap — any tab open to an ABLE page shows no identity.

### What's needed
- 32×32 SVG favicon: white "A" on #0d0e1a, Barlow Condensed 700
- PNG fallback: 32×32 and 16×16
- Apple touch icon: 180×180, same design
- Applied to: landing.html, admin.html, able-v7.html, start.html, fan.html

### Design notes
The "A" alone is sufficient. Do not try to render "ABLE" at 32×32. The first letter of a strong typeface at the right weight is a legitimate brand mark.

The background should be #0d0e1a (midnight navy), not #000000. The brand's dark colour, not black. The difference is subtle but visible at large sizes.

**Gap to 10:** Create the SVG, create the PNG fallbacks, apply to all active pages.

---

## Dimension 4 — OG image template
**Score: 3/10**

### Current state
No OG image exists for any ABLE page. When landing.html is shared on social media, the platform generates a generic screenshot or shows a blank card. This is a missed brand moment — every share of an ABLE URL is a potential brand impression.

### What's needed

**For landing.html (platform-level OG card):**
- 1200×630px
- Background: #0d0e1a
- Top-left: ABLE wordmark in white
- Center: headline copy from landing.html hero (specific, not generic)
- Bottom-right: "ablemusic.co" in a muted text colour
- The ✦ symbol used once as a visual breath

**For artist pages (artist-level OG card):**
This is more complex and is Phase 2. Each artist's OG card should be generated dynamically from their profile (name, accent colour, vibe). This requires server-side rendering (Netlify function + Satori or similar). Spec this later.

**For admin.html:**
No OG card needed — this is a private dashboard, not a shareable URL.

**Gap to 10:** Create the landing.html OG card first. It is static and can be done in a day.

---

## Dimension 5 — Artist page as brand expression
**Score: 8/10**

### Current state
This is the strongest dimension. The 7-vibe × 4-theme × 4-feel identity system is fully specced. The `--color-accent` variable gives each artist a genuinely unique visual identity. The design system supports this deliberately — ABLE's identity recedes, the artist's identity takes over.

### What works
- Each vibe has a distinct display font, accent suggestion, and feel
- The artist's accent colour propagates through every component via `--color-accent`
- Ambient colour extraction from artwork is specced
- The 4 themes (Dark / Light / Glass / Contrast) all support artist customisation

### What's missing
- The "brand recedes" principle is not explicitly documented for developers and designers working on the system
- There is no documented rule for how much ABLE chrome appears on the artist page (the only ABLE branding on the artist page should be the "Made with ABLE" footer on free tier — everything else is the artist's)
- The OG card for artist pages is not yet specced (Phase 2)

**Gap to 10:** Document the "brand recedes" principle explicitly. Confirm the free-tier footer is the only ABLE brand element on the artist page.

---

## Dimension 6 — Admin as deliberately different surface
**Score: 7/10**

### Current state
Admin.html uses --bg: #09090f (near-black) and --acc: #f4b942 (amber), with Plus Jakarta Sans. This is intentionally different from the artist profile (midnight navy, artist accent, DM Sans). The contrast communicates: you are backstage now.

### What works
- The amber accent is consistent and distinctive
- The font choice (Plus Jakarta Sans) reads as professional without being corporate
- The darker background creates a genuine contrast to the artist's lighter or more colourful profile page

### What's missing
- The "backstage" metaphor is not explicitly documented — it should be, because every design decision for admin should be tested against it
- The warm cream (#e8e4dd) mentioned in MASTER.md appears in the SPEC.md for admin, but its actual implementation in admin.html needs auditing for consistency
- Admin dashboard onboarding state (first-ever visit) — does it communicate the backstage feeling, or does it feel like a generic SaaS dashboard?

**Gap to 10:** Audit admin.html for the warm cream (#e8e4dd) light state. Document the backstage metaphor explicitly in admin's design spec.

---

## Dimension 7 — Brand voice
**Score: 6/10**

### Current state
The copy philosophy is well-documented in CLAUDE.md, COPY_AND_DESIGN_PHILOSOPHY.md, and the copy system spec. Banned phrases are clear. The artist-voice principle (first person on the profile page) is established. The admin copy register (warm, direct, no exclamation marks) is established.

However:
- There is no single sentence that captures ABLE's brand personality
- The brand voice for ABLE itself (on landing.html, in emails, in the "Made with ABLE" footer) is not distinct from the artist voice guidelines
- ABLE's tone in its own communications (not the artist's voice, but ABLE's voice as a company) is not documented

### The gap
ABLE needs two voices:
1. **Artist voice** — first person, present tense, the artist's world. Already documented.
2. **ABLE's own voice** — when ABLE speaks as a brand (landing.html hero, emails, error states, the footer). This should be: direct, unhurried, specific. Not warm in a SaaS way. Warm in the way a person you respect is warm — because they mean what they say.

**Gap to 10:** Define ABLE's own brand voice in one paragraph. Write the one-sentence brand personality. Document the distinction between artist voice and ABLE voice.

---

## Dimension 8 — "Made with ABLE" as brand touchpoint
**Score: 4/10**

### Current state
The "Made with ABLE" footer is specced as the primary organic growth loop for free tier. It is mentioned in MASTER.md and in the tier system spec. But:
- The exact copy is not defined ("Made with ABLE" vs. "Built with ABLE" vs. "✦ ABLE" vs. "ABLE · Your page is free →")
- The link target is not specified (landing.html? Or the start.html wizard directly?)
- The visual design is not specced (size, colour, position, opacity)
- The footer is not confirmed as live on able-v7.html free tier
- The footer should be absent on paid tiers — is this gated correctly?

### What this touchpoint needs to do
A fan taps an artist's link-in-bio. They land on the artist's ABLE page. They sign up or stream. At the bottom of the page, they notice (subtly): "Made with ABLE". They are curious — "what's ABLE?" — and tap it. They land on landing.html or start.html. They are a potential artist user.

This is the growth loop. It works only if:
- The copy is curious-inducing, not promotional
- The link target is right (landing.html with a clear "are you an artist?" message)
- The visual treatment is legible but not loud
- It appears on every free-tier page consistently

**Gap to 10:** Finalise the exact copy. Spec the link target. Spec the visual treatment. Confirm it is live on able-v7.html free tier. Confirm it is hidden on paid tiers.

---

## Summary scorecard

| Dimension | Score | Primary gap |
|---|---|---|
| Wordmark | 6/10 | Not output as SVG, kerning not formalised |
| The ✦ symbol | 5/10 | Rules not documented, usage inconsistent |
| Favicon | 2/10 | Does not exist |
| OG image template | 3/10 | Does not exist |
| Artist page as brand | 8/10 | Strong; "brand recedes" principle not explicitly documented |
| Admin as different surface | 7/10 | Backstage metaphor not explicitly documented |
| Brand voice | 6/10 | ABLE's own voice not separated from artist voice |
| "Made with ABLE" | 4/10 | Copy, link target, and visual treatment not finalised |
| **Overall** | **~5/10** | Identity is implicit, not documented |

---

## The honest assessment

ABLE has a strong implicit brand identity. The design choices are confident and consistent enough that a user who encounters multiple ABLE surfaces (landing page, artist profile, admin dashboard) would recognise them as belonging to the same product. But implicit is fragile. When a developer works on a new page, they need the explicit rules. When James hires a designer, they need the explicit rules. When ABLE is written about in a press piece, the journalist needs the one-sentence personality.

The most urgent gaps are the ones visible to anyone who encounters the product today:
- No favicon (every open tab is anonymous)
- No OG card (every share is a missed brand moment)

Both can be fixed in a day. The rest is documentation.
