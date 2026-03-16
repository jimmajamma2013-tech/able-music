# ABLE — Canonical Object Model
**Status: ACTIVE — product truth, not superseded**
**Last updated: 2026-03-14**
**V8 note:** `docs/systems/data-architecture/SPEC.md` extends this with complete TypeScript interfaces, SQL table definitions, RLS policies, and the `flushToSupabase()` migration function. This doc defines the *shapes*. The data-architecture SPEC.md defines *how to store and migrate them*.

*One definition per object. All engines read and write these shapes. No engine redefines them.*

---

## §1 — The `able_v3_profile` root object

The canonical artist profile. Stored in `localStorage('able_v3_profile')`. Maps 1:1 to the Supabase `profiles` table.

```javascript
{
  // Identity
  name:           string,          // "LUNA"
  handle:         string,          // "luna" — URL slug, auto-generated
  location:       string,          // "London"
  genres:         string[],        // ["Electronic"]
  bio:            string,          // max 160 chars
  accent:         string,          // hex "#c49438"
  theme:          'dark' | 'light' | 'glass' | 'contrast',
  vibe:           'electronic' | 'hiphop' | 'rnb' | 'indie' | 'pop' | 'rock' | 'acoustic',

  // Guided Identity (added Checkpoint 10)
  identity: {
    genre:         string,         // one of 7 vibe slugs
    feel:          'intimate-raw' | 'intimate-refined' | 'bold-raw' | 'bold-refined',
    accent:        string,         // hex
    accentSource:  'ai' | 'artist' | 'artwork',
    refinements: {
      darkness:    number,         // -3 to +3 integer, default 0
      spacing:     number,
      sharpness:   number,
      contrast:    number,
      warmth:      number
    }
  },

  // Campaign state
  stateOverride:  null | 'profile' | 'pre-release' | 'live' | 'gig',
  releaseDate:    string | null,   // ISO date string

  // Top card
  topCard: {
    type:          'artwork' | 'video' | 'embed',
    artworkUrl:    string,
    videoUrl:      string,
    embedUrl:      string,
    title:         string,
    releaseType:   string
  },

  // CTAs
  ctaPrimary:    { label: string, url: string },
  ctaSecondary:  { label: string, url: string },

  // Platforms (max 8)
  platforms: [{ label: string, url: string, type: string }],

  // Content
  releases:  Release[],           // see §2
  events:    Event[],             // see §3
  merch:     MerchStore,          // see §4
  support:   SupportConfig,       // see §5
  snapCards: SnapCard[],

  // Systems
  closeCircle:  CloseCircleConfig,   // see §5
  moments:      Moment[],            // see §3
  identity:     IdentityConfig,      // see §4
  credits:      Credit[],            // see §8
  recommendations: [{ name, ableHandle, url, note }],  // max 5

  // Internal
  tier:          'free' | 'artist' | 'artist-pro' | 'label'
}
```

**Frozen keys (do not rename after v6 ships):** `able_v3_profile`, `able_fans`, `able_clicks`, `able_views`, `able_artist_id`, `able_gig_expires`

---

## §2 — Release

```javascript
{
  id:          string,              // uuid
  title:       string,
  type:        'Album' | 'EP' | 'Single' | 'Mix',
  platform:    string,              // 'Spotify' | 'SoundCloud' | etc
  releaseDate: string,              // ISO date
  artworkUrl:  string,
  streamUrl:   string,
  tracks: [{
    title:      string,
    duration:   string,             // "4:12"
    artworkUrl: string
  }],
  credits: Credit[]                 // see §8
}
```

---

## §3 — Moment

The unified moment object. Used by: World Map, Moment Engine, Close Circle access gating.

```javascript
{
  id:          string,              // uuid
  type:        'show' | 'release' | 'livestream' | 'early_access' |
               'rehearsal' | 'interview' | 'session' | 'remix' | 'collab',
  title:       string,
  date:        string,              // ISO date "YYYY-MM-DD"
  active:      boolean,
  access: {
    level:           'public' | 'fan' | 'supporter' | 'invite',
    earlyAccessHours: number | null,    // hours before public drop
    inviteList:      string[] | null,   // fan email list for invite-only
    teaserVisible:   boolean,           // show teaser to non-entitled fans?
    teaserText:      string | null      // e.g. "Close circle hears this first"
  }
}
```

