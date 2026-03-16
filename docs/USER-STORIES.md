# ABLE — User Stories Master Document
**Date: 2026-03-16**
**Authority: V8_BUILD_AUTHORITY.md + all active page specs**

This document is the definitive bridge between strategy and build. It articulates what
each type of user needs to accomplish across every touchpoint in the product. Use it to
validate that what is built serves the people it is built for.

This is not Agile ticket writing. Stories are not sized or pointed. Priority reflects
product importance, not sprint planning.

**Priority key:**
- P0 — Product is broken without this. Ship first.
- P1 — Product works without this but is significantly worse. Ship soon.
- P2 — Product improvement. Ship when P0/P1 are done.

**Status key:**
- Built — exists in current build, works correctly
- Partial — exists but incomplete, broken, or copy-non-compliant
- Not built — no implementation exists

---

## PART 1: ARTIST STORIES

The artist is the primary customer. Every decision flows through the question: does this
make the artist feel in control of their page and their relationship with their fans?

---

### Day 0: Setup

---

**AS-01**
As an artist, I want to paste my Spotify URL and see my profile mostly filled in, so I
can get live in under 5 minutes.

**Acceptance criteria:**
- Artist pastes a Spotify artist URL or track URL into the onboarding import field
- Within 5 seconds: artist name, genre, latest release title, and release artwork are
  auto-populated
- The profile preview phone updates in real time as data arrives
- If Spotify import fails: the wizard continues to the manual entry path with no error
  modal blocking progress

**Priority:** P0
**Where it's built:** `start.html` → `netlify/functions/spotify-import.js`
**Status:** Partial — serverless function exists but is not wired to the wizard UI

---

**AS-02**
As an artist, I want to choose an accent colour that matches my artwork, so my page
feels like mine.

**Acceptance criteria:**
- Accent colour picker shows a grid of preset swatches + a custom hex input
- Selecting any swatch updates the live preview phone in real time (< 100ms)
- The chosen colour is stored in `able_v3_profile.accent` and applied globally via
  `--color-accent` on `able-v7.html`
- All four themes (Dark, Light, Glass, Contrast) render correctly with any chosen colour

**Priority:** P0
**Where it's built:** `start.html` (step 2), `able-v7.html` (accent application)
**Status:** Built

---

**AS-03**
As an artist, I want to see a live preview as I fill in my details, so I know exactly
what fans will see.

**Acceptance criteria:**
- The right-hand preview phone on `start.html` updates on every keystroke for name and
  bio fields
- Colour, vibe, and theme changes update the preview instantly (no submit required)
- The preview shows the correct hero CTA text and layout for the selected CTA type
- The preview is scrollable so the artist can see below the fold before finishing setup

**Priority:** P0
**Where it's built:** `start.html` (live preview component)
**Status:** Built

---

**AS-04**
As an artist, I want to share my page link immediately after setup, so I can post it
in my Instagram bio today.

**Acceptance criteria:**
- The Done screen shows a copy-link button and an open-link button
- Tapping copy-link copies `https://ablemusic.co/{slug}` to clipboard with a brief
  confirmation ("Copied")
- The link opens `able-v7.html` correctly
- The Done screen also shows a prompt: "Paste this link in your Instagram bio."

**Priority:** P0
**Where it's built:** `start.html` Done screen
**Status:** Built

---

### Active releasing

---

**AS-05**
As an artist, I want to set a release date and have my page automatically switch to
pre-release mode, so I don't have to remember to change anything.

**Acceptance criteria:**
- Artist sets release date in `admin.html` Campaign HQ
- From that point, `able-v7.html` checks `releaseDate` on load and renders the
  pre-release state if `releaseDate > now`
- Pre-release state shows: countdown timer, pre-save CTA as primary hero CTA
- State switches automatically to `live` when `releaseDate` is reached (no manual
  action required)
- State switches automatically to `profile` 14 days after `releaseDate`

**Priority:** P0
**Where it's built:** `admin.html` Campaign HQ, `able-v7.html` state machine
**Status:** Built

---

**AS-06**
As an artist, I want to manually activate gig mode on the day of a show, so fans who
click my bio see tickets front and centre.

**Acceptance criteria:**
- Gig mode toggle is visible in `admin.html` Campaign HQ
- Activating gig mode sets `able_gig_expires` to `now + 24 hours`
- `able-v7.html` renders the gig state: "On tonight" badge, ticket CTA as primary,
  artist-authored tonight note in the hero
