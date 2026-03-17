# ABLE — Founder Roadmap Final Review
**Written: 2026-03-16 | Reviews: ANALYSIS.md + 500-STEPS.md + PATH-TO-10.md**

> A scored, honest review of the roadmap itself. Does it cover everything? Is it executable? Is it honest? Read this before using the roadmap to verify you trust the plan you are working from.

---

## Review Methodology

Six dimensions, scored out of 10 with specific evidence for each score. Where the score is below 9, specific gaps are identified and flagged.

---

## Score 1: Completeness — 9/10

**What is covered:**
- Legal / company formation (steps 1–20): complete. Every required action is named with the correct UK-specific detail (Companies House, ICO, SIC code, VAT threshold, sole trader vs Ltd).
- Backend integration (steps 21–55): complete. Supabase table structure, RLS policies, auth flow, fan capture write path, artist profile URL system — all covered at the right level of specificity.
- Product bugs and polish (steps 76–145): the known P0 issues from STATUS.md and CONTEXT.md are named and addressed specifically. OG cards, hardcoded colours, toast inconsistency, data architecture bug — all present.
- Artist acquisition (steps 151–235): covers warm outreach, extended network, personalised vs templated DMs, onboarding friction tracking, feedback loops.
- Fan flywheel (steps 196–235): covers activation mechanics, email delivery, milestone triggers, fan count milestones, artist behaviour change.
- Monetisation (steps 246–280): full Stripe Checkout integration, webhook handling, subscription management, paid tier gates, pricing page.
- Investor readiness (steps 301–390): covers one-pager, pitch narrative, investor identification, traction documentation, go/no-go decision.
- Growth mechanics (steps 281–330): scale outreach, PWA, partnerships, referral tracking, competitive monitoring.
- Personal health and sustainability (steps 71–75, 336–340, 451–460): embedded across the sprint, not relegated to the end.
- Financial practices (steps 461–470): company accounting, HMRC basics, runway calculation, job exit criteria.
- Retrospective and V2 planning (steps 341–400): full retrospective structure, product review, financial review, investor evidence.
- Developer and security hygiene (steps 401–440): Supabase indexes, RLS review, MFA, CSP headers, email deliverability.
- Accessibility (steps 493–498): basic audit and fixes included.

**What is not covered (the 1-point gap):**
- **Freelancer journey** (freelancer.html): explicitly marked as Phase 2 / 0/10 in STATUS.md and mentioned as a V2/V3 decision in the retrospective. But there is no specific action in 500-STEPS for making the V2/V3 call on freelancer. A specific step to review the freelancer.html spec and make a go/defer decision by week 6 would close this.
- **fan.html completion**: partially addressed (steps 357–358) but the specific P0 features of fan.html are not listed. Given that the fan side of the flywheel is critical for ABLE's differentiation from Linktree, the fan dashboard deserves at least 5–10 specific build steps.
- **Spotify import**: mentioned in STATUS.md as spec complete but function not built. Not addressed in the 500 steps. This could be a strong conversion feature for artists and deserves a step.

**Verdict:** The coverage is comprehensive across the critical path. The gaps are Phase 2 items that are correctly deferred but could be scheduled more explicitly.

---

## Score 2: Honesty — 10/10

**Assessment:**
The documents do not shy away from uncomfortable truths:
- Business structure score of 2/10 is accurate and direct, not softened to 4/10 to feel less harsh.
- The team score of 1/10 names the solo founder risk without hedging it as a "for now" situation.
- The velocity gap (5/10) names the documentation-over-execution pattern explicitly, including naming documentation itself as a possible procrastination mechanism.
- The commercial instinct gap (6/10) acknowledges that willingness-to-pay has not been validated — it does not assume the pricing model is correct.
- The health section is not performative ("remember to take breaks!") — it is specific about the C5/C6 medical situation and names the physiotherapy appointment as the single most deferred item.
- The failure log concept (step 458) asks for an honest record of what does not work, not just a progress tracker.
- PATH-TO-10 names the "planning as procrastination" pattern directly and sets a hard rule (no new docs for 14 days) rather than just acknowledging the pattern.

The ANALYSIS.md section "What James Is Actually Good At" avoids false modesty while not being hagiographic. It names specific genuine strengths (product taste, copy, systems thinking) with specific evidence.

**Verdict:** No softening, no false encouragement, no metrics inflated for comfort. The honesty standard set in CLAUDE.md (copy philosophy, no sycophancy) is upheld throughout.

---

## Score 3: Specificity — 9/10

