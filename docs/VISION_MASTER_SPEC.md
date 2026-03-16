# ABLE — Master Vision Spec
**Written: 2026-03-15 | Status: AUTHORITATIVE — share with other LLMs for feedback**
**This is the full vision build spec. Not a patch of v7. Start here.**

---

## HOW TO USE THIS DOCUMENT

This spec covers the complete ABLE vision from scratch. It is written so that any LLM with no prior context can understand the product, the users, and make decisions during a build session.

**The root truth:** The relationship between artist and fan belongs to them — not to a platform. ABLE is the conduit, not the room. When ABLE closes, the artist takes their list and walks.

**The test for every decision:** Can a 13-year-old who has never used anything like this figure it out in under 30 seconds?

---

## PART 1 — WHO USES THIS (REAL WORLD USER STORIES)

These are real humans with specific contexts. Every UX decision must be legible to all of them.

---

### ARTIST TYPE 1: The Bedroom Producer (Age 16–22)

**Real example:** Jaylen, 17, Manchester. Makes beats on his laptop. Posts on SoundCloud and sometimes TikTok. Has 340 SoundCloud followers and a few hundred on Instagram. Has never set up a "proper" artist page. Doesn't have a Spotify artist page because he hasn't released anything through a distributor. Uses his Instagram bio link as a SoundCloud link.

**What he needs:**
- Paste his SoundCloud link → page looks professional immediately
- SoundCloud embed plays on his page (full playlist, not just one track)
- His Instagram followers can see who he is and listen without leaving the page
- A way to collect emails of people who want to hear more ("100 people who actually care")
- Absolutely zero jargon — he doesn't know what "campaign state" or "CTA" means
- The page just works — no setup beyond basics

**What he definitely doesn't need (yet):**
- Pre-release countdown
- Merch
- Gig mode
- Analytics beyond "X people have signed up"

**What "success" looks like for him:**
Sends the link to a girl he likes. She listens to his music on it and signs up. He sees her email in his list.

**UX implications:**
- SoundCloud full playlist embed must be native and beautiful
- Onboarding must work for someone with NO Spotify artist page
- Evergreen/profile mode is his entire experience — never force a campaign state on him
- "Fan sign-up" must feel like sharing something personal, not a marketing tool
- He will look at his phone while doing this, probably in bed

---

### ARTIST TYPE 2: The Independent Indie Artist with a Release Dropping (Age 24–30)

**Real example:** Priya, 26, London. 3,400 Spotify monthly listeners. Has used Linktree for 2 years — currently has 8 links on it (Spotify, Apple Music, YouTube, Instagram, "buy tickets", "pre-save", "stream my EP", "join my list"). Has a new single dropping in 18 days. Heard about ABLE from another artist.

**What she needs:**
- Import her Linktree links immediately so she doesn't lose them
- Set a release date → page automatically goes into pre-release mode with countdown
- Pre-save link front and centre
- Email capture while fans are in the anticipation window ("I'll tell you when it drops")
- When release date hits, page automatically switches to streaming mode
- Spotify embed on the page so fans hear it without leaving
- Analytics: where are signups coming from? Instagram vs TikTok vs word of mouth?

**What she knows:**
- She knows where to find her Spotify artist URL (she uses Spotify for Artists app)
- She knows what a pre-save is
- She might not know what "oEmbed" means — doesn't matter

**What "success" looks like for her:**
18 days of build-up. 200 fans sign up during pre-release. The day it drops, she sends one message to all 200 of them. It goes straight to their inbox — not Instagram's algorithm.

**UX implications:**
- Linktree import is the #1 friction reducer for this persona
- Pre-release state must be trivially easy to set up: "When does it drop? [date picker]"
- The artist should not need to understand that "campaign state" is a thing — it should just happen
- Release date auto-switch must work even if she forgets to come back

---

### ARTIST TYPE 3: The Working Gigging Musician (Age 28–40)

**Real example:** Dan, 35, Birmingham. Folk singer-songwriter. Plays 3-4 shows a week. Has 2 albums on Bandcamp. Uses Facebook events for shows. Has a website built in 2019 that he never updates. His "bio link" on Instagram just goes to his website. Getting bookings through personal contacts, not discovery.

**What he needs:**
- Events section: list his upcoming shows with venue, date, ticket link
- "I'm playing tonight" mode that puts tickets front-and-centre for 24 hours
- Music embeds: Bandcamp or Spotify, his two albums prominent
- Merch link: just a URL to his Bandcamp merch page
- A professional-looking page that doesn't embarrass him when promoters Google him
- Fans to sign up so he can tell them about new shows ("hear about dates first")

**What he definitely doesn't care about:**
- Pre-release campaigns
- Analytics beyond fan count
- Close Circle / supporter tier (maybe later)
- Anything that takes more than 10 minutes to set up

**What "success" looks like for him:**
A promoter Googles him, finds his ABLE link, sees upcoming shows, sees two albums, thinks "this guy is legit."

**UX implications:**
- Events section must be dead simple to fill in (venue, date, doors time, ticket URL)
- Gig mode must be one tap: "I'm playing tonight" toggle
- Bandcamp embed must be supported natively
- The profile in "just existing" mode (no active campaign) must look stunning with just music + events
- Merch can be as simple as a link — don't require him to set up a whole merch store

---

### ARTIST TYPE 4: The Mid-Tier Artist Who Actually Wants the Data (Age 30–42)

**Real example:** Kemi, 37, R&B/Soul artist. 28,000 Spotify monthly listeners. Has booking agent. Has management. Has been using a mix of Linktree, Mailchimp, and Instagram to manage fan contact. Frustrated that fan data is scattered everywhere. Wants to consolidate. Is comfortable with tech but not a developer.

**What she needs:**
- Real fan list with confirmed emails
- Know which fans are from which platform (attribution: Instagram vs TikTok vs bio link)
- Close Circle: a small paid supporter tier for her 50 most dedicated fans ("£5/month, you get things first")
- Pre-release campaigns with professional countdown
- A way to send broadcasts to her list ("my album is out, stream it now")
- Analytics: fan growth over time, where signups come from, which CTAs they click
- Credits section: who produced, mixed, mastered her tracks (her producer has an ABLE page)

**What "success" looks like for her:**
She knows exactly how many real fans she has. She knows 400 of them are from Manchester. Before her next Manchester show, she can message just those 400.

**UX implications:**
- Fan list must show confirmed vs unconfirmed, source attribution, location (where available)
- Close Circle needs proper payment wiring (Stripe) — not just a UI placeholder
- Broadcasting requires Pro tier — upgrade must show exactly what she gets ("message 2,847 people directly")
- Credits on release cards → live links to collaborators' ABLE profiles
- Admin dashboard is her primary space, not the profile page

---

### ARTIST TYPE 5: The Older Artist with Zero Tech Skills (Age 45–65)

**Real example:** Derek, 58, jazz pianist. Has played for 30 years. Has two albums on Spotify. Has a manager who handles social media. Has heard that he needs a "link in bio" but doesn't know what that means. His manager sent him here.

**What he needs:**
- Absolute maximum simplicity: if there are two options, show him one
- Everything explained in plain English ("Your page is the link you put in your Instagram bio")
- No jargon: not "CTA", not "campaign state", not "oEmbed", not "slug"
- Spotify import must not require him to know what a Spotify artist URL is — guide him step by step ("Open Spotify → Search your name → Tap the three dots → Share artist → Copy link")
- Once set up, he should barely need to come back unless something changes
- If he does come back, the admin must be obvious: one thing to look at (fan list), one thing to change (page state)

