# ABLE — Gemini Step-by-Step Review
**30 prompts. High-level to detail. Paste one at a time.**

---

## HOW TO USE THIS

1. Go to gemini.google.com — use Gemini 1.5 Pro or 2.0 Flash
2. Start a new conversation
3. Paste PROMPT 0 first (the anchor — critical, do not skip)
4. Then paste the ABLE docs section below it in the same message
5. Then work through Prompts 1–30 one at a time
6. Each prompt builds on the last — do them in order

---

## PROMPT 0 — THE ANCHOR (paste this first, with the docs)
```
IMPORTANT: Read everything below carefully before responding to anything.

You are reviewing ABLE (Artist Before Label).

ABLE is a premium mobile-first platform for INDEPENDENT MUSICIANS.
It is NOT a marketplace. It is NOT a resale platform. It is NOT an e-commerce tool.
It is a conversion profile and fan relationship platform for music artists.

The founder is James — a solo developer based in the UK, planning to move to Portugal.
The product is fully documented but not yet deployed.
Stack: pure HTML/CSS/JS, Supabase, Netlify, no build pipeline.

CORE PRODUCT:
- Artist gets a profile page (replaces Linktree / link-in-bio)
- Campaign states: profile / pre-release / live / gig — the page changes with the artist's moment
- Fan capture: fans give their email directly to the artist (not to ABLE, not to Spotify)
- Zero algorithm. Zero discovery feed. The artist and the people who chose to show up.

COMPETITORS: Linktree, LayloFM, ToneDen, Beacons, Spotify for Artists, Bandcamp
NOT competitors: eBay, Vinted, Depop, any resale platform

PRICING: Free / £9/mo Artist / £19/mo Artist Pro / £49/mo Label

Confirm you understand what ABLE is before I continue.
```

## PASTE THIS IMMEDIATELY AFTER PROMPT 0 (the docs)

```
# ABLE — Strategic Review (Short Version)
**Generated: 2026-03-16** | Strategy + scores + competitive — paste into GPT

## PROMPT FOR GPT
```
You are reviewing ABLE (Artist Before Label), a premium platform for independent musicians.
Review the docs below and give me:
1. What is genuinely strong about this product and strategy
2. What gaps or weaknesses you see that the team might be too close to notice
3. What competitors or market threats aren't being taken seriously enough
4. Three things that would make this product 10x better
5. Your honest score: is this ready to launch?
```

---

---
# CLAUDE.md
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
# CONTEXT.md
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
# docs/STATUS.md
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
# docs/FULL-REVIEW-50.md
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
# docs/PREBUILD-SCORE.md
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
# docs/MASTER-SCORECARD.md
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
# docs/process/BUILD-CONFIDENCE.md
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
# docs/systems/competitive/SPEC.md
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
# docs/systems/copy/SPEC.md
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
# docs/systems/launch-sequence/SPEC.md
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
# docs/pages/landing/DESIGN-SPEC.md
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

```

---

## THE 30 PROMPTS — paste one at a time after Gemini confirms it understands ABLE

---

### PROMPT 1 — The one-line test
```
In one sentence, what problem does ABLE solve and for whom? Then tell me if that sentence is strong enough to make an independent artist stop scrolling.
```

---

### PROMPT 2 — The moat
```
ABLE's moat is described as "Every other platform knows what fans listen to. ABLE knows which fans chose to show up."

Is this a real moat or a positioning line? What would it take to make it structurally defensible — not just philosophically distinct? What would Linktree or Spotify have to do to destroy it, and how hard would that be?
```

---

### PROMPT 3 — The campaign state system
```
ABLE has four campaign states: profile / pre-release / live / gig.

The page changes with the artist's moment — a different fan experience depending on where the artist is in their release cycle.

Is this genuinely innovative? Does any other platform do this? Could Linktree ship this in a sprint? Why would or wouldn't they?
```

---

### PROMPT 4 — The competitive landscape
```
ABLE's main competitors are: Linktree, LayloFM, ToneDen, Beacons, Spotify for Artists, Bandcamp.

New intelligence: Beacons now has a 0% take rate on their paid tier. Laylo just added Instagram DM fan capture (140% CTR for Outside Lands). Linktree's shared domain is being spam-flagged by Instagram. Spotify confirmed a £5.99/month superfan tier rolling out.

Given these moves, does ABLE's positioning hold? What needs to change in the pitch? What is the most dangerous competitor right now?
```

