# Artist Tools — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the admin screen at 23:47 after a show — 31 new fans, list sorted by time, "during the set" badge on 14 of them — and the artist understands, without reading any instructions, that their page was working while they were on stage.

---

## Moment 1: The Post-Show Fan List

**What it is:** It is 23:47. The artist played a show tonight — gig mode was on from 17:00. They open admin.html on their phone in the green room, still coming down from the set. They tap Fans. 31 new fans. The list is sorted by time. Fans who signed up between 20:45 and 22:10 have a small badge: "during the set." The source shows "Direct link" for most of them — they typed the URL in, they didn't come from Instagram. The artist reads the list. They know some of these people — they were in the crowd.

**Why it's 20/10:** This is the exact moment that proves ABLE. Not the platform's marketing copy, not a comparison table — the list on the screen at 23:47. The "during the set" badge is the detail that makes it visceral. The artist did not check their phone once while performing. The page did the work. The list is proof.

**Exact implementation:**

The "during the set" badge logic:
- Read `able_gig_expires` from localStorage — this stores the Unix timestamp when gig mode was toggled on and its 24-hour expiry
- Derive `gigStartTime`: the timestamp when the `able_gig_expires` key was last set
- Derive `doorsTime`: stored in the featured show object (`able_shows[].doorsTime`)
- Badge condition: fan sign-up timestamp falls between `doorsTime` and `doorsTime + 3 hours` (approximate set window)
- Badge copy: "during the set" — small, muted, amber text. Not a pill. Not an icon. Text.

```javascript
function getDuringSetBadge(fanTs, featuredShow) {
  if (!featuredShow || !featuredShow.doorsTime) return null;
  const doors = new Date(featuredShow.date + 'T' + featuredShow.doorsTime).getTime();
  const setWindow = 3 * 60 * 60 * 1000; // 3 hours
  if (fanTs >= doors && fanTs <= doors + setWindow) return 'during the set';
  return null;
}
```

Fan list sort order at 23:47: newest first, always. The most recent fans are at the top. The artist sees the live momentum of the night in chronological reverse — the last person who signed up was 6 minutes ago. The first person was 7 hours ago.

Source badge display in the fan list:
- "Direct link" — typed the URL or used a QR code at the venue
- "Instagram" — came from the bio link
- "TikTok" — from a TikTok post
- The source breakdown bar at the top of the fan list (already built) shows, at 23:47: 22 Direct link, 7 Instagram, 2 Unknown. The artist sees: the venue worked better than Instagram tonight.

The greeting when admin.html is opened the morning after a gig, if gig mode has just expired:
```
"Good morning, [Name]. Last night: [N] new fans."
```
No sub-copy. No action prompt. Just the number. The artist deserved to wake up to that.

---

## Moment 2: The Snap Card That Becomes the First Communication

