# ABLE v3 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `able-v3.html` — a premium iOS-shell artist profile with artwork hero, midnight navy base, Plus Jakarta Sans type, blue accent, and all 4 themes.

**Architecture:** Single standalone HTML file (no bundler, no shared deps). CSS custom property token system at the top of the file. Vanilla JS for tab switching, theme toggling, localStorage state. Playwright MCP for visual verification at each chunk.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS, Plus Jakarta Sans (Google Fonts), localStorage, Playwright MCP for QA.

**Design Spec:** `docs/superpowers/specs/2026-03-10-able-v3-design.md`

**Reference file:** `able-merged.html` — canonical source. Read it for JS patterns (localStorage, mode switching, applyMode, safeRender, applyAppearanceToRoot). Do NOT copy its CSS — v3 has its own token system.

---

## Chunk 1: Foundation — Shell, Tokens, Bottom Nav

### Task 1: Create the file with token system and document skeleton

**Files:**
- Create: `able-v3.html`

- [ ] **Step 1.1: Create `able-v3.html` with the full CSS token system**

The file must start with a comment block (see v2 pattern), then `<!DOCTYPE html>`. Inline all CSS. No external stylesheets except the Google Fonts import.

```html
<!--
================================================================================
  ABLE MUSIC — v3 PROFILE PAGE (able-v3.html)
  Branch: v2-simplified
================================================================================
  DESIGN SYSTEM
  Midnight Navy base · Plus Jakarta Sans · Artwork Hero · iOS shell
  Spec: docs/superpowers/specs/2026-03-10-able-v3-design.md
================================================================================
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Artist Name — ABLE</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* ── TOKENS ─────────────────────────────────────────────────── */
    :root {
      /* Colours */
      --color-bg:             #0d0e1a;
      --color-card:           #12152a;
      --color-card-raised:    #181c35;
      --color-border:         rgba(255,255,255,0.08);
      --color-border-mid:     rgba(255,255,255,0.12);
      --color-accent:         #3b82f6;
      --color-accent-rgb:     59,130,246;
      --color-accent-glow:    rgba(59,130,246,0.35);
      --color-accent-subtle:  rgba(59,130,246,0.12);
      --color-text:           #ffffff;
      --color-text-secondary: rgba(255,255,255,0.55);
      --color-text-muted:     rgba(255,255,255,0.35);
      --color-tab-bg:         rgba(10,11,22,0.97);

      /* Typography */
      --font:         'Plus Jakarta Sans', system-ui, sans-serif;

      /* Radius */
      --radius-card:      16px;
      --radius-button:    12px;
      --radius-button-sm: 8px;
      --radius-pill:      20px;
      --radius-art:       8px;

      /* Spacing */
      --space-page:   12px;
      --space-card:   14px;
      --space-gap:    12px;
    }

    /* ── RESET ───────────────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; }
    body {
      font-family: var(--font);
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100dvh;
      overscroll-behavior: none;
      -webkit-font-smoothing: antialiased;
    }
    img { max-width: 100%; display: block; }
    button { font-family: var(--font); cursor: pointer; border: none; background: none; }
    a { color: inherit; text-decoration: none; }
  </style>
</head>
<body>
  <p style="color:white;padding:20px;font-family:sans-serif;">ABLE v3 — skeleton</p>
</body>
</html>
```

- [ ] **Step 1.2: Verify the file loads in the browser via Playwright**

```
mcp__playwright__browser_navigate → file:///[absolute-path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: dark page (`#0d0e1a` background), white text "ABLE v3 — skeleton", no console errors.

- [ ] **Step 1.3: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): scaffold — token system and document skeleton"
```

---

### Task 2: iOS shell — page layout and status bar

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 2.1: Add the page shell CSS and HTML**

Replace the `<body>` skeleton content with the full iOS shell structure. The page is a single-column, max-width 430px, centred. On desktop it shows as a phone silhouette.

Add to `<style>`:

```css
/* ── PAGE SHELL ──────────────────────────────────────────────── */
.v3-shell {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
}

/* Desktop: show as phone */
@media (min-width: 480px) {
  body { background: #060810; padding: 40px 0 60px; }
  .v3-shell {
    border-radius: 36px;
    border: 1.5px solid rgba(255,255,255,0.1);
    box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
    overflow: hidden;
  }
}

/* ── STATUS BAR ──────────────────────────────────────────────── */
.v3-status-bar {
  height: 36px;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}
.v3-status-bar__time {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}
.v3-status-bar__icons {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--color-text);
  opacity: 0.7;
}

/* ── SCROLL AREA ─────────────────────────────────────────────── */
.v3-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 80px; /* space for tab bar */
}
```

Update `<body>`:

```html
<body>
  <div class="v3-shell">
    <!-- Status Bar -->
    <div class="v3-status-bar">
      <span class="v3-status-bar__time" id="v3Clock">9:41</span>
      <div class="v3-status-bar__icons">
        <span>●●●</span>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <rect x="0" y="4" width="3" height="7" rx="1" opacity="0.4"/>
          <rect x="4" y="2.5" width="3" height="8.5" rx="1" opacity="0.6"/>
          <rect x="8" y="1" width="3" height="10" rx="1" opacity="0.8"/>
          <rect x="12" y="0" width="3" height="11" rx="1"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" stroke-opacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/>
          <path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4"/>
        </svg>
      </div>
    </div>

    <!-- Scroll area (content goes here) -->
    <div class="v3-scroll" id="v3Scroll">
      <p style="color:var(--color-text-secondary);padding:20px;font-size:13px;">Content coming next...</p>
    </div>
  </div>

  <script>
    // Live clock
    function updateClock() {
      const now = new Date();
      const h = now.getHours().toString().padStart(2,'0');
      const m = now.getMinutes().toString().padStart(2,'0');
      const el = document.getElementById('v3Clock');
      if (el) el.textContent = h + ':' + m;
    }
    updateClock();
    setInterval(updateClock, 10000);
  </script>
