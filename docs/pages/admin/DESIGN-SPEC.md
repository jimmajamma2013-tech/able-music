# Admin Dashboard — Design Spec
**File: `admin.html` | Created: 2026-03-15**
**Strategy score: 9.7/10 | Phase 1 ceiling**
**This spec is complete and self-contained. Build directly from this.**

---

## 1. PURPOSE

The artist's daily home. Give the artist confidence that their page is working, their fans are building, and they know exactly what to do next.

**Primary job:** Artist opens admin → feels immediately oriented → knows what's happening → knows what to do.

**What it must not feel like:** A CMS admin panel. A SaaS analytics dashboard. A settings screen.
**What it must feel like:** Backstage. Professional, clean, warm, with just enough data to feel in control.

---

## 2. DESIGN TOKENS

```css
:root {
  --bg:       #09090f;
  --bg-mid:   #141d2e;          /* topbar / modals */
  --card:     rgba(138,180,206,.06);
  --card-hv:  rgba(138,180,206,.10);
  --border:   rgba(138,180,206,.10);
  --bm:       rgba(138,180,206,.18);
  --text:     #ccddef;
  --t2:       rgba(204,221,239,.58);
  --t3:       rgba(204,221,239,.52);
  --acc:      #c9a84c;          /* admin amber — internal only */
  --acc-rgb:  201,168,76;
  --font:     'Plus Jakarta Sans', sans-serif;
  --font-d:   'Barlow Condensed', sans-serif;
  --spring:   cubic-bezier(0.34,1.56,0.64,1);
  --ease:     cubic-bezier(0.25,0.46,0.45,0.94);

  /* Dashboard surface tokens (light, warm cream) */
  --dash-bg:     #e8e4dd;
  --dash-card:   #ffffff;
  --dash-border: #d4cfc8;
  --dash-shell:  #1a1a2e;       /* sidebar + topbar */
  --dash-field:  #f5f2ee;
  --dash-amber:  #f4b942;
  --dash-green:  #1e9650;
  --dash-red:    #c04030;
  --dash-text:   #1a1a2e;
  --dash-t2:     #555555;
  --dash-t3:     #777777;       /* UPDATED from #888888 — 4.6:1 AA compliant */

  /* Source badge colours */
  --source-ig:     #e1306c;
  --source-sp:     #1ed760;
  --source-tt:     #888888;
  --source-direct: #999999;

  /* Artist accent (loaded from profile, fallback admin amber) */
  --artist-accent:     var(--dash-amber);
  --artist-accent-rgb: 244,185,66;
}
```

**Critical:** `--dash-t3` is `#777777`, not `#888888`. The previous value was borderline WCAG AA.

---

## 3. TYPOGRAPHY SCALE

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Page title (greeting) | Plus Jakarta Sans | 22px | 700 | h1-equivalent |
| Page sub (greeting sub) | Plus Jakarta Sans | 13px | 400 | #555 |
| Section header | Plus Jakarta Sans | 13px | 600 | card header |
| Stat value | Barlow Condensed | 28px | 700 | ls: 0.02em |
| Stat label | Plus Jakarta Sans | 10px | 700 | uppercase, ls: 0.18em |
| Stat delta | Plus Jakarta Sans | 11px | 400 | |
| Nav item | Plus Jakarta Sans | 13px | 500 | |
| Nav section label | Plus Jakarta Sans | 9.5px | 700 | uppercase, ls: 0.2em |
| Field label | Plus Jakarta Sans | 10px | 700 | uppercase, ls: 0.16em |
| Field input | Plus Jakarta Sans | 13px | 400 | min 16px on mobile (iOS) |
| Button (primary) | Plus Jakarta Sans | 12px | 700 | |
| Button (ghost) | Plus Jakarta Sans | 12px | 600 | |
| Toast | Plus Jakarta Sans | 12px | 600 | |
| Badge / pill | Plus Jakarta Sans | 11px | 700 | |
| Nudge text | Plus Jakarta Sans | 13px | 400 | |
| Empty state title | Plus Jakarta Sans | 14px | 600 | |
| Empty state body | Plus Jakarta Sans | 12px | 400 | max-width 260px |

**All inputs:** `font-size: 16px` on mobile (prevents iOS auto-zoom). Use responsive scaling.

---

## 4. LAYOUT ARCHITECTURE

### Desktop (≥768px)
```
┌──────────────────────────────────────────────────────┐
│ SIDEBAR (220px fixed)  │  TOPBAR (56px sticky)        │
│  Logo                  ├──────────────────────────────│
│  Artist identity card  │  Page title    Edit page →   │
│  Navigation            │                              │
│  ─────────────────     │  PAGE CONTENT (padding: 28px)│
│  View live page ↗      │                              │
└────────────────────────┴──────────────────────────────┘
```

### Mobile (<768px)
```
┌──────────────────────────────────────────────────────┐
│  TOPBAR (56px)                                        │
│  [☰ or ABLE logo]    [Edit page →]                   │
│                                                       │
│  PAGE CONTENT (padding: 16px 16px 88px)               │
│  (88px bottom padding for tab bar)                    │
│                                                       │
├──────────────────────────────────────────────────────│
│  BOTTOM TAB BAR (safe-area-inset-bottom aware)        │
│  [Home] [Fans] [Campaign] [Content] [More]            │
└──────────────────────────────────────────────────────┘
```

