# ABLE — Coding Standards
**The rules every line of code written for ABLE must follow.**
**A build agent reading this document must be able to write code that is indistinguishable from the existing codebase.**
**Authority: supersedes any prior working rule for coding decisions. Complements DESIGN_SYSTEM_SPEC.md (visual tokens) and MICRO_INTERACTIONS_SPEC.md (animation patterns).**
**Date: 2026-03-16**

---

> These are not guidelines. They are rules. A line of code that violates them is a defect, not a style preference. When in doubt, look at `able-v7.html` — it is the reference implementation.

---

## CSS Rules

### 1. Colours via tokens — always

**Rule:** Every colour in the codebase is a CSS custom property. No hardcoded hex values outside of `:root` or `@media (prefers-color-scheme)` blocks.

```css
/* CORRECT */
color: var(--color-text);
background: var(--color-card);
border-color: var(--color-accent);

/* WRONG — never do this */
color: #ccddef;
background: #12152a;
border-color: #e07b3a;
```

**The only exception:** CSS custom property definitions themselves (inside `:root`), and SVG data URIs where CSS variables cannot be interpolated. In SVG data URIs, use a comment documenting which token value the hardcoded colour represents.

**Why this matters:** A single hardcoded colour in a component makes it impossible to switch themes without hunting down every instance. The token system exists precisely to prevent this.

### 2. Token reference names

**Profile page (`able-v7.html`):**
```css
/* Colour tokens */
--color-bg         /* base background */
--color-surface    /* one step up from bg */
--color-card       /* card backgrounds */
--color-raised     /* raised element (e.g. active pill) */
--color-text       /* primary text */
--color-text-2     /* secondary text */
--color-text-3     /* tertiary / hint text */
--color-border     /* border colour */
--color-accent     /* artist-set accent */
--color-accent-rgb /* accent as R,G,B for rgba() */
--color-accent-glow /* rgba(accent, 0.30) */
--color-accent-soft /* rgba(accent, 0.10) */
--color-on-accent  /* text colour on accent background */

/* Animation tokens */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94)
--ease-accel:    cubic-bezier(0.55, 0, 1, 0.45)
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0)

/* Duration tokens */
--dur-instant: 80ms
--dur-fast:    150ms
--dur-mid:     250ms
--dur-slow:    400ms
--dur-xslow:   600ms

/* Spacing tokens */
--sp-1: 4px  --sp-2: 8px   --sp-3: 12px  --sp-4: 16px
--sp-5: 20px --sp-6: 24px  --sp-8: 32px  --sp-10: 40px
--sp-12: 48px --sp-16: 64px
```

**Dashboard (`admin.html`):**
```css
/* Note: admin uses --spring and --ease (not --ease-spring/--ease-decel) */
/* This inconsistency is documented — do not "fix" it in one file without updating the other */
--bg:       #0f1624
--bg-mid:   #141d2e
--card:     rgba(138,180,206,.06)
--card-hv:  rgba(138,180,206,.10)
--border:   rgba(138,180,206,.10)
--text:     #ccddef
--t2:       rgba(204,221,239,.58)
--t3:       rgba(204,221,239,.52)  /* note: NOT rgba */
--acc:      #c9a84c  /* admin amber — not the artist accent */
--acc-rgb:  201,168,76
--spring:   cubic-bezier(0.34,1.56,0.64,1)
--ease:     cubic-bezier(0.25,0.46,0.45,0.94)

/* Dashboard light theme tokens */
--dash-bg:     #e8e4dd
--dash-card:   #ffffff
--dash-border: #d4cfc8
--dash-shell:  #1a1a2e
--dash-field:  #f5f2ee
--dash-amber:  #f4b942
--dash-green:  #1e9650
--dash-red:    #c04030
--dash-text:   #1a1a2e
--dash-t2:     #555555
--dash-t3:     #777777   /* P0 BUG: currently #888888 — must be fixed */
```

### 3. Mobile-first breakpoints

**Rule:** Write styles for mobile (375px) first. Add desktop enhancements with `@media (min-width: 480px)` or `@media (min-width: 768px)`. Never use `max-width` media queries except for print or admin sidebar collapse.

```css
/* CORRECT */
.card { padding: 16px; }
@media (min-width: 480px) { .card { padding: 24px; } }

/* WRONG */
.card { padding: 24px; }
@media (max-width: 479px) { .card { padding: 16px; } }
```

### 4. Touch action on interactive elements

**Rule:** `touch-action: manipulation` must be set on all interactive elements to remove the 300ms tap delay on iOS. The `*` selector in `able-v7.html` sets this globally. Do not override it to `auto` on any interactive element.

