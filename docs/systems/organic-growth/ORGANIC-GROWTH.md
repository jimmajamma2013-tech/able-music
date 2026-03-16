# ABLE Organic Growth System
**Created: 2026-03-16 | Status: Canonical spec | Score: 10/10**

> This document defines the structural growth logic for ABLE. It is not a campaign plan. It is an explanation of how ABLE grows without buying its way in — and why that is a permanent strategic advantage, not a bootstrapper's workaround.
>
> Read alongside: `docs/GROWTH_STRATEGY.md`, `docs/reference/research/PLATFORM_STRATEGY.md`, `docs/reference/research/DISCOVERY_AND_GROWTH.md`, `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md`

---

## Part 1: The Philosophy

### Growth is structural, not tactical

Most tools grow through performance marketing. They buy impressions, measure CAC, optimise landing pages. When the spend stops, the growth stops.

ABLE does not grow this way. Every product decision — the "Made with ABLE" footer, the fan sign-up confirmation email, the freelancer credit link, the Abler programme — is a compounding growth mechanic built into the product itself. When the product ships, the growth engine ships with it.

This is not a constraint imposed by budget. It is a deliberate strategic choice. Paid acquisition attracts artists with no particular reason to care about ABLE. Structural acquisition attracts artists who found it because someone they trust was already on it. The difference in activation rate, retention, and eventual conversion to paid is not marginal. It is the difference between a platform and a leaky bucket.

### Why ABLE will not run paid ads in V1

Three reasons, each sufficient on its own.

**First:** ABLE does not yet have product-market fit. Running paid ads before knowing that the product retains the people who sign up wastes money and distorts signal. Every pound spent on an ad is a pound not spent on a feature that would have made existing artists stay and refer.

**Second:** The artists ABLE wants are sceptical of marketing. An indie musician who sees a paid ad for a "link-in-bio tool" in their feed is not the artist who will become evangelical. The artist who finds ABLE because a producer they work with mentioned it, or because the artist they admire uses it, arrives with trust pre-installed.

**Third:** Paid ads bring artists with no context. Referred artists arrive with a story. "I joined because [name] told me about it" is the beginning of a relationship. An ad conversion is a transaction.

When ABLE is at 10,000 artists and the unit economics are proven, a targeted paid channel may make sense. Until then, it is a distraction and a discipline-drain.

### The earned distribution principle

ABLE earns its way into artists' awareness by being genuinely excellent. Not excellent by SaaS metrics — excellent by the standard that matters to an independent musician: does this make my page feel like me? Does it put my music in front of people who care? Does it give me back something I can own?

Word of mouth from one artist to another is the most efficient distribution channel that exists in the independent music world. It is faster than press, more trusted than advertising, and more durable than any algorithm. ABLE's job is to be so good at the thing artists care about that they cannot help telling someone.

### The waterfall model

Growth does not start at artists. It starts upstream.

A single producer with a 50k following and a roster of 5 active artists is worth more to ABLE than 50 individual artist sign-ups with no network. When that producer joins, they bring their clients. Each client has fans — 200, 2,000, or 20,000. Each fan who signs up through an artist's page sees the ABLE brand. Some of those fans are artists themselves.

The waterfall:

```
1 producer (50k reach, 5 clients)
    → 5 artists join ABLE
    → each artist page gets 500 fan sign-ups in month 1 = 2,500 fan impressions
    → each fan sees "Made with ABLE" on sign-up = 2,500 brand exposures
    → 30% of fans are also independent artists (music adjacent audience skew) = 750 potential artists
    → 5% of those investigate ABLE = 37 artist page visits
    → 25% of those sign up = 9 new artists
    → repeat
```

One producer seeded well becomes a growth node that compounds for 12 months without further intervention.

---

## Part 2: The Five Organic Growth Engines

### Engine 1: The Artist Page as Impression Machine

Every ABLE page is a live brand impression. Every fan who lands on it, reads it, and signs up has been exposed to ABLE — not as an ad, but as the platform that made the artist they care about look and feel the way they do.

