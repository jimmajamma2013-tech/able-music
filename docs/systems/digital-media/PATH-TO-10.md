# ABLE — Digital Media Strategy: Path to 10
**Created: 2026-03-16**
**Purpose: Gap analysis — what separates a good digital media strategy from a 10/10 one**
**Read alongside:** `DIGITAL-MEDIA.md`, `FINAL-REVIEW.md`

---

## The scoring framework

10/10 means the strategy produces real ABLE artist sign-ups from earned media within 90 days, compounding over 12 months, executed by James alone without an agency, and without ever sounding like a company marketing itself.

Each dimension below identifies the current state of the strategy as written and what remains to close any gap.

---

## Dimension 1: Media landscape completeness (current: 9.5/10)

**What is in place:** All relevant tiers are mapped — national press through to niche newsletters. Each publication has a stated ABLE angle and approach method. The distinction between which channels produce industry awareness versus direct sign-ups is explicit.

**The gap:** The landscape is mapped at the macro level but does not include named individual journalists at each publication. At Hypebot, Music Ally, and Music Week, coverage depends on a specific editor finding the pitch interesting — knowing who that person is (and what they personally cover) makes the difference between a pitch that lands and one that does not.

**Path to 10:** Before the first pitch is sent to any Tier 2 publication, spend 20 minutes on Muck Rack or each publication's masthead identifying the specific editor or journalist who covers music tech tools. The pitch changes slightly for each person: their recent work is referenced, not just the publication's general focus. This is a 20-minute research task per publication, not a structural gap.

---

## Dimension 2: Pitch quality (current: 9.5/10)

**What is in place:** The press pitch template is under 150 words, references specific prior work, makes two offers (article or quote), ends without a hard ask, and follows ABLE's copy philosophy throughout. The podcast pitch is separately formulated with appropriate tone difference. Both templates obey the no-exclamation-mark rule.

**The gap:** The templates are frameworks, not finished pitches. A completed pitch for Hypebot is different from a completed pitch for DIY Magazine. The angles diverge significantly (macro industry thesis vs. founder personal story). An agent or James writing under time pressure might default to the same angle across both, which would underperform.

**Path to 10:** Before the first pitch batch goes out, write three finished pitches — one for Hypebot (thesis angle), one for DIY Magazine (founder story angle), one for Music Tectonics (data angle). These serve as calibration examples. Any future pitch can be checked against them to confirm the angle is correctly calibrated to the publication. This is a 90-minute writing session.

---

## Dimension 3: Guest post content (current: 8/10)

**What is in place:** The first guest post is framed with a specific argument structure. The working title is defined. The publication target (Music Think Tank / Hypebot) is clear. The principle — useful content that names ABLE once, at the end — is stated.

**The gap:** The article does not yet exist. Until the article is written and published, this dimension is strategy not execution. More specifically: the argument structure is outlined but the article itself requires approximately 800–1,200 words of original thinking that only James can write. It cannot be templated further.

**Path to 10:** Write the first guest post. Block 3 hours. Use the argument structure in DIGITAL-MEDIA.md Part 2.3 as the skeleton. The article is the single highest-leverage action in this entire strategy — more valuable than any outreach email, any community post, any podcast pitch. Do it first.

---

## Dimension 4: Podcast talking points (current: 9/10)

**What is in place:** Four prepared talking points with actual content, not just topic labels. The "no product demo" signal in the pitch email is present. The range of angles (owned data, campaign modes, building-in-public) covers the three likely conversation directions.

**The gap:** The talking points have not been delivered out loud. The difference between prepared talking points on paper and talking points that land in conversation is rehearsal. James has not yet had the experience of pitching these to a real audience and learning which land and which fall flat.

**Path to 10:** Before the first podcast appearance, run the talking points in at least one context where James has to articulate them under mild pressure — a conversation with another founder, a voice memo recording reviewed critically, or a short informal Instagram video where the same argument is made. The act of speaking them out loud, even once, closes the gap significantly.

---

## Dimension 5: Community strategy (current: 8.5/10)

**What is in place:** The correct communities are identified. The 30-day rule is stated explicitly and with the correct reasoning. The distinction between communities for listening and communities for participation is clear.

**The gap:** The community strategy has no calendar or cadence. "Be genuinely useful for 30 days" is correct in principle but produces no action without a concrete specification of what that looks like per week. An agent or James working without structure might join the communities and then not do anything consistently enough for the 30-day reputation to build.

