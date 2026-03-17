# ABLE — Data Architecture Analysis
**Created: 2026-03-15 | Revised: 2026-03-16 | Overall score: 6.8/10**

> Honest assessment of the current data architecture across 10 dimensions. Most scores sit at 6–7 — this is expected at pre-Supabase stage. The gaps are known and documented. The path to 9.5 is clear.

---

## SCORING OVERVIEW

| # | Dimension | Score | Short verdict |
|---|---|---|---|
| 1 | Profile schema completeness | 7/10 | Core fields present; feel/vibe and snap cards missing from formal spec |
| 2 | Fan data model | 5/10 | Email + ts + source is the minimum viable set; name, location, preferences absent |
| 3 | Analytics events model | 6/10 | Clicks and views captured; no session ID, no UTM passthrough, no event versioning |
| 4 | Page state system data | 7/10 | Four states defined; stateOverride stored; auto-switch logic correct but not server-verified |
| 5 | Shows data model | 6/10 | Core fields present; city, sold-out flag, and cancelled state missing |
| 6 | Supabase migration readiness | 6/10 | 1:1 mapping rule is sound; no migration script, no RLS, no conflict resolution |
| 7 | Multi-artist isolation | 4/10 | No artist_id on any local key; Label tier with 10 artists is unspecced |
| 8 | Data portability | 4/10 | No export mechanism exists; GDPR right to portability is unaddressed |
| 9 | Privacy architecture | 5/10 | Fan emails in localStorage are readable by any JS on the page; no encryption, no consent audit |
| 10 | Cross-page data coherence | **0/10 (data integrity)** | **P0: `able_profile` ≠ `able_v3_profile` — silent data loss for all new users** |

**Overall: 6.1/10** (weighted — dimension 10 carries extra weight due to P0 severity)

---

## DIMENSION DETAIL

---

### 1. Profile schema completeness — 7/10

**What exists:**
`able_v3_profile` holds: name, bio, accent, theme, state, stateOverride, releaseTitle, releaseDate, ctaPrimary, ctaSecondary, quickActions.

**What is missing from the formal spec:**
- `feel` / `vibe` / genre — collected in wizard (start.html Screen 2) but no canonical field name or enum defined
- `snapCards` — referenced throughout admin.html but not documented as part of `able_v3_profile`
- `fanCapture` — the fan sign-up headline, placeholder, and thanks copy are profile-level but unspecced
- `spotifyUrl` — imported at onboarding, but whether it persists in profile is undefined
- `artistSlug` — needed for canonical URL (`ablemusic.co/nadia`) but absent from schema
- `avatarUrl` — no artwork/avatar URL field defined

**Risk:** start.html writes fields that admin.html reads, with no agreed contract. Silent schema drift is likely as features are added.

---

### 2. Fan data model — 5/10

**What exists:**
```javascript
{ email: string, ts: number, source: string }
```

**What is missing:**
- `name` — fans have names. This is the most basic CRM field and it is absent. Artists will immediately ask "who is this person?"
- `location` — city/country. Critical for routing "playing near you" notifications in fan.html and for artist tour planning
- `isStarred` — currently stored as a parallel `able_starred_fans` array (email strings). This is denormalised and fragile; starred status should be a field on the fan record
- `optIn` — explicit marketing consent flag. Required for GDPR compliant email broadcasts
- `confirmedAt` — email confirmation timestamp, separate from sign-up timestamp
- `unsubscribedAt` — soft-delete / opt-out timestamp. Hard-deleting fan records violates audit requirements
- Fan identity across multiple artists — if a fan follows 10 artists, they currently create 10 separate records with no common identity

**Risk:** When Artist Pro email broadcast launches, sending to `able_fans` without an `optIn` flag is a GDPR violation.

---

### 3. Analytics events model — 6/10

**What exists:**
- `able_clicks`: `[{ label, type, ts, source }]`
- `able_views`: `[{ ts, source }]`

**What is missing:**
- `session_id` — no way to group events from the same visit; funnel analysis is impossible without it
- `url` — for click events, the destination URL is not recorded. You know what was clicked but not where it went
- `referrer` — for view events, the HTTP referrer is not recorded; `source` is a query-param value, not the full referrer chain
- `utm_campaign` / `utm_medium` / `utm_content` — no UTM passthrough means paid campaign attribution is blind
- Event schema versioning — if the event shape changes, historical records become incompatible with no migration path
- No `conversion` event type — there is no way to know that a fan sign-up was preceded by a stream click within the same session (funnel)
- `able_views` grows unboundedly in localStorage; no TTL or trim strategy

**Risk:** Advanced analytics (Artist Pro tier) require session-level data. The current schema cannot support conversion funnels.