---

### PROMPT 5 — The artist profile page
```
The artist profile page (able-v7.html) has:
- A hero section with the artist's artwork/video
- Campaign-state CTAs (pre-save / stream / buy tickets depending on state)
- Fan sign-up with email capture
- Platform links, music embeds, shows, merch, snap cards
- 4 themes: Dark / Light / Glass / Contrast
- 7 genre vibes with different typography and motion
- The artist's accent colour controls the entire page

Score the product design 1–10. What is missing? What is over-engineered? What would make the first artist say "I need this"?
```

---

### PROMPT 6 — The admin dashboard
```
The admin dashboard (admin.html) has:
- Campaign HQ (controls page state)
- Fan list with star, search, export
- Shows management
- Snap cards (mini content cards)
- Analytics (views, clicks, fan sign-ups by source)
- Broadcasts (email to fan list)
- Close Circle (Stripe-connected paid fan tier)
- Connections (artist collaborations)

The most important screen in the product: after a gig, the artist opens their phone and sees who signed up. That moment is the entire pitch.

What does this dashboard need to make that moment land? What kills it?
```

---

### PROMPT 7 — The fan experience
```
A fan visits an artist's ABLE page from a link in their Instagram bio.

The page is in pre-release state — a new album dropping in 6 days. There's a countdown. The CTA is "Pre-save on Spotify."

The fan signs up with their email. They get a confirmation: "You're on Tendai's list."

Score this fan journey 1–10. Where does it drop off? What would make a fan tell a friend?
```

---

### PROMPT 8 — Copy and voice
```
ABLE's copy rules include:
- Never: "Grow your audience", "Monetise your fanbase", "Engage your followers", "Content creator"
- Never: exclamation marks on dashboard copy
- Always: artist's voice, first person on the profile
- "Stay close." not "Subscribe to updates"
- "I'm playing tonight" not "Gig mode activated"
- "Your list. Your relationship." not "Fan CRM dashboard"

Is this copy philosophy strong enough to differentiate ABLE in the market? Is it realistic to maintain across every surface? What would break it?
```

---

### PROMPT 9 — The business model
```
ABLE's tiers:
- Free: basic profile, 1 snap card, 100 fan sign-ups, basic stats
- Artist £9/month: unlimited snap cards, fan email to 2k, campaign modes, connections
- Artist Pro £19/month: full fan CRM, email broadcasts, support packs, advanced analytics
- Label £49/month: 10 artist pages, team access, aggregate analytics, API

Plus: Stripe Connect with 5% on Support Packs and 8% on Close Circle. "We only earn when you earn."

Is this model right? Is £9/month the correct price for what artists get? Where is the upgrade trigger strongest? What is the biggest churn risk?
```

---

### PROMPT 10 — The free tier
```
ABLE's free tier allows 100 fan sign-ups before hitting the cap.

The theory: 100 fans is enough to prove the product works. When the artist hits 80 fans, they see a progress bar. At 95 fans, the copy changes. At 100, the upgrade prompt fires.

Is 100 fans the right cap? Too generous? Too restrictive? Is this upgrade trigger strong enough to convert? What percentage of free artists would realistically upgrade?
```

---

### PROMPT 11 — The growth loop
```
ABLE's growth loop:
1. Artist shares their ABLE page link on Instagram/TikTok
2. Fan visits, signs up, sees "Powered by ABLE" footer (11px, 0.6 opacity)
3. Footer links to ABLE landing page with ?ref=footer tracking
4. Some fans are also artists — they convert via "I make music too →" fork
5. Artist sees "1 artist created a page after visiting yours"

This is the only organic growth mechanism other than outreach. Score it 1–10. Is it strong enough? What would make the viral coefficient higher?
```

---

