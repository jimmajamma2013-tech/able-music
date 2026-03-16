# ABLE Artist Profile — Design Specification
**File: `able-v7.html` | Created: 2026-03-16**
**Authority score: 9.7/10 | Build target**

> This is the canonical implementation reference for `able-v7.html`. A developer should be able to build the page from this document alone. Cross-reference `SPEC.md` (product purpose), `COPY.md` (all copy strings), `PATH-TO-10.md` (P0/P1/P2 gaps), and `USER-JOURNEYS.md` (interaction flows) for fuller context.

---

## 1. SURFACE CLASSIFICATION

| Property | Value |
|---|---|
| File | `able-v7.html` |
| Surface type | Fan-facing artist profile — public, shareable URL |
| Viewport primary | 390px (iPhone 14 baseline) |
| Viewport minimum | 375px (iPhone SE — no horizontal scroll at this width) |
| Viewport maximum | 430px app shell (`max-width: 430px`) centred on desktop |
| Desktop behaviour | Phone shell centred on dark surround (`background: #050505`) with `box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 32px 120px rgba(0,0,0,0.9)` |
| Scroll model | Single scroll container (`#scroll-container`), `overflow-y: auto`, hidden scrollbar, `overscroll-behavior-y: contain` |
| Rendering source | `localStorage` (immediate) → Supabase (when backend lands). Never wait for API on first paint. |
| Themes | 4: Dark (default), Light, Glass, Contrast |
| Vibes | 7: electronic, hiphop, rnb, indie, pop, rock, acoustic |
| Campaign states | 4: profile, pre-release, live, gig (+ post-gig sub-state) |
| Owner detection | `localStorage` profile owner match — shows edit pill, dashed rings, owner bar |
| Minimum tap target | 44px (`--tap-min`) |
| iOS safe areas | `env(safe-area-inset-top/bottom)` applied at status bar and scroll container padding |

---

## 2. DESIGN TOKENS

### 2.1 Static tokens (`:root`)

These are always present regardless of theme or vibe.

```css
/* Spacing scale */
--sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
--sp-5: 20px;  --sp-6: 24px;  --sp-8: 32px;  --sp-10: 40px;
--sp-12: 48px; --sp-16: 64px;

/* Minimum tap target */
--tap-min: 44px;

/* Typography scale */
--text-xs:   11px;
--text-sm:   13px;
--text-base: 15px;
--text-lg:   17px;
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  32px;
--text-4xl:  40px;
--text-hero: clamp(48px, 14vw, 80px);

/* Line heights */
--lh-tight:   0.88;
--lh-display: 1.0;
--lh-body:    1.5;
--lh-label:   1.2;

/* Border radii (defaults — overridden by vibe r-mult) */
--r-pill: 999px;
--r-sm:   8px;
--r-md:   12px;
--r-lg:   20px;
--r-xl:   28px;

/* Letter spacing defaults (overridden per vibe) */
--ls-d:     0em;
--ls-label: 0.12em;

/* Easing curves */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* spring bounce */
--ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94); /* deceleration */
--ease-accel:    cubic-bezier(0.55, 0, 1, 0.45);       /* acceleration */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);    /* Material standard */

/* Durations */
--dur-instant: 80ms;
--dur-fast:    150ms;
--dur-mid:     250ms;  /* overridden per vibe */
--dur-slow:    400ms;
--dur-xslow:   600ms;

/* Campaign state colours */
--color-state-pre:  #fbbf24;   /* Amber — pre-release chip */
--color-state-live: #ef4444;   /* Red — live chip + error */
--color-state-gig:  #8b1e1e;   /* Dark red — gig chip */
--color-state-prof: #06b6d4;   /* Cyan — profile chip (unused in UI) */

/* Ambient colour (extracted from artwork via canvas) */
--color-ambient: 0, 0, 0;      /* RGB triplet, no spaces in value */

/* Accent defaults (overridden by applyDerivedTokens() from profile.accent) */
--color-accent:        #e07b3a;
--color-accent-rgb:    224, 123, 58;
--color-accent-glow:   rgba(224, 123, 58, 0.30);
--color-accent-soft:   rgba(224, 123, 58, 0.10);
--color-accent-subtle: rgba(224, 123, 58, 0.12);
--color-on-accent:     #ffffff;           /* text on accent fill */

/* Tab bar height */
--tab-bar-height: 64px;

/* Background effect controls */
--bg-blur:       40px;
--bg-brightness: 0.45;
--bg-opacity:    1;
```

### 2.2 Theme tokens (`[data-theme]`)

Applied to `#app-shell` via `data-theme` attribute.

#### Dark (default)
```css
--color-bg:          #0a0b10;
--color-surface:     #0f1018;
--color-card:        #16161e;
--color-card-raised: #1e1e2a;
--color-border:      rgba(255,255,255,0.065);
--color-text:        #f0ede8;
--color-text-2:      rgba(240,237,232,0.60);
--color-text-3:      rgba(218,213,207,0.45);
--color-overlay:     rgba(10,11,16,0.82);
--shadow-card:       0 4px 28px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04);
--color-panel:       #1a1a24;   /* solid — edit drawers */
--color-panel-raised:#22222e;
--color-panel-text:  #f0ede8;
```

#### Light
```css
--color-bg:          #f5f2ec;
--color-surface:     #ede9e2;
--color-card:        #ffffff;
--color-card-raised: #f8f5f2;
--color-border:      rgba(0,0,0,0.08);
--color-text:        #0d0e1a;
--color-text-2:      rgba(13,14,26,0.60);
--color-text-3:      rgba(13,14,26,0.38);
--color-overlay:     rgba(245,242,236,0.90);
--shadow-card:       0 2px 16px rgba(0,0,0,0.07);
--color-panel:        #ffffff;
--color-panel-raised: #f8f5f2;
--color-panel-text:   #0d0e1a;
--color-on-accent:    #0d0e1a;   /* override — dark text on accent in light theme */
```

#### Glass
```css
--color-bg:          transparent;   /* relies on #profile-bg behind shell */
--color-surface:     rgba(255,255,255,0.06);
--color-card:        rgba(255,255,255,0.08);
--color-card-raised: rgba(255,255,255,0.12);
--color-border:      rgba(255,255,255,0.14);
--color-text:        #f0ede8;
--color-text-2:      rgba(240,237,232,0.75);
--color-text-3:      rgba(240,237,232,0.55);
--backdrop:          blur(28px) saturate(180%);
--color-panel:       #1a1a24;   /* solid dark — editing must be readable */
--color-panel-raised:#22222e;
--color-panel-text:  #f0ede8;
```
**Critical:** Glass requires `profile.artworkUrl` to be set. Without artwork, JS falls back to `dark`. `#app-shell` is `background-color: transparent`; `#profile-bg` (fixed, behind shell) carries the blurred artwork. Iframes need explicit wrapper `backdrop-filter` — the CSS property does not propagate into iframes.

#### Contrast
```css
--color-bg:          #000000;
--color-surface:     #0a0a0a;
--color-card:        #111111;
--color-card-raised: #1a1a1a;
--color-border:      rgba(255,255,255,0.2);
--color-text:        #ffffff;
--color-text-2:      rgba(255,255,255,0.85);
--color-text-3:      rgba(255,255,255,0.65);
--shadow-card:       0 2px 16px rgba(0,0,0,0.8);
--color-panel:       #111111;
--color-panel-raised:#1a1a1a;
--color-panel-text:  #ffffff;
```
**Critical:** Contrast theme sets duration tokens to near-zero for all decorative animations (see §7 Animation). State-change transitions (80ms) remain.

### 2.3 Accent token derivation

`applyDerivedTokens(accentHex)` is called by JS on profile load. It:
1. Parses `accentHex` to RGB components
2. Sets `--color-accent`, `--color-accent-rgb`, `--color-accent-glow`, `--color-accent-soft`, `--color-accent-subtle`
3. Calculates luminance → sets `--color-on-accent` to `#000` or `#fff`
4. Sets `--cta-text-color` for buttons (matches on-accent)
5. Derives `--r-sm`, `--r-md`, `--r-lg`, `--r-xl` from a `r-mult` per vibe (CSS `calc()` with custom properties is unreliable for radius multiplication — JS sets px values directly)

---

