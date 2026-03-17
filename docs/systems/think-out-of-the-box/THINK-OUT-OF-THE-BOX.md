# ABLE — Think Out of the Box
**Created: 2026-03-16 | Status: ACTIVE — permanent system, not a sprint artefact**

---

## Part 1: Why this folder exists

Every other document in this project is trying to make the current plan better. This folder is different. It exists to question whether the plan itself is right.

The rest of the docs optimise. This folder interrogates.

Most products fail not because they were built badly, but because they were optimised into a corner — incremental improvement of a slightly wrong idea until it was a very refined version of something nobody needed. The team gets faster at building the wrong thing. The product gets polished in the wrong direction. The market moves and nobody noticed because everyone was too close to the current version to see it clearly.

ABLE is not immune to this. No product is.

This folder is the counter-mechanism. It is where the product's central assumptions are tested, not protected. It is where the uncomfortable questions are asked. It is where ideas that seem obviously wrong are given permission to be explored — because the idea that looks obviously wrong today is sometimes the one that becomes the company in five years.

### The questions this folder asks

- What if we're solving the wrong problem?
- What if the biggest opportunity is something we haven't thought of yet?
- What does the product look like if we remove its central assumption?
- What would a competitor from the future build today?
- What has worked brilliantly in a completely different industry that could work here?
- Who would never use ABLE, and why — and is that gap actually an opportunity?
- What do the best artists in the world actually need that no product has ever built?

### The discipline

Once per month, minimum, block 2 hours in the calendar. No building. No emails. No product decisions. Just this folder and a blank document. Generate ideas without filtering. Apply the techniques. Capture everything. Then decide what's worth pursuing.

The rule: no idea is too strange to write down. The filter comes later. During the session, strangeness is the point.

---

## Part 2: The 10 Lateral Thinking Techniques

These ten techniques are not academic exercises. Each one has produced real strategic pivots at real companies. Each one applied to ABLE below.

---

### Technique 1: Reverse the Assumption

**The method**

Take ABLE's core assumptions — the statements that are so obvious nobody questions them — and reverse each one. Then ask: if the reverse were true, what would ABLE build?

Most assumptions in product design are invisible precisely because they're so thoroughly believed. Making them explicit, then flipping them, surfaces the product space that exists on the other side of the obvious.

**ABLE's core assumptions reversed**

| Assumption | Reversed |
|---|---|
| Artists want fans to come to them | What if ABLE goes to fans and brings them to artists? |
| Fans discover artists through music | What if fans discover artists through other fans? |
| The artist owns the relationship | What if the fan owns it — their list, their choices, their feed? |
| ABLE lives inside the artist's page | What if ABLE lives inside every platform the artist already uses? |
| Artists need a destination page | What if artists need a broadcast tool, not a destination? |
| Fans sign up for free | What if fans pay first and artists earn on arrival? |

**Applied to ABLE**

The reversal "ABLE goes to fans, not the other way" leads directly to the fan.html dashboard — a product where fans log in, see all their followed artists, and get one place for everything. But it also leads somewhere more interesting: what if ABLE had an outbound component? A fan referral mechanic where existing fans invite other fans? Discovery through relationship rather than algorithm?

The reversal "ABLE lives inside every platform" raises the question of whether ABLE should be a widget, not a page. An embeddable sign-up form that lives on a Bandcamp page, Substack, or Shopify store. ABLE as infrastructure for any artist's digital presence, not just the ones who link their bio to ablemusic.co.

**When to use it**

Use this when you feel like ABLE is incrementally improving but not growing. Reversals reveal the product that exists on the other side of the current one.

---

### Technique 2: Remove a Core Feature

**The method**

Remove one thing that feels essential. Ask: if that didn't exist, what would ABLE be? What would it have to become instead?

The exercise is not about actually removing the feature. It's about discovering what the product's value actually rests on — which is often not what you think it is.

**Applied to ABLE**

