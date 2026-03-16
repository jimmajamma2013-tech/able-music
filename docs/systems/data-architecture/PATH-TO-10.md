# ABLE — Data Architecture: Path to 10
**Created: 2026-03-15 | Revised: 2026-03-16 | Baseline: 6.1/10 → Target: 9.5/10 (spec) → 10 (live)**

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
| Cross-page data coherence | 0/10 (data integrity bug) |
| **Overall** | **6.1/10** |

---

## P0 — FIX THE KEY CONFLICT → 8.5/10

**Effort: 15 minutes of code. Zero Supabase required. Must be done before any further development.**

The `able_profile` vs `able_v3_profile` conflict is a silent data loss bug. New users who complete the wizard may see an empty admin dashboard because the migration function has a typo. Fix this first.

---

### P0.1 — The exact migration function for `admin.html`

Add this as the **first operation** inside `admin.html`'s `DOMContentLoaded` handler, before any profile read:

```javascript
// ─── migrateLegacyProfileKey ────────────────────────────────────────────────
// Runs ONCE on admin.html load. Migrates able_profile (legacy wizard key)
// into able_v3_profile (canonical key). Keeps the legacy key as backup.
// Safe to run every load — exits immediately if nothing to migrate.
function migrateLegacyProfileKey() {
  const legacy    = localStorage.getItem('able_profile');
  const canonical = localStorage.getItem('able_v3_profile'); // note: correct key, no double prefix
  if (!legacy) return;                   // nothing to migrate
  if (canonical) return;                 // canonical already exists — do not overwrite
  try {
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
    console.log('[ABLE] Migrated able_profile → able_v3_profile');
    // Keep able_profile as backup for one release cycle, then delete
  } catch (e) {
    console.warn('[ABLE] migrateLegacyProfileKey failed:', e.message);
  }
}
```

