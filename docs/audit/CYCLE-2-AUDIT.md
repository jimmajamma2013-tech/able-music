# ABLE — Cycle 2 Audit
**100 fresh improvement points targeting lowest-scoring dimensions**
**Created: 2026-03-17 | Based on MASTER-SCORECARD post-Cycle-1**
**Target dimensions: Artist Success (4.0), CRM (4.5), World Map (5.2), Spotify Import (5.2), Explainers (5.5), Error States (6.0), Performance Core Vitals (unscored), Tier Gates (6.5)**

> Each improvement: Impact (1-5), Effort (1-5), Risk (L/M/H), Wave (execution order within dimension).
> Start each dimension with Wave 1. Within a wave: Impact 5 before Impact 4.

---

## Dimension A — Artist Success & Activation
*Score: 4.0/10 → target 8.5/10. The biggest single conversion failure: artists who complete the wizard don't share their page. Every improvement here compounds organic growth.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Day 1 share card: after `completeWizard()` in `start.html`, show a full-screen moment — "Your page is live." — with the artist's page URL in a large tap-to-copy field, a native share sheet trigger via `navigator.share({ url, title })`, and three platform pill shortcuts (Instagram Story, Twitter/X, WhatsApp) | STR | 5 | 4 | M | 1 |
| 2 | Navigator.share fallback: if `navigator.share` is unsupported (desktop, Firefox), show a visible URL copy button + manual share links — `https://twitter.com/intent/tweet?text=...`, `https://wa.me/?text=...` — do not show a non-functional button | STR | 5 | 2 | L | 1 |
| 3 | Share card copy: the Day 1 message must be in the artist's voice — "My page is up. Come find me." — with the ABLE URL below it. The share text for Twitter: "[Artist Name] is on ABLE — [URL] #music" | STR | 5 | 1 | L | 1 |
| 4 | First fan milestone: when the first fan signs up, admin.html must show a milestone card — "Your first fan." — using the existing `showMilestone()` function. The copy must not say "Congratulations" — say "First one." | ADM | 5 | 2 | L | 1 |
| 5 | 10-fan milestone: when `able_fans.length` crosses 10, show milestone card — "10 people showed up." — with a nudge: "Share your page to a different platform today" | ADM | 4 | 2 | L | 1 |
| 6 | 100-fan milestone: when `able_fans.length` crosses 100, show milestone card and unlock the "Your first 100" stat animation — a number count-up from 0 to 100 over 1.5s in the stat card | ADM | 4 | 3 | M | 1 |
| 7 | Share nudge in admin: the home tab must show a share nudge when `admin_visit_dates.length === 1` (day 0, first ever visit) — "Your page is live. Share it." with a tap-to-copy URL and native share button. Dismiss key: `'share-nudge-day0'` | ADM | 5 | 2 | L | 1 |
| 8 | Profile preview link: the topbar "View your page →" link in admin must open `able-v8.html?owner=true` in a new tab — owner flag prevents self-view from being counted as a fan view | ADM | 4 | 1 | L | 1 |
| 9 | Wizard done screen: the wizard done state (step 3 success) must show exactly: (1) "Your page is live." as `<h1>`, (2) the page URL as tap-to-copy, (3) "See your page →" CTA to `able-v8.html?owner=true`, (4) "Go to dashboard →" CTA to `admin.html` — no generic SaaS done state | STR | 5 | 2 | L | 1 |
| 10 | Post-wizard Instagram tip: after the done screen, show a contextual "Quick tip" card — "Add your ABLE link to your Instagram bio. That's where most fans start." — with a dismiss button | STR | 4 | 2 | L | 1 |
| 11 | Bio link instruction: on the share card, show the specific path for Instagram bio link change: tap `Edit Profile → Bio → paste your link` — one of the highest-friction steps artists get stuck on | STR | 5 | 2 | L | 2 |
| 12 | `able_v3_profile.pageViews` initialisation: when a new artist completes the wizard, initialise `able_views: []` and the first view as the artist's own preview — so the admin stat card shows "1 view" not "0 views" on first load | ADM | 3 | 1 | L | 2 |
| 13 | 30-day summary prompt: admin.html must trigger a "30-day check-in" nudge when `admin_visit_dates` span more than 30 calendar days — show: "30 days. [N] fans. [M] clicks. That's your list." — dismiss key: `'30day-summary'` | ADM | 4 | 3 | M | 2 |
| 14 | Profile completeness progress: the home tab must show a profile completeness score (0–100%) based on: name (15%), bio (20%), artwork (20%), hero CTAs (20%), at least one snap card (15%), at least one show (10%) — shown as a bar, not a list | ADM | 4 | 3 | M | 2 |
| 15 | Completeness nudge copy: each missing completeness item shows a specific nudge — "Add a bio so fans know who you are." not "Profile incomplete" — use the copy philosophy | ADM | 4 | 2 | L | 2 |
| 16 | Share analytics: when an artist taps the share button (from admin or wizard), fire `posthog.capture('profile_shared', { platform, artistSlug })` — track which sharing platforms are actually used | ADM | 3 | 1 | L | 2 |
| 17 | `?owner=true` experience: when `able-v8.html` detects `?owner=true`, show a slim banner at the top: "This is your page — edit it in your dashboard." with a link to `admin.html` — the banner must be dismissable and not visible to fans | V8 | 4 | 2 | M | 2 |
| 18 | First-click celebration: when an artist views `able-v8.html?owner=true` for the first time (no `sessionStorage.getItem('_ownerFirstView')`), animate the artist name in with a subtle scale entrance — make them feel the page is theirs | V8 | 3 | 2 | L | 2 |
| 19 | Week 1 retention nudge: when `admin_visit_dates.length === 3` (third visit, not necessarily 3 days), show a "You're building something real." nudge card on the home tab | ADM | 3 | 2 | L | 3 |
| 20 | Gig post-performance summary: 12 hours after gig mode expires (detected via `able_gig_expires < Date.now() - 43200000`), show a "Last night" stat card — [N] fans signed up during the show, total fans now — copy: "Last night. [N] new. [Total] total." | ADM | 4 | 2 | M | 3 |
| 21 | Empty profile share guard: the share nudge must NOT show until the profile has a name, at least one CTA, and artwork — sharing an empty profile damages trust | ADM | 5 | 1 | L | 3 |
| 22 | QR code for live events: admin.html must generate a QR code of the artist's ABLE URL (using the already-loaded `qrcode.js`) and display it in the events section — "Print this at your show" — downloadable as PNG | ADM | 4 | 2 | M | 3 |
| 23 | Artists on ABLE strip: the `able-v8.html` footer should include a "Made with ABLE" strip that links to `landing.html` — this is the organic referral mechanic; verify the link is `https://ablemusic.co` not a relative URL | V8 | 4 | 1 | L | 3 |
| 24 | Referral attribution: when a fan arrives via the "Made with ABLE" link, their `source` field must be `'made-with-able'` — verify the referral param chain works | V8 | 4 | 2 | M | 3 |
| 25 | Day 1 share card regression test: after implementing items #1–#3, verify the share card appears on a fresh wizard completion in incognito, that the URL is correct, and that the native share sheet opens on mobile Safari | STR | 5 | 2 | M | 4 |

