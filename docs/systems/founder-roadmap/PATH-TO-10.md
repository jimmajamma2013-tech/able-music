# ABLE — Path to 10/10 Founder Execution
**Written: 2026-03-16 | Paired with: ANALYSIS.md + 500-STEPS.md**

> This document answers one question: what is stopping James from executing this roadmap at a 10/10 level, and what are the highest-leverage interventions that would change that? Score the current state, identify the gaps, and name the actions that move the needle most.

---

## The Framework

A 10/10 founder executing this roadmap would exhibit:
1. Clarity of decision — no hedging, no deferring
2. Velocity in execution — output measured in shipped features and real conversations, not documents
3. Resilience — does not stop when it gets hard
4. Self-awareness — corrects course without ego
5. Commercial instinct — builds the thing people will pay for, not the thing that is most interesting to build
6. Personal sustainability — does not burn out before the 90 days are up

Score each dimension honestly.

---

## Dimension Scores: Current vs Target

### 1. Clarity of Decision — Current: 7/10 → Target: 9/10

**Current state:**
You have exceptional clarity on product direction, copy voice, and what ABLE is not. The number of documents that exist to resolve decisions that could otherwise drift (VOICE-BIBLE, V6_BUILD_AUTHORITY, DATA_ARCHITECTURE) is evidence of good decision hygiene.

The gap is at the action layer. The legal entity decision ("UK Ltd or sole trader — to be decided") should have been made in week 1. The backend architecture ("localStorage → Supabase when backend lands") should already have been landing. There is a pattern of high-quality deferral — the decisions are well-framed but not yet made.

**What moves this from 7 to 9:**
- A rule: any decision that can be made in under 30 minutes must be made within 24 hours of being identified, not parked in a doc.
- The "decide and document" habit: when you make a decision, write it in DECISION-LOG.md within the same session. Do not leave it as an implicit consequence of a planning document.
- One accountability trigger: send a weekly "three decisions made this week" note to yourself or a founder peer.

**Gap to 10/10:** The remaining 1 point is earned by making decisions under uncertainty without flinching. This comes with practice and is not fully achievable until you have had 3–4 high-stakes decisions prove out over time. It is a rounding error for now.

---

### 2. Velocity in Execution — Current: 5/10 → Target: 9/10

**Current state:**
This is the most honest score in the document. The documentation is excellent. The product is built to a meaningful prototype level. But no real user has yet used this product in production. No real fan has signed up via a real artist's page in a live environment. The ratio of documentation-to-deployed-features is inverted from where it should be at this stage.

This is not a failing — it is a pattern that is very common in technically excellent, detail-oriented founders. The impulse to do it right before shipping is admirable. But in a consumer-facing product, "right" is defined by real users interacting with real features, not by spec scores.

**What moves this from 5 to 9:**
- The single most important change: establish a "ship by default" rule. If a feature is 80% right, it ships. The remaining 20% is informed by real user feedback, not further internal refinement.
- Set a hard deadline: the Supabase auth write path must be live and tested by 2026-03-22 (6 days from now). Not specced. Live.
- Introduce a weekly "shipped" metric alongside the "documented" metric. Every week, the headline question is: "What shipped?" not "What did I work on?"
- Remove one documentation habit that has become procrastination. Identify it this week. Likely candidate: writing new analysis docs when action docs (500-STEPS) exist and are sufficient.

**Gap to 9:** The remaining 1 point is the gap between "shipping reliably" and "shipping at founder velocity" — the pace where you are slightly uncomfortable with how fast things are going. This requires sustained practice and takes 2–3 sprints to establish.

**Gap to 10:** A 10/10 velocity requires either a co-founder or a part-time contractor to absorb non-product work (admin, legal chasing, email responses). Solo, you are structurally limited. This is not a personal failing — it is arithmetic.

---

### 3. Resilience — Current: 7/10 → Target: 9/10

**Current state:**
The evidence for resilience is: you are still building. The project has evolved through at least 8 versions by session count. That persistence against version churn is a signal of genuine drive.

The unknown is how you respond to external rejection. The first artist who says "this isn't useful to me" will be the first real test. The first week with zero new sign-ups will be the second. These moments have not arrived yet.

