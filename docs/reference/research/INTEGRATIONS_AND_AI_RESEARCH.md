> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE — Integrations, Tools Landscape & AI Research
**Compiled: 2026-03-13 | Purpose: Map every tool independent artists use, prioritise integrations, and assess AI music capabilities**

---

## How to use this document

This doc answers three questions:
1. **What tools do independent artists use?** — full taxonomy, 20 categories
2. **What should ABLE integrate vs. link-paste vs. own natively?** — prioritised matrix
3. **What AI music/audio tools exist and what can ABLE realistically do with them?** — honest, no hype

---

## Part 1 — The 10 Universal Tools (Every Artist, Every Genre)

These are the non-negotiable integration targets. An artist releasing their first single and one with 50k monthly listeners both use all of these. ABLE should have a first-class story for each.

| # | Tool | Why universal | ABLE priority |
|---|---|---|---|
| 1 | **Spotify** | Default streaming destination; every artist links to it | API integration — primary |
| 2 | **Instagram** | Primary visual social; music discovery and fan relationship | Link paste only (API restricted since 2024) |
| 3 | **YouTube** | Music video home; algorithm-driven discovery at scale | API integration — strong |
| 4 | **DistroKid** (or equiv.) | Every artist needs a distributor to get on DSPs | Link paste + partner programme exploration |
| 5 | **TikTok** | Primary for new-music discovery under-30 | Link paste (API high friction) |
| 6 | **Linktree** (or equiv.) | The bio link — what ABLE is directly replacing | Build a Linktree importer |
| 7 | **Bandsintown** | De facto gig listings for independent artists | API integration — primary |
| 8 | **Mailchimp / Kit** | Email list — owned audience insurance | API export/sync target |
| 9 | **Bandcamp** | Direct-to-fan sales; spiritual competitor | Link paste + embed |
| 10 | **Stripe / PayPal** | Any direct transaction | Stripe = ABLE infrastructure; PayPal = link CTA |

**The three integrations that deliver the most value fastest:** Spotify + Bandsintown + YouTube. Together they auto-populate: artist name and photo, top tracks, monthly listeners, music video, and all upcoming tour dates. The profile is 70% complete before the artist has typed a word.

---

## Part 2 — Full Tool Taxonomy (20 Categories)

---

### 1. Music Distribution

| Platform | Status | API | ABLE approach |
|---|---|---|---|
| **DistroKid** | Market leader by volume | No public API; partner programme gated | Link paste. Explore partner programme for ISRC metadata pull |
| **TuneCore** | Traditional, per-release pricing | None | Link paste |
| **AWAL** | Selective (invitation-based), takes % | None | Link paste |
| **Amuse** | Freemium, mobile-first | None | Link paste |
| **CD Baby** | Legacy; good for back-catalogue | None | Link paste |
| **United Masters** | Distribution + brand deals | None | Link paste |
| **Ditto Music** | UK-based, competitive pricing | None | Link paste |
| **LANDR** | AI mastering + distribution | Partnership API (B2B enquiry needed) | Affiliate link + mastering integration pitch |

**Key insight:** No major distributor has an open API. The integration play for ABLE is ISRC-based — when artists connect their distributor account, ABLE reads release metadata (title, ISRC, credits). DistroKid has indicated openness to partnerships. Make "Connect DistroKid" a step in onboarding for v2 of the wizard.

---

### 2. Streaming Platforms

| Platform | API | ABLE approach |
|---|---|---|
| **Spotify** | Yes — Web API, public, free | **Primary integration.** Pull: artist name, photo, top tracks, monthly listeners, related artists. Pre-save CTA via native build (see below). |
| **Apple Music** | MusicKit JS for embeds | Embed player. No data pull without Apple Developer membership. Link paste for profile. |
| **SoundCloud** | Yes — public API | Strong secondary integration. Pull: tracks, play counts. Embed player. Key for electronic, lo-fi, hip-hop artists where SoundCloud is primary. |
| **Bandcamp** | None | Link paste + embed player. Bandcamp is ideologically aligned with ABLE — partnership conversation worth having, but they have intentionally kept their API closed. |
| **Tidal** | Limited | Link paste |
| **YouTube Music** | YouTube Data API covers this | See Video section |
| **Amazon Music** | None | Link paste |

**Note on Spotify API changes (May 2024):** Spotify removed audio features and recommendations endpoints without warning. Endpoints needed by ABLE (`/artists/{id}`, top tracks, monthly listeners) remain on the free tier but verify before building — Spotify has a history of undocumented deprecations.

---

### 3. Live Events / Touring

| Platform | API | ABLE approach |
|---|---|---|
| **Bandsintown** | Yes — free for read access | **Primary integration.** Connect Bandsintown → all upcoming shows auto-populate Events section. Highest-value live event feature. |
| **Songkick** | Yes — public, free API key | Secondary to Bandsintown. Worth supporting for artists only on Songkick. |
| **Dice** | Limited | Link paste. "Buy tickets" CTA links to Dice event page. |
| **Eventbrite** | Yes — public API | Link paste for standard use. API for artists who manage their own events (listening parties, workshops). |
| **RA (Resident Advisor)** | None | Link paste only. A deep link to an RA profile is a credibility signal in electronic/club scenes — make it a first-class link type in the CTA builder. |
| **Skiddle / See Tickets / Fatsoma** | None | Link paste |
| **Ticketmaster** | Commercial/complex | Link paste for large-venue artists |

