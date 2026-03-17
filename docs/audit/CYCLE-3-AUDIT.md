# ABLE — Cycle 3 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 2 Wave 1**
**Scores entering Cycle 3: Artist Success 7.5/10 · CRM 6.5/10 · World Map 7.0/10 · Error States 7.0/10 · Deep Links 0/10 · Tiers pre-launch**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Deep link campaigns | 0/10 | 7.0/10 | Hardest gap; every Instagram Story click should know its source |
| B — Profile completeness UX | (unscored) | 8.0/10 | Converts setup-incomplete artists before churn |
| C — Admin render quality | 7.0/10 | 8.5/10 | CRM wave 2 items + admin performance |
| D — Error state polish | 7.0/10 | 8.5/10 | Network offline UI; profile null state; crash boundary |
| E — `<time>` + structured data | (unscored) | 8.0/10 | Accessibility + SEO on event dates |

---

## Dimension A — Deep Link Campaigns
*Score: 0/10 → target 7.0/10. Every fan who arrives from a campaign has context that is currently lost. URL param parsing + source tagging is the core of the CRM.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | URL param campaign capture: on `able-v8.html` load, parse `?campaign=NAME` from the URL and store in `sessionStorage._able_campaign` — max 100 chars, URL-decoded, trim leading/trailing whitespace | V8 | 5 | 2 | L | 1 |
| 2 | Campaign source tagging on fan sign-up: both fan sign-up handlers must include `campaign: sessionStorage.getItem('_able_campaign') || null` in the fan object written to `able_fans` | V8 | 5 | 1 | L | 1 |
| 3 | Campaign state tag matches session: the fan object field `campaignName` must match the URL param name — keep separate from `campaignState` (which is the page state machine: profile/pre-release/live/gig) | V8 | 5 | 1 | L | 1 |
| 4 | Campaign creator UI in admin: add a "Campaigns" section to admin.html settings tab — a simple form: `<input placeholder="Campaign name (e.g. ig-story-nov26)">` → generates `https://ablemusic.co/HANDLE?campaign=ig-story-nov26` — copy-to-clipboard | ADM | 5 | 3 | M | 1 |
| 5 | Campaign analytics in admin: on the analytics tab, add a "By campaign" breakdown row — `able_fans.reduce()` over `campaignName` field — show top 5 campaign names by fan count | ADM | 4 | 3 | M | 2 |
| 6 | `ref` param capture: also parse `?ref=REFNAME` from URL — store in `sessionStorage._able_ref` — for existing links like `?ref=instagram` or `?ref=tiktok` that predate the campaign system | V8 | 4 | 1 | L | 1 |
| 7 | Campaign source in CSV export: add `campaign_name` column to `exportFans()` CSV — between `campaign_state` and `consent_timestamp` — pull from `f.campaignName || ''` | ADM | 5 | 1 | L | 1 |
| 8 | Campaign link QR code: the campaign creator UI must also offer a QR code of the campaign URL — same `qrcode.js` already loaded — for use in print materials and live events | ADM | 4 | 2 | M | 2 |
| 9 | Campaign name validation: reject campaign names longer than 50 chars, or containing spaces (use hyphens) — show inline error: "Use hyphens not spaces, max 50 characters" | ADM | 3 | 1 | L | 1 |
| 10 | PostHog campaign dimension: include `campaign_name` in the `fan_signup` PostHog event — `campaign: sessionStorage.getItem('_able_campaign') || null` — alongside the existing `source`, `campaign_state` fields | V8 | 4 | 1 | L | 1 |
| 11 | Campaign preview: the campaign creator shows a live preview of the generated URL as the artist types the campaign name — update on keyup | ADM | 3 | 1 | L | 2 |
| 12 | Campaign UTM bridge: if `utm_campaign` is set but `campaign` param is not, copy `utm_campaign` into `_able_campaign` as fallback — this bridges artists who already use UTM params | V8 | 4 | 1 | L | 2 |
| 13 | Campaign history list: admin campaigns section shows a list of past campaign names with their fan counts — `Object.entries(able_fans.reduce((acc,f)=>{if(f.campaignName){acc[f.campaignName]=(acc[f.campaignName]||0)+1}return acc},{})).sort((a,b)=>b[1]-a[1])` | ADM | 4 | 2 | M | 2 |
| 14 | Deep link redirect: `netlify.toml` `/:handle?campaign=:campaign` → `/able-v8.html` — verify the existing `/:slug` rewrite passes query params through to `able-v8.html` (test with ?campaign=test) | INF | 5 | 1 | M | 1 |
| 15 | Campaign persistence: `_able_campaign` stored in `sessionStorage` — verify it persists across tab navigations within the same origin (sessionStorage is tab-scoped, not origin-scoped) | V8 | 3 | 1 | L | 2 |

