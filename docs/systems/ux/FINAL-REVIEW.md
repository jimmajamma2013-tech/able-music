# ABLE UX Final Review
**Date: 2026-03-16**
**Baseline score: 6.9/10**
**Projected post-P0: 8.2/10**
**Projected post-P1: 9.0/10**
**Note: This is a forward-looking document. Scores marked "projected" will be confirmed by Playwright audit after fixes land.**

---

## Scoring Summary: All 20 Angles

| # | Angle | Now | After P0 | After P1 | Priority fixes |
|---|---|---|---|---|---|
| 1 | Onboarding flow | 7 | 7 | 9 | P1.1 (Spotify import wire-up) |
| 2 | First impression | 8 | 8 | 9 | P1.8 (sticky artist name) |
| 3 | Fan sign-up conversion | 6 | 9 | 9 | P0.1 (state-specific copy), P0.2 (bottom capture) |
| 4 | CTA hierarchy | 8 | 8 | 9 | P1.5 (pills overflow signal) |
| 5 | Campaign state UX | 9 | 9.5 | 9.5 | P0.7 (crossfade), P1.7 (countdown format) |
| 6 | Navigation / findability | 7 | 7 | 8 | P1.8 (sticky name) |
| 7 | Empty states | 6 | 7 | 8 | Admin copy audit |
| 8 | Error handling | 5 | 7 | 8 | P0.4 (localStorage crash), P1.6 (email wired) |
| 9 | Loading states | 7 | 7 | 8 | Image blur-up audit |
| 10 | Mobile gesture support | 7 | 8 | 8 | P0.4 (side effect) |
| 11 | Admin dashboard usability | 7 | 8 | 8.5 | P0.3 (mobile admin), P1.4 (click trigger) |
| 12 | Fan capture email flow | 5 | 5 | 8 | P1.6 (email send wired) |
| 13 | Gig mode UX | 8 | 8 | 9 | P1.2 (post-show state) |
| 14 | Copy/microcopy quality | 8 | 8.5 | 9 | Admin copy audit |
| 15 | Progress/feedback | 7 | 8 | 8.5 | P0.7 (state crossfade) |
| 16 | Accessibility | 6 | 7.5 | 8 | P0.5 (ARIA live regions) |
| 17 | Cross-device journey | 6 | 7.5 | 8 | P0.3 (mobile admin) |
| 18 | Tier gate UX | 7 | 8.5 | 9 | P0.6 (fan cap bar), P1.4 (click trigger) |
| 19 | Trust signals | 7 | 7.5 | 8 | P1.3 (Done screen trust signal) |
| 20 | Delight moments | 8 | 8 | 9 | P1.3 (Done screen ceremony) |
| | **Average** | **6.9** | **8.0** | **8.9** | |

---

## Detailed Review — Current State

### What is already genuinely strong

**The design system is visually superior to all link-in-bio competitors at this price point.** Linktree, Beacons, Koji, and Campsite all have flat, templated designs that communicate "this artist is using a platform." ABLE profiles communicate "this artist has a page." The vibe system, ambient artwork extraction, and tokenised accent colour are not gimmicks — they make each profile feel specific to the artist who built it.

**The campaign state machine is a real product differentiator.** No other link-in-bio product changes its content based on what the artist is currently doing. An ABLE page in pre-release mode actively prepares for the release. In gig mode it actively sells tickets. In live mode it channels traffic to the new record. For an artist running an active campaign, ABLE is meaningfully different from a static link page.

**The copy is on-register across the primary flows.** The product does not use the words "grow," "audience," "monetise," "superfans," or "newsletter" — the full banned list from COPY_AND_DESIGN_PHILOSOPHY.md is respected in the main flows. The dashboard greeting is warm without being performative. The fan capture copy is honest and first-person. These are details that Maya would notice, and they earn trust.

**The performance architecture is correct.** Local-first render from localStorage means warm visits (returning fans, artists checking their own page) feel instant. For a product whose primary audience is on mobile data, this is the right call and it is correctly implemented.

**Spring physics and micro-interactions give the product a feeling of quality.** The scale-down on press, the spring-back on release, the confetti on first sign-up, the ambient colour extraction — these are the details that make an artist say "this was made by someone who cares about this stuff."

