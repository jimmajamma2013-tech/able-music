# Admin Dashboard — Beyond 10
*What happens when this is not just good but genuinely extraordinary.*

## Current ceiling: 9.7/10
## 20/10 vision: The dashboard is not a tool the artist checks — it is a collaborator that knows what happened and says something true about it.

---

## The 3 things that would make this legendary

---

### 1. Contextual greetings that read the moment, not the clock

**What it is:**
The greeting is not just "Good to see you, James." with a generic sub-line. The dashboard reads the artist's specific situation and greets accordingly — with precision, not cheerleading.

The system reads in order of priority:
1. **Show tonight** → `"You're on tonight."` (no sub-line — those two words are enough)
2. **Show last night** → `"Last night at [Venue]. [N] fans joined during the show."` — where N is calculated by comparing sign-up timestamps to the show's door time and end time
3. **Release dropped today** → `"[Release name] is out."` — present tense, no celebration, just the fact
4. **Release in 24 hours** → `"[Release name] drops tomorrow."` — clean, exact
5. **First ever admin visit** → `"Good to meet you, [First name]."` with sub-line `"Your page is live."` — one-time only, fades to normal greeting after 2.5 seconds
6. **Streak: page had visitors every day for 7+ days** → `"Good to see you, [Name]."` with sub-line `"Your page has had visitors every day this week."`
7. **Normal** → `"Good to see you, [Name]."` with contextual sub-line if applicable

Priority 2 is the extraordinary one. After a show, the admin dashboard should tell the artist specifically what happened at the show: not "you have N new fans this month" but "last night at The Jazz Café, 12 fans joined during the show." This is not a different data point — it is the same fan sign-up data, read with temporal context. The admin knows when the show was (from `able_shows`). The admin knows when each fan signed up (from `able_fans` timestamps). The join is trivial. The emotional impact is not.

**Why it matters:**
"Last night at Moth Club. 17 fans joined during the show." — that sentence is what a manager says when they call you the morning after a gig. It is not a metric. It is a story. The difference between a product that gives you data and a product that tells you what happened is the difference between a spreadsheet and someone who was in the room.

An artist who reads this is not just informed. They are seen. Their show was witnessed. Their platform knows what night it was and what it meant.

**Why no competitor has it:**
This requires: show data with venue names, fan sign-up timestamps with enough precision to attribute them to a show window, and the design conviction to surface a narrative rather than a number. No analytics platform in music has this because analytics platforms are built for marketers, not for artists. A marketer wants a funnel. An artist wants to know what happened last night.

**How to build it:**
```javascript
function buildGreeting(profile, shows, fans) {
  const now = Date.now();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // Show tonight
  const tonightShow = shows.find(s => new Date(s.date).toDateString() === today);
  if (tonightShow) return { main: "You're on tonight.", sub: null };

  // Show last night — calculate fans who joined during show window
  const lastNightShow = shows.find(s => new Date(s.date).toDateString() === yesterday);
  if (lastNightShow) {
    const showStart = new Date(`${lastNightShow.date}T${lastNightShow.doorsTime || '19:00'}`).getTime();
    const showEnd = showStart + (4 * 3600000); // assume 4-hour window
    const showFans = fans.filter(f => f.ts >= showStart && f.ts <= showEnd + 7200000); // +2h post-show
    const venueName = lastNightShow.venue || 'last night';
    return {
      main: `Last night at ${venueName}.`,
      sub: showFans.length > 0
        ? `${showFans.length} ${showFans.length === 1 ? 'fan' : 'fans'} joined during the show.`
        : null
    };
  }

  // Release dropped today
  if (profile.releaseDate) {
    const rd = new Date(profile.releaseDate);
    if (rd.toDateString() === today) {
      const releaseName = profile.release?.title || 'Your release';
      return { main: `${releaseName} is out.`, sub: null };
    }
    // Release tomorrow
    const tmrw = new Date(Date.now() + 86400000).toDateString();
    if (rd.toDateString() === tmrw) {
      return { main: `${profile.release?.title || 'Your release'} drops tomorrow.`, sub: null };
    }
  }

  // Normal
  const firstName = profile.name?.split(' ')[0] || 'you';
  return { main: `Good to see you, ${firstName}.`, sub: buildNormalSub(profile, fans) };
}
```
Build time: 2 hours.

