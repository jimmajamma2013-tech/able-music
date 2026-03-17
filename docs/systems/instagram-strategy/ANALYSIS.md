# ABLE — Instagram Strategy System Analysis
**Date: 2026-03-16**
**Author: Assessment of INSTAGRAM-DATA-AND-LEADS.md, PATH-TO-10.md, FINAL-REVIEW.md**
**Stage: Pre-execution — strategy complete, zero posts published under this framework**

---

## Current State Assessment

ABLE's Instagram strategy is the most operationally complete system in the suite. FINAL-REVIEW.md scores it 9.6/10. The PATH-TO-10.md identifies five specific gap-closers, none of which block execution. The strategy can be started today with zero additional infrastructure.

The document answers three questions with unusual precision: what Instagram data is actually useful (rather than what Instagram makes easy to track), how to convert existing followers into ABLE sign-ups (without the process feeling like a funnel), and how to maintain consistency without becoming a content machine. The strategy is honest about its limits: in 30 days, James should expect 1–3 direct sign-ups, not 50.

The strategy's distinguishing quality is its alignment with ABLE's copy philosophy. It does not treat artists as leads. The DM framework prohibits generic phrases. The "70% problem-awareness, 20% product, 10% partnerships" content ratio enforces a brand-value-first approach. This is not a social media strategy bolted onto a product — it is an extension of the product philosophy through a social channel.

The gap to 10/10 is entirely implementation: the Graph API setup has a known friction point, the content bank in James's voice hasn't been written, the n8n notification workflow hasn't been built, the PostHog dashboard view hasn't been created, and the first 10 DMs haven't been sent. None of these are blockers for starting.

**What exists and is correct:**
- Four-metric tracking system (reach, profile visits, link clicks, story tap rates) tied to specific decisions
- Four data source tiers (Insights → data download → Graph API → third-party) with correct sequencing
- Three content types defined (Type A: problem, Type B: product, Type C: artist feature) with structural rules
- 70/20/10 content ratio enforced
- Warm lead identification protocol (daily 20-minute engagement ritual, warm list)
- DM framework with worked good/bad examples
- 72-hour Story repost mechanic
- UTM structure for bio, story, and post links
- PostHog event spec for attribution
- n8n warm lead notification workflow spec
- Clear prohibition on everything that would feel like marketing to an artist

**What does not yet exist:**
- Graph API token setup
- Content bank in James's actual voice
- n8n workflow for Instagram-sourced sign-up alerts
- PostHog Instagram funnel dashboard
- First DM sent under this framework
- Week 0 baseline metrics captured

---

## 20-Angle Scoring

### 1. Strategy Premise and Target Accuracy (1–10)
**Score: 10**

The premise is specific and correct: James has an existing Instagram following. Some percentage are independent artists. A smaller percentage are the exact artist ABLE is built for. The job is to identify that subset, earn their trust with genuinely useful content, and convert them at the right moment.

The distinction between this and a generic "grow your following" strategy is important: follower count is not the metric. Artist sign-ups are the metric. A strategy optimised for follower growth would drive the wrong behaviour (broad content, growth hacks, hashtag farming). This strategy optimises for artist identity (who follows you matters more than how many).

The target demographic specification (independent musicians who follow James and engage with content about the reality of being an independent artist in 2026) is precise enough to act on. It prevents the mistake of trying to reach "all musicians" — which produces content that resonates with nobody specific.

### 2. Metric Selection Quality (1–10)
**Score: 9**

The four metrics (reach per post, profile visits from each post, link-in-bio clicks, story tap-forward/back rates) are correctly selected as decision-drivers rather than vanity metrics:

- Reach per post → "double down on content types with 3× average reach"
- Profile visits → "which posts drive curiosity about you specifically" (trust signal, not impression signal)
- Link-in-bio clicks → "the single most important conversion metric on Instagram" (direct attribution to ablemusic.co traffic)
- Story tap-forward rate → "something in that story is wrong — too long, wrong content"

The omission of follower count as a tracked metric is deliberate and correct. Follower count measures popularity; it does not measure whether the right people are following. The demographic check (follower age, location, top cities from Insights) as a periodic audit rather than a primary metric is the right framing.

Gap: the four metrics are defined but the weekly review ritual is not time-boxed. Without a clear "10 minutes on Sunday to pull and log these four numbers" specification, the tracking can drift into inconsistency. The FINAL-REVIEW.md sign-off checklist includes "Week 0 baseline captured" — the ongoing rhythm should be equally explicit.