- After `able_gig_expires` timestamp is reached, page reverts to the previous state
  automatically

**Priority:** P0
**Where it's built:** `admin.html` gig toggle, `able-v7.html` gig state
**Status:** Built

---

**AS-07**
As an artist with a show tonight, I want gig mode to activate automatically at my
show's door time, so I never forget to switch it on.

**Acceptance criteria:**
- When a show in `able_shows` has a `doorsTime` set, gig mode activates automatically
  when the device time crosses that timestamp
- The admin shows a visible indicator: "Gig mode will activate at [doorsTime] tonight"
- Auto-activation uses the same 24-hour expiry as manual activation
- Artist can still manually deactivate if needed

**Priority:** P1
**Where it's built:** `admin.html` show management, gig mode timer
**Status:** Not built — auto-activation from show door time is not implemented

---

**AS-08**
As an artist, I want to post a snap card update in under 30 seconds, so I can share a
thought without opening Instagram.

**Acceptance criteria:**
- "Add snap card" is accessible in under 2 taps from the admin home screen
- The snap card creation interface requires: text input only (image optional)
- Published snap card appears on `able-v7.html` within 1 second of save
- Total time from opening admin to visible snap card on profile: under 30 seconds

**Priority:** P1
**Where it's built:** `admin.html` snap card management
**Status:** Built

---

**AS-09**
As an artist, I want to add a show to my calendar and have it appear on my profile and
in my fans' calendars, so fans who follow me always know where I'm playing.

**Acceptance criteria:**
- Shows added in `admin.html` appear in the Events section of `able-v7.html` within
  1 second
- Show data includes: venue name, date, doors time, ticket URL, and optional featured flag
- Shows appear in `fan.html` Near me tab for fans in the correct city
- Upcoming shows are sorted chronologically, with past shows hidden or de-prioritised

**Priority:** P1
**Where it's built:** `admin.html` shows management, `able-v7.html` events section,
`fan.html` Near me tab
**Status:** Partial — shows management and profile display are built; fan.html Near me
display requires location matching which is built but uses approximate string comparison

---

### Fan management

---

**AS-10**
As an artist, I want to see a list of everyone who has signed up, with their email,
source, and when they joined, so I know who my fans are.

**Acceptance criteria:**
- `admin.html` Fan List shows all entries from `able_fans` in reverse chronological order
- Each row shows: email, sign-up date, source (which page or referral), and a star toggle
- Starred fans are indicated visually and sortable to the top
- Fan count is shown in the header ("42 people on your list")

**Priority:** P0
**Where it's built:** `admin.html` fan list section
**Status:** Built

---

**AS-11**
As an artist, I want to export my fan list as a CSV, so I can use it in Mailchimp or
import it anywhere.

**Acceptance criteria:**
- "Export" button in the fan list section downloads a .csv file
- CSV includes: email, sign-up date, source
- Download works without a backend (client-side CSV generation from `able_fans`)
- Exported file is named `able-fans-{date}.csv`

**Priority:** P1
**Where it's built:** `admin.html` fan list export
**Status:** Built

---

**AS-12**
As an artist with 100 fans, I want to email all of them directly, so I can announce
my new single personally (Artist Pro tier).

**Acceptance criteria:**
- Broadcasts section in `admin.html` is accessible behind Artist Pro tier gate
- Artist can compose an email with a subject line and body in their own voice
- Preview shows how the email will render before sending
- Send dispatches via `netlify/functions/` to the artist's full fan list
- Confirmation shows number of recipients and estimated delivery time
- Free/Artist tier sees a blurred preview with a specific upgrade proposition:
  "Email your list directly. £9/mo Artist plan."

**Priority:** P1
**Where it's built:** `admin.html` Broadcast section
**Status:** Partial — section exists with tier gate; send function not implemented

---

### Admin and page management

---

**AS-13**
As an artist, I want to reorder my page sections without breaking anything, so the
most relevant section is always first.

**Acceptance criteria:**
- Section ordering controls in `admin.html` allow drag-to-reorder or up/down buttons
- Reordering persists to `able_v3_profile.sections` immediately
- `able-v7.html` renders sections in the artist-set order
- No section disappears or throws a JS error when reordered

