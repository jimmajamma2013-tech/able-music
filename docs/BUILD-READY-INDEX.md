# ABLE — Build-Ready Index
**Created: 2026-03-16 | Read this before writing a single line of code.**

> A build agent starting work on ABLE reads this document first. It answers: what do I build, in what order, what bugs do I fix before I start, and what do I read for each file.

---

## Section 1: Build Order

### P0 — Pre-build bug fixes (do these first, before anything else)

These are live bugs in the current codebase. Fixing them takes less than an hour. Leaving them means you are building on a broken foundation.

See Section 4 for the full bug inventory with exact file + line references.

| # | File | Issue | Time |
|---|---|---|---|
| 1 | admin.html | WCAG AA fail: `--dash-t3` and `--source-tt` set to `#888888` | 5 min |
| 2 | admin.html | Hardcoded `#888` fallback values at L182, L184, L536, L617 | 10 min |
| 3 | able-v7.html | `<meta name="description">` has no `id` attribute — JS cannot update it | 2 min |
| 4 | able-v7.html | OG image broken for file-picker uploads (data:/blob: URIs are not crawlable) | 20 min |
| 5 | admin.html | `able_profile` / `able_v3_profile` key conflict — wizard users see empty admin | 15 min |
| 6 | Multiple | Focus ring: admin.html uses flat `outline: 2px` — spec requires glow pattern | 10 min |

---

### P1 — able-v7.html build pass

**Goal:** Bring artist public profile from current state to spec-complete.
**Read first:** `docs/pages/profile/SPEC.md`, `docs/pages/profile/PATH-TO-10.md`, `docs/pages/profile/COPY.md`
**Design system:** `docs/systems/DESIGN_SYSTEM_SPEC.md`
**Micro-interactions:** `docs/systems/MICRO_INTERACTIONS_SPEC.md` (check STATUS.md for what is already implemented)
**Copy rules:** `docs/systems/copy/SPEC.md` §2.5 (able-v7.html section)
**Data layer:** `docs/systems/data-architecture/SPEC.md` Part 1

Key gaps from PATH-TO-10:
- Empty state render gating (fan-facing: hide sections with no content)
- OG meta updates (dynamic per artist name and bio)
- SEO: static `<meta name="description">` never updates — fix per `docs/systems/seo-og/SPEC.md`
- Tier gate system for Pro features: `docs/systems/tier-gates/SPEC.md`

---

### P2 — admin.html build pass

**Goal:** Bring artist dashboard to spec-complete.
**Read first:** `docs/pages/admin/SPEC.md`, `docs/pages/admin/PATH-TO-10.md`, `docs/pages/admin/COPY.md`
**Design system:** `docs/systems/DESIGN_SYSTEM_SPEC.md` Section 3 (Surface 2 — Dashboard tokens)
**Copy rules:** `docs/systems/copy/SPEC.md` §2.5 (admin.html section)
**Tier gates:** `docs/systems/tier-gates/SPEC.md`

Key gaps:
- P0 bugs 1–2 (WCAG `#888` tokens)
- P0 bug 5 (`able_profile` → `able_v3_profile` migration on first load)
- P0 bug 6 (focus ring glow pattern)
- Upgrade moments: verify all 5 from `docs/v6/core/V6_BUILD_AUTHORITY.md` §9.1 are wired
- Broadcasts page (Pro tier gate with blurred preview)

---

### P3 — start.html build pass

**Goal:** Onboarding wizard spec-complete.
**Read first:** `docs/pages/onboarding/DESIGN-SPEC.md`, `docs/pages/onboarding/PATH-TO-10.md`, `docs/pages/onboarding/COPY.md`
**Copy rules:** `docs/systems/copy/SPEC.md` §2.5 (start.html section)
**Data layer:** `docs/systems/data-architecture/SPEC.md` — output key is `able_v3_profile`

Key gaps:
- Verify wizard output writes to `able_v3_profile` (not `able_profile` which is the legacy key)
- Done screen must read exactly: "Your page is live." (no variants — `docs/systems/copy/SPEC.md` §2.5)
- Live preview phone must update in real time as artist types

---

### P4 — landing.html build pass