**What it is:** A fan signs up to an artist's ABLE page. Three days later, the artist publishes a snap card: a short text card — "Recording this week. Something's coming." No date. No title. No pressure. The fan opens admin.html (from the "new content on [Artist's] page" notification — Phase 2), reads the card, and for the first time since signing up, receives a communication from an artist they chose to follow. It costs the artist 30 seconds to write and publish. The fan's relationship with that artist is now active, not passive.

**Why it's 20/10:** The snap card is the lightest-weight communication in ABLE. No broadcast setup, no subject line, no list size consideration. Just a short text published to the artist's profile. For the fan, it is the first proof that the sign-up was worth it. For the artist, it is the first time they understand that their page is a channel — not a static bio page.

**Exact implementation:**

Snap card publish friction is the design constraint. The path from "I want to say something" to "published" must be under 4 taps:

```
admin.html → Snap cards → + Add card → [text field focused, keyboard open]
Type: "Recording this week. Something's coming."
Tap: Publish
Result: card appears on able-v7.html immediately, localStoraged, visible to fans
```

The "add card" UI spec:
- On mobile: tapping "+ Add snap card" opens a bottom sheet with one field (text), one type selector (text / link / embed), and a large "Publish" button. No title field required for text type. No description. Just the text.
- Character limit: 280 characters for text cards (mirrors a natural short-form register)
- Auto-focus: keyboard opens immediately when the bottom sheet opens
- Publish button: enabled as soon as the text field has any content
- Confirmation: no modal. Inline toast: "Published." — the card appears in the list above the input.

The empty state copy for Snap Cards that seeds the behaviour:
```
"Your snap cards live here. Think of them as posts that don't disappear — your fans see the latest ones when they visit your page."
```

This is not a feature explanation. It is a mental model shift. Posts that don't disappear. That framing changes how the artist uses the tool — not as announcements, but as a living layer of their profile.

The fan notification flow (Phase 2, n8n + Resend):
- Trigger: new snap card published (INSERT on `snap_cards` table)
- Wait: 24 hours (do not notify immediately — batch if artist publishes multiple cards in a day)
- Email to fans on the list: "New from [Artist]" with the card content previewed in the email body
- This is the communication that justifies the sign-up

---

## Moment 3: Shows List Auto-Activating Gig Mode

**What it is:** An artist added their show three weeks ago. At 16:00 on the day of the show — one hour before their listed doors time of 17:00 — gig mode activates automatically. They didn't have to open admin.html. They didn't have to remember. Their page has already switched: ticket link front and centre, "On tonight" tag, the countdown bar showing real-time minutes until doors. The artist discovers this at 17:30 when a fan texts them "just got my ticket from your ABLE page."

**Why it's 20/10:** Automation that works at the exact moment it matters. The artist's attention is on the show — soundcheck, load-in, the hundred things that happen before a performance. ABLE's job is to handle the page while the artist handles the show. This is that job done without being asked.

**Exact implementation:**

The auto-activate check — runs on every admin.html load AND as a browser-side interval when the page is open:

```javascript
function checkAutoGigMode() {
  const shows = JSON.parse(localStorage.getItem('able_shows') || '[]');
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');

  // Skip if gig mode is already on
  if (profile.stateOverride === 'gig') return;

  const now = Date.now();
  const TODAY = new Date().toISOString().split('T')[0];

  const tonightShow = shows.find(show => {
    if (show.date !== TODAY) return false;
    if (!show.doorsTime) return false;
    const doors = new Date(show.date + 'T' + show.doorsTime).getTime();
    const oneHourBefore = doors - (60 * 60 * 1000);
    return now >= oneHourBefore;
  });

  if (tonightShow && !profile.autoGigActivated?.includes(tonightShow.date)) {
    // Activate gig mode
    profile.stateOverride = 'gig';

    // Record auto-activation to avoid re-triggering
    profile.autoGigActivated = [...(profile.autoGigActivated || []), tonightShow.date];

    // Set expiry: doors + 6 hours
    const doors = new Date(tonightShow.date + 'T' + tonightShow.doorsTime).getTime();
    localStorage.setItem('able_gig_expires', String(doors + 6 * 60 * 60 * 1000));
    localStorage.setItem('able_v3_profile', JSON.stringify(profile));

    // Toast notification (if admin is open)
    showToast('Gig mode on. Your page has updated for tonight.');
  }
}

// Run on load and every 5 minutes
checkAutoGigMode();
setInterval(checkAutoGigMode, 5 * 60 * 1000);
```

The toast that fires when auto-activation happens while admin.html is open:
```
"Gig mode on. Your page has updated for tonight."
```
Not "Gig mode activated" (robotic). Not "Your page is now in gig mode" (wordy). Warm and specific.

The admin home "next moment" line that surfaces the upcoming show:
```
// In the greeting sub-line, 72 hours before a show:
"[Venue name] — [N] days."
// On the day of the show, before gig mode activates:
"[Venue name] is tonight. Gig mode activates an hour before doors."
// After auto-activation:
"On tonight at [venue]. Good luck."
```

---

## The 20/10 test

You know the artist tools system has crossed from excellent to extraordinary when an artist tells another artist "ABLE switches to gig mode by itself — I didn't have to do anything" and that artist signs up that week.
