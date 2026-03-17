# World Map — Path to 10
**Created: 2026-03-16 | Current score: 5.2/10 → Target: 10/10**
**Read ANALYSIS.md first — this doc assumes you know the current state.**

---

## The gap summary

Current score: **5.2/10**. The implementation works for the primary case (artist has moments, fan views calendar, taps, sees panel, taps CTA). It does not work for:

1. The dramatic visual presence the feature requires
2. The fan dashboard cross-artist calendar (not built)
3. Edit functionality in admin
4. Full canonical moment type coverage
5. The empty state on the profile page (hides instead of communicates)
6. Multi-moment day panel (shows only first)
7. Production-grade access identity resolution
8. Early access time windows and teaser text

---

## P0 — Must fix before calling the current implementation done

These are bugs or critical gaps in the existing able-v7.html World Map code.

### P0.1 — Multi-moment day panel shows only first moment

**Current code (able-v7.html ~line 6123):**
```javascript
var moment = dayMoments[0]  // WRONG — ignores all subsequent moments
```

**Fix:** Render all `dayMoments` in the panel, not just index 0. The panel body should loop through all moments for the day and render a card for each. Each card gets its own type label, title, date, access badge, and CTA.

**CSS addition needed:**
```css
.wm-panel__moment-item {
  padding: var(--sp-3) 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.wm-panel__moment-item:last-child { border-bottom: none; }
```

**Impact:** Any artist with two things on the same day (e.g., a show and a ticket on-sale announcement) currently loses one of them from the fan's view.

---

### P0.2 — Nav buttons are 36px (below 44px tap target rule)

**Current CSS:**
```css
.wm-nav-btn { width: 36px; height: 36px; ... }
```

**Fix:**
```css
.wm-nav-btn { width: 44px; height: 44px; ... }
```

No visual change needed — the icon inside stays the same size, only the hit target grows.

---

### P0.3 — No visible section heading in profile view

**Current HTML (able-v7.html ~line 5057):**
```html
<section class="world-map-section" id="world-map-section" aria-label="What's coming" hidden>
```

There is no visible heading. The section begins with the month label. This means a fan scrolling past does not know what section this is until they stop to read.

**Fix:** Add a section header above the card:
```html
<div class="section-header">
  <h2 class="section-title">What's coming</h2>
</div>
```

Use the same `.section-header` and `.section-title` classes used by other sections on the page for visual consistency.

---

### P0.4 — Profile empty state hides the section

**Current JS (able-v7.html ~line 6394):**
```javascript
var hasUpcoming = wmAllMoments.some(function(m) { return m.date >= today && m.date <= in12mo })
if (!hasUpcoming) return  // section stays hidden
```

**Fix:** Do not return when no upcoming moments. Instead, show the section with an empty grid and a footer message.

```javascript
if (!hasUpcoming) {
  section.hidden = false
  renderWorldMapGrid(wmYear, wmMonth, [], null, null)  // empty grid
  var footer = document.getElementById('wm-footer')
  if (footer) {
    footer.hidden = false
    footer.innerHTML = '<span class="wm-footer-empty">Nothing announced yet. Check back.</span>'
  }
  return  // skip moment-specific setup
}
```

**CSS addition:**
```css
.wm-footer-empty {
  font-size: var(--text-sm);
  color: var(--color-text-3);
  font-style: italic;
}
```

In owner mode (`?edit=1` or `profile.handle === pageHandle`), replace the footer message with:
```html
<a class="wm-footer-link" href="admin.html">Add shows and moments to your world →</a>
```

---

### P0.5 — Focus trap missing in World Map panel

The panel opens with `panel.focus()` but focus is not trapped. A keyboard user tabbing through the panel will exit it and continue tabbing through the page behind the backdrop.

**Fix:** Add a focus trap on panel open. Use the standard ABLE pattern (same as Close Circle sheet):

```javascript
function trapFocusInPanel() {
  var panel = document.getElementById('wm-panel')
  var focusable = panel.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])')
  var first = focusable[0]
  var last = focusable[focusable.length - 1]
  panel.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  })
}
```

Call `trapFocusInPanel()` after panel body is rendered in `openWorldMapPanel()`.

