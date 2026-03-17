# ABLE UI System — Canonical Specification
**Date: 2026-03-16 | Authority: V6_BUILD_AUTHORITY.md + DESIGN-SPEC.md**
**Status: Ground truth for all UI implementation decisions**

Two surfaces, one system. Every decision here applies unless a surface-specific override is noted.

- **Surface 1** — `able-v7.html`, `start.html`, `landing.html`, `fan.html`: dark navy, DM Sans body, artist-controlled `--color-accent`
- **Surface 2** — `admin.html`: near-black `#0f1624`, Plus Jakarta Sans body, amber `--acc: #c9a84c`

Surface 2 tokens are not derived from Surface 1 — they are a separate set for a different context. Do not mix them.

---

## 1. Design Tokens

### 1.1 Static tokens — Surface 1 (`:root`)

These are always present, never overridden by theme or vibe.

```css
:root {
  /* ── Fonts ─────────────────────────────────────────────── */
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-d:    'Barlow Condensed', system-ui, sans-serif;  /* overridden per vibe */
  --font-d-weight:    700;
  --font-d-style:     normal;
  --font-d-transform: none;   /* overridden per vibe (uppercase for electronic/hiphop/rock) */

  /* ── Spacing — 4px base grid ────────────────────────────── */
  --sp-1:  4px;
  --sp-2:  8px;
  --sp-3:  12px;
  --sp-4:  16px;
  --sp-5:  20px;
  --sp-6:  24px;
  --sp-8:  32px;
  --sp-10: 40px;
  --sp-12: 48px;
  --sp-16: 64px;

  /* ── Tap target ─────────────────────────────────────────── */
  --tap-min: 44px;   /* minimum height AND width for all interactive elements */

  /* ── Typography scale ───────────────────────────────────── */
  --text-xs:   11px;
  --text-sm:   13px;
  --text-base: 15px;
  --text-lg:   17px;
  --text-xl:   20px;
  --text-2xl:  24px;
  --text-3xl:  32px;
  --text-4xl:  40px;
  --text-hero: clamp(48px, 14vw, 80px);   /* artist name in hero */

  /* ── Line heights ───────────────────────────────────────── */
  --lh-tight:   0.88;   /* display — tightly packed headlines */
  --lh-display: 1.0;    /* section titles */
  --lh-body:    1.5;    /* paragraphs, bio, snap card text */
  --lh-label:   1.2;    /* caps labels, tags, pills */

  /* ── Border radii (defaults — overridden by applyDerivedTokens) ── */
  --r-pill: 999px;  /* Quick Action pills, state chips. ONLY use. Not on CTAs. */
  --r-sm:   8px;    /* buttons, CTAs — vibe-scaled */
  --r-md:   12px;   /* cards */
  --r-lg:   20px;   /* large cards, panels */
  --r-xl:   28px;   /* modal overlays */

  /* ── Letter spacing defaults (overridden per vibe) ─────── */
  --ls-d:     0em;     /* display headings */
  --ls-label: 0.12em;  /* caps labels */

  /* ── Easing curves ──────────────────────────────────────── */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);    /* spring bounce — reveals, confirms */
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94); /* deceleration — standard smooth */
  --ease-accel:    cubic-bezier(0.55, 0, 1, 0.45);       /* acceleration — exits */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);    /* neutral — backdrop, overlays */

  /* ── Duration scale ─────────────────────────────────────── */
  --dur-instant: 80ms;    /* state flips — campaign state crossfade, tab indicator */
  --dur-fast:    150ms;   /* press/hover feedback, toast show/hide */
  --dur-mid:     250ms;   /* reveals, focus transitions — overridden per vibe */
  --dur-slow:    400ms;   /* hero name, card bloom, error shake */
  --dur-xslow:   600ms;   /* panel open, confetti wind-up */

  /* ── Campaign state colours (frozen) ───────────────────── */
  --color-state-pre:  #fbbf24;  /* amber — pre-release chip */
  --color-state-live: #ef4444;  /* red — live chip, error borders */
  --color-state-gig:  #8b1e1e;  /* deep red — gig ONLY, nowhere else */
  --color-state-prof: #06b6d4;  /* cyan — profile state (not shown as chip) */

  /* ── Ambient colour (JS-set via canvas extraction) ─────── */
  --color-ambient: 0, 0, 0;   /* RGB triplet. Default = black. Updated on artwork load. */

  /* ── Accent defaults (overridden by applyDerivedTokens()) ── */
  --color-accent:        #e07b3a;
  --color-accent-rgb:    224, 123, 58;    /* use for rgba() composition */
  --color-accent-glow:   rgba(224, 123, 58, 0.30);
  --color-accent-soft:   rgba(224, 123, 58, 0.10);
  --color-accent-subtle: rgba(224, 123, 58, 0.12);
  --color-on-accent:     #ffffff;   /* text on accent background — auto-calculated from luminance */

  /* ── Layout ─────────────────────────────────────────────── */
  --tab-bar-height: 64px;
  --bg-blur:        40px;
  --bg-brightness:  0.45;
}
```