---

### 4. Page state system data — 7/10

**What exists:**
- `stateOverride` in `able_v3_profile` — explicit artist-set state
- `releaseDate` — ISO 8601 string, drives auto-switch
- `able_gig_expires` — Unix timestamp, separate key, correct
- Auto-switch logic: `now < releaseDate → pre-release; now < releaseDate + 14d → live; else → profile`

**What is missing:**
- State is computed client-side from `releaseDate` — a manipulated client clock can trick it
- No server-side state confirmation; when Supabase lands, state must be authoritative from the server
- `gig` state stores expiry as a separate key (`able_gig_expires`) rather than as a field inside `able_v3_profile` — creates inconsistency; two sources of truth for state
- No `stateChangedAt` audit field — artist cannot see when state was last changed
- No explicit `profile` override — to force profile state you set `stateOverride: 'profile'`, but this is not documented

**Risk:** Client-side state computation is fine for MVP. It becomes a trust issue when used for time-limited promotional states (pre-save windows, live windows) that partners or DSPs query.

---

### 5. Shows data model — 6/10

**What exists:**
```javascript
{ venue: string, date: string, doorsTime?: string, ticketUrl?: string, featured?: boolean }
```

**What is missing:**
- `city` — a show without a city is unroutable for fan.html "playing near you" feature
- `country` — ISO 3166-1 alpha-2 for international routing
- `cancelled` — no way to mark a show as cancelled without deleting it; deleting loses analytics data
- `soldOut` — the ticketUrl may still be useful even when sold out (fan wants to know they missed it)
- `lineup` — support acts, other artists on the bill
- `venueUrl` — link to venue website for maps / details
- `priceRange` — cost information; fans want to know before clicking through
- `id` — no unique identifier per show; removing by index is fragile

**Risk:** fan.html "playing near you" is a core feature of the returning fan journey. It requires `city` at minimum. Without it, this feature cannot ship.

---

### 6. Supabase migration readiness — 6/10

**What is documented:**
- 1:1 mapping rule: localStorage key → Supabase table row
- "Migration is just a flush-to-API call" philosophy
- Supabase project URL and anon key confirmed
- CDN script tag identified (no npm needed)

**What is not yet done:**
- No `flushToSupabase()` function exists, even as a stub
- No RLS (Row Level Security) policies defined — adding Supabase today would expose all fan emails to all users
- No conflict resolution strategy — if artist edits profile on two devices simultaneously, which wins?
- No migration rollback plan — what happens if `flushToSupabase()` fails halfway through?
- `able_profile` (legacy wizard key) is not cleanly mapped — it overlaps with `able_v3_profile`
- `able_dismissed_nudges` and `able_starred_fans` are UI state, not data state — they probably should not be in Supabase at all, or should be a separate `ui_preferences` table
- Array fields in localStorage (snap cards, quick actions) need a separate table in Supabase, not a JSONB column — this decision is unresolved

**Risk:** The "flush-to-API" mental model is correct and clean. But without RLS, the first Supabase connection is a security incident waiting to happen.

---

### 7. Multi-artist isolation — 4/10

**What exists:**
Nothing. All localStorage keys are single-artist, single-browser by design.

**What is unresolved:**
- The Label tier (£49/mo) supports 10 artist pages. The current data model has no `artist_id` on any record.
- `able_fans` from Artist A and Artist B would collide in a shared Supabase table without an `artist_id` FK
- Even at single-artist level: if an artist clears their browser, all data is lost. There is no cloud backup.
- Team access (Label tier) requires role-based access: who can edit which artist's profile? Supabase RLS can model this, but the schema does not include it yet.
- `artist_id` will need to be a UUID in Supabase, but there is no UUID generation strategy for the local phase

**Risk:** This is the highest-risk dimension for the Label tier. Without `artist_id` isolation, any multi-artist feature is blocked.

---

### 8. Data portability — 4/10

**What exists:**
Nothing. No export mechanism of any kind.

**What is required:**
- GDPR Article 20: Right to data portability — a user must be able to receive their personal data in a "structured, commonly used, machine-readable format"
- For artists: fan list CSV export (email, name, date joined, source)
- For fans: a list of artists they follow and all personal data ABLE holds about them
- For both: a "delete my account" flow that removes all records (Supabase `DELETE` cascade)

**Current state:**
Fan emails are locked in localStorage. The only way to export them today is to open DevTools. This is not an acceptable answer once ABLE has paying users.

**Risk:** Data portability is a legal requirement in the UK and EU (GDPR) and is increasingly enforced in the US (CCPA). It must be built before any paid tier launches.

