# ABLE — Pre-Build Checklist
**Non-file things to verify before the first build session begins**
*Everything in this file is orthogonal to the strategy docs — these are environment, infrastructure, legal, and operational gates.*

---

## 1. Environment + Tooling

### Git
- [ ] Build starts on a fresh branch from `main` (not `v2-simplified` directly)
- [ ] `.gitignore` confirmed: `.env`, `*.env`, `netlify.toml` local overrides — none commitable
- [ ] No uncommitted changes in working tree before build starts
- [ ] GitHub repo is private (not public — fan data + keys)

### Playwright
- [ ] Playwright MCP server confirmed active: `npx @playwright/mcp@latest` in `.claude/settings.json`
- [ ] Chromium browser installed: `npx playwright install chromium`
- [ ] Playwright smoke test runs against at least one page before build begins (sanity check the setup works)
- [ ] Permission: `mcp__playwright__*` tools are auto-allowed in Claude settings

### Node / JS parse-check
- [ ] `node -e "new Function(src)"` pattern works — `node` is on PATH
- [ ] Test it manually: `node -e "new Function('const x = 1;')"` should exit 0

### Editor
- [ ] No auto-formatter that will reformat HTML (Prettier disabled or configured to not touch HTML files)
- [ ] File encoding is UTF-8 everywhere

---

## 2. Backend Services

### Supabase (V1 decision point)
**Decision needed:** Is V1 localStorage-only or does V1 require Supabase auth?
- Option A (recommended for V1): localStorage-only, no Supabase. First real user triggers Supabase migration.
- Option B: Supabase auth on day 1 (magic link). Harder to build, safer for real users.

If Supabase is in scope for V1:
- [ ] Supabase project confirmed live: `https://jgspraqrnjrerzhnnhtb.supabase.co`
- [ ] All tables created per `docs/systems/data-architecture/SPEC.md`
- [ ] RLS policies configured (artists can only read/write their own rows)
- [ ] Service role key (for admin SQL) stored securely, NEVER in client-side code
- [ ] `able_profile` → `able_v3_profile` key conflict fixed (P0.6 in data-architecture PATH-TO-10)

### Netlify
- [ ] Netlify account exists and site is connected to the GitHub repo
- [ ] `netlify.toml` created: functions directory = `netlify/functions/`
- [ ] Build command: none (static site — no build step)
- [ ] Publish directory: `/` (repo root)
- [ ] Environment variables set in Netlify dashboard (NOT in code):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (functions only, never client-side)
  - `RESEND_API_KEY` (email broadcasts — Phase 2)
  - `SPOTIFY_CLIENT_ID` + `SPOTIFY_CLIENT_SECRET` (import — Phase 2)
  - `ANTHROPIC_API_KEY` (AI copy — Phase 2)

### Domain
- [ ] Domain confirmed (ablemusic.co or ablemusic.co — which is live?)
- [ ] DNS pointed to Netlify (or scheduled)
- [ ] HTTPS auto-provisioned via Netlify

---

## 3. Third-Party API Credentials

| Service | When needed | Status |
|---|---|---|
| Spotify Web API | Phase 1 (import) | Client ID + Secret needed |
| Resend | Phase 2 (fan emails) | API key needed |
| Stripe | Phase 2 (support payments, subscriptions) | Publishable key + webhook secret |
| PostHog | Phase 2 (analytics) | Project API key |
| Anthropic API | Phase 2 (AI copy) | Key needed |

**V1 only needs:** None (localStorage-only + Supabase basic auth)
**V1 + Spotify import needs:** Spotify Client ID + Secret (server-side Netlify function)

---

## 4. Demo / Seed Content

### Founder's profile (required before landing.html works)
- [ ] James's own ABLE page is set up and looks genuinely good
- [ ] Real artwork, real release info, real fan capture active
- [ ] This is `LANDING_SPOTLIGHT` constant in landing.html — it's the social proof demo
- [ ] URL confirmed and hardcoded in landing.html

### Demo data for Playwright tests
- [ ] `able_v3_profile` test fixture written (confirmed valid JSON)
- [ ] `able_fans` test fixture (3-5 test fan records)
- [ ] Artwork image at correct size (at minimum: 800×800 for profile, 1200×630 for OG)

### Images
- [ ] Default/fallback artwork (no broken image states)
- [ ] Logo SVG confirmed correct (`able-logo-instagram.svg` — check it renders)
- [ ] OG image confirmed reachable at absolute URL (not blob: or data: URI — see SEO bug P0.1)

---

## 5. Legal (required before real users touch the product)

**These are not optional. Real users = GDPR applies.**

- [ ] Privacy policy written and published at `/privacy`
  - Must cover: data collected (email, localStorage, page views, clicks), how stored, how deleted, contact method
  - UK ICO registration if processing EU/UK personal data commercially
- [ ] Terms of service written and published at `/terms`
  - Must cover: acceptable use, content ownership, payment terms (Stripe), account suspension
- [ ] Cookie/localStorage banner decision
  - ABLE uses localStorage (not cookies) — strictly necessary for functionality
  - Strictly necessary = no consent required under PECR/GDPR
  - But: if adding analytics (PostHog) → consent required before tracking fires
  - V1 (no analytics): no banner needed. V2 (with PostHog): banner needed.
