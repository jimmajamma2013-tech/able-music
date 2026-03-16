# ABLE — Docs File Structure
**Date: 2026-03-16 | Authority: Navigation reference | Version: 2.0**

> This file maps the entire `docs/` directory (347 markdown files). Any agent or developer can orient quickly, read the right files in the right order, and avoid building from superseded or reference-only documents.
>
> **Rule:** `pages/` and `systems/` are primary build authority. `reference/`, `research/`, `superpowers/` are supporting context. `v6/core/` is still valid product truth. `v6/surfaces/` is superseded by `pages/`.

---

## Quick orientation

```
docs/
├── Root-level files          — Strategy, status, orientation, process standards (19 files)
├── apis/                     — External API specs (8 files)
├── pages/                    — Per-page design specs (6 pages × 8–9 files each)
├── systems/                  — Cross-page system specs (47 systems × 3–5 files each)
├── personas/                 — User archetypes (3 files)
├── process/                  — Session workflow, templates (4 files + 2 templates)
├── reference/                — Research only — read for context, not build authority
├── research/                 — Recent research sessions (11 files)
├── superpowers/              — Deep-dive plans and specs from AI superpower sessions
├── archive/                  — Superseded docs (v5 era) — vocabulary reference only
└── v6/                       — V6-era authority docs — core still valid, surfaces superseded
```

---

## Root-Level Files

| File | Purpose | When to read | Authority | Status |
|---|---|---|---|---|
| `CONTEXT.md` | Fast orientation: active files, tokens, rules, authority order | **Every session, first** | Session guide | Active |
| `STATUS.md` | Current build state: what's done, what's next, known issues | **Every session, second** | Session guide | Maintained |
| `FILE-STRUCTURE.md` | This file — complete docs navigation map | When lost or orienting | Navigation reference | Active |
| `INDEX.md` | Alphabetical index of every doc | Finding any file fast | Navigation reference | Active |
| `ABLE_STRATEGY.md` | Product vision, target customer, metrics, North Star | New session or before any feature area | Primary product truth | Complete |
| `V8_BUILD_AUTHORITY.md` | Primary authority for all current V8 build decisions | Before any feature decision | Primary build authority | Complete |
| `VISION_MASTER_SPEC.md` | Long-term product vision, 3-year roadmap | Context for major decisions | Strategic reference | Complete |
| `VOICE-BIBLE.md` | 1-page voice guide: banned phrases, correct register, examples | Before writing any copy | Copy authority | Complete |
| `BUILD-READY-INDEX.md` | Build order, what to read per file, known bugs inventory | Starting a new build | Build navigation | Complete |
| `PRE-BUILD-CHECKLIST.md` | Non-file gates before build starts | Before starting any build session | Process | Complete |
| `COMPONENT-LIBRARY.md` | Reusable UI components with exact HTML/CSS | Building new UI components | Build reference | Complete |
| `DECISION-LOG.md` | All major product decisions with reasoning | Understanding why something was built a certain way | Historical record | Maintained |
| `USER-STORIES.md` | Comprehensive user stories per persona | Designing new features | Product reference | Complete |
| `COMPETITIVE_INTELLIGENCE.md` | Competitor analysis: Linktree, Beacons, Linkin.bio | Competitive positioning | Research reference | Complete |
| `GROWTH_STRATEGY.md` | Acquisition channels, conversion strategy | Marketing/growth decisions | Strategic reference | Complete |
| `EXECUTION_RISK.md` | Known risks, mitigation plans | Assessing new feature risk | Process reference | Complete |
| `MARKET_SIZING.md` | TAM/SAM/SOM analysis | Investor context, prioritisation | Research reference | Complete |
| `MARKET_VALIDATION.md` | Artist research findings, demand signals | Product positioning | Research reference | Complete |
| `LLM_CONTEXT_BUNDLE.md` | Compressed context for LLM cold-starts | Starting a new AI session without history | Session utility | Complete |
| `MASTER-CHECKLIST.md` | Master launch checklist | Pre-launch QA | Process | Complete |

---

## `docs/apis/` — External API Specifications

**Purpose:** Spec for every external API ABLE uses. Build directly from these.
**When to read:** Before building any feature that calls an external API.
**Authority:** Primary build spec for that API's integration.

