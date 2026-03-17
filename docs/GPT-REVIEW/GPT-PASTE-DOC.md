# ABLE — GPT Review Document
**Copy this entire file and paste into GPT for Step 2 of the review sequence.**
**Last updated: 2026-03-16**

---

## WHAT ABLE IS

ABLE (Artist Before Label) is a premium mobile-first platform for independent musicians.

**For artists:** A conversion profile (link-in-bio) that captures fans via email, shows campaign states tied to their release cycle, and gives them owned audience data — no algorithm, no middleman.

**For fans:** A place to stay close to artists they care about, discover new ones, and support directly.

**For freelancers** (producers, mixers, videographers): A professional profile with credits, rate card, and portfolio — discoverable via the artists they've worked with.

**It is not a social network. It is not a marketing tool. It is not a marketplace.**

Competitors it replaces: Linktree, Beacons, Koji, Laylo, Mailchimp (partially), ToneDen (partially).

Target user: Independent UK artist, 1k–50k listeners, serious about their craft, averse to corporate music-industry language.

---

## THREE USER JOURNEYS

### 1. Artist journey
Entry: Onboarding wizard → live profile page → admin dashboard
- Wizard collects: name, vibe/genre, accent colour, CTA type, release info
- Profile shows: top card (video/artwork/embed), hero CTAs, platform pills, music, events, merch, snap cards, fan email capture
- Dashboard shows: Campaign HQ (page state control), real stats, fan list, snap cards, connections, analytics

### 2. Fan journey
Entry: Artist's profile page (from their social bio link)
- Land → see the artist's content → tap a CTA or sign up with email
- Future: fan dashboard showing artists they follow, upcoming shows, new drops

### 3. Freelancer journey
Entry: Freelancer onboarding → freelancer profile → shared admin (freelancer layers activated)
- Discovered via credits on artist release cards — confirmed credits become live links to the freelancer's profile
- That asymmetry (confirmed = link, unconfirmed = plain text) is the entire acquisition mechanic

---

## CAMPAIGN STATES (Page State System)

The artist's bio link changes meaning depending on where they are in their release cycle.

| State | Trigger | Fan experience |
|---|---|---|
| `profile` | Default / 14+ days post-release | Artist info, latest release stream CTA |
| `pre-release` | Release date set in future | Countdown timer, pre-save CTA, locked content teasers |
| `live` | Release date reached | Top card media, stream CTA prominent, 14-day window |
| `gig` | Manual 24hr toggle | Tickets front-and-centre, "on tonight" tag |

Auto-switch logic: `if now < releaseDate → pre-release; if now < releaseDate + 14d → live; else → profile`

Gig mode is always manual — the artist taps it on show day.

---

## TIER SYSTEM

| Tier | Price | Key features |
|---|---|---|
| Free | £0 | Basic profile, 1 snap card, 100 fan sign-ups, basic stats |
| Artist | £9/mo | Unlimited snap cards, up to 2k fan emails, campaign states, connections |
| Artist Pro | £19/mo | Full fan CRM, email broadcasts, support packs, advanced analytics |
| Label | £49/mo | 10 artist pages, team access, aggregate analytics, API |

Gold lock pattern: Pro features show a blurred preview + tasteful overlay with specific value proposition. Never just "Upgrade" — always say what they get.

---

## COPY PHILOSOPHY

ABLE is for artists with depth. They have an aversion to what is superficial.

**Never write:**
- "Turn fans into superfans" → say "your most dedicated listeners"
- "Grow your audience" → say "reach people who care"
- "Monetise your fanbase" → say "let people support you directly"
- "Engage your followers" → say "stay close to the people who show up"
- "Content creator" → say "artist"
- "Going viral" → never mention this
- Exclamation marks on dashboard copy
- Generic SaaS micro-copy ("Get started!", "You're all set!")

**Always write:**
- Direct, honest, specific
- "Stay close." not "Subscribe to updates"
- "I'm playing tonight" not "Gig mode activated"
- "Your list. Your relationship." not "Fan CRM dashboard"

---

## DATA ARCHITECTURE

localStorage now → Supabase when backend lands. No build pipeline. All files edited directly.

Key localStorage keys:
- `able_v3_profile` — artist profile (name, bio, accent, theme, state, release, CTAs)
- `able_fans` — fan sign-ups [{email, ts, source}]
- `able_clicks` — CTA tap events [{label, type, ts, source}]
- `able_shows` — shows list [{venue, date, doorsTime, ticketUrl, featured}]
- `able_tier` — current tier: "free" / "artist" / "artist-pro" / "label"

Backend plan: Supabase (auth via magic link, database, storage) + Netlify (hosting + serverless functions). All localStorage keys map 1:1 to Supabase table rows.

---

## CURRENT BUILD SCORES

