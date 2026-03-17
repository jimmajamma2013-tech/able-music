# ABLE — API Integrations Overview
**Created: 2026-03-16 | Master map of all external API dependencies**

> Read this before touching any integration work. Every API ABLE uses or has evaluated is listed here, with the reason for its inclusion or exclusion. Per-API deep dives live in sibling files in this directory.

---

## V1 APIs — needed before first real artist

These are required for the product to function at launch. None are optional.

| API | Purpose | Auth method | Cost | Status |
|---|---|---|---|---|
| Supabase | Database, auth, storage | Service role key (server-side) | Free tier available | Configured — tables not yet created |
| Resend | Fan confirmation emails, magic link auth | API key (server-side only) | Free to 3k/day | Needs key in Netlify env vars |
| Spotify Web API | Artist data import (name, genre, image, albums) | Client Credentials flow (server-side) | Free | Needs `SPOTIFY_CLIENT_ID` + `SPOTIFY_CLIENT_SECRET` |

---

## V2 APIs — needed for growth features

These become necessary once real artists are on the platform. Not blocking for initial launch.

| API | Purpose | Auth method | Cost | Status |
|---|---|---|---|---|
| Stripe | Support payments, Artist/Pro subscriptions | Publishable key (client) + Secret (server) | 1.5% + 20p per UK card transaction | Needs account |
| Anthropic API | AI copy suggestions for bio/CTAs | API key (server-side) | ~$0.00025 per suggestion call | Key available — function built, unverified |
| PostHog | Analytics event tracking, funnels, feature flags | API key (client-safe) | Free to 1M events/month | Needs project |

---

## V3 APIs — Phase 2+

Not needed for launch or V1 growth. Revisit when the features they enable reach the roadmap.

| API | Purpose | Auth method | Cost | Status |
|---|---|---|---|---|
| Spotify OAuth (fan) | True pre-save to fan's Spotify library | OAuth2 PKCE (fan authenticates) | Free | Phase 2 |
| Apple MusicKit JS | Apple Music embeds, Apple Music pre-save | MusicKit developer token | Free | Phase 2 |
| Mapbox / OpenStreetMap | Fan location heatmap | API key | Free to 50k tile loads/month | Phase 3 |

---

## APIs investigated but NOT needed

These were evaluated and deliberately excluded. Do not revisit without a strong new reason.

| API | Why not needed |
|---|---|
| Bandcamp API | No usable public API exists. oEmbed proxy handles embeds. Artist data is manually entered. |
| YouTube Data API | oEmbed proxy handles YouTube embeds. Channel data import is not in scope. |
| SoundCloud API | oEmbed proxy handles SoundCloud embeds. API status unreliable; key rotation required. |
| Twilio / SMS | Email is sufficient for V1–V2. SMS adds regulatory overhead. Phase 3 only if demand is clear. |
| Mailchimp / Beehiiv | ABLE owns the email relationship directly via Resend. No third-party email platform is needed or wanted — it would break the "your list, your relationship" promise. |
| Google OAuth | ABLE uses magic link authentication only. No OAuth. This is a confirmed, deliberate product decision (see `docs/v6/core/V6_BUILD_AUTHORITY.md` and `start.html` §2.7). |

---

## Internal Netlify functions (ABLE's own API layer)

These are server-side functions in `netlify/functions/`. They are not external APIs — they are ABLE's own endpoints that call external APIs on behalf of client pages. All sensitive credentials live here. Nothing secret ever touches client-side HTML.

| Function | Purpose | External APIs called | Status |
|---|---|---|---|
| `spotify-import.js` | Import artist name, image, genres from Spotify URL | Spotify Web API | Built — needs `SPOTIFY_CLIENT_ID` + `SPOTIFY_CLIENT_SECRET` in Netlify env |
| `fan-confirmation.js` | Send confirmation email to fan after sign-up | Resend | Built — needs `RESEND_API_KEY` in Netlify env |
| `ai-copy.js` | Generate bio/CTA suggestions in ABLE voice register | Anthropic API | Built — needs `ANTHROPIC_API_KEY` in Netlify env |
| `oembed-proxy.js` | CORS-safe oEmbed proxy for Spotify, YouTube, Bandcamp, SoundCloud, Vimeo | Respective oEmbed endpoints | Built — no auth required |
| `admin-stats.js` | Aggregate analytics queries for admin.html dashboard | Supabase (service role) | Not yet built |
| `magic-link.js` | Trigger Supabase magic link auth email | Supabase Auth | Not yet built |

---

## Environment variables (Netlify UI → Site settings → Environment variables)

This is the complete list of secrets ABLE needs set before any function works in production. Never commit these to git.

| Variable | Used by | Where to get it |
|---|---|---|
| `SPOTIFY_CLIENT_ID` | `spotify-import.js` | Spotify Developer Dashboard → Your App |
| `SPOTIFY_CLIENT_SECRET` | `spotify-import.js` | Spotify Developer Dashboard → Your App |
| `RESEND_API_KEY` | `fan-confirmation.js` | Resend Dashboard → API Keys |
| `ANTHROPIC_API_KEY` | `ai-copy.js` | Anthropic Console → API Keys |
| `SUPABASE_URL` | `admin-stats.js`, `magic-link.js` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `admin-stats.js` (server-side only) | Supabase Dashboard → Project Settings → API |
| `ABLE_FROM_EMAIL` | `fan-confirmation.js` | Set to `noreply@ablemusic.co` (Resend verified domain) |
| `ABLE_BASE_URL` | `fan-confirmation.js` | Set to `https://ablemusic.co` in production |

The Supabase anon key (`sb_publishable_pRmYph3-GYIeZEeKyY1_sg_5sOPkQp_`) is safe to include in client-side HTML. The service role key is not — it bypasses all RLS policies.

---

## Per-API deep dives (sibling files in this directory)

| File | API |
|---|---|
| `spotify.md` | Spotify Web API — Client Credentials import |
| `stripe.md` | Stripe — support payments + subscription billing |
| `resend.md` | Resend — transactional email |
| `supabase.md` | Supabase — auth, database, storage |
| `anthropic.md` | Anthropic API — AI copy suggestions |
| `posthog.md` | PostHog — product analytics |
| `oembed.md` | oEmbed proxy — embed resolution |