**Call site in admin.html:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  migrateLegacyProfileKey(); // ← must be FIRST, before any profile read
  // ... rest of init
});
```

---

### P0.2 — The exact same migration function for `able-v7.html`

`able-v7.html` reads `able_v3_profile` on load. If a fan visits the artist's page and the artist completed onboarding but never visited admin.html, the migration hasn't run yet. Add the same function to `able-v7.html`'s init sequence:

```javascript
// ─── migrateLegacyProfileKey ────────────────────────────────────────────────
// Same as admin.html — ensures able_profile → able_v3_profile regardless of
// which page the artist visits first after completing the wizard.
function migrateLegacyProfileKey() {
  const legacy    = localStorage.getItem('able_profile');
  const canonical = localStorage.getItem('able_v3_profile');
  if (!legacy || canonical) return;
  try {
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
  } catch (e) { /* silent — page renders with defaults */ }
}
```

**Call site in able-v7.html:** at the very top of `initPage()` or equivalent page load function, before the profile is read.

---

### P0.3 — The `able_wizard_draft` key and `sessionStorage` clarification

The wizard in `start.html` stores in-progress draft state as:

```javascript
sessionStorage.setItem('able_wizard_draft', JSON.stringify(d));
```

**Key facts:**
- Key name: `able_wizard_draft`
- Storage type: **`sessionStorage`**, NOT `localStorage` (this is correct — it should not survive tab close)
- Written by: `start.html` during wizard progress
- Read by: `start.html` on page reload (draft recovery)
- Deleted by: `start.html` on wizard completion (line 1787)
- TTL: session-scoped (expires on tab close)
- Does NOT need to be migrated to Supabase — it is transient UI state

**Add to CLAUDE.md canonical key table:**

```
| `able_wizard_draft` | Wizard in-progress state — sessionStorage (not localStorage). TTL: single browser session. Deleted on wizard completion. | start.html | start.html |
```

---

### P0.4 — Fix the typo in SPEC.md `migrateLegacyProfileKey()`

The existing function in `docs/systems/data-architecture/SPEC.md` Part 3 reads:

```javascript
const canonical = localStorage.getItem('able_able_v3_profile'); // ← BUG: double prefix
```

This should be:

```javascript
const canonical = localStorage.getItem('able_v3_profile'); // ← correct
```

Fix this in SPEC.md so the reference implementation is correct. The P0.1 function above is the corrected version.

---

### P0 score summary — after key conflict fixed

| Dimension | Before P0 | After P0 |
|---|---|---|
| Profile schema completeness | 7 | 7 |
| Fan data model | 5 | 5 |
| Analytics events model | 6 | 6 |
| Page state system data | 7 | 7 |
| Shows data model | 6 | 6 |
| Supabase migration readiness | 6 | 6 |
| Multi-artist isolation | 4 | 4 |
| Data portability | 4 | 4 |
| Privacy architecture | 5 | 5 |
| Cross-page data coherence | 0 | 8.5 |
| **Overall** | **6.1** | **~7.5** |

**Score after key conflict fixed: 7.5/10. Score after Supabase migration fully specced: 8.5/10.**

---

## P1 — SPEC COMPLETE → 8.5/10

**Effort: 1–2 days of writing + small code changes. No Supabase required.**

---

### P1.1 — Formalise `AbleProfile` with missing fields

See SPEC.md `AbleProfile` interface. Ensure `feel`, `snapCards`, `fanCapture`, `artistSlug`, `avatarUrl`, `spotifyUrl`, `schemaVersion` are part of every profile write in start.html and admin.html.

Add `schemaVersion: 1` to every profile write. Add `updatedAt: Date.now()` to every profile save.

**Score impact:** Profile schema completeness 7 → 8.5

---

### P1.2 — Add missing fields to `Fan` interface

Add `optIn: true` to every fan sign-up write (the act of submitting the form is consent). Add `isStarred: false` as default on every new fan write.

Migrate `able_starred_fans` → inline `isStarred` field (see P0.2 in original PATH-TO-10.md for migration code).

**Score impact:** Fan data model 5 → 7.5

---

### P1.3 — Add `id`, `city`, `country` to `Show`

On every `Show` write in admin.html: generate `id: nanoid(8)` if not present. Add `city` field to the add-show form in admin.html.

Backfill function (run on admin load):
```javascript
function backfillShowIds() {
  const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
  if (!shows.some(s => !s.id)) return;
  const nanoid = (n = 8) => [...crypto.getRandomValues(new Uint8Array(n))]
    .map(b => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[b % 62])
    .join('');
  localStorage.setItem('able_shows', JSON.stringify(shows.map(s => s.id ? s : { ...s, id: nanoid() })));
}
```

**Score impact:** Shows data model 6 → 8

---

### P1.4 — Add `sessionId` to analytics events

In able-v7.html, at page load:
```javascript
const SESSION_ID = (() => {
  const n = (len = 12) => [...crypto.getRandomValues(new Uint8Array(len))]
    .map(b => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[b % 62])
    .join('');
  return n();
})();
```

Pass `sessionId: SESSION_ID` to every click and view write.

**Score impact:** Analytics events model 6 → 7.5

---

### P1.5 — Supabase migration checklist: exact order of operations

The "flush" function must run in this exact order to avoid partial migration states:

```
1. Auth (magic link) — get auth.users.id
2. migrateLegacyProfileKey() — ensure able_v3_profile exists (already done at P0)
3. Upsert profiles table — use auth.uid() as artist_id; onConflict: 'artist_id'
4. Store profiles.id (UUID) — needed as FK for all subsequent tables
5. Upsert fans table — using profiles.id as artist_id; onConflict: 'artist_id,email'
6. Insert events table — shows list; no upsert conflict key exists yet, insert only
7. Insert clicks table — analytics; insert only, no deduplication
8. Insert views table — analytics; insert only, no deduplication
9. Verify: confirm profiles.id row exists before any fan/show insert (if not: abort step 5–8)
10. On failure at any step: log to console, continue with localStorage as fallback
```

**Rollback strategy:** `flushToSupabase()` is idempotent. It uses `upsert` for profiles and fans (safe to re-run). If it fails, localStorage data is unchanged — the user loses nothing. Run again next session.

**Do NOT delete localStorage after flush.** It becomes a cache. Only clear a localStorage key when you are certain Supabase is the live source of truth for that artist.

**Score impact:** Supabase migration readiness 6 → 9

---

### P1 score summary

| Dimension | After P0 | After P1 |
|---|---|---|
| Profile schema completeness | 7 | 8.5 |
| Fan data model | 5 | 7.5 |
| Analytics events model | 6 | 7.5 |
| Page state system data | 7 | 7.5 |
| Shows data model | 6 | 8 |
| Supabase migration readiness | 6 | 9 |
| Multi-artist isolation | 4 | 4 |
| Data portability | 4 | 5 |
| Privacy architecture | 5 | 6 |
| Cross-page data coherence | 8.5 | 9 |
| **Overall** | **7.5** | **~8.5** |

---

## P2 — SUPABASE LIVE → 9.5/10

**Effort: 3–5 days of development. Requires Supabase auth to be wired.**

See original PATH-TO-10.md P1 section (now relabelled P2 due to P0 reprioritisation):
- P2.1: Wire Supabase auth (magic link)
- P2.2: Enable RLS policies
- P2.3: Implement `flushToSupabase()`
- P2.4: Fan list CSV export
- P2.5: `artist_id` FK on all tables

### P2 score summary

| Dimension | After P1 | After P2 |
|---|---|---|
| Profile schema completeness | 8.5 | 9 |
| Fan data model | 7.5 | 8.5 |
| Analytics events model | 7.5 | 8.5 |
| Page state system data | 7.5 | 8 |
| Shows data model | 8 | 9 |
| Supabase migration readiness | 9 | 9.5 |
| Multi-artist isolation | 4 | 8.5 |
| Data portability | 5 | 8 |
| Privacy architecture | 6 | 8.5 |
| Cross-page data coherence | 9 | 9.5 |
| **Overall** | **8.5** | **~9.3** |

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
P0 (now, 15 minutes — fixes a live bug):
  P0.1  migrateLegacyProfileKey() in admin.html  ← do this first
  P0.2  migrateLegacyProfileKey() in able-v7.html
  P0.3  Document able_wizard_draft (sessionStorage) in CLAUDE.md
  P0.4  Fix typo in SPEC.md Part 3

P1 (now, no Supabase):
  P1.5  Supabase migration checklist (order of operations)
  P1.1  AbleProfile schema formalisation
  P1.3  Show id + city fields
  P1.2  Fan name + optIn + starred migration
  P1.4  Session ID on analytics

P2 (when Supabase auth is wired):
  P2.1  Auth flow
  P2.2  RLS policies
  P2.3  flushToSupabase()
  P2.5  artist_id FK verification
  P2.4  Fan list CSV export
```
