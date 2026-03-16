# Onboarding Page — Full Spec
**File: `start.html` | Updated: 2026-03-15**
**Current score: 4.6/10 → Target: 9/10**

> This document is the single source of truth for the onboarding wizard. Build from this, not from the current file.

---

## COMPETITIVE CONTEXT (Research: 2026-03-15)

- **Linktree onboarding: 48 screens.** Email → username → "tell us about yourself" → interest selection → plan upgrade prompt → theme/fonts → add links → email verify → dashboard. Buried in steps. No live preview. No import.
- **Beacons onboarding: 27 screens.** Best feature: AI auto-generates layout + colour palette from your social account — but requires full OAuth connection (authorize Instagram/Twitter). Higher friction than ABLE's paste-URL approach.
- **Nobody does URL-type detection + metadata import.** Paste a Spotify link and we auto-fill name/genre/artwork — this does not exist anywhere else. It is ABLE's strongest onboarding differentiator.
- **Notion is the closest UX model:** answer → instant visual update → feels like customization not data collection.

**The competitive position:** ABLE's 8-screen wizard, with Spotify/Linktree auto-import and live preview, is faster and smarter than both direct competitors. This must be felt from the first screen.

---

## THE JOB OF THIS PAGE

Get an artist from "I've heard of ABLE" to "my page is live" in under 5 minutes — without ever feeling like they're filling in a form.

The onboarding wizard is not a sign-up flow. It's the first product experience. The artist should feel like ABLE already knows them, not that they're filling in blank boxes.

**Three things this page must do:**
1. Detect what the artist already has (Spotify, Linktree, SoundCloud) and pre-fill from it — so they feel the product working immediately
2. Ask only what's needed, one question at a time, with a live preview updating as they answer
3. End with a page that is immediately share-worthy — not "set up later" energy

---

## DESIGN PRINCIPLE: ONE QUESTION, ONE SCREEN

The current start.html has 3 steps with multiple questions per step. The V2 architecture is: **one question per screen**.

Why:
- Each answer updates the live preview immediately — the artist sees their page build in real time
- Less cognitive load — no scrolling, no skipping, no overwhelm
- Progress feels faster (8 quick steps vs 3 heavy steps)
- Mobile-native pattern (Duolingo, Stripe Atlas, Notion)

**Total screens: 8**

---

## THE 8 SCREENS

### Screen 0 — The Hook (before anything else)

**Purpose:** Earn trust before asking for anything.

**Layout:** Full-screen, centred. No form fields.

**Headline (Barlow Condensed 700, 58px desktop / 44px mobile):**
`Your page. Set up in 5 minutes.`

**Sub (16px, line-height 1.6):**
`Paste your Spotify or Linktree link — we'll build the rest.`

**Primary input (full-width, large):**
```
[ Paste your Spotify or Linktree link here... ]
```
→ 54px height, 16px font, prominent. Border lights up on focus.

**Or below the input:**
`Start from scratch →` (text link, subdued)

**Trust line (12px, muted):**
`No card. No catch. Your page is free.`

**What happens on input:**
1. Detect URL type: Spotify artist / Spotify track / Linktree / SoundCloud / YouTube / Bandcamp / Unknown
2. If Spotify artist: call Spotify API → pull name, avatar, top track, follower count (display: "We found [Name] on Spotify ✓")
3. If Linktree: call oembed-proxy → parse all links, detect platform types ("We found 6 links on your Linktree ✓")
4. If unknown: accept as custom link and continue

**Empty state / typing:** Input has placeholder cycling animation (CSS only):
- "linktr.ee/yourname"
- "open.spotify.com/artist/..."
- "soundcloud.com/yourname"
→ Cycles every 3s with crossfade opacity

---

### Screen 1 — Name

**Eyebrow:** `Step 1 of 7`

**Question:** `What do you go by?`

**Sub:** `The name on your page. Your artist name, your real name — whatever feels right.`

**Input:** Single text field, large (54px height, 20px font)
- Placeholder: "Your name here"
- Auto-filled if Spotify import succeeded

**Live preview:** Artist name updates in the phone preview immediately on every keystroke

**Forward trigger:** Enter key or "Continue →" button

---

### Screen 2 — Vibe / Genre

**Eyebrow:** `Step 2 of 7`

