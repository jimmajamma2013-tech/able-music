# ABLE Analytics — Canonical Spec
**Created: 2026-03-15 | Authority: primary**

> This is the single source of truth for all analytics behaviour across able-v7.html, admin.html, and (future) Supabase. Supersedes any ad-hoc event logic in individual page files.

---

## 2.1 Canonical event schemas

### TypeScript interfaces

```typescript
// Canonical source values — matches CROSS_PAGE_JOURNEYS.md SOURCE_VALUES
type AnalyticsSource =
  | 'ig'            // Instagram bio link or story
  | 'tt'            // TikTok bio link or video
  | 'sp'            // Spotify artist page link
  | 'qr'            // Gig mode QR code
  | 'story'         // Instagram or TikTok story (time-limited link)
  | 'direct'        // Direct URL entry, no referrer, no ?src= param
  | 'email'         // Confirmation email link click
  | 'fan-dashboard' // Via fan.html
  | 'twitter'       // Twitter/X referrer (detected from document.referrer)
  | 'footer'        // Via "Made with ABLE ✦" on an artist profile — growth loop
  | 'other';        // Known referrer outside the canonical list

// CTA / click type classification
type ClickType =
  | 'platform'  // Platform pill (Spotify, Apple Music etc.)
  | 'cta'       // Hero or section CTA button
  | 'snap'      // Snap card interaction
  | 'presave'   // Pre-save CTA specifically
  | 'support'   // Support / tip / merch CTA
  | 'share'     // Share action
  | 'event'     // Ticket / show link
  | 'footer';   // "Made with ABLE ✦" tap — growth loop event

interface ViewEvent {
  ts: number;         // Unix millisecond timestamp — Date.now()
  source: AnalyticsSource;
  referrer?: string;  // document.referrer, omitted if empty string
  sessionId: string;  // UUID per browser session — see 2.3
  isArtist?: boolean; // true if able_v3_profile is in localStorage — excluded from display stats
}

interface ClickEvent {
  ts: number;
  source: AnalyticsSource;
  label: string;      // Human-readable CTA label e.g. "Listen on Spotify", "Get tickets"
  type: ClickType;
  url?: string;       // Destination URL — for cross-reference and dedup checks
  sessionId: string;
}

interface FanEvent {
  ts: number;
  source: AnalyticsSource;
  email: string;      // Stored in able_fans; also included here for event-log integrity
  sessionId: string;
}

// Stats output — returned by getStats()
interface StatsResult {
  views: number;
  clicks: number;
  fans: number;
  conversionRate: string;    // e.g. "4.2" — percent, 1dp, as string
  sourceBreakdown: Record<AnalyticsSource, number>;
  clickBreakdown: Record<ClickType, number>;
  topCTA: { label: string; count: number } | null;
}
```

---

## 2.2 Source detection logic

Centralised in a single function. Every page that writes analytics events must call this — no ad-hoc detection.

```javascript
// Canonical SOURCE_VALUES — from CROSS_PAGE_JOURNEYS.md
const SOURCE_VALUES = ['ig', 'tt', 'sp', 'qr', 'story', 'direct', 'email', 'fan-dashboard', 'twitter', 'footer', 'other'];

/**
 * detectSource()
 * Priority order:
 * 1. Explicit ?src= query param (artist controls this — highest trust)
 * 2. document.referrer domain matching (browser-provided — medium trust)
 * 3. 'direct' fallback (no referrer, no param)
 *
 * @returns {string} One of SOURCE_VALUES
 */
function detectSource() {
  // 1. Explicit param — always wins if valid
  const params = new URLSearchParams(window.location.search);
  const src = params.get('src');
  if (src && SOURCE_VALUES.includes(src)) return src;

  // 2. Referrer-based fallback
  const referrer = document.referrer;
  if (!referrer) return 'direct';

  if (referrer.includes('instagram.com') || referrer.includes('l.instagram.com')) return 'ig';
  if (referrer.includes('tiktok.com') || referrer.includes('vm.tiktok.com'))      return 'tt';
  if (referrer.includes('spotify.com'))                                            return 'sp';
  if (referrer.includes('t.co') || referrer.includes('twitter.com') || referrer.includes('x.com')) return 'twitter';
  // Visitor arrived via "Made with ABLE ✦" on another artist's profile page
  if (referrer.includes('ablemusic.co/'))                                          return 'footer';

  // 3. Known but unlisted referrer
  return 'other';
}

// Called once on page load. Cache result in module scope — do not re-run per event.
const _pageSource = detectSource();
```

---

## 2.3 Session deduplication and artist detection