**Goal:** Marketing page spec-complete.
**Read first:** `docs/pages/landing/DESIGN-SPEC.md`, `docs/pages/landing/PATH-TO-10.md`, `docs/pages/landing/COPY.md`
**Copy rules:** `docs/systems/copy/SPEC.md` §2.5 (landing.html section)

Key gaps:
- Interactive proof demo phone: must show real embeds (Spotify widget, YouTube thumb, event card) — not placeholder screenshots
- "Most popular" badge must not appear on any pricing tier
- FAQ section title is "Questions." (single word, period)
- Primary CTA is "Your page is free →" (not "Get started")

---

### P5 — fan.html build pass

**Goal:** Fan dashboard spec-complete.
**Read first:** `docs/pages/fan/SPEC.md`, `docs/pages/fan/PATH-TO-10.md`, `docs/pages/fan/COPY.md`
**Copy rules:** `docs/systems/copy/SPEC.md` §2.5 (fan.html section)
**Cross-page journeys:** `docs/systems/CROSS_PAGE_JOURNEYS.md`

Key gaps (currently at 5.85/10, strategy complete):
- Following feed (Today / This week)
- Discover section (Emerging / Connected / By vibe / Just dropped)
- Near me (geo-aware)
- All copy must use "Following" not "Feed", "Me" not "Profile"
- Empty state: "Nothing new today." (not "You're all caught up!")

---

## Section 2: What to Read Before Building Each File

### able-v7.html

| What | File |
|---|---|
| Design spec | `docs/pages/profile/SPEC.md` |
| Gap analysis | `docs/pages/profile/PATH-TO-10.md` |
| Copy rules | `docs/pages/profile/COPY.md` + `docs/systems/copy/SPEC.md` §2.5 |
| Visual system | `docs/systems/DESIGN_SYSTEM_SPEC.md` §2 (Surface 1 tokens) |
| Micro-interactions | `docs/systems/MICRO_INTERACTIONS_SPEC.md` |
| Data layer | `docs/systems/data-architecture/SPEC.md` |
| SEO/OG | `docs/systems/seo-og/SPEC.md` |
| Tier gates | `docs/systems/tier-gates/SPEC.md` |
| Authority | `docs/v6/core/V6_BUILD_AUTHORITY.md` (sections 3–8) |
| Bugs documented | P0 bugs 3–4 above |

### admin.html

| What | File |
|---|---|
| Design spec | `docs/pages/admin/SPEC.md` |
| Gap analysis | `docs/pages/admin/PATH-TO-10.md` |
| Copy rules | `docs/pages/admin/COPY.md` + `docs/systems/copy/SPEC.md` §2.5 |
| Visual system | `docs/systems/DESIGN_SYSTEM_SPEC.md` §3 (Surface 2 tokens) |
| Tier gates | `docs/systems/tier-gates/SPEC.md` |
| Upgrade triggers | `docs/v6/core/V6_BUILD_AUTHORITY.md` §9 |
| Data layer | `docs/systems/data-architecture/SPEC.md` |
| Bugs documented | P0 bugs 1–2, 5–6 above |

### start.html

| What | File |
|---|---|
| Design spec | `docs/pages/onboarding/DESIGN-SPEC.md` |
| Gap analysis | `docs/pages/onboarding/PATH-TO-10.md` |
| Copy rules | `docs/pages/onboarding/COPY.md` + `docs/systems/copy/SPEC.md` §2.5 |
| Visual system | `docs/systems/DESIGN_SYSTEM_SPEC.md` §2 (same surface as profile) |
| Data output | Writes to `able_v3_profile` (not `able_profile`) |
| Conduit principle | `docs/v6/core/V6_BUILD_AUTHORITY.md` §17.4 |

### landing.html

| What | File |
|---|---|
| Design spec | `docs/pages/landing/DESIGN-SPEC.md` |
| Gap analysis | `docs/pages/landing/PATH-TO-10.md` |
| Copy rules | `docs/pages/landing/COPY.md` + `docs/systems/copy/SPEC.md` §2.5 |
| Pricing authority | `docs/v6/core/V6_BUILD_AUTHORITY.md` §2.3 (£0/£9/£19/£49, no "Most popular") |
| Auth model | Magic link only (`docs/v6/core/V6_BUILD_AUTHORITY.md` §2.7) |