---

### 4. Merch & Physical Sales

| Platform | API | ABLE approach |
|---|---|---|
| **Shopify** | Yes — Storefront API (public) | **Build this.** Pull featured products: artwork, price, buy button. Display in merch section. Shopify Storefront API is designed for exactly this use case. |
| **Big Cartel** | Yes — public, well-documented | **Build this.** Many indie artists use Big Cartel specifically because it's made for small creative businesses. Same pattern as Shopify. |
| **Gumroad** | Yes — API available | Useful for artists selling digital content: sample packs, stems, behind-the-scenes. Pull featured products. |
| **Printful / Printify** | Yes, but indirect | Usually sits behind Shopify. No direct ABLE integration needed. |
| **Bandcamp** | None | Link paste |
| **Spring / Redbubble** | Limited / None | Link paste |

**Architecture:** Shopify and Big Cartel cover the majority of artists with a dedicated merch store. API-powered merch cards (live product images with prices) are an Artist tier feature — on free, a single Merch link is sufficient.

---

### 5. Fan Communication & Email

| Platform | API | ABLE approach |
|---|---|---|
| **Mailchimp** | Yes — v3 API comprehensive | **Export target.** "Export to Mailchimp" one-click. Also: Artist Pro auto-sync (new ABLE fan → Mailchimp audience added automatically). |
| **Kit (ConvertKit)** | Yes — well-documented | Same as Mailchimp. Kit users tend to be more sophisticated email senders — valuable Artist Pro integration. |
| **Beehiiv** | Yes — v2 API (2024+) | Good integration target. Push new ABLE fan sign-ups to Beehiiv newsletter. Growing fast. |
| **Substack** | None | Link paste. Some artists use Substack as their primary fan communication channel. |
| **Brevo** | Yes — API | EU-based, GDPR-friendly. Export target alongside Mailchimp. |
| **Klaviyo** | Yes | Overkill for most artists. Relevant for serious merch operations only. |

**Position:** ABLE builds its own email broadcast (Artist Pro) and doesn't depend on external platforms. But export targets — Mailchimp, Kit, Beehiiv — are essential trust signals. Data portability = artist trust. "Export your list as CSV, always, on every tier" is a core promise.

---

### 6. Social Media

| Platform | API | ABLE approach |
|---|---|---|
| **Instagram** | Meta Graph API — restricted, requires app review | **Link paste only.** Instagram Basic Display API was deprecated in late 2024. Any integration requires business account + app review — too much friction. |
| **TikTok** | API available but high friction | Link paste. Embed specific TikTok videos in snap cards via URL. |
| **YouTube** | YouTube Data API v3 — open, generous quota | **Build this.** Pull: latest video thumbnail + title → auto-populate video snap card. Embed via IFrame API (no auth needed). Best social API on this list. |
| **X / Twitter** | Free tier severely rate-limited (2023+) | Link paste only. API too restricted to be useful. |
| **Threads** | No public API | Link paste |
| **Bluesky** | AT Protocol — open | Link paste for now. Worth monitoring — AT Protocol is philosophically aligned with ABLE's independence ethos. |
| **Twitch** | API available | Optional snap card: "I'm live right now" with Twitch embed. Low priority. |

---

### 7. Payments & Tipping

| Platform | API | ABLE approach |
|---|---|---|
| **Stripe** | Yes — comprehensive | ABLE's infrastructure layer. Stripe Connect for marketplace splits (support packs, Stage Can tips). Not a "connect your Stripe" for artists — Stripe is the engine behind ABLE's own transactions. |
| **PayPal** | Yes — PayPal.Me for simple tipping | PayPal.me link as a CTA type in the builder. Many artists already have this. |
| **Ko-fi** | Yes — webhook-based | Link paste + optional webhook: Ko-fi tip → artist notified in ABLE dashboard. Ko-fi is ideologically close to ABLE. |
| **Buy Me a Coffee** | Yes — API | Same as Ko-fi. |
| **Cash App / Venmo** | None / US-only | Link paste ($cashtag as CTA option). |

---

### 8. Crowdfunding

| Platform | API | ABLE approach |
|---|---|---|
| **Kickstarter** | Yes — read API | **Build this.** The "Fund this project" snap card: paste Kickstarter URL → ABLE pulls live funding %, days remaining, backer count → progress bar on the card. Genuinely useful, technically easy. |
| **Indiegogo** | Limited | Link paste + manual progress entry |
| **Patreon** | Yes — OAuth API | Patron count display on profile ("X people support me monthly"). Artist Pro: Patreon patrons sync into ABLE fan CRM. |
| **PledgeMusic** | **DEFUNCT since 2019** | Remove from all ABLE documentation. |
| **Bandcamp memberships** | None | Link paste |

---

### 9. Royalty & Publishing

| Platform | API | ABLE approach |
|---|---|---|
| **Songtrust** | None | Affiliate link. Educational prompt in dashboard. |
| **Sentric Music** | None | Same. UK artists see Sentric first. |
| **PRS for Music** | None | Onboarding prompt: "Are you registered with PRS? This is how you get paid." |
| **ASCAP / BMI / SOCAN** | None | Information links in ABLE Recommends page |
| **SoundExchange** | None | Information link for US digital streaming royalties |

