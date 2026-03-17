# ABLE — AI Agent Context File
**Read this first. Every session. Before touching anything.**
*Updated: 2026-03-17*

---

## Session start — read in this order

1. This file (CONTEXT.md) — orientation
2. `docs/STATUS.md` — current build state, what's next, known issues
3. `rules/javascript.md` — before writing any JS
4. `docs/pages/[page]/DESIGN-SPEC.md` — before editing that page
5. Relevant system `SPEC.md` — before touching that system

Navigation: `docs/FILE-STRUCTURE.md` (full 347-doc map) · `docs/INDEX.md` (alphabetical)
Codebase map: `PROJECT_INDEX.md` (section IDs, JS functions, localStorage schema)

---

## Files you touch (and only these)

| File | What it is |
|---|---|
| `able-v7.html` | Artist public profile — the fan-facing page |
| `admin.html` | Artist dashboard — where artists manage everything |
| `start.html` | Onboarding wizard — new artist setup |
| `landing.html` | Marketing landing page — ablemusic.co homepage |
| `fan.html` | Fan dashboard — in progress |
| `shared/able.js` | Shared JS utilities |
| `shared/style.css` | Shared CSS |

## Files you NEVER touch

| File | Why |
|---|---|
| `index.html` | Redirect only |
| `_archive/*` | Dead versions — reference only |
| `design-references/*` | Static research archive |
| `mockups/*` | Static mockups |
| `screenshots/*` | Playwright audit output — ephemeral, never reference in code |
| `able-v3.html` / `able-v6.html` | Superseded — leave at root, never edit |

---

## Authority order (read before any decision)

### The authority chain (in conflict, this order wins)
1. `docs/V8_BUILD_AUTHORITY.md` — **primary build authority** — read before any feature decision
2. `docs/v6/core/V6_BUILD_AUTHORITY.md` — design system details, micro-interactions, perf law (fallback when V8 silent)
3. `docs/v6/CANONICAL_OBJECT_MODEL.md` — all shared data structures
4. `docs/v6/PRODUCT_TRUTH.md` — root truth (any feature that contradicts this is wrong)
5. Engine specs (`docs/v6/engines/`) — feature-level detail not in 1–4
6. Page DESIGN-SPEC.md files — surface-specific implementation

### V8 strategy docs — PRIMARY BUILD AUTHORITY (2026-03-15)
Supersede all v6 surface docs for build decisions. When V8 is silent, fall back to V6_BUILD_AUTHORITY.md.

**Page build specs:**
| Page | Build spec | Score |
|---|---|---|
| `able-v7.html` | `docs/pages/profile/DESIGN-SPEC.md` | 9.7/10 |
| `admin.html` | `docs/pages/admin/DESIGN-SPEC.md` | 9.7/10 |
| `start.html` | `docs/pages/onboarding/DESIGN-SPEC.md` | 9.9/10 |
| `landing.html` | `docs/pages/landing/DESIGN-SPEC.md` | 9.65/10 |
| `fan.html` | `docs/pages/fan/DESIGN-SPEC.md` | 9.24/10 |

Per-page also read: `PATH-TO-10.md` (prioritised fixes) · `COPY.md` (all copy strings) · `FINAL-20-ANGLE-REVIEW-2.md` (final quality authority)