### fan.html

| What | File |
|---|---|
| Design spec | `docs/pages/fan/SPEC.md` |
| Gap analysis | `docs/pages/fan/PATH-TO-10.md` |
| Copy rules | `docs/pages/fan/COPY.md` + `docs/systems/copy/SPEC.md` §2.5 |
| Cross-page journey | `docs/systems/CROSS_PAGE_JOURNEYS.md` |
| Data source | `able_fans` written by able-v7.html; `writeFanFollow()` seeds fan.html |

---

## Section 3: System Specs That Affect All Pages

These specs are not page-specific. Any change to the design system, interactions, copy, or data layer must be checked here first.

| System | Spec file | What it governs |
|---|---|---|
| Design tokens | `docs/systems/DESIGN_SYSTEM_SPEC.md` | All CSS variables, typography, spacing, theme tokens, vibe system, radius multipliers |
| Micro-interactions | `docs/systems/MICRO_INTERACTIONS_SPEC.md` | All animation specs (IDs A1–I7), timing, easing, reduced-motion rules, 60fps law |
| Copy system | `docs/systems/copy/SPEC.md` | Voice register by context, all banned phrases, per-page rules, before/after examples |
| Data architecture | `docs/systems/data-architecture/SPEC.md` | localStorage key registry, TypeScript interfaces, Supabase schema, RLS policies |
| SEO + OG cards | `docs/systems/seo-og/SPEC.md` | OG image generation, meta description update pattern, structured data |
| Cross-page journeys | `docs/systems/CROSS_PAGE_JOURNEYS.md` | How data flows between pages, fan sign-up pipe, wizard → admin → profile chain |
| Tier gates | `docs/systems/tier-gates/SPEC.md` | What is gated at each tier, gold lock pattern, upgrade copy |
| Email system | `docs/systems/email/SPEC.md` | Fan confirmation, double opt-in, GDPR, broadcast architecture |
| Spotify import | `docs/systems/spotify-import/SPEC.md` | What data is available from Spotify API (monthly listeners NOT available) |

**Design decisions that are locked** (do not revisit without a specific reason):
- Auth model: magic link only — no Google/Apple OAuth (`V6_BUILD_AUTHORITY.md` §2.7)
- Backend: Supabase for v1 — no Cloudflare D1 (`V6_BUILD_AUTHORITY.md` §2.12)
- Themes: exactly four — Dark / Light / Glass / Contrast. "Mid" does not exist. (`V6_BUILD_AUTHORITY.md` §2.1)
- Body font surface 1: DM Sans. Surface 2 (admin): Plus Jakarta Sans. Not interchangeable. (`V6_BUILD_AUTHORITY.md` §2.11)
- Performance budget: LCP ≤ 2.5s, HTML ≤ 340kB gzipped (`V6_BUILD_AUTHORITY.md` §4)

---

## Section 4: Known Bugs Inventory

Fix all P0 bugs before starting any feature work.

---

### Bug 1 — admin.html: `--dash-t3` WCAG AA fail

**File:** `admin.html`
**Lines:** L44, L49
**What's wrong:** `--dash-t3: #888888` and `--source-tt: #888888` fail WCAG AA contrast ratio (4.5:1) against the `#09090f` admin background. Computed ratio ≈ 3.9:1. This is a release gate.
**Exact fix:**
```css
--dash-t3:    #777777;   /* was #888888 — now passes WCAG AA on #09090f bg */
--source-tt:  #777777;   /* same */
```
**Note:** `--dash-t3` is used by `.field-label`, `.field-hint`, `.snap-handle`, `.gig-hint`, and ~20 other selectors. One variable change fixes all uses.

---

### Bug 2 — admin.html: hardcoded `#888` fallback values

**File:** `admin.html`
**Lines:** L182 (`.stat-label`), L184 (`.stat-delta`), L536, L617 (`.arc-node.done .arc-label`)
**What's wrong:** These rules use hardcoded `color: #888` instead of the token. If the token is fixed, these remain broken.
**Exact fix:** Replace each `color: #888` (and `color:#888`) with `color: var(--dash-t3)`.

---

