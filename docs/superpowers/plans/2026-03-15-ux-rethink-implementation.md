# UX Rethink Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the dashboard, artist profile fan view, edit mode, and onboarding to match the approved UX rethink spec (`docs/superpowers/specs/2026-03-15-ux-rethink-design.md`).

**Architecture:** Three HTML files are modified directly — no build pipeline. `admin.html` gets a full light-theme dashboard overhaul. `able-v7.html` gets a new fan view (artist profile V2) plus a bottom-sheet edit mode replacing the existing edit panel. `start.html` gets a three-step V2 wizard replacing the current multi-step flow. All state stays in localStorage; keys are unchanged.

**Tech Stack:** Vanilla HTML/CSS/JS. Inline SVG for sparklines and timeline arc. Playwright MCP for smoke tests after each chunk. No npm, no bundler, no external dependencies beyond existing CDN fonts.

---

## Scope note

**Platform auto-import (Spotify/YouTube) is NOT in this plan.** It requires a Netlify serverless function that doesn't exist yet. The Settings → Connected platforms UI will show manual-entry fields with an "Auto-import coming soon" note. That is a separate infrastructure plan.

**Section ordering (drag-to-reorder sections on the artist page)** is an Artist-tier feature defined in spec §2.7 and §3.6. It is **NOT in this plan** — the default section order will be hardcoded and reordering deferred to a separate plan.

**Files touched:**
- `admin.html` — full dashboard rethink (Chunks 1 + 2 + 3 + 4 + 8)
- `able-v7.html` — artist profile V2 + edit mode V2 (Chunks 5 + 6)
- `start.html` — onboarding V2 (Chunk 7)
- `CLAUDE.md` — data architecture table must be updated before implementation (see below)

---

## New localStorage keys (register in CLAUDE.md before implementation)

Before any code is written, add these to the data architecture table in `CLAUDE.md`:

| Key | Contents | Used by |
|---|---|---|
| `able_shows` | Shows list `[{ venue, date, doorsTime, ticketUrl, featured }]` | admin.html, able-v7.html |
| `able_dismissed_nudges` | Array of dismissed nudge IDs `['presave-cta', 'add-show', ...]` | admin.html |
| `able_starred_fans` | Array of starred fan email strings `['fan@example.com']` | admin.html |

These will map 1:1 to Supabase tables (`shows`, `nudge_dismissals`, `starred_fans`) when backend lands. Do not rename.

---

## Chunk 1: Dashboard — CSS Tokens + Light Theme Shell

**Goal:** Replace admin.html's dark theme with the light-with-dark-brackets theme. Establish the CSS token layer.

**Files:**
- Modify: `admin.html` (CSS variables block, body background, topbar, bottom nav)

---

### Task 1.1: Add dashboard CSS tokens

- [ ] **Step 1: Open admin.html and find the CSS variables block**

  Search for `:root {` — the existing token block. It will contain `--bg: #09090f`, `--acc: #f4b942`, etc.

- [ ] **Step 2: Add the dashboard-specific tokens after the existing variables**

  Insert these custom properties inside `:root {}`:

  ```css
  /* Dashboard light-theme tokens */
  --dash-bg:     #e8e4dd;
  --dash-card:   #ffffff;
  --dash-border: #d4cfc8;
  --dash-shell:  #1a1a2e;
  --dash-field:  #f5f2ee;
  --dash-amber:  #f4b942;
  --dash-green:  #1e9650;
  --dash-red:    #c04030;

  /* Source badge colours (canonical) */
  --source-ig:      #e1306c;
  --source-sp:      #1ed760;
  --source-tt:      #888888;
  --source-direct:  #999999;
  ```

- [ ] **Step 3: Switch body background**

  Find `body { background: var(--bg)` (or `background: #09090f`) and change it to `background: var(--dash-bg)`.

- [ ] **Step 4: Set topbar background to --dash-shell**

  Find the `.topbar` or `#topbar` rule. Change `background` to `var(--dash-shell)`. Ensure topbar text is white (`color: #fff`).

- [ ] **Step 5: Set bottom nav / sidebar background to --dash-shell**

  Find the `.bottom-nav`, `.sidebar`, or `nav` rule that controls the bottom navigation. Change its background to `var(--dash-shell)`. Ensure nav items are `color: rgba(255,255,255,0.6)` with active item `color: var(--dash-amber)`.

- [ ] **Step 6: Smoke test**

  Open admin.html in browser (or via Playwright snapshot). Verify:
  - Page background is warm off-white (#e8e4dd)
  - Topbar is dark (#1a1a2e)
  - Bottom nav is dark (#1a1a2e)
  - No horizontal scrollbar at 390px width

- [ ] **Step 7: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): light theme shell — dash tokens + dark brackets"
  ```

---

### Task 1.2: Make stat cards white

- [ ] **Step 1: Find stat card CSS**

  Search for `.stat-card` or the class applied to the four stat blocks (`statViews`, `statClicks`, `statFans`, etc.). Find the background rule.

- [ ] **Step 2: Set stat card backgrounds to --dash-card**

  ```css
  .stat-card {
    background: var(--dash-card);
    border: none;
    border-radius: 12px;
  }
  ```

- [ ] **Step 3: Set stat text colours for light background**

  Big numbers: `color: #1a1a2e` (dark, high contrast on white)
  Labels (10px uppercase): `color: #bbb`
  Delta badge (up): `color: var(--dash-green)`
  Delta badge (neutral): `color: #bbb`

- [ ] **Step 4: Add --dash-border gaps between cards**

  The four stat cards sit in a row. Replace any dark gap colour with `var(--dash-border)`. If using a gap via `column-gap` or `border`, update to `#d4cfc8`.

- [ ] **Step 5: Smoke test** — verify white cards, readable numbers, coloured deltas.

- [ ] **Step 6: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): white stat cards with dash-border gaps"
  ```

---

### Task 1.3: White campaign strip card

- [ ] **Step 1: Find `#campaignHQ` or `.campaign-hq`**

  This is the current Campaign HQ block with mode pills.

- [ ] **Step 2: Set background to --dash-card**

  ```css
  .campaign-hq, #campaignHQ {
    background: var(--dash-card);
    border-radius: 14px;
    border: none;
    padding: 16px;
    margin-bottom: 12px;
  }
  ```

- [ ] **Step 3: Smoke test** — campaign strip is now white, not dark.

- [ ] **Step 4: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): white campaign strip card"
  ```

---

## Chunk 2: Dashboard — Release Timeline Arc

**Goal:** Replace the four mode-selector pills in the campaign strip with a visual timeline arc showing Announce → Pre-release → Release day → After, with amber fill to current node.

**Files:**
- Modify: `admin.html` (campaign HQ HTML + CSS + JS)

---

### Task 2.1: Build the timeline arc HTML

- [ ] **Step 1: Find the existing campaign mode pills**

  Search for `chqStatePill` or the four mode buttons. Note the wrapping element.

- [ ] **Step 2: Replace the pills with the timeline arc structure**

  Replace the pills block with:

  ```html
  <!-- Release timeline arc -->
  <div class="timeline-arc" id="timelineArc">
    <div class="arc-header">
      <span class="arc-mode-badge" id="arcModeBadge">Profile</span>
      <span class="arc-countdown" id="arcCountdown"></span>
    </div>
    <div class="arc-track">
      <div class="arc-fill" id="arcFill"></div>
      <button class="arc-node" id="arcNode0" data-mode="profile" aria-label="Announce">
        <span class="arc-dot"></span>
        <span class="arc-label">Announce</span>
      </button>
      <button class="arc-node" id="arcNode1" data-mode="pre-release" aria-label="Pre-release">
        <span class="arc-dot"></span>
        <span class="arc-label">Pre-release</span>
      </button>
      <button class="arc-node" id="arcNode2" data-mode="live" aria-label="Release day">
        <span class="arc-dot"></span>
        <span class="arc-label">Release day</span>
      </button>
      <button class="arc-node" id="arcNode3" data-mode="after" aria-label="After">
        <span class="arc-dot"></span>
        <span class="arc-label">After</span>
      </button>
    </div>
  </div>
  ```

- [ ] **Step 3: Write the timeline arc CSS**

  Add to admin.html `<style>`:

  ```css
  .timeline-arc { margin-bottom: 12px; }

  .arc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .arc-mode-badge {
    background: var(--dash-amber);
    color: #1a1a2e;
    font-size: 10px;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .arc-countdown {
    font-size: 11px;
    color: #888;
    font-weight: 600;
  }

  .arc-track {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 4px;
  }

  /* The track line */
  .arc-track::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 9px;
    right: 9px;
    height: 2px;
    background: var(--dash-border);
    border-radius: 1px;
    z-index: 0;
  }

  /* Amber fill — width set by JS */
  .arc-fill {
    position: absolute;
    top: 9px;
    left: 9px;
    height: 2px;
    background: var(--dash-amber);
    border-radius: 1px;
    z-index: 1;
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 0%;
  }

  .arc-node {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    min-width: 48px;
  }

  .arc-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--dash-border);
    background: var(--dash-card);
    display: block;
    transition: all 0.2s ease;
  }

  .arc-node.done .arc-dot {
    background: var(--dash-amber);
    border-color: var(--dash-amber);
  }

  .arc-node.active .arc-dot {
    background: var(--dash-amber);
    border-color: var(--dash-amber);
    box-shadow: 0 0 0 4px rgba(244,185,66,0.25);
  }

  .arc-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #aaa;
    font-weight: 600;
    white-space: nowrap;
  }

  .arc-node.active .arc-label { color: var(--dash-amber); }
  .arc-node.done .arc-label { color: #888; }
  ```

- [ ] **Step 4: Commit structure**

  ```bash
  git add admin.html
  git commit -m "feat(admin): timeline arc HTML + CSS structure"
  ```

---

### Task 2.2: Wire timeline arc JS

- [ ] **Step 1: Find the existing JS that reads/writes campaign state**

  Search for `stateOverride` or `chqStatePill` in the `<script>` block. Note which function renders the current state.

- [ ] **Step 2: Verify or define `computeAutoState`**

  Search admin.html for a function called `computeAutoState` or equivalent auto-switch logic. If it exists, note its name and use it. If it doesn't exist, define it:

  ```js
  function computeAutoState(profile) {
    if (!profile.releaseDate) return 'profile';
    const now = Date.now();
    const release = new Date(profile.releaseDate).getTime();
    if (now < release) return 'pre-release';
    if (now < release + 14 * 86400000) return 'live';
    return 'profile'; // post-14-day = back to profile mode
  }
  ```

  > **Note:** The timeline arc shows an "After" node visually, but "After" is not a valid `stateOverride` value. Internally, "After" = `profile` mode (the post-release default). The arc node displays it as "After" for clarity, but the underlying state is `profile`.

- [ ] **Step 3: Write the `renderTimelineArc()` function**

  Add this function near the campaign HQ JS:

  ```js
  function renderTimelineArc() {
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    // Compute display mode — 'after' is a display alias for 'profile' post-release
    const rawMode = profile.stateOverride || computeAutoState(profile);
    const isPostRelease = !profile.stateOverride && profile.releaseDate &&
      Date.now() >= new Date(profile.releaseDate).getTime() + 14 * 86400000;
    const displayMode = isPostRelease ? 'after' : rawMode;

    const modeIndex = { profile: 0, 'pre-release': 1, live: 2, after: 3 };
    const activeIdx = modeIndex[displayMode] ?? 0;

    const nodes = document.querySelectorAll('.arc-node');
    nodes.forEach((node, i) => {
      node.classList.remove('done', 'active');
      if (i < activeIdx) node.classList.add('done');
      if (i === activeIdx) node.classList.add('active');
    });

    // Fill width: 0% at node 0, 33% at node 1, 66% at node 2, 100% at node 3
    const fillPct = [0, 33, 66, 100][activeIdx];
    const fill = document.getElementById('arcFill');
    if (fill) fill.style.width = fillPct + '%';

    // Mode badge
    const badge = document.getElementById('arcModeBadge');
    const modeLabels = { profile: 'Profile', 'pre-release': 'Pre-release', live: 'Live', after: 'After' };
    if (badge) badge.textContent = modeLabels[displayMode] || 'Profile';

    // Countdown
    const countdown = document.getElementById('arcCountdown');
    if (countdown && profile.releaseDate) {
      const msLeft = new Date(profile.releaseDate) - Date.now();
      if (msLeft > 0) {
        const daysLeft = Math.ceil(msLeft / 86400000);
        const title = profile.releaseTitle || 'Your release';
        countdown.textContent = `${title} drops in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} →`;
      } else {
        countdown.textContent = '';
      }
    }
  }
  ```

- [ ] **Step 4: Wire node click handlers to switch mode**

  After the function definition:

  ```js
  document.querySelectorAll('.arc-node').forEach(node => {
    node.addEventListener('click', () => {
      const mode = node.dataset.mode;
      const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
      // 'after' is display-only — maps to 'profile' as stateOverride
      profile.stateOverride = (mode === 'after') ? 'profile' : mode;
      localStorage.setItem('able_v3_profile', JSON.stringify(profile));
      renderTimelineArc();
    });
  });
  ```

- [ ] **Step 5: Call `renderTimelineArc()` on page load**

  Find the existing init function (likely `initDashboard()` or `window.addEventListener('load', ...)`). Add `renderTimelineArc()` to it.

- [ ] **Step 5: Playwright smoke test**

  ```js
  // Verify timeline arc renders and active node has amber dot
  await page.goto('http://localhost/admin.html');
  const activeNode = await page.locator('.arc-node.active');
  await expect(activeNode).toBeVisible();
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): timeline arc JS — mode switch + countdown"
  ```

---

## Chunk 3: Dashboard — Sparklines + Nudge Card + Two-Column Fan Body

**Goal:** Add 7-day inline SVG sparklines to each stat card, add the contextual nudge card, and rebuild the lower body as a two-column layout (latest fans | taps today).

**Files:**
- Modify: `admin.html`

---

### Task 3.1: Inline SVG sparklines

- [ ] **Step 1: Add sparkline container to each stat card**

  For each stat card (`statViews`, `statFans`, `statClicks`, fourth card), add inside the card:

  ```html
  <svg class="sparkline" viewBox="0 0 60 24" preserveAspectRatio="none"
       aria-hidden="true" id="spark-views">
    <polyline class="spark-line" points="" fill="none" stroke="var(--dash-amber)"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  ```

  (Use `spark-fans` and `spark-clicks` for the other cards. Fourth card — "Top action today" — no sparkline, text only.)

- [ ] **Step 2: CSS for sparklines**

  ```css
  .sparkline {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 60px;
    height: 24px;
    opacity: 0.7;
  }
  .stat-card { position: relative; overflow: hidden; }
  ```

- [ ] **Step 3: Write `renderSparkline(id, data, colour)` function**

  ```js
  function renderSparkline(svgId, data, colour) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const line = svg.querySelector('.spark-line');
    if (!data || data.length === 0) { line.setAttribute('points', ''); return; }
    const max = Math.max(...data, 1);
    const w = 60, h = 24;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / max) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    line.setAttribute('points', pts);
    if (colour) line.setAttribute('stroke', colour);
  }
  ```

- [ ] **Step 4: Call with 7-day data derived from localStorage**

  After `renderStats()` (or wherever stat values are computed), add:

  ```js
  // Build 7-day buckets from able_views
  function get7DayBuckets(events) {
    const buckets = Array(7).fill(0);
    const now = Date.now();
    (events || []).forEach(e => {
      const daysAgo = Math.floor((now - e.ts) / 86400000);
      if (daysAgo >= 0 && daysAgo < 7) buckets[6 - daysAgo]++;
    });
    return buckets;
  }

  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  const fans  = JSON.parse(localStorage.getItem('able_fans')  || '[]');
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');

  renderSparkline('spark-views',  get7DayBuckets(views),  'var(--dash-amber)');
  renderSparkline('spark-fans',   get7DayBuckets(fans.map(f => ({ ts: f.ts }))), 'var(--dash-green)');
  renderSparkline('spark-clicks', get7DayBuckets(clicks), '#999');
  ```

- [ ] **Step 5: Smoke test** — open admin.html, verify three sparkline SVGs render in top-right of their cards.

- [ ] **Step 6: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): inline SVG sparklines on stat cards"
  ```