## 3. TYPOGRAPHY SCALE

All elements in the file. `var(--font-d)` is set by vibe (see §4).

| Element | Font | Size | Weight | Style | Transform | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|---|
| Body / base | DM Sans | `--text-base` 15px | 400 | normal | none | — | `--lh-body` 1.5 |
| Artist name (hero) | `--font-d` | `--text-hero` clamp(48px, 14vw, 80px) | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | `--lh-tight` 0.88 |
| Artist name (sticky bar) | `--font-d` | 18px | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | 1 |
| Artist initials fallback | `--font-d` | clamp(72px, 20vw, 108px) | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | — |
| Hero meta tags | DM Sans | 11px | 600 | normal | uppercase | 0.16em | `--lh-label` 1.2 |
| Hero copy-link pill | DM Sans | 10px | 500 | normal | none | 0.04em | — |
| Hero state chip | DM Sans | `--text-xs` 11px | 600 | normal | uppercase | 0.08em | — |
| Primary CTA (`.btn-primary`) | DM Sans | `--text-sm` 13px | 700 | normal | uppercase | 0.08em | — |
| Secondary CTA (`.btn-secondary`) | DM Sans | `--text-xs` 11px | 600 | normal | uppercase | 0.08em | — |
| Bio text | DM Sans | `--text-base` 15px | 400 | normal | none | — | 1.65 |
| Bio expand button | DM Sans | `--text-sm` 13px | 500 | normal | none | 0.02em | — |
| Section title | `--font-d` | clamp(32px, 9vw, `--text-4xl` 40px) | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | 0.95 |
| Section action link | DM Sans | `--text-xs` 11px | 600 | normal | uppercase | 0.08em | — |
| Platform pills label | DM Sans | `--text-sm` 13px | 500 | normal | none | 0.01em | — |
| Platform pills section label | DM Sans | 10px | 600 | normal | uppercase | 0.22em | — |
| Overflow more button | DM Sans | `--text-sm` 13px | 600 | normal | none | 0.02em | — |
| Release card title | DM Sans | `--text-lg` 17px | 700 | normal | none | — | 1.2 |
| Release card meta | DM Sans | `--text-xs` 11px | 400 | normal | uppercase | 0.06em | — |
| Release type badge | DM Sans | 8px | 700 | normal | uppercase | 0.04em | — |
| Release stream/watch btn | DM Sans | 10px | 700 | normal | none | — | — |
| Credits toggle | DM Sans | `--text-sm` 13px | 500 | normal | none | 0.04em | — |
| Credit item name | DM Sans | `--text-sm` 13px | 600 | normal | none | — | — |
| Credit item role | DM Sans | `--text-sm` 13px | 400 | normal | none | — | — |
| Show item month | DM Sans | 10px | 700 | normal | uppercase | 0.14em | — |
| Show item day | `--font-d` | `--text-3xl` 32px | `--font-d-weight` | normal | `--font-d-transform` | `--ls-d` | 1 |
| Show item venue | DM Sans | `--text-base` 15px | 700 | normal | none | — | — |
| Show item city | DM Sans | `--text-sm` 13px | 400 | normal | none | 0.01em | — |
| Show item time | DM Sans | `--text-xs` 11px | 400 | normal | none | 0.04em | — |
| Tonight badge | DM Sans | 9px | 900 | normal | uppercase | 0.08em | — |
| Fan capture heading | `--font-d` | `--text-3xl` 32px | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | 0.95 |
| Fan capture subtext | DM Sans | `--text-sm` 13px | 400 | normal | none | — | 1.6 |
| Fan capture input | DM Sans | 16px | 400 | normal | none | — | — |
| Fan capture trust line | DM Sans | `--text-xs` 11px | 400 | normal | none | 0.02em | — |
| Fan capture echo text | DM Sans | `--text-sm` 13px | 500 | normal | none | — | — |
| Fan capture echo confirm | DM Sans | `--text-xs` 11px | 400 | normal | none | — | — |
| Snap card title | DM Sans | `--text-sm` 13px | 700 | normal | none | — | `--lh-body` 1.5 |
| Snap card text | DM Sans | `--text-sm` 13px | 400 | normal | none | — | `--lh-body` 1.5 |
| Snap card CTA | DM Sans | `--text-sm` 13px | 600 | normal | none | 0.02em | — |
| Merch item title | DM Sans | `--text-sm` 13px | 600 | normal | none | — | — |
| Merch item price | DM Sans | `--text-xs` 11px | 600 | normal | none | — | — |
| Support pack label | DM Sans | `--text-base` 15px | 600 | normal | none | — | — |
| Support pack desc | DM Sans | `--text-sm` 13px | 400 | normal | none | — | 1.45 |
| Support pack price | DM Sans | `--text-base` 15px | 700 | normal | none | — | — |
| Rec item name | DM Sans | base | 600 | normal | none | — | — |
| Rec item genre | DM Sans | `--text-sm` 13px | 400 | normal | none | — | — |
| Made with ABLE footer | DM Sans or Plus Jakarta Sans | 12px | 600 | normal | none | — | — |
| Tab bar labels | DM Sans | `--text-xs` 11px | 500 | normal | uppercase | 0.04em | — |

**Input font-size note:** `fan-capture__input` uses `font-size: 16px` explicitly. iOS Safari zooms the viewport on any `<input>` with `font-size < 16px`. Do not reduce this below 16px.

---

## 4. VIBE SYSTEM

### 4.1 Vibe definitions

Applied as `data-vibe` on `#app-shell`. CSS sets font and letter-spacing. JS sets accent suggestion, radius multiplier, and motion personality.

| Vibe | Display font | Weight | Style | Transform | `--ls-d` | `--ls-label` | `--dur-mid` | Spring character |
|---|---|---|---|---|---|---|---|---|
| `electronic` | Barlow Condensed | 700 | normal | uppercase | 0.06em | 0.22em | 180ms | Tight, mechanical — `cubic-bezier(0.34, 1.28, 0.64, 1)` |
| `hiphop` | Oswald | 700 | normal | uppercase | 0.04em | 0.28em | 200ms | Punchy, confident — `cubic-bezier(0.34, 1.40, 0.64, 1)` |
| `rnb` | Cormorant Garamond | 600 | italic | none | 0.02em | 0.12em | 320ms | Smooth, lingers — `cubic-bezier(0.34, 1.52, 0.64, 1)` |
| `indie` | Space Grotesk | 700 | normal | none | -0.01em | 0.08em | 260ms | Natural, unhurried — `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `pop` | Barlow Condensed | 700 | normal | none | 0.03em | 0.16em | 220ms | Bright, bouncy — `cubic-bezier(0.34, 1.72, 0.64, 1)` |
| `rock` | Oswald | 700 | normal | uppercase | 0.08em | 0.2em | 190ms | Aggressive, direct — `cubic-bezier(0.34, 1.20, 0.64, 1)` |
| `acoustic` | Lora | 700 | normal | none | 0.01em | 0.10em | 350ms | Organic, barely any overshoot — `cubic-bezier(0.34, 1.10, 0.64, 1)` |

**Font loading strategy (P2):** Load DM Sans and Barlow Condensed eagerly. Load vibe-specific fonts on demand after `applyIdentity()` resolves the artist's vibe — not in the initial `<link>` stylesheet URL. Prevents ~200ms unused font load on non-electronic/pop vibes.

### 4.2 Feel quadrant modifiers

Applied as `data-feel` on `#app-shell`. These are deltas on top of vibe defaults — they shift weight, radius, duration, and easing.

| Feel | `--font-display-weight` | `--r-card` | `--dur-norm` | `--ease-primary` |
|---|---|---|---|---|
| `intimate-raw` | 500 | 4px | 150ms | No spring: `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `intimate-refined` | 400 | 12px | 600ms | Deceleration: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `bold-raw` | 800 | 2px | 200ms | Full spring: `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `bold-refined` | 700 | 8px | 350ms | Confident spring: `cubic-bezier(0.34, 1.20, 0.64, 1)` |

Image treatment:
- `intimate-raw`: `filter: saturate(0.85)` on hero artwork, release artwork, snap card images
- `intimate-refined`: `filter: saturate(0.9) sepia(0.05)` on same
- `bold-raw`: `filter: contrast(1.05)` on same
- `bold-refined`: no filter override (clean)