| File | Service | Status |
|---|---|---|
| `README.md` | API overview and priority order | Active |
| `spotify.md` | Spotify Web API — endpoints, auth, corrected facts (no monthly listeners via API) | Active |
| `stripe.md` | Stripe payments — Connect, webhooks, artist payout flow | Active |
| `resend.md` | Resend email API — fan confirmation, broadcasts | Active |
| `supabase.md` | Supabase database and auth — schema, magic link, RLS | Active |
| `anthropic.md` | Claude API — bio writer, CTA suggestions, caption generator | Active |
| `posthog.md` | PostHog analytics — events, funnels, cohorts | Active |
| `oembed.md` | oEmbed proxy — YouTube, SoundCloud, Bandcamp embed auto-fill | Active |

---

## `docs/pages/` — Per-Page Design Specs

**Purpose:** Complete design and build spec for each HTML file. Build directly from `DESIGN-SPEC.md` (or `SPEC.md` where `DESIGN-SPEC.md` does not yet exist).
**When to read:** Before building or modifying the corresponding page.
**Authority:** Primary build authority for each page (supersedes all `v6/surfaces/` files).

Standard file set per page:

| File | Purpose |
|---|---|
| `DESIGN-SPEC.md` | **Primary build spec** — exact HTML, CSS, JS, copy, all sections (where it exists) |
| `SPEC.md` | Page spec — used as primary if DESIGN-SPEC.md not present |
| `PATH-TO-10.md` | Prioritised improvements to reach 10/10 |
| `COPY.md` | All copy strings for the page |
| `USER-JOURNEYS.md` | User flows specific to this page |
| `20-ANGLE-ANALYSIS.md` | 20-angle quality audit |
| `FINAL-20-ANGLE-REVIEW.md` | First review pass |
| `FINAL-20-ANGLE-REVIEW-2.md` | Second/final review pass (highest authority) |
| `STRATEGY-REVIEW-FINAL.md` | Strategic alignment check |

### Pages Directory

| Directory | HTML File | Build Spec | Score | Status |
|---|---|---|---|---|
| `pages/profile/` | `able-v7.html` | `SPEC.md` (no DESIGN-SPEC.md yet) | 9.7/10 | Building |
| `pages/admin/` | `admin.html` | `DESIGN-SPEC.md` | 9.7/10 | Building |
| `pages/onboarding/` | `start.html` | `DESIGN-SPEC.md` | 9.9/10 | Building |
| `pages/landing/` | `landing.html` | `DESIGN-SPEC.md` | 9.65/10 | Building |
| `pages/fan/` | `fan.html` | `DESIGN-SPEC.md` | 9.24/10 | Building |
| `pages/freelancer/` | `freelancer.html` | `DESIGN-SPEC.md` | Phase 2 | Not started |

> Note: `pages/profile/` does not yet have a `DESIGN-SPEC.md` — CONTEXT.md references it but the file doesn't exist. Use `SPEC.md` for profile until DESIGN-SPEC.md is created.

---

## `docs/systems/` — Cross-Page System Specs

**Purpose:** Spec for systems that span multiple pages (design tokens, motion, copy voice, integrations, etc.).
**When to read:** Before building any feature that affects a cross-page system.
**Authority:** Primary build authority for each system.

Standard file set per system:

| File | Purpose |
|---|---|
| `ANALYSIS.md` | Current state audit — what's built, what's missing, scored |
| `SPEC.md` | Build-ready spec — exact implementation |
| `PATH-TO-10.md` | Prioritised improvements |
| `FINAL-REVIEW.md` | Overall score and key decisions |

Some systems use non-standard names (noted below).

### Root-level cross-page files (directly in `docs/systems/`)

| File | Purpose | Status |
|---|---|---|
| `DESIGN_SYSTEM_SPEC.md` | Design tokens — CSS variables, typography scale, colour system | Complete |
| `DESIGN_SYSTEM_PATH_TO_10.md` | Design system improvements | Complete |
| `MICRO_INTERACTIONS_SPEC.md` | Motion spec — all named micro-interactions (A1–I15+) | Complete |
| `MICRO_INTERACTIONS_PATH_TO_10.md` | Motion improvements | Complete |
| `CROSS_PAGE_JOURNEYS.md` | Cross-page user journey flows (onboarding → profile → admin) | Complete |
| `CROSS_PAGE_PATH_TO_10.md` | Cross-page journey improvements | Complete |