---

## Dimension B — CRM & Fan Data Quality
*Score: 4.5/10 → target 8.5/10. Fan data is the artist's most valuable asset. Every fan object written without full context is permanently incomplete.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 26 | `campaignState` at sign-up: every fan sign-up must write `campaignState: computeState(profile, shows, gigExpires)` to the fan object — this is the most important CRM field and is permanently missing for any fan signed up before this fix | V8 | 5 | 2 | M | 1 |
| 27 | `sessionId` generation: on first page load, generate `sessionId = crypto.randomUUID()` and store in `sessionStorage` — attach to every click event, view event, and fan sign-up — this is how you build session-level funnels | V8 | 4 | 2 | M | 1 |
| 28 | UTM full capture: on landing, capture all 5 UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) via `new URLSearchParams(location.search)` and store in `sessionStorage('able_utm')` as a JSON object — attach to fan sign-up | V8 | 5 | 2 | M | 1 |
| 29 | `?ref=` param capture: capture `?ref=` separately from UTM — `sessionStorage('able_ref')` — and prefer it over `utm_source` when both are present; fan objects get `source: ref || utm_source || 'direct'` | V8 | 5 | 1 | L | 1 |
| 30 | Fan object schema audit: read the actual fan object written to `able_fans` during a test sign-up and compare to the spec in `docs/systems/data-architecture/SPEC.md` — log any missing fields | V8 | 5 | 1 | L | 1 |
| 31 | `consentText` field: write the exact consent text shown to the fan as a field on the fan object — `consentText: 'By signing up, you agree to receive updates...'` — not just `consentVersion` — the actual text is the legal artefact | V8 | 5 | 2 | M | 1 |
| 32 | Fan source attribution chain: the full attribution chain must be: fan.source → sessionStorage ref → sessionStorage utm_source → Referer header (not directly readable client-side) → `'direct'` — verify this fallback chain in the fan sign-up handler | V8 | 4 | 2 | M | 1 |
| 33 | Fan list sort in admin: `renderFanList()` must default to sorting by `ts` descending (most recent first) — verify the current render does not use `able_fans` array order directly (insertion order may not match time order) | ADM | 4 | 1 | L | 1 |
| 34 | Fan search: add a search input to the fan list in admin — `<input type="search" placeholder="Search fans...">` — filter fans by email prefix as the artist types. Current fan list has no search, making it unusable at 50+ fans | ADM | 4 | 2 | M | 2 |
| 35 | Fan count by source: add a source breakdown to the analytics tab — "By source: Instagram 42%, Direct 31%, TikTok 18%, Other 9%" — built from `able_fans.reduce()` over the `source` field | ADM | 4 | 3 | M | 2 |
| 36 | Fan sign-up rate chart: show a 30-day fan sign-up rate chart in the analytics tab — `able_fans.filter(f => f.ts > Date.now() - 2592000000)` grouped by day — render as a sparkline bar chart | ADM | 4 | 3 | M | 2 |
| 37 | Fan count by campaign state: show a "When they signed up" breakdown — "Profile mode 60%, Live mode 30%, Gig mode 10%" — from `campaignState` field; shows which state converts best | ADM | 4 | 2 | M | 2 |
| 38 | Fan deduplication check: on every sign-up, verify `able_fans.find(f => f.email.toLowerCase() === input.toLowerCase())` — if found, show "You're already on [Artist Name]'s list." — not an error, a confirmation; verify this is implemented | V8 | 5 | 1 | L | 2 |
| 39 | Anti-self-view: `able_views` must not fire when `localStorage.getItem('able_v3_profile')` is non-null (the profile owner is viewing) — verify this check exists in the view tracking code | V8 | 4 | 1 | M | 2 |
| 40 | Fan cap free tier UI: when `able_fans.length >= 100 && tier === 'free'`, the fan capture form on `able-v8.html` must be hidden (not just greyed) — verify `display:none` is applied, not `opacity: 0.5` | V8 | 5 | 2 | M | 2 |
| 41 | `able_fans` corruption guard: before writing a new fan, check that `able_fans` is an array — `Array.isArray(fans)` — and if not, reset to `[]` with a console.error — prevents a bad read from blocking all future sign-ups | V8 | 4 | 1 | L | 2 |
| 42 | Fan export `consentVersion` field: verify the CSV export in admin includes `consentVersion` column — this is the GDPR proof of consent version; missing it makes the export legally insufficient | ADM | 5 | 1 | L | 2 |
| 43 | Fan delete confirmation: the "Remove from list" button per fan row must show a confirmation state — "Really remove? This can't be undone." with a red confirm button — not an immediate destructive action | ADM | 4 | 2 | L | 3 |
| 44 | Fan note field: add a note field to the fan detail sheet — `fan.note` stored in `able_fans` — so an artist can annotate "met at Brighton show" or "producer intro" — max 100 chars | ADM | 3 | 3 | L | 3 |
| 45 | Fan last-seen date: show the date of each fan's sign-up in the fan list row — formatted as "Today", "3 days ago", "12 Mar 2026" — using a human-readable relative time formatter | ADM | 3 | 2 | L | 3 |
| 46 | PostHog `fan_signed_up` enrichment: verify the PostHog event includes `{ source, campaign_state, tier, consentVersion, sessionId }` — all 5 fields; missing any makes post-launch analysis incomplete | V8 | 5 | 1 | L | 3 |
| 47 | Fan JSON export option: alongside CSV export, add a JSON export button — `Blob([JSON.stringify(fans,null,2)], {type:'application/json'})` — for artists who want to import into other tools | ADM | 3 | 1 | L | 3 |
| 48 | First-visit fan flow: a fan arriving from `?ref=email-confirm` must be automatically followed to the artist without any UI friction — just the "Welcome back" toast and the artist already shown in their feed — verify the `initArrival()` handler in `fan.html` | FN | 4 | 2 | M | 3 |
| 49 | `able_fan_following` schema: each item in `able_fan_following` must include `{ id, slug, name, accent, artwork, followedAt }` — not just a slug — so `fan.html` can render the followed artist without a Supabase lookup | FN | 4 | 2 | M | 4 |
| 50 | CRM dimension sign-off: after items 26–49, run a manual test: sign up as a fan via `?ref=instagram`, verify fan object includes `campaignState`, `sessionId`, `source: 'instagram'`, `consentVersion`, `optIn: true`, `consent_ts` — document the result | ALL | 5 | 2 | M | 4 |

