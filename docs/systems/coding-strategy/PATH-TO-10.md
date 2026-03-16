# ABLE — Code Quality: Path to 10
**Prioritised list of every code quality improvement needed across all 4 active files.**
**Ordered by impact × urgency. P0 = must fix before shipping. P1 = fix in next session. P2 = fix before public launch.**
**Date: 2026-03-16**

---

> This document is the actionable companion to ANALYSIS.md. ANALYSIS.md records the honest scores. This document tells you exactly what to do next, in what order, to reach 10/10.

---

## P0 — Fix before any code is shipped

These are defects. A user will encounter them. Some are legal compliance issues. Fix all P0s before opening any PR.

---

### P0.1 — `--dash-t3` hardcoded `#888888` in admin.html

**File:** `admin.html`
**Lines:** L44 (`:root` definition) and wherever `#888`, `#888888`, `color: '#888'` appear outside CSS variable definitions.
**The bug:** `--dash-t3` is defined as `#888888` in `:root`. The correct value per the design system spec is `#777777`. Additionally, the value appears hardcoded inline in multiple places — bypassing the token entirely.
**Why P0:** Any future theme or contrast audit against WCAG 2.2 AA will fail on these values. The hardcoded references mean the token change alone does not fix the file.

**Exact fix — step 1:** Change the `:root` definition:
```css
/* Find: */
--dash-t3: #888888;

/* Replace with: */
--dash-t3: #777777;
```

**Exact fix — step 2:** Find every instance of `#888`, `#888888`, and `colour: '#888'` or `color: '#888'` outside of CSS custom property definitions. Replace:
- In CSS: replace with `var(--dash-t3)`
- In JS (dynamic colour values): replace with `getComputedStyle(document.documentElement).getPropertyValue('--dash-t3').trim()`

**Audit command to run after fix:**
```bash
# Should return zero results (outside of :root definitions):
grep -n "#888" admin.html | grep -v "^\s*--"
```

**Verify:** Zero matches for `#888` outside of `:root` variable definitions.

---

### P0.2 — `admin.html` missing `prefers-reduced-motion`

**File:** `admin.html`
**Lines:** Entirely absent from the file — the blanket rule does not exist anywhere.
**The bug:** All animations in the admin dashboard — counter animations, fan list stagger, gig countdown bar, stat delta transitions — play regardless of the user's reduced-motion preference. This affects users with vestibular disorders and is a WCAG 2.2 AA violation.
**Why P0:** This is a legal compliance issue in the UK and EU (Equality Act 2010 / EN 301 549).

**Exact fix — add immediately after the `*:focus-visible` rule in admin.html:**

```css
/* ─── REDUCED MOTION ─────────────────────────────────────────────────────── */
/* WCAG 2.2 AA — SC 2.3.3 (AAA) and SC 1.4.3. Must be present in every file. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:       0.01ms !important;
    animation-iteration-count: 1     !important;
    transition-duration:      0.01ms !important;
    scroll-behavior:          auto   !important;
  }
}
```

**Animations that must be confirmed as silenced under this rule (spot-check each in DevTools):**
- Counter animation on stats section (the number counting up from 0)
- Fan list stagger entrance (`@keyframes` entrance on fan rows)
- Gig countdown progress bar animation
- Stat delta tooltip/badge animation
- Bottom sheet open/close transitions
- Nudge toast entrance animation
- Any `@keyframes` defined in admin.html (audit: grep `@keyframes admin.html`)

**Verify:** In Playwright, use `page.emulateMedia({ reducedMotion: 'reduce' })` before navigating. Screenshot the fan list, stats section, and gig countdown bar. No movement should occur. All elements should be in their final rendered state.

---

### P0.3 — OG image bug in `able-v7.html` (data: URIs not crawlable)

**File:** `able-v7.html`
**The bug:** The `og:image` meta tag is populated by JS with the artist's artwork. When artwork is a `data:` URI (inline SVG or base64 encoded image from a local file upload), crawlers (Facebook, Twitter, iMessage, WhatsApp) cannot fetch it. The OG image renders as blank in link previews.
**Why P0:** Every artist shares their profile link on Instagram and TikTok. A blank link preview is a direct conversion loss on every share. This is covered in detail in docs/systems/seo-og/PATH-TO-10.md.

