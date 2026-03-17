# ABLE — Artist World Map: Cross-Product Systems Spec
**Created:** 2026-03-14
**Status:** ACTIVE — companion to MOMENT_CALENDAR_SPEC.md and MOMENT_CALENDAR_INTEGRATION.md

---

## Why this is a cross-product system

The Artist World Map introduces a temporal dimension across the whole product. Every surface must be designed together:

- **Profile** must render it with appropriate visual weight and hierarchy
- **Admin** must make it manageable without friction — the feature is only valuable if artists maintain it
- **Onboarding** must plant the idea without overwhelming a new artist
- **Data model** must support the full access tier system, auto-population, and private access enquiries — in a schema that maps cleanly to Supabase
- **Landing page** must communicate that ABLE profiles are alive over time, not static snapshots
- **Top card / state logic** must be extended so that any upcoming world map moment can influence the hero
- **Fan progression** must express the full arc — public → connected → supporter → private — as a coherent system

If any one of these is wrong, the whole feature is weaker.

---

## A. Public profile

**What should happen:**
- Second major section, after Quick Action pills
- Month grid, month name as the only header (36px display type)
- Auto-selects nearest upcoming moment date on load
- 8 moment types, 4 access tiers, type-colored dots, half-sheet detail panel
- State chip in hero = active bridge to world map (within-7-day moments)
- Private access moments: muted locked tiles with artist note + "Express interest"
- "Notify me" fan capture on fan-list moments

**What should not happen:**
- No "Calendar" or "Events" heading
- No "Nothing coming up" copy on empty months — show clean grid, today indicated
- Does not replace Shows or Listen sections — it is the overview; they are the detail views
- No "Add to Google Calendar" in v1

---

## B. Admin / artist editing

**Section name:** "Your World" (in admin panel)

