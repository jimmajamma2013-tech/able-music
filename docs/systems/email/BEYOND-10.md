# Email — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is an email that a fan saves in a folder, reads again before the show, and mentions to someone else — not because it was marketing, but because it felt like a real message from a person they care about.

---

## Moment 1: The Possessive Subject Line

**What it is:** The fan confirmation email in pre-release state has the subject line `Echoes — 3 days`. Three words. A title and a countdown. The fan opens it before they open anything else in their inbox.

**Why it's 20/10:** Every email platform teaches marketers to write subject lines that explain what's inside. ABLE's pre-release subject line does the opposite — it assumes the fan already knows. "Echoes — 3 days" treats the fan as someone who was already waiting. That assumption — that the fan is invested enough to recognise the release title and feel the urgency of three days — is itself the experience. It tells the fan: this artist thinks of you as someone who cares. And when the fan opens the email, the first line confirms it: "You signed up right before something."

**Exact implementation:**

```javascript
// In netlify/functions/fan-confirmation.js — pre-release state branch
case 'pre-release': {
  const daysUntil = daysUntilRelease(data.release_date);
  const dayWord = daysUntil === 1 ? 'day' : 'days';

  subject = `${data.release_title} — ${daysUntil} ${dayWord}`;

  // The subject line is load-bearing: never add "Re:", emoji, or brackets
  // "Echoes — 3 days" is the correct form. Do not alter this pattern.

  html = buildHtml([
    `<p>Hey —</p>`,
    `<p>It's ${data.artist_name}. You signed up right before something.</p>`,
    `<p>${data.release_title} comes out in ${daysUntil} ${dayWord} — ${formatDate(data.release_date)}.${data.presave_url ? ` Pre-save it now if you want it to land in your library the moment it's out.` : ''}</p>`,
    data.presave_url ? `<p><a href="${data.presave_url}" style="${ctaStyle()}">Pre-save ${data.release_title} →</a></p>` : '',
    `<p>I'll be in touch when it's live.</p>`,
    `<p><a href="${pageUrl(data)}" style="${linkStyle()}">See what's coming →</a></p>`,
    footer(),
  ].filter(Boolean).join('\n'));
  break;
}
```

The phrase "You signed up right before something" must never be changed to "You signed up at the perfect time" or "Great timing" — those are platform voices. "Right before something" is the artist's voice: direct, present, slightly conspiratorial. It treats the sign-up as a fortunate accident, not a marketing event.

---

## Moment 2: The Release Note Field

**What it is:** In admin.html, when an artist is about to send a release broadcast, a single text field appears with the label "Say something" and the placeholder: "This is what you'd say to them in person." The character limit is 280. What they write appears verbatim — untouched by ABLE — as the second paragraph of the broadcast email.

**Why it's 20/10:** The broadcast email with no release note reads: "Hey — It's Nadia. Echoes is out." That is correct, and it is clean, and 80% of artists will send exactly that. But the 20% who sit with the release note field for two minutes and write something honest — "I recorded this in my living room after a year I'd rather forget. I hope it lands." — those artists are building something different from any other platform. The release note is not a feature. It is a space where an artist can be human in the medium that is most often robotic. ABLE makes that space available and then gets out of the way.

**Exact implementation:**

Admin.html broadcast bottom sheet — the release note field:

```html
<div class="broadcast-note-field">
  <label class="broadcast-note-label" for="releaseNote">Say something (optional)</label>
  <textarea
    id="releaseNote"
    class="broadcast-note-textarea"
    placeholder="This is what you'd say to them in person."
    maxlength="280"
    rows="3"
    aria-describedby="releaseNoteCount"
  ></textarea>
  <div class="broadcast-note-footer">
    <span id="releaseNoteCount" class="broadcast-note-count">280</span>
  </div>
</div>
```

```javascript
// Character countdown
document.getElementById('releaseNote').addEventListener('input', function () {
  const remaining = 280 - this.value.length;
  document.getElementById('releaseNoteCount').textContent = remaining;
  // Amber at 50 remaining, red at 20
  document.getElementById('releaseNoteCount').style.color =
    remaining <= 20 ? 'var(--color-error)' :
    remaining <= 50 ? 'var(--acc)' :
    'var(--dash-t2)';
});
```

In `netlify/functions/artist-broadcast.js`, if `release_note` is present and non-empty, it is inserted verbatim as a `<p>` between the opening line and the stream CTA. No wrapping. No formatting. The artist's words, exactly as written.

---

## Moment 3: The Timed Release Email

**What it is:** When an artist enters a release date in admin.html, ABLE schedules the release broadcast email to send at 08:00 local time on release day — not when the artist manually triggers it, but automatically, at the moment the day begins for the fan.

**Why it's 20/10:** The difference between "Echoes is out today" arriving at 08:00 when a fan opens their phone in bed, versus arriving at 14:30 when the artist remembered to press send, is the difference between a moment and a notification. Timing is the invisible layer of the email system. Every other broadcast tool puts timing in the artist's hands and adds friction ("Schedule your email"). ABLE's version: the artist sets a release date. ABLE says "Your release email will send at 8am on March 18." One checkbox to confirm. The email arrives exactly when it should, even if the artist is asleep.

**Exact implementation:**

In admin.html Campaign HQ, once `release_date` is set and `page_state` will be `pre-release`, show this confirmation line beneath the date input:

```html
<p class="release-broadcast-timing" id="releaseBroadcastTiming" hidden>
  Your fans will hear from you at 8am on <strong id="releaseBroadcastDate"></strong>.
  <button class="link-btn" id="releaseBroadcastConfirm">Confirm →</button>
</p>
```

```javascript
// When release date is saved, show the timing confirmation
function showReleaseBroadcastTiming(releaseDateISO) {
  const formatted = new Date(releaseDateISO).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long'
  }); // "Tuesday, 18 March"

  document.getElementById('releaseBroadcastDate').textContent = formatted;
  document.getElementById('releaseBroadcastTiming').hidden = false;
}
```

On the Netlify side, the artist's confirmation writes a scheduled send record to Supabase:

```javascript
// netlify/functions/schedule-broadcast.js
// Stores: { artist_id, release_date, scheduled_for: '2026-03-18T08:00:00Z', status: 'pending' }
// A cron job (Netlify Scheduled Functions) queries for pending sends at 07:55 UTC daily
// and triggers the broadcast function for any artist whose scheduled_for has passed
```

The subject line: `Echoes is out` — exactly as specced. The timing is what makes it hit.

---

## The 20/10 test

You know the email system has crossed into extraordinary when an artist receives a reply from a fan who says: "I didn't expect to hear from you — felt like a real message."
