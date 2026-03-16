> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE — Ecosystem, Partnerships & Future Capabilities

*ABLE = Artist Before Label. Independent artists first. But independence doesn't mean alone.*

---

## Guiding Principle

Every feature in this document should pass the following test:

> **Does this make an artist's page more valuable, or their career easier to navigate, without adding cognitive load?**

If yes: build it, surface it, or link to it.
If no: cut it.

The risk here is feature sprawl. ABLE should feel like a great Swiss Army knife — not a hardware store. The answer to "should we do X?" is often: "Can we integrate a company that already does X brilliantly?" If yes, integrate. Don't rebuild.

---

## 1. The ABLE Referral Programme ("Ablers")

### The Concept
Artists, influencers, music fans, and music-adjacent creators who genuinely believe in ABLE become **Ablers** — a referral and affiliate layer that turns word-of-mouth into real income.

### How it works
- Every artist (and approved Abler) gets a unique referral code: `ablemusic.co/ref/[code]`
- When someone signs up via that link and becomes a paid subscriber → the Abler earns a recurring commission (e.g. 20–30% of monthly fee for 12 months)
- Dashboard: Ablers see clicks, conversions, earnings, pending payouts
- Payout: Stripe Connect or PayPal, monthly, minimum £20 threshold

### Tiers of Ablers
| Tier | Qualification | Commission |
|---|---|---|
| Fan Abler | Any signed-up ABLE artist | 20% for 6 months |
| Creator Abler | 100+ referrals or 10k+ social reach | 25% for 12 months |
| Partner Abler | Approved influencer, blog, music school | 30% for 12 months + co-marketing |

### Who are natural Ablers?
- Music YouTubers / TikTok educators ("music biz tip" content)
- Music production schools and tutors
- Independent music blogs
- Music venue social accounts
- Artist managers with small rosters who recommend to all their acts
- Musicians with big social followings who don't need Artist Pro themselves but can refer others

### The social angle
- Ablers get a pre-made "Why I use ABLE" short-form video template (their page rotating through sections, overlaid with captions)
- Shareable card: "I'm on ABLE — join me at ablemusic.co/ref/[code]"
- ABLE can co-post top-performing Abler content on the ABLE social accounts

### Influencer company partnerships
Rather than building an influencer network from scratch, partner with:
- **Matchmade** — influencer marketplace with music vertical
- **Kolsquare** — EU-focused influencer platform
- **Musosoup** — UK music promotion platform, already artist-focused
- **Groover** — music submission platform (Spotify curators, playlist owners, blogs), EU-based

These companies have reach into the exact music creator audience ABLE needs. The pitch: their users need a better link-in-bio. Co-marketed affiliate code.

---

## 2. Playlist Pushers & Music Promotion Integrations

ABLE should not be a playlist pitcher. But it can be the gateway to trusted ones.

### SubmitHub Model
SubmitHub lets artists pay to submit music to curators (blogs, playlists, influencers). ABLE doesn't need to replicate this. But:

**Option A: Native integration**
- "Promote your release" button in the artist dashboard
- Opens a modal: choose which track → ABLE pre-fills the form for partner platforms
- Artist picks: SubmitHub / Groover / Musosoup / Playlist Push
- Affiliate revenue for ABLE per conversion (these platforms run affiliate programmes)
- Artist never leaves ABLE — iframe or redirect with UTM

**Option B: Snap card type: "Pitch to playlists"**
- On the release snap card, a secondary CTA: "Want this on more playlists?" → links to ABLE's curated partner list
- Low friction. Artist doesn't have to do anything unless they want to.

### Playlist pitching partners to integrate
| Company | What they do | Integration type |
|---|---|---|
| SubmitHub | Pay-per-submission to blogs/playlists | Affiliate link + pre-fill |
| Groover | EU-focused curator submissions | Affiliate link + pre-fill |
| Playlist Push | Spotify playlist pitching | Affiliate link |
| Musosoup | UK-focused, no upfront cost model | Partner co-marketing |
| Daily Playlists | Free Spotify pitching | Affiliate |
| Songtrust | Royalty collection / publishing | Affiliate + admin |

### Spotify for Artists integration
- "Connect Spotify" pulls in: latest release, monthly listeners, top tracks, Spotify pre-save capability
- This is already available via Spotify Web API (no special approval needed for basic data)
- Pre-save CTA: artist sets a release date → ABLE generates a `sptfy.com/presave` style link (or uses Toneden / Hypeddit as backend)

---

## 3. Rooms — Live Artist Spaces

### The Concept
A lightweight, async-first "room" where artists can host their community. Not a full live-streaming platform. Think Clubhouse meets Patreon community meets Discord — but minimal.

