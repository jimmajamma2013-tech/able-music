# G8 — Analytics Event Fidelity

**Dimension:** G8
**Category:** Phase 1 — Core Product Logic
**Phase:** 1

Every meaningful user action should fire a tracked analytics event with consistent shape. This dimension audits whether all CTA clicks, fan sign-ups, page views, campaign state changes, and in-admin actions are captured by `trackClick()` / `trackView()` in able-v8.html and their admin.html equivalents — and whether those events include source attribution from `getUtmSource()`.

---

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | `trackClick()` fires for hero CTA 1 tap — verify label matches `cta1.label` not hardcoded string | able-v8.html | High | Low | Low | 1 |
| 2 | `trackClick()` fires for hero CTA 2 tap — verify distinct label so both events are distinguishable | able-v8.html | High | Low | Low | 1 |
| 3 | Quick-action pill taps call `trackClick()` with pill label — confirm `renderPills()` binds handler to every rendered pill | able-v8.html | High | Low | Low | 1 |
| 4 | Fan sign-up form submission fires `trackClick({label:'fan-signup', type:'capture'})` — confirm event fires before or after localStorage write | able-v8.html | High | Low | Low | 1 |
| 5 | Fan sign-up form 2 (`fan-form-2`) fires identical event shape to fan-form — confirm parity | able-v8.html | High | Low | Low | 1 |
| 6 | `trackView()` called on `DOMContentLoaded` with current `getUtmSource()` value included in event | able-v8.html | High | Low | Low | 1 |
| 7 | `trackView()` owner-visit filter: `isOwnerVisit()` must return `true` to suppress self-inflated views — confirm suppression is active | able-v8.html | High | Low | Low | 1 |
| 8 | Music section stream CTA fires `trackClick({label:'stream', type:'music'})` — verify type field is set | able-v8.html | High | Low | Low | 1 |
| 9 | Show ticket link taps fire `trackClick({label:'ticket', type:'event'})` — confirm handler in `renderShows()` | able-v8.html | High | Low | Low | 1 |
| 10 | Merch buy/link taps fire `trackClick({label:'merch', type:'merch'})` — confirm handler in `renderMerch()` | able-v8.html | High | Low | Low | 1 |
| 11 | Snap card CTA taps fire `trackClick()` — confirm handler attached in snap card render loop | able-v8.html | High | Med | Low | 1 |
| 12 | Theme toggle does not fire a click event — decide whether theme changes should be tracked as a UX signal | able-v8.html | Low | Low | Low | 3 |
| 13 | Event RSVP interaction (if distinct from ticket link) fires unique event type — current code may collapse both to `type:'event'` | able-v8.html | Med | Low | Low | 2 |
| 14 | `trackClick()` event object shape: `{label, type, ts, source}` — confirm `source` always populated from `getUtmSource()` | able-v8.html | High | Low | Low | 1 |
| 15 | `trackView()` event object shape: `{ts, source}` — confirm `source` always populated, never `undefined` | able-v8.html | High | Low | Low | 1 |
| 16 | Events written to `CLICKS_KEY = 'able_clicks'` array — confirm `safeLS()` fallback is `[]` not `null` to prevent push crash | able-v8.html | High | Low | Low | 1 |
| 17 | Events written to `VIEWS_KEY = 'able_views'` array — same `safeLS()` null-guard check as above | able-v8.html | High | Low | Low | 1 |
| 18 | No deduplication of view events across page refreshes — each load writes one view; confirm this is intentional session-counting model | able-v8.html | Med | Low | Low | 2 |
| 19 | `sessionStorage` not used anywhere in analytics pipeline — all events go to `localStorage`; clarify if session-scoped dedup is needed | able-v8.html | Med | Low | Low | 2 |
| 20 | Campaign state on page load is not itself tracked as an event — add `trackView({state: computedState})` field for funnel analysis | able-v8.html | High | Low | Low | 1 |
| 21 | Pre-release countdown view does not fire a distinct event — analytics cannot distinguish pre-release vs profile views | able-v8.html | Med | Med | Low | 2 |
| 22 | Gig mode view does not fire a distinct event — same as above for gig state | able-v8.html | Med | Med | Low | 2 |
| 23 | Pre-save CTA tap tracked — confirm label is `'pre-save'` not the artist-entered release title (would fragment analytics) | able-v8.html | High | Low | Low | 1 |
| 24 | Overflow "More" pill expanded by user — this interaction is never tracked; add event for overflow engagement rate | able-v8.html | Med | Low | Low | 2 |
| 25 | Social platform pill taps (Spotify/Apple/etc.) fire `trackClick()` — confirm `type` is `'platform'` or similar | able-v8.html | High | Low | Low | 1 |
| 26 | Support/tip link tap tracked — confirm `type:'support'` event fires from support section handler | able-v8.html | High | Low | Low | 1 |
| 27 | Fan form dismissed/closed without submitting — this is not tracked; add abandonment event for conversion analysis | able-v8.html | Med | Med | Low | 2 |
| 28 | Video collage play/interaction fires no analytics event — video engagement currently invisible | able-v8.html | Med | Med | Low | 2 |
| 29 | `trackClick()` timestamp uses `Date.now()` — confirm system clock vs ISO string consistency with `trackView()` timestamps | able-v8.html | Med | Low | Low | 2 |
| 30 | Admin dashboard load does not fire a view event — admin visits logged to `admin_visit_dates` but not to `able_views`; confirm separation is intentional | admin.html | Med | Low | Low | 2 |
| 31 | Admin stat panel opened/closed is not tracked — no signal on which metrics artists care about | admin.html | Low | Low | Low | 3 |
| 32 | CSV export button click not tracked — analytics blind spot on which artists use data export | admin.html | Med | Low | Low | 2 |
| 33 | Campaign state changed via `saveCampaignHQ()` — no analytics event emitted; add tracking for state transition | admin.html | High | Low | Low | 1 |
| 34 | Gig mode toggled on via `toggleGigHQ()` / `setGigActive()` — no event emitted; this is a high-intent action worth tracking | admin.html | High | Low | Low | 1 |
| 35 | Gig mode expired naturally (24h timer) — no event emitted; add event so we can measure gig mode duration distribution | admin.html | Med | Low | Low | 2 |
| 36 | Release date set/changed in Campaign HQ — no event emitted; critical for understanding pre-release conversion rates | admin.html | High | Low | Low | 1 |
| 37 | Tier upgrade prompt impression not tracked — no data on how often artists see the gold lock | admin.html | High | Low | Low | 1 |
| 38 | Tier upgrade prompt CTA click not tracked — conversion funnel completely blind from ABLE's side | admin.html | High | Low | Low | 1 |
| 39 | Nudge dismissed via `dismissNudge()` — nudge ID stored in `able_dismissed_nudges` but no analytics event; add tracking for nudge effectiveness | admin.html | Med | Low | Low | 2 |
| 40 | Nudge CTA clicked (not dismissed) — no event; track nudge-driven actions separately from organic dashboard interactions | admin.html | Med | Low | Low | 2 |
| 41 | Fan starred via `starFan()` — no analytics event; fan engagement depth invisible | admin.html | Low | Low | Low | 3 |
| 42 | Fan unstarred — no analytics event | admin.html | Low | Low | Low | 3 |
| 43 | Fan list searched/filtered — no event; usage signal for CRM feature prioritisation | admin.html | Low | Low | Low | 3 |
| 44 | Snap card created — no event; usage signal for snap card feature value | admin.html | Med | Low | Low | 2 |
| 45 | Snap card edited — no event | admin.html | Low | Low | Low | 3 |
| 46 | Snap card deleted — no event | admin.html | Low | Low | Low | 3 |
| 47 | Profile link copied from admin — no event; critical for understanding share behaviour | admin.html | High | Low | Low | 1 |
| 48 | `checkFirstFanMoment()` triggers — `able_first_fan_seen` set but no analytics event fired; add first-fan milestone event | admin.html | High | Low | Low | 1 |
| 49 | First-run checklist item completed — each `frc-*` item completion should fire distinct event for onboarding funnel | admin.html | High | Low | Low | 1 |
| 50 | First-run checklist fully dismissed — `able_frc_dismissed` set but no event | admin.html | Med | Low | Low | 2 |
| 51 | Show added — no event in admin; show creation rate is an engagement health signal | admin.html | Med | Low | Low | 2 |
| 52 | Show edited — no event | admin.html | Low | Low | Low | 3 |
| 53 | Show deleted — no event | admin.html | Low | Low | Low | 3 |
| 54 | Show marked as featured — no event; understand which artists use featured show mechanic | admin.html | Low | Low | Low | 3 |
| 55 | Profile published for first time (wizard completion → first save) — no event; most important single moment in onboarding funnel | start.html | High | Low | Low | 1 |
| 56 | Wizard step completion events missing — no per-step tracking; cannot identify where artists drop off | start.html | High | Med | Low | 1 |
| 57 | Wizard back-navigation events missing — no signal on which steps cause confusion | start.html | Med | Med | Low | 2 |
| 58 | Accent colour picker used in wizard — no event; cannot measure colour preference distribution | start.html | Low | Low | Low | 3 |
| 59 | Theme selected in wizard — no event; cannot measure theme preference at point of first setup | start.html | Low | Low | Low | 3 |
| 60 | CTA type chosen in wizard — no event; cannot measure which CTA type is most popular at setup | start.html | Med | Low | Low | 2 |
| 61 | All analytics events lack a schema version field — when event shape changes, historical data becomes ambiguous | shared | High | Low | Low | 1 |
| 62 | Events lack `artistId` field — when multiple artist profiles share a device, events cannot be attributed to the correct profile | shared | High | Med | Low | 1 |
| 63 | Events lack `sessionId` field — cannot distinguish multiple sessions in same-day analytics | shared | Med | Med | Low | 2 |
| 64 | `able_clicks` array grows unbounded — no pruning logic; old events waste localStorage space and slow parsing | able-v8.html | Med | Low | Low | 2 |
| 65 | `able_views` array grows unbounded — same unbounded growth issue | able-v8.html | Med | Low | Low | 2 |
| 66 | Admin analytics display reads raw `able_clicks` — no aggregation layer; performance degrades as array grows | admin.html | Med | Med | Low | 2 |
| 67 | Click events do not record `deviceType` — cannot distinguish mobile vs desktop tap behaviour | able-v8.html | Med | Low | Low | 2 |
| 68 | View events do not record `referrer` — `getUtmSource()` captures `?src=` but misses direct-type traffic characterisation | able-v8.html | Med | Low | Low | 2 |
| 69 | `isOwnerVisit()` check missing from `trackClick()` — artist tapping their own CTAs inflates click data | able-v8.html | High | Low | Low | 1 |
| 70 | `trackView()` not called on hash-change navigation — single-page section changes look like one view regardless of depth | able-v8.html | Low | Med | Low | 3 |
| 71 | Admin analytics "Views today" counter reads `able_views` filtered by date — confirm timezone-safe date comparison (UTC vs local) | admin.html | Med | Low | Low | 2 |
| 72 | Admin "Clicks today" counter — same timezone-safety concern | admin.html | Med | Low | Low | 2 |
| 73 | Admin "Total fans" count reads `able_fans.length` directly — no event for milestone thresholds (10, 50, 100 fans) | admin.html | Med | Low | Low | 2 |
| 74 | Pre-save link click on pre-release state — confirm `type:'pre-save'` is stored distinctly from `type:'stream'` for comparison | able-v8.html | High | Low | Low | 1 |
| 75 | Snap card video play fires no event — snap card video engagement invisible | able-v8.html | Med | Med | Low | 2 |
| 76 | Snap card link click fires no event separately from general `trackClick()` — confirm snap card links fire with `type:'snap'` | able-v8.html | Med | Low | Low | 2 |
| 77 | `trackClick()` currently writes synchronously to localStorage — on low-end devices, sync write on tap can cause jank | able-v8.html | Low | Med | Low | 3 |
| 78 | Analytics data never flushed to Supabase — migration path from localStorage to server should batch-flush on first auth | shared | High | Med | Low | 1 |
| 79 | No analytics event for profile link share from able-v8.html (if Web Share API is used) — share completions invisible | able-v8.html | Med | Low | Low | 2 |
| 80 | No analytics event for Web Share API cancel — cannot distinguish intent-to-share from actual share | able-v8.html | Med | Low | Low | 2 |
| 81 | Merch section scroll-into-view not tracked — above-fold vs below-fold section reach is invisible | able-v8.html | Low | Med | Low | 3 |
| 82 | Events section scroll-into-view not tracked — same gap | able-v8.html | Low | Med | Low | 3 |
| 83 | Fan capture widget scroll-into-view not tracked — cannot measure fan form exposure rate | able-v8.html | Med | Med | Low | 2 |
| 84 | `computeState()` result not included in `trackView()` payload — cannot segment view data by campaign state post-hoc | able-v8.html | High | Low | Low | 1 |
| 85 | Admin dashboard never reads `able_views` to show artist their profile view count — event collection exists but display is missing | admin.html | High | Med | Low | 1 |
| 86 | Admin "Recent activity" feed does not include click events from fan-facing page — cross-page event aggregation missing | admin.html | Med | Med | Low | 2 |
| 87 | No event fired when fan email confirmation link is clicked (fan.html `?ref=email-confirm`) — email campaign effectiveness invisible | fan.html | High | Med | Low | 1 |
| 88 | fan.html page view not tracked at all — no `trackView()` call on fan dashboard load | fan.html | High | Low | Low | 1 |
| 89 | fan.html artist card click not tracked — fan→artist profile traffic attribution gap | fan.html | High | Low | Low | 1 |
| 90 | fan.html show RSVP/ticket click not tracked | fan.html | Med | Low | Low | 2 |
| 91 | Analytics events have no `platform` field — browser vs PWA installs indistinguishable | shared | Low | Low | Low | 3 |
| 92 | PWA install prompt accepted/dismissed — no event; cannot measure install conversion | able-v8.html | Med | Low | Low | 2 |
| 93 | Service worker cache hit vs network fetch not surfaced to analytics — PWA performance invisible | able-v8.html | Low | High | Low | 3 |
| 94 | `able_clicks` and `able_views` not validated on read — corrupted array (non-array value) would crash `admin.html` analytics display | admin.html | High | Low | Low | 1 |
| 95 | Admin export CSV includes all events with no date range filter — large exports could timeout or truncate on slow devices | admin.html | Med | Med | Low | 2 |
| 96 | No rate limiting on `trackClick()` — programmatic or bot traffic can bloat `able_clicks` array without cap | able-v8.html | Med | Med | Low | 2 |
| 97 | `trackView()` fires even if page is loaded in an iframe (embed preview) — iframe load inflates view count | able-v8.html | Med | Low | Low | 2 |
| 98 | Upgrade from free to Artist tier — no analytics event; revenue conversion invisible | admin.html | High | Low | Low | 1 |
| 99 | All analytics events stored locally with no unique event ID — duplicate events (from page refresh) cannot be deduplicated on migration | shared | High | Med | Low | 1 |
| 100 | Define and document the canonical event schema (label, type, ts, source, state, artistId, schemaVersion) in `docs/systems/analytics/SPEC.md` before writing any more event code | shared | High | Low | Low | 1 |

---

## Wave Summary

| Wave | Count | Theme |
|---|---|---|
| 1 | 38 | Missing events on core actions (hero CTAs, fan sign-up, campaign state change, gig toggle, tier upgrade impression/click, pre-save, schema version, artistId, flush-to-Supabase) |
| 2 | 40 | Gaps in secondary tracking (overflow pill, abandonment, admin actions, nudge events, snap cards, shows, sessionId, merch/snap video, scroll exposure, CSV export) |
| 3 | 22 | Nice-to-have signals (theme toggle, fan star/unstar, hash-change views, PWA events, section scroll-into-view, rate limiting) |
