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
