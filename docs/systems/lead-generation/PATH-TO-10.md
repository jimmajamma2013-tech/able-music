# ABLE — Lead Generation System — Path to 10
**Date: 2026-03-16**
**System: Lead Generation**
**Current score: 7.5/10 (spec quality) → Target: 9/10 (executed)**
**Ceiling: 10/10 (data-informed iteration at scale)**

---

## The 20-Angle Analysis

### STAGE 0 CONTEXT

**User type who encounters this system first:** James — the solo founder building the pipeline manually before any team exists.
**Their primary fear at this moment:** "I'll do a lot of outreach and nobody will convert. I'm building in a vacuum."
**The one thing this system must make them think/feel/do:** Execute the next specific action — not be overwhelmed by the full system.

---

### 1. FIRST IMPRESSION (Is the system immediately actionable?)
**Score: 8/10**

The LEAD-GENERATION.md opens with the ICP — the first decision gate. Before reading a single tactic, the reader understands who they are building the pipeline for. That is the right orientation. The filter comes before the funnel.

**Path to 10:** The document is long. An executive summary at the top — 6 bullet points covering the highest-priority actions for the next 30 days — would make the system immediately usable on Day 1 without reading the full 3,000 words.

---

### 2. PRIMARY JOB (Does the system deliver its one job?)
**Score: 9/10**

The primary job: produce 20 qualified leads per week by Month 3 from channels that cost near zero. The system delivers: 8 sources, qualification model, nurture sequences, a 12-week calendar. All the components of a working pipeline are here.

**Path to 10:** The 12-week calendar needs specific owner hours estimated per task. "Build the 300-artist spreadsheet" is clearly defined; "10 DMs per week" does not specify time cost. A realistic time budget (e.g. "Weeks 1–2: ~8 hours total research") would help James plan the work against the job he already has.

---

### 3. COPY VOICE (Does every line sound like ABLE?)
**Score: 9/10**

The copy follows ABLE's register: direct, specific, honest about what doesn't work. No "grow your pipeline." No "optimise your funnel." The outreach sequence examples use ABLE-standard language — first-person, referencing specific work, no templates.

**Path to 10:** Two places where SaaS-doc voice creeps in: "The conversion rate from footer click to sign-up is expected to be low (1–3%)" reads like a metrics spreadsheet. And "This is a Phase 2 play" repeats 3 times and starts to sound like boilerplate. Vary the language.

---

### 4. VISUAL HIERARCHY (Can a scanner understand it?)
**Score: 8/10**

The six-part structure is clear: Sources → Qualification → Nurture → Metrics → Calendar → Principle. Tables are used well for the lead scoring model and the metrics tracker. The 12-week calendar is readable.

**Path to 10:** The nurture sequences (Part 3) are long and would benefit from a visual summary table at the top: Sequence A / B / C vs. score tier / number of touchpoints / tone. A reader scanning Part 3 needs orientation before diving into the email copy.

---

### 5. CTA CLARITY (Is the next action clear for each section?)
**Score: 7/10**

The 12-week calendar tells James what to do and when. But the other five parts describe the system without always closing with a clear action.

**Path to 10:** Each of Parts 1–6 should end with a one-line "Start here:" note. Example: Part 1, Source 2 (Direct Outreach) should end with "Start here: Open Google Sheets and create the 300-artist template with the 8 columns listed above." This removes the gap between reading and doing.

---

### 6. FEAR RESOLUTION (Does this reduce the founder's primary fears?)
**Score: 8/10**

The document addresses the "building in a vacuum" fear via the manual outreach guidance (real responses expected, realistic conversion rates). It addresses the "I'll do something that harms the brand" fear via the "Never Buy Leads" principle. It addresses the "this will take forever" fear via the realistic 12-week timeline.

**Path to 10:** The fear not addressed: "What if none of these channels work?" The document assumes sources work but does not give clear decision rules for when to kill a channel and redirect effort. Add a "Kill criteria" row to the channel scorecard: e.g. "If Source 2 direct outreach produces fewer than 1 sign-up per 20 DMs after 4 weeks, reassess the ICP filter or the message, not the channel."

