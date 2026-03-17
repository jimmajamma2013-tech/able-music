# ABLE — Professional Discovery System
**Version 1.0 — 2026-03-13**

*The music industry's IMDb. Not Fiverr. Not SoundBetter. Not LinkedIn.*

---

## The Core Insight

Every great record already contains the discovery mechanism. "Produced by Maya Beats" — three words on a credit. If you love that record, that's the strongest possible portfolio for Maya. She doesn't need a demo reel. She doesn't need 87 five-star reviews. The evidence is already in your ears.

The problem is those credits have always been buried — in liner notes, on Discogs, in distributor metadata that no one reads. ABLE makes them clickable. When you tap a credit on a release, you land on the producer's profile — their own music, their other credits, their availability, their contact. You've already heard what they do to music you love. The trust is pre-established.

**This is the opposite of SoundBetter.** On SoundBetter, you search → filter by price → listen to demos → read reviews → guess at quality. On ABLE, you've already heard the work. You're not evaluating — you're following a trail.

---

## Why Existing Platforms Fail for Established Professionals

**SoundBetter / AirGigs / Fiverr Pro:**
- Race to the bottom: price is the primary filter, quality is secondary
- Rating systems create anxiety on both sides — a 4.6 rating is worse than no rating for a professional who has never needed to compete on reviews
- "Applying for a brief" is degrading for people who are in demand — established producers don't audition, they're sought
- No context: a demo reel tells you nothing about what a producer does to music that sounds like yours
- Platform takes commission: penalises experienced professionals who work on large projects

**The real way professionals get hired:**
Mutual connections. Studio recommendations. Twitter/Instagram DMs. "Who did your mix?" asked at a gig. A manager hearing a record and asking who produced it. Professionals who are good enough don't need a marketplace — they get referrals. The problem isn't finding work; it's being findable to the right people.

**What ABLE does instead:** It makes the credit trail public and navigable. No application process. No price competition. No rating system. You find them through music you already love.

---

## The IMDb Model for Music

IMDb doesn't sell services. It doesn't rate performances. It is a credited documentation of who made what. Its value is pure discovery: "I loved the cinematography in this film. Who shot it? What else have they done?"

The result: a DP with 20 credited films doesn't need a portfolio website. Their filmography IS their portfolio. Any director who wants to hire them can see exactly what they've made.

ABLE's credits system is the music industry's IMDb — but active, not passive. The difference:
- IMDb: passive documentation (fan-facing only)
- ABLE: active discovery (credits link to live profiles with contact info)
- ABLE adds: "Here's how to hire me" — rate card, availability, contact

**The ABLE professional profile writes itself.** A producer credited on 12 ABLE artist profiles has a 12-release portfolio with zero manual work. Every verified credit from an artist they worked with is automatically on their Studio profile. The more artists who use ABLE, the more discoverable the professional becomes — without them having to do anything.

---

## Professional Types: What They Need

### Type 1: Artist who also freelances (the primary case)

The most common case in independent music. A producer who releases their own music. A songwriter who also performs. A session musician who has a band. This is "artist first" — the freelance work is an extension of their creative identity, not a separate service offering.

**What they get:** Full ABLE profile (artist page) + Studio mode toggle (`?mode=studio` URL param). Same handle, same profile photo, different face of the same person.

**Discovery path into Studio mode:** Their credits on other artists' releases → click → lands on Studio mode automatically.

**The toggle:** On their own artist profile, a small "Studio" pill near the bio. Fans mostly don't tap it. Industry people do. The profile doesn't scream "for hire" — it's there when needed.

---

### Type 2: Freelancer without their own releases (studio-only profile)

A mixing engineer who only mixes for others. A session violinist. A music video director. They have no artist releases, but they have credits, a rate card, and creative identity.

**What they get:** Studio profile only — no artist sections (no Listen tab, no Shows, no campaign states). The profile is: header + bio + credits + portfolio links + rates + contact.

**Can upgrade:** At any time, they can "Add artist profile" — enable the full artist page at the same handle.

---

### Type 3: Industry professional — manager, booking agent, lawyer, A&R (contact card only)