**System specs:**
| System | Spec | Score |
|---|---|---|
| Design tokens | `docs/systems/DESIGN_SYSTEM_SPEC.md` | 9.5/10 |
| Micro-interactions | `docs/systems/MICRO_INTERACTIONS_SPEC.md` | 9.5/10 |
| Cross-page journeys | `docs/systems/CROSS_PAGE_JOURNEYS.md` | 9.0/10 |
| Copy system | `docs/systems/copy/SPEC.md` | 9.5/10 |
| Data architecture | `docs/systems/data-architecture/SPEC.md` | 9.3/10 |
| SEO + OG cards | `docs/systems/seo-og/SPEC.md` | 9.0/10 |
| Email system | `docs/systems/email/SPEC.md` | 9.5/10 |
| Tier gates | `docs/systems/tier-gates/SPEC.md` | 9.0/10 |
| Brand identity | `docs/systems/brand-identity/SPEC.md` | 5.0/10 → 8.5/10 post-P1 |
| Analytics | `docs/systems/analytics/SPEC.md` | 6.2/10 → 9.5/10 spec-complete |
| Error states | `docs/systems/error-states/SPEC.md` | 3.5/10 → 9.0/10 spec-complete |
| PWA | `docs/systems/pwa/SPEC.md` | 0.6/10 → 8.5/10 spec-complete |
| Legal compliance | `docs/systems/legal-compliance/SPEC.md` | 2.0/10 GDPR → 8.5/10 spec-complete |
| AI copy | `docs/systems/ai-copy/SPEC.md` | active |
| Killer features | `docs/systems/killer-features/SPEC.md` | P0/P1 build queue |
| Freelancer auth | `docs/systems/freelancer-auth/SPEC.md` | Phase 2 — pre-launch gate |
| Tiers | `docs/systems/tiers/SPEC.md` | pre-launch gate |
| Monetisation | `docs/systems/monetisation/SPEC.md` | pre-launch gate |
| World Map | `docs/systems/world-map/SPEC.md` | 9.2/10 |
| CRM | `docs/systems/crm/SPEC.md` | 4/10 → path in PATH-TO-10.md |
| Spotify import | `docs/systems/spotify-import/SPEC.md` | 9.0/10 |
| Growth loop | `docs/systems/growth-loop/SPEC.md` | 7.0/10 |

### V6 core docs — product truth (not superseded)
1. `docs/v6/core/V6_BUILD_AUTHORITY.md` — resolved design decisions (fallback when V8 silent)
2. `docs/v6/PRODUCT_TRUTH.md` — what ABLE is (non-negotiable)
3. `docs/v6/core/VISUAL_SYSTEM.md` — 7 genre vibes, fonts, accent values
4. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — copy voice, banned phrases

### Strategic reference (read when relevant)
- `docs/VOICE-BIBLE.md` — 1-page voice guide
- `docs/ABLE_STRATEGY.md` — product vision, North Star, metrics
- `docs/DECISION-LOG.md` — all major decisions with reasoning
- `docs/COMPONENT-LIBRARY.md` — reusable UI components with exact HTML/CSS
- `docs/GPT-REVIEW/GPT-RESPONSE-NOTES.md` — validated strategic insights from external GPT review
- `docs/GPT-REVIEW/CURRENT-STATE-FULL-REVIEW.md` — full implementation audit (2026-03-16)
- `docs/GPT-REVIEW/SESSION-16-03-26-FULL-REVIEW.md` — session review output
- `docs/research/` — 11 focused research files (competitive moat, fan mechanics, gig UX)
- `docs/reference/research/PRODUCT_HIERARCHY_AND_TRUST.md` — ranked feature priorities
- `docs/MARKET_SIZING.md` / `docs/COMPETITIVE_INTELLIGENCE.md` — market context

### DEPRECATED — do not use for build decisions
- `docs/v6/surfaces/ARTIST_PROFILE.md` → superseded by `docs/pages/profile/DESIGN-SPEC.md`
- `docs/v6/surfaces/ADMIN.md` → superseded by `docs/pages/admin/DESIGN-SPEC.md`
- `docs/v6/surfaces/ONBOARDING.md` → superseded by `docs/pages/onboarding/DESIGN-SPEC.md`
- `docs/v6/surfaces/LANDING.md` → superseded by `docs/pages/landing/DESIGN-SPEC.md`
- `docs/pages/*/SPEC.md` → superseded by `docs/pages/*/DESIGN-SPEC.md` for each page

---

## Hard rules (memorise these)

### JS
- Parse-check every `<script>` block: `node -e "new Function(src)"`
- Use `safeLS()` / `safeSet()` wrappers for all localStorage access — never raw
- Wrap init in `DOMContentLoaded` — no bare top-level execution
- No `eval()`, `document.write()`, or `innerHTML` with untrusted data
- No `var` — always `const` or `let`
- No `console.log` or `debugger` in committed code
- Full reference: `rules/javascript.md`

