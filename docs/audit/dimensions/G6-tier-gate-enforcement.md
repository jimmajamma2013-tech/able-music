# Dimension G6 — Tier Gate Enforcement
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

The tier system is the commercial backbone of ABLE. Every gate that fails — either by allowing free users to access paid features or by failing to show the gold lock overlay where one is required — is either a revenue leak or a broken upgrade prompt. This dimension audits every feature behind a tier boundary and verifies that: free tier users genuinely cannot use Artist or Pro features; the gold lock overlay (blurred preview + upgrade CTA) appears where specified, not a blank space or a hidden element; and each tier boundary from free→artist, artist→artist-pro, and artist-pro→label is tested as a distinct transition. Full compliance means that the tier stored in `able_tier` is the single source of truth, that every component reads from it before rendering, that no feature is accidentally exposed by a race condition or missing check, and that the upgrade prompt is always specific — telling the artist exactly what they gain, not just "Upgrade."

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Create a single `getTier()` helper that reads `able_tier` from localStorage and validates it against the known set `["free","artist","artist-pro","label"]` | ALL | 5 | 1 | H | 1 |
| 2 | If `able_tier` is absent from localStorage, default to `"free"` — never crash, never grant elevated access | ALL | 5 | 1 | H | 1 |
| 3 | If `able_tier` contains an unrecognised string, default to `"free"` — no escalation path through typo | ALL | 5 | 1 | H | 1 |
| 4 | Document all tier-gated features in a single canonical reference table inside `docs/systems/tier-gates/SPEC.md` — every gate must be listed | ALL | 4 | 2 | L | 1 |
| 5 | Fan sign-up cap of 100 on free tier must be enforced on both V8 (stops accepting form submissions) and admin.html (shows warning at 80 and 100) | V8 | 5 | 2 | H | 1 |
| 6 | When free tier fan cap is reached, V8 fan capture form must show a graceful message to fans: "This artist's fan list is currently full" — not a broken form | V8 | 4 | 2 | M | 1 |
| 7 | Admin.html must show a gold lock overlay over the fan list section when fan count exceeds 100 on free tier, with copy: "Unlock up to 2,000 fans — Artist plan" | ADM | 4 | 2 | M | 1 |
| 8 | The gold lock overlay must show a blurred preview of the content beneath it — not an empty container or a placeholder illustration | ADM | 4 | 2 | M | 1 |
| 9 | Snap cards: free tier limited to 1 snap card — admin must prevent adding a second snap card and show gold lock on the "Add snap card" button | ADM | 4 | 2 | H | 1 |
| 10 | Snap cards: the gold lock on the "Add snap card" button must include the specific value proposition: "Unlimited snap cards — Artist plan" | ADM | 3 | 1 | L | 2 |
| 11 | Campaign modes (pre-release, live, gig) are Artist-tier features — free tier admin must show these controls as locked with gold overlay | ADM | 5 | 2 | H | 1 |
| 12 | Free tier artist should not be able to save a `stateOverride` of "pre-release", "live", or "gig" — the save action must be intercepted | ADM | 5 | 2 | H | 1 |
| 13 | If a free artist somehow has a `stateOverride` in localStorage (e.g. downgraded from Artist), V8 must ignore it and render profile state | V8 | 5 | 2 | H | 1 |
| 14 | Gig mode toggle is Artist-tier only — the 24hr gig toggle must be hidden behind gold lock on free tier | ADM | 4 | 2 | M | 1 |
| 15 | Fan email broadcasts are Artist Pro only — the "Send email" button in admin must show gold lock for free and artist tiers | ADM | 5 | 2 | H | 1 |
| 16 | Email broadcast gold lock copy must be specific: "Send emails to your whole list — Artist Pro plan" | ADM | 3 | 1 | L | 2 |
| 17 | Full fan CRM (starred fans, notes, segments) is Artist Pro only — this section must show gold lock for free and artist tiers | ADM | 4 | 2 | M | 2 |
| 18 | Fan CRM gold lock copy: "See who your most dedicated fans are — Artist Pro plan" | ADM | 3 | 1 | L | 2 |
| 19 | Advanced analytics (source breakdown, retention, conversion funnel) is Artist Pro only — basic stats visible to all, advanced locked | ADM | 4 | 2 | M | 2 |
| 20 | Advanced analytics gold lock must show a blurred chart preview behind the overlay — not a blank card | ADM | 4 | 3 | M | 2 |
| 21 | Advanced analytics gold lock copy: "See where your fans are coming from — Artist Pro plan" | ADM | 3 | 1 | L | 2 |
| 22 | Support packs (pay-what-you-want, subscription support) are Artist Pro only — the support section setup is locked for lower tiers | ADM | 4 | 2 | M | 2 |
| 23 | Label tier: multiple artist pages (up to 10) — admin must show a "You're on the Label plan — manage your artists" section only for label tier | ADM | 3 | 3 | L | 4 |
| 24 | Label tier: aggregate analytics across all artist pages — locked for all tiers below label | ADM | 3 | 3 | L | 4 |
| 25 | Label tier: API access flag — locked for all tiers below label | ADM | 2 | 2 | L | 5 |
| 26 | Team access (label tier) — adding collaborators or team members must be locked for free/artist/artist-pro | ADM | 3 | 3 | L | 4 |
| 27 | Every gold lock overlay must have a unique, reachable "Upgrade" CTA that links to or opens the upgrade flow — no dead-end overlays | ADM | 5 | 2 | M | 1 |
| 28 | "Upgrade" CTAs must never use the word "Upgrade" alone — always pair with the specific benefit ("Upgrade to Artist to unlock campaign modes") | ADM | 4 | 1 | L | 1 |
| 29 | Gold lock overlays must be keyboard-accessible — the upgrade button inside the overlay must be focusable and reachable by Tab | ADM | 3 | 2 | M | 2 |
| 30 | Gold lock overlays must not block access to free-tier features in the same section — only gate the Pro/Artist-gated element | ADM | 4 | 2 | M | 2 |
| 31 | Gold lock overlay must appear on top of blurred content using `position: absolute; inset: 0; z-index: 10` — not as a sibling that pushes content down | ADM | 3 | 2 | L | 2 |
| 32 | Blurred preview behind gold lock must use `filter: blur(4px)` and `pointer-events: none` — content should be visually present but non-interactive | ADM | 3 | 2 | L | 2 |
| 33 | Verify gold lock overlays do not expose sensitive fan data (emails, phone numbers) in the blurred preview — blur must be strong enough to obscure PII | ADM | 5 | 2 | H | 1 |
| 34 | Fan list blurred preview should show anonymised placeholder rows (e.g. "fan****@***.com"), not real email addresses even blurred | ADM | 5 | 2 | H | 1 |
| 35 | Tier gates must re-evaluate when `able_tier` changes in localStorage — a tier upgrade mid-session should unlock features without reload | ADM | 4 | 3 | M | 3 |
| 36 | Listen for `storage` events on `able_tier` and trigger a tier-refresh function across all gated components | ADM | 4 | 3 | M | 3 |
| 37 | Tier gate check must happen at render time, not at data-load time — gates must not be bypassable by manipulating localStorage after load | ADM | 5 | 2 | H | 1 |
| 38 | Server-side enforcement (Supabase RLS) will be the real gate when backend lands — client-side gating is UX only; document this clearly | ALL | 4 | 1 | L | 1 |
| 39 | For now, document that tier in localStorage is trust-on-client — no false sense of security; backend validation is required before any data is persisted | ALL | 4 | 1 | M | 1 |
| 40 | V8 (fan-facing profile) must not expose any tier information to fans — the tier system is entirely an admin concern | V8 | 4 | 1 | M | 1 |
| 41 | V8 fan capture form must enforce the 100-fan cap regardless of what `able_tier` says — count `able_fans.length` before accepting new sign-ups | V8 | 5 | 2 | H | 1 |
| 42 | Add a `canAccess(feature, tier)` utility function that centralises all feature-to-tier mappings | ALL | 5 | 2 | M | 1 |
| 43 | `canAccess` function should be the only place where tier logic lives — no scattered `if tier === "free"` checks across files | ALL | 5 | 3 | H | 2 |
| 44 | Feature flags in `canAccess` should be defined as a constant map: `TIER_FEATURES = { "campaign-modes": ["artist","artist-pro","label"], ... }` | ALL | 4 | 2 | L | 2 |
| 45 | Write out the full `TIER_FEATURES` map covering every gated feature — this map is the single source of truth for gating logic | ALL | 4 | 2 | L | 1 |
| 46 | Verify that `canAccess` returns false (not throws) for unknown feature names — defensive default | ALL | 3 | 1 | L | 1 |
| 47 | All gold lock overlays should be generated by a single `renderGoldLock(feature, upgradeTarget)` function — no duplicated overlay HTML | ADM | 4 | 3 | M | 2 |
| 48 | `renderGoldLock` must accept a custom benefit string so copy is always specific to the feature being locked | ADM | 4 | 2 | L | 2 |
| 49 | Test case: `able_tier = "free"` — campaign mode controls must show gold lock | ADM | 5 | 2 | H | 1 |
| 50 | Test case: `able_tier = "artist"` — campaign mode controls must be fully interactive | ADM | 5 | 2 | H | 1 |
| 51 | Test case: `able_tier = "artist"` — email broadcast must still show gold lock (Pro feature) | ADM | 5 | 2 | H | 1 |
| 52 | Test case: `able_tier = "artist-pro"` — email broadcast must be fully interactive | ADM | 5 | 2 | H | 1 |
| 53 | Test case: `able_tier = "artist-pro"` — label features (multi-page, API) must still show gold lock | ADM | 4 | 2 | M | 2 |
| 54 | Test case: `able_tier = "label"` — all features unlocked; no gold locks should be visible | ADM | 4 | 2 | M | 2 |
| 55 | Test case: `able_tier` absent — behaves identically to `"free"` | ADM | 5 | 1 | H | 1 |
| 56 | Test case: `able_tier = "enterprise"` (unknown value) — behaves identically to `"free"` | ADM | 4 | 1 | H | 1 |
| 57 | Playwright smoke test: load admin.html with `able_tier = "free"`, verify campaign mode section shows overlay with correct copy | ADM | 5 | 3 | M | 2 |
| 58 | Playwright smoke test: load admin.html with `able_tier = "artist"`, verify campaign mode section is interactive | ADM | 5 | 3 | M | 2 |
| 59 | Playwright smoke test: verify gold lock overlay blocks pointer events (clicking through the overlay should not interact with the locked feature) | ADM | 4 | 2 | M | 2 |
| 60 | Verify that the gold lock overlay's upgrade CTA fires a `click` analytics event so upgrade intent is tracked | ADM | 3 | 2 | L | 3 |
| 61 | Analytics event for upgrade click: `{label: "upgrade_intent", type: "tier_gate_click", feature: "[feature-name]", ts: ..., source: ...}` | ADM | 3 | 2 | L | 3 |
| 62 | Admin tier display: the admin header or settings section should show the artist's current tier clearly: "You're on the Artist plan" | ADM | 3 | 2 | L | 2 |
| 63 | Tier badge in admin must not show a plan name that implies more features than the tier has | ADM | 3 | 1 | L | 2 |
| 64 | The "Basic stats" section (page views, CTA taps, fan count) must remain fully visible and functional for free tier | ADM | 4 | 1 | M | 1 |
| 65 | Free tier basic stats should not be accidentally behind a gate — this is core value, not a Pro feature | ADM | 5 | 1 | H | 1 |
| 66 | Connections section (links to Spotify, Apple Music, etc.) must be available on all tiers including free | ADM | 4 | 1 | M | 1 |
| 67 | Profile editing (name, bio, artwork, accent colour) must be available on all tiers including free — it's the foundation | ADM | 5 | 1 | H | 1 |
| 68 | Verify that tier gating logic in start.html (onboarding) does not attempt to access Artist-only features during wizard steps | STR | 3 | 1 | M | 1 |
| 69 | start.html should write `able_tier = "free"` to localStorage on completion — new artists always start on free | STR | 4 | 1 | M | 1 |
| 70 | If `able_tier` is already set when start.html loads (returning user accidentally re-running wizard), do not downgrade — check before writing | STR | 4 | 2 | M | 2 |
| 71 | Landing page (landing.html) must not read `able_tier` — it's a marketing page with no per-user gating | LND | 3 | 1 | L | 1 |
| 72 | Tier upgrade flow (when artist taps an upgrade CTA) should open a modal or redirect to a pricing page — document which is the intended pattern | ADM | 4 | 2 | M | 2 |
| 73 | Upgrade modal must list specific features unlocked by the target tier — not a generic pricing table | ADM | 4 | 3 | M | 3 |
| 74 | Verify that dismissing the upgrade modal does not accidentally write a higher tier to localStorage | ADM | 5 | 1 | H | 1 |
| 75 | Ensure gold lock overlays pass WCAG AA contrast — the lock icon and copy must be readable over the blurred background | ADM | 3 | 2 | M | 2 |
| 76 | Gold lock overlay must not cover the section heading — the artist should always be able to read what the section is | ADM | 3 | 2 | L | 2 |
| 77 | Gold lock icon should use the amber accent (`--acc: #f4b942`) consistent with admin design system — not a random yellow | ADM | 3 | 1 | L | 1 |
| 78 | The word "Pro" in overlay copy must always refer to the "Artist Pro" plan by its full name on first mention to avoid ambiguity | ADM | 2 | 1 | L | 2 |
| 79 | Verify that the `able_fans` array length check for the 100-fan cap uses `.length` and not a separate counter variable that could drift | V8 | 4 | 1 | M | 1 |
| 80 | When an artist pro or label user views the fan list, `able_fans` array must not be truncated — all entries returned | ADM | 4 | 1 | H | 1 |
| 81 | If artist tier permits 2,000 fans and `able_fans.length` reaches 2,000, enforce the same graceful form-disable behaviour as the free-tier cap | V8 | 4 | 2 | M | 3 |
| 82 | Document the exact fan cap per tier: free=100, artist=2000, artist-pro=unlimited (or TBD), label=unlimited across all pages | ALL | 3 | 1 | L | 1 |
| 83 | Snap card limit: free=1, artist=unlimited — verify this is enforced at the "save snap card" action, not just at "add" | ADM | 4 | 2 | H | 1 |
| 84 | If a free artist has 0 snap cards and adds one, it must save successfully — the gate is at the second card, not the first | ADM | 5 | 1 | H | 1 |
| 85 | Verify snap card delete is not accidentally blocked by the free-tier gate (they should always be able to delete) | ADM | 4 | 1 | M | 1 |
| 86 | Verify that the free-tier snap card limit is rechecked after deletion — if artist deletes their one card, they can add a new one | ADM | 3 | 1 | M | 2 |
| 87 | Test case: artist (not free) downgrades to free (localStorage `able_tier` changed to "free") — second snap card becomes locked immediately | ADM | 3 | 3 | H | 4 |
| 88 | Downgrade scenario: artist with 150 fans downgrades to free — admin must show warning "You have 150 fans but the free plan holds 100; older fan data is preserved but list is capped on display" | ADM | 4 | 3 | H | 4 |
| 89 | Downgrade scenario: artist with active gig mode downgrades to free — gig mode must be cleared at tier check | ADM | 4 | 3 | H | 4 |
| 90 | Tier gates must not interfere with V8 rendering for fans — the fan-facing page never reads `able_tier` | V8 | 5 | 1 | H | 1 |
| 91 | The `canAccess` utility must be extracted to `shared/tier.js` so both admin.html and any future pages share identical logic | ALL | 5 | 2 | M | 2 |
| 92 | `shared/tier.js` must export both `getTier()` and `canAccess(feature)` as named exports compatible with vanilla `<script>` tag inclusion | ALL | 4 | 2 | L | 2 |
| 93 | Add a visible "Current plan" section in admin settings with a direct upgrade CTA for each tier below label | ADM | 3 | 2 | L | 3 |
| 94 | Verify that toggling DevTools and manually editing localStorage `able_tier` while admin.html is open re-evaluates gates within one render cycle | ADM | 4 | 3 | M | 3 |
| 95 | Add a note in CLAUDE.md or a code comment: client-side tier gating is UX scaffolding only — all enforcement must be duplicated server-side before launch | ALL | 3 | 1 | L | 1 |
| 96 | Ensure no tier-gated feature emits analytics events when in locked state — avoid logging phantom "feature used" events | ALL | 3 | 2 | M | 2 |
| 97 | Playwright test: set `able_tier = "free"`, verify fan form stops accepting submissions after 100 entries in `able_fans` | V8 | 4 | 3 | M | 3 |
| 98 | Playwright test: set `able_tier = "artist"`, verify campaign mode controls are interactive and state can be saved | ADM | 4 | 3 | M | 3 |
| 99 | Playwright test: verify that clicking the upgrade CTA inside a gold lock overlay does not navigate away from admin.html (modal pattern, not full redirect) | ADM | 3 | 2 | M | 3 |
| 100 | Create a tier-gate smoke test checklist document (`docs/qa/tier-gate-smoke-tests.md`) listing all gates with pass/fail criteria for manual QA | ALL | 3 | 2 | L | 2 |