### Systems Subdirectories

| Directory | What it covers | Primary file | Status |
|---|---|---|---|
| `accounting/` | Revenue accounting, artist payouts, platform take | `SPEC.md` | Complete |
| `ai-agents/` | AI agent infrastructure — Telegram, autonomous builds | `AI-AGENTS.md` | Complete |
| `ai-copy/` | AI copy generation — bio writer, CTA suggestions (Claude API) | `SPEC.md` | Complete |
| `ai-workflow/` | AI daily workflow, Telegram bot setup | `AI-WORKFLOW.md` | Complete |
| `analytics/` | Analytics schema, events, PostHog integration | `SPEC.md` | In progress |
| `artist-success/` | Artist success metrics, lifecycle stages | `SPEC.md` | Complete |
| `artist-tools/` | All 13 admin.html tools — audit and path to 10 | `SPEC.md` | Complete |
| `brand-identity/` | Brand tokens, logo rules, visual identity | `SPEC.md` | Complete |
| `coding-strategy/` | Build methodology, quality standards, JS patterns | `SPEC.md` | Complete |
| `competitive/` | Competitive positioning vs Linktree, Beacons, etc. | `SPEC.md` | Complete |
| `copy/` | Copy system — banned phrases, voice rules, all string patterns | `SPEC.md` | Complete |
| `crm/` | Fan CRM architecture — superfan scoring, segmentation | `SPEC.md` | Complete |
| `data-architecture/` | localStorage schema, Supabase table mapping, sync rules | `SPEC.md` | Complete |
| `email/` | Email system — fan confirmation, broadcasts, Resend integration | `SPEC.md` | Complete |
| `error-states/` | Error state patterns across all pages | `SPEC.md` | In progress |
| `explainers/` | Educational copy for confusing features | `SPEC.md` | Complete |
| `founder-roadmap/` | Founder roadmap and personal milestones | `SPEC.md` | Stub (empty) |
| `freelancer-auth/` | Freelancer authentication and credit verification flow | `SPEC.md` | Complete |
| `growth-loop/` | Viral loop, referral mechanics, "Made with ABLE" footer | `SPEC.md` | Complete |
| `growth-strategy/` | Growth channels, acquisition strategy | `SPEC.md` | Stub (empty) |
| `hardware-software/` | Hardware and software setup — dev environment | `SETUP.md` | Complete |
| `instagram-strategy/` | Instagram content strategy and data/leads | `INSTAGRAM-DATA-AND-LEADS.md` | Active |
| `integrations/` | Integration system — Spotify, Ticketmaster, Linktree, oEmbed | `SPEC.md` | Complete |
| `investor-strategy/` | Investor strategy, funding approach | `SPEC.md` | Stub (empty) |
| `killer-features/` | Features that make ABLE genuinely different from competitors | `SPEC.md` | Complete |
| `launch-sequence/` | Launch order, staged rollout plan | `SPEC.md` | Complete |
| `legal-compliance/` | Payment copy §10, nudge rules §9.1, GDPR compliance | `SPEC.md` | Complete |
| `marketing/` | Marketing channels, campaign strategy | `SPEC.md` | Complete |
| `master-review/` | Master review framework | `SPEC.md` | Stub (empty) |
| `monetisation/` | Revenue model, support packs, pricing | `SPEC.md` | Complete |
| `notifications/` | Push/in-app notifications — spec and email templates | `NOTIFICATIONS.md` | Complete |
| `oembed-proxy/` | oEmbed proxy Netlify function spec | `SPEC.md` | Complete |
| `organic-growth/` | Organic growth mechanics, social sharing | `ORGANIC-GROWTH.md` | Complete |
| `partnerships/` | Partnership strategy, platform deals | `PARTNERSHIPS.md` | Complete |
| `platform-admin/` | Platform-level admin — SQL library, V2 admin spec | `SPEC.md` | Complete |
| `pwa/` | PWA / installability spec | `SPEC.md` | In progress |
| `qa-testing/` | QA smoke tests, Playwright test patterns | `SPEC.md` | Complete |
| `reels-feed/` | Reels / video feed feature spec | `SPEC.md` | Complete |
| `seo-og/` | SEO and Open Graph cards spec | `SPEC.md` | Complete |
| `social-media/` | Social media presence plan and account strategy | `SOCIAL-MEDIA-PLAN.md` | Complete |
| `spotify-import/` | Spotify import system (canonical — 10/10) | `SPEC.md` | Complete |
| `team/` | Team operating system — how to hire and work | `TEAM.md` | Complete |
| `think-out-of-the-box/` | Lateral thinking exercises and wild ideas | `SPEC.md` | Stub (empty) |
| `tier-gates/` | Tier gate copy, upgrade sheets, lock overlay patterns | `SPEC.md` | Complete |
| `tiers/` | Tier definitions — Free / Artist / Pro / Label | `SPEC.md` | Complete |
| `tools-and-apis/` | Free tools and APIs — full catalogue | `FREE-TOOLS-AND-APIS.md` | Complete |
| `transcendence/` | 11/10 audit — what makes ABLE genuinely transcendent | `WHAT-11-LOOKS-LIKE.md` | Complete |
| `world-map/` | World map / calendar moments feature | `SPEC.md` | Complete |

