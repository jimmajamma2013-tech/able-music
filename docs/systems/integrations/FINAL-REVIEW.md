# Integrations — Final Review
**Date: 2026-03-16 | System score: 4/10 (current) → 9/10 (P2 complete)**

---

## Where the integrations system stands

The foundations are correct. The oEmbed proxy handles YouTube, SoundCloud, and Bandcamp embeds well. The Spotify import function is properly architected and complete — it just needs to be deployed. The data model (`able_shows`, `able_v3_profile`, `able_clicks`) is designed to receive import data cleanly.

The gap is not in the architecture. It is in two specific integrations that haven't been built:
1. Events auto-import (Ticketmaster Discovery API)
2. Linktree import

These two missing pieces represent the biggest onboarding friction points for ABLE's target artists.

---

## The best integration investment: Ticketmaster Discovery API (events)

For any artist with an active touring presence — which is the majority of ABLE's audience — manually entering upcoming shows is the most painful part of onboarding. Five shows takes 10 minutes. Twenty shows takes 40 minutes. For an artist who just finished a tour, this is a real reason not to switch.

The Ticketmaster Discovery API solves this with:
- A single free platform-wide API key (no per-artist setup)
- A two-step lookup: artist name → attraction ID → events
- Coverage of ~80% of UK independent artists playing ticketed venues
- Clean JSON: event name, date, venue, city, ticket URL

This is a 4-hour build that removes 40 minutes of artist friction. That is one of the best effort-to-impact ratios in the entire product.

**Important correction from the research:** Bandsintown was originally planned as the primary events integration, but their API keys are per-artist — a significant friction point that undermines the zero-setup goal. Ticketmaster is the correct primary path. Bandsintown becomes an opt-in secondary for artists who already maintain their Bandsintown profile.

---

## The second best investment: Linktree import

ABLE is directly replacing Linktree. The majority of ABLE's acquisition targets have a Linktree in their bio right now. If switching means manually re-entering every CTA, many artists won't bother.

A Linktree importer removes that cost entirely. The artist pastes their Linktree URL. ABLE reads the public page (Linktree pages embed link data in a `__NEXT_DATA__` JSON script tag — no scraping, no API required), shows a preview of the links, and the artist confirms which ones to import.

This is a 4-hour build with an enormous onboarding impact. It should be in V1.

---

## The third best investment: Spotify deployment

The Spotify import function is already built. The full spec is at `docs/systems/spotify-import/SPEC.md`. All that's needed is Netlify deployment + environment variable configuration. The build is done. The value is sitting uncommitted.

---

## What NOT to integrate

These are firm decisions, not soft suggestions:

**Facebook API:** Requires Business API access, ongoing costs, privacy scrutiny. The link paste for Facebook pages is sufficient.

**Twitter/X API:** Free tier is severely rate-limited since 2023. Not viable for production use. Link paste is the right answer.

**AI song generation (Suno, Udio, AudioCraft):** ABLE's artists create original music. Integrating tools that generate music would contradict the brand at a values level. Both Suno and Udio are in active RIAA litigation. Do not touch.

**Any platform charging ABLE recurring API fees for per-call use:** The integrations stack must be economically sustainable. Ticketmaster (free), Spotify (free), Last.fm (free), YouTube (free) — the primary integrations cost nothing. Keep it that way.

**DistroKid and other distributors:** No public API exists. The only play is ISRC-based metadata via MusicBrainz (async, sparse data for emerging artists). Build the educational prompt instead ("Are you registered with PRS? Here's why it matters.").

---

## Honest note on Spotify monthly listeners

Multiple ABLE docs have referenced "Spotify monthly listeners" as an import target. This number does not exist in any public Spotify API endpoint. It has never been available. The API exposes `followers.total` (a different, deprecated metric) and `popularity` (a 0–100 integer, also deprecated).

The right answer for a reach metric in admin.html is Last.fm `artist.stats.listeners` — 30-day unique listeners, free, no per-artist setup. Label it "Last.fm listeners" and surface it only in the artist's private dashboard. Never present it as "Spotify monthly listeners" — that is inaccurate and will erode trust when artists notice the discrepancy.

---

## Final scoring

| Integration | Score | Notes |
|---|---|---|
| Spotify import | 6/10 | Function built, not deployed |
| YouTube oEmbed | 7/10 | Correct ceiling given no public data API |
| SoundCloud oEmbed | 7/10 | Correct ceiling |
| Bandcamp oEmbed | 7/10 | Correct ceiling (closed API, intentional) |
| Ticketmaster/events | 0/10 | Missing. Build immediately. |
| Instagram | 5/10 | Link paste correct. UTM tracking missing. |
| TikTok | 5/10 | Same as Instagram. |
| Stripe | 2/10 | Architecture correct, not wired |
| Linktree import | 0/10 | Missing. High-value build. |
| DistroKid/distributor | 0/10 | No viable API. Educational prompt instead. |

**Current overall: 4/10**
**After P0 + P1 complete: 8/10**

The integrations system will be at 8/10 — which is the right ceiling for a V1 product. Not everything needs to be integrated. The goal is zero-friction onboarding for 80% of artists, and that is achievable with Spotify + Ticketmaster + Linktree import.

---

## The question to ask at every integration decision

"Does this integration remove friction for the artist, or does it add complexity for ABLE?"

Ticketmaster: removes friction. Build it.
Linktree: removes friction. Build it.
Spotify: removes friction. Deploy it.
Facebook API: adds complexity, no meaningful artist value. Skip.
DistroKid: adds complexity, no viable path. Educational prompt instead.
AI song generation: off-brand, legal risk, adds complexity. Hard no.

Stay disciplined to this question. The integrations stack at 9/10 looks like: Spotify + Ticketmaster + Linktree + Last.fm + UTM tracking + YouTube Data API + Bandsintown opt-in + Mailchimp export. That is a focused, achievable list with no waste.