**Question:** `What kind of music do you make?`

**Sub:** `This sets the starting feel of your page. You can change everything later.`

**7 visual vibe cards (same as current):**

| Vibe | Example artists | Starting accent |
|---|---|---|
| Electronic | BICEP, Four Tet, Floating Points | #5b9cf6 (blue) |
| Hip-Hop / Rap | Little Simz, Loyle Carner, slowthai | #f4a93e (gold) |
| Indie / Alternative | Wet Leg, The Smile, Yard Act | #78c47b (green) |
| R&B / Soul | Cleo Sol, Sampha, Greentea Peng | #b87bdb (purple) |
| Singer-Songwriter | Phoebe Bridgers, Novo Amor, Ethan Gruska | #f5c066 (warm amber) |
| Dance / Club | Peggy Gou, Mall Grab, Special Interest | #e05242 (red) |
| Other / I'll set it myself | — | #8ab4ce (steel blue) |

**Layout:** 3-column grid (mobile: 2-column). Each card: genre icon, name, 2–3 example artists in smaller text below.

**What happens on select:** Phone preview background + accent shifts to the vibe palette immediately

**No "Skip" on this step** — the most common onboarding mistake. If the artist genuinely can't find their genre, "Other" exists.

---

### Screen 3 — Accent Colour

**Eyebrow:** `Step 3 of 7`

**Question:** `Pick a colour that feels like you.`

**Sub:** `This becomes your accent — CTAs, links, highlights. You can change it any time.`

**8 preset swatches** — ordered from warm to cool. Pre-selected based on vibe chosen in Step 2.

**Custom colour option** — "Choose your own →" opens native colour picker

**Live preview:** Phone accent, CTA button, platform pill borders all update in real time

**Show explicitly in copy:** Below colour preview strip, small text:
`"This is the colour your fans will tap to sign up, stream, or get tickets."`
→ Makes the choice feel meaningful, not cosmetic

---

### Screen 4 — Theme

**Eyebrow:** `Step 4 of 7`

**Question:** `How should your page feel?`

**4 theme cards** with visual previews (same as current, but better labels):

| Theme | Description |
|---|---|
| **Dark** | Midnight black. Classic, editorial. Most artists pick this. |
| **Light** | Clean and warm. Works for acoustic, folk, stripped-back. |
| **Glass** | Your artwork bleeds through. Immersive. Needs strong artwork. |
| **Contrast** | Pure black. Maximum impact. |

**Default:** Dark pre-selected

**Mobile note:** Glass theme previews must show sample artwork bleeding through — static image is fine

---

### Screen 5 — Links (conditional)

**Eyebrow:** `Step 5 of 7`

**Shown if:** No Spotify/Linktree import in Screen 0

**If Linktree imported:** Skip this screen and show a confirmation:

```
We found your links:
✓ Spotify              [music]
✓ Apple Music          [music]
✓ Instagram            [social]
✓ YouTube              [video]
○ Custom link          [importing as button]

Continue →
```

**If no import:** Show the universal link input again, with platform pills below for manual add.

**Question (no-import flow):** `Where can fans find your music?`

**Input:** Single URL input with platform auto-detection
- Paste Spotify → "Spotify ✓" chip appears
- Paste Apple Music → "Apple Music ✓" appears
- Can add up to 6 links total

---

### Screen 6 — Fan Capture CTA

**Eyebrow:** `Step 6 of 7`

**Question:** `What do you want fans to do when they land on your page?`

**Sub:** `One action. What matters most right now?`

**4 choices (large tap targets, 64px height each):**

| Choice | What it shows to fans |
|---|---|
| **Stay close** | "Stay close." — subtle, low-pressure sign-up |
| **Stay in the loop** | "Stay in the loop." — for artists with a regular release cadence |
| **Hear it first** | "Hear it first." — for artists building pre-release momentum |
| **Support me** | "Support me directly." — for artists with Bandcamp/Patreon/Ko-fi |

**No "Skip"** — fan capture is the product's core value. If they don't want it, they select "Stay close" (lowest pressure).

**Live preview:** Fan capture section in phone updates to show their chosen CTA text

---

### Screen 7 — Current Moment

**Eyebrow:** `Step 7 of 7`

