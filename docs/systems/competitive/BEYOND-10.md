# Competitive — Beyond 10
**Version: 1.0 | 2026-03-16**

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

One sentence. No hedging. This is the line that makes a Beacons user (who faces 5–30% cuts on fan revenue) read landing.html and feel the difference.

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

## The 20/10 test

You know the competitive system has crossed from excellent to extraordinary when ABLE is defined not by what it does better than competitors, but by the specific thing it refuses to do that every competitor eventually does.
