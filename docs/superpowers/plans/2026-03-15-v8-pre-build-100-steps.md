# ABLE v8 — 100 Pre-Build Steps
**Created: 2026-03-15**
**Purpose: Everything that must be resolved BEFORE writing a line of v8 code**

The v8 build should not start until all 100 of these are done. Each one is either a research finding, a design decision, a copy decision, or a technical decision that — if left open — causes rework during the build.

Progress key: ✅ Done · 🔄 In progress (research agents running) · ⬜ Not started

---

## GROUP 1 — UNDERSTAND THE CURRENT PRODUCT DEEPLY (1–10)
*Know exactly what's built, what works, what doesn't, before designing anything new.*

| # | Step | Done when |
|---|---|---|
| 1 | ✅ Map user stories for artist, fan, freelancer — full journey through the site | Stories written, gaps identified |
| 2 | ✅ Score all three journeys against 20 UX aspects — current state | Scorecard complete |
| 3 | ✅ Score all three journeys against 20 UX aspects — full vision | Current vs projected delta complete |
| 4 | ✅ Audit every active file against the copy philosophy — no banned phrases | STATUS.md session 4 confirms compliance |
| 5 | ✅ Audit every active file against V6_BUILD_AUTHORITY.md — all decisions implemented | STATUS.md session 5 confirms compliance |
| 6 | ⬜ Playwright visual audit of all active pages at 375px — screenshot every state | Screenshots saved, no broken states |
| 7 | ⬜ Playwright audit of all 4 themes on every active page | All 4 themes confirmed on all pages |
| 8 | ⬜ List every gap between current build and spec — what's in docs but not in code | Gap list written |
| 9 | ⬜ Read every operational spec doc in `docs/v6/operational/` — confirm understood | All 18 spec files read |
| 10 | ⬜ Identify the 10 micro-interactions still missing from the master list | Missing interactions documented |

---

## GROUP 2 — RESEARCH: USERS (11–20)
*Understand the three users at a depth that goes beyond assumption.*

| # | Step | Done when |
|---|---|---|
| 11 | ✅ Research what music fans actually return to daily — retention triggers | [2026-03-15-fan-retention research complete] |
| 12 | ✅ Research magic link auth UX patterns + fan activation flows | [2026-03-15-magic-link-fan-activation.md complete] |
| 13 | ✅ Research Close Circle pricing psychology — what fans actually pay and why | [2026-03-15-close-circle-pricing.md complete] |
| 14 | ✅ Research peer-confirmation and credit verification UX patterns | [2026-03-15-credit-verification-ux.md complete] |
| 15 | ⬜ Research what independent artists actually struggle with day-to-day — beyond the product | 5 pain points documented with evidence |
| 16 | ✅ Research what music-industry freelancers want from a professional profile | [2026-03-15-freelancer-profile-needs.md complete] |
| 17 | ⬜ Research fan sign-up conversion — what copy, placement, and context converts best | Conversion research complete |
| 18 | ✅ Research the "gig night" experience from both artist and fan POV | [2026-03-15-gig-night-ux.md complete] |
| 19 | ⬜ Research pre-release campaign UX — what drives pre-saves and builds anticipation | Pre-release patterns documented |
| 20 | ✅ Research what makes fans feel "close" to an artist online — not just a subscriber | [2026-03-15-fan-closeness-mechanics.md complete] |

---

## GROUP 3 — RESEARCH: MARKET + COMPETITION (21–27)
| # | Step | Done when |
|---|---|---|
| 21 | ✅ Full competitive audit: Linktree, Beacons, Koji, Squarespace Bio, Bandcamp | [2026-03-15-competitive-moat.md complete] |
| 22 | ⬜ Research Feature.fm, Smartlink tools (Linkfire, ToneDen, Hypeddit) — release campaign tools specifically | Smartlink competitive analysis complete |
| 23 | ⬜ Research Bandzoogle and Squarespace — full artist website tools vs ABLE | Artist website alternatives documented |
| 24 | ✅ Research EVEN, Fave, and other superfan platforms — what they're building toward | [2026-03-15-superfan-platform-landscape.md complete] |
| 25 | ✅ Research Spotify's planned 2026 superfan tier — threat or opportunity for ABLE | [2026-03-15-superfan-platform-landscape.md §Spotify — tests conducted, no full launch confirmed] |
| 26 | ⬜ Research UK independent music market size — how many artists, what they earn, what they spend on tools | Market sizing documented |
| 27 | ⬜ Define ABLE's 3 uncopyable structural advantages — one sentence each, pressure-tested against competition | Moat statements written and verified |

