# ABLE — Artist World Map: Product & Design Spec
**Created:** 2026-03-14
**Status:** ACTIVE — v2 refinement pass complete. Supersedes draft v1.
**Formerly called:** Moment Calendar

---

## 1. Product framing

The Artist World Map is the temporal layer of the ABLE profile. It shows what's coming in the artist's world — releases, shows, early access windows, private access opportunities — arranged in time, tiered by closeness, connected to the featured moment in the top card.

It is not a gig calendar. It is not a schedule widget. It is the answer to the question a returning fan asks but no other platform answers: *what's coming in this artist's world, and how close do I need to be to get it?*

Done well, it makes the ABLE profile feel alive in a way no link-in-bio or artist page tool currently achieves. It creates a reason to return — not through push notifications or algorithms, but through genuine anticipation. Something is coming on the 21st. The fan knows. They'll be back.

**In admin, this section is called: "Your World."**
**On the profile, it is labelled only by the current month name.** No "Calendar" header. No "Upcoming events" title. Just "May." Then the world.

---

## 2. Core user stories

**Fan**
- See the shape of the artist's world across the next 60–90 days at a glance
- Understand immediately what's public, what requires closeness, what's private
- Know exactly what action is available for each moment
- See what being on the list gets me — and what supporting this artist unlocks
- Have a concrete reason to come back on a specific date

**Artist**
- Declare what's coming in my world — releases, shows, early access windows, private sessions — without it feeling like admin
- Give my closest fans specific, real privileges that are visible and meaningful
- Open a window for private, intimate experiences — on my terms, selectively, without turning my profile into a booking page
- Have my upcoming moments automatically reflect what I've already entered (releases, shows), with the option to add standalone moments

**Business (ABLE)**
- Return visits: the world map changes, so fans return
- Supporter conversion: early access and supporter moments create concrete, specific reasons to upgrade — not vague "exclusive content" promises
- Private access: premium revenue potential without marketplace architecture
- Profile differentiation: no other artist platform does this

---

## 3. UX structure

**Default view: month grid, full section width, no title other than the month name**

The world map takes up a major section of the profile — comparable in visual weight and vertical footprint to the Music section. It is a destination, not a widget.

**The grid:**
- 7 columns (Mon–Sun)
- Row height: 48px mobile, 52px desktop (floor, never compromised)
- Current month by default, auto-scrolled to nearest upcoming moment date
- Month label: 36px, `var(--font-display)` (Barlow Condensed), weight 700, letter-spacing -0.02em — editorial statement, not a section header

**Date cells:**
- Empty: `var(--color-text-3)`, 44px minimum tap target
- Today: 1px accent ring, no fill
- Past with moment: 40% opacity (history, visible, accessible)
- Future with moment: full-weight date number, type-colored 5px dot at cell bottom
- Multiple moments one day: stacked dots (max 3, then "+n")
- Selected: type-color fills cell at 15% opacity, 2px type-color bottom border, dot at full opacity

**Cell separator:** 1px `rgba(255,255,255,0.04)` between cells — subtle structure, not a visible grid

**Card treatment:** No hard card border. Inset shadow: `inset 0 0 0 1px rgba(255,255,255,0.05)`. The section has presence without feeling like a container.

**Detail panel (half-sheet on mobile, persistent sidebar on desktop):**

Mobile: rises from bottom on date select, covers ~50% of viewport. Grid still partially visible. Tap new date → panel updates without dismissing. Dismiss: swipe down or drag handle.

Desktop: panel lives beside the grid as a permanent sidebar, updates on date select.

Panel contents (in order):
1. Moment type label — 9px, weight 600, letter-spacing 0.10em, uppercase, type-colored
2. Title — 22px, weight 700, `var(--font-display)`
3. Date + time — 13px, `var(--color-text-2)`
4. Access tier badge — pill, tier-colored: "For everyone" / "Fan list" / "Supporters" / "Private"
5. Artist note (optional, italic, left quote-border in type color)
6. CTA — full-width, type-color fill (each type has its own CTA color matching its dot)

**Month navigation:**
- Mobile: swipe the grid left/right (touch delta > 40px x, < 20px y → change month)
- Desktop: chevron buttons beside month label
- Month label tap: compact year-strip (current ± 6 months) for quick jumps

---

## 4. V1 moment taxonomy

8 types. Icon + color identity per type. Used in detail panel; dots only in grid.

