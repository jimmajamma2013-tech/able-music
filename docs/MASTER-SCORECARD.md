# ABLE — Master Scorecard
**Updated: 2026-03-17 | Sessions 11–20 + Cycles 1–3 | Sources: All FINAL-REVIEW.md, PRE-LAUNCH-1000.md, CYCLE-2-AUDIT.md, CYCLE-3-AUDIT.md**

---

## How to read this document

- **Score** = current state score from the most recent session
- **Spec ceiling** = the score achievable when all specced work is built
- **Biggest gap** = the single most important thing holding the score back
- **P0 fix** = the specific action required before first artist signs up
- Scores marked `—` = operational/reference docs without a numeric score
- Scores marked `pre-launch` = quality gate checklists; entire system unbuilt

---

## Pages

| Page | File | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|---|
| Artist profile | `able-v8.html` | 9.1/10 | 9.7/10 | Supabase auth + Spotify auto-import | ✅ GDPR consent on fan sign-up — done session 19 |
| Admin dashboard | `admin.html` | 9.7/10 | ~9.9/10 | Supabase auth (data portability) | ✅ All WCAG + security fixes applied sessions 19–20 |
| Onboarding wizard | `start.html` | 9.8/10 | ~9.9/10 | Social proof (real artists) | ✅ Vibe radiogroup ARIA added session 20 |
| Landing page | `landing.html` | 9.7/10 | ~9.9/10 | FAQ aria-controls wired | ✅ Full Twitter card meta + aria-controls on FAQ done |
| Fan dashboard | `fan.html` | 9.2/10 | ~9.8/10 | Supabase realtime + Close Circle | ✅ Unsubscribe mechanism added session 19 |
| Freelancer profile | `freelancer.html` | 8.7/10 | ~9.2/10 | Network maturity + real testimonials | Directory integration + credits management |

**Page average: ~9.4/10**

---

## Systems

### Core product systems

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Artist tools | 7.8/10 | 9.0/10 | Close Circle no payment, accent picker limited | ✅ owner=true on all profile links; Day 1 share card built; completeness bar live |
| CRM | 7.8/10 | 9.0/10 | Fan search UI exists; `consentVersion` in CSV; dedup check live | ✅ C3: campaign analytics, JSON export, two-step delete confirm, time datetime |
| Tier gates | 6.5/10 | 9.0/10 | Server enforcement missing; Stripe not wired | ✅ `checkTierGate()` + gold lock CSS built; remaining: server-side enforcement |
| Error states | 8.0/10 | 9.0/10 | QuotaExceededError toast; fetch try/catch audit clean; fans Array guard | ✅ C3: crash boundary on admin init; offline bar; Supabase init guard; date parse guard |
| PWA | 8.5/10 | 9.0/10 | No service worker (offline mode unbuilt) | ✅ `manifest.json` + iOS meta tags + icons exist; service worker is optional V2 |
| Page state system | 7.5/10 | 9.0/10 | Arc node radiogroup ARIA just added | ✅ Campaign state machine logic verified |
| Data architecture | 6.8/10 | 9.3/10 | Multi-artist isolation; `fan.html` Supabase not wired | Implementation ready for Supabase phase |
| Analytics | 8.2/10 | 9.4/10 | SessionId in views missing; PostHog fan_signup verified | ✅ All 5 UTM params captured; sessionId on cta_tap + fan_signup; isOwnerVisit() 3-signal chain |
| SEO / OG | 9.2/10 | 9.5/10 | Static OG image needs production deploy | ✅ C3: JSON-LD Event schema on able-v8.html shows; `<time datetime>` on fan rows and show dates |
| oEmbed proxy | 9.0/10 | 9.5/10 | ✅ SSRF fixed — `isSafeMediaUrl()` uses `new URL().hostname` + ALLOWED_HOSTS Set | Zero vulnerabilities; `data.html` stripped to prevent XSS |
| Coding strategy | 9.2/10 | 10/10 | `prefers-reduced-motion` audit remaining in admin | ✅ Parse checks every edit; tokenised CSS enforced |
| UI system | 7.5/10 | 8.6/10 | Component library unbuilt; some hardcoded values | Fix remaining `#888` violations; shared component primitives |
| UX system | 7.2/10 | 9.0/10 | Fan sign-up friction; empty state copy | ✅ Fan cap UI enforced; error state copy improved |
| World map | 7.0/10 | 9.2/10 | Multi-moment panel copy polish; <time> tags missing | ✅ Section heading present; empty state (owner + fan); shows 24h filter; sort ascending |

