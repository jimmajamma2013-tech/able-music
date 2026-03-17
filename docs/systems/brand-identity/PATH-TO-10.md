# ABLE — Brand Identity: Path to 10/10
**Created: 2026-03-16**

> This is the execution checklist for the brand identity spec. Work through phases in order. Each item has a clear done state. Do not mark an item done unless the done condition is fully met.

---

## Phase 0 — The visible gaps (Day 1 priority)

These are the brand elements that are visible to anyone encountering ABLE right now. Fix these first.

### P0.1 — Favicon
**Done when:** Every browser tab open to an ABLE page shows the ABLE favicon. No exceptions.
**Estimated time: 30 minutes**

**Exact steps — use realfavicongenerator.net:**

1. **Create the source image (5 minutes)**
   - Open https://figma.com (free account is fine)
   - Create a new frame: 512×512px
   - Fill it with `#0d0e1a`
   - Add a text layer: type `A` in Barlow Condensed, weight 700, colour `#ffffff`
   - Size: approximately 360px tall — it should fill about 70% of the canvas vertically, centred
   - Select the text layer → Right-click → Outline stroke (converts text to paths — removes font dependency)
   - Export the frame as PNG at 1× — save as `able-favicon-source.png`

2. **Generate all sizes (5 minutes)**
   - Go to https://realfavicongenerator.net
   - Click "Select your Favicon image" — upload `able-favicon-source.png`
   - On the iOS configuration page: set background colour to `#0d0e1a` (not white)
   - On the Android/Chrome page: set theme colour to `#0d0e1a`
   - On the Windows Metro page: set tile colour to `#0d0e1a`
   - Leave all other settings at defaults
   - Click "Generate your Favicons and HTML code" at the bottom

3. **Download and place files (5 minutes)**
   - Download the generated favicon package (ZIP file)
   - Create `/assets/favicon/` directory at the project root if it does not exist
   - Extract all files from the ZIP into `/assets/favicon/`
   - Key files to confirm are present:
     - `favicon.ico` (multi-size, for legacy browsers)
     - `favicon-16x16.png`
     - `favicon-32x32.png`
     - `apple-touch-icon.png` (180×180)
     - `android-chrome-192x192.png`
     - `android-chrome-512x512.png`
     - `site.webmanifest`

4. **Add the HTML (10 minutes — 4 files)**
   - The site copies the HTML snippet from realfavicongenerator. It will look like this:
   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
   <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
   <link rel="manifest" href="/assets/favicon/site.webmanifest">
   ```
   - Paste this block into the `<head>` of: `landing.html`, `admin.html`, `able-v7.html`, `start.html`
   - Place it after the `<title>` tag and before any `<style>` or `<script>` tags

5. **Verify (5 minutes)**
   - Open each of the 4 files in a browser
   - Check the browser tab — the ABLE "A" icon should appear
   - On macOS Safari: bookmark the page and check the bookmark icon
   - On iPhone: use "Add to Home Screen" — the apple-touch-icon should appear

**Common failure:** The path in the `href` must match exactly where the files are served from. If running locally via a file:// URL, use relative paths. If served from the root, `/assets/favicon/...` is correct.

**After this step, brand identity dimension 3 (favicon) moves from 2/10 to 10/10.**

---

### P0.2 — OG image for landing.html
**Done when:** Sharing `ablemusic.co` on Twitter/X, LinkedIn, iMessage, and WhatsApp shows the correct OG card with the ABLE wordmark, headline copy, and domain.
**Estimated time: 45 minutes**

**Exact layout specification — 1200×630px:**

```
Canvas: 1200×630px
Background: #0d0e1a (fill entire canvas)

ABLE wordmark:
  Text: "ABLE"
  Font: Barlow Condensed 700
  Size: 48px
  Colour: #ffffff
  Position: top-left, 48px from left edge, 48px from top edge

Headline (centred):
  Text: "The page that belongs to you,\nnot to the platform."
  Font: Barlow Condensed 700
  Size: 52px
  Line height: 1.1
  Colour: #ffffff
  Position: horizontal centre, vertical centre (about y=280 from top)
  Max width: 800px — if text is wider, reduce size to 46px