**Key play:** An educational prompt in the wizard/onboarding: "Are you registered with [PRS/ASCAP/BMI based on country]?" — with a plain-English explanation and a link. Most emerging artists are not registered and lose royalties as a result. This is one of the most genuinely helpful things ABLE can do at zero technical cost.

---

### 10. Playlist Pitching & Promotion

| Platform | API | ABLE approach |
|---|---|---|
| **SubmitHub** | None | **Affiliate link.** "Promote this release" panel in dashboard. Highest transparency in the space. |
| **Groover** | None | Affiliate link. EU-focused. 2€ per pitch. |
| **Musosoup** | None | Partner + affiliate. UK-focused, no upfront cost model. |
| **Playlist Push** | None | Affiliate link. Higher budget ($300-$1000). Artist Pro tier audience. |
| **Hypeddit / Toneden** | Spotify API wrapper | **ABLE builds this natively.** Their pre-save feature is a Spotify API call + email capture — something ABLE already does. Don't partner; build. |

---

### 11. Video

| Platform | API | ABLE approach |
|---|---|---|
| **YouTube** | YouTube Data API v3 | **Primary integration.** Paste YouTube URL → ABLE fetches thumbnail, title, duration → video snap card with embedded player. |
| **Vimeo** | Yes — API | Embed player for press/professional video. Link paste default. |
| **Twitch** | API + embed | "I'm live" snap card. Optional, low priority. |
| **Vevo** | None (embeds are YouTube) | Link paste — Vevo content is embedded via YouTube IFrame anyway. |

---

### 12. Analytics (own, don't partner)

| Platform | Notes | ABLE approach |
|---|---|---|
| **Spotify for Artists** | No external API. Internal dashboard. | ABLE's own analytics complement this: "What Spotify shows you for streams, ABLE shows you for relationships." |
| **Chartmetric / Soundcharts** | Industry tools, enterprise pricing | ABLE Recommends mention for pro-level artists only |
| **Feature.fm / Linktree analytics** | Irrelevant once artist switches to ABLE | Own this data. Don't partner. |

**Position:** Analytics is ABLE's core value proposition. The metrics that matter: page views by source, CTA click rate, fan sign-up rate, superfan trajectory, email open rates. These are all internal ABLE data. The design benchmark is Spotify for Artists. Build this, don't outsource it.

---

### 13. Community & Fan Engagement

| Platform | API | ABLE approach |
|---|---|---|
| **Discord** | Bot API + webhooks | Link paste. "Join my Discord" as a first-class CTA type. ABLE Rooms is the long-term alternative for artists who want community without leaving ABLE. Discord isn't going away — support it, don't fight it. |
| **Patreon** | API | See Crowdfunding. |
| **WhatsApp Channels** | Business API (complex) | WhatsApp invite link as a CTA type. High UK/EU artist relevance. |
| **Telegram** | Bot API | Link paste. Popular with underground/electronic artists. |
| **Mighty Networks / Circle / Geneva** | Various | Link paste. Niche. |

---

### 14. Press & EPK (ABLE owns this category)

| Platform | Notes | ABLE approach |
|---|---|---|
| **Presskit.to** | Direct competitor. Weak. | **ABLE builds better:** `able.fm/name/press` — auto-populated from existing profile data. Artist Pro. |
| **Sonicbids** | Declining | Link paste. Legacy. |
| **ReverbNation** | Aging but large installed base | Link paste. Some older artists still active here. |
| **Music Gateway** | UK sync + EPK | Affiliate link in ABLE Recommends. |

---

### 15. Sync Licensing

| Platform | API | ABLE approach |
|---|---|---|
| **Music Gateway** | None | Affiliate link. "Get your music in TV/film" CTA in dashboard. |
| **Songtradr** | API exists | Affiliate link. (Acquired by Beatport 2023 — status evolving.) |
| **Musicbed / Artlist / Epidemic Sound** | None | Not artist-submission focused — these curate their libraries. Not relevant for most ABLE artists. |

---

### 16–20. Other categories (brief)

- **Recording/DAW tools** (Logic, Ableton, Splice, BandLab): No meaningful integration. BandLab is worth supporting as an embed for very early-stage artists where it's their primary platform.
- **Collaboration tools**: Credits system in ABLE is the right layer. None of the collab DAWs have useful APIs.
- **Booking** (GigSalad, Encore, Sonicbids): "Book me" CTA type covers this. No API integration needed.
- **Funding/grants**: Kickstarter integration above. PRS/Arts Council grant info on ABLE Recommends page.
- **Charity/causes**: "Support a cause" snap card type. Link paste to charity page + optional Stripe Connect split.

---

## Part 3 — Integration Priority Matrix

### Build now (real API + high value, relatively straightforward)

| Integration | What ABLE pulls | Tier |
|---|---|---|
| **Spotify Web API** | Artist photo, name, top tracks, monthly listeners | Artist |
| **YouTube Data API v3** | Latest video, thumbnail, view count, embed | Free |
| **Bandsintown API** | All upcoming events → auto-populate Events section | Artist |
| **Mailchimp API** | Export fans + sync new sign-ups to audience | Artist Pro |
| **Kit API** | Same as Mailchimp | Artist Pro |
| **Kickstarter API** | Live funding progress on snap card | Artist |

