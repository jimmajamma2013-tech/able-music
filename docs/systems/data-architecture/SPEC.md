# ABLE — Data Architecture Spec
**Created: 2026-03-15 | Canonical reference**

> This is the authoritative spec for ABLE's data layer — from localStorage interfaces through to Supabase tables and RLS policies. The codebase is vanilla JS; TypeScript interfaces here document intent, not runtime types. SQL definitions are Postgres-compatible (Supabase).

---

## PART 1 — LOCALSTORAGE CONTRACT

### Key registry

| Key | Type | Written by | Read by | Notes |
|---|---|---|---|---|
| `able_v3_profile` | `AbleProfile` | start.html, admin.html | able-v7.html, admin.html | Canonical profile; source of truth |
| `able_fans` | `Fan[]` | able-v7.html | admin.html | Append-only array |
| `able_clicks` | `ClickEvent[]` | able-v7.html | admin.html | Append-only array; trim at 1000 |
| `able_views` | `ViewEvent[]` | able-v7.html | admin.html | Append-only array; trim at 2000 |
| `able_gig_expires` | `number` | admin.html | able-v7.html, admin.html | Unix timestamp (ms); delete on expiry |
| `able_profile` | `AbleProfileLegacy` | start.html | admin.html | Legacy wizard key; migrate to `able_v3_profile` on first admin load |
| `able_shows` | `Show[]` | admin.html | able-v7.html, admin.html | Mutable array; edit in place |
| `able_dismissed_nudges` | `string[]` | admin.html | admin.html | UI state only; do not sync to Supabase |
| `able_starred_fans` | `string[]` | admin.html | admin.html | Deprecated pattern — migrate to `Fan.isStarred` |

---

### TypeScript interfaces

