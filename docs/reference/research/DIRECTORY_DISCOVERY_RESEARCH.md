> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE Artist Directory — Discovery Research & UX Architecture
**Compiled: 2026-03-15**
**Scope:** ablemusic.co/artists — non-algorithmic discovery for independent musicians

---

## Research Summary

The core challenge: most music directories are either (a) a popularity contest in disguise, (b) a ghost town that nobody browses, or (c) an editorial operation that requires a full-time editorial team to sustain. ABLE needs a fourth path. The research below isolates what each reference platform does right, what it does wrong, and what ABLE can take from each without replicating the failure modes.

---

## 1. Platform Analysis

### 1.1 Bandcamp — Tag/Genre Browse

**How it works**

Bandcamp's Discover lives at `bandcamp.com/discover`. It is a flat, searchable browse interface with:
- 24 top-level genre tags (electronic, rock, hip-hop/rap, folk, experimental, etc.)
- Format filters: digital, vinyl, cassette, CD, t-shirt
- Sort options: "best-selling", "fresh" (new arrivals), all categories
- Location filter: artists from a specific country or city
- Multi-tag combination via + syntax (e.g. `electronic+ambient+UK`)
- Dark mode that adapts colour palette to the tag being browsed — a detail worth noting

Each genre page shows a grid of release artwork with artist name, album title, price. Community features drive roughly 30% of Bandcamp's monthly sales. Artists tag themselves — there is no central taxonomy enforcement.

**What makes it feel trustworthy**

- Artist-direct commerce. When you buy from Discover, money goes straight to the artist. This aligns the platform's incentive with surfacing real music, not sponsored placements.
- No paid promotion inside Discover. You cannot buy your way into the browse results.
- Full-stream before purchase. Every result can be heard completely free before buying. Trust through transparency.
- The "fresh" sort option shows that recency is a first-class value — not just a tiebreaker.
- Multi-tag filtering enables genuine niche discovery (e.g. "experimental + bagpipes") that genre categories alone cannot provide.

**Weaknesses**

- Sort by "best-selling" is a popularity contest in structure if not intent. Once an artist has momentum, best-selling surfaces them more, which gives them more sales, which keeps them at the top. New or obscure artists are permanently disadvantaged.
- Self-applied tags are gamed. An artist tagging themselves with every plausibly related genre ("lo-fi hip-hop ambient jazz folk") dilutes tag pages and erodes trust in genre browsing as a discovery vector.
- The "Discover" section has been criticised as doing "a poor job of organising its vast catalogue and promoting new releases." The page lacks editorial curation — it is a filter + sort system, not an experience.
- Bandcamp's individual pages "feel like individual pages and not interconnected parts of a whole." There is no sense of community or progression across the directory — it is a catalogue, not a world.
- The 2023–24 product trajectory under Epic Games ownership created uncertainty. The platform retains its trust credentials but has lost some community momentum.

**Key lesson for ABLE:** The tag system is the strongest part. The sort system is the weakest. Bandcamp succeeds because it is artist-first and commerce-honest, not because its browse UX is excellent.

---

### 1.2 Resident Advisor — Editorial Model

**How it works**

RA is the definitive platform for electronic music events and culture. It combines:
- A global editorial team of local contributors (city managers, regional writers)
- "RA Picks" — editorially selected events and artists surfaced weekly
- Artist profiles that are primarily a factual record of gigs and releases, not a promotional page
- Pitch submission form for artists/PR to request feature coverage
- B Corp certified (April 2024) — independence and accountability are structural, not aspirational

Artists gain visibility through two routes: (1) they play events that RA lists, which builds a factual activity record, or (2) they are editorially featured because a writer pitched them or an editor assigned them.

**What makes it feel trustworthy**

- RA does not charge artists for profiles or features. Visibility is earned through activity, not payment.
- The editorial voice has a specific, consistent aesthetic: depth over hype. RA writers are community participants, not industry journalists.
- Local knowledge is structural. City managers represent their scenes — they are not London editors writing about Berlin. This geographic depth creates genuine discovery of local scenes rather than surface-level global trending.
- The platform explicitly states it focuses on "quality and authenticity of nightlife," actively avoiding "overly commercial events." The curation criteria are published.
- B Corp certification is a real structural constraint. It commits the company to editorial independence in its governance documents.

