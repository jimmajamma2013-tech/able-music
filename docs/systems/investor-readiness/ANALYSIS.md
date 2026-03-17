# ABLE — Investor Readiness System Analysis
**Date: 2026-03-16**
**Author: Assessment of INVESTOR-READINESS.md, PATH-TO-10.md, FINAL-REVIEW.md**
**Stage: Pre-revenue, pre-traction — spec complete, execution at 2/10**

---

## Current State Assessment

ABLE's investor readiness system is split clearly between specification quality (10/10 per FINAL-REVIEW.md) and operational execution (2/10 by the same review). This is the most honest gap statement in any of the 10 systems: the framework is complete and correct; the data that makes it real does not exist yet.

The system covers 12 SaaS metrics with calculation methods, benchmarks, and data sources. It specifies a three-tier data room with file naming conventions. It provides a five-segment demo script with setup requirements and narration rules. It includes a one-page metrics summary template, a monthly investor update template, a pre-meeting checklist, and a financial model structure.

None of these materials are populated with real data. This is appropriate — inventing traction would be worse than admitting the absence of it. The correct state is "framework ready, data pending first customers."

The FINAL-REVIEW.md identifies the demo video as the most underprepared element and the most likely to remain deprioritised. This finding is correct and important: for a visual, mobile-first product with a strong design system, the demo is the proof. Text-based metrics can approximate product quality; a clean 4-minute demo of real fan data in the admin view cannot be faked or summarised.

**What exists and is correct:**
- 12-metric framework with calculation, source, and benchmark for each
- One-page metrics summary template (ready to fill in)
- Three-tier data room structure (folder names, file naming, sharing protocol)
- Financial model structure (conservative/base/optimistic, 12-month projections)
- Five-segment demo script with setup requirements
- Press pack structure (three proof points, journalist Q&A template)
- Monthly investor update template (200-word format, rules)
- Pre-meeting checklist (48 hours / day-of / during / after)
- Four milestone gates (Pre-Gate 1 → Gate 4: active raise) with specific trigger criteria
- Cross-document consistency with INVESTOR-STRATEGY.md (verified in FINAL-REVIEW.md)

**What does not yet exist:**
- Any real MRR
- Any real artist count
- Any free-to-paid conversion data
- Any churn data
- Any NPS responses
- Supabase live with real user sign-ups
- PostHog with real attribution data
- The financial model spreadsheet
- The Google Drive data room folder
- The demo video
- The 15-person pre-raise investor list
- The first monthly investor update email

---

## 20-Angle Scoring

### 1. Metric Selection and Framework Quality (1–10)
**Score: 10**

The 12 metrics (MRR, MRR growth rate, artist count, free-to-paid conversion, monthly churn, ARPU, CAC, LTV, LTV:CAC, NPS, fan capture rate, 90-day retention) are the correct 12 for a consumer-facing music SaaS at pre-seed stage. Each is specified with:
- Calculation method (exact formula, not a vague description)
- Data source (Stripe, Supabase, PostHog, Tally.so — specific systems, not "our analytics")
- Benchmark (pre-seed floor, strong signal, Series A territory — three-tier benchmarking)

The inclusion of fan capture rate (percentage of ABLE page visitors who sign up as fans) as a product metric alongside the standard SaaS metrics is correct — this is the product's unique value proposition in metric form. If fan capture rate is 8%+, the product is working. If it is below 4%, the product is not delivering value regardless of what MRR says.

The benchmarks are realistic rather than aspirational: free-to-paid conversion "strong at 12%+" rather than claiming SaaS averages (which vary widely and are often inflated in founder decks).

### 2. One-Page Metrics Summary Design (1–10)
**Score: 9**

The one-page template is correctly designed for investor consumption: date, headline metric (MRR), table of all 12 metrics with current value, benchmark, and a "STRONGEST METRIC / WEAKEST METRIC" section at the bottom.

The inclusion of "MY WEAKEST METRIC RIGHT NOW" as a required field is the most distinctive element. This forces honest self-assessment and pre-arms James for the question that separates credible founders from optimistic ones. An investor who sees a pre-filled "weakest metric" field with a specific answer and a one-sentence response plan is more likely to trust the rest of the document.

Gap: the template doesn't specify the distribution format. A PDF (static, professional) vs. a shared Google Doc (updateable, shows version history) has different implications for how investors interact with it. For Tier 1 data room (immediate access), PDF is correct — it is a snapshot, not a live document.

