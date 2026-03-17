# Dimension H10 — Data Migration Readiness
**Category:** Security, Data & Performance
**Phase:** 8

Every localStorage key must map 1:1 to a Supabase table column so that the migration is a flush-to-API call, not a data transformation. The schema is documented in `CLAUDE.md` and `docs/systems/data-architecture/SPEC.md`. This dimension audits the mapping field by field, identifies any divergence, and plans the migration function that will run once an artist authenticates for the first time with Supabase. The app must work with both localStorage and Supabase data simultaneously during the transition period.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm the canonical localStorage key list in `CLAUDE.md` and `docs/systems/data-architecture/SPEC.md` are in sync — currently: `able_v3_profile`, `able_fans`, `able_clicks`, `able_views`, `able_gig_expires`, `able_profile`, `able_shows`, `able_dismissed_nudges`, `able_starred_fans`, `able_tier`, `admin_visit_dates` | docs/ | 4 | 1 | M | 1 |
| 2 | Audit `able-v8.html` for any localStorage key that is used but not in the canonical list | able-v8.html | 5 | 2 | H | 1 |
| 3 | Audit `admin.html` for any localStorage key that is used but not in the canonical list | admin.html | 5 | 2 | H | 1 |
| 4 | Audit `start.html` for any localStorage key that is used but not in the canonical list | start.html | 4 | 2 | M | 1 |
| 5 | Audit `fan.html` for any localStorage key that is used but not in the canonical list | fan.html | 4 | 2 | M | 1 |
| 6 | Confirm the `able_v3_profile` → `profiles` table mapping: `name` → `profiles.name` | docs/ | 4 | 1 | M | 1 |
| 7 | Confirm the `able_v3_profile.bio` → `profiles.bio` column mapping | docs/ | 4 | 1 | M | 1 |
| 8 | Confirm the `able_v3_profile.accentHex` → `profiles.accent_hex` column mapping (snake_case convention in SQL) | docs/ | 4 | 1 | M | 1 |
| 9 | Confirm the `able_v3_profile.theme` → `profiles.theme` column mapping — value is one of `dark|light|glass|contrast` | docs/ | 4 | 1 | M | 1 |
| 10 | Confirm the `able_v3_profile.stateOverride` → `profiles.state_override` column mapping — camelCase to snake_case | docs/ | 4 | 1 | M | 1 |
| 11 | Confirm the `able_v3_profile.releaseDate` → `profiles.release_date` column as `timestamptz` | docs/ | 4 | 1 | M | 1 |
| 12 | Confirm the `able_v3_profile.releaseTitle` → `profiles.release_title` column | docs/ | 4 | 1 | M | 1 |
| 13 | Confirm the `able_v3_profile.ctaPrimary` (object: `{label, url, type}`) → `profiles.cta_primary` as `jsonb` column | docs/ | 4 | 1 | M | 1 |
| 14 | Confirm the `able_v3_profile.ctaSecondary` → `profiles.cta_secondary` as `jsonb` | docs/ | 4 | 1 | M | 1 |
| 15 | Confirm the `able_v3_profile.platforms` (array of `{id, url, label}`) → `profiles.platforms` as `jsonb[]` | docs/ | 4 | 1 | M | 1 |
| 16 | Identify any `able_v3_profile` fields that are not yet in the canonical docs — any field used in the current HTML that has no documented column mapping | all pages | 5 | 2 | H | 1 |
| 17 | Confirm the `able_v3_profile.vibe` → `profiles.vibe` column — one of the seven genre vibes | docs/ | 3 | 1 | M | 1 |
| 18 | Confirm the `able_v3_profile.slug` → `profiles.slug` column — unique, URL-safe artist handle | docs/ | 5 | 1 | H | 1 |
| 19 | Confirm the `able_v3_profile.photoUrl` (or equivalent artist avatar field) → `profiles.photo_url` column | docs/ | 4 | 1 | M | 1 |
| 20 | Confirm the `able_v3_profile.vibe` → `profiles.vibe` — map all seven vibes to an enum type in Postgres | docs/ | 3 | 1 | M | 2 |
| 21 | Confirm the `able_fans` array `[{email, ts, source}]` → `fans` table rows: `fan_email VARCHAR(254)`, `created_at TIMESTAMPTZ`, `source VARCHAR(100)` | docs/ | 5 | 1 | H | 1 |
| 22 | Confirm the `fans` table has a `profile_id UUID` foreign key linking each fan to an artist's profile | docs/ | 5 | 1 | H | 1 |
| 23 | Confirm the `fans` table has a unique constraint on `(profile_id, fan_email)` — prevents duplicate fan entries per artist | Supabase dashboard | 5 | 1 | H | 1 |
| 24 | Plan the fan migration: during the migration flush, insert each `able_fans` entry into the `fans` table with `ON CONFLICT (profile_id, fan_email) DO NOTHING` | docs/ | 5 | 2 | H | 1 |
| 25 | Confirm the `able_fans[n].ts` field — is it a Unix timestamp (milliseconds) or an ISO string? Document and ensure the Postgres `TIMESTAMPTZ` column accepts the format | all pages | 4 | 1 | M | 1 |
| 26 | Confirm the `able_clicks` array `[{label, type, ts, source}]` → `clicks` table rows: `label`, `type`, `created_at`, `source`, `profile_id` | docs/ | 4 | 1 | M | 1 |
| 27 | Confirm the `clicks` table has `label VARCHAR(100)`, `type VARCHAR(50)`, `source VARCHAR(100)` columns | docs/ | 4 | 1 | M | 1 |
| 28 | Plan the clicks migration: batch insert all `able_clicks` entries into the `clicks` table; order by timestamp | docs/ | 4 | 2 | M | 2 |
| 29 | Confirm the `able_views` array `[{ts, source}]` → `views` table rows: `created_at TIMESTAMPTZ`, `source VARCHAR(100)`, `profile_id UUID` | docs/ | 4 | 1 | M | 1 |
| 30 | Plan the views migration: batch insert all `able_views` entries; this may be a large batch for an active artist | docs/ | 4 | 2 | M | 2 |
| 31 | Confirm the `able_shows` array `[{venue, date, doorsTime, ticketUrl, featured}]` → `shows` table: `venue VARCHAR(200)`, `show_date DATE`, `doors_time TIME`, `ticket_url TEXT`, `is_featured BOOLEAN`, `profile_id UUID` | docs/ | 4 | 1 | M | 1 |
| 32 | Confirm the `able_shows[n].date` format — is it ISO date string `YYYY-MM-DD`? Ensure the Postgres `DATE` column accepts it | all pages | 4 | 1 | M | 1 |
| 33 | Confirm the `able_shows[n].doorsTime` format — is it `HH:MM`? Map to Postgres `TIME` column | all pages | 3 | 1 | M | 1 |
| 34 | Confirm the `able_tier` string (`free|artist|artist-pro|label`) → `profiles.tier` column as a Postgres `ENUM` type or `VARCHAR(20)` | docs/ | 5 | 1 | H | 1 |
| 35 | Note: `able_tier` must be server-authoritative after migration — the `profiles.tier` column must only be updatable by the service role (via Stripe webhook) | Supabase dashboard | 5 | 1 | H | 1 |
| 36 | Confirm the `able_starred_fans` array `['email@...',...]` → `fans.is_starred BOOLEAN DEFAULT false` column | docs/ | 4 | 1 | M | 1 |
| 37 | Plan the starred fans migration: after migrating `able_fans`, update `fans.is_starred = true` where `fan_email` is in `able_starred_fans` | docs/ | 4 | 2 | M | 2 |
| 38 | Confirm the `able_dismissed_nudges` array of nudge ID strings → `user_preferences` table or `profiles.dismissed_nudges JSONB` | docs/ | 3 | 1 | M | 2 |
| 39 | Decide whether `dismissed_nudges` belongs in `profiles` as a JSONB column or in a separate `user_preferences` table — a JSONB column on `profiles` is simpler | docs/ | 3 | 1 | M | 2 |
| 40 | Confirm the `admin_visit_dates` array of ISO date strings → `user_sessions` table or `profiles.admin_visit_dates JSONB` | docs/ | 2 | 1 | L | 3 |
| 41 | Consider whether `admin_visit_dates` needs to be migrated at all — this data is used for nudge timing and may not need to be preserved after migration | docs/ | 2 | 1 | L | 3 |
| 42 | Confirm the `able_gig_expires` Unix timestamp → `profiles.gig_expires_at TIMESTAMPTZ` | docs/ | 4 | 1 | M | 1 |
| 43 | Plan the gig_expires_at migration: convert the stored Unix milliseconds to a Postgres TIMESTAMPTZ: `new Date(able_gig_expires).toISOString()` | docs/ | 3 | 1 | M | 2 |
| 44 | Address the `able_profile` legacy key — it is described as the wizard output and should be merged into `able_v3_profile`; determine if it still exists in current `start.html` | start.html | 4 | 2 | M | 1 |
| 45 | If `able_profile` still exists alongside `able_v3_profile`, add a migration step that merges them before the Supabase flush | admin.html | 4 | 2 | M | 2 |
| 46 | Design the migration function: `migrateLocalStorageToSupabase(userId)` — called once after the artist first authenticates | admin.html | 5 | 4 | H | 2 |
| 47 | The migration function must: read all localStorage keys, validate each value, batch-insert to Supabase tables, then set a `able_migrated = true` flag in localStorage | admin.html | 5 | 4 | H | 2 |
| 48 | After successful migration, the app must read from Supabase as the primary source and use localStorage only as a fallback during network outages | admin.html | 5 | 3 | H | 2 |
| 49 | Design the dual-source read strategy: `getProfile()` → try Supabase first, fall back to localStorage if network fails | admin.html | 5 | 3 | H | 2 |
| 50 | Design the dual-source write strategy: `saveProfile()` → write to both localStorage and Supabase simultaneously; accept Supabase failure gracefully | admin.html | 5 | 3 | H | 2 |
| 51 | Confirm the Supabase `profiles` table schema includes all fields needed for the fan-facing `able-v8.html` render | Supabase dashboard | 5 | 2 | H | 1 |
| 52 | Define the Postgres column types for the `profiles` table: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `user_id UUID REFERENCES auth.users(id)`, `slug TEXT UNIQUE NOT NULL`, etc. | docs/ | 5 | 3 | H | 1 |
| 53 | Verify the `profiles` table has `created_at TIMESTAMPTZ DEFAULT NOW()` and `updated_at TIMESTAMPTZ DEFAULT NOW()` | Supabase dashboard | 4 | 1 | M | 1 |
| 54 | Add a Postgres trigger to auto-update `profiles.updated_at` on every row update | Supabase dashboard | 4 | 2 | M | 2 |
| 55 | Verify the `fans` table schema: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `profile_id UUID REFERENCES profiles(id)`, `fan_email VARCHAR(254) NOT NULL`, `created_at TIMESTAMPTZ`, `source VARCHAR(100)`, `is_starred BOOLEAN DEFAULT false` | docs/ | 5 | 2 | H | 1 |
| 56 | Verify the `clicks` table schema: `id UUID PRIMARY KEY`, `profile_id UUID REFERENCES profiles(id)`, `label VARCHAR(100)`, `type VARCHAR(50)`, `source VARCHAR(100)`, `created_at TIMESTAMPTZ` | docs/ | 4 | 2 | M | 1 |
| 57 | Verify the `views` table schema: `id UUID PRIMARY KEY`, `profile_id UUID REFERENCES profiles(id)`, `source VARCHAR(100)`, `created_at TIMESTAMPTZ` | docs/ | 4 | 2 | M | 1 |
| 58 | Verify the `shows` table schema: `id UUID PRIMARY KEY`, `profile_id UUID REFERENCES profiles(id)`, `venue VARCHAR(200)`, `show_date DATE`, `doors_time TIME`, `ticket_url TEXT`, `is_featured BOOLEAN DEFAULT false`, `created_at TIMESTAMPTZ` | docs/ | 4 | 2 | M | 1 |
| 59 | Verify the `snap_cards` table schema: `id UUID PRIMARY KEY`, `profile_id UUID REFERENCES profiles(id)`, `title TEXT`, `body TEXT`, `media_url TEXT`, `display_order INTEGER`, `created_at TIMESTAMPTZ` | docs/ | 4 | 2 | M | 2 |
| 60 | Confirm snap cards are currently stored in `able_v3_profile.snapCards` (as an array) — they will need to be split into individual `snap_cards` table rows during migration | docs/ | 4 | 2 | M | 2 |
| 61 | Confirm CTA data is stored in `able_v3_profile.ctaPrimary` and `able_v3_profile.ctaSecondary` — these map to `profiles.cta_primary JSONB` and `profiles.cta_secondary JSONB` | docs/ | 4 | 1 | M | 1 |
| 62 | Confirm Quick Action pills (platform CTAs) are stored in `able_v3_profile.platforms` — these map to `profiles.platforms JSONB` | docs/ | 4 | 1 | M | 1 |
| 63 | Confirm the `credits` table schema (for freelancer layer): `id UUID PRIMARY KEY`, `artist_profile_id UUID`, `freelancer_profile_id UUID`, `role TEXT`, `release_title TEXT`, `confirmed BOOLEAN DEFAULT false` | docs/ | 4 | 2 | M | 2 |
| 64 | Verify that the `releases` table is planned — for the artist's discography: `id UUID PRIMARY KEY`, `profile_id UUID`, `title TEXT`, `type TEXT`, `release_date DATE`, `artwork_url TEXT`, `spotify_url TEXT` | docs/ | 4 | 2 | M | 2 |
| 65 | Plan the `releases` migration: the `able_v3_profile` may contain a `releases` array from the Spotify import; split into individual `releases` table rows | docs/ | 4 | 2 | M | 2 |
| 66 | Plan the `merch` table schema: `id UUID PRIMARY KEY`, `profile_id UUID`, `name TEXT`, `price DECIMAL(8,2)`, `description TEXT`, `image_url TEXT`, `buy_url TEXT`, `display_order INTEGER` | docs/ | 3 | 2 | M | 3 |
| 67 | Verify that all localStorage data is serialised to JSON correctly — `Date` objects must be stored as ISO strings (not `Date.toJSON()` — same thing, but confirm) | all pages | 4 | 1 | M | 1 |
| 68 | Write the schema DDL for all tables in `docs/systems/data-architecture/SPEC.md` — the SQL `CREATE TABLE` statements | docs/ | 5 | 3 | M | 2 |
| 69 | Verify the DDL is tested in the Supabase SQL editor — run the `CREATE TABLE` statements and verify they succeed without errors | Supabase dashboard | 5 | 2 | H | 2 |
| 70 | Write the RLS `CREATE POLICY` statements for each table in the DDL doc | docs/ | 5 | 3 | H | 2 |
| 71 | Create the Supabase tables using the DDL — do not create them manually through the UI; use SQL for reproducibility | Supabase dashboard | 5 | 2 | H | 2 |
| 72 | Verify that the Supabase JS client is imported in all active pages that will interact with the database | all pages | 4 | 1 | M | 1 |
| 73 | Confirm the Supabase CDN URL: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` — this must be consistent across all pages | all pages | 4 | 1 | M | 1 |
| 74 | Test the Supabase connection from `able-v8.html` using the anon key — a simple `supabase.from('profiles').select('slug').limit(1)` should return data | able-v8.html | 5 | 1 | H | 2 |
| 75 | Test the Supabase fan insert from `able-v8.html` — insert a test fan and verify it appears in the `fans` table | able-v8.html | 5 | 2 | H | 2 |
| 76 | Test the Supabase profile read from `able-v8.html` — read a profile by slug and verify all fields are returned correctly | able-v8.html | 5 | 2 | H | 2 |
| 77 | Test the Supabase profile update from `admin.html` — update a profile field and verify it persists | admin.html | 5 | 2 | H | 2 |
| 78 | Design the backwards compatibility layer: if `able_migrated` flag is not set, read from localStorage; if it is set, read from Supabase | admin.html | 5 | 3 | H | 2 |
| 79 | Implement the backwards compatibility layer as a `dataLayer` module with `getProfile()`, `saveProfile()`, `getFans()`, `addFan()` methods | admin.html | 5 | 5 | H | 3 |
| 80 | Write the data layer in `shared/able.js` to avoid duplication across pages | shared/ | 5 | 4 | H | 3 |
| 81 | Test the backwards compatibility: load `admin.html` without Supabase auth (localStorage mode) — all features must work | admin.html | 5 | 2 | H | 2 |
| 82 | Test the backwards compatibility: load `admin.html` after Supabase auth (Supabase mode) — all features must work | admin.html | 5 | 2 | H | 2 |
| 83 | Test the migration: run `migrateLocalStorageToSupabase()` with a full localStorage state and verify all data appears correctly in Supabase tables | admin.html | 5 | 3 | H | 2 |
| 84 | Test the migration idempotency: run `migrateLocalStorageToSupabase()` twice and verify no duplicate rows are created (relies on `ON CONFLICT DO NOTHING`) | admin.html | 5 | 2 | H | 2 |
| 85 | Verify that the migration correctly handles the camelCase-to-snake_case transformation for all field names | docs/ | 4 | 2 | M | 2 |
| 86 | Confirm the `profiles.slug` uniqueness constraint — two artists cannot have the same slug; handle the error gracefully in `start.html` when a slug is already taken | start.html | 5 | 2 | H | 1 |
| 87 | Add a slug availability check in `start.html` — before the wizard completes, call Supabase to verify the chosen slug is available | start.html | 5 | 3 | H | 2 |
| 88 | Plan the slug suggestion algorithm for conflicts — if `jamesmith` is taken, suggest `jamesmith2` or `jamesmith_music` | start.html | 3 | 2 | M | 3 |
| 89 | Verify the `fan.html` `?artist=` slug parameter is used to look up the correct profile row by `profiles.slug` — post-migration | fan.html | 5 | 2 | H | 2 |
| 90 | Confirm that the Netlify `/:slug → able-v8.html` redirect in `netlify.toml` is compatible with the Supabase slug lookup | netlify.toml | 5 | 1 | M | 1 |
| 91 | Verify that the fan sign-up flow correctly links the fan to the correct artist profile when running in Supabase mode — the `profile_id` must be resolved from the slug before insertion | able-v8.html | 5 | 3 | H | 2 |
| 92 | Plan the fan sign-up Supabase flow: 1) resolve `profile_id` from slug, 2) check for duplicate fan email, 3) insert fan row, 4) call `fan-confirmation.js` | able-v8.html | 5 | 3 | H | 2 |
| 93 | Confirm the `able_dismissed_nudges` migration is optional — dismissed nudge state is not critical; if migration fails, nudges will re-show, which is acceptable | docs/ | 2 | 1 | L | 3 |
| 94 | Confirm the `admin_visit_dates` migration is optional — nudge timing is not critical | docs/ | 2 | 1 | L | 3 |
| 95 | Document the migration rollback plan — if the migration fails halfway, the artist must not lose access to their profile; localStorage remains the source of truth until migration is confirmed complete | docs/ | 4 | 2 | M | 2 |
| 96 | Add a `migrateLocalStorageToSupabase()` test in the QA smoke test checklist | docs/ | 4 | 2 | M | 2 |
| 97 | Write the full migration spec in `docs/systems/data-architecture/SPEC.md` — the migration function, the dual-source read strategy, the backwards compatibility layer, and the rollback plan | docs/ | 5 | 3 | M | 2 |
| 98 | Verify the Supabase project is not on the free plan (which pauses after inactivity) before running the migration with real artist data | Supabase dashboard | 4 | 1 | M | 1 |
| 99 | Set up a Supabase backup schedule — daily backups before migration and after | Supabase dashboard | 5 | 2 | H | 2 |
| 100 | Mark this dimension complete in `docs/STATUS.md` once the full schema DDL is written, the migration function is implemented and tested, and backwards compatibility is verified | docs/STATUS.md | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — canonical key audit, field-by-field mapping, slug uniqueness, tier authority, table schema definition | 1–35, 40, 42–45, 51–58, 60–67, 72–73, 86, 90, 98 |
| 2 | Implementation — DDL, RLS policies, migration function, backwards compatibility, Supabase integration tests | 36–39, 46–50, 59, 63–65, 69–71, 74–85, 87, 89, 91–92, 95–97, 99 |
| 3 | Nice-to-have — data layer abstraction, merch table, slug suggestion | 66, 79–80, 88, 93–94 |
| 4 | Documentation and sign-off | 100 |
