# ABLE — Design System: Path to 10/10
**Created: 2026-03-16 | References: DESIGN_SYSTEM_SPEC.md**

> This document exists for one reason: to close the 0.5-point gap between the current 9.5/10 design system and a true 10. Three gaps, three fixes, one checklist.

---

## Current State: 9.5/10

The design system is excellent. What makes it so:

- Complete dual-surface architecture (profile vs dashboard) — separation is deliberate and maintained
- Single accent variable (`--color-accent`) driving the entire artist identity — most powerful pattern in the codebase
- 7 vibe presets with associated fonts, producing genuine genre differentiation
- Consistent easing tokens (`--spring`, `--ease`) used across all animation work
- Strong accessibility baseline: glow focus ring specced, tap targets documented, `prefers-reduced-motion` in the rules
- Grain texture applied at correct opacity on both surfaces
- Shadow system differentiated by surface (dark/premium vs light/admin)

**The 0.5 gap is not a design problem. It is a file-structure and consistency problem.**

---

## Gap 1 — No shared token file

### The problem

All CSS custom properties live inside `<style>` blocks in individual HTML files. The same token (`--spring`) is copy-pasted into `able-v7.html`, `admin.html`, `start.html`, and `landing.html`. When a value changes, it must be changed in 4 places. This has already caused drift (see Gap 2).

### The fix: `shared/tokens.css`

Create `/Users/jamescuthbert/Desktop/ABLE  MERGED/shared/tokens.css` with the following exact contents:

```css
/* ABLE — Shared Design Tokens
   Single source of truth for all CSS custom properties.
   Import into every page: <link rel="stylesheet" href="/shared/tokens.css">
   Last updated: 2026-03-16
*/

/* ─── EASING ─────────────────────────────────────────────────────── */
:root {
  --spring:       cubic-bezier(0.34, 1.56, 0.64, 1);    /* entrances with overshoot */
  --ease:         cubic-bezier(0.25, 0.46, 0.45, 0.94); /* exits, smooth motion */
  --ease-linear:  linear;                                 /* progress bars, timers */
  --ease-snap:    cubic-bezier(0.68, -0.6, 0.32, 1.6);  /* strong spring for tab indicator */
}

/* ─── SPACING ────────────────────────────────────────────────────── */
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-9:  40px;
  --space-10: 48px;
  --space-11: 56px;  /* minimum tap target */
  --space-12: 64px;
  --space-13: 80px;
}

/* ─── BORDER RADIUS ──────────────────────────────────────────────── */
:root {
  --radius-xs:   6px;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   20px;
  --radius-full: 100px;
}

/* ─── SURFACE 1 — Artist Profile ─────────────────────────────────── */
:root {
  --color-bg:       #0d0e1a;
  --color-card:     #12152a;
  --color-card-2:   #191d35;
  --color-border:   rgba(255,255,255,.08);
  --color-border-2: rgba(255,255,255,.14);
  --color-text:     #e0e6f0;
  --color-text-2:   rgba(224,230,240,.65);
  --color-text-3:   rgba(224,230,240,.45);
  --color-accent:   #e05242;  /* default — overridden per artist */

  --shadow-card:    0 1px 0 rgba(255,255,255,.04);
  --shadow-lift:    0 8px 32px rgba(0,0,0,.4);
  --shadow-glow:    0 0 0 3px rgba(var(--color-accent-rgb), 0.25);
}

/* ─── SURFACE 1 THEMES ───────────────────────────────────────────── */
[data-theme="dark"] {
  --color-bg:   #0d0e1a;
  --color-card: #12152a;
}
[data-theme="light"] {
  --color-bg:     #f0ede8;
  --color-card:   #ffffff;
  --color-text:   #1a1a2e;
  --color-text-2: rgba(26,26,46,.65);
  --color-text-3: rgba(26,26,46,.45);
  --color-border: rgba(26,26,46,.1);
}
[data-theme="glass"] {
  --color-bg:   transparent;
  --color-card: rgba(255,255,255,.06);
}
[data-theme="contrast"] {
  --color-bg:     #000000;
  --color-card:   #111111;
  --color-text:   #ffffff;
  --color-border: rgba(255,255,255,.2);
}

/* ─── SURFACE 2 — Admin Dashboard ───────────────────────────────── */
:root {
  --dash-bg:     #e8e4dd;
  --dash-card:   #ffffff;
  --dash-border: #d4cfc8;
  --dash-shell:  #1a1a2e;
  --dash-field:  #f5f2ee;
  --dash-amber:  #f4b942;
  --dash-green:  #1e9650;
  --dash-red:    #c04030;
  --dash-text:   #1a1a2e;
  --dash-t2:     #555555;
  --dash-t3:     #777777;  /* WCAG AA — 4.6:1 on white */

  --shadow-admin-card: 0 1px 4px rgba(0,0,0,.06);
  --shadow-admin-lift: 0 4px 16px rgba(0,0,0,.1);
}

/* ─── SOURCE BADGE COLOURS (admin + fan.html) ───────────────────── */
:root {
  --source-ig:     #e1306c;
  --source-sp:     #1ed760;
  --source-tt:     #888888;  /* TikTok neutral — intentionally not --dash-t3 */
  --source-direct: #999999;
}

/* ─── FOCUS RING — SURFACE 1 ────────────────────────────────────── */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--color-bg),
    0 0 0 4px var(--color-accent),
    0 0 0 6px rgba(var(--color-accent-rgb), 0.25);
}

/* ─── FOCUS RING — SURFACE 2 (admin — overrides above) ─────────── */
/* Apply to admin.html via: <link> after tokens.css, or data-surface="admin" */
[data-surface="admin"] *:focus-visible,
.admin-surface *:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--dash-bg),
    0 0 0 4px var(--dash-amber),
    0 0 0 6px rgba(244,185,66,0.25);
}
```

