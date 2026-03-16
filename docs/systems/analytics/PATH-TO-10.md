# ABLE Analytics — Path to 10
**Created: 2026-03-15 | Updated: 2026-03-16 | Starting score: 6.2/10 | Target: 9.5/10 (spec-complete)**

> Organised by priority tier. Each tier includes score delta, specific tasks, and acceptance criteria.

---

## Starting state

**6.2/10** — Basic event schema exists. Raw counts display in admin. Source tracking is present in theory. No session dedup, no aggregation logic, no retention policy, no artist self-visit detection.

---

## P0 — Foundation (6.2 → 8.5)

These are fixes to existing behaviour that are causing misleading data right now. They require no backend and no new UI.

### P0.1 — Add `sessionId` to all events

**Why now:** Without sessionId, a fan who refreshes 3 times counts as 3 views. Conversion rate is unusable.

**Exact implementation — paste this into the top of each page's `<script>` section:**

```javascript
// Session ID — one UUID per browser tab session. Cleared when the tab closes.
// Prevents refresh inflation: same session = at most one view event.
const _sessionId = sessionStorage.getItem('able_session') ||
  (s => (sessionStorage.setItem('able_session', s), s))(crypto.randomUUID());
```

That is the complete implementation: one line, inline IIFE pattern. `sessionStorage` clears on tab close, so a new visit (new tab or re-open) generates a fresh UUID.

- Add `sessionId: _sessionId` to every event written to `able_views`, `able_clicks`, `able_fans`
- Add dedup check in `recordView()`: `if (views.some(v => v.sessionId === _sessionId && !v.isArtist)) return;`

**Acceptance criteria:**
- Refreshing able-v7.html 5 times creates exactly 1 view event
- Every event in `able_views`, `able_clicks`, `able_fans` has a non-null `sessionId`
- Different browser sessions (close + reopen tab) produce different sessionIds

---

### P0.2 — Artist self-visit detection (anti-self-visit)

**Why now:** An artist who checks their own page daily inflates their view count and suppresses their conversion rate. 3 lines of code fixes this.

**Exact implementation — these 3 lines go at the top of the page view tracking function, before any event is written:**

```javascript
// Anti-self-visit: if the artist's profile is stored in this browser, this is
// almost certainly the artist previewing their own page. Tag it and exclude from stats.
const _isArtistVisit = Boolean(localStorage.getItem('able_v3_profile'));
```

Then in `recordView()`, add to the event object:

```javascript
...(_isArtistVisit ? { isArtist: true } : {}),
```

And in `getStats()` aggregation, filter artist views out before computing counts:

```javascript
const views = JSON.parse(localStorage.getItem('able_views') || '[]')
  .filter(v => v.ts > since && !v.isArtist);
```

**Acceptance criteria:**
- Artist visits their own page → view event has `isArtist: true`
- Admin stats do not count artist's own visits in the view total
- Fan (no `able_v3_profile` in their localStorage) is counted normally

---

### P0.3 — PostHog initialisation (EU Cloud)

When ABLE moves to a hosted backend, PostHog EU Cloud is the analytics destination. The following is the complete, ready-to-paste init block for the `<head>` of able-v7.html:

```html
<!-- PostHog analytics — EU Cloud endpoint, privacy-first -->
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+" (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init('YOUR_POSTHOG_KEY', {
    api_host: 'https://eu.posthog.com',          // EU Cloud endpoint — GDPR-compliant
    autocapture: false,                           // Manual events only — no unexpected tracking
    capture_pageview: false,                      // We fire page_view manually with sessionId
    disable_session_recording: true,              // No session replays — privacy-first
    persistence: 'localStorage+cookie',
    bootstrap: {
      // Pre-identify the artist if they are viewing their own page.
      // This links PostHog events to the artist's profile without a separate identify() call.
      distinctID: (function() {
        try {
          var p = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
          return p.slug || null;
        } catch(_) { return null; }
      })(),
    },
  });
</script>
```

