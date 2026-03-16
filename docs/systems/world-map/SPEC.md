# World Map — Definitive Specification
**Created: 2026-03-16 | Authority: Primary spec for all World Map implementation**
**Surfaces covered: able-v7.html · admin.html · fan.html**

---

## Section 1: What the World Map is

The World Map is not a calendar. Calendars are administrative. The World Map is the artist's **presence signal** — the visual proof that something is always in motion.

For fans, it answers one question: **"What is this artist doing next?"** Not "what did they post?" Not "what is trending?" What are they doing. Specifically. On a date. In a place or a stream or a session.

For artists, it answers a different question: **"Am I visible enough?"** An artist with an empty World Map is an artist who looks like they have stopped. An artist with three dots on their calendar three weeks apart looks like they are working. The World Map makes working visible.

For the platform, the World Map is the content engine that keeps profiles alive between releases. Without it, a profile is static. With it, a profile is a living document of an artist's forward motion.

**What makes it different from every other calendar in music:**
- It is not a venue calendar. It is not a ticketing calendar. It is an artist's entire world — shows, yes, but also the session they are in this Friday, the remix that drops next week, the early access window for supporters two days before the public.
- It respects access layers. A supporter sees things a general fan does not see. A fan sees things a first-time visitor does not see. But everyone sees that something is there — they just cannot access it yet. This creates pull.
- It is a single object across three surfaces. What the artist adds in admin is what the fan sees on the profile and in their fan dashboard. One truth, three views.

---

## Section 2: The Moment Object

Source of truth: `docs/v6/data/CANONICAL_OBJECT_MODEL.md §3`

```javascript
{
  id:          string,              // uuid — generated on create
  type:        'show' | 'release' | 'livestream' | 'early_access' |
               'rehearsal' | 'interview' | 'session' | 'remix' | 'collab',
  title:       string,              // artist-written. e.g. "The Jazz Café, London"
  date:        string,              // ISO date "YYYY-MM-DD"
  active:      boolean,             // false = soft-deleted, does not render
  access: {
    level:            'public' | 'fan' | 'supporter' | 'invite',
    earlyAccessHours: number | null,    // hours before public drop fans/supporters see it
    inviteList:       string[] | null,  // fan emails for invite-only
    teaserVisible:    boolean,          // show locked teaser to non-entitled fans?
    teaserText:       string | null     // e.g. "Close circle hears this first"
  }
}
```

### 2.1 The nine moment types

| Type | What it is | Dot colour | When to use |
|---|---|---|---|
| `show` | A live performance. In a venue, a club, a festival stage. | `#e8715a` (coral red) | Any booked gig with a date |
| `release` | A track, EP, album, or mix coming out. | `var(--color-accent)` (artist accent) | Any release with a date — pre-save before, stream after |
| `livestream` | A live stream on YouTube, Twitch, Mixcloud etc. | `#4b8fd4` (blue) | Any scheduled live stream |
| `early_access` | Content available to fans/supporters before the public. | `#d4a84b` (gold) | Early listen, early ticket presale, private drop |
| `rehearsal` | A rehearsal or pre-show prep session. Usually fan/supporter only. | `#7a6cf4` (purple) | If sharing rehearsal content — gives fans a behind-the-scenes window |
| `interview` | A podcast, press interview, radio session. | `#888888` (neutral) | When the artist wants fans to know they are talking somewhere |
| `session` | A recording session, writing session, studio day. | `#6db88e` (green) | When sharing a session — supporter early access typical |
| `remix` | A remix the artist is releasing or working on. | `#c76bd4` (pink/purple) | Remix drops, remix previews |
| `collab` | A collaboration with another artist. | `#d47a2a` (amber) | Collab announcement, collab release, joint shows |

### 2.2 Access levels explained

**`public`** — Anyone who visits the artist's profile sees this moment. No barrier. Renders with an open dot.

**`fan`** — Only fans who have signed up to the artist's email list can access this moment. Non-fans see the locked dot and a teaser if `teaserVisible: true`. The gate CTA scrolls them to the fan sign-up section.

**`supporter`** — Only Close Circle supporters can access this moment. Non-supporters see a lock-ring dot and a teaser. The gate CTA opens the Close Circle join sheet.

**`invite`** — Only fans on the `inviteList` can see full details. This is invite-only access for a specific group. Non-invited fans see nothing if `teaserVisible: false`, or a blurred teaser if `teaserVisible: true`.

### 2.3 Early access hours

`access.earlyAccessHours` defines a window where fans or supporters see the moment before the public.

