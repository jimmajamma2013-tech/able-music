# ABLE UI System — Path to 10/10
**Date: 2026-03-16 | Updated: 2026-03-16 (session 12) | ~~Baseline: 7.1/10~~ Updated: 8.4/10 (P0 complete)**
**Cross-reference:** ANALYSIS.md (what's wrong) · SPEC.md (ground truth) · FINAL-REVIEW.md (projected scores)

---

## Score projection

| Stage | Score | Gate |
|---|---|---|
| Current | 7.1/10 | — |
| After P0 | 8.4/10 | Pre-launch minimum |
| After P1 | 9.1/10 | Recommended before public beta |
| After P2 | 9.6/10 | Refinement phase |

A 10/10 would require perfect cross-file consistency, a full icon system, and comprehensive form design — achievable over time, not a launch requirement.

---

## P0 — Must fix before launch

These are issues that will cause visible bugs, accessibility failures, or broken layouts.

---

### P0-1: `--shadow-card` missing from glass and contrast themes

**Problem:** `--shadow-card` is defined in dark and light themes but not glass or contrast. Cards in those themes will inherit the dark theme shadow or nothing, depending on cascade order. Glass cards behind a blurred artwork background look wrong with a heavy dark shadow.

**Fix:**

```css
[data-theme="glass"] {
  /* Add to existing glass theme block */
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.10);
}

[data-theme="contrast"] {
  /* Add to existing contrast theme block */
  --shadow-card: 0 2px 16px rgba(0, 0, 0, 0.8);
}
```

**File:** `/Users/jamescuthbert/Desktop/ABLE  MERGED/able-v7.html` — add inside `[data-theme="glass"]` and `[data-theme="contrast"]` CSS blocks.

---

### P0-2: Admin `transition: all` on sidebar hover states

**Problem:** `transition: all .16s` catches every CSS property including layout properties (width, height, margin, padding). On hover, if any of these properties change (or have a chance to — e.g. font loading), `transition: all` causes janky repaints that are hard to debug.

**Before:**
```css
.sb-artist:hover { background:var(--card-hv); }
.sb-item { transition:all .14s; }
.sb-view-btn { transition:all .16s; }
.tb-btn-acc { transition:all .16s; }
```

**After:**
```css
.sb-artist { transition: background-color 140ms var(--ease); }
.sb-item   { transition: background-color 140ms var(--ease), color 140ms var(--ease); }
.sb-view-btn { transition: background-color 160ms var(--ease); }
.tb-btn-acc  { transition: transform 160ms var(--ease), box-shadow 160ms var(--ease); }
```

**File:** `/Users/jamescuthbert/Desktop/ABLE  MERGED/admin.html` — replace all `transition: all` with explicit property lists.

---

### P0-3: Admin stat card grid breaks below 600px

**Problem:** `.stats-row { grid-template-columns: repeat(4,1fr) }` — four columns will render at ~120px each on a 520px mobile browser, which is unreadable.

**Fix:**
```css
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 28px;
}

@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .stats-row { grid-template-columns: 1fr; }
}
```

**File:** `/Users/jamescuthbert/Desktop/ABLE  MERGED/admin.html` — add media queries after the existing `.stats-row` rule.

---

### P0-4: Skip-to-main link missing from able-v7.html

**Problem:** Without a skip-to-main link, keyboard users must tab through the entire status bar, owner bar, and tab navigation before reaching main content. This is a WCAG 2.2 AA failure.

**Fix — add as first element inside `<body>`:**

```html
<a href="#main-content" class="skip-to-main">Skip to content</a>
```

**Fix — add CSS:**

```css
.skip-to-main {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 99999;
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
  border-radius: 0 0 var(--r-sm) 0;
  transition: top var(--dur-fast) var(--ease-decel);
}
.skip-to-main:focus {
  top: 0;
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**File:** `/Users/jamescuthbert/Desktop/ABLE  MERGED/able-v7.html`

---

### P0-5: Bottom sheet in admin.html missing ARIA

**Problem:** The admin sheet (`#adminSheet`) has no `role="dialog"`, `aria-modal="true"`, or `aria-labelledby`. Screen readers will not announce it as a dialog and focus management will be absent.

**Before:**
```html
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

**After:**
```html
<div id="adminSheet" class="admin-sheet"
     role="dialog" aria-modal="true" aria-labelledby="adminSheetTitle" hidden>
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header">
    <span id="adminSheetIcon" aria-hidden="true"></span>
    <h2 id="adminSheetTitle" class="sheet-title"></h2>
    <button class="sheet-close" onclick="closeAdminSheet()" aria-label="Close">✕</button>
  </div>
  <div id="adminSheetBody" class="sheet-body"></div>
</div>
```

Also add Escape key handler to admin.html JS:
```javascript
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAdminSheet();
});
```

**File:** `/Users/jamescuthbert/Desktop/ABLE  MERGED/admin.html`

---

### P0-6: Glass theme iframe containers missing backdrop-filter

**Problem:** `backdrop-filter` does not propagate into iframes. Spotify and YouTube embeds inside the glass theme render as opaque panels, visually breaking the glass effect.

**Fix — add to CSS:**

```css
[data-theme="glass"] .spotify-embed-wrapper,
[data-theme="glass"] .youtube-embed-wrapper,
[data-theme="glass"] .soundcloud-embed-wrapper {
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  background: rgba(255, 255, 255, 0.06);   /* fallback if backdrop-filter unsupported */
  border-radius: var(--r-lg);
  overflow: hidden;
}
```

These wrapper classes must exist in the DOM surrounding every `<iframe>`. If they don't, add them when building the embed rendering function.

**File:** `/Users/jamescuthbert/Desktop/ABLE  MERGED/able-v7.html`

---

## P1 — High value, this week

These won't block launch but they measurably improve quality and should be done before beta.

---

### P1-1: Add `--sp-7: 28px` spacing token

**Problem:** 28px appears as a hardcoded value in several places. It fills the gap between `--sp-6` (24px) and `--sp-8` (32px).

**Fix — add to `:root` in able-v7.html:**

```css
:root {
  /* ... existing tokens ... */
  --sp-7: 28px;   /* add between --sp-6 and --sp-8 */
}
```

Then grep for hardcoded `28px` occurrences and replace with `var(--sp-7)`.

---

### P1-2: Tokenise admin.html font sizes

**Problem:** Admin CSS has `font-size: 28px`, `font-size: 10px`, `font-size: 11px`, `font-size: 13px`, `font-size: 9.5px` as hardcoded values. Inconsistent scale, hard to update.

**Fix — add to admin.html `:root`:**

```css
:root {
  /* ... existing admin tokens ... */
  --adm-text-xs:   10px;
  --adm-text-sm:   11px;
  --adm-text-base: 13px;
  --adm-text-lg:   15px;
  --adm-text-xl:   16px;
  --adm-text-stat: 28px;    /* stat card large number */
  --adm-text-section-label: 9.5px;  /* nav section headers */
}
```

Then replace hardcoded font-size values throughout admin.html with these tokens. This is a find-and-replace operation, not a redesign.

---

### P1-3: Tokenise admin.html border-radius values

**Problem:** Admin CSS has `border-radius: 12px`, `14px`, `100px`, `20px`, `10px` — none reference tokens. Hard to maintain a consistent radius style across admin.

**Fix — add to admin.html `:root`:**

```css
:root {
  /* ... existing admin tokens ... */
  --adm-r-sm:   8px;
  --adm-r-md:   12px;
  --adm-r-lg:   16px;
  --adm-r-pill: 100px;
}
```

Replace: `border-radius: 12px` → `var(--adm-r-md)`, `border-radius: 100px` → `var(--adm-r-pill)`, etc.

---

### P1-4: Define an icon standard

**Problem:** No icon specification exists. Inline SVG sizes and stroke-widths vary across files.

**Standard to adopt:**

```
Icon sizes (use one of these only — never ad-hoc):
  --icon-xs: 14px
  --icon-sm: 16px
  --icon-md: 20px    ← default
  --icon-lg: 24px
  --icon-xl: 32px

