# Artist Success — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the moment an artist realises their ABLE page is doing something their Instagram cannot — it is capturing real people, by name and email, who chose to stay close — and they feel that difference viscerally.

---

## Moment 1: The First Fan

**What it is:** An artist signs up on a Tuesday. By Thursday they have shared the link in their Instagram bio. At 14:22 on Thursday, someone signs up. The artist gets a notification: "Your first fan. This is how every list starts." They stop what they're doing.

**Why it's 20/10:** This is the product's "aha" moment. Not the first view — views are passive. The first fan sign-up is a person choosing to give their email to an artist they care about. That is qualitatively different from a follow. It is the moment ABLE stops being a link page and starts being a relationship. The notification must honour that without inflating it.

**Exact implementation:**

The notification copy — exact strings, in order of fan count:

```javascript
function getFirstFanCopy(fanCount) {
  if (fanCount === 1) return "Your first fan. This is how every list starts.";
  if (fanCount <= 4) return `${fanCount} people signed up. They came because of you.`;
  if (fanCount <= 9) return `${fanCount} fans in your first week. Your page is working.`;
  return `${fanCount} fans. Past the point where this is an experiment.`;
}
```

Design spec for the milestone card:
- Background: amber (#f4b942) at 10% opacity, border: 1px solid #f4b942 at 30% opacity
- The ✦ symbol precedes the copy: `✦ Your first fan.`
- Position: top of admin home section, above Campaign HQ
- No auto-dismiss — this moment is held until the artist manually dismisses it
- No CTA button. No "share this" prompt. No upsell. Just the fact, held in amber.

The n8n email workflow (requires Resend):
- Trigger: Supabase INSERT on `fans` table WHERE `artist_id = [artist]`
- Delay: 0 seconds for the first fan (no 30-minute delay — this notification needs to be immediate)
- Subject: "Someone signed up to hear from you"
- Body (exact copy):
  ```
  [Fan name or "A new fan"] signed up to your list at [time].

  You now have 1 fan. That's how every list starts.

  [View your fans →]
  ```
- No marketing copy. No exclamation mark. The weight of the moment carries itself.

The in-admin real-time signal (no backend required for localStorage phase):
- Poll `able_fans` in localStorage every 60 seconds when admin.html is open
- If count has increased since last poll: show the milestone card immediately
- Do not require a page reload to see the new fan

---

## Moment 2: The "Your Page Is Working Harder Than Instagram" Moment

**What it is:** An artist has been on ABLE for 30 days. They have 23 fans. They have posted on Instagram 14 times in that period. Their Instagram reach has declined 30% due to algorithm changes. Their ABLE fan list is growing at 0.8 fans per day. The Day 30 summary card says: "23 fans in your first month. The people on this list chose to be here. Your Instagram following didn't."

**Why it's 20/10:** This is the line that reframes the product. Not "you have 23 fans" — contextualised comparison that makes the artist feel the difference between passive follower counts and active fan ownership. It is the sentence that turns a casual ABLE user into someone who talks about ABLE to other artists.

**Exact implementation:**

The Day 30 summary card copy logic:

```javascript
function buildDay30Summary(fanCount, viewCount, topSource) {
  const sourceText = topSource ? ` Most arrived from ${topSource}.` : '';

  if (fanCount === 0) {
    return {
      headline: 'Your first month on ABLE.',
      stats: `${viewCount} visit${viewCount !== 1 ? 's' : ''}. No fans yet.`,
      context: 'Put your link in your bio and leave it there. Your first fan is closer than you think.',
      cta: { label: 'Copy my link', action: 'copyLink' }
    };
  }
  if (fanCount <= 9) {
    return {
      headline: 'Your first month on ABLE.',
      stats: `${viewCount} visit${viewCount !== 1 ? 's' : ''}, ${fanCount} fan${fanCount !== 1 ? 's' : ''}.${sourceText}`,
      context: 'These people gave you their email. Not a follow — an email. That list is yours permanently.',
      cta: { label: 'Copy my link', action: 'copyLink' }
    };
  }
  if (fanCount <= 49) {
    return {
      headline: 'Your first month on ABLE.',
      stats: `${viewCount} visit${viewCount !== 1 ? 's' : ''}, ${fanCount} fans.${sourceText}`,
      context: 'A broadcast to these fans would cost you nothing and skip every algorithm. Artist plan, £9/month.',
      cta: { label: 'See what you get', action: 'openUpgradeSheet' }
    };
  }
  return {
    headline: 'Your first month on ABLE.',
    stats: `${viewCount} visit${viewCount !== 1 ? 's' : ''}, ${fanCount} fans.${sourceText}`,
    context: `${fanCount} people chose to stay close. Past the point where this is an experiment.`,
    cta: { label: 'See Artist plan', action: 'openUpgradeSheet' }
  };
}
```

The comparison line — only shown when the artist has connected Instagram (Phase 2, when Supabase is live):
```
"[N] Instagram followers can't be contacted directly. [fanCount] ABLE fans can."
```
This is the sentence that reframes the value proposition in one line. It does not require the artist to understand the product architecture. It is a direct comparison they already feel.

---

## Moment 3: The 3-Days-Before-Release Nudge

**What it is:** An artist set a release date 14 days ago and hasn't logged into admin.html in 9 days. Their release is in 3 days. At 07:00, an automated email arrives. Subject: "Your release is in 3 days — is your page ready?" The body checks three things: does their page have the pre-save CTA set, do they have any fans on their list, and has their page been shared in the last 7 days (derived from view count trend). Each check is honest and specific.

**Why it's 20/10:** This email arrives at the worst possible time from a missed-opportunity standpoint — 3 days before release is not too late to fix things, but it is too late if you wait longer. The artist who gets this email and acts on it captures fans they would otherwise have missed. The artist who gets it and has everything in order feels validated. The artist who ignores it was not reachable anyway. This is what "triggered by what the artist actually did" means in practice.

**Exact implementation:**

n8n workflow: "Pre-release 3-day check":
- Trigger: Supabase scheduled query, runs at 07:00 daily
- Query: `SELECT * FROM profiles WHERE release_date = (NOW() + INTERVAL '3 days')::date AND last_login_at < NOW() - INTERVAL '7 days'`
- For each artist returned, send via Resend:

```
Subject: Your release is in 3 days

Hi [Name],

[Release title] drops on [date]. Three things worth checking today:

Pre-save CTA: [present / not set — "Your page doesn't have a pre-save CTA yet. Takes 2 minutes to add."]

Fan list: [fanCount] people will hear about this release directly when it drops. [If 0: "You have no fans on your list yet — share your link today and you'll have some by release day."]

Page views this week: [viewCount]. [If 0: "Your page hasn't had any visitors this week. Put your link in your Instagram bio now — before the release, not after."]

Your page: ablemusic.co/[slug]

[Name, ABLE]
```

The three-check structure is load-bearing. Not a generic "get ready for your release" — three specific, verifiable states the artist can act on. Each check is either green ("in order") or orange ("one thing to fix"). The email does not tell them off. It tells them where they are.

In-admin version (for artists who ARE logged in):
- Trigger: `getDaysUntilRelease() === 3` AND `lastLoginDaysAgo >= 7`
- Show a banner below the greeting: "Your release is in 3 days. Three things to check before it drops." with inline status indicators for pre-save CTA, fan list size, and recent view trend.

---

## The 20/10 test

You know the artist success system has crossed from excellent to extraordinary when an artist DMs you to say their ABLE page captured more fans in one release week than their Instagram gained followers in a month — and asks you to refer three friends.