✦ symbol:
  Text: "✦" (U+2726, copy-paste this character)
  Font: any — or use the character directly
  Size: 28px
  Colour: #ffffff, opacity 60%
  Position: centred horizontally, 48px below the headline text block

Domain text:
  Text: "ablemusic.co"
  Font: DM Sans 400 (or Inter 400 if DM Sans not available in Figma)
  Size: 20px
  Colour: #666a8a
  Position: bottom-right corner, 48px from right edge, 48px from bottom edge
```

**Creation steps:**
1. Open Figma — create a new frame: 1200×630px
2. Fill the frame with `#0d0e1a`
3. Add each text element above at the specified positions
4. Google Fonts are available in Figma — search "Barlow Condensed" and "DM Sans"
5. Export as PNG at 1× — save as `og-landing.png`
6. Create `/assets/og/` directory at project root
7. Place the file at `/assets/og/og-landing.png`

**Meta tags to add to landing.html `<head>`:**
```html
<meta property="og:title" content="ABLE — The page that belongs to you">
<meta property="og:description" content="Your link-in-bio that owns the fan relationship. Pre-save, gig mode, fan capture. Free to start.">
<meta property="og:image" content="https://ablemusic.co/assets/og/og-landing.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta property="og:url" content="https://ablemusic.co">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ABLE — The page that belongs to you">
<meta name="twitter:description" content="Your link-in-bio that owns the fan relationship.">
<meta name="twitter:image" content="https://ablemusic.co/assets/og/og-landing.png">
```

**Verification:**
- [ ] Deploy landing.html to the live domain (meta tags referencing absolute URLs only work on a live server)
- [ ] Test with Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] Test with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug
- [ ] Share the URL in iMessage — confirm the card preview appears
- [ ] Share in WhatsApp — confirm the card preview appears

**Common failure:** OG image not refreshing in Facebook debugger because the URL was previously cached as empty. Use the "Scrape Again" button in the Facebook debugger after deploying.

**After this step, brand identity dimension 4 (OG image) moves from 3/10 to 8/10.**

---

### P0.3 — Wordmark rules documented and applied
**Done when:** Every instance of the ABLE wordmark in the codebase uses the canonical spec.

**Steps:**
- [ ] Audit every file for the ABLE wordmark: landing.html, admin.html, able-v7.html, start.html
- [ ] Confirm each uses: Barlow Condensed 700, all-caps, letter-spacing: -0.02em
- [ ] Fix any non-compliant instances
- [ ] Create the SVG wordmark asset: `/assets/wordmark/able-wordmark-white.svg`
- [ ] Create the SVG wordmark asset: `/assets/wordmark/able-wordmark-dark.svg`
- [ ] Note: replacing live `<span>` text with `<img>` is optional for V1 — the spec is what matters now

---

### P0.4 — ✦ symbol rules documented and audited
**Done when:** Every ✦ instance in the codebase is compliant with the rules in SPEC.md §4.

**Steps:**
- [ ] Audit every file for ✦ instances (grep for `✦` and `\u2726`)
- [ ] For each instance: check against the allowed use cases in SPEC.md §4
- [ ] Remove or replace any non-compliant uses
- [ ] Confirm no cluster uses (✦✦✦)
- [ ] Confirm no ✦ larger than 1em relative to surrounding text

---

### P0.5 — "Made with ABLE" footer finalised
**Done when:** The footer appears on able-v7.html in free-tier mode with the correct copy, visual treatment, and link target.

**Steps:**
- [ ] Confirm footer copy: `✦ ABLE · Your page is free →`
- [ ] Confirm link target: `/?src=footer&artist=[slug]` (or `/?src=footer` until slug system is live)
- [ ] Confirm visual treatment: 13px, DM Sans 400, --color-text-3, center-aligned
- [ ] Confirm footer is rendered in HTML (not injected by JavaScript)
- [ ] Confirm footer is visible on free-tier pages
- [ ] Confirm footer is hidden on Artist Pro and Label tier pages
- [ ] Verify on 375px width — does it wrap correctly? Is it legible?
- [ ] Verify on 430px width — does it look right?

---

## Phase 1 — Brand guidelines one-pager

