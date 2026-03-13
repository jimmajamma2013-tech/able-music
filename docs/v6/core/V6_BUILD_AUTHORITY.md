# ABLE V6 — Canonical Build Authority
**Version:** 1.0
**Date:** 2026-03-13
**Status:** ACTIVE — this file supersedes all earlier addenda and build prompts on every point it addresses.
**Successor to:** V5_BUILD_PROMPT.md (v5.4), V5_RESEARCH_ADDENDUM.md, ABLE_V5_BUILD_DOC_10OF10_FINAL_HARDENING_ADDENDUM.md and all earlier addenda.

---

## 0. What this document is

This is the single source of build truth for ABLE v6. It does not summarise research. It does not present options. It records final decisions.

Every decision in this document was derived from the full research corpus: USER_RESEARCH.md, DESIGN_RESEARCH_2026.md, VISUAL_SYSTEM.md, MASTER_PLAN.md, PLATFORM_STRATEGY.md, PRODUCT_HIERARCHY_AND_TRUST.md, INTEGRATIONS_AND_AI_RESEARCH.md, DISCOVERY_AND_GROWTH.md, ECOSYSTEM_AND_PARTNERSHIPS.md, COPY_AND_DESIGN_PHILOSOPHY.md, V5_RESEARCH_ADDENDUM.md (26 sections), and the Final Hardening Addendum. Where those documents contradicted each other, this file resolves the contradiction and records only the decision that stands.

**Target output:** `able-v6.html` — one file, no bundler, no framework.

---

## 1. Authority chain

When any document in the project disagrees with this file, this file wins. The hierarchy is:

1. **This file** — `V6_BUILD_AUTHORITY.md`
2. `V5_RESEARCH_ADDENDUM.md` — for any detail not addressed here
3. `V5_BUILD_PROMPT.md` (v5.4) — for any structural or phase detail not addressed above
4. `VISUAL_SYSTEM.md` — authoritative on fonts and accent values (verified against this file below)
5. All other files — reference and archive only

---

## 2. Contradictions resolved — settled for good

These were live contradictions across the docs. Each is resolved here. Do not revisit.

### 2.1 Themes — four, exactly

**Dark / Light / Glass / Contrast.**

`Mid` does not exist. It appeared in `CLAUDE.md` and nowhere else. It is not defined, not implemented, not authoritative. Physically remove any reference to `Mid` or `Mid-tone` from active files. Archive files may retain it as historical record only.

### 2.2 File name — v6

The target file is `able-v6.html`. The earlier documentation called it `able-v5.html`. The version number is updated to reflect the depth of the research refinement since that naming. Do not create `able-v5.html`. Build `able-v6.html`.

### 2.3 Pricing — four tiers, these exact prices

| Tier | Price | Monthly fans cap | Snap cards |
|---|---|---|---|
| Free | £0 | 100 | 1 |
| Artist | £9/mo | Unlimited | Unlimited |
| Artist Pro | £19/mo | Unlimited | Unlimited + AI + broadcasts |
| Label | £49/mo | Unlimited × 10 pages | All |

Annual billing: offer at ~17% saving. Monthly is the headline. Never default to annual. The £7/mo figure in `landing.html` is wrong — update to £9/mo.

### 2.4 Spotify monthly listeners — NOT available

Spotify's public API does not return monthly listener counts for arbitrary artists without special access. **Do not use Spotify monthly listener count as a required or expected data field anywhere in v6.** It cannot be pulled automatically. If it appears in the UI, it must be artist-entered manually or blank. Remove it from the Connections tab as a default expected field.

What Spotify API *does* return (use these): artist name, profile photo, genres, top tracks (via `/artists/{id}/top-tracks`), follower count (lower-quality metric — optional), albums and singles list.

### 2.5 Bandsintown — optional enrichment only

Bandsintown is a convenience connection. It is not the canonical events source. Manual event entry is the v1 canonical source of truth. If Bandsintown connection fails, is unavailable, or the artist has no Bandsintown profile, the Shows section renders from manually-entered events only. Never show a broken or empty Shows section because of a Bandsintown failure.

### 2.6 Performance metrics — Core Web Vitals only

Replace all language referencing "First Meaningful Paint" or "FMP" with the three Core Web Vitals that matter for 2026 production:

- **LCP** (Largest Contentful Paint) — loading quality
- **INP** (Interaction to Next Paint) — responsiveness
- **CLS** (Cumulative Layout Shift) — layout stability

### 2.7 Backend — Supabase for v1 (final)

`admin.html` already has Supabase JS CDN configured and working. **Supabase is the v1 backend.** localStorage maps 1:1 to Supabase tables. Do not build Cloudflare D1 infrastructure for v6 v1.

Stack: Supabase (PostgreSQL + Auth + Storage + Edge Functions) · Netlify (static hosting) · Stripe (payments) · Resend (email delivery).

Cloudflare Workers + D1 + R2 is the documented v2 scale path. It remains architecturally valid. It is not the current implementation target. BACKEND_SCHEMA.md has been updated to reflect PostgreSQL/Supabase for v1, with migration notes for Cloudflare D1 if needed later.

### 2.8 Fan capture placement — after hero, not above fold

