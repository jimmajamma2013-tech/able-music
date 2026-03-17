# ABLE — World Map / Fan Calendar: Beyond 10
**Created: 2026-03-16 | Status: ACTIVE — 20/10 vision spec**

---

The fan dashboard calendar is currently 2/10 built. The architecture is right — followed artists' upcoming moments, rendered in time order, no algorithm. What is not yet specced is the moment that makes the calendar worth opening every day.

The 20/10 moment: a fan opens their calendar on a Tuesday morning and sees "Tendai drops something today." Not what. Just that something is coming. And the uncertainty is deliberate.

---

## The "Something Today" Moment Type

### Background

Artists can schedule different types of releases in ABLE. A track. A video. A voice note. A ticket drop. A visual post. Each is a different kind of moment with a different kind of anticipation.

Some artists, for some releases, will choose not to reveal the format in advance. This is not an edge case — it is a creative decision. A surprise drop. An unannounced visual. A voice note that goes out to fans before anyone else. The artist knows what it is. The fan does not.

The calendar needs to handle this state. Currently it would either show nothing (because there is no event type to display) or show a generic "release" tag. Neither is correct. The correct experience is vague on purpose.

### The moment type: `opaque`

Every scheduled release in ABLE has a type field. Possible values:

```
type: 'track' | 'video' | 'visual' | 'voicenote' | 'tickets' | 'opaque'
```

`opaque` means: the artist has confirmed something is dropping on this date but has chosen not to reveal the format. The fan calendar renders this differently from every other event type.

---

### What the calendar renders for an `opaque` moment

**In the calendar day view:**

```
┌──────────────────────────────────────────────┐
│  Tuesday, 18 March                           │
│                                              │
│  ○  Tendai drops something today             │
│                                              │
└──────────────────────────────────────────────┘
```

Not: "Tendai has a release today."
Not: "New music from Tendai."
Not: "Tendai — release TBC."

**"Tendai drops something today."** Full stop.

The word "something" is the entire design decision. It is vague in the way that a friend saying "come to the show tonight, trust me" is vague. It creates a state of attention without an obligation. The fan does not feel misled because nothing was promised. They feel intrigued because something was withheld.

---

### How the artist sets this

In admin.html, when scheduling a release in Campaign HQ:

**Step 1 — date selection** (already exists)

**Step 2 — format selection:**

```
What are you dropping?
○  Track
○  Video
○  Visual
○  Voice note
○  Ticket drop
○  Keep it vague
```

If "Keep it vague" is selected, the `type` field is set to `opaque` and the `releaseLabel` is suppressed from the fan calendar. The artist's own Campaign HQ still shows the true type (they set it), but the fan-facing calendar shows only the date and "something."

The tooltip in admin explains this decision:
> "Fans will see the date but not the format. Good for surprises."

---

### The full rendering spec by moment type

| Type | Fan calendar copy |
|---|---|
| `track` | "[Artist] drops a new track today" |
| `video` | "[Artist] releases a new video today" |
| `visual` | "[Artist] shares something visual today" |
| `voicenote` | "[Artist] sent something to fans today" |
| `tickets` | "[Artist] drops tickets today" |
| `opaque` | "[Artist] drops something today" |

Notice: `voicenote` is also deliberately specific-but-opaque. The fan knows it is a personal message, but not what it says. That also creates a pull.

---

### The morning experience — full UX spec

A fan opens fan.html at 9:04am on a Tuesday. The first thing they see is not their followed artists in a list. It is today.

**Top of fan.html on a day with events:**

```
┌──────────────────────────────────────────────┐
│  Today                                       │
│                                              │
│  ○  Tendai drops something                  │
│     [Go to her page →]                       │
│                                              │
│  ○  Kofi is playing tonight                 │
│     Dalston Superstore · Doors 8pm           │
│     [Tickets →]                              │
└──────────────────────────────────────────────┘
```

"Today" is the heading. Everything happening across all followed artists today, in one view, before anything else. The calendar does not open on this week's grid — it opens on now.

The "Go to her page →" link is intentional. ABLE does not inline the release. It sends the fan to the artist's page. This is the right choice because: it drives traffic to the artist's ABLE profile (the attribution point), it respects that some releases need context (the artist's page may have a message attached), and it keeps the fan experience simple.

---

### The fan who checks the calendar every morning

The ambition of the "something today" moment type is not a single interaction. It is a habit.

A fan who follows six artists on ABLE and checks their calendar every morning before work is a different kind of fan than one who waits for a notification. They are engaged on their own terms, at their own rhythm. ABLE does not push them — it waits for them and rewards the visit with exactly the right amount of information.

The `opaque` moment type is the most powerful version of this because it provides a reason to go to the artist's page directly, rather than consuming the release in the feed. The fan arrives curious. The artist greets them on their own terms, in their own space. That is a different quality of interaction than any algorithmic feed can create.

---

### What this requires

**Data model addition to `able_shows`-equivalent for releases:**

```json
{
  "releaseDate": "2026-03-18T08:00:00Z",
  "type": "opaque",
  "label": null,
  "announced": true,
  "artistId": "tendai-xyz"
}
```

`label` is null when `type` is `opaque`. The calendar reads `type` to determine copy. If `type === 'opaque'` and `label === null`, render: "[Artist] drops something today."

**fan.html calendar component:**
- Reads from followed artists' release data
- Groups by date
- Renders "Today" section at top when `date === today`
- Renders `opaque` type with suppressed format label

---

*The best fan calendar is not the one with the most features. It is the one a fan opens every morning because they know it will tell them something true and only what they need to know. "Tendai drops something today" — six words, and the fan is already thinking about her.*