---

## 5. LAYOUT ARCHITECTURE

### 5.1 DOM structure (top-level)

```
<body>
  <a href="#main-content" class="skip-to-main">  ← skip nav (P0-5)
  [data-theme="glass"] #profile-bg               ← fixed, z-index: -1
  <canvas id="bg-canvas">                        ← particles preset
  .owner-bar                                      ← owner mode only, fixed top
  #sticky-artist-bar                             ← fan view, fixed top, z-140
  #app-shell [data-theme] [data-vibe] [data-feel] [data-campaign-state]
    #status-bar                                  ← safe-area-inset-top
    <main id="main-content">
      #scroll-container
        .hero
        .bio-strip
        .countdown                               ← pre-release only
        .hero-cta-zone                           ← two CTAs
        .pills-section                           ← platform pills
        .snap-cards-section                      ← horizontal scroll
        .fan-capture (primary)                   ← after snap cards
        .content-section (music)
        .world-map-section
        .content-section (shows)
        .content-section (merch)
        .content-section (support/close-circle)
        .credits-section
        .recs-section
        .fan-capture (secondary)                 ← quieter, repeated
        .able-footer                             ← "Made with ABLE"
    </main>
    #tab-bar                                     ← fixed bottom, z-100
  .edit-pill                                     ← owner only, fixed bottom-right, z-9999
  .bs-backdrop + .bs-sheet                       ← edit mode bottom sheets
  .cc-sheet-backdrop + .cc-sheet                 ← close circle bottom sheet
  .media-lightbox                                ← video lightbox
  .media-pip                                     ← picture-in-picture
  #toast-container                               ← toasts, fixed
```

### 5.2 Z-index layers

| Z-index | Element | Role |
|---|---|---|
| -1 | `#profile-bg` | Background artwork blur (glass theme) |
| 0 | `#bg-canvas` | Particles canvas |
| 100 | `#tab-bar` | Bottom navigation |
| 140 | `#sticky-artist-bar` | Sticky artist name strip |
| 200 | `.owner-bar` | Owner mode top bar |
| 2000 | `.bs-backdrop` | Edit sheet backdrop |
| 2001 | `.bs-sheet` | Edit bottom sheet |
| 3000 | `.cc-sheet-backdrop` | Close Circle backdrop |
| 3001 | `.cc-sheet` | Close Circle bottom sheet |
| 8500 | `.media-pip` | Picture-in-picture player |
| 9000 | `.media-lightbox` | Video lightbox |
| 9999 | `.edit-pill` | Floating edit/fan-view pill |
| 9999 | `.gig-activation-flash` | One-time gig mode activation overlay |

### 5.3 Scroll behaviour

- Container: `#scroll-container` — `flex: 1`, `overflow-y: auto`, `-webkit-overflow-scrolling: touch`, `overscroll-behavior-y: contain`
- Scrollbar: hidden via `-webkit-scrollbar: display:none` and `scrollbar-width: none`
- Scroll padding bottom: `calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px) + var(--sp-4))` — content never hides behind tab bar
- Snap cards track: `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain` — cards always land cleanly
- Tab bar: hides on scroll down (`translateY(100%)`), shows on scroll up — prevents chrome from eating content real estate on long pages

### 5.4 Profile background (`#profile-bg`)

Fixed, `inset: 0`, `z-index: -1`. Applied when:
- Theme is `glass` (always shows) — `body:has([data-theme="glass"]) #profile-bg { display: block }`
- `profile.backgroundUrl` is set — JS adds `.active` class
- `profile.backgroundPreset` is not `'none'`

When active with custom URL: `background-image: url(...)`, `filter: blur(40px) brightness(0.45)`, `transform: scale(1.1)` (prevents blur edge showing).

When shell has profile-bg active (non-glass themes): shell becomes semi-transparent — `background-color: color-mix(in srgb, var(--color-bg) 88%, transparent)`.

**Animated presets:**
- `preset-gradient-pulse`: diagonal gradient animation, 12s loop
- `preset-aurora`: radial gradient breathing, 16s loop
- `preset-grain`: CSS noise texture, 8s drift
- `particles`: `<canvas id="bg-canvas">` handled by JS

---

## 6. SECTION-BY-SECTION SPECIFICATION

### 6.1 Hero

**Structure:** `.hero` — `position: relative`, `aspect-ratio: 3/4`, `max-height: min(560px, 58svh)`, `overflow: hidden`. This cinematic ratio ensures bio+CTAs are always visible above the fold on any phone.

**Layers (bottom to top):**
1. `hero__artwork-placeholder` — accent gradient shown before image loads or when no artwork
2. `hero__initials` — artist initials at ~20vw, `rgba(255,255,255,0.18)` — shows if no artwork
3. `hero__artwork` — `object-fit: cover`, lazy loaded with blur-up, `opacity: 0 → 1` over `--dur-slow`
4. `hero__video` — absolute, full bleed, YouTube/Vimeo iframe with poster click-to-load
5. `hero__top-vignette` — `height: 30%`, `linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)` — hidden in light theme
6. `hero__scrim` — `height: 75%`, multi-stop bottom-to-top gradient for text readability
7. `hero__ambient` — radial glow from bottom, breathes 4s loop (2.5s in gig state)
8. `hero__ambient-glow` — 120px strip at bottom, extracted artwork colour
9. `hero__text` — `position: absolute; bottom: 0`, contains state chip, artist name, meta, copy-link

**`hero__text` internal flow:**
```
.hero__state-chip        ← campaign state badge (pre, live, gig)
.hero__name              ← artist name, reveal animation
.hero__meta              ← genre + location tags
  .hero__tag + .hero__tag-sep + .hero__tag
.hero__credit-line       ← optional credit text
.hero__copy-link         ← "artist.able.fm/[handle] · copy link"
```

**Campaign state on hero:**
- `[data-campaign-state="pre-release"] .hero__ambient`: amber radial glow, intensity driven by `--pre-release-glow` CSS var (JS increases as release approaches)
- `[data-campaign-state="live"] .hero__ambient`: warm red glow
- `[data-campaign-state="gig"] .hero__ambient`: brighter opacity (0.55), faster breathing (2.5s)

**State chip colours:**
- `--pre`: `background: #fbbf24; color: #000` — amber
- `--live`: `background: #ef4444` — red
- `--gig`: `background: #8b1e1e` with glowing `::after` pulse animation
- `--profile`: `display: none` — no chip in default state
- `--near-future`: frosted glass pill (glass-morphism style) for events within 7 days

**Name reveal animation:** `.hero__name` starts `opacity: 0; transform: translateY(12px)` — `.revealed` class applied by JS after fonts loaded. Transition: `--dur-slow var(--ease-decel)`.

**Light theme overrides:** name text `color: var(--color-text)` (not forced white), no text-shadow. Top vignette hidden. Scrim uses warm cream gradient.

---

### 6.2 Campaign State System

State is stored in `profile.stateOverride` or auto-computed. Applied as `data-campaign-state` attribute on `#app-shell`.

**Auto-switch logic:**
```javascript
const now = Date.now();
const gigExpires = localStorage.getItem('able_gig_expires');

if (gigExpires && now < parseInt(gigExpires)) {
  state = 'gig';
} else if (profile.releaseDate) {
  const rd = new Date(profile.releaseDate).getTime();
  if (now < rd) {
    state = 'pre-release';
  } else if (now < rd + 14 * 24 * 60 * 60 * 1000) {
    state = 'live';
  } else {
    state = 'profile';
  }
} else {
  state = 'profile';
}
```

**Post-gig sub-state:** `able_gig_show_end` — artist-set showtime + 1h buffer. If `now > gigShowEnd && now < gigExpires` → render `post-gig` state (CTAs shift to "Stay close" primary, merch secondary, tonight note replaced by post-show note or silence).

| State | Hero top card | Primary CTA | Secondary CTA | State chip |
|---|---|---|---|---|
| `profile` | Artwork or gradient | "My music" (vibe default) | "Stay close" | None |
| `pre-release` | Release artwork + countdown | "Pre-save" | "My music" | Amber "Dropping [date]" |
| `live` | Release artwork | "Stream now" | "Stay close" | Red "Out now" |
| `gig` | Artist artwork + tonight note | "Get tickets" | "Can't make it? Stay close" | Dark red "On tonight" pulse glow |
| `post-gig` | Artist artwork + post-show note | "Stay close" | "Merch" (if exists) | None |

