# ABLE — Digital Media Strategy: Final Review
**Created: 2026-03-16**
**Purpose: Quality gate before calling this strategy complete**
**Read alongside:** `DIGITAL-MEDIA.md`, `PATH-TO-10.md`

---

## Review protocol

Each section corresponds to a part of `DIGITAL-MEDIA.md`. The review confirms: (1) the strategy is internally consistent, (2) it is aligned with ABLE's product strategy and copy philosophy, (3) it is actionable by James alone without an agency, and (4) it is honest about what it can and cannot achieve.

---

## Check 1: Internal consistency

**Does every part of the strategy point toward the same outcome?**

The media landscape (Part 1) maps channels by tier. The earned media strategy (Part 2) specifies pitch angles calibrated to each tier. The podcast strategy (Part 3) specifies talking points that map directly to the angles in the press strategy. The YouTube strategy (Part 4) provides distribution for the same arguments in video format. The community strategy (Part 5) places James in the communities where the Tier 3 press audience lives, deepening trust with the same people the press strategy is reaching. The flywheel (Part 6) shows explicitly how each element feeds the next. The metrics system (Part 7) closes the attribution loop.

The chain is: story → press coverage → community trust → podcast appearance → YouTube feature → compounding sign-ups → data story → second wave of coverage.

Verdict: internally consistent. No section works in isolation. Each part is downstream of the story and upstream of the attribution.

**Do the pitch angles match the publications they are mapped to?**

- Hypebot: macro thesis (broken infrastructure) → correct; Hypebot covers industry arguments, not product news
- DIY Magazine: personal founder story → correct; DIY covers artist culture, founder essays fit their tone
- Music Ally: launch news with numbers → correct; Music Ally covers factual music tech industry news
- Music Tectonics: data-led argument → correct; Music Tectonics is analytical, their audience expects evidence
- Water & Music: month-8 data story → correct; Cherie Hu specifically wants deep analysis, not launch news

Verdict: angles are correctly calibrated to publication audiences.

---

## Check 2: Alignment with ABLE's product strategy and copy philosophy

**Target customer match**

ABLE's primary target: UK independent artist, 22–38, actively releasing music. The media strategy targets:
- Tier 2 press (Hypebot, Music Ally) — reaches managers, labels, music tech professionals who influence which tools their artists adopt
- Tier 3 press (DIY Magazine, Clash, Line of Best Fit) — reaches independent artists directly; these publications are read by the exact demographic ABLE serves
- Podcasts (New Artist Model, Music Tectonics) — specifically curated for independent artist operators
- Communities (r/WeAreTheMusicMakers, r/musicproduction) — populated by independent artists and producers

Verdict: aligned. The channel selection follows the customer map, not a generic PR channel list.

**Copy philosophy**

Review of all templates and talking points against ABLE's copy rules:

- No exclamation marks in any template — confirmed
- No "turn fans into superfans" or similar phrases — confirmed
- No generic SaaS language ("excited to share," "game-changing") — confirmed
- "Owned fan data" argument is stated plainly — confirmed
- The podcast pitch explicitly says "no interest in turning your show into a product demo" — this is ABLE's voice applied to media outreach: direct, honest, no performance
- The community strategy explicitly prohibits joining communities to promote ABLE — consistent with the copy philosophy that authenticity cannot be manufactured

Verdict: the copy philosophy is applied throughout, not just in product UI.

**Beachhead geography**

The strategy is UK-first by targeting: Hypebot (Hypebot is US but widely read in UK music industry), DIY Magazine (UK indie press), Music Week (UK industry), Clash and Line of Best Fit (UK-based). The Damien Keyes YouTube channel recommendation is UK-based. The community engagement targets communities where UK independent artists are present.

Verdict: UK beachhead is reflected in the channel prioritisation.

---

## Check 3: Actionability

**Can James execute Phase 1 of this strategy alone?**

Phase 1 actions and realistic time estimates:

| Action | Time required | Dependency |
|---|---|---|
| Set up Google Alerts for brand mentions | 10 minutes | None |
| Set up UTM tracking system (create UTM template doc) | 30 minutes | PostHog already running |
| Verify PostHog reads UTM parameters | 20 minutes | Technical — check existing implementation |
| Join Reddit communities (WATMM, r/musicproduction) | 15 minutes | None |
| Research named journalists at Hypebot, Music Ally, DIY | 60 minutes | None |
| Write first Hypebot guest post | 3 hours | Time block |
| Write three pitch drafts | 90 minutes | First article drafted |
| Submit to Music Think Tank | 15 minutes | Article complete |
| Apply to Music Tectonics Startup Session | 30 minutes | Product live, some numbers available |

Total Phase 1 setup: approximately 7–8 hours spread across 2–3 weeks. This is sustainable alongside building the product.