**What makes it specific:**
- Every legal step includes the specific URL (companies house, ICO registration), cost (£12, £40), and time estimate where relevant.
- Supabase steps include specific column names, types, and RLS policy logic — not "set up the database", but "add index on fans.artist_id".
- Artist acquisition steps include specific DM framing — the exact message approach, not "reach out to artists".
- The email delivery steps include specific test providers (Gmail, Outlook, Apple Mail) and specific DNS records (SPF, DKIM, DMARC).
- The Stripe integration steps include the specific test card number (4242 4242 4242 4242) and specific Stripe event names (`checkout.session.completed`, `customer.subscription.deleted`).
- Performance steps include specific targets (Lighthouse ≥ 80, ≥ 44px tap targets).
- The job exit trigger is a specific number with a specific calculation (£5,000 MRR = ~555 artists at £9/mo average).

**The 1-point gap:**
- Some steps in the growth section (steps 281–290) are less specific than the infrastructure steps. "DM 20 more artists" is actionable but does not specify the targeting criteria or the specific message approach as carefully as the early artist steps did. This is partly appropriate — you should not script outreach — but a few more guardrails on the targeting criteria would strengthen these steps.
- The investor identification steps (305–307) name the approach (warm intro paths) but do not provide a starting list of UK music tech investors. A 3–5 name starting list would make the step immediately actionable rather than requiring research before the action begins.

**Verdict:** Above average specificity for a founder roadmap. The gaps are minor and concentrated in the scale-up phase where some strategic flexibility is appropriate.

---

## Score 4: Sequencing Logic — 9/10

**Why the sequence works:**
- Legal/company formation before any real user onboarding: correct. You cannot collect fan data, charge money, or describe yourself as a business without this.
- Supabase auth before artist acquisition: correct. The product is not shippable to real users without the write path.
- Bug fixes and Playwright tests before declaring V1 complete: correct. Known P0 issues cannot be deferred past the first real users.
- Artist acquisition (10 artists) before fan flywheel activation: correct. You cannot have a fan flywheel without artists who are actively promoting their links.
- Monetisation (Stripe integration) before aggressively scaling to 25 artists: correct. You learn willingness to pay from the first cohort, then apply that learning to the second cohort's conversion.
- Investor readiness in weeks 11–12 rather than weeks 1–2: correct. Investors want traction, not a plan. The plan is what you have now. Traction is what weeks 1–10 generate.
- Retrospective as the final phase: correct. The 90-day sprint is not an endpoint — it is the first data point for the second sprint.
- Health protocol in week 1, not as an afterthought: correct. Embedding it early is the only way it becomes a practice rather than a recovery intervention.

**The 1-point gap:**
- Steps 401–500 (the "parallel" steps) contain some items that are actually sequenced-critical and should have explicit placement in the weekly schedule rather than being in an open-ended parallel list. Specifically: Resend email infrastructure (steps 421–430) should be explicitly tied to week 5 (before artist acquisition ramps up), and the Supabase index additions (steps 434–437) should be in week 3 alongside the database setup. Moving these to explicit week placements would tighten the sequencing.
- The fan.html build is deferred too vaguely. The fan dashboard is part of the core product loop. A specific week to review and build V1 of fan.html should be named.

**Verdict:** Sequencing is sound and reflects real founder priorities. The parallel steps section needs tighter integration with the weekly schedule.

---

## Score 5: Health Integration — 8/10

**What is present:**
- Week 1–2 health baseline: physiotherapy appointment, screen limits, focus blocks, standing desk, weekly review ritual.
- Week 11–12 health check: physiotherapy follow-up, sleep audit, focus block adherence check, mandatory days off, personal reflection note.
- Parallel health steps 451–460: Sunday review ritual, daily single-task habit, peer founder check-in, failure log, monthly founder memoir, procrastination protocol, metrics timing rule.
- Energy system framing in PATH-TO-10: identifies energy drains and restorers, treats them as maintenance rather than rewards.

**The 2-point gap:**
- Physical health is addressed at week 1 and week 11 but not at weeks 3, 5, 7, and 9. A brief health check-in step should appear every 2 weeks throughout the roadmap — not as a lengthy protocol, but as a single question: "How is your body doing? Any C5/C6 symptoms? Sleep consistent? Energy level?"
- The employment context adds cognitive load that the roadmap underweights. The context-switching between full-time job and startup work is the single largest energy drain for an employed founder. The roadmap could include a specific protocol for managing this: for example, a hard rule about not checking ABLE tasks during job hours, and not checking job-related things during ABLE focus blocks. The cognitive cost of blending these contexts is significant and worth addressing explicitly.
- There is no step for connecting with a physiotherapist or sports medicine professional who understands the demands of extended computer work. The C5/C6 situation is not something to self-manage with generic advice — a specific professional relationship is worth establishing in the first 30 days.