```typescript
// ─── PROFILE ───────────────────────────────────────────────────────────────

type Theme = 'dark' | 'light' | 'glass' | 'contrast';
type Feel  = 'electronic' | 'hiphop' | 'rnb' | 'indie' | 'pop' | 'rock' | 'folk';
type PageState = 'profile' | 'pre-release' | 'live' | 'gig';

interface CTA {
  label: string;
  url:   string;
  type:  'stream' | 'presave' | 'tickets' | 'merch' | 'support' | 'social' | 'custom';
}

interface SnapCard {
  id:      string;        // nanoid(8) — stable across edits
  type:    'text' | 'link' | 'image' | 'embed';
  title?:  string;
  body?:   string;
  url?:    string;
  imgUrl?: string;
  order:   number;        // display order, 0-indexed
}

interface FanCapture {
  headline:    string;   // e.g. "Stay close."
  placeholder: string;   // e.g. "Your email"
  thanks:      string;   // e.g. "You're in."
}

interface AbleProfile {
  // Identity
  name:        string;
  bio?:        string;
  artistSlug?: string;   // URL slug — "nadia" → ablemusic.co/nadia
  avatarUrl?:  string;   // Supabase Storage URL or data URI (local phase)

  // Appearance
  accent:  string;       // hex — e.g. "#e05242"
  theme:   Theme;
  feel?:   Feel;

  // Campaign state
  state:          PageState;
  stateOverride?: PageState; // explicit artist override; beats computed state
  stateChangedAt?: number;   // Unix ms — audit trail

  // Release
  releaseTitle?: string;
  releaseDate?:  string;  // ISO 8601 — "2026-04-12"
  releaseUrl?:   string;  // Stream / presave URL

  // CTAs
  ctaPrimary?:   CTA;
  ctaSecondary?: CTA;
  quickActions?: CTA[];   // max 6

  // Snap cards
  snapCards?: SnapCard[];

  // Fan capture
  fanCapture?: FanCapture;

  // Platform links
  spotifyUrl?:   string;
  instagramUrl?: string;
  tiktokUrl?:    string;
  youtubeUrl?:   string;
  appleMusicUrl?: string;
  bandcampUrl?:   string;

  // Meta
  schemaVersion: number; // increment when shape changes; current: 1
  updatedAt:     number; // Unix ms
}

// Legacy wizard key — read once, migrate to AbleProfile, discard
interface AbleProfileLegacy {
  name?:    string;
  accent?:  string;
  feel?:    string;
  spotify?: string;
  cta?:     { label: string; url: string };
}


// ─── FAN ────────────────────────────────────────────────────────────────────

interface Fan {
  email:           string;
  ts:              number;  // Unix ms — sign-up timestamp
  source:          SourceValue;

  // Recommended additions (P0 — add now, no breaking change)
  name?:           string;
  confirmedAt?:    number;  // Unix ms — email confirmation received
  optIn?:          boolean; // explicit marketing consent; required before broadcasts
  unsubscribedAt?: number;  // soft delete — never hard-delete a fan record
  isStarred?:      boolean; // replaces able_starred_fans string array
}

// Canonical source values — never add new values without updating this union
type SourceValue =
  | 'ig'             // Instagram bio link
  | 'tt'             // TikTok bio link
  | 'sp'             // Spotify
  | 'qr'             // Gig mode QR code
  | 'story'          // Instagram or TikTok story
  | 'direct'         // Direct URL — no ?src param
  | 'email'          // Confirmation email click-through
  | 'fan-dashboard'; // Via fan.html


// ─── ANALYTICS EVENTS ───────────────────────────────────────────────────────

interface ClickEvent {
  label:      string;      // CTA label text — e.g. "Pre-save Echoes"
  type:       string;      // CTA type — matches CTA.type
  ts:         number;      // Unix ms
  source:     SourceValue;

  // Recommended additions (P0)
  url?:       string;      // Destination URL
  sessionId?: string;      // nanoid(12) — groups events from same visit
  utm?: {
    campaign?: string;
    medium?:   string;
    content?:  string;
  };
}

interface ViewEvent {
  ts:       number;        // Unix ms
  source:   SourceValue;

  // Recommended additions (P0)
  referrer?:  string;      // document.referrer at time of view
  sessionId?: string;      // same session as clicks
  pageState?: PageState;   // which state the profile was in at view time
}


// ─── SHOWS ──────────────────────────────────────────────────────────────────

interface Show {
  id:        string;    // nanoid(8) — stable identifier; required for edit/delete

  // Core (required)
  venue:     string;
  date:      string;    // ISO 8601 date — "2026-05-10"

  // Recommended additions (P0)
  city?:     string;    // "London" — required for fan.html "near you" routing
  country?:  string;    // ISO 3166-1 alpha-2 — "GB"

  // Optional
  doorsTime?:   string;  // "19:30"
  ticketUrl?:   string;
  featured?:    boolean; // pin to top of shows section
  soldOut?:     boolean; // show shows as sold out; keep ticketUrl for waitlist
  cancelled?:   boolean; // soft-cancel; do not delete — fan needs to know
  priceRange?:  string;  // "£10–£25"
  venueUrl?:    string;
  lineup?:      string[]; // other artist names on the bill
}


// ─── FAN.HTML KEYS (not yet in CLAUDE.md canonical list) ────────────────────

interface FanFollowing {
  artistSlug: string;
  followedAt: number;   // Unix ms
}
// Key: fan_following — Fan[]; writen by fan.html

interface FanLocation {
  city?:    string;
  country?: string;
  lat?:     number;
  lng?:     number;
  setAt:    number;     // Unix ms
}
// Key: fan_location — FanLocation; written by fan.html
```

---

## PART 2 — SUPABASE TABLES

### Naming convention
- Tables: `snake_case` plural
- Columns: `snake_case`
- UUIDs: `gen_random_uuid()` default
- Timestamps: `timestamptz` with `DEFAULT now()`
- Soft delete: `deleted_at timestamptz` — never `DELETE` user data

---

### `profiles` — maps to `able_v3_profile`