### 3. Data Source Tier Logic (1–10)
**Score: 8**

The four-tier data source hierarchy (native Insights → JSON export → Graph API → third-party tools) is correctly ordered by setup effort and data richness. The key insight: the core four metrics are accessible in the native app without any API setup. Metricool can replace the Graph API for most purposes at free tier.

The JSON data export use case (identify which historical posts generated highest comment engagement, cross-reference follower list against known artists manually) is a genuinely useful technique that most social media strategies skip. Building a database of "engaged artists" before sending a single DM is the right preparation.

Gap (noted in PATH-TO-10.md): the Graph API setup instructions hit a friction point at step 3 (Facebook Business Manager configuration). The two most common failure points (Instagram account not set to Business type before connecting, access token expiry after 60 days) are identified but not yet added to INSTAGRAM-DATA-AND-LEADS.md as troubleshooting notes. Until these are added, the API setup guidance will produce frustrated users at a predictable point.

### 4. 70/20/10 Content Ratio Enforcement (1–10)
**Score: 9**

The three content types map to the 70/20/10 ratio correctly:
- Type A (problem posts, 70%): zero ABLE mentions. The value is entirely educational. This is the trust-building layer.
- Type B (product-in-use, 20%): 100% ABLE. Showing the product in action.
- Type C (artist features, 10%): 90% about the artist, one ABLE mention. Social proof without promotion.

The FINAL-REVIEW.md correctly identifies a cadence implication: if posting 3 times per week, one Type B per week is 33% ABLE content — above the 20% ceiling. The correct cadence is one Type B every 10–14 days. This recalculation should be in the main document, not just in the review.

The content ratio is a structural rule, not a flexible guideline. Breaking it consistently would shift ABLE's Instagram presence from "useful to artists" to "promotion of a product" — and artists would unfollow. The ratio is the mechanism that prevents content decay.

### 5. Warm Lead Identification Process (1–10)
**Score: 10**

The warm lead mechanics section is rated 10/10 in PATH-TO-10.md — "no gap identified." The daily 20-minute engagement ritual, the 72-hour Story repost mechanic, and the warm list format (simple document noting artist name, handle, what they posted about, last engagement) are correct and implementable.

The specific qualification criteria for adding someone to the warm list (engaged twice in the last 30 days AND posts about their own music AND follows James, not just ABLE) prevents the list from becoming too broad to be actionable. An artist who liked two posts is not the same signal as an artist who commented twice with substantive engagement.

The observation that "independent musicians have a finely tuned radar for being marketed at" and that the strategy must therefore feel like a sustained, honest conversation rather than a lead generation campaign is the most important premise in the entire document. It explains why the 20-minute daily ritual exists: it is not automation, it is attention.

### 6. DM Framework Quality (1–10)
**Score: 9**

The DM framework is the highest-leverage element of the strategy. The worked good/bad examples are the most important feature — they show the difference between a genuine message and a template. The prohibition on generic phrases ("excited to share," "game-changing," "for artists like you") enforces ABLE's copy register in personal outreach.

The three-message sequence (initial DM → follow-up if 5-day no reply → conversion offer) is correctly designed. The initial DM requires a specific reference to the artist's work — not a general compliment. This means James must actually know the artist's music before messaging, which is a feature (ensures quality of outreach) not a bug.

Gap: the framework specifies what to say and what not to say, but does not address the "who else is on ABLE?" objection — the first question every artist will ask. PATH-TO-10.md in the lead generation system identifies this as a critical gap (Handle the social proof objection explicitly). The Instagram DM framework should include a suggested honest response: "We're early — about [N] artists have set up pages so far. I can show you a couple if you'd like. The product is real; I've been using it to build out my own presence."

### 7. UTM Attribution Architecture (1–10)
**Score: 9**

The UTM structure is complete and consistent:
- Bio link: `?utm_source=instagram&utm_medium=bio&utm_campaign=always-on`
- Story link: `?utm_source=instagram&utm_medium=story&utm_campaign=[content-type]`
- Post link (if applicable): `?utm_source=instagram&utm_medium=post&utm_campaign=[content-type]`

The PostHog event spec (page_view, cta_click, fan_capture, artist_signup, each with utm_source, utm_medium, utm_campaign properties) closes the attribution loop from Instagram engagement to ABLE sign-up.