### Media query
```css
@media (max-width: 767px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); z-index: 500; }
  .main { margin-left: 0; }
  .mobile-nav { display: flex; }
  .page { padding: 16px 16px 88px; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .chq-states { flex-direction: column; }
  .chq-state-btn { min-height: 56px; flex: none; }
}
```

---

## 5. HOME PAGE ARCHITECTURE

### 5.1 Lifecycle stage system
```javascript
// Determines home page layout and copy register
function getLifecycleStage(profile, fans) {
  const frcDone = localStorage.getItem('frc_done');
  const gigActive = parseInt(localStorage.getItem('able_gig_expires')||'0') > Date.now();
  if (gigActive) return 'gig';
  if (!frcDone && fans.length === 0) return 'new';
  return 'active';
}
// Applied as: document.getElementById('page-home').dataset.stage = stage
```

```css
/* Stage-driven layout */
[data-stage="new"] .campaign-hq { order: 3; }
[data-stage="new"] #firstRunCard { order: 1; }
[data-stage="active"] .campaign-hq { order: 1; }
[data-stage="active"] #firstRunCard { display: none !important; }
[data-stage="gig"] .campaign-hq { order: 1; }
```

### 5.2 Greeting system
```javascript
function getFirstName(profile) {
  return (profile.name || '').split(' ')[0] || null;
}

function buildGreetingSub(profile) {
  const now = Date.now();
  const releaseDate = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null;
  const gigExpires = parseInt(localStorage.getItem('able_gig_expires') || '0');
  const LIVE_WINDOW = 14 * 24 * 60 * 60 * 1000;

  if (gigExpires > now) return 'You\'re on tonight.';

  if (releaseDate && releaseDate > now) {
    const daysLeft = Math.ceil((releaseDate - now) / 86400000);
    const title = profile.release?.title || 'your release';
    if (daysLeft === 1) return 'Tomorrow. Your page is set.';
    if (daysLeft <= 3) return `${daysLeft} days. Your page is set.`;
    return `${daysLeft} days until ${title}.`;
  }

  if (releaseDate && now < releaseDate + LIVE_WINDOW) {
    const daysLeft = Math.ceil((releaseDate + LIVE_WINDOW - now) / 86400000);
    const title = profile.release?.title || 'your release';
    if (daysLeft <= 3) return `${daysLeft} days left in your live window.`;
    return `${title} is out. This is your window.`;
  }

  // Post-gig (within 24h)
  const gigEnded = parseInt(localStorage.getItem('able_gig_expires') || '0');
  if (gigEnded > 0 && gigEnded < now && (now - gigEnded) < 86400000) {
    const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
    const lastShow = shows[shows.length - 1];
    const newFans = countFansAfterTimestamp(gigEnded - 86400000);
    if (lastShow) return `Last night at ${lastShow.venue}. ${newFans} fan${newFans !== 1 ? 's' : ''} joined.`;
  }

  return 'Your page, your list, your relationship.';
}

function applyGreeting(profile) {
  const firstName = getFirstName(profile);
  const firstEver = !localStorage.getItem('admin_ever_visited');

  if (firstEver) {
    localStorage.setItem('admin_ever_visited', '1');
    document.getElementById('homeGreeting').textContent =
      firstName ? `Good to meet you, ${firstName}.` : 'Good to meet you.';
    document.getElementById('homeSub').textContent = 'Your page is live.';
    setTimeout(() => {
      const el = document.getElementById('homeSub');
      el.style.transition = 'opacity 0.4s';
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = buildGreetingSub(profile);
        el.style.opacity = '1';
      }, 400);
    }, 2500);
  } else {
    document.getElementById('homeGreeting').textContent =
      firstName ? `Good to see you, ${firstName}.` : 'Good to see you.';
    document.getElementById('homeSub').textContent = buildGreetingSub(profile);
  }
}
```

### 5.3 Stats: day-1 zero state
```javascript
function resolveStats() {
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const isDay1 = views.length === 0 && fans.length === 0;

  // Views
  const viewEl = document.getElementById('statViews');
  viewEl.classList.remove('skel');
  viewEl.setAttribute('aria-hidden', 'false');
  viewEl.textContent = views.length.toLocaleString();

  const viewDelta = document.getElementById('statViewsDelta');
  viewDelta.classList.remove('skel');
  viewDelta.textContent = isDay1 ? 'Day 1 ✦' : `+${todayCount(views)} today`;
  if (isDay1) viewDelta.style.color = 'var(--dash-amber)';

  // Sparklines: only render if ≥3 days of data
  const daySpan = getDataDaySpan(views);
  if (daySpan < 3) {
    document.querySelectorAll('.sparkline').forEach(s => s.style.visibility = 'hidden');
  }
}
// Call: setTimeout(resolveStats, 0) — immediately after DOM ready
// Fallback: setTimeout(resolveStats, 600) — resolves skel after max 600ms regardless
```