| Type | Meaning | Dot color | Default CTA |
|---|---|---|---|
| Release | Track, EP, album drop | `var(--color-accent)` | Pre-save / Stream now |
| Show | Live performance | Coral `#e8715a` | Get tickets |
| On Sale | Ticket sale opens | Amber `#f4b942` | Buy tickets |
| Merch Drop | New or limited merch | Teal `#2db8b0` | Shop now |
| Early Access | Window before public release | Gold `#d4a84b` | — (see §6) |
| Livestream | Virtual performance / session | Blue `#4b8fd4` | Set reminder / Watch |
| Private Access | Artist open to intimate enquiries | Muted `var(--color-text-3)` | Express interest |
| Announcement | Major news or creative direction | White `rgba(255,255,255,0.7)` | Read more |

**Auto-populated from existing profile data:**
- `able_v3_profile.releaseDate` → Release moment (read-only, edit via release object)
- Shows array entries → Show moments (read-only, edit via shows)

Standalone moments added in admin "Your World" section.

---

## 5. Access tier model

Four tiers. Nothing fully hidden. Everything has a visible presence.

**For everyone (public)**
Visible and fully actionable by anyone visiting the profile.

**Fan list**
Visible to all. CTA requires email sign-up. Fan sees the moment clearly. CTA: "Join the list to access this." One tap → fan capture with moment title as source context. High-intent sign-up.

**Supporters**
Visible to all. CTA requires supporter tier. Non-supporters see honest access framing and a path to support — no aggressive overlay, no pop-up. The tier badge says "Supporters" and the CTA changes to "Become a supporter to unlock this." Existing supporters see full CTA.

**Private**
Visible on the calendar as a tile with lock icon. No title, no description visible publicly. Tapping: artist-written message + "Express interest" CTA. Used for private access windows and invite-only sessions.

**Key principle:** Nothing is hidden. Private and gated moments have visible calendar presence. The fan always sees the full shape of the world. They always understand what getting closer means — because they can see exactly what it unlocks, on specific dates, for specific moments.

*Turn attention into connection — expressed as a timeline.*

---

## 6. Early access model

Early access is a distinct moment type — not a permission layer on other types. It sits on its own date (the window-open date), separate from the public release date.

**Example:**
- May 8: Early Access — "Resonance · Supporter preview"
- May 10: Release — "Resonance drops everywhere"

The fan sees both dates. They see the gap. They understand what being closer means without reading a single line of explanation.

**What fans see, by tier:**

| Tier | Panel message |
|---|---|
| Supporter | "Listen now — supporter exclusive. Public release: May 10." |
| Fan list | "You're on the list. You get this May 9 — one day ahead." |
| Public | "Supporters hear this on May 8. Public: May 10. Move closer [link]." |

**Framing:** Early access is not a paywall. It is a privilege tied to closeness. The artist decides who goes first — and they decide based on relationship, not on any algorithmic metric. The calendar makes this concrete: not "supporters get exclusive content" but "you will hear this specific track on this specific date, two days before anyone else."

**Applies to:**
- Track/album preview before public release
- First ticket access before public on-sale
- Merch drop with early window
- Acoustic or demo version
- Livestream for supporters before public broadcast

Artist sets access tier per moment in admin — one dropdown.

---

## 7. Private access model

**Renamed throughout.** Never "private booking." Always:
- "Private access" (in admin/system)
- Artist-authored in-panel copy (examples below)
- "Express interest" (the CTA)

**Framing:** This is an opening, not a service. The artist has decided to be open to a small number of intimate experiences. If a fan has something in mind, they can reach out. The artist reads it. The artist decides.

**Types supported:**
- Intimate acoustic set (private home or small venue)
- House session (small live gathering)
- Private listening (album playback, artist present)
- Supporter gathering (small group, artist-led)
- One-to-one (for journalists, serious collectors, superfans)
- Something else (open — artist sees what fans propose)

Industry and brand enquiries are a separate channel with different fields, different admin routing, never mixed with fan access.

**How it appears on the calendar:**

A muted dot on the relevant date or date range. Tapping: the panel shows the artist's personal note (2–3 sentences, written in their voice) and a single CTA: "Express interest."

Example artist notes:
- *"I'll be in London for a few days in June and thinking about doing something small. If you have something in mind, I'd like to hear it."*
- *"I'm open to a handful of intimate acoustic sessions this spring. Private homes, small spaces — nothing big."*
- *"A few slots for a private listening session before the album drops. If you want to be in the room, reach out."*

Not: "Request a private performance." Not: "Book Artist." Not any language that implies a service or a marketplace.

**The enquiry — a message, not a form:**

One textarea. "Tell [Artist] what you have in mind." 200–600 characters. Plus their email. No dropdowns. No budget field. No event type picker.