### PROMPT 12 — The launch strategy
```
ABLE's launch plan:
- Month 1: incorporate, GDPR-compliant, deploy to ablemusic.co
- Soft launch: James's own artist page goes live, sends to 3 artists personally
- First 10 artists: direct DMs to indie musicians in James's network
- Producer seeding: approach 20 producers, each brings 3 artists
- BIMM partnership: 2,000 graduating musicians per year at habit-formation moment
- Press: 3 named journalists (Stuart Dredge/Music Ally, Cherie Hu/Water & Music, Murray Stassen/MBW)

Is this realistic for a solo founder? What is the most likely failure point in the first 60 days? What would you cut?
```

---

### PROMPT 13 — The data architecture
```
ABLE currently stores everything in localStorage. The plan is localStorage → Supabase when the backend lands. Keys map 1:1 to Supabase table rows.

Key data point: ABLE captures which campaign state the artist was in when each fan signed up. A fan who signed up during pre-release vs. live vs. gig mode is a fundamentally different signal.

Is this migration path solid? Is the campaign-state-at-sign-up capture genuinely valuable data that competitors don't have? What are the risks?
```

---

### PROMPT 14 — The P0 issues
```
Before any real user can sign up, ABLE has these confirmed P0 issues:

1. No GDPR consent disclosure on fan sign-up form
2. OG share card image uses data: URI — blank on every social platform
3. No privacy.html or terms.html
4. oEmbed proxy SSRF vulnerability (hostname check uses .test() not new URL())
5. No migration from able_profile → able_v3_profile (key conflict)
6. No sessionId on analytics events
7. Fan cap progress bar not implemented
8. Fan sign-up copy is static across all 4 campaign states
9. No manifest.json or service worker
10. Product not deployed — ablemusic.co not live

Which of these would cause an artist to lose trust in the product the fastest? Which is the true P0?
```

---

### PROMPT 15 — The freelancer model
```
ABLE has a third user type: freelancers (producers, mixers, videographers).

They get a professional profile with credits, rate card, and portfolio. They are discovered via the artists they've worked with — a confirmed credit on an artist's release card becomes a live link.

The acquisition mechanic: producers sign up because being on ABLE gives them a credible professional profile. Each producer brings 3–5 artists. 

Is this a clever growth mechanic or a distraction? Could ABLE launch without the freelancer layer? Would removing it make the product sharper?
```

---

### PROMPT 16 — The investor story
```
ABLE's investor pitch centres on:
"Every other platform knows what fans listen to. ABLE knows which fans chose to show up."

Plus: campaign-state data at fan sign-up — a fan who pre-saved vs. streamed vs. came to a gig is genuinely different intelligence that no other platform captures.

Is this investable at pre-launch? What round size is appropriate? What would an investor need to see before writing a cheque? What would make them say no immediately?
```

---

### PROMPT 17 — The Portugal plan
```
James plans to move to Portugal under the NHR (Non-Habitual Resident) tax regime:
- 10-year flat 20% tax rate on Portuguese-source income
- Foreign income potentially exempt
- Hard deadline: must file within first year of residency

This is not just a lifestyle choice — it's a financial strategy that affects the exit trigger and company structure.

Is this plan sound? What are the risks? Does it change how ABLE should be structured (UK company vs Portuguese company vs both)?
```

---

### PROMPT 18 — The exit trigger
```
James's exit from employment requires 5 conditions simultaneously:
1. MRR ≥ £5,000 for 3 consecutive months
2. Sub-5% monthly churn
3. £18,000 emergency fund
4. Operating buffer in place
5. Tier diversity (not all revenue from one tier)

Plus a health override: C5/C6 disc condition that makes desk work physically unsustainable.

Is this the right gate? Is £5k MRR for 3 months too conservative or about right? What's missing from this checklist?
```

---

### PROMPT 19 — The biggest risk
```
Based on everything you've read about ABLE, what is the single biggest risk that James hasn't written down yet?

Not the documented risks — the undocumented assumption that could kill the product in Year 1. The thing he's too close to see.
```

---

### PROMPT 20 — What artists will actually do
```
Based on your knowledge of how independent artists actually behave (not how they say they'll behave):

- Will they complete the onboarding wizard?
- Will they share their ABLE page link consistently?
- Will they check their admin dashboard after every gig?
- Will they pay £9/month once they hit 100 fans?
- Will they use broadcast emails or ignore them?
- What will they complain about in Month 1?
```

---