```javascript
/**
 * getOrCreateSessionId()
 * Returns a UUID scoped to the current browser tab session.
 * sessionStorage clears when the tab is closed. Same tab = same session.
 * Prevents refresh inflation: one session = at most one view event.
 */
function getOrCreateSessionId() {
  const key = 'able_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

/**
 * isArtistVisit()
 * If the artist's own profile data exists in localStorage, this visit is
 * almost certainly the artist checking their own page. Tag it and exclude
 * from displayed stats — not deleted, just filtered in aggregation.
 *
 * Note: This is a heuristic, not a guarantee. An artist could visit from
 * a browser where they haven't set up their profile. That's acceptable —
 * occasional artist visits that slip through will not meaningfully distort
 * stats. The goal is to exclude regular daily check-ins, not achieve
 * perfect isolation.
 */
function isArtistVisit() {
  return Boolean(localStorage.getItem('able_v3_profile'));
}

/**
 * recordView()
 * Called once per page load on able-v7.html.
 * Deduplicates within session: if this sessionId already has a view record,
 * skip (prevents refresh inflation).
 */
function recordView() {
  const sessionId = getOrCreateSessionId();
  const source = _pageSource;
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');

  // Dedup: do not record a second view for the same session
  const alreadyRecorded = views.some(v => v.sessionId === sessionId && !v.isArtist);
  if (alreadyRecorded) return;

  const event = {
    ts: Date.now(),
    source,
    sessionId,
    ...(document.referrer ? { referrer: document.referrer } : {}),
    ...(isArtistVisit() ? { isArtist: true } : {}),
  };

  views.push(event);
  rotateEvents('able_views', views, 90); // Keep last 90 days — see 2.5
}

/**
 * recordClick(label, type, url)
 * Called on every CTA tap. No session dedup — multiple clicks in one session
 * are real (fan streams, then buys merch). Rate limited to max 10 clicks/session.
 */
function recordClick(label, type, url) {
  const sessionId = getOrCreateSessionId();
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');

  // Anti-spam: max 10 click events per session
  const sessionClicks = clicks.filter(c => c.sessionId === sessionId);
  if (sessionClicks.length >= 10) return;

  const event = {
    ts: Date.now(),
    source: _pageSource,
    label,
    type,
    sessionId,
    ...(url ? { url } : {}),
  };

  clicks.push(event);
  rotateEvents('able_clicks', clicks, 180); // Keep last 180 days
}

/**
 * recordFan(email)
 * Called on successful fan sign-up. The fan record itself goes into able_fans
 * separately — this function only handles the analytics event side, adding
 * sessionId and source to the fan record being written.
 */
function buildFanEvent(email) {
  return {
    ts: Date.now(),
    source: _pageSource,
    email,
    sessionId: getOrCreateSessionId(),
  };
}
```

---

## 2.4 Aggregation functions

```javascript
/**
 * groupBy(arr, key)
 * Returns { [value]: count } for all items in arr.
 */
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const val = item[key] || 'unknown';
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}

/**
 * topBy(arr, key)
 * Returns the most frequent value of key across arr.
 */
function topBy(arr, key) {
  const counts = groupBy(arr, key);
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ? { label: top[0], count: top[1] } : null;
}

/**
 * getStats(days)
 * Primary aggregation function. Returns StatsResult for the given time window.
 *
 * @param {number|null} days  7, 30, or null (all time)
 * @returns {StatsResult}
 *
 * Usage:
 *   const week  = getStats(7);    // Last 7 days
 *   const month = getStats(30);   // Last 30 days
 *   const all   = getStats(null); // All time
 */
function getStats(days = 7) {
  const since = days ? Date.now() - (days * 24 * 60 * 60 * 1000) : 0;

  // Views: exclude artist's own visits, apply time window
  const views = JSON.parse(localStorage.getItem('able_views') || '[]')
    .filter(v => v.ts > since && !v.isArtist);

  // Clicks: all clicks in window (artist clicks are not excluded — they're testing)
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]')
    .filter(c => c.ts > since);

  // Fans: all fans in window
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]')
    .filter(f => f.ts > since);

  const conversionRate = views.length
    ? (fans.length / views.length * 100).toFixed(1)
    : '0.0';

  return {
    views: views.length,
    clicks: clicks.length,
    fans: fans.length,
    conversionRate,
    sourceBreakdown: groupBy(views, 'source'),
    clickBreakdown: groupBy(clicks, 'type'),
    topCTA: topBy(clicks, 'label'),
  };
}

/**
 * todayCount(events)
 * Count events from today (midnight to now). Used for "+N today" delta.
 */
function todayCount(events) {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return events.filter(e => e.ts >= midnight.getTime()).length;
}

/**
 * getDataDaySpan(events)
 * Returns how many calendar days have at least one event.
 * Used to decide whether to show sparklines (need >= 3 days).
 */
function getDataDaySpan(events) {
  if (!events.length) return 0;
  const days = new Set(
    events.map(e => new Date(e.ts).toISOString().slice(0, 10))
  );
  return days.size;
}

/**
 * countFansAfterTimestamp(ts)
 * Counts new fans acquired after a given Unix ms timestamp.
 * Used in post-gig greeting: "8 fans joined last night."
 */
function countFansAfterTimestamp(ts) {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  return fans.filter(f => f.ts >= ts).length;
}
```