Fan capture appears **after** the hero block, bio strip, and quick-action pills. It does not appear above the fold on cold visits. Research basis: the fan must first understand who the artist is before they are asked for anything. The screenful-3 placement (Smart Blogger research) is correct. A secondary capture at page bottom is optional.

### 2.9 Pop vibe display font — Barlow Condensed only

The V5_RESEARCH_ADDENDUM listed "Barlow Condensed or Nunito" for Pop. Resolved: **Barlow Condensed 700**. Nunito is too soft for the confidence the Pop vibe requires. Barlow Condensed is already loaded for Electronic — sharing one font across two vibes reduces the font payload. Barlow Condensed at r-mult 1.4 (rounder corners) reads differently from Barlow Condensed at r-mult 0.8 (Electronic) — the differentiation is in the radius system, not the font.

### 2.10 Electronic r-mult — 0.6, not 0.8

V5_BUILD_PROMPT.md showed r-mult 0.8 for Electronic. V5_RESEARCH_ADDENDUM showed 0.6. The canonical table in Section 3.1 is the final truth: **0.6** for Electronic. Sharper corners, more precision.

### 2.11 Body font — DM Sans, not Plus Jakarta Sans

VISUAL_SYSTEM.md, V5_MASTER_BRIEF.md, and individual vibe entries in those docs specify "Plus Jakarta Sans" as the body font. That was the original design intent. It was superseded when `admin.html` was built with Plus Jakarta Sans and the profile page was differentiated. **The artist profile page (`able-v6.html`) uses DM Sans as body font.** Plus Jakarta Sans remains the admin dashboard body font. They are separate files with separate tokens — do not conflate them. Remove "Plus Jakarta Sans" from any active v6 vibe spec. It belongs to the admin layer only.

### 2.12 Backend — Supabase is v1. Cloudflare D1 is not v1.

Section 2.7 states Supabase for v1. BACKEND_SCHEMA.md was written with a different stack decision (Cloudflare D1 + Workers). This is resolved: **Supabase is the v1 backend. Cloudflare D1 is not the v1 backend.** The SQL schema in BACKEND_SCHEMA.md has been updated to PostgreSQL (Supabase). Cloudflare D1 remains a technically valid v2 migration path when scale demands it, but it is not the active v1 decision.

Rationale for keeping Supabase: `admin.html` already has `@supabase/supabase-js` configured and working. The localStorage → Supabase migration is the same flush-and-sync operation regardless of which database is behind it. Supabase's Row Level Security (RLS) gives GDPR compliance properties that would otherwise require custom Worker middleware. Starting with what is already configured is the correct call.

---

## 3. Design system — final canonical values

### 3.1 Vibe table (authoritative — use these exact values)

| Vibe | Display font | Weight | Accent | r-mult | ls-display |
|---|---|---|---|---|---|
| Electronic/Club | Barlow Condensed | 700, uppercase | `#06b6d4` cyan | 0.6 | 0.06em |
| Hip Hop/Rap | Oswald | 700, uppercase | `#f4b942` gold | 0.7 | 0.04em |
| R&B/Soul | Cormorant Garamond | 600 italic | `#e06b7a` rose | 1.2 | 0.02em |
| Indie/Alt | Space Grotesk | 700 | `#7ec88a` sage | 1.0 | -0.01em |
| Pop | Barlow Condensed | 700 | `#9b7cf4` indigo | 1.4 | 0.03em |
| Rock/Metal | Oswald | 700, uppercase | `#e05242` red | 0.6 | 0.08em |
| Acoustic/Folk | Lora | 700, serif | `#d4a96a` ochre | 1.3 | 0.01em |

Body font (all vibes): **DM Sans**, `font-display: swap`. (Plus Jakarta Sans is the admin dashboard body font — different file, different token. Do not mix.)

> **ls-display note:** Values are positive (open) for condensed/uppercase fonts because condensed + uppercase + tight tracking reads as compressed. 0.06em on Barlow Condensed uppercase creates the "precision grid" feel. Negative tracking is wrong for this pairing. V5_MASTER_BRIEF.md listed negative values (`-0.02em`) which are superseded by the values in this table.

Font loading rule: load only the active vibe's display font + DM Sans on initial render. In demo/specimen mode, load all. Never preload all 7 display fonts on a live profile.

### 3.2 Theme tokens — final canonical values