### 1.2 Theme tokens — Surface 1

Applied to `#app-shell` via `data-theme="dark|light|glass|contrast"`.

#### Dark (default)
```css
[data-theme="dark"] {
  --color-bg:          #0a0b10;     /* page background */
  --color-surface:     #0f1018;     /* one step raised — nav, sidebars */
  --color-card:        #16161e;     /* card background */
  --color-card-raised: #1e1e2a;     /* hover state, raised cards */
  --color-border:      rgba(255, 255, 255, 0.065);  /* warm white, very low opacity */
  --color-text:        #f0ede8;     /* warm cream — not harsh white */
  --color-text-2:      rgba(240, 237, 232, 0.60);   /* secondary text */
  --color-text-3:      rgba(218, 213, 207, 0.45);   /* muted text, placeholders */
  --color-overlay:     rgba(10, 11, 16, 0.82);      /* backdrop behind sheets */
  --shadow-card:       0 4px 28px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255, 255, 255, 0.04);
  --color-panel:       #1a1a24;     /* solid dark — edit drawers, always opaque */
  --color-panel-raised:#22222e;
  --color-panel-text:  #f0ede8;
}
```

#### Light
```css
[data-theme="light"] {
  --color-bg:          #f5f2ec;    /* warm cream — not clinical white */
  --color-surface:     #ede9e2;
  --color-card:        #ffffff;
  --color-card-raised: #f8f5f2;
  --color-border:      rgba(0, 0, 0, 0.08);
  --color-text:        #0d0e1a;
  --color-text-2:      rgba(13, 14, 26, 0.60);
  --color-text-3:      rgba(13, 14, 26, 0.38);
  --color-overlay:     rgba(245, 242, 236, 0.90);
  --shadow-card:       0 2px 16px rgba(0, 0, 0, 0.07);
  --color-panel:       #ffffff;
  --color-panel-raised:#f8f5f2;
  --color-panel-text:  #0d0e1a;
  --color-on-accent:   #0d0e1a;   /* OVERRIDE — dark text on accent in light theme */
}
```

#### Glass
```css
[data-theme="glass"] {
  --color-bg:          transparent;   /* requires #profile-bg behind the shell */
  --color-surface:     rgba(255, 255, 255, 0.06);
  --color-card:        rgba(255, 255, 255, 0.08);
  --color-card-raised: rgba(255, 255, 255, 0.12);
  --color-border:      rgba(255, 255, 255, 0.14);
  --color-text:        #f0ede8;
  --color-text-2:      rgba(240, 237, 232, 0.75);
  --color-text-3:      rgba(240, 237, 232, 0.55);
  --backdrop:          blur(28px) saturate(180%);   /* applied to .card elements */
  --color-panel:       #1a1a24;    /* solid — edit drawers must be readable */
  --color-panel-raised:#22222e;
  --color-panel-text:  #f0ede8;
}
```

**Glass theme law:**
- There must be a real background behind glass surfaces — artist hero artwork at `blur(40px) brightness(0.45) scale(1.1)`, `position: fixed; inset: 0; z-index: -1`.
- Glass on a plain background colour is meaningless and is forbidden.
- If `profile.artworkUrl` is not set, JS falls back to `dark` theme silently.
- `backdrop-filter` does not propagate into iframes. Spotify/YouTube embed wrappers need explicit `backdrop-filter: var(--backdrop)` applied to their container `<div>`.

#### Contrast
```css
[data-theme="contrast"] {
  --color-bg:          #000000;
  --color-surface:     #0a0a0a;
  --color-card:        #111111;
  --color-card-raised: #1a1a1a;
  --color-border:      rgba(255, 255, 255, 0.2);
  --color-text:        #ffffff;
  --color-text-2:      rgba(255, 255, 255, 0.85);
  --color-text-3:      rgba(255, 255, 255, 0.65);
  --shadow-card:       0 2px 16px rgba(0, 0, 0, 0.8);
  --color-panel:       #111111;
  --color-panel-raised:#1a1a1a;
  --color-panel-text:  #ffffff;
}
```

**Contrast theme behaviour:** All decorative animation durations collapse to near-zero. State-change transitions (80ms) remain. This is separate from `prefers-reduced-motion` — it applies when the user has explicitly chosen the contrast theme.

### 1.3 Static tokens — Surface 2 (admin.html `:root`)