**Question:** `What's happening right now?`

**Sub:** `Your page shifts with your moment. Tell us what's going on.`

**4 choices (visual, not just text):**

```
○  Just me, being an artist        [Profile mode — no campaign]
○  Something's coming              [Pre-release — enter release date]
○  Music just dropped              [Live — link your track]
○  Playing tonight                 [Gig mode — 24hr]
```

**If "Something's coming" chosen:** Date picker appears below (slide-in, no new screen)
→ `Release date: [date input]` — sets countdown timer on their page

**If "Music just dropped" chosen:** Track URL input appears
→ `Paste your track link:` — links the Live top card embed

**If "Playing tonight" chosen:** Venue + time input (optional)
→ `Venue name (optional):` + `Show time (optional):`

**Live preview:** Phone switches to the selected campaign state immediately

---

### Screen 8 — Done (Profile Live)

**No eyebrow**

**Headline (60px, spring entrance):**
`Your page is live.`

**Sub (18px):**
`ablemusic.co/[slug] — ready to share.`

**Primary CTA (large, accent fill):**
`Go to my page →`
→ Opens able-v7.html in new tab

**Secondary CTA:**
`Open my dashboard →`
→ Opens admin.html

**"Share it now" section:**
Small, below CTAs. 3 icons: Instagram story, Twitter/X, Copy link.

**The page slug:**
- Auto-generated from artist name (lowercased, hyphens for spaces, truncated at 24 chars)
- Shows as editable inline field: `ablemusic.co/[luna-serrano-]` with pencil icon
- Artist can edit before going live

**Trust moment (12px, muted, bottom):**
`This page costs £0. It will never charge you to exist.`

---

## LIVE PREVIEW ARCHITECTURE

The right-hand preview panel is the **most important UX element in the wizard**.

**Behaviour:**
- Shows a scaled-down version of able-v7.html (50% scale, 390px → 195px wide)
- Updates on every input change (debounced 150ms)
- Uses CSS transforms for scaling — no iframe needed for the preview
- Artist name, accent colour, theme, CTA text, campaign state — all update in real time

**Technical approach:**
- Preview is a `<div class="phone-preview">` containing mini HTML
- Same CSS variables as able-v7.html — preview shares the token system
- On wizard answer change: `updatePreview(field, value)` → updates CSS var or DOM text in preview
- On "Done": writes full data to `localStorage.setItem('able_v3_profile', ...)` → able-v7.html reads it

**Mobile behaviour:**
- Preview moves above the form (not beside it) at < 768px
- Shows at 70% opacity between steps, full opacity when relevant section is highlighted
- Shrinks to 200px-tall "peek" at 375px rather than full phone

---

## LINKTREE IMPORTER — TECHNICAL SPEC

This is the most important feature in onboarding. It is the primary switcher acquisition tool.

**User flow:**
1. Artist pastes `linktr.ee/[handle]` in Screen 0
2. Call: `/.netlify/functions/oembed-proxy?url=[encoded_url]` (existing function)
3. Parse the returned HTML for known link patterns:
   - `open.spotify.com/artist/` → Spotify platform link
   - `music.apple.com/` → Apple Music
   - `youtube.com/channel/` or `youtube.com/@` → YouTube
   - `soundcloud.com/` → SoundCloud
   - `bandcamp.com/` → Bandcamp
   - `instagram.com/` → Instagram social
   - `tiktok.com/@` → TikTok social
   - Everything else → Custom link (imported as button)
4. Show imported links list (Screen 5, import confirmation)
5. Write to profile: `links: [{type: 'spotify', url: '...', label: 'Spotify'}]`

**What NOT to do:**
- Don't try to scrape Linktree directly — it's client-rendered and blocks scrapers
- Use oembed-proxy which already handles this — just parse the response

**Failure state:** "We couldn't read your Linktree — links might be private. Add them manually →"

---

## SPOTIFY IMPORT — TECHNICAL SPEC

**User flow:**
1. Artist pastes Spotify artist URL in Screen 0
2. Extract artist ID from URL: `open.spotify.com/artist/[ID]`
3. Call Spotify public API (no auth needed for basic data):
   `https://api.spotify.com/v1/artists/[ID]` — requires Client Credentials token