---

## Dimension C — World Map & Events Section
*Score: 5.2/10 → target 8.5/10. The world map is one of the most premium elements on the profile — it must have proper empty states, heading, and multi-moment support.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 51 | World map section heading: the world map section on `able-v8.html` must have a visible `<h2>` section heading — "On tour" or "Shows" — verify it is present in the DOM; the map renders without context without it | V8 | 5 | 1 | L | 1 |
| 52 | World map empty state: when `able_shows` is empty, the map section must not render an empty container — show the section only when `shows.length > 0`, or show a tasteful empty state in admin context ("Add your upcoming shows") | V8 | 5 | 1 | L | 1 |
| 53 | Shows sort order: `able_shows` must be rendered sorted by `date` ascending in `able-v8.html` — the next show must be at the top. Verify `shows.sort((a,b) => new Date(a.date) - new Date(b.date))` is applied before render | V8 | 4 | 1 | L | 1 |
| 54 | Passed shows filter: shows with dates in the past (> 24 hours ago) must not appear in the public profile shows list — verify `shows.filter(s => new Date(s.date) > Date.now() - 86400000)` before render | V8 | 5 | 1 | L | 1 |
| 55 | Admin shows sort: in admin.html events tab, shows must also sort ascending by date — the artist needs to see their nearest show at the top to manage it | ADM | 4 | 1 | L | 1 |
| 56 | Show `id` field: every show added via admin must have an `id: crypto.randomUUID()` generated at creation — verify the "Add show" handler writes this; deletion must use `id` not array index | ADM | 5 | 2 | M | 1 |
| 57 | Show deletion by id: the delete show handler must use `able_shows.filter(s => s.id !== targetId)` not `splice(index, 1)` — index-based deletion on a sorted array silently deletes the wrong show | ADM | 5 | 1 | M | 1 |
| 58 | Featured show pin: `show.featured = true` must pin the show to the top of the events list on the profile, regardless of date — verify the render sort: `featured` shows first, then by ascending date | V8 | 4 | 2 | M | 2 |
| 59 | `<time datetime>` on show dates: every show date rendered in HTML must use `<time datetime="2026-04-14T19:30:00">Monday 14 April, 7:30pm</time>` — machine-readable datetime for screen readers and structured data | V8 | 4 | 2 | L | 2 |
| 60 | Gig auto-trigger from shows: `able-v8.html` reads `able_shows` on load and if a show's `doorsTime` is within the last 4 hours, auto-applies gig state — verify the comparison: `now >= doorsTime && now < doorsTime + 14400000` | V8 | 5 | 2 | M | 2 |
| 61 | Map dot accessibility: each map dot on the world map SVG must have `aria-label="Show at [Venue], [Date]"` — purely decorative dots have `aria-hidden="true"` | V8 | 3 | 2 | L | 2 |
| 62 | Show venues de-duplication: if an artist adds two shows at the same venue, only one map dot should render — the venue with the earliest upcoming show date wins; verify the map render deduplicates by venue | V8 | 3 | 2 | L | 2 |
| 63 | Ticket URL validation: show `ticketUrl` must pass `isSafeAdminUrl()` before being used in `<a href>` — a `javascript:` URL in a ticket link is an XSS vector | ADM | 5 | 1 | H | 2 |
| 64 | Show add UX — doors time: the doors time input in admin.html must have a `placeholder="8:00 PM"` and format guidance — "24hr or 12hr, e.g. 20:00 or 8pm" — time format confusion causes silent errors | ADM | 3 | 1 | L | 2 |
| 65 | Max shows on profile: the public profile must show a maximum of 5 upcoming shows — `shows.slice(0, 5)` — with a "See all →" link below if more exist (links to a future shows page) | V8 | 3 | 1 | L | 3 |