- [ ] Fan sign-up consent capture confirmed: `consent: true`, `consentMethod: 'explicit_checkbox'`
- [ ] GDPR data deletion flow: can James delete a fan by email? (Platform admin SQL query ready)
- [ ] CAN-SPAM: all marketing emails have unsubscribe link + physical address

---

## 6. Device Testing Plan

Do NOT rely solely on Playwright/DevTools. Real device testing required.

- [ ] Real iPhone (Safari, iOS 17+) — this is where most music fans are
  - Glass theme especially must be tested on real Safari (backdrop-filter performance)
  - Spring physics at 60fps vs 30fps
- [ ] Real Android (Chrome) — second priority
- [ ] macOS Safari (desktop) — landing.html especially
- [ ] Browser tested: Chrome, Safari, Firefox (minimum)

**Test before shipping any section:**
1. No horizontal scroll at 375px
2. All tap targets ≥44px
3. Modals/sheets dismiss correctly
4. Keyboard doesn't break layout when visible

---

## 7. Performance Budget

File sizes must stay within budget. Check before build completes:

| File | Current (gzipped) | Budget |
|---|---|---|
| able-v7.html | ~78kB | 120kB |
| admin.html | ~45kB | 80kB |
| start.html | ~31kB | 60kB |
| landing.html | ~18kB | 40kB |
| fan.html | ~10kB | 30kB |

Check gzip size: `gzip -c filename.html | wc -c`

- [ ] Images: no uncompressed images inline or linked — use WebP or compressed JPEG
- [ ] Fonts: Google Fonts only load on vibe select (dynamic injection) — do NOT add to `<head>` for all vibes
- [ ] No console errors in any active file on page load
- [ ] No `undefined` references in JS

---

## 8. Accessibility Baseline

- [ ] WCAG 2.2 AA target confirmed (not just aspirational)
- [ ] Known bug fixed: `--dash-t3: #888888` in admin.html L44+L1288 → `#777777` (WCAG contrast fail)
- [ ] Focus ring glow pattern: admin.html, start.html, landing.html all have flat 2px focus rings → spec'd glow pattern
- [ ] All icon-only buttons have `aria-label` (confirmed in session 5 — verify not regressed)
- [ ] No `tabindex > 0` anywhere (breaks natural focus order)
- [ ] Test keyboard navigation manually: Tab through a form, submit it, all controls reachable

---

## 9. Copy Final Sign-Off

Before any page goes live, these violations must be fixed (from `docs/systems/copy/PATH-TO-10.md`):

P0 fixes — do these first, before anything else:
- [ ] P0.2 `admin.html` `<title>Dashboard — ABLE</title>` → `<title>ABLE</title>`
- [ ] P0.3 `start.html` "dashboard" in done screen
- [ ] P0.4 `able-v7.html` "Full dashboard" in owner context bar
- [ ] P0.5 `landing.html` FAQ "dashboard" mentions
- [ ] P0.6 `admin.html` `level:'superfan'` → `level:'core'`
- [ ] P0.7 Toast copy standardised across admin.html
- [ ] P0.8 Admin form placeholder copy reviewed and replaced

**Test:** Read `docs/systems/copy/FINAL-REVIEW.md` copy calibration test. Every string passes it.

---

## 10. Build Branch Strategy

Before writing a single line of code:
- [ ] Confirm build branch: `git checkout -b build/v1` from `main`
- [ ] Confirm build order (from `docs/BUILD-READY-INDEX.md` when written):
  1. P0 bug fixes across all files (copy violations, WCAG issues, data key conflicts)
  2. able-v7.html build pass
  3. admin.html build pass
  4. start.html build pass
  5. landing.html build pass
  6. fan.html build pass
- [ ] Playwright smoke test after each file
- [ ] Commit after each logical chunk (per CLAUDE.md rule 7)

---

## 11. Error Monitoring Plan

- [ ] V1: Check Netlify function logs for serverless errors (Netlify dashboard → Functions tab)
- [ ] V1: JS errors show in browser console — no silent swallows (`try/catch` that logs, doesn't hide)
- [ ] V2: Sentry or similar error monitoring (before first real artist signs up)
- [ ] V2: Uptime monitoring (better stack for `jgspraqrnjrerzhnnhtb.supabase.co`)

---

## 12. Social Proof Readiness

Landing.html shows "12,000+ artists" / "3.2M fan sign-ups" — **these are placeholder numbers.**

Before public launch:
- [ ] Replace with real numbers (or honest "0 artists" if building fresh)
- [ ] Or: Remove the proof strip entirely for V1 (cleaner than fake numbers)
- [ ] Quote/testimonial: needs a real artist quote, not placeholder text

**Rule:** No fake social proof. If ABLE has 0 users, say so or remove the strip.

---

## 13. Go/No-Go Gate

Do not open the site to real artists until ALL of the following are true:

| Gate | Status |
|---|---|
| Privacy policy published | ☐ |
| Fan consent capture confirmed working | ☐ |
| GDPR delete flow tested (can delete a fan by email) | ☐ |
| Playwright smoke test: all 5 pages pass | ☐ |
| Copy P0 violations fixed | ☐ |
| Founder's demo profile looks genuinely excellent | ☐ |
| Real device tested (iPhone Safari) | ☐ |
| No console errors on any page | ☐ |
| `able_profile` / `able_v3_profile` key conflict fixed | ☐ |

---

*Updated: 2026-03-16*
