# ABLE — Brand Identity: Path to 10/10
**Created: 2026-03-16**

> This is the execution checklist for the brand identity spec. Work through phases in order. Each item has a clear done state. Do not mark an item done unless the done condition is fully met.

---

## Phase 0 — The visible gaps (Day 1 priority)

These are the brand elements that are visible to anyone encountering ABLE right now. Fix these first.

### P0.1 — Favicon
**Done when:** Every browser tab open to an ABLE page shows the ABLE favicon. No exceptions.

**Steps:**
- [ ] Design the favicon: "A" in Barlow Condensed 700, white on #0d0e1a, 70% canvas fill
- [ ] Export as SVG: `/assets/favicon/favicon.svg`
- [ ] Export as PNG 32×32: `/assets/favicon/favicon-32.png`
- [ ] Export as PNG 16×16: `/assets/favicon/favicon-16.png`
- [ ] Export as Apple touch icon 180×180: `/assets/favicon/apple-touch-icon.png`
- [ ] Export as PNG 192×192 (PWA): `/assets/favicon/favicon-192.png`
- [ ] Add HTML `<link>` tags to landing.html
- [ ] Add HTML `<link>` tags to admin.html
- [ ] Add HTML `<link>` tags to able-v7.html
- [ ] Add HTML `<link>` tags to start.html
- [ ] Verify in Chrome, Safari, and Firefox on both macOS and mobile
- [ ] Verify Apple touch icon appears when adding to iOS home screen

**Design tool note:** Figma is sufficient. Export the "A" as text converted to outlines at 700 weight. The SVG should have no embedded fonts — outlines only.

---

### P0.2 — OG image for landing.html
**Done when:** Sharing `ablemusic.co` on Twitter, LinkedIn, iMessage, and WhatsApp shows the correct OG card with the ABLE wordmark, headline copy, and domain.

**Steps:**
- [ ] Design the OG card at 1200×630px following the layout spec in SPEC.md §6
- [ ] Headline copy finalised: "The page that belongs to you, not to the platform."
- [ ] Export as PNG: `/assets/og/og-landing.png`
- [ ] Add Open Graph meta tags to landing.html `<head>` (full spec in SPEC.md §6)
- [ ] Add Twitter card meta tags to landing.html `<head>`
- [ ] Test with Twitter Card Validator (cards-dev.twitter.com/validator)
- [ ] Test with Facebook Sharing Debugger (developers.facebook.com/tools/debug)
- [ ] Test by sharing the URL in iMessage and WhatsApp — confirm the card appears

**Common failure:** OG image not refreshing in Facebook debugger because the URL was cached with the old (empty) meta. Use the "Scrape Again" button in the Facebook Sharing Debugger.

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
