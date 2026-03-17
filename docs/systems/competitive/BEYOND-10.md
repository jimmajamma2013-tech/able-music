# Competitive — Beyond 10
**Version: 1.1 | Updated: 2026-03-16 (live research pass)**

> 20/10 is when ABLE's differentiation is so clear that the product sells itself by contrast — when a ToneDen user switches not because of a comparison table, but because a friend showed them what a release week looks like on ABLE.

---

## Moment 1: The ToneDen Switch

**What it is:** A ToneDen user — serious about their Spotify release strategy, already using ToneDen for pre-save campaigns — sees a friend's ABLE page on release day. The page is in live mode: countdown just hit zero, the hero card is showing the album artwork with a stream CTA, the "I made this" biography is specific and unhurried. The ToneDen user has a Linktree for their bio link. It has 7 links and looks like everyone else's Linktree. They sign up for ABLE that day.

**Why it's 20/10:** The switch is not driven by marketing. It is driven by comparison in the wild. The best competitive moment is when an existing user of a competitor encounters an ABLE page and experiences the difference directly — not through copy, not through a feature list, but through the product itself.

**Exact implementation:**

The specific feature combination that makes this switch happen:
1. **Campaign state auto-switching** — ToneDen's pre-save pages are campaign-specific URLs, not a permanent profile. The artist's Linktree stays the same whether they are 7 days from release or 6 months post-drop. ABLE's profile switches. The friend who shows their ABLE page on release day could not have that experience on ToneDen + Linktree — two separate tools, neither of which knows what the other is doing.

2. **The bio** — specific and unhurried, sounds like the artist. A Linktree has no bio. A ToneDen landing page has a campaign headline. ABLE has a person. This is the detail that makes the ToneDen user feel something is missing in their own setup.

3. **The QR code** — the ABLE profile generates a QR code the artist can put on merchandise, flyers, or displayed on stage. "Scan to follow me" at a show, pointing to a page that auto-switches to gig mode when the doors open. ToneDen has no equivalent. Linktree has a QR code but not a page that responds to the night.

The landing.html page that supports this switch (implementation spec):

The comparison table (honest, not cherry-picked):

| Feature | ABLE | Linktree | ToneDen | LayloFM |
|---|---|---|---|---|
| Fan email capture | Yes — you own the list | No | Via pre-save only | Yes |
| Campaign states (pre-release / live / gig) | Yes — auto-switches | No | Pre-save pages only | No |
| Permanent artist profile | Yes | Yes | No | Yes |
| Profile visual identity | Music-first | Generic | Campaign page | Basic |
| Revenue cut on fan support | 0% | 0% | N/A | 0% |
| Gig mode | Yes | No | No | No |
| Free tier | Yes — full profile | Yes | Yes | Yes |

The table is accurate. ToneDen wins on ad attribution analytics — include that, because intellectual honesty is the differentiator. ABLE wins on anything that requires the profile to know the artist's current moment.

The copy on landing.html that makes the ToneDen user self-identify: "If you use a campaign tool for releases and a link page for your bio, your page never knows what moment you're in. ABLE is one page that knows." — not naming ToneDen, but describing their exact situation.

**Updated table (2026-03-16 research pass) — Beacons store cut corrected:**

| Feature | ABLE | Linktree | ToneDen | Laylo | Beacons |
|---|---|---|---|---|---|
| Fan email capture | Yes — you own the list | No | Via pre-save only | Yes | Partial |
| Campaign states (pre-release / live / gig) | Yes — auto-switches | No | Pre-save pages only | No | No |
| Permanent artist profile | Yes | Yes | No | Yes | Yes |
| Profile visual identity | Music-first | Generic | Campaign page | Basic | Generic |
| Revenue cut on fan support | 0% | 0% | N/A | 0% | 0% (Store Pro) |
| Gig mode | Yes | No | No | No | No |
| Instagram DM fan capture | No (roadmap candidate) | No | No | Yes | No |
| Linktree domain spam risk | N/A — own subdomain | Yes — linktr.ee flagged | N/A | No | No |
| Free tier | Yes — full profile | Yes | Yes | Yes | Yes |

