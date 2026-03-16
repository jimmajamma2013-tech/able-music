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
