# SEO + Open Graph System — Analysis
**Date: 2026-03-15**
**Overall score: 5.2/10**

---

## What this doc is

An honest audit of the current SEO and Open Graph state across all ABLE pages. Scored across 10 dimensions. The most commercially important dimension is OG image quality on able-v7.html — this is what every artist's Instagram/TikTok/Twitter share preview depends on.

---

## Scores by dimension

### 1. Title tags — 6/10

**able-v7.html**: `injectSEO()` runs on page load and sets `document.title` to `"[Name] — ABLE"`. Pattern is correct but not quite right — `"Nadia — ABLE"` is weaker than `"Nadia — Music, shows & more | ABLE"`. The keyword surface is thin.

**landing.html**: `"ABLE — Your fans. Direct."` — good, punchy, differentiating. Could be slightly stronger for search intent ("link in bio for musicians" is the money keyword).

**admin.html**: `"Dashboard — ABLE"` — generic, but this page should never be indexed so it doesn't matter.

**start.html**: `"ABLE — Create your page"` — noindex set, so irrelevant for SEO but fine functionally.

**fan.html**: `"ABLE — Your feed"` — no noindex tag. This is a personal dashboard; it must not be indexed.

---

### 2. Meta description — 5/10

**able-v7.html**: Static fallback in HTML is `"Artist profile powered by ABLE"`. `injectSEO()` sets `og:description` via `setMeta()` but does **not** update the `<meta name="description">` tag — only OG tags. The regular meta description seen by Google and most crawlers remains the generic fallback. This is the key gap.

**landing.html**: `"A page that moves with your music. Pre-save before the drop, streaming on release day, tickets on show night. Own the relationship — no algorithm in the middle."` — genuinely good. Specific, differentiated, covers real features. 9/10 on its own.

**admin.html**: No meta description. Not needed given noindex requirement, but noindex is also missing (see §9).

**start.html**: `"Set up your ABLE artist page in minutes. Free."` — fine for a noindex page.

**fan.html**: No meta description. No noindex. Both missing.

---

### 3. OG title — 6/10

**able-v7.html**: Set dynamically by `injectSEO()` as `"[Name] on ABLE"`. Works, but misses an opportunity — `"Nadia on ABLE"` tells a sharer's followers nothing about what they'll see. `"Nadia — new music, shows & support | ABLE"` is stronger for click-through.

**landing.html**: `"ABLE — Your fans. Direct."` — matches the title tag. Consistent and good.

Other pages: not set / not needed.

---

### 4. OG description — 6/10

**able-v7.html**: Set dynamically from `profile.bio`. If the artist has a bio this will be their words, which is the right approach. Two issues: (a) no character cap — a 400-character bio will spill out of the preview card on most platforms; (b) falls back to `"Music, events, and more — direct from the artist."` which is acceptable but generic.

**landing.html**: `"A page that moves with your music..."` — good.

---

### 5. OG image — 4/10

This is the most commercially important dimension. When an artist shares their ABLE link:
- The OG image is what people actually see in the share card
- It's the difference between a blank grey box and something that stops the scroll

**able-v7.html**: `og:image` is set to `profile.topCard?.artworkUrl || ''`. This is Option A (use artwork directly). It will work when the artist has uploaded artwork. Two major problems:

1. **The URL may be a `data:` URI or `blob:` URL** if the artist uploaded an image locally. Social crawlers (Twitter, Facebook, iMessage) cannot fetch `data:` or `blob:` URLs — the card will show blank.
2. **No fallback OG image** when `artworkUrl` is empty — the tag gets `content=""` which is as good as absent.
3. **No `og:image:width` / `og:image:height` tags** — some platforms require these for `summary_large_image` to render at full size.

**landing.html**: `og:image` set to `https://ablemusic.co/og-image.jpg` — correct pattern. The file must actually exist at that URL.

---

### 6. Twitter/X card — 6/10

**able-v7.html**: `twitter:card` is `summary_large_image` — correct choice. `twitter:title` and `twitter:description` are set dynamically. Missing: `twitter:image` (separate from `og:image` — Twitter prefers its own explicit tag), and `twitter:site` (@ablefm handle).

**landing.html**: Complete — `twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image` all present. This is the model.

---

### 7. Canonical URL — 5/10

