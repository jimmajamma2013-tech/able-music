# Dimension G7 — localStorage Schema
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

localStorage is the current persistence layer for ABLE, and every key in the schema is a future Supabase table row. The schema is therefore load-bearing in two directions: correctness today (the app must read what it wrote) and migration fidelity tomorrow (no renames, no structural drift). This dimension audits whether every key listed in the canonical schema actually exists in the codebase under the exact documented name, whether the data written by start.html is in the correct shape to be consumed by admin.html and able-v7.html, and whether all read paths are defensive against corrupted, missing, or structurally wrong data. Full compliance means a `grep` over the codebase will find every canonical key name exactly as documented, no key is written by one page and read under a different name by another, and every read is wrapped in a try/catch with a validated fallback.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Run `grep -r "localStorage" *.html` and produce an exhaustive map of every key read and written across all pages — this map is the baseline audit | ALL | 5 | 2 | L | 1 |
| 2 | Verify `able_v3_profile` is the exact string used in every read and write — no variant spellings like `able_profile_v3` or `ableV3Profile` | ALL | 5 | 1 | H | 1 |
| 3 | Verify `able_fans` is the exact string in every read/write — not `ableFans`, `able-fans`, or `fans` | ALL | 5 | 1 | H | 1 |
| 4 | Verify `able_clicks` is the exact string in every read/write — not `able_cta_clicks` or `clicks` | ALL | 5 | 1 | H | 1 |
| 5 | Verify `able_views` is the exact string in every read/write — not `able_page_views` or `views` | ALL | 5 | 1 | H | 1 |
| 6 | Verify `able_gig_expires` is the exact string in every read/write — not `gig_expires` or `able_gig_expiry` | ALL | 5 | 1 | H | 1 |
| 7 | Verify `able_profile` (legacy wizard output key) is not actively written by any current page — it is legacy, superseded by `able_v3_profile` | ALL | 4 | 1 | M | 1 |
| 8 | If `able_profile` is read anywhere for backward compatibility, document the migration path: on read, merge into `able_v3_profile` and delete the legacy key | ALL | 4 | 2 | M | 2 |
| 9 | Verify `able_shows` is the exact string in every read/write — not `able_events` or `shows` | ALL | 5 | 1 | H | 1 |
| 10 | Verify `able_dismissed_nudges` is the exact string in every read/write | ALL | 4 | 1 | M | 1 |
| 11 | Verify `able_starred_fans` is the exact string in every read/write | ALL | 4 | 1 | M | 1 |
| 12 | Verify `able_tier` is the exact string in every read/write — not `ableTier` or `user_tier` | ALL | 5 | 1 | H | 1 |
| 13 | Verify `admin_visit_dates` is the exact string in every read/write | ALL | 3 | 1 | M | 1 |
| 14 | Produce a definitive list of ALL localStorage keys used across the codebase and compare to the canonical schema in CLAUDE.md — flag any undocumented keys | ALL | 5 | 2 | L | 1 |
| 15 | Any undocumented localStorage key found in the codebase must be either added to the canonical schema or removed | ALL | 4 | 2 | M | 1 |
| 16 | Define a `STORAGE_KEYS` constant object in `shared/storage.js` containing all canonical key strings — no raw string literals in any page | ALL | 5 | 2 | M | 1 |
| 17 | `STORAGE_KEYS` should be the single source of truth: `{ PROFILE: "able_v3_profile", FANS: "able_fans", ... }` — imported by all pages via `<script>` | ALL | 5 | 3 | M | 2 |
| 18 | All localStorage reads must use `STORAGE_KEYS.X` rather than raw string literals — prevents typo-induced key mismatches | ALL | 5 | 3 | M | 2 |
| 19 | Every `localStorage.getItem` call must be wrapped in try/catch to handle SecurityError in restricted contexts | ALL | 5 | 1 | H | 1 |
| 20 | Every `localStorage.setItem` call must be wrapped in try/catch to handle QuotaExceededError | ALL | 5 | 1 | H | 1 |
| 21 | Create a `safeGet(key, fallback)` utility that wraps getItem + JSON.parse + try/catch and returns the fallback on any failure | ALL | 5 | 2 | M | 1 |
| 22 | Create a `safeSet(key, value)` utility that wraps JSON.stringify + setItem + try/catch and returns a boolean success flag | ALL | 5 | 2 | M | 1 |
| 23 | `safeGet` should validate the parsed value against a shape definition before returning — not just parse and return blindly | ALL | 4 | 3 | M | 2 |
| 24 | Define a shape validator for `able_v3_profile`: required fields, their types, and valid value ranges | ALL | 5 | 3 | M | 2 |
| 25 | Define a shape validator for `able_fans`: must be an array of objects with `email` (string), `ts` (number), `source` (string) | ALL | 4 | 2 | M | 2 |
| 26 | Define a shape validator for `able_clicks`: array of `{label: string, type: string, ts: number, source: string}` | ALL | 4 | 2 | M | 2 |
| 27 | Define a shape validator for `able_views`: array of `{ts: number, source: string}` | ALL | 4 | 2 | M | 2 |
| 28 | Define a shape validator for `able_shows`: array of `{venue: string, date: string, doorsTime: string, ticketUrl: string, featured: boolean}` | ALL | 4 | 2 | M | 2 |
| 29 | `able_gig_expires` must be validated as a positive integer (Unix timestamp) — reject strings, objects, null | ALL | 4 | 1 | M | 1 |
| 30 | `able_tier` must be validated against the enum `["free","artist","artist-pro","label"]` — reject any other value | ALL | 5 | 1 | H | 1 |
| 31 | `admin_visit_dates` must be validated as an array of ISO date strings — corrupt entries removed, not passed through | ALL | 3 | 2 | M | 2 |
| 32 | `able_dismissed_nudges` must be validated as an array of strings — corrupt entries removed | ALL | 3 | 1 | L | 2 |
| 33 | `able_starred_fans` must be validated as an array of email strings — corrupt entries removed | ALL | 3 | 1 | L | 2 |
| 34 | Verify that start.html wizard writes `able_v3_profile` with the correct shape that admin.html expects — test the round-trip | STR | 5 | 2 | H | 1 |
| 35 | Verify that `able_v3_profile.name` written by start.html is the same field read as the artist name in admin.html and V8 | STR | 5 | 1 | H | 1 |
| 36 | Verify that `able_v3_profile.bio` written by start.html is the same field rendered as the bio in V8 | STR | 5 | 1 | H | 1 |
| 37 | Verify that `able_v3_profile.accent` written by start.html is the same field applied as `--color-accent` in V8 | STR | 5 | 1 | H | 1 |
| 38 | Verify that `able_v3_profile.theme` written by start.html is the same field used to apply the dark/light/glass/contrast class in V8 | STR | 4 | 1 | M | 1 |
| 39 | Verify that `able_v3_profile.releaseDate` written by start.html (if set) is in ISO format that V8 state logic can parse with `new Date()` | STR | 5 | 2 | H | 1 |
| 40 | Verify that `able_v3_profile.stateOverride` is not written by start.html — it should only be set by admin.html | STR | 4 | 1 | M | 1 |
| 41 | If start.html accidentally writes `stateOverride`, admin.html should clear it on first load rather than inherit an unknown state | ADM | 4 | 2 | M | 2 |
| 42 | Verify that admin.html reads `able_v3_profile` and `able_shows` as two separate keys — not combined into a single object | ADM | 4 | 1 | M | 1 |
| 43 | Verify that V8 reads `able_shows` for the events section and not a nested shows array inside `able_v3_profile` | V8 | 4 | 1 | M | 1 |
| 44 | Verify that `able_fans` is written as an array, not as a JSON-stringified array inside a stringified object | ALL | 5 | 1 | H | 1 |
| 45 | Verify that `able_clicks` is written as an array and each entry is pushed, not overwritten | ALL | 5 | 1 | H | 1 |
| 46 | Verify that `able_views` is written as an array and each entry is pushed, not overwritten | ALL | 5 | 1 | H | 1 |
| 47 | Verify that `able_fans` does not accumulate duplicate entries for the same email address | ALL | 4 | 2 | M | 2 |
| 48 | Dedupe logic for `able_fans`: before push, check if an entry with the same email already exists — if so, skip (not update) | V8 | 4 | 2 | M | 2 |
| 49 | Verify that `admin_visit_dates` is capped at the last 60 entries as documented — it must not grow unbounded | ADM | 3 | 2 | L | 2 |
| 50 | When admin.html loads, append today's ISO date to `admin_visit_dates` and trim to last 60 in a single atomic operation | ADM | 3 | 2 | L | 2 |
| 51 | `admin_visit_dates` should only push one entry per calendar day — check for today's date before appending | ADM | 3 | 2 | L | 2 |
| 52 | Verify that `able_dismissed_nudges` entries are nudge ID strings (e.g. "presave-cta") and not random values | ADM | 3 | 1 | L | 2 |
| 53 | Document all valid nudge IDs: `["presave-cta","add-show","add-bio","connect-spotify",...]` — any undocumented ID found in code must be added | ADM | 3 | 2 | L | 2 |
| 54 | Verify that dismissing a nudge writes to `able_dismissed_nudges` (array push) and not to a boolean flag inside `able_v3_profile` | ADM | 4 | 1 | M | 1 |
| 55 | Verify `able_starred_fans` contains email strings, not full fan objects — keeping references lean | ADM | 3 | 1 | L | 1 |
| 56 | If a starred fan's email is not found in `able_fans`, the star should be silently dropped from the UI — no orphan stars | ADM | 3 | 2 | L | 3 |
| 57 | Document the maximum expected size of each localStorage key in bytes — `able_fans` with 2000 entries is the largest | ALL | 3 | 2 | L | 2 |
| 58 | Verify that `able_fans` with 2000 entries stays within localStorage quota (typically 5MB per origin) — estimate JSON size | ALL | 4 | 2 | M | 2 |
| 59 | If `able_fans.length` would exceed the tier cap on write, reject the write and return an error — do not silently truncate | V8 | 4 | 2 | M | 2 |
| 60 | Verify that `able_clicks` and `able_views` arrays do not grow indefinitely — document a maximum size or rolling window policy | ALL | 3 | 2 | M | 2 |
| 61 | Implement a rolling window cap on `able_clicks` and `able_views`: keep the last 1000 entries maximum | ALL | 3 | 3 | M | 3 |
| 62 | Schema migration strategy: when a new field is added to `able_v3_profile`, existing profiles that lack the field must not crash | ALL | 5 | 2 | H | 2 |
| 63 | Use optional chaining (`profile?.fieldName`) and nullish coalescing (`?? defaultValue`) throughout all profile reads | ALL | 5 | 2 | M | 1 |
| 64 | Add a schema version field to `able_v3_profile`: `{ schemaVersion: 1, ... }` — enables future migrations | ALL | 4 | 2 | L | 3 |
| 65 | When reading `able_v3_profile` with a missing or lower `schemaVersion`, run a `migrateProfile(profile)` function before use | ALL | 4 | 3 | M | 3 |
| 66 | `migrateProfile` should be a pure function that takes an old shape and returns the current shape — side-effect free | ALL | 4 | 2 | L | 3 |
| 67 | After migration, write the upgraded profile back to localStorage so future reads are immediate | ALL | 4 | 2 | M | 3 |
| 68 | Log (debug mode only) when a migration runs: "Migrated able_v3_profile from v1 to v2" | ALL | 2 | 1 | L | 4 |
| 69 | Verify that the `able_profile` legacy key migration (merge into `able_v3_profile` then delete) is idempotent — running it twice does not corrupt data | ALL | 4 | 2 | M | 3 |
| 70 | Verify `able_shows` entries have all documented fields: `venue`, `date`, `doorsTime`, `ticketUrl`, `featured` — add defaults for missing fields on read | ALL | 4 | 2 | M | 2 |
| 71 | `able_shows` date field must be a string in a parseable format — validate on read and remove corrupt entries | ALL | 4 | 2 | M | 2 |
| 72 | `able_shows` `featured` field must be a boolean — coerce if stored as string "true"/"false" | ALL | 3 | 1 | L | 2 |
| 73 | Verify that V8 reads `able_shows` sorted by date ascending — events should appear in chronological order | V8 | 3 | 1 | L | 2 |
| 74 | Verify that admin.html reads `able_shows` in the same sorted order for the events management UI | ADM | 3 | 1 | L | 2 |
| 75 | Verify that localStorage reads in V8 happen after DOMContentLoaded — no race conditions with script execution order | V8 | 4 | 1 | M | 1 |
| 76 | Verify that localStorage reads in admin.html happen after DOMContentLoaded — consistent with V8 | ADM | 4 | 1 | M | 1 |
| 77 | Verify that start.html writes `able_v3_profile` before navigating to admin.html — data must be available when admin.html loads | STR | 5 | 1 | H | 1 |
| 78 | If start.html navigation happens before localStorage write completes (async edge case), admin.html must handle an absent profile gracefully | ADM | 4 | 2 | M | 2 |
| 79 | Verify that the schema documentation in CLAUDE.md exactly matches the keys and value shapes found in the codebase — no drift | ALL | 4 | 2 | L | 1 |
| 80 | Document the `able_artist_claimed` flag used for first-visit detection on V8 — add it to the canonical schema | V8 | 4 | 1 | M | 1 |
| 81 | Verify `able_artist_claimed` is a boolean (or `"true"`/`"false"` string if localStorage-coerced) — parse explicitly | V8 | 3 | 1 | L | 1 |
| 82 | When Supabase backend is added, the migration script should read each localStorage key and POST to the matching table — document this mapping | ALL | 4 | 2 | L | 3 |
| 83 | `able_fans` maps to Supabase `fans` table — document the column mapping: `email → email`, `ts → created_at`, `source → source` | ALL | 4 | 1 | L | 3 |
| 84 | `able_clicks` maps to Supabase `clicks` table — document the column mapping | ALL | 4 | 1 | L | 3 |
| 85 | `able_views` maps to Supabase `views` table — document the column mapping | ALL | 4 | 1 | L | 3 |
| 86 | `able_v3_profile` maps to Supabase `profiles` table — document the column mapping for every field | ALL | 4 | 2 | L | 3 |
| 87 | `able_shows` maps to Supabase `events` table — document the column mapping | ALL | 4 | 1 | L | 3 |
| 88 | Verify that no localStorage key contains personally identifiable information beyond what is necessary — fan emails in `able_fans` is expected; nothing else | ALL | 5 | 2 | H | 1 |
| 89 | Add a privacy note in `docs/systems/data-architecture/SPEC.md`: localStorage stores fan emails; this data must be treated as PII and purged on account deletion | ALL | 4 | 1 | L | 1 |
| 90 | Verify that `able_fans` does not store fan names, phone numbers, or any data beyond email, timestamp, and source | ALL | 4 | 1 | M | 1 |
| 91 | Create a `clearAllAbleData()` utility (for account deletion / reset) that removes all `able_*` and `admin_*` keys | ALL | 3 | 2 | M | 3 |
| 92 | `clearAllAbleData()` should list all keys explicitly, not use `localStorage.clear()` which would delete all domain data | ALL | 4 | 1 | M | 3 |
| 93 | Verify that clearing data and reloading V8 renders the graceful "profile not set up" state, not a crash | V8 | 4 | 2 | M | 2 |
| 94 | Verify that clearing data and reloading admin.html redirects to start.html or shows a setup prompt | ADM | 4 | 2 | M | 2 |
| 95 | Add a `localStorage.key()` enumeration check on admin load: log any keys starting with `able_` or `admin_` that are not in the canonical schema | ADM | 3 | 2 | L | 3 |
| 96 | Document the localStorage size budget: total ABLE data should stay under 2MB to leave headroom on the 5MB origin limit | ALL | 3 | 1 | L | 2 |
| 97 | Playwright test: complete start.html wizard, then load admin.html, verify profile name, bio, and accent are all rendered correctly | STR | 5 | 3 | M | 2 |
| 98 | Playwright test: write a valid `able_fans` array with 5 entries directly to localStorage, load admin.html, verify fan count shows 5 | ADM | 4 | 3 | M | 2 |
| 99 | Playwright test: write a corrupt (non-JSON) value to `able_v3_profile`, load V8, verify it renders gracefully without crashing | V8 | 5 | 3 | H | 2 |
| 100 | Write `docs/systems/data-architecture/STORAGE-AUDIT.md` with the grep-verified key inventory, shape definitions, and round-trip test results as a living document | ALL | 3 | 3 | L | 3 |