### Build next (real value, slightly more setup)

| Integration | What ABLE pulls | Tier |
|---|---|---|
| **SoundCloud API** | Track embeds, play counts | Free |
| **Shopify Storefront API** | Product cards: image, price, buy button | Artist |
| **Big Cartel API** | Same as Shopify | Artist |
| **Beehiiv API** | Push new fans to newsletter | Artist Pro |
| **Patreon API** | Patron count display on profile | Artist Pro |
| **Songkick API** | Upcoming events (secondary to Bandsintown) | Artist |

### Link paste only (no API, or API not worth the effort)

All distribution platforms, Apple Music, Tidal, Bandcamp, all social except YouTube, all PROs, all sync platforms, all PR/EPK platforms, all production/DAW tools, all booking platforms, Instagram, TikTok, X/Twitter.

### ABLE builds natively (don't partner — own the feature)

| Feature | Why not integrate |
|---|---|
| **Pre-save links** | Spotify API + ABLE fan capture = better than Hypeddit/Toneden |
| **Email broadcasts** | ABLE owns the artist-fan relationship; externalising breaks the trust model |
| **Analytics dashboard** | This is the moat — own it completely |
| **Press pack** (`able.fm/name/press`) | All data already in ABLE; just a render layer |
| **Fan CRM & superfan scoring** | The core product — never outsource |
| **Story Mode / video generation** | Via Creatomate/Bannerbear API (see Ecosystem doc) |

### Affiliate links only (no API, real revenue, real artist value)

SubmitHub, Groover, Musosoup, Playlist Push, Songtrust, Sentric, Music Gateway, LANDR, Pirate Studios.

### Single best quick win

Build a **Linktree importer**: artist pastes `linktree.ee/username` → ABLE parses their links and imports as CTAs. This is the single best "why switch" conversion tool. Achievable without an API (Linktree pages are public HTML). This is the muscle-memory override tool for the majority of ABLE's target acquisition.

---

## Part 4 — AI Music & Audio Landscape

This section is honest about what exists, what's buildable, and what ABLE should and shouldn't touch.

---

### The fundamental tension

ABLE's tagline is "Artist Before Label." Artists who use ABLE are creating original work. Features that replace that creation (AI-generated songs) are off-brand at a fundamental level and could alienate the community ABLE is building.

**The right side of the line:** AI that assists the artist's voice — copy, captions, bios, campaign suggestions, mastering, transcription.
**The wrong side of the line:** AI that replaces the artist's music creation.

This doesn't mean ignoring AI music entirely — it means being intentional about what ABLE endorses and why.

---

### Platform-by-Platform Assessment

#### Suno AI
- **API:** No public API. No developer portal. Unofficial wrappers exist but violate ToS and are brittle.
- **What it does:** Full song generation (vocals + instrumentation + lyrics) from text prompt. Quality is best-in-class consumer AI music.
- **Legal status:** Named defendant in RIAA copyright lawsuit (filed 2024). Output licensing terms are unclear for commercial use.
- **Verdict for ABLE:** Not viable for integration. Watch for formal API launch post-litigation.

#### Udio
- **API:** No public API. Same situation as Suno.
- **Legal status:** Also named in RIAA lawsuits.
- **Verdict for ABLE:** Not viable.

#### Stability AI — Stable Audio
- **API:** Available on Stability AI platform and via Replicate. Stable Audio 2.0 (2024).
- **What it does:** Text-to-audio — music loops, sound design, instrumentals, ambient, electronic textures. Strong for production-oriented content rather than vocal songs. Up to ~90 seconds open-source; longer via commercial API.
- **Cost estimate:** ~$0.05–$0.15 per generation at Replicate rates ($0.0014/sec on A100).
- **Licensing:** Commercial API usage covers commercial use; open-source model is research/non-commercial only. Terms have been in flux due to Stability AI's financial difficulties.
- **Verdict for ABLE:** Potentially viable for background music / content creation features. Not suitable for artist-identity features — it doesn't create *your* music, it creates generic music.

#### ElevenLabs — **Highest value on this list**
- **API:** Yes — production-grade, well-documented, self-serve developer platform.
- **What it does:**
  - **Eleven Music:** Studio-grade music generation from text prompts in any style.
  - **Text-to-Speech:** Industry-leading voice synthesis, emotional control.
  - **Voice Cloning:** Instant clone from short sample. Artist records 30 seconds → ABLE can generate spoken content in their voice.
  - **Voice Isolator:** Strip background noise from audio.
  - **Sound Effects:** Text-to-SFX API.
  - **Transcription:** Speech-to-text with time-aligned transcripts.
- **Pricing:** Subscription tiers from ~$5/month. Credit-based API access.
- **Verdict for ABLE:** The most compelling AI integration for the platform. Voice cloning is a genuinely artist-facing feature — "Generate a spoken intro in your own voice for your Room dispatches." Sound effects for content. Transcription for voice notes in Rooms. This is the AI tool that serves the artist's expression rather than replacing it.

