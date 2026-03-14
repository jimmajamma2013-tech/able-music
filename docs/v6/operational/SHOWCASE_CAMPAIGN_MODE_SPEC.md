# ABLE — Showcase Mode: Definitive Spec
**Created:** 2026-03-14
**Status:** ACTIVE

---

## 1. Product Framing

Showcase Mode is the campaign surface of an artist's ABLE profile. It is publicly named **Showcase Mode** — never "press pack," never "EPK." Those terms are industry shorthand for a 2012-era PDF attachment. Showcase Mode is a living, shareable, context-aware view of the artist's profile that speaks directly to whoever needs to see it.

There is one Showcase Mode per artist profile. The artist selects a **context** that changes the emphasis, section order, and hero framing — but the underlying data is the same. No copy-paste, no duplicate maintenance.

**Three contexts in v1:**

| Context | Who it's for | What it leads with |
|---|---|---|
| **Release** | DSPs, playlists, fans, music press | The release — artwork, stream, credits |
| **Booking** | Promoters, festival bookers, venues | The live performance — clip, tour dates, rider |
| **Press** | Journalists, blogs, radio, labels | The artist — photo, bio, press shots, quotes |

A fourth context — **Project** — for special campaigns, collabs, and limited releases, is deferred to Phase 2.

The artist picks which context is active. They can switch at any time. The link stays the same.

---

## 2. Relationship to Main Profile

Showcase Mode is not a separate page. It is not an export. It is a different lens on the same profile data.

**URL model:**

| Destination | URL |
|---|---|
| Fan-facing profile | `able.fm/[handle]` |
| Showcase (public) | `able.fm/[handle]/showcase` |
| Showcase (private, token-gated) | `able.fm/[handle]/showcase?t=[token]` |

The token is a short random string (8–12 chars) generated at creation time and stored in the profile. Token-gated showcases are not indexed by search engines. Public showcases can be.

**What stays the same across fan profile and showcase:**
- All data: releases, bio, shows, credits, World Map moments, collaborator links

**What changes in showcase:**
- Section order — rearranged per context
- Hero content — replaced by the artist's chosen Showcase Object
- Which sections are shown — some sections are suppressed or promoted per context
- CTA wording — tuned to the context recipient
- Intro copy — a separate showcase-specific bio, editable independently from the fan bio
- Top card — always the Showcase Object, never auto-computed from the campaign state machine

When Showcase Mode is active (someone visiting `/showcase`), the profile's Campaign HQ state machine is bypassed entirely. The Showcase Object is always shown. The artist controls what the recipient sees.

---

## 3. The Top Card as Campaign Nucleus

In Showcase Mode, the top card is not derived from the artist's current campaign state. It is selected explicitly. The artist picks a **Showcase Object** — the single thing that leads the showcase. Everything else flows from it.

**Showcase Object options:**

| Type | What it shows |
|---|---|
| **Release** | Release artwork (full-bleed), track preview player, stream CTA and pre-save CTA |
| **Video** | Embedded music video, live session, or live clip — autoplays muted |
| **Performance moment** | Upcoming show or tour announcement — date, venue, ticket CTA |
| **Collaborator credit chain** | The people who made the work — for industry and booking contexts |
| **Custom statement** | Artist-supplied image + one headline + one supporting line |

The Showcase Object is the first thing the recipient sees. It is full-bleed, editorial, and unhurried. It earns attention before asking for anything.

Below the Showcase Object, the supporting content flows in sequence based on the selected context.

---

## 4. Section Structure Per Context

### Release Context

Designed for: music press, playlist pitching, DSP editorial, label A&R, fans arriving from a campaign link.

1. **Showcase Object** — release artwork, track preview, stream CTA (primary), pre-save CTA (if applicable)
2. **Artist intro** — 2-sentence version of bio, editable separately from fan bio (max 280 chars)
3. **Press quotes** — optional, max 3, written and attributed by the artist. Text + attribution only. No source URL required.
4. **World Map / upcoming moments** — any moments within 60 days appear here automatically
5. **Credits** — the people who made this release, drawn from the release credits on the full profile
6. **Selected back catalogue** — max 3 releases chosen by the artist ("also by this artist")
7. **Contact / enquiry** — email or contact link, labelled plainly

### Booking Context

Designed for: promoters, festival programmers, venue bookers, agents, support act coordinators.

1. **Showcase Object** — live performance clip or performance image
2. **Artist intro** — booking-specific version. Practical, specific: "plays 45-min sets, available for festivals and headline shows, UK and Europe"
3. **Upcoming shows / tour dates** — pulled from profile events, ordered chronologically
4. **Technical rider note** — optional free text, max 200 chars. For broad-strokes only ("full band, 5-piece. FOH mix required. Backline provided."). Not a technical spec document.
5. **Past shows / notable venues** — self-reported, max 6 entries (venue/event name + year)
6. **Selected release** — one release, chosen by the artist — what they're currently touring around
7. **Credits and collaborators** — band members and key collaborators relevant to live show
8. **Booking contact CTA** — primary action, clearly labelled with booking-specific language

