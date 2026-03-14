> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE — Discovery, Growth & Ecosystem

## The Core Tension

ABLE is not a social network. But artists don't exist in isolation. The challenge: build discovery and growth mechanics that feel like they belong on a premium artist tool — not a gamified content farm. Every feature here should feel *earned*, not noisy.

---

## 1. Directory & Discovery

### Artist Directory
- Browse by genre, location, mood, vibe preset
- Search by name, tag, or "sounds like" (future: Spotify audio features)
- Opt-in only — artists choose whether they appear
- Default: visible. Artist can set private (Pro feature or always free?)

### Fan-Facing Discovery
- "Artists near you" — geo-based, within 30mi / 50km by default
- "New to ABLE" — recently verified artists, sorted by activity
- "Trending in your area" — based on fan sign-ups + engagement velocity
- "If you follow X, you might like Y" — collab graph + Artists I'm Digging links

### Tasteful Leaderboards
Done wrong: Twitch-style follower vanity metrics.
Done right: a reflection of community depth, not size.

**Fan leaderboards (per-artist, opt-in):**
- Top 10 supporters (superfan level, not spend amount)
- Longest-standing fans (join date)
- Top sharers (drove the most sign-ups via their share link)
- Display: first name + avatar initial only. No full names without consent.
- Artist can feature a "fan of the month" — manually pinned

**Artist leaderboards (ABLE-wide, opt-in):**
- Rising artists this week (velocity: new fans ÷ baseline)
- Most active in [genre]
- Most-supported (by number of support pack buyers, not revenue)
- Filter by: genre, location, tier
- Never show raw revenue or follower counts — always relative/velocity metrics

**Why velocity not size:** A 200-fan artist who gained 40 fans this week is more interesting than a 10k-fan artist who gained 5. ABLE should surface momentum, not incumbency.

---

## 2. Globe Heatmap

A visualisation of where ABLE artists and their fans are in the world.

### Artist-facing
- "Your fans" tab: globe or map showing where their email sign-ups are from (IP-based, approximate)
- Zoom to city level (artist Pro only)
- Filter by: all time / last 30 days / last campaign
- "You have fans in 12 cities. Book there." — actionable nudge

### ABLE-wide (public, opt-in)
- Homepage feature: real-time globe showing artist activity
- Artists appear as nodes, fan clusters as heat areas
- Artists opt in to appear on the public globe
- Could be a powerful story for the ABLE landing page — shows the platform is alive

### Technical note
- Use D3 / Globe.gl / Three.js globe
- Fan location from sign-up IP or optional city field
- Privacy: never show individual fan locations. Only aggregated heatmap.

---

## 3. Social Media Facilitation

### The Reality Check
ABLE cannot post to Instagram, TikTok, or Facebook on the artist's behalf without OAuth + their business account credentials. Most artists won't do this. But ABLE can make sharing *feel* native.

### What ABLE can do today
- **Shareable cards** — auto-generated OG image per artist page (name + photo + accent colour + "able.fm/name")
- **Pre-made caption library** — per section: new music, new show, merch drop, fan sign-up ask
- **Story-ready assets** — 1080×1920 portrait card with artist photo + CTA text, downloadable as PNG
- **Reel repost prompt** — "Your latest Spotify release is out. Here's a caption + link for your reel."
- **Link in bio smart** — "Put able.fm/name in your IG bio" with one-tap copy

### ABLE as IG Ad Landing Page
- Artists running paid campaigns on Meta point to `able.fm/name`
- ABLE page is already mobile-optimised, fast-loading, conversion-focused — better than Linktree for this
- Feature: "Campaign mode" — when a paid traffic source is detected (UTM `utm_source=ig_ad`), the hero CTA is foregrounded even more, the fan sign-up floats higher
- Future: ABLE-run ad campaigns where ABLE promotes vetted artists as a platform feature (like Spotify's "Off the Record" or Apple Music's "Up Next")

### IG Stories Integration
- "Story card" — artist generates a 9:16 card with their page + Swipe Up / Link sticker placeholder
- ABLE supplies the PNG; artist uploads manually to Stories
- Future: if Meta opens their Stories API further, automate this

### Artist reposting reels
- "Collab repost" — if artist A and artist B are both on ABLE and have collaborated (a snap card links to both), a one-click button generates a joint reel caption + tag suggestion
- Artist dashboard "Amplify" panel: suggested content moments this week ("You released 3 days ago — this is the optimal repost window")

---

## 4. Launch Squad

Inspired by Taylor Swift's superfan mobilisation — where inner circle fans are briefed before a release to amplify at the exact right moment.

### The ABLE version
- Artist creates a "Launch Squad" from their superfans (top tier fans, manually selected or auto-suggested)
- Squad members get an early notification: "You're in [Artist]'s launch squad for [Release Name]. Here's what to do on [date]."
- Squad gets: early listen link, shareable card pack, suggested captions per platform, countdown reminder
- On release day: one-tap action options (stream it, share the card, repost the reel, leave a comment)
- Artist can see squad activity: who shared, when, what drove

### Fan motivation
- Squad members get: Launch Squad badge on their fan profile, first listen credit, "Helped launch [release]" on their profile
- Artists can add a thank-you card inside the support pack or a personal voice note for squad members
- This is the closest thing to a genuine fan community moment — not algorithmic, not transactional

### BandLab-style teams
- Light version: artist creates a team (e.g. "The Locals" — fans in their city)
- Fans join the team, get a team badge
- Artist can send team-specific communications, exclusive early access
- Teams are not public social groups — they're private fan circles. More intimate.

---

## 5. Freelancer Profiles

Musicians are not the only users ABLE could serve. Their ecosystem includes:

- **Producers** — beat makers, session producers
- **Mixing engineers**
- **Mastering engineers**
- **Videographers**
- **Photographers**
- **Graphic designers** (cover art, merch)
- **Booking agents** (small/independent)
- **Music lawyers / sync agents**
- **Social media managers for artists**

### Freelancer profile differences from Artist profile
- **Credits section** instead of discography — "I worked on these releases"
- **Rate card** — hourly, per-track, or per-project (ranges, not exact)
- **Availability status** — taking on work / limited / not available
- **Portfolio samples** — audio previews (SoundCloud embed or native), video reel embed
- **Contact / Book** CTA — replaces "Buy tickets"; goes to enquiry form
- **Specialisms** — tags: mixing, mastering, trap, folk, orchestral, etc.
- No fan sign-up / superfan system (not relevant)

### Discovery angle: Credits as freelancer referral
When an artist adds a snap card for a release and tags a collaborator — "Mixed by [Name]" — that name links to the freelancer's ABLE profile (if they have one) or a mailto/IG link (if they don't).

This creates:
1. An organic referral path: fan sees the mastering engineer credit → clicks → finds their profile → books them
2. A growth mechanic: freelancers join ABLE because artists are already crediting them
3. A professional discovery layer inside a fan-facing tool — subtle, opt-in, not shoved in the fan's face

### Credits as a design element on snap cards
```
[SINGLE ARTWORK]
"ABLE" — New Single
Out now on all platforms

— — — — — — — — —
Written by: J. Doe
Produced by: Maya Beats  → (links to able.fm/mayabeats)
Mixed by: Studio Zero    → (links to their site if no ABLE profile)
```

Credits are collapsed by default ("See credits ↓") — fan-facing they're discoverable but not distracting.

---

## 6. Artist-to-Artist Recommendations

This is one of the most high-value and understated features.

### "Artists I'm Digging"
- Artist adds up to 5 other artists they're recommending (ABLE users get a link badge; non-ABLE get a plain link)
- Appears on their profile page as a discreet section: "[Artist Name] is currently into:"
- Each recommendation: avatar + name + one-line "why" (optional, artist-written)
- When artist A recommends artist B → artist B gets a notification
- Artist B's page shows a badge: "Recommended by [Artist A]"

### Cross-fan discovery
- A fan of artist A who clicks artist B's recommendation and signs up → tagged in artist B's fan list as "Referred by [Artist A]"
- Artist B can see: "3 of your new fans came from [Artist A]'s recommendation"
- This creates a measurable discovery graph

### Collab announcements
- If two ABLE artists release a collab, both profiles update simultaneously
- Both fan lists receive the announcement
- A "collab page" is generated: both artists, the track, CTAs for both
- This is one-click on the dashboard: "Add collaborator" → find their ABLE page → done

### The etiquette rule
- Recommendations should feel like genuine endorsements, not follow-for-follow
- ABLE copy: "Who are you listening to right now?" not "Recommend artists"
- Limit 5 recommendations max to prevent it becoming a link farm

---

## 7. QR Code (Physical Growth)

Every artist gets a custom QR code:
- Matches their accent colour
- Links to their ABLE profile
- Can be printed on: merch, stage backdrop, flyer, handout, set list
- "Scan to follow" at gigs is the single highest-converting offline touchpoint
- Artist Pro: animated QR (for screens / stories)

The QR code is available in the dashboard → Share section as SVG + PNG download.

---

## 8. What We Are NOT Doing (Anti-Pattern List)

| Anti-pattern | Why |
|---|---|
| Follower counts | Vanity metric. Encourages gaming. |
| Viral challenges | Off-brand. Platforms that rely on these feel cheap. |
| Algorithmic content feed | ABLE is not TikTok. It's a tool, not a feed. |
| Paid promotions inside fan feed | Breaks trust. Artists are not advertisers. |
| Fan-to-fan messaging | Too much infra, opens abuse vectors. Not our lane. |
| Artist ranking by revenue | Alienating to new/small artists. |
| Forced mutual follows | Feels transactional. Kills authenticity. |

---

## 9. Organic Growth Loop (Summary)

```
Artist joins ABLE
    ↓
Artist page created + QR code generated
    ↓
Artist shares: IG bio link, stories card, reel caption
    ↓
Fan signs up via link / QR / recommendation
    ↓
Fan sees "Artists near you" → discovers more ABLE artists
    ↓
Artist A recommends Artist B → Artist B notified → joins
    ↓
Artist credits freelancer → freelancer gets referred sign-ups
    ↓
Release launches with squad mobilisation → earned media spike
    ↓
ABLE surfaces rising artist on globe / directory → more fans
```

The loop compounds: every artist brings fans, fans discover more artists, artists recommend each other, freelancers join because they're credited. Growth is earned, not bought.

---

## 10. Premium Tier Placement

| Feature | Free | Artist | Artist Pro | Label |
|---|---|---|---|---|
| Directory listing | ✓ | ✓ | ✓ | ✓ |
| QR code | Basic | Custom colour | Animated | All |
| Globe heatmap | — | City-level | Full | Aggregate |
| Launch Squad | — | ✓ | ✓ | ✓ |
| Artist recommendations | 2 | 5 | 5 | 10/artist |
| Campaign mode (UTM) | — | — | ✓ | ✓ |
| Social card generator | Basic | Full | Full | Branded |
| Freelancer profile | ✓ (basic) | ✓ | ✓ (rate card) | — |
| Credits on snap cards | ✓ | ✓ | ✓ | ✓ |
| Fan leaderboard | — | ✓ | ✓ | ✓ |

---

*Document created: 2026-03-13. Living doc — add to this as new ideas emerge.*
