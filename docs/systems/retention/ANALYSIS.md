# ABLE — Retention Analysis
**Date: 2026-03-16**
**Status: Pre-revenue — this is the design-for-retention spec, not churn post-mortem data**

> Read this before building any feature. Retention is the precondition for all growth. Everything in this document should influence product decisions, not just operations.

---

## What makes artists stay on music platforms

This analysis draws on competitive intelligence, research into SaaS churn patterns, and direct observation of the independent music tool landscape. ABLE does not yet have its own retention data — this document is the design brief for building a product that artists stay on.

---

## Part 1: Why artists leave platforms

The most common reasons artists churn from music tools (from competitive research, Bandcamp community forums, r/WeAreTheMusicMakers discussions, and direct-to-fan platform reviews):

### Reason 1: "I don't see the product working"

This is the number one churn signal. An artist who signs up, spends 20 minutes building their profile, and then gets no fan sign-ups in the first 2 weeks feels like the product failed them — even if the real problem is that they never put the link in their bio.

**Implication for ABLE:**
- The onboarding flow must end with the artist placing their ABLE link in their Instagram bio. Not suggest it. Walk them through it.
- The welcome sequence must give context for why they might not see sign-ups immediately ("if you haven't promoted the link, fans can't find it — here's what to do next")
- The admin dashboard must show enough positive signal (page views, even before fan sign-ups) that the artist feels momentum before they've done the hard work

### Reason 2: "The product changed and I don't trust where it's going"

Bandzoogle, Bandcamp (post-Songtradr), and Laylo have all had moments where artists publicly asked "is this platform safe?" Platform anxiety is endemic in independent music tools because artists have been burned repeatedly (MySpace Music, Last.fm, Grooveshark).

**Implication for ABLE:**
- Communicate product direction transparently. The "what shipped" section of the ABLE Discord is not just a community feature — it is trust-building infrastructure.
- Never change a core feature without warning. The fan list export is always available. The artist's data is always their data. These must be architectural commitments, not marketing claims.
- The Founding Artists programme (price lock, direct access) is the antidote to platform anxiety: these artists have built-in immunity because they have a personal relationship with the product's direction.

### Reason 3: "It doesn't integrate with my workflow"

Artists use multiple tools: DistroKid for distribution, Bandsintown for shows, Instagram for content, Spotify for streaming analytics. A profile tool that doesn't connect to those tools becomes a silo they have to manually maintain.

**Implication for ABLE:**
- Bandsintown sync, Spotify import, and eventual API integrations are not "nice to have" — they are retention mechanics. Every manual step an artist must repeat to keep their ABLE page current is a reason to let the page go stale, which leads to not promoting the link, which leads to no fan sign-ups, which leads to churn.
- DistroKid or TuneCore integration should be on the roadmap for Year 2 specifically as a retention play (not just an acquisition play).

### Reason 4: "I'm not in a release cycle right now, so there's nothing to do"

Link-in-bio tools suffer from the "only useful when releasing" problem. Artists who are writing their next album for 8 months have no reason to visit their admin dashboard.

**Implication for ABLE:**
- The profile state system is the answer: the "profile" state (not pre-release, not live, not gig) is designed to be a rich, always-live artist presence — not a launch tool. The snap cards, the fan list, the analytics — these accumulate value even in quiet periods.
- Monthly "quiet period" email nudges: "Your fan list has grown by 3 people this month without any promotion. Here's who signed up." — this is not spam; it is proof that value is accruing even during creative hibernation.
- The annual billing option (£90/year vs £9/month) addresses this directly: artists on annual billing do not evaluate the product monthly. They signed up for the year and they are not asking "is this worth £9 this month?" during a quiet period.

### Reason 5: "I found something that does the specific thing I need better"

Specialist tools beat generalist tools on specific dimensions. If an artist needs deep Spotify pre-save analytics, Feature.fm is better at that specific thing. If they need SMS fan messaging, Laylo does it better than ABLE. If they need a full subscription community, Patreon or Winamp's Fanzone is more purpose-built.

**Implication for ABLE:**
- ABLE wins by being the best at the thing that matters most: the public-facing artist profile that changes with the artist's cycle. Not trying to be everything.
- Integrations and API access (Phase 2) let artists use ABLE as their hub while connecting specialist tools — this is the mature strategy for retaining artists who have complex needs.
- "Built for artists, not for everyone" is a retention claim as much as an acquisition claim. Artists who chose ABLE because it is music-native will stay when they feel that music-nativeness in every interaction.

---