**Pre-release final 24h shift:**
```javascript
if (hoursLeft < 24) {
  document.documentElement.setAttribute('data-prerelease', 'final');
}
```
When `data-prerelease="final"`:
- Countdown digits: `font-size: clamp(56px, 16vw, 96px); color: var(--color-accent)`
- Hero ambient: `opacity: 0.28` (increased intensity)

**Countdown unit display:** Days / hours / minutes only. No seconds — seconds create anxiety, not anticipation.

---

### 6.3 Hero CTA Zone

`.hero-cta-zone` — below hero, above bio. Contains two buttons stacked vertically.

**Primary CTA (`.btn-primary`):**
- Height: 56px minimum
- Background: `var(--color-accent)`
- Text: `var(--cta-text-color, #fff)` — computed from accent luminance
- Radius: `var(--r-sm)` (8px default, vibe-overridden)
- Padding: `var(--sp-4) var(--sp-6)`
- Font: 13px, weight 700, uppercase, 0.08em tracking
- Press state: `scale(0.97)`, background lightens via `::after` overlay
- Ripple: `::after` pseudo-element, `opacity: 0 → 1 → 0` on press

**Secondary CTA (`.btn-secondary`):**
- Height: 56px minimum
- Background: `transparent`
- Border: `1px solid rgba(255,255,255,0.28)` → on hover: `rgba(--color-accent-rgb, 0.5)`
- Text: `var(--color-text-2)` → on hover: `var(--color-text)`
- Font: 11px, weight 600, uppercase, 0.08em tracking
- Light theme: border `rgba(0,0,0,0.20)`
- Glass theme: `backdrop-filter: blur(8px)`

**CTA architecture rules:**
1. Max 2 CTAs in this zone — always
2. Primary = accent fill. Secondary = ghost.
3. Same URL cannot appear in this zone and Quick Actions (global dedupe — Hero wins)
4. State drives defaults (see §6.2 state table above). Artist can override each label + URL.
5. Secondary CTA is optional — `null` in post-gig state (render only primary)

---

### 6.4 Quick Actions (Platform Pills)

`.pills-section` — 2-column grid of horizontal platform objects.

**Grid:** `display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2)`

**Individual pill (`.pill`):**
- Height: 52px minimum
- Layout: horizontal flex, icon (26×26) + label
- Background: `rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.07)`
- Border-radius: `var(--r-md)` (12px default)
- Label: 13px, weight 500, `text-overflow: ellipsis` (clips "SoundCloud" on 320px)
- Hover: `border-color: rgba(--color-accent-rgb, 0.25)`, `background: rgba(255,255,255,0.07)`
- Press: `scale(0.97)`

**Entrance animations:**
- Initial load: `pill-bloom` — `translateX(-8px) → 0`, 220ms, staggered by `--pill-bloom-delay`
- Overflow expand: `pill-scale-in` — `scale(0.80) → 1`, 160ms spring, staggered
- First load shimmer: `pill-shimmer-once` — one sweep per pill, session-flagged (not repeated on revisit)

**Overflow logic:**
- Narrow viewport (< 500px): show max 4 pills, rest hidden
- Wide viewport (≥ 500px): show max 6 pills
- Overflow button (`.pills-more`): `+ [N] more`, accent colour, full-width pill below grid

**Copy rule:** Platform name only. "Spotify" not "Stream on Spotify". No verbs.

**Section label (`.pills-section__label`):** 10px, weight 600, uppercase, 0.22em tracking, `--color-text-3`. Minimum 10px — below 10px is below accessible threshold.

---

### 6.5 Bio Strip

`.bio-strip` — immediately below hero CTAs.

**Bio text (`.bio-strip__text`):**
- Clamped to 3 lines via `-webkit-line-clamp: 3`
- 15px, `line-height: 1.65`, `var(--color-text-2)`
- On expand (`.expanded`): `display: block`, clamp removed
- Expanded state adds barely-perceptible accent warm background: `rgba(--color-accent-rgb, 0.03)` on `.bio-strip` — transition `--dur-mid`

**Expand button (`.bio-strip__more`):** Min-height 44px, 13px, `--color-text-3` with underline, hidden when bio ≤ 3 lines.

**Empty state (P0):** If `profile.bio` is not set, hide `.bio-strip` entirely. Do not render an empty container.

---

### 6.6 Snap Cards

`.snap-cards-section` — horizontal scrolling row of artist voice posts.

**Track (`.snap-cards-track`):**
- `display: flex; gap: var(--sp-3)`
- `overflow-x: auto; scrollbar-width: none`
- `scroll-snap-type: x mandatory; overscroll-behavior-x: contain`
- Padding: `var(--sp-2) var(--sp-5)`

**Individual card (`.snap-card`):**
- Width: 220px fixed, `flex-shrink: 0`
- `scroll-snap-align: start`
- Structure: optional image (1:1 aspect) + body (title, text, optional CTA)
- Image: `object-fit: cover`, `aspect-ratio: 1`
- Image placeholder (no image): accent-tinted block `rgba(--color-accent-rgb, 0.08)`
- Body: 16px padding
- Title: 13px weight 700
- Text: 13px `var(--color-text-2)`
- CTA: full-width bottom strip, `var(--color-accent-soft)` bg → accent on hover

**Tier gating:** Snap cards 2+ show blurred (`.snap-card--locked`, `filter: blur(3px)`) with lock overlay on Free tier. Gold overlay with `#f4b942` text — copy states what they get ("Unlimited snap cards on Artist plan"), never just "Upgrade".

**Empty state (P0):** Hide section entirely if `profile.snapCards.length === 0`. Fan never sees placeholder.

**Owner edit:** Tap row in edit mode → bottom sheet with text, photo upload, optional CTA per card.

---

### 6.7 Fan Sign-up Module

`.fan-capture` — appears twice: primary (after snap cards, before music) and secondary (bottom of page, quieter).

**Primary variant:**
- Background: `color-mix(in srgb, var(--color-card) 94%, var(--color-accent) 6%)` — barely-perceptible accent warmth
- Border: `1px solid var(--color-border)`, top: `3px solid rgba(--color-accent-rgb, 0.7)` — accent top accent rule
- Border-radius: `var(--r-md)`, margin: `var(--sp-2) var(--sp-5)`

**Secondary variant (`.fan-capture--secondary`):**
- Transparent background
- Top border: `1px solid rgba(--color-accent-rgb, 0.25)` (quieter)
- Heading: 17px, opacity 0.55

**Heading (`.fan-capture__heading`):** Display font, 32px, same vibe treatment as section titles. Default: "Stay close." Source: `profile.fanCapture.heading` → fallback `"Stay close."` Never falls back to ABLE-voiced copy.

**Subtext (`.fan-capture__sub`):** 13px, `--color-text-2`, `line-height: 1.6`. Default: "Just your email. I'll reach out when something's actually happening."

**Input (`.fan-capture__input`):**
- `flex: 1; min-height: 44px`
- Background: `var(--color-surface)`, border `1.5px solid var(--color-border)`
- **Font-size: 16px** — prevents iOS Safari viewport zoom
- Placeholder: "Your email" (never "Email address" or "Enter your email")
- Focus: `border-color: var(--color-accent); border-width: 2px; box-shadow: 0 0 0 3px var(--color-accent-soft)`
- Paste flash: `background-color: var(--color-accent-soft)`, transitions out over 400ms
- Error: `border-color: var(--color-state-live)`
- Autofill override: `webkit-box-shadow: 0 0 0 100px var(--color-surface) inset` — prevents iOS yellow wash

**Submit button:** Uses `.btn-primary` styles. Text default: "I'm in". Never "Subscribe", "Sign up", "Submit".

**Trust line (`.fan-capture__trust`):**
```
"Your email goes to [Artist Name] directly. Not to any platform."
```
Font: 11px, `--color-text-3`, `letter-spacing: 0.02em`. Always present. Whispered, not announced — never bold or accent-coloured.

**GDPR consent disclosure — exact HTML to insert after the input, before the submit button:**

