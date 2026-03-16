# ABLE — Killer Features: Specification
**Created: 2026-03-16 | Status: ACTIVE — implementation spec**

Priority order: P0 (immediate, V1) → P1 (next sprint, V1) → P2 (V2, backend required)

---

## P0 — Auto-gig mode from calendar

### What it does exactly

When the current time crosses a show's `doorsTime` in `able_shows`, gig mode auto-activates — without any artist action. It deactivates automatically 4 hours after doors, or at midnight if no doors time is set. A show marked as "featured" (`featured: true`) takes priority if multiple shows exist on the same date.

The manual 24-hour toggle in admin remains — it's the override for artists who want to activate early (e.g. announcing at soundcheck) or for artists without a show in the system.

### Artist journey

1. Artist adds a show in admin as normal — venue, date, doors time, ticket URL.
2. On show day, at doors time, the artist's ABLE page automatically shifts to gig mode. The artist does nothing.
3. Admin shows a passive indicator: "Gig mode on — auto from [Venue Name], doors [time]." with a manual override option to deactivate.
4. 4 hours after doors, gig mode deactivates. Page returns to previous state (live / pre-release / profile — whatever it was before).
5. In admin, the show is marked as past. No cleanup required from the artist.

### Fan journey

1. Fan visits the ABLE page during the show window.
2. They see gig mode: tickets front, "On tonight" tag, venue name, doors time.
3. Tickets CTA is primary. If sold out is flagged, "Sold out" replaces the ticket CTA.
4. Fan experience is identical to manual gig mode — this is invisible infrastructure.

### Data model changes

No new localStorage keys required. Reads from existing `able_shows` and `able_gig_expires`.

New logic in the page-state resolver:

```js
// Auto-gig check — runs on page load and every 60s
function checkAutoGig(shows) {
  const now = Date.now();
  const todayShows = shows.filter(s => isToday(s.date));
  for (const show of todayShows) {
    const doorsMs = parseDoorsTime(show.date, show.doorsTime);
    const expiresMs = doorsMs + (4 * 60 * 60 * 1000);
    if (now >= doorsMs && now < expiresMs) {
      return { active: true, show, expiresMs, source: 'auto' };
    }
  }
  return { active: false };
}
```

`able_gig_expires` is set by this function when auto-activating, so the existing gig-mode countdown bar in admin still works correctly.

New field on gig state object: `source: 'auto' | 'manual'` — so admin UI can show "Auto from calendar" vs "Manual" in the gig mode indicator.

### Copy (ABLE voice)

Admin indicator (auto-active):
> "On tonight — [Venue], doors [time]. Auto from your shows list."

Admin override:
> "Turn off early"

Admin (manual override available when show is today but not yet doors time):
> "You're playing tonight. Gig mode goes on at [time] — or turn it on now."

Fan-facing (unchanged from existing gig mode copy):
> "On tonight." / "Doors [time]." / "Get tickets."

### V1 scope

Pure localStorage + `setInterval` logic. No backend required. Everything runs in the browser.

V1 includes:
- Auto-activate at doors time
- Auto-deactivate 4 hours post-doors
- Admin indicator showing source (auto vs manual)
- "Turn on now" manual override when show is today but pre-doors
- Fallback: midnight deactivation if no doors time set

V2 additions:
- Server-side time authority (prevents spoofing by device clock)
- Push notification to artist when auto-gig activates
- Multiple shows on same day — priority resolution UI

### Build complexity: S

One `setInterval` check, one `checkAutoGig()` function, minor admin UI indicator change. All existing gig mode infrastructure is reused. Estimated: 2–3 hours build + test.

### Dependencies

- `able_shows` data structure (already exists)
- `able_gig_expires` key (already exists)
- Existing gig mode rendering in `able-v7.html` (already exists)
- Existing gig mode admin panel in `admin.html` (already exists)

---

## P0 — Deep link campaigns

### What it does exactly

When an artist shares `ablemusic.co/luna?campaign=vinyl-restock`, the ABLE page:
1. Parses `?campaign=` from the URL on load
2. Auto-scrolls to the relevant section based on campaign-type mapping
3. Shows a contextual banner or hero message using the campaign name
4. Tags all events (fan sign-ups, CTA clicks, page views) with `source: 'vinyl-restock'`