---

## 6. CAMPAIGN HQ SPEC

### 6.1 DOM structure
```html
<div class="campaign-hq" id="campaignHq" data-state="profile">
  <div class="chq-head">
    <span class="chq-title">Campaign HQ</span>
    <span class="chq-state-pill" id="chqStatePill">Profile</span>
  </div>
  <div class="chq-body">
    <!-- Release title + date picker -->
    <!-- Release timeline arc -->
    <!-- State buttons row -->
    <!-- Auto-switch hint -->
    <!-- Gig toggle strip -->
    <!-- C16 gig countdown bar -->
    <!-- Mini phone preview (desktop only) -->
  </div>
</div>
```

### 6.2 Accent left border on active campaign
```css
.campaign-hq[data-state="pre"]  { border-left: 3px solid #fbbf24; }
.campaign-hq[data-state="live"] { border-left: 3px solid #ef4444; }
.campaign-hq[data-state="gig"]  { border-left: 3px solid #f46442; }
```

### 6.3 State button spring animation
```css
.chq-state-btn:active {
  transform: scale(0.97);
  transition: transform 80ms ease;
}
.chq-state-btn.on {
  animation: stateSpringIn 280ms var(--spring) both;
}
@keyframes stateSpringIn {
  from { transform: scale(0.94); opacity: 0.7; }
  to   { transform: scale(1);    opacity: 1; }
}
.chq-state-btn { min-height: 56px; }
```

### 6.4 Auto-switch hint copy
```
Switches to Live automatically on [formatted date].
```
Format: `new Date(releaseDate).toLocaleDateString('en-GB', {day:'numeric', month:'long'})`

### 6.5 Mini phone preview (desktop only, aria-hidden)
```html
<div class="chq-preview-wrap" aria-hidden="true" aria-label="Live page preview">
  <iframe
    id="chqPreview"
    src="able-v7.html"
    tabindex="-1"
    loading="lazy"
    style="width:390px;height:844px;border:none;pointer-events:none;border-radius:20px;"
  ></iframe>
</div>
```
```css
.chq-preview-wrap {
  width: 72px; height: 155px;
  border-radius: 12px; overflow: hidden;
  border: 2px solid var(--dash-border);
  flex-shrink: 0; position: relative;
}
.chq-preview-wrap iframe {
  transform: scale(0.185);
  transform-origin: top left;
  display: block;
}
@media (max-width: 767px) {
  .chq-preview-wrap { display: none; }
}
```

---

## 7. MILESTONE SYSTEM

### 7.1 Milestone thresholds
```javascript
const MILESTONES = [1, 10, 50, 100, 250, 500, 1000];

function checkAndShowMilestone(fans) {
  const count = fans.length;
  const reached = MILESTONES.filter(m => m <= count);
  if (!reached.length) return;
  const highest = reached[reached.length - 1];
  const key = `milestone_${highest}_shown`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, '1');
  showMilestoneCard(highest);
}
```

### 7.2 Milestone copy
```javascript
const MILESTONE_COPY = {
  1:    { line1: 'Your first fan.', line2: 'This is how every list starts.' },
  10:   { line1: '10 fans.', line2: '10 people who said yes.' },
  50:   { line1: '50 fans.', line2: '50 people your music reached directly.' },
  100:  { line1: '100 fans.', line2: 'This is the free tier limit — and it means 100 people found you on their own.' },
  250:  { line1: '250 fans.', line2: 'A room full of people who signed up for you.' },
  500:  { line1: '500 fans.', line2: 'Five hundred people who stayed close.' },
  1000: { line1: '1,000 fans.', line2: 'A thousand people who wanted to hear from you directly.' },
};
```

### 7.3 Milestone card design
Same visual style as "It's working" card:
- `background: rgba(var(--acc-rgb), 0.08)`
- `border: 1px solid rgba(var(--acc-rgb), 0.2)`
- Amber icon: ✦ or the fan count number
- `animation: fadeSlide 0.3s var(--ease) both`
- Auto-dismiss: 6 seconds, with × button for manual dismiss

---

## 8. FAN LIST ENHANCEMENTS

### 8.0 Fan list sort order and render function

Default sort: **newest first** (`ts` descending). This is the only sort order in V1. Starred fans (from `able_starred_fans`) always float to the top of the list regardless of date.