The table is accurate. Laylo wins on Instagram DM fan capture — include that. Beacons' store cut is now 0% on Store Pro — do not claim otherwise. ABLE wins on anything that requires the profile to know the artist's current moment. That advantage has no competitor.

---

## Moment 2: The Feature ABLE Will Never Build

**What it is:** A specific decision, stated clearly and permanently: ABLE will never build paid promotion tools — no "boost your post," no "promote to similar artists' fans," no algorithmic amplification of any kind. This is not a roadmap gap. It is a product philosophy. When a journalist writes about ABLE, this is the quote they use.

**Why it's 20/10:** A deliberate absence is a competitive position. Every tool in this space eventually adds paid promotion because it is a revenue stream. ABLE saying "never" — and meaning it — becomes a trust signal. Artists who have been burnt by algorithmic platforms see this and understand immediately what ABLE is. The refusal to build a feature says something about the product's values that building ten features cannot.

**Exact implementation:**

The exact position, stated for internal clarity first, then for external use:

```
ABLE will never build:
- Paid promotion to other artists' audiences
- Algorithmic feed curation that determines which fans see which content
- Revenue share on direct fan-to-artist transactions (current commitment: 0%)
- "Boost" or "promote" features that require payment to reach fans the artist already has
- Any mechanism that makes ABLE the intermediary in the fan-artist relationship

Why:
The independent artist uses ABLE because they want to own the fan relationship,
not rent it. The moment ABLE becomes a platform that artists pay to "reach" their own
fans, ABLE has become the thing it was built against. This is not a feature decision.
It is the reason the product exists.
```

The external version of this position (for landing.html "How we're different" section):
```
"Your fans gave you their email. ABLE will never charge you to email them."
```

One sentence. No hedging.

**Updated framing (2026-03-16): Beacons Store Pro is now 0% cut.** The "Beacons takes a cut" argument is no longer accurate for their paid tier. The ABLE line should shift from revenue-cut comparison to architecture:

"Your fans gave you their email. ABLE will never charge you to email them — because the relationship is yours, not ours. That's not a policy. It's the architecture."

The distinction: Beacons reduced their cut as a pricing decision. They can reverse it. ABLE's 0% is structural — there is no mechanism to take a cut because the fan relationship is owned by the artist at the database level. The commitment is not a promise; it is a constraint we built in deliberately.

The competitive moat this creates: once ABLE has committed publicly to 0% and "never algorithmic," reversing that position would destroy trust more thoroughly than any competitor's feature launch. The commitment is the moat.

---

## Moment 3: The One Data Point That Makes a Journalist Write "ABLE Is Winning"

**What it is:** A specific, concrete, singular metric that — when stated accurately — makes the competitive position undeniable. Not "ABLE has the best design" (subjective). Not "ABLE's campaign states are unique" (feature claim). One number, one comparison, one sentence that makes a journalist write the headline.

**Why it's 20/10:** A single data point that lands. Music journalists and tech writers respond to numbers with a clear reference point. "X% of ABLE artists' fans came directly from the artist's page, not from an algorithm" is a number that tells the story of the entire product. It is also a number only ABLE can produce — because ABLE tracks fan source attribution.

**Exact implementation:**

The data point to build toward (requires 6 months of real usage data):

**Target statement:**
"Across [N] active ABLE artist pages, [X%] of fan sign-ups came from direct sources — the artist sharing their own link — rather than algorithmic discovery. The average Spotify artist has no equivalent number, because Spotify does not give artists their fans' contact details."

The second half of that sentence is the competitive killer. Spotify has 600 million monthly active users. ABLE has a few thousand. But Spotify cannot give you the email of a single fan. That structural asymmetry is the story.