```css
/* able-v7.html sets this globally — do not override */
* { touch-action: manipulation; }

/* If you need to enable panning on a scrollable container */
.scroll-container { touch-action: pan-y; } /* allowed for scroll-only containers */
```

### 5. Focus rings

**Rule:** All interactive elements use the glow pattern — not the default browser outline. The pattern varies slightly per file:

```css
/* able-v7.html pattern */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-accent);
}

/* admin.html pattern */
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
```

Never use `outline: none` without providing a `:focus-visible` replacement. Never use `outline: none` on `<a>` or `<button>` elements with a static class that has no focus state.

### 6. Animation — CSS only

**Rule:** Animate only `opacity` and `transform` properties. Never animate `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `background-color`, or `color` directly. These trigger layout and paint.

```css
/* CORRECT */
.card { transform: translateY(0); opacity: 1; transition: transform var(--dur-mid) var(--ease-decel), opacity var(--dur-mid) var(--ease-decel); }
.card.entering { transform: translateY(12px); opacity: 0; }

/* WRONG */
.card { height: auto; transition: height 300ms; }
.card.collapsed { height: 0; }
```

**Exception:** `max-height` transitions are acceptable for accordion/collapsible patterns where `transform` is not viable, but must use a known max value (not `max-height: 9999px` — this produces a broken easing curve).

### 7. Reduced motion

**Rule:** Every animation must be disabled under `prefers-reduced-motion: reduce`. Use the blanket rule plus targeted exceptions where a static fallback must be visible:

```css
/* Blanket rule — must exist in every file */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Note: `animation: none !important` is acceptable as an alternative to the duration approach. Both patterns exist in the codebase — do not mix them in a single file.

### 8. No `!important` except for motion override

`!important` is banned everywhere except:
- `@media (prefers-reduced-motion: reduce)` animation/transition overrides
- `[hidden] { display: none !important; }` — the canonical hidden pattern

Never use `!important` to fix specificity conflicts. Fix the specificity instead.

---

## JavaScript Rules

### 1. Parse-check every JS block after editing

**Rule:** After modifying any `<script>` block, run:
```bash
node -e "new Function(jsBlock)"
```
Replace `jsBlock` with the extracted JS content. A parse error here means the page is broken for every user. This takes 5 seconds and prevents 100% of syntax error regressions.

### 2. All localStorage reads have defaults

**Rule:** Never read from localStorage without a fallback. The user may have cleared their storage, be on a new device, or have corrupted data.

```js
// CORRECT — string values
const slug = localStorage.getItem('able_slug') || 'artist';

// CORRECT — JSON values
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || 'null') || {};

// WRONG — bare reads
const profile = JSON.parse(localStorage.getItem('able_v3_profile')); // throws if null
const slug = localStorage.getItem('able_slug'); // returns null, then errors downstream
```

### 3. JSON.parse always inside try/catch

**Rule:** `JSON.parse` can throw if the stored string is malformed (it happens — browser crashes, encoding issues, partial writes). Every `JSON.parse` must be wrapped:

```js
// CORRECT
function safeLS(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

// Use consistently:
const profile = safeLS('able_v3_profile', {});
const fans = safeLS('able_fans', []);

// WRONG
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
// This throws if the stored value is corrupted JSON
```

### 4. Event listeners after DOMContentLoaded

**Rule:** All event listener attachments happen inside a `DOMContentLoaded` handler or after the DOM is confirmed ready. Do not attach event listeners on script elements in the `<head>`.

```js
// CORRECT
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fan-form').addEventListener('submit', handleFanSubmit);
});

// ALSO CORRECT — script at bottom of body with defer
// <script defer src="..."> or <script> at end of </body>
```

### 5. Debounce all input handlers

**Rule:** Any function called on `input` or `keyup` events must be debounced at 300ms minimum. This prevents excessive localStorage writes and eventual Supabase calls on every keystroke.

```js
function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// Usage
const debouncedSave = debounce(saveProfile, 300);
bioInput.addEventListener('input', e => debouncedSave(e.target.value));
```

This utility function must be defined near the top of every file that uses input handlers. Do not inline the setTimeout pattern repeatedly.

### 6. No innerHTML with unescaped user content

**Rule:** Never set `innerHTML` to a string that includes any value from localStorage, user input, or API response without escaping. XSS is real even in single-user apps (stored XSS via profile import).

