# ABLE — Lead Generation System Analysis
**Date: 2026-03-16**
**Author: Assessment of LEAD-GENERATION.md, PATH-TO-10.md, FINAL-REVIEW.md**
**Stage: Pre-execution — spec complete, no leads in pipeline yet**

---

## Current State Assessment

ABLE's lead generation system scored 7.9/10 across 20 dimensions in PATH-TO-10.md and 7.5/10 overall in FINAL-REVIEW.md. Both scores are accurate: the system is well-designed but has two honest limitations that keep it below 9/10.

First limitation: the system is long (approximately 3,500 words) and structured for completeness rather than immediacy. A solo founder who needs to act today must read 3,500 words before the first action. The 20-angle analysis correctly identifies this as the most important single fix.

Second limitation: the most critical dependency in the entire system is not called out clearly enough in the main document. The email system P0 (Netlify function, Resend account, DNS records, fan confirmation email) must be live before Week 3 outreach begins. If artists sign up and their first fans don't receive a confirmation email, the core value loop is broken — the artist sees a number in their fan list but there's no evidence the system works. This dependency deserves prominent placement, not a note in FINAL-REVIEW.md.

Beyond these limitations, the system is strong: the ICP is specific and usable as a research filter, the "Never Buy Leads" principle correctly prioritises long-term community trust over short-term pipeline volume, the producer seeding channel is correctly identified as the highest-ROI lever, and the 12-week calendar breaks the work into specific weekly tasks.

**What exists and is correct:**
- ICP definition with specific filter criteria (follower range 500–50k, activity recency, current tool, orientation) and anti-ICP section
- 8 acquisition sources with channel-specific execution detail
- Lead scoring model (100+ = hot, 50–99 = warm, <50 = cold)
- Three nurture sequences (hot: personal 4-touch; warm: automated 6-touch with branching; cold: minimal 3-touch with 90-day cut-off)
- 6-metric weekly dashboard with milestone targets (Month 1/3/6)
- 12-week execution calendar
- "Never Buy Leads" principle with strategic reasoning
- Integration notes (email system, CRM, analytics, growth loop dependencies)

**What does not yet exist:**
- Any leads in the pipeline
- The 300-artist research spreadsheet
- The first producer DM sent
- The email system P0 (Resend + Netlify function + DNS) — blocking dependency
- The lead scoring in PostHog/Supabase
- The Sequence B automation (requires email system)
- Any conversion data from any channel

---

## 20-Angle Scoring

### 1. ICP Definition Precision (1–10)
**Score: 9**

The ICP table is specific enough to use as a research filter at the point of building the 300-artist spreadsheet. The qualifying criteria (follower range, posting about own music, activity in last 30 days, mentions releases or upcoming shows, using Linktree or nothing for bio link) and the anti-ICP (hobbyists who post about music but don't release, major label or managers in bio, posting about "building my brand" or "growing my audience" — ABLE's exact language prohibitions in mirror) are both correctly specified.

The 500–50,000 follower range is deliberately broad at this stage and correctly noted as a range to be tightened after 3 months of conversion data. Artists at 500–2,000 followers may underconvert (audience too small to feel immediate fan capture value); artists at 20,000–50,000 may have managers complicating the decision. After 50 paying artists, analyse the follower distribution to find the sweet spot.

Gap (noted in FINAL-REVIEW.md): the ICP table works as a filter but doesn't include specific search methods. "How do I find 300 artists who match this ICP on Instagram and Bandcamp?" is not fully answered. The research process (search Bandcamp "UK indie releases last 30 days," check Instagram bio for Linktree, check recent posts for live activity signals) should be a step-by-step companion to the ICP definition.

### 2. Organic Social Lead Source (1–10)
**Score: 7**

The content strategy (comparison Reels, profile state demos, artist spotlights) is directionally correct. The cross-reference to the dedicated Instagram strategy system avoids duplication.

Gap (noted in FINAL-REVIEW.md): no hypothesis for the Instagram → sign-up conversion funnel is specified. The content drives profile visits — but the CTA on content (what converts a viewer into a ablemusic.co/start visitor) is unspecified. "Link in bio — try it free" vs. "DM me 'ABLE'" vs. "Comment 'page' for the link" will produce different response rates. Until tested, organic social is a brand-builder more than a direct acquisition channel.

### 3. Direct Outreach Design (1–10)
**Score: 8**

