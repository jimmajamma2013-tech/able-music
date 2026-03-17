# ABLE — Launch Sequence: Honest Audit
**Last updated: 2026-03-16 | Score: 7.5/10 → 9/10 (with producer seeding bridge + press story)**

> This is not a criticism. It is a calibration. The product is nearly specced. The launch strategy has real gaps — but fewer than the previous version of this analysis acknowledged. This version identifies the specific bridge that takes 10 artists to 50 without relying on unproven word-of-mouth.

---

## Scoring framework

Each dimension is scored 0–10.
- 0–3: unaddressed, significant risk
- 4–6: partially addressed, known gaps
- 7–8: solid, minor gaps
- 9–10: production-ready, no blockers

---

## Dimension 1 — Pre-launch preparation
**Score: 4/10**

### What exists
- Product specced at high quality across all 4 active files
- Design system defined and mostly built
- Supabase project created and configured
- Netlify hosting available (not yet deployed)
- localStorage data model complete and documented

### What is missing
- Company not incorporated. Operating as an individual with no legal entity means no terms of service, no data processing agreement, no contracts with artists, and no IP protection if anything goes wrong. At 10 artists this is low risk. At 50+ it is a meaningful liability.
- No privacy policy or GDPR compliance documentation. Fan emails are being collected. GDPR requires a lawful basis, a privacy policy, and documented consent. None of this exists.
- Domain not confirmed as live. `ablemusic.co` is referenced throughout the docs but no deploy step is in any checklist.
- No terms of service. An artist who builds an audience on ABLE and has a dispute has no contract to refer to.
- No email domain set up for Resend. The from-address for fan confirmation emails requires a verified sending domain.

### What this means
None of these block a 10-artist private beta if James operates it personally and transparently. They all block a soft launch (50+ artists) without significant legal exposure. The pre-launch preparation score is honest at 4/10 because the legal and compliance work is completely absent — not partially done.

**Gap to 9:** Company incorporated (Ltd or sole trader — sole trader takes 1 day). Privacy policy from a generator (e.g. privacypolicygenerator.info, 1 hour). Domain deployed with HTTPS. Terms of service basic template. These are days of work, not weeks.

---

## Dimension 2 — Soft launch readiness
**Score: 6/10**

### What exists
- able-v7.html, admin.html, start.html all in active development
- Full campaign state system specced and mostly built
- Fan sign-up flow functional (localStorage-based)
- Fan list export as CSV confirmed
- "Made with ABLE" footer concept specced

### What is missing
- Supabase not wired — fan emails are localStorage-only, which means data loss risk on cleared browser/new device
- No deployment. The product exists as local HTML files. A URL must exist before any soft launch activity.
- No email confirmation wired via Resend — fans sign up but receive nothing
- Mobile real-device testing not confirmed. Playwright tests at 375px viewport are not the same as a real 390px iPhone 15 on 4G.
- start.html wizard completion on non-developer phones not tested

### Score rationale
6/10 because the product is close but the two critical missing pieces — deployment and email confirmation — are each essential for a soft launch that doesn't embarrass anyone. At the exact moment the "here's what I built" post goes live, someone will tap the link on their phone. The product needs to work for them, not just for James on his machine.

**Gap to 9:** Deploy to Netlify. Wire Resend for fan confirmation emails. Test on 3 real devices (Android mid-range, iPhone SE, iPhone 15 Pro). Fix whatever breaks.

---

## Dimension 3 — First 10 artists (private beta)
**Score: 7/10**

### What exists
- SPEC.md and PATH-TO-10.md have detailed criteria and outreach guidance
- Onboarding flow designed for 1:1 human conversations
- WhatsApp/Discord feedback channel recommended
- Phase 1 success criteria defined (10 pages, 100 fans, 8/10 with bio live)

### What is still missing
- No named list. The criteria exist. The list does not. This is the entire gap.
- No outreach DM written. The conversation is described but the actual opening message is not.
- No "artist who drops out" contingency — no buffer list of 12–15 to draw from
- Onboarding script not written (talking points James knows cold, not reads)

### Score rationale
7/10 because the strategy is sound and the network is real. James's personal connections to working musicians are the strongest possible foundation for a private beta. The gap is operationalising the list — writing it down and starting the conversations.

