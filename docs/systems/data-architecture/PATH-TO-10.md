# ABLE — Data Architecture: Path to 10
**Created: 2026-03-15 | Baseline: 6.8/10 → Target: 9.5/10 (spec) → 10 (live)**

> Three levels of work. P0 costs nothing — it is writing and spec work. P1 requires Supabase to be live. P2 is polish and real-time features. 10/10 requires live users and a GDPR audit.

---

## CURRENT BASELINE

| Dimension | Now |
|---|---|
| Profile schema completeness | 7/10 |
| Fan data model | 5/10 |
| Analytics events model | 6/10 |
| Page state system data | 7/10 |
| Shows data model | 6/10 |
| Supabase migration readiness | 6/10 |
| Multi-artist isolation | 4/10 |
| Data portability | 4/10 |
| Privacy architecture | 5/10 |
| Cross-page data coherence | 7/10 |
| **Overall** | **6.8/10** |

---

## P0 — SPEC COMPLETE → 8/10

**Effort: 1–2 days of writing + small code changes. No Supabase required.**

These changes close the gaps that are purely definitional — missing fields, undocumented types, ambiguous contracts. None of them break existing behaviour. They are additions.

---

### P0.1 — Formalise `AbleProfile` with missing fields

**Current gap:** `feel`, `snapCards`, `fanCapture`, `artistSlug`, `avatarUrl`, `spotifyUrl`, `schemaVersion` are all used in the codebase but not formally part of the localStorage spec.

**Action:**
- Adopt the `AbleProfile` TypeScript interface from SPEC.md as the canonical spec
- Add `schemaVersion: 1` to every profile write in start.html and admin.html
- Add `updatedAt: Date.now()` to every profile save

**Score impact:** Profile schema completeness 7 → 8.5

---

### P0.2 — Add missing fields to `Fan` interface

**Current gap:** `name`, `isStarred`, `optIn`, `confirmedAt`, `unsubscribedAt` are all absent.

**Action:**
- Update the fan sign-up form on able-v7.html to optionally capture fan `name`
- Add `optIn: true` to every fan sign-up write (the act of submitting the form is consent)
- Add `isStarred: false` as default on every new fan write
- Migrate `able_starred_fans` → inline `isStarred` field:

```javascript
// Run once on admin.html load (add to migrateLegacyProfileKey or similar)
function migrateStarredFans() {
  const starred = new Set(JSON.parse(localStorage.getItem('able_starred_fans') || '[]'));
  if (starred.size === 0) return;

  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const migrated = fans.map(f => ({
    ...f,
    isStarred: f.isStarred ?? starred.has(f.email),
  }));
  localStorage.setItem('able_fans', JSON.stringify(migrated));
  // Keep able_starred_fans for now — remove in P1
}
```

**Score impact:** Fan data model 5 → 7.5

---

### P0.3 — Add `id`, `city`, `country` to `Show`

**Current gap:** Shows have no stable identifier. City is missing, blocking fan.html "near you".

**Action:**
- On every `Show` write in admin.html: generate `id: nanoid(8)` if not present
- Add `city` field to the "Add show" form in admin.html
- Backfill: on shows load, any show without `id` gets `id: nanoid(8)` assigned and saved

```javascript
// Backfill shows with missing ids (run on admin load)
function backfillShowIds() {
  const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
  const needsBackfill = shows.some(s => !s.id);
  if (!needsBackfill) return;

  // nanoid-lite: 8-char alphanumeric ID without the nanoid dependency
  const nanoid = (n = 8) => [...crypto.getRandomValues(new Uint8Array(n))]
    .map(b => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[b % 62])
    .join('');

  const backfilled = shows.map(s => s.id ? s : { ...s, id: nanoid() });
  localStorage.setItem('able_shows', JSON.stringify(backfilled));
}
```

**Score impact:** Shows data model 6 → 8

---

### P0.4 — Add `sessionId` to analytics events

**Current gap:** Clicks and views have no session identifier. Funnel analysis is impossible without it.

**Action:**
- Generate a session ID on able-v7.html load: `const sessionId = nanoid(12)`
- Pass `sessionId` to every click and view write within that page load
- Session expires when the page is unloaded (no persistence needed)

```javascript
// In able-v7.html, at page load:
const SESSION_ID = (() => {
  const nanoid = (n = 12) => [...crypto.getRandomValues(new Uint8Array(n))]
    .map(b => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[b % 62])
    .join('');
  return nanoid();
})();
```

