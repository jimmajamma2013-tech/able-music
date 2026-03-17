# Tier Gate System — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a gate that shows the artist the exact thing they're missing — using their own real data — so the decision to upgrade is already made before they tap the button.

---

## Moment 1: The Gate That Uses Real Numbers

**What it is:** Every gate overlay replaces placeholder text with the artist's actual data. The fan CRM gate does not say "See your most engaged fans." It says "You have 23 fans in London. Artist Pro shows you who they are." The broadcast gate does not say "Send a message to your list." It says "Send a message to the 47 people who asked to hear from you." The number is their number. It is pulled from `able_fans` at render time and injected into the gate copy.

**Why it's 20/10:** A generic gate is a friction point. A gate with real numbers is a mirror. The artist reads "47 people who asked to hear from you" and the upgrade is not a product decision — it is the obvious next step in a relationship they are already managing. The specificity is what changes the psychology from "this is a paywall" to "this is the tool I clearly need."

**Exact implementation:**

Extend the `GATE_COPY` object from SPEC.md §2.8 to accept a dynamic copy function in addition to the static string:

```javascript
// Replace static headline strings with functions where data is available
const GATE_COPY_DYNAMIC = {
  'email-broadcasts': (ctx) => {
    const count = ctx.fanCount
    return count > 0
      ? `Send a message to the ${count} people who asked to hear from you. Artist.`
      : `Send a message directly to everyone on your list. Artist.`
  },
  'fan-crm': (ctx) => {
    // ctx.topCity comes from PostHog geo data or a city-count on able_fans
    const city  = ctx.topCity
    const count = ctx.fanCityCount
    return (city && count > 1)
      ? `You have ${count} fans in ${city}. Artist Pro shows you who they are.`
      : `See your most engaged fans, filter by source, and act on it. Artist Pro.`
  },
  'fan-list': (ctx) => {
    const count = ctx.fanCount
    return `You've reached ${count} fans. That's a real audience. Your next ${2000 - count} are one step away. Artist.`
  }
}

function getGateHeadline(featureId) {
  const dynamicFn = GATE_COPY_DYNAMIC[featureId]
  if (dynamicFn) {
    const fans    = JSON.parse(localStorage.getItem('able_fans') || '[]')
    const topCity = getTopCity(fans)  // utility: count fan.city fields, return most common
    return dynamicFn({
      fanCount:     fans.length,
      topCity:      topCity?.city   || null,
      fanCityCount: topCity?.count  || 0,
    })
  }
  return GATE_COPY[featureId]?.headline || ''
}
```

`applyGates()` calls `getGateHeadline(featureId)` instead of reading directly from `GATE_COPY`.

`getTopCity(fans)` implementation: iterate `fans`, count by `.city` field (if present from PostHog geo enrichment), return `{ city, count }` for the highest-count city, or `null` if no geo data.

---

## Moment 2: The Gate That Knows You Just Hit the Trigger

**What it is:** When a Free artist signs up their 100th fan, the gate doesn't appear at their next normal visit — it appears in the moment. The fan list page detects the transition from 99 to 100 (on the fan sign-up event, not on page load) and replaces the "Add fan" flow with a single, specific, uninterrupted moment: "Your list is full. 100 people asked to hear from you." The upgrade prompt follows, one sentence: "Don't leave them waiting." No overlay. No blur. Full screen of the fan count, then the upgrade CTA slides in from below.

**Why it's 20/10:** Standard tier gates wait for the artist to notice they can't do something. This gate arrives at the exact moment the artist would be most proud — they just hit 100 fans — and redirects that energy into forward motion rather than frustration. Pride is the best conversion moment. Friction is the worst. This gate uses pride.

**Exact implementation:**

In `admin.html`, the fan sign-up event listener (or the polling/webhook that updates the fan list) includes a milestone check:

```javascript
function onFanListUpdated(newFans) {
  const prev = parseInt(localStorage.getItem('able_fan_count_prev') || '0')
  const curr = newFans.length
  localStorage.setItem('able_fan_count_prev', curr)

  const tier = getCurrentTier()

  // 100-fan milestone: Free tier, first time crossing
  if (tier === 'free' && prev < 100 && curr >= 100) {
    showFanMilestoneGate(curr)
    return
  }
}

function showFanMilestoneGate(count) {
  // Not a standard tier-gate overlay — a full-section takeover
  const fanSection = document.getElementById('fanListSection')
  fanSection.innerHTML = `
    <div class="fan-milestone-gate" role="alert">
      <p class="fan-milestone-count">${count}</p>
      <p class="fan-milestone-label">people asked to hear from you.</p>
      <p class="fan-milestone-sub">Your list is full. Don't leave them waiting.</p>
      <button class="tier-gate-cta" onclick="openUpgradeSheet('fan-list')">
        Keep your list growing — Artist
      </button>
      <button class="fan-milestone-dismiss" onclick="dismissFanMilestone()">
        See my list first
      </button>
    </div>
  `
}
```

CSS: `.fan-milestone-count` is `Barlow Condensed`, 72px, `var(--acc)` — the number is the hero. `.fan-milestone-label` is Plus Jakarta Sans 16px, `var(--text)`. `.fan-milestone-sub` is 13px, `var(--t2)`.

The "See my list first" dismiss link goes to the fan list without any upgrade prompt for the rest of that session. The milestone is noted in `able_dismissed_nudges` as `'fan-milestone-100'` — it never shows again.

---

## Moment 3: The Gate Dismiss That Earns the Next Nudge

**What it is:** When an artist dismisses a gate overlay, the product notes specifically which feature they dismissed and which trigger fired. If they dismissed the email broadcast gate three sessions in a row — seeing the same "47 people" copy each time — the gate copy changes on the fourth appearance: "Still 47 people waiting. One tap." No new features are unlocked. The copy becomes more direct with each dismissal, not more desperate. After the fifth dismissal, the gate silently disappears until the fan count increases by 20%. Then it returns with a fresh number.

**Why it's 20/10:** Most products repeat the same upgrade prompt forever and train the artist to ignore it. This gate learns that they've seen it. It respects that they're not ready. It doesn't shout louder — it gets more specific. And when it disappears for a while, its return feels like a real moment rather than a background noise.

**Exact implementation:**

Extend the `able_dismissed_nudges` key to store count alongside the ID:

```javascript
// Current format: ['fan-milestone-100', 'snap-cards']
// Extended format: { id: count, id: count }
// Stored as 'able_nudge_counts' (new key — does not break existing dismissed list)

function getNudgeCount(featureId) {
  try {
    const raw = JSON.parse(localStorage.getItem('able_nudge_counts') || '{}')
    return raw[featureId] || 0
  } catch { return 0 }
}

function incrementNudgeCount(featureId) {
  try {
    const raw = JSON.parse(localStorage.getItem('able_nudge_counts') || '{}')
    raw[featureId] = (raw[featureId] || 0) + 1
    localStorage.setItem('able_nudge_counts', JSON.stringify(raw))
    return raw[featureId]
  } catch { return 1 }
}

// When a gate overlay is dismissed:
function onGateDismissed(featureId) {
  const count = incrementNudgeCount(featureId)
  if (count >= 5) {
    // Silence this gate until fan count grows by 20%
    const fans = JSON.parse(localStorage.getItem('able_fans') || '[]')
    localStorage.setItem(`able_gate_silence_${featureId}`, fans.length)
  }
}

// Progressive copy variants for email-broadcasts gate:
const BROADCAST_COPY_VARIANTS = [
  (n) => `Send a message to the ${n} people who asked to hear from you. Artist.`,
  (n) => `${n} people signed up. They're waiting. Artist.`,
  (n) => `Still ${n} people waiting. One tap. Artist.`,
  (n) => `${n} people. They asked. You haven't replied yet. Artist.`,
]

function getBroadcastGateCopy(fanCount, featureId) {
  const count = getNudgeCount(featureId)
  const variant = BROADCAST_COPY_VARIANTS[Math.min(count, BROADCAST_COPY_VARIANTS.length - 1)]
  return variant(fanCount)
}
```

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when an artist upgrades not because they hit a wall, but because a gate showed them their own 47 fans staring back at them and the decision felt less like a purchase and more like a responsibility to people who chose to show up.