Stroke weight:
  1.5px for --icon-xs and --icon-sm
  2px for --icon-md, --icon-lg, --icon-xl

Visual language:
  Profile surface (able-v7.html): rounded stroke-linecap, rounded stroke-linejoin
  Admin surface: square stroke-linecap acceptable (more precise)
  Never: filled icons mixed with outlined icons in the same context
  Never: mix icon families within a file

Recommended source: Lucide Icons (MIT license, React-free, pure SVG)
```

Add to `:root` in both files:

```css
:root {
  --icon-xs: 14px;
  --icon-sm: 16px;
  --icon-md: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;
}
```

---

### P1-5: Add `--shadow-elevated` and `--shadow-floating` tokens

**Problem:** Only `--shadow-card` exists. Buttons, panels, modals, and dropdowns use hardcoded box-shadow values.

**Fix — add to each theme:**

```css
/* Dark theme additions */
[data-theme="dark"] {
  --shadow-card:      0 4px 28px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04);
  --shadow-elevated:  0 8px 40px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.04);   /* modals, panels */
  --shadow-floating:  0 16px 60px rgba(0,0,0,0.9);   /* sheets, dropdowns */
  --shadow-glow-acc:  0 8px 40px var(--color-accent-glow);  /* primary CTA */
}

/* Light theme additions */
[data-theme="light"] {
  --shadow-card:      0 2px 16px rgba(0,0,0,0.07);
  --shadow-elevated:  0 4px 24px rgba(0,0,0,0.12);
  --shadow-floating:  0 8px 40px rgba(0,0,0,0.16);
  --shadow-glow-acc:  0 8px 40px var(--color-accent-glow);
}