Gap (noted in PATH-TO-10.md): the PostHog dashboard view is specified but not built. The UTM data is being captured (assuming PostHog is live in the product) but the funnel view — Instagram source → landing page visit → artist sign-up → activation — is not surfaced in a visible dashboard. Without the dashboard, the data exists in PostHog but is not actionable on a weekly review.

### 8. Automation Scope and Limits (1–10)
**Score: 8**

The spec correctly defines what to automate (n8n notification when an Instagram-sourced sign-up occurs in Supabase) and what not to automate (DMs, engagement, relationship-building). The ToS risk for cross-platform auto-posting is explicitly flagged.

The n8n workflow spec (Supabase webhook → n8n → Telegram notification: "New Instagram-sourced sign-up: [Name], [Source handle if known], [Profile completeness]") is the right scope of automation: it alerts James when the warm lead funnel has produced a sign-up, enabling him to reach out personally within 24 hours while the intent is high.

Gap: the n8n workflow is described at the concept level but not yet implemented. The exact n8n node configuration (Supabase Trigger → IF utm_source == 'instagram' → Telegram Bot) needs to be built and the resulting workflow exported to JSON and committed to the repo (per PATH-TO-10.md recommendation). Until built, the Telegram notification isn't happening.

### 9. Content Bank Gap (1–10)
**Score: 6**

The three content types are defined with structural rules (Type A: personal experience + broader truth, no ABLE mention; Type B: specific feature, real example, CTA; Type C: artist story, embed with permission, one ABLE mention). The rules are sufficient to understand the format.

What's missing: worked examples in James's actual voice. The difference between "a post that follows the Type A structure" and "a post that sounds like James wrote it" is not captured by structural rules alone. A content bank of 10 drafted posts (3 Type A, 3 Type B, 2 Type C, 2 cross-platform versions) would serve as calibration examples for future posts.

This is explicitly a PATH-TO-10.md gap: "Create CONTENT-BANK.md in this directory with 10 drafted posts in James's actual voice." This is a 90-minute writing session that would close the gap and provide reference examples for any future agent-assisted content creation.

The absence of this bank doesn't block execution — James can write posts from the structural rules. But the first 10 posts will calibrate the voice better than the structural rules alone.

### 10. Relationship to Other Acquisition Channels (1–10)
**Score: 9**

The FINAL-REVIEW.md is explicit about what Instagram cannot do: it cannot replace producer seeding (higher-quality, trust-pre-installed leads), cannot grow the account quickly if the existing following lacks independent artists, and cannot compensate for a mediocre product experience.

This honest scoping prevents over-investment in Instagram at the expense of higher-leverage activities. Instagram is the awareness layer; producer seeding is the conversion layer. Both must run. Instagram is not optional (warm list compounds over months) and is not sufficient alone.

The integration point with the lead generation system is correctly noted: Instagram-sourced leads enter the same qualification model and nurture sequence framework as leads from other sources.

### 11. Solo Founder Time Budget (1–10)
**Score: 9**

The FINAL-REVIEW.md calculates the weekly time budget:
- 3–4 posts per week: approximately 90 minutes content creation
- 20-minute daily engagement ritual: 140 minutes/week
- 10-minute weekly metrics review: 10 minutes
- Total: approximately 3.5–4.5 hours per week

This is sustainable alongside a full-time job for a founder in the build phase. The first 4-week ramp (Week 1: setup tasks, Week 2: first posts + warm list + first 3 DMs, etc.) is specifically costed in the FINAL-REVIEW.md — approximately 90 minutes per week for the first month.

The content production rule ("one piece per week, at most" from the growth strategy) is aligned with this budget. The warning against over-scheduling is correct: committing to daily posting before the voice is established creates pressure to publish below-quality content.

### 12. Independence from Algorithm (1–10)
**Score: 8**

The warm lead system (daily 20-minute engagement ritual, personal DMs, Story interactions) is largely algorithm-independent — it operates through direct relationship rather than organic reach. The UTM link in the bio captures direct traffic. Story links go directly to engaged followers.

The Reel content (Type B product demos) is algorithm-dependent — reach depends on how Instagram distributes the Reel. The spec acknowledges this: "comparison Reels are high-impact but algorithm-dependent." The mitigation (balancing with personal content that is lower algorithm-dependency) is noted.

