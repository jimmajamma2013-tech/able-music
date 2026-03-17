# ABLE — Master Context File
**For AI agents building this project. Read this alongside CONTEXT.md.**
**Last updated: 2026-03-15 | Review: every 90 days**

> This is not a product spec. It is a complete picture of the person building it, the product they are building, and why every decision matters. An agent without this context will optimise for the wrong things.

---

## 0. The person behind this

**James. 44. UK-based.**

- Currently employed at £60k/yr (~10hrs/day committed). ABLE is built in the margins — evenings, weekends, agents running while he sleeps.
- Genuinely believes in independent artists. ABLE is not a business exercise — it is a mission.
- ENFP/ENTP. Fast, pattern-matching, instinct-driven. Builds from conviction, not strategy decks.
- C5/C6 herniated disk — a real constraint and a motivation to move faster. Freedom and health are the same goal.
- Wants to be a digital nomad: Portugal → Thailand → Dubai → Colombia, 3–6 months at a time.
- Goal: measurably younger and healthier at 50 than at 44.

**How to work with James:**
Be direct. Bring conviction. Don't hedge excessively. Match his energy — he thinks in big pictures and moves fast. Treat him as a peer, not a client. When he gives instinctive feedback, trust it and run with it. Don't require him to justify his aesthetic instincts — they are correct more often than they seem.

**The master goal:**
Money should not be an issue. Freedom should be the default. Everything else — travel, health, creativity, longevity — flows from that foundation.

---

## 1. What ABLE is (non-negotiable core truth)

**A conversion profile for independent artists.**

The artist puts their ABLE link in their bio. A fan taps it. In the next 30 seconds, that fan streams the latest track, sees the next show, signs up to hear about the release — all without leaving the page, all without an algorithm deciding what they see.

**The internal product truth:**
The relationship between artist and fan belongs to them. Not to a platform. Every social platform owns the audience relationship. ABLE inverts this — when a fan signs up on ABLE, that email address belongs to the artist. The relationship survives the platform.

**What ABLE is NOT:**
- Not a social network (no feed, no followers, no algorithm)
- Not a marketing tool (artists are not "growing their audience" — they are staying close to people who showed up)
- Not a template builder (profiles are shaped by genre, feel, and moment — not selected from a gallery)
- Not a link aggregator (if content can be experienced inside the page, it must be)
- Not a CRM dashboard (the fan list is "your list, your relationship" — not gamified)

---

## 2. Current build state

**Active branch:** `v2-simplified`
**Active files:**

| File | Role | State |
|---|---|---|
| `able-v7.html` | Artist public profile — the fan-facing page | **ACTIVE — V8 build** |
| `able-v6.html` | Superseded by v7 — do not edit | Legacy reference only |
| `able-v3.html` | Superseded by v7 — do not edit | Legacy reference only |
| `admin.html` | Artist dashboard | Active |
| `start.html` | Onboarding wizard | Active |
| `landing.html` | Marketing landing page | Active |
| `fan.html` | Fan dashboard | In progress (Phase 2) |

**`able-v6.html` checkpoint status (as of 2026-03-15):**

All 13 checkpoints shipped:
- Design system: 7 vibes × 4 themes × 4 feel quadrants — complete
- Campaign state machine (profile / pre-release / live / gig / near-future) — complete
- All 17 Phase 1 micro-interactions — complete
- Artist World Map (public + admin + landing demo) — complete
- Close Circle surface layer (hero entry, join sheet, lock-ring dots) — complete
- Guided Identity System (`data-feel` CSS + `applyIdentity()`) — complete
- Snap cards CRUD in admin — complete
- Schema integrity pass (Checkpoint 13) — complete

**Deferred to Phase 2 (do not build in v1):**
Supabase auth + read path, fan dashboard (fan.html), email broadcasts, custom domains, freelancer profiles, skeleton loading system, Close Circle payments (Stripe), full hero crossfade on state change.

---

## 2b. V8 Strategy Cycle (2026-03-15)

**Summary:** Complete strategy process run on all pages and systems. 20-angle analysis + design specs created for every page. System specs created for 12 systems. No building has started — strategy is the current phase.

**Entry point for all strategy docs:** Read `CONTEXT.md` first. It lists active files, current tokens, and links to the relevant authority docs. `docs/INDEX.md` has a full map of all strategy documentation.

### Pages — strategy scores