/* Glass theme additions */
[data-theme="glass"] {
  --shadow-card:      0 2px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.10);
  --shadow-elevated:  0 8px 32px rgba(0,0,0,0.4);
  --shadow-floating:  0 16px 60px rgba(0,0,0,0.5);
  --shadow-glow-acc:  0 8px 40px var(--color-accent-glow);
}

/* Contrast theme additions */
[data-theme="contrast"] {
  --shadow-card:      0 2px 16px rgba(0,0,0,0.8);
  --shadow-elevated:  0 4px 24px rgba(0,0,0,0.9);
  --shadow-floating:  0 8px 40px rgba(0,0,0,0.95);
  --shadow-glow-acc:  0 8px 40px var(--color-accent-glow);
}
```

---

### P1-6: Admin form inputs — shared token system

**Problem:** Admin form inputs have no shared spec. Field heights, border colours, focus states, and label styles are inconsistent across different admin sections.

**Target CSS (add to admin.html):**

```css
/* Admin form system */
.adm-label {
  display: block;
  font-size: var(--adm-text-xs, 10px);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dash-t2);
  margin-bottom: 6px;
}

.adm-input,
.adm-textarea,
.adm-select {
  width: 100%;
  min-height: 44px;
  padding: 10px 14px;
  background: var(--dash-field);
  border: 1px solid var(--dash-border);
  border-radius: 10px;
  font-family: var(--font);
  font-size: 14px;
  color: var(--dash-text);
  outline: none;
  transition: border-color 150ms, box-shadow 150ms;
}

.adm-input:focus,
.adm-textarea:focus,
.adm-select:focus {
  border-color: var(--dash-amber);
  box-shadow: 0 0 0 3px rgba(201,168,76,0.18);
}

.adm-input.error,
.adm-textarea.error {
  border-color: var(--dash-red);
}

.adm-helper {
  font-size: 11px;
  color: var(--dash-t3);
  margin-top: 5px;
}

.adm-error-msg {
  font-size: 11px;
  color: var(--dash-red);
  margin-top: 5px;
  display: none;
}
.adm-input.error ~ .adm-error-msg { display: block; }
```

---

### P1-7: Verify --r-card feel quadrant wiring covers all card types

**Problem:** The feel quadrant sets `--r-card` which overrides card radius — but the selector list in DESIGN-SPEC.md may not cover every card class added in future builds.

**Fix — update the feel selector in able-v7.html to be exhaustive:**

```css
[data-feel] .card,
[data-feel] .release-card,
[data-feel] .snap-card,
[data-feel] .event-card,
[data-feel] .merch-card,
[data-feel] .support-pack-card,
[data-feel] .rec-card,
[data-feel] .world-map-card,
[data-feel] .close-circle-card {
  border-radius: var(--r-card, var(--r-lg));
}
```

Add any new card types here when building them.

---

## P2 — Refinement, after launch

These are polish items that raise the ceiling but are not required for a confident launch.

---

### P2-1: Lazy-load vibe display fonts (not just Barlow Condensed eager)

**Problem:** All 7 vibe display fonts are currently declared in the initial `<link>` tag. This costs ~200ms load time on non-electronic/pop vibes.

**Fix:** Load DM Sans and Barlow Condensed eagerly (serve electronic and pop). Dynamically inject `<link>` for other display fonts only after `applyIdentity()` resolves the vibe:

```javascript
const VIBE_FONTS = {
  hiphop:   'Oswald:700',
  rnb:      'Cormorant+Garamond:600italic,600',
  indie:    'Space+Grotesk:700',
  acoustic: 'Lora:700',
};

