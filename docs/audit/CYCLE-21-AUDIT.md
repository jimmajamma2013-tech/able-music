# ABLE — Cycle 21 Audit
**Generated: 2026-03-17 | Targeting Supabase production readiness, fan trust signals, admin UX tightening, and freelancer foundation**
**Scores entering Cycle 21: Artist profile 9.7 · Admin 9.9 · Landing 9.9 · Onboarding 9.9 · Fan dashboard 9.75 · Analytics system 9.2**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Supabase production | 7.5/10 | 8.5/10 | Fan sync, profile sync, RLS, magic link — wired but untested end-to-end |
| B — Fan trust signals | 9.5/10 | 9.7/10 | Fan confirmation copy, double opt-in flow, GDPR transparency |
| C — Admin UX tightening | 9.9/10 | 9.95/10 | Sparkline canvas resize on window resize; sheet title for snap card edit |
| D — Freelancer foundation | 8.7/10 | 9.0/10 | `freelancer.html` shell: identity header, credits strip, rate card |
| E — Analytics depth | 9.2/10 | 9.4/10 | Fan echo source match log; fan returning-same-channel flag; 30-day view |

---

## Dimension A — Supabase production readiness
*Score: 7.5/10 → target 8.5/10. All wired in C18/C19 — now validate at runtime.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan sync smoke test: manually verify `sbSyncFanSignup()` writes to `fans` table — confirm insert succeeds with correct `profile_id`, `email`, `source`, `ts` | V8 | 5 | 2 | H | 1 |
| 2 | Profile sync smoke test: verify `syncProfile()` in admin.html updates `profiles.name` + `profiles.accent` in Supabase | ADM | 5 | 2 | H | 1 |
| 3 | RLS insert test: confirm unauthenticated insert to `fans` is rejected (403) by Supabase RLS policy | DB | 5 | 1 | L | 1 |
| 4 | Magic link flow: verify `supabase.auth.signInWithOtp()` sends email and creates valid session on admin.html onboarding | ADM | 5 | 3 | H | 2 |
| 5 | Session expiry handling: when Supabase session expires mid-session — verify banner shows and re-auth works | ADM | 4 | 2 | M | 2 |
| 6 | Fan count consistency: verify `fans.count` in Supabase matches `able_fans` localStorage length after sign-up | V8 | 4 | 2 | M | 2 |
| 7 | Slug uniqueness constraint: verify `profiles.slug` has UNIQUE index in Supabase — collision causes silent auth failure | DB | 5 | 1 | L | 1 |
| 8 | RESEND_API_KEY confirm: verify env var is set in Netlify dashboard, send test email via confirmation endpoint | OPS | 5 | 1 | L | 1 |
| 9 | Fan confirmation email delivery: verify `/.netlify/functions/send-confirmation` sends to correct fan email | OPS | 4 | 2 | H | 2 |
| 10 | Supabase anon key rotation: check if current key (sb_publishable_pRmYph3...) is still valid — refresh if needed | OPS | 5 | 1 | L | 1 |

---

## Dimension B — Fan trust signals
*Score: 9.5/10 → target 9.7/10. Double opt-in copy, GDPR transparency, fan expectations.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Fan sign-up confirmation copy: after successful sign-up — echo card should read `"Check your inbox. [Name] will reach out directly."` when `profile.name` set | V8 | 4 | 1 | L | 1 |
| 12 | Double opt-in nudge: when fan signs up and `double_opted_in` is false — show gentle in-page nudge `"Check your inbox to confirm"` after 30s | V8 | 4 | 2 | M | 2 |
| 13 | Fan list GDPR count: in fan CRM — show `"X confirmed · Y unconfirmed"` split below fan count stat | ADM | 3 | 1 | L | 1 |
| 14 | Fan capture trust line: when `profile.name` set — show `"Just [Name]. No spam, no algorithm."` below email capture | V8 | 3 | 1 | L | 1 |
| 15 | Fan echo: when `state === 'pre-release'` — echo card includes `release.title` if set: `"[Title] is coming. You'll hear first."` | V8 | 3 | 1 | L | 1 |
| 16 | Fan echo: when `state === 'live'` — echo card: `"[Title] is out now. You heard it first."` | V8 | 3 | 1 | L | 1 |
| 17 | Privacy link in fan capture: small `"Privacy policy"` link below email input pointing to `/privacy.html` | V8 | 3 | 1 | L | 1 |
| 18 | Fan list empty — zero state quality: when fan list is empty — show artist name: `"No one on [Name]'s list yet. Share your page."` | ADM | 2 | 1 | L | 1 |
| 19 | Fan capture focus ring: email input on focus should use `box-shadow: 0 0 0 3px rgba(accent, 0.35)` — verify current CSS | V8 | 2 | 1 | L | 1 |
| 20 | Fan milestone at 100: add toast `"100 fans. That matters."` — consistent with 50-fan milestone pattern | ADM | 3 | 1 | L | 1 |