**Path to 10:** Create a simple community participation schedule: r/WeAreTheMusicMakers — 15 minutes per Tuesday and Thursday, answer 2–3 questions per session. r/musicproduction — 15 minutes per Monday. No minimum on post quality per session — the requirement is consistent presence, not high effort. The schedule can be tracked in a simple checklist. Add this as a standing calendar item. This is a process specification, not a content problem.

---

## Dimension 6: YouTube strategy (current: 8/10)

**What is in place:** The channel content types are defined. The target channel profile for outreach is specified. The offer (free Artist Pro + demo call) is concrete. The sequencing is correct — ABLE's own channel in Phase 2, other channels first.

**The gap:** No specific YouTube channels are named in the strategy. "Music marketing educators" and "music production channels with business content" describe a category but do not constitute an actionable list. The outreach requires knowing exactly which 5–10 channels to approach and in what order.

**Path to 10:** Build a short list of 8–10 specific channels. Research criteria: UK-based preferred (geography match with beachhead), covers music business tools (not just production technique), 30k–300k subscribers, posted in last 30 days (still active). Damien Keyes is the obvious anchor candidate given UK focus and music business content. Search YouTube for "music marketing for independent artists UK" and "how to grow as an independent artist UK" — the channels that come up for those searches are already reaching ABLE's audience. Identify the 8 and add them to this document as a named appendix. One hour of research.

---

## Dimension 7: Attribution system (current: 9/10)

**What is in place:** UTM convention is specified and consistent. The four tracking tools (PostHog, Google Alerts, Ahrefs, PostHog acquisition by source) are identified. The monthly media audit protocol is specific and time-bounded. NPS correlation by source is included.

**The gap:** The UTM convention requires PostHog to be set up and correctly reading UTM parameters on landing page visits and sign-up events. If PostHog is running but not reading UTM parameters in the `able_profile` creation event, the attribution chain breaks silently — traffic arrives with UTM data that is not captured.

**Path to 10:** Verify that PostHog is configured to capture `utm_source`, `utm_medium`, and `utm_campaign` as properties on: (1) the `page_view` event on `landing.html`, and (2) the `artist_signup` event on `start.html`. If not already configured, this is a 20-minute engineering task. Until it is confirmed working, UTM links produce traffic data without sign-up attribution — half the loop, not a full loop.

---

## Dimension 8: Integration with ABLE's product strategy (current: 10/10)

**What is in place:** The media angles all flow from ABLE's product thesis (owned fan data, campaign modes, artist-first) rather than generic SaaS marketing language. The copy in every template follows the copy philosophy — no exclamation marks, no "turn fans into superfans," no generic startup language. The target press audience (music industry professionals, independent artists) maps directly to ABLE's customer segments. The flywheel is explicit about which media channels reach which customer segments (Tier 2 press for managers/labels, Tier 3 press for artists directly).

No gap identified. The strategy is an extension of the product strategy expressed through media channels, not a separate marketing layer bolted on.

---

## The 10/10 conditions summary

The strategy reaches 10/10 when:

1. Named journalist contacts are identified for the three primary Tier 2 targets (Hypebot, Music Ally, DIY Magazine) — 1 hour of research
2. Three finished pitch drafts are written (Hypebot thesis angle, DIY Magazine founder angle, Music Tectonics data angle) — 90-minute writing session
3. The first Music Think Tank / Hypebot guest post is written and submitted — 3-hour writing block
4. PostHog is confirmed to capture UTM parameters on both landing page and sign-up events — 20 minutes
5. A specific list of 8–10 YouTube channels for outreach is built — 1 hour
6. Community participation schedule is in the calendar (15 minutes twice per week per community)
7. Podcast talking points have been rehearsed out loud at least once

None of these are structural problems with the strategy. They are execution tasks. The strategy is complete. The gaps are all in implementation.

---

## What a 6/10 version of this strategy looks like (for contrast)

A 6/10 version would:
- Send the same pitch template to every publication with only the name swapped out
- Post about ABLE in music communities on day one without establishing credibility first
- Write a press release (product announcement) instead of a useful argument (guest post)
- Track "media mentions" without tracking which mentions produced sign-ups
- Build ABLE's YouTube channel before earning appearances on existing channels
- Pitch podcasts with "I'd love to share my story" instead of a specific conversation angle
- Treat press coverage as a goal rather than a byproduct of being someone with something real to say

The delta between 6/10 and 10/10 is almost entirely in understanding that media coverage is earned through genuine usefulness, not through volume of outreach or marketing polish. A single genuinely useful article in the right publication is worth 50 press releases.