---

### 2. The first fan — treated as the moment it is

**What it is:**
The fan list does not look the same at 1 fan as it does at 100 fans. The transition from zero to one is the most important moment in the fan list's life. ABLE should treat it accordingly.

When `able_fans` crosses from empty to having exactly one entry for the first time, and the artist opens the fan list page, the list renders with a single change to the copy above the first fan row:

> "Your first fan. This is how every list starts."

That line appears once, above the email address. It is in the muted text (`--dash-t3`) register — not highlighted, not celebrated. Just noted. On the artist's next visit to the fan list, it is gone permanently. A flag in localStorage (`first_fan_noted: true`) ensures it never reappears.

Additionally, when a fan signs up while gig mode is active, their fan row gets a small muted badge: `at the show` — not a label for all fans, only for fans whose `ts` falls within the show window. This is the same temporal attribution logic as the greeting above. The artist can look at their fan list and see exactly which fans signed up in the room.

**Why it matters:**
Zero-to-one is not a metric transition. It is an existential one. Before the first fan, the artist is a person who made a page. After the first fan, the artist is a person who has a relationship. The product should mark this. Not with a badge, not with confetti — with a sentence that says something true.

"Your first fan. This is how every list starts." is true in a way that most platform copy is not. It acknowledges that this is the beginning, without implying the beginning is deficient or that the artist should be doing more. It says: you have started a list. That list will grow. This is how it starts. Done.

**Why no competitor has it:**
No platform marks the zero-to-one moment because no platform thinks of fan sign-ups as a list that belongs to the artist. They think of them as contacts in a CRM, rows in a database, metrics in a funnel. The copy that says "this is how every list starts" only makes sense if you believe the list has meaning beyond the number — if you believe the artist's relationship with these specific people matters. ABLE believes this. No competitor does.

**How to build it:**
```javascript
function renderFanList(fans) {
  const firstFanNoted = localStorage.getItem('first_fan_noted');
  if (fans.length === 1 && !firstFanNoted) {
    // Show the first fan moment
    const momentEl = document.createElement('p');
    momentEl.className = 'fan-first-moment';
    momentEl.textContent = 'Your first fan. This is how every list starts.';
    fanListEl.prepend(momentEl);
  }
}

// On any second visit where fans.length >= 1:
if (!localStorage.getItem('first_fan_noted') && fans.length > 0) {
  // Set on first visit after gaining a fan, clear the copy on next visit
  if (localStorage.getItem('first_fan_visit_logged')) {
    localStorage.setItem('first_fan_noted', 'true');
  } else {
    localStorage.setItem('first_fan_visit_logged', 'true');
  }
}
```
For the `at the show` badge, during fan row rendering: check if the fan's `ts` falls within any show window. If yes, render a `<span class="fan-show-badge">at the show</span>`. Build time: 90 minutes.

---

### 3. Milestone sentences — one each, permanent

**What it is:**
Every meaningful threshold in the artist's journey is acknowledged once, with a specific sentence, and never again. Not a badge. Not a notification. A sentence in the admin home screen — in a card below the Campaign HQ — that appears for exactly one session and then disappears permanently.

The milestones and their sentences:

| Milestone | Sentence |
|---|---|
| First fan | "Your first fan. This is how every list starts." (fan list page — see above) |
| 10 fans | "10 people asked to hear from you. That's not nothing." |
| 50 fans | "50 people signed up. Half of them might come to your next show." |
| 100 fans | "100 people asked to hear from you. These are 100 real people." |
| First show added | "People want to know when you're playing. Now they can." |
| First CTA click | "Someone tapped [CTA label]. They were interested enough to act." |
| Page had visitors 7 days straight | "Your page has had visitors every day this week." |
| First week post-release | "7 days since [Release name]. [N] fans joined." |

The sentences never celebrate the platform. They never tell the artist to do something with the information. They are observations. They say what is true and then they stop. The artist is free to decide what the observation means.

