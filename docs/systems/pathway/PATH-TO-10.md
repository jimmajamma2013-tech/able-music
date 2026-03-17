# The Pathway — 6-Month Week-by-Week Schedule
**Created: 2026-03-16 | Updated: 2026-03-16 | Review: monthly**

> This is the execution schedule from today to the exit decision point.
> Current score: 3/10 (system exists, nothing executed).
> Target: exit trigger in view by September 2026. Decision made. Everything ready.

---

## How to use this document

Read it monthly. At each month review: mark what completed, note what slipped, update the "what if this month fails" notes with what actually happened. Do not rewrite the plan — annotate it. The gap between the plan and what happened is the most useful data you have.

The weekly actions are the minimum. If you are ahead, do not slow down.

---

## Month 1 — Legal Foundation (Mar 16 – Apr 16)

**The thesis for this month:** None of the financial preparation is possible without the legal entity. Incorporate first, everything else follows. This month is about creating the infrastructure that the business will live inside.

---

### Week 1 (Mar 16–22): Incorporate and open the business account

**Actions:**
1. Incorporate ABLE Labs Ltd at Companies House (companieshouse.gov.uk, £50, online, 24 hours). SIC code 62012 (Business and domestic software development). Use your home address as the director's service address only — do not use it as the registered office.
2. Simultaneously: engage a registered office service. Use QCF, 1st Formations, or Hoxton Mix. Budget £30–50/year. This keeps your home address off the public register. You cannot undo a public home address without a court order.
3. Once incorporation is confirmed (usually next business day): begin Starling Business account application. Requires Companies House confirmation number. Application takes 1–3 business days.
4. Calculate your actual monthly personal spend. Log into your personal bank, export 3 months of transactions, add up every outgoing. Round up. This number × 6 = your emergency fund target. Write it down.

**Milestone this week is complete when:** Companies House returns your company number and Starling application is submitted.

---

### Week 2 (Mar 23–29): Accountant and emergency fund vehicle

**Actions:**
1. Find and engage a tech-savvy UK accountant. Search criteria: understands SaaS revenue recognition, has experience with R&D tax credits, costs £1,000–1,500/year. Sources: Indie Hackers UK Slack, Accountancy Age, word of mouth from other solo founders. Ask in 2 communities this week. Have a shortlist of 3 by Friday.
2. Open a high-interest personal savings account (Marcus, Chip, or Chase UK). This is the emergency fund vehicle. Start transferring toward the target — even £500 this week is the beginning of the habit.
3. Starling account should be confirmed by now. If not, chase. Set up FreeAgent: £19/month, connect to Starling. First transaction import should auto-populate within 48 hours.
4. Begin the IP assignment process: find an IP assignment template via Genie AI or a UK solicitor. This document transfers the existing ABLE codebase, domains, and brand assets into ABLE Labs Ltd. Draft it this week, sign it next week.

**Milestone this week is complete when:** Accountant shortlist ready, savings account open, FreeAgent connected to Starling.

---

### Week 3 (Mar 30 – Apr 5): Accountant engaged, IP assigned, domain transferred

**Actions:**
1. Book a first call with your top accountant choice. In that call: explain ABLE's revenue model (SaaS subscriptions, Stripe, UK and international artists), ask specifically about R&D tax credit eligibility, ask about director salary structure, ask about the payment-on-account calculation for Year 1. Take notes. Make the decision by end of the call.
2. Sign the IP assignment agreement. File it with the company records. This is a one-page document — it does not require a solicitor to execute, but have it reviewed if possible.
3. Transfer the ablemusic.co domain into ABLE Labs Ltd's name at your registrar. If the registrar requires a UK Ltd company number to change ownership, you now have it.
4. Update all ABLE social media account recovery options to use the company email address (hello@ablemusic.co or similar) rather than your personal Gmail.

**Milestone this week is complete when:** Accountant is engaged (invoice sent or retainer agreed), IP assignment signed, domain in company name.

---

### Week 4 (Apr 6–16): Privacy policy, terms, insurance quotes