**Score impact:** Analytics events model 6 → 7.5

---

### P0.5 — Document `fan.html` keys in CLAUDE.md

**Current gap:** `fan_following` and `fan_location` are written by fan.html but absent from CLAUDE.md's key registry.

**Action:**
- Add both keys to the CLAUDE.md data architecture table
- Add them to the SPEC.md key summary
- Ensure the cross-page data flow table in CROSS_PAGE_JOURNEYS.md reflects them

**Score impact:** Cross-page data coherence 7 → 8.5

---

### P0.6 — Migrate legacy `able_profile` key on first admin load

**Current gap:** start.html writes `able_profile`; admin.html reads `able_v3_profile`. New users may see an empty dashboard.

**Action:**
- Implement `migrateLegacyProfileKey()` from SPEC.md Part 3
- Call it as the first operation in admin.html's init function
- Log the migration with a console message for debugging

**Score impact:** Cross-page data coherence 7 → 8.5 (same as P0.5 — these are counted together)

---

### P0 score summary

| Dimension | Before P0 | After P0 |
|---|---|---|
| Profile schema completeness | 7 | 8.5 |
| Fan data model | 5 | 7.5 |
| Analytics events model | 6 | 7.5 |
| Page state system data | 7 | 7.5 |
| Shows data model | 6 | 8 |
| Supabase migration readiness | 6 | 7 |
| Multi-artist isolation | 4 | 4 |
| Data portability | 4 | 5 |
| Privacy architecture | 5 | 6 |
| Cross-page data coherence | 7 | 8.5 |
| **Overall** | **6.8** | **~7.8** |

P0 alone gets to 7.8. The big gaps — multi-artist isolation, data portability, privacy — require Supabase.

---

## P1 — SUPABASE LIVE → 9/10

**Effort: 3–5 days of development. Requires Supabase auth to be wired.**

---

### P1.1 — Wire Supabase auth (magic link)

**Action:**
- Add Supabase JS CDN to admin.html and start.html
- Implement magic link flow: artist enters email → receives link → is authenticated
- Store `supabase.auth.getUser()` result in memory (never localStorage)
- On auth: call `flushToSupabase()` from SPEC.md

**Score impact:** Supabase migration readiness 7 → 9, Multi-artist isolation 4 → 8.5

---

### P1.2 — Enable RLS policies

**Action:**
- Run SQL from SPEC.md Part 2 in Supabase SQL editor
- Verify: Artist A cannot read Artist B's fans via Supabase client
- Test: unauthenticated insert to `fans` table works (fan sign-up); unauthenticated read returns no rows

**Score impact:** Privacy architecture 6 → 8.5

---

### P1.3 — Implement `flushToSupabase()`

**Action:**
- Implement the function from SPEC.md Part 3 in a shared `shared/able.js` utility
- Call on: first auth, profile save, fan sign-up (write to both localStorage and Supabase)
- Handle errors gracefully: if Supabase is unreachable, fall back to localStorage silently

---

### P1.4 — Fan list CSV export