**How they surface quality without algorithmic manipulation**

- Artist pages are built from the bottom up: actual gig history, actual releases. An artist who has played credible venues multiple times builds a profile that speaks for itself.
- The "RA Picks" label is editorial gold precisely because it is rare and gatekept. It cannot be bought. It can only be pitched, and pitches succeed only if a writer makes the case.
- The "pitch a feature" form is publicly documented, which signals transparency: here is exactly how editorial decisions are made and how you can participate.

**Weaknesses for ABLE's purposes**

- RA is deeply electronic-specific. The editorial model works because contributors share genuine subcultural fluency. It cannot be directly transplanted to a multi-genre platform.
- RA's artist pages are thin on fan-facing content — they are more of a directory entry than a destination.
- The editorial operation requires significant human infrastructure (editors, city managers, writers) that is expensive to maintain at scale.

**Key lesson for ABLE:** Transparency about how editorial decisions are made is what creates trust, not the decisions themselves. RA's pitch form is as important as its picks. The local contributor model is worth emulating — give city/scene reps responsibility for their areas rather than trying to curate everything from the centre.

---

### 1.3 Discogs — Genre Taxonomy at Scale

**How it works**

Discogs hosts 13 million+ unique physical music releases. Its genre system is:
- A two-tier hierarchy: Genres (top-level, ~15) and Styles (sub-genre, 700+)
- Examples: Genre = Electronic; Styles = Ambient, Techno, House, IDM, Electro, etc.
- Community-governed: any registered user can edit genre/style fields and propose new styles
- The taxonomy is documented in public Database Guidelines and is continuously maintained via community forum consensus
- Separate from tagging: Discogs uses a controlled vocabulary rather than free-form tags, which prevents tag dilution

The browse experience works because the taxonomy is stable. Users know what "Electronic > Techno" means. Styles are specific enough to be meaningful (IDM is not the same as Techno) but the top-level genres remain navigable for casual browsers.

**What makes it navigable at massive scale**

- Controlled vocabulary prevents tag dilution. You cannot add a record as both "Folk" and "Electronic" unless it genuinely crosses those categories, and the community will revert bad edits.
- The two-tier structure means you can browse broadly (Genre) or precisely (Style) without being forced into either. This progressive disclosure is the right UX pattern.
- Physical format context gives the taxonomy legitimacy: when someone browses "Jazz > Bossa Nova" on Discogs, they find actual records with pressing details, condition notes, and prices. The taxonomy is grounded in something real and collectible, not abstract.
- Community governance means the taxonomy evolves with music culture. When a new style becomes established enough to warrant its own category, the community codifies it.

**Weaknesses**

- 700+ styles creates decision paralysis for a new user who does not already know what "Balearic" or "New Beat" means.
- The browse UI has not changed materially in years — it is functional but not designed. Discovery is essentially search + filter.
- The catalogue depth creates an intimidating first experience. Discogs is for serious collectors who already know what they want. It is not serendipitous.

**Key lesson for ABLE:** Two-tier structure (broad vibe + specific sub-tags) is the right architecture. Controlled vocabulary for the top tier, free-form tags for the second tier. Keep the first tier stable and opinionated — 7 vibes is correct. Do not let artists self-assign vibes. The vibe a human assigns to their music is almost always aspirational rather than accurate.

---

### 1.4 Are.na — Connection-Based Discovery

**How it works**

Are.na is structurally different from every other platform in this research. It is a tool for collecting and connecting ideas, used heavily by designers, artists, and researchers. Key mechanics:

- Users create "channels" (collections of blocks)
- Blocks can be images, links, text, files
- Any block can be "connected" to any channel by any user
- Channels can be public, private, or collaborative
- Discovery is through following people, following channels, and seeing what content is shared across multiple channels
- No follower counts, no likes, no trending lists, no algorithmic feed