function loadVibeFont(vibe) {
  if (!VIBE_FONTS[vibe]) return;  // electronic and pop already loaded
  const existing = document.querySelector(`[data-vibe-font="${vibe}"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.dataset.vibeFont = vibe;
  link.href = `https://fonts.googleapis.com/css2?family=${VIBE_FONTS[vibe]}&display=swap`;
  document.head.appendChild(link);
}
```

---

### P2-2: Cross-file shared token foundation (CSS @import or single root block)

**Problem:** Profile and admin have completely separate token systems. When the product is redesigned or rebranded, two files need updating in parallel.

**Option A (simpler):** Extract a `shared/tokens.css` file with the subset of tokens that apply to both surfaces:
```css
/* shared/tokens.css */
:root {
  --sp-1: 4px; ... --sp-16: 64px;   /* spacing */
  --ease-spring: ...; --ease-decel: ...;  /* easing */
  --dur-fast: 150ms; ...  /* durations */
}
```

Both files `@import "shared/tokens.css"` and define their surface-specific tokens locally.

**Option B (future, when bundler exists):** CSS custom property inheritance via `:root` layer in a single entry point.

This is a P2 refactor because the project currently has no build pipeline. Adding a shared import introduces a file dependency that needs to work in Netlify static hosting without a bundler — achievable, but test it first.

---

### P2-3: Admin sidebar responsive collapse

**Problem:** At ≤ 768px, the sidebar pushes main content off-screen. A collapsed/drawer version is needed for mobile admin access.

**Fix outline:**

```css
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 300ms var(--ease-spring);
    z-index: 1000;
  }
  .sidebar.open {
    transform: translateX(0);
    box-shadow: 8px 0 40px rgba(0,0,0,0.5);
  }
  .main {
    margin-left: 0;
  }
  .topbar {
    /* Show hamburger menu icon */
  }
}
```

Add a hamburger button to the topbar that triggers `sidebar.classList.toggle('open')`.

---

### P2-4: Define per-section fan-facing error/empty states

**Problem:** When a section has no data (no shows, no releases), fans currently see nothing. The copy for these states is defined at the architecture level ("hide the section") but not per-section with specific messaging.

These are the states needed:

| Section | Empty (fan view) | API failure |
|---|---|---|
| Music | Section hidden entirely | Show last cached data; if none, hide section |
| Shows | Section hidden entirely | Show last cached events; if none, hide section |
| Merch | Section hidden entirely | Show "Merch coming soon." copy if `merch.enabled` but no items |
| Support | Section hidden entirely | Degrade to manual packs if Stripe unavailable |

Rule: fans never see a broken UI. They see either content or nothing. The "nothing" state is a gracefully hidden section, not an error message.

---

### P2-5: Document `--color-state-gig` intentional fixed colour

**Add to SPEC.md and to the `:root` comment block in able-v7.html:**

```css
/* --color-state-gig is intentionally NOT accent-derived.
   Deep red #8b1e1e has consistent urgency signal regardless of artist accent.
   If it tracked the accent colour, an artist with a blue accent would lose the
   red urgency of "On tonight." The gig signal must be unambiguous. */
--color-state-gig: #8b1e1e;
```

---

### P2-6: Audit Quick Action pill tap targets

**Problem:** Pills are `border-radius: var(--r-pill)` with `padding: 8px 16px`. At 8px vertical padding with 13px font, total height is approximately 36–38px — below the 44px `--tap-min`.

**Fix:**

```css
.qa-pill {
  padding: 11px 16px;   /* 11+11 + 14px line-height ≈ 36px rendered. Need to verify on device. */
  min-height: var(--tap-min);
}
```

Or more robustly:

```css
.qa-pill {
  min-height: var(--tap-min);
  display: inline-flex;
  align-items: center;
}
```

`min-height` with `align-items: center` is the correct approach — it enlarges the tap target without affecting visual spacing.