**Pages (what's built):**
- Artist profile: 8.9/10 (spec ceiling 9.7)
- Admin dashboard: 9.7/10
- Onboarding wizard: 9.9/10 spec
- Landing page: 9.65/10 spec
- Fan dashboard: 9.21/10 spec
- Freelancer profile: 8.7/10 spec

**Systems (what's built vs specced):**
- CRM: 4.0/10 — campaignState not captured at fan sign-up
- Tier gates: 3.7/10 — visual component unbuilt
- Email: 4.0/10 — fan confirmation email doesn't exist yet
- PWA: 0.6/10 — no manifest.json, no service worker
- Error states: 2.5/10 — no error handling, happy path only
- Legal compliance: 2.0/10 — no GDPR consent on fan sign-up (CRITICAL)
- oEmbed proxy: 3.7/10 — SSRF security vulnerability (CRITICAL)
- Analytics: 6.2/10 — sessionId missing, PostHog not initialised
- SEO/OG: 5.7/10 — OG image fails for data: URI artwork

**Overall:**
- Documentation + spec quality: ~9.0/10
- Current build state: ~6.5/10
- Gap = things that are specced but not yet built

---

## COMPETITIVE INTELLIGENCE (Live, March 2026)

### Linktree
- 50M users, brand dominance
- Shared domain (linktr.ee) has been flagged as spam by Instagram/TikTok — a real switching trigger
- Price increase December 2025 communicated quietly — Trustpilot complaints
- No music-specific analytics, no campaign states, no gig mode
- Free tier has Linktree branding — artists cannot present a clean page without paying

### Beacons
- Expanded from 3 to 14 creator tools
- **Store Pro now 0% take rate** — this removes one of ABLE's previous differentiators
- $29.8M funding from Y Combinator + Andreessen Horowitz
- Creator-generic positioning — "content creator" framing doesn't resonate with musicians
- No campaign states, no release date awareness, no gig mode

### Laylo
- No longer just email — added Instagram DMs (convert post engagers into fan list), AI message coaching ("Notable Fans"), affiliates programme, Tour Suite
- Instagram DMs channel: Outside Lands achieved 140% click-through rate
- Pricing: Free (250 credits), Pro $25/month
- Claims 10,000+ artists, $1B+ in revenue facilitated
- **Critical gap:** No public profile page with campaign states. Laylo is a messaging tool, not a permanent profile. Artists using Laylo still need a bio link destination.

### Spotify for Artists
- Music Pro tier launching 2025–2026: $5.99/month add-on, early concert tickets, AI remix tools
- "Super Listeners" formalised: 2% of monthly listeners = 18% of streams = ~50% of ticket sales
- **Structural moat:** Spotify cannot give artists their fans' email addresses. Business model requires fans to stay in Spotify ecosystem. This is permanent.

### Winamp for Creators (NEW — March 2026)
- Launched website builder + Fanzone + merch shop
- Free for first year (sign up before April 15, 2026), then €50/year
- Nostalgia brand recognition in music-adjacent audience
- No campaign states, no pre-release countdown, no bio-link optimisation
- Threat level: Emerging — could acquire artists who then look for more

### ToneDen
- Owned by Live Nation (acquired 2021)
- In maintenance mode — no material new features found in 2025–2026
- US-focused, ad automation tool, not a permanent profile
- Artists wary of Live Nation ownership (political: ticketing monopoly concerns)

### Bandcamp
- Sold by Epic Games to Songtradr 2023 — stabilised after 50% staff layoffs
- AI-generated music banned January 2026 — doubling down on human artist authenticity
- Direct messaging expanded to desktop
- Artists keep up to 82% of revenue
- Use case: committed existing fans buying music — complementary to ABLE, not competitive

---

## KEY OPPORTUNITIES (from research)

1. **The "no email ownership" gap is widely documented.** Artists report "sending 300,000 people to my Linktree over 3 years and having nothing to show for it."

2. **The two-tools problem is real.** Artists use ToneDen or Feature.fm for campaigns AND Linktree for their bio. No competitor has unified these. ABLE is the only platform that is both the permanent profile and the campaign layer.

3. **Spotify's super listener data is an ABLE marketing asset.** 2% of listeners = 18% of streams = ~50% of ticket sales. Spotify can show you who they are. It cannot give you their email. ABLE can.

4. **Independent artists control ~38% of global streaming revenues** and growing. The addressable market is expanding.

5. **Direct-to-fan sales grew 32% YoY, reaching $4.7B.** Artists with direct fan relationships are outperforming.

6. **Linktree's shared domain is being flagged as spam** by Instagram and TikTok. Active switching trigger.

7. **Music marketing in 2026 trends toward "world-building"** (Music Ally 2026). Campaign states are exactly the infrastructure this requires: pre-release as mystery build, live mode as world reveal, gig mode as physical entry point.

---

## KNOWN RISKS

1. **Email friction.** Instagram follow = 1 tap. Email sign-up = 5 steps. Artists will see Instagram performing "better" in vanity metrics.

2. **Manual gig mode.** Artists who forget to tap gig mode before a show have a worse experience than Linktree. Needs calendar integration or smart trigger.

3. **Fan CRM label is premature.** Email broadcasts are unspecced beyond the basic confirmation email. Marketing it as "Fan CRM" before the broadcast layer is built sets false expectations.

4. **GDPR compliance is P0.** No consent checkbox on fan sign-up. Must be fixed before any real user.

5. **SSRF security vulnerability** in the oEmbed proxy. Must fix before production.

6. **No billing system.** Stripe not wired. Tier gates unbuilt. Revenue model is entirely theoretical.

---

*This document covers ABLE as of March 2026. Product is pre-launch — specs are complete, core pages are built, backend and billing not yet live.*
