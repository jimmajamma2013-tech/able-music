# ABLE v6 — Build Session Start
**Created: 2026-03-13 | Authority: docs/v6/core/V6_BUILD_AUTHORITY.md**

This is the build session prompt. Drop this into a fresh Claude Code session to begin building `able-v6.html`.

---

## Tool stack (pre-installed — use these throughout the build)

| Tool | Version | Purpose | Command |
|---|---|---|---|
| **Playwright MCP** | 0.0.68 | Browser control, JS eval, viewport screenshots | `mcp__playwright__*` tools |
| **agent-browser** | installed | Quick screenshots, full-page captures | `AGENT_BROWSER_NATIVE=1 ~/.npm-global/bin/agent-browser` |
| **browser-sync** | 3.0.4 | Live reload dev server + real-phone LAN sync | `~/.npm-global/bin/browser-sync start --server --files "*.html" --port 3000` |
| **axe-core CLI** | 4.11.1 | WCAG 2.2 AA accessibility audit | `~/.npm-global/bin/axe http://localhost:3000/able-v6.html --tags wcag22aa` |
| **Lighthouse** | 12.8.2 | LCP / INP / CLS performance measurement | `~/.npm-global/bin/lighthouse http://localhost:3000/able-v6.html --output html --output-path report.html --chrome-flags="--headless=new"` |
| **html-w3c-validator** | 1.7.0 | W3C HTML validation | `~/.npm-global/bin/html-w3c-validator --urls http://localhost:3000/able-v6.html` |
| **Netlify CLI** | installed | Instant preview deploys | `~/.npm-global/bin/netlify deploy --dir . --no-open` |
| **Node** | 18.20.8 | JS parse checking | `node -e "new Function(src)"` |
| **gzip size check** | built-in | File size gate (≤340 kB) | `gzip -c able-v6.html \| wc -c \| awk '{printf "%.1f KB\n", $1/1024}'` |
| **screencapture** | macOS | Screenshot open browser window | `screencapture -x /tmp/preview.png` |

> **Note on Lighthouse + Node 18:** Lighthouse 12 works on Node 18 but INP measurement is more accurate on Node 22+. For the build, use Chrome DevTools Lighthouse tab (DevTools → Lighthouse → Mobile → Analyse) against `http://localhost:3000` for full INP data. CLI Lighthouse is fine for LCP/CLS/overall score.

---

## Pre-build start routine

Run this before Checkpoint 1 to confirm the environment is clean:

```bash
# 1. Confirm tools available
~/.npm-global/bin/browser-sync --version   # should print 3.0.4
~/.npm-global/bin/axe --version            # should print 4.11.1
~/.npm-global/bin/lighthouse --version     # should print 12.8.2
~/.npm-global/bin/html-w3c-validator --version  # should print 1.7.0

# 2. Start dev server (keep running in background throughout build)
~/.npm-global/bin/browser-sync start --server --files "*.html" --port 3000 &

# 3. Confirm server is up
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/able-v6.html
# Should print 200 (or 404 if file doesn't exist yet — fine at start)
```

---

## Checkpoint verification command

Run at the end of **every checkpoint** before signalling complete:

```bash
# Stop server if running, serve current file, then audit
~/.npm-global/bin/axe http://localhost:3000/able-v6.html --tags wcag22aa && \
~/.npm-global/bin/html-w3c-validator --urls http://localhost:3000/able-v6.html && \
gzip -c able-v6.html | wc -c | awk '{printf "File size: %.1f KB (limit 340 KB)\n", $1/1024}'
```

For **Checkpoint 6 (A11y + perf pass)** also run:
```bash
~/.npm-global/bin/lighthouse http://localhost:3000/able-v6.html \
  --output html --output-path lighthouse-report.html \
  --chrome-flags="--headless=new" && open lighthouse-report.html
```

---

## Before you write a single line of code

Read these files in full, in this order:

1. `docs/v6/00_AUTHORITY_ORDER.md` — authority chain and settled decisions
2. `docs/v6/core/V6_BUILD_AUTHORITY.md` — final law on every resolved decision
3. `docs/v6/core/VISUAL_SYSTEM.md` — fonts, accent values, all 7 vibes
4. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — copy register and banned phrases

After reading, confirm with this exact string:

> **V6 authority confirmed. Canonical rules accepted. Building able-v6.html.**

Do not begin Checkpoint 1 until you have output that string.

---

## What you are building