**The "imminent release" requirement:** The Phase 1 criteria do not explicitly require artists with imminent releases or gigs, but they should. At least 3 of the 10 beta artists should have a release or show within 6 weeks — otherwise the campaign state system (ABLE's most differentiating feature) goes entirely untested in real conditions.

**Gap to 9:** Named list with 12 artists (2 buffer slots). 3 with imminent releases or gigs. Opening DM written. Onboarding talking points written. All done before Phase 0 closes.

---

## Dimension 4 — First 50 artists (soft launch / Phase 2)
**Score: 5/10**

### The honest problem
The plan for reaching 50 artists after the first 10 is: word-of-mouth from those 10 artists. This is unproven, uncontrolled, and unbudgeted in any concrete sense.

**What "word of mouth" actually means in practice:**
- 10 artists share ABLE with their friends and collaborators
- Some of those friends sign up
- Some of those new artists share it further
- Repeat until 50

This loop works — but only if:
1. The 10 beta artists are genuinely enthusiastic (not just politely engaged)
2. They actively share it, not just mention it when asked
3. The people they share it with are in the market for a better link-in-bio
4. The sign-up experience works end-to-end for someone James has never met

Every assumption in that chain is unproven at the point Phase 2 begins.

### What's missing
- No producer seeding strategy operationalised (producer seeding is the bridge — see below)
- No outreach message for producers (different from artist DM — different framing)
- No fallback plan if word-of-mouth from 10 artists produces 10 more, not 40
- No "Made with ABLE" footer tracking confirmed — the passive loop is specced but whether the footer generates inbound is entirely unverified

### Score rationale
5/10 because the word-of-mouth assumption is the most optimistic assumption in the entire launch plan. It is not wrong — it is just unproven, and a plan that depends on unproven assumptions at a critical phase transition is a 5, not a 7.

**Gap to 9:** Producer seeding strategy (fully specified below). This is the bridge. With producer seeding, Phase 2 has a systematic channel that does not depend on organic word-of-mouth from 10 artists alone.

---

## Dimension 5 — Press and coverage
**Score: 3/10**

### Current state
- Music Ally Sandbox pitch mentioned in SPEC.md and GROWTH_STRATEGY.md
- No relationships with any music journalists or bloggers
- No press kit exists
- No press story has been written out
- No journalists identified by name, publication, or email

### The honest assessment
Press outreach without a story, a relationship, and a track record of users is very hard. Music Ally is a credible target — their "Sandbox" section specifically covers emerging music-tech products. But a cold pitch to Music Ally with zero users will not get coverage.

The press story that is actually true right now is more interesting than a product announcement. It is a human story. That story should be written out before any pitch is sent.

**The story (see full treatment in PATH-TO-10.md):**
"Independent musician with a C5/C6 herniated disk builds the tool he always wished existed, using AI agents to build faster than a team. For artists who own their fan relationship."

This story has everything a music-tech writer wants: a real founder with a real problem, a product with a genuine philosophy, a technical approach (AI-assisted build, single file, no dependencies) that is genuinely unusual.

### Score rationale
3/10 because no press infrastructure exists. The story is there. The contacts are not. The press kit does not exist. Starting from 3/10 on this dimension is not a crisis at Phase 1 or Phase 2 — press is correctly deferred to Phase 3. But it needs a foundation built now so the Phase 3 pitch is not cold.

**Gap to 9:** Identify 5 journalists by name and publication who cover music tech (not just "Music Ally" as a brand — specific people). Write one paragraph of the founder story in James's voice. Write the press kit (Google Doc, not designed). Save it. Then wait until Phase 2 success criteria are met before sending anything.

---

## Dimension 6 — Phase 3 (public launch)
**Score: 3/10**

### Current state
- Phase 3 is described in SPEC.md: 200 artists, 5,000 fans, 50 paid upgrades, press coverage
- Producer seeding programme mentioned but not fully operationalised
- Product Hunt launch mentioned but not planned
- Paid acquisition plan: none. No budget. No channel. No test.

### What "no paid acquisition plan" means
At 200+ artists, organic growth through word-of-mouth and "Made with ABLE" footers may not be sufficient. Producer seeding (see below) is the highest-leverage zero-cash-cost channel. After that, the options are:
- Reddit community presence (zero cost, high effort)
- TikTok / Instagram organic (zero cost, high effort)
- Press coverage (zero cost if earned)
- Paid acquisition (Meta/Google ads — budget required, not planned)

Phase 3 does not need a paid acquisition plan on Day 1. It needs one before MRR reaches £2,000/month, because organic-only growth has a ceiling. That ceiling is somewhere between 200 and 500 artists.

### Score rationale
3/10 because Phase 3 is correctly deferred and the existing planning is high-level but correct in structure. The gap is that "producer seeding" is named but not a real plan with real names and real outreach. It is a concept, not a channel.

**Gap to 9:** Producer seeding fully specified (see PATH-TO-10.md). 20 named producers with warm paths and a specific outreach message. This is the single highest-ROI action for Phase 3 readiness.

---

## Summary scorecard

| Dimension | Score | Primary gap |
|---|---|---|
| Pre-launch preparation | 4/10 | Legal entity, privacy policy, domain not deployed |
| Soft launch readiness | 6/10 | Deployment and Resend email not wired |
| First 10 artists | 7/10 | Named list not written, no outreach DM |
| First 50 artists | 5/10 | Word-of-mouth unproven — producer seeding is the bridge |
| Press / coverage | 3/10 | No journalist names, no press kit, no story written |
| Phase 3 | 3/10 | Producer seeding named but not operationalised |
| **Overall** | **~7.5/10** | Bridge from 10 to 50 is the central risk |

---

## The central honest assessment

The launch sequence is well-structured. The phase gates are specific and measurable. The onboarding approach (personal 1:1 conversations, not email blasts) is correct. The "Made with ABLE" footer as a passive growth loop is correctly prioritised.

The single weakest assumption in the entire plan is the Phase 2 transition: 10 → 50 artists on word-of-mouth alone. Every other phase has a concrete mechanism. Phase 2 depends on enthusiasm that has not yet been earned.

**Producer seeding is the fix.** One converted producer with 8 artist clients is 8 potential artists — from a single outreach. Twenty producer outreaches, at a 25% conversion rate (5 producers), each with an average of 6 artist clients = 30 additional artists. Combined with word-of-mouth from the original 10 = the 50-artist gate becomes achievable without being optimistic.

The plan goes from 7.5/10 to 9/10 with:
1. Producer seeding strategy fully operationalised (PATH-TO-10.md)
2. The press story written in James's voice (one paragraph, done)
3. The risk mitigation named: if word-of-mouth from 10 doesn't produce 40 more, producer seeding activates as the bridge — not as a Plan B scramble, but as a planned Phase 2 channel