To build to this data point:
- Track `source` on every fan sign-up from launch: `able_fans[].source` — already in the data architecture
- Sources: `instagram`, `tiktok`, `direct`, `spotify`, `unknown`
- Monthly: query the aggregate across all artists
- The "direct" category is the one that matters: a fan who typed in a URL or scanned a QR code came because the artist told them to. No algorithm, no discovery, no platform mediation.
- At 100 artists with 50+ fans each: publish the first data point on ABLE's social accounts
- At 500 artists: pitch it to a music industry journalist as a data story

The specific journalist targets (build a media list of 5):
- Hypebot (covers independent music technology)
- Music Ally (UK music industry intelligence)
- The Guardian Music (for the mainstream moment when scale warrants it)
- DIY Magazine (artist-facing music press, UK)
- Music Week (UK industry trade)

The pitch angle: "Independent artists on ABLE are growing fan lists without any algorithm. Here's the data." Let the number carry the story. No claims about being "the future of music" — one number, one comparison, one implication.

---

---

## Moment 4: The Spotify Number That Opens Every Pitch

**What it is:** A specific Spotify statistic — confirmed by Spotify's own 2025 data — that reframes the competitive landscape in one sentence.

**The number:** Spotify's own research shows that super listeners (the most engaged 2% of an artist's monthly listeners) drive 18% of streams and approximately 50% of ticket sales.

**Why it's 20/10:** Spotify just handed ABLE its best competitive argument. Spotify can identify this 2% for you. They cannot give you their email address. ABLE can capture them. One sentence. Zero claims that require ABLE to have any data yet.

**The exact pitch line:**

"Spotify knows your top 2% of listeners drive half your ticket sales. They just can't tell you who they are — or let you contact them. ABLE can."

This is the line for:
- Every investor pitch deck
- The landing.html above-the-fold moment
- The music press pitch (the data is Spotify's, not a startup's claim)

**Implementation in landing.html copy:**
Do not say "Spotify says 2%." Say it directly to the artist:

"There are people in your audience who stream every track, buy every ticket, and tell their friends about you. You probably know who some of them are. The rest are invisible — unless you have a way to find out. That's what ABLE is for."

The Spotify statistic is the framing device in the background. The direct human truth is the copy.

---

## Moment 5: The World-Building Window

**What it is:** Music Ally's confirmed 2026 music marketing trend is "world-building" — building rich aesthetic and lore around a release, with IRL entry points, mystery mechanics, and community activation points. ABLE's page state system is exactly the infrastructure this requires, but ABLE has not positioned it this way.

**Why it's 20/10:** The campaign state system was built for release cycles. "World-building" is what music-marketing-literate artists call release cycles. These are the same thing described in different registers. The ABLE feature already exists. The positioning has not been updated to speak the language of the artists who care most about it.

**The world-building to ABLE mapping:**
- Pre-release mode = the mystery build phase (countdown, controlled reveal, urgency)
- Live mode = the world reveal (artwork hero, stream CTA, momentum riding)
- Gig mode = the physical entry point (IRL activation, venue QR code, "on tonight")
- Fan capture = the community anchor (people who signed up are the core world participants)
- Snap cards = narrative moments (lyric teaser, behind-the-scenes, the artefacts of the world)

**The exact positioning shift:**

Old frame: "ABLE knows what moment the artist is in."
New frame (adds to, does not replace): "ABLE is the infrastructure for building a world around a release."

The old frame is accurate and defensible. The new frame speaks to the 2026 artist who has absorbed music marketing culture and knows that a release is more than a release date.

---

## The 20/10 test

You know the competitive system has crossed from excellent to extraordinary when ABLE is defined not by what it does better than competitors, but by the specific thing it refuses to do that every competitor eventually does.

**2026 update — the test now has a second dimension:**

The competitive system is at 20/10 when ABLE is also defined by the specific things that major, well-funded platforms (Spotify, Universal Music / EVEN, Beacons) are building in ways that structurally cannot give artists what ABLE gives them. Not because those platforms are bad products — because their business models require them to keep the fan relationship on their platform. ABLE is the only platform where the business model and the artist's interests are identical: the more the artist owns, the stronger ABLE's product case. That alignment is the 20/10 position.