**Why it matters:**
Milestones in other products are for retention. ABLE's milestones are for the artist's record. The difference is in who the milestone is for. A badge on Beacons says "you did the thing we wanted you to do." A sentence in ABLE says "here is what happened." The former is the product managing the artist. The latter is the product reporting to the artist. These are opposite relationships.

The cumulative effect of milestone sentences over months is an artist who feels like the product has been paying attention — not in a surveillance way, but in the way a good manager pays attention. They notice the right things and mention them without drama. That feeling is not created by any single sentence. It is created by a pattern of specific, honest acknowledgements over time.

**Why no competitor has it:**
Every platform in this space uses milestones for gamification: badges, levels, streaks, celebrations. The decision to use a plain sentence instead of a badge — to acknowledge rather than reward — requires a specific belief about artists: that they are not motivated by platform-dispensed rewards, that they distrust cheerleading, and that a true observation is worth more than a manufactured celebration. Linktree, Beacons, Koji, and every other link-in-bio tool uses some form of gamification. ABLE does not. This is not a missing feature. It is a product conviction.

**How to build it:**
Create a `MILESTONE_CONFIG` array of `{ key, threshold, fn, copy }` objects. On each admin home page load, run each milestone check. If a milestone is met and its key is not in `able_dismissed_milestones` localStorage array, render the milestone card. On the card, a single small "×" to dismiss — no button label, just the icon. On dismiss, add the key to `able_dismissed_milestones`. The card is rendered in the same style as the existing nudge cards — same CSS, same component. Build time: 2 hours.

---

## The one moment

An artist plays a show at a 100-capacity venue. It was a good night. They get home at 1am and open their phone. They have not checked the admin since before soundcheck. They open the ABLE admin.

The greeting says: "Last night at The Waiting Room. 14 fans joined during the show."

They look at the fan list. They can see the rows with "at the show" badges — 14 of them, all with timestamps between 8pm and midnight. They scroll through the email addresses. These are people who were in the room. They know some of them will have been the people at the front. The people who stayed until the end.

They put their phone down. In the morning, they will write something and send it to all 14. They know exactly what to say because they know exactly who they are writing to: people who were in the room last night.

This is not a feature. This is a relationship. ABLE made the relationship visible.

---

## What competitors would have to become to match this

**HubSpot / Mailchimp** have the CRM infrastructure. They lack the music-specific context: no show data, no campaign state machine, no artist voice. They would have to build a music-specific layer from scratch and then stop charging enterprise rates. They will not do this.

**Bandcamp** has the artist-fan relationship at its core. But Bandcamp's dashboard is focused on sales and streams — it answers "how much did you make" not "who was in the room." Bandcamp would have to redesign their analytics philosophy. They are owned by Songtradr (acquired from Epic) and are in cost-cutting mode. This is not happening.

**Linktree Pro** has analytics. Their analytics show clicks by platform — traffic data. They have no concept of a show, a release window, a fan relationship. They serve influencers, musicians, and businesses with the same interface. Personalising a greeting for the morning after a show requires a data model that distinguishes music-specific events from generic link activity. Linktree cannot build this without abandoning their universal audience.

---

## The 20/10 build spec

**Changes:**
- Replace static greeting with `buildGreeting()` function that checks shows, release dates, and streak data in priority order
- Add "Last night at [Venue]. [N] fans joined during the show." greeting for post-show morning sessions
- Add "at the show" badge to fan rows where `fan.ts` falls within a show time window
- Add "Your first fan. This is how every list starts." copy above the first fan row, shown once
- Add `MILESTONE_CONFIG` with 8 milestones, each triggering a one-time sentence card on the home screen
- Add `able_dismissed_milestones` localStorage array for permanent milestone dismissal

**Removes:**
- Generic sub-greeting fallback that does not read the moment
- Fan list that treats every sign-up as equivalent regardless of context

**Does not change:**
- The Campaign HQ layout and state controls
- The analytics display (views, fans, clicks — scoped correctly)
- The bottom sheet component pattern
- The amber admin accent colour system (`--acc: #f4b942`)
- Toast copy (already at "Saved." / "Copied." / "Show added." — correct)