**No profile page**
ABLE becomes infrastructure that runs inside other platforms. An embeddable CTA. A sign-up widget. A fan database API that artists plug into wherever they already are. The question this raises: is ABLE's value in the page, or in the data? If artists could have the ABLE fan database without the ABLE page, would they? Would that product be worth building?

**No fan list**
ABLE becomes a pure conversion optimiser — a better Linktree with campaign modes and analytics, but no CRM. This strips out the most defensible part of the product. The fan list is the moat. Removing it in this exercise confirms: the data is the product, the page is the distribution.

**No CTAs**
ABLE becomes a pure artist story — a profile that exists to be seen, not to convert. More editorial, less functional. Like a music magazine profile that happens to have your Spotify link. This is actually closer to how some artists experience their ABLE page already. The insight: some artists don't want a conversion tool. They want a home on the internet that feels like them.

**No campaign modes**
ABLE loses the feature that makes it meaningfully different from a static link-in-bio. The insight: campaign modes are the clearest expression of the product's thesis that an artist's page should change based on where they are in time. Without them, ABLE is just a nicer Linktree.

**When to use it**

Use this when you're not sure what the product's core value is — particularly before a new hire, a pitch, or a major rebuild.

---

### Technique 3: The $1 Billion Version

**The method**

Ignore all constraints. Imagine ABLE in 10 years. It is worth $1 billion. What did it become?

Write it out seriously. Not a fantasy — a rigorous projection from current trajectory. Then work backwards: which decisions made from where you are now lead there? Which decisions make it impossible?

**Applied to ABLE**

At $1 billion, ABLE is not a link-in-bio tool. Link-in-bio tools don't reach $1 billion.

At $1 billion, ABLE is one of two things:

**Path A: The fan relationship layer for independent music**
Every independent artist uses ABLE to own their fan relationship. 2 million artists, average 500 fans each — 1 billion fan records. ABLE becomes the email address book of independent music. It powers fan communication, pre-saves, ticket sales, merch drops, and eventually close-circle subscriptions. It is the infrastructure that sits under all of it. Revenue: £9–19/month per artist at scale = £18–38M monthly recurring. That's a $500M+ company on artist subscriptions alone. Add transaction fees on close-circle and ticket sales, add platform licensing to labels and management companies, add the artist directory as a paid discovery product.

**Path B: The music industry's operating system**
ABLE expands from artist-facing to industry-facing. Credits become a verified work history for every person in music — producers, mixers, session musicians, managers. Booking goes through ABLE. Payment goes through ABLE. ABLE knows every credit on every song, every show, every collaboration. It is LinkedIn for music, but built on actual verified work rather than self-reported credentials. Revenue: SaaS plus transaction plus data licensing to labels, publishers, and streaming platforms.

**The backwards decision tree**
- From Path A: build fan.html to 10/10. Build close-circle to launch quality. Build email broadcast. Build pre-save integration. All of these are on the current roadmap.
- From Path B: build the freelancer profile to production. Build credit verification. Build peer-confirm for credits. These are also on the roadmap but are deprioritised.
- The key question: Path A and Path B are not mutually exclusive. The question is which one becomes the company first, and which follows.

**When to use it**

Use this once a year, minimum. Run it before any major architectural decision. If the current plan doesn't lead to either path above, reconsider the current plan.

---

### Technique 4: The Parallel World Competitor

**The method**

Describe a startup that launches tomorrow, doing exactly what ABLE does, with $10M in funding and a team of 30. What do they build in the first 6 months that ABLE hasn't built?

This is uncomfortable. It is also the most reliable way to identify your own gaps.

**Applied to ABLE**

The $10M team launches with everything ABLE has, plus:

1. **Verified artist identity from day one.** Not just a profile — a verified badge tied to Spotify artist status or Distrokid account. Artists are real. The platform is not full of fake profiles.