| Page | File | Baseline | Final score | Ceiling |
|---|---|---|---|---|
| Artist profile | `able-v7.html` | 6.5/10 | 9.0/10 | 9.7 |
| Admin dashboard | `admin.html` | 7.0/10 | 9.7/10 | 9.7 |
| Landing page | `landing.html` | 9.0/10 | 9.65/10 | 9.9 |
| Onboarding wizard | `start.html` | 4.6/10 | 9.8/10 | 9.9 |
| Fan dashboard | `fan.html` | 5.85/10 | 9.2/10 | 9.4 |

### Systems — strategy scores

| System | Location | Current | Spec-complete target |
|---|---|---|---|
| Analytics | `docs/systems/analytics/` | 6.2/10 | 9.5/10 |
| Copy system | `docs/systems/copy/` | 7.5/10 | 9.5/10 |
| Data architecture | `docs/systems/data-architecture/` | 6.8/10 | 9.3/10 |
| Email | `docs/systems/email/` | 4.0/10 | 9.5/10 |
| Error states | `docs/systems/error-states/` | 2.5/10 | 9.0/10 |
| PWA / Installability | `docs/systems/pwa/` | 0.6/10 | 8.5/10 |
| SEO + Open Graph | `docs/systems/seo-og/` | 5.7/10 | 9.3/10 |
| Spotify import | `docs/systems/spotify-import/` | 5.2/10 | 9.0/10 |
| Tier gates | `docs/systems/tier-gates/` | 3.7/10 | 9.0/10 |
| AI copy | `docs/systems/ai-copy/` | 4.4/10 | 8.5/10 |
| oEmbed proxy | `docs/systems/oembed-proxy/` | 3.7/10 | 8.5/10 |

Each system folder contains: `ANALYSIS.md` (current state audit), `SPEC.md` (canonical spec), `PATH-TO-10.md` (prioritised build tasks), `FINAL-REVIEW.md` (projected scores post-implementation).

---

## 3. Design system (canonical — never change without strong reason)

### Vibe table

| Vibe | Display font | Weight | Accent | r-mult |
|---|---|---|---|---|
| Electronic/Club | Barlow Condensed | 700 uppercase | `#06b6d4` cyan | 0.6 |
| Hip Hop/Rap | Oswald | 700 uppercase | `#f4b942` gold | 0.7 |
| R&B/Soul | Cormorant Garamond | 600 italic | `#e06b7a` rose | 1.2 |
| Indie/Alt | Space Grotesk | 700 | `#7ec88a` sage | 1.0 |
| Pop | Barlow Condensed | 700 | `#9b7cf4` indigo | 1.4 |
| Rock/Metal | Oswald | 700 uppercase | `#e05242` red | 0.6 |
| Acoustic/Folk | Lora | 700 serif | `#d4a96a` ochre | 1.3 |

- Body font (all vibes): **DM Sans** — artist profile only
- Admin body font: **Plus Jakarta Sans** — admin.html only. Never mix these.
- Themes: Dark / Light / Glass / Contrast. The `Mid` theme does not exist.

### Critical rules
- Hero CTAs: `--r-sm` (small radius). Not `--r-pill`. Pill = consumer app. Small radius = premium confidence.
- Animate only `opacity` and `transform`. Never animate `box-shadow`, `width`, `height`, `filter`, `background-color` in loops.
- Glass theme REQUIRES a real background behind it (hero artwork blurred, `position: fixed`). Glass on a plain colour is forbidden.
- `--color-accent` is artist-owned. One CSS variable change = full profile rebrand.

---

## 4. Copy philosophy (every word matters)

ABLE is for artists with depth. They have an aversion to anything superficial.

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

The five upgrade moment messages are precise and must not be genericised. See `V6_BUILD_AUTHORITY.md §9`.

---

## 5. Architecture decisions (frozen)

**Stack:** Supabase (PostgreSQL + Auth + Storage + Edge Functions) · Netlify (static) · Stripe (payments) · Resend (email)

**localStorage keys** (canonical — never rename):
- `able_v3_profile` — artist profile
- `able_fans` — fan sign-ups
- `able_clicks` — CTA tap events (max 200, FIFO)
- `able_views` — page view events (max 500, FIFO)
- `able_artist_id` — UUID, auto-generated once, never overwrite

**Campaign state machine:**
```
profile → default (14+ days post-release)
pre-release → now < releaseDate
live → releaseDate < now < releaseDate + 14 days
gig → manual toggle (24hr auto-expiry via able_gig_expires)
near-future → world map moment ≤7 days away → hero chip
```