```css
.theme-dark {
  --color-bg:          #0d0e1a;
  --color-surface:     #111427;
  --color-card:        #12152a;
  --color-card-raised: #1a1e38;
  --color-border:      rgba(255,255,255,0.06);
  --color-text:        #f0ede8;
  --color-text-2:      rgba(240,237,232,0.6);
  --color-text-3:      rgba(240,237,232,0.35);
  --color-overlay:     rgba(13,14,26,0.7);
  --shadow-card:       0 2px 16px rgba(0,0,0,0.4);
}

.theme-light {
  --color-bg:          #f0ede8;   /* warm cream — not clinical white */
  --color-surface:     #e8e4de;
  --color-card:        #ffffff;
  --color-card-raised: #f8f5f2;
  --color-border:      rgba(0,0,0,0.08);
  --color-text:        #0d0e1a;
  --color-text-2:      rgba(13,14,26,0.6);
  --color-text-3:      rgba(13,14,26,0.35);
  --color-overlay:     rgba(240,237,232,0.7);
  --shadow-card:       0 2px 16px rgba(0,0,0,0.08);
}

.theme-glass {
  --color-bg:          transparent;  /* needs real background behind */
  --color-surface:     rgba(255,255,255,0.06);
  --color-card:        rgba(255,255,255,0.08);
  --color-card-raised: rgba(255,255,255,0.12);
  --color-border:      rgba(255,255,255,0.12);
  --color-text:        #f0ede8;
  --color-text-2:      rgba(240,237,232,0.7);
  --color-text-3:      rgba(240,237,232,0.4);
  --backdrop:          blur(28px) saturate(180%);
}

.theme-contrast {
  --color-bg:          #000000;
  --color-surface:     #0a0a0a;
  --color-card:        #111111;
  --color-card-raised: #1a1a1a;
  --color-border:      rgba(255,255,255,0.2);
  --color-text:        #ffffff;
  --color-text-2:      rgba(255,255,255,0.8);
  --color-text-3:      rgba(255,255,255,0.5);
}
```

Glass theme law: there must be a real background behind the glass surfaces — artist hero artwork at `blur(40px) scale(1.1)`, `position: fixed; inset: 0; z-index: -1`. Glass on a plain background colour is meaningless and is forbidden.

### 3.3 Static tokens (global — never change)

```css
:root {
  --font-body:     'DM Sans', system-ui, sans-serif;

  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-5: 20px; --sp-6: 24px; --sp-8: 32px; --sp-10: 40px;
  --sp-12: 48px; --sp-16: 64px;

  --tap-min: 44px;

  --text-xs: 11px; --text-sm: 13px; --text-base: 15px;
  --text-lg: 17px; --text-xl: 20px; --text-2xl: 24px;
  --text-3xl: 32px; --text-4xl: 40px;
  --text-hero: clamp(48px, 14vw, 80px);

  --lh-tight:   0.88;
  --lh-display: 1.0;
  --lh-body:    1.5;
  --lh-label:   1.2;

  --r-pill: 999px;
  /* --r-sm, --r-md, --r-lg, --r-xl computed via JS from r-mult × base values */

  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-accel:    cubic-bezier(0.55, 0, 1, 0.45);
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);

  --dur-instant: 80ms;
  --dur-fast:    150ms;
  --dur-mid:     250ms;
  --dur-slow:    400ms;
  --dur-xslow:   600ms;

  --color-state-pre:  #fbbf24;
  --color-state-live: #ef4444;
  --color-state-gig:  #8b1e1e;  /* deep red — gig only, nowhere else */
  --color-state-prof: #06b6d4;

  --color-ambient:    0,0,0;    /* overridden by canvas artwork extraction — see §3.6 */
}
```

### 3.4 Derived token JS (run on load and on every accent/vibe change)

```js
function applyDerivedTokens(root, accentHex, rMult) {
  const [r,g,b] = hexToRgb(accentHex)
  root.style.setProperty('--color-accent',      accentHex)
  root.style.setProperty('--color-accent-rgb',  `${r},${g},${b}`)
  root.style.setProperty('--color-accent-glow', `rgba(${r},${g},${b},0.35)`)
  root.style.setProperty('--color-accent-soft', `rgba(${r},${g},${b},0.12)`)
  root.style.setProperty('--r-sm',  `${4  * rMult}px`)
  root.style.setProperty('--r-md',  `${8  * rMult}px`)
  root.style.setProperty('--r-lg',  `${16 * rMult}px`)
  root.style.setProperty('--r-xl',  `${24 * rMult}px`)
}
```

### 3.5 CTA border-radius rule

Hero CTAs: `border-radius: var(--r-sm)` (4–8px depending on vibe). NOT `--r-pill`. Pill radius on primary CTAs signals "consumer app." Small radius signals premium confidence. Pills (`--r-pill: 999px`) are for Quick Action pills only.

### 3.6 Artwork ambient colour — Phase 1

`--color-ambient` is set by canvas extraction from the hero artwork. This is not a nice-to-have — it is the single strongest differentiator in the design system. The hero background gradient bleeds the artwork's dominant colour into the page atmosphere. Every artist's page feels unique without custom work.

**Implementation:**
```js
function extractAmbientColour(imgEl, root) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 4; canvas.height = 4
  ctx.drawImage(imgEl, 0, 0, 4, 4)
  const d = ctx.getImageData(0, 0, 4, 4).data
  // Average the 16 pixels, bias toward saturation
  let r=0,g=0,b=0
  for (let i=0; i<d.length; i+=4) { r+=d[i]; g+=d[i+1]; b+=d[i+2] }
  const n = d.length/4
  root.style.setProperty('--color-ambient', `${Math.round(r/n)},${Math.round(g/n)},${Math.round(b/n)}`)
}
```

Usage: `background: radial-gradient(ellipse at top, rgba(var(--color-ambient),0.25) 0%, transparent 65%)`

**If no artwork:** `--color-ambient` defaults to `0,0,0` (set in `:root`). Background renders as flat dark. No error state, no broken gradient. The feature degrades cleanly.