**Actions:**
1. Publish a privacy policy at ablemusic.co/privacy. Use Genie AI as a starting point. Must cover: data collected (email, usage events, profile data), storage location (Supabase, EU region), user rights including deletion, contact details. Have it reviewed — budget £200–400 for a quick legal review.
2. Publish terms of service at ablemusic.co/terms. Key clause that is non-negotiable: fan data belongs to the artist. This is a competitive differentiator and must be explicit.
3. Request income protection insurance quotes from: British Friendly, Holloway Friendly, and LV=. Be upfront about C5/C6 — it will likely be excluded or carry a loading, but you need to know what the policy covers and what it costs. Get 3 quotes.
4. Request private health insurance quotes from AXA Health and Bupa. Compare options for individual policies at your age.

**The month is complete when:**
- ABLE Labs Ltd is incorporated
- Starling business account is open and live
- FreeAgent is connected and showing real transactions
- Accountant is engaged and briefed
- Emergency fund vehicle is open and first deposit made
- Privacy policy and terms are live
- Insurance quotes are in hand

**What if Month 1 fails (nothing gets done):**
The most common failure at this stage is decision paralysis on the accountant choice. If you haven't found an accountant by Week 4, pick the best of your shortlist and start — you can change accountants in Year 2. Incorporation is the only item with no acceptable failure mode. Everything else can slip a week. Incorporation cannot — it is the blocker for all financial setup.

---

## Month 2 — Company Live, First Revenue Infrastructure (Apr 16 – May 16)

**The thesis for this month:** Get the revenue plumbing working before you have revenue. Stripe in production mode, financial tools connected, company running cleanly. By end of this month, ABLE should be able to take a real payment and have it appear correctly in FreeAgent.

---

### Week 5 (Apr 16–22): Stripe to production

**Actions:**
1. Move Stripe from test mode to live. This requires: business verification (Companies House number, Starling bank details), VAT decision made with accountant (probably no voluntary registration yet — confirm), and Stripe Tax configured for UK and EU digital services.
2. Configure Stripe Revenue Recognition. Set up subscription billing rules before the first annual subscriber, not after. Retroactive configuration is painful.
3. Set up weekly Stripe payouts to Starling (not daily — reduces reconciliation complexity in FreeAgent).
4. Test end-to-end: sign up as a paying artist yourself. Pay £1 on a test Artist plan. Confirm: Stripe processes the payment → webhook fires → Supabase upgrades the account → artist sees Pro features → FreeAgent imports the payout.

**Milestone this week is complete when:** A real payment has been processed and appeared correctly in FreeAgent.

---

### Week 6 (Apr 23–29): R&D time log and Dext

**Actions:**
1. Set up Dext (receipt capture app) — £15–25/month. Photograph every business receipt immediately. Connect to FreeAgent. This prevents the Year 1 nightmare of reconstructing expenses from bank statements.
2. Start the R&D time log. This is a simple spreadsheet: date | hours | description of R&D activity. The qualifying activities (campaign state engine, fan attribution system, AI copy system) need to be logged from now. This is what an R&D tax credit claim is built on. It costs nothing to start and is potentially worth £10,000–16,000 in Year 1.
3. Configure Stripe Tax for EU digital services (OSS). Enable before the first EU subscriber, not after.
4. Set up the n8n weekly financial digest. Pull MRR from Stripe, business account balance, new paying artists, churn. Send to email or Slack every Monday at 08:00. Once this is running, you never need to manually check these numbers.

**Milestone this week is complete when:** Dext connected, R&D time log started, n8n weekly digest firing correctly.

---

### Week 7 (Apr 30 – May 6): First paying artist target

**Actions:**
1. Personal outreach to the first 10 artists you want as paying customers. Not a newsletter — individual messages. These are artists who are already using ABLE or have expressed interest. Offer a founding artist rate (e.g., £7/month locked for life) in exchange for feedback and a testimonial.
2. Set up the n8n pre-shift trigger alert: monthly check that fires when MRR > £5,000 for 3 consecutive months. Test it with a £1 threshold so you know it works. Set the real threshold when Stripe goes live.
3. Income protection insurance: choose a policy from your 3 quotes and activate it. This must happen this month, not "when things are more stable." The policy is most accessible and cheapest before a health event, not after.
4. Start the emergency fund monthly contribution. Treat this exactly like a bill — standing order on payday. Whatever the gap between current balance and £18,000 (or your actual 6× number), divided by the number of months until projected exit. That is the monthly transfer.