```sql
CREATE TABLE profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identity
  name            TEXT NOT NULL,
  bio             TEXT,
  artist_slug     TEXT UNIQUE,              -- ablemusic.co/nadia
  avatar_url      TEXT,

  -- Appearance
  accent          TEXT NOT NULL DEFAULT '#e05242',
  theme           TEXT NOT NULL DEFAULT 'dark'
                    CHECK (theme IN ('dark','light','glass','contrast')),
  feel            TEXT CHECK (feel IN ('electronic','hiphop','rnb','indie','pop','rock','folk')),

  -- Campaign state
  state           TEXT NOT NULL DEFAULT 'profile'
                    CHECK (state IN ('profile','pre-release','live','gig')),
  state_override  TEXT CHECK (state_override IN ('profile','pre-release','live','gig')),
  state_changed_at TIMESTAMPTZ,

  -- Release
  release_title   TEXT,
  release_date    DATE,
  release_url     TEXT,

  -- CTAs (stored as JSONB — queried infrequently, shape varies)
  cta_primary     JSONB,
  cta_secondary   JSONB,
  quick_actions   JSONB DEFAULT '[]'::jsonb,

  -- Snap cards (array of objects — separate table preferred at scale)
  snap_cards      JSONB DEFAULT '[]'::jsonb,

  -- Fan capture copy
  fan_capture     JSONB,

  -- Platform links
  spotify_url     TEXT,
  instagram_url   TEXT,
  tiktok_url      TEXT,
  youtube_url     TEXT,
  apple_music_url TEXT,
  bandcamp_url    TEXT,

  -- Meta
  schema_version  INTEGER NOT NULL DEFAULT 1,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);

-- Indexes
CREATE INDEX profiles_artist_id_idx ON profiles(artist_id);
CREATE UNIQUE INDEX profiles_slug_idx ON profiles(artist_slug) WHERE artist_slug IS NOT NULL;
```

---

### `fans` — maps to `able_fans`

```sql
CREATE TABLE fans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  email           TEXT NOT NULL,
  name            TEXT,
  source          TEXT NOT NULL DEFAULT 'direct',
  is_starred      BOOLEAN NOT NULL DEFAULT false,
  opt_in          BOOLEAN NOT NULL DEFAULT false,

  signed_up_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at    TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,  -- soft delete / opt-out
  deleted_at      TIMESTAMPTZ,  -- GDPR right to erasure

  -- Location (optional, from fan.html)
  city            TEXT,
  country         TEXT,

  UNIQUE (artist_id, email)     -- one record per fan per artist
);

-- Indexes
CREATE INDEX fans_artist_id_idx      ON fans(artist_id);
CREATE INDEX fans_signed_up_at_idx   ON fans(artist_id, signed_up_at DESC);
CREATE INDEX fans_source_idx         ON fans(artist_id, source);
```

---

### `events` (shows) — maps to `able_shows`

```sql
CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  venue       TEXT NOT NULL,
  city        TEXT,
  country     TEXT,               -- ISO 3166-1 alpha-2

  event_date  DATE NOT NULL,
  doors_time  TIME,
  ticket_url  TEXT,
  price_range TEXT,
  venue_url   TEXT,
  lineup      TEXT[],             -- other artist names

  is_featured  BOOLEAN NOT NULL DEFAULT false,
  is_sold_out  BOOLEAN NOT NULL DEFAULT false,
  is_cancelled BOOLEAN NOT NULL DEFAULT false,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ
);

-- Indexes
CREATE INDEX events_artist_id_idx ON events(artist_id);
CREATE INDEX events_date_idx      ON events(artist_id, event_date ASC);
CREATE INDEX events_city_idx      ON events(city, event_date ASC); -- for fan.html "near you"
```

---

### `clicks` — maps to `able_clicks`

```sql
CREATE TABLE clicks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  label       TEXT NOT NULL,
  type        TEXT NOT NULL,
  url         TEXT,
  source      TEXT NOT NULL DEFAULT 'direct',
  session_id  TEXT,               -- nanoid(12) from client
  utm_campaign TEXT,
  utm_medium   TEXT,
  utm_content  TEXT,

  clicked_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes (analytics queries are time-range scans per artist)
CREATE INDEX clicks_artist_time_idx ON clicks(artist_id, clicked_at DESC);
CREATE INDEX clicks_source_idx      ON clicks(artist_id, source);
CREATE INDEX clicks_session_idx     ON clicks(session_id);
```

