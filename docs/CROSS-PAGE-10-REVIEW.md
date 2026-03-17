# ABLE — Cross-Page Coherence & Product-to-10 Review
**Date: 2026-03-16**
**Overall product score: 7.4/10**
**Target: 10/10**
**Stage: Final authority phase — this is the synthesising document**

---

## The governing question

Not "what is good or bad about this page?" but: **what exact set of improvements brings ABLE as a whole product closer to 10/10?**

---

## Product score: 7.4/10

Justification:

- Individual page specs are mostly excellent (9/10+)
- Implementation quality is solid (7–8/10 average)
- Cross-page coherence is the main gap (6/10)
- Activation sequence has structural holes (6.5/10)
- Trust consistency is largely strong but has specific leaks
- The freelancer layer is 0% built

The product is strong per-surface. It is not yet one product.

---

## Where ABLE feels unified

- Design language: Midnight Navy, DM Sans, spring easing, artist accents — these run coherently across artist profile, admin, fan
- Copy philosophy: no marketing speak, no exclamation marks, first-person artist voice — this is consistent where implemented
- Data architecture: localStorage schema maps cleanly 1:1 to the planned Supabase tables
- The "artist before label" positioning: clear on landing, reflected in profile design, honoured in admin
- Mobile-first approach: all pages feel phone-native

---

## Where the seams still show

### 1. Activation gap — the most critical issue

**Landing → onboarding → live profile → first fan → dashboard**

This journey has a structural hole. The artist completes the wizard, sees their profile, and lands on admin. But **the moment their first fan signs up — the moment ABLE actually proves its value — is barely acknowledged.**

Currently: a fan signs up → the fan count increments in admin → no ceremony, no signal, no acknowledgement that something real just happened.

This is ABLE's magic moment and it lands flat. An artist who gets their first fan sign-up through ABLE should feel it. They should understand what they just captured: a real email address, their fan relationship, no algorithm between them. The dashboard should make this specific and visceral, not just a number.

**Fix:** When `able_fans` length goes from 0 to 1 (or from any count up by 1 within the first 10 fans), the admin dashboard should surface a moment: "Your first fan signed up. [email]. That email is yours." This is not a notification — it is a reveal. It should feel like what it is.

### 2. Cross-page copy inconsistency