These are the current admin tokens. They use a different naming convention and should not be cross-referenced with Surface 1 tokens.

```css
:root {
  /* admin.html flat tokens */
  --bg:       #0f1624;          /* page background (near-black, cool navy) */
  --bg-mid:   #141d2e;          /* one step raised */
  --card:     rgba(138,180,206,.06);   /* card background */
  --card-hv:  rgba(138,180,206,.10);  /* card hover */
  --border:   rgba(138,180,206,.10);
  --bm:       rgba(138,180,206,.18);  /* strong border (active states) */
  --text:     #ccddef;
  --t2:       rgba(204,221,239,.58);
  --t3:       rgba(204,221,239,.52);
  --acc:      #c9a84c;          /* amber accent — NOT the same as profile accent */
  --acc-rgb:  201,168,76;
  --font:     'Plus Jakarta Sans', sans-serif;
  --font-d:   'Barlow Condensed', sans-serif;
  --spring:   cubic-bezier(0.34,1.56,0.64,1);
  --ease:     cubic-bezier(0.25,0.46,0.45,0.94);
  --sidebar:  220px;
  --topbar:   56px;

  /* Admin light theme (main content area) */
  --dash-bg:     #e8e4dd;
  --dash-card:   #ffffff;
  --dash-border: #d4cfc8;
  --dash-shell:  #1a1a2e;    /* sidebar/topbar background */
  --dash-field:  #f5f2ee;    /* form field backgrounds */
  --dash-amber:  #f4b942;    /* topbar CTA colour */
  --dash-green:  #1e9650;
  --dash-red:    #c04030;
  --dash-text:   #1a1a2e;
  --dash-t2:     #555555;
  --dash-t3:     #888888;

  /* Source badge colours */
  --source-ig:     #e1306c;
  --source-sp:     #1ed760;
  --source-tt:     #888888;
  --source-direct: #999999;
}
```