**The "Made with ABLE" footer**

Every artist page carries a footer attribution by default:

- Position: bottom of page, right-aligned, outside the main content scroll
- Text: "Made with ABLE"
- Size: 11px
- Opacity: 0.5 at rest, 0.8 on hover
- Link: `landing.html?utm_source=artist_page&utm_campaign=footer&utm_content=[artist_slug]`
- Hover: fade to full opacity, no underline in default state (text link pattern)
- Colour: inherits from `--color-text` at 50% opacity — works across all four themes
- Artist Pro removes it entirely. This is a feature of the Pro tier, not a punishment for the free tier.

Why right-aligned and small: it is respectful of the artist's page. This is their space. ABLE is a guest, not a landlord. The attribution should be discoverable by curious fans, not blasted at them.

**The fan sign-up confirmation email**

When a fan completes the email capture on an artist's page, the confirmation email they receive contains:

Subject: `You're on [Artist Name]'s list.`

Body: `[Artist Name]'s page is where you'll hear things first. Nothing else.`

`— ABLE, the platform where [Artist Name]'s page lives.`

The ABLE brand appears once, in context, without pitch. Curious fans who click through arrive at `landing.html`. This is a secondary CTA in the email, not a primary one.

**The fan dashboard brand exposure**

When fans later log into `fan.html`, the ABLE brand is present throughout the authenticated experience. They see the logo, they see the platform name in context (not in an ad — in the product they use to stay close to artists they care about). This is the highest-quality brand impression possible: it occurs when the fan is already in a positive emotional state.

**Scale maths**

| Month | Artists | Page Views/Artist/Month | Total Impressions | Unique Fan Emails |
|---|---|---|---|---|
| 3 | 100 | 300 | 30,000 | 3,000 (at 10% capture) |
| 6 | 400 | 450 | 180,000 | 18,000 |
| 12 | 1,500 | 600 | 900,000 | 90,000 |

At month 12, ABLE is generating 900,000 brand impressions monthly with zero ad spend. Every one of those impressions occurs in the context of an artist that the fan actively sought out.

---

### Engine 2: The Freelancer Credit Graph

When an artist adds a release snap card and credits their collaborators — producer, mixing engineer, mastering engineer, photographer — those credits are not decorative. They are growth nodes.

**How the credit loop works:**

1. Artist publishes a release snap card with credits: "Produced by Maya Beats · Mixed by Studio Zero"
2. "Maya Beats" links to `able.fm/mayabeats` if she has an ABLE profile, or to her Instagram if she doesn't
3. Every fan who reads the credits and clicks through is a referral from the artist's page to the freelancer's page
4. Maya Beats's ABLE profile is a complete, professional page — rate card, portfolio, booking CTA, past credits
5. Maya Beats's clients discover ABLE through their own credits
6. "Worked with [X artists]" on Maya's profile links back to each artist — a bidirectional discovery graph

**The freelancer incentive to join ABLE:**

Freelancers join ABLE because their clients are already on it and crediting them. The acquisition cost is zero. The activation incentive is self-evident: "Your credits are already appearing on artist pages — claim your profile and control what fans see."

This is one of the rare acquisition mechanics where the friction is actively reversed. The product is better for the freelancer if they join, and the artist's page is richer if they have.

**Quantifying the loop:**

An active UK producer works with 12 artists per year. Each artist's release snap card credits them. Across 12 releases, assuming an average of 200 release card views per snap card:

- 2,400 credit impressions per year per freelancer
- If 3% click through: 72 profile visits from artist credit links
- If 10% of those visitors are also freelancers who investigate joining: 7 potential freelancer sign-ups per year from one credited producer

Across 100 credited freelancers on the platform: 700 potential freelancer sign-ups per year from credit discovery alone.

---

### Engine 3: The Musician Community Flywheel

Artists talk to each other constantly — in WhatsApp groups, in studio corridors, at gigs, in comment threads. This is the highest-velocity distribution channel in the independent music world and it cannot be manufactured. It can only be earned.

**The k-factor**

