# ABLE — Instagram Strategy: Path to 10
**Created: 2026-03-16**
**Purpose: Gap analysis — what separates a good Instagram strategy from a 10/10 one**
**Read alongside:** `INSTAGRAM-DATA-AND-LEADS.md`, `FINAL-REVIEW.md`

---

## The scoring framework

10/10 does not mean perfect in the abstract. It means the strategy can be executed by James alone without a team, produces real ABLE sign-ups from Instagram within 30 days, and compounds over time without requiring more effort per outcome as it scales.

Each dimension below is scored from its current state (the strategy as written) and notes what would be needed to close any remaining gap.

---

## Dimension 1: Data clarity (current: 9/10)

**What's in place:** Clear four-metric system tied to specific decisions. Multiple data sources ranked by effort. Setup instructions concrete enough to act on without Googling anything.

**The gap:** The Graph API setup instructions are correct but technical. Anyone without prior API experience will hit a friction point at step 3 (Facebook Business Manager). A companion document (or a simple 2-minute Loom walkthrough) would close this.

**Path to 10:** Add a single troubleshooting note to the API setup section covering the two most common failure points: (1) Instagram account not confirmed as Business type before connecting to Facebook, (2) access token expiry after 60 days. Neither is addressed in INSTAGRAM-DATA-AND-LEADS.md and both will silently break the data pipeline if unresolved.

**Note for implementation:** Until the Graph API is set up, run on Metricool + native Insights only. The four key metrics are fully accessible without the API. The API adds historical depth and automation, not access to the core numbers.

---

## Dimension 2: Content strategy precision (current: 9/10)

**What's in place:** Three content types clearly defined with structural rules. The 70/20/10 ratio enforced. Explicit list of what not to post. Format guidance (Reel length, caption structure) present.

**The gap:** The strategy defines the types but does not provide worked examples in James's actual voice. "Examples of the frame" is helpful but an agent (or a future community manager) could still produce posts that hit the format but miss the voice. The copy philosophy in `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md` applies but is not explicitly referenced in the content section.

**Path to 10:** Create a separate short document — `CONTENT-BANK.md` in this same directory — with 10 drafted posts (3 Type A, 3 Type B, 2 Type C, 2 cross-platform versions) in James's actual voice. These serve as calibration examples, not a post queue. Any post written in the future can be checked against them: "does this sound like the same person?"

This is Phase 2 work, not a blocker. The strategy is actionable without it.

---

## Dimension 3: Warm lead mechanics (current: 10/10)

**What's in place:** The funnel stages are defined. The daily protocol is timed and scoped. The warm list format is concrete and simple enough to actually maintain. The DM framework includes a worked example of good vs. bad, which is the single most important thing a DM guide can do. The 72-hour Story repost mechanic is specific and repeatable.

**No gap identified.** The warm lead section of this strategy is complete as written. The only thing that would improve it is execution experience — the first 10 DMs will produce feedback that refines the framework. That is not a gap, it is a feature.

---

## Dimension 4: Automation (current: 9/10)

**What's in place:** Clear line between what to automate (safe) and what not to (risky). n8n warm lead notification workflow specified. ToS risk explicitly flagged for cross-platform posting.

**The gap:** The n8n workflow is described at the spec level but not implemented. The Supabase insert webhook and the Telegram notification step need actual n8n node configuration. This is not a strategy gap — the strategy is correct — but it is an implementation gap.

**Path to 10:** When building the n8n workflow, document the exact node configuration in a separate `n8n-workflow-instagram-leads.json` export file stored in `docs/systems/ai-agents/` or equivalent. Then the workflow can be restored from a single file import if n8n is reset.

---

## Dimension 5: Attribution (current: 9.5/10)

**What's in place:** UTM structure defined for bio, story, and post links. PostHog event spec included. The connection between Instagram activity and ABLE sign-ups is closed via UTM → PostHog → Supabase.

**The minor gap:** The PostHog dashboard setup is assumed but not defined. The events fire but without a dashboard that surfaces "Instagram as source → activation rate vs. other sources," the data exists but is not visible. A PostHog dashboard with two views — (1) acquisition by source, (2) activation rate by source — closes this.

**Path to 10:** Add a PostHog dashboard spec to `docs/systems/analytics/SPEC.md` with the Instagram data view as a named section. Two required funnel steps: `landing_page_visit (source=instagram)` → `artist_first_fan_captured`. This 3-line addition closes the attribution loop completely.

---

## Dimension 6: Integration with ABLE's product strategy (current: 10/10)

**What's in place:** The strategy is explicitly connected to ABLE's beachhead (UK independent artists 22–38, 5k–50k followers). The content ratio reflects the copy philosophy (artists-first, not product-first). The DM voice obeys the copy rules (no exclamation marks, no generic SaaS phrases). The warm lead definition matches the target customer profile in `docs/ABLE_STRATEGY.md`. The UTM parameters feed the MRR growth loop.

**No gap identified.** This strategy is not a social media strategy bolted onto a product strategy. It is an extension of the product strategy expressed through a social channel.

---

## The 10/10 conditions summary

The strategy reaches 10/10 when:

1. Graph API setup is complete and the four key metrics are being pulled automatically (or Metricool is doing it adequately as an interim)
2. The content bank document exists with 10 calibrated posts in James's voice
3. The n8n Instagram lead notification workflow is running (new Instagram-sourced sign-up → Telegram within 5 minutes)
4. The PostHog Instagram funnel dashboard is live showing acquisition and activation by source
5. James has sent 10 DMs using the framework and refined the language based on actual responses

Items 1, 3, and 4 are technical setup. Item 2 is a 90-minute writing session. Item 5 is the first month of execution.

None of these block starting. Start with the strategy as written. Close each gap as it becomes the next bottleneck.

---

## What a 7/10 version of this strategy looks like (for contrast)

A 7/10 version would:
- Track all available metrics instead of the four that drive decisions (busy, not useful)
- Post the correct content types but not personalise the DMs (volume over quality)
- Have UTM links but no PostHog dashboard to read them (data without insight)
- Automate everything that can be automated, including things that should stay human (efficient, inauthentic)
- Have a content strategy that sounds like ABLE's copy but not like James specifically (on-brand but impersonal)

The delta between 7/10 and 10/10 is almost entirely in the human layer: the personal DMs, the warm list, the 20-minute daily engagement ritual, the one decision per week from the metrics. The technical layer (data, UTMs, automation) is infrastructure. The human layer is the strategy.
