# ABLE — Moment Calendar: Product & Design Spec
**Created:** 2026-03-14
**Status:** ACTIVE — approved design. Ready for implementation planning.

---

## 1. Product framing

The Moment Calendar is the artist's living schedule of meaningful moments — a structured expression of what's coming, what fans can do about it, and why this profile is worth returning to.

A link-in-bio page has no concept of time. It is always the same. ABLE's Moment Calendar changes that. The profile now has a timeline. The artist has a world. Fans have reasons to come back.

Done well, this makes ABLE definitively different from every competitor at a glance.

---

## 2. Core user stories

**Fan**
- See what's happening in this artist's world in the next few months, at a glance
- Know if something requires action (buy tickets, pre-save, sign up, support)
- Know if something is just for supporters — understand what they're missing and what getting closer gives them
- Be notified when something relevant is coming up
- Have a reason to come back — the calendar changes

**Artist**
- Show the shape of upcoming months — signals activity, intention, momentum
- Give closest fans early or exclusive moments without it feeling like admin
- Make private bookings available on their terms, without a marketplace feel
- Have the calendar reflect existing data (releases, shows) without re-entry

**Business**
- Return visits: fans revisit because the calendar changes
- Supporter tier value: early access creates genuine pull toward paid tiers
- Private booking: revenue potential without a separate product
- Differentiation: no link-in-bio does this well

---

## 3. UX structure

**Default view: month grid, full section width**

The calendar is a major profile section — comparable in visual weight to Music. It is a destination, not a widget.

Grid dimensions:
- 7 columns (Mon–Sun)
- Row height: 48px mobile, 52px desktop
- Current month by default
- Month navigation: swipe left/right (mobile), chevron buttons (desktop)
- Month label: 28–32px, weight 700, `var(--font-display)`, letter-spacing -0.02em

Date cells:
- Empty: muted, 44px minimum tap target
- Today: thin accent ring, no fill
- Past dates with moments: visible, 40% opacity
- Future dates with moments: full-weight, type-colored dot(s)
- Selected: accent background circle, white number

Multiple moments on one day: stacked dots (max 3, then "+n" label)

**Detail panel**

Mobile: half-sheet slides up from bottom — 350ms spring entry, 250ms decel exit (per §7.2 panel spec)
Desktop: inline accordion below selected date row

Panel contents:
- Moment type badge + icon
- Title
- Short description (artist-written, 2–3 sentences max)
- Access layer indicator
- CTA button (contextual to access and type)
- Optional moment image

**Month navigation**

Mobile: swipe the grid left/right. No chevron buttons.
Desktop: chevron buttons flanking the month label.
Tapping month label: compact year-strip for quick jumps (current month ± 6).

---

## 4. V1 moment taxonomy

| Type | Meaning | Default CTA |
|---|---|---|
| Release | Track, EP, album drop | Pre-save / Stream now |
| Show | Live performance | Get tickets |
| On Sale | Ticket sale opens | Buy tickets |
| Merch Drop | New or limited merch | Shop now |
| Early Access | Window before public release | Unlock early access |
| Livestream | Virtual performance or session | Set reminder / Watch live |
| Private Booking | Artist has availability for private requests | Send enquiry |
| Announcement | Major news, new direction | Read more |

Auto-populated from existing data:
- `able_v3_profile.releaseDate` → Release moment
- Shows array entries → Show moments

Standalone moments added via admin calendar section.

---

## 5. Access model

Four tiers. Nothing is fully hidden — all tiers create visible presence.

**Public** — visible and fully actionable to everyone.

**Fan list** — visible to all. CTA requires email sign-up. Fan sees the moment; CTA says "Join the list to access this." One tap → fan capture form pre-sourced with moment context.

**Supporter** — visible to all. CTA requires supporter tier. Non-supporters see honest access information and a path to support. Supporters see "You're in."

**Private** — moment appears on the calendar as a tile with a lock icon and "Private moment" label. No title or description visible. Tapping: "This is a private moment. [Enquire]." Used for private booking windows and invite-only sessions.

**Key principle:** Nothing is hidden. Private and gated moments have visible presence. The fan sees the full shape of the calendar. They always understand what they're missing and what getting closer would give them.

---

## 6. Early access model

Early access is a distinct calendar moment type that maps a specific time window before a public event.

**Two dates, two moments:**

An Early Access moment sits on the window-open date. The public Release moment sits on the public drop date. Between them: the early window.

Example:
- May 8: Early Access — "Resonance (supporter preview)"
- May 10: Release — "Resonance drops everywhere"

**What fans see, by tier:**