The direct outreach channel is correctly identified as the strongest single acquisition lever in V1. The 300-artist research process is well-specified. The expected response rates (40–60% DM open rate, 10–20% reply rate from personalised DMs, 30–40% of replies sign up) are realistic.

Gap: the spec gives the framework for outreach but not the text. For a solo founder writing 10–20 DMs per week, having 3 tested message variants (by artist size, by current tool, by genre) would reduce time-per-DM from 10 minutes to 3 minutes. The difference at volume: 20 DMs × 7 minutes saved = 140 minutes/week. That's meaningful for a founder with a day job.

Also missing: a "copy test" protocol. In Week 4 (per the calendar), James should be analysing reply rates by message variant. The spec doesn't define what constitutes a "good enough" reply rate vs. "iterate the message" threshold. Add: "If fewer than 1 reply per 20 DMs after 40 DMs, review the message copy before sending more."

### 4. Producer Seeding Channel (1–10)
**Score: 8**

Producer seeding is the highest-ROI acquisition channel by significant margin. The logic is correct: a producer who works with 10+ artists and genuinely recommends ABLE is worth 3 months of Instagram content. The 25% recurring commission provides financial alignment; the freelancer profile (Phase 2) provides the deeper value proposition.

The honest acknowledgment (producer seeding is stronger once the freelancer profile is live — in V1, the pitch is "be early, help shape the product, get your artist clients on the best tool") is important. This pitch works if James has credibility and the product genuinely works. It is not a pitch if the product is broken.

Gap (noted in FINAL-REVIEW.md): the lead generation spec correctly says producer seeding is Source 3. It should be Source 1 with prominent visual distinction. The Loom video follow-up sequence and detailed offer structure from GROWTH_STRATEGY.md should be surfaced here rather than referenced. Someone reading only LEAD-GENERATION.md should find the complete producer seeding playbook.

### 5. Music School Channel (1–10)
**Score: 6**

Correct target institutions (BIMM 7 UK campuses, ICMP, Leeds Conservatoire, ACM, Point Blank). Correct approach (student music society or new media coordinator, not admissions). Correct offer (group discount + workshop).

Gap: no email template, no workshop outline, no specific contact names. The spec gives strategy but not execution toolkit. The March timing is also acknowledged as imperfect (late in academic year) — real activation is September. Use March–August to build the relationship and deliver one workshop if possible.

The school channel is the lowest-urgency source in the 12-week calendar and correctly sequenced as later-stage activation. The BIMM relationship (if developed) is potentially the highest-volume single-institution source — BIMM has 7 UK campuses and thousands of students who are exactly ABLE's beachhead ICP.

### 6. Community Channel (1–10)
**Score: 6**

Reddit (r/WeAreTheMusicMakers, r/indieheads) and Facebook groups are identified with the 30-day community contribution requirement before any product mention. This is the correct approach — communities are hostile to product spam from accounts that haven't contributed.

Gap: the spec identifies channels and rules but not a content bank for the community build phase. What does James post in these communities during the 30-day build? Specific useful posts (sharing expertise about fan email list building, answering questions about independent music distribution, sharing useful non-ABLE tools for musicians) would demonstrate genuine community membership. Without this, the 30-day wait is passive rather than active.

### 7. SEO Lead Generation (1–10)
**Score: 7**

Five article titles from the growth strategy (correctly deferred to that document) form the SEO foundation. The articles target high-intent search queries: "fan email list for musicians," "link in bio for musicians 2026," "music pre-save campaign how to."

The spec correctly defers SEO to Month 2+ — the 12-week calendar doesn't start SEO until Week 9–10. For a pre-launch product without domain authority, SEO articles take 3–6 months to rank regardless of quality. Starting them in Week 9 means they won't produce leads until Month 5–6 at earliest. This is correct timing but means the first 4 months of growth are entirely from direct channels.

Gap: the spec doesn't address the landing page optimisation that converts SEO traffic. An article about "fan email list for musicians" that ranks for that query needs a clear, specific CTA to ABLE at the end — not a generic "try ABLE free" but a paragraph that directly connects the article's educational content to ABLE's specific solution ("ABLE's fan capture form converts 8%+ of artist page visitors — here's what it looks like").

### 8. Referral Programme Mechanics (1–10)
**Score: 7**