---

## `docs/personas/`

**Purpose:** User archetypes — who ABLE is for.
**When to read:** Before writing copy or designing a feature.

| File | Persona | Status |
|---|---|---|
| `ARTIST.md` | Independent musician — primary user | Active |
| `FAN.md` | The fan — secondary user | Active |
| `FREELANCER.md` | Producer, mixer, videographer — Phase 2 user | Active |

---

## `docs/process/`

**Purpose:** How to work on ABLE — workflow, templates, session checklists.
**When to read:** At the start of a session or before creating new documentation.

| File | What's in it | Status |
|---|---|---|
| `SESSION-CHECKLIST.md` | Steps to follow at the start and end of every session | Active |
| `PROCESS.md` | How the ABLE build process works — 6-stage methodology | Active |
| `TOOLS.md` | Tool stack — Playwright MCP, Netlify, Supabase, git | Active |
| `FEAR_MAPS.md` | Risk mapping for major decisions | Active |
| `templates/20_ANGLE_TEMPLATE.md` | Template for 20-angle analysis | Active |
| `templates/PAGE_SPEC_TEMPLATE.md` | Template for new page specs | Active |

---

## `docs/reference/` — Research Only

**Purpose:** Background reading and design research. Not build authority.
**When to read:** For context on a decision area. Never build directly from these.
**Authority:** Supporting reference only.

### `reference/research/`

| File | What's in it | Status |
|---|---|---|
| `INTEGRATIONS_AND_AI_RESEARCH.md` | Full integration landscape — 20 categories, AI music tools, API reality check (Parts 1–8) | Reference |
| `PLATFORM_STRATEGY.md` | Tiers, fan journey, superfan system | Reference |
| `DISCOVERY_AND_GROWTH.md` | Directory, leaderboards, organic growth mechanics | Reference |
| `ECOSYSTEM_AND_PARTNERSHIPS.md` | Ablers, playlist pushers, rooms, press packs | Reference |
| `PRODUCT_HIERARCHY_AND_TRUST.md` | Priority order for all features | Reference |
| `USER_RESEARCH.md` | Artist interviews, pain points, needs | Reference |
| `DESIGN_RESEARCH_2026.md` | Design inspiration research | Reference |
| `DIRECTORY_DISCOVERY_RESEARCH.md` | Artist discovery and directory research | Reference |
| `MASTER_PLAN.md` | Original master plan (some sections corrected in INTEGRATIONS doc) | Reference |
| `2026-03-13-top-minds-insights.md` | Research from top product/design thinkers | Reference |

### `reference/micro-interactions/`

Nine categorised micro-interaction research files (01–09) plus `MICRO_INTERACTIONS_MASTER.md` and `README.md`. Research only — authoritative spec is `docs/systems/MICRO_INTERACTIONS_SPEC.md`.