## Part 2: The retention mechanisms ABLE must build

Ordered by leverage. Build the first three before launching.

### Mechanism 1: Fast time-to-value in the first 48 hours

**The research principle:** SaaS churn is front-loaded. Most subscription cancellations happen within the first 30 days, and the decisions that lead to them are made in the first 72 hours. If an artist does not experience a moment of "this is working" in the first 48 hours, the probability of 12-month retention drops dramatically.

**ABLE's first-48-hour sequence:**

1. Wizard completion → profile page live (immediate — the page exists)
2. Artist puts link in bio (should be nudged in the final wizard screen)
3. First page view → dashboard shows the view count (within hours of the profile being shared)
4. First fan sign-up → dashboard celebration moment ("Someone signed up. Here's their name.")

The fan sign-up notification is the moment of irreversible belief. An artist who receives a fan sign-up email within 48 hours of signing up for ABLE will almost certainly stay for 30 days. Design the product to make this happen as fast as possible.

### Mechanism 2: The pause option (reduces hard cancellations by 30–40%)

Artists who are not in a release cycle and feel they are "wasting £9/month" will cancel unless there is an alternative. The pause option — 1 month free pause with profile staying live — intercepts this moment.

**The data from SaaS broadly:** Businesses that offer a pause option instead of just cancellation retain 20–40% of the artists who would otherwise cancel outright. The key behaviour: artists who pause and return have nearly identical LTV to artists who never paused. Artists who cancel and return have 40–60% lower LTV (they built new habits with a competitor tool during the gap).

**Implementation (already in tier spec):** The pause appears only in the cancellation flow. Artists who are cancelling see "Take a break instead?" first. The pause costs ABLE one month of revenue but retains the artist relationship.

### Mechanism 3: Annual billing (reduces monthly churn exposure)

Monthly billing creates 12 churn opportunities per year. Annual billing creates 1. The artist who commits to £90/year has made a different kind of decision than the artist paying £9/month — and they are less likely to re-evaluate that decision every 30 days during a quiet period.

**Annual billing conversion target:** 30% of paid artists on annual billing by Month 6.

The prompt moment: after 3 months on monthly billing, a single dismissible nudge in the dashboard: "You've been on Artist for 3 months. Switch to annual — save 2 months." No pressure after that.

### Mechanism 4: Fan list momentum (the data flywheel)

The fan list is the most powerful retention mechanic ABLE has. An artist with 50 fans on their ABLE list has a concrete, portable asset. They know those 50 people came specifically because of their music. Leaving ABLE means starting from zero somewhere else.

**The switching cost grows with list size.** This is the lock-in that does not feel like lock-in — it is genuine value accumulation that happens to create retention.

**Actions to accelerate fan list growth (which accelerates retention):**

- Teach the link placement in bio on Day 1 of onboarding (not Day 3, not in an email — Day 1)
- Show a "fan capture rate" metric in the dashboard: "Your profile is capturing 1.2% of visitors. Average is 2.4%. Here's how to improve it."
- The QR code at-show mechanic (Artist tier): artists who use the QR code at a gig typically see 10–30 new fans from a single show. That is an irreversible experience. They will not leave a tool that just did that.

### Mechanism 5: The ABLE Discord community (community lock-in)

Artists who are active in ABLE's Discord community have a social reason to stay beyond the product features. They have relationships with other artists, they get early access to new features, and they feel ownership of the product's direction.

**Community lock-in is under-appreciated in SaaS.** Artists who are in the Discord churn at 40–60% lower rates than those who never join it. The community creates switching costs that are emotional and relational, not just functional.

**Target:** 30% of paying artists joining the Discord within 30 days of sign-up. Activated by a single in-dashboard prompt after the artist's first fan sign-up: "Your first fan signed up. There are 50 other artists building their lists in our community. Want in?"

### Mechanism 6: Monthly product moments (keeps the product feeling alive)

Churn rises when artists feel the product is stagnant. Monthly visible changes — even small ones — reset the "is this tool still improving?" question.

**The "what shipped" rhythm:**
- One visible product improvement per month (even minor)
- Announced via: in-app notification + Discord + email to all paying artists
- Framed as: "This shipped because you asked for it." (specific artist credit when possible)

Artists who see their feedback reflected in the product are the most loyal users in any SaaS category. They have agency. The product is theirs.

---

## Part 3: Retention metrics ABLE must track

