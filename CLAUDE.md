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
| `landing.html` | **Marketing landing page** — able.fm homepage | ACTIVE — edit this |
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
Entry: freelancer-start.html (separate onboarding) → freelancer.html (their profile) → admin.html variant
- Profile has: credits (verified via peer confirm), rate card, portfolio (audio/video), availability status, booking CTA
- Notably absent: top card campaign states, gig mode, fan sign-up — different use case entirely
- Discovered via: credits on artist release cards

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

| File | What's in it |
|---|---|
| `CONTEXT.md` | **Read first every session** — fast orientation, tokens, active files, rules |
| `docs/STATUS.md` | **Current build state** — what's built, what's next, known issues |
| `docs/v6/core/V6_BUILD_AUTHORITY.md` | **Primary authority** — all resolved decisions for v6 |
| `docs/v6/00_AUTHORITY_ORDER.md` | Precedence order — read this first |
| `docs/v6/core/VISUAL_SYSTEM.md` | 7 genre vibes, fonts, accent suggestions |
| `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` | Copy register, voice, banned phrases |
| `docs/reference/research/PRODUCT_HIERARCHY_AND_TRUST.md` | Priority order for all features (reference only) |
| `docs/reference/research/PLATFORM_STRATEGY.md` | Tiers, fan journey, superfan system (reference only) |
| `docs/reference/research/DISCOVERY_AND_GROWTH.md` | Directory, leaderboards, organic growth mechanics (reference only) |
| `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md` | Ablers, playlist pushers, rooms, press packs (reference only) |
| `docs/archive/superseded-v5/PRODUCT_SPEC.md` | Legacy v1 spec — vocabulary reference only (archived) |
| `docs/archive/superseded-v5/QA_SMOKE_TESTS.md` | v3-era smoke tests — archived, superseded by v6 (archived) |