Artists generate campaign URLs in admin with a simple UI: type a campaign name, pick a destination section, copy the URL.

### Artist journey

1. Artist is about to post a Story about their vinyl restock.
2. In admin → Analytics → Campaign links: they tap "New campaign link."
3. They type: "vinyl-restock" (or choose from suggestions: "merch-drop", "new-single", "tour-announce").
4. They select destination: "Merch section."
5. ABLE generates: `ablemusic.co/luna?campaign=vinyl-restock`
6. They copy it and paste into their Story.
7. Later in admin → Analytics, they see: "vinyl-restock: 340 visits, 47 sign-ups, 23 merch clicks."

### Fan journey

1. Fan sees Story about vinyl restock, taps link.
2. ABLE page loads. A brief animation shows the page sliding to the merch section.
3. A contextual chip appears near the top of the merch section (not a modal, not a banner):
   > "You're here from the vinyl restock."
   This disappears after 5 seconds or on first scroll. It is not intrusive.
4. Fan browses, buys, signs up. All analytics tagged.

### Data model changes

No new localStorage keys for V1. Campaign source appended to existing event objects:

```js
// able_fans entry
{ email: 'fan@example.com', ts: 1710000000, source: 'vinyl-restock' }

// able_clicks entry
{ label: 'Buy vinyl', type: 'merch', ts: 1710000000, source: 'vinyl-restock' }

// able_views entry
{ ts: 1710000000, source: 'vinyl-restock' }
```

`source` field already exists in the data model — this populates it from the URL parameter instead of leaving it undefined.

New in admin (localStorage only):
```js
// able_campaigns — array of defined campaign links
[{ id: 'vinyl-restock', label: 'Vinyl restock', section: 'merch', created: timestamp }]
```

### Section destination mapping

| Campaign type hint | Auto-scroll target | Trigger keywords |
|---|---|---|
| `merch-*` | Merch section (`#merch`) | "merch", "vinyl", "tee", "store" |
| `show-*` / `tour-*` | Events section (`#events`) | "show", "tour", "tickets", "gig" |
| `ep-*` / `album-*` / `single-*` | Music section (`#music`) | "ep", "album", "single", "drop" |
| `support-*` | Support section (`#support`) | "support", "patreon", "bandcamp" |
| anything else | Hero (no scroll) | — |

Artist can override the auto-detection by selecting a section explicitly in the campaign creator.

### Copy (ABLE voice)

Admin — campaign creator:
> "Where should this link take people?"
> "Name this campaign" (placeholder: "vinyl-restock, summer-tour, ep-drop...")

Admin — generated URL display:
> "Your link: ablemusic.co/[slug]?campaign=vinyl-restock"
> "Anyone who arrives through this link will show up separately in your analytics."

Fan-facing contextual chip (5-second auto-dismiss):
> "You came from the vinyl restock." (or: "You came from [campaign name].")

### V1 scope

V1 includes:
- URL parameter parsing on page load in `able-v7.html`
- Section auto-scroll on load (smooth, instant if reduced-motion)
- Source tagging on all existing event writes
- Campaign link generator in admin (generate URL, copy to clipboard)
- Basic campaign breakdown in analytics view (visits/sign-ups/clicks per source)
- Contextual fan chip (auto-dismiss, non-modal)

V2 additions:
- Campaign performance comparison charts
- A/B test two campaign links against each other
- UTM parameter passthrough (for Google Analytics / PostHog)
- Campaign-specific hero copy override (artist writes custom message per campaign)

### Build complexity: M

URL parsing is trivial. Auto-scroll exists (tabs use it). Event tagging requires touching 3–4 write functions. Analytics breakdown UI is new. Admin campaign creator is new UI. Estimated: 6–8 hours build + test.

### Dependencies

- Existing section IDs in `able-v7.html` (already exist)
- Existing event write functions: `writeFanSignup()`, `writeClick()`, `writeView()` (already exist)
- Analytics view in `admin.html` (already exists — extension required)

---

## P1 — One-tap release announcement

### What it does exactly

When an artist marks a release as live in admin (or when the release date is reached and auto-switches to `live` state), ABLE surfaces an announcement panel: "Your release is live. Tell your fans?"

