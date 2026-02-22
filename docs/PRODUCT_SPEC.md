# ABLE — Product Specification
**Version:** 0.2 · **Last updated:** 2026-02-22
**Canonical file:** `able-merged.html` (single-file, no build pipeline)
**Non-canonical files:** `index.html` (redirect only — DO NOT edit)

---

## 0. The "Ables" Vocabulary

Use these terms consistently across all UI copy, docs, and code comments:

| Term | Meaning |
|---|---|
| **Linkable** | The artist's profile is a single shareable URL — their link-in-bio |
| **Shareable** | Any piece of content (release, event, merch item) can be shared via a native share sheet or copied link |
| **Discoverable** | The profile and content are structured for search/social preview (Open Graph, schema.org metadata) |
| **Supportable** | Fans can support the artist directly — tip, buy, subscribe — from the profile |
| **Shoppable** | Merch items are purchasable directly from the profile with a single tap |
| **Bookable** | Events have a ticket CTA; venues and promoters can submit booking enquiries |
| **Trackable** | The artist can see what's working — which links are tapped, which sections are engaged — without a backend |

These are product primitives. Every section of the profile makes the artist more Linkable, Shareable, etc. Use the vocabulary when naming features and writing onboarding copy.

---

## 1. Product Purpose

ABLE is a premium mobile-first artist profile product. It lets musicians publish a polished, link-in-bio-style page that surfaces their music, events, merch, and credits — with zero platform lock-in and Instagram/Apple-level visual polish.

**What makes it distinct:**
- Embed cards that contain platform players *without* letting the platform take over the UI
- An honest credits system that treats collaborators as first-class citizens
- A calm, structured profile — not a scrolling content dump

---

## 1a. Section Inventory (today's implementation)

| Section | Tab key | Profile section ID | What it does |
|---|---|---|---|
| Profile / Hero | `profile` | `#hero` | Artist name, bio, handle, location, avatar, hero image, share button |
| Appearance | `appearance` | — | Theme (light/dark/image), brand colour, fonts, glassmorphism, tier-1 settings |
| Music | `music` | `#previewMusicSection` | Releases (singles/EPs/albums) — tracklist or embeds from Spotify/YouTube/SoundCloud |
| Videos | `videos` | `.video-collage` | Video embeds — YouTube/Vimeo (lazy-loaded); TikTok/Other as fallback links |
| Events | `events` | `#events` → `#bentoGrid` | Upcoming + past shows; bento tile layout; ticket CTA per event |
| Merch | `merch` | `#merch` → `.merch-bento-grid` | Product tiles; per-product CTA; store URL setting |
| Action Links | `ctas` | Quick Actions pills | Extra CTA pills below hero; all active links shown, no positional role |
| Auto-State | `auto-state` | — | Mode switching (pre-release/live/evergreen/gig); per-mode hero button config |
| Profile Feed | `feed` | `.profile-feed` | Text/media post updates from the artist |
| Platforms | `platforms` | Streaming pills | Streaming platform URLs; shown as pills on profile |
| Supporters | `supporters` | — | (stub) Fan support / tipping |
| Analytics | `analytics` | — | (stub) Tap counts, engagement |
| Share | `share` | — | QR code + share link |
| Settings | `settings` | — | Account, plan, Test Mode panel |

---

## 1b. State Approach

**MVP:** All state is localStorage. No server, no build pipeline.

**Key architecture decisions:**
- Single canonical HTML file (`able-merged.html`) — no framework, no bundler
- Three `<script>` blocks: (1) polyfill, (2) main app, (3) profile bridge (bridge reads localStorage and populates the preview iframe-like right panel)
- `safeRender(fn)` pattern wraps all render calls in try/catch to prevent cascade failures
- Appearance propagation: `applyAppearanceToRoot(root)` applies theme/colour/font to any root element; `applyAppearanceEverywhere()` calls it on all three preview surfaces

**Later backend:** localStorage keys will map 1:1 to API endpoints. No key renames at that migration point.

---

## 2. Visual & UX Principles