Replace `'YOUR_POSTHOG_KEY'` with the project API key from the ABLE PostHog EU project settings.

**The `bootstrap.distinctID` pattern:** If `able_v3_profile` is in localStorage, the artist is viewing their own page. The `bootstrap.distinctID` pre-identifies the PostHog session as the artist's slug before any events fire. This means artist preview views are automatically associated with the artist in PostHog and can be filtered out in cohort analysis without needing a separate `posthog.identify()` call.

---

### P0.4 — The 7 PostHog events (copy-paste ready)

Fire these events after the PostHog init script has loaded. All property objects are exact — do not add or remove fields.

**Event 1 — page_view (able-v7.html)**
```javascript
posthog.capture('page_view', {
  session_id:  _sessionId,
  source:      _pageSource,
  referrer:    document.referrer || null,
  is_artist:   _isArtistVisit,
  artist_slug: (function() {
    try { return JSON.parse(localStorage.getItem('able_v3_profile') || '{}').slug || null; }
    catch(_) { return null; }
  })(),
});
```

**Event 2 — cta_tap (any CTA button in able-v7.html)**
```javascript
posthog.capture('cta_tap', {
  session_id: _sessionId,
  source:     _pageSource,
  label:      ctaLabel,       // e.g. "Listen on Spotify"
  type:       ctaType,        // 'platform' | 'cta' | 'snap' | 'presave' | 'support' | 'event'
  url:        ctaUrl || null,
});
```

**Event 3 — fan_signup (able-v7.html — on successful email submission)**
```javascript
posthog.capture('fan_signup', {
  session_id: _sessionId,
  source:     _pageSource,
  artist_slug: (function() {
    try { return JSON.parse(localStorage.getItem('able_v3_profile') || '{}').slug || null; }
    catch(_) { return null; }
  })(),
});
```

**Event 4 — admin_page_view (admin.html)**
```javascript
posthog.capture('admin_page_view', {
  session_id:  _sessionId,
  section:     'home',          // or 'fans' | 'shows' | 'analytics' | 'more'
  artist_slug: (function() {
    try { return JSON.parse(localStorage.getItem('able_v3_profile') || '{}').slug || null; }
    catch(_) { return null; }
  })(),
});
```

**Event 5 — profile_state_change (admin.html — when artist changes page state)**
```javascript
posthog.capture('profile_state_change', {
  session_id: _sessionId,
  new_state:  newState,   // 'profile' | 'pre-release' | 'live' | 'gig'
  old_state:  oldState,
});
```

**Event 6 — wizard_step_complete (start.html — at each step)**
```javascript
posthog.capture('wizard_step_complete', {
  session_id: _sessionId,
  step:       stepNumber,     // 1 | 2 | 3
  step_name:  stepName,       // 'artist_info' | 'vibe' | 'cta'
  used_spotify_import: usedSpotifyImport, // boolean
});
```

**Event 7 — wizard_complete (start.html — on done screen)**
```javascript
posthog.capture('wizard_complete', {
  session_id:          _sessionId,
  genre:               profileGenre || null,
  cta_type:            profileCtaType || null,
  has_release_date:    Boolean(profileReleaseDate),
  used_spotify_import: usedSpotifyImport,
});
```

---

### P0.5 — Fix source detection logic

**Why now:** Artists will sometimes paste their link without `?src=ig`. Instagram in-app browser traffic will be attributed as `direct`.

**Exact implementation — paste this near the top of `able-v7.html`'s `<script>` block, before any event writes:**