**Milestone this week is complete when:** First personal outreach sent to 10 founding-artist targets, income protection policy active.

---

### Week 8 (May 7–16): First paying artist confirmed

**Actions:**
1. Follow up on founding artist outreach. The goal this week: 1 paying artist. One real human who has entered their card details and is paying monthly. This matters not for the revenue but for the psychological signal — it is proof that someone will pay for ABLE.
2. Confirm: director salary/dividend structure agreed with accountant. The standard approach is £12,570/year salary (within personal allowance) + dividends from profit. Confirm this is set up correctly in FreeAgent. Do not guess at this.
3. GDPR fan deletion flow: test it end-to-end this month. An artist deletes a fan from admin.html → Supabase record deleted → Resend/Loops contact removed → event tracking anonymised. Document the test. This is a legal requirement, not a feature.
4. Trademark search: run a search for "ABLE" in Class 41 (entertainment) and Class 42 (software) on the UKIPO database. It's free and takes 30 minutes. If clear, note it. If conflicts, note them and decide how to proceed with your accountant or a solicitor.

**The month is complete when:**
- Stripe is live in production mode
- First real payment has been processed
- FreeAgent, Dext, Stripe, and Starling are all connected and showing correct data
- n8n weekly digest is firing reliably
- Income protection insurance is active
- First paying artist is confirmed
- Director salary structure agreed with accountant
- R&D time log is running

**What if Month 2 fails:**
The most common failure here is Stripe verification taking longer than expected. Companies House confirmation can take 3–5 business days. Build in a week of buffer. If you reach Week 8 without a paying artist, do not panic — the goal is infrastructure, not revenue. The first paying artist will come in Month 3 if not Month 2. What cannot slip is Stripe going live and income protection being active.

---

## Month 3 — Revenue Validation (May 16 – Jun 16)

**The thesis for this month:** Get to 10 paying artists. Validate that the pricing works, the product holds up under paying users, and the Stripe–Supabase–FreeAgent loop is reliable. By end of this month, ABLE should have real MRR that appears correctly in all your financial tools.

---

### Week 9 (May 16–22): 300-artist outreach list

**Actions:**
1. Build the 300-artist outreach spreadsheet. Identify 100 independent artists on TikTok, SoundCloud, and Instagram who have 1k–50k followers, are clearly independent (no label), and fit ABLE's demographic. Record: name, platform, follower count, genre, status (not contacted / contacted / responded / signed up / paying).
2. Send 20 personalised outreach messages this week. Not a template — each one references something specific about their music. The goal is conversations, not sign-ups. The sign-ups come from conversations.
3. NPS survey: draft and send to all current active users (anyone who has logged in within 30 days). Use Typeform or Tally.so. Three questions: How likely are you to recommend ABLE? What do you use ABLE for most? What would make ABLE worth paying for? Record every response.
4. Private health insurance: activate the policy before the employer group scheme lapses. Confirm the gap is zero between employer coverage end and new policy start. This is the one insurance item that must have zero gap.

**Milestone this week is complete when:** 300-artist spreadsheet started with first 100, 20 outreach messages sent, NPS survey deployed.

---

### Week 10 (May 23–29): Reach 5 paying artists

**Actions:**
1. Follow up on all outreach from Week 9. Book calls with anyone who responded. On each call: understand their setup, show them ABLE, ask "what would make this worth £9/month to you?" Record the answers.
2. Ship one thing this week that directly addresses the top NPS theme. Not a full feature — a targeted improvement. Tell the artists who flagged the issue that you fixed it.
3. Emergency fund progress check. Where are you against the target? If behind, increase the standing order. The emergency fund must be at target before exit — it is not optional.
4. Company registration documents: confirm the confirmation statement has been filed at Companies House (due within 14 days of incorporation anniversary). This is a £34 fee and must not be missed — automatic penalties if late.

---

### Week 11 (May 30 – Jun 5): Financial model validated