</body>
```

- [ ] **Step 2.2: Verify shell renders correctly**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: dark page, status bar at top with live time, battery icon, signal bars. On desktop it appears as a phone silhouette centred on a darker background.

- [ ] **Step 2.3: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): iOS shell — status bar, page wrapper, scroll area"
```

---

### Task 3: Bottom tab bar with tab switching

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 3.1: Add tab bar CSS and HTML**

Add to `<style>`:

```css
/* ── BOTTOM TAB BAR ──────────────────────────────────────────── */
.v3-tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: var(--color-tab-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 10px 8px env(safe-area-inset-bottom, 10px);
  z-index: 200;
}
.v3-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 4px 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.1s;
}
.v3-tab:active { opacity: 0.6; }
.v3-tab__icon { font-size: 20px; line-height: 1; }
.v3-tab__label {
  font-size: 9px;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.3px;
  transition: color 0.15s;
}
.v3-tab.is-active .v3-tab__label { color: var(--color-accent); }

/* ── TAB PANELS ──────────────────────────────────────────────── */
.v3-panel { display: none; }
.v3-panel.is-active { display: block; }
```

Add the tab bar HTML after `</div><!-- /.v3-scroll -->` but inside `.v3-shell`:

```html
<!-- Bottom Tab Bar -->
<nav class="v3-tab-bar" role="tablist" aria-label="Main navigation">
  <button class="v3-tab is-active" data-panel="home" role="tab" aria-selected="true">
    <span class="v3-tab__icon" aria-hidden="true">⌂</span>
    <span class="v3-tab__label">Home</span>
  </button>
  <button class="v3-tab" data-panel="music" role="tab" aria-selected="false">
    <span class="v3-tab__icon" aria-hidden="true">♪</span>
    <span class="v3-tab__label">Music</span>
  </button>
  <button class="v3-tab" data-panel="events" role="tab" aria-selected="false">
    <span class="v3-tab__icon" aria-hidden="true">◈</span>
    <span class="v3-tab__label">Events</span>
  </button>
  <button class="v3-tab" data-panel="merch" role="tab" aria-selected="false">
    <span class="v3-tab__icon" aria-hidden="true">◻</span>
    <span class="v3-tab__label">Merch</span>
  </button>
  <button class="v3-tab" data-panel="support" role="tab" aria-selected="false">
    <span class="v3-tab__icon" aria-hidden="true">♡</span>
    <span class="v3-tab__label">Support</span>
  </button>
</nav>
```

Replace the scroll area content with panel structure:

```html
<div class="v3-scroll" id="v3Scroll">
  <div class="v3-panel is-active" id="panel-home">
    <p style="padding:20px;color:var(--color-text-secondary);font-size:13px;">Home panel</p>
  </div>
  <div class="v3-panel" id="panel-music">
    <p style="padding:20px;color:var(--color-text-secondary);font-size:13px;">Music panel</p>
  </div>
  <div class="v3-panel" id="panel-events">
    <p style="padding:20px;color:var(--color-text-secondary);font-size:13px;">Events panel</p>
  </div>
  <div class="v3-panel" id="panel-merch">
    <p style="padding:20px;color:var(--color-text-secondary);font-size:13px;">Merch panel</p>
  </div>
  <div class="v3-panel" id="panel-support">
    <p style="padding:20px;color:var(--color-text-secondary);font-size:13px;">Support panel</p>
  </div>
</div>
```

- [ ] **Step 3.2: Add tab switching JS**

Add inside the `<script>` block (after the clock code):

```js
// Tab switching
const tabs = document.querySelectorAll('.v3-tab');
const panels = document.querySelectorAll('.v3-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.panel;

    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => p.classList.remove('is-active'));

    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('panel-' + target);
    if (panel) {
      panel.classList.add('is-active');
      document.getElementById('v3Scroll').scrollTop = 0;
    }
  });
});
```

- [ ] **Step 3.3: Verify tab bar and switching**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: tab bar visible at bottom, "Home" label in blue accent colour, others in muted grey.

```
mcp__playwright__browser_click → selector: [data-panel="music"]
mcp__playwright__browser_take_screenshot
```

Expected: Music panel visible ("Music panel" text), Music tab label turns blue.

- [ ] **Step 3.4: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): bottom tab bar with 5 tabs and panel switching"
```

---

## Chunk 2: Artwork Hero + Artist Info + CTAs + Pills

### Task 4: Artwork hero

**Files:**
- Modify: `able-v3.html` — add hero CSS and HTML inside `#panel-home`

- [ ] **Step 4.1: Add artwork hero CSS**

Add to `<style>`:

```css
/* ── ARTWORK HERO ────────────────────────────────────────────── */
.v3-hero {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}
.v3-hero__image {
  position: absolute;
  inset: 0;
  background-color: var(--color-card);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.v3-hero__gradient-placeholder {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 25% 70%, rgba(var(--color-accent-rgb),0.4) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.25) 0%, transparent 50%);
}
.v3-hero__scrim {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, var(--color-bg));
}
.v3-hero__tag {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 7px;
  padding: 4px 10px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
}
.v3-hero__avatar {
  position: absolute;
  bottom: 14px;
  left: 16px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent), #1d4ed8);
  border: 2px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 14px var(--color-accent-glow);
  object-fit: cover;
  overflow: hidden;
}

/* Hero load animation */
.v3-hero { animation: heroFadeIn 0.4s ease forwards; }
@keyframes heroFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

- [ ] **Step 4.2: Add hero HTML into `#panel-home`**

Replace the placeholder `<p>` in `#panel-home` with:

```html
<!-- Artwork Hero -->
<div class="v3-hero" id="v3Hero">
  <div class="v3-hero__image" id="v3HeroImage">
    <div class="v3-hero__gradient-placeholder"></div>
  </div>
  <div class="v3-hero__scrim"></div>
  <span class="v3-hero__tag" id="v3HeroTag">New Album · Out Now</span>
  <div class="v3-hero__avatar" id="v3HeroAvatar"></div>
</div>
```