---

## Dimension C — Admin UX tightening
*Score: 9.9/10 → target 9.95/10. Sparkline resize, sheet title, edge cases.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | Sparkline canvas resize: `viewsSparkline` canvas redraws on `window.resize` — currently only draws on load | ADM | 3 | 1 | L | 1 |
| 22 | Snap card edit sheet title: `openAdminSheet` for snap card edit should have title matching card's own title (not just icon) | ADM | 2 | 1 | L | 1 |
| 23 | Click type card — `admin` type filter: clicks with `type: 'admin'` are internal ops — exclude them from the 'What people tapped' card | ADM | 3 | 1 | L | 1 |
| 24 | Sparkline tooltip: on canvas tap — show `"N views on [Day]"` tooltip for each bar | ADM | 3 | 2 | M | 2 |
| 25 | Analytics date range persistence: selected range (7d/30d/all) stored in `sessionStorage._a_range` — survives page tab switch | ADM | 2 | 1 | L | 1 |
| 26 | Gig mode countdown precision: gig timer shows `"X hours Y minutes"` below gig strip when < 4h remaining | ADM | 2 | 1 | L | 2 |
| 27 | Release card missing artwork: when `rel.artworkUrl` is missing — show `--color-card` placeholder with music note icon, not broken img | ADM | 3 | 1 | L | 1 |
| 28 | Show card date format: event date shows `"Tue 18 Mar"` (short weekday, day, short month) — verify current format | ADM | 2 | 1 | L | 1 |
| 29 | Admin snap card drag reorder: currently uses `sortOrder` number — add `↑↓` buttons as alternative for accessibility | ADM | 3 | 2 | M | 2 |
| 30 | Admin CRM search: verify search filters both starred and non-starred fans simultaneously | ADM | 3 | 1 | L | 1 |

---

## Dimension D — Freelancer foundation
*Score: 8.7/10 → target 9.0/10. Create freelancer.html shell with core sections.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | `freelancer.html` shell: identity header (name, title, avatar, verified badge), same dark theme as able-v8.html | NEW | 5 | 3 | M | 2 |
| 32 | Freelancer credits strip: ordered list of confirmed releases with role labels — asymmetry rule (handle = link, no handle = plain text) | NEW | 5 | 2 | M | 2 |
| 33 | Freelancer rate card: `"£X/project"` or `"From £X"` + rate type (mixing, production, video) + `"Available"` / `"Booked"` toggle | NEW | 4 | 2 | M | 2 |
| 34 | Freelancer booking enquiry: 4-field sheet (project type, artist name, estimated budget, message) — no marketplace signals | NEW | 4 | 2 | M | 2 |
| 35 | Freelancer OG card: `og:title` = `"[Name] — [Role] on ABLE"`, `og:description` = top 3 credits | NEW | 3 | 1 | L | 1 |
| 36 | Freelancer discovered-via: credits on artist release cards link to freelancer profile — verified in able-v8.html release card build | V8 | 4 | 1 | L | 1 |
| 37 | Freelancer admin layer: when `profile.freelancerEnabled === true` — admin.html shows Freelancer tab with credits + rate card management | ADM | 4 | 3 | H | 2 |
| 38 | Freelancer confirmed-by: credit `aria-label` uses `"Confirmed by [name]"` when `rec.confirmedBy` set — C19/C20 deferred | V8 | 3 | 1 | L | 1 |
| 39 | Freelancer landing section: landing.html includes a "For professionals" section after artist section — 2 cards (mixer/producer, videographer) | LND | 3 | 2 | M | 2 |
| 40 | Freelancer profile JSON-LD: `Person` schema with `jobTitle`, `knowsAbout`, `worksFor` on freelancer.html | NEW | 3 | 1 | L | 1 |

