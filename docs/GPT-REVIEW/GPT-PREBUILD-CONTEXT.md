# ABLE — Pre-Build Context for GPT Review
**Paste this BEFORE the 100-aspect review prompt.**
**Last updated: 2026-03-16**

---

## IMPORTANT: How to read what ABLE is right now

ABLE has two distinct scores:

- **Current build state: ~6.5/10** — what exists in the live product today
- **Spec ceiling: ~9.0–9.9/10** — what is fully designed and ready to build

The live URLs show the current build state. The specs in this document describe what is being built. When you score ABLE, score the full picture — note where the live product falls short AND where the spec closes the gap.

The gap is not missing vision. It is missing execution time. The specs are complete and authoritative.

---

## WHAT IS BUILT vs WHAT IS SPECCED

| Page | Live URL | Current state | Spec score |
|---|---|---|---|
| Artist profile | /able-v7.html | Functional, some systems incomplete | 9.7/10 spec |
| Admin dashboard | /admin.html | Built, Campaign HQ complete | 9.7/10 spec |
| Onboarding wizard | /start.html | Built and functional | 9.9/10 spec |
| Landing page | /landing.html | Built and live | 9.65/10 spec |
| Fan dashboard | /fan.html | Spec only, partially built | 9.21/10 spec |

**Key systems unbuilt:**
- Supabase backend (data is localStorage only — no persistence across devices)
- Stripe billing (no paid tiers active)
- Email infrastructure (no confirmation or broadcast emails yet)
- GDPR consent on fan sign-up (critical — must fix before real users)
- oEmbed proxy SSRF vulnerability (critical security fix needed)
- PWA manifest and service worker

---

## DESIGN SYSTEM

### Two deliberate surfaces

ABLE has two surfaces that must never look the same:

**Surface 1 — Artist profile (public, fan-facing)**
- Dark, premium, music-first
- Midnight Navy base: `#0d0e1a`
- Single accent variable: `--color-accent` (artist sets this — one variable = complete brand)
- Display font: Barlow Condensed (hero name, state headers)
- Body font: DM Sans
- 4 themes: Dark (default), Light (warm cream `#f0ede8`), Glass (backdrop-filter blur), Contrast (pure black)
- 7 genre vibes: electronic (cyan), hiphop (gold), rnb (rose), indie (sage), pop (indigo), rock (red), folk (ochre)
- Spring easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` — all entrances have slight bounce
- iPhone shell: 430px max-width, centred on desktop with dark surround

**Surface 2 — Admin dashboard (backstage, artist-only)**
- Warm cream background: `#e8e4dd`
- Dark sidebar/topbar: `#1a1a2e`
- Admin amber accent: `#f4b942` (separate from artist accent — intentional)
- Body font: Plus Jakarta Sans (different from profile — intentional)
- Must feel like stepping "behind the curtain"

### CTA architecture (strict — never regress)
Three zones with hard caps:
1. **Hero CTAs** — max 2, dominant, accent fill + ghost
2. **Quick Action pills** — max 4 narrow / 6 wide + overflow
3. **Section Actions** — max 2 per section

Global dedupe rule: same URL cannot appear in multiple zones. Hero wins.

---

## ARTIST PROFILE — SPEC VISION

The artist profile (`able-v7.html`) is the product's most important surface. Here is what the spec defines:

### Top section
- Full-bleed artwork/video hero with ambient colour extraction (canvas API pulls dominant colour from artwork, applies as ambient glow)
- Artist name in Barlow Condensed hero size (`clamp(48px, 14vw, 80px)`)
- Campaign state chip (amber for pre-release, red for live, dark red for gig)
- Owner bar (only visible to the artist when logged in) — dashed ring treatment

### Campaign state behaviour
Each state transforms the entire page:

**Profile (default):** Latest release as stream CTA, platform pills, music section, events, merch, snap cards, fan capture
**Pre-release:** Countdown timer (days/hours/minutes), pre-save CTA as hero, locked content teasers with mystery treatment, "Something's coming" energy
**Live (14-day window):** New release artwork full-bleed, stream CTA dominant, "Out now" chip, everything else secondary
**Gig (24hr manual):** "On tonight" treatment, venue + time prominent, ticket CTA as primary hero, everything else deprioritised

Auto-switch logic: `if now < releaseDate → pre-release; if now < releaseDate + 14d → live; else → profile`

### Fan capture
- Single email field, auto-focus on tap, 16px min font (iOS zoom prevention)
- Copy: "Stay close." — not "Subscribe to updates"
- On submit: immediate toast confirmation, email goes to artist's fan list
- Eventually: magic link one-tap sign-up (reduces friction to near-zero on mobile)

### Snap cards
Up to 6 small cards (or unlimited on paid tier) — artist sets content:
- Text + link (e.g. "Merch drop Friday →")
- Spotify embed
- YouTube/TikTok embed
- Image

---

## ADMIN DASHBOARD — SPEC VISION

The artist's daily home. Primary job: artist opens it → immediately oriented → knows what's happening → knows what to do next.

**Must not feel like:** A CMS, a SaaS dashboard, a settings screen.
**Must feel like:** Backstage. Professional, clean, warm.