The result: content surfaces through genuine interest, not engagement metrics. A piece of content that appears in many different curated channels across different contexts is, by definition, widely considered interesting — but this is invisible to casual users. The platform does not surface this signal externally.

**How content surfaces through connections rather than popularity**

- If you follow a curator whose taste you trust, you see what they are collecting. This is person-as-filter, not algorithm-as-filter.
- When a block appears in multiple people's channels, this cross-channel presence signals cultural resonance — but Are.na does not make this metric visible as a leaderboard. The discovery is ambient: you encounter something through a trusted source, not a trending chart.
- "Connections" (connecting an existing block to your channel) require cognitive effort — you must identify what the block means in your context. This friction is intentional. It makes every connection a genuine editorial act.

**The trust model**

Are.na is member-supported with no advertising and no external investment. This structural choice eliminates the incentive to maximise time-on-site or clicks. The platform is designed for depth over breadth. This creates a community where the social norms around quality are high.

**What ABLE can take from this**

Are.na is probably the purest example of what "a map, not a recommendation engine" looks like in practice. The connection model — where content gains credibility through being collected by multiple independent, trusted humans — is directly applicable to ABLE's "Artists I'm Digging" feature. When artist A recommends artist B, and artist C also recommends artist B independently, that cross-referencing signal is the Are.na connection model applied to music artists. ABLE can make this visible without making it a leaderboard: "Recommended by 3 artists on ABLE" is a qualitative signal of community interest, not a popularity metric.

**Weaknesses for ABLE's context**

- Are.na's discovery model works for a specific type of curious, intentional user. It is not designed for passive discovery. Fans who land on ablemusic.co/artists are not in the same research mode as Are.na users.
- The platform does not scale easily to casual browsing — it rewards deep engagement and punishes passive scrolling.

**Key lesson for ABLE:** Cross-recommendation as a trust signal. When multiple independent artists on ABLE recommend the same artist, surface that as a qualitative badge ("recommended by artists you might know"), not a numerical rank. Human curation creates a graph that can power discovery without an algorithm.

---

### 1.5 Pitchfork — "Best New Music" as an Editorial Layer

**How it works**

Pitchfork awards "Best New Music" designation to fewer than 5% of reviewed albums. The criteria:
- Originality above technical quality
- Clear artistic vision
- Something new offered within the genre's landscape
- Generic soundalikes are explicitly excluded regardless of technical execution

The editorial hierarchy: the review score is visible and controversial; the "Best New Music" badge is the only thing that actually drives significant traffic and cultural conversation.

**What makes an editorial recommendation feel credible vs. promotional**

- Selectivity. If 50% of releases got "Best New Music," it would mean nothing. The sub-5% rate is the mechanism that makes the label valuable.
- Signed argument. Every Pitchfork review carries a named writer. You can disagree with a named person. You cannot disagree with an algorithm. Named editorial creates accountability and debate, which creates engagement and trust simultaneously.
- Consistent criteria that are publicly known. Pitchfork's editorial preferences are understood by the music community even if unstated formally — they value originality, genre boundary-crossing, cultural context, and critical sophistication. This consistent aesthetic means the "Best New Music" badge says something coherent.
- Editorial independence from commercial interest. Pitchfork (in its credible era) did not review records based on advertising relationships. The separation of church and state was well-understood and occasionally tested publicly.

**The failure mode Pitchfork illustrates**

After its 2023 integration into Condé Nast's GQ operations, Pitchfork lost significant staff and credibility. The lesson: when the editorial operation becomes a cost centre rather than a cultural authority, the selectivity and independence that made the badge valuable gets eroded. An editorial layer only works while the editors have genuine independence and genuine stakes in their community's respect.

**Key lesson for ABLE:** An editorial badge is worth building only if: (a) it is genuinely rare, (b) the criteria are transparent, (c) the people making the call are accountable and named, and (d) the operation is structurally independent from commercial pressure. ABLE should not start with an editorial badge unless it can guarantee all four. Start with the structure that makes the badge possible — a transparent nomination process and community trust — before activating the badge itself.