#### LANDR — AI Mastering
- **API:** Yes, but B2B partnership product — requires direct contact with LANDR partnerships team. Not self-serve.
- **What it does:** Genre-aware AI mastering. Analyzes track, applies loudness/EQ/compression/limiting. Outputs mastered WAV/MP3.
- **Cost:** Consumer plans ~$9–$23/month. API pricing negotiated at scale.
- **Verdict for ABLE:** High-value feature. Artists actively pay for mastering today. The pitch to LANDR is compelling: "ABLE giving independent artists discounted mastering before they distribute." B2B partnership required — worth initiating the conversation. This is an Artist tier feature.

#### Loudly
- **API:** Yes — public developer portal, free API key to start.
- **What it does:** Text-to-music, genre/tempo/energy parameter control, stem extraction (separate vocals, drums, bass), adaptive audio streams. Commercial licensing included ("perpetual worldwide licence").
- **Pricing:** Volume-based, pay-as-you-go available.
- **Verdict for ABLE:** Solid option for background music in content creation tools (Story Mode). Stem separation is genuinely useful for artists. The clean commercial licensing terms matter. Lower priority than ElevenLabs but worth keeping in mind.

#### Mubert
- **API:** Had a public Render API — current status uncertain (docs returned 404 at time of research). May have pivoted or restructured.
- **What it did:** Generate royalty-free ambient/electronic tracks from text/tags. Paid royalties to contributing musicians.
- **Verdict for ABLE:** Monitor their current status. If API is still live, useful for background/ambient generation. Philosophically interesting because they paid the musicians whose stems were used.

#### Beatoven.ai
- **API:** Yes — available for content music generation.
- **What it does:** Background music for video content, parameterised by mood/genre/duration.
- **Verdict for ABLE:** Niche. Useful for a "generate background music for your Story Mode video" feature. Lower priority.

#### Soundraw
- **API:** Available.
- **What it does:** AI music generation with royalty-free output. Parameterised.
- **Verdict for ABLE:** Same as Beatoven — content music generation. Not artist-identity-facing.

#### OpenAI — Whisper
- **API:** Yes — Whisper transcription API is public, well-priced.
- **What it does:** State-of-the-art speech-to-text. Multi-language. Time-aligned transcripts available.
- **Cost:** $0.006/minute of audio.
- **Verdict for ABLE:** The right transcription tool for ABLE Rooms voice note transcription. Extremely cheap, excellent quality. This is a near-term build: artist records a voice dispatch → Whisper transcribes → fans can read it. A small feature with high accessibility value.

#### Google MusicLM / Lyria
- **API:** Lyria is available via Google Cloud Vertex AI in limited regions.
- **What it does:** Text-to-music generation. Song generation with vocals. Research-grade quality.
- **Verdict for ABLE:** Not accessible enough for a production integration. Monitor.

#### Meta AudioCraft / MusicGen
- **API:** Open source on GitHub + Hugging Face. Available on Replicate (~$0.058 per 42-second run).
- **What it does:** Text-conditioned music generation. Instrumental focused. Melody conditioning (provide a melody, generates music in that style). Stereo variants available.
- **Licence warning:** Code is MIT — but **model weights are CC-BY-NC 4.0 (non-commercial)**. Hard blocker for production commercial use without separate licensing from Meta.
- **Verdict for ABLE:** Do not use commercially in current form. Monitor for licensing changes.

#### ACE-Step (open source, 2025)
- **API:** Open source on GitHub (`ace-step/ACE-Step`), available on Replicate. Released 2025.
- **What it does:** Up to 4 minutes of music in ~20 seconds on A100. Supports 19 languages for vocal generation. Voice cloning, lyric editing, remixing, rap generation. The most capable open-source music model as of writing.
- **Licence:** Needs verification before commercial use — check repo LICENSE file directly.
- **Verdict for ABLE:** Technically impressive. Verify licence; run a spike if it permits commercial use.

#### LALAL.AI — Stem Separation
- **API:** Yes — public API, documented.
- **What it does:** Separate any track into individual stems: vocals, drums, bass, guitar, synth, strings, wind. Lead vs backing vocal separation. Noise/echo/reverb removal.
- **Pricing:** ~$9.99/month entry, per-minute credit model. Business plans available.
- **Verdict for ABLE:** A genuinely practical tool for working artists. "Upload your track, download the stems" is a real artist workflow — sharing acapellas with fans, creating stem packs for remixers, generating clean instrumentals. High value, clean API. Artist Pro feature.

#### Claude API (Anthropic) — for copy features
- **API:** Yes — production, well-documented, ABLE should already plan to use this.
- **What it does for ABLE:** Bio writer, CTA copy variants, caption generator, email draft, snap card copy, release campaign calendar, fan message personalisation, show description writer.
- **Cost:** A few cents per generation. Claude Haiku is extremely cheap for short copy tasks.
- **Verdict:** This is the AI layer for ABLE's creative assistance features. Already in the roadmap. Start here.

---

### AI Integration Priority for ABLE

Ranked by: **artist value × feasibility × alignment with ABLE's values**

