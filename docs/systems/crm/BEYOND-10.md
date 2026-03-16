# ABLE — Fan CRM: Beyond 10
**Created: 2026-03-16 | Status: ACTIVE — 20/10 vision spec**

---

The CRM is 4/10 built and 9/10 specced. The architecture is correct. What is not yet captured is the feature that makes an artist feel, for the first time, that they actually know their fans — not as a list, but as people with a history.

The 20/10 CRM moment: an artist opens their fan list before a show and filters to people who came from a previous show at the same venue. They see 12 names. They know these are people who showed up before. They can write to them with that knowledge.

No other platform can do this. Not Mailchimp. Not Spotify for Artists. Not Bandcamp. None of them know which fans came to which show because none of them were present at the show. ABLE was. The fan signed up on their phone in the room.

---

## The Show History Segment

### What the artist sees

In admin.html, the fan list has a filter bar. Currently: All / Starred / Recent.

The 20/10 version adds one more filter:

**"Came to a show"**

When selected, the list shows only fans whose `momentId` field references a show. Grouped by show, in reverse chronological order.

```
┌─────────────────────────────────────────────────────────┐
│  Fan list  ▸  Came to a show                           │
│                                                         │
│  Hoxton Hall — 14 Feb 2026                              │
│  5 fans from this show                                  │
│  ○  j***@gmail.com     Signed up at doors               │
│  ○  p***@hotmail.com   Signed up after the set          │
│  ○  l***@icloud.com    Signed up during encore          │
│  ○  m***@gmail.com     Signed up the next morning       │
│  ○  t***@outlook.com   Signed up 3 days later           │
│                                                         │
│  Moth Club — 28 Jan 2026                               │
│  7 fans from this show                                  │
│  ○  a***@gmail.com     Signed up at doors               │
│  ...                                                    │
└─────────────────────────────────────────────────────────┘
```

Three details here that matter:

**1. The timing within the show.** "Signed up at doors," "Signed up after the set," "Signed up the next morning." This is not precision for its own sake — it tells the artist something about who these people are. Someone who signed up at doors was curious before they heard a note. Someone who signed up the next morning was moved enough to seek out the page the next day. Different kinds of fans, different kinds of relationship.

**2. The grouping by show.** The artist can see Hoxton Hall separately from Moth Club. They are different audiences. Maybe the Hoxton Hall crowd is older. Maybe Moth Club is a different city. The grouping makes this visible without ABLE having to infer it.

**3. The count before the list.** "5 fans from this show" appears before the rows. Before the artist reads a single email address, they know the number. That number is the weight of that night.

---

### The "fans who've seen me more than once" view

After the first filter, one more:

**"Seen me at multiple shows"**

This requires cross-referencing `momentId` values across the fan list. A fan who signed up at Hoxton Hall in February and also signed up (or the same email exists in) the Moth Club sign-ups — that fan has a history.

```
┌─────────────────────────────────────────────────────────┐
│  Fan list  ▸  Seen me at multiple shows                │
│                                                         │
│  2 fans have been to more than one show                 │
│                                                         │
│  ○  j***@gmail.com                                      │
│     Hoxton Hall, Feb 14  ·  Moth Club, Jan 28          │
│     2 shows                                             │
│                                                         │
│  ○  t***@outlook.com                                    │
│     Hoxton Hall, Feb 14  ·  The Waiting Room, Dec 12   │
│     2 shows                                             │
└─────────────────────────────────────────────────────────┘
```

Two fans. The artist can see their full show history at a glance. Those two fans are not casual. They are the people who keep showing up. The artist should know they exist.

---

### The message flow

When an artist is in the "Came to a show" segment filter and selects Hoxton Hall, a "Message this group" action becomes available.

The artist opens the compose interface. ABLE pre-populates a suggested opening:

> "Thank you for coming to Hoxton Hall in February."

The artist can keep it, edit it, delete it. It is a suggestion, not a template. The purpose is to lower the activation energy for a message that is genuinely personal — the artist knows the context, ABLE knows the context, the fan will know the context. The message writes itself once you have the data.

The full flow:

```
1. Filter → Came to a show → Hoxton Hall, Feb 14
2. "Message this group" (5 fans)
3. Compose sheet opens
4. Pre-populated opening: "Thank you for coming to Hoxton Hall in February."
5. Artist edits, adds body, adds CTA (optional: ticket link for next show)
6. Review → Send
```

The sent message lands in each fan's inbox from the artist's name, not from "ABLE notifications." The sender is the artist. ABLE is the infrastructure.

---

### Data model — the full spec

**Extension to `able_fans` record:**

```json
{
  "email": "j***@gmail.com",
  "ts": 1739491200,
  "source": "hoxton-feb26",
  "momentId": "show_hoxton_20260214",
  "momentType": "gig",
  "signupTiming": "after-set"
}
```

**`signupTiming` values:**

| Value | Definition |
|---|---|
| `pre-show` | Signed up before gig mode started (they visited early) |
| `at-doors` | Signed up within 30 minutes of gig mode activating |
| `during-set` | Signed up between doors time and 90 minutes later |
| `after-set` | Signed up between 90 minutes and end of gig mode window |
| `post-show` | Signed up after gig mode deactivated (within 48 hours) |
| `organic` | No momentId — came through non-gig flow |

`signupTiming` is calculated at sign-up time by comparing `ts` against the show's `doorsTime` and gig mode window. It is stored, not computed — no recalculation required.

---

### The repeat-show fan detection

Cross-referencing fans across shows is a query on `able_fans` grouped by email, counting distinct `momentId` values where `momentType === 'gig'`.

```js
const fansByEmail = {};
able_fans.forEach(fan => {
  if (!fansByEmail[fan.email]) fansByEmail[fan.email] = [];
  if (fan.momentId && fan.momentType === 'gig') {
    fansByEmail[fan.email].push(fan.momentId);
  }
});

const repeatFans = Object.entries(fansByEmail)
  .filter(([email, shows]) => shows.length > 1)
  .map(([email, shows]) => ({ email, shows }));
```

This runs client-side from localStorage. No backend required at this stage. With Supabase it becomes a single JOIN query.

---

### Why this matters beyond feature value

The artist who opens their fan list before a show and sees 12 people who were at Hoxton Hall three weeks ago is holding something in their hands. Not data. Evidence that people keep showing up for them.

That artist, at soundcheck, can think: I know there are at least 12 people in that room tonight who have been here before. I know what that means. I can write them a message this week that says: thank you for coming back.

No algorithm produced that knowledge. No platform surfaced it. The fans produced it by signing up twice. ABLE connected the dots.

The artist who has this experience does not think about cancelling their subscription. They think: this is the only place that knows this about my career.

---

*The 20/10 CRM is not a better contact list. It is a memory. The product remembers which fans showed up, when, and where — so the artist can act on that knowledge instead of treating every fan as if they just arrived.*