UK GDPR and PECR accept the act of typing an email and tapping a clearly-labelled submit button as a valid affirmative act, provided the purpose is stated clearly before submission. A checkbox is not required here — the purpose is single and specific (the artist contacts the fan about their music).

```html
<!-- Fan capture form structure — exact order matters for GDPR -->
<form class="fan-capture__form" id="fanCaptureForm" novalidate>
  <div class="fan-capture__row">
    <input
      type="email"
      class="fan-capture__input"
      id="fanEmailInput"
      placeholder="Your email"
      autocomplete="email"
      inputmode="email"
      required
      aria-label="Your email address"
    >
    <button type="submit" class="fan-capture__btn btn-primary">I'm in</button>
  </div>

  <!-- GDPR consent disclosure — must be visible before submit tap -->
  <p class="fan-capture__trust signup-consent" id="fanConsentLine">
    Your email goes to <span class="consent-artist-name">this artist</span> directly.
    Not to any platform. Unsubscribe anytime.
  </p>
</form>
```

**JS to populate artist name in consent line (add to `initFanCapture()`):**
```javascript
(function() {
  var p = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  var els = document.querySelectorAll('.consent-artist-name');
  els.forEach(function(el) { if (p.name) el.textContent = p.name; });
})();
```

**Fan record fields to add on submit (GDPR audit trail):**
```javascript
const fanRecord = {
  email,
  ts:             Date.now(),
  source:         _pageSource || 'direct',
  sessionId:      _sessionId,
  optIn:          true,
  consentVersion: '2026-03-16',  // ISO date of this consent copy — update if copy changes
  consentSource:  'profile-signup-' + (_pageSource || 'direct'),
};
```

**CSS for consent line:**
```css
.fan-capture__trust {
  font-size: 11px;
  color: var(--color-text-3);
  letter-spacing: 0.02em;
  text-align: center;
  margin: var(--sp-2) 0 0;
  line-height: 1.4;
}
```

**Field layout:** `display: flex; gap: var(--sp-2)` on `.fan-capture__row` — input and button side by side. On very narrow (≤360px): stacks vertically (`flex-direction: column; .fan-capture__btn { width: 100% }`).

**Post-submit state:**
1. Form hidden
2. Echo element shown (`.fan-capture__echo`, `hidden` attribute removed)
3. Entrance animation: `echo-enter` — `translateY(6px) → 0`, 280ms deceleration
4. Echo text: "You're in. I'll keep you close."
5. Confirm subtext: "Check your email to confirm."
6. Toast fires: "You're in." (3s)
7. Confetti fires (lightweight JS confetti burst)

**GDPR note:** No privacy policy link rendered on the profile page — it would break the conduit illusion. ABLE's privacy policy appears in the confirmation email footer only. The `.fan-capture__trust` / `.signup-consent` line before the button is the entire consent communication. It must be visible without scrolling within the sign-up form (never below the fold).

**Confirmation email (Phase 2 — Supabase + Resend):**
- Subject: "Confirm you want to hear from [Artist Name]"
- Voiced as artist, sent via ABLE
- Body: "[Artist Name] asked me to check this is actually you. [Confirm →] If you didn't sign up, ignore this."
- Email footer only: "Sent via ABLE · Unsubscribe"

---

### 6.8 Music Section

`.content-section` with `.content-section--primary` modifier (more top padding).

**Section header:** `"My music"` (artist-overridable). Display font, 32–40px. Accent rule above.

**Releases list (`.releases-list`):** `flex-direction: column; gap: var(--sp-5)`

**Individual release card (`.release-card`):**
- `background: var(--color-card); border-radius: var(--r-md); overflow: hidden`
- Full-width album artwork (1:1 aspect ratio) at top
- Play overlay on artwork: `opacity: 0.55` always on touch, `0` on pointer-capable devices (hover reveals)
- Platform badge (top-right of artwork): dark frosted pill with platform icon + name
- Info row below artwork: title (17px, weight 700) + meta (11px, uppercase, `--color-text-3`)
- Stream/Watch buttons row (`.release-btn-row`): small accent-filled Stream + ghost Watch at 10px, 700 weight
- Type badge (`.release-type-badge`): 8px, `rgba(255,255,255,0.1)` background — "ALBUM", "EP", "SINGLE"
- Left border treatment (P0 spec): left border colour matches release type — not yet implemented

**Embeds:**
- Spotify: inline compact player iframe, `height: 80px`, `background: #000`
- YouTube: play overlay on artwork thumbnail → click loads iframe in 16:9 wrapper (`padding-bottom: 56.25%`)

**Media lightbox (`.media-lightbox`):**
- `position: fixed; inset: 0; z-index: 9000`
- `background: rgba(0,0,0,0.88); backdrop-filter: blur(16px)`
- Inner: `max-width: 920px`, 16:9 aspect iframe
- Entrance: `translateY(20px) scale(0.97) → none`, 300ms spring

**Picture-in-picture (`.media-pip`):**
- `position: fixed; bottom: 84px; right: 14px; width: 248px; z-index: 8500`
- `transform: translateY(30px) scale(0.92) → none`, 320ms spring on show
- Expand button + close button in bottom bar

**Credits strip (`.release-credits`):**
- Collapsible toggle (`.credits-toggle`) below info row
- Chevron rotates 180° when expanded (`aria-expanded="true"`)
- Credit row: role (muted) + name (medium weight)
- Confirmed freelancer with ABLE handle: name is a live link to their ABLE profile
- Unconfirmed: plain text, no link

**Empty state (P0):** If `profile.releases.length === 0`, hide the entire music section. No "No releases" copy. In owner mode, show edit prompt inside dashed ring: "Add your latest music. Paste a Spotify or SoundCloud link."

---

### 6.9 World Map / Events Section

**World map card (`.world-map-card`):**
- `border-radius: var(--r-lg)`, `background: var(--color-surface)`
- Header: display font month label (32px) + "X shows" count
- Calendar grid: mini calendar with show dates highlighted in accent

**Shows list (`.shows-list`):**
Each show card (`.show-item`) is a 3-column flex layout:

1. **Date column (`.show-item__date`):**
   - 68px min-width
   - Background: `rgba(--color-accent-rgb, 0.08)`
   - Border-right: `rgba(--color-accent-rgb, 0.14)`
   - Month: 10px, weight 700, uppercase, accent colour
   - Day: display font, 32px

2. **Info column (`.show-item__info`):**
   - Venue: 15px, weight 700
   - City: 13px, `--color-text-2`
   - Time/doors: 11px, `--color-text-3`

3. **CTA column (`.show-item__cta`):**
   - `.btn-show`: accent fill, full height, `min-width: 80px`, 11px uppercase
   - Sold out badge: `var(--color-state-live)` text

**Gig mode featured card:** `.tonight-badge` — 9px weight 900 amber badge pulsing at 1.5s, above the date column. Shown only when `data-campaign-state="gig"` and show date matches today.

**Tonight note block (P1):** `<blockquote class="tonight-note">` — `font-style: italic`, `border-left: 2px solid rgba(--color-accent-rgb, 0.4)`, `padding-left: var(--sp-4)`. Rendered above ticket CTA in gig mode. Mandatory — gig mode cannot activate without this content set in admin.

**Venue image variant (`.show-item--has-image`):** Full-bleed venue photo as background with gradient scrim overlay.

**Empty state (P0):** Hide entire shows section if no shows. In owner mode: "Add a show. Paste a Ticketmaster or Eventbrite link."

---

### 6.10 Merch Section

`.merch-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3)`

**Item (`.merch-item`):**
- 1:1 artwork image with price overlay gradient at bottom
- Badge top-right (`.merch-item__badge`): accent pill — "NEW", "LIMITED"
- Info row: title (13px, weight 600) + price (11px)
- Emoji fallback (no image): 40px emoji in square block

**Copy:** Section header default "Stuff" (artist-overridable: "Things", "Merch", "Shop").

**Empty state (P0):** Hide entirely. No placeholder.

---

### 6.11 Support / Close Circle

`.support-packs` — flex column.

**Support pack row (`.support-pack`):**
- Emoji icon (34px circle, accent-tinted) + label + desc + price or price button
- Hover: `border-color: var(--color-accent)`, `translateY(-3px)`, accent glow shadow
- Price as text (no URL): `var(--color-accent)` coloured text
- Price as CTA (with URL): `.support-pack__price-btn` — accent fill, 40px min-height