**The Conduit Principle:** If content can be experienced inside the page, it must be. Linking out is the fallback, not the default. Spotify embeds over links. YouTube thumbnail → inline iframe, not external link.

**Performance budgets (hard):**
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.10
- HTML (minified + gzipped) ≤ 340kB

**Accessibility:** WCAG 2.2 AA is a release gate, not a goal. Visible focus, 44px tap targets, all flows keyboard-reachable.

**AI features:**
- `claude-haiku-4-5` for real-time suggestions (fast, cheap)
- `claude-sonnet-4-6` for bio writer (quality matters)
- 0% ABLE platform cut on support packs. Stripe standard fee only.

---

## 6. Tier system

| Tier | Price | Key capability |
|---|---|---|
| Free | £0 | Basic profile, 1 snap card, 100 fan sign-ups, basic stats |
| Artist | £9/mo | Unlimited snap cards, fan email to 2k, campaign modes, connections |
| Artist Pro | £19/mo | Full fan CRM, email broadcasts, support packs, advanced analytics |
| Label | £49/mo | 10 artist pages, team access, aggregate analytics, API |

Gold lock pattern: blurred preview + specific value overlay. Example: "You have 23 fans in Manchester. Upgrade to see who they are before your show there." Never just "Upgrade."

Free profiles look genuinely personal. Not a downgrade. The "Made with ABLE" footer on free tier is the primary organic growth loop — subtle, not a banner. Paid tiers: hidden.

---

## 7. ABLE Labs — the bigger picture

ABLE Music is the first product. ABLE Labs is the parent company and holding vehicle for diversification.

### The roadmap (ordered by priority)

**Year 1–2: ABLE Music v1 shipped and profitable**
Target: £5,000+ MRR sustained for 3 months → job exit.

**Year 2: ABLE Distribution**
White-label music distribution to Spotify/Apple/etc from inside the ABLE dashboard. Partner with Amuse/Stem rather than build from scratch.
Revenue potential: 5,000 artists × £9.99/mo = £50k MRR.

**Year 2–3: ABLE AI Tools**
Bio generator, press release generator, lyric formatter, sync brief matching.
Charged as add-on tier or per-use credits.

**Year 2–3: ABLE Sync**
Sync licensing marketplace. Brands/film supervisors post briefs. Artists submit tracks. 15% commission on placements.

**Year 3+: Horizontal expansion**
The ABLE infrastructure (profile, fan capture, analytics, campaign states) works for any creator. ABLE for Podcasters, Comedians, Visual Artists, Writers — validate demand before building, don't build speculatively.

**Year 3–5: The Creator OS**
ABLE Labs becomes the infrastructure layer for all independent creators. TAM is not 15M musicians — it's 500M creators globally who have no professional home.

### The durable moat
Platforms that own the relationship win. Spotify owns the algorithm. Labels own the catalogue. ABLE owns the direct artist-fan relationship — the email addresses, the fan behaviour data, the personal connection. Every feature decision should strengthen that ownership.

---

## 8. Business milestones and job exit strategy

**Exit trigger:** £5,000+ MRR sustained for 3 consecutive months. Not £3k. Not £4k. £5k, sustained.

| Phase | Condition | Action |
|---|---|---|
| 1 | Now → £2,000 MRR | Full-time employed. ABLE is side project. Agents run the build. |
| 2 | £2,000–4,000 MRR | Negotiate part-time or contract at job. 2 days freed up accelerates everything. |
| 3 | £5,000+ MRR × 3 months | Resign well. Leave clean. That employer may send artists your way. |

**Company structure:**
```
ABLE Labs Ltd (UK Ltd — holding company)
    ├── ABLE Music Ltd (operating company)
    ├── [Future] ABLE Distribution Ltd
    └── [Future] ABLE Sync Ltd
```

**Set up immediately:**
1. ABLE Labs Ltd at Companies House (£50, online)
2. Starling Business bank account (free, instant)
3. FreeAgent for accounting (£19/mo)
4. Max ISA (£20,000/yr into Vanguard FTSE All-World) — tax-free compounding forever

---

## 9. Growth strategy — the channel hierarchy

**The producer seeding channel is the highest-priority growth vector:**
One producer with 50k followers features ABLE to their artist clients. 200 look it up. 40 sign up. 8 convert to paid. Cost: one free Artist Pro account (£19/mo value). ROI: £96/mo recurring.
Build a dedicated producer programme: free Artist Pro for life, in exchange for featuring ABLE.