**Priority:** P1
**Where it's built:** `admin.html` section order controls, `able-v7.html` section render
**Status:** Built

---

**AS-14**
As an artist, I want to hide sections I'm not using without deleting them, so my page
stays clean.

**Acceptance criteria:**
- Each section in `admin.html` has a visibility toggle
- Hidden sections do not render on `able-v7.html` for fans
- Hidden sections are still visible in `admin.html` so the artist can re-enable them
- Toggling visibility does not delete the section data

**Priority:** P1
**Where it's built:** `admin.html` section visibility, `able-v7.html` shouldRender logic
**Status:** Built

---

**AS-15**
As an artist, I want to change my accent colour and see it update everywhere instantly,
so I can match each campaign.

**Acceptance criteria:**
- Accent colour change in `admin.html` saves to `able_v3_profile.accent`
- `able-v7.html` reads the updated accent on page load
- No page refresh required in admin to see the new accent apply to the admin chrome
- All four themes continue to work correctly with the new accent

**Priority:** P1
**Where it's built:** `admin.html` profile settings, `able-v7.html` accent application
**Status:** Built

---

**AS-16**
As an artist, I want to add credits to my releases, so my collaborators get visibility
and I can link to their profiles when they're on ABLE.

**Acceptance criteria:**
- Release cards in `admin.html` include a credits field (producer, mixer, etc.)
- Credits with an ABLE handle (`@ableHandle`) render as a tappable link on
  `able-v7.html` pointing to that freelancer's profile
- Credits without an ABLE handle render as plain text
- Credits are visible on the release card in fan view

**Priority:** P1
**Where it's built:** `admin.html` release management, `able-v7.html` release card
**Status:** Partial — release cards exist; credits field exists but ABLE handle linking
is not implemented (freelancer.html does not exist yet)

---

**AS-17**
As an artist, I want to see which CTAs my fans are tapping most, so I know what's
working.

**Acceptance criteria:**
- `admin.html` Analytics section shows CTA tap events from `able_clicks`
- Events are broken down by: label (e.g. "Stream"), type, and date
- At minimum: total taps per CTA in the last 7 days
- Data source is `able_clicks` in localStorage (Phase 1 — local only)

**Priority:** P1
**Where it's built:** `admin.html` analytics section
**Status:** Built (local analytics from localStorage)

---

**AS-18**
As an artist, I want my page to look professional even when I have no releases listed
yet, so new artists aren't embarrassed.

**Acceptance criteria:**
- When no releases exist, the Music section is hidden entirely (not shown as empty)
- The hero zone renders with the artist's name, bio, and accent colour regardless of
  whether releases are present
- The fan sign-up module is always visible — it requires no content to function
- No fan-visible placeholder text like "No releases added yet" appears anywhere

**Priority:** P0
**Where it's built:** `able-v7.html` empty state logic
**Status:** Partial — some empty sections are hidden correctly; placeholder text
has been removed from most but not all sections per current build audit

---

---

## PART 2: FAN STORIES

The fan is the reason the artist joined ABLE. The fan experience must feel like the
artist built it — not like a SaaS platform. Every fan-facing touchpoint must serve the
relationship between the fan and the artist, not between the fan and ABLE.

---

**FS-01**
As a fan, I want to see what an artist is working on right now when I land on their
page, so I don't just see a list of links.

**Acceptance criteria:**
- The correct campaign state renders based on the artist's current context (pre-release,
  live, gig, or profile)
- In pre-release mode: countdown and pre-save CTA are prominent in the hero
- In live mode: stream CTA is primary, release artwork is in the top card
- In gig mode: "On tonight" badge, ticket CTA is primary, tonight note is in the hero
- In profile mode: latest release is visible, artist bio and snap cards tell their story

**Priority:** P0
**Where it's built:** `able-v7.html` state machine
**Status:** Built

---

**FS-02**
As a fan, I want to sign up with just my email (no app, no account), so I can stay
close to an artist without friction.

**Acceptance criteria:**
- Fan sign-up on `able-v7.html` requires only an email address — no name, no password,
  no account creation
- The submit button is first-person ("Stay close" or artist-customised)
- A confirmation message appears immediately after submit without page reload
- The email is stored to `able_fans` in localStorage (and Supabase when live)
- A confirmation email is sent from the artist's ABLE identity