Weekly ongoing commitment: 30 minutes per week for community participation + 10 minutes per week for media audit + pitching and writing as opportunities arise. Total: under 2 hours per week in ongoing steady state.

Verdict: actionable by one person. Phase 1 requires time, not team.

**Does the strategy require infrastructure that does not yet exist?**

Infrastructure required from day 1:
- PostHog running in landing.html and start.html — should be in place per analytics spec
- Google Alerts — 10-minute setup, no existing infrastructure needed
- UTM-tagged links — requires only the UTM convention defined in the strategy, no tooling

Infrastructure required from month 3+:
- Ahrefs free tier — 5-minute account creation
- PostHog acquisition dashboard view — requires PostHog dashboard to exist with correct event filtering

Infrastructure required from month 6+:
- YouTube channel — trivially created when needed
- ABLE's own website blog (for hosting articles that are not placed externally) — Phase 2

Verdict: Phase 1 requires zero new infrastructure. All blockers have clear paths that are not bottlenecks to starting.

---

## Check 4: Honesty about scope and limits

**What this strategy will produce in 90 days (realistic)**

If James submits the Hypebot article in month 1, applies to Music Tectonics in month 2, and pitches Music Ally in month 3:

- 1 published article on Music Think Tank / Hypebot
- 30–100 referral visits from the article
- 5–20 artist sign-ups directly attributable to the article
- 1 podcast application submitted (result in months 2–4)
- 1 Tier 2 press pitch sent (result in months 3–5)
- ABLE referenced once or twice in relevant Reddit threads by an established community member (James)

This is not a vanity metric outcome. These are small numbers with specific value: the first 20 press-acquired artist sign-ups are higher-trust than cold-acquired ones, because they arrived after reading an argument and deciding it made sense. Their activation and retention will likely be stronger. The article also produces backlinks that improve able.fm's SEO for related searches — a compounding effect that does not show up in short-term sign-up numbers.

**What this strategy cannot do**

- Make press happen faster than relationships build. A cold email to Music Business Worldwide in month 1 with zero track record will not produce coverage. The sequence matters: Tier 2 before Tier 1, community before community mention, article before podcast.
- Replace the quality of the product. The most damaging thing that can happen is a good press piece that sends 100 artists to a mediocre onboarding. The press moment creates a concentrated sample of first impressions. If the product is not ready to convert those impressions, the coverage creates no lasting value and the follow-up story does not exist.
- Produce viral growth. This strategy is designed for compounding, not viral. There is no mechanism in earned media for exponential short-term growth. The payoff is durable, trusted, word-of-mouth-accelerated growth over 12 months — not a spike followed by a plateau.

---

## Final score assessment

| Dimension | Score | Notes |
|---|---|---|
| Media landscape completeness | 9.5/10 | Named journalist contacts not yet identified — 1-hour research task |
| Pitch quality | 9.5/10 | Templates correct; finished pitches not yet written — 90-minute task |
| Guest post content | 8/10 | Argument framed; article not written — 3-hour writing block is the gap |
| Podcast talking points | 9/10 | Prepared but not rehearsed; first appearance will close this gap |
| Community strategy | 8.5/10 | Correct framework; calendar not yet created — 15-minute task |
| YouTube strategy | 8/10 | Approach specified; specific channels not yet named — 1-hour research |
| Attribution system | 9/10 | Convention defined; PostHog UTM capture not yet verified |
| Product strategy alignment | 10/10 | No gaps |
| Copy philosophy alignment | 10/10 | No gaps |
| Honesty about scope | 10/10 | Realistic expectations stated |
| Actionability (solo founder) | 9/10 | Executable from day 1; minor process gaps identified |

**Overall: 9.2/10**

This is a complete, actionable digital media strategy. Every gap identified is a specific, time-bounded task — research, writing, or verification — not a structural problem. The strategy is ready to execute. The remaining 0.8 points are closed by the seven implementation tasks in PATH-TO-10.md.

---

## Sign-off checklist

Before treating this strategy as fully operational:

- [ ] Google Alerts set up for "ABLE music", "able.fm", "Artist Before Label"
- [ ] PostHog verified to capture UTM parameters on page_view (landing.html) and artist_signup (start.html) events
- [ ] Named journalist contacts identified for Hypebot, Music Ally, DIY Magazine
- [ ] Three finished pitch drafts written (thesis angle, founder angle, data angle)
- [ ] First Hypebot guest post written, reviewed, submitted
- [ ] Music Tectonics Startup Session application submitted
- [ ] Specific list of 8–10 YouTube channels for outreach built and stored in this directory
- [ ] Community participation schedule added to calendar (15 min x 2 per week per community)
- [ ] Podcast talking points rehearsed out loud at least once
- [ ] UTM tracking spreadsheet created with all current media links logged

When all boxes are checked: the strategy is operational. Review progress against the media calendar at month 3.