Return focus to the triggering cell on close:
```javascript
var lastTriggerCell = null
// store before opening:
lastTriggerCell = cellEl
// in closeWorldMapPanel():
if (lastTriggerCell) { lastTriggerCell.focus(); lastTriggerCell = null }
```

---

## P1 — Admin moment management (add/edit/delete, canonical type alignment)

### P1.1 — Add edit functionality to moments

Currently moments cannot be edited — only deleted and re-added. This is a significant friction point.

**Implementation:**

The add form already exists. Repurpose it for edit by pre-filling values.

```javascript
var wmEditingId = null  // null = adding, string = editing this id

function ywEditMoment(id) {
  var profile = loadProfile()
  var m = (profile.moments || []).find(function(x) { return x.id === id })
  if (!m) return

  wmEditingId = id

  // Pre-fill form
  document.getElementById('ywTitle').value = m.title || ''
  document.getElementById('ywDate').value = m.date || ''
  document.getElementById('ywNote').value = m.artistNote || ''
  document.getElementById('ywCtaUrl').value = (m.cta && m.cta.url) || ''
  document.getElementById('ywCtaLabel').value = (m.cta && m.cta.label) || ''

  // Select type button
  document.querySelectorAll('.yw-type-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.type === m.type)
  })

  // Select access button
  document.querySelectorAll('.yw-access-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.access === (m.access || 'public'))
  })

  // Update save button label
  document.querySelector('.yw-save-btn').textContent = 'Save changes'

  ywToggleAddForm(true)
}
```

In `ywSaveMoment()`, check `wmEditingId`:
```javascript
if (wmEditingId) {
  p.moments = (p.moments || []).map(function(m) { return m.id === wmEditingId ? newMoment : m })
  wmEditingId = null
} else {
  p.moments = (p.moments || []).concat([newMoment])
}
```

---

### P1.2 — Reconcile type vocabulary with canonical model

The canonical model defines 9 types. Admin and profile define 8 types, with a different set. Both need updating.

**Canonical model update (`docs/v6/data/CANONICAL_OBJECT_MODEL.md`):**

Add the practical extensions to the canonical type list:
```javascript
type: 'show' | 'release' | 'livestream' | 'early_access' | 'rehearsal' |
      'interview' | 'session' | 'remix' | 'collab' |
      'on_sale' | 'merch_drop' | 'announcement'
      // 'private_access' maps to access.level: 'private', not a type
```

Remove `private_access` from the type list — it is an access-level concept, not a type.

**Admin type grid update (`admin.html`):**

```html
<button class="yw-type-btn active" data-type="release">Release</button>
<button class="yw-type-btn" data-type="show">Show</button>
<button class="yw-type-btn" data-type="on_sale">On sale</button>
<button class="yw-type-btn" data-type="merch_drop">Merch drop</button>
<button class="yw-type-btn" data-type="early_access">Early access</button>
<button class="yw-type-btn" data-type="livestream">Livestream</button>
<button class="yw-type-btn" data-type="rehearsal">Rehearsal</button>
<button class="yw-type-btn" data-type="interview">Interview</button>
<button class="yw-type-btn" data-type="session">Session</button>
<button class="yw-type-btn" data-type="remix">Remix</button>
<button class="yw-type-btn" data-type="collab">Collab</button>
<button class="yw-type-btn" data-type="announcement">News</button>
```

`private_access` button removed. Private is set via the access level selector, not the type.

**Profile WM_TYPE_COLOR and WM_TYPE_LABEL update (`able-v7.html`):**

```javascript
const WM_TYPE_COLOR = {
  release:      'var(--color-accent)',
  show:         '#e8715a',
  on_sale:      '#f4b942',
  merch_drop:   '#2db8b0',
  early_access: '#d4a84b',
  livestream:   '#4b8fd4',
  rehearsal:    '#7a6cf4',
  interview:    '#888888',
  session:      '#6db88e',
  remix:        '#c76bd4',
  collab:       '#d47a2a',
  announcement: 'rgba(255,255,255,0.7)',
}

const WM_TYPE_LABEL = {
  release:      'Release',
  show:         'Show',
  on_sale:      'On sale',
  merch_drop:   'Merch drop',
  early_access: 'Early access',
  livestream:   'Livestream',
  rehearsal:    'Rehearsal',
  interview:    'Interview',
  session:      'Session',
  remix:        'Remix',
  collab:       'Collab',
  announcement: 'Announcement',
}
```