```javascript
function renderFanList() {
  const fans    = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
  const starredSet = new Set(starred);

  // Sort: starred float first, then by ts descending (newest first)
  const sorted = [...fans]
    .filter(f => !f.deleted_at)  // exclude tombstoned GDPR erasure records
    .sort((a, b) => {
      const aStarred = starredSet.has(a.email) ? 1 : 0;
      const bStarred = starredSet.has(b.email) ? 1 : 0;
      if (bStarred !== aStarred) return bStarred - aStarred;  // starred first
      return (b.ts || 0) - (a.ts || 0);                        // newest first
    });

  const list = document.getElementById('fanList');
  if (!list) return;

  if (sorted.length === 0) {
    list.innerHTML = '<p class="fan-empty">No fans yet. Share your link to get your first sign-up.</p>';
    return;
  }

  list.innerHTML = sorted.map(fan => {
    const isNew     = Date.now() - (fan.ts || 0) < 86400000;
    const isStarred = starredSet.has(fan.email);
    const source    = fan.source || 'direct';
    const dateStr   = fan.ts
      ? new Date(fan.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      : '';

    return `
      <div class="fan-row" data-email="${fan.email}">
        <span class="fan-row__email">${fan.email}</span>
        <span class="fan-row__meta">
          ${isNew ? '<span class="fan-new-badge">new</span>' : ''}
          <span class="fan-source-badge fan-source-badge--${source}">${source}</span>
          <span class="fan-row__date">${dateStr}</span>
        </span>
        <button
          class="fan-star-btn ${isStarred ? 'fan-star-btn--on' : ''}"
          onclick="toggleStarFan('${fan.email}')"
          aria-label="${isStarred ? 'Unstar' : 'Star'} this fan"
          aria-pressed="${isStarred}"
        >✦</button>
      </div>
    `;
  }).join('');
}
```

**Empty state copy:** "No fans yet. Share your link to get your first sign-up."
**Tombstoned records** (GDPR erasure, `deleted_at` present) are filtered out — never rendered in the list.

### 8.1 "New" badge (24h)
```css
.fan-new-badge {
  font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
  padding: 2px 6px; border-radius: 4px;
  background: rgba(var(--acc-rgb), 0.15);
  color: var(--acc); text-transform: uppercase;
  flex-shrink: 0;
}
```
```javascript
// In fan row render:
const isNew = Date.now() - fan.ts < 86400000;
if (isNew) row.innerHTML += '<span class="fan-new-badge">new</span>';
```

### 8.2 Export button
Always visible at bottom of Fans page:
```html
<button class="export-btn" onclick="exportFansCSV()">Export as CSV →</button>
```
```css
.export-btn {
  margin-top: 16px; padding: 10px 18px;
  font-size: 12px; font-weight: 600; color: var(--acc);
  background: rgba(var(--acc-rgb), 0.08);
  border: 1px solid rgba(var(--acc-rgb), 0.2);
  border-radius: 100px; cursor: pointer; font-family: var(--font);
  transition: all .14s;
}
.export-btn:hover { background: rgba(var(--acc-rgb), 0.15); }
```

### 8.3 "These emails are yours" note
```html
<p class="fan-ownership-note">
  These emails are yours. ABLE never contacts your fans without your permission.
</p>
```
```css
.fan-ownership-note {
  font-size: 11px; color: var(--dash-t3); margin-top: 12px;
  text-align: center; line-height: 1.5;
}
```

### 8.4 Streak signal
```javascript
function checkStreak() {
  // If views array has entries for 5+ of the last 7 days:
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  const streak = calcViewStreak(views);
  if (streak >= 5) {
    showNudge('Your page has had visitors every day this week.');
  }
}
```

---

## 9. FOCUS RING SYSTEM

```css
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--dash-bg), 0 0 0 4px var(--acc), 0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

---

## 10. CROSS-PAGE VIEW TRANSITION

```css
@view-transition { navigation: auto; }
.sb-logo-type { view-transition-name: able-logo; }
```

Matches `able-v7.html`:
```css
@view-transition { navigation: auto; }
.able-brand-name { view-transition-name: able-logo; }
```

When artist taps "Edit page →" or "View live page ↗", the ABLE logo flies as a shared element. Progressive enhancement: Chrome 126+, no-op in other browsers.

---

## 11. TOPBAR LIVE CHIP

```html
<span class="live-chip" id="liveChip" onclick="window.open('able-v7.html','_blank')" tabindex="0">
  <span class="live-dot" id="liveDot"></span>
  Live
</span>
```
```css
.live-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600;
  background: rgba(var(--artist-accent-rgb), 0.10);
  color: var(--artist-accent);
  border: 1px solid rgba(var(--artist-accent-rgb), 0.25);
  cursor: pointer; transition: all .14s;
}
.live-chip:hover { background: rgba(var(--artist-accent-rgb), 0.18); }
.live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--artist-accent);
  animation: livePulse2 2s ease-in-out infinite;
}
```
```javascript
// On init: read artist accent from profile
const accent = profile.accent || '#f4b942';
document.documentElement.style.setProperty('--artist-accent', accent);
// Compute RGB:
const [r, g, b] = hexToRgb(accent);
document.documentElement.style.setProperty('--artist-accent-rgb', `${r},${g},${b}`);
```

---

## 12. MOBILE BOTTOM TAB BAR

### 12.1 Tabs
```html
<nav class="mobile-nav" role="navigation" aria-label="Main navigation">
  <button class="mn-item on" onclick="showPage('home')" aria-label="Home">
    [Home SVG icon]
    <span>Home</span>
  </button>
  <button class="mn-item" onclick="showPage('fans')" aria-label="Fans">
    [Fans SVG icon]
    <span>Fans</span>
  </button>
  <button class="mn-item" onclick="openCampaignSheet()" aria-label="Campaign">
    [Campaign SVG icon]
    <span>Campaign</span>
  </button>
  <button class="mn-item" onclick="openContentSheet()" aria-label="Content">
    [Content SVG icon]
    <span>Content</span>
  </button>
  <button class="mn-item" onclick="openMoreSheet()" aria-label="More">
    [More SVG icon]
    <span>More</span>
  </button>
