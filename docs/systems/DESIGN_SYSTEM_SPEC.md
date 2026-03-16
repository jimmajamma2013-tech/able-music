# ABLE — Design System Spec
**Created: 2026-03-15 | Strategy score: 9.5/10**

> The single canonical source for all design tokens, typography, colour systems, and layout principles across all ABLE pages. When VISUAL_SYSTEM.md and this document conflict, this document wins.

---

## 1. TWO SURFACES

ABLE has two deliberately different design surfaces:

### Surface 1 — Artist Profile (able-v7.html + landing.html + start.html + fan.html)
The fan-facing, artist-owned world. Dark, premium, music-first.

### Surface 2 — Artist Dashboard (admin.html)
The backstage. Warm, functional, clearly separated from the profile.

**The separation is intentional and must never be collapsed.** When an artist opens admin.html, they must immediately feel they've stepped behind the curtain.

---

## 2. SURFACE 1 — ARTIST PROFILE TOKENS

### Canonical colour tokens
```css
--color-bg:       #0d0e1a;   /* Midnight Navy — base */
--color-card:     #12152a;   /* Card surface */
--color-card-2:   #191d35;   /* Elevated card */
--color-border:   rgba(255,255,255,.08);
--color-border-2: rgba(255,255,255,.14);
--color-text:     #e0e6f0;   /* Primary text */
--color-text-2:   rgba(224,230,240,.65);  /* Secondary text */
--color-text-3:   rgba(224,230,240,.45);  /* Muted text */
--color-accent:   artist-set;  /* Default: #e05242 — the one variable that makes each page unique */
--color-accent-rgb: derived from --color-accent (e.g. 224,82,66)
```

### Artist accent colour system
The single most powerful design decision in ABLE. One CSS variable change = complete brand.

```css
/* Default (new artist) */
--color-accent: #e05242;

/* Vibe presets (from VISUAL_SYSTEM.md) */
--color-accent: #06b6d4;  /* Electronic/Club — cyan */
--color-accent: #f4b942;  /* Hip Hop/Rap — gold */
--color-accent: #e06b7a;  /* R&B/Soul — rose */
--color-accent: #7ec88a;  /* Indie/Alt — sage */
--color-accent: #9b7cf4;  /* Pop — indigo */
--color-accent: #e05242;  /* Rock/Metal — red */
--color-accent: #d4a96a;  /* Acoustic/Folk — ochre */
```

**accent-rgb derivation** (required for rgba() usage):
```javascript
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
// Set: document.documentElement.style.setProperty('--color-accent-rgb', `${r},${g},${b}`);
```

### Typography — Surface 1
```
Display font: 'Barlow Condensed' — artist name, state headers, release titles
Body font: 'DM Sans' — body text, UI elements, copy
```

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Artist name (hero) | Barlow Condensed | clamp(40px,8vw,64px) | 700 | font-feature-settings: 'ss01' |
| Section header | Barlow Condensed | 22px | 700 | uppercase, ls: 0.04em |
| Release title | Barlow Condensed | 18px | 600 | |
| Hero CTA | DM Sans | 17px | 600 | |
| Quick Action pill | DM Sans | 13px | 500 | |
| Body text | DM Sans | 15px | 400 | |
| Caption / muted | DM Sans | 12px | 400 | |
| Fan sign-up input | DM Sans | 16px | 400 | 16px minimum — iOS zoom prevention |
| Platform pill | DM Sans | 12px | 500 | |
| Made with ABLE footer | DM Sans | 11px | 500 | |

### Four themes
```css
/* Dark (default) */
[data-theme="dark"] {
  --color-bg:   #0d0e1a;
  --color-card: #12152a;
}

/* Light */
[data-theme="light"] {
  --color-bg:   #f0ede8;  /* warm cream */
  --color-card: #ffffff;
  --color-text: #1a1a2e;
  --color-text-2: rgba(26,26,46,.65);
  --color-text-3: rgba(26,26,46,.45);
  --color-border: rgba(26,26,46,.1);
}

/* Glass */
[data-theme="glass"] {
  --color-bg:   transparent;  /* requires background artwork */
  --color-card: rgba(255,255,255,.06);
  backdrop-filter: blur(28px) saturate(180%);  /* on card elements */
}

/* Contrast */
[data-theme="contrast"] {
  --color-bg:   #000000;
  --color-card: #111111;
  --color-text: #ffffff;
  --color-border: rgba(255,255,255,.2);
}
```