---

### Task 3.2: Nudge card

- [ ] **Step 1: Add nudge card HTML after stat cards**

  After the stat cards grid, before the fan body section, add:

  ```html
  <div class="nudge-card" id="nudgeCard" style="display:none;">
    <div class="nudge-body">
      <span class="nudge-text" id="nudgeText"></span>
      <a class="nudge-action" id="nudgeAction" href="#"></a>
    </div>
    <button class="nudge-dismiss" id="nudgeDismiss" aria-label="Dismiss">✕</button>
  </div>
  ```

- [ ] **Step 2: CSS for nudge card**

  ```css
  .nudge-card {
    background: var(--dash-card);
    border: 1.5px solid var(--dash-border);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .nudge-body { flex: 1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .nudge-text { font-size: 13px; color: #333; }
  .nudge-action {
    font-size: 12px;
    font-weight: 700;
    color: var(--dash-amber);
    text-decoration: none;
    white-space: nowrap;
  }
  .nudge-dismiss {
    background: none;
    border: none;
    color: #aaa;
    font-size: 14px;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 3: Write `evaluateNudge()` function**

  ```js
  function evaluateNudge() {
    const dismissed = JSON.parse(localStorage.getItem('able_dismissed_nudges') || '[]');
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');

    const nudges = [
      // Release approaching but CTA not pre-save
      () => {
        if (!profile.releaseDate) return null;
        const daysLeft = Math.ceil((new Date(profile.releaseDate) - Date.now()) / 86400000);
        if (daysLeft > 0 && daysLeft <= 14 && profile.primaryCta !== 'presave') {
          return {
            id: 'presave-cta',
            text: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} to release — your hero button isn't set to Pre-save.`,
            action: 'Switch to Pre-save →',
            href: '/able-v7.html?edit=1#ctas'
          };
        }
        return null;
      },
      // Fan list approaching free tier limit
      () => {
        if (fans.length >= 80 && fans.length < 100) {
          return {
            id: 'fan-limit',
            text: `Your list is nearly full — ${fans.length} people who asked to hear from you.`,
            action: "Don't leave them waiting →",
            href: '#upgrade'
          };
        }
        return null;
      },
      // No shows added
      () => {
        const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
        if (shows.length === 0 && !dismissed.includes('add-show')) {
          return {
            id: 'add-show',
            text: 'Playing anywhere soon? Add a show — fans on your page see it automatically.',
            action: 'Add a show →',
            href: '#shows'
          };
        }
        return null;
      }
    ];

    // First nudge that returns a value and hasn't been dismissed
    for (const fn of nudges) {
      const n = fn();
      if (n && !dismissed.includes(n.id)) {
        showNudge(n);
        return;
      }
    }
    // No nudge to show
    document.getElementById('nudgeCard').style.display = 'none';
  }

  function showNudge({ id, text, action, href }) {
    const card = document.getElementById('nudgeCard');
    document.getElementById('nudgeText').textContent = text;
    const actionEl = document.getElementById('nudgeAction');
    actionEl.textContent = action;
    actionEl.href = href;
    card.style.display = 'flex';
    card.dataset.nudgeId = id;
  }

  document.getElementById('nudgeDismiss').addEventListener('click', () => {
    const id = document.getElementById('nudgeCard').dataset.nudgeId;
    if (id) {
      const dismissed = JSON.parse(localStorage.getItem('able_dismissed_nudges') || '[]');
      dismissed.push(id);
      localStorage.setItem('able_dismissed_nudges', JSON.stringify(dismissed));
    }
    document.getElementById('nudgeCard').style.display = 'none';
  });
  ```

- [ ] **Step 4: Call `evaluateNudge()` on page load** — add it to the init function.

- [ ] **Step 5: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): contextual nudge card — one at a time, dismissible"
  ```

---

### Task 3.3: Two-column fan body

- [ ] **Step 1: Find the existing fan list section on the home page**

  Search for `yw-section` or the block that shows recent fans / click data on the home page.

- [ ] **Step 2: Replace with the two-column layout**

  ```html
  <div class="fan-body" id="fanBody">
    <!-- Left: Latest fans -->
    <div class="fan-col">
      <div class="col-header">Latest fans</div>
      <div id="latestFansList" class="fan-rows"></div>
      <a class="col-footer-link" id="viewAllFansLink" href="#">View all — fans →</a>
    </div>
    <!-- Right: Taps today -->
    <div class="fan-col">
      <div class="col-header">What fans tapped today</div>
      <div id="tapsTodayList" class="fan-rows"></div>
    </div>
  </div>
  ```