**Shorthand for World Map rendering:** `moment.access.level` → `'public'` = open dot, `'fan'` = fan-gated dot, `'supporter'` = lock-ring dot (`.wm-dot--locked`), `'invite'` = private (hidden or locked-ring depending on config)

---

## §4 — Identity (Guided Identity Engine)

```javascript
{
  genre:        string,                   // one of 7 vibe slugs
  feel:         'intimate-raw' | 'intimate-refined' | 'bold-raw' | 'bold-refined',
  accent:       string,                   // hex
  accentSource: 'ai' | 'artist' | 'artwork',
  refinements: {
    darkness:  number,  // -3 to +3
    spacing:   number,
    sharpness: number,
    contrast:  number,
    warmth:    number
  }
}
```

Derived at render time (not stored): `fontWeight`, `cardRadius`, `durNorm`, `spacingDensity`.

---

## §5 — Supporter / Close Circle

### CloseCircleConfig (artist-side)
```javascript
{
  enabled:       boolean,
  monthlyAmount: number,      // default 5
  currency:      '£' | '$' | '€',
  introText:     string       // shown in join sheet
}
```

### FanSupporterState (fan-side — stored per fan, per artist)
```javascript
{
  artistHandle:  string,
  fanEmail:      string,
  tier:          'supporter' | 'none',
  status:        'active' | 'paused' | 'cancelled',
  joinedAt:      string,      // ISO timestamp
  monthlyAmount: number,
  currency:      string,
  entitlements: {
    earlyAccess:     boolean,
    supporterStreams: boolean,
    replayAccess:    boolean,
    dispatches:      boolean,
    inviteEligible:  boolean
  }
}
```

---

## §6 — Campaign / Showcase Object

```javascript
{
  campaignId:   string,        // uuid
  artistHandle: string,
  type:         'release' | 'press' | 'tour',
  title:        string,
  releaseId:    string | null,
  activeFrom:   string,        // ISO date
  activeTo:     string,        // ISO date
  publicUrl:    string,
  shareCardUrl: string,
  style: {
    accentOverride: string | null,
    featureImage:   string | null
  }
}
```

---

## §7 — Event

```javascript
{
  id:        string,
  venue:     string,
  city:      string,
  country:   string,           // ISO 3166-1 alpha-2 "GB"
  date:      string,           // ISO timestamp
  time:      string,           // "22:00"
  ticketUrl: string | null,
  soldOut:   boolean
}
```

---

## §8 — Credit

```javascript
{
  name:       string,
  role:       string,          // "Mastering" | "Production, Mixing" | etc
  ableHandle: string | null,
  confirmed:  boolean,
  external:   string | null    // LinkedIn / SoundBetter URL
}
```

---

## §9 — Fan record (able_fans)

```javascript
{
  email:            string,
  ts:               number,       // Unix timestamp ms
  source:           'direct' | 'instagram' | 'tiktok' | 'youtube' | 'qr' | 'email' | 'other',
  name:             string | null,
  consent:          true,
  consentMethod:    string,       // 'double_optin_email'
  jurisdiction:     string,       // 'GB' | 'EU' | etc
  double_opted_in:  boolean,
  opted_in_at:      number | null // Unix timestamp ms
}
```

**Source taxonomy frozen** — do not change after v6 ships.

---

## §10 — Click event (able_clicks, max 200 FIFO)

```javascript
{
  label:  string,
  type:   'primary_cta' | 'secondary_cta' | 'pill' | 'snap_card' | 'platform' | 'merch_item' | 'support_pack',
  ts:     number,         // Unix ms
  source: string          // from source taxonomy
}
```

**Type values frozen** — do not change after v6 ships.

---

## §11 — Snap Card

```javascript
{
  id:          string,
  published:   boolean,
  sortOrder:   number,
  imageUrl:    string | null,
  title:       string | null,
  body:        string | null,
  ctaLabel:    string | null,
  ctaUrl:      string | null
}
```

---

*When any engine spec defines a JS object that contradicts a definition here, this file wins. Update this file when canonical shapes change — do not update individual engine specs in isolation.*