- [ ] **Step 4.3: Verify hero renders**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: 200px artwork area with blue/indigo gradient placeholder, glass tag pill top-right, small avatar circle bottom-left, gradient scrim fading to navy at the bottom edge.

- [ ] **Step 4.4: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): artwork hero with gradient placeholder, tag pill, avatar"
```

---

### Task 5: Artist info block

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 5.1: Add artist info CSS**

```css
/* ── ARTIST INFO ─────────────────────────────────────────────── */
.v3-artist {
  padding: 14px var(--space-page) 0;
}
.v3-artist__name {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.6px;
  color: var(--color-text);
  line-height: 1.1;
}
.v3-artist__meta {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-top: 4px;
  letter-spacing: 0.3px;
}
.v3-artist__bio {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-top: 8px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.v3-artist__bio.is-expanded {
  display: block;
  -webkit-line-clamp: unset;
}
.v3-artist__bio-toggle {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  margin-top: 4px;
  display: inline-block;
  cursor: pointer;
  padding: 2px 0;
}
```

- [ ] **Step 5.2: Add artist info HTML after `.v3-hero`**

```html
<!-- Artist Info -->
<div class="v3-artist">
  <h1 class="v3-artist__name" id="v3ArtistName">Artist Name</h1>
  <p class="v3-artist__meta" id="v3ArtistMeta">London · Hip Hop · Since 2019</p>
  <p class="v3-artist__bio" id="v3ArtistBio">
    Genre-blending producer known for cinematic sound design and atmospheric storytelling.
    Signed to independent label. Debut album out now on all platforms.
  </p>
  <span class="v3-artist__bio-toggle" id="v3BioToggle">More</span>
</div>
```

- [ ] **Step 5.3: Add bio expand/collapse JS**

```js
// Bio expand/collapse
const bioEl = document.getElementById('v3ArtistBio');
const bioToggle = document.getElementById('v3BioToggle');
if (bioEl && bioToggle) {
  bioToggle.addEventListener('click', () => {
    bioEl.classList.toggle('is-expanded');
    bioToggle.textContent = bioEl.classList.contains('is-expanded') ? 'Less' : 'More';
  });
}
```

- [ ] **Step 5.4: Verify artist info renders and bio toggles**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: artist name in large 800-weight type, meta line below, bio in secondary colour, "More" link in blue.

```
mcp__playwright__browser_click → selector: #v3BioToggle
mcp__playwright__browser_take_screenshot
```

Expected: bio fully expanded, toggle reads "Less".

- [ ] **Step 5.5: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): artist info block — name, meta, expandable bio"
```

---

### Task 6: CTA buttons

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 6.1: Add CTA CSS**

```css
/* ── CTA BUTTONS ─────────────────────────────────────────────── */
.v3-cta-row {
  display: flex;
  gap: 8px;
  padding: 14px var(--space-page);
}
.v3-cta {
  flex: 1;
  padding: 12px;
  border-radius: var(--radius-button);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.1s, opacity 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
}
.v3-cta:active { transform: scale(0.97); }
.v3-cta--primary {
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 4px 18px var(--color-accent-glow);
}
.v3-cta--secondary {
  background: rgba(255,255,255,0.07);
  border: 1px solid var(--color-border-mid);
  color: rgba(255,255,255,0.75);
}
.v3-cta--secondary:hover { background: rgba(255,255,255,0.1); }
```

- [ ] **Step 6.2: Add CTA HTML after `.v3-artist`**

```html
<!-- Hero CTAs -->
<div class="v3-cta-row">
  <button class="v3-cta v3-cta--primary" id="v3CtaPrimary">▶ Stream Now</button>
  <button class="v3-cta v3-cta--secondary" id="v3CtaSecondary">🎟 Get Tickets</button>
</div>
```

- [ ] **Step 6.3: Verify CTAs render and animate on tap**

```
mcp__playwright__browser_take_screenshot
```

Expected: two buttons side by side. Primary is full blue with glow shadow. Secondary is translucent ghost with border. Equal width.

- [ ] **Step 6.4: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): hero CTA buttons — primary and secondary"
```

---

### Task 7: Quick action pills

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 7.1: Add pills CSS**

```css
/* ── QUICK ACTION PILLS ──────────────────────────────────────── */
.v3-pills {
  display: flex;
  gap: 6px;
  padding: 0 var(--space-page) 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.v3-pills::-webkit-scrollbar { display: none; }
.v3-pill {
  flex-shrink: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.1s, color 0.1s;
  -webkit-tap-highlight-color: transparent;
}
.v3-pill:hover, .v3-pill:active {
  background: rgba(255,255,255,0.12);
  color: var(--color-text);
}
.v3-pill--overflow {
  color: var(--color-accent);
  border-color: rgba(var(--color-accent-rgb),0.25);
  background: rgba(var(--color-accent-rgb),0.06);
}
```

- [ ] **Step 7.2: Add pills HTML after `.v3-cta-row`**

```html
<!-- Quick Action Pills -->
<div class="v3-pills" id="v3Pills">
  <button class="v3-pill">🎵 Spotify</button>
  <button class="v3-pill">🍎 Apple Music</button>
  <button class="v3-pill">☁ SoundCloud</button>
  <button class="v3-pill">📺 YouTube</button>
  <button class="v3-pill v3-pill--overflow" id="v3PillsToggle">+2</button>
</div>
```

- [ ] **Step 7.3: Verify pills render and scroll**

```
mcp__playwright__browser_take_screenshot
```

Expected: horizontal scrollable row of pills, muted colour, accent-coloured overflow pill at end.

- [ ] **Step 7.4: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): quick action pills row — scrollable, overflow toggle"
```

---

## Chunk 3: Music Section (Home preview + Full Music tab)

### Task 8: Shared card CSS

**Files:**
- Modify: `able-v3.html`

All content sections use the same card anatomy. Define it once.

- [ ] **Step 8.1: Add section card CSS**

```css
/* ── SECTION CARDS ───────────────────────────────────────────── */
.v3-section {
  margin: 0 var(--space-page) var(--space-gap);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  /* Entrance animation */
  animation: sectionSlideUp 0.3s ease both;
}
@keyframes sectionSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Stagger delays for sections */
.v3-section:nth-child(1) { animation-delay: 0ms; }
.v3-section:nth-child(2) { animation-delay: 80ms; }
.v3-section:nth-child(3) { animation-delay: 160ms; }
.v3-section:nth-child(4) { animation-delay: 240ms; }

.v3-section__header {
  padding: var(--space-card);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.v3-section__title {
  font-size: 14px;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.v3-section__title::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}
.v3-section__action {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
}
.v3-section__footer {
  padding: 12px;
  text-align: center;
  border-top: 1px solid var(--color-border);
}
.v3-section__footer-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
}
.v3-row {
  padding: 10px var(--space-card);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 10px;
}
```

- [ ] **Step 8.2: Verify no visual regressions**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: same as before, CSS classes simply added.

- [ ] **Step 8.3: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): shared section card CSS — header, footer, row anatomy"
```

---

### Task 9: Music section — tracklist rows

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 9.1: Add track row CSS**

```css
/* ── MUSIC / TRACK ROWS ──────────────────────────────────────── */
.v3-track {
  padding: 8px var(--space-card);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.1s;
  -webkit-tap-highlight-color: transparent;
}
.v3-track:active { background: rgba(255,255,255,0.03); }
.v3-track__art {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-art);
  background: linear-gradient(135deg, #1e3a5f, var(--color-accent));
  flex-shrink: 0;
  object-fit: cover;
}
.v3-track__num {
  width: 20px;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-align: center;
  flex-shrink: 0;
}
.v3-track__info { flex: 1; min-width: 0; }
.v3-track__name {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v3-track__meta {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.v3-track__play {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent-subtle);
  border: 1px solid rgba(var(--color-accent-rgb),0.3);
  color: var(--color-accent);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
}
.v3-track:hover .v3-track__play {
  background: rgba(var(--color-accent-rgb),0.25);
}
```

- [ ] **Step 9.2: Add music section to `#panel-home` (preview — 2 tracks)**

Add after `#v3Pills`:

```html
<!-- Section divider -->
<div style="height:1px;background:var(--color-border);margin:0 var(--space-page) 16px;"></div>

<!-- Music Section (Home preview) -->
<div class="v3-section" id="v3MusicHomeCard">
  <div class="v3-section__header">
    <span class="v3-section__title">Latest Music</span>
    <span class="v3-section__action" data-goto="music">See all</span>
  </div>
  <div class="v3-track">
    <div class="v3-track__art"></div>
    <div class="v3-track__info">
      <div class="v3-track__name">New Single Title</div>
      <div class="v3-track__meta">Single · 2026</div>
    </div>
    <div class="v3-track__play">▶</div>
  </div>
  <div class="v3-track">
    <div class="v3-track__art" style="background:linear-gradient(135deg,#1e3a5f,#6366f1);"></div>
    <div class="v3-track__info">
      <div class="v3-track__name">Previous EP Title</div>
      <div class="v3-track__meta">EP · 4 tracks · 2025</div>
    </div>
    <div class="v3-track__play">▶</div>
  </div>
  <div class="v3-section__footer">
    <span class="v3-section__footer-link" data-goto="music">Show all 8 releases</span>
  </div>
</div>
```

- [ ] **Step 9.3: Add Music tab full content to `#panel-music`**

```html
<div class="v3-panel-header" style="padding:20px var(--space-page) 12px;">
  <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.6px;">Music</h2>
  <p style="font-size:12px;color:var(--color-text-muted);margin-top:3px;">8 releases · 42k monthly listeners</p>
</div>

<!-- Featured release card -->
<div class="v3-section" style="margin-top:0;">
  <div style="padding:14px;background:var(--color-accent-subtle);border-bottom:1px solid var(--color-border);">
    <div style="font-size:10px;font-weight:700;color:var(--color-accent);letter-spacing:1px;text-transform:uppercase;">Now Streaming</div>
    <div style="font-size:16px;font-weight:800;color:var(--color-text);margin-top:4px;letter-spacing:-0.4px;">Debut Album Title</div>
    <div style="font-size:11px;color:var(--color-text-muted);margin-top:2px;">12 tracks · 38 mins · Released 2026</div>
    <button class="v3-cta v3-cta--primary" style="margin-top:12px;padding:8px 16px;flex:none;width:auto;font-size:12px;border-radius:var(--radius-button-sm);">▶ Play on Spotify</button>
  </div>
  <div class="v3-track">
    <span class="v3-track__num">1</span>
    <div class="v3-track__info">
      <div class="v3-track__name">Track One</div>
      <div class="v3-track__meta">3:42</div>
    </div>
    <div class="v3-track__play">▶</div>
  </div>
  <div class="v3-track">
    <span class="v3-track__num">2</span>
    <div class="v3-track__info">
      <div class="v3-track__name">Track Two</div>
      <div class="v3-track__meta">4:01</div>
    </div>
    <div class="v3-track__play">▶</div>
  </div>
  <div class="v3-track">
    <span class="v3-track__num">3</span>
    <div class="v3-track__info">
      <div class="v3-track__name">Track Three</div>
      <div class="v3-track__meta">3:28</div>
    </div>
    <div class="v3-track__play">▶</div>
  </div>
  <div class="v3-section__footer">
    <span class="v3-section__footer-link">Show all 12 tracks</span>
  </div>
</div>
```

- [ ] **Step 9.4: Wire "See all" / "Show all" links to navigate to Music tab**

Add to JS:

```js
// "See all" / "data-goto" links
document.addEventListener('click', e => {
  const target = e.target.closest('[data-goto]');
  if (!target) return;
  const panel = target.dataset.goto;
  const tab = document.querySelector(`.v3-tab[data-panel="${panel}"]`);
  if (tab) tab.click();
});
```

- [ ] **Step 9.5: Verify music section**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: Home panel shows 2-track music preview card. Track rows with artwork, name, meta, play button.

```
mcp__playwright__browser_click → selector: [data-goto="music"]
mcp__playwright__browser_take_screenshot
```

Expected: Music tab activates, full track list visible, blue "Now Streaming" badge, tracklist with numbers.

- [ ] **Step 9.6: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): music section — track rows, home preview, full music tab"
```

---

## Chunk 4: Events Section + Merch Section

### Task 10: Events section

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 10.1: Add event row CSS**

```css
/* ── EVENT ROWS ──────────────────────────────────────────────── */
.v3-event {
  padding: 10px var(--space-card);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 10px;
}
.v3-event__date {
  width: 38px;
  height: 38px;
  background: var(--color-accent-subtle);
  border: 1px solid rgba(var(--color-accent-rgb),0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.v3-event__date--past {
  background: rgba(255,255,255,0.04);
  border-color: var(--color-border);
}
.v3-event__month {
  font-size: 7px;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1;
}
.v3-event__date--past .v3-event__month { color: var(--color-text-muted); }
.v3-event__day {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
}
.v3-event__info { flex: 1; min-width: 0; }
.v3-event__name {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v3-event__venue {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.v3-event__ticket {
  background: var(--color-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: var(--radius-button-sm);
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.1s;
  -webkit-tap-highlight-color: transparent;
}
.v3-event__ticket:active { opacity: 0.8; }
.v3-event__ticket--past {
  background: transparent;
  color: var(--color-text-muted);
  font-size: 10px;
  padding: 6px 0;
}
.v3-event--past { opacity: 0.6; }

/* Section label (e.g. "Upcoming" / "Past Shows") */
.v3-section-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0 var(--space-page) 8px;
}
```

- [ ] **Step 10.2: Add Events section to `#panel-home` (preview)**

Add after the Music section card in `#panel-home`:

```html
<!-- Events Section (Home preview) -->
<div class="v3-section" id="v3EventsHomeCard">
  <div class="v3-section__header">
    <span class="v3-section__title">Upcoming Shows</span>
    <span class="v3-section__action" data-goto="events">See all</span>
  </div>
  <div class="v3-event">
    <div class="v3-event__date">
      <span class="v3-event__month">Mar</span>
      <span class="v3-event__day">28</span>
    </div>
    <div class="v3-event__info">
      <div class="v3-event__name">Fabric, London</div>
      <div class="v3-event__venue">London, UK · Doors 10pm</div>
    </div>
    <button class="v3-event__ticket">Tickets</button>
  </div>
  <div class="v3-event">
    <div class="v3-event__date">
      <span class="v3-event__month">Apr</span>
      <span class="v3-event__day">12</span>
    </div>
    <div class="v3-event__info">
      <div class="v3-event__name">Printworks</div>
      <div class="v3-event__venue">London, UK · All Ages</div>
    </div>
    <button class="v3-event__ticket">Tickets</button>
  </div>
  <div class="v3-section__footer">
    <span class="v3-section__footer-link" data-goto="events">View all 3 shows</span>
  </div>
</div>
```

- [ ] **Step 10.3: Add full Events tab content to `#panel-events`**

```html
<div class="v3-panel-header" style="padding:20px var(--space-page) 12px;">
  <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.6px;">Shows</h2>
  <p style="font-size:12px;color:var(--color-text-muted);margin-top:3px;">3 upcoming · 12 past</p>
</div>

<div class="v3-section-label">Upcoming</div>

<div class="v3-section" style="margin-top:0;">
  <div class="v3-event" style="border-top:none;">
    <div class="v3-event__date">
      <span class="v3-event__month">Mar</span>
      <span class="v3-event__day">28</span>
    </div>
    <div class="v3-event__info">
      <div class="v3-event__name">Fabric, London</div>
      <div class="v3-event__venue">London, UK · Doors 10pm</div>
    </div>
    <button class="v3-event__ticket">Tickets</button>
  </div>
  <div class="v3-event">
    <div class="v3-event__date">
      <span class="v3-event__month">Apr</span>
      <span class="v3-event__day">12</span>
    </div>
    <div class="v3-event__info">
      <div class="v3-event__name">Printworks</div>
      <div class="v3-event__venue">London, UK · All Ages</div>
    </div>
    <button class="v3-event__ticket">Tickets</button>
  </div>
  <div class="v3-event">
    <div class="v3-event__date" style="background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.25);">
      <span class="v3-event__month" style="color:#8b5cf6;">May</span>
      <span class="v3-event__day">03</span>
    </div>
    <div class="v3-event__info">
      <div class="v3-event__name">Warehouse Project</div>
      <div class="v3-event__venue">Manchester, UK</div>
    </div>
    <button class="v3-event__ticket" style="background:#8b5cf6;">Tickets</button>
  </div>
</div>

<div class="v3-section-label" style="margin-top:8px;">Past Shows</div>

<div class="v3-section v3-event--past" style="margin-top:0;">
  <div class="v3-event" style="border-top:none;">
    <div class="v3-event__date v3-event__date--past">
      <span class="v3-event__month">Feb</span>
      <span class="v3-event__day">14</span>
    </div>
    <div class="v3-event__info">
      <div class="v3-event__name">Corsica Studios</div>
      <div class="v3-event__venue">London, UK</div>
    </div>
    <span class="v3-event__ticket v3-event__ticket--past">Past</span>
  </div>
</div>
```

- [ ] **Step 10.4: Verify events section**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: Home shows 2-event preview with date blocks and ticket buttons. "See all" link present.

```
mcp__playwright__browser_click → selector: [data-goto="events"]
mcp__playwright__browser_take_screenshot
```

Expected: Events tab with "Upcoming" / "Past Shows" labels, upcoming events at full opacity, past events at 60%.

- [ ] **Step 10.5: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): events section — date blocks, ticket CTAs, upcoming/past states"
```

---

### Task 11: Merch section

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 11.1: Add merch bento CSS**

```css
/* ── MERCH BENTO ─────────────────────────────────────────────── */
.v3-merch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 var(--space-card) var(--space-card);
}
.v3-merch-item {
  background: var(--color-card-raised);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.v3-merch-item:hover { border-color: var(--color-border-mid); }
.v3-merch-item--featured {
  grid-column: 1 / -1;
}
.v3-merch-item__img {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #1e3a5f, #2d1f4e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}
.v3-merch-item--featured .v3-merch-item__img {
  aspect-ratio: 2 / 1;
  font-size: 48px;
}
.v3-merch-item__body {
  padding: 10px;
}
.v3-merch-item__name {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text);
}
.v3-merch-item__price {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.v3-merch-item__badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
  text-transform: uppercase;
}
.v3-merch-item__badge--new { background: var(--color-accent-subtle); color: var(--color-accent); }
.v3-merch-item__badge--ltd { background: rgba(245,158,11,0.12); color: #f59e0b; }
```

- [ ] **Step 11.2: Add Merch panel content to `#panel-merch`**

```html
<div class="v3-panel-header" style="padding:20px var(--space-page) 12px;">
  <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.6px;">Merch</h2>
  <p style="font-size:12px;color:var(--color-text-muted);margin-top:3px;">Official store · Free shipping over £40</p>
</div>

<div class="v3-section" style="margin-top:0;">
  <div class="v3-section__header">
    <span class="v3-section__title">Store</span>
    <a href="#" class="v3-section__action">Visit store →</a>
  </div>
  <div class="v3-merch-grid">
    <!-- Featured item -->
    <div class="v3-merch-item v3-merch-item--featured">
      <div class="v3-merch-item__img">👕</div>
      <div class="v3-merch-item__body">
        <div class="v3-merch-item__name">Tour Hoodie 2026</div>
        <div class="v3-merch-item__price">£55.00</div>
        <span class="v3-merch-item__badge v3-merch-item__badge--new">New</span>
      </div>
    </div>
    <!-- Regular items -->
    <div class="v3-merch-item">
      <div class="v3-merch-item__img">🎸</div>
      <div class="v3-merch-item__body">
        <div class="v3-merch-item__name">Tote Bag</div>
        <div class="v3-merch-item__price">£20.00</div>
      </div>
    </div>
    <div class="v3-merch-item">
      <div class="v3-merch-item__img">💿</div>
      <div class="v3-merch-item__body">
        <div class="v3-merch-item__name">Vinyl LP</div>
        <div class="v3-merch-item__price">£28.00</div>
        <span class="v3-merch-item__badge v3-merch-item__badge--ltd">Limited</span>
      </div>
    </div>
    <div class="v3-merch-item">
      <div class="v3-merch-item__img">🎴</div>
      <div class="v3-merch-item__body">
        <div class="v3-merch-item__name">Photo Print</div>
        <div class="v3-merch-item__price">£15.00</div>
      </div>
    </div>
    <div class="v3-merch-item">
      <div class="v3-merch-item__img">🧢</div>
      <div class="v3-merch-item__body">
        <div class="v3-merch-item__name">5-Panel Cap</div>
        <div class="v3-merch-item__price">£30.00</div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 11.3: Verify merch grid**

```
mcp__playwright__browser_click → selector: [data-panel="merch"]
mcp__playwright__browser_take_screenshot
```

Expected: Merch tab with featured hoodie item spanning full width (2:1 ratio), 2-column grid below it, badges on relevant items.

- [ ] **Step 11.4: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): merch section — bento grid, featured item, badges"
```

---

## Chunk 5: Support Section + All 4 Themes

### Task 12: Support section

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 12.1: Add Support panel content to `#panel-support`**

```html
<div class="v3-panel-header" style="padding:20px var(--space-page) 12px;">
  <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.6px;">Support</h2>
  <p style="font-size:12px;color:var(--color-text-muted);margin-top:3px;">Help the music keep going</p>
</div>

<!-- Inner Circle subscription card -->
<div class="v3-section" style="margin-top:0;">
  <div style="padding:20px var(--space-card);text-align:center;">
    <div style="width:56px;height:56px;border-radius:50%;background:var(--color-accent-subtle);border:2px solid rgba(var(--color-accent-rgb),0.3);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 12px;">💙</div>
    <div style="font-size:18px;font-weight:800;letter-spacing:-0.4px;">Inner Circle</div>
    <div style="font-size:13px;color:var(--color-text-secondary);margin-top:6px;line-height:1.6;max-width:240px;margin-left:auto;margin-right:auto;">Exclusive demos, behind the scenes, early ticket access and direct messages.</div>
    <div style="font-size:24px;font-weight:800;color:var(--color-text);margin-top:14px;">£5<span style="font-size:13px;font-weight:500;color:var(--color-text-muted);">/month</span></div>
    <button class="v3-cta v3-cta--primary" style="width:100%;margin-top:14px;">Join Inner Circle</button>
    <p style="font-size:11px;color:var(--color-text-muted);margin-top:10px;">Cancel any time · Processed by Stripe</p>
  </div>
</div>

<!-- One-time tip -->
<div class="v3-section">
  <div class="v3-section__header">
    <span class="v3-section__title">One-time tip</span>
  </div>
  <div style="padding:0 var(--space-card) var(--space-card);display:flex;gap:8px;flex-wrap:wrap;">
    <button class="v3-pill" style="flex:1;min-width:60px;text-align:center;">☕ £3</button>
    <button class="v3-pill" style="flex:1;min-width:60px;text-align:center;">🎵 £5</button>
    <button class="v3-pill" style="flex:1;min-width:60px;text-align:center;">🎸 £10</button>
    <button class="v3-pill" style="flex:1;min-width:60px;text-align:center;">💿 £20</button>
  </div>
</div>
```

- [ ] **Step 12.2: Verify support tab**

```
mcp__playwright__browser_click → selector: [data-panel="support"]
mcp__playwright__browser_take_screenshot
```

Expected: Support tab with Inner Circle card, subscription price, join button, tip amount pills below.

- [ ] **Step 12.3: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): support section — inner circle subscription + tip amounts"
```

---

### Task 13: All 4 themes — Light, Contrast, Glass

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 13.1: Add theme token overrides**

The dark theme is the default (`:root`). Add light, contrast, and glass overrides:

```css
/* ── THEME: LIGHT ────────────────────────────────────────────── */
[data-theme="light"] {
  --color-bg:             #f8f9ff;
  --color-card:           #ffffff;
  --color-card-raised:    #f0f2ff;
  --color-border:         rgba(0,0,0,0.08);
  --color-border-mid:     rgba(0,0,0,0.12);
  --color-text:           #0d0e1a;
  --color-text-secondary: rgba(13,14,26,0.6);
  --color-text-muted:     rgba(13,14,26,0.4);
  --color-tab-bg:         rgba(248,249,255,0.97);
}
[data-theme="light"] .v3-hero__gradient-placeholder {
  background:
    radial-gradient(ellipse at 25% 70%, rgba(var(--color-accent-rgb),0.2) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 50%);
}

/* ── THEME: CONTRAST ─────────────────────────────────────────── */
[data-theme="contrast"] {
  --color-bg:             #000000;
  --color-card:           #111111;
  --color-card-raised:    #1a1a1a;
  --color-border:         rgba(255,255,255,0.12);
  --color-border-mid:     rgba(255,255,255,0.2);
  --color-text:           #ffffff;
  --color-text-secondary: rgba(255,255,255,0.75);
  --color-text-muted:     rgba(255,255,255,0.5);
  --color-tab-bg:         rgba(0,0,0,0.98);
}

/* ── THEME: GLASS ────────────────────────────────────────────── */
[data-theme="glass"] {
  --color-bg:             transparent;
  --color-card:           rgba(13,14,26,0.55);
  --color-card-raised:    rgba(24,28,53,0.6);
  --color-border:         rgba(255,255,255,0.12);
  --color-tab-bg:         rgba(10,11,22,0.75);
}
[data-theme="glass"] body {
  background-color: #0d0e1a;
  background-image: url('');  /* set via JS from artist's hero photo */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
[data-theme="glass"] .v3-shell { background: transparent; }
[data-theme="glass"] .v3-section {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
[data-theme="glass"] .v3-tab-bar {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
```

- [ ] **Step 13.2: Add theme switcher UI to Home panel**

Add at the bottom of `#panel-home`:

```html
<!-- Theme switcher (dev helper — will be moved to admin panel later) -->
<div style="padding:16px var(--space-page) 8px;">
  <div class="v3-section-label" style="margin-bottom:10px;">Theme preview</div>
  <div style="display:flex;gap:6px;">
    <button class="v3-pill" onclick="document.documentElement.setAttribute('data-theme','dark')" style="flex:1;">Dark</button>
    <button class="v3-pill" onclick="document.documentElement.setAttribute('data-theme','light')" style="flex:1;">Light</button>
    <button class="v3-pill" onclick="document.documentElement.setAttribute('data-theme','contrast')" style="flex:1;">Contrast</button>
    <button class="v3-pill" onclick="document.documentElement.setAttribute('data-theme','glass')" style="flex:1;">Glass</button>
  </div>
</div>
```

- [ ] **Step 13.3: Verify all 4 themes via Playwright**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
```

Dark (default):
```
mcp__playwright__browser_take_screenshot
```
Expected: Midnight navy background, navy cards.

Light:
```
mcp__playwright__browser_click → selector: button containing "Light"
mcp__playwright__browser_take_screenshot
```
Expected: Light grey-white background, white cards, dark text.

Contrast:
```
mcp__playwright__browser_click → selector: button containing "Contrast"
mcp__playwright__browser_take_screenshot
```
Expected: Pure black background, very dark grey cards, crisp white text.

Glass (no background image set — will show gradient):
```
mcp__playwright__browser_click → selector: button containing "Glass"
mcp__playwright__browser_take_screenshot
```
Expected: Translucent card surfaces, body background colour visible behind them.

- [ ] **Step 13.4: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): all 4 themes — dark, light, contrast, glass with token overrides"
```

---

## Chunk 6: localStorage Wiring + Polish Pass

### Task 14: localStorage state — read artist data

**Files:**
- Modify: `able-v3.html`

The data model mirrors `able-merged.html`'s localStorage patterns. Read it for the key structure and `safeRender` pattern. v3 uses its own key `able_v3_profile`.

- [ ] **Step 14.1: Add the data model and read/render logic**

Replace all hardcoded placeholder strings with JS-driven renders. Add to `<script>`:

```js
// ── DATA MODEL ───────────────────────────────────────────────
const V3_KEY = 'able_v3_profile';
const V3_DEFAULTS = {
  name:         'Artist Name',
  handle:       '@artistname',
  location:     'London',
  genres:       ['Hip Hop'],
  bio:          'Genre-blending producer known for cinematic sound design and atmospheric storytelling.',
  accent:       '#3b82f6',
  theme:        'dark',
  heroTag:      'New Album · Out Now',
  release: {
    title:      'Debut Album Title',
    type:       'Album',
    trackCount: 12,
    year:       '2026',
  },
  ctaPrimary:   { label: '▶ Stream Now',   url: '#' },
  ctaSecondary: { label: '🎟 Get Tickets', url: '#' },
  platforms: [
    { label: 'Spotify',     url: '#', icon: '🎵' },
    { label: 'Apple Music', url: '#', icon: '🍎' },
    { label: 'SoundCloud',  url: '#', icon: '☁' },
    { label: 'YouTube',     url: '#', icon: '📺' },
  ],
};

function loadProfile() {
  try {
    const saved = localStorage.getItem(V3_KEY);
    return saved ? Object.assign({}, V3_DEFAULTS, JSON.parse(saved)) : V3_DEFAULTS;
  } catch { return V3_DEFAULTS; }
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

function applyProfile(data) {
  // Accent colour
  const root = document.documentElement;
  root.style.setProperty('--color-accent', data.accent);
  root.style.setProperty('--color-accent-rgb', hexToRgb(data.accent));
  root.style.setProperty('--color-accent-glow', `rgba(${hexToRgb(data.accent)},0.35)`);
  root.style.setProperty('--color-accent-subtle', `rgba(${hexToRgb(data.accent)},0.12)`);

  // Theme
  root.setAttribute('data-theme', data.theme || 'dark');

  // Artist info
  const nameEl = document.getElementById('v3ArtistName');
  const metaEl = document.getElementById('v3ArtistMeta');
  const bioEl  = document.getElementById('v3ArtistBio');
  const tagEl  = document.getElementById('v3HeroTag');

  if (nameEl) nameEl.textContent = data.name;
  if (metaEl) metaEl.textContent = [data.location, ...(data.genres||[])].filter(Boolean).join(' · ');
  if (bioEl)  bioEl.textContent  = data.bio;
  if (tagEl)  tagEl.textContent  = data.heroTag || 'Out Now';

  // CTAs
  const primary = document.getElementById('v3CtaPrimary');
  const secondary = document.getElementById('v3CtaSecondary');
  if (primary && data.ctaPrimary)   primary.textContent   = data.ctaPrimary.label;
  if (secondary && data.ctaSecondary) secondary.textContent = data.ctaSecondary.label;
}

// Run on load
const profileData = loadProfile();
applyProfile(profileData);
```

- [ ] **Step 14.2: Verify profile renders from defaults**

```
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: Artist Name, London · Hip Hop, correct bio text, blue accent. All driven from the JS defaults.

- [ ] **Step 14.3: Commit**

```bash
git add able-v3.html
git commit -m "feat(v3): localStorage profile wiring — accent, theme, name, bio, CTAs"
```

---

### Task 15: Polish pass — spacing, tap targets, mobile QA

**Files:**
- Modify: `able-v3.html`

- [ ] **Step 15.1: Audit and fix tap targets**

All interactive elements must be minimum 44×44px. Check:
- `.v3-tab` — add `min-height: 44px` if needed
- `.v3-cta` — already 12px padding + 14px font, verify height ≥ 44px
- `.v3-pill` — add `min-height: 36px` (pills are intentionally compact but reachable)
- `.v3-track__play` — currently 28px; wrap in a 44px touch area
- `.v3-event__ticket` — verify height

Fix `.v3-track__play` by wrapping in a touch target:

```css
.v3-track__play-wrap {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}
```

Update track HTML to wrap play button in `.v3-track__play-wrap`.

- [ ] **Step 15.2: Mobile viewport QA via Playwright**

```
mcp__playwright__browser_resize → { width: 390, height: 844 }
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
mcp__playwright__browser_take_screenshot
```

Expected: looks identical to the design mockup — no overflow, no horizontal scroll, tab bar flush at bottom, hero fills full width.

Scroll to bottom:
```
mcp__playwright__browser_evaluate → window.scrollTo(0, 9999)
mcp__playwright__browser_take_screenshot
```

Expected: last section visible above tab bar, no content hidden behind tab bar.

- [ ] **Step 15.3: Check all 4 themes at mobile viewport**

Switch to light, take screenshot. Switch to contrast, take screenshot. Switch to glass, take screenshot. Verify no text falls below 4.5:1 contrast visually.

- [ ] **Step 15.4: Commit**

```bash
git add able-v3.html
git commit -m "fix(v3): polish pass — tap targets, mobile spacing, theme QA"
```

---

### Task 16: Final Playwright smoke test

- [ ] **Step 16.1: Run full smoke test sequence**

```
mcp__playwright__browser_resize → { width: 390, height: 844 }
mcp__playwright__browser_navigate → file:///[path]/able-v3.html
```

Verify each tab loads:
```
mcp__playwright__browser_click → [data-panel="home"]    → screenshot
mcp__playwright__browser_click → [data-panel="music"]   → screenshot
mcp__playwright__browser_click → [data-panel="events"]  → screenshot
mcp__playwright__browser_click → [data-panel="merch"]   → screenshot
mcp__playwright__browser_click → [data-panel="support"] → screenshot
```

Check console for errors:
```
mcp__playwright__browser_console_messages
```

Expected: no JS errors. All 5 tabs render correct content.

- [ ] **Step 16.2: Final commit**

```bash
git add able-v3.html
git commit -m "feat(v3): v3 complete — iOS shell, artwork hero, 5 tabs, 4 themes, localStorage wiring"
```

---

## File Map

| File | Status | Purpose |
|---|---|---|
| `able-v3.html` | Create | Entire v3 build — self-contained, no external deps except Google Fonts |
| `docs/superpowers/specs/2026-03-10-able-v3-design.md` | Exists | Approved design spec — reference throughout |
| `able-merged.html` | Read-only reference | JS patterns for localStorage, mode switching, safeRender, applyAppearanceToRoot |

---

## Things NOT in this plan (future work)

- Admin editor panel (left-side wiring) — separate plan after v3 profile is complete
- Real artwork image upload — stub with gradient for now
- Real Spotify/YouTube embeds — stubbed as track rows
- Email capture / subscribe section
- QR code section
- about.html, login.html, 404.html