- [ ] **Step 3: CSS for the two-column layout**

  ```css
  .fan-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .fan-col {
    background: var(--dash-card);
    border-radius: 12px;
    padding: 14px;
    min-height: 160px;
  }

  .col-header {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #aaa;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .fan-rows { display: flex; flex-direction: column; gap: 8px; }

  .fan-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }

  .fan-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 11px;
    color: #fff;
    flex-shrink: 0;
  }

  .fan-email { flex: 1; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .fan-time { font-size: 10px; color: #aaa; white-space: nowrap; }

  .source-badge {
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 8px;
    color: #fff;
    flex-shrink: 0;
  }
  .source-badge.ig { background: var(--source-ig); }
  .source-badge.sp { background: var(--source-sp); color: #000; }
  .source-badge.tt { background: var(--source-tt); }
  .source-badge.direct { background: var(--source-direct); }

  .tap-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .tap-label { font-size: 12px; color: #333; }
  .tap-count { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 20px; color: #1a1a2e; }

  .col-footer-link {
    display: block;
    margin-top: 10px;
    font-size: 11px;
    font-weight: 700;
    color: var(--dash-amber);
    text-decoration: none;
  }

  /* Unconfirmed fan (GDPR double opt-in pending) */
  .fan-avatar--unconfirmed {
    background: none;
    border: 2px dashed #ccc;
    color: #ccc;
    font-size: 16px;
  }
  .unconfirmed-label {
    font-size: 9px;
    color: #aaa;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  ```

- [ ] **Step 4: Write `renderFanBody()` function**

  ```js
  function renderFanBody() {
    const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
    const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');

    // Latest fans — last 5, newest first
    const recent = [...fans].sort((a, b) => b.ts - a.ts).slice(0, 5);
    const fansList = document.getElementById('latestFansList');
    if (fansList) {
      fansList.innerHTML = recent.length ? recent.map(f => {
        const initial = (f.email || '?')[0].toUpperCase();
        const sourceClass = (f.source || 'direct').toLowerCase().replace('instagram','ig').replace('spotify','sp').replace('tiktok','tt');
        const colours = ['#e05242','#4e7cff','#9b59b6','#27ae60','#e67e22'];
        const colour = colours[initial.charCodeAt(0) % colours.length];
        const timeAgo = formatTimeAgo(f.ts);
        return `<div class="fan-row">
          <div class="fan-avatar" style="background:${colour}">${initial}</div>
          <span class="fan-email">${f.email || ''}</span>
          <span class="source-badge ${sourceClass}">${sourceClass.toUpperCase()}</span>
          <span class="fan-time">${timeAgo}</span>
        </div>`;
      }).join('') : '<div style="color:#aaa;font-size:12px;">No fans yet — share your link.</div>';
    }

    // View all link
    const viewAll = document.getElementById('viewAllFansLink');
    if (viewAll) viewAll.textContent = `View all ${fans.length} fans →`;

    // Taps today
    const midnight = new Date(); midnight.setHours(0,0,0,0);
    const todayClicks = clicks.filter(c => c.ts >= midnight.getTime());
    const tapCounts = {};
    todayClicks.forEach(c => { tapCounts[c.label] = (tapCounts[c.label] || 0) + 1; });
    const sorted = Object.entries(tapCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const tapsList = document.getElementById('tapsTodayList');
    if (tapsList) {
      tapsList.innerHTML = sorted.length ? sorted.map(([label, count]) =>
        `<div class="tap-row">
          <span class="tap-label">${label}</span>
          <span class="tap-count">${count}</span>
        </div>`
      ).join('') : '<div style="color:#aaa;font-size:12px;">No taps yet today.</div>';
    }
  }

  function formatTimeAgo(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    return Math.floor(diff / 86400000) + 'd ago';
  }
  ```

- [ ] **Step 5: Call `renderFanBody()` on init.**

- [ ] **Step 6: Smoke test** — two white columns appear below stat cards.

- [ ] **Step 7: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): two-column fan body — latest fans + taps today"
  ```

---

## Chunk 4: Dashboard — Bottom Nav Labels + Topbar CTA

**Goal:** Update the bottom nav labels to artist voice (`Today · Fans · Snaps · Shows · Settings`) and add the "Edit page →" amber CTA to the topbar.

**Files:**
- Modify: `admin.html`

---

### Task 4.1: Bottom nav labels

- [ ] **Step 1: Find the bottom nav items**

  Search for the nav buttons or anchor tags that currently read "Overview", "Home", or similar.

- [ ] **Step 2: Update labels**

  | Old label | New label |
  |---|---|
  | Overview / Home | Today |
  | Fans / List | Fans |
  | Moments / Snaps | Snaps |
  | Shows / Events | Shows |
  | Settings / More | Settings |

  The nav item IDs / onclick targets don't change — only the visible text label.

- [ ] **Step 3: Update active item styling**

  Active nav item: `color: var(--dash-amber)` + `background: rgba(244,185,66,0.1)` on the icon area.

- [ ] **Step 4: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): bottom nav labels — artist voice (Today/Fans/Snaps/Shows/Settings)"
  ```

---

### Task 4.2: "Edit page →" topbar CTA

- [ ] **Step 1: Find the topbar HTML (search for `topbar` or `#topbar`)**

- [ ] **Step 2: Add "Edit page →" button to topbar right**

  ```html
  <a class="topbar-edit-cta" href="/able-v7.html?edit=1" id="topbarEditCta">Edit page →</a>
  ```

- [ ] **Step 3: CSS**

  ```css
  .topbar-edit-cta {
    background: var(--dash-amber);
    color: #1a1a2e;
    font-size: 12px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 20px;
    text-decoration: none;
    white-space: nowrap;
  }
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): topbar Edit page CTA → able-v7.html?edit=1"
  ```

---

## Chunk 5: Artist Profile V2 — Fan View (able-v7.html)

**Goal:** Upgrade the fan-facing artist profile: full-bleed top card with ambient glow, enforced CTA hierarchy, music section Option C (release cards), "Stay close." fan capture copy, Videos section.

**Files:**
- Modify: `able-v7.html`

---

### Task 5.1: Top card ambient glow

- [ ] **Step 1: Find `#hero` and `.hero__artwork`**

- [ ] **Step 2: Add ambient glow element after the artwork**

  Inside `#hero`, after `<img class="hero__artwork">`:

  ```html
  <div class="hero__ambient-glow" id="heroAmbientGlow" aria-hidden="true"></div>
  ```

- [ ] **Step 3: CSS for ambient glow**

  ```css
  .hero__ambient-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: radial-gradient(ellipse at center bottom, var(--ambient-colour, rgba(0,0,0,0)) 0%, transparent 70%);
    pointer-events: none;
    transition: --ambient-colour 1s ease;
  }
  ```

- [ ] **Step 4: Extract dominant colour from artwork and apply to glow**

  After artwork loads, add to the JS that renders the hero:

  ```js
  function extractAmbientColour(imgEl) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 4; canvas.height = 4;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, 4, 4);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `rgba(${r},${g},${b},0.6)`;
    } catch (e) {
      // CORS failure — degrade silently
      return 'rgba(0,0,0,0)';
    }
  }

  const artwork = document.getElementById('hero-artwork');
  if (artwork && artwork.complete) {
    const colour = extractAmbientColour(artwork);
    document.getElementById('heroAmbientGlow').style.setProperty('--ambient-colour', colour);
  } else if (artwork) {
    artwork.addEventListener('load', () => {
      const colour = extractAmbientColour(artwork);
      document.getElementById('heroAmbientGlow').style.setProperty('--ambient-colour', colour);
    });
  }
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(profile): ambient glow extracted from artwork, CORS-safe"
  ```

---

### Task 5.2: CTA hierarchy — primary solid, secondary ghost

- [ ] **Step 1: Find the hero CTA rendering JS**

  Search for `primaryCta` or the function that renders the hero action buttons.

- [ ] **Step 2: Enforce primary = solid accent, secondary = ghost**

  Ensure the primary CTA uses:
  ```css
  /* Primary hero CTA */
  .hero-cta--primary {
    background: var(--color-accent);
    color: #fff;
    width: 100%;
    height: 44px;
    border-radius: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 18px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  /* Secondary hero CTA */
  .hero-cta--secondary {
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1.5px solid rgba(255,255,255,0.3);
    width: 100%;
    height: 44px;
    border-radius: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  ```

- [ ] **Step 3: Ensure secondary CTA never renders as filled**

  In the JS rendering function, explicitly add `hero-cta--primary` to the first CTA and `hero-cta--secondary` to the second. Remove any logic that makes them equal weight.

- [ ] **Step 4: Enforce max 4 link pills with overflow**

  Find the quick-links / pills rendering code. After building the array of platform pills, if count > 4:

  ```js
  const visiblePills = pills.slice(0, 4);
  const hiddenCount = pills.length - 4;
  if (hiddenCount > 0) {
    visiblePills.push({ label: `+${hiddenCount} more`, overflow: true });
  }
  ```

  The overflow pill, when tapped, expands to show all.