### Key sections
- **Campaign HQ:** The page state control centre. Artist sets current state, release date, gig toggle. Shows live preview of what fans see.
- **Stats bar:** Views, fan sign-ups, CTA clicks, conversion rate — all from localStorage (Supabase when live)
- **Fan list:** Every email capture with timestamp, source attribution (Instagram / TikTok / Spotify / direct), star toggle
- **Snap cards manager:** Add/edit/reorder snap cards
- **Connections:** Linked platforms (Spotify, Apple Music, etc.)
- **Analytics:** Source breakdown, campaign performance by state

### Nudge system
The dashboard coaches artists toward better use with contextual nudges:
- "Add a release date to activate pre-release mode"
- "You have 47 fans — share your page to reach 100"
- Nudges are dismissable and don't repeat for 7 days
- Empty states are never blank — always have a specific next action

---

## LANDING PAGE — SPEC VISION

Primary job: Convert an independent artist who has never heard of ABLE.

**Above-the-fold headline:** "Your artist page, built for real fans"
**Sub:** "Your page shifts with your moment. Release day, gig night, new drop — ABLE knows. Every fan sign-up goes straight to your list."

### Key sections (in order)
1. Hero — headline + demo phone showing profile in live state
2. The problem — "300,000 people through your bio link. Nothing to show for it."
3. The solution — campaign states demo (animated, shows all 4 states)
4. Social proof — real artist testimonials (placeholder until launch)
5. Competitive comparison — "Not another Linktree"
6. Pricing — 4 tiers, gold lock pattern on Pro features
7. FAQ
8. Final CTA — "Start free. Own your fans."

---

## ONBOARDING WIZARD — SPEC VISION

Gets a new artist from zero to a live, personalised page in under 5 minutes.

**Steps:**
1. Name + artist handle
2. Genre vibe selection (7 options — sets accent colour + font feel automatically)
3. Accent colour picker (can override vibe default)
4. First CTA type (stream link / pre-save / tickets / merch)
5. Release date (optional — activates pre-release mode immediately if set)
6. Upload artwork or paste embed URL

**End state:** Day 1 share card — a shareable image the artist can post immediately showing "I'm on ABLE." This is the word-of-mouth trigger. If the artist shares this, they bring other artists.

---

## COPY PHILOSOPHY (the hardest thing to copy)

ABLE is for artists with depth. Aversion to what is superficial.

**Never write:**
- "Turn fans into superfans"
- "Grow your audience"
- "Monetise your fanbase"
- "Engage your followers"
- "Content creator" (say "artist")
- "Going viral" (never)
- Exclamation marks on dashboard copy
- Generic SaaS micro-copy

**Always write:**
- "Stay close." not "Subscribe to updates"
- "I'm playing tonight" not "Gig mode activated"
- "Your list. Your relationship." not "Fan CRM dashboard"
- "Good to see you, [Name]." — dashboard greeting, warm, one beat, done
- Direct. Honest. Specific.

The copy philosophy is not just a style guide. It is the product's primary differentiator from every other creator tool. Beacons says "creator economy." Linktree says "one link for everything." ABLE talks like a person.

---

## TIER SYSTEM

| Tier | Price | What unlocks |
|---|---|---|
| Free | £0 | Profile, 1 snap card, 100 fan sign-ups, basic stats |
| Artist | £9/mo | Unlimited snap cards, 2k fans, all campaign states, connections |
| Artist Pro | £19/mo | Fan CRM, email broadcasts, support packs, advanced analytics |
| Label | £49/mo | 10 artist pages, team access, aggregate analytics, API |

Gold lock pattern: Pro features show blurred preview + specific value overlay. Never just "Upgrade." Always say what they get: "See where your fans are coming from — Artist Pro."

---

## FREELANCER LAYER

A second profile type built on the same architecture. Producers, mixers, videographers get:
- Credits hero (peer-confirmed credits from artists they've worked with)
- Portfolio (audio/video samples)
- Rate card with auto-expiry
- Booking enquiry (4 fields, no marketplace signals)

**The acquisition mechanic:** When an artist adds a release credit and the producer has an ABLE profile, the credit becomes a live link. Unconfirmed = plain text. Confirmed = link. That asymmetry drives freelancer sign-ups organically — no paid acquisition needed.

---

## COMPETITIVE LANDSCAPE (March 2026)

| Competitor | Threat | ABLE's gap vs them |
|---|---|---|
| Linktree (50M users) | High brand | No campaign states, linktr.ee domain flagged as spam |
| Beacons ($29.8M funded) | Moderate | Now 0% take rate — removes one ABLE differentiator |
| Laylo | Moderate + rising | Added Instagram DMs — ABLE has no equivalent yet |
| Spotify for Artists | Structural | Can't give artists fan emails — permanent moat |
| Winamp for Creators | Emerging | Free year offer March 2026 — no campaign states |
| ToneDen (Live Nation) | Declining | Maintenance mode, US-only, artists wary of LN ownership |

**ABLE's permanent advantages:**
- Only platform that is both the permanent profile AND the campaign layer
- Copy philosophy no competitor can replicate without rebuilding their entire brand
- Freelancer credits mechanic — no competitor has an organic B2B acquisition loop
- Music-native design (7 vibes, campaign states, gig mode) vs generic creator tools

---

*This document covers ABLE's pre-build state — specs are complete, vision is defined, execution is in progress.*
*Review the live product as current state. Review this document as the intended state.*
