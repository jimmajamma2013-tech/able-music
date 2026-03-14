# ABLE — Live Moments: Definitive Spec
**Created:** 2026-03-14
**Status:** ACTIVE

---

## 1. Product Framing

**Live Moments** is the name for this feature. Not "streaming." Not "livestreams." A Live Moment is an artist's scheduled or spontaneous live presence — a listening session, premiere, Q&A, supporter-only performance, or virtual show. The word "streaming" is too technical and implies ABLE hosts video. It does not.

**The profile becomes the stage.**

When an artist goes live, their ABLE profile reflects it instantly: the top card shifts into live state, the World Map calendar highlights the moment, and fans who RSVP'd receive a reminder. The artist streams on YouTube Live, Twitch, Instagram, Vimeo, or anywhere. ABLE owns the moment, the campaign layer, and the context around it.

**What ABLE is in this feature:**
- The campaign object (title, date, type, access rules, artwork)
- The pre-stream countdown and RSVP surface
- The fan-facing moment page (within the artist profile)
- The share surface and deep link
- The replay container and access gate
- The anchor in the Artist World Map calendar

**What ABLE is not:**
- A streaming host
- A video CDN
- A chat platform
- Competing with YouTube, Twitch, or Vimeo

---

## 2. Core Concept

Every Live Moment has an ABLE URL. The artist shares that URL — not the raw platform URL.

```
able.fm/[handle]#lm_[id]
```

Fans arrive at the artist's ABLE profile. The World Map calendar auto-selects that date. The moment panel opens. Depending on lifecycle state (scheduled / live / ended), the fan sees a countdown and RSVP, a join CTA with embedded stream, or a replay.

ABLE owns the landing context at every point. The actual video bytes come from YouTube or Vimeo. The experience, the gate, the relationship — those are ABLE's.

---

## 3. Platform Model

### Embed support

| Platform | Embed supported | Method |
|---|---|---|
| YouTube Live | Yes | `<iframe>` — `youtube.com/embed/live_stream?channel=...` |
| Vimeo | Yes | `<iframe>` — standard Vimeo embed URL |
| Twitch | Yes (with conditions) | `<iframe>` — requires correct `parent` parameter at runtime |
| Instagram Live | No | Link-out only |
| TikTok Live | No | Link-out only |
| Any URL | No | Link-out only |

**Embed logic:** ABLE auto-detects platform from `streamUrl`. For YouTube and Vimeo, it generates the `embedUrl` automatically. For Twitch, it requires the artist to confirm the channel slug and sets `parent=able.fm` at render time. For all others, the "Join" CTA opens the raw URL in a new tab.

**Embed rendering:** When a stream is `live` and embed-compatible, the top card expands into an embed panel. The iframe is constrained to 16:9, capped at 100% width of the top card, with a scroll-stop container so it does not scroll out of view mid-stream.

---

## 4. Live Moment Taxonomy

Six types. These appear in the moment creation flow in admin as a type picker at Step 3.

| Type key | Display name | Description |
|---|---|---|
| `listening_session` | Listening session | Artist plays music in real-time: new release, back catalogue, reaction, process |
| `premiere` | Premiere | First public stream of a music video, visual, or full album playback |
| `qa` | Q&A | Artist talks, fan questions, low-production conversation |
| `supporter_performance` | Supporter performance | Full or acoustic performance; supporter-only access typical |
| `studio_session` | Studio session | Behind-the-scenes making-of, process stream |
| `virtual_show` | Virtual show | Full live set; may be ticketed in future |

The type is displayed as a badge in the World Map panel, the top card, and on share cards. It sets the default expectation for fans before they click anything.

---

## 5. The Live Moment Object

Each Live Moment is an entry in `profile.moments[]` with `type: 'livestream'`.