**Note on `--acc` vs `--dash-amber`:** Admin uses `--acc` (#c9a84c, muted pale gold) in the sidebar dark context, and `--dash-amber` (#f4b942, brighter amber) for the topbar CTA. These are intentionally different — the sidebar needs a lower-saturation gold that reads well on dark; the topbar CTA needs maximum contrast on white.

---

## 2. Accent Token Derivation

The artist accent colour is a single hex value in `profile.accent`. All derived tokens are set by JavaScript on profile load and on every accent change in the wizard.

```javascript
function applyDerivedTokens(root, accentHex, rMult) {
  const [r, g, b] = hexToRgb(accentHex);

  // Accent colour set
  root.style.setProperty('--color-accent',        accentHex);
  root.style.setProperty('--color-accent-rgb',    `${r},${g},${b}`);
  root.style.setProperty('--color-accent-glow',   `rgba(${r},${g},${b},0.35)`);
  root.style.setProperty('--color-accent-soft',   `rgba(${r},${g},${b},0.10)`);
  root.style.setProperty('--color-accent-subtle', `rgba(${r},${g},${b},0.12)`);

  // on-accent text colour — calculated from luminance
  const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
  root.style.setProperty('--color-on-accent', luminance > 0.5 ? '#000000' : '#ffffff');

  // Border radii — computed from vibe r-mult (CSS calc with custom properties is unreliable for radius)
  root.style.setProperty('--r-sm', `${Math.round(4  * rMult)}px`);
  root.style.setProperty('--r-md', `${Math.round(8  * rMult)}px`);
  root.style.setProperty('--r-lg', `${Math.round(16 * rMult)}px`);
  root.style.setProperty('--r-xl', `${Math.round(24 * rMult)}px`);
}
```

**What changes with a single `profile.accent` edit:**
- Primary CTA background
- Primary CTA glow
- Section header accent border-top
- Fan capture input focus ring
- Focus indicator on all interactive elements
- State chip backgrounds (where accent-derived)
- Hero ambient glow
- Quick Action pill accent state
- `overscroll-behavior` accent tint on html element

---

## 3. Typography Scale

### 3.1 Surface 1 — Profile (DM Sans body, vibe display font)

All type in `able-v7.html`. `var(--font-d)` is set by vibe.

| Role | Font | Size | Weight | Transform | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|
| Artist name (hero) | `var(--font-d)` | `--text-hero` clamp(48–80px) | `--font-d-weight` | `--font-d-transform` | `--ls-d` | `--lh-tight` 0.88 |
| Section title | `var(--font-d)` | clamp(32px, 9vw, 40px) | `--font-d-weight` | `--font-d-transform` | `--ls-d` | 0.95 |
| Show day number | `var(--font-d)` | `--text-3xl` 32px | `--font-d-weight` | `--font-d-transform` | `--ls-d` | 1 |
| Fan capture heading | `var(--font-d)` | `--text-3xl` 32px | `--font-d-weight` | `--font-d-style` | `--ls-d` | 0.95 |
| Body / base | DM Sans | `--text-base` 15px | 400 | none | — | `--lh-body` 1.5 |
| Primary CTA | DM Sans | `--text-sm` 13px | 700 | uppercase | 0.08em | — |
| Secondary CTA | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.08em | — |
| Release card title | DM Sans | `--text-lg` 17px | 700 | none | — | 1.2 |
| Fan capture input | DM Sans | **16px (hard minimum)** | 400 | none | — | — |
| Platform pill label | DM Sans | `--text-sm` 13px | 500 | none | 0.01em | — |
| Hero meta tags | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.16em | `--lh-label` 1.2 |
| State chip | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.08em | — |
| Section action link | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.08em | — |
| Show venue | DM Sans | `--text-base` 15px | 700 | none | — | — |
| Show city | DM Sans | `--text-sm` 13px | 400 | none | 0.01em | — |
| Show month | DM Sans | 10px | 700 | uppercase | 0.14em | — |
| Tab bar labels | DM Sans | `--text-xs` 11px | 500 | uppercase | 0.04em | — |
| Snap card text | DM Sans | `--text-sm` 13px | 400 | none | — | `--lh-body` 1.5 |
| Merch item title | DM Sans | `--text-sm` 13px | 600 | none | — | — |
| Support pack label | DM Sans | `--text-base` 15px | 600 | none | — | — |
| Bio text | DM Sans | `--text-base` 15px | 400 | none | — | 1.65 |

**Input minimum font-size:** 16px is a hard minimum on `<input>` elements. iOS Safari zooms the viewport on inputs with `font-size < 16px`. Never reduce this.

### 3.2 Display font — vibe table

| Vibe | `--font-d` | Weight | Style | Transform | `--ls-d` | `--ls-label` |
|---|---|---|---|---|---|---|
| `electronic` | Barlow Condensed | 700 | normal | uppercase | 0.06em | 0.22em |
| `hiphop` | Oswald | 700 | normal | uppercase | 0.04em | 0.28em |
| `rnb` | Cormorant Garamond | 600 | italic | none | 0.02em | 0.12em |
| `indie` | Space Grotesk | 700 | normal | none | -0.01em | 0.08em |
| `pop` | Barlow Condensed | 700 | normal | none | 0.03em | 0.16em |
| `rock` | Oswald | 700 | normal | uppercase | 0.08em | 0.2em |
| `acoustic` | Lora | 700 | normal | none | 0.01em | 0.10em |

**Font loading rule:** Load DM Sans and Barlow Condensed eagerly (they serve electronic and pop vibes). Load all other display fonts on demand after `applyIdentity()` resolves the vibe. Never preload all 7 display fonts — unnecessary ~200ms load for non-electronic/pop vibes.

### 3.3 Surface 2 — Admin (Plus Jakarta Sans body)

Admin uses Plus Jakarta Sans throughout. No formal `--text-*` token scale is currently applied. Target values:

| Role | Font | Size | Weight |
|---|---|---|---|
| Stat value | Barlow Condensed | 28px | 700 |
| Page title | Plus Jakarta Sans | 16px | 600 |
| Section label | Plus Jakarta Sans | 9.5px | 700 / uppercase / 0.2em tracking |
| Nav item | Plus Jakarta Sans | 13px | 500 |
| Stat label | Plus Jakarta Sans | 10px | 700 / uppercase / 0.18em tracking |
| Body / tables | Plus Jakarta Sans | 13px | 400 |
| Small / meta | Plus Jakarta Sans | 11px | 400 |

---

## 4. Spacing System

4px base grid. Use tokens, never magic numbers.

| Token | Value | Use |
|---|---|---|
| `--sp-1` | 4px | Icon gaps, tight padding within components |
| `--sp-2` | 8px | Internal component padding, gap between pills |
| `--sp-3` | 12px | Card internal padding (small), button vertical padding |
| `--sp-4` | 16px | Standard component padding, horizontal page margin |
| `--sp-5` | 20px | Generous component padding, section-top padding |
| `--sp-6` | 24px | Section gap, card padding |
| `--sp-8` | 32px | Between sections |
| `--sp-10` | 40px | Large section gaps, hero padding |
| `--sp-12` | 48px | Major section spacing |
| `--sp-16` | 64px | Page-level top/bottom margins |

**Missing step:** 28px (between `--sp-6` and `--sp-8`) appears ad-hoc in places. Add `--sp-7: 28px` to avoid hardcoded values.

---

## 5. Component Patterns

### 5.1 Primary Button (`.btn-primary`)

Surface 1. Full-width in mobile context.

```html
<a class="btn-primary pressable" href="https://..." role="button">Listen on Spotify</a>
<!-- or form submit -->
<button class="btn-primary pressable" type="submit">I'm in</button>
```

```css
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;        /* tap target — never reduce */
  padding: 0 var(--sp-6);
  background-color: var(--color-accent);
  color: var(--color-on-accent);
  border: none;
  border-radius: var(--r-sm);   /* NOT --r-pill — small radius signals premium */
  font-family: var(--font-body);
  font-size: var(--text-sm);    /* 13px */
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  transition: transform var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
}

/* Glow — always present, dims at rest */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--r-sm);
  box-shadow: 0 8px 40px var(--color-accent-glow);
  opacity: 0.45;
  transition: opacity var(--dur-fast) var(--ease-standard);
  pointer-events: none;
}
.btn-primary:hover::after { opacity: 1; }

/* Press state — applied via JS on pointerdown */
.btn-primary.pressing {
  background: color-mix(in srgb, var(--color-accent) 80%, white 20%);
  transform: scale(0.97);
}
.btn-primary.pressing::after { opacity: 1; }

/* Focus — WCAG AA */
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### 5.2 Ghost / Secondary Button (`.btn-secondary`)

Surface 1.

```html
<a class="btn-secondary pressable" href="https://...">Pre-save</a>
```

```css
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;
  padding: 0 var(--sp-6);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.28);   /* dark theme default */
  border-radius: var(--r-sm);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-2);
  text-decoration: none;
  cursor: pointer;
  touch-action: manipulation;
  transition: border-color var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
}
.btn-secondary:hover {
  border-color: rgba(var(--color-accent-rgb), 0.5);
  color: var(--color-text);
}
.btn-secondary.pressing { transform: scale(0.97); }
.btn-secondary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Theme overrides */
[data-theme="light"]    .btn-secondary { border-color: rgba(0,0,0,0.20); }
[data-theme="contrast"] .btn-secondary { border-color: rgba(255,255,255,0.2); }
[data-theme="glass"]    .btn-secondary { border-color: rgba(255,255,255,0.15); backdrop-filter: blur(8px); }
```

### 5.3 Card (`.card`)

Surface 1. Base card component used by release cards, event cards, snap cards, merch cards.

```html
<div class="card">
  <!-- content -->