| Principle | Rule |
|---|---|
| **Hierarchy over decoration** | Typography scale and spacing carry weight; no decorative gradients or drop shadows unless they serve a function |
| **Cards as atoms** | Every piece of content lives inside an Able Card. Nothing floats loose |
| **Containment** | Platform embeds (Spotify, YouTube, SoundCloud) are wrapped so they cannot overflow, show sign-in walls, or trigger "open in app" banners outside the card |
| **Consistency** | All cards share the same header/body/footer anatomy regardless of content type |
| **Readability over everything** | In Background Image mode, a scrim or card opacity ensures text contrast ≥ 4.5:1 at all times |
| **No doomscroll** | The future Catch-Up feed is finite and calm by design — it is not a TikTok-style infinite feed |

---

## 3. Profile Layout Hierarchy

```
┌─────────────────────────────────┐
│  HERO                           │  Hero image / avatar / name / bio
│  • Artist name (h1)             │  / location / share button
│  • Handle / location / genre    │
│  • Bio (2–3 lines, expandable)  │
│  • Share button                 │
├─────────────────────────────────┤
│  HERO BUTTONS                   │  ① Primary + ② Secondary — per mode
│  [▶️ Listen Now]  [🎫 Tickets]  │  (Pre-release / Live / Evergreen / Gig)
├─────────────────────────────────┤
│  QUICK ACTIONS (pills)          │  ③ Action Links — extra CTAs below hero
│  [🔗 Link] [🔗 Link] …         │  All active CTAs; no positional magic
├─────────────────────────────────┤
│  SECTION: Music                 │  Tracklist | Embeds | Both (per-section)
│  ┌─────────────────────────┐    │
│  │ ABLE CARD               │    │
│  │ Header: Title · Platform│    │
│  │ Body:   Embed / Track   │    │
│  │ Footer: CTA | Credits ▾ │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  SECTION: Events / Tour         │  Event cards + "Get Tickets" action btn
├─────────────────────────────────┤
│  SECTION: Merch                 │  Product cards + "Shop" action btn
├─────────────────────────────────┤
│  SECTION: Credits               │  Collaborator list — always visible
└─────────────────────────────────┘
```

### 3.1 Section Action Buttons
Each section header carries one action button. Source rules:

| Section | Button label | URL source |
|---|---|---|
| Music / Streaming | "Listen on Spotify" (or active platform) | First release → first non-empty platform URL (Spotify → Apple → SoundCloud → YouTube) |
| Events / Tour | "Get Tickets" | First upcoming event with a `ticketUrl` |
| Merch | "Shop" | `able_merch.shopUrl` field (explicit, set in Merch tab settings) |

**No keyword regex matching.** Source is always live data.

---

## 4. Able Card Anatomy

Every piece of content on the profile is wrapped in an Able Card. The anatomy is fixed:

```
┌──────────────────────────────────────────────────┐
│ HEADER                                           │
│  [Platform icon]  Title · Subtitle               │
│                            [Open ↗]  (optional)  │
├──────────────────────────────────────────────────┤
│ BODY                                             │
│  • Embed player (iframe, contained)              │
│    OR                                            │
│  • Tracklist snippet (clean rows, no heavy CTA)  │
│    OR                                            │
│  • Media preview (album art + metadata)          │
├──────────────────────────────────────────────────┤
│ FOOTER                                           │
│  [Primary CTA]  [Secondary CTA]   Credits ▾      │
│  ┌──────────────────────────────┐  (collapsed)   │
│  │ Credits panel (expandable)  │                 │
│  └──────────────────────────────┘                │
└──────────────────────────────────────────────────┘
```

### 4.1 Card Rules
- **Header** is always present. Title is required; subtitle and Open button are optional.
- **Body** renders one of three modes. Tracklist rows must NOT contain buttons or heavy CTAs — keep them clean, label-and-duration only.
- **Footer CTA slot** holds up to two buttons (primary + secondary). Both are optional. If neither is set, the footer collapses to just the Credits toggle.
- **Credits slot** is collapsed by default. The toggle label shows contributor count ("3 credits"). Expanded reveals name + role rows.
- Cards must never exceed viewport width. Embeds use `max-width: 100%` and `overflow: hidden`.

### 4.2 Embed Containment Rules
- iframe height is fixed (e.g. Spotify: 352px, YouTube: 315px). Never `height: 100%`.
- `pointer-events: none` on any overlay that covers the embed is forbidden (breaks playback).
- `sandbox` attribute on iframes: `allow-scripts allow-same-origin allow-popups` minimum.
- "Open in app" banners from providers are visually contained inside the card frame — they cannot push content below the card.

---

## 5. CTA System

### 5.1 Three CTA Zones (non-overlapping)