</nav>
```

### 12.2 Campaign bottom sheet (mobile only)
```javascript
function openCampaignSheet() {
  const sheet = document.getElementById('campaignSheet');
  sheet.style.display = 'block';
  requestAnimationFrame(() => sheet.classList.add('open'));
}
function closeCampaignSheet() {
  const sheet = document.getElementById('campaignSheet');
  sheet.classList.remove('open');
  setTimeout(() => sheet.style.display = 'none', 320);
}
```
```css
.bottom-sheet { position: fixed; inset: 0; z-index: 300; display: none; }
.bottom-sheet-backdrop {
  position: absolute; inset: 0; background: rgba(0,0,0,0.4);
  opacity: 0; transition: opacity 0.28s ease;
}
.bottom-sheet-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: var(--dash-card); border-radius: 20px 20px 0 0;
  padding: 0 20px calc(20px + env(safe-area-inset-bottom));
  transform: translateY(100%);
  transition: transform 0.32s var(--ease);
  max-height: 80vh; overflow-y: auto;
}
.bottom-sheet.open .bottom-sheet-backdrop { opacity: 1; }
.bottom-sheet.open .bottom-sheet-content { transform: translateY(0); }
.bottom-sheet-handle {
  width: 36px; height: 4px; border-radius: 2px;
  background: var(--dash-border); margin: 12px auto 16px;
}
```

---

## 13. FIRST-RUN CHECKLIST UPDATES

### Copy
```
Title: "Four things, then you're live."
Step 1 title: "Add a photo or piece of artwork"
Step 1 sub: "This goes at the top of your page — the first thing fans see"
Step 2 title: "Copy your page link"
Step 2 sub: "Your link: ablemusic.co/[slug] — tap to copy it"
Step 3 title: "Put the link in your Instagram and TikTok bio"
Step 3 sub: "This is where your first fans will find you"
Step 4 title: "Add your latest release"
Step 4 sub: "Paste a Spotify, YouTube, or SoundCloud link — artwork fills in automatically"
Dismiss button: "Hide this"
```

### Completion moment
```javascript
function onFirstRunComplete() {
  const card = document.getElementById('firstRunCard');
  card.innerHTML = `
    <div style="text-align:center;padding:16px;font-size:13px;font-weight:600;color:var(--acc);">
      Your page is ready. This is where your fans start.
    </div>
  `;
  localStorage.setItem('frc_done', '1');
  setTimeout(() => {
    card.style.transition = 'opacity 0.4s';
    card.style.opacity = '0';
    setTimeout(() => { card.style.display = 'none'; }, 400);
  }, 2200);
}
```

---

## 14. UPGRADE BOTTOM SHEET

Replaces Settings redirect for all tier gate taps:

```html
<div class="bottom-sheet" id="upgradeSheet">
  <div class="bottom-sheet-backdrop" onclick="closeUpgradeSheet()"></div>
  <div class="bottom-sheet-content">
    <div class="bottom-sheet-handle"></div>
    <h2 style="font-size:16px;font-weight:700;color:var(--dash-text);margin-bottom:20px;">Your plan</h2>
    <!-- Tier comparison row -->
    <!-- [Continue free] [Try Artist →] [Try Pro →] -->
  </div>
</div>
```

**Trigger:** any `.glo-btn` click, any fan cap CTA, any analytics gate CTA.

---

## 15. COPY REFERENCE (all visible strings)

See `COPY.md` for complete copy specification. Key rules:
- Never "Welcome back!" / "You're all set!" / "Get started"
- Greeting must include first name when available
- Stats labels: "Visits" / "Clicks" / "Fans" / "Click rate"
- Toasts: "Saved." / "Copied." / "Removed." / "Your page link is copied."
- All tier gates: specific value prop + price, not just "Upgrade"

---

## 16. ACCESSIBILITY CHECKLIST

- [ ] `*:focus-visible` glow ring (§9)
- [ ] All skeleton shimmer: `aria-hidden="true"`
- [ ] Bottom tab bar: `role="navigation"` + `aria-label="Main navigation"`
- [ ] Campaign bottom sheet: focus trap on open, returns focus on close
- [ ] All icon-only buttons: `aria-label`
- [ ] `--dash-t3: #777777` (AA compliant for small text)
- [ ] Bottom sheet drag handle: `aria-hidden="true"`
- [ ] Mini phone preview iframe: `tabindex="-1"` + `aria-hidden="true"`
- [ ] `prefers-reduced-motion` respected for all animations

---

## 17. PLAYWRIGHT VERIFICATION CHECKLIST