</div>
```

```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  position: relative;
}

/* Glass theme — apply backdrop-filter to every card */
[data-theme="glass"] .card {
  background: var(--color-card);   /* rgba(255,255,255,0.08) */
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
}
```

### 5.4 Bottom Sheet

Two implementations. Match the surface — do not cross-use.

#### Surface 1 (able-v7.html)

```html
<div id="bsBackdrop" class="bs-backdrop" hidden aria-hidden="true"></div>
<div id="bottomSheet" class="bottom-sheet" role="dialog"
     aria-modal="true" aria-labelledby="bsTitle" hidden>
  <div class="bs-handle" aria-hidden="true"></div>
  <div class="bs-header">
    <span class="bs-icon" id="bsIcon" aria-hidden="true"></span>
    <h2 class="bs-title" id="bsTitle"></h2>
    <button class="bs-close pressable" id="bsClose" aria-label="Close">✕</button>
  </div>
  <div class="bs-body" id="bsBody"></div>
  <div class="bs-footer">
    <button class="bs-cancel pressable" id="bsCancel">Cancel</button>
    <button class="bs-save btn-primary pressable" id="bsSave">Save</button>
  </div>
</div>
```

JS: `openSheet(icon, title, bodyHTML, onSave)` / `closeSheet()`

#### Surface 2 (admin.html)

```html
<div id="adminSheetBackdrop" hidden></div>
<div id="adminSheet" class="admin-sheet" hidden>
  <div class="sheet-handle"></div>
  <div class="sheet-header">
    <span id="adminSheetIcon"></span>
    <span id="adminSheetTitle"></span>
    <button onclick="closeAdminSheet()">✕</button>
  </div>
  <div id="adminSheetBody" class="sheet-body"></div>
