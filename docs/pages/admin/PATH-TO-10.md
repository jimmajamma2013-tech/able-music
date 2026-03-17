# Admin Dashboard — Path to 10
**File: `admin.html` | Created: 2026-03-15 | Starting score: 6.8/10**

> Each item has a score impact estimate, effort level, and exact spec.

---

## FROM 6.8 → 8.5: CRITICAL FIXES (do these first)

These move the needle most. Most are spec/copy changes, not architectural rewrites.

---

### P0.1 — Mobile experience: sidebar collapse + bottom tab bar
**Current: 5/10 → Target: 8/10 | Impact: +1.5 | Effort: Medium**

The sidebar is `position:fixed; width:220px` and the main area has `margin-left:var(--sidebar)`. On 375px this means content is hidden behind/under the sidebar.

**Exact fix:**
```css
@media (max-width: 767px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.28s var(--ease); }
  .sidebar.open { transform: translateX(0); z-index: 500; }
  .main { margin-left: 0; }
  .mobile-nav { display: flex; }
  .page { padding: 16px 16px 88px; } /* bottom padding for tab bar */
}
```

**Mobile nav tabs (5 items):**
```
[Home] [Fans] [Campaign] [Content] [More]
```
- Home → page-home
- Fans → page-fans
- Campaign → Campaign HQ bottom sheet
- Content → dropdown sheet (Profile, Music, Shows, Updates, Connections, Merch, Support)
- More → remaining items (Analytics, Broadcasts, Settings)

**Stats row on mobile:**
```css
@media (max-width: 767px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
```

**Campaign HQ state buttons on mobile:**
```css
@media (max-width: 767px) {
  .chq-states { flex-direction: column; }
  .chq-state-btn { min-height: 56px; flex: none; }
}
```

---

### P0.2 — Contextual greeting system
**Current: 5/10 → Target: 9/10 | Impact: +1.5 | Effort: Low**

The greeting is currently hardcoded. Wire it to the artist's current state.

**JS function to add:**
```javascript
function buildGreetingSub(profile) {
  const now = Date.now();
  const releaseDate = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null;
  const gigExpires = parseInt(localStorage.getItem('able_gig_expires') || '0');
  const LIVE_WINDOW = 14 * 24 * 60 * 60 * 1000;

  // Gig mode
  if (gigExpires > now) {
    return 'You\'re on tonight.';
  }

  // Pre-release
  if (releaseDate && releaseDate > now) {
    const daysLeft = Math.ceil((releaseDate - now) / 86400000);
    const title = profile.release?.title || 'your release';
    if (daysLeft === 1) return `Tomorrow. Your page is set.`;
    if (daysLeft <= 3) return `${daysLeft} days. Your page is set.`;
    return `${daysLeft} days until ${title}.`;
  }

  // Live window
  if (releaseDate && now < releaseDate + LIVE_WINDOW) {
    const daysLeft = Math.ceil((releaseDate + LIVE_WINDOW - now) / 86400000);
    const title = profile.release?.title || 'your release';
    if (daysLeft <= 3) return `${daysLeft} days left in your live window.`;
    return `${title} is out. This is your window.`;
  }

  // Default
  return 'Your page, your list, your relationship.';
}
```

**Name in greeting:**
```javascript
const firstName = (profile.name || '').split(' ')[0];
document.getElementById('homeGreeting').textContent =
  firstName ? `Good to see you, ${firstName}.` : 'Good to see you.';
document.getElementById('homeSub').textContent = buildGreetingSub(profile);
```

---

### P0.3 — Day-1 zero state (replace indefinite shimmer)
**Current: 6/10 → Target: 8/10 | Impact: +0.7 | Effort: Low**

Stats shimmer runs forever when there's no data. Replace with a zero state after 600ms.

**Fix:**
```javascript
function resolveStats() {
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');

  const isDay1 = views.length === 0;

  document.getElementById('statViews').classList.remove('skel');
  document.getElementById('statViews').textContent = views.length || '0';
  document.getElementById('statViewsDelta').classList.remove('skel');
  document.getElementById('statViewsDelta').textContent = isDay1
    ? 'Day 1 ✦'
    : `+${todayCount(views)} today`;
  // ... repeat for clicks and fans
}

// Call after max 600ms
setTimeout(resolveStats, 600);
```

**Day 1 delta:**
- Show "Day 1 ✦" with amber colour for zero-baseline state
- Sparklines: don't render until day 3 (< 3 days of data → hide SVG, show nothing)

