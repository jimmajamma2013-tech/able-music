# ABLE — Partnerships Specification
**Status: Active authority document**
**Version: 1.0 | Created: 2026-03-16**
**Supersedes: `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md` (reference only)**

---

## Section 1: Partnership Philosophy

### The North Star

ABLE partners with companies that make artists more capable. Never with companies that take power away from them.

The test for every partnership is this: after the integration, does the artist have more control over their audience relationship — or less? If the answer is less, decline.

### Three Partnership Types

| Type | Description | Examples |
|---|---|---|
| **Technical integrations** | APIs that pull or display data on the artist's profile | Spotify, Bandsintown, oEmbed, Resend |
| **Channel partnerships** | Distribution, co-marketing, and referral relationships | Music schools, BIMM, producer networks |
| **Commercial partnerships** | Revenue share, affiliate, or co-selling structures | Abler programme, affiliate links to SubmitHub/Groover |

### The Hard Rules

**Rule 1 — Fan data is non-negotiable.**
If a partnership requires ABLE to share fan email data with a third party: decline. No exceptions. The fan list belongs to the artist. ABLE is custodian, not owner. This is the product's core promise.

**Rule 2 — No exclusivity deals.**
ABLE does not ask artists to use only ABLE. Any partnership that requires exclusivity from ABLE (e.g. "ABLE can only work with SubmitHub and not Groover") is refused.

**Rule 3 — Artist-first visibility.**
ABLE's brand does not appear between the artist and their fan in a way that diminishes the artist. Integrations are seamless. Partner logos in the UI must be tasteful and optional.

**Rule 4 — Complexity must earn its place.**
No integration ships unless the user benefit is immediately visible and measurable. "Cool to have" is not a reason to integrate. If the artist doesn't feel the value in their first session, the integration has failed.

### Anti-patterns (what we will never do)

- Revenue share deals that require sharing fan email data
- Platform exclusivity deals (artist must only use ABLE, or ABLE can only use one partner)
- Vanity partnerships that exist for press releases, not artist value
- Integrations that add visual complexity without clear user benefit
- Sponsorships that compromise ABLE's "artist-first" positioning by pushing a partner's product on artists who haven't asked
- White-labelling the artist profile for a partner (the page belongs to the artist, not a venue chain or distributor)
- Data brokering: aggregating artist fan data and selling it or providing it to music industry analytics companies

---

## Section 2: Priority Partnership Stack — V1 through V3

### V1 Must-have (ship with product)

These are not optional. ABLE without these is not the product. They either remove the empty state problem or deliver the core promise of the platform.

| Partner | What it does for ABLE | Phase | Priority |
|---|---|---|---|
| **Spotify Web API** | Import artist profile, sync release data, display Now Playing | V1 | P0 |
| **Bandsintown API** | Import and auto-sync upcoming shows | V1 | P0 |
| **oEmbed network** | YouTube, SoundCloud, Spotify, Bandcamp embeds in profile | V1 | P0 |
| **Resend** | Transactional email (fan confirmation) + artist broadcasts | V1 | P0 |

### V2 High-value (first 6 months post-launch)

These integrations move ABLE from "a good page" to "the hub." They should be spec'd in V1, shipped in V2.

| Partner | What it does for ABLE | Phase | Priority |
|---|---|---|---|
| **Stripe Connect** | Artist payouts for Support Packs and Close Circle fees | V2 | P1 |
| **Linktree CSV import** | One-click migration: parse Linktree export, populate ABLE profile | V2 | P1 |
| **PostHog** | Product analytics — privacy-first, GDPR compliant, no cookies for fans | V2 | P1 |
| **Bandcamp oEmbed** | Embed Bandcamp player on artist profile | V2 | P2 |
| **SubmitHub / Groover affiliate** | "Promote this release" modal → pre-fill → affiliate conversion | V2 | P2 |

### V3 Growth partners (Year 2, after product-market fit confirmed)