### CSS
- CSS custom properties only — never hardcoded hex in rules
- No inline styles except JS-computed dynamic values
- Admin uses `--dash-*` token set — never mix into artist profile CSS
- Spacing uses 4px grid (`--sp-1` through `--sp-16`)
- All 4 themes must work after any CSS change

### Mobile
- 44px minimum tap targets — always
- No horizontal scroll at 375px
- All iframes: `max-width: 100%` + `aspect-ratio` set
- Test at 375px (iPhone SE) and 390px (iPhone 14) after every HTML change

### Copy
- Read `docs/VOICE-BIBLE.md` before writing any UI text
- Banned: "Turn fans into superfans", "Grow your audience", "Monetise", "Content creator", "Going viral", "Get started!", "You're all set!", exclamation marks in dashboard
- Dashboard greetings: "Good to see you, [Name]." — warm, one beat, done
- Copy test: Would a credible artist be embarrassed? Does it sound like a startup? If yes — rewrite
- Best single-sentence product description (from GPT review, validated): *"A music-native bio link that turns moments of attention into owned fan relationships, while adapting automatically to the artist's release cycle."*

### Rendering
- Render from localStorage immediately — never wait for API calls before showing content
- External API failure → degrade to cached data → manual data → hidden section. Never blank a shell.
- Performance budgets (hard): LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.10 · HTML ≤ 340kB gzipped

### AI copy (when writing AI-assisted features)
System prompt prefix for ALL ABLE AI requests:
```
You are a copy assistant for ABLE, a platform for independent musicians.
Write in the artist's voice: first person, honest, direct, no marketing language.
Never use: "superfans", "monetise", "grow your audience", "content creator",
"going viral", exclamation marks, generic SaaS phrases.
Write short. Say one true thing. Stop.
```
Always show as suggestion, never auto-apply. 3 variants when possible.

### Git & files
- Never rename `able_*` localStorage keys — they map 1:1 to Supabase tables
- Never touch `index.html`, `_archive/`, `mockups/`, `screenshots/`, `design-references/`
- Conventional commits: `feat:` / `fix:` / `docs:` / `refactor:` / `chore:`
- Never force-push, `reset --hard`, or `rm -rf` without explicit instruction
- Never claim "it works" without showing evidence

---

## Design tokens (commit these to memory)

### able-v7.html (artist profile)
```css
--color-bg:     #0d0e1a   /* Midnight Navy */
--color-card:   #12152a
--color-accent: artist-set /* default #e05242 */
--font:         'DM Sans'
--font-display: 'Barlow Condensed'
Spring easing:  cubic-bezier(0.34, 1.56, 0.64, 1)
Decel easing:   cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### admin.html (dashboard — separate token set)
```css
--bg:       #09090f
--acc:      #f4b942   /* Amber — never use artist accent here */
--font:     'Plus Jakarta Sans'
--font-d:   'Barlow Condensed'
--dash-card:   #f8f5f0
--dash-border: #cdc8c0 (was #d4cfc8)
--dash-text:   #1a1a2e
--dash-t3:     #767676 (WCAG AA — never go lighter)
```

### Four themes — ALL must work after any CSS change
- **Dark** (default): `#0d0e1a` base
- **Light**: cream `#f0ede8` base, dark text
- **Glass**: `backdrop-filter: blur(28px) saturate(180%)` — needs background image to be meaningful
- **Contrast**: pure `#000000` base, 4.5:1 contrast ratio everywhere

### Brand identity rule
One CSS variable (`--color-accent`) controls everything: hero CTA, selected states, countdown ring, fan confirmation, live mode indicator. Every artist's page is a different visual experience while remaining recognisably ABLE.

---

## Data architecture (localStorage — never rename keys)