**Fire after:** hero image loads (`img.onload` or `IntersectionObserver`). Run once per profile load. Do not block rendering. Canvas must be same-origin or CORS-enabled.

---

## 4. Performance law — hard budgets

These are production ceilings for the public artist page on a mid-range Android at the 75th percentile field level.

| Metric | Budget |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.10 |
| HTML (minified + gzipped) | ≤ 340kB |
| Internal stretch goal (warm visit hero stable) | ≤ 1.8s |

**Rendering law:** ABLE is local-first for presentation.
1. Render from last known good localStorage profile immediately — no waiting for APIs.
2. Refresh remote data in background.
3. If any external API (Spotify, YouTube, Bandsintown) fails: degrade to cached data → manual data → hidden section. Never blank a section shell. Never block render.
4. Core identity (name, hero, primary CTA, fan capture) must render from HTML + inline critical CSS alone, with no dependency on any external call.

**No render-blocking scripts in `<head>`.** All `<script>` tags at end of `<body>` or `defer`.

---

## 5. Accessibility law — WCAG 2.2 AA is a release gate

Not a goal. A gate. The page does not ship until these pass.

- Visible focus indicators on all interactive elements
- All primary flows keyboard-reachable
- All interactive elements ≥ 44×44px tap target
- Meaningful labels for all buttons, icon-only controls, form fields
- State changes, confirmations, and non-focus updates exposed via polite ARIA live regions
- Contrast compliant in all four themes for text, controls, and key boundaries
- No motion-only communication of important state

### 5.1 Reduced-motion law

When `prefers-reduced-motion: reduce` is active — these are not suggestions:

**Stop entirely:**
- Hero name slide-up (show immediately in final position)
- Staggered card bloom (all cards appear at once)
- Platform pill shimmer
- Confetti burst (show success state only)
- Artist name gloss pass
- Stats counter animation (show final number)
- Countdown digit flip (show static value)
- Skeleton shimmer (show static skeleton)

**Keep, but instant:**
- Campaign state change: 0ms crossfade
- Tab indicator: instant position jump
- Theme switch: instant colour swap
- Error shake: instant red border (no translate)
- Panel open/close: opacity fade 80ms only, no translate

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for Web Animations API and canvas-based animations that CSS cannot override.

---

## 6. Architecture decisions

### 6.1 Page structure (section order — non-negotiable)

```
Status bar (iOS)
↓
Hero / Top card (artwork / video / embed)
  Artist name, genre/location tag, state chip
  Bio strip (2–3 lines, tap More to expand)
  Primary CTA (56px, full-width, accent fill)
  Secondary CTA (ghost, same height)
↓
Quick Action pills (horizontal scroll, max 4 visible + More)
↓
Fan capture (screenful 3 placement — after hero, bio, pills)
  "Stay close." heading
  Email field → submit → spinner → checkmark → confetti → email echo
↓
Listen section
↓
Shows section (or Shows before Listen in gig state)
↓
Snap cards (artist updates, horizontal scroll)
↓
Merch section (if configured — hide entirely if empty)
↓
Support section (if configured)
↓
Credits (collapsed accordion)
↓
Recommendations (artist's picks, optional)
↓
Footer ("Made with ABLE" + "Your list. Export any time.")
↓
Bottom tab bar (fixed — 5 tabs)
```

Fan capture secondary position: bottom of page above footer (deliberate catch-all for fans who read everything).

### 6.2 localStorage schema (canonical — map 1:1 to Supabase)

```javascript
// able_v3_profile — authoritative key
{
  name, handle, location, genres: [],
  bio, accent, theme, heroTag, vibe,
  pageState,      // 'live' | 'pre-release' | 'profile' | 'gig'
  stateOverride,  // null | explicit state | 'auto'
  releaseDate,    // ISO string | null
  release: { title, type, trackCount, year },
  ctaPrimary: { label, url },
  ctaSecondary: { label, url },
  topCard: { type, videoUrl, embedUrl },
  platforms: [{ label, url, type }],         // max 8
  releases: [{ id, title, type, year, artworkUrl, displayMode, platformUrl,
               tracks: [{ num, title, duration }],
               credits: [{ name, role, confirmed: bool }],
               inCurrentSetlist: false }],
  events: [{ id, venue, city, date, time, ticketUrl, soldOut }],
  merch: { shopUrl, provider, items: [{ id, title, price, imageUrl, url, emoji, badge }] },
  support: { enabled, packs: [{ id, label, description, price, url, type, emoji, stripe_price_id }] },
  snapCards: [{ id, type, bg, text, ctaLabel, ctaUrl, imageUrl, published, ts }],
  recommendations: [{ name, ableHandle, url, note }],   // max 5
  studioMode: { enabled, roles: [], rateCard: null, availability: 'available' | 'booking-from' | 'closed' }
}

// able_fans — schema
{ email, ts, source, name?, consent: true, consentMethod, jurisdiction, double_opted_in: bool, opted_in_at? }

// able_clicks — max 200, FIFO
{ label, type, ts, source }
// type values (frozen — never change after v6 ships):
// 'primary_cta' | 'secondary_cta' | 'pill' | 'snap_card' | 'platform' | 'merch_item' | 'support_pack'

// able_views — max 500, FIFO
{ ts, source }

// able_artist_id — UUID, auto-generated on first load, never overwrite
```