---

## Dimension B — Profile Completeness UX
*Score: unscored → target 8.0/10. Artists who complete their profile are 5x more likely to share it. An explicit completeness signal drives activation.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 16 | Profile completeness score: admin home tab shows a progress bar (0–100%) based on: name 15%, bio 20%, artwork 20%, hero CTAs 20%, at least one snap card 15%, at least one show 10% — the bar itself, not a list | ADM | 5 | 3 | M | 1 |
| 17 | Completeness nudge copy: each missing item shows a specific nudge when score < 100% — "Add a bio so fans know who you are." / "Add your artwork — it's the first thing fans see." / "Add a snap card — give fans something to click." | ADM | 4 | 2 | L | 1 |
| 18 | Completeness gates share: the "Share your page" nudge on day 0 must not show until completeness >= 60% — an empty profile shared damages trust | ADM | 5 | 1 | L | 1 |
| 19 | Setup prompt bar detail: the existing `#setup-prompt-bar` shows when `!v3data.name` — extend to also show when `!v3data.bio` and `!v3data.accent` are missing — "Complete your setup: name, bio, and accent colour" | ADM | 4 | 2 | L | 1 |
| 20 | First-load blank state: when admin loads with no profile data, show a structured empty state — 3 cards: "Set your name", "Add a bio", "Pick your accent" — each card taps into the edit section | ADM | 4 | 3 | M | 2 |
| 21 | Profile preview consistency: admin.html shows a `Preview` button that opens `able-v8.html?owner=true` in a new tab — verify the link is already wired and includes `?owner=true` (not just `able-v8.html`) | ADM | 4 | 1 | L | 1 |
| 22 | Wizard re-entry: the setup-prompt-bar "Set it up now →" link goes to `start.html` — verify it does not overwrite an existing profile — start.html must hydrate from existing `able_v3_profile` if present, not reset | STR | 5 | 2 | M | 2 |
| 23 | Bio word count: admin bio textarea shows a live word count — "48 words" — at 50+ words show: "Good. Most artists write 30–80." — at 0 words show: "Tell fans who you are. One honest sentence is enough." | ADM | 3 | 2 | L | 2 |
| 24 | Handle preview: admin settings → slug field shows the live `ablemusic.co/HANDLE` preview updating as the artist types — verify `updateSlugPreview()` is wired to `input` not just `change` | ADM | 3 | 1 | L | 2 |
| 25 | 30-day check-in: when `admin_visit_dates` spans more than 30 calendar days, show nudge: "30 days. [N] fans. [M] clicks. That's your list." — dismiss key: `'30day-summary'` | ADM | 4 | 3 | M | 3 |

---