**Target file:** `able-v6.html` — single file, no bundler, no framework, no npm.
**Target device:** Mid-range Android (Pixel 5a). Optimise for that. Desktop is bonus.
**Target width:** 375px primary. 430px secondary.
**File size:** ≤ 340 kB gzipped.
**Core Web Vitals (release gates, not advisory):** LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.10.
**Accessibility:** WCAG 2.2 AA. Not advisory.

This is the artist public profile — the fan-facing page. Artists configure it via admin (Phase 2). For Phase 1, all configuration comes from `localStorage` key `able_v3_profile`.

---

## Build checkpoints

Execute these sequentially. Do not move to the next checkpoint until the current one is complete and verified. Signal completion explicitly at the end of each checkpoint.

---

### Checkpoint 1 — Shell + design system tokens

**Deliverables:**
- Valid HTML5 document structure
- All CSS custom properties defined (see §3 of V6_BUILD_AUTHORITY.md)
- `applyDerivedTokens()` function: computes `--r-sm/md/lg/xl` from `--r-mult`
- `applyVibe(vibe)` function: sets all vibe-specific tokens from the 7-vibe table
- All 4 themes switchable via `data-theme` attribute: `dark | light | glass | contrast`
- Google Fonts loaded: DM Sans (body), Barlow Condensed (display), + vibe display fonts
- No visible UI yet — shell only

**Vibe display font CDN load strategy:** Lazy-load non-default vibe fonts. Default vibe = indie. Load indie fonts eagerly; load others on `applyVibe()` call only.

**Signal:** `// CHECKPOINT 1 COMPLETE — Shell + tokens`

---

### Checkpoint 2 — Hero + state machine

**Deliverables:**
- `computeState(profile)` function from §6.3 of V6_BUILD_AUTHORITY.md
- Hero section renders correctly in all 4 states: `profile | pre-release | live | gig`
- Countdown timer (pre-release state): live, accurate, no layout shift
- Top card (live state): video embed or artwork, aspect ratio locked
- Artist name in Barlow Condensed, weight + letter-spacing from active vibe
- Hero CTA zone: max 2 buttons, primary = accent fill, secondary = ghost
- State machine auto-switches on `releaseDate` correctly
- `extractAmbientColour(imgEl)` function: 4×4 canvas downsample → `--color-ambient`

**Signal:** `// CHECKPOINT 2 COMPLETE — Hero + state machine`

---

### Checkpoint 3 — CTA architecture

**Deliverables:**
- Quick Action pills: max 4 narrow / 6 wide, overflow toggle (`+N more`)
- Pills rendered from `profile.platforms` array
- Section Actions: max 2 per section
- Global dedupe enforced: same URL cannot appear in more than one zone; hero wins
- Click tracking: every CTA tap fires `trackClick(label, type, source)` → `able_clicks`
- All tap targets ≥ 44px

**Signal:** `// CHECKPOINT 3 COMPLETE — CTA architecture`

---

### Checkpoint 4 — Main content flow

Render all sections in this order. Each section only renders if the profile has data for it.

1. **Music section** — latest release card (artwork, title, type, track list or track count). Platform pill row below.
2. **Events section** — upcoming shows list. Venue, city, date, time, ticket URL. Sold-out badge. Only future events.
3. **Merch section** — grid of merch items. Image, title, price, badge.
4. **Support section** — support packs. Emoji, label, description, price, CTA.
5. **Fan capture** — email sign-up. Fires after hero, bio, and pills (screenful 3 minimum). Double opt-in flow: optimistic UI → confirmation email in background.
6. **Snap cards** — published cards only, in sort_order.
7. **"Made with ABLE" footer** — Free tier only. `var(--color-text-3)`. Linked to `ablemusic.co`.

**Signal:** `// CHECKPOINT 4 COMPLETE — Main content flow`

---

### Checkpoint 5 — Interaction layer

Implement all 17 Phase 1 micro-interactions from V6_BUILD_AUTHORITY.md §7.2.

Key interactions:
- Spring-feel bounce on primary CTA tap: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Deceleration on scroll-triggered reveals: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Section cards: staggered entrance on scroll into view (IntersectionObserver)
- Platform pills: horizontal scroll with momentum, no visible scrollbar
- Fan capture field: focus glow using `--color-accent`
- Countdown timer: smooth digit transition, not jump
- Top card video: lazy-load iframe, poster frame shown until play intent