| Key | Contents |
|---|---|
| `able_v3_profile` | Artist profile (name, bio, accent, theme, state, release, CTAs) |
| `able_fans` | Fan sign-ups [{email, ts, source, optIn, consentVersion}] |
| `able_clicks` | CTA tap events [{label, type, ts, source, sessionId}] |
| `able_views` | Page view events [{ts, source, sessionId, isArtist}] |
| `able_gig_expires` | Unix timestamp when gig mode expires |
| `able_shows` | Shows list [{id, venue, date, city, doorsTime, ticketUrl, featured}] |
| `able_dismissed_nudges` | Dismissed nudge IDs (string array) |
| `able_starred_fans` | **Deprecated** — migrate to Fan.isStarred on fan object |
| `able_tier` | Current tier: `"free"` / `"artist"` / `"artist-pro"` / `"label"` |
| `able_profile` | Legacy wizard key — admin.html runs `migrateWizardKey()` on load |
| `able_clips` | Clips array — see `docs/systems/reels-feed/SPEC.md` |
| `admin_visit_dates` | ISO date strings of admin.html loads (nudge timing) |
| `fan_following` | Fan-followed artist slugs — fan.html only |
| `fan_location` | Fan location {city, country, lat, lng} — fan.html only |

These keys map 1:1 to Supabase tables when backend lands. Never rename.

---

## Page states (Campaign HQ)

| State | When | Fan sees |
|---|---|---|
| `profile` | Default / 14d+ post-release | Info, latest release stream CTA |
| `pre-release` | Future release date set | Countdown, pre-save CTA |
| `live` | Release date reached | Top card media, stream CTA |
| `gig` | Manual 24hr toggle | Tickets front, "on tonight" tag |

Auto-switch: `now < releaseDate → pre-release` → `now < releaseDate+14d → live` → `profile`
Override via `profile.stateOverride`. Gig mode: manual, 24hr, stored in `able_gig_expires`.

---

## CTA architecture (never regress)

1. **Hero CTAs** — max 2. Primary = accent fill. Secondary = ghost.
2. **Quick Action pills** — max 4 narrow / 6 wide + overflow toggle.
3. **Section Actions** — max 2 per section.

**Global dedupe rule:** Same URL cannot appear in multiple zones. Hero wins.

---

## System governance — one law per system

| System | The law |
|---|---|
| Copy | If it sounds like a startup, a form, or hustle culture — rewrite it |
| Brand identity | `--color-accent` controls everything. One variable = full artist rebrand |
| Tier gates | Gold lock = blurred preview + specific value prop. Never generic "Upgrade" |
| Analytics | One centralised `trackEvent()` function. No ad-hoc source detection anywhere |
| Email | Confirmation email is from the artist, not ABLE. ABLE appears in footer only |
| Data architecture | Never rename localStorage keys. They are Supabase table names |
| Fan capture | GDPR Article 7 consent text must be visible before submit — "Just the artist. No spam." is not compliant |
| OG cards | `og:image` must be an `https://` URL — data: URIs don't produce valid share cards |
| PWA | Icons must be verified on real devices — broken home screen icons destroy premium feel |

---

## Active build backlog (open gaps — in priority order)

Items confirmed done per STATUS.md are removed. Fix remaining in sequence.