```json
{
  "id": "lm_01xyz",
  "type": "livestream",
  "livestreamType": "listening_session",
  "date": "2026-05-08",
  "time": "20:00",
  "timezone": "Europe/London",
  "title": "Resonance — listening session",
  "artistNote": "Playing the whole EP in order, then sticking around to talk about it.",
  "coverImageUrl": null,
  "platform": "youtube",
  "streamUrl": "https://youtube.com/live/abc123",
  "embedUrl": "https://www.youtube.com/embed/live_stream?channel=UCxyz",
  "access": "public",
  "rsvpEnabled": true,
  "replayUrl": null,
  "replayAccess": "public",
  "state": "scheduled",
  "active": true
}
```

### Field reference

| Field | Type | Notes |
|---|---|---|
| `id` | string | `lm_` prefix + short UUID |
| `type` | string | Always `"livestream"` for this spec |
| `livestreamType` | enum | One of six types above |
| `date` | string | ISO date `YYYY-MM-DD` |
| `time` | string | `HH:MM` 24hr |
| `timezone` | string | IANA timezone string |
| `title` | string | Artist-written; shown on card and share |
| `artistNote` | string | Optional. Shown in moment panel below title. |
| `coverImageUrl` | string\|null | Shown as artwork in top card and share card |
| `platform` | enum | `youtube`, `twitch`, `vimeo`, `url` |
| `streamUrl` | string | The actual stream URL for link-out |
| `embedUrl` | string\|null | Constructed or artist-provided embed URL |
| `access` | enum | `public`, `fan`, `supporter`, `private` |
| `rsvpEnabled` | boolean | Shows RSVP capture in scheduled state |
| `replayUrl` | string\|null | Set by artist after stream ends |
| `replayAccess` | enum | Same options as `access` — can be more open |
| `state` | enum | `scheduled`, `live`, `ended` — auto-computed |
| `active` | boolean | Soft delete |

`state` is computed at render time from `date + time` relative to now. It is never persisted as a fixed value unless a manual override is applied.

---

## 6. Lifecycle States

Three states, computed automatically.

### State: Scheduled

**Condition:** Current time is before `date + time`.

**Fan experience:**
- Countdown: "3 days 4 hours" (dynamic, updates live)
- Type badge + title + artist note
- Access badge
- RSVP capture (if `rsvpEnabled: true`): fan enters email → "I'm in"
- Reminder: "Remind me" → requests browser notification permission → on grant, service worker fires at T-30min and T=0. On deny: "Add to calendar" (.ics fallback)

**Copy examples:**
- "Listening session — Thursday 8pm"
- "Set a reminder"
- "I'm in" (RSVP button)

### State: Live

**Condition:** Current time is within 2 hours after `date + time`, OR manual "Go live" override is set in admin.

**Fan experience:**
- "LIVE NOW" badge — green dot + text, pulsing
- Cover image or artist artwork (full bleed behind top card)
- Stream title
- Primary CTA: "Join" → embed panel (YouTube/Vimeo/Twitch) or link-out (Instagram/other)
- If embed: iframe renders in expanded top card panel

**Copy examples:**
- "Live now — Resonance listening session"
- "Join"

### State: Ended

**Condition:** Current time is more than 2 hours after `date + time`, and no manual live override.

**Fan experience (with replay):**
- "Missed it — watch the replay"
- Replay CTA: "Watch replay" → opens `replayUrl` (embed or link)
- Replay access gate applies (can be different tier from live access)

**Fan experience (no replay):**
- "Missed it."
- "Catch the next one" → scrolls to nearest upcoming Live Moment in calendar

**Copy examples:**
- "Missed it — watch the replay"
- "Watch replay"
- "Catch the next one"

### Manual override

From admin, the artist can:
- Tap "Go live" on a moment → sets `state: 'live'` override regardless of time (for spontaneous streams)
- Tap "End stream" → removes override, returns to time-based logic
- Tap "Extend" → extends the 2-hour live window by 1 hour

---

## 7. Access Model

Inherits from the Artist World Map access system. Four tiers:

| Tier | Key | Fan sees in scheduled state | Fan sees in live state | Fan sees in ended state |
|---|---|---|---|---|
| Public | `public` | Full preview + RSVP | Join link + embed | Replay or "missed it" |
| Fan list | `fan` | Full preview + RSVP | Join link if on fan list | Replay if on fan list |
| Supporters | `supporter` | "This is for supporters" gate | "Supporters only" gate with join CTA | Replay if supporter |
| Private | `private` | Moment visible; "Invite only" | Link requires private invite | Replay locked |

**The calendar always shows the moment exists.** What changes is what the fan sees when they tap it. A supporter-only performance appears as a blue dot in the calendar for every fan. Non-supporters tap it and see: "This one's for supporters. [Find out more]" — not a blank wall, not a confusing error.

`replayAccess` is a separate field. A performance can be supporter-only live but `replayAccess: 'public'` 48 hours after — the artist controls this independently.

---

## 8. Top Card Integration

### Scheduled (within 7 days)

The World Map campaign chip activates with a State 4 teaser:

```
"Listening session — Thursday 8pm"    →    "Set a reminder"
```

The chip appears below the hero CTAs. It does not displace the primary profile state — it is additive.

### Live

State 2 (live) takes full priority. The top card shows:

- Cover image (or artist artwork) — full bleed
- "LIVE NOW" — green dot + text, absolute-positioned badge top-right
- Stream title — large display font
- Primary CTA: "Join" (accent fill button)
- If embed-compatible: "Join" expands the top card into an embed panel rather than link-out

The top card in live state suppresses the standard hero CTA zone. The only action that matters is "Join."

### Ended

If `replayUrl` is set:
```
"Missed it — watch the replay"    →    "Watch replay"
```
Replay chip replaces the live chip. Standard hero CTAs return.

If no replay:
```
"Catch the next one →"
```
Links to next upcoming moment in calendar.

---

## 9. World Map Calendar Integration

Live Moments appear in the Artist World Map grid as `type: 'livestream'` entries.

**Calendar cell:**
- Dot colour: `#4b8fd4` (livestream blue)
- Date is marked; dot appears at the correct calendar position

**Auto-selection rule:** On profile load, if there is a Live Moment within 7 days (scheduled or live), the calendar auto-selects that date and the moment panel opens.

**Moment panel (half-sheet) for a Live Moment:**

```
[TYPE BADGE]  Listening session
[TITLE]       Resonance — listening session

[DATE + TIME] Thursday 8 May · 8:00pm BST

[ARTIST NOTE] Playing the whole EP in order,
              then sticking around to talk about it.

[ACCESS]      Public — anyone can join

[LIFECYCLE CTA]
  → Scheduled: "Set a reminder"  +  "I'm in" (RSVP)
  → Live:      "Join now"
  → Ended+replay: "Watch replay"
  → Ended+no replay: "Catch the next one →"
```

Type badge uses the livestream blue `#4b8fd4`. The artist note renders in a slightly lighter weight below the date row. The access badge is small and non-intrusive — it informs, it doesn't gate at this layer.

---

## 10. RSVP and Reminders

### RSVP

- Fan enters email and taps "I'm in"
- Captured in `able_fans` with `source: "rsvp_lm_01xyz"` (moment ID as source tag)
- Deduplication: if email already exists in `able_fans`, source tag is appended to existing record — no duplicate entry
- Artist sees RSVP count in admin: count of `able_fans` entries whose source matches `rsvp_${momentId}`
- In v1: no email sending. RSVPs are captured; notifications are browser-based only.

### Reminders

**Browser notification path:**
1. Fan taps "Remind me"
2. `Notification.requestPermission()` is called
3. On grant: service worker is registered (if not already). Moment data is stored in service worker scope. Notification fires at `T-30min` and `T=0`.
4. Notification copy at T-30: "[Artist name] goes live in 30 minutes — [Moment title]"
5. Notification copy at T=0: "[Artist name] is live now — Join: [ABLE URL]"
6. Tapping notification → opens `able.fm/[handle]#lm_[id]`