---

## 2. Failure Modes of Non-Algorithmic Directories

The research surfaces five failure modes that apply directly to ABLE.

### 2.1 The Ghost Town Problem

**Mechanism:** A directory with 50 artists and no weekly refresh feels abandoned. Fans browse once, find nothing new, never return. Artists who see low browse traffic stop investing in their directory presence.

**Prevention:**
- Surface "joined this week" or "new on ABLE" as a first-class view, not a filter
- Display real activity signals (new release, upcoming show) not just profile existence
- Keep the browse state honest: "27 artists in London" is honest. Do not inflate with inactive profiles.
- Remove or archive artists who have been inactive for 12+ months (no show, no release update). Move them to an "on hiatus" state, not the front page.

### 2.2 The Popularity Contest Trap

**Mechanism:** Any sort order that rewards existing traction creates a rich-get-richer dynamic. Artists with large existing fanbases dominate "trending" views, making the directory useless for discovery of anyone not already known.

**Prevention:**
- Velocity over volume. "12 new fans this week" is more interesting than "8,000 fans total." Surface momentum, not size.
- Cap display metrics. Show "active fanbase" or "recently released" rather than total fan count.
- Never show raw numbers at directory level. Numbers invite comparison and comparison invites gaming.
- Rotate editorial features on a fixed cycle — a rising artist gets a week in the spotlight, then the feature moves on.

### 2.3 Tag Gaming

**Mechanism:** Self-applied tags dilute genre pages. An artist who tags themselves as 10 different genres to maximise reach turns those genre pages into noise.

**Prevention:**
- Limit self-applied genre tags to 2 at the top tier. Artists can add free-form sub-tags.
- The primary vibe (the 7 ABLE vibes) should be selected at onboarding and require deliberate change, not casual addition.
- Consider human confirmation of vibe assignment for artists going through editorial spotlight.
- Detect anomalies: an artist with 0 releases tagging themselves as every vibe is a signal, not data.

### 2.4 The Stale Editorial Problem

**Mechanism:** An editorial pick that is three months old is worse than no editorial layer — it signals the platform is not maintained.

**Prevention:**
- Weekly rotation minimum for any "featured" or "rising" designation
- The editorial slot should be tied to a real event: new release, upcoming show, tour announcement
- If the editorial team cannot sustain weekly rotation, use a hybrid: manually curate once a month, supplement with velocity-based automated surfacing for the weeks between
- Never show a "featured" artist with a last activity date more than 60 days ago

### 2.5 The Passive Browse Problem

**Mechanism:** A directory is a library, and people do not browse libraries — they search them. Without a reason to start browsing (new releases this week, shows near me tonight, your favourite artist just recommended someone), fans have no on-ramp.

**Prevention:**
- Every directory visit should have an active hook: "3 new artists from your city joined this week" or "5 artists are playing London next week"
- Surface the directory through the fan dashboard (fan.html), not as a standalone destination. The directory works when it has context.
- The entry points are specific situations: "you just followed an artist → here are 3 more like them" or "you signed up to a show → here are artists also playing that venue this month"

---

## 3. Vibe-Based Browsing — What It Means in Practice

### 3.1 Why Genre Labels Fail

Research consistently shows that listeners do not think in genre terms when seeking music. They think in emotional and situational terms: "I want something that sounds like it is raining in a city" or "I need energy for a run" or "something that sounds like going home". Genre labels are a producer-side taxonomy, not a listener-side taxonomy.

For ABLE's purposes: the 7 vibes are a producer-side categorisation (Electronic, Indie, R&B/Soul, Folk/Acoustic, Hip-Hop, Pop, Experimental). They are useful for browse navigation, but they are not sufficient as a discovery interface. The fan's entry question is not "what genre am I in the mood for?" — it is closer to "what does this feel like?"

### 3.2 ABLE's 7 Vibes as Visual Anchors, Not Filter Labels

