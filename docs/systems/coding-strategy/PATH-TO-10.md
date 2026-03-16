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
**Lines:** L44 (`:root` definition), L182, L184, L536, L617, L1288, and in JS at L3135 (`colour: '#888'`) and several other locations
**The bug:** `--dash-t3` is defined as `#888888` in `:root`. The correct value per the design system spec is `#777777`. Additionally, the value appears hardcoded inline in multiple places — bypassing the token entirely.
**Why P0:** Any future theme or contrast audit against WCAG 2.2 AA will fail on these values. The hardcoded references mean the token change alone does not fix the file.

**Fix:**
1. Change `--dash-t3: #888888` → `--dash-t3: #777777` in `:root` (L44)
2. Search `admin.html` for all instances of `#888`, `#888888`, and `color: '#888'` outside of CSS variable definitions — replace with `var(--dash-t3)` (CSS) or `getComputedStyle(document.documentElement).getPropertyValue('--dash-t3')` (JS, if dynamic colour is genuinely needed)
3. Also fix `--source-tt: #888888` → `--source-tt: #777777` if this is the same token (check design system spec)

**Verify:** After fix, grep `admin.html` for `#888` — no matches should remain outside of `:root` definitions.

---

### P0.2 — `admin.html` missing `prefers-reduced-motion`

**File:** `admin.html`
**Lines:** The blanket rule is absent from the entire file
**The bug:** All animations in the admin dashboard — counter animations, fan list stagger, gig countdown bar, stat delta transitions — play regardless of the user's reduced-motion preference. This affects users with vestibular disorders and is a WCAG 2.2 AA violation.
**Why P0:** This is a legal compliance issue in the UK and EU (Equality Act 2010 / EN 301 549). It also affects any artist with vestibular sensitivity who uses their own dashboard daily.

**Fix:**
Add immediately after the `*:focus-visible` rule in admin.html:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Verify:** In Playwright, evaluate `window.matchMedia('(prefers-reduced-motion: reduce)')` — force it to `true` and screenshot the fan list, stats section, and gig countdown bar. No movement should occur.

---

### P0.3 — OG image bug in `able-v7.html` (data: URIs not crawlable)

**File:** `able-v7.html`
**The bug:** The `og:image` meta tag is populated by JS with the artist's artwork. When artwork is a data: URI (inline SVG or base64 encoded image), crawlers (Facebook, Twitter, iMessage link preview) cannot fetch it. The OG image renders as blank in link previews.
**Why P0:** Every artist shares their profile link on Instagram and TikTok. A blank link preview is a direct conversion loss on every share.

**Fix options (in priority order):**
1. **Netlify function approach (preferred):** Create a `/functions/og-image` function that accepts a Supabase artwork URL and returns a properly formatted OG-compatible image. Write the function URL to `og:image`.
2. **Fallback image approach (interim):** If artwork is a data: URI, set `og:image` to a hosted fallback image (`https://ablemusic.co/og-default.png`) rather than leaving it blank.
3. **Document the limitation:** Until the function is built, add a code comment to the `setMeta('og-image', art)` call noting the data: URI limitation and that the Netlify function resolves it.

**Verify:** After fix, share a profile link on Twitter or use the Open Graph debugger at `developers.facebook.com/tools/debug/` — image should render correctly.

---

## P1 — Fix in the next build session

These are real quality issues that affect user experience or build agent reliability. They do not cause immediate user harm at the current scale but will compound as the codebase grows.

---

### P1.1 — Bare `localStorage.getItem()` calls without fallbacks

**Files:** All four active files
**The bug:** Several `localStorage.getItem()` calls return the raw value without a fallback. If storage is empty (new user, cleared storage, incognito) or the value is null, subsequent operations on the return value will throw or produce unexpected behaviour.

**Audit approach:**
```bash
grep -n "localStorage.getItem" able-v7.html | grep -v "||"
grep -n "localStorage.getItem" admin.html | grep -v "||"
grep -n "localStorage.getItem" start.html | grep -v "||"
grep -n "localStorage.getItem" landing.html | grep -v "||"
```

Every result from these greps is a defect. Fix by adding `|| fallback` or wrapping with `safeLS()`.

