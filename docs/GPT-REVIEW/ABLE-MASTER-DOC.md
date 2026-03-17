# ABLE — Master Review Document
**Generated: 2026-03-16** | Single-file export for external review

---

## TABLE OF CONTENTS
1. CLAUDE.md
2. CONTEXT.md
3. docs/STATUS.md
4. docs/FULL-REVIEW-50.md
5. docs/PREBUILD-SCORE.md
6. docs/MASTER-SCORECARD.md
7. docs/process/BUILD-CONFIDENCE.md
8. docs/systems/competitive/SPEC.md
9. docs/systems/copy/SPEC.md
10. docs/systems/ui/SPEC.md
11. docs/systems/ux/SPEC.md
12. docs/systems/tier-gates/SPEC.md
13. docs/systems/analytics/SPEC.md
14. docs/systems/email/SPEC.md
15. docs/systems/data-architecture/SPEC.md
16. docs/systems/killer-features/SPEC.md
17. docs/systems/launch-sequence/SPEC.md
18. docs/systems/growth-loop/SPEC.md
19. docs/systems/legal-compliance/PATH-TO-10.md
20. docs/pages/profile/DESIGN-SPEC.md
21. docs/pages/admin/DESIGN-SPEC.md
22. docs/pages/onboarding/DESIGN-SPEC.md
23. docs/pages/fan/DESIGN-SPEC.md
24. docs/pages/landing/DESIGN-SPEC.md

---


---
# FILE: CLAUDE.md
---

# ABLE — Claude Code Project Guide
**Last updated: 2026-03-15**

> **Start every session by reading `CONTEXT.md` first** — it's the fast-orientation file with tokens, rules, and active file list. Then check `docs/STATUS.md` for current build state.

## What this project is

ABLE (Artist Before Label) is a premium mobile-first platform for independent musicians, their fans, and music-industry freelancers. It is:

- For **artists**: a conversion profile (link-in-bio) that captures fans, converts attention to actions, and gives them real data about their audience — without any algorithm in the way.
- For **fans**: a place to stay close to artists they care about, discover new ones, and support directly.
- For **freelancers** (producers, mixers, videographers): a professional profile with credits, rate card, and portfolio — discoverable via the artists they've worked with.

**It is not a social network. It is not a marketing tool. It is a place for artists to be themselves.**

---

## Active files (DO NOT confuse these)

| File | Role | Status |
|---|---|---|
| `able-v7.html` | **Artist public profile** — the fan-facing page | ACTIVE — edit this |
| `admin.html` | **Artist dashboard** — where artists manage everything | ACTIVE — edit this |
| `start.html` | **Onboarding wizard** — how new artists set up | ACTIVE — edit this |
| `landing.html` | **Marketing landing page** — ablemusic.co homepage | ACTIVE — edit this |
| `index.html` | Redirect only | DO NOT EDIT |
| `_archive/able-merged.html` | Legacy v1 reference only | DO NOT EDIT |
| `_archive/able-v2.html` | Abandoned | IGNORE |
| `_archive/able-v4.html` | Superseded | IGNORE |
| `_archive/able-v5.html` | Superseded | IGNORE |
| `able-v3.html` | Superseded by v7 | DO NOT EDIT |
| `able-v6.html` | Superseded by v7 | DO NOT EDIT |
| `screenshots/` | Playwright audit output | NEVER reference in code |

**No build pipeline. No bundler. No npm. All files edited directly.**

---

## Data architecture (localStorage → Supabase when backend lands)

| Key | Contents | Used by |
|---|---|---|
| `able_v3_profile` | Artist profile (name, bio, accent, theme, state, release, CTAs) | able-v3.html, admin.html |
| `able_fans` | Fan sign-ups [{email, ts, source}] | able-v3.html, admin.html |
| `able_clicks` | CTA tap events [{label, type, ts, source}] | able-v3.html, admin.html |
| `able_views` | Page view events [{ts, source}] | able-v3.html, admin.html |
| `able_gig_expires` | Unix timestamp when gig mode expires | admin.html |
| `able_profile` | Wizard output (legacy, merged into able_v3_profile) | start.html → admin.html |
| `able_shows` | Shows list `[{ venue, date, doorsTime, ticketUrl, featured }]` | admin.html, able-v7.html |
| `able_dismissed_nudges` | Dismissed nudge IDs `['presave-cta', 'add-show', ...]` | admin.html |
| `able_starred_fans` | Starred fan email strings `['fan@example.com', ...]` | admin.html |
| `able_tier` | Current tier: `"free"` / `"artist"` / `"artist-pro"` / `"label"` | admin.html, able-v7.html |
| `admin_visit_dates` | ISO date strings of admin loads (last 60) — nudge timing | admin.html |

**All localStorage keys will map 1:1 to Supabase table rows when backend is added. Do not rename keys.**

---

## Three user journeys (NEVER conflate these)

### 1. Artist journey
Entry: start.html wizard → able-v3.html (their live page) → admin.html (dashboard)
- Wizard collects: name, vibe/genre, accent colour, CTA type, release info
- Profile shows: top card (video/artwork/embed), hero CTAs, platform pills, music, events, merch, snap cards, fan capture
- Dashboard shows: Campaign HQ (page state control), real stats, fan list, snap cards, connections, analytics

### 2. Fan journey
Entry: able-v3.html (from artist's social bio link)
- They land, see the artist's content, tap a CTA or sign up
- Eventually: fan.html — a personal dashboard showing artists they follow, upcoming shows, new drops

### 3. Freelancer journey
Entry: freelancer-start.html (separate onboarding) → freelancer.html (their profile) → shared admin.html (freelancer layers activated)
- One profile model with activated layers — no separate admin page, no profileType enum. Artist and freelancer layers can both be active simultaneously. Admin.html shows context-appropriate sections per which layers are active.
- Freelancer layers enabled: credits hero, portfolio, rate card, booking enquiry sheet. Disabled: campaign states, gig mode, fan sign-up, snap cards, top card campaign.
- Profile sections: identity header, credits (peer-confirmed), portfolio (audio/video), rate card with auto-expiry, booking enquiry (4 fields, no marketplace signals), auto-generated "Artists on ABLE" strip.
- Discovered via: credits on artist release cards — confirmed credits become live links; unconfirmed credits are plain text. That asymmetry is the entire acquisition mechanic.
- Per V8_BUILD_AUTHORITY.md §8.3 and §11.3 (supersedes any older separate-admin model)

---

## Page state system (Campaign HQ)

Artist profiles have 4 states. State is stored in `able_v3_profile.stateOverride` or computed from `releaseDate`:

| State | Trigger | Fan experience |
|---|---|---|
| `profile` | Default / 14+ days post-release | Artist info, latest release stream CTA |
| `pre-release` | Set release date in future | Countdown, pre-save CTA |
| `live` | Release date reached | Top card media, stream CTA prominent |
| `gig` | Manual 24hr toggle | Tickets front-and-centre, "on tonight" tag |

Auto-switch logic: `if now < releaseDate → pre-release; if now < releaseDate + 14d → live; else → profile`

---

## Design system (never change these without good reason)

### Tokens — able-v3.html / artist profile
```
--color-bg:      #0d0e1a   (Midnight Navy)
--color-card:    #12152a
--color-accent:  artist-set (default #e05242)
--font:          'DM Sans'
--font-display:  'Barlow Condensed' (hero artist name)
Spring easing:   cubic-bezier(0.34,1.56,0.64,1)
Deceleration:    cubic-bezier(0.25,0.46,0.45,0.94)
```

### Tokens — admin.html / dashboard
```
--bg:    #09090f
--acc:   #f4b942  (Amber — admin accent, separate from artist accent)
--font:  'Plus Jakarta Sans'
--font-d: 'Barlow Condensed'
```

### Themes (all must work on able-v3.html / able-v6.html)
- Dark (default): #0d0e1a base
- Light: warm cream #f0ede8 base, dark text
- Glass: backdrop-filter blur(28px) saturate(180%) — requires background artwork
- Contrast: pure black #000000 base, maximum contrast

---

## CTA architecture (never regress)

Three zones, strict caps:
1. **Hero CTAs** — max 2. Dominate. Primary = accent fill, secondary = ghost.
2. **Quick Action pills** — max 4 narrow / 6 wide + overflow toggle.
3. **Section Actions** — max 2 per section (Music, Events, Merch, Support).

**Global dedupe rule**: same URL cannot appear in multiple zones. Hero wins.

---

## Copy philosophy (critical — read before touching any UI text)

ABLE is for artists with depth. They have an aversion to what is superficial.

**Never write:**
- "Turn fans into superfans" → say "your most dedicated listeners"
- "Grow your audience" → say "reach people who care"
- "Monetise your fanbase" → say "let people support you directly"
- "Engage your followers" → say "stay close to the people who show up"
- "Content creator" → say "artist"
- "Going viral" → never mention this
- Exclamation marks on dashboard copy
- Generic SaaS micro-copy ("Get started!", "You're all set!")

**Always write:**
- In the artist's voice (first person on the profile page)
- Direct, honest, specific
- "Stay close." not "Subscribe to updates"
- "I'm playing tonight" not "Gig mode activated"
- "Your list. Your relationship." not "Fan CRM dashboard"
- Dashboard greetings: "Good to see you, [Name]." — warm, one beat, done

---

## Tier system (always design with this in mind)

| Tier | Price | Key gates |
|---|---|---|
| Free | £0 | Basic profile, 1 snap card, 100 fan sign-ups, basic stats |
| Artist | £9/mo | Unlimited snap cards, fan email up to 2k, campaign modes, connections |
| Artist Pro | £19/mo | Full fan CRM, email broadcasts, support packs, advanced analytics |
| Label | £49/mo | 10 artist pages, team access, aggregate analytics, API |

**Gold lock pattern**: Pro features show blurred preview + tasteful overlay with specific value proposition. Never just "Upgrade". Always say what they get.

---

## Backend plan (Supabase + Netlify)

When backend is added:
- **Supabase**: auth (magic link email), database (artists, fans, clicks, events, merch), storage (artwork, avatars)
- **Netlify**: static hosting + serverless functions for sensitive operations
- **Supabase JS CDN**: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` — no npm needed
- Tables: `profiles`, `fans`, `events`, `releases`, `merch`, `clicks`, `snap_cards`, `credits`
- All localStorage keys map 1:1 to table rows — migration is just a flush-to-API call

---

## Working rules for autonomous development

1. **Parse check every JS block** after editing — use `node -e "new Function(src)"` pattern
2. **Never touch index.html or anything in _archive/**
3. **Mobile-first**: min 44px tap targets, no horizontal scroll at 375px, iframe containment
4. **Tokenised CSS only** — no inline styles except where dynamic JS requires it
5. **Verify all 4 themes** work after any CSS change
6. **No force-push, no rm -rf, no destructive git** without explicit user instruction
7. **Commit after each logical chunk** with descriptive message
8. **Run Playwright smoke tests** after major changes (Playwright MCP is configured)
9. **Never add cheesy copy** — re-read the copy philosophy above before every text change
10. **Always check `docs/v6/core/V6_BUILD_AUTHORITY.md`** before deciding what to build next — it is the primary authority for all v6 decisions

---

## Doc files (context for every decision)

### V8 strategy docs — PRIMARY BUILD AUTHORITY (2026-03-15)
| File | What's in it |
|---|---|
| `docs/pages/profile/DESIGN-SPEC.md` | **able-v7.html build spec** — 9.7/10 |
| `docs/pages/admin/DESIGN-SPEC.md` | **admin.html build spec** — 9.7/10 |
| `docs/pages/onboarding/DESIGN-SPEC.md` | **start.html build spec** — 9.9/10 |
| `docs/pages/landing/DESIGN-SPEC.md` | **landing.html build spec** — 9.65/10 |
| `docs/pages/fan/DESIGN-SPEC.md` | **fan.html build spec** — in progress |
| `docs/systems/DESIGN_SYSTEM_SPEC.md` | Canonical design tokens, typography, shadows, grid |
| `docs/systems/MICRO_INTERACTIONS_SPEC.md` | All 30+ interactions, rules, performance budget |
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | End-to-end user journeys, source tracking |
| `docs/systems/copy/SPEC.md` | Master copy system — voice, banned phrases, all contexts |
| `docs/systems/data-architecture/SPEC.md` | localStorage schema, Supabase migration |
| `docs/systems/seo-og/SPEC.md` | Meta tags, OG cards, structured data |
| `docs/systems/email/SPEC.md` | Fan confirmation, artist welcome, broadcasts |
| `docs/systems/tier-gates/SPEC.md` | Gold lock pattern, upgrade flow, copy |
| `docs/systems/analytics/SPEC.md` | Event schema, source attribution, aggregation |
| `docs/systems/error-states/SPEC.md` | Network failure, corruption, recovery patterns |
| `docs/systems/pwa/SPEC.md` | Manifest, service worker, installability |
| `docs/systems/spotify-import/SPEC.md` | Prefetch, Netlify function, failure states |

### V6 core docs — product truth (not superseded)
| File | What's in it |
|---|---|
| `CONTEXT.md` | **Read first every session** — fast orientation, tokens, active files, rules |
| `docs/STATUS.md` | **Current build state** — what's built, what's next, known issues |
| `docs/v6/core/V6_BUILD_AUTHORITY.md` | Resolved design decisions for v6 (still valid, not superseded) |
| `docs/v6/00_AUTHORITY_ORDER.md` | Precedence order — V8 layer added at top |
| `docs/v6/core/VISUAL_SYSTEM.md` | 7 genre vibes, fonts, accent suggestions |
| `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` | Copy register, voice, banned phrases |
| `docs/reference/research/PRODUCT_HIERARCHY_AND_TRUST.md` | Priority order for all features (reference only) |
| `docs/reference/research/PLATFORM_STRATEGY.md` | Tiers, fan journey, superfan system (reference only) |
| `docs/reference/research/DISCOVERY_AND_GROWTH.md` | Directory, leaderboards, organic growth mechanics (reference only) |
| `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md` | Ablers, playlist pushers, rooms, press packs (reference only) |
| `docs/archive/superseded-v5/PRODUCT_SPEC.md` | Legacy v1 spec — vocabulary reference only (archived) |
| `docs/archive/superseded-v5/QA_SMOKE_TESTS.md` | v3-era smoke tests — archived, superseded by v6 (archived) |


---
# FILE: CONTEXT.md
---

# ABLE — AI Agent Context File
**Read this first. Every session. Before touching anything.**
*Updated: 2026-03-15*

---

## What this is

ABLE (Artist Before Label) — a premium mobile-first platform for independent musicians.
No build pipeline. No bundler. No npm. All files edited directly.
Single-developer + AI agents. Active file = ship immediately.

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
| `able-merged.html` | Legacy v1 reference |
| `_archive/*` | Dead versions — reference only |
| `design-references/*` | Static research archive |
| `mockups/*` | Static mockups — not the build |
| `screenshots/*` | Playwright audit output |

---

## Authority order (read this before any decision)

### V8 Strategy docs — PRIMARY BUILD AUTHORITY (supersede all v6 docs for build decisions)

| Page | Build spec | Score |
|---|---|---|
| `able-v7.html` (profile) | `docs/pages/profile/DESIGN-SPEC.md` | 9.7/10 |
| `admin.html` | `docs/pages/admin/DESIGN-SPEC.md` | 9.7/10 |
| `start.html` | `docs/pages/onboarding/DESIGN-SPEC.md` | 9.9/10 |
| `landing.html` | `docs/pages/landing/DESIGN-SPEC.md` | 9.65/10 |
| `fan.html` | `docs/pages/fan/DESIGN-SPEC.md` | 9.24/10 |

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
| Spotify import | `docs/systems/spotify-import/SPEC.md` | 9.0/10 |
| Explainers | `docs/systems/explainers/SPEC.md` | 9/10 (spec complete — build pending) |
| Platform admin | `docs/systems/platform-admin/SPEC.md` | 7/10 |
| World Map | `docs/systems/world-map/` | 9.2/10 |
| Killer features | `docs/systems/killer-features/` | active — P0/P1 build queue |
| Transcendence | `docs/systems/transcendence/` | active — 11/10 philosophy + audit |
| CRM | `docs/systems/crm/SPEC.md` | 4/10 current → path to 10 in `PATH-TO-10.md` |
| Notifications | `docs/systems/notifications/NOTIFICATIONS.md` | 10/10 spec — pre-build |
| Analytics | `docs/systems/analytics/SPEC.md` | 6.2/10 current → 9.5/10 spec-complete |
| Error states | `docs/systems/error-states/SPEC.md` | 3.5/10 current → 9.0/10 spec-complete |
| PWA | `docs/systems/pwa/SPEC.md` | 0.6/10 current → 8.5/10 spec-complete |
| Team operating system | `docs/systems/team/TEAM.md` | 9.2/10 |
| AI agent infrastructure | `docs/systems/ai-agents/AI-AGENTS.md` | 9.4/10 |
| AI workflow | `docs/systems/ai-workflow/AI-WORKFLOW.md` | 6.5/10 current |
| Instagram data + leads | `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md` | 9.6/10 |
| Complaint resolution | `docs/systems/complaint-resolution/COMPLAINT-RESOLUTION.md` | 9.2/10 |
| Launch sequence | `docs/systems/launch-sequence/SPEC.md` | 7.5/10 |
| UI system | `docs/systems/ui/SPEC.md` | 7.1/10 current → 8.6/10 after P1 |
| UX system | `docs/systems/ux/SPEC.md` | 6.9/10 current → 9.0/10 after P1 |
| Freelancer auth | `docs/systems/freelancer-auth/SPEC.md` | pre-launch quality gate |
| Tiers | `docs/systems/tiers/SPEC.md` | pre-launch quality gate |
| Monetisation | `docs/systems/monetisation/SPEC.md` | pre-launch quality gate |
| Growth loop | `docs/systems/growth-loop/SPEC.md` | 7.0/10 |
| Lead generation | `docs/systems/lead-generation/LEAD-GENERATION.md` | 7.5/10 |
| Legal compliance | `docs/systems/legal-compliance/SPEC.md` | 2.0/10 GDPR → 8.5/10 spec-complete |
| Founder roadmap | `docs/systems/founder-roadmap/PATH-TO-10.md` | 9.0/10 |
| Master plan alignment | `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` | 4.2/10 |
| Brand identity | `docs/systems/brand-identity/SPEC.md` | 5.0/10 current → 8.5/10 after P1 |

### V6 core docs — still authoritative for product truth (not superseded)
1. `docs/v6/core/V6_BUILD_AUTHORITY.md` — resolved design decisions
2. `docs/v6/PRODUCT_TRUTH.md` — what ABLE is (non-negotiable)
3. `docs/v6/core/VISUAL_SYSTEM.md` — 7 genre vibes, fonts, accent values
4. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — copy voice, banned phrases

### **DEPRECATED** — do not use for build decisions
- `docs/v6/surfaces/ARTIST_PROFILE.md` → superseded by `docs/pages/profile/SPEC.md`
- `docs/v6/surfaces/ADMIN.md` → superseded by `docs/pages/admin/DESIGN-SPEC.md`
- `docs/v6/surfaces/ONBOARDING.md` → superseded by `docs/pages/onboarding/DESIGN-SPEC.md`
- `docs/v6/surfaces/LANDING.md` → superseded by `docs/pages/landing/DESIGN-SPEC.md`

### Orientation
5. `docs/STATUS.md` — current build state (what's built, what's next)
6. `CLAUDE.md` — working rules and constraints
7. `docs/FILE-STRUCTURE.md` — complete docs navigation map (347 files)
8. `docs/INDEX.md` — alphabetical index of every document

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

### admin.html (dashboard)
```css
--bg:     #09090f
--acc:    #f4b942   /* Amber */
--font:   'Plus Jakarta Sans'
--font-d: 'Barlow Condensed'
```

### Four themes (ALL must work after any CSS change)
- Dark (default): `#0d0e1a` base
- Light: cream `#f0ede8` base, dark text
- Glass: `backdrop-filter: blur(28px) saturate(180%)` — needs background image
- Contrast: pure `#000000` base, maximum contrast

---

## Data architecture (localStorage — do not rename keys)

| Key | Contents |
|---|---|
| `able_v3_profile` | Artist profile (name, bio, accent, theme, state, release, CTAs) |
| `able_fans` | Fan sign-ups [{email, ts, source, optIn, consentVersion}] |
| `able_clicks` | CTA tap events [{label, type, ts, source, sessionId}] |
| `able_views` | Page view events [{ts, source, sessionId, isArtist}] |
| `able_gig_expires` | Unix timestamp when gig mode expires |
| `able_shows` | Shows list [{id, venue, date, city, doorsTime, ticketUrl, featured}] |
| `able_dismissed_nudges` | Dismissed nudge IDs (string array) |
| `able_starred_fans` | Starred fan email strings (deprecated — migrate to Fan.isStarred) |
| `able_tier` | Current artist tier: `"free"` / `"artist"` / `"artist-pro"` / `"label"` |
| `able_profile` | Legacy wizard key — migrate to `able_v3_profile` on first admin load |
| `able_clips` | Clips array [{id, type, videoUrl, embedUrl, thumbnailUrl, caption, published, access, ts, sortOrder}] — see `docs/systems/reels-feed/SPEC.md` |
| `admin_visit_dates` | ISO date strings of admin.html load dates (for nudge timing) |
| `fan_following` | Fan-followed artist slugs [{artistSlug, followedAt}] — fan.html only |
| `fan_location` | Fan location {city, country, lat, lng, setAt} — fan.html only |

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

---

## CTA architecture (never regress)

1. **Hero CTAs** — max 2. Primary = accent fill. Secondary = ghost.
2. **Quick Action pills** — max 4 narrow / 6 wide + overflow toggle.
3. **Section Actions** — max 2 per section.
**Global dedupe rule:** Same URL cannot appear in multiple zones. Hero wins.

---

## Copy rules (read before touching any text)

**Canonical source values (SOURCE_VALUES — never add without updating analytics/SPEC.md):**
`ig` · `tt` · `sp` · `qr` · `story` · `direct` · `email` · `fan-dashboard` · `twitter` · `footer` · `other`

Never write:
- "Turn fans into superfans" / "Grow your audience" / "Monetise your fanbase"
- "Content creator" / "Going viral" / Exclamation marks on dashboard copy
- Generic SaaS micro-copy ("Get started!", "You're all set!")

Always write:
- Direct, honest, specific — artist's voice
- "Stay close." not "Subscribe to updates"
- "Your list. Your relationship." not "Fan CRM dashboard"
- Dashboard greetings: "Good to see you, [Name]." — warm, one beat, done

---

## Working rules

1. Parse-check every JS block after editing: `node -e "new Function(src)"`
2. Mobile-first: 44px min tap targets, no horizontal scroll at 375px
3. Tokenised CSS only — no inline styles except where dynamic JS requires
4. Verify all 4 themes after any CSS change
5. Run Playwright smoke tests after major changes
6. Commit after each logical chunk with descriptive message
7. No force-push, no rm -rf, no destructive git without explicit instruction

---

## Supabase (when backend work needed)

- Project URL: `https://jgspraqrnjrerzhnnhtb.supabase.co`
- CDN: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`
- See `docs/v6/operational/BACKEND_SCHEMA.md` for table definitions

---

## Current build state → see `docs/STATUS.md`


---
# FILE: docs/STATUS.md
---

# ABLE — Current Build Status
**Updated: 2026-03-16 (session 10 — coherence review) | Update this file at the end of every session.**

---

## Strategy docs — V8 pre-build (complete before any building)

### Pages
| Page | Score | Status | Key docs |
|---|---|---|---|
| `start.html` | 9.9/10 | ✅ Complete | `docs/pages/onboarding/DESIGN-SPEC.md` |
| `admin.html` | 9.7/10 | ✅ Complete | `docs/pages/admin/DESIGN-SPEC.md` |
| `landing.html` | 9.65/10 | ✅ Complete | `docs/pages/landing/DESIGN-SPEC.md` |
| `able-v7.html` | 8.9/10 built / 9.7/10 ceiling | ✅ Strategy complete | `docs/pages/profile/DESIGN-SPEC.md` + `PATH-TO-10.md` |
| `fan.html` | 9.21/10 spec / V1 ceiling 9.4 | ✅ Strategy complete | `docs/pages/fan/DESIGN-SPEC.md` + `PATH-TO-10.md` |
| `freelancer.html` | 8.7/10 spec / 0/10 built | ⏳ Phase 2 | `docs/pages/freelancer/DESIGN-SPEC.md` complete — build not started |

### Systems
| System | Score | Status |
|---|---|---|
| Design system | 9.5→10/10 | ✅ `docs/systems/DESIGN_SYSTEM_PATH_TO_10.md` — bugs found: admin.html L44+L1288 `#888` |
| Micro-interactions | 9.5→10/10 | ✅ `docs/systems/MICRO_INTERACTIONS_PATH_TO_10.md` — focus ring + @view-transition specced |
| Cross-page journeys | 9.0/10 | ✅ `docs/systems/CROSS_PAGE_JOURNEYS.md` |
| Copy system | 7.5→9.5/10 | ✅ `docs/systems/copy/SPEC.md` — 8 "dashboard" violations + toast inconsistency found |
| Data architecture | 6.8→9.3/10 | ✅ `docs/systems/data-architecture/SPEC.md` — live bug found |
| SEO + OG cards | 5.7→9.0/10 | ✅ `docs/systems/seo-og/SPEC.md` — 2 critical bugs found |
| Email system | 4.0→9.5/10 | ✅ `docs/systems/email/SPEC.md` |
| Tier gate system | 3.7→9.0/10 | ✅ `docs/systems/tier-gates/SPEC.md` — full gate copy + upgrade sheet |
| Spotify import | 5.2→9.0/10 | ✅ `docs/systems/spotify-import/SPEC.md` — function not built yet |
| Platform admin | 0→7/10 | ✅ `docs/systems/platform-admin/` — SQL library + V2 spec + path to 10 |
| CRM | 4→10/10 | ✅ `docs/systems/crm/` — build vs buy decision (custom confirmed), full spec, path to 10. P0.1 (`campaignState` at sign-up) is the single highest-ROI next action. |
| World Map | 5.2→9.2/10 | ✅ `docs/systems/world-map/` — 4 files: ANALYSIS, SPEC, PATH-TO-10, FINAL-REVIEW. P0 bugs identified (multi-moment panel, empty state, nav button size, section heading, focus trap). Type vocabulary mismatch found. |
| Reels/Clips feed | 0→7.5/10 | ✅ `docs/systems/reels-feed/` — 4 files: ANALYSIS, SPEC, PATH-TO-10, FINAL-REVIEW. V1 scope: YouTube Short + TikTok embeds, artist profile section, admin management, fan.html feed items. |
| Integrations system | 4/10 current | ✅ `docs/systems/integrations/` — 4 files. P0: Ticketmaster events + Spotify deploy. P1: Linktree + UTM tracking. Key finding: monthly listeners NOT in Spotify API. |
| Artist tools audit | 6.8/10 current | ✅ `docs/systems/artist-tools/` — 4 files. 13 tools scored. P0 gaps: shows date sort, Close Circle "payments required" state, accent colour picker in admin, star toggle confirmation. |
| Docs file structure | 8/10 | ✅ `docs/FILE-STRUCTURE.md` — complete map of all docs, authority levels, reading-order guides. |
| Analytics | 6.2→9.5/10 | ✅ `docs/systems/analytics/` — 5 files complete. P0: sessionId + anti-self-visit + PostHog init |
| Error states | 3.5→9.0/10 | ✅ `docs/systems/error-states/` — 5 files complete. P0: safeGet()/safeSet() everywhere (45 min) |
| PWA/installability | 0.6→8.5/10 | ✅ `docs/systems/pwa/` — 5 files complete. P0: manifest.json + iOS meta tags (30 min) |
| Complaint resolution | 9.2/10 | ✅ `docs/systems/complaint-resolution/` |
| Launch sequence | 7.5/10 | ✅ `docs/systems/launch-sequence/` — P0: deploy to ablemusic.co |
| UI system | 7.1→8.6/10 | ✅ `docs/systems/ui/` — 4 files (no BEYOND-10) |
| UX system | 6.9→9.0/10 | ✅ `docs/systems/ux/` — 4 files (no BEYOND-10) |
| Freelancer auth | pre-launch gate | ✅ `docs/systems/freelancer-auth/` — quality gate checklist (5 questions) |
| Tiers / billing | pre-launch gate | ✅ `docs/systems/tiers/` — quality gate checklist; Stripe not wired |
| Monetisation | pre-launch gate | ✅ `docs/systems/monetisation/` — quality gate checklist; requires Phase 2 |
| Growth loop | 7.0/10 | ✅ `docs/systems/growth-loop/` |
| Lead generation | 7.5/10 | ✅ `docs/systems/lead-generation/` |
| Legal compliance | 2.0→8.5/10 | ✅ `docs/systems/legal-compliance/` — P0 BLOCKER: GDPR consent on fan sign-up |
| Founder roadmap | 9.0/10 | ✅ `docs/systems/founder-roadmap/` — 7 files incl. 300-WINS + 500-STEPS |
| Master plan alignment | 4.2/10 | ✅ `docs/systems/master-plan-alignment/` — deploy + NHR prep are the critical gaps |
| Brand identity | 5.0→8.5/10 | ✅ `docs/systems/brand-identity/` — 8 files incl. logo docs. P0: favicon + OG image template |
| AI workflow | 6.5/10 | ✅ `docs/systems/ai-workflow/` — P0: Telegram notifications setup (20 min) |
| Hardware/software | 9.5/10 | ✅ `docs/systems/hardware-software/` |
| VA strategy | 9.0/10 | ✅ `docs/systems/va-strategy/` |
| Accounting | quality gate | ✅ `docs/systems/accounting/` — pre-company; activate at incorporation |
| Marketing | quality gate | ✅ `docs/systems/marketing/` — waitlist 500 target; success metrics documented |
| Free stack | — | ✅ `docs/systems/free-stack/` — Resend 100/day cap risk flagged; UptimeRobot P0 |
| Think out of the box | — | ✅ `docs/systems/think-out-of-the-box/` — monthly habit + ideas graveyard |
| Pathway | 7.0/10 | ✅ `docs/systems/pathway/` — exit strategy + pre-shift checklist |
| Social media | 9.1/10 | ✅ `docs/systems/social-media/` — strategy + account review. Account 2.0/10 current |
| Organic growth | 10/10 | ✅ `docs/systems/organic-growth/` — projections model complete |
| Competitive | 9.5/10 | ✅ `docs/systems/competitive/` — 11 competitors, quarterly watch list |
| Partnerships | 9.0/10 | ✅ `docs/systems/partnerships/` |
| Investor readiness | 10/10 spec | ✅ `docs/systems/investor-readiness/` — 2/10 execution (pre-launch) |
| Investor strategy | 8.5/10 | ✅ `docs/systems/investor-strategy/` |
| Tools and APIs | 9.5/10 | ✅ `docs/systems/tools-and-apis/` |
| Digital media | 7.5/10 combined | ✅ `docs/systems/digital-media/` — strategy 9.5, presence 2.0 |
| Build your own | 8.7/10 avg | ✅ `docs/systems/build-your-own/` — all tools unbuilt pre-launch |
| Filing system | 9.2/10 | ✅ `docs/systems/filing-system/` |
| Coding strategy | 7.0→10/10 | ✅ `docs/systems/coding-strategy/` — P0: --dash-t3 WCAG fix (2 min) |
| QA testing | 9.0/10 spec | ✅ `docs/systems/qa-testing/` — no tests written yet |
| Master review | 7.5/10 | ✅ `docs/systems/master-review/` — schedule recurring monthly review |

**Rule: No building until all strategy docs are complete.**

---

---

## Active branch
`v2-simplified`

---

## What's built and working

### able-v7.html (Artist Profile — ACTIVE)
- [x] Four themes: Dark, Light, Contrast, Glass
- [x] Hero CTA zone (max 2, accent + ghost)
- [x] Quick Action pills (max 4/6 + overflow) + owner ghost placeholder
- [x] Page state system (profile / pre-release / live / gig)
- [x] Gig mode (24hr toggle, tickets front)
- [x] Fan sign-up capture (email, stored to able_fans)
- [x] CTA click tracking (stored to able_clicks)
- [x] Page view tracking (stored to able_views)
- [x] Top card: video / artwork / embed
- [x] Music section with release cards + owner empty state
- [x] Events / bento grid + owner empty state
- [x] Merch / merch-bento-grid + owner empty state
- [x] Snap cards + owner empty state
- [x] Support section + owner empty state
- [x] Recommendations section + owner empty state
- [x] Platform pills
- [x] Accent colour system (single CSS var, artist-owned)
- [x] Identity system (applyIdentity() — data-feel CSS system)
- [x] Spring-feel motion system
- [x] Micro-interactions: B1, B3, B4, B9, B18, B19, C1, C2, C4, C5, C6, D1, D2, D5+D12, D20, E1, E4+E6, E9, E11, E15, F1+F9, F15, G1, G5, G7+E18, H1+H3, H4, H5, H9, I2, I5, I7, A4, A6, A10/D3, A11
- [x] A10/D3 platform pill entrance — horizontal wave (translateX -8px→0, 220ms, 50ms stagger)
- [x] B3/B4 CTA press flash + glow (color-mix lighter accent + ::after opacity pulse)
- [x] E11 error message delayed reveal (400ms after shake, not simultaneous)
- [x] F15 accent shimmer on artwork placeholder (loading state)
- [x] H9 pre-release ambient intensification (0.12+0.16×(1-daysLeft/14), clamped 0.12–0.28)
- [x] Tab scroll sync (I7)
- [x] A4 sticky artist bar — frosted glass, fan-view only, triggers at 70% hero scroll
- [x] A11 artist name scale compression on scroll — lerp 48px→24px over hero height
- [x] E15 email blur validation — validate on blur, clear on retype
- [x] Section header fade-in on scroll (I2)
- [x] World map (calendar view with moments)
- [x] Section ordering + visibility system
- [x] Owner-aware mode (edit bar, placeholder states vs fan view)
- [x] Made with ABLE footer + referral slug
- [x] Support note copy — explicit "0% ABLE cut, Stripe fee only" (§10 compliance)
- [x] Copy compliance: snap card lock overlay — removed "Unlock" (banned word)
- [x] C7 gig badge glow pulse confirmed (badge-glow-pulse keyframe on .hero__state-chip--gig::after)
- [x] D15 platform pill first-load shimmer confirmed (session-flagged, .pill-shimmer-once)
- [x] prefers-reduced-motion CSS throughout confirmed
- [x] touch-action: manipulation on * confirmed

### admin.html (Artist Dashboard)
- [x] Campaign HQ (page state control)
- [x] Stats view with counter animation (G14 — first load, session-flagged)
- [x] Fan list with stagger animation (D13 — first load)
- [x] Gig mode countdown bar (C16 — depletion bar with time remaining)
- [x] Snap card management (CRUD)
- [x] Connections panel
- [x] Profile identity card (genre, feel, nudges)
- [x] Section order + visibility toggles
- [x] Analytics page (top clicks, activity feed)
- [x] E3 bio char count — fades in amber at 80+ chars, red at 110+
- [x] Broadcast page (Pro tier locked)
- [x] First-run checklist (auto-dismisses when all done)
- [x] Your World moments panel
- [x] §9.1 moment 2 — pre-release trial nudge card (session-flagged, dismissible)
- [x] §9.1 moment 3 — gig mode trial nudge card (session-flagged, dismissible)
- [x] Copy compliance: fan cap CTA — removed "Upgrade to keep growing" (banned), direct artist-voice copy
- [x] Copy compliance: pre-release nudge — removed "unlocks" (banned word)
- [x] Copy compliance: export empty state — removed "get started" (banned phrase)
- [x] "0% taken by ABLE. Stripe standard fee only" in support setup flow confirmed (§10)

### start.html (Onboarding Wizard)
- [x] Pre-step 0: Spotify/music link import
- [x] Artist name, vibe/genre, accent colour
- [x] CTA type selection
- [x] Release info capture
- [x] Guided identity system (feel selection, AI vibe match)
- [x] Live preview phone (Reel slot, snap cards, music, merch)
- [x] E10 progress bar spring easing (--spring, 0.55s)
- [x] Copy compliance: wizard step 0 message — removed "Let's get started" → "A few details first"

### landing.html
- [x] Marketing landing page
- [x] Interactive proof demo phone (4 states + theme cycle)
- [x] Pricing: £0/£9/£19/£49 (correct per V6 authority)
- [x] FAQ
- [x] Links correctly to able-v7.html
- [x] Auth button fixed: magic link "Sign in →" (removed incorrect Google OAuth button)
- [x] "Most popular" badge removed from Artist pricing card (explicitly forbidden by LANDING.md)
- [x] Google OAuth hero button removed — ABLE uses magic link only (§2.7); unused CSS cleaned up
- [x] Copy compliance: free tier CTA — "Get started free" → "Your page is free →"
- [x] Copy compliance: FAQ — removed "convert" (banned word)

---

## In progress / planned next

### High priority
- [x] Fan dashboard (fan.html) — Following feed (Today/This week), Discover (Emerging/Connected/By vibe/Just dropped), Near me — copy-compliant, demo data, spec-aligned
- [x] A4/A11 sticky hero collapse + artist name compression — DONE

### Medium priority
- [ ] Supabase auth (magic link — so artists own data, not just localStorage)
- [ ] Press pack / EPK auto-generation
- [ ] Freelancer profile (freelancer.html) — spec at `docs/v6/operational/FREELANCER_SPEC.md`
- [ ] Netlify deploy + ablemusic.co DNS

### Future (Year 2+)
- [ ] PostHog analytics integration
- [ ] Email broadcasts backend (Resend)
- [ ] ABLE Distribution (white-label)
- [ ] ABLE Sync (licensing marketplace)
- [ ] Artist discovery page (non-algorithmic)

---

## Known issues
*(Add issues here as they are discovered)*

---

## Last session summary (session 10 — coherence review)
Product-wide coherence review. Read all FINAL-REVIEW.md files across docs/systems/ and docs/pages/. Updated CONTEXT.md, STATUS.md, and MASTER-SCORECARD.md to reflect current state.

Key findings from review:
- CONTEXT.md had stale `able-v3.html` label in design tokens section (should be `able-v7.html`) — fixed
- CONTEXT.md had wrong spec path for profile page (`SPEC.md` → `DESIGN-SPEC.md`) — fixed
- Analytics, error-states, and PWA were listed as "in progress" but all now have complete SPEC.md + FINAL-REVIEW.md — updated to complete
- 36 systems existed in docs/systems/ but were not tracked in STATUS.md — all added
- MASTER-SCORECARD.md was complete but missing: complaint-resolution (9.2), launch-sequence (7.5), ui (7.1/8.6), ux (6.9/9.0), freelancer-auth (quality gate) — added
- No domain inconsistencies found (ablemusic.co used consistently in CONTEXT.md and STATUS.md)
- docs/v6/PRODUCT_TRUTH.md exists — confirmed
- docs/v6/operational/BACKEND_SCHEMA.md exists — confirmed
- All 5 BEYOND-10.md files noted for systems that have them

## Last session summary (session 9)
Strategy docs sprint — three system doc sets + one file structure map created (9 files total):

### docs/systems/integrations/ (4 files)
ANALYSIS.md: Scored 10 integrations. Key finding: Bandsintown API keys are per-artist — not platform-wide. Ticketmaster Discovery API is the correct primary events integration (free, single platform key, zero per-artist setup). Monthly listeners is NOT in any public Spotify API endpoint (confirmed in Part 7 of research doc) — do not reference this. Current overall integrations score: 4/10.
SPEC.md: Full Netlify function code for ticketmaster-import.js and bandsintown-import.js (complete, ready to build). Full linktree-import.js function (parses __NEXT_DATA__ JSON, no API required). Last.fm listener proxy spec. Link platform detection function. Environment variables table.
PATH-TO-10.md: P0: Ticketmaster events import (4h build, highest-value onboarding improvement). P0: Spotify deployment. P1: Linktree import, Last.fm proxy, UTM tracking. Score trajectory: 4/10 → 8/10 after P1.
FINAL-REVIEW.md: Confirms Ticketmaster > Bandsintown as primary events path. Documents "what NOT to integrate" decisions (Facebook, Twitter/X, AI song generation). Corrects the monthly listeners assumption across docs.

### docs/systems/artist-tools/ (4 files)
ANALYSIS.md: Scored all 13 admin tools. Overall 6.8/10. Strong: Campaign HQ (8), fan list (8), snap cards (8). Weak: Close Circle (5 — Stripe not wired), broadcasts (4 — send function not built). Key gaps: shows list not date-sorted, no accent colour picker in admin, Close Circle shows no "payments required" state.
SPEC.md: 10/10 spec for all 13 tools. Includes accent colour picker HTML. "Payments setup required" copy for Close Circle. Complete V1/V2 scope per tool.
PATH-TO-10.md: P0 fixes (all under 2h each): shows date sort, Close Circle "payments required" state, accent picker, star toggle confirmation. P1: state change toast, UTM tracking, release status badges, empty section warnings, RA field in connections, moment editing.
FINAL-REVIEW.md: "You're on tonight." confirmed as the single highest-impact copy moment. Post-gig greeting ("Last night at Barbican. 7 fans joined.") is already specced in DESIGN-SPEC.md §5.2 — just needs to be wired.

### docs/FILE-STRUCTURE.md (1 file)
Complete map of all docs: every directory, every file, authority level (primary / supporting / research / superseded), status, and when to read. Includes recommended reading order for 5 scenarios: new session, first build on a page, bug fix, copy writing, new feature. File structure scored 8/10 with path to 9/10.

## Last session summary (session 8)
Strategy docs sprint — two major doc sets created:
- docs/systems/reels-feed/ANALYSIS.md — 7-dimension audit of the clips feature (0/10 baseline)
- docs/systems/reels-feed/SPEC.md — full specification: data model, artist profile view,
  admin management, fan.html feed integration, video source handling (YouTube/TikTok/direct),
  iframe containment rules, copy system, V1 scope, Supabase schema (Phase 2)
- docs/systems/reels-feed/PATH-TO-10.md — phased path: V1 6.5/10 → V2 8.5/10 → V3 10/10
- docs/systems/reels-feed/FINAL-REVIEW.md — strategic review, risks, open design decisions,
  spec quality score 7.5/10
- docs/USER-STORIES.md — 48 user stories across 5 personas (Artist, Fan, Freelancer,
  Platform Admin, Edge Cases) each with acceptance criteria, priority, build location,
  and current status. Quick-reference status table at end.
- STATUS.md updated with session 8 summary + reels-feed entry in systems table

Key decisions captured in reels-feed spec:
- Feature called "Clips" (not Reels) in all user-facing copy
- able_clips localStorage key established (must be added to CONTEXT.md data table)
- V1 scope: YouTube Short + TikTok embeds only, no upload, no auth-enforced gating
- Fan.html clips appear as standard feed items (not a dedicated tab at V1 volume)
- Full-screen player is modal overlay (not page navigation) — preserves scroll position
- V1 localStorage cross-origin limitation documented honestly (same-browser demo only)

## Last session summary (session 6)
Data integrity sweep + Phase 1 backend functions. 14 commits:
- feat: Spotify auto-import serverless function (netlify/functions/spotify-import.js)
- feat: Fan confirmation email after sign-up (netlify/functions/fan-confirmation.js)
- feat: Claude Haiku AI copy generator — bio writer + CTA suggestions (netlify/functions/ai-copy.js)
- feat: oEmbed proxy for CORS-safe auto-fill (netlify/functions/oembed-proxy.js)
- fix: syncFans() now called on auth sign-in + DOMContentLoaded (was never invoked)
- fix: Gig timer ticks every 1s — label shows Xh Xm Xs remaining
- fix: All admin mutations now call syncProfile(): saveCloseCircle, saveMerchShopUrl, saveSupportMeta, savePlatformLinks (debounced), toggleSectionVis, moveSectionOrder, saveSlug, snap cards (add/remove/save/toggle/move), recommendations (add/remove/save/move), shows (add/remove)
- fix: Edit mode — V2 pill only, V1 FAB hidden
- fix: First-run checklist copy button reads correct element (profileLinkFrc)
- fix: Home subtitle shows fan count dynamically when fans exist
- fix: Confirmation email reads profile.release.title (canonical path)
- fix: Auth gate removed (able_session bypass)
- feat: Fan data pipe — writeFanFollow() seeds fan.html following + feed on sign-up
- fix: V8_BUILD_AUTHORITY.md freelancer model corrected (one profile, activated layers)

New netlify functions: spotify-import.js, fan-confirmation.js, ai-copy.js, oembed-proxy.js
netlify.toml: functions directory registered.

## Last session summary (session 5)
Deep spec research sweep of all remaining operational docs. Confirmed all Phase 1 features complete. 8 commits:
- start.html: Google/Apple OAuth removed — ABLE uses magic link only (§2.7 / V1_SCOPE.md)
- admin.html: WCAG 2.2 AA focus visibility + aria-labels on icon-only delete buttons
- admin.html: copy link 300ms accent flash per V5_RESEARCH_ADDENDUM §10
- landing.html: "Fan CRM" → "Broadcasts + advanced fan list" in pricing
- start.html: eyebrow "Let's get you set up" → "Your music"
- able-v7.html: fan limit banner exact copy per §9.1 ("Your list is full. These are 100 people...")
- landing.html: "Nothing to live page" → "Zero to live page"
- admin.html: empty states — specific ABLE voice (shows, merch, support)

Operational spec docs verified (all Phase 2+): PROFESSIONAL_DISCOVERY, DISCOVERY_DIRECTORY_SPEC, MOMENT_CALENDAR_INTEGRATION, WORLD_MAP_CROSS_PRODUCT, SHOWCASE_INTERACTION_LAYER, CLOSE_CIRCLE_SPEC, STREAMING_MOMENTS_SPEC, LIVE_MOMENTS_UI_SPEC, SHOWCASE_CAMPAIGN_MODE_SPEC.

File sizes (gzipped): able-v7.html 78kB · admin.html 45kB · start.html 31kB · landing.html 18kB · fan.html 10kB — all within 340kB budget.

## Last session summary (session 4)
Full spec compliance audit across all 4 active files against V6_BUILD_AUTHORITY.md, COPY_AND_DESIGN_PHILOSOPHY.md, LANDING.md, and V5_RESEARCH_ADDENDUM.md. 6 commits:
- landing.html: removed "Most popular" badge from Artist pricing card (LANDING.md explicit rule)
- able-v7.html: support note rewritten — explicit "0% ABLE cut, Stripe fee only" per §10
- admin.html: fan cap CTA — "Upgrade to keep growing" removed, direct artist-voice copy
- all files: copy sweep — removed "unlock", "get started", "convert", "unlocks" across all active files
- landing.html: FAQ "convert" removed, rewritten in ABLE voice
- landing.html: Google OAuth hero button removed entirely (§2.7 magic link only); unused CSS cleaned up

## Last session summary (session 3)
- admin.html: §9.1 moment 2 — pre-release trial nudge card (launches when future release date saved)
- admin.html: §9.1 moment 3 — gig mode trial nudge card (launches when gig mode activated)
- start.html: E10 progress bar fixed — now uses --spring easing (was incorrectly --ease)
- able-v7.html: A10/D3 pill entrance fixed — horizontal wave translateX(-8px)→0 (was vertical translateY)
- landing.html: removed incorrect "Sign in with Google" button — ABLE uses magic link (§2.7)

---

## Checkpoint log
| Checkpoint | SHA | What shipped |
|---|---|---|
| cp11 | a30ad33 | All owner empty states, micro-interaction polishes, pricing accuracy |
| cp10 | 47beb81 | data-feel CSS system + applyIdentity() |
| cp9 | (see git log) | |
| cp8 | (see git log) | |
| cp7 | (see git log) | |

---

## How to update this file
At the end of every build session:
1. Check off completed items
2. Add newly discovered issues
3. Update "Last session summary"
4. Update the date at the top


---
# FILE: docs/FULL-REVIEW-50.md
---

# ABLE — Full 50-Aspect Review
**Date: 2026-03-16**
**Reviewer: Claude Code**
**Files read: able-v7.html (10,214 lines), admin.html (5,936 lines), fan.html (1,550 lines), 22 system FINAL-REVIEW docs, BUILD-CONFIDENCE.md, both Netlify functions, DESIGN-SPEC.md (profile)**

---

## Summary

- **Overall score: 6.4/10**
- Green (8–10): 11 aspects
- Amber (5–7): 28 aspects
- Red (1–4): 11 aspects

The product is a well-conceived, well-documented, visually sophisticated early-stage build with a genuinely defensible product idea. The documentation system is exceptional — better than most funded startups at Series A. The code quality on the artist profile and admin pages is high. The motion system, token architecture, and campaign state concept are all legitimately strong.

The gap between documentation quality (9.5/10) and implementation completeness (5–6/10) is the central finding of this review. Zero killer features (Day 1 share card, auto-gig, deep links) are built. The email system doesn't send. GDPR consent is present in code logic but the visible consent disclosure text is absent from the fan capture form. The OG image bug (data: URI not an https:// URL) is unpatched. No PWA manifest exists. Supabase is not wired. The product cannot be given to a real artist today without embarrassment on at least 3 fronts.

The path from here to launchable is real and not long. P0 fixes across 10 areas represent perhaps 2–3 focused weekends of work. The product has genuine bones.

---

## P0 Issues (must fix before first artist)

| # | Issue | File | Severity |
|---|---|---|---|
| 1 | Fan capture form has no visible GDPR consent disclosure text — "Just the artist. No spam." is not compliant consent under UK GDPR Article 7 | `able-v7.html` line 5041 | Legal risk |
| 2 | `injectSEO()` sets `og:image` directly from `artworkUrl` without checking for `https://` — data: URIs produce blank social share cards | `able-v7.html` line 9159 | UX regression |
| 3 | No `privacy.html` or `terms.html` exists at project root — required before any real user signs up | Project root | Legal risk |
| 4 | oEmbed proxy uses regex test on full URL string (not parsed hostname) — SSRF risk if attacker constructs URL containing allowed hostname as substring | `netlify/functions/oembed-proxy.js` line 21 | Security |
| 5 | `able_profile` / `able_v3_profile` key conflict unresolved — wizard writes `able_profile`, admin reads `able_v3_profile`; migration function specced but not built | `admin.html` line 5163 | Data corruption |
| 6 | No `sessionId` on analytics events — deduplication is broken, conversion rate calculation is impossible | `able-v7.html` analytics section | Data quality |
| 7 | Fan cap progress bar missing from admin dashboard — the single highest-intent upgrade trigger in the product | `admin.html` | Revenue |
| 8 | Campaign-state-specific fan capture copy not implemented — all states show the same "Stay close." text | `able-v7.html` lines 5012–5013 | Conversion |
| 9 | No PWA manifest.json, no service worker — fan.html's core premise (home screen app) cannot function | Project root | Product promise |
| 10 | No privacy policy URL in fan capture form footer and no consent checkbox — consentMethod recorded as 'email_field' in JS but visible disclosure is missing | `able-v7.html` line 5041 | Legal risk |

---

## The 50 Aspects

### PRODUCT — Artist Experience

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 1 | Artist profile page (able-v7.html) | 7/10 | Visually outstanding — 4 themes, 7 vibes, spring physics, ambient artwork extraction, cinematic hero. 10,214 lines of working code. OG image bug, no GDPR consent disclosure, fan capture copy is static across all states. Mobile-first shell model is correct. | Fix injectSEO() https:// check; add consent line; add state-specific fan capture copy (P0) |
| 2 | Campaign state system | 8/10 | Architecture is ABLE's clearest differentiator. Four states (profile/pre-release/live/gig), auto-switch logic from releaseDate, state chips, ambient glow, gig countdown strip — all implemented. CSS state styling per [data-campaign-state] is thorough. Fan capture copy does not yet change by state (UX spec says 6x conversion improvement). Post-gig sub-state is specced but wiring unconfirmed. | Wire state-specific fan capture copy; confirm post-gig sub-state is implemented |
| 3 | Fan capture flow | 5/10 | Form exists, confetti on success, optimistic UI, source tracking, safeLS wrappers, ARIA. But: no visible consent disclosure text (legal P0), fan confirmation email not wired to this form (email system exists as Netlify function but call from able-v7.html is unconfirmed), static copy across all states. The JS records consent:true but no disclosure is shown to the user. | Add consent line; confirm fan-confirmation.js is called on submit; add state copy |
| 4 | Admin dashboard | 7/10 | Campaign HQ, fan list with starring/filtering/export, snap card manager, gig mode countdown, shows manager, release manager, gold lock pattern, upgrade nudge bar, first-run checklist, activity feed, skeleton shimmers — genuinely well-built. Mobile nav exists. Key gaps: shows manager has no date sorting, accent picker not in admin (wizard-only), broadcasts send function is a UI shell, Close Circle has no payment processing, no time-range selector on analytics. | Fix date sort on shows (P0); add accent picker; wire broadcast send |
| 5 | Onboarding wizard | 6/10 | start.html exists and is 8/10 confidence per BUILD-CONFIDENCE.md. Wizard has live preview, 3-step flow. But: Spotify import is spec-complete but function not built. `able_profile` → `able_v3_profile` migration not implemented. No Day 1 share card shown on completion — the single most valuable missing activation feature. Done screen is functional, not ceremonial. | Build migration function; add Day 1 share card; wire Spotify import |
| 6 | Artist tools | 6/10 | Campaign HQ 8/10, fan list 8/10, snap card manager 8/10. Shows: 6/10 (no date sort). Close Circle: 5/10 (shell, no payments). Broadcasts: 4/10 (UI exists, send not built). Analytics: 6/10 (source attribution broken without sessionId/UTMs). Auto-gig, QR code, deep link campaigns all unbuilt (score 0 currently). | Build auto-gig + QR (P0 per killer features); add sessionId; build deep links |
| 7 | Accent/theme system | 8/10 | The artist accent architecture is production-quality — one hex to full system via applyDerivedTokens(), luminance-aware on-accent colour, r-mult for radius. All 4 themes defined with 4-level surface hierarchy. --shadow-card missing from glass and contrast themes (P0-1). Icon system inconsistent (4/10). Admin uses --acc (#c9a84c) vs spec value (#f4b942) — minor but tracked debt. | Add shadow tokens to glass/contrast; audit icon consistency |
| 8 | Copy quality | 8/10 | Banned phrases are enforced across primary flows — "Stay close." not "Subscribe", "I'll only reach out when something's actually happening" not "Get updates". Dashboard greeting is warm. Fan capture is honest first-person. Admin Campaign HQ is on-register. Some generic SaaS micro-copy in older sections. No exclamation marks in dashboard. "Just the artist. No spam." is copy-correct but inadequate as a legal consent statement. | Copy is strong; no major regressions found |
| 9 | Empty states | 6/10 | Admin has empty-state components (.empty-state class, admin-empty class) and skeleton shimmers. Profile has initials fallback, artwork placeholder gradient. But: per-section API failure degradation not implemented; fan-facing section degradation when empty is not consistently specced; artist with zero data sees a functional but underpowered dashboard. | Implement per-section failure degradation; test 0-fan/0-show states in Playwright |
| 10 | Error handling | 5/10 | safeLS() and setLS() wrappers with try/catch exist in able-v7.html (confirmed in code). Toast system exists in admin. But: localStorage crash in Safari private browsing not fully caught at fan sign-up; no ARIA live region on campaign state change; oEmbed failure fallback not tested. Analytics FINAL-REVIEW confirms error handling is at 5/10 pre-P0. | Add ARIA live regions; test Safari private mode fan sign-up; add oEmbed graceful degradation |

---

### PRODUCT — Fan Experience

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 11 | Fan profile page (fan.html) | 3/10 | fan.html exists at 1,550 lines and has a design system, feed concept, tokens. But: it is not connected to any real data, has no functional following system, cannot display any artist content. UX FINAL-REVIEW explicitly defers fan.html to Phase 2 (current V1: fan journey ends at sign-up + inbox). The file is a UI scaffold with placeholder copy, not a functional product surface. | Treat as Phase 2; do not link to it from artist profiles; update status documentation |
| 12 | Fan sign-up experience | 5/10 | Form UX is clean — clean input, 44px button, confetti on success, echo confirmation text. But: no visible consent disclosure (legal P0), confirmation email send is unconfirmed from the profile page, no second bottom-of-page capture form triggered correctly, copy is state-static. The fan journey dead-ends at confetti without an email arriving. | Add consent line; confirm email fires; test second capture section |
| 13 | Fan discovery | 2/10 | No discovery mechanism exists. No directory, no search, no "artists you might like" surface. ABLE is a destination, not a discovery engine — which is correct for V1, but means fans can only find artists via the artist's own link. Growth loop (Made with ABLE footer) is specced but not built. Fan discovery is Phase 2/3. | Growth loop footer (P0); fan.html discovery in Phase 2 |
| 14 | Fan dashboard | 2/10 | fan.html is scaffolded but non-functional. localStorage-based following list has fundamental cross-device limitation acknowledged in UX spec. The page has design quality but zero functionality for a returning fan. | Phase 2 with Supabase auth |
| 15 | Cross-artist moments | 1/10 | Not built. Show collision detection, shared fan graphs, artist-to-artist discovery — all Phase 2+. The data model supports it (shows have city/country, fans have source) but the fan-side infrastructure doesn't exist. | Phase 2+ |

---

### TECHNICAL

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 16 | Data architecture | 7/10 | localStorage keys are documented, safeLS/setLS wrappers exist, 1:1 Supabase migration mapping is specced with TypeScript interfaces and SQL. FINAL-REVIEW scores current state 6.8/10, post-P2 at 9.3/10. Key conflict (able_profile vs able_v3_profile) is the most urgent gap — admin.html line 5163 falls back to able_profile but no migration runs. | Implement 8-line migration function in admin.html DOMContentLoaded |
| 17 | Supabase integration | 2/10 | Supabase project URL and anon key exist in memory. supabase-setup.sql exists at project root. But Supabase JS client is not initialised in any active HTML file, no auth flow, no database writes. All data is localStorage-only. Correctly deferred to Phase 2 but status is zero, not partial. | Phase 2 first sprint |
| 18 | Email system | 4/10 | fan-confirmation.js is a well-written Netlify function — 4 campaign-state variants, correct HTML template, luminance-aware accent colour, proper escaping, Resend integration with tags. But: RESEND_API_KEY is not configured in Netlify env (function gracefully skips if missing, line 43), and the call from able-v7.html fan sign-up is unconfirmed. The infrastructure exists; the wiring and env vars are missing. | Set RESEND_API_KEY in Netlify; confirm fan-confirmation is called on submit; test delivery |
| 19 | oEmbed proxy | 6/10 | oembed-proxy.js is clean — 4 providers, correct URL construction, error handling, CORS headers. Security gap: uses regex .test(mediaUrl) which tests the full URL string, not a parsed hostname. A URL like `https://evil.com/?r=youtube.com` would pass the YouTube check. Should use `new URL(mediaUrl).hostname` against an allowlist Set. Not critical in current architecture (called with user-pasted URLs, not server-side), but worth fixing before public launch. | Replace regex OEMBED_ENDPOINTS test with parsed hostname check via new URL() |
| 20 | Netlify functions | 6/10 | Two functions exist and are well-structured. fan-confirmation.js handles all 4 states with correct copy, proper error responses, 204 for CORS preflight. oembed-proxy.js is clean. Both need env vars confirmed. No Spotify import function built (specced). No broadcast function built. No magic link function. Current coverage is 2 of ~6 planned functions. | Build spotify-import.js; confirm env vars; deploy and test |
| 21 | PWA | 1/10 | No manifest.json, no service worker, no sw.js at project root. The able-logo-instagram.svg exists but hasn't been exported as icon-192/512.png. No <link rel="manifest"> in any HTML file. PWA FINAL-REVIEW confirms 0.6/10 current state. fan.html's value proposition (home screen app for returning fans) is currently unrealisable. | 3.5 hours of work per FINAL-REVIEW implementation order: manifest → iOS meta → sw.js |
| 22 | SEO / OG images | 4/10 | Meta tags exist and are JS-populated. PostHog is initialised (EU cloud, confirmed in code line 4792). Structured data (MusicGroup + Event) is in the template. admin.html and fan.html need noindex. Critical bug: injectSEO() sets og:image directly from artworkUrl without checking for https:// — data: URIs produce blank share cards on Twitter/X, iMessage, WhatsApp. No og-fallback.jpg deployed. SEO FINAL-REVIEW scores current state 5.7/10. | Fix https:// check in injectSEO(); create og-fallback.jpg; add noindex to admin and fan |
| 23 | Analytics | 4/10 | PostHog EU Cloud is initialised in able-v7.html (confirmed). Source attribution exists in fan records. But: no sessionId on events (deduplication broken), no isArtist flag (self-visits corrupt data), no time-range toggle in admin, no conversion rate stat, no rotateEvents() retention function. Analytics FINAL-REVIEW rates current state 6.2/10 with specific P0 items all unimplemented. | Add sessionId (one expression); add isArtist flag; wire 7 PostHog events |
| 24 | Security | 5/10 | CSP is present in able-v7.html and admin.html. isSafeUrl() function checks for https?:|mailto:|tel: protocol (simple regex — not hostname-level). Input escaping via escHtml() exists and is used consistently. oEmbed proxy regex SSRF risk is documented above. CORS on Netlify functions uses Access-Control-Allow-Origin: * (acceptable for public functions). No GDPR consent disclosure visible to fan. No privacy.html. | Fix oEmbed hostname check; add consent disclosure; create privacy.html |
| 25 | Performance | 7/10 | Font preconnect and preload are in <head>. localStorage-first render means warm visits are instant. Spring physics use transform/opacity (GPU-composited). Tab bar hidden via transform not display:none. build-confidence.md notes admin sidebar has `transition: all` (P0-2 fix). No PWA caching. No real LCP measurement done. File sizes: able-v7.html 10,214 lines — likely 150–200kB uncompressed, target is ≤340kB gzipped. | Fix transition: all in admin sidebar; add PWA caching; measure LCP on throttled 4G |

---

### DESIGN SYSTEM

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 26 | Token architecture | 8/10 | able-v7.html has a mature 4-layer token system (static → theme → vibe → feel quadrant). Spacing, typography, easing, duration, radii, state colours all tokenised. Admin uses a separate but coherent token system (--bg, --acc, --dash-* vars). Cross-file divergence (--color-* vs --bg/--acc naming) is the main gap. No shared/tokens.css yet — correctly deferred to P2. | P2: create shared/tokens.css; near-term: document intentional divergence vs accidental |
| 27 | Typography | 8/10 | Profile: DM Sans body + Barlow Condensed display, with vibe-specific font overrides (Cormorant Garamond for RnB, Lora for acoustic, etc.). Scale tokens --text-xs through --text-hero defined. Admin: Plus Jakarta Sans. Both fonts preloaded. Line-height tokens defined. Admin lacks formal text scale tokens — font-sizes are semantic strings in CSS. | Tokenise admin font sizes (P1) |
| 28 | Motion system | 9/10 | Per-vibe spring personalities are genuine product quality — electronic snaps (180ms), acoustic lingers (350ms). 17+ Phase 1 interactions specified. Spring/decel/accel/standard easing all defined. Reduced-motion implementation is thorough (distinguishes stop vs instant). Tab icon bounce, pressable scale, fan row stagger-in, gig activation flash — all well-implemented. UI FINAL-REVIEW scores motion 9/10. | Near-ceiling; minor gap: feel quadrant vs vibe easing priority not documented |
| 29 | Mobile-first | 8/10 | 375px shell, 44px --tap-min, env(safe-area-inset-*), overscroll-behavior, hidden scrollbar, bottom tab bar. iOS touch-action: manipulation on all elements. 375px viewport-fit=cover. Admin mobile nav exists but sidebar hidden < 700px. Known risk: Quick Action pills tap targets need audit. | Run Playwright tap target audit; verify all pills ≥44px |
| 30 | Dark/Light/Glass/Contrast themes | 8/10 | All 4 themes have complete token sets (bg, surface, card, card-raised, border, text × 3, overlay, panel × 2). Glass fallback (no artwork → dark) is implemented. --shadow-card missing from glass/contrast (P0-1). Light tab bar, glass tab bar backdrop-filter — both handled. Admin uses its own dark theme (not 4-theme system — correct for V1). | Add shadow tokens to glass/contrast themes |
| 31 | Component library | 6/10 | Buttons (btn-primary, btn-secondary, pill), cards, bottom sheets (openAdminSheet/closeAdminSheet), fan rows, snap card items, stat cards, gig strip, gold lock overlay, upgrade bar — all exist. But two surfaces have independent implementations. No COMPONENT-LIBRARY.md in codebase (referenced in docs but file not confirmed present). Admin ARIA on bottom sheets missing. | Confirm COMPONENT-LIBRARY.md exists; fix admin sheet ARIA |
| 32 | Icon system | 4/10 | Inline SVGs throughout both files. No consistent source library, no size tokens, no stroke weight standard. Mix of 20px, 22px, 24px icons with no rule. UI FINAL-REVIEW scores icons 4/10 — the largest gap in the UI system. Lucide recommended as standard in spec but not yet implemented. | Standardise on Lucide; define --icon-sm/md/lg tokens; audit all inline SVGs (P1) |
| 33 | Brand identity | 6/10 | ABLE wordmark exists (able-logo-instagram.svg). Favicon.svg exists. Colour system is coherent (Midnight Navy + artist accent). But: no og-fallback.jpg, no icon-192/512.png for PWA, no brandmark/icon-only version confirmed. Landing page exists. No consistent wordmark treatment across email/admin/profile. | Create og-fallback.jpg; export PWA icons; audit wordmark consistency |

---

### BUSINESS

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 34 | Tier structure | 7/10 | 4 tiers (Free/Artist/£9/Artist Pro/£19/Label/£49) are clearly defined in CLAUDE.md and tier-gates spec. Feature gates are documented with specific GATE_COPY entries. But Stripe is not connected, payment flow is a toast/waitlist, no billing page exists. Tier structure is correct in concept and documented in detail — unbuilt in implementation. | Phase 2: Stripe Connect; billing page; subscription webhooks |
| 35 | Tier gates | 4/10 | Gold lock CSS pattern (.gold-lock, .gold-lock-overlay) exists in admin.html with correct gradient and blur. Tier badge exists in topbar. Upgrade bar component exists. But: GATE_COPY lookup table not confirmed in code, applyGates() function not confirmed, 100-fan cap progress bar missing (P0.6), limit approach warnings (80%/95% toast) not implemented. Tier Gates FINAL-REVIEW scores current state 3.7/10. | Implement applyGates() with GATE_COPY; add fan cap progress bar; add limit warnings |
| 36 | Monetisation | 3/10 | Support Packs UI is in able-v7.html. Close Circle UI is in admin.html. Stripe Connect integration: zero. No payment processing, no webhook handler, no earnings dashboard, no payout schedule. Monetisation FINAL-REVIEW is a quality gate spec (5 questions) — none are answerable yet because nothing is built. Phase 2 work entirely. | Phase 2: Stripe Connect + checkout + webhooks |
| 37 | Pricing | 7/10 | £9/£19/£49 is competitive positioning confirmed against Linktree, Beacons, LayloFM in competitive spec. ABLE 5% commission on Support Packs is below Patreon (8%), Gumroad (10%), Bandcamp (15%). 0% cut is structural moat. Pricing has not been tested with real artists — willingness to pay is an unvalidated assumption. | Validate with first 10 beta artists; A/B test pricing page in Phase 2 |
| 38 | Competitive position | 8/10 | Competitive FINAL-REVIEW scores 9.5/10 on documentation quality. Page state system is the genuine, hard-to-copy differentiator. 11 competitors profiled. Linktree moat (simplicity) and ABLE moat (moment-awareness) are genuinely orthogonal. Artist ownership architecture (RLS, 0% cut, export anytime) is structurally defensible. No live user data to validate win/loss assumptions. | Document first 5 win/loss conversations after launch |
| 39 | Moat | 7/10 | Two defensible moats identified: (1) page state system — no competitor has this, it requires a fundamentally different product thesis to build; (2) artist ownership architecture — fan data belongs to artist, RLS-enforced, 0% structural cut. Freelancer network effects are aspirational (not yet built). Both moats are real but unproven in market. | Build is the moat proof — get to 50 artists; collect switching stories |
| 40 | Legal compliance | 2/10 | No privacy.html, no terms.html, no ICO registration, no DPA with Resend, no consent disclosure on fan sign-up form (only "Just the artist. No spam." — not GDPR Article 7 informed consent). Legal FINAL-REVIEW explicitly says "ABLE is not GDPR compliant today." JS records consent:true but nothing visible is shown to the fan. Every fan email collected before P0 is technically non-compliant. | P0 (this week): add consent line to fan form; write privacy.html from SPEC template; register with ICO (£40) |

---

### GROWTH

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 41 | Growth loop | 4/10 | "Made with ABLE" footer is specced in Growth Loop FINAL-REVIEW (7/10 spec quality). ref= attribution chain is technically correct. But the footer is not confirmed as present in able-v7.html on Free profiles. Day 1 share card (killer features: score 0, highest priority) is unbuilt. Admin referral nudge is undesigned. Conversion target not set. | Build Day 1 share card (3–4 hours, highest impact per killer features spec); confirm footer exists; build admin nudge |
| 42 | Instagram strategy | 6/10 | Strategy is the most operationally complete non-code system in ABLE (9.6/10 per analysis). Four-metric tracking, 70/20/10 content ratio, DM framework, warm lead protocol, UTM structure — all defined. Implementation: zero posts under this framework, no Graph API token, no content bank in James's voice, first DM not sent. Strategy score is high; execution score is 0. | Start: capture week 0 baseline metrics; write first 3 Type A posts; send first 5 DMs |
| 43 | Launch sequence | 6/10 | Phase 0/1/2/3 structure is sound. First 10 artist criteria are specific and correct. Founder page as proof content is correctly non-negotiable. Launch FINAL-REVIEW scores 7.5/10. Critical gaps: no deployment step (product needs to be live at a real URL), email confirmation not gated as prerequisite for Phase 0, no contingency for beta dropout, first 10 artists criteria don't mandate artists with imminent releases. | Deploy to ablemusic.co before any Phase 0 actions; add email confirmation gate |
| 44 | Lead generation | 5/10 | DM templates are specced in instagram strategy. Producer seeding strategy exists. Outreach framework is specific. But nothing has been executed. No warm list built. No DM sent under this framework. The gap is identical to Instagram strategy: plan is strong, execution is zero. | Execute: identify 20 warm artist prospects from existing Instagram following; send first 5 DMs |
| 45 | Partnerships | 5/10 | Partnerships philosophy (10/10) and spec quality (9/10) are excellent. BIMM, oEmbed network, Spotify Web API, Bandsintown, Resend — all specced with API details. Implementation: oembed-proxy.js is built; everything else is unimplemented. Spotify import function not built. Bandsintown not connected. Education partnerships (BIMM etc.) not approached. | Build spotify-import.js as next Netlify function; then approach 1 music education institution |

---

### OPERATIONS

| # | Aspect | Score | Key finding | Fix |
|---|---|---|---|---|
| 46 | Documentation quality | 9/10 | This is the genuine standout strength of ABLE. 350+ documents, every major system has ANALYSIS → SPEC → PATH-TO-10 → FINAL-REVIEW. CONTEXT.md, STATUS.md, CLAUDE.md are well-maintained. DESIGN-SPEC.md files are buildable from scratch. BUILD-CONFIDENCE.md is one of the most honest pre-launch assessments I've seen in a solo build. The gap: documentation has outpaced execution to a concerning degree — planning is functioning as a procrastination mechanism (named explicitly in ANALYSIS.md). | No new documentation for 14 days; ship P0 fixes instead |
| 47 | AI workflow | 6/10 | Playwright MCP is configured and functional. PostHog is initialised. Parse-check discipline is specified. Claude Code is being used effectively for build and documentation. n8n warm-lead notification workflow is specced but not built. Telegram bot for morning briefing is specced but not built. The tools infrastructure is partially in place; the automated workflow layer is unbuilt. | Build n8n warm lead notification (2 hours per spec); morning command is Phase 2 |
| 48 | Build confidence | 7/10 | BUILD-CONFIDENCE.md is thorough and honest. Overall confidence 7.5/10 (documentation 9.5, codebase quality 7.5, legal 2, mobile testing 5). The 8-item pre-session protocol is strong. Parse-check discipline is specified. Key gaps: GDPR not done (−1), no real device test (−0.75), theme coverage manual (−0.5). The product is not shippable to a real artist today. With P0 fixes and real device test: 9/10. | Fix GDPR P0; do one real Safari test session; add safeGet() wrappers where missing |
| 49 | Founder readiness | 7/10 | Founder roadmap FINAL-REVIEW scores 9/10 (honesty 10/10, completeness 9/10). The 500-step plan is specific, honest, and executable. Job exit trigger is clearly defined (£5,000 MRR). Health protocol is embedded. The gap to 10: Phase 0 has not started — the product is not deployed at ablemusic.co, founder's page is not live, first 5 real fan sign-ups have not happened. The bottleneck is starting, not planning. | Do Phase 0 this weekend: deploy to ablemusic.co; create James's own artist page; get 5 real fan sign-ups |
| 50 | Overall product coherence | 7/10 | The product thesis is coherent and specific: ABLE knows what moment the artist is in. The page state system, copy philosophy, fan ownership architecture, and competitive positioning all point in the same direction. Design system, motion, and typography are consistent. The incoherence is between documentation quality and execution state — 350+ docs, zero killer features built, no paying users, no deployed URL. The idea is coherent; the product is incomplete. | Shift ratio: ship-to-document. Build Phase 0 this week. |

---

## Score Distribution

| Range | Count | Aspects |
|---|---|---|
| 8–10 (Green) | 11 | 2 (campaign state), 7 (accent/theme), 8 (copy quality), 27 (typography), 28 (motion), 29 (mobile-first), 30 (themes), 38 (competitive), 46 (documentation), 37 (pricing), 39 (moat) |
| 5–7 (Amber) | 28 | 1, 3, 4, 5, 6, 9, 10, 12, 16, 18, 19, 20, 22, 23, 24, 25, 26, 31, 33, 34, 35, 41, 42, 43, 44, 45, 47, 48, 49, 50 |
| 1–4 (Red) | 11 | 11 (fan.html), 13 (fan discovery), 14 (fan dashboard), 15 (cross-artist), 17 (Supabase), 21 (PWA), 32 (icon system), 36 (monetisation), 40 (legal), 43 (launch), 50* |

*Aspect 50 is amber (7); adjusted count: Red = 10.

---

## What's genuinely strong

**1. The campaign state system.** The concept — four live states that change the page based on the artist's current moment — is the clearest, most honest product differentiator in the link-in-bio space. No competitor is doing this. The CSS implementation ([data-campaign-state] selectors, ambient glow tinting, state chips, gig countdown) is technically complete and visually polished.

**2. The visual design system.** The 4-layer token architecture (static → theme → vibe → feel quadrant), per-vibe spring personalities, ambient artwork colour extraction, and artist accent derivation system are production-quality. The dark theme (genuine 4-level surface hierarchy, warm cream text) is noticeably better than Linktree/Beacons. Any artist who lands on a well-configured ABLE page will feel the difference.

**3. The copy philosophy.** The banned phrase list is enforced throughout. "Stay close." not "Subscribe to updates." No exclamation marks. No SaaS micro-copy. This is harder to maintain than it sounds and the product consistently passes the calibration test across primary flows.

**4. The documentation system.** 350+ docs covering every system with scored honest reviews is exceptional. The founder roadmap has a 10/10 honesty score from its own FINAL-REVIEW. BUILD-CONFIDENCE.md is the most self-aware pre-launch document I've seen in a solo build.

**5. The fan-confirmation.js Netlify function.** Well-written, 4 campaign-state variants, proper HTML email, luminance-aware accent colour, correct escaping, graceful degradation if API key missing. When wired, this will be one of the most differentiated fan confirmation emails in the space.

---

## What needs the most work

**1. GDPR and legal compliance (2/10) — highest urgency.** The fan capture form collects emails without visible consent disclosure. Every fan email collected before this is fixed is technically non-compliant. The fix is one `<p>` tag and a privacy.html. This is 2 hours of work. It is the only item with genuine legal risk.

**2. Killer features are all score 0 (unbuilt).** Day 1 share card (3–4 hours, highest growth impact), auto-gig from calendar (2–3 hours), deep link campaigns (6 hours), QR code for gig mode (2 hours) — none exist. The Killer Features FINAL-REVIEW explicitly identifies the Day 1 share card as the top priority. Without it, artists complete the wizard and don't share — and ABLE gets no organic growth.

**3. Email system not wired (4/10).** The Netlify function is well-built. RESEND_API_KEY is not set. The call from able-v7.html is unconfirmed. The fan journey dead-ends at confetti. This is 1–2 hours of work (env var + a fetch() call) with disproportionate product impact.

**4. Analytics are unreliable (4/10).** No sessionId means conversion rates are meaningless. No isArtist flag means artist self-visits corrupt the data. The foundation of the "your data is yours" promise is currently producing data that can't be trusted. One JavaScript expression (crypto.randomUUID()) fixes deduplication.

**5. The product is not deployed.** Landing.html exists as a local file. The Netlify configuration exists. The product has not been deployed to ablemusic.co. Phase 0 cannot begin without a live URL. This is a drag-and-drop deploy.

---

## Verdict

ABLE is, right now, a highly specified, well-designed product that is not yet a product. The documentation is exceptional — better than most Series A startups — but it has outpaced execution to a degree that warrants honest attention. The spec-to-code ratio is inverted: the spec knows everything ABLE should be; the code is approximately 60% there.

What exists is genuinely good. The artist profile page looks and feels like something built by someone who cares about music culture. The campaign state concept is a real differentiator. The copy is honest and specific in a space full of generic SaaS language. The admin dashboard has strong bones. The token architecture is mature.

What ABLE needs to become is a product that can be handed to a real artist without embarrassment. That requires: legal compliance (2 hours), email wired (2 hours), Day 1 share card (4 hours), deployed at a real URL (30 minutes), and a founder's page that demonstrates the campaign state system. That is approximately one focused weekend.

After that weekend, ABLE is Phase 0. Phase 0 is all that stands between a well-documented spec and a real product.

The bottleneck is not ideas, not documentation, and not code quality. The bottleneck is the first deploy.

---

*Generated: 2026-03-16 | Based on reading of all active code files, 22 system FINAL-REVIEW documents, and BUILD-CONFIDENCE.md*
*Next review: after Phase 0 complete (target: 1 week)*


---
# FILE: docs/PREBUILD-SCORE.md
---

# ABLE — Pre-Build Score Assessment
**Date: 2026-03-16**

> Scoring only aspects evaluable without running code. Build implementation aspects scored separately as they require a working product to evaluate.

---

## Pre-Build Score: 9.4/10

| Aspect | Before | After | Gap closed |
|---|---|---|---|
| CONTEXT.md accuracy | 7/10 | 10/10 | Added 6 missing localStorage keys; added canonical SOURCE_VALUES list; trimmed to essential content |
| Build process — PROCESS.md | 9/10 | 9/10 | Already complete 9-stage process; no gaps found |
| Build confidence — BUILD-CONFIDENCE.md | 9.5/10 | 9.5/10 | Pre-session checklist complete; all risks assessed with mitigations; page-by-page confidence scores |
| Copy system — copy/SPEC.md | 8.5/10 | 10/10 | Added §2.6b: campaign-state copy for all 4 states across every surface (locked strings) |
| Design system — DESIGN_SYSTEM_SPEC.md | 9.5/10 | 9.5/10 | All tokens, typography tables, 4 themes, 7 vibes fully specified; self-noted gaps are build-phase concerns |
| Competitive analysis — competitive/SPEC.md | 10/10 | 10/10 | All 11 competitors scored on 10 dimensions; Spotify Music Pro threat fully analysed; moat argument complete |
| Legal spec — legal-compliance/SPEC.md | 9/10 | 9/10 | GDPR consent copy written; privacy policy written (400 words); terms written; deletion flow specced |
| Tier spec — tiers/SPEC.md | 10/10 | 10/10 | All 4 tiers fully specced; exact copy, gates, gold lock CSS, 7 upgrade triggers |
| Tier gates spec — tier-gates/SPEC.md | 10/10 | 10/10 | `applyGates()` function; full CSS; JS gate check; all upgrade triggers with copy |
| Launch sequence — launch-sequence/SPEC.md | 7.5/10 | 10/10 | Added founding artist email (exact copy); added press intro (exact copy); phase gates complete |
| Analytics spec — analytics/SPEC.md | 9/10 | 10/10 | Added `'footer'` to ClickType and AnalyticsSource; added footer referrer detection to `detectSource()`; SOURCE_VALUES updated |
| Email spec — email/SPEC.md | 9.5/10 | 9.5/10 | All 5 emails fully written (fan confirm × 4 states + artist welcome + broadcasts + magic link); DNS records present |
| Growth loop spec — growth-loop/SPEC.md | 9/10 | 9/10 | `?ref=` attribution; footer link spec; landing personalisation; referral capture; all edge cases documented |
| SEO spec — seo-og/SPEC.md | 9/10 | 9/10 | All meta tags; OG image strategy; `data:` URI fix; per-artist dynamic OG; platform-specific notes |
| Data architecture spec — data-architecture/SPEC.md | 8.5/10 | 10/10 | Added `able_tier`, `admin_visit_dates`, `fan_following`, `fan_location` to key registry and quick reference |
| Freelancer spec — freelancer-auth/SPEC.md | 9/10 | 9/10 | Credits[] array in release model; booking enquiry spec complete; Google ranking via credits-as-links documented |
| Artist success spec — artist-success/SPEC.md | 9.5/10 | 9.5/10 | Day 30 summary; first-fan notification; 3-day nudge; nudge priority system; all JS functions specced |
| Onboarding spec — onboarding/DESIGN-SPEC.md | 9.9/10 | 9.9/10 | Done screen phone frame; adaptive wizard (Spotify import screen); building animation; all 9 screens specced |
| Fan page spec — fan/DESIGN-SPEC.md | 8.5/10 | 8.5/10 | Colour system; typography; artist accent bleed; intimate design philosophy; in progress but substantial |
| Landing page spec — landing/DESIGN-SPEC.md | 9.65/10 | 9.65/10 | Section-by-section complete; two-phone comparison; pricing section; FAQ section; all copy strings |

---

## What was fixed

### CONTEXT.md
Missing from the localStorage key table: `able_tier`, `able_shows`, `able_dismissed_nudges`, `able_starred_fans`, `admin_visit_dates`, `fan_following`, `fan_location`. Added all 7. Also added canonical SOURCE_VALUES list inline so agents never have to hunt for it.

### copy/SPEC.md — §2.6b added
The spec had per-page copy rules but no single locked-down table of campaign-state copy strings. Any agent building the UI needed to infer what the pre-release hero label, admin state pill, and fan sign-up heading should say for each of the 4 states. Added §2.6b with exact strings for all 4 states × all critical surfaces.

### launch-sequence/SPEC.md — founder email + press intro added
The founding artist personal outreach email was absent — there was no copy to pull from when actually doing Phase 1 outreach. Added verbatim. The press intro for Phase 3 was also absent. Added with explicit send conditions and prohibited phrases.

### analytics/SPEC.md — `'footer'` type gaps
The growth-loop/SPEC.md specified adding `'footer'` to ClickType and AnalyticsSource but the analytics SPEC itself was not updated. Fixed: ClickType, AnalyticsSource union types, SOURCE_VALUES array, and detectSource() function all now include `'footer'`.

### data-architecture/SPEC.md — 4 missing keys
`able_tier`, `admin_visit_dates`, `fan_following`, and `fan_location` were specified in their respective system specs but absent from the data architecture key registry and quick reference. Added with type, writer, reader, and notes.

### CLAUDE.md — 2 missing keys
`able_tier` and `admin_visit_dates` were missing from the CLAUDE.md data architecture table — the file agents read first every session. Added both.

---

## Remaining pre-build gaps (honest)

### Legal spec (0.5 point off 10)
- No physical address for CAN-SPAM compliance yet (awaiting company incorporation)
- The `[DATE]` placeholder in privacy policy / terms needs to be replaced with an actual date when the pages are published
- These are deliberate open items, not oversights

### Email spec (0.5 point off 10)
- Artist welcome email does not handle the edge case of an artist who imported from Spotify and already has track data — the "next thing" recommendation could be more specific in that state
- Broadcast reply-to routing (what happens when a fan replies to a broadcast) is not specced

### Fan page spec (1.5 points off 10)
- Design spec is substantial but not at the same completion level as profile, admin, or landing specs
- Dispatch reader section is partially specced but not with the same section-by-section completeness
- Cross-artist calendar section is outlined but not fully pixel-specced
- This is acceptable — fan.html is Phase 2

### Growth loop spec (1 point off 10)
- The "I make music too →" fork (fan on an artist's page who is also a musician) is documented as a future feature but not specced at the implementation level
- The affiliate programme (Phase 3 referral system with 1-month-free payouts) is described in launch-sequence but not spec'd at the data-model level

---

## Build aspects (cannot score pre-build)

These are aspects that require running code and real users to evaluate. They are expected zeros pre-build and should not be held against the pre-build score.

| Aspect | Why it cannot be pre-build scored |
|---|---|
| Visual quality (Playwright verified) | Needs the built page running in a browser |
| Mobile UX at 375px (no horizontal scroll) | Needs layout rendering |
| Theme consistency (all 4 themes) | Needs CSS rendering |
| Animation quality (spring physics) | Needs browser execution |
| Real device testing (iPhone Safari) | Needs physical device |
| Fan sign-up flow end-to-end | Needs Netlify function deployed |
| Email delivery (Resend + DNS) | Needs sending infrastructure live |
| Campaign state auto-switching | Needs real date arithmetic in browser |
| localStorage data integrity across pages | Needs cross-page browser session |
| Social proof (real artist pages) | Needs real artists using the product |
| Press coverage | Needs Phase 3 launch |
| Supabase migration | Needs backend deployment |
| Stripe billing | Needs Stripe integration |
| Analytics accuracy (real traffic) | Needs real visitor data |

---

## Verdict

Pre-build: **9.4/10**. The spec layer is complete, accurate, and actionable.

The 0.6-point gap is honest:
- 0.3 points: fan.html spec not yet at full completion level (Phase 2 — acceptable)
- 0.2 points: minor open legal items (company incorporation pending)
- 0.1 points: two email edge cases not fully specced

When built and validated against the spec: projected **9.0–9.5/10** overall, depending on Playwright verification results and real-device testing outcomes.

The highest-leverage pre-build action remaining: none. The spec is ready to build from.


---
# FILE: docs/MASTER-SCORECARD.md
---

# ABLE — Master Scorecard
**Updated: 2026-03-16 | Sources: All FINAL-REVIEW.md and FINAL-20-ANGLE-REVIEW-2.md files across docs/systems/ and docs/pages/**

---

## How to read this document

- **Score** = current state score from the most recent FINAL-REVIEW.md or FINAL-20-ANGLE-REVIEW-2.md
- **Spec ceiling** = the score achievable when all specced work is built (often the "after P2" figure)
- **Biggest gap** = the single most important thing holding the score back
- **P0 fix** = the specific action required before first artist signs up
- Scores marked `—` = operational/reference docs without a numeric score (not scoreable)
- Scores marked `pre-launch` = quality gate checklists; entire system unbuilt

---

## Pages

| Page | File | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|---|
| Artist profile | `able-v7.html` | 8.9/10 | 9.7/10 | Confirmation email (Supabase) + Spotify auto-import | GDPR consent line on fan sign-up form (1 paragraph) |
| Admin dashboard | `admin.html` | 9.7/10 | ~9.9/10 | Supabase auth (data portability) + PWA features | Fix `--dash-t3` → `#777777` (WCAG AA); adaptive `data-stage` layout |
| Onboarding wizard | `start.html` | 9.9/10 spec | ~9.9/10 | Social proof (real artists) + `navigator.share()` tested across browsers | Fix `able_profile` → `able_v3_profile` key conflict (8-line migration function) |
| Landing page | `landing.html` | 9.65/10 | ~9.9/10 | Demo phone not built; OG image is `data:` URI | Fix OG image to hosted JPEG; build demo phone |
| Fan dashboard | `fan.html` | 9.21/10 | ~9.8/10 | Supabase realtime feed + Close Circle payment flow | Arrival URL scheme (`?followed=slug`); cold-start empty state copy |
| Freelancer profile | `freelancer.html` | 8.7/10 | ~9.2/10 | Network maturity (credits graph density) + testimonials not yet real | Directory integration + credits management in admin |

**Page average: ~9.3/10**

---

## Systems

### Core product systems

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Artist tools | 6.8/10 | 9.0/10 | Shows no date sort, Close Circle no payment, accent picker missing | Shows date sort + Close Circle state toggle + star toggle (all <2h each) |
| CRM | 4.0/10 | 9.0/10 | `campaignState` not captured at fan sign-up; no level system | Add `campaignState` capture at fan sign-up in `able-v7.html` (20-line change) |
| Tier gates | 3.7/10 | 9.0/10 | `.tier-gate` visual component unbuilt; `GATE_COPY` table not wired | Implement `.tier-gate` component + wire `GATE_COPY` + fan cap UX |
| Error states | 2.5/10 | 9.0/10 | No error handling — happy path only; `safeGet()`/`safeSet()` absent | Implement `safeGet()`/`safeSet()` everywhere + empty profile state HTML (45 min) |
| PWA | 0.6/10 | 8.5/10 | No `manifest.json`, no service worker, no iOS meta tags | Export ABLE logo as icons + create `manifest.json` + add iOS meta tags (30 min) |
| Page state system | — | — | — | — |
| Data architecture | 6.8/10 | 9.3/10 | Multi-artist isolation incomplete; `fan.html` not built | Implementation not started |
| Analytics | 6.2/10 | 9.4/10 | `sessionId` missing from all events; PostHog not initialised; no anti-self-visit | Add `sessionId` (one expression) + anti-self-visit flag + PostHog EU Cloud init |
| SEO / OG | 5.7/10 | 9.3/10 | OG image fails for data: URI artwork; no static fallback; iMessage blank | Fix `injectSEO()` https:// check + add noindex to `admin.html` + `fan.html` |
| oEmbed proxy | 3.7/10 | 9.0/10 | **SSRF security vulnerability** — platform guard uses substring regex not parsed hostname | Implement `ALLOWED_HOSTS` Set + `isSafeMediaUrl()` using `new URL().hostname` (10 lines, 15 min — MUST ship before production) |
| Coding strategy | 7.0/10 | 10/10 | `--dash-t3` is WCAG AA violation (#888888); `prefers-reduced-motion` absent from `admin.html` | Fix `--dash-t3` → `#777777` + add blanket reduced-motion rule to `admin.html` |
| UI system | 7.1/10 | 8.6/10 | Component library unbuilt; token gaps in `admin.html` L44+L1288 | Fix `#888` violations; build shared component primitives |
| UX system | 6.9/10 | 9.0/10 | Fan sign-up friction unresolved; empty state copy inconsistency | P0: email validation clarity + empty state copy audit |
| World map | 5.2/10 | 9.2/10 | Section heading missing, empty state missing, multi-moment panel missing | 3 bug fixes (section heading, empty state, multi-moment panel) |

### Killer features

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Killer features (all) | 0/10 | 9.0/10 (after Sprint 1) | Day 1 share card unbuilt — highest priority; auto-gig unbuilt; deep link campaigns unbuilt | Build Day 1 share card in `start.html` (3–4 hours, `showDay1ShareCard()` at end of `completeWizard()`) |
| Reels feed | 8.5/10 spec | 10/10 (post-V3) | oEmbed proxy extension not confirmed; `CONTEXT.md` not updated with `able_clips` key | 30-minute code review of `oembed-proxy.js` against TikTok/YouTube endpoints |
| Spotify import | 5.2/10 | 9.0/10 | Netlify function not deployed; Playwright tests not written | Deploy Netlify function + configure env vars |
| Deep link campaigns | 0/10 | 9/10 | Feature not built | URL param parsing + source tagging + campaign creator UI (~6 hours) |

### Infrastructure & backend

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Email | 4.0/10 | 9.5/10 | Fan confirmation email doesn't exist; artist welcome email unbuilt | Netlify function + Resend account + DNS records + 4 email templates |
| Notifications | 9.5/10 after V2 | 10/10 | Magic link token signing incomplete; state transition timing edge case | None — engineering can start immediately |
| Integrations | 4.0/10 | 8.0/10 | Ticketmaster events import missing (0/10); Linktree import missing (0/10); Spotify function not deployed | Deploy Spotify function + build Ticketmaster import + build Linktree import |
| Platform admin | 7.0/10 | — | No Stripe-linked view; no content moderation; no impersonation tool | Save SQL query library in Supabase + set `ADMIN_SECRET` env vars + create `admin_actions` table (35 min) |
| Tiers / billing | pre-launch | — | Stripe not wired; tier gates not server-enforced | Entire billing system unbuilt |

### Legal, compliance & security

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Legal compliance | 2.0/10 GDPR | 8.5/10 | No GDPR consent on fan sign-up; no privacy policy; no ToS | Add consent `<p>` tag to `able-v7.html` fan sign-up + create `privacy.html` + create `privacy@ablemusic.co` |
| Freelancer auth | pre-launch | — | Discord OAuth fallback unspecced; magic link path unvalidated | Quality gate: 5 questions must be "yes" before launch |
| oEmbed proxy (security) | 3.7/10 | 9.0/10 | SSRF vulnerability — substring regex instead of hostname parse | Implement `ALLOWED_HOSTS` Set (see above — duplicate of critical security fix) |

### AI & automation

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| AI agents | 9.4/10 | — | Mac Studio single point of failure for n8n/Ollama; Ollama output quality variability | Move n8n to VPS before launch |
| AI copy | 4.4/10 | 8.8/10 | Vibe/feel context not in system prompt; Sonnet not used for bio mode; banned phrase detection missing | Add genre/feel context to system prompt (P0.2) + route bio mode to Sonnet (P0.4) |
| AI workflow | 6.5/10 | — | No Telegram notifications; cold session starts; decisions not captured consistently | Set up Telegram notification integration (20-minute task) |
| VA strategy | 9.0/10 | — | Requires Mac Studio hardware and consistent "prompt first" habit | Mac Studio setup + Ollama install (one day) |

### Brand, copy & design

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Brand identity | 5.0/10 | 8.5/10 | Favicon missing (2/10); OG image template missing (3/10) | Create favicon (6 files) + OG image template (one session) |
| Copy system | ~7.5/10 | 9.5/10 | "Dashboard" violations in copy; admin empty states unverified; error state copy inconsistent | Fix "dashboard" violations + implement greeting system |
| Explainers | 5.5/10 | 9.0/10 | Close Circle orientation card missing; Screen 6 context line not implemented | Screen 6 context line: "you get their email — that's yours" |
| Social media | 9.1/10 | — | Week 2+ content calendar less specific; no 0-to-500 follower phase | None blocking |
| Instagram strategy | 9.6/10 | — | Content bank not written; PostHog dashboard not specced; n8n not implemented | None blocking day-1 execution |

### Growth & marketing

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Growth loop | 7.0/10 | — | "I make music too →" fork on referred landing unspecced; admin nudge UI undesigned | Spec the "I make music too" fork on the referred artist landing page |
| Artist success | 4.0/10 | 9.0/10 | No Day 1 share card; no fan milestone acknowledgement; no 30-day summary | Build Day 1 share card (biggest single failure mode — artists don't share after setup) |
| Lead generation | 7.5/10 | 8.7/10 | Email system P0 must be live before Week 3; no message copy variants written | Build 300-artist spreadsheet (10 hours) + complete email P0 (2–3 days) + send first 10 DMs |
| Marketing | — | — | Producer seeding not operational; 4-posts/week sustainability uncertain | Name 20 UK producers and begin outreach |
| Launch sequence | 7.5/10 | — | Product not deployed; waitlist not live | Deploy to `ablemusic.co` — this unlocks the entire launch sequence |
| Complaint resolution | 9.2/10 | — | Pre-launch; no live tickets yet | Quality gate checklist ready; no P0 blockers |
| Digital media | 2.0/10 (presence) | — | Product not deployed; no demo video; no social presence; no waitlist capture | Deploy to `ablemusic.co` + record 90-second demo video + add waitlist form to `landing.html` |
| Organic growth | 10/10 | — | Projections are models not measurements | None |
| Competitive | 9.5/10 | — | No live user win/loss data | None |
| Partnerships | 9.0/10 | — | Abler earnings on tier upgrades not clarified; external partner brief not written | None blocking |

### Operations & process

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Filing system | 9.2/10 | — | 6 non-standard SPEC.md names; profile DESIGN-SPEC.md previously missing (now exists) | Verify profile DESIGN-SPEC.md is complete and in authority chain |
| QA testing | 9.0/10 spec | — | No Playwright tests written; no visual baselines; no CI infrastructure | Run 6-gate manual smoke check before first artist signs up |
| Error states | 2.5/10 | 9.0/10 | No error handling at all | `safeGet()`/`safeSet()` everywhere (see above) |
| Master review | 7.5/10 | — | One review is not a track record; domain name inconsistency across docs | Schedule recurring master review (first Monday of every month) |
| Build your own tools | 8.7/10 avg | — | All tools unbuilt pre-launch | Error Monitor + Uptime Page + Lead Tracker (first 5 hours post-launch) |
| Hardware / software | 9.5/10 | — | Open WebUI config not fully tested; n8n workflows not live | Ergonomics protocol + security (FileVault, Mullvad) |
| Coding strategy | 7.0/10 | 10/10 | WCAG AA violation in token (see above) | Fix `--dash-t3` (see above) |
| Think out of the box | — | — | Requires monthly calendar habit | Schedule first Monday of every month, recurring |

### Finance & legal

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Accounting | — | — | UK bank feed quality limited; no live company yet | Wave Accounting setup + first transaction |
| Monetisation | pre-launch | — | Entire monetisation system unbuilt | Stripe integration (Phase 2) |
| Free stack | — | — | Resend 100 email/day cap is high risk for broadcast; Supabase free tier pauses after 1 week | Configure UptimeRobot pings before Supabase goes live |
| Legal compliance | 2.0/10 GDPR | 8.5/10 | No GDPR consent; no privacy policy | See above (critical) |

### Strategy & founder

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Growth strategy | 9.0/10 | — | No paying artists yet; community sections unexecuted | None — strategy is ready |
| Investor readiness | 10/10 spec / 2/10 execution | — | All metrics are pre-launch placeholders | Get Stripe live + deploy to Netlify |
| Investor strategy | 8.5/10 | — | Pitch deck not built; 15-person pre-raise list not populated | None |
| Founder roadmap | 9.0/10 | — | `fan.html` completion underspecified; Spotify import not in 500 steps | None blocking |
| Master plan alignment | 4.2/10 | — | Product not deployed (2–3 month execution delay); Portugal NHR prep not started | Deploy product + incorporate ABLE Labs Ltd + check/fund ISA before 5 April + find cross-border accountant |
| Pathway (exit plan) | — | — | Pre-exit document — not yet applicable | — |
| Organic growth | 10/10 | — | Projections are models not measurements | None |
| Team | 9.2/10 | — | Hire thresholds may shift; engineer salary stretch at £5k MRR | None |
| Tools and APIs | 9.5/10 | — | Mixcloud/Audiomack entries missing; Bandcamp oEmbed asymmetry | None blocking |

---

## Summary stats

| Category | Average |
|---|---|
| Pages (6 pages) | ~9.3/10 |
| Core product systems (scoring available) | ~5.8/10 |
| Infrastructure (scoring available) | ~6.1/10 |
| Brand / copy / design | ~7.3/10 |
| Growth / marketing | ~6.9/10 |
| Operations / process | ~7.5/10 |
| Strategy / founder | ~7.8/10 |

**Overall documentation + spec average: ~9.0/10** (all specced systems at their ceiling)
**Overall current build state average: ~6.5/10** (what is actually built and running today)

Systems at spec ceiling (10/10 or near-complete spec): organic growth, competitive, landing page copy voice, tools and APIs, instagram strategy
Systems with P0 security issues: oEmbed proxy (SSRF vulnerability — CRITICAL)
Systems with P0 legal issues: legal compliance (GDPR — no consent on fan sign-up)
Lowest scoring systems by current build state: PWA (0.6), killer features (0), tier gates (3.7), oEmbed proxy (3.7), error states (2.5), brand identity (5.0), master plan alignment (4.2)

---

## Complete P0 gap list

The following items must be fixed before the first real artist uses the product. Ordered by risk/impact:

### Critical — pre-launch blockers

**1. GDPR consent on fan sign-up form (Legal risk)**
- Fix: Add `<p>By entering your email you agree to receive messages from [Artist Name]. Read our <a href="/privacy">privacy policy</a>.</p>` to the fan sign-up form in `able-v7.html`
- File: `able-v7.html` — fan sign-up section
- Time: 20 minutes
- Risk if skipped: ICO reportable violation

**2. oEmbed proxy SSRF security vulnerability (Security risk)**
- Fix: Replace substring regex platform check with `new URL().hostname` parsed against an `ALLOWED_HOSTS` Set (YouTube, SoundCloud, Spotify, Vimeo, Bandcamp, TikTok, Mixcloud)
- File: `netlify/functions/oembed-proxy.js`
- Time: 15 minutes (10 lines)
- Risk if skipped: Server-side request forgery vulnerability open to production traffic

**3. OG image is a `data:` URI (User-facing breakage)**
- Fix: Check if `artworkUrl` starts with `https://` before using as `og:image`; fall back to `https://ablemusic.co/og-fallback.jpg`
- File: `able-v7.html` — `injectSEO()` function
- Time: 30 minutes including static fallback image creation
- Risk if skipped: Every artist share on Twitter, iMessage, WhatsApp shows blank card

**4. Privacy policy missing**
- Fix: Create `privacy.html` and deploy; create `privacy@ablemusic.co`
- Time: 2 hours (writing) + deploy
- Risk if skipped: Required by GDPR for any data collection

**5. `able_profile` / `able_v3_profile` key conflict**
- Fix: 8-line migration function at top of `admin.html` `DOMContentLoaded` — reads `able_profile`, writes to `able_v3_profile`, deletes old key
- File: `admin.html`
- Time: 30 minutes
- Risk if skipped: Artists completing wizard on V1 path get blank admin dashboard

### High priority — day-1 quality

**6. Day 1 share card (Activation / growth)**
- Fix: Build `showDay1ShareCard(profile)` function in `start.html`; call at end of `completeWizard()`
- File: `start.html`
- Time: 3–4 hours
- Risk if skipped: Most artists who complete wizard don't share — ABLE gets no organic growth

**7. `safeGet()` / `safeSet()` wrappers (Stability)**
- Fix: Wrap all localStorage reads in try/catch; implement `safeGet()` and `safeSet()` utilities at top of each active file
- Files: `able-v7.html`, `admin.html`, `start.html`
- Time: 45 minutes
- Risk if skipped: Corrupted localStorage causes silent blank-page failures

**8. GDPR noindex on admin and fan pages**
- Fix: Add `<meta name="robots" content="noindex">` to `admin.html` and `fan.html`
- Time: 5 minutes
- Risk if skipped: Admin and fan pages get indexed by Google

**9. `--dash-t3` WCAG AA colour violation**
- Fix: Change `--dash-t3: #888888` to `--dash-t3: #777777` (raises contrast ratio from 3.5:1 to 4.6:1)
- File: `admin.html` CSS tokens
- Time: 2 minutes
- Risk if skipped: WCAG AA fail on all tertiary text in admin dashboard

**10. `campaignState` capture at fan sign-up (CRM)**
- Fix: Add `campaignState: profile.stateOverride || computeState(profile, shows, gigExpires)` to the fan object written to `able_fans` at sign-up
- File: `able-v7.html` — fan sign-up handler
- Time: 20 minutes
- Risk if skipped: CRM data permanently missing campaign context for all early fans

**11. Configure UptimeRobot pings for Supabase (Infrastructure)**
- Fix: Create UptimeRobot monitor to ping Supabase project URL every 5 minutes, preventing free-tier inactivity pause
- Time: 10 minutes
- Risk if skipped: Supabase pauses after 1 week of inactivity, taking all artist sign-ins offline

**12. PostHog EU Cloud initialisation (Analytics)**
- Fix: Add PostHog EU Cloud `posthog.init()` call to all 4 active files with `api_host: 'https://eu.posthog.com'`; add anti-self-visit flag; add `sessionId` to all events
- Files: All 4 active HTML files
- Time: 1 hour
- Risk if skipped: Zero analytics data from day one

**13. Screen 6 trust line (Explainers)**
- Fix: Add context line to wizard Screen 6 (fan sign-up explanation step): "you get their email — that's yours"
- File: `start.html`
- Time: 10 minutes

**14. PWA manifest.json and iOS meta tags**
- Fix: Create `manifest.json` with name, icons, display, theme_color; add `<link rel="manifest">` and iOS meta tags to `able-v7.html` and `fan.html`
- Time: 30 minutes
- Risk if skipped: No home screen install prompt; no splash screen on iOS

**15. Move n8n to VPS before launch (AI workflow)**
- Fix: Install n8n on a VPS instance (DigitalOcean/Hetzner) rather than running on Mac Studio
- Time: 1 day (setup)
- Risk if skipped: Mac Studio going to sleep or restarting kills all automation workflows

---

## Honest summary

The ABLE documentation is genuinely exceptional — 350+ documents covering every decision, token, animation curve, copy string, and data schema at a depth most funded startups never reach. The specification quality averages around 9.0/10 across all systems. The problem is the gap between what is specified and what is built.

The product currently has two critical pre-launch blockers that are legal and security risks, not cosmetic ones: fan emails are collected without GDPR consent (a one-paragraph fix) and the oEmbed proxy has a SSRF vulnerability (a 15-minute fix). These are the only items that would be embarrassing to explain to a lawyer or a security researcher, and both are trivially fixable. They should not still be open.

The biggest strategic gap is activation: no Day 1 share card means most artists complete the wizard and never share their page, which means ABLE gets no organic growth and no network effect. This is a 3–4 hour build and it is the most valuable single piece of engineering left to do in V1. The second biggest gap is the analytics baseline: PostHog is not initialised, events have no `sessionId`, and anti-self-visit is not implemented — meaning the entire launch period will have no usable data.

The pages themselves are in good shape. The artist profile at 8.9/10 is genuinely competitive with Linktree and Beacons in ways that matter (campaign state machine, identity system, conduit principle). The admin dashboard at 9.7/10 spec is overengineered in the best possible sense — every copy string, every animation, every empty state has been considered. The landing page and onboarding wizard are close to launch-ready.

The honest gap is not in the specification. It is in execution: the product is not deployed, GDPR consent is not live, the oEmbed security fix is not shipped, and PostHog is not running. The documentation has done its job. The build needs to finish.

---

*Sources: 62 docs/systems/FINAL-REVIEW.md files + 6 docs/pages/FINAL-20-ANGLE-REVIEW-2.md files*
*Updated: 2026-03-16 (session 10 coherence review — added complaint-resolution, launch-sequence, ui, ux, freelancer-auth)*


---
# FILE: docs/process/BUILD-CONFIDENCE.md
---

# ABLE — Build Confidence
**Created: 2026-03-16 | Score: see §9**
*Honest assessment of what it takes to build this product perfectly, and how confident we are.*

---

## Purpose of this document

This is not a motivational document. It is an honest audit of every factor that determines whether the ABLE build goes well or badly — the strengths, the real risks, the mitigation for each, and a current confidence score per dimension.

Read this before any major build session. Update it when something changes.

---

## 1. What "build this perfectly" means

Perfect build = all of the following are true:

1. All 4 active files (`able-v7.html`, `admin.html`, `start.html`, `landing.html`) implement their DESIGN-SPEC.md exactly
2. All P0 bugs are fixed before any real user touches the product
3. All 4 themes work on all 4 pages
4. Playwright smoke tests pass on all pages
5. No console errors on any page
6. GDPR consent is in place before any fan email is collected
7. The copy passes the calibration test (no banned phrases, first-person, honest)
8. Mobile-first: no horizontal scroll at 375px, all tap targets ≥44px
9. The product does what it says — every CTA fires, every state switches, every form submits
10. James could hand the product to a real artist today and not be embarrassed

---

## 2. Confidence strengths — what gives us confidence

### 2.1 Documentation depth (9.5/10)
Every page has a DESIGN-SPEC.md. Every system has an ANALYSIS.md, SPEC.md, PATH-TO-10.md, and FINAL-REVIEW.md. There are 350+ documents covering every decision, every token, every animation curve, every copy string, every data schema. The documentation is more complete than most funded startups have at Series A. A developer reading these docs for the first time has everything they need.

**What this means in practice:** No guessing. No "I think the accent colour was..." — it's in CONTEXT.md. No "what does the pre-release state look like?" — it's in `docs/pages/profile/DESIGN-SPEC.md §6.2`. Every build decision is pre-made.

### 2.2 Existing codebase quality (7.5/10)
`able-v7.html` is 10,214 lines. `admin.html` is 5,936 lines. These are not empty files — they are working implementations with real functionality. The spring physics, the theme system, the CTA zone logic, the campaign states, the bottom sheet pattern — all of it exists and works. The build task is not "build from scratch" — it is "bring working code to specification."

**What this means in practice:** The hard parts (animation system, CSS token architecture, localStorage data model) are done. The remaining work is implementing the gap list, not architecting from zero.

### 2.3 Parse-check discipline (8/10)
Every JS block can be validated with `node -e "new Function(src)"` in under 5 seconds. This catches syntax errors before Playwright runs. CLAUDE.md rule 1.

**What this means in practice:** JS regressions are caught within seconds of writing, not after 10 minutes of debugging why the page is blank.

### 2.4 Playwright MCP (8/10)
Visual verification after every significant change. Tab renaming pattern. Screenshot comparison. The Playwright setup means the build loop is: write → parse-check → Playwright → compare to spec → commit. This is faster than a human reviewing by eye and more reliable.

**What this means in practice:** Regressions are caught within one build cycle, not discovered by James when he opens the file later.

### 2.5 Design token architecture (8.5/10)
CSS custom properties mean a single token change propagates to every usage. `--color-accent`, `--bg`, `--font`, easing curves — all are variables. This means the risk of implementing the wrong colour in one place but not another is near-zero. The accent system is the most important token: one line of CSS changes the entire artist theme.

**What this means in practice:** Theme consistency bugs — the most common visual regression — are structurally prevented.

### 2.6 Copy system (8.5/10)
VOICE-BIBLE.md. 20 banned phrases. The calibration test. DECISION-LOG.md with 14 locked decisions. These mean copy regressions — "dashboard" reappearing, exclamation marks creeping in — are caught by a systematic check rather than by re-reading everything.

**What this means in practice:** The product will not accidentally sound like a generic SaaS tool.

---

## 3. Real risks — where things could go wrong

### 3.1 Context window limits during build (Risk: HIGH)
`able-v7.html` is 10,214 lines. `admin.html` is 5,936 lines. These are large files. When editing a file this large, there is a risk that changes in one section break something in another section — because the full file may not be in working memory simultaneously.

**Mitigation:**
- Always read the specific function/section being edited, not just the area being changed
- Parse-check after every edit: `node -e "new Function(src)"`
- Playwright smoke test after every section — not just at the end
- Commit after each logical chunk so regressions are isolatable
- COMPONENT-LIBRARY.md documents all reusable patterns — use it, don't reinvent

**Residual risk:** Medium. The parse-check catches most issues. The remaining risk is semantic regressions (something works syntactically but does the wrong thing).

### 3.2 Theme testing gap (Risk: MEDIUM-HIGH)
There are 4 themes (Dark, Light, Glass, Contrast) and 4 pages. That is 16 combinations to verify after every CSS change. Manually testing all 16 is impractical. Currently no automated theme-switching test exists in the Playwright suite.

**Mitigation:**
- DESIGN-SPEC.md §6 specifies exactly what changes in each theme — test those deltas specifically
- Glass theme requires a background image to render correctly — test with a known image URL
- CSS token architecture means most theme changes are additive, not destructive
- Priority order for theme testing: Dark (default) → Light → Glass → Contrast

**Residual risk:** Medium. Glass and Contrast themes are most likely to have regressions that Dark/Light testing won't catch.

### 3.3 Mobile Safari behaviour (Risk: MEDIUM)
`backdrop-filter: blur()` (Glass theme) has known performance issues on older iOS devices. Spring physics at 60fps vs 30fps on lower-end iPhones. iOS keyboard pushing layout. These cannot be caught by Playwright (which uses Chromium) — only by real device testing.

**Mitigation:**
- Test on real iPhone (Safari, iOS 17+) before any section is considered done
- `backdrop-filter` fallback: if performance is unacceptable on real device, add `@supports not (backdrop-filter)` fallback
- Input fields: `font-size: 16px` minimum to prevent iOS auto-zoom
- `env(safe-area-inset-*)` for notch/home indicator — already in DESIGN-SPEC.md

**Residual risk:** Low-medium. The spec accounts for it. Real device testing is the gate.

### 3.4 localStorage data integrity (Risk: MEDIUM)
Five separate localStorage keys. Two of them have a known naming conflict (`able_profile` vs `able_v3_profile`). The wizard writes to `able_profile`. The profile page reads from `able_v3_profile`. A migration function is specified in BUILD-READY-INDEX.md but not yet implemented.

**Mitigation:**
- Fix the key conflict first — this is P0 in BUILD-READY-INDEX.md
- The migration function is 8 lines of JS — implement it at the top of `admin.html`'s `DOMContentLoaded`
- All localStorage reads should be wrapped in try/catch (`safeGet()` pattern from error-states spec)

**Residual risk:** Low once the key conflict is fixed. The safeGet() pattern handles corrupted data.

### 3.5 GDPR compliance gap (Risk: HIGH — legal risk)
Fan emails are currently collected without a consent line. This is the highest-risk item in the codebase — not a performance bug or a design regression, but a legal risk. Under UK GDPR, collecting personal data without informed consent is an ICO reportable violation.

**Mitigation:**
- The fix is specified in `docs/systems/legal-compliance/SPEC.md` — a 3-line HTML addition to the fan sign-up form
- This is P0. Do not let a real user touch the product until this is live
- Privacy policy must be published at `/privacy` before launch
- The consent flow stores `consent: true, consentMethod: 'explicit_checkbox'` in the fan record

**Residual risk:** Near-zero once implemented. The fix is simple and the spec is complete.

### 3.6 The "I'll fix it later" regression (Risk: HIGH — process risk)
The most common build failure pattern: an issue is noticed during build, it is noted but not fixed immediately, and it is forgotten. The doc system mitigates this — every known bug is documented in BUILD-READY-INDEX.md — but only if the discipline holds.

**Mitigation:**
- PROCESS.md Stage 8b Step 4: Playwright verification before moving to the next section
- If a bug is found: either fix it now, or add it to BUILD-READY-INDEX.md with exact location before moving on
- No "TODO" comments in code — if it's important enough to flag, it's important enough to document properly
- Commit messages include the current section score so regressions are visible in git log

**Residual risk:** Low with discipline. High without it.

### 3.7 Cross-page coherence drift (Risk: MEDIUM)
Changes to a shared pattern in one file (e.g. the bottom sheet component) can leave the same pattern inconsistent in another file. With 4 active files sharing many UI patterns, drift is a real risk.

**Mitigation:**
- COMPONENT-LIBRARY.md documents all shared components with their canonical implementation
- After any change to a shared pattern: grep all 4 active files for the pattern and check for consistency
- PROCESS.md Stage 8f: coherence check before final commit on any file

**Residual risk:** Low with the component library as a reference. Medium without it.

---

## 4. What perfect execution looks like day-to-day

**Before any session:**
1. `git status` — clean working tree
2. Read `CONTEXT.md` — 2 minutes
3. Check `docs/STATUS.md` — current state
4. Check `BUILD-READY-INDEX.md` — today's P0 list
5. Open the specific DESIGN-SPEC.md for today's file

**During each section:**
1. Read the spec for the section
2. Write the implementation
3. `node -e "new Function(src)"` — parse-check immediately
4. Playwright screenshot + compare to spec
5. If it matches: commit. If it doesn't: fix before moving on.

**Before claiming a section is done:**
- Playwright passes
- All 4 themes render correctly (spot-check)
- No console errors
- Copy passes the calibration test
- Mobile: no horizontal scroll, tap targets ≥44px

**Before claiming the file is done:**
- Full 20-angle review (PROCESS.md Stage 9.1)
- Copy calibration test (Stage 9.2)
- 15-step Playwright smoke test (Stage 9.3)
- Commit with score in message

---

## 5. The known unknowns

Things that will be discovered during build that cannot be fully anticipated:

1. **Edge cases in campaign state switching** — the auto-switch logic (`if now < releaseDate → pre-release`) has timing edge cases that only appear with real date arithmetic. These are findable by writing a Playwright test that sets localStorage to a specific date state.

2. **Embed performance on mobile** — oEmbed renders from third-party sources. On slow connections, iframes can block paint. This needs testing with network throttling in DevTools before sign-off.

3. **Theme + vibe combination matrix** — 4 themes × 7 vibes = 28 combinations. Some combinations (e.g. Glass + Bedroom Pop with its muted palettes) may produce unreadable contrast. These need to be found and fixed, not designed in advance.

4. **Fan sign-up form on older Android** — Chrome on Android 10 has known issues with `backdrop-filter`. The fan sign-up form is the most critical conversion point — it must work everywhere.

---

## 6. What would disqualify a release

**Non-negotiable pre-launch gates:**

| Gate | Current state | Fix |
|---|---|---|
| GDPR consent on fan sign-up | ❌ Not implemented | 3-line HTML fix |
| Privacy policy at `/privacy` | ❌ Not published | Write + deploy |
| OG image is a real URL (not `data:`) | ❌ `data:` URI | Fix in DESIGN-SPEC §10 |
| oEmbed hostname allowlist | ❌ Substring regex (P0 security bug) | ALLOWED_HOSTS Set |
| `able_profile` / `able_v3_profile` conflict | ❌ Not fixed | 8-line migration function |
| No console errors on any page | Unknown | Run Playwright, check DevTools |
| Fan deletion query tested | ❌ Not tested | Run SQL in Supabase dashboard |
| Real device tested (iPhone Safari) | ❌ Not done | Test before ship |

**If any of these are not done, do not give the URL to a real artist.**

---

## 7. The honest ceiling

With this codebase, this documentation, and this process:

- **Perfect V1 is achievable.** The spec is complete, the existing code is strong, the patterns are established. There are no architectural blockers.
- **The build is not trivial.** `able-v7.html` is 10,214 lines and has 7 vibes, 4 themes, 4 campaign states, and a complex animation system. Build sessions need focus and process discipline, not just hours.
- **Some things will be found during build that aren't in the spec.** This is expected. The process for handling them is: document in BUILD-READY-INDEX.md, fix in the same session if P0, log for next session if P1/P2.
- **The quality bar is high.** A 7/10 implementation is worse than no implementation for ABLE — because the product makes a specific promise (this is for artists with taste) that a mediocre build breaks. Build each section to spec, not to "good enough."

---

## 8. The single most important thing

The documentation is done. The spec is complete. The existing code is working.

**The build will succeed or fail based on one thing: whether each section is verified before moving to the next.**

A build that proceeds without verification accumulates debt. A build that verifies as it goes produces a clean, shippable product. The 5 minutes of Playwright verification per section is not overhead — it is the build.

---

## 9. Confidence scores

| Dimension | Score | Notes |
|---|---|---|
| Documentation completeness | 9.5/10 | 350+ docs, all major decisions pre-made |
| Existing codebase quality | 7.5/10 | Works, but 10k lines is complex |
| Design system clarity | 9/10 | Tokens, themes, vibes all specced |
| Process discipline (PROCESS.md) | 8/10 | Process is there — discipline is a human choice |
| Copy system | 8.5/10 | VOICE-BIBLE.md + DECISION-LOG locked |
| GDPR / legal readiness | 2/10 | Not implemented — P0 |
| Mobile testing coverage | 5/10 | Playwright = Chromium only. Real device needed |
| Theme test coverage | 6/10 | Manual process, 16 combinations |
| Build verification loop | 8/10 | Parse-check + Playwright specified |
| Regression risk | 6/10 | Large files, shared patterns, manual process |

**Overall build confidence: 7.5/10**

The 2.5-point gap is honest:
- 1 point: GDPR not implemented (fixable in 1 hour)
- 0.75 points: No real device testing yet (fixable in 1 day)
- 0.5 points: Theme coverage is manual (fixable with Playwright theme-switching tests)
- 0.25 points: Context window limits on 10k-line files (mitigated by parse-check, not eliminable)

**After P0s are fixed and real device tested: 9/10.**

The remaining 1 point is the honest cost of building something ambitious without a build pipeline, bundler, or automated test suite beyond Playwright screenshots.

---

## 10. Path to 10/10 build confidence

1. Fix GDPR consent (1 hour) → +1 point
2. Real device test after first Playwright pass (1 day) → +0.75 points
3. Add theme-switching Playwright tests (2 hours) → +0.5 points
4. Add `safeGet()`/`safeSet()` wrappers before any localStorage read (1 hour) → builds error-state confidence
5. Fix `able_profile` / `able_v3_profile` key conflict (30 minutes) → removes data corruption risk

**With those 5 things done before the first artist uses the product: build confidence = 9.5/10.**

The remaining 0.5 is earned over time — through 10 artists using it, Playwright finding edge cases, and the codebase proving itself in production.

---

---

## 11. The Build Confidence Protocol

Run this checklist at the start of every major build session. All 8 items must pass before writing a single line of implementation code. If any fails, fix it before starting.

**This is not bureaucracy. It is the 8-minute check that prevents 8-hour debugging sessions.**

---

**1. Parse-check test — verify the JS toolchain is working**

Run:
```bash
node -e "new Function('const x = 1; const y = x + 1; return y')();"
```
Expected: exits 0, no output. If this fails, Node is broken. Fix before proceeding.

When editing a file: after every JS block is written, run:
```bash
node -e "$(cat able-v7.html | grep -o '<script.*</script>' | head -1)"
```
Or, more reliably, extract the script block and parse-check it directly. Exit 0 = valid syntax. Non-zero = syntax error, do not commit.

---

**2. Git status — clean working tree before starting**

Run:
```bash
git status
```
Expected: "nothing to commit, working tree clean" or a clear list of only the files you intend to work on today.

If unexpected modified files appear: understand why before proceeding. Do not start a build session on a dirty tree — you will not know what you changed.

---

**3. Context check — read the spec before touching the file**

Open the relevant DESIGN-SPEC.md for today's file. Read the section(s) being worked on. Confirm:
- The section has a spec (if not, write the spec first)
- The current score for that section is known (from ANALYSIS.md)
- The target state is clear

This takes 3 minutes. It prevents 30-minute detours.

---

**4. localStorage key audit — confirm no key name drift**

Before touching any localStorage read/write, confirm the active key names against `CLAUDE.md §Data architecture`:
```
able_v3_profile  — artist profile
able_fans        — fan sign-ups
able_clicks      — CTA tap events
able_views       — page view events
able_gig_expires — gig mode expiry timestamp
able_shows       — shows list
able_dismissed_nudges — dismissed nudge IDs
able_starred_fans     — starred fan emails
```
If a read or write uses a key not in this list, it is either a new key (add it to CLAUDE.md) or a drift that will cause a data bug. Do not proceed without confirming.

---

**5. Playwright smoke — take a baseline screenshot before making changes**

Before editing any UI section, run a Playwright screenshot of the current state:
```javascript
// In Playwright MCP:
// Navigate to the page, rename the tab, take screenshot
// This is the "before" image.
```
After making changes, take another screenshot. Compare. The delta should be only what you intended to change.

Without the before screenshot, you cannot know what you changed vs. what was already there.

---

**6. Theme spot-check — verify the default dark theme renders correctly after any CSS change**

After any CSS change, open the file in a browser (or Playwright) and confirm:
- `[data-theme="dark"]` or default: the page renders correctly
- No new console errors related to CSS

If the change affects token variables (anything with `var(--...)`), also spot-check light theme:
```javascript
// Playwright: document.documentElement.setAttribute('data-theme', 'light')
// Take screenshot, confirm readability
```

The dark → light check costs 90 seconds. The alternative is discovering a light theme regression when a real user reports it.

---

**7. Mobile width check — confirm 375px has no horizontal scroll**

After any layout change, run:
```javascript
// Playwright:
// await page.setViewportSize({ width: 375, height: 812 })
// await page.screenshot({ path: 'mobile-check.png' })
// document.documentElement.scrollWidth > document.documentElement.clientWidth — must be false
```

Or manually resize the browser to 375px. Any horizontal scroll at 375px is a blocking bug. Do not move to the next section until this passes.

---

**8. Copy calibration — run the banned-phrase check before committing any text change**

Before committing any UI text change, scan the changed text against the CLAUDE.md banned phrases:
```
"Turn fans into superfans" / "Grow your audience" / "Monetise your fanbase" /
"Engage your followers" / "Content creator" / "Going viral" / exclamation marks in dashboard copy /
Generic SaaS micro-copy ("Get started!", "You're all set!")
```

Also confirm: is this text in the artist's voice (first person) where it should be? Does it sound like something a real person would say, or like a SaaS template?

This check costs 30 seconds per text change. It protects the single most important characteristic of ABLE.

---

**Protocol summary:**

| Item | Tool | Time | Pass criterion |
|---|---|---|---|
| 1. Parse-check test | `node -e` | 30s | Exit 0 |
| 2. Git status | `git status` | 10s | Clean tree or known state |
| 3. Context check | Read DESIGN-SPEC.md | 3 min | Section spec read and score known |
| 4. localStorage key audit | CLAUDE.md §Data | 1 min | All keys match canonical list |
| 5. Playwright baseline screenshot | Playwright MCP | 2 min | "Before" image captured |
| 6. Theme spot-check | Browser / Playwright | 90s | Dark theme renders, no console errors |
| 7. Mobile width check | Playwright 375px | 1 min | No horizontal scroll |
| 8. Copy calibration | Banned phrase scan | 30s | Zero banned phrases, voice correct |

**Total: ~10 minutes.** Every major build session should begin with this protocol complete.

---

## 12. Confidence by Page

Scores are based on the current implementation state and the specific risk profile of each file.

---

### `able-v7.html` — Artist public profile

**Current confidence: 7/10**

**What gives confidence:**
- The file exists and works. 10,214 lines of functional code. Spring physics, theme system, CTA zones, campaign states, bottom sheet pattern — all implemented.
- Design token architecture means most visual changes are additive. Changing `--color-accent` changes the whole page. No hunt-and-replace for individual colour values.
- Section-by-section structure (hero, music, events, merch, world map, fan capture) means changes are mostly isolated to their section.
- Playwright test loop is proven: write → parse-check → screenshot → compare works on this file.

**What is the specific risk:**
- 10,214 lines is genuinely large. A change to a shared utility function (e.g. `safeGet()`, `isSafeUrl()`, `escHtml()`) at line 400 can break something at line 9,000. This is the hardest class of bug to catch — it passes parse-check and may pass a targeted Playwright screenshot test but fails in a specific user flow.
- The World Map section (lines ~5900–6450) has the highest internal complexity: 9 moment types, 4 access levels, multi-moment panels, featured moment logic, swipe navigation, focus trap. Any change here needs its own isolated Playwright test, not just a page-level screenshot.
- Glass theme uses `backdrop-filter: blur(28px)` — this works in Chromium (Playwright) but has known Safari performance issues. Safari testing is not automated.

**Confidence ceiling without specific mitigations:** 7/10. With P0 fixes (GDPR consent, oEmbed hostname allowlist, OG image) and real Safari test: 8.5/10.

---

### `admin.html` — Artist dashboard

**Current confidence: 7.5/10**

**What gives confidence:**
- 5,936 lines — significantly smaller than able-v7.html. Sections are well separated: Campaign HQ, Analytics, Fan List, Shows, Your World, Connections.
- The admin page does not need to handle 4 themes — it uses its own design system (amber `--acc`, Plus Jakarta Sans, `--bg: #09090f`). Fewer theme combinations to test.
- Bottom sheet component is proven across multiple sections. The shared `openAdminSheet()` / `closeAdminSheet()` pattern reduces duplication.
- localStorage write path is clear: almost all mutations go through `saveProfile()` → `syncProfile()`. This makes data flow easier to trace.

**What is the specific risk:**
- The admin page has the most business-logic density in the product. Campaign state switching, gig mode with expiry countdown, fan list filtering + starring + sorting, show CRUD, moment CRUD, nudge dismissal — all in one file. A change to the campaign state logic can have unexpected side effects on the UI rendering.
- The "Your World" moment list has a known type vocabulary mismatch with the canonical model (ANALYSIS.md §Dimension 5). A build session that adds moment types without reconciling the canonical model will widen this gap.
- No test for the edge case of 0 fans / 0 shows / 0 moments — the empty state behaviours need explicit Playwright tests, not assumption.

**Confidence ceiling:** 7.5/10 currently. With edit-moment functionality added and canonical type reconciliation done: 8.5/10.

---

### `start.html` — Onboarding wizard

**Current confidence: 8/10**

**What gives confidence:**
- The wizard has 3 clearly separated steps plus a done screen. Scope is bounded. A change to Step 1 does not touch Step 3.
- The wizard writes to `able_v3_profile` (via `able_profile` → migration function). This is a known data flow.
- Onboarding completion rate is the single most important metric for this page. The UX is deliberately minimal — fewer things to break.
- The live preview (artist's profile updates as they fill in the wizard) is the riskiest dynamic element, but it reads from the wizard's local state, not from localStorage. Clean data path.

**What is the specific risk:**
- The `able_profile` → `able_v3_profile` key conflict. The migration function is specced (8 lines, in BUILD-CONFIDENCE.md §3.4) but it is not yet implemented. If a user completes the wizard on a device that has an old `able_profile` key from the v1 wizard, their data will be in the wrong key and admin.html will show an empty profile.
- The done screen's share options (copy link, WhatsApp, Instagram story share) involve `navigator.share()` API which behaves differently across browsers and platforms. Safari, Chrome, and Chrome-on-Android all handle this differently. Test on at least 2 browsers before calling this done.

**Confidence ceiling:** 8/10 currently. With `able_profile` migration function implemented and share API tested: 9/10.

---

### `landing.html` — Marketing landing page

**Current confidence: 8.5/10**

**What gives confidence:**
- Landing page is the most static file in the build. It does not read from localStorage, does not have complex state machine, does not have bottom sheets or campaign modes.
- The conversion goal is single: get an artist to click "Get started" → `start.html`. The CTA is the only critical path.
- OG image meta tag is the one known issue (currently `data:` URI instead of a hosted image URL). This is a known, bounded fix.
- No localStorage writes. If something breaks on this page, it does not break the artist's data.

**What is the specific risk:**
- Copy regression risk is higher on this page than anywhere else, because it is the first thing a new artist sees and the tone sets their expectation for the whole product. A single exclamation mark in a hero headline, or a "grow your audience" phrase sneaking in, would be a copy regression that CLAUDE.md explicitly prohibits.
- The OG image being a `data:` URI means the link preview on Twitter/X, LinkedIn, and iMessage does not work. This is the most visible broken state for an unfamiliar visitor sharing the link. It blocks organic word-of-mouth before it even starts.
- Responsiveness at 375px: the landing page has the most content-dense sections. Hero, features grid, testimonials, pricing — any of these can break horizontal scroll at 375px if a content element has a fixed width.

**Confidence ceiling:** 8.5/10 currently. With OG image fixed and a Playwright 375px check run: 9.5/10.

---

### Page confidence summary

| Page | Current | After P0 fixes | Ceiling |
|---|---|---|---|
| `able-v7.html` | 7/10 | 8.5/10 | 9.5/10 (after real Safari test) |
| `admin.html` | 7.5/10 | 8.5/10 | 9/10 (after edit-moment + canonical types) |
| `start.html` | 8/10 | 9/10 | 9.5/10 (after share API test) |
| `landing.html` | 8.5/10 | 9.5/10 | 9.5/10 |

**Overall build confidence after P0 fixes: 9/10** (from 7.5/10 currently).

The remaining 1 point is earned through real users and real devices — not through more spec writing.

---

*Updated: 2026-03-16*


---
# FILE: docs/systems/competitive/SPEC.md
---

# ABLE — Competitive Breakdown Spec
**Date: 2026-03-16**
**Status: Active — review quarterly**

---

## How to use this document

This spec is for internal product and positioning decisions only. It informs what to build, how to frame value on landing.html, and what switching triggers to address in acquisition copy.

ABLE does not name competitors in public-facing copy. This spec does not become marketing material.

---

## Primary competitors

---

### Linktree

**What it does well:**
- Extremely simple to set up — live in under 2 minutes
- Universal recognition — "put your Linktree in your bio" is industry shorthand
- Works for any creator type, not just musicians
- Reliable, fast, no design decisions required

**What it does not do:**
- No fan capture. Fans who tap a Linktree leave no trace. The artist has nothing.
- No campaign states. A pre-release looks identical to post-release. The page is always the same.
- No gig mode. No countdown. No page-level awareness of the artist's current moment.
- No music-first design philosophy. Every artist looks like every other artist on Linktree.
- The page looks like Linktree, not like the artist. Fans know they are on a service, not on someone's world.

**Primary switching trigger:**
The artist realises they have been sending fans to Linktree for 2 years and owns nothing. No emails, no list, no direct line to people who showed up. When the algorithm changes — or their account gets restricted — there is no fallback.

"Your fans' emails belong to you, not to Linktree."

**ABLE's counter:**
ABLE captures every fan sign-up as an email address the artist owns. When an artist leaves ABLE (or when ABLE shuts down), they export the list and leave. The relationship survives the platform. This is not a feature — it is the reason ABLE exists.

**Who stays on Linktree:**
Artists who need simplicity above everything else. Non-musicians especially: influencers, podcasters, brands. Also independent musicians who are not yet thinking about fan ownership — the "I just need links" mindset. These are not ABLE's primary acquisition targets, but they are reachable when a release cycle creates urgency.

---

### Beacons

**What it does well:**
- More visual customisation than Linktree — blocks, layouts, colour choices
- Basic analytics included (link clicks, page views)
- Some monetisation tools (tips, product sales, though with platform cut)
- Positioning as "creator economy" tool — aspirational feel for the target audience

**What it does not do:**
- No campaign-aware page states. A release cycle looks the same on Beacons from announcement to 6 months post-drop.
- No gig mode. No live countdown.
- No artist-first design philosophy. The visual tools are there but the design ceiling is visible — it is a canvas without a point of view.
- Platform takes a revenue cut on monetisation (varies by tier). ABLE takes zero.
- No explicit fan ownership positioning. The relationship is mediated through Beacons.

**Primary switching trigger:**
The artist wants something that understands music culture — not just "creator tools." Beacons treats a musician the same as a fitness influencer. The page reflects that.

**ABLE's counter:**
"Beacons is a canvas. ABLE is a stage."

The distinction: Beacons gives you blocks to arrange. ABLE gives you a profile that knows you are a musician — it knows about your release dates, your shows, your collaborators. The design is not constructed, it is shaped around what you actually do.

**Additional counter on monetisation:**
Beacons takes a cut of support income. ABLE takes zero. For an artist earning £500/mo in direct fan support, this is a meaningful difference at any tier.

---

### Big Link (by Linkfire)

**Focus and context:**
Big Link is Linkfire's artist-facing product. Linkfire itself is a B2B music marketing tool used by labels, DSPs, and publishers to manage smart links and campaign tracking at scale. Big Link brings some of that functionality to independent artists.

**What it does well:**
- Deep Spotify and Apple Music integration — pre-save functionality, streaming link aggregation
- Analytics built for release campaigns (streams attributed to link clicks)
- Industry credibility — Linkfire is used by major labels, which signals professional-grade infrastructure
- Smart link generation is fast and music-specific

**What it does not do:**
- Not designed for independent artists. The UX and mental model come from the label-side product. The complexity shows.
- No fan capture mechanism. No email collection. No owned audience.
- No gig mode, no live countdown, no profile-level identity system.
- No design differentiation. Pages are functional, not personal.
- The profile is a smart link destination, not an artist's world.

**ABLE's counter:**
"Made for independent artists, not labels. No industry gatekeeping."

Big Link is what happens when a tool built for labels gets a consumer UI bolted on. The infrastructure is solid. The product philosophy is wrong for the independent artist. ABLE is designed from the ground up for someone without a team, without a budget, and without an industry relationship — but with a real audience and a genuine need to own that relationship.

**Who uses Big Link:**
Artists who are already embedded in the streaming-focused release workflow — pre-saves are critical to their strategy, and they want the analytics to prove ROI to collaborators or management. These artists are often further along in their career and more likely to be on a label-adjacent trajectory. Not ABLE's core acquisition target, but reachable if ABLE builds deep enough pre-save functionality.

---

### LayloFM

**Context:**
LayloFM is the most philosophically similar competitor to ABLE. It is explicitly built on artist-owned fan relationships, email-first, with direct fan communication as the core value proposition.

**What it does well:**
- The ownership philosophy is genuine and well-articulated — the closest competitor to ABLE's product truth
- Email list ownership is the product's reason to exist, not a feature
- Direct fan messaging (text/email) is functional and the primary retention mechanism
- Has an audience in the US independent music scene

**Where the gaps are:**
- Design quality: Less polished than ABLE. The visual system lacks the identity-level differentiation that makes ABLE profiles feel personal. Profiles are cleaner than Linktree but not music-culture native.
- US-centric positioning and pricing (USD, US-market assumptions). ABLE is UK-first with international scope.
- No campaign-aware page states. Pre-release, live, and gig modes do not exist. The profile is static relative to the artist's release cycle.
- No gig mode. No real-time countdown.
- No freelancer discovery layer. No credits system.
- The product is narrow: email list + direct message. ABLE is broader: conversion profile + list + campaign states + design identity + connections.

**Primary switching trigger:**
The artist is already thinking about fan ownership (so the education barrier is lower) but finds LayloFM's design limiting and its feature set too narrow for what they actually need when a release is happening.

**ABLE's counter:**
Design quality + campaign states + gig mode.

LayloFM and ABLE agree on the most important thing: the fan relationship belongs to the artist. ABLE wins on execution breadth. The artist who moves from LayloFM to ABLE is already converted — they just need a better tool.

---

## The three switching triggers common to all competitors

These are the moments when an independent artist considers switching, regardless of which platform they are currently on:

**1. "My fans' emails should belong to me, not to the platform."**

This is the deepest trigger. It typically arrives when the artist:
- Watches their Instagram reach drop 40% and realises they have no fallback
- Reads about a competitor's account being banned with no recourse
- Gets asked "how big is your list?" and realises they don't have one
- Sees another artist announce a sold-out show via email to people who've been on their list for 3 years

The urgency is situational. ABLE should be positioned to catch this moment — on landing.html, in SEO content, and in the messaging that comes from artists who have already made the switch.

**2. "I want my page to look like me, not like every other artist on Linktree."**

This trigger is aesthetic and emotional. The artist has started taking their presence seriously. They have released music, played shows, built a real audience. Sending people to a Linktree that looks like everyone else's Linktree feels wrong.

ABLE's design identity system is the direct answer. Every profile has a personality. The artist does not choose a template — the profile is shaped by their genre, their accent colour, and what is currently happening in their career.

**3. "I need something that works for a release, not just a static list of links."**

The artist has a release coming. They want to build momentum, capture pre-saves, and convert that attention into something they can build on. A static link page cannot do this. Linktree cannot do this. Beacons cannot do this.

ABLE's page state system is the direct answer. The profile knows about the release. It counts down. It switches to live mode on drop day. It returns to profile mode two weeks later. The page is always in the right state for where the artist is in their cycle.

---

## Full competitor comparison matrix

Scored on a 0–10 scale. ABLE score is current capability, not aspiration. Competitor score is honest assessment of their actual product.

**Dimensions:**
1. Campaign state awareness — does the profile know where the artist is in their release cycle?
2. Fan data ownership — does the artist own the email addresses they collect?
3. Copy philosophy / brand quality — is the platform's voice credible to an independent artist?
4. Mobile UX quality — how good is the profile experience on a phone at 375px?
5. Freelancer / credits system — can collaborators be discovered via an artist's page?
6. Pricing fairness — does the platform take a cut of fan income? Is the free tier usable?
7. Analytics depth — what does the artist actually learn from their dashboard?
8. Fan capture — can fans sign up and be owned by the artist?
9. Music-native features — streaming embeds, show listings, release mechanics?
10. Onboarding quality — can an artist go from zero to a good-looking profile fast?

---

| Competitor | 1. Campaign states | 2. Fan ownership | 3. Brand quality | 4. Mobile UX | 5. Freelancer/credits | 6. Pricing | 7. Analytics | 8. Fan capture | 9. Music-native | 10. Onboarding | **Total /100** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **ABLE** | **10** | **10** | **9** | **9** | **8** | **9** | **7** | **9** | **10** | **7** | **88** |
| Linktree | 0 | 0 | 5 | 7 | 0 | 6 | 5 | 1 | 2 | 9 | **35** |
| Beacons | 0 | 3 | 5 | 7 | 0 | 4 | 6 | 5 | 3 | 8 | **41** |
| Feature.fm | 3 | 4 | 6 | 6 | 0 | 5 | 7 | 3 | 7 | 5 | **46** |
| Big Link (Linkfire) | 2 | 2 | 5 | 6 | 0 | 5 | 7 | 1 | 6 | 4 | **38** |
| LayloFM | 2 | 8 | 7 | 6 | 0 | 7 | 4 | 8 | 3 | 6 | **51** |
| ToneDen | 4 | 3 | 5 | 5 | 0 | 5 | 8 | 4 | 6 | 5 | **45** |
| Bandsintown | 1 | 2 | 6 | 7 | 0 | 7 | 6 | 2 | 5 | 6 | **42** |
| Spotify for Artists | 0 | 0 | 8 | 8 | 0 | 10 | 9 | 0 | 8 | 3 | **46** |
| DistroKid | 0 | 0 | 6 | 5 | 0 | 7 | 4 | 0 | 5 | 6 | **33** |
| Koji | 0 | 2 | 4 | 6 | 0 | 5 | 3 | 3 | 2 | 6 | **31** |
| Soapbox / Fanbase | 1 | 3 | 4 | 5 | 0 | 4 | 3 | 5 | 2 | 4 | **31** |

---

### Dimension notes by competitor

**Linktree**
- Campaign states (0): Not designed for it. Static by architecture. Profile looks identical pre-release, on drop day, and 6 months later.
- Fan ownership (0): No email capture. Fans who click leave no trace. The artist owns nothing.
- Pricing (6): Free tier is genuinely usable for basic links. Pro at ~£9/mo is reasonable but gives you analytics on links — not on fans, because there are no fans.
- Music-native (2): Spotify and Apple Music link icons exist. No streaming embeds, no show listings, no release mechanics.

**Beacons**
- Fan ownership (3): Email collection exists but mediated. The platform is in the relationship. Export is possible but framed as an afterthought.
- Pricing (4): Free tier has monetisation. Platform takes 5–30% of creator revenue depending on tier. For an artist earning £500/mo direct, this is £25–150/mo to Beacons. ABLE takes 0%.
- Onboarding (8): Good wizard experience. Visual editor is polished for someone who does not care about music-specific context.

**Feature.fm**
- Specialises in pre-save links and smart links for releases. The strongest single-feature competitor to ABLE's pre-release mode.
- Campaign states (3): Smart links can be configured per-campaign but the profile layer is weak. No auto-switching logic.
- Fan ownership (4): Email collection attached to pre-save flows exists. Not artist-owned architecture — it is campaign-scoped capture, not an ongoing owned list.
- Music-native (7): Release-link deep links, streaming platform routing, Apple Music / Spotify pre-save — stronger than most on this specific slice.
- Weakness: No permanent profile. Feature.fm is campaign infrastructure, not an identity. Artists still need Linktree or similar for their bio link.
- ABLE's counter: ABLE is both the permanent identity and the campaign layer. Feature.fm requires two tools where ABLE requires one.

**Big Link (Linkfire)**
- Analytics (7): Linkfire's heritage gives Big Link the deepest streaming attribution data of any competitor. A click from the artist's bio → a stream on Spotify is tracked. Labels care about this. Independent artists often do not have the mental model to act on it.
- Fan ownership (2): No owned email capture. The data stays in the Linkfire ecosystem.
- ABLE's counter: analytics depth is irrelevant if the artist cannot act on it. ABLE's analytics are designed for decisions an independent artist can actually make.

**LayloFM**
- Fan ownership (8): The most credible competitor on this dimension. Ownership-first architecture is genuine, not marketing.
- Campaign states (2): Text/email broadcast can be scoped to a release but the profile layer is static. No page state system, no gig mode, no countdown.
- Analytics (4): Basic. Click and fan count. No release-window attribution.
- ABLE's counter: the architecture philosophy is shared. ABLE wins on execution above the email list — the visual identity, the live page states, the gig mode, the full release cycle.

**ToneDen**
- Pre-save campaigns, Facebook/Instagram ad integration, event promotion. US-focused.
- Campaign states (4): Pre-save landing pages exist and are the product's strongest feature. Not profile-level campaign awareness — one-off landing pages, not a living profile.
- Analytics (8): Ad attribution is the strongest in the set. ROI tracking for paid campaigns is ToneDen's core competency.
- Music-native (6): Event listings via Bandsintown integration. Streaming pre-save. No gig mode, no release window auto-switch.
- Weakness: not a profile. ToneDen is campaign infrastructure. Artists still need a bio-link destination.
- ABLE's counter: same as Feature.fm. ABLE replaces two tools with one. An artist who uses ToneDen for pre-save campaigns and Linktree for their bio is a candidate to move the whole workflow to ABLE.

**Bandsintown**
- Primary function: event discovery and artist follow. Not a link-in-bio or fan capture tool.
- The overlap is narrow: ABLE's shows section competes for the same use case (fan finds out about upcoming gigs).
- Bandsintown's advantage: discovery. Fans already use Bandsintown to track artists. ABLE does not have a discovery layer yet.
- ABLE's counter: Bandsintown does not own the fan relationship either. A fan who "follows" on Bandsintown is a Bandsintown user, not the artist's contact. ABLE's show RSVPs (future feature) would capture an email against the show — Bandsintown never does.

**Spotify for Artists**
- The largest platform with access to every listener. Artist dashboard with streaming analytics, audience demographics, playlist data.
- Campaign states (0): No profile the artist controls for fan landing. Spotify artist pages are platform-curated, not artist-owned.
- Fan ownership (0): Spotify owns every data point. A fan who follows an artist on Spotify is Spotify's data. The artist gets aggregate stats, not email addresses.
- Analytics (9): Best-in-class streaming analytics. Artist origin stories, listener cities, playlist sources. Nothing close in this set.
- ABLE's counter: see full analysis below (Spotify Music Pro threat section).

**DistroKid**
- Distribution tool. 100% artist-owned revenue. No profile layer at all.
- Landing here because artists use DistroKid as their "music admin" relationship. ABLE does not compete with distribution.
- The adjacent threat: DistroKid could launch a public artist profile (they have not). If they did, they would have the catalogue data to pre-populate it. ABLE's defence: DistroKid is a backend tool. Artists would still need a bio-link destination, and DistroKid has zero fan relationship architecture.
- Score note: most dimensions scored 0 or low because DistroKid does not attempt them.

**Koji**
- Mini-app ecosystem on top of a link page. Polls, games, audio clips, digital downloads, Discord link integrations.
- Campaign states (0): No profile-level awareness of the artist's moment.
- The overlap with ABLE: snap cards (ABLE's interactive modular content) share DNA with Koji's mini-app concept. The difference is execution philosophy — Koji is a platform marketplace, ABLE's snap cards are purpose-built for music contexts.
- Who uses Koji: a narrow but engaged audience of creators who want interactivity on their bio link. Musicians are a subset.
- Not an immediate threat. Different philosophy.

**Soapbox / Fanbase**
- Fan community and monetisation tool. Subscriptions, exclusive content, fan tiers.
- Overlap with ABLE's "support" section and future fan tiers.
- Design quality is lower. The product is functional but not music-culture native.
- ABLE's counter: ABLE is the public face (anyone can arrive from a link-in-bio) while a tool like Fanbase is the inner layer (subscribers only). These are complementary, not directly competitive. The risk is an artist choosing one over the other for their primary bio link. ABLE wins on public-facing quality.

---

## Spotify Music Pro: $5.99/month competitive threat analysis

**What it is (as of March 2026):**
Spotify is rolling out Spotify Music Pro, a premium tier that gives paying listeners higher audio quality, AI DJ features, and artist radio. Separately, Spotify has expanded artist tools including Clips (short-form video on artist pages) and Showcase (paid artist-to-fan promotion within the app). The combined direction: Spotify wants to be the end-to-end platform for artist-fan relationships — inside the Spotify app.

**What Spotify Music Pro does:**
- Puts the artist in front of Spotify's 600M+ monthly active users without any additional platform required
- Gives artists richer on-app promotion tools (Showcase, Marquee, Clips) to reach fans where they already are
- Deepens the Spotify artist page with more customisation — artist picks, canvas video, merchandise integration
- Provides streaming analytics that are genuinely superior to anything ABLE will build for years

**What Spotify can never do:**

This is the critical analysis. Despite Spotify's scale, resources, and data advantage, there are structural things they cannot do without dismantling their business model:

1. **Give artists their fans' email addresses.** Spotify's entire platform depends on fans living inside Spotify. The moment Spotify gives artists direct email access to their followers, Spotify becomes unnecessary. A fan who gives an artist their email can be reached independently, forever, at zero cost. Spotify will not do this. Their business model requires the fan's attention to stay on Spotify.

2. **Let artists capture fans from non-Spotify sources.** If an artist plays a show tonight and wants to capture the email of every person who came, ABLE does that. Spotify does not — because those fans are not on Spotify at the show. ABLE's fan capture works anywhere the bio link is present: Instagram, TikTok, YouTube descriptions, Linktree equivalents, press features, QR codes at venues.

3. **Show a gig mode tonight.** Spotify's artist page is the same page whether the artist is playing in 4 hours or has not released anything in 6 months. Spotify does not know what the artist's current moment is relative to a fan's real life outside the app.

4. **Let the artist contact their fans directly.** Spotify's "Artist Messages" feature exists but fans must have notifications on and must be on the app. An email to an owned list reaches people in their inbox regardless of platform. Spotify always controls the delivery layer.

5. **Be independent of the algorithm.** Spotify's entire promotional architecture is pay-to-play or algorithmic. Marquee and Showcase require budget. Editorial playlist placement requires Spotify's approval. An ABLE page with an owned list requires neither.

**The ABLE moat against Spotify:**

The core distinction is architectural: Spotify is a platform that intermediates the fan relationship. ABLE removes the intermediary. These are not competing for the same thing. Spotify is where fans discover music. ABLE is where the artist owns what happens after discovery.

The artists who understand this use both: Spotify for reach, ABLE for ownership. An artist who has 50,000 Spotify followers and 2,000 email addresses on ABLE is not well-served by either alone. The combination is the mature strategy.

**ABLE's counter-positioning to Spotify:**
"Spotify knows how many people streamed your last track. ABLE knows who signed up for the next one."

**What to watch for:**
If Spotify launches a public artist profile URL with fan sign-up capability, the threat escalates significantly. They have the infrastructure and the audience. The one thing they will never add is the artist-owns-the-email architectural decision. That is ABLE's permanent moat.

---

## Quarterly watch list

These competitors require a manual check every 3 months. The specific risk each represents, and what would constitute a material threat to ABLE's position.

---

### LayloFM — check every quarter

**Why it's on the watch list:**
LayloFM is the most philosophically aligned competitor. They understand artist ownership. They have US market traction. The gap between LayloFM and ABLE is primarily execution breadth (no campaign states, no design identity system, no gig mode) — not philosophy. A single sprint from a good team could close the campaign-states gap.

**What to check:**
- Product changelog / feature announcements
- Pricing changes (especially any free tier restrictions that might push artists toward ABLE)
- Any new design investment (their current design quality is ABLE's advantage)
- Pre-release countdown or page-state feature launch — this is the specific signal

**What constitutes a material threat:**
LayloFM ships a page state system with auto-switching logic tied to release dates. If they do, ABLE's most specific and unique advantage is no longer unique. Response required within 30 days: differentiate on design quality, freelancer layer, and the philosophy execution (not just the feature).

**What does not constitute a threat:**
LayloFM adding email broadcast features, improving their dashboard, or raising/lowering pricing. These are moves in a different lane.

---

### ToneDen — check every quarter

**Why it's on the watch list:**
ToneDen competes on two specific features that overlap with ABLE's artist tier: pre-save campaigns and event promotion. Artists who are serious about Spotify release strategy know ToneDen. As ABLE's Spotify import and pre-save features mature, ToneDen becomes a direct competitor for the same artist workflow.

**What to check:**
- Pre-save feature updates (deeper Spotify integration, Apple Music, countdown pages)
- Any profile/permanent bio-link launch (this would be the specific escalation signal)
- Event promotion tools overlap with ABLE's shows section

**What constitutes a material threat:**
ToneDen launches a permanent public artist profile with bio-link functionality. Currently they are campaign infrastructure without a living profile. If they add one, they become a direct two-tool-in-one competitor to ABLE's campaign-state system.

---

### Spotify for Artists — check every quarter

**Why it's on the watch list:**
Spotify is the most powerful music platform on earth. Their artist tools are expanding in the direction of richer artist-fan relationships. The risk is not that they build ABLE's features — it is that they make the Spotify ecosystem so complete that independent artists do not feel the need for an external bio-link tool.

**What to check:**
- Any announcement of a public artist profile URL with customisation
- Spotify fan email collection feature (would be a fundamental shift in their model)
- Expansion of Clips, Showcase, and direct artist-to-fan messaging
- Spotify's free-to-artist promotional tools vs. ABLE's owned-list advantage

**What constitutes a material threat:**
Spotify gives artists a customisable public URL for their bio link that fans can sign up on. If they do this and include any form of email collection, the threat is real because of their distribution advantage. ABLE's response: the email stays in Spotify's ecosystem — artists still need ABLE for ownership.

---

### Beacons — check every quarter

**Why it's on the watch list:**
Beacons is well-funded, growing, and continuously shipping features. Their current design quality is below ABLE's but they have the resources to close that gap. They are not a philosophical competitor — they take revenue cuts, they are not music-first — but they are a capable link-in-bio tool with an improving product.

**What to check:**
- Any campaign-state or release-schedule feature launch
- Design investment — if Beacons hires a music-culture design team, the output quality comparison shifts
- Revenue cut changes (reducing the cut would reduce one of ABLE's clearest differentiators)

**What constitutes a material threat:**
Beacons ships a "release mode" that auto-switches the profile based on a set release date. Unlikely given their multi-creator positioning, but worth checking.

---

*Quarterly check time budget: 30 minutes total — roughly 7 minutes per competitor. Check product changelogs, Twitter/X product accounts, and G2/Capterra reviews for feature mentions. Do not spend more than this. Competitive intelligence beyond 30 minutes/quarter is diminishing returns at ABLE's current stage.*

---

## What ABLE must never say about competitors

**Never name competitors in marketing copy.**

Naming a competitor in marketing copy signals insecurity. It tells the reader that ABLE defines itself by what it is not. ABLE must define itself by what it is.

Bad: "Unlike Linktree, ABLE gives you fan emails."
Good: "Every fan who signs up is on your list. Your emails. Your relationship."

Bad: "Switch from Beacons to ABLE."
Good: "Your page should feel like you. Not like every other artist using the same blocks."

**Never say "unlike [competitor]."**

Same principle. Say what ABLE is. Let the features speak.

**The comparison table on landing.html is the exception.**

A feature comparison table — presented factually, without loaded language — is a legitimate product communication tool. It lets the features speak without the copy making claims. The table should be accurate, not cherry-picked, and should include features where competitors have genuine advantages (e.g., Linktree's simplicity for non-musicians). Intellectual honesty builds trust.

---

*Review date: 2026-06-16*


---
# FILE: docs/systems/copy/SPEC.md
---

# ABLE Copy System — Master Spec
**Created: 2026-03-15 | Authority: DEFINITIVE**

> This is the single authoritative voice guide for all copy on the ABLE platform. If a per-page COPY.md conflicts with this document, this document wins. If a developer writes copy not covered here, they must check it against the governing principle in section 2.1.
>
> This spec is written to be usable by a contractor who has never read any other ABLE document. It contains everything they need.

---

## 2.1 The governing principle

The artist-fan relationship belongs to them, not to ABLE. ABLE's copy serves as a door — it opens, it's clear, then it gets out of the way. Every word asks: **does this serve the artist or ABLE's ego?**

ABLE is not a marketing platform. It is not a SaaS product. It is a place for artists to be themselves and for fans to stay close. The copy must always feel like it was written by someone who has been in the room — not a startup trying to sound cool.

**The test for any piece of copy:**
1. Would an artist with real credibility be embarrassed if this appeared on their page?
2. Does this sound like a form, a startup, or a hustle? If yes, rewrite it.
3. Read it aloud. If you would not say this to a friend in the music industry, it is wrong.

---

## 2.2 Voice register table

This is the single most important reference. Every context has a register. Do not confuse them.

| Context | Who is speaking | Register | Example |
|---|---|---|---|
| Artist profile — body | The artist | Direct, first-person, their own voice | "I've been working on this for two years. It's done." |
| Artist profile — defaults | ABLE writing in the artist's voice | Understated, warm, short | "Stay close." |
| Artist profile — fan CTAs | The fan speaking | First-person, low-pressure | "I'm in." / "Count me in." |
| Admin greeting | ABLE to the artist | Warm, one beat, professional | "Good to see you, James." |
| Admin sub-greeting | ABLE, contextual, specific | Observational, direct | "3 days until Somewhere Else drops." |
| Admin nudge | ABLE, honest peer | Specific, no hyperbole | "3 fans this week — that's new. Send them something." |
| Admin empty state | ABLE | Honest, specific, no placeholder feel | "Playing anywhere soon? Your fans want to know →" |
| Admin confirmation toast | ABLE | Brief, matter-of-fact | "Saved." |
| Fan dashboard | ABLE writing about artists | Anticipatory, specific, present tense | "Something new from Nadia today." |
| Fan dashboard empty | ABLE | Honest, not apologetic | "You're here because of an artist. Find them — or find someone new." |
| Landing page — headline | ABLE, confident | Direct statement, no hype | "100 real fans beat 10,000 strangers." |
| Landing page — body | ABLE | Inside knowledge, industry fluency | "What does it know about your release dropping in 3 days?" |
| Landing page — CTA | ABLE | First-person, specific about value | "Your page is free →" |
| Onboarding | ABLE | Patient, direct, human | "What do you go by?" |
| Error states | ABLE | Calm, specific, gives a path forward | "Couldn't reach Spotify right now. Enter your name below and we'll carry on." |
| Confirmation emails | ABLE writing on behalf of artist | Artist-voiced, not platform-voiced | "[Artist Name] asked me to check this is actually you." |
| Tier gate copy | ABLE | Specific about what the artist gains, no pressure | "Write to your fans directly. Not a broadcast. Not a newsletter. Just you and the people who signed up. From £19/month." |

---

## 2.3 Banned phrases — master list

These phrases are banned from all user-facing copy on ABLE. No exceptions. If a banned phrase is found in built code, it must be replaced before shipping.

### Category 1: Growth/marketing language
- "Turn fans into superfans"
- "Grow your audience" → say "reach people who care" or just describe the action
- "Monetise your fanbase" / "Monetize" → say "let people support you directly"
- "Engage your followers" / "Engage with your fans" → say "stay close to the people who show up"
- "Going viral" / "Viral" → never
- "Boost your profile" / "Supercharge" / "Level up" / "Skyrocket"
- "Leverage" / "Unlock" / "Power up"
- "Audience growth" / "Audience building"

### Category 2: Platform/corporate language
- "Content creator" → say "artist"
- "Content" (when referring to music, updates, or art) → say "music", "update", "message from the artist"
- "Followers" → say "people who follow them" or "your fans"
- "Superfan" — internal vocabulary only, never user-facing
- "CRM" / "Fan CRM" → say "your list" or "the people who signed up"
- "Dashboard" in page titles or UI labels → the page title is never "Dashboard"; the home screen is just "Home" or unlabelled
- "Mailing list" → say "your fans" or "the people who signed up"
- "Newsletter" → say "keep them in the loop" or "write to them"
- "Feed" (for the fan page) → say "Following" or "The artists you're following"
- "Subscribers" → say "fans" or "people on your list"
- "Community" (when it means "audience") → say "your fans" or "the people who show up"
- "Journey" / "Experience" / "Ecosystem"
- "Profile" (when talking to fans — they should never know they're on a "profile")

### Category 3: SaaS micro-copy
- "Welcome aboard!" / "You're all set!" / "You're good to go!"
- "Get started!" / "Get started" as a CTA
- "Almost there!" — banned even without the exclamation mark
- "Let's go!" / "Let's get started!"
- "Sign up" as a CTA label → say "I'm in" / "Stay close" / "Count me in"
- "Submit" as a button label → say what the action actually does
- "Next" as a button label in onboarding → say what happens next ("Continue →" is the minimum; specific is better)
- Generic "Learn more" → say what they'll learn
- "Find out more" → same
- "Explore" as a primary CTA

### Category 4: Punctuation and register
- Exclamation marks on admin/dashboard copy — zero exceptions
- Exclamation marks in any ABLE-written copy (artist can use them in their own content)
- "Trending" → never on ABLE
- "Recommended for you" → say "Because you follow [Artist]" or "Similar sound"
- "People like you" / "Users like you" → never
- Any price shown with pence (£4.99 → show as £5)
- Emoji in admin/dashboard copy unless the artist set them in their own content
- "Fans" used as a vanity metric ("Your fan count is growing") → say "people" or show the number

### Category 5: Artist-profile specific bans
- "Subscribe to updates" → "Stay close."
- "Get notified" → anything in the artist's voice
- "Join the list" → it's their list, not the platform's
- "Follow" (as a CTA on the artist's page) → never; the artist has followers, they are not followed on ABLE
- "You're all set!" as a post-sign-up confirmation → "You're in."
- "Welcome!" as a post-sign-up response → "You're in. I'll keep you close."
- "Exclusive content" → say what it actually is ("new music before it's out", "first shot at tickets")
- "Join the community" → "Join the circle" or nothing
- "Become a supporter" → "Come closer"
- "Premium access" / "Exclusive benefits" / "Exclusive access"
- "Unlock" preceding anything
- Section headers in third person ("Music", "Events") — default is first person ("My music", "Shows")

---

## 2.4 Artist default copy

These are the strings that appear on a brand-new artist's page before they have customised anything. They must feel like the artist chose them, not like ABLE filled in a placeholder.

**The golden rule for defaults:** every default must be plausibly the artist's own voice. If a fan read it, they should believe the artist typed it.

### Hero section
| Element | Default | Notes |
|---|---|---|
| Artist name | Empty — show nothing | Never "Artist Name" or any placeholder |
| Tagline / bio | Empty — show nothing | Empty is correct. No placeholder text to fans. |
| Hero CTA (primary) | "My music" | Or "Listen", "Stream", "Hear this" — all acceptable |
| Hero CTA (secondary) | "Stay close" | Scrolls to fan sign-up |

### Fan sign-up module
| Element | Default | Notes |
|---|---|---|
| Heading | "Stay close." | Period is intentional. Display font, large. |
| Subtext | "Just your email. I'll reach out when something's actually happening." | Artist-voiced |
| Input placeholder | "Your email" | Not "Email address", not "you@email.com" |
| Submit button | "I'm in" | First-person fan voice |
| Trust line | "Just [Artist Name]. No spam." | Dynamic — uses artist name |
| Post-submit toast | "You're in." | Period. No exclamation. |
| Post-submit module text | "You're in. I'll keep you close." | Artist-voiced confirmation |

### Snap cards
Default: no snap cards. The snap cards row is hidden if empty. Never show a placeholder snap card with ABLE-written text.

### Section headers (when sections exist)
| Section | Default |
|---|---|
| Music | "My music" |
| Events | "Shows" |
| Merch | "Stuff" |
| Recommendations | "Artists I believe in" |

### Made with ABLE footer
```
Made with ABLE
```
Style: small, quiet, never competing. This is the only place ABLE's name appears on an artist's page. It is never "Powered by ABLE" or "Built on ABLE".

---

## 2.5 Page-by-page copy rules

### able-v7.html — Artist public profile

1. This page speaks in the **artist's voice**. ABLE is invisible.
2. All defaults must feel artist-written, not ABLE-generated.
3. Fan CTAs are **fan first-person** ("I'm in", not "Sign up").
4. Empty sections are hidden — never show "nothing here yet" to fans.
5. Owner-mode copy is the exception — the artist sees edit prompts, fans never do.
6. The word "profile" never appears to fans. The word "dashboard" never appears anywhere.
7. Auto-save toast: "Saved." — period, lowercase 's' after initial.
8. Share confirmation toast: "Copied." — period.
9. The `og:description` default is: `"Music, shows, and more — direct from [Artist Name]."` — never "Artist profile powered by ABLE".

### admin.html — Artist dashboard

1. ABLE speaks to the artist like a **smart manager, not a SaaS product**.
2. Greeting: "Good to see you, [First Name]." — warm, one beat, done. No sub-line on day 1 except "Your page is live."
3. Never use "Dashboard" in any visible copy. The page title is "ABLE" or "[Name] — ABLE". Never "Dashboard — ABLE".
4. Stat labels are single words: "Visits", "Clicks", "Fans", "Click rate" — not "Link clicks" or "Fans joined".
5. Tier gate copy always says what the artist gets, then the price. Never just "Upgrade".
6. Destructive action copy (delete, reset): calm and specific. "This removes your page and all fan data. This cannot be undone." — no dramatic styling.
7. Export copy: "Export as CSV →" — always available, always visible.
8. Toast copy: "Saved." for most saves. More specific where warranted (e.g., "Show added.").

### start.html — Onboarding wizard

1. Questions, not labels. "What do you go by?" not "Artist Name:".
2. CTAs are specific to the action. "Continue →" minimum. "Build my page →" on the final step.
3. No "Next", "Submit", "OK", "Done" as button labels.
4. Error states are never red unless it is genuinely an error. Import failures are amber.
5. Trust lines are specific: "No card. No catch. Your page is free." — not "Risk-free".
6. The done screen headline is exactly: "Your page is live." — period, this phrase, no variants.
7. "Almost there" is banned even without an exclamation mark.

### landing.html — Marketing landing page

1. Speaks to a sceptical, intelligent, independent artist.
2. Never uses industry growth-speak.
3. Primary CTA: "Your page is free →" — first-person, specific.
4. Social proof: real numbers only. No inflated stats. No "Most popular" tier badge.
5. FAQ answers are short and direct. "Yes. Free forever." not "Absolutely, our free tier is..."
6. The FAQ section title is: "Questions." — single word, period.
7. Footer authenticity line: written in first person from the founder, not corporate voice.

### fan.html — Fan dashboard (Phase 2)

1. ABLE is invisible. The artists are visible.
2. "Following" not "Feed". "Me" not "Profile". "Updates from your artists" not "Notifications".
3. Empty states acknowledge reality without spin: "Nothing new today." is correct. "You're all caught up!" is not.
4. Dates and times are specific: "Tonight, 11pm" not "Upcoming event".
5. Artist voice > platform voice. Dispatch copy appears verbatim from the artist.
6. No follower counts, no trending, no engagement signals.

---

## 2.6 Tone calibration examples

Ten before/after rewrites. These are the definitive test for whether new copy fits ABLE's voice. If a contractor is unsure about a line, they should check it against these examples.

### 1. Fan sign-up heading
**Before:** "Subscribe to get updates from this artist"
**After:** "Stay close."
**Why:** "Stay close" is the artist speaking to someone they value. "Subscribe to get updates" is a platform managing a transaction.

### 2. Post-sign-up confirmation
**Before:** "You're subscribed! We'll send you updates."
**After:** "You're in. I'll keep you close."
**Why:** First person, artist-voiced. The artist is speaking directly. "Subscribed" is a platform category. "You're in" is human.

### 3. Admin greeting
**Before:** "Welcome back, James! You're on a roll — 3 new fans this week."
**After:** "Good to see you, James. 3 fans this week — that's new."
**Why:** "Welcome back" is SaaS filler. "You're on a roll" is the voice of a cheerleader. The after version is warm but not sycophantic.

### 4. Tier gate copy
**Before:** "Upgrade to Pro to unlock full analytics and email broadcasts."
**After:** "Write to your fans directly. Not a broadcast. Not a newsletter. Just you and the people who signed up. From £19/month."
**Why:** "Upgrade to unlock" is the model where the platform withholds things until you pay. The after version describes what the artist actually gets and why it matters. "Unlock" is banned.

### 5. Empty fan list
**Before:** "No fans yet. Share your page to start building your audience."
**After:** "When fans sign up on your page, they'll appear here. Your list. Your relationship. No algorithm in the way."
**Why:** "Start building your audience" is growth-speak. The after version is honest about what the list is and why it matters — without making the artist feel like a failure for not having fans yet.

### 6. Error state — email invalid
**Before:** "Error: Please enter a valid email address."
**After:** "Check your email address."
**Why:** "Error:" is cold. "Please enter a valid" is form language. The after version is calm, specific, and doesn't apologise.

### 7. Empty events section — admin
**Before:** "No shows added yet. Click the + button to add a show."
**After:** "Playing anywhere soon? Your fans want to know →"
**Why:** The before is documentation. The after is a reason to act. It connects the empty state to why the feature exists.

### 8. Onboarding done screen
**Before:** "You're all set! Your profile is live. Start sharing your page to get your first fans."
**After:** "Your page is live."
**Why:** "You're all set!" is banned. "Start sharing your page to get your first fans" is growth-speak. "Your page is live." says the only thing that matters. Full stop. Done.

### 9. Close Circle invitation
**Before:** "Become a supporter and get exclusive content, early access, and premium benefits."
**After:** "Stay closer. A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere. £5 a month. You can leave whenever."
**Why:** "Exclusive content" and "premium benefits" are subscription product language. The after version describes specifically what happens, honestly, without pressure or corporate vocabulary.

### 10. Toast — profile saved
**Before:** "Profile saved successfully!"
**After:** "Saved."
**Why:** "Successfully" is redundant — if it saved, it saved. The exclamation mark is banned in admin. The period is intentional. The word is enough.

---

## 2.6b Campaign state copy — exact strings for every surface

Each of the 4 campaign states has specific copy across every surface it appears on. These are locked strings — do not paraphrase or abbreviate.

### State: `profile` (default)

| Surface | Copy |
|---|---|
| Page hero label | _(none — artist name and bio only)_ |
| Admin Campaign HQ state pill | "Live" _(the page is live; this is the default)_ |
| Admin Campaign HQ description | "Your page is live. Put the link in your bio." |
| Fan sign-up heading (default) | "Stay close." |
| Fan sign-up sub | "Just your email. I'll reach out when something's actually happening." |

### State: `pre-release`

| Surface | Copy |
|---|---|
| Page hero label | "[Release title] — [N] days" (e.g. "Echoes — 3 days") |
| Page hero CTA primary | "Pre-save [Release title]" |
| Page countdown label | "Until [Release title]" |
| Admin Campaign HQ state pill | "Pre-release" |
| Admin Campaign HQ description | "[Release title] drops on [Date]. Pre-release mode is on." |
| Fan sign-up heading | "You signed up right before something." |
| Fan sign-up sub | "[Release title] comes out in [N] days. You'll hear it first." |
| Fan confirmation email subject | "[Release title] — [N] days" |

### State: `live`

| Surface | Copy |
|---|---|
| Page hero label | "[Release title] — out now" |
| Page hero CTA primary | "Stream [Release title]" |
| Admin Campaign HQ state pill | "Live" _(release window active)_ |
| Admin Campaign HQ description | "[Release title] is out. You have [N] days in live mode." |
| Fan sign-up heading | "Stay close." |
| Fan sign-up sub | "[Release title] is out. You can stream it from here." |
| Fan confirmation email subject | "[Release title] is out" |

### State: `gig`

| Surface | Copy |
|---|---|
| Page hero label | "On tonight" |
| Page hero CTA primary | "Get tickets" |
| Page venue/time line | "[Venue], [City]. Doors [Time]." |
| Admin Campaign HQ state pill | "Gig mode" |
| Admin Campaign HQ description | "Your page is in gig mode. It auto-resets in [N] hours." |
| Admin gig mode countdown | "Resets in [Nh Nm]" |
| Fan sign-up heading | "I'm playing tonight." |
| Fan sign-up sub | "Sign up and I'll keep you close after the show." |
| Fan confirmation email subject | "Tonight at [Venue]" |

---

## 2.7 Additional rules for contractor use

### Length hierarchy
- **Toast:** 1–4 words. No exceptions.
- **Nudge:** 1 sentence + a link. No more.
- **Section empty state:** 1–2 sentences. Not a paragraph.
- **Tier gate:** 2–3 sentences + price + CTA. Not a feature list.
- **Hero copy (profile):** 1 line for the name. 1 line for location/genre. 1–2 sentences for bio. No more on the hero.
- **Onboarding steps:** 1 question + 1 sub-line. Nothing else.

### Punctuation rules
- Periods on short standalone statements: "Saved." / "Your page is live." / "You're in."
- Em dash (—) for asides and lists within sentences: "Your list. Your relationship. No algorithm in the way."
- Arrow (→) on CTAs that navigate or go deeper: "Export as CSV →" / "See what's included →"
- No colons on button labels
- No exclamation marks in any ABLE-written copy
- Ellipsis (...) only on actively loading states ("Checking...")
- Commas are specific — if you can replace a comma with a period, use the period

### Writing for mobile
- Mobile users scan, not read. The first two words of every label carry the full load.
- Test every line at 320px. If it wraps awkwardly, rewrite it, do not shrink the font.
- Short labels win: "Visits" not "Page visits this week". The context makes the short label clear.

### What to do if you're unsure
1. Read it aloud as if you are talking to a musician who is serious about their work
2. Check it against the banned phrases list in section 2.3
3. Check it against the register table in section 2.2
4. Check it against the calibration examples in section 2.6
5. If still unsure: write it shorter. Shorter is almost always better on ABLE.


---
# FILE: docs/systems/ui/SPEC.md
---

# ABLE UI System — Canonical Specification
**Date: 2026-03-16 | Authority: V6_BUILD_AUTHORITY.md + DESIGN-SPEC.md**
**Status: Ground truth for all UI implementation decisions**

Two surfaces, one system. Every decision here applies unless a surface-specific override is noted.

- **Surface 1** — `able-v7.html`, `start.html`, `landing.html`, `fan.html`: dark navy, DM Sans body, artist-controlled `--color-accent`
- **Surface 2** — `admin.html`: near-black `#0f1624`, Plus Jakarta Sans body, amber `--acc: #c9a84c`

Surface 2 tokens are not derived from Surface 1 — they are a separate set for a different context. Do not mix them.

---

## 1. Design Tokens

### 1.1 Static tokens — Surface 1 (`:root`)

These are always present, never overridden by theme or vibe.

```css
:root {
  /* ── Fonts ─────────────────────────────────────────────── */
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-d:    'Barlow Condensed', system-ui, sans-serif;  /* overridden per vibe */
  --font-d-weight:    700;
  --font-d-style:     normal;
  --font-d-transform: none;   /* overridden per vibe (uppercase for electronic/hiphop/rock) */

  /* ── Spacing — 4px base grid ────────────────────────────── */
  --sp-1:  4px;
  --sp-2:  8px;
  --sp-3:  12px;
  --sp-4:  16px;
  --sp-5:  20px;
  --sp-6:  24px;
  --sp-8:  32px;
  --sp-10: 40px;
  --sp-12: 48px;
  --sp-16: 64px;

  /* ── Tap target ─────────────────────────────────────────── */
  --tap-min: 44px;   /* minimum height AND width for all interactive elements */

  /* ── Typography scale ───────────────────────────────────── */
  --text-xs:   11px;
  --text-sm:   13px;
  --text-base: 15px;
  --text-lg:   17px;
  --text-xl:   20px;
  --text-2xl:  24px;
  --text-3xl:  32px;
  --text-4xl:  40px;
  --text-hero: clamp(48px, 14vw, 80px);   /* artist name in hero */

  /* ── Line heights ───────────────────────────────────────── */
  --lh-tight:   0.88;   /* display — tightly packed headlines */
  --lh-display: 1.0;    /* section titles */
  --lh-body:    1.5;    /* paragraphs, bio, snap card text */
  --lh-label:   1.2;    /* caps labels, tags, pills */

  /* ── Border radii (defaults — overridden by applyDerivedTokens) ── */
  --r-pill: 999px;  /* Quick Action pills, state chips. ONLY use. Not on CTAs. */
  --r-sm:   8px;    /* buttons, CTAs — vibe-scaled */
  --r-md:   12px;   /* cards */
  --r-lg:   20px;   /* large cards, panels */
  --r-xl:   28px;   /* modal overlays */

  /* ── Letter spacing defaults (overridden per vibe) ─────── */
  --ls-d:     0em;     /* display headings */
  --ls-label: 0.12em;  /* caps labels */

  /* ── Easing curves ──────────────────────────────────────── */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);    /* spring bounce — reveals, confirms */
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94); /* deceleration — standard smooth */
  --ease-accel:    cubic-bezier(0.55, 0, 1, 0.45);       /* acceleration — exits */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);    /* neutral — backdrop, overlays */

  /* ── Duration scale ─────────────────────────────────────── */
  --dur-instant: 80ms;    /* state flips — campaign state crossfade, tab indicator */
  --dur-fast:    150ms;   /* press/hover feedback, toast show/hide */
  --dur-mid:     250ms;   /* reveals, focus transitions — overridden per vibe */
  --dur-slow:    400ms;   /* hero name, card bloom, error shake */
  --dur-xslow:   600ms;   /* panel open, confetti wind-up */

  /* ── Campaign state colours (frozen) ───────────────────── */
  --color-state-pre:  #fbbf24;  /* amber — pre-release chip */
  --color-state-live: #ef4444;  /* red — live chip, error borders */
  --color-state-gig:  #8b1e1e;  /* deep red — gig ONLY, nowhere else */
  --color-state-prof: #06b6d4;  /* cyan — profile state (not shown as chip) */

  /* ── Ambient colour (JS-set via canvas extraction) ─────── */
  --color-ambient: 0, 0, 0;   /* RGB triplet. Default = black. Updated on artwork load. */

  /* ── Accent defaults (overridden by applyDerivedTokens()) ── */
  --color-accent:        #e07b3a;
  --color-accent-rgb:    224, 123, 58;    /* use for rgba() composition */
  --color-accent-glow:   rgba(224, 123, 58, 0.30);
  --color-accent-soft:   rgba(224, 123, 58, 0.10);
  --color-accent-subtle: rgba(224, 123, 58, 0.12);
  --color-on-accent:     #ffffff;   /* text on accent background — auto-calculated from luminance */

  /* ── Layout ─────────────────────────────────────────────── */
  --tab-bar-height: 64px;
  --bg-blur:        40px;
  --bg-brightness:  0.45;
}
```

### 1.2 Theme tokens — Surface 1

Applied to `#app-shell` via `data-theme="dark|light|glass|contrast"`.

#### Dark (default)
```css
[data-theme="dark"] {
  --color-bg:          #0a0b10;     /* page background */
  --color-surface:     #0f1018;     /* one step raised — nav, sidebars */
  --color-card:        #16161e;     /* card background */
  --color-card-raised: #1e1e2a;     /* hover state, raised cards */
  --color-border:      rgba(255, 255, 255, 0.065);  /* warm white, very low opacity */
  --color-text:        #f0ede8;     /* warm cream — not harsh white */
  --color-text-2:      rgba(240, 237, 232, 0.60);   /* secondary text */
  --color-text-3:      rgba(218, 213, 207, 0.45);   /* muted text, placeholders */
  --color-overlay:     rgba(10, 11, 16, 0.82);      /* backdrop behind sheets */
  --shadow-card:       0 4px 28px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255, 255, 255, 0.04);
  --color-panel:       #1a1a24;     /* solid dark — edit drawers, always opaque */
  --color-panel-raised:#22222e;
  --color-panel-text:  #f0ede8;
}
```

#### Light
```css
[data-theme="light"] {
  --color-bg:          #f5f2ec;    /* warm cream — not clinical white */
  --color-surface:     #ede9e2;
  --color-card:        #ffffff;
  --color-card-raised: #f8f5f2;
  --color-border:      rgba(0, 0, 0, 0.08);
  --color-text:        #0d0e1a;
  --color-text-2:      rgba(13, 14, 26, 0.60);
  --color-text-3:      rgba(13, 14, 26, 0.38);
  --color-overlay:     rgba(245, 242, 236, 0.90);
  --shadow-card:       0 2px 16px rgba(0, 0, 0, 0.07);
  --color-panel:       #ffffff;
  --color-panel-raised:#f8f5f2;
  --color-panel-text:  #0d0e1a;
  --color-on-accent:   #0d0e1a;   /* OVERRIDE — dark text on accent in light theme */
}
```

#### Glass
```css
[data-theme="glass"] {
  --color-bg:          transparent;   /* requires #profile-bg behind the shell */
  --color-surface:     rgba(255, 255, 255, 0.06);
  --color-card:        rgba(255, 255, 255, 0.08);
  --color-card-raised: rgba(255, 255, 255, 0.12);
  --color-border:      rgba(255, 255, 255, 0.14);
  --color-text:        #f0ede8;
  --color-text-2:      rgba(240, 237, 232, 0.75);
  --color-text-3:      rgba(240, 237, 232, 0.55);
  --backdrop:          blur(28px) saturate(180%);   /* applied to .card elements */
  --color-panel:       #1a1a24;    /* solid — edit drawers must be readable */
  --color-panel-raised:#22222e;
  --color-panel-text:  #f0ede8;
}
```

**Glass theme law:**
- There must be a real background behind glass surfaces — artist hero artwork at `blur(40px) brightness(0.45) scale(1.1)`, `position: fixed; inset: 0; z-index: -1`.
- Glass on a plain background colour is meaningless and is forbidden.
- If `profile.artworkUrl` is not set, JS falls back to `dark` theme silently.
- `backdrop-filter` does not propagate into iframes. Spotify/YouTube embed wrappers need explicit `backdrop-filter: var(--backdrop)` applied to their container `<div>`.

#### Contrast
```css
[data-theme="contrast"] {
  --color-bg:          #000000;
  --color-surface:     #0a0a0a;
  --color-card:        #111111;
  --color-card-raised: #1a1a1a;
  --color-border:      rgba(255, 255, 255, 0.2);
  --color-text:        #ffffff;
  --color-text-2:      rgba(255, 255, 255, 0.85);
  --color-text-3:      rgba(255, 255, 255, 0.65);
  --shadow-card:       0 2px 16px rgba(0, 0, 0, 0.8);
  --color-panel:       #111111;
  --color-panel-raised:#1a1a1a;
  --color-panel-text:  #ffffff;
}
```

**Contrast theme behaviour:** All decorative animation durations collapse to near-zero. State-change transitions (80ms) remain. This is separate from `prefers-reduced-motion` — it applies when the user has explicitly chosen the contrast theme.

### 1.3 Static tokens — Surface 2 (admin.html `:root`)

These are the current admin tokens. They use a different naming convention and should not be cross-referenced with Surface 1 tokens.

```css
:root {
  /* admin.html flat tokens */
  --bg:       #0f1624;          /* page background (near-black, cool navy) */
  --bg-mid:   #141d2e;          /* one step raised */
  --card:     rgba(138,180,206,.06);   /* card background */
  --card-hv:  rgba(138,180,206,.10);  /* card hover */
  --border:   rgba(138,180,206,.10);
  --bm:       rgba(138,180,206,.18);  /* strong border (active states) */
  --text:     #ccddef;
  --t2:       rgba(204,221,239,.58);
  --t3:       rgba(204,221,239,.52);
  --acc:      #c9a84c;          /* amber accent — NOT the same as profile accent */
  --acc-rgb:  201,168,76;
  --font:     'Plus Jakarta Sans', sans-serif;
  --font-d:   'Barlow Condensed', sans-serif;
  --spring:   cubic-bezier(0.34,1.56,0.64,1);
  --ease:     cubic-bezier(0.25,0.46,0.45,0.94);
  --sidebar:  220px;
  --topbar:   56px;

  /* Admin light theme (main content area) */
  --dash-bg:     #e8e4dd;
  --dash-card:   #ffffff;
  --dash-border: #d4cfc8;
  --dash-shell:  #1a1a2e;    /* sidebar/topbar background */
  --dash-field:  #f5f2ee;    /* form field backgrounds */
  --dash-amber:  #f4b942;    /* topbar CTA colour */
  --dash-green:  #1e9650;
  --dash-red:    #c04030;
  --dash-text:   #1a1a2e;
  --dash-t2:     #555555;
  --dash-t3:     #888888;

  /* Source badge colours */
  --source-ig:     #e1306c;
  --source-sp:     #1ed760;
  --source-tt:     #888888;
  --source-direct: #999999;
}
```

**Note on `--acc` vs `--dash-amber`:** Admin uses `--acc` (#c9a84c, muted pale gold) in the sidebar dark context, and `--dash-amber` (#f4b942, brighter amber) for the topbar CTA. These are intentionally different — the sidebar needs a lower-saturation gold that reads well on dark; the topbar CTA needs maximum contrast on white.

---

## 2. Accent Token Derivation

The artist accent colour is a single hex value in `profile.accent`. All derived tokens are set by JavaScript on profile load and on every accent change in the wizard.

```javascript
function applyDerivedTokens(root, accentHex, rMult) {
  const [r, g, b] = hexToRgb(accentHex);

  // Accent colour set
  root.style.setProperty('--color-accent',        accentHex);
  root.style.setProperty('--color-accent-rgb',    `${r},${g},${b}`);
  root.style.setProperty('--color-accent-glow',   `rgba(${r},${g},${b},0.35)`);
  root.style.setProperty('--color-accent-soft',   `rgba(${r},${g},${b},0.10)`);
  root.style.setProperty('--color-accent-subtle', `rgba(${r},${g},${b},0.12)`);

  // on-accent text colour — calculated from luminance
  const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
  root.style.setProperty('--color-on-accent', luminance > 0.5 ? '#000000' : '#ffffff');

  // Border radii — computed from vibe r-mult (CSS calc with custom properties is unreliable for radius)
  root.style.setProperty('--r-sm', `${Math.round(4  * rMult)}px`);
  root.style.setProperty('--r-md', `${Math.round(8  * rMult)}px`);
  root.style.setProperty('--r-lg', `${Math.round(16 * rMult)}px`);
  root.style.setProperty('--r-xl', `${Math.round(24 * rMult)}px`);
}
```

**What changes with a single `profile.accent` edit:**
- Primary CTA background
- Primary CTA glow
- Section header accent border-top
- Fan capture input focus ring
- Focus indicator on all interactive elements
- State chip backgrounds (where accent-derived)
- Hero ambient glow
- Quick Action pill accent state
- `overscroll-behavior` accent tint on html element

---

## 3. Typography Scale

### 3.1 Surface 1 — Profile (DM Sans body, vibe display font)

All type in `able-v7.html`. `var(--font-d)` is set by vibe.

| Role | Font | Size | Weight | Transform | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|
| Artist name (hero) | `var(--font-d)` | `--text-hero` clamp(48–80px) | `--font-d-weight` | `--font-d-transform` | `--ls-d` | `--lh-tight` 0.88 |
| Section title | `var(--font-d)` | clamp(32px, 9vw, 40px) | `--font-d-weight` | `--font-d-transform` | `--ls-d` | 0.95 |
| Show day number | `var(--font-d)` | `--text-3xl` 32px | `--font-d-weight` | `--font-d-transform` | `--ls-d` | 1 |
| Fan capture heading | `var(--font-d)` | `--text-3xl` 32px | `--font-d-weight` | `--font-d-style` | `--ls-d` | 0.95 |
| Body / base | DM Sans | `--text-base` 15px | 400 | none | — | `--lh-body` 1.5 |
| Primary CTA | DM Sans | `--text-sm` 13px | 700 | uppercase | 0.08em | — |
| Secondary CTA | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.08em | — |
| Release card title | DM Sans | `--text-lg` 17px | 700 | none | — | 1.2 |
| Fan capture input | DM Sans | **16px (hard minimum)** | 400 | none | — | — |
| Platform pill label | DM Sans | `--text-sm` 13px | 500 | none | 0.01em | — |
| Hero meta tags | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.16em | `--lh-label` 1.2 |
| State chip | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.08em | — |
| Section action link | DM Sans | `--text-xs` 11px | 600 | uppercase | 0.08em | — |
| Show venue | DM Sans | `--text-base` 15px | 700 | none | — | — |
| Show city | DM Sans | `--text-sm` 13px | 400 | none | 0.01em | — |
| Show month | DM Sans | 10px | 700 | uppercase | 0.14em | — |
| Tab bar labels | DM Sans | `--text-xs` 11px | 500 | uppercase | 0.04em | — |
| Snap card text | DM Sans | `--text-sm` 13px | 400 | none | — | `--lh-body` 1.5 |
| Merch item title | DM Sans | `--text-sm` 13px | 600 | none | — | — |
| Support pack label | DM Sans | `--text-base` 15px | 600 | none | — | — |
| Bio text | DM Sans | `--text-base` 15px | 400 | none | — | 1.65 |

**Input minimum font-size:** 16px is a hard minimum on `<input>` elements. iOS Safari zooms the viewport on inputs with `font-size < 16px`. Never reduce this.

### 3.2 Display font — vibe table

| Vibe | `--font-d` | Weight | Style | Transform | `--ls-d` | `--ls-label` |
|---|---|---|---|---|---|---|
| `electronic` | Barlow Condensed | 700 | normal | uppercase | 0.06em | 0.22em |
| `hiphop` | Oswald | 700 | normal | uppercase | 0.04em | 0.28em |
| `rnb` | Cormorant Garamond | 600 | italic | none | 0.02em | 0.12em |
| `indie` | Space Grotesk | 700 | normal | none | -0.01em | 0.08em |
| `pop` | Barlow Condensed | 700 | normal | none | 0.03em | 0.16em |
| `rock` | Oswald | 700 | normal | uppercase | 0.08em | 0.2em |
| `acoustic` | Lora | 700 | normal | none | 0.01em | 0.10em |

**Font loading rule:** Load DM Sans and Barlow Condensed eagerly (they serve electronic and pop vibes). Load all other display fonts on demand after `applyIdentity()` resolves the vibe. Never preload all 7 display fonts — unnecessary ~200ms load for non-electronic/pop vibes.

### 3.3 Surface 2 — Admin (Plus Jakarta Sans body)

Admin uses Plus Jakarta Sans throughout. No formal `--text-*` token scale is currently applied. Target values:

| Role | Font | Size | Weight |
|---|---|---|---|
| Stat value | Barlow Condensed | 28px | 700 |
| Page title | Plus Jakarta Sans | 16px | 600 |
| Section label | Plus Jakarta Sans | 9.5px | 700 / uppercase / 0.2em tracking |
| Nav item | Plus Jakarta Sans | 13px | 500 |
| Stat label | Plus Jakarta Sans | 10px | 700 / uppercase / 0.18em tracking |
| Body / tables | Plus Jakarta Sans | 13px | 400 |
| Small / meta | Plus Jakarta Sans | 11px | 400 |

---

## 4. Spacing System

4px base grid. Use tokens, never magic numbers.

| Token | Value | Use |
|---|---|---|
| `--sp-1` | 4px | Icon gaps, tight padding within components |
| `--sp-2` | 8px | Internal component padding, gap between pills |
| `--sp-3` | 12px | Card internal padding (small), button vertical padding |
| `--sp-4` | 16px | Standard component padding, horizontal page margin |
| `--sp-5` | 20px | Generous component padding, section-top padding |
| `--sp-6` | 24px | Section gap, card padding |
| `--sp-8` | 32px | Between sections |
| `--sp-10` | 40px | Large section gaps, hero padding |
| `--sp-12` | 48px | Major section spacing |
| `--sp-16` | 64px | Page-level top/bottom margins |

**Missing step:** 28px (between `--sp-6` and `--sp-8`) appears ad-hoc in places. Add `--sp-7: 28px` to avoid hardcoded values.

---

## 5. Component Patterns

### 5.1 Primary Button (`.btn-primary`)

Surface 1. Full-width in mobile context.

```html
<a class="btn-primary pressable" href="https://..." role="button">Listen on Spotify</a>
<!-- or form submit -->
<button class="btn-primary pressable" type="submit">I'm in</button>
```

```css
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;        /* tap target — never reduce */
  padding: 0 var(--sp-6);
  background-color: var(--color-accent);
  color: var(--color-on-accent);
  border: none;
  border-radius: var(--r-sm);   /* NOT --r-pill — small radius signals premium */
  font-family: var(--font-body);
  font-size: var(--text-sm);    /* 13px */
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  transition: transform var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
}

/* Glow — always present, dims at rest */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--r-sm);
  box-shadow: 0 8px 40px var(--color-accent-glow);
  opacity: 0.45;
  transition: opacity var(--dur-fast) var(--ease-standard);
  pointer-events: none;
}
.btn-primary:hover::after { opacity: 1; }

/* Press state — applied via JS on pointerdown */
.btn-primary.pressing {
  background: color-mix(in srgb, var(--color-accent) 80%, white 20%);
  transform: scale(0.97);
}
.btn-primary.pressing::after { opacity: 1; }

/* Focus — WCAG AA */
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### 5.2 Ghost / Secondary Button (`.btn-secondary`)

Surface 1.

```html
<a class="btn-secondary pressable" href="https://...">Pre-save</a>
```

```css
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;
  padding: 0 var(--sp-6);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.28);   /* dark theme default */
  border-radius: var(--r-sm);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-2);
  text-decoration: none;
  cursor: pointer;
  touch-action: manipulation;
  transition: border-color var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
}
.btn-secondary:hover {
  border-color: rgba(var(--color-accent-rgb), 0.5);
  color: var(--color-text);
}
.btn-secondary.pressing { transform: scale(0.97); }
.btn-secondary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Theme overrides */
[data-theme="light"]    .btn-secondary { border-color: rgba(0,0,0,0.20); }
[data-theme="contrast"] .btn-secondary { border-color: rgba(255,255,255,0.2); }
[data-theme="glass"]    .btn-secondary { border-color: rgba(255,255,255,0.15); backdrop-filter: blur(8px); }
```

### 5.3 Card (`.card`)

Surface 1. Base card component used by release cards, event cards, snap cards, merch cards.

```html
<div class="card">
  <!-- content -->
</div>
```

```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  position: relative;
}

/* Glass theme — apply backdrop-filter to every card */
[data-theme="glass"] .card {
  background: var(--color-card);   /* rgba(255,255,255,0.08) */
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
}
```

### 5.4 Bottom Sheet

Two implementations. Match the surface — do not cross-use.

#### Surface 1 (able-v7.html)

```html
<div id="bsBackdrop" class="bs-backdrop" hidden aria-hidden="true"></div>
<div id="bottomSheet" class="bottom-sheet" role="dialog"
     aria-modal="true" aria-labelledby="bsTitle" hidden>
  <div class="bs-handle" aria-hidden="true"></div>
  <div class="bs-header">
    <span class="bs-icon" id="bsIcon" aria-hidden="true"></span>
    <h2 class="bs-title" id="bsTitle"></h2>
    <button class="bs-close pressable" id="bsClose" aria-label="Close">✕</button>
  </div>
  <div class="bs-body" id="bsBody"></div>
  <div class="bs-footer">
    <button class="bs-cancel pressable" id="bsCancel">Cancel</button>
    <button class="bs-save btn-primary pressable" id="bsSave">Save</button>
  </div>
</div>
```

JS: `openSheet(icon, title, bodyHTML, onSave)` / `closeSheet()`

#### Surface 2 (admin.html)

```html
<div id="adminSheetBackdrop" hidden></div>
<div id="adminSheet" class="admin-sheet" hidden>
  <div class="sheet-handle"></div>
  <div class="sheet-header">
    <span id="adminSheetIcon"></span>
    <span id="adminSheetTitle"></span>
    <button onclick="closeAdminSheet()">✕</button>
  </div>
  <div id="adminSheetBody" class="sheet-body"></div>
</div>
```

JS: `openAdminSheet(icon, title, bodyHTML)` / `closeAdminSheet()`

#### Animation (both surfaces)
- Entry: `translateY(100%) → translateY(0)`, `var(--ease-spring)`, 350ms
- Exit: `translateY(0) → translateY(100%)`, `var(--ease-accel)`, 250ms (always faster than entry)
- Backdrop: `opacity: 0 → 0.55`, `var(--ease-standard)`, 250ms

#### Accessibility (Surface 1 requirement)
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Escape key closes: `document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet() })`
- Android back gesture: `history.pushState({panel: 'sheet'}, '')` on open; `popstate` handler closes
- Swipe-to-dismiss: deltaY > 60px on touch triggers close
- Return focus to trigger element on close

### 5.5 Pill / State Chip

```html
<!-- Campaign state chip — hero zone -->
<span class="state-chip state-chip--live" aria-label="Out now">Out now</span>
<span class="state-chip state-chip--pre"  aria-label="Pre-release">Pre-release</span>
<span class="state-chip state-chip--gig"  aria-label="On tonight">On tonight</span>

<!-- Quick Action pill — horizontal scroll row -->
<a class="qa-pill pressable" href="https://...">
  <span class="qa-pill__icon" aria-hidden="true">🎵</span>
  <span class="qa-pill__label">Spotify</span>
</a>
```

```css
/* State chip base */
.state-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: var(--lh-label);
}

/* State variants */
.state-chip--pre  { background: var(--color-state-pre);  color: #000; }
.state-chip--live { background: var(--color-state-live); color: #fff; }
.state-chip--gig  { background: var(--color-state-gig);  color: #fff; position: relative; }

/* Gig chip glow pulse — opacity on ::after only, never animate box-shadow directly */
.state-chip--gig::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--r-pill);
  box-shadow: 0 0 16px rgba(139, 30, 30, 0.6);
  opacity: 0;
  animation: badge-glow-pulse 2s ease-in-out infinite;
  pointer-events: none;
}
@keyframes badge-glow-pulse {
  0%, 100% { opacity: 0; }
  50%       { opacity: 1; }
}

/* Quick Action pill — tier 1 (quiet) */
.qa-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 8px 16px;
  min-height: var(--tap-min);
  border-radius: var(--r-pill);
  background: rgba(255, 252, 240, 0.05);
  border: 1px solid rgba(255, 252, 240, 0.08);
  color: rgba(228, 223, 210, 0.60);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  touch-action: manipulation;
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard);
}
.qa-pill:hover, .qa-pill.active {
  background: rgba(var(--color-accent-rgb), 0.10);
  border-color: rgba(var(--color-accent-rgb), 0.22);
  color: var(--color-accent);
}
```

### 5.6 Toast Notification

Surface 2 (admin.html) only.

```html
<div id="adminToast" class="admin-toast" role="status" aria-live="polite" aria-atomic="true"></div>
```

JS: `showToast(msg)` — shows for 2200ms, auto-dismisses.

Copy rules: "Saved." / "Copied." / "Show added." / "Show removed." — maximum 4 words, past tense, period. Never: "Successfully saved!", "Done!", exclamation marks.

### 5.7 Input Field

Surface 1 (fan capture). Applied rules:

```html
<input
  class="fan-capture__input"
  type="email"
  autocomplete="email"
  inputmode="email"
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  placeholder="your@email.com"
  aria-label="Email address"
>
```

```css
.fan-capture__input {
  width: 100%;
  min-height: var(--tap-min);
  padding: var(--sp-3) var(--sp-4);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  font-family: var(--font-body);
  font-size: 16px;      /* hard minimum — iOS Safari zooms below this */
  color: var(--color-text);
  caret-color: var(--color-accent);
  transition: border-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.fan-capture__input::placeholder {
  color: var(--color-text-3);
}
.fan-capture__input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

/* Error state */
.fan-capture__input.error {
  border-color: var(--color-state-live);
}
/* Error shake animation */
@keyframes error-shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-8px); }
  30%  { transform: translateX(8px); }
  50%  { transform: translateX(-5px); }
  65%  { transform: translateX(5px); }
  80%  { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}
.fan-capture__input.shaking {
  animation: error-shake var(--dur-slow) var(--ease-standard);
}
```

### 5.8 Avatar / Artwork Frame

Artist artwork — profile surface.

```css
.hero__artwork {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-decel);
}
.hero__artwork.loaded { opacity: 1; }

/* Placeholder — shown before image loads or if no artwork */
.hero__artwork-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-bg) 60%, var(--color-accent) 40%),
    var(--color-bg)
  );
}
```

### 5.9 Progress Bar

Used in admin.html (fan count progress toward tier limit).

```css
.progress-track {
  width: 100%;
  height: 6px;
  background: var(--dash-border);
  border-radius: var(--r-pill);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: var(--r-pill);
  background: var(--dash-amber);
  transition: width var(--dur-mid) var(--ease-decel);
}
.progress-fill.full {
  background: var(--dash-red);
}
```

### 5.10 Section Header

Surface 1. Always `<header>` element containing `<h2>`.

```html
<header class="section-header">
  <h2 class="section-title">Listen</h2>
  <a class="section-action pressable" href="#" aria-label="See all releases">See all →</a>
</header>
```

```css
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: var(--sp-5);
  border-top: 1px solid rgba(var(--color-accent-rgb), 0.38);   /* accent line above title */
  margin-bottom: var(--sp-6);
}
.section-title {
  font-family: var(--font-d);
  font-size: clamp(32px, 9vw, var(--text-4xl));
  font-weight: var(--font-d-weight);
  font-style: var(--font-d-style);
  text-transform: var(--font-d-transform);
  letter-spacing: var(--ls-d);
  line-height: 0.95;
  color: var(--color-text);
}
.section-action {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  min-height: var(--tap-min);
  display: inline-flex;
  align-items: center;
}
```

### 5.11 Divider

```css
.divider {
  width: 100%;
  height: 1px;
  background: var(--color-border);
  margin: var(--sp-6) 0;
}
```

### 5.12 Icon Button

Always include `aria-label`. Minimum 44×44px tap target.

```html
<button class="icon-btn pressable" aria-label="Close">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <!-- SVG path -->
  </svg>
</button>
```

```css
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--tap-min);
  height: var(--tap-min);
  min-width: var(--tap-min);
  background: none;
  border: none;
  border-radius: var(--r-md);
  color: var(--color-text-2);
  cursor: pointer;
  touch-action: manipulation;
  transition: background-color var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard);
}
.icon-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
}
.icon-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

## 6. Motion System

### 6.1 Easing curves

| Name | Curve | Use |
|---|---|---|
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring bounce — reveals, confirms, panel entry |
| `--ease-decel` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Standard smooth deceleration — hero name, card bloom |
| `--ease-accel` | `cubic-bezier(0.55, 0, 1, 0.45)` | Exits — always faster than entries |
| `--ease-standard` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Neutral — backdrops, overlays, focus transitions |

### 6.2 Duration usage

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80ms | Campaign state crossfade, tab indicator jump, state label swap |
| `--dur-fast` | 150ms | Press/hover feedback, toast show/hide, focus ring |
| `--dur-mid` | 250ms | Reveals, focus transitions — overridden per vibe (180–350ms) |
| `--dur-slow` | 400ms | Hero name reveal, card bloom, error shake, image load |
| `--dur-xslow` | 600ms | Panel open, confetti burst |

### 6.3 Vibe motion personality

Each vibe overrides `--dur-mid` and `--ease-spring` to give the page a distinct kinetic feel:

| Vibe | `--dur-mid` | `--ease-spring` | Character |
|---|---|---|---|
| electronic | 180ms | `cubic-bezier(0.34, 1.28, 0.64, 1)` | Tight, mechanical, snaps |
| hiphop | 200ms | `cubic-bezier(0.34, 1.40, 0.64, 1)` | Punchy, confident |
| rnb | 320ms | `cubic-bezier(0.34, 1.52, 0.64, 1)` | Smooth, lingers |
| indie | 260ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Natural, unhurried |
| pop | 220ms | `cubic-bezier(0.34, 1.72, 0.64, 1)` | Bright, bouncy — exaggerated overshoot |
| rock | 190ms | `cubic-bezier(0.34, 1.20, 0.64, 1)` | Aggressive, minimal bounce |
| acoustic | 350ms | `cubic-bezier(0.34, 1.10, 0.64, 1)` | Organic, barely overshoots |

### 6.4 Animation rules (hard)

**Only animate:** `opacity`, `transform`

**Never animate in loops:**
- `box-shadow` — use `opacity` on a `::after` pseudo-element containing the shadow
- `width`, `height` — use `transform: scaleX/scaleY`
- `top`, `left` — use `transform: translate`
- `filter`, `backdrop-filter` — causes full repaint
- `background-color` — exception: short one-time transitions (< 400ms) are acceptable for theme switches

**Performance requirements:**
- 60fps on mid-range Android (Pixel 5a / Samsung Galaxy A42)
- `will-change: transform` only where genuinely needed — overuse degrades performance
- `touch-action: manipulation` on all interactive elements — eliminates 300ms tap delay

### 6.5 Reduced-motion law

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Stop entirely: hero name slide-up, staggered card bloom, skeleton shimmer, confetti, gloss pass, counter animation, countdown digit flip.

Keep but instant (0ms or 80ms): campaign state change, tab indicator, theme switch, error border, panel open/close (opacity only).

Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for Web Animations API and canvas-based animations that CSS cannot override.

---

## 7. Theme System Implementation

### 7.1 How to apply a theme

```javascript
function applyTheme(theme) {
  const shell = document.getElementById('app-shell');
  shell.dataset.theme = theme;   // 'dark' | 'light' | 'glass' | 'contrast'

  // Glass: verify artwork exists, fall back to dark
  if (theme === 'glass' && !profile.artworkUrl) {
    shell.dataset.theme = 'dark';
    return;
  }

  // Glass: show #profile-bg
  if (theme === 'glass') {
    document.getElementById('profile-bg').classList.add('active');
  }

  // Persist
  localStorage.setItem('able_theme', theme);
}
```

### 7.2 What each theme must override

All four themes MUST define these tokens (no fallbacks to default — define explicitly):

```
--color-bg
--color-surface
--color-card
--color-card-raised
--color-border
--color-text
--color-text-2
--color-text-3
--color-overlay
--color-panel
--color-panel-raised
--color-panel-text
```

`--shadow-card` should also be defined per theme. Glass and contrast currently omit it — this is a known gap (see PATH-TO-10.md P1-2).

### 7.3 Glass theme requirements

1. `#profile-bg` element: `position: fixed; inset: 0; z-index: -1; background-image: url(profile.artworkUrl); filter: blur(40px) brightness(0.45); transform: scale(1.1)` — scale prevents blur edge showing at screen edges.
2. `#app-shell` background must be `transparent` in glass theme.
3. Every `.card` needs `backdrop-filter: var(--backdrop); -webkit-backdrop-filter: var(--backdrop)`.
4. Iframe wrappers (Spotify, YouTube) need explicit `backdrop-filter` on their container `<div>` — the property does not propagate into iframes.
5. Edit drawers (`--color-panel: #1a1a24`) are intentionally solid — glass panels behind editable content are unreadable.

---

## 8. Accessibility Baseline

These are release gates, not goals.

### 8.1 Focus rings

```css
/* Surface 1 */
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
*:focus:not(:focus-visible) { outline: none; }

/* Surface 2 (admin) */
*:focus-visible {
  outline: 2px solid var(--acc);
  outline-offset: 2px;
}
*:focus:not(:focus-visible) { outline: none; }
```

The `:focus:not(:focus-visible)` rule suppresses the default browser ring for mouse/touch users while keeping it for keyboard users. This is the WCAG 2.2 AA compliant pattern.

### 8.2 Tap targets

```css
/* Enforce on all interactive elements */
button, a, [role="button"], input, select, textarea {
  min-height: var(--tap-min);  /* 44px */
  touch-action: manipulation;
}
```

**Verify explicitly:** Quick Action pills, accordion toggles, close buttons on sheets, tab bar items, platform pill rows.

### 8.3 Contrast requirements

| Context | Minimum ratio |
|---|---|
| Body text | 4.5:1 (WCAG AA) |
| Large text (18px+ or 14px bold) | 3:1 |
| UI components (borders, icons) | 3:1 |
| State chips | 4.5:1 (text on background) |

Verify across all 4 themes. Contrast theme must pass with the highest ratios.

### 8.4 Semantic HTML requirements

- Section headers: `<h2>` not `<div>` — required for screen reader navigation
- Tab bar items: `role="tab"` or `role="button"` + `aria-selected`
- Bottom sheet: `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Form fields: paired `<label>` or `aria-label`
- Icon-only buttons: `aria-label` always
- State changes: `aria-live="polite"` on containers that update dynamically
- Skip navigation: `<a href="#main-content" class="skip-to-main">Skip to content</a>` — visually hidden until focused

### 8.5 Skip to main link

```html
<a href="#main-content" class="skip-to-main">Skip to content</a>
```

```css
.skip-to-main {
  position: absolute;
  top: -100%;
  left: 0;
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-weight: 700;
  z-index: 99999;
  text-decoration: none;
}
.skip-to-main:focus { top: 0; }
```

---

## 9. Surface Comparison — Quick Reference

| Property | Surface 1 (profile) | Surface 2 (admin) |
|---|---|---|
| Background | `#0a0b10` dark | `#e8e4dd` warm cream (main), `#1a1a2e` (sidebar) |
| Body font | DM Sans | Plus Jakarta Sans |
| Display font | Barlow Condensed (default, vibe-overridden) | Barlow Condensed |
| Accent | Artist-controlled, `--color-accent` | `#f4b942` amber topbar, `#c9a84c` sidebar |
| Token namespace | `--color-*`, `--sp-*`, `--text-*` | `--bg`, `--acc`, `--card`, `--dash-*` |
| Theme system | 4 themes via `data-theme` | Single theme (no theme toggle) |
| Vibe system | 7 vibes via `data-vibe` | N/A |
| Component origin | COMPONENT-LIBRARY.md | Ad-hoc per-file |
| Focus ring colour | `--color-accent` (artist colour) | `--acc` (amber) |


---
# FILE: docs/systems/ux/SPEC.md
---

# ABLE UX Specification — Canonical Reference
**Date: 2026-03-16**
**Status: ACTIVE — read before making any UX decision**
**Authority: V6_BUILD_AUTHORITY.md (all resolved decisions), COPY_AND_DESIGN_PHILOSOPHY.md (voice and register)**

This is what every developer reads before building UX. It is not aspirational. Every requirement here is either implemented, in the build queue, or a known V1 scope decision. Where implementation status matters, it is noted.

---

## Part 1: User Mental Models

Before touching the product, each user type carries a set of expectations. Building against these — rather than against an abstract user requirements document — produces UX that feels inevitable.

### Artist mental model

"This is my page. I put a link to it everywhere. Fans land here. They find out what I'm working on, hear my music, see where I'm playing. If they want to stay in touch, they leave their email. Simple."

What follows from this model:
- The artist thinks of the page as their thing, not ABLE's thing. ABLE should be invisible.
- They expect the page to reflect whatever they are currently doing — not be static.
- They expect to control it in minutes, not hours. Any complexity that adds time without visible payoff will be abandoned.
- They expect to own the output — the fan list, the data, the ability to leave.

### Fan mental model

"I tapped this link because I liked something this artist did. I want to hear more music, maybe find out when they're playing, and if it's worth it, leave my email so they can reach me directly."

What follows from this model:
- The fan has already done the hard work of caring. ABLE must not waste that.
- They are on their phone, probably standing up, probably between other things. Clarity beats completeness.
- They have a low threshold for "this feels like a marketing page" and will bounce if triggered.
- Giving an email is a meaningful act for them. It should feel like giving a number to someone who deserves it, not filling in a form.

### Freelancer mental model

"This is my professional profile. It shows my work, my credits, and how to hire me. I found it because someone I worked with credited me on ABLE."

What follows from this model:
- Discovery is entirely credit-based — the freelancer does not market themselves through ABLE.
- The profile needs to communicate credibility and availability at a glance.
- The booking inquiry is the primary action — it should be obvious and low-friction.
- Note: `freelancer.html` is Phase 2. These principles inform when it is built.

---

## Part 2: Journey Maps

### Artist first session — step by step

**1. Lands on able.fm (or able-v7.html demo link in artist bio)**

The entry point is either the landing page (from word-of-mouth, Instagram ad, another artist's "Made with ABLE" footer) or directly viewing another artist's ABLE page and then navigating to create their own. Both paths arrive at `start.html`.

**2. start.html — Step 1: Identity**

The artist sees a split screen: left is a form, right is a live phone preview.
- They enter their artist name. The hero of the preview phone updates on every keystroke.
- Eyebrow copy: "Who are you?" — direct, not corporate.
- They select their genre/vibe. The preview phone changes its display font, accent colour defaults, and motion personality.
- They write (or paste) their bio. 2–3 sentences is enough. The preview shows how it truncates.
- At no point is there a progress metaphor that makes this feel like bureaucracy.

**3. start.html — Step 2: Look**

- They see 8 accent colour presets + custom hex. They select one. The entire preview phone repaints in <100ms — this is the delight moment.
- They select a theme (Dark/Light/Glass/Contrast). Preview updates.
- A "where this appears" section shows: the primary CTA button filled in their colour, a Quick Action pill outlined in their colour, the fan sign-up button.
- The artist understands what "accent colour" means without reading a tooltip.

**4. start.html — Step 3: Links**

- They add their Spotify URL (or paste any streaming link). The preview shows the platform pill appear.
- They add their primary CTA: the type (Stream / Pre-save / Get tickets / Buy merch) and the URL.
- If they enter a Spotify artist URL, the Spotify import function should auto-populate: artist name, latest release, genre. This is AS-01 and currently requires completing.
- Optional fields for secondary CTA and additional platform links.

**5. Done screen**

- Profile is written to `able_v3_profile` in localStorage.
- Done screen shows: a rendered preview of their profile, a copy-link button, and the instruction "Paste this link in your Instagram bio."
- Copy of the URL to clipboard with 2s "Copied" confirmation.
- A second CTA: "Open admin to manage your page" — this is their path to ongoing management.
- The emotional tone here: "your page is live." Not "setup complete." The payoff is that the page exists and is real.

**6. First view of live profile (able-v7.html)**

- The page renders immediately from localStorage — no network request required.
- The artist sees their name in their display font at hero scale. If the page state is `profile` mode, they see their latest release and primary streaming CTA.
- They scroll through: Quick Action pills, fan sign-up section, Listen section.
- The feeling should be: "this actually looks like something I'd put in my bio."

**7. First visit to admin (admin.html)**

- They navigate from the Done screen or by appending `/admin` to their URL.
- The admin greets: "Good to see you, [Name]."
- Campaign HQ is the first section. It shows current state ("Profile mode"), gives access to release date, gig mode toggle, and a first-run checklist.
- First-run checklist: "Share your page" (copy link), "Add a release," "Activate gig mode." These are the three things that make the product work.
- No overwhelming dashboard. The default view is a single column of Campaign HQ + fan list + basic stats.

**8. First fan sign-up notification**

- In V1: the artist checks their admin fan list and sees a row they don't recognise — an email address, a source (`instagram`, `direct`), a timestamp.
- This is the proof moment. One fan they don't know personally.
- The admin should surface this specifically: a nudge the first time a fan signs up from a new source. "Someone found you from Instagram. First fan from there."
- In V2: push notification or email to the artist.

---

### Fan journey — step by step

**1. Tap link in artist's Instagram bio**

The fan is on their phone. They just saw a reel, or they were already following this artist and are visiting for the first time. They tap the bio link from the Instagram app. They land on `able-v7.html` in an in-app browser or Safari.

Context they carry: they know the artist, they are already interested, they have a short attention span.

**2. Above the fold: the first 5 seconds**

The fan sees:
- The artist's name in the hero, in the correct display font for the vibe. Uppercase for Electronic/Hip-hop/Rock, styled serif italic for R&B, clean weight for Indie.
- The campaign state badge. If it is gig mode: a pulsing deep red "On tonight" chip. If pre-release: a yellow countdown chip. If live: a red "Out now" chip. If profile mode: a cyan chip with the artist's genre/location.
- The hero artwork (if set) — the full-width top card, artwork extraction feeding warmth into the background gradient behind the name.
- The primary CTA: accent-filled, full width, specific. "Listen on Spotify" or "Get tickets" or "Pre-save on Apple Music" — never a generic label.

The fan does not yet see the sign-up form. They see: who this artist is, what state they are in right now, and the one most important action.

**3. Scrolling — fold by fold**

- Below the hero CTAs: Quick Action pills (up to 4 visible). Horizontal scrollable row.
- Below the pills: Fan sign-up section (screenful 3). Artist name, heading contextualised to state ("Stay close." in profile mode, "[Title] drops [date]. Hear it early." in pre-release), email input, CTA button.
- Below fan sign-up: Listen section. Release cards with embedded Spotify/SoundCloud player. The content is playable inline — not a link to another tab.
- Below Listen: Shows section (if shows exist and are upcoming).
- Below Shows: Snap cards (artist updates, scrollable horizontal strip).
- Below Snap cards: Merch section (if configured), Support section (if configured).
- Page bottom: secondary fan sign-up catch, footer ("Made with ABLE" on free tier), "Your list. Export any time."

**4. The sign-up moment**

The fan has now:
- Heard the name, seen the state, understood who this artist is.
- Possibly tapped the primary CTA (gone to Spotify, come back, or listened inline).
- Read the artist bio.
- Hit the sign-up section.

The trigger that makes them sign up is one of:
- There is a real release date. "Hear it early" is a specific, honest value.
- There is a show tonight and they are not going — they want to know next time.
- They are already a fan and signing up is the obvious way to stay close.
- The copy sounds like the artist, not like a marketing form.

The form: email input only. `type="email"`, `autocomplete="email"`, `inputmode="email"`. CTA button at 44px minimum height. Button text is first-person ("I'm in" / "Send it to me" / "Let me know" / "Tell me more") — varies by campaign state.

The consent: a pre-checked checkbox visible below the input (GDPR compliant, explicit consent). Copy: "I agree to receive occasional emails from [Artist Name]. Just them. No third parties." — artist voice, not legal language.

**5. After the sign-up**

Immediate: spinner (optimistic, fires before any server response) → checkmark → confetti burst (40 particles, accent + white) → echo message below the form: "We've got you — [email] is on [Artist Name]'s list."

Within 30 seconds (V1 full build): a confirmation email arrives. Subject: "You're on [Artist Name]'s list." From: "[Artist Name] via ABLE." Body is artist-voice, includes their artwork, includes what to expect, includes a one-click unsubscribe. This email is the bridge between the sign-up moment and the next time the artist reaches out.

V1 limitation: if the Supabase/Netlify email function is not wired, the fan receives no email. This is a soft launch blocker — the confirmation email must be live before public launch.

**After leaving the page:**
- The fan goes back to Instagram, back to their day.
- They will return when the artist sends them something worth returning to.
- V2 brings `fan.html` — a personal dashboard where they can see all artists they follow, upcoming shows in their city, and new releases. V1 does not have this.

---

## Part 3: Interaction Principles

These are the 8 UX laws ABLE follows. They are not aspirational. Every build decision should be checked against them.

**1. One primary action per screen.**
Every page, every section, every modal has one obvious action. If two actions compete visually at the same weight, remove the weaker one or move it below the fold. The fan sign-up section has one field and one button. The hero has one primary CTA and one ghost secondary — the hierarchy is unambiguous.

**2. Max 3 taps to any critical action.**
From any state on any page: fan can sign up in 1 tap (field pre-focused on scroll) → email entry → submit = 2 actions. Artist can activate gig mode from admin home in 2 taps. Artist can access fan list in 1 tap. If any critical action requires 4+ taps, redesign the flow.

**3. Every destructive action has confirmation.**
Deleting a snap card, deactivating gig mode, clearing fan data, exporting and deleting the fan list — all require a two-step confirmation. The confirmation copy is specific: "Delete this snap card? Your fans won't see it." Not "Are you sure?"

**4. Every async action has visible feedback (loading state → success/error).**
Loading state: spinner or skeleton appears before any network call completes. Success state: checkmark + specific confirmation copy. Error state: inline message, not a modal alert. Never let an async action complete silently — success and failure must both be communicated.

**5. Empty states teach, they don't abandon.**
When there is no content in a section (no releases, no shows, no snap cards), the section is either hidden entirely (fan view) or replaced with a teaching empty state (admin view). Teaching empty states show what the section will look like when populated, and offer a direct path to add the first item. "No shows added yet. Add one and it'll appear here." — specific, not "No data."

**6. The fold is precious. Only the most important thing goes above it.**
On able-v7.html: the hero occupies the first screen. The artist's name, the campaign state, and the primary CTA are the only things above the fold. Nothing else. The sign-up form is at screenful 3. The fan must first understand who the artist is before being asked for anything.

**7. Copy is UX. Every label is a design decision.**
The difference between "Subscribe" and "I'm in" is a conversion difference. The difference between "Analytics" and "How it's going" is a trust difference. Every piece of text on the platform — placeholder, label, toast, button, empty state — must be checked against COPY_AND_DESIGN_PHILOSOPHY.md before shipping. Placeholder text is not decoration. It sets tone.

**8. Mobile-first means mobile-only in design, then progressive enhancement.**
Design at 375px. Every layout decision, every tap target, every font size, every interactive affordance is designed for iPhone first. Desktop is then enhanced with more information density and more efficient layouts. Not the reverse. An admin dashboard that works perfectly at 1280px but breaks at 375px is wrong — artists check their stats on their phones.

---

## Part 4: Page-by-Page UX Requirements

### able-v7.html (artist public profile — fan-facing)

**Primary user goal:** Fan wants to hear the music, find out what's happening, and optionally stay close via email.

**Critical above-the-fold requirement:** Artist name (in correct display font for vibe), campaign state badge, hero artwork (or gradient fallback), primary CTA (accent-filled, specific label). Nothing else above the fold on first load. Fan must understand "who is this" before they see any ask.

**Max tap count to primary action:** 1 tap (primary CTA is visible and tappable without scrolling). Fan sign-up is max 3 taps (scroll to screenful 3 → tap email field → type email → tap submit).

**Empty state spec (fan view):**
- No releases: Music section hidden entirely. Page renders: hero, bio, quick action pills, fan sign-up, snap cards (if any), support (if configured).
- No shows: Shows section hidden. No "no shows" placeholder.
- No snap cards: Snap card strip hidden.
- No merch: Merch section hidden.
- Artist with zero content (name + bio only): page renders hero + bio + fan sign-up only. This must look intentional, not broken.

**Loading state spec:**
- Warm visit (localStorage exists): render immediately. No visible loading. LCP from localStorage is <100ms.
- Cold visit (no localStorage, no handle): skeleton screens for hero, CTA zone, fan capture. Skeleton shimmer (unison, no stagger). Skeleton resolves when either localStorage or Supabase data arrives.
- Image loading: accent gradient placeholder at full dimensions, real image fades in over 200ms (blur-up). No blank rectangles.
- Iframe embeds: `loading="lazy"`, render placeholder with artist colour gradient until intersection observer triggers load.

**Error state spec:**
- Fan sign-up bad email: red border + shake animation on submit. Error suppresses on retype. Error message: "Check that email — something looks off." Not "Invalid email format."
- Fan sign-up network failure: optimistic UI fires anyway (confetti, echo). Error is silent to fan. Attempt queued for retry when online. Log failure to console.
- Profile not found (no localStorage, no handle in URL): show a minimal ABLE-branded 404 state with a link to able.fm. Not a blank screen.

---

### admin.html (artist dashboard)

**Primary user goal:** Artist wants to understand what's happening with their page and make changes when something needs updating.

**Critical above-the-fold requirement:** Greeting with artist name, current campaign state (profile/pre-release/live/gig), fan count (number of people on their list), and the first-run checklist (if not dismissed). The artist should be able to answer "is anything wrong?" in 3 seconds on page load.

**Max tap count to primary action:**
- Check fan count: visible on home screen.
- Toggle gig mode: Campaign HQ → gig toggle = 2 taps.
- Set release date: Campaign HQ → date field = 2 taps.
- View fan list: sidebar "Fans" = 1 tap.
- Add a snap card: sidebar "Snap Cards" → "Add" button = 2 taps.

**Empty state spec (admin view):**
- Fan list empty: "No fans yet. When someone signs up, they'll appear here." Below: a prompt with the artist's page URL to share. Specific, not generic.
- Snap cards empty: "Nothing posted yet." with "Post your first update" CTA.
- Shows empty: "No shows listed. Add one and it'll appear on your profile." with "Add a show" CTA.
- Broadcasts empty (free tier): blurred preview of the broadcast compose screen, overlay: "Send an email to your list. [N] people are waiting to hear from you. Artist plan — £9/mo." — specific count, specific price, specific action. Never "Upgrade to unlock."
- Stats all zero (new artist): stat cards show "0" with a specific nudge: "Share your page to start seeing numbers." Not empty skeleton after data has loaded.

**Loading state spec:**
- Stat cards: skeleton shimmer while localStorage/Supabase loads. Skeleton shape must approximate real content (number width, label width).
- Fan list: skeleton rows (3 placeholder rows) while list loads.
- No blocking load for any page section. Everything loads independently.

**Error state spec:**
- Save failure (Supabase): toast "Didn't save — try again?" with a retry button. Human copy, not HTTP status code.
- Gig mode toggle failure: "Gig mode didn't activate — check your connection." Toast persists until dismissed.
- Export failure: "Couldn't generate the file. Try refreshing." Not a silent download that never appears.

---

### start.html (onboarding wizard)

**Primary user goal:** Artist wants to get a page that looks genuinely good in their Instagram bio before they lose interest.

**Critical above-the-fold requirement:** On step 1: artist name field pre-focused, live preview phone visible and updating. The artist should see their name in a hero-scale display font within 10 seconds of landing on the page. This is the proof-of-concept that earns the next step.

**Max tap count to primary action:** First payoff (seeing their name on the preview phone) = 1 field entry, zero taps. Profile live = 3 steps × average 2 inputs per step = 6 inputs, 3 "Next" taps.

**Empty state spec:** Not applicable — onboarding begins empty and fills up.

**Loading state spec:**
- Spotify import: when artist enters a Spotify URL, show an inline spinner next to the field for up to 5 seconds, then either populate the fields or silently continue to manual entry. Never block the wizard on a failed import.
- Preview phone: renders from form state, no network dependency. Always current.

**Error state spec:**
- Required field left empty on "Next": inline error on the specific field. "Add your artist name to continue." Not a modal. Not a generic "Please fill in all required fields."
- Spotify import failure: silent continuation. The wizard does not communicate the failure — it simply stays in manual entry mode. If the artist notices nothing populated, the field has a hint: "Didn't find anything — enter manually below."

---

### landing.html (marketing page)

**Primary user goal:** Artist who doesn't yet have an ABLE page wants to understand what it is, see it in action, and create one.

**Critical above-the-fold requirement:** Hero headline ("When they click, be ready."), sub-copy (what it does in one sentence), primary CTA ("Get your page — it's free"), secondary CTA ("See a live example"). Zero navigation links above the fold. The artist must be able to answer "what is this?" in 5 seconds.

**Max tap count to primary action:** Sign up = 1 tap (primary CTA in hero). See live example = 1 tap (secondary CTA in hero).

**Empty state spec:** Not applicable — landing page is static content.

**Loading state spec:** Page must render above the fold from HTML + inline critical CSS alone. No render-blocking resources. OG image must be deterministic (static generation at Netlify function layer for correct social preview cards).

**Error state spec:** Contact form (if present) follows same pattern as admin saves. The landing page has no forms in the primary hero flow.

---

## Part 5: Fan Sign-Up UX Spec

This section is the single most important UX specification in the product. Fan sign-up is the primary conversion event. Every decision flows from making it frictionless and honest.

### Trigger moment

The fan encounters the sign-up section after:
1. They have seen the artist's name and state (above the fold).
2. They have seen the hero CTAs (Spotify embed, ticket link, pre-save).
3. They have seen the Quick Action pills.

This is screenful 3. At this point the fan has had approximately 30–60 seconds of context. They know who the artist is and whether they are interested. The sign-up is the formalisation of interest that already exists — not a pitch to create interest.

A second sign-up section appears at the bottom of the page above the footer. This serves fans who scrolled through everything before deciding. The copy at the bottom uses a shorter, simpler version: "Want to stay close? Leave your email." — no state-specific elaboration needed.

### Sign-up form requirements

**Fields:** Email only. No name field on first ask (name can be collected progressively in V2 fan dashboard). No phone number. No country. Exactly one field.

**Input attributes (non-negotiable for mobile conversion):**
```html
<input type="email" inputmode="email" autocomplete="email" autocapitalize="off"
       aria-label="Your email address" placeholder="Your email">
```

**Button minimum height:** 44px. Full width of the form container.

**GDPR consent:** A checkbox below the email input. Must be unchecked by default. Label: "I agree to receive occasional emails from [Artist Name]. Just them. No third parties." — first-person artist voice, not legal boilerplate.

**Stored on submit:**
```javascript
{
  email: string,
  ts: ISO string,
  source: 'instagram' | 'tiktok' | 'youtube' | 'direct' | 'qr' | 'email' | 'other',
  consent: true,
  consentMethod: 'explicit_checkbox',
  double_opted_in: false  // updated to true when fan confirms email
}
```

### State-specific copy (copy these exact strings — do not improvise)

**Profile state (no active release):**
- Heading: "Stay close."
- Subtext: "I'll only reach out when something's actually happening."
- Button: "I'm in"

**Pre-release state (release date set, release in future):**
- Heading: "[Release title] drops [date]. Hear it early."
- Subtext: "Leave your email. I'll send it to you before it's anywhere else."
- Button: "Send it to me"

**Live state (within 14 days of release):**
- Heading: "[Release title] is out now."
- Subtext: "If you want the story behind it — what I was thinking, what went wrong, what surprised me — leave your email."
- Button: "Tell me more"

**Gig state (tonight toggle active):**
- Heading: "I'm playing tonight."
- Subtext: "Leave your email and I'll let you know next time I'm coming to you."
- Button: "Let me know"

### Confirmation message (exact copy)

After submit, the echo message below the form reads:
> "We've got you — [email] is on [Artist Name]'s list."

This appears after the checkmark animation. It persists on the page (does not disappear). The email field is replaced by this message — the form does not reset and invite a second submission.

### Email confirmation (V1 full build)

Sent within 30 seconds of sign-up via Netlify function → Resend → artist's ABLE sending domain.

- Subject: "You're on [Artist Name]'s list."
- From display name: "[Artist Name] via ABLE"
- From address: no-reply@mail.ablemusic.co (V1) / [artist-slug]@mail.ablemusic.co (V2)
- Body: artist artwork image at top. One paragraph in artist voice. "I'll be in touch when something's worth sharing." One-click unsubscribe link at the bottom.
- This email is not a double opt-in confirmation — it is a welcome email. Single opt-in is the correct default for ABLE (see research: 2026-03-15-fan-signup-conversion.md). The `double_opted_in` field tracks confirmation if the artist later configures it.

### GDPR compliance checklist

- [ ] Consent checkbox unchecked by default
- [ ] Checkbox label attributes the consent to the specific artist, not ABLE
- [ ] `consent: true` written to fan record only after checkbox is checked and form submitted
- [ ] `consentMethod: 'explicit_checkbox'` written to fan record
- [ ] IP address stored as SHA-256 hash only (never raw IP)
- [ ] Timestamp stored in UTC ISO format
- [ ] One-click unsubscribe in all artist emails
- [ ] Fan can request deletion via email — handled by platform admin PA-03
- [ ] Unconfirmed fans shown with `○` marker in fan list, excluded from broadcasts

---

## Part 6: Campaign State Communication Spec

For each of the four states — what the fan sees, the exact copy, the CTA action, and the tone.

### Profile state (default)

**When:** No release date set, or more than 14 days post-release.
**Fan sees:** Artist name, genre/location chip (cyan `--color-state-prof`), hero artwork or gradient, bio, primary streaming CTA.
**Primary CTA copy:** "Listen on Spotify" / "Stream [Release title]" — streams the most recent release.
**Secondary CTA copy:** "Follow on Instagram" or next most relevant platform link.
**Fan sign-up heading:** "Stay close."
**Tone:** This is who I am and what I've made. Come in.

### Pre-release state

**When:** Release date set, release date is in the future.
**Fan sees:** Artist name, amber/yellow countdown chip (`--color-state-pre`), release artwork, countdown display:
- More than 14 days away: "Dropping [Month Day]" — date only, no granular countdown
- 14 days or fewer: "[N] days to go"
- 24 hours or fewer: "[H]h [M]m to go" — hours and minutes
**Primary CTA copy:** "Pre-save on [Platform]" or "Save for later" if no pre-save link.
**Secondary CTA:** Platform streaming link for previous release (keep fans listening now).
**Fan sign-up heading:** "[Release title] drops [date]. Hear it early."
**Tone:** Something is coming. The anticipation is real. This is the moment to get close.

### Live state

**When:** Release date reached, within 14 days of release.
**Fan sees:** Artist name, red "Out now" chip (`--color-state-live`), release artwork prominently in hero top card.
**Primary CTA copy:** "Stream [Release title]" — sends to preferred streaming platform.
**Secondary CTA:** "Add to library" or secondary platform.
**Fan sign-up heading:** "[Release title] is out now."
**Tone:** This is happening. Peak momentum. The music exists in the world right now.

### Gig state (24hr manual toggle)

**When:** Artist has manually toggled gig mode, within 24-hour window.
**Fan sees:** Artist name, pulsing deep red "On tonight" chip (`--color-state-gig` = `#8b1e1e`). The pulsing dot is a `scale(1)→scale(1.4)` 2s infinite animation — communicates urgency without shouting.
**Top card:** Tonight note (artist-written free text, 2–3 sentences). This is the most important piece of content in gig mode.
**Primary CTA:** "Get tickets" — links directly to ticket URL. One tap, no intermediary page.
**Below CTA:** Venue, doors time, city. These are load-bearing for the fan who already has a ticket.
**Fan sign-up heading:** "I'm playing tonight."
**Tone:** The urgency is real. The room is small. Tonight matters. Come if you can — and if you can't, stay for next time.

---

## Part 7: Error State Copy Reference

All error states in ABLE must use this register: human, specific, not apologetic, gives next action.

| Context | Wrong copy | Right copy |
|---|---|---|
| Email field — invalid format | "Invalid email address" | "Check that email — something looks off." |
| Fan sign-up network error | "Error: failed to save" | (Silent — optimistic UI fires regardless) |
| Admin save failure | "Error 422" | "Didn't save — try again?" |
| Gig mode toggle failure | "Error activating gig mode" | "Gig mode didn't activate — check your connection." |
| Export failure | "Download failed" | "Couldn't generate the file. Try refreshing." |
| Spotify import failure | "Import failed" | (Silent — continue to manual entry) |
| Profile not found | "404 Not Found" | "This page doesn't exist — but yours could." (with link to sign up) |
| Empty Discover on fan.html | "No artists to show" | "Your following list is empty. Find artists from their pages, or look through Discover." |

---

*Last updated: 2026-03-16*
*Cross-reference: `docs/systems/ux/ANALYSIS.md`, `docs/systems/ux/PATH-TO-10.md`, `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`, `docs/USER-STORIES.md`*


---
# FILE: docs/systems/tier-gates/SPEC.md
---

# Tier Gate System — Canonical Spec
**Date: 2026-03-15**
**Status: Authoritative — build directly from this**
**Applies to: admin.html, able-v7.html, start.html**

---

## 2.0 Tier reference

| Tier | Price | localStorage value |
|---|---|---|
| Free | £0 | `"free"` |
| Artist | £9/mo | `"artist"` |
| Artist Pro | £19/mo | `"artist-pro"` |
| Label | £49/mo | `"label"` |

**Storage key:** `able_tier` — string, one of the four values above. Default: `"free"`.

```javascript
function getCurrentTier() {
  return localStorage.getItem('able_tier') || 'free';
}

function tierAtLeast(required) {
  const order = { free: 0, artist: 1, 'artist-pro': 2, label: 3 };
  return order[getCurrentTier()] >= order[required];
}
```

---

## 2.1 Gate visual component

The `.tier-gate` wrapper is applied around any gated feature. It is the only pattern used — no bare padlock icons, no redirect banners.

### 2.1.1 HTML structure

```html
<!-- Tier gate wrapper -->
<div class="tier-gate" data-tier="artist-pro" data-feature="email-broadcasts">

  <!-- The actual feature UI — blurred, aria-hidden, non-interactive -->
  <div class="tier-gate-content" aria-hidden="true" tabindex="-1">
    <!-- Real feature markup goes here, or a skeleton approximation -->
  </div>

  <!-- Overlay: always visible, always interactive -->
  <div class="tier-gate-overlay" role="complementary" aria-label="Feature locked">
    <span class="tier-gate-icon" aria-hidden="true">✦</span>
    <p class="tier-gate-headline">[Specific value prop — see §2.2]</p>
    <button
      class="tier-gate-cta"
      onclick="openUpgradeSheet('[feature-id]')"
      aria-label="See plans to unlock [feature name]"
    >
      See Artist Pro plans
    </button>
  </div>

</div>
```

The `data-tier` attribute indicates the *minimum tier required*. The `data-feature` attribute identifies the feature for analytics and for pre-populating the upgrade sheet context.

### 2.1.2 CSS

```css
/* ── Tier gate wrapper ── */
.tier-gate {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

/* ── Blurred preview ── */
.tier-gate-content {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
  opacity: 0.55;
  /* Prevent any interactive element inside from receiving focus */
  visibility: visible;
}

/* ── Overlay ── */
.tier-gate-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: rgba(9, 9, 15, 0.72);          /* --bg at 72% */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.22); /* --acc at 22% */
  text-align: center;
}

/* ── Icon ── */
.tier-gate-icon {
  font-size: 18px;
  color: var(--acc);                          /* #c9a84c amber */
  line-height: 1;
}

/* ── Headline ── */
.tier-gate-headline {
  font-family: var(--font);
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.45;
  max-width: 260px;
  margin: 0;
}

/* ── CTA button ── */
.tier-gate-cta {
  margin-top: 4px;
  padding: 8px 18px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 700;
  color: var(--acc);
  background: rgba(var(--acc-rgb), 0.12);
  border: 1px solid rgba(var(--acc-rgb), 0.30);
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease;
  min-height: 36px;
  white-space: nowrap;
}

.tier-gate-cta:hover {
  background: rgba(var(--acc-rgb), 0.20);
  border-color: rgba(var(--acc-rgb), 0.48);
}

.tier-gate-cta:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--acc), 0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

### 2.1.3 JS gate check (apply on render)

```javascript
function applyGates() {
  document.querySelectorAll('.tier-gate').forEach(gate => {
    const required = gate.dataset.tier;
    if (tierAtLeast(required)) {
      // Artist has access — remove gate, show content
      gate.classList.remove('tier-gate');
      const overlay = gate.querySelector('.tier-gate-overlay');
      const content = gate.querySelector('.tier-gate-content');
      if (overlay) overlay.remove();
      if (content) {
        content.removeAttribute('aria-hidden');
        content.removeAttribute('tabindex');
        content.style.filter = '';
        content.style.opacity = '';
        content.style.pointerEvents = '';
      }
    }
    // else: gate remains as-is, overlay is visible
  });
}
// Call on page load after profile is read
```

---

## 2.2 Gate copy — complete inventory

Every gated feature has one headline and one CTA label. No placeholders.

Format: **[Specific thing they get]. [Tier name].**

### Artist tier gates (requires "artist" — £9/mo)

**Unlimited snap cards**
- Gate context: Artist has 1 snap card and tries to add another
- Headline: "Add as many snap cards as you want. Artist."
- CTA: "See Artist plans"

**Campaign modes (pre-release, live, gig)**
- Gate context: Artist tries to switch to a campaign state in Campaign HQ
- Headline: "Set a release date, run a live window, or go into gig mode. Artist."
- CTA: "See Artist plans"

**Connections (collaborator links)**
- Gate context: Artist tries to add a connection / freelancer credit
- Headline: "Link to the people you've made music with. Artist."
- CTA: "See Artist plans"

**Fan email list above 100**
- Gate context: Fan list has reached 100, artist is on Free
- Headline: "You've reached 100 fans. Your next 1,900 are one step away. Artist."
- CTA: "See Artist plans"

---

### Artist Pro tier gates (requires "artist-pro" — £19/mo)

**Email broadcasts**
- Gate context: "Message fans" section in Fans page
- Headline: "Send a message directly to every fan on your list. Artist Pro."
- CTA: "See Artist Pro plans"

**Full fan CRM (starred, filtered, sorted list)**
- Gate context: Fans page advanced filtering / segmentation
- Headline: "See your most engaged fans, filter by source, and act on it. Artist Pro."
- CTA: "See Artist Pro plans"

**Advanced analytics (click breakdown, source attribution, sparklines over 7 days)**
- Gate context: Analytics section beyond basic view/fan/click counts
- Headline: "See where your fans come from, what they tap, and when they show up. Artist Pro."
- CTA: "See Artist Pro plans"

**Support packs (direct financial support from fans)**
- Gate context: "Add support option" in profile / merch section
- Headline: "Let fans support you directly — on your terms. Artist Pro."
- CTA: "See Artist Pro plans"

**Fan email broadcasts — scheduling**
- Gate context: Artist Pro user tries to schedule a broadcast (schedule is Pro+)
- Headline: "Schedule a message to go out when the moment's right. Artist Pro."
- CTA: "See Artist Pro plans"

**Export fan list as CSV**
- Gate context: Export button on Fans page (Artist tier gets in-app viewing; export is Pro)
- Headline: "Download your full fan list and take it anywhere. Artist Pro."
- CTA: "See Artist Pro plans"

---

### Label tier gates (requires "label" — £49/mo)

**Multiple artist pages (beyond 1)**
- Gate context: Artist tries to add a second page from their account
- Headline: "Manage up to 10 artist pages from one account. Label."
- CTA: "See Label plans"

**Team access**
- Gate context: Artist tries to invite a team member or manager
- Headline: "Give your team access without sharing your login. Label."
- CTA: "See Label plans"

**Aggregate analytics (across multiple pages)**
- Gate context: Label-level analytics view
- Headline: "See how all your artists are performing in one place. Label."
- CTA: "See Label plans"

**API access**
- Gate context: Settings → API section (hidden on lower tiers)
- Headline: "Connect your own tools to your fan data. Label."
- CTA: "See Label plans"

---

## 2.3 Upgrade bottom sheet spec

### 2.3.1 Trigger

```javascript
function openUpgradeSheet(featureId) {
  const sheet = document.getElementById('upgradeSheet');
  // Optionally pre-populate context headline from feature ID
  if (featureId && GATE_COPY[featureId]) {
    document.getElementById('upgradeSheetContext').textContent =
      GATE_COPY[featureId].headline;
  } else {
    document.getElementById('upgradeSheetContext').textContent = '';
  }
  sheet.style.display = 'block';
  requestAnimationFrame(() => sheet.classList.add('open'));
}

function closeUpgradeSheet() {
  const sheet = document.getElementById('upgradeSheet');
  sheet.classList.remove('open');
  setTimeout(() => sheet.style.display = 'none', 320);
}
```

### 2.3.2 Full DOM

```html
<div class="bottom-sheet" id="upgradeSheet" role="dialog" aria-modal="true"
     aria-labelledby="upgradeSheetTitle">

  <div class="bottom-sheet-backdrop" onclick="closeUpgradeSheet()"></div>

  <div class="bottom-sheet-content upgrade-sheet-content">
    <div class="bottom-sheet-handle" aria-hidden="true"></div>

    <!-- Context line (pre-populated with the specific gate headline when opened) -->
    <p class="upgrade-sheet-context" id="upgradeSheetContext"></p>

    <h2 class="upgrade-sheet-title" id="upgradeSheetTitle">Your plan</h2>

    <!-- Tier cards row -->
    <div class="upgrade-tier-row">

      <!-- Free (shown as "current" if on Free) -->
      <div class="upgrade-tier-card" data-tier="free" id="upgradeTierFree">
        <div class="upgrade-tier-name">Free</div>
        <div class="upgrade-tier-price">£0</div>
        <ul class="upgrade-tier-benefits">
          <li>Basic profile</li>
          <li>1 snap card</li>
          <li>100 fans</li>
        </ul>
        <div class="upgrade-tier-current-badge">Current plan</div>
      </div>

      <!-- Artist -->
      <div class="upgrade-tier-card upgrade-tier-card--featured" data-tier="artist"
           id="upgradeTierArtist">
        <div class="upgrade-tier-name">Artist</div>
        <div class="upgrade-tier-price">£9<span>/mo</span></div>
        <ul class="upgrade-tier-benefits">
          <li>Unlimited snap cards</li>
          <li>2,000 fans</li>
          <li>Campaign modes</li>
        </ul>
        <button class="upgrade-tier-cta" onclick="handleTierSelect('artist')">
          Try Artist
        </button>
      </div>

      <!-- Artist Pro -->
      <div class="upgrade-tier-card" data-tier="artist-pro" id="upgradeTierPro">
        <div class="upgrade-tier-name">Artist Pro</div>
        <div class="upgrade-tier-price">£19<span>/mo</span></div>
        <ul class="upgrade-tier-benefits">
          <li>Email broadcasts</li>
          <li>Full fan CRM</li>
          <li>Advanced analytics</li>
        </ul>
        <button class="upgrade-tier-cta" onclick="handleTierSelect('artist-pro')">
          Try Artist Pro
        </button>
      </div>

    </div>

    <!-- Continue free — low-emphasis, honest -->
    <button class="upgrade-sheet-dismiss" onclick="closeUpgradeSheet()">
      Stay on Free for now
    </button>

    <!-- Label upsell — text only, no card at this tier -->
    <p class="upgrade-sheet-label-note">
      Managing multiple artists? <a href="#" onclick="handleTierSelect('label')">Label plans from £49/mo.</a>
    </p>

  </div>
</div>
```

### 2.3.3 CSS

```css
/* ── Upgrade sheet specific ── */
.upgrade-sheet-content {
  max-height: 88vh;
  padding-bottom: calc(24px + env(safe-area-inset-bottom));
}

.upgrade-sheet-context {
  font-size: 13px;
  font-weight: 500;
  color: var(--acc);
  margin: 0 0 8px;
  min-height: 18px;   /* reserve space even when empty */
  text-align: center;
}

.upgrade-sheet-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--dash-text);
  margin: 0 0 20px;
  text-align: center;
}

/* ── Tier row ── */
.upgrade-tier-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;
  /* Hide scrollbar */
  scrollbar-width: none;
}
.upgrade-tier-row::-webkit-scrollbar { display: none; }

/* ── Tier card ── */
.upgrade-tier-card {
  flex: 0 0 auto;
  width: 140px;
  background: var(--dash-field);
  border: 1px solid var(--dash-border);
  border-radius: 12px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upgrade-tier-card--featured {
  border-color: rgba(var(--acc-rgb), 0.45);
  background: rgba(var(--acc-rgb), 0.06);
}

/* Current tier: muted, no CTA */
.upgrade-tier-card[data-current="true"] {
  opacity: 0.6;
}

.upgrade-tier-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dash-t2);
}

.upgrade-tier-card--featured .upgrade-tier-name {
  color: var(--acc);
}

.upgrade-tier-price {
  font-family: var(--font-d);
  font-size: 26px;
  font-weight: 700;
  color: var(--dash-text);
  line-height: 1;
  letter-spacing: 0.02em;
}

.upgrade-tier-price span {
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  color: var(--dash-t2);
}

.upgrade-tier-benefits {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.upgrade-tier-benefits li {
  font-size: 11px;
  font-weight: 500;
  color: var(--dash-t2);
  padding-left: 12px;
  position: relative;
}

.upgrade-tier-benefits li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--dash-t3);
}

.upgrade-tier-cta {
  margin-top: auto;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--dash-text);
  background: var(--dash-amber);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font);
  transition: opacity 0.14s;
}

.upgrade-tier-cta:hover { opacity: 0.88; }

.upgrade-tier-current-badge {
  margin-top: auto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dash-t3);
  text-align: center;
  padding: 6px 0;
}

/* ── Dismiss ── */
.upgrade-sheet-dismiss {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--dash-t3);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  text-align: center;
  transition: color 0.14s;
}

.upgrade-sheet-dismiss:hover { color: var(--dash-t2); }

/* ── Label note ── */
.upgrade-sheet-label-note {
  font-size: 11px;
  color: var(--dash-t3);
  text-align: center;
  margin: 4px 0 0;
}

.upgrade-sheet-label-note a {
  color: var(--acc);
  text-decoration: none;
}
```

### 2.3.4 Tier highlighting logic

```javascript
function highlightCurrentTier() {
  const current = getCurrentTier();
  const cards = document.querySelectorAll('.upgrade-tier-card');
  cards.forEach(card => {
    if (card.dataset.tier === current) {
      card.dataset.current = 'true';
      const cta = card.querySelector('.upgrade-tier-cta');
      if (cta) cta.remove();
    } else {
      card.dataset.current = 'false';
    }
  });
}

function handleTierSelect(tier) {
  // Interim (pre-Stripe): open waitlist/notification flow
  // Once Stripe is wired: redirect to checkout session
  closeUpgradeSheet();
  showToast(`We'll let you know when ${tier === 'artist' ? 'Artist' : tier === 'artist-pro' ? 'Artist Pro' : 'Label'} billing is live.`);
  // TODO: POST to waitlist endpoint with { tier, artist_id }
}
```

### 2.3.5 Current tier: shown in sheet heading

When the artist is on Free:
- Context: populated with specific gate headline
- Featured card: Artist

When the artist is on Artist:
- Context: populated with specific gate headline
- Featured card: Artist Pro

When the artist is on Artist Pro and hits a Pro+ gate (Label feature):
- Featured card: Label (add as third card in the row)

---

## 2.4 Limit warning system

### 2.4.1 Fan count warnings

```javascript
const FAN_LIMIT_FREE   = 100;
const FAN_LIMIT_ARTIST = 2000;

function checkFanLimitWarnings() {
  const fans  = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const tier  = getCurrentTier();
  const limit = tier === 'free' ? FAN_LIMIT_FREE
              : tier === 'artist' ? FAN_LIMIT_ARTIST
              : Infinity;

  if (limit === Infinity) return;

  const count   = fans.length;
  const pct     = count / limit;
  const key80   = `fan_warn_80_${limit}`;
  const key95   = `fan_warn_95_${limit}`;

  // 80% warning — amber toast, once per limit level
  if (pct >= 0.80 && pct < 0.95 && !localStorage.getItem(key80)) {
    localStorage.setItem(key80, '1');
    showToast(
      `You've had ${count} fan sign-ups. Your ${tier === 'free' ? 'free' : 'plan'} limit is ${limit}.`,
      { type: 'warning', duration: 6000 }
    );
  }

  // 95% warning — persistent banner in admin, dismissible once
  if (pct >= 0.95 && count < limit && !localStorage.getItem(key95)) {
    localStorage.setItem(key95, '1');
    showLimitBanner(limit - count, limit, tier);
  }
}
```

### 2.4.2 Persistent limit banner

```html
<!-- Injected into admin home page when 95% fan threshold is reached -->
<div class="limit-banner" id="limitBanner" role="alert">
  <span class="limit-banner-text" id="limitBannerText"></span>
  <button class="limit-banner-cta" onclick="openUpgradeSheet('fan-list')">
    See plans
  </button>
  <button class="limit-banner-dismiss" onclick="dismissLimitBanner()"
          aria-label="Dismiss warning">×</button>
</div>
```

```css
.limit-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(var(--acc-rgb), 0.10);
  border: 1px solid rgba(var(--acc-rgb), 0.28);
  border-radius: 10px;
  margin-bottom: 16px;
}

.limit-banner-text {
  flex: 1;
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.limit-banner-cta {
  font-size: 11px;
  font-weight: 700;
  color: var(--acc);
  background: none;
  border: 1px solid rgba(var(--acc-rgb), 0.35);
  border-radius: 100px;
  padding: 4px 10px;
  cursor: pointer;
  font-family: var(--font);
  white-space: nowrap;
}

.limit-banner-dismiss {
  font-size: 16px;
  color: var(--t2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
}
```

```javascript
function showLimitBanner(spotsLeft, limit, tier) {
  const banner = document.getElementById('limitBanner');
  const text   = document.getElementById('limitBannerText');
  if (!banner || !text) return;
  text.textContent = spotsLeft === 1
    ? `1 spot left on your ${tier === 'free' ? 'free' : 'plan'} list.`
    : `${spotsLeft} spots left on your ${tier === 'free' ? 'free' : 'plan'} list.`;
  banner.style.display = 'flex';
}

function dismissLimitBanner() {
  const banner = document.getElementById('limitBanner');
  if (banner) banner.style.display = 'none';
}
```

### 2.4.3 Snap card limit warning

```javascript
const SNAP_LIMIT_FREE = 1;

function checkSnapCardLimit() {
  const tier = getCurrentTier();
  if (tierAtLeast('artist')) return; // No limit
  const snaps = JSON.parse(localStorage.getItem('able_snap_cards') || '[]');
  if (snaps.length >= SNAP_LIMIT_FREE) {
    // Hide "Add snap card" button; show gate instead
    const addBtn = document.getElementById('addSnapCardBtn');
    if (addBtn) addBtn.style.display = 'none';
    const gate = document.getElementById('snapCardGate');
    if (gate) gate.style.display = 'flex';
  }
}
```

---

## 2.5 Limit reached UX — fan sign-up form on able-v7.html

When the artist is on Free and fans.length >= 100:

**Fan-facing experience (able-v7.html):** The sign-up form does not disappear. It converts:

```javascript
// In able-v7.html fan sign-up section:
function checkFanCapOnPublicPage() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const tier = localStorage.getItem('able_tier') || 'free';
  if (tier === 'free' && fans.length >= 100) {
    // Swap sign-up form for a neutral holding message
    // Fans see nothing broken — just a closed list
    document.getElementById('fanSignupForm').style.display = 'none';
    document.getElementById('fanCapMessage').style.display = 'block';
  }
}
```

```html
<!-- Fan-facing cap message — on able-v7.html, shown when Free cap is hit -->
<div class="fan-cap-message" id="fanCapMessage" style="display:none;">
  <p>This list is currently closed.</p>
</div>
```

This is intentionally minimal. Fans don't need to know why. They don't see upgrade prompts — that is the artist's problem, not the fan's.

**Artist-facing experience (admin.html):** Fans page shows a persistent upgrade prompt:

```html
<div class="fan-list-cap-prompt" id="fanListCapPrompt" style="display:none;">
  <p class="fan-cap-prompt-line1">You've reached 100 fans.</p>
  <p class="fan-cap-prompt-line2">That's a real audience. Your next 1,900 are one step away.</p>
  <button class="tier-gate-cta" onclick="openUpgradeSheet('fan-list')">See Artist plans</button>
</div>
```

```css
.fan-list-cap-prompt {
  padding: 20px;
  text-align: center;
  background: rgba(var(--acc-rgb), 0.06);
  border: 1px solid rgba(var(--acc-rgb), 0.18);
  border-radius: 12px;
  margin-bottom: 16px;
}

.fan-cap-prompt-line1 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px;
}

.fan-cap-prompt-line2 {
  font-size: 13px;
  font-weight: 400;
  color: var(--t2);
  margin: 0 0 16px;
}
```

---

## 2.6 Free tier philosophy — UI decisions

Free must feel like a gift, not a crippled product.

**Explicit decisions:**

| Feature | Free behaviour |
|---|---|
| Fan sign-up form on profile | Fully functional up to 100 fans |
| Snap cards | 1 snap card fully functional; "+ Add" button replaced by gate (not hidden) |
| Campaign HQ | Profile state only; pre-release/live/gig show gate in state button |
| Basic stats (views, clicks, fans, click rate) | Fully visible, no blur |
| Sparklines | Visible for first 7 days; after that, gated (Artist Pro for extended history) |
| Fan list | Fully visible and searchable up to 100; export is gated (Artist Pro) |
| Analytics deep-dive | Gated; visible stat totals are Free, breakdowns are Pro |
| Snap card gate | Gate overlay on the "+ Add snap card" slot, not a toast or redirect |
| Campaign state buttons (pre/live/gig) | Visible but wrapped in `.tier-gate` at the button level |

**Copy principle for Free limits:** Never phrase a limit as a failure or as punishment.

- "You've reached 100 fans. That's a real audience." — not "Upgrade to continue"
- "1 snap card on Free." — not "You've run out of snap cards"
- "Campaign modes are available on Artist." — not "This feature is locked"

---

## 2.7 Tier indicator in admin

### Location
- **Desktop:** Artist identity card in sidebar, below artist name — small pill
- **Mobile:** "More" bottom sheet header, below artist name — small pill

### HTML

```html
<!-- Sidebar identity card (desktop) -->
<div class="sb-identity">
  <div class="sb-avatar"><!-- initials or artwork --></div>
  <div class="sb-name" id="sbName">Artist name</div>
  <span class="tier-pill" id="tierPill">Free</span>
</div>
```

### CSS

```css
.tier-pill {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--t3);
  background: transparent;
}

/* Active paid tier: amber accent */
.tier-pill[data-tier="artist"],
.tier-pill[data-tier="artist-pro"],
.tier-pill[data-tier="label"] {
  color: var(--acc);
  border-color: rgba(var(--acc-rgb), 0.30);
  background: rgba(var(--acc-rgb), 0.08);
}
```

### JS

```javascript
function applyTierPill() {
  const tier = getCurrentTier();
  const labels = { free: 'Free', artist: 'Artist', 'artist-pro': 'Artist Pro', label: 'Label' };
  document.querySelectorAll('.tier-pill').forEach(pill => {
    pill.textContent = labels[tier] || 'Free';
    pill.dataset.tier = tier;
  });
}
```

---

## 2.8 Gate copy lookup table (for use in JS)

```javascript
const GATE_COPY = {
  'snap-cards': {
    headline: 'Add as many snap cards as you want. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'campaign-modes': {
    headline: 'Set a release date, run a live window, or go into gig mode. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'connections': {
    headline: 'Link to the people you\'ve made music with. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'fan-list': {
    headline: 'You\'ve reached 100 fans. Your next 1,900 are one step away. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'email-broadcasts': {
    headline: 'Send a message directly to every fan on your list. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'fan-crm': {
    headline: 'See your most engaged fans, filter by source, and act on it. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'advanced-analytics': {
    headline: 'See where your fans come from, what they tap, and when they show up. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'support-packs': {
    headline: 'Let fans support you directly — on your terms. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'broadcast-scheduling': {
    headline: 'Schedule a message to go out when the moment\'s right. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'export-fans': {
    headline: 'Download your full fan list and take it anywhere. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'multiple-pages': {
    headline: 'Manage up to 10 artist pages from one account. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'team-access': {
    headline: 'Give your team access without sharing your login. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'aggregate-analytics': {
    headline: 'See how all your artists are performing in one place. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'api-access': {
    headline: 'Connect your own tools to your fan data. Label.',
    cta: 'See Label plans',
    tier: 'label'
  }
};
```

---

## 2.9 localStorage keys for tier gate state

| Key | Value | Purpose |
|---|---|---|
| `able_tier` | `"free"` / `"artist"` / `"artist-pro"` / `"label"` | Current artist tier |
| `fan_warn_80_100` | `"1"` | 80% toast shown for 100-fan limit |
| `fan_warn_95_100` | `"1"` | 95% banner shown for 100-fan limit |
| `fan_warn_80_2000` | `"1"` | 80% toast shown for 2000-fan limit |
| `fan_warn_95_2000` | `"1"` | 95% banner shown for 2000-fan limit |

All keys will map 1:1 to Supabase fields when backend lands. Do not rename them.


---
# FILE: docs/systems/analytics/SPEC.md
---

# ABLE Analytics — Canonical Spec
**Created: 2026-03-15 | Authority: primary**

> This is the single source of truth for all analytics behaviour across able-v7.html, admin.html, and (future) Supabase. Supersedes any ad-hoc event logic in individual page files.

---

## 2.1 Canonical event schemas

### TypeScript interfaces

```typescript
// Canonical source values — matches CROSS_PAGE_JOURNEYS.md SOURCE_VALUES
type AnalyticsSource =
  | 'ig'            // Instagram bio link or story
  | 'tt'            // TikTok bio link or video
  | 'sp'            // Spotify artist page link
  | 'qr'            // Gig mode QR code
  | 'story'         // Instagram or TikTok story (time-limited link)
  | 'direct'        // Direct URL entry, no referrer, no ?src= param
  | 'email'         // Confirmation email link click
  | 'fan-dashboard' // Via fan.html
  | 'twitter'       // Twitter/X referrer (detected from document.referrer)
  | 'footer'        // Via "Made with ABLE ✦" on an artist profile — growth loop
  | 'other';        // Known referrer outside the canonical list

// CTA / click type classification
type ClickType =
  | 'platform'  // Platform pill (Spotify, Apple Music etc.)
  | 'cta'       // Hero or section CTA button
  | 'snap'      // Snap card interaction
  | 'presave'   // Pre-save CTA specifically
  | 'support'   // Support / tip / merch CTA
  | 'share'     // Share action
  | 'event'     // Ticket / show link
  | 'footer';   // "Made with ABLE ✦" tap — growth loop event

interface ViewEvent {
  ts: number;         // Unix millisecond timestamp — Date.now()
  source: AnalyticsSource;
  referrer?: string;  // document.referrer, omitted if empty string
  sessionId: string;  // UUID per browser session — see 2.3
  isArtist?: boolean; // true if able_v3_profile is in localStorage — excluded from display stats
}

interface ClickEvent {
  ts: number;
  source: AnalyticsSource;
  label: string;      // Human-readable CTA label e.g. "Listen on Spotify", "Get tickets"
  type: ClickType;
  url?: string;       // Destination URL — for cross-reference and dedup checks
  sessionId: string;
}

interface FanEvent {
  ts: number;
  source: AnalyticsSource;
  email: string;      // Stored in able_fans; also included here for event-log integrity
  sessionId: string;
}

// Stats output — returned by getStats()
interface StatsResult {
  views: number;
  clicks: number;
  fans: number;
  conversionRate: string;    // e.g. "4.2" — percent, 1dp, as string
  sourceBreakdown: Record<AnalyticsSource, number>;
  clickBreakdown: Record<ClickType, number>;
  topCTA: { label: string; count: number } | null;
}
```

---

## 2.2 Source detection logic

Centralised in a single function. Every page that writes analytics events must call this — no ad-hoc detection.

```javascript
// Canonical SOURCE_VALUES — from CROSS_PAGE_JOURNEYS.md
const SOURCE_VALUES = ['ig', 'tt', 'sp', 'qr', 'story', 'direct', 'email', 'fan-dashboard', 'twitter', 'footer', 'other'];

/**
 * detectSource()
 * Priority order:
 * 1. Explicit ?src= query param (artist controls this — highest trust)
 * 2. document.referrer domain matching (browser-provided — medium trust)
 * 3. 'direct' fallback (no referrer, no param)
 *
 * @returns {string} One of SOURCE_VALUES
 */
function detectSource() {
  // 1. Explicit param — always wins if valid
  const params = new URLSearchParams(window.location.search);
  const src = params.get('src');
  if (src && SOURCE_VALUES.includes(src)) return src;

  // 2. Referrer-based fallback
  const referrer = document.referrer;
  if (!referrer) return 'direct';

  if (referrer.includes('instagram.com') || referrer.includes('l.instagram.com')) return 'ig';
  if (referrer.includes('tiktok.com') || referrer.includes('vm.tiktok.com'))      return 'tt';
  if (referrer.includes('spotify.com'))                                            return 'sp';
  if (referrer.includes('t.co') || referrer.includes('twitter.com') || referrer.includes('x.com')) return 'twitter';
  // Visitor arrived via "Made with ABLE ✦" on another artist's profile page
  if (referrer.includes('ablemusic.co/'))                                          return 'footer';

  // 3. Known but unlisted referrer
  return 'other';
}

// Called once on page load. Cache result in module scope — do not re-run per event.
const _pageSource = detectSource();
```

---

## 2.3 Session deduplication and artist detection

```javascript
/**
 * getOrCreateSessionId()
 * Returns a UUID scoped to the current browser tab session.
 * sessionStorage clears when the tab is closed. Same tab = same session.
 * Prevents refresh inflation: one session = at most one view event.
 */
function getOrCreateSessionId() {
  const key = 'able_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

/**
 * isArtistVisit()
 * If the artist's own profile data exists in localStorage, this visit is
 * almost certainly the artist checking their own page. Tag it and exclude
 * from displayed stats — not deleted, just filtered in aggregation.
 *
 * Note: This is a heuristic, not a guarantee. An artist could visit from
 * a browser where they haven't set up their profile. That's acceptable —
 * occasional artist visits that slip through will not meaningfully distort
 * stats. The goal is to exclude regular daily check-ins, not achieve
 * perfect isolation.
 */
function isArtistVisit() {
  return Boolean(localStorage.getItem('able_v3_profile'));
}

/**
 * recordView()
 * Called once per page load on able-v7.html.
 * Deduplicates within session: if this sessionId already has a view record,
 * skip (prevents refresh inflation).
 */
function recordView() {
  const sessionId = getOrCreateSessionId();
  const source = _pageSource;
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');

  // Dedup: do not record a second view for the same session
  const alreadyRecorded = views.some(v => v.sessionId === sessionId && !v.isArtist);
  if (alreadyRecorded) return;

  const event = {
    ts: Date.now(),
    source,
    sessionId,
    ...(document.referrer ? { referrer: document.referrer } : {}),
    ...(isArtistVisit() ? { isArtist: true } : {}),
  };

  views.push(event);
  rotateEvents('able_views', views, 90); // Keep last 90 days — see 2.5
}

/**
 * recordClick(label, type, url)
 * Called on every CTA tap. No session dedup — multiple clicks in one session
 * are real (fan streams, then buys merch). Rate limited to max 10 clicks/session.
 */
function recordClick(label, type, url) {
  const sessionId = getOrCreateSessionId();
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');

  // Anti-spam: max 10 click events per session
  const sessionClicks = clicks.filter(c => c.sessionId === sessionId);
  if (sessionClicks.length >= 10) return;

  const event = {
    ts: Date.now(),
    source: _pageSource,
    label,
    type,
    sessionId,
    ...(url ? { url } : {}),
  };

  clicks.push(event);
  rotateEvents('able_clicks', clicks, 180); // Keep last 180 days
}

/**
 * recordFan(email)
 * Called on successful fan sign-up. The fan record itself goes into able_fans
 * separately — this function only handles the analytics event side, adding
 * sessionId and source to the fan record being written.
 */
function buildFanEvent(email) {
  return {
    ts: Date.now(),
    source: _pageSource,
    email,
    sessionId: getOrCreateSessionId(),
  };
}
```

---

## 2.4 Aggregation functions

```javascript
/**
 * groupBy(arr, key)
 * Returns { [value]: count } for all items in arr.
 */
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const val = item[key] || 'unknown';
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}

/**
 * topBy(arr, key)
 * Returns the most frequent value of key across arr.
 */
function topBy(arr, key) {
  const counts = groupBy(arr, key);
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ? { label: top[0], count: top[1] } : null;
}

/**
 * getStats(days)
 * Primary aggregation function. Returns StatsResult for the given time window.
 *
 * @param {number|null} days  7, 30, or null (all time)
 * @returns {StatsResult}
 *
 * Usage:
 *   const week  = getStats(7);    // Last 7 days
 *   const month = getStats(30);   // Last 30 days
 *   const all   = getStats(null); // All time
 */
function getStats(days = 7) {
  const since = days ? Date.now() - (days * 24 * 60 * 60 * 1000) : 0;

  // Views: exclude artist's own visits, apply time window
  const views = JSON.parse(localStorage.getItem('able_views') || '[]')
    .filter(v => v.ts > since && !v.isArtist);

  // Clicks: all clicks in window (artist clicks are not excluded — they're testing)
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]')
    .filter(c => c.ts > since);

  // Fans: all fans in window
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]')
    .filter(f => f.ts > since);

  const conversionRate = views.length
    ? (fans.length / views.length * 100).toFixed(1)
    : '0.0';

  return {
    views: views.length,
    clicks: clicks.length,
    fans: fans.length,
    conversionRate,
    sourceBreakdown: groupBy(views, 'source'),
    clickBreakdown: groupBy(clicks, 'type'),
    topCTA: topBy(clicks, 'label'),
  };
}

/**
 * todayCount(events)
 * Count events from today (midnight to now). Used for "+N today" delta.
 */
function todayCount(events) {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return events.filter(e => e.ts >= midnight.getTime()).length;
}

/**
 * getDataDaySpan(events)
 * Returns how many calendar days have at least one event.
 * Used to decide whether to show sparklines (need >= 3 days).
 */
function getDataDaySpan(events) {
  if (!events.length) return 0;
  const days = new Set(
    events.map(e => new Date(e.ts).toISOString().slice(0, 10))
  );
  return days.size;
}

/**
 * countFansAfterTimestamp(ts)
 * Counts new fans acquired after a given Unix ms timestamp.
 * Used in post-gig greeting: "8 fans joined last night."
 */
function countFansAfterTimestamp(ts) {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  return fans.filter(f => f.ts >= ts).length;
}
```

---

## 2.5 localStorage size management and retention policy

```javascript
/**
 * rotateEvents(key, events, maxDays)
 * Prunes events older than maxDays before writing back to localStorage.
 * Always writes the result — this is the only function that writes to
 * able_views and able_clicks.
 *
 * Retention rules:
 *   able_views:  keep last 90 days  (rotate older)
 *   able_clicks: keep last 180 days (rotate older)
 *   able_fans:   NEVER rotate       (fans write directly, not through this function)
 */
function rotateEvents(key, events, maxDays) {
  const cutoff = Date.now() - (maxDays * 24 * 60 * 60 * 1000);
  const pruned = events.filter(e => e.ts > cutoff);
  try {
    localStorage.setItem(key, JSON.stringify(pruned));
  } catch (e) {
    // localStorage full — last-resort: keep only the most recent 500 events
    if (e.name === 'QuotaExceededError') {
      const fallback = events.slice(-500);
      localStorage.setItem(key, JSON.stringify(fallback));
      console.warn('[ABLE analytics] localStorage quota hit — trimmed to 500 events');
      // TODO: Surface warning in admin UI
    }
  }
}

/**
 * checkLocalStorageHealth()
 * Estimates localStorage usage and warns if approaching limit.
 * Called from admin.html on load. Threshold: 4MB of the ~5MB limit.
 *
 * @returns {{ usedBytes: number, warningThreshold: boolean }}
 */
function checkLocalStorageHealth() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    total += (localStorage.getItem(key) || '').length * 2; // UTF-16: 2 bytes per char
  }
  return {
    usedBytes: total,
    warningThreshold: total > 4 * 1024 * 1024, // 4MB
  };
}

/*
 * Supabase sync strategy (when backend lands):
 *
 * On admin.html load (or when artist is online):
 * 1. Read all events older than 7 days from localStorage
 * 2. Batch-insert to Supabase (views, clicks tables)
 * 3. On confirmed insert, delete those events from localStorage
 * 4. Keep last 7 days in localStorage as the "fast cache" for immediate stats display
 *
 * This means:
 * - Admin stats load instantly from localStorage (7-day window)
 * - Historical stats (30-day, all-time) query Supabase
 * - No data loss on browser clear (events are flushed within 7 days)
 */
```

---

## 2.6 Privacy spec

### What ABLE tracks

| Data | Where stored | Who can see it | Retention |
|---|---|---|---|
| Page views (timestamp + source) | Artist's localStorage / Supabase | Artist only | 90 days |
| CTA clicks (label + type + source) | Artist's localStorage / Supabase | Artist only | 180 days |
| Fan email sign-ups (email + timestamp + source) | Artist's localStorage / Supabase | Artist only | Never auto-deleted |
| Session ID (UUID per browser session) | sessionStorage | Not stored anywhere | Cleared on tab close |

### What ABLE does not track

- IP addresses (never stored, not even in Supabase)
- Precise location (no GPS, no IP geolocation)
- Device fingerprinting
- Cross-artist behaviour (one artist cannot see another's fans or analytics)
- Third-party tracking pixels or scripts
- Behaviour on external sites after clicking a link

### Artist data isolation

Each artist's data is isolated at the localStorage level (same-origin, per browser) and will be isolated at the Supabase level via row-level security (RLS) policies. One artist cannot query another's `fans`, `views`, or `clicks` rows.

### Fan rights

- Fans sign up on an artist's page. Their email is in that artist's list.
- ABLE does not contact fans on behalf of artists without explicit artist initiation.
- Data deletion: when GDPR deletion flow is built (P2), fans can email [privacy@ablemusic.co] to request deletion from all artist lists they've joined. This requires Supabase backend.

### Admin UI privacy statement

```
What ABLE tracks — and why

Every time someone visits your page, we record when and where they came from
(Instagram, TikTok, a QR code) so you can see which platforms are actually
bringing people to you.

When someone taps a button on your page, we record which one — so you can see
what your audience responds to.

When a fan signs up, their email goes directly into your list. We don't share it,
sell it, or use it for anything without your say-so.

No third-party tracking. No IP addresses. No cross-site data. Your fans' relationship
is with you — not with us.
```

---

## 2.7 Export spec

### Fan list export (exists in admin DESIGN-SPEC, documented here for completeness)

```javascript
/**
 * exportFansCSV()
 * Generates and downloads a CSV of all fan sign-ups.
 * Columns: email, date_joined, source
 * Triggered by "Export as CSV →" button in admin Fans page.
 */
function exportFansCSV() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  if (!fans.length) return;

  const header = 'email,date_joined,source\n';
  const rows = fans.map(f => {
    const date = new Date(f.ts).toISOString().slice(0, 10);
    const src = f.source || 'unknown';
    return `${f.email},${date},${src}`;
  }).join('\n');

  downloadCSV('able-fans.csv', header + rows);
}
```

### Analytics export (new — not yet built)

```javascript
/**
 * exportAnalyticsCSV()
 * Exports raw analytics events as CSV. Separate from fan export.
 * Columns per file:
 *   Views:  timestamp, source, session_id, is_artist
 *   Clicks: timestamp, source, label, type, url, session_id
 *
 * Downloads two files: able-views.csv, able-clicks.csv
 * Triggered by "Export analytics →" button in admin Analytics section.
 */
function exportAnalyticsCSV() {
  const views  = JSON.parse(localStorage.getItem('able_views')  || '[]');
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');

  if (views.length) {
    const header = 'timestamp,date,source,session_id,is_artist\n';
    const rows = views.map(v => {
      const date = new Date(v.ts).toISOString().slice(0, 10);
      return `${v.ts},${date},${v.source || ''},${v.sessionId || ''},${v.isArtist ? '1' : '0'}`;
    }).join('\n');
    downloadCSV('able-views.csv', header + rows);
  }

  if (clicks.length) {
    const header = 'timestamp,date,source,label,type,url,session_id\n';
    const rows = clicks.map(c => {
      const date = new Date(c.ts).toISOString().slice(0, 10);
      const url  = (c.url || '').replace(/,/g, '%2C'); // escape commas in URLs
      return `${c.ts},${date},${c.source || ''},${c.label || ''},${c.type || ''},${url},${c.sessionId || ''}`;
    }).join('\n');
    downloadCSV('able-clicks.csv', header + rows);
  }
}

/**
 * downloadCSV(filename, content)
 * Shared download helper used by both export functions.
 */
function downloadCSV(filename, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

---

## 2.8 Supabase table schemas

When the backend lands, these are the target tables. All localStorage keys map 1:1.

```sql
-- Artists table (auth-linked)
create table profiles (
  id          uuid primary key references auth.users,
  slug        text unique not null,
  name        text,
  profile_json jsonb,        -- full able_v3_profile blob
  created_at  timestamptz default now()
);

-- Page view events
create table views (
  id         bigserial primary key,
  artist_id  uuid references profiles(id) on delete cascade,
  ts         bigint not null,              -- Unix ms
  source     text,
  referrer   text,
  session_id text,
  is_artist  boolean default false,
  created_at timestamptz default now()
);

-- CTA click events
create table clicks (
  id         bigserial primary key,
  artist_id  uuid references profiles(id) on delete cascade,
  ts         bigint not null,
  source     text,
  label      text,
  type       text,
  url        text,
  session_id text,
  created_at timestamptz default now()
);

-- Fan sign-ups
create table fans (
  id         bigserial primary key,
  artist_id  uuid references profiles(id) on delete cascade,
  email      text not null,
  ts         bigint not null,
  source     text,
  session_id text,
  starred    boolean default false,
  created_at timestamptz default now(),
  unique(artist_id, email)               -- one sign-up per fan per artist
);

-- Row-level security: artist sees only their own data
alter table views  enable row level security;
alter table clicks enable row level security;
alter table fans   enable row level security;

create policy "artist_own_views"  on views  for all using (artist_id = auth.uid());
create policy "artist_own_clicks" on clicks for all using (artist_id = auth.uid());
create policy "artist_own_fans"   on fans   for all using (artist_id = auth.uid());
```

### Supabase realtime subscription (new fan notification in admin)

```javascript
// In admin.html — after Supabase client initialised
const channel = supabase
  .channel('new-fans')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'fans', filter: `artist_id=eq.${artistId}` },
    (payload) => {
      const fan = payload.new;
      showNewFanToast(fan); // "A new fan just joined from Instagram."
      appendFanToList(fan);
      checkAndShowMilestone(getAllFans());
    }
  )
  .subscribe();
```


---
# FILE: docs/systems/email/SPEC.md
---

# ABLE — Email System Specification
**Date: 2026-03-15**
**Status: Canonical spec — pre-implementation**

---

## Principles (read before every email you write)

1. The fan confirmation email is from the artist. ABLE is in the footer, quietly.
2. The artist welcome email is warm, one beat, specific to what they just built.
3. No exclamation marks. No "You're all set." No "Welcome aboard."
4. Subject lines are human. They do not sound like a marketing automation system.
5. Unsubscribe is always present and works. Compliance is non-negotiable.
6. If the email could have been sent by any other platform, rewrite it.

---

## Personalisation tokens

These tokens are available at send time from localStorage data. They map 1:1 to Supabase fields when the backend lands.

| Token | Source | Notes |
|---|---|---|
| `{{artist_name}}` | `able_v3_profile.name` | Required on all emails |
| `{{artist_slug}}` | `able_v3_profile.slug` | URL-safe version of name |
| `{{release_title}}` | `able_v3_profile.releaseTitle` | Optional — may be empty |
| `{{release_date}}` | `able_v3_profile.releaseDate` | ISO date string |
| `{{release_date_formatted}}` | derived | e.g. "March 18" |
| `{{days_until_release}}` | derived at send time | integer |
| `{{venue_name}}` | `able_shows[0].venue` | Gig state only |
| `{{show_date}}` | `able_shows[0].date` | Gig state only |
| `{{fan_name}}` | `able_fans[n].name` | Optional — only if captured in sign-up form |
| `{{fan_email}}` | `able_fans[n].email` | Required for unsubscribe |
| `{{page_url}}` | derived | `ablemusic.co/{{artist_slug}}?ref=email` |
| `{{unsubscribe_url}}` | Resend native | Auto-generated per recipient |
| `{{fan_dashboard_url}}` | static | `ablemusic.co/fan` |

---

## Email 1: Fan Confirmation

### Overview

This email is sent within 60 seconds of a fan signing up from an artist's profile page. It must feel like the artist wrote it. ABLE's name appears only in the footer. The body content changes based on which page state the artist was in when the fan signed up — the state is captured at sign-up time and stored alongside the fan record.

### Trigger

Fan submits email in the sign-up form on able-v7.html. The Netlify function receives: `{ artist_slug, fan_email, fan_name (optional), page_state, release_title (if applicable), release_date (if applicable), venue_name (if gig), source }`.

### From name

`{{artist_name}}`

The email should appear to come from the artist. Not "ABLE" or "ABLE Music" or "[Artist] via ABLE." The artist's name is the from-name. This is the standard for artist-owned fan relationships.

When Supabase auth is live and artists have verified domains: use the artist's own sending domain if configured. Default fallback: `nadia@mail.ablemusic.co` with display name `Nadia`.

### Subject line formula

The subject line should be short, specific, and feel personal — not automated.

**Profile state:** `[Artist name] — you're in the loop`
**Pre-release state:** `[Release title] — [N] days`
**Live state:** `[Release title] is out`
**Gig state:** `Tonight at [Venue name]`

Examples:
- `Nadia — you're in the loop`
- `Echoes — 3 days`
- `Echoes is out`
- `Tonight at The Jazz Café`

Subject line rules:
- No "Re:", no emoji, no brackets except as shown
- Never "Welcome", "Confirmation", "You've subscribed"
- The pre-release subject line is the release title + countdown — immediate, specific
- The live state subject is a statement, not an announcement

### Footer (all states)

```
—

Powered by ABLE · ablemusic.co
[Unsubscribe]
```

The unsubscribe link is Resend-native and fires a webhook that removes the fan from `able_fans` for that artist. No ABLE branding beyond "Powered by ABLE" in small text. No social links in the footer — this is the artist's email, not ABLE's newsletter.

---

### Full email bodies — all 4 states

---

#### STATE 1: Profile (default — artist active, no active campaign)

**Subject:** `Nadia — you're in the loop`
**From:** `Nadia`

---

Hey —

It's Nadia.

You signed up, so I'll keep you in the loop. That means new music when I drop it, shows when I'm playing near you, and anything else I think is worth sharing.

Nothing else, nothing automated. Just me.

[See my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** The phrase "nothing automated" is load-bearing. It is technically a lie once this is sent via Resend, but in spirit it is true: the content of the email is entirely the artist's, the list is the artist's, and no platform is mediating the relationship. The copy is honest about what the fan is signing up for. It doesn't oversell. It doesn't thank them for signing up (that's platform language).

---

#### STATE 2: Pre-release (release date set in the future)

**Subject:** `Echoes — 3 days`
**From:** `Nadia`

---

Hey —

It's Nadia. You signed up right before something.

Echoes comes out in 3 days — March 18th. Pre-save it now if you want it to land in your library the moment it's out.

[Pre-save Echoes →]({{presave_url}})

I'll be in touch when it's live.

[See what's coming →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** "You signed up right before something" — this is the single most important sentence in this variant. It creates a sense of timing, of the fan arriving at the right moment. It is not manufactured urgency — the release date is real. The pre-save CTA is the primary action. The page link is secondary. No padding, no explanation of ABLE.

Note on token: `{{presave_url}}` comes from `able_v3_profile.presaveUrl` if set. If not set, omit the pre-save paragraph and go straight to the page link.

---

#### STATE 3: Live (release date reached, within 14-day live window)

**Subject:** `Echoes is out`
**From:** `Nadia`

---

Hey —

It's Nadia. Echoes is out today.

[Stream it →]({{stream_url}})

I put a lot of time into this one. I hope it lands the way it's meant to.

[Listen on my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** The line "I put a lot of time into this one. I hope it lands the way it's meant to." — this is placeholder artist voice. In the final system, this line should come from the artist's profile — a short "release note" field in admin.html where the artist can write one or two sentences about the record. If they haven't filled it in, the paragraph is omitted. The default body without it:

---

Hey —

It's Nadia. Echoes is out.

[Stream it →]({{stream_url}})

[Listen on my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Note on stream_url:** This is `able_v3_profile.streamUrl` — the primary streaming platform URL. If not set, only the page link is shown.

---

#### STATE 4: Gig (24-hour gig mode active)

**Subject:** `Tonight at The Jazz Café`
**From:** `Nadia`

---

Hey —

It's Nadia. I'm playing tonight.

The Jazz Café, London. Doors at 7:30.

[Tickets →]({{ticket_url}})

See you there.

[My page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** This is the shortest email in the system. That is correct. When an artist is playing tonight, there is one thing the fan needs: the ticket link. Everything else is noise. "See you there" is warm and confident without being saccharine. The fan got an email that says exactly what they needed to know — and nothing else.

Note: `{{ticket_url}}` from `able_shows[0].ticketUrl`. If no ticket URL, replace with: "There may still be tickets at the door." and omit the ticket link button.

---

## Email 2: Artist Welcome

### Overview

Sent within 5 minutes of wizard completion on start.html. The trigger is the wizard Done screen reaching a final state — the artist has a live page. This email confirms the page is live, gives them the direct URL, and has one next step.

### Trigger

start.html Done screen rendered, `able_v3_profile` written to localStorage with `slug` field populated.

### From name

`ABLE`

### Subject line

`Your page is live, [Artist name]`

Example: `Your page is live, Nadia`

No exclamation mark. Statement, not celebration.

### Full email body

**Subject:** `Your page is live, Nadia`
**From:** `ABLE`

---

Good to see you here.

Your page is live at ablemusic.co/nadia.

The next thing: put that URL in your Instagram bio. That's where your fans will start finding you.

When you're ready, your dashboard is where you run everything.

[Open your dashboard →]({{dashboard_url}})

—

ABLE · ablemusic.co

---

**Guidance:** "Good to see you here" echoes the dashboard greeting style ("Good to see you, Nadia.") — ABLE's register is warm, one beat. "The next thing" is a single actionable step, not a checklist. The email is under 60 words. That is the target.

---

## Email 3: Release Reminder Broadcast (artist-initiated)

### Overview

Artist taps "Email your fans" from admin.html after setting release to Live state. This is a one-time broadcast to all fans in `able_fans`. The artist can write a short personal note (optional) or send the default. This is a Phase 1 feature.

### Trigger

Artist-initiated via admin.html CTA. Available only when page state is `live`. Sends once — ABLE prevents a second send within the same 14-day live window.

### From name

`{{artist_name}}`

### Subject line

`{{release_title}} is out`

Example: `Echoes is out`

### Full email body (default — no artist note added)

**Subject:** `Echoes is out`
**From:** `Nadia`

---

Hey —

It's Nadia. Echoes is out today.

[Stream it →]({{stream_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

### Full email body (with artist note — artist writes 1-3 sentences in admin.html)

**Subject:** `Echoes is out`
**From:** `Nadia`

---

Hey —

It's Nadia. Echoes is out.

[ARTIST NOTE APPEARS HERE — verbatim, no editing by ABLE]

[Stream it →]({{stream_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Admin.html copy for the artist note field:**
Label: `Say something (optional)`
Placeholder: `This is what you'd say to them in person.`
Character limit: 280 — enough for two honest sentences, not enough for a marketing paragraph.

---

## Email 4: Gig Reminder Broadcast (artist-initiated)

### Overview

Artist taps "Remind your fans" from admin.html on the day of a show, after activating gig mode. Sends to all fans in `able_fans`. Optional short note.

### Trigger

Artist-initiated from admin.html gig mode panel. Available only when gig mode is active. Sends once per gig mode activation.

### From name

`{{artist_name}}`

### Subject line

`Tonight at {{venue_name}}`

Example: `Tonight at The Jazz Café`

### Full email body

**Subject:** `Tonight at The Jazz Café`
**From:** `Nadia`

---

Hey —

Nadia here. Playing tonight at The Jazz Café, London.

Doors 7:30. A few tickets left.

[Get tickets →]({{ticket_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

---

## Email 5: Magic Link Auth

### Overview

Sent by Supabase when an artist (or fan) requests a login link. ABLE must configure a custom HTML template in Supabase's email settings — the Supabase default is unusable at ABLE's quality standard.

### Trigger

Supabase auth: `signInWithOtp({ email })` call.

### From name

`ABLE`

### Subject line

`Your ABLE link`

### Full email body

**Subject:** `Your ABLE link`
**From:** `ABLE`

---

Here's your sign-in link. It's valid for 10 minutes.

[Sign in to ABLE →]({{supabase_magic_link}})

If you didn't request this, ignore it.

—

ABLE · ablemusic.co

---

**Guidance:** No "Welcome back." No "For your security." No "This link will expire soon — act now." Just the link, a time limit, and a reassurance. The link button label is "Sign in to ABLE" — not "Click here" or "Log in" or "Access your account." Specific and calm.

---

## Delivery architecture

### Stack

- **Sending:** Resend.com (recommended)
  - Free tier: 100 emails/day, 3,000/month — sufficient for early beta
  - API: simple POST, excellent deliverability, React Email compatible
  - Dashboard: per-email delivery tracking, bounce handling
- **Function:** Netlify serverless function at `netlify/functions/fan-confirmation.js`
- **Trigger:** called from able-v7.html sign-up submit handler via `fetch('/api/fan-confirmation', { method: 'POST', body: JSON.stringify(payload) })`
- **Template rendering:** server-side in the Netlify function — no client-side token replacement

### Function interface: `fan-confirmation.js`

**Request body:**
```json
{
  "fan_email": "fan@example.com",
  "fan_name": "Alex",
  "artist_name": "Nadia",
  "artist_slug": "nadia",
  "page_state": "pre-release",
  "release_title": "Echoes",
  "release_date": "2026-03-18",
  "presave_url": "https://distrokid.com/hyperfollow/nadia/echoes",
  "stream_url": "https://open.spotify.com/album/xxx",
  "venue_name": null,
  "ticket_url": null,
  "source": "ig"
}
```

**Response:**
```json
{ "success": true, "message_id": "resend_msg_xxx" }
```

**Error response:**
```json
{ "success": false, "error": "invalid_email" }
```

### DNS requirements (sending domain: mail.ablemusic.co)

These must be set before any email is sent to real users:
- `SPF`: `v=spf1 include:_spf.resend.com ~all`
- `DKIM`: Resend-generated CNAME records
- `DMARC`: `v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co` (monitor mode initially)
- `MX` (for replies): not required for transactional email, but recommended for the artist's replies to reach someone

### Source tracking

All links in emails include `?ref=email`. This maps to `source: 'email'` in the `SOURCE_VALUES` canonical list from CROSS_PAGE_JOURNEYS.md.

Fan dashboard link: `ablemusic.co/fan?ref=email-confirm`

This allows admin.html analytics to show "came from confirmation email" as a source in the click breakdown.

---

## Compliance

### GDPR

- Sign-up form must include: `[Artist name] will send you occasional updates. Powered by ABLE.` — below the submit button, in small text. This constitutes informed consent for the artist's communications.
- Consent timestamp must be recorded: `able_fans` record should include `consent_ts` (ISO timestamp) and `consent_source` (e.g. "profile-signup-ig").
- Every email must have a working unsubscribe. Resend handles this natively via `unsubscribe_url` token.
- Fan data belongs to the artist. ABLE does not cross-promote fans from artist A to artist B.

### CAN-SPAM (US)

- Physical address: include in footer as "ABLE Labs Ltd · [address]" once company is incorporated. Until then: not sending to US users at volume.
- Unsubscribe must be honoured within 10 business days. Resend's webhook-to-remove pattern achieves this instantly.
- Subject line must not be deceptive. All subject lines in this spec are honest.


---
# FILE: docs/systems/data-architecture/SPEC.md
---

# ABLE — Data Architecture Spec
**Created: 2026-03-15 | Canonical reference**

> This is the authoritative spec for ABLE's data layer — from localStorage interfaces through to Supabase tables and RLS policies. The codebase is vanilla JS; TypeScript interfaces here document intent, not runtime types. SQL definitions are Postgres-compatible (Supabase).

---

## PART 1 — LOCALSTORAGE CONTRACT

### Key registry

| Key | Type | Written by | Read by | Notes |
|---|---|---|---|---|
| `able_v3_profile` | `AbleProfile` | start.html, admin.html | able-v7.html, admin.html | Canonical profile; source of truth |
| `able_fans` | `Fan[]` | able-v7.html | admin.html | Append-only array |
| `able_clicks` | `ClickEvent[]` | able-v7.html | admin.html | Append-only array; trim at 1000 |
| `able_views` | `ViewEvent[]` | able-v7.html | admin.html | Append-only array; trim at 2000 |
| `able_gig_expires` | `number` | admin.html | able-v7.html, admin.html | Unix timestamp (ms); delete on expiry |
| `able_profile` | `AbleProfileLegacy` | start.html | admin.html | Legacy wizard key; migrate to `able_v3_profile` on first admin load |
| `able_shows` | `Show[]` | admin.html | able-v7.html, admin.html | Mutable array; edit in place |
| `able_dismissed_nudges` | `string[]` | admin.html | admin.html | UI state only; do not sync to Supabase |
| `able_starred_fans` | `string[]` | admin.html | admin.html | Deprecated pattern — migrate to `Fan.isStarred` |
| `able_tier` | `string` | admin.html (Stripe callback) | admin.html, able-v7.html | One of: `"free"` / `"artist"` / `"artist-pro"` / `"label"`. Default: `"free"`. |
| `admin_visit_dates` | `string[]` | admin.html | admin.html | ISO date strings of admin loads; used for nudge timing (artist success system). Keep last 60 days. |
| `fan_following` | `FanFollowing[]` | fan.html | fan.html | Fan-followed artist slugs. fan.html only — not synced to artist data. |
| `fan_location` | `FanLocation` | fan.html | fan.html | Fan's opt-in city/country for "shows near you". fan.html only. |

---

### TypeScript interfaces

```typescript
// ─── PROFILE ───────────────────────────────────────────────────────────────

type Theme = 'dark' | 'light' | 'glass' | 'contrast';
type Feel  = 'electronic' | 'hiphop' | 'rnb' | 'indie' | 'pop' | 'rock' | 'folk';
type PageState = 'profile' | 'pre-release' | 'live' | 'gig';

interface CTA {
  label: string;
  url:   string;
  type:  'stream' | 'presave' | 'tickets' | 'merch' | 'support' | 'social' | 'custom';
}

interface SnapCard {
  id:      string;        // nanoid(8) — stable across edits
  type:    'text' | 'link' | 'image' | 'embed';
  title?:  string;
  body?:   string;
  url?:    string;
  imgUrl?: string;
  order:   number;        // display order, 0-indexed
}

interface FanCapture {
  headline:    string;   // e.g. "Stay close."
  placeholder: string;   // e.g. "Your email"
  thanks:      string;   // e.g. "You're in."
}

interface AbleProfile {
  // Identity
  name:        string;
  bio?:        string;
  artistSlug?: string;   // URL slug — "nadia" → ablemusic.co/nadia
  avatarUrl?:  string;   // Supabase Storage URL or data URI (local phase)

  // Appearance
  accent:  string;       // hex — e.g. "#e05242"
  theme:   Theme;
  feel?:   Feel;

  // Campaign state
  state:          PageState;
  stateOverride?: PageState; // explicit artist override; beats computed state
  stateChangedAt?: number;   // Unix ms — audit trail

  // Release
  releaseTitle?: string;
  releaseDate?:  string;  // ISO 8601 — "2026-04-12"
  releaseUrl?:   string;  // Stream / presave URL

  // CTAs
  ctaPrimary?:   CTA;
  ctaSecondary?: CTA;
  quickActions?: CTA[];   // max 6

  // Snap cards
  snapCards?: SnapCard[];

  // Fan capture
  fanCapture?: FanCapture;

  // Platform links
  spotifyUrl?:   string;
  instagramUrl?: string;
  tiktokUrl?:    string;
  youtubeUrl?:   string;
  appleMusicUrl?: string;
  bandcampUrl?:   string;

  // Meta
  schemaVersion: number; // increment when shape changes; current: 1
  updatedAt:     number; // Unix ms
}

// Legacy wizard key — read once, migrate to AbleProfile, discard
interface AbleProfileLegacy {
  name?:    string;
  accent?:  string;
  feel?:    string;
  spotify?: string;
  cta?:     { label: string; url: string };
}


// ─── FAN ────────────────────────────────────────────────────────────────────

interface Fan {
  email:           string;
  ts:              number;  // Unix ms — sign-up timestamp
  source:          SourceValue;

  // Recommended additions (P0 — add now, no breaking change)
  name?:           string;
  confirmedAt?:    number;  // Unix ms — email confirmation received
  optIn?:          boolean; // explicit marketing consent; required before broadcasts
  unsubscribedAt?: number;  // soft delete — never hard-delete a fan record
  isStarred?:      boolean; // replaces able_starred_fans string array
}

// Canonical source values — never add new values without updating this union
type SourceValue =
  | 'ig'             // Instagram bio link
  | 'tt'             // TikTok bio link
  | 'sp'             // Spotify
  | 'qr'             // Gig mode QR code
  | 'story'          // Instagram or TikTok story
  | 'direct'         // Direct URL — no ?src param
  | 'email'          // Confirmation email click-through
  | 'fan-dashboard'; // Via fan.html


// ─── ANALYTICS EVENTS ───────────────────────────────────────────────────────

interface ClickEvent {
  label:      string;      // CTA label text — e.g. "Pre-save Echoes"
  type:       string;      // CTA type — matches CTA.type
  ts:         number;      // Unix ms
  source:     SourceValue;

  // Recommended additions (P0)
  url?:       string;      // Destination URL
  sessionId?: string;      // nanoid(12) — groups events from same visit
  utm?: {
    campaign?: string;
    medium?:   string;
    content?:  string;
  };
}

interface ViewEvent {
  ts:       number;        // Unix ms
  source:   SourceValue;

  // Recommended additions (P0)
  referrer?:  string;      // document.referrer at time of view
  sessionId?: string;      // same session as clicks
  pageState?: PageState;   // which state the profile was in at view time
}


// ─── SHOWS ──────────────────────────────────────────────────────────────────

interface Show {
  id:        string;    // nanoid(8) — stable identifier; required for edit/delete

  // Core (required)
  venue:     string;
  date:      string;    // ISO 8601 date — "2026-05-10"

  // Recommended additions (P0)
  city?:     string;    // "London" — required for fan.html "near you" routing
  country?:  string;    // ISO 3166-1 alpha-2 — "GB"

  // Optional
  doorsTime?:   string;  // "19:30"
  ticketUrl?:   string;
  featured?:    boolean; // pin to top of shows section
  soldOut?:     boolean; // show shows as sold out; keep ticketUrl for waitlist
  cancelled?:   boolean; // soft-cancel; do not delete — fan needs to know
  priceRange?:  string;  // "£10–£25"
  venueUrl?:    string;
  lineup?:      string[]; // other artist names on the bill
}


// ─── FAN.HTML KEYS (not yet in CLAUDE.md canonical list) ────────────────────

interface FanFollowing {
  artistSlug: string;
  followedAt: number;   // Unix ms
}
// Key: fan_following — Fan[]; writen by fan.html

interface FanLocation {
  city?:    string;
  country?: string;
  lat?:     number;
  lng?:     number;
  setAt:    number;     // Unix ms
}
// Key: fan_location — FanLocation; written by fan.html
```

---

## PART 2 — SUPABASE TABLES

### Naming convention
- Tables: `snake_case` plural
- Columns: `snake_case`
- UUIDs: `gen_random_uuid()` default
- Timestamps: `timestamptz` with `DEFAULT now()`
- Soft delete: `deleted_at timestamptz` — never `DELETE` user data

---

### `profiles` — maps to `able_v3_profile`

```sql
CREATE TABLE profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identity
  name            TEXT NOT NULL,
  bio             TEXT,
  artist_slug     TEXT UNIQUE,              -- ablemusic.co/nadia
  avatar_url      TEXT,

  -- Appearance
  accent          TEXT NOT NULL DEFAULT '#e05242',
  theme           TEXT NOT NULL DEFAULT 'dark'
                    CHECK (theme IN ('dark','light','glass','contrast')),
  feel            TEXT CHECK (feel IN ('electronic','hiphop','rnb','indie','pop','rock','folk')),

  -- Campaign state
  state           TEXT NOT NULL DEFAULT 'profile'
                    CHECK (state IN ('profile','pre-release','live','gig')),
  state_override  TEXT CHECK (state_override IN ('profile','pre-release','live','gig')),
  state_changed_at TIMESTAMPTZ,

  -- Release
  release_title   TEXT,
  release_date    DATE,
  release_url     TEXT,

  -- CTAs (stored as JSONB — queried infrequently, shape varies)
  cta_primary     JSONB,
  cta_secondary   JSONB,
  quick_actions   JSONB DEFAULT '[]'::jsonb,

  -- Snap cards (array of objects — separate table preferred at scale)
  snap_cards      JSONB DEFAULT '[]'::jsonb,

  -- Fan capture copy
  fan_capture     JSONB,

  -- Platform links
  spotify_url     TEXT,
  instagram_url   TEXT,
  tiktok_url      TEXT,
  youtube_url     TEXT,
  apple_music_url TEXT,
  bandcamp_url    TEXT,

  -- Meta
  schema_version  INTEGER NOT NULL DEFAULT 1,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);

-- Indexes
CREATE INDEX profiles_artist_id_idx ON profiles(artist_id);
CREATE UNIQUE INDEX profiles_slug_idx ON profiles(artist_slug) WHERE artist_slug IS NOT NULL;
```

---

### `fans` — maps to `able_fans`

```sql
CREATE TABLE fans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  email           TEXT NOT NULL,
  name            TEXT,
  source          TEXT NOT NULL DEFAULT 'direct',
  is_starred      BOOLEAN NOT NULL DEFAULT false,
  opt_in          BOOLEAN NOT NULL DEFAULT false,

  signed_up_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at    TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,  -- soft delete / opt-out
  deleted_at      TIMESTAMPTZ,  -- GDPR right to erasure

  -- Location (optional, from fan.html)
  city            TEXT,
  country         TEXT,

  UNIQUE (artist_id, email)     -- one record per fan per artist
);

-- Indexes
CREATE INDEX fans_artist_id_idx      ON fans(artist_id);
CREATE INDEX fans_signed_up_at_idx   ON fans(artist_id, signed_up_at DESC);
CREATE INDEX fans_source_idx         ON fans(artist_id, source);
```

---

### `events` (shows) — maps to `able_shows`

```sql
CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  venue       TEXT NOT NULL,
  city        TEXT,
  country     TEXT,               -- ISO 3166-1 alpha-2

  event_date  DATE NOT NULL,
  doors_time  TIME,
  ticket_url  TEXT,
  price_range TEXT,
  venue_url   TEXT,
  lineup      TEXT[],             -- other artist names

  is_featured  BOOLEAN NOT NULL DEFAULT false,
  is_sold_out  BOOLEAN NOT NULL DEFAULT false,
  is_cancelled BOOLEAN NOT NULL DEFAULT false,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ
);

-- Indexes
CREATE INDEX events_artist_id_idx ON events(artist_id);
CREATE INDEX events_date_idx      ON events(artist_id, event_date ASC);
CREATE INDEX events_city_idx      ON events(city, event_date ASC); -- for fan.html "near you"
```

---

### `clicks` — maps to `able_clicks`

```sql
CREATE TABLE clicks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  label       TEXT NOT NULL,
  type        TEXT NOT NULL,
  url         TEXT,
  source      TEXT NOT NULL DEFAULT 'direct',
  session_id  TEXT,               -- nanoid(12) from client
  utm_campaign TEXT,
  utm_medium   TEXT,
  utm_content  TEXT,

  clicked_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes (analytics queries are time-range scans per artist)
CREATE INDEX clicks_artist_time_idx ON clicks(artist_id, clicked_at DESC);
CREATE INDEX clicks_source_idx      ON clicks(artist_id, source);
CREATE INDEX clicks_session_idx     ON clicks(session_id);
```

---

### `views` — maps to `able_views`

```sql
CREATE TABLE views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  source      TEXT NOT NULL DEFAULT 'direct',
  referrer    TEXT,
  session_id  TEXT,
  page_state  TEXT,               -- profile state at view time

  viewed_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX views_artist_time_idx ON views(artist_id, viewed_at DESC);
CREATE INDEX views_source_idx      ON views(artist_id, source);
```

---

### `ui_preferences` — maps to `able_dismissed_nudges` + legacy `able_starred_fans`

```sql
-- These are UI state, not user data. Sync is nice-to-have, not required.
-- Do not include in fan data exports.

CREATE TABLE ui_preferences (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  dismissed_nudges    TEXT[] NOT NULL DEFAULT '{}',
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### Row Level Security (RLS) policies

```sql
-- ─── Enable RLS on all tables ───────────────────────────────────────────────
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE fans             ENABLE ROW LEVEL SECURITY;
ALTER TABLE events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE views            ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_preferences   ENABLE ROW LEVEL SECURITY;


-- ─── profiles ───────────────────────────────────────────────────────────────

-- Public: anyone can read non-deleted profiles (fan-facing page needs this)
CREATE POLICY "profiles: public read"
  ON profiles FOR SELECT
  USING (deleted_at IS NULL);

-- Artist: can update their own profile
CREATE POLICY "profiles: artist update"
  ON profiles FOR UPDATE
  USING (auth.uid() = artist_id);

-- Artist: can insert their own profile (one per user)
CREATE POLICY "profiles: artist insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = artist_id);


-- ─── fans ────────────────────────────────────────────────────────────────────

-- Fans are private to the artist who owns them
CREATE POLICY "fans: artist read own"
  ON fans FOR SELECT
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );

CREATE POLICY "fans: artist update own"
  ON fans FOR UPDATE
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );

-- Any visitor can insert a new fan (sign-up from able-v7.html)
-- Note: does NOT require auth. Fan sign-ups are unauthenticated.
CREATE POLICY "fans: public insert"
  ON fans FOR INSERT
  WITH CHECK (true);


-- ─── events ──────────────────────────────────────────────────────────────────

-- Public: anyone can read events (fan-facing shows section)
CREATE POLICY "events: public read"
  ON events FOR SELECT
  USING (deleted_at IS NULL AND is_cancelled = false);

-- Artist: full CRUD on their own events
CREATE POLICY "events: artist manage"
  ON events FOR ALL
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );


-- ─── clicks + views ──────────────────────────────────────────────────────────

-- Public can insert (fan clicks / page views from able-v7.html)
CREATE POLICY "clicks: public insert"
  ON clicks FOR INSERT WITH CHECK (true);

CREATE POLICY "views: public insert"
  ON views FOR INSERT WITH CHECK (true);

-- Only artist can read their own analytics
CREATE POLICY "clicks: artist read own"
  ON clicks FOR SELECT
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );

CREATE POLICY "views: artist read own"
  ON views FOR SELECT
  USING (
    artist_id IN (
      SELECT id FROM profiles WHERE artist_id = auth.uid()
    )
  );
```

---

## PART 3 — MIGRATION STRATEGY

### Mental model
localStorage is the offline cache. Supabase is the source of truth once the user is authenticated. The transition is a one-time flush, after which localStorage becomes a write-through cache.

### `flushToSupabase()` — reference implementation

```javascript
/**
 * Flush local data to Supabase.
 * Called once after first auth, then on meaningful profile changes.
 * localStorage is kept as cache — it is not cleared after flush.
 *
 * @param {SupabaseClient} supabase
 * @param {string} artistId  — auth.users.id from Supabase Auth
 */
async function flushToSupabase(supabase, artistId) {
  const errors = [];

  // ── 1. Profile ──────────────────────────────────────────────────────────
  try {
    const raw = localStorage.getItem('able_v3_profile');
    if (raw) {
      const profile = JSON.parse(raw);
      await supabase
        .from('profiles')
        .upsert({
          artist_id:       artistId,
          name:            profile.name,
          bio:             profile.bio,
          artist_slug:     profile.artistSlug,
          accent:          profile.accent,
          theme:           profile.theme,
          feel:            profile.feel,
          state:           profile.state,
          state_override:  profile.stateOverride,
          release_title:   profile.releaseTitle,
          release_date:    profile.releaseDate,
          release_url:     profile.releaseUrl,
          cta_primary:     profile.ctaPrimary,
          cta_secondary:   profile.ctaSecondary,
          quick_actions:   profile.quickActions  ?? [],
          snap_cards:      profile.snapCards     ?? [],
          fan_capture:     profile.fanCapture,
          spotify_url:     profile.spotifyUrl,
          instagram_url:   profile.instagramUrl,
          tiktok_url:      profile.tiktokUrl,
          schema_version:  profile.schemaVersion ?? 1,
          updated_at:      new Date().toISOString(),
        }, { onConflict: 'artist_id' });
    }
  } catch (e) {
    errors.push({ key: 'able_v3_profile', error: e.message });
  }

  // ── 2. Fans ─────────────────────────────────────────────────────────────
  try {
    const raw = localStorage.getItem('able_fans');
    const fans = raw ? JSON.parse(raw) : [];
    if (fans.length > 0) {
      // Need the profile.id (not auth user id) as the FK
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('id')
        .eq('artist_id', artistId)
        .single();

      if (profileRow) {
        const rows = fans.map(f => ({
          artist_id:   profileRow.id,
          email:       f.email,
          source:      f.source,
          name:        f.name    ?? null,
          is_starred:  f.isStarred ?? false,
          signed_up_at: new Date(f.ts).toISOString(),
        }));
        // upsert on (artist_id, email) — safe to re-run
        await supabase
          .from('fans')
          .upsert(rows, { onConflict: 'artist_id,email', ignoreDuplicates: true });
      }
    }
  } catch (e) {
    errors.push({ key: 'able_fans', error: e.message });
  }

  // ── 3. Shows ─────────────────────────────────────────────────────────────
  try {
    const raw = localStorage.getItem('able_shows');
    const shows = raw ? JSON.parse(raw) : [];
    if (shows.length > 0) {
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('id')
        .eq('artist_id', artistId)
        .single();

      if (profileRow) {
        const rows = shows.map(s => ({
          artist_id:   profileRow.id,
          venue:       s.venue,
          city:        s.city      ?? null,
          country:     s.country   ?? null,
          event_date:  s.date,
          doors_time:  s.doorsTime ?? null,
          ticket_url:  s.ticketUrl ?? null,
          is_featured: s.featured  ?? false,
          is_sold_out: s.soldOut   ?? false,
        }));
        await supabase.from('events').insert(rows);
      }
    }
  } catch (e) {
    errors.push({ key: 'able_shows', error: e.message });
  }

  // ── 4. Analytics (best-effort, not critical) ────────────────────────────
  // clicks and views: insert only. Do not upsert — no stable ID to conflict on.
  // Omit from initial flush to keep it fast. Flush analytics separately.

  if (errors.length > 0) {
    console.warn('[ABLE] flushToSupabase completed with errors:', errors);
  }
  return { success: errors.length === 0, errors };
}
```

### Legacy key migration

```javascript
/**
 * On first admin.html load: migrate able_profile → able_v3_profile if needed.
 * Called before any profile read in admin.html.
 */
function migrateLegacyProfileKey() {
  const legacy = localStorage.getItem('able_profile');
  const canonical = localStorage.getItem('able_able_v3_profile');

  if (legacy && !canonical) {
    const data = JSON.parse(legacy);
    const migrated = {
      name:          data.name    || '',
      accent:        data.accent  || '#e05242',
      feel:          data.feel    || null,
      theme:         'dark',
      state:         'profile',
      spotifyUrl:    data.spotify || null,
      schemaVersion: 1,
      updatedAt:     Date.now(),
    };
    if (data.cta) {
      migrated.ctaPrimary = { label: data.cta.label, url: data.cta.url, type: 'custom' };
    }
    localStorage.setItem('able_v3_profile', JSON.stringify(migrated));
    // Do not delete able_profile — keep as backup until confirmed migrated
  }
}
```

---

## PART 4 — PRIVACY SPEC

### Principles

**"Your data. Your relationship."** is not just copy — it is a technical commitment.

1. Fan emails are never shared with other artists, ABLE staff, or third parties
2. Artists can export their full fan list at any time, in any tier
3. Fans can request deletion of all their data across all ABLE artists
4. ABLE does not use fan emails for platform marketing without explicit fan opt-in to ABLE communications (separate from artist opt-in)

### Fan data exposure model

| Consumer | Can see fan emails? | How |
|---|---|---|
| Artist (own fans) | Yes | Supabase RLS: `artist_id` match |
| Another artist | No | RLS blocks cross-artist reads |
| ABLE admin staff | Via service role only | Service role key never in client code |
| Third-party scripts on page | No (Supabase) | Data is server-side post-migration; localStorage phase is a known gap |
| Fan themselves | Yes | Can request via GDPR Subject Access Request |

### localStorage gap (pre-Supabase)

While data lives in localStorage, any JavaScript loaded on the same origin can read `able_fans`. Mitigation:
- Do not load untrusted third-party scripts that execute in the same origin as admin.html
- Spotify and YouTube embeds on able-v7.html (the public profile) do not need access to admin localStorage — they are on separate origins if iframed
- This gap closes automatically when fans are written to Supabase instead of localStorage

### Consent audit

Every fan sign-up must record:
```javascript
{
  email:         'fan@example.com',
  ts:            1742000000000,     // Unix ms
  source:        'ig',
  optIn:         true,              // artist marketing consent — checked at sign-up
  // future: consentVersion: '2026-03-15' — for consent policy versioning
}
```

### Data export (artist fan list)

```javascript
/**
 * Generate CSV of the artist's fan list.
 * All tiers get this. It is a GDPR requirement.
 */
function exportFansAsCSV() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const starred = new Set(JSON.parse(localStorage.getItem('able_starred_fans') || '[]'));

  const header = ['Email', 'Name', 'Date joined', 'Source', 'Starred', 'Opted in'];
  const rows = fans.map(f => [
    f.email,
    f.name || '',
    new Date(f.ts).toISOString().split('T')[0],
    f.source,
    (f.isStarred || starred.has(f.email)) ? 'Yes' : 'No',
    f.optIn ? 'Yes' : 'No',
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `able-fans-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## PART 5 — SCHEMA VERSIONING

### Profile schema version

`AbleProfile.schemaVersion` starts at `1`. When the shape changes in a backward-incompatible way:

1. Increment `schemaVersion`
2. Write a migration function: `migrateProfileV1toV2(profile)`
3. Call it on first read if `schemaVersion < CURRENT_VERSION`
4. Never silently swallow a parse error — log and fall back to defaults

### Event schema stability

Click and view events are append-only historical records. Never change their shape. If new fields are needed, add them as optional — old records simply won't have them, and that is fine.

---

## QUICK REFERENCE — localStorage key summary

```
able_v3_profile    → AbleProfile       (single object)
able_fans          → Fan[]             (append-only)
able_clicks        → ClickEvent[]      (append-only, trim at 1000)
able_views         → ViewEvent[]       (append-only, trim at 2000)
able_gig_expires   → number            (Unix ms, single value)
able_profile       → AbleProfileLegacy (legacy, migrate on read)
able_shows         → Show[]            (mutable array)
able_dismissed_nudges → string[]       (UI state only)
able_starred_fans  → string[]          (deprecated — migrate to Fan.isStarred)
able_tier          → string            ("free" | "artist" | "artist-pro" | "label")
admin_visit_dates  → string[]          (ISO dates, last 60 days, nudge timing)

fan_following      → FanFollowing[]    (fan.html only)
fan_location       → FanLocation       (fan.html only)
```


---
# FILE: docs/systems/killer-features/SPEC.md
---

# ABLE — Killer Features: Specification
**Created: 2026-03-16 | Revised: 2026-03-16 | Status: ACTIVE — implementation spec**

Priority order: P0 (immediate, V1) → P1 (next sprint, V1) → P2 (V2, backend required)

---

## P0 — Auto-gig mode from calendar

### What it does exactly

When the current time crosses a show's `doorsTime` in `able_shows`, gig mode auto-activates — without any artist action. It deactivates automatically 4 hours after doors, or at midnight if no doors time is set. A show marked as "featured" (`featured: true`) takes priority if multiple shows exist on the same date.

The manual 24-hour toggle in admin remains — it's the override for artists who want to activate early (e.g. announcing at soundcheck) or for artists without a show in the system.

### Artist journey

1. Artist adds a show in admin as normal — venue, date, doors time, ticket URL.
2. On show day, at doors time, the artist's ABLE page automatically shifts to gig mode. The artist does nothing.
3. Admin shows a passive indicator: "On tonight — [Venue Name], doors [time]. Auto from your shows list." with a manual override option to deactivate.
4. 4 hours after doors, gig mode deactivates. Page returns to previous state (live / pre-release / profile — whatever it was before).
5. In admin, the show is marked as past. No cleanup required from the artist.

### Fan journey

1. Fan visits the ABLE page during the show window.
2. They see gig mode: tickets front, "On tonight" tag, venue name, doors time.
3. Tickets CTA is primary. If sold out is flagged, "Sold out" replaces the ticket CTA.
4. Fan experience is identical to manual gig mode — this is invisible infrastructure.

### Data model changes

No new localStorage keys required. Reads from existing `able_shows` and `able_gig_expires`.

### Exact implementation

```javascript
// ─── Helper: is this date string today? ────────────────────────────────────
function isToday(dateStr) {
  const d = new Date(dateStr);
  const n = new Date();
  return d.getFullYear() === n.getFullYear()
      && d.getMonth()    === n.getMonth()
      && d.getDate()     === n.getDate();
}

// ─── Helper: parse doors time into Unix ms ─────────────────────────────────
// dateStr: "2026-05-10", doorsTime: "19:30"
function parseDoorsTime(dateStr, doorsTime) {
  if (!doorsTime) {
    // No doors time: use midnight (00:00) of the show date
    return new Date(dateStr + 'T00:00:00').getTime();
  }
  return new Date(dateStr + 'T' + doorsTime + ':00').getTime();
}

// ─── Auto-gig check ─────────────────────────────────────────────────────────
// Runs on page load and every 60 seconds in able-v7.html and admin.html.
// Returns { active, show, expiresMs, source } or { active: false }
function checkAutoGig() {
  // Do not override an unexpired manual gig
  const manualExpiry = parseInt(localStorage.getItem('able_gig_expires') || '0', 10);
  if (manualExpiry > Date.now()) {
    return { active: true, source: 'manual', expiresMs: manualExpiry };
  }

  try {
    const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
    const todayShows = shows.filter(s => isToday(s.date) && !s.cancelled);

    // Featured show takes priority; otherwise use first show today
    const priority = todayShows.find(s => s.featured) || todayShows[0];
    if (!priority) return { active: false };

    const now       = Date.now();
    const doorsMs   = parseDoorsTime(priority.date, priority.doorsTime);
    const expiresMs = doorsMs + (4 * 60 * 60 * 1000); // 4 hours after doors

    if (now >= doorsMs && now < expiresMs) {
      // Auto-activate: write gig expiry so the existing countdown bar works
      localStorage.setItem('able_gig_expires', String(expiresMs));
      return { active: true, show: priority, expiresMs, source: 'auto' };
    }

    // Show is today but pre-doors — surface "Turn on now" prompt in admin
    if (now < doorsMs) {
      return { active: false, showToday: true, show: priority, doorsMs, source: 'none' };
    }
  } catch (e) {
    console.warn('[ABLE] checkAutoGig error:', e.message);
  }

  return { active: false };
}

// ─── Poll every 60 seconds (add to able-v7.html and admin.html) ────────────
// Call checkAutoGig() on page load first, then set up the interval.
// The interval handles artists who leave the page open across the doors time.
setInterval(() => {
  const result = checkAutoGig();
  applyGigState(result); // existing function that renders the gig state in the UI
}, 60 * 1000);
```

New field on the returned gig state object: `source: 'auto' | 'manual' | 'none'` — so admin UI can show "Auto from calendar" vs "Manual" in the gig mode indicator.

### Copy (ABLE voice)

Admin indicator (auto-active):
> "On tonight — [Venue], doors [time]. Auto from your shows list."

Admin override:
> "Turn off early"

Admin (manual override available when show is today but pre-doors):
> "You're playing tonight. Gig mode goes on at [time] — or turn it on now."

Fan-facing (unchanged from existing gig mode copy):
> "On tonight." / "Doors [time]." / "Get tickets."

### V1 scope

Pure localStorage + `setInterval` logic. No backend required. Everything runs in the browser.

V1 includes:
- Auto-activate at doors time
- Auto-deactivate 4 hours post-doors
- Admin indicator showing source (auto vs manual)
- "Turn on now" manual override when show is today but pre-doors
- Fallback: midnight deactivation if no doors time set
- Does not override an unexpired manual gig

V2 additions:
- Server-side time authority (prevents spoofing by device clock)
- Push notification to artist when auto-gig activates
- Multiple shows on same day — priority resolution UI in admin

### Build complexity: S

One `setInterval` check, one `checkAutoGig()` function, minor admin UI indicator change. All existing gig mode infrastructure is reused. Estimated: 2–3 hours build + test.

---

## P0 — Deep link campaigns

### What it does exactly

When an artist shares `ablemusic.co/luna?campaign=vinyl-restock`, the ABLE page:
1. Parses `?campaign=` from the URL on load
2. Auto-scrolls to the relevant section based on campaign-type mapping
3. Shows a contextual chip using the campaign name (5-second auto-dismiss)
4. Tags all events (fan sign-ups, CTA clicks, page views) with `source: 'vinyl-restock'`

Artists generate campaign URLs in admin with a simple UI: type a campaign name, pick a destination section, copy the URL.

### Artist journey

1. Artist is about to post a Story about their vinyl restock.
2. In admin → Analytics → Campaign links: they tap "New campaign link."
3. They type: "vinyl-restock" (or choose from suggestions: "merch-drop", "new-single", "tour-announce").
4. They select destination: "Merch section."
5. ABLE generates: `ablemusic.co/luna?campaign=vinyl-restock`
6. They copy it and paste into their Story.
7. Later in admin → Analytics, they see: "vinyl-restock: 340 visits, 47 sign-ups, 23 merch clicks."

### Fan journey

1. Fan sees Story about vinyl restock, taps link.
2. ABLE page loads. After a brief entrance animation, page smooth-scrolls to the merch section.
3. A contextual chip appears near the merch section heading (not a modal, not a banner):
   > "You're here from the vinyl restock."
   This disappears after 5 seconds or on first scroll. Non-intrusive.
4. Fan browses, buys, signs up. All analytics tagged with campaign source.

### Data model changes

New localStorage key: `able_campaigns` — array of defined campaign links.
```javascript
// able_campaigns — array of campaign link definitions
[{
  id:      'vinyl-restock',   // URL-safe campaign identifier
  label:   'Vinyl restock',   // human label shown in admin analytics
  section: 'merch',           // destination section
  created: 1710000000000,     // Unix ms
}]
```

No new keys needed for event tracking — campaign source appends to existing `source` field in events.

### Exact implementation

```javascript
// ─── Step 1: Parse campaign param and inject into all events ───────────────
// Place at the very top of able-v7.html's init sequence, before any other reads.
const CAMPAIGN_SOURCE = new URLSearchParams(window.location.search).get('campaign') || null;

// ─── Step 2: Section destination mapping ──────────────────────────────────
// Maps campaign ID keywords to section element IDs in able-v7.html.
// Artist can override by selecting a section explicitly in the campaign creator.
const CAMPAIGN_SECTION_MAP = {
  'merch':   '#merch',          // any campaign containing 'merch', 'vinyl', 'tee', 'store'
  'show':    '#events',         // 'show', 'tour', 'tickets', 'gig'
  'tour':    '#events',
  'ep':      '#music',          // 'ep', 'album', 'single', 'drop'
  'album':   '#music',
  'single':  '#music',
  'support': '#support',        // 'support', 'patreon', 'bandcamp'
};

function getCampaignSection(campaignId) {
  if (!campaignId) return null;
  const lower = campaignId.toLowerCase();
  for (const [keyword, sectionId] of Object.entries(CAMPAIGN_SECTION_MAP)) {
    if (lower.includes(keyword)) return sectionId;
  }
  // Try looking up in able_campaigns for an explicit section override
  try {
    const campaigns = JSON.parse(localStorage.getItem('able_campaigns') || '[]');
    const match = campaigns.find(c => c.id === campaignId);
    if (match?.section) return '#' + match.section;
  } catch (e) { /* safe to ignore */ }
  return null; // no match — no scroll, land on hero
}

// ─── Step 3: Auto-scroll to target section on page load ───────────────────
// Call after all sections are rendered. Smooth scroll, reduced-motion aware.
function applyCampaignScroll() {
  if (!CAMPAIGN_SOURCE) return;
  const targetId = getCampaignSection(CAMPAIGN_SOURCE);
  if (!targetId) return;
  const el = document.querySelector(targetId);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

// ─── Step 4: Contextual chip ───────────────────────────────────────────────
// Displays briefly near the campaign destination section. Auto-dismisses.
// Must be accessible: aria-live for screen readers, motion-safe.
function showCampaignChip(campaignId) {
  if (!campaignId) return;
  const label = (() => {
    try {
      const campaigns = JSON.parse(localStorage.getItem('able_campaigns') || '[]');
      const match = campaigns.find(c => c.id === campaignId);
      return match?.label || campaignId.replace(/-/g, ' ');
    } catch { return campaignId.replace(/-/g, ' '); }
  })();

  const chip = document.createElement('div');
  chip.className    = 'campaign-chip';
  chip.setAttribute('role', 'status');
  chip.setAttribute('aria-live', 'polite');
  chip.textContent  = `You\u2019re here from the ${label}.`;

  const targetId = getCampaignSection(campaignId);
  const anchor   = targetId ? document.querySelector(targetId) : document.body;
  if (anchor) anchor.insertAdjacentElement('afterend', chip);
  else document.body.appendChild(chip);

  // Auto-dismiss: 5s or on first scroll, whichever comes first
  const dismiss = () => {
    chip.style.opacity = '0';
    setTimeout(() => chip.remove(), 300);
    window.removeEventListener('scroll', dismiss);
  };
  setTimeout(dismiss, 5000);
  window.addEventListener('scroll', dismiss, { once: true, passive: true });
}

// ─── Step 5: Inject CAMPAIGN_SOURCE into all event writes ─────────────────
// Each of the three event write functions (writeFanSignup, writeClick, writeView)
// must use CAMPAIGN_SOURCE || 'direct' as the source value when no other source
// is already set from a ?src= param.
//
// Example — writeFanSignup in able-v7.html:
function writeFanSignup(email, name = '') {
  const fans   = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const source = new URLSearchParams(window.location.search).get('src')
              || CAMPAIGN_SOURCE
              || 'direct';
  fans.push({ email, name, ts: Date.now(), source, optIn: true, isStarred: false });
  localStorage.setItem('able_fans', JSON.stringify(fans));
}
// Apply same pattern to writeClick() and writeView().
```

### Admin — campaign link generator

In admin.html analytics tab, add a "Campaign links" section:

```javascript
// Generates a campaign URL from the artist's profile slug + campaign ID
function generateCampaignUrl(campaignId, section) {
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  const slug    = profile.artistSlug
               || (profile.name || 'artist').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const url     = `https://ablemusic.co/${slug}?campaign=${encodeURIComponent(campaignId)}`;
  // Save campaign to local list for analytics display
  const campaigns = JSON.parse(localStorage.getItem('able_campaigns') || '[]');
  if (!campaigns.find(c => c.id === campaignId)) {
    campaigns.push({ id: campaignId, label: campaignId.replace(/-/g, ' '), section, created: Date.now() });
    localStorage.setItem('able_campaigns', JSON.stringify(campaigns));
  }
  return url;
}
```

### Copy (ABLE voice)

Admin — campaign creator:
> "Where should this link take people?"
> "Name this campaign" (placeholder: "vinyl-restock, summer-tour, ep-drop...")

Admin — generated URL display:
> "Your link: ablemusic.co/[slug]?campaign=vinyl-restock"
> "Anyone who arrives through this link will show up separately in your analytics."

Fan-facing contextual chip (5-second auto-dismiss):
> "You came from the vinyl restock."

### V1 scope

V1 includes:
- URL parameter parsing on page load in `able-v7.html`
- Section auto-scroll on load (smooth, instant if reduced-motion)
- Source tagging on all existing event writes
- Campaign link generator in admin (generate URL, copy to clipboard)
- Basic campaign breakdown in analytics view (visits/sign-ups/clicks per source)
- Contextual fan chip (auto-dismiss, non-modal, accessible)

V2 additions:
- Campaign performance comparison charts
- UTM parameter passthrough (for Google Analytics / PostHog)
- Campaign-specific hero copy override (artist writes custom message per campaign)

### Build complexity: M

URL parsing is trivial. Auto-scroll exists (tabs use it). Event tagging requires touching 3–4 write functions. Analytics breakdown UI is new. Admin campaign creator is new UI. Estimated: 6–8 hours build + test.

---

## P0 — Day 1 share card (the most important missing feature)

### What it is and why it matters

After the wizard completes, the artist has a live ABLE page. This is the highest-possible-motivation moment. They just set up. They're proud. They want to share it.

Currently: the wizard fades to black, or redirects to admin. The artist is left to figure out for themselves how to share their page. Most do not. The page sits dormant. ABLE gets no organic growth. The first fans never arrive.

The Day 1 share card is the bridge between "I completed setup" and "I have my first fans." It appears immediately after the wizard finishes, full-screen, with everything the artist needs to share in one place. Without it, ABLE is a tool artists set up and forget.

### What it shows

A full-screen interstitial in `start.html` shown immediately after `completeWizard()` runs and before any redirect to admin.html. It contains:

1. **"Your page is live."** — the headline. Not "You're all set." Not "Welcome to ABLE." Just that.
2. **The actual URL** — `ablemusic.co/[slug]` — large, copyable, with a one-tap copy button.
3. **A Copy link button** — copies the URL to clipboard with a brief "Copied" confirmation.
4. **Pre-written Instagram caption** — pre-filled text the artist can copy and paste directly into Instagram. Editable.
5. **Pre-written tweet** — for Twitter/X. Pre-filled, editable.
6. **"Open my page" link** — opens the artist's live page in a new tab so they can see it first.
7. **"Go to your dashboard"** — the exit path to admin.html.

### Exact implementation

```javascript
// ─── Day 1 share card ─────────────────────────────────────────────────────
// Called immediately after completeWizard() in start.html.
// Replaces the wizard screen with a full-screen share moment.
function showDay1ShareCard(profile) {
  const slug = profile.artistSlug
            || (profile.name || 'artist').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const url  = `https://ablemusic.co/${slug}`;

  // Pre-written captions — ABLE voice, first person, no exclamation marks
  const name     = profile.name || 'My page';
  const igCaption = `My page is live.\n\nMusic, shows, and updates — all in one place.\n\n${url}`;
  const tweet     = `My page is live. ${url}`;

  // Render the share card screen
  const wizard = document.getElementById('wizard-root') || document.body;
  wizard.innerHTML = `
    <div class="share-card" role="main">
      <div class="share-card__body">
        <p class="share-card__headline">Your page is live.</p>

        <div class="share-card__url-row">
          <span class="share-card__url" id="sc-url">${url}</span>
          <button class="share-card__copy-btn" id="sc-copy-url"
                  aria-label="Copy link to clipboard">Copy link</button>
        </div>

        <div class="share-card__captions">
          <div class="share-card__caption-block">
            <label class="share-card__caption-label">Instagram caption</label>
            <textarea class="share-card__caption-text" id="sc-ig"
                      rows="4" aria-label="Instagram caption">${igCaption}</textarea>
            <button class="share-card__copy-btn" data-copy="sc-ig"
                    aria-label="Copy Instagram caption">Copy</button>
          </div>

          <div class="share-card__caption-block">
            <label class="share-card__caption-label">Tweet</label>
            <textarea class="share-card__caption-text" id="sc-tweet"
                      rows="2" aria-label="Tweet text">${tweet}</textarea>
            <button class="share-card__copy-btn" data-copy="sc-tweet"
                    aria-label="Copy tweet">Copy</button>
          </div>
        </div>

        <div class="share-card__actions">
          <a href="${url}" target="_blank" rel="noopener noreferrer"
             class="share-card__preview-link">See my page</a>
          <a href="/admin.html" class="share-card__dashboard-link">Go to your dashboard</a>
        </div>
      </div>
    </div>
  `;

  // Wire copy buttons
  document.querySelectorAll('.share-card__copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const text     = targetId
        ? document.getElementById(targetId)?.value || ''
        : url;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      }).catch(() => {
        // Fallback for browsers without clipboard API
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      });
    });
  });
}
```

**Call site in start.html — the exact place to call it:**
```javascript
// In completeWizard() or its equivalent, after localStorage.setItem('able_v3_profile', ...):
function completeWizard() {
  const profile = buildProfileFromWizardState();
  localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  sessionStorage.removeItem('able_wizard_draft');
  // Show Day 1 share card instead of redirecting immediately
  showDay1ShareCard(profile);
  // The artist exits to admin.html via the "Go to your dashboard" link — not an auto-redirect
}
```

### Copy (ABLE voice)

The share card follows the copy philosophy exactly:

| Element | Copy |
|---|---|
| Headline | "Your page is live." |
| URL row label | (none — the URL speaks for itself) |
| Copy link button | "Copy link" → "Copied" (after tap) |
| Instagram section label | "Instagram caption" |
| Tweet section label | "Tweet" |
| Pre-written IG caption | "My page is live.\n\nMusic, shows, and updates — all in one place.\n\n[url]" |
| Pre-written tweet | "My page is live. [url]" |
| Preview link | "See my page" |
| Dashboard link | "Go to your dashboard" |

Do NOT write:
- "You're all set." — generic SaaS micro-copy
- "Share your page with the world!" — exclamation mark and hyperbole
- "Get your first fans" — selling language
- "Start growing your audience" — wrong register entirely

### Why this is the most important missing feature

1. **Activation rate is the single most important metric at launch.** An artist who completes setup but does not share is a dormant user. The share card converts "completed setup" into "first link shared."

2. **ABLE's growth is organic, artist-driven.** Every artist who shares their ABLE link from the Day 1 card is a free acquisition channel for new artists. When fans see the link and ask "what's ABLE?" — that's a new artist signup. There is no paid alternative.

3. **The pre-written captions remove friction at the highest-motivation moment.** Writing an Instagram caption takes 5 minutes of cognitive effort. At the moment the wizard completes, the artist is motivated but has done a lot already. A pre-written caption that they can copy with one tap removes the friction between "I want to share this" and "I shared this."

4. **Every day an artist doesn't share is a fan who didn't sign up.** The decay curve is steep — most artists who don't share within 24 hours of setup don't share at all.

### V1 scope

V1 includes:
- Full-screen share card shown after wizard completion
- Live URL, copy button
- Pre-written Instagram caption (editable, copyable)
- Pre-written tweet (editable, copyable)
- "See my page" link (new tab)
- "Go to your dashboard" exit

V2 additions:
- Web Share API (mobile native share sheet: `navigator.share({ title, text, url })`)
- Direct Instagram Story pre-fill (limited by API — copy-to-clipboard is the V1 approach)
- Analytics: track how many artists share on Day 1 (a key activation metric)

### Build complexity: S

All HTML/CSS. No new data dependencies. The wizard already has the profile data. The share card is a rendering step, not a data step. Estimated: 3–4 hours build + test.

---

## P1 — One-tap release announcement

### What it does exactly

When an artist marks a release as live in admin (or when the release date is reached and auto-switches to `live` state), ABLE surfaces an announcement panel: "Your release is live. Tell your fans?"

One tap generates three things simultaneously:
1. A snap card draft: artist-name-and-release-specific, using existing snap card copy patterns.
2. An Instagram/TikTok caption draft: copyable text, first person, with the streaming link.
3. An email draft to fan list: subject line + short body, ready to send via Broadcasts (or for copy-paste if Broadcasts is locked).

The artist reviews, edits if needed, and publishes/copies. Three tasks become one moment.

### Artist journey

1. Artist's release date arrives. Page auto-switches to `live` state.
2. Admin shows: "Your release is live. Let your fans know?" — full-width card above Campaign HQ.
3. Artist taps "Show me the drafts."
4. Bottom sheet opens with three tabs: Snap card / Caption / Email.
5. Each tab shows the generated draft. Artist can edit inline.
6. Snap card: "Publish" button (one tap, live immediately).
7. Caption: "Copy" button (copies to clipboard, artist pastes into their social app).
8. Email: "Send" button (Pro tier — triggers Resend broadcast) or "Copy" (free/Artist tier).
9. Panel dismisses. "Done." (no exclamation mark.)

### Data model changes

No new localStorage keys required.

New logic: `able_v3_profile.release.announced: boolean` — set to `true` after announcement is dismissed, so the panel doesn't resurface on every admin load. Reset when a new release is saved.

### Generated draft templates (ABLE voice)

**Snap card draft:**
> "[Title] is out now. [Short line from release description, if available.] Link in bio if you want to listen."

**Instagram caption draft:**
> "[Title] is out now.
>
> [Short line — artist writes this in release setup, or ABLE generates from genre/feel.]
>
> Link in my bio to stream, buy, or sign up to hear what's coming next."

**Email draft:**
> Subject: "[Title] is out."
>
> Body: "It's live.
>
> [Title] — [short description].
>
> [Stream CTA button — links to primary platform]
>
> I'll be in touch when there's more to share."

All drafts are fully editable before publish/send. These are starting points, not final copy.

### V1 scope

V1 includes:
- Release-live detection (on admin load, check if release date passed and `announced` is false)
- Draft generation for snap card + caption (pure JS, no API)
- Snap card publish (existing snap card write function)
- Caption copy to clipboard
- Email draft display (Pro-locked send, free copy)
- `announced` flag set on dismiss

V2 additions:
- AI-generated draft body using Claude Haiku (netlify function `ai-copy.js` already exists)
- Email send via Resend integration
- Scheduling: "Send tonight at 7pm" option

### Build complexity: M

Draft generation is templated JS. The bottom sheet component exists in admin. Snap card write function exists. Email send is tier-locked and deferred to V2. Estimated: 5–7 hours build + test.

---

## P2 — True Spotify pre-save

### What it does exactly

In pre-release mode, the fan-facing CTA changes from "Sign up for updates" to "Pre-save on Spotify." Tapping it initiates Spotify OAuth in a popup or redirect. After auth, ABLE calls the Spotify API to add the upcoming release to the fan's library (when it becomes available on release day). The fan's email is collected as part of the OAuth exchange — one step, two outcomes.

### V1 scope

V1: email collection with honest "Be first to know when it drops" framing. No fake pre-save button. Audit all "pre-save" copy — if there is no Spotify OAuth, the label must not say "Pre-save."

V2 scope (requires Supabase + Netlify functions):
- Spotify OAuth via PKCE (no client secret in browser)
- Netlify function handles token exchange
- Pre-save fulfilment cron on release day
- Fan email fallback if Spotify email is unavailable

### Build complexity: XL (V2 only)

Spotify OAuth, token storage, cron job scheduling, release-day fulfilment, error handling for expired tokens. Not a small project. V2, after Supabase is live. Estimated: 3–5 days.

---

## P2 — Fan location heatmap (summary spec)

Full spec deferred to V2 systems docs. Requires:
- Opt-in geolocation on fan sign-up form (`navigator.geolocation`, city-level only)
- Supabase geolocation column on `fans` table
- Server-side aggregation query (count fans by city, radius-based grouping)
- Admin map component (lightweight — consider Mapbox GL or a canvas-based solution)
- Tier gate: Artist Pro only

Copy in admin:
> "[X] of your fans are in [City]. [Y] in [City]."
> "Use this when you're routing a tour."

---

## P2 — Snap card read receipts (summary spec)

Full spec deferred to V2 systems docs. Requires:
- New event type: `able_card_views: [{ cardId, ts, source }]`
- Card view write on snap card visibility in viewport (IntersectionObserver)
- "Seen by [X]" display in admin snap card list
- Framing note: display as "X people read this" not "X impressions" — human, not metric

---

## P1 — "Tonight" draft automation (summary spec)

Bundled with one-tap release announcement as the same drafting infrastructure. Trigger is different (show date instead of release date) but the draft generation and bottom sheet pattern are identical.

Generates:
- Snap card draft: "Heading to [Venue] tonight. Doors at [time]. [City] — last few tickets." (editable)
- Instagram caption draft (editable)

Does not generate email (show-night emails should be sent earlier in the day — a separate automation).

Build complexity: S (shares all infrastructure with one-tap announcement).

---

## P1 — QR code for gig-mode URL (summary spec)

Build complexity: S.

- In admin, gig mode panel: "Download QR code" button appears when gig mode is active or a show is today.
- Uses `qrcode.js` (CDN, 15kB) to generate a canvas QR code in the browser.
- URL encoded: `ablemusic.co/[slug]?mode=gig` — triggers gig mode display regardless of current state.
- Canvas exported as PNG download. Artist sends to printer or shares digitally.
- On mobile: share sheet instead of download.

Copy:
> "Put this on your flyers. It takes people straight to tonight's show."

---

*All P0 features can be built with zero backend changes.*
*All P1 features require minor new UI only.*
*All P2 features require Supabase + Netlify functions.*


---
# FILE: docs/systems/launch-sequence/SPEC.md
---

# ABLE — Launch Sequence Specification
**Created: 2026-03-16 | Status: canonical**

> This is the how. ANALYSIS.md is the why. PATH-TO-10.md is the checklist.
> These are the four phases from nothing to public launch. Do not skip phases.

---

## Phase 0 — Founder's proof (James only)

**Duration:** 1 week (can be done in a weekend if focused)
**Goal:** A live, compelling artist page from the person building the platform. No shortcuts.

### What James builds

**His own ABLE page:**
- Real name, real bio written in his actual voice
- Real music or creative work (existing tracks, projects, whatever is live)
- Real shows if any, or a genuine snap card about what he's working on
- A real accent colour and vibe — not a test, a choice
- Hero CTAs that point to something real
- Fan sign-up live and functional

**Why it has to be real:**
You cannot show a placeholder to artists and ask them to trust you with their audience relationship. The founder's page is the product's first credibility signal. If James can build something he's proud to share, the product works. If he can't, there's something to fix before anyone else touches it.

### What James tests personally

Complete the full flow, end to end, from a fresh browser (no cached data):

1. Open landing.html — does it communicate clearly in under 10 seconds?
2. Tap the hero CTA — does start.html open cleanly?
3. Complete the onboarding wizard — does it feel like 5 minutes, not 15?
4. Land on able-v7.html — does the page look like something worth sharing?
5. Open admin.html — does the greeting feel right? Does the dashboard feel useful?
6. Set a campaign state — does the page update correctly?
7. Sign up as a fan (use a second browser or incognito) — does the sign-up work? Does the confirmation email arrive?
8. Check admin.html — does the fan appear in the list with the right source?
9. Activate gig mode — does the page switch state? Does the countdown appear?
10. Check the fan list source breakdown — does it show the right source?

Any failure on this list is a P0 bug. Fix it before inviting anyone else.

### The 5 real fans

Before Phase 1 starts, James signs up 5 real fans to his own page. These are real people — friends, genuine music listeners, people who would actually be interested. This is not a vanity metric. This is a test of:
- Whether the fan sign-up flow works end-to-end
- Whether the confirmation email arrives and sounds right
- Whether the source tracking is working
- Whether seeing real fan emails in admin.html gives the emotional response it should

"Your list. Your relationship." — that feeling only lands when the list is real.

### Identifying the 10 beta artists

Before Phase 0 closes, James writes a list of 10 real artists he knows personally or has a genuine warm connection to. The criteria:

**Required:**
- James can reach them directly (phone, DM, email — a real conversation, not a cold outreach)
- They are actively making music (releasing, gigging, or both)
- They have at least some social presence (doesn't need to be large — consistent matters more)
- They are honest people who will say what doesn't work, not just what's polite

**Preferred:**
- Genre variety — at least 4 different vibes from the 7-vibe system
- Some have an upcoming release or gig (tests campaign states with real data)
- At least 2 who are not based in the UK (tests international relevance)
- At least 1 who is less digitally fluent (tests onboarding for the non-technical user)

**The list is not a maybe list.** These are people James is confident will say yes when he reaches out personally. If he's not confident, they shouldn't be on the list.

---

## Phase 1 — Private beta (10 artists, 2 weeks)

**Duration:** 2 weeks
**Goal:** 10 live pages. 100 real fan sign-ups across all pages. Honest feedback. No public attention yet.

### Onboarding each artist

James walks each artist through ABLE personally. Not a video tutorial. Not documentation. A real conversation — either in person, on a call, or via voice note exchange. The goal is that each artist feels like James built this for them specifically, because in a meaningful sense he did.

**The onboarding conversation covers:**

1. "Here's what ABLE actually is." — One minute. Direct. The core truth: your link-in-bio that owns the relationship.
2. "Here's your page." — Open start.html together (or send the URL and be on a call while they complete it).
3. "Here's your dashboard." — Show them the 3 things that matter first: their live page URL, the campaign state, and the fan list.
4. "Here's how to tell me when something breaks." — Send the WhatsApp group link or Discord channel. Make it feel easy to report problems.
5. "Here's what I'm trying to learn." — Be honest. "I want to know: does this feel worth putting in your bio? Would you actually use this?"

**What James does NOT do at this stage:**
- Send a "getting started" email blast
- Ask them to post about ABLE publicly
- Offer any incentives or free upgrades as conditions for feedback
- Make them feel like they're doing James a favour (they're helping shape something real — that's the pitch)

### Running the 2-week beta

**Week 1:**
- All 10 artists onboarded by Day 5
- James checks admin.html for each artist's page (when Supabase is live this is aggregated — for now, he checks each page)
- Any bug reported: acknowledged within 4 hours, fixed within 48 hours
- Personal check-in with each artist at the end of Week 1: "How's it going? What's weird?"

**Week 2:**
- Weekly feedback prompt: voice note or message, 3 questions max:
  1. "What's the one thing you wish worked differently?"
  2. "Have you put the link in your bio yet? If not, what's stopping you?"
  3. "Have any of your fans signed up? What did they say about the page?"
- James logs every piece of feedback in a running doc
- Minimum 8 of 10 artists must have put the link live in their bio before Phase 2 starts

### Phase 1 success criteria (gates to Phase 2)

These must all be true before Phase 2 begins:

- [ ] All 10 artists have live pages
- [ ] At least 100 real fan sign-ups across all pages (10 per artist average)
- [ ] At least 3 artists have set a campaign state (pre-release, live, or gig)
- [ ] Average feedback score: "would you keep using this?" ≥7/10
- [ ] No P0 bugs outstanding (show-stopping, data loss, broken flows)
- [ ] At least 8 of 10 artists have put the ABLE link in their social bio
- [ ] James has fixed at least 3 things the beta artists flagged

If these criteria are not met at the end of 2 weeks, Phase 1 extends by 1 week. Phase 2 does not start until the criteria are met. No exceptions.

---

## Phase 2 — Soft launch (word of mouth, James's network)

**Duration:** 4 weeks
**Goal:** 50 live pages. 500 fan sign-ups. 1 paid upgrade.

### The "here's what I built" post

James writes one post about ABLE. It is not a product announcement. It is a founder story.

**What it covers:**
- Who James is (brief — not a bio, a human)
- What he noticed was broken in the world for independent artists
- What he built, and why
- A link to his own ABLE page (the proof)
- An invitation: "If you're a musician and this sounds like something you'd use, I'd love to show you."

**What it does not include:**
- Pricing
- Feature lists
- "Sign up now" energy
- Exclamation marks

**Where it goes:**
- James's own social (wherever he has a music-adjacent following — LinkedIn, Twitter/X, Instagram, TikTok, or wherever he is actually present)
- James's personal email list if one exists
- One music community where he is already a known voice (not a cold post — a community where he's been a participant)

**Tone reference:** Not "here's my startup." More like "here's what I've been working on at midnight for the last few months. It's finally ready to show."

### What the 10 beta artists do (if they want to)

By Phase 2, the 10 beta artists have had 2 weeks to form an opinion. If they're genuinely using the platform and find it useful, James asks them — individually, not in a group message — if they'd be comfortable sharing it with one or two other artists they know.

Not a referral programme. Not an incentive. A genuine "if you think a friend would benefit from this, I'd love to meet them."

This is the most powerful distribution channel at this stage — artist word of mouth is the trust network the product was built for.

### The "Made with ABLE" footer doing its job

Every free-tier artist page has an "ABLE" link in the footer. By Phase 2, with 50+ pages live, fans are discovering ABLE organically through artist pages for the first time. This is the passive loop.

Measure: check the source breakdown in analytics. Any `direct` traffic that arrives at landing.html or start.html without a referral source is likely this loop working. The "Made with ABLE" footer should eventually be the largest source channel.

### The first paid upgrade

Phase 2 success requires at least 1 artist to upgrade from free to a paid tier. This is not about revenue. It is proof that:
- The tier gates are working (artists can see what they're missing)
- The value proposition is legible at the upgrade moment
- Someone finds the product worth paying for

If no one upgrades during Phase 2, the tier gate experience needs to be audited. The gold lock pattern (blurred preview + specific value overlay) should be doing this work — if it isn't, the overlays are not specific enough about what the artist gets.

### Phase 2 success criteria (gates to Phase 3)

- [ ] 50 live artist pages
- [ ] 500 real fan sign-ups across platform
- [ ] 1 paid tier upgrade (any tier)
- [ ] "Made with ABLE" footer generating at least 5 inbound artist registrations (measurable via source)
- [ ] Average NPS from beta cohort: ≥50
- [ ] No P0 bugs outstanding
- [ ] At least 10 artists logging into admin.html at least once per week (retention signal)

---

## Phase 3 — Public launch (when the product is proven)

**Duration:** Ongoing
**Goal:** 200 live pages. 5,000 fan sign-ups. 50 paid upgrades. First music press coverage.

### The public launch moment

Phase 3 does not begin with a big announcement. It begins with the evidence that the product works. The announcement is the conclusion, not the beginning.

**What "proven" means:**
- 10 artists have been using ABLE consistently for at least 1 month
- The upgrade path is working (measurable conversion from free to paid)
- No critical bugs in the last 2 weeks
- The "Made with ABLE" footer is generating inbound consistently

**What Phase 3 adds:**
- Music press outreach (Music Ally Sandbox pitch — spec in GROWTH_STRATEGY.md)
- Producer seeding programme (20 producers, free Artist Pro for life — highest-ROI channel)
- Reddit organic presence (r/WeAreTheMusicMakers — helpful, not promotional)
- TikTok / Instagram: "here's how ABLE works" format (show the product, don't explain it)
- Product Hunt launch (coordinate with a phase 2 win — "50 artists already using it")

### The affiliate loop activates in Phase 3

By Phase 3, the referral system should be built. Every artist gets a unique referral link. 1 month free per artist they bring who converts to paid. This is the self-sustaining loop — the cost is zero until revenue already exists, because "1 month free" is only paid out on a converted paying artist.

### Success metrics at each milestone

| Milestone | Artists | Fan sign-ups | Paid upgrades | MRR |
|---|---|---|---|---|
| End of Phase 1 | 10 | 100 | 0 | £0 |
| End of Phase 2 | 50 | 500 | 10 | ~£90–190 |
| Phase 3 milestone 1 | 200 | 5,000 | 50 | ~£450–950 |
| Phase 3 milestone 2 | 500 | 15,000 | 150 | ~£1,350–2,850 |
| Job exit trigger | — | — | — | £5,000+ sustained for 3 months |

---

## What happens if it doesn't go to plan

**If Phase 1 stalls (artists not putting link in bio):**
The onboarding created friction, or the page isn't compelling enough, or the value proposition wasn't clear in the 1:1 conversation. Fix the onboarding wizard first. Then revisit the founder story — is it honest and specific enough?

**If Phase 2 produces no paid upgrades:**
The tier gates are not doing their job. Audit every gold lock overlay — are they specific? "You have 23 fans in Manchester. Upgrade to see who they are before your show there." vs. "Upgrade for advanced analytics." The former converts. The latter doesn't.

**If "Made with ABLE" footer generates no inbound:**
Either there isn't enough traffic to the artist pages yet, or the footer design is too subtle. Check: is the link visible? Is it on every free-tier page? Is the CTA clear? ("Built with ABLE · Your page is free →")

**If an artist's page breaks publicly:**
Fix it within 4 hours. Communicate with the artist directly. Do not let a broken page sit. An artist's bio link is the entry point for their audience — a broken page is a broken relationship, and that artist will leave and tell others.

---

## Founding artist email (Phase 1 personal outreach — exact copy)

This is the message James sends to each of the 10 founding artists. It is a personal message, not a broadcast. Send it individually. Every "you" in this copy refers to one specific person.

---

Subject: `something I've been building`

Hey [Name] —

It's James. I've been building something for the last few months and I think you might actually want to use it.

It's called ABLE. Here's the short version: it's a page that lives in your bio link and understands where you are in your cycle. Pre-release, drop day, gig night — the page adapts. Fans who land on it can sign up with their email, and those emails go directly to you. Not to a platform. Not to an algorithm. Yours.

I built it because I kept watching artists send people to Linktree and get nothing back. No contact details. No relationship. Just a tap and a bounce.

Your page is free to set up. It takes about 8 minutes. I'd love to set it up with you — call, voice note, whatever works. And I want your honest reaction: is this something you'd actually put in your bio?

[Link to start.html]

James

---

**Send conditions:**
- Personal message, not a template blast
- Only send to artists whose music James has genuinely listened to
- Do not send to more than 10 people at once (maintaining personal quality over quantity)
- Wait for at least a short response before sending the follow-up onboarding message

---

## Press intro (Phase 3 — music press cold outreach)

For use when approaching music industry press (Music Ally, DIY Magazine, Pitchfork UK, The Guardian Music, etc.) at Phase 3 launch. Adapt per publication.

---

Subject: `Independent artist tool — worth a look?`

Hi [Name] —

I'm James, founder of ABLE. I've built a free link-in-bio specifically for independent musicians — one that understands the artist's release cycle and owns the fan relationship for them, not for the platform.

The point of difference: when a fan signs up on an artist's ABLE page, the email address belongs to the artist. When the artist's account gets restricted on Instagram, the list survives. When the algorithm stops working, the list still works. That's the whole thesis.

We're [N] artists in, [N] fan sign-ups, and the first [N] paid upgrades have happened. The product is working. A few artists using it:

- [Artist name] — [brief description of their use case, with their permission]
- [Artist name] — [brief description]

I'm not looking for coverage yet — I'm reaching out because [publication name] covers independent artist tools seriously and I'd like to know if this is worth a longer conversation once we're a bit further along.

Happy to share access to a founder account if it's useful.

James

---

**Press outreach rules:**
- Never name-drop ABLE's competitors directly
- Only send when Phase 2 criteria are met (50 artists, 500 fans, 1 upgrade)
- Personalise the intro for each publication — generic pitches are ignored
- Do not use "disrupting" / "revolutionising" / "changing the game" in any press copy


---
# FILE: docs/systems/growth-loop/SPEC.md
---

# ABLE "Made with ABLE" Growth Loop — Canonical Spec
**Created: 2026-03-16 | Authority: primary**

> This is the single source of truth for the growth loop system: footer component, referral tracking, landing page personalisation, analytics, and artist visibility. The growth loop is ABLE's primary organic acquisition channel — every artist's profile is a passive ad for the platform.

---

## 1. Overview

The "Made with ABLE ✦" footer appears on every artist profile page (able-v7.html). When a fan taps it, they are sent to landing.html with the referring artist's slug as a URL parameter. Landing.html personalises its headline based on that slug. If the visitor completes the start.html wizard, their profile records which artist referred them.

This is the complete loop:

```
Artist profile (able-v7.html)
  Fan taps "Made with ABLE ✦"
         ↓
landing.html?ref=[artist-slug]
  "Nadia's fans are on ABLE. Create your free page →"
         ↓
start.html wizard
  sessionStorage carries referral through all screens
         ↓
Profile saved
  profile.referredBy = 'nadia' (artist slug)
         ↓
admin.html (new artist)
  Referral recorded
         ↓
admin.html (referring artist — Phase 1)
  "3 artists have signed up from your page"
```

---

## 2. Footer component

### HTML

```html
<footer class="able-footer">
  <a href="#" class="able-footer-link" id="able-footer-cta">
    Made with ABLE ✦
  </a>
</footer>
```

The `href` is set to `#` in HTML and overridden at runtime by `initFooterLink()` (see section 3). This ensures the link is never a broken hardcoded URL if the script fails — it simply doesn't navigate.

### CSS

```css
.able-footer {
  padding: 32px 20px 48px; /* bottom padding clears iOS home bar */
  text-align: center;
}

.able-footer-link {
  /* Typography */
  font-family: var(--font, 'DM Sans', sans-serif);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-decoration: none;

  /* Colour — muted, not promotional */
  color: var(--color-text-3);
  opacity: 0.6;

  /* Tap target: visual size is 11px but hit area must be 44px minimum */
  display: inline-block;
  padding: 14px 20px; /* 14px vertical + 11px font = ~39px, supplement with margin trick */
  margin: -14px -20px; /* counteract padding visually */
  min-height: 44px;
  line-height: 44px;

  /* Transition */
  transition: opacity 0.15s ease;
}

.able-footer-link:hover,
.able-footer-link:focus-visible {
  opacity: 1;
}

/* Theme overrides */
[data-theme="light"] .able-footer-link {
  color: var(--color-text-3); /* inherits dark-on-light text token */
  opacity: 0.5;
}

[data-theme="contrast"] .able-footer-link {
  color: rgba(255, 255, 255, 0.4);
  opacity: 1; /* opacity already baked in; do not stack */
}

[data-theme="glass"] .able-footer-link {
  color: rgba(255, 255, 255, 0.5);
  /* glass background may be dark or light depending on artwork — use white with low opacity as safe default */
}
```

### Why these design decisions

- **11px, 500 weight, 0.6 opacity**: the footer is attribution, not a CTA. It should be visible to the curious but invisible to the uninvested. It must not compete with the artist's content.
- **44px tap target**: required by the mobile-first rules in CLAUDE.md. The padding/negative-margin trick achieves the tap target size without changing the visual footprint.
- **No ABLE logo mark or wordmark**: the ✦ symbol in the text copy is the only brand element. Adding a logo would make the footer feel like a promotional banner on the artist's page — which contradicts ABLE's positioning.

---

## 3. Referral link injection

This script runs on able-v7.html at DOMContentLoaded. It reads the artist's slug from the profile data and builds the footer URL with the `?ref=` parameter.

```javascript
/**
 * initFooterLink()
 * Sets the "Made with ABLE ✦" footer href to include the artist's slug
 * as a referral parameter. Falls back to the plain landing URL if no
 * slug is available.
 *
 * Called once on DOMContentLoaded.
 */
function initFooterLink() {
  const footerLink = document.getElementById('able-footer-cta');
  if (!footerLink) return;

  // Also record a click event when the footer is tapped
  footerLink.addEventListener('click', () => {
    recordClick('Made with ABLE', 'footer', footerLink.href);
  });

  // Determine the artist slug
  // Priority: URL path slug > localStorage profile slug > no slug (fallback)
  let slug = null;

  // 1. Read from URL path: ablemusic.co/nadia → 'nadia'
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    slug = pathParts[pathParts.length - 1];
  }

  // 2. Fallback: read from localStorage profile
  if (!slug) {
    try {
      const profile = JSON.parse(localStorage.getItem('able_v3_profile') || 'null');
      if (profile && profile.slug) slug = profile.slug;
    } catch (e) {
      // localStorage unavailable or profile corrupt — use fallback URL
    }
  }

  // 3. Set the href
  const base = 'https://ablemusic.co/';
  footerLink.href = slug
    ? `${base}?ref=${encodeURIComponent(slug)}`
    : base;
}

document.addEventListener('DOMContentLoaded', initFooterLink);
```

### Notes
- `encodeURIComponent` on the slug handles any unusual characters in artist slugs safely.
- The `recordClick` call uses type `'footer'` — a new click type added in the growth loop spec. See section 6 for the analytics extension.
- The click event listener is added inside `initFooterLink` to ensure the href is set before any analytics event fires.

---

## 4. Landing page — referral detection and personalisation

### URL parameter detection

```javascript
/**
 * initReferralLanding()
 * Reads ?ref= from the landing page URL.
 * Stores referral in sessionStorage so it persists to start.html.
 * Personalises the headline if a ref is present.
 *
 * Called once on DOMContentLoaded in landing.html.
 */
function initReferralLanding() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');

  if (!ref) return; // No referral — show standard landing experience

  // Persist referral across the session so start.html can capture it
  sessionStorage.setItem('able_referral', ref);

  // Attempt to personalise the headline
  // Phase 1: use the slug itself (capitalise first letter as name approximation)
  // Phase 2 (Supabase): query artist name from API and replace
  personaliseHero(ref);
}

/**
 * personaliseHero(slug)
 * Replaces the landing page hero headline and sub-headline with
 * a referral-aware version.
 *
 * @param {string} slug  Artist slug from ?ref= parameter
 */
function personaliseHero(slug) {
  // Phase 1: derive a display name from the slug
  // 'nadia-rose' → 'Nadia Rose', 'the-1975' → 'The 1975'
  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Target elements — IDs defined in landing.html hero section
  const headline  = document.getElementById('landing-headline');
  const subline   = document.getElementById('landing-subline');
  const heroCta   = document.getElementById('landing-hero-cta');

  if (headline) {
    headline.textContent = `${displayName} is on ABLE.`;
  }

  if (subline) {
    subline.textContent = 'Create your own free page. It takes about 8 minutes.';
  }

  if (heroCta) {
    heroCta.textContent = 'Create your free page →';
    // href already points to start.html — no change needed
  }

  // Phase 2 (Supabase): replace displayName with actual artist name from DB
  // fetchArtistName(slug).then(name => { if (name) headline.textContent = `${name} is on ABLE.`; });
}

document.addEventListener('DOMContentLoaded', initReferralLanding);
```

### Headline copy

The personalised headline has been through copy review. The final form:

| Context | Headline | Sub-headline |
|---|---|---|
| With `?ref=nadia` | "Nadia is on ABLE." | "Create your own free page. It takes about 8 minutes." |
| With `?ref=the-1975` | "The 1975 is on ABLE." | "Create your own free page. It takes about 8 minutes." |
| No `?ref=` | Standard landing hero | Standard landing sub-headline |

**Copy alternatives considered and rejected:**

| Candidate | Why rejected |
|---|---|
| "You found ABLE through Nadia." | Presumptuous — the fan may have tapped the footer out of curiosity, not because of Nadia specifically. |
| "Nadia's fans are on ABLE. Create your page →" | Implies ABLE is a fan platform — confusing. The visitor is potentially an artist. |
| "Nadia uses ABLE. You should too." | "You should too" is marketing-speak. Avoid. |
| "Join Nadia on ABLE." | "Join" implies a social network. ABLE is not a social network. |

**"[Name] is on ABLE." is correct because:**
- It is a statement of fact, not a marketing claim
- It lets the visitor draw their own conclusion
- It acknowledges the referral without over-explaining it
- It is consistent with ABLE's direct, honest tone

---

## 5. Referral capture in start.html

The referral slug persists through the wizard via `sessionStorage`. On wizard completion, it is written into the profile as `referredBy`.

```javascript
/**
 * captureReferral()
 * Called at the start of start.html to check for a carried referral.
 * Returns the referring artist's slug, or null if none.
 *
 * @returns {string|null}
 */
function captureReferral() {
  return sessionStorage.getItem('able_referral') || null;
}

/**
 * saveProfile(profileData)
 * Called on wizard completion in start.html.
 * Merges referral data into the profile before saving.
 *
 * @param {Object} profileData  Wizard output
 */
function saveProfile(profileData) {
  const referral = captureReferral();

  const profile = {
    ...profileData,
    ...(referral ? { referredBy: referral } : {}),
    createdAt: Date.now(),
  };

  localStorage.setItem('able_v3_profile', JSON.stringify(profile));

  // Clear referral from sessionStorage after capture
  // (sessionStorage clears on tab close anyway, but explicit is cleaner)
  if (referral) sessionStorage.removeItem('able_referral');
}
```

### Data schema addition

The `able_v3_profile` object gains one optional field:

```javascript
// Existing able_v3_profile shape (partial)
{
  name:          string,
  slug:          string,
  bio:           string,
  accent:        string,
  theme:         string,
  stateOverride: string | null,
  // ... other fields ...

  // New — optional, present only for referred signups
  referredBy:    string | null, // artist slug of the referring artist
  createdAt:     number,        // Unix ms timestamp of profile creation — also new
}
```

`referredBy` maps 1:1 to a `referred_by` column in the Supabase `profiles` table when the backend lands.

---

## 6. Analytics — growth loop events

### New ClickType value

`'footer'` is added to the `ClickType` union:

```typescript
type ClickType =
  | 'platform'
  | 'cta'
  | 'snap'
  | 'presave'
  | 'support'
  | 'share'
  | 'event'
  | 'footer';  // NEW — "Made with ABLE ✦" tap
```

### New AnalyticsSource value

`'footer'` is added to `AnalyticsSource` to represent visitors who arrived at landing.html via an artist's footer link:

```typescript
type AnalyticsSource =
  | 'ig'
  | 'tt'
  | 'sp'
  | 'qr'
  | 'story'
  | 'direct'
  | 'email'
  | 'fan-dashboard'
  | 'twitter'
  | 'footer'  // NEW — visitor arrived via "Made with ABLE ✦" footer tap
  | 'other';
```

This value must also be added to the canonical `SOURCE_VALUES` array in `docs/systems/CROSS_PAGE_JOURNEYS.md` and the `detectSource()` function in `docs/systems/analytics/SPEC.md`.

### Source detection extension

In `detectSource()` (analytics/SPEC.md §2.2), add:

```javascript
// After existing ?src= check, before referrer fallback
// If visitor arrived from an ABLE artist profile page
if (referrer.includes('ablemusic.co/')) return 'footer';
```

Note: `?ref=` is a referral parameter (who referred), not a source parameter (where visitor came from). They are complementary, not overlapping.

### Growth loop click event (fired on able-v7.html)

```javascript
// Fired inside initFooterLink() click listener
recordClick('Made with ABLE', 'footer', footerLink.href);
```

This is visible in the artist's admin analytics breakdown — they can see how many fans tapped the footer.

### Platform-level attribution (future — requires Supabase)

When Supabase is live:

```sql
-- Count signups referred by each artist
select
  p.slug        as referring_artist,
  p.name        as referring_artist_name,
  count(r.id)   as referred_signups
from profiles p
join profiles r on r.referred_by = p.slug
group by p.slug, p.name
order by referred_signups desc;
```

This is the "top referring artists" leaderboard — relevant for Phase 2 artist incentive evaluation.

---

## 7. Artist visibility — referred signups in admin.html (Phase 1)

Artists should know their page is generating growth. This is a signal of value, not a financial incentive.

### Admin nudge copy

When `referredSignups > 0`, show a nudge in the admin Fans section:

```
[artists-referred nudge]
"[N] artist[s] [has/have] created [their/a] page after visiting yours."
```

Examples:
- 1 signup: "1 artist has created a page after visiting yours."
- 3 signups: "3 artists have created their pages after visiting yours."

**Copy note:** "after visiting yours" is accurate and modest. It does not say "because of you" (too causal) or "inspired by you" (sentimental). The fact speaks for itself.

### Admin stat card (Phase 2)

A small stat in the "Your impact" section of admin — not a hero metric, but visible:

```
[Referrals card]
Label:  "Pages started from yours"
Value:  [N]
Delta:  "+[N] this month"
```

This card is only shown once `referredSignups >= 1`. Zero state: not shown — the card appearing for the first time is itself the milestone signal.

---

## 8. Edge cases and failure handling

| Scenario | Behaviour |
|---|---|
| Artist slug not available (no profile in localStorage, URL has no path slug) | Footer link points to `https://ablemusic.co/` without `?ref=` — no referral tracked, no broken link |
| Visitor taps footer from a slow connection | `initFooterLink()` is synchronous and runs at DOMContentLoaded — should always complete before tap is possible |
| `?ref=` contains an invalid/non-existent slug | Phase 1: `personaliseHero()` still runs with capitalised slug — display name may look odd but no crash. Phase 2: Supabase query returns null, fall back to generic headline |
| Multiple `?ref=` params in URL | `URLSearchParams.get('ref')` returns the first value. Subsequent values ignored. Acceptable. |
| Fan taps footer after already having visited landing.html with a different `?ref=` | `sessionStorage.setItem` overwrites the previous referral. The most recent referral wins. |
| Artist views their own profile (edit preview) | Footer link is visible and functional in preview. Click is tracked as `type: 'footer'` in `able_clicks`. Artist clicks are tagged `isArtist: true` on views but click events are not filtered — this is acceptable (artist testing their own footer is a meaningful signal). |
| start.html is opened directly without a `?ref=` session value | `captureReferral()` returns null. `referredBy` is omitted from profile. No error. |

---

## 9. What this spec does not cover

| Out of scope | Rationale |
|---|---|
| Artist directory (browsable grid of ABLE artists) | Requires Supabase — Phase 2 |
| "Artists like this" similar-artist strip on referred landing | Requires genre-clustered Supabase query — Phase 2 |
| Referral reward system (credits, discounts) | Deliberate V1 omission — re-evaluate if organic growth plateaus |
| "I'm on ABLE ✦" first-person variant of footer copy | Requires artist opt-in — evaluate after V1 ships |
| Growth loop for freelancer profiles (freelancer.html) | Phase 2 — freelancer profile spec not started |
| Fan.html "Made with ABLE ✦" footer | fan.html is an internal page — no growth loop footer needed |

---

## 10. Relation to other system docs

| Doc | Relationship |
|---|---|
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | Add `'footer'` to `SOURCE_VALUES`. Update data flow table for landing.html (writes `able_referral` to sessionStorage). |
| `docs/systems/analytics/SPEC.md` | Add `'footer'` to `ClickType` and `AnalyticsSource`. Add referrer-based footer detection in `detectSource()`. |
| `docs/systems/data-architecture/SPEC.md` | Add `referredBy` and `createdAt` fields to `able_v3_profile` schema. |
| `docs/pages/landing/DESIGN-SPEC.md` | Add `id="landing-headline"`, `id="landing-subline"`, `id="landing-hero-cta"` to hero section elements. Document `initReferralLanding()` call. |
| `docs/pages/admin/DESIGN-SPEC.md` | Add "Pages started from yours" stat card (Phase 1 nudge, Phase 2 card). |


---
# FILE: docs/systems/legal-compliance/PATH-TO-10.md
---

# ABLE — Legal/Compliance: Path to 10
**Created: 2026-03-16 | System: Legal / Compliance**

---

## Priority levels

- **P0** — Pre-launch blockers. Do not collect real fan emails without these.
- **P1** — Pre-scale. Required before any marketing or paid tier launch.
- **P2** — Pre-payment. Required before Stripe integration.
- **P3** — Future. Requires legal counsel or external audit.

---

## P0 — Must be done before real users

### P0.1 — GDPR consent disclosure on fan sign-up form

**File:** `able-v7.html` — the fan sign-up section
**Exact location:** Search for the fan email `<input>` element in able-v7.html. Add the consent paragraph immediately after the input field and before the submit button. It must be visible without any scrolling within the sign-up form.

**This is not a checkbox. It is a disclosure paragraph.** UK GDPR and PECR accept the act of typing an email and tapping a clearly-labelled submit button as a valid affirmative act, provided the purpose is stated clearly and specifically before the button is tapped. A checkbox is only required if the consent is bundled with other purposes (e.g., signing up AND agreeing to a newsletter). Here the purpose is single and clear: the artist will contact you about their music.

**Exact HTML to add (3 lines):**
```html
<p class="signup-consent" style="font-size:11px;color:rgba(255,255,255,0.5);margin:8px 0 0;text-align:center;line-height:1.4;">
  By signing up, <span class="consent-artist-name">this artist</span> can contact you about their music.
  They own your contact details — ABLE stores them on their behalf. Unsubscribe anytime.
</p>
```

**JavaScript to populate the artist name (add near the sign-up form initialisation):**
```javascript
(function() {
  var p = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  var els = document.querySelectorAll('.consent-artist-name');
  els.forEach(function(el) { if (p.name) el.textContent = p.name; });
})();
```

**Updated fan record on submit — add these fields to whatever object is being pushed to `able_fans`:**
```javascript
optIn:          true,
consentVersion: '2026-03-16',   // ISO date of this consent copy — update if copy changes
consentSource:  'profile-signup-' + (source || 'direct'),
```

**What this achieves:** Every fan record written after this change has a documented consent timestamp (the `ts` field), the version of the copy they saw, and their opt-in status. This is the minimum for a valid UK GDPR consent record.

**Ticket:** `p0-gdpr-consent-form`

---

### P0.2 — Privacy policy page

**File to create:** `/privacy.html`

The full policy copy is in `SPEC.md §2` — use it verbatim. Do not paraphrase it.
Static page, ABLE header (wordmark only), no nav, no artist-specific content.

**Key clauses that must appear (do not omit any of these):**
1. What is collected: email address, sign-up timestamp, source attribution — and nothing else
2. Who controls it: the artist, not ABLE (ABLE is processor; artist is controller)
3. Purpose: artist sends updates about their music — that is the only stated purpose
4. Access: only the artist; ABLE staff only on technical support request
5. Retention: until artist deletes account or fan requests deletion
6. Rights: access, erasure, portability, objection — contact `privacy@ablemusic.co`
7. Right to complain: ico.org.uk
8. Third-party embeds: Spotify/YouTube may set cookies when embeds are loaded
9. Last updated: `[DATE]` — replace with actual publication date

**Footer link to add to these 4 files:**
```html
<a href="/privacy.html" style="color:inherit;opacity:0.5;text-decoration:none;">Privacy</a>
```

Add to: `able-v7.html`, `admin.html`, `start.html`, `landing.html`

**After this page is live, the privacy contact address `privacy@ablemusic.co` must be monitored. A fan who emails it requesting erasure has a 30-day legal deadline.**

**Ticket:** `p0-privacy-page`

---

### P0.3 — Unsubscribe in all outbound emails

**File:** `netlify/functions/fan-confirmation.js` (when Resend is wired)

Every email template in `docs/systems/email/SPEC.md` already includes the unsubscribe footer. When Resend is connected, ensure:

1. Resend unsubscribe header is set: `List-Unsubscribe` header included in all sends
2. Unsubscribe webhook endpoint exists: `netlify/functions/fan-unsubscribe.js`
3. Webhook sets `unsubscribedAt` on the fan record

**Ticket:** `p0-unsubscribe-webhook`

---

## P1 — Pre-scale / pre-paid-tier

### P1.1 — Terms of service page

**File to create:** `/terms.html`

The full terms copy is in `SPEC.md §3` — use it verbatim.
Same design approach as `/privacy.html`: ABLE header (wordmark), no nav, no artist-specific content.

**The 10 key clauses that must appear in the terms — do not omit any:**

1. **ABLE is a tool, not a publisher.** "ABLE provides infrastructure. Artists provide content. ABLE does not editorially control what artists post."
2. **Artist content responsibility.** Artists agree: no illegal content, they own/have rights to all uploaded material.
3. **Fan data ownership.** "When a fan signs up on your ABLE page, they are giving their contact details to you, not to ABLE. ABLE stores those details on your behalf."
4. **Artist's data protection obligation.** "You are responsible for complying with data protection law when contacting your fans."
5. **ABLE's 0% cut.** "ABLE takes 0% of any transactions between you and your fans. Stripe's processing fee applies (typically 1.4% + 20p for UK/EU cards). ABLE receives none of it."
6. **Subscription fees.** "Free: £0. Artist: £9/mo. Artist Pro: £19/mo. Label: £49/mo."
7. **Service availability.** "No uptime guarantee on free tier. We will notify you before any material changes to the service."
8. **Prohibited content.** "ABLE will remove content that is illegal under UK law, infringes third-party intellectual property, or is reported and verified as harmful."
9. **Governing law.** "England and Wales."
10. **Changes to terms.** "We will notify you by email at least 14 days before material changes take effect. Continued use constitutes acceptance."

**Footer link to add alongside Privacy:**
```html
<a href="/terms.html" style="color:inherit;opacity:0.5;text-decoration:none;">Terms</a>
```

Add to: `able-v7.html`, `admin.html`, `start.html`, `landing.html`

**Ticket:** `p1-terms-page`

---

### P1.2 — Data deletion request flow

**What:** A live email address `privacy@ablemusic.co` that someone on the ABLE team monitors. Process documented in `SPEC.md §6`.

No automation required at this stage — manual process is sufficient below 1,000 users.

**The fan deletion SQL query — must be tested before launch, not after:**

When a fan emails `privacy@ablemusic.co` requesting erasure (GDPR Right to Erasure), this is the query that must be run in Supabase against the `fans` table. It performs a soft delete: all PII fields are nulled, the row is retained for audit purposes, and `deleted_at` is set.

```sql
-- GDPR Right to Erasure — run for each artist_id that holds a record for this email
-- Replace 'fan@example.com' with the actual requesting fan email
-- Run in Supabase SQL editor or via admin Netlify function

UPDATE fans
SET
  email           = NULL,
  name            = NULL,
  notes           = NULL,
  tags            = '{}',
  deleted_at      = NOW(),
  optIn           = FALSE,
  unsubscribedAt  = NOW()
WHERE email = 'fan@example.com'
  AND deleted_at IS NULL;

-- Verify the deletion:
SELECT id, email, deleted_at FROM fans
WHERE id IN (
  SELECT id FROM fans WHERE email IS NULL AND deleted_at IS NOT NULL
  ORDER BY deleted_at DESC LIMIT 10
);
```

**In localStorage phase (pre-Supabase):** Run this JavaScript in the browser console on the artist's admin page:

```javascript
// localStorage phase erasure — replaces the record with a tombstone
var fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
var email = 'fan@example.com'; // replace with actual email
fans = fans.map(function(f) {
  if (f.email === email) {
    return { deleted_at: Date.now(), optIn: false }; // PII stripped
  }
  return f;
});
localStorage.setItem('able_fans', JSON.stringify(fans));
// Also remove from starred list:
var starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
localStorage.setItem('able_starred_fans', JSON.stringify(starred.filter(function(e) { return e !== email; })));
console.log('Done. Record tombstoned for: ' + email);
```

**Response to the fan:** Must be sent within 30 days. Template:

```
Subject: Your data deletion request — ABLE

Hi,

Your contact details have been removed from ABLE's systems. The artist you signed up with no longer has access to your email address.

If you signed up with multiple artists on ABLE and would like your data removed from all of them, reply to this email with the artist names or page URLs.

ABLE Labs Ltd · privacy@ablemusic.co
```

**Ticket:** `p1-deletion-request-flow`

---

### P1.3 — Fan ownership note in admin.html

The admin DESIGN-SPEC already includes this copy:

```html
<p class="fan-ownership-note">
  These emails are yours. ABLE never contacts your fans without your permission.
</p>
```

Verify this is implemented in `admin.html` — it is both a trust signal and a legal statement.

**Ticket:** `p1-fan-ownership-note-verify`

---

### P1.4 — CAN-SPAM physical address in email footer

**When:** Before sending any emails to US-based fans, or when ABLE Labs Ltd is incorporated with a registered address.

Update the email footer template:

```
—

Powered by ABLE · ablemusic.co
ABLE Labs Ltd · [registered address]
[Unsubscribe]
```

**Ticket:** `p1-can-spam-address`

---

## P2 — Pre-payment (before Stripe)

### P2.1 — Cookie assessment for Supabase auth

When Supabase auth (`signInWithOtp`) is added, determine whether session tokens are stored in cookies or localStorage:

- If cookies: document in privacy policy under "Cookies" section. Strictly necessary — no banner required.
- If localStorage: no change required.

Supabase JS client v2 uses localStorage by default for session persistence. Confirm this remains the case when auth is wired.

**Ticket:** `p2-supabase-auth-cookie-audit`

---

### P2.2 — Stripe SCA compliance

When Stripe is integrated:

- Use Stripe Payment Intents API (not legacy Charges API) — this enables automatic SCA/3DS2
- Do not use Stripe Checkout if customisation is required; use Stripe Elements
- ABLE's liability: SAQ-A PCI tier (no card data touches ABLE servers)
- Document in terms of service: billing terms, refund policy, what subscription fees cover

**Ticket:** `p2-stripe-sca-compliance`

---

### P2.3 — Stripe Connect for fan-to-artist payments

When artist support packs (fan tipping) or direct sales are added:

- Use Stripe Connect (Express accounts) so fan payments go directly to artist's bank
- ABLE never holds artist money
- Platform fee: 0% (ABLE's model)
- Stripe Connect Express: artist onboards via Stripe's hosted flow
- Update terms of service: "ABLE is not a payment processor. Payments are processed by Stripe."

**Ticket:** `p2-stripe-connect`

---

## P3 — Future (requires external counsel)

### P3.1 — GDPR Data Protection Impact Assessment (DPIA)

**When:** Before processing data at scale (10,000+ fans in the system), or before adding any features that involve sensitive data (location, listening behaviour, financial data).

A DPIA is required under GDPR Article 35 when processing is likely to result in a high risk to individuals. The fan data ABLE holds is not inherently high-risk, but a DPIA should be performed before:
- Building the fan.html location feature
- Adding any AI or profiling features
- Cross-referencing fan data across artists

**Ticket:** `p3-dpia`

---

### P3.2 — Data Processing Agreement (DPA) template

**When:** Before any enterprise or Label tier customers sign up.

ABLE is a data processor for artists (the data controllers). A formal DPA must be offered to artists at Label tier. This sets out:
- ABLE's obligations as processor
- Sub-processors ABLE uses (Supabase, Resend, Netlify)
- International transfer safeguards (if any data leaves the UK/EEA)
- Breach notification obligations

**Ticket:** `p3-dpa-template`

---

### P3.3 — ICO registration

ABLE Labs Ltd should register with the Information Commissioner's Office (ICO) as a data controller. This is required for any UK organisation that processes personal data, with limited exemptions.

Fee: £40/year (Tier 1 for small organisations).

**Ticket:** `p3-ico-registration`

---

### P3.4 — Full GDPR audit

**When:** Before Series A fundraising or any enterprise client due diligence.

Engage a GDPR specialist (not a law firm — a specialist privacy consultant is more cost-effective). Audit covers:
- Consent mechanisms
- Data flows
- Sub-processor agreements
- Retention schedules
- DSAR (Data Subject Access Request) process
- Breach response plan

This is what takes the score from 8.5/10 to 10/10.

**Ticket:** `p3-gdpr-audit`

---

## Score trajectory

| Stage | Score | Key gap remaining |
|---|---|---|
| Current | 2/10 | No consent line, no privacy policy, no terms |
| P0 complete | 6/10 | Terms of service, physical address, DPA |
| P1 complete | 7.5/10 | Stripe compliance, cookie audit |
| P2 complete | 8/10 | External audit, ICO registration, DPA |
| P3 complete | 9.5/10 | GDPR audit by external counsel |
| External audit | 10/10 | Requires real legal review |


---
# FILE: docs/pages/profile/DESIGN-SPEC.md
---

# ABLE Artist Profile — Design Specification
**File: `able-v7.html` | Created: 2026-03-16**
**Authority score: 9.7/10 | Build target**

> This is the canonical implementation reference for `able-v7.html`. A developer should be able to build the page from this document alone. Cross-reference `SPEC.md` (product purpose), `COPY.md` (all copy strings), `PATH-TO-10.md` (P0/P1/P2 gaps), and `USER-JOURNEYS.md` (interaction flows) for fuller context.

---

## 1. SURFACE CLASSIFICATION

| Property | Value |
|---|---|
| File | `able-v7.html` |
| Surface type | Fan-facing artist profile — public, shareable URL |
| Viewport primary | 390px (iPhone 14 baseline) |
| Viewport minimum | 375px (iPhone SE — no horizontal scroll at this width) |
| Viewport maximum | 430px app shell (`max-width: 430px`) centred on desktop |
| Desktop behaviour | Phone shell centred on dark surround (`background: #050505`) with `box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 32px 120px rgba(0,0,0,0.9)` |
| Scroll model | Single scroll container (`#scroll-container`), `overflow-y: auto`, hidden scrollbar, `overscroll-behavior-y: contain` |
| Rendering source | `localStorage` (immediate) → Supabase (when backend lands). Never wait for API on first paint. |
| Themes | 4: Dark (default), Light, Glass, Contrast |
| Vibes | 7: electronic, hiphop, rnb, indie, pop, rock, acoustic |
| Campaign states | 4: profile, pre-release, live, gig (+ post-gig sub-state) |
| Owner detection | `localStorage` profile owner match — shows edit pill, dashed rings, owner bar |
| Minimum tap target | 44px (`--tap-min`) |
| iOS safe areas | `env(safe-area-inset-top/bottom)` applied at status bar and scroll container padding |

---

## 2. DESIGN TOKENS

### 2.1 Static tokens (`:root`)

These are always present regardless of theme or vibe.

```css
/* Spacing scale */
--sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
--sp-5: 20px;  --sp-6: 24px;  --sp-8: 32px;  --sp-10: 40px;
--sp-12: 48px; --sp-16: 64px;

/* Minimum tap target */
--tap-min: 44px;

/* Typography scale */
--text-xs:   11px;
--text-sm:   13px;
--text-base: 15px;
--text-lg:   17px;
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  32px;
--text-4xl:  40px;
--text-hero: clamp(48px, 14vw, 80px);

/* Line heights */
--lh-tight:   0.88;
--lh-display: 1.0;
--lh-body:    1.5;
--lh-label:   1.2;

/* Border radii (defaults — overridden by vibe r-mult) */
--r-pill: 999px;
--r-sm:   8px;
--r-md:   12px;
--r-lg:   20px;
--r-xl:   28px;

/* Letter spacing defaults (overridden per vibe) */
--ls-d:     0em;
--ls-label: 0.12em;

/* Easing curves */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* spring bounce */
--ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94); /* deceleration */
--ease-accel:    cubic-bezier(0.55, 0, 1, 0.45);       /* acceleration */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);    /* Material standard */

/* Durations */
--dur-instant: 80ms;
--dur-fast:    150ms;
--dur-mid:     250ms;  /* overridden per vibe */
--dur-slow:    400ms;
--dur-xslow:   600ms;

/* Campaign state colours */
--color-state-pre:  #fbbf24;   /* Amber — pre-release chip */
--color-state-live: #ef4444;   /* Red — live chip + error */
--color-state-gig:  #8b1e1e;   /* Dark red — gig chip */
--color-state-prof: #06b6d4;   /* Cyan — profile chip (unused in UI) */

/* Ambient colour (extracted from artwork via canvas) */
--color-ambient: 0, 0, 0;      /* RGB triplet, no spaces in value */

/* Accent defaults (overridden by applyDerivedTokens() from profile.accent) */
--color-accent:        #e07b3a;
--color-accent-rgb:    224, 123, 58;
--color-accent-glow:   rgba(224, 123, 58, 0.30);
--color-accent-soft:   rgba(224, 123, 58, 0.10);
--color-accent-subtle: rgba(224, 123, 58, 0.12);
--color-on-accent:     #ffffff;           /* text on accent fill */

/* Tab bar height */
--tab-bar-height: 64px;

/* Background effect controls */
--bg-blur:       40px;
--bg-brightness: 0.45;
--bg-opacity:    1;
```

### 2.2 Theme tokens (`[data-theme]`)

Applied to `#app-shell` via `data-theme` attribute.

#### Dark (default)
```css
--color-bg:          #0a0b10;
--color-surface:     #0f1018;
--color-card:        #16161e;
--color-card-raised: #1e1e2a;
--color-border:      rgba(255,255,255,0.065);
--color-text:        #f0ede8;
--color-text-2:      rgba(240,237,232,0.60);
--color-text-3:      rgba(218,213,207,0.45);
--color-overlay:     rgba(10,11,16,0.82);
--shadow-card:       0 4px 28px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04);
--color-panel:       #1a1a24;   /* solid — edit drawers */
--color-panel-raised:#22222e;
--color-panel-text:  #f0ede8;
```

#### Light
```css
--color-bg:          #f5f2ec;
--color-surface:     #ede9e2;
--color-card:        #ffffff;
--color-card-raised: #f8f5f2;
--color-border:      rgba(0,0,0,0.08);
--color-text:        #0d0e1a;
--color-text-2:      rgba(13,14,26,0.60);
--color-text-3:      rgba(13,14,26,0.38);
--color-overlay:     rgba(245,242,236,0.90);
--shadow-card:       0 2px 16px rgba(0,0,0,0.07);
--color-panel:        #ffffff;
--color-panel-raised: #f8f5f2;
--color-panel-text:   #0d0e1a;
--color-on-accent:    #0d0e1a;   /* override — dark text on accent in light theme */
```

#### Glass
```css
--color-bg:          transparent;   /* relies on #profile-bg behind shell */
--color-surface:     rgba(255,255,255,0.06);
--color-card:        rgba(255,255,255,0.08);
--color-card-raised: rgba(255,255,255,0.12);
--color-border:      rgba(255,255,255,0.14);
--color-text:        #f0ede8;
--color-text-2:      rgba(240,237,232,0.75);
--color-text-3:      rgba(240,237,232,0.55);
--backdrop:          blur(28px) saturate(180%);
--color-panel:       #1a1a24;   /* solid dark — editing must be readable */
--color-panel-raised:#22222e;
--color-panel-text:  #f0ede8;
```
**Critical:** Glass requires `profile.artworkUrl` to be set. Without artwork, JS falls back to `dark`. `#app-shell` is `background-color: transparent`; `#profile-bg` (fixed, behind shell) carries the blurred artwork. Iframes need explicit wrapper `backdrop-filter` — the CSS property does not propagate into iframes.

#### Contrast
```css
--color-bg:          #000000;
--color-surface:     #0a0a0a;
--color-card:        #111111;
--color-card-raised: #1a1a1a;
--color-border:      rgba(255,255,255,0.2);
--color-text:        #ffffff;
--color-text-2:      rgba(255,255,255,0.85);
--color-text-3:      rgba(255,255,255,0.65);
--shadow-card:       0 2px 16px rgba(0,0,0,0.8);
--color-panel:       #111111;
--color-panel-raised:#1a1a1a;
--color-panel-text:  #ffffff;
```
**Critical:** Contrast theme sets duration tokens to near-zero for all decorative animations (see §7 Animation). State-change transitions (80ms) remain.

### 2.3 Accent token derivation

`applyDerivedTokens(accentHex)` is called by JS on profile load. It:
1. Parses `accentHex` to RGB components
2. Sets `--color-accent`, `--color-accent-rgb`, `--color-accent-glow`, `--color-accent-soft`, `--color-accent-subtle`
3. Calculates luminance → sets `--color-on-accent` to `#000` or `#fff`
4. Sets `--cta-text-color` for buttons (matches on-accent)
5. Derives `--r-sm`, `--r-md`, `--r-lg`, `--r-xl` from a `r-mult` per vibe (CSS `calc()` with custom properties is unreliable for radius multiplication — JS sets px values directly)

---

## 3. TYPOGRAPHY SCALE

All elements in the file. `var(--font-d)` is set by vibe (see §4).

| Element | Font | Size | Weight | Style | Transform | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|---|
| Body / base | DM Sans | `--text-base` 15px | 400 | normal | none | — | `--lh-body` 1.5 |
| Artist name (hero) | `--font-d` | `--text-hero` clamp(48px, 14vw, 80px) | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | `--lh-tight` 0.88 |
| Artist name (sticky bar) | `--font-d` | 18px | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | 1 |
| Artist initials fallback | `--font-d` | clamp(72px, 20vw, 108px) | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | — |
| Hero meta tags | DM Sans | 11px | 600 | normal | uppercase | 0.16em | `--lh-label` 1.2 |
| Hero copy-link pill | DM Sans | 10px | 500 | normal | none | 0.04em | — |
| Hero state chip | DM Sans | `--text-xs` 11px | 600 | normal | uppercase | 0.08em | — |
| Primary CTA (`.btn-primary`) | DM Sans | `--text-sm` 13px | 700 | normal | uppercase | 0.08em | — |
| Secondary CTA (`.btn-secondary`) | DM Sans | `--text-xs` 11px | 600 | normal | uppercase | 0.08em | — |
| Bio text | DM Sans | `--text-base` 15px | 400 | normal | none | — | 1.65 |
| Bio expand button | DM Sans | `--text-sm` 13px | 500 | normal | none | 0.02em | — |
| Section title | `--font-d` | clamp(32px, 9vw, `--text-4xl` 40px) | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | 0.95 |
| Section action link | DM Sans | `--text-xs` 11px | 600 | normal | uppercase | 0.08em | — |
| Platform pills label | DM Sans | `--text-sm` 13px | 500 | normal | none | 0.01em | — |
| Platform pills section label | DM Sans | 10px | 600 | normal | uppercase | 0.22em | — |
| Overflow more button | DM Sans | `--text-sm` 13px | 600 | normal | none | 0.02em | — |
| Release card title | DM Sans | `--text-lg` 17px | 700 | normal | none | — | 1.2 |
| Release card meta | DM Sans | `--text-xs` 11px | 400 | normal | uppercase | 0.06em | — |
| Release type badge | DM Sans | 8px | 700 | normal | uppercase | 0.04em | — |
| Release stream/watch btn | DM Sans | 10px | 700 | normal | none | — | — |
| Credits toggle | DM Sans | `--text-sm` 13px | 500 | normal | none | 0.04em | — |
| Credit item name | DM Sans | `--text-sm` 13px | 600 | normal | none | — | — |
| Credit item role | DM Sans | `--text-sm` 13px | 400 | normal | none | — | — |
| Show item month | DM Sans | 10px | 700 | normal | uppercase | 0.14em | — |
| Show item day | `--font-d` | `--text-3xl` 32px | `--font-d-weight` | normal | `--font-d-transform` | `--ls-d` | 1 |
| Show item venue | DM Sans | `--text-base` 15px | 700 | normal | none | — | — |
| Show item city | DM Sans | `--text-sm` 13px | 400 | normal | none | 0.01em | — |
| Show item time | DM Sans | `--text-xs` 11px | 400 | normal | none | 0.04em | — |
| Tonight badge | DM Sans | 9px | 900 | normal | uppercase | 0.08em | — |
| Fan capture heading | `--font-d` | `--text-3xl` 32px | `--font-d-weight` | `--font-d-style` | `--font-d-transform` | `--ls-d` | 0.95 |
| Fan capture subtext | DM Sans | `--text-sm` 13px | 400 | normal | none | — | 1.6 |
| Fan capture input | DM Sans | 16px | 400 | normal | none | — | — |
| Fan capture trust line | DM Sans | `--text-xs` 11px | 400 | normal | none | 0.02em | — |
| Fan capture echo text | DM Sans | `--text-sm` 13px | 500 | normal | none | — | — |
| Fan capture echo confirm | DM Sans | `--text-xs` 11px | 400 | normal | none | — | — |
| Snap card title | DM Sans | `--text-sm` 13px | 700 | normal | none | — | `--lh-body` 1.5 |
| Snap card text | DM Sans | `--text-sm` 13px | 400 | normal | none | — | `--lh-body` 1.5 |
| Snap card CTA | DM Sans | `--text-sm` 13px | 600 | normal | none | 0.02em | — |
| Merch item title | DM Sans | `--text-sm` 13px | 600 | normal | none | — | — |
| Merch item price | DM Sans | `--text-xs` 11px | 600 | normal | none | — | — |
| Support pack label | DM Sans | `--text-base` 15px | 600 | normal | none | — | — |
| Support pack desc | DM Sans | `--text-sm` 13px | 400 | normal | none | — | 1.45 |
| Support pack price | DM Sans | `--text-base` 15px | 700 | normal | none | — | — |
| Rec item name | DM Sans | base | 600 | normal | none | — | — |
| Rec item genre | DM Sans | `--text-sm` 13px | 400 | normal | none | — | — |
| Made with ABLE footer | DM Sans or Plus Jakarta Sans | 12px | 600 | normal | none | — | — |
| Tab bar labels | DM Sans | `--text-xs` 11px | 500 | normal | uppercase | 0.04em | — |

**Input font-size note:** `fan-capture__input` uses `font-size: 16px` explicitly. iOS Safari zooms the viewport on any `<input>` with `font-size < 16px`. Do not reduce this below 16px.

---

## 4. VIBE SYSTEM

### 4.1 Vibe definitions

Applied as `data-vibe` on `#app-shell`. CSS sets font and letter-spacing. JS sets accent suggestion, radius multiplier, and motion personality.

| Vibe | Display font | Weight | Style | Transform | `--ls-d` | `--ls-label` | `--dur-mid` | Spring character |
|---|---|---|---|---|---|---|---|---|
| `electronic` | Barlow Condensed | 700 | normal | uppercase | 0.06em | 0.22em | 180ms | Tight, mechanical — `cubic-bezier(0.34, 1.28, 0.64, 1)` |
| `hiphop` | Oswald | 700 | normal | uppercase | 0.04em | 0.28em | 200ms | Punchy, confident — `cubic-bezier(0.34, 1.40, 0.64, 1)` |
| `rnb` | Cormorant Garamond | 600 | italic | none | 0.02em | 0.12em | 320ms | Smooth, lingers — `cubic-bezier(0.34, 1.52, 0.64, 1)` |
| `indie` | Space Grotesk | 700 | normal | none | -0.01em | 0.08em | 260ms | Natural, unhurried — `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `pop` | Barlow Condensed | 700 | normal | none | 0.03em | 0.16em | 220ms | Bright, bouncy — `cubic-bezier(0.34, 1.72, 0.64, 1)` |
| `rock` | Oswald | 700 | normal | uppercase | 0.08em | 0.2em | 190ms | Aggressive, direct — `cubic-bezier(0.34, 1.20, 0.64, 1)` |
| `acoustic` | Lora | 700 | normal | none | 0.01em | 0.10em | 350ms | Organic, barely any overshoot — `cubic-bezier(0.34, 1.10, 0.64, 1)` |

**Font loading strategy (P2):** Load DM Sans and Barlow Condensed eagerly. Load vibe-specific fonts on demand after `applyIdentity()` resolves the artist's vibe — not in the initial `<link>` stylesheet URL. Prevents ~200ms unused font load on non-electronic/pop vibes.

### 4.2 Feel quadrant modifiers

Applied as `data-feel` on `#app-shell`. These are deltas on top of vibe defaults — they shift weight, radius, duration, and easing.

| Feel | `--font-display-weight` | `--r-card` | `--dur-norm` | `--ease-primary` |
|---|---|---|---|---|
| `intimate-raw` | 500 | 4px | 150ms | No spring: `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `intimate-refined` | 400 | 12px | 600ms | Deceleration: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `bold-raw` | 800 | 2px | 200ms | Full spring: `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `bold-refined` | 700 | 8px | 350ms | Confident spring: `cubic-bezier(0.34, 1.20, 0.64, 1)` |

Image treatment:
- `intimate-raw`: `filter: saturate(0.85)` on hero artwork, release artwork, snap card images
- `intimate-refined`: `filter: saturate(0.9) sepia(0.05)` on same
- `bold-raw`: `filter: contrast(1.05)` on same
- `bold-refined`: no filter override (clean)

---

## 5. LAYOUT ARCHITECTURE

### 5.1 DOM structure (top-level)

```
<body>
  <a href="#main-content" class="skip-to-main">  ← skip nav (P0-5)
  [data-theme="glass"] #profile-bg               ← fixed, z-index: -1
  <canvas id="bg-canvas">                        ← particles preset
  .owner-bar                                      ← owner mode only, fixed top
  #sticky-artist-bar                             ← fan view, fixed top, z-140
  #app-shell [data-theme] [data-vibe] [data-feel] [data-campaign-state]
    #status-bar                                  ← safe-area-inset-top
    <main id="main-content">
      #scroll-container
        .hero
        .bio-strip
        .countdown                               ← pre-release only
        .hero-cta-zone                           ← two CTAs
        .pills-section                           ← platform pills
        .snap-cards-section                      ← horizontal scroll
        .fan-capture (primary)                   ← after snap cards
        .content-section (music)
        .world-map-section
        .content-section (shows)
        .content-section (merch)
        .content-section (support/close-circle)
        .credits-section
        .recs-section
        .fan-capture (secondary)                 ← quieter, repeated
        .able-footer                             ← "Made with ABLE"
    </main>
    #tab-bar                                     ← fixed bottom, z-100
  .edit-pill                                     ← owner only, fixed bottom-right, z-9999
  .bs-backdrop + .bs-sheet                       ← edit mode bottom sheets
  .cc-sheet-backdrop + .cc-sheet                 ← close circle bottom sheet
  .media-lightbox                                ← video lightbox
  .media-pip                                     ← picture-in-picture
  #toast-container                               ← toasts, fixed
```

### 5.2 Z-index layers

| Z-index | Element | Role |
|---|---|---|
| -1 | `#profile-bg` | Background artwork blur (glass theme) |
| 0 | `#bg-canvas` | Particles canvas |
| 100 | `#tab-bar` | Bottom navigation |
| 140 | `#sticky-artist-bar` | Sticky artist name strip |
| 200 | `.owner-bar` | Owner mode top bar |
| 2000 | `.bs-backdrop` | Edit sheet backdrop |
| 2001 | `.bs-sheet` | Edit bottom sheet |
| 3000 | `.cc-sheet-backdrop` | Close Circle backdrop |
| 3001 | `.cc-sheet` | Close Circle bottom sheet |
| 8500 | `.media-pip` | Picture-in-picture player |
| 9000 | `.media-lightbox` | Video lightbox |
| 9999 | `.edit-pill` | Floating edit/fan-view pill |
| 9999 | `.gig-activation-flash` | One-time gig mode activation overlay |

### 5.3 Scroll behaviour

- Container: `#scroll-container` — `flex: 1`, `overflow-y: auto`, `-webkit-overflow-scrolling: touch`, `overscroll-behavior-y: contain`
- Scrollbar: hidden via `-webkit-scrollbar: display:none` and `scrollbar-width: none`
- Scroll padding bottom: `calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px) + var(--sp-4))` — content never hides behind tab bar
- Snap cards track: `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain` — cards always land cleanly
- Tab bar: hides on scroll down (`translateY(100%)`), shows on scroll up — prevents chrome from eating content real estate on long pages

### 5.4 Profile background (`#profile-bg`)

Fixed, `inset: 0`, `z-index: -1`. Applied when:
- Theme is `glass` (always shows) — `body:has([data-theme="glass"]) #profile-bg { display: block }`
- `profile.backgroundUrl` is set — JS adds `.active` class
- `profile.backgroundPreset` is not `'none'`

When active with custom URL: `background-image: url(...)`, `filter: blur(40px) brightness(0.45)`, `transform: scale(1.1)` (prevents blur edge showing).

When shell has profile-bg active (non-glass themes): shell becomes semi-transparent — `background-color: color-mix(in srgb, var(--color-bg) 88%, transparent)`.

**Animated presets:**
- `preset-gradient-pulse`: diagonal gradient animation, 12s loop
- `preset-aurora`: radial gradient breathing, 16s loop
- `preset-grain`: CSS noise texture, 8s drift
- `particles`: `<canvas id="bg-canvas">` handled by JS

---

## 6. SECTION-BY-SECTION SPECIFICATION

### 6.1 Hero

**Structure:** `.hero` — `position: relative`, `aspect-ratio: 3/4`, `max-height: min(560px, 58svh)`, `overflow: hidden`. This cinematic ratio ensures bio+CTAs are always visible above the fold on any phone.

**Layers (bottom to top):**
1. `hero__artwork-placeholder` — accent gradient shown before image loads or when no artwork
2. `hero__initials` — artist initials at ~20vw, `rgba(255,255,255,0.18)` — shows if no artwork
3. `hero__artwork` — `object-fit: cover`, lazy loaded with blur-up, `opacity: 0 → 1` over `--dur-slow`
4. `hero__video` — absolute, full bleed, YouTube/Vimeo iframe with poster click-to-load
5. `hero__top-vignette` — `height: 30%`, `linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)` — hidden in light theme
6. `hero__scrim` — `height: 75%`, multi-stop bottom-to-top gradient for text readability
7. `hero__ambient` — radial glow from bottom, breathes 4s loop (2.5s in gig state)
8. `hero__ambient-glow` — 120px strip at bottom, extracted artwork colour
9. `hero__text` — `position: absolute; bottom: 0`, contains state chip, artist name, meta, copy-link

**`hero__text` internal flow:**
```
.hero__state-chip        ← campaign state badge (pre, live, gig)
.hero__name              ← artist name, reveal animation
.hero__meta              ← genre + location tags
  .hero__tag + .hero__tag-sep + .hero__tag
.hero__credit-line       ← optional credit text
.hero__copy-link         ← "artist.able.fm/[handle] · copy link"
```

**Campaign state on hero:**
- `[data-campaign-state="pre-release"] .hero__ambient`: amber radial glow, intensity driven by `--pre-release-glow` CSS var (JS increases as release approaches)
- `[data-campaign-state="live"] .hero__ambient`: warm red glow
- `[data-campaign-state="gig"] .hero__ambient`: brighter opacity (0.55), faster breathing (2.5s)

**State chip colours:**
- `--pre`: `background: #fbbf24; color: #000` — amber
- `--live`: `background: #ef4444` — red
- `--gig`: `background: #8b1e1e` with glowing `::after` pulse animation
- `--profile`: `display: none` — no chip in default state
- `--near-future`: frosted glass pill (glass-morphism style) for events within 7 days

**Name reveal animation:** `.hero__name` starts `opacity: 0; transform: translateY(12px)` — `.revealed` class applied by JS after fonts loaded. Transition: `--dur-slow var(--ease-decel)`.

**Light theme overrides:** name text `color: var(--color-text)` (not forced white), no text-shadow. Top vignette hidden. Scrim uses warm cream gradient.

---

### 6.2 Campaign State System

State is stored in `profile.stateOverride` or auto-computed. Applied as `data-campaign-state` attribute on `#app-shell`.

**Auto-switch logic:**
```javascript
const now = Date.now();
const gigExpires = localStorage.getItem('able_gig_expires');

if (gigExpires && now < parseInt(gigExpires)) {
  state = 'gig';
} else if (profile.releaseDate) {
  const rd = new Date(profile.releaseDate).getTime();
  if (now < rd) {
    state = 'pre-release';
  } else if (now < rd + 14 * 24 * 60 * 60 * 1000) {
    state = 'live';
  } else {
    state = 'profile';
  }
} else {
  state = 'profile';
}
```

**Post-gig sub-state:** `able_gig_show_end` — artist-set showtime + 1h buffer. If `now > gigShowEnd && now < gigExpires` → render `post-gig` state (CTAs shift to "Stay close" primary, merch secondary, tonight note replaced by post-show note or silence).

| State | Hero top card | Primary CTA | Secondary CTA | State chip |
|---|---|---|---|---|
| `profile` | Artwork or gradient | "My music" (vibe default) | "Stay close" | None |
| `pre-release` | Release artwork + countdown | "Pre-save" | "My music" | Amber "Dropping [date]" |
| `live` | Release artwork | "Stream now" | "Stay close" | Red "Out now" |
| `gig` | Artist artwork + tonight note | "Get tickets" | "Can't make it? Stay close" | Dark red "On tonight" pulse glow |
| `post-gig` | Artist artwork + post-show note | "Stay close" | "Merch" (if exists) | None |

**Pre-release final 24h shift:**
```javascript
if (hoursLeft < 24) {
  document.documentElement.setAttribute('data-prerelease', 'final');
}
```
When `data-prerelease="final"`:
- Countdown digits: `font-size: clamp(56px, 16vw, 96px); color: var(--color-accent)`
- Hero ambient: `opacity: 0.28` (increased intensity)

**Countdown unit display:** Days / hours / minutes only. No seconds — seconds create anxiety, not anticipation.

---

### 6.3 Hero CTA Zone

`.hero-cta-zone` — below hero, above bio. Contains two buttons stacked vertically.

**Primary CTA (`.btn-primary`):**
- Height: 56px minimum
- Background: `var(--color-accent)`
- Text: `var(--cta-text-color, #fff)` — computed from accent luminance
- Radius: `var(--r-sm)` (8px default, vibe-overridden)
- Padding: `var(--sp-4) var(--sp-6)`
- Font: 13px, weight 700, uppercase, 0.08em tracking
- Press state: `scale(0.97)`, background lightens via `::after` overlay
- Ripple: `::after` pseudo-element, `opacity: 0 → 1 → 0` on press

**Secondary CTA (`.btn-secondary`):**
- Height: 56px minimum
- Background: `transparent`
- Border: `1px solid rgba(255,255,255,0.28)` → on hover: `rgba(--color-accent-rgb, 0.5)`
- Text: `var(--color-text-2)` → on hover: `var(--color-text)`
- Font: 11px, weight 600, uppercase, 0.08em tracking
- Light theme: border `rgba(0,0,0,0.20)`
- Glass theme: `backdrop-filter: blur(8px)`

**CTA architecture rules:**
1. Max 2 CTAs in this zone — always
2. Primary = accent fill. Secondary = ghost.
3. Same URL cannot appear in this zone and Quick Actions (global dedupe — Hero wins)
4. State drives defaults (see §6.2 state table above). Artist can override each label + URL.
5. Secondary CTA is optional — `null` in post-gig state (render only primary)

---

### 6.4 Quick Actions (Platform Pills)

`.pills-section` — 2-column grid of horizontal platform objects.

**Grid:** `display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2)`

**Individual pill (`.pill`):**
- Height: 52px minimum
- Layout: horizontal flex, icon (26×26) + label
- Background: `rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.07)`
- Border-radius: `var(--r-md)` (12px default)
- Label: 13px, weight 500, `text-overflow: ellipsis` (clips "SoundCloud" on 320px)
- Hover: `border-color: rgba(--color-accent-rgb, 0.25)`, `background: rgba(255,255,255,0.07)`
- Press: `scale(0.97)`

**Entrance animations:**
- Initial load: `pill-bloom` — `translateX(-8px) → 0`, 220ms, staggered by `--pill-bloom-delay`
- Overflow expand: `pill-scale-in` — `scale(0.80) → 1`, 160ms spring, staggered
- First load shimmer: `pill-shimmer-once` — one sweep per pill, session-flagged (not repeated on revisit)

**Overflow logic:**
- Narrow viewport (< 500px): show max 4 pills, rest hidden
- Wide viewport (≥ 500px): show max 6 pills
- Overflow button (`.pills-more`): `+ [N] more`, accent colour, full-width pill below grid

**Copy rule:** Platform name only. "Spotify" not "Stream on Spotify". No verbs.

**Section label (`.pills-section__label`):** 10px, weight 600, uppercase, 0.22em tracking, `--color-text-3`. Minimum 10px — below 10px is below accessible threshold.

---

### 6.5 Bio Strip

`.bio-strip` — immediately below hero CTAs.

**Bio text (`.bio-strip__text`):**
- Clamped to 3 lines via `-webkit-line-clamp: 3`
- 15px, `line-height: 1.65`, `var(--color-text-2)`
- On expand (`.expanded`): `display: block`, clamp removed
- Expanded state adds barely-perceptible accent warm background: `rgba(--color-accent-rgb, 0.03)` on `.bio-strip` — transition `--dur-mid`

**Expand button (`.bio-strip__more`):** Min-height 44px, 13px, `--color-text-3` with underline, hidden when bio ≤ 3 lines.

**Empty state (P0):** If `profile.bio` is not set, hide `.bio-strip` entirely. Do not render an empty container.

---

### 6.6 Snap Cards

`.snap-cards-section` — horizontal scrolling row of artist voice posts.

**Track (`.snap-cards-track`):**
- `display: flex; gap: var(--sp-3)`
- `overflow-x: auto; scrollbar-width: none`
- `scroll-snap-type: x mandatory; overscroll-behavior-x: contain`
- Padding: `var(--sp-2) var(--sp-5)`

**Individual card (`.snap-card`):**
- Width: 220px fixed, `flex-shrink: 0`
- `scroll-snap-align: start`
- Structure: optional image (1:1 aspect) + body (title, text, optional CTA)
- Image: `object-fit: cover`, `aspect-ratio: 1`
- Image placeholder (no image): accent-tinted block `rgba(--color-accent-rgb, 0.08)`
- Body: 16px padding
- Title: 13px weight 700
- Text: 13px `var(--color-text-2)`
- CTA: full-width bottom strip, `var(--color-accent-soft)` bg → accent on hover

**Tier gating:** Snap cards 2+ show blurred (`.snap-card--locked`, `filter: blur(3px)`) with lock overlay on Free tier. Gold overlay with `#f4b942` text — copy states what they get ("Unlimited snap cards on Artist plan"), never just "Upgrade".

**Empty state (P0):** Hide section entirely if `profile.snapCards.length === 0`. Fan never sees placeholder.

**Owner edit:** Tap row in edit mode → bottom sheet with text, photo upload, optional CTA per card.

---

### 6.7 Fan Sign-up Module

`.fan-capture` — appears twice: primary (after snap cards, before music) and secondary (bottom of page, quieter).

**Primary variant:**
- Background: `color-mix(in srgb, var(--color-card) 94%, var(--color-accent) 6%)` — barely-perceptible accent warmth
- Border: `1px solid var(--color-border)`, top: `3px solid rgba(--color-accent-rgb, 0.7)` — accent top accent rule
- Border-radius: `var(--r-md)`, margin: `var(--sp-2) var(--sp-5)`

**Secondary variant (`.fan-capture--secondary`):**
- Transparent background
- Top border: `1px solid rgba(--color-accent-rgb, 0.25)` (quieter)
- Heading: 17px, opacity 0.55

**Heading (`.fan-capture__heading`):** Display font, 32px, same vibe treatment as section titles. Default: "Stay close." Source: `profile.fanCapture.heading` → fallback `"Stay close."` Never falls back to ABLE-voiced copy.

**Subtext (`.fan-capture__sub`):** 13px, `--color-text-2`, `line-height: 1.6`. Default: "Just your email. I'll reach out when something's actually happening."

**Input (`.fan-capture__input`):**
- `flex: 1; min-height: 44px`
- Background: `var(--color-surface)`, border `1.5px solid var(--color-border)`
- **Font-size: 16px** — prevents iOS Safari viewport zoom
- Placeholder: "Your email" (never "Email address" or "Enter your email")
- Focus: `border-color: var(--color-accent); border-width: 2px; box-shadow: 0 0 0 3px var(--color-accent-soft)`
- Paste flash: `background-color: var(--color-accent-soft)`, transitions out over 400ms
- Error: `border-color: var(--color-state-live)`
- Autofill override: `webkit-box-shadow: 0 0 0 100px var(--color-surface) inset` — prevents iOS yellow wash

**Submit button:** Uses `.btn-primary` styles. Text default: "I'm in". Never "Subscribe", "Sign up", "Submit".

**Trust line (`.fan-capture__trust`):**
```
"Your email goes to [Artist Name] directly. Not to any platform."
```
Font: 11px, `--color-text-3`, `letter-spacing: 0.02em`. Always present. Whispered, not announced — never bold or accent-coloured.

**Field layout:** `display: flex; gap: var(--sp-2)` — input and button side by side. On very narrow (≤360px): stacks vertically (`flex-direction: column; .fan-capture__btn { width: 100% }`).

**Post-submit state:**
1. Form hidden
2. Echo element shown (`.fan-capture__echo`, `hidden` attribute removed)
3. Entrance animation: `echo-enter` — `translateY(6px) → 0`, 280ms deceleration
4. Echo text: "You're in. I'll keep you close."
5. Confirm subtext: "Check your email to confirm."
6. Toast fires: "You're in." (3s)
7. Confetti fires (lightweight JS confetti burst)

**GDPR note:** No privacy link rendered on the profile page — it would break the conduit illusion. ABLE's privacy policy appears in the confirmation email footer only. The trust line above the input is the entire consent communication.

**Confirmation email (Phase 2 — Supabase + Resend):**
- Subject: "Confirm you want to hear from [Artist Name]"
- Voiced as artist, sent via ABLE
- Body: "[Artist Name] asked me to check this is actually you. [Confirm →] If you didn't sign up, ignore this."
- Email footer only: "Sent via ABLE · Unsubscribe"

---

### 6.8 Music Section

`.content-section` with `.content-section--primary` modifier (more top padding).

**Section header:** `"My music"` (artist-overridable). Display font, 32–40px. Accent rule above.

**Releases list (`.releases-list`):** `flex-direction: column; gap: var(--sp-5)`

**Individual release card (`.release-card`):**
- `background: var(--color-card); border-radius: var(--r-md); overflow: hidden`
- Full-width album artwork (1:1 aspect ratio) at top
- Play overlay on artwork: `opacity: 0.55` always on touch, `0` on pointer-capable devices (hover reveals)
- Platform badge (top-right of artwork): dark frosted pill with platform icon + name
- Info row below artwork: title (17px, weight 700) + meta (11px, uppercase, `--color-text-3`)
- Stream/Watch buttons row (`.release-btn-row`): small accent-filled Stream + ghost Watch at 10px, 700 weight
- Type badge (`.release-type-badge`): 8px, `rgba(255,255,255,0.1)` background — "ALBUM", "EP", "SINGLE"
- Left border treatment (P0 spec): left border colour matches release type — not yet implemented

**Embeds:**
- Spotify: inline compact player iframe, `height: 80px`, `background: #000`
- YouTube: play overlay on artwork thumbnail → click loads iframe in 16:9 wrapper (`padding-bottom: 56.25%`)

**Media lightbox (`.media-lightbox`):**
- `position: fixed; inset: 0; z-index: 9000`
- `background: rgba(0,0,0,0.88); backdrop-filter: blur(16px)`
- Inner: `max-width: 920px`, 16:9 aspect iframe
- Entrance: `translateY(20px) scale(0.97) → none`, 300ms spring

**Picture-in-picture (`.media-pip`):**
- `position: fixed; bottom: 84px; right: 14px; width: 248px; z-index: 8500`
- `transform: translateY(30px) scale(0.92) → none`, 320ms spring on show
- Expand button + close button in bottom bar

**Credits strip (`.release-credits`):**
- Collapsible toggle (`.credits-toggle`) below info row
- Chevron rotates 180° when expanded (`aria-expanded="true"`)
- Credit row: role (muted) + name (medium weight)
- Confirmed freelancer with ABLE handle: name is a live link to their ABLE profile
- Unconfirmed: plain text, no link

**Empty state (P0):** If `profile.releases.length === 0`, hide the entire music section. No "No releases" copy. In owner mode, show edit prompt inside dashed ring: "Add your latest music. Paste a Spotify or SoundCloud link."

---

### 6.9 World Map / Events Section

**World map card (`.world-map-card`):**
- `border-radius: var(--r-lg)`, `background: var(--color-surface)`
- Header: display font month label (32px) + "X shows" count
- Calendar grid: mini calendar with show dates highlighted in accent

**Shows list (`.shows-list`):**
Each show card (`.show-item`) is a 3-column flex layout:

1. **Date column (`.show-item__date`):**
   - 68px min-width
   - Background: `rgba(--color-accent-rgb, 0.08)`
   - Border-right: `rgba(--color-accent-rgb, 0.14)`
   - Month: 10px, weight 700, uppercase, accent colour
   - Day: display font, 32px

2. **Info column (`.show-item__info`):**
   - Venue: 15px, weight 700
   - City: 13px, `--color-text-2`
   - Time/doors: 11px, `--color-text-3`

3. **CTA column (`.show-item__cta`):**
   - `.btn-show`: accent fill, full height, `min-width: 80px`, 11px uppercase
   - Sold out badge: `var(--color-state-live)` text

**Gig mode featured card:** `.tonight-badge` — 9px weight 900 amber badge pulsing at 1.5s, above the date column. Shown only when `data-campaign-state="gig"` and show date matches today.

**Tonight note block (P1):** `<blockquote class="tonight-note">` — `font-style: italic`, `border-left: 2px solid rgba(--color-accent-rgb, 0.4)`, `padding-left: var(--sp-4)`. Rendered above ticket CTA in gig mode. Mandatory — gig mode cannot activate without this content set in admin.

**Venue image variant (`.show-item--has-image`):** Full-bleed venue photo as background with gradient scrim overlay.

**Empty state (P0):** Hide entire shows section if no shows. In owner mode: "Add a show. Paste a Ticketmaster or Eventbrite link."

---

### 6.10 Merch Section

`.merch-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3)`

**Item (`.merch-item`):**
- 1:1 artwork image with price overlay gradient at bottom
- Badge top-right (`.merch-item__badge`): accent pill — "NEW", "LIMITED"
- Info row: title (13px, weight 600) + price (11px)
- Emoji fallback (no image): 40px emoji in square block

**Copy:** Section header default "Stuff" (artist-overridable: "Things", "Merch", "Shop").

**Empty state (P0):** Hide entirely. No placeholder.

---

### 6.11 Support / Close Circle

`.support-packs` — flex column.

**Support pack row (`.support-pack`):**
- Emoji icon (34px circle, accent-tinted) + label + desc + price or price button
- Hover: `border-color: var(--color-accent)`, `translateY(-3px)`, accent glow shadow
- Price as text (no URL): `var(--color-accent)` coloured text
- Price as CTA (with URL): `.support-pack__price-btn` — accent fill, 40px min-height

**Close Circle bottom sheet (`.cc-sheet`):**
- `position: fixed; bottom: 0; border-radius: 20px 20px 0 0`
- `transform: translateY(100%) → translateY(0)` on open
- Contains: artist avatar + name + price, intro text (artist-set pitch), email input, submit, terms

**Copy:** Section label "Close circle" (very small, uppercase). Join button: "Join the circle". Post-join: "You're in the circle" (quiet, warm). Never: "Exclusive content", "Join the community", "Become a supporter".

---

### 6.12 Recommendations

`.recs-section` — editorial minimal list.

Each item (`.rec-item`):
- Avatar (48×48, `border-radius: var(--r-sm)`) + name + genre + arrow
- Hover: `background: rgba(--color-accent-rgb, 0.05)`, name turns accent, arrow translates 3px

**Section header:** "Artists I believe in" (artist-overridable). This must feel like a personal curation, not an algorithm.

---

### 6.13 Sticky Artist Bar

`#sticky-artist-bar` — `position: fixed; top: 0; height: 44px; z-index: 140`

Appears when hero scrolls 70% out of view (JS IntersectionObserver or scroll event). Fan view only — hidden in owner mode.

**Show/hide animation:** `transform: translateX(-50%) translateY(-100%) → translateY(0)`, 300ms deceleration. Reduced motion: opacity only.

**Theme variants:**
- Dark: `rgba(13,14,26, 0.82)` + `backdrop-filter: blur(18px)`
- Light: `rgba(240,237,232,0.90)`
- Glass: `rgba(13,14,26, 0.40)` + `blur(24px) saturate(200%)`
- Contrast: `rgba(0,0,0,0.96)`, `rgba(255,255,255,0.12)` border

**Content:** Artist name in display font (18px) + optional campaign state chip or action button.

---

### 6.14 Owner Mode Elements

**Owner bar (`.owner-bar`):** Fixed at top when in owner mode. Contains:
- "← Your dashboard" link (amber, 12px Plus Jakarta Sans)
- Page URL label (muted, centre)
- "Copy link" button

When owner bar visible: `body.has-owner-bar #app-shell { margin-top: 38px }` — prevents content overlap.

**Floating edit pill (`.edit-pill`):**
- `position: fixed; bottom: 88px; right: 16px; z-index: 9999`
- Two tabs: "Fan view" | "Edit"
- Active tab: accent fill
- In edit mode: dashed amber rings appear on `[data-editable]` elements with pencil icon badge

**Dashed rings (edit active):**
```css
.edit-active [data-editable] {
  outline: 1.5px dashed rgba(244,185,66,0.7);
  outline-offset: 3px;
  border-radius: 8px;
  cursor: pointer;
}
.edit-active [data-editable]::after {
  content: '✎';
  background: #f4b942;
  color: #1a1a2e;
  font-size: 9px; font-weight: 800;
  padding: 2px 5px; border-radius: 5px;
  position: absolute; top: 6px; right: 6px;
}
```

**Edit zones (6 total — P0):**
1. Identity zone (hero artwork area): name, vibe, accent, theme
2. Hero CTAs: label + URL for each
3. Quick Actions: URL per platform, add/remove
4. Sections: Spotify URL paste for music, show add/edit
5. Snap cards: text, photo, optional CTA per card
6. Fan capture copy: heading, subtext, trust line

**Auto-save:** Debounce 800ms after last input. Toast: "Saved." (period — never exclamation). Failure: "Couldn't save. Try again."

**Bottom sheet (`.bs-sheet`):**
- `border-radius: 16px 16px 0 0`
- `max-height: 85vh; overflow-y: auto`
- `transform: translateY(100%) → translateY(0)`, 300ms deceleration
- Handle bar: 28×3px `#e0dbd4` rounded pill at top

---

### 6.15 Made with ABLE Footer

`.able-footer` — bottom of page, below all content sections.

Text: "Made with ABLE ✦" with `?ref=[artistHandle]` attribution on the ABLE link.

Style: Small, subdued, `--color-text-3`. Never competes with any other element. Never "Powered by ABLE" or "Built on ABLE".

View transition target: `view-transition-name: able-logo` — the ABLE logo word-mark in admin topbar shares this name, enabling a flying logo transition when navigating admin ↔ profile (Chrome 126+ progressive enhancement).

---

## 7. ANIMATION INVENTORY

### 7.1 Core interaction animations

| Ref | Trigger | Animation | Duration | Easing | Notes |
|---|---|---|---|---|---|
| B2 | Press any `.pressable` | `scale(0.97)` | 80ms | `ease-out` | JS adds `.pressing` class on `pointerdown` |
| B2 | Release `.pressable` | Spring back from 0.97 to 1 | `--dur-fast` 150ms | `--ease-spring` | JS swaps transition before removing `.pressing` |
| B14 | Tab bar icon selection | `tab-icon-bounce` keyframe: 1 → 1.18 → 0.97 → 1 | 320ms | `--ease-spring` | `.icon-bounce` class, one-shot |
| I1 | Tab dot at rest | `box-shadow: 0 0 0 4px rgba(accent, 0.14)` | static | — | Barely-there halo |

### 7.2 Hero animations

| Ref | Element | Animation | Duration | Trigger |
|---|---|---|---|---|
| H1 | `.hero__ambient` | `glow-breathe`: `opacity 1 → 0.55 → 1` | 4s infinite | Always (2.5s in gig) |
| H3 | Gig state ambient | 2.5s loop instead of 4s | — | `data-campaign-state="gig"` |
| H4 | `.hero__name` (gloss) | Gloss sweep `::after` on reveal | — | One-shot on page load |
| H9 | Pre-release ambient | `--pre-release-glow` CSS var increases as release approaches | — | JS updates on page load |
| name reveal | `.hero__name` | `opacity 0; translateY(12px) → visible` | `--dur-slow` 400ms | After fonts ready |
| C7 | Gig badge `::after` | `badge-glow-pulse`: outward radiating halo | 2s infinite | `data-campaign-state="gig"` |
| gig flash | `.gig-activation-flash` | `opacity 0 → 0.18 → 0` | 600ms | One-time gig mode activation |

### 7.3 Entry animations

| Ref | Element | Animation | Duration | Stagger |
|---|---|---|---|---|
| A10 | Platform pills | `pill-bloom`: `translateX(-8px) → 0` | 220ms decel | `--pill-bloom-delay` per pill |
| C10 | Overflow pills expand | `pill-scale-in`: `scale(0.80) → 1` | 160ms spring | `--pill-enter-delay` per pill |
| D15 | First-load pill shimmer | One sweep across each pill, session-flagged | 550ms decel | `--pill-shimmer-delay` per pill |
| A3 | Chip reveal | `opacity 0; translateY(4px) → visible` | `--dur-mid` | On state resolve |
| echo-enter | Fan capture echo | `opacity 0; translateY(6px) → visible` | 280ms decel | On form submit |

### 7.4 Scroll-triggered animations

| Ref | Element | Trigger | Animation |
|---|---|---|---|
| A4 | `#sticky-artist-bar` | Hero 70% out of view | `translateY(-100%) → 0`, 300ms decel |
| tab bar | `#tab-bar` | Scroll direction | `translateY(100%)` on down, `translateY(0)` on up |
| G9 | Section deep link | Hash URL navigate to section | `section-pulse` — 2× pulsing accent ring, 750ms |

### 7.5 Interactive micro-animations

| Ref | Element | Animation |
|---|---|---|
| — | Release card (pointer) | `translateY(-3px)` + deeper shadow on hover |
| — | Release artwork (pointer) | `scale(1.03)` on hover |
| — | Show item (pointer) | `translateY(-2px)` on hover |
| — | Support pack (pointer) | `translateY(-3px)` + accent glow shadow on hover |
| — | Support pack emoji | `scale(1.10)` on parent hover |
| — | Rec item arrow | `translateX(3px)` on parent hover |
| — | Media lightbox open | `translateY(20px) scale(0.97) → none`, 300ms spring |
| — | Media pip show | `translateY(30px) scale(0.92) → none`, 320ms spring |
| B18 | Media pip icon-only btns | `scale(0.88)` on active (more prominent than label buttons) |

### 7.6 State transitions

| Element | From | To | Duration |
|---|---|---|---|
| Bottom sheet (`.bs-sheet`) | `translateY(100%)` | `translateY(0)` | 300ms decel |
| Close Circle sheet | `translateY(100%)` | `translateY(0)` | same |
| Media lightbox | opacity 0 | opacity 1 | 250ms decel |
| Bio expanded bg | transparent | `rgba(accent, 0.03)` | `--dur-mid` |
| Copy-link pill `.copied` | default | accent-tinted | `--dur-fast` |

### 7.7 Reduced-motion spec

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Exceptions: essential state-change feedback */
  .campaign-state-transition { transition: opacity 0.2s ease !important; }
  .toast                     { transition: opacity 0.2s ease !important; }
  .bottom-sheet-content      { transition: transform 0.2s ease !important; }
}
```

Use `0.01ms` (not `none`) — allows JS-triggered transitions to complete a single frame, preventing layout jumps.

**Contrast theme animation zero:**
```css
[data-theme="contrast"] {
  --dur-instant: 0ms;
  --dur-fast:    0ms;
  --dur-mid:     80ms;   /* essential state-change feedback kept */
  --dur-slow:    80ms;
  --dur-xslow:   80ms;
}
[data-theme="contrast"] .decorative-animation { animation: none !important; }
```
Contrast theme disables all decorative animations at theme level, regardless of `prefers-reduced-motion`. State transitions (80ms) remain as essential feedback.

---

## 8. DATA SCHEMA

`able_v3_profile` in localStorage. The JS reads this object on page load and renders accordingly.

| Field | Type | UI element driven | Notes |
|---|---|---|---|
| `name` | string | Hero artist name, `<title>`, OG tags, sticky bar, section aria-labels | Required — empty profile should show nothing to fans |
| `bio` | string | Bio strip, OG description | Hidden if empty |
| `accentHex` | string (#hex) | `--color-accent` + all derived accent tokens | Default `#e07b3a` |
| `theme` | `'dark'|'light'|'glass'|'contrast'` | `data-theme` on `#app-shell` | Default `'dark'` |
| `vibe` | `'electronic'|'hiphop'|'rnb'|'indie'|'pop'|'rock'|'acoustic'` | `data-vibe`, display font, motion timing | Default `'indie'` |
| `feel` | `'intimate-raw'|'intimate-refined'|'bold-raw'|'bold-refined'` | `data-feel`, radius, weight, duration | Optional |
| `artworkUrl` | string (URL) | Hero artwork, release card fallback, OG image | Glass theme requires this |
| `backgroundUrl` | string (URL) | `#profile-bg` background image | Optional |
| `backgroundPreset` | `'none'|'gradient-pulse'|'aurora'|'grain'|'particles'` | `#profile-bg` animated class | Optional |
| `location` | string | Hero meta tag |  |
| `genre` | string | Hero meta tag |  |
| `ctaPrimary` | `{label, url}` | Primary CTA button | State-conditional defaults apply |
| `ctaSecondary` | `{label, url}` | Secondary CTA button | Null hides secondary |
| `stateOverride` | string or null | Campaign state (overrides auto-compute) | Null = auto-compute |
| `releaseDate` | ISO date string | Pre-release countdown, state auto-switch |  |
| `releaseTitle` | string | State chip label, hero copy |  |
| `releaseArtworkUrl` | string | Hero top card in pre-release / live |  |
| `releases` | Array of release objects | Music section cards | Empty = hide section |
| `platforms` | Array of `{platform, url}` | Platform pills | Empty = hide pills section |
| `snapCards` | Array of `{title, text, imageUrl, cta}` | Snap cards track | Empty = hide section |
| `fanCapture` | `{heading, subtext, trustLine}` | Fan sign-up module | Defaults apply if empty |
| `shows` | (from `able_shows`) | Shows section, world map | Separate localStorage key |
| `merch` | Array of merch objects | Merch grid | Empty = hide section |
| `supportPacks` | Array of support pack objects | Support section |  |
| `credits` | Array of `{role, name, ableHandle, confirmed}` | Release credits strip |  |
| `recommendations` | Array of `{name, genre, artworkUrl, url}` | Recommendations section |  |
| `gigNote` | string | Tonight note blockquote in gig mode | Required when activating gig mode |
| `postGigNote` | string | Post-gig note (replaces tonight note after show end) | Optional |
| `releaseNote` | string | Pre-release note (below countdown) | Optional |

**Separate localStorage keys:**

| Key | Contents | Used by |
|---|---|---|
| `able_fans` | `[{email, ts, source}]` | Fan sign-up storage, admin fan list |
| `able_clicks` | `[{label, type, ts, source}]` | CTA tap analytics |
| `able_views` | `[{ts, source}]` | Page view tracking |
| `able_gig_expires` | Unix timestamp (ms) | Gig mode 24h expiry |
| `able_gig_show_end` | Unix timestamp (ms) | Show-end time for post-gig state |
| `able_shows` | `[{venue, date, doorsTime, ticketUrl, featured}]` | Shows section |

All keys map 1:1 to Supabase tables when backend lands. Do not rename.

---

## 9. ACCESSIBILITY REQUIREMENTS

### 9.1 Skip navigation

First element in `<body>`:
```html
<a href="#main-content" class="skip-to-main">Skip to main content</a>
```
```css
.skip-to-main {
  position: absolute; top: -100%; left: var(--sp-4);
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-accent); color: var(--color-on-accent);
  font-size: var(--text-sm); font-weight: 600;
  border-radius: 0 0 var(--r-sm) var(--r-sm);
  z-index: 9999; text-decoration: none; transition: top 0.15s;
}
.skip-to-main:focus-visible { top: 0; }
```
`<main id="main-content" tabindex="-1">` — allows focus on programmatic `.focus()`.

### 9.2 ARIA landmarks

```html
<section aria-label="Artist identity and actions">   <!-- hero + CTAs -->
<section aria-label="Quick links">                   <!-- platform pills -->
<section aria-label="[Artist Name]'s music">         <!-- music section -->
<section aria-label="Shows">                         <!-- events section -->
<section aria-label="Stay close">                    <!-- fan sign-up -->
```

### 9.3 Tap targets

**Minimum 44px** (`--tap-min`) on all interactive elements:
- CTAs: `min-height: 56px` (exceeds minimum)
- Pills: `min-height: 52px`
- Fan capture input + button: `min-height: 44px`
- Tab bar buttons: `min-height: 44px` with `min-width: 44px`
- Bio expand button: `min-height: 44px`
- Credits toggle: `min-height: implied` — must be verified
- Show ticket button: `min-height: 44px`

### 9.4 Focus management

Focus rings on all interactive elements via `:focus-visible`:
```css
:focus-visible {
  outline: 2px solid rgba(var(--color-accent-rgb), 0.80);
  outline-offset: 3px;
  border-radius: var(--r-sm);
  box-shadow: 0 0 0 5px rgba(var(--color-accent-rgb), 0.12);
}
```
Suppress on mouse/touch: `:focus:not(:focus-visible) { outline: none }`.

Shape-matching: pill-shaped elements get `border-radius: var(--r-pill)` on focus ring.

When bottom sheet opens: focus trapped inside sheet. On close: focus returns to trigger element.

### 9.5 Contrast requirements (WCAG AA)

Light theme contrast issue — fix required (P0-5):
```css
[data-theme="light"][data-vibe="indie"]      { --color-accent: #5a9e67; } /* sage fix: 4.6:1 */
[data-theme="light"][data-vibe="electronic"] { --color-accent: #0e8fa3; } /* cyan fix */
```
All 4 themes × 7 vibes = 28 combinations must meet 4.5:1 on body text and 3:1 on large text.

### 9.6 Owner-mode edit prompts

Owner mode prompts (dashed ring hints, "Tap to edit" labels) must be `aria-hidden="true"` — invisible to screen readers and fans. Only the visual ring is shown to the artist owner; it carries no semantic meaning for AT users.

---

## 10. KNOWN BUGS AND P0 FIXES

Reference: `PATH-TO-10.md` for full specs. Summary below.

### P0 items (current baseline 6.9/10 → 8.5/10 after P0)

| ID | Gap | Current | Fix spec |
|---|---|---|---|
| P0-1 | Empty state | Placeholder text "No releases added yet" visible to fans | Gate all sections on content existence. `shouldRender(section, profile)` check. Hide entirely if empty. Owner-mode prompts only. |
| P0-2 | Edit mode coverage | Shows and releases not editable from profile page | All 6 zones editable. Bottom sheets mirror admin editors for shows/releases. |
| P0-3 | Copy voice | Generic defaults ("Artist profile powered by ABLE", "Sign up") | Replace all defaults per COPY.md §2–5 tables. First-person artist voice everywhere. |
| P0-4 | Trust copy | "Just [Artist Name]. No spam." not guaranteed present | Always-rendered trust line below input: "Your email goes to [Artist Name] directly. Not to any platform." |
| P0-5 | Accessibility | No skip nav; `prefers-reduced-motion` incomplete; light theme contrast failures | Skip nav, ARIA landmarks, `0.01ms` reduced motion pattern, light theme accent overrides. |

### P1 items (8.5/10 → 9.3/10)

| ID | Gap | Fix |
|---|---|---|
| P1-1 | Gig mode — no tonight note, no post-show state | Mandatory tonight note field. Post-gig state from `able_gig_show_end`. |
| P1-2 | Pre-release — no release note, no final 24h shift | Release note field. `data-prerelease="final"` shift in last 24h. |
| P1-3 | Hero CTA copy defaults | `STATE_CTA_DEFAULTS` matrix + `VIBE_CTA_DEFAULTS` for profile state. |
| P1-4 | View transitions not wired | `view-transition-name: artist-name` on start.html Done screen + profile hero. Progressive enhancement. |
| P1-5 | Confirmation email not triggered | Supabase phase: fan submit → Resend edge function → artist-voiced email. |

### P2 items (9.3/10 → 9.7/10)

| ID | Gap | Fix |
|---|---|---|
| P2-1 | Edit mode zone coverage completion | Spotify/SoundCloud auto-fetch, photo upload with local blob URL, fan capture copy editor panel. |
| P2-2 | Glass theme without artwork | `applyTheme('glass', hasArtwork)` fallback to dark. Embed container explicit `backdrop-filter`. |
| P2-3 | Font loading — all vibe fonts loaded eagerly | Per-vibe on-demand font loading after `applyIdentity()` resolves vibe. |
| P2-4 | Contrast theme decorative animations | Duration token zero at theme level, not just `prefers-reduced-motion`. |

---

## 11. BUILD PRIORITY TABLE

| Priority | Item | Impact | Complexity | File area |
|---|---|---|---|---|
| **P0** | Section render gating — hide empty sections from fans | Angle 8: 3→7 | Low | JS `renderProfile()` |
| **P0** | Default copy voice — all strings to artist voice | Angle 5: 6→8 | Low | JS string constants |
| **P0** | Trust line — always rendered below fan input | Angle 18: 6→8 | Trivial | HTML template |
| **P0** | `<title>` / OG tag population from profile | Angle 1: +0.5 | Low | JS `updateMeta()` |
| **P0** | Skip navigation + ARIA landmarks | Angle 17: 6→8 | Low | HTML + CSS |
| **P0** | `prefers-reduced-motion` — `0.01ms` pattern | Angle 17: 6→8 | Low | CSS |
| **P0** | Light theme contrast fixes for indie + electronic | Angle 17 | Trivial | CSS |
| **P0** | Edit mode — all 6 zones editable from profile | Angle 16: 5→8 | High | JS edit system |
| **P1** | Gig mode tonight note + post-show state | Angle 13: 6→8 | Medium | JS state machine |
| **P1** | Pre-release note + final 24h register shift | Angle 14: 7→8.5 | Medium | JS state machine |
| **P1** | Hero CTA state × vibe defaults matrix | Angle 3: 7→8.5 | Low | JS constants |
| **P1** | `view-transition-name: artist-name` wiring | Angle 19: 7→8.5 | Medium | HTML + JS (progressive) |
| **P1** | Confirmation email (Supabase phase) | Angle 6: 7→8 | High | Supabase edge function |
| **P2** | Per-vibe on-demand font loading | Angle 10: 7→8.5 | Low | JS `loadVibeFont()` |
| **P2** | Glass theme fallback when no artwork | Angle 11: 8→9 | Low | JS `applyTheme()` |
| **P2** | Contrast theme — duration tokens at theme level | Angle 17: 8→9 | Trivial | CSS |
| **P2** | Edit zone coverage completion (Spotify fetch, photo upload) | Angle 16: 8→9 | High | JS edit system |

**Score summary after each phase:**

| Phase | Average | Target |
|---|---|---|
| Baseline | 6.9 | — |
| After P0 | 7.6 | ≥ 8.5 on critical angles |
| After P1 | 8.4 | — |
| After P2 | 8.9 | — |
| Hard ceiling (no backend) | 9.7 | — |
| 10/10 | Requires: Supabase confirmation email live, Spotify auto-import, cross-browser `@view-transition` | — |

---

## 12. PERFORMANCE REQUIREMENTS

| Metric | Target |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.10 |
| HTML (gzipped) | ≤ 340kB |

**Rendering law:** Render from `localStorage` immediately on DOMContentLoaded. Never wait for an API response before first paint. External failure (Supabase unavailable) → degrade gracefully → never show a blank section shell.

**Iframe containment:** YouTube and Spotify iframes are contained. No iframe should cause horizontal scroll or layout shift. Spotify embed: fixed height, `background: #000`. YouTube: padding-bottom 56.25% wrapper.

**Font strategy:** DM Sans + Barlow Condensed loaded eagerly (Latin subset only, `display=swap`). Vibe-specific fonts (Oswald, Cormorant Garamond, Space Grotesk, Lora) loaded on demand after vibe is resolved.

---

## 13. CROSS-PAGE COHERENCE

| Transition | From | To | Mechanism |
|---|---|---|---|
| Artist name fly | `start.html` Done screen preview | `able-v7.html` hero | `view-transition-name: artist-name` on both elements. Chrome 126+ progressive enhancement. Fallback: normal navigate. |
| ABLE logo fly | `admin.html` topbar logo | `able-v7.html` footer | `view-transition-name: able-logo` on both. Same progressive enhancement. |
| Shared font | DM Sans body | DM Sans body | Used in both `able-v7.html` and `start.html`. Admin uses Plus Jakarta Sans (deliberately different — marks interior/backstage divide). |

**Data continuity:** Profile data written by `start.html` onboarding wizard into `able_v3_profile` is read directly by `able-v7.html`. No conversion step needed.

---

## 14. CONTENT SECURITY POLICY

Applied via `<meta http-equiv="Content-Security-Policy">`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com;
img-src * data: blob:;
media-src *;
frame-src https://open.spotify.com https://w.soundcloud.com https://www.youtube.com https://bandcamp.com https://embed.music.apple.com;
connect-src 'self' https:;
```

Supabase JS is loaded via `cdn.jsdelivr.net` (covered by `script-src`). All artist artwork and images must be served over HTTPS (`img-src *` permissive for flexibility). New embed platforms require `frame-src` addition.

---

*End of spec. See also: `SPEC.md` (product purpose), `COPY.md` (all copy strings), `PATH-TO-10.md` (full build backlog), `USER-JOURNEYS.md` (5 complete journey flows).*


---
# FILE: docs/pages/admin/DESIGN-SPEC.md
---

# Admin Dashboard — Design Spec
**File: `admin.html` | Created: 2026-03-15**
**Strategy score: 9.7/10 | Phase 1 ceiling**
**This spec is complete and self-contained. Build directly from this.**

---

## 1. PURPOSE

The artist's daily home. Give the artist confidence that their page is working, their fans are building, and they know exactly what to do next.

**Primary job:** Artist opens admin → feels immediately oriented → knows what's happening → knows what to do.

**What it must not feel like:** A CMS admin panel. A SaaS analytics dashboard. A settings screen.
**What it must feel like:** Backstage. Professional, clean, warm, with just enough data to feel in control.

---

## 2. DESIGN TOKENS

```css
:root {
  --bg:       #09090f;
  --bg-mid:   #141d2e;          /* topbar / modals */
  --card:     rgba(138,180,206,.06);
  --card-hv:  rgba(138,180,206,.10);
  --border:   rgba(138,180,206,.10);
  --bm:       rgba(138,180,206,.18);
  --text:     #ccddef;
  --t2:       rgba(204,221,239,.58);
  --t3:       rgba(204,221,239,.52);
  --acc:      #c9a84c;          /* admin amber — internal only */
  --acc-rgb:  201,168,76;
  --font:     'Plus Jakarta Sans', sans-serif;
  --font-d:   'Barlow Condensed', sans-serif;
  --spring:   cubic-bezier(0.34,1.56,0.64,1);
  --ease:     cubic-bezier(0.25,0.46,0.45,0.94);

  /* Dashboard surface tokens (light, warm cream) */
  --dash-bg:     #e8e4dd;
  --dash-card:   #ffffff;
  --dash-border: #d4cfc8;
  --dash-shell:  #1a1a2e;       /* sidebar + topbar */
  --dash-field:  #f5f2ee;
  --dash-amber:  #f4b942;
  --dash-green:  #1e9650;
  --dash-red:    #c04030;
  --dash-text:   #1a1a2e;
  --dash-t2:     #555555;
  --dash-t3:     #777777;       /* UPDATED from #888888 — 4.6:1 AA compliant */

  /* Source badge colours */
  --source-ig:     #e1306c;
  --source-sp:     #1ed760;
  --source-tt:     #888888;
  --source-direct: #999999;

  /* Artist accent (loaded from profile, fallback admin amber) */
  --artist-accent:     var(--dash-amber);
  --artist-accent-rgb: 244,185,66;
}
```

**Critical:** `--dash-t3` is `#777777`, not `#888888`. The previous value was borderline WCAG AA.

---

## 3. TYPOGRAPHY SCALE

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Page title (greeting) | Plus Jakarta Sans | 22px | 700 | h1-equivalent |
| Page sub (greeting sub) | Plus Jakarta Sans | 13px | 400 | #555 |
| Section header | Plus Jakarta Sans | 13px | 600 | card header |
| Stat value | Barlow Condensed | 28px | 700 | ls: 0.02em |
| Stat label | Plus Jakarta Sans | 10px | 700 | uppercase, ls: 0.18em |
| Stat delta | Plus Jakarta Sans | 11px | 400 | |
| Nav item | Plus Jakarta Sans | 13px | 500 | |
| Nav section label | Plus Jakarta Sans | 9.5px | 700 | uppercase, ls: 0.2em |
| Field label | Plus Jakarta Sans | 10px | 700 | uppercase, ls: 0.16em |
| Field input | Plus Jakarta Sans | 13px | 400 | min 16px on mobile (iOS) |
| Button (primary) | Plus Jakarta Sans | 12px | 700 | |
| Button (ghost) | Plus Jakarta Sans | 12px | 600 | |
| Toast | Plus Jakarta Sans | 12px | 600 | |
| Badge / pill | Plus Jakarta Sans | 11px | 700 | |
| Nudge text | Plus Jakarta Sans | 13px | 400 | |
| Empty state title | Plus Jakarta Sans | 14px | 600 | |
| Empty state body | Plus Jakarta Sans | 12px | 400 | max-width 260px |

**All inputs:** `font-size: 16px` on mobile (prevents iOS auto-zoom). Use responsive scaling.

---

## 4. LAYOUT ARCHITECTURE

### Desktop (≥768px)
```
┌──────────────────────────────────────────────────────┐
│ SIDEBAR (220px fixed)  │  TOPBAR (56px sticky)        │
│  Logo                  ├──────────────────────────────│
│  Artist identity card  │  Page title    Edit page →   │
│  Navigation            │                              │
│  ─────────────────     │  PAGE CONTENT (padding: 28px)│
│  View live page ↗      │                              │
└────────────────────────┴──────────────────────────────┘
```

### Mobile (<768px)
```
┌──────────────────────────────────────────────────────┐
│  TOPBAR (56px)                                        │
│  [☰ or ABLE logo]    [Edit page →]                   │
│                                                       │
│  PAGE CONTENT (padding: 16px 16px 88px)               │
│  (88px bottom padding for tab bar)                    │
│                                                       │
├──────────────────────────────────────────────────────│
│  BOTTOM TAB BAR (safe-area-inset-bottom aware)        │
│  [Home] [Fans] [Campaign] [Content] [More]            │
└──────────────────────────────────────────────────────┘
```

### Media query
```css
@media (max-width: 767px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); z-index: 500; }
  .main { margin-left: 0; }
  .mobile-nav { display: flex; }
  .page { padding: 16px 16px 88px; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .chq-states { flex-direction: column; }
  .chq-state-btn { min-height: 56px; flex: none; }
}
```

---

## 5. HOME PAGE ARCHITECTURE

### 5.1 Lifecycle stage system
```javascript
// Determines home page layout and copy register
function getLifecycleStage(profile, fans) {
  const frcDone = localStorage.getItem('frc_done');
  const gigActive = parseInt(localStorage.getItem('able_gig_expires')||'0') > Date.now();
  if (gigActive) return 'gig';
  if (!frcDone && fans.length === 0) return 'new';
  return 'active';
}
// Applied as: document.getElementById('page-home').dataset.stage = stage
```

```css
/* Stage-driven layout */
[data-stage="new"] .campaign-hq { order: 3; }
[data-stage="new"] #firstRunCard { order: 1; }
[data-stage="active"] .campaign-hq { order: 1; }
[data-stage="active"] #firstRunCard { display: none !important; }
[data-stage="gig"] .campaign-hq { order: 1; }
```

### 5.2 Greeting system
```javascript
function getFirstName(profile) {
  return (profile.name || '').split(' ')[0] || null;
}

function buildGreetingSub(profile) {
  const now = Date.now();
  const releaseDate = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null;
  const gigExpires = parseInt(localStorage.getItem('able_gig_expires') || '0');
  const LIVE_WINDOW = 14 * 24 * 60 * 60 * 1000;

  if (gigExpires > now) return 'You\'re on tonight.';

  if (releaseDate && releaseDate > now) {
    const daysLeft = Math.ceil((releaseDate - now) / 86400000);
    const title = profile.release?.title || 'your release';
    if (daysLeft === 1) return 'Tomorrow. Your page is set.';
    if (daysLeft <= 3) return `${daysLeft} days. Your page is set.`;
    return `${daysLeft} days until ${title}.`;
  }

  if (releaseDate && now < releaseDate + LIVE_WINDOW) {
    const daysLeft = Math.ceil((releaseDate + LIVE_WINDOW - now) / 86400000);
    const title = profile.release?.title || 'your release';
    if (daysLeft <= 3) return `${daysLeft} days left in your live window.`;
    return `${title} is out. This is your window.`;
  }

  // Post-gig (within 24h)
  const gigEnded = parseInt(localStorage.getItem('able_gig_expires') || '0');
  if (gigEnded > 0 && gigEnded < now && (now - gigEnded) < 86400000) {
    const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
    const lastShow = shows[shows.length - 1];
    const newFans = countFansAfterTimestamp(gigEnded - 86400000);
    if (lastShow) return `Last night at ${lastShow.venue}. ${newFans} fan${newFans !== 1 ? 's' : ''} joined.`;
  }

  return 'Your page, your list, your relationship.';
}

function applyGreeting(profile) {
  const firstName = getFirstName(profile);
  const firstEver = !localStorage.getItem('admin_ever_visited');

  if (firstEver) {
    localStorage.setItem('admin_ever_visited', '1');
    document.getElementById('homeGreeting').textContent =
      firstName ? `Good to meet you, ${firstName}.` : 'Good to meet you.';
    document.getElementById('homeSub').textContent = 'Your page is live.';
    setTimeout(() => {
      const el = document.getElementById('homeSub');
      el.style.transition = 'opacity 0.4s';
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = buildGreetingSub(profile);
        el.style.opacity = '1';
      }, 400);
    }, 2500);
  } else {
    document.getElementById('homeGreeting').textContent =
      firstName ? `Good to see you, ${firstName}.` : 'Good to see you.';
    document.getElementById('homeSub').textContent = buildGreetingSub(profile);
  }
}
```

### 5.3 Stats: day-1 zero state
```javascript
function resolveStats() {
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  const clicks = JSON.parse(localStorage.getItem('able_clicks') || '[]');
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const isDay1 = views.length === 0 && fans.length === 0;

  // Views
  const viewEl = document.getElementById('statViews');
  viewEl.classList.remove('skel');
  viewEl.setAttribute('aria-hidden', 'false');
  viewEl.textContent = views.length.toLocaleString();

  const viewDelta = document.getElementById('statViewsDelta');
  viewDelta.classList.remove('skel');
  viewDelta.textContent = isDay1 ? 'Day 1 ✦' : `+${todayCount(views)} today`;
  if (isDay1) viewDelta.style.color = 'var(--dash-amber)';

  // Sparklines: only render if ≥3 days of data
  const daySpan = getDataDaySpan(views);
  if (daySpan < 3) {
    document.querySelectorAll('.sparkline').forEach(s => s.style.visibility = 'hidden');
  }
}
// Call: setTimeout(resolveStats, 0) — immediately after DOM ready
// Fallback: setTimeout(resolveStats, 600) — resolves skel after max 600ms regardless
```

---

## 6. CAMPAIGN HQ SPEC

### 6.1 DOM structure
```html
<div class="campaign-hq" id="campaignHq" data-state="profile">
  <div class="chq-head">
    <span class="chq-title">Campaign HQ</span>
    <span class="chq-state-pill" id="chqStatePill">Profile</span>
  </div>
  <div class="chq-body">
    <!-- Release title + date picker -->
    <!-- Release timeline arc -->
    <!-- State buttons row -->
    <!-- Auto-switch hint -->
    <!-- Gig toggle strip -->
    <!-- C16 gig countdown bar -->
    <!-- Mini phone preview (desktop only) -->
  </div>
</div>
```

### 6.2 Accent left border on active campaign
```css
.campaign-hq[data-state="pre"]  { border-left: 3px solid #fbbf24; }
.campaign-hq[data-state="live"] { border-left: 3px solid #ef4444; }
.campaign-hq[data-state="gig"]  { border-left: 3px solid #f46442; }
```

### 6.3 State button spring animation
```css
.chq-state-btn:active {
  transform: scale(0.97);
  transition: transform 80ms ease;
}
.chq-state-btn.on {
  animation: stateSpringIn 280ms var(--spring) both;
}
@keyframes stateSpringIn {
  from { transform: scale(0.94); opacity: 0.7; }
  to   { transform: scale(1);    opacity: 1; }
}
.chq-state-btn { min-height: 56px; }
```

### 6.4 Auto-switch hint copy
```
Switches to Live automatically on [formatted date].
```
Format: `new Date(releaseDate).toLocaleDateString('en-GB', {day:'numeric', month:'long'})`

### 6.5 Mini phone preview (desktop only, aria-hidden)
```html
<div class="chq-preview-wrap" aria-hidden="true" aria-label="Live page preview">
  <iframe
    id="chqPreview"
    src="able-v7.html"
    tabindex="-1"
    loading="lazy"
    style="width:390px;height:844px;border:none;pointer-events:none;border-radius:20px;"
  ></iframe>
</div>
```
```css
.chq-preview-wrap {
  width: 72px; height: 155px;
  border-radius: 12px; overflow: hidden;
  border: 2px solid var(--dash-border);
  flex-shrink: 0; position: relative;
}
.chq-preview-wrap iframe {
  transform: scale(0.185);
  transform-origin: top left;
  display: block;
}
@media (max-width: 767px) {
  .chq-preview-wrap { display: none; }
}
```

---

## 7. MILESTONE SYSTEM

### 7.1 Milestone thresholds
```javascript
const MILESTONES = [1, 10, 50, 100, 250, 500, 1000];

function checkAndShowMilestone(fans) {
  const count = fans.length;
  const reached = MILESTONES.filter(m => m <= count);
  if (!reached.length) return;
  const highest = reached[reached.length - 1];
  const key = `milestone_${highest}_shown`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, '1');
  showMilestoneCard(highest);
}
```

### 7.2 Milestone copy
```javascript
const MILESTONE_COPY = {
  1:    { line1: 'Your first fan.', line2: 'This is how every list starts.' },
  10:   { line1: '10 fans.', line2: '10 people who said yes.' },
  50:   { line1: '50 fans.', line2: '50 people your music reached directly.' },
  100:  { line1: '100 fans.', line2: 'This is the free tier limit — and it means 100 people found you on their own.' },
  250:  { line1: '250 fans.', line2: 'A room full of people who signed up for you.' },
  500:  { line1: '500 fans.', line2: 'Five hundred people who stayed close.' },
  1000: { line1: '1,000 fans.', line2: 'A thousand people who wanted to hear from you directly.' },
};
```

### 7.3 Milestone card design
Same visual style as "It's working" card:
- `background: rgba(var(--acc-rgb), 0.08)`
- `border: 1px solid rgba(var(--acc-rgb), 0.2)`
- Amber icon: ✦ or the fan count number
- `animation: fadeSlide 0.3s var(--ease) both`
- Auto-dismiss: 6 seconds, with × button for manual dismiss

---

## 8. FAN LIST ENHANCEMENTS

### 8.1 "New" badge (24h)
```css
.fan-new-badge {
  font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
  padding: 2px 6px; border-radius: 4px;
  background: rgba(var(--acc-rgb), 0.15);
  color: var(--acc); text-transform: uppercase;
  flex-shrink: 0;
}
```
```javascript
// In fan row render:
const isNew = Date.now() - fan.ts < 86400000;
if (isNew) row.innerHTML += '<span class="fan-new-badge">new</span>';
```

### 8.2 Export button
Always visible at bottom of Fans page:
```html
<button class="export-btn" onclick="exportFansCSV()">Export as CSV →</button>
```
```css
.export-btn {
  margin-top: 16px; padding: 10px 18px;
  font-size: 12px; font-weight: 600; color: var(--acc);
  background: rgba(var(--acc-rgb), 0.08);
  border: 1px solid rgba(var(--acc-rgb), 0.2);
  border-radius: 100px; cursor: pointer; font-family: var(--font);
  transition: all .14s;
}
.export-btn:hover { background: rgba(var(--acc-rgb), 0.15); }
```

### 8.3 "These emails are yours" note
```html
<p class="fan-ownership-note">
  These emails are yours. ABLE never contacts your fans without your permission.
</p>
```
```css
.fan-ownership-note {
  font-size: 11px; color: var(--dash-t3); margin-top: 12px;
  text-align: center; line-height: 1.5;
}
```

### 8.4 Streak signal
```javascript
function checkStreak() {
  // If views array has entries for 5+ of the last 7 days:
  const views = JSON.parse(localStorage.getItem('able_views') || '[]');
  const streak = calcViewStreak(views);
  if (streak >= 5) {
    showNudge('Your page has had visitors every day this week.');
  }
}
```

---

## 9. FOCUS RING SYSTEM

```css
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--dash-bg), 0 0 0 4px var(--acc), 0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

---

## 10. CROSS-PAGE VIEW TRANSITION

```css
@view-transition { navigation: auto; }
.sb-logo-type { view-transition-name: able-logo; }
```

Matches `able-v7.html`:
```css
@view-transition { navigation: auto; }
.able-brand-name { view-transition-name: able-logo; }
```

When artist taps "Edit page →" or "View live page ↗", the ABLE logo flies as a shared element. Progressive enhancement: Chrome 126+, no-op in other browsers.

---

## 11. TOPBAR LIVE CHIP

```html
<span class="live-chip" id="liveChip" onclick="window.open('able-v7.html','_blank')" tabindex="0">
  <span class="live-dot" id="liveDot"></span>
  Live
</span>
```
```css
.live-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600;
  background: rgba(var(--artist-accent-rgb), 0.10);
  color: var(--artist-accent);
  border: 1px solid rgba(var(--artist-accent-rgb), 0.25);
  cursor: pointer; transition: all .14s;
}
.live-chip:hover { background: rgba(var(--artist-accent-rgb), 0.18); }
.live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--artist-accent);
  animation: livePulse2 2s ease-in-out infinite;
}
```
```javascript
// On init: read artist accent from profile
const accent = profile.accent || '#f4b942';
document.documentElement.style.setProperty('--artist-accent', accent);
// Compute RGB:
const [r, g, b] = hexToRgb(accent);
document.documentElement.style.setProperty('--artist-accent-rgb', `${r},${g},${b}`);
```

---

## 12. MOBILE BOTTOM TAB BAR

### 12.1 Tabs
```html
<nav class="mobile-nav" role="navigation" aria-label="Main navigation">
  <button class="mn-item on" onclick="showPage('home')" aria-label="Home">
    [Home SVG icon]
    <span>Home</span>
  </button>
  <button class="mn-item" onclick="showPage('fans')" aria-label="Fans">
    [Fans SVG icon]
    <span>Fans</span>
  </button>
  <button class="mn-item" onclick="openCampaignSheet()" aria-label="Campaign">
    [Campaign SVG icon]
    <span>Campaign</span>
  </button>
  <button class="mn-item" onclick="openContentSheet()" aria-label="Content">
    [Content SVG icon]
    <span>Content</span>
  </button>
  <button class="mn-item" onclick="openMoreSheet()" aria-label="More">
    [More SVG icon]
    <span>More</span>
  </button>
</nav>
```

### 12.2 Campaign bottom sheet (mobile only)
```javascript
function openCampaignSheet() {
  const sheet = document.getElementById('campaignSheet');
  sheet.style.display = 'block';
  requestAnimationFrame(() => sheet.classList.add('open'));
}
function closeCampaignSheet() {
  const sheet = document.getElementById('campaignSheet');
  sheet.classList.remove('open');
  setTimeout(() => sheet.style.display = 'none', 320);
}
```
```css
.bottom-sheet { position: fixed; inset: 0; z-index: 300; display: none; }
.bottom-sheet-backdrop {
  position: absolute; inset: 0; background: rgba(0,0,0,0.4);
  opacity: 0; transition: opacity 0.28s ease;
}
.bottom-sheet-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: var(--dash-card); border-radius: 20px 20px 0 0;
  padding: 0 20px calc(20px + env(safe-area-inset-bottom));
  transform: translateY(100%);
  transition: transform 0.32s var(--ease);
  max-height: 80vh; overflow-y: auto;
}
.bottom-sheet.open .bottom-sheet-backdrop { opacity: 1; }
.bottom-sheet.open .bottom-sheet-content { transform: translateY(0); }
.bottom-sheet-handle {
  width: 36px; height: 4px; border-radius: 2px;
  background: var(--dash-border); margin: 12px auto 16px;
}
```

---

## 13. FIRST-RUN CHECKLIST UPDATES

### Copy
```
Title: "Four things, then you're live."
Step 1 title: "Add a photo or piece of artwork"
Step 1 sub: "This goes at the top of your page — the first thing fans see"
Step 2 title: "Copy your page link"
Step 2 sub: "Your link: ablemusic.co/[slug] — tap to copy it"
Step 3 title: "Put the link in your Instagram and TikTok bio"
Step 3 sub: "This is where your first fans will find you"
Step 4 title: "Add your latest release"
Step 4 sub: "Paste a Spotify, YouTube, or SoundCloud link — artwork fills in automatically"
Dismiss button: "Hide this"
```

### Completion moment
```javascript
function onFirstRunComplete() {
  const card = document.getElementById('firstRunCard');
  card.innerHTML = `
    <div style="text-align:center;padding:16px;font-size:13px;font-weight:600;color:var(--acc);">
      Your page is ready. This is where your fans start.
    </div>
  `;
  localStorage.setItem('frc_done', '1');
  setTimeout(() => {
    card.style.transition = 'opacity 0.4s';
    card.style.opacity = '0';
    setTimeout(() => { card.style.display = 'none'; }, 400);
  }, 2200);
}
```

---

## 14. UPGRADE BOTTOM SHEET

Replaces Settings redirect for all tier gate taps:

```html
<div class="bottom-sheet" id="upgradeSheet">
  <div class="bottom-sheet-backdrop" onclick="closeUpgradeSheet()"></div>
  <div class="bottom-sheet-content">
    <div class="bottom-sheet-handle"></div>
    <h2 style="font-size:16px;font-weight:700;color:var(--dash-text);margin-bottom:20px;">Your plan</h2>
    <!-- Tier comparison row -->
    <!-- [Continue free] [Try Artist →] [Try Pro →] -->
  </div>
</div>
```

**Trigger:** any `.glo-btn` click, any fan cap CTA, any analytics gate CTA.

---

## 15. COPY REFERENCE (all visible strings)

See `COPY.md` for complete copy specification. Key rules:
- Never "Welcome back!" / "You're all set!" / "Get started"
- Greeting must include first name when available
- Stats labels: "Visits" / "Clicks" / "Fans" / "Click rate"
- Toasts: "Saved." / "Copied." / "Removed." / "Your page link is copied."
- All tier gates: specific value prop + price, not just "Upgrade"

---

## 16. ACCESSIBILITY CHECKLIST

- [ ] `*:focus-visible` glow ring (§9)
- [ ] All skeleton shimmer: `aria-hidden="true"`
- [ ] Bottom tab bar: `role="navigation"` + `aria-label="Main navigation"`
- [ ] Campaign bottom sheet: focus trap on open, returns focus on close
- [ ] All icon-only buttons: `aria-label`
- [ ] `--dash-t3: #777777` (AA compliant for small text)
- [ ] Bottom sheet drag handle: `aria-hidden="true"`
- [ ] Mini phone preview iframe: `tabindex="-1"` + `aria-hidden="true"`
- [ ] `prefers-reduced-motion` respected for all animations

---

## 17. PLAYWRIGHT VERIFICATION CHECKLIST

```
□ Mobile: sidebar is hidden at 375px (transform: translateX(-100%))
□ Mobile: bottom tab bar is visible at 375px
□ Mobile: Campaign tab opens bottom sheet
□ Desktop: sidebar visible, no bottom tab bar
□ Greeting includes artist name from profile.name
□ Greeting sub-line updates when pre-release date is set
□ Stats resolve from localStorage within 600ms (no indefinite shimmer)
□ Campaign HQ is above stats row on home page when data-stage="active"
□ First-run checklist shows when frc_done not set
□ All 4 checklist steps are tappable and navigate correctly
□ Checklist completion moment appears when all 4 done
□ Milestone card appears when fan count crosses threshold
□ "It's working" card appears when first click data exists
□ Fan list shows "new" badge for fans within 24h
□ Export button visible on Fans page
□ Campaign HQ state buttons: min-height 56px
□ State switch: spring animation plays on button press
□ Focus ring visible on all interactive elements
□ Upgrade bottom sheet opens from all gate CTAs
□ view-transition fires on "Edit page →" click (Chrome 126+)
```


---
# FILE: docs/pages/onboarding/DESIGN-SPEC.md
---

# ABLE Onboarding Wizard — Design Specification
**Stage 6B | File: `start.html` | Last updated: 2026-03-15**

> This document is the single source of truth for building `start.html`. A developer must be able to build the entire file from this document without asking a single question. Every pixel, every state, every animation, every piece of copy is defined here.

---

## Table of Contents

1. [Design System Tokens](#1-design-system-tokens)
2. [Architecture Overview](#2-architecture-overview)
3. [Layout Structure](#3-layout-structure)
4. [Global Wrapper — Persistent Elements](#4-global-wrapper--persistent-elements)
5. [Screen 0 — Hook / Import](#5-screen-0--hook--import)
6. [Screen 1 — Name](#6-screen-1--name)
7. [Screen 2 — Vibe](#7-screen-2--vibe)
8. [Screen 3 — Accent Colour](#8-screen-3--accent-colour)
9. [Screen 4 — Theme](#9-screen-4--theme)
10. [Screen 5 — Links](#10-screen-5--links)
11. [Screen 6 — Fan Capture CTA](#11-screen-6--fan-capture-cta)
12. [Screen 7 — Current Moment](#12-screen-7--current-moment)
13. [Screen 8 — Done](#13-screen-8--done)
14. [Live Preview Panel](#14-live-preview-panel)
15. [Step Transitions](#15-step-transitions)
16. [Storage Behaviour](#16-storage-behaviour)
17. [Netlify Import Functions](#17-netlify-import-functions)
18. [Accessibility](#18-accessibility)
19. [Playwright Verification Checklist](#19-playwright-verification-checklist)

---

## 1. Design System Tokens

Define these as CSS custom properties on `:root`. All values in this document reference these tokens only — never use raw hex values or px values outside of the token definition block.

```css
:root {
  /* Backgrounds */
  --color-bg:      #0d0e1a;
  --color-card:    #12152a;

  /* Borders */
  --color-border:  rgba(255, 255, 255, 0.08);

  /* Accent — default; overridden via JS after Screen 3 */
  --color-accent:  #e05242;

  /* Text */
  --color-text:    #f0f0f5;
  --color-muted:   rgba(240, 240, 245, 0.5);

  /* Semantic colours */
  --color-success: #78c47b;
  --color-amber:   #f4b942;
  --color-error:   #e05242;

  /* Typography */
  --font-body:     'DM Sans', sans-serif;
  --font-display:  'Barlow Condensed', sans-serif;

  /* Easing */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Font loading.** Load both fonts via Google Fonts in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

**Accent override.** When the user selects an accent colour on Screen 3, update `--color-accent` on `:root` via JavaScript:

```js
document.documentElement.style.setProperty('--color-accent', selectedHex);
```

This single operation updates every accent-coloured element on the page including the preview panel with no additional work.

**Cross-document View Transition.** Add this at-rule to enable shared-element transition when navigating from `start.html` → `able-v7.html` (Chrome 126+, progressive enhancement):

```css
/* start.html */
@view-transition {
  navigation: auto;
}

/* Artist name element in Done screen phone preview */
.done-preview-artist-name {
  view-transition-name: artist-name;
}
```

The matching declaration in `able-v7.html` (hero artist name) must also have `view-transition-name: artist-name`. When the artist taps "See your live page", their name flies from the preview to the hero. Falls back to normal navigation on browsers without support.

**Complete type scale.** Add these to `:root` and use throughout:

| Element | CSS |
|---|---|
| Step headline H1 | `font: 800 clamp(38px,9.5vw,60px)/0.95 var(--font-display); text-transform: uppercase; letter-spacing: -0.02em` |
| Done screen headline | `font: 800 clamp(42px,11vw,72px)/0.9 var(--font-display); text-transform: uppercase; letter-spacing: -0.02em` |
| Step eyebrow | `font: 600 11px/1.4 var(--font-body); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-accent)` |
| Step subtitle | `font: 400 clamp(15px,3.8vw,17px)/1.65 var(--font-body)` |
| Card label | `font: 700 15px/1.3 var(--font-body)` |
| Card description | `font: 400 13px/1.55 var(--font-body); color: var(--color-muted)` |
| Field label | `font: 600 12px/1.4 var(--font-body); text-transform: uppercase; letter-spacing: 0.08em` |
| Field input | `font: 400 16px/1.5 var(--font-body)` — **minimum 16px: prevents iOS Safari viewport zoom** |
| Field hint | `font: 400 12px/1.5 var(--font-body); color: var(--color-muted)` |
| Field error | `font: 500 12px/1.4 var(--font-body); color: var(--color-error)` |
| Progress text | `font: 500 11px/1.4 var(--font-body); letter-spacing: 0.04em` |
| Continue button | `font: 700 15px/1 var(--font-body)` |
| Back button | `font: 500 14px/1 var(--font-body); color: var(--color-muted)` |

---

## 2. Architecture Overview

The wizard is a single HTML page (`start.html`) with 9 screens (0–8). Only one screen is visible at any time. There is no routing — screens are shown/hidden by toggling a CSS class.

**Screen list:**

| Index | ID | Title |
|---|---|---|
| 0 | `screen-hook` | Hook / Import |
| 1 | `screen-name` | Name |
| 2 | `screen-vibe` | Vibe |
| 3 | `screen-accent` | Accent colour |
| 4 | `screen-theme` | Theme |
| 5 | `screen-links` | Links |
| 6 | `screen-fan-cta` | Fan capture CTA |
| 7 | `screen-moment` | Current moment |
| 8 | `screen-done` | Done |

**Step numbering.** The progress bar and step counter count steps 1–7, corresponding to screens 1–7. Screen 0 and Screen 8 are outside the numbered flow.

**State object.** A single JS object `wizardState` holds all collected values:

```js
const wizardState = {
  importUrl:       null,   // raw pasted URL
  importedName:    null,   // from Spotify/import
  importedGenres:  [],     // from Spotify
  importedLinks:   [],     // from Linktree/import
  name:            '',
  vibe:            null,   // one of the 8 vibe slugs
  accent:          '#e05242',
  theme:           'dark', // 'dark' | 'light' | 'glass' | 'contrast'
  links:           [],     // [{ url, platform, label }]
  fanCta:          null,   // 'stay-close' | 'hear-first' | 'come-show' | 'support'
  moment:          null,   // 'just-dropped' | 'coming-soon' | 'tonight' | 'evergreen'
  releaseDate:     null,   // ISO date string (moment = 'coming-soon')
  streamLink:      '',     // optional (moment = 'just-dropped')
  venueName:       '',     // optional (moment = 'tonight')
  ticketUrl:       '',     // optional (moment = 'tonight')
  slug:            '',     // generated on Screen 8
};
```

---

## 3. Layout Structure

### 3.1 HTML skeleton

```html
<body>
  <div id="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="7"></div>
  <div id="wizard-shell">
    <div id="left-panel">
      <div id="wizard-topbar">
        <button id="btn-back">← Back</button>
        <span id="step-counter">Step 1 of 7</span>
      </div>
      <div id="screens-container">
        <!-- screens injected or present in DOM, toggled via class -->
      </div>
    </div>
    <div id="right-panel">
      <div id="preview-wrapper">
        <!-- phone frame + preview content -->
      </div>
    </div>
  </div>
</body>
```

### 3.2 Global layout values

| Property | Desktop (≥768px) | Mobile (<768px) |
|---|---|---|
| `#wizard-shell` display | `flex`, `flex-direction: row`, `gap: 48px` | `flex`, `flex-direction: column` |
| `#wizard-shell` max-width | `1200px` | `100%` |
| `#wizard-shell` margin | `0 auto` | `0` |
| `#wizard-shell` padding | `40px 48px` | `0` |
| `#left-panel` max-width | `560px` | `100%` |
| `#left-panel` flex | `1 1 560px` | `1` |
| `#left-panel` padding | `0` | `24px 20px 0 20px` |
| `#right-panel` max-width | `420px` | `100%` |
| `#right-panel` flex | `0 0 420px` | none (see §3.4) |
| `#right-panel` position | `sticky`, `top: 40px` | static |

**Page background:** `background-color: var(--color-bg)`. Applied on `<body>`.

**Minimum body height:** `min-height: 100svh`. Use `100svh` (small viewport height — address bar always counted) as the safe default. **Do NOT use `100dvh` for the keyboard problem** — on iOS Safari, `dvh` does NOT shrink when the virtual keyboard opens (the layout viewport is unchanged). The keyboard is handled separately via `visualViewport` API (see Section 3.5).

**Viewport meta tag (required):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-visual">
```
The `interactive-widget=resizes-visual` attribute enforces consistent keyboard behaviour cross-browser (only visual viewport shrinks), enabling the `visualViewport` pattern to work uniformly on Android Chrome and iOS Safari.

### 3.3 Desktop right panel

The right panel is sticky so it stays in view as the user scrolls through longer screens. It holds the phone frame preview.

```css
#right-panel {
  position: sticky;
  top: 40px;
  align-self: flex-start;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
```

The phone frame has an intrinsic size of 390×844px. It is scaled down to fit the panel width using `transform: scale(0.65)` with `transform-origin: top center`. The containing element must be explicitly sized to the post-scale footprint so the layout does not collapse:

```css
#preview-wrapper {
  width: 390px;              /* intrinsic frame width */
  height: 844px;             /* intrinsic frame height */
  transform: scale(0.65);
  transform-origin: top center;
  /* Post-scale footprint hack — container collapses to scaled size */
  margin-bottom: calc((844px * 0.65) - 844px); /* ≈ -295px */
}
```

Practical note: set `#right-panel` height to `calc(844px * 0.65)` = `548.6px` and use `overflow: visible` so the transform does not clip.

### 3.4 Mobile preview — floating pill + bottom sheet

**Research basis:** No production app shows a side-by-side live preview at 390px. The production pattern (Linktree, Beacons, Squarespace mobile editor) is a floating pill that opens a full-screen bottom sheet. The 200px peek pattern was superseded by this research finding.

**Floating pill** — appears from Step 2 onwards (once vibe is selected and the preview has meaningful content):

```css
#preview-pill {
  position: fixed;
  bottom: 96px;           /* above the Continue button */
  right: 16px;
  height: 40px;
  padding: 0 16px;
  background: rgba(18, 21, 42, 0.92);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  touch-action: manipulation;
  z-index: 50;
  transition: opacity 200ms ease, transform 200ms ease;
}
```

Copy: `👁 See your page` — tapping opens the preview sheet.

**Preview bottom sheet:**

```css
#preview-sheet {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

#preview-sheet__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
}

#preview-sheet__panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 92vh;
  background: var(--color-card);
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 320ms cubic-bezier(0.25,0.46,0.45,0.94);
  will-change: transform;
}

#preview-sheet__panel.is-open {
  transform: translateY(0);
}
```

Sheet contains: drag handle (40×4px pill, muted, centred, mt-12) + "Your page" heading (DM Sans 14px 500, muted, mt-8) + the phone preview at `scale(0.82)` centred + "Close" pill button at bottom (48px height, full-width, muted border).

**On mobile, `#right-panel` is hidden entirely** (`display: none` at `max-width: 767px`). All preview access is via the pill/sheet pattern.

### 3.5 Keyboard handling (mobile — critical)

**The problem:** On iOS Safari, `100dvh` does NOT shrink when the virtual keyboard opens. The layout viewport is unchanged. Only the visual viewport shrinks. This means your fixed-position Continue button can be hidden behind the keyboard.

**The fix — `visualViewport` API:**

```javascript
function handleKeyboard() {
  const vv = window.visualViewport;
  const continueBtn = document.querySelector('.continue-btn');
  if (!continueBtn) return;

  // Pin the button to bottom of visual viewport
  const offset = window.innerHeight - (vv.height + vv.offsetTop);
  continueBtn.style.transform = `translateY(-${Math.max(0, offset)}px)`;
}

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', handleKeyboard);
  window.visualViewport.addEventListener('scroll', handleKeyboard);
}
```

The Continue button must be `position: fixed; bottom: 24px` as default, and the JS lifts it above the keyboard. This is the same pattern Duolingo uses for their "Check" button on mobile web.

**`touch-action: manipulation` on all interactive elements** — removes 300ms tap delay on all buttons and cards:

```css
button, .vibe-card, .theme-card, .cta-card, .swatch, a {
  touch-action: manipulation;
}
```

**`overscroll-behavior: contain` on wizard container** — prevents iOS background bounce:

```css
#wizard-shell {
  overscroll-behavior: contain;
}
```

---

## 4. Global Wrapper — Persistent Elements

These elements live outside the screens container and are always in the DOM. Their visibility changes per screen.

### 4.1 Progress bar

**Element:** `<div id="progress-bar">`

| Property | Value |
|---|---|
| Position | `fixed`, `top: 0`, `left: 0`, `right: 0` |
| Height | `3px` |
| Background | `var(--color-accent)` |
| z-index | `100` |
| Initial width | `0%` |
| Width formula | `calc((currentStep / 7) * 100%)` where `currentStep` is 1–7 |
| Width transition | `width 300ms var(--ease-standard)` |
| Visibility | Visible on screens 1–7. `width: 0` and `opacity: 0` on screens 0 and 8. |

ARIA attributes update on every step advance:

```js
bar.setAttribute('aria-valuenow', currentStep);
```

### 4.2 Step counter

**Element:** `<span id="step-counter">`

| Property | Value |
|---|---|
| Font | DM Sans, 12px, weight 400 |
| Colour | `var(--color-muted)` |
| Position | Top-left of `#wizard-topbar` |
| Content | "Step N of 7" — N is current screen index (1–7) |
| Visibility | Hidden on screens 0 and 8. `display: none`. |

### 4.3 Back button

**Element:** `<button id="btn-back">`

| Property | Value |
|---|---|
| Font | DM Sans, 14px, weight 400 |
| Colour | `var(--color-muted)` |
| Background | none |
| Border | none |
| Cursor | `pointer` |
| Content | "← Back" |
| Visibility | Hidden on screens 0 and 8. `display: none`. |
| Hover | Colour transitions to `var(--color-text)`, 200ms linear |
| Min tap target | 44×44px (apply `padding: 10px` to enlarge hit area) |

**Back behaviour:** Clicking navigates to the previous screen using the reverse slide transition (see §15). State is preserved — inputs retain their values.

### 4.4 Top bar layout

```css
#wizard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;         /* desktop */
  height: 40px;
}

@media (max-width: 767px) {
  #wizard-topbar {
    margin-bottom: 24px;
  }
}
```

---

## 5. Screen 0 — Hook / Import

**ID:** `screen-hook`
**Step counter:** hidden
**Back button:** hidden
**Progress bar:** `width: 0`, `opacity: 0`

### 5.1 Background

Applied to `screen-hook` element (not `body`), so it covers the full viewport:

```css
#screen-hook {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(224, 82, 66, 0.08) 0%, transparent 70%),
    var(--color-bg);
  padding: 48px 24px;
  text-align: center;
}
```

### 5.2 Headline

```
Text:         "Your page. No algorithm."
Font:         Barlow Condensed
Weight:       700
Size:         64px (desktop) / 44px (mobile, breakpoint 767px)
Line-height:  1.0
Letter-spacing: -0.5px
Colour:       var(--color-text) — white
Alignment:    centre
Margin-bottom: 16px
```

### 5.3 Sub-headline

```
Text:         "Set up in 3 minutes. Share the link. The rest is yours."
Font:         DM Sans
Weight:       400
Size:         16px (desktop and mobile)
Line-height:  1.6
Colour:       var(--color-muted)
Alignment:    centre
Max-width:    480px
Margin:       auto (horizontal), 0 0 32px 0 (bottom)
```

### 5.4 Import input

**Container:** `width: 100%`, `max-width: 520px`, `position: relative`

**Input element `<input type="url" id="import-input">`:**

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `56px` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `14px` |
| Padding | `0 52px 0 16px` (right side reserved for icons/spinner) |
| Font | DM Sans, 16px, weight 400 |
| Colour | `var(--color-text)` |
| Placeholder colour | `var(--color-muted)` |
| Outline | none |
| Focus border | `border-color: var(--color-accent)`, `box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.25)`, transition `200ms var(--ease-standard)` — glow at 0.25 opacity so the ring feels alive, not clinical |

**Placeholder cycling.** The placeholder text cycles through 4 strings on a timer. Each string is shown for 2500ms with a 300ms crossfade. Use a `<span>` overlay positioned absolutely inside the container rather than the native `placeholder` attribute — this allows crossfade animation.

Cycle strings (in order, looping):
1. "Paste any link to your music or socials"
2. "linktr.ee/yourname"
3. "open.spotify.com/artist/..."
4. "soundcloud.com/yourname"

Crossfade implementation:

```css
.placeholder-cycling {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font: 400 16px/1 var(--font-body);
  color: var(--color-muted);
  transition: opacity 300ms var(--ease-standard);
}
/* Hide native placeholder when overlay is active */
#import-input::placeholder { color: transparent; }
/* Hide overlay when input has a value */
#import-input:not(:placeholder-shown) + .placeholder-cycling { display: none; }
```

**Platform icon badges.** When the pasted URL matches a known platform, 1–2 small icons (20px diameter circle, bg `var(--color-card)`, border `1px solid var(--color-border)`) appear in the right side of the input. They fade in: `opacity 0 → 1`, 200ms decel. Platforms detected: Spotify, SoundCloud, Linktree, Apple Music, Bandcamp, YouTube, Instagram, TikTok.

### 5.5 Import states

**Idle (default):** Border `1.5px solid var(--color-border)`.

**Typing / URL pasted:** Platform badges appear (see above). Button text: "Import →".

**Loading (import in flight):**
- Border: `1.5px solid var(--color-border)`
- Right side of input: dot-pulse animation (3 dots, 4px diameter, `var(--color-muted)`, animating scale 0.5→1→0.5 at 400ms stagger). 20px total width.
- Input `disabled`.
- Below input: "Looking you up… (just public data, nothing that needs access)" — DM Sans 13px, weight 400, `var(--color-muted)`, `margin-top: 8px`. The parenthetical signals a human wrote this. Do not shorten it.

**Import success:**
- Border: `1.5px solid var(--color-success)`
- Left of input value: check icon (16px, `var(--color-success)`)
- Below input — two lines:
  - Line 1: "There you are." — DM Sans 14px, weight 600, `var(--color-success)`, `margin-top: 8px`
  - Line 2: "[N] monthly listeners · [X] releases imported" — DM Sans 13px, weight 400, `var(--color-muted)`, `margin-top: 2px`
  - `N` = `followers.total` from Spotify API response (format with comma separator, e.g. "45,200")
  - `X` = count of albums/singles returned by import
- Auto-advance to Screen 1 after 1200ms (slightly longer to let artist read the data)

**Linktree import success:**
- Same success border and check icon
- Below input: "[N] links imported ✓" — DM Sans 14px, weight 400, `var(--color-success)`, `margin-top: 8px`
- `N` = number of links extracted from Linktree page

**Import failure:**
- Border: `1.5px solid var(--color-amber)`
- Below input: failure message in `var(--color-amber)`, DM Sans 14px, weight 400, `margin-top: 8px`
- Failure messages per error code:

| Code | Copy |
|---|---|
| `RATE_LIMITED` | "Spotify is busy right now — enter your name below and we'll skip it." |
| `BLOCKED` | "Couldn't reach that page. Enter your name below and carry on." |
| `NOT_FOUND` | "We couldn't find that artist. Check the link or start from scratch." |
| `TIMEOUT` | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |
| `PARSE_ERROR` | "Something went wrong reading that page. Enter your name below and carry on." |
| default | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |

### 5.6 Import submit trigger

- User pastes a URL containing "spotify", "soundcloud", "linktree", or known platform domains → immediately trigger import (no button press needed)
- User presses Enter → trigger import
- Pressing Enter when input is empty → advance to Screen 1 directly

### 5.7 "I'm not on Spotify →" link

```
Element:     <button> styled as link (no button appearance)
Text:        "I'm not on Spotify →"
Font:        DM Sans, 14px, weight 400
Colour:      var(--color-muted)
Margin-top:  12px
Alignment:   centre
Hover:       colour → var(--color-text), transition 200ms linear
Display:     block, margin: 12px auto 0 auto
```

Clicking this advances directly to Screen 1 without attempting any import. No data is pre-filled.

### 5.7b Artist mini-spotlight card

Shown between the import input and the trust line. Position: below import controls, above trust line.

```
Container:   flex row, align-items: center, gap: 12px
             320px max-width, background: var(--color-card), border-radius: 12px
             border: 1px solid var(--color-border), padding: 12px 14px
             full width on mobile
```

Left — avatar:
```
Size:        40×40px, border-radius: 50%, object-fit: cover
Fallback:    accent-colour gradient circle if no image
```

Middle — text:
```
Name:        DM Sans, 15px, weight 600, var(--color-text)
Sub-line:    "[City] · set up in [N] mins"
             DM Sans, 12px, weight 400, var(--color-muted)
```

Right — chevron:
```
SVG:         chevron-right, 16×16px, var(--color-accent)
Animation:   single CSS pulse on page load: scale(1) → scale(1.3) → scale(1), 0.8s ease-in-out,
             iteration-count: 1, prefers-reduced-motion: none
```

Label above card:
```
Text:        "What an ABLE page looks like →"
Font:        DM Sans, 11px, weight 500, var(--color-muted)
Margin-bottom: 8px
```

Interaction:
```
Element:     <button> styled as a flex container (not <a> — accessibility)
On tap:      window.open(featuredArtistUrl, '_blank')
Hover:       border-color → rgba(var(--color-accent-rgb), 0.4), 200ms linear
Active:      transform: scale(0.98), 80ms ease-out
```

**Content source:** `ABLE_SPOTLIGHT` constant in start.html `<script>` block. Update with founder's artist page data after first page is live:
```js
const ABLE_SPOTLIGHT = {
  name: 'Declan Forde',
  city: 'London',
  setupMins: 4,
  avatarUrl: 'https://...', // actual photo URL
  pageUrl: 'https://ablemusic.co/declan'
};
```
If `ABLE_SPOTLIGHT` is null, the spotlight card is not rendered (pre-first-page mode).

### 5.8 Trust line

```
Text:        "No card. No catch. Your page is free. Privacy policy →"
Font:        DM Sans, 12px, weight 400
Colour:      var(--color-muted)
Alignment:   centre
Margin-top:  16px
```

"Privacy policy →" is an `<a>` tag linking to the Iubenda privacy policy URL. Opens in new tab.

### 5.9 Social proof line

```
Text:        "Set up by artists in London, Manchester, Berlin, Bogotá, LA."
Font:        DM Sans, 11px, weight 400
Colour:      rgba(240, 240, 245, 0.3)   /* muted at 30% — more subtle than --color-muted */
Alignment:   centre
Margin-top:  8px
```

### 5.10 Resume banner

On page load, check `localStorage.getItem('able_wizard_draft')`. If the stored value exists and its `savedAt` timestamp is less than 24 hours ago:

**Show amber banner above the hook content:**

```
Background:  rgba(244, 185, 66, 0.12)
Border:      1px solid rgba(244, 185, 66, 0.3)
Border-radius: 10px
Padding:     12px 16px
Font:        DM Sans, 14px, weight 400
Colour:      var(--color-amber)
Text:        "Picking up where you left off."
```

On banner click (or tapping "Continue →" within the banner): restore `wizardState` from draft and navigate to the saved screen index (using forward transition, no animation on initial restore).

**Dismiss:** Small "✕" button (28×28px tap target) right side of banner. Dismisses banner without restoring state.

---

## 6. Screen 1 — Name

**ID:** `screen-name`
**Step:** 1 of 7
**Progress bar width:** `calc(1/7 * 100%)` = 14.28%

### 6.1 Headline

**Conditional on import state:**

If `wizardState.importedName !== null` (Spotify import succeeded):
```
Eyebrow:     "Good to meet you, [first name]."
Headline:    "Is [importedName] right?"
Sub-copy:    "Exactly right — keep going. Or type a different name below."
```
Name field is pre-filled with `importedName`. Cursor positioned at end of field.

If no import (`wizardState.importedName === null`):
```
Eyebrow:     "Step 1 of 7"
Headline:    "What do you go by?"
Sub-copy:    "Nothing goes live until you finish. Take your time."
```

**Headline spec (both paths):**
```
Font:        Barlow Condensed
Weight:      700
Size:        clamp(38px, 9.5vw, 60px)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 32px
```

### 6.2 Name input

**Element:** `<input type="text" id="input-name" autocomplete="name" spellcheck="false">`

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `56px` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `14px` |
| Padding | `0 16px` |
| Font | DM Sans, 16px, weight 400 |
| Colour | `var(--color-text)` |
| Placeholder | "Your artist name" |
| Placeholder colour | `var(--color-muted)` |
| Outline | none |
| Focus border | `border-color: var(--color-accent)`, transition `200ms var(--ease-standard)` |

**Auto-focus.** When Screen 1 becomes active, call `.focus()` on this input after the screen transition completes (150ms delay, aligns with transition timing).

**Pre-fill from import.** If `wizardState.importedName` is set, populate the input value with that name and position the cursor at the end. Also show the contextual micro-copy below the input (see §6.3).

### 6.3 Micro-copy

Two separate `<p>` elements below the input:

**Pre-fill micro-copy** (only shown when input was pre-filled from import):

```
Text:     "From your Spotify profile — edit if needed."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin:   8px 0 0 0
```

**Always-shown micro-copy:**

```
Text:     "Nothing goes live until you finish. Take your time."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin:   8px 0 0 0  (or 4px if pre-fill copy is also shown)
```

### 6.4 Continue button

This button spec applies to all Continue buttons across Screens 1–6. Screen 7 has a variant (see §12.6).

**Contextual CTA copy — each screen has its own label (not generic "Continue →"):**

| Screen | Primary CTA text | Secondary / skip text |
|---|---|---|
| Screen 0 | "Find me on Spotify →" | "Start without Spotify →" |
| Screen 1 | "That's my name →" | — |
| Screen 2 | "That's my vibe →" | — |
| Screen 3 | "That's my colour →" | — |
| Screen 4 | "Add my release →" | "Skip for now →" |
| Screen 5 | "Those are my links →" | — |
| Screen 6 | "Yes, capture my fans →" | "Skip fan sign-up →" |
| Screen 7 | "Build my page →" | — |
| Screen 8 | "See your live page" | — |

| Property | Value |
|---|---|
| Text | Per screen label above |
| Font | DM Sans, 16px, weight 600 |
| Height | `56px` |
| Width | `100%` on mobile; `min-width: 320px`, `max-width: 320px` on desktop |
| Background | `var(--color-accent)` |
| Colour | `#ffffff` |
| Border | none |
| Border-radius | `12px` |
| Margin-top | `28px` |
| Cursor | `pointer` |
| Display | `block` |
| Desktop alignment | `margin-left: 0` (left-aligned in left panel) |

**Hover state (enabled):**

```css
button.continue:hover {
  filter: brightness(1.08);
  transform: translate(-1px, -2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 200ms var(--ease-spring);
}
```

**Disabled state:**

```css
button.continue:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
  filter: none;
}
```

**Enabled condition.** Enabled as soon as the input contains ≥1 non-whitespace character.

**Enter key.** When the input is focused and contains ≥1 character, pressing Enter triggers Continue.

**Preview update.** On every keystroke in the name input, update the artist name displayed in the preview panel.

---

## 7. Screen 2 — Vibe

**ID:** `screen-vibe`
**Step:** 2 of 7
**Progress bar width:** `calc(2/7 * 100%)` = 28.57%

### 7.1 Headline

```
Text:        "What kind of music do you make?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 7.2 Vibe grid

```css
#vibe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);   /* mobile default */
  gap: 10px;
  margin-bottom: 28px;
}

@media (min-width: 480px) {
  #vibe-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Total cards:** 8 (7 genre vibes + 1 "My own thing.")

### 7.3 Vibe card spec

**Element structure (updated from research — native radio pattern gives arrow-key navigation free):**

```html
<fieldset id="vibe-grid" aria-required="true">
  <legend class="sr-only">What kind of music do you make?</legend>
  <label class="vibe-card" data-vibe="indie-alt">
    <input type="radio" name="vibe" value="indie-alt" class="sr-only">
    <span class="vibe-card__name">Indie / Alternative</span>
    <span class="vibe-card__artists">Wet Leg, Yard Act, The Smile</span>
  </label>
  <!-- ...repeat for each vibe... -->
</fieldset>
```

The `<label>` wraps the entire card, making the full card the tap target. The native `<input type="radio">` is visually hidden with `.sr-only` but fully accessible. Selected state is driven by `:has(input:checked)` CSS. Arrow keys navigate between cards automatically (native radio group behaviour — no JS needed).

**Selection animation — spring tap feedback (research-validated pattern):**

```css
/* Immediate press response — 0ms delay */
.vibe-card:active {
  transform: scale(0.97);
  transition: transform 50ms ease-out;
}

/* Selected state — spring return to scale(1.0) via CSS linear() spring */
.vibe-card:has(input:checked) {
  border: 2px solid var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.10);
  transform: scale(1.0);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.20);
  transition:
    border-color 150ms ease-out,
    background 150ms ease-out,
    box-shadow 150ms ease-out,
    transform var(--spring-duration) var(--spring-easing);
}
```

**The spring press sequence:**
1. `pointerdown` → `scale(0.97)` in 50ms (immediate, confirms tap felt)
2. Radio `checked` activates → browser springs from 0.97 → 1.04 (overshoot) → 1.0 via `var(--spring-easing)`
3. Border and background transition simultaneously at 150ms ease-out
4. The 4% overshoot (`scale(1.04)` at spring peak) is the craft — not visible as overshoot, felt as "alive"

If the user changes selection, the previous card snaps back to default (150ms). If JS is available, a `layoutId`-style shared indicator can glide between cards — spec this as a progressive enhancement via Framer Motion if the project adds it later.

Each card is a label+radio with:

| Property | Value |
|---|---|
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `14px` |
| Padding | `16px` |
| Cursor | `pointer` |
| Text-align | `left` |
| Touch-action | `manipulation` (removes 300ms tap delay) |
| Transition | per above — spring for transform, 150ms for colour properties |

**Card content layout:**

```
Genre name:     DM Sans, 16px, weight 600, var(--color-text), margin-bottom: 4px
Artist examples: DM Sans, 12px, weight 400, var(--color-muted), line-height 1.4
```

**Hover state (non-selected):**

```css
.vibe-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.01);
  transition: transform 150ms var(--ease-decel), border-color 150ms var(--ease-standard);
}
```

**Selected state:**

```css
.vibe-card[aria-checked="true"] {
  border: 2px solid var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.08);
  transform: scale(1.02);
  transition: transform 200ms var(--ease-spring);
}
```

Note: `--color-accent-rgb` must be computed from `--color-accent` in JS whenever the accent changes, storing the R,G,B components without `rgba()` wrapper, for use in `rgba()` expressions.

**Pre-selected state (genres matched from Spotify import).** Same visual as selected, plus a tag:

```
Tag text:     "matched"
Font:         DM Sans, 10px, weight 400
Colour:       var(--color-muted)
Background:   rgba(255,255,255,0.06)
Border-radius: 4px
Padding:      2px 6px
Margin-top:   6px
Display:      inline-block
```

### 7.4 Vibe card data

| Slug | Genre name | Artist examples |
|---|---|---|
| `indie-alt` | Indie / Alt | Phoebe Bridgers, Soccer Mommy, Big Thief |
| `electronic` | Electronic | Four Tet, Bonobo, Bicep |
| `hiphop-rnb` | Hip-Hop / R&B | Loyle Carner, Little Simz, Sampha |
| `folk-acoustic` | Folk / Acoustic | Nick Mulvey, Laura Marling, Sufjan Stevens |
| `pop` | Pop | Raye, Dua Lipa, Charli XCX |
| `jazz-soul` | Jazz / Soul | Nubya Garcia, Ezra Collective, Jordan Rakei |
| `metal-rock` | Metal / Rock | Fontaines D.C., Idles, Sleep Token |
| `own-thing` | My own thing. | I'll choose my own colours and feel. |

For the `own-thing` card, the second line replaces "artist examples":

```
Text:    "I'll choose my own colours and feel."
Font:    DM Sans, 11px, weight 400
Colour:  var(--color-muted)
```

### 7.5 Continue

Enabled as soon as any card is selected (`aria-checked="true"`). Disabled otherwise.

### 7.6 Accent pre-selection trigger

When a vibe card is selected, immediately set `--color-accent` per this mapping (if the user has not manually chosen a colour on Screen 3 yet):

| Vibe slug | Accent hex |
|---|---|
| `indie-alt` | `#78c47b` |
| `electronic` | `#5b8ef0` |
| `hiphop-rnb` | `#d4874a` |
| `folk-acoustic` | `#c8a96e` |
| `pop` | `#e05242` |
| `jazz-soul` | `#8b63c8` |
| `metal-rock` | `#d4cfc8` |
| `own-thing` | no change (retain default `#e05242`) |

This pre-selection is visible in the preview panel immediately.

---

## 8. Screen 3 — Accent Colour

**ID:** `screen-accent`
**Step:** 3 of 7
**Progress bar width:** `calc(3/7 * 100%)` = 42.86%

### 8.1 Headline

```
Text:        "Pick a colour that feels like you."
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 32px
```

### 8.2 Swatch grid

```css
#swatch-grid {
  display: grid;
  grid-template-columns: repeat(4, 44px);
  gap: 12px;
  margin-bottom: 20px;
}
```

**Total swatches:** 8 (one row of 4 on mobile is fine — 4 columns always)

### 8.3 Swatch spec

**Element:** `<button class="swatch" aria-label="[Colour name]" data-hex="[hex]" style="background: [hex];">`

| Property | Value |
|---|---|
| Width | `44px` |
| Height | `44px` |
| Border-radius | `50%` |
| Border | none (default) |
| Cursor | `pointer` |
| Transition | `transform 150ms var(--ease-decel), box-shadow 150ms var(--ease-decel)` |

**Hover state:**

```css
.swatch:hover {
  transform: scale(1.05);
}
```

**Selected state:**

```css
.swatch.selected {
  transform: scale(1.1);
  box-shadow: 0 0 0 3px #ffffff, 0 0 0 6px var(--color-accent);
  transition: transform 200ms var(--ease-spring), box-shadow 200ms var(--ease-spring);
}
```

Note: `box-shadow` uses the current swatch colour for the outer ring. Update this dynamically when selection changes.

### 8.4 Swatch colour data

| Label | Hex |
|---|---|
| Green | `#78c47b` |
| Blue | `#5b8ef0` |
| Amber | `#d4874a` |
| Sand | `#c8a96e` |
| Coral | `#e05242` |
| Purple | `#8b63c8` |
| Bone | `#d4cfc8` |
| Teal | `#1a9e6e` |

**Default pre-selection.** Pre-select the swatch matching the vibe-to-accent mapping from §7.6. If vibe is `own-thing`, no swatch is pre-selected by default.

### 8.5 Preview update timing

On every swatch click, immediately (0ms debounce) call:

```js
document.documentElement.style.setProperty('--color-accent', selectedHex);
wizardState.accent = selectedHex;
// Also update accent-rgb for rgba() use:
const [r, g, b] = hexToRgb(selectedHex);
document.documentElement.style.setProperty('--color-accent-rgb', `${r}, ${g}, ${b}`);
```

The preview panel updates instantaneously with the new accent colour.

**Transient colour caption.** After each swatch selection, show a one-line caption below the swatch grid:

```
Text:     "Looking good in [colour name]."
Font:     DM Sans, 12px, weight 400, var(--color-muted)
Position: below swatch grid, above continue button
Entrance: opacity 0 → 1, 150ms ease-out
Exit:     opacity 1 → 0, 300ms ease-in, after 1800ms
```

Colour names by hex: Ember `#e05242` → "ember", Amber `#f4b942` → "amber", Rose `#e06b7a` → "rose", Sage `#7ec88a` → "sage", Indigo `#9b7cf4` → "indigo", Sky `#06b6d4` → "sky". Custom hex: "that colour". Full line: "Looking good in amber." — full stop.

Implementation: set a `setTimeout(hideCaption, 1800)`. Cancel and restart on each new swatch click.

### 8.6 Custom hex input

```
Trigger:      text link "Use my own colour →" below swatch grid
Font:         DM Sans, 13px, weight 400
Colour:       var(--color-muted)
Hover:        var(--color-text), 200ms linear
Margin-top:   4px
```

On click, the text link is replaced by an inline hex input:

```
Element:      <input type="text" id="input-hex" maxlength="7" placeholder="#e05242">
Width:        140px
Height:       44px
Background:   var(--color-card)
Border:       1.5px solid var(--color-border)
Border-radius: 10px
Padding:      0 12px
Font:         DM Sans, 14px, weight 400, monospace
Colour:       var(--color-text)
```

**Validation on blur.** On `blur` event:
- If value matches `/^#[0-9a-fA-F]{6}$/` → apply as accent, add a ninth swatch at the end of the grid showing this colour in selected state.
- If invalid → border turns `var(--color-error)`, show error message below input:

```
Text:     "Use a hex code like #e05242"
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-error)
Role:     alert
```

### 8.7 Continue

Enabled as soon as any swatch is selected or a valid custom hex is entered.

---

## 9. Screen 4 — Theme

**ID:** `screen-theme`
**Step:** 4 of 7
**Progress bar width:** `calc(4/7 * 100%)` = 57.14%

### 9.1 Headline

```
Text:        "How should your page feel?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 9.2 Theme card grid

```css
#theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
```

Always 2 columns — on both mobile and desktop.

### 9.3 Theme card spec

**Element:** `<button role="radio" aria-checked="false" class="theme-card" data-theme="[slug]">`

| Property | Value |
|---|---|
| Height | `160px` |
| Border-radius | `16px` |
| Overflow | `hidden` |
| Position | `relative` |
| Border | `1.5px solid var(--color-border)` |
| Cursor | `pointer` |
| Transition | `border 150ms, transform 200ms` |

**Selected state:**

```css
.theme-card[aria-checked="true"] {
  border: 2px solid var(--color-accent);
  transform: scale(1.02);
  transition: transform 200ms var(--ease-spring);
}
```

**Name overlay.** Positioned at bottom of card:

```css
.theme-card__name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 14px;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%);
  font: 600 14px/1.2 var(--font-body);
}
```

**Text colour per theme:**
- Dark, Glass, Contrast: `#ffffff`
- Light: `#1a1a2e` (dark text on light background)

### 9.4 Theme card backgrounds

| Slug | Display name | Background |
|---|---|---|
| `dark` | Dark | `linear-gradient(135deg, #0d0e1a 0%, #1a1d35 100%)` |
| `light` | Light | `linear-gradient(135deg, #f0ede8 0%, #e5e0d8 100%)` |
| `glass` | Glass | See below |
| `contrast` | Contrast | `#000000` |

**Glass card background:** The glass card uses a gradient that hints at frosted glass. It cannot actually be `backdrop-filter` inside a card, so simulate it:

```css
[data-theme="glass"] {
  background:
    linear-gradient(135deg,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.04) 100%);
  border: 1px solid rgba(255,255,255,0.18);
}
```

Add a small frosted glass indicator label inside the card:

```
Text:     "Backdrop blur"
Font:     DM Sans, 10px, weight 400
Colour:   rgba(255,255,255,0.5)
Position: top-right, padding 8px
```

This communicates the effect visually in lieu of a live backdrop filter demonstration.

### 9.5 Default selection

`dark` is pre-selected when the screen is first shown.

### 9.6 Preview update

On each theme card selection, apply the corresponding class to the preview panel:

```js
previewRoot.dataset.theme = selectedTheme;
// The preview uses the same CSS as able-v7.html
// which applies theme rules based on data-theme attribute
```

### 9.7 Continue

Enabled immediately (a theme is always pre-selected).

---

## 10. Screen 5 — Links

**ID:** `screen-links`
**Step:** 5 of 7
**Progress bar width:** `calc(5/7 * 100%)` = 71.43%

### 10.1 Headline

```
Text:        "Where can people find your music?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 8px
```

### 10.2 Sub-headline

Shown conditionally:

```
If links were imported:
  Text:   "We brought your links across."

If no import:
  Text:   "Paste any links — we'll recognise the platform."

Font:     DM Sans, 16px, weight 400
Colour:   var(--color-muted)
Margin-bottom: 24px
```

### 10.3 Imported links list

Only shown when `wizardState.importedLinks.length > 0`.

**Container:**

```css
#imported-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
```

**Each link row** (`<label>` wrapping a checkbox + content):

```css
.link-row {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 16px;
  background: var(--color-card);
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
}
```

**Row content (left to right):**

1. Checkbox `<input type="checkbox" checked>`:
   - 20×20px, border-radius 6px, accent-coloured when checked
   - Checked by default (all imported links included)

2. Platform icon: 20×20px SVG or image. Source: inline SVGs per platform stored in a `PLATFORM_ICONS` object in JS.

3. Platform name: DM Sans, 14px, weight 600, `var(--color-text)`

4. URL (truncated): DM Sans, 12px, weight 400, `var(--color-muted)`, `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`, max-width `160px`

5. Check badge: "✓" character, 14px, `var(--color-success)`, `margin-left: auto`

**Unchecked state:** Row opacity drops to `0.5`. Badge hidden.

**Staggered entrance animation (Linktree import).** When links come from a Linktree import, do not render all rows simultaneously. Reveal them one at a time with an 80ms stagger to create the perception of careful, individual handling:

```css
.link-row { opacity: 0; transform: translateY(4px); }
.link-row.visible { opacity: 1; transform: translateY(0); transition: opacity 160ms ease-out, transform 160ms ease-out; }
```

```js
// On Screen 5 enter, after import:
links.forEach((link, i) => {
  setTimeout(() => row.classList.add('visible'), i * 80);
});
```

This creates the feeling that the system is carefully placing each link — not bulk-dumping them.

**Post-import autonomy line.** Below the links list (Linktree import only):
```
Text:     "Add, remove, or reorder them any time."
Font:     DM Sans, 12px, weight 400, var(--color-muted)
Margin-top: 8px
```

### 10.4 "Add another link" input

**Element:** `<input type="url" id="input-add-link">`

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `48px` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `12px` |
| Padding | `0 44px 0 16px` |
| Font | DM Sans, 14px, weight 400 |
| Placeholder | "Paste a link..." |
| Focus border | `var(--color-accent)`, 200ms |

**Platform detection on paste.** On the `paste` or `input` event, check the URL against known platform domains. If matched:
- Show platform icon (20px) in right side of input, fading in over 200ms
- After 500ms, add the link to the list above and clear the input

**No links fallback link:**

```
Text:     "No links yet — that's fine."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin-top: 12px
Display:  block, text-align: centre
```

Clicking this advances to Screen 6 without requiring any link. It is a `<button>` styled as a text link, not a `<a>`.

### 10.5 Platform detection domains

| Platform | Matched domains |
|---|---|
| Spotify | `open.spotify.com`, `spotify.com` |
| Apple Music | `music.apple.com`, `itunes.apple.com` |
| SoundCloud | `soundcloud.com` |
| Bandcamp | `bandcamp.com` |
| YouTube | `youtube.com`, `youtu.be` |
| Instagram | `instagram.com` |
| TikTok | `tiktok.com` |
| Linktree | `linktr.ee`, `linktree.com` |
| Songkick | `songkick.com` |
| Dice | `dice.fm` |
| Generic | (fallback for unrecognised URLs) |

### 10.6 Continue

Enabled immediately. Links are optional.

---

## 11. Screen 6 — Fan Capture CTA

**ID:** `screen-fan-cta`
**Step:** 6 of 7
**Progress bar width:** `calc(6/7 * 100%)` = 85.71%

### 11.1 Headline

```
Text:        "What do you want fans to do?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 11.2 Choice cards

4 cards stacked vertically, full-width, not a grid.

**Container:**

```css
#fan-cta-choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  role: "radiogroup";
}
```

**Each card:** `<button role="radio" aria-checked="false" class="choice-card" data-cta="[slug]">`

| Property | Value |
|---|---|
| Height | `64px` |
| Width | `100%` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `12px` |
| Padding | `0 20px` |
| Display | `flex` |
| Align-items | `center` |
| Gap | `12px` |
| Cursor | `pointer` |
| Text-align | `left` |

**Card content:**

```
Icon:          24px, colour var(--color-muted), flex-shrink: 0
CTA copy:      DM Sans, 16px, weight 500, var(--color-text), flex: 1
Description:   DM Sans, 13px, weight 400, var(--color-muted)
               Mobile: below CTA copy (column layout at <480px)
               Desktop: right side (margin-left: auto)
```

**Selected state:**

```css
.choice-card[aria-checked="true"] {
  border: 2px solid var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.08);
}
.choice-card[aria-checked="true"] .card-icon {
  color: var(--color-accent);
}
```

**Hover (non-selected):**

```css
.choice-card:hover {
  border-color: rgba(255,255,255,0.18);
}
```

### 11.3 Choice card data

| Slug | Icon | CTA copy | Description |
|---|---|---|---|
| `stay-close` | heart | "Stay close." | "I'll keep them updated" |
| `hear-first` | bell | "Hear it first." | "My next release, before anyone else" |
| `come-show` | map-pin | "Come to the show." | "Where I'm playing next" |
| `support` | sparkle | "Support me directly." | "Merch, downloads, or a tip" |

**Icons.** Use inline SVG. Icon size `24px × 24px`. SVG `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`.

Icon paths (Heroicons-compatible outline style):
- heart: `M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z`
- bell: `M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0`
- map-pin: `M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z`
- sparkle: `M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z`

### 11.4 Preview update

When a choice card is selected, update the fan CTA button in the preview panel to show the exact copy from the selected card (e.g. "Stay close.", "Hear it first.").

### 11.5 Trust line

```
Text:     "Your fans. Your data. They're yours — we can't contact them."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 16px
```

**North star line (below trust line):**

```
Text:     "Their email is yours. Not Instagram's. Not TikTok's. Not ours."
Font:     DM Sans, 12px, weight 500
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 6px
```

### 11.6 Continue

Enabled as soon as any choice is selected.

---

## 12. Screen 7 — Current Moment

**ID:** `screen-moment`
**Step:** 7 of 7
**Progress bar width:** `calc(7/7 * 100%)` = 100%

**Eyebrow:** "Right now" (not "Step 7 of 7" — matches the copy voice and frames this as a present-moment question, not a form field)

### 12.1 Headline

```
Text:        "What's happening right now?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 12.2 Choice cards

4 cards, same spec as §11.2. Container is `role="radiogroup"`.

### 12.3 Choice card data

| Slug | CTA copy | Description |
|---|---|---|
| `just-dropped` | "Music just dropped." | "It's out now, stream it" |
| `coming-soon` | "Something's coming." | "Pre-release mode, build anticipation" |
| `tonight` | "Playing tonight." | "Gig mode, tickets front" |
| `evergreen` | "Just me, being an artist." | "Evergreen profile, no campaign" |

No icons on this screen's cards. Cards are otherwise identical in structure to §11.2 but with no icon slot.

### 12.4 Conditional inline inputs

When a card is selected, an additional input area slides in below that card. All slide-in animations:

```css
.moment-extra {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 200ms var(--ease-decel),
    opacity 200ms var(--ease-decel),
    margin-top 200ms var(--ease-decel);
}
.moment-extra.visible {
  max-height: 200px;   /* enough for 2 stacked inputs */
  opacity: 1;
  margin-top: 10px;
}
```

Initial reveal also applies `translateY(8px) → translateY(0)` on the inner content:

```css
.moment-extra .inner {
  transform: translateY(8px);
  transition: transform 200ms var(--ease-decel);
}
.moment-extra.visible .inner {
  transform: translateY(0);
}
```

**Input style (shared for all conditional inputs):**

| Property | Value |
|---|---|
| Height | `44px` |
| Width | `100%` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `10px` |
| Padding | `0 12px` |
| Font | DM Sans, 14px, weight 400 |
| Colour | `var(--color-text)` |
| Margin-top | `8px` (between label and input; `12px` between inputs) |

**Label style:**

```
Font:   DM Sans, 12px, weight 400
Colour: var(--color-muted)
```

---

**"Music just dropped" extras:**

```
Label:       "Add a streaming link (optional)"
Input:       placeholder "open.spotify.com/album/..." , type url
```

On paste: detect platform, show badge (same behaviour as §10.4).

---

**"Something's coming" extras:**

```
Label:       "When does it drop?"
Input:       <input type="date">
             Min date: tomorrow (today + 1 day, computed from JS Date)
             Styled to match spec above
```

Styling `<input type="date">`:

```css
input[type="date"] {
  /* Override native appearance */
  -webkit-appearance: none;
  appearance: none;
  color-scheme: dark;
  /* Apply the same look as other inputs */
  height: 44px;
  background: var(--color-card);
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  padding: 0 12px;
  font: 400 14px var(--font-body);
  color: var(--color-text);
  width: 100%;
}
input[type="date"]:focus {
  border-color: var(--color-accent);
  outline: none;
}
```

On date change: immediately update the preview panel's countdown display. The preview must compute the days remaining from the selected date and render it in the profile countdown component.

---

**"Playing tonight" extras:**

Two inputs, stacked, gap `12px`:

```
Input 1: label "Venue name (optional)", placeholder "Fabric, London"
Input 2: label "Ticket link (optional)", placeholder "dice.fm/...", type url
```

---

**"Just me, being an artist." extras:** None. No additional input slides in.

---

### 12.5 None-selected state

When the screen is first shown, no card is selected. All `moment-extra` panels are `max-height: 0, opacity: 0`.

When a different card is selected, any previously open extra panel closes (animation reverses: `max-height → 0, opacity → 0`) before the new panel opens. Run both simultaneously (no sequencing needed for simplicity).

### 12.5b North star reassurance (above submit button)

```
Text:     "Everything on this page is yours. No algorithm decides who sees it."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-bottom: 16px
```

### 12.6 Submit button — "Build my page →"

This replaces the standard Continue button on Screen 7.

| Property | Value |
|---|---|
| Text | "Build my page →" |
| Font | Barlow Condensed, 20px, weight 700 |
| Height | `56px` |
| Width | same as Continue button: full-width mobile, 320px desktop |
| Background | `var(--color-accent)` |
| Colour | `#ffffff` |
| Border-radius | `12px` |
| Margin-top | `32px` |
| Letter-spacing | `-0.2px` |

Hover and disabled states: same as Continue button (§6.4).

**Enabled condition.** Enabled as soon as any moment card is selected. (All inline inputs are optional.)

**Submit action:**

1. Read all `wizardState` values.
2. Generate a slug from the artist name: lowercase, spaces → hyphens, remove non-alphanumeric except hyphens, max 32 chars.
3. Set `wizardState.slug = generatedSlug`.
4. Write `able_v3_profile` to localStorage (see §16.2).
5. Delete `able_wizard_draft` from localStorage.
6. Advance to Screen 8.

---

## 13. Screen 8 — Done

**ID:** `screen-done`
**Step counter:** hidden
**Back button:** hidden
**Progress bar:** `width: 100%`, retained

### 13.1 Background

```css
#screen-done {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse 100% 80% at 50% 20%, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 60%),
    var(--color-bg);
  padding: 64px 24px 48px;
  text-align: center;
}
```

Note: on Screen 8 the two-column layout is abandoned. Content is a single centred column. `#right-panel` is hidden (`display: none`) on this screen.

### 13.2 Headline

```
Text:        "Your page is live."
Font:        Barlow Condensed
Weight:      800
Size:        72px (desktop) / 52px (mobile)
Line-height: 0.95
Letter-spacing: -0.5px
Colour:      var(--color-text) — white
Alignment:   centre
```

**Done screen animation sequence (3-beat orchestration — research validated):**

**Beat 1 (0ms) — Labor illusion "building" sequence (3s before Screen 8 appears):**

Before Screen 8 renders, show a full-screen loading state with three micro-steps (Harvard research: 15% higher satisfaction even when result is instant):

```css
#building-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 300;
}

.building-step {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-muted);
  opacity: 0;
  animation: build-step 400ms ease-out forwards;
}
.building-step.done { color: var(--color-success); }

@keyframes build-step {
  from { opacity: 0; translate: 0 6px; }
  to   { opacity: 1; translate: 0 0; }
}
```

JS sequence:
```javascript
// Steps appear at 0ms, 900ms, 1800ms, then overlay fades at 2600ms
const steps = ['Adding your name...', 'Setting your colour...', 'Your page is live.'];
steps.forEach((text, i) => {
  setTimeout(() => showBuildStep(text, i === 2), i * 900);
});
setTimeout(() => {
  buildOverlay.style.transition = 'opacity 400ms ease-out';
  buildOverlay.style.opacity = '0';
  setTimeout(() => {
    buildOverlay.remove();
    showScreen8();
  }, 400);
}, 2600);
```

**Beat 2 (Screen 8 enters — 0ms) — Headline spring entrance:**

```css
#done-headline {
  opacity: 0;
  transform: scale(0.88);
  animation: done-entrance var(--spring-duration) var(--spring-easing) forwards;
}

@keyframes done-entrance {
  to {
    opacity: 1;
    transform: scale(1.0);
  }
}
```

**Beat 3 (280ms delay) — Accent pulse ring radiates from behind headline (one loop only):**

```css
#done-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(var(--color-accent-rgb), 0.6);
  animation: pulse-ring 800ms ease-out 280ms forwards;
  pointer-events: none;
}

@keyframes pulse-ring {
  from {
    transform: scale(0.8);
    opacity: 0.8;
  }
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
```

One loop. Stops. No repeating pulse — that would feel anxious, not celebratory. Tonally correct for ABLE.

**Beat 4 (460ms) — Slug and CTAs stagger in.** The slug appears first, then the CTAs, then the share row. An 800ms gap before the share row creates a breath — the artist reads "Your page is live." and sees their URL, then the sharing options appear. This pause is intentional craft, not delay.

```css
#done-slug      { animation: content-enter 280ms ease-out 460ms both; }
#done-cta-primary   { animation: content-enter 280ms ease-out 540ms both; }
#done-cta-secondary { animation: content-enter 280ms ease-out 600ms both; }
#done-share-row     { animation: content-enter 280ms ease-out 860ms both; }  /* 860ms: 200ms after slug — deliberate breath */
```

No confetti. The accent ring, the spring scale, the staggered arrival of each element — this is the celebration. ABLE's tone does not permit generic confetti.

```css
@media (prefers-reduced-motion: reduce) {
  #done-headline, #done-slug, #done-cta-primary,
  #done-cta-secondary, #done-share-row, #done-pulse-ring {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  #building-overlay { display: none !important; }
}
```

### 13.3 Slug display

```
Container:  margin-top: 24px, display: inline-flex, align-items: centre, gap: 8px
Text:       "ablemusic.co/[slug]"
Font:       DM Sans, 18px, weight 500
Colour:     var(--color-text)
```

**Pencil icon.** 16px SVG inline, `var(--color-muted)`, `cursor: pointer`. On hover: `var(--color-text)`, 150ms.

**Inline edit.** On pencil icon click (or click on the slug text itself):
- Replace the `<span>` containing the slug text with `<input type="text">` having the same font/size/colour.
- Input gains focus automatically.
- On blur or Enter: validate (alphanumeric + hyphens only, 3–32 chars). If valid: update `wizardState.slug` and revert to text display. If invalid: show error below in `var(--color-error)`, 12px: "Slugs can only contain letters, numbers, and hyphens."
- Input style: background transparent, border-bottom `1.5px solid var(--color-accent)`, no other border.

**Slug note:**

```
Text:     "Slugs are first-come, first-served."
Font:     DM Sans, 11px, weight 400
Colour:   var(--color-muted)
Margin-top: 6px
```

### 13.3b North star line (below URL slug)

```
Text:     "No algorithm between you and your fans."
Font:     DM Sans, 13px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 6px
```

### 13.4 Linktree notice (conditional)

Only shown when `wizardState.importedLinks` came from a Linktree URL and at least 1 link was imported.

```
Text:     "Your Linktree can stay up or come down — that's your call."
Font:     DM Sans, 13px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 8px
```

### 13.5 Primary CTA — "See your live page"

| Property | Value |
|---|---|
| Text | "See your live page" |
| Font | Barlow Condensed, 18px, weight 700 |
| Height | `52px` |
| Width | `100%` on mobile; `280px` on desktop |
| Background | `var(--color-accent)` |
| Colour | `#ffffff` |
| Border-radius | `12px` |
| Margin-top | `32px` |

On click: open `able-v7.html` in the same tab. The profile renders from `localStorage.able_v3_profile`.

### 13.6 Secondary CTA — "Open my dashboard →"

| Property | Value |
|---|---|
| Text | "Open my dashboard →" |
| Font | DM Sans, 16px, weight 500 |
| Height | `48px` |
| Width | `100%` on mobile; `280px` on desktop |
| Background | transparent |
| Border | `1.5px solid var(--color-accent)` |
| Colour | `var(--color-accent)` |
| Border-radius | `12px` |
| Margin-top | `12px` |

Hover: `background: rgba(var(--color-accent-rgb), 0.08)`, 200ms.

On click: open `admin.html` in the same tab.

### 13.7 Dashboard context line

```
Text:     "From there, you can see who signs up, switch campaign modes,
           and update anything on your page."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Max-width: 320px
Margin:   8px auto 0 auto
```

### 13.8 Share row

**Label:**

```
Text:     "Share your page"
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin:   32px 0 12px 0
```

**Icon buttons container:**

```css
#share-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
```

**Instagram Story button** `<button id="btn-share-instagram">`:

```
Width:  40px
Height: 40px
Border-radius: 50%
Background: var(--color-card)
Border: 1.5px solid var(--color-border)
Cursor: pointer
```

Contains Instagram logo SVG (20px, `var(--color-muted)`). Hover: border `var(--color-accent)`, icon `var(--color-accent)`, 150ms.

On click: open Instagram Stories share sheet with the page URL pre-loaded (use `navigator.share` API if available; fallback: copy URL and show toast "Link copied — paste it into your Instagram Story").

**Copy Link button** `<button id="btn-copy-link">`:

Same dimensions as Instagram button. Contains copy/link SVG icon (20px).

On click:
- Copy `https://ablemusic.co/[slug]` to clipboard using `navigator.clipboard.writeText()`
- Button shows "Copied ✓" text (replacing icon) for 2000ms, then resets.
- Text: DM Sans, 10px, weight 500, `var(--color-success)`

### 13.9 Free tier line

```
Text:     "Your first 100 fan sign-ups are free. After that, £9/month removes the cap."
Font:     DM Sans, 12px, weight 400
Colour:   rgba(240, 240, 245, 0.3)
Alignment: centre
Position: bottom of screen, margin-top: 40px
```

No confetti. No fireworks. No celebration animation beyond the headline entrance. The confidence of the design is the celebration.

---

## 14. Live Preview Panel

### 14.1 Overview

The preview panel renders a scaled-down version of the artist's `able-v7.html` profile inside a phone frame SVG. It updates in real-time as the wizard state changes.

**Implementation approach.** The preview is NOT an `<iframe>`. It is a fully inlined mini-render of the profile using the same CSS custom properties. The preview HTML structure is a subset of `able-v7.html`'s top section — enough to show the artist name, accent colour, theme, and fan CTA. Full scroll is not required in the preview.

This avoids cross-origin issues and allows instant CSS variable propagation.

### 14.2 Phone frame

Use an SVG shell overlaid on top of the preview content:

```
Frame dimensions:  390px wide × 844px tall (intrinsic)
Border-radius:     44px
Frame colour:      rgba(255,255,255,0.08) stroke, 2px
Status bar:        simple SVG notch at top (12px height, centered)
Home indicator:    5px rounded bar at bottom (120px wide, rgba(255,255,255,0.3))
```

**SVG frame structure:**

```html
<div id="preview-wrapper">
  <svg id="phone-frame" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg"
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2;">
    <rect x="1" y="1" width="388" height="842" rx="43" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    <!-- notch -->
    <rect x="155" y="12" width="80" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
    <!-- home indicator -->
    <rect x="135" y="820" width="120" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
  </svg>
  <div id="preview-content">
    <!-- Profile mini-render -->
  </div>
</div>
```

The `#preview-content` div sits behind the SVG frame (`z-index: 1`), clipped to the phone shape:

```css
#preview-content {
  position: absolute;
  top: 0; left: 0;
  width: 390px; height: 844px;
  border-radius: 44px;
  overflow: hidden;
  z-index: 1;
  background: var(--color-bg);
}
```

### 14.3 Preview content structure

The preview renders a simplified version of the profile top card. Minimum required elements:

```html
<div id="preview-content" data-theme="dark">

  <!-- Hero background — uses artist accent as gradient -->
  <div class="preview-hero-bg"></div>

  <!-- Avatar placeholder -->
  <div class="preview-avatar"></div>

  <!-- Artist name -->
  <div class="preview-artist-name">[Artist name or "Your name"]</div>

  <!-- Genre tag -->
  <div class="preview-genre">[Selected vibe display name]</div>

  <!-- Primary CTA button — mirrors fan CTA choice -->
  <button class="preview-cta">[Fan CTA copy]</button>

  <!-- Page state badge — mirrors current moment -->
  <div class="preview-state-badge">[State copy]</div>

</div>
```

**Empty state (before name is entered):**

The preview-artist-name shows:

```
Text:     "Your page is taking shape."
Font:     DM Sans, 16px, weight 400
Colour:   var(--color-muted)
Alignment: centre
```

**After name is entered:** Artist name is shown in `--font-display`, Barlow Condensed, weight 700, `var(--color-text)`.

### 14.4 Preview CSS (mini-render)

The `#preview-content` element uses the same CSS variables as the main page. All that changes per wizard selection is CSS custom properties and `data-theme` attribute.

```css
/* Hero background */
.preview-hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 340px;
  background: radial-gradient(ellipse at 50% 0%, rgba(var(--color-accent-rgb), 0.3) 0%, transparent 70%),
              var(--color-card);
}

/* Avatar circle */
.preview-avatar {
  position: relative;
  width: 88px; height: 88px;
  border-radius: 50%;
  background: rgba(var(--color-accent-rgb), 0.2);
  border: 2px solid rgba(var(--color-accent-rgb), 0.4);
  margin: 60px auto 16px;
}

/* Artist name */
.preview-artist-name {
  font: 700 32px/1.0 var(--font-display);
  color: var(--color-text);
  text-align: centre;
  letter-spacing: -0.5px;
  padding: 0 24px;
}

/* Genre */
.preview-genre {
  font: 400 14px/1.4 var(--font-body);
  color: var(--color-muted);
  text-align: centre;
  margin-top: 4px;
}

/* Primary CTA */
.preview-cta {
  display: block;
  margin: 24px auto 0;
  height: 52px;
  padding: 0 28px;
  background: var(--color-accent);
  color: #fff;
  font: 600 16px/1 var(--font-body);
  border: none;
  border-radius: 12px;
  pointer-events: none;   /* preview is non-interactive */
}

/* State badge */
.preview-state-badge {
  display: inline-flex;
  align-items: center;
  margin: 16px auto 0;
  padding: 5px 12px;
  background: rgba(var(--color-accent-rgb), 0.15);
  border: 1px solid rgba(var(--color-accent-rgb), 0.3);
  border-radius: 20px;
  font: 500 12px/1 var(--font-body);
  color: var(--color-accent);
}
```

**Theme variants on preview-content:**

```css
#preview-content[data-theme="light"] {
  background: #f0ede8;
  --color-text: #1a1a2e;
  --color-muted: rgba(26, 26, 46, 0.5);
  --color-card: rgba(255,255,255,0.8);
}
#preview-content[data-theme="contrast"] {
  background: #000000;
}
#preview-content[data-theme="glass"] {
  background: linear-gradient(135deg, rgba(20,22,40,0.9), rgba(13,14,26,0.95));
}
```

### 14.5 Preview update triggers

| Trigger | What updates |
|---|---|
| Name input keystroke | `preview-artist-name` text content |
| Vibe card selected | `preview-genre` text content + accent pre-selection |
| Accent swatch clicked | `--color-accent` CSS variable on `:root` |
| Custom hex valid | `--color-accent` CSS variable on `:root` |
| Theme card selected | `data-theme` attribute on `#preview-content` |
| Fan CTA card selected | `preview-cta` text content |
| Moment card selected | `preview-state-badge` text content |
| Release date changed | Countdown number in `preview-state-badge` |

**Debounce policy:** All updates are immediate (0ms debounce). CSS variable changes propagate synchronously in the browser.

### 14.6 Preview pulse animation

On every CSS variable change or content update:

```css
#preview-content {
  transition: transform 150ms var(--ease-decel);
}
```

```js
// Called on every update
function pulsePreview() {
  previewContent.style.transform = 'scale(0.995)';
  requestAnimationFrame(() => {
    previewContent.style.transform = 'scale(1.0)';
  });
}
```

The pulse is subtle (0.5% scale decrease) and resolves within the decel curve over 150ms.

### 14.7 Screen 0 and Screen 8

- Screen 0: `#right-panel` is `display: none`. No preview on the hook screen.
- Screen 8: `#right-panel` is `display: none`. The done screen is single-column.

---

## 15. Step Transitions

### 15.1 Spring easing values (CSS `linear()` — Baseline 2023, no JS needed)

Pre-generated from the physics-accurate spring curve (stiffness: 300, damping: 28):

```css
:root {
  --spring-easing: linear(
    0, 0.012, 0.05 2.6%, 0.198, 0.352 10.5%,
    0.896 21%, 1.031, 1.06 27.4%, 1.065,
    1.054 33.3%, 1 40%, 0.985, 0.984 48.5%,
    0.998 57.8%, 1 70%, 1
  );
  --spring-duration: 560ms;
}
```

Use `var(--spring-easing)` and `var(--spring-duration)` on card selections and done-screen entrances. Use `var(--ease-decel)` for step-to-step slides (fixed duration, no overshoot wanted).

### 15.2 Forward transition — `@starting-style` pattern (Baseline 2024)

Use `@starting-style` + `transition-behavior: allow-discrete` to animate step entry/exit without JavaScript class-toggle hacks. Each step is absolutely positioned within an `overflow: hidden` wrapper:

```css
/* Step wrapper */
#screens-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Each step */
.screen {
  position: absolute;
  inset: 0;
  opacity: 1;
  translate: 0 0;
  transition:
    opacity 220ms ease-in,
    translate 220ms ease-in,
    display 220ms allow-discrete;
}

/* Active step enters — @starting-style triggers on DOM insertion / display:block */
.screen.active {
  display: block;
  opacity: 1;
  translate: 0 0;
  transition:
    opacity 300ms var(--ease-decel),
    translate 300ms var(--ease-decel),
    display 300ms allow-discrete;
}

@starting-style {
  .screen.active {
    opacity: 0;
    translate: 28px 0;   /* enters from right (forward navigation) */
  }
}

/* Inactive step exits */
.screen:not(.active) {
  opacity: 0;
  translate: -28px 0;   /* exits to left */
  pointer-events: none;
}
```

**JS step advance:**
```javascript
function goToStep(n, direction = 'forward') {
  const updateFn = () => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screens[n].classList.add('active');
    // Adjust @starting-style direction via data attribute
    screens[n].dataset.direction = direction;
  };

  if (document.startViewTransition) {
    document.startViewTransition(updateFn);
  } else {
    updateFn();
  }

  // Focus management
  setTimeout(() => {
    const heading = screens[n].querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }
  }, 320);
}
```

**View Transitions API enhancement (Chrome 111+, Safari 18+):** Wrapping the step update in `document.startViewTransition()` automatically crossfades between old and new step content. The artist preview card can persist as a shared element:

```css
#preview-phone {
  view-transition-name: artist-preview;
}
::view-transition-old(artist-preview),
::view-transition-new(artist-preview) {
  animation-duration: 300ms;
  animation-timing-function: var(--ease-decel);
}
```

This means the preview card morphs in-place while step content slides — the preview appears continuous across steps.

### 15.3 Back transition

Reverse direction — swap `28px` and `-28px`:

```css
.screen.active[data-direction="back"] {
  /* active screen enters from left */
}
@starting-style {
  .screen.active[data-direction="back"] {
    translate: -28px 0;
  }
}
.screen:not(.active)[data-direction="back"] {
  translate: 28px 0;  /* exits to right */
}
```

### 15.4 Content stagger within each step

After the step enters, content elements stagger in with 60ms intervals. Apply via CSS `animation-delay`:

```css
.screen.active h1          { animation: content-enter 220ms ease-out both; }
.screen.active .step-sub   { animation: content-enter 220ms ease-out 60ms both; }
.screen.active .step-cards > *:nth-child(1) { animation: content-enter 220ms ease-out 120ms both; }
.screen.active .step-cards > *:nth-child(2) { animation: content-enter 220ms ease-out 160ms both; }
.screen.active .step-cards > *:nth-child(3) { animation: content-enter 220ms ease-out 200ms both; }
/* ...continue +40ms per card... */

@keyframes content-enter {
  from { opacity: 0; translate: 0 6px; }
  to   { opacity: 1; translate: 0 0; }
}
```

Total step entrance (heading → last card): ≤ 400ms.

### 15.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .screen,
  .screen.active,
  .screen:not(.active) {
    transition: opacity 150ms linear !important;
    translate: 0 0 !important;
    animation: none !important;
  }
  .screen.active { opacity: 1; }
  .screen:not(.active) { opacity: 0; }
}
```

Opacity-only crossfade, 150ms, no translation. All stagger animations disabled.

### 15.4 Focus management

After a transition completes, focus must move to the screen's headline:

```js
function advanceToScreen(index) {
  // ... run transition ...
  setTimeout(() => {
    const headline = screens[index].querySelector('h1, h2');
    if (headline) {
      headline.setAttribute('tabindex', '-1');
      headline.focus();
    }
  }, 350); // after full transition duration
}
```

All screen headlines have `tabindex="-1"` applied programmatically (not in HTML).

---

## 16. Storage Behaviour

### 16.1 Draft autosave (`able_wizard_draft`)

**Write trigger:** After every screen advance (not on every keystroke). Save on the `continue` button click, before transition starts.

**Format:**

```js
{
  savedAt: Date.now(),         // unix ms timestamp
  currentScreen: 3,            // screen index user is now going TO
  state: { ...wizardState }    // full wizardState snapshot
}
```

**Write call:**

```js
localStorage.setItem('able_wizard_draft', JSON.stringify(draft));
```

**Resume check (page load):**

1. `const raw = localStorage.getItem('able_wizard_draft')`
2. If null: normal start.
3. Parse JSON. If `Date.now() - savedAt > 86_400_000` (24 hours): treat as stale, show normal start.
4. If fresh: restore `wizardState` from `draft.state`, navigate to `draft.currentScreen`, show resume banner on Screen 0 (or, if navigating directly, show a small toast: "Resuming from where you left off.").

### 16.2 Profile write (`able_v3_profile`)

Written on Screen 7 submit, before navigating to Screen 8.

**Format (maps to `able_v3_profile` key):**

```js
{
  name:          wizardState.name,
  vibe:          wizardState.vibe,
  accent:        wizardState.accent,
  theme:         wizardState.theme,
  links:         wizardState.links,
  fanCta:        wizardState.fanCta,
  stateOverride: mapMomentToState(wizardState.moment),
  releaseDate:   wizardState.releaseDate,    // ISO string or null
  streamLink:    wizardState.streamLink,
  venueName:     wizardState.venueName,
  ticketUrl:     wizardState.ticketUrl,
  slug:          wizardState.slug,
  createdAt:     Date.now(),
}
```

**`mapMomentToState` function:**

```js
function mapMomentToState(moment) {
  const map = {
    'just-dropped': 'live',
    'coming-soon':  'pre-release',
    'tonight':      'gig',
    'evergreen':    'profile',
  };
  return map[moment] || 'profile';
}
```

**Write call:**

```js
localStorage.setItem('able_v3_profile', JSON.stringify(profile));
```

### 16.3 Draft deletion

After writing `able_v3_profile`, immediately:

```js
localStorage.removeItem('able_wizard_draft');
```

### 16.4 Gig mode expiry (conditional)

If `wizardState.moment === 'tonight'`, also write:

```js
localStorage.setItem('able_gig_expires', Date.now() + 86_400_000); // +24h
```

---

## 17. Netlify Import Functions

### 17.1 Function: `spotify-import`

**Endpoint:** `/.netlify/functions/spotify-import`
**Method:** POST
**Timeout:** 8000ms client-side (use `AbortController` with 8s timeout)

**Request body:**

```json
{ "url": "https://open.spotify.com/artist/..." }
```

**Success response (HTTP 200):**

```json
{
  "name": "Phoebe Bridgers",
  "genres": ["indie folk", "chamber pop"],
  "avatarUrl": "https://...",
  "spotifyId": "1234abc"
}
```

**Error response (HTTP 4xx/5xx):**

```json
{ "error": "Could not find artist", "code": "NOT_FOUND" }
```

**Client handling:**

```js
async function runSpotifyImport(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    showImportLoading();
    const res = await fetch('/.netlify/functions/spotify-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const err = await res.json();
      showImportFailure(err.code || 'default');
      return;
    }

    const data = await res.json();
    wizardState.importedName = data.name;
    wizardState.importedGenres = data.genres;
    // Map genres to vibe slug
    wizardState.vibe = detectVibeFromGenres(data.genres);
    showImportSuccess(data.name);
    setTimeout(() => advanceToScreen(1), 800);

  } catch (e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      showImportFailure('TIMEOUT');
    } else {
      showImportFailure('default');
    }
  }
}
```

**`detectVibeFromGenres` mapping:**

```js
function detectVibeFromGenres(genres) {
  const lower = genres.map(g => g.toLowerCase());
  if (lower.some(g => g.includes('electronic') || g.includes('techno') || g.includes('house') || g.includes('ambient'))) return 'electronic';
  if (lower.some(g => g.includes('hip hop') || g.includes('rap') || g.includes('r&b') || g.includes('soul') && g.includes('urban'))) return 'hiphop-rnb';
  if (lower.some(g => g.includes('folk') || g.includes('acoustic') || g.includes('singer-songwriter'))) return 'folk-acoustic';
  if (lower.some(g => g.includes('pop') && !g.includes('indie'))) return 'pop';
  if (lower.some(g => g.includes('jazz'))) return 'jazz-soul';
  if (lower.some(g => g.includes('metal') || g.includes('punk') || g.includes('hardcore'))) return 'metal-rock';
  if (lower.some(g => g.includes('indie') || g.includes('alternative') || g.includes('art rock'))) return 'indie-alt';
  return null; // no match — user picks manually
}
```

### 17.2 Function: `linktree-import`

**Endpoint:** `/.netlify/functions/linktree-import`
**Method:** POST
**Timeout:** 8000ms (same `AbortController` pattern)

**Request body:**

```json
{ "url": "https://linktr.ee/artistname" }
```

**Success response:**

```json
{
  "links": [
    { "url": "https://open.spotify.com/artist/...", "platform": "spotify", "label": "Spotify" },
    { "url": "https://instagram.com/artistname", "platform": "instagram", "label": "Instagram" }
  ]
}
```

**Error response:**

```json
{ "error": "Could not parse page", "code": "PARSE_ERROR" }
```

**Client handling:** Same pattern as Spotify import. On success, populate `wizardState.importedLinks`. Trigger both imports if URL contains both Linktree and Spotify patterns (run in parallel with `Promise.allSettled`).

**URL detection rules:**
- If URL contains `linktr.ee` or `linktree.com` → trigger `linktree-import`
- If URL contains `open.spotify.com/artist` → trigger `spotify-import`
- If URL contains `soundcloud.com` → trigger `linktree-import` (scrape the SC page for links) — same endpoint handles multiple platforms

---

## 18. Accessibility

### 18.1 Roles and ARIA

| Element | Role / Attribute |
|---|---|
| `#progress-bar` | `role="progressbar"`, `aria-valuenow="[0-7]"`, `aria-valuemin="0"`, `aria-valuemax="7"`, `aria-label="Wizard progress"` |
| Vibe card container | `role="radiogroup"`, `aria-label="Music vibe"` |
| Each vibe card | `role="radio"`, `aria-checked="true/false"`, `aria-label="[Genre name]"` |
| Theme card container | `role="radiogroup"`, `aria-label="Page theme"` |
| Each theme card | `role="radio"`, `aria-checked="true/false"`, `aria-label="[Theme name]"` |
| Fan CTA container | `role="radiogroup"`, `aria-label="Fan call to action"` |
| Each CTA card | `role="radio"`, `aria-checked="true/false"` |
| Moment container | `role="radiogroup"`, `aria-label="Current moment"` |
| Each moment card | `role="radio"`, `aria-checked="true/false"` |
| Error messages | `role="alert"`, `aria-live="assertive"` |
| Import success/failure | `role="status"` for success; `role="alert"` for failure |
| All inputs | `<label>` associated via `for`/`id` pair, or `aria-label` |
| Screen headline (on focus) | `tabindex="-1"` (set programmatically) |

### 18.2 Keyboard navigation

| Key | Behaviour |
|---|---|
| Tab | Standard DOM order. All interactive elements reachable. |
| Enter | On focused Continue/Submit button: trigger action. On focused input with valid value: trigger Continue. |
| Space | On focused `role="radio"` card: select it. |
| Arrow keys (within radiogroup) | Move selection between radio cards. |
| Escape | On preview modal (mobile): close modal. On hex input: discard and close. |

### 18.3 Colour contrast

All body text against backgrounds must meet WCAG AA (4.5:1 for text <18pt, 3:1 for text ≥18pt or bold ≥14pt).

Critical pairs to verify:
- `var(--color-muted)` on `var(--color-bg)` — passes at approximately 3.5:1 for 12px body (flagged: check at all screen sizes)
- `var(--color-text)` on `var(--color-card)` — passes at >7:1
- Button text `#ffffff` on `var(--color-accent)` (#e05242) — passes at >4.5:1 for all accent swatches except bone (#d4cfc8): bone must never be used as a button background — it is a page-accent choice only. If accent is light, button text switches to `#1a1a2e`.

**Auto text colour on CTA button:** If the selected accent is light (luminance > 0.4), set button text to `#1a1a2e` instead of `#ffffff`. Compute luminance in JS on accent change:

```js
function isLightColour(hex) {
  const [r, g, b] = hexToRgb(hex).map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4;
}
```

### 18.4 Focus visibility

All interactive elements must have a visible `:focus-visible` ring:

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

Override this for specific elements that have their own selected state (e.g. radio cards already show a border — do not double up). Use:

```css
.vibe-card:focus-visible,
.choice-card:focus-visible,
.theme-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### 18.5 Reduced motion

All animations must check `prefers-reduced-motion`. The global rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Exceptions where a minimal fade is better than no transition:
- Screen transitions: replace slide+opacity with opacity-only, 200ms (see §15.3)
- Headline entrance (Screen 8): replace scale+opacity with opacity-only, 200ms

---

## 19. Playwright Verification Checklist

Use this checklist to verify the build. Run Playwright tests using the MCP tools. All screenshots must be saved to `screenshots/onboarding/`.

### 19.1 Viewport screenshots

- [ ] Screenshot of Screen 0 at 375px width (iPhone SE)
- [ ] Screenshot of Screen 0 at 390px width (iPhone 14 Pro)
- [ ] Screenshot of Screen 0 at 768px width (iPad)
- [ ] Screenshot of Screen 0 at 1280px width (laptop)
- [ ] Screenshot of Screen 2 (vibe grid) at 375px — verify 2-column grid
- [ ] Screenshot of Screen 2 at 768px — verify 3-column grid
- [ ] Screenshot of Screen 8 at 375px and 1280px

### 19.2 Layout checks

- [ ] No horizontal scroll at 375px on any screen
- [ ] No horizontal scroll at 390px on any screen
- [ ] Right panel is sticky on 1280px — verify by scrolling Screen 5 (links) if it is tall
- [ ] Mobile preview peek is exactly 200px visible below Continue button
- [ ] Tap-to-expand preview modal opens on mobile preview tap
- [ ] Preview modal closes on "✕" tap or Escape key

### 19.3 Progress and navigation

- [ ] Progress bar advances on each Continue: 14.28% → 28.57% → 42.86% → 57.14% → 71.43% → 85.71% → 100%
- [ ] Step counter reads "Step N of 7" correctly on screens 1–7
- [ ] Back button hidden on Screen 0 and Screen 8
- [ ] Step counter hidden on Screen 0 and Screen 8
- [ ] Back navigation restores previous screen with correct values in inputs and selections

### 19.4 Screen 0 — Import

- [ ] Placeholder cycles through all 4 strings with crossfade
- [ ] Paste a valid Spotify URL → loading state visible (dots pulse in input right side)
- [ ] Mock Spotify success response → success state visible, green border, success message, auto-advances after 800ms
- [ ] Mock Spotify failure (TIMEOUT code) → amber border, correct failure copy shown
- [ ] "Start from scratch →" link visible, styled correctly (no button appearance)
- [ ] Clicking "Start from scratch →" advances to Screen 1 with empty name input
- [ ] Resume banner visible when `able_wizard_draft` in localStorage with savedAt < 24h ago
- [ ] Resume banner NOT visible when draft is stale (> 24h)

### 19.5 Screen 1 — Name

- [ ] Input is auto-focused when screen becomes active
- [ ] Continue button disabled when input is empty
- [ ] Continue button enabled when ≥1 character entered
- [ ] Enter key triggers Continue when input is valid
- [ ] Pre-fill micro-copy visible when name came from import
- [ ] Preview panel updates artist name on every keystroke

### 19.6 Screen 2 — Vibe

- [ ] All 8 cards render with correct genre name and artist examples
- [ ] "My own thing." card renders second line in correct smaller style
- [ ] Card selection applies border + scale + accent-tinted bg
- [ ] Pre-selected card (from Spotify genres) shows "matched" tag
- [ ] Selecting vibe updates accent colour in preview immediately
- [ ] Continue disabled until a card is selected

### 19.7 Screen 3 — Accent colour

- [ ] All 8 swatches visible, correct colours
- [ ] Default swatch pre-selected based on vibe choice
- [ ] Selected swatch shows white ring + accent outer ring + scale(1.1)
- [ ] Tapping a swatch immediately updates `--color-accent` on `:root` (0 frames delay)
- [ ] Preview panel reflects new accent colour immediately
- [ ] "Use my own colour →" link visible below swatches
- [ ] Tapping link reveals hex input
- [ ] Valid hex updates accent colour and adds ninth swatch
- [ ] Invalid hex shows error message with role="alert"

### 19.8 Screen 4 — Theme

- [ ] All 4 theme cards visible with correct backgrounds
- [ ] Glass card has frosted-glass appearance hint and "Backdrop blur" label
- [ ] Dark theme pre-selected on first visit
- [ ] Selecting a theme updates `data-theme` on preview content
- [ ] Light theme shows dark text in preview
- [ ] Selected card has accent border + scale

### 19.9 Screen 5 — Links

- [ ] Imported links shown with checkboxes, platform icons, truncated URLs, green badges
- [ ] Unchecking a link sets row opacity to 0.5
- [ ] "Add another link" input present
- [ ] Pasting a Spotify URL into add-link input shows platform badge after detection
- [ ] Link appears in list after paste detection
- [ ] "No links yet — that's fine." link advances screen

### 19.10 Screen 6 — Fan CTA

- [ ] All 4 choice cards render with correct icons, copy, and descriptions
- [ ] Icons are SVG outlines at 24px, muted colour
- [ ] Selecting a card turns icon to accent colour
- [ ] Selecting a card updates preview CTA button text immediately
- [ ] Trust line visible below cards
- [ ] Continue disabled until a card is selected

### 19.11 Screen 7 — Current moment

- [ ] All 4 moment cards render with correct copy and descriptions
- [ ] No card selected on first visit
- [ ] "Something's coming" selection slides in date picker
- [ ] Date picker min-date is tomorrow
- [ ] Changing date updates preview countdown badge
- [ ] "Music just dropped" selection slides in stream link input
- [ ] "Playing tonight" selection slides in venue + ticket inputs
- [ ] "Just me" shows no extra inputs
- [ ] Switching between cards closes previous extra panel and opens new one
- [ ] "Build my page →" button uses Barlow Condensed 20px weight 700
- [ ] "Build my page →" disabled until a card is selected
- [ ] Clicking "Build my page →" writes `able_v3_profile` to localStorage
- [ ] Clicking "Build my page →" deletes `able_wizard_draft` from localStorage
- [ ] `able_gig_expires` written if "Playing tonight" was selected

### 19.12 Screen 8 — Done

- [ ] Single-column layout, right panel hidden
- [ ] Headline animates in (scale 0.9→1.0, opacity 0→1, 400ms spring)
- [ ] Slug displays correctly formatted from artist name
- [ ] Pencil icon visible; clicking enters inline edit mode
- [ ] Valid slug edit accepted; invalid shows error
- [ ] Linktree conditional copy shown only when import was from Linktree
- [ ] "Go to my page →" opens `able-v7.html` in same tab
- [ ] `able-v7.html` renders correctly using the saved profile
- [ ] "Open my dashboard →" opens `admin.html` in same tab
- [ ] Copy Link button copies correct URL and shows "Copied ✓" for 2000ms
- [ ] Free tier line visible at bottom

### 19.13 Tap target sizes

Measure every interactive element using Playwright's `getBoundingClientRect()`. All must be ≥ 44×44px:

- [ ] Back button: ≥ 44×44px (padding compensates)
- [ ] Every vibe card: height ≥ 64px
- [ ] Every colour swatch: 44×44px exactly
- [ ] Every theme card: 160px height (far exceeds minimum)
- [ ] Every choice card (fan CTA, moment): 64px height
- [ ] All Continue / Submit buttons: 56px height
- [ ] "Go to my page →" button: 52px height (acceptable; primary prominence)
- [ ] "Open my dashboard →" button: 48px height
- [ ] Share row icon buttons: 40×40px (borderline — pad to 44×44 tap area with padding)
- [ ] Pencil edit icon: ≥ 44×44px tap area (use padding)

### 19.14 Storage assertions

- [ ] After advancing from Screen 1: `localStorage.getItem('able_wizard_draft')` is not null
- [ ] Stored draft contains `savedAt` within last 60 seconds
- [ ] After Screen 7 submit: `localStorage.getItem('able_v3_profile')` is not null
- [ ] After Screen 7 submit: `localStorage.getItem('able_wizard_draft')` is null
- [ ] `able_v3_profile` contains `name`, `vibe`, `accent`, `theme`, `links`, `fanCta`, `stateOverride`, `slug`

---

*End of specification.*
*A developer reading this document has everything needed to build `start.html` in its entirety.*


---
# FILE: docs/pages/fan/DESIGN-SPEC.md
---

# fan.html — Complete Design Specification
**Last updated: 2026-03-16**
**Stage 6B of the 8-stage strategy process**
**Authority: This file. Supersedes all earlier v6 operational fan specs for visual decisions.**

---

## Design Philosophy for fan.html

fan.html must feel different from both admin.html and able-v7.html.

- **admin.html** is a management tool. It is amber, purposeful, transactional in a good sense — you come here to do things.
- **able-v7.html** is an artist's public profile. It is the artist's world, designed for every fan who lands on it.
- **fan.html** is intimate. It is personal. It is yours.

The design register is: a quiet, well-lit room that belongs to you. Not a stage. Not a dashboard. A room.

Each artist who appears on this page brings their own colour — their own accent — into your space. The page is dark by default (it lives in ABLE's world) but each artist element glows in their own light. The fan's experience of fan.html is, over time, an experience of multiple artists in one personal space — each distinct, none dominant.

---

## How fan.html differs from other ABLE pages

| Quality | able-v7.html (artist profile) | admin.html (artist dashboard) | fan.html (fan dashboard) |
|---|---|---|---|
| Primary feeling | "This is my world — come in" | "I'm in control here" | "I'm close to something real" |
| Palette | Artist-defined accent, deep navy | Amber, near-black | Deep navy, artist accents as guests |
| Typography weight | Display-heavy (Barlow Condensed hero) | Utilitarian (Plus Jakarta Sans) | Quiet (DM Sans, lighter weights) |
| Density | Rich, layered, art-directed | Information-dense, functional | Sparse, deliberate, unhurried |
| Motion | Expressive, spring-feel | Precise, purposeful | Gentle, slow to enter, slow to leave |
| White space | Artwork-driven (hero fills screen) | Tight grid, efficient use of space | Generous — content breathes |

---

## Colour system

### Base palette

```css
--fan-bg:           #0d0e1a    /* Midnight Navy — same as artist profiles */
--fan-card:         #12152a    /* Card surface — same as artist profiles */
--fan-surface-2:    #1a1e35    /* Slightly lighter surface for nested elements */
--fan-border:       rgba(255, 255, 255, 0.06)  /* Subtle borders */
--fan-border-hover: rgba(255, 255, 255, 0.12)  /* Hover borders */
```

### Platform accent (ABLE's own colour — not an artist colour)

```css
--fan-accent:   #8b7cf4    /* Soft indigo — distinct from all artist accent options */
```

This colour is used only for:
- Active tab indicator (bottom tab bar)
- Active filter pill
- Notification pip
- Focus rings
- Close Circle invitation secondary accent

It is never used on artist-specific content. When you see `#8b7cf4`, you are looking at ABLE's UI, not an artist's content.

### Artist accent bleed

Each artist that appears on fan.html brings their own accent colour (`artist.accent` from profile data). This colour is applied as:
- A 3px left border on feed items for that artist
- The background of artist initials (when no artwork is available)
- The left border on pre-release countdown strips
- The left border on the Close Circle invitation card
- The primary CTA colour in the Close Circle "Come closer" button

```javascript
// Applied inline — CSS custom properties via inline style
el.style.setProperty('--this-artist-accent', artist.accent);
```

The fan's experience: over time, each artist is recognisable by their colour before you read their name. Priya knows rose-gold is Maya. Tom knows deep amber is Tendai. The colour bleed makes the dashboard feel like multiple artist-owned spaces rather than a neutral platform feed.

### Text colours (same as able-v7.html for consistency)

```css
--color-text-1: rgba(240, 237, 232, 1.00)    /* Primary — 8.2:1 on #0d0e1a */
--color-text-2: rgba(240, 237, 232, 0.72)    /* Secondary — 5.9:1 on #0d0e1a */
--color-text-3: rgba(240, 237, 232, 0.55)    /* Tertiary — 4.6:1 on #0d0e1a [WCAG AA] */
--color-text-4: rgba(240, 237, 232, 0.35)    /* Decorative only — not used for readable text */
```

**WCAG AA requirement:** All text used for reading must be `color-text-3` or above. `color-text-4` (0.35 opacity) fails WCAG AA — use only for decorative rules, not text.

Previous versions used 0.38 opacity for `color-text-3` which failed WCAG AA (≈ 3.2:1). The correct value is 0.55 (≈ 4.6:1).

---

## Typography

### Font

```css
font-family: 'DM Sans', -apple-system, sans-serif;
```

Same font as able-v7.html artist profiles. This is intentional — fan.html lives in the same typographic world as the artist pages fans came from.

**No Barlow Condensed on fan.html.** That font belongs to artist hero moments. fan.html is not a stage. No display-font hero copy.

### Scale

```css
/* Page elements */
--fs-label:     11px    /* Section labels: TODAY, THIS WEEK */
--fs-meta:      12px    /* Time-ago, type badges, subtle metadata */
--fs-body:      15px    /* Feed item titles, card copy */
--fs-sub:       13px    /* Feed item subtitles, secondary copy */
--fs-title:     17px    /* Section headings, dispatch reader */
--fs-display:   22px    /* Artist name in large cards (Discover) */
```

### Weights

```css
/* Used in fan.html */
--fw-regular:   400    /* Body copy, sub-lines */
--fw-medium:    500    /* Artist names in feed items, key metadata */
--fw-semibold:  600    /* Section labels, active tab labels */
--fw-bold:      700    /* Used sparingly — Tonight badge label */
```

### Letter spacing

```css
/* Section labels (TODAY, THIS WEEK) */
letter-spacing: 0.06em;
text-transform: uppercase;
font-size: var(--fs-label);
font-weight: var(--fw-semibold);
color: var(--color-text-3);
```

---

## Layout

### Mobile shell

```css
/* Shell container */
.fan-shell {
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  min-height: 100dvh;
  background: var(--fan-bg);
  display: flex;
  flex-direction: column;
  position: relative;
}
```

### Header bar (fixed, 56px)

```css
.fan-header {
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--fan-bg);
  /* Subtle backdrop for content scrolling beneath */
  border-bottom: 1px solid var(--fan-border);
}
```

Elements:
- Left: ABLE wordmark (SVG, `height: 20px`)
- Right: notification bell icon + avatar circle (initials or profile image, 32px diameter)

Sub-greeting (conditional — sits below header, not inside it):

```css
.fan-subgreeting {
  padding: 0 20px 12px;
  font-size: var(--fs-sub);
  color: var(--color-text-2);
  font-weight: var(--fw-medium);
  /* Only renders when there is genuine content to show */
  /* Never rendered as empty or placeholder */
}
```

### Content tabs (44px, sticky below header)

```css
.fan-tabs {
  height: 44px;
  display: flex;
  align-items: stretch;
  padding: 0 16px;
  gap: 4px;
  border-bottom: 1px solid var(--fan-border);
  position: sticky;
  top: 56px;
  z-index: 99;
  background: var(--fan-bg);
}

.fan-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fw-medium);
  color: var(--color-text-3);
  border-bottom: 2px solid transparent;
  transition: color 200ms ease, border-color 200ms ease;
  cursor: pointer;
  min-height: 44px;  /* tap target */
}

.fan-tab[aria-selected="true"] {
  color: var(--fan-accent);
  border-bottom-color: var(--fan-accent);
  font-weight: var(--fw-semibold);
}
```

### Scroll area

```css
.fan-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding-bottom: calc(64px + env(safe-area-inset-bottom));
  /* 64px = bottom tab bar, plus safe area */
}
```

### Bottom tab bar (64px + safe area)

```css
.fan-tabbar {
  height: calc(64px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  background: var(--fan-bg);
  border-top: 1px solid var(--fan-border);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  z-index: 100;
}

.fan-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12px;
  gap: 4px;
  min-height: 56px;  /* tap target */
  color: var(--color-text-3);
  font-size: 10px;
  font-weight: var(--fw-medium);
  transition: color 200ms ease;
}

.fan-tabbar-item.active {
  color: var(--fan-accent);
}
```

Tab bar icons: SVG inline (24px), stroke-based. Following: person with radio waves. Artists: music note. Me: person outline.

---

## Feed items (Following view)

```css
.feed-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-left: 3px solid var(--this-artist-accent, var(--fan-accent));
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 0 10px 10px 0;
  background: transparent;
  cursor: pointer;
  transition: background 150ms ease;
  min-height: 56px;
}

.feed-item:active {
  background: rgba(255, 255, 255, 0.04);
  transform: scale(0.99);
}
```

### Feed item internal layout

```
┌─────────────────────────────────────────────────────┐
│ [Artwork 40px]  [Artist name]              [time-ago]│
│                 [Item title — weight 500]  [type badge│
│                 [Item subtitle — dim]               ] │
└─────────────────────────────────────────────────────┘
```

- **Artwork (40×40px):** Square, `border-radius: 8px`. Background: `artist.accent`. Content: artist initials in white 60% opacity. When `artist.artworkUrl` available: `background-image`, cover, no initials.
- **Artist name:** `color-text-2`, `fw-medium`, `fs-sub (13px)`. Above the title. This is the most important piece of information — which artist.
- **Item title:** `color-text-1`, `fw-medium`, `fs-body (15px)`.
- **Item subtitle:** `color-text-3`, `fw-regular`, `fs-meta (12px)`.
- **Time-ago:** `color-text-3`, `fw-regular`, `fs-meta (12px)`. Right-aligned, top row.
- **Type badge:** `color-text-3`, `fw-medium`, `fs-meta (11px)`. Right-aligned, second row.

### Tonight badge (show items within today)

Replaces the standard "Show" type badge when the show is today:

```css
.badge-tonight {
  background: rgba(244, 185, 66, 0.15);  /* amber-tinted background */
  color: #f4b942;                         /* amber */
  font-weight: var(--fw-bold);
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  /* Optional pulse — disabled when prefers-reduced-motion */
  animation: tonight-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .badge-tonight { animation: none; }
}

@keyframes tonight-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## Section labels

```css
.section-label {
  font-size: var(--fs-label);    /* 11px */
  font-weight: var(--fw-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-3);
  padding: 20px 20px 8px;
}
```

---

## Pre-release countdown strip

```css
.prerelease-strip {
  margin: 8px 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--this-artist-accent, var(--fan-accent));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
}
```

Internal layout:
```
┌─────────────────────────────────────────────┐
│ COUNTING DOWN          [N] days / [N] hours  │
│ [Artist] — [Title]            [Pre-save →]   │
└─────────────────────────────────────────────┘
```

---

## Caught-up state

```css
.caught-up {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px 20px;
  color: var(--color-text-3);
  font-size: var(--fs-sub);  /* 13px */
}

.caught-up::before,
.caught-up::after {
  content: '';
  height: 1px;
  flex: 1;
  background: var(--fan-border);
}
```

Copy: `— you're up to date —`

---

## Artist cards (Discover view)

```css
.artist-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--fan-card);
  border: 1px solid var(--fan-border);
  border-left: 3px solid var(--this-artist-accent, var(--fan-accent));
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;
}

.artist-card:active {
  background: rgba(255, 255, 255, 0.06);
  transform: scale(0.99);
}
```

Internal layout:
```
┌─────────────────────────────────────────────────────┐
│ [Avatar 52px]  [Artist name — display size]         │
│                [Genre · City]                       │
│                [Reason string — e.g. "Same sound"]  │
│                                    [Follow button]  │
└─────────────────────────────────────────────────────┘
```

**No follower count.** Location and genre only.

### Follow button on artist cards

```css
.artist-follow-btn {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: var(--fw-semibold);
  border: 1.5px solid var(--fan-accent);
  color: var(--fan-accent);
  background: transparent;
  transition: background 150ms ease, color 150ms ease;
  min-height: 36px;
  min-width: 80px;
}

.artist-follow-btn.following {
  background: rgba(139, 124, 244, 0.15);
  color: var(--fan-accent);
  border-color: transparent;
}
```

---

## Show items (Near me view)

```css
.show-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--fan-border);
  cursor: pointer;
  min-height: 64px;
}

/* Date block */
.show-date-block {
  width: 44px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: var(--fw-semibold);
}

.show-date-block .month {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-3);
}

.show-date-block .day {
  font-size: 22px;
  line-height: 1;
  color: var(--color-text-1);
}

/* Followed artist shows: accent left strip */
.show-item.followed {
  border-left: 3px solid var(--this-artist-accent);
  padding-left: 17px;  /* 20 - 3 */
}
```

Ticket button on show items:
```css
.show-ticket-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: var(--fw-semibold);
  background: var(--this-artist-accent, var(--fan-accent));
  color: #fff;
  white-space: nowrap;
  min-height: 44px;
}
```

---

## Empty states

### Structural design

Empty states use no emoji. No icon. Just text and (when applicable) a CTA.

```css
.empty-state {
  padding: 40px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-state__heading {
  font-size: var(--fs-title);   /* 17px */
  font-weight: var(--fw-medium);
  color: var(--color-text-1);
  line-height: 1.4;
}

.empty-state__body {
  font-size: var(--fs-sub);    /* 13px */
  color: var(--color-text-2);
  line-height: 1.6;
}

.empty-state__cta {
  margin-top: 16px;
  font-size: 14px;
  font-weight: var(--fw-semibold);
  color: var(--fan-accent);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

---

## Close Circle section (Phase 2)

### Dispatch card

```css
.dispatch-card {
  margin: 0 20px 12px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--this-artist-accent);
  cursor: pointer;
}

.dispatch-preview {
  font-size: var(--fs-sub);     /* 13px */
  color: var(--color-text-2);
  line-height: 1.6;
  /* Truncate at 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Dispatch reader (bottom sheet)

```css
/* Inside the bottom sheet */
.dispatch-reader {
  padding: 24px 24px 32px;
}

.dispatch-reader__date {
  font-size: var(--fs-meta);    /* 12px */
  color: var(--color-text-3);
  margin-bottom: 16px;
}

.dispatch-reader__body {
  font-size: 16px;              /* Slightly larger for reading comfort */
  line-height: 1.75;
  color: var(--color-text-1);
  font-weight: var(--fw-regular);
  letter-spacing: -0.01em;
}
```

No like button. No comment section. No share button. No read receipt. This is a letter. It reads like one.

### Close Circle invitation card

```css
.cc-invitation {
  margin: 12px 20px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--this-artist-accent);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cc-invitation__body {
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text-2);
}

.cc-invitation__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
}

.cc-btn-primary {
  padding: 10px 20px;
  border-radius: 22px;
  font-size: 14px;
  font-weight: var(--fw-semibold);
  background: var(--this-artist-accent);
  color: #fff;
  min-height: 44px;
}

.cc-btn-secondary {
  font-size: 13px;
  color: var(--color-text-3);
  padding: 10px 0;
  min-height: 44px;
}
```

---

## Animation

### Entrance animation (feed items, artist cards, show items)

```css
@keyframes bloom-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bloom-in {
  animation: bloom-in 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* Stagger: each item 40ms after previous */
.feed-item:nth-child(1) { animation-delay: 0ms; }
.feed-item:nth-child(2) { animation-delay: 40ms; }
.feed-item:nth-child(3) { animation-delay: 80ms; }
/* ... up to 8 items staggered */
```

- Duration: 320ms (unhurried — this is not a game, items do not pop in)
- Easing: deceleration `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — items arrive and settle
- Properties: `opacity` and `translateY` only — compositor-safe, no layout jank
- Stagger: 40ms per item — gentle cascade, not overwhelming

**No spring bounce on fan.html.** The spring easing (`cubic-bezier(0.34,1.56,0.64,1)`) belongs to the artist profile — it is expressive and energetic. fan.html is quieter. Items arrive; they don't bounce in.

### Tab transitions (view panels)

```css
.fan-view {
  transition: opacity 200ms ease;
}

.fan-view.entering {
  opacity: 0;
}

.fan-view.active {
  opacity: 1;
}
```

200ms crossfade only. No slide. Tab switching is a context change, not a navigation event.

### Touch feedback

```css
.feed-item:active,
.artist-card:active,
.show-item:active {
  transform: scale(0.99);
  transition: transform 80ms ease;
}
```

Scale 0.99 — just perceptible. Not 0.95 (that's too much). Fan.html is not bouncy. It is settled.

### Close Circle invitation reveal

On first show (after 14 days of following, non-supporter):
```css
.cc-invitation {
  animation: bloom-in 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 120ms;  /* Slight delay — arrives after feed items */
}
```

On dismiss:
```css
.cc-invitation.dismissing {
  animation: bloom-out 200ms ease forwards;
}

@keyframes bloom-out {
  to { opacity: 0; height: 0; padding: 0; margin: 0; overflow: hidden; }
}
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .bloom-in,
  .cc-invitation,
  .badge-tonight {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .fan-view {
    transition: none;
  }

  .feed-item:active,
  .artist-card:active {
    transform: none;
  }
}
```

No motion at all under `prefers-reduced-motion: reduce`. All transitions disabled. Content is still readable and usable.

---

## Skeleton loading states

Used when real Supabase data is loading (Phase 2):

```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

.skeleton {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

/* Feed item skeleton */
.skeleton-feed-item {
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.skeleton-artwork {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
}

.skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
}

.skeleton-line.wide { width: 60%; }
.skeleton-line.medium { width: 40%; }
.skeleton-line.narrow { width: 25%; }
```

Skeleton dimensions match real item dimensions precisely — prevents CLS (Cumulative Layout Shift) when real data replaces skeletons.

---

## View Transition (CSS View Transitions API — P2, progressive enhancement)

```css
/* able-v7.html */
.fan-dashboard-link {
  view-transition-name: fan-nav-wordmark;
}

/* fan.html */
.fan-header .wordmark {
  view-transition-name: fan-nav-wordmark;
}
```

The ABLE wordmark slides from the artist profile header into the fan dashboard header. The transition takes approximately 280ms with the system's default transition easing.

**Progressive enhancement:** Chrome 126+ only. Standard navigation as fallback on all other browsers. No polyfill needed — degradation is graceful and invisible.

---

## PWA manifest (P2)

```json
{
  "name": "ABLE",
  "short_name": "ABLE",
  "description": "The artists you follow, in one place.",
  "start_url": "/fan.html",
  "display": "standalone",
  "background_color": "#0d0e1a",
  "theme_color": "#8b7cf4",
  "icons": [
    { "src": "/icons/able-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/able-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

`theme_color: #8b7cf4` applies ABLE's platform accent to the Android status bar when the PWA is running standalone. On iOS: `<meta name="theme-color" content="#8b7cf4">`.

---

## Spacing and layout constants

```css
:root {
  --fan-page-margin:    20px;    /* Horizontal margin for all content */
  --fan-card-radius:    14px;    /* Standard card radius */
  --fan-pill-radius:    20px;    /* Pills and badges */
  --fan-gap-sm:         8px;
  --fan-gap-md:         12px;
  --fan-gap-lg:         20px;
  --fan-gap-section:    28px;    /* Between major sections */
}
```

---

## Component summary

| Component | Where used | Key design decision |
|---|---|---|
| Feed item | Following view | Artist accent left border, artist name as `color-text-2` |
| Section label | Following, Near me | 11px uppercase, 0.06em tracking, `color-text-3` |
| Pre-release strip | Following view (above Today) | Accent left border, Barlow Condensed countdown NOT used |
| Tonight badge | Feed items + Near me | Amber `#f4b942`, subtle pulse |
| Caught-up state | Below feed items | `— you're up to date —` with decorative rules |
| Empty state | All empty contexts | No emoji, honest copy, only CTA when actionable |
| Cold-start row | First visit, Following | "Because you follow [Artist] —" label |
| Artist card | Discover view | Accent left border, no follower count |
| Show item | Near me view | Date block + ticket button, followed = accent left strip |
| CC invitation | Following view (14d+) | Accent left border, "Come closer" / "Keep as is" |
| Dispatch card | Following, Close Circle | 2-line preview, opens to full bottom sheet |
| Dispatch reader | Bottom sheet | 16px / 1.75 line height, no social metadata |
| Notification panel | Bottom sheet (bell tap) | "Updates from your artists," specific per-type copy |
| Me tab settings | Bottom sheet (me tap) | "You" as page title, data ownership statement |
| Skeleton | Loading states | Matches real item dimensions precisely |
| PWA prompt | After 3rd visit, once | "One tap to see what's new from your artists." |

---

## What fan.html must never look like

- **A social media app** — no engagement counts, no like buttons, no share counts
- **A streaming app** — no waveforms, no visualisers, no album art grids for browsing
- **A ticketing app** — tickets are present (Near me) but the page is not organised around them
- **A Patreon page** — no tier comparison, no benefit checklists, no "you're missing out" pressure
- **A generic SaaS dashboard** — no "last 30 days" charts, no "engagement rate" stats, no empty widgets

It is a quiet room where the artists you chose are present. Design for that.


---
# FILE: docs/pages/landing/DESIGN-SPEC.md
---

# Landing Page — Design Spec
**Stage 5 of the ABLE Build Process**
**Created: 2026-03-15 | This document makes every build decision unambiguous.**

> A developer should be able to build the entire page from this document without asking a single question. Every px, every colour, every animation, every state is defined here.

---

## GLOBAL TOKENS

```css
/* Typography */
--font-display: 'Barlow Condensed', sans-serif;   /* headlines */
--font-body:    'DM Sans', sans-serif;             /* everything else */

/* Colours */
--bg-deep:      #09090f;    /* primary background */
--bg-mid:       #0d0f1a;    /* alternate sections */
--bg-footer:    #070709;    /* footer */
--text:         #e8eaf2;    /* primary text */
--text-2:       rgba(232,234,242,0.62);   /* secondary text */
--text-3:       rgba(232,234,242,0.38);   /* muted / trust lines */
--accent:       #e05242;    /* primary accent — CTAs, highlights */
--accent-rgb:   224,82,66;
--border:       rgba(255,255,255,0.08);
--border-mid:   rgba(255,255,255,0.14);

/* Easing */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-decel:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
```

**Font loading (in `<head>`, before any other styles):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
```

---

## HEAD — SEO + META

```html
<title>ABLE — Your artist page, built for real fans</title>
<meta name="description" content="Your page shifts with your moment. Release day, gig night, new drop — ABLE knows. Every fan sign-up goes straight to your list. Free forever.">

<!-- Open Graph -->
<meta property="og:title" content="ABLE — Your artist page, built for real fans">
<meta property="og:description" content="Build your fan list. Own your relationship. Free forever.">
<meta property="og:image" content="https://ablemusic.co/og-image.jpg">
<meta property="og:url" content="https://ablemusic.co">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ABLE — Your artist page, built for real fans">
<meta name="twitter:description" content="Your page shifts with your moment. Free forever.">
<meta name="twitter:image" content="https://ablemusic.co/og-image.jpg">

<!-- Canonical -->
<link rel="canonical" href="https://ablemusic.co">
```

**OG image spec:** 1200×630px. Dark background `#09090f`. ABLE wordmark centred top-third. Demo phone (Profile state, Luna's page) right side. Tagline left: `Your page. Built for real fans.` in Barlow Condensed white. Export as `og-image.jpg`.

---

## SECTION 1 — NAVIGATION

**Height:** 56px
**Position:** `position: fixed; top: 0; left: 0; right: 0; z-index: 100`
**Background (initial):** `transparent`
**Background (on scroll > 40px):** `rgba(9,9,15,0.88)` + `backdrop-filter: blur(16px) saturate(160%)`
**Transition:** `background 300ms var(--ease-decel), backdrop-filter 300ms`
**Border-bottom (on scroll):** `1px solid rgba(255,255,255,0.07)`

**Layout:**
```
padding: 0 40px (desktop) / 0 20px (mobile)
display: flex
align-items: center
justify-content: space-between
```

**Left — wordmark:**
- Text: `ABLE`
- Font: Barlow Condensed 700
- Size: 20px
- Letter-spacing: 0.06em
- Colour: `#e8eaf2`

**Right — desktop:**
- `Sign in` — DM Sans 500, 14px, `var(--text-2)`, no decoration, `padding: 8px 12px`
- `Your page is free →` — accent pill: `background: var(--accent)`, `color: white`, `font-size: 14px`, `font-weight: 600`, `height: 36px`, `padding: 0 16px`, `border-radius: 100px`
- Gap between: 8px

**Right — mobile (≤ 768px):**
- Single button: `Start →`
- Same accent pill style, `height: 36px`, `padding: 0 14px`
- `Sign in` hidden on mobile nav (appears in footer)

**Scroll detection:**
```javascript
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
```

---

## SECTION 2 — HERO

**Background:** `var(--bg-deep)` `#09090f`
**Min-height:** `100vh` desktop, `auto` mobile
**Padding:** `140px 40px 80px` desktop (140px top accounts for fixed nav + breathing room), `100px 20px 60px` mobile

**Layout — desktop:**
```
display: grid
grid-template-columns: 1fr 420px
gap: 64px
align-items: center
max-width: 1200px
margin: 0 auto
```

**Layout — mobile (≤ 768px):**
```
display: flex
flex-direction: column
gap: 48px
```

### Left column — copy

**Eyebrow:**
- Text: `For independent artists`
- Font: DM Sans 700
- Size: 11px
- Letter-spacing: 0.2em
- Text-transform: uppercase
- Colour: `var(--accent)` `#e05242`
- Margin-bottom: 16px

**Headline:**
- Text: `100 real fans beat 10,000 strangers.`
- Font: Barlow Condensed 800
- Size: 64px desktop / 44px mobile
- Line-height: 0.92
- Letter-spacing: -0.01em
- Colour: `var(--text)` `#e8eaf2`
- Margin-bottom: 20px

**Sub-headline:**
- Text: (see COPY.md — full-stop separated sentences)
- Font: DM Sans 400
- Size: 20px desktop / 17px mobile
- Line-height: 1.7
- Colour: `var(--text-2)`
- Margin-bottom: 36px

**Primary CTA:**
- Text: `Your page is free →`
- Background: `var(--accent)` `#e05242`
- Colour: white
- Font: DM Sans 600, 17px
- Height: 52px
- Padding: `0 32px`
- Border-radius: 12px
- Border: none
- Cursor: pointer
- Hover: `filter: brightness(1.08)` + `transform: translate(-1px, -2px)` + `box-shadow: 0 8px 28px rgba(224,82,66,0.38)`
- Hover transition: `all 200ms var(--ease-spring)`
- Active: `transform: translate(0, 0)` + shadow reduces
- Mobile: `width: calc(100% - 0px)` full-width

**Secondary CTA:**
- Text: `Already have a page? Sign in →`
- Font: DM Sans 500, 14px
- Colour: `var(--text-3)`
- Display: block
- Margin-top: 12px
- No underline, hover: `color: var(--text-2)`

**Trust line:**
- Text: `No card required. Free forever.`
- Font: DM Sans 400, 12px
- Colour: `var(--text-3)`
- Display: block
- Margin-top: 10px

**Entrance animation (all hero copy):**
```css
@keyframes heroIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}
.hero-eyebrow  { animation: heroIn 600ms var(--ease-out) 100ms both; }
.hero-headline { animation: heroIn 600ms var(--ease-out) 200ms both; }
.hero-sub      { animation: heroIn 600ms var(--ease-out) 300ms both; }
.hero-cta      { animation: heroIn 600ms var(--ease-out) 400ms both; }
```

### Right column — demo phone

**Phone container:**
```css
.phone-wrap {
  position: relative;
  width: 390px;
  height: 844px;
  transform: scale(0.7);
  transform-origin: top center;
  flex-shrink: 0;
}
```
*(Note: scale(0.7) renders at 273px × 591px visual size)*

**On mobile:** `transform: scale(0.82)`, `transform-origin: top center`, `width: 100%`

**Phone frame:**
- SVG overlay, `position: absolute; inset: 0; z-index: 2; pointer-events: none`
- Subtle drop shadow: `filter: drop-shadow(0 32px 64px rgba(0,0,0,0.6))`
- Corner radius on screen: 44px (matches iPhone 14 Pro)

**Screen area:**
```css
.phone-screen {
  position: absolute;
  inset: 12px;
  border-radius: 44px;
  overflow: hidden;
  background: #000;
  z-index: 1;
}
```

**Entrance animation:**
```css
.phone-wrap {
  animation: phoneIn 700ms var(--ease-spring) 300ms both;
}
@keyframes phoneIn {
  from { opacity: 0; transform: scale(0.7) scale(0.94); }
  to   { opacity: 1; transform: scale(0.7) scale(1); }
}
```

**Hero phone — Profile state content (default):**
- Artist name: Luna Serrano, Barlow Condensed 800, 36px, white
- Accent: `#5bbfcc` (cyan)
- Top 45%: YouTube poster image (not iframe on page load — load poster only)
- Below: `Stay close.` fan sign-up button in cyan
- Platform pills: Spotify, Apple Music, Instagram
- State chip: `● Profile` top-right, 10px, green dot

---

## SECTION 3 — DEMO ("See it shift")

**Background:** `var(--bg-mid)` `#0d0f1a`
**Padding:** `96px 40px` desktop / `64px 20px` mobile
**Max-width:** 1200px, centred

**Section headline:**
- Font: Barlow Condensed 700, 42px desktop / 32px mobile
- Colour: `var(--text)`
- Text-align: centre
- Margin-bottom: 12px

**Section sub:**
- Font: DM Sans 400, 18px desktop / 16px mobile
- Colour: `var(--text-2)`
- Text-align: centre
- Max-width: 560px
- Margin: 0 auto 56px

**Demo phone — same dimensions as hero phone, centred:**
- Width: 390px intrinsic, `transform: scale(0.72)`
- Margin: 0 auto 40px
- ID: `demo-phone` — this is where iframe loading targets

**State buttons row:**
```css
.state-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: nowrap;
  margin-bottom: 48px;
}
/* Mobile */
@media (max-width: 768px) {
  .state-buttons {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    justify-content: flex-start;
    padding: 0 20px 12px;
    gap: 10px;
    -webkit-overflow-scrolling: touch;
  }
}
```

**Each state button:**
```css
.state-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  transition: all 200ms var(--ease-decel);
  scroll-snap-align: start;
  flex-shrink: 0;
}
.state-btn:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--border-mid);
}
.state-btn.active {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.28);
  border-left: 3px solid var(--accent);
}
.state-btn-name {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}
.state-btn-sub {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--text-3);
}
```

**Mobile scroll fade — right edge:**
```css
.state-buttons-wrap::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0; bottom: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, var(--bg-mid));
  pointer-events: none;
}
```

**Interaction prompt (above buttons):**
- Text: `Tap to see how your page changes →`
- Font: DM Sans 400, 11px
- Colour: `var(--text-3)`
- Text-align: centre
- Margin-bottom: 14px

**State transition:**
```javascript
function switchState(state) {
  // Fade out current content
  phoneContent.style.opacity = '0';
  phoneContent.style.transform = 'scale(0.98)';

  setTimeout(() => {
    renderState(state);  // update DOM
    // Fade in
    phoneContent.style.opacity = '1';
    phoneContent.style.transform = 'scale(1)';
  }, 150);
}
phoneContent.style.transition = 'opacity 150ms ease, transform 150ms ease';
```

**Phone content per state:**

*Profile:* Artist Luna, cyan accent, YouTube poster image, `Stay close.` CTA, Spotify/Apple Music/Instagram pills, `● Profile` chip

*Pre-release:* Artwork blurred `brightness(0.3)` with cyan glow, countdown: `3 DAYS 14:22:07` in Barlow Condensed 52px white, `Hear it first →` CTA in purple/indigo, `● Something's coming` chip, purple dot with `box-shadow: 0 0 8px rgba(139,92,246,0.6)`

*Live:* Spotify iframe loads (src set on first activation), `Stream it now →` CTA prominent green, `47 fans signed up` small line below CTA, `● Out now` chip, green dot

*Gig Tonight:* Background warm amber overlay, venue `Moth Club, London` in Barlow Condensed 40px white, `Tonight · Doors 7pm` 18px, `Get tickets →` full-width amber fill CTA, `● Tonight` chip with pulse animation

**Pulse animation (Gig state chip):**
```css
@keyframes chipPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244,185,66,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(244,185,66,0); }
}
.gig-dot { animation: chipPulse 2s ease infinite; }
```

**Countdown timer (Pre-release state):**
```javascript
function updateCountdown() {
  // Demo target: 3 days from now
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const diff = target - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${d} DAYS ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(updateCountdown, 1000);
```

**Quiet line below everything:**
- Text: `Artists don't change their Linktree on release day. ABLE changes for you.`
- Font: DM Sans 400 italic, 18px desktop / 16px mobile
- Colour: `var(--text-2)`
- Text-align: centre
- Max-width: 600px
- Margin: 0 auto

**Iframe lazy loading:**
```javascript
const demoObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    isDemoVisible = true;
    demoObserver.disconnect();
  }
}, { rootMargin: '200px' });
demoObserver.observe(document.getElementById('demo-section'));

// Only create Spotify iframe when Live state first activated AND section is visible
function activateLiveState() {
  if (!spotifyLoaded && isDemoVisible) {
    createSpotifyIframe();
    spotifyLoaded = true;
  }
}
```

---

## SECTION 4 — LINKTREE COMPARISON

**Background:** `var(--bg-deep)` `#09090f`
**Padding:** `96px 40px` desktop / `64px 20px` mobile

**Layout — desktop:**
```
display: grid
grid-template-columns: 1fr 1fr
gap: 80px
align-items: start
max-width: 1100px
margin: 0 auto
```

**Layout — mobile:** single column, stacked

**Left column — copy:**

Headline:
- Font: Barlow Condensed 700, 42px / 32px mobile
- Colour: `var(--text)`
- Margin-bottom: 12px

Sub:
- Font: DM Sans 400, 18px / 16px
- Colour: `var(--text-2)`
- Line-height: 1.6
- Margin-bottom: 40px

**Right column — comparison table:**

```css
.comparison-table {
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.comparison-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255,255,255,0.04);
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
}
.comparison-header span:first-child {
  font-size: 12px; font-weight: 600; color: var(--text-3);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.comparison-header span:last-child {
  font-size: 12px; font-weight: 600; color: var(--accent);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  gap: 16px;
}
.comparison-row:last-child { border-bottom: none; }
.col-linktree {
  font-size: 14px; color: var(--text-3); line-height: 1.5;
}
.col-able {
  font-size: 14px; color: var(--text); line-height: 1.5;
  display: flex; align-items: flex-start; gap: 8px;
}
.col-able::before {
  content: '✓';
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
```

**Below comparison table — CTA block:**

Ghost button:
```css
.switcher-cta {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  border: 1.5px solid rgba(255,255,255,0.25);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  background: transparent;
  transition: all 200ms var(--ease-decel);
  margin-top: 28px;
  width: 100%;
  justify-content: center;
}
.switcher-cta:hover {
  border-color: rgba(255,255,255,0.45);
  background: rgba(255,255,255,0.05);
}
```

Small copy below button:
- Font: DM Sans 400, 13px
- Colour: `var(--text-3)`
- Margin-top: 10px
- Line-height: 1.6

Reassurance line:
- Font: DM Sans 400, 13px
- Colour: `var(--text-3)`
- Margin-top: 8px
- Line-height: 1.6

---

## SECTION 5 — FAN OWNERSHIP

**Background:** `var(--bg-mid)` `#0d0f1a`
**Padding:** `112px 40px` desktop / `80px 20px` mobile

**Layout:** single column, centred
**Max-width:** 680px, `margin: 0 auto`
**Text-align:** centre (desktop), left (mobile ≤ 480px)

**Headline:**
- Font: Barlow Condensed 700, 52px / 38px mobile
- Colour: `var(--text)`
- Margin-bottom: 20px

**Insight line:**
- Font: DM Sans 500, 16px
- Colour: `var(--accent)`
- Margin-bottom: 28px

**Body paragraphs:**
- Font: DM Sans 400, 18px / 16px mobile
- Line-height: 1.8
- Colour: `var(--text-2)`
- Paragraph gap: 20px

**No CTA in this section.**

---

## SECTION 6 — HOW IT WORKS

**Background:** `var(--bg-deep)` `#09090f`
**Padding:** `96px 40px` / `64px 20px` mobile

**Section headline:** centred, Barlow Condensed 700, 42px / 32px

**Steps — desktop layout:**
```
display: grid
grid-template-columns: repeat(3, 1fr)
gap: 48px
max-width: 1000px
margin: 56px auto 48px
```

**Steps — mobile:** single column, gap 40px

**Each step:**

Icon area:
```css
.step-icon {
  width: 48px; height: 48px;
  background: rgba(224,82,66,0.12);
  border: 1px solid rgba(224,82,66,0.25);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
```

Step number (inside icon):
- Font: Barlow Condensed 700, 22px
- Colour: `var(--accent)`

Step headline:
- Font: DM Sans 700, 18px
- Colour: `var(--text)`
- Margin-bottom: 10px

Step body:
- Font: DM Sans 400, 15px
- Line-height: 1.7
- Colour: `var(--text-2)`

**CTA below steps (centred):**
Same primary CTA button style as hero. `margin: 0 auto`. Display: block. Width: fit-content. (Mobile: full-width)

---

## SECTION 7 — PRICING

**Background:** `var(--bg-mid)` `#0d0f1a`
**Padding:** `96px 40px` / `64px 20px` mobile

**Section headline:** centred, Barlow Condensed 700, 42px

**Cards — desktop:**
```
display: grid
grid-template-columns: repeat(4, 1fr)
gap: 16px
max-width: 1100px
margin: 56px auto 0
```

**Cards — tablet (≤ 1024px):** 2×2 grid
**Cards — mobile:** single column

**Each tier card:**
```css
.tier-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tier-card.featured {  /* Free tier */
  border-color: rgba(224,82,66,0.35);
  background: rgba(224,82,66,0.06);
}
```

Card structure (in order):
1. Tier name — DM Sans 700, 13px, letter-spacing 0.1em, uppercase, `var(--text-2)`
2. Price — Barlow Condensed 700, 40px, `var(--text)`, margin-top 8px
3. Per month label — DM Sans 400, 13px, `var(--text-3)`, margin-top 2px
4. Descriptor — DM Sans 400, 14px, `var(--text-2)`, margin-top 12px, padding-bottom 16px, border-bottom `var(--border)`
5. Key line — DM Sans 500, 13px, `var(--accent)`, margin-top 16px
6. Feature list — 3 items, DM Sans 400, 13px, `var(--text-2)`, gap 8px, margin-top 12px
7. CTA button — margin-top auto, padding-top 24px

**Feature list item:**
```css
.feature-item::before {
  content: '—';
  color: var(--text-3);
  margin-right: 8px;
}
```

**CTA buttons per tier:**
- Free: accent fill, `Your page is free →`
- Artist: accent fill, `Start Artist →`
- Pro: accent fill, `Start Pro →`
- Label: ghost/outline, `Talk to us →`

All tier CTAs: 44px height, `border-radius: 8px`, full-width within card

**Upgrade trigger (below Free tier card only):**
```html
<p class="upgrade-hint">When 100 fans sign up, Artist tier removes the cap.</p>
```
DM Sans 400, 12px, `var(--text-3)`, margin-top 8px, text-align centre

---

## SECTION 8 — FAQ

**Background:** `var(--bg-deep)` `#09090f`
**Padding:** `96px 40px` / `64px 20px` mobile

**Section headline:** `Questions.` — Barlow Condensed 700, 42px, left-aligned (not centred — intentional)

**FAQ items:**
```
max-width: 720px
margin: 48px auto 0
display: flex
flex-direction: column
gap: 0
```

**Each FAQ item:**
```css
.faq-item {
  border-bottom: 1px solid var(--border);
  padding: 0;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  user-select: none;
  gap: 16px;
}
.faq-question:hover { color: var(--text); }
.faq-chevron {
  width: 20px; height: 20px;
  flex-shrink: 0;
  transition: transform 250ms var(--ease-decel);
  color: var(--text-3);
}
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-2);
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms var(--ease-decel), padding 300ms var(--ease-decel);
}
.faq-item.open .faq-answer {
  max-height: 300px;
  padding-bottom: 20px;
}
```

**Interaction:** click question → toggle `.open` class. One open at a time.

---

## SECTION 9 — FOOTER

**Background:** `var(--bg-footer)` `#070709`
**Padding:** `64px 40px 40px` / `48px 20px 32px` mobile
**Border-top:** `1px solid var(--border)`

**Layout — desktop:**
```
display: grid
grid-template-columns: 1fr 1fr
gap: 80px
max-width: 1100px
margin: 0 auto
```

**Left column:**
- ABLE wordmark — Barlow Condensed 700, 18px, letter-spacing 0.06em
- `Sign in` link — DM Sans 500, 14px, `var(--text-3)`, margin-top 20px, display block
- `Start free →` link — DM Sans 500, 14px, `var(--accent)`, margin-top 8px, display block

**Right column:**
- `Privacy Policy` — DM Sans 400, 14px, `var(--text-3)`
- `Terms of Service` — DM Sans 400, 14px, `var(--text-3)`
- Fan entry point: `Not an artist?` then `Find artists on ABLE →` — 13px, `var(--text-3)` + link in `var(--text-2)`, margin-top 16px

**Authenticity line (full-width, above bottom bar):**
```css
.auth-line {
  grid-column: 1 / -1;
  font-family: var(--font-body);
  font-size: 13px;
  font-style: italic;
  color: var(--text-3);
  border-top: 1px solid var(--border);
  padding-top: 24px;
  margin-top: 40px;
}
```
Text: `Built by an independent artist who got tired of Linktree not knowing when a release was dropping.`

**Bottom bar:**
```css
.footer-bottom {
  grid-column: 1 / -1;
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--text-3);
  margin-top: 12px;
}
```
Text: `© 2026 ABLE Music Ltd. Built for artists, not algorithms.`

---

## SOCIAL PROOF SECTION — READY TO INSERT

**Position:** Between Section 8 (FAQ) and Section 9 (footer) — add when first real testimonials exist.

**Structure (do not build yet — spec only):**

```html
<section class="social-proof" id="social-proof">
  <!-- Hidden until populated -->
</section>
```

```css
.social-proof {
  background: var(--bg-mid);
  padding: 80px 40px;
  display: none; /* show when quotes exist */
}
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 48px auto 0;
}
.testimonial-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
}
.testimonial-quote {
  font-size: 15px; line-height: 1.7; color: var(--text-2);
  font-style: italic; margin-bottom: 16px;
}
.testimonial-attribution {
  font-size: 13px; font-weight: 600; color: var(--text-3);
}
```

**Populate when you have:** Name, City, one specific quote with a real number (`47 sign-ups in 3 days`). Do not use vague quotes (`"this changed everything"`).

---

## SCROLL ENTRANCE ANIMATIONS

Apply to all major section elements:

```javascript
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
```

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
}
.fade-in.visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .fade-in { opacity: 1; transform: none; transition: none; }
}
```

Apply `.fade-in` to: section headlines, step cards, tier cards, FAQ items, comparison table rows.

---

## PLAYWRIGHT VERIFICATION CHECKLIST

Run after build. All must pass before Stage 6 is complete.

**Screenshots to capture:**
- [ ] 375px (iPhone SE) — full page
- [ ] 390px (iPhone 14 Pro) — full page
- [ ] 768px (tablet)
- [ ] 1280px (laptop)
- [ ] 1440px (wide desktop)

**Checks:**
- [ ] No horizontal scroll at 375px
- [ ] Hero CTA visible above fold at 1280px (no scrolling needed)
- [ ] Demo phone not cropped at any viewport
- [ ] State buttons scroll horizontally at 375px (no wrapping)
- [ ] All tap targets ≥ 48px (measure 4 CTAs + 4 state buttons)
- [ ] Nav background activates on scroll
- [ ] FAQ open/close works
- [ ] Pre-release countdown is ticking (not static)
- [ ] Gig Tonight chip is pulsing
- [ ] Lighthouse mobile score: LCP ≤ 2.5s, Performance ≥ 85

**Anything that fails: fix before shipping.**

