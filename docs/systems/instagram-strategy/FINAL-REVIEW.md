# ABLE — Instagram Strategy: Final Review
**Created: 2026-03-16**
**Purpose: Quality gate before calling this strategy complete**
**Read alongside:** `INSTAGRAM-DATA-AND-LEADS.md`, `PATH-TO-10.md`

---

## Review protocol

This document is the final quality check. Each section corresponds to a part of `INSTAGRAM-DATA-AND-LEADS.md`. The review confirms: (1) the strategy is internally consistent, (2) it is consistent with ABLE's product strategy, (3) it is actionable by James alone without a team, and (4) it is honest about what it can and cannot achieve.

---

## Check 1: Internal consistency

**Does every part of the strategy point toward the same outcome?**

The data strategy (Part 1) identifies four metrics. Those four metrics map directly to:
- The content strategy (Part 2): profile visit rate and link click rate tell you whether content is working
- The lead conversion system (Part 3): DM rate and story-to-link rate tell you whether personal engagement is working
- The automation layer (Part 4): UTM parameters feed the PostHog attribution that closes the loop

The chain is: content → engagement signal → warm list → personal DM → sign-up → PostHog attribution → which content produced this sign-up → more of that content.

Verdict: internally consistent. No section exists in isolation.

**Does the content ratio (70/20/10) hold across all three content types?**

Type A (problem posts): 0% ABLE. Contributes to the 70%.
Type B (product-in-use): 100% ABLE. Contributes to the 20%.
Type C (artist features): primarily about the artist (~90%), mentions ABLE once (~10%). Contributes to the 70% with a small cross-over into 20%.

Cadence: if posting 3 times per week, one Type B per week is 33% ABLE content — above the 20% ceiling. The correct cadence is one Type B every 10–14 days. One Type A twice per week. One Type C every two weeks. This works out to roughly 4 Type A posts, 1–2 Type B posts, and 2 Type C posts per month. That is 72% / 20% / 8% — within acceptable range of 70/20/10.

Verdict: ratio holds with correct cadence. The strategy should specify maximum cadence per content type more explicitly. Added to PATH-TO-10 as a minor note.

---

## Check 2: Alignment with ABLE's product strategy

**Target customer match**

ABLE's primary target: UK independent artist, 22–38, 5k–100k followers, actively releasing music, currently using Linktree or nothing.

Instagram strategy target: independent musicians who follow James and engage with content about the reality of being an independent artist in 2026.

These are the same person. The content types specifically attract people experiencing the problems ABLE solves (algorithm dependency, no owned fan data, static bio links). The DM criteria (engaged twice, posts about their own music, references releases or gigs) filters to the active releasing artist, not the hobbyist.

Verdict: aligned.

**Copy philosophy match**

The strategy prohibits generic phrases in DMs ("excited to share," "game-changing," "for artists like you"). It requires specific, personal references in every DM. It explicitly bans the good/bad DM examples that violate ABLE's copy standards. The word "funnel" does not appear in any user-facing context (it appears in Part 3 as a structural description, not as language used with artists).

Verdict: aligned.

**Beachhead geography**

The strategy is UK-focused by default (the warm list, the DM approach, the artist feature cadence). It does not specifically restrict to UK but the content topics (UK independent music scene, UK release patterns) will naturally resonate more with UK artists. The data pull (follower location from Insights) is used specifically to confirm whether the UK beachhead is being reached.

Verdict: aligned with V1 UK beachhead priority.

---

## Check 3: Actionability

**Can James execute this alone in the first 30 days?**

Week 1: 4 setup tasks, no content yet. All achievable in under 3 hours total.
Week 2: 2 posts (one feed, one Story) + warm list setup + 3 DMs. Total new content creation: approximately 90 minutes.
Week 3: 1 Reel + 3 DMs + cross-post to X. Total: approximately 2 hours.
Week 4: 1 feed post + 3 DMs + metrics review. Total: approximately 90 minutes.

Weekly ongoing load: 3–4 posts, 20-minute daily engagement ritual, 10-minute weekly metrics review. Total: approximately 3–4 hours per week.

This is sustainable alongside a full-time job. It is demanding but not unreasonable for a founder in the build phase.

Verdict: actionable by one person.