**How to use:** Each page adds `<link rel="stylesheet" href="/shared/tokens.css">` as the first stylesheet. Page-specific overrides come after. The `<style>` block in each HTML file keeps only what is not in tokens.css.

Note: `--source-tt: #888888` is intentional and distinct from `--dash-t3: #777777`. TikTok's neutral grey is a brand-neutral choice; it is not muted text and does not need WCAG compliance on a white background.

---

## Gap 2 — `--dash-t3` value drift

### The problem

`--dash-t3` is defined as `#777777` in DESIGN_SYSTEM_SPEC.md (WCAG AA compliant — 4.6:1 on white). The actual value in `admin.html` line 44 is `#888888`, which is lighter and produces a 3.5:1 contrast ratio — failing WCAG AA for body text.

### Audit results

Every file in the active codebase that contains `#888888` or `--dash-t3`:

| File | Line(s) | Issue |
|---|---|---|
| `admin.html` | 44 | `--dash-t3: #888888` — the root definition is wrong |
| `admin.html` | 1288 | `color: var(--dash-t3, #888)` — fallback also wrong |
| `shared/style.css` | 101 | `--ink3: #888888` inside `[data-theme="minimal"]` — this is a separate token system for landing/start, not `--dash-t3`. **Do not change.** |
| `design-references/music-companies.html` | — | Design reference file — ignore, not production code |

### The fix

In `admin.html`, change one line:

```css
/* Line 44 — change this: */
--dash-t3: #888888;

/* To this: */
--dash-t3: #777777;
```

Then change the fallback on line 1288:

```css
/* Change this: */
color: var(--dash-t3, #888);

/* To this: */
color: var(--dash-t3, #777);
```

When `shared/tokens.css` is created and imported, the token definition moves there and the hardcoded line in admin.html is removed entirely.

**Verify after change:** Open admin.html in browser, inspect any `.field-label` element. Computed color should be `rgb(119, 119, 119)` (#777777), not `rgb(136, 136, 136)`.

---

## Gap 3 — Focus ring inconsistency

### The problem

- `able-v7.html`: uses glow ring pattern (correct) — `box-shadow: 0 0 0 2px bg, 0 0 0 4px accent, 0 0 0 6px rgba(accent, 0.25)` ✅
- `admin.html` line 58: uses flat outline — `outline: 2px solid var(--acc); outline-offset: 2px` ✗
- `start.html` line 156–159: uses flat outline — `outline: 2px solid var(--acc); outline-offset: 3px` ✗
- `landing.html` line 287: uses flat outline — `outline: 2px solid var(--accent)` ✗

All four active pages should use the glow pattern. The glow ring is not decorative — it provides 3 layers of contrast (gap, colour, soft halo) that work on all backgrounds including the glass theme.

### The exact CSS for admin.html

Replace the current focus rule in `admin.html` (around line 57–58):

```css
/* Remove: */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }

/* Replace with: */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--dash-bg),
    0 0 0 4px var(--dash-amber),
    0 0 0 6px rgba(244,185,66,0.25);
}
```

### The exact CSS for start.html

Replace the current focus rule in `start.html` (around line 156–161):

```css
/* Remove: */
button:focus-visible, a:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--acc);
  outline-offset: 3px;
  border-radius: 8px;
}
:focus:not(:focus-visible) { outline: none; }

/* Replace with: */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--bg, #12152a),
    0 0 0 4px var(--acc),
    0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

### The exact CSS for landing.html

Replace the focus rule in `landing.html` (around line 287–288):

```css
/* Remove: */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }
:focus:not(:focus-visible) { outline: none; }

/* Replace with: */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--page, #0d0e1a),
    0 0 0 4px var(--accent),
    0 0 0 6px rgba(var(--accent-rgb, 224,82,66), 0.25);
}
```

---

## Build Checklist — 5 Actions to 10/10

When all 5 are done, the design system reaches 10/10.

- [ ] **1. Create `shared/tokens.css`** — use the exact contents from Gap 1 above. Save to `/shared/tokens.css`.
- [ ] **2. Fix `--dash-t3` in `admin.html`** — change line 44 from `#888888` to `#777777`, and the fallback on line 1288 from `#888` to `#777`. Verify computed colour in DevTools.
- [ ] **3. Replace focus ring in `admin.html`** — swap flat `outline: 2px solid` for the 3-layer glow pattern using `--dash-bg` and `--dash-amber`. Exact CSS above.
- [ ] **4. Replace focus ring in `start.html`** — same pattern using `--bg` and `--acc`. Exact CSS above.
- [ ] **5. Replace focus ring in `landing.html`** — same pattern using `--page` and `--accent`. Exact CSS above.

---

## Confirmed Score Ceiling

| State | Score | What it means |
|---|---|---|
| All 5 checklist items done | **10/10** | Token definitions correct, consistent, accessible |
| `shared/tokens.css` created and imported | **9.8/10** | Single source of truth — drift prevented |
| Full Figma component library linked to token values | **10/10** | Design–code parity (future work) |
| Design token JSON export (`tokens.json`) | **10/10** | Future-proof for React/native (future work) |

The practical ceiling without design tooling is 10/10. A Figma library and JSON export would be bonus infrastructure, not prerequisites for a 10.