### What a Room is
- A space attached to an artist's ABLE profile (optional, opt-in, Pro feature)
- Fans join the room (separate from email sign-up — deeper commitment)
- Artist can post: voice notes, text updates, photos — "dispatches"
- Fans can react + reply (text only — no toxic reply chains, curated comment model)
- Fan-to-artist tips are enabled in rooms (artist sets a Stripe/PayPal link)
- Room is private: only fans who've joined (email sign-up is the floor — fan must have signed up first)

### Tipping mechanics
- Fan sends a tip (£1–£50) with an optional message
- Artist sees tips in their dashboard
- Optional: artist reads tip messages during a live dispatch (like a radio call-in)
- "Stage can" — the name for the tipping interface inside a room (hat tip to the user's phrasing — perfect)

### Rooms for early-career artists
- "Stage can" is particularly powerful for artists at the beginning of their journey
- Fans who discover them early are often the most committed
- A room creates a sense of "I was there from the start"
- ABLE could surface "New artist rooms" — artists under 6 months on the platform, under 500 fans — as a discovery feature for fans who want to find someone before everyone else does

### AI in Rooms (near-term possibility)
- **Voice note transcription** — artist records a voice note; AI auto-transcribes + suggests a written summary for fans who prefer to read
- **Tone coach** — "Your last 3 dispatches were quite formal. Want to try something more personal?"
- **Room starter prompts** — AI suggests what to post this week based on: upcoming show, recent release, fan engagement patterns

### Future: AI co-host (Claude / OpenClaw / similar)
- An AI that knows the artist's profile, their releases, their upcoming shows, their fan list
- Can answer fan questions in the room on the artist's behalf (pre-approved topics: tour dates, how to get the support pack, etc.)
- Never impersonates the artist — clearly labelled as ABLE assistant
- This is the "AI agent for artists" vision: the artist doesn't have to be present 24/7 but the room stays alive
- **Readiness: 12–18 months out** — needs agent infrastructure, context window management per artist, safety review. But design for it now so the architecture supports it.

---

## 4. Press Pack Generator

### The Problem
Artists need a press pack to get reviewed, featured, booked. Most artists have never made one. Most press packs are static Word docs or generic EPK sites.

### ABLE's version
A press pack is a public, beautifully designed URL generated from the artist's profile data. No extra work for the artist.

**What's auto-populated:**
- Artist photo (hero from their profile)
- Bio (from their profile bio field)
- Genre + vibe
- Latest release (title, artwork, stream link)
- Top tracks (from Spotify connection)
- Upcoming shows (from their events section)
- Contact / booking CTA
- Social links
- Press quotes (artist adds these manually if they have them)
- Achievements / stats (monthly listeners, fan count, etc.)

**The design:**
- `ablemusic.co/name/press` — a separate view of the same profile data
- Lazy scroll: full-bleed sections, each one a "chapter"
- Much more editorial than the fan-facing profile — full-width photos, large type, white space
- Animated: Apple Memories-style scroll — as you scroll, elements appear, music snippets play (with controls)
- Print-ready: a "Download PDF" button generates a clean 2-page PDF version

**Artist Pro only.** Free artists get a locked preview with an upgrade prompt.

---

## 5. Story Mode — "Apple Memories for Artists"

### The Concept
A "Story" is an auto-generated video/slideshow created from the artist's ABLE data — designed to be downloaded and reposted directly to Instagram, TikTok, YouTube Shorts.

### What goes in
- Artist photo
- Latest track artwork + title
- A 30-second snippet of the track (Spotify preview URL — already public)
- Upcoming show date + venue
- A pull quote from the bio or a lyric the artist has flagged
- Fan count / growth stat ("Join 423 fans →")

### How it works
1. Artist visits dashboard → "Generate Story"
2. ABLE assembles assets automatically from their profile
3. Artist selects a Story style: Cinematic / Minimal / Bold / Warm (maps to their vibe preset)
4. Preview plays in the dashboard
5. Artist downloads as MP4 (1080×1920) or exports to Stories (if Meta API allows)
6. Caption is pre-generated: "New music is out. Come find me. [link]"

### Technical feasibility
- **Client-side canvas** (short term): use `<canvas>` + Web Animations API to composite layers; `MediaRecorder` to capture as video. Works in-browser without a server.
- **Server-side rendering** (medium term): FFmpeg on a serverless function (Vercel/Netlify), returns a downloadable MP4. Higher quality, more animation options.
- **External API** (fast path): Creatomate, Shotstack, or Bannerbear — all have APIs for video generation from templates. Cost: $0.01–$0.10 per render. A Pro feature at this cost makes commercial sense.

**Recommendation: Start with Bannerbear or Creatomate integration** — they have music-adjacent templates, JSON-driven, can be set up in a day. Build native later.

---

## 6. Music Map & Discovery

### The Concept
A map of artists on ABLE by location. Fans can find artists local to them. Artists can discover who else is in their scene.

### Fan use case
- "Show me indie artists in Bristol" → map + list view
- Artist cards on the map: photo, genre chip, follower count, "Follow" CTA
- Filter: genre, tier (all tiers visible), "playing near me soon" (syncs with events)

### Artist use case
- "Who's in my scene?" — artist can see other ABLE artists in their city
- Collaboration discovery: "This artist is also acoustic/folk/electronic and is 10 miles away"
- ABLE facilitated collab intro: artist can send a "collab request" message through ABLE (no direct contact shared until both accept)

### Spotify Serendipity (Music Map variant)
- "Sounds like" discovery: artist pastes a Spotify artist URL → ABLE fetches their genre tags + related artists via Spotify API → surfaces other ABLE artists with similar genre tags
- This is a 1-day build using the Spotify `related-artists` endpoint
- Shown as: "Artists on ABLE who sound like [X]" with a carousel

### Technical notes
- Artist location: stored from wizard (city field) or IP on sign-up
- Map: Mapbox GL JS (free tier: 50k map loads/month) or Leaflet (fully open source)
- Privacy: city-level only, never exact address

---

## 7. Industry Connections — Labels, Managers, A&R

*ABLE = Artist Before Label. But "before" doesn't mean "against."*

### The Direction
ABLE is for independent artists. But many of them want to be found by a label or manager. Some already have one. ABLE should help both directions.

### What ABLE offers the industry
- A verified, curated profile with actual fan data (not inflated social metrics)
- Real engagement: email sign-up rate, CTA click rate, support pack buyers
- "Interesting to A&R" signal: an artist with 400 genuine fans who all bought a support pack is more interesting than one with 40k followers who don't engage

### The "Industry Mode" idea
- Artists can opt in to an "Interested in representation" flag on their profile
- This doesn't appear on the fan-facing page — only visible to verified industry accounts
- Industry accounts (labels, managers, booking agents, sync agents) get a "Discovery" dashboard: filter by genre, location, fan count, engagement rate, "interested in representation" flag
- Industry pays for this access (a separate tier or add-on)

### Partner integrations
| Company | What they do | Integration |
|---|---|---|
| Sentric Music | Independent publishing admin | "Register your songs" CTA in ABLE dashboard |
| Songtrust | Global royalty collection | Affiliate link + onboarding flow |
| Music Gateway | Sync licensing marketplace | "Get your music in TV/film" CTA |
| Featured.fm | Spotify algorithm promotion | Affiliate integration |
| AWAL / Amuse / DistroKid | Distribution | "Distribute this release" CTA on snap cards |
| Pirate Studios | Rehearsal/recording studios | "Book a studio near you" (geo-aware) |

### A page of ABLE recommends
A curated page (`ablemusic.co/partners`) that lists ABLE-vetted industry tools, services, and platforms. Honest, selective, not a link farm.

Categories:
- Distribution (DistroKid, TuneCore, AWAL)
- Publishing (Songtrust, Sentric)
- Promotion (Groover, SubmitHub, Musosoup)
- Recording (Pirate Studios, Splice)
- Education (Berklee Online, Coursera music courses)
- Legal (BASCA / Ivors Academy resources, music law explainers)
- Funding (see Grants & Kickstarter below)

This page earns affiliate revenue for ABLE and genuinely helps artists navigate the industry. Updated quarterly. Never stale.

---

## 8. Funding & Crowdfunding — Kickstarter, Grants

### The Problem
Artists need money to record, tour, press vinyl, make videos. Most don't know where to look.

### What ABLE can do
**Low effort, high value: a snap card type**
- "Fund this project" snap card → links to their Kickstarter / Indiegogo / PledgeMusic / PayPal fundraiser
- Artist enters: project name, goal amount, deadline, link
- Card shows: progress bar (if they paste the current amount), goal, CTA

**Medium effort: grant discovery**
- A curated, maintained list of grants open to independent artists (UK: Arts Council England, Creative Scotland, Help Musicians UK; US: ASCAP Foundation, Grammy Foundation)
- Filterable by: country, genre, amount, deadline
- "Apply for funding" section in the artist dashboard (Pro only)
- This is essentially a curated database. Could partner with a company like **Pilar** (grant research tool for artists) rather than maintaining it ourselves.

**Future: ABLE Community Fund**
- ABLE takes a small % of tip/support pack revenue (e.g. 3%)
- Pooled into a community fund
- Quarterly: community votes on which ABLE artist gets a grant from the fund
- Creates a news story, creates community engagement, costs ABLE very little

---

## 9. Charities & Social Impact

### The Concept
Artists care about causes. Fans respond to artists who stand for something. ABLE can make charity tie-ins effortless.

### "Support a cause" snap card
- Artist adds a cause to their profile
- Snap card: "I'm supporting [Charity Name] — every tip this month goes to them"
- Artist connects their PayPal/Stripe → charity donation % is configurable (10%, 50%, 100%)
- ABLE handles the split (via Stripe Connect) and sends a receipt to the fan + confirmation to the artist

### Charity partners to approach
- **War Child UK** — music industry charity for children affected by war
- **Help Musicians UK** — direct support for musicians in financial difficulty
- **The Ivors Academy** — music creators' rights
- **Choose Love** — refugee support, many music artists already involved
- **Global Music Vault** — music preservation
- **EarthPercent** — climate charity co-founded by Brian Eno, music-industry focused

ABLE could offer these charities a white-glove experience: "ABLE artists raised £X for [Charity] this month" — co-marketing for both sides.

---

## 10. Agent-Powered Growth Tools (The Future Layer)

### What's possible now vs. what's coming

| Tool | Now | With agents (12–24 months) |
|---|---|---|
| Bio writing | Claude API prompt → 3 suggestions | Agent reads Spotify discography + recent posts → writes in artist's voice |
| Caption generator | Template-based suggestions | Agent monitors release performance, generates platform-specific captions at optimal post times |
| Playlist pitching | Affiliate link to SubmitHub | Agent auto-prepares pitch email with track data, target curator list, personalised intro |
| Fan re-engagement | "Draft a re-engagement email" prompt | Agent identifies cold fans, writes personalised subject lines, schedules send |
| Release campaign planner | Static template | Agent ingests release date → builds full 6-week content calendar, creates snap cards, sets CTA modes |
| Press outreach | Download press pack PDF | Agent identifies relevant blogs/playlists from genre data, drafts personalised pitch emails |
| A&R targeting | "Interested in representation" flag | Agent researches labels signing similar artists, drafts cold outreach with data-backed case |

### OpenClaw / Claude API / Agent SDK
- Claude API is the backbone for all copy generation features (bio, captions, cards)
- The Agent SDK enables multi-step autonomous tasks: "run a release campaign" → agent handles all steps
- Start simple: single Claude API calls for text generation (cheap, fast, no infrastructure)
- Grow into: agents with tool access (read their Spotify data, check their ABLE fan list, draft and queue emails)
- The artist's profile + fan data is the context window. The richer the data in ABLE, the more useful the agent.

### What to build first (low hanging fruit)
1. **Bio writer** — 1 API call, massive perceived value, almost zero cost
2. **Caption pack on publish** — when artist publishes a snap card, instantly generate 3 social captions
3. **Re-engagement email draft** — "You have 40 fans who haven't engaged in 60 days. Want to send them something?" → one-click draft
4. **Release campaign calendar** — artist enters release date → 6-week plan as a checklist in their dashboard

---

## 11. Low Hanging Fruit — Build This First

Not all of the above is for v1. Here's the priority filter:

### Build now (no external dependency, high value)
- [ ] Referral codes + Abler dashboard (Stripe affiliate tracking)
- [ ] Press pack URL (`ablemusic.co/name/press`) — pulls existing profile data, new layout
- [ ] "Promote this release" section — curated links to SubmitHub, Groover, Playlist Push (affiliate)
- [ ] Bio writer + caption generator (Claude API, 2 prompts)
- [ ] "Support a cause" snap card type
- [ ] "Fund this project" snap card type (Kickstarter/crowdfunding link)
- [ ] ABLE Recommends page (static, curated, no backend)

### Build next (requires one integration)
- [ ] Rooms — lightweight artist dispatch + fan reactions + Stage Can tips (Stripe)
- [ ] Story Mode — via Creatomate/Bannerbear API
- [ ] Music Map — Leaflet + city data already in artist profiles
- [ ] Spotify "Sounds like" discovery — Spotify related-artists API

### Build later (requires infrastructure or partners)
- [ ] Agent-powered release campaign planner
- [ ] Industry Mode discovery dashboard
- [ ] ABLE Community Fund
- [ ] Grant discovery database (or Pilar integration)
- [ ] Launch Squad with squad-specific communication layer

---

## 12. The North Star

ABLE is building towards a world where an independent artist can:

1. Set up their profile in 90 seconds
2. Have a page that already feels like them
3. Capture every fan who finds them
4. Mobilise their superfans for a release
5. Get their music on playlists without paying a middleman
6. Fund their next record through their own community
7. Get found by a manager or label when they're ready
8. Never need to pay for a PR company, EPK designer, or marketing agency

And do all of it from one dashboard, without needing to know what any of it is called.

**That's what "Artist Before Label" actually means.**

---

*Document created: 2026-03-13. Companion to PLATFORM_STRATEGY.md and DISCOVERY_AND_GROWTH.md.*