## Dimension C — Admin CRM Wave 2
*Score: 6.5/10 → target 8.0/10. Wave 2 items from CYCLE-2-AUDIT.md that were deferred. Data integrity + admin usability.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 26 | Fan sort default: verify `renderFanList()` sorts by `ts` descending (most recent first) — check the current sort applied before `filtered` slice | ADM | 4 | 1 | L | 1 |
| 27 | Fan count by source breakdown: analytics tab shows "By source: Instagram 42%, Direct 31%, TikTok 18%, Other 9%" — built from `able_fans.reduce()` over `source` field — show top 4 sources | ADM | 4 | 3 | M | 2 |
| 28 | Fan delete confirmation: "Remove from list" button shows confirmation state — "Really remove? This can't be undone." with red confirm — not immediate | ADM | 4 | 2 | L | 2 |
| 29 | Fan last-seen date: each fan row shows sign-up date — "Today", "3 days ago", "12 Mar 2026" — using relative time formatter | ADM | 3 | 2 | L | 2 |
| 30 | Fan JSON export: alongside CSV, add JSON export — `Blob([JSON.stringify(fans,null,2)], {type:'application/json'})` — for artists importing into other tools | ADM | 3 | 1 | L | 2 |
| 31 | Fan sign-up rate sparkline: 30-day bar chart in analytics tab — `able_fans.filter(f => f.ts > Date.now() - 2592000000)` grouped by day — render as 30 vertical bars, relative height | ADM | 4 | 4 | M | 3 |
| 32 | PostHog enrichment verify: check `fan_signup` PostHog event includes all 5 fields: `source, campaign_state, tier, consentVersion, sessionId` — grep able-v8.html and confirm | V8 | 5 | 1 | L | 1 |
| 33 | Fan sign-up from `?ref=email-confirm`: if `?ref=email-confirm` is in the URL on `able-v8.html`, auto-show a "Welcome back" toast and write the artist to `able_fan_following` without any UI friction | V8 | 4 | 2 | M | 2 |
| 34 | `able_fan_following` full schema: each followed artist in `able_fan_following` must have `{ id, slug, name, accent, artwork, followedAt }` — not just slug — so `fan.html` renders without Supabase | FN | 4 | 2 | M | 3 |
| 35 | CRM sign-off test: manual test — sign up via `?ref=instagram&campaign=ig-story-test`, verify fan object includes `campaignState, sessionId, source: 'instagram', campaignName: 'ig-story-test', consentVersion, optIn: true, consent_ts` | ALL | 5 | 2 | M | 4 |

---

## Dimension D — Error State Polish (Wave 2)
*Score: 7.0/10 → target 8.5/10. Network failures, profile null states, admin crash boundary.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 36 | Profile null state on `able-v8.html`: when `able_v3_profile` is null (fan arrives direct to ablemusic.co with no handle), show: "This artist isn't set up yet. Set up your ABLE page →" linking to `start.html` — not a blank page | V8 | 5 | 2 | M | 1 |
| 37 | `initAdmin()` crash boundary: wrap the top-level `window.addEventListener('DOMContentLoaded')` in a try/catch — if it throws, show: "Something went wrong loading your dashboard. [Refresh →]" | ADM | 5 | 2 | M | 2 |
| 38 | Admin offline status bar: when `navigator.onLine === false`, show a slim amber bar at the top: "You're offline — changes save locally." — `window.addEventListener('offline')` / `'online'` | ADM | 3 | 2 | L | 2 |
| 39 | Date parse guard: verify `computeState()` guards `new Date(releaseDate)` with `if (!releaseDate) return 'profile'` before the Date call — `new Date(null)` returns `Invalid Date` which coerces to `1970` | V8 | 4 | 1 | M | 1 |
| 40 | CTA URL guard on profile: before inserting any CTA URL into `<a href>`, verify it passes `isSafeUrl()` — a blank or `javascript:` URL must render as a non-functional button | V8 | 5 | 2 | H | 1 |
| 41 | Artwork URL guard: if `profile.artworkUrl` fails to load (404, CORS), fall back to solid accent-colour background via `img.onerror` — do not show broken `<img>` tag | V8 | 4 | 1 | L | 1 |
| 42 | Netlify function timeout: when any Netlify function takes > 8s, show a specific timeout message — "Email taking a while — we'll keep trying." not a generic spinner — use `AbortController` with 8000ms | V8 | 4 | 2 | M | 2 |
| 43 | Supabase client init guard: wrap `createClient()` call in try/catch on all pages — if it throws (wrong URL, no network), page must continue with localStorage fallback | ALL | 4 | 2 | M | 2 |
| 44 | Error state doc: write `docs/systems/error-states/IMPLEMENTED.md` listing every error state built and what the user sees — prevents re-implementation in future sessions | ALL | 3 | 2 | L | 3 |
| 45 | Admin QuotaExceeded prune: when QuotaExceededError fires in `setLS()`, after showing toast, prune `able_views` to the last 30 entries and `able_clicks` to last 50, then retry — prevents permanent storage block | ADM | 4 | 2 | M | 2 |

