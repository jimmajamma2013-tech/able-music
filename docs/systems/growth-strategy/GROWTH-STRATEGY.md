# ABLE — Growth Strategy
**Version: 1.0 | Written: 2026-03-16 | Review: quarterly**
**Stage: Pre-revenue. Target: first 10 paying artists → 150 paying artists → £1k MRR**

> This document covers ALL growth mechanisms — product-led, community-led, content-led, partnership-led, paid, and meta-level strategy. The existing `docs/GROWTH_STRATEGY.md` covers the 90-day channel plan and SEO in detail. This document is the strategic layer above and around it. Read both together.

---

## Current state assessment

**Existing `docs/GROWTH_STRATEGY.md` honest score: 7.5/10**

What it gets right:
- The competitive positioning is sharp (Gap 1/2/3 framework)
- The 90-day channel plan is specific and actionable
- The producer seeding programme is the best insight in the existing doc — high leverage, underused by competitors
- The "Made with ABLE" fan acquisition loop is a genuine product-led growth mechanism
- The SEO article plan is well-researched and realistic

What's missing (why it's not 10/10 yet):
- No growth philosophy or hierarchy — which mechanisms take priority when time is scarce?
- No product-led growth architecture (the product itself as acquisition engine)
- No community-led growth framework (founding artist programme, Discord strategy)
- No paid growth decision framework (when to start, which channels, what CAC targets)
- No metrics dashboard (what to measure, what to act on)
- No international sequencing strategy
- No "one channel" principle — when to stop testing and double down

This document fills those gaps. The two docs together form the complete growth system.

---

## Part 1: The Growth Philosophy

### The growth pyramid

ABLE's growth priorities, in strict order:

```
         [PAID]
       Paid acquisition
      (Phase 2 only — after
      one organic channel works)
    ─────────────────────────────
         [ORGANIC]
    Content + SEO + Press + Reddit
    (Running in parallel with referral)
  ─────────────────────────────────────
          [REFERRAL]
    Product-led + Word of mouth
    (Abler programme, Made with ABLE loop)
  ────────────────────────────────────────
           [RETENTION]
    Activation rate + NPS + Churn prevention
    (This is the foundation. Nothing else works without it.)
```

**The principle behind the pyramid:** Most early-stage SaaS companies optimise for acquisition before they have retention. This is backwards. The economics of growth are: if monthly churn is 6%, no acquisition channel can build the business — every 17 acquired artists are replaced by one who churned. Retention is not a downstream metric — it is the precondition for everything above it.

**Working priority order:**
1. Activation rate (signed-up artists → artists with a live page + first fan sign-up)
2. 30-day retention (artists still paying / active at 30 days post-signup)
3. NPS and word-of-mouth (evangelical artists who refer without being asked)
4. Organic acquisition channels (SEO, press, community)
5. Referral programmes (Abler, producer seeding)
6. Paid acquisition (only after LTV:CAC evidence exists organically)

---

## Part 2: Product-Led Growth Mechanics

Product-led growth (PLG) means the product itself acquires, converts, and retains users. ABLE has three natural PLG loops. All three should be built and measured.

### PLG Loop 1: "Made with ABLE" fan-to-artist funnel

**How it works:**
When a fan signs up on any artist's ABLE page (email capture), the confirmation screen shows — after the artist's thank-you message — a subtle secondary line:

> "Are you an artist? Build your page free →"

This is a zero-cost acquisition mechanic. Fans of independent artists are disproportionately likely to be independent artists themselves (the "artist fan" phenomenon is well-documented in independent music communities). A fan who just signed up for an artist's email list is engaged, in-market, and primed to see an alternative to whatever link-in-bio the artist is using.

**Implementation detail:**
- UTM: `?utm_source=fan-signup&utm_medium=product&utm_campaign=made-with-able`
- The CTA should appear only after the artist's confirmation message renders — it doesn't interrupt the fan experience, it follows it
- The CTA copy is humble: not "start your free trial" — "Are you an artist? Build your page free."

**Target metrics (Month 3+):**
- 5% of fan sign-ups click the artist CTA
- 10% of those complete sign-up
- 15% of completed sign-ups activate a live page within 30 days
- Resulting CAC from this channel: effectively £0 (no marginal cost)

