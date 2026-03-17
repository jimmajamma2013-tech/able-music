# ABLE — Fan Persona
**Created: 2026-03-16 | Status: ACTIVE — primary reference for fan-facing product decisions**

The fan is not ABLE's customer. The artist is. But the fan is the person who determines whether the artist's ABLE page works. If the fan bounces, the product has failed — for the artist. Every decision on the profile page (`able-v7.html`) and fan dashboard (`fan.html`) should be checked against this document.

---

## The Primary Fan: Someone Who Already Cares

There is no single fan demographic. The fan could be 17 or 45, from Manchester or Medellín, a casual listener or someone who has seen the same artist four times. What they have in common is one thing: they tapped the link.

That tap is the entire entry point. And it carries important information: this person already has a relationship with the artist. They are not being acquired. They showed up voluntarily because of something the artist made — a reel, a track, a moment — that was good enough to make them want more.

This changes everything about how the profile page should work. The fan is not here to be converted. They are here because they were already converted. The product's job is to not waste their arrival.

---

### The moment of arrival

The fan tapped a link from the artist's Instagram bio, TikTok profile, or a caption. They were probably on their phone. They probably tapped out of habit or curiosity — they just heard something they liked and they want to know more. They do not have a plan. They are not going to spend twenty minutes exploring.

They have approximately 30 seconds before they decide whether to stay or bounce. In those 30 seconds, they are asking three questions:

1. **Is this the right place?** Does this feel like the artist? Not a platform, not a template — the artist's actual world.
2. **Is there something here for me right now?** A track to listen to, a show coming up, a release dropping soon. Something that makes staying feel worth it.
3. **Should I come back?** Is there a reason to leave my email, or to check back later, or to keep this page bookmarked?

The product answers all three questions through design and hierarchy, not through persuasion. The fan is not being sold to. They are being given the obvious next thing.

---

### What they came from

They arrived from a context. That context matters.

**From a reel:** They heard a snippet of a song. The song did something to them — it caught them. The first thing they want to do is hear more of it. Stream first. Everything else is secondary.

**From a TikTok:** They might have seen a performance, a behind-the-scenes clip, a trending moment. Their attention is short-format conditioned. They will scroll quickly. The page has to earn the scroll, not demand patience.

**From a mention or share:** Another fan sent them the link. They arrive with social context — someone they trust already thinks this artist is worth attention. The bar for staying is slightly lower.

**From a show:** They just attended or just heard about a show. Urgency is high. They want tickets or they want to know when the artist is next in their city.

The profile page's state system exists precisely to meet each of these moments. A fan arriving on gig night when gig mode is on gets "I'm playing tonight" — the page knows what moment it is. A fan arriving during pre-release gets the countdown and the pre-save. The page responding to the actual moment is what makes it different from every other link-in-bio.

---

### What makes them sign up

They will leave their email address if two things are true:

**One: the ask feels personal, not promotional.** "Stay close. Just your email. I'll reach out when something's actually happening." That is an artist speaking to them directly. "Subscribe to my newsletter" is a SaaS form. The copy difference is the difference between a 2% and a 10% conversion rate.

**Two: there is a genuine reason to want to hear from this artist.** If they are still on the page after 30 seconds, they have already decided they are interested. The sign-up is the moment they formalise that. They do not need convincing — they need a low-friction way to say yes.

The thing they are afraid of when they consider signing up: being spammed. The artist will email them too much, about things that don't matter, in language that sounds automated. Every copy choice on the fan capture section should address this fear directly. "I'll only reach out when something's actually happening" is a promise that converts because it is honest about what they will and will not receive.

They will not sign up if:
- The form looks like a marketing form. Fields beyond email, privacy-policy language near the input, a generic "Subscribe" button.
- The copy sounds like a brand, not a person. Any SaaS micro-copy, any marketing language, any exclamation mark.
- There is no signal-to-noise discipline. If they have seen the artist spam their followers with daily updates, they know the promise of "only when something matters" will not be kept.

---

### What they do after signing up

In V1, they close the page and go back to their day. They might listen to the track they came to find. They might check out the artist on Spotify.