**able-v7.html**: `og:url` is set dynamically by `injectSEO()` from a derived handle: `https://ablemusic.co/${handle}`. There is no `<link rel="canonical">` tag in the `<head>` — only the OG url property. Google uses `<link rel="canonical">` for deduplication; the OG url property is for social sharing only. These are separate things and both are needed.

Also: the handle derivation logic (`(profile.handle || name).toLowerCase().replace(/[^a-z0-9]+/g, '-')`) runs client-side, which means Google sees an empty canonical until JS executes. For a static-file deployment this is the fundamental ceiling — proper canonicals require server-side rendering or pre-rendering.

**landing.html**: `<link rel="canonical" href="https://ablemusic.co/">` — correctly set.

---

### 8. Structured data / JSON-LD — 7/10

**able-v7.html**: This is actually the strongest dimension. `injectSEO()` builds a `@graph` with:
- `MusicGroup` (not `MusicArtist` — technically correct for bands, acceptable for solo artists though `MusicArtist` is more precise for individuals)
- Upcoming `Event` entries from `profile.events`, filtered to future dates, with `location.Place`, `performer`, and `ticketUrl`

This is genuinely solid. Issues:
- Uses `MusicGroup` type when `MusicArtist` would be more specific for solo artists
- No `sameAs` array linking to Spotify/Apple Music/Instagram profiles — a significant missed signal for Google's Knowledge Graph
- No `@id` field (canonical IRI) on the MusicGroup node
- Injected via JS only — Google can index JS-rendered structured data, but it's slower and less reliable than server-side

**landing.html**: No structured data. Could have `Organization` or `WebSite` schema with `SearchAction` (Sitelinks Searchbox potential in future).

---

### 9. Robots / noindex on private pages — 5/10

**start.html**: `<meta name="robots" content="noindex, nofollow">` — CORRECT. Already done.

**admin.html**: NO noindex tag. A logged-in dashboard with no noindex is technically indexable. It won't rank for anything useful but Google may crawl it and waste crawl budget.

**fan.html**: NO noindex tag. Personal dashboard — should be `noindex` at minimum.

---

### 10. Landing page SEO — 7/10

**landing.html** is the strongest page overall. It has:
- Reasonable title targeting the artist-tools space
- A good description with specific product features
- Canonical URL
- Complete OG + Twitter card
- Font preconnects

Missing:
- No `<meta name="keywords">` (low value, but harmless)
- No structured data (`Organization` schema minimum)
- The title `"ABLE — Your fans. Direct."` doesn't directly target the search query `link in bio for musicians` — the money keyword. A version like `"ABLE — The link-in-bio for musicians | Free forever"` would capture more search intent.
- The OG image file (`/og-image.jpg`) referenced in the code needs to actually exist and be 1200×630.

---

## Summary table

| Dimension | Score | Key gap |
|---|---|---|
| Title tags | 6/10 | able-v7 title too thin; fan.html unindexed but no noindex |
| Meta description | 5/10 | able-v7 JS only updates OG desc, not `<meta name="description">` |
| OG title | 6/10 | "[Name] on ABLE" — passes but misses keyword/CTA opportunity |
| OG description | 6/10 | No 155-char cap; generic fallback |
| OG image | 4/10 | data:/blob: URLs don't work in crawlers; empty fallback |
| Twitter/X card | 6/10 | Missing `twitter:image` and `twitter:site` on artist profile |
| Canonical URL | 5/10 | No `<link rel="canonical">` on able-v7.html; JS-only limits |
| Structured data | 7/10 | MusicGroup not MusicArtist; no `sameAs`; no `@id` |
| Robots/noindex | 5/10 | admin.html and fan.html missing noindex |
| Landing page SEO | 7/10 | Good but title doesn't target key search query; no structured data |
| **Overall** | **5.7/10** | |

---

## The single highest-leverage fix

The `og:image` problem. Every artist sharing their ABLE link on Instagram/TikTok/Twitter will either get a share card with their artwork — or a blank grey box. The difference is whether `artworkUrl` is a real hosted URL vs a `data:` URI. Until artwork is stored in Supabase Storage (real URLs), many artists will be sharing blank cards. This is P0.

Second highest: the missing `<meta name="description">` update. Google's snippet for artist pages will show "Artist profile powered by ABLE" until this is fixed.