**Action:**
- Implement `exportFansAsCSV()` from SPEC.md Part 4
- Add "Export fan list" button to admin.html fan list section (visible at all tiers — this is a GDPR right, not a paid feature)
- When Supabase is live: query Supabase, not localStorage, for the export (gets all fans, not just the current device's cache)

**Score impact:** Data portability 5 → 8

---

### P1.5 — `artist_id` FK on all tables

**Action:**
- The SQL in SPEC.md already includes `artist_id` on all tables
- During `flushToSupabase()`, look up the `profiles.id` UUID and use it as the FK for fans, events, clicks, views
- This is what makes Label-tier multi-artist isolation possible

**Score impact:** Multi-artist isolation 4 → 8.5

---

### P1 score summary

| Dimension | After P0 | After P1 |
|---|---|---|
| Profile schema completeness | 8.5 | 9 |
| Fan data model | 7.5 | 8.5 |
| Analytics events model | 7.5 | 8.5 |
| Page state system data | 7.5 | 8 |
| Shows data model | 8 | 9 |
| Supabase migration readiness | 7 | 9.5 |
| Multi-artist isolation | 4 | 8.5 |
| Data portability | 5 | 8 |
| Privacy architecture | 6 | 8.5 |
| Cross-page data coherence | 8.5 | 9 |
| **Overall** | **7.8** | **~8.9** |

---

## P2 — REALTIME + POLISH → 9.5/10

**Effort: 2–3 days. Requires P1 complete.**

---

### P2.1 — Real-time fan sign-up notifications

When a fan signs up on able-v7.html, the artist's open admin.html should update instantly.

**Action:**
```javascript
// In admin.html — subscribe to new fans after auth
supabase
  .channel('fans-realtime')
  .on('postgres_changes', {
    event:  'INSERT',
    schema: 'public',
    table:  'fans',
    filter: `artist_id=eq.${profileId}`,
  }, (payload) => {
    // Prepend new fan to list, show milestone toast if applicable
    onNewFan(payload.new);
  })
  .subscribe();
```

**Score impact:** Fan data model 8.5 → 9, Cross-page data coherence 9 → 9.5

---

### P2.2 — Soft-delete for removed fans

**Action:**
- "Remove fan" in admin.html sets `deleted_at = now()` rather than splicing the array
- Supabase query filters `WHERE deleted_at IS NULL` by default
- Preserves audit trail and analytics attribution (a removed fan's historical clicks still count)

---

### P2.3 — Profile change audit log

**Action:**
- On every profile save in admin.html: append a record to a `profile_history` table
```sql
CREATE TABLE profile_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id  UUID REFERENCES profiles(id) ON DELETE CASCADE,
  changed_by  UUID REFERENCES auth.users(id),
  field       TEXT,
  old_value   TEXT,
  new_value   TEXT,
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
- This supports: "who changed the release date and when?" — needed for Label tier team access

---

### P2.4 — UTM passthrough on fan sign-up

**Action:**
- Parse UTM params from the page URL on able-v7.html load
- Pass `utm_campaign`, `utm_medium`, `utm_content` to every `ClickEvent` and `ViewEvent` write
- These flow through to Supabase `clicks` and `views` tables — enabling paid campaign attribution

---

### P2.5 — `able_views` trim strategy

**Action:**
- `able_views` in localStorage is currently unbounded
- Trim to last 2000 entries on every write:
```javascript
function appendView(event) {
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  views.push(event);
  if (views.length > 2000) views.splice(0, views.length - 2000);
  localStorage.setItem('able_views', JSON.stringify(views));
}
```
- In Supabase: views are never trimmed — they are the source of truth

---

### P2 score summary

| Dimension | After P1 | After P2 |
|---|---|---|
| Profile schema completeness | 9 | 9.5 |
| Fan data model | 8.5 | 9.5 |
| Analytics events model | 8.5 | 9.5 |
| Page state system data | 8 | 8.5 |
| Shows data model | 9 | 9 |
| Supabase migration readiness | 9.5 | 9.5 |
| Multi-artist isolation | 8.5 | 9 |
| Data portability | 8 | 9 |
| Privacy architecture | 8.5 | 9 |
| Cross-page data coherence | 9 | 9.5 |
| **Overall** | **8.9** | **~9.3** |

---

## WHAT GETS TO 10/10

A true 10 requires things that cannot be done in a spec document:

1. **Live Supabase with real user data** — the schema works in the real world, not just on paper
2. **GDPR audit** — a qualified review of the consent capture, data export, right to erasure, and breach notification procedures
3. **Data portability tested end-to-end** — a real artist exports their fan list and successfully imports it into Mailchimp / Klaviyo / a spreadsheet without data loss
4. **Multi-artist stress test** — a Label-tier account with 10 artists, confirming RLS isolation holds and cross-artist analytics are correctly aggregated
5. **Client-side security review** — confirm no third-party CDN script can read fan data from localStorage or Supabase client

The ceiling for spec-complete work is 9.5. The last 0.5 is earned through real users, real incidents, and real fixes.

---

## EXECUTION ORDER

```
P0 (now, no Supabase):
  P0.1  AbleProfile schema formalisation
  P0.6  Legacy key migration       ← do this first, it fixes a live bug
  P0.3  Show id + city fields
  P0.2  Fan name + optIn + starred migration
  P0.4  Session ID on analytics
  P0.5  Document fan.html keys

P1 (when Supabase auth is wired):
  P1.1  Auth flow
  P1.2  RLS policies
  P1.3  flushToSupabase()
  P1.5  artist_id FK verification
  P1.4  Fan list CSV export

P2 (polish, after P1 is stable):
  P2.5  Views trim (quick win — do this early in P2)
  P2.4  UTM passthrough
  P2.2  Soft-delete for fans
  P2.1  Real-time fan notifications
  P2.3  Profile change audit log
```