| File | What's in it |
|---|---|
| `README.md` | Index and summary of the 9 categories |
| `MICRO_INTERACTIONS_MASTER.md` | Master compilation (use `systems/MICRO_INTERACTIONS_SPEC.md` for building) |
| `01-scroll-and-momentum.md` | Scroll physics, momentum, rubber-banding |
| `02-touch-and-tap.md` | Tap feedback, press states, haptic patterns |
| `03-state-transitions.md` | Page and component state changes |
| `04-entrance-and-exit.md` | Enter/exit animations |
| `05-form-and-input.md` | Form field behaviours |
| `06-loading-and-skeleton.md` | Loading states and skeletons |
| `07-reward-and-success.md` | Success states, rewards, celebrations |
| `08-ambient-and-passive.md` | Background motion, ambient effects |
| `09-navigation-and-wayfinding.md` | Navigation transitions, wayfinding |

### `reference/design-system/`

| File | What's in it | Status |
|---|---|---|
| `2026-03-10-v3-design-brainstorm.md` | Early V3 design brainstorm | Archive/Reference |

---

## `docs/research/` — Recent Research Sessions

**Purpose:** Focused research sessions from 2026-03-15+. Specific topics for build decisions.
**When to read:** If working on the topic covered.
**Authority:** Research reference — informs build, does not replace SPEC.md.

| File | Topic | Status |
|---|---|---|
| `2026-03-15-artist-directory-discovery.md` | Discovery and directory research | Reference |
| `2026-03-15-close-circle-pricing.md` | Close Circle pricing research | Reference |
| `2026-03-15-competitive-moat.md` | Competitive moat analysis | Reference |
| `2026-03-15-credit-verification-ux.md` | Credits system UX research | Reference |
| `2026-03-15-fan-closeness-mechanics.md` | Fan closeness and superfan mechanics | Reference |
| `2026-03-15-fan-retention-triggers.md` | What retains fans over time | Reference |
| `2026-03-15-fan-signup-conversion.md` | Fan sign-up conversion optimisation | Reference |
| `2026-03-15-freelancer-profile-needs.md` | Freelancer profile user needs | Reference |
| `2026-03-15-gig-night-ux.md` | Gig mode UX research | Reference |
| `2026-03-15-magic-link-fan-activation.md` | Magic link fan auth research | Reference |
| `2026-03-15-superfan-platform-landscape.md` | Superfan platform competitive landscape | Reference |

---

## `docs/superpowers/` — AI Superpower Session Docs

**Purpose:** Deep-dive planning documents from intensive AI-assisted strategy sessions. Historical context for major decisions. Not build authority — decisions from these are formalised in the relevant `SPEC.md` files.
**When to read:** For context on how a major decision was reached.
**Authority:** Historical context only.

### `superpowers/plans/`

| File | Topic |
|---|---|
| `2026-03-14-able-launch-plan.md` | Original launch plan |
| `2026-03-14-guided-identity-onboarding.md` | Guided identity onboarding concept |
| `2026-03-14-hierarchy-refinement.md` | Profile hierarchy refinement |
| `2026-03-14-james-master-strategy.md` | James's master strategy plan |
| `2026-03-14-start-ai-ux-rethink.md` | AI UX rethink for start.html |
| `2026-03-14-world-map.md` | World map concept |
| `2026-03-15-100-sections-broad-sweep.md` | All 100 sections scored + priority order |
| `2026-03-15-100-steps-to-10-out-of-10.md` | Backend + feature implementation plan |
| `2026-03-15-able-v3-ten-out-of-ten.md` | V3 ten-out-of-ten analysis |
| `2026-03-15-close-to-ten-gaps.md` | Gap analysis for reaching 10/10 |
| `2026-03-15-phase0-fear-maps.md` | User fear maps |
| `2026-03-15-placeholder-first-ux.md` | Placeholder-first UX approach |
| `2026-03-15-score-traceability.md` | Score traceability system |
| `2026-03-15-ux-rethink-implementation.md` | UX rethink implementation plan |
| `2026-03-15-v8-pre-build-100-steps.md` | V8 pre-build 100-step checklist |

### `superpowers/specs/`

