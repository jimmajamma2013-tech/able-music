# fan.html — User Journeys
**Date: 2026-03-15**

Four journeys that represent real fan behaviour. Not personas, not demographics — specific situations with specific emotional contexts.

---

## Journey 1 — The New Fan (First 48 hours)

**Situation:** Layla is 23, lives in Manchester. She saw an artist called Tendai post a clip on Instagram. She tapped the link in bio. She landed on Tendai's ABLE profile. She heard 30 seconds of a song and it was exactly what she needed. She signed up with her email.

**What she knows:** She signed up to hear from Tendai. She doesn't know what ABLE is.

**What she doesn't know:** That ABLE has a fan dashboard. That other artists she might like are on here. That there's a page at ablemusic.co/me waiting for her.

---

**The journey:**

She receives the confirmation email. The subject line is: "Confirm you want to hear from Tendai." She clicks confirm. The confirmation page thanks her and mentions she can visit her own page at ablemusic.co/me.

She taps the link. She lands on fan.html.

**First 10 seconds:** She sees the ABLE wordmark. She sees "Following" as the active tab. She sees one item in Today: "Tendai — Soft Hours · New single." The feed item is in Tendai's rose accent colour. She already knows this is what she signed up for.

**The cold-start moment:** Below the Today strip, there is an in-context suggestion row: "Because you follow Tendai..." with 2–3 artist cards. The cards show artists connected to Tendai through credits or shared genre. They have their own accent colours. There's a one-tap follow option.

She follows one of them: Sol Rave.

**Near me:** She taps "Near me." She's asked for her city — a simple input, no account required, just saves to localStorage. She types Manchester. Tendai's next Manchester show appears. She didn't know they were playing. She taps "Tickets."

**What she leaves with:** She followed 2 artists. She knows about a show. The page feels like it was designed by someone who cares about music, not a platform trying to grow its user base.

**Emotional state at end:** Pleasantly surprised. This was more than she expected from a link-in-bio.

---