These professionals don't make music. Their value is in their roster and relationships, not a creative portfolio. They don't need a profile — they need to be findable.

**What they get:** A minimal "industry card" — name, role, which artists they work with (links to those artists' ABLE profiles), contact email. That's it. No portfolio, no rate card, no photo required.

**Who creates it:** The artist creates it by listing their team on their profile. "Managed by [Name]" → artist pastes contact details → an industry card is auto-generated at a URL. The professional doesn't need to sign up — they can claim it later.

**Who sees it:** Industry-facing. Fans don't see management contact details by default — it's behind a small "Industry" toggle on the profile footer, or in an expandable section.

---

## The Discovery Graph

```
ARTIST PROFILE
   ├── Release: "Strange Winter EP"
   │      └── Credits expanded:
   │             ├── Produced by: Maya Beats ✓ → [Studio profile]
   │             ├── Mixed by: Luca Romano ✓ → [Studio profile]
   │             └── Video directed by: Cass Winters → [Studio profile]
   │
   └── "People in my world"
          ├── [Artist: Olive] → their ABLE artist profile
          ├── [Producer: Maya Beats] → their Studio profile
          └── [Booking: XL Agency] → their industry card
```

Each credit is a **directed edge in the discovery graph**. Following an edge takes you from music you love → person who made it → their other work → other artists they've made → more music you might love.

This is discovery through quality trails, not search through listings.

---

## The Credit Verification System (3 levels)

| Level | Display | How earned | Trust signal |
|---|---|---|---|
| **Unverified** | "Produced by Maya Beats" (no mark) | Artist adds credit manually | Low — easily faked |
| **Peer-confirmed ✓** | "Produced by Maya Beats ✓" (linked) | Professional taps "Confirm" in their dashboard | High — both parties agree |
| **Metadata-verified** | "Produced by Maya Beats ✓✓" | ISRC match via DistroKid/TuneCore/distributor | Highest — third-party verification |

**Peer-confirm flow (one tap):**
1. Artist adds credit: "Produced by Maya Beats" + Maya's ABLE handle or email
2. Maya gets notification: "ARTIST added you as producer on [Track Name]. Confirm?"
3. Maya taps Confirm → credit becomes ✓ → linked to her Studio profile
4. Both artist and professional benefit: artist's release gains credibility, professional's portfolio grows

**Rules:**
- Never auto-confirm. Never sell verification. Never gamify (no "50 verified credits" badges).
- The ✓ means the professional themselves confirmed it. That's it.
- Unverified credits are still shown — they're just not linked and don't carry the ✓.

---

## The Studio Profile: What It Shows

```
[Header]
[Profile photo — same as artist page]  [Name]  [Role chips: Producer · Songwriter]
[Location]  [Availability badge: Available · Booking from April · Closed]
[Contact CTA: "Work with [Name]"]

[Bio — 2–3 sentences, first person, in their own voice]
"I make indie and alternative records. I care about arrangements that feel earned,
not busy. I work out of a studio in East London."

[Credits — the portfolio]
✓ Produced "Strange Winter EP" — MAYA (2026) → [links to release on her ABLE profile]
✓ Mixed "Blue Coat" — MAYA (2026)
✓ Produced "Chalk" — Chalk (2025) → [links to Chalk's ABLE profile]
  Produced "Home Session" — Arima Ederra (unverified — not yet on ABLE)
[Show more credits →]

[Portfolio highlights — 4 cards max]
[Release artwork + title + artist + role + year — taps through to that artist's release]

[Rate card — optional]
Day rate: £600  |  Half-day: £350  |  Project: Enquire
"I work primarily with indie, folk, and alternative artists. London-based but remote-friendly."

[Artists I've worked with — horizontal scroll, chips]
MAYA → Chalk → Florence Road → [+4 more]

[Contact]
"Work with [Name] →"  →  opens email with subject pre-filled: "Enquiry — found you via ABLE"
OR: "Book a call →" → Calendly/cal.com link (artist-provided)
```

---

## The "People in My World" Section

This is the artist's curated signal of who they trust. Not a recommendation-for-recommendation arrangement. Not a mutual endorsement club. Just: "These people are in my world and I think you'd be interested in them."

**What can be listed:**
- Other artists (musical peers, people they support, influences)
- Producers, engineers, session musicians they've worked with and would work with again
- A booking agent or manager (shows professionally)
- A visual artist, photographer, director who made work for them

**Rules:**
- Always artist's choice — they can list no one. That's fine.
- Each listing is manual — never auto-populated from credits alone
- Max 8 listings — this is curation, not a directory
- Can link to ABLE profiles (artist or studio) or just show a name + role

**Why this matters for discovery:**
If you follow 5 artists on ABLE and all 5 of them have the same producer in their "People in my world," that's a strong signal. You haven't searched for them — you've found them through three degrees of trust.

**Tone of the section header (artist's voice):**
- "People I rate" — direct, personal
- "People I make things with" — collaborative
- "In my world" — understated
- OR no header — just shown without label
- Never: "Recommended Artists" / "My Team" / "Collaborators" — these are admin labels

---

## What ABLE Deliberately Does NOT Build

**No ratings or reviews.** The credibility signal is the credit + the artist who endorsed the professional. That's more meaningful than 47 five-star ratings. Reviews create anxiety, invite gaming, and reduce complex professionals to a number.

**No search for professionals.** There is no "search for a producer" feature. Discovery happens through following quality trails. If you want to find a producer, start with music you love and see who made it. This is not a bug — it is the design. It keeps the discovery intentional and quality-driven rather than competitive.

**No in-platform messaging.** Email and Calendly are sufficient and prevent ABLE from becoming a communication platform with support obligations. The introduction is ABLE's job. The relationship is theirs.

**No contracts or payment processing for services.** ABLE makes the introduction. The transaction (if any) happens outside ABLE. No commission, no escrow, no mediation.

**No "apply to a brief" / job board.** This defines the platform as a marketplace. ABLE is a creative network. The difference: on a marketplace, you compete for work by bidding. On ABLE, your work speaks for itself and people come to you.

**No "top professionals" or "featured" rankings.** Rankings create competition anxiety and favour whoever has the most activity, not the best work. The quality signal is the artists in their credits, not an algorithm.

**No separate signup for freelancers.** Studio mode is activated from within an existing ABLE account. The artist is always the primary identity. Freelancing is an additional face, not a separate product.

---

## Managers and Booking Agents: The Minimal Presence

**What they need to be discoverable:**
1. Their name to appear on the artist's profile ("Managed by [Name]")
2. A way for other industry people to reach them
3. A list of artists they work with (with links)

**What they don't need:**
- A portfolio (they don't make work, they find and develop it)
- A bio beyond their role
- A rate card
- Social proof / ratings

**The industry card:**
```
[Name]  [Role: Manager / Booking Agent / PR / Legal]
"Represents: [Artist A] · [Artist B] · [Artist C]" → each links to their ABLE profiles
Contact: [email]
```

**How it's created:**
The artist creates it. "Add team member" in admin → type their name, role, contact email → an industry card is generated at `ablemusic.co/professionals/[slug]`. The professional is notified and can claim the card (add their own photo, edit the copy) or leave it as-is.

**Who sees it:**
- The artist's profile has a small "Team" section in the footer — visible to everyone but visually de-emphasised
- Industry people (other managers, promoters, journalists) see it immediately — it's the professional signal they're scanning for
- Fans mostly don't engage with it — and that's correct

---

## The Bidirectional Toggle: Artist ↔ Studio

Any person on ABLE with both an artist profile and a studio profile can toggle between them. The URL conveys the mode:

- `ablemusic.co/@dannyharle` → artist profile (default)
- `ablemusic.co/@dannyharle?mode=studio` → studio/freelancer profile

Both are shareable. A booker sends `?mode=studio` to other bookers. A fan shares the artist URL.

**The toggle UI on the profile:**
- On the artist profile: a small "Studio" pill near the role/genre tags — understated, not a nav item
- On the studio profile: a small "Music" pill — "See [Name]'s releases →"
- Crossfade transition (300ms, opacity) — same person, different face

**The distinction:**
- Artist profile: campaign states, Listen, Shows, fan capture — for fans
- Studio profile: credits, portfolio, rates, contact — for industry and other artists

Neither profile knows about or interferes with the other's presentation. They share: photo, name, location, bio (edited separately — often different context), social links.

---

## The Discovery Flow: Step by Step

**Scenario: UK artist wants to hire the producer who made a record they love.**

1. They visit their favourite artist's ABLE profile → scroll to the release they love
2. They tap "Credits" → see expanded credits: "Produced by Maya Beats ✓"
3. They tap "Maya Beats" → land on her Studio profile
4. They see: her own releases (indie, folk, alternative — matches what they heard), 12 verified credits across 8 artists they recognise
5. They see her rate card: "Day rate: £600. Currently available."
6. They tap "Work with Maya →" → email client opens with subject pre-filled
7. They email. Maya responds. They make a record.

**Zero searching. Zero filtering. Zero cold emails to unknown people.** The discovery happened through a quality trail they were already following.

---

## Build Phases

**Phase 1 — Credits (minimum viable)**
- Add credits to releases (role + name + optional ABLE handle)
- Peer-confirm flow (notification → one-tap confirm → ✓ applied)
- Verified credits link to Studio profiles if the professional is on ABLE
- Unverified credits show as plain text

**Phase 2 — Studio profile**
- Studio mode toggle (`?mode=studio`)
- Credits auto-populate from verified credits
- Rate card (show/enquire/hide options)
- Availability badge
- "Work with [Name]" contact CTA (email or Calendly)
- Bidirectional toggle with artist profile

**Phase 3 — "People in my world"**
- Artist adds up to 8 people/artists they recommend
- Each listing: name + role + optional ABLE link
- Shown as chips on the artist profile

**Phase 4 — Industry cards**
- "Add team member" in admin → generates minimal industry card
- Professional can claim and edit their card
- Shown in "Team" section on artist profile footer

**Phase 5 — Discovery graph**
- "Also worked on" section on Studio profiles (other ABLE releases)
- "People who made this" summary on release cards (2–3 names)
- Horizontal scroll of artists the professional has worked with

---

## What Good Looks Like

**A UK booking agent discovering a producer they want to work with:**
"I was listening to Florence Road's new EP. Tapped on the credits. Found the producer — Maya Beats. Her profile had 12 records I knew, a day rate I could afford, and she was available. I emailed her that day. We started working the following week."

**A producer building their profile without doing anything extra:**
"I credited myself on 8 releases for artists on ABLE. Each artist confirmed the credits. Now I have a profile with 8 linked releases that I didn't have to build — it built itself. Three enquiries came in from artists who found me through people I'd worked with."

**An artist finding their booking agent:**
"I listed XL Talent on my profile. They claimed the card, added their photo, updated the copy. Now when industry people visit my page and want to book me, they can reach my agent directly without going through my DMs."

---

## Copy Direction for the Professional Discovery System

**For credits section on releases:**
- Header: "Made by" or no header — just names and roles
- No marketing copy around credits — they speak for themselves

**For Studio profiles:**
- Tone: same as artist profiles — first person, honest, specific
- "I make indie records in East London" not "Professional mixing engineer with 10 years experience"
- Rate card label: "Working with me" not "Pricing" not "Services"
- Contact CTA: "Work with [Name]" not "Hire" not "Book now" not "Get a quote"

**For the system overall:**
- ABLE never describes the professional discovery system as a "marketplace" or "platform for freelancers"
- It is: "a credit trail that leads somewhere real"
- The language is about people and music, not services and transactions

---

*Document version 1.0 — 2026-03-13. Research basis: IMDb credit model, SoundBetter/Fiverr analysis (what to avoid), Spotify's "Behind the Song" credits feature, Apple Music credits display, AllMusic/Discogs credits infrastructure, music industry hiring practices (informal network model), graph-based discovery (Dribbble, LinkedIn, Behance), DistroKid/TuneCore ISRC metadata. Additional research in progress.*