Example: a release drops on 2026-04-14. `earlyAccessHours: 48`. Fans on the list see the moment (and the pre-listen link) from 2026-04-12. The public see it from 2026-04-14.

The `earlyAccessHours` window applies to access level `fan` or `supporter`. When in the early window, access behaves as if the fan is entitled even if the moment's primary access level is `public` — because the early access is the exclusive benefit.

Implementation note: at render time, check `moment.date` against `now + earlyAccessHours * 3600000`. If the fan is signed up (or supporter), show the moment. If not, and `teaserVisible: true`, show the teaser.

### 2.4 Teaser text for each access level

These are defaults. Artists can override `access.teaserText` on any individual moment.

| Access level | Default teaser text |
|---|---|
| `fan` | "Sign up to get early access to this." |
| `supporter` | "Close circle hear about this first." |
| `invite` | "This one is for a select few." |
| `fan` + earlyAccessHours | "Fans hear this [N] hours before release." |
| `supporter` + earlyAccessHours | "Close circle gets this [N] hours early." |

The teaser text is shown inside the panel when a moment is locked. It appears above the gate CTA button. It must always be in the artist's voice — first person where possible.

---

## Section 3: Artist Profile view (able-v7.html)

### 3.1 Overall character

The World Map section on the profile page is the most visually distinctive section on the page. It should feel like nothing else in the music space.

The design language: **dramatic. Full-width. The artist's world as a physical document.** When a fan sees three dots scattered across the next six weeks, they feel the artist's presence. When they see nothing, they notice.

Every other calendar component on the web is a productivity tool or a ticket-buying interface. This is neither. It is a presence surface.

### 3.2 Section layout

```
[Section header — "What's coming" or artist-customisable label]
[Month label — OVERSIZED, Barlow Condensed, 48–64px, all-caps or mixed]
[Previous ← ... → Next navigation]
[Day-of-week row — Mon Tue Wed Thu Fri Sat Sun — small, uppercase, spaced]
[Calendar grid — 7 columns, min-height 64px per cell (not 48px)]
["See all shows →" footer — visible when show-type moments exist]
```

### 3.3 Cell design

Each cell contains:
- Date number (top-left aligned, 14px, muted colour unless today)
- Dot row (below date number, up to 3 dots + "+N" overflow)

**Today's cell:** Date number in accent colour, 700 weight. Cell background: subtle accent tint.

**Past cells:** Entire cell at 35% opacity. Done. Behind them now.

**Has-moment cells:** Date number full white/dark. `cursor: pointer`. On hover (pointer device): 8% accent background.

**Featured cell (nearest moment within 7 days):** Corner accent dot. Attention pulse animation on load (once). This is the cell that should draw the eye first.

**Selected cell (after tap):** Accent `color-mix` background (15%) + 2px type-colour bottom bar.

**Empty cells:** Light grid lines only. No background.

### 3.4 Dot encoding

```
public moment:    ● filled circle, type colour
fan moment:       ◐ half-filled circle or open circle with inner fill
supporter moment: ○ ring only (border, no fill) — the lock-ring
invite moment:    — no dot (invisible if teaserVisible: false)
                     ◌ faint ring (if teaserVisible: true)
```

CSS implementation:
```css
/* Public */
.wm-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--wm-dot-color); }

/* Fan-gated */
.wm-dot--fan { background: linear-gradient(90deg, var(--wm-dot-color) 50%, transparent 50%); border: 1px solid var(--wm-dot-color); }

/* Supporter-gated (lock-ring) */
.wm-dot--locked { background: transparent; border: 1.5px solid var(--wm-dot-color); }

/* Invite-visible teaser */
.wm-dot--invite { background: transparent; border: 1px dashed rgba(255,255,255,0.25); }
```

### 3.5 Tap to expand — the panel

Tapping a cell with moments opens a bottom sheet panel. The panel is a `role="dialog"` with focus trapping.

**Panel anatomy:**
```
[Handle bar — drag-to-close affordance]
[Type label — "SHOW" / "RELEASE" etc — small, uppercase, type colour]
[Moment title — Barlow Condensed, 22px+, weight 700]
[Date string — "Sat 12 April" — DM Sans, muted]
[Access badge — "For everyone" / "Fan list" / "Supporters" / "Private"]
[Artist note — optional. If set, displayed as artist voice italic text]
[CTA button — accent fill, type-colour border. Full width.]
```

**CTA copy by type:**