| Zone | What it is | How it's configured |
|---|---|---|
| ① Hero Primary button | Big prominent action — varies by mode | Auto-State tab → Mode Buttons card → per-mode primary |
| ② Hero Secondary button | Supporting action | Auto-State tab → Mode Buttons card → per-mode secondary |
| ③ Quick Actions pills | Extra links below hero | Action Links tab → all active CTAs (no positional role) |
| (④) Card CTAs | Per-card buttons inside Able Cards | Set on individual release / event / merch item |
| (⑤) Section action buttons | One button per section header | Auto-derived from live data (see §3.1) |

### 5.2 Mode-Aware Hero Buttons

Auto-State modes and their default hero buttons:

| Mode | Primary | Secondary |
|---|---|---|
| `pre-release` | 💿 Pre-save on Spotify | 🔔 Get Notified |
| `live` | ▶️ Listen Now | 🎫 Get Tickets |
| `evergreen` | 🎵 Listen on Spotify | 📅 Book a Show |
| `gig` | 🎫 Get Tickets | ▶️ Listen Now |

Rules:
- Defaults are overridden by values in `autoStateConfig.modes[mode]`
- `profile` view maps to `evergreen`
- Hero buttons are the ONLY CTAs that change per mode. Quick Actions pills are always the same.

### 5.3 CTA Anti-Patterns (prohibited)
- Do NOT jam CTAs into tracklist rows
- Do NOT use position-in-list to determine button role (no "first CTA = primary" logic)
- Do NOT use keyword/regex matching on CTA text to infer section button URLs
- Do NOT show more than 2 hero buttons at once

### 5.4 CTA Guardrails (MVP — warn-only, never block)

These are soft limits enforced by the Test Mode "Run Assertions" check. They never block saving.

| Guardrail | Limit | Enforcement |
|---|---|---|
| Hero buttons | Max 2 (primary + secondary) | Hard — UI only renders 2 slots |
| Quick Actions pills | Suggested max 8 | Warn-only in Test Mode assertions |
| Section action buttons | Max 1 per section | Hard — one slot per section header |
| Duplicate CTA URLs across zones | Not allowed | Warn-only in Test Mode assertions |
| CTA text length | ≤ 32 chars | Warn-only (long text truncated with ellipsis in pill) |

**Deduplication approach (future):** When the same URL appears in both hero buttons and Quick Actions, surfacing a deduplicate suggestion to the user. No silent removal — always warn and let the user decide.

---

## 6. Display Modes (per section)

Applies to the Music section and potentially Video section in future.

| Mode | What renders |
|---|---|
| `tracklist` | Clean track rows: number · title · duration. No embeds. |
| `embeds` | Full Able Cards with platform player in the body |
| `both` | Able Card with tracklist in the body (no iframe) + open button |

Switching is per-section, persisted in localStorage. Default is `embeds`.

---

## 7. Credits System

### 7.1 Credits on Cards
- Each Able Card footer has a Credits slot
- Credits are collapsed by default, showing "N credits" toggle text
- Expanded: list of `{ name, role }` pairs (e.g. "Mixed by Jamie Stills")
- Credits are authored in the admin per release/track

### 7.2 Credits Section
- A top-level profile section listing all credited collaborators
- Deduplicated by name across all content
- Shows: avatar (optional) · name · roles (comma-joined)
- Ordered: most-credited collaborator first

### 7.3 Future (NOT now)
- Credits connect to a freelancer directory
- Clicking a collaborator navigates to their ABLE profile

---

## 8. Theming

Three modes, switchable in admin:

| Mode | Background | Card style |
|---|---|---|
| `light` | White / near-white system surface | Cards: white, border `1px solid var(--border)` |
| `dark` | Near-black system surface | Cards: `#1a1a1a` or `rgba(255,255,255,0.06)` |
| `image` | Full-bleed background photo | Cards: `rgba(0,0,0,0.55)` + `backdrop-filter: blur(12px)` |

### 8.1 Image Mode Rules
- Text contrast must be ≥ 4.5:1 against the card background at all times
- Hero text sits on a gradient scrim (bottom-to-top, `rgba(0,0,0,0.7)` to transparent)
- Accent colour is derived from or complementary to the hero image palette
- Cards use frosted glass (`backdrop-filter`) — never a solid opaque block