Gap: the spec doesn't address what to do if Instagram significantly reduces organic reach for creator content (as happened to Facebook pages in 2014). The strategy should have an explicit "if organic reach drops below X threshold" trigger that adjusts the content mix toward Story-based and DM-based tactics, both of which are more direct and less algorithm-dependent.

### 13. Content Strategy and Copy Philosophy Alignment (1–10)
**Score: 10**

The strategy prohibits generic phrases throughout: "excited to share," "game-changing," "for artists like you" in DMs; any mention of "growth," "engagement," "audience building" in content. The content types require specificity (Type A: "what specifically happened to you, what specifically you learned, why that matters to artists specifically like you").

This alignment is rated 10/10 in PATH-TO-10.md with the specific note: "The word 'funnel' does not appear in any user-facing context." This level of copy discipline is rare in social media strategies.

### 14. Conversion Expectation Honesty (1–10)
**Score: 10**

The FINAL-REVIEW.md states the realistic 30-day outcome explicitly: 5–10 DM conversations with independent artists, 3–6 warm leads who have visited ablemusic.co, 1–3 ABLE sign-ups directly attributable to Instagram. This is deliberately not a large number.

The explanation is correct: the first 30 days establish the rhythm, the voice, and the warm list. The compounding happens in months 2–4 as the warm list grows, the content refines toward high-profile-visit posts, and the first artist features begin distributing ABLE to new audiences.

The statement "anyone expecting Instagram alone to produce 50 ABLE sign-ups in 30 days is misreading what this strategy is" prevents the enthusiasm trap that leads to either over-commitment (more than 4 hours/week) or abandonment when the first month produces 2 sign-ups.

### 15. Competitive Awareness (1–10)
**Score: 7**

The strategy correctly positions ABLE's Instagram presence as differentiated from Linktree's and Beacons' social media approaches: they post generic social media tips for creators; ABLE posts content specifically for independent artists about the realities of independent music. This is a narrow target with higher resonance.

Gap: the strategy doesn't address what happens if a competitor notices ABLE's approach and copies it. Linktree's social media team is large and could produce similar problem-awareness content at higher volume. The moat is James's personal credibility and specific knowledge of independent music — which cannot be copied by a corporate social media team. This should be stated explicitly: "the strategy works because James is a credible voice in the specific community, not because the content format is unique."

### 16. PostHog Integration Quality (1–10)
**Score: 8**

The PostHog event spec (page_view, cta_click, fan_capture, artist_signup with utm_source, utm_medium, utm_campaign) is complete and correctly maps Instagram attribution through the ABLE product. The UTM parameters pass through from Instagram → landing.html → start.html, allowing end-to-end attribution.

Gap: the PostHog dashboard spec is not written. Events are firing but the view ("Instagram as acquisition source → activation rate vs. other sources") doesn't exist. A PostHog funnel: `landing_page_visit (source=instagram)` → `artist_signup` → `first_fan_captured` would show the complete Instagram-to-value funnel. This is a 30-minute PostHog dashboard build.

### 17. Reel Production Quality (1–10)
**Score: 7**

The Type B product demo Reels (showing state-switching, showing fan capture in real-time, showing gig mode activation) are the highest-converting content type. The format guidance (60–90 seconds, hook in first 3 seconds, no text-only screens) is correct.

Gap: the spec describes what to show in the Reel but not how to produce it well. For a solo founder without video production experience, "show the product state switching" requires knowing: device to record on (screen capture vs. external camera), voiceover vs. text captions, aspect ratio (9:16 vertical for Reels), caption length and positioning. These production details belong in a short companion document or checklist that James can reference when producing the first Type B Reel.

### 18. Content Calendar vs. Responsive Publishing (1–10)
**Score: 7**

The strategy doesn't specify whether to use a content calendar (plan and schedule posts in advance) or responsive publishing (post when inspiration hits, with the structural rules as guidance). Both approaches work. The right answer for a solo founder depends on James's content creation style.

The best posting times note (from Insights: when your specific audience is active) implies responsive publishing adjusted to timing — not batch-scheduled. Metricool allows scheduling, which would enable batch production sessions (write 4 posts on Sunday, schedule them across the week) while maintaining the optimal timing.

The spec should make this choice explicit: batch production + scheduled posting, or responsive publishing. Both are compatible with the strategy; the choice affects the weekly workflow significantly.

### 19. TikTok Cross-Platform Strategy (1–10)
**Score: 6**