Source taxonomy (frozen — do not change after v6 ships): `direct | instagram | tiktok | youtube | qr | email | other`

> **v3 source taxonomy conflict:** v3 used `reel | story | post | bio | direct | email`. These values are superseded. v6 uses platform-level granularity. Any migration from v3 localStorage data should map: `reel → instagram`, `story → instagram`, `post → instagram`, `bio → direct`. The v6 taxonomy is more accurate and aligns with UTM `?src=` parameter values.

### 6.3 Campaign state machine

```javascript
function computeState(profile) {
  if (profile.stateOverride && profile.stateOverride !== 'auto') return profile.stateOverride
  const now = Date.now()
  const release = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null
  if (!release) return 'profile'
  if (now < release) return 'pre-release'
  if (now < release + 14 * 86400000) return 'live'
  return 'profile'
}
// Gig state set manually via admin toggle. Auto-expires 24h (able_gig_expires timestamp).
// Gig overrides all other states while active.
```

### 6.4 Admin model

The artist admin is a slide-up panel on the profile itself — NOT a separate page in v6. When the artist is authenticated:
- A small edit trigger is visible (pen icon, bottom-right, dimmed)
- Tap → bottom sheet slides up (60% screen height), profile scales to 0.95 behind it with dimmed backdrop
- Desktop (>768px): split-screen — left = edit forms, right = live mobile preview updating as artist types

### 6.5 Android back gesture

- Panel open → `history.pushState({panel: 'name'}, '')`. `popstate` → close that panel.
- Tab switches do NOT push history entries.
- Never use `history.back()` to navigate within ABLE — it exits the profile unpredictably.
- Back gesture from Home tab → browser default (exits ABLE).

---

## 7. Micro-interaction law

### 7.1 Animation rules (hard)

Animate only: **`opacity`**, **`transform`**
Never animate in loops: `box-shadow`, `width`, `height`, `top`, `left`, `filter`, `backdrop-filter`, `background-color`
For glow animations: `opacity` on a `::after` pseudo-element containing the shadow. Never animate the shadow directly.
`will-change: transform` only where needed — overusing it degrades performance.
`touch-action: manipulation` on all interactive elements — eliminates 300ms tap delay.
60fps on mid-range Android (Pixel 5a / Samsung Galaxy A42) is a hard requirement.

### 7.2 Must-build interactions (Phase 1)

These ship with v6. In this order:

1. **Scale-down on press** — all interactive elements, `scale(0.97)` on `pointerdown`, spring-back on release. iOS fix: `document.addEventListener('touchstart', () => {})`.
2. **Tab indicator spring** — single sliding element, `transition: left 350ms var(--ease-spring)`. Overshoots and bounces.
3. **Hero name reveal** — `opacity: 0, translateY: 12px → 1, 0` over 400ms decel. Fire inside `document.fonts.ready.then(...)`.
4. **Staggered card bloom** — hero: rAF on load. Below fold: IntersectionObserver. Two separate systems. `(i % 6) * 60ms` stagger. Cap at 6 items.
5. **Skeleton shimmer** — `animation: shimmer 1.5s ease-in-out infinite`. All elements `animation-delay: 0s` (no offsets — unison shimmer is the design).
6. **Email focus glow** — `border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft)`. Kills browser blue ring.
7. **Submit: loading → checkmark → confetti → echo** — spinner appears optimistically, morphs to checkmark on success. 40 particles (accent + white). Echo: "We've got you — [email] is on [Artist]'s list."
8. **Error shake** — `translateX(-8px, 8px, -5px, 5px)` 400ms. Border → `--color-state-live`. Suppress on retype.
9. **Campaign state crossfade** — `opacity: 1 → 0` (150ms), apply new state, `opacity: 0 → 1` (250ms). Asymmetric.
10. **Live pulsing dot** — gig state only, `scale(1)→scale(1.4)`, 2s ease-in-out infinite, `--color-state-gig`. Animate `opacity` + `scale` only.
11. **Scroll-to-top on re-tap active tab** — no bounce, `scrollTo({top:0, behavior:'smooth'})`.
12. **Lazy image blur-up** — accent gradient placeholder at full dimensions, real image fades over. No blank rectangles.
13. **Panel slide-up** — `translateY(100%)→translateY(0)`, `--ease-spring`, 350ms. Backdrop `opacity: 0→0.55`, `--ease-standard`, 250ms.
14. **Panel exit** — `--ease-accel`, 250ms. Always faster than entry.
15. **Tab bar hide/show on scroll** — down + >100px: `translateY(100%)`, `--ease-accel`, 200ms. Up: reveal, `--ease-decel`, 200ms.
16. **Email paste flash** — input background `rgba(accent, 0.1)` fades 400ms on `paste` event.
17. **Copy link flash** — "Copied!" 2s, bg `rgba(accent, 0.15)`. Show `able.fm/handle` not full URL.

### 7.3 Phase 2 interactions (after Phase 1 is stable)

Gig mode flash (once per session), countdown digit flip, artwork colour extraction, ambient glow breathing, artist name gloss pass, overflow pill inline expansion, platform pill shimmer, tab icon bounce, support tier card lift, release badge asymmetric swap, connection badge slide-in, section header pin, deep link highlight.