The referral mechanic (artist admin.html "Invite an artist" button → unique link → both artists get 1 month free when the referred artist activates a paid plan) is correctly designed. The in-product prompt copy suggestion ("Know another artist who'd get this? Your page, their page — both grow") is appropriately written in ABLE's register.

Gap: the referral programme requires email sending to work (the referred artist must receive a "You've been invited" email + their link). Until Resend is live, referral mechanics can't function. The 12-week calendar triggers referral at Weeks 11–12 — which should be well after email P0. The dependency should be explicit.

### 9. Lead Scoring Model Design (1–10)
**Score: 7**

The scoring model is manual in V1 (correct trade-off) and uses the right signals:
- Visited start.html (+10)
- Spotify import completed (+30)
- Set a release date (+20)
- Returned within 7 days (+20)
- Set profile live (+15)
- Added fan capture CTA (+20)
- Referred from organic source (+10)
- Referred by known artist (+30)
- Free sign-up email vs. custom domain (+5 / +15)

The 100+/50–99/<50 tier thresholds are intuitive. The routing (hot → Sequence A personal; warm → Sequence B automated; cold → Sequence C minimal) is correct.

Gap (noted in FINAL-REVIEW.md): the model is not calibrated to real data. Some signals may be over-weighted (email domain +10 is negligible; referred-by-known-artist +30 may be under-weighted — this signal has the highest conversion correlation). After 50 sign-ups with outcome data, recalibrate the model. Add a "recalibration checkpoint" to the calendar at Week 12.

### 10. Nurture Sequence A (Hot Leads) (1–10)
**Score: 8**

The four-touch personal sequence (Hour 1: "Your page is live — here's what I'd do next"; Day 2: first suggestion; Day 5: specific resource; Day 14: data-back — "Your page has had X views") is correctly designed for high-intent leads. The Day 14 data-back email is the strongest touch because it closes the loop between effort (setting up the page) and outcome (real visits happening).

Gap: the sequence relies on James's memory and manual execution. Without a CRM or even a spreadsheet with "Sequence A tracking" columns (artist name, last_touch_date, next_touch_due, sequence_stage, response_status), touches will be missed. This is not a theoretical risk — when there are 15 hot leads in the sequence simultaneously, tracking manually in memory fails. Add the tracking column spec to the CRM section.

### 11. Nurture Sequence B (Warm Leads — Automated) (1–10)
**Score: 7**

The six-touch automated sequence (Hour 0 through Day 30) is well-designed with import-source branching at Hour 0 (Spotify import / Linktree import / started from scratch). This personalisation is the most important differentiation in the sequence — it makes the first email feel like it was written for this specific artist's situation.

Gap: the Day 7 email ("Your page this week") requires pulling real analytics data from Supabase at send time. The conditional copy (0 fans / 1–5 fans / 5+ fans) needs the backend to determine which variant to send. Until Supabase is live and the email system can query it, this email sends a static placeholder. The sequence spec should mark Day 7 as "requires Supabase integration" explicitly.

### 12. Nurture Sequence C (Cold Leads — Minimal) (1–10)
**Score: 7**

Correctly minimal: 3 touches over 90 days with the 90-day cut-off preventing prolonged harassment of non-converting leads. The Day 60 "while you were away" email is the strongest cold lead re-engagement copy because it shows value accruing passively — genuine reason to come back, not a generic "we miss you."

Gap: cold leads who become warm later (signed up cold, then 6 months later release music and return to admin.html) need to re-enter a relevant sequence from the beginning. The spec doesn't address this re-activation path. Add: "if a cold lead (90-day inactive) returns to admin.html: re-enter Sequence B from Day 1 with the import-source branch appropriate to their current state."

### 13. Metrics Framework (1–10)
**Score: 8**

The 6-metric weekly dashboard (qualified leads/week, source breakdown, free-to-paid conversion rate, time to conversion, cost per lead, producer-sourced leads/week) is lean and actionable. The three-column milestone targets (Month 1: 5 qualified leads/week → Month 3: 20/week → Month 6: 50/week) give clear success definitions.

Gap: "qualified leads per week" requires the scoring model to be running. In Week 1, with no scoring infrastructure, the metric defaults to "new sign-ups/week." This is a fine proxy — state it explicitly so the Week 1 baseline captures the right number. Also: connect each metric to the MRR progression. At 20 qualified leads/week with 8% conversion → 2 new paying artists/week → ~8 additional MRR per week at Artist tier.

### 14. 12-Week Calendar Design (1–10)
**Score: 7**