---

### P0.4 — Campaign HQ visual hierarchy
**Current: 7/10 → Target: 9/10 | Impact: +0.5 | Effort: Low**

Campaign HQ should be the most visually prominent card on the page. Currently it's the same visual weight as all other cards.

**Fixes:**
1. Move Campaign HQ ABOVE the stats row in the HTML
2. Give it a slightly larger card style:
```css
.campaign-hq {
  /* Add accent left border when a campaign is active */
}
.campaign-hq.pre-release { border-left: 3px solid #fbbf24; }
.campaign-hq.live { border-left: 3px solid #ef4444; }
.campaign-hq.gig { border-left: 3px solid #f46442; }
```
3. State buttons: add explicit `min-height: 56px` to all `.chq-state-btn`

---

### P0.5 — Upgrade nudge timing
**Current: 7/10 → Target: 8/10 | Impact: +0.3 | Effort: Low**

Upgrade nudge shows before first-run checklist — wrong priority.

**Fix:**
```javascript
function maybeShowUpgradeBar() {
  // Only show upgrade bar if:
  // 1. First-run is complete (all 4 steps done), AND
  // 2. Artist has had 3+ dashboard visits (not first visit)
  const frcDone = localStorage.getItem('frc_done');
  const visitCount = parseInt(localStorage.getItem('admin_visit_count') || '0');
  if (frcDone && visitCount >= 3) {
    document.getElementById('upgradeBar').style.display = 'flex';
  }
}
```

Also: upgrade bar should auto-hide after 1 dismissal (stored to localStorage, not sessionStorage — persistent).

---

## FROM 8.5 → 9.5: IMPORTANT IMPROVEMENTS

---

### P1.1 — Milestone moments
**Current: 4/10 → Target: 9/10 | Impact: +1.0 | Effort: Medium**

First fan, 10 fans, 50 fans, 100 fans — each gets a moment.

**Implementation: milestone card above fan list**
```javascript
const MILESTONES = [1, 10, 50, 100, 250, 500, 1000];

function checkMilestone(fans) {
  const count = fans.length;
  const reached = MILESTONES.filter(m => m <= count);
  const highest = reached[reached.length - 1];
  if (!highest) return null;

  const key = `milestone_${highest}_shown`;
  if (localStorage.getItem(key)) return null;

  localStorage.setItem(key, '1');
  return highest;
}
```

**Milestone copy (on home page, above stats, one at a time):**
```
1 fan:   "Your first fan. This is how every list starts."
10 fans: "10 fans. 10 people who said yes."
50 fans: "50 fans. 50 people your music reached directly."
100 fans: "100 fans. This is the free tier limit — and it means 100 people found you on their own."
```

**Design:** Same visual style as "It's working" card — amber tinted, dismissible after 3 seconds.

---

### P1.2 — First-run checklist improvements
**Current: 7/10 → Target: 9/10 | Impact: +0.5 | Effort: Low**

**Title change:**
```
Four things, then you're live.
```

**Completion moment:**
```javascript
function onFirstRunComplete() {
  document.getElementById('firstRunCard').innerHTML = `
    <div style="text-align:center;padding:16px;color:var(--acc);font-size:13px;font-weight:600;">
      Your page is ready. This is where your fans start.
    </div>
  `;
  setTimeout(() => {
    document.getElementById('firstRunCard').style.opacity = '0';
    document.getElementById('firstRunCard').style.transition = 'opacity 0.4s';
    setTimeout(() => document.getElementById('firstRunCard').style.display = 'none', 400);
  }, 2200);
  localStorage.setItem('frc_done', '1');
}
```

---

### P1.3 — Edit mode connection: live preview in topbar
**Current: 7/10 → Target: 9/10 | Impact: +0.5 | Effort: Medium**

Add a small "live" indicator in the topbar showing the artist's current accent colour.

**Topbar addition:**
```html
<span class="live-chip" id="liveChip" onclick="window.open('able-v7.html','_blank')">
  <span class="live-dot"></span>
  Live
</span>
```
```css
.live-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600;
  background: rgba(var(--artist-accent-rgb), 0.1);
  color: var(--artist-accent, var(--acc));
  border: 1px solid rgba(var(--artist-accent-rgb), 0.25);
  cursor: pointer; transition: all .14s;
}
.live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--artist-accent, var(--acc));
  animation: livePulse2 2s ease-in-out infinite;
}
```
This uses the artist's own accent colour, not admin amber — creates visual bridge to the profile.