One tap generates three things simultaneously:
1. A snap card draft: artist-name-and-release-specific, using existing snap card copy patterns.
2. An Instagram/TikTok caption draft: copyable text, first person, with the streaming link.
3. An email draft to fan list: subject line + short body, ready to send via Broadcasts (or for copy-paste if Broadcasts is locked).

The artist reviews, edits if needed, and publishes/copies. Three tasks become one moment.

### Artist journey

1. Artist's release date arrives. Page auto-switches to `live` state.
2. Admin shows: "Your release is live. Let your fans know?" — full-width card above Campaign HQ.
3. Artist taps "Show me the drafts."
4. Bottom sheet opens with three tabs: Snap card / Caption / Email.
5. Each tab shows the generated draft. Artist can edit inline.
6. Snap card: "Publish" button (one tap, live immediately).
7. Caption: "Copy" button (copies to clipboard, artist pastes into their social app).
8. Email: "Send" button (Pro tier — triggers Resend broadcast) or "Copy" (free/Artist tier).
9. Panel dismisses. "Done. Your fans know." (no exclamation mark.)

### Fan journey

1. Fan receives email (V2 — requires Resend) or sees snap card at top of ABLE page.
2. Snap card: artist's voice, present tense. "It's out. [Title] — streaming everywhere now."
3. Hero CTA is now "Stream [Title]" — pointing to the artist's primary platform.

### Data model changes

No new localStorage keys required.

New logic: `able_v3_profile.release.announced: boolean` — set to `true` after announcement is dismissed, so the panel doesn't resurface on every admin load. Reset when a new release is saved.

### Generated draft templates (ABLE voice)

**Snap card draft:**
> "[Title] is out now. [Short line from release description, if available.] Link in bio if you want to listen."

**Instagram caption draft:**
> "[Title] is out now.
>
> [Short line — artist writes this in release setup, or ABLE generates from genre/feel.]
>
> Link in my bio to stream, buy, or sign up to hear what's coming next."

**Email draft:**
> Subject: "[Title] is out."
>
> Body: "It's live.
>
> [Title] — [short description].
>
> [Stream CTA button — links to primary platform]
>
> I'll be in touch when there's more to share."

All drafts are fully editable before publish/send. These are starting points, not final copy.

### Copy (ABLE voice)

Admin panel headline:
> "Your release is live. Let your fans know?"

Panel dismiss (after action):
> "Done."

Panel dismiss (skip):
> "Skip for now"

### V1 scope

V1 includes:
- Release-live detection (on admin load, check if release date passed and `announced` is false)
- Draft generation for snap card + caption (pure JS, no API)
- Snap card publish (existing snap card write function)
- Caption copy to clipboard
- Email draft display (Pro-locked send, free copy)
- `announced` flag set on dismiss

V2 additions:
- AI-generated draft body using Claude Haiku (netlify function `ai-copy.js` already exists)
- Email send via Resend integration
- Scheduling: "Send tonight at 7pm" option

### Build complexity: M

Draft generation is templated JS. The bottom sheet component exists in admin. Snap card write function exists. Email send is tier-locked and deferred to V2. Estimated: 5–7 hours build + test.

### Dependencies

- Existing snap card CRUD in `admin.html`
- Existing bottom sheet component (`openAdminSheet` / `closeAdminSheet`)
- `able_v3_profile.release` data (already exists)
- Tier gate system for email send (already exists)

---

## P2 — True Spotify pre-save

### What it does exactly

In pre-release mode, the fan-facing CTA changes from "Sign up for updates" to "Pre-save on Spotify." Tapping it initiates Spotify OAuth in a popup or redirect. After auth, ABLE calls the Spotify API to add the upcoming release to the fan's library (when it becomes available on release day). The fan's email is collected as part of the OAuth exchange — one step, two outcomes.

### Artist journey

1. Artist sets a future release date and adds a Spotify pre-save URL (or album URI) in release settings.
2. ABLE page automatically enters pre-release mode with "Pre-save on Spotify" as the primary CTA.
3. In admin, artist sees: "Pre-save count: 47 fans have pre-saved on Spotify." (real number, not email count.)
4. On release day: those 47 fans have the album auto-added to their Spotify. No email needed. No second ask.

### Fan journey

