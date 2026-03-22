# ABLE — Role Architecture Spec
**Created: 2026-03-22 | Status: authority — do not override without explicit revision**

> Short authority spec for the current build. Preserves future direction without cluttering current scope.

---

## Core roles

| Role | Primary job |
|---|---|
| **Artist** | Own their page. Capture fans. Control their release narrative. |
| **Freelancer / Collaborator** | Present professional credits, portfolio, and rate. Be discoverable through artists they've worked with. |
| **Professional / Industry** | Future. Label A&R, playlist curators, sync supervisors. Not in current build. |
| **Fan** | Follow artists they care about. Stay close to releases, shows, and moments that matter. |

---

## How the roles relate

```
Artist ──publishes──▶ Profile (fan-facing)
   │                      ▲
   │                      └── Fan visits, signs up, follows
   │
   └──credits──▶ Freelancer profile (discoverable via artist release cards)
                      │
                      └── Industry / Professional (future — not built)
```

- Artists are the anchor. Every other role exists in relation to them.
- Fans arrive through artists. They do not have a standalone discovery surface yet.
- Freelancers are discovered through artists, not directly. The acquisition mechanic is confirmed credits on artist release cards.
- Industry roles consume what artists and freelancers produce. Nothing is built for them in V1.

---

## What belongs on each surface

### Artist profile (`able-v8.html`) — fan-facing
- Artist identity: name, bio, artwork, accent
- Campaign CTA zone (pre-save, stream, tickets)
- Music releases, clips, snap cards
- Shows and events
- Fan sign-up capture
- Platform links
- "Made with ABLE" attribution only — ABLE brand is a whisper here

### Artist dashboard (`admin.html`) — work surface
- Campaign HQ: page state control
- Fan list and stats
- Snap card editor
- Connections (credits to freelancers — future)
- Analytics

### Freelancer profile (`freelancer.html`) — professional-facing
- Credits (peer-confirmed)
- Portfolio: audio, video
- Rate card with auto-expiry
- Booking enquiry (4 fields)
- Auto-generated "Artists on ABLE" strip (acquisition surface)

### Fan dashboard (`fan.html`) — personal
- Artists they follow
- New drops and upcoming shows
- Direct support actions
- No algorithmic feed — chronological, artist-controlled

---

## What must not be mixed

| Do not mix | Why |
|---|---|
| Artist campaign tools and freelancer rate card | Different jobs, different register. Artist is about their art. Freelancer is about their work. |
| Fan capture and freelancer booking | Fan sign-up is personal. Booking enquiry is professional. One form, one purpose. |
| Artist fan feed and general discovery | Fans follow specific artists. ABLE is not a browse-and-discover platform (yet). |
| Admin (Tool World) and profile (Artist World) | These are visually distinct worlds by doctrine. Do not borrow colours, type, or surface patterns between them. |
| Industry-tier features and V1 build | Nothing for industry roles ships until artist/fan fundamentals are solid. |

---

## MVP rule

**Artist-first, not artist-only.**

- The current build (V1) delivers: artist profile, fan capture, campaign states, admin dashboard, onboarding wizard.
- Freelancer architecture is defined and preserved in the data model and admin layer pattern — it must not require a rebuild to activate.
- Fan dashboard (`fan.html`) is scoped but not complete — it follows artist/fan fundamentals.
- Professional / industry roles are acknowledged but not built.
- Every V1 decision must leave the freelancer and fan layers clean to activate later. Do not close doors.