---

### P1.4 — "It's working" card entrance animation
**Current: 7/10 → Target: 8/10 | Impact: +0.2 | Effort: Very low**

Currently `display:none → display:block` — add a gentle entrance:
```css
#itsWorkingCard {
  animation: fadeSlide 0.3s var(--ease) both;
}
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
```

---

### P1.5 — Copy audit pass
**Current: 6/10 → Target: 9/10 | Impact: +0.5 | Effort: Low**

Apply all copy changes from COPY.md:
- Greeting title → `homeGreeting` wired to first name
- Greeting sub-line → `homeSub` wired to contextual function
- First-run title → "Four things, then you're live."
- Stats labels → "Visits", "Clicks", "Fans", "Click rate"
- All empty states updated to COPY.md spec
- Nudge copy aligned to COPY.md
- All milestone cards added

---

### P1.6 — Focus ring glow (coherence with onboarding)
**Current: 8/10 → Target: 9/10 | Impact: +0.2 | Effort: Very low**

Replace flat 2px outline with glow pattern (matches onboarding spec):
```css
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--acc), 0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

---

## FROM 9.5 → 9.9: REFINEMENTS

---

### P2.1 — Post-gig state (within 24h of gig end)
**Impact: +0.2 | Effort: Low**

After gig mode auto-deactivates (post-midnight):
```javascript
// Check: did a gig just end in the last 24h?
const gigExpires = parseInt(localStorage.getItem('able_gig_expires') || '0');
const now = Date.now();
if (gigExpires > 0 && gigExpires < now && (now - gigExpires) < 86400000) {
  // Gig ended within last 24h
  const lastShow = getLastShow(); // from able_shows
  const newFans = getFansFromGigNight(gigExpires);
  document.getElementById('homeSub').textContent =
    `Last night at ${lastShow.venue}. ${newFans} fans joined.`;
}
```

---

### P2.2 — Auto-switch indicator in Campaign HQ
**Impact: +0.2 | Effort: Very low**

When in Pre-release state, show:
```
Switches to Live automatically on [formatted date].
```
In the `chq-auto-hint` element — currently exists but copy isn't confirmed as using this exact text.

---

### P2.3 — QR code in sidebar footer
**Impact: +0.2 | Effort: Medium**

Accent-coloured QR code linking to `ablemusic.co/[slug]?src=qr`. Added to sidebar footer or accessible via a "Share" button in topbar.

**Why it matters:** Artists at shows can show this for instant fan sign-ups. Source tracking shows "QR" as a source in analytics. Closes the offline→online loop.

---

### P2.4 — Skeleton shimmer as aria-hidden
**Impact: +0.1 | Effort: Very low**

```html
<div class="stat-value skel" id="statViews" aria-hidden="true"> </div>
```

---

### P2.5 — Toast messages on ABLE voice
**Impact: +0.1 | Effort: Very low**

Audit all `showToast()` calls. Replace generic messages:
- "Saved" → "Saved."
- "Copied!" → "Copied to clipboard."
- "Deleted" → "Removed."
- "Link copied" → "Your page link is copied."

---

## CEILING ANALYSIS

### Confirmed execution ceilings (reasons why some angles stay at 9 not 10)

**Mobile experience (ceiling at 9):** Mobile-first is correct but the desktop sidebar nav has inherent mobile compromises. A native app would be 10/10. A responsive web dashboard is a 9/10 ceiling until PWA or React Native.

**Data trust (ceiling at 9):** Until Supabase auth lands, "your data is stored locally" is technically true but not reassuring. The Supabase migration will push this closer to 10.

**Big picture coherence (ceiling at 9):** The deliberate visual difference (cream vs midnight navy) is correct design — but it creates intentional discontinuity. A "preview" chip gets to 9; fully seamless would require live page DOM in an iframe, which breaks performance budget.

---

## SCORE PROJECTIONS

| Pass | Changes | Projected score |
|---|---|---|
| Baseline | Current state | 6.8/10 |
| After P0 | Mobile + greeting + hierarchy + copy | 8.4/10 |
| After P1 | Milestones + first-run + preview chip | 9.2/10 |
| After P2 | Refinements + QR + post-gig | 9.7/10 |
| Ceiling | With Supabase auth | ~9.9/10 |