---

## Dimension E — Analytics depth
*Score: 9.2/10 → target 9.4/10. Fan source echo, 30-day filter, click rate by state.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Fan echo source match: when fan signs up — compare `signupSource` vs `SESSION_SOURCE` and log `returning_same_channel: true/false` to click event | V8 | 3 | 1 | L | 1 |
| 42 | Analytics 30-day sparkline: extend canvas sparkline to support 30-day view when `_analyticsRangeDays === 30` | ADM | 3 | 2 | M | 2 |
| 43 | Click rate by page state: in analytics — show CTR broken down by state (`pre-release` / `live` / `gig` / `profile`) | ADM | 4 | 2 | M | 2 |
| 44 | Top-clicked label card: show `"X people tapped [label]"` as a single-line highlight at top of analytics page | ADM | 3 | 1 | L | 1 |
| 45 | Fan echo on revisit: when returning fan (SESSION_SOURCE matches prior `signupSource`) — log `revisit_same_channel: true` | V8 | 3 | 1 | L | 2 |
| 46 | Admin analytics CSV: export raw click events as CSV (label, type, ts, source, zone) — Artist Pro gate | ADM | 4 | 2 | M | 2 |
| 47 | Sparkline resizes correctly when analytics tab is opened — canvas draws before width is known; use `requestAnimationFrame` after tab show | ADM | 3 | 1 | L | 1 |
| 48 | Click heatmap by hour: group clicks by hour of day (0–23), show 24-bar chart in Pro analytics gate preview | ADM | 3 | 2 | M | 2 |
| 49 | Fan growth rate: `"↑ X% vs last month"` computed from `able_fans` timestamps and shown as sub-stat on fan count | ADM | 3 | 1 | L | 1 |
| 50 | Views/day average: compute `(total views / days active)` and show as `"avg X views/day"` below sparkline | ADM | 3 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (fan sync smoke — manual) → #2 (profile sync smoke — manual) → #3 (RLS test — manual) → #7 (slug uniqueness — manual) → #8 (RESEND_API_KEY — manual) → #10 (anon key valid — manual) → #11 (fan echo copy) → #13 (GDPR count) → #14 (trust line) → #15 (pre-release echo) → #16 (live echo) → #17 (privacy link) → #18 (empty zero state) → #19 (focus ring verify) → #20 (100-fan milestone) → #21 (sparkline resize) → #22 (snap card sheet title) → #23 (filter admin clicks) → #25 (range persistence) → #27 (release card missing artwork) → #28 (show date format) → #30 (CRM search verify) → #35 (freelancer OG) → #36 (confirmed credit links) → #38 (confirmed-by aria) → #40 (freelancer JSON-LD) → #41 (source match log) → #44 (top-clicked label) → #47 (sparkline tab-open fix) → #49 (fan growth rate) → #50 (views/day average)

**Wave 2 (after Wave 1 committed):**
#4 (magic link — manual), #5 (session expiry — manual), #6 (fan count sync — manual), #9 (email delivery — manual), #12 (double opt-in nudge), #24 (sparkline tooltip), #26 (gig countdown precision), #29 (snap drag ↑↓ buttons), #31 (freelancer.html shell), #32 (credits strip), #33 (rate card), #34 (booking enquiry), #37 (admin freelancer tab), #39 (landing freelancer section), #42 (30-day sparkline), #43 (CTR by state), #45 (revisit same channel), #46 (analytics CSV), #48 (hour heatmap)

**Wave 3 (polish):**
Playwright smoke test across all 5 pages · Manual 375px · VoiceOver on real device · Lighthouse audit (capture pre-Supabase baseline)