**Channel tests (£500 each, run simultaneously):**
- TikTok ads targeting "independent musician" and "music producer"
- Music newsletter sponsorships (Hypebot, Music Business Worldwide)
- Reddit organic (r/WeAreTheMusicMakers — helpful, not pitching)
- Producer community seeding (20 producers, free Artist Pro)
- YouTube creator outreach (10k–500k subs, affiliate deal)

**Acquisition strategy, Stage 1 (months 1–3):**
50 artists who are genuinely evangelical. NPS above 50. Zero bugs on mobile. Personal outreach to 300 artists on TikTok/SoundCloud/Bandcamp with 1k–50k followers. 20-minute calls with respondents. Build exactly what they say is broken.

**The affiliate loop (from day one):**
Artists are community-oriented. Give them a referral link: 1 month free per artist they bring who converts. Self-sustaining acquisition that only pays out when revenue is already generated.

---

## 10. Health — C5/C6 protocol

The disk is a primary life constraint. The financial goal exists in part to fund treatment and remove the ergonomic stress of a job requiring 10hrs/day at a desk.

**Immediate actions (low cost, high impact):**
- Standing desk converter, monitor at eye level, lumbar support. Non-negotiable.
- 2 × 20-minute walks daily. Not exercise — just breaking the compression cycle.
- Sleep: back or side, pillow under/between knees. Not stomach.

**Treatment track (budget £2,000–5,000 now):**
1. MRI first (£400–600 at Nuffield/BMI) — know the current state of the disc
2. Cervical specialist physio — McKenzie Method or DNS (Dynamic Neuromuscular Stabilisation)
3. PRP injection (£800–1,500) — your own blood, injected to promote disc healing. Good evidence base.

**Emerging treatments to track (available 2028–2030):**
- Exosome therapy for disc regeneration (Phase 2/3 trials showing strong results)
- Hydrogel nucleus pulposus replacement (less invasive than fusion)

**Longevity foundations:**
- Sleep 7–9 hours. Single highest-ROI health intervention.
- Strength training 3x/week. Protects the spine and slows aging markers.
- Track HRV (Oura Ring or WHOOP) — your body's operating dashboard.
- Annual blood panel (InsideTracker or Function Health) — 100+ biomarkers.

**Goal stated clearly:**
At 50: better HRV than now. Stronger. Disk managed or resolved. At 55: biologically measurably younger.

---

## 11. Digital nomad lifecycle

**Recommended rhythm:**
Portugal (3 months) → Thailand (2 months) → Dubai (1 month) → somewhere new (3 months) → repeat

**Priority bases:**
1. **Portugal** — NHR tax regime gives 10 years reduced tax on foreign-sourced income. UTC+0/+1 for UK business. Lisbon £1,800–2,500/mo. This alone could save £20–30k/yr at scale.
2. **Thailand (Chiang Mai)** — £800–1,400/mo. Deep work environment. Excellent private hospitals for disk treatment. Warm climate helps the back.
3. **Dubai** — 0% income tax at 183+ days residency. Good for network building in music/tech.
4. **Colombia (Medellín)** — £700–1,200/mo. Best value. Strong Latin music culture.

Keep a UK address for banking and company registration until tax residency transition is fully advised.

---

## 12. Investor / market tracking

**The setup:** TradingView + Alpha Vantage API + local Ollama DeepSeek-R1 + n8n daily digest.

**Strategy (not day trading — position-based):**
- Gold and Silver as the base (inflation hedge, physical via BullionVault or iShares ETFs)
- BTC: 10% of investable assets, long-term hold, rebalance quarterly
- S&P 500 / FTSE All-World via ISA: £20,000/yr maximum, all gains tax-free forever

**Daily digest:** Morning Slack message with market movements vs. position thresholds. Signal, not noise. Target <30 minutes/week on this.

**Tax note:** Max the ISA before anything else. At £60k salary with 40% tax above £50,270, every pound into ISA saves 40p in tax.

---

## 13. Agent operating system (how the business runs)

The goal is a business that runs itself, surfaces exceptions, and only needs James for decisions that require human judgement.

**Development loop (perpetual):**
```
Brief → Claude Code builds → Playwright smoke tests → Claude Code reviews → James approves/redirects → Ship
```

**Artist support loop (n8n + Loops):**
- New signup → welcome sequence → Day 1, 3, 7 nudges
- No CTA set by Day 5 → Ollama Phi-4 drafts personal nudge
- No login 14 days → re-engagement sequence