**Actions:**
1. Build the financial model in a spreadsheet (or Notion): current MRR, projected MRR at current growth rate, months to £5k MRR, months to exit. Update this model every month. It is your reality check.
2. With your accountant: run the first P&L projection for the year. What will corporation tax be? What will your first self-assessment bill include (including payment on account)? This number needs to be known before you exit, not discovered afterwards.
3. Uptime monitoring: set up UptimeRobot or Uptime Kuma watching ablemusic.co and the Supabase health endpoint. Configure alerts to your email and phone. A paid artist should never discover the product is down before you do.
4. Continue 300-artist outreach: 20 more messages this week.

---

### Week 12 (Jun 6–16): 10 paying artists

**Actions:**
1. Target: 10 paying artists by end of this period. If you're at 7, do one more outreach sprint. If you're at 10, send a personal thank-you message to each of them individually — they are your founding cohort and they should feel it.
2. Supabase Pro: if not already upgraded, do it this month. £25/month. Daily backups, 30-day retention, no inactivity pauses. This must happen before you have paying artists who expect reliability.
3. Review the financial model. Are you on track for £5k MRR within 6–8 months? What is the most important acquisition lever that is currently untested? Identify one channel test to run in Month 4.
4. Pension review: contact your current workplace pension provider and request a transfer value statement. This is not a decision — it is information gathering. The decision (SIPP or stay) comes later with your accountant.

**The month is complete when:**
- 10 paying artists confirmed
- Financial model built and reviewed with accountant
- Uptime monitoring active
- Supabase Pro active
- NPS survey results reviewed and at least one improvement shipped
- 300-artist outreach list active and at 60+ contacts

**What if Month 3 fails:**
If you have fewer than 10 paying artists by end of June: do not change the product. Change the outreach. The product is not the problem at this stage — finding people who need it is. Book 5 more artist calls in the following week. The question to ask on each call is not "will you pay for ABLE?" — it is "what would have to be true for this to be worth £9/month?" Then build that thing.

---

## Month 4 — Channel Test and Portugal Research (Jun 16 – Jul 16)

**The thesis for this month:** You now have a working product with 10 paying artists. The next growth question is: what is the acquisition channel? This month tests one channel seriously. Simultaneously: Portugal NHR research gets done properly so the window is not missed.

---

### Week 13 (Jun 16–22): Producer seeding launch

**Actions:**
1. Identify 10 music producers with 5,000–100,000 social followers who work with independent artists. These are not just musicians — they are industry connectors. Each producer works with dozens of artists.
2. Send each producer a personal message that references their work specifically. Offer: free Artist Pro for life in exchange for introducing ABLE to 5 of their artist clients. This is the producer seeding channel — test it properly this month.
3. Research Portugal NHR status: the programme changed in 2024 (the original 10-year 20% flat rate on foreign income was replaced with an incentive for specific professions, then updated again). Get a clear, current picture from a cross-border UK/PT accountant — not from a 2022 blog post. Book a 30-minute call with a specialist this week. Budget £150–300 for this call.
4. Begin pension SIPP research. Read the Vanguard, Hargreaves Lansdown, and PensionBee SIPP pages. Compare: fees, investment options, transfer process. Share with your accountant for a recommendation.

---

### Week 14 (Jun 23–29): Channel test results

**Actions:**
1. Track producer outreach responses. How many responded? How many have introduced artists to ABLE? What is the conversion rate from producer introduction to artist sign-up? This is the most important data point this month.
2. Portugal NHR call completed — record the output. The specific questions to get answered: (a) Does NHR still exist in a useful form for a UK Ltd director earning salary + dividends? (b) What is the income threshold for the D8 Digital Nomad Visa? (c) What is the timeline from applying to receiving NHR status? (d) What are the UK tax implications of changing tax residency while maintaining a UK Ltd company? Document the answers.
3. Build the channel tracking dashboard in PostHog. Define the artist acquisition funnel: landing.html → start.html (wizard) → admin.html (first login) → first fan sign-up → first upgrade to paid. This funnel is the metric that tells you where artists are dropping out.
4. 25-artist target: are you at 25 paying artists? If not, what is the gap and what is the single most important action to close it?