The ABLE design system already embeds a crucial insight: each vibe has a distinct visual vocabulary (font, accent colour, border radius, letter spacing). This means browsing by vibe on ablemusic.co/artists is not reading a list of labels — it is experiencing a visual difference.

The practical UX implication: when a fan clicks "Electronic" in the directory, the page should feel different from when they click "Folk/Acoustic". Different background treatment, different typography register, different colour temperature. The vibe is communicated visually before any artist profile is read.

**Vibe visual register for the directory:**

| Vibe | Palette mood | Typography feel | Spatial feel |
|---|---|---|---|
| Electronic | Cool, cyan-tinged dark | Precision grid, condensed caps | Dense, structured |
| Hip-Hop | Gold on dark | Assertive, bold | Confident, open |
| R&B/Soul | Rose-warm | Flowing, italic serif | Intimate, textured |
| Indie | Sage-grey | Humanist, irregular | Loose, lived-in |
| Pop | Indigo-bright | Energetic condensed | Light, airy |
| Folk/Acoustic | Ochre-warm | Serif, handwritten feel | Grounded, unhurried |
| Experimental | No fixed palette | Unexpected, variable | Deliberately disorienting |

### 3.3 Sub-Vibes and Cross-Vibe Navigation

Strictly assigning each artist to one vibe creates a false grid. An artist who makes R&B-influenced electronic music should appear in both — but not by gaming tags. The solution is a primary vibe (one, selected at onboarding) and up to 2 secondary vibes (optional, displayed as sub-labels on the profile card).

Directory browse shows by primary vibe. A cross-vibe filter ("show me R&B/Soul artists who also tag as Electronic") is a secondary affordance, not the primary browse pattern.

---

## 4. Geo-Aware Discovery — "Artists Near Me"

### 4.1 What Data It Needs

For geo-aware discovery to work, two data types are needed:

1. **Artist location:** City/country set at onboarding, updatable in admin. Not precise — city-level is sufficient and appropriate for privacy. Stored in profile as `location` field (already in ABLE's schema).

2. **Show data:** Events with date, venue, city. Already in ABLE's `able_shows` localStorage schema and Supabase events table. The `date` field enables time-aware surfacing.

The third data type is optional: **fan location**. If a fan has opted in to location (through either browser geolocation prompt or a city field at sign-up), the directory can personalise to them. If not, the directory falls back to the fan's manually entered city or "all locations."

### 4.2 Three Distinct Geo Features (Do Not Conflate)

**Feature 1: "Artists based in [city]"**
- Static. Shows artists who list a given city as their base.
- No time component.
- Entry point: city search or country browse.
- Use case: fan moving to Manchester, wants to find local artists.

**Feature 2: "Artists playing near me this week"**
- Dynamic. Shows artists with confirmed shows within X km of the fan's location, within the next 14 days.
- Requires: fan location + artist show data with date and venue city.
- This is the highest-value geo feature. A fan who discovers an artist and sees they are playing 3 days from now has an immediate action.
- Display: artist card + show date + venue name + ticket CTA. Not separate — combined in one card.

**Feature 3: "Artists in your scene"**
- Social graph. Artists that other fans in the fan's city also follow.
- Requires: fan sign-up data with location, which fans have linked to which artists.
- Phase 2 feature. Do not build for v1 directory launch.

### 4.3 Display Pattern for "Near Me"

Entry: fan visits ablemusic.co/artists → if location is known, a top banner: "8 artists playing in London this week →" — this is a contextual on-ramp, not the default view.

The "near me" view:
```
[City name] this week
[Artist card] — [Show: Venue Name, Thurs 19 Mar] — [Get tickets →]
[Artist card] — [Show: Venue Name, Sat 21 Mar] — [Get tickets →]
[Artist card] — [Show: Venue Name, Fri 4 Apr] — [Get tickets →]
```

The card shows artist name, vibe badge, one-line bio, show details. The show detail is not a footnote — it is the reason for surfacing this artist now.

### 4.4 Failure States (These Must Be Designed)

- **No location known:** "Where are you based? [Enter city] — we'll show you artists and shows near you." One-line prompt, dismissable. Remembers choice. Does not block the rest of the browse experience.
- **Location known, no shows near me:** Do not show an empty "near me" section. Fall back to "Artists based in [city]" — a different proposition but still locally relevant.
- **Location known, no artists in city:** "No artists based in [city] on ABLE yet. [Browse all artists →]" — honest, non-apologetic, gives an exit.
- **Show in the past:** Expire shows from the near me view 24h after the event start time. No zombie events.
- **Venue city ambiguous:** If the artist has a show listed but the venue city is not parseable (e.g. "TBC" or missing), exclude from the near me view. Do not show approximate results.

---

## 5. Recommended Architecture for ablemusic.co/artists

### 5.1 URL Structure

```
/artists                          — Default browse (all vibes, all locations)
/artists?vibe=electronic          — Browse by vibe
/artists?vibe=indie&city=london   — Browse by vibe + city
/artists?city=manchester          — Browse by city (all vibes)
/artists/near-me                  — Geo-aware view (shows + based-in)
/artists/new                      — New to ABLE this week
/artists/rising                   — Velocity-based rising (new fans this week, not total)
/artists/spotlight/[handle]       — Editorial spotlight (weekly feature, own canonical URL)
```

Shareable, bookmarkable URLs. Every filtered view has its own URL. No state in JavaScript only.

### 5.2 Page Architecture

The page has four distinct sections, arranged in this order:

**Section A — The Active Hook (contextual, always fresh)**

This is the most important part of the page. It changes based on context.
- If location known + shows this week → "Playing near you this week: [cards]"
- If no location but day is Friday/Saturday → "Playing this weekend: [cards]"
- If none of the above → "New on ABLE this week: [artist cards, joined last 7 days]"

Never a static hero banner. Always a live condition.

**Section B — Browse by Vibe (the primary navigation)**

7 vibe tiles arranged in a grid. Each tile:
- Vibe name in the vibe's display font (Barlow Condensed for Electronic, Lora for Folk/Acoustic, etc.)
- Accent colour background at low opacity
- "N artists" count below
- Tap → filters the grid below

This is the map. The visual differentiation between tiles is the entry to the discovery experience. Fans do not read label text — they feel the aesthetic difference.

**Section C — The Artist Grid**

Default: all artists, sorted by "recently active" (last release, last show, or last profile update within 90 days). Inactive artists (no activity in 90 days) are deprioritised to page 2 or hidden by default.

Grid card, each artist:
```
[Artwork / hero image — square or 4:3]
[Artist name — vibe display font]
[Vibe badge — accent pill]
[Location — city, country]
[One-line bio — truncated at 70 chars]
[Active signal: "New release" / "Playing [city], [date]" / "N fans this week"]
```

No follower count. No total fan count. No play counts.

Active signal hierarchy (show only the most urgent):
1. "Playing [city] in N days" — if they have a show within 14 days
2. "New release: [title]" — if they released within 30 days
3. "N new fans this week" — only if velocity is notable (top 20% of platform)
4. Nothing — if none of the above (card still shows, just no signal badge)

**Section D — Editorial Spotlight (weekly, named)**

One artist, featured with context. Not just a card — a short editorial note.

Structure:
```
SPOTLIGHT — week of [date]
[Artist name]  /  [Vibe]  /  [City]
[Hero image — 2:1 landscape]
[2–3 sentences: who they are, why now, what to listen to first]
[Selected by: [Name], [City] — ABLE contributor]
[Go to profile →]
```

The "selected by" credit is non-negotiable. Named curation creates accountability. It also creates an incentive for local contributors to do good work: their name is publicly attached to the recommendation.

Rotation: weekly minimum. If no editorial contributor submits a pick for a given week, the slot shows the previous week's pick with a clear "last week's spotlight" label. Never hide the slot — a hidden editorial slot signals abandonment.

### 5.3 Filter and Sort Controls

Persistent filter bar (sticky below the vibe tiles):

```
[Vibe: All ▾]  [City: All ▾]  [Active: Recently active ▾]  [Clear filters]
```

Sort options:
- Recently active (default) — last release, show, or profile update within 90 days
- New to ABLE — sorted by join date, newest first
- Rising — sorted by fan velocity (new fans / week, last 30 days), normalised to prevent absolute-count bias
- A–Z (name) — for when you are looking for someone specific

**What is explicitly not a sort option:**
- Most fans (total)
- Most plays
- Best rated
- Most popular

These are banned. They produce popularity contests. "Rising" is the closest to a trending sort and it is specifically velocity-based (growth rate, not absolute size) to prevent incumbency bias.

### 5.4 The "No Gaming" Architecture

Three structural choices that prevent gaming without requiring editorial intervention:

1. **Velocity cap:** The "rising" sort uses new fans this week / average weekly fans over last 12 weeks. An artist cannot game this by buying fans — a sudden spike from fake sign-ups shows as an anomaly, not a signal. Genuine slow growth accumulates naturally.

2. **Vibe lock:** Primary vibe is set at onboarding, change requires admin update (not a one-click tag toggle). This prevents artists cycling through vibes to appear in multiple genre pages simultaneously.

3. **Activity expiry:** Artists inactive for 90 days are moved to "taking a break" state in the directory — still findable by name search but not in default browse results. This keeps the browse experience alive without deleting anyone's work.

### 5.5 The Editorial Layer — Who Curates, What the Criteria Are

**Who curates**

ABLE's directory editorial is not written by ABLE staff. It is written by a contributor network of local music people — bookers, journalists, promoters, musicians — who are given a "city editor" or "scene editor" designation. They submit a spotlight pick weekly (optional) and receive attribution on every pick they make.

Phase 1 structure (launch):
- ABLE team curates directly for the first 8–12 weeks, establishing the tone and criteria
- Actively recruits 4–6 city contributors (London, Manchester, LA, NYC, Berlin, Sydney)
- Contributors receive: free Artist Pro subscription, named credit on all picks, a brief in the ABLE contributor guide

Phase 2 (6 months post-launch):
- Open contributor applications with an editorial review
- Target 15–20 city contributors globally
- A monthly "contributor picks" digest email that goes to fans subscribed to the directory

**Criteria (explicit, published)**

The criteria for an ABLE spotlight are:
1. The artist is active: has released or played in the last 60 days
2. The artist is independent: no major label distribution (this is verifiable in their profile)
3. The artist demonstrates craft: the pick must be argued, not just asserted
4. The artist is not already widely known: the purpose is to surface the overlooked, not validate the established
5. Contributor has no commercial relationship with the artist (no booking agent conflict)

These criteria are published at `/artists/about-spotlight`. Transparency is the mechanism.

**Presentation**

The spotlight note is a maximum 3 sentences. It is written in the contributor's voice, not ABLE's brand voice. It reads like a personal recommendation from someone who knows the music, not a press release.

What it never says:
- "emerging artist"
- "to watch"
- "next big thing"
- "incredible talent"

What it always says:
- What the music actually sounds like
- Why right now, specifically
- What to start with

---

## 6. Preventing Ghost Town and Popularity Contest — Summary Rules

**Against the ghost town:**
- Directory shows only artists with activity in the last 90 days by default
- "New this week" is always a first-class view with a dedicated entry point
- Show data creates urgency: a fan who sees an artist playing this Friday has a reason to care now
- Geo-aware hook ensures every visit starts with local context when possible
- Editorial spotlight rotates weekly and is stamped with a date — visible recency signal

**Against the popularity contest:**
- Fan count is never displayed in the directory
- Sort by popularity is not available
- "Rising" is velocity-based, not volume-based, and normalised against the platform average
- Inactive artists are deprioritised automatically — previous success does not guarantee ongoing visibility
- Editorial spotlight criteria explicitly exclude artists who are already widely known
- Cross-recommendation ("artists I'm digging") surfaces as a qualitative badge, not a count

**Against tag gaming:**
- Primary vibe is set at onboarding, not self-selected from a tag menu
- One primary vibe only; change requires deliberate admin action
- Secondary vibes limited to 2
- Self-applied free-form tags are for search, not for directory browse ranking

---

## 7. Copy Register for the Directory

Consistent with ABLE's overall copy philosophy, the directory page copy should feel like a knowledgeable friend making introductions, not a platform promoting its inventory.

**Page headline:** "Artists on ABLE" — direct, not branded hype

**Vibe tile labels:** Use the vibe names as-is (Electronic, Indie, R&B/Soul, Folk/Acoustic, Hip-Hop, Pop, Experimental). No creative renaming. The vibe names are functional labels; the visual design does the emotional work.

**Empty state (new to the city):** "No artists in [city] yet. [Browse all artists →]" — not "Be the first!" or "Check back soon!"

**Near-me headline:** "Playing near you this week" — factual, not promotional

**Rising section headline:** "Moving fast this week" — not "Trending" (too algorithmic) and not "Hot right now" (too marketingspeak)

**New to ABLE:** "Joined this week" — not "New arrivals" (too retail) and not "Fresh" (too vague)

**Spotlight intro:** "This week, [contributor name] is listening to:" — personal, specific, not "we're excited to feature..."

**Active signal badges:**
- "Playing [City] in [N] days" — specific, time-bound
- "New: [Release title]" — concrete
- "Gaining ground" — for velocity signal (not "trending", not a number)

---

## 8. Implementation Priorities

### What to build first (Phase 1, v1 launch)

1. Basic vibe-filtered browse grid with artist cards
2. City filter (based on artist location field — already in schema)
3. Sort options: Recently active, New to ABLE, A–Z
4. Active signal badges on cards (show date, new release)
5. Geo-aware "near me" entry hook (browser geolocation → city match → shows this week)
6. Editorial spotlight slot (manually curated weekly by ABLE team)

### What to build second (Phase 2, 3–6 months)

1. Velocity-based "Rising" sort with normalised metric
2. Cross-recommendation badge from "Artists I'm Digging" graph
3. Contributor network (city editors with named credits)
4. Multi-vibe filter (primary + secondary vibe cross-browse)
5. Shareable filtered URLs
6. "Artists I'm digging" on artist profiles contributing to directory signal

### What not to build (ever)

- Total fan count display in directory
- Sort by most popular / most followed / most plays
- Paid promotional placement in any browse view
- Self-service vibe assignment without admin-level change flow
- Auto-generated editorial copy (AI-written spotlight notes break the trust model)

---

## 9. Key Decisions Made by This Research

| Question | Answer | Source |
|---|---|---|
| Should artists self-assign vibes? | No. Primary vibe set at onboarding, deliberate to change | Discogs controlled vocabulary + tag gaming failure mode |
| Should total fan count be shown? | No. Velocity only, no absolutes | ABLE DISCOVERY_AND_GROWTH.md + popularity contest failure mode |
| Who should curate the spotlight? | Named local contributors, not ABLE brand voice | RA city manager model + Pitchfork named writer model |
| How should geo-aware discovery work? | Show + artist location separately; combine for "near me" view | Bandsintown sync pattern + Spotify Local Scene case study |
| What keeps the directory fresh? | Activity expiry at 90 days + weekly editorial rotation + new-this-week view | Ghost town failure mode analysis |
| How do artist-to-artist recommendations factor in? | As a qualitative badge ("recommended by N artists") not a sort signal | Are.na connection model |
| What is the right sort order default? | Recently active (last release/show/update in 90 days) | Bandcamp "fresh" sort + recency-first principle |
| What copy should never appear in the directory? | "Trending", "Top artists", "Emerging talent", "Most popular", "Best" | Copy philosophy + anti-popularity-contest principle |

---

*Research compiled from: Bandcamp Discover (live + blog), Resident Advisor editorial model, Discogs Database Guidelines, Are.na platform model, Pitchfork editorial history, post-genre music discovery research (ACM 2025, Artistrack), Spotify Local Scene case study, Bandmap, velocity-based discovery literature.*