**Fallback (permission denied or not available):**
- "Add to calendar" — generates a `.ics` file client-side
- Also provides: Google Calendar link (URL-encoded) and Apple Calendar link (same `.ics`)
- The .ics entry includes: title, date/time, description (artist note + ABLE URL), URL field pointing to the ABLE moment URL

No email reminders in v1. That is deferred to when ABLE has email broadcast infrastructure.

---

## 11. Share System

### Share link

```
able.fm/[handle]#lm_[id]
```

This is the canonical share URL. When opened:
1. The artist profile loads
2. The World Map calendar auto-selects the moment's date
3. The moment panel opens automatically
4. If state is `live`: top card is already in live state

The artist shares this link — not the YouTube URL, not the Twitch channel. ABLE owns the landing context, the gate, and the relationship.

### Share card

Portrait format, generated client-side using Canvas API (same pipeline as Showcase share cards):

```
┌─────────────────────────┐
│  [Cover image / artwork]│
│                         │
│  LISTENING SESSION      │  ← type, small caps
│                         │
│  Resonance              │  ← title, display font
│                         │
│  Thursday 8 May · 8pm   │  ← date/time
│                         │
│  able.fm/handle         │  ← ABLE URL, small
└─────────────────────────┘
```

Artist name appears below the type badge if cover image doesn't include it. ABLE URL is the moment deep link.

### OG metadata

When `able.fm/[handle]#lm_[id]` is shared to social, the OG image is generated from:
- Cover image (if set) or artist artwork
- Overlaid: artist name, moment type, date/time
- `og:title`: "[Artist name] — [Moment title]"
- `og:description`: "[Type] · [Date] · [Time] · [Access tier]"

In v1 this is a static OG image per artist profile. Moment-specific OG images require serverside rendering — deferred.

---

## 12. Admin Flow

Live Moments are created through the standard "Your World" moment creation flow in admin — the existing 5-step sheet — extended for the livestream type.

When the artist selects type `livestream` at Step 1:

### Step 1: Type selection
- Standard moment type picker
- "Live Moment" option — selecting it shows the 6 livestream type sub-picker
- Sub-types: Listening session / Premiere / Q&A / Supporter performance / Studio session / Virtual show

