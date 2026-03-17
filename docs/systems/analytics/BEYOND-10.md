# ABLE — Analytics: Beyond 10
**Created: 2026-03-16 | Status: ACTIVE — 20/10 vision spec**

---

The current analytics spec is 9.5/10. It has the right numbers. It presents them honestly. It avoids gamification. What it does not yet do is the thing that would make an artist change a decision based on what they read.

The 20/10 analytics moment: an insight that tells an artist which relationships in their career are actually working.

---

## The Insight No Analytics Platform Can Deliver

### The question an artist actually has

Every artist who plays a show, drops a single, and posts on TikTok in the same week is running three experiments simultaneously. They want to know which one moved people. Not how many people viewed something — they can see that in TikTok analytics. They want to know: of the people who found me through each channel, who actually stayed?

No platform can answer this because no platform has the data. Social platforms see their own traffic. Streaming platforms see streams. No one joins the dots.

ABLE can. Because every fan sign-up carries a `source` field (the `?ref=` attribution string), and because fans spend time on the profile page before signing up, ABLE has two data points no one else has: where people came from, and what they did after they arrived.

### The exact dashboard component

This is a new section in admin.html. It sits below the core stats panel (views / fans / clicks) and is titled:

**"Where your fans came from"**

Not "Traffic Sources." Not "Attribution." *Where your fans came from.* That is the register of this product.

---

### Component layout

```
┌─────────────────────────────────────────────────────────┐
│  Where your fans came from                              │
│                                                         │
│  ▸ TikTok                          3 fans              │
│    Avg. time on page:  0:42                             │
│                                                         │
│  ▸ Maya's page                     7 fans              │
│    Avg. time on page:  1:24  ← 2× longer than TikTok   │
│                                                         │
│  ▸ Direct link                     2 fans              │
│    Avg. time on page:  1:01                             │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  Fans from Maya's page spent twice as long on your     │
│  page as fans from TikTok.                              │
└─────────────────────────────────────────────────────────┘
```

The insight line at the bottom is auto-generated. The algorithm is simple: find the source with the highest average dwell time; compare it to the source with the most volume; if they are different, surface the gap.

The copy is always specific. Never: "Referral traffic is performing well." Always: "Fans from Maya's page spent twice as long on your page as fans from TikTok."

---

### The exact copy patterns

**Pattern 1 — dwell time gap between sources:**
> "Fans from [Source A] spent [X]× longer on your page than fans from [Source B]."

**Pattern 2 — high-volume low-engagement source:**
> "Your TikTok is sending the most people. They're staying for 0:38 on average."

**Pattern 3 — low-volume high-engagement source:**
> "3 fans came from Maya's page. They stayed for 1:24 on average — longer than anyone else."

**Pattern 4 — collaboration outperforming solo:**
> "Fans who found you through another artist's page are your most engaged. Worth noting."

**Pattern 5 — no data yet (empty state):**
> "When fans start arriving from different places, you'll see which ones stick around longest. Share your link a few different ways to find out."

---

### Why this changes decisions

An artist sees this and knows: the collaboration with Maya sent fewer people than TikTok, but the people it sent spent twice as long. They were not casual clickers. They were already warm. The collaboration was worth more than the follower count suggests.

This is the kind of insight that changes whether an artist does another collaboration, not because ABLE told them to, but because ABLE showed them what happened the last time. No analytics tool in music does this because none of them have the referrer-to-dwell-time join. ABLE has it because the `?ref=` parameter is tracked at page load and the dwell time is tracked before the fan signs up.

---

### Data requirements

**Already available:**
- `able_fans[].source` — `?ref=` value at sign-up
- `able_views[].source` — `?ref=` value at page view
- `able_views[].ts` — timestamp of each view

**Needs adding to `able_views`:**
- `able_views[].duration` — seconds spent on page before close/sign-up. Captured via `visibilitychange` + `beforeunload` events. Stored as integer seconds.

**Calculation:**
```
dwell_time_by_source = group(able_views, by='source')
                       .map(group => avg(group.duration))

fan_count_by_source  = group(able_fans, by='source')
                       .map(group => group.length)
```

Both are client-side calculations from localStorage arrays. No server required until scale.

---

### The "Maya's page" scenario — why it matters beyond analytics

When an artist sees "7 fans from Maya's page," they are seeing something no Spotify, TikTok, or streaming platform would ever surface: evidence that another artist's audience is genuinely compatible with theirs. Not inferred by an algorithm. Demonstrated by behaviour. 7 people from Maya's page found this artist and stayed.

That is the seed of a collaboration suggestion ABLE could make in the future. Not "artists like you also liked" — something earned: "Fans who came from Maya's page stayed longer than anyone else. You two might be worth a conversation."

That future feature is out of scope here. But the analytics insight is the data foundation it would be built on. Build the insight layer now. The collaboration suggestion follows naturally.

---

*The 20/10 analytics moment is not more charts. It is one sentence, in plain language, that tells an artist something true about their world that they could not have known any other way.*
