> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE Platform Strategy

## The Core Premise

Most link-in-bio tools treat artists like small businesses. ABLE treats them like artists.

The difference: small businesses want conversions. Artists want *connection*. The conversion follows from the connection. ABLE is built on the understanding that a fan who feels close to an artist will stream, buy tickets, buy merch and send tips — not because they were pushed to, but because they want to be part of something real.

**Turning fans into superfans is the product.** Everything else — the links, the analytics, the embeds — is infrastructure for that.

---

## What the top platforms do that we can learn from

| Platform | What they do well | What we take |
|---|---|---|
| Spotify | Artist story, algorithmically-surfaced discovery | Release campaigns, genre-aware UX |
| Bandsintown | Fan notification on tour, auto-sync | Event sync, fan "I'm going" signal |
| Patreon | Tiered support, exclusive content model | Support packs, tiered access |
| Substack | Direct email relationship, reader identity | Fan email ownership, CRM |
| Weverse | Ultra-close artist-fan interaction (K-pop model) | Closeness signals, community |
| Discord | Role-based community, superfan tier | Superfan badges, early access tiers |
| Linktree | Dead-simple, universal, trusted | The simplicity reference |
| Beacons | Analytics, email capture, store | Platform-native monetisation |
| Koji | Interactive apps within the profile | Future: interactive snap cards |
| Stan.store | Creator economy funnels | Support-pack buying flow |
| Apple Music | Artist radio, time-sensitive content surfacing | Gig mode, time-aware content |

**What none of them do well:** Give fans a sense of *earned* closeness to the artist. ABLE's superfan system is the differentiator.

---

## Tiers

### Free
- 1 artist page
- Basic analytics (views, clicks, 7-day)
- 1 snap card
- 1 CTA zone
- ablemusic.co/name URL
- 100 fan sign-ups

### Artist — £9/mo
- Unlimited snap cards
- Custom domain
- Fan email capture (up to 2,000)
- Campaign modes: pre-release, release, gig tonight
- Advanced analytics (30-day, sources, heatmap)
- Genre visual preset
- Bandsintown / YouTube / Spotify connect
- Support packs (up to 2 tiers)

### Artist Pro — £19/mo
- Everything in Artist +
- Fan CRM (full list, segmentation, superfan scoring)
- Email broadcasts to fans (up to 10,000)
- Exclusive content gating
- Private show ticketing
- AI copy suggestions
- Priority support
- White-label (remove ABLE branding)

### Label / Manager — £49/mo
- Up to 10 artist pages
- Team access (editor roles)
- Aggregate analytics
- Label-level fan CRM
- API access

---

## Fan Experience

### What fans want (and artists often don't know to offer)

1. **Closeness** — the feeling that the artist knows they exist
2. **First** — hearing things before general release
3. **Exclusive** — access to things no one else can get
4. **Easy way to support** — that doesn't feel transactional or shameful
5. **Notification** — when there's a show near them, a new drop, anything
6. **Connection with other fans** — the community that forms around an artist

### Fan sign-up flow (keep it to one field)

Email address → that's it. Optional: connect Spotify (enables "fans who like X also like Y").

On sign-up fans see:
- A confirmation that's in the artist's voice ("You're in. I'll keep it close.")
- Option to turn on notifications (new music, shows near you)
- A "follow on Spotify" nudge if they haven't

### Fan dashboard (basic)
- Artists they follow on ABLE (nicely arranged, not a feed)
- Upcoming shows from those artists (geo-aware)
- New drops
- Superfan status for each artist (visual progress indicator)

---

## Superfan System

The premise: fans who feel *recognised* become advocates. ABLE can be the first platform that lets an artist see who their real fans are — not their follower count, but the 50 people who have clicked every link, come to every show, bought every drop.

### Superfan levels (suggested names — can be artist-customised)