```
□ Mobile: sidebar is hidden at 375px (transform: translateX(-100%))
□ Mobile: bottom tab bar is visible at 375px
□ Mobile: Campaign tab opens bottom sheet
□ Desktop: sidebar visible, no bottom tab bar
□ Greeting includes artist name from profile.name
□ Greeting sub-line updates when pre-release date is set
□ Stats resolve from localStorage within 600ms (no indefinite shimmer)
□ Campaign HQ is above stats row on home page when data-stage="active"
□ First-run checklist shows when frc_done not set
□ All 4 checklist steps are tappable and navigate correctly
□ Checklist completion moment appears when all 4 done
□ Milestone card appears when fan count crosses threshold
□ "It's working" card appears when first click data exists
□ Fan list shows "new" badge for fans within 24h
□ Export button visible on Fans page
□ Campaign HQ state buttons: min-height 56px
□ State switch: spring animation plays on button press
□ Focus ring visible on all interactive elements
□ Upgrade bottom sheet opens from all gate CTAs
□ view-transition fires on "Edit page →" click (Chrome 126+)
```

---

## §18 Master Dashboard Doctrine

*Authoritative. Supersedes any conflicting notes elsewhere in this document. Derived from the full doctrine series (2026-03-16).*

---

### 18.1 Final integrated doctrine

**The dashboard is the backstage.** It is where the artist shapes what fans see, understands what's working, and decides what to do next. It is not a CMS. Not an analytics tool. Not a settings panel. It is the place where the artist's relationship with ABLE becomes operational.

The dashboard has one job on every visit: the artist opens it, immediately understands their current moment, and knows what to do next. If either of those things requires more than 3 seconds, the design has failed.

---

### 18.2 Final product model

The dashboard expresses six things, in this order:

1. **Context** — who the artist is, what moment they're in (greeting + lifecycle sub-line)
2. **Strategy** — what their page is doing for fans right now (Campaign HQ)
3. **Signal** — whether it's working (stats row)
4. **People** — who showed up (fan list)
5. **Action** — what to do next (nudge card, checklist)
6. **Content + Utility** — editing and management (below fold)

This is the information architecture. Module ordering must follow this hierarchy exactly.

---

### 18.3 Final emotional and trust model

**What the artist should feel on every visit:**
- "My page is working."
- "I know what it's doing."
- "I see someone showed up."
- "I know what to do next."

**Trust mechanisms:**
- Campaign HQ shows current mode + fan-facing consequence at a glance
- Every state change produces visible confirmation (preview update or toast)
- Fan list shows real emails and timestamps — not aggregate numbers
- Stats include trend direction and time frame, never raw numbers alone
- Zero states include a specific next action, never "no data yet"
- Nudge copy is tied to actual data, never generic

**Trust-breaking patterns (prohibited):**
- Zero state with no explanation
- State change with no visible confirmation
- Generic nudge copy ("post more content!")
- Stats without time frame ("47" with no context)
- Upgrade prompts without specific value proposition

---

### 18.4 Final hierarchy model

**Visual weighting by section:**

| Tier | Section | Treatment |
|---|---|---|
| 0 | Greeting + sub-line | Lightest — text only, no card |
| 1 | Campaign HQ | Heaviest — accent left-border when active, 20px+ padding |
| 2 | Stats row | Medium — display-weight numbers, muted labels |
| 2 | Fan list | Medium-high — personal, real names |
| 3 | Nudge card / Checklist strip | Light — present but de-prioritised |
| 4 | Content sections | Operational — below fold |
| 5 | Utility | Tab-navigated, not on home page |

**Top-half rule:** Greeting → Campaign HQ → Stats → Fan list. In that order. Nothing moves Campaign HQ below the fold. The checklist strip sits between greeting and Campaign HQ only for first-session (day-1) artists; after that, it sits below stats.

**Vertical rhythm (spacing that reflects priority):**
- 32px above Campaign HQ
- 20px between Campaign HQ and stats
- 24px between stats and fan list
- 28px between fan list and nudge strip
- Uniform 16px gap between items within a section

---

### 18.5 Final Campaign HQ model

Campaign HQ is the brain of the dashboard. It is the only surface where the artist makes a decision that immediately changes what a fan sees. That asymmetry defines its visual authority.

**What it must show at a glance:**
1. Current state — which mode is active (accent left-border + active state indicator)
2. Consequence — what fans see right now ("Fans see a countdown and a pre-save button.")
3. Controls — the other three states as ghost buttons with one-line consequences each

**Visual treatment:**
- Full-width card
- Accent left-border when any non-profile state is active
- State buttons: minimum 56px height, spring animation on press
- Mini phone preview on desktop only — updates immediately on state change
- No mini-preview on mobile (no space; use topbar "See your page →" link instead)

**What Campaign HQ is not:**
- A mode picker (too passive)
- A "campaign settings" form (administrative)
- One module among equals (wrong weight)
- A section the artist has to scroll to (wrong placement)

---

### 18.6 Final stats-row model

Show 3–4 metrics. Each must pass: "if this number changed significantly, would the artist want to know?"

**Metric set:**

| Metric | Label | State-specific? |
|---|---|---|
| Fan sign-ups | "fans" | No |
| Page views (7d) | "views this week" | No |
| Primary CTA taps | See below | Yes |
| Streak | "days active" | Only if > 1 |