**Pattern to use:**
```js
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

### P1.2 — `able_profile` vs `able_v3_profile` key conflict in `start.html`

**File:** `start.html`
**Line:** L5163 (`const wizData = safeLS('able_profile', {})`)
**The bug:** `start.html` reads from the legacy key `able_profile` as a fallback. This key is not in the canonical list and predates the current data architecture. If an artist has old data under `able_profile` from an earlier session, the wizard may pick it up and behave unexpectedly.
**Why P1 not P0:** The fallback is wrapped in `safeLS()` — it fails gracefully. But it creates a canonical violation and a data migration risk.

**Fix:**
1. Determine if any active users have data in `able_profile` (check Supabase if applicable, or ask James)
2. If no active users: remove the `able_profile` fallback read entirely
3. If active users exist: write a one-time migration on wizard load that moves `able_profile` data to `able_v3_profile` and deletes the old key

**Verify:** After fix, grep `start.html` for `able_profile` — zero results.

---

### P1.3 — `able_wizard_draft` not in canonical key list

**File:** `start.html`
**The bug:** The wizard uses `able_wizard_draft` for session recovery, but this key is not in the canonical key list in `CONTEXT.md`. A build agent working from CONTEXT.md would not know this key exists.

**Fix:**
Add to the canonical key list in `CONTEXT.md`:
```
able_wizard_draft  — in-progress onboarding wizard state ({step, data, ts}) — TTL: 24 hours. Deleted on wizard completion.
```

**Verify:** CONTEXT.md canonical table includes the key. `start.html` key name matches exactly.

---

### P1.4 — Missing `rel="noopener noreferrer"` on external links in admin.html

**File:** `admin.html`
**The bug:** Several `target="_blank"` links in admin.html are missing `rel="noopener noreferrer"`. This is a security issue (tab-napping) and a lint violation.

**Audit approach:**
```bash
grep -n 'target="_blank"' admin.html | grep -v 'noopener'
```

**Fix:** Add `rel="noopener noreferrer"` to every result.

**Verify:** `grep -n 'target="_blank"' admin.html | grep -v 'noopener'` returns zero results.

---

### P1.5 — Font preloading missing in admin.html, start.html, landing.html

**Files:** `admin.html`, `start.html`, `landing.html`
**The bug:** Only `able-v7.html` uses `<link rel="preload" as="style">` for fonts. The other three files load fonts without preloading, which can cause FOUT (Flash of Unstyled Text) on first load, especially on slower connections.

**Fix:** Add font preloading to `admin.html`, `start.html`, `landing.html` matching the pattern in `able-v7.html`:
```html
<link rel="preload" as="style" href="[Google Fonts URL]">
<link rel="stylesheet" href="[Google Fonts URL]">
```

**Verify:** Lighthouse Performance score on each file — FOUT should not appear in filmstrip.

---

## P2 — Fix before public launch

These are quality improvements that do not block shipping to early users but must be resolved before marketing to a wider audience.

---

### P2.1 — Lighthouse audit — target 90+ on all 4 files

**Files:** All four
**Current state:** Not run. No baseline established.
**Target:** Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90 on mobile.

**How to run:**
```bash
# Using Playwright MCP in a build session:
# Navigate to file://[absolute-path]/able-v7.html
# Use browser_evaluate to inject and run Lighthouse
# Or: use Chrome DevTools Lighthouse tab manually
```

**What will likely fail:**
- Performance: missing service worker, large file size (able-v7.html 78kB), unoptimised font loading on admin/start/landing
- Accessibility: known gap in admin.html (`prefers-reduced-motion`, potentially missing aria-labels on some icon buttons)
- SEO: `able-v7.html` OG image bug (P0.3 above)

**Fix:** Resolve P0 and P1 items first. Then run Lighthouse. Fix systematically by category.

---

### P2.2 — Dead code audit on all four files

**Files:** All four, particularly `able-v7.html` (10,214 lines)
**The bug:** Files have grown organically. CSS classes may be defined but never referenced in HTML. JS functions may be defined but never called. This adds weight and creates confusion for build agents.

**How to audit:**
- CSS: use browser DevTools Coverage tab — identifies unreferenced CSS rules
- JS: search for function definitions, then check if any reference exists elsewhere in the file
- Or: use a static analysis tool in a Node script to parse the HTML and cross-reference

**What to expect:** 5–15% of CSS rules in large files are typically unreferenced. JS dead code is harder to find but worth checking in `able-v7.html` specifically.

**Fix:** Remove unreferenced CSS classes and unused JS functions. Commit separately as `refactor([file]): dead code removal`.

---

### P2.3 — Easing token name inconsistency

**Files:** `able-v7.html` uses `--ease-spring` / `--ease-decel`. `admin.html` uses `--spring` / `--ease`. Both are the same cubic-bezier values — different variable names.

**The problem:** A build agent asked to "use spring easing" in `admin.html` would look up `--ease-spring` (from the docs or from `able-v7.html`) and use a token that does not exist in `admin.html`. The animation would fall back to `ease` or be undefined.

**Options:**
1. **Standardise on `--ease-spring` / `--ease-decel`**: Update `admin.html` to use the v7 names. Run a full animation verification after.
2. **Document the discrepancy explicitly**: Add a comment in both files noting which names they use, and update DESIGN_SYSTEM_SPEC.md with the canonical names per file.

**Recommendation:** Option 2 now (low risk, immediate), Option 1 during a dedicated design system sprint (correct long-term). Either way, document it before the next build session.

---

### P2.4 — axe-core audit on all four files

**Files:** All four
**Current state:** Not run. Zero confidence in WCAG 2.2 AA compliance beyond what was manually added.

**How to run:**
```js
// In Playwright browser_evaluate:
const axe = await import('https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.0/axe.min.js');
const results = await axe.run();
console.log(results.violations);
```

**What to expect:**
- `admin.html`: likely violations on missing `prefers-reduced-motion` (not directly an axe violation but related), potentially missing role on interactive elements, potentially insufficient colour contrast on `--dash-t3: #888888`
- `able-v7.html`: likely passing on most checks given the aria-label coverage
- `start.html` / `landing.html`: likely minor violations — focus management on wizard screen transitions

**Fix:** Address all critical and serious violations before public launch. Moderate violations: document and plan.

---

### P2.5 — Service worker implementation

**Files:** All four (registered from `index.html` or a shared `sw.js`)
**Current state:** Referenced in build docs and product spec as planned. Not confirmed implemented.
**The bug:** Without a service worker, ABLE profiles do not load offline. An artist sharing their profile link at a gig where the venue has poor connectivity gets a broken page.

**Minimal viable service worker:**
```js
// sw.js — cache-first for static assets, network-first for profile data
const CACHE = 'able-v1';
const STATIC = ['/', '/able-v7.html', '/admin.html', '/shared/able.js', '/shared/style.css'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC))));
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));
```

**Fix:** Build minimal service worker. Register from the `<head>` of all four files. Verify offline load in Playwright by disabling network.

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