**Verdict:** Health is more integrated than in most founder roadmaps, which typically either ignore it or include it as a box-ticking afterthought. The gaps are in the mid-sprint frequency of health check-ins and in the employment context management.

---

## Score 6: Financial Realism — 9/10

**What is realistic:**
- The job exit trigger calculation (£5,000 MRR = ~555 artists at £9/mo) is mathematically sound and appropriately does not suggest this is achievable in 90 days.
- The 90-day financial targets are modest: the first £27 MRR (3 paying artists) is framed as signal, not revenue. This is correct — it is not financial freedom, it is proof of concept.
- The runway calculation approach (company costs ÷ cash) is the correct framework for a bootstrapped founder.
- The VAT registration guidance (note the threshold, revisit when MRR approaches £7,500/month) is accurate UK-specific advice.
- The cost accounting is honest: £40 ICO, £9/mo Fathom, Stripe fees at 1.4% + 20p. These are real numbers.
- The salary progression (£500/month at £500 MRR, full overheads at £5,000 MRR) is sensible milestone-based thinking.
- The investor raise vs default-alive decision framework is honest: it does not presuppose a raise, it frames the decision as a choice with consequences.

**The 1-point gap:**
- The £1M ARR goal (from the user brief) is not explicitly addressed in the roadmap timeline. The 90-day plan correctly focuses on the first £50 MRR. But the gap from £50 MRR to £1M ARR (~£83,000/month) is enormous and there is no bridging narrative between the 90-day plan and the longer-horizon goal. A single "what does the growth model look like from here to £1M ARR" section — even a rough one — would give James a reality check on the timeline and the growth rate required.
- The Stripe fee impact on effective MRR is mentioned but not modelled. At scale, 1.4% + 20p per transaction on a £9 subscription is approximately £0.33/transaction, reducing the effective monthly per-artist revenue to ~£8.67. Not significant at 10 artists but worth modelling at 500 artists.

**Verdict:** Financially grounded. Does not overclaim on growth trajectory. Does not create false urgency by connecting short-term numbers to long-term goals unrealistically.

---

## Overall Scorecard

| Dimension | Score | Primary Gap |
|---|---|---|
| Completeness | 9/10 | fan.html and freelancer.html decision points underspecified |
| Honesty | 10/10 | No softening found |
| Specificity | 9/10 | Scale-up steps less specific than foundation steps |
| Sequencing logic | 9/10 | Parallel steps need tighter week integration |
| Health integration | 8/10 | Mid-sprint health checks missing, employment load underweighted |
| Financial realism | 9/10 | £1M ARR bridge narrative absent |
| **Overall** | **9/10** | **Highly executable, minor gaps in scope and sustainability** |

---

## Is This Roadmap Honest?

Yes. It is honest about the business structure gap (2/10). It is honest about the velocity problem (documentation over shipping). It is honest about the team gap (solo founder, no advisors). It is honest about commercial instinct being unvalidated. It does not claim the product is more ready than it is. It does not claim the market is larger than it needs to be at this stage.

## Is This Roadmap Executable?

Yes, by a focused solo founder with 2 focus blocks per day and approximately 3–4 hours of ABLE time daily. The 500 steps across 91 days is approximately 5–6 steps per day on average. Some steps take 5 minutes (DM an artist), some take 3 hours (build the Stripe webhook). The average time per step is approximately 30–45 minutes. This is achievable.

## Is This the Right Plan?

The highest-risk assumption in the plan is artist willingness to pay £9/month. Everything else — the legal structure, the backend integration, the fan flywheel — is load-bearing but recoverable. If artist acquisition goes well but conversion to paid is zero, the entire revenue model needs rethinking. The earliest this assumption can be tested is week 9–10. If you get to week 9 with 10 active artists and none of them convert despite a direct ask, treat that as a strong signal and run the willingness-to-pay discovery process before proceeding to weeks 11–12.

The second-highest-risk assumption is that the campaign-moment system (pre-release / live / gig / profile) is what artists will value most about ABLE. It is the differentiator. But if artists' primary pain point turns out to be something simpler (e.g., "I just want a page that looks better than Linktree") then the sophistication of the state system may be over-engineering for the first cohort. Remain open to this signal in weeks 5–6.

## What To Do With This Document

Read this after reading ANALYSIS.md and before starting 500-STEPS.md. Use it to calibrate your confidence in the plan. If the overall score were lower (below 7/10), you would want to question the plan before executing it. At 9/10, the plan is sound. The risks are named. The assumptions are testable. Execute it.

---

*The best review of any roadmap is whether you are still following it in week 6. Check back then.*