**Priority:** P0
**Where it's built:** `able-v7.html` fan sign-up module, `netlify/functions/fan-confirmation.js`
**Status:** Built (localStorage), partial (email send not wired without Supabase)

---

**FS-03**
As a fan who has signed up, I want to see shows and upcoming releases from all artists
I follow in one place, so I don't miss anything.

**Acceptance criteria:**
- `fan.html` Following tab shows items from all followed artists chronologically
- Item types include: releases (new music), shows (upcoming events), snap card updates
- Each item shows the artist's name prominently (weight 500, not muted)
- "Today" and "This week" groupings separate recent items from older ones
- A fan following 3+ artists sees a mix of items from all of them, not just the most
  recently signed-up

**Priority:** P0
**Where it's built:** `fan.html` Following tab
**Status:** Partial — demo data renders correctly; real cross-artist data requires
Supabase (V1 limitation: localStorage is per-browser session)

---

**FS-04**
As a fan arriving at `fan.html` for the first time after signing up, I want to see the
artist I just signed up through, so the page doesn't feel blank and disconnected.

**Acceptance criteria:**
- `fan.html` reads `?artist={slug}&ref=signup` URL parameters on first arrival
- The following list is seeded with the artist slug immediately
- A message reads: "You followed [Artist Name]. Here's what they've shared."
- If the artist has no recent content: "Nothing new from [Artist Name] today — but
  they're here when they are."
- The URL parameters are cleaned after reading (`history.replaceState`)

**Priority:** P0
**Where it's built:** `fan.html` URL parameter arrival handler
**Status:** Partial — `writeFanFollow()` exists in `able-v7.html` and seeds localStorage;
`fan.html` arrival parameter reading and first-visit orientation copy is partial

---

**FS-05**
As a fan, I want to discover artists I might genuinely like who are connected to artists
I already follow, so I can find more music through real connections rather than algorithms.

**Acceptance criteria:**
- `fan.html` Discover tab shows artists with honest connection reasons: "Same sound",
  "Produced by [Name]", "Also from [City]"
- No follower counts or popularity metrics on artist cards
- "Connected" filter shows artists linked via credits on followed artists' releases
- Discovery is taste-based (genre, location, credits) not engagement-based
- A fan can follow a discovered artist with a single tap

**Priority:** P1
**Where it's built:** `fan.html` Discover tab
**Status:** Partial — Discover tab is built with demo data; credit-based connections
require a functioning credits system on artist profiles (partial)

---

**FS-06**
As a fan, I want to know when artists I follow are playing near me, so I don't miss
a show because I didn't know about it.

**Acceptance criteria:**
- `fan.html` Near me tab shows shows from followed artists in the fan's city
- Fan's city is set from a simple text input (one field, no geolocation required)
- Shows are grouped as Tonight / This Week / Coming Up based on real date comparison
- Both followed and discovery artists' shows appear (followed artists prioritised)
- Each show shows the ticket URL when available

**Priority:** P1
**Where it's built:** `fan.html` Near me tab
**Status:** Partial — Near me tab built with demo data; date-relative grouping uses
approximate day-of-month comparison (not correct date arithmetic — PATH-TO-10 P1.2 fix)

---

**FS-07**
As a fan at a show, I want to scan a QR code and land on the artist's gig-mode page,
so I feel connected and can access tickets or setlist information.

