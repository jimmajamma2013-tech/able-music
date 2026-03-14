> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE — Product Hierarchy, Credibility & Light Growth

---

## 1. The Hierarchy — What We're Actually Building

Not everything is equal. If we treat all features as equal we build a confusing product. This is the order of importance:

### Tier 1: The Foundation (non-negotiable, must be perfect)
> An artist joins ABLE because of this. They stay because of this.

1. **The profile page** — the single shareable URL. Fast, mobile-perfect, beautiful, conversion-focused. This IS the product.
2. **Fan email capture** — the most valuable thing ABLE gives an artist. Their owned audience. Algorithm-proof.
3. **CTA conversion** — the whole reason the page exists. One obvious action. No clutter.

Everything else in the product either feeds into this or depends on it working first.

---

### Tier 2: The Dashboard (why they pay)
> An artist upgrades because of this.

4. **Analytics** — who's clicking, where they're coming from, what's working
5. **Fan list / CRM** — their actual fans, not social followers
6. **Profile editing** — snap cards, content, theme, links — fast and intuitive
7. **Connections** — Spotify, Bandsintown, YouTube plugged in, working

---

### Tier 3: Depth (why they stay long-term)
> An artist becomes an advocate because of this.

8. **Superfan system** — knowing who their real fans are
9. **Support packs** — direct fan monetisation without a middleman
10. **Campaign states** — pre-release / release / profile / gig mode
11. **Broadcasts** — direct email to their fan list

---

### Tier 4: Community & Discovery (organic growth)
> Artists refer other artists because of this.

12. **Artists I Recommend** — light, genuine, powerful
13. **Collaboration signals** — who's worth working with
14. **Credits on releases** — the freelancer discovery layer
15. **Rooms / Stage Can** — deeper fan connection (future)

---

### Tier 5: Ecosystem (makes ABLE feel like the centre of an artist's world)
> The reason ABLE becomes indispensable.

16. **Press pack** — one URL for industry
17. **Story mode** — repostable content
18. **Referral programme (Ablers)** — artists make money promoting ABLE
19. **Industry mode** — being found by labels/managers/bookers
20. **Grant & funding discovery** — one place to find money

---

### What this means in practice

When we're deciding what to build or polish next: **work from the top down, not the bottom up.** A beautiful press pack feature means nothing if the fan email capture is broken or the page loads slowly on mobile.

The profile page must be immaculate. The fan capture must feel natural. The CTAs must be obvious. Everything else is secondary.

---

## 2. Collaboration Discovery

*The pain point: artists don't know who to collaborate with.*

The instinct is to build a swipe-right matching app. Don't. That's a separate product, not a feature. The right move: surface just enough signal on an artist's ABLE profile that another artist can make an informed decision — without ABLE feeling like a jobs board.

### Signals that actually matter for collaboration

These are the questions artists ask before collaborating. ABLE can answer most of them without any extra work from the artist:

| Question | Signal | Source |
|---|---|---|
| Are they active? | Last release date, last snap card published | ABLE internal |
| Are they at a similar level? | Spotify monthly listeners | Spotify API (connected) |
| Are they in the same world? | Genre / vibe tag | Wizard step 1 |
| Where are they based? | City (self-reported, city-level only) | Profile field |
| Have they worked with people I know? | Credits on their releases | Credits section |
| Are they credible? | Credits verified, Spotify data connected, events with tickets | See §4 below |
| Do they have a real fanbase? | Fan count (on ABLE), not social followers | ABLE internal |
| Are they open to collaborating? | "Open to collabs" flag (optional, opt-in) | Profile setting |

### How this surfaces on a profile (keep it light)

A small, discreet "collaboration card" visible only to logged-in ABLE artists (not to fans). Shown below the artist's main profile. Not on the fan-facing page.

```
┌─────────────────────────────────────────────┐
│  🎵 Open to collabs                          │
│                                              │
│  Based in:     Manchester                    │
│  Genre:        Indie / Alternative           │
│  Activity:     Released 3 weeks ago          │
│  Listeners:    ~12k/mo  (Spotify)            │
│  On ABLE:      8 months · 340 fans           │
│  Credits:      Mixed by Studio Zero ✓        │
│                                              │
│  [ Send a collab message ]                   │
└─────────────────────────────────────────────┘
```

Collab message goes via ABLE's internal messaging (no email addresses shared until both parties respond). Artist gets a notification. It's then on them to take it off-platform.

### What we explicitly don't show
- Social follower counts (easily faked, not meaningful for collaboration decisions)
- Revenue or sales figures (private)
- Superfan scores of individual fans (private)
- Any metric that could be gamed or that would embarrass smaller artists

### "Open to collabs" flag
- Opt-in, set in dashboard Settings → Collaboration
- Artist can also specify: what kind of collaboration (feature / production / video / photography / sync)
- Off by default — artists choose visibility

---