### Step 2: Date and time
- Standard date picker
- Additional: Time field (HH:MM) + Timezone selector (defaults to artist's device timezone)

### Step 3: Details
- Title (required)
- Artist note (optional — shown to fans in the moment panel)
- Cover image URL (optional — falls back to artist artwork)
- Livestream type confirmed (if not set at Step 1, set here)

### Step 4: Access
- Standard four-tier access picker (Public / Fan list / Supporters / Private)
- Additional: Replay access tier (separate picker — default: same as live access)
- Note: "Replay access can be more open than live access. Change it after the stream."

### Step 5: Stream setup
- Platform selector: YouTube / Twitch / Vimeo / Other URL
- Stream URL (required)
- Embed URL (optional — auto-suggested if YouTube/Vimeo URL is detected; shown for artist to confirm)
- RSVP toggle (default: on)
- "Fans on your list get notified when you go live" — informational copy

### Review + save
- Summary of: type, title, date/time, platform, access, RSVP status
- "Save moment" → writes to `profile.moments[]`

---

### During / after the stream

In the admin moment list, each Live Moment shows its current lifecycle state as a status chip.

**Actions available during/after:**

| State | Available actions |
|---|---|
| Scheduled | Edit, Delete, "Go live" (manual override) |
| Live | "End stream", "Extend by 1 hour" |
| Ended | "Add replay URL", Edit, Delete |

**"Go live" manual override:** Sets `state: 'live'` flag on the moment regardless of scheduled time. Used for spontaneous streams or when the stream starts late.

**"Add replay":** Post-stream, artist pastes replay URL. This sets `replayUrl` on the moment. Replay access can be adjusted at this point (e.g., open it up to public).

**"Promote to top card":** Toggle in the moment admin list. Any Live Moment can be promoted to occupy the top card showcase slot, overriding the standard state machine for that slot. Only one moment can be promoted at a time.

---

## 13. Landing Page

One demo phone state in the landing page rotation shows the "Live now" top card:

**Visual:**
- Top card in live state
- Blurred/darkened artist artwork behind
- Green dot "LIVE NOW" badge (top-right, pulsing)
- Stream title in display font
- "Join" CTA button (accent fill)

**Demo cycle duration:** 3 seconds

**Position in demo cycle:** After the World Map state, before the light theme state.

**Proof line options (pick one — do not hedge):**

> *"Live when it matters. Yours when it's over."*

This line works because it covers both states: the live moment itself, and the replay/profile relationship that outlasts it.

---

## 14. V1 vs Deferred vs Never

### V1 — shipping

| Feature | Notes |
|---|---|
| Full Live Moment object (all fields) | Stored in `profile.moments[]` |
| Three lifecycle states (scheduled/live/ended) | Auto-computed; manual override available |
| Embed: YouTube + Vimeo | iframe in top card / moment panel |
| Embed: Twitch | With correct `parent` parameter |
| Link-out: Instagram, TikTok, other URLs | Opens in new tab |
| Four access tiers | Public / Fan / Supporter / Private |
| RSVP (email capture) | Source-tagged in `able_fans` |
| Reminders (browser notification + .ics fallback) | Service worker; T-30min + T=0 |
| World Map integration | Blue dot `#4b8fd4`, type = livestream |
| Top card integration | State 4 chip (scheduled <7d) + live state |
| Share link (ABLE URL, not platform URL) | Deep links to moment in World Map |
| Share card (client-side canvas) | Portrait, cover image + title + date |
| Admin creation flow (5-step extended) | All 6 moment types |
| Replay URL + replay access tier | Set post-stream |
| Manual "Go live" override | For spontaneous or late streams |
| "Promote to top card" toggle | Admin list action |

### Deferred — not in v1

| Feature | Reason |
|---|---|
| Native streaming infrastructure | ABLE does not host streams |
| In-platform chat / comments | Requires real-time backend |
| Ticketed streaming (paid access) | Requires payment infrastructure |
| Multi-guest collab streams | Requires native infrastructure |
| Platform OAuth (auto-start YouTube/Twitch) | API complexity; v2 |
| Post-stream analytics (who watched, drop-off) | Requires platform API access |
| Push notifications via ABLE | v1 = browser only |
| Recurring stream series | Series object model — deferred |
| Moment-specific OG image (serverside) | Requires SSR |
| Email reminders | Requires broadcast infrastructure |

### Never

| Feature | Decision |
|---|---|
| ABLE hosting streams | Core principle violated — never |
| "Top streamers" discovery or leaderboard | Not what ABLE is |
| Commission on streaming revenue | Not the model |
| Forcing artists to stream on ABLE | Against artist-first principles |

---

## 15. Integration Summary

Live Moments touch four existing systems. No new systems are invented.

| System | How Live Moments integrate |
|---|---|
| Artist World Map | New dot type (`livestream`, blue `#4b8fd4`); moment panel extended with live-specific fields |
| Top card state machine | State 4 chip (scheduled <7d); live state override; ended chip with replay |
| `able_fans` data store | RSVP entries source-tagged per moment; RSVP count shown in admin |
| Moment creation flow (admin) | Existing 5-step sheet extended when `type = livestream`; no new sheet |

The schema is additive. The World Map already handles moments with type, date, access, and panel rendering. Live Moments extend that object — they do not replace it.

---

*ABLE owns the moment. The stream lives where it needs to.*