The spec mentions cross-posting to TikTok as a strategy element but the TikTok strategy is in a separate `tiktok-snapshot.md` document. The Instagram strategy correctly notes the ToS risk for cross-platform auto-posting (platform-specific watermarks reduce reach) but doesn't integrate with the TikTok strategy explicitly.

For a solo founder who is already managing Instagram content at 3–4 hours per week, TikTok is a Phase 2 channel. The spec should be explicit: TikTok is not an active channel in Phase 1. When it becomes active, the content bank (once built) will provide the source material for cross-platform adaptation.

### 20. System Maintenance and Evolution (1–10)
**Score: 8**

The strategy includes a maintenance note: "after 10 DMs, refine the message copy." The PATH-TO-10.md identifies the 5 implementation gaps with specific action items. The FINAL-REVIEW.md sign-off checklist is executable.

What the system doesn't have is an explicit evolution trigger: "when warm list reaches 30 artists, adjust the content type ratio" or "when 5 sign-ups have come from Instagram, identify their Instagram journey and replicate the pattern." The system is well-specified for the first 30 days; it needs evolution criteria for months 2–6.

---

## Gap Summary

| Gap | Severity | When to address |
|---|---|---|
| Graph API troubleshooting notes missing | Low | Before setup, add to INSTAGRAM-DATA-AND-LEADS.md |
| Content bank not written (10 example posts) | Medium | 90-minute session, Week 2 |
| "Who else is on ABLE?" DM objection not addressed | High | Before first DM |
| n8n Instagram sign-up notification not built | Medium | When n8n is installed (P1 hardware) |
| PostHog Instagram funnel dashboard not created | Medium | When PostHog is live in product |
| First 10 DMs not sent | Critical | This week |
| Week 0 baseline metrics not captured | High | Today — before any posts |
| Reel production guidance thin | Low | Before first Type B Reel |
| TikTok strategy not integrated | Low | Phase 2 |
| System evolution criteria not defined | Medium | After 30-day review |

---

## Competitive Context

ABLE's Instagram strategy is intentionally positioned against the social media approaches of its competitors:

**Linktree (@linktree):** Posts generic social media tips ("how to use the algorithm," "best times to post") aimed at all creators. High follower count, low relevance to independent musicians specifically. ABLE's problem-awareness content is more specific and will resonate more deeply with a smaller audience.

**Beacons (@beacons.ai):** Posts monetisation-focused content ("how creators make money"). Relevant to creators but positions itself as a financial tool. ABLE's copy philosophy (never say "monetise") creates a different register — more art than commerce.

**Feature.fm:** Minimal Instagram presence. Primarily B2B sales. Not a social media competitor.

**The differentiation:** James posting about the real experience of being an independent artist in 2026 — without product promotion in 70% of posts — is an approach that no link-in-bio tool is using. The content establishes credibility before the product earns trust. A producer who reads 10 of James's posts about the economics of independent music before ever seeing ABLE is already warm before the first DM.

---

## What "10/10" Looks Like for This System

A 10/10 Instagram strategy for ABLE means:

1. **The warm list has 30+ artists:** Artists who have engaged with James's content twice in the last 30 days, post about their own music, and fit the ABLE ICP. The list is maintained in a simple document and reviewed weekly.

2. **The DM framework has been refined by 10 real conversations:** The initial message, the follow-up, and the conversion offer have been tested, and the version that gets the best reply rates is documented.

3. **At least 5 sign-ups are directly attributable to Instagram:** Via PostHog UTM attribution, showing the Instagram → landing page → sign-up funnel has converted.

4. **The four metrics are tracked weekly:** Reach, profile visits, link clicks, and story rates have a Week 0 baseline and 4+ weeks of data showing trend.

5. **Content bank exists in James's voice:** 10 example posts serve as calibration for future content, preventing voice drift.

6. **The n8n notification is running:** A Telegram alert arrives within 5 minutes of an Instagram-sourced sign-up.

**Current distance from 10/10:** The spec is 9.6/10. The execution is 0/10. The aggregate system score is approximately **4/10** — a complete, immediately actionable strategy with no posts published yet and no DMs sent.

**The only action that matters today:** Capture Week 0 baseline metrics (pull the four numbers from Instagram Insights right now), then write the first Type A post. Everything else follows.

---

*Next action: Open Instagram Insights. Write down the current follower count, average reach per post (last 30 days), average profile visits per post, and link-in-bio clicks per week. That's Week 0. Now you have a baseline to improve.*
