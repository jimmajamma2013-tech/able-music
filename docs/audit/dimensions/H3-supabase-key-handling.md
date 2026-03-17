# Dimension H3 — Supabase Key Handling
**Category:** Security, Data & Performance
**Phase:** 8

Only the anon/public key (`sb_publishable_*`) should ever appear in frontend HTML or client-side JavaScript. Personal Access Tokens (`sbp_*`) and service-role keys must never appear in any file that reaches the browser. The anon key is safe to be public — it is constrained by Row Level Security (RLS) policies, which are the real protection layer. This dimension verifies current key placement and ensures the architecture is correct before real user data is stored.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Grep all active HTML files for `sbp_` prefix — this is the Supabase Personal Access Token prefix and must never appear in frontend code | all pages | 5 | 1 | H | 1 |
| 2 | Grep all Netlify function files for `sbp_` prefix — PATs must not appear in serverless functions either (use service key for elevated operations) | netlify/functions/ | 5 | 1 | H | 1 |
| 3 | Grep all JS files in `shared/` for `sbp_` prefix | shared/ | 5 | 1 | H | 1 |
| 4 | Grep `netlify.toml` and any `*.env*` files for `sbp_` prefix | project root | 5 | 1 | H | 1 |
| 5 | Confirm the anon key `sb_publishable_pRmYph3-GYIeZEeKyY1_sg_5sOPkQp_` appears only in `able-v8.html`, `admin.html`, `start.html`, and `fan.html` — not in any Netlify function | all files | 4 | 2 | H | 1 |
| 6 | Verify the anon key does NOT appear in `landing.html` — the landing page does not use Supabase and should not load the SDK | landing.html | 4 | 1 | M | 1 |
| 7 | Verify the anon key does NOT appear in any file in `_archive/` — archived files should not have live credentials | _archive/ | 3 | 1 | M | 1 |
| 8 | Verify the anon key does NOT appear in any markdown documentation file — credentials must never be in docs | docs/ | 3 | 1 | M | 1 |
| 9 | Check `CONTEXT.md` — it currently contains the Supabase anon key and project URL as reference; assess whether this is acceptable given the file is checked into git | CONTEXT.md | 3 | 1 | M | 2 |
| 10 | Check `MEMORY.md` — it contains the anon key and project URL; this file is outside the repo but should still be reviewed | /Users/jamescuthbert/.claude/projects/.../MEMORY.md | 3 | 1 | M | 2 |
| 11 | Confirm the Supabase project URL `https://jgspraqrnjrerzhnnhtb.supabase.co` appears only in appropriate files — it is not a secret but should not be in files that will become public documentation | all files | 3 | 1 | L | 2 |
| 12 | Verify the anon key in `able-v8.html` is initialised as `const SUPABASE_ANON_KEY = '...'` and not inline in the `createClient()` call — a named constant is easier to audit | able-v8.html | 3 | 1 | L | 2 |
| 13 | Verify the same named-constant pattern is used in `admin.html` | admin.html | 3 | 1 | L | 2 |
| 14 | Verify the same named-constant pattern is used in `start.html` | start.html | 3 | 1 | L | 2 |
| 15 | Verify the same named-constant pattern is used in `fan.html` | fan.html | 3 | 1 | L | 2 |
| 16 | Confirm the anon key value in all four active pages matches — they must all use the same project | all pages | 4 | 1 | M | 1 |
| 17 | Confirm the Supabase project URL in all four active pages matches — should all point to `jgspraqrnjrerzhnnhtb.supabase.co` | all pages | 4 | 1 | M | 1 |
| 18 | Assess whether the no-build architecture justifies inline key placement — for a vanilla HTML project with no bundler, a separate JS config file (`config.js`) loaded with `<script>` is an acceptable alternative | all pages | 3 | 2 | L | 3 |
| 19 | If a separate `config.js` approach is adopted, ensure it is also committed to git (the anon key is public-safe) and documented in `CLAUDE.md` | all pages | 3 | 2 | L | 3 |
| 20 | Confirm that no Netlify function uses the anon key — Netlify functions that perform elevated database operations must use the service role key via environment variable | netlify/functions/ | 5 | 1 | H | 1 |
| 21 | Confirm the service role key (if one exists) is stored only as a Netlify environment variable — never in any file in the repo | netlify/functions/ | 5 | 1 | H | 1 |
| 22 | Verify the Netlify environment variables panel (not accessible via code) contains `SUPABASE_SERVICE_ROLE_KEY` if any function requires elevated operations | netlify/functions/ | 5 | 1 | H | 1 |
| 23 | Confirm `fan-confirmation.js` does not use any Supabase key — it only uses `RESEND_API_KEY` and does not touch the database | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 24 | Confirm `spotify-import.js` does not use any Supabase key — it only uses Spotify credentials | netlify/functions/spotify-import.js | 4 | 1 | M | 1 |
| 25 | Confirm `oembed-proxy.js` does not use any Supabase key — it makes no database calls | netlify/functions/oembed-proxy.js | 4 | 1 | M | 1 |
| 26 | Confirm `ai-copy.js` does not use any Supabase key | netlify/functions/ai-copy.js | 4 | 1 | M | 1 |
| 27 | Confirm `linktree-import.js` does not use any Supabase key | netlify/functions/linktree-import.js | 4 | 1 | M | 1 |
| 28 | Confirm `ticketmaster-import.js` does not use any Supabase key | netlify/functions/ticketmaster-import.js | 4 | 1 | M | 1 |
| 29 | Confirm `artist-welcome.js` does not use any Supabase key | netlify/functions/artist-welcome.js | 4 | 1 | M | 1 |
| 30 | Confirm the `RESEND_API_KEY` environment variable is not referenced in any frontend HTML file — it is a server-side secret | all pages | 5 | 1 | H | 1 |
| 31 | Confirm `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are not in any frontend file | all pages | 5 | 1 | H | 1 |
| 32 | Confirm `LASTFM_API_KEY` is not in any frontend file | all pages | 5 | 1 | H | 1 |
| 33 | Confirm `TICKETMASTER_API_KEY` is not in any frontend file | all pages | 5 | 1 | H | 1 |
| 34 | Confirm `OPENAI_API_KEY` (or equivalent for `ai-copy.js`) is not in any frontend file | all pages | 5 | 1 | H | 1 |
| 35 | Review the `.env.example` file — it is shown as untracked in git status; verify it contains only placeholder values and no real keys | .env.example | 4 | 1 | H | 1 |
| 36 | Verify `.env.example` is committed (good, as a template) but `.env` (with real values) is in `.gitignore` | project root | 5 | 1 | H | 1 |
| 37 | Confirm `.gitignore` exists and includes `.env` and `*.env` patterns | project root | 5 | 1 | H | 1 |
| 38 | Run `git log --all -S 'sbp_'` to check if any PAT has ever been committed in the repo history — if yes, it must be revoked immediately and the history cleaned | project root | 5 | 2 | H | 1 |
| 39 | Run `git log --all -S 'RESEND_API_KEY'` to check if the Resend API key has ever been committed | project root | 5 | 2 | H | 1 |
| 40 | Run `git log --all -S 'SPOTIFY_CLIENT_SECRET'` to check if Spotify credentials have ever been committed | project root | 5 | 2 | H | 1 |
| 41 | If any secret has ever been committed, rotate it immediately before continuing — this is a hard blocker before first real user | project root | 5 | 1 | H | 1 |
| 42 | Understand the security model: the anon key is constrained by Supabase RLS policies — document the RLS policies that protect each table | Supabase dashboard | 5 | 3 | H | 1 |
| 43 | Verify RLS is enabled on the `profiles` table in Supabase | Supabase dashboard | 5 | 2 | H | 1 |
| 44 | Verify RLS is enabled on the `fans` table — a fan from one artist must not be able to read fans of another artist | Supabase dashboard | 5 | 2 | H | 1 |
| 45 | Verify RLS is enabled on the `clicks` table | Supabase dashboard | 5 | 2 | H | 1 |
| 46 | Verify RLS is enabled on the `views` table | Supabase dashboard | 5 | 2 | H | 1 |
| 47 | Verify RLS is enabled on the `shows` table | Supabase dashboard | 5 | 2 | H | 1 |
| 48 | Verify RLS is enabled on the `snap_cards` table | Supabase dashboard | 5 | 2 | H | 1 |
| 49 | Verify RLS is enabled on the `credits` table | Supabase dashboard | 5 | 2 | H | 1 |
| 50 | Define RLS policy for `profiles`: artists can read all public profiles; artists can only update their own profile | Supabase dashboard | 5 | 3 | H | 1 |
| 51 | Define RLS policy for `fans`: artists can read their own fans; fans cannot read other fans; anonymous users can insert (fan sign-up) | Supabase dashboard | 5 | 3 | H | 1 |
| 52 | Define RLS policy for `clicks`: anonymous users can insert; artists can only read their own clicks | Supabase dashboard | 5 | 3 | H | 1 |
| 53 | Define RLS policy for `views`: anonymous users can insert; artists can only read their own views | Supabase dashboard | 5 | 3 | H | 1 |
| 54 | Define RLS policy for `shows`: public read (fans need to see shows); artists can only write their own shows | Supabase dashboard | 5 | 3 | H | 1 |
| 55 | Define RLS policy for `snap_cards`: public read; artists can only write their own snap cards | Supabase dashboard | 5 | 3 | H | 1 |
| 56 | Define RLS policy for `credits`: both artist and freelancer in the credit can read it; only the artist can insert/update | Supabase dashboard | 5 | 3 | H | 1 |
| 57 | Verify that the anon key cannot be used to call a Supabase edge function that bypasses RLS — edge functions run with the service role by default | Supabase dashboard | 4 | 2 | H | 2 |
| 58 | Verify that Supabase storage buckets (for artwork uploads) have correct access policies — public bucket for profile images, private bucket for any internal assets | Supabase dashboard | 4 | 2 | H | 2 |
| 59 | Set storage bucket policy: artwork bucket is public-read, allowing `anon` role to read; only authenticated artists can write to their own folder | Supabase dashboard | 4 | 2 | H | 2 |
| 60 | Verify the anon key cannot enumerate all artist profiles if `profiles` table has no RLS — with RLS on and a public-read policy on profiles, this is fine | Supabase dashboard | 4 | 2 | M | 2 |
| 61 | Confirm that the `profiles` table does not store any sensitive fields (card details, SSN, etc.) that would be problematic if enumerable | Supabase dashboard | 4 | 1 | M | 1 |
| 62 | Verify that `able_tier` is stored in `profiles.tier` and that the anon key cannot update this field — tier changes must require service-role or a server-side function with auth check | Supabase dashboard | 5 | 2 | H | 1 |
| 63 | Add a server-side Netlify function for tier upgrades that validates a Stripe webhook signature before updating `profiles.tier` — this must never be done client-side | netlify/functions/ | 5 | 4 | H | 2 |
| 64 | Verify the anon key cannot call Supabase auth admin APIs (creating users, listing users) — these require the service role key | Supabase dashboard | 5 | 1 | H | 1 |
| 65 | Confirm that auth.users data is not readable via the anon key — by default Supabase restricts auth.users to service role | Supabase dashboard | 5 | 1 | H | 1 |
| 66 | Set up Supabase audit logging to record all data-modifying operations — useful for incident investigation | Supabase dashboard | 3 | 2 | M | 3 |
| 67 | Review Supabase project settings: confirm that "Enable email confirmations" is on for artist sign-ups | Supabase dashboard | 4 | 1 | M | 2 |
| 68 | Review Supabase project settings: confirm that "Disable signup" is off (artists need to sign up) | Supabase dashboard | 3 | 1 | L | 2 |
| 69 | Review Supabase project settings: confirm that allowed email domains are not restricted (artists come from all domains) | Supabase dashboard | 3 | 1 | L | 2 |
| 70 | Verify the Supabase magic link redirect URL is set correctly to `https://ablemusic.co/auth/callback` — the `netlify.toml` routes this to `admin.html` | Supabase dashboard | 5 | 1 | H | 1 |
| 71 | Verify the Supabase `site_url` setting matches `https://ablemusic.co` — if not, magic links will fail | Supabase dashboard | 5 | 1 | H | 1 |
| 72 | Verify the Supabase additional redirect URLs include Netlify deploy preview patterns (`https://*.netlify.app`) for development testing | Supabase dashboard | 3 | 1 | L | 2 |
| 73 | Rotate the anon key if it has been shared in any public channel, screenshot, or repository that is or was public — the key is low-risk but rotation is free | Supabase dashboard | 4 | 1 | M | 2 |
| 74 | Document the key management policy in `docs/systems/data-architecture/SPEC.md`: "Anon key is public-safe when RLS is correctly configured. Service key never leaves server." | docs/ | 3 | 1 | L | 3 |
| 75 | Add a pre-commit hook or CI check that greps for `sbp_` and `service_role` strings and blocks the commit if found | project root | 5 | 3 | H | 2 |
| 76 | Confirm that Netlify environment variables set in the Netlify dashboard are not logged in function output — `console.log(process.env)` in a function would expose all secrets | netlify/functions/ | 5 | 1 | H | 1 |
| 77 | Grep all Netlify functions for `console.log(process.env` — must be zero | netlify/functions/ | 5 | 1 | H | 1 |
| 78 | Review the `fan-confirmation.js` CORS header: `Access-Control-Allow-Origin: *` allows any website to trigger a fan sign-up in an artist's name — assess whether to add an `Origin` check or a CSRF token | netlify/functions/fan-confirmation.js | 4 | 3 | M | 2 |
| 79 | Assess whether Netlify function calls should require a shared secret header (`X-ABLE-Key`) to prevent abuse from outside the ABLE frontend | netlify/functions/ | 4 | 3 | M | 2 |
| 80 | Confirm that the Supabase `jgspraqrnjrerzhnnhtb` project is on a paid plan before production launch — free plan pauses after 1 week of inactivity | Supabase dashboard | 4 | 1 | M | 2 |
| 81 | Note that the project URL `jgspraqrnjrerzhnnhtb.supabase.co` contains the project ID which is not secret — acceptable to have in code | all files | 2 | 1 | L | 4 |
| 82 | Confirm there are no other Supabase projects being used — no accidental staging vs production confusion | Supabase dashboard | 3 | 1 | M | 1 |
| 83 | Create a separate Supabase project for staging/development — never use the production project for testing with real artist data | Supabase dashboard | 4 | 3 | M | 3 |
| 84 | Document which Supabase project is production and which is staging in `docs/STATUS.md` | docs/STATUS.md | 3 | 1 | L | 3 |
| 85 | Set up Supabase alerts for unusual usage patterns (high insert rate on `fans` table — could indicate spam sign-ups) | Supabase dashboard | 3 | 2 | M | 3 |
| 86 | Verify that the `able_gig_expires` value stored as a Unix timestamp in localStorage will map to a Postgres `timestamptz` column correctly during migration | docs/ | 3 | 1 | M | 2 |
| 87 | Review whether any localStorage key currently stores a value that should be server-authoritative and must never be trusted from the client — `able_tier` is the main concern | all pages | 5 | 2 | H | 1 |
| 88 | Confirm that `able_tier` is always read from Supabase (server-authoritative) and never from localStorage for gating decisions once backend is live | admin.html | 5 | 2 | H | 1 |
| 89 | Confirm that the tier gate logic uses the server-side tier value, not the localStorage value, once Supabase is live — prevents a user manually setting `able_tier = 'artist-pro'` in browser storage | admin.html | 5 | 2 | H | 1 |
| 90 | Audit admin.html for any tier check that reads from localStorage `able_tier` — each one must be flagged as a future migration target | admin.html | 5 | 2 | H | 1 |
| 91 | Plan the Supabase JWT verification path for admin actions — `supabase.auth.getSession()` must be called and the session must be valid before any write operation | admin.html | 5 | 3 | H | 2 |
| 92 | Plan the graceful degradation path when Supabase auth session expires — admin must show a "session expired, sign in again" state, not silently fail | admin.html | 4 | 2 | M | 2 |
| 93 | Confirm that the Supabase Realtime feature is not enabled for tables where it would expose other artists' data to a listening client | Supabase dashboard | 4 | 1 | H | 1 |
| 94 | Verify that Supabase Realtime subscriptions, if used, respect RLS — they do when `supabase.channel()` is used with RLS-protected tables | Supabase dashboard | 4 | 1 | M | 2 |
| 95 | Set up a GitHub secret scanning rule for the repository — GitHub will automatically flag if the Supabase anon key pattern appears in any commit | project root | 4 | 2 | M | 2 |
| 96 | Add `SECURITY.md` to the repository describing responsible disclosure — even for a pre-launch product, having a disclosure policy is good practice | project root | 2 | 2 | L | 5 |
| 97 | Note: the current anon key `sb_publishable_pRmYph3-GYIeZEeKyY1_sg_5sOPkQp_` should be rotated once RLS policies are fully in place and the app is tested against the new key | Supabase dashboard | 3 | 1 | M | 3 |
| 98 | After rotation, update all four active HTML files with the new anon key in a single commit | all pages | 4 | 1 | M | 3 |
| 99 | Document the key rotation procedure in `docs/systems/data-architecture/SPEC.md` — which files to update, how to verify, how to deploy | docs/ | 3 | 1 | L | 4 |
| 100 | Mark this dimension complete in `docs/STATUS.md` with the date of last key audit and the RLS verification status | docs/STATUS.md | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — PAT grep, secret git history check, RLS policy setup, tier authority | 1–17, 20–37, 39–41, 43–56, 60–65, 70–72, 76–77, 80, 82, 87–93 |
| 2 | RLS verification, auth flow testing, CSRF/abuse prevention | 42, 57–59, 67–69, 73, 75, 78–79, 86, 91–92, 94–95 |
| 3 | Hardening — staging separation, alerts, config improvements | 18–19, 66, 74, 83–85, 97–98 |
| 4 | Documentation and policy | 81, 84, 99–100 |
| 5 | Nice-to-have — SECURITY.md | 96 |
