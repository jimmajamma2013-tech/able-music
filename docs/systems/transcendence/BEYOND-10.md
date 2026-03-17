# Transcendence — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the platform that disappears when it is working — no algorithm, no friction, no noise — just an artist and the people who chose to show up for them.

---

## Moment 1: The Artist Who Never Feels Like a Product

**What it is:** Three years from now, an artist who has been using ABLE since their first release has never once felt like they were being optimised. They have never seen a "Complete your profile" banner that made them feel insufficient. They have never received an email encouraging them to "drive engagement." They have never seen their fan count described as a "metric to grow." Every interaction with ABLE has been with a product that treated their music — and their relationship with their fans — as the subject, not the means.

The concrete form of this: a quarterly audit of every line of copy in admin.html, start.html, and every email template against the banned phrases list in `COPY_AND_DESIGN_PHILOSOPHY.md`. Any copy that uses language of growth, engagement, or optimisation is rewritten before the next release. The audit takes two hours. The cumulative effect of doing it every quarter for three years is the artist who, when asked why they use ABLE, says: "It feels like it was made by someone who actually gets what it's like to be a musician."

**Why it's 20/10:** The transcendence standard from WHAT-11-LOOKS-LIKE.md is not a build target — it is a maintenance practice. The five 11/10 principles deteriorate if they are not actively defended. Copy drift is real. The product that starts with "Stay close." accumulates "Grow your audience" through a thousand small decisions that each seem acceptable in isolation. The quarterly audit is the structural defence against that drift.

**Exact implementation:**

The audit runs as a quarterly event in the master review cycle. A specific checklist in `MASTER-REVIEW-PROTOCOL.md` Phase 2:

```markdown
### Quarterly Copy Audit (run on Q1/Q2/Q3/Q4 master reviews)

For each of the following files, search for every instance of the banned phrases below.
Replace each with the approved alternative. No exceptions.

Files:
- admin.html (all user-facing text)
- start.html (all wizard screen text)
- landing.html (all marketing copy)
- All email templates in /email-templates/ or Loops sequences

Banned phrases:
| Banned | Replace with |
|---|---|
| "grow your audience" | "reach people who care" |
| "engage your followers" | "stay close to the people who show up" |
| "turn fans into superfans" | "your most dedicated listeners" |
| "monetise your fanbase" | "let people support you directly" |
| "drive engagement" | [delete — do not rephrase] |
| "content creator" | "artist" |
| "metrics" (standalone) | "your numbers" or [be specific: "fan count", "tap-through"] |
| "going viral" | [delete — never mention this] |
| Any sentence with "!" on a dashboard | [remove exclamation mark or rewrite] |
| "Get started!" | [rewrite to the specific next step] |
| "You're all set!" | [rewrite to specific confirmation: "Your page is live."] |

Log every change made: which file, which phrase, what it became.
```

This audit is owned by James, not delegated. It takes 2 hours per quarter. It is the work that ensures the five 11/10 principles remain active rather than archived.

---

## Moment 2: The Fan Who Found Three Artists

**What it is:** Eighteen months from now, a fan clicks the "Made with ABLE ✦" mark on an artist's page. They land on the ABLE discovery page — not an algorithm-curated "Recommended for you" feed, but a page that shows artists connected to the one they just came from. The producer who made the record. Two other artists the producer has worked with. One artist who has listed this artist as an influence in their credits.

The fan discovers three artists they have never heard of, through music they already love, with no algorithm making the recommendation. Every connection is human — confirmed by both parties as part of the credits system. The fan taps through to one of them. They hear something that changes what they listen to for the next year. ABLE made that happen by staying out of the way.

The concrete form of this: the ✦ discovery page is not built until the credits system has at least 50 confirmed connections between real artists. Building it before then produces a sparse page that feels like a failed social network. The 20/10 version is built when the data exists to make it genuinely valuable — not before.

**Why it's 20/10:** The discovery mechanic from WHAT-11-LOOKS-LIKE.md §11 is the moment where ABLE's narrow scope becomes its most powerful feature. No algorithm made this recommendation. No platform nudged the fan toward artists who pay for placement. The connection exists because a producer confirmed their credit on a release and both parties have ABLE profiles. That is the discovery mechanic ABLE can build that no competitor can replicate, because it requires both the artist product and the freelancer product to exist simultaneously.