**What moves this from 7 to 9:**
- Pre-empt the hard moments by naming them in advance. The failure log (step 458) is the structural version of this. Starting it now, before failures arrive, changes how failures register when they do.
- Build a support structure: one founder peer, one mentor or advisor, one person who is not in the startup world who keeps you grounded. Without these, resilience is purely internal — and internal reserves deplete.
- Reframe "no responses" as data, not rejection. If 20 DMs to artists result in 3 responses, the appropriate response is not discouragement — it is updating the hypothesis about which artists are the right target.

**Gap to 10:** A 10/10 resilience score requires having gone through at least one serious crisis (a feature that nobody used, a key artist who left, a month with zero revenue growth) and having come back from it with clarity. You have not had this experience yet. It cannot be manufactured. It will arrive.

---

### 4. Self-Awareness — Current: 8/10 → Target: 9/10

**Current state:**
This is a strength. The copy philosophy, the product documentation, and the ANALYSIS.md (which you commissioned honestly) all show unusual willingness to examine reality. The health goals (C5/C6, longevity) show awareness beyond the startup bubble.

The gap is small: a tendency to assess with high clarity but act on the assessment slightly slowly. The self-awareness is present; the translation of awareness into changed behaviour is the gap.

**What moves this from 8 to 9:**
- Establish a 2-week review rhythm (not just end-of-sprint). Every 2 weeks: "What did I believe at the start of this fortnight? What do I now believe? What behaviour should change as a result?"
- Read feedback from artists with curiosity, not with the urge to explain or defend. The best founders hear hard feedback and think "interesting — tell me more."
- Cultivate one relationship with someone whose feedback you genuinely cannot predict. Not a cheerleader, not a cynic — someone who will tell you what they actually think.

**Gap to 10:** The final point comes from repeated cycles of accurate self-assessment leading to meaningful behaviour change. This is the work of months, not weeks.

---

### 5. Commercial Instinct — Current: 6/10 → Target: 9/10

**Current state:**
The product design instinct is strong. The copy instinct is strong. The commercial instinct — specifically, the ability to identify what people will pay for and how much, before building it — is less proven.

The tier system is well-designed but untested. The assumption that independent artists will pay £9/month for a better link-in-bio is reasonable but unvalidated. There is a risk of over-engineering for an assumed willingness to pay that has not been confirmed.

**What moves this from 6 to 9:**
- Have explicit conversations about money with artists. Not in a pitch — in a conversation: "If ABLE cost £9 a month, would that be worth it to you? What would it need to do to be worth it?" These conversations are uncomfortable and essential.
- Run the pricing page by real artists before finalising it. Show them the three tiers. Watch their face when they see the prices. The reaction is signal.
- Identify the one feature that is clearly worth £9/month on its own: probably the email broadcast to fans. Build that before charging for anything else — or at least gate it as the obvious upgrade reason.
- Build the financial model (step 319) and stress-test its assumptions. Commercial instinct is partly intuition and partly numbers — the model reveals which assumptions are the most load-bearing.

**Gap to 10:** Commercial intuition at a 10/10 level requires a few pricing experiments that produced unexpected results — where you assumed artists would pay X and they either paid more or less, and you updated your model. This comes from running the business, not from planning it.

---

### 6. Personal Sustainability — Current: 6/10 → Target: 9/10

**Current state:**
The combination of full-time employment + solo founding + a health condition (C5/C6) + ambitious 90-day target is a high-load configuration. The risk is not immediate collapse — the risk is a gradual degradation of energy and judgment over 6–8 weeks that is not noticed until it manifests as poor decisions or emotional depletion.

The health protocol in 500-STEPS is the right idea. The question is whether it will be followed or whether it will be the first thing that slips when weeks get hard.

**What moves this from 6 to 9:**
- Non-negotiable: the standing desk / posture protocol is a medical issue, not a preference. It goes in the calendar as a non-optional item.
- The physiotherapy appointment is the most deferred item in the whole roadmap. If it has not been booked by day 7 of this sprint, it will not be booked for 90 days. Book it today.
- Design the energy system before you need it: identify the 3 things that drain you most (likely: context-switching between job and ABLE, unanswered messages, tasks that involve rejection). Build micro-protocols for each.
- Identify the 3 things that restore your energy fastest (likely: physical movement, music, clear progress on a single task). Protect these deliberately — they are not rewards, they are maintenance.