- [ ] **Step 5: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(profile): CTA hierarchy — primary solid, secondary ghost, max 4 pills"
  ```

---

### Task 5.3: Music section — Option C release cards

- [ ] **Step 1: Find the music section rendering code**

  Search for `previewMusicSection` or the function that renders releases.

- [ ] **Step 2: Replace the track-list render with release card render**

  For each release, render:

  ```js
  function renderReleaseCard(release) {
    const hasVideo = !!release.videoUrl;
    const borderColour = hasVideo ? '#7c3aed' : '#1e9650'; // purple if video, green if audio only
    const watchBtn = hasVideo
      ? `<a class="release-watch-btn" href="${release.videoUrl}" target="_blank" rel="noopener">▶ Watch</a>`
      : '';

    return `<div class="release-card" style="border-left: 3px solid ${borderColour}">
      <img class="release-thumb" src="${release.artwork || ''}" alt="${release.title}" loading="lazy">
      <div class="release-info">
        <div class="release-title">${release.title || 'Untitled'}</div>
        <div class="release-meta">${release.type || 'Single'} · ${new Date(release.date || Date.now()).getFullYear()}</div>
        <div class="release-actions">
          <a class="release-stream-btn" href="${release.streamUrl || '#'}" target="_blank" rel="noopener">▶ Stream</a>
          ${watchBtn}
        </div>
      </div>
    </div>`;
  }
  ```

- [ ] **Step 3: Add release card CSS**

  ```css
  .release-card {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 10px 12px;
    background: var(--color-card);
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .release-thumb {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    object-fit: cover;
    flex-shrink: 0;
    background: #333;
  }

  .release-info { flex: 1; min-width: 0; }

  .release-title {
    font-size: 10px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .release-meta { font-size: 8px; color: rgba(255,255,255,0.45); margin-bottom: 6px; }

  .release-actions { display: flex; gap: 6px; }

  .release-stream-btn {
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    background: var(--color-accent);
    color: #fff;
    text-decoration: none;
  }

  .release-watch-btn {
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.25);
    text-decoration: none;
  }
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(profile): music section Option C — release cards with Stream/Watch split"
  ```

---

### Task 5.4: Fan-facing events section

Spec §3.4 — update the events/shows section in able-v7.html to use the new card style.

- [ ] **Step 1: Find the events section render function in able-v7.html**

  Search for `events`, `shows`, or `bento` in the JS. Note the render function name.

- [ ] **Step 2: Update featured show to render as a large card**

  ```js
  function renderFeaturedShow(show) {
    if (!show) return '';
    const date = new Date(show.date);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const gigActive = localStorage.getItem('able_gig_expires') &&
      parseInt(localStorage.getItem('able_gig_expires')) > Date.now();

    return `<div class="featured-show-card">
      ${gigActive ? '<span class="tonight-badge" aria-label="Tonight">TONIGHT</span>' : ''}
      <div class="show-date-block">
        <span class="show-day">${day}</span>
        <span class="show-month">${month}</span>
      </div>
      <div class="show-info">
        <div class="show-venue">${show.venue}</div>
        <div class="show-doors">Doors ${show.doorsTime || ''}</div>
      </div>
      <a class="show-tickets-btn" href="${show.ticketUrl}" target="_blank" rel="noopener">Get tickets →</a>
    </div>`;
  }
  ```

- [ ] **Step 3: Update additional shows to compact rows**

  ```js
  function renderAdditionalShow(show) {
    const date = new Date(show.date);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    return `<div class="compact-show-row">
      <div class="show-date-block show-date-block--sm">
        <span class="show-day">${day}</span>
        <span class="show-month">${month}</span>
      </div>
      <span class="show-venue">${show.venue}</span>
      <a class="compact-tickets" href="${show.ticketUrl}" target="_blank" rel="noopener">Tickets →</a>
    </div>`;
  }
  ```

- [ ] **Step 4: Add "TONIGHT" badge CSS + pulsing animation**

  ```css
  .tonight-badge {
    background: var(--dash-amber, #f4b942);
    color: #1a1a2e;
    font-size: 9px;
    font-weight: 900;
    padding: 3px 8px;
    border-radius: 8px;
    letter-spacing: 0.08em;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .show-date-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 36px;
  }
  .show-day {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 28px;
    color: var(--color-accent);
    line-height: 1;
  }
  .show-month { font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.5); }
  .show-date-block--sm .show-day { font-size: 18px; }

  .show-tickets-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background: var(--color-accent);
    color: #fff;
    text-align: center;
    border-radius: 8px;
    font-weight: 800;
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
  }
  .compact-tickets {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-accent);
    text-decoration: none;
    margin-left: auto;
  }
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(profile): events section — featured card, compact rows, TONIGHT badge"
  ```

---

### Task 5.5: "Stay close." fan capture copy + GDPR opt-in

- [ ] **Step 1: Find the fan capture section HTML**

  Search for "Join the list" or "Subscribe" or the `#fan-capture` section.

- [ ] **Step 2: Update copy**

  | Old | New |
  |---|---|
  | Any heading like "Join the list" / "Sign up" | "Stay close." |
  | Sub-copy like "Get updates" | "No noise. Just the things that matter." |
  | Button: "Subscribe" / "Sign up" / "Join" | "I'm in" |

- [ ] **Step 3: Make heading and sub-copy respect artist's custom copy from profile**

  ```js
  const heading = profile.fanCaptureHeading || 'Stay close.';
  const sub = profile.fanCaptureSub || 'No noise. Just the things that matter.';
  ```

- [ ] **Step 4: Update the fan sign-up submit handler to write `confirmed: false`**

  Find the JS that writes to `able_fans` on form submit. Change it from:

  ```js
  fans.push({ email, ts: Date.now(), source });
  ```

  To:

  ```js
  fans.push({ email, ts: Date.now(), source, confirmed: false });
  ```

  > The confirmation email (double opt-in) is a backend concern — the field is written now so the schema is correct when Supabase lands. All existing fans without a `confirmed` field are treated as confirmed (legacy data).

- [ ] **Step 5: Show optimistic success state after submit**

  After pushing the fan, replace the form with:

  ```html
  <div class="fan-capture-success">
    <div class="fc-success-headline">You're in — check your inbox.</div>
    <div class="fc-success-sub">We'll send you a confirmation link.</div>
  </div>
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(profile): fan capture — Stay close copy, confirmed:false GDPR field, optimistic success"
  ```

---

### Task 5.5: Videos section

- [ ] **Step 1: Find where the Videos section currently renders** (if it exists) or identify where to insert it (below Music section).

- [ ] **Step 2: Add videos section render function**

  Only renders if `profile.videos` array is non-empty.

  ```js
  function renderVideosSection(videos) {
    const section = document.getElementById('videos-section');
    if (!videos || videos.length === 0) { if (section) section.hidden = true; return; }
    if (section) section.hidden = false;
    const list = document.getElementById('videos-list');
    if (!list) return;
    list.innerHTML = videos.map(v => `
      <a class="video-entry" href="${v.url}" target="_blank" rel="noopener">
        <div class="video-thumb-wrap">
          <img class="video-thumb" src="${v.thumbnail || ''}" alt="${v.title}" loading="lazy">
          <div class="video-play-overlay">▶</div>
        </div>
        <div class="video-info">
          <div class="video-title">${v.title}</div>
          <div class="video-meta">${v.duration || ''} · YouTube →</div>
        </div>
      </a>
    `).join('');
  }
  ```

- [ ] **Step 3: Add HTML placeholder for the section**

  Below the music section in the DOM:

  ```html
  <section id="videos-section" hidden aria-label="Videos">
    <div class="section-header">Videos</div>
    <div id="videos-list"></div>
  </section>
  ```

- [ ] **Step 4: CSS**

  ```css
  .video-entry {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 0;
    text-decoration: none;
    color: inherit;
  }
  .video-thumb-wrap { position: relative; flex-shrink: 0; }
  .video-thumb { width: 60px; height: 36px; border-radius: 5px; object-fit: cover; background: #222; display: block; }
  .video-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
  }
  .video-title { font-size: 11px; font-weight: 700; color: #fff; margin-bottom: 2px; }
  .video-meta { font-size: 9px; color: rgba(255,255,255,0.45); }
  ```

- [ ] **Step 5: Call `renderVideosSection(profile.videos)` in the main render function.**

- [ ] **Step 6: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(profile): Videos section — standalone video content, hidden when empty"
  ```

---

## Chunk 6: Edit Mode V2 (able-v7.html)

**Goal:** Replace the existing edit panel/FAB with: dashed amber rings on editable zones, a floating Edit/Fan view pill at bottom-right, and a bottom sheet that slides up when any zone is tapped.

**Files:**
- Modify: `able-v7.html`

---

### Task 6.1: ?edit=1 URL param + auth gate

- [ ] **Step 1: Find the existing edit mode activation code**

  Search for `edit-fab` or `editMode` or `owner-bar`. Note how edit mode is currently triggered.

- [ ] **Step 2: Add URL param check at page init**

  At the top of the main `<script>`, before any profile render:

  ```js
  const EDIT_MODE = new URLSearchParams(location.search).get('edit') === '1';

  if (EDIT_MODE) {
    // Auth gate: check for session token
    const session = localStorage.getItem('able_session');
    if (!session) {
      // No session — redirect to magic link prompt
      location.href = '/start.html?return=' + encodeURIComponent(location.href);
    } else {
      document.documentElement.classList.add('edit-active');
    }
  }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(edit): ?edit=1 URL param with session auth gate"
  ```

---

### Task 6.2: Floating Edit/Fan view pill

- [ ] **Step 1: Remove or hide the existing `#edit-fab` button when edit mode is active**

  Add to CSS: `.edit-active #edit-fab { display: none; }`

- [ ] **Step 2: Add floating pill HTML (always present, only visible in edit mode)**

  Before `</body>`:

  ```html
  <div class="edit-pill" id="editPill" hidden>
    <button class="pill-tab active" id="pillEditTab" aria-pressed="true">✎ Edit</button>
    <button class="pill-tab" id="pillFanTab" aria-pressed="false">👁 Fan view</button>
  </div>
  ```

- [ ] **Step 3: CSS for floating pill**

  ```css
  .edit-pill {
    position: fixed;
    bottom: 88px; /* above bottom nav */
    right: 16px;
    z-index: 9999;
    background: #1a1a2e;
    border-radius: 24px;
    display: flex;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }

  .pill-tab {
    background: none;
    border: none;
    color: rgba(255,255,255,0.5);
    font-size: 13px;
    font-weight: 700;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
  }

  .pill-tab.active {
    background: var(--color-accent, #f4b942);
    color: #1a1a2e;
    border-radius: 24px;
  }
  ```

- [ ] **Step 4: Show pill when edit mode is active**

  ```js
  if (EDIT_MODE) {
    document.getElementById('editPill').hidden = false;
  }
  ```

- [ ] **Step 5: Wire tab clicks**

  ```js
  const editTab = document.getElementById('pillEditTab');
  const fanTab = document.getElementById('pillFanTab');

  editTab.addEventListener('click', () => {
    document.documentElement.classList.add('edit-active');
    document.documentElement.classList.remove('fan-view-active');
    editTab.classList.add('active');
    fanTab.classList.remove('active');
    editTab.setAttribute('aria-pressed', 'true');
    fanTab.setAttribute('aria-pressed', 'false');
  });

  fanTab.addEventListener('click', () => {
    document.documentElement.classList.remove('edit-active');
    document.documentElement.classList.add('fan-view-active');
    fanTab.classList.add('active');
    editTab.classList.remove('active');
    fanTab.setAttribute('aria-pressed', 'true');
    editTab.setAttribute('aria-pressed', 'false');
  });
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(edit): floating Edit/Fan view pill at bottom-right"
  ```