Several vocabulary violations remain across pages:
- "Snap cards" in admin vs "Updates from the artist" in the copy spec
- The upgrade bar in admin still uses copy that doesn't match the landing page's tone ("Upgrade to Artist" vs landing's "Get started")
- Fan confirmation email template (Netlify function) and the artist welcome email are not yet aligned with the copy spec

**Fix:** Run a copy audit against `docs/systems/copy/SPEC.md`. Every surface. Every CTA. Every badge.

### 3. Landing uses Fraunces; no other page does

The landing page uses the Fraunces editorial serif font which creates a distinct, aspirational quality. None of the product pages use it. This is a deliberate design choice (landing = marketing; product = utility) but it creates a perceptible quality gap when a user moves from landing to onboarding. The landing feels more premium than the product they land in.

**Fix:** This requires judgment — not automatically wrong. Options: (a) Introduce Fraunces as a display accent in admin.html and fan.html for section headers to bridge the gap; (b) accept the gap as intentional and ensure the product pages' quality is high enough that users don't notice. Option (b) is likely right — but only if the product pages are genuinely excellent. Currently they are not quite there.

### 4. First-time state logic is inconsistent

- `start.html` has a good done state that now correctly sends to `able-v7.html`
- But `able-v7.html` has no recognition that this is an artist's first visit to their own profile
- `admin.html` has a first-run checklist but it fires even for returning artists who've just not added certain data
- `fan.html` now has a first-visit state (just implemented) but it's not wired to the confirmation email yet

**Fix:** Define a clear "first-time state" token for each page that is set exactly once and cleared on first meaningful action. This should be in `docs/systems/CROSS_PAGE_JOURNEYS.md`.

### 5. The "Near me" tab on fan.html is hardcoded to London

A fan in Edinburgh who taps Near me sees London shows. This breaks trust in the most direct way possible: the page claims to know where you are but doesn't. This is not a polish issue — it is a trust issue.

**Fix:** On first Near me visit, if `fan_location` is not set, show a location capture UI (one input: "Where are you based?"). Save to `fan_location`. Never hardcode a city.

### 6. No PWA icon that actually works

The PWA icons (`/icons/icon-192.png` and `/icons/icon-512.png`) were generated programmatically but not verified to render correctly on real devices. Icons that render as blank or broken on home screen destroy the premium feel instantly.

**Fix:** Verify icons render correctly on both iOS and Android home screen via Playwright.

---

## Cross-page journeys — strongest and weakest

### Strongest
- **Profile → fan sign-up**: The fan capture form on able-v7.html is well-designed, GDPR-compliant, and now uses safeLS. The confirmation email is spec'd.
- **Landing → onboarding**: The CTA "Your page is free →" and "Get your free page →" are consistent. The transition feels intentional.
- **Admin → profile view**: The "Fan view" pill in able-v7.html edit mode is a clean bridge.

### Weakest
- **Onboarding done state → first real profile moment**: Artist sees their profile for the first time without any guidance on what to do next. There is no "here is what your fans see" context.
- **Admin → understanding campaign state**: An artist without technical context may not understand what "Pre-release" or "Live" mean. The mode system is powerful but underexplained.
- **Fan sign-up → fan.html**: The confirmation email does not yet pass `?artist=slug&ref=email-confirm`. This means the fan arrives at fan.html cold even after a successful sign-up. The URL scheme is now built in fan.html but not yet wired to the Netlify confirmation function.
- **Profile → artist credits → freelancer profile**: Does not exist yet. This is the next major cross-page journey to build.

---

## The 12 highest-leverage improvements

**1. Wire the fan sign-up confirmation email to the ?artist= arrival scheme (fan.html)**
- Type: cross-page continuity
- Difficulty: low (update Netlify fan-confirmation.js)
- Lift: very high — this makes the fan.html first-visit state work in production

**2. First-fan moment in admin.html**
- Type: activation / emotional design
- Difficulty: low (detect first fan, show specific copy)
- Lift: very high — this is ABLE's magic moment

**3. Near me location capture UI (fan.html)**
- Type: trust
- Difficulty: low (one input, save to fan_location)
- Lift: high — hardcoded London breaks trust for anyone not in London

**4. Copy audit against copy spec**
- Type: coherence / trust
- Difficulty: medium (systematic audit, many small edits)
- Lift: high — vocabulary consistency is the most direct form of product maturity

**5. Admin campaign mode onboarding copy**
- Type: activation / comprehension
- Difficulty: low (add tooltip or inline explanation to each mode)
- Lift: medium-high — mode system is powerful but opaque to first-time users

**6. Credits pre-work in admin.html (release cards)**
- Type: strategic / product architecture
- Difficulty: low (one form field, one data key)
- Lift: unlocks the entire freelancer discovery mechanic

**7. Verify PWA icons on real devices**
- Type: polish / trust
- Difficulty: low (Playwright screenshot + manual check)
- Lift: medium — broken icons on home screen are a silent trust killer

**8. First-visit state for artist profile (able-v7.html)**
- Type: activation / emotional design
- Difficulty: low (check URL param or localStorage flag)
- Lift: medium — artist's first impression of their own page matters

**9. Confirm email sends in production (Netlify + Resend domain verification)**
- Type: trust / infrastructure
- Difficulty: low for James (manual domain verification at resend.com)
- Lift: very high — none of the email flows work until this is done

**10. Caught-up sub-line in admin (fan count with context)**
- Type: emotional design
- Difficulty: low
- Lift: medium — makes the fan list feel like a relationship, not a metric

**11. Remove remaining emoji from admin.html (pre-release and gig mode nudges already done)**
- Type: tone / copy
- Difficulty: low (find remaining emoji in admin)
- Lift: low-medium — emoji in the dashboard breaks the serious register

**12. Profile completeness signal in admin.html**
- Type: activation
- Difficulty: low
- Lift: medium — artist who has set up 40% of their profile doesn't know what's missing

---

## The single most important improvement

**Wire the fan confirmation email to `?artist=slug&ref=email-confirm`.**

This is the most impactful change because it activates a chain: the fan lands with context → fan.html shows the first-visit state → fan sees the artist they just signed up for → fan follows → cold-start suggestions appear → fan follows more artists. Without this wire, every fan arrives cold even after a successful sign-up, and the arrival flow that was just built does nothing.

The Netlify function change is 2 lines. The unlock is the entire fan activation system.

---

## The single most important coherence improvement

**Define and enforce a single copy vocabulary list that every surface follows.**

"Feed" crept back into bottom tab labels. "Snap cards" appears in some places, "Updates" in others. The admin uses "Campaign" in one place and "Page mode" in another. The copy spec exists (`docs/systems/copy/SPEC.md`) but is not being checked systematically. A 30-minute audit, surface by surface, would catch everything.

This is not a nice-to-have. Vocabulary inconsistency is the clearest signal that a product is not one thing yet.

---

## The single most important activation improvement

**Make the first fan sign-up a felt moment in admin.html.**

An artist who gets their first fan through ABLE needs to understand what just happened: this is not a follower count. This is an email address that belongs to them, not to a platform. The moment this lands — really lands — is when an artist becomes a retained ABLE user. Before this moment, ABLE is a profile. After it, ABLE is a relationship layer.

The copy for this moment: "Your first fan. [email redacted]. That email is yours — no platform decides whether they hear from you."

---

## Why ABLE is not 10 yet

1. **Activation chain has a broken link** (fan confirmation email not passing artist context)
2. **The magic moment is unmemorable** (first fan in admin shows as a number, not a revelation)
3. **Trust leak: Near me hardcoded to London** (anyone outside London sees false data)
4. **Freelancer layer is 0% built** (the credits discovery mechanic cannot function)
5. **Copy vocabulary is inconsistent across surfaces** (vocabulary is ideology — inconsistency signals product immaturity)
6. **Fraunces font quality gap** between landing and product (landing feels more premium)
7. **PWA icons unverified** on real devices
8. **Resend domain verification not done** (all email flows are non-functional in production)

Items 1, 2, 3, 5, 8 are fixable this week. Items 4 and 6 are longer-term.

---

## What should be ignored for now

- Freelancer discovery directory (wait until first 10 freelancers are on the platform)
- Close Circle / paid fan tier (wait until Supabase is live and first 50 artists have fans)
- Globe heatmap analytics (Phase 2)
- Artist roster management for labels (Phase 2 — needs subscriber base)
- Story Mode video assembly (Phase 2)
- Any social/fan-to-fan features (never — this is not a social network)
- Push notifications (Phase 2 — needs service worker with push registration)

---

## 10/10 ABLE doctrine

ABLE feels like one intelligent product when every surface knows what the others are doing.

The artist finishes the wizard and sees their page. They put it in their bio. A fan signs up and the artist sees a real name in their list — and understands, for the first time, that this relationship belongs to them. The fan lands on fan.html knowing who brought them there and why. The music that played before the fan signed up was produced by someone visible, creditable, discoverable. The artist who made that music can be messaged, followed, and found.

The whole thing should feel like a calm, precise act of returning music relationships to the people who have them.

At 10/10: no surface surprises you. The logic connects. The copy is honest throughout. The moments that matter feel like they matter.

---

## Build order (cross-page focus)

1. **Resend domain verification** (James only — manual task at resend.com/domains) — this unlocks ALL email flows
2. **Wire fan confirmation email to ?artist= scheme** (netlify/functions/fan-confirmation.js — 2 lines)
3. **Near me location capture UI** (fan.html — one input, save to fan_location, stop hardcoding London)
4. **First-fan moment in admin.html** (detect first fan, surface specific copy)
5. **Credits pre-work in admin.html** (release model + form field + rendering in able-v7.html)
6. **Copy audit** (30 minutes, surface-by-surface against copy spec)
7. **Verify PWA icons** (Playwright screenshots + real device check)
8. **Campaign mode tooltip/explanation in admin.html** (one sentence per mode)
9. **freelancer-start.html + freelancer profile page** (see freelancer build order)
10. **First-visit state for artist profile** (able-v7.html)

---

## File updates required

| File | What to add/change | Why |
|---|---|---|
| `netlify/functions/fan-confirmation.js` | Pass `?artist={slug}&ref=email-confirm` in the fan dashboard link | Activates entire fan arrival flow |
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | Add "first-time state token" spec for each page. Add "first fan" activation moment spec. Update journey: fan sign-up → confirmation email → fan.html arrival | These journeys are not fully specced |
| `docs/v6/core/V6_BUILD_AUTHORITY.md` | Add §X: "Credits pre-work in admin.html is the single highest-priority unblocked roadmap item." | Time-sensitive window — every release without credits needs retroactive migration |
| `CONTEXT.md` | Add to fast-orientation: "Cross-page gaps: (1) fan confirmation email not passing artist context — fix in fan-confirmation.js; (2) Near me hardcoded to London; (3) first-fan moment in admin missing; (4) credits not in release model" | Session-start orientation needs to include these gaps |
| `docs/STATUS.md` | Update with current scores (landing: ~8.5/10, fan.html: ~7.8/10) and outstanding items list | Status needs to be current |