---

### Week 15 (Jun 30 – Jul 5): 25 paying artists and financial review

**Actions:**
1. Monthly financial review with accountant (or independently): MRR, churn, operating costs, emergency fund balance, ISA balance. Update the financial model. Is the exit trajectory still pointing at Q3–Q4 2026?
2. Trade mark decision: if the Class 41 and 42 searches were clear, file the trade mark application this month. £170 for Class 41, £50 for each additional class. Process takes 4+ months — start now so it completes before any serious marketing spend or investment conversation.
3. Pension decision: make it this week. SIPP or stay in employer scheme. Brief your accountant on the choice. If transferring, initiate the process — pension transfers take 4–8 weeks.
4. Evaluate the producer seeding results. If conversion rate is positive (each producer introduction converts at above 20%), double the producer outreach in Month 5. If it's flat, test a different channel.

---

### Week 16 (Jul 6–16): Portugal timeline locked

**Actions:**
1. Based on the NHR consultation, map the Portugal timeline. When does James need to move to Portugal for NHR status to be applicable? What is the latest date for applying in Year 1 of residency? Does this interact with the job exit date?
2. D8 Digital Nomad Visa: understand the full requirements. Key threshold: €760/month income. ABLE MRR at this stage likely exceeds this. Understand the documentation needed (proof of income, health insurance, clean criminal record, proof of accommodation).
3. One thing shipped this week based on artist conversation feedback. This is the monthly product minimum — one real improvement per month shipped and communicated to users.
4. Review: are you on track for the exit trigger? Build the month-by-month MRR projection from now to £5k. If the trajectory suggests Q1 2027 rather than Q3 2026, the plan needs to accelerate. Identify the single highest-leverage action.

**The month is complete when:**
- Producer seeding channel tested with 10 producers, conversion data recorded
- Portugal NHR current status understood from a specialist
- D8 Visa requirements documented
- 25 paying artists (or clear path to 25 within 2 weeks)
- Pension decision made
- Trade mark application filed (if search was clear)
- Channel acquisition funnel in PostHog tracking correctly

**What if Month 4 fails:**
The most common failure here is the producer outreach generating zero response. If this happens: the message is wrong, not the channel. Ask one of the producers who didn't respond if you can send them a revised version and get feedback. Five minutes of honest feedback from a non-respondent is worth more than 50 iterations in isolation.

---

## Month 5 — Exit Trigger in Sight (Jul 16 – Aug 16)

**The thesis for this month:** All the infrastructure is in place. The question this month is whether the exit trigger will be reached in the next 3–6 months. This month is an honest assessment of the trajectory and an acceleration of whatever is working.

---

### Week 17 (Jul 16–22): Exit trigger review

**Actions:**
1. Formal exit trigger review. Go through every condition in Part 11 of PATHWAY.md:
   - MRR: where are you? What monthly growth rate gets you to £5k? By when?
   - Emergency fund: what percentage of target have you reached?
   - Churn: what is the current monthly churn rate?
   - Tier diversity: are 2+ tiers generating revenue?
   - Business operating buffer: is there 3 months of costs in Starling?
   Write the honest answers. Not projections. Current state.
2. Based on the trigger review: does the exit look possible in Q4 2026? If yes, what is the plan to complete the remaining pre-shift checklist items before then? If no, why not — and what would change the trajectory?
3. 50 paying artists target. If you're at 50, the exit is within reach. If you're at 30–40, accelerate the highest-performing acquisition channel. If you're below 30, something is structurally wrong — book 10 artist calls this week to find out what.
4. Community manager: at 50 paying artists and £2,000+ MRR, this hire is self-funding. If you haven't already, begin the process. Write the role spec this week. The right person is probably in the ABLE Discord or the music production community — someone who lives in this world.

---

### Week 18 (Jul 23–29): The checklist audit

