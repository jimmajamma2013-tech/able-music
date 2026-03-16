# ABLE — Lead Generation System — Final Review
**Date: 2026-03-16**
**Current score: 7.5/10 (spec quality, pre-execution)**
**Post-execution target: 9/10 (12 weeks of live data)**
**Ceiling: 10/10 (data-informed iteration, 400+ active artist pages)**

---

## Dimension scores

| # | Dimension | Current | Post-12-weeks | Post-6-months |
|---|---|---|---|---|
| 1 | ICP definition — precision and usability | 9 | 9 | 9.5 |
| 2 | Source 1: Organic social | 7 | 8 | 9 |
| 3 | Source 2: Direct outreach | 8 | 9 | 9.5 |
| 4 | Source 3: Producer seeding | 8 | 9 | 9.5 |
| 5 | Source 4: Music schools | 6 | 7 | 8 |
| 6 | Sources 5–8: Venue / community / SEO / referral | 6 | 7 | 8.5 |
| 7 | Lead qualification scoring model | 7 | 8.5 | 9 |
| 8 | Nurture sequence A (hot leads — personal) | 8 | 9 | 9.5 |
| 9 | Nurture sequence B (warm leads — automated) | 7.5 | 8.5 | 9 |
| 10 | Nurture sequence C (cold leads — minimal) | 7 | 8 | 8.5 |
| 11 | Metrics framework | 8 | 8.5 | 9 |
| 12 | 12-week execution calendar | 7 | 9 | 9 |
| 13 | "Never Buy Leads" principle | 10 | 10 | 10 |
| 14 | System coherence (cross-doc integration) | 8 | 8.5 | 9 |
| 15 | Founder usability (actionability for a solo operator) | 6.5 | 8 | 8.5 |
| | **Overall** | **7.5** | **8.7** | **9.2** |

---

## Dimension commentary

### 1. ICP definition: 9/10

The ICP table (follower range, activity recency, language, current tool, orientation) is specific enough to use as a filter at the point of research. The anti-ICP section is equally important — knowing who to exclude prevents wasted outreach on artists who will never convert.

The 500–50,000 follower range is deliberately broad at this stage. After 3 months of live data, the range will likely narrow — artists at 500–2,000 followers may under-convert because they have too small an audience to immediately feel the value of fan capture; artists at 20,000–50,000 may over-convert (more likely to pay, but also more likely to have managers who complicate the decision). At 50 paying artists, analyse the follower distribution of paying vs. churned users and tighten the range.

### 2. Source 1 — Organic social: 7/10

The content strategy is directionally right (comparison Reels, profile state demos, artist spotlights) but is currently a brief treatment. The Instagram and TikTok snapshot documents hold the full strategy. The lead generation doc correctly references those rather than duplicating.

Current gap: no hypothesis for Instagram → sign-up conversion funnel. The content drives profile visits to the artist's ABLE page — but what converts a viewer of a "before/after" Reel into clicking through to `ablemusic.co/start`? The call-to-action on content needs to be tested. Options: "Link in bio — try it free", "DM me 'ABLE' to get early access", "Comment 'page' for the link." Each will produce different response rates. Until tested, the organic social source is a brand-builder more than a direct acquisition channel.

Post-12-weeks score of 8 assumes: 3+ months of consistent content, first artist spotlight published, at least one Reel breaking 10k views and producing measurable sign-ups.

### 3. Source 2 — Direct outreach: 8/10

The strongest single acquisition channel in V1. The 300-artist research process is well-specified. The outreach framework is honest about expected response rates (10–20% reply rate from personalised DMs) and conversion rates (30–40% of replies sign up).

Current gap: the document does not specify the exact message copy — it gives the framework, but not the text. For a solo founder who will be writing 10–20 DMs per week, having 3 tested message variants to choose from (by genre, by artist size, by current bio link tool) would reduce the time-per-DM from ~10 minutes to ~3 minutes. That difference matters at volume.

Post-12-weeks score of 9 assumes: first 50 DMs sent, response rate data collected, message variants updated based on what got replies, and at least 5 sign-ups attributable to direct outreach.

### 4. Source 3 — Producer seeding: 8/10

The highest-ROI channel by significant margin. The strategy doc's producer seeding section is more detailed than the lead generation spec — there is some content in `docs/GROWTH_STRATEGY.md` that should be surfaced here (specifically: the Loom video follow-up sequence and the offer structure). The lead generation doc currently summarises correctly but should explicitly defer to the growth strategy doc for operational detail.

The affiliation commission structure (25% recurring) is competitive. The freelancer profile feature (planned) is the non-monetary incentive that will matter more to the right producers. The dependency is clear: producer seeding is stronger once the freelancer profile is live. In V1, the pitch is "be early, influence the product, get your artist clients on the best tool" — that is a real pitch if James has genuine credibility and the product genuinely works.

Post-12-weeks score of 9 assumes: at least 3 active producer partnerships, at least 10 artist sign-ups attributable to producer referrals, first producer affiliate commission paid.

### 5. Source 4 — Music schools: 6/10

