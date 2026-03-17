# ABLE — LLM Context Bundle
**For sharing with other AI systems for feedback, review, or continuation.**
**Date: 2026-03-15**

---

## HOW TO USE THIS

Paste this document (plus any of the PART files below) into another LLM to get feedback, a second opinion, or to continue a build session. Each section can be read independently.

For a full review: share this file + `docs/VISION_MASTER_SPEC.md`
For a targeted build session: share this file + the relevant PART from the spec

---

## WHAT ABLE IS (30-second version)

ABLE (Artist Before Label) is a link-in-bio product for independent musicians, but fundamentally different from Linktree:

1. **The page shifts with what the artist is doing.** Pre-release countdown → release day streaming → gig night tickets → back to profile. Automatically. Linktree shows the same links regardless of context.

2. **The fan's email belongs to the artist.** When a fan signs up, that email is in the artist's list — not locked to ABLE. If ABLE closes, the artist exports and leaves with everything.

3. **The page is designed for music, not neutral.** 7 genre vibes (Electronic, Hip-hop, R&B/Soul, Indie/Alt, Pop, Rock/Metal, Acoustic/Folk) each with their own typography, rhythm, and feel. 4 themes (Dark, Light, Glass, Contrast). The page has an identity.

**The root truth:** The relationship between artist and fan belongs to them, not to ABLE. ABLE is the conduit, not the room.

---

## THE THREE PRODUCTS

### 1. Artist Profile (`able-v7.html`)
What fans see when they click the artist's bio link. Campaign-state-aware, native music embeds, in-page editing for the artist.

