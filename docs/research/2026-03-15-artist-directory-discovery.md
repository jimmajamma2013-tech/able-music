# ABLE Artist Directory — Discovery Research & Architecture

**Researched: 2026-03-15**
**Status: Research complete — feeds into steps 76–83 of implementation plan**

---

## Key platform lessons

### Bandcamp — the tag system works, the sort system doesn't
Multi-tag combination (e.g. `electronic+ambient+UK`) is the most powerful feature — enables genuine niche browsing single-genre labels cannot. Dark mode adapts colour to the active tag. What fails: "best-selling" is a popularity contest — once an artist has traction, it surfaces them more, which gives more traction. Self-applied tags dilute genre pages when artists tag themselves across every plausible category.

**Lesson:** Controlled, limited vocabulary at the top tier. No self-assigned vibe from a tag menu.

### Resident Advisor — named curation is the trust mechanism
RA's model: local city managers who are community participants (not London editors writing about Berlin), public editorial guidelines, openly available pitch form. "RA Picks" carries weight because it cannot be bought — only pitched, with cultural criteria not commercial ones.

**Lesson:** Transparency about how editorial decisions are made creates trust, not the decisions themselves. A named contributor writing "here's why I'm recommending this artist this week" is more credible than any badge or ranking system.

### Discogs — two-tier controlled vocabulary at 13M records
~15 top-level genres, 700+ community-governed styles beneath. Controlled vocabulary prevents tag dilution — an artist cannot appear in "Jazz" unless the community confirms it. Progressive disclosure works. What fails: 700+ styles creates decision paralysis.

**Lesson:** The 7 ABLE vibes should be stable and opinionated. Do not allow self-assignment of the primary vibe. Free-form sub-tags are for search, not browse ranking.

### Are.na — human connection as trust signal
No follower counts, no trending lists, no algorithmic feed. Content surfaces through channels — when multiple independent curators collect the same block, that cross-channel presence signals cultural resonance. Are.na doesn't make this visible as a leaderboard. Every connection is a genuine editorial act because you must identify why a piece of content matters in your context.

**Direct application:** When multiple independent artists on ABLE recommend the same artist, surface it as a qualitative badge ("recommended by 3 artists on ABLE") — not a numerical rank, not a trending metric.

### Pitchfork — selectivity is the mechanism, not the badge
Best New Music goes to fewer than 5% of reviewed albums. That sub-5% rate is what makes the label valuable. Named writers, consistent aesthetic criteria, structural independence from advertising. **The failure mode:** after Condé Nast/GQ absorption in 2023, the editorial team was gutted and the badge lost meaning.

**Lesson:** Do not build the badge until you have the infrastructure (named contributors, published criteria, structural independence) that makes it mean something. Start with the structure, earn the authority, then activate the designation.

---

## The five failure modes — specifically

1. **Ghost town** — directory with no fresh signal feels abandoned. Prevent with: 90-day activity expiry (inactive profiles deprioritised), a "joined this week" first-class view, show-date urgency on every card.

2. **Popularity contest** — any sort by total fans/plays creates rich-get-richer spiral. Prevent with: velocity-based rising (new fans this week / average weekly fans, normalised), total fan count never displayed, "best-selling" not available as a sort.

3. **Tag gaming** — artists self-assigning every genre turns genre pages into noise. Prevent with: primary vibe set at onboarding, requiring deliberate admin change, two secondary vibes maximum.

4. **Stale editorial** — a featured artist from three months ago signals abandonment. Prevent with: weekly mandatory rotation, spotlight slot always shows a date.

5. **Passive browse problem** — people do not browse libraries, they search them. Without an on-ramp (shows near me this week, just followed someone, artist recommended you) there is no reason to start. Prevent with: first section of the page is always a contextual hook tied to real conditions (location + live show dates), not a static hero.

---

## Vibe browsing in practice

The ABLE design system already solves the hardest part. The 7 vibes are not just filter labels — each has distinct typography, accent colour, and border-radius. When a fan browses `/artists?vibe=electronic` the page should feel different from `/artists?vibe=folk-acoustic` before they read a single artist name. This is the visual language doing the discovery work that genre taxonomies fail at.

**Practical requirement:** Vibe tiles on the directory page use the vibe's own display font and accent palette. The browse decision is made aesthetically, not cognitively.

---