2. **Mobile app, not a web app.** The profile is a web page (PWA), but the admin is a native app. Push notifications for fan sign-ups. "Someone just signed up. 47 fans now." The moment you see your first notification, you understand what ABLE is in a way no web dashboard achieves.

3. **Deep Spotify integration from the start.** Your top song auto-populates. Your release date syncs. Your tour dates pull from Songkick. The profile is 80% built before you touch it. Zero friction onboarding.

4. **A fan-facing app.** Fans don't just visit a URL — they download the ABLE fan app, follow artists, get show alerts, see new music. ABLE becomes the music discovery app for fans of independent artists.

5. **A freemium ceiling that hurts.** The free tier is real and useful. The paid tier has one feature so obviously worth £9/month that conversion is near-certain. That feature: seeing the email address next to every fan who signed up.

**The honest assessment**

Points 3 and 5 are achievable right now with the current ABLE setup. Point 1 is a feature not a rebuild. Points 2 and 4 require significant investment but are the correct long-term answer.

**When to use it**

Use this before every fundraising conversation. Use it any time the product feels like it's being built for the team rather than the market.

---

### Technique 5: The User Who Hates You

**The method**

Find the artist who tried ABLE and deleted their account. Find the music industry person who thinks ABLE is missing the point. Listen to them seriously. Apply their critique.

Not every critique is right. But every critique reveals something. The artist who left told you something about an assumption you made. The sceptic told you something about a gap in the pitch.

**Applied to ABLE**

**The artist who left said:**
- "It took too long to set up. I just wanted a link page."
- "My fans don't sign up for things. They just follow on Instagram."
- "I couldn't figure out what it was for."
- "I wanted to show my music properly. The profile felt generic."
- "I already use Linktree and it works fine."

**What these tell us**
The first complaint is a setup friction problem — solvable with better onboarding (start.html direction is correct).
The second is a cultural assumption problem — artists believe their fans won't sign up. The honest response is that this assumption is wrong for most artists, but it needs proof, not argument.
The third is a positioning problem — the product's value isn't clear enough until you've used it for a week.
The fourth is a customisation gap — the profile needs more expression, not just theming.
The fifth reveals the real competitor: Linktree's inertia. Artists don't leave Linktree because nothing has been bad enough to justify the switch. ABLE needs a feature that makes the switch feel obvious.

**The music industry person who doesn't get it:**
"Artists need to be on TikTok. A profile page is too passive."
What this reveals: ABLE's positioning as "no algorithm" is a negative claim. It says what ABLE isn't. The stronger pitch is what ABLE is for — and what it enables that TikTok never can.

**When to use it**

Use this after every major launch. Use it every time you read a negative review or receive a churned account notification.

---

### Technique 6: The Adjacent World

**The method**

Find what has worked brilliantly in podcasting, writing, photography, stand-up comedy, or any creative industry adjacent to music. Ask: why hasn't this been done in music?

Creative industries share structural problems. Direct-to-fan economics, platform dependency, middlemen extracting value, authenticity being commodified — these appear in every creative field. The solutions that emerged in one field often haven't crossed to others yet. That gap is an opportunity.

**Applied to ABLE**

**Substack → Close Circle**
Substack's insight was that writers had email lists they weren't monetising. They built a one-click paid newsletter on top of that list. The writer already had the audience — Substack just gave them the toll gate.

ABLE has the same setup for artists. The fan list exists. Close Circle is the toll gate. The question is whether ABLE's artists are more like early Substack writers (not monetising, unaware it was possible) or whether the culture is different (fans in music expect free).

**Behance → Freelancer profiles**
Adobe's Behance gave designers a verified portfolio that became the industry standard for hiring. Producers and session musicians have no equivalent. ABLE's credits system, applied to freelancers, is the music industry's Behance. This is already in ABLE's spec. The question is when it becomes the main pitch to freelancers.