**What "success" looks like for him:**
He gives the link to his manager. Manager puts it in his Instagram bio. Fans start signing up. Derek doesn't need to touch it again.

**UX implications:**
- Spotify import needs a "How do I find this?" helper with visual steps
- Every input field needs a crystal-clear example, not a placeholder ("e.g. Art Blakey Quartet Live")
- Admin dashboard must have a clear "main thing" — don't show him 8 menu items
- Error messages must be human: "That doesn't look like a Spotify link — try copying it from the Spotify app" not "Invalid URL format"
- Ideally someone (like his manager) can set up the page on his behalf without it being confusing

---

### ARTIST TYPE 6: The TikTok/YouTube-First Creator Who Makes Music (Age 18–26)

**Real example:** Zara, 22. 40k TikTok followers, 12k YouTube subscribers. Posts music videos and covers. Does NOT have a Spotify artist page. Her main "music" is her YouTube channel and TikTok videos. Her music is on YouTube but not distributed to Spotify.

**What she needs:**
- YouTube video embed as the TOP CARD (her latest YouTube Short or video, plays inline)
- YouTube channel link prominent
- No pressure to be "on Spotify" — YouTube is her streaming platform
- Fan sign-up capture under the video ("stay close — I'll tell you when I upload")
- A way to show her TikTok without it being just a link (at least a thumbnail or link card)
- The profile to feel like an extension of her YouTube presence, not a separate thing

**What "success" looks like for her:**
Her 40k TikTok followers see her bio link. They click it. They see her latest YouTube video playing right there. They sign up. She has their emails now, not just TikTok followers she could lose tomorrow.

**UX implications:**
- YouTube video embed as top card must be the PRIMARY option, not a workaround
- YouTube Shorts work exactly the same as YouTube videos (same embed, portrait format)
- Portrait/vertical video needs to render properly in the top card — not cropped wrong
- "Music section" should really be "Music & Video" — don't force a Spotify-first mental model
- TikTok cannot be embedded — show as a link card with her handle
- The onboarding must have a path that starts with YouTube, not Spotify

---

### ARTIST TYPE 7: The Artist Who Just Wants Something Pretty (Age Any)

**Real example:** Mia, 29. Electronic producer. Has Spotify. Has been making music for 3 years. Doesn't have releases out yet. Just wants a page that looks beautiful and has her platforms — basically a better link in bio. Doesn't care about fan capture, pre-release, gig mode. She wants to look professional.

**What she needs:**
- Beautiful page with her artwork/photo
- Her Spotify, Apple Music, SoundCloud, Bandcamp links as platform pills
- Maybe a bio
- Maybe her latest track embedded
- Nothing else. No complexity.

**What she definitely doesn't want:**
- Being pushed to add CTAs
- Being told to "set a campaign state"
- Forms she doesn't understand
- A separate admin dashboard to manage

**What "success" looks like for her:**
She sends the link to a venue she's enquiring about booking. It looks stunning. It has her music. It loads in 2 seconds.

**UX implications:**
- Evergreen/profile mode must be the DEFAULT and must be 10/10 quality with minimal setup
- Fan sign-up should be OPTIONAL, not shown by default unless artist activates it
- Platform pills are enough to make the page functional
- The page must look 10/10 with just: name + photo/artwork + bio + 3-4 platform links
- No CTAs should be required — "Just existing" is a complete state, not an empty state

---

### ARTIST TYPE 8: The Label/Manager Setting Up on Behalf of Artists (Age 25–45)

**Real example:** Sophie, 33, manager. Managing 4 artists. Wants to set up ABLE pages for all of them. Is tech-savvy. Wants to be able to hand the pages over to the artists to manage themselves later.

**What she needs:**
- Fast setup: paste Spotify URL → 90% done in 30 seconds per artist
- Clean hand-off: artist can log in and manage their own page without needing Sophie
- Multiple pages from one account OR separate accounts per artist (Label tier)
- Clear admin interface the artist can use without calling Sophie
- Works as a professional tool, not a toy

**UX implications:**
- Spotify auto-import is even more critical for this persona
- Onboarding should be completable in under 2 minutes per artist
- The admin must be clean enough to hand over to a non-technical artist

---

### FAN TYPE 1: The Casual Supporter (Age 16–35)

**Real example:** Amy, 24. Follows 40+ artists on Spotify. Clicks links in Instagram bios occasionally. Not deeply invested in any one artist. Signs up on ABLE because the artist she was just listening to had a sign-up on their page and the copy said "just her, no spam."

**What she expects:**
- The page to load fast and look like it belongs to the artist
- To sign up with ONE tap (email field + one button)
- A confirmation email that sounds like the artist wrote it, not a platform
- To hear from the artist occasionally when something actually happens
- To be able to unsubscribe whenever

**UX implications:**
- Fan sign-up must be ONE field (email) + one button
- Copy must be in the artist's voice: "Just [Name]. No spam." — not "Subscribe to our mailing list"
- Confirmation email: "Check this is you — [Artist] asked me to verify" — not "Confirm your subscription"
- No platform branding on the sign-up experience. It should feel like the artist's own thing.

---

### FAN TYPE 2: The Dedicated Fan Who Will Use fan.html (Age 18–30)

**Real example:** Marcus, 21. Has signed up for 6 different artists on ABLE. Uses the fan dashboard regularly. Wants to know when artists are releasing new music, playing shows near him.