---

### 9. Privacy architecture — 5/10

**What exists:**
- Fan emails are stored in localStorage (`able_fans`)
- No other page can access another origin's localStorage — so cross-site leakage is not possible
- The Supabase anon key is exposed in the codebase (intentional — it is a publishable key)

**What is missing:**
- Fan emails in localStorage are readable by any JavaScript running on the same origin — including any third-party script injected via CDN (Spotify embed, etc.)
- No consent audit trail — when a fan signs up, is their `optIn` timestamp recorded? Is the consent version recorded?
- No data minimisation strategy — `able_views` records a timestamp for every page view; that is a record of when a fan was active, stored indefinitely
- Supabase RLS is not configured — once data moves to Supabase, there are no row-level access controls
- The Supabase anon key comment in CLAUDE.md labels it `sb_publishable_*` — this is correct, but the service role key must never appear in any file

**Risk:** Third-party CDN scripts on the same page can read localStorage. Spotify, YouTube, and other embeds load JS from external origins. This is a real attack surface.

---

### 10. Cross-page data coherence — 0/10 (data integrity) | 7/10 (documentation)

**P0 DATA INTEGRITY BUG: `able_profile` vs `able_v3_profile` key conflict**

This is a silent data loss bug. It is scored 0/10 on data integrity because:

**start.html writes to `sessionStorage` as `able_wizard_draft` during the wizard, then writes to `localStorage` as `able_v3_profile` on completion (line 1785).** However, `admin.html` also has a legacy read at line 5163:

```javascript
const wizData = safeLS('able_profile', {}); // wizard key fallback
```

The legacy key `able_profile` is written by no current code path. But `admin.html` still reads it as a fallback. If any old data exists under `able_profile` from an earlier session (before start.html was updated to write `able_v3_profile`), admin.html may pick up stale data.

More critically: the `migrateLegacyProfileKey()` function in SPEC.md Part 3 has a typo — it reads from `'able_able_v3_profile'` (double prefix) instead of `'able_v3_profile'`. This bug means the migration function as written would never find the canonical key, silently leaving `able_profile` data unmerged and the canonical key empty.

**What is inconsistent or missing:**
- `able_profile` (start.html legacy output) and `able_v3_profile` (admin.html canonical) are both in use. The legacy key is never cleanly retired.
- `fan.html` writes `fan_following` and `fan_location` — these are new keys not documented in CLAUDE.md's canonical key list
- `able_starred_fans` is a string array of emails. When a fan record is deleted, the starred list is not cleaned up — dangling references
- The `source` field in `able_fans` uses canonical values (`ig`, `tt`, `sp`) but this enum is only documented in CROSS_PAGE_JOURNEYS.md, not in any schema spec — it can drift
- No version field on `able_v3_profile` — if the schema changes, old profiles are silently incompatible
- **`able_wizard_draft` uses `sessionStorage`, not `localStorage`** — this is correct (it is a temporary in-progress state) but must be documented as such in the canonical key list. CONTEXT.md currently omits this key entirely.

**Risk:** The legacy `able_profile` read in admin.html is a canonical violation. The migration function typo is a correctness bug. An artist completing the wizard on a fresh browser may not see their data in admin because `able_profile` is written nowhere in the current codebase, meaning admin.html's fallback read returns `{}`.

---

## SUMMARY TABLE

| Dimension | Score | Blocking issue |
|---|---|---|
| Profile schema completeness | 7/10 | `feel`, `snapCards`, `artistSlug` not formally specced |
| Fan data model | 5/10 | No `name`, no `optIn`, starred is denormalised |
| Analytics events model | 6/10 | No session_id, no UTM passthrough |
| Page state system data | 7/10 | `gig_expires` not inside profile; client-side authority |
| Shows data model | 6/10 | No `city`, no `cancelled`, no `id` |
| Supabase migration readiness | 6/10 | No RLS, no conflict resolution, no flush function |
| Multi-artist isolation | 4/10 | No `artist_id` anywhere |
| Data portability | 4/10 | No export mechanism; GDPR requirement unmet |
| Privacy architecture | 5/10 | localStorage readable by third-party CDN scripts |
| Cross-page data coherence | 0/10 (integrity) | Legacy key read with typo in migration fn; wizard_draft key undocumented |

**Overall: 6.1/10**

The architecture is sound at the concept level. The 1:1 localStorage-to-Supabase mapping is a clean mental model. The P0 is the `able_profile` / `able_v3_profile` conflict plus the typo in `migrateLegacyProfileKey()`. Both can be fixed in under 10 minutes of code. After that fix, coherence rises to 8.5 and the overall score rises to 7.8.
