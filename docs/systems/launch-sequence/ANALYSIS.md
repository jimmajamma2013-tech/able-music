# ABLE — Launch Readiness Analysis
**Created: 2026-03-16 | Current score: 4/10**

> This is not a criticism. It is a calibration. The product is nearly specced. The launch strategy is not. These are different problems with different solutions. This document scores each dimension honestly so you know exactly what to build next.

---

## Scoring framework

Each dimension is scored 0–10.
- 0–3: unaddressed, significant risk
- 4–6: partially addressed, known gaps
- 7–8: solid, minor gaps
- 9–10: production-ready, no blockers

---

## Dimension 1 — Product completeness
**Score: 6/10**

### What's specced
- able-v7.html: profile spec at 9.7/10, active development
- admin.html: dashboard spec at 9.7/10, active development
- start.html: onboarding spec at 9.9/10, active development
- landing.html: marketing page spec at 9.65/10, active development
- All 4 campaign states (profile / pre-release / live / gig) fully specced
- 30+ micro-interactions specced
- Design system (7 vibes × 4 themes × 4 feel quadrants) specced

### What's not yet built
- Supabase auth + read path (deferred to Phase 2)
- fan.html (in progress, spec in progress)
- Email broadcasts (Artist Pro tier)
- Custom domains
- Freelancer profiles (Phase 2)
- Stripe payments for support packs (Phase 2)
- Skeleton loading states (deferred)

### What this means for launch
V1 can launch without Supabase — localStorage is sufficient for a private beta of 10 artists. The missing pages (fan.html, freelancer.html) are not required for the 10-artist private beta. The product is close to launch-ready for Phase 1. It is not ready for a public launch without Supabase.

**Gap to 10:** Ship able-v7.html + admin.html + start.html to a state where one real artist can complete the full flow end-to-end without help. That is the V1 bar.

---

## Dimension 2 — First artist pipeline
**Score: 2/10**

### Current state
No list exists. No criteria defined. No outreach started.

### What's needed
A named list of 10 artists who:
- James knows personally or has a warm path to
- Are actively gigging or releasing
- Have a social presence (any platform)
- Cover at least 3 different genres (validates the vibe system)
- Will give honest, direct feedback
- Are not so famous that they can't be reached by James directly

### Why this is critical
Private beta without a real named list is just an intention. The list makes it real. The list is also the first test of the product — if James can't convince 10 people he knows personally, the product's value proposition needs more work.

**Gap to 10:** PATH-TO-10.md contains the specific steps. Named list = score 8. Live pages from all 10 = score 10.

---

## Dimension 3 — Day 1 content (founder's page)
**Score: 1/10**

### Current state
No founder artist page exists. James has not created his own ABLE page.

### Why this matters more than anything else
James is building a tool for artists. If he cannot create his own compelling artist page, he cannot show the product to anyone with credibility. The founder's page is:
- The live demo (share the URL, not a video)
- The proof that the product works
- The first test of the onboarding flow
- The personal stake that makes the pitch genuine

### What "compelling" means here
Not a placeholder. A real page: real name, real music or creative work, real bio, real shows if any, real CTAs. Designed with intention. Proof that the identity system produces something worth showing.

**Gap to 10:** James creates his own ABLE page before any outreach begins. This is Day 0, not Day 1.

---

## Dimension 4 — Referral mechanism
**Score: 3/10**

### Current state
The "Made with ABLE" footer is specced as the organic growth loop for free tier. The affiliate/referral programme is defined in MASTER.md but not specced as a system. No referral link generation exists. No tracking infrastructure for referral attribution is built.

### What's specced
- "Made with ABLE" footer on free tier profiles
- Affiliate loop described: 1 month free per referred artist who converts
- Producer seeding programme described (free Artist Pro for life, in exchange for featuring ABLE)

### What's missing
- Referral link generation (unique URL per artist)
- Referral attribution in analytics
- Referral tracking in Supabase (when backend lands)
- Copy and UI for the referral prompt (where/when does the artist see it?)
- Confirmation flow when a referred artist signs up

### For Phase 1 (before referral system is built)
The referral mechanism for private beta is personal — James invites each artist personally. No system needed yet. But the "Made with ABLE" footer must be on every profile from day one, because that is the passive loop that compounds.

**Gap to 10:** Full referral spec (see SPEC.md). Build the link generation before public launch.

---

## Dimension 5 — Distribution channels
**Score: 2/10**

### Current state
Channels are described in MASTER.md (§9) and GROWTH_STRATEGY.md but nothing is live, nothing is tested, no posts written, no communities identified.

### Channels available now (zero cost)
- James's own social following (music-adjacent audience — unknown size, assumed meaningful)
- James's personal network of artists (the private beta list is this channel activated)
- Reddit: r/WeAreTheMusicMakers, r/musicproduction (organic, not promotional)
- Music Discord communities (listed in GROWTH_STRATEGY.md)
- The founder story: 44-year-old with a herniated disk, building a music platform with AI agents. This is a genuine, compelling human story.