### 2. Artist Dashboard (`admin.html`)
Where artists see their data: fan list, analytics, campaign controls, broadcasts. NOT where they edit the page design (that's on the profile itself).

### 3. Onboarding (`start.html`)
Where new artists set up their page. Should work for a 16-year-old with no Spotify artist profile, a 58-year-old jazz musician with no tech skills, and an indie artist switching from Linktree in under 3 minutes.

**Additionally:**
- `landing.html`: Marketing page for new artist acquisition
- `fan.html`: Fan dashboard — artists they follow, shows near them, new drops (Phase 2)
- `freelancer.html`: Profile for music industry professionals (producers, mixers) — discovered via credits on artist profiles (Phase 3)

---

## THE USERS (Summary — See `VISION_MASTER_SPEC.md` Part 1 for full stories)

| User | Age | Context | Core need |
|---|---|---|---|
| Bedroom producer | 16–22 | SoundCloud, no Spotify artist page | SoundCloud embed, professional look, no jargon |
| Indie artist with release | 24–30 | Uses Linktree, has Spotify | Import Linktree links, pre-release countdown, email capture |
| Working gigging musician | 28–40 | Plays shows weekly, Bandcamp | Events list, gig mode, professional look |
| Mid-tier artist wanting data | 30–42 | 20k+ listeners, wants email list | Real analytics, fan source attribution, Close Circle |
| Non-technical artist | 45–65 | Never used link-in-bio | Maximum simplicity, guided Spotify link finding |
| YouTube/TikTok-first creator | 18–26 | No Spotify artist page | YouTube Short as top card |
| "Just a pretty page" artist | Any | No active campaign | Evergreen profile 10/10, no pressure to add features |
| Label/manager | 25–45 | Setting up pages for artists | Fast Spotify import, clean hand-off |
| Fan (casual) | 16–35 | Clicks bio link | Fast load, easy sign-up, feels like artist built it |
| Fan (dedicated) | 18–30 | Follows 6+ artists | fan.html with real data, shows near them |
| Music producer/freelancer | 22–40 | Credits on artist profiles | Live link credits → booking enquiries |

---

## THE 4 CAMPAIGN STATES

Every artist profile is always in one of these four states:

| State | When | Fan sees |
|---|---|---|
| **Profile** (default) | No active campaign. Most important state. | Beautiful evergreen page: artwork, bio, music, platform links |
| **Pre-release** | Artist set a future release date | Countdown timer, pre-save CTA, "hear it first" email capture |
| **Live** | Release date reached (auto-switches) | Music front and centre, Spotify/YouTube embed in top card |
| **Gig** | Manual 24hr toggle by artist | Tickets primary CTA, venue/time prominent, "tonight note" (artist-written message) |

Auto-switch logic: `now < releaseDate → pre-release` → `now < releaseDate + 14 days → live` → `profile`
Gig overrides all other states. Auto-expires after 24 hours.

---

## THE DESIGN SYSTEM (Exact Tokens)

```css
/* Artist profile (able-v7.html) */
--color-bg:     #0d0e1a   /* Midnight Navy */
--color-card:   #12152a
--color-accent: artist-set (default #e05242)
--font:         'DM Sans' (NOT Plus Jakarta Sans — that's admin only)
--font-display: vibe-specific (Barlow Condensed for electronic/pop/rock)
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-decel:   cubic-bezier(0.25, 0.46, 0.45, 0.94)

/* Admin dashboard (admin.html) */
--bg:     #09090f
--acc:    #f4b942  /* Amber */
--font:   'Plus Jakarta Sans'
--font-d: 'Barlow Condensed'
```

**7 Vibes:**
| Vibe | Display font | Accent | r-mult |
|---|---|---|---|
| Electronic/Club | Barlow Condensed 700 uppercase | #06b6d4 cyan | 0.6 |
| Hip-hop/Rap | Oswald 700 uppercase | #f4b942 gold | 0.7 |
| R&B/Soul | Cormorant Garamond 600 italic | #e06b7a rose | 1.2 |
| Indie/Alt | Space Grotesk 700 | #7ec88a sage | 1.0 |
| Pop | Barlow Condensed 700 | #9b7cf4 indigo | 1.4 |
| Rock/Metal | Oswald 700 uppercase | #e05242 red | 0.6 |
| Acoustic/Folk | Lora 700 serif | #d4a96a ochre | 1.3 |

**4 Themes:** Dark (#0d0e1a base) / Light (#f0ede8 warm cream) / Glass (backdrop-filter blur 28px) / Contrast (#000000 base)

**Border radius rule:** `--r-md × r-mult` for cards. Electronic/Rock = small radii. R&B/Folk = large. Set in JS via `applyDerivedTokens()`. Never hardcode per vibe.

---

## PLATFORM EMBED MATRIX

| Platform | Can embed? | Requires account? | Best use |
|---|---|---|---|
| YouTube (landscape) | Yes — full iframe | No | Top card, Music & Video section |
| YouTube Shorts | Yes — same iframe, 9:16 | No | Top card (portrait) |
| Spotify track | Yes — native embed | 30s preview only without | Top card, Release card |
| Spotify album/playlist | Yes — native embed | 30s per track without | Music section |
| SoundCloud track | Yes — visual player | No (public tracks) | Top card, Music section |
| SoundCloud playlist | Yes — full widget | No | Music section (full catalogue) |
| Bandcamp track | Yes — embed player | No | Music section |
| Bandcamp album | Yes — full tracklist | No | Music section |
| Vimeo | Yes — full iframe | No | Top card (cinematic artists) |
| Apple Music | Very limited | Requires subscription | Link pill only |
| TikTok | NO | — | Link pill with @handle |
| Instagram | NO | — | Link pill |

**The conduit principle:** If it can play inside the page, it must. Embedding is default. Links are fallback. Copy reflects this: "Play this" not "Stream on Spotify."

---

## WHAT GETS REBUILT (Not Patched)

| File/Feature | Decision | Reason |
|---|---|---|
| `start.html` | Full rebuild | Current 3-step wizard too rigid. Universal link detector entry point, Linktree importer, live preview updating with each answer, one-question-per-screen required |
| Landing page hero + demo | Rebuild hero section | Current demo is CSS mockup without real iframes. Needs actual YouTube/Spotify embeds that play. Demo phone too small. |
| Music section | Major rewrite | Rename to "Music & Video". Add YouTube as primary option, SoundCloud full playlist, portrait video handling |
| Admin editing panels | Deprecate | Editing moves to artist profile (in-page). Admin retains data views and structural controls only |

| File/Feature | Decision | Reason |
|---|---|---|
| Design system (tokens, vibes, themes) | Keep entirely | Most mature part of codebase |
| Campaign state machine | Keep | Already works well |
| Edit pill + bottom sheet | Extend | Good foundation, needs zone coverage |
| Netlify functions | Keep + extend | oembed-proxy, ai-copy, fan-confirmation, spotify-import all work |
| Admin fan list, analytics | Keep | Core data views |
| 17 Phase 1 micro-interactions | Keep all | Defined in V6 authority, non-negotiable |

---

## THE LINKTREE IMPORTER

Critical acquisition feature. Linktree pages are public HTML — no API key needed.

**Flow:**
1. Artist pastes `https://linktr.ee/artistname` anywhere (onboarding OR admin Connections)
2. Netlify function `/.netlify/functions/linktree-import` fetches public page, parses `<a>` tags
3. Returns: `[{title: "Spotify", url: "open.spotify.com/...", platform: "spotify"}, ...]`
4. UI shows checkboxes: "These were on your Linktree — which should we import?"
5. Known platforms (Spotify, Apple Music, YouTube, SoundCloud) map to ABLE platform pills
6. Unknown links offered as CTA buttons with original label

**This is the single most important feature for converting Linktree users** (who are the majority of ABLE's target audience currently using some bio link tool).

---

## COPY RULES (Hard)

Never write:
- "Turn fans into superfans" → say "your most dedicated listeners"
- "Grow your audience" → say "reach people who care"
- "Monetise your fanbase" → say "let people support you directly"
- "Content creator" → say "artist"
- "Going viral" → never, anywhere
- Exclamation marks on dashboard copy
- "Upgrade to unlock X" → say exactly what they get: "Message the 87 people who asked to hear from you"
- "Get started" → say what they're actually doing
- "Sign up" (for fan capture) → say "Stay close." / "I'm in" / "Count me in"

Fan capture copy law: first-person CTA ("I'm in" not "Sign up") = 90% conversion uplift. Trust line: "Just [Artist Name]. No spam."

---

## TECHNICAL CONSTRAINTS

- No build pipeline. No bundler. No npm. Single HTML files, edited directly.
- All external API calls via Netlify serverless functions (CORS + key security)
- localStorage maps 1:1 to Supabase table rows. Key names never change.
- Performance: LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.10 · HTML ≤ 340kB gzipped
- Animation: only `opacity` and `transform`. Never animate box-shadow, filter, or background-color in loops.
- Supabase: magic link auth (no password, no Google OAuth)
- GDPR double opt-in for all fan email capture (non-negotiable for UK/EU)

---

## FILES IN THIS PROJECT

| File | What it is | Status |
|---|---|---|
| `able-v7.html` | Artist public profile | ACTIVE — primary product |
| `admin.html` | Artist data dashboard | ACTIVE — recently improved (data integrity) |
| `start.html` | Onboarding wizard | ACTIVE — needs rebuild |
| `landing.html` | Marketing page | ACTIVE — demo needs rebuild |
| `fan.html` | Fan dashboard | EXISTS — demo data only, needs Supabase wiring |
| `netlify/functions/oembed-proxy.js` | oEmbed CORS proxy | BUILT |
| `netlify/functions/ai-copy.js` | Claude copy generator | BUILT |
| `netlify/functions/fan-confirmation.js` | Fan confirmation email | BUILT |
| `netlify/functions/spotify-import.js` | Spotify auto-import | BUILT |
| `docs/VISION_MASTER_SPEC.md` | Full vision spec | THIS SESSION — authoritative |
| `docs/V8_BUILD_AUTHORITY.md` | V8 strategic authority | EXISTS — read this too |

---

## OPEN QUESTIONS (See `VISION_MASTER_SPEC.md` Part 18 for full context)

1. Should "Music & Video" be one section or two?
2. Does fan capture position shift in gig mode, or stay at screenful 3 always?
3. Should the onboarding preview be a live iframe of the actual profile, or an enhanced mockup?
4. Mobile editing UX on small screens — how does the bottom sheet interact with the keyboard?
5. What does admin.html keep vs what moves to the profile edit pill?

---

*This document + `docs/VISION_MASTER_SPEC.md` together give any LLM enough context to contribute meaningfully to the ABLE build.*
