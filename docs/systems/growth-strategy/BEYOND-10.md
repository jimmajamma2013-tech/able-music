# Growth Strategy — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is growth that feels indistinguishable from the product doing its job — the producer who signs up three artists in a week, the screenshot an artist posts without being asked, the sign-up that arrives because a fan saw the footer.

---

## Moment 1: The Producer DM That Produces Three Artists in Seven Days

**What it is:** A single DM to a producer — personal, referencing their specific work, making a specific offer — that results in that producer setting up three of their artists on ABLE within the following week.

**Why it's 20/10:** The 10/10 version of producer seeding is a programme with tracking and commission structures. The 20/10 version is the moment that programme actually works for the first time — one real human reads a message, thinks "this is genuinely useful for my artists," and takes action immediately. That first success is the proof that the theory is real. It is also the story James tells at every subsequent producer conversation.

**Exact implementation:**

The message that achieves this is not a template. It is a personal DM that uses the producer's actual work as context. The structure:

```
Hey [Name],

I listened to [specific recent production credit — artist name, track name].
The work on [specific production element — the mix on the bridge, the drum programming,
the arrangement in the drop] is the kind of thing that gets noticed.

I've been building a platform for independent artists — a profile page that owns the fan
relationship instead of handing it to Linktree. It also handles campaign modes automatically
(pre-release countdown, drop day, on tonight) so artists don't have to manually update their
bio link every cycle.

I know you work with several artists. The offer: if you set up 3 of them on ABLE,
I'll give you Artist Pro for life. Permanent, not a trial.

It takes about 10 minutes per artist — less if they have a Spotify profile. Happy to walk
you through the first one if useful.

Would that be worth 15 minutes?

James
```

The elements that make this 20/10 versus 7/10:
- Line 1 names a specific track and a specific production detail. Not "your work is great." This signals that James actually listened.
- The offer is stated precisely: "if you set up 3 of your artists" — not "if you join the affiliate programme."
- "Permanent, not a trial" handles the objection before it exists.
- "15 minutes" for the response ask, "10 minutes per artist" for the action ask — both are specific and honest.
- No exclamation marks. No "excited to share this."

To find the right production detail for line 1: find the producer's most recent credited release, listen to it for 3 minutes, identify one specific element that demonstrates the quality. This takes 5 minutes per producer. It is not scalable. That is the point.

When this works: the producer responds, James has a 15-minute call, the producer sets up 3 artists within the week. Each of those artists' pages goes live with "Made with ABLE" in the footer. The fans who sign up on those pages start the PLG loop. The producer becomes an informal advocate.

---

## Moment 2: The Screenshot an Artist Posts Without Being Asked

**What it is:** An independent artist screenshots their ABLE admin dashboard — specifically the fan list, or the stats panel showing a spike in views after they posted their new release — and shares it on their Instagram Stories without anyone from ABLE asking them to.

**Why it's 20/10:** Marketing content that an artist creates unprompted is worth ten times more than anything ABLE produces about itself. When an artist shares their fan count with their audience, the implicit message is "this is real, this is mine, this is working." Fans who see that share and tap the ABLE link are arriving already sold on the concept. The 20/10 growth moment is not designing the campaign that generates this — it is designing the admin dashboard experience so that this moment happens naturally.

**Exact implementation:**

The specific feature that produces this moment: the fan milestone notification in admin.html.

When an artist's fan list crosses a round number (10, 25, 50, 100, 250, 500, 1000), the dashboard shows a one-time moment:

```html
<!-- Fan milestone notification — appears once per milestone, dismissed on tap -->
<div class="milestone-moment" id="milestoneMoment" hidden>
  <div class="milestone-icon">✦</div>
  <div class="milestone-text">
    <strong id="milestoneCount">100 people</strong> have signed up to hear from you.
    <br><span class="milestone-sub">Your list. Your relationship.</span>
  </div>
  <button class="milestone-share" onclick="shareMilestone()">Share this</button>
  <button class="milestone-dismiss" onclick="dismissMilestone()" aria-label="Dismiss">✕</button>
</div>
```

```javascript
function checkMilestones() {
  const fans = safeLS('able_fans', []).filter(f => !f.unsubscribedAt && !f.deleted_at);
  const milestones = [10, 25, 50, 100, 250, 500, 1000];
  const dismissed = safeLS('able_dismissed_milestones', []);
  const reached = milestones.filter(m => fans.length >= m && !dismissed.includes(m));
  if (reached.length === 0) return;
  const next = Math.max(...reached); // show the highest unreached
  document.getElementById('milestoneCount').textContent = `${next} people`;
  document.getElementById('milestoneMoment').hidden = false;
}

function shareMilestone() {
  const fans = safeLS('able_fans', []).filter(f => !f.unsubscribedAt && !f.deleted_at);
  const p = safeLS('able_v3_profile', {});
  // Web Share API for mobile — falls back to clipboard
  if (navigator.share) {
    navigator.share({
      text: `${fans.length} people have signed up to hear from me directly. No algorithm. My list, my relationship. able.fm/${p.slug || ''}`,
    });
  } else {
    navigator.clipboard.writeText(`${fans.length} people have signed up to hear from me directly.`);
  }
  dismissMilestone();
}
```

The copy "Your list. Your relationship." on the milestone card is the exact phrase the artist sees at the moment they feel the value most acutely. That is when they reach for their phone to share it. The share button removes friction. The 20/10 moment is in the design, not the campaign.

---

## Moment 3: The Growth Event That Feels Like Nothing at All

**What it is:** An artist puts their ABLE link in their Instagram bio. Their followers tap it. Some sign up. The "Made with ABLE" footer is visible at the bottom of the page. One fan taps that footer, sets up their own artist page within 24 hours. No email sequence, no retargeting, no growth hack. Just the product doing what it was built to do.

**Why it's 20/10:** The most elegant growth engine is the one that is invisible. When James can point to PostHog and show that some percentage of ABLE sign-ups arrive via the "Made with ABLE" footer — without any campaign, without any paid spend, without any outreach — that is the growth moment that changes the character of the business. It means the product itself is recruiting artists. That is a different kind of company.

**Exact implementation:**

The footer link on `able-v7.html` (every free-tier page) — this is already specified in SPEC.md but the 20/10 version has exact copy and tracking:

```html
<footer class="page-footer">
  <a href="https://able.fm/?ref=footer&utm_source=able-footer&utm_medium=profile-footer&utm_campaign=plg"
     target="_blank"
     rel="noopener noreferrer"
     class="footer-able-link">
    Built with ABLE
  </a>
</footer>
```

The UTM parameters are the measurement layer. In PostHog, the funnel:
1. `page_view` on `landing.html` where `utm_source = able-footer`
2. `artist_signup` within 7 days of that page view

The PostHog query that makes this visible:
```
Funnel: landing_page_view (utm_source='able-footer') → artist_signup
Conversion window: 7 days
```

When that funnel shows 5% conversion or better, the PLG loop is working. Every new artist added through direct outreach generates a compounding number of organic sign-ups via their fans seeing the footer. The growth event that feels like nothing is actually the growth engine. That is 20/10.

---

## The 20/10 Test

James opens PostHog and sees that the "Made with ABLE" footer is the second-largest acquisition source after direct outreach — and he did not run a single campaign to make it happen. The product's growth is partially self-sustaining. That is when the growth strategy has crossed from executed to extraordinary.