</div>
```

JS: `openAdminSheet(icon, title, bodyHTML)` / `closeAdminSheet()`

#### Animation (both surfaces)
- Entry: `translateY(100%) → translateY(0)`, `var(--ease-spring)`, 350ms
- Exit: `translateY(0) → translateY(100%)`, `var(--ease-accel)`, 250ms (always faster than entry)
- Backdrop: `opacity: 0 → 0.55`, `var(--ease-standard)`, 250ms

#### Accessibility (Surface 1 requirement)
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Escape key closes: `document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet() })`
- Android back gesture: `history.pushState({panel: 'sheet'}, '')` on open; `popstate` handler closes
- Swipe-to-dismiss: deltaY > 60px on touch triggers close
- Return focus to trigger element on close

### 5.5 Pill / State Chip

```html
<!-- Campaign state chip — hero zone -->
<span class="state-chip state-chip--live" aria-label="Out now">Out now</span>
<span class="state-chip state-chip--pre"  aria-label="Pre-release">Pre-release</span>
<span class="state-chip state-chip--gig"  aria-label="On tonight">On tonight</span>

<!-- Quick Action pill — horizontal scroll row -->
<a class="qa-pill pressable" href="https://...">
  <span class="qa-pill__icon" aria-hidden="true">🎵</span>
  <span class="qa-pill__label">Spotify</span>
</a>
```

```css
/* State chip base */
.state-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: var(--lh-label);
}

/* State variants */
.state-chip--pre  { background: var(--color-state-pre);  color: #000; }
.state-chip--live { background: var(--color-state-live); color: #fff; }
.state-chip--gig  { background: var(--color-state-gig);  color: #fff; position: relative; }

/* Gig chip glow pulse — opacity on ::after only, never animate box-shadow directly */
.state-chip--gig::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--r-pill);
  box-shadow: 0 0 16px rgba(139, 30, 30, 0.6);
  opacity: 0;
  animation: badge-glow-pulse 2s ease-in-out infinite;
  pointer-events: none;
}
@keyframes badge-glow-pulse {
  0%, 100% { opacity: 0; }
  50%       { opacity: 1; }
}

/* Quick Action pill — tier 1 (quiet) */
.qa-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 8px 16px;
  min-height: var(--tap-min);
  border-radius: var(--r-pill);
  background: rgba(255, 252, 240, 0.05);
  border: 1px solid rgba(255, 252, 240, 0.08);
  color: rgba(228, 223, 210, 0.60);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  touch-action: manipulation;
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard);
}
.qa-pill:hover, .qa-pill.active {
  background: rgba(var(--color-accent-rgb), 0.10);
  border-color: rgba(var(--color-accent-rgb), 0.22);
  color: var(--color-accent);
}
```

### 5.6 Toast Notification

Surface 2 (admin.html) only.

```html
<div id="adminToast" class="admin-toast" role="status" aria-live="polite" aria-atomic="true"></div>
```

JS: `showToast(msg)` — shows for 2200ms, auto-dismisses.

Copy rules: "Saved." / "Copied." / "Show added." / "Show removed." — maximum 4 words, past tense, period. Never: "Successfully saved!", "Done!", exclamation marks.

### 5.7 Input Field

Surface 1 (fan capture). Applied rules:

```html
<input
  class="fan-capture__input"
  type="email"
  autocomplete="email"
  inputmode="email"
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  placeholder="your@email.com"
  aria-label="Email address"
>
```

```css
.fan-capture__input {
  width: 100%;
  min-height: var(--tap-min);
  padding: var(--sp-3) var(--sp-4);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  font-family: var(--font-body);
  font-size: 16px;      /* hard minimum — iOS Safari zooms below this */
  color: var(--color-text);
  caret-color: var(--color-accent);
  transition: border-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.fan-capture__input::placeholder {
  color: var(--color-text-3);
}
.fan-capture__input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

/* Error state */
.fan-capture__input.error {
  border-color: var(--color-state-live);
}
/* Error shake animation */
@keyframes error-shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-8px); }
  30%  { transform: translateX(8px); }
  50%  { transform: translateX(-5px); }
  65%  { transform: translateX(5px); }
  80%  { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}
.fan-capture__input.shaking {
  animation: error-shake var(--dur-slow) var(--ease-standard);
}
```

### 5.8 Avatar / Artwork Frame

Artist artwork — profile surface.

```css
.hero__artwork {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-decel);
}
.hero__artwork.loaded { opacity: 1; }

/* Placeholder — shown before image loads or if no artwork */
.hero__artwork-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-bg) 60%, var(--color-accent) 40%),
    var(--color-bg)
  );
}
```

### 5.9 Progress Bar

Used in admin.html (fan count progress toward tier limit).

```css
.progress-track {
  width: 100%;
  height: 6px;
  background: var(--dash-border);
  border-radius: var(--r-pill);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: var(--r-pill);
  background: var(--dash-amber);
  transition: width var(--dur-mid) var(--ease-decel);
}
.progress-fill.full {
  background: var(--dash-red);
}
```

### 5.10 Section Header

Surface 1. Always `<header>` element containing `<h2>`.

```html
<header class="section-header">
  <h2 class="section-title">Listen</h2>
  <a class="section-action pressable" href="#" aria-label="See all releases">See all →</a>