---

## Dimension D — Error States & Resilience
*Score: 6.0/10 → target 9.0/10. safeLS/setLS are global now. The remaining gap is error UI — what the user actually sees when something goes wrong.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 66 | Network error UI on fan sign-up: when `fan-confirmation.js` returns a non-200, `able-v8.html` must show: "You're on the list — confirmation email may be delayed." — not a blank state or generic error. The sign-up must always succeed locally even if the email fails | V8 | 5 | 2 | M | 1 |
| 67 | Spotify import error UI: when `spotify-import.js` times out or returns an error, `start.html` must show: "Couldn't import — try again or set up manually." with a "Continue without Spotify →" button — never leave the wizard stuck | STR | 5 | 2 | M | 1 |
| 68 | localStorage corruption recovery: if `JSON.parse(localStorage.getItem('able_v3_profile'))` returns `null` on `admin.html` load, show: "Couldn't load your profile. Try refreshing, or complete setup again." with a "Restart setup →" link to `start.html` | ADM | 5 | 2 | M | 1 |
| 69 | `able_fans` corruption recovery: if `able_fans` is not a valid JSON array, auto-reset to `[]` and log a console.error — do not let a corrupt fan list prevent admin.html from loading | ADM | 5 | 1 | M | 1 |
| 70 | Fan sign-up offline: when the network is unavailable, the fan sign-up must still write to `able_fans` locally and show the success state — confirmation email is optional; local storage is the source of truth | V8 | 5 | 3 | M | 1 |
| 71 | Admin save failure UI: when `setLS()` throws (QuotaExceededError), admin.html must show a toast: "Couldn't save — storage is full. Old stats are being cleared to make room." — then retry the save after pruning | ADM | 5 | 2 | M | 1 |
| 72 | Netlify function timeout UI: when any Netlify function takes > 8s, show a timeout message specific to the action — "Email taking a while — we'll keep trying." not a generic spinner | V8 | 4 | 2 | M | 2 |
| 73 | Profile null state on able-v8.html: when `able_v3_profile` is null (artist navigates direct), show: "This artist isn't set up yet. Set up your ABLE page →" — not a blank page | V8 | 5 | 2 | M | 2 |
| 74 | PostHog failure silent: `posthog.capture()` must be in `try/catch` — a PostHog failure must not block any user-facing action | V8 | 4 | 1 | L | 2 |
| 75 | Supabase client init error: if `createClient()` throws (wrong URL, no network), the page must continue with localStorage fallback — wrap `createClient()` in try/catch | ALL | 4 | 2 | M | 2 |
| 76 | Google Fonts load failure: if Google Fonts fails to load (network block, CSP), the page must render with the system font stack — verify `font-family: 'DM Sans', system-ui, sans-serif` on body; system-ui is the correct fallback | ALL | 4 | 1 | L | 2 |
| 77 | `fetch()` try/catch coverage: grep all 4 pages for `fetch(` — every instance must be inside a `try/catch` or have `.catch()` chained — verify there are no unguarded fetches | ALL | 5 | 2 | M | 2 |
| 78 | Date parse guard: `new Date(profile.releaseDate)` returns `Invalid Date` when `releaseDate` is null or empty — verify the state computation guards: `if (!releaseDate) return 'profile'` before any `new Date()` call | V8 | 4 | 1 | M | 2 |
| 79 | CTA URL guard: before inserting any CTA URL into an `<a href>`, verify it passes `isSafeAdminUrl()` — a blank or `javascript:` URL must render as a non-functional button, not an anchor with a dangerous href | V8 | 5 | 2 | H | 2 |
| 80 | Artwork URL guard: if `profile.artworkUrl` is a `data:` URI or is absent, fall back to a solid accent-colour background — do not show a broken `<img>` tag | V8 | 4 | 1 | L | 3 |
| 81 | `initAdmin()` crash boundary: wrap `initAdmin()` in a top-level try/catch — if it throws (bad localStorage, JS error), show: "Something went wrong loading your dashboard. [Refresh]" — never leave the user on a half-rendered admin | ADM | 5 | 2 | M | 3 |
| 82 | Admin network status indicator: when `navigator.onLine` is false, show a slim status bar at the top of admin: "You're offline — changes will save locally." — update when connection restores | ADM | 3 | 2 | L | 3 |
| 83 | Error state documentation: write `docs/systems/error-states/IMPLEMENTED.md` listing every error state actually implemented and what the user sees — so future sessions don't re-implement the same handlers | ALL | 3 | 2 | L | 3 |
| 84 | `window.onerror` handler: verify all 4 pages have `window.onerror = function(msg,src,line,col,err) { console.error('ABLE: runtime error', msg, src+':'+line) }` — production errors must be logged | ALL | 4 | 1 | L | 3 |
| 85 | localStorage full warning: add a dev-mode `console.warn` when `JSON.stringify(able_clicks).length + JSON.stringify(able_views).length > 2000000` — proactive warning before 5MB limit hits | ALL | 3 | 1 | L | 4 |

