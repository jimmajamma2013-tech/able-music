# Dimension G9 — Source Attribution Capture
**Category:** Core Product Logic & User Flows
**Phase:** 1 (Foundation)
**Status:** Not started

Source attribution is the answer to the question every independent artist asks: where did these fans come from? When a fan arrives via an Instagram story, a TikTok bio link, or a direct text from a friend, that context is gold. It's what tells an artist that their TikTok audience converts to email fans better than their Spotify followers. This dimension audits every step of the attribution pipeline: URL parameters (`?ref=`, `?source=`, `utm_source`, `utm_medium`, `utm_campaign`) must be parsed the moment the page loads, stored in a session-scoped variable, and attached as `source` to every subsequent analytics event — fan sign-ups, CTA clicks, and page views — for the duration of that visit. Full compliance means no attribution is lost to a race condition, no parameter is silently dropped, UTM parameters are preserved exactly as the artist set them, and the attribution data stored in `able_fans` and `able_clicks` is queryable from the admin dashboard.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Parse URL params at the very first line of V8's init script — before any localStorage reads, DOM manipulation, or state calculation | V8 | 5 | 1 | H | 1 |
| 2 | Use `new URLSearchParams(window.location.search)` for parsing — not manual string splitting | V8 | 4 | 1 | M | 1 |
| 3 | Extract `?ref=` parameter: `params.get("ref")` | V8 | 5 | 1 | H | 1 |
| 4 | Extract `?source=` parameter: `params.get("source")` | V8 | 5 | 1 | H | 1 |
| 5 | Extract `utm_source`: `params.get("utm_source")` | V8 | 5 | 1 | H | 1 |
| 6 | Extract `utm_medium`: `params.get("utm_medium")` | V8 | 4 | 1 | M | 1 |
| 7 | Extract `utm_campaign`: `params.get("utm_campaign")` | V8 | 4 | 1 | M | 1 |
| 8 | Extract `utm_term`: `params.get("utm_term")` — optional but document if captured | V8 | 2 | 1 | L | 3 |
| 9 | Extract `utm_content`: `params.get("utm_content")` — optional but document if captured | V8 | 2 | 1 | L | 3 |
| 10 | Define the attribution resolution priority: `ref` → `source` → `utm_source` — first match wins, document this order | V8 | 5 | 1 | M | 1 |
| 11 | Store the resolved `source` string in a module-level constant: `const SESSION_SOURCE = resolveSource(params)` — available throughout the script | V8 | 5 | 2 | M | 1 |
| 12 | `SESSION_SOURCE` must never be mutated after initial resolution — attribution is set at landing time | V8 | 5 | 1 | H | 1 |
| 13 | `resolveSource(params)` should return `"direct"` (not null, not undefined, not empty string) when no params are present | V8 | 5 | 1 | H | 1 |
| 14 | `resolveSource` should sanitise the attribution string: trim whitespace, lowercase, limit to 100 characters | V8 | 4 | 1 | M | 1 |
| 15 | Reject attribution values that contain script injection patterns — strip `<`, `>`, `"`, `'` from attribution strings | V8 | 5 | 1 | H | 1 |
| 16 | Store all UTM params as a sub-object alongside the resolved source: `{ source: "instagram", utm: { source: "instagram", medium: "bio", campaign: "spring-drop" } }` | V8 | 4 | 2 | M | 2 |
| 17 | The `source` field on `able_fans` entries must use the resolved source string, not the raw `utm_source` | V8 | 5 | 1 | H | 1 |
| 18 | The `source` field on `able_clicks` entries must use the same resolved source string | V8 | 5 | 1 | H | 1 |
| 19 | The `source` field on `able_views` entries must use the same resolved source string | V8 | 5 | 1 | H | 1 |
| 20 | Attribution must persist for the entire page session — a fan who lands from Instagram, scrolls for 2 minutes, then signs up must have `source: "instagram"` on their fan record | V8 | 5 | 1 | H | 1 |
| 21 | `SESSION_SOURCE` should be stored in `sessionStorage` as a fallback if the user refreshes mid-session — retrieve on reload if params are absent | V8 | 4 | 2 | M | 2 |
| 22 | On `sessionStorage` retrieval, validate the stored value passes the same sanitisation checks as a fresh param parse | V8 | 4 | 1 | M | 2 |
| 23 | If `sessionStorage` is unavailable (private browsing), fall back to `"direct"` — never crash | V8 | 4 | 1 | M | 1 |
| 24 | Do not persist `SESSION_SOURCE` to localStorage — attribution is session-scoped, not permanent | V8 | 4 | 1 | M | 1 |
| 25 | Verify that navigating within V8 (e.g. opening a modal) does not reset `SESSION_SOURCE` | V8 | 4 | 1 | M | 1 |
| 26 | Verify that the URL is not modified or stripped by any JavaScript code before the attribution parse | V8 | 4 | 1 | M | 1 |
| 27 | Common attribution values should be normalised: `"ig"` and `"instagram"` both resolve to `"instagram"` — define a normalisation map | V8 | 3 | 3 | L | 3 |
| 28 | Normalisation map should cover common artist link variants: `"tiktok"` / `"tt"`, `"twitter"` / `"x"`, `"yt"` / `"youtube"` | V8 | 3 | 3 | L | 3 |
| 29 | Document the normalisation map in `docs/systems/analytics/SPEC.md` so artists know which values to use when building their links | ALL | 3 | 1 | L | 3 |
| 30 | When admin.html generates shareable links, it should append `?ref=[platform]` automatically for each social platform button | ADM | 5 | 3 | M | 2 |
| 31 | Admin "copy link" button should copy `https://ablemusic.co/[artistslug]?ref=instagram` not just the bare URL | ADM | 5 | 3 | M | 2 |
| 32 | Admin should offer per-platform link generation: Instagram, TikTok, Twitter/X, YouTube, Email, Direct — each with the correct `?ref=` | ADM | 5 | 3 | M | 3 |
| 33 | Admin per-platform links must be copyable with one tap on mobile — 44px tap target on copy button | ADM | 4 | 2 | L | 3 |
| 34 | Admin link generator must show a preview of the full URL before copying — not just a button | ADM | 3 | 2 | L | 3 |
| 35 | start.html should not generate or store any attribution data — it is a setup flow, not a fan-facing page | STR | 3 | 1 | L | 1 |
| 36 | landing.html UTM parameters are for landing page analytics, not artist attribution — document this separation | LND | 3 | 1 | L | 1 |
| 37 | Verify that `able_fans` entries store attribution correctly when a fan signs up with `?ref=tiktok` in the URL | V8 | 5 | 2 | H | 1 |
| 38 | Verify that `able_fans` entries store attribution correctly when a fan signs up with `?utm_source=instagram&utm_medium=bio` | V8 | 5 | 2 | H | 1 |
| 39 | Verify that `able_fans` entries store attribution correctly when no URL params are present — `source: "direct"` | V8 | 5 | 1 | H | 1 |
| 40 | Verify that `able_clicks` entries store attribution consistently with `able_fans` — same source resolution logic | V8 | 4 | 1 | M | 1 |
| 41 | Test case: `?ref=instagram` — `SESSION_SOURCE` should be `"instagram"` | V8 | 5 | 1 | H | 2 |
| 42 | Test case: `?source=tiktok` — `SESSION_SOURCE` should be `"tiktok"` | V8 | 5 | 1 | H | 2 |
| 43 | Test case: `?utm_source=email&utm_medium=newsletter` — `SESSION_SOURCE` should be `"email"` (utm_source wins in UTM-only case) | V8 | 4 | 1 | M | 2 |
| 44 | Test case: `?ref=instagram&utm_source=email` — `SESSION_SOURCE` should be `"instagram"` (ref takes priority) | V8 | 5 | 1 | H | 2 |
| 45 | Test case: `?ref=` (empty value) — should fall through to next param, ultimately `"direct"` | V8 | 4 | 1 | M | 2 |
| 46 | Test case: `?ref=%3Cscript%3E` (URL-encoded script tag) — sanitisation should produce a safe string or `"direct"` | V8 | 5 | 1 | H | 2 |
| 47 | Test case: `?ref=a-very-long-attribution-string-that-exceeds-100-characters...` — truncated to 100 chars | V8 | 3 | 1 | L | 2 |
| 48 | Test case: fan lands with no params, scrolls, then signs up — fan record shows `source: "direct"` | V8 | 5 | 1 | H | 2 |
| 49 | Test case: fan lands with `?ref=instagram`, scrolls for 30 seconds, then signs up — fan record still shows `source: "instagram"` | V8 | 5 | 2 | H | 2 |
| 50 | Test case: two fans in the same browser session but different tab visits — each tab maintains its own `SESSION_SOURCE` | V8 | 4 | 2 | M | 3 |
| 51 | Admin source breakdown chart must aggregate `able_fans` by `source` field correctly — count, not sum | ADM | 4 | 2 | M | 2 |
| 52 | Admin source breakdown must show `"direct"` as a labelled category, not a blank or null entry | ADM | 3 | 1 | L | 2 |
| 53 | Admin source breakdown copy: "Where your fans are finding you" — not "Source attribution" | ADM | 3 | 1 | L | 2 |
| 54 | Admin source breakdown must be visible on free tier — it's a core value proposition of the platform | ADM | 5 | 1 | M | 1 |
| 55 | Admin click source breakdown: `able_clicks` grouped by `source` — shows which platforms drive the most engagement | ADM | 4 | 2 | M | 3 |
| 56 | Admin view source breakdown: `able_views` grouped by `source` — shows which platforms drive the most traffic | ADM | 4 | 2 | M | 3 |
| 57 | Conversion rate per source: `(fans from source / views from source * 100)` — premium analytics, Artist Pro tier | ADM | 4 | 3 | M | 4 |
| 58 | When conversion per source is locked (Pro feature), show a blurred version with the top source name visible but count blurred | ADM | 3 | 3 | M | 4 |
| 59 | `utm_campaign` value should be stored separately on fan/click records to enable campaign-level analysis | V8 | 4 | 2 | M | 3 |
| 60 | `utm_medium` value should be stored separately to enable medium-level analysis (bio vs story vs post) | V8 | 4 | 2 | M | 3 |
| 61 | Schema extension: fan record with full attribution: `{email, ts, source, utm: {source, medium, campaign}}` — backwards compatible (utm is optional field) | V8 | 4 | 2 | M | 3 |
| 62 | Click record with full attribution: `{label, type, ts, source, utm: {source, medium, campaign}}` — optional utm field | V8 | 4 | 2 | M | 3 |
| 63 | View record with full attribution: `{ts, source, utm: {source, medium, campaign}}` — optional utm field | V8 | 4 | 2 | M | 3 |
| 64 | Existing records without `utm` field must not break admin analytics display — use optional chaining throughout | ADM | 4 | 1 | M | 2 |
| 65 | Verify that `encodeURIComponent` / `decodeURIComponent` is handled correctly — URLSearchParams handles decoding automatically | V8 | 3 | 1 | L | 1 |
| 66 | Verify that hash-based routing (if ever used) does not cause URL params to be lost before parsing | V8 | 3 | 2 | M | 2 |
| 67 | Verify that Netlify or any CDN does not strip query parameters before serving V8 — check `netlify.toml` redirect rules | ALL | 5 | 1 | H | 1 |
| 68 | Netlify redirects for V8 must preserve query string: use `query = :query` in the redirect rule if applicable | ALL | 5 | 1 | H | 1 |
| 69 | Verify that `netlify.toml` does not have a rule that normalises or removes UTM parameters | ALL | 4 | 1 | M | 1 |
| 70 | Test attribution end-to-end: artist generates an Instagram link in admin, scans the link in a test browser, signs up as a fan, verify fan record has `source: "instagram"` in admin | ALL | 5 | 3 | H | 2 |
| 71 | Playwright test: load V8 with `?ref=tiktok`, verify `able_views[0].source === "tiktok"` | V8 | 5 | 3 | M | 2 |
| 72 | Playwright test: load V8 with `?utm_source=email`, verify `able_views[0].source === "email"` | V8 | 5 | 3 | M | 2 |
| 73 | Playwright test: load V8 with no params, verify `able_views[0].source === "direct"` | V8 | 5 | 3 | M | 2 |
| 74 | Playwright test: load V8 with `?ref=instagram`, tap hero CTA, verify `able_clicks[0].source === "instagram"` | V8 | 5 | 3 | M | 2 |
| 75 | Playwright test: load V8 with `?ref=tiktok`, submit fan sign-up, verify `able_fans[0].source === "tiktok"` | V8 | 5 | 3 | M | 2 |
| 76 | Playwright test: load V8 with `?ref=<script>alert(1)</script>`, verify `SESSION_SOURCE` is sanitised | V8 | 5 | 2 | H | 2 |
| 77 | Document the attribution pipeline in `docs/systems/analytics/SPEC.md` as a numbered flow: parse → sanitise → normalise → cache → attach | ALL | 3 | 2 | L | 2 |
| 78 | Attribution resolution function should be a pure function with no side effects — makes it trivially testable | ALL | 4 | 2 | L | 2 |
| 79 | Add the `resolveSource(params)` function to `shared/analytics.js` alongside the tracking utilities | ALL | 4 | 2 | L | 2 |
| 80 | Verify that `resolveSource` is called only once per page load — not re-called on every event | V8 | 3 | 1 | L | 1 |
| 81 | When Supabase backend lands, source attribution should flow to the remote `fans` and `clicks` tables as a `source` column | ALL | 4 | 1 | L | 4 |
| 82 | Supabase `fans` table `source` column: VARCHAR(100), NOT NULL, DEFAULT "direct" — prepare schema note | ALL | 3 | 1 | L | 4 |
| 83 | Supabase `clicks` table `source` column: VARCHAR(100), NOT NULL, DEFAULT "direct" — prepare schema note | ALL | 3 | 1 | L | 4 |
| 84 | Future: Supabase Edge Function to deduplicate attribution sources server-side (normalise "ig" → "instagram" at ingest) | ALL | 2 | 3 | L | 5 |
| 85 | Admin link sharing section copy: "The more specific your link, the better you understand your audience" | ADM | 2 | 1 | L | 3 |
| 86 | Admin link generator should show an example: "Share this on Instagram → your fans from Instagram will be labelled" | ADM | 3 | 2 | L | 3 |
| 87 | Consider adding a QR code generator for the `?ref=venue` link for gig mode — scan at door, fans attributed to live show | ADM | 3 | 4 | L | 5 |
| 88 | Admin analytics section: "Top source" stat (the platform sending the most fans) must be a prominently displayed KPI | ADM | 4 | 2 | L | 3 |
| 89 | "Top source" copy: "Most of your fans are coming from [source]" — not "Top source: [source]" | ADM | 3 | 1 | L | 3 |
| 90 | When no attribution data exists yet (all entries are "direct"), show encouragement: "Share a platform-specific link to see where your fans come from" | ADM | 3 | 2 | L | 3 |
| 91 | Verify `resolveSource` handles the case where `window.location.search` is an empty string — returns `"direct"` | V8 | 4 | 1 | M | 1 |
| 92 | Verify `resolveSource` handles the case where `window.location.search` is `"?"` (question mark only) — returns `"direct"` | V8 | 3 | 1 | L | 1 |
| 93 | Verify `resolveSource` handles uppercase parameter names `?REF=instagram` — URLSearchParams is case-sensitive, document this | V8 | 3 | 1 | L | 2 |
| 94 | Verify that referrer-based attribution (`document.referrer`) is NOT used — URL params are the explicit, artist-controlled mechanism | V8 | 4 | 1 | M | 1 |
| 95 | Document why referrer is not used: it's unreliable (HTTPS→HTTP stripping), not intentional (artist didn't set it), and privacy-sensitive | ALL | 3 | 1 | L | 2 |
| 96 | Verify the attribution is not exposed in the page title or og:tags — it's internal analytics data, not public metadata | V8 | 3 | 1 | M | 1 |
| 97 | When artist shares their profile URL from admin, the copy-link action must include a tracking param — bare profile URL with no params should only be used when artist explicitly copies it | ADM | 4 | 2 | M | 3 |
| 98 | Verify that attribution params do not appear in the browser history pushState — they should be consumed, not re-shared | V8 | 3 | 2 | L | 3 |
| 99 | Use `history.replaceState` after attribution parsing to remove params from the visible URL (cleaner UI) while keeping the attribution in `SESSION_SOURCE` | V8 | 3 | 3 | L | 4 |
| 100 | Write end-to-end attribution test plan in `docs/qa/attribution-smoke-tests.md` covering all 5 attribution paths: ref, source, utm, combined, and none | ALL | 3 | 2 | L | 2 |