Later — days or weeks later — they might get an email. If it sounds like the artist wrote it, if it is about something specific and real, they will open it and act on it. If it sounds automated, they will ignore it. The relationship starts with the sign-up, but it lives or dies in the first email.

In V2, they have a fan dashboard (`fan.html`) where they can see all the artists they follow, know about upcoming shows near them, and hear about new releases before they go wide. But that is V2. In V1 their journey ends at the sign-up and picks back up in their inbox.

---

### What they need from the profile page

**Speed.** The page must load fast and render immediately. A fan who tapped a bio link from TikTok has a short attention span and is probably on mobile data. If the page is blank for more than two seconds, they are gone.

**Clarity.** One obvious next step. Not a list of CTAs competing for attention. If they came to stream, the stream button should be impossible to miss. If there is a show tonight, that information should be front and centre. Hierarchy is the product.

**Personality.** The page should feel like the artist made it. The colour is the artist's colour. The font is the artist's font. The bio sounds like the artist wrote it. Nothing on the page should feel like a platform template. If they can feel the difference between this and a Linktree in the first few seconds, the design is working.

**An invitation, not a demand.** The sign-up exists and it is well-placed and the copy is right — but it is never the first thing they see and it never blocks them from what they came for. They can stream, browse, look at the shows, read the snap cards, and only then encounter the sign-up when they have already decided they care. The order matters: give them value first, ask for something second.

---

### What they do not want

- To be sold to. They already chose to come here. Hard CTAs, countdown timers with fake urgency, "Limited time offer" copy — all of these will make them feel like they walked into a funnel. They will leave.
- ABLE's branding in their face. They came here for the artist. ABLE's job is to disappear. "Made with ABLE" in the footer, once, small — that is the right amount of platform presence. Anything more shifts the feeling from "the artist's world" to "a platform's template."
- A bad-looking page. They have visual standards. The fan of an indie artist with strong aesthetics will judge the page by those aesthetics. If the page looks generic — wrong font, wrong colour, wrong spacing — it reflects badly on the artist and reduces the fan's estimation of them. Design quality is not cosmetic here; it is part of the artist's credibility.
- To feel managed. No gamification, no streak counters, no "you're a superfan" badges, no points system. They are not a metric. They are a person who showed up because they liked something. Acknowledge that and treat them accordingly.

---

### The fan on fan.html (V2 context)

`fan.html` is the V2 product — a personal dashboard the fan can return to. It is not live in V1. But its design principles extend from this persona, so they are worth stating.

The fan who returns to `fan.html` has a settled relationship with ABLE. They have signed up for multiple artists. They check the dashboard on Fridays — because new music comes out on Fridays and they want to know what dropped. They check it in the afternoon when they hear a friend mention a show that's "tonight" in their city and want to see if an artist they follow is on the bill.

The dashboard should feel like a clean, personal briefing, not a social feed. Each artist appears in their own accent colour — the fan is moving between artist-owned spaces, not scrolling a generic platform. Nothing is algorithmic. Nothing is ranked by engagement. Everything they see is there because they chose those artists.

They will not use it every day. They will develop a weekly ritual — check on Fridays, check when they think they've missed something. The product needs to be worth opening when they have a reason to open it, not designed to manufacture reasons to open it. The variable reward of "maybe something new is there" is enough. Manufactured urgency would break the trust.

---

### The fan's relationship with ABLE

They probably do not know what ABLE is. They tapped a bio link. They landed on a page that looked good and worked. They left their email. Later, they got an email that felt personal. If all of that happened, ABLE was invisible — which means it did its job perfectly.

If they ever notice ABLE at all, it should be as the word in a footer: "Made with ABLE." That is the appropriate level of brand presence in the fan experience. ABLE is the infrastructure that makes the moment possible. The moment belongs to the artist and the fan.

---

*Last updated: 2026-03-16*
*Cross-reference: `docs/pages/fan/SPEC.md`, `docs/pages/profile/SPEC.md`, `docs/research/2026-03-15-fan-signup-conversion.md`, `docs/research/2026-03-15-fan-retention-triggers.md`*