1. **Fan confirmation email → `?artist=slug&ref=email-confirm`** — add URL param in fan-confirmation.js. Unlocks fan activation flow. (Note: RESEND_API_KEY env var is a separate manual task for James at resend.com/domains)
2. **GDPR consent text on fan capture** — visible disclosure required before submit (Article 7). `consent_ts` field added but front-end disclosure text may still be absent.
3. **Near me location capture** — currently hardcoded to London in fan.html. Trust leak.
4. **Verify PWA icons on real devices** — Playwright screenshot is not enough. Broken home screen icons destroy premium feel.
5. **Profile completeness signal in admin** — show new artists what's missing (name, artwork, first CTA).
6. **Remove any remaining emoji from admin.html** — find + replace across file.
7. **og-default.jpg** — must exist at `https://ablemusic.netlify.app/og-default.jpg`. Create in Figma + deploy. (James's task — needs Figma access)

**Already done (do not re-fix):**
- `--dash-t3` #888888 → #767676 WCAG fix ✅ session 11
- Hardcoded `#888` instances → `var(--dash-t3)` ✅ session 11
- First-fan moment in admin.html ✅ session 11
- og:image data: URI fix ✅ session 13
- Copy banned phrase audit ✅ sessions 4 + 13
- Campaign mode descriptions (`MODE_DESCS` object) ✅ session 11
- Credits handle field in admin ✅ session 11

---

## Competitive positioning (never lose sight of these)

Three gaps no competitor addresses:
1. **Campaign-aware profile** — no competitor has pre-release/live/gig states
2. **Direct fan ownership, 0% cut** — Beacons takes 9%, Feature.fm meters email after 200
3. **Artist identity at depth** — 7 vibes × 4 themes × 4 feels (competitors are menus)

Market: 500k artists actively managing a fanbase globally. UK TAM alone: £945k–£2.8M ARR at 5–15% penetration.

---

## Tools & skills — quick reference

### Installed Claude Code skills (`~/.claude/skills/`)

| Skill | When to use |
|---|---|
| `webapp-testing` | After every significant change — Playwright smoke tests, visual regression, accessibility |
| `distinctive-frontend` | Building new sections, refactoring CSS — enforces token-only approach |
| `javascript-pro` | Complex JS features, async orchestration, event handling |
| `web-asset-generator` | Generating favicons, PWA icons, OG images from logo |
| `supabase` | Backend schema, migrations, RLS, JS client — Phase 2 only |

### Plugin skills (compound-engineering + superpowers)

| Skill | When to use |
|---|---|
| `ce:brainstorm` | Before any feature — explore intent first |
| `ce:plan` | Turn spec into implementation plan |
| `ce:work` | Execute a plan task by task |
| `ce:review` | Exhaustive code review after a major chunk |
| `micro-interactions` | Any animation work — ABLE easing curves |
| `mobile-design-philosophy` | Verify 44px targets, 375px layout, tap feedback |
| `aria-implementation` | WCAG 2.2 AA — run before shipping any page |
| `screenshot` | iPhone-width screenshots of able-v7.html and admin.html |
| `sync-tokens` | Audit CSS properties against design system spec |
| `design-review` | 10-point quality check — run after UI changes |
| `check-themes` | Cycle all 4 themes with screenshots |

### MCP servers (active)

| MCP | What it does | When to use |
|---|---|---|
| **Playwright** | Browser automation, screenshots, testing | After every significant UI change |
| **Figma** | Read design files, extract tokens, compare to implementation | When syncing design to code — file: `https://www.figma.com/design/fDxJVGjxmb9ybRb4pjk7s5/Able-VS` |
| **Supabase** | Direct DB queries, schema changes, migrations | Phase 2 backend work |
| **Netlify** | Deploy previews, function logs, site management | Deployment and function debugging |
| **Context7** | Up-to-date library docs (Supabase, Resend, Stripe syntax) | External library research only |

---

## Supabase (when backend work needed)

- Project URL: `https://jgspraqrnjrerzhnnhtb.supabase.co`
- CDN: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`
- Table definitions: `docs/v6/operational/BACKEND_SCHEMA.md`
- Migration plan: `docs/systems/data-architecture/SPEC.md`

---

## P0 killer features — build these next (complete specs with code)

All three are V1, zero backend required. Specs with exact implementation code in `docs/systems/killer-features/SPEC.md`.

| Feature | Status | Complexity | Why it matters |
|---|---|---|---|
| **Auto-gig from calendar** | Built (partially) | S | Page activates at doors time without artist touching anything |
| **Day 1 share card** | NOT BUILT | S | Most important missing feature — converts setup into first share |
| **Deep link campaigns** | NOT BUILT | M | `?campaign=vinyl-restock` → auto-scroll + source tagging |
| **One-tap release announcement** | NOT BUILT | M | Live state → snap card + caption + email in one tap |
| **QR code for gig mode** | NOT BUILT | S | "Put this on your flyers." |

**Day 1 share card copy** (exact — do not change):
- Headline: `"Your page is live."` — not "You're all set", not "Welcome"
- Copy link button: `"Copy link"` → `"Copied"`
- IG caption pre-fill: `"My page is live.\n\nMusic, shows, and updates — all in one place.\n\n[url]"`
- Tweet pre-fill: `"My page is live. [url]"`
- Links: `"See my page"` · `"Go to your dashboard"`

---

## Locked strategic decisions — do not revisit

| Decision | What's locked |
|---|---|
| **Auth** | Magic link email only. No Google/Apple OAuth — ever. |
| **Backend** | localStorage Phase 1. Supabase Phase 2. Keys map 1:1. |
| **Campaign states** | Exactly 4: profile / pre-release / live / gig. No fifth state. |
| **Fan list cap** | 100 on free tier. Hard cap. Upgrade trigger at 100. |
| **Revenue** | 0% cut on support payments (Stripe fee only). Subscription only. |
| **Fonts** | DM Sans (profile body) + Barlow Condensed (display). Plus Jakarta Sans (admin only). Never swap. |
| **"ABLE"** | Always all-caps. Never "Able". |
| **Privacy** | No Google Analytics, no Facebook Pixel. First-party only. |
| **Performance** | LCP ≤2.5s, HTML ≤340kB gzipped. |
| **14-day live window** | Auto-reverts to profile state 14 days after release date. |
| **Focus ring** | Glow pattern: `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--acc)` — not flat outline. |

---

## 11/10 copy — use exactly these strings

From `docs/systems/transcendence/WHAT-11-LOOKS-LIKE.md` — specific copy that must appear verbatim:

| Moment | Copy |
|---|---|
| Wizard done screen | `"Your page is live."` — 3 words, nothing else |
| Admin day of show | `"You're on tonight."` — replaces normal greeting |
| First fan ever (0→1) | `"Your first fan. This is how every list starts."` — shown once, never again |
| Fan list empty state | `"When fans sign up on your page, they'll appear here. Your list. Your relationship. No algorithm in the way."` |
| Error copy | `"That didn't go through. Try again?"` |
| Magic link email | `"Here's your link. It expires in 1 hour."` — no boilerplate, no footer |
| Support fees | `"0% taken by ABLE. Stripe standard fee only."` |
| Made with ABLE | `"Made with ABLE ✦"` — ✦ appears in exactly one place across the entire platform |

**Philosophy:** The product knows what moment the artist is in. It reads data (shows, release dates, fan count) and responds without being asked. This is the single most important product principle.

---

## Growth strategy — channel priority

From `docs/GROWTH_STRATEGY.md`. Producer seeding is the engine.

| Channel | Priority | Why |
|---|---|---|
| **Producer seeding** | 1 | One producer → 10 artists. Cost: 1 free Artist Pro (£19/mo). ROI: £96/mo recurring |
| **SEO articles** | 2 | 90–180 day payoff. Already compounding |
| **Made with ABLE loop** | 3 | Every artist share = free acquisition. Zero cost. |
| **Personal brand (X)** | 4 | Media asset, not quick win |
| **Reddit** | 5 | r/WeAreTheMusicMakers, r/musicmarketing — warm community |
| **Affiliate** | 6 | Day 1. 1 month free per conversion. |
| **Product Hunt** | 7 | Only when 10+ real artists active |

**Validation gate:** 10 paying artists in 30 days via direct DM. Exit trigger: £5k MRR × 3 months → resign.

---

## P0 bug fixes — before any feature work

From `docs/BUILD-READY-INDEX.md`. Fix these first, they take ~1 hour total:

1. `admin.html` — `--dash-t3` is `#888888` (WCAG AA fail) → change to `#767676`
2. `admin.html` — hardcoded `#888` fallback at L182, L184, L536, L617 → replace with `var(--dash-t3)`
3. `able-v7.html` — `<meta name="description">` has no `id` → add `id="meta-description"`
4. `able-v7.html` — `og:image` broken for data:/blob: URIs → skip setting when not an https:// URL
5. `admin.html` — `able_profile` / `able_v3_profile` key conflict → migrate on load in `initAdmin()`
6. All files — focus ring uses flat outline → implement `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--acc)`

