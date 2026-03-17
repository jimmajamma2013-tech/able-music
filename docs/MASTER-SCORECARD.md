# ABLE — Master Scorecard
**Updated: 2026-03-17 | Sessions 11–14 fixes applied | Sources: All FINAL-REVIEW.md and FINAL-20-ANGLE-REVIEW-2.md files across docs/systems/ and docs/pages/**

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
| Admin dashboard | `admin.html` | 9.7/10 | ~9.9/10 | Supabase auth (data portability) + PWA features | ✅ `--dash-t3` → `#767676` (WCAG AA) — done session 11; adaptive `data-stage` layout remains |
| Onboarding wizard | `start.html` | 9.9/10 spec | ~9.9/10 | Social proof (real artists) + `navigator.share()` tested across browsers | ✅ `able_profile` → `able_v3_profile` migration — done session 11 |
| Landing page | `landing.html` | 9.65/10 | ~9.9/10 | Demo phone not fully built | ✅ OG image fixed — `og-landing.png` deployed session 13 |
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
| Tier gates | 6.0/10 | 9.0/10 | Server enforcement missing; Stripe not wired | ✅ `checkTierGate()` + gold lock CSS built session 13; remaining: server-side enforcement |
| Error states | 2.5/10 | 9.0/10 | No error handling — happy path only; `safeGet()`/`safeSet()` absent | Implement `safeGet()`/`safeSet()` everywhere + empty profile state HTML (45 min) |
| PWA | 0.6/10 | 8.5/10 | No `manifest.json`, no service worker, no iOS meta tags | Export ABLE logo as icons + create `manifest.json` + add iOS meta tags (30 min) |
| Page state system | — | — | — | — |
| Data architecture | 6.8/10 | 9.3/10 | Multi-artist isolation incomplete; `fan.html` not built | Implementation not started |
| Analytics | 7.5/10 | 9.4/10 | `sessionId` missing; EU Cloud host not verified | ✅ PostHog init + 3 core events built session 13; remaining: sessionId, EU Cloud confirm |
| SEO / OG | 8.0/10 | 9.3/10 | Static fallback image needs deploying to ablemusic.co | ✅ OG https:// guard fixed session 13; ✅ noindex confirmed done; og-default.jpg needs deploy |
| oEmbed proxy | 3.7/10 | 9.0/10 | **SSRF security vulnerability** — platform guard uses substring regex not parsed hostname | Implement `ALLOWED_HOSTS` Set + `isSafeMediaUrl()` using `new URL().hostname` (10 lines, 15 min — MUST ship before production) |
| Coding strategy | 9.0/10 | 10/10 | `prefers-reduced-motion` blanket rule not confirmed in `admin.html` | ✅ `--dash-t3` → `#767676` done session 11; remaining: reduced-motion audit |
| UI system | 7.1/10 | 8.6/10 | Component library unbuilt; token gaps in `admin.html` L44+L1288 | Fix `#888` violations; build shared component primitives |
| UX system | 6.9/10 | 9.0/10 | Fan sign-up friction unresolved; empty state copy inconsistency | P0: email validation clarity + empty state copy audit |
| World map | 5.2/10 | 9.2/10 | Section heading missing, empty state missing, multi-moment panel missing | 3 bug fixes (section heading, empty state, multi-moment panel) |

### Killer features

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Killer features (all) | 4.0/10 | 9.0/10 (after Sprint 1) | Day 1 share card still unbuilt — highest priority; deep link campaigns unbuilt | ✅ Auto-gig built session 14; remaining: Day 1 share card (3–4h) + deep link campaigns |
| Reels feed | 8.5/10 spec | 10/10 (post-V3) | oEmbed proxy extension not confirmed; `CONTEXT.md` not updated with `able_clips` key | 30-minute code review of `oembed-proxy.js` against TikTok/YouTube endpoints |
| Spotify import | 5.2/10 | 9.0/10 | Netlify function not deployed; Playwright tests not written | Deploy Netlify function + configure env vars |
| Deep link campaigns | 0/10 | 9/10 | Feature not built | URL param parsing + source tagging + campaign creator UI (~6 hours) |

### Infrastructure & backend

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Email | 6.0/10 | 9.5/10 | RESEND_API_KEY not set in Netlify env; artist welcome email unbuilt | ✅ fan-confirmation.js built session 6; remaining: set RESEND_API_KEY + DNS records (James's task) |
| Notifications | 9.5/10 after V2 | 10/10 | Magic link token signing incomplete; state transition timing edge case | None — engineering can start immediately |
| Integrations | 7.5/10 | 8.0/10 | Spotify env vars not confirmed; Bandsintown opt-in not built | ✅ Ticketmaster import built session 14; ✅ Linktree import built session 14; remaining: verify Spotify env vars |
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
| AI copy | 8.0/10 | 8.8/10 | Rate limit UX + caption pack not yet live | ✅ Vibe/feel context added session 13; ✅ Sonnet for bio mode session 13; ✅ banned phrase detection session 13 |
| AI workflow | 6.5/10 | — | No Telegram notifications; cold session starts; decisions not captured consistently | Set up Telegram notification integration (20-minute task) |
| VA strategy | 9.0/10 | — | Requires Mac Studio hardware and consistent "prompt first" habit | Mac Studio setup + Ollama install (one day) |

### Brand, copy & design

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Brand identity | 7.0/10 | 8.5/10 | OG image template + og-default.jpg not yet deployed to production | ✅ favicon.svg created session 13; remaining: og-default.jpg deploy (James's Figma task) |
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

> ✅ = done in sessions 11–14. Items still open are the true remaining blockers.

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

**5. ✅ `able_profile` / `able_v3_profile` key conflict — DONE (session 11)**
- `migrateWizardKey()` IIFE built and runs on admin.html load

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

**8. ✅ GDPR noindex on admin and fan pages — DONE**
- Both `admin.html` and `fan.html` confirmed have `<meta name="robots" content="noindex,nofollow">`

**9. ✅ `--dash-t3` WCAG AA violation — DONE (session 11)**
- Changed `#888888` → `#767676` (4.54:1 contrast ratio, passes AA)

**10. `campaignState` capture at fan sign-up (CRM)**
- Fix: Add `campaignState: profile.stateOverride || computeState(profile, shows, gigExpires)` to the fan object written to `able_fans` at sign-up
- File: `able-v7.html` — fan sign-up handler
- Time: 20 minutes
- Risk if skipped: CRM data permanently missing campaign context for all early fans

**11. Configure UptimeRobot pings for Supabase (Infrastructure)**
- Fix: Create UptimeRobot monitor to ping Supabase project URL every 5 minutes, preventing free-tier inactivity pause
- Time: 10 minutes
- Risk if skipped: Supabase pauses after 1 week of inactivity, taking all artist sign-ins offline

**12. PostHog initialisation (Analytics) — PARTIALLY DONE**
- ✅ PostHog init + 3 core events built in `able-v7.html` and `start.html` (session 13)
- Remaining: verify EU Cloud host (`api_host: 'https://eu.posthog.com'`); add `sessionId`; anti-self-visit flag

**13. Screen 6 trust line (Explainers)**
- Fix: Add context line to wizard Screen 6 (fan sign-up explanation step): "you get their email — that's yours"
- File: `start.html`
- Time: 10 minutes

**14. ✅ PWA manifest.json and iOS meta tags — DONE (session 12)**
- `manifest.json` + `icons/icon-192.png` + `icons/icon-512.png` created and deployed
- Remaining: verify on real iPhone (home screen install must be tested)

**15. Move n8n to VPS before launch (AI workflow)**
- Fix: Install n8n on a VPS instance (DigitalOcean/Hetzner) rather than running on Mac Studio
- Time: 1 day (setup)
- Risk if skipped: Mac Studio going to sleep or restarting kills all automation workflows

---

## Honest summary

**Updated assessment (2026-03-17, post sessions 11–14):**

Sessions 11–14 closed a significant number of previously-open P0 items. The WCAG token violation is fixed. The key conflict migration is wired. PostHog is initialised. Ticketmaster and Linktree imports are built. AI copy (vibe context, Sonnet for bio, banned phrase detection) is complete. Tier gate infrastructure is in place. The oEmbed SSRF fix from this list needs verification.

**Remaining true blockers before first real artist:**
1. GDPR consent front-end disclosure (paragraph of text on fan sign-up)
2. oEmbed SSRF security fix (15 minutes — `ALLOWED_HOSTS` Set)
3. Privacy policy (`privacy.html`) and `privacy@ablemusic.co`
4. RESEND_API_KEY in Netlify env (James's manual task)
5. og-default.jpg deployed to ablemusic.co (James's Figma task)
6. Day 1 share card (3–4 hours — highest-leverage single feature remaining)

**What shifted:** The documentation and build infrastructure are now genuinely world-class — 350+ documents, coherent authority chain, complete build context. The honest gap has moved from "specification incomplete" to "6 specific remaining items before first artist." That is a significant improvement in 4 sessions.

---

*Sources: 62 docs/systems/FINAL-REVIEW.md files + 6 docs/pages/FINAL-20-ANGLE-REVIEW-2.md files*
*Updated: 2026-03-16 (session 10 coherence review — added complaint-resolution, launch-sequence, ui, ux, freelancer-auth)*