---

### `views` — maps to `able_views`

```sql
CREATE TABLE views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  source      TEXT NOT NULL DEFAULT 'direct',
  referrer    TEXT,
  session_id  TEXT,
  page_state  TEXT,               -- profile state at view time

  viewed_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX views_artist_time_idx ON views(artist_id, viewed_at DESC);
CREATE INDEX views_source_idx      ON views(artist_id, source);
```

---

### `ui_preferences` — maps to `able_dismissed_nudges` + legacy `able_starred_fans`

```sql
-- These are UI state, not user data. Sync is nice-to-have, not required.
-- Do not include in fan data exports.

CREATE TABLE ui_preferences (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  dismissed_nudges    TEXT[] NOT NULL DEFAULT '{}',
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### Row Level Security (RLS) policies

```sql
-- ─── Enable RLS on all tables ───────────────────────────────────────────────
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE fans             ENABLE ROW LEVEL SECURITY;
ALTER TABLE events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE views            ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_preferences   ENABLE ROW LEVEL SECURITY;


-- ─── profiles ───────────────────────────────────────────────────────────────

-- Public: anyone can read non-deleted profiles (fan-facing page needs this)
CREATE POLICY "profiles: public read"
  ON profiles FOR SELECT
  USING (deleted_at IS NULL);

-- Artist: can update their own profile
CREATE POLICY "profiles: artist update"
  ON profiles FOR UPDATE
  USING (auth.uid() = artist_id);

-- Artist: can insert their own profile (one per user)
CREATE POLICY "profiles: artist insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = artist_id);


-- ─── fans ────────────────────────────────────────────────────────────────────

-- Fans are private to the artist who owns them
CREATE POLICY "fans: artist read own"
  ON fans FOR SELECT
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );

CREATE POLICY "fans: artist update own"
  ON fans FOR UPDATE
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );

-- Any visitor can insert a new fan (sign-up from able-v7.html)
-- Note: does NOT require auth. Fan sign-ups are unauthenticated.
CREATE POLICY "fans: public insert"
  ON fans FOR INSERT
  WITH CHECK (true);


-- ─── events ──────────────────────────────────────────────────────────────────

-- Public: anyone can read events (fan-facing shows section)
CREATE POLICY "events: public read"
  ON events FOR SELECT
  USING (deleted_at IS NULL AND is_cancelled = false);

-- Artist: full CRUD on their own events
CREATE POLICY "events: artist manage"
  ON events FOR ALL
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );


-- ─── clicks + views ──────────────────────────────────────────────────────────

-- Public can insert (fan clicks / page views from able-v7.html)
CREATE POLICY "clicks: public insert"
  ON clicks FOR INSERT WITH CHECK (true);

CREATE POLICY "views: public insert"
  ON views FOR INSERT WITH CHECK (true);

-- Only artist can read their own analytics
CREATE POLICY "clicks: artist read own"
  ON clicks FOR SELECT
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );

CREATE POLICY "views: artist read own"
  ON views FOR SELECT
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );
```

---

## PART 3 — MIGRATION STRATEGY

### Mental model
localStorage is the offline cache. Supabase is the source of truth once the user is authenticated. The transition is a one-time flush, after which localStorage becomes a write-through cache.

### `flushToSupabase()` — reference implementation

```javascript
/**
 * Flush local data to Supabase.
 * Called once after first auth, then on meaningful profile changes.
 * localStorage is kept as cache — it is not cleared after flush.
 *
 * @param {SupabaseClient} supabase
 * @param {string} artistId  — auth.users.id from Supabase Auth
 */