1. **Listener** — signed up, visited the page
2. **Fan** — clicked a CTA, came back at least once
3. **Supporter** — bought something (merch, ticket, tip)
4. **Superfan** — multiple purchases, shared the page, opened every email
5. **Inner circle** — artist manually added, or unlocked via exclusive support tier

### Superfan rewards (artist chooses)
- Early access to ticket sales (before general public)
- Exclusive content unlock (lyrics, voice notes, instrumentals, stems)
- Private listening party invites
- Name in credits (thank you note on release)
- DM access window
- Physical mail (postcard, signed print)

### Superfan mobilisation
- "I need 50 fans to share this today" → ABLE makes it easy with a shareable card
- Fan who shares gets a badge, moves up a tier
- Artist can see exactly who shared and where traffic came from
- "Support this drop" — fans can pledge before release to create social proof

---

## Support Packs

An artist creates a support tier at a price they set. Fans who pay unlock a pack. This is direct-to-fan monetisation without the Patreon overhead.

### What artists can put in a support pack
- **Audio:** Full instrumental tracks, stems, voice notes (process), early demos, unreleased B-sides
- **Text:** Handwritten lyrics (photo), liner notes, track-by-track breakdown
- **Video:** Studio sessions, director's cuts, behind the scenes
- **Access:** Private Discord/WhatsApp group, early show RSVP, one email reply window
- **Physical:** Limited print, signed insert (fulfilled by artist)

### Pack types
- **One-time drop** (£3–£25) — tied to a release
- **Monthly supporter** (£5–£15/mo) — ongoing access
- **Lifetime fan** (one-off high price) — everything forever

---

## Fan Email Ownership

This is the key asset. Algorithm traffic is borrowed. An email list is owned.

ABLE should make every artist understand: **your email list is your insurance policy against every platform that might de-rank you, shadowban you, or change its algorithm.**

The fan email capture on the artist profile should feel like a natural offer, not a marketing popup:
- "Stay close" — simple, in the artist's voice
- Option to customise the CTA and thank-you message
- Artist keeps 100% of the list
- Can export as CSV at any time
- Can broadcast from ABLE (on Artist Pro) or export to Mailchimp, Kit, Substack

---

## CRM (artist-facing)

