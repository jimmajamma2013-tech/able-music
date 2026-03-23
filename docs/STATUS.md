# ABLE — Current Build Status
**Updated: 2026-03-17 (session 21 — B9 letter-spacing tokens (--ls-wide/--ls-xwide) + B10 paragraph measure tokens (--measure-body/--measure-wide) across all 4 active pages; C5 admin WCAG fix: --acc-t semantic token for light-surface amber text (8 rule groups migrated); C6: --color-on-accent wired to WCAG luminance in applyDerivedTokens(); F10 verified: no transition:all in any active page; CSS bug fix: broken .chq-state-pill transition shorthand in admin.html; source badge + rel-status contrast fixed | session 20 — 10,000-point audit system (100 dimensions × 100 points, docs/audit/dimensions/); iOS auto-zoom prevention across all 4 pages; border-radius + transition + shadow tokenization; admin colour tokens; admin mobile nav safe-area-inset + 44px tap targets; active file renamed able-v7.html → able-v8.html) | Update this file at the end of every session.**

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
| QA testing | 9.0/10 spec | ✅ `docs/systems/qa-testing/` — **92/92 tests green** (smoke, copy, a11y, interactions) |
| Master review | 7.5/10 | ✅ `docs/systems/master-review/` — schedule recurring monthly review |

**Rule: No building until all strategy docs are complete.**

---

---

## Active branch
`v2-simplified`

---

## What's built and working