```js
// CORRECT — escape user-controlled strings
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
element.innerHTML = `<span>${esc(profile.name)}</span>`;

// ALSO CORRECT — use textContent for plain strings
element.textContent = profile.name;

// WRONG
element.innerHTML = `<span>${profile.name}</span>`; // XSS if name contains <script>
```

**Exception:** HTML from a verified template literal where all variable parts are escaped. The template itself is safe; only interpolated values need escaping.

### 7. No document.write, no eval

**Rule:** `document.write()` and `eval()` are banned. No exceptions.

### 8. No synchronous XMLHttpRequest

**Rule:** All network requests use `fetch()` with async/await or `.then()`. No synchronous XHR. No `XMLHttpRequest` with `false` as the third argument.

### 9. Canonical localStorage keys

**Rule:** Every `localStorage.getItem` and `localStorage.setItem` call must use a key from the canonical list in CONTEXT.md. Do not invent new keys without:
1. Adding them to the canonical list in CONTEXT.md
2. Documenting what they store and which files use them

**Current canonical keys:**
```
able_v3_profile   — artist profile object
able_fans         — fan sign-ups [{email, ts, source}]
able_clicks       — CTA tap events [{label, type, ts, source}]
able_views        — page view events [{ts, source}]
able_gig_expires  — unix timestamp (gig mode expiry)
able_shows        — shows list [{venue, date, doorsTime, ticketUrl, featured}]
able_dismissed_nudges — dismissed nudge IDs ['presave-cta', ...]
able_starred_fans — starred fan emails ['fan@example.com', ...]
able_wizard_draft — in-progress wizard state (TTL: 24 hours)
```

**Do not use `able_profile` (legacy key).** Read from `able_v3_profile` only. The one legacy fallback in `start.html` is documented as a known gap pending removal.

### 10. All mutations call syncProfile()

**Rule:** Every write to `able_v3_profile` must go through `syncProfile()` (or the equivalent named function in the current file). Never call `localStorage.setItem('able_v3_profile', ...)` directly outside of the sync function. This ensures a single call-site for the eventual Supabase migration.

### 11. Fan data FIFO cap

**Rule:** `able_clicks` and `able_views` arrays must be capped at 200 records. When writing a new record, if the array length exceeds 200, shift the oldest entry:

```js
function appendEvent(key, event) {
  const arr = safeLS(key, []);
  arr.push(event);
  if (arr.length > 200) arr.shift();
  localStorage.setItem(key, JSON.stringify(arr));
}
```

---

## Animation Rules

### 1. Spring physics for press and reveal

**Rule:** Button press responses, bottom sheet open/close, modal appear, overlay fade — all use spring easing (`--ease-spring` / `--spring`).

```css
/* Button press */
.btn:active { transform: scale(0.97); transition: transform var(--dur-instant) var(--ease-spring); }

/* Sheet open */
.sheet { transform: translateY(100%); transition: transform var(--dur-slow) var(--ease-spring); }
.sheet.open { transform: translateY(0); }
```

### 2. Decel easing for scroll entrances and tab switches

**Rule:** Elements entering from scroll, tab switch content, and page-level transitions use decel easing (`--ease-decel` / `--ease`).

```css
.section { opacity: 0; transform: translateY(16px); }
.section.visible { opacity: 1; transform: translateY(0); transition: opacity var(--dur-slow) var(--ease-decel), transform var(--dur-slow) var(--ease-decel); }
```

### 3. Duration limits

**Rule:** No animation duration exceeds 600ms (`--dur-xslow`) except documented page-state transitions. No animation shorter than 80ms (`--dur-instant`) — imperceptible animations waste developer time.

| Type | Duration | Easing |
|---|---|---|
| Button press response | 80ms | `--ease-spring` |
| Icon / pill swap | 150ms | `--ease-standard` |
| Card reveal / hover | 250ms | `--ease-decel` |
| Sheet / modal open | 400ms | `--ease-spring` |
| Scroll entrance | 400ms | `--ease-decel` |
| Page state transition | up to 600ms | `--ease-spring` |
| Done screen / celebration | up to 600ms per beat | `--ease-spring` |

### 4. Sequential stagger maximum

**Rule:** Stagger between sequential elements (platform pills, list items, vibe cards) must not exceed 50ms. Long stagger chains (>8 items) should use a formula that compresses later items:

```js
const delay = Math.min(i * 50, 300) + 'ms'; // caps at 300ms for 6th+ item
```

### 5. prefers-reduced-motion is not optional

**Rule:** The blanket `prefers-reduced-motion` rule (see CSS §7) must be present in every file. Individual animations that have a meaningful static state (e.g. a progress bar that should show its final position) must also be handled explicitly.

---