### Bug 3 — able-v7.html: `<meta name="description">` never updated by JS

**File:** `able-v7.html`
**Line:** L21
**What's wrong:** `<meta name="description" content="Artist profile powered by ABLE">` has no `id` attribute. The JS that updates OG tags cannot target it. Every artist's page has identical static meta description — bad for SEO and shares the wrong copy ("powered by ABLE" is explicitly banned).
**Exact fix:**
```html
<meta name="description" id="meta-description" content="Music, shows, and more — direct from the artist.">
```
Then in the JS profile render function, add:
```javascript
const metaDesc = document.getElementById('meta-description');
if (metaDesc && profile.name) {
  metaDesc.setAttribute('content', `Music, shows, and more — direct from ${profile.name}.`);
}
```
Default per `docs/systems/copy/SPEC.md` §2.5: "Music, shows, and more — direct from [Artist Name]."

---

### Bug 4 — able-v7.html: OG image broken for file-picker uploads

**File:** `able-v7.html`
**What's wrong:** When an artist uploads artwork via the file picker, the artwork is stored as a `data:` URI or `blob:` URL. These are set as the `og:image` content, but social platform crawlers (Twitter, Facebook, WhatsApp, Slack) cannot fetch `data:` or `blob:` URLs. The OG image appears blank when the artist's page is shared.
**Fix strategy:** Do not set `og:image` to a data:/blob: URI. Options in priority order:
1. Upload to Supabase Storage, use the public CDN URL → this is the right fix when backend is live
2. Until backend: use an ABLE-hosted default artwork image as og:image fallback (e.g. `https://ablemusic.co/og-default.jpg`)
3. If the profile has no uploaded artwork: leave `og:image` empty rather than setting a broken value
**Interim fix for localStorage-only:**
```javascript
// In the OG update function, only set og:image if it's a real URL, not data:/blob:
const artworkUrl = profile.topCard?.artworkUrl || '';
const ogImageEl = document.getElementById('og-image');
if (ogImageEl && artworkUrl && !artworkUrl.startsWith('data:') && !artworkUrl.startsWith('blob:')) {
  ogImageEl.setAttribute('content', artworkUrl);
}
```

---

### Bug 5 — admin.html: `able_profile` / `able_v3_profile` key conflict

**What's wrong:** The `start.html` wizard writes to the `able_profile` key (legacy). The admin dashboard reads from `able_v3_profile`. A new user who goes through the wizard and then opens admin sees an empty profile — their wizard data is in a different key.
**File affected:** `admin.html`
**Where to fix:** In the `initAdmin()` or equivalent load function in `admin.html`, on `DOMContentLoaded`, merge both keys:
```javascript
function migrateProfileKey() {
  const v3 = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  const legacy = JSON.parse(localStorage.getItem('able_profile') || '{}');
  // If v3 is empty but legacy has data, migrate it
  if (!v3.name && legacy.name) {
    const merged = { ...legacy, ...v3 };  // v3 wins on conflicts
    localStorage.setItem('able_v3_profile', JSON.stringify(merged));
    localStorage.removeItem('able_profile');  // clean up legacy key
  }
}
// Call before any profile reads
migrateProfileKey();
```
**Note:** `admin.html` already has `const wizData = safeLS('able_profile', {}); // wizard key fallback` at L5163 but this is a one-off fallback, not a migration. The migration must happen at load time so the entire admin reads from the correct key.

---

### Bug 6 — Focus ring pattern: admin.html uses flat outline

**Files affected:** `admin.html`, `start.html`, `landing.html`
**What's wrong:** `admin.html` uses `outline: 2px solid var(--acc); outline-offset: 2px` for `:focus-visible`. The design system spec (`docs/systems/DESIGN_SYSTEM_SPEC.md`) defines a glow pattern using `box-shadow` for ABLE's focus style on primary interactive elements.
**Spec pattern:**
```css
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg, #09090f), 0 0 0 4px var(--acc, #f4b942);
}
```
This creates a double-ring (background colour gap + accent outer ring) that is more visible, more consistent with the design system, and still WCAG compliant.

---

### Bug 7 — Spotify import function: STATUS.md lists as built, but is a stub