**Performance constraint:** No interaction may block the main thread > 50ms. Use `requestAnimationFrame` for visual updates.

**Signal:** `// CHECKPOINT 5 COMPLETE — Interaction layer`

---

### Checkpoint 6 — Accessibility + performance pass

**A11y checklist (WCAG 2.2 AA — all required):**
- [ ] All interactive elements have visible focus indicators (not outline: none without replacement)
- [ ] Colour contrast ≥ 4.5:1 for body text in all 4 themes
- [ ] Colour contrast ≥ 3:1 for large text / UI components in all 4 themes
- [ ] Countdown timer announces changes to screen readers (`aria-live="polite"`)
- [ ] Video iframe has `title` attribute
- [ ] Fan capture form: `<label>` associated with input, error messages with `aria-describedby`
- [ ] Tap targets ≥ 44×44px (all interactive elements)
- [ ] No content disappears behind fixed elements
- [ ] Keyboard navigation through all interactive elements in logical order

**Performance checklist:**
- [ ] DM Sans subset to Latin only (`&subset=latin`)
- [ ] Barlow Condensed subset to Latin only
- [ ] Hero artwork: `loading="lazy"` + explicit `width/height` to prevent CLS
- [ ] Video iframe: not loaded until user interaction (click poster → inject iframe)
- [ ] No layout shift on font load (use `font-display: swap` with size-adjust fallback or preload)
- [ ] IntersectionObserver for all scroll-triggered effects (no scroll listener)
- [ ] `extractAmbientColour()` fires after image load, not before

**Signal:** `// CHECKPOINT 6 COMPLETE — A11y + performance pass`

---

### Checkpoint 7 — Final emit

**Verification before signalling complete:**
1. All 4 themes render correctly (dark, light, glass, contrast)
2. All 4 campaign states work (profile, pre-release, live, gig)
3. All 7 vibes apply correctly — spot check: Electronic, Pop, Acoustic
4. Fan capture creates entry in `able_fans` with `{ email, ts, source, double_opted_in: 0 }`
5. Click tracking creates entries in `able_clicks` with `{ label, type, ts, source }`
6. View tracking creates entry in `able_views` on load
7. "Made with ABLE" footer visible when `profile.tier === 'free'`, hidden otherwise
8. No console errors on load
9. No horizontal scroll at 375px
10. File under 340 kB (check with: `wc -c able-v6.html`)

**Signal:** `// CHECKPOINT 7 COMPLETE — able-v6.html v1.0 ready`

---

## Hard rules (never break these)

- **No cheesy copy.** Re-read `COPY_AND_DESIGN_PHILOSOPHY.md` before touching any UI text.
- **Tokenised CSS only.** No hardcoded hex values in CSS rules. Use `var(--color-*)`.
- **No inline styles** except where dynamic JS requires it (ambient colour injection is the only legitimate exception).
- **No force-push, no rm -rf, no destructive git** without explicit user instruction.
- **Parse-check every JS block** after editing: `node -e "new Function(src)"` pattern.
- **Commit after each checkpoint** with a descriptive message.
- **Do not implement Phase 2 features** during this build (freelancer profile, fan dashboard, admin panel, discovery directory, Linktree importer, Mailchimp sync).

---

## localStorage schema (Phase 1)

```js
// Read profile
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}')

// Write fan capture
const fans = JSON.parse(localStorage.getItem('able_fans') || '[]')
fans.push({ id: crypto.randomUUID(), email, ts: Date.now(), source, double_opted_in: 0 })
localStorage.setItem('able_fans', JSON.stringify(fans))

// Write click
const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]')
clicks.push({ id: crypto.randomUUID(), label, type, ts: Date.now(), source })
localStorage.setItem('able_clicks', JSON.stringify(clicks))

// Write view
const views = JSON.parse(localStorage.getItem('able_views') || '[]')
views.push({ id: crypto.randomUUID(), ts: Date.now(), source: utmSource || 'direct' })
localStorage.setItem('able_views', JSON.stringify(views))
```

**Do not rename these keys.** They map 1:1 to Supabase columns.

---

## Now begin

Read `docs/v6/00_AUTHORITY_ORDER.md`, then `docs/v6/core/V6_BUILD_AUTHORITY.md`, then `docs/v6/core/VISUAL_SYSTEM.md`, then `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`.

Confirm with: **V6 authority confirmed. Canonical rules accepted. Building able-v6.html.**

Then execute Checkpoint 1.