---

## 8. Fan capture law

### 8.1 Placement (settled)

1. Primary: after hero, bio, pills — screenful 3. Not above fold on cold visit.
2. Secondary: bottom of page, above footer.
3. Never: pop-up on first visit. Content gate on first visit.

### 8.2 Copy (first-person, settled)

| Do not use | Use |
|---|---|
| "Sign up" | "Stay close." |
| "Subscribe" | "I'm in" |
| "Get updates" | "Count me in" |
| "Join the list" | "Let's stay close" |
| Second-person CTA | First-person CTA (+90% conversion, ContentVerve) |

Trust line: "Just [Artist Name]. No spam." — artist voice, not legal boilerplate.
Supporting text (below input): "I'll only reach out when something's actually happening."

### 8.3 Form spec

- `type="email"`, `autocomplete="email"`, `inputmode="email"` — non-negotiable for mobile conversion
- `autocapitalize="off"` on the input
- Button minimum height 44px
- Email only by default. Optional name field (artist-configurable in admin). Never 3+ fields.

### 8.4 GDPR — double opt-in (law, not optional)

1. Fan submits email → optimistic success (confetti + echo fires immediately)
2. Background: fan record created `double_opted_in: false`, confirmation email sent
3. Confirmation email subject: "Confirm you want updates from [Artist Name]"
4. Fan confirms → `double_opted_in: true`, `opted_in_at` timestamp
5. No confirmation within 7 days → one reminder email, then soft-delete at 30 days
6. Unconfirmed fans: shown in fan list with `○` marker, excluded from broadcasts
7. Store per fan: IP hash (SHA-256, never raw), confirmation timestamp, method: `'double_optin_email'`
8. Analytics distinguish: "X fans total. Y confirmed for emails." Never hide the distinction.

Sending domain: ABLE-controlled subdomain (e.g. `mail.able.fm`). Custom artist sending domains are Phase 2. v1: artist display name, ABLE infrastructure.

---

## 9. Upgrade triggers — precise moment and language

### 9.1 The five moments (in priority order)

**1. Hitting the 100-fan limit — highest intent**
Show progress bar `N/100 fans` from fan 1. At 95 fans, message:
> "Your list is full. These are 100 people who asked to hear from you. Don't leave them waiting."
Never: "Upgrade to continue."

**2. Setting a release date**
Auto-trigger a 14-day Artist tier trial. Artist is in high-stakes preparation mode. Trial outperforms hard gate 2–3× in this context.

**3. Activating gig mode**
Same 14-day trial trigger.

**4. First CTA click data arrives**
> "12 people tapped your Spotify link today." Gentle upgrade prompt inline. Emotion: "it's working."

**5. Wanting to send a broadcast**
> "You have 67 people waiting to hear your news. Send them something."

### 9.2 Language rules

| Works | Banned |
|---|---|
| "Send your record to the 87 people who asked for it" | "Unlock email broadcasts" |
| "You have 23 fans in Manchester — upgrade to see who they are" | "Advanced analytics" |
| "Your list is full — these people want to hear from you" | "Upgrade to continue" |
| "You're treating this seriously now" (identity upgrade) | "Grow your audience" |

Gold lock pattern: blurred preview + specific value overlay. Example: "You have 23 fans in Manchester. Upgrade to see who they are before your show there."

### 9.3 Billing

Monthly by default. Annual at ~17% saving ("Want to save 2 months?"). Never default to annual — UK indie artists on irregular income need monthly optionality. Annual reduces churn 30–50% for those who choose it.

ABLE positioning: replaces Linktree Pro (£8/mo) + basic email tool (£10/mo). Net saving, more capability.

---

## 10. Support packs — Stripe architecture

Payment provider: **Stripe**. No other provider for v6.

Purchase flow:
1. Fan taps tier card → card lifts `translateY(-4px)`, accent border
2. CTA activates: "Support at [Tier] — £[price]"
3. Bottom sheet slides up with Stripe Payment Element
4. Payment → confetti → card glows → checkmark → confirmation copy
5. Confirmation: "You're supporting [Artist] at [Tier]. [Tier description]. Thank you." — specific, warm.

Artist revenue: **0% ABLE platform cut on support packs**. Stripe standard fee only (1.4% + 20p UK cards). Say this on:
- Support section of artist profile (subtle, below packs)
- Landing page pricing section
- Admin setup flow

Stripe Connect for artist payouts. ABLE creates Stripe Product + Price via API. Artist never logs into Stripe.

---

## 11. AI features — model and cost spec

Provider: Claude API (Anthropic).
- Real-time suggestions: `claude-haiku-4-5` (fast, cheap)
- Bio writer: `claude-sonnet-4-6` (quality matters more)

| Feature | Model | Rate limit | Tier |
|---|---|---|---|
| Bio writer | Sonnet | 10/day | Artist Pro |
| CTA variants | Haiku | 30/day | Artist + |
| Snap card copy | Haiku | 20/day | Artist Pro |
| Caption generator | Haiku | 20/day | Artist + |