## 3. Light Organic Growth Mechanisms

"Artists I Recommend" at the bottom of a profile is one of the lightest and most powerful growth mechanics on the platform. Here are others in the same spirit — high value, low effort, never pushy.

### A. The recommendation trail
- Artist A recommends Artist B
- Artist B's profile gets a small "Recommended by [Artist A]" badge
- When Artist B's fans see this, some will click to find Artist A
- Artist A's fans are shown Artist B in their fan dashboard ("Artists [Name] is listening to")
- The graph builds itself. Nobody had to do any marketing.

### B. The collab credit link
- Artist releases a track. Credits: "Produced by Maya Beats"
- Maya Beats has an ABLE profile → the credit is a live link → fans of the track discover Maya
- Maya didn't have to do anything. The release did the work.
- Maya gets a notification: "[Artist] credited you on a release. [View it →]"

### C. The "Also on ABLE" nudge
- When an artist shares their page link, the OG preview (social card) includes "On ABLE"
- Below the fan email capture on the artist's page: a subtle "Powered by ABLE — made for artists" link (free tier only; Pro can remove it)
- This is the Linktree model — every page is an ad for the platform. But it should be tasteful: small, not a badge of shame.

### D. QR code at gigs
- Every artist profile has a QR code
- "Scan to follow" on a backdrop or handout is the single highest-converting offline touchpoint
- Anyone who scans = new fan sign-up = word-of-mouth brought into ABLE

### E. The fan sharing mechanic
- Fan shares an artist's page → they get a shareable URL with their fan ID embedded
- If 3+ new fans sign up via their share → they get an "Amplifier" badge on their fan profile
- Artist can see: "Top 5 fans who brought you new fans this month"
- This is viral by design. Fans compete to be the best amplifier. Artists reward them.

### F. The collab snap card
- Two ABLE artists release something together
- One-click "Add collaborator" on the snap card → both profiles are linked
- The card appears on both artists' profiles
- Both fan lists get notified
- This is one piece of content reaching two audiences — the most efficient growth moment on the platform

### G. The press pack link
- Artist puts `able.fm/name/press` in their email signature and Linktree
- Industry people open it → they discover ABLE → some are artists or managers → they join
- The press pack is a growth tool disguised as a professional asset

### H. The "Join [Artist]'s room" share
- Artist posts a dispatch in their Room → gets a shareable card
- Card: artist photo + "[Artist] posted something" → links to room (requires sign-up to read)
- Gate the content just enough to make sign-up feel worthwhile, not frustrating

---

## 4. The Recommendation Message — Getting It Right

When Artist A recommends Artist B on their profile, Artist B should feel *good* about it, not spammed.

### What Artist B receives

**In their ABLE dashboard** (notification):
> **[Artist A] added you to their "Artists I'm Digging" section.**
> Your profile is now featured on their page. Their fans may discover you.
> [View their profile →] [See where you appear →]

**If they're not on ABLE yet** (email to whatever address is publicly known, or a "mention" notification if they've connected social):
> Subject: [Artist A] is recommending you on ABLE
>
> "[Artist A] added you to the "Artists I'm Digging" section of their ABLE profile. Their fans can now find you from their page.
>
> ABLE is where independent artists put their music, shows, and fan sign-ups in one place. If you're not on ABLE yet, claim your page and the recommendation will link directly to your profile.
>
> [Claim able.fm/yourname →]"

### The tone rules
- Never: "You've been added! Join now!" — too pushy
- Never: "Artist A follows you on ABLE!" — misleading, it's a recommendation not a follow
- Always: Frame it as recognition, not a sign-up pitch
- The recommendation should feel like a warm introduction, not a notification

### What happens to the recommendation if Artist B joins
- The credit retroactively links to their profile — no action needed from Artist A
- Artist B gets a "Recommendation from [Artist A]" badge on their profile (they can choose to show or hide it)

---

## 5. Credits — Simple Validation

The problem: anyone can claim they produced a Beyoncé album. Credits need to feel credible without turning into a bureaucratic verification system.

### The spectrum of credit trust

```
Unverified (self-added)  →  Peer-confirmed  →  Metadata-verified
       ○────────────────────────●───────────────────────●
   "I worked on this"    "They confirm it"      "Spotify/distributor
                                                  agrees"
```

### How each works

**Unverified (default)**
- Artist adds: "Produced by Maya Beats" → links to Maya's ABLE profile (if they have one) or a plain URL
- Displayed as a credit, no tick mark
- No friction for the artist adding it. No friction for the person credited.

**Peer-confirmed**
- Maya Beats (if on ABLE) gets a notification: "[Artist] has credited you as producer on [Track Name]. Confirm this?"
- [Confirm] or [Not me / incorrect]
- If confirmed → credit gets a small ✓ mark ("Credit confirmed by Maya Beats")
- If denied → credit is removed automatically
- This is dead simple. One notification, one tap. No admin.

