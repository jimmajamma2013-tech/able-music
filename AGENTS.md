# ABLE — Agent Instructions

> For AI agents and subagents working in this codebase. Read CLAUDE.md first for the full project guide.

## Project identity

ABLE (Artist Before Label) is a premium platform for independent musicians. It is not a SaaS tool. It is not a marketing platform. It is a place for artists to be themselves. Every word and pixel reflects that.

## Active files — only touch these

| File | Role |
|---|---|
| `able-v7.html` | Artist public profile — fan-facing |
| `admin.html` | Artist dashboard |
| `start.html` | Onboarding wizard |
| `landing.html` | Marketing landing page |

Never touch `index.html`, `_archive/`, `able-v3.html`, `able-v6.html`.

## Before implementing anything

1. Read `CONTEXT.md` — fast orientation, current state
2. Read `docs/STATUS.md` — what's built, what's next
3. Check `docs/v6/core/V6_BUILD_AUTHORITY.md` — resolved design decisions
4. Check the relevant DESIGN-SPEC in `docs/pages/` for the file you're editing

## Design system — non-negotiable values

### Artist profile (able-v7.html)
- `--color-bg: #0d0e1a` (Midnight Navy)
- `--color-card: #12152a`
- `--color-accent` — artist-set, default `#e05242`
- Body: `DM Sans`
- Display: `Barlow Condensed`
- Spring easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Deceleration: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### Admin dashboard (admin.html)
- `--bg: #09090f`
- `--acc: #f4b942` (Amber)
- Body: `Plus Jakarta Sans`
- Display: `Barlow Condensed`

### Four themes — all must work
- `dark` — `#0d0e1a` base (default)
- `light` — cream `#f0ede8` base, dark text
- `glass` — `backdrop-filter: blur(28px) saturate(180%)`
- `contrast` — pure `#000000` base

After any CSS change, verify all 4 themes.

## CTA architecture

Three zones, strict caps — never regress these:

1. **Hero CTAs** — max 2. Primary = accent fill. Secondary = ghost.
2. **Quick Action pills** — max 4 narrow / 6 wide.
3. **Section Actions** — max 2 per section.

Global dedupe: same URL cannot appear in multiple zones. Hero wins.

## Page state system

Stored in `able_v3_profile.stateOverride`:
- `profile` — default, 14+ days post-release
- `pre-release` — future release date set
- `live` — release date reached (up to 14 days)
- `gig` — manual 24hr toggle, tickets front-and-centre

## Copy rules — read before touching any UI text

Never write:
- "Turn fans into superfans" — say "your most dedicated listeners"
- "Grow your audience" — say "reach people who care"
- "Monetise your fanbase" — say "let people support you directly"
- "Content creator" — say "artist"
- Exclamation marks on dashboard copy
- Generic SaaS micro-copy

Always write:
- Direct, honest, specific
- "Stay close." not "Subscribe to updates"
- "I'm playing tonight" not "Gig mode activated"

## localStorage keys — never rename

`able_v3_profile`, `able_fans`, `able_clicks`, `able_views`, `able_gig_expires`, `able_shows`, `able_dismissed_nudges`, `able_starred_fans`, `able_tier`, `admin_visit_dates`

All map 1:1 to future Supabase tables.

## After every edit

1. JS parse check: `node -e "new Function(src)"` on all `<script>` blocks
2. Verify mobile at 375px — no horizontal scroll, 44px tap targets
3. Check all 4 themes if CSS was changed
4. Commit with conventional commit message

## Tier system (design with this in mind)

| Tier | Price | Key gates |
|---|---|---|
| Free | £0 | Basic profile, 1 snap card, 100 fan sign-ups |
| Artist | £9/mo | Unlimited snap cards, campaign modes, connections |
| Artist Pro | £19/mo | Fan CRM, email broadcasts, advanced analytics |
| Label | £49/mo | 10 artist pages, team access, API |

Gold lock pattern: blurred preview + overlay with specific value proposition. Never just "Upgrade."

## Three user journeys — never conflate

1. **Artist** — start.html → able-v7.html (their live page) → admin.html
2. **Fan** — able-v7.html → future fan.html dashboard
3. **Freelancer** — freelancer-start.html → freelancer.html → shared admin.html (with freelancer layers activated)
