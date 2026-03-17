# ABLE — Logo Strategy: Path to 10/10
**Created: 2026-03-16**

> LOGO-STRATEGY.md is a 10/10 specification. This document tracks what needs to happen to produce the actual logo asset files — the point at which the specification becomes a tangible, usable system.

---

## The gap

The strategy is complete. The assets do not exist. Every item in LOGO-STRATEGY.md Part 7 is an asset that needs to be created by a human (James or a designer) using a visual tool (Figma, Sketch, or similar). This document sequences that work.

---

## Phase 0 — Visible gaps (needed before any public presence)

These are the assets that are visible to anyone encountering ABLE right now. They do not exist. Fix these first.

### 0.1 — Favicon set
**Done when:** Every browser tab open to an ABLE page shows the ABLE favicon.

**Tool:** realfavicongenerator.net — paste the SVG, download the package.

Steps:
- [ ] Open Figma (or equivalent)
- [ ] Create 512×512px canvas, midnight navy `#0d0e1a` background
- [ ] Set text: "A", Barlow Condensed 700
- [ ] Scale the "A" to fill approximately 70% of the canvas height, centred
- [ ] Convert text to outlines (Object → Flatten or equivalent)
- [ ] Export as SVG
- [ ] Paste into realfavicongenerator.net
- [ ] Download the favicon package
- [ ] Place files in `/assets/favicon/`
- [ ] Add `<link>` tags to landing.html, admin.html, able-v7.html, start.html
- [ ] Verify on a real browser tab — confirm the favicon shows

---

### 0.2 — ABLE wordmark SVGs (white and dark)
**Done when:** `/assets/wordmark/able-wordmark-white.svg` and `/assets/wordmark/able-wordmark-dark.svg` exist as path-outline SVGs.

Steps:
- [ ] Open Figma
- [ ] Type "ABLE", Barlow Condensed 700, letter-spacing -0.02em
- [ ] Set colour to white (#ffffff)
- [ ] Object → Flatten to convert to paths
- [ ] Export as SVG (transparent background)
- [ ] Save as `able-wordmark-white.svg`
- [ ] Repeat with colour `#0d0e1a` for dark variant
- [ ] Place in `/assets/wordmark/`

---

### 0.3 — OG image for landing.html
**Done when:** Sharing `ablemusic.co` on Twitter, LinkedIn, iMessage, and WhatsApp shows the correct ABLE card.

Steps:
- [ ] Open Figma (or any image editor)
- [ ] Create 1200×630px canvas, background `#0d0e1a`
- [ ] Add ABLE wordmark (white): top-left, 48px from edges, approximately 48px tall
- [ ] Add headline: "The page that belongs to you, not to the platform." — Barlow Condensed 700, white, 44px, centred, max-width ~800px
- [ ] Add ✦ character below headline: white, 24px, centred, 24px margin
- [ ] Add "ablemusic.co": DM Sans 400, `#666a8a` (muted), 20px, bottom-right, 48px from edges
- [ ] Export as PNG: `/assets/og/og-landing.png`
- [ ] Add OG meta tags to landing.html `<head>` (full tag set in SPEC.md §6)
- [ ] Test with Twitter Card Validator
- [ ] Test with Facebook Sharing Debugger

---

### 0.4 — site.webmanifest
**Done when:** `/site.webmanifest` exists in the project root with correct contents.

Steps:
- [ ] Copy the JSON from LOGO-STRATEGY.md Part 5
- [ ] Save as `/site.webmanifest`
- [ ] Add `<link rel="manifest" href="/site.webmanifest">` to all active pages
- [ ] Add `<meta name="theme-color" content="#0d0e1a">` to all active pages

---

## Phase 1 — Before significant social activity

### 1.1 — Standalone mark SVGs
**Done when:** `/assets/logo/able-mark-light.svg` and `/assets/logo/able-mark-dark.svg` exist.

These are derived from `able-logo-instagram.svg` but with a transparent background (removing the `#0e0d0b` rect) for use in places where the background should show through.

Steps:
- [ ] Open `able-logo-instagram.svg` in Figma or a text editor
- [ ] Remove the background `<rect>` element
- [ ] Adjust colours as specified for each variant (see LOGO-STRATEGY.md Part 2)
- [ ] Export each variant
- [ ] Place in `/assets/logo/`

---

### 1.2 — Social profile photo
**Done when:** A 400×400px PNG exists for use on Instagram, TikTok, and X.

Steps:
- [ ] Export `able-logo-instagram.svg` at 400×400px
- [ ] Save as `able-profile-photo-400.png`
- [ ] Upload to Instagram, TikTok, and X as the profile photo

---

### 1.3 — Mark + wordmark lockup
**Done when:** `/assets/logo/able-lockup-light.svg` exists and is usable as an email header.

Steps:
- [ ] In Figma: mark on the left, wordmark on the right
- [ ] Wordmark baseline aligns with mark body baseline (not the gold foot)
- [ ] Gap between mark and wordmark = one mark width
- [ ] Export as SVG, transparent background
- [ ] Test in email client (paste as `<img>` tag)

---

## Phase 2 — Before Phase 2 backend

### 2.1 — Amber mark (admin use)
- [ ] Create `/assets/logo/able-mark-amber.svg`
- [ ] Use in admin.html navigation alongside wordmark

### 2.2 — White mark (artist accent backgrounds)
- [ ] Create `/assets/logo/able-mark-white.svg`
- [ ] Use wherever artist accent colour is used as a background

### 2.3 — Monochrome mark
- [ ] Create `/assets/logo/able-mark-mono.svg`
- [ ] Document: only for print/emboss/single-colour contexts

### 2.4 — Artist OG card spec
- [ ] Write the Satori/Netlify function spec for dynamic OG cards
- [ ] Link from `docs/systems/seo-og/SPEC.md`

---

## The single most important action

**Create the favicon.** It takes 30 minutes. It is visible on every browser tab, every time someone looks at an ABLE page. Right now those tabs show a generic browser icon. Every day that passes without a favicon is a small credibility miss. Start here.