### 8.2 Accent Palette
- One accent colour per profile (artist-chosen or auto-extracted from avatar/hero image)
- Used on: primary hero button, section header text, active pills
- Must pass contrast check in all three theme modes

---

## 9. Admin Dashboard

### 9.1 Structure
- Left nav (sections: Profile, Music, Events, Merch, Credits, Auto-State, Action Links, QR)
- Centre: tabbed content forms
- Right: live mobile preview (phone frame) + QR code
- Header: theme toggle (light/dark/image), preview mode switcher

### 9.2 Preview Mode Switcher
Modes: `pre-release` | `live` | `profile` (evergreen) | `gig`
Switching updates: hero buttons, section visibility, section action buttons.

### 9.3 Auto-State
- A timeline of mode triggers (date/time-based or manual)
- Mode Buttons card: per-mode hero button config (icon + text + URL fields)
- Switching modes in preview uses `autoStateConfig.modes[mode]`

### 9.4 Action Links Tab
- Renamed from "CTAs": "Action Links" or "Quick Links"
- No P1/P2/Pill position badges — all active CTAs are pills
- Add Link modal: preset grid (quick picks) + "Show more" expanded grid (6 categories)
- Drag to reorder · edit inline · toggle active/inactive

---

## 10. Acceptance Criteria

The following must be true and measurable at all times:

| # | Statement |
|---|---|
| AC-01 | Switching preview mode (pre-release/live/profile/gig) updates both hero buttons within 300ms, reading from `autoStateConfig.modes` |
| AC-02 | Every active Action Link appears as a pill below the hero — none are silently promoted to hero button role |
| AC-03 | Section action buttons are populated from live data (releases / events / merch), not from CTA text matching |
| AC-04 | Tracklist rows contain zero buttons or interactive CTAs |
| AC-05 | Every Able Card has a visible header with at minimum: title and content-type indicator |
| AC-06 | Every Able Card footer credits toggle shows correct collaborator count when credits exist |
| AC-07 | Spotify/YouTube/SoundCloud iframes are constrained to their card and do not overflow or shift sibling content |
| AC-08 | In Background Image mode, all card text passes WCAG AA contrast (≥ 4.5:1) against the card scrim background |
| AC-09 | Light → Dark → Image mode switching requires no page reload and completes within 300ms |
| AC-10 | Merch "Shop" button URL is sourced from `able_merch.shopUrl`; changing it in the Merch settings card updates the button immediately |
| AC-11 | The Credits section on the profile lists collaborators deduplicated and ordered by frequency |
| AC-12 | Adding a release with a Spotify URL immediately makes that URL appear on the Streaming section action button (no page reload) |
| AC-13 | Adding an event with a ticket URL and a future date immediately updates the Events section action button |
| AC-14 | The phone frame preview in the admin reflects all profile edits within 500ms of the last input event |
| AC-15 | QR code always points to the correct profile URL and updates if the handle changes |
| AC-16 | No `console.error` or unhandled promise rejection appears during normal admin usage |
| AC-17 | The profile page is usable (readable, navigable, all CTAs tappable) on a 375px-wide viewport |
| AC-18 | All section action buttons that have no source data are hidden (not shown as broken/empty) |

---

## 11. Data Model (localStorage keys)

| Key | Contents |
|---|---|
| `able_profile` | `{ name, handle, bio, location, genre, avatarUrl, heroImageUrl, accentColor }` |
| `able_music_releases` | `Release[]` — `{ id, title, type, platforms: {spotify, apple, soundcloud, youtube}, tracks: Track[], credits: Credit[] }` |
| `able_events` | `Event[]` — `{ id, date, venue, city, ticketUrl, notes }` |
| `able_merch` | `{ shopUrl, products: Product[] }` |
| `able_credits` | `Credit[]` — `{ name, role, contentId? }` (global + per-content) |
| `able_cta_state` | `{ [id]: { text, icon, url, active, order } }` — Action Links |
| `able_dashboard_autostate` | `{ currentMode, timeline: [], modes: { [modeKey]: { primary, secondary } } }` |
| `able_theme` | `'light' \| 'dark' \| 'image'` |

---

## 12. Out of Scope (do not build yet)

- Fan sign-up / email capture forms
- Catch-Up feed (finite daily update feed)
- Freelancer directory / credits-to-profile linking
- Analytics / play counts
- Multi-artist accounts
- Payments or tipping infrastructure