---

## GROUP 4 — RESEARCH: DISCOVERY + DIRECTORY (28–32)
| # | Step | Done when |
|---|---|---|
| 28 | ✅ Research non-algorithmic discovery UX — Bandcamp, RA, Discogs, Are.na, Pitchfork | [2026-03-15-artist-directory-discovery.md complete] |
| 29 | ⬜ Decide: is directory v8 scope or post-v8? Document decision with reasoning | Decision recorded in V8_SCOPE.md |
| 30 | ⬜ Define the 7 vibe browse tiles — exact visual treatment for each (font, accent, radius) | Vibe tile design complete for all 7 |
| 31 | ⬜ Define editorial spotlight criteria — who qualifies, who curates, what the note must contain | Spotlight spec written |
| 32 | ⬜ Define anti-gaming rules — velocity normalisation formula, vibe lock policy, activity expiry threshold | Anti-gaming rules written |

---

## GROUP 5 — DESIGN DECISIONS: ARTIST PROFILE (33–45)
*Every design question that will be asked during the v8 build — answered before build starts.*

| # | Step | Done when |
|---|---|---|
| 33 | ⬜ Decide: does v8 artist profile have a new layout or iterate on v7? Document reasoning | Layout decision recorded |
| 34 | ⬜ Define the hero section — what are the exact possible states and how does each feel different | Hero states documented with visual intent |
| 35 | ⬜ Define the 4 campaign states in v8 — any changes from v7? Pre-release, live, gig, profile | Campaign state spec confirmed |
| 36 | ⬜ Define Close Circle placement — exact position in the page scroll, what triggers the prompt for returning fans | Placement spec written |
| 37 | ⬜ Define the snap cards section — v8 changes (if any) vs v7 | Snap cards spec confirmed |
| 38 | ⬜ Define the music / releases section — how credits appear when freelancer profiles are live | Release card spec with credits updated |
| 39 | ⬜ Define the events section — how it renders with Bandsintown vs manual-only | Events spec confirmed |
| 40 | ⬜ Define the support section — with Stripe/Close Circle wired vs without | Support section spec confirmed |
| 41 | ⬜ Decide: does v8 have a "world map" / moments section or is it deferred? | Decision recorded |
| 42 | ⬜ Define all 4 themes in v8 — any changes to tokens, Dark/Light/Glass/Contrast | Theme tokens confirmed or updated |
| 43 | ⬜ Define the identity system for v8 — all 7 vibes, exact CSS per vibe (font, r-mult, accent suggestion) | Identity system confirmed |
| 44 | ⬜ Define the sticky hero collapse behaviour for v8 — same as v7 or updated | Sticky hero spec confirmed |
| 45 | ⬜ Write the complete micro-interaction list for v8 — every animation, every state change | v8 micro-interaction master list complete |

---

## GROUP 6 — DESIGN DECISIONS: FAN DASHBOARD (46–54)
| # | Step | Done when |
|---|---|---|
| 46 | ⬜ Define fan.html page architecture — exact sections in order, what's always visible vs conditional | fan.html architecture spec written |
| 47 | ⬜ Define the Today strip — item types, max items, empty behaviour, timestamp format | Today strip spec written |
| 48 | ⬜ Define the Discover section — 4 tabs, what each shows, how items are ranked | Discover spec written |
| 49 | ⬜ Define the Near me section — location request UX, card format, all failure states | Near me spec written |
| 50 | ⬜ Define fan identity — what is a fan's "presence" in the product? Avatar, name, history, supported artists | Fan identity spec written |
| 51 | ⬜ Define the fan settings sheet — every option, every toggle, copy for each | Settings sheet spec written |
| 52 | ⬜ Define zero state — per section (no followed artists, no activity, no shows near you, etc.) | Zero states documented |
| 53 | ⬜ Define Close Circle ask on fan dashboard — exact placement, exact copy, timing logic | Fan dashboard Close Circle spec written |
| 54 | ⬜ Define fan.html themes and motion — same system as able-v8.html or slight variation? | fan.html design system confirmed |

