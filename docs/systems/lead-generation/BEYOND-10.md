# Lead Generation — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the DM that a fan sends to James saying "I make music too — can I get a page?", the lead that arrives without any outreach from James, and the pipeline that is measurably self-sustaining within 12 weeks.

---

## Moment 1: The Fan Who Becomes an Artist

**What it is:** A fan signs up on an artist's ABLE page, sees the "Built with ABLE" footer, taps it, and within 24 hours has set up their own artist page — without James ever knowing they existed.

**Why it's 20/10:** The 10/10 version of lead generation is a functional producer seeding programme and a 12-week direct outreach calendar. The 20/10 version is the moment where a lead arrives that James did not generate. The fan-to-artist conversion is the most powerful signal available to a pre-revenue startup: it means the product is recruiting artists through fans, without any effort from the founder. One conversion of this type is not a strategy. But it is the proof that the strategy is working at a level below the one James can see.

**Exact implementation:**

The "Built with ABLE" footer on `able-v7.html` (free tier only) is already specified in SPEC.md. The 20/10 version adds one specific element: a landing page for artists who arrive via the footer that is different from the main landing page.

When an artist taps `able.fm/?ref=footer`:

```javascript
// In landing.html — detects footer-sourced visits
const ref = new URL(location).searchParams.get('ref');
if (ref === 'footer') {
  // Swap hero copy to address someone who just saw ABLE on an artist's page
  document.getElementById('heroHeadline').textContent = 'You just saw what ABLE looks like.';
  document.getElementById('heroSubhead').textContent =
    'Your page works the same way. Fan sign-ups go straight to you — no algorithm.';
  document.getElementById('heroCTA').textContent = 'Set up your page';
}
```

Default hero copy (landing.html): "A page for your music. Your fans sign up. You keep them."
Footer-variant hero copy: "You just saw what ABLE looks like. Your page works the same way."

The default copy assumes the visitor has never seen ABLE before. The footer-variant copy acknowledges that they have just seen a live example — which is the most effective possible introduction. The conversion rate from a visitor who has already seen a real ABLE page will be higher than from a cold visitor. The footer UTM tag (`utm_source=able-footer`) in PostHog confirms this hypothesis with data.

The "I make music too →" link in the footer of `able-v7.html`:

```html
<a href="https://able.fm/?ref=footer&utm_source=able-footer"
   target="_blank"
   rel="noopener noreferrer"
   class="footer-able-link">
  Built with ABLE · Your page is free →
</a>
```

The "Your page is free →" addition is the 20/10 detail. It removes the primary objection (cost) at the exact moment the fan is considering it. "Built with ABLE" describes what it is. "Your page is free →" removes the barrier. Both fit on one line.

---

## Moment 2: The Lead That Answers Before Being Asked

**What it is:** An artist messages James on Instagram — without James having sent them any outreach — saying "I saw your page on [artist name]'s profile / saw your post about fan emails / a friend showed me this" and asking how to get set up.

**Why it's 20/10:** Inbound leads from artists who have self-qualified through someone else's page or someone else's recommendation are the warmest possible leads. They have already seen the product in its natural context. They have already decided they want it. The only job left is to make the sign-up experience as frictionless as the moment of intent. A founder who receives these messages in Week 4 of Phase 2 knows the growth engine is working below the surface — the organic loop has started before the data makes it obvious.

**Exact implementation:**

The response to an inbound artist message — this is the one interaction in the entire lead generation system that should be treated as irreplaceable and cannot be templated:

```
Hey [Name],

Really glad you reached out. Let me set it up for you right now —
it takes about 10 minutes and I'll walk you through it.

Your page will be at able.fm/[slug] — what name do you want to use?
(Artist name, or your own name, whichever is how you present yourself)

Then head to: able.fm/start — it'll ask you a few things and your page will be live.

I'll be here if anything's unclear.

James
```

What this response does:
- Starts now, not later — "let me set it up for you right now" signals immediate value
- First question is the one decision that has the most emotional weight (their name — their identity on the platform)
- Direct start URL, no onboarding email sequence, no waiting
- "I'll be here" is the support promise, stated once, casually — not as a feature

When an inbound artist reaches out, they have momentum. The 20/10 quality is meeting that momentum with equal speed and directness. Every hour of delay between their message and James's response is a risk that the momentum dissipates.

---

## Moment 3: The "I Make Music Too" Moment on the Fan's Journey

**What it is:** A fan who has been on an artist's ABLE page, has signed up to hear from them, and is receiving updates — eventually notices they are an artist themselves (musician, producer, songwriter) and finds a path from fan to ABLE artist without James doing anything.

**Why it's 20/10:** The most overlooked growth channel in ABLE's architecture is the conversion of fans who are also artists. On any given artist's ABLE page, a non-trivial percentage of fans are musicians themselves — they are fans of other artists in their local scene, their genre, their circle. When those fans see the artist's ABLE page working well (clean design, campaign states, fan sign-up), some fraction will think "I need one of these." The 20/10 version of the fan experience gives them a path to that thought and a clear next step.

**Exact implementation:**

In the fan confirmation email (sent via Resend after sign-up), add one final line:

```
---

You're now on [Artist Name]'s list. They'll be in touch about their music.

— ABLE

P.S. If you make music yourself, your page is free: able.fm/start
```

This postscript is the only place in the entire fan journey where ABLE addresses the fan as a potential artist. It appears once, at the bottom of the confirmation email, without prominence. The copy is honest: "if you make music yourself" — it only addresses the subset of fans for whom it is relevant. It does not interrupt the fan experience. It is not a marketing message. It is a quiet pointer.

The PostHog funnel that confirms this is working:
1. `fan_signup` event
2. `page_view` on `start.html` — where `utm_source` is not present (they came directly, not from a campaign)
3. `artist_signup` event

Any conversion through steps 1 → 3 where step 2 has no UTM source is likely the confirmation email postscript working. When this funnel shows even 0.5% conversion — one artist sign-up per 200 fan sign-ups — the postscript is generating meaningful growth at zero marginal cost.

---

## The 20/10 Test

James opens PostHog and sees that more than 10% of new artist sign-ups in the past 30 days arrived without any direct outreach from him — via the footer, via inbound messages, via the fan confirmation email — and the trend is increasing. That is the lead generation system operating at 20/10: leads arriving from the product's own gravity, not from the founder's effort.
