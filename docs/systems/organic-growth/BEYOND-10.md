# ABLE Organic Growth — Beyond 10
**Created: 2026-03-16 | Status: ACTIVE — 20/10 push**

> The 10/10 system explains how ABLE grows structurally. This document asks what makes the growth system genuinely beautiful — the version of it that artists talk about in rooms you're not in.

---

## The 20/10 Moment

An artist gets 50 fans from another artist's ABLE page. They sign in to admin. The fan list shows 50 new entries.

The ordinary version: "50 new sign-ups via referral."

The 20/10 version is an email, sent automatically, that reads:

> "50 people found you through Maya's page this week.
>
> They came because they trust her taste. They know her music. They clicked your name in her credits, or saw you in her support section, or followed the ABLE link she sent to her list. These aren't random internet strangers — they're people who already respect the source.
>
> They signed up because you were vouched for. That's a different kind of fan."

The email does not come with a prompt to upgrade, a chart, or a CTA. It is an observation. It is ABLE reading the room and choosing to say something meaningful instead of something useful.

That email will be forwarded. It will be screenshotted and posted. It will be the thing an artist mentions when someone asks "what made you stick with ABLE?"

### What makes this possible

The data already exists. Source attribution is built into the fan sign-up flow. ABLE knows that these 50 fans came from Maya's page. The 20/10 moment is not a technical challenge — it is a copywriting and timing decision.

**Implementation spec:**

- Trigger: 10+ fans sign up within 7 days where `source.artistSlug` is not null
- Timing: send the morning after the 10th cross-artist sign-up
- Subject line: "[X] people found you through [Artist Name]'s page."
- Body: refer to the source artist by first name. Reference the specific mechanism (credits, support section, or ABLE discovery footer — whichever the source data shows). End with one sentence that names what this means. Nothing else.
- No CTA. No upgrade prompt. This email earns trust — it does not spend it.
- Suppress if the referring artist is the same person (self-referral).

**The copy must be specific to the referral source:**

If the fans came via the credits section: "They were listening to Maya's EP and saw your name in the production credits."

If they came via the "artists you might like" section: "They followed a recommendation on Maya's page."

If they came via the ✦ footer: "They found you through the discovery footer on Maya's page — the small one that only curious people click."

Each version requires a different sentence. All three are worth writing now, before the feature launches.

---

## "Your Algorithm" — The Strategic Repositioning

The current positioning is defensive: "No algorithm in the way." It is true and it is good. But it positions ABLE as the thing that is not something else. That is a challenger's posture. The 20/10 posture is assertive.

The reframe: **"Your algorithm."**

Not "no algorithm" — "your algorithm." The curation isn't absent. It's just yours. You decide who hears your music. You decide how they find you. You decide what order they see things in. ABLE's page structure, its campaign states, its CTAs — these are a curation system you control, not one that controls you.

### Where the copy changes

**Landing page hero (current):** "No algorithm in the way."
**Landing page hero (20/10):** "Your page. Your algorithm."

This is not a small change. It is a repositioning from "we removed something bad" to "we gave you something yours."

**Admin.html empty state for analytics:**
Current: "When fans engage with your page, the data will appear here."
20/10: "This is your algorithm. It's made of your fans' choices, not a platform's predictions."

**Onboarding — after setting first CTA:**
Current: nothing.
20/10: "You just made the first decision in your algorithm."

**Fan sign-up confirmation email to artist:**
Current: "[Name] signed up on your page."
20/10: "[Name] signed up on your page. Your algorithm worked."

**The product implication:**

"Your algorithm" is not just copy. It is a product concept. ABLE should surface data that proves the algorithm is working — specifically:

- Which CTA converted most this week
- Which source sent the most engaged fans (those who came back to the page, vs one-tap sign-ups)
- Which campaign state (profile / pre-release / live / gig) produced the most fan sign-ups in the artist's history

This data, presented weekly, is the artist watching their algorithm learn. It is the most defensible framing in music tech: not "here are your metrics" but "here is how your decisions are compounding."

### What this positioning replaces

The "no algorithm" framing was a reaction to the dominant platforms — Instagram, TikTok, Spotify. It will age. As the platforms shift (they always do), the reactive positioning ages with them.

"Your algorithm" is timeless. It is not a reaction to anything. It is an assertion about ownership. An artist in 2030 on a completely different platform landscape will still want their algorithm — their curation, their choices, their fan relationship — to be theirs. This framing ages into strength.

**The full campaign positioning:**

| Platform | Their algorithm | ABLE's answer |
|---|---|---|
| Instagram | Reach scored by engagement, suppressed by timing | Your reach is your list. No score. |
| Spotify | Recommended by listening behaviour you don't control | Recommended by you, to fans who chose to be recommended to |
| TikTok | Reach distributed to optimise time-on-app | Your page sends people where you want them to go |
| Linktree | No algorithm at all — a list | Your page learns which CTAs convert, which states work, which fans return |

The last row is the product truth. ABLE does not just remove the bad algorithm. It gives you a better one — one that you own and that compounds with your decisions.

---

## The 3 Growth System Upgrades That Reach 20/10

### Upgrade 1: The Trust Chain Email (specified above)
**Impact:** turns a passive metric into a relationship story. Artists forward it. The forwarded email is ABLE's best marketing.

### Upgrade 2: The "Your Algorithm" weekly digest
**Spec:** every Monday at 09:00, each artist receives a single card (email or in-app) that shows:

> "Last week: your page had [X] views. [Y] fans signed up. [Z]% clicked [top CTA].
>
> Your algorithm: working."

The last line appears only if the conversion rate is above a threshold (define: above 3% sign-up rate = "working," 1-3% = "warming up," below 1% = a gentle nudge to change something). The copy for each bracket:

- Above 3%: "Your algorithm: working."
- 1-3%: "Your algorithm: warming up. Try updating your hero CTA."
- Below 1%: "Your page had visitors but low sign-ups. Want to see what's not converting?" (link to the analytics breakdown)

This is not a drip campaign. It is a performance summary that uses ABLE's own language consistently.

### Upgrade 3: The Referred Fan Acknowledgement
**Spec:** when a fan signs up via another artist's page, they receive a different confirmation email than a fan who signed up directly. The direct sign-up confirmation is warm and personal ("You're on [Artist Name]'s list."). The cross-artist sign-up acknowledgement is:

> "You found [Artist Name] through [Referring Artist]'s page. Good taste runs in clusters."

"Good taste runs in clusters" is the 20/10 sentence. It is not a feature announcement. It is an observation that makes the fan feel smart for the connection they made. They will remember it.

---

*The growth system at 10/10 is a machine. At 20/10, it is a story that artists tell each other. The difference is not more mechanics — it is more meaning in the mechanics that already exist.*