1. Fan taps "Pre-save on Spotify."
2. Spotify auth popup opens: "ABLE wants to add [Title] to your library."
3. Fan approves. Popup closes.
4. ABLE page shows: "You're set. We'll add it the day it drops." — no email form required (email captured from Spotify profile).
5. Fan optionally sees: "Stay close too?" — ABLE fan sign-up, separate opt-in. Not forced.

### Data model changes

V1 (email only — current state with honest framing):
- No changes. Label the CTA correctly: "Be first to know" not "Pre-save."

V2 (true pre-save):
- New Supabase table: `presaves { fan_id, artist_id, release_id, spotify_id, ts, fulfilled_at }`
- New Netlify function: `spotify-presave.js` — handles OAuth exchange, stores token, schedules save
- New Netlify function: `spotify-presave-fulfil.js` — cron job, runs on release day, calls Spotify API for all unfulfilled presaves
- `able_v3_profile.release.spotifyUri` field — where artist inputs the Spotify album URI

### Copy (ABLE voice)

Fan-facing CTA (V1 — honest):
> "Be first to know when it drops."

Fan-facing CTA (V2 — true pre-save):
> "Pre-save on Spotify"

Post-pre-save confirmation (V2):
> "You're set. It goes straight to your library on [date]."

Admin (V2):
> "[X] people have pre-saved on Spotify."

Admin — missing Spotify URI nudge:
> "Add a Spotify link to enable pre-saves in your release settings."

### V1 scope

V1: email collection with honest "Be first to know" framing. No fake pre-save button.

V2 scope:
- Spotify OAuth via PKCE (no client secret in browser)
- Netlify function handles token exchange
- Pre-save fulfilment cron on release day
- Fan email fallback if Spotify email is unavailable

### Build complexity: XL (V2 only)

Spotify OAuth, token storage, cron job scheduling, release-day fulfilment, error handling for expired tokens. Not a small project. V2, after Supabase is live. Estimated: 3–5 days.

### Dependencies

- Supabase (auth + presaves table)
- Netlify functions (already configured)
- Spotify Developer App registration
- `spotifyUri` field on release data model

---

## P2 — Fan location heatmap (summary spec)

Full spec deferred to V2 systems docs. Requires:
- Opt-in geolocation on fan sign-up form (`navigator.geolocation`, city-level only)
- Supabase geolocation column on `fans` table
- Server-side aggregation query (count fans by city, radius-based grouping)
- Admin map component (lightweight — consider Mapbox GL or a canvas-based solution)
- Tier gate: Artist Pro only

Copy in admin:
> "[X] of your fans are in [City]. [Y] in [City]."
> "Use this when you're routing a tour."
> (No "target your audience" — wrong register.)

---

## P2 — Snap card read receipts (summary spec)

Full spec deferred to V2 systems docs. Requires:
- New event type: `able_card_views: [{ cardId, ts, source }]`
- Card view write on snap card visibility in viewport (IntersectionObserver)
- "Seen by [X]" display in admin snap card list
- Framing note: display as "X people read this" not "X impressions" — human, not metric

---

## P1 — "Tonight" draft automation (summary spec)

Bundled with one-tap release announcement as the same drafting infrastructure. Trigger is different (show date instead of release date) but the draft generation and bottom sheet pattern are identical.

Generates:
- Snap card draft: "Heading to [Venue] tonight. Doors at [time]. [City] — last few tickets." (editable)
- Instagram caption draft (editable)

Does not generate email (show-night emails should be sent earlier in the day — a separate automation).

Build complexity: S (shares all infrastructure with one-tap announcement).

---

## P1 — QR code for gig-mode URL (summary spec)

Build complexity: S.

- In admin, gig mode panel: "Download QR code" button appears when gig mode is active or a show is today.
- Uses `qrcode.js` (CDN, 15kB) to generate a canvas QR code in the browser.
- URL encoded: `ablemusic.co/[slug]?mode=gig` — triggers gig mode display regardless of current state.
- Canvas exported as PNG download. Artist sends to printer or shares digitally.
- On mobile: share sheet instead of download.

Copy:
> "Put this on your flyers. It takes people straight to tonight's show."

---

*All P0 features can be built with zero backend changes.*
*All P1 features require minor new UI only.*
*All P2 features require Supabase + Netlify functions.*