## URL structure and page architecture

```
/artists                          — default browse (all vibes, all locations)
/artists?vibe=electronic          — browse by vibe
/artists?vibe=indie&city=london   — vibe + city
/artists?city=manchester          — city only
/artists/near-me                  — geo-aware (shows + based-in)
/artists/new                      — joined this week
/artists/rising                   — velocity-based (new fans / week, normalised)
/artists/spotlight/[handle]       — editorial spotlight, canonical URL
```

Every filtered view has its own URL. No state in JavaScript only. Shareable, bookmarkable.

### Page section order

1. **Active hook** (contextual, always live): if location + shows → "Playing near you this week". If Friday/Saturday → "Playing this weekend". If neither → "Joined this week". Never a static banner.

2. **Vibe tiles** (primary navigation): 7 tiles using each vibe's own display font and accent colour. Tap → filters the grid. Shows artist count per vibe.

3. **Artist grid** (default: recently active in 90 days). Each card: artwork, name, vibe badge, location, one-line bio, active signal. No follower count.

4. **Editorial spotlight** (weekly, named contributor, dated).

---

## Active signal hierarchy on artist cards

Show only the most urgent one, in this order:

1. "Playing [City] in N days" — if show within 14 days
2. "New release: [title]" — if released within 30 days
3. "Gaining ground" — if velocity in top 20% of platform
4. Nothing — card shows with no badge

**Never total fan count. Never total plays.**

---

## Geo-aware discovery — three distinct features

**Feature 1 (Static):** Artists based in [city] — browse by artist home city, no time component.

**Feature 2 (Dynamic, v1):** Playing near me this week — artists with confirmed shows within 14 days, within range of fan's known location. Highest-value feature. A card showing "Playing Manchester, Fri 20 Mar" gives a fan an immediate action.

**Feature 3 (Phase 2):** Artists in your scene — other fans in your city also follow these artists. Requires the fan social graph.

### Failure states (must be designed)
- No location → "Enter your city" prompt, dismissable
- Location known but no shows near you → fall back to "Artists based in [city]"
- No artists in city → "No artists in [city] yet. Browse all artists →"
- Never an empty section, never a broken state

---

## Editorial layer

**Who:** Named local contributors (city editors). Phase 1 = ABLE team for first 12 weeks, actively recruiting 4–6 city contributors. Phase 2 = open applications with editorial review, targeting 15–20 global contributors.

**Criteria (published at `/artists/about-spotlight`):**
- Active in last 60 days
- Independent (no major label distribution)
- Recommendation is argued, not asserted
- Not already widely known
- Contributor has no commercial relationship with the artist

**The spotlight note:** max 3 sentences, contributor's voice not ABLE's brand voice, says what the music sounds like and why right now. Always ends with "Selected by [Name], [City]."

**Never says:** "emerging", "to watch", "incredible talent", "next big thing".

---

## Copy register

| Context | Use | Never use |
|---|---|---|
| Page title | "Artists on ABLE" | "Discover amazing artists" |
| Rising section | "Moving fast this week" | "Trending" / "Hot right now" |
| New section | "Joined this week" | "Fresh" / "New arrivals" |
| Near me section | "Playing near you this week" | "Events near you" |
| Active signal | "Playing Manchester in 3 days" | "Upcoming show" |
| Velocity signal | "Gaining ground" | "Trending" / a number |
| Spotlight intro | "[Name] is listening to:" | "We're excited to feature" |
| Empty city state | "No artists in [city] yet." | "Be the first!" / "Check back soon" |

---

## Anti-gaming structural choices

1. **Velocity normalisation:** Rising sort = new fans this week / average weekly fans (last 12 weeks). A sudden spike from fake sign-ups is an anomaly signal, not a rising signal.

2. **Vibe lock:** Primary vibe set at onboarding. Change requires deliberate admin action. Prevents artists cycling through vibes to appear in multiple genre pages.

3. **Activity expiry:** Artists inactive for 90 days move to deprioritised state — still findable by search, not in default grid. Past success does not guarantee permanent visibility.

---

*Sources: Bandcamp Discover, RA editorial model and B Corp announcement (April 2024), Discogs genre/style hierarchy documentation, Are.na channel mechanics, Pitchfork BNM history and Condé Nast coverage (2023), MBW and industry press on algorithmic vs editorial discovery.*