---

## Dimension E — `<time>` Tags + Structured Data + Performance
*Score: unscored → target 8.0/10. Semantic HTML for event dates; structured data for shows; remaining Lighthouse items.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 46 | `<time datetime>` on all show dates: every show date in `renderShowsSection()` must use `<time datetime="2026-04-14">14 April</time>` — machine-readable for screen readers + Google Event rich results | V8 | 4 | 2 | L | 1 |
| 47 | `<time datetime>` on fan sign-up timestamps in admin: each `fan.ts` rendered in the fan list row should use `<time datetime="ISO-DATE" title="12 Mar 2026 at 19:42">3 days ago</time>` | ADM | 3 | 2 | L | 2 |
| 48 | JSON-LD event schema: add a `<script type="application/ld+json">` block to `able-v8.html` when shows exist — `@type: Event`, `name`, `startDate` (ISO), `location.name` — enables Google Event rich results | V8 | 5 | 3 | L | 2 |
| 49 | Admin QR code for live events: admin events tab → each show card has a "Get QR code" button — generates a QR of `ablemusic.co/HANDLE?campaign=show-VENUE` — downloadable as PNG | ADM | 4 | 3 | M | 2 |
| 50 | Lighthouse baseline: run Lighthouse on `able-v8.html` locally (mobile emulation, throttled 3G) — document LCP, FCP, CLS, INP, Score in `docs/systems/qa-testing/PERF-BASELINE-2026-03-17.md` | V8 | 5 | 2 | M | 2 |
| 51 | Admin Lighthouse baseline: same for `admin.html` — document LCP and Score — baseline for regression detection | ADM | 4 | 2 | M | 2 |
| 52 | Font loading fallback: verify `<noscript>` `<link rel="stylesheet">` is present on all pages for users with JS-blocked font loading — all 4 pages checked | ALL | 3 | 1 | L | 1 |
| 53 | `will-change` audit: grep all pages for `will-change:` — verify any element using it has `isolation: isolate` on its parent — unnecessary compositing layers tank scroll performance | ALL | 3 | 2 | L | 2 |
| 54 | Admin `requestAnimationFrame` on stat updates: verify fan count and stat card DOM updates are wrapped in `requestAnimationFrame` — prevents forced reflow on each write | ADM | 3 | 1 | L | 2 |
| 55 | OG image production deploy: verify `og-default.jpg` is accessible at `https://ablemusic.co/og-default.jpg` — run `curl -I` to confirm 200 — if 404, trigger Netlify redeploy | INF | 5 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1, #2, #3 (campaign param capture + fan object tag) → #6 (ref param) → #7 (CSV campaign column) → #14 (netlify.toml query pass-through) → #10 (PostHog campaign dim) → #26 (fan sort verify) → #32 (PostHog fan_signup 5 fields) → #36 (profile null state) → #39 (date parse guard) → #40 (CTA URL guard) → #41 (artwork onerror) → #46 (<time datetime>) → #52 (noscript font) → #55 (og-default.jpg check)

**Wave 2 (after Wave 1 is committed):**
#4 (campaign creator UI) → #16–#19 (completeness score + nudges) → #21 (preview link verify) → #27–#30 (CRM fan detail) → #37–#38 (crash boundary + offline bar) → #42–#43 (timeout + Supabase guard) → #45 (QuotaExceeded prune) → #47–#49 (<time> + JSON-LD + QR)

**Wave 3+ (post-launch or Cycle 4):**
#5, #8, #11, #13 (campaign analytics + QR + history) → #20, #22–#25 (wizard re-entry + check-in) → #28–#31 (fan delete confirm + sparkline) → #33–#34 (fan follow flow) → #50–#51 (Lighthouse baselines)