The calendar is correctly structured: research (Weeks 1–2) → outreach (Weeks 3–4) → first producers (Weeks 5–6) → channel analysis (Weeks 7–8) → content refinement (Weeks 9–10) → product mechanics (Weeks 11–12). The sequence is right.

Gap: no time budget per week. "Build the 300-artist spreadsheet" is a 10-hour task. "First producer partnership" is a 2-hour call. Without hour estimates, a founder with a day job cannot plan the calendar against their actual availability. Add: "Weeks 1–2: ~8 hours total (1 hour per day)." Breaking each week into daily 1-hour segments would make the calendar executable rather than aspirational.

### 15. "Never Buy Leads" Principle (1–10)
**Score: 10**

This section is rated 10/10 in FINAL-REVIEW.md and should remain unchanged. The strategic case (tight-knit independent music community, news travels fast, purchased list contacts will share the outreach in musician Discord servers, brand trust is the primary moat) is more persuasive than the ethical case.

The specific mechanisms of trust damage in this community ("an artist who receives a cold email about a tool they never signed up for has a specific, textured objection: they've been treated as a data point, not a person") make this principle concrete rather than abstract.

### 16. Social Proof Gap (1–10)
**Score: 5**

The system is designed for pre-social-proof stage (0 artists on the platform). The tactics that work without social proof (direct personal outreach, producer relationships) are correctly prioritised.

Gap: the system doesn't address the "who else is on ABLE?" question — the first question every artist will ask in a DM conversation. Having a prepared, honest answer is essential before the first DM is sent. The answer at Day 1: "We're in early access — about [N] artists have set up pages so far, I can show you a couple. The product is real, it's been through several rounds of testing. The early artists are getting to shape what it becomes."

This honest answer is more persuasive than an inflated early user count or a deflective "we're growing fast" response. Independent artists respect honesty about early stage; they resent being bullshitted.

### 17. Email System P0 as Critical Dependency (1–10)
**Score: 4**

FINAL-REVIEW.md correctly identifies this as "the most important finding" — the lead generation system has a structural dependency on email P0 that is not prominently stated.

The scoring of 4 reflects how underemphasised this dependency is in the main document. The dependency is noted in the integration section but it should be in a prominent WARNING at the top of the document or at the start of Part 3 (Nurture Sequences): "PREREQUISITE: Email system P0 must be live before Week 3 outreach begins. Without the fan confirmation email, an artist who signs up and gets their first fan sign-up has no evidence the product is working. The email is the closing of the value loop."

The specific email P0 items (Netlify function, Resend account, DNS records, 4 email templates) are in `docs/systems/email/PATH-TO-10.md` and represent approximately 2–3 days of focused work. This should be elevated as a blocking dependency, not an integration note.

### 18. Founder Usability (1–10)
**Score: 6**

The system is 3,500 words. For a solo founder building a product and working a day job, 3,500 words before the first action is a genuine friction point. The 20-angle PATH-TO-10.md analysis identifies "emotional resonance" (score 7/10) as a gap — the document makes the challenge feel large.

The 5 highest-impact changes identified in PATH-TO-10.md all address this: "3 things to do first" executive summary, kill criteria per channel, "who else is on ABLE?" objection response, daily time commitments in the calendar, and a key insight callout for producer seeding.

Adding the "3 things to do first" summary to the top of LEAD-GENERATION.md is a 15-minute edit that would change how the system is used. Three specific actions, each under a day: (1) build the 300-artist spreadsheet template (2 hours), (2) send the first 5 producer DMs (3 hours including research), (3) complete email P0 (2–3 days). Everything else in the document can wait.

### 19. Channel Kill Criteria (1–10)
**Score: 5**

The system describes what to do but not when to stop. Without explicit kill criteria for each channel, a solo founder experiencing low early results (which are normal) may either abandon a working channel prematurely or continue a failing channel out of sunk-cost momentum.

Kill criteria should be added to each source:
- Source 2 (direct outreach): fewer than 1 reply per 20 personalised DMs after 40 DMs → review message copy, do not increase volume
- Source 3 (producer seeding): fewer than 1 active Abler after 10 producer conversations → review the pitch, check if freelancer profile is needed for conversion
- Source 4 (music schools): no response after 3 contacts over 8 weeks at one institution → move to the next institution
- Source 6 (communities): no profile visit from community content after 30 days of regular contribution → the community doesn't have ABLE's ICP, find a different community

