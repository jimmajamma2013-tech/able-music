# Freelancer Auth — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when a freelancer gets work because of something they did three years ago on a different project — and never had to pitch for it.

---

## Moment 1: The Confirmation Notification

**What it is:** 48 hours after a freelancer adds a credit on ABLE, the artist confirms it. The freelancer receives a notification: "Tendai confirmed your credit on 'Still Here'." The credit's hollow dot becomes a filled tick.

**Why it's 20/10:** This is the moment the system's value becomes felt rather than described. The freelancer didn't have to chase Tendai. They didn't email a publicist. They added the credit, ABLE handled the peer-confirmation request, and 48 hours later they got a notification that their work is publicly vouched for by the person they made it with. That is what a professional credential system feels like — not a form, not a CV entry, but a live record of real work that someone else stood behind. The ✓ tick is not an icon. It is proof.

**Exact implementation:**

Notification email to freelancer — subject, body, and tone:

```
Subject: Tendai confirmed your credit on "Still Here"

Maya —

Tendai confirmed that you produced "Still Here." Your credit is now verified on your profile.

[View your profile → ablemusic.co/maya-beats]

---
ABLE — ablemusic.co
```

No marketing. No upsell. No "Check out these features." The notification is one piece of information delivered cleanly. If the freelancer is a premium member (Phase 2), also send a push notification via the ABLE bot in Discord.

Credit state transition in the UI — admin credits list:

```
Before confirmation:
  ○  Still Here — Tendai (Production)       Awaiting confirmation

After confirmation:
  ✓  Still Here — Tendai (Production)       Confirmed by artist
```

The transition from ○ to ✓ should animate with a spring — `cubic-bezier(0.34, 1.56, 0.64, 1)` — the same spring used across the product. The colour transition: from `rgba(255,255,255,0.4)` (hollow, muted) to `#4caf77` (green, confirmed).

---

## Moment 2: The Booking Enquiry with Context

**What it is:** A booking enquiry arrives in the freelancer's inbox with enough context to act on immediately — the enquirer's name, what they need, their budget, their timeline, and a link to their ABLE page if they have one.

**Why it's 20/10:** A musician who wants to hire a producer today does not want to send a cold DM, wait for a reply, get asked "what's your budget?", wait again, and eventually arrange a call. They want to fill in a form, send it, and get a reply. A freelancer who receives a vague "I'd love to work together" message wastes 10 minutes reconstructing context they should have been given. The ABLE booking enquiry delivers everything needed to write a yes or no in a single email. That friction reduction is the difference between a booking that happens and one that doesn't.

**Exact implementation:**

Email to freelancer — exact format:

```
Subject: Booking enquiry from Mara J. via ABLE

Someone wants to work with you.

Name:        Mara J.
What they need: Mixing for a 4-track EP — indie-soul, lots of space,
               thinking early Bon Iver sonic territory
Budget:      £200–500
Timeline:    Within 1 month
Their page:  ablemusic.co/mara-j

[Reply to Mara → mara@example.com]

---
This enquiry was sent via your ABLE page. Reply directly — ABLE is not involved in your conversation.
Enquiries: ablemusic.co/maya-beats/enquiries
```

The "Reply to Mara" button pre-populates the email client `to:` with the enquirer's address, and the `subject:` with "Re: your enquiry via ABLE". One tap, composer opens, context preserved.

Bottom sheet form on `freelancer.html` — field order and character limits:

```
What you need     [textarea, 3 rows, no placeholder — blank invites honesty]
Your name         [text input]
Your email        [email input]
Budget range      [select: Under £200 / £200–500 / £500–1000 / £1000+ / Not sure]
Timeline          [select: ASAP / Within 1 month / 1–3 months / Just exploring]
Your ABLE page    ablemusic.co/ [optional]

[Send enquiry]
```

The CTA text is "Send enquiry" — not "Submit" (bureaucratic), not "Get in touch" (vague). The enquirer is sending an enquiry. Say that.

---

## Moment 3: The Google Result

**What it is:** Six months after a freelancer joins ABLE, their profile ranks in Google for "[their name] mixer" or "[their name] producer" — above their SoundCloud, above their Instagram, above any outdated music industry directory.

**Why it's 20/10:** A freelancer who gets work through Google did not pay for advertising. They did not post content. They built a real record of credited work over time, and the SEO compounded. An artist searching for a mixing engineer in Bristol who produces soul music finds the ABLE profile because the page has real structured data: a name, a specialism, a location, credits on named releases. This is not a traffic strategy. It is the natural consequence of a well-structured profile with real content. The freelancer who started on ABLE three years ago is getting enquiries from people who never heard of ABLE — they just searched a name.

**Exact implementation:**

`<head>` section of `freelancer.html` — structured metadata, exact fields:

```html
<title>Maya Beats — Mixing Engineer · ABLE</title>
<meta name="description" content="Maya Beats is a mixing engineer based in Bristol. Credits include Still Here (Tendai), Dissolve (Mara J.). Open for new work. ablemusic.co/maya-beats">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maya Beats",
  "jobTitle": "Mixing Engineer",
  "url": "https://ablemusic.co/maya-beats",
  "sameAs": [],
  "description": "Mixing Engineer based in Bristol. Credits include Still Here (Tendai), Dissolve (Mara J.).",
  "worksFor": {
    "@type": "Organization",
    "name": "Independent"
  }
}
</script>
```

The description is auto-generated from profile data — specialism + location + first two confirmed credit titles. Updated when a new confirmed credit is added.

`sitemap.xml` entry for each freelancer profile:

```xml
<url>
  <loc>https://ablemusic.co/maya-beats</loc>
  <lastmod>[date of last credit confirmation]</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

Freelancer profiles are indexed. They are not behind auth gates. Public profiles are public — the credits are the thing that makes them valuable to Google.

---

## The 20/10 test

A freelancer who has not logged into ABLE in six months gets a booking enquiry from someone who found them through a Google search. They did not need to maintain anything.

---

*See also: `docs/systems/freelancer-auth/SPEC.md` — canonical freelancer auth and features spec*