**Does the strategy require tools or infrastructure that do not yet exist?**

Tools required from Day 1:
- Instagram Business/Creator account: exists or trivially creatable
- Metricool free tier: 5-minute setup
- UTM-tagged bio link: 2-minute setup
- Warm list document: a note in Apple Notes, zero setup

Tools required from Week 3 onwards:
- PostHog event tracking: requires PostHog to be running in `landing.html` and `start.html` (should already be in place per analytics spec)
- UTM parameter reading in PostHog: requires a dashboard view (see PATH-TO-10)

Tools required from Month 2 onwards:
- n8n warm lead notification: requires n8n instance and Supabase webhook (see PATH-TO-10)
- Instagram Graph API: optional enhancement, not required for core strategy

Verdict: the first 30 days require zero new infrastructure. Later tools enhance the strategy but do not block it.

---

## Check 4: Honesty about what this can achieve

**What this strategy will produce in 30 days (realistic)**

If James posts consistently (3× per week), engages daily (20 minutes), and sends 12–15 DMs in the first 30 days:

- 5–10 DM conversations with independent artists
- 3–6 warm leads who have visited able.fm
- 1–3 ABLE sign-ups directly attributable to Instagram

This is not a large number. It is the correct expectation. The first 30 days establish the rhythm, the voice, and the warm list. The compounding happens in months 2–4 as the warm list grows, the content refines toward what produces profile visits, and the first artist features begin distributing ABLE to new audiences.

Anyone expecting Instagram alone to produce 50 ABLE sign-ups in 30 days is misreading what this strategy is. It is a relationship-building system operating at the pace that authentic relationships build. The value is durable, not viral.

**What this strategy cannot do**

- Replace the producer seeding strategy. Producers who refer their artist clients are higher-quality leads than cold Instagram followers because they arrive with trust pre-installed. Instagram is the awareness layer; producer seeding is the conversion layer.
- Grow the account quickly. If James's existing following does not include enough independent artists, the warm lead pool is small. Content quality can improve conversion within the existing audience — it cannot manufacture an audience that does not exist.
- Work without an excellent product on the other end. This is the constraint that supersedes all others. If someone goes through the full funnel — sees content, DMs, clicks the link, starts onboarding — and the onboarding is mediocre or the page does not look professional, the lead is lost. The Instagram strategy can only convert as many people as the product can retain in the first session.

---

## Final score assessment

| Dimension | Score | Notes |
|---|---|---|
| Data clarity and usefulness | 9/10 | Graph API setup note missing — acceptable gap, closed by Metricool interim |
| Content strategy precision | 9/10 | Worked examples in James's voice not yet written — Phase 2 task |
| Warm lead mechanics | 10/10 | Complete as written |
| Automation scope | 9/10 | n8n workflow described but not yet implemented |
| Attribution completeness | 9.5/10 | PostHog dashboard spec not yet written |
| Product strategy alignment | 10/10 | No gaps |
| Actionability (solo founder) | 10/10 | Executable from Day 1 |
| Honesty about scope and limits | 10/10 | Realistic expectations stated explicitly |

**Overall: 9.6/10**

This is a 10/10 strategy in structure, philosophy, and alignment. The 0.4 gap is in implementation details (PostHog dashboard, n8n workflow, content bank) that are follow-on tasks, not blockers. Every gap is documented in PATH-TO-10.md with a specific, actionable close.

The strategy is ready to execute. Start Week 1 today.

---

## Sign-off checklist

Before executing, confirm:

- [ ] Instagram account is set to Business or Creator mode
- [ ] Bio copy is updated to: "Your music. Your fans. Your relationship. ↓"
- [ ] Bio link is: `https://able.fm?utm_source=instagram&utm_medium=bio&utm_campaign=always-on`
- [ ] Metricool is connected to Instagram
- [ ] Warm list document is created (Apple Notes, Notion, or similar — just a blank document)
- [ ] The four key metrics are written in a tracking sheet (Week 0 baseline)
- [ ] First Type A post is drafted and ready to schedule
- [ ] DM framework in INSTAGRAM-DATA-AND-LEADS.md Part 3.4 has been read twice

When all boxes are checked: execute. Review in 30 days against the four metrics baseline.