**Actions:**
1. Open PRE-SHIFT-CHECKLIST.md. Go through every item. Mark current status honestly. How many are Done? How many are In Progress? How many are Not Started?
2. For every Not Started item: assign a specific week in which it will be completed. Every item must have a deadline and an owner (you, or a named service provider).
3. Routine test this month: take one week of annual leave and work on ABLE full-time from home. Do not use the annual leave to rest — use it as a dress rehearsal. Track: what time do you start? What time do you stop? Did you go outside? Did you eat lunch? Did you feel isolated? The patterns you find here are the patterns to design for before Month 1 full-time.
4. Begin the celebration plan. Who are the 5 people who should hear from you personally before you post publicly? What does the celebration look like?

---

### Week 19 (Jul 30 – Aug 5): MRR visibility

**Actions:**
1. The MRR visibility exercise: plot your current MRR, the trailing 3-month average growth rate, and the projection to £5k. On that chart, mark the date when the primary trigger would be reached at current growth rate. That date is your target exit window.
2. If the target exit window is within 6 months: tell your accountant. Begin discussion of the Year 1 exit tax implications now. Do not leave this for the exit month.
3. One channel double-down: take the highest-performing acquisition channel from months 3–4 and put 3× the effort into it this month. If producer seeding is working, find 20 more producers. If NPS referrals are working, build the referral programme properly.
4. Standing orders audit. Review every direct debit and standing order in your personal account. Cancel everything that is not actively used or needed. Know your personal monthly spend number precisely — it should be the same figure you used to calculate the emergency fund, or it should be updated.

---

### Week 20 (Aug 6–16): Pre-shift checklist at 70%+

**Actions:**
1. Target: 70% of checklist items are Done by end of this week. If you are below 70%, identify the single highest-priority Not Started item and complete it this week.
2. Resignation letter: draft it this week. Do not send it. Just write it. The act of writing it changes the mental state from "I might exit" to "I am planning to exit." Save it in drafts.
3. MRR progress report: where are you vs. the projection? What is the current monthly churn rate? Are you growing faster or slower than the model predicted?
4. n8n pre-shift trigger: confirm it is running. Confirm it will fire when the 3-consecutive-months condition is met. Do a manual test.

**The month is complete when:**
- Exit trigger review completed and documented
- 50 paying artists (or clear path within 2–4 weeks)
- Checklist audit complete with every item assigned a deadline
- Routine test (one week working from home full-time) completed
- Resignation letter drafted and in drafts
- MRR projection to exit date plotted

**What if Month 5 fails:**
If you're below 50 paying artists by August: the product is not growing fast enough for a Q4 2026 exit. This is not a failure — it is information. The exit window moves to Q1–Q2 2027. Update the financial model, extend the emergency fund savings timeline, and return to the one question that matters: why are artists not paying for ABLE, and what would change that?

---

## Month 6 — Exit Decision Point (Aug 16 – Sep 16)

**The thesis for this month:** This is the decision month. Either the exit trigger is in sight (MRR at or near £5k, checklist at 90%+) and the timeline to hand in notice is clear — or the timeline extends and the plan is updated. Either outcome is fine. The goal is clarity, not a forced decision.

---

### Week 21 (Aug 16–22): MRR status and final checklist review

**Actions:**
1. Three-month MRR review: what were the last 3 calendar months of MRR? Are all 3 above £5k? If yes, the primary trigger condition is met. If not, how close are you? What is the current monthly growth rate?
2. Final checklist review: go through every item in PRE-SHIFT-CHECKLIST.md. The target is 90%+ Done. For each Not Done item: is it a genuine blocker (exit cannot happen without this) or a nice-to-have that can complete during the notice period?
3. Emergency fund: what is the current balance? Is it at the 6-month target? If not, what is the gap and how long at current contribution to close it?
4. Trigger verdict this week: are you within 60 days of meeting all primary conditions? If yes, begin the exit preparation sequence (see PATHWAY.md Part 11). If no, identify the single constraint and build a specific plan around it.

---

### Week 22 (Aug 23–29): Exit preparation or timeline extension

**Two scenarios:**

**Scenario A — trigger conditions met or imminent (within 60 days):**
1. Confirm: resignation letter in drafts (written at least 4 weeks ago, revisited this week, ready to send)
2. Confirm: 5 specific people have been told privately. Not LinkedIn posts. Personal conversations.
3. Confirm: accountant has been briefed on the exit date. Year 1 planning call booked.
4. Confirm: physio appointment booked for 2 weeks before exit day (not a treatment — a maintenance session and briefing on the first 90 days solo).
5. Pick the date. Write it down. That is when notice goes in.