---

## 2.5 localStorage size management and retention policy

```javascript
/**
 * rotateEvents(key, events, maxDays)
 * Prunes events older than maxDays before writing back to localStorage.
 * Always writes the result — this is the only function that writes to
 * able_views and able_clicks.
 *
 * Retention rules:
 *   able_views:  keep last 90 days  (rotate older)
 *   able_clicks: keep last 180 days (rotate older)
 *   able_fans:   NEVER rotate       (fans write directly, not through this function)
 */
function rotateEvents(key, events, maxDays) {
  const cutoff = Date.now() - (maxDays * 24 * 60 * 60 * 1000);
  const pruned = events.filter(e => e.ts > cutoff);
  try {
    localStorage.setItem(key, JSON.stringify(pruned));
  } catch (e) {
    // localStorage full — last-resort: keep only the most recent 500 events
    if (e.name === 'QuotaExceededError') {
      const fallback = events.slice(-500);
      localStorage.setItem(key, JSON.stringify(fallback));
      console.warn('[ABLE analytics] localStorage quota hit — trimmed to 500 events');
      // TODO: Surface warning in admin UI
    }
  }
}

/**
 * checkLocalStorageHealth()
 * Estimates localStorage usage and warns if approaching limit.
 * Called from admin.html on load. Threshold: 4MB of the ~5MB limit.
 *
 * @returns {{ usedBytes: number, warningThreshold: boolean }}
 */
function checkLocalStorageHealth() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    total += (localStorage.getItem(key) || '').length * 2; // UTF-16: 2 bytes per char
  }
  return {
    usedBytes: total,
    warningThreshold: total > 4 * 1024 * 1024, // 4MB
  };
}

/*
 * Supabase sync strategy (when backend lands):
 *
 * On admin.html load (or when artist is online):
 * 1. Read all events older than 7 days from localStorage
 * 2. Batch-insert to Supabase (views, clicks tables)
 * 3. On confirmed insert, delete those events from localStorage
 * 4. Keep last 7 days in localStorage as the "fast cache" for immediate stats display
 *
 * This means:
 * - Admin stats load instantly from localStorage (7-day window)
 * - Historical stats (30-day, all-time) query Supabase
 * - No data loss on browser clear (events are flushed within 7 days)
 */
```

---

## 2.6 Privacy spec

### What ABLE tracks

| Data | Where stored | Who can see it | Retention |
|---|---|---|---|
| Page views (timestamp + source) | Artist's localStorage / Supabase | Artist only | 90 days |
| CTA clicks (label + type + source) | Artist's localStorage / Supabase | Artist only | 180 days |
| Fan email sign-ups (email + timestamp + source) | Artist's localStorage / Supabase | Artist only | Never auto-deleted |
| Session ID (UUID per browser session) | sessionStorage | Not stored anywhere | Cleared on tab close |

### What ABLE does not track