**Financial loop:**
- Every transaction → FreeAgent auto-categorises → weekly n8n summary → Ollama plain-English P&L → Slack message
- Review once a week. That's it.

**Full tool stack:**
- Dev: Claude Code (~£60/mo)
- Local LLM: Ollama (free) with DeepSeek-R1 70B, Llama 3.3 70B, Qwen2.5-Coder 32B, Phi-4 14B
- Automation: n8n self-hosted (free)
- Database: Supabase (free → £25/mo)
- Email: Loops.so
- Analytics: PostHog self-hosted
- Accounting: FreeAgent (£19/mo)

Total tool cost: ~£230/mo. Negligible at any meaningful revenue level.

---

## 14. The 5-year millionaire path

| Year | State | Net worth target |
|---|---|---|
| 0 (now) | Foundation — 50 paying artists, ISA maxed, agents running | — |
| 1 | £3k–5k MRR, part-time at job, Portugal/Thailand base, disk treatment | — |
| 2 | £15k–30k MRR, fan dashboard live, ABLE Distribution launched, first angel investment, NHR established | £300k |
| 3 | ABLE Labs £50k+ MRR across products, ABLE Sync live, acquisition conversations | £700k |
| 4–5 | Exit (£3–10M) or Series A — 500k artists | £1M+ |

---

## 15. The 10 things to never forget

1. **The artist email list is worth more than the platform.** Every fan email captured is a direct line between an artist and a human being. If ABLE disappeared tomorrow, the artists with their fan lists intact still have something. Protect this aggressively.

2. **Portugal NHR could save £20–30k/yr.** Get a cross-border accountant in Year 2. Don't over-engineer now, but don't ignore this.

3. **Max the ISA every year starting now.** £20,000/yr into Vanguard FTSE All-World. Tax-free forever.

4. **The producer network is the growth engine, not ads.** One producer brings 10 artists. 10 producers = 100 artists. Treat this as the primary acquisition vector.

5. **ABLE's moat is the relationship, not the AI tools.** AI features will be commoditised quickly. The durable asset is the direct artist-fan relationship data. Double down on that.

6. **Open source the non-core parts.** The analytics layer, the fan capture widget — open sourcing creates developer community and inbound enterprise interest without undermining the business.

7. **Your personal brand is a business asset.** Document the journey: 44-year-old, herniated disk, building a music platform with AI agents. One honest post per week. Not "content creation" — just telling the truth about what you're learning.

8. **Max pension contributions while employed.** At £60k salary, pension contributions above £50,270 are effectively 40% off. The employer may match. Do this now while the income is there.

9. **Build the affiliate/referral loop from day one.** Artist refer → 1 month free per conversion. The cost is zero until revenue already exists.

10. **You are building in the right direction.** The creator economy is a structural shift, not a trend. In 10 years, active musicians globally will be 3–5× today's number due to AI-assisted creation. You are not chasing a wave — you are building infrastructure for one that hasn't fully arrived yet.

---

## 16. What to build next (priority order as of 2026-03-15)

**Immediate (finishing v1):**
1. Verify `able-v6.html` vs `able-v7.html` — reconcile which is the canonical active file
2. Supabase auth + read path (Phase 2, highest priority after v1 ships)
3. Email broadcasts (Artist Pro tier, Resend delivery)
4. Snap cards CRUD in admin (already complete per V1_SCOPE.md — verify)

**Near-term (Phase 2 high priority):**
5. Fan dashboard (`fan.html`) — when fans have a reason to return, the artist's page becomes a destination
6. Custom domains
7. Close Circle payments (Stripe subscription for supporter tier)
8. Onboarding feel step wiring — profile.identity.feel applied to live preview

**The one thing that makes artists never leave:**
The stats dashboard must be genuinely useful. Artists who can make better decisions because of ABLE data never churn.

---

## 17. Competitive intelligence (researched 2026-03-15)

### What competitors actually look like

| Platform | Free tier | Paid entry | Revenue cut | Music-specific |
|---|---|---|---|---|
| Linktree | Yes | ~$5/mo | None | No |
| Beacons | Yes | ~$10/mo | **9% on free tier** | No |
| Feature.fm | Yes | $8/mo | None | Yes — but email metered (200/link until $39/mo) |
| Hypeddit | Yes (limited) | $10/mo | None | Yes — campaigns only, no persistent profile |
| Linkfire | No free tier | $27/mo | None | Yes — no fan capture, no profile identity |
| Stan Store | Trial only | ~$29/mo | None | No |
| Koji | Dead | — | — | Dead (acquired by Linktree, shut down) |