---

### What needs work before public launch

**The fan email flow is incomplete.** Without the confirmation email, the fan journey dead-ends at confetti. The artist's fan list has names in it but no email relationship has been established. This is the single largest gap between current state and a product that delivers on its promise. P1.6 fixes this.

**The sign-up copy is static when it should be contextual.** A pre-release artist running a campaign gets the same "Stay close. / I'm in" sign-up form as an artist in profile mode. The research is unambiguous: state-contextualised copy converts at 6x the baseline in pre-release. This is a non-trivial conversion loss that P0.1 fixes with about 50 lines of code.

**The admin is unusable on mobile.** Artists check their stats on their phones — especially after shows, the highest-value moment. The sidebar-based desktop admin is correct for desktop. A mobile-responsive version is required before launch. P0.3 is not a small fix but it is not optional.

**The 100-fan cap progress bar is missing.** This is the highest-intent upgrade trigger in the product. An artist at 85 fans who can see the bar at 85% will upgrade. An artist at 85 fans who cannot see the bar will not know they are near it. P0.6 is a small addition with a disproportionate revenue impact.

---

## Projected State After P0 Fixes

After shipping P0.1 through P0.7:

**Fan sign-up conversion (angle 3): 6 → 9.** The state-specific copy is the main driver. A fan arriving in pre-release mode now sees "Nova Reign drops April 4. Hear it early. / Send it to me" rather than "Stay close. / I'm in." The second sign-up at page bottom catches fans who scroll through everything.

**Error handling (angle 8): 5 → 7.** The localStorage crash in Safari private browsing no longer breaks the sign-up flow. The campaign state crossfade makes state transitions feel intentional rather than broken.

**Accessibility (angle 16): 6 → 7.5.** ARIA live regions mean VoiceOver users hear the sign-up confirmation. Campaign state changes are announced. The most critical accessibility gap in the fan journey is closed.

**Tier gate UX (angle 18): 7 → 8.5.** The fan cap progress bar from fan 1 means the upgrade trigger is always visible for artists building toward the cap. At 95+ fans, the specific nudge copy ("Your list is full — these are 100 people who asked to hear from you") is the correct copy per spec §9.1.

**Cross-device / Admin mobile (angle 17): 6 → 7.5.** The admin renders usably on mobile. An artist can check their fan list from their phone after a gig.

**Average: 6.9 → 8.0.** The product is now ready for a private beta with real artists.

---

## Projected State After P1 Fixes

After shipping P1.1 through P1.8:

**Onboarding (angle 1): 7 → 9.** The Spotify import is wired, meaning an artist who pastes their Spotify URL sees their page mostly filled in within 5 seconds. The Done screen is ceremonial rather than functional — the artist leaves setup with the emotional payoff of seeing their live profile, not just a copy-link button.

**Fan capture email flow (angle 12): 5 → 8.** The confirmation email fires within 30 seconds of sign-up. The fan receives "[Artist Name] via ABLE" in their inbox. The email is in the correct register — artist voice, specific, one-click unsubscribe. The fan journey no longer dead-ends.

**Gig mode (angle 13): 8 → 9.** The post-show state captures fans walking out of the venue. The highest-conversion window in the fan/artist relationship — 10 minutes after a great show — now has a page designed to receive it.

**Admin analytics (angle 11): 7 → 8.5.** The in-context "12 people tapped your Spotify link today" upgrade trigger is live. Artists who are getting traction see it. The specific upgrade value (source breakdown) is named.

**Average: 8.0 → 8.9.** The product is now ready for public launch and active artist acquisition.

---

## The One Moment That Will Make Artists Tell Other Artists

This is not about a feature. It is about a specific sequence of events that will happen for real artists within the first week of using ABLE.

**The sequence:** An artist puts their ABLE link in their Instagram bio. They post a reel. The reel does well — 8,000 views. The next day they open their ABLE admin and see: 12 fans signed up. They don't know any of them. One is from Brighton — the same city as the artist. One is from Berlin. One is from a source they don't recognise: the source says "instagram/reel."

The admin caption above the fan list reads: "12 people signed up this week. These are people who chose to hear from you."