**Why this compounds:** Every new artist who joins ABLE creates more fan sign-up events, which creates more artist acquisition opportunities. The loop is self-reinforcing. At 1,000 artists each capturing 10 fans per week, that's 10,000 fan sign-up events per week, generating 500 artist CTA clicks and 50 artist sign-ups. Without spending a penny on that acquisition.

### PLG Loop 2: The ABLE profile as a viral coefficient signal

Every ABLE artist page has one feature that Linktree cannot replicate: it looks like the artist designed it for their sound. The accent colour, the campaign state, the snap cards, the profile card — together, these create a page that is visually distinctive and recognisably a professional music presence.

When artists share their ABLE page on social media (which they do, because it's a link-in-bio — that's the point), other artists see it. Some percentage of those artists investigate. This is passive word-of-mouth driven by the product quality.

**How to amplify this:**
- The ABLE page URL (`ablemusic.co/artistname`) should appear in the artist's page footer — a subtle "Built with ABLE" credit that is tasteful, not promotional
- The footer link goes to `landing.html?utm_source=profile-footer&utm_medium=product`
- On the Artist Pro tier, artists can remove the footer (white-label option)
- This creates a natural incentive gradient: free tier provides acquisition, paid tier provides removal

**Measurement:**
- Traffic from `utm_source=profile-footer` to `landing.html`
- Conversion rate from this traffic to sign-up
- Viral coefficient: number of artist sign-ups driven per existing artist (target: K-factor > 0.2)

### PLG Loop 3: The fan confirmation email as first touch

When a fan signs up to an artist's email list via ABLE, they receive a confirmation email. This email is in the artist's voice (customisable). But it also contains one element controlled by ABLE: a footer line.

**The footer line:**
> "[Artist Name] uses ABLE to stay close to their fans. ABLE is free for artists. →"

This reaches fans who didn't see the "Are you an artist?" prompt on the confirmation screen, or who signed up via a different mechanism (QR code, embedded widget). It has a different conversion profile — slightly lower intent than the on-page prompt, but reaches fans who have taken a stronger action (confirmed their email).

**Implementation requirement:** This requires the backend email system to be live (Supabase + email provider). Build this in parallel with the backend, not before.

---

## Part 3: Community-Led Growth

Community-led growth is different from content-led growth. It is not about publishing things for people to find. It is about creating a context in which artists find each other, advocate for each other, and collectively become invested in ABLE's success.

### The Founding Artists Programme

**What it is:** The first 100 paying artists on ABLE are "Founding Artists." This is not a marketing title — it carries specific, meaningful benefits.

**Founding Artist benefits:**
- Lifetime pricing lock: the price they pay today is the price they pay forever, regardless of future price increases
- Founding badge on their ABLE page (visible to fans — "Founding Artist" marker)
- Direct access to James via a private Discord or WhatsApp group — they can report bugs, suggest features, and get early access to new states
- Name in the ABLE credits (on the landing page: "Built with the Founding Artists")
- Annual video call — James talks to them in December each year to review the platform together

**Why this matters for growth:**
Founding Artists are the most motivated advocates on earth. They have ownership psychology (they were there first), financial alignment (their price is locked), and genuine relationship (they know the founder). They will tell other artists. They will defend ABLE in conversations. They will post about it when something new ships.

**How to recruit them:**
Personal outreach only. No mass marketing. Every Founding Artist should have had a real conversation with James before they sign up. The 100 is a ceiling, not a target — filling it too fast dilutes the quality.

### Discord: The Artist Inner Circle

**Structure:**
- `#introductions` — new artists introduce themselves and their sound
- `#what-shipped` — James posts every update here first, before the changelog
- `#feedback` — direct product feedback, always responded to within 24 hours
- `#artists-digging` — artists recommend other artists to each other (mirrors the product feature)
- `#show-your-page` — artists share their live ABLE page, get genuine feedback

**Rules:**
- No promotion (no "listen to my track" spam)
- No generic networking
- Real conversations about the craft, the tools, the business of independent music
- James is active daily in the first year — not just answering questions, but starting them

**Governance:**
The Discord serves the community, not ABLE's acquisition goals. If the community is healthy, acquisition follows. If acquisition is the primary goal, the community dies.

**Entry requirement:** Must have a live ABLE page (any tier). This prevents the Discord from being flooded by people who want to network without contributing.

### The Abler Referral Programme

