# Tier System — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a pricing page where every tier feels like a gift from someone who understood what artists actually need — not a product manager mapping features to price points.

---

## Moment 1: The Free Tier That Proves Itself First

**What it is:** Every Free account shows a quiet progress arc alongside the fan count: "47 / 100 fans." The arc is not a pressure mechanic. It is factual — here is where you are, here is where the cap is. When the arc reaches 80 fans, a single line appears below it, one time, that reads: "80 people chose to hear from you. That's a real start." No upgrade prompt. No link. Just the sentence.

The sentence disappears after 48 hours. It is never repeated for 80 fans. It appears again at 95 fans: "95 people. Nearly a hundred humans who asked to hear from you." Still no link. The upgrade prompt comes after 100 — but by then the artist has seen twice what the Free tier produces, without being asked to pay for it. They upgrade with evidence, not pressure.

**Why it's 20/10:** The copy philosophy says: never phrase a limit as punishment. The milestone sentences aren't upgrade prompts — they are proof that the Free tier worked. That proof is the most effective conversion mechanism that exists, because it is honest. An artist who sees "95 people asked to hear from you" and feels something has already decided to upgrade. They just need the CTA to exist when they're ready.

**Exact implementation:**

In `admin.html`, the fan count display:

```javascript
const MILESTONE_COPY = {
  80:  "80 people chose to hear from you. That's a real start.",
  95:  "95 people. Nearly a hundred humans who asked to hear from you.",
}

function checkFanMilestoneCopy(fanCount) {
  const tier = getCurrentTier()
  if (tier !== 'free') return

  for (const [threshold, copy] of Object.entries(MILESTONE_COPY)) {
    const n = parseInt(threshold)
    const seenKey = `able_milestone_seen_${n}`
    const shownKey = `able_milestone_shown_${n}`

    if (fanCount >= n && !localStorage.getItem(seenKey)) {
      // Show the sentence, set a 48h expiry
      showMilestoneSentence(copy)
      localStorage.setItem(seenKey, '1')
      localStorage.setItem(shownKey, Date.now())
    }

    // Expire after 48 hours
    const shownAt = parseInt(localStorage.getItem(shownKey) || '0')
    if (shownAt && Date.now() - shownAt > 48 * 3600 * 1000) {
      localStorage.removeItem(shownKey)
    }
  }
}

function showMilestoneSentence(copy) {
  const el = document.getElementById('fanMilestoneSentence')
  if (!el) return
  el.textContent = copy
  el.style.display = 'block'
  el.style.opacity = '0'
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 400ms ease'
    el.style.opacity = '1'
  })
}
```

HTML: `<p class="fan-milestone-sentence" id="fanMilestoneSentence" style="display:none;"></p>`

CSS: `.fan-milestone-sentence { font-size: 13px; color: var(--t2); margin-top: 8px; font-style: italic; }`

---

## Moment 2: The Upgrade Sheet That Earns the Decision

**What it is:** When an artist opens the upgrade sheet, the headline is not "Your plan." It is a single sentence derived from the specific trigger that opened the sheet. If the artist tried to add a second snap card: "Tell more of your story." If they hit 100 fans: "A hundred people are waiting." If they clicked on email broadcasts: "47 people. One message."

Below the headline, the tier cards are shown — but the featured card (Artist, at £9) has three bullets that are not generic features. They are the three most valuable things specifically for an artist at this stage. If they have 85 fans, the Artist bullet reads "Fan list without a ceiling." If they have 2 snap cards waiting to be added, it reads "All the snap cards you want." The bullets are chosen from the artist's real context.

**Why it's 20/10:** The difference between a pricing sheet that converts and one that doesn't is not the price — it is whether the artist feels like the sheet was built for their situation or mass-produced for everyone. Three dynamic bullets, chosen from a decision table, take 2 hours to implement. The conversion rate improvement pays for itself on the first paying artist who wouldn't otherwise have upgraded.

**Exact implementation:**

A context-selection function runs before the upgrade sheet renders:

```javascript
const UPGRADE_CONTEXT_BULLETS = {
  'fan-list':        ['Fan list without a ceiling', 'Campaign modes', 'Remove ABLE branding'],
  'snap-cards':      ['All the snap cards you want', 'Fan list without a ceiling', 'Campaign modes'],
  'email-broadcasts':['1 email broadcast per month to your whole list', 'Fan source breakdown', 'Fan list without a ceiling'],
  'campaign-modes':  ['Pre-release countdown, live window, gig mode', 'Fan list without a ceiling', 'Campaign modes'],
  'connections':     ['Link to your producers and collaborators', 'Fan list without a ceiling', '5 snap cards'],
  // default
  '_default':        ['Fan list without a ceiling', '5 snap cards', 'Campaign modes'],
}

function openUpgradeSheet(featureId) {
  const bullets = UPGRADE_CONTEXT_BULLETS[featureId] || UPGRADE_CONTEXT_BULLETS['_default']

  // Populate featured Artist card bullets dynamically
  const artistBullets = document.querySelectorAll('#upgradeTierArtist .upgrade-tier-benefits li')
  bullets.forEach((text, i) => {
    if (artistBullets[i]) artistBullets[i].textContent = text
  })

  // Populate context headline
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]')
  const headlineEl = document.getElementById('upgradeSheetContext')
  headlineEl.textContent = getGateHeadline(featureId)  // uses the dynamic copy from tier-gates system

  const sheet = document.getElementById('upgradeSheet')
  sheet.style.display = 'block'
  requestAnimationFrame(() => sheet.classList.add('open'))
}
```

The `featureId` passed to `openUpgradeSheet` is already specified in `GATE_COPY` lookup for every gate in the spec. This requires no new data — it re-uses the context that triggered the gate.

---

## Moment 3: The Pause That Prevents the Cancel

**What it is:** When an artist clicks "Cancel subscription," they do not see a cancellation confirmation screen. They see a single screen with one question — not a retention form, not a survey, not a features list. Just:

"Do you want to take a break instead?"

Below: "Your profile stays live. Your fan list is safe. Pause for a month, then your plan resumes automatically."

CTA: "Take a month off →" — this is the primary action. It is amber, large, takes up most of the tap surface.

Secondary: "No, cancel my plan" — in grey, small, at the bottom. The text does not say "I understand I'll lose my features." It says "No, cancel my plan." One sentence. No guilt.

**Why it's 20/10:** The pause option is specced in SPEC.md §7. The 20/10 version is not the existence of the pause — it is the framing. "Do you want to take a break instead?" is a question a friend would ask, not a retention algorithm. The artist who is struggling financially and reluctantly cancelling will choose the pause if it is offered this way. The artist who genuinely wants to leave will tap the grey button and leave cleanly. Both outcomes are the right one. The platform earns loyalty either way.

**Exact implementation:**

```html
<!-- Cancellation flow — shown when artist taps "Cancel subscription" in Settings -->
<div class="cancel-flow-screen" id="cancelFlowScreen" style="display:none;">
  <div class="cancel-flow-content">
    <h2 class="cancel-flow-heading">Take a break instead?</h2>
    <p class="cancel-flow-body">
      Your profile stays live. Your fan list is safe.
      Pause for a month — your plan resumes automatically after that.
    </p>
    <button class="cancel-flow-pause" onclick="handlePauseSubscription()">
      Take a month off →
    </button>
    <p class="cancel-flow-data-note">
      Your fan data is always yours, whatever you decide.
    </p>
    <button class="cancel-flow-proceed" onclick="handleCancelSubscription()">
      No, cancel my plan
    </button>
  </div>
</div>
```

CSS: `.cancel-flow-pause { width: 100%; padding: 16px; background: var(--acc); color: #000; font-size: 16px; font-weight: 700; border-radius: 12px; border: none; cursor: pointer; margin-bottom: 12px; }` — the pause CTA is the dominant visual. `.cancel-flow-proceed { font-size: 12px; color: var(--t3); background: none; border: none; cursor: pointer; padding: 8px; }` — the cancel link is minimal, visible, and non-guilty.

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when an artist who almost cancelled tells another artist about ABLE — not because they were retained by a dark pattern, but because the platform asked if they needed a break and meant it.