| Priority | Feature | Technology | What it does | Tier |
|---|---|---|---|---|
| 1 | **Bio writer** | Claude API | Artist enters 3 words → 1-line bio in their voice | Free (limited) / Artist |
| 2 | **CTA copy variants** | Claude API | "Stream Now" → 3 variants in the artist's tone | Artist |
| 3 | **Caption pack on publish** | Claude API | Publish a snap card → get 3 Instagram/TikTok captions | Artist |
| 4 | **Transcription in Rooms** | OpenAI Whisper | Voice note → auto-transcribed text for fans who prefer to read | Artist Pro |
| 5 | **Story Mode background music** | MusicGen / Beatoven | Generate instrumental backing for Story Mode video export | Artist Pro |
| 6 | **AI mastering** | LANDR (partnership) | Upload track → get a mastered version before distribution | Artist Pro |
| 7 | **Voice cloning for dispatches** | ElevenLabs | Artist records sample → generate spoken content in their voice | Artist Pro |
| 8 | **Stem separation** | LALAL.AI | Upload track → separate vocals, drums, bass for fan exclusives / support packs / remixes | Artist Pro |
| 9 | **Release campaign planner** | Claude API | Enter release date → 6-week content calendar with snap cards and CTA modes | Artist Pro |
| 10 | **Superfan scoring** | Internal ML | Analyse engagement patterns to identify real superfans before they self-identify | Label tier |

---

### AI: What NOT to build

| Feature | Why not |
|---|---|
| AI song generation (Suno/Udio style) | ABLE's artists create original music. This is off-brand at a values level, and both platforms are under RIAA litigation. |
| AI lyric writing | Same concern — assists creation but risks artists publishing AI-written lyrics under their name. If built, make it extremely clear it's a suggestion tool, not a ghost-writer. Even then, handle carefully. |
| Auto-publishing AI content | Always show AI output as a suggestion. Never auto-apply. |
| AI "sounds like" comparisons | Algorithmically comparing artists to each other has a history of being reductive and offensive to serious musicians. Avoid. |

---

## Part 5 — Agent Opportunities

What becomes possible when AI moves from single-prompt → autonomous multi-step agent.

These are **12–24 month horizon** features. Design the architecture to support them. Don't build the agents yet.

| Feature | Today (prompt) | With agents |
|---|---|---|
| Bio writing | Claude prompt → 3 suggestions | Agent reads Spotify discography + recent posts → writes in proven artist voice |
| Caption generator | Template suggestions | Agent monitors release performance → generates platform-specific captions at optimal post times |
| Playlist pitching | Affiliate link to SubmitHub | Agent prepares pitch email with track data, target curator list, personalised intro |
| Fan re-engagement | "Draft a re-engagement email" | Agent identifies cold fans, writes personalised subjects, schedules send at optimal time |
| Release campaign | Static 6-week template | Agent ingests release date → builds full content calendar, creates snap cards, sets CTA modes |
| Press outreach | Download press pack PDF | Agent identifies relevant blogs from genre data, drafts personalised pitch emails |
| A&R targeting | "Interested in representation" flag | Agent researches labels signing similar artists, drafts cold outreach with data-backed case |
| Superfan mobilisation | "Share this" button | Agent drafts personalised messages to top 10 superfans asking them to share |

### Architecture principle for agents:
**The artist's profile + fan data is the context window.** The richer the data in ABLE, the more useful the agent. Every feature ABLE builds that collects structured data (fan list, click history, superfan score, event attendance, release metadata) is also building the agent's knowledge base.

### What to build first to enable agents later:
1. Claude API integration (bio writer, captions) — the single-prompt version is also the foundation for agentic use
2. Structured data on every fan action (not just sign-ups — every click, return visit, purchase)
3. Artist profile schema that captures: genre, influences, career stage, previous releases, goals
4. The fan CRM — the richer this is, the more useful every agent feature becomes

---

## Part 6 — Deprecation Notes & Flags

Items that need immediate action in ABLE's existing documentation:

1. **PledgeMusic** — defunct since 2019. Remove from `ECOSYSTEM_AND_PARTNERSHIPS.md` and any other references.
2. **Instagram Basic Display API** — deprecated by Meta late 2024. Do not reference this in any integration plans. Graph API only (high friction, not worth pursuing).
3. **Twitter/X API** — free tier severely rate-limited since 2023–2024. Not viable for integration. Remove from any "future integrations" lists.
4. **Spotify API** — verify current endpoint availability before building. Spotify removed several endpoints in May 2024 without warning. The endpoints ABLE needs remain available but confirm.
5. **Toneden** — has repositioned away from artists/musicians toward brands. Don't reference as a "music" tool. Build ABLE's own pre-save natively.

---

## Summary: The North Star Integration Stack

If ABLE builds only these in Year 1, the platform is dramatically more compelling than any competitor:

**Connect (auto-populate the profile):**
- Spotify → name, photo, top tracks, monthly listeners
- YouTube → latest video, embed
- Bandsintown → all upcoming tour dates

**Engage (capture and own the fan relationship):**
- ABLE fan sign-up → email list
- Mailchimp / Kit export → one click, any tier
- Fan CRM → superfan scoring (internal)

**Convert (help the artist take action):**
- Claude AI → bio writer, captions, CTA copy
- SubmitHub / Groover → affiliate promotion panel
- Kickstarter → live progress snap card

**Grow (everything else):**
- Story Mode via Creatomate/Bannerbear
- Press pack (`able.fm/name/press`)
- ABLE Rooms + Stage Can tips
- ElevenLabs voice cloning (Artist Pro, year 2)
- LANDR mastering (Artist Pro, year 2, partnership)

---

---

## Part 7 — API Reality Check (Verified 2026-03-13 Against Live Docs)