**Gap to 10:** A 10/10 personal sustainability score for a solo employed founder requires having found a rhythm that is genuinely sustainable indefinitely — not just for 90 days. This takes 2–3 cycles to establish. The 90-day sprint is the first one.

---

## The Five Highest-Leverage Interventions

In order of leverage (most to least):

### 1. Form the company and connect Stripe this week.

This is not exciting. It is not product work. It is also the single action that most enables everything else. You cannot legally onboard paying artists without it. You cannot describe yourself as a business without it. It takes one afternoon and costs £52 total (£12 company + £40 ICO). The fact that this has not happened yet is the most visible gap between the plan and the execution.

**Intervention:** Block 4 hours this week. Do steps 1–19 of 500-STEPS.md. Do not let any other task take priority over these.

---

### 2. Ship the Supabase auth write path before building anything else.

The entire product is currently running on localStorage. This means: if an artist clears their browser data, their profile is gone. If they switch devices, they cannot see their profile. If you send them a link to their admin, it does not work. This is the single biggest product gap.

**Intervention:** Steps 41–55 of 500-STEPS.md. Do not add any new features to the product until the auth write path is live and tested. This is a hard rule.

---

### 3. Have a real conversation with 3 real artists this week.

Not a DM. Not an email. A conversation — voice or video. Show them the product. Listen to what they say. The planning phase is over. The discovery phase starts with real people.

**Intervention:** Send 5 DMs to the warm artist list today (step 151–155). Schedule 3 conversations for this week. Accept that some of those conversations will be uncomfortable or inconclusive. That is still orders of magnitude more valuable than any additional documentation.

---

### 4. Establish the weekly review ritual before week 2 ends.

Every Sunday: 3 wins, 1 area for improvement, 3 priorities. 10 minutes. This single ritual has more long-term leverage than almost any tactical action, because it is the mechanism by which all other habits are noticed, adjusted, and maintained. Without it, you are flying without instruments.

**Intervention:** Set a Sunday 21:00 calendar event, recurring weekly, titled "ABLE weekly review". The first entry goes in this Sunday. It can be terrible — that is fine. The habit is the point, not the quality of the first instance.

---

### 5. Get off the planning side of the ratio and onto the shipping side.

The documentation in this project is of genuinely high quality. It is also substantially complete. The next marginal unit of value does not come from another spec document — it comes from a real user interacting with a real feature. The shift from planning mode to shipping mode is a gear change, not a gradual transition. It requires a decision.

**Intervention:** For the next 14 days, no new documentation files unless required by a specific build task. Every session starts with 500-STEPS.md, not with an open Notion page or a new analysis. The question every day is: "What step did I complete today?"

---

## Current vs Target State Summary

| Dimension | Current | Target | Gap |
|---|---|---|---|
| Clarity of decision | 7/10 | 9/10 | Decide faster, document decisions |
| Velocity in execution | 5/10 | 9/10 | Ship before it is perfect |
| Resilience | 7/10 | 9/10 | Pre-empt hard moments, build support structure |
| Self-awareness | 8/10 | 9/10 | Close the loop between insight and behaviour change |
| Commercial instinct | 6/10 | 9/10 | Have money conversations with real artists |
| Personal sustainability | 6/10 | 9/10 | Medical appointment, energy system, sustainable rhythm |
| **Overall** | **6.5/10** | **9/10** | **The gap is closable in 90 days** |

---

## What 10/10 Execution Actually Looks Like

A 10/10 execution of this roadmap would look like:

- Company formed, Stripe connected, ICO registered by day 5.
- Supabase auth write path live and tested by day 10.
- First real artist onboarded with a live, Supabase-backed profile by day 14.
- First fan signed up via a real artist's live page by day 21.
- 10 artists with live profiles by day 42.
- First paying artist by day 63.
- 25 artists, 500 fans, £50+ MRR by day 84.
- Retrospective written and V2 sprint planned by day 91.

At each stage: decisions made promptly, builds shipped before they are perfect, feedback collected from real users, energy managed deliberately, and the financial reality confronted honestly — not optimistically.

That is 10/10. It is achievable. It is not comfortable. That discomfort is the job.

---

*Next: read FINAL-REVIEW.md for a scored assessment of the roadmap itself.*