### Channels for Phase 2 (soft launch)
- TikTok organic: "here's what I built" format
- Music press: Music Ally Sandbox pitch (GROWTH_STRATEGY.md)
- Producer seeding: 20 producers, free Artist Pro (highest-ROI channel per MASTER.md §9)

### What's missing
- James's "here's what I built" post (written, not posted)
- His social handle/audience size assessed
- Community participation started (you need to be a known voice before you post about ABLE)

**Gap to 10:** Start posting in communities before you need them. Be a helpful presence first.

---

## Dimension 6 — Feedback loop
**Score: 3/10**

### Current state
No feedback mechanism exists. The plan is described (short weekly voice note from each artist) but not operationalised. No feedback template. No channel for quick bug reports. No way for artists to flag issues without James's direct intervention.

### What's needed for private beta
- A simple channel (WhatsApp group or Discord) where the 10 beta artists can report bugs and friction in real time
- A weekly prompt: "What broke? What worked? What did you wish was different?"
- James's commitment to respond within 24 hours to every piece of feedback
- A system to log feedback and track which items get shipped (closes the loop, builds trust)

### Why speed matters here
The gap between "artist reports friction" and "friction is fixed" is the single biggest factor in whether beta artists become advocates or go quiet. Fix bugs within 48 hours in private beta. Acknowledge within 4 hours.

**Gap to 10:** WhatsApp group created before first beta artist is onboarded. Feedback template written. Fix turnaround target set and communicated.

---

## Dimension 7 — Support readiness
**Score: 1/10**

### Current state
No support infrastructure exists. If something breaks on Day 1, the only support channel is James's phone number (effectively).

### What "Day 1 support" means at 10-artist scale
At 10 artists, this is personal. James is the support. The bar is: James can fix any issue reported in the beta within 48 hours. This requires:
- Knowing exactly what breaks (error logging or at least a way for artists to describe the issue)
- Having a clear fix path for the most likely failure modes
- Being available enough to respond

### Most likely Day 1 failures
1. Onboarding flow breaks on a specific phone/browser (mobile testing is the fix)
2. Data not persisting between sessions (localStorage scoping issue)
3. A CTA not saving correctly
4. The page not looking right on a specific screen size (test 375px, 390px, 430px minimum)
5. Gig mode not auto-deactivating at midnight

### For Phase 2 and beyond
A simple FAQ page or in-product help text reduces support volume significantly. Not needed for private beta.

**Gap to 10:** Playwright smoke test suite covering all critical paths. Run before any artist onboards.

---

## Dimension 8 — Success criteria
**Score: 3/10**

### Current state
Broad milestones exist in MASTER.md (10 artists → £5k MRR → job exit) but granular, phase-specific success criteria are not defined. Without criteria, you don't know when to move from Phase 0 to Phase 1, or Phase 1 to Phase 2.

### What clear success looks like at each phase

**Phase 0 (complete when):**
- James's own page is live and genuinely compelling
- End-to-end flow tested: onboarding → live page → admin → fan sign-up
- Named list of 10 beta artists exists
- No P0 bugs (show-stopping, data-loss, or security issues)

**Phase 1 — private beta (complete when):**
- All 10 beta artists have live pages
- At least 100 real fan sign-ups across all pages
- At least 1 artist has set a campaign state (pre-release, live, or gig)
- NPS from beta artists: ≥7/10 average
- No artist has abandoned the platform due to a bug

**Phase 2 — soft launch (complete when):**
- 50 live pages
- 500 real fan sign-ups across platform
- At least 1 paid tier upgrade (proves willingness to pay)
- "Made with ABLE" footer generating inbound sign-ups (measurable)

**Phase 3 — public launch (complete when):**
- 10 artists using the platform consistently (weekly logins)
- Upgrade conversion from free to paid is measurable and positive
- Media coverage in at least 1 music publication
- MRR > £500

**Gap to 10:** These criteria are now written. The gap is wiring them to a visible tracker that James can check weekly. A simple document is sufficient — not a tool.

---

## Summary scorecard

| Dimension | Score | Primary gap |
|---|---|---|
| Product completeness | 6/10 | Supabase not built; V1 sufficient for private beta |
| First artist pipeline | 2/10 | No named list |
| Day 1 content | 1/10 | No founder page |
| Referral mechanism | 3/10 | "Made with ABLE" footer not yet live |
| Distribution channels | 2/10 | No posts written, no communities warmed up |
| Feedback loop | 3/10 | No channel set up, no template |
| Support readiness | 1/10 | No smoke test suite, no fix runbook |
| Success criteria | 3/10 | Defined here, not tracked |
| **Overall** | **~4/10** | Launch strategy is the primary gap, not the product |

---

## The honest assessment

The product will be good enough to show to 10 real artists before Supabase is built. The launch strategy — the pipeline, the founder's page, the feedback channel, the criteria — is what is missing. These are each 1–3 days of work. The product has had months of specification work. Invest proportionately.

The highest-leverage thing James can do right now, before writing another line of product spec, is create his own ABLE page and name the 10 artists he's inviting first.