### Press Context

Designed for: journalists, music bloggers, radio producers, PR, label marketing teams.

1. **Showcase Object** — best press photograph or music video
2. **Artist intro** — press-approved short bio, separately editable. Reads like a well-crafted press bio, not a fan welcome.
3. **Selected releases** — max 3, each with stream link
4. **Press quotes or co-signs** — max 3, text + attribution
5. **Downloadable assets** — up to 5 hosted image links with labels (e.g. "Press shot — portrait, hi-res"). Artist provides the hosting URLs. ABLE links to them with a download prompt. No file hosting in v1.
6. **World Map** — included if the artist has upcoming moments within 60 days
7. **Contact / enquiry** — press/PR contact, labelled as such

---

## 5. Share System

### Link Types

Two link types. Both are generated from the admin Showcase section.

**Public showcase link** (`able.fm/[handle]/showcase`):
- Visible to anyone.
- Can be indexed by search engines.
- Shareable in bio, email signatures, social profiles, press releases.
- Always reflects the currently active context.

**Private showcase link** (`able.fm/[handle]/showcase?t=[token]`):
- Only those with the link can view it.
- Not indexed.
- Intended for specific outreach: "Here's my current booking showcase — for your eyes only."
- Token is generated once, stored in profile. Regenerating the token invalidates all previous private links.

The artist can have one showcase per context (Release, Booking, Press), each with its own private token if needed.

### OG Tags

Showcase links generate context-specific Open Graph metadata distinct from the fan profile. Pulled from the Showcase Object.

- **OG image**: artwork or photo from the Showcase Object
- **OG title**: `[Artist Name] — [context line]`
  - Release: "[Artist Name] — [Release Title]"
  - Booking: "[Artist Name] — available for bookings"
  - Press: "[Artist Name] — press"
- **OG description**: showcase intro copy, truncated to 155 characters
- **OG URL**: the showcase URL (public or private)

When shared in iMessage, WhatsApp, Slack, or email, the link unfurls correctly and looks intentional.

### Share Cards

The artist generates a portrait-format share card from admin. This is a canvas export, rendered client-side in v1 (no server dependency). It is designed to be screenshotted and posted to Instagram Stories, but can be saved and used anywhere.

