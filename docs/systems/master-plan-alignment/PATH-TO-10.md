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