async function flushToSupabase(supabase, artistId) {
  const errors = [];

  // ── 1. Profile ──────────────────────────────────────────────────────────
  try {
    const raw = localStorage.getItem('able_v3_profile');
    if (raw) {
      const profile = JSON.parse(raw);
      await supabase
        .from('profiles')
        .upsert({
          artist_id:       artistId,
          name:            profile.name,
          bio:             profile.bio,
          artist_slug:     profile.artistSlug,
          accent:          profile.accent,
          theme:           profile.theme,
          feel:            profile.feel,
          state:           profile.state,
          state_override:  profile.stateOverride,
          release_title:   profile.releaseTitle,
          release_date:    profile.releaseDate,
          release_url:     profile.releaseUrl,
          cta_primary:     profile.ctaPrimary,
          cta_secondary:   profile.ctaSecondary,
          quick_actions:   profile.quickActions  ?? [],
          snap_cards:      profile.snapCards     ?? [],
          fan_capture:     profile.fanCapture,
          spotify_url:     profile.spotifyUrl,
          instagram_url:   profile.instagramUrl,
          tiktok_url:      profile.tiktokUrl,
          schema_version:  profile.schemaVersion ?? 1,
          updated_at:      new Date().toISOString(),
        }, { onConflict: 'artist_id' });
    }
  } catch (e) {
    errors.push({ key: 'able_v3_profile', error: e.message });
  }

  // ── 2. Fans ─────────────────────────────────────────────────────────────
  try {
    const raw = localStorage.getItem('able_fans');
    const fans = raw ? JSON.parse(raw) : [];
    if (fans.length > 0) {
      // Need the profile.id (not auth user id) as the FK
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('id')
        .eq('artist_id', artistId)
        .single();

      if (profileRow) {
        const rows = fans.map(f => ({
          artist_id:   profileRow.id,
          email:       f.email,
          source:      f.source,
          name:        f.name    ?? null,
          is_starred:  f.isStarred ?? false,
          signed_up_at: new Date(f.ts).toISOString(),
        }));
        // upsert on (artist_id, email) — safe to re-run
        await supabase
          .from('fans')
          .upsert(rows, { onConflict: 'artist_id,email', ignoreDuplicates: true });
      }
    }
  } catch (e) {
    errors.push({ key: 'able_fans', error: e.message });
  }

  // ── 3. Shows ─────────────────────────────────────────────────────────────
  try {
    const raw = localStorage.getItem('able_shows');
    const shows = raw ? JSON.parse(raw) : [];
    if (shows.length > 0) {
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('id')
        .eq('artist_id', artistId)
        .single();

      if (profileRow) {
        const rows = shows.map(s => ({
          artist_id:   profileRow.id,
          venue:       s.venue,
          city:        s.city      ?? null,
          country:     s.country   ?? null,
          event_date:  s.date,
          doors_time:  s.doorsTime ?? null,
          ticket_url:  s.ticketUrl ?? null,
          is_featured: s.featured  ?? false,
          is_sold_out: s.soldOut   ?? false,
        }));
        await supabase.from('events').insert(rows);
      }
    }
  } catch (e) {
    errors.push({ key: 'able_shows', error: e.message });
  }

  // ── 4. Analytics (best-effort, not critical) ────────────────────────────
  // clicks and views: insert only. Do not upsert — no stable ID to conflict on.
  // Omit from initial flush to keep it fast. Flush analytics separately.

  if (errors.length > 0) {
    console.warn('[ABLE] flushToSupabase completed with errors:', errors);
  }
  return { success: errors.length === 0, errors };
}
```

### Legacy key migration

```javascript
/**
 * On first admin.html load: migrate able_profile → able_v3_profile if needed.
 * Called before any profile read in admin.html.
 */