If every artist who joins ABLE causes one other artist to join, the network grows linearly. If every artist causes 1.1 others to join, it grows exponentially. The k-factor target is 1.3 — achievable when:

- The page is beautiful enough that artists are proud to show it
- The setup is fast enough that referring someone is low friction
- The value is obvious enough that no explanation is needed

**How to increase k-factor in the product:**

Friction in the referral path kills k-factor. Every step between "I want to tell someone about ABLE" and "they've signed up" loses 30-50% of potential referrals. The product must remove every step it can.

**In-product referral mechanics (admin.html)**

**1. Share Your Page button**

Prominent in the admin dashboard header. Tapping it opens a share sheet with:

Pre-generated tweet/caption:

> "This is where I put everything: my music, my shows, what I'm working on. No algorithm between us. [able.fm/name] — got your own? able.fm"

Note: this is the artist's voice, not ABLE's marketing copy. ABLE never speaks for the artist. It hands them a sentence they can use.

Variants: Instagram caption (shorter), WhatsApp message (most direct), copy link only.

**2. Invite a fellow artist button**

Generates a unique referral URL: `able.fm/join?ref=[artist_slug]`

When the referred artist signs up:
- Both get 1 month free on Artist tier
- The referring artist sees in their dashboard: "3 artists joined through your link. [Name], [Name], [Name]."
- The referred artist's first email says: "[Name] thought you'd be here." — in the artist's voice, not a corporate notification

**3. The Abler Programme (formal referral layer)**

Described in detail in `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md §1`. The Abler programme converts the informal "you should use ABLE" into a tracked, rewarded relationship.

Tiers:
- Fan Abler (any artist): 20% recurring commission for 6 months
- Creator Abler (10k+ reach): 25% for 12 months
- Partner Abler (approved): 30% for 12 months + co-marketing

The programme is activated at Week 4 (peer referral is live from Day 1 — it is embedded in the product, not the programme).

---

### Engine 4: Content-Led Discovery

The founder's public presence is a growth engine. James building ABLE in public, authentically documenting the process, is not a marketing tactic. It is the honest story of a product being built for a community the founder understands. That story is the most credible form of acquisition there is.

**Why "building in public" works for ABLE specifically:**

Independent artists follow people who understand their world. A producer or singer-songwriter who finds James's content is not watching a founder pitch a product — they're watching someone who has thought hard about the specific problems they face (algorithm dependency, platform fees, not knowing who their real fans are) and is doing something about it.

The credibility is in the specificity. Not "I'm building a link-in-bio tool" but "I'm building the thing that should exist for independent musicians and I'm showing you exactly why every existing option is wrong for them."

**Three content types (in rotation):**

**Type 1: Artist spotlights**
Real ABLE artists, showing their pages, in their own words. James posts about them — not a feature announcement, a genuine spotlight on their work and how their page lives. ABLE is the platform, not the story.

Cadence: one per fortnight from month 2. Distributed on X, Instagram, TikTok.

These serve three purposes simultaneously: they give the featured artist reach, they show prospective artists what ABLE looks like with real content, and they signal the kind of artists ABLE is for (independent, thoughtful, direct).

**Type 2: Behind the build**
Weekly posts on X showing what shipped, what broke, what the reasoning was. The honest account of a product being built in the open. No hype, no announcements. Observations and decisions.

The voice: "Here's why I built it this way" not "Excited to announce." The copy philosophy in `CLAUDE.md` applies here. No exclamation marks. No "game-changing." Direct, specific, honest.

**Type 3: Education for independent artists**
Tips, explanations, and perspectives on the specific problems independent musicians face. Not product-related — genuinely useful. "Your email list is the only thing the algorithm can't take from you" published two weeks before the email capture feature is mentioned earns trust that a product announcement never could.

This is the "earn trust before you ask for anything" content. Target: one educational piece per week, distributed across X and short-form video.

**Content → signup attribution:**

All content links to `landing.html` with UTM parameters by channel:
- `?utm_source=twitter&utm_medium=organic&utm_campaign=build_thread`
- `?utm_source=instagram&utm_medium=organic&utm_campaign=spotlight`
- `?utm_source=tiktok&utm_medium=organic&utm_campaign=education`