**Done when:** A single document exists that can be shared with a designer or developer who has never seen ABLE before, and they can make brand-consistent decisions without asking questions.

### P1.1 — Brand guidelines document
**Contents required:**

- [ ] One-sentence brand personality (from SPEC.md §1)
- [ ] ABLE's own voice: 3 example phrases that are on-brand, 3 that are off-brand
- [ ] Wordmark rules: typeface, weight, kerning, colour variants, minimum size
- [ ] ✦ symbol rules: when to use, when not to, size constraint
- [ ] Colour palette: #0d0e1a (profile/landing), #09090f (admin), #f4b942 (admin accent), #e8e4dd (admin light), with hex codes
- [ ] Typography: Barlow Condensed 700 (display), DM Sans (profile body), Plus Jakarta Sans (admin body)
- [ ] The brand surface map (from SPEC.md §9) — "ABLE loud on setup, silent on the artist's page"
- [ ] "Made with ABLE" footer: exact copy, visual spec, link target
- [ ] Favicon: reference the asset files
- [ ] OG image: reference the asset files

**Format:** Markdown document at `/docs/systems/brand-identity/GUIDELINES.md`. Not a PDF — it should be version-controlled alongside the codebase.

---

### P1.2 — Artist page OG card spec (Phase 2 placeholder)
**Done when:** A spec document exists for the dynamic artist OG card, even if it is not yet built.

- [ ] Spec written: what elements are on the card, how accent colour is used, where the ABLE wordmark appears
- [ ] Technical approach noted: Netlify function + Satori (React → SVG → PNG)
- [ ] Linked from OG/SEO spec at `docs/systems/seo-og/SPEC.md`
- [ ] Marked as Phase 2 (do not build until Supabase backend is live)

---

## Phase 2 — Motion and brand moments

These are meaningful enhancements, not required for launch.

### P2.1 — Animated wordmark for loading states
**Done when:** The ABLE wordmark has a defined animation for use in loading states and page transitions.

- [ ] Animation spec: what moves, how fast, what easing
- [ ] Suggested approach: the letters appear left-to-right with deceleration easing (cubic-bezier(0.25, 0.46, 0.45, 0.94)), total duration 400ms
- [ ] Applied to: start.html Done screen transition, landing.html hero entry
- [ ] Not applied to: admin.html (backstage is calmer — no animation for the wordmark)
- [ ] Performance check: animation uses only `opacity` and `transform`

---

### P2.2 — Brand video (15 seconds)
**Done when:** A 15-second video exists that captures what ABLE is, for use on landing.html and social.

**The brief:**
- No voiceover needed
- Show an artist page loading on a phone, looking genuinely beautiful
- Show a fan signing up — the confirmation moment
- Show the admin dashboard — a clean shot of "Your list. Your relationship."
- End on the ABLE wordmark
- Music: something real from a beta artist (with permission)
- Aspect ratios: 16:9 (landing page), 9:16 (social/Instagram)

**Note:** This is Phase 2 because you need real beta artist pages to show. A dummy page will look like a dummy page.

---

### P2.3 — Wordmark lockup with ✦ (formal asset)
**Done when:** A locked-up SVG exists combining the ABLE wordmark and ✦ for footer and email use.

- [ ] Design: `✦ ABLE` — symbol 0.8em, gap 0.4em, wordmark at standard weight
- [ ] Export as SVG: `/assets/wordmark/able-lockup-footer-white.svg`
- [ ] Export as SVG: `/assets/wordmark/able-lockup-footer-dark.svg`
- [ ] Apply to: email footer template, "Made with ABLE" footer (as an img tag)

---

## What's explicitly deferred (do not build speculatively)

| Item | Why deferred | When |
|---|---|---|
| Artist page OG card (dynamic) | Requires Supabase + Netlify function | Phase 2 |
| Brand video | Requires real beta artist pages | Phase 2 |
| Animated wordmark | Nice-to-have, not conversion-critical | Phase 2 |
| Dark/light mode favicon variants | One version is sufficient for launch | Phase 2 |
| Brand style tiles for press | Need the product proven first | Phase 3 |
| ABLE design tokens as a public npm package | Open-source play — far future | Year 2+ |