**Dribbble's invite-only quality signal → ABLE founding artists**
Dribbble's invite-only model made early membership a signal of quality. "I'm on Dribbble" meant something when only the best designers had accounts. ABLE could run this for an initial cohort: 500 founding artists, chosen by application, who get a founding badge that never goes away. Creates scarcity, creates status, creates word-of-mouth from exactly the artists you want.

**Patreon's membership tiers → Close Circle tiers**
Patreon let creators define their own membership tiers. ABLE's Close Circle is currently one price. Tiered close circles — £2/month for updates, £5/month for demos, £10/month for everything — would dramatically increase the number of artists willing to launch them. Lower entry price, more fans through the door.

**Letterboxd's community as proof of taste → ABLE fan identity**
Letterboxd works because your film diary is public and signals your taste. ABLE fans currently have no public presence. A public fan profile — "artists I follow, shows I've attended, music I've backed" — turns fandom into identity. This is a big product question: how public should fan identity be?

**When to use it**

Use this when you're looking for a new feature direction. Look at what Substack, Patreon, Letterboxd, Behance, Kickstarter, Dribbble have done and ask: why hasn't the music industry built this?

---

### Technique 7: The Time Machine

**The method**

Project forward to 2030. Follow current trends to their logical endpoints. Then work backwards from that future to what ABLE should build today.

The goal is not to predict the future accurately — it's to make sure today's decisions aren't optimised for a present that won't exist when the product is mature.

**Applied to ABLE**

**Trend: AI-generated music proliferates**
By 2030, a significant percentage of new music online is AI-generated. Streaming platforms are saturated with AI content. Human artists are differentiated by their humanity — their shows, their stories, their direct connection with fans.

What this means for ABLE: ABLE's "Artist Before Label" positioning becomes more valuable, not less. The human artist with a direct fan relationship is the thing AI cannot replicate. ABLE should be building the infrastructure for that relationship now, while the differentiation is still forming in the culture's mind.

Does ABLE serve AI artists? This is a genuine strategic question. An AI artist account on ABLE would undermine the brand's claim to authenticity. A "verified human" badge that means something — and costs something to fake — could become one of ABLE's most valuable features.

**Trend: Streaming revenue continues to decline for mid-tier artists**
The economics of streaming are already difficult for most independent artists. By 2030, the artists who survive financially are those with direct fan relationships that generate income streams outside streaming — live shows, merchandise, close-circle subscriptions, commissions.

What this means for ABLE: the "no algorithm, direct relationship" thesis is not just a UX preference — it is the survival strategy for most independent artists. ABLE should be building this argument into its onboarding and marketing: not "here's a nicer link page" but "here's how you build something that still pays you when streaming doesn't."

**Trend: Fans become more selective, more intensely attached to fewer artists**
Mass audiences fragment. The long tail of fandom extends. An artist with 2,000 deeply connected fans earns more than an artist with 200,000 passive followers. The fan who buys the ticket, the vinyl, the merch, the close-circle subscription — that fan is worth 100 streaming-only listeners.

What this means for ABLE: the superfan scoring system is not a nice-to-have. It is the core analytical product. Knowing which of your 500 fans are in the top 20 — who came to the last show, who bought the last release, who's been signed up for 18 months — is worth more than knowing your total fan count.

**When to use it**

Use this before any major product prioritisation decision. Use it before raising money. Use it when the current product roadmap feels like it's optimising for the present.

---

### Technique 8: The Constraint Removal

**The method**

Remove one constraint and ask: what would you build then? The constraint can be regulatory, financial, technical, or cultural. The point is not to actually remove it — it's to see what shape the unconstrained product takes, and then figure out which parts of that are possible today.

**Applied to ABLE**

**What if server costs were zero?**
ABLE would store every fan interaction — every page visit, every scroll depth, every CTA tap — and surface it to artists in real time. The analytics product would be Google Analytics for an artist's ABLE page. You would know not just how many fans you have, but how each one found you, what they tapped, what they didn't, and what made them sign up. This is not technically impossible — it's economically premature. The question: at what scale does this become worth building?