**"Ablers"** are artists (or non-artists: managers, producers, educators) who refer other artists to ABLE. Unlike a generic affiliate programme, Ablers are curated and given identity within the platform.

**Two-tier structure:**

**Tier 1 — Artist-to-Artist (bilateral):**
- Artist A refers Artist B via a unique link
- Both artists get 1 month free when Artist B activates a paid plan
- This is automatic, no approval needed
- The referral link is in every artist's admin dashboard: "Invite an artist"

**Tier 2 — Recognised Ablers (application-only):**
- Producers, managers, music educators, music school coordinators who actively promote ABLE
- Benefits: 25% recurring commission for as long as each referred artist stays paying
- Paid monthly via Stripe (FirstPromoter or Rewardful integration)
- Recognition: Abler badge on their own ABLE page (if they have one), listing in an "Ablers" directory on landing.html

**Target Ablers for Year 1:**
- 20 UK-based producers who work with multiple artists
- 5 UK music education coordinators (BIMM, Institute of Contemporary Music Performance, Leeds Conservatoire)
- 3–5 music industry newsletter writers who can mention ABLE in editorial context

**CAC via Ablers:** Commission of 25% on £9/mo = £2.25/mo until churn. At 12-month average LTV, cost to acquire via Abler = £27. Well within the £100 CAC ceiling. At 18-month LTV, cost = £40.50. Still healthy.

---

## Part 4: Content-Led Growth

*This section references `docs/GROWTH_STRATEGY.md` for the detailed SEO article plan and X personal brand strategy. What follows is the meta-level framework.*

### Content hierarchy

**Tier 1 — Evergreen SEO (highest long-term leverage):**
- Articles that answer high-intent search queries
- Target keywords: "fan email list for musicians," "link in bio for musicians 2026," "music pre-save campaign how to"
- These compound: a well-ranked article from Year 1 still drives traffic in Year 3
- Target: 5 articles published by Month 3, each with a specific target keyword and a clear ABLE CTA

**Tier 2 — Thought leadership (press-facing):**
- Articles that get picked up by Music Ally, Hypebot, The Trichordist
- Not primarily SEO-optimised — optimised for sharing by music industry curators
- Topics: "Why your link-in-bio should change on release day," "The case for artist-owned fan lists," "Who actually owns your fan relationship"
- These are trust-builders, not traffic drivers. One Hypebot placement > 10,000 generic impressions.