4. Pull: `name`, `images[0].url` (avatar), `genres`, `followers.total`
5. Auto-fill: Screen 1 (name), Screen 2 (genre — map Spotify genre to ABLE vibe), Screen 3 (accent — suggest based on vibe)

**Spotify genre → ABLE vibe mapping:**
- `electronic`, `house`, `techno`, `ambient` → Electronic
- `hip hop`, `rap`, `trap`, `drill` → Hip-Hop / Rap
- `indie`, `alternative`, `indie rock` → Indie / Alternative
- `r&b`, `soul`, `neo soul` → R&B / Soul
- `folk`, `singer-songwriter`, `acoustic` → Singer-Songwriter
- `dance`, `club`, `garage`, `bassline` → Dance / Club
- Everything else → Other

**Netlify function:** `/.netlify/functions/spotify-import` — this function exists in the codebase already

---

## COPY PRINCIPLES FOR ONBOARDING

**Questions, not labels:**
- NOT: "Artist Name" → YES: "What do you go by?"
- NOT: "Genre" → YES: "What kind of music do you make?"
- NOT: "Choose theme" → YES: "How should your page feel?"

**Progress language:**
- "Step 3 of 7" — specific and honest, not vague
- "Almost there" is banned — too SaaS
- "You're building something." is the tone

**CTA text (screen-by-screen):**
- Screens 0–6: "Continue →" — neutral, forward
- Screen 7: "Build my page →" — this is the payoff tap
- Screen 8: "Go to my page →" — it's live

**Empty state for the preview:**
`Your page is taking shape.` — not "preview will appear here"

---

## CRITICAL TECHNICAL REQUIREMENTS

**Link detector (Screen 0):**
- Must detect input type on paste (not submit) — immediate feedback
- Regex patterns for all major platforms
- Network call debounced 500ms after paste
- Loading state: spinner in input field right side

**Progress bar:**
- Top of viewport (fixed position, below header)
- 2px height, accent colour
- Spring easing on width transitions
- Shows 0% on Screen 0, fills to 100% on Screen 7, stays at 100% on Done

**Back navigation:**
- Back button top-left on all screens except 0 and Done
- Direction-aware animation: forward = slide from right, back = slide from left
- Already implemented in current start.html — preserve this

**Keyboard navigation:**
- Enter key advances on all text input screens
- Escape key = back
- Arrow keys work on vibe/theme selection grids

**Mobile (375px):**
- Preview above form, 200px peek
- Large tap targets (64px) on all choice cards
- No horizontal scroll ever
- Input font-size ≥ 16px to prevent iOS zoom

**Data persistence:**
- Each completed screen writes immediately to `sessionStorage` (not localStorage)
- Only on Screen 7 submission: flush all to `localStorage.setItem('able_v3_profile', ...)`
- Reason: abandoned onboarding shouldn't pollute an existing artist's profile

---

## WHAT IT MUST FEEL LIKE

The artist should feel like the product is doing the work, not them.

If Spotify import works: they paste one URL, their name and genre are pre-filled, their page looks half-built before they've answered a question. That is the conversion moment.

If they start from scratch: each question is small, specific, and connected to something they can see updating on their page. The live preview turns abstract choices into concrete outcomes.

By the time they reach Screen 8: they should feel surprised that it was that easy. Not relieved that it's over.

The tone throughout: **patient, direct, confident**. ABLE knows what it's doing. It's going to help them build something real.

---

## CURRENT GAPS (What needs building/changing)

| Gap | Severity | Fix |
|---|---|---|
| Multiple questions per screen | P0 | Rebuild as 8 one-question screens |
| No Spotify import UI | P0 | Screen 0 universal link detector + Spotify API call |
| No Linktree import confirmation | P0 | Screen 5 import confirmation with link type badges |
| Live preview doesn't update per-keystroke | P1 | Real-time CSS var updates in preview div |
| "Continue" button too small on mobile | P1 | 56px height minimum, full-width on mobile |
| No "Done" screen — drops straight to profile | P1 | Build Screen 8 with share options |
| Vibe cards lack example artists | P2 | Add 2–3 names under each vibe |
| Theme Glass preview shows no artwork | P2 | Add sample artwork to Glass preview card |
| Screen progress jumps, doesn't animate | P2 | Spring easing on progress bar fill |
