# ABLE CRM — Path to 10
**Created: 2026-03-16 | Updated: 2026-03-16 (session 12)**

> ~~Current score: 4/10.~~ **Updated score: 7/10** — all Phase 0 items complete. This document maps the exact changes required to reach 10/10, grouped by phase and priority.

---

## Phase 0 — localStorage (before Supabase) — target 7/10

All changes in this phase require no backend. They improve the CRM within the current localStorage architecture.

### ~~P0.1~~ ✅ — Capture `campaignState` at fan sign-up (CRITICAL)

**File:** `able-v7.html`
**Where exactly:** Search for the fan sign-up submit handler — look for the function that handles the fan email form submission. It will contain a push to `able_fans` in localStorage. Add the campaign context fields to the fan object being pushed.

**Find this pattern in able-v7.html:**
```javascript
// Look for something like:
// able_fans.push({ email: ..., ts: ..., source: ... })
// or
// fanRecord = { email: ..., ts: ..., source: ... }
// ADD the campaign state fields to this object, immediately before the push.
```

**Exact code to add (approximately 20 lines):**
```javascript
// --- CAMPAIGN CONTEXT (P0.1) --- add these lines immediately before writing to able_fans ---
const _profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const _computedState = (function() {
  if (_profile.stateOverride && _profile.stateOverride !== 'auto') return _profile.stateOverride;
  const now = Date.now();
  const releaseMs = _profile.releaseDate ? new Date(_profile.releaseDate).getTime() : null;
  if (!releaseMs) return 'profile';
  if (now < releaseMs) return 'pre-release';
  if (now < releaseMs + 14 * 24 * 60 * 60 * 1000) return 'live';
  return 'profile';
})();

const _releaseId = _profile.releaseDate
  ? `${(_profile.releaseTitle || 'release').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${_profile.releaseDate}`
  : null;

let _momentId = null;
if (_computedState === 'gig') {
  const _shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
  const _featured = _shows.find(function(s) { return s.featured; }) || _shows[0] || null;
  _momentId = _featured ? (_featured.id || _featured.venue || null) : null;
}
// --- END CAMPAIGN CONTEXT ---

// Then add to the fan object:
// campaignState: _computedState,
// releaseId:     _releaseId,
// momentId:      _momentId,
// optIn:         true,
// consentVersion:'2026-03-16',
```

**Impact:** This single change raises the music-context awareness dimension from 2/10 to 8/10. It is the highest-value change in the entire CRM backlog and requires approximately 20 lines of code. After this is done, every new fan record carries the story of which moment in the artist's campaign they arrived in.

**Existing fans:** will have no `campaignState`. That is acceptable — it is captured going forward. No retrospective derivation.

**Verification:** After adding this, sign up a test fan while each campaign state is active (profile / pre-release / live / gig). Open localStorage and confirm `campaignState` is set correctly on each fan record.

---

### P0.2 — Migrate starred state into the fan record

**Where:** `admin.html` — fan sign-up handler (if fans are written from admin for testing) and the renderFanList / openFanDetailSheet functions.

**What:** Deprecate `able_starred_fans` string array. Write `isStarred: false` on every new fan record. When star is toggled, update the fan record in `able_fans` directly.

```javascript
function toggleFanStar(email) {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const fan = fans.find(f => f.email === email);
  if (!fan) return;
  fan.isStarred = !fan.isStarred;
  fan.starred = fan.isStarred;  // both fields during migration
  localStorage.setItem('able_fans', JSON.stringify(fans));
}
```

Migration: on first load of admin.html after this change, read `able_starred_fans`, apply `isStarred: true` to matching records in `able_fans`, then clear `able_starred_fans`.

**Impact:** Fixes the GDPR gap where deleted fans remain in the starred list. Required before Supabase migration.

---

### P0.3 — Fan level UI in the detail sheet

**Where:** `admin.html`, `openFanDetailSheet()` function.

**What:** Add four level selector chips to the fan detail sheet:

```html
<div style="margin-bottom:14px;">
  <div class="field-label" style="margin-bottom:8px;">Level</div>
  <div class="level-chips" data-email="[email]">
    <button class="level-chip [active-if-listener]" data-level="listener">Listener</button>
    <button class="level-chip [active-if-fan]" data-level="fan">Fan</button>
    <button class="level-chip [active-if-supporter]" data-level="supporter">Supporter</button>
    <button class="level-chip [active-if-core]" data-level="core">Core</button>
  </div>
</div>
```

On chip click: update `fan.level` in `able_fans` array, persist, show "Saved." toast.

**New fan default:** `level: 'listener'` set at sign-up in able-v7.html.

**Impact:** Raises fan tagging/levelling dimension from 2/10 to 6/10. Enables level-based filtering and broadcast segmentation.

---

### P0.4 — Artist notes on fan records

**Where:** `admin.html`, `openFanDetailSheet()` function.

**What:** Add a textarea to the fan detail sheet for private artist notes.

```html
<div style="margin-bottom:14px;">
  <div class="field-label" style="margin-bottom:6px;">
    Note <span style="font-weight:400;opacity:.5;">(only you see this)</span>
  </div>
  <textarea
    class="field-input"
    id="fanNoteInput"
    rows="3"
    maxlength="280"
    placeholder="Something only you'd know about this person."
    style="resize:none;font-size:13px;"
  ></textarea>
  <div style="font-size:10px;color:var(--dash-t3);text-align:right;" id="fanNoteCount">0/280</div>
</div>
```

Auto-saves on blur. Shows "Saved." toast.

**Impact:** Makes the detail sheet feel like a real relationship tool rather than just a record display.

---

### P0.5 — Campaign context block in fan detail sheet

**Where:** `admin.html`, `openFanDetailSheet()` function.

**What:** Show the fan's `campaignState` and `releaseId` in the header block when present.

```javascript
function buildCampaignContextLine(fan) {
  if (!fan.campaignState || fan.campaignState === 'profile') {
    return '<div class="fan-detail-ctx">Signed up while your page was in default mode.</div>';
  }
  if (fan.campaignState === 'pre-release' && fan.releaseId) {
    const title = fan.releaseId.split('-').slice(0,-3).join(' ');  // rough inverse of slug
    return `<div class="fan-detail-ctx">Signed up during <strong>pre-release</strong> — ${title}</div>`;
  }
  if (fan.campaignState === 'live' && fan.releaseId) {
    const title = fan.releaseId.split('-').slice(0,-3).join(' ');
    return `<div class="fan-detail-ctx">Signed up on <strong>release day</strong> — ${title}</div>`;
  }
  if (fan.campaignState === 'gig') {
    return `<div class="fan-detail-ctx">Signed up on a <strong>gig night</strong>${fan.momentId ? ` — show ID ${fan.momentId}` : ''}</div>`;
  }
  return '';
}
```

**Impact:** Makes the differentiation visible and tangible to the artist. When they see "Signed up during pre-release — Echoes" next to a fan's email, the CRM's value is self-evident.

---

### P0.6 — Campaign breakdown in the fan stats panel

**Where:** `admin.html`, `renderFanList()` / `renderSourceBreakdown()`.

**What:** Below the source breakdown bars, add a second breakdown section: "When they signed up."

```javascript
function renderCampaignBreakdown(fans) {
  const el = document.getElementById('campaignBreakdownBars');
  if (!el) return;
  const counts = { 'pre-release': 0, 'live': 0, 'gig': 0, 'profile': 0 };
  fans.forEach(f => {
    const state = f.campaignState || 'profile';
    if (counts[state] !== undefined) counts[state]++;
  });
  // Only render if there is more than one type present
  const uniqueStates = Object.values(counts).filter(v => v > 0).length;
  if (uniqueStates <= 1) { el.innerHTML = ''; return; }
  const total = fans.length || 1;
  const labels = {
    'pre-release': 'Pre-release',
    'live': 'Release day',
    'gig': 'Gig night',
    'profile': 'Profile mode'
  };
  const colours = {
    'pre-release': '#fbbf24',
    'live': '#ef4444',
    'gig': '#f46442',
    'profile': '#999'
  };
  el.innerHTML = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .sort(([,a],[,b]) => b - a)
    .map(([state, count]) => {
      const pct = Math.round(count / total * 100);
      return `<div class="breakdown-row">
        <span class="breakdown-label">${labels[state]}</span>
        <div class="breakdown-bar-wrap">
          <div class="breakdown-bar" style="width:${pct}%;background:${colours[state]}"></div>
        </div>
        <span class="breakdown-pct">${count}</span>
      </div>`;
    }).join('');
}
```

This panel is empty until at least two different campaign states are represented in the fan list. This prevents it from being confusing on a new account.

---

### P0.7 — Richer CSV export

**Where:** `admin.html`, `exportFans()` and the inline export button handler.

**What:** Update both export paths to include all currently-available fields:
`Email, Name, Level, Date joined, Source, Campaign state at sign-up, Release, Starred, Opted in, Confirmed`

Uses the `exportFansAsCSV()` reference implementation in SPEC.md Section 7.

---

### P0.8 — Filter pill: Starred

**Where:** `admin.html`, filter pills on the Fans page.

**What:** Add a "Starred" filter pill that shows only fans where `isStarred = true` (after P0.2 migration).

```html
<button class="filter-pill" data-filter="starred">Starred</button>
```

```javascript
// In renderFanList filter logic:
if (_activeFanFilter === 'starred') {
  return (f.isStarred || starred.includes(f.email));
}
```

---

### P0.9 — `optIn` written consistently at sign-up

**Where:** `able-v7.html`, fan sign-up submit handler.

**What:** Ensure every new fan record includes `optIn: true` and `consent: true`. This is required for GDPR compliance and for the broadcast system to know who can receive emails.

This is a one-line fix but it is non-negotiable before the email broadcast system is wired.

---

### P0.10 — Milestone cards (first fan, 10, 50, 100)

Already specced in `docs/pages/admin/DESIGN-SPEC.md` §7. The milestone system is built. Verify it fires correctly on fan count crossings.

---

## Phase 0 score target: 7/10

After completing P0.1–P0.9:

| Dimension | Current | After P0 |
|---|---|---|
| 1. Fan record completeness | 5 | 7 |
| 2. Fan segmentation | 4 | 6 |
| 3. Fan tagging / levelling | 2 | 6 |
| 4. Fan search | 6 | 6 |
| 5. Export (CSV) | 6 | 8 |
| 6. Fan contact (individual) | 2 | 2 |
| 7. Broadcast | 3 | 3 |
| 8. Automation | 4 | 5 |
| 9. GDPR compliance | 5 | 8 |
| 10. Music-context awareness | 2 | 8 |
| **Overall** | **4** | **6.9 → 7** |

---

## Phase 1 — First real artists on platform — target 8/10

These improvements happen when real artists are using ABLE and Supabase is live.

### P1.1 — Fan confirmation email fully wired with campaign state

The Netlify function `fan-confirmation.js` already accepts `page_state` in its request body. Wire this from able-v7.html so the confirmation email's body changes based on campaign state.

This requires P0.1 (campaign state captured at sign-up) to be done first.

### P1.2 — Supabase migration of fan records

Execute `flushToSupabase()` from `docs/systems/data-architecture/SPEC.md` §Migration. Fan records including `campaign_state`, `release_id`, `moment_id`, `level`, `is_starred`, `notes` must all flush correctly.

Add the new columns to the `fans` table:
```sql
ALTER TABLE fans
  ADD COLUMN campaign_state    TEXT,
  ADD COLUMN release_id        TEXT,
  ADD COLUMN moment_id         TEXT,
  ADD COLUMN level             TEXT NOT NULL DEFAULT 'listener',
  ADD COLUMN notes             TEXT,
  ADD COLUMN tags              TEXT[] DEFAULT '{}';
```

### P1.3 — Day-7 artist check-in nudge

Admin.html: 7 days after first fan sign-up, show a nudge card:
```
[N] people have found your page since you launched.
[View your fans →]
```

This is the most impactful retention touch for early-stage artists. If they haven't visited admin.html in 7 days and have fans, this is a re-engagement moment.

### P1.4 — Tags UI in fan detail sheet

After the notes field (P0.4), add a tags input:

```
Tags: [london × ] [came-to-oslo-show × ] [+]
```

Freeform, comma-or-enter separated. Artist creates their own vocabulary. Saved to `fan.tags[]`.

---

## Phase 2 — Supabase + broadcasts — target 9/10

### P2.1 — Broadcast system wired

Plain text compose → Resend → delivery. Rate limited by tier. Audience: all fans, or a segment. Sends only to confirmed, opted-in fans.

See SPEC.md Section 5 for full compose flow spec.

### P2.2 — Auto-segments from campaign data

After Supabase is live, generate segments automatically:
- "During [release title] pre-release" — query: `campaign_state = 'pre-release' AND release_id = '[current]'`
- "On gig night — [venue]" — query: `campaign_state = 'gig' AND moment_id = '[show.id]'`
- "From Instagram" — query: `source = 'ig'`

Segments are rendered in the Fans page header, above the full list. Each shows fan count and a "Write to them →" link (Artist Pro gate).

### P2.3 — Follow-up nudge after campaign ends

When artist's page transitions from `live` back to `profile` (14 days post-release): show the follow-up nudge (SPEC.md §6.3). Requires campaign-state history to know which release just ended.

### P2.4 — Supabase full-text fan search

Replace `includes()` substring search with Supabase full-text search across `email`, `name`, `tags`, `notes`.

---

## Phase 3 — Scale — target 10/10

### P3.1 — Fan activity tracking (page visits attributed)

When a fan clicks through from the confirmation email (via `?ref=email` UTM), the view event is linked back to their fan record. The fan detail sheet can then show: "Visited your page 3 times since signing up."

Requires: session linking (view events carry `session_id`, fan sign-up writes `session_id` to the fan record at creation time).

### P3.2 — Fan geography (opt-in location)

Fan.html allows fans to share their approximate location (city, country). When a fan follows an artist via fan.html, that location is shared with the artist's fan record.

The Fans page then shows a rough geographic breakdown: "48% UK · 22% US · 12% Europe."

This is opt-in at the fan level — no location without explicit fan permission.

### P3.3 — Broadcast analytics (open rate, click rate)

Basic: Resend provides open and click events via webhook. Show per-broadcast stats:
- Sent to: [N]
- Opened: [N] ([%])
- Clicked: [N] ([%])

Available in the broadcast history view, not shown as a live dashboard (too much pressure on artists to optimise metrics).

### P3.4 — Individual fan contact (Artist tier)

Wire the "Send a message" button in the fan detail sheet. Direct individual email via Resend. From: artist name. Not a broadcast — a single email to one fan.

Use case: artist wants to personally thank a core fan, or respond to a note.

---

## Score path summary

| Phase | Score | Key unlocks |
|---|---|---|
| Current | 4/10 | Fan list, source filter, star, export, search |
| P0 complete | 7/10 | Campaign context, levels, notes, richer export, GDPR fix |
| P1 complete | 8/10 | Supabase, wired confirmation email, tags, Day-7 nudge |
| P2 complete | 9/10 | Broadcasts, auto-segments, follow-up nudge |
| P3 complete | 10/10 | Activity tracking, geography, broadcast analytics, individual contact |