**Fix:** In `injectSEO()`, add a URL scheme check before assigning the OG image:
```javascript
const FALLBACK_OG = 'https://ablemusic.co/og-fallback.jpg'
const ogImage = (artUrl.startsWith('https://') || artUrl.startsWith('http://'))
  ? artUrl
  : FALLBACK_OG
setMeta('og-image', ogImage)
setMeta('tw-image', ogImage)
```

Full spec in `docs/systems/seo-og/PATH-TO-10.md` P0.1.

---

## P1 — Fix in the next build session

These are real quality issues that affect user experience or build agent reliability. They do not cause immediate user harm at the current scale but will compound as the codebase grows.

---

### P1.1 — Bare `localStorage.getItem()` calls without fallbacks

**Files:** All four active files
**The bug:** Several `localStorage.getItem()` calls return the raw value without a fallback. If storage is empty (new user, cleared storage, incognito) or the value is null, subsequent operations on the return value will throw or produce unexpected behaviour.

**Audit command:**
```bash
grep -n "localStorage.getItem" able-v7.html | grep -v "||"
grep -n "localStorage.getItem" admin.html   | grep -v "||"
grep -n "localStorage.getItem" start.html   | grep -v "||"
grep -n "localStorage.getItem" landing.html | grep -v "||"
```

Every result from these greps is a defect. Fix by adding `|| fallback` or wrapping with `safeLS()`.

**Pattern to use:**
```javascript
// For strings
const slug = localStorage.getItem('able_slug') || '';

// For JSON objects
function safeLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}
```

**Verify:** Test all four pages in a fresh incognito window. No console errors. All pages load with empty/default states.

---

### P1.2 — `able_wizard_draft` not in canonical key list

**File:** `start.html` (uses `sessionStorage.setItem('able_wizard_draft', ...)`)
**The bug:** The wizard uses `able_wizard_draft` for session recovery, but this key is not in the canonical key list in `CONTEXT.md`. Additionally, it uses `sessionStorage` (not `localStorage`) — this is correct but must be documented.

**Fix:**
Add to the canonical key list in `CONTEXT.md`:
```
| `able_wizard_draft` | Wizard in-progress state `{step, data}` — **sessionStorage** (not localStorage). Session-scoped TTL. Deleted on wizard completion. | start.html | start.html |
```

**Verify:** CONTEXT.md canonical table includes the key with the correct storage type noted.

---

### P1.3 — `--ease-spring` vs `--spring` token inconsistency

**Files:** `able-v7.html` uses `--ease-spring` / `--ease-decel`. `admin.html` uses `--spring` / `--ease`.

**The problem:** Same cubic-bezier values, different variable names. A build agent asked to "use spring easing" in `admin.html` would look up `--ease-spring` (from the docs or from `able-v7.html`) and use a token that does not exist in `admin.html`. The animation would fall back to `ease`.

**Canonical answer: `--ease-spring` is the canonical name per DESIGN_SYSTEM_SPEC.md and SPEC.md.**

**Interim fix (do now):**
- Add to SPEC.md token reference table, under `admin.html` section: `/* Note: admin.html uses --spring (not --ease-spring) and --ease (not --ease-decel). DO NOT use able-v7.html token names in admin.html. */`
- Update this PATH-TO-10.md with the resolution status.

**Long-term fix (dedicated sprint):**
1. Rename `--spring` → `--ease-spring` in `admin.html` `:root`
2. Rename `--ease` → `--ease-decel` in `admin.html` `:root`
3. Find-and-replace all `var(--spring)` → `var(--ease-spring)` and `var(--ease)` → `var(--ease-decel)` in `admin.html`
4. Run Playwright animation verification after

Until renamed: **every build session must begin with: check which easing token names are in `:root` of the target file. Use only those names.**

---

### P1.4 — Parse-check command for project root

**The one-liner that must be run after any JS edit to a file:**

