# ABLE — Logo Strategy
**Created: 2026-03-16 | Status: canonical**
**Extends:** `docs/systems/brand-identity/SPEC.md` (brand identity specification)

> SPEC.md defines what the brand is. This document defines how the logo is used in practice — every context, every size, every variant, and the non-negotiable rules that prevent brand erosion.

---

## Part 1: What ABLE's logo system currently is

The `able-logo-instagram.svg` file in the project root defines the mark. It is not a wordmark — it is an abstract symbol: a narrow vertical rectangle (white, warm off-white — `#e4dfd2`) with a shorter gold rectangle at its base (`#c9b76c`). The proportions are 1:5 width-to-height, body at 4/5, gold foot at 1/5.

The mark is deliberately minimal. It does not contain the word "ABLE". It does not contain a letter. It does not reference music iconography. This is correct — the mark does not need to explain itself. It needs to be distinctive, reproducible at any size, and readable as a character.

The background in the SVG is `#0e0d0b` — a warm near-black, distinct from pure black (`#000000`) and from the midnight navy of the profile page (`#0d0e1a`). This distinction matters: the mark lives in its own environment, not the UI background.

### The two-part logo system

ABLE has two distinct logo elements:

1. **The mark** — the vertical bar with gold foot (described above). Used at small sizes, for social profile photos, favicons, and anywhere the wordmark cannot be read.
2. **The wordmark** — "ABLE" in Barlow Condensed 700, all-caps, letter-spacing -0.02em. Used in navigation, landing page hero, emails, and anywhere context allows a larger lockup.

These two elements may be used separately. They may also be used together (mark left, wordmark right, with appropriate clear space). They are never combined in a visual cluster with other elements.

---

## Part 2: Logo Variants Required

### Variant 1 — The mark, light (primary)

**File:** `/assets/logo/able-mark-light.svg`
**Description:** White mark (`#e4dfd2`) with gold foot (`#c9b76c`), on transparent background
**When to use:** On dark backgrounds — midnight navy (`#0d0e1a`), near-black (`#09090f`), any dark artist accent background, social profile photos
**Minimum size:** 24px width — below this the gold foot is not distinguishable from the body

---

### Variant 2 — The mark, dark

**File:** `/assets/logo/able-mark-dark.svg`
**Description:** Near-black mark (`#0d0e1a`) with dark amber foot (`#b8a050`), on transparent background
**When to use:** On light backgrounds — warm cream (`#f0ede8`), white, light sections of landing.html
**Minimum size:** 24px width
**Note:** The dark variant's gold foot uses a slightly deeper amber than the light version to maintain contrast on light backgrounds. Never use the light variant on a light background — it disappears.

---

### Variant 3 — The mark, white (pure)

**File:** `/assets/logo/able-mark-white.svg`
**Description:** Pure white mark and foot, on transparent background
**When to use:** On coloured backgrounds where the brand amber foot would clash with the background colour — artist accent backgrounds, branded imagery, print
**When not to use:** On white or very light backgrounds; alongside other amber or gold elements where the gold foot reads as decoration rather than intent
**Minimum size:** 24px width

---

### Variant 4 — The mark, amber (admin)

**File:** `/assets/logo/able-mark-amber.svg`
**Description:** Amber mark (`#f4b942`) with lighter amber foot, on transparent background
**When to use:** Admin.html surfaces only — the admin uses amber as its accent. The amber mark signals "this is the backstage environment." Never use the amber mark on artist-facing pages (able-v7.html) or landing.html.
**Minimum size:** 24px width

---

### Variant 5 — The mark, monochrome

**File:** `/assets/logo/able-mark-mono.svg`
**Description:** Single colour mark (black or white, no two-tone) — the gold foot is the same colour as the body
**When to use:** Embossing, watermarking, black-and-white print, situations where one colour is mandated
**Note:** The monochrome variant loses the two-tone character that makes the mark distinctive. Only use it when two colours are genuinely not possible. If in doubt, use the standard variant.
**Minimum size:** 24px width

---

### Variant 6 — The wordmark, white

**File:** `/assets/wordmark/able-wordmark-white.svg`
**Description:** "ABLE" in Barlow Condensed 700, all-caps, letter-spacing -0.02em, white (`#ffffff`), on transparent background
**When to use:** Navigation bars, dark backgrounds, email headers, the "✦ ABLE" footer
**Minimum size:** 80px wide (approximately 24px tall at standard proportions) — below this, the letterforms compress and read as a blur

---

### Variant 7 — The wordmark, dark