**Close Circle bottom sheet (`.cc-sheet`):**
- `position: fixed; bottom: 0; border-radius: 20px 20px 0 0`
- `transform: translateY(100%) → translateY(0)` on open
- Contains: artist avatar + name + price, intro text (artist-set pitch), email input, submit, terms

**Copy:** Section label "Close circle" (very small, uppercase). Join button: "Join the circle". Post-join: "You're in the circle" (quiet, warm). Never: "Exclusive content", "Join the community", "Become a supporter".

---

### 6.12 Recommendations

> **Canonical doctrine:** `docs/systems/freelancer-auth/ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md` and `docs/systems/freelancer-auth/ORDERING-AND-VISIBILITY-DOCTRINE.md` are the authoritative specs. The notes below summarise only the display layer.

`.recs-section` — editorial minimal list, max `visibleCount` items (default 4) from the artist's pool.

**Two card types:**

**Artist card (`.rec-item--artist`):**
- Avatar (48×48, `border-radius: var(--r-sm)`) + name + optional genre label + arrow
- Hover: `background: rgba(--color-accent-rgb, 0.05)`, name turns accent, arrow translates 3px

**Professional card (`.rec-item--professional`):**
- No avatar — role chip instead (`font-size:9px`, `letter-spacing:.12em`, accent tint pill)
- Name + ✓ mark if `confirmedCredit: true` (10px, accent at 55% opacity) + context note + arrow

**No-profile state (`.rec-item--no-profile`):** 70% opacity, no link, no arrow. Applies when `handle` is null.

**Section heading:** Campaign-state aware, artist-overridable. Defaults per state:
- `profile` / `after`: "Worth knowing"
- `pre-release`: "Behind this one"
- `live`: "Who made this"
- `gig`: "Tonight's crew"

This must feel like a personal curation, not an algorithm.

---

### 6.13 Sticky Artist Bar

`#sticky-artist-bar` — `position: fixed; top: 0; height: 44px; z-index: 140`

Appears when hero scrolls 70% out of view (JS IntersectionObserver or scroll event). Fan view only — hidden in owner mode.

**Show/hide animation:** `transform: translateX(-50%) translateY(-100%) → translateY(0)`, 300ms deceleration. Reduced motion: opacity only.

**Theme variants:**
- Dark: `rgba(13,14,26, 0.82)` + `backdrop-filter: blur(18px)`
- Light: `rgba(240,237,232,0.90)`
- Glass: `rgba(13,14,26, 0.40)` + `blur(24px) saturate(200%)`
- Contrast: `rgba(0,0,0,0.96)`, `rgba(255,255,255,0.12)` border

**Content:** Artist name in display font (18px) + optional campaign state chip or action button.

---

### 6.14 Owner Mode Elements

**Owner bar (`.owner-bar`):** Fixed at top when in owner mode. Contains:
- "← Your dashboard" link (amber, 12px Plus Jakarta Sans)
- Page URL label (muted, centre)
- "Copy link" button

When owner bar visible: `body.has-owner-bar #app-shell { margin-top: 38px }` — prevents content overlap.

**Floating edit pill (`.edit-pill`):**
- `position: fixed; bottom: 88px; right: 16px; z-index: 9999`
- Two tabs: "Fan view" | "Edit"
- Active tab: accent fill
- In edit mode: dashed amber rings appear on `[data-editable]` elements with pencil icon badge

**Dashed rings (edit active):**
```css
.edit-active [data-editable] {
  outline: 1.5px dashed rgba(244,185,66,0.7);
  outline-offset: 3px;
  border-radius: 8px;
  cursor: pointer;
}
.edit-active [data-editable]::after {
  content: '✎';
  background: #f4b942;
  color: #1a1a2e;
  font-size: 9px; font-weight: 800;
  padding: 2px 5px; border-radius: 5px;
  position: absolute; top: 6px; right: 6px;
}
```

**Edit zones (6 total — P0):**
1. Identity zone (hero artwork area): name, vibe, accent, theme
2. Hero CTAs: label + URL for each
3. Quick Actions: URL per platform, add/remove
4. Sections: Spotify URL paste for music, show add/edit
5. Snap cards: text, photo, optional CTA per card
6. Fan capture copy: heading, subtext, trust line

**Auto-save:** Debounce 800ms after last input. Toast: "Saved." (period — never exclamation). Failure: "Couldn't save. Try again."

**Bottom sheet (`.bs-sheet`):**
- `border-radius: 16px 16px 0 0`
- `max-height: 85vh; overflow-y: auto`
- `transform: translateY(100%) → translateY(0)`, 300ms deceleration
- Handle bar: 28×3px `#e0dbd4` rounded pill at top

---

### 6.15 Made with ABLE Footer

`.able-footer` — bottom of page, below all content sections.

Text: "Made with ABLE ✦" with `?ref=[artistHandle]` attribution on the ABLE link.

Style: Small, subdued, `--color-text-3`. Never competes with any other element. Never "Powered by ABLE" or "Built on ABLE".

View transition target: `view-transition-name: able-logo` — the ABLE logo word-mark in admin topbar shares this name, enabling a flying logo transition when navigating admin ↔ profile (Chrome 126+ progressive enhancement).

---

## 7. ANIMATION INVENTORY

### 7.1 Core interaction animations

| Ref | Trigger | Animation | Duration | Easing | Notes |
|---|---|---|---|---|---|
| B2 | Press any `.pressable` | `scale(0.97)` | 80ms | `ease-out` | JS adds `.pressing` class on `pointerdown` |
| B2 | Release `.pressable` | Spring back from 0.97 to 1 | `--dur-fast` 150ms | `--ease-spring` | JS swaps transition before removing `.pressing` |
| B14 | Tab bar icon selection | `tab-icon-bounce` keyframe: 1 → 1.18 → 0.97 → 1 | 320ms | `--ease-spring` | `.icon-bounce` class, one-shot |
| I1 | Tab dot at rest | `box-shadow: 0 0 0 4px rgba(accent, 0.14)` | static | — | Barely-there halo |

### 7.2 Hero animations

| Ref | Element | Animation | Duration | Trigger |
|---|---|---|---|---|
| H1 | `.hero__ambient` | `glow-breathe`: `opacity 1 → 0.55 → 1` | 4s infinite | Always (2.5s in gig) |
| H3 | Gig state ambient | 2.5s loop instead of 4s | — | `data-campaign-state="gig"` |
| H4 | `.hero__name` (gloss) | Gloss sweep `::after` on reveal | — | One-shot on page load |
| H9 | Pre-release ambient | `--pre-release-glow` CSS var increases as release approaches | — | JS updates on page load |
| name reveal | `.hero__name` | `opacity 0; translateY(12px) → visible` | `--dur-slow` 400ms | After fonts ready |
| C7 | Gig badge `::after` | `badge-glow-pulse`: outward radiating halo | 2s infinite | `data-campaign-state="gig"` |
| gig flash | `.gig-activation-flash` | `opacity 0 → 0.18 → 0` | 600ms | One-time gig mode activation |

### 7.3 Entry animations

| Ref | Element | Animation | Duration | Stagger |
|---|---|---|---|---|
| A10 | Platform pills | `pill-bloom`: `translateX(-8px) → 0` | 220ms decel | `--pill-bloom-delay` per pill |
| C10 | Overflow pills expand | `pill-scale-in`: `scale(0.80) → 1` | 160ms spring | `--pill-enter-delay` per pill |
| D15 | First-load pill shimmer | One sweep across each pill, session-flagged | 550ms decel | `--pill-shimmer-delay` per pill |
| A3 | Chip reveal | `opacity 0; translateY(4px) → visible` | `--dur-mid` | On state resolve |
| echo-enter | Fan capture echo | `opacity 0; translateY(6px) → visible` | 280ms decel | On form submit |

### 7.4 Scroll-triggered animations

| Ref | Element | Trigger | Animation |
|---|---|---|---|
| A4 | `#sticky-artist-bar` | Hero 70% out of view | `translateY(-100%) → 0`, 300ms decel |
| tab bar | `#tab-bar` | Scroll direction | `translateY(100%)` on down, `translateY(0)` on up |
| G9 | Section deep link | Hash URL navigate to section | `section-pulse` — 2× pulsing accent ring, 750ms |