These are strategic, not technical. They require relationship-building, not just API keys.

| Partner | What it does for ABLE | Phase | Priority |
|---|---|---|---|
| **BIMM, ICMP, ACM** (music schools) | Student discount + referral programme | V3 | P1 |
| **Artist management companies** | Label tier co-selling | V3 | P1 |
| **Sync platforms** (Musicbed, Artlist) | Cross-promotion for artists seeking sync deals | V3 | P2 |
| **PR companies** | Co-branded campaigns around releases | V3 | P2 |
| **Venue partnerships** (Bandsintown/DICE/Resident Advisor) | Co-marketing for gig mode and events | V3 | P3 |

---

## Section 3: Technical Integration Detail

### 3.1 — Spotify Web API

**What ABLE gets:**
- Artist display name, bio, artist image
- Latest release (title, artwork, track list, release date)
- Monthly listeners (display only, not owned data)
- Top tracks (5 maximum on profile)
- Upcoming pre-releases (if marked in Spotify for Artists)
- 30-second preview URLs (no licence required for preview playback)

**What ABLE gives back:**
- Nothing. Read-only relationship. No artist data is sent to Spotify.

**Auth flow:**
- OAuth 2.0 Authorization Code Flow with PKCE (browser-safe)
- Scope required: `user-read-private`, `user-read-email` (for account verification), `artist-read` (via client credentials for public artist data)
- For public artist data: client credentials flow — no user OAuth needed for basic import
- For personalised features (pre-save): standard auth code flow, redirect to `able.fm/spotify-callback`

**Rate limits and caching:**
- Spotify Web API rate limits are 30 req/s per app
- Cache artist data in localStorage (`able_spotify_cache`) with 24-hour TTL
- Profile import is a one-time call — subsequent refreshes are manual or on 30-day schedule
- Streaming stats refresh every 7 days (monthly listeners) — not live

**Fallback if API is down:**
- Show cached data if `able_spotify_cache` exists and is under 7 days old
- If no cache: show static profile data (no empty state — artist filled in manually at onboarding)
- Never show error to fan — Spotify data is enhancement, not foundation

**Cost:**
- Spotify Web API: free tier is sufficient for all V1/V2 needs
- No cost until personalised features (pre-save, playlist pitching) which require Spotify for Artists partnership agreement

**Privacy:**
- No fan data is sent to Spotify
- Artist's Spotify account connection is optional — profile works without it
- Only artist-public data is read (no listening history, no personal Spotify data)

---

### 3.2 — Bandsintown API

**What ABLE gets:**
- Upcoming show list (venue, city, date, doors time, ticket URL)
- Past shows (last 3, for credibility display)
- "I'm going" count per show (fan engagement signal)

**What ABLE gives back:**
- Nothing in V1. Future V2: ABLE can send "fan signed up from gig campaign" event back to Bandsintown via webhook, creating a closed loop.

