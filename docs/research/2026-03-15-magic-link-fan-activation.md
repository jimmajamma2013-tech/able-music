# Magic Link Fan Dashboard Activation — Research & Design Spec

**For ABLE (ablemusic.co) — fan.html Phase 2**
**Researched: 2026-03-15**

---

## The core problem

A fan gives their email on an artist's page. They don't think "I'm creating an account" — they think "I want to stay close to this artist." Weeks later, ABLE needs to surface a dashboard to them. The email that does this must not feel like:

- A service they forgot signing up to
- Marketing trying to upsell them
- A security alert about "your account"
- Anything that requires them to remember a password

It must feel like a natural extension of something they already did. A next step that makes sense.

---

## Key platform findings

### Slack — magic link as invitation, not security gate
82% of new members complete onboarding within 5 minutes of receiving the invite. The magic link email is "come in" not "prove yourself." Expired links land on a page that lets you generate a new one immediately — never a dead end.

### Substack — the reader who didn't explicitly join
A reader subscribes to one publication. Substack later surfaces "you have an account" via: "you're already here, here's the door." The activation email reveals what already exists for them.

**Key insight for ABLE:** The fan already made the commitment when they signed up for the artist. The activation email is simply revealing what already exists.

### Luma — confirmation email as the highest-intent moment
Luma's confirmation email fires immediately and does something useful — adds a calendar invite without requiring a click. Never asks users to "create an account" separately.

**Key insight for ABLE:** The confirmation email immediately after sign-up is the moment of highest intent. Something useful should happen in that email, not just "you're on the list."

### Bandcamp — event-triggered activation
Bandcamp triggers activation when the fan does something next — follows another artist, adds to wishlist. "You followed an artist. Want to see all your artists in one place?" is more natural than a timer firing.

**Key insight for ABLE:** Activation timing can be contextual — triggered by something the fan does or something the artist does — not just a cron job.

### Technical consensus (2025)
- Expiry: 15–60 mins for security-sensitive flows; up to 24 hours for account activation
- Expired links must always offer "send a new one" — never a dead end
- Include plain-text fallback URL in every email (not all clients render buttons)
- Unique subject line suffix prevents Gmail threading multiple auth emails
- One link per email — no competing CTAs
- "If you didn't request this, ignore it" is mandatory — safety and trust signal simultaneously

---

## The ABLE-specific problem

The fan may not know they "have an account." Their mental model is "I gave my email to Maya J." — not "I signed up to ABLE."

**This means the activation email cannot lead with ABLE. It must lead with the artist.**

The fan's primary relationship is with the artist. ABLE is the mechanism. This overrides standard SaaS activation copy.

---

## Email templates

### Template 1 — Sign-up confirmation (immediate)

**From:** `ABLE (for [Artist Name]) <notify@ablemusic.co>`
**Subject:** `You're on [Artist Name]'s list — [Day D Mon, HH:MM]`
**Preview text:** `They'll reach out when something's happening.`

```
You're on [Artist Name]'s list.

They'll reach out when something's actually happening — a new release,
a show, something worth your time. Nothing else.

──────────────────────────────────────────
Want to see all the artists you follow in one place?
Your fan page is ready when you are.

[Open your dashboard →]
(ablemusic.co/me)

This link is active for 24 hours.
If you didn't sign up for this, ignore it — nothing will happen.

ABLE · ablemusic.co
Unsubscribe from [Artist Name]'s list
```

Copy notes:
- "She'll reach out" keeps artist as subject — ABLE is invisible infrastructure
- "when something's actually happening" matches copy on the artist's page
- "Nothing else." is reassuring — UK understatement register
- Dashboard CTA is secondary and gentle — "when you're ready"
- Unique timestamp in subject prevents Gmail threading if fan gets email twice

---

### Template 2 — Event-triggered activation (artist posts something)

**From:** `ABLE <notify@ablemusic.co>`
**Subject:** `[Artist Name] just [dropped a new track / announced a show]`
**Preview text:** `See it alongside everyone else you follow.`

```
[Artist Name] just [posted something / added a show in [City] / dropped a new release].

You signed up to stay close. Here's how to see it in one place,
alongside everyone else you follow.

[See your artists →]
(ablemusic.co/me)

This link signs you straight in — no password needed. Takes about 10 seconds.

If this isn't for you: [unsubscribe]

ABLE · ablemusic.co
```

---

### Template 3 — 7-day timer activation (no event trigger)