| File | Topic |
|---|---|
| `2026-03-14-mbti-design-brief.md` | MBTI-informed design brief |
| `2026-03-15-ux-rethink-design.md` | UX rethink design spec |

---

## `docs/archive/superseded-v5/`

**Purpose:** Legacy v5-era docs. Vocabulary reference only. Do not build from these.
**When to read:** If looking up product terminology that may have originated in v5.
**Authority:** Superseded by all current docs.

| File | Note |
|---|---|
| `PRODUCT_SPEC.md` | Legacy v1 spec — vocabulary reference only |
| `QA_SMOKE_TESTS.md` | v3-era smoke tests — superseded by `systems/qa-testing/` |
| `ROADMAP.md` | Old roadmap — superseded by `STATUS.md` |
| `superpowers-v3-build-plan.md` | V3 build plan — historical reference |
| `superpowers-v3-design-spec.md` | V3 design spec — historical reference |
| `superpowers-v3-refined.md` | V3 refined spec — historical reference |

---

## `docs/v6/` — V6-Era Docs (Partially Still Valid)

**Purpose:** V6 was the generation before V8. Core product philosophy docs remain valid. Surface specs are superseded.
**When to read:** `v6/core/` is still authoritative for product truth and design philosophy. `v6/surfaces/` is superseded.
**Authority:** `v6/core/` = still valid product truth. `v6/surfaces/` = superseded by `pages/`.

### Still authoritative

| File | What's in it | Authority |
|---|---|---|
| `v6/core/V6_BUILD_AUTHORITY.md` | Resolved design decisions (fonts, CTA caps, state system) | Valid |
| `v6/PRODUCT_TRUTH.md` | What ABLE is — non-negotiable | Valid |
| `v6/core/VISUAL_SYSTEM.md` | 7 genre vibes, fonts, accent suggestions | Valid |
| `v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` | Copy voice, banned phrases, examples | Valid |
| `v6/V1_SCOPE.md` | Confirmed V1 scope (no Google/Apple OAuth, magic link only) | Valid |
| `v6/data/CANONICAL_OBJECT_MODEL.md` | Canonical data model | Valid |
| `v6/operational/BACKEND_SCHEMA.md` | Supabase table definitions | Valid |
| `v6/operational/FREELANCER_SPEC.md` | Freelancer profile spec (Phase 2) | Valid |
| `v6/engines/` | Close Circle, Credits, Fan Product, Guided Identity, Moment Engine, Showcase | Phase 2 reference |
| `v6/operational/` | All operational specs (Close Circle, Superfan scoring, Moments, etc.) | Phase 2 reference |

### Superseded (do not use for build decisions)

| File | Superseded by |
|---|---|
| `v6/surfaces/ARTIST_PROFILE.md` | `docs/pages/profile/SPEC.md` |
| `v6/surfaces/ADMIN.md` | `docs/pages/admin/DESIGN-SPEC.md` |
| `v6/surfaces/ONBOARDING.md` | `docs/pages/onboarding/DESIGN-SPEC.md` |
| `v6/surfaces/LANDING.md` | `docs/pages/landing/DESIGN-SPEC.md` |
| `v6/00_AUTHORITY_ORDER.md` | `CONTEXT.md` authority chain |
| `v6/addenda/V6_DOCUMENTATION_ARCHITECTURE.md` | This file |

---

## Recommended Reading Order by Scenario

### Starting a new build session

1. `CONTEXT.md` — active files, tokens, authority order (5 min)
2. `STATUS.md` — current build state, what's done, what's next (5 min)
3. `docs/pages/[page-you-are-working-on]/DESIGN-SPEC.md` or `SPEC.md` (10–15 min)

That's it. Three files. Start building.

### Building a specific page for the first time

1. `CONTEXT.md`
2. `STATUS.md`
3. `docs/ABLE_STRATEGY.md` — understand the product (10 min)
4. `docs/VOICE-BIBLE.md` — commit the copy rules (5 min)
5. `docs/pages/[page]/DESIGN-SPEC.md` (or `SPEC.md`) — primary build spec
6. `docs/pages/[page]/COPY.md` — all copy strings
7. `docs/systems/DESIGN_SYSTEM_SPEC.md` — CSS tokens
8. `docs/systems/MICRO_INTERACTIONS_SPEC.md` — motion spec
9. `docs/v6/core/V6_BUILD_AUTHORITY.md` — resolved decisions

