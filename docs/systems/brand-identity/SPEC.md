# ABLE — Brand Identity Specification
**Created: 2026-03-16 | Status: canonical**

> This document defines ABLE's brand identity system. It covers every element that constitutes "what ABLE looks like" outside of the artist's own profile page. ANALYSIS.md diagnoses the gaps. This spec closes them.

---

## 1. Brand personality

**One sentence:**
"ABLE is the quiet confidence of an artist who knows their work is worth showing up for."

This is not a tagline. It is a calibration tool. Before writing any copy, designing any screen, or making any product decision, ask: does this feel like quiet confidence? Or does it feel like anxious promotion?

Quiet confidence:
- Doesn't need exclamation marks to express urgency
- Doesn't need "supercharge" or "transform" to describe impact
- States facts directly: "Your fans. Your list. Always."
- Trusts the reader to understand without being sold to

The opposite of quiet confidence is what every ABLE competitor sounds like.

---

## 2. ABLE's own voice (distinct from artist voice)

There are two distinct voices in the ABLE product:

### Artist voice
Used on: able-v7.html (the fan-facing profile page)
Register: First person. Present tense. The artist speaking to people who care about their work.
Examples: "Stay close. I'll keep you in the loop." / "I'm playing tonight." / "New music out Friday."
Rules: documented in COPY_AND_DESIGN_PHILOSOPHY.md and each page's COPY.md

### ABLE's own voice
Used on: landing.html, admin.html, start.html, error states, emails from ABLE (not from the artist), the "Made with ABLE" footer
Register: Direct. Unhurried. Specific. Not SaaS-warm. Warm in the way a person who means what they say is warm.
Tone reference: "A label will take 18% of everything you make. We take nothing from your fan support income."
Never: "Supercharge your fanbase!" or "Get started today!" or "You're all set!"

**The test:** Read the copy aloud. If it sounds like something a person you respect would say to you directly, it passes. If it sounds like an ad, it fails.

---

## 3. The ABLE wordmark

### Specification
- Typeface: Barlow Condensed 700
- Case: ALL CAPS
- Kerning: -0.02em letter-spacing
- No additional tracking adjustments — the condensed face at 700 weight is sufficient
- Never italicised
- Never in mixed case
- Never in a colour other than the two approved variants (see below)