---

## Phase 2 — do NOT build in V1

These specs are complete and referenced here so agents know they exist — but building them now would derail V1.

| Feature | Spec | Why it's Phase 2 |
|---|---|---|
| Showcase mode (press/booking) | `docs/v6/operational/SHOWCASE_CAMPAIGN_MODE_SPEC.md` | Requires Supabase + Netlify functions |
| Showcase interaction layer | `docs/v6/operational/SHOWCASE_INTERACTION_LAYER.md` | Phase 2 — the V1 equivalent is the campaign state machine |
| Close Circle (paid fan tier) | `docs/v6/operational/CLOSE_CIRCLE_SPEC.md` | Requires Stripe + Supabase |
| Spotify OAuth pre-save | `docs/systems/spotify-import/SPEC.md` | OAuth + PKCE + cron — XL complexity |
| Fan location heatmap | `docs/systems/analytics/SPEC.md` | Requires Supabase geolocation column |
| Email broadcasts | `docs/systems/email/SPEC.md` | Requires Resend + Supabase |
| Freelancer profiles | `docs/pages/freelancer/DESIGN-SPEC.md` | Phase 3 — separate onboarding + profile type |
| Custom domains | — | Phase 2 |
| Fan dashboard (real data) | `docs/pages/fan/DESIGN-SPEC.md` | Phase 2 — fan.html is spec-complete, backend needed |