**Auth flow:**
- API key (artist's Bandsintown app ID)
- No OAuth required for public event data
- Artist provides their Bandsintown artist name on connection — ABLE fetches via: `https://rest.bandsintown.com/artists/{artist_name}/events?app_id={key}`

**Rate limits and caching:**
- Bandsintown free API: 1,000 req/day
- Cache in `able_shows` localStorage, refresh every 6 hours
- Pre-fetch on profile load if cache is older than 6 hours (async, non-blocking)

**Fallback if API is down:**
- Use cached `able_shows` data
- If no cache: show no events section (not an error state — some artists have no shows)
- Dashboard shows last-sync timestamp so artist knows data is stale

**Cost:**
- Bandsintown Public API: free
- Bandsintown Artist API (write access, for ABLE to create events on behalf of artists): requires partner agreement — apply in V3

**Privacy:**
- No fan data is sent to Bandsintown
- Show data is public — no privacy considerations

---

### 3.3 — oEmbed Network

**What ABLE gets:**
- Embeddable players for YouTube, SoundCloud, Spotify tracks/playlists, Bandcamp, Vimeo
- Standard oEmbed protocol — paste URL → get embed HTML

**What ABLE gives back:**
- Nothing.

**Auth flow:**
- No auth for oEmbed — public endpoint
- URL pattern: `https://www.youtube.com/oembed?url={video_url}&format=json`
- SoundCloud: `https://soundcloud.com/oembed?url={track_url}&format=json`
- Spotify: not oEmbed — use iframe embed URL pattern `https://open.spotify.com/embed/track/{track_id}`

**Rate limits and caching:**
- oEmbed calls are cheap — one per URL, cached indefinitely (embed HTML does not change)
- Cache in `able_oembed_cache` keyed by URL hash

**Fallback if API is down:**
- Show link only (graceful degradation) — the URL itself is always valid
- Artist sees "Embed unavailable — link shown instead" in dashboard (not the fan)

**Cost:**
- Free. All oEmbed providers are free for embedding.

**Privacy:**
- YouTube/Spotify embeds send analytics back to Google/Spotify
- Use `youtube-nocookie.com` for YouTube embeds to reduce tracking
- Document this in ABLE's privacy policy: "Embeds on artist profiles may set cookies from third-party platforms"

---

### 3.4 — Resend (Email)

**What ABLE gets:**
- Transactional email delivery (fan sign-up confirmation, artist welcome)
- Marketing email delivery (artist broadcasts to fan list)
- Delivery analytics (opens, clicks, bounces, unsubscribes)
- Inbound webhook for bounces and spam complaints (maintain list hygiene)

**What ABLE gives back:**
- Nothing. Resend is an infrastructure provider, not a partner in a data sense.

**Auth flow:**
- API key (ABLE's Resend account) — never exposed client-side
- Serverless function handles email dispatch (Netlify function)
- Rate limit: 100 emails/second on paid Resend plan — more than sufficient for V1

**Rate limits and caching:**
- No caching required — transactional emails send once
- Broadcast emails queue via Resend batch API (up to 100 per API call)
- For 2,000-fan broadcast: 20 API calls queued over 5 seconds

**Fallback if Resend is down:**
- Log failed sends to Supabase queue table
- Retry queue checks every 15 minutes (Netlify scheduled function)
- Artist dashboard shows "email delivery delayed" — not "failed"

**Cost:**
- Resend free tier: 3,000 emails/month, 100/day
- Resend Pro: $20/month for 50,000 emails/month — sufficient to Month 12
- Cost per fan confirmation email: ~$0.0004 — negligible
- Broadcast pricing becomes relevant at Artist Pro scale (2,000 fans × broadcast/month = 2,000 emails/broadcast)

**Privacy:**
- Resend processes email data — covered by Resend's DPA
- ABLE must have a Data Processing Agreement with Resend (auto-signed on signup)
- Fan email addresses are stored in Supabase, passed to Resend only at send time — not held in Resend as a contact list
- GDPR: fans give consent on sign-up via checkbox ("I agree to receive emails from this artist")

---

### 3.5 — Stripe Connect (V2)

**What ABLE gets:**
- Artist payout infrastructure for Support Packs, Close Circle fees, tips
- Stripe handles KYC/compliance for artist accounts
- ABLE takes platform fee via `application_fee_amount` on each charge

**What ABLE gives back:**
- Nothing beyond the transaction — Stripe does not receive fan or artist audience data.

**Auth flow:**
- Stripe Connect: Standard OAuth flow for artist onboarding
- Artist connects at: `https://connect.stripe.com/oauth/authorize?client_id={ABLE_CLIENT_ID}&scope=read_write`
- On callback: exchange code for artist's `stripe_account_id`, store in artist profile
- All charges run via: `stripe.paymentIntents.create({ ..., transfer_data: { destination: artist_stripe_account_id } })`

**Rate limits and caching:**
- Stripe rate limits: 100 req/s per account — no concern at V2 scale

**Fallback if Stripe is down:**
- Disable Support Pack purchase UI (hide "Buy" button, show "Payments temporarily unavailable")
- Do not show error to fan — artist page still fully functional
- Queue no-op — artist is notified when payment service resumes

**Cost:**
- Stripe Connect fees: 0.25% + $0.25 per payout to artist (weekly payouts)
- ABLE platform fee (suggested): 5% of each transaction
- Net to ABLE on £10 Support Pack: £0.50 minus ~£0.28 Stripe fee = £0.22
- Meaningful revenue only at scale — not a V1 revenue driver

**Privacy:**
- Fan payment data never touches ABLE servers — goes directly to Stripe
- Artist banking data stored by Stripe (not ABLE)
- ABLE stores only `stripe_account_id` per artist (non-sensitive)

---

## Section 4: Commercial Partnership Detail

### 4.1 — Music School Partnerships (BIMM, ICMP, ACM)

**Why this matters:**
These three schools have ~15,000 students enrolled collectively. Every student is in the exact primary demographic: actively releasing music, building an audience, needing tools. A partnership gets ABLE in front of them at the moment of maximum motivation — during their music education.

**The deal structure:**
- ABLE offers: 30% student discount on Artist tier (£9 → £6.30/mo) for current students verified via `.edu` email or student ID
- Music school offers: inclusion in their "recommended tools" resource pack, one guest lecture slot per semester (James or a designated ABLE rep), and social media mention to their student community
- No exclusivity on either side
- Attribution via referral code: `able.fm/ref/bimm` / `able.fm/ref/icmp` / `able.fm/ref/acm`

**Who initiates contact:**
James directly. This is a relationship sale. Target the head of the course (not marketing). At BIMM, the right contact is the Commercial Music or Artist Development course lead. LinkedIn or direct email.

**What to offer in the first conversation:**
"I'd like to give your students free access to ABLE for the rest of term — no commitment. I'll do a 20-minute talk for your class. If students find it useful, we can formalise a student discount deal."

**What to ask for:**
Nothing in the first meeting. The ask comes after they've seen value. The ask is: include us in your welcome pack and send one email to your student list.

**Timeline to first deal:**
Target: first deal signed by Month 4 (within 6 months of launch). Lead time is 6–8 weeks from introduction to decision.

**KPIs:**
- Sign-ups attributed to referral code within 60 days of partnership launch: target 50
- Paid conversion rate from student sign-ups: target 8% (lower than general due to budget constraints)
- Retention at 90 days: target 40% (students who maintain their profile beyond the class that introduced them)

---

### 4.2 — Artist Management Companies

**Why this matters:**
One manager with 5 artists converts to 5 Artist tier accounts simultaneously. A single Label tier account (£49/mo) replaces 5 individual Artist tier accounts (£45/mo) — slightly higher ARPU with less churn (managers churn with their whole roster, not one artist at a time, but roster additions offset this).

**The deal structure:**
- Label tier (£49/mo) covers 10 artists — more value per artist than individual accounts
- Co-selling model: ABLE gives manager a referral code; manager sets up profiles for their roster; ABLE handles all artist onboarding
- Optional: ABLE sets up profiles on behalf of the manager (white-glove onboarding for Label tier)
- No revenue share beyond the subscription itself

**Who initiates contact:**
James directly. Target managers of 3–8 artists in the UK independent scene. Not majors. Not CAA or WME — they have infrastructure. Target managers who are also artists, or who operate out of small management companies without a dedicated tool stack.

**What to offer:**
"Set up one of your artists on ABLE. I'll do it with you, it takes 10 minutes. If you can see the value for your roster, I'll give you Label tier at Artist Pro price for the first year."

**What to ask for:**
Refer two other managers if they find it useful. Word-of-mouth in the management community is how this compounds.

**Timeline:**
First management company deal by Month 5. These conversations are longer — managers are protective of their artists' data and time.

**KPIs:**
- Number of artists added per management company in first 30 days: target 3/5 roster
- 90-day retention: target 60% (managers stay if artists are active)
- Referrals per management company: target 1 (one manager recommends to another)

---

### 4.3 — Affiliate Programme (SubmitHub, Groover, Playlist Push)

**Why this matters:**
ABLE can earn affiliate revenue from tools artists already need. The integration is non-invasive — a "Promote this release" section in the dashboard links to vetted partners. ABLE earns when artists click through and pay.

**The deal structure:**
- SubmitHub: 20–30% affiliate commission on first deposit (standard rate, apply via their affiliate portal)
- Groover: 15% affiliate on first purchase (apply via affiliate@groover.co)
- Playlist Push: 10–15% affiliate (apply via their partner programme)

**Who initiates contact:**
James fills in affiliate applications. These are self-serve applications — no relationship required.

**What ABLE gets:**
- SubmitHub: ~£5–10 per converted artist (average first deposit £30–50)
- Groover: ~£3–7 per converted artist (average first purchase €25–50)
- Not a primary revenue source — supplementary at scale

**What ABLE does not do:**
- Push these services to artists who haven't asked about playlist promotion
- Show affiliate links before the artist has 50+ fans (premature — they need to build their base first)
- Place affiliate content above artist-benefit content

**Timeline:**
Apply during V2 build phase (Month 3–4). No deal-making required — affiliate applications are auto-approved.

**KPIs:**
- Monthly affiliate revenue at Month 12: target £200–500/month (secondary to subscriptions)
- Click-through rate on "Promote this release" feature: target 15% of artists who have published a release

---

## Section 5: The Abler Referral Programme — Full Specification

### 5.1 — What Is An Abler?

An Abler is anyone who refers artists to ABLE and earns a recurring commission when those artists become paying subscribers.

Ablers are not influencers ABLE pays for impressions. They are genuine advocates — people who use ABLE or believe in it and earn real money from sharing it.

Natural Ablers:
- Music YouTubers and TikTok educators ("music biz tips" content)
- Music production schools and tutors (see Section 4.1 — management route is separate)
- Independent music blogs
- Artist managers who recommend tools to their roster
- Musicians with large social followings who refer their network

---

### 5.2 — Commission Structure

| Tier | Qualification | Commission rate | Duration |
|---|---|---|---|
| **Fan Abler** | Any signed-up ABLE artist | 20% of monthly subscription | 6 months |
| **Creator Abler** | 10+ successful referrals OR 10k+ verified social reach | 25% of monthly subscription | 12 months |
| **Partner Abler** | Approved influencer, blog, or institution — applied for | 30% of monthly subscription | 12 months + co-marketing |

**Rationale for structure:**
- 20% for 6 months on a £9 Artist tier account = £1.80/month × 6 = £10.80 total per conversion
- 30% for 12 months on a £19 Artist Pro account = £5.70/month × 12 = £68.40 total per conversion
- Industry standard for SaaS affiliate programmes is 20–30% recurring for 12 months. ABLE's Fan Abler tier is intentionally short (6 months) to keep the programme sustainable at launch. The Creator and Partner tiers at 12 months reward the most active Ablers without creating long-tail obligations.
- Commissions are calculated on the **net subscription fee** after any applied discounts

**What counts as a conversion:**
- Referred artist signs up via Abler's unique link
- Artist completes onboarding (has a live profile with at least one CTA)
- Artist upgrades to any paid tier

**What does NOT count:**
- Self-referrals (artist refers themselves with a second account)
- Referrals that lapse in the first 30 days (refunded artist accounts)
- Referrals from same IP/device as the Abler (fraud detection)

---

### 5.3 — Payout Mechanics

**Payment method:** Stripe Connect — Ablers connect their Stripe account or bank account in the Abler dashboard. ABLE initiates payouts via Stripe Connect (same infrastructure as artist payouts in V2).

**Payout schedule:** Monthly, on the 1st of each month.

**Minimum payout threshold:** £20. Earnings below £20 roll over to the next month.

**Currency:** GBP. For non-UK Ablers, Stripe handles currency conversion at prevailing rate.

**Payout timeline:** Stripe processes payouts in 3–5 business days (standard). Ablers see "Pending" status until bank settlement.

**Tax:** Ablers are responsible for declaring affiliate income. ABLE provides an annual earnings statement. UK Ablers earning over £1,000/year are reminded to register for self-assessment.

---

### 5.4 — Abler Dashboard Specification

The Abler dashboard lives at `able.fm/abler` (accessible after sign-in for any artist) and at a dedicated section within the artist `admin.html` dashboard.

**Dashboard sections:**

**My referral link**
- Unique link: `able.fm/ref/[code]` — permanent, cannot be changed
- Copy button with micro-animation
- Short link also available: `ablr.fm/[code]` (future domain)

**Performance stats**
- Total clicks (lifetime)
- Sign-ups from clicks (conversion rate displayed)
- Active paying subscribers (current)
- Total earned (lifetime)
- Next payout amount and date

**Earnings history**
- Table: Month | New referrals | Active subscribers | Earnings | Status (pending/paid)
- Downloadable CSV for tax purposes

**Share toolkit**
- Pre-made social caption for Instagram, TikTok, Twitter
- Shareable profile card (PNG download — artist's own profile as the hero image)
- "Why I use ABLE" short-form video template link (Canva template — Ablers personalise)

**Payout settings**
- Connect Stripe button
- Bank account display (last 4 digits)
- Payout history

---

### 5.5 — Fraud Prevention

**Self-referral prevention:**
- Referral link sets a cookie + localStorage flag on click
- On sign-up: if Abler's user ID matches the referral user ID → conversion is voided, Abler notified
- Abler can refer a genuinely separate person — just not themselves

**Fake account prevention:**
- Conversions only trigger when a referred account upgrades to paid tier (real payment required)
- New accounts have a 30-day hold before conversion is confirmed (prevents charge-backs inflating referral count)
- IP-based duplicate detection: if >3 conversions from the same IP in 30 days → flagged for manual review (not auto-suspended)

**Minimum activity requirement:**
- Referred artist must complete onboarding AND have at least 1 fan sign-up within 30 days for the conversion to be confirmed
- This ensures Ablers are referring genuine artists, not click-farms

---

### 5.6 — Communication Cadence

**Welcome email (immediate on Abler activation):**
- Subject: "You're an Abler. Here's how it works."
- Contents: referral link, commission structure, first share kit, how payouts work
- Sent via Resend

**Monthly earnings email (1st of each month):**
- Subject: "Your ABLE earnings for [Month] — £X"
- Contents: earnings breakdown, referral performance, next payout date
- Sent only if the Abler has at least one active referral

**Milestone emails:**
- "Your 1st referral just upgraded" — celebrate the first conversion
- "10 active referrals — you've unlocked Creator Abler tier" — tier upgrade notification
- "You've earned £100 in total" — moment of recognition

**Quarterly digest (for Partner Ablers only):**
- Top-performing content from ABLE Ablers
- New features to share with their audience
- Exclusive preview of upcoming releases (for Partner Ablers to build content around)

---

### 5.7 — Top Abler Recognition

**Community leaderboard:**
- Public leaderboard at `able.fm/ablers` showing top 10 Ablers by conversions (not earnings — privacy)
- Ablers opt in to public leaderboard (default: off)
- Top Abler badge on their ABLE artist profile

**Co-marketing for Partner Ablers:**
- ABLE reshares their content (with permission) on ABLE's Instagram/TikTok
- "Abler Spotlight" feature: one Partner Abler highlighted per month on ABLE's social channels
- Exclusive Partner Abler Slack channel for Q&A with James and early product previews

---

## Section 6: Anti-patterns — What ABLE Will Never Do

These are explicit. Not guidelines — decisions.

**Never share fan email data with partners.**
The artist's email list is their most valuable asset. ABLE's core promise is that the list belongs to the artist. No integration, no partnership, and no revenue model justifies breaking this promise.

**Never require platform exclusivity from artists.**
ABLE is not the only tool an artist needs. An artist can use ABLE alongside Linktree, Bandcamp, Mailchimp, and DistroKid simultaneously. Any deal that requires artists to stop using other tools is rejected.

**Never take a commission on fan-to-artist payments without full transparency.**
If ABLE facilitates a transaction (Support Pack, tip, Close Circle subscription), the fee is disclosed before the artist sets up the product. No hidden cuts, no variable platform percentages that change without notice.

**Never use artist fan data for ABLE's own marketing.**
ABLE does not email an artist's fans about ABLE products. ABLE does not use aggregate fan data to target music industry advertising. Fan data exists solely to serve the artist who captured it.

**Never create integrations that phone home without consent.**
Every API integration must have artist opt-in. "Connect your Spotify" is a choice, not a default. ABLE does not silently pull data from an artist's accounts. The connection is always visible in the dashboard and always revocable.

**Never accept partnerships with companies that conflict with ABLE's positioning.**
Specifically:
- Distribution platforms that take a cut of streaming revenue (conflicts with ABLE's 0% commission model)
- Social media analytics companies that aggregate artist data for sale
- Label services that position themselves between the artist and their fans
- Any company whose core business model is in tension with artist ownership

---

## Section 7: Partnership Roadmap Summary

| Milestone | Target date | Action |
|---|---|---|
| Spotify Web API live | V1 launch | Dev work — no negotiation required |
| Bandsintown API live | V1 launch | Dev work — no negotiation required |
| oEmbed network live | V1 launch | Dev work — no negotiation required |
| Resend email live | V1 launch | Sign up for Resend account |
| Abler programme live | Month 2 post-launch | Build Abler dashboard, Stripe Connect |
| Affiliate applications submitted | Month 3 | Apply to SubmitHub, Groover, Playlist Push |
| First music school deal | Month 4 | James personal outreach — BIMM first |
| Stripe Connect (artist payouts) | Month 5 | Dev work + Stripe Connect application |
| Linktree CSV import | Month 5 | Dev work — no negotiation required |
| PostHog analytics | Month 5 | Sign up — no negotiation required |
| First management company deal | Month 6 | James personal outreach |
| V3 growth partner conversations | Month 12+ | After 500 active artists |

---

## Section 8: ABLE Positioning in Partnerships

ABLE does not approach partnerships from a position of weakness. The value exchange is clear and equal.

**What ABLE brings to a partnership:**
- Direct access to 500–5,000 independent artists who are actively releasing music (Year 1 target range)
- A product designed specifically for their behaviour and needs
- An audience that is engaged, not passive — these artists are spending money on their careers
- Authentic positioning: artists trust ABLE specifically because it doesn't feel like a platform with commercial motives
- Referral traffic: an ABLE integration means every artist using it becomes a touchpoint for the partner's brand

**What ABLE asks for in return:**
- Honest mutual benefit — no forced integrations, no pay-to-play placement
- Data integrity — no use of ABLE data for the partner's own targeting
- Speed — integrations should be straightforward. ABLE does not have capacity for six-month enterprise negotiation cycles in V1.

**How to open a partnership conversation:**
Start with value delivery, not the ask. Build the integration first (where technically possible), then offer the formal partnership once ABLE can show real usage data. A partner who can see "500 ABLE artists have clicked through to your platform in the last 30 days" is a partner ready to sign. An empty pitch deck from a product with 20 users is not.

---

*Document created: 2026-03-16. Authority: supersedes `docs/reference/research/ECOSYSTEM_AND_PARTNERSHIPS.md` for build decisions. That file remains useful as a vision document for future features (Rooms, Music Map, Press Pack, Story Mode) not yet in scope.*