**Tier 3 — Product-led content (James's personal brand on X):**
- Build-in-public threads (what was shipped, what broke, what's next)
- Data posts (real numbers from the product, even when small)
- Competitor observation (factual, not aggressive)
- Insight posts (one observation about independent music, artist economics)
- See `docs/GROWTH_STRATEGY.md` for the detailed X strategy

**Tier 4 — Artist spotlights (community-building + press bait):**
- Once 20+ artists are on the platform: one artist spotlight per fortnight
- Published on the ABLE blog + shared on X
- Format: artist in their own words, talking about why they chose ABLE, showing their live page
- This is social proof AND identity marketing — it signals who ABLE is for

**Content production rule:** One piece per week, at most. James is a solo founder — overcommitting to content at the expense of the product is a failure mode. The SEO articles take priority over X threads, which take priority over spotlights.

### The comparison pages

The three most important pages on `landing.html` or as standalone pages:

1. `ablemusic.co/vs-linktree` — The honest comparison. Linktree is a redirect tool; ABLE is a campaign platform. Show the fee calculator, show the fan capture comparison, show what "release day" looks like on each.

2. `ablemusic.co/vs-beacons` — The fee argument. Beacons takes 9% on the free tier. At £1,500 merch month: they take £135. ABLE takes £0. Show this as a calculator artists can use.

3. `ablemusic.co/vs-feature-fm` — The consolidation argument. Feature.fm charges £39/mo for fan email + pre-save. ABLE's Artist tier at £9/mo does the same and more. Show the feature parity.

These pages are evergreen conversion pages. They catch comparison-shopping traffic (high intent) and they establish ABLE's value proposition in concrete, specific terms.

---

## Part 5: Partnership-Led Growth

*Deeper details in the dedicated partnership docs. What follows is the strategic framework.*

### Partnership tier hierarchy

**Tier 1 — Distribution partnerships (highest impact, longest timeline):**
- DistroKid, TuneCore, CD Baby — these are the platforms artists already trust for distribution
- A referral partnership ("artists on DistroKid get 2 months free ABLE Artist tier") drives acquisition from an existing trusted relationship
- Timeline: Year 2+ (requires ABLE to have 500+ artists and a credible demo)
- This is also a potential acquisition conversation starter

**Tier 2 — Education partnerships (high leverage for early acquisition):**
- UK music schools: BIMM (7 UK campuses, thousands of students), Institute of Contemporary Music Performance, Leeds Conservatoire, ACM
- These institutions teach independent music business — ABLE is a tool they'd recommend
- Offer: free Artist tier for all enrolled students, educator-level access for instructors
- This gets ABLE in front of early-career artists who are building their first presence
- Pipeline: 1 educator coordinator = potential 100+ student sign-ups

**Tier 3 — Producer seeding (best early-stage leverage):**
- See `docs/GROWTH_STRATEGY.md` for the detailed outreach sequence
- 20 UK producers in first 60 days
- Each producer = potential 3–10 artist sign-ups
- 25% recurring commission
- This is the highest-ROI cold acquisition available at the current stage

**Tier 4 — Venue and promoter partnerships:**
- Independent venues (The Lexington, Scala, Brudenell Social Club) and promoters (Communion, Arts Council-funded touring)
- Artists who play these venues are exactly ABLE's target market (independent, professional, fan-relationship-aware)
- Offer: QR code partnership — venue prints ABLE QR codes at shows, artists get ABLE page + "on tonight" feature at no cost for the night
- This is a brand-building and artist acquisition tool simultaneously

**Tier 5 — Creator economy tool integrations:**
- Mailchimp, Kit (formerly ConvertKit), Substack — integration partnerships that let artists export their ABLE fan list into their existing email tool
- This removes a switching barrier: artists who fear losing their current email setup can maintain both
- Timeline: Year 1–2, when the API and backend are stable

### Partnership prioritisation rule

Do not pursue more than two partnership conversations simultaneously. Each one requires James's personal time (calls, emails, follow-up). The cost of pursuing a partnership that doesn't convert is 4–8 hours of time that could have been spent talking to artists. Prioritise by: (1) number of artists reachable, (2) alignment with ABLE's values, (3) likelihood of conversion within 60 days.

---

## Part 6: Paid Growth (Phase 2 Only)

Paid acquisition is the last mechanism to activate, not the first. Here is the complete paid growth framework for when the time comes.

### The trigger for starting paid acquisition

**Do not run paid ads until all of the following are true:**
1. Monthly churn is below 4%
2. LTV:CAC ratio from organic channels is above 3:1
3. At least one organic channel is producing artists at under £20 CAC
4. 150+ paying artists (enough data to know what a "good artist acquisition" looks like)
5. The onboarding flow has a 50%+ activation rate (signed-up → live page with at least one fan sign-up)

**Why these criteria:** Paid ads amplify what already works. Running paid ads before organic validation means paying to learn what you should have learned for free. Every pound spent on an ad before LTV is known could be a pound spent acquiring an artist who churns in 30 days.

### The channel shortlist

**Channel 1: Meta (Instagram + Facebook) — most likely best performer**

Why: independent artists over-index on Instagram. The targeting options (interest: independent music, Bandcamp, DistroKid; behaviour: recently released music) can produce a reasonably qualified audience.

Target audience profile:
- UK-based (beachhead), age 22–38
- Interests: independent music, Bandcamp, DistroKid, home recording, SoundCloud
- Behaviour: recently engaged with music content, has a link-in-bio (implied by Instagram bio activity)

Ad format: video ads work best for demonstrating the campaign state concept. A 15-second video showing the profile state switching from pre-release → live → gig is the single most demonstrable differentiator ABLE has. No narration needed — the visual says everything.

Target CAC from Meta: £15–25/paying artist.
Budget to test: £2,000 over 4 weeks (before scaling).
Scale trigger: CAC below £20 with 3-month LTV above £36 (4× LTV:CAC).

**Channel 2: TikTok — experimental, lower CPM, harder to attribute**

Why: music creators are over-represented on TikTok relative to their share of Meta. The "struggling with Linktree" conversation is active on TikTok music creator content.

Why it's harder: attribution is weaker, the conversion path (TikTok → landing page → sign-up) has more friction than a Meta Instagram profile scroll.

Test format: organic-style content (James showing the product in a genuine, unscripted way) promoted via TikTok Ads. Not polished — authentic. The "founder building in public" content style translates well.

Budget to test: £1,000 over 4 weeks (smaller test, harder channel).

**Channel 3: Creator economy newsletters (most targeted, lowest volume)**

Why: Music Ally, Hypebot, Synchtank, Sandbox (via Music Ally), and The Trichordist are read by exactly the right people — working musicians, managers, music educators.

Format: sponsored mention or ad in the newsletter, priced per send rather than per click. Typically £200–600 per mention depending on the list size.

Why this works: the context is trusted editorial. An ad in Music Ally carries the implicit endorsement of Music Ally's curation. Conversion rates are lower than intent-based ads but the quality of acquired artist is typically higher (longer LTV, lower churn).

Target CAC from newsletters: £30–50/paying artist.
Budget to test: £2,000 across 3–4 newsletter placements.

**Channel 4: Google Search — for comparison keywords only**

Why: artists actively searching "linktree for musicians alternative" or "music link in bio" are in-market, high-intent buyers. The comparison pages (ablemusic.co/vs-linktree, ablemusic.co/vs-beacons) are the landing pages.

Keyword targets: "linktree alternative for musicians," "best link in bio for music artists," "music pre-save tool," "fan email capture for artists"

Why this is Phase 2: Google Search requires a functioning landing page with strong conversion rate (>5% visitor → sign-up) before paid traffic is worthwhile. Until organic SEO has validated the page converts, Google Ads are premature.

Budget to test: £1,500/month (bidding on 5–8 specific keywords).

### Paid growth budget framework

Total Phase 2 paid acquisition budget (Year 2, post-seed):
- Month 1–2: £4,000 across all four channels simultaneously (test phase)
- Month 3: kill the two worst-performing channels, double budget on the two best
- Month 4+: scale the single best channel

**The single channel rule:** Once one paid channel demonstrates CAC below £15 with good LTV, stop testing. Pour all budget into that one channel. The cost of split attention across multiple channels is significant — each requires creative iterations, audience testing, and attribution monitoring. Do one thing well.

---

## Part 7: The Growth Metrics Dashboard

The metrics that matter and how to read them. Build this in the admin platform view (`docs/systems/platform-admin/`).

### The 8 metrics that define ABLE's health

| Metric | Formula | Target (Year 1) | Target (Year 2) | Kill signal |
|---|---|---|---|---|
| **Activation rate** | Artists with ≥1 fan sign-up ÷ total sign-ups | 40% | 60% | <20% after 100 sign-ups |
| **Monthly churn rate** | Artists who cancelled ÷ total paying at start of month | <5% | <3% | >8% for 3 consecutive months |
| **NPS** | % Promoters − % Detractors | 40 | 55 | <20 after 30 responses |
| **CAC by channel** | Total channel spend ÷ paying artists acquired | <£30 | <£15 | >£50 without path to reduce |
| **LTV** | ARPU ÷ monthly churn rate | £180 | £400 | <£100 |
| **LTV:CAC ratio** | LTV ÷ CAC | 3:1 | 6:1 | <1.5:1 |
| **Fan capture rate** | Average fan sign-ups per artist page per week | 2/week | 8/week | <0.5/week after 30 days |
| **K-factor (viral coefficient)** | New sign-ups from referral ÷ total sign-ups | 0.15 | 0.30 | <0.05 (no word-of-mouth) |

### Reading the dashboard: the three states

**Green — all 8 metrics in target range:**
Growth mode. The product works. The acquisition engine is working. Stay the course, scale the best channel.

**Amber — 2–4 metrics out of target:**
Diagnostic mode. Which metrics are amber and are they related? Churn + NPS amber together = product problem. CAC amber alone = acquisition channel problem. Fan capture rate amber = onboarding or positioning problem. One metric out doesn't require a pivot — it requires a specific intervention.

**Red — activation rate or monthly churn in kill signal range:**
Stop acquisition spend immediately. Diagnose. Talk to churned artists. The answer is always in the conversation, not the spreadsheet.

### Weekly review rhythm

Monday: check MRR delta, artist count, churn events from last week.
Wednesday: review activation queue — which recent sign-ups haven't activated? Send personal follow-up.
Friday: review fan sign-up events — which artist pages are performing above average? Why? (This informs spotlight candidates and channel attribution.)

Monthly: full metrics review. Write the investor update. Identify one metric to improve next month.

---

## Part 8: The "One Channel" Principle

This is the most important strategic principle in the entire growth strategy.

### The rule

**Find one channel that acquires artists at under £5 CAC. Then double down on it. Kill everything else.**

This sounds extreme. It is the correct call.

### Why

Every growth channel you maintain requires:
- Time to manage and optimise
- Creative assets (articles, ads, social posts)
- Attribution monitoring
- Iteration on what's working

A solo founder running 6 channels simultaneously does all 6 of them at 17% capacity. A solo founder running 1 channel does it at 100% capacity. The 1-channel approach consistently outperforms the diversified approach in the pre-PMF phase.

The exception: maintain two channels if one is long-term compound (SEO) and one is short-term direct (producer seeding). These don't compete for the same time in the same way.

### How to identify the one channel

**Phase 1 (Weeks 1–12): Test three channels simultaneously**
- Producer seeding (direct outreach)
- SEO content (long-form articles)
- X personal brand (build-in-public)

Measure: how many paying artists came from each channel? What was the CAC? What is the 30-day retention rate of artists from each channel?

**Phase 2 (Month 3–6): Identify the leader**
One channel will be clearly outperforming the others. It will have: lower CAC, higher activation rate, and lower 30-day churn than the others. This is the one channel.

**Phase 3 (Month 6+): Double down**
Allocate 80% of growth time and all growth budget to the one channel. Maintain the other(s) at low burn (weekly X post, monthly SEO article) but do not optimise them actively.

**The trigger to add a second channel:** when the primary channel is working at capacity (all willing producers have been seeded, all high-intent SEO keywords are captured) AND growth has stalled for 2 consecutive months.

### ABLE's most likely "one channel"

Based on the analysis:

**Producer seeding is the most likely winner** in the first 60 days. Here's why:
- Producers work with 3–10 artists each — every single seed is a potential 5–10 sign-ups
- The trust transfer is instant (producer introduces ABLE = artist trusts it more than cold discovery)
- The CAC is effectively £0 in direct spend (James's time is the cost)
- The activation rate of referred artists is typically 40–60% higher than organic sign-ups

The alternative winner is the **"Made with ABLE" fan loop** — but this requires scale (artists) before it produces meaningful volume. It becomes the dominant channel at 200+ active artists. It is Phase 2's "one channel," not Phase 1's.

---

## Part 9: Growth at Each MRR Milestone

Specific, prioritised growth actions for each stage. The mistake is doing Year 3 actions at Year 1. Each stage has a different focus.

### Stage 0: £0 MRR (now — first paying artist)

**The only metric that matters:** 10 paying artists.

**Growth actions (in priority order):**
1. Personal outreach to 50 UK independent artists (DM, specific, not templated — see `docs/MARKET_VALIDATION.md` for the exact script)
2. Producer seeding outreach to 20 UK producers (see `docs/GROWTH_STRATEGY.md`)
3. Set up the referral infrastructure (billing + FirstPromoter/Rewardful integration — even if no affiliates yet)
4. Publish first SEO article
5. Do not do anything else

**What not to do at Stage 0:**
- Do not run paid ads
- Do not build Discord community (too few artists to populate it)
- Do not pitch press (no traction to show)
- Do not write more than one article per month (premature at this stage)

### Stage 1: £0 → £1k MRR (first 100 paying artists)

**The metrics that matter:** Activation rate, NPS, monthly churn, CAC from the two primary channels.

**Growth actions:**
1. Personal onboarding for every single artist who signs up (20-minute call offer)
2. Producer seeding — 40 producers reached in total
3. Music Ally submission (once 10+ live pages with real content)
4. Launch the "Made with ABLE" fan-to-artist loop (build the confirmation screen CTA)
5. First artist spotlight post (when you have one evangelical artist willing to be featured)
6. SEO articles 2 and 3 published
7. Set up basic X posting rhythm (3× per week)

**Key decisions at this stage:**
- Which channel is outperforming? Start doubling down.
- Which artists are evangelical? Recruit them as Founding Artists.
- Activation rate: if below 30%, fix onboarding before any additional acquisition spend.

### Stage 2: £1k → £5k MRR (100 → 500 paying artists)

**The metrics that matter:** CAC by channel, K-factor, LTV, churn by tenure cohort.

**Growth actions:**
1. Double down on the one working channel
2. Launch the Abler programme (application-only — 20 producers + 5 educators)
3. Discord community launch (minimum 50 active artists to seed it)
4. Founding Artists programme close (100 artists filled)
5. Product Hunt launch (when NPS is above 40 and you have 10+ strong reviews)
6. Press coverage: Music Ally (primary), Hypebot (secondary)
7. First comparison page live (ablemusic.co/vs-linktree)
8. Annual plan launch (20% discount — reduces monthly churn exposure)

**Key decisions at this stage:**
- Is the fan loop producing meaningful volume? If yes: the secondary growth engine is running.
- Is referral (K-factor) above 0.15? If yes: the community is healthy.
- Consider the first education partnership outreach (BIMM is the priority).

### Stage 3: £5k → £20k MRR (500 → 2,000 paying artists)

**The metrics that matter:** LTV:CAC ratio by channel, cohort retention curves, referral coefficient by tier.

**Growth actions:**
1. Begin paid acquisition testing (Meta video ads first — £2k test budget)
2. Colombia market preparation (Spanish-language user research, 10-artist beta cohort)
3. Integration with DistroKid or TuneCore (referral partnership conversation)
4. Artist Pro tier NPS measured separately — Pro artists should have higher NPS than Artist tier
5. Label tier development (10-artist manager/label accounts)
6. Fan dashboard (fan.html) launch — this is when the network effect becomes visible

**Key decisions at this stage:**
- Is paid acquisition viable (CAC below £20)? If yes: scale the winning channel.
- Is the fan dashboard generating fan activity? This is the first network effect signal.
- Seed round preparation (if MRR trajectory is £20k in 6 months, investor conversations begin).

### Stage 4: £20k → £50k MRR (2,000 → 5,000 paying artists)

**The metrics that matter:** Net revenue churn (expansion MRR from upgrades minus churn), fan network activity, cross-artist fan overlap.

**Growth actions:**
1. US market entry (with proof from UK retention data)
2. Team expansion (Artist Success hire, engineer hire)
3. Aggregate distribution partnership (preferred tool recommendation from DistroKid or similar)
4. Data product development — the benchmarking feature ("Artists in your genre capture fans at 3.2% — you're at 1.1%")
5. Artist Pro → Label tier upsell campaign for managers managing 3+ artists

**Key decisions at this stage:**
- Is the data moat building? (1,000+ artists = meaningful benchmarks)
- Series A metrics: £50k ARR, 100k+ fans in the fan dashboard, sub-2% monthly churn
- Exit signals: are acquirers aware of ABLE? Are there inbound M&A conversations?

### Stage 5: £50k MRR+ (5,000+ paying artists)

At this stage, the growth playbook is different — it is team-driven, not founder-driven. James's role shifts from doing growth to managing growth.

**The new growth model:**
- Artist Success team drives retention and NPS
- Community Manager drives the Discord and Abler programme
- Growth engineer owns the data product and funnel optimisation
- James focuses on product direction, investor relations, and strategic partnerships

---

## Part 10: International Growth Sequencing

### The beachhead principle

Never expand internationally until:
1. 80%+ of UK artists are still paying at 12 months (strong UK retention)
2. At least one organic channel works below £10 CAC in the UK
3. NPS is above 50 in the UK

Expanding internationally with poor UK retention is amplifying a problem. The UK first.

### UK (Now → Year 2)

The beachhead. Densely connected independent music community (AIM, PRS, Music Ally, BBC 6 Music culture, strong indie scene). English-language. High willingness-to-pay. ABLE is culturally native here.

**UK-specific growth levers:**
- AIM (Association of Independent Music) relationships — the trade body for UK independents
- BBC Introducing — artists signed up via BBC Introducing are exactly ABLE's demographic
- UK university music societies — the next generation of independent artists
- Bandcamp Friday UK artists — Bandcamp's monthly fee waiver brings out active independent UK artists

### Colombia (Year 2 → Year 3): The Latin American beachhead

**Why Colombia specifically:**
- Medellín is the fastest-growing music city in Latin America (Shakira, J Balvin, Maluma all roots there — but the independent scene below that is enormous)
- Colombian independent artists have high motivation to own their fan relationships (less established label infrastructure than Brazil or Argentina)
- Lower CAC than UK/US (less competitive market for tools)
- Colombia as proof of concept for Spanish-language Latin American expansion

**What's needed before Colombia:**
- Spanish language localisation (able-v7.html, landing.html, start.html)
- A Colombia-based community hire (part-time, music-native)
- Partnerships with Medellín music collectives and recording studios

**The Colombia test:**
- 100 Colombian artists onboarded (bilingual support via community hire)
- CAC and retention data collected over 6 months
- If CAC is below £10 and retention is comparable to UK: scale to all of Latin America

### US (Year 2–3, with proof): The prize

The US market is 10× the UK in addressable artists but 5× harder to acquire (more noise, higher CPMs, more competition from US-native tools). Do not enter the US cold.

**US entry strategy:**
- Not acquisition-first. Partnership-first.
- Target a partnership with DistroKid (already has 10M+ US artists) or one of the US-native music education platforms
- Enter with a referral agreement, not a CAC campaign
- The US artist community is on Twitter/X and Reddit in a way the UK community is not — the X personal brand strategy has higher leverage in the US

**What to say in US investor conversations:**
"We're UK-first intentionally. The UK is a £5M ARR market alone, it's where James is, and it's where we can do the personal onboarding that turns early users into evangelists. When we have product-market fit in the UK, the US is a 10× multiplier. We're not premature."

### Rest of world (Year 4+)

After UK + Colombia + US are established:
- Brazil (Portuguese — separate localisation from Colombian Spanish, separate community)
- Australia (English, but different music scene dynamics — strong pub rock and independent country scene)
- Germany (large independent electronic scene, high willingness-to-pay for software tools)
- Nigeria / South Africa (emerging independent music markets with strong diaspora links to UK)

---

## Part 11: The Growth Anti-Patterns

Things that look like growth but destroy it.

### Anti-pattern 1: Acquisition before retention is fixed

The symptoms: rising sign-up count, flat or declining active user count. The cause: churn is faster than acquisition. The fix: stop acquisition spend until churn is below 5%. Every pound spent on acquisition while churn is high is literally being flushed.

### Anti-pattern 2: Optimising for free sign-ups instead of active pages

Free sign-ups are a vanity metric. An artist who signs up and never creates a page has no value and no LTV. The metric is "activated artists" — artists with a live page and at least one real fan sign-up. Report this number, not the total sign-up count.

### Anti-pattern 3: Copying the Linktree go-to-market (broad, generic, high volume)

Linktree grew by being useful to everyone with a link to share. ABLE is not for everyone. ABLE is for independent musicians who care about their fan relationship. Broad acquisition (Product Hunt blasts, generic Meta ads, general creator economy newsletters) will bring in the wrong users — they will sign up, not activate, and depress every metric that matters. Stay narrow. Go deep.

### Anti-pattern 4: Adding channels before the first one works

The feeling of running multiple acquisition channels simultaneously is productive. The reality is that none of them work well. The discipline is: one channel at a time, until it works or demonstrably fails. Then the next.

### Anti-pattern 5: NPS as a lagging indicator

NPS is important. But measuring it once every three months is too slow. At 30 responses, run the analysis. At each subsequent 10 responses, update the rolling average. Detractors who go uncontacted for 60 days have already told other artists about their bad experience. Contact every detractor within 72 hours.

---

## Summary: The One-Page Growth Plan

**The simple version of this entire document:**

1. Fix retention first. Activation rate above 40%, monthly churn below 5%. Nothing else until this is true.
2. Run two channels in parallel: producer seeding (direct, high-leverage) and SEO articles (compound, long-term).
3. Launch the "Made with ABLE" fan loop in the product — the only growth mechanism with zero marginal cost.
4. Find the one channel that works below £5 CAC. When you find it, put all time and budget there.
5. Build the Founding Artists community (100 maximum). These are your evangelists, your feedback source, and your press-able social proof.
6. Do not run paid ads until: 150 paying artists, NPS above 40, churn below 4%, one organic channel working.
7. UK first, always. Colombia when UK retention is proven. US when Colombia is proven. Do not skip steps.
8. Measure the 8 metrics weekly. Act on the amber ones. Stop acquisition when anything turns red.
9. Growth at £50k MRR is a team sport. Before that: it is a founder sport. Design the founder-era growth playbook to be executable in 5 hours per week.
10. The one thing that makes everything else easier: 50 evangelical artists who tell other artists without being asked. Earn them first. Everything else follows.
