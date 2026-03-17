# ABLE — Cycle 20 Audit
**Generated: 2026-03-17 | Targeting analytics display, Supabase integration readiness, fan dashboard realtime, and closing the remaining C19 deferred items**
**Scores entering Cycle 20: Artist profile 9.7 · Admin 9.9 · Landing 9.9 · Onboarding 9.9 · Fan dashboard 9.7 · Analytics system 9.0**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Analytics display | 9.0/10 | 9.2/10 | C19 #27 deferred: admin source breakdown; session coverage gaps |
| B — Supabase readiness | 7.5/10 | 8.5/10 | Auth, fan sync, profile sync all wired but untested at scale |
| C — Fan dashboard polish | 9.7/10 | 9.8/10 | Geo filter uses demo data; new-drop badge logic tied to fan_last_visit |
| D — Copy / voice final | 9.5/10 | 9.7/10 | Final round: banned phrases audit, artist-voice on snap cards |
| E — PWA / performance | 9.5/10 | 9.6/10 | Service worker caching strategy; LCP measurement on artist profile |

---

## Dimension A — Analytics display
*Score: 9.0/10 → target 9.2/10. Admin source breakdown (C19 #27 deferred) + session coverage.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Admin source breakdown: in stats page — show top 5 sources by fan sign-up count as a sorted list with counts (C19 #27 carry-forward) | ADM | 4 | 2 | M | 1 |
| 2 | `trackView` session guard: verify `sessionStorage.getItem('_able_view_fired')` prevents duplicate fires across SPA-like tab switches | V8 | 4 | 1 | L | 1 |
| 3 | Admin click breakdown: add a "CTA clicks by type" row to the stats page (primary_cta / secondary_cta / platform / merch / ticket) | ADM | 4 | 2 | M | 2 |
| 4 | Fan echo source match (C19 #29 deferred): when fan sees echo state — compare `signupSource` vs `SESSION_SOURCE` and log `returning_same_channel: true/false` | V8 | 3 | 1 | L | 2 |
| 5 | Admin traffic tab: show a 7-day sparkline of daily page views using `able_views` data — already computed, just unrendered | ADM | 4 | 2 | M | 2 |
| 6 | Confirmed credit click: `trackClick(rec.title, 'credit', 'credits-section')` when a confirmed credit link is tapped | V8 | 3 | 1 | L | 1 |
| 7 | Close Circle join track: `trackClick('close-circle-join', 'fan', 'close-circle')` on successful CC join | V8 | 3 | 1 | L | 1 |
| 8 | Snap card click track: `trackClick(snap.title, 'snap', 'snap-section')` on each snap card CTA tap | V8 | 3 | 1 | L | 1 |
| 9 | Pre-save click track: `trackClick('pre-save', 'cta', 'hero')` on pre-save button tap — verify current fire | V8 | 4 | 1 | L | 1 |
| 10 | Share card track: `trackClick('share-gig', 'share', 'admin')` on gig share link copy (already in C9 #45 — verify it fires via `adminTrackClick` not raw push) | ADM | 3 | 1 | L | 1 |

---

## Dimension B — Supabase integration readiness
*Score: 7.5/10 → target 8.5/10. Auth, fan sync, profile sync exist but production validation needed.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Supabase fan sync smoke test: manually verify `sbSyncFanSignup()` writes to `fans` table in staging environment — confirm RLS policy allows insert | V8 | 5 | 2 | H | 1 |
| 12 | Supabase profile sync: verify `syncProfile()` in admin.html updates `profiles` table — test with a profile name change | ADM | 5 | 2 | H | 1 |
| 13 | Supabase anon key audit: confirm the anon key in code is the publishable key (not service key) — service key must never be in frontend | ALL | 5 | 1 | L | 1 |
| 14 | Magic link auth flow: verify `supabase.auth.signInWithOtp()` in admin onboarding actually sends email and creates session | ADM | 5 | 3 | H | 2 |
| 15 | RLS policy verification: `able_fans` insert requires `profile_id = auth.uid()` — test that an unauthenticated insert is rejected | DB | 5 | 2 | H | 2 |
| 16 | Fan count sync: verify `fans` count in Supabase matches `able_fans` localStorage length after a sign-up — confirm no off-by-one | V8 | 4 | 2 | M | 2 |
| 17 | Profile slug uniqueness: verify `profiles.slug` has a UNIQUE constraint in Supabase — collisions cause auth failures | DB | 5 | 1 | L | 1 |
| 18 | Netlify function env vars: confirm `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `SPOTIFY_CLIENT_ID/SECRET` set in Netlify dashboard | OPS | 5 | 1 | L | 1 |
| 19 | Fan confirmation email: verify `/.netlify/functions/send-confirmation` is deployed and sends to the fan's email address | OPS | 4 | 2 | H | 2 |
| 20 | Session expiry handling: when Supabase session expires while on admin.html — banner shows and `signInWithOtp()` re-auth works | ADM | 4 | 2 | M | 2 |

---

## Dimension C — Fan dashboard polish
*Score: 9.7/10 → target 9.8/10. Geo uses demo data; new-drop badge tied to fan_last_visit logic.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | Near me Haversine filter: replace DEMO_NEAR with real shows from `able_fan_following` artists — use `fan_location` lat/lng + Haversine to filter within 50 miles | FAN | 5 | 3 | M | 2 |
| 22 | New drop badge timing: `fan_last_visit` should update on every fan.html load — verify it's written at init, not just on sign-up | FAN | 4 | 1 | L | 1 |
| 23 | For you personalisation: when `fan_name` is in localStorage — show "For you, [Name]." as the tab heading | FAN | 3 | 1 | L | 1 |
| 24 | Discover tab content: replace placeholder with real artists from `able_fan_following` connections — artists the fan's followed artists follow | FAN | 4 | 3 | M | 2 |
| 25 | Feed item source label: when `item.source` is set — show a small "via [source]" label below the feed item timestamp | FAN | 3 | 1 | L | 1 |
| 26 | Artist card new drop badge: when followed artist has a release newer than `fan_last_visit` — show `New drop` pill on their card | FAN | 4 | 2 | M | 1 |
| 27 | Pull-to-refresh aria: add `aria-label="Pull down to refresh"` to the scroll container top — no gesture change, just label for SR | FAN | 2 | 1 | L | 1 |
| 28 | Artist card skeleton: when `able_fan_following` is loading — 3 skeleton cards shown in Following tab (already exist in HTML — verify JS hides them after render) | FAN | 3 | 1 | L | 1 |
| 29 | Feed artwork thumbnail: when `item.artworkUrl` is set — show 48×48 thumbnail beside feed item title | FAN | 3 | 1 | L | 1 |
| 30 | Credit confirmed-by copy: `'Confirmed credit'` aria-label → `'Confirmed by [name]'` when `rec.confirmedBy` is set (C19 #40 deferred) | V8 | 3 | 1 | L | 1 |

---

## Dimension D — Copy / voice final round
*Score: 9.5/10 → target 9.7/10. Banned phrase audit + artist-voice snap cards.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Banned phrase sweep: search all 5 active HTML files for: "Get started", "Sign up", "Grow", "Content", "Engage", "Monetise", "Superfan" — log any found to this audit | ALL | 4 | 1 | L | 1 |
| 32 | Snap card default copy audit: verify snap card placeholder body text doesn't use banned phrases or generic SaaS micro-copy | ADM V8 | 3 | 1 | L | 1 |
| 33 | Admin toast copy — campaign save: "Saved." → "Updated." for non-state changes (e.g. name/bio saves) — more specific, less generic | ADM | 2 | 1 | L | 1 |
| 34 | Landing FAQ copy audit: verify all FAQ questions match ABLE's direct, honest voice — no weasel words or SaaS superlatives | LND | 3 | 1 | L | 1 |
| 35 | Fan echo personalised release: when `state === 'live'` and `profile.release.title` — echo heading is `"[Title] is out now."` (period, no exclamation) — already verified; add to reference | V8 | 2 | 1 | L | 1 |
| 36 | Admin CRM page title: "Fans" tab → "Your fans" — more possessive, less generic | ADM | 2 | 1 | L | 1 |
| 37 | Fan capture trust line: when `profile.name` includes a city — show `'Just [Name] from [City]. No spam.'` | V8 | 3 | 1 | L | 2 |
| 38 | Start.html completion message: verify "You're done." doesn't end with "!" — current is fine; confirm doc.title is set | STR | 2 | 1 | L | 1 |
| 39 | Close Circle sheet heading: current "Close Circle" — change to `"For the people who really show up."` when artist name is set | V8 | 3 | 1 | L | 1 |
| 40 | Admin sheet titles: all sheet open calls use `title` parameter — audit that none use generic "Settings" as title | ADM | 2 | 1 | L | 1 |

---

## Dimension E — PWA / performance
*Score: 9.5/10 → target 9.6/10. Service worker + LCP on artist profile.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Service worker cache strategy: audit `/service-worker.js` — verify cache-first for fonts + images, network-first for HTML | PWA | 4 | 2 | M | 2 |
| 42 | LCP element: on able-v8.html — artist avatar/top card image should have `fetchpriority="high"` to optimise LCP | V8 | 4 | 1 | L | 1 |
| 43 | Font preload: `<link rel="preload">` for DM Sans + Barlow Condensed woff2 — reduces FOUT on artist profile | V8 | 3 | 1 | L | 1 |
| 44 | Admin image lazy-load: fan avatar images in fan list should have `loading="lazy"` to reduce initial load | ADM | 3 | 1 | L | 1 |
| 45 | iframe sandbox: all embedded iframes (YouTube, SoundCloud) should have `sandbox="allow-scripts allow-same-origin allow-presentation"` — verify no over-permissioning | V8 | 4 | 1 | L | 1 |
| 46 | PWA manifest icons: verify all icon sizes in `manifest.json` have corresponding files in `/assets/icons/` | PWA | 3 | 1 | L | 1 |
| 47 | offline.html localisation: verify offline.html works when JS is disabled — no JS-dependent content in the page | PWA | 3 | 1 | L | 1 |
| 48 | Lighthouse run: run Lighthouse on able-v8.html and admin.html — capture scores before Supabase migration | DEV | 4 | 1 | L | 1 |
| 49 | Image format audit: og-default.jpg and og-landing.jpg should be ≤ 200KB — check file size | ALL | 3 | 1 | L | 1 |
| 50 | CSP header: add `Content-Security-Policy` header to netlify.toml for landing.html + admin.html — `default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net eu.i.posthog.com` | OPS | 4 | 2 | H | 2 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (admin source breakdown) → #2 (trackView session guard) → #6 (credit click track) → #7 (CC join track) → #8 (snap card track) → #9 (pre-save verify) → #10 (gig share verify) → #13 (anon key audit) → #17 (slug uniqueness) → #18 (Netlify env vars) → #22 (fan_last_visit update) → #23 (for you personalisation) → #25 (feed source label) → #26 (new drop badge) → #27 (pull-to-refresh aria) → #28 (skeleton hide verify) → #29 (feed artwork) → #30 (credit confirmed-by) → #31 (banned phrase sweep) → #32 (snap card copy) → #33 (toast copy) → #34 (FAQ copy) → #35 (echo verified) → #36 (CRM title) → #38 (start.html verify) → #40 (sheet title audit) → #42 (LCP fetchpriority) → #43 (font preload) → #44 (lazy-load) → #45 (iframe sandbox) → #46 (manifest icons) → #47 (offline.html) → #48 (Lighthouse) → #49 (image sizes)

**Wave 2 (after Wave 1 committed):**
#3 (admin click breakdown), #4 (fan echo source match), #5 (7-day sparkline), #11 (fan sync smoke test), #12 (profile sync verify), #14 (magic link flow), #15 (RLS policy), #16 (fan count sync), #19 (confirmation email), #20 (session expiry), #21 (Haversine geo), #24 (discover content), #37 (trust line city), #39 (CC sheet heading), #41 (service worker), #50 (CSP header)

**Wave 3 (polish):**
Playwright smoke test across all 5 pages · Manual 375px · VoiceOver on real device