Correct target list (BIMM, ICMP, ACM, Point Blank). Correct approach (student music society, not administration). Correct offer (group discount + workshop).

Current gap: no email template, no workshop outline, no specific contact names (the social media coordinator at each school changes annually). The spec gives the strategy but not the execution toolkit.

Post-12-weeks score of 7 assumes: one school approached with a specific contact named, one workshop offer made (even if not accepted). A "we have a workshop series" narrative is useful regardless of uptake — it signals that ABLE is invested in artist education, not just acquisition.

The March timing is imperfect (late in the academic year). Real activation for the school channel is September. Use March–August to build the relationship, deliver one workshop if possible, and be ready to activate the group discount in September when new students are setting up their digital presence.

### 6. Sources 5–8: 6/10

- **Source 5 (Venues):** Correctly flagged as Phase 2. No execution risk — it's deferred until venue relationships exist.
- **Source 6 (Communities):** The 30-day build rule is the right instinct. The specific subreddits and Facebook groups are correctly identified. What's missing: a content bank — specific posts that are genuinely useful for these communities, unrelated to ABLE, that James can post during the 30-day build phase. Without this, the 30-day rule feels like waiting rather than doing.
- **Source 7 (SEO):** Correctly deferred to Phase 2. The 5 article titles from `GROWTH_STRATEGY.md` are the right starting point. No additional work needed here until Month 2.
- **Source 8 (Referral loop):** The mechanic is correct. The 12-week calendar triggers it at Week 11–12. One thing missing: the in-product prompt copy in admin.html needs to be specified. "Know another artist who'd get this? Your page, their page — both grow." — this copy should be added to the admin.html spec, not just referenced here.

Post-6-months score of 8.5 assumes all four sources are activated in sequence: community channels live by Month 2; referral loop live by Month 3; SEO articles live by Month 3–4; venues and school partnerships active by Month 6.

### 7. Lead qualification scoring model: 7/10

The scoring model is manual in V1 — a deliberate trade-off. The signals are correct (Spotify import, release date set, return visit, referral source). The score tiers (hot/warm/cold at 100+/50–99/<50) are intuitive.

Current gap: the model is not calibrated to real data. It is a hypothesis. Some signals may be over-weighted (email domain +10 is probably too low to matter) and some under-weighted (returning within 7 days may be the strongest retention signal and worth +25 rather than +20). After 50 sign-ups with outcome data (paid vs. churned), recalibrate the model.

Automation path: when there are 20+ sign-ups per week, the manual scoring becomes unsustainable. PostHog can track most of these signals automatically. A Supabase trigger that calculates the score and routes the lead to the right sequence is a one-day build. The spec is ready for that — the manual phase is just to validate the signals first.

### 8. Nurture sequence A — hot leads: 8/10

The four-touch personal sequence (Hour 1, Day 2, Day 5, Day 14) is correctly designed for high-score leads. The copy examples are in ABLE's register — specific, warm, data-backed. The Day 14 data-back ("Your page has had X views") is the strongest touch because it closes the loop between effort (setting up the page) and outcome (people actually visiting).

Current gap: the sequence relies on James's memory and manual execution. Without a CRM or even a simple spreadsheet tracking which artists are in the sequence and where, touches will be missed. Add a "Sequence A tracking" column to the 300-artist spreadsheet: last_touch_date, next_touch_due, sequence_stage.

### 9. Nurture sequence B — warm leads: 7.5/10

The six-touch automated sequence (Hour 0 through Day 30) is well-designed. The branching on import source (Spotify / Linktree / scratch) at Hour 0 is the most important personalisation in the system — it makes the first email feel specific rather than generic.

Current gap: the Day 7 email ("Your page this week") requires real analytics data to be meaningful. The conditional copy ("0 fans = here's what to do / 1–5 fans = good start / 5+ fans = strong first week") requires the email system to pull from Supabase at send time. Until Supabase is live, this email is either a static "check your dashboard" prompt or it requires a manual data-check before sending. Mark this email as "requires Supabase integration" in the email system spec.

### 10. Nurture sequence C — cold leads: 7/10

Correctly minimal. The 90-day cut-off is right — do not keep emailing people who are not engaging. The Day 60 "while you were away" email is the best cold lead re-engagement copy because it shows value accruing passively — a genuine reason to come back.

Current gap: cold leads who become warm later (e.g. they sign up cold, then six months later release music and return to admin.html) need to re-enter a more relevant sequence. The current spec does not address this re-activation path. Add a "re-activation trigger" to the system: if a cold lead (90-day inactive) returns to admin.html, re-enter them in Sequence B from Day 1 with an import-source branch appropriate to their current state.

### 11. Metrics framework: 8/10

The six-metric weekly dashboard (qualified leads/week, source breakdown, conversion rates, time to conversion, CPL, producer leads) is lean and actionable. The three-column milestone targets (Month 1 / Month 3 / Month 6) give clear success definitions.

Gap: "New qualified leads/week" requires the scoring model to be running. In Week 1, with no scoring infrastructure, the metric defaults to "new sign-ups/week" — which is fine as a starting proxy. Make this explicit.