**File:** `/assets/wordmark/able-wordmark-dark.svg`
**Description:** Same as above, midnight navy (`#0d0e1a`), on transparent background
**When to use:** Light backgrounds — landing.html light sections, print, warm cream sections of emails
**Minimum size:** 80px wide

---

### Variant 8 — The mark + wordmark lockup

**File:** `/assets/logo/able-lockup-light.svg` and `/assets/logo/able-lockup-dark.svg`
**Description:** Mark on the left, wordmark on the right. The wordmark baseline aligns with the mark's body baseline (not the gold foot). Gap between mark and wordmark: equal to one mark width.
**When to use:** Email headers, open graph images, press releases, any single-use brand moment that benefits from both elements together
**When not to use:** Navigation (too wide); profile photo contexts (mark only is correct)

---

## Part 3: Typography in the Logo

### The wordmark typeface

**Family:** Barlow Condensed
**Weight:** 700 (Bold)
**Case:** ALL CAPS — never mixed case, never lowercase
**Letter-spacing:** -0.02em
**Source:** Google Fonts CDN (`https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700`)

Barlow Condensed 700 was chosen for ABLE for specific reasons:

1. **Condensed geometry fits the mark.** The vertical emphasis of Barlow Condensed's letterforms matches the vertical proportions of the mark — a tall, narrow rectangle. The wordmark and the mark feel like they come from the same structural language.

2. **It reads as music, not tech.** Condensed sans-serifs are common in music poster design, festival branding, and editorial contexts. ABLE is a product for artists — the type signals that cultural context. A rounded sans-serif (the default choice for SaaS) would undermine the aesthetic positioning.

3. **At small sizes, it is unusually legible.** Condensed faces often struggle at small sizes because letterforms compress too much. Barlow Condensed at 700 weight maintains legibility because the heavier weight compensates for the reduced width. At 16px (the "Made with ABLE" footer), "ABLE" in Barlow Condensed 700 is fully readable where a lighter weight would not be.

4. **It is free and variable.** No licence cost. Google Fonts CDN. Already in use across the codebase — no new dependency.

### SVG asset requirement

The wordmark SVG assets should render "ABLE" as **path outlines, not live text**. This ensures:
- Consistent rendering across all environments without a font dependency
- The SVG displays correctly in email clients that do not load web fonts
- The file is self-contained — no external requests

When creating the SVG in Figma: type "ABLE" at the correct weight and letter-spacing, then Object → Flatten Selection (or equivalent) to convert to paths before exporting.

---

## Part 4: Context-by-Context Usage Guide

### 4.1 Browser Favicon

**Mark to use:** Mark (not wordmark) — too small for the wordmark to read
**Background:** `#0d0e1a` (midnight navy) — not transparent, not pure black
**Letterform inside:** The capital "A" in Barlow Condensed 700 is an acceptable alternative at 32×32 and below, where the two-tone mark loses fidelity. White "A", 70% canvas fill, centred.
**Files needed:**

| File | Size | Format | Location |
|---|---|---|---|
| `favicon.svg` | Scalable | SVG | `/assets/favicon/favicon.svg` |
| `favicon-32.png` | 32×32px | PNG | `/assets/favicon/favicon-32.png` |
| `favicon-16.png` | 16×16px | PNG | `/assets/favicon/favicon-16.png` |
| `apple-touch-icon.png` | 180×180px | PNG | `/assets/favicon/apple-touch-icon.png` |
| `favicon-192.png` | 192×192px | PNG | `/assets/favicon/favicon-192.png` |
| `favicon-512.png` | 512×512px | PNG | `/assets/favicon/favicon-512.png` |

**HTML implementation (apply to all active pages):**
```html
<link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
```

**Generator tool:** realfavicongenerator.net — paste the SVG, it outputs all sizes correctly. Free. No sign-up required.

**Apply to:** landing.html, admin.html, able-v7.html, start.html, fan.html (when built)

---

### 4.2 iOS Home Screen Icon (180×180)

The Apple touch icon must pass a specific test: a user who adds ABLE to their iOS home screen and sees it alongside Spotify, Instagram, and their camera roll — does the ABLE icon feel like it belongs at that quality level?

**Rules:**
- Midnight navy background, no transparency (iOS will add its own rounded corners)
- The mark centred, at approximately 50% of the canvas height — more restrained than a favicon because at 180×180 the full mark reads clearly
- Do not attempt to fit the wordmark here — the space is square, the wordmark is landscape

---

### 4.3 Social Profile Photos (Circular Crop)