---

### Task 6.3: Dashed amber rings + ✎ chip badges on editable zones

- [ ] **Step 1: Add `data-editable` attribute to each zone**

  Add `data-editable="top-card"` to the `#hero` element.
  Add `data-editable="hero-ctas"` to the CTA row container.
  Add `data-editable="link-pills"` to the pills row container.
  Add `data-editable="music"` to the music section.
  Add `data-editable="videos"` to the videos section.
  Add `data-editable="events"` to the events section.
  Add `data-editable="snap-cards"` to the snap cards section.
  Add `data-editable="fan-capture"` to the fan capture section.

- [ ] **Step 2: CSS for edit rings and chip badges (active only when `html.edit-active`)**

  ```css
  .edit-active [data-editable] {
    outline: 1.5px dashed rgba(244,185,66,0.7);
    outline-offset: 2px;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
  }

  .edit-active [data-editable]::after {
    content: '✎';
    position: absolute;
    top: 6px;
    right: 6px;
    background: #f4b942;
    color: #1a1a2e;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 6px;
    z-index: 10;
    pointer-events: none;
  }

  /* Fan view — no edit indicators */
  .fan-view-active [data-editable] { outline: none; cursor: default; }
  .fan-view-active [data-editable]::after { display: none; }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(edit): dashed amber rings + edit chip badges on editable zones"
  ```

---

### Task 6.4: Bottom sheet system

- [ ] **Step 1: Add bottom sheet HTML (single shared sheet, contents swapped by JS)**

  Before `</body>`:

  ```html
  <div class="bottom-sheet-backdrop" id="sheetBackdrop" hidden></div>
  <div class="bottom-sheet" id="bottomSheet" role="dialog" aria-modal="true" aria-label="Edit" hidden>
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-header">
      <span class="sheet-icon" id="sheetIcon"></span>
      <span class="sheet-title" id="sheetTitle"></span>
      <button class="sheet-close" id="sheetClose" aria-label="Close">✕</button>
    </div>
    <div class="sheet-body" id="sheetBody"></div>
    <div class="sheet-footer" id="sheetFooter">
      <span class="sheet-saved" id="sheetSaved" aria-live="polite"></span>
      <a class="sheet-preview" id="sheetPreview" href="#">Fan preview →</a>
    </div>
    <div class="sheet-actions" id="sheetActions">
      <button class="sheet-cancel" id="sheetCancel">Cancel</button>
      <button class="sheet-save" id="sheetSaveBtn">Save</button>
    </div>
  </div>
  ```

- [ ] **Step 2: Bottom sheet CSS**

  ```css
  .bottom-sheet-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
  }

  .bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 14px 14px 0 0;
    border-top: 1.5px solid #d4cfc8;
    z-index: 1001;
    max-height: 85vh;
    overflow-y: auto;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .bottom-sheet:not([hidden]) { transform: translateY(0); }

  .sheet-handle {
    width: 28px;
    height: 3px;
    background: #e0dbd4;
    border-radius: 2px;
    margin: 10px auto 0;
  }

  .sheet-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid #f0ede8;
  }

  .sheet-title { font-size: 14px; font-weight: 700; color: #1a1a2e; flex: 1; }

  .sheet-close {
    background: none;
    border: none;
    color: #aaa;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
  }

  .sheet-body { padding: 16px; }

  .sheet-field {
    margin-bottom: 14px;
  }

  .sheet-field label {
    display: block;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #bbb;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .sheet-field input,
  .sheet-field textarea,
  .sheet-field select {
    width: 100%;
    background: #f5f2ee;
    border: 1.5px solid #e0dbd4;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    color: #1a1a2e;
    box-sizing: border-box;
    font-family: inherit;
  }

  .sheet-field input:focus,
  .sheet-field textarea:focus {
    outline: none;
    border-color: #c4880a;
  }

  .sheet-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 16px 8px;
    font-size: 11px;
  }

  .sheet-saved { color: var(--dash-green, #1e9650); font-weight: 600; }

  .sheet-preview { color: #f4b942; font-weight: 700; text-decoration: none; }

  .sheet-actions {
    display: flex;
    gap: 10px;
    padding: 12px 16px;
    padding-bottom: max(16px, env(safe-area-inset-bottom));
    border-top: 1px solid #f0ede8;
  }

  .sheet-cancel {
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    background: #f5f2ee;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #555;
    cursor: pointer;
  }

  .sheet-save {
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    background: #1a1a2e;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }
  ```

- [ ] **Step 3: Bottom sheet open/close functions**

  ```js
  function openSheet(icon, title, bodyHTML, onSave) {
    document.getElementById('sheetIcon').textContent = icon;
    document.getElementById('sheetTitle').textContent = title;
    document.getElementById('sheetBody').innerHTML = bodyHTML;
    document.getElementById('sheetSaved').textContent = '';
    document.getElementById('bottomSheet').hidden = false;
    document.getElementById('sheetBackdrop').hidden = false;
    // Save handler
    document.getElementById('sheetSaveBtn').onclick = () => {
      if (onSave) onSave();
      showSaved();
    };
  }

  function closeSheet() {
    document.getElementById('bottomSheet').hidden = true;
    document.getElementById('sheetBackdrop').hidden = true;
  }

  function showSaved() {
    const el = document.getElementById('sheetSaved');
    el.textContent = 'Saved ✓';
    setTimeout(() => { el.textContent = ''; }, 2000);
  }

  document.getElementById('sheetClose').addEventListener('click', closeSheet);
  document.getElementById('sheetCancel').addEventListener('click', closeSheet);
  document.getElementById('sheetBackdrop').addEventListener('click', closeSheet);
  document.getElementById('sheetPreview').addEventListener('click', (e) => {
    e.preventDefault();
    closeSheet();
    document.getElementById('pillFanTab').click();
  });
  ```

- [ ] **Step 4: Wire zone taps to open the correct sheet**

  ```js
  if (EDIT_MODE) {
    document.addEventListener('click', (e) => {
      if (!document.documentElement.classList.contains('edit-active')) return;
      const zone = e.target.closest('[data-editable]');
      if (!zone) return;
      e.preventDefault();
      e.stopPropagation();
      openZoneSheet(zone.dataset.editable);
    });
  }

  function openZoneSheet(zone) {
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');

    const sheets = {
      'top-card': {
        icon: '🎨', title: 'Top card',
        body: `
          <div class="sheet-field">
            <label>Artist name</label>
            <input id="sf-name" value="${profile.name || ''}">
          </div>
          <div class="sheet-field">
            <label>Tagline</label>
            <input id="sf-tagline" value="${profile.tagline || ''}" placeholder="Optional one-liner">
          </div>
          <div class="sheet-field">
            <label>Accent colour</label>
            <input id="sf-accent" type="color" value="${profile.accent || '#e05242'}">
          </div>`,
        save: () => {
          profile.name = document.getElementById('sf-name').value;
          profile.tagline = document.getElementById('sf-tagline').value;
          profile.accent = document.getElementById('sf-accent').value;
          localStorage.setItem('able_v3_profile', JSON.stringify(profile));
          renderProfile(profile);
        }
      },
      'fan-capture': {
        icon: '📬', title: 'Fan sign-up',
        body: `
          <div class="sheet-field">
            <label>Heading</label>
            <input id="sf-fc-heading" value="${profile.fanCaptureHeading || 'Stay close.'}">
          </div>
          <div class="sheet-field">
            <label>Sub-copy</label>
            <input id="sf-fc-sub" value="${profile.fanCaptureSub || 'No noise. Just the things that matter.'}">
          </div>`,
        save: () => {
          profile.fanCaptureHeading = document.getElementById('sf-fc-heading').value;
          profile.fanCaptureSub = document.getElementById('sf-fc-sub').value;
          localStorage.setItem('able_v3_profile', JSON.stringify(profile));
          renderFanCapture(profile);
        }
      }
      // Additional zones (music, events, snap-cards, etc.) follow the same pattern.
      // Each zone gets icon, title, body HTML string, and save function.
    };

    const sheet = sheets[zone];
    if (!sheet) return;
    openSheet(sheet.icon, sheet.title, sheet.body, sheet.save);
  }
  ```

  > **Note:** Implement all zones from §2.7 of the spec using this same pattern. Each zone's `save` function reads field values and writes back to `localStorage`, then calls the relevant render function.

- [ ] **Step 5: Auto-save on blur for text fields within sheets**

  After `openSheet()` sets `innerHTML`, wire blur events:

  ```js
  function wireAutoSave(saveCallback) {
    document.querySelectorAll('#sheetBody input, #sheetBody textarea').forEach(input => {
      input.addEventListener('blur', saveCallback);
    });
    document.querySelectorAll('#sheetBody input[type="checkbox"], #sheetBody input[type="range"]').forEach(toggle => {
      toggle.addEventListener('change', saveCallback);
    });
  }
  ```

  Call `wireAutoSave(saveFn)` inside `openSheet()` after setting `innerHTML`.

- [ ] **Step 6: Smoke test**

  Via Playwright:
  - Navigate to `able-v7.html?edit=1` (set `able_session = 'test'` in localStorage first)
  - Verify dashed rings visible on `[data-editable]` elements
  - Tap `[data-editable="top-card"]` — verify sheet appears
  - Tap ✕ — verify sheet closes

- [ ] **Step 7: Commit**

  ```bash
  git add able-v7.html
  git commit -m "feat(edit): bottom sheet system — open/close, auto-save, fan preview"
  ```

---

## Chunk 7: Onboarding V2 (start.html)

**Goal:** Replace the current multi-step wizard with the three-step V2 flow: Step A (optional Spotify import), Step 1 (identity: name + vibe + colour), Step 2 (current moment), Step 3 (email / magic link), Done screen with share buttons.

**Files:**
- Modify: `start.html`

---

### Task 7.1: Audit current start.html wizard steps

- [ ] **Step 1: Read start.html and map the existing step structure**

  Search for `step` or `wizard` or `progress` to find how steps are rendered. Note which JS functions advance steps and which localStorage keys are written.