**State-specific CTA label:**
- `pre-release` → "pre-saves"
- `live` → "stream taps"
- `gig` → "ticket taps today"
- `profile` → "link taps"

**Visual:**
- Values: 28–32px, `var(--font-d)`, weight 700
- Labels: 11px, `var(--t3)`, weight 400
- Trend: ↑/↓ at 11px, green/red inline with value
- 2×2 grid on mobile; 4-column strip on desktop
- No sparklines in V1

---

### 18.7 Final checklist / setup-strip model

The checklist is temporary infrastructure. It earns its place only when the artist is new.

**Structure:**
- Default: collapsed horizontal strip — `[=====  ] 3 of 4 done` — 44px height max
- Expanded: 4 compact rows with icons, 180px max
- Background: `var(--dash-card)`, muted border, no accent treatment

**Lifecycle:**
- Shown: `!localStorage.frc_done` AND `daysSinceOnboarding < 7`
- Day-1 only: appears between greeting and Campaign HQ
- Day 2+: appears below stats row
- On all 4 complete: accent flash → auto-dismiss 2s → `frc_done = 1`
- After 7 days regardless: silent dismiss
- Never shown again after dismissal

---

### 18.8 Final light-theme model

**Layering tokens (proposed corrections):**

| Layer | Token | Current | Proposed |
|---|---|---|---|
| Floor | `--dash-bg` | `#e8e4dd` | `#ede8e1` |
| Surface | `--dash-card` | `#ffffff` | `#f8f5f0` |
| Recessed | `--dash-field` | `#f5f2ee` | `#ede8e1` (matches floor) |
| Raised | `--dash-shell` | `#1a1a2e` | unchanged |
| Accent | `--dash-amber` | `#f4b942` | unchanged |

**Card shadow:** `box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px var(--dash-border);` — gives lift without visual complexity. No shadows larger than 4px.

Inputs (`--dash-field` = `--dash-bg`) feel recessed into the floor rather than floating above cards.

---

### 18.9 Final copy doctrine

**Copy register by area:**

| Area | Register | Example |
|---|---|---|
| Greeting | Warm, one beat | "Good to see you, [Name]." |
| Sub-line | Context-aware, factual | "You're in pre-release mode. 14 days to go." |
| Campaign HQ | Operational | "Your page is showing your pre-save campaign." |
| State consequence | Fan-facing, specific | "Fans see a countdown and a pre-save button." |
| Stats labels | Muted, factual | "fans" / "views this week" |
| Fan list heading | Personal | "47 people signed up to hear from you." |
| Nudge cards | Specific, one action | "You haven't shared your link since you went live. Post it today." |
| Upgrade prompts | Value-led, no pressure | "You're at 87 fans. Your next 13 need a place to sign up." |

**Banned dashboard phrases:**

`Analytics` · `Dashboard` (as visible label) · `Settings` (prefer specific section name) · `Configure` · `Activate` · `Manage your fans` · `View metrics` · `No data available` · `Page views` · `Click-through rate` · `Engagement` · `Conversion` · `Content` · `Creator` · `Profile` (in visible copy)

---

### 18.10 Final mobile model

**Top-half on 375px viewport (in order, above fold):**
1. Topbar (artist name + "See your page →")
2. Greeting + sub-line
3. Campaign HQ (full-width, state buttons stacked vertically, no mini-preview)
4. Stats (2×2 grid, not 4×1 strip)
5. Nudge card (max 1, compact)

**Mobile-specific rules:**
- Mini-preview: hidden on mobile
- Stats: 2×2 grid
- Checklist: 44px strip collapsed by default
- Fan list: 5 rows visible, "See all" link
- State buttons: full-width, stacked, 56px each
- Section content: horizontally scrolling card rows
- Bottom tab bar: persistent, 5 items max
- All tap targets: 44px minimum

---

### 18.11 Final guidance model

One suggested action at any given time. Never a list. The next-best action changes with the artist's state and data.

**Next-best-action by state and condition:**

| State | Condition | Action | Copy |
|---|---|---|---|
| pre-release | < 5 pre-saves | Share pre-save link | "Your campaign is live. Put the link in your bio today." |
| pre-release | > 5 pre-saves | Maintain momentum | "You have {n} pre-saves. Post a reminder today." |
| live | No stream taps in 24hr | Drive streams | "Your release is live. Share the stream link one more time." |
| gig | Tickets visible | Drive ticket taps | "Tonight. Put your ticket link in your stories." |
| profile | 0 fans | First fan capture | "No sign-ups yet. Is your fan capture CTA visible?" |
| profile | > 10 fans, no email sent | Email fans [Pro] | "You have {n} fans. You haven't emailed them yet." |

**Anti-patterns:**
- Multiple nudge cards visible at once
- Generic copy not tied to artist's actual data
- Guidance that contradicts the current campaign state
- Nagging after the artist has dismissed the nudge

---

### 18.12 Final AI model

AI in the dashboard is infrastructure, not a feature. It should make existing surfaces smarter, not add new surfaces.