**File:** `netlify/functions/spotify-import.js`
**What's wrong:** The function file exists but has not been tested against the live Spotify API. The spec (`docs/systems/spotify-import/SPEC.md`) documents that Spotify monthly listener counts are NOT available via the public API without special access. Any UI that expects monthly listener count will receive nothing. Verify the function handles missing fields gracefully before wiring it to the onboarding wizard.
**Do not build UI** that treats monthly listeners as a required field. It is optional, manually-entered only.

---

## Section 5: Playwright Smoke Test Checklist

Run this before any deploy. Takes approximately 15 minutes. Requires the Playwright MCP (`npx @playwright/mcp@latest`).

**Before running:** open able-v7.html, admin.html, start.html, and landing.html in the browser.

### able-v7.html (public profile)
- [ ] 1. Page loads without console errors
- [ ] 2. Artist name renders in Barlow Condensed at hero scale
- [ ] 3. Hero CTA (primary) taps correctly, logs a click event to `able_clicks`
- [ ] 4. Fan sign-up: enter email, submit — spinner → checkmark → echo text appears
- [ ] 5. Fan sign-up: enter invalid email — error message appears after 400ms delay (E11)
- [ ] 6. All four themes cycle correctly via theme switcher — no broken text or invisible elements
- [ ] 7. Platform pills render in 2-column grid, not as a horizontal scroll list
- [ ] 8. Music section: if no releases, section is hidden (not visible as empty shell)
- [ ] 9. Section headers have accent border-top and fade in on scroll
- [ ] 10. Page has no horizontal scroll at 375px viewport width
- [ ] 11. OG meta: `og:description` contains the artist's name (not static "Artist profile powered by ABLE")
- [ ] 12. Glass theme: background image is required — test with an artwork image uploaded

### admin.html (artist dashboard)
- [ ] 13. Campaign HQ shows current page state correctly
- [ ] 14. Fan list renders all stored fans from `able_fans`
- [ ] 15. Toast fires after any save operation — copy reads "Saved." (not "Saved successfully!")
- [ ] 16. Gig mode toggle activates countdown bar
- [ ] 17. Pro-gated features show blurred preview with upgrade copy (not a hard lock with no context)
- [ ] 18. Stats counters animate on first load only (session-flagged, G14)

### start.html (onboarding wizard)
- [ ] 19. Completing the wizard writes data to `able_v3_profile` in localStorage (not `able_profile`)
- [ ] 20. Done screen copy reads exactly: "Your page is live." (period, no "You're all set!")

---

## Section 6: Commit Message Conventions

ABLE uses descriptive, prefixed commit messages. Follow this format precisely.

### Prefix guide

| Prefix | When to use |
|---|---|
| `feat:` | New feature or section that did not exist before |
| `fix:` | Bug fix — something broken is now working |
| `copy:` | Copy-only change — no layout or logic changed |
| `style:` | Visual/CSS change — no logic changed |
| `refactor:` | Code restructure — behaviour unchanged |
| `a11y:` | Accessibility-only fix (WCAG, aria, focus) |
| `perf:` | Performance improvement |
| `docs:` | Documentation only (no code changes) |
| `chore:` | Config, tooling, housekeeping |

### Format

```
<prefix>(<scope>): <what changed in plain English>
```

**Scope** is the file or system: `admin`, `profile`, `start`, `landing`, `fan`, `design-system`, `copy-system`, `data`, `netlify`.

### Examples (good)

```
fix(admin): migrate able_profile → able_v3_profile on first load
feat(profile): empty state render gating — hide sections with no content from fans
copy(profile): fan sign-up default copy — "Stay close." heading, "I'm in" button
a11y(admin): --dash-t3 token #888888 → #777777 — WCAG AA pass on admin bg
fix(profile): og:image skip data:/blob: URIs — not crawlable by social platforms
style(admin): focus ring glow pattern — outline replaced with double box-shadow
feat(start): wizard output → able_v3_profile (was able_profile — legacy key removed)
```

### Examples (bad — do not write these)

```
update stuff
fixed things
WIP
design updates
various fixes
```

### Commit granularity rule

One logical change per commit. A logical change is one thing that could be reverted in isolation without breaking anything else. If your commit message requires the word "and" to describe what changed, split it into two commits.