### 7.5 Interactive micro-animations

| Ref | Element | Animation |
|---|---|---|
| — | Release card (pointer) | `translateY(-3px)` + deeper shadow on hover |
| — | Release artwork (pointer) | `scale(1.03)` on hover |
| — | Show item (pointer) | `translateY(-2px)` on hover |
| — | Support pack (pointer) | `translateY(-3px)` + accent glow shadow on hover |
| — | Support pack emoji | `scale(1.10)` on parent hover |
| — | Rec item arrow | `translateX(3px)` on parent hover |
| — | Media lightbox open | `translateY(20px) scale(0.97) → none`, 300ms spring |
| — | Media pip show | `translateY(30px) scale(0.92) → none`, 320ms spring |
| B18 | Media pip icon-only btns | `scale(0.88)` on active (more prominent than label buttons) |

### 7.6 State transitions

| Element | From | To | Duration |
|---|---|---|---|
| Bottom sheet (`.bs-sheet`) | `translateY(100%)` | `translateY(0)` | 300ms decel |
| Close Circle sheet | `translateY(100%)` | `translateY(0)` | same |
| Media lightbox | opacity 0 | opacity 1 | 250ms decel |
| Bio expanded bg | transparent | `rgba(accent, 0.03)` | `--dur-mid` |
| Copy-link pill `.copied` | default | accent-tinted | `--dur-fast` |

### 7.7 Reduced-motion spec

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Exceptions: essential state-change feedback */
  .campaign-state-transition { transition: opacity 0.2s ease !important; }
  .toast                     { transition: opacity 0.2s ease !important; }
  .bottom-sheet-content      { transition: transform 0.2s ease !important; }
}
```

Use `0.01ms` (not `none`) — allows JS-triggered transitions to complete a single frame, preventing layout jumps.

**Contrast theme animation zero:**
```css
[data-theme="contrast"] {
  --dur-instant: 0ms;
  --dur-fast:    0ms;
  --dur-mid:     80ms;   /* essential state-change feedback kept */
  --dur-slow:    80ms;
  --dur-xslow:   80ms;
}
[data-theme="contrast"] .decorative-animation { animation: none !important; }
```
Contrast theme disables all decorative animations at theme level, regardless of `prefers-reduced-motion`. State transitions (80ms) remain as essential feedback.

---

## 8. DATA SCHEMA

`able_v3_profile` in localStorage. The JS reads this object on page load and renders accordingly.

| Field | Type | UI element driven | Notes |
|---|---|---|---|
| `name` | string | Hero artist name, `<title>`, OG tags, sticky bar, section aria-labels | Required — empty profile should show nothing to fans |
| `bio` | string | Bio strip, OG description | Hidden if empty |
| `accentHex` | string (#hex) | `--color-accent` + all derived accent tokens | Default `#e07b3a` |
| `theme` | `'dark'|'light'|'glass'|'contrast'` | `data-theme` on `#app-shell` | Default `'dark'` |
| `vibe` | `'electronic'|'hiphop'|'rnb'|'indie'|'pop'|'rock'|'acoustic'` | `data-vibe`, display font, motion timing | Default `'indie'` |
| `feel` | `'intimate-raw'|'intimate-refined'|'bold-raw'|'bold-refined'` | `data-feel`, radius, weight, duration | Optional |
| `artworkUrl` | string (URL) | Hero artwork, release card fallback, OG image | Glass theme requires this |
| `backgroundUrl` | string (URL) | `#profile-bg` background image | Optional |
| `backgroundPreset` | `'none'|'gradient-pulse'|'aurora'|'grain'|'particles'` | `#profile-bg` animated class | Optional |
| `location` | string | Hero meta tag |  |
| `genre` | string | Hero meta tag |  |
| `ctaPrimary` | `{label, url}` | Primary CTA button | State-conditional defaults apply |
| `ctaSecondary` | `{label, url}` | Secondary CTA button | Null hides secondary |
| `stateOverride` | string or null | Campaign state (overrides auto-compute) | Null = auto-compute |
| `releaseDate` | ISO date string | Pre-release countdown, state auto-switch |  |
| `releaseTitle` | string | State chip label, hero copy |  |
| `releaseArtworkUrl` | string | Hero top card in pre-release / live |  |
| `releases` | Array of release objects | Music section cards | Empty = hide section |
| `platforms` | Array of `{platform, url}` | Platform pills | Empty = hide pills section |
| `snapCards` | Array of `{title, text, imageUrl, cta}` | Snap cards track | Empty = hide section |
| `fanCapture` | `{heading, subtext, trustLine}` | Fan sign-up module | Defaults apply if empty |
| `shows` | (from `able_shows`) | Shows section, world map | Separate localStorage key |
| `merch` | Array of merch objects | Merch grid | Empty = hide section |
| `supportPacks` | Array of support pack objects | Support section |  |
| `credits` | Array of `{role, name, ableHandle, confirmed}` | Release credits strip |  |
| `recommendations` | Array of `{name, genre, artworkUrl, url}` | Recommendations section |  |
| `gigNote` | string | Tonight note blockquote in gig mode | Required when activating gig mode |
| `postGigNote` | string | Post-gig note (replaces tonight note after show end) | Optional |
| `releaseNote` | string | Pre-release note (below countdown) | Optional |

**Separate localStorage keys:**

| Key | Contents | Used by |
|---|---|---|
| `able_fans` | `[{email, ts, source}]` | Fan sign-up storage, admin fan list |
| `able_clicks` | `[{label, type, ts, source}]` | CTA tap analytics |
| `able_views` | `[{ts, source}]` | Page view tracking |
| `able_gig_expires` | Unix timestamp (ms) | Gig mode 24h expiry |
| `able_gig_show_end` | Unix timestamp (ms) | Show-end time for post-gig state |
| `able_shows` | `[{venue, date, doorsTime, ticketUrl, featured}]` | Shows section |

All keys map 1:1 to Supabase tables when backend lands. Do not rename.

---

## 9. ACCESSIBILITY REQUIREMENTS

### 9.1 Skip navigation

First element in `<body>`:
```html
<a href="#main-content" class="skip-to-main">Skip to main content</a>
```
```css
.skip-to-main {
  position: absolute; top: -100%; left: var(--sp-4);
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-accent); color: var(--color-on-accent);
  font-size: var(--text-sm); font-weight: 600;
  border-radius: 0 0 var(--r-sm) var(--r-sm);
  z-index: 9999; text-decoration: none; transition: top 0.15s;
}
.skip-to-main:focus-visible { top: 0; }
```
`<main id="main-content" tabindex="-1">` — allows focus on programmatic `.focus()`.

### 9.2 ARIA landmarks

```html
<section aria-label="Artist identity and actions">   <!-- hero + CTAs -->
<section aria-label="Quick links">                   <!-- platform pills -->
<section aria-label="[Artist Name]'s music">         <!-- music section -->
<section aria-label="Shows">                         <!-- events section -->
<section aria-label="Stay close">                    <!-- fan sign-up -->
```

### 9.3 Tap targets

**Minimum 44px** (`--tap-min`) on all interactive elements:
- CTAs: `min-height: 56px` (exceeds minimum)
- Pills: `min-height: 52px`
- Fan capture input + button: `min-height: 44px`
- Tab bar buttons: `min-height: 44px` with `min-width: 44px`
- Bio expand button: `min-height: 44px`
- Credits toggle: `min-height: implied` — must be verified
- Show ticket button: `min-height: 44px`

### 9.4 Focus management

Focus rings on all interactive elements via `:focus-visible`:
```css
:focus-visible {
  outline: 2px solid rgba(var(--color-accent-rgb), 0.80);
  outline-offset: 3px;
  border-radius: var(--r-sm);
  box-shadow: 0 0 0 5px rgba(var(--color-accent-rgb), 0.12);
}
```
Suppress on mouse/touch: `:focus:not(:focus-visible) { outline: none }`.

Shape-matching: pill-shaped elements get `border-radius: var(--r-pill)` on focus ring.

When bottom sheet opens: focus trapped inside sheet. On close: focus returns to trigger element.

### 9.5 Contrast requirements (WCAG AA)