**What if every artist already trusted ABLE completely?**
ABLE would have access to artist financials — streaming income, merch revenue, ticket sales. It would become a complete artist business dashboard. It would know when an artist's streaming is declining and prompt a close-circle launch before the income gap opens. It would know when an artist's ticket sales are slowing and suggest a fan communication campaign. This trust is earned, not assumed. But building toward it is the right direction.

**What if ABLE could legally verify music ownership?**
ABLE would become the single source of truth for who made what. Credits would be legally binding, not just informational. Producer split sheets would live in ABLE. Royalty payment would flow through ABLE. This is the music industry's biggest unsolved problem — who owns what, and is anyone tracking it in real time? ABLE is already building the credits system. The gap between credits-as-discovery and credits-as-legal-record is the question.

**What if regulatory constraints on payment didn't exist?**
ABLE would be the payment layer for all direct artist-fan transactions — close-circle, merch, tickets, commissions. A single Stripe-like account that covers everything. Currently ABLE defers to Stripe for payments. The unconstrained version owns the payment flow and takes a small percentage. This is the PayPal/Stripe vision applied to independent music.

**When to use it**

Use this when a feature you want to build keeps being deferred because it's "not the right time." What would it take to make it the right time?

---

### Technique 9: The Enemy's Playbook

**The method**

If you were the CEO of Linktree, what would you build to destroy ABLE? If you were Spotify, what would you do to own the direct artist-fan relationship? If you were Squarespace, how would you move into this space?

Knowing this is strategically essential. It shows where ABLE is vulnerable. It shows where ABLE needs to move before the competition does.

**Applied to ABLE**

**If you were Linktree's CEO:**
- Launch campaign modes. Copy ABLE's pre-release/live/gig state system exactly.
- Buy or build a basic fan sign-up and email product. Attach it to the 40 million existing users.
- Add analytics that looks like ABLE's.
- Price it the same.
- Result: Linktree's distribution advantage (40M accounts) crushes ABLE unless ABLE has locked in its best artists and given them something that can't be replicated — the data relationships, the credits ecosystem, the close-circle community they've built over time.
- **ABLE's defence**: the switching cost. An artist's fan list, their credit history, their close-circle community — these don't copy. The longer artists are on ABLE, the more painful it would be to switch to a Linktree clone. Build the stickiness now.

**If you were Spotify:**
- Launch "Spotify for Artists 3.0" with a link-in-bio builder. Every artist already has a Spotify for Artists account. Add a fan capture form. Add a direct email function. Done.
- Spotify's leverage: they already know the artist's stats. They already have the artist's trust. They own the listener data.
- **ABLE's defence**: Spotify will not give artists real ownership of their fan data. Any fan relationship that runs through Spotify is a relationship Spotify owns. ABLE's entire pitch is the opposite: the fan data is yours, not ours. This is a values difference, not a feature difference. Ensure the pitch is that clear.

**If you were Squarespace/Wix:**
- Add a music artist template with fan capture built in. Call it "Artist Pages". Price it £5/month cheaper.
- **ABLE's defence**: general website builders don't understand music. They don't have campaign modes, gig mode, release states, or credits. The product is built for musicians, not "creatives." Deepen that specificity so the comparison with a generic builder becomes embarrassing.

**If you were Bandcamp (post-acquisition recovery):**
- Bandcamp already has direct artist-fan commerce. Add a link-in-bio. Add close-circle subscriptions. Add campaign modes.
- **ABLE's defence**: Bandcamp is built around the catalogue, not the artist. ABLE is built around who the artist is — their shows, their story, their campaign state — not just their music for sale. Deepen the identity and campaign story to where Bandcamp cannot follow.

**When to use it**

Use this before every major fundraise. Use it before deciding not to build a feature. If Linktree would copy it, build it faster.