### Killer features

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Killer features (all) | 4.0/10 | 9.0/10 | Day 1 share card unbuilt; deep link campaigns unbuilt | ✅ Auto-gig built; remaining: Day 1 share card (3–4h) |
| Reels feed | 8.5/10 spec | 10/10 (post-V3) | oEmbed proxy extension confirmed ✅ | 30-min code review of TikTok/YouTube endpoints |
| Spotify import | 5.2/10 | 9.0/10 | Netlify function not deployed to production | Deploy Netlify function + configure env vars |
| Deep link campaigns | 7.5/10 | 9/10 | QR codes for campaigns unbuilt; campaign history list | ✅ C3: ?campaign capture, fan tagging, UTM bridge, campaign creator UI, analytics breakdown |

### Infrastructure & backend

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Email | 7.5/10 | 9.5/10 | RESEND_API_KEY not set in Netlify env (James's task) | ✅ `fan-confirmation.js` built + CORS restricted to `ablemusic.co`; unsubscribe URL in email footer |
| Notifications | 9.5/10 after V2 | 10/10 | Magic link token signing incomplete | None — engineering can start immediately |
| Integrations | 7.5/10 | 8.0/10 | Spotify env vars not confirmed | ✅ Ticketmaster + Linktree import built; verify Spotify env vars |
| Platform admin | 7.0/10 | — | No Stripe-linked view; no content moderation | SQL query library + `ADMIN_SECRET` env vars |
| Tiers / billing | pre-launch | — | Stripe not wired; tier gates not server-enforced | Entire billing system unbuilt |

### Legal, compliance & security

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Legal compliance | 8.5/10 | 9.5/10 | ICO registration research pending; PECR clarity pending | ✅ GDPR Article 13 `privacy.html` written; GDPR consent on fan sign-up; unsubscribe in email; fan deletion per-row; `privacy@ablemusic.co` |
| Security | 8.5/10 | 9.5/10 | CSP `unsafe-inline` (accepted risk — no build pipeline) | ✅ URL scheme validation (`isSafeAdminUrl()`); CORS restricted; security headers complete in netlify.toml; no console.log/debugger; SSRF fixed |
| Accessibility (WCAG 2.2 AA) | 7.8/10 | 9.0/10 | VoiceOver test not run; fieldset for some groups | ✅ Skip links; focus trap; aria-label on 25+ inputs; radiogroup on arc/vibe; aria-pressed/aria-checked; decorative aria-hidden; error role=alert |
| Freelancer auth | pre-launch | — | Discord OAuth fallback unspecced | Quality gate: 5 questions must be "yes" before launch |

### AI & automation

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| AI agents | 9.4/10 | — | Mac Studio single point of failure | Move n8n to VPS before launch |
| AI copy | 8.0/10 | 8.8/10 | Rate limit UX + caption pack not yet live | ✅ Vibe/feel context; Sonnet for bio; banned phrase detection |
| AI workflow | 6.5/10 | — | No Telegram notifications; cold session starts | Set up Telegram notification integration |
| VA strategy | 9.0/10 | — | Requires Mac Studio hardware | Mac Studio setup + Ollama install |

### Brand, copy & design

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Brand identity | 8.0/10 | 9.0/10 | og-default.jpg not yet deployed to production | ✅ favicon.svg; og-default.jpg generated and committed |
| Copy system | 7.8/10 | 9.5/10 | Some "dashboard" violations remaining; admin error copy | Fix remaining banned-phrase violations |
| Explainers | 5.5/10 | 9.0/10 | Close Circle orientation card missing | Screen 6 context line: "you get their email — that's yours" |
| Social media | 9.1/10 | — | Week 2+ content calendar less specific | None blocking |
| Instagram strategy | 9.6/10 | — | Content bank not written | None blocking day-1 execution |

### Growth & marketing

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Growth loop | 7.0/10 | — | "I make music too →" fork unspecced | Spec the referred artist landing fork |
| Artist success | 4.0/10 | 9.0/10 | No Day 1 share card; no fan milestone acknowledgement | Build Day 1 share card |
| Lead generation | 7.5/10 | 8.7/10 | Email system P0 must be live; no message variants | Build 300-artist spreadsheet + complete email P0 |
| Marketing | — | — | Producer seeding not operational | Name 20 UK producers and begin outreach |
| Launch sequence | 7.5/10 | — | Product not deployed; waitlist not live | Deploy to `ablemusic.co` |
| Complaint resolution | 9.2/10 | — | Pre-launch; no live tickets yet | Quality gate checklist ready |
| Digital media | 2.0/10 (presence) | — | Product not deployed; no demo video | Deploy + record 90-second demo video |
| Organic growth | 10/10 | — | Projections not measurements | None |
| Competitive | 9.5/10 | — | No live user win/loss data | None |
| Partnerships | 9.0/10 | — | Abler earnings not clarified | None blocking |

### Operations & process

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Filing system | 9.2/10 | — | 6 non-standard SPEC.md names | Verify profile DESIGN-SPEC.md authority chain |
| QA testing | 9.0/10 spec | — | No Playwright tests for sessions 15–20 features | 6-gate manual smoke check before first artist |
| Error states | 6.0/10 | 9.0/10 | ✅ `safeLS()`/`setLS()` global; `SecurityError` guard | Error UI states remaining |
| Master review | 7.5/10 | — | One review not a track record | Schedule recurring master review monthly |
| Hardware / software | 9.5/10 | — | Open WebUI not fully tested | Ergonomics + security setup |
| Coding strategy | 9.2/10 | 10/10 | `prefers-reduced-motion` admin audit | ✅ All JS parse-checked every session |

### Finance & legal

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Accounting | — | — | No live company yet | Wave Accounting + first transaction |
| Monetisation | pre-launch | — | Stripe not wired | Stripe integration (Phase 2) |
| Free stack | — | — | Resend 100 email/day cap; Supabase pauses | Configure UptimeRobot pings |
| Legal compliance | 8.5/10 | 9.5/10 | See above | ✅ Major GDPR compliance work done sessions 19–20 |

### Strategy & founder

| System | Current score | Spec ceiling | Biggest gap | P0 fix |
|---|---|---|---|---|
| Growth strategy | 9.0/10 | — | No paying artists yet | None — strategy ready |
| Investor readiness | 10/10 spec / 2/10 execution | — | All metrics are pre-launch placeholders | Get Stripe live + deploy to Netlify |
| Founder roadmap | 9.0/10 | — | `fan.html` underspecified | None blocking |
| Master plan alignment | 4.2/10 | — | Product not deployed | Deploy product + incorporate ABLE Labs Ltd |
| Organic growth | 10/10 | — | Projections not measurements | None |
| Team | 9.2/10 | — | Hire thresholds may shift | None |
| Tools and APIs | 9.5/10 | — | Mixcloud/Audiomack entries missing | None blocking |

---

## Summary stats

| Category | Average | Change from session 14 | Change from Cycle 2 Wave 1 |
|---|---|---|---|
| Pages (6 pages) | ~9.4/10 | +0.1 | — |
| Core product systems (scoring available) | ~7.3/10 | +1.0 | **+0.5** |
| Infrastructure (scoring available) | ~7.1/10 | +1.0 | — |
| Legal / security / accessibility | ~8.3/10 | **+5.5** | — |
| Brand / copy / design | ~8.1/10 | +0.8 | — |
| Growth / marketing | ~6.9/10 | — | — |
| Operations / process | ~8.2/10 | +0.7 | — |
| Strategy / founder | ~7.8/10 | — | — |

**Overall documentation + spec average: ~9.2/10**
**Overall current build state average: ~8.3/10** (was ~8.0/10 post-Cycle-2; was ~7.8/10 post-Cycle-1; was ~6.5/10 session 14)

Cycle 3 improvements: Deep link campaigns (0→7.5), CRM (6.5→7.8), Error states (7.0→8.0), Artist tools (7.5→7.8), SEO/OG (9.0→9.2)
Cycle 2 Wave 1 improvements: CRM (+2.0), Artist Success (+0.3), World Map (+1.8), Error States (+1.0), Analytics (+0.4)

---

## P0 gap list — updated 2026-03-17

### Remaining true blockers before first real artist

> ✅ = fixed in sessions 11–20 or Cycle 2 Wave 1.

**1. ✅ GDPR consent on fan sign-up form — DONE (session 19)**
**2. ✅ oEmbed SSRF security fix — DONE (was already properly fixed)**
**3. ✅ Privacy policy (`privacy.html`) — DONE (Article 13 rewrite session 19)**
**4. RESEND_API_KEY in Netlify env** — James's manual task at resend.com/domains
**5. og-default.jpg deployed to ablemusic.co** — ✅ file generated; needs Netlify deploy
**6. ✅ Day 1 share card — DONE (fully built in start.html — canvas, native share, copy link)**
**7. ✅ `safeLS()`/`setLS()` wrappers — DONE globally; Safari SecurityError guard added**
**8. ✅ `robots.txt` + `sitemap.xml` — DONE (session 19/20)**
**9. ✅ Fan unsubscribe mechanism — DONE (session 19)**
**10. ✅ Twitter card meta on all 4 pages — DONE (session 20)**

### High priority — day-1 quality (still open)

- Configure UptimeRobot monitoring (James's 10-minute task)
- VoiceOver test on real iPhone — manual QA required
- Deploy to `ablemusic.co` (Netlify) — product not live yet
- Service worker (offline mode) — optional for V1, V2 feature
- RESEND_API_KEY in Netlify environment (James's task)

---

## Cycle 1 complete — what changed sessions 19–20

| Dimension | Before | After | Delta |
|---|---|---|---|
| Legal compliance | 2.0/10 | 8.5/10 | **+6.5** |
| Security | ~4.0/10 | 8.5/10 | **+4.5** |
| Accessibility (WCAG 2.2 AA) | ~4.0/10 | 7.8/10 | **+3.8** |
| PWA | 0.6/10 | 8.5/10 | **+7.9** |
| SEO / OG | 8.0/10 | 9.0/10 | **+1.0** |
| Error resilience | 2.5/10 | 6.0/10 | **+3.5** |
| oEmbed security | 3.7/10 | 9.0/10 | **+5.3** |

---

## Cycle 2 Wave 1 complete — what changed

| Dimension | Before C2 | After C2 Wave 1 | Delta |
|---|---|---|---|
| Artist Success | 4.0/10 | 7.5/10 | **+3.5** |
| CRM / fan data | 4.5/10 | 6.5/10 | **+2.0** |
| World Map / events | 5.2/10 | 7.0/10 | **+1.8** |
| Error States | 6.0/10 | 7.0/10 | **+1.0** |
| Analytics | 7.8/10 | 8.2/10 | **+0.4** |

---

## Cycle 3 complete — what changed

| Dimension | Before C3 | After C3 | Delta |
|---|---|---|---|
| Deep link campaigns | 0/10 | 7.5/10 | **+7.5** |
| Admin render / CRM wave 2 | 6.5/10 | 7.8/10 | **+1.3** |
| Error state polish | 7.0/10 | 8.0/10 | **+1.0** |
| Artist tools / completeness | 7.5/10 | 7.8/10 | **+0.3** |
| SEO + structured data | 9.0/10 | 9.2/10 | **+0.2** |

### Key C3 completions

- ✅ `?campaign=NAME` capture → `sessionStorage._able_campaign` → fan object `campaignName`
- ✅ UTM campaign bridge: `utm_campaign` fallback when `?campaign` absent
- ✅ `?ref=REFNAME` capture → `sessionStorage._able_ref`
- ✅ Campaign analytics breakdown: top-5 by campaign name in admin analytics
- ✅ Campaign creator UI: form + live preview + copy-to-clipboard in admin settings
- ✅ Campaign CSV column: `campaign_name` in all fan CSV exports
- ✅ Campaign name validation: 50-char limit, hyphens-not-spaces error
- ✅ Profile completeness bar: 0–100% with dimension scoring + first-missing nudge
- ✅ Admin DOMContentLoaded crash boundary: try/catch → recovery bar
- ✅ Admin offline status bar: amber fixed bar when navigator.onLine = false
- ✅ Fan delete two-step confirm: inline state swap, no browser confirm()
- ✅ JSON fan export: `exportFansJson()` Blob download
- ✅ Campaign name breakdown in analytics: top-5 bars by campaignName field
- ✅ `<time datetime>` on fan sign-up rows in admin fan list
- ✅ JSON-LD Event schema: injected into `#structured-data` when shows exist
- ✅ `<time datetime>` on all show dates in `renderShowsSection()` (C3 Wave 1)
- ✅ Supabase `createClient()` try/catch on both able-v8.html and admin.html
- ✅ QuotaExceeded prune + retry in `setLS()`
- ✅ Share nudge gated at 60% profile completeness
- ✅ PostHog `fan_signup` enriched: `campaign_name` + `consent_version`

---

### Key C2 Wave 1 completions

- ✅ `owner=true` on all 4 dynamic admin profile links (topbar, liveChip, QA, sidebar)
- ✅ `isOwnerVisit()` 3-signal chain: URL param → artistId match → local profile exists
- ✅ All 5 UTM params captured (utm_source, medium, campaign, term, content)
- ✅ `able_fans` Array.isArray guard — corrupt fans auto-recover to `[]`
- ✅ Ticket URL `isSafeAdminUrl()` validation before storage + render
- ✅ Shows 24h trailing filter (keeps tonight's show visible until 24h after)
- ✅ Fan dedup check live: "You're already on the list." confirmed
- ✅ Fan CSV export includes `consentVersion` column (GDPR proof)
- ✅ All fetch() calls verified try/catch or .catch() — zero unguarded
- ✅ Day 1 share card confirmed built: canvas, native share sheet, copy link fallback
- ✅ Wizard done screen: `?owner=true` on "See your page" link
- ✅ Admin Twitter card meta + `<title>ABLE Dashboard</title>` added
- ✅ World map empty state: owner vs fan copy differentiated
- ✅ Unsplash hero URL: fm=webp&auto=format (WebP delivery)

---

*Sources: 62 docs/systems/FINAL-REVIEW.md files + 6 docs/pages/FINAL-20-ANGLE-REVIEW-2.md files + PRE-LAUNCH-1000.md + CYCLE-2-AUDIT.md*
*Updated: 2026-03-17 (Cycle 2 Wave 1 — continuous improvement engine)*