Light theme contrast issue — fix required (P0-5):
```css
[data-theme="light"][data-vibe="indie"]      { --color-accent: #5a9e67; } /* sage fix: 4.6:1 */
[data-theme="light"][data-vibe="electronic"] { --color-accent: #0e8fa3; } /* cyan fix */
```
All 4 themes × 7 vibes = 28 combinations must meet 4.5:1 on body text and 3:1 on large text.

### 9.6 Owner-mode edit prompts

Owner mode prompts (dashed ring hints, "Tap to edit" labels) must be `aria-hidden="true"` — invisible to screen readers and fans. Only the visual ring is shown to the artist owner; it carries no semantic meaning for AT users.

---

## 10. KNOWN BUGS AND P0 FIXES

Reference: `PATH-TO-10.md` for full specs. Summary below.

### P0 items (current baseline 6.9/10 → 8.5/10 after P0)

| ID | Gap | Current | Fix spec |
|---|---|---|---|
| P0-1 | Empty state | Placeholder text "No releases added yet" visible to fans | Gate all sections on content existence. `shouldRender(section, profile)` check. Hide entirely if empty. Owner-mode prompts only. |
| P0-2 | Edit mode coverage | Shows and releases not editable from profile page | All 6 zones editable. Bottom sheets mirror admin editors for shows/releases. |
| P0-3 | Copy voice | Generic defaults ("Artist profile powered by ABLE", "Sign up") | Replace all defaults per COPY.md §2–5 tables. First-person artist voice everywhere. |
| P0-4 | Trust copy | "Just [Artist Name]. No spam." not guaranteed present | Always-rendered trust line below input: "Your email goes to [Artist Name] directly. Not to any platform." |
| P0-5 | Accessibility | No skip nav; `prefers-reduced-motion` incomplete; light theme contrast failures | Skip nav, ARIA landmarks, `0.01ms` reduced motion pattern, light theme accent overrides. |

### P1 items (8.5/10 → 9.3/10)

| ID | Gap | Fix |
|---|---|---|
| P1-1 | Gig mode — no tonight note, no post-show state | Mandatory tonight note field. Post-gig state from `able_gig_show_end`. |
| P1-2 | Pre-release — no release note, no final 24h shift | Release note field. `data-prerelease="final"` shift in last 24h. |
| P1-3 | Hero CTA copy defaults | `STATE_CTA_DEFAULTS` matrix + `VIBE_CTA_DEFAULTS` for profile state. |
| P1-4 | View transitions not wired | `view-transition-name: artist-name` on start.html Done screen + profile hero. Progressive enhancement. |
| P1-5 | Confirmation email not triggered | Supabase phase: fan submit → Resend edge function → artist-voiced email. |

### P2 items (9.3/10 → 9.7/10)

| ID | Gap | Fix |
|---|---|---|
| P2-1 | Edit mode zone coverage completion | Spotify/SoundCloud auto-fetch, photo upload with local blob URL, fan capture copy editor panel. |
| P2-2 | Glass theme without artwork | `applyTheme('glass', hasArtwork)` fallback to dark. Embed container explicit `backdrop-filter`. |
| P2-3 | Font loading — all vibe fonts loaded eagerly | Per-vibe on-demand font loading after `applyIdentity()` resolves vibe. |
| P2-4 | Contrast theme decorative animations | Duration token zero at theme level, not just `prefers-reduced-motion`. |

---

## 11. BUILD PRIORITY TABLE

| Priority | Item | Impact | Complexity | File area |
|---|---|---|---|---|
| **P0** | Section render gating — hide empty sections from fans | Angle 8: 3→7 | Low | JS `renderProfile()` |
| **P0** | Default copy voice — all strings to artist voice | Angle 5: 6→8 | Low | JS string constants |
| **P0** | Trust line — always rendered below fan input | Angle 18: 6→8 | Trivial | HTML template |
| **P0** | `<title>` / OG tag population from profile | Angle 1: +0.5 | Low | JS `updateMeta()` |
| **P0** | Skip navigation + ARIA landmarks | Angle 17: 6→8 | Low | HTML + CSS |
| **P0** | `prefers-reduced-motion` — `0.01ms` pattern | Angle 17: 6→8 | Low | CSS |
| **P0** | Light theme contrast fixes for indie + electronic | Angle 17 | Trivial | CSS |
| **P0** | Edit mode — all 6 zones editable from profile | Angle 16: 5→8 | High | JS edit system |
| **P1** | Gig mode tonight note + post-show state | Angle 13: 6→8 | Medium | JS state machine |
| **P1** | Pre-release note + final 24h register shift | Angle 14: 7→8.5 | Medium | JS state machine |
| **P1** | Hero CTA state × vibe defaults matrix | Angle 3: 7→8.5 | Low | JS constants |
| **P1** | `view-transition-name: artist-name` wiring | Angle 19: 7→8.5 | Medium | HTML + JS (progressive) |
| **P1** | Confirmation email (Supabase phase) | Angle 6: 7→8 | High | Supabase edge function |
| **P2** | Per-vibe on-demand font loading | Angle 10: 7→8.5 | Low | JS `loadVibeFont()` |
| **P2** | Glass theme fallback when no artwork | Angle 11: 8→9 | Low | JS `applyTheme()` |
| **P2** | Contrast theme — duration tokens at theme level | Angle 17: 8→9 | Trivial | CSS |
| **P2** | Edit zone coverage completion (Spotify fetch, photo upload) | Angle 16: 8→9 | High | JS edit system |

**Score summary after each phase:**

| Phase | Average | Target |
|---|---|---|
| Baseline | 6.9 | — |
| After P0 | 7.6 | ≥ 8.5 on critical angles |
| After P1 | 8.4 | — |
| After P2 | 8.9 | — |
| Hard ceiling (no backend) | 9.7 | — |
| 10/10 | Requires: Supabase confirmation email live, Spotify auto-import, cross-browser `@view-transition` | — |

---

## 12. PERFORMANCE REQUIREMENTS

| Metric | Target |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.10 |
| HTML (gzipped) | ≤ 340kB |

**Rendering law:** Render from `localStorage` immediately on DOMContentLoaded. Never wait for an API response before first paint. External failure (Supabase unavailable) → degrade gracefully → never show a blank section shell.

**Iframe containment:** YouTube and Spotify iframes are contained. No iframe should cause horizontal scroll or layout shift. Spotify embed: fixed height, `background: #000`. YouTube: padding-bottom 56.25% wrapper.

**Font strategy:** DM Sans + Barlow Condensed loaded eagerly (Latin subset only, `display=swap`). Vibe-specific fonts (Oswald, Cormorant Garamond, Space Grotesk, Lora) loaded on demand after vibe is resolved.

---

## 13. CROSS-PAGE COHERENCE

| Transition | From | To | Mechanism |
|---|---|---|---|
| Artist name fly | `start.html` Done screen preview | `able-v7.html` hero | `view-transition-name: artist-name` on both elements. Chrome 126+ progressive enhancement. Fallback: normal navigate. |
| ABLE logo fly | `admin.html` topbar logo | `able-v7.html` footer | `view-transition-name: able-logo` on both. Same progressive enhancement. |
| Shared font | DM Sans body | DM Sans body | Used in both `able-v7.html` and `start.html`. Admin uses Plus Jakarta Sans (deliberately different — marks interior/backstage divide). |

**Data continuity:** Profile data written by `start.html` onboarding wizard into `able_v3_profile` is read directly by `able-v7.html`. No conversion step needed.

---

## 14. CONTENT SECURITY POLICY

Applied via `<meta http-equiv="Content-Security-Policy">`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com;
img-src * data: blob:;
media-src *;
frame-src https://open.spotify.com https://w.soundcloud.com https://www.youtube.com https://bandcamp.com https://embed.music.apple.com;
connect-src 'self' https:;
```

Supabase JS is loaded via `cdn.jsdelivr.net` (covered by `script-src`). All artist artwork and images must be served over HTTPS (`img-src *` permissive for flexibility). New embed platforms require `frame-src` addition.

---

*End of spec. See also: `SPEC.md` (product purpose), `COPY.md` (all copy strings), `PATH-TO-10.md` (full build backlog), `USER-JOURNEYS.md` (5 complete journey flows).*