- [ ] **Step 2: Identify which steps to remove vs keep**

  Remove: any step asking for genre/vibe separately from the identity step, any bio/location step, any optional extras that are not the 3 required steps.
  Keep: progress bar, slide transitions, the overall frame.

---

### Task 7.2: Step A — Spotify auto-import (optional)

- [ ] **Step 1: Add Step A HTML (before Step 1)**

  ```html
  <div class="step" id="stepA" data-step="A">
    <div class="step-headline">Are you on Spotify?</div>
    <div class="step-sub">Paste your artist URL — we'll pull in your name, photo, and releases.</div>
    <div class="step-field">
      <input id="spotifyUrl" type="url" placeholder="https://open.spotify.com/artist/...">
    </div>
    <div class="step-error" id="spotifyError" hidden></div>
    <button class="btn-primary" id="spotifyImportBtn">Find me on Spotify →</button>
    <button class="btn-ghost" id="spotifySkipBtn">Skip — I'll add my music manually →</button>
  </div>

  <!-- Spotify confirmation screen (shown after successful fetch) -->
  <div class="step" id="stepAConfirm" data-step="A-confirm" hidden>
    <div class="step-headline">Is this you?</div>
    <img id="spotifyArtwork" class="confirm-artwork" src="" alt="">
    <div id="spotifyArtistName" class="confirm-name"></div>
    <div id="spotifyReleasesFound" class="confirm-sub"></div>
    <button class="btn-primary" id="spotifyConfirmBtn">Yes, that's me →</button>
    <button class="btn-ghost" id="spotifyNotMeBtn">Not me</button>
  </div>
  ```

- [ ] **Step 2: Write the Spotify fetch JS**

  ```js
  document.getElementById('spotifyImportBtn').addEventListener('click', async () => {
    const url = document.getElementById('spotifyUrl').value.trim();
    const errEl = document.getElementById('spotifyError');
    errEl.hidden = true;

    // Extract artist ID from URL
    const match = url.match(/artist\/([a-zA-Z0-9]+)/);
    if (!match) {
      errEl.textContent = "That doesn't look right — paste your Spotify artist URL.";
      errEl.hidden = false;
      return;
    }

    const artistId = match[1];
    // NOTE: This will call the Netlify function when it exists.
    // For now, show "Auto-import coming soon — skip to continue."
    errEl.textContent = 'Auto-import coming soon — use the skip link for now.';
    errEl.hidden = false;
  });

  document.getElementById('spotifySkipBtn').addEventListener('click', () => goToStep('1'));
  document.getElementById('spotifyConfirmBtn').addEventListener('click', () => goToStep('1'));
  document.getElementById('spotifyNotMeBtn').addEventListener('click', () => {
    document.getElementById('stepAConfirm').hidden = true;
    document.getElementById('stepA').hidden = false;
    document.getElementById('spotifyUrl').value = '';
  });
  ```

  > **Note:** The actual Spotify API call is blocked on the Netlify function. The UI scaffolding is built here; the function will slot in when ready.

- [ ] **Step 3: Commit**

  ```bash
  git add start.html
  git commit -m "feat(onboarding): Step A — Spotify import UI scaffold (Netlify fn pending)"
  ```

---

### Task 7.3: Step 1 — Identity (name + vibe + colour + live preview)

- [ ] **Step 1: Consolidate name, vibe, and accent colour into one screen**

  Replace any existing separate name/genre/colour steps with a single Step 1:

  ```html
  <div class="step" id="step1" data-step="1" hidden>
    <div class="step-progress"><div class="progress-fill" style="width:33%"></div></div>
    <div class="step-headline">Make it yours.</div>

    <div class="step-field">
      <label>Your artist name</label>
      <input id="s1Name" type="text" placeholder="What do you go by?" autocomplete="off" autocorrect="off">
    </div>

    <div class="step-field">
      <label>Your vibe</label>
      <div class="vibe-grid" id="vibeGrid">
        <button class="vibe-card" data-vibe="atmospheric">🌙 Atmospheric</button>
        <button class="vibe-card" data-vibe="hype">🔥 Hype</button>
        <button class="vibe-card" data-vibe="raw">🎸 Raw</button>
        <button class="vibe-card" data-vibe="chill">🌊 Chill</button>
      </div>
    </div>

    <div class="step-field">
      <label>Accent colour</label>
      <div class="colour-swatches" id="colourSwatches">
        <button class="swatch" data-colour="#e05242" style="background:#e05242"></button>
        <button class="swatch" data-colour="#4e7cff" style="background:#4e7cff"></button>
        <button class="swatch" data-colour="#f4b942" style="background:#f4b942"></button>
        <button class="swatch" data-colour="#1e9650" style="background:#1e9650"></button>
        <button class="swatch" data-colour="#9b59b6" style="background:#9b59b6"></button>
        <button class="swatch" data-colour="#e67e22" style="background:#e67e22"></button>
        <input class="swatch swatch--custom" type="color" id="customColour" value="#e05242" title="Custom colour">
      </div>
    </div>

    <!-- Live preview strip -->
    <div class="live-preview" id="livePreview">
      <div class="preview-top-card" id="previewTopCard" style="background: linear-gradient(135deg, #1a1a2e, #e05242)">
        <div class="preview-name" id="previewName">Your name</div>
      </div>
    </div>

    <button class="btn-primary" id="s1Next">Next →</button>
  </div>
  ```

- [ ] **Step 2: CSS for vibe grid and colour swatches**

  ```css
  .vibe-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 6px;
  }
  .vibe-card {
    padding: 14px 10px;
    border-radius: 10px;
    border: 1.5px solid #e0dbd4;
    background: #f5f2ee;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    text-align: left;
    color: #333;
  }
  .vibe-card.selected { border-color: var(--wizard-accent, #e05242); background: #fff; }

  .colour-swatches { display: flex; gap: 8px; margin-top: 6px; flex-wrap: wrap; align-items: center; }
  .swatch {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
  }
  .swatch.selected { border-color: #1a1a2e; transform: scale(1.15); }
  .swatch--custom { padding: 0; overflow: hidden; }

  .live-preview { margin: 16px 0; border-radius: 10px; overflow: hidden; }
  .preview-top-card {
    height: 80px;
    display: flex;
    align-items: flex-end;
    padding: 10px 12px;
    transition: background 0.3s ease;
  }
  .preview-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    text-transform: uppercase;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  }
  ```