- IP addresses (never stored, not even in Supabase)
- Precise location (no GPS, no IP geolocation)
- Device fingerprinting
- Cross-artist behaviour (one artist cannot see another's fans or analytics)
- Third-party tracking pixels or scripts
- Behaviour on external sites after clicking a link

### Artist data isolation

Each artist's data is isolated at the localStorage level (same-origin, per browser) and will be isolated at the Supabase level via row-level security (RLS) policies. One artist cannot query another's `fans`, `views`, or `clicks` rows.

### Fan rights

- Fans sign up on an artist's page. Their email is in that artist's list.
- ABLE does not contact fans on behalf of artists without explicit artist initiation.
- Data deletion: when GDPR deletion flow is built (P2), fans can email [privacy@ablemusic.co] to request deletion from all artist lists they've joined. This requires Supabase backend.

### Admin UI privacy statement

```
What ABLE tracks — and why

Every time someone visits your page, we record when and where they came from
(Instagram, TikTok, a QR code) so you can see which platforms are actually
bringing people to you.

When someone taps a button on your page, we record which one — so you can see
what your audience responds to.

When a fan signs up, their email goes directly into your list. We don't share it,
sell it, or use it for anything without your say-so.

No third-party tracking. No IP addresses. No cross-site data. Your fans' relationship
is with you — not with us.
```

---

## 2.7 Export spec

### Fan list export (exists in admin DESIGN-SPEC, documented here for completeness)

```javascript
/**
 * exportFansCSV()
 * Generates and downloads a CSV of all fan sign-ups.
 * Columns: email, date_joined, source
 * Triggered by "Export as CSV →" button in admin Fans page.
 */
function exportFansCSV() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  if (!fans.length) return;

  const header = 'email,date_joined,source\n';
  const rows = fans.map(f => {
    const date = new Date(f.ts).toISOString().slice(0, 10);
    const src = f.source || 'unknown';
    return `${f.email},${date},${src}`;
  }).join('\n');

  downloadCSV('able-fans.csv', header + rows);
}
```

### Analytics export (new — not yet built)

```javascript
/**
 * exportAnalyticsCSV()
 * Exports raw analytics events as CSV. Separate from fan export.
 * Columns per file:
 *   Views:  timestamp, source, session_id, is_artist
 *   Clicks: timestamp, source, label, type, url, session_id
 *
 * Downloads two files: able-views.csv, able-clicks.csv
 * Triggered by "Export analytics →" button in admin Analytics section.
 */
function exportAnalyticsCSV() {
  const views  = JSON.parse(localStorage.getItem('able_views')  || '[]');
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');

  if (views.length) {
    const header = 'timestamp,date,source,session_id,is_artist\n';
    const rows = views.map(v => {
      const date = new Date(v.ts).toISOString().slice(0, 10);
      return `${v.ts},${date},${v.source || ''},${v.sessionId || ''},${v.isArtist ? '1' : '0'}`;
    }).join('\n');
    downloadCSV('able-views.csv', header + rows);
  }

  if (clicks.length) {
    const header = 'timestamp,date,source,label,type,url,session_id\n';
    const rows = clicks.map(c => {
      const date = new Date(c.ts).toISOString().slice(0, 10);
      const url  = (c.url || '').replace(/,/g, '%2C'); // escape commas in URLs
      return `${c.ts},${date},${c.source || ''},${c.label || ''},${c.type || ''},${url},${c.sessionId || ''}`;
    }).join('\n');
    downloadCSV('able-clicks.csv', header + rows);
  }
}

/**
 * downloadCSV(filename, content)
 * Shared download helper used by both export functions.
 */
function downloadCSV(filename, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

---

## 2.8 Supabase table schemas

When the backend lands, these are the target tables. All localStorage keys map 1:1.

```sql
-- Artists table (auth-linked)
create table profiles (
  id          uuid primary key references auth.users,
  slug        text unique not null,
  name        text,
  profile_json jsonb,        -- full able_v3_profile blob
  created_at  timestamptz default now()
);

-- Page view events
create table views (
  id         bigserial primary key,
  artist_id  uuid references profiles(id) on delete cascade,
  ts         bigint not null,              -- Unix ms
  source     text,
  referrer   text,
  session_id text,
  is_artist  boolean default false,
  created_at timestamptz default now()
);

-- CTA click events
create table clicks (
  id         bigserial primary key,
  artist_id  uuid references profiles(id) on delete cascade,
  ts         bigint not null,
  source     text,
  label      text,
  type       text,
  url        text,
  session_id text,
  created_at timestamptz default now()
);

-- Fan sign-ups
create table fans (
  id         bigserial primary key,
  artist_id  uuid references profiles(id) on delete cascade,
  email      text not null,
  ts         bigint not null,
  source     text,
  session_id text,
  starred    boolean default false,
  created_at timestamptz default now(),
  unique(artist_id, email)               -- one sign-up per fan per artist
);

-- Row-level security: artist sees only their own data
alter table views  enable row level security;
alter table clicks enable row level security;
alter table fans   enable row level security;

create policy "artist_own_views"  on views  for all using (artist_id = auth.uid());
create policy "artist_own_clicks" on clicks for all using (artist_id = auth.uid());
create policy "artist_own_fans"   on fans   for all using (artist_id = auth.uid());
```

### Supabase realtime subscription (new fan notification in admin)

```javascript
// In admin.html — after Supabase client initialised
const channel = supabase
  .channel('new-fans')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'fans', filter: `artist_id=eq.${artistId}` },
    (payload) => {
      const fan = payload.new;
      showNewFanToast(fan); // "A new fan just joined from Instagram."
      appendFanToList(fan);
      checkAndShowMilestone(getAllFans());
    }
  )
  .subscribe();
```