**Card anatomy:**
- Background: black, or vibe-coloured (artist's accent) — artist chooses
- Artwork/photo from the Showcase Object — fills the upper ~60% of the card
- Artist name in display font (Barlow Condensed)
- One short context line: "New EP out now" / "Available for bookings" / "Press enquiries open"
- `able.fm/[handle]/showcase` printed small at the bottom
- No ABLE logo — the artist's branding takes precedence on this card

The card renders as a downloadable file. In v1, this is a client-side canvas export (PNG). The artist downloads it directly from the admin panel.

When shared via Instagram Story with a link sticker, the destination is `able.fm/[handle]/showcase`. Traffic arriving from story shares lands in Showcase Mode — not the fan profile — matching the intent of the share.

---

## 6. Admin UX

Showcase Mode has its own dedicated section in admin, clearly labelled **"Showcase"** — not buried in settings, not treated as an afterthought.

The target flow is under 2 minutes for a simple showcase.

### Step-by-step admin controls

**1. Showcase Object selector**
Browse existing releases, videos, and moments from the profile. Select one as the showcase lead. Alternatively, add a custom image + headline + one supporting line (custom statement type). The selected object is previewed immediately.

**2. Context selector**
Three-way radio: Release / Booking / Press. Switching context updates the section order and CTA labels in the preview. The same Showcase Object can be used across multiple contexts.

**3. Showcase intro editor**
A text field, separate from the fan bio. Max 280 characters. Pre-populated with the fan bio on first use — the artist then edits it to suit the context. A single intro field is shared across contexts in v1; the artist updates it when switching.

**4. Press quotes editor** (Release and Press contexts)
Add up to 3 quotes. Each entry: quote text + attribution (e.g. "The Line of Best Fit"). No source URL required. Reorderable by drag. Optional — if no quotes are added, the section is suppressed.

**5. Technical rider note** (Booking context only)
Free text field, max 200 chars. Optional. Appears in the Booking showcase below tour dates. If empty, the section is suppressed.

**6. Past shows input** (Booking context)
Up to 6 entries. Each entry: venue or event name + year (e.g. "Green Man Festival, 2024"). Free text, self-reported. No verification.

**7. Downloadable assets** (Press context)
Up to 5 entries. Each entry: a label (e.g. "Press shot — portrait, 300dpi") + a URL the artist provides. ABLE renders these as labelled download links in the Press showcase. Artist is responsible for hosting the files.

**8. Link type toggle**
Public / Private. If Private is selected, the token is displayed and copyable. A "Regenerate token" button invalidates the old token and creates a new one. The artist is warned that regenerating the token will break any previously shared links.

**9. Generate share card**
A button opens a card preview overlay. The artist sees a portrait preview. They choose: black background or accent-coloured background. One click: Download PNG. No other interaction needed.

**Preview toggle**
Above the admin section, three tabs: "See as press" / "See as booker" / "See as fan." Each tab shows a live preview of how the showcase (or fan profile) renders for that recipient. The fan view shows the standard fan profile, not the showcase — reinforcing the distinction.

---

## 7. Landing Page Role

The Showcase Mode feature earns one moment on the landing page, positioned after the World Map demo and before the light theme panel.

**Copy hook (one line, no more):**
*"Fan-ready. Booking-ready. Press-ready. One living profile."*

**Optional demo panel:**
A static phone render showing the Showcase Mode view — editorial full-bleed release artwork, short press intro, one press quote tile. The phone cycles through three states: fan profile → showcase (release) → showcase (press). Cycle duration: 3 seconds per state, crossfade. No interaction required — this is visual proof, not a demo.

The landing page never uses the words "EPK" or "press pack." It uses "showcase" or "campaign." These are the only permitted terms in marketing copy.

---

## 8. V1 vs Deferred

### V1 — Build This

| Feature | Notes |
|---|---|
| Three contexts: Release, Booking, Press | Context selector in admin |
| Showcase Object selector | Pick from existing profile content or add custom |
| Showcase intro editor | Separate from fan bio, max 280 chars |
| Press quotes (max 3) | Text + attribution, no URL needed |
| Past shows (max 6) | Self-reported, Booking context only |
| Technical rider note (max 200 chars) | Booking context only |
| Downloadable assets (max 5 links) | Press context, artist-hosted URLs |
| Public showcase link | Indexable, always active |
| Private / token showcase link | Token-gated, not indexed |
| OG tag customisation for showcase URL | Pulled from Showcase Object |
| Share card (client-side canvas export) | PNG download, no server required |
| Admin section with preview toggle | "See as press / booker / fan" |
| Campaign state machine bypass on /showcase | Showcase Object always shown |

### Deferred — Phase 2 and Beyond

| Feature | Reason for deferral |
|---|---|
| Project context | Scope — adds complexity for v1, less common use case |
| Server-side share card generation | Requires server infrastructure not in v1 |
| Animated share card | Complexity |
| Instagram Story template builder | Requires native integration or third-party |
| Showcase analytics (views, duration, referrals) | Backend required |
| Showcase scheduling (active from / to dates) | Low-priority edge case |
| Password-protected showcase | Token is sufficient for v1 |
| Custom domain showcase (band.com/press → ABLE) | DNS complexity, later |

### Never

| Feature | Reason |
|---|---|
| PDF export / printable one-sheet | 2012 |
| "Press kit request" form | Too transactional — misses the spirit of direct contact |
| Ratings or endorsement system | Wrong social mechanic for this product |
| Paid "verified press" tier | No |
| ABLE logo on share card | Artist branding takes precedence |

---

## 9. Integration with ABLE

**Artist profile admin bar:** a Share icon (not a button labelled "Share") opens the showcase generation flow as a tray from the bottom. The full Showcase section is also accessible from the main admin nav.

**Release cards:** each release in admin has a contextual option — "Use as Showcase Object." Tapping it takes the artist directly to the Showcase section with that release pre-selected.

**World Map:** upcoming moments within 60 days are included automatically in Release and Booking showcases. No manual action required. If there are no upcoming moments, the section is suppressed.

**Credits:** credits attached to the featured release are pulled automatically into the Release showcase credits section. In the Booking showcase, the artist manually curates collaborators relevant to live shows.

**Campaign HQ / state machine:** when a visitor arrives at `/showcase`, the state machine is bypassed. The Showcase Object is shown regardless of the artist's current campaign state (pre-release, live, gig mode, etc.). The artist's campaign logic runs only on the fan profile (`able.fm/[handle]`).

**"People in my world":** the collaborator connections section is surfaced in the Press showcase — it signals that the artist has verified industry relationships. This is read-only in the showcase; it reflects the live connections data.

**Fan sign-up:** the fan sign-up module is suppressed in Showcase Mode. The intent of a showcase visitor is different from a fan arriving from a social bio link. The primary action in Showcase Mode is the context-appropriate CTA (stream, book, enquire) — not fan capture.

---

## 10. Summary: The 10/10 System

Showcase Mode is complete when an artist can do all of the following without friction:

1. **Select** a Showcase Object from their existing profile content in under 30 seconds
2. **Pick** a context (Release, Booking, Press) with a single tap
3. **Edit** a short intro that speaks directly to the recipient — in 2 minutes or less
4. **Add** up to 3 press quotes without needing source URLs
5. **Copy** a public link and a private link from the same admin screen
6. **Generate** a share card that looks like the artist's own branding — not a tool's
7. **Preview** how the showcase reads as press, as a booker, and as a fan from one toggle
8. **Trust** that when anyone follows the link, they land in the right context automatically
9. **Know** that their fan profile is completely unaffected — same data, different lens
10. **Send it** — to a journalist, a booker, a label — and feel like it represents them honestly

This is the standard. Showcase Mode is ready when it clears all ten without workarounds.

---

*This spec is the single source of truth for Showcase Mode decisions. Amendments must update this document directly.*
