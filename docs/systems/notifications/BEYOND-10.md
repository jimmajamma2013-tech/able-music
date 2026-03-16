# ABLE — Notifications: Beyond 10
**Created: 2026-03-16 | Status: ACTIVE — 20/10 vision spec**

---

The notifications spec is 9.5/10 and 1/10 built. The architecture is right. What is not yet captured is the quality that makes a single notification feel human — not designed, not templated, not triggered.

The 20/10 notification is one that surprises someone. Not with information. With recognition.

---

## The First Fan Notification

### The moment

An artist is going about their day. They dropped their link in their bio last Thursday. They haven't checked admin since. And then their phone buzzes with a notification from ABLE.

This is the most important notification ABLE will ever send. It is the first one. And it is the moment that, if handled well, makes the artist tell other artists about this product.

**What the notification must not say:**
- "New fan sign-up"
- "You have a new subscriber"
- "user@example.com joined your list"
- "Someone signed up to your ABLE page"

Any of these would be correct. All of them would be forgettable. They describe what happened. They do not name what it means.

**What the notification says:**

> "Someone found you."

That is the first line. That is all.

And then, below it, in smaller text:

> They came from your TikTok.

Or:
> They came from Maya's page.

Or:
> They came via your direct link.

The source. The context. The notification is two lines. The first names the emotional fact. The second names where it happened. Together they tell the whole story.

---

### The five first-fan scenarios — exact copy

**Scenario 1 — Fan came from TikTok (`source: 'tiktok'`)**
```
Title: Someone found you.
Body:  They came from your TikTok.
```

**Scenario 2 — Fan came from another artist's ABLE page (`source: 'maya-xyz'`, `sourceType: 'artist-page'`)**
```
Title: Someone found you.
Body:  They came from Maya's page.
```

**Scenario 3 — Fan came from a direct link, no ref parameter (`source: 'direct'`)**
```
Title: Someone found you.
Body:  They followed your direct link.
```

**Scenario 4 — Fan came from Instagram (`source: 'instagram'`)**
```
Title: Someone found you.
Body:  They came from Instagram.
```

**Scenario 5 — Fan came during gig mode at a live show (`source: 'gig'`, `momentId` present)**
```
Title: Someone found you.
Body:  They signed up at the show tonight.
```

---

### Why "Someone found you" and not "You have a new fan"

"You have a new fan" is grammatically passive. It puts the artist in the subject position but describes an administrative event. A sign-up.

"Someone found you" is different. It names what actually happened from the fan's perspective: they were looking, or they stumbled across something, or a friend sent them a link, and they found this artist. That act of finding is meaningful. It is the beginning of a relationship. The artist should feel it as that, not as a database insertion.

The word "someone" is deliberate. It is not "a fan." It is not "a user." It is a person, unspecified, who found this artist somewhere in the world and thought: I want to stay close. That is what ABLE is for. That is what the notification should communicate.

---

### Subsequent fan notifications (2nd through 9th)

The first-fan notification is unique. After that, the notification for each new fan uses a different register — still human, still specific, but without the ceremony of the first time:

**Fans 2–9:**
```
Title: New fan
Body:  [source] → [first-name-or-masked-email]
```

Example:
```
Title: New fan
Body:  TikTok → james***@gmail.com
```

Not "james***@gmail.com signed up." Just the source → the person. The arrow implies action. The masking is privacy by default.

---

### The 10th fan notification

Zero-to-one is a moment. One-to-ten is a pattern.

When the 10th fan signs up, the notification does not say "New fan." It says:

```
Title: 10 people signed up.
Body:  This is becoming something.
```

"This is becoming something." Not "Your audience is growing." Not "You're on a roll." The phrase is deliberately incomplete — *something*, not *something big* or *something real*. The artist completes the thought themselves. That is the register ABLE uses. It does not tell artists what to feel. It gives them the beat, then gets out of the way.

---

### The milestone structure — full table

| Fan count | Title | Body |
|---|---|---|
| 1 | Someone found you. | [source copy] |
| 10 | 10 people signed up. | This is becoming something. |
| 50 | 50 people on your list. | More than most artists ever get to. |
| 100 | 100 people. | These are 100 people who asked to hear from you. |
| 500 | 500 people. | Half a thousand people who want to know what you do next. |
| 1,000 | A thousand people. | A thousand people chose to stay close. |

Each milestone notification fires exactly once. It does not repeat if the count dips and rises again. It is a one-way door. Each one lands in its moment and does not return.

---

### Notification formatting rules

1. Title is never more than 5 words. Usually 3.
2. Body is never more than one sentence.
3. No exclamation marks. Ever.
4. No emojis. Ever.
5. The source is always named if it is known. If unknown, it is omitted — not replaced with "unknown source."
6. Artist's name is never used in a notification to the artist. It is their phone. They know who they are.

---

### What this costs to build

The copy is already written above. The notification trigger logic requires:
- A check on fan count after each new sign-up
- Comparison against milestone thresholds
- A `notified_milestones` array in localStorage (or profile record) to prevent double-firing
- PWA push or browser notification API for delivery

The infrastructure is the build. The copy is done. When the notification layer is implemented, the copy above is the spec. No copywriting pass required.

---

*The best notification is the one that arrives and makes the person stop what they are doing for a moment. Not because it demands attention. Because it said something true. "Someone found you." An artist who receives that notification at 2pm on a Wednesday, sitting in a coffee shop, will remember it.*