### 20. Strategic Alignment with ABLE's Growth System (1–10)
**Score: 9**

The metrics framework maps directly to the ABLE_STRATEGY.md milestones (25 sign-ups by Month 1, 50 active pages by Month 3). The channel sequencing in GROWTH_STRATEGY.md (producer seeding: Priority 1) is reflected in this document's source ordering and 12-week calendar. The "Never Buy Leads" principle is the lead generation expression of the growth philosophy's "one authentic channel" principle.

The one-sentence alignment summary: this system is the tactical implementation of the growth strategy's highest-leverage Year 1 channels, executed by a solo founder with a day job, starting from a zero-lead baseline.

---

## Gap Summary

| Gap | Severity | When to address |
|---|---|---|
| Email system P0 not called out as blocking dependency | Critical | Add to top of LEAD-GENERATION.md today |
| 300-artist research spreadsheet not built | Critical | Week 1 — 8 hours |
| First producer DMs not sent | Critical | This week — 5 DMs minimum |
| "3 things to do first" executive summary missing | High | 15-minute edit to top of document |
| Channel kill criteria missing | High | Add to each source section |
| "Who else is on ABLE?" objection not addressed | High | Add to direct outreach section |
| Daily time commitments missing from calendar | Medium | Add to each week in the calendar |
| Message copy variants not written | Medium | Week 3 — before first 20 DMs |
| Community content bank not written | Low | Month 1 — before community activation |
| Cold lead re-activation trigger not specified | Low | Before email automation is built |

---

## Competitive Context

ABLE's lead generation system is correctly differentiated from how B2C SaaS tools typically approach artist acquisition.

**Standard B2C acquisition approach (Linktree, Beacons model):**
SEO-first, content marketing at scale, paid social to bottom-of-funnel, feature announcements driving sign-ups. Effective at volume, weak at quality — produces creators who churn when the next platform launches.

**ABLE's approach:**
Producer seeding (relationship sale, high quality), personal direct outreach (personalised, high intent), community contribution (trust-building, slow but durable), SEO as a Phase 2 amplifier. Lower volume in Year 1 but significantly higher quality and lower churn probability.

The "Never Buy Leads" principle is a real competitive differentiator in ABLE's specific market. Independent musicians talk to each other constantly — in Discord servers, in studio sessions, at shows. A musician who receives a cold spam email from ABLE will mention it in those conversations. A musician who receives a personal DM from James referencing their specific release will also mention it — differently.

**The moat:** ABLE's early artist relationships are trust-based. Linktree's early artist relationships were based on convenience. Trust compounds; convenience does not.

---

## What "10/10" Looks Like for This System

A 10/10 lead generation system for ABLE means:

1. **The pipeline is producing 20+ qualified leads per week sustainably:** Not a burst from a launch, but a consistent weekly flow from 2–3 active channels running simultaneously.

2. **The one channel is identified:** After 12 weeks of testing, one channel (most likely producer seeding or direct outreach) is consistently producing artists at below £5 CAC. That channel is getting all the time and energy. The others are maintained at minimal effort until a second channel earns attention.

3. **The referral loop is compounding:** At least 15% of new sign-ups are attributable to referrals from existing artists (PostHog UTM attribution). The artist referral prompt in admin.html is producing weekly new sign-ups.

4. **At least 2 active producer partnerships:** Each generating 1+ artist referral per month. Affiliate commission paying out automatically. Both producers have set up their own ABLE pages (freelancer profile or artist profile).

5. **Sequence B open rates above 30%:** Fan confirmation emails and the warm nurture sequence are performing above the industry benchmark. Subject lines are human, from-name is ABLE, content is specific to each artist's import source.

6. **The scoring model is calibrated to real data:** After 50 sign-ups with outcome data, the signal weights have been updated based on what actually predicts conversion vs. churn.

**Current distance from 10/10:** The spec is 7.5/10. The execution is 0/10. The aggregate system score is approximately **3/10** — a well-structured plan with no operational output yet. The email P0 dependency and the first 5 producer DMs are the two actions that change this score most rapidly.

---

*Next action: Before anything else in this system, open `docs/systems/email/PATH-TO-10.md` and complete email P0. This is the bottleneck that makes all outreach less valuable until it's done. Then: send the first 5 producer DMs. Everything else in this document follows from those two actions.*