| Type | Before date | On/after date |
|---|---|---|
| show | "Get tickets →" (if ticketUrl) / "Coming to [city]" (no tickets) | "On tonight" (day of) / "Tickets →" |
| release | "Pre-save →" | "Listen →" |
| livestream | "Watch live →" | "Watch →" |
| early_access | "Access now →" | "View →" |
| rehearsal | "Watch session →" | — |
| interview | "Listen →" | "Listen →" |
| session | "Watch session →" | — |
| remix | "Pre-save →" | "Listen →" |
| collab | "Pre-save →" | "Listen →" |

**Multi-moment days:** When multiple moments fall on the same day, the panel shows all of them in a scrollable list, not just the first. Each has its own type label, title, and CTA.

**Gate states:**
- `gate_fan` → "Sign up to access this" button → scrolls to fan sign-up section. Below button: teaser text.
- `gate_supporter` → "Join the close circle →" button → opens Close Circle join sheet. Below button: teaser text.
- `enquire` (private, invite-not-matched) → message textarea + email input → enquiry stored locally → "Sent. I'll be in touch if it feels right."

### 3.6 Empty state (profile page)

When the World Map has no upcoming moments, the section does **not** disappear entirely. In fan view, it shows:

```
[Calendar grid — current month, all cells empty]
[Footer: "Nothing announced yet. Check back." — small, muted]
```

This communicates that the artist has a World Map, that it will have things in it, and that returning is worth doing.

In **owner view** (edit mode), the empty section shows:

```
[Calendar grid — empty]
[Empty state CTA: "Add a show or moment to your world →" — links to admin.html]
```

This is a direct invite. It cannot be a nudge that gets dismissed.

### 3.7 Section position in the page

Default section order: after Events/Shows, before Snap Cards.

State promotions:
- `pre-release`: World Map moves to position 4 (after hero, music, fan-capture)
- `near-future` (upcoming moment within 30 days): World Map moves to position 2 (immediately after hero)

The `near-future` state is not a Campaign HQ state — it is computed, transparent to the artist, and automatic.

---

## Section 4: Admin view (admin.html)

### 4.1 "Your World" panel

Location: the admin home page, below Campaign HQ, before the activity section. This is the right position — the artist is thinking "what is my current campaign" (Campaign HQ) and then "what is coming next" (Your World).

Panel heading: "Your World" — the same phrase used on the profile. Consistent vocabulary across surfaces.

### 4.2 Moment list view

Shows all moments in chronological order, upcoming only (today and future), up to 12 visible with "See X more →" when there are more.

Each row:
```
[Colour dot] [Date — short "12 Apr"] [Title] [Access tag] [● In hero tag if featured] [Edit icon] [Delete ×]
```

- Auto-generated moments (from shows, from release date) show "from shows" / "from release" tag in amber. They are not deletable — they are managed in their own sections.
- The featured moment (nearest upcoming, non-private, within 7 days) shows "● In hero" badge in amber.
- Private access toggle at the bottom of the panel. Separate from moment access levels — this enables the enquiry window system.
- Pending enquiry count shown in amber when enquiries exist: "2 enquiries waiting →"

### 4.3 Add moment form

```
Type (required):
  [Release] [Show] [On sale] [Merch drop] [Early access]
  [Livestream] [Rehearsal] [Interview] [Session] [Remix] [Collab] [Private] [News]

Title (required):
  [text input, max 80 chars]

Date (required):
  [date input]

Who sees it:
  [Everyone] [Fans] [Supporters] [Invite list]

Early access window (visible when Fans or Supporters selected):
  [___ hours before the date] — number input, 0 = no early access

Teaser text (visible when Fans, Supporters, or Invite selected):
  [text input, max 80 chars]
  placeholder: "What do your close fans know that others don't?"

Invite list (visible when "Invite list" selected):
  [textarea, one email per line]

CTA link (optional):
  [URL input]
  [Button label — auto-populated from type, editable]

Artist note (optional):
  [textarea, max 120 chars]
  placeholder: "Something for the people who care…"
```

### 4.4 Edit moment

Tapping the edit icon on any manually-created moment opens the same form pre-filled with the moment's current values. Save overwrites. Cancel discards.

Auto-generated moments cannot be edited from the World Map panel — they are managed via Campaign HQ (release date/title) or the Events section (shows).

### 4.5 Linking moments to shows

When an artist creates a moment of type `show`, the form checks for upcoming events in `profile.events`. If a match exists (same date, or artist can select from a dropdown), the moment is linked (`linkedId: show.id`). This prevents the show appearing twice in the World Map — the moment object is preferred over the auto-generated stub.

This link is advisory, not enforced. If no matching show exists, the moment is standalone.

### 4.6 Auto-suggest: release moment

When an artist saves a release date in Campaign HQ, the system auto-generates a release moment. It does not silently insert it — the admin UI shows:

```
[amber nudge card]
"A release moment has been added to your World for [release title] on [date].
 Fans will see it in your calendar. [Edit →] [Remove →]"
```

This is the §9.1 moment 2 nudge, extended. Currently the nudge informs; it should also point to the auto-created moment.

---

## Section 5: Fan Dashboard view (fan.html)

### 5.1 "Your calendar" section

This is a Phase 2 feature (requires Supabase — real `moments` table, real `fan_follows` table). It is specced here for completeness.

The fan's Following view gains a calendar mode toggle alongside the current feed mode.

```
[Feed mode] [Calendar mode] — toggle, top of Following view
```

**Calendar mode:** A merged timeline of moments from all followed artists, sorted by date.

This is not a full monthly grid (that would be noise for fans following 20 artists). It is a **date-strip** — a horizontal or vertical list of upcoming dates, each showing which artist and what type.

```
[Today]
  No moments today. Nothing new.

[This week]
  Thu 18 Apr   ● Nova Reign — Release · Echoes
  Fri 19 Apr   ● Drift — Show · The Jazz Café, London

[Next month]
  Wed 7 May    ● Luna Waves — Livestream · YouTube
```

Each item is tappable — opens the artist's profile in live state.

### 5.2 Fan-gated and supporter-gated moments in fan.html

**Signed-up fans:** If a moment has `access.level: 'fan'` and the fan is signed up to that artist (i.e., their `fan_follows` record exists for that artist), they see the moment fully.