*This section corrects assumptions in the earlier parts of this document based on direct verification of Spotify, Bandsintown, MusicBrainz, and Apple Music API documentation.*

---

### Spotify — What Actually Exists vs What We Assumed

**CORRECTION: Monthly listener count is NOT in the Spotify Web API.**
The number prominently shown on Spotify artist profiles ("X monthly listeners") has never been in any public endpoint. It is Spotify for Artists internal data. The API exposes `followers.total` (deprecated, and a different metric) and a `popularity` integer (0–100, also deprecated). Neither is monthly listeners. Do not build any feature that displays or references this number — it cannot be retrieved.

**Confirmed available WITHOUT artist authentication (client credentials only):**
- Artist name, images (all sizes), genres
- `followers.total` — deprecated, may disappear; do not surface as "monthly listeners"
- `popularity` — deprecated integer 0–100
- Top tracks (`/artists/{id}/top-tracks`) — title, album art, 30-second preview URLs, release dates
- Full discography (`/artists/{id}/albums`) — albums, EPs, singles with artwork and release dates
- Related artists (`/artists/{id}/related-artists`) — 20 similar artists

**ID resolution:** Extract from Spotify URL directly. `open.spotify.com/artist/[ID]` — the last segment is the artist ID. Or use `/search?type=artist` to look up by name.

**CONFIRMED NOT AVAILABLE even with OAuth:**
- Streaming counts, saves, playlist adds, listener demographics, revenue — all Spotify for Artists dashboard, entirely closed
- Artist biography text — does not exist in any Spotify API endpoint
- Pre-release embargoed content — not in catalog until release day
- Spotify Credits Hub — no API, closed product

**Rate limits:** Rolling 30-second window. Apply for "Extended Quota Mode" in the Spotify Developer Dashboard before production launch.

**Revised practical architecture:**
```
Onboarding: Artist pastes Spotify URL → extract artist ID → client credentials fetch:
  → artist name, images, genres, top tracks, discography, related artists
Cache: 6-hour TTL per artist
Display: DO NOT label followers.total as "monthly listeners" — it is a different metric
Bio: Artist writes their own — it does not exist in Spotify
```

---

### Bandsintown — Key Correction

**CORRECTION: Bandsintown API keys are per-artist, not a platform-wide key.**
Each key is generated from a Bandsintown for Artists account. A multi-artist platform like ABLE cannot use a single key for all artists.

**Options:**
1. Each artist generates their own key and pastes it into ABLE settings (one-time setup, ~2 minutes)
2. Apply to Bandsintown's partnership programme (`api@bandsintown.com`) for a multi-artist arrangement

**Build plan:** "Connect Bandsintown" flow in ABLE settings panel. Artist generates their key at Bandsintown for Artists → pastes into ABLE → Events section auto-populates. The manual event entry fallback remains for artists not on Bandsintown.

---

### MusicBrainz — For Credits System

**Free, no authentication, completely open.** Hard rate limit: **1 request per second** enforced by IP blocking. Requires a descriptive `User-Agent` header: `ABLE/1.0 (able.fm) contact@able.fm`.