### Seven genre vibes (identity system)
```
data-feel="electronic"  → Barlow Condensed, uppercase, #06b6d4
data-feel="hiphop"      → Oswald, uppercase, #f4b942
data-feel="rnb"         → Cormorant Garamond, italic, #e06b7a
data-feel="indie"       → Space Grotesk, #7ec88a
data-feel="pop"         → Barlow Condensed, #9b7cf4
data-feel="rock"        → Oswald, uppercase, #e05242
data-feel="folk"        → Lora, serif, #d4a96a
```

---

## 3. SURFACE 2 — ADMIN DASHBOARD TOKENS

```css
/* Admin-specific (never use on profile) */
--dash-bg:     #e8e4dd;   /* warm cream background */
--dash-card:   #ffffff;
--dash-border: #d4cfc8;
--dash-shell:  #1a1a2e;   /* sidebar + topbar */
--dash-field:  #f5f2ee;
--dash-amber:  #f4b942;   /* admin accent */
--dash-green:  #1e9650;
--dash-red:    #c04030;
--dash-text:   #1a1a2e;
--dash-t2:     #555555;
--dash-t3:     #777777;   /* WCAG AA — 4.6:1 on white */

/* Source badge colours (canonical — same in admin and fan.html) */
--source-ig:     #e1306c;
--source-sp:     #1ed760;
--source-tt:     #888888;
--source-direct: #999999;
```

### Typography — Surface 2
```
Display font: 'Barlow Condensed' — shared with Surface 1
Body font: 'Plus Jakarta Sans' — different from Surface 1 (intentional)
```

| Element | Font | Size | Weight |
|---|---|---|---|
| Greeting / page title | Plus Jakarta Sans | 22px | 700 |
| Section header | Plus Jakarta Sans | 13px | 600 |
| Stat value | Barlow Condensed | 28px | 700 |
| Stat label | Plus Jakarta Sans | 10px | 700 |
| Nav item | Plus Jakarta Sans | 13px | 500 |
| Field input | Plus Jakarta Sans | 13px (16px mobile) | 400 |
| Button | Plus Jakarta Sans | 12px | 700 |

---

## 4. EASING FUNCTIONS

```css
/* Surface 1 + Surface 2 (shared) */
--spring:   cubic-bezier(0.34, 1.56, 0.64, 1);    /* entrances with overshoot */
--ease:     cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* exits, smooth motion */

/* Special cases */
--ease-linear:   linear;                            /* progress bars, timers */
--ease-snap:     cubic-bezier(0.68, -0.6, 0.32, 1.6); /* strong spring for tab indicator */
```

---

## 5. SPACING SYSTEM

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-7:  28px
--space-8:  32px
--space-9:  40px
--space-10: 48px
--space-11: 56px   /* minimum tap target */
--space-12: 64px
--space-13: 80px
```

**Tap target minimum: 56px height** on all interactive elements.
**Page padding (mobile): 16px horizontal** on Surface 1, 16px on Surface 2 mobile.
**Page padding (desktop): 28px horizontal** on Surface 2 desktop.

---

## 6. BORDER RADIUS

```css
--radius-xs: 6px    /* small badges, checkmarks */
--radius-sm: 8px    /* small buttons, pills */
--radius-md: 12px   /* cards, snap cards, fan rows */
--radius-lg: 16px   /* campaign HQ, stat cards, main cards */
--radius-xl: 20px   /* hero cards, modal backgrounds */
--radius-full: 100px /* pills, circular buttons */
```

---

## 7. SHADOW SYSTEM

```css
/* Surface 1 (dark, premium) */
--shadow-card:  0 1px 0 rgba(255,255,255,.04);
--shadow-lift:  0 8px 32px rgba(0,0,0,.4);
--shadow-glow:  0 0 0 3px rgba(var(--color-accent-rgb), 0.25);  /* focus + active states */

