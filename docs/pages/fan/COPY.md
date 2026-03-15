# fan.html — Copy Reference
**Date: 2026-03-15**
**Voice principle: fan.html sounds like it was written by artists and people who love music. Not by a platform.**

---

## Voice rules specific to fan-facing copy

The artist-facing copy on admin.html speaks to someone managing their presence. The fan-facing copy on fan.html speaks to someone staying close to music they love.

**Never write:**
- "Your feed" → say "The artists you're following"
- "Posted" → say "dropped", "released", "just shared"
- "Content" → say "music", "update", "show", "message from the artist"
- "Followers" → say "people who follow them"
- "Trending" → never
- "Going viral" → never
- "Recommended for you" → say "Because you follow [Artist]" or "Similar sound"
- "Engage" → never
- "Notifications" in a sterile sense → say "Updates from your artists"
- Any exclamation marks

**Always write:**
- Specific and honest. "Nothing new today." not "All caught up! Come back later."
- Direct. "Tendai is playing in Manchester on the 22nd." not "A show has been added in your area."
- In the tone of the artist, not the platform. Show copy comes from the artist. Dispatch copy is the artist.
- Dates and times are specific. "Tonight, 11pm" not "Upcoming event."
- Empty states acknowledge reality, they don't spin it.

---

## Page title

**Current (wrong):** `ABLE — Your feed`

**Correct:** `ABLE` or `ABLE — Following` or just `Your artists`

Use: `ABLE` as the page title. No subtitle needed.

---

## Header copy (Phase 2 — when auth exists)

With first name:
> Good morning, [Name].

Without first name (v1):
> No greeting copy needed. The ABLE wordmark is sufficient.

Sub-greeting (under wordmark, if implemented):
> [N] of your artists have something new today.
> [Artist name] is playing near you this week.

Rules for sub-greeting:
- Only show if there is something genuinely new (not a default state)
- If two things are happening, show the most time-sensitive one
- Never show both simultaneously (choose one)
- Never manufacture urgency ("Don't miss this")

---

## Content tabs

| Current | Correct |
|---|---|
| Following | Following |
| Discover | Discover |
| Near me | Near me |

These are correct. Keep them. "Following" over "Feed" or "Home". "Near me" over "Shows" or "Local".

---

## Following view — section labels

**Today strip:**
```
TODAY
```
(uppercase, letter-spacing, small — this is a label not a heading. Current implementation correct.)

**This week strip:**
```
THIS WEEK
```
(Same treatment. Current implementation correct.)

**Nothing new today (inline empty state):**

Current (wrong): `Nothing new today.`

Correct, in context:
> Nothing new from your artists today.
> Last drop was [N days ago].

If N = 1:
> Nothing new today. [Artist name] posted something yesterday.

If N = 7+:
> It's been a quiet week. Your artists will be back.

If they only follow one artist:
> Nothing new from [Artist name] today.

---

## Caught-up state

**Current (wrong):**
> You're all caught up
> Updated moments ago

"You're all caught up" is SaaS speak. "Updated moments ago" is meaningless.

**Correct:**
```
— you're up to date —
```
In the same treatment as the current line design (decorative rule on each side). But the copy is shorter and less congratulatory.

Sub-line: omit entirely, or use: `Refreshed just now` only when a Supabase fetch actually completed.

---

## Empty state — no artists followed yet

**Current (wrong):**
```
🎵
No one in your feed yet
Follow artists from their ABLE page and you'll see their releases, shows, and drops right here.
```

**Correct (first visit):**
```
You're here because of an artist.

Find them — or find someone new.

→ Discover artists
```

**Correct (returning, no follows):**
```
Your following list is empty.

Find artists from their pages, or look through Discover.

→ Discover artists
```