---

## GROUP 7 — DESIGN DECISIONS: FREELANCER (55–63)
| # | Step | Done when |
|---|---|---|
| 55 | ⬜ Define freelancer profile architecture — every section, in order, what's required vs optional | Freelancer profile spec written |
| 56 | ⬜ Define the credits section — confirmed vs unconfirmed visual treatment (opacity, ✓, link) | Credit display spec written |
| 57 | ⬜ Define the portfolio section — audio player design, video embed treatment, max items | Portfolio spec written |
| 58 | ⬜ Define the booking CTA — enquiry form fields, what's required, what the artist receives | Booking flow spec written |
| 59 | ⬜ Define freelancer onboarding — steps, live preview, what "done" looks like | freelancer-start.html spec written |
| 60 | ⬜ Define the peer-confirm notification — exact copy for every touchpoint (push, in-app, email) | Peer-confirm copy spec written [partially done in credit verification research] |
| 61 | ⬜ Define "unverifiable — artist inactive" state — when does it appear, what does it look like | Inactive artist state spec written |
| 62 | ⬜ Define freelancer admin — what they need to manage (credits, portfolio, enquiries) | Freelancer admin spec written |
| 63 | ⬜ Decide: are freelancers in the same admin.html or separate freelancer-admin.html? | Decision recorded with reasoning |

---

## GROUP 8 — COPY: EVERY SURFACE (64–74)
*Copy decisions made before build. Nothing left for "we'll write it during the build."*

| # | Step | Done when |
|---|---|---|
| 64 | ⬜ Write all fan sign-up form copy — all 4 campaign states (profile, pre-release, live, gig) | 4 capture variants written |
| 65 | ⬜ Write all 3 fan email templates — confirmation, event-triggered activation, 7-day timer | Email copy complete [research provides templates] |
| 66 | ⬜ Write all Close Circle copy — ask on artist profile, ask on fan dashboard, success state, settings | Close Circle copy complete |
| 67 | ⬜ Write all peer-confirm copy — notification (push/in-app/email) for both artist and freelancer | Peer-confirm copy complete [partially done] |
| 68 | ⬜ Write all freelancer profile copy — every label, placeholder, empty state, error state | Freelancer copy complete |
| 69 | ⬜ Write all admin.html empty states for new features (Close Circle, credits, broadcast) | Admin empty states written |
| 70 | ⬜ Write all landing.html updates — new positioning, freelancer section, updated proof demo copy | Landing copy updates written |
| 71 | ⬜ Write fan.html all section copy — headers, empty states, CTAs, settings sheet | fan.html copy complete |
| 72 | ⬜ Write directory copy — page title, vibe tiles, active signals, editorial spotlight intro, empty states | Directory copy complete |
| 73 | ⬜ Run copy review — check every new piece of copy against COPY_AND_DESIGN_PHILOSOPHY.md and banned phrases list | Copy compliance confirmed |
| 74 | ⬜ Write the 10 most important micro-copy moments — the phrases that make ABLE feel like ABLE | Signature phrases documented |

---

## GROUP 9 — TECHNICAL ARCHITECTURE DECISIONS (75–85)
*Every decision that affects how the whole v8 codebase is structured.*