Quiet guidance copy below the textarea (artist-set or default): *"I read everything. I'll be in touch if it feels right."*

The right fans will write good messages. The wrong ones self-select out. Budget, attendance, and logistics are for later — not for the opening message.

**Artist admin — the inbox:**

Simple list. Each message: fan email, their message, date submitted. Three options: Reply (opens email compose, fan address pre-filled) / Pass (archives, no contact) / Later (pending). That's it.

No booking system. No calendar slots. No automatic confirmation. Artist replies when they want to, how they want to, through their own email.

**Artist controls:**
- Toggle: private access open / closed (one switch in "Your World" admin)
- Artist note: editable at any time
- Available dates or date range: set in admin, shown on calendar

**Safety:**
- No real-time chat
- No financial transaction via ABLE in v1
- No personal details beyond email
- No artist obligation to respond
- Message has a minimum character count (prevents one-word spam)
- Industry/brand enquiries are a separate form with explicit field for "this is a commercial enquiry"

**How it looks in the profile:**

Muted. Not prominent. The private access tile is there for fans who are close enough to notice it. Others scroll past. Interested fans see the artist's note — personal, warm, specific. They write a message. That's the interaction. Clean. Light. Artist-led.

---

## 8. Profile integration

### Top card relationship

The top card and the world map are one system, two levels of zoom.

**Top card:** the featured moment — what matters most right now, full visual dominance, immediate CTA.
**World map:** the full arc — the next 60–90 days, all moment types, all access tiers.

Both read from the same moments array. The top card selects the highest-priority upcoming moment within 14 days via this priority order:
1. Gig (tonight toggle) — always wins
2. Live state (release week)
3. Pre-release (upcoming release, within 30 days)
4. Next moment of any type within 7 days

The visible bridge: the **state chip** in the hero. When a moment is featured by the top card, the state chip shows: "Tickets Friday" / "New music tomorrow" / "Early access tonight." Tapping the chip scrolls to the world map and auto-selects the featured date.

In the world map, the featured moment's date cell has a top-left corner accent indicator (2px × 2px, type-colored) in addition to its normal dot. This visual echo says: *that thing in the hero — here it is on the timeline.*

**When they should not compete:**

When `gig` state is active, the top card is in full gig mode. The world map shows the Show moment highlighted but does not override the top card's urgency. The top card leads. The world map confirms.

### Placement in the profile

```
1. Top card
2. Quick Action pills
3. ── WORLD MAP (month name + grid) ──
4. Listen / Music
5. Shows [linked from world map; detailed view]
6. Merch
7. Support
8. Fan capture
9. Credits
10. Recommendations
11. Footer
```

The world map sits immediately after the hero. After the top card asks "what is happening now?", the world map answers "what does the next 60 days look like?" Before Music, before Shows — because context comes before content.

### Interaction with other sections

| Section | Relationship |
|---|---|
| Listen / Music | Release moment in world map → tapping CTA scrolls to Listen, auto-expands the release card. If `embedUrl` exists, panel shows compact embed (conduit). |
| Shows | Show moments in world map = same data as Shows section. "See all shows" at bottom of world map → jumps to Shows section. World map is the discovery surface; Shows is the detail view. |
| Merch | Merch Drop moments link to Merch section. Panel may show product image if set. |
| Support | Supporter and Early Access moments create passive, honest upgrade prompts. The world map is the strongest supporter conversion surface on the profile. |
| Fan capture | "Notify me" CTA on fan-list moments → fan capture form, pre-sourced with moment title. High-intent sign-up. |

---

## 9. UX/UI direction

**Visual identity:**

No section label other than the month name. "May" at 36px in Barlow Condensed is a statement. The artist's world has a month. This month has moments.

**Grid:**
- 1px `rgba(255,255,255,0.04)` cell separator lines — structure, not weight
- 5px dot at cell bottom center, type-colored, for moment dates
- Selected cell: 15% opacity type-color fill, 2px type-color bottom border
- No scaling animations on selection — stability over motion

**Detail panel:**
- Type label: 9px, uppercase, type-colored
- Title: 22px, `var(--font-display)`
- Artist note: italic, left border in type color
- CTA: full-width, type-color fill

**Moment type colors:**

| Type | Color |
|---|---|
| Release | `var(--color-accent)` |
| Show | `#e8715a` |
| On Sale | `#f4b942` |
| Merch Drop | `#2db8b0` |
| Early Access | `#d4a84b` |
| Livestream | `#4b8fd4` |
| Private Access | `var(--color-text-3)` |
| Announcement | `rgba(255,255,255,0.7)` |