PostHog captures this from Day 1. By Month 3, the data will show which content type drives the most activated sign-ups (not just sign-ups — activated, with at least one fan captured).

---

### Engine 5: SEO and Search Discovery

Every ABLE artist page is a public URL with structured data, OG tags, and a canonical URL. When a fan Googles an artist's name, the ABLE page has a strong chance of appearing — not because ABLE has done anything clever, but because the page is properly structured and the artist has linked to it from their social profiles.

This is passive SEO. It compounds over time without ongoing effort.

**Page-level SEO (built into every artist page):**

```html
<title>[Artist Name] — Official Page</title>
<meta name="description" content="[Artist Name]'s music, shows, and everything in between.">
<meta property="og:title" content="[Artist Name]">
<meta property="og:image" content="[Artist artwork URL]">
<meta property="og:url" content="https://able.fm/[artist_slug]">
<link rel="canonical" href="https://able.fm/[artist_slug]">

<!-- Structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "[Artist Name]",
  "url": "https://able.fm/[artist_slug]",
  "genre": "[genre]",
  "event": [{ "@type": "MusicEvent", ... }]
}
</script>
```

This is spec'd in full in `docs/systems/seo-og/SPEC.md`.

**Platform-level SEO (ABLE.fm domain authority):**

ABLE targets a cluster of long-tail keywords that independent artists search when they are actively looking for a solution. Low competition now, compounding over 12 months:

| Keyword | Monthly searches (est.) | Competition | Content type |
|---|---|---|---|
| "link in bio for musicians" | 1,200 | Low | Article + landing page |
| "fan email list for musicians" | 800 | Low | Article |
| "music artist page" | 3,400 | Medium | Artist profile pages (mass) |
| "music pre-save campaign" | 1,100 | Low | Article |
| "how to get a press kit musician" | 600 | Low | Article |
| "best linktree alternative for musicians" | 2,000 | Low | Comparison page |
| "musician website one page" | 900 | Low | Article + landing page |