---

### P1.3 — Add teaser text and early access hours to the admin form

The admin add/edit form must include:

**When access level is Fans, Supporters, or Invite:**
```html
<div class="yw-form-label" id="yw-earlyaccess-label" style="margin-top:10px; display:none;">
  Early access
</div>
<div style="display:flex;align-items:center;gap:8px;" id="yw-earlyaccess-row" style="display:none;">
  <input class="yw-form-input" type="number" id="ywEarlyHours" min="0" max="168" placeholder="0" style="width:60px;">
  <span style="font-size:13px;opacity:.6;">hours early</span>
</div>

<div class="yw-form-label" style="margin-top:10px;" id="yw-teaser-label" style="display:none;">
  Teaser text
</div>
<input class="yw-form-input" type="text" id="ywTeaserText" placeholder="What do your close fans know?"
  maxlength="80" id="yw-teaser-input" style="display:none;">
```

Show/hide these rows based on the selected access level:
```javascript
accessRow.addEventListener('click', function(e) {
  var btn = e.target.closest('.yw-access-btn')
  if (!btn) return
  var access = btn.dataset.access
  var isGated = access === 'fan' || access === 'supporter' || access === 'invite'
  document.getElementById('yw-earlyaccess-label').style.display = isGated ? '' : 'none'
  document.getElementById('yw-earlyaccess-row').style.display  = isGated ? '' : 'none'
  document.getElementById('yw-teaser-label').style.display     = isGated ? '' : 'none'
  document.getElementById('yw-teaser-input').style.display     = isGated ? '' : 'none'
})
```

Save these values in `ywSaveMoment()`:
```javascript
var earlyHours = parseInt(document.getElementById('ywEarlyHours')?.value) || 0
var teaserText = document.getElementById('ywTeaserText')?.value.trim() || ''

// In the saved moment object:
access: {
  level:            accessBtn.dataset.access,
  earlyAccessHours: earlyHours > 0 ? earlyHours : null,
  teaserVisible:    !!(teaserText),
  teaserText:       teaserText || null,
  inviteList:       null,
}
```

Note: the current implementation stores `access` as a string (`m.access = 'public'`). This needs migrating to the canonical object shape. The `resolveAccess()` function in able-v7.html must handle both shapes during transition:

```javascript
function resolveAccess(moment, userState) {
  var level = (typeof moment.access === 'object') ? moment.access.level : moment.access
  switch (level) {
    case 'public':    return 'full'
    case 'fan':       return userState.isFan ? 'full' : 'gate_fan'
    case 'supporter': return userState.isSupporter ? 'full' : 'gate_supporter'
    case 'private':   return 'enquire'
    case 'invite':    return 'enquire'
    default:          return 'full'
  }
}
```

---

### P1.4 — Render teaser text in the World Map panel

When `resolveAccess()` returns `gate_fan` or `gate_supporter`, display the teaser text above the gate button:

```javascript
var teaserText = (typeof moment.access === 'object' && moment.access.teaserText)
  ? moment.access.teaserText
  : WM_DEFAULT_TEASER[level] || ''

if (teaserText) {
  ctaHtml = '<p class="wm-panel__teaser">' + escHtml(teaserText) + '</p>' + ctaHtml
}
```

```css
.wm-panel__teaser {
  font-size: var(--text-sm);
  color: var(--color-text-2);
  font-style: italic;
  margin-bottom: var(--sp-3);
  line-height: 1.5;
}
```

Default teaser copy constants:
```javascript
const WM_DEFAULT_TEASER = {
  fan:       'Sign up to get early access.',
  supporter: 'Close circle gets this first.',
  invite:    'This is for a select few.',
}
```

---

## P2 — Fan dashboard cross-artist calendar

**This is Phase 2 — requires Supabase. But the V1 feed improvement can ship now.**