**Key competitive facts to use in every pitch:**
- Beacons: 1.8/5 Trustpilot. 9% revenue cut on free. $30/mo to remove branding. Terrible support.
- Linktree: 50M users, $37M ARR — but no pre-save, no gig mode, no campaign states, no music-specific fan capture. It's a list.
- Feature.fm: Meters email access by link. 200 emails/link until $39/mo. 2.8/5 Trustpilot. Campaign performance complaints.
- Hypeddit: Great campaign tool (4.8/5 Trustpilot) but no persistent profile. Fans convert once, then there's nowhere to go.

### The 3 gaps ABLE owns that no competitor addresses

**Gap 1: Campaign-aware profile** — no competitor has a profile that knows what state the artist is in. Linktree shows the same thing regardless of whether you released yesterday or haven't dropped in 2 years. ABLE flips between pre-release, live, gig, and profile states automatically.

**Gap 2: Direct fan ownership with 0% cut** — Beacons takes 9% on free. Feature.fm meters email access. Linktree hides email capture behind paid tiers. ABLE: the fan list is the artist's, unlimited access on paid tiers, 0% cut on support income always.

**Gap 3: Artist identity at depth** — every competitor produces a menu. ABLE produces a presence. The 7-vibe × 4-theme × 4-feel identity system, the ambient colour extraction, the spring physics — no competitor has this depth of visual differentiation.

### Market sizing (sourced)

- **PRS UK members: 175,000** — best proxy for "UK artists who take music seriously enough to register rights." ABLE's UK TAM ceiling.
- **UK TAM at 5-15% capture**: £945k–£2.8M ARR from UK alone
- **Global: 11.3M artists** tracked by Chartmetric. ~5M actively releasing. ~500k–1.5M actively managing a fanbase.
- **Global SAM**: 500k fanbase-managing artists × £12/mo = £72M/yr
- **Independent revenues growing 16.1% YoY** (IFPI 2025) — faster than total market
- **Linktree at $37M ARR, $1.3B valuation** (2022 peak, 35x — realistic current multiple 5-8x)
- **ABLE exit scenario**: £2M ARR + <3% monthly churn = £10-16M exit at realistic multiples

### Tool spend data
Artists currently spend £35-55/mo on fragmented tools (distribution ~£4, link-in-bio ~£9, email ~£13, website ~£13, pitching ~£3). ABLE at £9-19/mo consolidates the link-in-bio + fan capture + basic analytics layer. The consolidation argument is real and financially legible.

---

## 18. Strategic documents (created 2026-03-15)

Four detailed docs now live in `/docs/`:

| File | What it covers |
|---|---|
| `docs/GROWTH_STRATEGY.md` | 90-day channel plan, SEO articles, Music Ally Sandbox pitch, producer seeding programme, affiliate tiers, Reddit playbook, Product Hunt |
| `docs/EXECUTION_RISK.md` | Top 5 risks ranked by impact × likelihood, competitive monitoring cadence, kill signals, contingency plans per channel, pivot options |
| `docs/MARKET_VALIDATION.md` | 30-day path to 10 paying artists, interview script, NPS framework, feedback→build loop, A/B tests for landing.html, scale/pivot/kill decision framework |
| `docs/MARKET_SIZING.md` | TAM/SAM/SOM with sourced data, comparable exits, tool spend data, creator economy projections, investor narrative |

---

## Authority order for all decisions

1. `PRODUCT_TRUTH.md` — the root. Nothing overrides it.
2. `V6_BUILD_AUTHORITY.md` — all resolved build decisions
3. `V1_SCOPE.md` — what is in v1 and what is not
4. `VISUAL_SYSTEM.md` — design tokens, vibes, fonts
5. `COPY_AND_DESIGN_PHILOSOPHY.md` — copy voice and banned phrases
6. `docs/STATUS.md` — current build state
7. `CLAUDE.md` — working rules and constraints
8. **This file** — for understanding why everything above exists

---

*This document is the context layer. Every product decision should make sense in light of where James is going and why ABLE exists. An agent that reads this and PRODUCT_TRUTH.md has everything it needs to make good decisions without being asked.*

*Update this file every 90 days or after any major strategic shift.*