| # | Step | Done when |
|---|---|---|
| 75 | ⬜ Decide: does v8 stay as one file per page or introduce shared JS/CSS modules? | Architecture decision recorded |
| 76 | ⬜ Audit current shared/able.js and shared/style.css — what's used, what's dead | Shared file audit complete |
| 77 | ⬜ Define Supabase table schema for v8 — every table, every column, relationships | BACKEND_SCHEMA_V8.md written |
| 78 | ⬜ Define Supabase RLS policies — every table, who can read/write what | RLS policy spec written |
| 79 | ⬜ Define the Resend email architecture — which emails go via which functions, suppression list, list management | Email architecture spec written |
| 80 | ⬜ Decide: Netlify functions or Supabase edge functions for each backend operation | Function placement decisions recorded |
| 81 | ⬜ Define event taxonomy — every trackable event (fan sign-up, CTA click, stream click, pre-save, page view, campaign state view) with exact field names | Event schema written |
| 82 | ⬜ Define the `?source=` attribution param standard — every platform ABLE artists post on, every tracking context | Attribution param spec written |
| 83 | ⬜ Define Stripe integration architecture — products, prices, webhooks, subscription lifecycle | Stripe integration spec written |
| 84 | ⬜ Define the service worker for push notifications — scope, events, notification format | SW spec written |
| 85 | ⬜ Define localStorage → Supabase migration strategy — when does each key sync, what triggers a write, conflict resolution | Migration strategy written |

---

## GROUP 10 — PERFORMANCE + QUALITY TARGETS (86–90)
| # | Step | Done when |
|---|---|---|
| 86 | ⬜ Set file size budget per page for v8 — gzipped target, hard limit | Size budgets documented |
| 87 | ⬜ Set Core Web Vitals targets for v8 — LCP, INP, CLS per page | Targets documented |
| 88 | ⬜ Set accessibility targets — WCAG 2.2 AA on all pages, all themes | Accessibility targets confirmed |
| 89 | ⬜ Define Playwright test suite structure — which flows, which visual regression baselines | Test suite spec written |
| 90 | ⬜ Define the "done" criteria for v8 — exact checklist that must be green before v8 is considered shippable | v8 done criteria written |

---

## GROUP 11 — VISUAL DESIGN: V8 DISTINCT FROM V7 (91–97)
*v8 should feel like an upgrade, not just more code. What specifically changes visually?*

| # | Step | Done when |
|---|---|---|
| 91 | ⬜ Define what's visually new in v8 — list every intended improvement vs v7 | v8 visual changes list written |
| 92 | ⬜ Decide on any token changes — different border radii, spacing scale, shadow system | Token decisions recorded |
| 93 | ⬜ Design the Close Circle section on the artist profile — mockup or detailed spec | Close Circle design spec complete |
| 94 | ⬜ Design the credits section on release cards — confirmed ✓ vs unconfirmed, live link treatment | Credits UI spec complete |
| 95 | ⬜ Design the fan dashboard — Today strip, artist cards, Discover tabs | fan.html design spec complete |
| 96 | ⬜ Design the freelancer profile — layout, credits section, portfolio, rate card | Freelancer profile design spec complete |
| 97 | ⬜ Design the directory — vibe tiles, artist grid cards, spotlight section | Directory design spec complete |

---

## GROUP 12 — FINAL CONFIDENCE CHECKS (98–100)
*Read these before writing the first line of v8.*

| # | Step | Done when |
|---|---|---|
| 98 | ✅ Read back through all 6 research docs — extract the 20 most important decisions they imply | Synthesised in V8_BUILD_AUTHORITY.md §§4–14 |
| 99 | ✅ Write V8_BUILD_AUTHORITY.md — the single source of truth for v8, resolving all contradictions | V8_BUILD_AUTHORITY.md written 2026-03-15 |
| 100 | ✅ Read V8_BUILD_AUTHORITY.md end to end — if anything is unclear or missing, resolve it now | Reviewed. Build can start. |

---

## Currently complete: 20/100

**Steps completed today (2026-03-15):** 11, 12, 13, 14, 16, 18, 20, 21, 24, 25, 28, 98, 99, 100 (plus 1–5 from earlier sessions)

**The build can now start.** V8_BUILD_AUTHORITY.md is written and complete. The single most important pre-build document exists.

**Remaining high-priority pre-build steps (can be done in parallel with build Phase 1):**
Steps 15, 17, 19 (user research), 22, 23, 26, 27 (competitive research), 29–32 (directory design), 33–45 (artist profile design decisions), 46–54 (fan dashboard design), 55–63 (freelancer design), 64–74 (copy), 75–85 (technical architecture), 86–90 (performance targets), 91–97 (visual design), where not already resolved in V8_BUILD_AUTHORITY.md.