---

### 7. MOBILE EXPERIENCE (Is this document legible and actionable on a phone?)
**Score: 7/10**

The tables (lead scoring model, metrics tracker) are wide and will require horizontal scrolling on mobile. On a 375px screen, a table with 6 columns is not readable.

**Path to 10:** For tables that are likely to be referenced on-the-go (the lead scoring model, the weekly metrics), produce a simplified mobile version — a bulleted list instead of a table for the lead scoring model, a 3-column (not 6-column) version of the metrics tracker.

---

### 8. PERFORMANCE (Is this document lean and findable?)
**Score: 8/10**

Three files (LEAD-GENERATION.md, PATH-TO-10.md, FINAL-REVIEW.md) in a dedicated `/docs/systems/lead-generation/` directory following the established pattern. No images or heavy files. Loads instantly.

**Path to 10:** The CONTEXT.md authority table does not yet reference lead-generation. Add the system to the authority table so agents and James can find it. One line: `| Lead generation | docs/systems/lead-generation/LEAD-GENERATION.md | spec complete — pre-execution |`.

---

### 9. EMOTIONAL RESONANCE (Does the system make James feel capable, not overwhelmed?)
**Score: 7/10**

The 12-week calendar is grounding — it breaks an intimidating "build a pipeline from nothing" problem into specific weekly tasks. The producer seeding section is motivating — the ROI calculation (20 producers × 10 artists × 10% = 20 sign-ups) makes the effort feel worthwhile.

**Path to 10:** The document is currently ~3,500 words. For a solo founder who is also building the product, reading a 3,500-word strategy doc before taking action is a real friction point. An explicit "If you read nothing else, do these 3 things first" section at the top of the document — 3 bullets, each a specific action — would convert the emotional state from "this is a lot" to "I know what to do today."

---

### 10. THE "13-YEAR-OLD" TEST (Would a non-technical person be confused?)
**Score: 8/10**

The document uses no jargon that requires a marketing background. "UTM parameters" appears without explanation — add "(the ?ref= tracking tag at the end of a URL)" inline. "CAC" (cost per acquisition) appears once — either expand on first use or replace with "cost to acquire a paying artist."

**Path to 10:** Replace acronyms on first use. Define "ICP" explicitly the first time it appears (it is defined later, but the acronym precedes the definition). Move the full ICP table to the very top, before any section header — it is the filter for everything.

---

### 11. TRUST SIGNALS (Does the system build confidence in the tactics?)
**Score: 7/10**

The response rates quoted for direct outreach (40–60% DM open rate, 10–20% reply rate) are realistic but unverified — they come from general outreach benchmarks, not ABLE-specific data. The producer seeding ROI calculation (20 producers → 200 leads → 20 sign-ups) is reasonable but unproven.

**Path to 10:** Add a "Confidence level" note to each source:
- Source 2 (Direct outreach): "Confidence: high — based on personal outreach patterns in similar B2C SaaS products and the founder's existing network"
- Source 3 (Producer seeding): "Confidence: high — based on the ABLE strategy doc's growth engine section; confirmed as the primary acquisition hypothesis"
- Source 5 (Venues): "Confidence: medium — untested; depends on venue relationship access"

This prevents the system from being treated as a guaranteed blueprint.

---

### 12. CROSS-PAGE COHERENCE (Does this fit with adjacent systems?)
**Score: 8/10**

The integration notes section at the bottom of LEAD-GENERATION.md correctly cross-references email, CRM, analytics, and growth loop systems. The lead scoring model is designed to be compatible with the CRM spec (fields map to Supabase schema).

**Path to 10:** The lead generation calendar should reference the email system build calendar explicitly. "Week 11–12: Referral mechanics go live" requires the email system P0 to be complete (fan confirmation email must be sending) for the fan sign-up loop to convert. Add a dependency note: "Prerequisite: email system P0 complete before Week 3 outreach begins — sign-ups must receive a confirmation email."

---

### 13. THE SWITCHER PATH (Does this help an artist currently on Linktree?)
**Score: 9/10**

