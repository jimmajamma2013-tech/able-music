# ABLE — Cycle 15 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 14**
**Scores entering Cycle 15: Performance 8.5→? · World map 8.6→? · Tier gates 8.9→? · CRM 9.0→? · PWA 9.2→?**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Performance | 8.7/10 | 9.2/10 | C14 Wave 3 srcset + CSS lazy; admin dead code audit |
| B — World map | 8.6/10 | 9.1/10 | Gig countdown timer, show click-through, date grouping |
| C — Tier gates | 8.9/10 | 9.3/10 | Upgrade CTA refinements, gate preview polish |
| D — CRM | 9.0/10 | 9.3/10 | Fan notes search, activity feed labels, merge dupe detection |
| E — PWA | 9.2/10 | 9.5/10 | SW offline cache, install prompt copy, manifest improvements |

---

## Dimension A — Performance
*Score: 8.7/10 → target 9.2/10. C14 Wave 3 + admin code audit.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | `srcset` hero artwork: hero img — add `srcset` with 390w, 768w, 1200w variants via Unsplash URL params (`?w=390`, `?w=768`, `?w=1200`) and `sizes="100vw"` | V8 | 4 | 2 | L | 1 |
| 2 | Non-critical CSS lazy: snap card styles (`release-card`, `snap-card`, `.videos-section`) — verify they are not in a render-blocking separate `<link>` (they're inline — verify no duplicates) | V8 | 3 | 2 | L | 2 |
| 3 | Admin dead code audit: admin.html has 2500+ lines of CSS — verify no orphaned keyframes or selectors for removed features (gift card, merch-bento, removed modals) | ADM | 3 | 3 | M | 3 |
| 4 | `will-change` budget: verify `will-change: transform` is only on elements that actually animate — not applied blanket to all `.pressable` | ALL | 3 | 2 | L | 2 |
| 5 | Preload critical hero font glyphs: `Barlow Condensed` is used for artist name — verify it's in the preloaded font set with correct weights (700) | V8 | 3 | 1 | L | 1 |
| 6 | Hero video poster: when `topCard.type === 'video'`, the iframe has no `poster` attribute — add `poster="${artworkUrl}"` to prevent blank flash before video loads | V8 | 4 | 1 | L | 1 |
| 7 | Release section lazy render: `renderListenSection()` — verify it only fires when releases section is scrolled into view (IntersectionObserver) not on page load | V8 | 3 | 3 | M | 3 |
| 8 | Snap card images: snap card `<img>` — verify `width` and `height` attributes set (prevent CLS) | V8 | 3 | 1 | L | 1 |
| 9 | `loading="lazy"` on snap card images: snap card images below fold — verify `loading="lazy"` is set | V8 | 3 | 1 | L | 1 |
| 10 | Admin JS bundle: `posthog` and `supabase` both loaded synchronously — verify they're non-blocking (already at bottom of body; confirm no `<head>` script tags) | ADM | 3 | 1 | L | 1 |

---

## Dimension B — World Map
*Score: 8.6/10 → target 9.1/10. Gig countdown, show click-through, content density.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Gig countdown: when today's show is in `able_shows`, show a live countdown (HH:MM:SS) in the world-map gig moment panel — `setInterval` updating every second | V8 | 4 | 2 | M | 2 |
| 12 | Show click-through: each moment card in the world map section — verify tapping/clicking navigates to `show.ticketUrl` (or opens event section) | V8 | 4 | 1 | L | 1 |
| 13 | Date grouping: world-map moments — verify multiple shows on same date are grouped as one moment, not two overlapping entries | V8 | 3 | 2 | M | 2 |
| 14 | Empty world-map state: when no shows and no pre-release — verify section is hidden (not shown with blank content) | V8 | 4 | 1 | L | 1 |
| 15 | World-map moment label precision: `"Tonight"` vs `"Tomorrow"` vs `"In N days"` — verify labels use `diff === 0 ? 'Tonight' : diff === 1 ? 'Tomorrow' : \`In ${diff} days\`` | V8 | 3 | 1 | L | 1 |
| 16 | Pre-release moment: when `state === 'pre-release'` and `releaseDate` is set, world-map should show a "Drop day" moment at `releaseDate` | V8 | 3 | 2 | M | 2 |
| 17 | Gig moment accent: featured show moment card uses `profile.accent` for its dot/border — verify this is applied | V8 | 2 | 1 | L | 1 |
| 18 | Multiple shows display: when artist has 3+ upcoming shows, world-map shows max 3 nearest, with "+N more" link to shows section | V8 | 3 | 2 | M | 2 |
| 19 | World-map hidden when profile state = `live`: after release, world-map should revert to neutral or show "just released" moment, not a gig countdown | V8 | 3 | 2 | M | 3 |
| 20 | World-map section accessibility: `role="region"` and `aria-label="Upcoming moments"` — verify set on the section element | V8 | 2 | 1 | L | 1 |

---

## Dimension C — Tier Gates
*Score: 8.9/10 → target 9.3/10. Upgrade CTA clarity and local gate enforcement.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | Gold lock upgrade CTA value: blurred preview for "Fan CRM export" — verify the lock overlay copy says `"Export your full fan list. See where they came from."` not generic "Upgrade" | ADM | 4 | 1 | L | 1 |
| 22 | Broadcast gate: "Send a message" button in fan detail — verify upgrade overlay appears immediately (not just disabled button with no explanation) | ADM | 4 | 1 | L | 1 |
| 23 | Tier display: artist info section — verify current tier displays as "Free" / "Artist" / "Artist Pro" not internal enum keys | ADM | 3 | 1 | L | 1 |
| 24 | Fan cap gate: free tier 100 fan limit — verify nudge appears when `fans.length >= 90` (not just at 100) | ADM | 4 | 1 | L | 1 |
| 25 | Snap card gate: free tier 1 snap card — verify second snap card attempt shows upgrade prompt (not silently rejected) | ADM | 3 | 1 | L | 1 |
| 26 | Upgrade CTA click tracking: when user clicks any upgrade CTA — verify `{ label: 'upgrade-cta', type: 'upgrade', ts }` is pushed to `able_clicks` | ADM | 3 | 1 | L | 1 |
| 27 | Gate preview blur on analytics: gold-blur bars — verify `tabindex="-1"` prevents keyboard focus on blurred content | ADM | 2 | 1 | L | 1 |
| 28 | Campaign state gate: `gig` mode — verify Artist tier gate (not just free) prevents manual gig toggle beyond basic | ADM | 3 | 1 | L | 1 |
| 29 | Artist Pro preview: "Broadcast" feature in admin — verify a tasteful "coming soon" preview exists for Artist plan (not just hidden) | ADM | 3 | 2 | M | 2 |
| 30 | Lock overlay dismiss: gold lock overlay — verify pressing Escape dismisses the overlay | ADM | 2 | 1 | L | 1 |

---

## Dimension D — CRM
*Score: 9.0/10 → target 9.3/10. Fan notes quality, merge detection, activity feed labels.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Fan note search: `fansSearch` — verify it also searches fan `note` text (not just email + campaignName) | ADM | 4 | 1 | L | 1 |
| 32 | Duplicate detection: when new fan signs up with existing email — verify duplicate is not added to `able_fans` (deduplication by email) | V8 | 4 | 1 | L | 1 |
| 33 | Fan row starred icon: starred fan rows — verify they show a ★ or accent dot in the fan list (not just sortable but visually distinct) | ADM | 3 | 1 | L | 1 |
| 34 | Fan delete with note preservation: when fan is `soft_deleted` (deleted_at set) — verify their note is preserved in case of restore | ADM | 3 | 1 | L | 1 |
| 35 | Activity feed date labels: admin activity feed — verify entries show relative dates ("2 hours ago", "Yesterday") not raw timestamps | ADM | 3 | 1 | L | 1 |
| 36 | Fan count badge accuracy: fan list pill badge — verify count matches `confirmed` fans (not total including unconfirmed/deleted) | ADM | 4 | 1 | L | 1 |
| 37 | Fan level chip accessibility: level chips in fan detail — verify each chip has `aria-pressed` reflecting selection state | ADM | 2 | 1 | L | 1 |
| 38 | CSV export filename: `able-fans.csv` — verify it includes artist name or date: `able-fans-{name}-{YYYY-MM-DD}.csv` | ADM | 2 | 1 | L | 1 |
| 39 | Fan note character countdown: 280-char limit — verify the counter (`fanNoteCount`) updates on `input` event not just `change` | ADM | 2 | 1 | L | 1 |
| 40 | Fan filter pill "Direct" label: direct sign-ups — verify pill shows "Direct" not "direct" (capitalised) | ADM | 2 | 1 | L | 1 |

---

## Dimension E — PWA
*Score: 9.2/10 → target 9.5/10. SW cache policy and install prompt copy.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | SW offline cache strategy: service worker (if registered) — verify `StaleWhileRevalidate` for font requests and `CacheFirst` for static assets | ALL | 4 | 3 | M | 3 |
| 42 | Install prompt copy: `beforeinstallprompt` banner — verify it reads "Add to home screen — opens like an app." not generic "Install" | V8 | 3 | 1 | L | 1 |
| 43 | `manifest.json` `start_url`: verify `start_url` is `/?source=pwa` (with UTM param) not bare `/` | ALL | 3 | 1 | L | 1 |
| 44 | `manifest.json` `display_override`: verify `display_override: ["standalone", "browser"]` is set for progressive enhancement | ALL | 3 | 1 | L | 2 |
| 45 | `manifest.json` `screenshots`: add at minimum one `screenshots` entry (required for enhanced install UI on Android) | ALL | 3 | 2 | M | 2 |
| 46 | `theme-color` meta: verify `<meta name="theme-color">` uses artist accent in able-v8.html (not hardcoded admin amber) | V8 | 3 | 1 | L | 1 |
| 47 | `apple-touch-icon`: verify `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` exists in all 4 pages | ALL | 3 | 1 | L | 1 |
| 48 | Offline fallback page: when SW intercepts a failed navigation — verify it serves a minimal `offline.html` not a browser error | ALL | 3 | 3 | M | 3 |
| 49 | Add to home screen tracking: when user accepts install — verify a `{ label: 'pwa-install', type: 'pwa' }` click event is pushed | V8 | 2 | 1 | L | 1 |
| 50 | `maskable` icon: verify `manifest.json` has a `maskable` icon variant (required for Android adaptive icons) | ALL | 3 | 2 | M | 2 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (srcset hero) → #5 (Barlow preload verify) → #6 (hero video poster) → #8 (snap card width/height) → #9 (snap card loading=lazy) → #10 (admin JS placement) → #12 (show click-through) → #14 (empty world-map state) → #15 (moment label precision) → #17 (gig moment accent) → #20 (world-map aria) → #21 (gold lock copy) → #22 (broadcast gate overlay) → #23 (tier display label) → #24 (fan cap 90% nudge) → #25 (snap card gate prompt) → #26 (upgrade click tracking) → #27 (gate blur tabindex) → #28 (gig mode gate) → #30 (lock escape dismiss) → #31 (fan note search) → #32 (dupe email dedup) → #33 (starred row icon) → #35 (activity feed dates) → #36 (fan count badge) → #37 (level chip aria) → #39 (note char countdown) → #40 (Direct capitalised) → #42 (install prompt copy) → #43 (manifest start_url) → #46 (theme-color verify) → #47 (apple-touch-icon) → #49 (install tracking)

**Wave 2 (after Wave 1 committed):**
#4 (will-change audit), #11 (gig countdown timer), #13 (date grouping), #16 (pre-release moment), #18 (max 3 shows), #29 (broadcast preview), #34 (note on delete), #38 (CSV filename), #44 (display_override), #45 (manifest screenshots), #50 (maskable icon)

**Wave 3 (polish):**
#2 (CSS lazy audit), #3 (admin dead code), #7 (release section lazy), #19 (live state world-map), #41 (SW cache strategy), #48 (offline fallback)