**Exact implementation:**

The discovery page (available at `ablemusic.co?ref=[handle]` when the ✦ is tapped) reads the `credits` table:

```javascript
// Supabase query: find all artists connected to this artist through credits
async function getConnectedArtists(artistId) {
  // Find all credits where this artist is involved
  const { data: credits } = await supabase
    .from('credits')
    .select('artist_a_id, artist_b_id, credit_type')
    .or(`artist_a_id.eq.${artistId},artist_b_id.eq.${artistId}`)
    .eq('confirmed', true)

  // Extract all unique connected artist IDs
  const connectedIds = [...new Set(
    credits.flatMap(c => [c.artist_a_id, c.artist_b_id])
           .filter(id => id !== artistId)
  )]

  // For each connected artist, find their other connections
  const secondDegree = await Promise.all(
    connectedIds.slice(0, 3).map(async (id) => {
      const { data: theirCredits } = await supabase
        .from('credits')
        .select('artist_a_id, artist_b_id')
        .or(`artist_a_id.eq.${id},artist_b_id.eq.${id}`)
        .eq('confirmed', true)
        .limit(3)
      return theirCredits
    })
  )

  // Return: direct connections + second-degree connections, max 6 total
  return { direct: connectedIds.slice(0, 3), secondDegree: secondDegree.flat() }
}
```

The discovery page is not labelled "You might also like." It has no heading. It shows the artist cards — name, artwork, genre tag, "Made with ABLE ✦" — with one line of connection context below each: "Produced by Luna." "Also produced by Luna." "Played on the same bill as Nadia Rose." The context is specific. It is the reason for the recommendation. It is not an algorithm's confidence score — it is a human relationship.

**Build gate:** Do not build this page until `SELECT COUNT(*) FROM credits WHERE confirmed = true` returns >= 50. The page renders as "Nothing here yet" for the ✦ destination until that threshold is crossed. Building it before then trains early visitors to expect nothing from it.

---

## Moment 3: The Platform That Disappears

**What it is:** The fullest expression of ABLE's thesis — the platform that is invisible when it is working. An artist whose page is live, whose fans are signing up, whose releases are cycling through campaign states, whose gig mode activates the morning of a show — that artist never thinks about ABLE. They think about their music, their fans, their next show. ABLE is infrastructure, not interface.

The concrete form of this is measured once per year: ask 10 paying artists the question "How often do you think about ABLE as a product versus just using it?" The answer "I don't think about it, I just use it" is the 20/10 score. Any answer that includes "the product" as a distinct object of attention is a signal that something is creating friction.

The measurement is not vanity — it is a compass. If artists are thinking about ABLE as a product, something about the UX is surfacing the tool when it should be invisible. The corrective action is the audit from Moment 1: find the copy, find the friction, remove it.

**Why it's 20/10:** The transcendence standard is not about being exceptional — it is about being absent. The best infrastructure in the world is the infrastructure nobody talks about because it never fails, never draws attention to itself, never asks for thanks. The electrical grid. Tap water. The internet connection that just works. ABLE at 20/10 is the link-in-bio equivalent: the artist's page just works, their fans just sign up, their releases just cycle, and ABLE is never the thing they had to think about.

**Exact implementation:**

Annual NPS-variant survey, sent to all artists who have been active for 12+ months. Two questions only:

```
Question 1: In the last month, how often did something about your ABLE page cause you frustration?
[Never / Once or twice / Several times / Frequently]

Question 2: When your page is working — fan sign-ups coming in, your campaign state correct,
your links live — do you think about ABLE as a product you're using?
[Never, I just use it / Sometimes, when something stands out / Often, it's on my mind]
```

The target for Question 2: 80% answer "Never, I just use it."
Any score below 70% triggers a friction audit — review the previous month's support tickets for pattern signals about what is making the product visible when it should be invisible.

The survey is sent via Loops, personalised with the artist's name and their specific fan count (so it feels like a real check-in, not a research exercise). It is never labelled "NPS Survey" or "Feedback Form." Subject line: "Quick question about your page, [Name]."

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when an artist is asked "what tools do you use for your music career" and lists their DAW, their distributor, their mixing engineer, and their photographer — and only mentions ABLE as an afterthought, because it is so embedded in how they work that it does not register as a tool any more than electricity does.