All major platforms crop profile photos to a circle. The mark must work in a circle.

The current mark (centred on an 800×800 canvas, 320px total mark height, 64px width) leaves significant breathing room in the circle. This is correct. A mark that touches the circle's edges at any point looks trapped. ABLE's mark should look like it chose to be in the centre.

**Export instruction:** Export the `able-logo-instagram.svg` at the required size for each platform. The file is already optimised for this use. Do not add white corners or a different background when exporting — the near-black background (`#0e0d0b`) is part of the profile photo treatment.

Platform sizes are documented in `ACCOUNT-STRATEGY.md` Part 6.

---

### 4.4 Open Graph Images

**ABLE platform-level OG image (static):**

Dimensions: 1200×630px
Format: PNG (not JPG — preserve text clarity)
Background: `#0d0e1a`
File: `/assets/og/og-landing.png`

Layout:
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ABLE                                    [top-left, 48px pad]  │
│                                                                │
│                                                                │
│         The page that belongs to you,                          │
│         not to the platform.            [centre, 44px]         │
│                                                                │
│                      ✦                                         │
│                                                                │
│                                     ablemusic.co [btm-right]  │
└────────────────────────────────────────────────────────────────┘
```

The ABLE wordmark (not the mark) is used here — the OG image is seen at large sizes on desktop, and the wordmark reads clearly at those sizes. The mark alone would not identify the brand sufficiently in an unfamiliar context.

**Artist-specific OG images (Phase 2 — dynamic):**

When a fan shares an artist's ABLE page, the OG card should show:
- Artist artwork (left, filling the 630×630px square — 53% of total width)
- Artist name in Barlow Condensed 700, large, on the right panel
- "on ABLE" in DM Sans 400, small, below the name, right-aligned
- Accent colour used as a top border (4px) or as a subtle background wash on the right panel
- ABLE wordmark, white, bottom-right of the right panel — small (48px), present but not dominant

This requires a Netlify function with Satori (React → SVG → PNG). Not Phase 1. Spec in full when the Supabase backend is live.

---

### 4.5 The "Made with ABLE" Footer

The footer appears on free-tier artist profile pages. It is the primary organic growth mechanic.

**Copy:** `✦ ABLE · Your page is free →`
**Logo element used:** ABLE wordmark (live text, not SVG asset — the footer renders in HTML for SEO purposes)
**Implementation note:** The ✦ is Unicode `U+2726` — use the character directly, not an SVG.

Full visual treatment in `SPEC.md` §7.

---

### 4.6 Admin Dashboard Navigation

The ABLE wordmark appears in admin.html's top navigation bar.

**Variant:** Wordmark, amber (`#f4b942`) on the near-black admin background — this is the one context where the amber accent applies to the wordmark. It reinforces "you are backstage; the admin has its own identity."
**Implementation:** Live CSS text, not SVG asset — the admin wordmark is interactive (clicking takes the artist to their live page), and text is simpler to style here.
**Size:** 24px / line-height 1.0

---

### 4.7 Email Headers

**Variant:** Mark + wordmark lockup, white, on `#0d0e1a` background
**Dimensions:** Constrained to the email column width — typically 560–600px wide
**Mark height in lockup:** 32px — large enough to read clearly, not so large it dominates before the email content
**Background:** A narrow header bar at the top of the email, `#0d0e1a`, 80px tall, with the lockup vertically centred

---

## Part 5: The site.webmanifest (PWA)

For PWA compliance, ABLE pages need a manifest file. This covers the favicon in the Android/Chrome ecosystem and enables "Add to Home Screen" on Android.