```bash
# For admin.html — extract the script block and check it parses:
node -e "
const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const match = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
if (match) match.forEach((s, i) => {
  try { new Function(s.replace(/<\/?script[^>]*>/g, '')); }
  catch(e) { console.error('Block', i, ':', e.message); process.exit(1); }
});
console.log('All script blocks parse OK');
"
```

Run from the project root (`/Users/jamescuthbert/Desktop/ABLE  MERGED/`). Replace `admin.html` with the target file name. Exit code 0 = all blocks parse. Exit code 1 = syntax error found — fix before committing.

**Shorthand per CLAUDE.md working rule #1:** After every JS edit, run the relevant version of this command.

---

### P1.5 — Missing `rel="noopener noreferrer"` on external links in admin.html

**File:** `admin.html`
**The bug:** Several `target="_blank"` links in admin.html are missing `rel="noopener noreferrer"`. This is a security issue (tab-napping).

**Audit command:**
```bash
grep -n 'target="_blank"' admin.html | grep -v 'noopener'
```

**Fix:** Add `rel="noopener noreferrer"` to every result.

---

## P2 — Fix before public launch

These are quality improvements that do not block shipping to early users but must be resolved before marketing to a wider audience.

---

### P2.1 — Lighthouse audit — target 90+ on all 4 files

**Files:** All four
**Current state:** Not run. No baseline established.
**Target:** Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90 on mobile.

**What will likely fail:**
- Accessibility: `admin.html` prefers-reduced-motion (P0.2 above fixes this), potentially missing aria-labels on some icon buttons
- SEO: `able-v7.html` OG image bug (P0.3 above fixes this)
- Performance: missing font preloading on admin/start/landing

**Fix:** Resolve P0 and P1 items first. Then run Lighthouse. Fix systematically by category.

---

### P2.2 — Font preloading missing in admin.html, start.html, landing.html

**Files:** `admin.html`, `start.html`, `landing.html`
**The bug:** Only `able-v7.html` uses `<link rel="preload" as="style">` for fonts. The other three files load fonts without preloading, causing FOUT on first load.

**Fix:** Add font preloading matching the pattern in `able-v7.html`:
```html
<link rel="preload" as="style" href="[Google Fonts URL]">
<link rel="stylesheet" href="[Google Fonts URL]">
```

---

### P2.3 — axe-core audit on all four files

**Current state:** Not run. Zero confidence in WCAG 2.2 AA compliance beyond what was manually added.

**How to run in Playwright:**
```javascript
// In browser_evaluate:
const results = await new Promise(resolve => {
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.0/axe.min.js';
  s.onload = () => axe.run().then(resolve);
  document.head.appendChild(s);
});
console.log(JSON.stringify(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }))));
```

**What to expect:**
- `admin.html`: likely violations on `#888` colour contrast (fixed by P0.1), potentially missing roles on interactive elements
- `able-v7.html`: likely passing on most checks given the aria-label coverage
- `start.html` / `landing.html`: minor violations — focus management on wizard transitions

---

### P2.4 — Dead code audit on all four files

Files have grown organically. Use browser DevTools Coverage tab to identify unreferenced CSS rules. Commit separately as `refactor([file]): dead code removal`.

---

## How to track progress

After each P0 fix:
1. Commit with message `fix([file]): [description of what was fixed]`
2. Re-run the relevant Playwright verification check
3. Update the item above with "FIXED — SHA [commit hash]"

After all P0s are fixed:
1. Re-run the full ANALYSIS.md assessment on the changed files
2. Update the scores
3. Confirm P1 list is still accurate before starting P1 work

After all P1s are fixed:
1. Run Lighthouse on all four files (P2.1) — this tells you what the P2 list should prioritise
2. Update this document with Lighthouse findings

---

## Score milestones

| Milestone | Score |
|---|---|
| Now (before P0) | 7/10 |
| After P0.1 + P0.2 (WCAG fixes) | 8/10 |
| After P1 (easing token consistency + parse-check discipline) | 8.5/10 → **9/10** |
| After P2.1 (Lighthouse audit run and issues fixed) | 9.5/10 |
| After P2.3 (axe-core audit + fixes) | **10/10** |