**Motion:**
- Month transition: entire grid slides as one unit, 220ms decel, x-axis only
- Date selection: fill animates in 80ms (no scaling)
- Detail panel: 350ms spring entry, 250ms decel exit (§7.2 panel spec)
- New moment since last visit: subtle attention ring on relevant date cell, 1s duration, fades. Only ambient animation in the calendar. Says: *something changed.*

**Mobile:**
- Full section width, 16px internal card padding
- Cell width: `calc((100% - 12px) / 7)` — fills available width
- Row height: 48px fixed
- Swipe grid for month navigation
- Detail panel: half-sheet from bottom, tapping a new date updates without dismissing

---

## 10. Implementation model

### Data structure

```json
// able_v3_profile.moments — array
{
  "id": "m_01jxk3",
  "type": "release|show|on_sale|merch_drop|early_access|livestream|private_access|announcement",
  "date": "2026-05-08",
  "endDate": null,
  "title": "Resonance · Supporter Preview",
  "description": "Hear the full album 48 hours before anyone else.",
  "artistNote": null,
  "access": "public|fan|supporter|private",
  "cta": {
    "label": "Listen early",
    "url": "https://...",
    "type": "link|enquire|notify|stream"
  },
  "imageUrl": null,
  "linkedId": null,
  "active": true
}

// able_v3_profile.privateAccessEnquiries — array (v1, before Supabase)
{
  "id": "e_01jxm9",
  "email": "fan@example.com",
  "message": "I'd love to host a small session at my home in Edinburgh...",
  "momentId": "m_01jxk3",
  "submittedAt": "2026-05-01T14:23:00Z",
  "status": "pending|replied|passed"
}
```

### Auto-population

- `able_v3_profile.releaseDate` → Release moment if none exists with `linkedId: 'release'`
- Shows array entries → Show moments with `linkedId: show.id`
- Auto-generated moments are read-only in admin calendar (edit via source object)

### Key rendering

```javascript
function buildWorldMapMonth(year, month, moments) {
  // Generate 6×7 date grid
  // Filter moments for this month
  // Map moment dates to cells → render type-colored dots
  // On date select → filter moments for date → render detail panel
  // Auto-select: nearest future moment date on load
}

function getCtaForMoment(moment, userState) {
  if (moment.access === 'public') return moment.cta
  if (moment.access === 'fan') {
    return userState.isFan
      ? moment.cta
      : { label: 'Join the list to access this', type: 'fan_capture' }
  }
  if (moment.access === 'supporter') {
    return userState.isSupporter
      ? moment.cta
      : { label: 'Become a supporter to unlock this', type: 'supporter_prompt' }
  }
  if (moment.access === 'private') {
    return { label: 'Express interest', type: 'enquire' }
  }
}
```

### localStorage keys

```
able_v3_profile.moments               — moment array
able_v3_profile.privateAccessEnquiries — enquiry inbox (v1)
```

Maps 1:1 to `moments` and `private_access_enquiries` tables when Supabase lands.

### V1 build scope

Build:
- Full month grid in `able-v6.html` (no external lib — pure JS)
- 8 moment types, color + icon system
- 4 access tiers with correct CTA logic per tier
- Auto-population from releases + shows
- Manual moment entry in admin "Your World" section
- Detail panel: half-sheet (mobile), sidebar (desktop)
- "Notify me" fan capture on fan-list moments
- Private access moment type + message-based enquiry
- Hero state chip integration (≤7 day moments)
- Month navigation: swipe (mobile) + chevrons (desktop)
- "New moment" attention ring for return visits

Defer to v2:
- Per-moment analytics
- Fan email notification on new moments
- Recurring moments
- Moment OG card sharing
- Full calendar embed widget
- Livestream integration in detail panel
- Supporter-only hidden moments (v1: visible, gated)

---

## 11. Final recommendation

The Artist World Map is the single feature that most clearly separates ABLE from every other artist profile tool. It adds a temporal dimension to a profile that previously existed only in the present tense.

**Three decisions that make it a 10/10:**

1. **No section title.** Just the month name. This signals immediately that this is different — not a feature, not a widget, but a view into the artist's world.

2. **Private access is a message, not a form.** The fan writes to the artist. The artist reads it. Nothing is automated. This keeps it intimate, selective, and premium in a way no booking system can.

3. **Nothing is hidden.** Every moment has visible presence on the timeline. Private moments appear as locked tiles. Supporter moments appear with clear framing. The fan always sees the full arc. They always understand what getting closer means — because they can see it, on specific dates, in advance.

The world map is what makes ABLE's profiles feel alive, time-aware, and worth returning to. That is the core product promise.