The ICP explicitly includes "currently using Linktree or nothing" as a qualifier. Direct outreach guidance references Linktree users as warm leads (bio link tool visible in their profile). The nurture sequence variant for Linktree imports is specific and relevant.

**Path to 10:** The Linktree import welcome email variant in Sequence B could be stronger: "We've moved your links across" is fine, but the higher-value message is "Here's what your page can do now that it couldn't on Linktree." Name one specific thing — the release countdown — in that first email. Give them a reason to feel the switch was worth it immediately.

---

### 14. SOCIAL PROOF (Does this system earn belief in ABLE before the first artist signs up?)
**Score: 6/10**

The system is designed for pre-social-proof (0 artists on the platform). The tactics that work without social proof (direct personal outreach, producer relationships) are correctly prioritised. But the document does not address the question artists will ask in the first 30 DMs: "Who else is on ABLE?"

**Path to 10:** Add a short section to the outreach guidance: "Handling the 'who else is on ABLE?' question." Answer: be honest. "We're in early access. The artists on it now are artists I've personally set up — I can show you their pages. The product is real. The community is small and it will grow." Honesty here is more persuasive than a list of fake case studies.

---

### 15. ACCESSIBILITY (Is this system accessible to a solo founder with time constraints?)
**Score: 7/10**

The 12-week calendar is well-structured, but the cognitive load is high. "Weeks 1–2: Build the 300-artist spreadsheet" is a significant multi-hour task — it needs to be broken into daily segments to be actionable for a founder who has a day job.

**Path to 10:** For each week in the calendar, add a "Daily time commitment" note. Example: "Weeks 1–2: ~1 hour per day. Day 1: Set up the Google Sheet template. Days 2–5: 30 Bandcamp artists per day. Days 6–8: 30 SoundCloud artists per day." This makes the plan compatible with reality.

---

### 16. ANIMATION QUALITY (Not applicable — document, not UI)
**Score: n/a**

---

### 17. THE NORTH STAR TEST (Does this feel like ABLE, not "a growth hacking document"?)
**Score: 8/10**

The "Never Buy Leads" section is the strongest north star moment in the document. It articulates why the slower path is the right path — not as a values statement, but as a strategic argument about how trust compounds in a tight-knit community. That is ABLE's voice applied to growth strategy.

**Path to 10:** The producer seeding section should more explicitly reflect ABLE's relationship philosophy. Currently it reads as strategic. Add one line: "This is not a referral programme. It is a seeding strategy. The difference: in a referral programme, the incentive is the relationship. In a seeding strategy, the relationship is the incentive." This is the kind of clarity that distinguishes ABLE's approach from a generic B2B SaaS growth doc.

---

### 18. AI RED TEAM (What would kill this system's effectiveness?)
**Score: n/a — threat analysis**

1. **James burns out on manual outreach and abandons the system by Week 6.** Kill: The 12-week calendar assumes consistent 1-hour-per-day execution. If that's not realistic, the system needs a 4-hour-per-week minimum viable version that still produces results. Add this explicitly.

2. **The producer seeding target producers are not interested in the affiliate commission.** Kill: Commission is the fallback offer. The primary value proposition must be the freelancer profile feature — being discoverable via credits on artist pages. If the freelancer feature is not built yet, the producer pitch is weaker. Note the dependency clearly.

3. **The first 10 DMs get no reply and James loses confidence in the channel.** Kill: Low reply rates in the first 2 weeks are normal — the message is being refined. Add a "Week 2 review checkpoint" to the calendar: "If fewer than 2 replies from 20 DMs, review the message copy before sending more. Do not increase volume as a response to low response rates."

4. **Instagram algorithm changes reduce organic reach for comparison content.** Kill: Diversify content types early. The comparison Reels are high-impact but algorithm-dependent. Personal content (founder building in public) and community content (real artist spotlights) are lower-algorithm-dependency. Balance the content mix from Week 3 onwards.

5. **A competitor (Linktree, Beacons) notices ABLE's growth and specifically DMs the same artists.** Kill: The personal relationship is the moat. If a competitor sends a template DM and James has already had a real conversation with the artist — James wins. Prioritise depth over breadth in the first 50 outreaches.