### able-v8.html (Artist Profile — ACTIVE)
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
- [x] **V8** Clips section — YouTube Short + TikTok embeds, V1 iframe containment, `able_clips` localStorage
- [x] **V8** Auto-gig mode from shows list — activates at doors time, expires 4h after show start
- [x] **V8** UTM source links (`?src=instagram`, `?src=tiktok`) rendered in owner bar
- [x] **V8** PostHog: `page_viewed`, `cta_tapped`, `fan_signed_up` events
- [x] **V8** SEO P0: og:image https:// guard, meta description id, canonical tag
- [x] **V8** Fan limit banner copy — "almost full" at 95 fans (not "full")
- [x] **V8** Embed chrome suppression + top card preview in owner view
- [x] D15 platform pill first-load shimmer confirmed (session-flagged, .pill-shimmer-once)
- [x] prefers-reduced-motion CSS throughout confirmed
- [x] touch-action: manipulation on * confirmed
- [x] **S20** iOS auto-zoom: all inputs/textareas ≥16px (fan-capture was already 16px; snap body textarea fixed)
- [x] **S20** Border-radius fully tokenized (0 hardcoded px values remaining)
- [x] **S20** Transition timing tokenized (0.15s/0.25s/0.4s/0.6s → var(--dur-*))
- [x] **S20** Shadow tokens added to all 4 themes; hover box-shadows use var(--shadow-lift)
- [x] **S20** 10,000-point audit system: 100 dimension files in docs/audit/dimensions/
- [x] **QP2** Quality Phase 2 complete (2026-03-22) — three-tier profile hierarchy (primary/secondary/tertiary), fan capture elevation, cross-state section reorder verified (pre-release/live/gig). See `docs/ABLE_10_10_SYSTEM.md §Phase 2` for full criteria record.
- [x] **QP3** Quality Phase 3 complete (2026-03-22) — Artist World register applied to landing + start (retired #0f1624 blue-steel, confirmed terracotta #d4704e accent), hero/footer gradient drift removed, Barlow Condensed italic loading fixed, quote weight doctrine violations resolved. Surface doctrine written to brand-identity/DOCTRINE.md.
- [x] **QP4** Quality Phase 4 complete (2026-03-23) — fan echo hierarchy corrected (emotional line primary), gig + gig-post CTA labels fixed ("Let me know" eliminated from all states), close circle opt-in visual treatment improved, gig-post generic secondary heading removed. Quality Phase 5 is next.

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
- [x] **V8** First-fan moment: `checkFirstFanMoment()` surfaces first fan's email with copy "That email is yours — no platform decides whether they hear from you." (`able_first_fan_seen` flag prevents repeat)
- [x] **V8** Credits handle field: release credits now have name/role/handle — handle confirmed = live `/{handle}` link, unconfirmed = 70% opacity plain text
- [x] **V8** `migrateWizardKey()` IIFE: reads `able_profile`, merges into `able_v3_profile`, removes legacy key
- [x] **V8** Greeting system §5.2: `countFansAfterTimestamp()`, `buildGreetingSub()`, `applyGreeting()` — full 8-branch context-aware system (gig active / pre-release countdown / live window / post-gig "Last night at {venue}. {N} fans joined." / default). First-ever visit path: "Good to meet you." + 2.5s fade to contextual sub.
- [x] **V8** Upgrade bar fan count: `updateUpgradeBar()` shows "47 of 100 fans." when fans > 0, "Nearly there." when ≥80 — replaces generic "Free plan." text
- [x] **V8** Clips management panel — add/delete/reorder YouTube Short + TikTok embeds, stored in `able_clips`
- [x] **V8** Dashboard hierarchy + Campaign HQ authority — visual weight, consequence copy, stats intelligence
- [x] **V8** Campaign HQ consequence copy + light theme depth fixes
- [x] **V8** Mobile layout: 2×2 stats grid, topbar overflow, ghost btn contrast — confirmed at 375px
- [x] **V8** UTM copy links for Instagram and TikTok bios (`?src=instagram`, `?src=tiktok`)
- [x] **V8** `derivePlatformFromUrl()` — stores `platform` + `platformId` on release paste (Spotify/Apple/SC)
- [x] **V8** Artist-success P0.1+P0.2 — `admin_visit_dates` tracking + day-0 bio nudge card
- [x] **V8** `checkTierGate()` infrastructure + gold lock CSS across all Pro/Label-gated features
- [x] **V8** Ticketmaster import wired in world map — `ticketmaster-import.js` Netlify function
- [x] **V8** World map focus trap + keyboard navigation (WCAG 2.2)
- [x] **V8** Fan cap enforcement in admin + progress bar with ARIA live region
- [x] **V8** Embed chrome suppression + performance budget enforcement + top card preview
- [x] **V8** oEmbed POST support + Mixcloud autofill via oembed-proxy
- [x] **V8** SEO/OG P0 gaps closed (og:image https:// guard, meta description id, canonical)
- [x] **V8** UI/accessibility P0 bugs closed (focus ring glow pattern, contrast ratios, tap targets)
- [x] **S20** iOS auto-zoom: all inputs ≥16px; .field-input 13→16px, .chq-date-picker 12→16px, .admin-sheet-input 14→16px, .yw-form-input 13→16px
- [x] **S20** Admin colour semantic tokens added (--green, --green-rgb, --purple, --gig, --gig-rgb, --red, --red-rgb)
- [x] **S20** --r-xs: 4px added; all hardcoded border-radius values tokenized
- [x] **S20** Circular CSS token bug fixed: --dur-fast: var(--dur-fast) → .14s
- [x] **S20** Mobile nav safe-area-inset bottom + 44px min-height on nav items
- [x] **V8** PostHog P0 — init + 3 core events (page_viewed, cta_tapped, fan_signed_up) in able-v7.html
- [x] **S15** NEW-5 first-run checklist exit animation — `markFrcDone()` adds `.completing` (reverse 250ms) before `.done`
- [x] **S15** `@supports (view-transition-name: none)` guard on all 3 files (able-v7.html, admin.html, start.html)
- [x] **S15** P2.3 sidebar QR: `renderSbQR()` + `downloadSbQR()` — accent-coloured, 120px, `?src=qr` tracking
- [x] **S15** `shared/tokens.css` created — canonical source of truth for easing, spacing, radius, Surface 1+2 tokens

### start.html (Onboarding Wizard)
- [x] Pre-step 0: Spotify/music link import
- [x] Artist name, vibe/genre, accent colour
- [x] CTA type selection
- [x] Release info capture
- [x] Guided identity system (feel selection, AI vibe match)
- [x] Live preview phone (Reel slot, snap cards, music, merch)
- [x] E10 progress bar spring easing (--spring, 0.55s)
- [x] Copy compliance: wizard step 0 message — removed "Let's get started" → "A few details first"
- [x] **V8** Step order swapped — objective selection before identity (vibe/feel)
- [x] **V8** Personalised done screen — "Found you on Spotify" beat + artist's chosen state reflected in sub-line
- [x] **V8** Linktree import — `?import=linktree` param + `linktree-import.js` Netlify function
- [x] **V8** PostHog wizard events — step_completed, onboarding_complete

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
- [x] **V8** Competitive feature comparison table (P0.2)
- [x] **V8** Doctrine compliance pass — missing sections added, legal blockers resolved
- [x] **V8** Copy quality pass — banned phrases, marquee removed, FAQ rewritten
- [x] **V8** `og-landing.png` — 1200×630 OG image generated via Playwright, deployed to `assets/og/`

---

## In progress / planned next

### Open (genuine blockers)
- [ ] **Near me location** — fan.html shows demo London shows; real Supabase query needed (Phase 2 data)
- [ ] **PWA icons on real devices** — verify home screen install on iPhone
- [ ] **og-default.jpg deploy** — file exists locally at `/og-default.jpg`; must be accessible at `https://ablemusic.netlify.app/og-default.jpg` before first artist
- [ ] **RESEND_API_KEY** — set in Netlify env vars at resend.com + netlify.com (James's task)
- ~~**Fan confirmation email URL param**~~: ✅ Always done — `?artist=slug&ref=email-confirm` is in fan-confirmation.js line 69
- ~~**GDPR front-end disclosure**~~: ✅ Done — privacy policy link + opt_in + consent_ts wired to Supabase

> **Terminology note:** "Phase" in this section refers to **Roadmap Phases** — product shipping milestones. This is distinct from the **Quality Phases** in `docs/ABLE_10_10_SYSTEM.md` (which also has a "Phase 2"). Qualified forms: **Roadmap Phase 2** (here) vs **Quality Phase 2** (10/10 system).

### Phase 2 (post-launch)
- [ ] Supabase auth (magic link — so artists own data, not just localStorage)
- [ ] freelancer.html — spec complete at `docs/pages/freelancer/DESIGN-SPEC.md`
- [ ] fan.html real data (currently demo-only, needs Supabase `fan_follows` + `moments` tables)
- [ ] Close Circle + Stripe wiring
- [ ] Email broadcasts (Resend bulk send, Artist Pro tier)
- [ ] Netlify deploy + ablemusic.co DNS (main branch merge — needs James sign-off)
- [ ] **Cold-source pre-release exception** — source-aware CTA position adjustment for TikTok / YouTube Shorts traffic during pre-release state
  - **Spec:** `docs/TOP_CARD_CTA_DECISION_SPEC.md` §2 Decision priority order (cold source exception)
  - **Current behaviour in `able-v8.html`:** Pre-save is always primary CTA when state = pre-release, regardless of source. No source-aware CTA position logic exists.
  - **Target behaviour per spec:** When source = TikTok or YouTube Shorts during pre-release, a warm-up action (stream teaser, watch clip) leads as primary CTA. Pre-save is demoted to secondary but must remain reachable without scroll.
  - **Why it matters:** TikTok and YouTube Shorts traffic is cold and algorithm-served. A pre-save ask before the fan has heard anything exceeds the ask ceiling for that source and will bounce. The warm-up lead increases downstream pre-save conversion.
  - **Not yet implemented.** Requires UTM source detection to be wired to CTA position logic — source tracking exists (`?src=tiktok`) but does not yet influence which CTA is primary.
  - **Do not attempt in Phase 1.** Needs 8 weeks of clean source data before adaptive CTA behaviour goes live (spec guardrail).

### Future (Year 2+)
- [ ] PostHog analytics integration
- [ ] Email broadcasts backend (Resend)
- [ ] ABLE Distribution (white-label)
- [ ] ABLE Sync (licensing marketplace)
- [ ] Artist discovery page (non-algorithmic)

---

## Known issues

- **Deployment gap**: `ablemusic.netlify.app` deploys from `main`. All V8 work is on `v2-simplified`. Merge to main requires James's explicit sign-off (CLAUDE.md rule). Draft deploys available via `netlify deploy` (session 12 draft: `69b8581493b06a12c83eb87a--ablemusic.netlify.app`).
- **Supabase views table missing**: `injectSEO()` / view tracking calls `/rest/v1/views` which 404s — Supabase table not created yet. Falls back to localStorage silently. Create `views` table when wiring Supabase backend.
- ~~**og-default.jpg**~~: ✅ File exists at `/og-default.jpg` locally (17KB, Gemini-generated). FALLBACK_OG + meta tags corrected to point to `og-default.jpg`. Deploy to ablemusic.co as part of main branch merge.
- **RESEND_API_KEY**: Not set in Netlify env. fan-confirmation.js will silently skip sending. Manual task — James only at resend.com/domains + netlify.com.
- **No service worker**: PWA is installable (manifest.json + icons exist) but not offline-capable. fan.html home screen promise is half-kept.
- ~~**noindex missing**~~: ✅ Both admin.html and fan.html already have `<meta name="robots" content="noindex,nofollow">`.
- ~~**Campaign mode per-mode explanations**~~: ✅ `MODE_DESCS` object + `#chqModeDesc` wired — mode description updates on every arc state change.
- ~~**"Preview your page →" link**~~: ✅ `topbarViewBtn` wired — `href` updated with artist handle in `renderProfile()`.

---

## Last session summary (session 17 — PATH-TO-10 sweep + quality fixes)

Key changes:
- **artist-welcome.js** — new Netlify function (Resend, under-60-word email). Wired from `start.html` `initDone()` — fire-and-forget on wizard completion
- **admin.html → able-v7.html links** — all 5 `able-v8.html` refs corrected to `able-v7.html` (topbar edit CTA, live chip, topbar view button, JS dynamic href)
- **admin mobile nav** — expanded from 4→5 tabs: Today/Fans/Page/Updates/Stats. Fans promoted to primary tab
- **Lifecycle stage system** — `data-stage` attr on `#page-home` (new/gig/active). CSS accent cues per stage
- **Days-active streak stat** — 4th stat card now shows consecutive admin visit streak (from `admin_visit_dates`). Replaces duplicate click-rate card
- **Release type left-border** — `data-release-type` attr on release cards; CSS rules colour left border by type (album=accent/ep=purple/single=green/mixtape=amber). Fully tokenised
- **landing.html feat-table** — reordered so "You own the emails. Forever." is closing row per competitive spec P0.2
- **OG image** — `og-default.jpg` exists locally. FALLBACK_OG constant + 2 static meta tags corrected from `og-fallback.jpg` → `og-default.jpg`

**Open after session 17:**
- Deploy v2-simplified → main (James sign-off required)
- RESEND_API_KEY in Netlify env (James)
- Supabase `views` table creation (when wiring backend)
- og-default.jpg deployment verification post-merge

---

## Last session summary (session 15–16 — quality pass: W3C, a11y, performance, GDPR, Supabase)

Full quality pass across all 5 active pages. **All pages now at Lighthouse accessibility 100.**

Key changes:
- **Async font loading** — eliminated render-blocking Google Fonts on all 5 pages (able-v8, admin, start, landing, fan) — ~1700–2100ms savings each
- **W3C HTML validation** — 0 errors on admin.html, start.html, landing.html, fan.html. able-v8.html: 9 false positives (CSS env() — valid modern CSS, validator limitation)
- **Accessibility** — all 5 pages at axe 1 violation (browser-sync dev tool false positive only)
- **GDPR compliance** — privacy policy link visible at fan sign-up; opt_in + consent_ts written to Supabase
- **Supabase fan upsert** — campaignState captured at sign-up time (CRM P0.1); profile FK upserted before fan insert
- **fan.html quality pass** — 19 contrast violations fixed (colour-text-3 raised from 0.38→0.50; feed item initials cream text; clip badge brightened; fi-clip-caption undefined token fixed). Region landmark violations resolved with `<main>` wrap. Meta description added.
- **admin.html** — CDN preconnect hints added; type="text/javascript" warning fixed; shows list sorted by date with past-show styling
- **World map** — dramatic visual upgrade: 52px month label, 56px cells, accent-tinted gradient card
- **MASTER.md corrected** — active file table pointed at able-v6.html, fixed to able-v7.html (session 14)
- **CLAUDE.md rule 10 updated** — V8 strategy docs are primary authority, not V6_BUILD_AUTHORITY.md

**Open after session 14:**
- Fan confirmation email URL param (2-line fix, highest priority)
- GDPR front-end disclosure text
- og-default.jpg creation (Figma task — James)
- RESEND_API_KEY in Netlify env (James)

## Last session summary (session 13 — ai-copy P0 + email consent + fan.html polish)
P0 sweep continued. All code-implementable P0 items from PATH-TO-10 files now complete. Draft deployed.

Key changes this session:
- **ai-copy.js P0 complete**: bio mode → `claude-sonnet-4-6`; `buildSystemPrompt(vibeId, feel)` injects per-vibe and per-feel register context blocks from SPEC.md §3; in-memory IP rate limiting 20 req/24h; `hasBannedPhrase()` detects 14 patterns, drops violating suggestions and logs server-side; `getFallbackSuggestions()` curated bank for all modes/vibes; 422 when all suggestions banned; fallbacks returned on any API failure
- **able-v7.html email P0.4**: added `consent_ts` (ISO timestamp) and `consent_source` (snake_case) to fan records in both sign-up handlers — alongside existing camelCase fields for backwards compat
- **fan.html P1.3 pre-release countdown strips**: `renderPreReleaseStrips()` checks `able_v3_profile` (same-browser demo) and followed artist data; renders accent-colour strips above the feed with countdown, release title, and pre-save CTA; max 3 shown with overflow count
- **fan.html P1.4 source tracking**: feed item click now navigates to `able-v7.html?slug=…&src=fan-dashboard` when no `item.url` set
- **P0 sweep verification** (many items confirmed already done): analytics sessionId + anti-self-visit + source detection, copy violations (dashboard/superfan), SEO og:image data: URI fix, admin.html title, email P0.5 consent notice + P0.6 fire-and-forget call all already correct
- **Draft deploy**: `69b88d191628e293cdd116d6--ablemusic.netlify.app`

**Open after session 13:**
- og-default.jpg — needs Figma creation + Netlify upload (James's task)
- RESEND_API_KEY — set in Netlify env vars at resend.com + netlify.com (James's task)
- Supabase wiring — when ready, all localStorage keys map 1:1
- fan.html P1.2 near-me location input (structural feature)
- fan.html P1.5 notification bell `fan_last_seen_ts` logic

## Last session summary (session 12 — brand elevation + P0 sweep)
Brand improvements and P0 fixes. Draft deployed to Netlify. Playwright smoke tests passed.

Key changes this session:
- **Brand: admin page title elevation**: `.page-title` 26px → 32px, letter-spacing 0.01em → -0.01em — Barlow Condensed editorial authority across all section headings
- **Brand: landing OG meta tags**: Title, description, image path updated to match SPEC.md canonical copy ("The page that belongs to you")
- **docs/systems/brand-identity/DOCTRINE.md**: New — typography doctrine, three-typeface system rationale, accent doctrine, brand unity principle
- **docs/systems/DESIGN_SYSTEM_SPEC.md**: Surface 2 table corrected (page titles are Barlow Condensed 32px, not Plus Jakarta Sans 22px); home greeting documented as intentional exception
- **Accent colour picker**: Added to admin identity card — 8 preset swatches + native colour input; `setAccent()` function saves to profile.accent + identity.accent, updates preview, shows toast
- **PWA manifest links**: Added to admin.html and start.html (`<link rel="manifest">` + iOS meta tags). All 4 active pages now PWA-ready.
- **PATH-TO-10 files updated**: crm (4→7/10), artist-tools (6.8→8.2/10), pwa (2→5/10) — all P0 items marked complete
- **Launch hardening plan verified**: All 5 tasks already complete in prior sessions
- **Draft deploy**: `netlify deploy` to `69b8581493b06a12c83eb87a--ablemusic.netlify.app`; all 5 pages + manifest.json return 200; smoke test passed

---

## Last session summary (session 11 — V8 build sprint)
V8 build mode. Multiple P0 fixes across admin.html and able-v7.html. Recommendations system (V1) fully built. Save feedback standardised. Doc doctrine files created.

Key changes this session:
- **Recommendations system V1**: Pool model, two card types (artist/professional), campaign-state headings, admin management panel (`#page-profile` "Your world" card), full `renderRecommendations()` in able-v7.html, backwards-compat migration shim
- **Save toast standardisation**: `saveMerchShopUrl`, `saveSupportMeta`, `saveCloseCircle` now call `showToast('Saved')`. `saveSnapCard` also wired.
- **Admin spacing rhythm**: 36px between all major structural sections (first-run-card, campaign-hq, analytics stats-row and top-actions card)
- **`--dash-t3` WCAG fix**: `#888888` → `#767676` (4.54:1 on white, passes AA). Three hardcoded `#888` instances replaced with `var(--dash-t3)`.
- **Shows sort**: Upcoming shows ascending (soonest first), past shows at end — was reversed descending.
- **Close Circle payments-required state**: Amber notice with "Connect Stripe → (coming soon)" appears when enabled. Matches spec copy exactly.
- **Copy violations**: `able-v7.html` owner bar "Dashboard" → "← Your page"; release empty state "from your dashboard" → "from ABLE". All other P0 violations confirmed already fixed.
- **Doctrine docs created**: `PRODUCT-DOCTRINE.md`, `ARTIST-PROFILE-RECOMMENDATIONS-DOCTRINE.md`, `ORDERING-AND-VISIBILITY-DOCTRINE.md` under `docs/systems/freelancer-auth/`
- **`DESIGN-SPEC.md` §6.12**: Expanded to cover both card types, no-profile state, campaign-aware headings, doctrine pointer
- **`CLAUDE.md`**: Three new doctrine files added to V8 strategy docs table
- **Known issues resolved**: noindex (was already done), "Preview your page →" link (was already wired)

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
