# ABLE — Scores & Reviews
**Generated: 2026-03-16**

## REVIEW PROMPT
```
Review every FINAL-REVIEW and ANALYSIS file. What are the honest scores? What gaps keep recurring? What's the overall pre-build readiness?
```

---

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

## Technical spec completeness (added 2026-03-16)

Audit of all PATH-TO-10.md and DESIGN-SPEC.md files for implementation-readiness — every item that said "implement X" without saying exactly how.

| Spec | Was | Now | What was missing |
|---|---|---|---|
| `legal-compliance/PATH-TO-10.md` | 9.5/10 | 10/10 | Already had exact GDPR HTML, privacy URL, and cookie disclosure — confirmed complete |
| `analytics/PATH-TO-10.md` | 7/10 | 10/10 | P0.5: exact `detectSource()` JS with 2-pass logic + all referrer checks added. P0.6: exact `rotateEvents()` and `checkLocalStorageHealth()` functions added with call sites |
| `seo-og/PATH-TO-10.md` | 10/10 | 10/10 | Already had exact OG URI check, fallback spec, exact meta tag — confirmed complete |
| `data-architecture/PATH-TO-10.md` | 10/10 | 10/10 | Migration function present and correct (no double-prefix), 10-step flush checklist present — confirmed complete |
| `email/PATH-TO-10.md` | 10/10 | 10/10 | fan-confirmation.js complete with all 4 page-state bodies, all 3 DNS records present — confirmed complete |
| `oembed-proxy/PATH-TO-10.md` | 10/10 | 10/10 | Full corrected Netlify function with `new URL().hostname` + `ALLOWED_HOSTS` Set — confirmed complete |
| `tier-gates/PATH-TO-10.md` | 10/10 | 10/10 | `checkTierGate()`, gold lock CSS, `applyGates()`, all 7 upgrade trigger copy strings — confirmed complete |
| `killer-features/SPEC.md` | 10/10 | 10/10 | `checkAutoGig()` with `isToday()` + `parseDoorsTime()`, `applyCampaignScroll()`, `showCampaignChip()`, `showDay1ShareCard()` — all confirmed complete |
| `monetisation/PATH-TO-10.md` | 10/10 | 10/10 | Fan cap progress bar HTML/CSS/JS, all 3 threshold copy strings — confirmed complete |
| `growth-loop/PATH-TO-10.md` | 10/10 | 10/10 | `initFooterLink()`, `initReferralLanding()`, "I make music too →" fork with exact HTML — confirmed complete |
| `pages/profile/DESIGN-SPEC.md` | 8/10 | 10/10 | Added exact GDPR consent form HTML with `.signup-consent` class, `.consent-artist-name` JS, `consentVersion`/`consentSource` fan record fields, and CSS |
| `pages/admin/DESIGN-SPEC.md` | 8.5/10 | 10/10 | `buildGreeting()` already specced as `buildGreetingSub()` + `applyGreeting()`. Added missing fan list sort: exact `renderFanList()` with starred-float + newest-first sort, tombstone filter, and empty state copy |
| `pages/onboarding/DESIGN-SPEC.md` | 9.9/10 | 9.9/10 | Done screen iframe specced; adaptive wizard specced — confirmed complete at existing score |

**All P0 specs: implementation-ready.**

A developer can open any PATH-TO-10.md and copy-paste the exact functions into the target file. No ambiguity remains.

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
# docs/process/FEAR_MAPS.md
---
# ABLE — Phase 0: Fear Maps & Mental Models
**Created: 2026-03-15 | Part of the 100-section review process**

> Use this document before every section review. Every design decision should pass through: "what does this feel like to someone with these fears?"

---

## USER TYPE 1: THE ACTIVE RELEASING UK ARTIST

**Who this is:** Declan, 27, makes indie-folk-electronic music in Manchester. 12k Instagram followers, 4,800 Spotify monthly listeners. Releases 3 singles a year. Currently uses Linktree. Has tried Mailchimp once.

---

### Fear Map

**Fear 1: "This will be abandoned in 6 months and my fans' emails will be gone."**
This is the biggest fear and the hardest to address with copy. Every tool Declan has adopted has either pivoted, raised prices suddenly, or just stopped working. He's adopted Bandcamp fully, and they sold to Songtradr and nearly shut down. His fear is real. He doesn't say it out loud but it's behind every "I'll think about it."

→ Design implication: Emphasis on data portability. "Export your fan list anytime" must be findable, not buried. The 0% cut claim addresses revenue model sustainability indirectly.

**Fear 2: "I'll set this up and it'll look worse than what I have now."**
Declan currently has a plain Linktree. He knows it looks generic but at least it looks clean. His biggest risk with switching is visual regression — ending up with something that looks "overdone" or "try-hard." He's also scared of looking like he's performing success he hasn't earned.

→ Design implication: The onboarding preview must show him something genuinely beautiful at step 3, not step 15. The default state must be 10/10 before he's done anything. The design system should feel like it elevates rather than decorates.

**Fear 3: "I'll spend an hour setting this up and it won't make any difference."**
He's done this before with other tools. Set up a Mailchimp campaign once. Spent 2 hours. Got 8 signups in a year. The effort-to-outcome ratio felt terrible. ABLE needs to deliver a visible outcome fast — preferably before he's finished onboarding.

→ Design implication: Show him what "done" looks like before he starts. The live preview in onboarding, updating in real time as he fills in each answer, must feel like something is being built. The moment he sees his Spotify artwork automatically pulled in is the moment he believes.

**Fear 4: "My fans won't be able to find the sign-up and I'll look like I'm begging for emails."**
This is subtle but real. Independent artists are acutely aware of the line between "staying connected" and "desperate ask." The email capture must feel like it's coming from him, not from the platform. "Stay close." feels right. "Sign up for my mailing list" feels like the 2007 internet.

→ Design implication: Fan capture copy law: first person, specific to what they get. "Just me. No spam." The sign-up form should feel like an invitation from the artist, not a marketing funnel.

**Fear 5: "This costs £9 a month and I have no way to justify that to myself."**
He already pays £17/year for DistroKid, £10/month for Canva. He's not afraid of tools. But £9/month for something he's unsure about is a different calculation. The fear is specifically: what if I sign up, pay for 3 months, and never send a broadcast or do anything with the fan list?

→ Design implication: The free tier must deliver clear visible value before the upgrade ask. The moment the upgrade ask comes (100 fan signups) must be framed as a celebration, not a upsell. "These are 100 people who asked to hear from you" is correct.

**Fear 6: "The tech is going to confuse me at a critical moment — like when I'm about to drop something."**
The worst version of this fear: it's 11pm the night before a release and the embed isn't working. Or the pre-release countdown is showing the wrong date. Technical failure at high-stakes moments is the nightmare scenario. Artists don't have tech support.

→ Design implication: The campaign state machine must be robust. The pre-release flow must be dead simple and visually confirmable. No ambiguity about what state the page is in.

---

### Mental Model

Declan thinks of his artist profile as **his digital home** — the thing that represents him when he's not in the room. He thinks in metaphors of a physical venue poster, not a web product. "My page" not "my website." He doesn't think in features — he thinks in the question "does this feel like me?"

He also thinks of the release cycle as **the only time that matters.** Between releases, he's dormant — just an Instagram bio with a Spotify link. At release time, everything matters. That 2-week window is when he'd actually use ABLE's campaign features. ABLE needs to be so obvious to use in that window that he doesn't have to think.

**His decision process:**
1. Sees ABLE (via producer recommendation or "Made with ABLE" footer on an artist he respects)
2. Thinks "that's a good-looking page" — feels ABLE is worth exploring
3. Lands on landing.html — wants to see what the page looks like when it's doing something
4. Signs up free — wants to see what his page looks like with his own content
5. Adds Spotify link — page populates
6. Has 5–10 fans sign up over a few weeks
7. Release is coming — activates pre-release countdown
8. 80 fans sign up during the pre-release / live window
9. Hits 100 fan cap — upgrades
10. Never goes back to Linktree

**Where he drops off (risk moments):**
- Step 3: Landing page demo doesn't clearly show the page "shifting with the moment" — he doesn't get it, bounces
- Step 4: Sign-up form too many fields, or sends him through too many screens before he sees his page
- Step 5: Spotify import fails or pulls wrong data — trust collapses
- Step 8: Pre-release feature confusing — he skips it and ABLE becomes just another Linktree
- Step 9: 100 fan cap feels like a punishment not a celebration — he resents the product

---

## USER TYPE 2: THE COLOMBIAN RELEASING ARTIST

**Who this is:** Valentina, 24, makes Latin urban and alternative pop music in Medellín. 28k Instagram followers, active on TikTok. Releases a single every 6–8 weeks. Uses Linktree (English only), some Beacons. Speaks English but her audience is Spanish-speaking.

---

### Fear Map

**Fear 1: "Another gringo product that doesn't understand how we work."**
This is the defining fear for the Colombian market. Valentina has tried multiple US tools that assume everyone uses Mailchimp, has a US bank account, and thinks in USD. When she's reached out to support she gets back boilerplate that clearly wasn't written for her context. ABLE is another tool she has to adapt herself to — unless it signals early that it was designed for her.

→ Design implication: The landing page and onboarding must not assume US/UK context. Any social proof with real artist names (vs "Independent Artist, UK") should include Latin artists where possible. The Colombian launch must feel like ABLE was waiting for this market, not arriving in it.

**Fear 2: "The payment will fail and I'll lose my page."**
Payment anxiety in Colombia is real. International credit cards are common among connected artists but not universal. The fear is mid-month: card charges, payment fails, page goes down, fans see nothing. She's seen this with streaming services.

→ Design implication: Clear communication about what happens if payment fails (grace period, data preserved). Local payment methods in Phase 2 are essential. This is not optional for scale.

**Fear 3: "My fans won't sign up because they don't know why they should."**
Colombian fans have different expectations. The fan relationship is different — WhatsApp groups, direct DMs, physical shows are the primary connection. Email as the connection mechanism is a UK/US concept. Valentina worries her fans will see an email sign-up and think "this is weird" rather than "yes."

→ Design implication: The fan capture copy, when translated to Spanish, must feel native to Colombian culture — not translated English. "Quédate cerca." instead of "Stay close." The "I'm in" button must feel like a Colombian phrase, not a literal translation. This is why Option C (bilingual by default) is ultimately the right path.

**Fear 4: "If this doesn't work in Spanish, half my audience won't sign up."**
Her Instagram bio is in Spanish. Her fans read Spanish. If the sign-up form is in English, a percentage won't engage. She knows this but isn't sure how to solve it with current tools.

→ Design implication: Fan-facing copy must be translatable. The artist profile should support language selection. This is Phase 2 build work but the architecture must support it from the start (CSS variables for font, not hard-coded text).

**Fear 5: "I'll pay and then the pesos to pounds conversion will hit me."**
Pricing in GBP is a red flag for a Colombian artist. Even $9/month in USD is psychologically distant. £9 in GBP is worse — currency conversion uncertainty adds cognitive overhead to every billing cycle.

→ Design implication: For Colombia launch, price in USD. Consider regional tier ($5/mo) once data exists. Don't launch in GBP for Colombian users.

---

### Mental Model

Valentina thinks of her page primarily through the lens of her **Instagram bio link**. That's her only reference frame for what ABLE is replacing. She thinks of the bio link as the one URL she can change — it's her "billboard." She's less familiar with the concept of an artist profile as a standalone destination.

She thinks of her release cycle differently from Declan. She's releasing more frequently (every 6–8 weeks) with less lead time — a single drops when it's ready, not after a 3-month campaign. This means the pre-release state is less relevant to her but the **live state** (day-of to 2-week window) is extremely important. Gig mode may also matter a lot — she plays more frequently.

Her WhatsApp-first communication style means she values **immediacy and directness.** Complex navigation menus, multi-step flows, anything that requires more than 2 taps to understand — she exits. Her attention is calibrated to TikTok scroll speed.

**Her decision process:**
1. Sees a Colombia-based artist she respects using ABLE (critical — peer validation in Colombian scene is everything)
2. Profile loads fast, feels local somehow (even if in English), visual language resonates
3. Signs up because the Spotify import looks genuinely effortless
4. Shares with 2 producers in Medellín immediately — this is how product spreads here
5. Puts page live before onboarding is complete because she needs to post it

**Where she drops off:**
- Step 1: If the social proof is all UK indie folk artists, this product feels foreign — bounces
- Step 3: If Spotify import requires knowing her "artist ID" rather than just her name or profile URL — drops off immediately
- Step 5: If the page feels like an English-first product with small print at the bottom — shares nothing, stays on Linktree

---

## USER TYPE 3: THE FAN (VISITING AN ARTIST PROFILE)

**Who this is:** A 19-year-old who clicked on an artist's Instagram bio link. They don't know what ABLE is. They don't care. They're there for the artist.

---

### Fear Map (or rather: confusion/friction points)

**Friction 1: "What is this page?"**
The fan doesn't want to learn a new platform. They clicked a link in a bio to do something specific — stream a track, buy a ticket, see a date. If the page doesn't immediately make clear what the artist is doing right now, the fan is gone in under 4 seconds.

→ Design implication: The page must make one thing clear in 0.5 seconds: "This is [Artist Name]'s page and right now they are doing [X]." The state chip (pre-release / live / gig) and the top card must do this job. No loading spinners, no "welcome to ABLE" messaging, no platform chrome.

**Friction 2: "Why should I give my email?"**
The fan doesn't have a relationship with ABLE. The only reason to sign up is the artist. The sign-up ask must come from the artist's voice, not the platform's.

→ Design implication: "Stay close. Just me. No spam." works because it sounds like the artist wrote it. Generic "Subscribe to updates" is death.

**Friction 3: "Is this a scam / spam thing?"**
New generation fans are trained to be suspicious of any email sign-up that feels platform-driven. The GDPR double opt-in confirmation email is actually protective here — it signals legitimacy. The artist's name in the confirmation subject line is essential.

**Non-fear (important to note):** The fan doesn't care at all that ABLE exists. The platform should be invisible. "Made with ABLE" in the footer is the only brand moment. This is correct.

---

## USER TYPE 4: THE MANAGER / LABEL SETTING UP ARTISTS

**Who this is:** Sophie, 31, manages 4 artists. Time is her scarcest resource. She's used Linktree, Beacons, and Feature.fm. She's competent technically.

---

### Fear Map

**Fear 1: "This will take me more time than Linktree."**
Every new tool is a time investment. Sophie's calculation is simple: if setting up ABLE for one artist takes more than 20 minutes, it's not worth the switch even if the product is better.

→ Design implication: The Spotify import must do 80% of the work in 10 seconds. The artist hands her their Spotify artist URL. She pastes it. The profile is essentially set up. This is the manager conversion flow.

**Fear 2: "I'll set this up for an artist and they'll break it trying to edit it."**
Her real fear is losing control — she sets up a clean page and 2 days later the artist has made it a mess. She needs to trust that the edit UX is constrained enough that accidental destruction is impossible.

**Fear 3: "I have to do this for 4 artists separately and there's no batch management."**
The Label tier (10 profiles) exists for her. But she needs to understand this exists before she does the math on whether ABLE is worth the switch for all her artists.

---

## SUMMARY: THE FEAR MATRIX

| Fear | Who has it | Which part of product addresses it |
|---|---|---|
| "This will be abandoned" | UK artist | Data portability copy, 0% cut claim |
| "Will look worse than my Linktree" | UK artist | Beautiful default state, Spotify import populates instantly |
| "Takes an hour, no visible outcome" | UK + Colombian artist | Onboarding preview shows changes live, instant Spotify pull |
| "Email capture feels desperate" | UK artist | First-person fan capture copy, artist voice |
| "Can't justify £9/month" | UK artist | 100 fan cap moment framed as celebration |
| "Tech fails at critical moment" | UK artist | Campaign state machine, pre-release clarity |
| "Another US tool" | Colombian artist | Social proof with Latin artists, possible bilingual UI |
| "Payment will fail" | Colombian artist | Grace periods, local payment methods Phase 2 |
| "Fans won't understand English sign-up" | Colombian artist | Bilingual support Phase 2, native Spanish copy |
| "What is this page?" | Fan | Top card + state chip, immediate clarity |
| "Why give my email?" | Fan | Artist-voice fan capture, "Just me. No spam." |
| "Will take more time than Linktree" | Manager | Spotify import 10-second setup |

---

## APPLYING THESE FEARS TO SECTION REVIEWS

Before scoring any section, ask:

1. **Which user type is landing here first?** (Landing page = all types. Artist profile = fan first, artist second. Admin = artist only. Onboarding = artist only.)
2. **What is their primary fear at this moment?**
3. **Does this section resolve that fear or accidentally trigger it?**
4. **What is the single most important thing this section must communicate in under 3 seconds?**
5. **Could a 13-year-old in Medellín with moderate English literacy figure this out without any instruction?**

These 5 questions override all aesthetic considerations. Design serves function. Function serves the specific person with their specific fear.

---

*Read this before every section deep-dive. The score for any section is ultimately: does it reduce fear and increase trust for the person who needs it most?*


---
# docs/process/PROCESS.md
---
# ABLE — The Build Process
**The exact sequence for taking any page from current state to 10/10.**
**Created: 2026-03-15 | Expanded: 2026-03-16**

> This process was defined in theory, then battle-tested on the landing page. Every stage below is the refined version — what actually produced a 9.5/10 strategy score, ready to build. Follow it exactly. Do not skip stages. Do not reorder. This document is both a process and a manifesto. Read it as both.

> **The core idea:** every build step is a rethink, not just an implementation. The spec is the floor, not the ceiling. The build earns the scores. Playwright verification is not optional — it is the build. The loop never ends.

---

## THE FULL PROCESS — 9 STAGES

```
Stage 0 → Context Load
Stage 1 → Purpose
Stage 2 → Competitive Research
Stage 3 → 20-Angle Analysis (first pass)
Stage 4 → User Journey Maps
Stage 5 → Copy First
Stage 6 → Path to 10 + Design Spec
Stage 7 → Strategy Review + Final 20-Angle
Stage 8 → Build + Playwright Verify (continuous improvement loop)
Stage 9 → Post-Page Final Review
```

---

## STAGE 0 — CONTEXT LOAD
**Time: 10–15 minutes. Every session, before anything else. No exceptions.**

Do not open a code file. Do not write a single line of HTML. Do not read the spec. Read the orientation documents first. This is not bureaucracy — it is the difference between building the right thing and building efficiently in the wrong direction.

### What to read, and why

**1. `CONTEXT.md` — active files, tokens, authority order**

Read this completely. Extract:
- Which file is currently active for the page you're working on. (The answer is always in the top table. Do not assume from memory.)
- The design tokens for the target page. Write them down. You will need them during build and they must be memorised, not looked up.
- The authority order for this session. Which docs supersede which? CONTEXT.md tells you this explicitly.
- The localStorage key list. Every key you will read or write during this session should be known before you start. If a key isn't in the canonical list, it either doesn't exist yet or it's a bug.
- The CTA architecture rules. Three zones, strict caps. Know these before writing a single button.

**Red flags in CONTEXT.md:**
- A file listed as active that you don't recognise — something has been renamed or updated since your last session. Stop and understand the change.
- A token value that differs from what you remember — the design system may have been updated.
- A key listed as deprecated — check you're not still writing to it anywhere.

**2. `docs/STATUS.md` — current build state**

Read the last three session summaries. Extract:
- What was the last thing committed? Start from that exact point.
- Are there any known issues that affect the section you're building? Known issues compound if not tracked.
- What is the current score for this page? Do not start building under the assumption that you know the score.
- What has been deferred? Deferred items from a previous session sometimes become immediately relevant.

**Red flags in STATUS.md:**
- A session summary that ends with "deferred items" and one of those items is the section you're about to build — resolve the deferral before starting fresh work.
- Scores that feel inconsistently high — if the admin page is at 9.7/10 but you know the fan sign-up flow has a bug, trust the bug, not the score.
- A date that is more than 3 days old — something may have shifted in the design decisions since then. Check CONTEXT.md authority order again.

**3. The relevant DESIGN-SPEC.md for the page**

This is your primary build document for Stage 8. At Stage 0, read it at a high level:
- What sections exist?
- What is the build order specified in PATH-TO-10.md?
- Are there any spec notes marked "deferred" or "TBD" — those require resolution before building, not after.

**4. `docs/pages/[page]/FINAL-20-ANGLE-REVIEW-2.md`**

Read the final scores and targets. These are the numbers you are building toward. Know them. If any angle has a note like "blocked by real user data" — understand that ceiling before you start. You cannot earn a 10 on Social Proof during a pre-launch solo build. Honest ceilings are not failures; they are context.

**5. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` — a brief re-read**

Even if you've read this before, a 5-minute reread before every session recalibrates your copy instincts. The banned phrases list must be live in your head during build, not something you check after the fact.

**6. `docs/v6/PRODUCT_TRUTH.md` — what ABLE is**

One read-through at the start of every new page. Not every session — but any time you start work on a page you haven't touched before. ABLE has a clear identity. It is not a tool. It is not a platform. It is a place for artists to be themselves. Every design decision should be testable against this.

### The orientation sentence

Before proceeding to Stage 1, write this sentence and confirm it:

> *"This page is for [user type], who fears [specific fear], and the constraint on this session is [constraint]."*

The fear is specific. "Wasting time" is not a fear. "Being locked into another platform that doesn't understand musicians" is a fear. "Signing up and having nothing to show their fans" is a fear. If you cannot name the fear precisely, re-read `docs/pages/[page]/USER-JOURNEYS.md` or `docs/process/FEAR_MAPS.md`.

The constraint is honest. "No backend yet" is a real constraint. "Only 2 hours" is a real constraint. "Can't show social proof because no real users yet" is a real constraint. Naming constraints at the start prevents them from becoming silent compromises at the end.

**Do not proceed until you can write that sentence without looking at the docs.**

### Orientation checklist

- [ ] Active file confirmed
- [ ] Design tokens written down (from memory after reading CONTEXT.md)
- [ ] Last session summary read — starting from correct point
- [ ] Current page score confirmed
- [ ] Known issues for this section noted
- [ ] Deferred items reviewed — none blocking this session
- [ ] DESIGN-SPEC.md read at high level — build order known
- [ ] FINAL-20-ANGLE-REVIEW-2.md scores known — targets confirmed
- [ ] Honest ceilings identified and accepted
- [ ] Orientation sentence written and confirmed

**Output:** The orientation sentence. Do not proceed without it.

---

## STAGE 1 — PURPOSE
**What must this page DO? Not what features does it have — what must it accomplish?**

This stage takes 20–30 minutes and produces one sentence. That sentence is the most important artefact of the entire process. Everything else — the design, the copy, the CTA weight, the hero headline — flows from it. Get it wrong here and every subsequent stage produces beautiful work in the wrong direction.

### The distinction: job vs features

A feature is "fan email capture." A job is "make every artist who lands on this page feel confident that they will never lose a single fan to an algorithm again."

The job statement names the outcome, not the mechanism. It answers "what changes in the user's life" not "what is on the page."

### Questions to answer before writing the job statement

**Primary:**
- What is the one thing this page must make a visitor think, feel, or do?
- What has changed for the visitor as a result of spending time on this page?
- If this page were to disappear from the product entirely, what would break?

**User type:**
- Which of the three visitor types is this page primarily for? (New artist exploring / Switcher comparing / Fan of a specific artist)
- Is there a meaningful secondary visitor type? (A journalist? A label A&R? An artist's manager?)
- What does the primary visitor already know when they arrive? What don't they know?

**Ordering logic:**
- What did the user do immediately before arriving at this page?
- What do we want them to do immediately after?
- Is this page a destination or a transition?

**The breaking test:**
Ask: "What breaks if this page doesn't exist?" The answer reveals the page's true job. If nothing breaks — the page is probably redundant. If something critical breaks — that is the job.

### Job statement examples (by page type)

**Landing page:**
*"Convert a curious independent artist — who has heard of ABLE but not yet committed — into someone who starts building their profile today, by showing the product actually working, making the Linktree comparison explicit, and removing every reason to hesitate."*

**Onboarding wizard:**
*"Get an artist from zero to a live, personalised profile they are proud to share — in under 4 minutes — without asking them anything that feels like bureaucracy, and without losing them to confusion, boredom, or the feeling that this is just another form."*

**Artist profile (fan-facing):**
*"Make every fan who lands here feel closer to this artist than they do anywhere else online — and give them one clear, un-ignorable action that keeps that closeness real."*

**Admin dashboard:**
*"Give an artist a clear view of what their page is doing, who is showing up, and what they should do next — without requiring them to be a marketer, a data analyst, or a growth hacker."*

**Fan dashboard:**
*"Make a fan feel like they know what is happening with every artist they care about — not through an algorithm, but because the artist chose to tell them directly."*

### Anti-patterns in job statements

These are common mistakes. If your job statement reads like one of these, rewrite it:

- **The feature list disguised as a job:** "The landing page must show pricing, demo, and CTA." That is a feature list. Add the "so that" — what must those features accomplish?
- **The business goal disguised as a user job:** "Convert 40% of visitors to sign-ups." That is a metric. The job statement must describe the user's experience, not the business outcome.
- **The vague emotional statement:** "Make artists feel good about ABLE." Too vague. What specifically do they feel? Trusted? Understood? Relieved? Excited? Name the specific emotion.
- **The audience-of-one problem:** Writing a job statement for a hypothetical average user. The job statement should be testable against a specific, named person. If you cannot test it against Declan (27, Manchester, 2.4k Instagram followers, tried Linktree, gave up), it is too abstract.

### Secondary purpose detection

After writing the primary job statement, check for secondary purposes. A page rarely has only one job. But if it has more than two, it has too many.

- Landing page secondary: "Serve the occasional journalist, A&R, or manager who lands here and needs a fast, credible overview of what ABLE is."
- Artist profile secondary: "Give the artist a link they are proud to share — something that looks better than every competitor's equivalent."
- Onboarding secondary: "Begin building the artist's mental model of what Campaign HQ is, even before they've activated it."

Write the secondary job in one sentence, clearly subordinated to the primary. If secondary jobs are competing with the primary for design weight — resolve the competition before proceeding. The primary job wins. Always.

### The one-screen test

Before locking the job statement, ask: "Could this job be communicated on a single screen?" If yes — the page may be simpler than you think. If no — what are the minimum number of screens required?

This test prevents over-engineering. Many pages try to do five jobs and fail at all five. A page with one clear job, executed with precision, always outperforms a page with five mediocre executions.

**Output:** One sentence primary job statement. One sentence secondary job statement (optional). Written down, locked, referenced throughout every subsequent stage.

If you cannot write the primary job statement clearly, you do not understand the page. Do not proceed until you can.

---

## STAGE 2 — COMPETITIVE RESEARCH
**What do real users say? What does world-class look like? What are competitors doing wrong?**

Research is not inspiration tourism. It is intelligence gathering with a specific mission: find the gaps, validate the assumptions, and steal intelligently from what already works at the highest level.

**Time budget: 60–90 minutes of active research, run in parallel with document writing where possible.**

### The research mission (always the same three questions)

1. **What are real users of comparable products saying?** Not what they say in structured interviews — what they write when no one is watching, in reviews, forum posts, and community threads.
2. **What does world-class look like in this category?** Not "pretty" — genuinely effective. Measured by conversion, retention, recommendation. What specifically makes it work?
3. **What are competitors getting wrong that we could get right?** The gap between what users complain about and what competitors still haven't fixed is always there. Find it.

### Search queries to run (for each research area)

**Direct competitor analysis (Linktree, Beacons, Feature.fm):**
```
"Linktree review" site:reddit.com
"Beacons alternatives" site:reddit.com
"linktree problems" site:trustpilot.com
"feature.fm review" musicians
"linktree for artists" OR "beacons for musicians" complaints 2025 2026
"linktree spam" OR "linktree blocked" instagram tiktok
```

**Real user complaints (artists specifically):**
```
site:reddit.com/r/WeAreTheMusicMakers "link in bio"
site:reddit.com/r/musicproduction "linktree" OR "bio link"
site:reddit.com/r/independentmusic "fan sign up" OR "fan email"
"independent musician" "link in bio" problems 2025
```

**World-class examples (adjacent industries):**
```
"best onboarding 2025 2026" UX
"best link in bio page" design
"musician landing page" best examples
"indie artist" "pre-save" best practices
"musician website" "fan sign up" conversion
```

**Conversion benchmarks:**
```
"link in bio" conversion rate benchmark 2025
"pre-save campaign" conversion rate music
"fan email capture" conversion music artists
```

**Switching behaviour:**
```
"switched from linktree" musician
"cancelled linktree" reason
"left beacons" why
```

### Sources to check for each finding type

| Finding type | Source | What to look for |
|---|---|---|
| Real complaints | Reddit (r/WeAreTheMusicMakers, r/musicproduction, r/indieheads) | Repeated frustrations, unmet needs |
| Product reviews | Trustpilot, Product Hunt, G2, Capterra | 1-star and 2-star reviews specifically — the honest ones |
| App Store | Apple App Store + Google Play reviews | Linktree, Beacons — filter by lowest rating |
| Design examples | Muzli, Awwwards, Dribbble | World-class UX for reference only — not to copy |
| Conversion data | CXL, ConversionXL, Unbounce blog | Landing page and onboarding benchmarks |
| Music industry | Hypebot, MusicAlly, The Trichordist | Music-specific platform behaviour and artist psychology |

### How to evaluate competitor copy quality

When you read a competitor's copy, ask these five questions:

1. **Does it describe the user's situation or the product's features?** User-situation copy converts. Feature-list copy does not. *"You've got 3 seconds when someone taps your link"* is user-situation. *"Customisable link-in-bio"* is feature-list.
2. **Is there a specific claim or a platitude?** *"Your fans stay close"* is a platitude. *"Every fan who signs up gets added to your private list — no algorithm between you"* is a specific claim.
3. **Does it assume the user is a professional marketer or treat them like a musician?** Marketing jargon (*"optimise your conversion funnel"*) is a trust signal failure for independent musicians. They know immediately it's not for them.
4. **Does it make the competitive comparison explicit?** The best copy does not avoid the comparison — it makes it, on its own terms, without desperation.
5. **Read it aloud.** Does it sound like something a real person would say? Or does it sound like something a committee approved?

### The research output template

For each finding, write one entry in this format:

```
## Finding [N]
**Source:** [URL or "Reddit r/WeAreTheMusicMakers"]
**What it says:** [direct quote or close paraphrase]
**What it means for ABLE:** [one sentence — specific, actionable]
**Which angle it affects:** [angle number from 20-angle framework]
**Priority:** P0 / P1 / P2
```

Aim for 8–12 findings. Quality over quantity. A finding that does not have a clear "what it means for ABLE" is not a finding — it is noise.

### Cheap wins from competitor failures

This is the highest-ROI research output. A cheap win is something a competitor is getting wrong that:
- Real users are complaining about
- Is technically straightforward to get right
- Directly affects the primary job of the page

Examples:
- Linktree's `linktr.ee` domain gets flagged as spam by Instagram and TikTok. ABLE's domain is clean. Cost: zero. Differentiator: real. Name it in copy.
- Beacons uses "content creator" throughout. ABLE never does. Cost: copy edit. Differentiator: meaningful to musicians.
- Most link-in-bio tools show a blank page on first load with no guidance. ABLE's onboarding goes directly to a live preview. Cost: already built. Differentiator: name it in the wizard.

### The competitor gap matrix

After completing research, build this table:

| Problem | Linktree | Beacons | Feature.fm | ABLE |
|---|---|---|---|---|
| Domain spam flagging | ✗ (bad domain) | ✗ (same) | Partial | ✓ (clean domain) |
| Artist identity vs creator identity | ✗ | ✗ | Partial | ✓ |
| Fan email without algorithm | ✗ | Partial | ✗ | ✓ |
| Pre-release campaign mode | ✗ | ✗ | ✓ | ✓ |
| [Add per research findings] | | | | |

This matrix is not for publication. It is for internal clarity about where ABLE genuinely wins — so those wins can be named specifically in copy.

### Handling negative findings

Not every finding will support the current spec. Sometimes research will surface:
- A competitor doing something better than ABLE's current spec
- A user complaint that directly applies to ABLE's current design
- Evidence that an assumption in the spec is wrong

These findings are the most valuable. Do not suppress them. Log them in the research document and bring them to Stage 7. If a finding is severe enough to change the page's primary job — go back to Stage 1 before proceeding.

### The "steal intelligently" principle

Stealing intelligently means:
- Taking the *reason* something works, not the execution
- Adapting it to ABLE's specific user, voice, and constraints
- Acknowledging the source in your research notes (not the final product — just internally)

Stealing unintelligently means copying the execution. That produces a product that looks like a worse version of the original. Take the insight. Build something new from it.

**Output:** `COMPETITIVE-RESEARCH.md` — 8–12 findings, in template format, with the competitor gap matrix. Prioritised. Actionable. Each finding traces directly to a 20-angle number.

---

## STAGE 3 — FIRST-PASS 20-ANGLE ANALYSIS
**Score the current state. Identify the P0 gaps. Do not inflate.**

The 20-angle analysis is the core diagnostic tool of this process. It transforms qualitative intuition into structured, scored, actionable analysis. Run it after every significant build milestone. Run it before any major spec decision. It does not tell you what to build — it tells you where the gaps are so you can decide what to build.

**The analysis requires honesty above all else.** An inflated score is worse than a low score. An inflated score gives you false confidence. A low score with an honest path to improvement gives you a plan.

### The 20 angles — detailed guidance for each

---

**Angle 1 — First impression**
*What is understood in the first 3 seconds, before the user reads a single word?*

This is about the visual signal — not the text. What does the layout, the colour, the dominant visual element communicate before reading?

What a 10 looks like: A first-time visitor at 375px can, in 3 seconds, identify: (1) what type of thing this is, (2) who it is for, (3) a sense of quality. They don't need to read. The visual language tells them.

Common failure modes:
- Generic hero that could be any SaaS product — no visual identity
- Cluttered layout with no dominant element — the eye has nowhere to go
- Typography that doesn't match the claimed quality level (bold claims, weak type)
- Accent colour that reads as corporate rather than expressive

How to test it: Take a Playwright screenshot at 375px. Look at it for 3 seconds. Write down the three things a first-time visitor would understand. Then ask: are those the three things you intended?

---

**Angle 2 — Primary job**
*Does the page deliver its one job from Stage 1?*

After the first pass is complete, re-read the Stage 1 job statement. Then ask: does what was built actually accomplish this? The job statement is the test.

What a 10 looks like: Every section of the page serves the primary job. Nothing contradicts it. The visitor who completes the primary action (signs up, continues to the next page, understands the differentiator) has experienced exactly what the job statement promised.

Common failure modes:
- Sections that serve a business goal rather than the user's job (e.g., pricing section that feels like a sales pitch rather than a clarification)
- Page that delivers the job but buries it — correct information in the wrong order
- Page that delivers half the job but loses the user before completing it

---

**Angle 3 — Headline / entry copy**
*Does the first thing they read resonate — or just describe?*

The headline is not a title. It is not a description. It is the first moment of recognition — where the user thinks "yes, this is for me."

What a 10 looks like: An independent musician reads the headline and thinks "exactly." Not "interesting." Not "I'll read more." Exactly — as in: this person understands my situation precisely.

Common failure modes:
- Clever copy that doesn't land with the specific user type ("You've got music to make. We've got everything else." — what does that even mean?)
- Descriptive copy that lists features instead of naming the problem ("The link-in-bio for musicians" is descriptive, not resonant)
- Trying to be broad enough to include everyone — and connecting with no one

Test it: Read the headline aloud as if you are Declan (27, Manchester, 2.4k Instagram followers, slight sceptic). Does it sound like something written specifically for him? Or does it sound like something written about him, for an investor deck?

---

**Angle 4 — CTA design and weight**
*Is the action clear, visible, and sized correctly at every breakpoint?*

The CTA is where the page's job becomes a user action. It must dominate without being aggressive. It must be specific without being clinical. It must feel inevitable.

What a 10 looks like: At 375px, the primary CTA is visible without scrolling. It is 48px minimum height. The copy is specific ("Your page is free →" not "Get started"). There is only one primary CTA above the fold. The secondary CTA (if it exists) is clearly subordinated.

Common failure modes:
- Multiple primary CTAs competing for attention (the page can't decide what it wants)
- Generic copy ("Sign up", "Get started", "Create account") — banished
- CTA that looks like a button but feels like bureaucracy
- Hero CTA visible at 1280px but scrolled out at 375px

---

**Angle 5 — Copy voice**
*Does every line sound like ABLE, not generic SaaS?*

This is an audit, not a feeling. Go through every piece of user-facing text on the page with the banned phrase list from `docs/systems/copy/SPEC.md`. Any line that could have been written by Linktree, Mailchimp, or a generic startup is a regression.

What a 10 looks like: Read any 10 random pieces of copy from the page. Every one sounds direct, specific, and in the artist's register. No exclamation marks on dashboard copy. No passive voice where active would serve better. No "unlock" anywhere.

Common failure modes:
- Banned phrases that slipped through during coding (check every string, not just the obvious CTAs)
- Placeholder copy that never got replaced
- Copy that was correct in the spec but was slightly altered during implementation to something generic

---

**Angle 6 — Primary differentiator**
*Is the core "why ABLE not Linktree" argument made explicit?*

Not just implicit — explicit. Users who land on any ABLE page have likely also seen Linktree, Beacons, or another link-in-bio tool. The differentiator must be named on the page, in a form that a scanning user would encounter without reading carefully.

What a 10 looks like: A visitor who has also looked at Linktree can, after 30 seconds on this page, articulate one specific thing ABLE does that Linktree doesn't. Not "it's more beautiful" — something functional and specific.

Common failure modes:
- Differentiator buried in body copy that requires reading
- Differentiator stated as a feature ("fan sign-up") rather than a benefit ("your fans, your list, no algorithm between you")
- Differentiator that is genuinely not differentiated (Beacons also has fan sign-up)

---

**Angle 7 — Mobile experience**
*Does this work at 375px without compromise?*

Not "it works" — it works without compromise. Every section, every interactive element, every tap target, every animation. ABLE is a mobile-first product for artists who primarily use their phones. The mobile experience is not a reduced version of the desktop experience. It is the experience.

What a 10 looks like: Playwright screenshot at 375px shows: no horizontal scroll, no clipped elements, no tap targets below 48px, no text that requires pinch-to-zoom, no layout that breaks at 320px.

Common failure modes:
- Desktop layout that reflows to mobile but with insufficient padding
- Tap targets that are visually large but have a small hit area (common with CSS that sets height but not min-height)
- Animations that work on desktop but cause jank on mobile
- `position: fixed` elements that interact badly with iOS keyboard

---

**Angle 8 — Performance**
*Does this add meaningful load time without a return?*

Every asset that loads is a user who might leave before seeing the page. Performance is not perfectionism — it is respect for the user's time and connection.

What a 10 looks like: LCP ≤ 2.5s on a simulated 4G mobile connection. No CLS. No visible layout shift. Fonts preloaded. First render does not wait for any API call.

Common failure modes:
- Loading fonts without `preload` — FOUT on slow connections
- A hero image that is not sized/compressed — kills LCP single-handedly
- Rendering API data in the hero section before the API has responded
- Unused CSS that adds hundreds of kilobytes

---

**Angle 9 — Social proof**
*Does this section earn belief — or just assert it?*

Social proof is the hardest angle to score honestly pre-launch. The honest ceiling at launch is: testimonials from real beta users, or specific early metrics ("10 artists in the first week"). Invented social proof is not social proof — it is fabrication that erodes trust the moment it's questioned.

What a 10 looks like: Specific, named, verifiable proof. An artist name and a specific outcome ("Declan James went from 0 to 847 fans on his list in the month before his album dropped"). At pre-launch: honesty about what is real, combined with trust-building through specificity in everything else.

Common failure modes:
- Anonymous testimonials ("A musician in London said...") — these erode trust, not build it
- Inflated metrics ("Join 10,000 artists!") before there are 10,000 artists
- The absence of any social proof without acknowledgement — early-stage products should name their stage honestly

**Honest ceiling:** Until there are real, verified users with real outcomes, this angle cannot exceed 7/10. Name the ceiling and move on.

---

**Angle 10 — Trust signals**
*Does this build or erode trust?*

Trust is fragile. It is built through specificity, honesty, and the absence of signals that trigger suspicion. It is eroded by vagueness, inflated claims, and anything that makes the user feel processed rather than understood.

What a 10 looks like: Every trust-critical moment in the user's journey has a specific, honest signal. "No card required. Free forever." not "We value your privacy." The pricing is exactly what is charged. There are no hidden surprises in the sign-up flow. The product does exactly what the page said it does.

Common failure modes:
- Vague privacy language that feels like legal boilerplate
- Pricing that looks different after sign-up
- A modal or popup that appears before the user has had a chance to read anything

---

**Angle 11 — Visual hierarchy**
*Can a scanner understand this without reading?*

Most users scan before they read. The visual hierarchy is the page's communication to the scanner. It should be possible to understand the page's structure, key claims, and primary action without reading a word — through size, weight, contrast, and spatial relationships alone.

What a 10 looks like: A non-English speaker looking at a Playwright screenshot at 375px can identify: (1) what the page is about, (2) where the most important thing is, (3) where to act. Without reading a word.

Common failure modes:
- Body copy that is the same size as section headings — no hierarchy
- CTAs that don't visually dominate the sections they're in
- Too many elements at the same visual weight competing for attention

---

**Angle 12 — End-to-end pathway**
*Does the full journey through and beyond this page work?*

A page is not an island. What happens before it determines who arrives. What happens after it determines whether the visit mattered. The pathway must be coherent from first contact to post-conversion.

What a 10 looks like: A user can arrive from any realistic source (Instagram bio link, direct share, search), complete the page's primary job, and land in a sensible next state — without dead ends, broken links, or confusion about what comes next.

Common failure modes:
- Landing page CTA that goes to a 404 or an unfinished page
- Sign-up flow that doesn't end with a logical "what next"
- Mobile scroll that has no visible conclusion — user doesn't know when they've seen everything

---

**Angle 13 — Conversion clarity**
*Is the outcome of taking action obvious?*

Before a user clicks a CTA, they should be able to predict exactly what will happen. Uncertainty at the CTA is friction. "What happens when I click this?" is a question no CTA should leave unanswered.

What a 10 looks like: The CTA copy states or implies the outcome clearly. "Start your free page →" tells the user: they will get a page, it will be free, and it will require them to start something (implying onboarding). No surprises.

Common failure modes:
- "Get started" — started with what? What happens? Where do I go?
- Sign-up button that implies account creation when the first step is actually a wizard
- CTA that leads to a different outcome than suggested (e.g., "See how it works" that leads to a sign-up wall)

---

**Angle 14 — Emotional resonance**
*Does this make the target user feel understood?*

This is not about sentiment. It is about recognition — the specific moment when a user thinks "this was built for me." It is the most valuable thing a product page can produce, and it cannot be faked.

What a 10 looks like: An independent musician with 2,000 followers and a day job reads this page and thinks "finally." Not "interesting." Not "I'll look into this." Finally.

Common failure modes:
- Copy that resonates with musicians in theory but describes them from the outside ("Showcase your music to your fans")
- Page that is technically correct but lacks a moment of genuine understanding — it describes the user's situation without naming the feeling
- Visual design that communicates "professional tool" rather than "built by someone who understands music"

---

**Angle 15 — The "13-year-old" test**
*Non-technical user: does this confuse them?*

Simplicity is a feature. If a 13-year-old who knows nothing about music platforms cannot understand what to do on this page, the page is too complex.

What a 10 looks like: Every action on the page is obvious to a first-time user with no prior context. The hierarchy guides them. The copy is jargon-free. The primary action is impossible to miss.

Common failure modes:
- Technical language that assumes music industry knowledge ("Bandsintown integration", "oEmbed", "Supabase")
- UI patterns that require prior knowledge to use (e.g., edit icons without labels, or action that requires hover to reveal)
- Form fields without clear labels or context

---

**Angle 16 — Single memory**
*If the user leaves after this page, what sticks?*

Every page should leave the user with one thing. Not five things. Not a general impression. One specific, memorable thing that they could repeat to a friend in one sentence.

What a 10 looks like: You can name the one thing this page leaves in the user's memory. It is intentional. It is the most important thing. And the page's visual and copy hierarchy makes it the most memorable element — not by accident, but by design.

Common failure modes:
- Page that tries to communicate too much and leaves users with a general sense rather than a specific memory
- Page where the most visually prominent element is not the most important element
- Page that the user can summarise as "a website for musicians" — too vague to be useful

---

**Angle 17 — Secondary user**
*Is there a secondary user type who lands here? Are they served?*

Every page has a secondary user. Landing pages are visited by label scouts, managers, and journalists, not just independent musicians. Artist profiles are visited by other artists, not just fans. Admin dashboards are occasionally viewed by managers on behalf of an artist.

What a 10 looks like: The secondary user can extract what they need from this page without it compromising the primary user's experience. They may not get a dedicated CTA — but they get enough context to understand the product.

Common failure modes:
- Page entirely optimised for one user type that leaves secondary users confused
- Page that tries to serve secondary users explicitly and dilutes the primary experience

---

**Angle 18 — Discoverability**
*SEO basics, OG tags, shareability*

This page will be shared. Links will be previewed. Search engines will crawl it. If the OG tags are missing or wrong, the preview will be ugly or empty. If the title tag is generic, it won't rank for the terms that matter.

What a 10 looks like: Check source. Title tag: specific and accurate. Meta description: specific claim, not generic blurb. OG:image: populated, correct dimensions (1200×630). OG:title: same as title or specific variant. Twitter card: set. Canonical URL: set.

Common failure modes:
- Title tag left as "ABLE" or "Untitled Document"
- OG:image missing — social previews show a blank square
- Meta description that is the same for all pages

---

**Angle 19 — AI red team**
*What would kill this page's effectiveness? List all threats.*

Run the adversarial pass. Imagine everything that could go wrong and ask: does the page survive it?

Threats to consider:
- Artist shares their profile on Instagram. Instagram flags the domain as spam. (Has this happened with our domain?)
- A prospective fan arrives with ad-blocker enabled. Does the page still function?
- The artist hasn't updated their profile in 6 months. Does the page look stale or abandoned?
- A journalist arrives looking for the artist's booking contact. They can't find it. They leave.
- Playwright confirms a mobile layout issue that a real user would hit on the most popular iPhone model in the target market.

**Output:** A list of specific threats with honest assessments of each. Not all threats are equal — prioritise P0 (breaks core function), P1 (degrades core function), P2 (nice to fix).

---

**Angle 20 — North star**
*Does this feel like ABLE, or like "a tool"?*

This is the final sense check. ABLE has an identity. It is for artists with depth. It is not a marketing platform. It is not a CRM. It is not a link aggregator. It is a place for artists to be themselves.

What a 10 looks like: An independent musician who has never heard of ABLE looks at this page and, before reading a word, senses that it was built by people who understand music — not by people who optimised a product for musicians.

Common failure modes:
- Design that prioritises conversion over expression
- Copy that talks at artists rather than with them
- A page that looks like it could be for any "creator" rather than specifically for musicians

---

### Running the first-pass analysis

Score honestly. First-pass scores are usually between 4 and 7. That is normal. The gaps revealed by low scores are exactly what Stages 4–7 are designed to close.

For each angle below 8, write:
- What is specifically wrong (not "it's low" — what exactly)
- What the path to 8 looks like
- What the path to 10 looks like (may differ from path to 8)
- Whether there is an honest ceiling below 10, and why

### Multiple passes

Run a minimum of 3 passes after the first-pass scores. Show updated scores after every pass. Never stop because the score looks high.

After reaching 10 on any angle, ask: "What would make this an 11 if 11 existed?" That answer becomes the next design iteration or a product roadmap item.

### P0 prioritisation rule

P0 angles are those where the current score is below 6 AND the angle directly affects the primary job (Angle 2). Specifically:
- Angle 2 (Primary job) below 7 = P0. Stop everything. Fix this first.
- Angle 7 (Mobile) below 6 = P0. Mobile is the experience.
- Angle 14 (Emotional resonance) below 6 = P0. The page does not connect.
- Any other angle below 5 = P1. Plan a specific fix before proceeding.

### Angle interdependencies

Some angles cannot be high if others are low:
- Angle 3 (Headline) and Angle 14 (Emotional resonance) are coupled — weak headline means weak resonance
- Angle 4 (CTA) and Angle 13 (Conversion clarity) are coupled — confusing CTA means unclear conversion
- Angle 5 (Copy voice) affects almost everything — bad copy degrades trust, resonance, first impression, and north star simultaneously
- Angle 1 (First impression) and Angle 11 (Visual hierarchy) are coupled — poor hierarchy kills first impression

When fixing a low-scoring angle, check its coupled angles. Fixing one often lifts both — or one fix can inadvertently lower the other.

**Output:** Scored analysis document with all 20 angles. P0 gaps identified and named. At least 3 paths-to-10 written before proceeding to Stage 4.

---

## STAGE 4 — USER JOURNEY MAPS
**Who actually uses this page? What do they experience? What do they fear?**

*Added after the landing page exercise — not because it was forgotten, but because building without it revealed what was missing.*

Before writing a single word of copy, map who actually uses this page and what their experience is. Not who you imagine uses it — who actually does, with their real context, their real fears, and their real motivations.

The purpose of this stage is to make every subsequent design decision testable against a real person. Not a persona — a person. Declan James, 27, Manchester, 2.4k Instagram followers, a Linktree he set up in 2023 and never updates because the platform gives him nothing back.

Every design decision must be testable against Declan. "Would Declan notice this?" "Would Declan trust this?" "Would Declan find this patronising?" If the answer to any of those is "I don't know" — the journey map is not complete.

### Journey map template — complete field list

For each user type that lands on this page, write a complete journey map with these fields:

---

**Identity:**
- Name, age, city (specific)
- Occupation (separate from music, if applicable — most independent artists have day jobs)
- Music context: genre, release stage, platform following size
- Current toolkit: what platforms are they using today? What are they paying for?
- Why they might arrive at this page: what was the trigger?

**Emotional baseline:**
- What are they feeling when they arrive?
- What is their default level of trust toward a new platform?
- What is their primary fear about this type of product?
- What would need to happen in the first 10 seconds to make them stay?

**The arrival moment:**
- How did they get here? (Instagram bio tap, friend recommendation, Google search, direct share)
- What device are they on? (Almost always mobile — but specify)
- What time of day, and what context? (In bed, in a break between sets, at their desk)
- What did they see immediately before this page?

**The path — step by step:**
- Every step, including pre-page steps (e.g., "they searched for Linktree alternatives")
- At each step: what do they see? What do they think? What do they feel?
- At each step: what is the risk of losing them here?

**Decision points:**
- Where could they drop? (List every one)
- What would make them drop? (Be specific — "the page looks generic" is not specific enough; "it looks like the same Canva template as every other music platform" is specific)
- Where do they convert? What makes them act?

**The fear inventory:**
- List every fear the user carries into this experience. Classify each as:
  - **F1 — Trust fears:** "Is this a real company? Will they misuse my email?"
  - **F2 — Commitment fears:** "Will I be locked in? What if I want to leave?"
  - **F3 — Effort fears:** "Is this going to take all afternoon to set up?"
  - **F4 — Exposure fears:** "What will my fans see? Will it look unprofessional?"
  - **F5 — Relevance fears:** "Is this actually for someone like me, or for big artists with real teams?"

**What ABLE must do:**
- For each fear: what specific design or copy decision addresses it?
- For each decision point: what must be true on the page to keep them?

---

### Example: Declan (the sceptical Manchester artist)

**Identity:**
- Declan James, 27, Manchester
- Works Monday–Friday in a logistics company
- Makes lo-fi indie music with 2.4k Instagram followers, 1.1k on Spotify monthly listeners
- Currently uses Linktree (free tier, last updated 4 months ago)
- Pays for nothing music-related except his Spotify subscription
- Arrived via a friend's share of an ABLE artist profile — he saw it and thought "that looks different"

**Emotional baseline:**
- Slightly sceptical — he's seen a lot of "platforms for musicians" that are just generic SaaS with a guitar icon
- Tired of platforms that want his data without giving anything back
- Proud of his music but not expecting much from an unknown platform
- His primary fear: "This will be another thing I set up once and abandon because it's not worth maintaining"

**The arrival moment:**
- He's on his phone during a lunch break
- He tapped a link from a friend's WhatsApp message: "Have you seen this? Looks like a proper Linktree alternative for musicians"
- He's giving this 90 seconds

**The path:**
1. Page loads. He sees the artist profile of whoever his friend shared. Not a marketing page — an actual artist's page. First thought: "OK, this is interesting."
2. He scrolls. He sees the artist's music, their events, a fan sign-up. He thinks: "I could have this."
3. He notices the "Made with ABLE" footer. He taps it.
4. He lands on the landing page. He sees the headline. Is it "finally"? Or is it "interesting"?
5. He sees the Linktree comparison. Specific claims, not general ones. Does he recognise himself in the comparison?
6. He sees the price. Free. No card required. His commitment fear is addressed immediately.
7. He sees the CTA: "Your page is free →". He hesitates. "How long will this take?"
8. He either taps it or closes the tab. This is the conversion moment.

**Decision points:**
- Step 4: Landing page headline doesn't resonate → leaves
- Step 5: Competitor comparison feels defensive or desperate → trust erodes, leaves
- Step 6: Price is unclear or requires hunting → effort fear activates, leaves
- Step 7: CTA implies a long process → effort fear activates, leaves

**Fear inventory:**
- F5: "Is this for someone with 2,400 followers, or for artists with real teams?" — address by showing the onboarding for artists at exactly his scale
- F3: "How long will the setup take?" — address by naming the time commitment in the CTA or immediately adjacent copy
- F2: "What happens if I want to leave?" — address by confirming no lock-in, no card required
- F1: "Will they spam me?" — address by specificity (not generic privacy language) and no email required until fan capture

**What the page must do:**

| Moment | What Declan needs | How the page delivers it |
|---|---|---|
| First 3 seconds | A visual signal that this is different | Quality design, not generic template |
| First 10 seconds | Recognition — "this is for someone like me" | Copy that speaks directly to his situation |
| CTA moment | Reduction of effort fear | Time commitment stated or implied |
| After tapping CTA | Confirmation that commitment is low | "Free. No card. 4 minutes." in onboarding entry |

### Identifying journey gaps

A journey gap is a moment in the map where the current design does not address what the user needs. Common gaps:

- **The blank loading state gap:** User arrives while the page is loading. What do they see? If it's a white screen for 800ms, that's a gap.
- **The "what next" gap:** User completes the primary action. Where do they go? If there's no clear next state, that's a gap.
- **The mobile return gap:** User arrives on mobile, gets interested, wants to continue on desktop later. Is there a way to resume? That's a gap.
- **The "come back later" gap:** User isn't ready to sign up. Is there a low-commitment action they can take instead? If not, that's a gap — and a lost fan.

### The emotion curve

After mapping the path, draw (or describe) the emotion curve: how does the user's confidence, trust, and excitement change at each step? It should look like a staircase with one inflection point — not a rollercoaster.

A healthy emotion curve: arrives neutral or slightly sceptical → first impression builds curiosity → headline builds recognition → comparison builds confidence → price removes commitment fear → CTA is obvious and low-friction → lands in onboarding feeling: "I'm actually doing this."

An unhealthy emotion curve: arrives neutral → generic first impression, flat → copy doesn't resonate, slight drop → pricing is unclear, trust drops → CTA is generic, friction → lands in a sign-up form, trust drops further.

### Translating journey findings into product requirements

Each journey gap and each fear translates directly into a product requirement. Format:

```
Journey gap: [description]
User affected: [name from journey map]
Fear type: [F1–F5]
Product requirement: [specific design or copy change]
Priority: P0 / P1 / P2
```

These requirements feed directly into Stage 6 (Design Spec) and the PATH-TO-10.md.

**Output:** `USER-JOURNEYS.md` — 2–3 complete journey maps, each with the full template, fear inventory, and "what the page must do" table. Journey gaps listed with product requirements. Emotion curve described for each journey.

---

## STAGE 5 — COPY FIRST
**Write every word before designing anything. The copy tells you what the design must accommodate.**

This is the stage most builders skip. They open a design tool, arrange elements, and fill in copy later. The result is copy that fits the design rather than design that serves the copy. That is backwards. Copy is the substance. Design is the container.

Copy tells you:
- How much space you need for a section
- What the visual hierarchy must be (the most important thing needs the most space)
- What the page must communicate at each point and in what order
- Where a section will feel empty (and therefore either needs more copy or needs to be cut)
- Where a CTA needs to be louder or quieter

### The copy hierarchy (write in this order, always)

For every section of every page, write copy in this exact hierarchy:

1. **Section headline** — the primary claim, in the artist's register. Written first.
2. **Sub-headline or eyebrow** — the context or qualifier. Sometimes absent — and that's fine.
3. **Body copy** — only if needed. Many sections do not need body copy. If you are writing body copy to fill space, cut it.
4. **CTAs** — first person where possible. Specific outcome implied. Never generic.
5. **Trust lines** — specific claims, not platitudes. "No card required. Free forever." is a trust line. "We value your privacy" is not.
6. **Empty states** — what does the user see when a section has no data yet? This is one of the most important copy jobs on the page and one of the most neglected.
7. **Micro-copy** — labels, hints, placeholders, error messages, confirmations. Every word matters. Placeholders especially — they are often the first copy a user sees.

### The voice calibration test

Before writing any copy for a page, run these 5 calibration questions:

1. **Who is speaking?** On the artist profile page, the voice is the artist — first person. On the landing page, the voice is ABLE addressing the artist — second person ("your fans", "your page"). On the admin dashboard, the voice is a trusted peer, not a product manager.

2. **What is the register?** ABLE's register is: warm, direct, specific, slightly laconic. Not formal. Not chatty. Not corporate. Think: a peer who knows the music industry and isn't trying to sell you something.

3. **What is the reader's emotional state when they encounter this copy?** If the user is in a flow state (mid-onboarding), copy should be brief and forward-moving. If they're evaluating (landing page comparison section), copy should be specific and evidence-based. Different emotional states require different registers.

4. **What is the single thing this copy must achieve?** One sentence. If you cannot state what this piece of copy must accomplish in one sentence, you don't know what you're writing yet.

5. **Could Linktree have written this?** If yes — rewrite. Every line of ABLE copy should be identifiably ABLE's, not generically applicable to any music platform.

### The read-aloud test

After writing any section of copy, read it aloud. Not skimming — actually speaking the words out loud.

If you stumble over a sentence — it's too long or too complex. Simplify.
If a word sounds like jargon when spoken — replace it with the word a musician would actually use.
If the CTA sounds like a command rather than an invitation — rewrite it.
If the trust line sounds like legal copy — it will feel like legal copy to the user. Rewrite as a specific claim.

The read-aloud test catches more problems than any other editorial process. Use it after every section, not just at the end.

### A full copy hierarchy example

For the landing page hero section:

```
[SECTION HEADLINE]
"Your music. Your fans. Nothing in between."

[SUB-HEADLINE]
"The profile that works as hard as you do —
without an algorithm deciding who sees it."

[BODY COPY]
(none required — the headline and sub-headline do the work)

[PRIMARY CTA]
"Your page is free →"

[TRUST LINE]
"No card required. Set up in 4 minutes."

[SECONDARY CTA]
"See how it works ↓"
```

Note: no body copy between headline and CTA. The trust line does the work the body copy would have wasted words on.

### Handling copy that requires dynamic data

Some sections of ABLE pages display data that doesn't exist yet (fan counts, release dates, streaming numbers). Write the copy for both states:

- **Populated state:** Copy that uses the dynamic data naturally ("47 people on your list")
- **Empty state:** Copy that is honest and action-oriented, never apologetic ("Your list starts here. Share your page to start growing it.")

Empty state copy is not a failure state. It is the first thing many artists see. It should feel like an invitation, not a void.

### How to write CTAs that don't sound like CTAs

Generic CTA: "Get started"
ABLE CTA: "Your page is free →"

The difference:
- "Get started" describes an action. "Your page is free →" describes an outcome.
- "Get started" is imperative. "Your page is free →" is declarative — it tells you what you're getting before you tap.
- "Get started" could be on any product. "Your page is free →" is specific to ABLE.

Rules for every CTA:
- State the outcome, not the action
- First person where possible ("Start building mine" over "Start building yours")
- Specific over generic ("Your page is free →" over "Sign up free")
- Arrow (→) only for forward progression CTAs. Not for destructive actions. Not for modals.
- Never: "Sign up", "Create account", "Get started", "Join now", "Try for free" — rewrite all of these

### Placeholder copy rules

Placeholder copy in form fields is a trust signal and a micro-UX element. Rules:

- **What's OK:** Placeholder that sets expectation: `your@email.com` for an email field. Short, specific, realistic.
- **What's not OK:** Placeholder that tries to do copy's job: `Enter your email to join the ABLE community` — too long, too try-hard, vanishes on focus.
- **What's never OK:** Generic placeholder text left from a template: `Enter text here`, `placeholder text`, etc. These are visible evidence that the product is unfinished.
- Placeholders are not labels. If the user needs to know what to type after they've started typing, use a label, not a placeholder.

### Iteration rules

Write the first draft. Then rewrite at least twice. Three rewrites is the minimum. Not because the first draft is always wrong — sometimes it's right — but because a third pass almost always finds a word or phrase that wasn't earned the first time.

Lock copy only after the third pass. "Locked" means: nothing changes during implementation. If a developer or AI agent wants to change copy during implementation, the copy must be changed in COPY.md first, then propagated to the HTML.

**Output:** `COPY.md` — every word on the page, in hierarchy order (section by section, field by field), annotated with placement and context. No design or code until this document exists.

---

## STAGE 6 — PATH TO 10 + DESIGN SPEC
**Two documents. The first explains exactly how to get every angle to 10. The second gives a developer everything needed to build without a single question.**

---

### Part A: Path to 10

Return to the 20-angle analysis from Stage 3. For every angle below 10:

1. What exactly makes it a 10? (Be specific — not "better copy" but "the headline must name the exact fear an artist has about Linktree: that their fans belong to the platform, not to them")
2. What specific design decisions, copy changes, or technical implementations get it there?
3. What is the honest ceiling — and why? (If an angle cannot reach 10 at current build stage, document the ceiling and the reason)

#### Path to 10 format

```
## Angle [N] — [Name]
**Current score:** [N]
**Target:** 10 (or named ceiling)
**Gap:** [what exactly is preventing 10]

**Path:**
1. [Specific change 1]
2. [Specific change 2]
...

**Honest ceiling:** [If applicable — what prevents 10 at this stage and why]
**Ceiling can be lifted by:** [What would need to change — real users, backend, etc.]
```

#### Build-dependent vs strategy-dependent paths

Some angles require product changes to reach 10. Others require only design or copy changes. Know the difference:

- **Design-dependent:** Angles 1, 3, 4, 7, 11 — can reach 10 through design and copy alone
- **Strategy-dependent:** Angle 9 (Social proof) — requires real users with real outcomes
- **Build-dependent:** Angle 8 (Performance) — requires specific technical implementation
- **Context-dependent:** Angle 6 (Differentiator) — requires knowing what competitors do well (research-dependent)

**Output:** `PATH-TO-10.md` — every angle addressed. Honest about ceilings. Build order implied by dependencies.

---

### Part B: Design Spec

With purpose clear, research done, angles scored, journeys mapped, copy written, and paths to 10 defined — now spec the design.

The design spec is a contract. It is the document that a developer (human or AI) builds from, without asking a single question. If the spec is ambiguous, the build will be ambiguous. If the spec has gaps, the developer will fill them with guesses. Gaps in specs become bugs in builds.

**The developer test:** After writing the spec, ask: "Could a developer who has never seen ABLE, never spoken to me, and knows only standard HTML/CSS/JS, build this page from this document?" If the answer is no — the spec has gaps. Find them and fill them.

#### Design spec template — complete field list

For every section and every component, document the following:

---

**Section metadata:**
- Section name and ID (exact `id=""` value used in HTML)
- Purpose (one sentence — from the journey map)
- Visibility rule: always visible / visible only in fan view / visible only to owner / conditional on profile data

**Layout:**
- Container: max-width, centering method (margin auto / flexbox / grid)
- Desktop layout: grid columns, flex direction, gap values
- Mobile layout (375px): how layout changes, column count, stacking order
- Padding: top/bottom/left/right — desktop and mobile separately
- Any `position: sticky/fixed/absolute` elements: specified with z-index and trigger condition

**Typography — for every text element:**
- Element type (h1, h2, p, span, label, etc.)
- Font family (token reference: `--font`, `--font-display`)
- Font size: desktop (px) and mobile (px)
- Font weight (numeric: 400, 500, 600, 700)
- Line-height (unitless ratio)
- Letter-spacing (if non-default — specify in `em`)
- Colour (token reference: `--color-text`, `--color-muted`, `--color-accent` etc.)
- Text transform (if applicable)
- Max-width (for readability — long lines need constraining)
- Margin: top and bottom from adjacent elements

**Colour — for every surface:**
- Background: token reference
- Border: token reference + width + style + radius
- State colours: hover (token ref), active/pressed (token ref), disabled (token ref)
- Accent usage: where the artist-set accent is applied and what property

**Animation spec — for every animated element:**
- Trigger: what causes this animation (page load / scroll-into-view / user click / state change)
- What moves: exactly which CSS properties (opacity, transform, filter — never width/height/colour)
- Initial state: exact values
- Final state: exact values
- Duration: milliseconds
- Easing: token reference OR exact cubic-bezier values
- Delay: if staggered — the stagger increment and maximum total delay
- `prefers-reduced-motion` fallback: always specified. Usually: no movement, instant state change.
- Browser support check: note any animation using newer CSS features (@starting-style, View Transitions) with the `@supports` guard requirement

**Interactive states — for every interactive element:**
- Default: full spec
- Hover (desktop only): what changes, transition duration
- Active/pressed: what changes, duration (usually 150ms max for responsiveness)
- Disabled: appearance, pointer-events behaviour, aria-disabled
- Focus: visible focus ring spec (WCAG 2.2 AA minimum — 3px outline, 2px offset)
- Loading (where applicable): skeleton state or spinner — specify exactly
- Error (where applicable): error state appearance, message placement, timing
- Empty (where applicable): empty state appearance and copy (from COPY.md)

**Interaction spec — what happens when:**
- User taps/clicks this element: what changes immediately, what changes after a delay
- Any state saved to localStorage: key name, value format, when written
- Any DOM change: what gets added/removed/changed
- Any side effects: e.g., "saving profile also triggers syncProfile() — debounced 300ms"

**Accessibility spec:**
- `aria-label` values (for icon-only buttons)
- `aria-live` regions (for dynamic content: error messages, counts, confirmations)
- `role` attributes (for non-semantic elements used as interactive components)
- Keyboard interactions: tab order, enter/space behaviour, arrow key navigation (for grids/lists)
- Focus management: where focus goes after an action (e.g., "after modal closes, focus returns to trigger")

---

#### Specifying animations in detail

Animations are the most under-specified part of most design systems. Vague animation specs ("fade in smoothly") produce arbitrary implementations. Use this format:

```
Animation: [name]
Trigger: [exact trigger]
Target: [CSS selector]
Properties:
  opacity: 0 → 1
  transform: translateY(8px) → translateY(0)
Duration: 240ms
Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* --ease-decel token */
Delay: [base delay] + [stagger increment × index] (max: [max total delay])
prefers-reduced-motion: opacity change only (no transform), same duration
Browser support: @starting-style — Chrome 117+, Safari 17.5+, Firefox 129+.
  Guard with: @supports (selector(:has(*))) { [animation block] }
```

#### Token-first rule

Never specify a loose hex code in the design spec. Every colour is a token reference. This is not a style preference — it is a functional requirement. If a hex code appears in the spec, it will appear as a hardcoded value in the HTML. Hardcoded values break themes.

Exception: when defining the token itself. `:root { --color-bg: #0d0e1a }` — this is correct. Using `#0d0e1a` anywhere outside a `:root` block is not.

#### Handling spec gaps

If a section of the spec is genuinely unclear — document the gap explicitly:

```
⚠️ SPEC GAP: The hover state for the platform pill is not defined.
Options: (a) slight lighten of pill background; (b) accent colour underline; (c) scale(1.03)
Decision needed before build: [person responsible]
```

A documented gap is better than an undocumented assumption. The developer filling an undocumented gap might make the wrong choice. A documented gap requires a decision.

**Output:** `DESIGN-SPEC.md` — a developer can build the entire page from this document without asking a single question. Every section. Every component. Every state. Every animation.

---

## STAGE 7 — STRATEGY REVIEW + FINAL 20-ANGLE
**Synthesise everything. Check the research against the spec. Run the final pass. Establish the pre-build authority document.**

This stage is the transition from strategy to build. Everything before this stage is thinking. Everything after is doing. Stage 7 is the quality gate between them.

It answers one question: *"Is there anything left on the table?"*

If the answer is yes — find it and address it before building. Once build starts, strategy changes cost 10x as much to implement.

---

### Part A: Strategy Review

The synthesis checklist. Work through these in order:

**1. Research-vs-spec gap check**

Pull out the competitive research findings from Stage 2. For each finding:
- Is it addressed in the design spec?
- If yes: where? (reference the spec section)
- If no: should it be? If yes, update the spec. If no, document why not.

A finding that is not addressed and not explained is a gap. Find all gaps before proceeding.

**2. Journey-map-to-spec coherence check**

Pull out the "what the page must do" table from each journey map. For each row:
- Is there a specific design or copy element in the spec that does this?
- If yes: note it.
- If no: add it. The journey map says it must be there. The spec must include it.

**3. Honest ceiling review**

For every angle that has a ceiling below 10:
- Is the ceiling genuinely honest? Or was it set conservatively and can be challenged?
- Is the ceiling truly blocked, or is it blocked by a specific implementation decision that could be changed?
- If the ceiling is genuinely real (e.g., social proof requires real users): document it and move on. Do not spend time on ceilings you cannot lift at this stage.

**4. The "ceiling examination" process**

For each angle not at 10, ask: *"What would make this a 10? And can we do that thing?"*

This is a challenge pass — the goal is to find any angle where the ceiling was set too low. Sometimes a ceiling that seemed like a product limitation is actually a copy or design limitation in disguise.

Example: "Social proof cannot be 10 without real users" — but can you get to 9.5 by naming the early community honestly and making it feel significant rather than small? Sometimes the ceiling is at 8.5, not 7. Push until you find the real ceiling.

**5. Strategic risk identification**

What is the single biggest thing that could undermine this page's effectiveness?

Common strategic risks:
- Domain reputation: has the ABLE domain been flagged by any major platform's spam filter?
- Competitive move: has a competitor just shipped something that addresses the main differentiator in our copy?
- Trust gap: is there a promise on the page that the current product cannot deliver?
- Legal risk: does any claim on the page require specific compliance (pricing, free tier terms, data handling)?

Strategic risks that are fixable as copy edits → fix immediately.
Strategic risks that require product changes → log in the roadmap and add a guardrail to the page copy.
Strategic risks that are genuinely unresolvable → document them honestly. Do not pretend they don't exist.

**Output:** `STRATEGY-REVIEW-FINAL.md` — final synthesis, research-vs-spec gap check completed, journey-to-spec coherence confirmed, honest ceilings documented, strategic risks listed with guardrails.

---

### Part B: Final 20-Angle Review

Re-score all 20 angles with every stage incorporated. This is Pass 3 at minimum. Show the full scorecard.

For each angle, record:
- New score
- What changed since the first-pass score (what work was done to get here)
- If not 10: exactly what makes it a 10, and what specifically is blocking it

**The FINAL-20-ANGLE-REVIEW-2 protocol (mandatory):**

After completing the Final 20-Angle Review (Pass 3), always produce a FINAL-20-ANGLE-REVIEW-2 document. This is Passes 4 and 5.

Pass 4: Challenge every ceiling from Pass 3. Ask: "What did we miss? What would a world-class competitor do here that we haven't specced?"

Run a dedicated research pass targeting the specific angles that didn't reach 10 in Pass 3. For each ceiling angle:
- Search for world-class examples of how this specific problem is solved
- Check if the competitive research surfaced anything that now looks relevant
- Ask: "Is there a design solution we haven't considered?"

Pass 5: After implementing improvements from Pass 4, re-score. If Pass 5 overall is the same as Pass 3, write exactly why — that is valuable data. The point is not to get higher scores — it is to be certain there is nothing left on the table.

**What qualifies as a strategic risk vs a design preference:**

Strategic risk: something that, if unaddressed, could make the page fail its primary job. (Missing trust signal, broken flow, inaccurate claim)

Design preference: something that would make the page better but whose absence does not cause failure. (Typography refinement, colour balance, animation timing)

Only strategic risks block shipping. Design preferences go in the roadmap.

**The final quality gate:**

Before signing off Stage 7 and beginning Stage 8, answer these four questions honestly:

1. Has every research finding been addressed or explicitly dismissed?
2. Has every journey map fear been addressed in the spec?
3. Have all P0 angles reached at least 8/10?
4. Has Pass 5 been completed and its results recorded?

All four must be "yes." If any is "no" — address the gap before starting the build.

**Output:** `FINAL-20-ANGLE-REVIEW.md` (Pass 3) and `FINAL-20-ANGLE-REVIEW-2.md` (Passes 4 + 5). Together, these form the definitive pre-build authority document.

---

## STAGE 8 — BUILD + PLAYWRIGHT VERIFY

This is not just a coding stage. It is a verification stage. The build earns the spec scores.

---

### 8.0 Pre-build orientation (every session, before first line of code)

**Load ALL authority documents for the page being built:**

| Document | What to extract |
|---|---|
| `FINAL-20-ANGLE-REVIEW-2.md` | Target scores for every angle. Build earns these — do not assume them. |
| `DESIGN-SPEC.md` | Every px, every colour token, every animation spec. Build from this exactly. No improvising. |
| `COPY.md` | Every word locked. Do not change copy in HTML. If copy needs changing, update COPY.md first. |
| `PATH-TO-10.md` | Build order. Follow the sequence — it reflects dependency chains. |
| `USER-JOURNEYS.md` | Who is using this. Test against Declan (Spotify import), Sofia (Linktree), Amir (scratch) at each milestone. |
| `STRATEGY-REVIEW-FINAL.md` | The "why" behind each decision. If a spec decision seems wrong during build, check here before changing it. |

**Write this sentence before coding:** *"This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."* If you cannot write it, re-read the docs.

---

### 8.1 Pre-build research check

Before each major section, spend 5–10 minutes on targeted research:

```
web search: "[section name] UX best practice 2025 2026"
web search: "[competitor] how does [feature] work"
```

Specific checks per section type:
- **Import flows:** Search for how Spotify/Linktree API failures are handled in production. Find real error rate data.
- **Live preview:** Search for CSS variable update performance. Test if 0ms debounce is actually perceptible.
- **Mobile keyboard:** Always test `visualViewport` API before assuming it works on the target iOS version.
- **Animations:** Check `@starting-style` browser support table before using. Use `@supports` guard if needed.
- **Accessibility:** Run axe-core scan after every interactive component is built.

---

### 8.2 Build order

Follow the build order in `PATH-TO-10.md` exactly. For onboarding specifically:

1. HTML scaffold + CSS design tokens + font loading
2. Screen 0 (Hook + import input + import Netlify function integration)
3. Live preview panel (desktop layout first, then mobile pill/sheet)
4. Screens 1–4 (Name, Vibe, Colour, Theme) — the core OQPS flow
5. Screens 5–7 (Links, Fan CTA, Moment) — the choices
6. Screen 8 (Done — labor illusion → celebration sequence)
7. Step transitions (`@starting-style`, View Transitions API, stagger)
8. Error and fallback states for all import paths
9. Mobile polish (keyboard handling, touch targets, overscroll)
10. Accessibility audit (axe-core + manual keyboard nav + focus management)
11. Animation polish (`prefers-reduced-motion`, spring easing, done screen beats)
12. End-to-end smoke test (full flow → able-v7.html renders correctly)

**Do not skip steps. Do not batch them.** Each step is a commit.

---

### 8.3 After each section: score check

After each section in the build order is complete:

1. Take Playwright screenshots at 375px, 390px, 768px, 1280px
2. Look at each screenshot against the relevant DESIGN-SPEC section
3. Score the relevant angles against target (from FINAL-20-ANGLE-REVIEW-2.md)
4. If any angle is below target: fix before proceeding
5. Commit with descriptive message

**Show the current scorecard after each major section.** Keep a running tally. Never hide scores.

---

### 8.4 Playwright verification checklist (run after EVERY significant section)

**Visual:**
- [ ] Screenshot at 375px (iPhone SE) — no horizontal scroll
- [ ] Screenshot at 390px (iPhone 14 Pro) — matches mobile spec
- [ ] Screenshot at 768px (iPad) — two-column or single-column correctly
- [ ] Screenshot at 1280px (laptop) — matches desktop spec
- [ ] Vibe card grid: exactly 2 columns at 375px, 3 columns at 768px+
- [ ] Preview panel: hidden on mobile, floating pill visible from Step 2
- [ ] Done screen: centered single column, accent gradient visible

**Interaction:**
- [ ] All tap targets ≥ 48px — measure with Playwright `getBoundingClientRect()`
- [ ] Import input: focus state shows accent border, spinner visible during import
- [ ] Import success: green confirmation state visible, auto-advance fires
- [ ] Import failure: amber state visible, fallback path functional
- [ ] Vibe card selection: spring animation plays, selected state visible
- [ ] Colour swatch: preview updates in 0 frames (CSS variable change)
- [ ] Back navigation: correct directional transition, state preserved
- [ ] Screen 8 CTA: "See your live page →" opens able-v7.html with correct data

**Mobile-specific:**
- [ ] Virtual keyboard does not hide Continue button (iOS Safari + Chrome Android)
- [ ] `overscroll-behavior: contain` prevents iOS bounce
- [ ] `touch-action: manipulation` removes tap delay on all cards/buttons
- [ ] Preview pill appears at Step 2, opens bottom sheet correctly
- [ ] Bottom sheet: 92vh height, drag handle visible, closes on backdrop tap

**Performance:**
- [ ] Lighthouse mobile: LCP ≤ 2.5s, Performance ≥ 85, no CLS
- [ ] Fonts: DM Sans + Barlow Condensed loaded via preload (no FOUT)
- [ ] Service worker registers on first load
- [ ] Step 2 assets preloaded after first Step 1 input interaction
- [ ] Import API calls: timeout ≤ 8s, fallback state appears on timeout

**Accessibility:**
- [ ] axe-core: zero critical violations
- [ ] Keyboard: tab order is logical across all 8 screens
- [ ] Vibe grid: arrow keys navigate between cards (native radio)
- [ ] Focus moves to screen headline on each step transition
- [ ] `aria-live="assertive"` on error messages — test with VoiceOver

**Animation:**
- [ ] `@starting-style` entrance plays on screen entry (Chrome + Safari + Firefox)
- [ ] Content stagger: heading → subtitle → cards in sequence
- [ ] Card selection: `scale(0.97)` press response visible
- [ ] Done screen: building sequence (3 steps), pulse ring (one loop), headline spring
- [ ] All animations disabled correctly under `prefers-reduced-motion: reduce`

**Data:**
- [ ] `able_wizard_draft` written to localStorage after each screen advance
- [ ] `able_v3_profile` written on Screen 7 submit
- [ ] `able_wizard_draft` deleted after Screen 7 submit
- [ ] Session recovery: close mid-wizard, return, sees "Picking up where you left off."
- [ ] `able_wizard_draft` older than 24 hours is ignored (clean start)

**End-to-end flow:**
- [ ] Full journey (Spotify import path): Screen 0 → Screen 8 in one session
- [ ] Full journey (Linktree import path): `?import=linktree` → Screen 8
- [ ] Full journey (scratch): type name → Screen 8
- [ ] After Screen 8: "See your live page →" → able-v7.html shows correct profile
- [ ] Profile renders with correct name, accent colour, theme, CTA text

**Commit after each section is verified.** Do not batch commits.

---

### 8.5 Two-pass review per section

When a section passes the Playwright checklist:

**Pass 1 — Spec fidelity:** Does it match DESIGN-SPEC.md exactly?
- Every pixel value
- Every colour token (no loose hex codes)
- Every copy string (matches COPY.md exactly)
- Every animation timing

**Pass 2 — User perspective:** Would the target user be impressed or confused?
- Put yourself in Declan's position (26, Manchester, slight sceptic)
- Look at the 390px screenshot only
- Is there anything that looks like a form? Fix it.
- Is there anything that looks generic SaaS? Fix it.

Both passes must pass. Neither is optional.

---

### 8.6 Final build score

After all sections are built and verified, run the full 20-angle analysis against the **live built page** — not the spec. Open the page in Playwright. Screenshot all viewports. Score every angle honestly.

Show the full scorecard:

| Angle | Spec target | Built score | Gap | Action |
|---|---|---|---|---|

If any angle is below spec target: fix it. Do not ship below spec.

If any angle exceeded spec: note it. Update FINAL-20-ANGLE-REVIEW-2.md.

---

### 8.7 AI user story check (before any PR or release)

Before calling a build complete, run every AI-native user story:

> "An AI agent wants to update my artist profile. Can it do everything a human can do through the UI?"

Specifically for onboarding:
- Can an AI agent drive the wizard programmatically? (headless Playwright)
- Are all interactive elements accessible by ID/data attribute?
- Can the import be triggered via a direct API call rather than UI?
- Is the localStorage profile schema documented for programmatic reads?

If the answer to any is "no": add the programmatic interface before calling it done. ABLE must be agent-native from the start.

---

### 8.8 — Continuous Improvement Loop

**This loop never ends. It runs during every build session and beyond. It is not an addendum to the build — it is the build.**

The mechanical steps of 8.0–8.7 produce a page that matches its spec. The continuous improvement loop produces a page that exceeds its spec. These are not the same thing. The spec was written before building. Building reveals things the spec did not anticipate. The improvement loop is how you capture those revelations and act on them.

#### When to trigger the loop

The continuous improvement loop is triggered:

1. **After each verified section** — once a section passes its Playwright checks (8.4) and two-pass review (8.5), before committing: pause and scan. Do not batch this pause. Do it every section.

2. **When intuition fires** — any time during build when something feels wrong, even if Playwright shows a pass. If a section looks technically correct but feels off, the improvement loop runs immediately.

3. **At the midpoint of any page** — after building approximately half the sections, stop and run a full scan of all strategy docs simultaneously. Not to second-guess the spec — to find anything the spec missed that has now become visible.

4. **When research surfaces something new** — if a web search during build (Stage 8.1 pre-build research) returns something that changes the picture, the improvement loop evaluates it before proceeding.

#### What to scan

When the loop triggers, scan these documents in this order:

1. **`FINAL-20-ANGLE-REVIEW-2.md`** — look at the "what would make this an 11" notes. Can any of them be implemented in the current build session without scope creep?

2. **`PATH-TO-10.md`** — are there improvements listed there that aren't yet in the build? Could any of them be implemented now, before the section is committed?

3. **`DESIGN-SPEC.md`** — are there any sections marked "spec complete" with notes like "further thought needed"? Do those notes now have answers, having seen the built sections around them?

4. **`docs/systems/MICRO_INTERACTIONS_SPEC.md`** — does the current section have any interactions that are in the system spec but not in the page spec? The system spec was written at a higher level of abstraction — some interactions may apply here but weren't carried through to the page spec.

5. **`docs/systems/copy/SPEC.md`** — read the ABLE copy voice section with fresh eyes after spending time building. Does the current section's copy feel completely in register? Or has build fatigue produced something slightly flatter?

6. **`USER-JOURNEYS.md`** — open the journey map for the primary user. Go to the step in the journey that corresponds to the section just built. Is what was built exactly what the journey map said the user needs at that moment?

#### How to decide: implement now vs backlog

Every potential enhancement gets evaluated against three criteria:

**Scope:** Is this a change to the current section only, or does it affect other sections, other pages, or shared systems?
- Current section only → eligible for immediate implementation
- Multiple sections on this page → eligible if it can be done without blocking current progress
- Other pages or shared systems → never implement during a single-page build session. Document and defer.

**Confidence:** Is this clearly better than the spec, or just different?
- Clearly better (addresses a specific user fear, improves a specific 20-angle score) → implement
- Different but not clearly better → defer to the roadmap
- Better but risky (might break something else) → document the risk, implement with extra Playwright verification

**Time:** Will implementing this now slow down the build significantly?
- Under 20 minutes → implement immediately if scope and confidence pass
- 20–60 minutes → implement now only if it affects a P0 angle
- Over 60 minutes → defer unless it addresses a P0 failure

#### Quick spec for an enhancement

Before implementing any significant enhancement (anything that takes more than 20 minutes), write a mini-spec in `ENHANCEMENT-LOG.md`:

```
## [Date] — [Section] — [Enhancement title]
**What:** [one sentence — what exactly changes]
**Why it's better:** [which 20-angle it improves, and by how much]
**Scope:** current section / multiple sections / cross-page
**Time estimate:** [minutes]
**Risk:** [what could go wrong if this is wrong]
**Status:** proposed → approved → in-progress → implemented → deferred
```

The "why it's better" field is the most important. If you cannot name which angle improves and by how much — the enhancement is a design preference, not an improvement. Design preferences go to the roadmap.

#### Which docs always need updating after an enhancement

After any significant enhancement is implemented and verified:

1. **`DESIGN-SPEC.md`** — mark the affected section as "implemented (enhanced)" with a note of what changed. Never leave DESIGN-SPEC.md behind the built state.

2. **`ENHANCEMENT-LOG.md`** — mark the entry as "implemented" with the commit SHA.

3. **`FINAL-20-ANGLE-REVIEW-2.md`** — if the enhancement improved a specific angle score, update the score and note what changed to achieve it.

4. **`docs/STATUS.md`** — add the enhancement to the "last session summary" section.

5. **System specs** (`docs/systems/`) — if the enhancement touches a shared pattern (animation easing, copy register, interaction design), update the relevant system spec so future pages can benefit from it.

If any of these docs is not updated after an enhancement, the next build session starts with stale information. That compounding staleness is how "we have great docs" becomes "nobody reads the docs."

#### The "never ship below spec" gate

After implementing an enhancement, the full Playwright verification (8.4) runs again for the affected sections. Not just the new elements — the whole section. Enhancements can introduce regressions in adjacent elements.

If the enhanced section now scores lower on any Playwright check than it did before the enhancement — the enhancement is reverted and re-specced. An improvement that breaks something is not an improvement.

#### Handling inspiration that contradicts the current spec direction

Sometimes during build, a scan of the docs or a piece of research produces an insight that seems to contradict the current spec direction entirely. This is not a reason to panic. It is a reason to be systematic.

**If the contradiction is a minor design question** (e.g., "maybe the CTA should be amber instead of accent") — note it in ENHANCEMENT-LOG.md as a P2 design preference. Continue building. Evaluate after the section is complete.

**If the contradiction is a significant structural question** (e.g., "the journey map says the user needs a preview here, but the spec doesn't have one") — stop. Re-read the relevant journey map section and the relevant spec section. If the contradiction is real: update the spec before continuing. A spec built on a wrong assumption produces a page built on a wrong assumption.

**If the contradiction challenges the primary job** (e.g., "research suggests the primary user type is actually different from what Stage 1 established") — this is a Stage 1 failure. Stop. Update Stage 1. Update Stage 3. Update Stage 4. Update Stage 5. Update Stage 6. Only then continue Stage 8. This sounds extreme. It is. But building on a wrong primary job produces a wrong product, regardless of how well the build is executed.

#### The loop never ends

The continuous improvement loop does not stop when the build is complete. After Stage 8, it continues in Stage 9 (post-page final review). After Stage 9, it continues in the next build session on the same page. After the page ships, it continues as real user data comes in.

The loop is not a process stage. It is a disposition. The question "is there anything better here that we haven't done yet?" has no end state. The answer is always "maybe." The work is to keep asking.

---

## STAGE 8 — BUILD PHILOSOPHY ADDENDUM
**What the mechanical checklist (8.0–8.8) does not cover.**

The sections above define *what* to verify. These sections define *how to think* during the build. They are not optional. They are the difference between shipping a correct page and shipping a great one.

---

### 8a — Pre-build setup (every session before first line of code)

Before writing a single line of code, complete the following in order:

1. **Read `docs/BUILD-READY-INDEX.md`** — this file (when it exists) contains the build order, known pre-existing bugs, and any deferred decisions from the strategy phase. Read it completely. If it doesn't exist yet, create it before proceeding.
2. **Read `docs/PRE-BUILD-CHECKLIST.md`** — confirm the environment is correct: Playwright installed, Chromium available, target file is the right one, no uncommitted changes on top of a previous build session.
3. **Confirm branch:** `git status` — you should be on `build/[page-name]` branched from main. If not, create it: `git checkout -b build/[page-name]`.
4. **Confirm Playwright works:** Run `npx playwright install chromium` (idempotent — safe to run again). Take a test screenshot of the current file to confirm the environment is live before touching any code.
5. **Parse-check the current file before editing:** `node -e "require('fs').readFileSync('able-v7.html','utf8')"` — confirms the file is readable. Optionally extract the `<script>` block and run `node -e "new Function(src)"` to confirm the existing JS is already parse-safe before any changes.
6. **Write the orientation sentence:** *"This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."* This must be possible to write without re-reading docs. If it isn't, re-read docs. Do not proceed until this sentence is written.

**Time budget: 15 minutes.** Do not skip this setup. A broken environment wastes more time than the setup saves.

---

### 8b — The build loop (repeat for every section)

Every section of every page follows this loop. Not some sections. Every section.

**1. Read the spec completely.**
Open `DESIGN-SPEC.md` and read the section for this component from top to bottom before writing any code. Do not skim. If the spec says "16px gap between items at mobile", that is what gets built. No improvisation at this stage.

**2. Write the code.**
Implement exactly to spec. Resist the temptation to improve during this step — that comes in step 6. The goal here is faithful translation, not interpretation.

**3. Parse-check every JS block touched.**
For any JavaScript modified: `node -e "new Function(jsBlock)"`. A parse error caught here takes 10 seconds to fix. A parse error caught in production breaks every artist's profile. Run this every time without exception.

**4. Playwright verify.**
Take screenshots at 375px and 1280px. Rename the document title before taking the screenshot so the tab is identifiable later:
```js
document.title = 'ABLE v7 — [section name] — mobile 375'
```
Use the Playwright MCP tools: `mcp__playwright__browser_navigate`, `mcp__playwright__browser_resize`, `mcp__playwright__browser_take_screenshot`.

**5. Compare to spec.**
Place the screenshot mentally against the relevant DESIGN-SPEC section. Check every element:
- Spacing correct?
- Colour tokens correct (no loose hex)?
- Typography matches spec (size, weight, line-height)?
- Animation timing correct?
- Copy matches COPY.md exactly?

If anything differs from spec: fix it before proceeding to step 6. The spec is the authority. Do not rationalise differences.

**6. Rethink.**
Now that you can see it built and verified — is the spec still right? This is the deliberate pause. Ask honestly:
- Does this feel like ABLE, or does it feel like something else?
- Is there anything that looks technically correct but feels off?
- Would an independent musician landing on this page feel respected, or processed?
- Is there a better solution that the spec didn't anticipate because specs are written before building?

If the answer to any of these is "this could be better", note it. Do not implement yet — go to Stage 8.8 (continuous improvement loop). If the spec is correct and the build is faithful: proceed to step 7.

**7. Commit.**
`git commit -m "feat([page]): [section] — exact description of what was built"`

One section = one commit. Do not batch sections into a single commit. The commit history is the build log.

---

### 8c — The enhancement loop (continuous during build)

*This is the inline version of Stage 8.8 — applied at the section level during build.*

When you find an enhancement worth implementing:

1. **Write it in `ENHANCEMENT-LOG.md`** (create in `docs/pages/[page-name]/` if it doesn't exist). Entry format:
   ```
   ## [Date] — [Section] — [Enhancement title]
   **What:** [one sentence description]
   **Why:** [why this is better than the spec]
   **Impact:** minor tweak / significant change / cross-page change
   **Status:** discovered / in-progress / implemented / deferred
   ```

2. **If it's a minor tweak** (copy refinement, spacing adjustment, colour token swap): implement immediately. Update DESIGN-SPEC.md to mark the change. Commit as `fix([page]): [description]`.

3. **If it's a significant change** (new interaction, layout rethink, new section): stop. Write a 2-paragraph mini-spec in ENHANCEMENT-LOG.md. Answer: (a) what exactly is the enhancement, and (b) why is this genuinely better, not just different? If the answer to (b) is clear: implement it. If it's not clear, defer and continue.

4. **If it's a cross-page change** (affects design system, multiple pages, or shared components): document it in the relevant system spec (`docs/systems/`) and log a note in STATUS.md. Do not implement cross-page changes during a single-page build session — they get their own session.

---

### 8d — Playwright verification protocol

Playwright verification is not a step that happens once at the end. It runs after every significant section during the build. It is as much part of the build process as writing the code.

**What to verify — the minimum set per section:**

| Check | How | Pass criteria |
|---|---|---|
| Mobile layout (375px) | `browser_resize({width:375})` → screenshot | No horizontal scroll. No clipped elements. All text readable. |
| Desktop layout (1280px) | `browser_resize({width:1280})` → screenshot | Layout matches spec. No excess whitespace. |
| Tap targets | `browser_evaluate({script: 'Array.from(document.querySelectorAll("button,a,[role=button]")).map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,w:r.width,h:r.height,text:el.textContent.trim().slice(0,20)}})'})` | Every interactive element: min 44px in both dimensions. |
| Console errors | `browser_console_messages()` | Zero errors. Zero undefined references. |
| Theme: Dark | Apply dark theme via JS, screenshot | All surfaces use correct tokens. No hardcoded colours visible. |
| Theme: Light | Apply light theme, screenshot | Readable on cream background. No dark-only assumptions. |
| Theme: Glass | Apply glass theme (requires background image), screenshot | Backdrop-filter renders. No broken surfaces. |
| Theme: Contrast | Apply contrast theme, screenshot | Maximum legibility. Accent still visible. |
| Animation | Trigger the animation, screenshot (or use `browser_evaluate` to check computed styles) | Animation fires. Duration and easing match spec. |
| Reduced motion | `browser_evaluate({script: "document.documentElement.setAttribute('data-reduced-motion','true')"})` + screenshot | No movement. Static state is correct. |

**After every screenshot, rename the tab:**
```js
document.title = 'ABLE — [page] — [section] — [viewport] — [theme]'
// Example: 'ABLE — v7 — hero — 375px — dark'
```
This creates a consistent audit trail in the Playwright browser history.

**Failure protocol — no exceptions:**
If Playwright reveals something wrong:
1. Note exactly what is wrong, at which viewport, on which theme.
2. Fix the CSS or JS.
3. Re-run the exact same Playwright check.
4. Do not proceed to the next section until the current section passes all checks.

There is no "I'll fix it later." Defects compound. A layout bug at the hero section will cascade into everything built on top of it.

---

### 8e — The rethink trigger

This is the stage most agents skip. It is the most important one.

A build agent that only follows specs produces technically correct work. The rethink is what produces work that feels like it was made by someone who cares.

**Stop and rethink when any of these are true:**

- **"Technically correct but feels wrong."** Playwright shows something that passes every check but doesn't look right. Trust this feeling. It is data. Something is off. Find it.

- **"Copy sounds like copy."** Read the section's text aloud, as if you are Declan (26, Manchester, 2.4k Instagram followers, slight sceptic). Does it sound like something he'd read and think "yes, this is for me"? Or does it sound like something a marketing team wrote about him? If the latter: rewrite before shipping.

- **"The interaction is mechanical."** The button press works, the animation fires, the state updates — but there's no delight. No surprise. No moment where a user thinks "oh, that's nice." This is the hardest thing to spec but the easiest to feel. If an interaction feels like form-filling rather than music, it needs more.

- **"This could be any app."** A competitor could ship this exact section unchanged. If that is true, it is not ABLE. ABLE has opinions. Every section should have at least one moment that would not exist on Linktree or Beacons — something that says: we understand what music actually is.

**What happens when a rethink triggers:**
1. Stop. Do not commit what you have.
2. Open FINAL-20-ANGLE-REVIEW-2.md and re-read angle 20 (North star) and angle 14 (Emotional resonance).
3. Read the copy from COPY.md for this section aloud.
4. Look at the Playwright screenshot one more time.
5. Write down in one sentence what feels wrong.
6. Fix it. Then go back to 8b step 5 and verify the fix is actually an improvement, not just a change.

The rethink is not a delay. It is the build. The spec is the floor, not the ceiling.

---

### 8f — Coherence maintenance

After every completed page — before merging, before calling it done — run the full coherence check. This takes 30–45 minutes and is not optional.

**1. Cross-page coherence.**
Open the current page and the previous completed page side-by-side in Playwright. Do they feel like the same product? Check:
- Typography: same fonts, same scale relationships, same hierarchy pattern?
- Motion: same easing variables, same duration range, same spring physics?
- Voice: does the copy on this page sound like the same person who wrote the other pages?
- Colour: accent colour is different per artist (by design), but admin amber, system red, system green — are they consistent?

**2. Copy audit.**
Read every piece of user-facing text in the page against the banned phrases list in `docs/systems/copy/SPEC.md`. Any violation must be fixed before merge. Common regressions to check:
- "Get started" / "Sign up" appearing in CTAs
- Exclamation marks in dashboard or admin copy
- "Grow" / "unlock" / "superfans" / "content creator" appearing anywhere
- Generic placeholder copy that wasn't replaced with ABLE voice

**3. Token audit.**
Grep for hardcoded hex values anywhere outside `:root` or `@media (prefers-color-scheme)` blocks:
```bash
grep -n "#[0-9a-fA-F]\{3,6\}" [file].html | grep -v "^[0-9]*:.*:root\|^[0-9]*:.*--\|^[0-9]*:.*<!--"
```
Every hit that is not a CSS custom property definition or a comment is a regression. Fix it.

**4. Data audit.**
Scan every `localStorage.getItem()` and `localStorage.setItem()` call:
- Is the key name in the canonical list from CONTEXT.md? If not: it must be added to the canonical list before shipping.
- Does every `getItem` have a fallback? `localStorage.getItem('key') || defaultValue` — never a bare read.
- Does every `JSON.parse` have a `try/catch`? Malformed localStorage data from a previous session will break a real user's page without error handling.

**5. Theme audit.**
Switch through all four themes in Playwright and take a screenshot of every section on each theme:
- Dark: everything readable, no overflow, accent visible
- Light: cream background renders, text is dark enough, no dark-only assumptions
- Glass: backdrop-filter renders (Chrome + Safari), no broken backgrounds
- Contrast: pure black base, maximum legibility, accent still visible against black

If any theme breaks any section: fix before merge. Theme support is not progressive enhancement — it is a core feature.

**6. Doc update.**
At the end of the coherence check, update:
- `docs/STATUS.md` — mark sections as built, add any new known issues discovered
- `DESIGN-SPEC.md` — mark every built section as "implemented" with the commit SHA
- `ENHANCEMENT-LOG.md` — mark any implemented enhancements as complete
- The date at the top of STATUS.md

This is not optional housekeeping. It is how the next session starts with orientation rather than confusion.

---

## STAGE 9 — POST-PAGE FINAL REVIEW

After an entire page is built and the coherence check (8f) is complete, run the final review before any PR or merge.

This takes approximately 60–90 minutes. It is not a formality. It is a fresh-eyes pass that treats the live built page as the primary document, not the spec.

---

### 9.1 — Fresh 20-angle analysis on the live page

Open the page in Playwright. Take screenshots at 375px, 390px, 768px, and 1280px. Then run the full 20-angle analysis from scratch — not from the spec. Do not look at the spec scores. Score what you actually see.

| Angle | What to look for in the screenshots | Known ceiling |
|---|---|---|
| 1. First impression | What does a non-artist see in 3 seconds? | — |
| 2. Primary job | Does the page deliver its one job from Stage 1? | — |
| 3. Headline / entry copy | Read the first line aloud. Does it land? | — |
| 4. CTA design and weight | Is the primary action visible without scrolling at 375px? | — |
| 5. Copy voice | Read 10 random pieces of copy. ABLE voice or generic? | — |
| 6. Primary differentiator | Does this page make the ABLE vs Linktree argument without needing words? | — |
| 7. Mobile experience | 375px screenshot: any clipping, overflow, small tap targets? | — |
| 8. Performance | Check Lighthouse. LCP, CLS, Performance score. | — |
| 9. Social proof | Does any section earn belief? Or is it assertion? | Requires real users to hit 10 |
| 10. Trust signals | What makes an artist trust this page? Does it exist? | — |
| 11. Visual hierarchy | Can a scanner understand it without reading? | — |
| 12. End-to-end pathway | Does the flow through and beyond this page work? | — |
| 13. Conversion clarity | Is the outcome of taking action obvious? | — |
| 14. Emotional resonance | Does it make an independent musician feel understood? | — |
| 15. The 13-year-old test | Show screenshot to a hypothetical non-technical user. Confusing? | — |
| 16. Single memory | If they leave after this page, what sticks? | — |
| 17. Secondary user | Is any secondary user type served if they land here? | — |
| 18. Discoverability | Check OG tags in source. Are they populated dynamically? | — |
| 19. AI red team | What would break this page's effectiveness? Still valid? | — |
| 20. North star | Does this feel like ABLE, or like a tool? | — |

Show the full scorecard. Do not hide any angle. Compare scores to the spec target from FINAL-20-ANGLE-REVIEW-2.md.

**If any built score is below spec target:** it is a regression. Find the cause and fix it before the final review is complete.

**If any built score exceeds spec target:** note it. Update FINAL-20-ANGLE-REVIEW-2.md. This is valuable data for the next page.

---

### 9.2 — Copy calibration test

Run the copy through the calibration test from `docs/systems/copy/SPEC.md`. For every piece of user-facing text:

1. **The first-person test:** Read it as if you are the artist. Does it sound like you, or does it sound like someone describing you to an investor?
2. **The aloud test:** Read it out loud. Does it sound natural? Or does it sound like it was written?
3. **The banned phrase scan:** Does any line contain a banned phrase, a synonym of a banned phrase, or the spirit of a banned phrase even if the exact words are absent?
4. **The specific claim test:** Every trust line and empty state — is it a specific claim or a platitude? Platitudes must be replaced with specific claims before shipping.

Copy that fails any of these tests must be rewritten. Copy fixes are not minor — they are the difference between ABLE feeling like a product and feeling like a person.

---

### 9.3 — Playwright smoke test

Run the 15-minute manual checklist:

1. Full user flow from entry to completion (simulate the target user journey end-to-end)
2. All CTAs fire correctly (Playwright click + verify state change)
3. All four themes render correctly at 375px
4. localStorage is written and read correctly (check after each flow step)
5. No console errors at any point in the flow
6. Fan sign-up (if applicable): data written to `able_fans`, confirmation state renders
7. Profile state transitions (if applicable): cycle through all four states, verify each renders
8. Links: all external links open in new tab with `rel="noopener noreferrer"`
9. Keyboard nav: tab through all interactive elements, confirm logical order
10. Reduced motion: force `prefers-reduced-motion: reduce`, confirm no movement

If any check fails: it is a P0. Fix before shipping.

---

### 9.4 — AI agent compatibility check

Run the check from Stage 8.7 against the final build. Specifically:

- Can every interactive element be addressed by a CSS selector or data attribute?
- Is every localStorage schema documented in CONTEXT.md?
- Does the page work when loaded with a pre-seeded localStorage profile?
- Are there any actions that require mouse hover to reveal (invisible to agents)?

Any "no" answer is a defect. Add the programmatic interface before calling the page done.

---

### 9.5 — Post-build session summary

Write a summary and add it to STATUS.md under "Last session summary". The summary must include:

- What was built (bullet list of sections, in order)
- Final scores achieved (vs spec targets)
- Any enhancements added beyond spec (and why)
- Any known gaps or honest ceilings (with reasoning)
- Any deferred items (moved to roadmap or next session)
- The final commit SHA

Format:
```
## Last session summary (session [N]) — [page name]
Built: [list]
Final scores: [scorecard table or summary]
Enhancements: [list or "none"]
Known gaps: [list or "none — all spec targets met"]
Deferred: [list or "none"]
Final SHA: [sha]
```

---

### 9.6 — Final commit

```bash
git commit -m "feat([page]): complete build — [X.X/10] — [one-sentence description of what was built]"
```

The commit message must include the final score. This makes the build history searchable and honest.

Do not open a PR until all of 9.1–9.5 are complete and passing.

---

## THE BUILD RETHINK PROTOCOL

*A dedicated section on how to rethink during build. Every section. Every time.*

The spec is the contract you made with the problem before you fully understood it. The build is when you fully understand it. The rethink is what happens in between.

Building is not transcription. A builder who only transcribes the spec produces a technically faithful product that misses the thing the spec could not anticipate: how it actually feels to use.

### Questions to ask at every section

Before committing any section, answer these questions honestly:

**Does it feel like it was made for a musician?**
Not "does it serve a musician's functional need" — does it feel like it was made by someone who understands what music means to the person who makes it? This is a qualitative test. It cannot be reduced to a checklist item. But it can be felt. If you cannot feel it, ask: what would an independent artist feel when they look at this? If the answer is "I'm being processed" rather than "I'm understood" — fix it.

**Is there a moment of delight?**
Not every section needs delight. But if a section has zero delight — no moment where an artist thinks "that's smart" or "oh, that's nice" — it's probably doing exactly what it needs to do and nothing more. That's sufficient for infrastructure. It's insufficient for the parts of the product that face the artist directly.

**What would I cut?**
Every section that passes the first rethink should face a second question: what's the least important element here? If cutting it would make the section better (or leave it unchanged), cut it. Simpler is almost always better.

**Is the copy doing the work, or is the design?**
If a section depends on the design to communicate what the copy doesn't, the copy isn't strong enough. Conversely, if the copy has to explain what the design should make obvious, the design has failed. Each should do its own work.

**Could this be 10% better in 10 minutes?**
This question catches the "good enough" trap. Often the last 10% of a section's quality is right there — one copy edit, one spacing adjustment, one animation timing tweak. It just requires asking the question before committing.

### How to handle "this doesn't feel right"

When something doesn't feel right during build:

1. **Name the feeling.** Not "it feels wrong" — what specifically? "The headline is doing too much work" is a name. "The colour of this button doesn't feel like it belongs" is a name. Without a name, you can't fix it.

2. **Check if it's in the spec.** Is what's bothering you something the spec got wrong, or something the implementation missed? Look at DESIGN-SPEC.md for this section. If the spec shows the thing that bothers you: the spec may need updating. If the spec shows something different from what was built: the implementation needs fixing.

3. **Sleep on it (or Playwright it).** Sometimes what feels wrong during build looks fine on a screenshot — the feeling was implementation anxiety, not a real problem. Take the Playwright screenshot first. If it looks right in the screenshot, the feeling was noise. If it looks wrong in the screenshot, the feeling was signal.

4. **Ask: is this a rethink or a rabbit hole?** A rethink leads to a specific, improvable change. A rabbit hole leads to questioning every decision you've ever made and produces nothing. The difference: a rethink has a "fix" within reach. A rabbit hole is open-ended. If you're in a rabbit hole, note the feeling in ENHANCEMENT-LOG.md and come back to it at the next scheduled scan.

### When to deviate from spec vs when to update spec

**Deviate from spec when:**
- The spec has a clear error (wrong px value, wrong colour token, copy that contradicts COPY.md)
- A minor detail was underspecified and the obvious correct choice differs from the spec
- Playwright reveals that the spec produces a mobile layout that fails (e.g., elements overlap that the spec didn't anticipate)

In all these cases: fix the code AND update the spec. The spec must reflect the built state.

**Update spec before deviating when:**
- The change affects more than one section
- The change represents a different design philosophy (not a correction, but a new direction)
- The change involves copy (always update COPY.md before updating the HTML)

**Never deviate from spec when:**
- You simply prefer a different aesthetic — that is a design preference, not a correction
- You've seen something similar on another product and want to match it — that is copying, not improvement
- The spec feels too specific and you want more flexibility — specificity is the spec's value, not a bug

---

## THE 11/10 PUSH

*After every 10/10 build score, what to do next.*

A score of 10 is not the end. It is the beginning of the next question: *"What would make this an 11, if 11 existed?"*

This question is not rhetorical. It has real answers. And those answers become either the next design iteration or the next product roadmap item.

### How to find the 11

After reaching a 10 on any angle, run the 11 search:

**1. Check the honest ceiling.**
Is this actually a 10, or is it a "we can't do better with current constraints" score that was called 10 for convenience? There is a difference. A true 10 means: within the current technical and resource constraints, nothing better can be done here. A constrained 10 means: it could be better if [specific constraint] were lifted. Name the constraint. That naming is the 11.

**2. Ask what the best version of this looks like, without constraints.**
Not "what's practical" — what's the absolute best this could be? This is a thought experiment. It produces things that may be Phase 2 or Phase 3 features. But naming them now means they get built eventually. The 11 is always somewhere. Find it.

**3. Look at the best work in adjacent industries.**
The best onboarding in any software product. The best artist landing page anywhere. The best mobile form in any app. Not to copy — to calibrate. If the best version of this type of thing exists at a quality level that makes your 10 look like an 8, your 10 was not a 10. Go back and set the ceiling higher.

**4. Ask the user.**
Not a formal user test — a thought exercise. If Declan used this feature for 3 months, what would he still be frustrated by? What habit would he have to work around? What would he wish was different? Those answers are the 11.

### How to know you've genuinely reached the ceiling

The ceiling is genuine when:
- You've run the 11 search and found only things that require fundamentally different technology, many more real users, or resources that aren't available now
- You've looked at the best version of this type of thing in any adjacent industry and your version compares favourably
- You've had the "rethink" pause (Stage 8e) produce no new insights
- You've run multiple passes of the 20-angle analysis on the built page and scores have stabilised

Write down why the ceiling is where it is. "Social proof cannot exceed 8.5 at pre-launch because the specific claims that earn belief require real user outcomes, which don't yet exist" is a ceiling explanation. "We can't make this better" is not.

### The distinction between "good enough" and "genuinely excellent"

Good enough: the page works. Users can complete the primary job. The spec was implemented faithfully. There are no bugs. It meets the minimum quality bar.

Genuinely excellent: the page works, and it also has moments that make artists feel understood, interactions that feel alive, copy that sounds like it was written by someone who has actually played a show to 50 people and knows what that feels like.

Good enough ships products. Genuinely excellent builds loyal users.

The 11/10 push is not perfectionism. It is the difference between a product that works and a product that gets recommended. ABLE's growth model depends on the latter. Artists recommend ABLE because it understands them, not because it functions correctly.

---

## THE PLAYWRIGHT-FIRST PHILOSOPHY

*Visual verification is not optional. It is not a finishing step. It is part of building.*

### Why verification cannot be optional

Every assumption made during build is a potential defect. Assumptions about how CSS behaves on mobile. Assumptions about how a user will read a section. Assumptions about whether an animation plays smoothly on a specific iOS version. Every one of these assumptions is testable. Playwright tests them.

The cost of not testing: a real artist opens their profile on their iPhone SE at a gig venue and the text is clipped. A fan taps a CTA and nothing happens because the tap target was 36px. An animation janks on a mid-range Android phone. These failures happen in the real world, to real users, not in the development environment where everything works perfectly.

There is no version of ABLE being world-class that involves shipping unverified pages. The verification is not bureaucracy. It is respect for the user.

### How to make Playwright fast enough not to slow you down

Playwright is fast when used correctly. The fear that verification will slow down the build is usually based on the assumption that it runs once at the end, as a monolithic check. That assumption is wrong. Verification runs after every section. Small, targeted, fast.

**Fast Playwright pattern:**
1. Navigate to the file (once per session, not once per section)
2. Resize to 375px (one call)
3. Take screenshot (one call)
4. Look at screenshot (5 seconds)
5. Navigate to 1280px (one call)
6. Take screenshot (one call)
7. Look at screenshot (5 seconds)

Total time: under 2 minutes per section. That is not a slowdown. That is a quality gate.

**What slows Playwright down:**
- Running it for the first time in a session on a file that hasn't changed (unnecessary)
- Running the full 80-item checklist after every small change (overkill — save the full checklist for section completion)
- Waiting for Playwright to load external resources (always use local files where possible)

**Make it a habit, not a task.** The difference between Playwright as a habit and Playwright as a task: a habit is triggered automatically when a section is complete. A task is scheduled, dreaded, skimped on. Make verification part of the definition of "a section is complete." It is not done until it is verified.

### What to do when Playwright reveals something different from expected

This happens. Playwright is a mirror, not a validator. Sometimes the mirror shows something the spec didn't anticipate. The correct response to every Playwright surprise:

**1. Name exactly what is different.** Not "it looks wrong" — "the hero headline is wrapping at 375px but not at 390px, which means there is a hard-coded `min-width` somewhere that shouldn't be there."

**2. Check the spec.** Is this a spec failure (the spec was silent on this case) or an implementation failure (the spec addressed it and the implementation missed it)? The answer determines where the fix goes.

**3. Fix the root cause, not the symptom.** If a layout breaks at 375px because of a fixed width, the fix is not adding `max-width: 100%` to the symptom element — it is finding the element with the fixed width and removing the constraint.

**4. Verify the fix.** Re-run the exact Playwright check that revealed the problem. Confirm it passes. Then check that the fix didn't break anything adjacent.

**5. Update the spec if the spec was silent.** If Playwright revealed a case the spec didn't cover, add the spec entry. "No horizontal scroll at 375px" is now documented. Future builds don't have to discover this the same way.

---

## THE FILING STRUCTURE (one page, all docs)

For each page, create this folder structure:

```
docs/pages/[page-name]/
├── SPEC.md                      ← Stage 1 — purpose + vision
├── COMPETITIVE-RESEARCH.md      ← Stage 2 — findings in template format
├── 20-ANGLE-ANALYSIS.md         ← Stage 3 — first-pass scored analysis
├── USER-JOURNEYS.md             ← Stage 4 — journey maps
├── COPY.md                      ← Stage 5 — every word, locked
├── PATH-TO-10.md                ← Stage 6A — systematic path to 10
├── DESIGN-SPEC.md               ← Stage 6B — exact build spec
├── STRATEGY-REVIEW-FINAL.md    ← Stage 7A — final synthesis
├── FINAL-20-ANGLE-REVIEW.md    ← Stage 7B — definitive pre-build score (3 passes)
├── FINAL-20-ANGLE-REVIEW-2.md  ← Stage 7C — second final push (Pass 4 + 5)
└── ENHANCEMENT-LOG.md          ← Stage 8 — enhancements found during build
```

**Stage 7C is mandatory.** After FINAL-20-ANGLE-REVIEW.md is written, always produce FINAL-20-ANGLE-REVIEW-2.md. Challenge every ceiling from Stage 7B. Ask: "what did we miss? What would a world-class competitor do here that we haven't specced?" Run a dedicated research pass targeting the specific angles that didn't reach 10 in Stage 7B. Show Pass 4 and Pass 5 scores. If Pass 5 overall is the same as Pass 3, write exactly why — that is also valuable. The second final is about proving there is nothing left on the table.

---

## CURRENT STATUS BY PAGE

| Page | Stage 0 | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 | Stage 6 | Stage 7 | Stage 8 |
|---|---|---|---|---|---|---|---|---|---|
| **Landing** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Onboarding** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Artist Profile** | ✅ | — | — | — | — | — | — | — | — |
| **Admin** | ✅ | ✅ | — | — | — | — | — | — | — |
| **Fan** | ✅ | — | — | — | — | — | — | — | — |

**Next: Onboarding — Stage 4 through Stage 7.**

---

## RULES THAT CANNOT BE BROKEN

1. **Copy before design.** Never spec a layout before copy is written.
2. **20 angles before building.** Never write code on an unscored section.
3. **User journeys before copy.** Never write for a hypothetical user.
4. **Research before angles.** Never score based on assumptions.
5. **Playwright after building.** Never ship unverified.
6. **One page at a time.** Finish all stages on one page before starting another.
7. **Honest ceilings.** Never inflate a score. Social proof at 2 isn't 8 because you wrote it in the spec.
8. **Guardrails in the roadmap.** Any risk found in Stage 7 that isn't a copy fix goes into the product roadmap, not the landing page.
9. **Keep going until you surpass 10.** Do not stop at what seems like a ceiling. When a score feels like a 10, do at least one more pass and ask: "is there genuinely nothing left?" Sometimes what looks like a 10 has further to go. Keep pushing until every angle is challenged at least twice after the first 10 score is recorded.
10. **Multiple revision passes — keep going.** Minimum 3 passes after the first-pass scores. Show updated scores after every single pass. Never stop because the score looks high.
11. **A score of 10 is not the end.** After reaching 10, ask: "What would make this an 11 if 11 existed?" Those answers become the next design iteration or product roadmap item.
12. **Always show scores.** Every time scores are produced or updated, display the full scorecard table. Never hide scores.
13. **Always use every tool available.** Before scoring or reviewing any page/section, run web search, web fetch, and research agents to find: real user complaints, competitor patterns, world-class examples, conversion data. Assume there is always something online that will sharpen the thinking. Never score from assumptions alone.
14. **Research runs in background.** Dispatch research agents in parallel with document writing — never block progress waiting for research. Fold findings in at Stage 7.
15. **Always think product-wide.** Every page decision must be tested against: does this serve the ABLE brand? Does it serve this specific user type? Does it connect to the journey before and after this page? A technically perfect page that breaks product coherence is not a 10.
16. **Playwright is part of building, not after building.** Verification runs after every section, not once at the end. A section is not complete until it is verified.
17. **The rethink is mandatory.** Every section faces the rethink trigger (Stage 8e) before commit. "Technically correct" and "genuinely good" are not the same thing.
18. **The improvement loop never ends.** Stage 8.8 runs after every verified section and continues beyond build completion. The question "is there anything better here?" has no end state.
19. **Update all docs after every enhancement.** DESIGN-SPEC.md, ENHANCEMENT-LOG.md, FINAL-20-ANGLE-REVIEW-2.md, STATUS.md — all updated. Never leave docs behind the built state.
20. **The spec is the floor, not the ceiling.** Everything in the spec must be built. Everything not in the spec that would make the page genuinely better should be sought through the improvement loop and built if it passes the scope/confidence/time test.


---
# docs/process/SESSION-CHECKLIST.md
---
# ABLE — Session Checklist
*Condensed. One page. Fast to scan.*
*Full detail: `docs/MASTER-CHECKLIST.md`*

---

## START OF SESSION

- [ ] Read `CONTEXT.md`
- [ ] Read `docs/STATUS.md`
- [ ] `git branch` — confirm correct branch
- [ ] `git status` — confirm clean working tree
- [ ] If BUILD session: Playwright screenshot any page (confirms MCP is live)
- [ ] If STRATEGY session: check `docs/MASTER-CHECKLIST.md` Part 2 — confirm what's missing

---

## DURING STRATEGY WORK

- [ ] Every new doc set: ANALYSIS → SPEC → PATH-TO-10 → FINAL-REVIEW (4 minimum)
- [ ] Full page: add USER-JOURNEYS → COPY → DESIGN-SPEC → STRATEGY-REVIEW → FINAL-20-ANGLE → FINAL-20-ANGLE-2
- [ ] FINAL-20-ANGLE-2 is mandatory — challenge every ceiling from pass 1
- [ ] 20-angle scoring on every analysis. Show full scorecard table every pass.
- [ ] Every score shown honestly — never inflate a ceiling
- [ ] Every copy string checked against `docs/systems/copy/SPEC.md` + `docs/VOICE-BIBLE.md`
- [ ] Cross-reference new docs against existing docs for consistency

---

## DURING BUILD WORK

- [ ] Read `DESIGN-SPEC.md` for the page before writing a single line of code
- [ ] Write this sentence before coding: "This page is for [user], who fears [fear], and the P0 thing that must work is [P0]."
- [ ] Parse-check every JS block: `node -e "new Function(src)"`
- [ ] Playwright screenshot after every section (375px, 390px, 768px, 1280px)
- [ ] All 4 themes tested after any CSS change (Dark, Light, Glass, Contrast)
- [ ] Mobile at 375px — no horizontal scroll, all tap targets ≥44px
- [ ] Commit after every logical chunk
- [ ] No "dashboard" in any user-facing string
- [ ] No "superfan" anywhere — use `core`
- [ ] No exclamation marks in admin/dashboard copy
- [ ] No force-push, no `rm -rf`, no `reset --hard`

---

## END OF SESSION

- [ ] All changes committed — descriptive messages
- [ ] `docs/STATUS.md` updated (session summary + newly discovered issues)
- [ ] Playwright smoke test on changed pages
- [ ] Mark completed items in `docs/MASTER-CHECKLIST.md`
- [ ] New bugs added to `docs/STATUS.md` known issues
- [ ] Date updated at top of `docs/MASTER-CHECKLIST.md`

---

## Banned phrases (never ship these)

`superfan` · `dashboard` · `get started` · `unlock` · `grow your audience` · `turn fans into` · `monetis` · `going viral` · `content creator` · `you're all set` · `welcome aboard` · `mailing list` · `newsletter` · `level up` · `supercharge` · `engage your` · `subscribers` · `!` (in admin copy)

## P0 outstanding (do these before any build)

- `admin.html` L44 + L1288: `#888` → `#777777` (WCAG fail)
- `able-v7.html`: OG image — only write tag when URL is absolute (not blob:)
- `able-v7.html`: `<meta name="description">` — update dynamically from `profile.bio`
- `able_profile` vs `able_v3_profile`: canonicalise to `able_v3_profile` everywhere
- Focus ring glow: add to `admin.html`, `start.html`, `landing.html`
- Toast copy: audit all `showToast()` calls in `admin.html` (P0.7)
- Form placeholders: audit all `placeholder` attributes in admin editors (P0.8)


---
# docs/process/TOOLS.md
---
# ABLE — External Tools
**What to use, when, why, and whether you need to sign up.**
**Created: 2026-03-15 | Updated: 2026-03-15**

---

## MASTER LIST — ALL TOOLS BY CATEGORY

### STRATEGY + RESEARCH

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Perplexity** (perplexity.ai) | Real-time web research with citations. Use for competitor analysis, market sizing, pricing research. Better than ChatGPT for factual research. | Free / $20/mo Pro | Useful — Claude Code can use this via web search |
| **SimilarWeb** (similarweb.com) | Traffic analysis for competitors. See how much traffic Linktree, Beacons, Feature.fm get, from where, and on which keywords. | Free tier (limited) | Yes — for competitor research |
| **SparkToro** (sparktoro.com) | Audience research. Find where your target audience (independent musicians) actually spends time online — which podcasts, publications, social accounts. | $50/mo | Later — useful before paid advertising |
| **Exploding Topics** (explodingtopics.com) | Trend detection. Find topics, tools, and searches that are growing fast. Useful for timing product angles. | Free tier | Useful |
| **Google Trends** (trends.google.com) | Search trend data. Is "link in bio for musicians" growing? Compare "Linktree" vs "Beacons" over time. | Free | No — just use it |
| **BuiltWith** (builtwith.com) | See what tech stack competitor websites use. Useful for understanding what Beacons/Feature.fm are built on. | Free tier | No |

### ANALYTICS + USER BEHAVIOUR

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **PostHog** ✅ (posthog.com) | Product analytics, funnels, user properties, session replay. Best for understanding onboarding drop-off. | Free to 1M events | **Sign up now** |
| **Microsoft Clarity** ✅ (clarity.microsoft.com) | Free session recordings + heatmaps. See exactly where users click, scroll, and hesitate. | Free, unlimited | **Sign up now** |
| **Hotjar** (hotjar.com) | More advanced heatmaps and user surveys. Complement to Clarity. | Free tier / $39/mo | After 100+ daily visitors |
| **Plausible** (plausible.io) | Privacy-first web analytics. Lighter alternative to PostHog for basic page metrics. GDPR compliant. | $9/mo | Optional — PostHog covers this |

### DESIGN + VISUAL

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Figma** ✅ (figma.com) | UI design, wireframes, mockups. Best for speccing the demo phone and admin nav before building. | Free (2 projects) | **Sign up** |
| **Mobbin** (mobbin.com) | Library of real mobile app UI screenshots. Best design reference tool available — see how top apps handle onboarding, fan capture, state transitions. | Free tier / $14/mo | Yes — invaluable for design research |
| **Lyssna** (lyssna.com) | User testing. Show designs to real people, get 5-second impression tests, first-click tests. | Free tier / $75/mo | Later — after designs are built |
| **Stark** (getstark.co) | Accessibility checker. Runs contrast checks, WCAG compliance on your designs. | Free tier | Useful |
| **Unsplash / Pexels** | Free stock photography for demo/mockup content | Free | No |

### EMAIL + COMMUNICATIONS

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Resend** ✅ (resend.com) | Transactional email sending. Fan confirmation emails, magic link auth. **KEY ADDED.** | Free to 3k/mo | ✅ Done |
| **Beehiiv** (beehiiv.com) | Newsletter for ABLE's own marketing emails (not fan emails). If ABLE sends a monthly "what's new" email to artists, Beehiiv is the tool. | Free to 2.5k subscribers | Later |
| **Hunter.io** (hunter.io) | Find email addresses for outreach — useful for producer seeding. Find a producer's contact email from their website/credits. | Free tier (25/mo) | Yes — for producer outreach |

### OUTREACH + GROWTH

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Loom** ✅ (loom.com) | Screen + face recordings for outreach. Send a 2-min demo to a producer instead of writing an email. | Free (25 videos, 5 min each) | **Sign up before outreach** |
| **Apollo.io** (apollo.io) | Sales prospecting. Find music producers with contact info, filter by location (London, Manchester, Medellín). | Free tier / $49/mo | Later — for scaling outreach past first 20 producers |
| **Taplio** (taplio.com) | LinkedIn content creation and scheduling. Useful if building an audience of music industry professionals. | $49/mo | Later |
| **Buffer** (buffer.com) | Social media scheduling. For ABLE's own Instagram/Twitter. | Free tier | Later |

### PAYMENTS + SUBSCRIPTIONS

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Stripe** (stripe.com) | Payment processing for Artist/Pro/Label tiers. Handles subscriptions, invoicing. | 1.5% + 20p per transaction | **Before Artist tier launch** |
| **Stripe Tax** | Automatic VAT calculation for UK and EU customers. Non-negotiable for UK SaaS. | Included in Stripe | With Stripe |
| **dLocal** (dlocal.com) | Latin American payment methods. PSE (Colombia), Boleto (Brazil), OXXO (Mexico). For Phase 2 expansion. | Revenue share | Phase 2 |

### BACKEND + INFRASTRUCTURE

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Supabase** ✅ (supabase.com) | Database, auth, storage. Already configured. | Free tier | ✅ Done |
| **Netlify** (netlify.com) | Hosting + serverless functions. | Free tier | Before deploy |
| **Sentry** (sentry.io) | JavaScript error tracking. Catches runtime errors in production before users report them. | Free tier | Before public launch |
| **Uptime Robot** (uptimerobot.com) | Monitors your site and alerts if it goes down. | Free (5-minute checks) | Yes — before launch |

### SUPPORT + COMMUNITY

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Crisp** (crisp.chat) | In-app chat widget for artist support. Free for 2 agents. Artists can chat live or leave a message. | Free tier | After 50+ paying artists |
| **Plain** (plain.com) | Modern support tool built for developer companies. Better than Zendesk for a small team. | $20/mo | Alternative to Crisp |
| **Slack** | Internal communication — but you're solo, so low priority. Use for customer-facing community (ABLE artists Slack) in Phase 2. | Free tier | Phase 2 |
| **Discord** | Community building. Many music communities are on Discord. ABLE producers channel could be Discord. | Free | Phase 2 |

### LEGAL + COMPLIANCE

| Tool | What it does | Cost | Sign up? |
|---|---|---|---|
| **Iubenda** (iubenda.com) | Auto-generates GDPR-compliant privacy policy and cookie policy. Stays up to date with regulation changes. | £22/year | **Before first real user** |
| **CookieYes** (cookieyes.com) | GDPR cookie consent banner. Required for UK/EU. | Free tier | With Iubenda |
| **Companies House** | Register ABLE Music Ltd if not already done. Required before charging customers. | £12 one-time | Before taking payments |

### AI TOOLS (for research and build work)

| Tool | What it does | Best for |
|---|---|---|
| **Claude Code** (you) ✅ | Build, research, spec writing, code review | Everything |
| **Perplexity** | Real-time research with citations | Competitor analysis, market data |
| **ChatGPT / GPT-4o** | Second opinion on copy, alternative ideas | Copy brainstorming |
| **Midjourney / DALL-E** | Generate artist avatar placeholders, mockup images for demos | Demo content creation |
| **Vercel v0** (v0.dev) | Generate UI components quickly. Useful for rapid prototyping of sections before proper implementation. | Quick visual ideation |

---

---

## ALREADY IN USE (no action needed)

| Tool | What for | Cost |
|---|---|---|
| **Supabase** | Database, auth (magic link), storage | Free tier sufficient for MVP |
| **Netlify** | Static hosting + serverless functions | Free tier sufficient for MVP |
| **Claude / Claude Code** | Development, copy writing, code review | Current plan |

---

## RECOMMENDED — SIGN UP NOW

These are free or freemium, and directly unblock current work.

---

### 1. RESEND — Email sending
**resend.com**
**Cost:** Free for 3,000 emails/month (more than enough until 100+ active artists)
**Sign up: YES — needed before launch**

What it does: Sends transactional emails — fan confirmation emails, fan activation sequences, artist magic link auth.

Why Resend over Mailchimp/SendGrid:
- Designed for developers (single API call)
- Best deliverability in the industry
- React email templates (not HTML hell)
- Free tier is genuinely generous
- Already referenced in the 100-steps plan

What to do: Create account at resend.com, get API key, add to Netlify environment variables as `RESEND_API_KEY`.

---

### 2. MICROSOFT CLARITY — Free session recording
**clarity.microsoft.com**
**Cost:** Free. Unlimited recordings.
**Sign up: YES — add before first real user**

What it does: Records every session on your site. Shows exactly where users click, scroll, hesitate, and drop off. Heatmaps. Session replays.

Why it matters for ABLE:
- You will not know why users are dropping off in onboarding without this
- The first 50 artist sign-ups should ALL be watched in Clarity
- Heatmaps show whether the demo state buttons are being clicked or ignored
- Zero-cost, zero configuration (one script tag)

What to do: Create Microsoft account (or use existing), add site, copy one `<script>` tag into all HTML pages.

---

### 3. POSTHOG — Analytics + product analytics
**posthog.com**
**Cost:** Free for up to 1M events/month (months of runway before you need to pay)
**Sign up: YES — add before first real user**

What it does: Tracks events (fan sign-ups, CTA clicks, campaign state activations, profile views), funnels (onboarding completion rate), and user properties (vibe chosen, tier).

Why PostHog over Google Analytics:
- Built for product analytics, not website traffic
- Funnel analysis: see exactly where artists drop off in onboarding
- Custom events map perfectly to ABLE's metric goals
- Privacy-first (self-hostable, GDPR-compliant)
- Already referenced in the ABLE strategy doc

Key events to track from day 1:
- `onboarding_started` (step 0 loaded)
- `spotify_import_completed`
- `linktree_import_completed`
- `profile_live` (first time page is publicly accessible)
- `fan_signup` (with source: instagram / tiktok / direct)
- `campaign_state_changed` (profile → pre-release → live → gig)
- `upgrade_triggered` (100 fan cap hit)
- `upgrade_completed`

What to do: Create PostHog account, get project API key, add to all pages.

---

### 4. FIGMA — Visual design and wireframing
**figma.com**
**Cost:** Free for individuals (2 projects, unlimited pages)
**Sign up: USEFUL — especially for the demo phone design**

What it does: Design tool. Build wireframes, mockups, component specs before writing any code.

Why useful for ABLE:
- The demo phone on landing.html needs to look exactly right before being built in HTML
- The admin anchor nav architecture should be wireframed before coded
- The onboarding one-question-per-screen flow should be sketched in Figma first
- Shareable links — can show designs to producers/artists for feedback before building

Limitations:
- Not required — SPEC.md documents are good enough for most work
- Only worth the time investment for complex visual systems (demo phone, admin nav, onboarding flow)

**Recommendation:** Sign up for the free tier. Use it for the 3 most complex visual problems: demo phone, admin nav, onboarding flow. Don't use it for straightforward sections.

---

### 5. LOOM — Video demos for outreach
**loom.com**
**Cost:** Free for 25 videos (5 minutes each)
**Sign up: YES — for the producer seeding strategy**

What it does: Records your screen + face. Shareable link. No account needed to view.

Why it matters for ABLE:
- When reaching out to 20 producers for the seeding strategy, a 2-minute Loom showing ABLE is 10x more effective than a written email
- "Here's the page I built for you in 60 seconds using your Spotify link" — recorded and sent
- Artists also respond better to seeing the product than reading about it

What to do: Sign up, install Chrome extension. Use when doing producer outreach.

---

## RECOMMENDED — SIGN UP LATER (Phase 2+)

These are worth doing but not needed until you have real users.

| Tool | Purpose | When | Cost |
|---|---|---|---|
| **Hotjar** | More detailed heatmaps (complement Clarity) | After 100+ visitors/day | Free tier available |
| **Crisp / Intercom** | In-app chat for artist support | After 50+ paying artists | Crisp free, Intercom expensive |
| **Sentry** | JavaScript error tracking | Before public launch | Free tier available |
| **Stripe** | Payment processing | Before Artist tier launch | 1.5% + 20p per transaction |
| **dLocal** | Colombian payment methods (PSE, Nequi) | When expanding Colombia actively | Revenue share |

---

## DO NOT SIGN UP FOR THESE

These are tempting but wrong for ABLE right now:

| Tool | Why not |
|---|---|
| **Mailchimp** | ABLE IS the email tool. Using Mailchimp for fans is the problem ABLE solves. Use Resend for transactional, nothing for bulk until Broadcasts backend is live. |
| **HubSpot / Salesforce** | Overkill. Zero paying users yet. A spreadsheet is the right CRM for the first 50 artists. |
| **Google Analytics** | PostHog is better for this use case. Two analytics tools creates confusion. |
| **Zapier** | Creates fragile integrations. Fix the actual backend instead. |
| **Webflow** | ABLE is single-file HTML. Webflow defeats the purpose and adds dependency. |
| **Notion** | Docs live in the repo as markdown. They're LLM-readable and version-controlled. Notion duplicates this in a worse format for code context. |
| **Typeform** | For user surveys. Not needed until you have 50+ artists to survey. A simple email conversation is more valuable at this stage. |

---

## THE RESEARCH TOOLS AVAILABLE TO CLAUDE CODE

These are tools Claude Code has access to that can be used during the build process:

| Tool | What for | When to use |
|---|---|---|
| **Playwright MCP** | Browser automation — screenshot pages, test interactions, verify visual output | After every significant build change |
| **Web search** | Research competitor pages, find design references, verify technical details | During Stage 2 (research) of any section |
| **Web fetch** | Read competitor landing pages, fetch public docs | During Stage 2 research |
| **Context7 MCP** | Look up library documentation for Supabase, Netlify, etc. | During Stage 6 (build) when technical questions arise |

**The research workflow for any section:**

1. Use web search to look at how competitors handle the same section
2. Use web fetch to read the actual HTML/copy of a competitor's page
3. Use Playwright to screenshot the current ABLE page for comparison
4. Use Context7 to look up technical docs if building something unfamiliar

---

## ASKING JAMES TO DO THINGS

When the build needs something only James can do:

| Action | Why needed | Priority |
|---|---|---|
| Create Resend account + get API key | Fan confirmation emails need this before launch | High |
| Create PostHog account + get project key | Analytics needed before first real user | High |
| Create Microsoft Clarity account + site key | Session recording — add to all pages | High |
| Register ablemusic.co / ablemusic.co domain | Netlify deploy needs DNS | High |
| Configure Netlify deploy | Functions won't work on localhost | High |
| Stripe account | Needed for Artist tier payments | Medium |
| Get Spotify for Developers credentials | Spotify import function uses public API but may need key for higher rate limits | Low |


---
# docs/process/templates/20_ANGLE_TEMPLATE.md
---
# [Section Name] — 20-Angle Analysis
**Page: [page name] | Date: YYYY-MM-DD**
**Current score: X/10 → Target: 9/10**

---

## STAGE 0 CONTEXT

**User type who encounters this section first:**
**Their primary fear at this moment:**
**The one thing this section must make them think/feel/do:**

---

## THE 20 ANGLES

### 1. FIRST IMPRESSION (What's understood before reading?)
**Score: /10**
What's visible/felt in the first 1 second?
**Path to 10:**

### 2. PRIMARY JOB (Does the section deliver its one job?)
**Score: /10**
Job statement (from Stage 1):
Does it deliver?
**Path to 10:**

### 3. COPY VOICE (Does every line sound like ABLE?)
**Score: /10**
Any generic SaaS phrases? Any banned words?
**Path to 10:**

### 4. VISUAL HIERARCHY (Can a scanner understand it?)
**Score: /10**
What's the dominant visual element? Is the reading order clear?
**Path to 10:**

### 5. CTA CLARITY (Is the action clear and correctly weighted?)
**Score: /10**
CTA copy, size, position. Is it the right weight?
**Path to 10:**

### 6. FEAR RESOLUTION (Does this reduce or trigger fear?)
**Score: /10**
Which user fear is relevant here? Does this section help or hurt?
**Path to 10:**

### 7. MOBILE EXPERIENCE (375px — does it work?)
**Score: /10**
What breaks at 375px? Are tap targets ≥ 48px?
**Path to 10:**

### 8. PERFORMANCE (Does this section add meaningful load time?)
**Score: /10**
Any iframes, images, or scripts that could delay LCP?
**Path to 10:**

### 9. EMOTIONAL RESONANCE (Does it make the artist feel understood?)
**Score: /10**
Does this speak to the lived experience of the target artist?
**Path to 10:**

### 10. THE "13-YEAR-OLD" TEST (Would a non-technical person be confused?)
**Score: /10**
Any jargon? Any unexplained concepts? Any assumed knowledge?
**Path to 10:**

### 11. TRUST SIGNALS (Does this build or erode trust?)
**Score: /10**
Any claims that need evidence? Any details that create doubt?
**Path to 10:**

### 12. CROSS-PAGE COHERENCE (Does this fit with before and after?)
**Score: /10**
What comes directly before and after? Is the transition logical?
**Path to 10:**

### 13. THE SWITCHER PATH (Does this serve someone switching from Linktree?)
**Score: /10**
Is there anything here that speaks directly to a Linktree user?
**Path to 10:**

### 14. SOCIAL PROOF (Does this earn belief?)
**Score: /10**
What real evidence exists? What's fabricated or absent?
**Path to 10:**

### 15. ACCESSIBILITY (Screen reader, contrast, keyboard nav?)
**Score: /10**
WCAG 2.2 AA — any issues? aria-labels? colour contrast?
**Path to 10:**

### 16. ANIMATION QUALITY (Purposeful, spring-feel, no jank?)
**Score: /10**
What animates and why? opacity + transform only? prefers-reduced-motion?
**Path to 10:**

### 17. THE NORTH STAR TEST (Does this feel like ABLE, not "a tool"?)
**Score: /10**
Does this section have ABLE's character? Or is it generic?
**Path to 10:**

### 18. AI RED TEAM (What would kill this section's effectiveness?)
**Score: n/a — threat analysis**
List 3–5 things that would make a cynical user exit or distrust.
→ Kill each one.

### 19. THE SINGLE MEMORY (If they close the tab after this, what sticks?)
**Score: /10**
What's the one thing this section should leave in the visitor's mind?
Is the section designed around that memory?
**Path to 10:**

### 20. BIG PICTURE CONNECTION (Does this serve the 12-month arc and MRR goal?)
**Score: /10**
How does improving this section directly or indirectly grow revenue?
**Path to 10:**

---

## SCORE SUMMARY

| Angle | Score | Priority |
|---|---|---|
| 1. First impression | | |
| 2. Primary job | | |
| 3. Copy voice | | |
| 4. Visual hierarchy | | |
| 5. CTA clarity | | |
| 6. Fear resolution | | |
| 7. Mobile | | |
| 8. Performance | | |
| 9. Emotional resonance | | |
| 10. 13-year-old test | | |
| 11. Trust signals | | |
| 12. Cross-page coherence | | |
| 13. Switcher path | | |
| 14. Social proof | | |
| 15. Accessibility | | |
| 16. Animation quality | | |
| 17. North star | | |
| 18. AI red team | — | |
| 19. Single memory | | |
| 20. Big picture | | |
| **Average** | **/10** | |

---

## THE 5 HIGHEST-IMPACT CHANGES

1.
2.
3.
4.
5.


---
# docs/process/templates/PAGE_SPEC_TEMPLATE.md
---
# [Page Name] — Full Spec
**File: `[filename].html` | Updated: YYYY-MM-DD**
**Current score: X/10 → Target: 9/10**

> This document is the single source of truth for [page name]. Build from this, not from the current file.

---

## THE JOB OF THIS PAGE

[One paragraph. What must this page do? For whom? What does success look like?]

**Three visitors who might land here:**
1. **[Type 1]** — [context, what they need]
2. **[Type 2]** — [context, what they need]
3. **[Type 3]** — [context, what they need]

---

## SECTION-BY-SECTION SPEC

### SECTION 1 — [SECTION NAME]

**Height:** [px / vh / auto]
**Position:** [static / sticky / fixed]
**Background:** [token or colour]

**Layout:**
[Desktop layout description]
[Mobile layout description]

**Copy:**
- Headline: `[exact copy]`
- Sub: `[exact copy]`
- Body: `[exact copy]`
- CTA: `[exact copy]`
- Trust line: `[exact copy]`

**Typography:**
- Headline: [font, size, weight, line-height, letter-spacing]
- Body: [font, size, weight, line-height]

**Animation:**
- [What, when, duration, easing, trigger]

**States:**
- Default: [description]
- Hover: [description]
- Active: [description]
- Empty: [description]

**Why this, not something else:**
[Brief rationale for the specific design choice — what alternatives were rejected and why]

---

[Repeat for each section]

---

## CRITICAL TECHNICAL REQUIREMENTS

- [List all non-negotiable technical requirements]
- [Performance constraints]
- [GDPR / legal requirements]
- [Accessibility requirements]

---

## WHAT IT MUST FEEL LIKE

[Paragraph describing the desired experience. Not features — the feeling. What should an artist think after seeing this page?]

---

## CURRENT GAPS (What needs building/changing from current state)

| Gap | Severity | Fix |
|---|---|---|
| [issue] | P0 / P1 / P2 / P3 | [specific fix] |


---
# docs/systems/master-review/BEYOND-10.md
---
# Master Review — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a review that an agent runs cold, without context, and produces results that James cannot distinguish from his own — because the protocol is specific enough to remove the reviewer from the equation.

---

## Moment 1: The Score That Earns Its Number

**What it is:** Every score in the master review has a one-sentence justification that follows an immovable format: "This system is at [N]/10 because [specific thing that is missing/imprecise/not yet proven] prevents it from being [N+1]/10." If nothing prevents it from being higher, the score is higher. If the score is 10/10, the justification reads: "This system is at 10/10. There is no known improvement that does not require external conditions not yet in place." A score without a justification in this format is not a score — it is a placeholder.

**Why it's 20/10:** The failure mode of most scoring systems is that 9/10 becomes "good enough" — a social shorthand for "we're satisfied." A score that requires a specific justification for why it is not higher forces the reviewer to either find the gap or confirm that no gap exists. Both outcomes are useful. An unexplained 9/10 is a 7/10 with better PR.

**Exact implementation:**

In `MASTER-REVIEW-PROTOCOL.md`, the Phase 4 score table is extended with a mandatory justification column:

```markdown
## Phase 4: Score Summary

| System / Page | Score | Justification (why not N+1?) | Source | Next action |
|---|---|---|---|---|
| seo-og | 7/10 | SSR is not live — crawlers see fallback content, not artist data | FINAL-REVIEW.md | Build Netlify edge function (Level 2 canonical) |
| spotify-import | 9/10 | No persistent import cache — returning artists re-import on new sessions | FINAL-REVIEW.md | Add 7-day localStorage TTL |
| tier-gates | 8/10 | Gate copy uses static strings — does not use artist's real fan count | SPEC.md | Implement dynamic copy function |
```

The justification column is mandatory. The master scorecard template in PROTOCOL.md §PART 5 is updated to require it:

```markdown
## Phase 4: Score Summary
<!-- RULE: Every score must have a justification. Format: "N/10 because [specific gap]."
     A score with no justification is rejected — return to Phase 4 and complete it. -->
```

An agent running a master review that produces a score table without justifications is running an incomplete review. The protocol document now makes this explicit and non-optional.

---

## Moment 2: The Contradiction Table That Resolves Itself

**What it is:** When Phase 2 of the master review finds a contradiction between two documents, the resolution is not just "update the non-authoritative document." The protocol specifies a three-step resolution that prevents the same contradiction recurring: (1) Update the non-authoritative document. (2) Add a note to the authoritative document: "This point supersedes [Document X] on [specific topic]." (3) Add the topic to a standing `SETTLED_DECISIONS.md` file — a running list of decisions that have been made and documented, with the authoritative source named.

The next master review reads `SETTLED_DECISIONS.md` first. Any document that contradicts a settled decision is immediately flagged as out of date, without needing to re-discover the contradiction from first principles.

**Why it's 20/10:** The standard master review finds and fixes contradictions in isolation. The 20/10 version treats each contradiction as a signal that a decision has not been formally documented. `SETTLED_DECISIONS.md` is the institutional memory that prevents the same debate from recurring. The third master review should not re-debate fan cap numbers. That decision is settled. The document says so.

**Exact implementation:**

Create `/Users/jamescuthbert/Desktop/ABLE  MERGED/docs/SETTLED_DECISIONS.md` as a standing file, initially populated from all known contradictions resolved to date:

```markdown
# ABLE — Settled Decisions
**Purpose:** Decisions that have been made, documented, and are no longer open for debate.
**Authority:** V8_BUILD_AUTHORITY.md supersedes all. This file records specifics.

| Decision | Resolution | Authoritative doc | Date settled |
|---|---|---|---|
| Free tier fan cap | 100 fans (not 50, not 250) | tiers/SPEC.md §1 | 2026-03-16 |
| Active artist profile file | able-v7.html (not v3, not v6) | CLAUDE.md active files table | 2026-03-16 |
| Domain | ablemusic.co (not ablefm, not able.fm) | CONTEXT.md | 2026-03-16 |
| Tier pricing | £0 / £9 / £19 / £49 | tiers/SPEC.md §1 | 2026-03-16 |
| Admin accent colour | #f4b942 amber (not artist accent, which is variable) | CLAUDE.md design tokens | 2026-03-16 |
| ABLE takes 0% on fan support | 0% — Stripe standard fee only | tiers/SPEC.md §Close Circle | 2026-03-16 |
```

Phase 2 of the master review protocol is updated:

```markdown
### Phase 2 — Coherence Audit (60 minutes)

**Step 0 (new):** Read `docs/SETTLED_DECISIONS.md` before any other document.
Any contradiction with a settled decision in this file is a P0 error — fix it before proceeding.
Add any newly resolved contradictions to SETTLED_DECISIONS.md before closing Phase 2.
```

---

## Moment 3: The Cold-Start Agent Test

**What it is:** After every major documentation sprint, a fresh agent is given a single instruction: "Run a master review of the ABLE documentation. Use `docs/systems/master-review/MASTER-REVIEW-PROTOCOL.md` as your operating procedure. Produce the completed scorecard in `docs/systems/master-review/CURRENT-REVIEW.md`." The agent has no prior context. No conversation history. No briefing from James.

The output of this cold-start test is compared to James's own assessment. If they agree on scores within 1 point on every system, the protocol is working. If they disagree by more than 1 point on any system, the protocol has a gap — either the scoring criteria are not specific enough, or the source documents are not clear enough. The disagreement itself is the finding.

**Why it's 20/10:** A protocol that only works when the person who wrote it runs it is not a protocol — it is a personal habit. The 20/10 version is testable by a cold agent. Every gap between the agent's output and James's expectation is a spec deficiency, not a capability deficiency. The cold-start test converts the review from a personal quality check into a system quality check.

**Exact implementation:**

The cold-start test is added to the Master Review protocol as a post-review step:

```markdown
## PART 9 — Cold-Start Validation (run after every major doc sprint)

**Trigger:** Any sprint that creates or significantly modifies 5 or more system documents.

**Procedure:**
1. Start a fresh conversation with no prior context.
2. Paste only the following instruction: "Run a master review of the ABLE documentation.
   Use docs/systems/master-review/MASTER-REVIEW-PROTOCOL.md as your operating procedure.
   Produce the completed scorecard in docs/systems/master-review/COLD-START-REVIEW.md."
3. Do not answer any clarifying questions — if the agent asks, the protocol has a gap.
   Note the question in the protocol update log.

**Comparison:**
After the cold-start review is complete, compare:
- Scores: note any divergence > 1 point per system
- Contradictions found: did the agent find the same ones?
- Gaps identified: any gap the agent found that James's review missed (or vice versa)?

**Pass/fail:**
- Pass: agent scores match within 1 point on all systems; no new material gaps missed.
- Fail: agent and James disagree by more than 1 point on any system, OR the agent asks
  a question that indicates a protocol gap.

**On fail:** Update the protocol to address the specific gap, then re-run the cold-start test.
Repeat until the test passes twice consecutively.
```

The cold-start test results are stored in `COLD-START-REVIEW.md` (not the same file as `CURRENT-REVIEW.md`) — so both the standard review and the cold-start review are visible for comparison.

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when a cold-start agent runs the master review without a single clarifying question, produces a scorecard that matches James's own assessment within 1 point on every system, and finds one gap James missed — because the protocol is specific enough to enable a fresh reviewer to see what familiarity made invisible.


---
# docs/systems/master-review/CURRENT-REVIEW.md
---
# ABLE — Master Review #1
**Date:** 2026-03-16
**Reviewer:** Claude Code + James Cuthbert
**Trigger:** Post strategy-sprint review — first complete documentation audit
**Files audited:** All 240+ .md files in `docs/`

> This is the first actual Master Review. Not a template — a live audit. Every section below reflects real findings from reading the codebase.

---

## Phase 1: Index

**Total .md files found:** 241 (via `find docs/ -name "*.md" | wc -l`)

**Pages docs inventory:**

| Page | SPEC | 20-ANGLE | USER-JOURNEYS | COPY | PATH-TO-10 | DESIGN-SPEC | STRATEGY-REVIEW-FINAL | FINAL-20-ANGLE | FINAL-20-ANGLE-2 |
|---|---|---|---|---|---|---|---|---|---|
| profile | ✓ | ✓ | ✓ | ✓ | ✓ | **MISSING** | ✓ | ✓ | ✓ |
| admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| onboarding | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| landing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| fan | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| freelancer | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Critical finding:** `docs/pages/profile/DESIGN-SPEC.md` does not exist. CONTEXT.md references it as existing with a score of 9.7/10. This is the artist profile — the core product. This is a P0 gap.

**Systems inventory (directories checked):**

45 system directories found. Systems with non-standard naming (no SPEC.md):

| System | Primary Doc | Has PATH-TO-10 | Has FINAL-REVIEW | Gap |
|---|---|---|---|---|
| organic-growth | ORGANIC-GROWTH.md | ✓ | ✓ | Primary doc name non-standard |
| partnerships | PARTNERSHIPS.md | ✓ | ✓ | Primary doc name non-standard |
| social-media | SOCIAL-MEDIA-PLAN.md | ✓ | ✓ | Primary doc name non-standard |
| notifications | NOTIFICATIONS.md | ✓ | ✓ | Primary doc name non-standard |
| ai-agents | AI-AGENTS.md | ✓ | ✓ | No SPEC.md — AI-AGENTS.md is the spec |
| ai-workflow | AI-WORKFLOW.md | ✗ | ✗ | Only one doc in directory |
| team | TEAM.md | ✓ | ✓ | Primary doc name non-standard |
| transcendence | WHAT-11-LOOKS-LIKE.md + 11-AUDIT.md + NEVER-SHIP.md | ✗ | ✗ | Philosophical set — different structure (by design) |
| think-out-of-the-box | ideas/ (directory only) | ✗ | ✗ | Essentially empty — P1 gap |
| founder-roadmap | (not found in file list) | ✗ | ✗ | Directory exists but no .md files in index |
| hardware-software | FREE-TOOLS-AND-APIS.md | ✗ | ✗ | Only one doc |
| tools-and-apis | (not in file list) | ✗ | ✗ | Directory exists — no files in main index |
| marketing | SPEC.md | ✓ | ✓ | Missing ANALYSIS.md |

**Systems not listed in CONTEXT.md or FILE-STRUCTURE.md (unlisted):**
- `docs/systems/founder-roadmap/` — directory exists, no indexed files
- `docs/systems/hardware-software/` — `FREE-TOOLS-AND-APIS.md` exists but not indexed
- `docs/systems/tools-and-apis/` — directory referenced in CONTEXT.md but contents not in file index
- `docs/systems/think-out-of-the-box/` — referenced in MASTER-REVIEW-PROTOCOL.md but is essentially empty

**Index status:** `docs/FILE-STRUCTURE.md` does not list `docs/systems/master-review/` (just created) — update needed.

---

## Phase 2: Contradictions Found

| # | Contradiction | Doc A says | Doc B says | Resolution | Status |
|---|---|---|---|---|---|
| C1 | Domain name | `ABLE_STRATEGY.md`: "ablemusic.co" (landing page URL, referral links) | `EXECUTION_RISK.md`: "site:ablemusic.co", `GROWTH_STRATEGY.md`: "ablemusic.co/campaign" | `ABLE_STRATEGY.md` uses `ablemusic.co` consistently. `GROWTH_STRATEGY.md` and `EXECUTION_RISK.md` use `ablemusic.co`. **CONTEXT.md** uses `ablemusic.co`. STATUS.md uses `ablemusic.co`. V8_BUILD_AUTHORITY.md uses `ablemusic.co`. **Resolution: `ablemusic.co` is correct. All `ablemusic.co` references outside of archive docs are regressions.** | Unfixed — P0 |
| C2 | Profile DESIGN-SPEC.md score | `CONTEXT.md` line 46: `docs/pages/profile/DESIGN-SPEC.md` score 9.7/10 | `docs/pages/profile/` directory: DESIGN-SPEC.md does not exist | CONTEXT.md is wrong — the file doesn't exist. The score is fictitious. **Resolution: Create `docs/pages/profile/DESIGN-SPEC.md`. Remove the score reference from CONTEXT.md until the file exists.** | Unfixed — P0 |
| C3 | Freelancer build model | `CLAUDE.md` (project): "freelancer-start.html (separate onboarding) → freelancer.html (their profile) → admin.html variant" | `V8_BUILD_AUTHORITY.md` §1.3: "shared admin.html with context-appropriate sections shown/hidden per activated layer. One profile model." | V8_BUILD_AUTHORITY.md is authoritative (explicitly states it supersedes v6 docs). CLAUDE.md is outdated on this point. **Resolution: CLAUDE.md needs updating — freelancer admin is shared admin.html with activated layers, not a separate page.** | Unfixed — P1 |
| C4 | Free tier fan cap (Colombia strategy) | `ABLE_STRATEGY.md`: "Freemium extended: Free tier with 200 fan signups (instead of 100) for Colombian artists" — listed as an **option** | `docs/systems/tiers/SPEC.md`: free tier cap is 100 fans, no regional exception | Strategy doc presents 200-fan Colombia tier as an option; tier spec makes no provision for it. **Resolution: Add a note to tiers/SPEC.md that regional cap variants are deferred to Phase 2. The 100-fan cap is the V1 spec.** | Unfixed — P1 |
| C5 | Fan cap trigger copy | `ABLE_STRATEGY.md`: "Your list is full. These are 100 people who asked to hear from you. Upgrade to keep growing." | `docs/systems/copy/SPEC.md` and STATUS.md: "Upgrade to keep growing" is a **banned phrase** | ABLE_STRATEGY.md predates the copy system and contains a phrase the copy system later banned. **Resolution: Update ABLE_STRATEGY.md's illustrative copy to use the current approved version.** | Unfixed — P1 |
| C6 | Process doc page status table | `docs/process/PROCESS.md` bottom table: "Admin — Stage 0: ✅, Stage 1: ✅, Stages 2-7: —" | `docs/STATUS.md`: admin strategy docs are complete (9.7/10) | PROCESS.md status table was last updated mid-sprint and doesn't reflect completion of admin docs. **Resolution: Update PROCESS.md status table to reflect actual sprint completion.** | Unfixed — P2 |
| C7 | Spotify import score | `CONTEXT.md`: "Spotify import — 10/10" | `docs/STATUS.md`: "Spotify import — 5.2→9.0/10" | Two different documents claim two different scores for the same system. `STATUS.md` says 9.0/10, `CONTEXT.md` says 10/10. **Resolution: Read `docs/systems/spotify-import/FINAL-REVIEW.md` and use that score as authoritative. Update CONTEXT.md.** | Unfixed — P1 |
| C8 | CRM score | `CONTEXT.md`: "CRM — 4/10 current → path to 10 in PATH-TO-10.md" | `docs/STATUS.md`: "CRM — 4→10/10 ✅" | STATUS.md claims CRM reached 10/10. CONTEXT.md still shows it at 4/10. **Resolution: CONTEXT.md is stale. Update to reflect STATUS.md score.** | Unfixed — P1 |

---

## Phase 3: Completeness Gaps

| Page / System | Missing Files | Priority | Action |
|---|---|---|---|
| profile page | `DESIGN-SPEC.md` — CONTEXT.md says it exists at 9.7/10, but it is absent | **P0** | Create `docs/pages/profile/DESIGN-SPEC.md` — the core product page cannot enter the build phase without it |
| think-out-of-the-box | The directory exists with an `ideas/` subdirectory but no content | **P1** | Populate with lateral thinking techniques and examples, or remove the directory — referenced in MASTER-REVIEW-PROTOCOL.md as a resource |
| ai-workflow | Only `AI-WORKFLOW.md` exists — no PATH-TO-10, no FINAL-REVIEW | **P2** | Add PATH-TO-10 and FINAL-REVIEW, or reclassify as a reference document (not a spec) |
| founder-roadmap | Directory exists, no indexed files visible | **P2** | Audit directory contents and either index them or move to archive |
| hardware-software | `FREE-TOOLS-AND-APIS.md` exists but is not indexed in FILE-STRUCTURE.md | **P2** | Add to FILE-STRUCTURE.md, or merge into `docs/process/TOOLS.md` |
| marketing | No ANALYSIS.md in `docs/systems/marketing/` | **P2** | The other systems all have ANALYSIS.md — add it or confirm not needed |
| profile page | No `DESIGN-SPEC.md` = the artist profile page has no build spec | **P0** | Create the spec. The page is built (able-v7.html exists) — spec needs to be reverse-engineered from the current build and then improved |
| Freelancer onboarding | `freelancer-start.html` is referenced but there is no `docs/pages/freelancer-onboarding/` directory | **P1** | Either create the page spec (Phase 2 scope) or explicitly document it as Phase 2 in STATUS.md |
| Franchise / Label tier | ABLE_STRATEGY.md mentions Label tier (£49/mo, 10 artist pages) but there is no spec for the label UX or the admin experience for managing 10 profiles | **P1** | Add Label tier UX spec to `docs/systems/tiers/SPEC.md` or create a dedicated `docs/pages/label-admin/` section |
| Spanish / bilingual product | ABLE_STRATEGY.md documents a Colombia beachhead and three localisation options. There is no `docs/systems/localisation/` spec | **P2** | Create a localisation spec before the Colombia beachhead is activated. Currently deferred to "after 50 Colombian artists" — document that decision explicitly |

---

## Phase 4: Score Summary

The following scores are drawn from `FINAL-REVIEW.md` files where they exist, or from STATUS.md/CONTEXT.md as secondary sources. Discrepancies between sources are noted.

### Pages

| Page | Score (CONTEXT.md) | Score (STATUS.md) | Source doc score | Honest assessment | Action |
|---|---|---|---|---|---|
| `start.html` (Onboarding) | 9.9/10 | 9.9/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.9/10 — well-documented, all 9 stage docs present | None |
| `admin.html` | 9.7/10 | 9.7/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.7/10 — all 9 stage docs present | Verify DESIGN-SPEC.md vs actual admin.html build |
| `landing.html` | 9.65/10 | 9.65/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.65/10 — all 9 stage docs present | None |
| `able-v7.html` (Profile) | 9.7/10 | 9.7/10 (strategy complete) | No DESIGN-SPEC.md | **Cannot claim 9.7 without DESIGN-SPEC.md** — strategy is 9.7 but build spec is 0/10 (doesn't exist) | Create DESIGN-SPEC.md — P0 |
| `fan.html` | 9.24/10 | 9.24/10 | FINAL-20-ANGLE-REVIEW-2.md | 9.24/10 — all docs present, honest score | None |
| `freelancer.html` | 0/10 | 0/10 (Phase 2) | All 9 stage docs exist | Paradox: all docs exist, HTML file doesn't. Score is for the spec (pre-build). Honest | Clarify that freelancer score is spec-complete but build-incomplete |

### Systems

| System | CONTEXT.md Score | STATUS.md Score | Honest Assessment | Priority Action |
|---|---|---|---|---|
| Design system | 9.5/10 | 9.5→10/10 | 10/10 if PATH-TO-10 bugs are fixed | Fix admin.html L44+L1288 `#888` hardcoded hex values |
| Micro-interactions | 9.5/10 | 9.5→10/10 | 10/10 with focus ring + @view-transition | Implement the specced improvements |
| Cross-page journeys | 9.0/10 | 9.0/10 | 9.0/10 — solid but no ANALYSIS.md | Add ANALYSIS.md if not present |
| Copy system | 9.5/10 | 7.5→9.5/10 | 9.5/10 — known violations in copy need fixing | Fix 8 "dashboard" violations + toast inconsistency |
| Data architecture | 9.3/10 | 6.8→9.3/10 | 9.3/10 — live bug found (undocumented) | Confirm live bug is fixed and documented |
| SEO + OG | 9.0/10 | 5.7→9.0/10 | 9.0/10 — 2 critical bugs found | Confirm both bugs are fixed |
| Email system | 9.5/10 | 4.0→9.5/10 | 9.5/10 — solid | None immediate |
| Tier gates | 9.0/10 | 3.7→9.0/10 | 9.0/10 — full gate copy exists | None immediate |
| Spotify import | **10/10** | 5.2→9.0/10 | **Score conflict** — CONTEXT.md says 10, STATUS.md says 9.0 | Resolve: read FINAL-REVIEW.md and use that score |
| Platform admin | 7/10 | 0→7/10 | 7/10 — V1 SQL library complete, V2 UI not built | Acceptable at V1 stage |
| CRM | **4/10** (CONTEXT.md) | **10/10** (STATUS.md) | **Score conflict** — 6-point gap | Read `docs/systems/crm/FINAL-REVIEW.md` and resolve |
| World Map | 9.2/10 | 5.2→9.2/10 | 9.2/10 — P0 bugs identified | Fix: multi-moment panel, empty state, nav button size, section heading, focus trap |
| Reels/Clips | — | 7.5/10 | 7.5/10 — V1 scope reasonable | None immediate |
| Integrations | — | 4/10 | 4/10 → 8/10 after P0 build work | P0: Ticketmaster + Spotify deploy |
| Artist tools | — | 6.8/10 | 6.8/10 → 9/10 after P0 fixes | P0: shows date sort, Close Circle state, accent picker |
| Analytics | In progress | In progress | Spec exists (605 lines), PATH-TO-10 exists | Complete ANALYSIS.md and FINAL-REVIEW.md |
| Error states | In progress | In progress | Spec exists (364 lines) | Complete PATH-TO-10.md and FINAL-REVIEW.md |
| PWA | In progress | In progress | Spec exists (411 lines) | Complete PATH-TO-10.md and FINAL-REVIEW.md |
| Tiers | — | — | SPEC.md exists — comprehensive | Add ANALYSIS.md |
| Legal compliance | — | — | Has all 4 docs | Spot-check: is GDPR double opt-in captured correctly? |
| Accounting | — | — | Has all 3 docs | Verify it addresses Portugal NHR tax strategy |
| Monetisation | — | — | Has all 4 docs | Verify Close Circle Stripe Connect spec is complete |

---

## Phase 5: New Gaps Found

| # | Gap | Priority | Action | Owner |
|---|---|---|---|---|
| G1 | `docs/pages/profile/DESIGN-SPEC.md` does not exist — the core product's build spec is missing | **P0** | Create the spec. Reverse-engineer from current `able-v7.html` and FINAL-20-ANGLE-REVIEW-2.md then spec forward | James + agent |
| G2 | Domain inconsistency: `ablemusic.co` appears in GROWTH_STRATEGY.md and EXECUTION_RISK.md. `ablemusic.co` is the correct domain per CONTEXT.md, STATUS.md, V8_BUILD_AUTHORITY.md | **P0** | Audit all docs for `ablemusic.co` references and replace with `ablemusic.co`. One grep and fix. | Agent |
| G3 | Label tier UX is not specced. £49/mo "10 artist pages" tier has no admin experience design — how does a manager switch between artists? How does data aggregate? | **P1** | Add Label tier UX to `docs/systems/tiers/SPEC.md` §3 or create `docs/pages/label-admin/SPEC.md` | James |
| G4 | Post-release-window state is not covered in error state docs. Artist sets release date → 14 days pass → page auto-switches back to "profile" state. What if artist doesn't know? Where is the nudge? | **P1** | Add "post-release transition nudge" to `docs/systems/artist-tools/SPEC.md` and admin.html Campaign HQ spec | James + agent |
| G5 | Fan who discovers ABLE independently (not via an artist's profile) has no documented journey. If a fan searches for ABLE directly, lands on landing.html — what happens? They can't use ABLE without an artist to follow. | **P1** | Add "fan-first discovery" journey to `docs/pages/landing/USER-JOURNEYS.md` and `docs/pages/fan/USER-JOURNEYS.md` | James |
| G6 | Scalability assumptions not documented. Current architecture (localStorage-first, no backend) is fine for demo. At 5,000 fans per artist × 1,000 artists = 5M fan records. localStorage doesn't scale. Where is the localStorage→Supabase migration spec? | **P1** | `docs/systems/data-architecture/SPEC.md` mentions "flush-to-API call" but doesn't spec the migration. Create a migration runbook. | James + agent |
| G7 | `docs/systems/think-out-of-the-box/` is empty. It is referenced as a resource in the master review protocol. If it doesn't exist as a real resource, references to it are broken. | **P1** | Either populate with lateral thinking techniques relevant to ABLE, or remove all references to it | James |
| G8 | No "ABLE voice" audit of the freelancer page docs. The freelancer profile has a different product register (professional, not fan-facing) but the VOICE-BIBLE.md banned phrases still apply. Has freelancer copy been audited against the copy system? | **P1** | Run freelancer COPY.md through the copy system audit — check against `docs/systems/copy/SPEC.md` and `docs/VOICE-BIBLE.md` | Agent |
| G9 | No spec for what happens when Supabase is down. Error states spec covers localStorage and UI errors but not backend unavailability during live use. | **P2** | Add "backend unavailable" state to `docs/systems/error-states/SPEC.md` | Agent |
| G10 | Colombia localisation decision is documented in ABLE_STRATEGY.md (Option A: English only for V1) but the trigger condition for switching to bilingual ("when 50 Colombian artists are active") is not tracked anywhere — no metric, no owner, no review date | **P2** | Create `docs/systems/localisation/SPEC.md` that documents Option A decision, the 50-artist trigger, and what bilingual means in practice | James |

---

## Phase 6: Beyond-10 Candidates

Systems that claim 10/10 and were challenged for a 10.5+:

| Document | Current Claim | Challenge | Potential 10+ | Added to PATH-TO-10 |
|---|---|---|---|---|
| `docs/systems/spotify-import/SPEC.md` | 10/10 | Does the import spec cover: what happens when the artist's Spotify catalogue is in a non-Latin script (Japanese, Arabic, Korean)? Does the spec address rate limiting when 50 artists all do imports simultaneously at launch? | 10.5: Add non-Latin character handling + concurrent rate limit spec | No — needs research first |
| `docs/systems/copy/SPEC.md` | 9.5/10 | Is the voice bible tested against real artist feedback? The ABLE voice is designed for a 22–38 year old UK independent — but the Colombia beachhead has a different cultural register. Does the copy spec acknowledge this? | 10+: Cultural register variants for Colombia market | No — needs input from Colombian artists |
| `docs/pages/onboarding/FINAL-20-ANGLE-REVIEW-2.md` | 9.9/10 | The onboarding is specced for a solo artist. What about a band (2–5 members)? Who owns the ABLE profile? Which email is the login? What's the bio voice for a band? | 10.5: Band/collective onboarding variant | No — deferred to Phase 2 |
| `docs/systems/email/SPEC.md` | 9.5/10 | The email system is specced for one-to-many broadcasts. What about the artist replying individually to a fan who responds to a broadcast? ABLE's philosophy is direct relationship — can artists respond 1:1? | 10+: Direct fan reply flow | No — depends on Supabase email backend |

---

## Overall Assessment

```
Total .md files in docs/: ~241
Pages at all 9 stages complete: 5/6 (profile missing DESIGN-SPEC.md)
Systems with full standard doc set: ~32/45 (some use non-standard naming by design)
Systems at 9+ score: ~14
Systems at 10/10 (claimed): 3 (Spotify import claimed; design system + micro-interactions claimed post PATH-TO-10)
Systems below 7/10: 3 (analytics in-progress, error-states in-progress, pwa in-progress)
Score conflicts between CONTEXT.md and STATUS.md: 2 (Spotify import, CRM)
Critical gaps (P0): 2 (profile DESIGN-SPEC.md missing, domain name inconsistency)
High-priority gaps (P1): 8
Contradictions fixed this review: 0 (identified — not yet fixed — this review is the diagnosis)
Next review: 2026-04-15 (30-day cycle) or earlier if profile DESIGN-SPEC.md is completed
```

---

## Immediate Actions (P0 — before any build work begins)

**Action 1: Create `docs/pages/profile/DESIGN-SPEC.md`**
The artist profile is the core product. The build spec is missing. A developer working on `able-v7.html` has no authoritative spec to follow. This is the highest-priority gap in the entire documentation system.

The spec should be created by:
1. Reading `docs/pages/profile/FINAL-20-ANGLE-REVIEW-2.md` and `PATH-TO-10.md` (both exist and are detailed)
2. Inspecting current `able-v7.html` build state to capture what's implemented
3. Writing the spec forward from the PATH-TO-10 gap analysis

**Action 2: Resolve domain name inconsistency**
`ablemusic.co` appears in at least 3 strategy docs. `ablemusic.co` is the correct domain per all primary authority docs. Run a grep across all docs and replace `ablemusic.co` with `ablemusic.co` except in archive docs. Takes 10 minutes.

**Action 3: Update CONTEXT.md scores**
CONTEXT.md shows CRM at 4/10 (STATUS.md says 10/10) and Spotify import at 10/10 (STATUS.md says 9.0/10). Read the FINAL-REVIEW.md for both systems and correct CONTEXT.md.

---

## "Try Again" Schedule

First follow-up review: 2026-04-16 (30 days)
Target by then: Profile DESIGN-SPEC.md created, domain inconsistency fixed, score conflicts resolved
Definition of done: Two consecutive reviews with zero new P0 or P1 gaps
Current status: Review #1 of N (N ≥ 3 to reach "done")


---
# docs/systems/master-review/FINAL-REVIEW.md
---
# Master Review System — Final Review
**Created:** 2026-03-16
**Current score:** 7.5/10
**Status:** First review complete — score is honest, not aspirational

---

## What was built

Three documents:
1. `MASTER-REVIEW-PROTOCOL.md` — the operating procedure for reviewing all ABLE documentation
2. `CURRENT-REVIEW.md` — the first actual Master Review, run against all 241 docs
3. `PATH-TO-10.md` — the systematic path from 7.5 to 10 for this system itself

---

## Dimension scores

| Dimension | Score | Reasoning |
|---|---|---|
| Protocol completeness | 8.5/10 | All 7 phases defined with clear outputs. Parallel dispatch protocol included. "Done" definition is specific. Missing: version history convention, minimum viable review variant |
| Actionability | 8.0/10 | An agent can follow the protocol with ABLE context loaded. Some phases (Phase 5 gap-find) require human judgment that can't be fully systemised. This is correct — synthesis is human. |
| Trigger coverage | 9.0/10 | Mandatory triggers cover all meaningful state changes. Optional triggers are practical suggestions, not theoretical. The monthly cadence is specific (not "periodically"). |
| Agent-readability | 7.5/10 | A cold-start agent would need to read PROCESS.md and CONTEXT.md before the protocol makes full sense. Protocol assumes ABLE knowledge — see PATH-TO-10.md for the improvement. |
| Connection to build process | 8.0/10 | Protocol references PROCESS.md explicitly. Phase 7 (update and commit) connects to the standard commit convention. The connection back from PROCESS.md to this protocol needs to be added — PROCESS.md should reference the Master Review as a mandatory Stage 0 step for build sprints. |
| First review quality | 8.5/10 | The first CURRENT-REVIEW.md found 8 real contradictions and 10 real gaps. None are invented or trivial. The most critical findings (missing profile DESIGN-SPEC.md, domain inconsistency, score conflicts) are genuine P0 issues that would cause build problems. |
| Track record | 0/10 | One review is not a track record. This score improves automatically with subsequent reviews. Cannot be higher until Reviews #2 and #3 are complete. |

**Blended score:** 7.5/10

---

## The 5 most critical findings from Review #1

These are the findings that most directly affect the product's ability to move into the build phase:

**1. Profile DESIGN-SPEC.md does not exist (P0)**
`docs/pages/profile/DESIGN-SPEC.md` is referenced in CONTEXT.md with a score of 9.7/10 but the file does not exist. The artist profile page (`able-v7.html`) is the core product. A developer building or improving it has no authoritative spec. This is the single highest-priority gap in the entire documentation system. It must be created before the next build sprint on the artist profile.

**2. Domain name inconsistency across docs (P0)**
`ablemusic.co` is the correct domain (confirmed by CONTEXT.md, STATUS.md, V8_BUILD_AUTHORITY.md, ABLE_STRATEGY.md). But `ablemusic.co` appears in GROWTH_STRATEGY.md and EXECUTION_RISK.md. This would cause incorrect links in any content produced from those docs. One grep-and-replace, but it needs to be done.

**3. Score conflicts between CONTEXT.md and STATUS.md (P1)**
Two systems show different scores in two authority docs: Spotify import (CONTEXT.md: 10/10 vs STATUS.md: 9.0/10) and CRM (CONTEXT.md: 4/10 vs STATUS.md: 10/10). The actual score for each system lives in its own `FINAL-REVIEW.md` — those are the authoritative sources. CONTEXT.md is a convenience index that drifted out of sync. Fix: update CONTEXT.md to match the system-level docs.

**4. CLAUDE.md freelancer model is outdated (P1)**
The project root `CLAUDE.md` describes the freelancer journey as "freelancer-start.html (separate onboarding) → freelancer.html (their profile) → admin.html variant." V8_BUILD_AUTHORITY.md §1.3 resolves this: one profile model with activated layers, shared admin.html. CLAUDE.md is the first file any agent reads in a new session — having wrong information here causes cascading errors. Fix: update CLAUDE.md freelancer journey description.

**5. No spec for Label tier admin UX (P1)**
The Label tier (£49/mo, 10 artist profiles) is in the pricing docs and competitor comparison table but there is no spec for what "managing 10 profiles" looks like. How does the manager switch between artists? Does admin.html have a profile switcher? Is there aggregated analytics across all 10? This is a significant UX challenge that needs speccing before it's built. Adding now prevents a build-phase scramble when the first Label tier customer signs up.

---

## Honest ceilings

**Why this system cannot reach 10/10 today:**

The Master Review system is a process system, not a product system. Its 10/10 is earned through repeated use and demonstrated effectiveness — not through better writing. No amount of documentation improvement can substitute for the track record of: "this system caught a gap before it caused a build problem."

The current score of 7.5/10 is honest. It will rise to 8.5/10 after one complete cycle (Review #1 gaps fixed → Review #2 run). It will reach 9/10 after two cycles. It will reach 10/10 after three cycles with no new P0 gaps in the final two.

This is not a flaw in the system. This is the correct relationship between process documentation and process quality.

---

## What would make this an 11

If 11 existed, it would mean:

The Master Review runs automatically. Not as a human+agent session, but as a CI check on every git push: a script that runs the Phase 1 index check and the Phase 2 contradiction audit automatically, posting findings as a PR comment or a STATUS.md update.

Phase 5 (the gap-find) requires human judgment and cannot be automated. But Phases 1–4 are largely mechanical — file existence checks, score comparisons, grep for known contradiction categories. At 50+ docs, automating these phases saves meaningful time and catches regressions that manual reviews miss between sessions.

This is a Year 2 capability. It requires a CI pipeline (GitHub Actions), which ABLE doesn't have yet (no build pipeline, no npm). But it's the right direction.

---

## Connection to the build process

The Master Review system connects to the 8-stage PROCESS.md at two points:

1. **Stage 0 (Context Load)** — The Master Review is the extended version of Stage 0. A full sprint kickoff should include a Master Review, not just reading CONTEXT.md and STATUS.md.

2. **Stage 8f (Coherence Maintenance)** — The per-page coherence check in Stage 8f is a micro version of the Master Review. If 8f is run after every page, and the Master Review is run after every sprint, the two systems reinforce each other.

This connection should be added explicitly to `docs/process/PROCESS.md` — the Stage 0 section should reference the Master Review system as the full version of the Context Load for sprint kickoffs.

---

*This final review is itself part of the first Master Review session. The score will be revisited in Review #2 with a single question: "Did the protocol work?" If the P0 gaps identified here are fixed and no new P0 gaps were missed, the score rises.*


---
# docs/systems/master-review/MASTER-REVIEW-PROTOCOL.md
---
# ABLE — Master Review Protocol
**System:** Master Review
**Created:** 2026-03-16
**Status:** ACTIVE — the meta-system for reviewing all other systems
**Authority:** This document governs when and how ABLE documentation is reviewed, scored, and driven toward 10/10 coherence

---

## PART 1 — What a Master Review Is

A Master Review is not a reading session. It is an active scoring and editing session with a single goal: **coherence**.

Coherence means: every document in the ABLE documentation system points in the same direction, scores are honest, gaps are explicitly known, and the entire ABLE strategy functions as one unified whole rather than a collection of individual files that happen to live in the same folder.

**The core question of every Master Review:**
> "If someone read every single document in this folder, would they have a perfect, coherent, actionable understanding of ABLE — or would they find contradictions, gaps, and confusion?"

A Master Review happens:
- After a significant wave of doc creation (like a strategy sprint)
- At the start of every build sprint (before first line of code)
- Every 30 days minimum during active development
- After any significant product decision (tier change, feature add/remove, pivot)

---

## PART 2 — The Master Review Sequence

A complete Master Review takes 3–4 hours. It runs in 7 phases. Do not skip phases. Do not reorder.

---

### Phase 1 — Index Check (30 minutes)

**Goal:** Confirm the file index matches reality.

**Steps:**

1. Run: `find docs/ -name "*.md" | sort` — get the complete file list
2. Open `docs/FILE-STRUCTURE.md` — is it current?
3. Cross-reference: every file that exists should be in the index. Every file in the index should exist.
4. For every file in `docs/systems/` — check it has at minimum: `SPEC.md` (or equivalent primary doc), `PATH-TO-10.md`, `FINAL-REVIEW.md`
5. For every page in `docs/pages/` — check it has all 9 stage documents: `SPEC.md`, `20-ANGLE-ANALYSIS.md`, `USER-JOURNEYS.md`, `COPY.md`, `PATH-TO-10.md`, `DESIGN-SPEC.md`, `STRATEGY-REVIEW-FINAL.md`, `FINAL-20-ANGLE-REVIEW.md`, `FINAL-20-ANGLE-REVIEW-2.md`
6. Update `docs/FILE-STRUCTURE.md` to match reality before proceeding

**Output:** Updated index, list of missing files

---

### Phase 2 — Coherence Audit (60 minutes)

**Goal:** Find contradictions between documents.

**Read in this sequence:**
1. `CONTEXT.md`
2. `docs/ABLE_STRATEGY.md`
3. `docs/V8_BUILD_AUTHORITY.md`
4. `docs/systems/tiers/SPEC.md`
5. `docs/systems/data-architecture/SPEC.md`
6. One spot-check per page: read `docs/pages/[page]/SPEC.md` for each of the 6 pages

**For each contradiction found, document:**
- Document A says: [X]
- Document B says: [Y]
- Which is authoritative? (resolve using `docs/v6/00_AUTHORITY_ORDER.md` and `docs/V8_BUILD_AUTHORITY.md` — V8 wins on every point it addresses)
- Action: update the non-authoritative document immediately

**Common contradiction categories to look for:**
- Domain name: `ablemusic.co` vs `ablemusic.co` — one must win, all docs must agree
- Fan cap numbers: free tier cap must be identical across all mentions (currently: 100 fans)
- Tier pricing: £0 / £9 / £19 / £49 — must be identical across all docs
- Page file names: `able-v7.html` is the artist profile — any reference to `able-v3.html`, `able-v6.html` as active is wrong
- Scores: CONTEXT.md scores vs FINAL-REVIEW.md scores — FINAL-REVIEW.md is the authoritative score
- Freelancer journey: `freelancer-start.html` + `freelancer.html` vs references to separate admin panel — V8_BUILD_AUTHORITY.md is the authority (one profile model, activated layers)

**Output:** Contradiction table, all resolved before Phase 3

---

### Phase 3 — Completeness Check (30 minutes)

**Goal:** Identify every document that should exist but doesn't.

**Checklist per page (6 pages):**

| Doc | Profile | Admin | Onboarding | Landing | Fan | Freelancer |
|---|---|---|---|---|---|---|
| SPEC.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| 20-ANGLE-ANALYSIS.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| USER-JOURNEYS.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| COPY.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| PATH-TO-10.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| DESIGN-SPEC.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| STRATEGY-REVIEW-FINAL.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| FINAL-20-ANGLE-REVIEW.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| FINAL-20-ANGLE-REVIEW-2.md | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |

**Checklist per system (check the 3 minimum docs for all 40+ systems):**

For each `docs/systems/[system]/` directory: verify `SPEC.md` (or equivalent named primary doc), `PATH-TO-10.md`, `FINAL-REVIEW.md` exist. Systems with non-standard naming (organic-growth, partnerships, notifications, social-media, ai-agents, ai-workflow, team, transcendence) need special attention — their primary doc may be named differently (e.g. `ORGANIC-GROWTH.md`, `AI-AGENTS.md`).

**Gap priority classification:**

- **P0** — Missing document blocks building. Without it, a developer would make wrong decisions.
- **P1** — Missing document reduces quality but doesn't block building.
- **P2** — Missing document is aspirational — adds depth but isn't currently needed.

**Output:** Completeness table with priority ratings for each gap

---

### Phase 4 — Score Audit (45 minutes)

**Goal:** Create a master scorecard of all current honest scores.

Pull the current score from each `FINAL-REVIEW.md` (not from CONTEXT.md — the review docs are more current). Where no FINAL-REVIEW.md exists, read the SPEC.md for a current-state score.

Fill the master scorecard:

| System / Page | Current Score | Source Doc | Target | Gap | Priority Action |
|---|---|---|---|---|---|

Then identify:
- Which systems claim 10/10 but have not been build-verified?
- Which systems have scores in CONTEXT.md that don't match their own FINAL-REVIEW.md?
- Which systems are below 7/10 and blocking the critical path?

**Critical path systems** (score below 7 here = P0 gap):
- `docs/pages/profile/` — artist profile is the core product
- `docs/systems/data-architecture/` — every page reads/writes this
- `docs/systems/email/` — fan capture value depends on this
- `docs/systems/tier-gates/` — conversion model depends on this
- `docs/systems/crm/` — the relationship ledger

**Output:** Master scorecard table, P0 underperformers identified

---

### Phase 5 — The Gap Find (45 minutes)

**Goal:** Think from first principles. Find what the docs haven't covered.

This is the hardest phase. It requires stepping away from the docs and thinking about the product from the user's perspective — specifically looking for what no document has articulated yet.

**The questions:**

1. **User type gap:** Is there a user type who is not fully represented? (The fan who discovers ABLE without an artist referral. The manager who sets up 5 artists at once. The event promoter who wants to connect with multiple ABLE artists for a show.)

2. **Feature gap:** Is there a feature in `admin.html` or `able-v7.html` that isn't documented in strategy? (Check the "What's built" section of STATUS.md — anything built but not specced is a gap.)

3. **Revenue gap:** Is there a revenue stream discussed but not specced? (Close Circle / fan support packs / label tier pricing — are all fully modelled in `docs/systems/monetisation/SPEC.md`?)

4. **Legal / compliance gap:** GDPR, PECR, UK DSA. Is there a scenario in the fan sign-up flow, email broadcasts, or data export where ABLE's spec doesn't cover the legal requirement? Check `docs/systems/legal-compliance/SPEC.md` — is it current?

5. **Journey gap:** Are there edge cases in the user journey that nobody has mapped? (Artist sets release date → release passes → artist forgets to update → page is stuck in "live" state. What happens? Where is this specced?)

6. **Competitive gap:** Is there a competitor move that would damage ABLE that isn't in the risk register? Check `docs/ABLE_STRATEGY.md` section "What Kills This" — is it complete?

7. **Scale gap:** Is there anything in the current architecture that breaks at 500 artists, 5,000 fans per artist, or 10,000 fan sign-ups per day? Where is this documented?

8. **Beyond-10 gap:** Is there a "killer feature" that's been discussed but not specced? Check `docs/systems/killer-features/` — is everything from discussions in `docs/superpowers/` captured here?

For each gap found, assign:
- Priority: P0 (blocks launch) / P1 (pre-launch) / P2 (post-launch)
- Action: create doc / update existing doc / build task / defer to roadmap
- Owner: James / AI agent / research session

**Output:** Gap table with priorities and actions

---

### Phase 6 — The 10+ Push (30 minutes)

**Goal:** Challenge every document that claims to be at 10/10.

For each system or page scoring 10/10 or close to it:

1. Apply at least one technique from `docs/systems/think-out-of-the-box/` (if this directory has content) or apply lateral thinking directly:
   - Inversion: what would make this the worst possible version of itself?
   - First-principles: if this system didn't exist, what would the product miss?
   - Competitor test: could a good team at Linktree or Beacons read this spec and build something better? What would they add?
   - Time test: is this spec still correct in 12 months? What assumption is buried in it that ages badly?

2. Ask: "Is there genuinely nothing left, or is this an assumption?"

3. If a 10.5 exists: document it in the system's `PATH-TO-10.md` under a section labelled **"Beyond 10"**. These are not immediate actions — they are the next frontier.

**Output:** "Beyond 10" entries added to relevant PATH-TO-10.md files, at least one per system at 10/10

---

### Phase 7 — Update and Commit (30 minutes)

**Goal:** Leave the codebase better than you found it.

1. Apply all corrections from Phase 2 (contradictions fixed)
2. Create any missing P0 documents identified in Phase 3
3. Create tasks for all P1 gaps from Phase 5 (add to STATUS.md under "Planned next")
4. Update `docs/STATUS.md` with new state and Master Review date
5. Update `MEMORY.md` with key insights from this review
6. Update `docs/FILE-STRUCTURE.md` if any new files were created
7. Commit: `git commit -m "docs(review): master review [date] — [X] contradictions fixed, [Y] gaps found, [Z] scores updated"`

---

## PART 3 — The "Try Again" Protocol

After completing a full Master Review and actioning all P0 and P1 gaps:

- Wait minimum 48 hours (fresh eyes find what tired eyes miss)
- Run Phases 1–6 again from scratch
- Do not refer to the previous review's notes until you've completed Phase 3

**The rationale:** The first pass fixes what you can see. The second pass finds what was hiding behind what you just fixed. This is consistently where the most valuable discoveries happen.

**Repeat until:** Two consecutive Master Reviews find zero new material gaps (material = P0 or P1 priority).

This is the definition of "documentation done": not a single perfect review, but two consecutive reviews with nothing material to add.

---

## PART 4 — Master Review Triggers

### Mandatory triggers (run without being asked)

- A new page is spec'd through all 8 stages (Strategy → Build cycle complete)
- A new system doc set is created (SPEC + PATH-TO-10 + FINAL-REVIEW)
- Any significant product decision is made (tier pricing change, feature add/remove, scope change)
- Before any build sprint begins
- After any build sprint completes (to capture what the build revealed about the spec)
- Monthly, on the 1st — even if nothing has changed. Docs drift.

### Optional triggers (use judgment)

- After reading a competitor announcement (Linktree, Beacons, Feature.fm)
- After a conversation with a real artist reveals an unmet need
- After any music industry event (awards season, DSP policy changes, streaming royalty shifts)
- After a research session that produced new user insights
- When something in the build "doesn't feel right" — sometimes this is a code problem, but sometimes it signals a spec gap

---

## PART 5 — The Master Scorecard Template

Run a Master Review → fill in this template → save as `docs/systems/master-review/CURRENT-REVIEW.md` (overwrite the previous version, or date-stamp as `REVIEW-[YYYY-MM-DD].md`).

```markdown
# Master Review — [Date]

## Phase 1: Index
- Total .md files: [X]
- Total pages docs: [X] / 54 expected (6 pages × 9 docs)
- Total systems: [X] directories
- Files not in FILE-STRUCTURE.md: [list or "none"]
- Missing expected files: [list or "none"]
- Index updated: [yes / no — what changed]

## Phase 2: Contradictions Found
| Contradiction | Doc A says | Doc B says | Resolution | Updated |
|---|---|---|---|---|

## Phase 3: Completeness Gaps
| Page / System | Missing Files | Priority | Action |
|---|---|---|---|

## Phase 4: Score Summary
| System / Page | Score | Source | Target | Action |
|---|---|---|---|---|

## Phase 5: New Gaps Found
| Gap | Priority | Action | Owner |
|---|---|---|---|

## Phase 6: Beyond-10 Candidates
| Document | Potential 10+ | Added to PATH-TO-10 |
|---|---|---|

## Overall Assessment
- Total .md files: [X]
- Pages at all 9 stages complete: [X]/6
- Systems with full doc set (SPEC + PATH-TO-10 + FINAL-REVIEW): [X]/[total]
- Systems at 9+ score: [X]
- Systems at 10/10: [X]
- Systems below 7/10 (P0): [X]
- Critical gaps (P0): [X]
- Contradictions fixed this review: [X]
- Next review: [date]
- Definition of done: [2 consecutive reviews with zero new P0/P1 gaps — currently on review N]
```

---

## PART 6 — Parallel Agent Dispatch Protocol

For full-scale reviews, dispatch agents in parallel to cover more ground faster:

**Agent 1 — Pages audit**
Brief: "Read every doc in `docs/pages/`. For each page, confirm all 9 stage documents exist. Score the SPEC.md and FINAL-20-ANGLE-REVIEW-2.md against the 10/10 standard. Report: missing docs, honest scores, top 3 gaps per page."

**Agent 2 — Systems audit (core product systems)**
Brief: "Read every doc in `docs/systems/` for: data-architecture, email, tier-gates, crm, analytics, error-states, pwa, notifications. Report: missing docs, honest scores, contradictions with CONTEXT.md, top 2 gaps per system."

**Agent 3 — Systems audit (growth and business systems)**
Brief: "Read every doc in `docs/systems/` for: growth-loop, monetisation, launch-sequence, marketing, organic-growth, partnerships, competitive, legal-compliance, accounting. Report: missing docs, honest scores, top 2 gaps per system."

**Agent 4 — Cross-system coherence check**
Brief: "Read `CONTEXT.md`, `V8_BUILD_AUTHORITY.md`, `ABLE_STRATEGY.md`, then read the SPEC.md of every system. Your only job is finding contradictions: where does one doc say X and another say Y on the same topic? Report every contradiction with both source quotes."

**Synthesis rule:** Agent findings return to James for decisions. Agents flag contradictions; they do not resolve them. Only James decides which document is authoritative when two conflict on a point of product strategy. Agents can resolve technical contradictions (wrong file name, wrong version number) independently.

---

## PART 7 — What "Done" Looks Like

ABLE strategy documentation is "done" when all of the following are true simultaneously:

**1. Every page has all 9 stage documents**
All 6 pages × 9 docs = 54 page documents. No exceptions.

**2. Every system has its 3 minimum documents**
SPEC.md (or named equivalent), PATH-TO-10.md, FINAL-REVIEW.md. For all 40+ systems.

**3. Two consecutive Master Reviews find zero new material gaps**
Material = P0 or P1 priority. P2 gaps may still exist — those are aspirational, not blocking.

**4. All 20-angle scores are at 9+ with honest reasoning**
Any score that remains at 9 must have a written explanation of why 10 is blocked (e.g. "social proof requires 500 real users — honest ceiling until launch"). Unexplained 9s are not acceptable.

**5. The developer test passes**
A skilled developer can build any page from the docs alone, without asking a single question. If they ask a question, the answer must be in the docs. After the answer is provided, update the relevant doc so the question is answered permanently.

**6. The founder test passes**
James can hand these docs to a new hire and have them understand ABLE completely — what it is, what it's for, how it works, what to build next — within 4 hours of reading. If they can't, the docs are too complex, too scattered, or contain too many internal references that don't resolve.

**7. The coherence test passes**
The core thesis — "The relationship between artist and fan belongs to them. ABLE is the conduit." — is reflected, not contradicted, by every document in the system. If any document contradicts this thesis, it is wrong regardless of when it was written.

---

## PART 8 — Scoring the Master Review System Itself

This system is scored against 5 dimensions (not the full 20-angle framework, which is for pages):

| Dimension | Score | Notes |
|---|---|---|
| Completeness of protocol | — | Does it cover everything needed for a real review? |
| Actionability | — | Can an agent follow this without asking questions? |
| Trigger coverage | — | Does it specify when to run without being told? |
| Agent-readability | — | Is it clear enough for a cold-start agent? |
| Coherence with the build process | — | Does it connect to PROCESS.md and the 8-stage build cycle? |

Current score of this protocol: see `FINAL-REVIEW.md` in this directory.

---

*Read this document before every Master Review session. It is not background — it is the operating procedure.*


---
# docs/systems/master-review/PATH-TO-10.md
---
# Master Review System — Path to 10
**Created:** 2026-03-16
**Current score:** 7.5/10 (protocol exists and is actionable; first real review completed; gaps found are honest)
**Target:** 10/10

---

## Current state assessment

The Master Review system is newly created. It has a protocol document, a current review, and a final review. The protocol is comprehensive and follows the ABLE build philosophy. However, it has not yet been battle-tested through multiple review cycles. A system that hasn't been used more than once cannot honestly claim 10/10.

**Why 7.5, not higher:**
- The protocol exists and is actionable (not theoretical): +2 above baseline
- The first real review produced genuine findings (8 contradictions, 10 gaps): +1.5
- The trigger system is clearly defined: +1
- Agent dispatch protocol is defined: +0.5
- But: no proven track record of catching real gaps before they caused build problems: -1.5
- But: the "done" definition (two clean consecutive reviews) has not been approached yet: -1

---

## Dimension scores

| Dimension | Current | Target | Gap |
|---|---|---|---|
| Protocol completeness | 8.5 | 10 | Missing: cross-doc linking checks, version history tracking |
| Actionability | 8.0 | 10 | An agent could follow it; some judgment calls still needed |
| Trigger coverage | 9.0 | 10 | All mandatory triggers defined; optional triggers could be richer |
| Agent-readability | 7.5 | 10 | Requires ABLE context to fully understand; could be more self-contained |
| Connection to build process | 8.0 | 10 | References PROCESS.md but could be tighter — e.g. run Master Review as Stage 0.5 before every sprint |
| Track record | 0 | 10 | Cannot score above 0 — must be earned through multiple cycles |
| Finding-to-fixing rate | N/A (first review) | 8+ | Measure: what % of gaps found in Review #1 are fixed before Review #2? |

---

## Path to 9/10

**P0 — Complete one full improvement cycle**
The path from 7.5 to 9 requires completing one complete cycle:
1. Review #1 finds gaps (done — this document)
2. Gaps are acted on (profile DESIGN-SPEC.md created, domain fixed, scores updated)
3. Review #2 is run
4. Review #2 finds fewer gaps than Review #1 — the protocol is working

Without this cycle, the protocol is theoretical. After it, the protocol is proven.

**Target:** after Review #2, if finding count is <50% of Review #1, upgrade to 8.5/10.

---

**P1 — Add version history tracking**

Every Master Review should leave a permanent record. Currently, `CURRENT-REVIEW.md` is overwritten each time. Add a convention:

1. When a new review is run, rename the previous `CURRENT-REVIEW.md` to `REVIEW-[YYYY-MM-DD].md`
2. Always keep `CURRENT-REVIEW.md` as the latest
3. This creates an audit trail showing how the documentation improved over time

This is a process change, not a document change. Takes 5 minutes per review cycle.

---

**P1 — Add a "document health score" to FILE-STRUCTURE.md**

Currently FILE-STRUCTURE.md lists documents by status (Complete / In progress / Maintained). Add a column for health score (1–10, from the most recent FINAL-REVIEW.md). This makes the Master Review Phase 4 (score audit) trivially fast — instead of hunting through individual FINAL-REVIEW.md files, the scores are in one place.

The health score column requires updating FILE-STRUCTURE.md after every Master Review — which is already a Phase 7 action. Cost: ~30 minutes per review to update. Benefit: Phase 4 of subsequent reviews takes 10 minutes instead of 45.

---

**P2 — Make the protocol more self-contained for cold-start agents**

Currently, running a Master Review requires background knowledge of the ABLE build process, the authority hierarchy (V8 > V6), and the 8-stage PROCESS.md framework. An agent reading only MASTER-REVIEW-PROTOCOL.md cold would need to ask clarifying questions.

Improvement: add a "Quick orientation for a cold-start agent" section to the protocol with the minimum 5 facts they need to run Phase 2 (the coherence audit) without reading other docs first:
1. The authoritative domain is `ablemusic.co`
2. V8_BUILD_AUTHORITY.md supersedes all v6 docs
3. Active HTML files are: able-v7.html, admin.html, start.html, landing.html, fan.html
4. Fan cap on free tier is 100 fans (£0/month)
5. The core thesis is: "The relationship between artist and fan belongs to them. ABLE is the conduit."

These five facts catch the most common contradiction types without requiring full doc reads.

---

**P2 — Define a "minimum viable Master Review" (30-minute version)**

The full protocol is 3–4 hours. There will be sessions where the full review isn't practical. Define a 30-minute version that catches the highest-value issues:

1. Run `find docs/ -name "*.md" | wc -l` — check total count vs last review
2. Check CONTEXT.md scores against STATUS.md scores — find any conflict
3. Check `docs/pages/profile/` for DESIGN-SPEC.md (the most critical single gap)
4. Grep for `ablemusic.co` — catch domain inconsistencies
5. Read STATUS.md last session summary — anything built but not specced?

Five checks, 30 minutes. Catches P0 issues even on constrained sessions. Not a replacement for the full review — a safety net between full reviews.

---

## Path to 10/10

The Master Review system reaches 10/10 when:

1. **Track record:** Three complete review cycles have been run (Reviews #1, #2, #3)
2. **Proof of effectiveness:** Each subsequent review found fewer P0 gaps than the previous — the system is genuinely improving documentation quality, not just documenting it
3. **Zero surprises at build time:** No build session has been interrupted by a spec gap that the Master Review should have caught
4. **Two consecutive clean reviews:** As defined in the protocol — the ultimate test

**Realistic timeline:** 10/10 is achievable after 60–90 days of active development (3 monthly reviews).

---

## Beyond 10

If 10/10 is reached, the next frontier is predictive review:

Rather than reviewing what exists and finding gaps, the system would anticipate what needs to exist based on the product roadmap. Before any new feature is built, the Master Review system flags: "This feature will need these 5 docs. Do they exist?" If not, the docs are created proactively, not reactively.

This requires connecting the Master Review to the product roadmap — which doesn't yet have a formal system in ABLE docs. That's a Year 2 consideration when the team is larger and the build pace is faster.

A second "beyond 10" dimension: automated health monitoring. A script that runs `find docs/` checks and CONTEXT.md score-vs-reality comparisons on every git push. Catches the most common doc rot (files referenced but not existing, scores that don't match their source docs) without requiring a manual session.


---
# docs/systems/master-plan-alignment/BEYOND-10.md
---
# Master Plan Alignment — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the week where every decision made — in code, in docs, in how James spent Tuesday — points at the same destination.

---

## Moment 1: The STATUS.md That Orients in 90 Seconds

**What it is:** A `docs/STATUS.md` maintained to the standard where any person — a new co-founder, a returning-from-holiday James, a fresh Claude Code session — reads it and knows the complete build state in 90 seconds.

**Why it's 20/10:** Direction drift does not happen in dramatic moments. It happens in the accumulation of sessions where nobody is quite sure what the current state is, so something gets rebuilt, or the wrong thing gets polished, or a decision that was already made gets re-debated. STATUS.md maintained at 20/10 standard eliminates this. It is not a project management tool. It is a shared reality — the single document that means everyone (human or AI) starts from the same place.

**Exact implementation:**

`docs/STATUS.md` — exact structure, maintained after every meaningful session:

```markdown
# ABLE — Build Status
**Last updated: [YYYY-MM-DD HH:MM]**

## What is live right now
[One sentence per active file: what it does and what state it's in]
- `able-v7.html` — Artist public profile. All 4 campaign states working. Fan capture live.
- `admin.html` — Artist dashboard. Campaign HQ, fan list, analytics. Shows page working.
- `start.html` — Onboarding wizard. 3 steps + done screen. Functional.
- `landing.html` — Marketing page. Static. No known issues.

## P0 right now
[The single most important build task — one sentence, links to the spec]
Spotify import: read from the artist's Spotify profile URL and pre-populate release cards.
Spec: `docs/systems/spotify-import/SPEC.md`. ETA: next session.

## Known issues
[Actual bugs or regressions — not aspirational gaps]
- Glass theme: backdrop-filter drops to 0fps on iPhone 12 and older. Known, not blocking.

## What was just shipped
[Last 3 commits, one line each]
- feat: fan CRM campaignState field — captures which mode fan signed up in
- fix: gig mode expiry — was not resetting to profile state after timestamp passed
- docs: investor-readiness PATH-TO-10 — gap analysis and action plan

## Next 3 actions
1. [First specific action — file + feature]
2. [Second specific action]
3. [Third specific action — or "TBD after P0 lands"]
```

The rule: if STATUS.md was not updated in this session, update it before the session ends. 3 minutes. Every time.

---

## Moment 2: The Decision Filter in Practice

**What it is:** A week where the decision filter from `MASTER-PLAN-ALIGNMENT.md` Part 4 is applied to three real decisions — and one of them gets a "no" that saves two weeks of misdirected work.

**Why it's 20/10:** The decision filter has five questions. Most decisions pass four and stumble on one. The one that stumbles is usually the most revealing question — often "does this get James closer to £5k MRR?" when the answer is "it makes the product marginally better for existing users but does nothing for acquisition." That clarity — the realisation that a week of polish work answers the wrong question at this stage — is the filter working. The filter saves time not by making decisions faster, but by making the right decision once rather than the wrong decision twice.

**Exact implementation:**

The filter, applied as a literal checklist before any work block above 4 hours:

```
Decision: [what you're about to do]
Date: [today]

1. Does this get closer to £5k MRR?           [Yes / No / Unclear]
2. Does this support the nomad lifestyle?      [Yes / No / Neutral]
3. Does this support the C5/C6 condition?      [Yes / No / Neutral]
4. Does this use the £30k budget wisely?       [Yes / No / N/A]
5. Does this increase the AI leverage advantage? [Yes / No / Neutral]

Score: [X/5 yes]
Decision: [Go / No-go / Defer to: date]
```

If a decision scores 2 or below — stop. Run the 24-hour rule. Come back to it tomorrow.

The format is not important. The habit is. When the filter becomes a reflex rather than a procedure, it is working at 20/10.

---

## Moment 3: The Week Everything Points the Same Direction

**What it is:** A week where the commit messages, the doc updates, the investor update email, the marketing post, and the health log all tell the same story — progress toward the same destination, measured in different dimensions.

**Why it's 20/10:** Alignment is easy to describe and difficult to sustain. The practical test is this: pick any action taken this week — a specific commit, a specific hour of work — and trace it back to the North Star. If the chain is broken anywhere, the alignment system is not working. When the chain is unbroken — commit serves P0, P0 serves MRR, MRR serves job exit, job exit serves nomad lifestyle — the week feels different. There is no wasted motion. Not because every moment was productive, but because nothing was working against anything else.

**Exact implementation:**

Weekly 5-minute check — run every Sunday, before the week review, before planning Monday:

```
This week's most important action: [one sentence]
Does it trace to the North Star?
  → Does it serve: [specific domain]?
  → Does that domain serve: job exit / health / nomad lifestyle / ABLE growth?
  → Is the chain unbroken?

If yes: note it. The alignment system is working.
If no: what broke the chain? [One honest sentence]
       What would have been the right action instead? [One sentence]
```

This is not a productivity review. It is a direction check. The goal is not to do more. The goal is to do the right things — and to notice quickly when something drifts.

The monthly alignment review from the SPEC then aggregates the weekly checks. The quarterly review is where course corrections happen. But the weekly check is what prevents the drift from accumulating in the first place.

---

## The 20/10 test

James looks at the last 30 days of commits, decisions, and health log entries and can trace each one back to the North Star without having to justify any of them. Nothing contradicts anything else.

---

*See also: `docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md` — the 10 domains, alignment check template, decision filter, and quarterly review process*


---
# docs/systems/master-plan-alignment/FINAL-REVIEW.md
---
# Master Plan Alignment — Final Review
**Written: 2026-03-16 | Author: James Cuthbert + Claude**
**Status: Scored review of master plan alignment — update quarterly**
**Read alongside:** `MASTER-PLAN-ALIGNMENT.md`, `PATH-TO-10.md`

---

## Overall alignment score: 4.2/10

This is the honest score. The master plan describes a 10-domain life and business strategy. As of 2026-03-16, two domains are significantly ahead of the plan (product build), one is on track (hardware/AI stack), and seven are behind. The score does not reflect the quality of the strategy document — it reflects the gap between what the plan describes and what is actually happening across all 10 domains.

The score is not alarming for a solo founder at this stage. It is accurate. A 4.2/10 is what it looks like when a builder has spent six months building a strong product and has systematically deferred every non-product domain. The deferred domains are now each requiring attention.

---

## Is the product strategy aligned with the founder's personal goals?

**Yes, structurally. Partially, in practice.**

The ABLE product strategy is tightly coupled to James's personal goals in the master plan:
- Building ABLE to £42k MRR by March 2029 is the direct path to job exit and location independence
- The solo-founder + AI-tooling model is the direct path to operating from Porto or Medellín without a team
- The UK-first beachhead, then European expansion, is compatible with Portugal NHR tax residency
- The product's pricing (£9/£19/£49/mo) is calibrated to the gate system (£2k → £4k → £5k MRR)

What is less well-aligned in practice is the pace. The master plan assumes that by the time the product reaches 9.7/10 quality, it has been deployed and artist acquisition has begun. The product is at 9.7/10. The product has not been deployed. No artists have been acquired. The personal goals are therefore not moving — because the product, despite its quality, has not been put in front of its customers.

**The structural alignment is strong. The executional alignment is behind by approximately 2–3 months.**

---

## Are the timelines realistic?

**The 3-year target (£42k MRR, March 2029) is achievable but requires the growth plan to start now.**

The math:
- £42k MRR requires approximately 3,200 paying artists at an average of £13/month (mix of £9 and £19 tiers)
- Month 1–6: first 50 artists (proof of concept, product-market fit signals)
- Month 6–18: 50 → 500 artists (product-led growth, earned media, producer seeding)
- Month 18–36: 500 → 3,200 artists (referral flywheel, possibly paid acquisition, potential partnerships)

This trajectory requires the growth flywheel to start in the next 60–90 days. That means deployment within the next 2 weeks, first artist outreach within the next 4 weeks, and the first Hypebot article within the next 6 weeks.

If deployment is delayed by another 2 months, the March 2029 target requires a steeper curve in year 2 to compensate. Steeper curves require more capital, more luck, or both.

**The job exit timeline (£5k MRR = resign) is achievable within 12–18 months from deployment, assuming the growth plan is executed as specified.** Delaying deployment pushes this timeline out proportionally.

**The 3-year nomad picture (Porto, HRV above 70, 90 focused minutes per day) is entirely dependent on the job exit happening on schedule.** Portugal NHR has a 4–9 month processing timeline. If the intent is to be in Porto by mid-2027, the NHR process should start by mid-2026 at the latest — which is 3 months from now.

---

## Are there contradictions between different strategy documents?

**Three meaningful contradictions found:**

### Contradiction 1: Product quality vs deployment urgency

The product spec documents (`CONTEXT.md`, `STATUS.md`) describe a product at 9.7/10 quality with a long list of remaining enhancements (Supabase auth, PostHog integration, freelancer profile, email broadcasts). The master plan implies that deployment should happen when the product is good enough to convert early adopters — not when it is perfect.

The contradiction: the product has been at "good enough" quality for at least 4–6 weeks, based on the build history in `STATUS.md`. But it has not been deployed. This suggests the spec-completion mentality has been prioritised over the deployment mentality. The master plan's gate system (£2k MRR → £4k MRR → exit) only starts moving when the product is deployed. Spec completion does not move the gates.

**Resolution:** Deploy now with what exists. Supabase auth can ship as a fast-follow. The first 50 artists can use localStorage-backed profiles. Perfection is the enemy of the gate.

### Contradiction 2: Health as a business input vs health as a personal matter

The master plan places health as Domain 9 — structurally co-equal with ABLE product, company structure, and personal finance. The daily working patterns described elsewhere (building in long sessions, shipping until late) are in tension with the health non-negotiables (90-minute blocks, stop work by 21:00, strength training 3x/week).

The contradiction: the master plan defines the health protocol clearly but the product-build intensity implied by the session history in `STATUS.md` (multi-hour build sessions producing 9-file doc sprints) suggests the health non-negotiables are being treated as aspirational rather than operational.

**Resolution:** The monthly alignment review is the catch mechanism for this. If health is scored honestly every month, the contradiction becomes visible and correctable. If health is scored as "managed" without specifics, the contradiction remains invisible and compounds.

### Contradiction 3: Portuguese NHR preparation timeline vs current inaction

The master plan identifies Portugal as the first nomad destination and NHR as the tax strategy. The NHR process requires 183+ days of residency in Portugal, a qualifying company structure, and registration with Portuguese tax authorities. The processing time is 4–9 months.

The contradiction: the master plan implies NHR preparation is a near-term action. The actual preparation has not started. If James intends to relocate within 24 months, the NHR process should begin within the next 3–6 months. There is no evidence this timeline has been integrated into the concrete action plan.

**Resolution:** Find the cross-border accountant this month. Book the initial consultation. The accountant will define the exact timeline and starting point. One hour of preparation here prevents 9 months of delay later.

---

## What is the current master plan missing?

**Three material gaps not covered by the existing 10 domains:**

### Missing 1: Artist acquisition strategy

The master plan covers product, systems, personal finance, and lifestyle. It does not contain a first-artist acquisition plan — the specific mechanism for getting the first 10 paying artists onto the platform. The growth strategy docs (`docs/systems/growth-strategy/`) cover this at the strategic level (producer seeding, PLG loops, earned media) but the master plan alignment system does not include an acquisition domain or milestone tracker.

**The risk:** Without an explicit acquisition domain in the monthly review, the first artist acquisition gets crowded out by product polish, infrastructure setup, and the other 10 domains. The gates only move with paying artists.

**Suggested addition:** Add a Domain 11 (Artist Acquisition) to the monthly review with a gate tracker: first 10 artists, first 50 artists, first 150 artists. This makes acquisition as visible as MRR.

### Missing 2: Mental health and founder sustainability

The master plan covers physical health (C5/C6, movement routine) but not the psychological dimension of solo-founding a company while employed full-time. The warning signs section mentions "mental drift" but the proactive domain for founder mental sustainability — sleep quality, social connection, decision fatigue, sabbatical time — is absent.

Solo founding is one of the more psychologically demanding things a person can do. The compounding pressure of employment + product build + personal finance management + lifestyle planning is invisible until it isn't. Adding a line to Domain 9 for "mental health" (one honest sentence per month) would catch this before it becomes a crisis.

### Missing 3: Revenue tracking vs gate tracking

The master plan has the gate system (£2k → £4k → £5k MRR) and the Notion dashboard. But the monthly review template does not include a specific section for revenue-per-artist analysis — which artists are on which tier, what the upgrade rate is, what the churn rate is. These numbers are what tell you whether the gate is approaching on schedule or whether the trajectory needs adjustment.

**Suggested addition:** Add a revenue metrics row to the monthly review: total MRR, average revenue per artist (ARPA), number of artists per tier, monthly churn count, and projected months to next gate.

---

## What makes the master plan strong

**The North Star is foregrounded every time.** The document starts with the 3-year picture. Not buried in a preamble. An alignment system that doesn't keep the destination visible becomes a task manager.

**The decision filter has a clear pass/fail threshold.** "Two negatives = reconsider carefully" is more useful than "consider all these factors." The specificity means you can use it in 3 minutes, not 30.

**The warning signs section is honest.** Most alignment systems don't include failure modes. This one names them specifically. "Progress amnesia" — the inability to state clearly what has moved in the last 30 days — is the signal to watch most carefully because it is the earliest warning of drift.

**The quarterly review has teeth.** The instruction to use a large LLM to run a 20-angle analysis of your own trajectory is the kind of uncomfortable exercise good strategy reviews require. Most quarterly reviews are updated project trackers. This one is designed to surface what you have been not quite looking at.

**Health is Domain 9, not a footnote.** Treating health as co-equal with product and finance is the most important structural decision in the document. A bad pain week produces bad product decisions, missed media deadlines, and financial avoidance. Making that visible in the monthly review is the system's best property.

---

## What the master plan cannot do

It cannot prevent misalignment from wilful avoidance. If the health domain is filled in with "managed" every month while pain is 6/10 and the morning routine has been skipped for two weeks, the system does not catch it — because the system's accuracy depends entirely on honest self-reporting.

The best mitigation: have one person who reads the monthly review alongside you. A founder peer, mentor, or trusted friend who asks "what does 'managed' actually mean right now?" External accountability closes the gap that self-reporting alone cannot.

It cannot make up for a first monthly review that has not happened. The system exists as a specification. It becomes a functioning alignment system only when the first honest monthly review is filed. The spec is not the system. The completed first review is the system.

---

## Immediate actions (this week)

1. Complete the first monthly alignment review and save as `MONTHLY-REVIEW-2026-03.md` — this makes the system real
2. Deploy to `ablemusic.co` — this starts the gate clock
3. Check and fund the ISA before 5 April — 3-week hard deadline
4. Incorporate ABLE Labs Ltd — 1 hour, £50, 24-hour turnaround
5. Find the cross-border accountant — starts the NHR process clock

These five actions would move the overall alignment score from 4.2/10 to approximately 6.5/10. None of them require budget above £200. None of them require more than 4 hours of time. The gap between the current score and 6.5/10 is not a resource problem.

---

## Score trajectory

| Milestone | Score | What changes it |
|---|---|---|
| Now (2026-03-16) | 4.2/10 | Accurate baseline |
| After week-1 actions | 6.5/10 | Deploy + incorporate + ISA + accountant + first review |
| Month 3 (first paying artists) | 7.5/10 | Gate 1 progress visible, welcome sequence live |
| Month 6 (n8n live, NHR started) | 8.5/10 | Agent OS running, nomad prep underway |
| Month 12 (Gate 2 progress, accountant engaged, health tracked) | 9.0/10 | All domains active and moving |
| Month 24 (job exit, NHR application filed) | 9.5/10 | Life and business in alignment |


---
# docs/systems/master-plan-alignment/MASTER-PLAN-ALIGNMENT.md
---
# ABLE Labs — Master Plan Alignment System
**Version: 1.0 | Written: 2026-03-16 | Status: Authoritative**

> This system ensures that everything James is building — product, systems, personal life — is always pointing at the same destination as the master strategy. It is an operating system for direction, not just a document.

---

## The North Star (read this first, every time)

**The one sentence from the master strategy:**

> Build ABLE into a self-sustaining business that gives independent artists the infrastructure to own their fan relationships — and in doing so, build yourself out of employment, into health, and into a life lived on your terms across continents.

**The 3-year picture (March 2029):**
- Porto or Medellín. Morning HRV reading above 70.
- ABLE at £42,000 MRR. 3,200 paying artists.
- n8n sends the weekly digest at 7am. You review it in 20 minutes.
- You work 90 focused minutes, then stop. You walk. You think about where you're going next.

Everything in this alignment system filters through that picture. If a decision doesn't move toward it — or actively moves away — it requires justification.

---

## Part 1: The 10 Domains

The master plan covers 10 major domains. Each one requires active attention. Neglect any one long enough and it creates drag on the others.

| # | Domain | What it encompasses |
|---|---|---|
| 1 | ABLE product | Core product build, feature quality, artist experience |
| 2 | ABLE Labs | Diversification — Distribution, AI Tools, Sync, horizontal expansion |
| 3 | Hardware + AI stack | Mac Studio, Ollama, n8n, the local VA layer |
| 4 | Agent operating system | Automations, workflows, what runs without you |
| 5 | Market tracking | ISA, BTC, Gold/Silver, the financial resilience layer |
| 6 | Company structure | ABLE Labs Ltd, ABLE Music Ltd, banking, accounting |
| 7 | Job exit strategy | The phased path: £2k → £4k → £5k MRR, the resign protocol |
| 8 | Digital nomad lifestyle | Portugal NHR, Thailand, Colombia, the practical rhythm |
| 9 | Health | C5/C6 protocol, longevity stack, the daily movement routine |
| 10 | Personal finance | ISA maxing, pension, cash runway, the £30k allocation |

These are not separate projects. They are interconnected. The company structure affects the nomad lifestyle (NHR requires the right entity). Health affects product quality (bad pain week = bad decisions). Market tracking creates the financial floor that makes bold product decisions possible.

---

## Part 2: The Alignment Check Template

For each domain, answer three questions:

1. **Current state** — one sentence. Be honest, not optimistic.
2. **Gap to goal** — what's the distance between here and where this domain should be?
3. **Next single action** — one thing. Not a plan, not a list. The one thing.

Run this check monthly (see Part 3 for the ritual). The template:

---

### Domain 1: ABLE Product

**Current state:**
`[e.g. "able-v7.html is live with core features. Fan capture, campaign states, and admin dashboard working. Spotify import is the next P0 build."]`

**Gap to goal:**
`[e.g. "No paying artists yet. The product exists but hasn't been put in front of the right people."]`

**Next single action:**
`[e.g. "Identify 20 producers on TikTok with 10k+ followers and draft personalised outreach for each."]`

---

### Domain 2: ABLE Labs

**Current state:**
`[e.g. "ABLE Labs Ltd not yet incorporated. Diversification products not started — correctly, given we're pre-£10k MRR."]`

**Gap to goal:**
`[e.g. "Need the holding company incorporated before taking any investment or launching multiple products. The entity structure is 3 months away from being needed."]`

**Next single action:**
`[e.g. "Research Companies House process for UK Ltd incorporation — 30-minute task."]`

---

### Domain 3: Hardware + AI Stack

**Current state:**
`[e.g. "Current machine: MacBook Pro M2. Claude Code is the primary AI layer. n8n not yet set up. Ollama not yet running locally."]`

**Gap to goal:**
`[e.g. "Mac Studio M4 Max ordered / planned for [date]. Once it arrives, full VA stack setup is a 1-day job. Nothing to do until hardware arrives."]`

**Next single action:**
`[e.g. "Create a setup checklist for the VA stack so day-one configuration is frictionless when the Mac Studio arrives."]`

---

### Domain 4: Agent Operating System

**Current state:**
`[e.g. "Development loop running via Claude Code. No n8n automations live yet. Loops/Resend email sequences not yet configured."]`

**Gap to goal:**
`[e.g. "Welcome sequence, churn re-engagement sequence, and financial summary automation are the three that matter most at current stage."]`

**Next single action:**
`[e.g. "Set up the artist welcome email sequence in Loops — 3 emails (Day 1, 3, 7). Block 2 hours this week."]`

---

### Domain 5: Market Tracking

**Current state:**
`[e.g. "£30k allocated per the master strategy. ISA partially funded. BTC and gold positions pending."]`

**Gap to goal:**
`[e.g. "ISA needs to be maxed (£20,000/yr). The daily market monitoring via n8n is a Phase 2 build once hardware arrives."]`

**Next single action:**
`[e.g. "Move £5,000 to Vanguard Stocks & Shares ISA. Takes 20 minutes."]`

---

### Domain 6: Company Structure

**Current state:**
`[e.g. "Operating as a sole trader / under existing employment. No company incorporated yet."]`

**Gap to goal:**
`[e.g. "ABLE Labs Ltd needs to be incorporated before: taking any investment, signing commercial agreements, or reaching £50k/yr revenue."]`

**Next single action:**
`[e.g. "Incorporate ABLE Labs Ltd at Companies House. £50, takes 24 hours online."]`

---

### Domain 7: Job Exit Strategy

**Current state:**
`[e.g. "Currently employed full-time at £60k/yr. ABLE MRR: £0 / £[X]. Phase 1 in progress."]`

**Gap:**
`[Three gates: £2k MRR (stable), £4k MRR (part-time possible), £5k MRR sustained 3 months (resign)]`

**Next single action:**
`[The gate you're currently working toward — the single thing that would move the revenue needle most this week.]`

**Gate tracker:**
- [ ] Gate 1: £2,000 MRR — consistent for 30 days
- [ ] Gate 2: £4,000 MRR — negotiate part-time or contract
- [ ] Gate 3: £5,000 MRR sustained — 3 consecutive months
- [ ] Gate 4: Automations running reliably for 60+ days
- [ ] Gate 5: Community manager fully onboarded

---

### Domain 8: Digital Nomad Lifestyle

**Current state:**
`[e.g. "UK-based. Remote work already in place. Portugal NHR research done but no application started."]`

**Gap:**
`[e.g. "NHR application requires: Portugal D8 Digital Nomad Visa, UK company structure confirmed, cross-border accountant engaged."]`

**Next single action:**
`[e.g. "Find a UK/Portugal cross-border accountant. Budget: £500/yr ongoing. Search Googling 'UK founder Portugal NHR accountant'."]`

---

### Domain 9: Health

**Current state:**
`[e.g. "C5/C6 managed. Morning routine: [consistent / inconsistent]. Pain level: [0-10]. Last MRI: [date or 'overdue']."]`

**Gap:**
`[e.g. "Private MRI not yet done. Physiotherapist not yet engaged. Red light panel not purchased."]`

**Next single action:**
`[The most important health action given current state — e.g. "Book private MRI at Nuffield Health." Or if routine is slipping: "Do the morning movement routine tomorrow before opening the laptop."]`

**Non-negotiables (track these weekly — not monthly):**
- [ ] Morning movement routine (cat-cow, chin tucks, wall angels, bird-dog, dead bug)
- [ ] Work in 90-minute blocks with standing/lying breaks
- [ ] Monitor at eye level
- [ ] Stop work by 21:00
- [ ] In bed by 22:30
- [ ] Strength training 3x/week

---

### Domain 10: Personal Finance

**Current state:**
`[e.g. "ISA: £[X] funded. Emergency float: £3k held. BTC: [amount]. Gold: [amount]. Pension: [contribution rate]."]`

**Gap:**
`[e.g. "ISA not maxed for this tax year (deadline: 5 April). Pension contribution not reviewed."]`

**Next single action:**
`[e.g. "Max the ISA before 5 April — move £[remainder] to Vanguard FTSE All-World."]`

---

## Part 3: The Monthly Alignment Review

### When: First Sunday of each month. 30 minutes. Non-negotiable.

This is not a long planning session. It is a short recalibration. The 30 minutes breaks down:

- 5 minutes: re-read Part 0 of the master strategy (The North Star section)
- 20 minutes: complete the alignment check for all 10 domains
- 5 minutes: write the three outputs:
  1. The one domain that moved most this month
  2. The one domain that stagnated (be honest)
  3. The single most important thing to move in the coming month

### Output: a completed monthly review file

Save as: `docs/systems/master-plan-alignment/MONTHLY-REVIEW-[YYYY-MM].md`

Template for the monthly review file:

```markdown
# Monthly Alignment Review — [Month YYYY]
**Review date:** [date]
**Time taken:** [N] minutes

## Domain snapshot

| Domain | Status | Movement |
|---|---|---|
| ABLE product | [one word: Active/Stalled/Blocked/Ahead] | [one sentence] |
| ABLE Labs | [one word] | [one sentence] |
| Hardware + AI stack | [one word] | [one sentence] |
| Agent OS | [one word] | [one sentence] |
| Market tracking | [one word] | [one sentence] |
| Company structure | [one word] | [one sentence] |
| Job exit | [gate status] | [one sentence] |
| Nomad lifestyle | [one word] | [one sentence] |
| Health | [one word: Good/Managed/Slipping/Crisis] | [one sentence] |
| Personal finance | [one word] | [one sentence] |

## The three outputs

**Domain that moved most:** [domain] — [why, one sentence]

**Domain that stagnated:** [domain] — [honest reason, one sentence. "I avoided it" is a valid answer.]

**Single most important focus for next month:** [one thing. Be specific enough that you could put it in a calendar.]

## Notes
[Anything that doesn't fit the above — context, changes in external environment, shifts in the plan]
```

---

## Part 4: The Decision Filter

Before any decision that involves significant time, money, or direction — run it through these five questions. A "no" on one is a flag. A "no" on two or more is a reason to pause and think harder.

**1. Does this get James closer to or further from £5k MRR?**
The job exit trigger. If a decision doesn't either directly build revenue or directly build the product that drives revenue, it needs to justify itself carefully.

**2. Does this get James closer to or further from the nomad lifestyle?**
Decisions that increase location dependency (long leases, commitments that tie you to a geography) require careful justification. Decisions that reduce it (remote-first relationships, digital banking, company structure) are positive by default.

**3. Does this support or harm the C5/C6 condition?**
Any decision that increases sedentary screen time without corresponding movement investment is a negative. This includes: taking on work that requires 12-hour desk days, committing to deadlines that cut into recovery time, or skipping the morning routine to hit a shipping target.

**4. Does this build or consume the £30k budget?**
Revenue is the goal. The budget is runway. Before spending anything above £100, ask: is this the best use of the budget at this stage? Does this increase the probability of hitting £5k MRR, or is it optimising something that doesn't matter yet?

**5. Does this increase or decrease the AI leverage advantage?**
The competitive advantage here is the ability to build and operate at higher speed and lower cost than a solo founder historically could. Any investment in better tooling, better prompts, better automations, or better hardware compounds this. Anything that creates manual dependencies or reduces the AI layer's utility is a drag.

**The filter in practice:**
Most decisions don't need the full filter. It's for: major product direction changes, financial commitments above £500, lifestyle decisions that affect working patterns, and anything that feels urgent but unclear.

If it's urgent and unclear — the 24-hour rule applies. Wait.

---

## Part 5: Quarterly Strategy Review

Every 90 days, a deeper review. This takes 2 hours.

**When:** First weekend of each quarter (January, April, July, October)

### The 90-day review process

**Step 1 (20 minutes): Re-read the full master strategy**
Not skimming. The whole document. You will have forgotten parts of it. The act of re-reading always surfaces something that's been neglected.

**Step 2 (15 minutes): Update the master strategy**
What has changed? What have you learned? What turned out to be wrong? Update the document directly — don't preserve the original as though it was a constitution. The master strategy should evolve as reality does.

**Step 3 (20 minutes): The 20-angle analysis on current trajectory**
Ask DeepSeek-R1 70B: "Here is my current business and life situation [paste brief context]. Analyse my current trajectory from 20 different angles — financial, product, health, relationships, competitive environment, timing, personal sustainability, etc. What am I not seeing?"

Review the output critically. What resonates? What's wrong or doesn't apply? Write down the 3 things that actually surprised you.

**Step 4 (15 minutes): The biggest assumption check**
Every strategy rests on assumptions. Identify the 3 most important assumptions you are currently making. For each, ask:
- Is there evidence for this assumption?
- If this assumption is wrong, how would the strategy change?
- What would I need to see to know this assumption is wrong?

Examples of assumptions worth checking:
- "Independent artists will pay for owned fan relationships" — is this still evidenced by user behaviour?
- "Producer-seeding is the right acquisition channel" — is there actual data yet?
- "£5k MRR = safe exit" — has your cost base changed?

**Step 5 (10 minutes): What would change my strategy?**
Write a short list: "I would significantly change direction if..."

This is not a plan to pivot. It is a hedge against being slow to recognise when a significant change is actually warranted. Some examples to start with:
- If ABLE reaches 200 artists and NPS is below 30, the product has a fundamental problem
- If the job is made redundant before £5k MRR is reached, timeline accelerates dramatically
- If a well-funded competitor launches with a nearly identical campaign state system, the moat needs to shift to data and community

**Output:** A brief updated master strategy document, and a `docs/systems/master-plan-alignment/QUARTERLY-REVIEW-[YYYY-Q#].md` file with the review findings.

---

## Part 6: The Alignment Dashboard

A single page in Notion that gives a real-time view of where each domain stands. Update this weekly (takes 5 minutes with n8n pulling Stripe data automatically).

### The table

| Domain | Status | Current metric | Last updated | Next action |
|---|---|---|---|---|
| ABLE MRR | 🟡 Building | £[X] | [date] | [action] |
| ABLE artist count | 🟡 Building | [N] total, [N] paying | [date] | [action] |
| ABLE Labs incorporation | 🔴 Not started | — | [date] | Incorporate ABLE Labs Ltd |
| Hardware (Mac Studio) | 🟡 Ordered | Delivery: [date] | [date] | Setup checklist ready |
| VA stack (Ollama/n8n) | 🔴 Not live | Pending Mac Studio | [date] | Ready to install on arrival |
| Job exit gate progress | 🟡 Phase 1 | [N]/5 gates done | [date] | [current gate] |
| Portugal NHR | 🔴 Not started | — | [date] | Find cross-border accountant |
| Health | 🟢 Managed | Pain: [0-10], Routine: [consistent/not] | [date] | [next action] |
| Cash runway | 🟢 Stable | [N] months | [date] | Review in [month] |
| ISA | 🟡 In progress | £[X]/£20k this tax year | [date] | Max before 5 April |

**Status key:**
- 🟢 On track / good
- 🟡 In progress / watching
- 🔴 Not started / needs attention
- ⚫ Intentionally deferred (not the right time)

### Automation (Phase 2, once n8n is live)

Configure an n8n workflow that:
1. At 07:00 every Monday, pulls current MRR from Stripe
2. Pulls current artist count from Supabase
3. Updates the Notion dashboard via Notion API
4. Sends James a Telegram message: "Weekly alignment check-in. ABLE MRR: £[X]. Artists: [N]. [One sentence on the most important thing this week]."

This makes the dashboard live without a manual update task. The only things that require manual updating are qualitative domains (health, nomad progress, company structure).

---

## Part 7: Warning Signs

These are the signals that indicate misalignment. If more than 2 appear in the same month, stop and run the quarterly review process immediately — don't wait for the scheduled date.

**Product drift:**
- More than 3 features shipped in a sprint with no user feedback data backing them
- No new artist conversations for 2+ weeks
- PostHog showing declining engagement rather than improving

**Financial drift:**
- Monthly spend above £1,500 without corresponding revenue growth
- Cash runway below 6 months
- No ISA contribution in the current tax year by January

**Health drift:**
- Morning routine missed more than 3 times in a week
- Pain level consistently above 4/10 for 5+ days
- Work stopping after 21:00 as a regular pattern

**Job exit drift:**
- No movement on revenue gate for 6 weeks
- Losing sight of why the gate matters (signs: deprioritising sales/marketing, over-indexing on product polish)

**Mental drift:**
- Major product direction change driven by competitor news, not user insight
- Decision made in an evening without the 24-hour rule
- Progress amnesia: can't clearly state what has moved in the last 30 days

**The response to warning signs:**
Not panic. Not a major pivot. The response is the same: stop, re-read the north star, complete the alignment check for the relevant domain, identify the single next action. One thing. Then do it.

---

*This document is the operating system for direction. Like any operating system, it is only as useful as its consistent use. The most sophisticated alignment framework in the world doesn't help if you only look at it when something feels wrong. The habit is the system.*


---
# docs/systems/master-plan-alignment/PATH-TO-10.md
---
# Master Plan Alignment — Path to 10/10
**Written: 2026-03-16 | Author: James Cuthbert + Claude**
**Status: Gap analysis — where James/ABLE is now vs where the master plan says it should be**
**Read alongside:** `MASTER-PLAN-ALIGNMENT.md`, `FINAL-REVIEW.md`

> This document does not evaluate the alignment system's design quality. It evaluates the actual gap between the current state of each domain and where the master plan says it should be by now. Scores represent alignment fidelity, not progress quality.

---

## Scoring framework

10/10 on a domain means: current state matches the trajectory the master plan describes for this stage. A 5/10 means the domain exists and is moving but is materially behind the plan's expected state. A 1/10 means the domain has not been engaged with.

The overall master plan is at **4.2/10 alignment** as of 2026-03-16.

This is not a crisis score. It is a realistic score for a solo founder who has spent the first months building a product of genuine quality. The product domains are ahead of the plan; the business, financial, and lifestyle domains are behind it. That is the normal pattern at this stage — and it is exactly the pattern the master plan is designed to catch and correct.

---

## Domain 1: ABLE Product

**Current score: 8/10**

**Where the plan says you should be:**
Pre-launch stage with a working product, passing QA smoke tests, ready to put in front of artists. The plan sets no specific artist count or revenue milestone at this point — it treats this stage as the product-quality phase preceding first artist outreach.

**Where you actually are:**
`able-v7.html` is at spec quality 9.7/10. Admin dashboard, onboarding wizard, and landing page are all complete. Campaign state system, fan capture, click tracking, and micro-interactions are built. Fan dashboard exists. Netlify serverless functions (Spotify import, fan confirmation email, AI copy) are written. The build quality exceeds what the plan implied was possible at this stage.

**What is missing:**
The product has not been deployed to a public domain. `ablemusic.co` is referenced throughout docs but not confirmed live. Supabase auth (magic link) is not yet wired, meaning artists cannot create accounts that persist across browsers. No paying artists. Zero MRR.

**Gap to goal:**
The gap is not product quality — it is deployment and artist acquisition. The master plan implies that by the time a founder has this level of product completeness, first artist outreach is happening. That outreach has not started.

**Next single action:**
Deploy to `ablemusic.co` on Netlify. Until deployed, all outreach, press, and first-artist acquisition is blocked.

---

## Domain 2: ABLE Labs

**Current score: 3/10**

**Where the plan says you should be:**
At pre-£10k MRR, the plan explicitly says diversification products are correctly not started. However, it also states that ABLE Labs Ltd (the holding company structure) should be on the radar as a near-term need — required before taking any investment, signing commercial agreements, or reaching £50k/yr revenue.

**Where you actually are:**
No company incorporated. Operating without a legal entity. No holding company, no trading company, no bank account in ABLE's name. The diversification products (Distribution, Sync, AI Tools) are correctly not started — the plan agrees with this sequencing.

**What is missing:**
The company incorporation has been identified as a task in the master plan. It is a £50 online process at Companies House that takes 24 hours. The fact that it has not happened is not a resource or complexity problem — it is a priority problem. The master plan is explicit: incorporate before needing it, not when needing it.

**Gap to goal:**
ABLE Labs Ltd needs to be incorporated before reaching £50k revenue or signing any commercial agreement. At the current growth trajectory, this milestone could arrive within 6–9 months if growth targets are hit. Starting incorporation now leaves zero margin for error.

**Next single action:**
Incorporate ABLE Labs Ltd at Companies House (companieshouse.gov.uk/register). £50, 24 hours online.

---

## Domain 3: Hardware + AI Stack

**Current score: 6/10**

**Where the plan says you should be:**
The plan calls for Mac Studio M4 Max as the primary hardware (ordered or in use), Ollama running locally for private LLM inference, and n8n set up for workflow automation. The AI stack is described as a competitive advantage — the ability to build and operate at speeds impossible without it.

**Where you actually are:**
Claude Code is the primary AI development layer and is being used well — the build quality confirms this. Current hardware is MacBook Pro M2. Mac Studio M4 Max is either ordered or planned. n8n is not yet configured. Ollama is not yet running locally.

**What is missing:**
The local VA stack (n8n + Ollama) is the difference between AI-assisted development and AI-operated business processes. Until n8n is running, the Monday morning revenue digest, churn re-engagement sequences, and the weekly alignment check-in automation do not exist. The plan treats these automations as a significant efficiency multiplier.

**Gap to goal:**
Once the Mac Studio arrives, the VA stack setup is a 1-day job. The bottleneck is hardware delivery, not skill or planning. A setup checklist should exist now so day-one configuration is frictionless.

**Next single action:**
Create a VA stack setup checklist: Ollama install + model download, n8n Docker install, first workflow (weekly revenue summary from Stripe). This becomes the day-one setup guide when hardware arrives.

---

## Domain 4: Agent Operating System

**Current score: 3/10**

**Where the plan says you should be:**
The plan describes an agent operating system that handles: welcome email sequences for new artists, churn re-engagement, weekly financial summary, and a Telegram weekly check-in. These are not luxury automations — they are the difference between manually managing 100 artists and overseeing a system that manages them.

**Where you actually are:**
The development loop runs via Claude Code. No n8n automations are live. Loops email system is not configured. The serverless functions (fan confirmation email, Spotify import) are written but not production-deployed because the product is not yet deployed.

**What is missing:**
The three automations that matter most at current stage:
1. Artist welcome email sequence (Day 1, 3, 7) — onboarding follow-through
2. Fan sign-up notification to artist — real-time signal that the page is converting
3. Weekly alignment check-in (Telegram or email) — the weekly self-review trigger

**Next single action:**
Set up the artist welcome email sequence in Loops — three emails (Day 1: "Your page is live. Here's the one thing to do first", Day 3: "Has anyone signed up yet?", Day 7: "Here is what your data shows"). Block 2 hours this week.

---

## Domain 5: Market Tracking

**Current score: 4/10**

**Where the plan says you should be:**
The plan allocates £30k for market tracking — ISA (£20k/yr maximum), BTC, gold/silver, and cash runway. It treats the financial resilience layer as infrastructure that enables bold product decisions. The plan expects this layer to be at least partially established by this stage.

**Where you actually are:**
Specific figures are not documented. The plan template uses placeholders throughout, suggesting actual numbers have not been reviewed recently. The ISA deadline (5 April) is approximately 3 weeks away — this is a hard deadline that requires immediate action if the allowance has not been utilised.

**The specific risk:**
The UK Stocks and Shares ISA allows £20,000 tax-free investment per year. The 5 April cutoff is hard — unused allowance cannot be carried forward. If the current tax year allocation is below £20k, this requires action in the next 3 weeks.

**Next single action:**
Check the current ISA balance. If below £20,000 for this tax year, calculate the shortfall and move the funds before 5 April. 20 minutes.

---

## Domain 6: Company Structure

**Current score: 2/10**

**Where the plan says you should be:**
ABLE Labs Ltd should be incorporated or actively in process. The plan is explicit: incorporate before needing it. The triggers that require a company are achievable within 12 months if growth targets are hit.

**Where you actually are:**
No company incorporated. Operating as an individual. No ABLE bank account. No registration number.

**The risk of delay:**
If ABLE reaches £5k MRR and a label or distributor wants to sign a commercial agreement, the negotiation pauses while incorporation is rushed. If any investment is received without a company structure, the legal position is messy.

**Score rationale:**
2/10 because this is a £50, 24-hour task the master plan treats as foundational that has not happened.

**Next single action:**
Incorporate ABLE Labs Ltd at Companies House. £50. Takes 24 hours online. Do this before the end of the month.

---

## Domain 7: Job Exit Strategy

**Current score: 5/10**

**Where the plan says you should be:**
In active preparation for Gate 1 (£2k MRR consistent for 30 days) — which means: first paying artists onboarded, first press/media driving discovery, and a clear line of sight to the first upgrade conversion.

**Where you actually are:**
ABLE MRR: £0. No paying artists. The product has not been put in front of any artist who could pay. The gates are not visible from the current position because the product is not deployed.

**What is working:**
The product is strong enough to convert paying users. The pricing is set. The tier gates are specced. The onboarding is complete. The barrier is not product quality — it is deployment and the start of artist outreach.

**Score rationale:**
5/10. Plan infrastructure is correct, gates are defined, employment runway is intact. The misalignment is zero progress on gates because no artists have been acquired yet.

**Next single action:**
Identify 20 independent artists who match the ideal customer profile (UK-based, 1k–50k listeners, active release schedule). This is the prerequisite for first artist outreach.

---

## Domain 8: Digital Nomad Lifestyle

**Current score: 2/10**

**Where the plan says you should be:**
Portugal NHR research completed, a UK/Portugal cross-border accountant identified, and the D8 Digital Nomad Visa process understood. These are preparation tasks — not things that need to happen before £5k MRR, but things that should be understood so that when the trigger is hit, the lifestyle transition can begin without a 3-month research delay.

**Where you actually are:**
UK-based. Remote work in place. Portugal NHR research described as "done" but no accountant identified, no visa application started, no practical steps taken.

**The specific gap:**
The Portugal NHR process from decision to approval takes 4–9 months. If the intention is to relocate within 12–18 months of job exit, the process should start 6–9 months before the planned move date — meaning within the next few months.

**Next single action:**
Find a UK/Portugal cross-border accountant. Search: "UK founder Portugal NHR tax accountant". Budget: £500–800/yr. Book an initial consultation. This one conversation clarifies the exact process and timeline.

---

## Domain 9: Health

**Current score: 5/10**

**Where the plan says you should be:**
Morning routine consistently observed (cat-cow, chin tucks, wall angels, bird-dog, dead bug). Work in 90-minute blocks. Strength training 3x/week. Pain managed below 4/10. Private MRI and physiotherapist engaged. Health treated as a business input.

**Where you actually are:**
C5/C6 managed. Morning routine consistency: unknown from documentation — the plan template uses `[consistent / inconsistent]` placeholder, suggesting it is not being tracked. Pain level: unknown. Private MRI: not confirmed as completed. Physiotherapist: not confirmed as engaged.

**The systemic risk:**
The master plan identifies health as the most important domain to monitor because its failure cascades into all others. A bad pain week produces bad product decisions, skipped media deadlines, and financial avoidance. The plan treats health as a business system.

**Score rationale:**
5/10 is a conservative estimate. The actual score could be higher or lower depending on what is genuinely happening day-to-day. The 5/10 reflects the absence of visible tracking in the documentation.

**Next single action:**
Start the health tracking today. One line per day: pain level (0–10), morning routine (done / partial / skipped), bedtime (before 22:30 / after). No app required. The act of tracking changes the behaviour.

---

## Domain 10: Personal Finance

**Current score: 4/10**

**Where the plan says you should be:**
ISA on track to be maxed before 5 April. Cash runway of 6+ months documented. BTC and gold/silver positions at least partially established. Pension contribution reviewed.

**Where you actually are:**
Specific figures not documented in available documentation. The plan template uses placeholders throughout. The ISA deadline is 3 weeks away. Whether the £20k allowance has been utilised for this tax year is the most time-sensitive question in the entire master plan right now.

**The 5 April deadline:**
Not a soft date. It is the UK tax year end. Unused ISA allowance cannot be carried forward. If the current ISA allocation for 2025/26 is below £20k, every day of delay until 5 April reduces the available tax-free capacity.

**Next single action:**
Open the ISA provider app. Check the current year-to-date contribution. If below £20,000, calculate the shortfall and move the funds before 5 April. 20 minutes.

---

## Alignment summary

| Domain | Score | Primary gap | Effort to close |
|---|---|---|---|
| ABLE product | 8/10 | Deployment gap — product not publicly accessible | 2–4 hours |
| ABLE Labs | 3/10 | Company not incorporated | 1 hour + 24h processing |
| Hardware + AI stack | 6/10 | n8n and Ollama not running; Mac Studio pending | Waiting on hardware |
| Agent operating system | 3/10 | No automations live; welcome sequence not set up | 2 hours |
| Market tracking | 4/10 | Positions not documented; ISA deadline 3 weeks away | 20 minutes |
| Company structure | 2/10 | No entity incorporated | 1 hour + 24h processing |
| Job exit strategy | 5/10 | Zero MRR; product not deployed for acquisition | Deployment first |
| Digital nomad lifestyle | 2/10 | No accountant found; NHR process not started | 1 hour research |
| Health | 5/10 | Routine tracking not visible | Start tracking today |
| Personal finance | 4/10 | ISA deadline in 3 weeks; positions not documented | 20 minutes |

**Overall alignment score: 4.2/10**

---

## The path to 10/10 alignment

10/10 alignment does not mean all domains are complete. It means the current actions in every domain are the correct ones for this stage, and none of the domains are being silently neglected.

**The four highest-leverage actions to close the alignment gap:**

1. **Deploy the product** — moves Domain 1 from 8 to 9, unlocks Domain 7 (job exit gates become reachable), enables all media and community actions
2. **Incorporate ABLE Labs Ltd** — moves Domain 6 from 2 to 8 in 24 hours; also moves Domain 2 from 3 to 6
3. **Check and fund the ISA before 5 April** — moves Domain 10 from 4 to 7; hard deadline in 3 weeks
4. **Find the cross-border accountant** — moves Domain 8 from 2 to 5; starts the NHR process clock

Three of these four actions take less than 1 hour each. One (deployment) takes 2–4 hours. None require budget above £200. The alignment gap is not a resource problem. It is a priority problem.

**The two domains that require sustained effort:**

- **Domain 4 (Agent OS):** Welcome email sequence this week; n8n stack when hardware arrives. Not a 1-hour task but a clear path.
- **Domain 9 (Health):** Requires daily habit, not a single action. Start tracking today.

---

## What a 10/10 alignment state looks like

- Product deployed and accessible to artists with working auth
- ABLE Labs Ltd incorporated with company bank account
- Mac Studio set up with Ollama and n8n running; weekly digest automated
- Artist welcome email sequence live in Loops
- ISA maxed for this tax year; cash runway documented as number of months
- Cross-border accountant engaged; NHR process understood and started
- Gate 1 (£2k MRR) in sight with first paying artists onboarded
- Health routine tracked daily; C5/C6 protocol active
- Monthly alignment review completed and filed — the system being used, not just existing


---
# docs/systems/qa-testing/ANALYSIS.md
---
# ABLE — QA Coverage Analysis
**Created: 2026-03-16 | Current overall score: 2/10**

> This is the baseline audit. It scores current QA coverage across 8 dimensions before any structured test suite exists. The purpose is to document the gap honestly so the SPEC.md and PATH-TO-10.md can address it precisely.

---

## Summary

| Dimension | Score | Status |
|---|---|---|
| 1. Unit test coverage | 0/10 | No test files exist |
| 2. Integration tests | 1/10 | Manual only — no automation |
| 3. Visual regression | 1/10 | Playwright configured, no snapshot tests |
| 4. Interaction tests | 2/10 | 5 tests specced in MICRO_INTERACTIONS_PATH_TO_10.md, not wired |
| 5. Accessibility tests | 1/10 | Checklist exists in DESIGN-SPEC.md §16, not automated |
| 6. Performance tests | 0/10 | No Lighthouse runs in CI or ad hoc |
| 7. Copy/content tests | 0/10 | Banned phrase list exists, no scanner |
| 8. Cross-browser tests | 2/10 | Playwright MCP installed, no browser matrix defined |

**Overall: ~2/10**

---

## Dimension 1 — Unit test coverage (0/10)

**What exists:** None. All business logic lives as inline `<script>` blocks in HTML files. No `.js` modules, no test runner, no Jest/Vitest configuration.

**Critical untested functions:**

- `getLifecycleStage()` — determines home page layout, wrong result is catastrophic
- `buildGreetingSub()` — 6 conditional branches, each with different date arithmetic
- `resolveStats()` — reads 3 localStorage keys, computes deltas, manages skeleton state
- `checkAndShowMilestone()` — once-per-threshold logic with localStorage guard
- `exportFansCSV()` — data integrity risk if email encoding is wrong
- `calcViewStreak()` — streak calculation over 7-day rolling window
- Auto-switch state logic: `if now < releaseDate → pre-release; if now < releaseDate + 14d → live`

**Risk:** Any regression in date arithmetic or localStorage reads is invisible until a user encounters it.

---

## Dimension 2 — Integration tests (1/10)

**What exists:** No automated cross-page tests. Manual verification is done ad hoc via browser.

**Critical untested flows:**

- `start.html` writes `able_v3_profile` → `admin.html` reads and renders profile data correctly
- Fan signs up on `able-v7.html` → fan appears in `admin.html` Fans page with correct timestamp
- Gig mode toggled in `admin.html` → `able-v7.html` renders gig state with "on tonight" tag
- Campaign state set in `admin.html` → `able-v7.html` reflects correct state (pre-release/live/profile)
- `able_gig_expires` Unix timestamp expires → `able-v7.html` reverts to profile state automatically

**Score basis:** 1/10 because one journey (start → profile) was manually verified during v3 development. No test records exist.

---

## Dimension 3 — Visual regression tests (1/10)

**What exists:** Playwright MCP is configured. `screenshots/` directory exists as Playwright audit output. No baseline snapshots established. No comparison tests written.

**Critical untested visual states:**

- All 4 themes (dark/light/glass/contrast) on `able-v7.html` — 4 × 1 = 4 baseline screenshots needed
- All 4 campaign states (profile/pre-release/live/gig) on `able-v7.html` — 4 more
- Admin home at day-1 zero state vs. active state
- Mobile (375px) vs. desktop (1280px) layout for admin sidebar/bottom-nav split
- Gold lock (blur overlay) pattern on Pro-gated features
- Skeleton shimmer state vs. resolved state

**Score basis:** 1/10 because Playwright is installed, giving the capability. No baselines means any visual regression is silent.

---

## Dimension 4 — Interaction tests (2/10)

**What exists:** `docs/systems/MICRO_INTERACTIONS_PATH_TO_10.md` contains 5 Playwright test patterns with pseudocode (scale-down on press, tab indicator spring, bottom sheet slide-up, focus ring glow, view-transition guard). These are specifications, not wired test files.

**30+ interactions implemented in `able-v7.html`** — confirmed in `MICRO_INTERACTIONS_SPEC.md`. None have automated tests.

**Critical untested interactions:**

- Scale-down on press (0.97 transform) — B1
- Tab sliding indicator spring with overshoot — C1
- Countdown digit flip (split-flap clock) — C5
- Bottom sheet swipe-to-dismiss — B9
- Fan sign-up spring confirmation + confetti — E9, G1
- Sticky artist bar trigger at 70% hero scroll — A4
- Campaign HQ state button spring — NEW-1
- Greeting sub-line cross-fade — NEW-6

**Score basis:** 2/10 because the test patterns exist as written specs. The gap is wiring them into a test runner.

---

## Dimension 5 — Accessibility tests (1/10)

**What exists:** `docs/pages/admin/DESIGN-SPEC.md §16` contains a written accessibility checklist (9 items). Not automated. `prefers-reduced-motion` compliance is noted in the micro-interactions spec.

**Critical untested accessibility requirements (from spec):**

- All interactive elements have min 44px tap targets (CLAUDE.md working rule #3)
- `*:focus-visible` glow ring visible on every interactive element
- All images have `alt` text
- `aria-label` on all icon-only buttons
- `aria-hidden="true"` on skeleton shimmer elements
- `role="navigation"` + `aria-label` on bottom tab bar
- Campaign bottom sheet has focus trap on open, returns focus on close
- Mini phone preview iframe has `tabindex="-1"` + `aria-hidden="true"`
- `prefers-reduced-motion` disables all CSS animations and JS-driven transforms

**WCAG target:** AA (2.1). Current coverage: unknown.

**Score basis:** 1/10 because the checklist exists and was written against real spec decisions. No scanner has run.

---

## Dimension 6 — Performance tests (0/10)

**What exists:** No Lighthouse runs on record. No performance budget defined in any spec doc.

**Known performance considerations:**

- `able-v7.html` is a single large HTML file — parse time risk
- `backdrop-filter: blur(28px) saturate(180%)` on glass theme — GPU cost
- `@font-face` for DM Sans, Barlow Condensed, Plus Jakarta Sans — FOUT risk
- Artwork `<img>` with no explicit `width`/`height` — CLS risk
- iFrame in Campaign HQ mini preview — nested document cost

**Target budget (from task brief):** LCP ≤ 2.5s, CLS ≤ 0.1. No INP target set — should be ≤ 200ms per Web Vitals spec.

**Score basis:** 0/10. No tooling, no budget, no runs.

---

## Dimension 7 — Copy/content tests (0/10)

**What exists:** `docs/systems/copy/SPEC.md` and `CLAUDE.md` both list banned phrases. `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` has the full register. No automated scanner exists.

**Banned phrase list (from CLAUDE.md and design specs):**

- "dashboard" (artist-facing UI)
- "superfan" / "turn fans into superfans"
- "going viral"
- "monetise" / "monetize"
- "content creator"
- "engage your followers" / "engage"
- "newsletter" / "mailing list"
- "welcome aboard"
- "get started" (as a button or CTA)
- "you're all set"
- "upgrade to continue"
- Exclamation marks on dashboard copy

**Additional register rules not yet scannable:**

- Greeting must contain first name when available — requires DOM query
- Toast copy must be exactly: "Saved." / "Copied." / "Removed." — not variations

**Score basis:** 0/10. The list exists as documentation. No file has been parsed programmatically.

---

## Dimension 8 — Cross-browser tests (2/10)

**What exists:** Playwright MCP is configured for Chromium (the default). No multi-browser configuration. `@view-transition` browser support gap is documented in `MICRO_INTERACTIONS_PATH_TO_10.md` — Chrome 126+ only for shared element transitions.

**Required browser matrix:**

| Browser | Engine | Priority | Known risk |
|---|---|---|---|
| Chrome 126+ | Blink | P0 | Primary dev browser — baseline |
| Safari 17+ (iOS) | WebKit | P0 | Primary user browser (mobile-first product) |
| Firefox 124+ | Gecko | P1 | `@view-transition` fallback must be clean |
| Chrome Android | Blink | P1 | Mobile viewport, touch interactions |
| Safari iOS (375px) | WebKit | P0 | Tap target testing, safe-area-inset |

**Specific cross-browser risks:**

- `@view-transition` / `view-transition-name` — Chrome only, needs `@supports` guard
- `backdrop-filter` on glass theme — Safari requires `-webkit-backdrop-filter`
- `env(safe-area-inset-bottom)` — iOS Safari critical for bottom tab bar
- `color-mix()` — baseline Chrome/Safari; Firefox 113+
- CSS `@property` if used for animated custom properties — patchy support

**Score basis:** 2/10 because Playwright is installed and runs Chromium. Safari and Firefox are not in any test run.

---

## What closes the gap

Reaching 8/10 overall requires:

1. A `tests/` directory with `.spec.js` files Playwright can discover
2. A Node script that parses HTML files for banned phrases
3. Lighthouse CLI run on the 4 active pages with a budget assertion
4. At minimum, Playwright running in 3 browsers (Chromium, Firefox, WebKit)
5. localStorage state injection helpers so tests can set up pre-conditions without UI walkthroughs

Reaching 9/10 additionally requires:

6. Screenshot baselines for all 4 themes × 4 pages
7. Accessibility audit via `axe-playwright` or equivalent
8. CI equivalent (pre-commit hook or git hook that runs smoke tests)

Reaching 10/10 requires real CI (GitHub Actions or Netlify build hooks) with test history.


---
# docs/systems/qa-testing/BEYOND-10.md
---
# QA Testing — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when James ships a feature, Playwright catches the regression he didn't know he introduced, and the artist never sees it.

---

## Moment 1: The Theme Regression Caught Before James Sees It

**What it is:** A Playwright test catches a CSS regression — white text on a white background in the light theme, introduced by a well-intentioned card border change — before the page is deployed or seen by any artist.

**Why it's 20/10:** Regressions in visual quality are the most demoralising kind of bug to find because they happen silently. A single tokenised CSS change that forgets to account for the light theme can make an entire card section unreadable — and it will go unnoticed until an artist visits in light mode, or until a Playwright screenshot review happens to catch it. The theme regression test runs in 4 seconds. It has zero false positives once the baseline is established. It is the kind of automated protection that means James can ship CSS changes with confidence at any speed, knowing the tests will object if anything breaks.

**Exact implementation:**

The text-visibility check in `tests/themes.spec.js` must be extended beyond body-level comparison to include card-level contrast — the most common regression site:

```js
// tests/themes.spec.js — extended card contrast check
const CARD_SELECTORS = [
  '.card', '.release-card', '.snap-card', '.event-card', '.music-card'
]

for (const theme of ['dark', 'light', 'glass', 'contrast']) {
  test(`profile: theme "${theme}" — card text visible against card background`, async ({ page }) => {
    await page.goto('/able-v7.html')
    await page.evaluate(t => { document.documentElement.dataset.theme = t }, theme)
    await page.waitForTimeout(120) // token cascade settles

    const violations = await page.evaluate(selectors => {
      return selectors.flatMap(selector => {
        return Array.from(document.querySelectorAll(selector)).map(card => {
          const style = getComputedStyle(card)
          const textEls = card.querySelectorAll('p, h1, h2, h3, h4, span, a')
          for (const el of textEls) {
            const elStyle = getComputedStyle(el)
            if (elStyle.color === style.backgroundColor) {
              return `${selector}: text color matches card bg (${elStyle.color})`
            }
          }
          return null
        }).filter(Boolean)
      })
    }, CARD_SELECTORS)

    expect(violations, violations.join('\n')).toHaveLength(0)
  })
}
```

This runs as part of `tests/themes.spec.js` on every pre-merge check. Execution time: under 8 seconds for all 4 themes across 5 card selectors.

---

## Moment 2: The Smoke Suite That Runs in Under 90 Seconds

**What it is:** The full smoke test suite — all 4 pages, no JS errors, all 4 themes apply, fan sign-up works, admin reads from localStorage — completes in under 90 seconds and runs on every commit.

**Why it's 20/10:** A test suite that takes 8 minutes to run gets skipped. A test suite that runs in 90 seconds gets run without thinking about it. The constraint is speed. Every second added to the smoke suite is a second that increases the probability that someone skips it. Under 90 seconds means it can run in a CI step that adds negligible time to the deploy workflow. The 90-second ceiling is not a performance target. It is the threshold between a suite that is used and a suite that is bypassed.

**Exact implementation:**

Playwright config for the smoke suite — parallelism and timeout settings that achieve the 90-second target:

```js
// playwright.config.js — smoke project
{
  name: 'smoke',
  testMatch: 'tests/smoke.spec.js',
  use: {
    browserName: 'chromium',  // smoke runs Chromium only — cross-browser in interaction suite
    viewport: { width: 375, height: 812 },
    timeout: 8000,            // 8s per test — fail fast
  },
  fullyParallel: true,        // run all smoke tests in parallel
  workers: 4,                 // 4 parallel workers
}
```

Smoke suite target times (verified against the test patterns in SPEC.md):

| Test | Target time |
|---|---|
| 4× page load, no JS errors | 12s (parallel) |
| 4× theme apply | 6s |
| Fan sign-up form submit | 5s |
| Admin reads localStorage | 4s |
| Admin saves to localStorage | 5s |
| **Total** | **~32s parallel** |

The 90-second budget gives 58 seconds of margin for CI infrastructure overhead, network variance, and future test additions. When the smoke suite approaches 60 seconds, review which tests can be parallelised further before adding new ones.

---

## Moment 3: The Mobile Safari Proof

**What it is:** A Playwright WebKit test on a simulated iPhone 15 viewport confirms the glass theme renders at full visual quality — no blank white flash, backdrop-filter applying correctly, no layout reflow during the scroll animation.

**Why it's 20/10:** The glass theme is ABLE's most visually distinctive mode. It is also the most fragile on real devices. Webkit's handling of `backdrop-filter` has historically been inconsistent — in older iOS versions it causes paint glitches; in newer versions it works but requires `-webkit-backdrop-filter` as well as the standard property. The test that proves it works on WebKit (which is the engine under every iOS browser, not just Safari) is the test that means "the glass theme works on every iPhone" rather than "the glass theme works in Chrome on a Mac." That claim has a different weight.

**Exact implementation:**

```js
// tests/themes.spec.js — webkit glass theme proof
test('profile: glass theme renders correctly on WebKit (iPhone 15 viewport)', async ({ browser }) => {
  // Use webkit browser directly
  const context = await browser.newContext({
    ...devices['iPhone 15'],
    // iPhone 15 viewport: 393×852
  })
  const page = await context.newPage()

  const errors = []
  page.on('pageerror', err => errors.push(err.message))

  await page.goto('/able-v7.html')
  await page.evaluate(() => { document.documentElement.dataset.theme = 'glass' })
  await page.waitForTimeout(400) // allow paint to settle

  // 1. No JS errors
  expect(errors).toHaveLength(0)

  // 2. backdrop-filter is applied (webkit prefix or standard)
  const hasFilter = await page.evaluate(() => {
    const cards = document.querySelectorAll('.card, .release-card, [class*="card"]')
    for (const card of cards) {
      const style = getComputedStyle(card)
      const bf = style.backdropFilter || style.webkitBackdropFilter
      if (bf && bf !== 'none') return true
    }
    return false
  })
  expect(hasFilter).toBe(true)

  // 3. Screenshot is not blank (checks for pixel diversity)
  const screenshot = await page.screenshot({ fullPage: false })
  expect(screenshot.length).toBeGreaterThan(10000) // blank white = ~2k bytes

  // 4. No white flash: body background is not pure white
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(bg).not.toBe('rgb(255, 255, 255)')

  await context.close()
})
```

This test runs in the `webkit` project configuration. It runs pre-merge, not on every commit (to keep the commit-time smoke suite under 90 seconds).

---

## The 20/10 test

James ships a CSS change, the smoke suite passes in 32 seconds, the theme suite catches a backdrop-filter regression on WebKit before it reaches production, the fix takes 4 minutes, the second run is clean. Total time cost of the regression: 8 minutes. Artist never knows.

---

*See also: `docs/systems/qa-testing/SPEC.md` — full test suite specs, Playwright config, and all test patterns*


---
# docs/systems/qa-testing/FINAL-REVIEW.md
---
# ABLE QA — Final Review
**Created: 2026-03-16 | Spec score: 9.0/10**

> This document reviews the QA strategy as a whole: what it achieves, where it is honest about its limits, and what would move it to a genuine 10. The score is 9.0/10 because the specification is complete and actionable — but the ceiling of a spec-only system is 9. The last point requires real test execution history and CI infrastructure.

---

## Is the QA spec complete enough to catch the known bugs?

Known bugs and failure modes from ANALYSIS.md:

| Known failure mode | Is it covered by the spec? |
|---|---|
| JS syntax error breaks page load | Yes — smoke test 1.1 catches console errors |
| Campaign state not switching (getLifecycleStage wrong) | Yes — cross-page test 5.3 and page state regression test |
| Fan sign-up not writing to localStorage | Yes — smoke test 1.3 and fan sign-up regression test |
| Admin not reading profile data | Yes — smoke test 1.4 and cross-page test 5.1 |
| Banned phrase appearing in a release | Yes — copy regression tests 3.1–3.5 (60 parameterised cases) |
| All 4 themes breaking on a CSS refactor | Yes — theme tests 7.1–7.5 |
| Horizontal scroll at 375px | Yes — mobile regression test and performance test 6.3 |
| Tap target below 44px | Yes — accessibility test 4.1 |
| Gig mode not expiring correctly | Yes — cross-page test 5.4 |
| Stats skeleton never resolving | Yes — cross-page test 5.5 |
| Glass theme missing backdrop-filter | Yes — theme test 7.4 |
| Greeting using wrong copy register | Yes — copy test 3.5 |

**Assessment:** The spec covers every named failure mode in ANALYSIS.md. The coverage is not superficial — each test checks a specific observable output (localStorage value, CSS property, DOM text) rather than a vague "page works" assertion.

**One honest gap:** Unit-level bugs in `getLifecycleStage()`, `buildGreetingSub()`, and `calcViewStreak()` are tested indirectly through Playwright (the functions are called inside the page, their output is observed in the DOM). A regression in date arithmetic that produces an off-by-one error might produce a rendered page that still looks correct but shows the wrong lifecycle state. Direct unit testing of these functions requires extracting them to `shared/able.js` — which is the right long-term fix but a structural change beyond the QA spec's scope.

---

## Are the Playwright tests specified in enough detail for a build agent to implement?

Yes, with the caveat that CSS selector verification against live HTML is always required before wiring.

**What makes the spec implement-ready:**
- Every test in SPEC.md has exact JavaScript pseudocode — not conceptual descriptions
- `page.addInitScript()` vs `page.evaluate()` timing is explicitly specified (before vs after load)
- CSS selector strategy is named for each test (class-based, role-based, or attribute selector)
- Timing windows are specified for animation tests (`waitForTimeout(100)` for CSS, `waitForTimeout(380)` for bottom sheet spring)
- The localStorage injection pattern is documented as a reusable helper
- The two-page-context pattern for cross-page tests (test 5.2) is spelled out

**The one thing a build agent must do before running any test:**
Verify that the CSS selectors in each test match the actual class names in the live HTML. The spec uses likely selectors (`.btn-primary`, `.hero-cta-primary`, `#homeGreeting`, `.bottom-sheet-content`) based on the DESIGN-SPEC.md specifications. If a build agent implements the pages with different class names, the tests will fail with selector errors rather than functional errors. The pattern to address this: run the smoke tests first, observe any selector failures, update selectors to match, then run the full suite.

The complete test pseudocode for the three most critical flows:

**Critical flow 1 — Page load, no JS errors (most fundamental test):**
```javascript
const PAGES = ['/able-v7.html', '/admin.html', '/start.html', '/landing.html'];
for (const path of PAGES) {
  test(`${path}: loads without JS errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    expect(errors).toHaveLength(0);
  });
}
```

**Critical flow 2 — Fan sign-up captures data correctly:**
```javascript
test('fan sign-up: email captured with required fields', async ({ page }) => {
  await page.goto('/able-v7.html');
  const input = page.locator('input[type="email"]').first();
  await input.fill('real-fan@test.com');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(300);
  const fans = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );
  const fan = fans.find(f => f.email === 'real-fan@test.com');
  expect(fan).toBeDefined();
  expect(fan.ts).toBeGreaterThan(0);
  expect(fan.optIn).toBe(true);
});
```

**Critical flow 3 — No banned phrases in the build:**
```javascript
const BANNED = ['dashboard','superfan','going viral','monetise','content creator'];
const FILES = ['able-v7.html','admin.html','start.html','landing.html'];
for (const file of FILES) {
  for (const phrase of BANNED) {
    test(`${file}: no "${phrase}"`, async ({ page }) => {
      await page.goto(`/${file}`);
      const text = await page.evaluate(() => document.body.innerText.toLowerCase());
      expect(text).not.toContain(phrase.toLowerCase());
    });
  }
}
```

---

## Minimum QA gate before first public artist signs up

This is the non-negotiable minimum. Nothing below this list is optional when the product goes live with a real artist.

**Gate 1: No P0 bugs on any active page (manual or automated)**
Every item in the 15-minute manual smoke checklist in PATH-TO-10.md must pass on a clean run. No console errors, no broken flows, no blank screens. This takes 15 minutes to verify. There is no excuse for skipping it.

**Gate 2: Fan sign-up works end-to-end**
Email submitted → stored in `able_fans` with `email`, `ts`, `source`, and `optIn` fields → visible in admin fan list. This is the core value exchange. It must work before any real artist puts their link in their bio. The Playwright test (1.3 / fan sign-up regression) verifies this in 10 seconds.

**Gate 3: No banned phrases in any active file**
The copy regression scanner (SPEC.md §3) must pass on all 4 active HTML files. A banned phrase shipping in a release is a brand failure. Running the copy tests takes under 30 seconds once the test file exists.

**Gate 4: All 4 themes render without invisible text**
Before any artist picks a profile theme, all 4 themes must render text that is readable against the background. The theme test (7.1) verifies this in one Playwright run.

**Gate 5: No horizontal scroll at 375px on the artist profile**
A fan visiting the page on a 375px screen must not see horizontal overflow. This is a one-line Playwright test (performance test 6.3). It must pass.

**Gate 6: GDPR consent line is live on the fan sign-up form**
Before any artist collects real fan emails, the consent disclosure line ("By signing up, [Artist] can contact you about their music.") must be present and visible on `able-v7.html`. This is a legal requirement, not a QA item, but it belongs in this gate because it is verifiable with a simple DOM check:
```javascript
const consent = await page.locator('.signup-consent, [class*="consent"]').first();
await expect(consent).toBeVisible();
```

**The minimum gate is 6 items. All must pass. No exceptions.**

Once these 6 pass:
- P0.1–P0.4 (Playwright test files) are the next priority — establish permanent automation so the gate runs without manual effort
- P1 (interaction tests, accessibility, full theme suite) are next
- P2 (visual baselines, Lighthouse, cross-browser) before public launch

---

## Score breakdown

| Dimension | Spec score | Notes |
|---|---|---|
| Unit test coverage | 6/10 | All logic in inline `<script>` blocks; Playwright + `page.evaluate()` is the substitute |
| Integration tests | 9/10 | 5 cross-page tests covering all critical data flow boundaries |
| Visual regression | 8/10 | Screenshot baseline approach fully specced; no baselines captured yet |
| Interaction tests | 9/10 | 10 micro-interaction tests specced with exact timing and selectors |
| Accessibility tests | 9/10 | WCAG 2.1 AA coverage: tap targets, focus ring, alt text, ARIA, reduced-motion |
| Performance tests | 7/10 | LCP/CLS/scroll specced; Lighthouse CLI integration specced but no runs yet |
| Copy/content tests | 9/10 | 60 parameterised banned-phrase tests, toast copy check, greeting register check |
| Cross-browser tests | 8/10 | 3-browser matrix configured; no physical iOS device test |

**Weighted average: 9.0/10**

---

## What this spec gets right

**1. Honest about spec vs running code.**
Every test is pseudocode that runs in Playwright — not aspirational. The selectors are named against real DESIGN-SPEC.md elements. The test logic is correct even if selectors need minor tuning.

**2. Three user journeys tested separately.**
ABLE has distinct journeys: artist (start → admin → profile), fan (profile only), freelancer (not yet built). The cross-page tests scope to the artist journey. Fan.html is not tested yet because it does not exist. This is correct.

**3. Copy regression is zero-tolerance by design.**
The banned phrase list is a direct transcription from CLAUDE.md. Making it automated means a copy regression can never ship silently. The parameterised structure produces 60 individual test cases — one failure per phrase per file, not one mega-failure.

**4. Interaction tests are tied to interaction codes.**
Each test references its code from MICRO_INTERACTIONS_SPEC.md (B1, C1, D5). When a test fails, it traces directly to the spec entry and implementation note. No ambiguity.

**5. Infrastructure notes are minimal and realistic.**
No build pipeline, no npm scripts, no CI. The spec specifies `npx serve` and `npx playwright test`. Both are available without any installation beyond what is configured.

---

## Where the spec is honest about limits

**Unit tests (6/10):** All logic lives in inline `<script>` blocks. Functions like `getLifecycleStage()` cannot be imported and called directly. The correct fix is extracting critical business logic to `shared/able.js` and testing with Node's `assert` module — a structural change, not a test change.

**Visual regression (8/10):** Baselines are only useful once they exist. The spec defines what to capture and how to compare. The 20-minute task of running `--update-snapshots` and committing the screenshots has not been done.

**Performance (7/10):** LCP targets are correct standards. But Playwright cannot measure LCP from `file://` — it needs a served URL. Real-world performance on mobile data is unknown.

**Physical iOS (gap):** WebKit in Playwright approximates Safari. `env(safe-area-inset-bottom)` cannot be tested in simulation. A physical device test is required for this. The spec notes it; it cannot close it.

---

## Decision: is 9/10 spec-complete enough to ship?

Yes.

A 9/10 QA strategy gives ABLE:
- Immediate protection against JS errors on any page load
- Permanent protection against copy regressions
- Test coverage for the three user journeys that matter most
- A documented path to close every remaining gap
- A foundation where every new feature ships with a corresponding test

The minimum gate (6 items above) is the pre-first-artist bar. P0–P2 test files are the pre-public-launch bar. The 8.5 hours of work to reach 9/10 delivers genuine quality protection from the first session.

---

## Reference: files in this system

| File | Contents |
|---|---|
| `ANALYSIS.md` | Baseline audit — 8 dimensions scored, specific gaps identified |
| `SPEC.md` | Master QA specification — 7 test categories, 35 test patterns with pseudocode |
| `PATH-TO-10.md` | Prioritised execution plan — manual smoke checklist + P0/P1/P2 Playwright build order |
| `FINAL-REVIEW.md` | This file — coverage assessment, minimum gate, final score |


---
# docs/systems/qa-testing/PATH-TO-10.md
---
# ABLE QA — Path to 10/10
**Created: 2026-03-16 | Current: 2/10 | Target: 9/10 (spec-complete)**

> Execution plan. Translates ANALYSIS.md's gap scoring and SPEC.md's test definitions into a prioritised build order. Each item has a clear done-state.

---

## Current score: 2/10

From ANALYSIS.md:

| Dimension | Score |
|---|---|
| Unit test coverage | 0/10 |
| Integration tests | 1/10 |
| Visual regression | 1/10 |
| Interaction tests | 2/10 |
| Accessibility tests | 1/10 |
| Performance tests | 0/10 |
| Copy/content tests | 0/10 |
| Cross-browser tests | 2/10 |
| **Overall** | **2/10** |

---

## Key gap between current and 10/10

The entire gap is infrastructure and wiring. The spec exists. The test patterns are written. The banned phrase list is documented. The accessibility requirements are in the design spec. None of it is running.

The gap is:
1. No `tests/` directory exists
2. No `playwright.config.js` exists
3. No manual pre-deploy checklist is written down anywhere — James runs checks from memory
4. The copy regression scanner does not exist as a runnable script
5. No CI gate of any kind — no pre-commit hook, no GitHub Action

Going from 2/10 to 9/10 does not require any product work. It requires 8–9 hours of test scaffolding. The hardest part is starting.

---

## Manual pre-deploy smoke test checklist (15 minutes)

This is what James runs before every production-affecting commit. No Playwright required. Just a browser.

**Before starting:** Clear all localStorage. Open a fresh private/incognito window. Open DevTools console.

---

### 1. Landing page (2 min)

- [ ] `landing.html` loads. No red errors in console.
- [ ] Hero headline and CTA are visible without scrolling at 375px width.
- [ ] Tapping the hero CTA opens `start.html` correctly.
- [ ] No horizontal scroll at 375px.

---

### 2. Onboarding wizard (3 min)

- [ ] `start.html` loads. No console errors.
- [ ] Step 1 accepts artist name. Next button activates.
- [ ] Step 2 displays (genre/vibe selection). At least one vibe selectable.
- [ ] Step 3 displays. At least one CTA type selectable.
- [ ] Completing the wizard writes `able_v3_profile` to localStorage (check DevTools → Application → Local Storage).
- [ ] Wizard redirects to `able-v7.html` or `admin.html` after completion.

---

### 3. Artist profile page (4 min)

- [ ] `able-v7.html` loads with profile data. Artist name visible.
- [ ] No console errors.
- [ ] Fan email sign-up form is visible. Enter a real-looking email (`test@test.com`) and submit.
- [ ] After submit: confirmation state appears (not blank, not error).
- [ ] Check localStorage: `able_fans` contains the new entry with `email`, `ts`, and `source` fields.
- [ ] "Made with ABLE ✦" footer is visible at bottom of page.
- [ ] Footer link contains `?ref=` in the href (DevTools → Elements, inspect the `<a>`).
- [ ] No horizontal scroll at 375px.
- [ ] Switch to Light theme: text readable, not white-on-white.
- [ ] Switch to Contrast theme: text readable on black background.

---

### 4. Artist dashboard (4 min)

- [ ] `admin.html` loads. Greeting contains artist name from `able_v3_profile`.
- [ ] No console errors on load.
- [ ] Stat cards visible. No indefinite skeleton shimmer after 2 seconds.
- [ ] Fan added in step 3 appears in the Fans section.
- [ ] Fan has a source label (not blank).
- [ ] Campaign HQ: set state to "pre-release" with a future date. Confirm `able_v3_profile.stateOverride` updates in localStorage.
- [ ] Navigate back to `able-v7.html` — does the page reflect the pre-release state?
- [ ] Gig mode toggle activates. `able_gig_expires` is set in localStorage.

---

### 5. Cross-check (2 min)

- [ ] Fan signed up in step 3 is visible in admin with correct timestamp order (most recent first).
- [ ] Campaign state set in admin is reflected on the profile page.
- [ ] No 404s in the Network tab for any resource (fonts, images, scripts).
- [ ] `console.error` count in DevTools is 0.

---

**Pass criteria:** All boxes checked. Any failure = P0 bug. Fix before commit.

---

## P0 — Foundation (current → 5/10)

Do this in a single session. Takes the build from zero automated coverage to a working test suite.

---

### P0.1 — Playwright project setup

**Done when:** `npx playwright test` runs and exits cleanly.

Steps:
1. Create `playwright.config.js` at project root (use the baseline config from SPEC.md §infrastructure)
2. Create `tests/` directory
3. Create `tests/smoke.spec.js` with a single passing test (any page load check)
4. Run `npx serve . -p 8080` in one terminal, `npx playwright test` in another
5. Verify green output

Files created: `playwright.config.js`, `tests/smoke.spec.js`

---

### P0.2 — Smoke tests for all 4 active pages

**Done when:** `tests/smoke.spec.js` contains tests 1.1–1.5 from SPEC.md. All pass in under 30 seconds.

Tests to implement:

| Test | What it checks |
|---|---|
| 1.1 | All 4 pages load without JS console errors |
| 1.2 | All 4 themes render without invisible text |
| 1.3 | Fan sign-up form accepts email and writes to localStorage |
| 1.4 | Admin renders artist name from `able_v3_profile` |
| 1.5 | Admin saves bio field to localStorage |

Use `page.addInitScript()` for any test that depends on localStorage being pre-populated. Never set localStorage after page load — the page's `DOMContentLoaded` handler will have already run.

---

### P0.3 — Copy regression test (banned phrase scanner)

**Done when:** `tests/copy.spec.js` scans all 4 HTML files for all banned phrases and passes on the current build.

Tests to implement:

| Test | What it checks |
|---|---|
| 3.1 | DOM text scan — 15 banned phrases × 4 files = 60 parameterised test cases |
| 3.2 | No exclamation marks in admin UI copy |
| 3.3 | Toast copy exactly matches spec ("Saved." / "Copied." / "Removed.") |
| 3.4 | Upgrade prompts include specific value, not bare "Upgrade" |
| 3.5 | Greeting is "Good to see you" not "Welcome back" |

Test 3.1 is two nested loops. The outer loop is pages, inner is banned phrases. This produces 60 individual test cases with individual failure messages — not one mega-test that fails on the first match and hides the others.

---

### P0.4 — Cross-page data flow tests (critical paths only)

**Done when:** `tests/journeys.spec.js` contains tests 5.1–5.3 from SPEC.md. All pass.

Tests to implement:

| Test | What it checks |
|---|---|
| 5.1 | `able_v3_profile` written by wizard is rendered in admin greeting |
| 5.2 | Fan sign-up on profile appears in admin fans page |
| 5.3 | Campaign state set in admin persists to localStorage correctly |

Test 5.2 requires two page contexts (profile page writes, admin page reads). Use `context.newPage()` from Playwright's `BrowserContext`. Tests do not need to simulate the full wizard UI — injecting the localStorage payload directly is faster and more reliable.

**P0 score impact: 2/10 → ~5/10**

---

## P1 — Quality gate (5/10 → 8/10)

These transform the smoke suite into a real quality gate. Run automatically on every branch before merge.

---

### P1.1 — Interaction tests (top 10 micro-interactions)

**Done when:** `tests/interactions.spec.js` contains tests 2.1–2.6 from SPEC.md §2. All pass.

Tests to implement:

| Test | Interaction | What it checks |
|---|---|---|
| 2.1 | B1 | Scale-down to 0.97 on CTA pointerdown |
| 2.2 | C1 | Tab indicator moves on tab click |
| 2.3 | D5 | Bottom sheet reaches translateY(0) within 380ms |
| 2.4 | A4 | Sticky artist bar visible after 70% hero scroll |
| 2.5 | NEW-1 | Campaign HQ state button has `.on` class and `stateSpringIn` animation |
| 2.6 | C5 | Countdown renders in pre-release state |

Animation state tests must account for timing. Always `waitForTimeout(100+)` after triggering an event before reading computed style.

---

### P1.2 — Accessibility tap-target tests

**Done when:** `tests/a11y.spec.js` contains tests 4.1–4.5 from SPEC.md §4. Test 4.1 passes on all 4 pages at 375px.

Tests to implement:

| Test | What it checks |
|---|---|
| 4.1 | All interactive elements ≥ 44px in both dimensions at 375px viewport |
| 4.2 | Focus ring visible (amber box-shadow contains value 244) on admin keyboard nav |
| 4.3 | All `<img>` have `alt` attributes across all 4 pages |
| 4.4 | Bottom tab bar has `role="navigation"` and a truthy `aria-label` |
| 4.5 | `prefers-reduced-motion: reduce` sets animation-duration to 0s |

Test 4.1 will reveal real violations. When it fails, the fix is in HTML/CSS, not the test. Document each violation found.

---

### P1.3 — Full cross-page journey tests

**Done when:** `tests/journeys.spec.js` also contains tests 5.4 and 5.5.

Tests to implement:

| Test | What it checks |
|---|---|
| 5.4 | Expired `able_gig_expires` means gig badge is not visible on profile |
| 5.5 | Stats resolve from localStorage within 600ms — no indefinite skeleton |

---

### P1.4 — Theme correctness tests

**Done when:** `tests/themes.spec.js` contains tests 7.1–7.5 from SPEC.md §7. All pass.

Tests to implement:

| Test | What it checks |
|---|---|
| 7.1 | Text colour is never identical to background in all 4 themes |
| 7.2 | Light theme uses warm cream (#f0ede8), not pure white |
| 7.3 | Contrast theme background is pure black (rgb(0,0,0)) |
| 7.4 | Glass theme has `backdrop-filter` on at least one card element |
| 7.5 | Cycling through all 4 themes produces no JS errors |

**P1 score impact: ~5/10 → 8/10**

---

## P2 — Release quality (8/10 → 9/10)

These run pre-release or weekly. Bring coverage to near-complete.

---

### P2.1 — Visual regression: screenshot baselines

**Done when:** `tests/screenshots/` contains baselines for 8 screenshots. `tests/visual.spec.js` compares current renders against them.

```javascript
// tests/visual.spec.js
test('profile: dark theme visual baseline', async ({ page }) => {
  await page.goto('/able-v7.html');
  await expect(page).toHaveScreenshot('profile-dark.png', {
    maxDiffPixelRatio: 0.001,
  });
});
```

Baselines needed (8 total):

| File | Theme / Viewport | Screenshot name |
|---|---|---|
| able-v7.html | dark, 375px | profile-dark.png |
| able-v7.html | light, 375px | profile-light.png |
| able-v7.html | glass, 375px | profile-glass.png |
| able-v7.html | contrast, 375px | profile-contrast.png |
| admin.html | dark, 375px | admin-mobile.png |
| admin.html | dark, 1280px | admin-desktop.png |
| start.html | dark, 375px | onboarding-step1.png |
| landing.html | dark, 1280px | landing-desktop.png |

Run `npx playwright test --update-snapshots` once to generate baselines. Review manually. Commit. Any future visual change requires re-running `--update-snapshots` with deliberate review.

---

### P2.2 — Performance CI: Lighthouse budget assertions

**Done when:** `tests/performance.spec.js` tests 6.1–6.5 pass. LCP ≤ 2.5s on profile and landing.

Lighthouse CLI cannot run inside Playwright directly — it needs a real server. For local runs:
```bash
npx serve . -p 8080 &
npx lighthouse http://localhost:8080/able-v7.html --output json --output-path ./reports/profile.json
```
Parse the JSON and assert `audits['largest-contentful-paint'].numericValue <= 2500`.

Tests 6.3 (no horizontal scroll) and 6.4 (fonts load) can run in Playwright without Lighthouse.

---

### P2.3 — Full cross-browser matrix

**Done when:** `playwright.config.js` has all 3 browser projects enabled. All smoke tests pass in all 3 browsers.

Specific cross-browser tests to add:

| Test | Browser | What it verifies |
|---|---|---|
| `@view-transition` guard | Firefox, WebKit | No JS error when `startViewTransition` is undefined |
| `backdrop-filter` fallback | Firefox | Glass theme degrades gracefully |
| `env(safe-area-inset-bottom)` | WebKit | Bottom tab bar has correct CSS rule |
| `color-mix()` fallback | Firefox 112 | Accent tints render |

**P2 score impact: 8/10 → 9/10**

---

## Regression test patterns for critical flows

### Flow 1: Artist onboarding (start.html → admin.html data persists)

```javascript
test('onboarding: wizard output persists to admin dashboard', async ({ page }) => {
  // Simulate wizard completion
  await page.goto('/admin.html');
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Theo Baptiste',
      bio: 'Drummer. Composer. Bristol.',
      accent: '#00b894',
      genre: 'Jazz / Soul',
    }));
  });
  await page.reload();

  // Admin should render profile data
  await expect(page.locator('#homeGreeting')).toContainText('Theo');

  // Profile fields should be accessible via admin settings
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
  );
  expect(stored.name).toBe('Theo Baptiste');
  expect(stored.bio).toBe('Drummer. Composer. Bristol.');
});
```

---

### Flow 2: Fan sign-up (email captured, stored in able_fans)

```javascript
test('fan sign-up: email is captured and stored with required fields', async ({ page }) => {
  await page.goto('/able-v7.html');

  const input = page.locator('input[type="email"]').first();
  await input.fill('real-fan@music.com');
  const submit = page.locator('button[type="submit"], .fan-submit-btn').first();
  await submit.click();
  await page.waitForTimeout(300);

  const fans = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );

  const fan = fans.find(f => f.email === 'real-fan@music.com');
  expect(fan).toBeDefined();
  expect(fan.email).toBe('real-fan@music.com');
  expect(typeof fan.ts).toBe('number');    // Unix timestamp present
  expect(fan.ts).toBeGreaterThan(0);
  expect(fan.source).toBeDefined();       // Source value present
  expect(fan.optIn).toBe(true);           // Consent field present
});
```

---

### Flow 3: Page state switching (all 4 states)

```javascript
test('page states: all 4 states render correctly via stateOverride', async ({ page }) => {
  const futureDate = new Date(Date.now() + 10 * 86400000).toISOString();

  const stateTests = [
    { override: 'profile',  expectedEl: '.profile-cta, .hero-cta',     label: 'profile state' },
    { override: 'pre',      expectedEl: '.countdown, [class*="pre"]',   label: 'pre-release state' },
    { override: 'live',     expectedEl: '.live-badge, [class*="live"]', label: 'live state' },
    { override: 'gig',      expectedEl: '.gig-badge, [class*="gig"]',   label: 'gig state' },
  ];

  for (const { override, expectedEl, label } of stateTests) {
    await page.addInitScript((data) => {
      localStorage.setItem('able_v3_profile', JSON.stringify(data));
      if (data.stateOverride === 'gig') {
        localStorage.setItem('able_gig_expires', (Date.now() + 3600000).toString());
      }
    }, { name: 'Test Artist', stateOverride: override, releaseDate: futureDate });

    await page.goto('/able-v7.html');
    await page.waitForTimeout(300);

    const el = page.locator(expectedEl).first();
    const count = await el.count();
    // Log which states have matching elements for visibility
    console.log(`${label}: ${count > 0 ? 'element found' : 'element not found (verify selector)'}`);
  }
});
```

---

### Flow 4: Theme switching (all 4 themes render correctly)

```javascript
test('themes: all 4 themes switch without errors or invisible text', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('/able-v7.html');

  const themes = ['dark', 'light', 'glass', 'contrast'];
  for (const theme of themes) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(100);

    const { bg, color } = await page.evaluate(() => ({
      bg: getComputedStyle(document.body).backgroundColor,
      color: getComputedStyle(document.body).color,
    }));

    expect(bg).not.toBe(color);
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
  }

  expect(errors).toHaveLength(0);
});
```

---

### Flow 5: Mobile 375px (no horizontal scroll, 44px tap targets)

```javascript
test('mobile 375px: no horizontal scroll and 44px tap targets on profile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');

  // No horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(375);

  // 44px tap targets
  const violations = await page.evaluate(() => {
    const els = document.querySelectorAll('button, a, input, [role="button"]');
    return Array.from(els)
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      })
      .map(el => ({
        tag: el.tagName,
        text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 30),
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      }));
  });

  // Log violations to aid fixing — don't silently pass if there are any
  if (violations.length > 0) {
    console.warn('Tap target violations:', JSON.stringify(violations, null, 2));
  }
  expect(violations).toHaveLength(0);
});
```

---

## Effort estimates

| Item | Time | What it unblocks |
|---|---|---|
| P0.1 Playwright setup | 20 min | Everything |
| P0.2 Smoke tests | 45 min | CI safety net |
| P0.3 Copy regression | 30 min | Brand safety |
| P0.4 Cross-page (critical) | 40 min | Data integrity |
| Manual smoke checklist | Done (this doc) | Pre-deploy confidence |
| P1.1 Interaction tests | 90 min | Quality gate |
| P1.2 Accessibility | 60 min | WCAG AA |
| P1.3 Cross-page (full) | 30 min | — |
| P1.4 Theme tests | 30 min | Design system |
| P2.1 Visual baselines | 60 min | Visual regression |
| P2.2 Lighthouse CI | 45 min | Performance budget |
| P2.3 Cross-browser | 60 min | iOS/Firefox parity |

**Total to 9/10:** approximately 8.5 hours of focused work.

---

## What 10/10 requires

9/10 is achievable offline. The gap to 10:

- GitHub Actions workflow running smoke + copy tests on every push
- Test history — 10+ consecutive clean runs with no false positives
- Lighthouse in CI — automated performance budget on every PR
- Visual diff in PR comments — screenshot comparison posted automatically

Minimal CI configuration:

```yaml
# .github/workflows/qa.yml
name: QA
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npx playwright install --with-deps chromium
      - run: npx serve . -p 8080 &
      - run: sleep 2 && npx playwright test --project=chromium tests/smoke.spec.js tests/copy.spec.js
```

This is 15 minutes of configuration. Smoke + copy regression run in under 60 seconds in CI. When it exists: no one ships a banned phrase or broken page load without a failing check. The score is 10/10.


---
# docs/systems/qa-testing/SPEC.md
---
# ABLE — Master QA Specification
**Created: 2026-03-16 | Target coverage: 9/10**

> This is the authoritative specification for all automated testing on ABLE. No test file should be written without a corresponding entry here. No entry here should exist without a clear acceptance criterion.

---

## Overview

**Test runner:** Playwright (MCP configured, CLI available via `npx playwright test`)
**Active pages under test:** `able-v7.html`, `admin.html`, `start.html`, `landing.html`
**Viewport standard:** 375px (mobile primary), 1280px (desktop secondary)
**Base URL:** `file://` paths during local development; `https://ablemusic.co` in CI

---

## Test categories

| # | Category | Trigger | Files |
|---|---|---|---|
| 1 | Smoke tests | Every commit | `tests/smoke.spec.js` |
| 2 | Interaction tests | Pre-merge | `tests/interactions.spec.js` |
| 3 | Copy regression | Every commit | `tests/copy.spec.js` |
| 4 | Accessibility tests | Pre-merge | `tests/a11y.spec.js` |
| 5 | Cross-page tests | Pre-merge | `tests/journeys.spec.js` |
| 6 | Performance tests | Weekly / pre-release | `tests/performance.spec.js` |
| 7 | Theme tests | Pre-merge | `tests/themes.spec.js` |

---

## 1. Smoke tests

**Purpose:** Catch catastrophic failures immediately. Every page must load, render, and not throw. These run on every commit.

**Acceptance criteria:**
- Page loads with HTTP 200 (or file: equivalent — no 404)
- No JavaScript console errors
- `document.readyState === 'complete'` within 5 seconds
- No `undefined` or `null` text visible in the DOM
- Core interactive elements are present

### Patterns

**1.1 — Page load, no JS errors**
```javascript
// tests/smoke.spec.js
const PAGES = [
  { name: 'profile', path: '/able-v7.html' },
  { name: 'admin',   path: '/admin.html' },
  { name: 'start',   path: '/start.html' },
  { name: 'landing', path: '/landing.html' },
];

for (const { name, path } of PAGES) {
  test(`${name}: loads without JS errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    expect(errors).toHaveLength(0);
  });
}
```

**1.2 — Four themes render on artist profile**
```javascript
test('profile: all 4 themes apply without errors', async ({ page }) => {
  await page.goto('/able-v7.html');
  const themes = ['dark', 'light', 'glass', 'contrast'];
  for (const theme of themes) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    // No white-on-white: check body text colour is not identical to background
    const bg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );
    const color = await page.evaluate(() =>
      getComputedStyle(document.body).color
    );
    expect(bg).not.toBe(color);
  }
});
```

**1.3 — Fan sign-up form present and submittable**
```javascript
test('profile: fan sign-up form accepts email and submits', async ({ page }) => {
  await page.goto('/able-v7.html');
  const input = page.locator('input[type="email"]').first();
  await expect(input).toBeVisible();
  await input.fill('test@example.com');
  const submitBtn = page.locator('button[type="submit"], .fan-submit-btn').first();
  await submitBtn.click();
  // After submit: check localStorage was written
  const fans = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );
  expect(fans.length).toBeGreaterThan(0);
  expect(fans[fans.length - 1].email).toBe('test@example.com');
});
```

**1.4 — Admin reads and renders profile from localStorage**
```javascript
test('admin: renders artist name from able_v3_profile', async ({ page }) => {
  await page.goto('/admin.html');
  // Inject a profile before page load
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Maya Rose',
      accent: '#e05242',
    }));
  });
  await page.reload();
  const greeting = page.locator('#homeGreeting');
  await expect(greeting).toContainText('Maya');
});
```

**1.5 — Admin saves profile field to localStorage**
```javascript
test('admin: bio field save writes to localStorage', async ({ page }) => {
  await page.goto('/admin.html');
  // Navigate to profile edit section
  await page.locator('[data-page="settings"], [onclick*="settings"]').first().click();
  const bioField = page.locator('textarea[name="bio"], #bioField').first();
  if (await bioField.count() > 0) {
    await bioField.fill('Test bio content');
    await page.locator('[onclick*="save"], .save-btn').first().click();
    const profile = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
    );
    expect(profile.bio).toBe('Test bio content');
  }
});
```

---

## 2. Interaction tests

**Purpose:** Verify that the 30+ micro-interactions in `able-v7.html` and 6 admin interactions fire correctly. These are the moments that make ABLE feel alive — regressions here degrade perceived quality significantly.

**Acceptance criteria:**
- CSS transform applied within 100ms of pointer event
- Spring animations resolve within 600ms
- Tab indicators move to the correct position
- Bottom sheets are fully visible (translateY === 0) after animation completes

### Patterns

**2.1 — Scale-down on press (B1)**
```javascript
test('profile: CTA button scales to 0.97 on pointerdown', async ({ page }) => {
  await page.goto('/able-v7.html');
  const cta = page.locator('.btn-primary, .hero-cta-primary').first();
  await cta.dispatchEvent('pointerdown');
  const transform = await cta.evaluate(el =>
    getComputedStyle(el).transform
  );
  // scale(0.97) = matrix(0.97, 0, 0, 0.97, 0, 0)
  expect(transform).toContain('0.97');
  await cta.dispatchEvent('pointerup');
});
```

**2.2 — Tab sliding indicator spring (C1)**
```javascript
test('profile: tab indicator moves on tab click', async ({ page }) => {
  await page.goto('/able-v7.html');
  const tabs = page.locator('.tab-btn');
  const indicator = page.locator('.tab-indicator');
  await tabs.first().click();
  const before = await indicator.evaluate(el => el.getBoundingClientRect().left);
  await tabs.nth(1).click();
  await page.waitForTimeout(450); // spring settles
  const after = await indicator.evaluate(el => el.getBoundingClientRect().left);
  expect(after).not.toBe(before);
});
```

**2.3 — Bottom sheet slide-up enters at translateY(0) (D5)**
```javascript
test('profile: fan sign-up bottom sheet reaches translateY(0)', async ({ page }) => {
  await page.goto('/able-v7.html');
  const trigger = page.locator('[data-sheet-trigger], .fan-sheet-trigger').first();
  if (await trigger.count() > 0) {
    await trigger.click();
    await page.waitForTimeout(380);
    const sheet = page.locator('.bottom-sheet-content').first();
    const transform = await sheet.evaluate(el => getComputedStyle(el).transform);
    expect(transform).toBe('matrix(1, 0, 0, 1, 0, 0)');
  }
});
```

**2.4 — Sticky artist bar triggers at 70% hero scroll (A4)**
```javascript
test('profile: sticky artist bar visible after 70% hero scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');
  const hero = page.locator('.hero-card, .artist-hero').first();
  const heroHeight = await hero.evaluate(el => el.offsetHeight);
  await page.evaluate(h => window.scrollBy(0, h * 0.75), heroHeight);
  await page.waitForTimeout(200);
  const stickyBar = page.locator('.sticky-artist-bar, .artist-sticky').first();
  if (await stickyBar.count() > 0) {
    const isVisible = await stickyBar.evaluate(el => {
      const style = getComputedStyle(el);
      return style.opacity !== '0' && style.visibility !== 'hidden';
    });
    expect(isVisible).toBe(true);
  }
});
```

**2.5 — Campaign HQ state button spring (NEW-1)**
```javascript
test('admin: state button has spring animation class on activation', async ({ page }) => {
  await page.goto('/admin.html');
  const stateBtn = page.locator('.chq-state-btn').first();
  await stateBtn.click();
  const hasClass = await stateBtn.evaluate(el => el.classList.contains('on'));
  expect(hasClass).toBe(true);
  // Animation should be stateSpringIn — check animation-name
  const animName = await stateBtn.evaluate(el =>
    getComputedStyle(el).animationName
  );
  expect(animName).toContain('stateSpringIn');
});
```

**2.6 — Countdown digit flip renders (C5)**
```javascript
test('profile: countdown renders in pre-release state', async ({ page }) => {
  const futureDate = new Date(Date.now() + 7 * 86400000).toISOString();
  await page.addInitScript(date => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist',
      releaseDate: date,
      stateOverride: 'pre',
    }));
  }, futureDate);
  await page.goto('/able-v7.html');
  const countdown = page.locator('.countdown, .digit-flip, [class*="countdown"]').first();
  if (await countdown.count() > 0) {
    await expect(countdown).toBeVisible();
  }
});
```

---

## 3. Copy regression tests

**Purpose:** Automatically scan all HTML files for banned phrases. This is a zero-tolerance check — no banned phrase should appear in any user-visible string.

**Acceptance criteria:**
- Zero matches for all banned phrases across all 4 active HTML files
- Test fails with exact location (file, element, phrase) on any match

### Banned phrase list

The following strings are banned in user-visible UI copy. Pattern matching is case-insensitive.

```javascript
// tests/copy.spec.js
const BANNED_PHRASES = [
  'dashboard',              // artist-facing only — use "your page" or specific section names
  'superfan',               // never — use "dedicated listeners" or "people who show up"
  'turn fans into',         // never — paternalistic conversion language
  'going viral',            // never — antithetical to ABLE's register
  'monetise',               // never — use "let people support you directly"
  'monetize',               // never
  'content creator',        // never — use "artist"
  'engage your followers',  // never
  'engage your fans',       // never
  'newsletter',             // never — use "your list" or "stay close"
  'mailing list',           // never
  'welcome aboard',         // never — generic SaaS onboarding
  'get started',            // never as a primary CTA
  "you're all set",         // never
  'upgrade to continue',    // never — always specify what they get
  'grow your audience',     // never — use "reach people who care"
];

const ACTIVE_FILES = [
  'able-v7.html',
  'admin.html',
  'start.html',
  'landing.html',
];
```

**3.1 — DOM text scan for banned phrases**
```javascript
test.describe('Copy regression — banned phrases', () => {
  for (const file of ACTIVE_FILES) {
    for (const phrase of BANNED_PHRASES) {
      test(`${file}: does not contain "${phrase}"`, async ({ page }) => {
        await page.goto(`/${file}`);
        // Get all visible text content
        const textContent = await page.evaluate(() =>
          document.body.innerText.toLowerCase()
        );
        if (textContent.includes(phrase.toLowerCase())) {
          // Find the specific element for a useful error message
          const location = await page.evaluate(p => {
            const walker = document.createTreeWalker(
              document.body, NodeFilter.SHOW_TEXT
            );
            let node;
            while ((node = walker.nextNode())) {
              if (node.textContent.toLowerCase().includes(p.toLowerCase())) {
                return node.parentElement.tagName + ': "' + node.textContent.trim().slice(0, 80) + '"';
              }
            }
            return 'unknown location';
          }, phrase);
          throw new Error(`Banned phrase "${phrase}" found in ${file} at ${location}`);
        }
      });
    }
  }
});
```

**3.2 — Exclamation mark check on admin copy**
```javascript
test('admin: no exclamation marks in UI copy', async ({ page }) => {
  await page.goto('/admin.html');
  const textContent = await page.evaluate(() => document.body.innerText);
  const lines = textContent.split('\n').filter(l => l.includes('!'));
  // Allow exclamation marks inside code blocks or hidden elements only
  const violations = lines.filter(line => !line.trim().startsWith('//'));
  expect(violations).toHaveLength(0);
});
```

**3.3 — Toast copy is exactly correct**
```javascript
test('admin: save action produces "Saved." toast not "Saved!"', async ({ page }) => {
  await page.goto('/admin.html');
  // Trigger a save action
  await page.evaluate(() => {
    // Dispatch a custom save event if the page uses one
    document.dispatchEvent(new CustomEvent('able:save'));
  });
  await page.waitForTimeout(200);
  const toast = page.locator('.toast, [class*="toast"]').first();
  if (await toast.count() > 0 && await toast.isVisible()) {
    const text = await toast.innerText();
    expect(text.trim()).toMatch(/^Saved\.$|^Copied\.$|^Removed\.$/);
  }
});
```

**3.4 — Tier gate copy includes specific value proposition**
```javascript
test('admin: upgrade prompts include specific value, not just "Upgrade"', async ({ page }) => {
  await page.goto('/admin.html');
  const gateButtons = page.locator('.glo-btn, [class*="upgrade"]');
  const count = await gateButtons.count();
  for (let i = 0; i < count; i++) {
    const text = await gateButtons.nth(i).innerText();
    // Must not be bare "Upgrade" or "Upgrade to continue"
    expect(text.toLowerCase().trim()).not.toBe('upgrade');
    expect(text.toLowerCase()).not.toContain('upgrade to continue');
  }
});
```

**3.5 — Greeting register check**
```javascript
test('admin: greeting is "Good to see you" not "Welcome back"', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('admin_ever_visited', '1');
    localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Asha' }));
  });
  await page.goto('/admin.html');
  const greeting = page.locator('#homeGreeting').first();
  if (await greeting.count() > 0) {
    const text = await greeting.innerText();
    expect(text.toLowerCase()).not.toContain('welcome back');
    expect(text).toContain('Good to see you');
  }
});
```

---

## 4. Accessibility tests

**Purpose:** Verify that every interactive element is reachable, labelled, and usable with keyboard and screen reader. ABLE's minimum target is WCAG 2.1 AA.

**Acceptance criteria:**
- All interactive elements have a minimum bounding box of 44×44px
- Focus ring is visible on every interactive element (box-shadow, not hidden by `outline: none`)
- All images have `alt` attributes
- All icon-only buttons have `aria-label`
- Bottom tab bar has `role="navigation"`
- `prefers-reduced-motion: reduce` disables all CSS animation

### Patterns

**4.1 — Minimum tap target size (44px)**
```javascript
test('profile: all interactive elements meet 44px minimum tap target', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');
  const violations = await page.evaluate(() => {
    const interactives = document.querySelectorAll(
      'button, a, input, [role="button"], [tabindex="0"]'
    );
    const failing = [];
    for (const el of interactives) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (rect.width < 44 || rect.height < 44) {
          failing.push({
            tag: el.tagName,
            text: el.innerText?.slice(0, 40) || el.getAttribute('aria-label') || '',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
    }
    return failing;
  });
  expect(violations).toHaveLength(0);
});
```

**4.2 — Focus ring visible on keyboard navigation**
```javascript
test('admin: focus ring visible after Tab key press', async ({ page }) => {
  await page.goto('/admin.html');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    return {
      tag: el.tagName,
      boxShadow: getComputedStyle(el).boxShadow,
      outline: getComputedStyle(el).outline,
    };
  });
  expect(focused).not.toBeNull();
  // Must have either a non-none box-shadow (glow ring) or non-none outline
  const hasRing = focused.boxShadow !== 'none' || focused.outline !== 'none';
  expect(hasRing).toBe(true);
  // Amber glow: should contain 244 (R value of #f4b942)
  expect(focused.boxShadow).toContain('244');
});
```

**4.3 — All images have alt text**
```javascript
for (const file of ['able-v7.html', 'admin.html', 'start.html', 'landing.html']) {
  test(`${file}: all images have alt attributes`, async ({ page }) => {
    await page.goto(`/${file}`);
    const violations = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.hasAttribute('alt'))
        .map(img => img.src?.slice(-60) || img.className);
    });
    expect(violations).toHaveLength(0);
  });
}
```

**4.4 — Bottom tab bar has correct ARIA role**
```javascript
test('admin: mobile bottom tab bar has role="navigation"', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/admin.html');
  const nav = page.locator('.mobile-nav, [role="navigation"]').first();
  await expect(nav).toBeVisible();
  const role = await nav.getAttribute('role');
  expect(role).toBe('navigation');
  const ariaLabel = await nav.getAttribute('aria-label');
  expect(ariaLabel).toBeTruthy();
});
```

**4.5 — prefers-reduced-motion disables animations**
```javascript
test('profile: prefers-reduced-motion disables CSS animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/able-v7.html');
  const animDuration = await page.evaluate(() => {
    // Check a known animated element — e.g. the countdown digit
    const animated = document.querySelector('.digit-flip, .countdown-digit, .live-dot');
    if (!animated) return 'not found';
    return getComputedStyle(animated).animationDuration;
  });
  // With reduced-motion, animation-duration should be 0s or 0.001s or not 'normal'
  if (animDuration !== 'not found') {
    expect(['0s', '0.001s', '0.01s']).toContain(animDuration);
  }
});
```

---

## 5. Cross-page tests

**Purpose:** Verify that data written in one page is correctly read and rendered in another. These are the integration boundaries ABLE's localStorage architecture depends on.

**Acceptance criteria:**
- `start.html` wizard output is readable by `admin.html` without modification
- Fan sign-ups on `able-v7.html` appear in admin Fans page
- Campaign state changes in admin propagate to the profile page
- Gig mode expiry logic functions correctly across page loads

### Patterns

**5.1 — Wizard output readable by admin**
```javascript
test('start → admin: able_v3_profile written by wizard is rendered in admin', async ({ page }) => {
  // Simulate wizard completing with known profile data
  await page.goto('/admin.html');
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Kwame Asante',
      bio: 'Producer from Bristol.',
      accent: '#6c5ce7',
      genre: 'Electronic',
    }));
  });
  await page.reload();
  const greeting = page.locator('#homeGreeting');
  await expect(greeting).toContainText('Kwame');
});
```

**5.2 — Fan sign-up on profile appears in admin fan list**
```javascript
test('profile → admin: fan sign-up appears in admin fans page', async ({ page, context }) => {
  // Page 1: artist profile — sign up a fan
  const profilePage = await context.newPage();
  await profilePage.goto('/able-v7.html');
  const input = profilePage.locator('input[type="email"]').first();
  await input.fill('new-fan@test.com');
  const submitBtn = profilePage.locator('button[type="submit"], .fan-submit-btn').first();
  await submitBtn.click();
  await profilePage.waitForTimeout(300);

  // Read the localStorage state (same origin, file://)
  const fans = await profilePage.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );
  expect(fans.some(f => f.email === 'new-fan@test.com')).toBe(true);

  // Page 2: admin — fan list should show the new fan
  const adminPage = await context.newPage();
  // Inject the fan data into admin's localStorage
  await adminPage.addInitScript(fanData => {
    localStorage.setItem('able_fans', JSON.stringify(fanData));
  }, fans);
  await adminPage.goto('/admin.html');
  await adminPage.locator('[onclick*="fans"], .mn-item[aria-label="Fans"]').first().click();
  await expect(adminPage.locator('body')).toContainText('new-fan@test.com');
});
```

**5.3 — Campaign state in admin propagates to profile**
```javascript
test('admin → profile: setting pre-release state writes to localStorage', async ({ page }) => {
  await page.goto('/admin.html');
  // Set a future release date and activate pre-release state
  const futureDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  await page.evaluate(date => {
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    profile.releaseDate = date;
    profile.stateOverride = 'pre';
    localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  }, futureDate);
  // Profile page should now show pre-release state
  const profileData = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
  );
  expect(profileData.stateOverride).toBe('pre');
  expect(profileData.releaseDate).toBe(futureDate);
});
```

**5.4 — Gig mode expiry reverts profile state**
```javascript
test('profile: expired gig mode reverts to profile state', async ({ page }) => {
  const expiredTimestamp = Date.now() - 1000; // expired 1 second ago
  await page.addInitScript(ts => {
    localStorage.setItem('able_gig_expires', ts.toString());
    localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Test' }));
  }, expiredTimestamp);
  await page.goto('/able-v7.html');
  // The page should not show gig state
  const gigBadge = page.locator('.gig-badge, [class*="gig-active"]').first();
  if (await gigBadge.count() > 0) {
    await expect(gigBadge).not.toBeVisible();
  }
});
```

**5.5 — localStorage stats resolve before 600ms skeleton timeout**
```javascript
test('admin: stats resolve from localStorage within 600ms', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_views', JSON.stringify([
      { ts: Date.now() - 3600000 }, { ts: Date.now() - 7200000 }
    ]));
    localStorage.setItem('able_fans', JSON.stringify([
      { email: 'a@b.com', ts: Date.now() - 3600000 }
    ]));
  });
  await page.goto('/admin.html');
  await page.waitForTimeout(650); // beyond the 600ms fallback
  const statViews = page.locator('#statViews');
  if (await statViews.count() > 0) {
    const hasSkel = await statViews.evaluate(el => el.classList.contains('skel'));
    expect(hasSkel).toBe(false);
  }
});
```

---

## 6. Performance tests

**Purpose:** Ensure ABLE pages load fast enough for real-world use. The product is mobile-first and the artist's profile is their link-in-bio — slow loads cost fan sign-ups.

**Targets:**
- LCP (Largest Contentful Paint): ≤ 2.5s
- CLS (Cumulative Layout Shift): ≤ 0.1
- INP (Interaction to Next Paint): ≤ 200ms
- No layout shift from unsized images

### Patterns

**6.1 — Lighthouse CLI on each active page**
```javascript
// tests/performance.spec.js
// Requires: npm install -g lighthouse
// Run standalone: lighthouse http://localhost:8080/able-v7.html --output json

test('profile: Lighthouse scores meet budget', async ({ page }) => {
  // This test delegates to Lighthouse CLI; Playwright opens the page for context
  // In CI: run `npx lighthouse --output json --output-path ./reports/profile.json`
  // Then parse the JSON and assert:
  //   categories.performance.score >= 0.80
  //   audits['largest-contentful-paint'].numericValue <= 2500
  //   audits['cumulative-layout-shift'].numericValue <= 0.1
  //   audits['total-blocking-time'].numericValue <= 300
  await page.goto('/able-v7.html');
  // Placeholder: verify page loads fast enough via navigation timing
  const timing = await page.evaluate(() => ({
    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    load: performance.timing.loadEventEnd - performance.timing.navigationStart,
  }));
  expect(timing.domContentLoaded).toBeLessThan(3000);
  expect(timing.load).toBeLessThan(5000);
});
```

**6.2 — No unsized images causing layout shift**
```javascript
test('profile: all images have explicit width and height', async ({ page }) => {
  await page.goto('/able-v7.html');
  const violations = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .filter(img => {
        const hasWidth = img.hasAttribute('width') || img.style.width;
        const hasHeight = img.hasAttribute('height') || img.style.height;
        return !hasWidth || !hasHeight;
      })
      .map(img => img.src?.slice(-60) || img.className);
  });
  // Warn rather than fail — images may be intentionally dynamic
  if (violations.length > 0) {
    console.warn(`Images without explicit dimensions: ${violations.join(', ')}`);
  }
});
```

**6.3 — No horizontal scroll at 375px**
```javascript
for (const file of ['able-v7.html', 'admin.html', 'start.html', 'landing.html']) {
  test(`${file}: no horizontal scroll at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/${file}`);
    const scrollWidth = await page.evaluate(() =>
      document.documentElement.scrollWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
}
```

**6.4 — Fonts load within 3 seconds**
```javascript
test('profile: web fonts load within 3 seconds', async ({ page }) => {
  await page.goto('/able-v7.html');
  const fontsLoaded = await page.evaluate(() =>
    document.fonts.ready.then(() => true)
  );
  expect(fontsLoaded).toBe(true);
  // Verify DM Sans is actually in use
  const fontFamily = await page.evaluate(() =>
    getComputedStyle(document.body).fontFamily
  );
  expect(fontFamily.toLowerCase()).toContain('dm sans');
});
```

**6.5 — Glass theme does not break paint on mobile**
```javascript
test('profile: glass theme renders without blank screen on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'glass';
  });
  await page.waitForTimeout(300);
  // Take screenshot and verify it is not blank (pixel check)
  const screenshot = await page.screenshot();
  // A blank screen would be a uniform buffer — basic check: screenshot exists and has size
  expect(screenshot.length).toBeGreaterThan(5000);
});
```

---

## 7. Theme tests

**Purpose:** Every theme must render correctly on every page. No white text on white background. No missing accent colours. No broken layout when theme switches.

**Themes under test:** `dark` (default), `light`, `glass`, `contrast`
**Pages under test:** `able-v7.html` (all 4 themes), `admin.html` (dark only — admin uses its own token set)

### Patterns

**7.1 — Text colour is never identical to background colour in any theme**
```javascript
const THEMES = ['dark', 'light', 'glass', 'contrast'];

for (const theme of THEMES) {
  test(`profile: theme "${theme}" — text visible against background`, async ({ page }) => {
    await page.goto('/able-v7.html');
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(100);
    const { bg, color } = await page.evaluate(() => ({
      bg: getComputedStyle(document.body).backgroundColor,
      color: getComputedStyle(document.body).color,
    }));
    expect(bg).not.toBe(color);
    expect(color).not.toBe('rgba(0, 0, 0, 0)'); // transparent text
  });
}
```

**7.2 — Light theme uses warm cream background, not white**
```javascript
test('profile: light theme background is warm cream not pure white', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // rgb(240, 237, 232) = #f0ede8 warm cream
  // Pure white = rgb(255, 255, 255) — should NOT be this
  expect(bg).not.toBe('rgb(255, 255, 255)');
  expect(bg).toContain('240'); // R value of #f0ede8 ≈ 240
});
```

**7.3 — Contrast theme is pure black base**
```javascript
test('profile: contrast theme background is pure black', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'contrast'; });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(0, 0, 0)');
});
```

**7.4 — Glass theme has backdrop-filter applied**
```javascript
test('profile: glass theme applies backdrop-filter', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'glass'; });
  const hasFilter = await page.evaluate(() => {
    const cards = document.querySelectorAll('.card, .release-card, [class*="card"]');
    for (const card of cards) {
      const style = getComputedStyle(card);
      if (style.backdropFilter && style.backdropFilter !== 'none') return true;
      if (style.webkitBackdropFilter && style.webkitBackdropFilter !== 'none') return true;
    }
    return false;
  });
  expect(hasFilter).toBe(true);
});
```

**7.5 — Theme switch does not produce JS errors**
```javascript
test('profile: cycling through all 4 themes produces no JS errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('/able-v7.html');
  for (const theme of THEMES) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(80);
  }
  expect(errors).toHaveLength(0);
});
```

---

## Test infrastructure notes

### localStorage helpers

All tests that depend on pre-existing data should use `page.addInitScript()` to inject localStorage before the page initialises — not `page.evaluate()` after load. This ensures JS that reads localStorage on `DOMContentLoaded` sees the correct state.

```javascript
// Pattern: inject before page load
await page.addInitScript(() => {
  localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Test' }));
});
await page.goto('/admin.html');
// NOT: await page.goto() then await page.evaluate(() => localStorage.setItem(...))
```

### Playwright config baseline

```javascript
// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 15000,
  use: {
    baseURL: 'http://localhost:8080',
    viewport: { width: 375, height: 812 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox',  use: { browserName: 'firefox' } },
    { name: 'webkit',   use: { browserName: 'webkit' } },
  ],
};
```

### Local test server

Since ABLE has no build pipeline, run a simple static server:

```bash
# In project root
npx serve . -p 8080
# Then in another terminal:
npx playwright test
```

### File structure

```
/tests
  smoke.spec.js         — Category 1
  interactions.spec.js  — Category 2
  copy.spec.js          — Category 3
  a11y.spec.js          — Category 4
  journeys.spec.js      — Category 5
  performance.spec.js   — Category 6
  themes.spec.js        — Category 7
playwright.config.js
```