**Non-signed-up fans (fan.html visitor who hasn't signed up to a specific artist):** They see a blurred/locked version if `teaserVisible: true`. The teaser text is shown. The CTA is "Sign up to [artist name] →" which opens the artist's profile.

**Supporter moments:** If `access.level: 'supporter'` and the fan is not a supporter of that artist, they see the lock-ring entry with teaser text and a "Join close circle →" CTA.

### 5.3 Filter pills

```
[All] [Shows] [Releases] [Early Access]
```

"All" is default. Filter applies to the date-strip in calendar mode and the feed in feed mode.

### 5.4 Tonight highlight

If a followed artist has a moment on today's date of type `show` or `livestream`, the Today section gains a special treatment:

```
[Tonight section — amber/red accent]
[Artist name] is playing tonight.
[Venue, city] — [time if known]
[Get tickets →]
```

This renders above the standard Today strip, not inside it. It is the most prominent thing on the fan's dashboard when it is active.

### 5.5 Near me filter (Phase 2)

When the fan has opted into location (city-level, stored in `fan_location`), the Near me tab gains a moments view:

```
[Shows near [city] this month]
[Events from both followed artists and discovery artists with shows in that city]
```

This is the start of local discovery. Phase 2.

---

## Section 6: Data flow — the critical cross-surface spec

### 6.1 Data store

**V1 (localStorage):**
```
able_v3_profile.moments[]   — master moment array for this artist
able_v3_profile.events[]    — shows (auto-generate show moments at render time)
able_fan_following[]        — fan's list of followed artists
able_fan_feed[]             — fan's chronological feed (seeded at sign-up time)
```

**V2 (Supabase — Phase 2):**
```
profiles table              — includes moments column (JSONB)
moments table               — dedicated row per moment (preferred for V2+)
fan_follows table           — fan_id, artist_handle, signed_up_at
moments table               — artist_handle, type, date, access_level, etc.
```

### 6.2 Write/read contract per surface

| Surface | Writes | Reads |
|---|---|---|
| admin.html | `able_v3_profile.moments[]` (add, delete) | `able_v3_profile` |
| able-v7.html | Nothing to moments | `able_v3_profile.moments[]` + auto-generates from `.events[]` and `.releaseDate` |
| able-v7.html (sign-up) | `able_fan_following[]`, `able_fan_feed[]` | — |
| fan.html | `able_fan_following[]` (follow/unfollow) | `able_fan_following[]`, `able_fan_feed[]` |

### 6.3 How the three surfaces stay in sync

**V1 (localStorage — same device):**

The artist is on the same device as the test fan. Changes in admin.html are immediately visible on able-v7.html. The fan's `able_fan_feed` is only updated at sign-up time — it does not pick up new moments automatically. This is a known V1 limitation.

**V2 (Supabase — different devices, real users):**

```
Artist adds moment in admin.html
→ syncProfile() calls Supabase upsert with moments[]
→ able-v7.html reads from Supabase on load (or localStorage if offline)
→ fan.html reads from moments table via fan_follows join
→ Supabase Realtime channel: fan.html subscribes to moments for followed artists
→ New moment appears in fan's dashboard within seconds (Realtime)
```

The Supabase implementation requires:
1. A `moments` table (separate from `profiles.moments` JSONB — the dedicated table wins for queries)
2. RLS policy: `SELECT` where `access_level = 'public'` OR (fan_follows exists AND access_level IN ('fan', 'early_access')) OR (supporter_status = 'active' AND access_level = 'supporter')
3. Realtime enabled on `moments` table

### 6.4 Fan.html feed seeding (V1 workaround)

Until V2 Supabase lands, `writeFanFollow()` in able-v7.html seeds the fan's feed at sign-up time:
- Adds artist to `able_fan_following[]`
- Seeds release item (if `profile.releaseDate` and `profile.releaseName` set)
- Seeds event items from `profile.events[]`

This is the only moment propagation path in V1. It is a snapshot, not a live feed.

---

## Section 7: Copy for every moment type

### 7.1 Show

**Calendar dot label:** "[Venue], [City]" or "[Artist name] — Live" if no venue

**Panel CTA:**
- Before date, ticketUrl set: "Get tickets →"
- Before date, no ticketUrl: "On the [date] in [city]" (no button, informational)
- Day of show: "I'm on tonight →" with ticketUrl, or "On tonight at [Venue]" without
- After date: no CTA — past show

**Fan teaser (fan-gated show):** "Fans get priority access 24 hours before tickets go on general sale."

**Supporter teaser:** "Close circle hears about this before it's announced publicly."

---

### 7.2 Release

**Calendar dot label:** "[Title] — [type: EP/Single/Album]"

**Panel CTA:**
- Before release date: "Pre-save →"
- Release date: "Out now — listen →"
- After release date: "Stream →"
- If `earlyAccessHours` set and fan is in early window: "You're hearing this early. Listen →"

**Fan teaser (fan-gated release):** "Fans hear this [N] hours before it's on streaming platforms."

**Supporter teaser:** "Close circle hears this first."

---

### 7.3 Livestream

**Calendar dot label:** "Livestream — [platform if known]"

**Panel CTA:**
- Before: "Set a reminder →" (links to stream URL)
- During (within 30 minutes of start): "Live now →"
- After: "Watch back →" (if replay URL set)

**Fan teaser:** "Fans get the link before it goes public."

---

### 7.4 Early access

**Calendar dot label:** "Early access — [title]"

**Panel CTA:**
- Fan/supporter entitled: "Access now →"
- Not entitled: "Join the list to access this"

**Fan teaser:** "This goes public on [date]. Fans hear it first."

**Supporter teaser:** "Supporters get this [N] days before fans."

---

### 7.5 Rehearsal

**Calendar dot label:** "In the room — [location if set]"

**Panel CTA:**
- Typically fan/supporter only
- "Watch the session →" (if stream URL) or "Limited to close circle" (no URL)

**Fan teaser:** "A window into the room before the show."

---

### 7.6 Interview

**Calendar dot label:** "[Publication/Show name]" or "Interview — [channel]"

**Panel CTA:** "Listen →" or "Watch →"

**No gating typical.** Interviews are usually public — they are the artist talking to the world.

---

### 7.7 Session

**Calendar dot label:** "In the studio — [title if set]"

**Panel CTA:**
- "Watch the session →" (if URL) or "Behind closed doors." (informational, no button)

**Supporter teaser:** "Close circle gets a window into this session before the public."

---

### 7.8 Remix

**Calendar dot label:** "[Original title] — Remix" or "[Title] (Remix)"

**Panel CTA:**
- Before: "Pre-save →"
- After: "Listen →"

**Fan teaser:** "Fans hear this remix [N] hours before streaming platforms."

---

### 7.9 Collab

**Calendar dot label:** "[Title] with [collaborator name]"

**Panel CTA:**
- Before: "Pre-save →"
- After: "Listen →"

**Fan teaser:** "Fans hear this first."

---

## Section 8: ARIA and accessibility

The calendar is a `role="grid"`. Each cell is a `role="gridcell"`. The panel is `role="dialog" aria-modal="true"`.

When the panel opens, focus moves to it. Focus is trapped inside the panel until closed. When the panel closes, focus returns to the cell that was tapped.

Each cell has an `aria-label` that reads: "[date number] [month], [comma-separated list of moment type labels]". Empty cells have `aria-hidden="true"`.

The month label has `aria-live="polite" aria-atomic="true"` — correct as implemented.

Navigation buttons have `aria-label="Previous month"` and `aria-label="Next month"`.

All dot colours pass WCAG 2.2 AA against the card background at the specified sizes. White/light dots on dark backgrounds are exempt from contrast for decorative elements, but the type labels in the panel must pass.