### Colour variants
- **On dark backgrounds:** white (#ffffff) — used on able-v7.html, admin.html, landing.html dark sections
- **On light backgrounds:** midnight navy (#0d0e1a) — used on landing.html light sections, email headers, print
- **On artist accent backgrounds:** white only — never attempt to match the accent colour

### Size scale
- Hero: 48px / line-height 1.0 — landing.html hero, first impression
- Navigation: 24px / line-height 1.0 — admin.html top bar, start.html header
- Footer: 16px / line-height 1.0 — "Made with ABLE" footer
- Minimum legible: 12px — do not use below this size

### SVG asset (to be created)
Output file: `/assets/wordmark/able-wordmark-white.svg` and `/assets/wordmark/able-wordmark-dark.svg`
The SVG should render the wordmark as a path, not as live text — ensures consistent rendering across all environments.

### What the wordmark is not
- Not an icon (the "A" alone is acceptable as a favicon, not as a standalone brand mark in UI)
- Not a substitute for the ✦ symbol or vice versa
- Not to be enclosed in a box, circle, or badge shape

---

## 4. The ✦ symbol

### What it is
The ✦ symbol (U+2726 BLACK FOUR POINTED STAR) is a punctuation mark. It indicates craft. It marks a moment of particular intention. It is not a logo, not a badge, not a decoration applied by default.

### When to use it
- **Section transitions:** Between major sections when a visual breath is needed
- **Headline emphasis:** Placed before or after a key phrase in a landing page headline
- **Footer mark:** Part of the "Made with ABLE" footer ("✦ ABLE")
- **Copy moments:** In admin.html milestone messages where the moment deserves weight ("✦ Your first fan.")
- **Dividers:** Between items in a list when a standard bullet point would feel too mechanical

### When not to use it
- Never as a loading indicator or spinner
- Never as a star rating or review mark
- Never in clusters of 3 or more (not ✦✦✦)
- Never larger than 1em relative to surrounding text
- Never as the sole brand identifier on a page (ABLE is always accompanied by the wordmark)
- Never in CTA button labels

### Size and colour
- Size: always relative to the surrounding text — never larger than 1em
- Colour: inherits from context. On artist pages: can be `--color-accent`. On admin/landing: white or muted text colour. Never pure black unless in contrast theme.
- Spacing: 0.5em margin on each side when used inline

### The Unicode vs SVG question
Use the Unicode character (✦) in HTML. Do not replace it with an SVG asset — the Unicode character is sufficient and performs better. The SVG wordmark is for the lockup only.

---

## 5. Favicon specification

### The mark
- A capital "A" in Barlow Condensed 700
- White (#ffffff) letterform on midnight navy (#0d0e1a) background
- The letterform should fill approximately 70% of the canvas — not touching the edges, not lost in the background

### Sizes required
| File | Size | Format | Usage |
|---|---|---|---|
| `favicon.svg` | Scalable | SVG | Modern browsers |
| `favicon-32.png` | 32×32px | PNG | Browser fallback |
| `favicon-16.png` | 16×16px | PNG | Legacy browser fallback |
| `apple-touch-icon.png` | 180×180px | PNG | iOS home screen |
| `favicon-192.png` | 192×192px | PNG | Android home screen (PWA) |
| `favicon-512.png` | 512×512px | PNG | PWA splash screen |

### HTML implementation (apply to all active pages)
```html
<link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
```

### Pages to apply it to
- landing.html
- admin.html
- able-v7.html
- start.html
- fan.html (when built)

---

## 6. OG image template

### Landing page OG card (static, create first)

**Dimensions:** 1200×630px
**Format:** PNG (not JPG — preserve text clarity)
**Background:** #0d0e1a (midnight navy)
**File location:** `/assets/og/og-landing.png`

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ABLE                              [top-left, 48px]        │
│                                                            │
│                                                            │
│         The page that belongs to you,                      │
│         not to the platform.          [center, 40-48px]    │
│                                                            │
│                          ✦                                 │
│                                                            │
│                                    ablemusic.co [btm-right]│
└────────────────────────────────────────────────────────────┘
```

**Typography:**
- ABLE wordmark: Barlow Condensed 700, white, 48px, top-left with 48px padding
- Headline: Barlow Condensed 700, white, 44px, centered, max-width 800px
- Domain: DM Sans 400, #666a8a (muted), 20px, bottom-right with 48px padding
- ✦: white, 24px, centered below headline, 24px margin

**Meta tags (add to landing.html `<head>`):**
```html
<meta property="og:title" content="ABLE — The page that belongs to you">
<meta property="og:description" content="Your link-in-bio that owns the fan relationship. Pre-save, gig mode, fan capture. Free to start.">
<meta property="og:image" content="https://ablemusic.co/assets/og/og-landing.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta property="og:url" content="https://ablemusic.co">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://ablemusic.co/assets/og/og-landing.png">
```

### Artist page OG card (Phase 2 — dynamic)

Each artist's page should generate a unique OG card using their:
- Name (Barlow Condensed 700)
- Accent colour (background or accent element)
- Profile artwork or a colour-wash version of their artwork
- The ABLE wordmark in the corner (small, restrained)

This requires a Netlify function using Satori (React → SVG → PNG). Not required for Phase 1. Spec when building Phase 2 Supabase backend.

---

## 7. The "Made with ABLE" footer

### Copy (final)
`✦ ABLE · Your page is free →`

The ✦ is a mark of craft. ABLE is the brand. "Your page is free →" is the invitation. The arrow suggests it is tappable. Together: small enough to not intrude, clear enough to be curious-inducing.

### Link target
`/` — landing.html, with a query parameter for attribution: `/?src=footer&artist=[slug]`

This allows the analytics to confirm the footer is generating inbound and which artist pages are the best acquisition channels.

### Visual treatment
- Position: bottom of the artist's profile page, below the last section
- Size: 13px, DM Sans 400
- Colour: --color-text-3 (muted text, approximately 40% opacity relative to the artist's text colour)
- Alignment: center
- Padding: 32px top, 24px bottom
- No border, no card, no background — it should feel like a whisper, not a note

### Tier gating
- Free tier: visible (required — this is the growth loop)
- Artist tier (£9/mo): visible by default, option to hide in admin.html settings
- Artist Pro (£19/mo): hidden by default
- Label (£49/mo): hidden

### Implementation note
The footer should be rendered in the page's HTML, not injected by JavaScript, so it is visible in the source and indexable. It should not be hidden by CSS if the artist has a paid tier — it should simply not be rendered.

---

## 8. The backstage metaphor (admin.html brand principle)

The admin dashboard is backstage. The artist's profile page is the stage.

This distinction governs every design decision for admin.html:

**On stage (able-v7.html):**
- The artist's colours, their typography, their identity
- ABLE is invisible (except the "Made with ABLE" footer on free tier)
- The fan sees the artist, not the platform

**Backstage (admin.html):**
- A different aesthetic: warmer, more functional, deliberately not the same surface
- Amber (#f4b942) as the accent — distinctive from any artist's profile accent
- Near-black (#09090f) as the base — slightly darker and more neutral than the profile's midnight navy
- Plus Jakarta Sans as the body font — professional without being cold
- The feeling: "you're in control here, not on display"

**The warm cream (#e8e4dd) moment:**
When admin.html is in its light/day mode (if implemented), the warm cream background reinforces the backstage feeling — natural light, working space, creative thinking. Not a sterile white dashboard.

**The test for every admin design decision:**
Does this feel like a backstage working environment for an artist who takes their craft seriously? Or does it feel like a SaaS product for business users?

---

## 9. Brand surface map

| Surface | ABLE brand visibility | Artist brand visibility |
|---|---|---|
| landing.html | Primary — ABLE's own identity | None |
| start.html | Primary — ABLE's own identity | Emerging (preview) |
| admin.html | Primary — backstage identity | Minimal (artist name only) |
| able-v7.html (free tier) | "Made with ABLE" footer only | Full — artist owns this page |
| able-v7.html (paid tier) | None | Full |
| fan.html | Minimal — ABLE nav only | Artist cards (accent, name, artwork) |
| Confirmation emails (from ABLE) | ABLE voice | Artist name in subject line |
| OG card (artist page, Phase 2) | Wordmark in corner, small | Artist name, artwork, accent colour dominant |

The gradient is intentional: ABLE is loudest where the artist is setting up (landing, onboarding, admin). ABLE is quietest where the fan is present (artist profile). This is the brand strategy.
