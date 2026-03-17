# Free Tools and APIs for ABLE
**Status: Research complete — March 2026**
**Scope: Every free or freemium API/library worth considering for ABLE's build**

> This document covers what's real, what's deprecated, what's a weekend win, and what to avoid entirely. Researched from primary sources and developer docs, not guesswork.

---

## Contents

1. [Part 1 — Easy Win APIs](#part-1--easy-win-apis-integrable-in-a-weekend)
2. [Part 2 — Cool / Fun Tier](#part-2--cool--fun-tier-phase-2-high-delight)
3. [Part 3 — The Don't-Build-Just-Embed Philosophy](#part-3--the-dont-build-just-embed-philosophy)
4. [Part 4 — Integration Priority Matrix](#part-4--integration-priority-matrix)
5. [Part 5 — APIs to Avoid and Why](#part-5--apis-to-avoid-and-why)

---

## Part 1 — Easy Win APIs (integrable in a weekend)

---

### Spotify Embed (oEmbed — no auth)

**What it does:** Renders a fully functional Spotify track, album, or playlist player as an iframe. No API key or OAuth needed.

**How ABLE uses it:** The primary player for release cards on `able-v7.html`. When an artist pastes a Spotify URL during onboarding (`start.html`), ABLE fetches the oEmbed response and renders the player automatically. No auth, no backend, works immediately.

**API type:** oEmbed
**Endpoint:** `https://open.spotify.com/oembed?url={spotify_url}`
**Cost:** Free, no limits documented
**Auth:** None required
**Integration complexity:** 🟢 Easy (1–2 hours)
**Cool factor:** Artists paste a link. The player appears. That's it. Fans don't leave the page to listen.

```js
// Example: fetch and inject a Spotify embed
const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`);
const data = await res.json();
document.getElementById('player').innerHTML = data.html;
```

**ABLE implementation note:** Already partially spec'd in `docs/systems/spotify-import/SPEC.md`. This is the embed side of that spec. The oEmbed endpoint returns an iframe snippet directly — drop it into the release card with no further processing.

---

### Bandsintown API

**What it does:** Returns an artist's upcoming (and past) tour dates, venue data, and ticket links. Read-only, free for non-commercial use with an `app_id`.

**How ABLE uses it:**
- **Auto-import shows:** On the admin Shows page, a button "Import from Bandsintown" hits the API and populates `able_shows` in localStorage. Artist saves minutes of manual entry.
- **Auto-enable gig mode:** On the morning of a show date, ABLE checks `able_shows` and auto-activates gig mode for 24 hours — without the artist needing to remember.
- **Fan-facing:** Upcoming shows section on `able-v7.html` displays confirmed tour dates sourced live from Bandsintown.

**API type:** REST (JSON)
**Endpoint:** `https://rest.bandsintown.com/artists/{artist_name}/events?app_id={YOUR_APP_ID}`
**Cost:** Free for non-commercial. Commercial licensing available.
**Auth:** `app_id` query parameter (free registration via Bandsintown for Artists)
**Rate limits:** Not publicly documented; reasonable usage assumed
**Integration complexity:** 🟢 Easy (2–3 hours)
**Cool factor:** "Your tour dates are already here" is a genuinely delightful onboarding moment.

**Also:** Bandsintown offers a JavaScript widget embed that requires zero API key — just copy/paste HTML. Useful as a fallback before API integration is built.

---

### Last.fm API

**What it does:** Artist biographies, similar artists, top tracks, listener counts, and Scrobble data. Completely free for non-commercial use.

**How ABLE uses it:**
- **Similar artists:** On `able-v7.html`, a "Fans of [Artist] also listen to..." widget that surfaces 4–6 related artists from the Last.fm similar-artists endpoint. Discovery without an algorithm.
- **Listener proof:** Display total Last.fm listeners as a low-key social proof signal ("Listened to by 142,000 people on Last.fm").
- **Admin analytics:** Pull play-count trends over time for artists who have significant Last.fm audiences.
- **Auto-populate bio:** If an artist has a Last.fm bio, pre-fill it during onboarding as a starting point.

**API type:** REST (JSON/XML)
**Endpoint base:** `https://ws.audioscrobbler.com/2.0/`
**Key endpoints:**
- `artist.getSimilar` — similar artists
- `artist.getInfo` — bio, listener count, play count
- `artist.getTopTracks` — top tracks by play count
**Cost:** Free (no published rate limit; Last.fm asks for "reasonable" usage)
**Auth:** API key (free registration at last.fm/api)
**Integration complexity:** 🟢 Easy (2–4 hours)
**Cool factor:** Last.fm data is artist-centric, not algorithmic. Its "similar artists" data is based on real listening patterns, not editorial curation — which aligns exactly with what ABLE stands for.

---

### MusicBrainz API

**What it does:** Open music encyclopaedia. Artist info, release metadata, ISRCs, recording credits, aliases, labels. Completely free, no API key required for basic queries.

**How ABLE uses it:**
- **Release import:** Artist enters an ISRC or Spotify URI during onboarding. ABLE queries MusicBrainz to auto-populate release title, date, label, track listing, and credits. Eliminates manual data entry.
- **Credits on release cards:** Fetch producer, mixer, and featured artist credits from MusicBrainz and display them on release cards — linking to their ABLE profiles when they exist (this feeds the freelancer discovery system).
- **Canonical metadata:** When artist enters a release name, MusicBrainz can confirm/correct the release date and label name.

**API type:** REST (JSON or XML)
**Endpoint base:** `https://musicbrainz.org/ws/2/`
**Key endpoints:**
- `/artist?query={name}` — search artists
- `/recording?query=isrc:{isrc}` — look up by ISRC
- `/release/{mbid}` — full release detail
**Cost:** Completely free, open data
**Auth:** No key required for read queries. Set `User-Agent` header to identify your app (their policy).
**Rate limit:** 1 request/second unauthenticated; higher with authentication
**Integration complexity:** 🟢 Easy (3–4 hours)
**Cool factor:** Real credits. Real metadata. Artists see their own releases populated automatically — this is not scraped data, it's curated by a community of music nerds who cared enough to do it properly.

---

### TheAudioDB API

**What it does:** Music metadata database with high-quality artwork — artist biographies, album artwork (high-res), music video links, genre tags, mood tags, and more.

**How ABLE uses it:**
- **Artwork fallback:** If an artist doesn't have their own profile artwork uploaded, fetch a high-quality image from TheAudioDB as a placeholder.
- **Album art for release cards:** Auto-populate release card artwork during onboarding.
- **Genre and mood tags:** Pull genre/mood data to surface in the admin analytics view.

**API type:** REST (JSON)
**Endpoint base:** `https://www.theaudiodb.com/api/v1/json/{api_key}/`
**Test key:** `2` (works for development and testing)
**Cost:** Free for development; $8/month Patreon for production/app store
**Auth:** API key in URL
**Rate limit:** 30 requests/minute (free tier)
**Integration complexity:** 🟢 Easy (2 hours)
**Cool factor:** The artwork quality is genuinely impressive. Artists whose releases already exist in the database get a profile that looks polished immediately.

---

### Setlist.fm API

**What it does:** Concert setlists and gigography — every song an artist played at every gig, going back decades. Free for non-commercial use.

**How ABLE uses it:**
- **"Past shows" section:** On `able-v7.html`, a collapsible "Past shows" block that pulls the artist's gigography from Setlist.fm. Fans browsing a new artist can see they've played 200 shows — this builds credibility.
- **Setlist preview:** For gig mode, ABLE could show the setlist from the artist's last show to set expectations for tonight.
- **Admin insight:** "You've played 47 shows in the last 12 months" — a motivating data point in the admin dashboard.

**API type:** REST (JSON)
**Endpoint base:** `https://api.setlist.fm/rest/1.0/`
**Key endpoints:**
- `/search/artists?artistName={name}` — find artist
- `/artist/{mbid}/setlists` — get setlists by MusicBrainz ID
**Cost:** Free for non-commercial (requires confirmation for commercial use)
**Auth:** API key in `x-api-key` header (free registration)
**Integration complexity:** 🟡 Medium (1 day — needs MusicBrainz MBID to look up artists reliably)
**Cool factor:** "You've played 3 times at Rough Trade East" is exactly the kind of real, specific detail that makes an artist profile feel alive rather than templated.

**Dependency note:** Works best paired with MusicBrainz (use MBID as the lookup key).

---

### Genius API

**What it does:** Song and artist metadata, annotations, and song-page URLs. Free tier available.

**Important limitation discovered in research:** The Genius API does **not** return lyrics directly. Lyrics are in the page HTML, not an API endpoint. This is a known gap in their public API.

**How ABLE uses it anyway:**
- **Link to lyrics page:** On a release card, a "Read lyrics" button linking to the Genius song page — zero friction for fans who want to follow along.
- **Artist annotations:** Genius has a rich annotation system where artists explain their own lyrics. ABLE could link to this as a "Behind the track" feature — artist voice, no third-party framing.
- **Song metadata:** Title, release date, featured artists, producers (pulled from Genius's structured data).

**API type:** REST (JSON)
**Endpoint base:** `https://api.genius.com/`
**Key endpoints:**
- `/search?q={song+artist}` — find a song
- `/songs/{id}` — get song metadata including Genius URL
**Cost:** Free tier (no documented rate limits for basic read operations)
**Auth:** Bearer token (free registration at genius.com/api-clients)
**Integration complexity:** 🟢 Easy (2 hours — scoped to metadata + URL linking only)
**Cool factor:** Linking artists to their own Genius annotations is underrated. It's their voice explaining their work — which ABLE should surface.

---

### Discogs API

**What it does:** The world's largest music database for physical releases — vinyl, CD, cassette. Artist discographies, release metadata, marketplace data, and labels.

**How ABLE uses it:**
- **Vinyl badge:** If an artist has vinyl releases in the Discogs database, ABLE displays a "Available on vinyl" badge on the release card, linking to the Discogs listing.
- **Discography depth:** Artists with long back-catalogues can see their full release history auto-populated from Discogs, avoiding manual entry.
- **Collectibility signal:** For older/legacy releases, show market value ("Original pressing: £45 on Discogs") — rare, but extremely cool for the right artist.

**API type:** REST (JSON)
**Endpoint base:** `https://api.discogs.com/`
**Key endpoints:**
- `/database/search?q={artist}` — search artists and releases
- `/artists/{id}` — artist detail
- `/releases/{id}` — release detail
**Cost:** Free for read operations (240 requests/minute per IP)
**Auth:** OAuth or user-token for search (free registration required)
**Integration complexity:** 🟡 Medium (OAuth setup takes a day; once done, queries are simple)
**Cool factor:** For any artist who has released vinyl, this is pure gold. It's the kind of detail their hardcore fans will notice and respect.

---

### AcoustID API

**What it does:** Audio fingerprinting — identify a recording from its audio waveform, matched against a database of 73 million fingerprints linked to MusicBrainz IDs.

**How ABLE uses it:**
- **"I uploaded this file — what is it?":** In the artist admin, if an artist uploads an audio file for their profile, ABLE could fingerprint it, identify the recording, and auto-populate all its metadata from MusicBrainz (title, release date, ISRC, credits).
- **Verification:** Cross-check that a track the artist claims to have released actually matches a known recording in the database.

**API type:** REST (JSON)
**Endpoint:** `https://api.acoustid.org/v2/lookup`
**Technology:** Chromaprint (open source fingerprint library)
**Cost:** Free (open source, 3 requests/second limit)
**Auth:** API key (free registration)
**Integration complexity:** 🔴 Complex — requires client-side audio processing with Chromaprint WASM, or server-side Chromaprint. Not a weekend job.
**Cool factor:** Extremely high — but save for later. This is a V3 feature.

---

### SoundCloud oEmbed

**What it does:** Embed any SoundCloud track, set, or user page as a player widget. No API key needed for oEmbed.

**How ABLE uses it:**
- **SoundCloud-native artists:** Some artists live on SoundCloud (DJ mixes, underground rap, experimental). ABLE should render their SoundCloud tracks as first-class content, not an afterthought.
- **Same oEmbed pattern:** Artist pastes a SoundCloud URL, ABLE fetches `https://soundcloud.com/oembed?url={url}&format=json` and injects the returned HTML.

**API type:** oEmbed
**Endpoint:** `https://soundcloud.com/oembed?url={url}&format=json`
**Cost:** Free, no rate limits documented
**Auth:** None required for oEmbed
**Integration complexity:** 🟢 Easy (1 hour — same pattern as Spotify oEmbed)
**Cool factor:** Treating SoundCloud artists as first-class citizens is a statement. Most link-in-bio tools treat Spotify as default and SoundCloud as an afterthought.

---

### Wavesurfer.js

**What it does:** Renders a visual audio waveform from an audio file or stream. Built on Web Audio API and HTML5 Canvas. No external API — pure JavaScript library, 7kb gzipped.

**How ABLE uses it:**
- **Release card waveform:** When an artist has a direct audio file (e.g., a preview WAV), render a waveform beneath the track title. Fans can see the shape of the track — where it builds, drops, gets quiet — before tapping play.
- **Clips feed:** On the clips/reels feed (see `docs/systems/reels-feed/SPEC.md`), a mini-waveform scrubber beneath audio clips.
- **Admin upload feedback:** When an artist uploads artwork or audio, animate a waveform as a loading state — it's thematic and feels considered.

**Library:** `https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.min.js`
**Cost:** Free, MIT licence, open source
**Auth:** None
**Integration complexity:** 🟢 Easy (2–3 hours for basic implementation)
**Cool factor:** A waveform is to an audio track what a thumbnail is to a video. It's informational and beautiful simultaneously.

```js
// Drop-in usage (no npm needed — CDN works)
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
const wavesurfer = WaveSurfer.create({ container: '#waveform', url: '/audio/track.mp3', waveColor: 'var(--color-accent)' })
```

---

### YouTube Data API v3

**What it does:** Video metadata, channel data, search, view counts, and more. 10,000 units/day free before quota is needed.

**How ABLE uses it:**
- **Video release cards:** Artist enters a YouTube URL; ABLE fetches the video title, thumbnail, view count, and description automatically via the API.
- **View count as social proof:** "3.2M views" beneath a music video card is meaningful. Fetch it from the API rather than asking the artist to type it.
- **Auto-import from channel:** "Connect your YouTube channel" in admin — ABLE scans recent uploads and suggests adding them to the profile.

**API type:** REST (JSON)
**Endpoint base:** `https://www.googleapis.com/youtube/v3/`
**Key endpoints:**
- `/videos?id={id}&part=snippet,statistics` — video detail + view count
- `/channels?id={id}&part=snippet,statistics` — channel info
**Cost:** Free — 10,000 units/day. A metadata fetch costs 1 unit; search costs 100 units.
**Auth:** API key (free via Google Cloud Console)
**Rate limit:** 10,000 units/day per project (resets midnight PT)
**Integration complexity:** 🟢 Easy (2–3 hours)
**Cool factor:** Auto-populating a music video card with real view counts makes the profile feel connected to the real world, not static.

**Budget note:** At 1 unit per video fetch, 10,000 units/day supports 10,000 video refreshes per day — more than enough for early ABLE at no cost.

---

### Samplette

**What it does:** A free browser tool that "shuffles YouTube" — searches for audio by genre, tempo, key, and maximum view count (to find obscure, unsampled tracks). Beloved by beatmakers and producers for finding rare samples. No official API exists.

**Current API/embed status:** No public API. No embed code. Samplette is a standalone web app. The "embed code" referenced on some third-party review sites appears to be a generic widget promotion, not official documentation.

**How ABLE could use it:**
- **Direct link, not embed:** On producer/beatmaker profiles (`admin.html` for artists who make beats), ABLE could include Samplette as a curated tool link under an "Inspiration" section — "Find samples" → opens Samplette in a new tab. No integration needed; it's a shortcut.
- **Future:** If Samplette ever adds an API or embed, ABLE could surface a "Sample finder" widget on the snap cards section for producers. Watch this space.

**Integration complexity:** 🟢 Easy (link only — 15 minutes)
**Note:** Samplette's value for ABLE is as a *curated recommendation* within the admin, not a technical integration. File it under "tools we endorse" for now.

---

### Music-Map (music-map.com)

**What it does:** Enters an artist name, renders a visual bubble map of related artists — clustered by similarity. The closer an artist appears to the centre, the more similar they are. It's built on the Gnod engine (a music recommendation network).

**Current API/embed status:** No public API. No official embed endpoint. The site is query-driven (`music-map.com/{artist_name}`) but there is no documented JSON API or embeddable widget. Various developers have scraped it, but there is no supported integration path.

**How ABLE could use it:**
- **Deep link, not embed:** On `able-v7.html`, a "Discover similar artists" button that opens `music-map.com/{artist_name}` in a new tab. Zero dev work. Real value for fans who want to go deeper.
- **Curation signal:** ABLE could curate a "soundalike" list on the artist profile manually (entered by the artist during onboarding) and use Music-Map as the inspiration source for building it — but the data doesn't flow via API.

**Integration complexity:** 🟢 Easy (deep link only — 15 minutes)
**Note:** Like Samplette, Music-Map's value is as an endorsed destination, not a technical integration. Both are things an artist profile should *point to*, not replicate.

---

## Part 2 — Cool / Fun Tier (Phase 2, high delight)

---

### audioMotion-analyzer

**What it does:** High-resolution real-time audio spectrum analyser. No dependencies, open source (AGPL-3.0). Renders a beautiful, customisable frequency visualisation from any Web Audio source. Can run on a `<canvas>` element directly in the browser.

**How ABLE uses it:**
- **Profile ambient visualiser:** When a Spotify or SoundCloud embed is playing, ABLE captures the audio via Web Audio API and renders a spectrum visualiser behind the top card — the profile *responds* to the music.
- **Gig mode visual:** During gig mode, a live audio visualiser could animate the top card background if the artist grants microphone access.
- **Admin preview:** When an artist previews their profile in admin, the visualiser runs from the embedded player to demonstrate the effect.

**Library:** `https://cdn.jsdelivr.net/npm/audiomotion-analyzer@latest/dist/audiomotion-analyzer.min.js`
**Cost:** Free, open source
**Integration complexity:** 🟡 Medium (1 day — Web Audio API capture from cross-origin iframes is restricted; may need a workaround)
**Cool factor:** Extremely high. A profile that breathes with the music is the kind of thing that screenshots get posted to Twitter and artists show to their friends.

**Technical note:** Capturing audio from a cross-origin Spotify or SoundCloud iframe is blocked by CORS. The visualiser works reliably when the artist uploads their own audio file — which is the safer initial implementation.

---

### Tonal.js

**What it does:** A complete music theory library in JavaScript. Notes, intervals, chords, scales, modes, key detection, chord progression generation. Pure functions, no dependencies, tree-shakeable.

**How ABLE uses it:**
- **Snap card enhancement:** Artists who want to share chord progressions in a snap card could use a visual chord diagram powered by tonal.js — type "Am - F - C - G" and get a rendered chord chart.
- **Key/BPM display:** If an artist uploads audio for a release and ABLE has the key (from MusicBrainz or manual entry), tonal.js can display related scale info, suggested chords — educational content for fans who play instruments.
- **Onboarding vibe selector:** The genre/vibe step in `start.html` could use tonal.js to map vibes to typical key signatures and tempos ("Melancholic indie → A minor, 85 BPM") as a soft suggestion.

**Library:** `https://cdn.jsdelivr.net/npm/tonal@latest/dist/tonal.min.js`
**Cost:** Free, MIT licence
**Integration complexity:** 🟡 Medium (1 day — library is simple; the UX design for how to surface it takes more thought)
**Cool factor:** Niche but profound. For musicians, seeing their chord progression rendered properly on their profile is a quiet signal that ABLE was built by people who understand music.

---

### Howler.js

**What it does:** Cross-browser audio playback library. Defaults to Web Audio API, falls back to HTML5 Audio. Handles formats, sprites, 3D positioning, streaming. 7kb gzipped.

**How ABLE uses it:**
- **Clips feed playback:** The reels/clips feed (`docs/systems/reels-feed/SPEC.md`) could use Howler.js for seamless audio playback between clips — no flicker, smooth transitions, volume fade.
- **UI sound design:** Subtle UI audio feedback (a soft chime when a fan signs up, a tactile click on the gig mode toggle) — Howler handles these reliably across all browsers.
- **Preview snippets:** For release cards without a Spotify embed, play a 30-second preview snippet directly from an MP3 URL using Howler — no player UI required.

**Library:** `https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js`
**Cost:** Free, MIT licence
**Integration complexity:** 🟢 Easy (2–3 hours for basic integration)
**Cool factor:** Silky-smooth audio transitions. The difference between Howler-powered playback and raw HTML5 Audio is immediately perceptible.

---

### Lottie Animations

**What it does:** Renders Adobe After Effects animations in the browser as lightweight JSON files. Typically 10x smaller than equivalent GIF or MP4. Open source (Airbnb, MIT licence).

**How ABLE uses it:**
- **Milestone moments:** When a fan sign-up hits a milestone (e.g., 100th fan), an animated burst plays in the admin dashboard — not a cheesy confetti explosion, something deliberate and tasteful.
- **Gig mode activation:** A brief, satisfying animation plays when an artist activates gig mode — the toggle becoming a spotlight or a ticket.
- **Empty state illustrations:** Empty states in the admin (no shows added yet, no fans yet) use Lottie animations instead of static icons — they loop subtly to draw attention without demanding it.
- **Loading states:** Replace generic spinners with music-relevant loading animations (a turntable, a waveform pulsing).

**Library:** `https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js`
**Free animation library:** lottiefiles.com — thousands of free animations, searchable by keyword
**Cost:** Free (library is open source; premium animations on LottieFiles cost money, but free library is large)
**Integration complexity:** 🟢 Easy (2 hours — pick animation, download JSON, render with `lottie.loadAnimation()`)
**Cool factor:** Animation is the difference between software that feels functional and software that feels alive.

---

### P5.js (Generative Visual Identity)

**What it does:** JavaScript creative coding library, inspired by Processing. Draws shapes, reacts to input, creates generative art. No dependencies. Extensively documented.

**How ABLE uses it:**
- **Artist-specific generative background:** Each artist could have a procedurally generated background pattern derived from their name or accent colour — something unique to them that no other artist has. Applied to the Glass theme header.
- **Fan-facing visual easter egg:** On the profile, holding a press on the artist photo triggers a brief generative art sequence — hidden, discoverable, shareable.
- **Waveform visualisation alternative:** For artists without Wavesurfer.js audio, P5.js can animate a fake waveform driven by metadata (tempo from MusicBrainz) that gives the impression of sound without requiring audio capture.

**Library:** `https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js`
**Cost:** Free, LGPL licence
**Integration complexity:** 🔴 Complex for generative identity (week+); 🟡 Medium for one-off animations
**Cool factor:** If ABLE ever becomes the platform that gives artists a generative visual identity, that's a genuine moat. Nobody else is doing this.

---

### Three.js (3D Glass Theme Background)

**What it does:** 3D rendering in the browser using WebGL. The industry standard for browser-based 3D.

**How ABLE uses it:**
- **Glass theme depth:** The Glass theme (`backdrop-filter: blur(28px)`) could use Three.js for a slow-moving, particle-based background that gives real depth to the artist card — like looking through frosted glass at a slowly rotating 3D object.
- **Pre-save countdown visual:** During pre-release mode, a Three.js countdown that feels sculptural rather than digital — the number hangs in 3D space.

**Library:** CDN via `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
**Cost:** Free, MIT licence
**Integration complexity:** 🔴 Complex (week+) — Three.js has a steep learning curve for anything non-trivial
**Cool factor:** Extreme — but this is a V3 or V4 feature. Don't build this until the product has product-market fit.

---

## Part 3 — The Don't-Build-Just-Embed Philosophy

The single most important technical decision for ABLE's integration layer: **try oEmbed first, always**.

### What is oEmbed?

oEmbed is an open standard (oembed.com). A consumer (ABLE) sends a URL to a provider's oEmbed endpoint and receives back a JSON object containing a title, thumbnail, and embed HTML — or in the case of a video, a fully formed `<iframe>`. The pattern is identical across all providers:

```
GET {provider_oembed_endpoint}?url={encoded_content_url}&format=json
```

The response always has the same shape:

```json
{
  "title": "...",
  "type": "video|rich|photo|link",
  "html": "<iframe ...></iframe>",
  "thumbnail_url": "https://...",
  "provider_name": "Spotify"
}
```

### Why this matters for ABLE

Every time an artist wants to show content from Platform X, the decision tree is:

1. **Does Platform X support oEmbed?** → Yes → Fetch + render. Weekend job. Done.
2. **Does Platform X support a simple embed iframe?** → Yes → Iframe it. 1 hour job. Done.
3. **Does Platform X have a read-only REST API?** → Yes → Build a lightweight fetch. 1–2 day job.
4. **None of the above?** → Direct link only. Don't build a custom scraper.

### Full list of platforms with oEmbed support (relevant to ABLE)

| Platform | oEmbed endpoint | Content types |
|---|---|---|
| Spotify | `https://open.spotify.com/oembed` | Tracks, albums, playlists, artists, podcasts |
| YouTube | `https://www.youtube.com/oembed` | Videos |
| Vimeo | `https://vimeo.com/api/oembed.json` | Videos |
| SoundCloud | `https://soundcloud.com/oembed` | Tracks, sets, users |
| Bandcamp | `https://bandcamp.com/oembed` | Albums, tracks |
| Twitter/X | (discontinued — see Part 5) | — |
| Instagram | Requires Facebook app review — skip | — |
| TikTok | `https://www.tiktok.com/oembed` | Videos |
| Twitch | No oEmbed — use direct embed iframe | Streams, VODs |
| Mixcloud | `https://www.mixcloud.com/oembed/` | Mixes, shows |
| Apple Music | No oEmbed — use MusicKit embed (complex, see Part 5) | — |

**ABLE's oembed-proxy Netlify function** (spec lives in `docs/systems/oembed-proxy/`): Because browser-side oEmbed fetches hit CORS, ABLE should run a tiny Netlify function that proxies the oEmbed request server-side. One function handles all providers. The artist-side code only ever calls `/.netlify/functions/oembed?url={url}` — and the function figures out which provider to call.

```js
// Netlify function: functions/oembed.js
export async function handler(event) {
  const url = event.queryStringParameters.url;
  const providers = {
    'open.spotify.com': 'https://open.spotify.com/oembed',
    'youtube.com': 'https://www.youtube.com/oembed',
    'youtu.be': 'https://www.youtube.com/oembed',
    'soundcloud.com': 'https://soundcloud.com/oembed',
    'vimeo.com': 'https://vimeo.com/api/oembed.json',
    'bandcamp.com': 'https://bandcamp.com/oembed',
    'mixcloud.com': 'https://www.mixcloud.com/oembed/',
    'tiktok.com': 'https://www.tiktok.com/oembed',
  };
  const host = new URL(url).hostname.replace('www.', '');
  const endpoint = Object.entries(providers).find(([k]) => host.includes(k))?.[1];
  if (!endpoint) return { statusCode: 404, body: 'Unknown provider' };
  const res = await fetch(`${endpoint}?url=${encodeURIComponent(url)}&format=json`);
  const data = await res.json();
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
}
```

This is the backbone of ABLE's media embedding system. Build it early. Everything else plugs into it.

---

## Part 4 — Integration Priority Matrix

Scored 1–10. Priority labels: P0 (ship with V1), P1 (ship V1+), P2 (Phase 2), P3 (nice-to-have).

| Tool / API | Artist value | Fan delight | Build effort | Strategic fit | Priority |
|---|---|---|---|---|---|
| **Spotify oEmbed** | 10 | 9 | 🟢 Easy | Core | **P0 — V1** |
| **oEmbed proxy (Netlify fn)** | 10 | 8 | 🟢 Easy | Core infrastructure | **P0 — V1** |
| **YouTube oEmbed + Data API v3** | 9 | 8 | 🟢 Easy | Core | **P0 — V1** |
| **SoundCloud oEmbed** | 7 | 7 | 🟢 Easy | Core | **P0 — V1** |
| **Bandsintown API** | 9 | 7 | 🟢 Easy | Core — shows + gig mode | **P0 — V1** |
| **Wavesurfer.js** | 8 | 9 | 🟢 Easy | Profile polish | **P1** |
| **Last.fm API** | 7 | 8 | 🟢 Easy | Discovery + social proof | **P1** |
| **MusicBrainz API** | 8 | 5 | 🟢 Easy | Import + credits | **P1** |
| **Howler.js** | 6 | 8 | 🟢 Easy | Audio UX | **P1** |
| **Lottie animations** | 5 | 9 | 🟢 Easy | Delight layer | **P1** |
| **TheAudioDB API** | 7 | 6 | 🟢 Easy | Artwork + metadata | **P1** |
| **Genius API** | 6 | 7 | 🟢 Easy | Lyrics linking | **P1** |
| **Tonal.js** | 7 | 6 | 🟡 Medium | Musician-specific features | **P2** |
| **Discogs API** | 6 | 7 | 🟡 Medium (OAuth) | Physical release credibility | **P2** |
| **Setlist.fm API** | 7 | 8 | 🟡 Medium | History + credibility | **P2** |
| **Bandcamp oEmbed** | 6 | 6 | 🟢 Easy | Indie artist coverage | **P2** |
| **audioMotion-analyzer** | 5 | 9 | 🟡 Medium | Visual delight | **P2** |
| **Samplette (deep link)** | 6 | 4 | 🟢 Easy (link only) | Producer tool endorsement | **P2** |
| **Music-Map (deep link)** | 5 | 7 | 🟢 Easy (link only) | Fan discovery endorsement | **P2** |
| **AcoustID fingerprinting** | 8 | 3 | 🔴 Complex | Smart import | **P3** |
| **P5.js generative art** | 6 | 8 | 🔴 Complex | Visual identity differentiation | **P3** |
| **Three.js 3D backgrounds** | 4 | 8 | 🔴 Complex | Glass theme depth | **P3** |
| **Mixcloud oEmbed** | 5 | 5 | 🟢 Easy | DJ/mix coverage | **P3** |
| **TikTok oEmbed** | 5 | 6 | 🟢 Easy | Viral content display | **P3** |

---

## Part 5 — APIs to Avoid (and Why)

---

### Twitter / X API

**Why to avoid:** The free tier was removed in early 2023. Current pricing: Basic at $100/month (or $200/month by some sources) for 10–15k read operations. For what ABLE would use it for (showing an artist's recent tweets), the ROI is essentially zero. Artists can link to their X profile directly.

**The trap:** It feels like it should be easy ("just show their tweets") but the API cost, app review process, and token management make it a distraction. Skip entirely.

---

### Facebook Graph API

**Why to avoid:** Requires app review before accessing any meaningful data. The review process can take weeks and may require policy documentation. Facebook's relevance to independent musicians continues to decline. Meta's platform ecosystem is actively hostile to third-party developers.

**The trap:** Some older artists still use Facebook Pages actively. If ABLE ever needs to show Facebook content, use a direct link — not an API integration.

---

### Instagram Basic Display API (deprecated) / Instagram Graph API

**Why to avoid:** The Basic Display API was deprecated in December 2024. The Graph API (via Instagram Business/Creator accounts) requires Facebook app review and only works for business accounts. Even then, it's restricted to the account owner's own content and has complex token refresh requirements.

**The trap:** "Artists post their best photos on Instagram" — yes. But the API path is too painful. Use Instagram oEmbed for individual posts (it works without auth) but don't build a "connect your Instagram" feed feature without significant engineering budget.

---

### Apple Music API / MusicKit

**Why to avoid for now:** Requires a paid Apple Developer Programme account (£79/year). Requires a developer token signed with a private key. The web embed (MusicKit.js) is complex to configure and requires a different auth flow from the native iOS SDK. Apple Music's embed options are more limited than Spotify's.

**The trap:** It looks like Spotify-equivalent. It is not. Build Spotify first. If there's genuine user demand for Apple Music embeds, revisit in V2.

**Exception:** The Apple Music embed badge (the static "Listen on Apple Music" button image) costs nothing and requires no API. Use that freely as a CTA link.

---

### Shazam API

**Why to avoid:** Shazam does not have a public developer API. The unofficial API endpoints available on RapidAPI are unofficial, reverse-engineered, and have been known to break without warning. Apple acquired Shazam in 2018 and has kept the data closed.

**The trap:** "What if artists could prove their track was Shazammed 10,000 times?" — this data is not accessible. Don't build around it.

---

### TikTok API (data layer — not oEmbed)

**Why to avoid for data:** TikTok's developer API is extremely restricted. Artist data, view counts, and content management are not accessible through a public API. The only useful TikTok integration is oEmbed for embedding individual video posts (which works, and is in the matrix above as P3).

**The trap:** "TikTok is where artists break." True. But TikTok deliberately keeps its data opaque. No useful artist analytics are accessible via API. Don't attempt to build a TikTok analytics view in ABLE — it will break and the data will be wrong.

---

### AcousticBrainz

**Why to avoid (specifically for new projects):** AcousticBrainz stopped accepting new data submissions in 2022. The API still exists and returns historical audio analysis data (tempo, key, mood, danceability), but the database has not been updated in 3+ years. Coverage for releases after mid-2022 is essentially zero.

**The trap:** The API documentation still exists and looks functional. But for any artist who released music in the last 3 years, the data won't be there. Use TheAudioDB for genre/mood tags instead — it's actively maintained.

---

### Every Noise at Once

**Why to avoid for integration:** Every Noise at Once was created and maintained by a single Spotify employee (Glenn McDonald) who was laid off in December 2023. The site exists as a read-only archive but is no longer updated. There is no official API. Scrapers exist but are fragile.

**What to use instead:** Last.fm `artist.getSimilar` provides the "related artists" functionality in a supported, maintained form.

---

## Appendix A — Quick Start Code Patterns

### Universal oEmbed fetch (browser, via Netlify proxy)
```js
async function fetchOEmbed(url) {
  const res = await fetch(`/.netlify/functions/oembed?url=${encodeURIComponent(url)}`);
  if (!res.ok) return null;
  return res.json(); // { html, title, thumbnail_url, provider_name, type }
}
```

### Auto-detect pasted URL and render
```js
const EMBED_PATTERNS = {
  spotify: /open\.spotify\.com|spotify\.link/,
  youtube: /youtube\.com\/watch|youtu\.be\//,
  soundcloud: /soundcloud\.com\//,
  vimeo: /vimeo\.com\//,
  bandcamp: /\.bandcamp\.com\//,
};

function detectPlatform(url) {
  for (const [platform, pattern] of Object.entries(EMBED_PATTERNS)) {
    if (pattern.test(url)) return platform;
  }
  return null;
}
```

### Bandsintown shows fetch
```js
async function fetchShows(artistName) {
  const appId = 'ABLE_APP_ID'; // register free at artists.bandsintown.com
  const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events?app_id=${appId}`;
  const res = await fetch(url);
  return res.json(); // array of event objects
}
```

### Last.fm similar artists
```js
async function fetchSimilarArtists(artistName, limit = 6) {
  const key = 'YOUR_LASTFM_KEY';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&artist=${encodeURIComponent(artistName)}&api_key=${key}&format=json&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.similarartists?.artist ?? [];
}
```

---

## Appendix B — Cost Summary

| Integration | Monthly cost at ABLE early scale | Notes |
|---|---|---|
| Spotify oEmbed | £0 | No auth, no limits |
| SoundCloud oEmbed | £0 | No auth, no limits |
| YouTube oEmbed | £0 | No quota cost for oEmbed |
| YouTube Data API v3 | £0 | 10k units/day free |
| Bandsintown API | £0 | Free for non-commercial |
| Last.fm API | £0 | Free, reasonable use |
| MusicBrainz API | £0 | Open data |
| TheAudioDB API | £0 dev, ~£6/mo production | $8 Patreon for production key |
| Genius API | £0 | Free tier |
| Setlist.fm API | £0 | Free for non-commercial |
| Discogs API | £0 | Free read with user token |
| Wavesurfer.js | £0 | Open source library |
| Tonal.js | £0 | Open source library |
| Howler.js | £0 | Open source library |
| Lottie | £0 | Open source library; free animations on LottieFiles |
| audioMotion-analyzer | £0 | Open source library |
| **Total (V1 scope)** | **~£0** | TheAudioDB Patreon if going to production |

---

*Document authored March 2026. API statuses verified from primary sources. Re-verify Songkick API availability before building — they were not accepting new API applications as of March 2026 (check songkick.com/developer for current status).*