/* Surface 2 (light, admin) */
--shadow-admin-card: 0 1px 4px rgba(0,0,0,.06);
--shadow-admin-lift: 0 4px 16px rgba(0,0,0,.1);
```

---

## 8. GRID SYSTEM

### Surface 1 (artist profile — mobile first)
- Mobile: single column, 16px gutters
- Tablet: 2-column bento grid where applicable
- Desktop: same as tablet (max content width 560px centred)
- iPhone shell width: 430px on desktop display

### Surface 2 (admin — sidebar layout)
- Sidebar: 220px fixed, `--sidebar: 220px`
- Main: `margin-left: var(--sidebar)` on desktop
- Content max-width: 900px
- Stats grid: `repeat(4, 1fr)` desktop / `repeat(2, 1fr)` mobile
- Section grid: `2fr 1fr` (wide) or `1fr 1fr` (equal)

---

## 9. COMPONENT PATTERNS

### Bottom sheet (shared pattern — admin + profile)
```css
.bottom-sheet-content {
  border-radius: 20px 20px 0 0;
  transform: translateY(100%);
  transition: transform 0.32s var(--ease);
  padding-bottom: env(safe-area-inset-bottom);
}
.bottom-sheet.open .bottom-sheet-content {
  transform: translateY(0);
}
```

### Focus ring (canonical — all pages)
```css
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-bg, #0d0e1a),
              0 0 0 4px var(--focus-color),
              0 0 0 6px rgba(var(--focus-color-rgb), 0.25);
}
/* Surface 1: --focus-color: var(--color-accent) */
/* Surface 2: --focus-color: var(--dash-amber) */
```

### Toast (shared pattern)
```css
.toast {
  position: fixed; bottom: 28px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
  transition: opacity 0.22s, transform 0.22s var(--spring);
}
.toast.show {
  opacity: 1; transform: translateX(-50%) translateY(0);
}
```

### Skeleton shimmer (shared pattern)
```css
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
.skel {
  background: linear-gradient(90deg,
    rgba(138,180,206,.06) 25%,
    rgba(138,180,206,.14) 50%,
    rgba(138,180,206,.06) 75%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  color: transparent !important;
  pointer-events: none; user-select: none;
}
```

---

## 10. GRAIN TEXTURE

Applied to both surfaces with different opacity:
```css
/* Surface 1 */
.v3-shell::before {
  content: ''; position: fixed; inset: 0; z-index: 9000; pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
}

/* Surface 2 (admin) */
body::before {
  /* same pattern, opacity: 0.05 */
}
```

---

## 11. PERFORMANCE BUDGETS

| Metric | Budget |
|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s |
| INP (Interaction to Next Paint) | ≤ 200ms |
| CLS (Cumulative Layout Shift) | ≤ 0.10 |
| HTML file (gzipped) | ≤ 340kB |
| Font loading | Preconnect to fonts.googleapis.com |
| First meaningful paint | From localStorage, < 100ms |

---

## 12. ACCESSIBILITY REQUIREMENTS

| Requirement | Spec |
|---|---|
| Focus visibility | Glow ring pattern (§9) on all pages |
| Colour contrast | AA (4.5:1 body, 3:1 large text) |
| Tap targets | 56px minimum height |
| iOS zoom prevention | `font-size: 16px` on all inputs |
| prefers-reduced-motion | All animations respect this |
| touch-action | `manipulation` on all interactives |
| ARIA labels | All icon-only buttons |
| Screen reader | Skeleton shimmer: `aria-hidden="true"` |

---

## 13. DESIGN SYSTEM SCORE

**Current score: 9.5 → 10 path documented in DESIGN_SYSTEM_PATH_TO_10.md**

**What's excellent:**
- Complete dual-surface system (profile vs dashboard)
- Single accent variable driving complete visual identity
- 7 vibe presets covering all major music genres
- Consistent easing functions, grain texture, bottom sheet pattern
- Strong accessibility foundation

**What prevents 10:**
- No design token file — tokens are distributed across HTML `<style>` blocks. A shared `shared/tokens.css` file would be cleaner.
- `--dash-t3: #888888` in existing code (should be `#777777`) — already caught in admin spec but needs global audit
- Focus ring glow pattern not consistent across all pages (admin uses flat 2px, profile uses glow)

**What would make it 11:**
- Shared CSS file (`shared/tokens.css`) imported by all pages — single source of truth
- Design token export to JSON for any future React/native work
- Figma component library linked to the token values