**From:** `ABLE <notify@ablemusic.co>`
**Subject:** `Your artists on ABLE`
**Preview text:** `[N] artist[s] you follow, in one place.`

```
You signed up to follow [Artist Name] a week ago.

Your fan page has been ready since then — it shows everyone you follow,
upcoming shows, and new music from artists you care about.

[Open your dashboard →]
(ablemusic.co/me)

This link signs you straight in.

If you only want emails directly from [Artist Name], that's fine too —
you're already on their list. [Unsubscribe from ABLE updates]

ABLE · ablemusic.co
```

---

## Timing strategy

**Tier 1 — Event-triggered (best)**
Send when a relevant event occurs:
- Artist adds a show (especially near fan's inferred location)
- Artist pushes a new release
- Artist activates a campaign mode (pre-release, gig night)

Highest-conversion timing because content in the email is immediately relevant.

**Tier 2 — 7-day timer (fallback)**
If no event trigger fires within 7 days. Long enough the fan remembers the artist, not so long they've moved on.

**Tier 3 — 30-day reminder**
Single re-send for fans who never clicked the dashboard link. Last attempt. After this, assume fan wants artist emails only, not a dashboard.

**What not to do:**
- Do not send multiple activation emails in quick succession
- Do not send from a noreply address
- Do not use "activate your account" in the subject line — it reads as a chore

---

## Landing page experience

### Loading state (< 0.5 seconds, before token verified)

```
Getting your artists ready...
```

ABLE wordmark, small. Subtle pulse. Nothing else. Never a blank screen.

### Authenticated state (< 2 seconds, after token clears)

```
Good to see you.
You're following 3 artists.

[Enter your dashboard →]
```

One beat. Done. Confirms authentication worked. Tells them exactly what they're walking into.

### First authenticated visit to fan.html

If artists followed and activity exists: Today strip with updates.

If nothing new: `Nothing new from your artists today. Check back when they next post.`

Artist card strip populates regardless — seeing the artists they follow with avatars and names is intrinsically rewarding even with no new content.

---

## Zero state

A fan who has signed up to exactly one artist but has no activity to surface.

```
[Artist avatar — large]
[Artist Name]
You've been following them since March.

Nothing new today.
They'll show up here when they post, announce a show,
or drop new music.

Looking for someone else? [Search artists →]
```

**"You've been following them since March"** — specific, warm, confirms the relationship is real and remembered. Not a placeholder.

**What not to show:**
- Empty placeholder copy ("Your feed will appear here")
- Generic onboarding tours about features
- "Start by following an artist" — they already did

---

## Failure states

### Expired link

```
That link has expired.

These links are active for 24 hours — it's a security thing.
Enter your email below and we'll send a fresh one.

[email input — pre-filled if extractable from URL]
[Send new link →]
```

### Already-used link

```
This link has already been used.

That's fine — you may already be signed in.
Try opening your dashboard directly.

[Open dashboard →]

Not working? We'll send another link.
[Send new link →]
```

Primary CTA assumes success. Secondary handles genuine issues.

### Email in spam

Confirmation screen copy (shown immediately after sign-up):
```
Check your inbox — it should arrive within a few seconds.
Can't find it? Try your spam folder, or search for "ablemusic.co".
```

### Fan signs up twice with same email

Treat as add-artist event, not new account creation. Adds the new artist to their existing `followedArtists` array.

**Subject:** `[Artist Name] — you're on their list too`

```
You're now following [Artist Name].

We've added them to your artists — you can see everyone
in one place on your dashboard.

[Go to your dashboard →]
```

No "Welcome to ABLE again" — they're already a user. This is an update.

---

## Summary of key decisions

| Decision | Recommendation | Reason |
|---|---|---|
| Email framing | Lead with artist, not platform | Fan's relationship is with the artist |
| Subject line | Say what happened. Never "activate" or "account" | Reads as chore, not opportunity |
| Link expiry | 24 hours (not 15 mins) | Fan activation, not bank transfer |
| Activation timing | Event-triggered first, 7-day timer fallback | Contextual beats scheduled |
| Loading state | Show immediately, before auth completes | Removes "did anything happen?" anxiety |
| Zero state | Show followed artists even with no activity | Relationship is real and should be visible |
| Duplicate sign-up | Add-artist event, not new account | No "welcome" for existing users |

---

*Sources: Slack UX (Waveguide), Baytech Consulting magic link research 2025, Descope email templates, Postmark guide, LogRocket UX research, Substack help, Luma registration, Bandcamp fan account docs, Supabase passwordless auth docs, Smashing Magazine empty states.*