| Tier | Message |
|---|---|
| Supporter | "Listen now — supporter exclusive. Public release: May 10." |
| Fan list | "Supporters hear this May 8. You're on the list — you get it May 9." |
| Public | "Supporters get this on May 8. The rest of the world: May 10. [Support link]." |

**Early access applies to:**
- Track/album preview
- First ticket access before public on-sale
- Merch drop with early window
- Acoustic/demo version before official release
- Livestream for supporters before public broadcast

Artist sets access level per moment in admin — one dropdown.

---

## 7. Private booking model

**What it is**

A selective invitation for fans and buyers to enquire about a private experience with the artist. Artist always in control. Nothing automatic. Nothing committed until artist decides.

**V1 supported booking types:**

- Intimate acoustic performance (private home, small venue)
- House show / small gathering
- Special occasion (birthday, cultural event)
- Virtual private set
- Private listening session / album playback
- Supporter-only small gathering

Industry/brand inquiries are a separate form type — different fields, different admin routing.

**How it appears on the calendar:**

Two modes:
1. **Availability window** — date range moment ("Private bookings open: May–July 2026")
2. **Available date** — specific date with availability

Artist can add a note visible in the panel: "Currently taking intimate acoustic enquiries in London and Manchester. Min 20 guests."

**The enquiry form**

Lightweight. Not a booking engine. An enquiry form.

Fields:
- Event type (dropdown: Intimate performance / House show / Special occasion / Virtual set / Private listening / Supporter gathering / Other)
- Preferred date or range
- City / country
- Expected attendance (optional)
- Budget indication (optional)
- Short description (200 char)
- Contact email

**What happens after submission:**

Fan sees: "Your enquiry has been sent. They'll be in touch if they're interested. If no reply within 2 weeks, dates were likely taken."