## Data Layer Rules

### 1. Canonical key usage (see JS §9)

### 2. Always read with fallback (see JS §2 + §3)

### 3. FIFO cap on event arrays (see JS §11)

### 4. Schema versioning

**Rule:** If the schema of `able_v3_profile` changes in a way that breaks backward compatibility, add a `schema_version` field and handle migration on read:

```js
function migrateProfile(p) {
  if (!p.schema_version || p.schema_version < 2) {
    // migrate from v1 to v2
    p.schema_version = 2;
    // ... migration logic
  }
  return p;
}
```

Do not silently break old profiles. An artist may not have opened the admin panel in months.

---

## HTML Rules

### 1. Lazy loading below the fold

**Rule:** All `<img>` tags that are not above the fold must have `loading="lazy"`. The hero image (first image visible on load) must NOT have `loading="lazy"` — it is eagerly loaded.

```html
<!-- Hero image — no lazy loading -->
<img src="artwork.jpg" alt="Album artwork">

<!-- Below-fold images -->
<img src="release-thumb.jpg" alt="Release thumbnail" loading="lazy">
```

### 2. External links — always noopener noreferrer

**Rule:** Every `target="_blank"` link must include `rel="noopener noreferrer"`. No exceptions.

```html
<!-- CORRECT -->
<a href="https://spotify.com/..." target="_blank" rel="noopener noreferrer">Listen on Spotify</a>

<!-- WRONG -->
<a href="https://spotify.com/..." target="_blank">Listen on Spotify</a>
```

### 3. Icon-only buttons — always aria-label

**Rule:** Every button or interactive element that contains only an icon (SVG, emoji, or background-image) must have an `aria-label` describing its action. No exceptions.

```html
<!-- CORRECT -->
<button aria-label="Close menu">
  <svg ...>...</svg>
</button>

<!-- WRONG -->
<button>
  <svg ...>...</svg>
</button>
```

### 4. Form inputs — always autocomplete

**Rule:** Every `<input>` must have an `autocomplete` attribute. Use the correct semantic value or `autocomplete="off"` if autofill would be harmful.

```html
<input type="email" autocomplete="email" placeholder="your@email.com">
<input type="text" id="artistName" autocomplete="name" placeholder="Your artist name">
<input type="text" id="slug" autocomplete="off" placeholder="yourname">
```

### 5. Semantic HTML

**Rule:** Use semantic elements where they apply:
- `<nav>` for navigation (tab bar, sidebar)
- `<main>` for the primary content area
- `<section>` for distinct page sections (with a heading inside)
- `<article>` for self-contained content (a release card, a fan entry)
- `<footer>` for page footer content
- `<button>` for actions, `<a>` for navigation — never `<div onclick>`

### 6. Decorative vs meaningful SVGs

**Rule:**
- Decorative SVGs (icons, illustrations not conveying unique information): `aria-hidden="true"`
- Meaningful SVGs (charts, maps, logos where the brand name matters): `role="img" aria-label="[description]"`

```html
<!-- Decorative -->
<svg aria-hidden="true" ...>...</svg>

<!-- Meaningful -->
<svg role="img" aria-label="ABLE logo" ...>...</svg>
```

---

## File-specific notes

### able-v7.html
- Reference implementation for CSS token quality and JS pattern quality
- Uses `--ease-spring` / `--ease-decel` / `--dur-*` naming (not `--spring` / `--ease`)
- Four themes via `data-theme` attribute on `<html>`
- `applyIdentity()` and `applyDerivedTokens()` — called on profile load, not on DOM ready
- `syncProfile()` — the single write path to `able_v3_profile`

### admin.html
- Uses `--spring` / `--ease` naming (not `--ease-spring` / `--ease-decel`) — do not change without updating all references
- Dashboard has its own colour palette (`--dash-*`) — separate from artist profile tokens
- Known P0 bug: `--dash-t3: #888888` → must be `#777777`
- `prefers-reduced-motion` missing — P0 accessibility gap

### start.html
- Onboarding wizard — uses a subset of profile tokens
- `able_wizard_draft` for session recovery (24-hour TTL)
- After wizard completes: writes to `able_v3_profile`, deletes `able_wizard_draft`
- Legacy: reads `able_profile` as fallback — remove once safe

### landing.html
- Marketing page — dark theme only (intentional)
- Minimal JS — primarily static HTML + CSS
- Demo phone interaction uses profile token system for live preview

---

## The non-negotiable rule

If in doubt about any decision, look at the equivalent pattern in `able-v7.html`. It is the reference implementation. It was built to spec. Match it.