System prompt prefix for all ABLE AI requests:
```
You are a copy assistant for ABLE, a platform for independent musicians.
Write in the artist's voice: first person, honest, direct, no marketing language.
Never use: "superfans", "monetise", "grow your audience", "content creator",
"going viral", exclamation marks, generic SaaS phrases.
Write short. Say one true thing. Stop.
```

---

## 12. Operational decisions — v1 only

These stop the five missing operational docs from staying abstract.

**Email:** ABLE-controlled sending domain. Display name = artist name. One-click unsubscribe. Plain-text-first. Custom artist domains = Phase 2.

**SEO:** Canonical URL = ABLE page URL for v1. Custom domains = Phase 2 (v1 architecture must not block them). Structured data: artist + event schema. OG image = deterministic hero-based per profile (static generation at Netlify function layer). State-specific OG = Phase 2.

**"Made with ABLE" footer:** Free tier profiles show a subtle `var(--color-text-3)` footer line: "Made with ABLE". This is not a banner — it is one quiet line. Removed on Artist tier and above. This is the primary organic viral loop for ABLE discovery — a fan lands on a profile, sees it, becomes an artist themselves. Build it into the page structure from day one. Free tier = visible. Any paid tier = hidden. No exceptions.

**QR code (Phase 1 — admin only):** Every artist gets a custom-coloured QR code in their admin panel. Colour matches their accent. One-tap download as PNG. Destination URL: `able.fm/[handle]?src=qr`. This maps to the `qr` source value in the frozen source taxonomy. QR codes at gigs are the highest-converting offline touchpoint (data: artists who use them see 3–5× higher sign-up rates at live shows). Build the QR generation into admin.html — not into the public profile. Use a library like `qrcode.js` (CDN) — no server round-trip needed for generation.

**Trust and safety:** First 5 externally-visible credits per new professional-facing profile enter confirmation workflow before being treated as trusted. Clear reportable flow for abuse/impersonation/bad links before public rollout. No public rating system in v1.

**Analytics:** First-party, privacy-light. Source taxonomy fixed and explicit (see Section 6.2). Default attribution: last non-direct touch within fixed window. Never imply precision ABLE cannot measure in in-app browsers.

**Events:** Manual entry = canonical v1 source of truth. External connectors = optional enrichment only. Failure of any event connector never blocks the Shows section when manual data exists. No events → intentional empty state and move on.

---

## 13. V6 execution checkpoints

Claude must not consume the build as one undifferentiated task. Use these checkpoints. Do not jump to polish before Checkpoint 4.

**Checkpoint 1 — Authority confirmation**
Output: "V6 authority confirmed. Canonical rules accepted. Building `able-v6.html`."

**Checkpoint 2 — Foundation**
`:root` tokens, 4 theme classes, 7 vibe classes, font loading strategy (DM Sans always, display font on demand), `applyDerivedTokens()` function, shell structure (iOS frame, status bar, scroll container, tab bar).

**Checkpoint 3 — Hero and state machine**
Top card (artwork/video/embed), hero name, state chip, bio strip, primary and secondary CTAs, campaign state logic (`computeState()`), local-first render from localStorage, skeleton screens.

**Checkpoint 4 — Main flow**
Fan capture (with GDPR fields), Quick Action pills, Listen section, Shows section (geo-aware surfacing, smart expiry), Snap cards, Merch section, Support section, Credits accordion, Recommendations, Footer.

**Checkpoint 5 — Interaction layer**
All 17 Phase 1 interactions from Section 7.2. Reduced-motion fallbacks for all. Android back gesture handling. Tab bar hide/show.

**Checkpoint 6 — Accessibility and performance pass**
WCAG 2.2 AA audit: focus indicators, tap targets, ARIA, contrast across all 4 themes and 7 vibes. CLS check (skeleton shapes must approximate real content). Performance: HTML size, no render-blocking resources.

**Checkpoint 7 — Final output**
Emit complete `able-v6.html`. Screenshot all 4 themes × 7 vibes × 4 states = 112 combinations (Playwright, spot-check minimum 12). Note what is deferred.

---

## 14. What v6 is — and why not v5

The build that was planned as `able-v5.html` started from V5_BUILD_PROMPT.md (5 versions of refinement). Through the addenda process, substantial new decisions were added: performance budgets, local-first rendering law, accessibility as a gate, Spotify monthly listeners correction, Bandsintown truth, backend resolution, fan capture placement correction, SoundBetter anti-pattern analysis, GDPR double opt-in, upgrade trigger precision, AI cost model, and operational v1 decisions.

The outcome is materially different from what `able-v5.html` was specced to be. It warrants a version increment.

**v6 vs the current v3 in plain terms:**

| v3 (current) | v6 (building) |
|---|---|
| 4 themes working | 4 themes + 7 vibes (CSS vibe system) |
| Single accent colour | Vibe sets default accent, artist overrides |
| Micro-interactions scaffolded | All 17 Phase 1 interactions wired |
| localStorage only | localStorage + Supabase backend path |
| Fan capture basic | GDPR double opt-in, optimistic UI |
| Campaign states working | State machine + auto-switch + gig timer |
| Admin as separate file | Admin as slide-up panel on same file |
| Snap cards hardcoded | Snap cards dynamic (artist-editable) |
| No skeleton screens | Full skeleton system |
| No performance budget | LCP/INP/CLS law |
| No reduced-motion | Full reduced-motion implementation |
| Spotify monthly listeners expected | Removed — not available via public API |

