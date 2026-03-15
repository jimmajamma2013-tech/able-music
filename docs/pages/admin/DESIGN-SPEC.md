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