---

### 19. THE SINGLE MEMORY (If James reads this once and forgets 90%, what must stick?)
**Score: 8/10**

The single memory this system must leave: **Producers are the fastest path.** One producer with 30 artist clients who genuinely recommends ABLE is worth 3 months of Instagram content. Every other channel should be running alongside producer outreach — not instead of it.

**Path to 10:** The document does not currently have a "key insight" callout. Add one at the very top, after the intro paragraph: "The highest-ROI action in this entire document: identify 5 UK producers who work with independent artists, get on a call with each of them, and give them a free Artist Pro account. Everything else in this document can wait. This cannot."

---

### 20. BIG PICTURE CONNECTION (Does this serve the 12-month arc and MRR goal?)
**Score: 9/10**

The metrics section maps directly to the ABLE_STRATEGY.md milestones: 25 sign-ups by Month 1, 50 active pages by Month 3. The channel scoring in GROWTH_STRATEGY.md (producer seeding: Priority 1; "Made with ABLE" loop: Priority 4) is reflected in this document's source ordering and 12-week calendar.

**Path to 10:** Add a one-row summary to the metrics table: "MRR contribution at each milestone." This connects the lead generation work directly to the job exit number (£5,000 MRR). Example: "Month 3: 20 qualified leads/week → if 8% convert to paid within 30 days = ~2 new paying artists/week → ~26 new paying artists in Month 3 alone → at £9/mo average = ~£234 additional MRR from Month 3 acquisition." That connection — between weekly outreach and the exit trigger — is motivating and measurable.

---

## SCORE SUMMARY

| Angle | Score | Priority |
|---|---|---|
| 1. First impression | 8/10 | Medium |
| 2. Primary job | 9/10 | Low |
| 3. Copy voice | 9/10 | Low |
| 4. Visual hierarchy | 8/10 | Medium |
| 5. CTA clarity | 7/10 | High |
| 6. Fear resolution | 8/10 | Medium |
| 7. Mobile experience | 7/10 | Medium |
| 8. Performance | 8/10 | Medium |
| 9. Emotional resonance | 7/10 | High |
| 10. 13-year-old test | 8/10 | Medium |
| 11. Trust signals | 7/10 | High |
| 12. Cross-page coherence | 8/10 | Medium |
| 13. Switcher path | 9/10 | Low |
| 14. Social proof | 6/10 | High |
| 15. Accessibility | 7/10 | High |
| 16. Animation quality | n/a | — |
| 17. North star | 8/10 | Medium |
| 18. AI red team | — | — |
| 19. Single memory | 8/10 | Medium |
| 20. Big picture | 9/10 | Low |
| **Average** | **7.9/10** | |

---

## THE 5 HIGHEST-IMPACT CHANGES

1. **Add a "3 things to do first" executive summary at the top of LEAD-GENERATION.md.** Remove the cognitive load of a 3,500-word document from a solo founder who needs to act. Three specific actions, each takes less than a day. This is a 15-minute edit that changes how actionable the entire system feels.

2. **Add "Kill criteria" to each acquisition source.** Currently the system describes what to do but not when to stop. A clear "if this source produces fewer than X results after Y weeks, reassign time to Source Z" decision rule prevents the sunk-cost trap of continuing low-performing outreach out of hope.

3. **Address the "who else is on ABLE?" objection explicitly in the outreach guidance.** This is the first question every artist will ask. Providing a specific, honest answer that James can give on Day 1 (before any real case studies exist) prevents avoidance of outreach and improves conversion.

4. **Break the 12-week calendar into daily time commitments.** "Weeks 1–2: Build a 300-artist spreadsheet" is a project, not a task. Breaking it into "Day 1: 1 hour — set up the sheet template" → "Day 2: 1 hour — 30 Bandcamp artists" makes the calendar compatible with a founder's actual day.

5. **Add a "key insight" callout for the producer seeding channel.** Producer seeding is the highest-ROI tactic in the entire document. It should be visually and structurally distinct from the other sources — not buried as Source 3 in a flat list. Move it to the top of the sources section, or add a bold callout at the start of Part 1 that directs the reader there first.