</header>
```

```css
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: var(--sp-5);
  border-top: 1px solid rgba(var(--color-accent-rgb), 0.38);   /* accent line above title */
  margin-bottom: var(--sp-6);
}
.section-title {
  font-family: var(--font-d);
  font-size: clamp(32px, 9vw, var(--text-4xl));
  font-weight: var(--font-d-weight);
  font-style: var(--font-d-style);
  text-transform: var(--font-d-transform);
  letter-spacing: var(--ls-d);
  line-height: 0.95;
  color: var(--color-text);
}
.section-action {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  min-height: var(--tap-min);
  display: inline-flex;
  align-items: center;
}
```

### 5.11 Divider

```css
.divider {
  width: 100%;
  height: 1px;
  background: var(--color-border);
  margin: var(--sp-6) 0;
}
```

### 5.12 Icon Button

Always include `aria-label`. Minimum 44×44px tap target.

```html
<button class="icon-btn pressable" aria-label="Close">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <!-- SVG path -->
  </svg>
</button>
```

```css
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--tap-min);
  height: var(--tap-min);
  min-width: var(--tap-min);
  background: none;
  border: none;
  border-radius: var(--r-md);
  color: var(--color-text-2);
  cursor: pointer;
  touch-action: manipulation;
  transition: background-color var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard);
}
.icon-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
}
.icon-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

## 6. Motion System

### 6.1 Easing curves

| Name | Curve | Use |
|---|---|---|
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring bounce — reveals, confirms, panel entry |
| `--ease-decel` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Standard smooth deceleration — hero name, card bloom |
| `--ease-accel` | `cubic-bezier(0.55, 0, 1, 0.45)` | Exits — always faster than entries |
| `--ease-standard` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Neutral — backdrops, overlays, focus transitions |

### 6.2 Duration usage

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80ms | Campaign state crossfade, tab indicator jump, state label swap |
| `--dur-fast` | 150ms | Press/hover feedback, toast show/hide, focus ring |
| `--dur-mid` | 250ms | Reveals, focus transitions — overridden per vibe (180–350ms) |
| `--dur-slow` | 400ms | Hero name reveal, card bloom, error shake, image load |
| `--dur-xslow` | 600ms | Panel open, confetti burst |

### 6.3 Vibe motion personality

Each vibe overrides `--dur-mid` and `--ease-spring` to give the page a distinct kinetic feel:

| Vibe | `--dur-mid` | `--ease-spring` | Character |
|---|---|---|---|
| electronic | 180ms | `cubic-bezier(0.34, 1.28, 0.64, 1)` | Tight, mechanical, snaps |
| hiphop | 200ms | `cubic-bezier(0.34, 1.40, 0.64, 1)` | Punchy, confident |
| rnb | 320ms | `cubic-bezier(0.34, 1.52, 0.64, 1)` | Smooth, lingers |
| indie | 260ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Natural, unhurried |
| pop | 220ms | `cubic-bezier(0.34, 1.72, 0.64, 1)` | Bright, bouncy — exaggerated overshoot |
| rock | 190ms | `cubic-bezier(0.34, 1.20, 0.64, 1)` | Aggressive, minimal bounce |
| acoustic | 350ms | `cubic-bezier(0.34, 1.10, 0.64, 1)` | Organic, barely overshoots |

### 6.4 Animation rules (hard)

**Only animate:** `opacity`, `transform`

**Never animate in loops:**
- `box-shadow` — use `opacity` on a `::after` pseudo-element containing the shadow
- `width`, `height` — use `transform: scaleX/scaleY`
- `top`, `left` — use `transform: translate`
- `filter`, `backdrop-filter` — causes full repaint
- `background-color` — exception: short one-time transitions (< 400ms) are acceptable for theme switches

**Performance requirements:**
- 60fps on mid-range Android (Pixel 5a / Samsung Galaxy A42)
- `will-change: transform` only where genuinely needed — overuse degrades performance
- `touch-action: manipulation` on all interactive elements — eliminates 300ms tap delay

### 6.5 Reduced-motion law

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Stop entirely: hero name slide-up, staggered card bloom, skeleton shimmer, confetti, gloss pass, counter animation, countdown digit flip.

Keep but instant (0ms or 80ms): campaign state change, tab indicator, theme switch, error border, panel open/close (opacity only).

Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for Web Animations API and canvas-based animations that CSS cannot override.

---

## 7. Theme System Implementation

### 7.1 How to apply a theme