**High value (V1.5+):**
- Next-best-action selection (which nudge to show given state + data)
- Smart greeting sub-line synthesis
- Anomaly detection ("your fan sign-ups doubled this week")

**Medium value (Phase 2):**
- Bio first-draft on import failure (opt-in, editable)
- CTA copy suggestions (artist chooses)

**Low value / risky:**
- Campaign state recommendations
- Chat interface (wrong paradigm)
- Auto-posting (artist control absolute)
- Silent page changes (never)
- Automated fan emails without explicit artist trigger

**Rules:**
- AI output that the artist can act on must be presented as a suggestion
- AI should never change public-facing content without explicit artist confirmation
- Pro/Artist Pro gate for AI features that require ongoing API calls
- No "Powered by AI" label unless the AI contribution is meaningful and visible

---

### 18.13 Final V1 / V1.5 / Phase 2 scope

**V1 (launch):**
- Greeting + lifecycle sub-line (state-aware)
- Campaign HQ: 4 states, mini-preview desktop, consequence copy, spring animation
- Stats row: 4 metrics, state-specific CTA label, trend direction
- Fan list: 5 rows + see all, new badge, starred, export
- Checklist: collapsed strip, auto-dismiss on complete or 7 days
- 3–4 contextual nudge cards (hardcoded logic)
- Content sections: Releases, Shows, Snap Cards (edit existing)
- Topbar: name, "See your page →", tab nav
- Mobile: bottom tab bar, stacked state buttons, 2×2 stats
- Light-theme token corrections

**Build order — Phase 1 (core control surface):**
- Greeting + lifecycle sub-line (state-aware)
- Campaign HQ: 4 states, mini-preview desktop, consequence copy, spring animation
- Stats row: 4 metrics, state-specific CTA label, trend direction
- Fan list: 5 rows + see all, new badge, starred, export
- Checklist: collapsed strip, auto-dismiss on complete or 7 days
- 3–4 contextual nudge cards (hardcoded logic)
- Content sections: Releases, Shows, Snap Cards (edit existing)
- Topbar: name, "See your page →", tab nav
- Mobile: bottom tab bar, stacked state buttons, 2×2 stats
- Light-theme token corrections

**Build order — Phase 2 (intelligence + depth — also required for launch):**
- Data-driven nudge selection (context + data aware)
- Milestone system (fan count milestones with copy)
- Streak signal in stats row
- Smart greeting sub-line (state synthesis)
- AI bio first-draft on import failure (opt-in)
- Checklist lifecycle awareness (day-1 vs returning artist)
- Fan segmentation + filters
- Email broadcast (Artist Pro gate)
- Analytics deep-dive tab (source breakdown, 7d/30d/all-time)
- AI next-best-action engine
- Campaign performance scoring

*Both phases ship at launch. Phase 1 is built first because Phase 2 depends on it. There is no post-launch deferral.*

**Post-launch (traction-dependent):**
- Label tier dashboard (10-artist aggregate)
- Advanced A/B testing
- Fan journey visualisation

---

### 18.14 Done criteria (QA)

The dashboard is done when every item below passes:

**Hierarchy:**
- [ ] Eye lands on Campaign HQ within 2 seconds of page load, no scanning required
- [ ] Campaign HQ has more space above it than any section below it

**Campaign HQ:**
- [ ] State change produces visible mini-preview update within 200ms (desktop)
- [ ] Each state button shows consequence copy on hover/focus
- [ ] State buttons minimum 56px height
- [ ] Accent left-border active on any non-profile state

**Stats:**
- [ ] 4 metrics visible, state-specific CTA label correct for all 4 modes
- [ ] Trend indicator (↑/↓) present on fan count
- [ ] Time frame label present on all metrics ("this week", "all time", "today")

**Checklist:**
- [ ] Shows only when `!frc_done`
- [ ] Collapsed to 44px by default
- [ ] Expands on tap to show 4 rows
- [ ] Auto-dismisses on all-complete with accent flash
- [ ] Never shown after `frc_done` is set

**Rhythm:**
- [ ] Campaign HQ margin-top > stats margin-top (32px vs 20px)

**Light theme:**
- [ ] `--dash-card` visibly lighter than `--dash-bg` without side-by-side comparison
- [ ] Inputs feel recessed (same tone as `--dash-bg`)
- [ ] Cards have subtle box-shadow lift

**Guidance:**
- [ ] At least one contextual nudge card renders with correct action for artist's state + data
- [ ] No generic copy ("post more content") visible anywhere on home

**Mobile:**
- [ ] Campaign HQ is first card after greeting at 375px
- [ ] State buttons stacked vertically, full-width, 56px
- [ ] Stats display as 2×2 grid, not 4×1 strip
- [ ] All tap targets ≥ 44px

**Copy:**
- [ ] Zero banned phrases visible on any string
- [ ] Greeting uses artist's name
- [ ] Sub-line reflects actual current state

**Trust:**
- [ ] Every state change produces preview update or toast
- [ ] Fan list shows real timestamps, not relative dates only
- [ ] Zero states include specific next-action copy