**Layout:** Chronological list of moments (not a grid — grid is the fan's view), with "+ Add moment" button.

```
Your World
──────────────────────────
[This month: 3 moments]   [+  Add moment]

May 8   ● Early Access    Resonance · Supporter preview   [Edit]  [•••]
May 10  ● Release         Resonance drops everywhere      [Edit]  [•••]
May 22  ○ Private         [Private access window open]    [Edit]  [•••]

[Next month →]
──────────────────────────
Private access:  [ON]  ← Toggle
[2 enquiries waiting]  →
```

**Moment creation — 5-step bottom sheet:**

1. **Type** — 8 icons in a 2×4 grid (Release / Show / On Sale / Merch Drop / Early Access / Livestream / Private Access / Announcement)
2. **Date** — date picker. Private Access: option for "Available window" (date range: from → to)
3. **What is it** — Title (required, max 60 chars) + Artist note (optional, 200 chars). For Private Access: artist note is the primary field, not optional.
4. **Who can see it** — four tiles with honest descriptions (For everyone / Fan list / Supporters / Private), selected tier shows a one-line fan-facing example
5. **CTA** — type (Link / Notify me / Stream / Express interest) + URL if needed. Early Access: additional "Link to release" option.

Review summary → Save. Under 60 seconds for a simple moment.

**Editing:** tapping a moment in the list opens the same 5-step sheet, pre-filled.

**"See as fan" preview toggle:** at top of "Your World" section. Renders the full month-grid view as a fan would see it (artist always sees supporter tier). Lets the artist verify the experience before it goes live.

**Private access inbox:**

Simple list. Each entry: fan email, message, timestamp. Three actions: Reply (opens email client, fan address pre-filled, starter subject line) / Pass (archives) / Later (pending). No threading. No ABLE-hosted messaging.

**Hero indicator:** The moment currently reflected in the hero state chip shows "● Featured in top card" in the admin list. Not editable in v1 — priority logic is automatic.

**What should not happen:**
- Not a project management tool
- No bulk import in v1
- No drag-to-reorder (always chronological)
- No publish/unpublish toggle — removal via "•••" → "Remove"

---

## C. Onboarding / setup

**The call:** Introduce the concept lightly. Plant a seed during onboarding; let the first post-publish admin session be where the artist starts using it properly.

**What happens in onboarding (start.html):**

After the release info step, one optional step:

> **"What's coming up?"**
> Date picker + short text field (60 chars, placeholder: "e.g. Album release / Show at Roundhouse / Tickets go on sale")
> Clear "Skip this →" link

If filled in:
- A moment object is auto-created (type inferred from text where possible, defaults to Announcement)
- The release date already entered also auto-creates a Release moment
- On first profile view, the world map shows 1–2 moments already populated

If skipped:
- World map section exists but shows an empty current month
- First time in admin: gentle prompt in "Your World" — "Add your first upcoming moment so fans know what's coming"

**What should not happen:**
- No full moment creation flow in onboarding
- No explanation of access tiers during onboarding
- No prompt about private access during onboarding — that is for established artists

---

## D. Data model / backend logic

### Schema (Supabase-ready)

```sql
-- moments
CREATE TABLE moments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type                TEXT NOT NULL CHECK (type IN (
                        'release','show','on_sale','merch_drop',
                        'early_access','livestream','private_access','announcement'
                      )),
  date                DATE NOT NULL,
  end_date            DATE,
  title               TEXT NOT NULL,
  artist_note         TEXT,
  access              TEXT NOT NULL DEFAULT 'public' CHECK (access IN (
                        'public','fan','supporter','private'
                      )),
  cta_label           TEXT,
  cta_url             TEXT,
  cta_type            TEXT CHECK (cta_type IN ('link','enquire','notify','stream')),
  image_url           TEXT,
  linked_release_id   UUID REFERENCES releases(id),
  linked_show_id      UUID REFERENCES shows(id),
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- private_access_enquiries
CREATE TABLE private_access_enquiries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  moment_id    UUID REFERENCES moments(id),
  fan_email    TEXT NOT NULL,
  message      TEXT NOT NULL CHECK (char_length(message) BETWEEN 200 AND 600),
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
                 'pending','replied','passed'
               )),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### localStorage equivalent (v1)

```javascript
// In able_v3_profile:
{
  moments: [MomentObject],
  privateAccessEnquiries: [EnquiryObject]
}
```

Field parity is exact — migration is a flush-to-API call. No key renames.

### Auto-population (client-side)

```javascript
function buildMomentsFromProfile(profile) {
  const moments = [...(profile.moments || [])]

  if (profile.releaseDate && !moments.find(m => m.linkedId === 'release')) {
    moments.push({
      id: 'auto_release', type: 'release',
      date: profile.releaseDate,
      title: profile.releaseName || 'New release',
      access: 'public',
      cta: { label: 'Pre-save', url: profile.presaveUrl, type: 'link' },
      linkedId: 'release', isAuto: true
    })
  }

  ;(profile.shows || []).forEach(show => {
    if (!moments.find(m => m.linkedId === show.id)) {
      moments.push({
        id: `auto_show_${show.id}`, type: 'show',
        date: show.date, title: show.venue,
        access: 'public',
        cta: { label: 'Get tickets', url: show.ticketUrl, type: 'link' },
        linkedId: show.id, isAuto: true
      })
    }
  })

  return moments.sort((a, b) => a.date.localeCompare(b.date))
}
```

### Access gate function

```javascript
function resolveAccess(moment, fan) {
  // fan: { isFanList: bool, isSupporter: bool }
  switch (moment.access) {
    case 'public':    return 'full'
    case 'fan':       return fan.isFanList ? 'full' : 'gate_fan'
    case 'supporter': return fan.isSupporter ? 'full' : 'gate_supporter'
    case 'private':   return 'enquire'
  }
}
```

### V1 vs deferred

V1: `moments[]` in localStorage, auto-population from releases/shows, 4 access tiers, Netlify form for private enquiries.
Phase 2: Supabase tables, fan notifications, per-moment analytics, recurring moments.

---

## E. Landing page / demo

**What should happen:**

Add one new state to the demo phone cycle in `landing.html`:

- State: "world map" — shows the month grid section (not the hero)
- Appearance: month name in display type, 3–4 colored dots across different dates (accent = release, coral = show, gold = early access, muted + lock icon = private), no detail panel open
- Duration: 3–4 seconds before cycling on
- Proof line: *"A living artist world. Not a static page."* (or: *"The profile shows what's coming."*)
- Position in cycle: after gig state, before light theme state

The world map state demonstrates: this profile is alive in time. Multiple moment types. One private tile with a lock. The fan can infer the whole system from the visual in under 5 seconds.

**What should not happen:**
- No detail panel in the demo phone world map state
- No explanation of access tiers on the landing page
- The world map is not the hero of the landing page — it is one of several proof points
- No "Add to Google Calendar" or "subscribe" language in landing copy

---

## F. Top card / state logic

The profile has a single temporal intelligence, expressed at two levels:
- **Top card** — what matters most right now (zoom in)
- **World map** — the full arc of the next 60–90 days (zoom out)

Both read from the same data sources: `stateOverride`, `releaseDate`, `moments[]`.

### Five-state priority model

| State | Source | Top card | World map |
|---|---|---|---|
| **Gig** | Manual toggle | Full gig mode, ticket CTA dominant | Tonight's Show moment auto-selected |
| **Live** | Auto (release week) | Stream now, artwork prominent | Release moment: "Live now" badge |
| **Pre-release** | Auto (< 30 days) | Countdown, pre-save CTA | Release moment: pulsing accent ring |
| **Near-future** *(new)* | World map moment ≤ 7 days | State chip only ("Tickets Friday") | Featured date: corner accent marker |
| **Profile** | Default | Latest release | All future moments equal weight |

State 4 is the key addition: any upcoming world map moment within 7 days can surface a state chip without triggering a full state change. The artist does not manage this — it runs automatically.

**Private access moments do not surface in the hero** — they are not urgency-driven in the same way.

### State chip copy format

`"[Type action] [timing]"`:
- "New music tomorrow"
- "Tickets Friday"
- "Merch drop Thursday"
- "Early access tonight"
- "Live now" (live state)
- "Playing tonight" (gig state)

Maximum one active message. Priority order matches the state model above.

### Featured moment selection

```javascript
function selectFeaturedMoment(moments, profile) {
  const today = new Date().toISOString().slice(0,10)
  const in7  = new Date(Date.now() + 7*86400000).toISOString().slice(0,10)
  const in30 = new Date(Date.now() + 30*86400000).toISOString().slice(0,10)
  const upcoming = moments.filter(m => m.isActive && m.date >= today && m.access !== 'private')

  if (profile.stateOverride === 'gig') return null  // gig always wins
  const liveRelease = moments.find(m => m.type === 'release' && m.date <= today && m.linkedId === 'release')
  if (liveRelease) return liveRelease
  const preRelease  = upcoming.find(m => m.type === 'release' && m.date <= in30)
  if (preRelease) return preRelease
  return upcoming.find(m => m.date <= in7) || null
}
```

---

## G. Fan progression

The world map is the most effective expression of "turn attention into connection" in the product — because it makes the progression visible as a timeline, not as a tier table.

**What each tier looks like as a fan experience:**

**New visitor (public):** Sees the world map. Multiple colored dots. Some with "For everyone" access. One with "Supporters" badge. One private tile with a lock. Understands the system in 30 seconds without reading any explanation.

**Fan list member:** Fan-list moments now show unlocked CTAs. "Join the list to access this" becomes the direct CTA. The world map rewards their sign-up with specific, date-anchored value.

**Supporter:** Supporter moments show full CTAs. The early access window is a real, actionable date — not a vague promise. "You will hear this on May 8th." The world map is the strongest argument for the supporter tier on the entire profile.

**Private access enquirer:** They've sent a message. They're in the artist's inbox. The world map created the opening. It doesn't track the outcome — that relationship moves to email.

**The principle:** No "upgrade" banners, no paywall overlays, no "get more with Pro" copy. The world map expresses the whole progression through honest visibility. The fan understands what getting closer means by looking at the calendar — not by reading sales copy.

---

## Summary: strongest v1 model per system

| Surface | V1 scope |
|---|---|
| Public profile | Full month grid, 8 types, 4 tiers, half-sheet panel, auto-population, state chip bridge |
| Admin | "Your World" section, 5-step creation sheet, list view, "See as fan" toggle, private access inbox |
| Onboarding | One optional "What's coming up?" step, auto-creates first moment |
| Data model | `moments[]` in localStorage → `moments` table in Supabase (1:1), `privateAccessEnquiries` via Netlify form |
| Landing page | One demo phone state, month grid with dots, proof line "A living artist world. Not a static page." |
| Top card | State 4: any non-private world map moment ≤ 7 days → state chip |
| Fan progression | Visible access tiers on the timeline — no tier table, no sales copy |

---

## Most important thing to get right in v1

The admin experience. The world map is only valuable if artists maintain it. "Your World" must feel like declaring intent, not filling in a form. The 5-step creation flow must take under 60 seconds for a simple moment. Artists who use this regularly are artists whose profiles feel alive. Artists whose profiles feel alive are artists whose fans return.

That is the product flywheel. Protect it by making the admin frictionless.