### 3. Data Room Architecture (1–10)
**Score: 10**

The three-tier structure (Tier 1: immediate → Tier 2: after first meeting → Tier 3: under NDA) correctly sequences information disclosure to match investor trust building. Tier 1 materials (overview, metrics, demo video, team bio) require no commitment from the investor. Tier 2 materials (financial model, market sizing, competitive landscape) are shared after a first meeting signals genuine interest. Tier 3 materials (Supabase schema, cohort analysis, cap table) require NDA signature.

The NDA guidance is correctly cautious: "get a UK-standard NDA from a solicitor (~£200), not from the internet." This is one of those places where £200 in professional advice prevents the kind of IP or data disclosure mistake that cannot be undone.

The file naming convention (dated PDFs, consistent naming across tiers) prevents the investor experience of "I received 7 attachments with names like 'ABLE_v3_FINAL_FINAL.pdf'" — which signals disorganisation.

### 4. Financial Model Specification (1–10)
**Score: 8**

The financial model structure is correctly specified: three scenario tabs (conservative/base/optimistic), 12-month monthly projections, linked inputs (Stripe MRR updated monthly), summary tab with key milestones, actuals-vs-model tab once real data flows.

The rule "never share a financial model you can't defend every cell of" is essential and correctly positioned as a principle before the structure. An investor who asks "why did you assume 8% free-to-paid conversion?" needs a specific answer ("based on Category X SaaS benchmarks for indie creator tools at this price point") not "that's what the spreadsheet uses."

Gap (noted in FINAL-REVIEW.md): the model must be built in a spreadsheet before any investor meeting. It is currently specified but not created. For a solo founder who may not be a spreadsheet expert, building a 3-scenario 12-month model with locked formula cells and an actuals comparison tab is a meaningful technical task. The spec should include the specific Google Sheets structure (named ranges, column headers, formula patterns) to reduce the build time from "several days" to "several hours."

### 5. Demo Script Quality (1–10)
**Score: 10**

The five-segment demo script is the most operationally specific section in the entire document:

- Segment 1 (Problem, 30 sec): "Open the artist's current Linktree..."
- Segment 2 (The ABLE artist profile, 90 sec): artist profile in pre-release state, accent colour, fan sign-up, "that email address is now owned by this artist forever..."
- Segment 3 (Campaign state switching, 60 sec): live demo of state switch, gig mode, countdown
- Segment 4 (The admin dashboard, 60 sec): fan list, analytics, who signed up at the show
- Segment 5 (The fan perspective, 60 sec): show the fan's experience

The narration rules are specific: "never say 'and here you can see that' — that's the death phrase. Say what matters, not what's visible." This is the kind of demo coaching that typically only comes from watching 10 failed demos.

The prerequisite requirement (real fan data in the admin before recording) is correctly specified. A demo with placeholder content is weaker than a demo with 47 real fan sign-ups.

### 6. Press Pack Specification (1–10)
**Score: 7**

The press pack structure (three proof points, boilerplate about ABLE, journalist Q&A template) is correctly scoped. The three proof points (product traction metric, artist quote, data story) are the right categories.

Gap: the three proof points are currently placeholders. The product traction metric ("ABLE artists capture X% of their page visitors as email subscribers...") requires real data. The artist quote requires a real artist who has used the product and can be quoted. The data story ("ABLE artists across X cities have captured Y fan emails...") requires production users.

More importantly: the press pack shouldn't exist as a document until there's something to announce. A press pack at pre-launch with placeholder metrics signals that James is preparing to announce something that hasn't happened yet. The correct sequence: build the press pack as real proof points become available, not as a template to be filled in later.

### 7. Investor Update Template Quality (1–10)
**Score: 9**