**Acceptance criteria:**
- QR code scans link to `able-v7.html?src=qr` (or the artist's canonical URL)
- Artist page is in gig mode if the gig toggle is active
- Gig mode shows: "On tonight" badge, ticket CTA, artist's tonight note
- QR code tap is tracked with `source=qr` in `able_views` for analytics
- `fan.html` can also receive `?artist={slug}&ref=qr` to add the artist to following

**Priority:** P1
**Where it's built:** `able-v7.html` gig mode + source tracking, `admin.html` QR display
**Status:** Partial — source tracking exists; QR code display in admin exists;
no dedicated QR code generation feature — admin shows the page URL only

---

**FS-08**
As a supporter, I want to hear new music 48 hours before it goes public, so my
Close Circle membership means something real.

**Acceptance criteria:**
- An artist can mark a clip or release as "Supporters first"
- Close Circle members see the content 48 hours before the embargo lifts
- The teaser for non-members reads: "Fans get this first." (no "unlock" language)
- The embargo lifts automatically at the `supporterUnlocksAt` timestamp
- The supporter experience requires no additional action — it just appears

**Priority:** P1
**Where it's built:** `able-v7.html` supporter gate, `docs/systems/reels-feed/SPEC.md`
**Status:** Not built — UI gate exists for snap cards; supporter-first embargo timer
is not implemented; clips feature (which will use this) is not built

---

**FS-09**
As a fan, I want to navigate from an artist's profile to the producer who made their
music, so I can discover more music I'll like.

**Acceptance criteria:**
- Release cards on `able-v7.html` show credits with ABLE handle links
- Tapping a credited producer's ABLE handle navigates to their `freelancer.html` profile
- The freelancer profile shows their other credits — linking back to other artist profiles
- If the credited person has no ABLE profile, their name renders as plain text

**Priority:** P2
**Where it's built:** `able-v7.html` release card credits, `freelancer.html`
**Status:** Not built — freelancer.html does not exist; credits field is partial on
release cards; ABLE handle linking is not implemented

---

**FS-10**
As a fan who signs up but later forgets who the artist is, I want the confirmation
email to remind me clearly, so I don't mark it as spam.

**Acceptance criteria:**
- Confirmation email subject line includes the artist's name: "You're on [Artist Name]'s
  list."
- Email body is in the artist's voice, mentioning what the fan can expect
- The email includes the artist's profile link and artwork
- The sender name reads as the artist ("Nova Reign via ABLE"), not just "ABLE"
- The email includes a one-click unsubscribe link

**Priority:** P1
**Where it's built:** `netlify/functions/fan-confirmation.js`
**Status:** Partial — function exists and reads `profile.release.title`; Supabase trigger
to send on sign-up is not wired; sender name format needs verification

---

---

## PART 3: FREELANCER STORIES

Freelancers (producers, mixers, videographers, photographers) are the third persona.
They are discovered through credits on artist profiles. Their ABLE page is a professional
asset — leads come to them through the music, not through a marketplace.

**Note:** `freelancer.html` does not exist yet. These stories are Phase 2 scope.

---

**FL-01**
As a producer, I want to confirm my credit on an artist's release with one tap, so
my profile link goes live on their page.

**Acceptance criteria:**
- When an artist adds a credit with a producer's ABLE handle, the producer receives
  a notification
- The notification contains: artist name, release title, and a "Confirm" button
- Tapping confirm adds the credit to the producer's public credits list
- The credit on the artist's release card becomes a tappable link to the producer's profile
- If the producer does not confirm within 7 days, the credit remains as plain text
  (not removed — the artist is not penalised for an unconfirmed credit)

**Priority:** P2
**Where it's built:** `admin.html` credit management, `freelancer.html` (not yet built),
notification system (not yet built)
**Status:** Not built

---

**FL-02**
As a producer with confirmed credits, I want booking enquiries to come through my ABLE
page, so I don't need a separate website.

**Acceptance criteria:**
- `freelancer.html` has a booking enquiry form: project type, timeline, budget range,
  message (4 fields max)
- Submitting the form sends an email to the producer's registered address
- The producer's page shows their confirmed credits, rate card, availability status, and
  booking CTA
- No marketplace signals (ratings, reviews, bids) — this is not Fiverr

**Priority:** P2
**Where it's built:** `freelancer.html` (not yet built)
**Status:** Not built

---

**FL-03**
As a mixer, I want to show my rate card and availability status on my profile, so artists
know immediately if I'm available and what I charge.

**Acceptance criteria:**
- `freelancer.html` allows the freelancer to set: availability status (available / busy /
  on request), rate range (optional), services offered
- Availability status auto-expires after a set date (no ghost "Available" profiles)
- Rate card is optional — some freelancers prefer enquiry-led pricing
- The page is discoverable only via credits on artist profiles — not via a public directory
  (Phase 3 consideration only)

**Priority:** P2
**Where it's built:** `freelancer.html` (not yet built)
**Status:** Not built

---

---

## PART 4: PLATFORM ADMIN STORIES

These stories cover James-as-operator. Relevant spec: `docs/systems/platform-admin/SPEC.md`.

---

**PA-01**
As the platform owner, I want to suspend an artist who is violating terms with one
command, so I can keep the platform clean.

**Acceptance criteria:**
- Platform admin interface allows search for an artist by email or slug
- Suspend action sets a `suspended: true` flag on the artist's profile record
- Suspended profiles redirect to a neutral 404-equivalent page
- Suspension is reversible — unsuspend restores the profile
- Action is logged with timestamp and admin identifier

**Priority:** P1
**Where it's built:** `docs/systems/platform-admin/SPEC.md`, Supabase admin interface
**Status:** Specced (SQL library exists); not built in application UI

---

**PA-02**
As the platform owner, I want to see total signups, paid artists, and MRR at a glance,
so I know if the business is working.

**Acceptance criteria:**
- Platform admin dashboard shows: total registered artists, paid artist count, MRR,
  total fan sign-ups across all artists
- Numbers update on page load (not cached stale data)
- Each metric has a 7-day trend indicator (up/down/flat)
- No artist-level personal data is shown in the aggregate view

**Priority:** P1
**Where it's built:** `docs/systems/platform-admin/SPEC.md`, Supabase aggregate queries
**Status:** Specced; not built

---

**PA-03**
As the platform owner, I want to respond to a GDPR data deletion request by deleting
all records for an email address, so I'm compliant.

**Acceptance criteria:**
- Platform admin has a "Delete all data for email" function
- Deletion removes: `fans` table rows, `profiles` record (if the email is an artist),
  `clicks` records, `views` records — all tables containing the email
- Deletion is confirmed before executing (two-step: "Delete" then "Confirm — this
  cannot be undone")
- Confirmation email is sent to the deleted address confirming the deletion
- Deletion is logged with timestamp (without the personal data — only that a deletion
  occurred at this timestamp for a request ID)

**Priority:** P1
**Where it's built:** `docs/systems/platform-admin/SPEC.md`, Supabase RPC function
**Status:** Specced (SQL function referenced); not built in application UI

---

**PA-04**
As the platform owner, I want to override an artist's tier to give them free Artist Pro,
so I can seed early producers and strategic partners.

**Acceptance criteria:**
- Platform admin can set `tier: 'pro'` on any artist record
- Override is flagged as admin-set (not from billing) so it doesn't conflict with
  Stripe subscription checks
- Override can be time-limited (e.g. "Artist Pro free until 2026-06-01")
- Artist sees Artist Pro features immediately after override — no logout/login required

**Priority:** P1
**Where it's built:** `docs/systems/platform-admin/SPEC.md`, Supabase admin RPC
**Status:** Specced; not built

---

---

## PART 5: EDGE CASE STORIES

These stories cover the scenarios that break products that were only designed for the
happy path. Each one must work correctly before the product is considered production-ready.

---

**EC-01**
As an artist with no releases yet, I want my page to still look professional and tell
my story, so new artists aren't embarrassed.

*See also: AS-18 above.*

**Acceptance criteria:**
- Profile renders with only: artist name, bio, accent colour, platform pills, fan sign-up
- No empty section shells visible to fans
- Owner mode shows gentle edit prompts in each hidden section zone
- The fan sign-up module copy still makes sense without a release context
  ("Stay close." — not "Stay close to hear my new album" which would be wrong
  if there is no album)

**Priority:** P0
**Where it's built:** `able-v7.html` empty state logic
**Status:** Partial — see AS-18

---

**EC-02**
As an artist whose release date has passed, I want my page to revert to profile mode
automatically after 14 days, so I don't have to manage transitions.

**Acceptance criteria:**
- State machine on `able-v7.html` computes: `if now > releaseDate + 14d → profile`
- No manual action required from the artist
- The reversion does not delete the release card — it just changes the state
- Admin reflects the current computed state accurately

**Priority:** P0
**Where it's built:** `able-v7.html` state machine
**Status:** Built

---

**EC-03**
As an artist who hasn't shared their page yet (Day 1), I want a clear prompt to share
it, so I actually get my first fans.

**Acceptance criteria:**
- First-run checklist in `admin.html` includes "Share your page" as an item
- Checklist item provides: copy-link button, Instagram bio instruction, and an
  example message the artist can use as a caption
- Checklist dismisses automatically when the artist has at least 1 fan sign-up
- If dismissed manually, it does not reappear

**Priority:** P0
**Where it's built:** `admin.html` first-run checklist
**Status:** Built

---

**EC-04**
As a fan on a slow mobile connection, I want the page to load quickly and music to play
without buffering, so I don't bounce.

**Acceptance criteria:**
- `able-v7.html` renders from localStorage immediately without waiting for any API call
- LCP ≤ 2.5s on a Moto G4 equivalent (Chrome DevTools throttled 4G)
- HTML file is ≤ 340kB gzipped
- Video content (if any) uses `preload="none"` and does not load until user taps play
- Embedded iframes use `loading="lazy"` to prevent offscreen network load
- External failure (Supabase or CDN down) shows gracefully degraded content — never
  a blank page

**Priority:** P0
**Where it's built:** `able-v7.html` performance budget
**Status:** Built (file size 78kB gzipped; localStorage render path confirmed)

---

**EC-05**
As a fan who signs up but forgets who the artist is, I want the confirmation email to
remind me clearly, so I don't mark it as spam.

*See also: FS-10 above.*

**Acceptance criteria:**
- Email subject reads: "You're on [Artist Name]'s list." — never "Welcome to ABLE"
- Email opens with the artist's artwork image (not ABLE's branding)
- Unsubscribe link is prominent and one-click
- Sender domain passes SPF and DKIM (so it does not land in spam)
- The email is sent within 30 seconds of sign-up

**Priority:** P1
**Where it's built:** `netlify/functions/fan-confirmation.js`
**Status:** Partial — see FS-10

---

**EC-06**
As an artist who changes their accent colour mid-campaign, I want the old colour not
to appear anywhere stale, so the page always looks intentional.

**Acceptance criteria:**
- Accent colour is applied via a single `--color-accent` CSS variable on `able-v7.html`
- There are no hardcoded colour values in the HTML or CSS that would ignore an accent
  colour change
- Fan sign-up button, hero CTA, platform pill indicators, and progress bars all read
  from `--color-accent`
- Changing the accent in admin takes effect on next page load — no stale cache
  rendering the old colour

**Priority:** P1
**Where it's built:** `able-v7.html` CSS token system, `admin.html` accent save
**Status:** Built

---

**EC-07**
As a fan who finds an artist through Discover on fan.html, I want the reason shown
for the recommendation to be honest, so I trust it.

**Acceptance criteria:**
- Every artist card in the Discover tab shows a reason string
- Reason strings are drawn from real data: genre match, city, credit connections
- Reason strings never say "Recommended for you" or "You might like"
- If no specific reason can be computed (e.g. a very new artist with no connections),
  the card shows "New to ABLE" — not a manufactured "you might like" reason
- Follower counts are not shown on any artist card in Discover

**Priority:** P1
**Where it's built:** `fan.html` Discover tab
**Status:** Partial — demo data shows reason strings correctly; logic to compute them
from real artist data requires Supabase connections (Phase 2)

---

**EC-08**
As an artist using gig mode, I want my page to reflect the "show has happened" state
after the show ends, so fans who arrive after the show feel something rather than a
stale "On tonight" badge.

**Acceptance criteria:**
- When `able_gig_expires` has passed, the gig state is cleared automatically
- The page reverts to the appropriate previous state (pre-release, live, or profile)
- The "On tonight" badge does not linger after the show
- Optional Phase 2: a "Thanks for coming" post-show state that can be set manually
  for the 24 hours after the show, with an artist voice message

**Priority:** P1
**Where it's built:** `able-v7.html` gig mode expiry logic
**Status:** Built (auto-expiry); post-show state is not built

---

**EC-09**
As a fan visiting `fan.html` on a new device after previously signing up through a
different browser, I want my following list to persist, so I don't lose my artists.

**Acceptance criteria:**
- This is a known V1 limitation: localStorage is per-browser, per-device
- In V1: `fan.html` shows an honest empty state with instructions to find artists again
- In Phase 2 (Supabase auth): magic link sign-in recovers the fan's full following list
  and feed on any device
- The V1 empty state never implies the data was lost — it says:
  "Your following list is empty. Find artists from their pages, or look through Discover."

**Priority:** P1 (Phase 2 implementation) / P0 (honest empty state copy)
**Where it's built:** `fan.html` empty state, Phase 2 Supabase fan auth
**Status:** Partial — empty state exists; auth-based recovery is Phase 2

---

**EC-10**
As an artist who sets a release date far in advance, I want the pre-release countdown
to be visible but not overwhelming for fans who land many weeks before the drop, so
the page doesn't feel like it's all about a distant future event.

**Acceptance criteria:**
- Pre-release mode is active when `releaseDate > now`
- If the release is more than 14 days away: countdown shows the date ("Dropping March 28")
  not a granular day counter (no "312 hours 42 minutes")
- If the release is 14 days or fewer: countdown shows days ("8 days to go")
- If the release is 24 hours or fewer: countdown shows hours and minutes
- In all pre-release states: the fan sign-up ("Stay close") is always visible and prominent
  — the pre-save CTA is additional, not a replacement

**Priority:** P1
**Where it's built:** `able-v7.html` pre-release countdown rendering
**Status:** Partial — countdown exists; date-range-based label formatting needs audit

---

---

## Quick reference: status summary

| Story | Priority | Status |
|---|---|---|
| AS-01 Spotify import | P0 | Partial |
| AS-02 Accent colour picker | P0 | Built |
| AS-03 Live preview in onboarding | P0 | Built |
| AS-04 Share page post-setup | P0 | Built |
| AS-05 Auto campaign state from release date | P0 | Built |
| AS-06 Gig mode manual toggle | P0 | Built |
| AS-07 Gig mode auto from show door time | P1 | Not built |
| AS-08 Snap card in 30 seconds | P1 | Built |
| AS-09 Show calendar + fan.html | P1 | Partial |
| AS-10 Fan list in admin | P0 | Built |
| AS-11 Fan list CSV export | P1 | Built |
| AS-12 Email broadcast (Artist Pro) | P1 | Partial |
| AS-13 Section reorder | P1 | Built |
| AS-14 Section hide/show | P1 | Built |
| AS-15 Accent colour in admin | P1 | Built |
| AS-16 Release credits + ABLE handle links | P1 | Partial |
| AS-17 CTA analytics | P1 | Built |
| AS-18 Empty state (no releases) | P0 | Partial |
| FS-01 Campaign state on fan landing | P0 | Built |
| FS-02 Email-only sign-up | P0 | Built |
| FS-03 Following feed on fan.html | P0 | Partial |
| FS-04 First-visit artist orientation | P0 | Partial |
| FS-05 Discover via credits | P1 | Partial |
| FS-06 Near me shows | P1 | Partial |
| FS-07 QR code gig scan | P1 | Partial |
| FS-08 Supporter-first content | P1 | Not built |
| FS-09 Profile → freelancer credits | P2 | Not built |
| FS-10 Confirmation email | P1 | Partial |
| FL-01 Credit confirmation flow | P2 | Not built |
| FL-02 Booking enquiry | P2 | Not built |
| FL-03 Rate card + availability | P2 | Not built |
| PA-01 Artist suspension | P1 | Partial (specced) |
| PA-02 Platform MRR dashboard | P1 | Partial (specced) |
| PA-03 GDPR deletion | P1 | Partial (specced) |
| PA-04 Tier override | P1 | Partial (specced) |
| EC-01 Empty profile looks professional | P0 | Partial |
| EC-02 Auto-revert 14 days post-release | P0 | Built |
| EC-03 Day 1 share prompt | P0 | Built |
| EC-04 Slow connection performance | P0 | Built |
| EC-05 Confirmation email not spam | P1 | Partial |
| EC-06 Stale accent colour | P1 | Built |
| EC-07 Honest discovery reasons | P1 | Partial |
| EC-08 Post-show state | P1 | Partial |
| EC-09 Cross-device following | P1 | Partial |
| EC-10 Far-future pre-release copy | P1 | Partial |

---

## Reading this document

**If you are deciding what to build next:**
Look at P0 stories with status "Partial" or "Not built." That is your build queue.
In priority order: AS-01 (Spotify import wire-up), AS-18/EC-01 (empty state audit),
FS-03/FS-04 (fan.html following feed with real arrival flow).

**If you are writing new copy:**
Check every story's acceptance criteria against `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`
and `docs/systems/copy/SPEC.md` before shipping text to production.

**If you are evaluating a feature request:**
Find which existing story it belongs to. If it does not belong to an existing story,
add a new story before building — do not build something that is not in this document.

**If you are auditing the build:**
P0 items with "Not built" status are a launch blocker. P0 "Partial" items are a soft
launch blocker — they must be resolved before the product is positioned as finished.
P1 "Not built" items are acceptable for a private beta but not for public launch.