---

### Technique 10: The Obvious Thing Nobody Is Doing

**The method**

In music, what is obviously broken that everyone complains about but nobody has fixed? The answer to this question reveals either a feature ABLE should build, or an adjacent product that ABLE is positioned to build.

**Applied to ABLE**

**Artist pay transparency**
Nobody knows what independent artists actually earn. No platform publishes artist income data. Artists guess at each other's streaming rates. They don't know if their advance is good or bad. They have no benchmarks. A community-submitted, anonymised artist income report — what I earn from streaming, live, merch, close-circle combined — would be read by every independent artist on the internet. ABLE is the only platform with both the artist trust and the data infrastructure to build this.

**Tour rider management**
Artists and venues still exchange PDFs, emails, and in some cases actual faxes for show logistics. There is no digital standard for what an artist needs at a show. A simple, shareable show rider — food requirements, backline, load-in time, accommodation, guest list — that lives on ABLE and can be sent to any venue via link is a feature that solves a real, daily problem for touring artists. This also deepens the shows data model, which feeds into gig mode.

**Session musician and session producer payment**
A significant percentage of session payments in the UK still go via cheque or bank transfer with no paper trail. There is no standard digital invoice for session work. ABLE's credits system knows who worked on what. A one-click invoice tool, powered by the credit record, that handles session musician payment and generates a PDF invoice would be used by every producer and session musician on the platform. This is a path from credits-as-discovery to credits-as-operating-system.

**Fan-to-fan discovery**
If I love an artist, there is no way to see what other artists that artist's fans love. Fan taste graphs exist in Spotify's internal data but are never surfaced publicly. A simple "fans of [artist] also love [X, Y, Z]" feature — generated from the ABLE fan graph — would be one of the most useful discovery tools in independent music. This is possible today if ABLE has enough fans across enough artists.

**Credit dispute resolution**
Credits on songs are frequently wrong. Producers get left off. Session musicians don't get credited. Ghost writers exist everywhere. There is no neutral third-party mechanism for disputing a credit. ABLE's peer-confirm system is designed to prevent this. But ABLE could also be the place where disputed credits are surfaced and resolved — a public record with a dispute mechanism. This would make ABLE's credits system the most trusted one in the industry.

**When to use it**

Use this when looking for the next big feature. Any of the five problems above would be genuinely useful to build and none of them have been built yet.

---

## Part 3: ABLE-Specific Think-Out-of-the-Box Exercises

Run these. Write the answers. Don't edit the answers until after the session.

---

### Exercise 1: The Anti-Algorithm Vision

ABLE explicitly says "no algorithm." This is a strong positioning claim. But what if the right algorithm — one designed to serve artists, not advertisers — is actually ABLE's biggest opportunity?

**The question to answer honestly:**

What if ABLE built an algorithm that optimises for genuine artist-fan connection — not engagement, not time-on-platform, not click-through rate — but real-world outcomes: fan sign-ups, show attendance, direct support revenue?

This algorithm would be designed backwards from what artists actually want. Not "how do we keep fans on ABLE longer?" but "how do we help this artist's fans become more connected to this artist in real life?"

What does that look like?
- Show fans the content that led other fans to buy tickets
- Notify fans about shows before they sell out
- Surface the release that matches a fan's listening history from before they followed the artist
- Identify which fans are most likely to sign up for close-circle and show the artist who to reach out to

Is this the same thing as "no algorithm"? No. Is it better than "no algorithm"? Possibly.

The honest answer: ABLE's current "no algorithm" position is about platform algorithms — the kind that prioritise engagement over connection, that make artists compete for reach against each other, that train people to produce content rather than art. That's what ABLE is against.

An artist-owned algorithm — one that runs on their fan data, serves only their fans, and optimises for connection not engagement — is not what ABLE is against. It might be exactly what ABLE is for.