---

## 15. What v6 does not build (v1 scope — deferred)

These are explicitly out of scope for the initial v6 build. Architecture must not block them.

- Rooms / Stage Can (fan community, tipping) — Phase 2
- Press pack (`able.fm/name/press`) — Phase 2
- Story Mode (video assembly) — Phase 2
- Ablers referral programme — Phase 2 (needs subscriber base first)
- Studio/freelancer mode — Phase 2 (separate onboarding path)
- Fan feed (fan.html) — Phase 2
- Globe heatmap analytics — Phase 2
- Velocity leaderboard / discovery — Phase 2
- Custom artist sending domains — Phase 2
- Custom artist URLs — Phase 2
- Setlist mode — Phase 2
- Social commerce (Fourthwall/Shopify connect) — Phase 2 (external link cards only in v1)
- Linktree importer — Phase 2 (high value for onboarding but not blocking v1 launch; v1: manual link entry)
- Mailchimp/Kit export sync — Phase 2
- Printful POD integration — Phase 3
- Cloudflare edge migration — Phase 2 infrastructure

---

## 17. The conduit principle

**Added: 2026-03-13. Status: ACTIVE. Supersedes any earlier section that implies ABLE should feel like a link aggregator.**

ABLE is not a directory of links. It is not a platform that traps. It is the cleanest, most natural bridge between the artist and the deeper platform experience. Every design and build decision should ask: does this bring the fan closer to the content, or does it push them away to a link?

### 17.1 Embeds over links — default rule

If content can be experienced inside the page, it must be. Linking out is the fallback, not the default.

| Content type | Conduit behaviour |
|---|---|
| Spotify track | Iframe auto-loads. No play button required. |
| Spotify album/playlist | Iframe auto-loads at 352px height. |
| YouTube video | Thumbnail with YT-branded play button. Tap → 16:9 inline iframe with autoplay. |
| SoundCloud / Mixcloud | Artwork + play overlay. Tap → embed expands in-card. |
| Merch items | Product image dominates. Price overlays the image. External link only when tapped. |
| Events with ticketUrl | Ticket CTA is a full-height accent stripe on the card — it IS the action, not a footnote. |
| Snap cards | Square native-post feel (1:1 image). CTA spans full card width at bottom. |

### 17.2 Platform native feel — implementation rules

- **Spotify embeds**: no artwork card, no "Play inline" text button. The Spotify iframe IS the visual. Track = 152px, album/playlist = 352px (inferred from URL shape `/track/`, `/album/`, `/playlist/`).
- **YouTube in hero** (`topCard.type = 'video'`): auto-generate thumbnail from `img.youtube.com/vi/{id}/maxresdefault.jpg` if no posterUrl. Use the YouTube red rectangle play icon, not a generic circle play.
- **YouTube in listen section**: same treatment. Thumbnail → YT badge → tap → 16:9 iframe with autoplay=1.
- **Event cards with `venueImageUrl`**: full-bleed image behind the card, `rgba(0,0,0,0.60+)` gradient overlay, content floats above it. Cards without an image: editorial text card, date column, accent-filled ticket stripe at full card height.
- **Merch with `imageUrl`**: price overlays the image bottom-left (`linear-gradient(to top, rgba(0,0,0,0.72), transparent)`). Price is NOT shown again in the info row below.
- **Support packs**: never `--r-pill` on price buttons. `--r-sm` only. Pill = consumer app. Small radius = precision confidence.

### 17.3 What "conduit" means for copy

The language must never suggest ABLE is an intermediary layer. The artist is not "using ABLE to share links." The fan is not "visiting the artist's ABLE page." They are close to the artist. The page is the artist.

- Never: "Stream on Spotify" as a link that opens a new tab and leaves
- Always: "Play this" / "Listen" with inline playback where possible
- Never: event cards that are just rows of text data
- Always: event cards that feel like the ticket is already in your hand

### 17.4 Landing page and all other pages

The conduit principle applies to every ABLE file, not just `able-v6.html`:

- **`landing.html`**: the phone mockup must show real native embeds — a Spotify widget, a YouTube thumbnail, an event card with a full-bleed venue image. Not placeholder screenshots.
- **`start.html`**: onboarding copy should set the expectation of embeds, not links. "Your music plays here" not "Add your streaming links."
- **`admin.html`**: when an artist enters a Spotify URL, show them a live preview of what the embed looks like. Make the conduit feel tangible at setup time.

---

## 16. The freeze condition

This document replaces all earlier addenda. It is not frozen until:

1. `able-v6.html` passes all 7 checkpoints
2. All 4 themes render correctly in Playwright
3. All 4 campaign states render correctly
4. Fan capture GDPR fields wired to Supabase
5. WCAG 2.2 AA audit passed for core flows
6. CLS < 0.10 verified on Lighthouse mobile
7. HTML ≤ 340kB gzipped

---

*This document is build authority. Read it before touching code. Where it is silent, read V5_RESEARCH_ADDENDUM.md. Where that is silent, read V5_BUILD_PROMPT.md (v5.4).*