Five priority articles (spec'd in `docs/GROWTH_STRATEGY.md §SEO strategy`):
1. "How to build a fan email list as an independent musician (2026)"
2. "The best link-in-bio for musicians in 2026"
3. "How to do a music pre-save campaign"
4. "Why your profile should say something different on show nights"
5. "Who actually owns your fan list?"

All published at `able.fm/blog/`. No CMS required in V1 — static HTML pages using ABLE's design system.

**The social bio link flywheel:**

Every ABLE artist who links `able.fm/[name]` in their Instagram or TikTok bio is:
- Driving direct fan traffic to ABLE
- Creating an inbound link from a high-domain-authority social property
- Increasing ABLE's domain authority with every new artist who does the same

At 1,000 artists all linking to ABLE from Instagram, TikTok, and Twitter bios: ~1,000 inbound links from properties Google trusts. This is link-building that happens automatically as the platform grows.

---

## Part 3: The Launch Growth Sequence

### Pre-launch (before first artist)

Before any outreach:
- `landing.html` must be live with a real comparison table
- At least one demo artist page must exist (James's own, or a willing friend)
- The onboarding wizard must complete without error
- PostHog must be tracking all events from Day 1

### Weeks 1–2: Soft launch — personal outreach

Target: 50 artists by end of Week 2.

Method: personal DMs only. Not a template, not a sequence tool. Each message references something specific about that artist's recent work. The purpose of the message is to learn, not to sell.

Message tone: "I've been building something for independent artists and I wanted to get it in front of people who would actually use it. Would you take a look and tell me what's broken?"

Conversion target: 20% of DMs → page created. From 100 DMs: 20 artists.

What to look for in these 20: who sets up their page without prompting? Who shares it before you ask? Who comes back to the admin dashboard the next day? These are the evangelical early users. They exist in every early cohort. Find them before Week 4.

Target artist profile for outreach:
- Released music in the last 3 months (active, not dormant)
- 500–20,000 followers across platforms (real independent, not undiscovered)
- Posts about the music business or creative process (not just music) — these are the artists who influence other artists
- UK-based in V1, with one or two international tests (Australia, Colombia, Germany)

### Weeks 3–4: Expansion via first advocates

Target: 150 artists total by end of Week 4.

Method: the first evangelical artists are sharing naturally. Post about them on X and Instagram (with permission). Their followers find ABLE through that content.

Additional channels activated in Week 3:
- Reddit: begin genuine participation in r/WeAreTheMusicMakers and r/musicmarketing — no pitches yet, just useful presence
- Producer seeding outreach: first 20 DMs to UK producers with 3+ active clients (see `docs/GROWTH_STRATEGY.md §Producer seeding`)
- First Abler peer referral activated: any artist can now generate a referral link from admin.html

Week 4 activation:
- "Share your page" and "Invite a fellow artist" mechanics live in admin.html
- First "Are you an artist?" CTA in fan sign-up confirmation flow
- PostHog tracking all referral sources

### Weeks 5–8: Network effects

Target: 500 artists by end of Week 8.

By Week 5, the producer seeding outreach should be producing results. Each producer who joins brings 3–5 clients. Each client brings fan impressions that circulate "Made with ABLE."

Content: first artist spotlight series launches. Weekly feature post on X and Instagram. Each spotlight is chosen for genre diversity (electronic, hip-hop, folk, indie, classical) — ABLE must visibly work for all of them.

Community activation:
- When a Reddit question appears about link-in-bio tools or fan email capture, answer it honestly — with real information, mentioning ABLE as one option among several. This is how Reddit converts. Not pitches. Helpful answers.
- Submit to Music Ally Sandbox Tools (Weeks 5–6). Requirements before submission: 10+ real active pages, pricing live, demo video recorded. See `docs/GROWTH_STRATEGY.md §Music press` for submission details.

First partnership: identify one music school or community (BIMM, Soundcamp, or similar) for an introduction. Not a formal deal — a conversation. "We're building something for independent musicians. Would any of your students be interested in trying it?"

Week 8 milestone: identify which single channel is producing the highest-quality sign-ups (activated artists who captured at least one fan). If it is producer seeding, add 20 more DMs. If it is content, post more. If it is Reddit, invest more time there.

### Weeks 9–12: Consolidation and instrumentation

Target: 1,000 artists by end of Week 12.

This phase is about measurement, not new channels. The growth engines are running. The work now is to know which ones are actually working.

Metrics review every Monday morning (see Part 4).

Kill anything with CAC above £8 (calculated as: founder time cost + any cash spend ÷ activated sign-ups from that channel).

Referral mechanics in product (admin.html) should now be contributing 20%+ of new sign-ups. If not, something is wrong with the mechanic or the product experience — investigate.

Product Hunt launch in Week 10 or 11 (see `docs/GROWTH_STRATEGY.md §Product Hunt`). Requirements: 10+ active pages, stable product, 100+ potential upvotes briefed.

Affiliate programme for managers and educators goes live in Week 10: 25% recurring commission, tracked via FirstPromoter or Rewardful.

---

## Part 4: Growth Metrics and Instrumentation

### PostHog events (required from Day 1)

Every growth-relevant action in the product must be captured as a PostHog event. No exceptions. If it is not tracked, it did not happen.

```javascript
// Artist acquisition
posthog.capture('artist_signed_up', {
  source: utm_source,
  medium: utm_medium,
  campaign: utm_campaign,
  referral_artist: referral_slug || null
})

// Artist activation
posthog.capture('artist_first_fan_captured', {
  days_since_signup: n,
  page_state: 'profile' | 'pre-release' | 'live' | 'gig'
})

// Fan acquisition with source
posthog.capture('fan_signed_up', {
  artist_slug: slug,
  source: document.referrer,
  utm_source: utm_source
})

// Footer attribution click
posthog.capture('footer_able_click', {
  artist_slug: slug,
  destination: 'landing'
})

// Referral link generated
posthog.capture('referral_link_generated', { artist_slug: slug })

// Referral converted
posthog.capture('referral_converted', {
  referrer_slug: referrer_slug,
  new_artist_slug: new_slug
})
```

### Core growth metrics dashboard

Review every Monday. No exceptions.

| Metric | Formula | Week 4 target | Month 3 target | Month 12 target |
|---|---|---|---|---|
| Total artists | Count | 50 | 200 | 1,500 |
| Activated artists | Artists with ≥1 fan captured ÷ total | 60% | 65% | 70% |
| Weekly active artists | Logged into admin last 7 days ÷ total | 40% | 50% | 60% |
| Fan capture rate | Fan sign-ups ÷ page views × 100 | 2% | 3% | 4% |
| Organic referral rate | Sign-ups where source = referral ÷ total | 15% | 30% | 45% |
| Artist k-factor | Artists referred ÷ artists who could refer | 0.8 | 1.1 | 1.3 |
| Page view growth | Month-on-month % | — | +25% | +20% |
| Content → signup | Sign-ups from social UTMs ÷ total | Track | 15% | 20% |
| Footer click rate | Footer clicks ÷ total page views | Track | 0.3% | 0.5% |
| Monthly churn | Artists who deactivated ÷ prev month total | — | <8% | <4% |

### Weekly review protocol

Every Monday, 30 minutes maximum:

1. Pull the seven core metrics. Write them down. Compare to last week.
2. One question: what is the single number that moved most (in either direction)?
3. For a positive movement: what caused it? Can it be repeated?
4. For a negative movement: what changed last week that explains it?
5. One experiment to run this week: a new outreach target, a content type, a product change. One only.
6. Kill anything that has run for 2 weeks with no signal.

The weekly review is not a meeting. It is a Monday morning ritual. It takes 30 minutes. It is the most important growth activity in the calendar.

---

## Part 5: Anti-patterns

These will be tempting. Each one seems reasonable in isolation. Each one will damage the platform if acted on.

### 1. Paid ads before product-market fit

Tempting because: the sign-up numbers feel slow. A £500 Facebook campaign would bring 50 sign-ups overnight.

Why it kills growth: those 50 sign-ups have no context. They arrived because they saw an ad, not because someone they trust told them about ABLE. Their activation rate will be 20–30% vs. 70–80% for referred artists. Their churn rate will be 3–4× higher. The signal from their behaviour will corrupt the product feedback loop. You will optimise for the wrong user.

**The rule:** no paid ads until Month 6 at the earliest, and only after MRR exceeds £2,000/mo and churn is below 4%.

### 2. Press releases to music media before real users exist

Tempting because: a Music Ally mention feels like validation.

Why it hurts: journalists cannot write about a tool with no users. They have nothing to quote. If you pitch Music Ally Sandbox at Week 2 with no live pages, you waste the relationship. You get one shot per journalist. Use it when the story is real.

**The rule:** pitch Music Ally at Week 6. Not before. See `docs/GROWTH_STRATEGY.md §Getting into Music Ally Sandbox`.

### 3. Growth hacking tactics

Fake reviews. Aggressive email sequences. "Refer a friend" popups that appear before the artist has even set up their page. Reddit posts that are thinly veiled ads. Any tactic that feels clever but would make an artist embarrassed to have been associated with.

Why it kills growth: the independent music community is small and has a long memory. One artist who feels spammed by ABLE tells three others. The platform reputation for respecting artists is the most valuable single asset it has. It cannot be rebuilt once damaged.

**The rule:** if you would be uncomfortable if a journalist saw exactly what you were doing, do not do it.

### 4. Feature shipping as acquisition strategy

Tempting because: "if we add the Instagram Story card generator, producers will share it and we'll get 200 sign-ups."

Why it fails: features do not acquire users. The decision to try a new tool is made before looking at the feature list. The decision is made because of trust, referral, or context. Features retain users. They do not acquire them.

**The rule:** ship features to improve retention and referral for existing users. Not to attract new ones. If a new feature would cause 10 existing artists to tell someone about ABLE, it is a growth feature. If it would not, it is a product feature.

### 5. Expanding verticals before music is locked

Tempting because: "if we also serve podcasters, we get twice the market."

Why it kills growth: ABLE's entire credibility is built on being for musicians specifically. The moment it is also for podcasters and visual artists, the positioning becomes "another generic link-in-bio tool." The artists who chose ABLE precisely because it understood them will reconsider. The network effects that come from musicians knowing each other will not exist in a mixed-vertical platform.

**The rule:** ABLE serves musicians only until there are 5,000 active artist pages and the core product is a 9/10 for musicians. After that, the freelancer vertical is the natural first extension — it serves the same community, not a different one.

---

## Part 6: The Artist Evangelism Programme

### The founding artists

ABLE's first 10 deeply invested artists are worth more than its first 10,000 passive free-tier users.

This is not an exaggeration. An artist with 10,000 followers who genuinely believes in ABLE and talks about it authentically will generate more sign-ups in 12 months than a product campaign costing £20,000. Their credibility is the thing that cannot be bought.

**What founding artists receive:**

- Artist Pro for life (permanent, not time-limited)
- Direct access to James: their feedback shapes the roadmap before anything is public
- A private Discord channel with all 10 founding artists — a community of the most invested independent musicians on the platform
- Featured placement on `landing.html` (their real page, their real words)
- First access to every new feature before anyone else

**What ABLE asks of them:**

Nothing formal. No contract. No posting schedule. No requirement to talk about ABLE at all.

The intention: if ABLE is excellent, they will talk about it because they cannot help it. Founding artists are not brand ambassadors. They are the people who shape the product and, if it is genuinely good, become its most effective advocates.

**How to identify them:**

| Criterion | Why it matters |
|---|---|
| 1k–50k social followers | Large enough to have real reach. Small enough to be genuinely independent. |
| Genre diversity | Electronic, hip-hop, folk, indie, classical. ABLE must visibly work for all of them. |
| Posts about the business of music, not just music | These are the artists who influence other artists. They are the multipliers. |
| UK + international (Colombia, Australia, or Germany) | Test international product-market fit early before committing to a market |
| Active in the last 3 months | Dormant artists cannot be evangelists |
| Has released and toured, even at a small scale | They understand the full artist lifecycle — their feedback is richer |

**The identification process:**

Weeks 1–4: from the initial 150 artists, watch behaviour. Who is logging into admin daily? Who shares their page before being asked? Who sends an unsolicited message saying "this is exactly what I needed"? Who names another artist they think should be on ABLE?

These are your founding artists. Do not recruit them with a pitch. Reach out personally: "I've been watching how you use ABLE and I'd like to talk about what you actually need from it. Would you be up for a call?"

Week 5: invite the first 5. Week 8: complete the 10. Week 10: open the private Discord channel.

**Why depth, not breadth**

Every product in the independent music space has tried to grow fast by signing up as many artists as possible. ABLE's advantage is the opposite: 10 artists who are genuinely involved in shaping it will produce a product that is measurably better for every subsequent artist. Their input is not feedback. It is co-authorship.

The founding artists are the instrument through which ABLE learns what "excellent" actually means for the people it serves.

---

## Appendix: The Organic Growth Stack

Tools required to run this system. No vendor lock-in. Swappable.

| Function | Tool | Cost | Phase |
|---|---|---|---|
| Product analytics | PostHog (self-hosted or cloud) | Free / $0-20/mo | Day 1 |
| Affiliate tracking | FirstPromoter | $49/mo | Week 4 |
| Email | Resend | $0–$20/mo | Day 1 |
| SEO monitoring | Ahrefs (lite) or Semrush | £99/mo | Month 2 |
| Social scheduling | Buffer | $15/mo | Month 1 |
| UTM builder | utm.io or Google's generator | Free | Day 1 |

Total monthly cost to run the full organic growth stack: under £200/mo. Zero of this is ad spend.

---

*This document is the canonical growth spec for ABLE V1. It is updated as channels prove out or are killed. Last substantive update: 2026-03-16.*