**The reframe:** ABLE doesn't have "no algorithm." It has "your algorithm." One that runs only on your data, for your fans, and is never shared or influenced by other artists, advertisers, or ABLE's commercial interests. That is a far more powerful claim than "no algorithm."

---

### Exercise 2: What If Fans Paid First?

**Current model:** Artist page → fan signs up (free) → artist sends emails → (eventually) fan pays for close-circle

**Reversed model:** What if fans pre-paid £1/month to follow 5 artists of their choice, and ABLE distributed that to artists?

This is closer to Bandcamp's direct support model and Spotify's rumoured "artist mode" experiments.

**What this changes:**

For artists: income from day one. Not "build an audience, then monetise" — just income, flowing from fans who chose to pay.

For fans: paying £1/month means they take the relationship more seriously. They show up to more shows. They listen more attentively. The £1 is not about the money — it's about the commitment signal.

For ABLE: transaction fees on a paying fan base, not just artist subscriptions. ABLE's revenue scales with fan growth, not just artist growth.

**What this breaks:**

The zero-friction fan signup is gone. The fan has to make a payment decision before they've heard much of the artist's music. The conversion rate from page visit to fan would drop dramatically.

It also changes the product entirely. Artists who are early-stage and unknown would earn almost nothing. Artists with large existing audiences would earn most of the money. It benefits the already-successful more than the emerging.

**The honest assessment:**

This model works at scale and for established artists. It doesn't work for the artist trying to build their first 100 fans. ABLE's current model is correct for the core use case. However — close-circle is exactly this model, just opt-in at the artist level. The existing spec is the right answer. This exercise confirms it.

---

### Exercise 3: What If Artists Formed Collectives?

**The idea:** Groups of 5–10 artists who share genre, geography, or ethos cross-promote each other's fan lists through ABLE. Each artist's page has a "You might also love" section, curated by the collective, not by ABLE's algorithm.

**What this enables:**

Fan growth without advertising. An artist with 300 fans in the collective gets introduced to the fans of 9 other artists. The collective creates a genuine micro-community — not a brand, not a label, but a group of artists who respect each other's work.

This is how independent music actually works at the ground level. Bands support each other at shows. Artists feature on each other's tracks. The collective formalises something that already exists informally.

**What could go wrong:**

Artists are territorial about their fan lists. Sharing them feels like giving away something they built. This is a cultural barrier, not a technical one. The solution is framing: the collective doesn't share the fan list. It shares the artist's recommendation. "I listen to these five artists. If you follow me, you might follow them too." That's a fundamentally different thing to sharing a CRM.

**The honest assessment:**

This is a feature worth building. It requires no new infrastructure — just a collective group profile that links artists, and an opt-in recommendation module on each artist's page. The cultural barrier is real but manageable. Founding artists who are genuinely friends could seed this naturally.

The risk of gaming (artists forming collectives purely for fan acquisition, not genuine connection) is real. The solution: collective recommendations must be handwritten by the artist, not auto-generated. "Here's why I think you'd love [artist]" — curated, not algorithmic.

---

### Exercise 4: ABLE in a World of AI Artists

**The scenario:** 2027. AI music generation is widely used. Some of the most-followed "artists" on streaming are AI-generated with no human behind them. They have fan communities. They have concert experiences (AI-driven). They have "releases."

**Does ABLE serve them?**

This is a values question, not a technical one. ABLE's name is "Artist Before Label." If AI artists are on the platform, what does "artist" mean?

**Three possible positions:**

1. **ABLE serves only human artists.** A verified human badge, tied to a real identity check. Not just "I ticked a box" but actual verification. This creates an entirely new category of trust in music — artists who are verifiably real, with fans who chose that reality over convenience.

2. **ABLE serves artists, defined as whoever creates the work.** If a human uses AI tools to make music, they're still an artist. If an AI creates music autonomously with no human creative direction, that's different. The line is human intent.