- [ ] **Step 3: Live preview JS (name + colour update in real time)**

  ```js
  const s1NameInput = document.getElementById('s1Name');
  const previewName = document.getElementById('previewName');
  const previewTopCard = document.getElementById('previewTopCard');
  let wizardAccent = '#e05242';

  s1NameInput.addEventListener('input', () => {
    previewName.textContent = s1NameInput.value || 'Your name';
  });

  document.querySelectorAll('.swatch[data-colour]').forEach(s => {
    s.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach(x => x.classList.remove('selected'));
      s.classList.add('selected');
      wizardAccent = s.dataset.colour;
      updatePreviewColour(wizardAccent);
    });
  });

  document.getElementById('customColour').addEventListener('input', (e) => {
    wizardAccent = e.target.value;
    updatePreviewColour(wizardAccent);
  });

  function updatePreviewColour(colour) {
    previewTopCard.style.background = `linear-gradient(135deg, #1a1a2e, ${colour})`;
    document.documentElement.style.setProperty('--wizard-accent', colour);
  }

  // Vibe selection
  document.querySelectorAll('.vibe-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.vibe-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  document.getElementById('s1Next').addEventListener('click', () => {
    const name = s1NameInput.value.trim();
    if (!name) { s1NameInput.focus(); return; }
    // Persist to draft
    const draft = JSON.parse(sessionStorage.getItem('able_wizard_draft') || '{}');
    draft.name = name;
    draft.vibe = document.querySelector('.vibe-card.selected')?.dataset.vibe || 'atmospheric';
    draft.accent = wizardAccent;
    sessionStorage.setItem('able_wizard_draft', JSON.stringify(draft));
    goToStep('2');
  });
  ```

  > **Note:** Use `sessionStorage` for wizard draft — it's discarded if the user leaves without finishing. Only write to `localStorage` (`able_v3_profile`) on the Done screen.

- [ ] **Step 4: Commit**

  ```bash
  git add start.html
  git commit -m "feat(onboarding): Step 1 — name + vibe + colour + live preview"
  ```

---

### Task 7.4: Step 2 — Right Now (campaign state)

- [ ] **Step 1: Replace any existing campaign state step with**

  ```html
  <div class="step" id="step2" data-step="2" hidden>
    <div class="step-progress"><div class="progress-fill" style="width:66%"></div></div>
    <div class="step-headline">What's happening?</div>
    <div class="moment-grid" id="momentGrid">
      <button class="moment-card" data-mode="profile">Just existing</button>
      <button class="moment-card" data-mode="pre-release">Something's coming</button>
      <button class="moment-card" data-mode="live">Just dropped</button>
      <button class="moment-card" data-mode="gig">Playing tonight</button>
    </div>
    <button class="btn-primary" id="s2Next" disabled>Next →</button>
  </div>
  ```

- [ ] **Step 2: CSS for moment grid**

  ```css
  .moment-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 20px 0;
  }
  .moment-card {
    padding: 20px 12px;
    border-radius: 12px;
    border: 1.5px solid #e0dbd4;
    background: #f5f2ee;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    color: #333;
    text-align: center;
  }
  .moment-card.selected {
    border-color: var(--wizard-accent, #e05242);
    background: #fff;
    color: #1a1a2e;
  }
  ```

- [ ] **Step 3: Wire selection + advance**

  ```js
  document.querySelectorAll('.moment-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.moment-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('s2Next').disabled = false;
    });
  });

  document.getElementById('s2Next').addEventListener('click', () => {
    const mode = document.querySelector('.moment-card.selected')?.dataset.mode;
    const draft = JSON.parse(sessionStorage.getItem('able_wizard_draft') || '{}');
    draft.stateOverride = mode;
    sessionStorage.setItem('able_wizard_draft', JSON.stringify(draft));
    goToStep('3');
    initStep3(); // populate slug preview immediately when step 3 becomes visible
  });
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add start.html
  git commit -m "feat(onboarding): Step 2 — moment selector in artist language"
  ```

---

### Task 7.5: Step 3 — Email / magic link

- [ ] **Step 1: Simplify the save step to one email input**

  ```html
  <div class="step" id="step3" data-step="3" hidden>
    <div class="step-progress"><div class="progress-fill" style="width:90%"></div></div>
    <div class="step-headline">Where do we send the link?</div>
    <div class="step-sub">Your page is ready. We'll email you the link so you can get back to it any time.</div>

    <div class="step-field">
      <label>Email address</label>
      <input id="s3Email" type="email" placeholder="you@example.com" autocomplete="email">
    </div>

    <div class="step-url-preview" id="s3UrlPreview">
      Your page: <span id="s3Slug"></span>
    </div>

    <button class="btn-primary" id="s3Submit">Make it real →</button>
    <div class="step-magic-note">Magic link — no password needed.</div>
  </div>
  ```

- [ ] **Step 2: Generate slug from name and show preview**

  ```js
  function nameToSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20) || 'artist';
  }

  // When step 3 becomes visible:
  function initStep3() {
    const draft = JSON.parse(sessionStorage.getItem('able_wizard_draft') || '{}');
    const slug = nameToSlug(draft.name || '');
    document.getElementById('s3Slug').textContent = `able.fm/${slug}`;
  }
  ```

- [ ] **Step 3: Submit handler — write to localStorage + advance to done**

  ```js
  document.getElementById('s3Submit').addEventListener('click', () => {
    const email = document.getElementById('s3Email').value.trim();
    if (!email || !email.includes('@')) {
      document.getElementById('s3Email').focus();
      return;
    }
    const draft = JSON.parse(sessionStorage.getItem('able_wizard_draft') || '{}');
    const profile = {
      name: draft.name || '',
      vibe: draft.vibe || 'atmospheric',
      accent: draft.accent || '#e05242',
      stateOverride: draft.stateOverride || 'profile',
      email: email,
      slug: nameToSlug(draft.name || ''),
      joinedAt: Date.now()
    };
    localStorage.setItem('able_v3_profile', JSON.stringify(profile));
    localStorage.setItem('able_session', 'local-' + Date.now()); // placeholder until Supabase auth
    sessionStorage.removeItem('able_wizard_draft');
    goToStep('done');
  });
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add start.html
  git commit -m "feat(onboarding): Step 3 — email / magic link, slug preview"
  ```

---

### Task 7.6: Done screen

- [ ] **Step 1: Build the done screen**

  ```html
  <div class="step" id="stepDone" data-step="done" hidden>
    <div class="step-progress done"><div class="progress-fill" style="width:100%;background:var(--dash-green,#1e9650)"></div></div>
    <div class="done-headline">Your page is real.</div>
    <div class="done-url-pill" id="doneUrlPill">able.fm/...</div>

    <div class="done-share-row">
      <button class="share-btn" id="doneCopyBtn">Copy link</button>
      <a class="share-btn" id="doneIgBtn" href="#" target="_blank" rel="noopener">Instagram</a>
      <a class="share-btn" id="doneTtBtn" href="#" target="_blank" rel="noopener">TikTok</a>
    </div>

    <a class="btn-primary" id="doneDashBtn" href="/admin.html">Go to your dashboard →</a>
  </div>
  ```

- [ ] **Step 2: Populate done screen with actual slug**

  ```js
  function initDoneScreen() {
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    const url = `able.fm/${profile.slug || 'you'}`;
    const fullUrl = `https://${url}`;

    document.getElementById('doneUrlPill').textContent = url;

    document.getElementById('doneCopyBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(fullUrl).then(() => {
        document.getElementById('doneCopyBtn').textContent = 'Copied!';
        setTimeout(() => { document.getElementById('doneCopyBtn').textContent = 'Copy link'; }, 2000);
      });
    });

    document.getElementById('doneIgBtn').href =
      `https://www.instagram.com/`;  // IG share opens the app; link in bio added manually
    document.getElementById('doneTtBtn').href =
      `https://www.tiktok.com/`;
  }
  ```

- [ ] **Step 3: CSS for done screen**

  ```css
  .done-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 36px;
    text-transform: uppercase;
    color: #1a1a2e;
    text-align: center;
    margin: 32px 0 16px;
  }

  .done-url-pill {
    background: var(--wizard-accent, #e05242);
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    padding: 10px 24px;
    border-radius: 30px;
    text-align: center;
    display: inline-block;
    margin: 0 auto 24px;
  }

  .done-share-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 24px;
  }

  .share-btn {
    padding: 10px 18px;
    border-radius: 20px;
    border: 1.5px solid #e0dbd4;
    background: #f5f2ee;
    font-size: 13px;
    font-weight: 700;
    color: #333;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }
  ```

- [ ] **Step 4: Smoke test** — complete the wizard, verify done screen shows correct URL and copy button works.

- [ ] **Step 5: Commit**

  ```bash
  git add start.html
  git commit -m "feat(onboarding): done screen — page URL, share buttons, dashboard link"
  ```

---

## Chunk 7b: Admin Bottom Sheet (shared component)

**Goal:** Define the shared bottom sheet for admin.html (used by fan detail and show detail). This must be done before Chunk 8.

**Files:**
- Modify: `admin.html`

---

### Task 7b.1: Admin bottom sheet HTML + JS

- [ ] **Step 1: Add admin bottom sheet HTML to admin.html (before `</body>`)**

  ```html
  <div class="admin-sheet-backdrop" id="adminSheetBackdrop" hidden></div>
  <div class="admin-sheet" id="adminSheet" role="dialog" aria-modal="true" hidden>
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-header">
      <span class="sheet-icon" id="adminSheetIcon"></span>
      <span class="sheet-title" id="adminSheetTitle"></span>
      <button class="sheet-close" id="adminSheetClose" aria-label="Close">✕</button>
    </div>
    <div class="sheet-body" id="adminSheetBody"></div>
  </div>
  ```

- [ ] **Step 2: Add CSS** (reuse the same `.bottom-sheet` CSS rules from spec §2.4 — rename classes to `.admin-sheet` to avoid conflicts with able-v7.html)

  ```css
  .admin-sheet-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1000;
  }
  .admin-sheet {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #fff; border-radius: 14px 14px 0 0;
    border-top: 1.5px solid #d4cfc8; z-index: 1001;
    max-height: 80vh; overflow-y: auto;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .admin-sheet:not([hidden]) { transform: translateY(0); }
  ```

- [ ] **Step 3: Define `openAdminSheet` and `closeAdminSheet`**

  ```js
  function openAdminSheet(icon, title, bodyHTML, onSave) {
    document.getElementById('adminSheetIcon').textContent = icon;
    document.getElementById('adminSheetTitle').textContent = title;
    document.getElementById('adminSheetBody').innerHTML = bodyHTML;
    document.getElementById('adminSheet').hidden = false;
    document.getElementById('adminSheetBackdrop').hidden = false;
  }

  function closeAdminSheet() {
    document.getElementById('adminSheet').hidden = true;
    document.getElementById('adminSheetBackdrop').hidden = true;
  }

  document.getElementById('adminSheetClose').addEventListener('click', closeAdminSheet);
  document.getElementById('adminSheetBackdrop').addEventListener('click', closeAdminSheet);
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): shared bottom sheet component for fan detail + show detail"
  ```

---

## Chunk 8: Fan List + Shows Pages (admin.html)

**Goal:** Rework the existing Fans and Shows nav pages in admin.html to match the spec — fan list with colour-coded source badges, source breakdown bars, fan detail bottom sheet, shows list with gig mode toggle.

**Files:**
- Modify: `admin.html`

---

### Task 8.1: Fan list page

- [ ] **Step 1: Find `page-fans` or the existing fans page div in admin.html**

- [ ] **Step 2: Replace its contents with**

  ```html
  <div class="page" id="page-fans">
    <!-- Topbar handled by shared topbar — just update title -->
    <div class="fans-search">
      <input id="fansSearch" type="search" placeholder="Search fans..." aria-label="Search">
    </div>

    <div class="filter-pills" id="fansFilterPills">
      <button class="filter-pill active" data-filter="all">All</button>
      <button class="filter-pill" data-filter="ig">Instagram</button>
      <button class="filter-pill" data-filter="tt">TikTok</button>
      <button class="filter-pill" data-filter="sp">Spotify</button>
      <button class="filter-pill" data-filter="direct">Direct</button>
    </div>

    <div class="fans-stat-strip" id="fansStatStrip">
      <span class="stat-strip-item"><strong id="fansTotalCount">0</strong> total</span>
      <span class="stat-strip-item accent"><strong id="fansWeekCount">0</strong> this week</span>
      <span class="stat-strip-item"><strong id="fansSocialPct">0%</strong> from social</span>
    </div>

    <div id="fansList" class="fans-list-rows"></div>

    <div class="fans-export-row">
      <a class="export-btn" id="fansExportBtn" href="#" download="fans.csv">Export CSV →</a>
    </div>

    <!-- Source breakdown -->
    <div class="source-breakdown" id="sourceBreakdown">
      <div class="breakdown-title">Where fans found you</div>
      <div id="sourceBreakdownBars"></div>
    </div>
  </div>
  ```

- [ ] **Step 3: Write `renderFanList(filter)` function**

  ```js
  function renderFanList(filter = 'all') {
    const allFans = JSON.parse(localStorage.getItem('able_fans') || '[]');
    const search = document.getElementById('fansSearch')?.value.toLowerCase() || '';
    const filtered = allFans.filter(f => {
      const src = normaliseSource(f.source);
      const matchFilter = filter === 'all' || src === filter;
      const matchSearch = !search || (f.email || '').toLowerCase().includes(search);
      return matchFilter && matchSearch && f.confirmed !== false; // only confirmed fans
    });

    // Stats
    const oneWeekAgo = Date.now() - 7 * 86400000;
    const thisWeek = allFans.filter(f => f.ts >= oneWeekAgo && f.confirmed !== false).length;
    const socialSources = ['ig', 'tt', 'sp'];
    const socialCount = allFans.filter(f => socialSources.includes(normaliseSource(f.source)) && f.confirmed !== false).length;
    const total = allFans.filter(f => f.confirmed !== false).length;

    document.getElementById('fansTotalCount').textContent = total;
    document.getElementById('fansWeekCount').textContent = thisWeek;
    document.getElementById('fansSocialPct').textContent = total > 0 ? Math.round(socialCount / total * 100) + '%' : '0%';

    // List rows
    const list = document.getElementById('fansList');
    const starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
    list.innerHTML = filtered.sort((a, b) => b.ts - a.ts).map(f => {
      const initial = (f.email || '?')[0].toUpperCase();
      const src = normaliseSource(f.source);
      const colours = ['#e05242','#4e7cff','#9b59b6','#27ae60','#e67e22'];
      const colour = colours[initial.charCodeAt(0) % colours.length];
      const isStarred = starred.includes(f.email);
      // Unconfirmed fans (GDPR pending) show hollow circle ○ instead of filled avatar
      const isUnconfirmed = f.confirmed === false;
      const avatarHtml = isUnconfirmed
        ? `<div class="fan-avatar fan-avatar--unconfirmed" title="Awaiting confirmation">○</div>`
        : `<div class="fan-avatar" style="background:${colour}">${initial}</div>`;
      return `<div class="fan-list-row" data-email="${f.email}">
        ${avatarHtml}
        <div class="fan-row-info">
          <div class="fan-row-email">${f.email}${isUnconfirmed ? ' <span class="unconfirmed-label">pending</span>' : ''}</div>
          <div class="fan-row-meta">${formatTimeAgo(f.ts)}</div>
        </div>
        <span class="source-badge ${src}">${src.toUpperCase()}</span>
        <button class="fan-star ${isStarred ? 'starred' : ''}" data-email="${f.email}" aria-label="Mark as close">★</button>
      </div>`;
    }).join('') || '<div class="empty-state">No fans yet — share your link.</div>';

    // Source breakdown bars
    renderSourceBreakdown(allFans.filter(f => f.confirmed !== false));

    // Wire row taps → fan detail sheet
    document.querySelectorAll('.fan-list-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.classList.contains('fan-star')) return; // handled separately
        const email = row.dataset.email;
        const fan = allFans.find(f => f.email === email);
        if (fan) openFanDetailSheet(fan);
      });
    });

    // Wire star toggles
    document.querySelectorAll('.fan-star').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const email = btn.dataset.email;
        const starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
        const idx = starred.indexOf(email);
        if (idx >= 0) starred.splice(idx, 1); else starred.push(email);
        localStorage.setItem('able_starred_fans', JSON.stringify(starred));
        btn.classList.toggle('starred');
      });
    });
  }

  function normaliseSource(source) {
    const s = (source || '').toLowerCase();
    if (s.includes('instagram') || s === 'ig') return 'ig';
    if (s.includes('tiktok') || s === 'tt') return 'tt';
    if (s.includes('spotify') || s === 'sp') return 'sp';
    return 'direct';
  }
  ```

- [ ] **Step 4: Source breakdown bars**

  ```js
  function renderSourceBreakdown(fans) {
    const counts = { ig: 0, tt: 0, sp: 0, direct: 0 };
    fans.forEach(f => counts[normaliseSource(f.source)]++);
    const total = fans.length || 1;
    const colours = { ig: '#e1306c', tt: '#888', sp: '#1ed760', direct: '#999' };
    const labels = { ig: 'Instagram', tt: 'TikTok', sp: 'Spotify', direct: 'Direct' };

    const el = document.getElementById('sourceBreakdownBars');
    if (!el) return;
    el.innerHTML = Object.entries(counts).map(([src, count]) => {
      const pct = Math.round(count / total * 100);
      return `<div class="breakdown-row">
        <span class="breakdown-label">${labels[src]}</span>
        <div class="breakdown-bar-wrap">
          <div class="breakdown-bar" style="width:${pct}%;background:${colours[src]}"></div>
        </div>
        <span class="breakdown-pct">${pct}%</span>
      </div>`;
    }).join('');
  }
  ```

- [ ] **Step 5: Filter pill + search wiring**

  ```js
  let activeFilter = 'all';
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      renderFanList(activeFilter);
    });
  });
  document.getElementById('fansSearch').addEventListener('input', () => renderFanList(activeFilter));
  ```

- [ ] **Step 6: Fan detail bottom sheet**

  ```js
  function openFanDetailSheet(fan) {
    const src = normaliseSource(fan.source);
    const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');
    const fanClicks = clicks.filter(c => c.source === fan.source).length; // approximate

    const body = `
      <div class="fan-detail-header">
        <div class="fan-detail-avatar" style="background:#4e7cff">${(fan.email||'?')[0].toUpperCase()}</div>
        <div>
          <div class="fan-detail-email">${fan.email}</div>
          <div class="fan-detail-meta">Joined ${new Date(fan.ts).toLocaleDateString()} · via ${src.toUpperCase()}</div>
        </div>
      </div>
      <div class="fan-detail-stats">Tapped ${fanClicks} links · Signed up via ${src.toUpperCase()}</div>
      <div class="fan-detail-actions">
        <div class="locked-feature">
          <button class="btn-locked" disabled>✉ Send a message</button>
          <span class="lock-badge">🔒 Artist</span>
        </div>
        <button class="btn-danger" id="removeFanBtn" data-email="${fan.email}">Remove from list</button>
      </div>`;

    openAdminSheet('👤', fan.email, body, null);

    document.getElementById('removeFanBtn').addEventListener('click', () => {
      if (!confirm(`Remove ${fan.email} from your list?`)) return;
      const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
      localStorage.setItem('able_fans', JSON.stringify(fans.filter(f => f.email !== fan.email)));
      closeAdminSheet();
      renderFanList(activeFilter);
    });
  }
  ```

  > **Note:** `openAdminSheet` / `closeAdminSheet` — add a separate bottom sheet to admin.html following the same pattern as the artist profile sheet (§6.4), or reuse a shared component.

- [ ] **Step 7: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): fan list — filter pills, source badges, breakdown bars, detail sheet"
  ```