```javascript
function applyTheme(theme) {
  const shell = document.getElementById('app-shell');
  shell.dataset.theme = theme;   // 'dark' | 'light' | 'glass' | 'contrast'

  // Glass: verify artwork exists, fall back to dark
  if (theme === 'glass' && !profile.artworkUrl) {
    shell.dataset.theme = 'dark';
    return;
  }

  // Glass: show #profile-bg
  if (theme === 'glass') {
    document.getElementById('profile-bg').classList.add('active');
  }

  // Persist
  localStorage.setItem('able_theme', theme);
}
```

### 7.2 What each theme must override

All four themes MUST define these tokens (no fallbacks to default — define explicitly):

```
--color-bg
--color-surface
--color-card
--color-card-raised
--color-border
--color-text
--color-text-2
--color-text-3
--color-overlay
--color-panel
--color-panel-raised
--color-panel-text
```

`--shadow-card` should also be defined per theme. Glass and contrast currently omit it — this is a known gap (see PATH-TO-10.md P1-2).

### 7.3 Glass theme requirements

1. `#profile-bg` element: `position: fixed; inset: 0; z-index: -1; background-image: url(profile.artworkUrl); filter: blur(40px) brightness(0.45); transform: scale(1.1)` — scale prevents blur edge showing at screen edges.
2. `#app-shell` background must be `transparent` in glass theme.
3. Every `.card` needs `backdrop-filter: var(--backdrop); -webkit-backdrop-filter: var(--backdrop)`.
4. Iframe wrappers (Spotify, YouTube) need explicit `backdrop-filter` on their container `<div>` — the property does not propagate into iframes.
5. Edit drawers (`--color-panel: #1a1a24`) are intentionally solid — glass panels behind editable content are unreadable.

---

## 8. Accessibility Baseline

These are release gates, not goals.

### 8.1 Focus rings

```css
/* Surface 1 */
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
*:focus:not(:focus-visible) { outline: none; }

/* Surface 2 (admin) */
*:focus-visible {
  outline: 2px solid var(--acc);
  outline-offset: 2px;
}
*:focus:not(:focus-visible) { outline: none; }
```

The `:focus:not(:focus-visible)` rule suppresses the default browser ring for mouse/touch users while keeping it for keyboard users. This is the WCAG 2.2 AA compliant pattern.

### 8.2 Tap targets

```css
/* Enforce on all interactive elements */
button, a, [role="button"], input, select, textarea {
  min-height: var(--tap-min);  /* 44px */
  touch-action: manipulation;
}
```

**Verify explicitly:** Quick Action pills, accordion toggles, close buttons on sheets, tab bar items, platform pill rows.

### 8.3 Contrast requirements

| Context | Minimum ratio |
|---|---|
| Body text | 4.5:1 (WCAG AA) |
| Large text (18px+ or 14px bold) | 3:1 |
| UI components (borders, icons) | 3:1 |
| State chips | 4.5:1 (text on background) |

Verify across all 4 themes. Contrast theme must pass with the highest ratios.

### 8.4 Semantic HTML requirements

- Section headers: `<h2>` not `<div>` — required for screen reader navigation
- Tab bar items: `role="tab"` or `role="button"` + `aria-selected`
- Bottom sheet: `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Form fields: paired `<label>` or `aria-label`
- Icon-only buttons: `aria-label` always
- State changes: `aria-live="polite"` on containers that update dynamically
- Skip navigation: `<a href="#main-content" class="skip-to-main">Skip to content</a>` — visually hidden until focused

### 8.5 Skip to main link

```html
<a href="#main-content" class="skip-to-main">Skip to content</a>
```

```css
.skip-to-main {
  position: absolute;
  top: -100%;
  left: 0;
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-weight: 700;
  z-index: 99999;
  text-decoration: none;
}
.skip-to-main:focus { top: 0; }
```

---

## 9. Surface Comparison — Quick Reference

| Property | Surface 1 (profile) | Surface 2 (admin) |
|---|---|---|
| Background | `#0a0b10` dark | `#e8e4dd` warm cream (main), `#1a1a2e` (sidebar) |
| Body font | DM Sans | Plus Jakarta Sans |
| Display font | Barlow Condensed (default, vibe-overridden) | Barlow Condensed |
| Accent | Artist-controlled, `--color-accent` | `#f4b942` amber topbar, `#c9a84c` sidebar |
| Token namespace | `--color-*`, `--sp-*`, `--text-*` | `--bg`, `--acc`, `--card`, `--dash-*` |
| Theme system | 4 themes via `data-theme` | Single theme (no theme toggle) |
| Vibe system | 7 vibes via `data-vibe` | N/A |
| Component origin | COMPONENT-LIBRARY.md | Ad-hoc per-file |
| Focus ring colour | `--color-accent` (artist colour) | `--acc` (amber) |