---

## Dimension E — Performance & Core Web Vitals
*Score: unscored → target 8.5/10. Performance is accessibility. A slow page on a mid-range Android phone in Brixton loses a real fan.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 86 | LCP element: verify `able-v8.html` hero artwork has `<img loading="eager" fetchpriority="high">` — the hero image is the LCP element and must load without waiting for other resources | V8 | 5 | 1 | L | 1 |
| 87 | Artwork `aspect-ratio`: the hero artwork container must have `aspect-ratio: 1/1` and `width: 100%` in CSS — prevents CLS when the image loads; without it, the layout shifts and CLS > 0.10 | V8 | 5 | 1 | L | 1 |
| 88 | Unsplash image params: all Unsplash artwork URLs must use `?w=800&q=75&fm=webp&auto=format` — raw Unsplash URLs without params serve 4MB+ images; with params, they serve ~80KB WebP | V8 | 5 | 1 | L | 1 |
| 89 | Google Fonts preload: verify `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` are in `<head>` before the fonts `<link>` on all 4 pages | ALL | 4 | 1 | L | 1 |
| 90 | Font display: the Google Fonts URL must include `&display=swap` — verify this is present on all pages — `display=swap` prevents render-blocking while font loads | ALL | 4 | 1 | L | 1 |
| 91 | Supabase SDK defer: the Supabase CDN script `<script src="...supabase.js">` should have `defer` attribute — it is currently in the body but `defer` makes the intent explicit and prevents any future refactor moving it to head | ALL | 3 | 1 | L | 1 |
| 92 | QR Code script lazy load: the QR code library (`qrcode.js`) in admin.html is only used when QR generation is requested — move the `<script src>` to a dynamic import `const QRCode = await import('...')` at point of use, reducing initial parse cost | ADM | 3 | 2 | M | 2 |
| 93 | CSS custom property inheritance: verify no CSS rule uses `@property` or `var()` in a way that causes layout recalculation on every render — test by scrolling `able-v8.html` in DevTools and checking for > 60fps frame drops | V8 | 3 | 2 | M | 2 |
| 94 | Inline critical CSS: the above-fold CSS for `able-v8.html` (hero background, font, layout) should be inlined in a `<style>` tag — estimated 2KB — to prevent a FOUC while the external stylesheet loads | V8 | 4 | 3 | M | 2 |
| 95 | `will-change` guard: any element using `will-change: transform` must be removed from the stacking context via `isolation: isolate` on its parent — verify no `will-change` creates unnecessary compositing layers | ALL | 3 | 2 | L | 2 |
| 96 | Admin render budget: `initAdmin()` runs on DOMContentLoaded and does many synchronous localStorage reads — profile the function and verify it completes in < 50ms on a Pixel 4a (representative mid-range Android); if over, identify the expensive read | ADM | 4 | 3 | M | 3 |
| 97 | `requestAnimationFrame` for stat updates: the fan count stat card in admin updates whenever fans are written — verify the DOM update is wrapped in `requestAnimationFrame()` not synchronous `innerHTML` replacement — prevents forced reflow | ADM | 3 | 1 | L | 3 |
| 98 | Lighthouse baseline: run Lighthouse on `able-v8.html` locally (mobile device emulation) and document the scores: LCP, FCP, CLS, INP, Score — write to `docs/systems/qa-testing/PERF-BASELINE-2026-03-17.md` | V8 | 5 | 2 | M | 3 |
| 99 | Admin Lighthouse baseline: same for `admin.html` — document LCP and Score — admin is JS-heavy so a baseline helps catch regressions | ADM | 4 | 2 | M | 3 |
| 100 | Cycle 2 closure: after items 86–99, re-run the MASTER-SCORECARD scoring for all 5 dimensions and update the table — target: Artist Success 7.5/10, CRM 7.5/10, World Map 7.5/10, Error States 8.5/10, Performance 8.0/10 | ALL | 5 | 2 | L | 4 |

---

## Execution sequence

Work within each dimension sequentially (Wave 1 first). Across dimensions, prioritise by highest Impact × lowest Effort:

**Start with:** #26 (campaignState — 5 impact, 2 effort), #66 (fan sign-up network error — 5 impact, 2 effort), #86 (LCP element — 5 impact, 1 effort), #51 (world map heading — 5 impact, 1 effort), #1 (Day 1 share card — 5 impact, 4 effort — do last in the quick-win order)

**Then:** #27 (sessionId), #28 (UTM capture), #29 (ref param), #56 (show id), #57 (show deletion by id), #87 (artwork aspect-ratio), #88 (Unsplash params)

**Batch in parallel where possible:** Dimension D error states (#66–#85) can run alongside Dimension E performance (#86–#99) since they touch different code paths.

---

*Cycle 2 total: 100 improvement points across 5 dimensions.*
*Each cycle targets the 5 lowest-scoring dimensions from the MASTER-SCORECARD.*
*Score target for Cycle 2 completion: Artist Success 7.5, CRM 7.5, World Map 7.5, Error States 8.5, Performance 8.0.*
*Created: 2026-03-17 | Next scorecard update: after Cycle 2 Wave 1 is complete.*