Rules:
- No emoji in empty states for fan.html (feels childish at ABLE's register)
- Direct CTA to Discover
- Does not over-explain
- "Your following list is empty" is honest, not apologetic

---

## Cold-start suggestion row (first visit, 1 artist followed)

Label:
> Because you follow [Artist name] —

Artist card reason strings (pick the most accurate):
- "Same sound" (shared genre)
- "Produced by [Producer name]" (credit connection)
- "Also from [City]" (location connection)
- "Often played together" (when we have show co-billing data)
- "New to ABLE" (when artist recently joined)

Never:
- "You might like"
- "Recommended for you"
- "People like you also follow"
- Any engagement-based signal

---

## Feed item type badges

| Type | Current | Correct |
|---|---|---|
| release | Release | New music |
| event | Show | Show |
| merch | Merch | Merch |
| snap | Update | From the artist |

"From the artist" for snap cards is honest and specific. "Update" is generic SaaS.

---

## Feed item subtitles (the `item.sub` field)

These come from artist data but should be formatted as:
- Release: `New [single/EP/album] · [N tracks]` — "New single" not "Single release"
- Show: `[Venue] · [City] · [Time]` — specific, not "Event"
- Merch: `[Item name] · [Price if available]`
- Snap card: The first line of the artist's message, truncated if long. No reformatting.

---

## Near me view

**Location line:**
Current: `London, UK` with a dot and "Change" link — acceptable.
Correct: `[City], [Country]` — same, but with: `Set your city →` if no location is stored, not "London, UK" hardcoded.

**"Change" link:**
Current (wrong label): `Change`
Correct: `Change city`

**No location set (first visit to Near me tab):**
```
Where are you based?

We'll tell you when your artists are playing near you.

[Enter your city]
```

Small, inline, no drama. One input. Saves to localStorage immediately.

**Shows section labels:**
```
TONIGHT
THIS WEEK
COMING UP
```
TONIGHT added for shows within 24 hours — more urgent, more useful.

**Show item with gig mode Tonight note:**
When artist has set a "Tonight note" in gig mode:
```
[Artist name]
[Venue] · [City]
"[Artist's own words — e.g. 'The room is small. It's going to be good.']"
[Tonight button linking to tickets]
```

**No shows from followed artists in city:**
```
None of your artists are playing in [City] soon.

But there are [N] shows nearby from artists you might like. →
```

**No shows at all in city:**
```
No shows near [City] right now.

We check Ticketmaster — shows get added as artists announce them.
```

**Following badge on show items:**
Current: `Following` pill badge — acceptable.
Better: remove the following badge and instead show the artist's accent-colour left strip on the show item (matching the card design language). Visual recognition, not text label.

**Ticket button:**
Current: `Tickets`
Correct: `Tickets →` or just `Tickets` — current is fine.

---

## Discover view

**Filter pill labels:**
| Current | Correct |
|---|---|
| Emerging | New to ABLE |
| Connected | Connected |
| By vibe | By sound |
| Just dropped | Just dropped |

"Emerging" implies velocity ranking — change to "New to ABLE" for honesty.
"By vibe" is acceptable but "By sound" is more specific to music.
"Just dropped" is good — keep it.

**Section labels:**
| Section | Current | Correct |
|---|---|---|
| Emerging filter | `Emerging artists` | `New to ABLE` |
| Connected filter | `Connected to artists you follow` | `Artists connected to yours` |
| By genre filter | Just the genre name | `[Genre] ·` with small note about what "connected" means here |
| Just dropped | `New this week` | `New this week` (keep) |

**Connected artist card reason strings:**
- `[Role] on [Artist name]` — e.g. "Producer on Nova Reign"
- `Mixed [Artist name]'s last record`
- `Co-wrote with [Artist name]`

These are from the credits network. Specific, honest, no algorithmic implication.

**Emerging artist card reason strings:**
- `New to ABLE this month`
- `From [City]` (when city matches fan's location)
- `Similar sound to [Artist name they follow]`
- No follower counts. No "trending". No engagement signals.

**Creatives section label:**
Current: `Creatives`
Correct: `The people behind the music`

This is the credits-discovery feature. The label should explain what it is.

Sub-label for context:
> Producers, mixers, and collaborators who worked on music from artists you follow.

---

## Notification panel (Phase 2 copy)

Notification panel title:
> Updates from your artists

Empty state:
> Nothing new right now.

Notification types and copy:

**New release:**
> [Artist name] just dropped [Release title].
> [Relative time]

**Show tonight:**
> [Artist name] is playing tonight at [Venue], [City]. Doors [time].

**Pre-release countdown:**
> [Release title] by [Artist name] drops in [N] days.

**Close Circle dispatch:**
> [Artist name] sent something to their close circle.
> [First 20 words of dispatch...]

**Post-show:**
> Hope last night was good. [Artist name]'s next date is [date].

---

## Close Circle section (Phase 2 copy)

**Section header:**
```
Close circle
```
(lowercase — this is personal, not a section title)

**Per-artist supporter block:**

Supporting state:
> You've been part of [Artist name]'s close circle since [Month Year].

Latest dispatch:
> [Date] — [First sentence of dispatch]

Early access indicator on release item:
> You heard this [N] days before it was public.

**Invitation (non-supporter, after 14+ days of following):**
> Some fans go a bit further.
> They hear new music before it's out, get first access to shows, and occasionally get a message that doesn't go everywhere.
> It's £5 a month, directly to [Artist name].
>
> Keep things as they are, or come closer.

Two options: `Keep as is` (secondary, muted) and `Come closer` (primary, artist accent colour).

Never: "Join now", "Subscribe", "Become a supporter", "Upgrade".

---

## Fan settings / Me tab (Phase 2 copy)

Page title:
> You

Not "Profile" or "Settings" or "Account". "You" is the right register for ABLE.

Sections:

**Following:**
> The [N] artists you follow

**Notifications:**
> Updates from your artists
> [Toggle per artist]

**Your data:**
> Your list is yours.
> Everything you've signed up for on ABLE belongs to the artist you signed up through, not to us.
> You can export your data or delete your account at any time.

**Export:**
> Download your following list

**Delete account:**
> Stop using ABLE

(Not "Delete account" as primary — "Stop using ABLE" removes the permanence framing that creates friction without adding safety.)

---

## Bottom tab bar labels

| Tab | Current | Correct |
|---|---|---|
| Feed | Feed | Following |
| Artists | Artists | Artists |
| Me | Me | Me |

"Following" not "Feed". The others are fine.

---

## Error states

**Failed to load feed:**
> Couldn't reach the server.
> Showing what we have cached.

Not "Error loading data" — be human.

**Failed to load shows:**
> Can't load shows right now. Try again.

**Artist unavailable:**
> This artist's page isn't available right now.

---

## Principles summary

1. The fan is not being managed. They are staying close to something they care about.
2. The platform is invisible. The artists are visible.
3. Honest > cheerful. "Nothing new today." > "You're all caught up!"
4. Specific > general. "Tendai is playing Manchester on the 22nd." > "A show is coming up in your area."
5. Artist voice > platform voice. When a dispatch appears, it is the artist's words. ABLE does not rephrase them.
6. No "feed". No "content". No "engagement". No "followers".