---

### Task 8.2: Shows page

- [ ] **Step 1: Find `page-shows` in admin.html**

- [ ] **Step 2: Add gig mode toggle card at top of shows page**

  ```html
  <div class="gig-toggle-card" id="gigToggleCard">
    <div class="gig-toggle-text">
      <strong>I'm playing tonight.</strong>
      <span>Put tickets front and centre for 24 hours.</span>
    </div>
    <button class="gig-toggle-btn" id="gigToggleBtn" role="switch" aria-checked="false"></button>
  </div>
  <div class="gig-toggle-note" id="gigToggleNote" hidden>
    Turns off automatically 24 hours after you switch it on.
  </div>
  ```

- [ ] **Step 3: Wire gig toggle to `able_gig_expires`**

  ```js
  function initGigToggle() {
    const expires = localStorage.getItem('able_gig_expires');
    const isActive = expires && parseInt(expires) > Date.now();
    const btn = document.getElementById('gigToggleBtn');
    if (btn) {
      btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
      btn.classList.toggle('active', isActive);
    }
    document.getElementById('gigToggleNote').hidden = !isActive;
  }

  document.getElementById('gigToggleBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('gigToggleBtn');
    const isActive = btn.getAttribute('aria-checked') === 'true';
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    if (isActive) {
      // Deactivate: remove expiry AND clear stateOverride so artist page returns to auto-computed state
      localStorage.removeItem('able_gig_expires');
      delete profile.stateOverride;
      localStorage.setItem('able_v3_profile', JSON.stringify(profile));
      btn.setAttribute('aria-checked', 'false');
      btn.classList.remove('active');
      document.getElementById('gigToggleNote').hidden = true;
      renderTimelineArc(); // re-render arc to reflect new state
    } else {
      // Activate: set 24h expiry and stateOverride = 'gig'
      const expires = Date.now() + 24 * 3600 * 1000;
      localStorage.setItem('able_gig_expires', String(expires));
      profile.stateOverride = 'gig';
      localStorage.setItem('able_v3_profile', JSON.stringify(profile));
      btn.setAttribute('aria-checked', 'true');
      btn.classList.add('active');
      document.getElementById('gigToggleNote').hidden = false;
      renderTimelineArc(); // re-render arc to show gig mode
    }
  });
  ```

- [ ] **Step 4: Add "Add a show" bottom sheet trigger**

  The three-step show form (venue + date + ticket URL → featured toggle → confirmation) follows the bottom sheet pattern from §7.1. Structure the form similarly to the edit mode sheets, using step dots.

  The show data is saved to `localStorage.getItem('able_shows')` as an array of `{ venue, date, doorsTime, ticketUrl, featured }`.

- [ ] **Step 5: Commit**

  ```bash
  git add admin.html
  git commit -m "feat(admin): shows page — gig toggle (24h), add show sheet, shows list"
  ```

---

## Chunk 9: Final Smoke Tests

**Goal:** Verify the full journey works end-to-end using Playwright MCP.

---

### Task 9.1: Onboarding → Dashboard → Artist page smoke test

- [ ] **Step 1: Clear localStorage** via Playwright `page.evaluate(() => localStorage.clear())`

- [ ] **Step 2: Navigate to start.html**

  Verify: "Are you on Spotify?" screen visible. Skip link works. Step 1 appears.

- [ ] **Step 3: Complete Step 1**

  Type a name, select a vibe, select a colour. Verify live preview updates. Tap Next.

- [ ] **Step 4: Complete Step 2**

  Select "Something's coming". Verify Next button enables. Tap Next.

- [ ] **Step 5: Complete Step 3**

  Type email. Verify slug preview shows. Tap "Make it real →". Verify done screen.

- [ ] **Step 6: Navigate to admin.html**

  Verify: light background, dark topbar, timeline arc renders, stat cards are white.

- [ ] **Step 7: Navigate to able-v7.html?edit=1**

  Set `localStorage.setItem('able_session', 'test')` first.
  Verify: dashed amber rings on hero area, floating pill visible.
  Tap hero zone — verify bottom sheet opens.
  Tap ✕ — verify sheet closes.
  Tap Fan view tab — verify rings disappear.

- [ ] **Step 8: Screenshot all three screens** via Playwright for record.

- [ ] **Step 9: Commit final**

  ```bash
  git add admin.html able-v7.html start.html
  git commit -m "feat: UX rethink V2 — dashboard, edit mode, profile, onboarding complete"
  ```

---

## Out of scope / Phase 2

- Platform auto-import (Spotify/YouTube) — requires Netlify serverless function. UI scaffold in Task 7.2.
- Landing page redesign — separate plan.
- Settings page design — separate plan.
- Email broadcasts backend — Phase 2 per spec §8.
- Supabase auth migration — replaces `localStorage.setItem('able_session', ...)` placeholder.