### What the artist sees for each fan
- Email address
- Join date
- Source (Instagram reel, TikTok bio, direct, etc.)
- Superfan level + score
- Click history (which CTAs they've tapped)
- Purchase history (if Shopify/Bandcamp connected)
- Show attendance (if Bandsintown connected)

### Segmentation
- All fans
- Superfans only
- Fans from [specific campaign]
- Fans who clicked [specific CTA]
- Fans who haven't opened an email in 60 days (re-engagement)

### Broadcasts
- Subject + body (rich text)
- Personalisation tokens: {{first_name}}, {{artist_name}}
- Preview before send
- Open/click analytics
- Unsubscribe handled automatically

---

## AI Opportunities (near-term, non-gimmicky)

These should add real value, feel like magic, not novelty.

### Immediately viable (no backend complexity)
1. **Bio writer** — artist enters 3 words about their sound → AI writes a 1-line bio in their voice
2. **CTA copy variants** — for any CTA type, show 3 copy variants ("Stream Now" → "Hear it now" / "On all platforms" / "Out now →")
3. **Snap card copy** — based on card type (release, show, merch), suggest copy in the artist's tone
4. **Caption generator** — when they copy their link, also get 3 Instagram/TikTok caption options

### Near-term (requires some backend)
5. **Genre detection** — paste Spotify URL → detect genre → auto-apply vibe preset
6. **Fan message personalisation** — write one message, AI creates 3 tonal variants (warm, direct, minimal)
7. **Show description writer** — enter venue + date → get show description copy

### Future (more complex, high value)
8. **Release campaign planner** — artist enters release date → AI creates a content calendar with suggested snap cards, email send dates, CTA switches
9. **Superfan identification** — AI analyses engagement patterns to flag who the real superfans are before they self-identify
10. **Fan sentiment** — aggregate signal from shares, returns, click patterns to give artist a "connection score"

### Note on Claude/AI integration
- Claude API can power the bio writer, copy generator, caption generator
- Cost per artist interaction is low (a few cents per generation)
- Should feel like a talented creative assistant, not autocomplete
- Always show the output as a suggestion, never auto-apply

---

## Organic Growth

The network effect is the moat. Artists who recommend each other is how ABLE grows.

### Artists I'm Digging / Spotlight
- Every artist page has an optional "Artists I'm Digging" section
- When artist A recommends artist B → artist B gets a notification + a badge on their page
- Fans who follow artist A are shown artist B
- This creates a discovery graph: artists become curators for each other
- High-value: the introduction carries social weight (not algorithmic noise)

### Fan-driven growth
- Every fan who shares an artist page gets a micro-credit: "Shared by [fan count] people like you"
- When a fan's share drives 5 new sign-ups → they get an "Amplifier" badge
- Artist can see "Top sharers" in CRM

### Artist-to-artist collabs
- If two artists are on ABLE and release a collab → cross-promotion is one click
- Both pages update, both fan lists receive the announcement
- Creates a "collab graph" that ABLE can surface for discovery

### The QR code
- Every artist gets a QR code that can be printed on merch, stage backdrop, handout
- Custom colour (matches accent)
- "Scan to follow" at gigs is a high-converting touchpoint

---

## Private Shows & Exclusive Experiences

Artists can list "fan-only" events:
- Private listening party (in-person or live stream)
- Q&A session (video call)
- Studio session invite
- Intimate acoustic set (capped at N people, ticket required)
- "Hire me" — fans can enquire about private events for birthdays, weddings etc.

ABLE is not the ticketing platform for these — it's the gateway. The artist controls pricing, capacity, and access. ABLE just makes it easy to surface and promote.

---

## Copy Philosophy

**ABLE is not a marketing tool. It is a place for artists to be themselves.**

Copy rules:
- Never write FOR the artist — always give them the words and let them own it
- The defaults should sound like a person, not a brand
- "Stay close" not "Subscribe to updates"
- "I'm playing tonight" not "Gig mode activated"
- "Come if you're near" not "Purchase tickets"
- CTAs should feel like the artist is speaking them — because they are

**The anti-superficial promise:**
Musicians have depth that most platforms flatten into metrics. ABLE surfaces the artist as a human being, not a content creator. Credits matter. Process matters. The story behind the song matters. The page should be a place where that depth can live.

---

## What Top UX/UI Designers Would Do

- **Reduce decisions ruthlessly** — the wizard already embodies this; carry it through the dashboard
- **Contextual defaults** — every empty state has a smart default; nothing is blank
- **Progressive disclosure** — basic features visible, advanced features appear as you need them
- **Feedback loops** — when an artist makes a change, they should see it reflected instantly (live preview pattern)
- **Delight at the right moments** — confetti on page creation, a subtle animation when a fan signs up
- **Typography as personality** — the visual system IS the UX, not a decoration on top of it
- **Density vs space** — the artist dashboard should be dense with information; the fan-facing page should breathe

---

## Artist Pain Points We Solve

| Pain | ABLE's answer |
|---|---|
| Too many tools, login fatigue | One page, all connections from one dashboard |
| Don't know who their real fans are | Fan CRM, superfan scoring |
| Algorithm dependency (Instagram, TikTok) | Owned email list |
| Can't contact fans directly | Email broadcasts from dashboard |
| Booking enquiries scattered across DMs | "Book me" CTA with enquiry form |
| No single source of truth | One URL — ablemusic.co/name |
| Merch hard to manage | Shopify/Printful connect |
| Analytics only per-platform | Cross-platform attribution |
| Tour dates hard to surface | Bandsintown sync, auto-events section |