### 12. 12-week execution calendar: 7/10

The calendar is correctly structured: research first (Weeks 1–2), outreach next (Weeks 3–4), channel analysis (Weeks 7–8), content refinement (Weeks 9–10), product mechanics (Weeks 11–12). The sequence is right.

Current gap: no time budget. "Build the 300-artist spreadsheet" and "First producer partnership" are both listed as week-level tasks without hour estimates. A founder with a day job needs to know if this is a 2-hour or a 20-hour task. Add estimated hours to each week.

Post-12-weeks score of 9 assumes the calendar was executed roughly as planned — some slippage is expected and acceptable. The calendar is a guide, not a contract.

### 13. "Never Buy Leads" principle: 10/10

This section is correct, complete, and written in the right tone. It is not a set of rules — it is an argument for why the slower path is the right path, given the specific dynamics of the independent music community. The strategic case (tight-knit scene, news travels fast, brand depends on trust) is more persuasive than the ethical case. Both happen to point to the same answer.

This section should remain unchanged regardless of how the system evolves. It is the anchor.

### 14. System coherence: 8/10

The four integration notes at the bottom of LEAD-GENERATION.md correctly identify the dependent systems: email, CRM, analytics, growth loop. The lead scoring model is compatible with the CRM spec's field definitions.

Gap: the lead generation calendar (Weeks 11–12: referral mechanics) depends on the email system P0 being complete by Week 3 (artists must receive a confirmation email when fans sign up, or the fan sign-up value is not demonstrated to the artist). This dependency is not currently stated explicitly in the calendar. Add a prerequisite note to Week 3 in the calendar.

### 15. Founder usability: 6.5/10

The system is complete and correct, but it is long. For a solo founder executing this alongside building the product and maintaining a day job, 3,500 words before the first action is a real friction point. The document is currently written for completeness (10/10 spec quality) rather than usability (which requires a different entry point).

Post-12-weeks score of 8 assumes the "3 things to do first" executive summary (identified in PATH-TO-10.md as the highest-priority change) has been added to the top of LEAD-GENERATION.md.

---

## What makes this 10

10/10 requires the following, none of which can be achieved by spec alone:

### 1. Channel data

After 12 weeks of execution: which source produced the highest-scoring leads? Which nurture sequence produced the best conversion rate? Which DM message got the most replies? The answers will require updating the scoring model, the source priorities, and the sequence copy. The 10/10 system is the current spec plus 3 months of real data.

### 2. 20+ qualified leads/week sustained

Not a burst — a sustained pipeline. 20 qualified leads per week requires at least 2–3 channels active simultaneously (typically: direct outreach + producer seeding + one passive channel). If only one channel is working, the pipeline is fragile. 10/10 requires channel diversification proven by data.

### 3. Referral loop compounding

The artist referral prompt in admin.html and the "Made with ABLE" footer are live. Attribution is tracked via UTM parameters. At least 15% of new sign-ups are attributable to referrals from existing artists. This signals the pipeline is self-sustaining — not just dependent on James's outreach.

### 4. Sequence B open rates above industry benchmark

Transactional email in the music space: industry benchmark open rate ~25–35%. Sequence B should outperform this because the subject lines are human ("Your page this week" / "One thing to try today") and the from-name is ABLE, not "ABLE Platform Notifications." If open rates are below 25%, the subject lines or the from-name need to be reconsidered.

### 5. At least 2 active producer partnerships producing regular sign-ups

"Active" means: the producer has set up their own profile, they have referred at least 3 artists who signed up, and they are receiving affiliate commissions or free Artist Pro credits. If 2 producers are consistently producing 1–2 sign-ups per month each, the channel is working and deserves more investment (find 10 more producers).

---

## The most important finding

**The lead generation system has a structural dependency that is not yet called out clearly enough: it cannot operate effectively without the email system P0 being live.**

Here is why this matters:

The entire value of ABLE for an artist is: "Your fans sign up, you own the list, you can contact them." If the fan confirmation email is not sending, an artist who signs up, drives traffic to their profile, and collects fan emails has no evidence that the product is working. They see a number in their admin.html fan list — but there is no email in their fan's inbox. There is no closed loop.

The direct outreach sequence (Source 2) will start producing sign-ups in Weeks 3–4. Those sign-ups need to receive a fan confirmation email when their first fan signs up — otherwise the experience is incomplete and retention will be low. The email system P0 is not a nice-to-have by Week 3. It is a prerequisite.

**Consequence for prioritisation:** Before Week 3 of the lead generation calendar, complete email system P0 (Netlify function, Resend account, DNS records, four email templates). See `docs/systems/email/PATH-TO-10.md` for the P0 checklist. This is a one-sprint piece of work — probably 2–3 focused days. It is the bottleneck that makes everything else more valuable.

The lead generation system is ready to execute. The only dependency that stands between the current state and the first 20 qualified leads in the pipeline is: (1) build the 300-artist spreadsheet (10 hours), (2) complete email P0 (2–3 days), and (3) send the first 10 personalised DMs. Everything else in this document is infrastructure for the scale phase — not the Day 1 phase.

Start there.