function migrateLegacyProfileKey() {
  const legacy = localStorage.getItem('able_profile');
  const canonical = localStorage.getItem('able_able_v3_profile');

  if (legacy && !canonical) {
    const data = JSON.parse(legacy);
    const migrated = {
      name:          data.name    || '',
      accent:        data.accent  || '#e05242',
      feel:          data.feel    || null,
      theme:         'dark',
      state:         'profile',
      spotifyUrl:    data.spotify || null,
      schemaVersion: 1,
      updatedAt:     Date.now(),
    };
    if (data.cta) {
      migrated.ctaPrimary = { label: data.cta.label, url: data.cta.url, type: 'custom' };
    }
    localStorage.setItem('able_v3_profile', JSON.stringify(migrated));
    // Do not delete able_profile — keep as backup until confirmed migrated
  }
}
```

---

## PART 4 — PRIVACY SPEC

### Principles

**"Your data. Your relationship."** is not just copy — it is a technical commitment.

1. Fan emails are never shared with other artists, ABLE staff, or third parties
2. Artists can export their full fan list at any time, in any tier
3. Fans can request deletion of all their data across all ABLE artists
4. ABLE does not use fan emails for platform marketing without explicit fan opt-in to ABLE communications (separate from artist opt-in)

### Fan data exposure model

| Consumer | Can see fan emails? | How |
|---|---|---|
| Artist (own fans) | Yes | Supabase RLS: `artist_id` match |
| Another artist | No | RLS blocks cross-artist reads |
| ABLE admin staff | Via service role only | Service role key never in client code |
| Third-party scripts on page | No (Supabase) | Data is server-side post-migration; localStorage phase is a known gap |
| Fan themselves | Yes | Can request via GDPR Subject Access Request |

### localStorage gap (pre-Supabase)

While data lives in localStorage, any JavaScript loaded on the same origin can read `able_fans`. Mitigation:
- Do not load untrusted third-party scripts that execute in the same origin as admin.html
- Spotify and YouTube embeds on able-v7.html (the public profile) do not need access to admin localStorage — they are on separate origins if iframed
- This gap closes automatically when fans are written to Supabase instead of localStorage

### Consent audit

Every fan sign-up must record:
```javascript
{
  email:         'fan@example.com',
  ts:            1742000000000,     // Unix ms
  source:        'ig',
  optIn:         true,              // artist marketing consent — checked at sign-up
  // future: consentVersion: '2026-03-15' — for consent policy versioning
}
```

### Data export (artist fan list)

```javascript
/**
 * Generate CSV of the artist's fan list.
 * All tiers get this. It is a GDPR requirement.
 */
function exportFansAsCSV() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const starred = new Set(JSON.parse(localStorage.getItem('able_starred_fans') || '[]'));

  const header = ['Email', 'Name', 'Date joined', 'Source', 'Starred', 'Opted in'];
  const rows = fans.map(f => [
    f.email,
    f.name || '',
    new Date(f.ts).toISOString().split('T')[0],
    f.source,
    (f.isStarred || starred.has(f.email)) ? 'Yes' : 'No',
    f.optIn ? 'Yes' : 'No',
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `able-fans-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## PART 5 — SCHEMA VERSIONING

### Profile schema version

`AbleProfile.schemaVersion` starts at `1`. When the shape changes in a backward-incompatible way:

1. Increment `schemaVersion`
2. Write a migration function: `migrateProfileV1toV2(profile)`
3. Call it on first read if `schemaVersion < CURRENT_VERSION`
4. Never silently swallow a parse error — log and fall back to defaults

### Event schema stability

Click and view events are append-only historical records. Never change their shape. If new fields are needed, add them as optional — old records simply won't have them, and that is fine.

---

## QUICK REFERENCE — localStorage key summary

```
able_v3_profile    → AbleProfile       (single object)
able_fans          → Fan[]             (append-only)
able_clicks        → ClickEvent[]      (append-only, trim at 1000)
able_views         → ViewEvent[]       (append-only, trim at 2000)
able_gig_expires   → number            (Unix ms, single value)
able_profile       → AbleProfileLegacy (legacy, migrate on read)
able_shows         → Show[]            (mutable array)
able_dismissed_nudges → string[]       (UI state only)
able_starred_fans  → string[]          (deprecated — migrate to Fan.isStarred)

fan_following      → FanFollowing[]    (fan.html only)
fan_location       → FanLocation       (fan.html only)
```