This is the moment. Not the confetti. Not the design system. Not the ambient artwork colour. This: seeing strangers who decided to stay close. People the artist has never met who said yes without being asked twice.

This moment is only possible if the product is complete end-to-end: reel → ABLE link → profile page in correct state → sign-up form in correct copy → fan record saved → source tracking working → admin fan list showing real data.

Every single P0 fix in this document is in service of that moment being possible. The profile must look right (design system). The sign-up must convert (state-specific copy). The email must arrive (P1.6). The admin must show the source data (currently built). The artist must be able to check it on their phone after a show (mobile admin).

When that sequence works end-to-end, Maya signs up and tells Kiro. Kiro tells Daniel. Daniel tells his producer. The product grows because the product works, not because of marketing.

That is the 10/10.

---

## Known V1 Scope Decisions (not UX failures)

These are gaps that are acknowledged, understood, and intentionally deferred:

**Cross-device following list persistence.** Fans who sign up on one device cannot see their following list on another device in V1. localStorage is per-browser. EC-09 acknowledges this. V1 empty state copy is correct: "Your following list is empty. Find artists from their pages." Not a broken state — an honest one. Phase 2 Supabase auth resolves this.

**fan.html.** The fan dashboard is Phase 2. In V1, the fan journey ends at the sign-up page and continues in their inbox. This is correct and the copy on the profile acknowledges it appropriately (no broken links to fan.html).

**Custom artist sending domains.** V1 uses ABLE's subdomain (`mail.ablemusic.co`). Artists who want to send from their own domain (e.g. `hello@novamusic.co`) are on V2. This is disclosed in admin when the email feature is set up.

**Freelancer profiles.** `freelancer.html` does not exist. Credits on release cards render as plain text if no ABLE handle is linked. This is the correct graceful degradation. Phase 2.

**Globe heatmap analytics.** Phase 2. The fan list in V1 shows source (instagram/direct/etc.) and timestamp. Location data for the globe view requires Supabase and geolocation logic. The admin does not show a broken map — it shows the text data that exists.

---

## Audit Confirmation Checklist

Before marking UX as launch-ready, run this checklist against the live build:

**P0 complete:**
- [ ] Fan capture copy changes by campaign state (profile/pre-release/live/gig)
- [ ] Second fan capture section exists at page bottom
- [ ] Admin renders usably at 375px (bottom nav, 2-col stats)
- [ ] localStorage operations wrapped in try/catch
- [ ] ARIA live region on fan sign-up confirmation echo
- [ ] 100-fan progress bar visible from fan 1
- [ ] Campaign state transition uses crossfade

**P1 complete:**
- [ ] Spotify import field wired to Netlify function in start.html
- [ ] Post-show state (gig-post) exists for final 6h of gig mode
- [ ] Done screen shows profile preview + trust copy
- [ ] Admin analytics in-context click-data nudge fires at 3+ taps/day
- [ ] Quick Action pills overflow fade gradient present
- [ ] Fan confirmation email fires within 30s of sign-up
- [ ] Countdown granularity matches time distance (date / days / hours)
- [ ] Sticky artist name fades in at 120px scroll

**Accessibility gate:**
- [ ] WCAG 2.2 AA contrast in all 4 themes × 7 vibes (minimum: Acoustic/Light/ochre combo)
- [ ] All interactive elements ≥ 44×44px tap target
- [ ] VoiceOver journey through fan sign-up works end-to-end
- [ ] `prefers-reduced-motion` CSS rule present and `window.matchMedia` check on Web Animations API calls
- [ ] Campaign state changes announced via ARIA live region

**Performance gate:**
- [ ] LCP ≤ 2.5s on throttled 4G (Chrome DevTools)
- [ ] CLS ≤ 0.10 (Lighthouse mobile)
- [ ] HTML ≤ 340kB gzipped
- [ ] No render-blocking scripts in `<head>`

---

*Last updated: 2026-03-16*
*This document is updated as P0 and P1 fixes land. Each fix should be checked against the corresponding angle score in the summary table.*
*Cross-reference: `docs/systems/ux/ANALYSIS.md`, `docs/systems/ux/SPEC.md`, `docs/systems/ux/PATH-TO-10.md`*