Artist sees enquiry in admin under "Booking enquiries." Options: Accept (opens reply composer, CC's management email) / Decline (archives, no contact) / Hold.

**Safety:**
- No instant booking or financial commitment in v1
- Artist never required to respond
- No personal details beyond email
- Budget field optional
- Artist can disable private booking with one toggle
- Industry enquiries are a separate form, separate admin section

**V1 implementation:** Enquiry data via Netlify form POST → admin email. Maps to `booking_enquiries` table when Supabase lands.

---

## 8. Profile integration

### Top card / hero relationship

The top card leads with what matters most right now. The calendar is the map of what's coming. They should tell the same story from different angles.

**State chip integration:** When the next calendar moment is within 7 days, the hero state chip reflects it:
- "Tickets Friday" / "New music tomorrow" / "Early access opens tonight"
- Chip links to calendar section (smooth scroll, 400ms)

**State machine connection:**
- `pre-release` state → the calendar's Release moment on the release date is highlighted (accent ring pulsing at 4s interval, reduced-motion: static)
- `live` state → Release moment shows as "Live now" with stream CTA
- `gig` state → nearest Show moment highlighted, ticket CTA elevated
- `profile` state → calendar shows future moments without elevation

The hero expresses the current moment. The calendar shows the next 60–90 days of context. They reinforce, not compete.

### Placement in the profile

Position: **immediately after hero CTAs and Quick Action pills**, before Music.

Rationale: fans scroll past the hero wanting to know what's coming. The calendar answers that question first. Music, Shows, Merch, and Support follow as deeper dives into specific moment types.

The calendar is not a widget at the bottom. It is the first major content section.

### Interaction with other sections

| Section | Calendar relationship |
|---|---|
| Listen / Music | Release moments link to track embeds. Calendar date → opens the release card inline. No duplication — the calendar previews; Music contains. |
| Shows | Show moments on the calendar mirror the Shows section. "See all shows" in the calendar navigates to Shows section. Calendar is the overview; Shows is the detail. |
| Merch | Merch Drop moments link to the Merch section. Active drop dates shown in calendar; Merch section has the full product cards. |
| Support | Supporter moments (Early Access, supporter-only sessions) create passive upgrade prompts. Non-supporter fans see the moment and a clear path. Supporter section reinforces what they get. |
| Fan capture | "Notify me" CTA on fan-gated moments routes to fan sign-up form with moment title as source context. |
| Credits | No direct relationship in v1. |
| Recommendations | No direct relationship in v1. Future: recommended artists who have upcoming moments. |

---

## 9. UX/UI direction

### Visual treatment

Section container: `var(--color-surface)`, `--r-lg` border radius, 1px `rgba(255,255,255,0.06)` border.

Section header: "What's coming" — or just the current month name in large editorial type. Month name preferred: it makes the section feel more like a real calendar object.

Day-of-week header: 10px, weight 600, letter-spacing 0.08em, uppercase, `var(--color-text-3)`.

Date cells:
- Normal: transparent, text `var(--color-text-2)`
- Today: 1px accent border ring
- Has moment: dot below date number, type-colored
- Selected: accent fill circle, white number
- Past with moment: 40% opacity

Moment type colors:
| Type | Color |
|---|---|
| Release | `var(--color-accent)` — artist-set |
| Show | Warm coral `#e8715a` |
| On Sale | Amber `#f4b942` |
| Merch Drop | Teal `#2db8b0` |
| Early Access | Gold `#d4a84b` |
| Livestream | Electric blue `#4b8fd4` |
| Private Booking | Muted `var(--color-text-3)` |
| Announcement | `rgba(255,255,255,0.7)` |

### Motion

Month transition: grid slides horizontally, 220ms decel ease. Numbers fade out (80ms) / fade in (100ms).

Date selection: selected cell scales 1.08× in 120ms spring. Detail panel slides up in 350ms spring.

Entry animation: calendar rows stagger in at 40ms intervals, `translateY(8px)` → `translateY(0)`, 250ms decel. Same bloom system as cards (§7.2 #4).

### Mobile-first

Grid fills full scroll-container width. Cells: ~44px wide × 48px tall.

Detail panel: half-sheet overlay. Handle bar at top. Swipe down or tap outside to dismiss.

Month navigation: swipe the grid itself — touch events on the grid container. No chevron buttons on mobile.

Critical: 44px minimum tap target on all date cells. This means the grid must expand to fill available width rather than shrink to fit a fixed max.

---

## 10. Implementation model

### Data structure

```json
// Stored in able_v3_profile.moments (array)
{
  "id": "m_01jxk3",
  "type": "release|show|on_sale|merch_drop|early_access|livestream|private_booking|announcement",
  "date": "2026-05-08",
  "endDate": null,
  "title": "Resonance — Supporter Preview",
  "description": "Hear the full album 48 hours before anyone else.",
  "access": "public|fan|supporter|private",
  "cta": {
    "label": "Listen early",
    "url": "https://...",
    "type": "link|inquire|notify|stream"
  },
  "imageUrl": null,
  "linkedId": null,
  "active": true
}
```

### Auto-population

- `able_v3_profile.releaseDate` → generates Release moment if none exists with `linkedId: 'release'`
- Shows array entries → generate Show moments with `linkedId: show.id`
- Auto-generated moments are read-only in calendar admin (edit via source object)

### Key rendering logic

```javascript
function buildCalendarMonth(year, month, moments) {
  // 1. Generate date grid (6 rows × 7 cols)
  // 2. Filter moments for this month
  // 3. Map moment dates to cell indices
  // 4. Render cells with dot indicators (type-colored)
  // 5. On date select: filter moments for that date → render detail panel
}
```

### Access gate logic

```javascript
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
      : { label: 'Supporters get this', type: 'supporter_prompt' }
  }
  if (moment.access === 'private') {
    return { label: 'Private moment — enquire', type: 'inquire' }
  }
}
```

### localStorage schema

```
able_v3_profile.moments        — array of moment objects
able_v3_profile.bookingEnquiries — array of received enquiries (v1, before Supabase)
```

Maps 1:1 to `moments` and `booking_enquiries` tables when Supabase lands.

### V1 scope

Build:
- Full month grid calendar section in `able-v6.html`
- 8 moment types with color + icon system
- 4 access layers (public, fan, supporter, private)
- Auto-population from releases + shows
- Manual moment entry in admin panel
- Detail panel (half-sheet mobile, accordion desktop)
- "Notify me" fan capture on fan-gated moments
- Private booking availability + enquiry form (Netlify form POST)
- Hero state chip integration (within-7-days moments)
- Month swipe navigation (mobile) + chevron (desktop)

Defer to v2:
- Per-moment analytics
- Fan email notification on new moments
- Recurring moments
- Moment OG card sharing
- Livestream embed inside detail panel
- Full calendar embed widget

---

## 11. Final recommendation

Build the Moment Calendar as a first-class section in `able-v6.html`, positioned immediately after the hero CTAs. Month grid with full visual presence. Eight moment types. Four access tiers. Private booking as inquiry-based only.

The single most important product decision: **nothing is hidden**. Private moments show as locked tiles. Supporter moments show as gated. Fan-gated moments show with a join path. The fan always sees the full shape of the calendar. They always understand what they're missing and what getting closer would give them.

The Moment Calendar is what makes ABLE's artist profiles feel like living, time-aware destinations. That is what separates it from every link-in-bio tool in existence.