The 200-word format for monthly investor updates is correctly constrained. Shorter means the investor reads it. Longer means they skim or skip it. The five-section structure (MRR and key metric, what happened this month, what's changing, what we need, when is the right time to talk) is complete without being formulaic.

The instruction to "start sending even before the first paying customer" is the most important operational note in the section. The first update can be "Product is live. First outreach is underway. No paying customers yet — here's what I'm watching." This establishes the rhythm and the credibility of transparency before James has impressive numbers to share.

Gap: the template doesn't address reply management. What does James do when an investor replies with advice, a question, or an introduction offer? A brief "how to handle investor update replies" note would close this gap — the update is not a one-way broadcast, it is the start of a conversation.

### 8. Pre-Meeting Checklist Design (1–10)
**Score: 10**

The pre-meeting checklist (48 hours before / day-of / during / after) is operationally complete:
- 48 hours: refresh data room, test demo on mobile, identify weakest metric and prepare response
- Day-of: confirm meeting details, charge devices, know the investor's portfolio
- During: lead with metrics not story, listen more than pitch, ask about timeline and decision process
- After: thank you within 24 hours, send any requested materials within 48 hours, log notes while memory is fresh

The instruction to "know the investor's portfolio before the meeting" prevents the obvious mistakes (pitching a founder who invested in a direct competitor without acknowledging it, failing to reference a relevant portfolio company when explaining ABLE's market position).

### 9. Milestone Gate Clarity (1–10)
**Score: 10**

The four-gate framework (Pre-Gate 1 → Gate 4: active raise) is the clearest decision framework in the system:

- Pre-Gate 1: product live, no customers — "not yet"
- Gate 1: 10 paying artists, Stripe live — "can talk to anyone with real MRR"
- Gate 2: 50 paying artists, NPS from 20 responses — "pre-seed conversation territory"
- Gate 3: 100 paying artists, NPS 35+, churn <6%, one channel <£20 CAC — "raise-ready"
- Gate 4: 200+ paying artists, 3+ months trend data, data room complete — "active raise"

These gates prevent premature fundraising. An early conversation with a sophisticated investor at Pre-Gate 1 typically wastes both parties' time and can create a "no" on record before the product has traction. The gates are the mechanism that prevents this.

### 10. Cross-Document Consistency (1–10)
**Score: 10**

FINAL-REVIEW.md includes a 3-table cross-document consistency check against INVESTOR-STRATEGY.md, ABLE_STRATEGY.md, and CLAUDE.md/CONTEXT.md. Every cross-reference is verified as consistent:
- Raise trigger criteria match between docs (100 paying artists, NPS 35+, sub-6% churn)
- ARPU assumption consistent (£12/mo blended)
- Supabase project URL correctly referenced
- Tier pricing used correctly (Free/£9/£19/£49)
- Copy philosophy maintained (no exclamation marks, no SaaS jargon)

This level of cross-document verification is unusual and valuable. It prevents the common problem of a system that is internally excellent but contradicts other systems in the stack.

### 11. Metrics Execution Sequencing (1–10)
**Score: 9**

The PATH-TO-10.md 10-step action plan is correctly sequenced:
1. Stripe live + first paying customers (unlocks most metrics)
2. Supabase live + attribution tracking (unlocks fan capture rate, source attribution)
3. NPS survey setup (10-minute Tally.so build — no excuse to delay)
4. One-page metrics summary document (built monthly from Step 1 data)
5. Google Drive data room (folder structure first, contents follow)
6. Demo video (after 5 real artists, re-record with real data at 30 artists)
7. Pre-raise investor list (15 names, start this week)
8. Financial model spreadsheet (before any investor conversation)
9. Monthly investor update process (start immediately, even pre-revenue)
10. NDA and data room sharing process (one-page NDA from solicitor)

Each step includes "what" and "how" — not just intentions. Step 2 (Supabase attribution) even includes a specific test: "visit a profile via `?utm_source=instagram`, sign up as fan, verify attribution in Supabase."

### 12. Demo Video Prioritisation (1–10)
**Score: 7**

FINAL-REVIEW.md identifies the demo video as "the hardest thing to do well and the thing most founders deprioritise." The spec correctly states: "a mediocre deck with a great demo is better than a great deck with a mediocre demo."

For ABLE specifically, this observation is particularly true: ABLE is a visual, mobile-first product with a strong design system. An investor who watches a clean demo of an artist profile shifting from pre-release → live → gig mode, then sees 40 real fan emails in the admin, has understood the product better than any text description can achieve.

The prerequisites are correctly specified (real artist profile, real fan data, mobile viewport simulation). The update cadence (fresh every 4–6 weeks as the product evolves) is correct — a demo video from 3 months ago that shows features that have since been redesigned creates confusion in investor meetings.

Gap: the spec doesn't provide the specific screen recording tools to use (QuickTime Player + ScreenFlow for high-quality screen recording, DaVinci Resolve for light editing, Loom for easy private sharing). A solo founder who has never produced a professional screen recording demo video needs these tool recommendations to produce a clean result rather than an .mov file from QuickTime with no editing.

### 13. Investor Archetype Guidance (1–10)
**Score: 8**

The investor archetype criteria (understand music, can intro 5 artists, comfortable with 5–7 year timeline, don't need quick exits, transparent about portfolio) are in INVESTOR-STRATEGY.md rather than INVESTOR-READINESS.md — correctly separated (strategy vs. readiness). But the pre-meeting checklist doesn't reference these criteria when instructing James to "know the investor's portfolio."

The practical consequence: James could prepare well for a meeting (metrics sharp, demo ready) but invest time in an investor who doesn't meet the archetype criteria. A one-line cross-reference in the pre-meeting checklist ("verify investor meets the archetype criteria from INVESTOR-STRATEGY.md §7 before confirming the meeting") would close this.

### 14. Cohort Analysis Preparation (1–10)
**Score: 7**

The PATH-TO-10.md correctly identifies the most common investor question ABLE isn't ready for: "Show me 90-day cohort retention." The spec honestly states: "this requires 90 days of real users. There is no shortcut."

The plan (by the time of the first serious investor conversation, have 60 days of real user data, the earliest cohort at 75 days: "our first cohort is 75 days in and retention is tracking at 55%") is the right approach. Partial data presented honestly is more credible than projected retention curves.

What's missing: the Supabase query or PostHog report to calculate 90-day cohort retention. This is a technical preparation item — when the data exists, James needs to know how to extract the metric immediately rather than scrambling to build the analysis during a due diligence period. Add a "cohort retention query template" to the system.

### 15. NPS Infrastructure Readiness (1–10)
**Score: 8**

Tally.so NPS survey, 30-day automated trigger, Google Sheet tracking — this is the correct minimal infrastructure for NPS at pre-seed stage. The survey itself is a single question ("On a scale of 0–10, how likely are you to recommend ABLE to another artist?") with an optional "main reason" follow-up. Simple, standard, correctly specified.

Gap: the automation (30-day trigger after sign-up → automated email with survey link) requires the Resend email system and a Supabase function or n8n workflow to trigger. Until those are built, the spec correctly notes: "manually send to every artist at 30 days post-sign-up." The manual fallback is appropriate. The spec should specify the exact manual process (calendar reminder per artist signed up, template email to send, how to log the response).

### 16. Use of Funds Articulation (1–10)
**Score: 7**

The PATH-TO-10.md Tier 2 data room includes a "use of funds one-pager" as a required document. The content is not specified in the investor readiness system (it's specified in INVESTOR-STRATEGY.md as seed stage deployment: James's salary, one engineer, marketing budget).

The cross-reference is correct — readiness handles materials, strategy handles narrative. But the use of funds one-pager format (how to express the breakdown visually, what level of specificity is appropriate for pre-seed vs. seed) is not addressed in either document.

### 17. Traction Narrative for Zero-Traction Stage (1–10)
**Score: 8**

The spec addresses the pre-traction state honestly: "current state: ABLE is at the pre-revenue stage with a product built and ready to receive first customers." The demo-data approach (convincing-looking demo even before real users) followed by re-record with real data at 30 artists is the correct pragmatic solution.

The first monthly investor update at zero-traction ("Product is live. First outreach is underway.") establishes the narrative rhythm before there are impressive numbers to share. This is correct — investors who have been receiving updates from pre-traction have more context and patience when the traction story takes longer to develop.

Gap: the spec doesn't address what to say when an investor asks "how are you finding your first customers?" before any customers exist. This is the natural follow-up to "no customers yet." A prepared honest answer ("Direct outreach to producers who work with independent artists — I've identified 20 and I'm reaching out this week") is better than a hesitation.

### 18. Cap Table Management (1–10)
**Score: 7**

The Tier 3 data room item includes "cap table (currently: James 100%)." This is the correct current state. The spec doesn't address future dilution planning (SAFE note mechanics, option pool sizing, employee equity) because these are premature at pre-seed stage without a raise happening.

The decision to use SAFE notes (in INVESTOR-STRATEGY.md) rather than priced rounds for early funding is correctly made and noted. SAFE is the standard UK/US instrument for pre-seed investment and avoids the legal costs of a priced round.

Gap: when James has his first investor conversation at Gate 3, he should know the pre-money valuation he is willing to accept and the dilution he is willing to take. The spec says "consult a solicitor before agreeing to any term sheet" — correct. But having a clear "I will not take less than £1M pre-money at £250k investment" floor in mind before the conversation prevents being pressured into below-market terms in the moment.

### 19. Media and Press Strategy Integration (1–10)
**Score: 6**

The press pack specification is in the investor readiness system but press strategy is not — it sits elsewhere. The investor readiness system doesn't specify who the relevant press outlets are (Music Ally, Hypebot, The Trichordist are mentioned in the growth strategy), what the news angle would be for a first press mention, or how to approach these outlets.

For investor readiness specifically: a Music Ally mention or a Hypebot write-up in the period before a raise significantly improves investor confidence (industry press validates that the problem is real and ABLE's approach is credible). The press pack should be paired with a one-page "our press strategy" note explaining which outlets matter and what the news hook is.

### 20. System Completeness vs. Execution Balance (1–10)
**Score: 8**

The FINAL-REVIEW.md is explicit about the spec/execution gap: "10/10 spec, 2/10 execution." This honest framing prevents the trap of confusing having a good plan with being ready to raise. The document knows its own limitation.

The recommended next actions are correctly prioritised:
1. Get Stripe live in production
2. Deploy to Netlify (production URL)
3. Record the demo video (even with demo data first)
4. Set up Tally.so NPS survey
5. Start the investor update email
6. Build Google Drive data room folder structure
7. Build financial model spreadsheet

Each of these takes James from "framework ready" to "materials exist." Without executing these 7 items, the investor readiness system score stays at 2/10 execution regardless of how thorough the spec is.

---

## Gap Summary

| Gap | Severity | When to address |
|---|---|---|
| No real MRR or any traction metrics | Critical | After Stripe live + first customers |
| Demo video not produced | High | After 5 real artists exist with fan data |
| Financial model spreadsheet not built | High | Before first investor conversation |
| Google Drive data room not created | Medium | Before Gate 1 (10 paying artists) |
| Pre-raise investor list not started | High | This week — 5 names minimum |
| First monthly investor update not sent | High | This month — even pre-revenue |
| NPS survey not created | Medium | 10-minute task — do this week |
| Cohort retention query template missing | Medium | Before due diligence period |
| Use of funds format not specified | Low | Before Gate 3 preparation |
| Demo video production tools not specified | Low | Before first recording attempt |

---

## Competitive Context

ABLE's investor readiness system is stronger than most pre-seed companies at equivalent stage, primarily because it was built with full awareness of what investors actually need rather than what founders think investors want.

**Common pre-seed investor readiness failure modes ABLE has avoided:**
- Inflated TAM claims (ABLE uses PRS/IFPI data, builds from UK SAM up to global TAM)
- Projected metrics without real data (spec explicitly marks all numbers as placeholders)
- The demo video deprioritised (correctly identified as most likely to be underprepared)
- No NPS measurement plan (Tally.so setup specified with exact question and trigger timing)
- No data room (three-tier structure fully specified before needed)
- Generic pitch narrative (the data moat story — "ABLE knows which fans chose to show up" — is specific and memorable)

**What ABLE's investor readiness lacks that comparable companies at Gate 1 have:**
- Real numbers in any slot
- Social proof from paying users
- Press mentions or industry coverage
- Advisors with music industry credibility

All four will develop as the product gains traction. The infrastructure to capture and present them is ready.

---

## What "10/10" Looks Like for This System

A 10/10 investor readiness system for ABLE means:

1. **Gate 3 conditions are met:** 100 paying artists, NPS 35+, monthly churn below 6%, one acquisition channel producing artists below £20 CAC.

2. **The demo video exists and is current:** 4–5 minutes, clean screen recording of full artist journey, real fan data visible, updated within the last 6 weeks.

3. **The data room is populated:** All three tiers have real documents. The one-page metrics summary has been updated on the 1st of each of the last 3 months.

4. **The financial model is defensible:** James can explain every cell. The conservative scenario has been validated against 6 months of actuals. The base scenario is the current run rate, not a projection.

5. **The pre-raise relationship list is warm:** At least 5 of the 15 people on the list have been receiving monthly updates for 3+ months. They are not surprised when James reaches out about a raise.

6. **The cohort retention story is ready:** The first cohort (artists who joined in Month 1) has 90+ days of data. The retention number is specific. The explanation for any churn is specific.

**Current distance from 10/10:** The spec is 10/10. The execution is 2/10. The aggregate system score is approximately **4/10** — a complete, high-quality framework with no operational substance yet. This score will change rapidly once Stripe goes live and the first artists start paying.

---

*Next action: Build the pre-raise investor list this week — five names minimum. Research each one (portfolio, music background, LinkedIn, X presence). Don't send anything yet. Just know who they are. This costs zero and starts the relationship clock.*