**V1 showcase equivalent:** The campaign state machine (profile/pre-release/live/gig) already drives profile section emphasis. This is functionally equivalent to showcase mode for V1 artists.

**Never building (ever):** Open CSS editor · arbitrary font upload · unlimited colour palette · AI-generated layouts · artist rating/review system · fan direct messages · fan gamification/leaderboards · pay-per-post fan content · "going viral" anywhere in copy · Rooms/Stage Can community features · Story Mode video assembly

---

## Strategic reference docs (read when relevant, not every session)

- `docs/USER-STORIES.md` — 48 user stories, 23 built, 13 partial, 12 Phase 2
- `docs/GROWTH_STRATEGY.md` — full channel strategy with weekly timeline
- `docs/MARKET_SIZING.md` — TAM/SAM/SOM, £2M ARR exit target, acquirer profiles
- `docs/EXECUTION_RISK.md` — top 5 risks with kill signals
- `docs/MARKET_VALIDATION.md` — 5-question interview script, NPS rules, pivot criteria
- `docs/DECISION-LOG.md` — full history of every locked decision with reasoning
- `docs/COMPONENT-LIBRARY.md` — reusable UI components with exact HTML/CSS
- `docs/v6/engines/` — Close Circle, Credits, Fan Product, Moment Engine (Phase 2+ engines)
- `docs/systems/transcendence/WHAT-11-LOOKS-LIKE.md` — 15 specific 11/10 product moments
- `docs/systems/transcendence/NEVER-SHIP.md` — things that would make ABLE worse
- `docs/GPT-REVIEW/GPT-RESPONSE-NOTES.md` — validated external review insights
- `MASTER.md` — James's goals, financial milestones, health context, 5-year plan
- `PROJECT_INDEX.md` — section IDs, JS functions, localStorage schema map
- `docs/features/INDEX.md` — V1 vs Phase 2 feature status (what's built, partial, specced)
- `docs/solutions/` — solved problems library: bugs fixed, patterns, regression prevention
- `docs/systems/ui/SPEC.md` — canonical design tokens (spacing scale, type scale, Surface 1 vs 2)
- `docs/systems/ux/SPEC.md` — user mental models (artist, fan, freelancer) and journey maps
- `docs/systems/growth-strategy/GROWTH-STRATEGY.md` — channel strategy with Bandsintown/Bandzoogle/Spotify context
- `START-BUILDING.md` — session orientation prompt (how to start a build session correctly)

---

## Current build state → `docs/STATUS.md`