### P2.1 — V1 feed: stop using age-relative seeding for future events

The current `writeFanFollow()` seeds events and releases into `able_fan_feed` with `age: Date.now()` — treating future dates as if they just happened. This makes the timing display misleading.

**Fix:** Add a `futureDate` field to feed items. Fan.html sorts by `futureDate` when present:

```javascript
// In writeFanFollow() for shows:
if (ev.date && ev.date >= isoToday) {
  feed.push({
    id: 'evt_' + ev.id,
    artistId: artistId,
    type: 'event',
    title: ev.venue || 'Live show',
    sub: ev.city || '',
    url: ev.ticketUrl || '',
    age: Date.now(),
    futureDate: ev.date,  // ISO date string
  })
}
```

In fan.html `renderFollowing()`, separate future items:
```javascript
const upcomingItems = feed.filter(i => i.futureDate && i.futureDate >= isoToday).sort((a,b) => a.futureDate.localeCompare(b.futureDate))
const recentItems = feed.filter(i => !i.futureDate && (Date.now() - i.age) < SEVEN_DAYS)
```

Show "Coming up" strip for upcomingItems, "This week" for recentItems. Today's upcoming events get the "Tonight" treatment.

### P2.2 — V2 Supabase: dedicated moments query for fan.html

```sql
-- Get upcoming public moments for all artists a fan follows
SELECT m.*, p.name as artist_name, p.accent, p.handle
FROM moments m
JOIN profiles p ON m.artist_handle = p.handle
JOIN fan_follows ff ON ff.artist_handle = p.handle
WHERE ff.fan_email = auth.email()
  AND m.date >= CURRENT_DATE
  AND m.active = true
  AND (
    m.access_level = 'public'
    OR (m.access_level = 'fan')  -- RLS confirms fan is following
    OR (m.access_level = 'supporter' AND EXISTS (
      SELECT 1 FROM supporter_status s
      WHERE s.fan_email = auth.email()
      AND s.artist_handle = m.artist_handle
      AND s.status = 'active'
    ))
  )
ORDER BY m.date ASC;
```

### P2.3 — fan.html calendar mode toggle (Phase 2)

Add a `[Feed] [Calendar]` toggle to the top of the Following view. Calendar mode renders the date-strip described in SPEC.md §5.1. This is a new UI component — 40–60 lines of JS, no complex dependencies.

---

## P3 — Supporter early access wiring

**Requires Supabase auth to identify the fan across sessions.**

### P3.1 — Replace prototype identity resolution with Supabase

**Current (prototype):**
```javascript
var userState = {
  isFan: fans.length > 0,              // any fans on device = is fan
  isSupporter: !!(profile.supporterSince)  // artist's own supporter status
}
```

**Target (Supabase):**
```javascript
async function resolveUserState(artistHandle) {
  const { data: session } = await supabase.auth.getSession()
  if (!session?.user) return { isFan: false, isSupporter: false }

  const fanEmail = session.user.email

  const { data: follow } = await supabase
    .from('fan_follows')
    .select('id')
    .eq('artist_handle', artistHandle)
    .eq('fan_email', fanEmail)
    .maybeSingle()

  const { data: supporter } = await supabase
    .from('supporter_status')
    .select('status')
    .eq('artist_handle', artistHandle)
    .eq('fan_email', fanEmail)
    .eq('status', 'active')
    .maybeSingle()

  return {
    isFan:       !!follow,
    isSupporter: !!supporter,
  }
}
```

This query runs once on page load. Result cached for the session. World Map panel renders with correct access after `await resolveUserState()`.

### P3.2 — Early access window logic

When Supabase is live, implement the `earlyAccessHours` window check:

```javascript
function isInEarlyAccessWindow(moment, isFanOrSupporter) {
  if (!isFanOrSupporter) return false
  var earlyHours = (moment.access && moment.access.earlyAccessHours) || 0
  if (!earlyHours) return false
  var releaseMs = new Date(moment.date + 'T00:00:00').getTime()
  var windowOpenMs = releaseMs - (earlyHours * 3600000)
  return Date.now() >= windowOpenMs && Date.now() < releaseMs
}
```