### Fixing a bug

1. `CONTEXT.md`
2. `docs/pages/[page]/DESIGN-SPEC.md` — what the correct behaviour should be
3. `docs/systems/[relevant-system]/SPEC.md` — if system-level
4. `docs/STATUS.md` — check if it's a known issue

### Writing new copy

1. `docs/VOICE-BIBLE.md` — read entirely (5 min)
2. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — banned phrases, examples
3. `docs/systems/copy/SPEC.md` — all copy patterns by context
4. `docs/pages/[page]/COPY.md` — existing copy strings for consistency

### Adding a new feature

1. `CONTEXT.md`
2. `docs/ABLE_STRATEGY.md` — does this fit the product strategy?
3. `docs/v6/PRODUCT_TRUTH.md` — does this fit what ABLE is?
4. `docs/systems/tier-gates/SPEC.md` — what tier does this belong to?
5. `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md` — if integration-related
6. `docs/pages/[page]/DESIGN-SPEC.md` — how does it fit in the page?
7. `docs/DECISION-LOG.md` — document the decision

### Integrating an external API

1. `docs/apis/[api-name].md` — the primary spec
2. `docs/systems/integrations/SPEC.md` — integration architecture
3. `docs/systems/integrations/ANALYSIS.md` — current state and gaps
4. Check `netlify/functions/` — does a function already exist?

### Working on admin.html tools

1. `CONTEXT.md`
2. `docs/pages/admin/DESIGN-SPEC.md` — primary spec
3. `docs/systems/artist-tools/ANALYSIS.md` — current state scores
4. `docs/systems/artist-tools/SPEC.md` — 10/10 spec for each tool
5. `docs/systems/artist-tools/PATH-TO-10.md` — prioritised fixes

---

## File naming conventions

All docs in `pages/` and `systems/` follow a consistent 4-file pattern:
- `ANALYSIS.md` — current state audit
- `SPEC.md` — build-ready spec
- `PATH-TO-10.md` — prioritised improvements
- `FINAL-REVIEW.md` — overall score and decisions

Pages add:
- `DESIGN-SPEC.md` — the master build document (superset of SPEC.md for pages — where it exists)
- `COPY.md` — all visible copy strings
- `USER-JOURNEYS.md` — user flows
- `20-ANGLE-ANALYSIS.md` — quality audit
- `STRATEGY-REVIEW-FINAL.md` — strategic alignment check

Some systems use non-standard primary file names (listed individually above).

---

## Known gaps (to address)

1. `pages/profile/` is missing `DESIGN-SPEC.md` — referenced in CONTEXT.md but not yet created. Use `SPEC.md` until then. (`pages/fan/DESIGN-SPEC.md` does exist.)
2. Five systems are empty stubs: `founder-roadmap/`, `think-out-of-the-box/`, `master-review/`, `investor-strategy/`, `growth-strategy/` — no SPEC.md yet. Create when those areas become active build priorities.
3. `docs/systems/notifications/` uses `NOTIFICATIONS.md` as primary file, not `SPEC.md` — minor naming inconsistency.
4. `docs/systems/organic-growth/` uses `ORGANIC-GROWTH.md`, `docs/systems/partnerships/` uses `PARTNERSHIPS.md` — same.

---

## File structure score: 9/10

**What's working:**
- Clear separation between build authority (`pages/`, `systems/`) and research (`reference/`, `research/`)
- Consistent 4-file pattern per system makes navigation predictable
- `CONTEXT.md` and `STATUS.md` as mandatory session-start reads
- All deprecated v6 surfaces are clearly labelled with their replacement
- 347 docs organised into logical hierarchy with no orphaned files

**What would make it a 10:**
- All 6 pages having `DESIGN-SPEC.md` (profile and fan currently use `SPEC.md`)
- Empty stub systems either populated or removed
- Standardise primary file names across all systems (SPEC.md vs NOTIFICATIONS.md vs ORGANIC-GROWTH.md etc.)
- Add a `docs/strategy/` subdirectory to separate the 6 business-context root files from orientation docs