```javascript
// ─── Source detection — run once, cache as _pageSource ──────────────────────
// Pass 1: explicit ?src= param wins
// Pass 2: document.referrer fallback
// Pass 3: default 'direct'
function detectSource() {
  const params = new URLSearchParams(window.location.search);
  const src    = params.get('src') || params.get('utm_source');
  if (src) return src.toLowerCase();

  const ref = (document.referrer || '').toLowerCase();
  if (!ref) return 'direct';

  if (ref.includes('instagram.com') || ref.includes('l.instagram.com')) return 'ig';
  if (ref.includes('tiktok.com') || ref.includes('vm.tiktok.com'))      return 'tiktok';
  if (ref.includes('twitter.com') || ref.includes('x.com') || ref.includes('t.co')) return 'twitter';
  if (ref.includes('facebook.com') || ref.includes('fb.me'))             return 'fb';
  if (ref.includes('youtube.com') || ref.includes('youtu.be'))           return 'youtube';
  if (ref.includes('spotify.com'))                                        return 'spotify';
  if (ref.includes('ablemusic.co'))                                       return 'footer';
  if (ref) return 'other';
  return 'direct';
}

// Cache result — call detectSource() exactly once per page load
const _pageSource = detectSource();
```

**Acceptance criteria:**
- Visit via Instagram with `?src=ig` → source = `ig`
- Visit via Instagram without `?src=ig` → source = `ig` (referrer fallback)
- Visit with no referrer and no param → source = `direct`
- Visit from unknown blog → source = `other`
- `_pageSource` is set once at load; all subsequent event writes use the cached value

---

### P0.6 — Define and implement retention/rotation policy

**Exact implementation — add both functions to `able-v7.html`:**

```javascript
// ─── Event rotation — prune stale events and rewrite in one atomic op ───────
// key:     localStorage key (e.g. 'able_views')
// events:  the current events array (already parsed from localStorage)
// maxDays: max age of events to keep
// Returns: the pruned array (already written back to localStorage)
function rotateEvents(key, events, maxDays) {
  const cutoff = Date.now() - (maxDays * 24 * 60 * 60 * 1000);
  const pruned = events.filter(e => e.ts && e.ts > cutoff);
  if (pruned.length !== events.length) {
    try {
      localStorage.setItem(key, JSON.stringify(pruned));
    } catch (e) {
      console.warn('[ABLE] rotateEvents write failed:', e.message);
    }
  }
  return pruned;
}

// ─── localStorage health check ───────────────────────────────────────────────
// Estimates bytes used across all able_ keys.
// Returns: { bytesUsed, mbUsed, overLimit }
// Call on admin.html page load — wire result to nudge if overLimit.
function checkLocalStorageHealth() {
  let total = 0;
  const ABLE_KEYS = ['able_views', 'able_clicks', 'able_fans', 'able_v3_profile',
                     'able_shows', 'able_dismissed_nudges', 'able_starred_fans'];
  ABLE_KEYS.forEach(k => {
    const val = localStorage.getItem(k);
    if (val) total += val.length * 2; // UTF-16 chars × 2 bytes
  });
  const mb = total / (1024 * 1024);
  return { bytesUsed: total, mbUsed: Math.round(mb * 100) / 100, overLimit: mb > 4 };
}
```

**Where to call rotateEvents:**
```javascript
// Inside recordView() — passive rotation on every write
function recordView(source) {
  let views = JSON.parse(localStorage.getItem('able_views') || '[]');
  views = rotateEvents('able_views', views, 90);  // 90-day retention
  views.push({ ts: Date.now(), source, sessionId: _sessionId, isArtist: _isArtistVisit });
  localStorage.setItem('able_views', JSON.stringify(views));
}

// Inside recordClick() — passive rotation on every write
function recordClick(label, type, url) {
  let clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');
  clicks = rotateEvents('able_clicks', clicks, 180);  // 180-day retention
  clicks.push({ ts: Date.now(), label, type, url: url || null, source: _pageSource, sessionId: _sessionId });
  localStorage.setItem('able_clicks', JSON.stringify(clicks));
}
// Note: able_fans is NEVER auto-rotated — fan records are permanent.
```