**Metadata-verified**
- When an artist connects DistroKid, TuneCore, or similar → ABLE can read the ISRC/metadata for their releases
- If the metadata includes credits (not all distributors support this, but DistroKid does) → credits auto-populate and are marked as "from distributor metadata"
- This is the gold standard. No manual input. No gaming.

**Spotify-verified (future)**
- Spotify's Credits Hub (launched 2022, still expanding) allows credited contributors to claim tracks
- If a producer is on Spotify Credits Hub → ABLE can surface a "Spotify verified credit" link
- This is a future integration — the API isn't fully open yet

### What the credit looks like in practice (fan-facing, collapsed by default)

```
[TRACK ARTWORK]  "Dissolve" — New Single
                  Out now on all platforms

                  ↓ Credits
                  Written by: James Cuthbert
                  Produced by: Maya Beats ✓  →  able.fm/mayabeats
                  Mixed by: Studio Zero      →  studiozero.co.uk
                  Photography: Lens Noir ✓   →  able.fm/lensnoir
```

Small, clean, collapsed. A fan who cares will look. Most won't. That's correct.

---

## 6. What Gives ABLE Credibility — Non-Fake Things

The platform needs to feel real from day one, even before it has scale. Fake social proof is corrosive. These are the things that give ABLE genuine credibility:

### A. Honest metrics
- Never show follower counts that look inflated
- "Fan sign-ups" not "followers" — the language is precise and honest
- Artists can see their *own* data; nothing is hidden or massaged
- Fan count on a profile is only shown if the artist opts in, and it's the real number

### B. Real integrations
- Spotify monthly listeners pulled live from Spotify API (not self-reported)
- Bandsintown events pulled live (not manually entered by artist)
- If the integration is broken, show nothing — don't show stale data
- "Connected via Spotify" with a timestamp is more credible than any badge

### C. Verified credits
- The ✓ mark on credits only appears after peer-confirmation or distributor metadata
- Never add a ✓ automatically. Never sell verification. Never gamify it.

### D. Industry recognition
Early credibility signals to actively pursue:
- **Music Week** — the UK trade publication that matters most to industry professionals
- **DIY Magazine / Loud And Quiet** — read by indie artists and their fans
- **Hypebot / Music Business Worldwide** — the tech/business music press
- **SXSW / The Great Escape / Liverpool Sound City** — have an ABLE presence at these
- **Help Musicians UK** — an official partnership with them is an immediate trust signal for UK artists
- **Featured artist coalition (FAC)** — the artists' rights body; partnership = credibility with serious artists

### E. Data portability (trust through openness)
- "Your data is yours. Export your full fan list as CSV at any time."
- No lock-in. Artists who feel trapped eventually leave and warn others. Artists who feel free stay voluntarily.
- This should be visible on the ABLE homepage — it's a differentiator and a trust signal.

### F. Artist testimonials (the right kind)
Not: "ABLE changed my career!" quote next to a stock photo.

Instead:
- Real artists with their real profile photos, real ABLE pages linked
- Specific, honest quotes: "I got 40 fan sign-ups the week I put my ABLE link in my IG bio" — [Name], folk artist, Bristol
- Short video testimonials (30 seconds, shot on phone, unpolished) from artists who genuinely use it
- The rawness of the testimonial is itself credibility — it's not a corporate production

### G. The ABLE public roadmap
- A simple public roadmap page: "Here's what we're building, here's what we shipped"
- Artists who can see the product being built in public trust the people building it
- Monthly changelog: small, honest, specific. "We fixed the tab bar on iOS 16. We added Bandsintown sync."
- This is what Notion, Linear, and the best indie SaaS tools do. It builds loyalty.

### H. No fake numbers anywhere
- No "10,000+ artists" until it's true
- No "Join the community" if the community is 50 people
- Better: "In early access. Join the first 500 artists." — honest, and creates FOMO without lying
- The early access model is itself a trust signal: ABLE is being selective, not desperate

### I. The founder's face
- The founding story told honestly on the about page — why this, why now, who it's for
- A real person who cares about music is more credible than a brand
- "ABLE was built because artists deserve better than a link dump" — a sentence like this, with a real name and face behind it, is worth more than any logo badge

---

## 7. The Single Most Important Thing

If ABLE does one thing well above all else — and does it visibly, consistently, and honestly — let it be this:

> **Every artist on ABLE owns their fan data. Every fan list is exportable. No lock-in. Ever.**

This is the thing that no other platform guarantees cleanly. It's the thing that will make music industry journalists write about ABLE. It's the thing that turns a cautious artist into an advocate.

Build it into the product. Build it into the homepage. Say it simply. Mean it completely.

---

*Document created: 2026-03-13. Companion to PLATFORM_STRATEGY.md, DISCOVERY_AND_GROWTH.md, ECOSYSTEM_AND_PARTNERSHIPS.md.*