3. **ABLE doesn't take a position.** Platform neutrality. This is the worst option for the brand — it turns ABLE into an infrastructure company rather than a values-driven product.

**The honest assessment:**

Position 1 is correct for ABLE's brand. The human artist with a direct fan relationship is exactly what AI cannot replicate. Building a verified human badge now — while AI music is early and the cultural distinction still matters — gives ABLE a positioning that becomes more valuable as AI becomes more ubiquitous.

"ABLE is for human artists" is not a limiting statement. It is a defining one.

---

### Exercise 5: The Honest Platform Comparison

ABLE vs. the full competitive set — what does each platform actually win?

| Platform | What they win | What ABLE wins |
|---|---|---|
| Linktree | Distribution — 40M users, habit | Depth — campaign states, fan list, credits |
| Spotify for Artists | Data — they know everything about your listeners | Ownership — the fan data is yours, not ours |
| Bandcamp | Commerce — direct music sales | Identity — who you are, not just what you sell |
| Patreon | Monetisation — proven paying fan model | Discovery — fans find new artists through ABLE |
| Instagram | Scale — reach anyone | Direct — no algorithm between you and your fans |
| Substack | Trust — writers own their subscriber relationships | Music-native — built for how musicians work |

**What this table reveals:**

ABLE wins on ownership, identity, and music-native depth. These are not features — they are a product philosophy. The pitch is not "ABLE has these features." The pitch is: "ABLE is the only platform built around what the artist actually owns — their relationship with their fans."

Everything else either rents you your relationship (Spotify, Instagram) or sells you a tool without the philosophy (Linktree).

---

## Part 4: Monthly Think-Out-of-the-Box Session Protocol

This is the ritual. It is non-negotiable. One month without this session is one month of incremental optimisation without interrogation.

**The session**

1. Block 2 hours. Non-negotiable. No building. No Slack. No product decisions.
2. Open a blank document. Not this one — a fresh one.
3. Read the last month's git log: what got built? What got deferred? What got added that wasn't planned?
4. Pick one technique from Part 2. Just one.
5. Apply it to ABLE for 45 minutes — write raw, no editing, no self-censorship.
6. Take a break. 10 minutes minimum.
7. Review what you wrote. Are any of these ideas worth a 20-angle analysis?
8. If yes: write it up, add to `docs/systems/think-out-of-the-box/ideas/` with a timestamp.
9. If an idea made it into the product roadmap from a previous session: note that. This is the metric.
10. Commit the session output — even rough notes. Timestamp it. This creates an accountability record.

**The metric**

One great lateral idea per month that makes it into the product roadmap is the target. Not ten ideas. Not a brainstorm that changes everything. One idea, per month, that proves this session prevented a quarter of incremental-only thinking.

That is what keeps a product honest.

**The rule about rules**

Do not follow the protocol so rigidly that it becomes bureaucratic. The point is thinking, not compliance. If you sit down, open this doc, and feel nothing — put it away and do it a different day. But: if you haven't done a session in 6 weeks, the protocol says that's a flag. Something got optimised away that shouldn't have been.

---

## Part 5: The Ideas Graveyard

The ideas graveyard is in a separate file: `IDEAS-GRAVEYARD.md`.

Ideas that were considered and rejected, with reasons, live there permanently. This prevents the same ideas cycling through discussions repeatedly. If an idea was rejected for good reasons, the graveyard stops it being "discovered" again three months later with enthusiasm but without memory.

Before adding a new idea to the lateral ideas log, check the graveyard. If it's already there, note why it was rejected before deciding whether conditions have changed enough to reconsider.

---

*This folder is the counter-mechanism to certainty. Every product, at every stage, tends toward incrementalism. This folder exists to make sure ABLE occasionally questions whether it's incrementalising in the right direction.*

*Read it before any major product decision. Use it when things feel too settled. Ignore it when you're in a sprint — then come back to it when the sprint is done.*