**What fan.html needs to do this journey justice:**
- Cold-start connected-artist suggestions shown inline in Following on first visit
- Near me location prompt on first visit to that tab
- Real data (Tendai's actual release in the feed, not demo)
- Page title that doesn't say "feed"

---

## Journey 2 — The Established Fan (A regular Tuesday morning)

**Situation:** Marcus follows 6 artists on ABLE. He has the page saved in his browser. He opens it every few days, usually in the morning. He doesn't use Instagram much anymore — he's tired of the algorithm.

**Emotional context:** He wants to be informed, not entertained. He's not here to scroll. He wants to know: is there anything new from the people I actually chose to follow?

---

**The journey:**

He opens fan.html. It renders immediately from cached data. Then new items load in the background.

**Today strip:** Two items. Nova Reign released something new. Luna Waves is playing in London on Thursday.

He taps the Nova Reign item. It opens Nova Reign's ABLE profile. He listens to the track. He taps back.

He taps the Luna Waves show item. It opens the venue's ticket page. He buys a ticket.

Total time on fan.html: under 2 minutes.

**This week strip:** Three more items. He scrolls through. One is interesting — an artist he follows (Drift) put out a snap card: a studio update. He reads it. It's a paragraph, honest, the kind of thing that would get buried in an Instagram story.

**Caught up state:** He reaches the end of the feed. A simple line appears: "You're up to date. Last updated just now."

He closes the app.

**What he leaves with:** He learned about a show he wants to attend. He heard new music before anyone who doesn't follow the artist. He read something real from an artist. None of this required him to scroll past content he didn't ask for.

**Emotional state at end:** This is what the internet used to feel like. Direct. Not noisy.

---

**What fan.html needs to do this journey justice:**
- Snap card items properly surfaced in feed with "From the artist" framing, not generic "Update" badge
- Show items that are ticketable link to ticketing URL with clear affordance
- Caught-up state that is specific about when it was last updated (not "Updated moments ago")
- Feed ordering: newest first, always

---

## Journey 3 — The Gig Night Fan

**Situation:** Priya is at home at 4pm on a Friday. She gets a push notification (or visits fan.html): "Nova Reign is playing tonight at Fabric. Doors 11pm." She's been a fan for months. She wasn't planning anything tonight. This changes things.

**Emotional context:** The post-concert-depression feeling in reverse — the pre-show excitement. This is peak receptivity. She is in the mood to spend money and commit to an experience.

---

**The journey:**

She opens fan.html. The Following tab has a feed item at the very top — it's tagged "Tonight" not just "Show". Nova Reign's item is slightly elevated visually: the card has a subtle amber warm border or glow to indicate urgency without manufactured hype.

The item reads: "Nova Reign · Fabric, London · Tonight, 11pm"

Below it, if Nova Reign had activated gig mode's "Tonight note" feature: "The room holds 800. It's been a long time coming. This one matters." — The artist's own words, not platform copy.

She taps. She lands on Nova Reign's ABLE profile in gig mode. The ticket CTA is primary. She buys a ticket.

**After the show (post-show state):** The next morning she opens fan.html. The Nova Reign item in her feed has changed. It no longer says "Tonight" — gig mode has expired. But there's a new item: Nova Reign's next date. The artist has shifted to post-show state: "Hope last night was good. Here's when I'm next doing this."

**Near me tab:** Independently of the specific show, the Near me section shows any upcoming shows from her followed artists. She finds another one — an artist she hasn't seen live — playing near her in two weeks.

**What she leaves with:** She went from "staying in on a Friday" to "going to a show tonight." The fan dashboard made that happen, not an algorithm — it was information from an artist she already chose to follow, arriving at the right moment.

**Emotional state at end:** This is why she gave her email. This is why she comes back.

---

**What fan.html needs to do this journey justice:**
- "Tonight" tag on feed items for shows within 24 hours — different visual treatment from regular "Show" badge
- Gig mode "Tonight note" surfaced in the feed item (not just on the artist profile)
- Near me shows sorted by date ascending, with "Tonight" grouping at the top
- Post-show item from artist that replaces the gig-mode item naturally

---

## Journey 4 — The Close Circle Supporter

**Situation:** James has been following an artist called Margot Veil for 8 months. He's seen them live twice. He's bought merch. He's been a Close Circle supporter for 3 months — £5/month directly to Margot.

**Emotional context:** He is not a customer. He is someone who shows up. The £5 is not a subscription — it's a relationship maintenance payment. He doesn't want perks or content. He wants proximity to someone making real art.

---

**The journey:**

He opens fan.html. The Following tab has two sections: the regular feed, and below it, a Close Circle section for each artist he supports.

The Margot Veil Close Circle section shows:
- His membership duration: "Supporting since December"
- The latest dispatch: a 3-paragraph message from Margot, sent 2 days ago — something she wouldn't post publicly. An update on the next record. Honest, uncertain, personal.
- A small "listening session" item: Margot did a private stream last week, replay available for supporters

He opens the dispatch. He reads it. There is no like button. There is no comment section. He reads it the way you read a letter.

**In the regular feed:** A release item from Margot — but his feed item has a small supporter indicator: "You heard this 3 days ago." The record dropped publicly today. He already knows it. That's exactly what the Close Circle is for.

**What he leaves with:** A sense of actual relationship. He knows things other fans don't. He gets them a few days earlier. He read something that felt like it was written for him, not broadcast at him.

**Emotional state at end:** Loyal. Not in a gamified, points-collecting way. In the way that makes someone tell their friends about an artist.

---

**What fan.html needs to do this journey justice:**
- Close Circle section per supported artist in Following view
- Dispatch items rendered as readable text within the app (not just a link to an email)
- "You heard this N days early" indicator on release items for supporters
- Membership duration displayed ("Supporting since [month]")
- No like/comment on dispatches — this is a letter, not a post
- Replay access to supporter livestreams (Phase 2+)

---

## Cross-journey observations

**What all 4 journeys share:**
1. The fan knows exactly why they are here — they followed artists they chose
2. The information is timely and specific — no generic recommendations
3. The action (tap to artist profile, tap to ticket) is one step
4. The fan leaves feeling like something real happened, not like they "consumed content"

**What none of the journeys include:**
- Scrolling endlessly
- Being shown content from artists they didn't choose
- Being asked to share or refer friends (patronising)
- Being shown their follower count or "fan rank"
- Having their data sold or their behaviour used to show them ads

**The gap between current fan.html and these journeys:**
- Journey 1 requires cold-start implementation and real data
- Journey 2 requires real data and better empty/caught-up states
- Journey 3 requires "Tonight" gig mode surfacing in feed and post-show state handling
- Journey 4 requires Close Circle section entirely — it doesn't exist yet

All four journeys are achievable. None require features beyond what V8_BUILD_AUTHORITY.md specifies. They are the design target.