**Data quality caveat:** Major and mid-level releases are well-documented. UK emerging artists in the £8k–£25k/year bracket (ABLE's primary users) are often absent or sparse. Best used as an enrichment pass, not a primary data source.

**Architecture:** Background job, not real-time lookup. When artist connects Spotify, trigger async MusicBrainz search by name + Spotify ID. Store any matched credits in ABLE database. Surface in artist profile + freelancer profile (when that product is built).

---

### Apple Music — Clarification

**Two separate systems:**

*iTunes Search API* (free, no auth): Returns artist name, iTunes ID, genre, Apple Music URL. No media, no artwork, no streaming data. Useful only for constructing a correct Apple Music deep link in the platform pills.

*Apple Music API / MusicKit* (full catalog): Requires Apple Developer Program membership ($99/year). Developer token is a JWT signed server-side with an Apple developer key. Returns name, artwork, genres, albums, songs, editorial notes. No per-user OAuth required for public catalog data.

**Verdict:** Use iTunes Search API for link resolution now (free). Add MusicKit catalog integration after backend is live (worth the $99/year once the product is real).

---

*Document compiled: 2026-03-13. Companion to `PLATFORM_STRATEGY.md`, `ECOSYSTEM_AND_PARTNERSHIPS.md`, and `DISCOVERY_AND_GROWTH.md`.*
*Research sources: Agent-based research including direct API documentation review (March 2026) + analysis of ABLE existing strategy documents.*

---

## Part 8 — Recommended Zero-Friction API Stack (Verified Workarounds, 2026-03-13)

*This section documents the final recommended architecture for ABLE's auto-population features, solving both the Bandsintown per-artist key problem and the Spotify monthly listeners problem.*

---

### The Problem, Restated

Two assumptions in the original MASTER_PLAN.md Section 16 are wrong:

1. **"Bandsintown API — free, no OAuth, one call by artist name"** — Incorrect. Keys are per-artist. Multi-artist use requires a partnership or per-artist setup step.
2. **"Spotify Web API — monthly listeners"** — Incorrect. Monthly listener count is not in any Spotify API endpoint.

Both need workarounds to deliver the zero-friction onboarding ABLE needs.

---

### Workaround 1: Events — Ticketmaster Discovery API

**Status:** Confirmed viable. Free. Single platform-wide API key. No per-artist setup.

**Why it works for ABLE:**
- Ticketmaster is the largest events ticketing platform globally. Roughly 80% of ABLE's target artists (UK independent acts playing 200–2,000 capacity venues) have their shows ticketed via Ticketmaster or its subsidiaries (See Tickets, Dice, AXS).
- The API uses a single platform key registered by ABLE — no individual artist setup at all.
- Lookup is by artist name (string search), not artist ID.

**API calls:**
```
Step 1 — Resolve artist ID:
GET https://app.ticketmaster.com/discovery/v2/attractions.json
  ?keyword={artistName}
  &apikey={ABLE_PLATFORM_KEY}

Step 2 — Get their events:
GET https://app.ticketmaster.com/discovery/v2/events.json
  ?attractionId={attractionId}
  &countryCode=GB
  &apikey={ABLE_PLATFORM_KEY}
```

**Response data:** Event name, date, venue name, city, ticket URL, on-sale status.

**Rate limits (free tier):** 5,000 API calls/day, 5 calls/second. With 6-hour cache per artist, this covers 5,000 artist profile loads per day before rate limiting — sufficient for early product.

**Coverage gaps:** Artists who self-promote via Eventbrite, Dice, Skiddle, or sell tickets at the door won't appear. Manual event entry fallback covers these cases.

**Recommended display copy:** "Shows via Ticketmaster" (attribution required). Keep it small.

---

### Workaround 2: Reach Metric — Last.fm `artist.getInfo`

**Status:** Confirmed viable. Free. Single platform-wide API key. No per-artist setup.

**Why it works for ABLE:**
- Last.fm's `artist.getInfo` endpoint returns `listeners` (30-day unique listeners) and `playcount` (all-time scrobbles) for any artist by name.
- The `listeners` figure is a genuine engagement metric — it reflects people actively listening and tracking their music, not passive streaming. For ABLE's target audience (emerging UK independent artists), Last.fm engagement often correlates strongly with core fanbase size.
- It is NOT the same as Spotify monthly listeners, and should not be presented as such.

**API call:**
```
GET https://ws.audioscrobbler.com/2.0/
  ?method=artist.getInfo
  &artist={artistName}
  &api_key={ABLE_PLATFORM_KEY}
  &format=json
```

**Response fields:**
- `artist.stats.listeners` — 30-day unique listeners (string, convert to int)
- `artist.stats.playcount` — all-time scrobble count
- `artist.bio.summary` — artist biography text (HTML-formatted, often well-written for known artists)
- `artist.tags.tag[]` — genre/style tags

**Important:** `artist.bio.summary` is the first source of biography text available to ABLE without artist input. For well-known artists it is substantial. For newer artists it may be minimal or absent. Always fall back to artist-written bio.

**Rate limits:** 5 calls/second. No documented daily cap. Apply same 6-hour TTL cache as Spotify.

**Display guidance:**
- Label as "Last.fm listeners" not "monthly listeners" — honesty matters here
- Or omit the label and surface it only in the artist's private dashboard (not fan-facing) as a data point alongside Spotify `popularity` score
- Do NOT display as a headline vanity metric — ABLE's philosophy is honest data

---

### The Complete Zero-Friction Auto-Population Flow

**Trigger:** Artist pastes their Spotify profile URL during onboarding (single input).

```
1. Extract Spotify artist ID from URL segment
   open.spotify.com/artist/{ARTIST_ID}

2. Spotify Web API (client credentials — no OAuth):
   → Artist name, images, genres
   → Top tracks (titles, artwork, 30s previews)
   → Full discography (albums/EPs/singles)
   → Related artists (for "Artists I Recommend" seed)

3. Use artist name → Last.fm artist.getInfo:
   → listeners (30-day), playcount, bio text, tags

4. Use artist name → Ticketmaster Discovery:
   → Upcoming shows with dates, venues, ticket URLs

5. (Optional, async) MusicBrainz search by name + Spotify ID:
   → Credits data for any matched releases
```

**Total artist effort:** Paste one URL. Everything else is automatic.
**Time to populated profile:** Under 10 seconds for all API calls (parallelise steps 2–4).
**Artist setup friction for events:** Zero (vs. Bandsintown's per-artist key flow).

---

### Revised MASTER_PLAN.md Integration Priority List

The corrected version of the list in MASTER_PLAN.md Section 16:

1. **Ticketmaster Discovery API** — free, single platform key, events by artist name with no per-artist setup. Primary events source. (Replaces Bandsintown as first integration.)
2. **Spotify Web API** — artist photos, top tracks, discography, genre; makes the profile feel real in 10 seconds. (Monthly listeners NOT available — do not mention this.)
3. **YouTube Data API v3** — pull latest video, thumbnail, view count; best social API available.
4. **Last.fm artist.getInfo** — reach proxy (30-day listeners) + bio text + tags; free, platform-wide key.
5. **Mailchimp / Kit export** — one-click fan list export; trust signal for data portability.
6. **Bandsintown** — still worth supporting as opt-in (artists who already have Bandsintown For Artists can connect their key for richer event data), but not the primary path.

---

*Section added: 2026-03-13. Based on verified research into Ticketmaster Discovery API and Last.fm API as workarounds for Bandsintown per-artist key limitation and Spotify monthly listener data unavailability.*