### PROMPT 21 — The copy deep dive
```
Read these specific copy strings from ABLE and give me your honest reaction to each:

1. Fan sign-up CTA (pre-release state): "Hear it before it's out"
2. Fan confirmation: "You're on Tendai's list."
3. Post-gig admin greeting: "Last night at The Lexington. 14 fans joined during the show."
4. First fan milestone: "Your first fan. This is how every list starts."
5. 100-fan milestone: "100 people gave you their email. Think about that for a second."
6. Tier gate: "Send a message to the 47 people who asked to hear from you."
7. Gig mode: "I'm playing tonight."
8. Cancellation screen dominant CTA: "Take a month off"

Which land? Which don't? Which would you rewrite?
```

---

### PROMPT 22 — The design system
```
ABLE's design system:
- Midnight Navy #0d0e1a base
- Artist-set accent colour (one CSS variable = full rebrand)
- DM Sans body, Barlow Condensed display
- Spring physics: cubic-bezier(0.34, 1.56, 0.64, 1)
- 7 genre vibes (Bedroom Pop, Drill, Classical, Electronic, Jazz, Singer-Songwriter, Afrobeats)
- 4 themes: Dark / Light / Glass (backdrop-filter blur) / Contrast

Is the accent-colour-as-artist-identity concept strong enough? Are 7 vibes the right number? Will the Glass theme cause performance issues on mid-range Android devices?
```

---

### PROMPT 23 — What's missing
```
Based on everything you've read, name 5 things that are genuinely missing from ABLE's product, strategy, or docs — things that aren't in any file and should be.

Not improvements to existing things. Gaps. Things that would cause a real problem that nobody has written down yet.
```

---

### PROMPT 24 — The landing page
```
ABLE's landing page (landing.html) needs to convert a sceptical independent artist who:
- Is currently using Linktree
- Has 2k Instagram followers
- Releases music every 3–4 months
- Is not making money from music yet
- Is suspicious of "music industry" tools
- Has been burned by platforms before

What does the landing page need to say to this specific person in the first 5 seconds? Does the current spec get there?
```

---

### PROMPT 25 — The solo founder question
```
James is building ABLE alone while employed full-time. He has:
- Claude Code agents running parallel tasks overnight
- A fully documented spec for every system
- A 90-day roadmap with 500 steps
- A Playwright visual verification setup
- No co-founder, no team, no funding

Is this achievable? What breaks first? At what point does he need another human? What is the one hire that changes everything?
```

---

### PROMPT 26 — The BBC Introducing angle
```
New intelligence: BBC Introducing features developing UK independent artists and maintains a public, regularly updated, editorially validated list of artists at exactly the right development stage for ABLE.

This is a free, high-quality outreach list that nobody in ABLE's current docs was using.

How should James use this? What's the outreach approach? What does the DM say? How many artists per week is realistic?
```

---

### PROMPT 27 — The Linktree spam problem
```
Live intelligence: Linktree's shared linktr.ee domain is being flagged as spam by Instagram and other social platforms. Artists report their Stories links being suppressed.

ABLE uses the artist's own subdomain — never flagged.

How urgent is this as a switching trigger? What's the exact message to a Linktree user? Where and how does this get communicated — landing page, DM outreach, press?
```

---

### PROMPT 28 — Score everything
```
Score ABLE across these 12 dimensions, 1–10, with one sentence per score. Do not round up.

1. Product vision clarity
2. Moat strength
3. UX quality (based on specs)
4. Copy and voice
5. Business model
6. Growth strategy
7. Technical architecture
8. Legal compliance readiness
9. Founder execution capability
10. Documentation quality
11. Launch readiness (pre-build)
12. Overall

Then give me the overall verdict in one paragraph.
```

---

### PROMPT 29 — The one thing
```
If you could only tell James one thing — the single most important insight from this entire review — what would it be?

Not a list. One thing. Maximum 3 sentences.
```

---

### PROMPT 30 — The verdict
```
You've reviewed ABLE across 30 dimensions.

Write the verdict James prints and puts on his desk. Maximum 150 words. It must:
- Name what is genuinely excellent
- Name the one thing that could kill it
- Say whether it's ready to build
- End with one sentence that changes what he does tomorrow morning
```

---

*Run these in order. Do not skip. Each prompt builds on the last.*