**Scenario B — trigger conditions not yet met:**
1. Document the gap honestly: what is the specific constraint? (MRR, churn, emergency fund, product readiness?)
2. Update the financial model with the new projection. When is the exit now? Q1 2027? Q2 2027?
3. Identify one thing that, if done in the next 30 days, would change the timeline most. Do that thing.
4. Increase the emergency fund monthly contribution if possible — more runway is more options.
5. This is not a failure. The plan is working. The timeline is longer than hoped. Both things can be true.

---

### Week 23 (Aug 30 – Sep 5): Pre-exit admin

**If in Scenario A:**
1. Tell your manager. On a Wednesday morning. In person if possible.
2. Follow the notice period plan from PATHWAY.md Part 11.
3. HMRC registration: have the Government Gateway login ready. Register on the day notice is handed in.
4. Post on LinkedIn, TikTok, and Instagram. Email your founding artists the same day.

**If in Scenario B:**
1. Reread this document from Month 1. Note everything that was planned and was not done. Be honest about the pattern — was it execution, was it the product, was it the market?
2. Write a clean updated plan for the next 3 months (Month 7–9) using the same structure as this document.
3. The fact that you are still at this document 6 months later means the preparation is happening. Most people stop here. You are still going. That matters.

---

### Week 24 (Sep 6–16): Decision confirmed

**The 6-month review:**

Regardless of which scenario you are in, this week is the quarterly review of the whole system. Ask the honest questions:

1. What changed in 6 months that was not expected?
2. What worked better than expected?
3. What is the single biggest thing you would do differently if you started again on 16 March?
4. Is the exit trigger formula still right? Or does it need updating based on what you now know about ABLE's unit economics?
5. Where is your health? Is the C5/C6 better, worse, or the same? What does the answer tell you about urgency?

Write a 5-sentence answer to each question. These answers become the opening section of the next 6-month plan.

**The month is complete when:**
- Exit decision made (either a firm date or a documented revised timeline)
- Pre-shift checklist at 90%+ Done (or every remaining item has a specific owner and deadline)
- Emergency fund at target or within 2 months of target
- Financial model updated with actual data
- 6-month review completed and documented

---

## Scoring table

| Stage | Milestone | Approx. score |
|---|---|---|
| System exists in writing | Docs complete, nothing done | 3/10 |
| Month 1 complete | ABLE Labs Ltd incorporated, Starling live, accountant engaged, emergency fund started | 4/10 |
| Month 2 complete | Stripe live, first paying artist, income protection active, n8n digest running | 5/10 |
| Month 3 complete | 10 paying artists, financial model validated, uptime monitoring live | 6/10 |
| Month 4 complete | 25 paying artists, Portugal NHR research done, pension decision made | 7/10 |
| Month 5 complete | 50 paying artists, 70%+ checklist Done, resignation letter drafted | 8/10 |
| Month 6 complete — Scenario B | Timeline extended, honest review done, updated plan in place | 8.5/10 |
| Month 6 complete — Scenario A | Exit trigger met, notice handed in | 9/10 |
| Notice period complete | Last working day done, every checklist item Done | 9.5/10 |
| First week solo | Rhythm established, first week complete, product running | 10/10 |

---

## What 10/10 actually looks like

It is a Wednesday in late 2026 (or early 2027 if the timeline extends — both are fine). James has slept well. The n8n digest arrived at 08:00 and confirmed MRR has been above £5,000 for 3 consecutive months. The emergency fund is at £18,000. The resignation letter has been in drafts for 6 weeks.

At 09:30, he sends it.

Not a scramble. Not a calculation under pressure. A completion of something that was built over 6 months, one week at a time.

That is 10/10.

---

*Review this document monthly. Update the status of each month as it completes. Cross-reference: `PRE-SHIFT-CHECKLIST.md` for item-level tracking, `PATHWAY.md` for full context on each domain.*