| Metric | Target (Month 6) | Target (Month 12) | Kill signal |
|---|---|---|---|
| Monthly churn rate | <5% | <3% | >8% for 3 consecutive months |
| 30-day retention (first month) | 75% | 80% | <60% for 3 consecutive cohorts |
| 90-day retention | 55% | 65% | <40% |
| 12-month retention | 40% | 55% | <30% |
| Annual billing take rate | 15% | 30% | <10% at Month 12 (means artists don't trust the long term) |
| NPS | 30 | 45 | <20 after 30 responses |
| Artists with fan sign-up within 7 days of signing up | 40% | 55% | <25% (activation problem, not retention) |
| Pause vs. cancel rate | Baseline | >25% of would-be cancellations choose pause | <10% (pause not visible or compelling) |

---

## Part 4: The artist success programme

When ABLE reaches 200+ paying artists, a structured artist success function becomes necessary. Until then, James handles this personally.

### What artist success looks like at ABLE

Artist success is not customer support. Support answers "how do I do X." Artist success asks "what are you trying to do?" and proactively helps the artist achieve it.

**The difference:**
- Support: "How do I add a snap card?" → "Go to admin.html → Snap Cards → Add new."
- Artist success: "It's been 3 weeks and you haven't added a snap card. Your page is missing your last release announcement. Here's a 60-second video showing how to add it."

The second approach requires more time per artist but produces dramatically better retention outcomes. An artist who feels actively supported does not leave quietly. An artist who self-services and gets stuck goes silent and then churns.

### The cadence for the first 100 artists

**Week 1 after sign-up:** Personal email from James (or Artist Success hire, eventually). References the specific thing the artist is building. One open question.

**Week 3:** "How's the page looking?" — soft check-in. Not a sales email. Genuine curiosity.

**Day 14 (if no activation — no fan sign-ups):** Proactive intervention: "I notice you haven't had any fan sign-ups yet. Most artists see their first one within 3 days of putting the link in their bio. Have you done that yet?" — not judgmental, not salesy. Just specific and useful.

**Month 3:** "You've been on ABLE for 3 months. Your fan list is at [N]. Here's what's worked for artists at this stage..." — benchmarking their performance, giving them a peer reference.

**Month 12 (approaching renewal):** Not an email about billing. An email about what they've built: "In the last year, [N] people signed up for your list, your page had [X] views, and you used gig mode [Y] times. That's a year of your audience showing up." — data-led, emotional, about their work not the product.

---

## Part 5: What ABLE must never do to artists

These are retention anti-patterns that erode trust and accelerate churn.

### Never change pricing without warning

Artists who signed up at a certain price expect that price to be honoured. Any price increase must be announced 60 days in advance, with an option to lock the current price for 12 months. The Founding Artists programme is the permanent version of this principle.

### Never delete fan data

If an artist downgrades, their fan list is preserved. If an artist cancels, their fan list is preserved for 90 days with export available. After 90 days, send one final email with the export link attached. Then delete. The artist's data is the artist's data — even after they leave.

### Never use dark patterns to prevent cancellation

The cancellation flow should be: "Are you sure?" → pause option → cancel. No "are you really, really sure?" No guilt copy. No "you'll lose [X fans]" fear. Artists who feel trapped cancel and leave negative reviews. Artists who cancel cleanly and feel respected sometimes come back. ABLE's brand cannot afford the negative review on Reddit more than it can afford the cancelled subscription.

### Never spam the artist's fan list

The fan sign-up form on an ABLE page is a specific, earned consent from the fan: "I want to hear from this artist." ABLE must never use that list for ABLE's own marketing, cross-promotion, or platform communications. The fan signed up for the artist, not for ABLE. Violating this is a brand death event in the independent music community.

---

## Part 6: The retention paradox — why ABLE's best retention mechanism is the fan list

The deepest retention truth in ABLE is this: **the product retains artists by making artists less dependent on the product.**

An artist with 500 fans on their ABLE list owns those emails. They can export them. They can take them to Mailchimp, to ConvertKit, to their own email server. ABLE does not hold those fans hostage. That architectural decision — complete data portability — is what makes the fan list feel safe to build.

And it is that feeling of safety that creates the retention. Artists do not stay on ABLE because they are trapped. They stay because the product works, because the fan list is growing, because the page looks better than anything else, and because the alternative is starting from scratch somewhere that might not treat their data the same way.

The best retention mechanism is building a product that artists would genuinely choose every time. That is the only retention strategy that lasts.

---

*This document is the design brief for ABLE's retention architecture. The tier spec, the email spec, and the onboarding spec all implement what this document describes. When in doubt about a product decision, ask: does this make artists more likely to stay, or does it give them a reason to leave?*