**File:** `/site.webmanifest`
**Contents:**
```json
{
  "name": "ABLE",
  "short_name": "ABLE",
  "description": "Your page, your fans, your relationship.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d0e1a",
  "theme_color": "#0d0e1a",
  "icons": [
    {
      "src": "/assets/favicon/favicon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/favicon/favicon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**HTML tag (add to all active pages):**
```html
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0d0e1a">
```

**Note:** The artist's profile page (able-v7.html) presents a complication — the `theme-color` should ideally reflect the artist's accent colour, not the ABLE midnight navy. In Phase 2, this can be set dynamically from the artist's profile data with `document.querySelector('meta[name="theme-color"]').setAttribute('content', artistAccentHex)`.

---

## Part 6: Logo Usage Rules (the non-negotiables)

These rules exist because every time a logo rule is violated, it slightly dilutes the brand. Logos become strong through consistency and weak through variation.

### What you must never do

1. **Never stretch the logo.** Resize by scaling proportionally — lock the aspect ratio. A stretched mark or wordmark communicates carelessness faster than almost any other brand error.

2. **Never rotate the logo.** The mark is vertical. The wordmark is horizontal. Both orientations are fixed.

3. **Never add effects to the logo.** No drop shadow. No glow. No outer glow. No emboss. No bevel. No gradient. No opacity below 100% except when the logo is used in a deliberately ghosted/watermark context.

4. **Never put the logo on a patterned background** without a solid colour backing. On a complex photograph or texture, add a solid colour block behind the logo — midnight navy, near-black, or warm cream, depending on context.

5. **Never use the amber admin accent on artist-facing pages.** The amber mark variant is exclusively for admin.html. Using it on landing.html or able-v7.html breaks the brand surface map (ABLE loud on setup, silent on artist pages).

6. **Never invent new variants.** Do not create a "version" of the mark in green, pink, or any other colour because it seems appropriate for a specific campaign. New variants must be documented here before they are used. If you find yourself wanting a new variant, question whether the standard variants actually fail the use case first.

7. **Minimum size.** Wordmark: 80px wide minimum (24px tall). Mark: 24px wide minimum. Below these sizes, the elements are not distinguishable and should be replaced with text ("ABLE") rather than an illegible mark.

8. **Clear space.** The clear space around the logo is equal to the height of the "A" in the wordmark (or the width of the mark for the symbol-only version) on all four sides. Nothing — no text, no other logos, no UI elements — enters the clear space.

9. **Never combine the wordmark with artist accent colours.** The wordmark is white or midnight navy. The only exception is the amber admin variant. If you are on an artist's profile page, the wordmark does not appear in the artist's accent colour.

10. **The ✦ symbol is not a substitute for the logo.** It is punctuation. It marks a moment. It does not identify ABLE in a context where someone has not already seen the wordmark.

---

## Part 7: Asset production checklist

These assets need to be created. They do not yet exist. Sequence matters — create in priority order.

### Priority 0 (needed before any public launch)

- [ ] `favicon.svg` — white "A" on midnight navy, paths not live text
- [ ] `favicon-32.png` — exported from SVG
- [ ] `favicon-16.png` — exported from SVG
- [ ] `apple-touch-icon.png` (180×180)
- [ ] `favicon-192.png` and `favicon-512.png` for PWA
- [ ] `/assets/wordmark/able-wordmark-white.svg` — "ABLE" in Barlow Condensed 700 as paths
- [ ] `/assets/wordmark/able-wordmark-dark.svg` — same, midnight navy
- [ ] `/assets/og/og-landing.png` — 1200×630, following the layout in Part 4.4
- [ ] `site.webmanifest` in project root

### Priority 1 (needed before significant social activity)

- [ ] `/assets/logo/able-mark-light.svg` — standalone mark, transparent background
- [ ] `/assets/logo/able-mark-dark.svg` — standalone mark, dark variant
- [ ] `/assets/logo/able-lockup-light.svg` — mark + wordmark combination
- [ ] Social profile photo exported at 400×400px for Instagram, TikTok, X

### Priority 2 (complete before Phase 2 backend)

- [ ] `/assets/logo/able-mark-amber.svg` — for admin contexts
- [ ] `/assets/logo/able-mark-white.svg` — pure white, for artist accent backgrounds
- [ ] `/assets/logo/able-mark-mono.svg` — monochrome, for print
- [ ] `/assets/logo/able-lockup-dark.svg` — mark + wordmark, dark variant
- [ ] Artist OG image spec written (Phase 2 — see Part 4.4)

---

## Relationship to other documents

| Document | What it covers | Relationship |
|---|---|---|
| `docs/systems/brand-identity/SPEC.md` | Full brand identity: wordmark rules, ✦ symbol, OG template, "Made with ABLE" footer, admin backstage metaphor | Parent document — this strategy extends SPEC.md into practical per-context usage |
| `docs/systems/brand-identity/PATH-TO-10.md` | Execution checklist for brand identity gaps | The asset production checklist in Part 7 above maps directly to PATH-TO-10.md §P0 |
| `docs/systems/social-media/ACCOUNT-STRATEGY.md` | Which accounts to have and how to run them | Profile photo specs reference this document |
| `docs/systems/seo-og/SPEC.md` | OG meta tags and dynamic artist cards | OG image spec in Part 4.4 aligns with this |
| `docs/systems/pwa/SPEC.md` | Progressive web app requirements | The webmanifest spec in Part 5 relates to this |