**What he needs:**
- Today strip: what's happening RIGHT NOW with artists he follows (new drop, show tonight)
- Shows near him (he's in Leeds — he wants Leeds shows)
- New releases from followed artists
- Maybe: Close Circle for one artist he really loves

**UX implications:**
- fan.html must show REAL data from Supabase, not demo data
- Today strip pulls from artist moments[] table
- Near me pulls from artist shows[] + fan location
- Empty states must be honest: "Nothing new today — last activity from Nova 3 days ago"
- fan.html is a Phase 2 focus but must be designed into the architecture from day one

---

### FREELANCER TYPE: The Music Producer with Credits (Age 22–40)

**Real example:** Joe, 28, producer in Bristol. Has produced tracks for 6 different artists. Some of those artists are on ABLE. He wants his credits on those artist profiles to link back to him. He wants a professional profile to get more bookings.

**What he needs:**
- Credits on artist release cards to link to his profile (one tap → his ABLE profile)
- His own profile: credits list, portfolio audio samples, rate card, booking enquiry
- Peer-confirm: when an artist credits him, he gets a notification → one tap confirm
- His profile auto-populates "Artists I've worked with" from confirmed credits

**UX implications:**
- Credits as discovery is the entire freelancer acquisition mechanic
- Confirmed credit = live link on artist profile. Unconfirmed = plain text.
- Peer-confirm must be ONE TAP from a notification — anything more and compliance drops to zero
- Freelancer profile uses same design system as artist profile, different sections

---

## PART 2 — THE SYSTEM: HOW EVERYTHING CONNECTS

```
START.HTML (Onboarding)
  → Creates profile in localStorage + Supabase
  → Artist gets their ablemusic.co/[handle] page live

ABLE-V7.HTML (Artist Public Profile)  ← primary product surface
  → Fan sees the artist's world
  → Fan signs up → stored in able_fans + Supabase fans table
  → Fan data flows to fan.html Today strip / Following strip
  → Credits on release cards → live links to freelancer.html
  → Artist (owner) sees edit pill → taps any zone to edit in-place
  → Changes save to localStorage + Supabase in real time

ADMIN.HTML (Artist Data Dashboard)
  → Fan list with confirmed/unconfirmed, attribution, location
  → Analytics: clicks, views, sources, fan growth
  → Campaign HQ: set page state, release date, gig mode toggle
  → Broadcasts: send to fan list (Pro tier)
  → Close Circle management
  → NOT a place to edit the page design — that happens on able-v7.html

LANDING.HTML (Marketing Homepage)
  → Converts new artists
  → Includes REAL working demo (not a mockup)
  → Shows what the top card actually looks like with real embeds

FAN.HTML (Fan Dashboard)
  → Following: artists the fan signed up for, with latest activity
  → Today strip: moments from followed artists in last 48h
  → Near me: shows from followed artists near fan's location
  → Discover: suggested artists via credits network
  → Close Circle: supporter access for artists they pay to support

FREELANCER.HTML (Freelancer Profile)
  → Credits (confirmed via peer-confirm) with live artist links
  → Portfolio: audio (SoundCloud/YouTube) + video
  → Rate card + availability
  → Booking enquiry (4 fields, no marketplace signals)
  → Same design system as artist profile, freelancer sections active
```

---

## PART 3 — WHAT EACH PAGE DOES (REVISED FOR FULL VISION)

### able-v7.html — Artist Public Profile

This is the product. Everything else serves it.

**Core purpose:** A fan clicks a link from an artist's Instagram bio. They should feel like they landed somewhere the artist actually built — not a generic service page. Within 3 seconds they should understand who the artist is and what they should do next.

**The top card is everything.** This is what the fan sees first. It must work with:
1. A YouTube video or YouTube Short (full iframe, plays inline without leaving page)
2. A Spotify track or album (native Spotify iframe embed — preserves Spotify's visual character)
3. A SoundCloud track or playlist (native SoundCloud iframe embed)
4. A Bandcamp player (iframe embed)
5. A Vimeo video (iframe embed)
6. Static artwork (artist photo or release artwork, full-bleed)
7. Nothing (just artist name + ambient gradient — this must still look stunning)

**Platform embed realities:**
- YouTube: Full playback, no account required. Autoplay muted on mobile (browser policy). Click to unmute. Portrait/vertical video renders with correct aspect ratio. **Best option for top card.**
- Spotify: Beautiful native embed. Shows track artwork, controls, progress bar. Requires Spotify account for full playback — shows 30-second preview without. This limitation is known and acceptable. **Best for music character.**
- SoundCloud: Full playback, no account required. Supports playlists. Orange waveform player has visual character. **Best for bedroom producers and non-distributed artists.**
- Bandcamp: Embed works but is more complex — album art + tracklist. Best as music section embed, not top card.
- Apple Music: Limited embed, requires subscription. Show as link pill only, no embed.
- TikTok: Cannot embed videos externally. Show as link pill with @handle.
- Instagram Reels: Cannot embed externally. Show as link pill.
- Vimeo: Full embed, high quality. Good for cinematic artists.

**The four campaign states (how the page shifts):**
1. **Profile** (default): Beautiful evergreen page. Artist info, latest music, platform links. No urgency, no countdown. This is the most important state — it must be 10/10 with zero active campaign.
2. **Pre-release**: Countdown timer + pre-save CTA dominant. Email capture framed as "hear it first." Ambient tension in design (slightly darker, more contrast).
3. **Live**: Release dropped. Music front and centre. Streaming CTA primary. Native embed (Spotify/SoundCloud) featured in top card.
4. **Gig** (manual toggle): Tickets front and centre. "I'm playing tonight" tone. "Tonight note" field — artist writes something human. After show end: shifts to "stay close" mode, fan sign-up primary.

**In-page editing — the core requirement:**
The artist sees their page EXACTLY as fans see it. A floating pill (bottom of screen, centred) says "✎ Edit". Tapping any zone opens a bottom sheet for that specific thing. No separate admin page for editing.

Zones and what they edit:
- **Top card zone**: Artist name, tagline, artwork upload, video/embed URL, accent colour
- **Hero CTAs zone**: Primary CTA label + URL, secondary CTA label + URL
- **Platform pills zone**: Add/remove platform links (pre-filled from Spotify import)
- **Fan capture zone**: Enable/disable, customise heading + copy
- **Music section**: Add/edit releases (title, artwork, embed URL, credits)
- **Events section**: Add/edit shows (venue, date, time, ticket URL)
- **Merch section**: URL to shop (Bandcamp, Shopify, etc.) — no native store in v1
- **Snap cards**: CRUD snap cards (text/image/video announcements)
- **Support section**: Enable/disable, set URL (Patreon, Ko-fi, etc.)
- **Bio zone**: Artist bio text
- **Recommendations**: Other artists they recommend

**The edit pill must:**
- Only appear when artist is viewing their own page (owner mode)
- Persist even when scrolling
- Toggle between "Edit mode" (placeholders visible, dashed borders) and "Fan view" (exactly what fans see)
- Auto-save on field change (debounced 800ms)
- Show "Saved" confirmation + timestamp
- NOT open a new page — bottom sheet only

---

### start.html — Onboarding (Rebuilt from Scratch Vision)

**Design principle:** One question at a time. After each answer, they see the preview update. The profile is being built in front of them. By the time they reach the end, they've seen their page come to life.

**The 13-year-old test:** Every question must be answerable without instructions. No jargon. No hints needed for 80% of people.

**The path:**

**ENTRY POINT: What's your link?**
One text field. A single question: "Drop a link to your music, your Spotify, your Linktree — anything."
- If Spotify artist URL → fetch artist data (name, photo, bio, genres, top tracks)
- If SoundCloud URL → fetch track/artist data via oEmbed
- If YouTube channel URL → fetch channel name, avatar, latest video
- If Linktree URL → parse public HTML → extract all links as potential CTAs
- If Bandcamp URL → fetch artist data via oEmbed
- If just a name (text, not URL) → skip import, go to manual entry
- Skip option: "I'll set it up manually →" (small, below field)

**Why this matters:** Most artists will paste their Spotify link or Linktree. Don't make them hunt for a specific URL format. Accept anything and figure it out.

**After import: "Is this you?"**
Show the fetched data as a card: photo, name, genre. Two options: "Yes, that's me →" / "No, try again". Feels like magic — their profile is already 60% filled in.

**Step 1: Name + Colour**
"What do people call you?" (pre-filled from import)
Colour picker: 6 swatches + custom. Preview updates live in phone mockup.
- The phone preview is always visible (desktop: right panel; mobile: toggle). It shows their actual page being built.

**Step 2: What best describes your music?**
Visual genre cards (not a dropdown). Big, tappable, with character examples:
- 🎛 Electronic — Bicep, Fred again.., Four Tet
- 🎤 Hip-hop/Rap — Dave, Little Simz, Central Cee
- 🎸 Indie/Alt — Wet Leg, Sports Team, Yard Act
- 🌸 Pop — Olivia Rodrigo, Charli xcx, Arlo Parks
- 🎻 R&B/Soul — FKA twigs, Sampha, Cleo Sol
- 🪨 Rock/Metal — Fontaines D.C., IDLES, Inhaler
- 🎹 Acoustic/Folk — Phoebe Bridgers, Gregory Alan Isakov
- 🎺 Other (or I don't fit a box)

This automatically sets the vibe/feel and suggests an accent colour. Artist can override.

**Step 3: What's happening right now?**
Four big choice cards. Plain language:
- ✦ "Just building my page" → profile state (default)
- ⏳ "I've got something dropping soon" → pre-release path
- ▶ "I just released something" → live path
- 🎤 "I'm playing a show soon" → shows path

Each card has a one-line consequence: "Your page shows a countdown to your release date."

If they pick "dropping soon" → one more question: "When does it drop?" [date picker]
If they pick "just released" → "What's the streaming link?" [URL field]
If they pick "playing a show" → "Where and when?" [venue + date]
If they pick "just building" → nothing more needed, go to step 4

**Step 4: Your main link (CTA)**
"What do you most want people to do when they visit your page?"
- Listen to my music [auto-suggests Spotify/SoundCloud/YouTube from import]
- Watch my latest video [YouTube link]
- Get tickets to my show [ticket URL]
- Something else [custom label + URL]
- Nothing for now — I'll add it later

This becomes the primary CTA button. No jargon. No "primary CTA" language.

**Step 5 (optional, can skip): Add your other platform links**
"Want to add your other music links? These appear as small buttons on your page."
Show checkboxes for common platforms (pre-filled from import if Linktree was pasted):
- ✓ Spotify [auto-filled]
- ✓ Apple Music [text field]
- ✓ YouTube [auto-filled]
- ○ TikTok [text field]
- ○ Instagram [text field]
- ○ Bandcamp [text field]
- ○ SoundCloud [auto-filled]

"Skip for now →" prominent.

**Step 6: Email (to get back to your page)**
"Where do we send your page link?"
Email field. Magic link. No password.
"Your page is live at ablemusic.co/[slug] — we'll email you the link."
Small text: "Magic link — no password needed."

**Done screen:**
"Your page is live."
Big link: ablemusic.co/[handle]
[Copy link] [Share on Instagram] [Open my page]
"It's already beautiful. Add your full details any time — just tap Edit on your page."

**What the preview phone must show at each step:**
- Step 1 (import): Empty phone → after import: photo + name appears with a pulse animation
- Step 2 (genre/colour): Accent colour changes live, font may shift based on genre
- Step 3 (moment): CTA button changes (Pre-save vs Stream Now vs Get Tickets)
- Step 4 (CTA): Button label updates to what they typed
- Step 5 (platforms): Pills appear one by one with a stagger entrance

**Things that must NOT exist in onboarding:**
- "Campaign state" — call it "What's happening"
- "Hero CTA" — call it "the main button"
- "Slug" — call it "your page link"
- "Profile mode" — call it "just building your page"
- Required fields beyond name + email — everything else skippable
- More than one question per screen
- Any hint that they've done something wrong by not filling something in

---

### landing.html — Marketing Homepage (Rebuilt Vision)

**The core problem:** As a new user you cannot understand what ABLE can do without seeing it work. The current demo is a mockup that doesn't actually play anything. A 13-year-old visiting this page needs to see the real thing.

**The real demo requirements:**
- The phone mockup must contain a REAL YouTube Short or Spotify embed that actually plays
- When you tap the "Stream" state, an actual Spotify iframe loads
- When you tap the "Video" state, an actual YouTube iframe loads and plays
- The demo must show a real artist (even if it's a fictional demo artist with a real embed)
- Buttons to switch states must be large, labelled in plain English, and visually obvious
- The demo should be large enough to actually see — currently too small

**Layout vision for landing.html:**
1. **Hero**: Large headline. Large demo phone (not 280px — at least 360px on desktop). The demo runs on load.
2. **"What ABLE does" section**: 3–4 plain-language explanations with demo clips
3. **"Switch to see it change" interactive section**: Full demo of all 4 campaign states. Each state has a description + the phone updates. Buttons must be obviously interactive.
4. **Social proof**: Real-looking demo artist profiles (with real embeds). "This is what yours could look like."
5. **"Who is this for" section**: 3 artist types with specific scenarios
6. **Pricing**: Simple, honest, no asterisks
7. **FAQ**: Specific questions real artists ask
8. **CTA**: "Your page is free →" — not "Get started"

**The demo phone on landing must:**
- Be big enough to actually see (360px minimum width)
- Use actual iframes for Spotify and YouTube embeds in the relevant states
- Switch states smoothly with CSS transitions
- Show the "Tonight note" in gig state (a real artist-voice message)
- Show a real fan count in the admin state if there's an admin demo
- Be tappable/interactive — artist can try it themselves

**Proof line buttons (currently too small and understated):**
- Must be at least 44px tall
- Must look like buttons, not text links
- Must have a visible active state
- Must be labelled in plain language: "Release dropping soon", "Just released", "Playing tonight", "Just the page"

---

### admin.html — Data Dashboard (Revised Role)

**Editing happens on the profile page.** Admin.html is for data, analytics, and controls that don't make sense in the profile view.

**What admin.html is for:**
1. **Fan list**: Real emails, confirmed vs unconfirmed, source (Instagram/TikTok/direct/etc.), date joined, any shows they've been to, Close Circle status. Export to CSV always.
2. **Campaign HQ**: Set release date, toggle gig mode, view current state. Timeline arc showing where you are in the release cycle.
3. **Analytics**: Fan growth chart, source breakdown (where are fans coming from?), top CTAs clicked, page views over time.
4. **Broadcasts** (Pro tier): Compose and send to fan list. Double opt-in only. Open/click tracking.
5. **Close Circle**: Enable, set price (£3–£12), write intro text, see subscriber count and revenue.
6. **Connections**: Platform integrations, Spotify artist ID, Linktree import (also available here).
7. **Settings**: Slug edit, theme choice, section ordering, account (email, magic link).

**What admin.html is NOT for:**
- Editing the bio, CTA text, snap card content, release details, events → all done on the artist profile via the edit pill
- Visual design choices (accent colour, vibe/feel) → done on the profile page

**Admin tone:** Warm, personal, data-forward. Not cold SaaS dashboard.
Greeting: "Good to see you, [Name]." (warm, one beat, done)
Fan list: "47 people on your list." Not "47 records."

---

### fan.html — Fan Dashboard (Phase 2 Architecture)

**Core design principle:** The fan doesn't know what ABLE is. They signed up via an artist's page. fan.html is not an ABLE product — it is a place to stay close to artists they care about.

**Section order:**
1. **Greeting**: "Good morning." + date. Warm, not branded.
2. **Today strip**: Activity from followed artists in last 48 hours. "Nova dropped something today." "Priya is playing tonight in London." Empty state: "All quiet today — last activity from Dan 3 days ago." Never pads with filler.
3. **Following**: Horizontal scroll of artist cards. Latest release, next show, unread.
4. **Near me**: Shows from followed artists in the fan's city. If no location: "Tell us your city →". If no shows: honest empty state.
5. **Discover** (when we have enough artists): Connected artists, emerging, new to ABLE.
6. **Close Circle**: For artists where fan is a paying supporter.

**Data that flows from artist profile to fan.html:**
- Artist adds moment (show, release, milestone) → fans see it in Today strip
- Artist activates gig mode → fans following that artist see "playing tonight" in their Today strip
- Artist sets pre-release date → fans see countdown in Following strip
- Artist sends Close Circle dispatch → appears as priority item in Today strip for supporters only
- Fan signs up on an artist's profile → follows that artist in fan.html

---

## PART 4 — PLATFORM INTEGRATION MATRIX

For every platform an artist might use, ABLE has a clear answer. This must be internalized before building anything in the music section.

| Platform | Embed type | Embed quality | Requires account to play | Best use |
|---|---|---|---|---|
| YouTube | iframe (any video ID) | Excellent | No | Top card, Music & Video section |
| YouTube Shorts | iframe (same as YouTube) | Excellent (portrait crop) | No | Top card |
| Spotify track | iframe (open.spotify.com/embed) | Beautiful | 30s preview only without account | Top card, Release card |
| Spotify album | iframe | Beautiful | 30s per track without account | Music section |
| Spotify playlist | iframe | Beautiful | 30s per track without account | Music section |
| SoundCloud track | iframe | Good (orange waveform) | No (public tracks) | Top card, Music section |
| SoundCloud playlist | iframe (full set widget) | Good | No | Music section |
| Bandcamp track | iframe | Good | No | Music section |
| Bandcamp album | iframe | Good (full tracklist) | No | Music section |
| Vimeo | iframe | Excellent (clean) | No | Top card for cinematic artists |
| Apple Music | iframe (very limited) | Poor | Requires subscription | Link pill only |
| TikTok | CANNOT embed | N/A | N/A | Link pill with @handle |
| Instagram | CANNOT embed | N/A | N/A | Link pill |
| Beehiiv | CANNOT embed | N/A | N/A | Link pill |

**The ABLE answer to "can fans listen/watch without leaving?":**
- YouTube/YouTube Shorts: YES — full playback in page
- Spotify: YES but with 30-second limit if they don't have Spotify. Acceptable tradeoff because Spotify users (the majority) get full playback and the embed looks premium.
- SoundCloud: YES — full playback for public tracks
- Bandcamp: YES — full playback
- TikTok/Instagram: NO — link only. Never pretend otherwise.

**Native vs link-out, the decision rule:**
Show the native embed when you can. It adds character, proves the music is real, and keeps the fan on the page. Only show a link when embedding is technically impossible or the embed is too ugly/clunky.

**SoundCloud playlist handling:**
SoundCloud's full widget supports playlists. When an artist pastes a SoundCloud playlist URL:
- Detect it's a playlist (URL contains /sets/)
- Use SoundCloud Widget API: `https://w.soundcloud.com/player/?url=[encoded-url]&color=[accent]&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`
- Visual=true shows the full visual player with waveform
- This gives bedroom producers a full album/collection experience

**Top card embed specifics:**

YouTube (standard landscape):
```html
<iframe src="https://www.youtube.com/embed/[VIDEO_ID]?autoplay=0&rel=0&modestbranding=1"
  width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
```

YouTube Shorts (portrait/vertical):
- Same embed URL, but aspect ratio should be 9:16 or at least taller than wide
- Hero section should detect short format and render portrait
- Crop/contain decision: show with letter-box bars OR fill width and cut top/bottom (crop). Crop looks better in most cases.

Spotify track:
```html
<iframe src="https://open.spotify.com/embed/track/[TRACK_ID]?utm_source=generator&theme=0"
  width="100%" height="352" frameborder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"></iframe>
```
Height 352 = full Spotify player with artwork + controls. Height 152 = compact version.

SoundCloud:
```html
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay"
  src="https://w.soundcloud.com/player/?url=[ENCODED_URL]&color=%23[accent]&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"></iframe>
```

---

## PART 5 — WHAT GETS REBUILT vs EXTENDED

### Complete rebuilds (start fresh, don't port):

**start.html — REBUILD**
The current 3-step wizard is too rigid. The full vision requires:
- A universal link detector as the entry point (paste ANYTHING)
- Linktree parser
- Live phone preview that updates with every answer
- Completely different step structure
- Different tone/copy throughout
Start with the spec in Part 3. Discard the current start.html structure.

**landing.html hero demo — REBUILD**
The current demo phone is a CSS mockup with fake Spotify/YouTube UI. It needs to be a real interactive demo with actual iframes. The layout, scale, and button design all need to change.
The prose copy and section structure below the hero can be adapted but the hero + demo section is a rebuild.

**The music section in able-v7.html — MAJOR REWRITE**
Current: "Music" section with release cards.
Vision: "Music & Video" section where releases can be:
- Audio-first (Spotify/SoundCloud/Bandcamp embed)
- Video-first (YouTube/Vimeo embed)
- Both (e.g., YouTube video + Spotify streaming link for same release)
A release card can contain multiple embed types. The artist picks which shows at the top.

### Keep and extend:

**able-v7.html core structure** — Keep the design system (tokens, themes, vibes). Keep the hero section layout. Keep campaign state logic. Keep the edit pill + bottom sheet pattern. Extend zones, improve top card embed system, add Music & Video, add native embed rendering.

**admin.html** — Keep the page structure, data views, fan list. Extend analytics. Remove editing UI that should be on the artist profile. Keep campaign HQ.

**The design system** (tokens, four themes, seven vibes, spring easing) — Keep entirely. It's the most mature part of the codebase.

**Netlify functions** (oembed-proxy, ai-copy, fan-confirmation, spotify-import) — Keep all. Extend spotify-import to also handle SoundCloud oEmbed and YouTube oEmbed.

---

## PART 6 — THE LINKTREE IMPORTER

This is the single most important acquisition feature. An artist who already uses Linktree has a structured link list. ABLE can parse it without any API.

**How it works:**
1. Artist pastes `https://linktr.ee/artistname` in onboarding (or in admin Connections page)
2. ABLE fetches the public Linktree page via a Netlify function (avoids CORS)
3. Parse the HTML to extract: all link titles + URLs
4. Show the extracted links as checkboxes: "These links were found on your Linktree:"
   ```
   ✓ Spotify — open.spotify.com/artist/...
   ✓ Apple Music — music.apple.com/...
   ✓ YouTube — youtube.com/...
   ✓ "Stream my EP" — smarturl.it/...
   ○ "Join my list" — mailchimp.com/... (skip — ABLE does this natively)
   ```
5. Artist confirms which to import
6. Links map to ABLE's platform pills or CTAs automatically:
   - Spotify link → Spotify pill
   - Apple Music → Apple pill
   - YouTube → YouTube pill
   - Unrecognised smart URLs → offer as CTA buttons with original label

**Netlify function: `/.netlify/functions/linktree-import`**
Input: `GET ?handle=artistname`
Process: Fetch `https://linktr.ee/[handle]`, parse HTML for `<a>` tags in the links section
Output: Array of `{title, url, platform}` objects

**Important:** Linktree pages are public HTML. This is not an API call — it's reading public content. Legal. No terms violation.

---

## PART 7 — ONBOARDING ONE-THING-AT-A-TIME PHILOSOPHY

**The principle:** Every screen has exactly one input. The artist sees their profile change in the preview after answering. The journey can be longer — that's fine. What matters is that they feel momentum.

**Mobile first:** This entire onboarding will happen on a phone. The artist is scrolling Instagram, sees someone mention ABLE, clicks the link. They're on mobile. One question at a time. Keyboard covers 40% of the screen. Every interaction must work with one thumb.

**The Spotify "I don't know how to find my link" problem:**
The user explicitly said: "when before I was asked to add my spotify link I didn't know where to find it in spotify."

Solution:
- Label the field: "Your artist link (Spotify, SoundCloud, YouTube — or paste your Linktree)"
- Inline helper text: "Not sure? [How to find your Spotify link ↓]"
- On tap: expands to show 3 steps with screenshots:
  1. Open Spotify → search your name
  2. Open your artist page → tap the three dots (•••)
  3. Tap "Share" → "Copy link to artist"
- Same helper for SoundCloud: "Open your profile → copy the URL from your browser"
- Same for YouTube: "Go to your channel → copy the URL"

This is NOT a tutorial modal. It's an inline accordion below the field. 3 taps to find it.

---

## PART 8 — THE TOP CARD — DETAILED SPEC

The top card is the first thing a fan sees. It must be designed to stop the scroll.

**States:**
1. **Video** (YouTube or YouTube Short): Full-bleed iframe. For landscape: 16:9 crop at top of card. For vertical/Shorts: 9:16 or container fits content. Poster image loads first (thumbnail), play button overlay. User taps to load iframe (saves bandwidth).
2. **Music embed** (Spotify/SoundCloud/Bandcamp): Embed sits within the hero area, blending with the artist's colour theme. Accent colour passed to SoundCloud embed. Spotify embed uses dark or light theme matching artist's profile theme.
3. **Artwork** (static image): Full-bleed photo or release artwork. Ambient glow extracts dominant colour from bottom pixels. Artist name + tagline overlaid with text shadow.
4. **Artist initials** (fallback if no artwork): Large initials in accent colour on gradient background. Still looks intentional and premium.

**The "Tonight note" (gig mode):**
When gig mode is active, a text field appears above the main CTA: "I've been looking forward to tonight for weeks. The room is small. It's going to be good." — written by the artist. Maximum 140 characters. This is not generated. This is the artist's voice. It sits above the ticket button like a handwritten note. This converts better than any marketing copy because it's real.

**Top card editing (on-profile):**
Tap the top card area → bottom sheet opens:
- "What's at the top of your page?"
  - [Video / Music / Photo] tabs
  - Video tab: paste YouTube/Vimeo URL. Helper: "Works with YouTube videos and Shorts."
  - Music tab: paste Spotify/SoundCloud/Bandcamp URL. Shows preview of what it'll look like.
  - Photo tab: upload or URL. Artwork from Spotify auto-import pre-filled here.

---

## PART 9 — MUSIC & VIDEO SECTION

**Renamed from "Music" to "Music & Video"** — this acknowledges that YouTube artists exist.

**Release card structure:**
Each release card has:
- Artwork (square, from import or upload)
- Title + artist name
- Type badge: SINGLE / EP / ALBUM / VIDEO / LIVE / COVER
- Year
- Credits: Produced by [Name ↗] · Mixed by [Name ↗] · Mastered by [Name ↗]
  - Names with ABLE handles = live links to freelancer profiles
  - Names without ABLE handles = plain text
- Platform links: row of small pills (Spotify, Apple Music, YouTube, etc.)
- **Primary embed**: The featured way to engage with this release:
  - Option A: Spotify embed (full player with artwork + controls)
  - Option B: YouTube embed (video player)
  - Option C: SoundCloud embed (waveform player)
  - Option D: Bandcamp embed
  - Option E: No embed — just the platform links
- Expand/collapse: collapsed shows artwork + title + platform links. Tap to expand embed.

**SoundCloud full playlist:**
If artist has a SoundCloud profile, they can link the entire playlist/profile. This renders as the full SoundCloud visual widget — scrollable tracklist, waveform, play all. Particularly important for Jaylen (bedroom producer user story) who has his whole catalogue there.

**The music section in edit mode:**
"Add music" tap → bottom sheet:
- "What are you adding?"
  - A track/EP/album/video
  - My whole [SoundCloud profile / YouTube channel]
- Paste the URL
- We fetch the title, artwork, type automatically
- Confirm → appears on page

---

## PART 10 — FAN CAPTURE (DETAILED)

**Copy law:** Fan capture must sound like the artist wrote it. The heading and subtext are editable by the artist (guardrailed: 40 char max heading, 80 char max subtext).

**Default copy per campaign state:**
- Profile: "Stay close." / "Just [Artist Name]. No spam." / CTA: "I'm in"
- Pre-release: "Hear it first." / "Sign up — I'll tell you when [Release] drops." / CTA: "Count me in"
- Live: "Don't miss what's next." / "You just heard [Release]. Stay for what comes after." / CTA: "I'm in"
- Gig: "Remember tonight." / "Sign up — I'll send you the next date." / CTA: "I'm in"

**Post-sign-up:** Confetti + echo animation. Text shifts to "You're in. Check your inbox." No platform branding. A confirmation email goes from the artist (via Resend) in their voice.

**Fan capture is OFF by default.** Artists must activate it. Reason: some artists (Type 7: "just wants a pretty page") don't want to manage a list yet. Don't force it on them. When it's off, the zone shows a placeholder in edit mode: "Want to start building your list? [Enable fan sign-up]"

---

## PART 11 — THE "JUST A PRETTY PAGE" DEFAULT

This is critical. The most important state in ABLE is not pre-release or gig. It's "just existing."

An artist with:
- Name ✓
- Photo/artwork ✓
- 2–3 platform links ✓
- Bio (2 sentences) ✓

…should have a page that looks genuinely stunning. Not "fill in more to unlock the potential." Stunning. Now.

The placeholder system (from the placeholder-first UX spec) ensures this: every section ships pre-populated with demo content that the artist swaps out. They never see blank sections. They see the vision of what it can be.

**The evergreen profile mode checklist (must be 10/10):**
- [ ] Artist name reads beautifully with display font (Barlow Condensed or vibe-selected font)
- [ ] Top card with just artwork looks premium (ambient glow, smooth gradient, initials fallback)
- [ ] Platform pills have micro-entrance animation (wave, 50ms stagger)
- [ ] Bio section exists even without bio text (shows "Something's being made here" placeholder, owner-only)
- [ ] Music section shows placeholder release cards (owner-only, dashed border, "Add your music" CTA)
- [ ] Snap cards show placeholder card strip (owner-only)
- [ ] Events section shows placeholder with "Nothing booked yet. Sign up — you'll hear about dates first." (FAN-visible empty state, not a blank)
- [ ] Support section is hidden by default (only shows when artist has set up a support option)
- [ ] Fan capture: off by default, placeholder in edit mode

---

## PART 12 — BUILD ORDER (HIGHEST IMPACT FIRST)

This is the sequence that gets maximum value fastest.

### Sprint 1 — The Foundation (3–4 sessions)
Priority: Every new artist who visits can build a real page in under 3 minutes.

1. **Rebuild start.html** — Universal link detector (entry point), Linktree importer (Netlify function), one-question-per-screen structure, live phone preview that updates, moment cards (plain language), platform link import step, Spotify-help inline accordion
2. **Real embeds in able-v7.html top card** — YouTube (landscape + Shorts), Spotify, SoundCloud, with lazy-load poster + tap-to-play pattern. Plus the "detect vertical video" logic for Shorts.
3. **Music & Video section** — Rename, add YouTube embed as primary option, SoundCloud full playlist support, release card with credits (live link if ableHandle exists)
4. **In-page editing coverage audit** — Ensure ALL zones are covered by the edit pill bottom sheet system. Top card embed URL editable. Platform links editable inline.

### Sprint 2 — The Demo & Acquisition (1–2 sessions)
Priority: New artists who land on landing.html understand what ABLE is and sign up.

5. **Rebuild landing.html hero + demo** — Real iframes in demo phone, larger demo component, plain-English proof buttons, interactive state switching
6. **Linktree importer Netlify function** — Available in onboarding AND admin Connections page

### Sprint 3 — Data & Auth (1–2 sessions)
Priority: Fan data reaches Supabase. Artists can trust their list is real.

7. **Supabase auth (magic link)** — Artists own their data, not just localStorage
8. **Fan confirmation email** — Double opt-in, in artist voice (already mostly built)
9. **admin.html data views** — Fan list with real Supabase data, confirmed vs unconfirmed, source attribution

### Sprint 4 — Gig Mode V8 (1 session)
10. **Tonight note field** — Free text, artist voice, above ticket CTA
11. **Post-show state** — Auto-shifts after show-end time to fan capture primary
12. **"Going tonight" counter** — Lightweight social signal

### Sprint 5 — Close Circle (2 sessions)
13. **Stripe subscription wiring** — Fan join flow, payment, entitlements
14. **Close Circle display on artist profile** — Join prompt, supporter count

### Sprint 6 — Fan Dashboard Real Data (1–2 sessions)
15. **fan.html with Supabase data** — Real Today strip, real Following, Near me with show data

---

## PART 13 — COPY DECISIONS LOG

Every copy decision that could go wrong is listed here.

| Surface | Current | Correct | Reason |
|---|---|---|---|
| Fan sign-up CTA | "Stay close." | "Stay close." ✓ | First person, honest |
| Fan sign-up sub | "Just [Name]. No spam." | ✓ | Trust line — keep |
| Profile state label | "Profile" | "Just existing" (admin) / hidden from fan | Jargon-free in admin |
| Pre-release label | "Pre-release" | "Something's coming" (admin) | Artist-voice |
| Gig mode toggle | "Gig mode" | "I'm playing tonight" | Direct |
| Upgrade prompt | "Unlock email broadcasts" | "Message the 200 people who asked to hear from you" | Specific value |
| Admin greeting | "Dashboard" | "Good to see you, [Name]." | Warm, one beat |
| Fan count | "47 records" | "47 people on your list" | Human |
| Edit pill | "Edit mode" | "✎ Edit" | Simple, obvious |
| Save confirmation | "Saved successfully" | "Saved." | No padding |
| Close Circle | "Become a supporter" | "Stay closer." / "£5 a month. You can leave whenever." | Honest, not salesy |
| Fan capture (gig) | "Sign up for updates" | "Remember tonight. I'll send you the next date." | Specific moment |
| Empty fan list | "No fans yet" | "Nobody yet. When they sign up, you'll see them here." | Honest, encouraging |
| Broadcasts (locked) | "Upgrade to access broadcasts" | "Message [count] people directly — available on Artist Pro" | Specific, honest |

---

## PART 14 — KNOWN TECHNICAL DECISIONS

These are resolved. Don't re-open them during a build session.

| Decision | Resolved as |
|---|---|
| Framework | No framework. Vanilla HTML/CSS/JS. Single files per page. No bundler. |
| Backend | Supabase (PostgreSQL + Auth + Storage). Netlify serverless functions. |
| Email | Resend API via Netlify function |
| Payments | Stripe Connect (Phase 2) |
| AI copy | Claude Haiku (quick copy) + Sonnet (bio writing). Netlify function. |
| Imports | All external API calls via Netlify functions (CORS + key security) |
| oEmbed | YouTube: direct. Spotify/SoundCloud/Vimeo: via `/.netlify/functions/oembed-proxy` |
| Linktree parse | `/.netlify/functions/linktree-import` — server-side HTML fetch + parse |
| Auth | Supabase magic link. No password. No Google OAuth. |
| localStorage keys | Never rename. Map 1:1 to Supabase rows. |
| File size | Hard limit: 340kB gzipped per page |
| Performance | LCP < 2.5s, INP < 200ms, CLS < 0.10 |
| Themes | 4 only: Dark / Light / Glass / Contrast. No others. |
| Vibes | 7 only (table in V8_BUILD_AUTHORITY.md §3.1). Not extendable in v8. |

---

## PART 15 — WHAT THIS MUST FEEL LIKE

Not a SaaS product. Not a dashboard. Not a marketing tool.

It must feel like the artist made it themselves. Like ABLE just handed them the keys.

**For the artist building their page:**
The onboarding should feel like being asked good questions by a friend who happens to know design. Not filling in a form. Not configuring software.

**For the fan visiting the page:**
They should forget they're on ABLE. They should feel like they're on the artist's thing. The ABLE logo appears in the footer ("Made with ABLE") but it's not in their face. The page IS the artist.

**For the artist checking their admin:**
The fan list should feel like a gift. "Here are 47 people who genuinely asked to hear from you. Not your Instagram followers who scroll past. These 47 asked." That shift in framing changes how an artist thinks about their audience.

---

---

## PART 16 — CORRECTIONS FROM RESEARCH PASS 2

These are things the first draft got wrong or missed. These override anything earlier.

**Events source: Ticketmaster, not Bandsintown.**
Bandsintown requires per-artist API keys — there is no platform-wide key. Zero-friction auto-population of shows uses the Ticketmaster Discovery API:
- Free, single platform-wide key, 5,000 calls/day
- Search by artist name string (no Spotify ID needed)
- Returns: event date, venue, city, ticket URL, on-sale status
- Covers ~80% of ABLE's UK independent artist market (200–2,000 capacity venues)
- Bandsintown is offered as opt-in for artists who already have Bandsintown for Artists accounts
The spec's statement "Bandsintown" should everywhere read "Ticketmaster Discovery API as primary"

**Spotify monthly listeners: Not in any public API.**
Do not display Spotify monthly listeners anywhere on any surface. It is not returned by any Spotify endpoint, public or via Client Credentials. The correct honest metric is Last.fm 30-day unique listeners (label correctly as "Last.fm listeners" not "monthly listeners"). Show only in artist dashboard, not on public fan-facing profile.

**The "Made with ABLE" footer is a viral loop mechanic:**
- Free tier: footer visible. Every fan who visits a free artist's page sees "Made with ABLE" → potential new artist sign-ups.
- Artist tier+: footer removed. Artists paid to own their space completely.
This is non-negotiable. Do not remove from free tier profiles.

**GDPR double opt-in is non-negotiable:**
Fan capture fires optimistic confetti immediately (they feel confirmed). In background: Supabase fan record created with `double_opted_in: false`. Resend sends confirmation email. Fan clicks link → `double_opted_in: true` + `opted_in_at` timestamp. Unconfirmed fans soft-deleted at 30 days. This is not a "nice to have" — it is a legal requirement for any fans in the UK/EU.

**The Conduit Principle (from PRODUCT_TRUTH.md) applies to every surface:**
"If content can play inside, it must." This means:
- Spotify tracks → iframe embed, not "Stream on Spotify" link
- YouTube videos → iframe embed, not "Watch on YouTube" link
- Events → full-bleed venue cards with time/location, not plain text
- The copy must reflect this: "Play this" not "Stream on Spotify"
- ABLE is not a link aggregator. Links are the fallback, not the default.

**Page structure order is non-negotiable (from V6_BUILD_AUTHORITY.md §6.1):**
Status bar → Hero → Bio strip → Hero CTAs → Quick Action pills → Fan capture (screenful 3, NOT above fold) → Listen/Music → Shows → Snap cards → Merch → Support → Credits → Recommendations → Footer → Bottom tab bar (fixed)
The fan capture module is specifically NOT above the fold. It appears after the artist has established who they are.

**17 Phase 1 micro-interactions are hard requirements (from V6_BUILD_AUTHORITY.md §7):**
These ship with every version of the artist profile:
1. Scale-down on press (transform: scale(0.97))
2. Tab indicator spring bounce
3. Hero name reveal (400ms decel)
4. Staggered card bloom (IntersectionObserver, 6-item cap)
5. Skeleton shimmer (unison shimmer, no stagger)
6. Email focus glow (accent box-shadow)
7. Submit flow: spinner → checkmark → confetti (40 particles) → success message
8. Error shake (translateX oscillation) + border red
9. Campaign state crossfade (150ms out / 250ms in)
10. Live pulsing dot (gig state, scale 1→1.4)
11. Scroll-to-top on re-tap active tab
12. Lazy image blur-up
13. Panel slide-up (spring, 350ms entry)
14. Panel exit (accel, 250ms — faster out than in)
15. Tab bar hide/show on scroll
16. Email paste flash (rgba accent 0.1, 400ms fade)
17. Copy link flash ("Copied!" 2s)

**Animation rule (hard):** Only animate `opacity` and `transform`. Never animate box-shadow, width, height, filter, backdrop-filter, or background-color directly in a loop. For glow effects: animate `::after` opacity containing the shadow. This is a performance requirement, not a suggestion.

**Free text for display fonts (r-mult system):**
Each vibe has an `r-mult` value. The border radius of cards in that vibe = `--r-md × r-mult`. Electronic/Rock get smaller radii (industrial, hard edges). R&B/Folk get larger (softer, rounder). This is computed in JS via `applyDerivedTokens()`. Do not hardcode border-radius values in theme CSS.

---

## PART 17 — THE EMBEDDING TECHNICAL TRUTH

This section contains the actual embed code that works. Use these exactly.

**YouTube (landscape video):**
```html
<iframe
  src="https://www.youtube.com/embed/[VIDEO_ID]?autoplay=0&rel=0&modestbranding=1&playsinline=1"
  width="100%" height="100%"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy">
</iframe>
```
Aspect ratio container: padding-bottom: 56.25% (16:9)

**YouTube Shorts (portrait/vertical):**
Same embed URL. But aspect ratio container: padding-bottom: 177.78% (9:16).
The artist profile top card in Shorts mode renders full-width at 9:16. On a 375px phone, that's about 667px tall — which is fine because it IS a short-form video meant to fill the screen.
Detect Shorts from URL: `/shorts/` in the URL path. Extract video ID after `/shorts/`.

**Spotify track (full player):**
```html
<iframe
  src="https://open.spotify.com/embed/track/[TRACK_ID]?utm_source=generator&theme=0"
  width="100%" height="352"
  frameborder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy">
</iframe>
```
`theme=0` = dark player (matches most ABLE themes). `theme=1` = light.
Height 352 = full player with artwork. Height 152 = compact version.
Extract track ID: `open.spotify.com/track/[ID]` → `[ID]`

**Spotify album:**
```html
<iframe
  src="https://open.spotify.com/embed/album/[ALBUM_ID]?utm_source=generator&theme=0"
  width="100%" height="352"
  ...>
</iframe>
```

**SoundCloud (visual player, best for top card):**
```html
<iframe
  width="100%" height="300"
  scrolling="no" frameborder="no"
  allow="autoplay"
  src="https://w.soundcloud.com/player/?url=[ENCODED_URL]&color=%23[ACCENT_HEX_NO_HASH]&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true">
</iframe>
```
`visual=true` shows the full waveform visual. Height 300 for track, height 450 for playlist.
SoundCloud playlist URL contains `/sets/`. Detect and use appropriate height.
Pass artist's accent colour (without #) as `color` param.

**Bandcamp track:**
```html
<iframe
  style="border: 0; width: 100%; height: 120px;"
  src="https://bandcamp.com/EmbeddedPlayer/track=[TRACK_ID]/size=large/bgcol=333333/linkcol=[ACCENT_HEX_NO_HASH]/tracklist=false/artwork=small/transparent=true/"
  seamless>
</iframe>
```
Bandcamp album: use `album=[ALBUM_ID]` and height 340+.
Get track/album ID from Bandcamp page source (data-item-id attribute) — needs server-side fetch via Netlify function.

**CSP requirements (already in able-v7.html):**
```
frame-src https://open.spotify.com https://w.soundcloud.com https://www.youtube.com https://bandcamp.com https://embed.music.apple.com https://player.vimeo.com;
```

**Lazy-load pattern for all embeds:**
1. Show poster image (thumbnail from oEmbed) with play button overlay
2. User taps → remove poster, inject `<iframe>` src
3. This prevents loading 300kB+ iframe JS on page load
The V8 artist profile uses this for the top card video/embed.

---

## PART 18 — QUESTIONS THIS SPEC DOES NOT YET ANSWER

These are unresolved decisions that need answering before building the affected features:

1. **Should "Music & Video" be one section or two?**
   Argument for one: a YouTube video IS the music for many artists. Separating them is artificial.
   Argument for two: fans navigating want "music" to mean audio, "video" to mean visual.
   Suggested resolution: One section, "Music & Video". Each release has a type badge: TRACK / VIDEO / EP / ALBUM / LIVE / COVER / REMIX. Artists can choose which is the "featured" embed per release.

2. **Does the fan capture email field appear within the top card zone, or below it as a separate section?**
   V6 authority says: after hero, bio, pills (screenful 3). Not above fold.
   But for gig mode specifically ("remember tonight"): should it float higher?
   Suggested resolution: Stays at screenful 3 always. Gig mode copy changes, position does not.

3. **Should the onboarding live phone preview be a simplified mockup or a live able-v7.html iframe?**
   Mockup: faster, controllable, smaller file size.
   Live iframe: truly accurate to the final result, higher wow factor.
   Suggested resolution: Start with enhanced mockup (not current tiny mockup — proper 360px preview). Live iframe is Phase 2 when performance is confirmed.

4. **How does an artist edit their page on mobile when the edit pill and bottom sheet are both native mobile UI?**
   This is the primary flow. Desktop is secondary.
   The bottom sheet needs: large tap targets (52px min), clear section labels, auto-focus on first field, keyboard dismiss on scroll.

5. **What happens to admin.html editing panels once all editing moves to the profile page?**
   Admin.html still needs: campaign HQ (release date setter, state override), Connections (platform links, Linktree import), Settings (slug, theme, section order). These cannot all move to the profile edit pill cleanly.
   Suggested resolution: The admin dashboard retains these "structural" controls. The profile edit pill handles "content" edits (bio, CTAs, music, snap cards, events). Clear separation.

---

*End of master spec. Version this document as you make decisions. When in doubt, ask: "Does this make the relationship between artist and fan more direct, or does it put something in between them?" If something stands between them, don't build it.*