In `resolveAccess()`, check this before returning `gate_fan` / `gate_supporter`:
```javascript
case 'fan':
  if (userState.isFan) return 'full'
  if (isInEarlyAccessWindow(moment, userState.isFan)) return 'full'
  return 'gate_fan'
```

---

## Playwright test suite for the World Map

All tests are for the profile page (`able-v7.html`). Seed test profile data before each test.

```javascript
// Test 1: Calendar renders with correct current month
// Seed: profile with one show next month
// Assert: wm-month-label shows correct month
// Assert: one cell has wm-cell--has-moment class
// Assert: that cell has one wm-dot

// Test 2: Tapping a moment cell opens the panel
// Seed: profile with release moment 14 days from now
// Action: click the cell with data-date matching release date
// Assert: wm-panel has class 'open'
// Assert: wm-panel__title contains release title
// Assert: panel CTA text is "Pre-save →"

// Test 3: Past dates are dimmed
// Seed: profile with show date 7 days in the past
// Assert: cell for that date has wm-cell--past class
// Assert: wm-dot inside has opacity 0.40

// Test 4: Today is highlighted
// Assert: cell matching today's date has wm-cell--today
// Assert: date number has color: var(--color-accent)

// Test 5: Month navigation
// Action: click wm-next button
// Assert: wm-month-label changes to next month name
// Action: click wm-prev button
// Assert: wm-month-label returns to original month

// Test 6: Swipe navigation (touch)
// Simulate touchstart + touchend with dx=80, dy=5 (horizontal swipe)
// Assert: wm-month-label changes

// Test 7: Fan-gated moment shows gate button
// Seed: moment with access: { level: 'fan' }, no fans in able_fans
// Tap the moment cell
// Assert: panel contains '#wm-fan-gate' button
// Assert: teaser text is visible

// Test 8: Supporter-gated moment shows close circle button
// Seed: moment with access: { level: 'supporter' }, no supporterSince
// Tap the moment cell
// Assert: panel contains '#wm-supporter-gate' button

// Test 9: Empty state shows message not blank section
// Seed: profile with no moments, no events, no releaseDate
// Assert: world-map-section is visible (not hidden)
// Assert: wm-footer-empty text is "Nothing announced yet. Check back."

// Test 10: Multi-moment day shows all moments in panel
// Seed: profile with show and release on same date
// Tap that date cell
// Assert: panel body contains 2 moment items
// Assert: both titles are present

// Test 11: Type colour coding
// Seed: show moment and release moment on different dates
// Assert: show dot has background #e8715a
// Assert: release dot has background var(--color-accent) (computed)

// Test 12: Light theme renders correctly
// Set data-theme="light" on document element
// Seed: profile with moments
// Assert: wm-grid border-top is rgba(0,0,0,0.06)
// Assert: no horizontal overflow at 375px viewport
```

---

## Visual improvements needed (CSS/JS spec)

### Cell height

Change from `min-height: 48px` to `min-height: 64px`. This gives the calendar the physical presence it needs. At 7 columns × 64px cells, the calendar is 448px minimum height — commanding.

```css
.wm-cell { min-height: 64px; padding: 8px 4px 6px; }
```

### Month label scale

Current: 32px. Target: 52px in Barlow Condensed, bold, letter-spacing -0.02em.

```css
.wm-month-label {
  font-family: var(--font-d);
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--color-text);
}
```

At 52px, the month name feels typographically dominant — it announces the month rather than just labelling it.

### Card background differentiation

The `world-map-card` should feel distinct from the rest of the page. A subtle gradient or deeper background signals that this is a different kind of content.

```css
.world-map-card {
  background: linear-gradient(
    180deg,
    rgba(var(--color-accent-rgb), 0.04) 0%,
    var(--color-surface) 30%
  );
  border-radius: var(--r-lg);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
}
```

### Featured moment above-grid callout

When a featured moment exists (within 7 days), show a single-line callout above the grid:

```html
<div class="wm-featured-bar" id="wm-featured-bar" hidden>
  <span class="wm-featured-bar__dot"></span>
  <span class="wm-featured-bar__text" id="wm-featured-text"></span>
</div>
```