**Admin nudge when over 4MB (admin.html):**
```javascript
// Call on admin DOMContentLoaded
const health = checkLocalStorageHealth();
if (health.overLimit) {
  showNudge('Your page data is taking up a lot of browser space. Syncing to ABLE\'s server will free it up.');
}
```

**Retention policy summary:**
| Key | Retention |
|---|---|
| `able_views` | 90 days |
| `able_clicks` | 180 days |
| `able_fans` | Never auto-deleted |

---

**Score after P0: 8.5/10**

| Dimension | Before | After |
|---|---|---|
| Event schema completeness | 5 | 9 |
| Source attribution accuracy | 6 | 8 |
| Anti-self-visit | 2 | 8.5 |
| PostHog integration | 0 | 8.5 |
| Aggregation logic | 4 | 4 (unchanged — next tier) |
| Retention policy | 3 | 7 |

---

## P1 — Useful stats (8.5 → 9.5)

These make the analytics meaningful rather than just present. Artist can now answer "is my page working this week?"

### P1.1 — `getStats()` with time-window filtering

**Tasks:**
- Implement `getStats(days)` as specced in SPEC.md §2.4
- Support `days = 7`, `days = 30`, `days = null` (all time)
- Replace raw `localStorage.getItem` calls in admin.html with `getStats(7)` call
- Admin home: show 7-day stats by default

---

### P1.2 — Conversion rate as first-class admin metric

**Tasks:**
- Add conversion rate to `StatsResult`
- Add stat card to admin home: "Sign-up rate" — `fans / views * 100`
- Zero state: if views = 0, show "—" not "0%"
- Sub-label: "of visitors signed up" — specific, not generic

---

### P1.3 — 7 / 30 / All time toggle in admin stats

**Tasks:**
- Add toggle row above stat cards: "7 days | 30 days | All time"
- Default: 7 days
- Persist selection in `sessionStorage`

---

### P1.4 — Top CTA display in admin

**Tasks:**
- Add "What fans tapped most" row below stat cards
- Shows top 3 labels from `clickBreakdown`
- Empty state: "No taps yet — share your link to see what resonates"

---

### P1.5 — Analytics CSV export

See SPEC.md §2.7 for the complete `exportAnalyticsCSV()` implementation.

---

### P1.6 — localStorage health warning in admin

Wire `checkLocalStorageHealth()` to admin.html page load. If over 4MB: show dismissible nudge.

---

**Score after P1: 9.5/10**

---

## P2 — Realtime and durability (9.5 → 9.5+)

Requires Supabase backend. See SPEC.md §2.8 for table schemas and realtime subscription code.

- P2.1 — Supabase sync (flush events older than 7 days)
- P2.2 — Realtime new-fan notification in admin
- P2.3 — Basic anti-bot filtering (server-side)
- P2.4 — Source trend over time

---

## What gets to 10

| Requirement | Why it matters |
|---|---|
| Supabase live with real multi-artist traffic | Validates RLS policies, event durability, realtime subscription scale |
| Playwright analytics tests | Automated: fan visits page → event written → admin shows correct count |
| GDPR data deletion request flow | EU compliance — fans can request deletion |
| Privacy audit (independent review) | Confirmation of no cross-site data leaks |
| Artist feedback on stat usefulness | 10 artists using admin weekly, stats are genuinely decision-useful |

---

## Implementation order summary

```
P0 (now, localStorage only):
  P0.1 sessionId → P0.2 artist detection → P0.3 PostHog init → P0.4 7 events
  → P0.5 source fallback → P0.6 retention

P1 (now, localStorage only):
  P1.1 getStats() → P1.2 conversion rate → P1.3 time toggle
  → P1.4 top CTA → P1.5 CSV export → P1.6 health warning

P2 (when Supabase is live):
  P2.1 flush sync → P2.2 realtime fans → P2.3 anti-bot → P2.4 source trends

→ 10: real traffic + tests + GDPR + audit
```