```css
.wm-featured-bar {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-5);
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: 600;
}
.wm-featured-bar__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: wm-attention 1.4s ease-out infinite;
  flex-shrink: 0;
}
```

JS: When `featured` moment exists, set `wm-featured-bar` visible and populate text:
```javascript
if (featured) {
  var bar = document.getElementById('wm-featured-bar')
  var txt = document.getElementById('wm-featured-text')
  if (bar && txt) {
    txt.textContent = WM_TYPE_LABEL[featured.type] + ' · ' + featured.title
    bar.hidden = false
  }
}
```

---

## P0 — Three fixes that take the calendar from 2/10 (fan dashboard) to deployable

The fan dashboard calendar (Dimension 3 in ANALYSIS.md) scores 2/10 — the calendar view does not exist, the feed is a one-time snapshot, and multi-moment days are broken. The following three fixes address the most critical gaps and make the calendar reach a deployable 6.5/10 state.

---

### Fix 1: Multi-moment panel — render all moments on a date, not just index 0

**Current bug:** When multiple moments fall on the same date, the panel shows only `dayMoments[0]`.

**Exact fix (able-v7.html):** In the `openWorldMapPanel()` function, replace:
```javascript
var moment = dayMoments[0]  // WRONG
```
with a loop that renders a card for each moment in `dayMoments`. Each card needs its own type label, title, date string, access badge, and CTA. CSS to add:
```css
.wm-panel__moment-item {
  padding: var(--sp-3) 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.wm-panel__moment-item:last-child { border-bottom: none; }
```
**Impact:** Any artist with a show and a release on the same date currently loses one of them from fan view. This is a data loss bug from the fan's perspective.

---

### Fix 2: Nav buttons — 36px to 44px touch targets

**Current violation:** `.wm-nav-btn { width: 36px; height: 36px; }` is below the 44px CLAUDE.md rule.

**Exact fix (able-v7.html):** One CSS change:
```css
.wm-nav-btn { width: 44px; height: 44px; }
```
The icon inside the button does not change size. Only the tap target grows. No visual difference on screen — just a larger hit area for thumbs.

---

### Fix 3: Section heading — add the `<h2>` for the events section in able-v7.html

**Current state:** The World Map section has `aria-label="What's coming"` (accessibility label only) but no visible heading. A fan scrolling past the calendar does not know what section this is.

**Exact fix (able-v7.html):** Add above the World Map card:
```html
<div class="section-header">
  <h2 class="section-title">What's coming</h2>
</div>
```
Use the same `.section-header` and `.section-title` classes used by the Music, Events, and Merch sections. This gives the World Map the same visual weight as other sections and makes it scannable when scrolling.

---

## Score projection after each priority level

| Stage | Dimension 3 score | Overall score | What ships |
|---|---|---|---|
| Before P0 fixes | 2/10 | 5.2/10 | Current state — fan dashboard not built, multi-moment bug, small nav buttons, no heading |
| P0 (3 fixes above) | 4.5/10 | 6.5/10 | Multi-moment panel, 44px nav buttons, section heading — calendar is now deployable |
| P0 + P1 (admin edit, types, teaser) | 5.5/10 | 7.5/10 | Edit moments, canonical types, teaser text, early access hours field |
| P0 + P1 + visual | 5.5/10 | 8.5/10 | Oversized month label, 64px cells, featured bar, card gradient |
| P0 + P1 + visual + P2 (fan.html) | 7.5/10 | 9.0/10 | Live feed from profile (SPEC.md §5.6), date-strip, Tonight banner |
| P3 (Supabase gating) | 9.5/10 | 9.5/10 | Real identity, early access window, Realtime subscription |
| All complete | 10/10 | 10/10 | Everything in SPEC.md implemented and tested |

The fan dashboard jumps from 2/10 to 6.5/10 with the three P0 fixes, because those fixes unblock the basic calendar experience. The jump to 8.5/10 with the P2 fan.html work (live feed from profile + date-strip + Tonight banner) is the most significant single step — that is when the fan dashboard becomes a genuinely useful product surface, not just a placeholder.
