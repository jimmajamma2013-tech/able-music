# Explainer System — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the explainer that never needs to appear twice — because the first time it appears, it says exactly the one thing the artist needed to understand, in exactly the words they would have used themselves.

---

## Moment 1: The Tooltip That Appears Once and Leaves

**What it is:** Tooltips in ABLE are not persistent UI elements — they are moments. Every tooltip in the system has a `shown_count` tracker stored in `able_dismissed_nudges`. The first time an artist taps the `ⓘ` next to "Snap cards," the tooltip appears with full opacity and the explanatory copy. The second time they tap it, the same copy appears at 70% opacity — the product's way of saying "you've seen this." The third time they tap it, the tooltip is not shown at all. The `ⓘ` icon greys out. The product knows they know.

An artist who fully understands snap cards within 3 visits sees a product that recognises their understanding. They do not see the same beginner explanation forever. The product grows with them.

**Why it's 20/10:** Standard tooltips are stateless — they assume the artist knows nothing every time. The 20/10 version tracks understanding. An artist who has been using ABLE for six months does not need to see "Snap cards — Short updates that live on your page between releases" on every visit. Removing it says: we know you know this. That recognition is respect. It makes the product feel like it is paying attention.

**Exact implementation:**

Extend `initTooltips()` from SPEC.md implementation notes to track show count:

```javascript
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(icon => {
    const key = icon.dataset.tooltipKey  // e.g. 'tooltip-snap-cards'

    // Determine how many times this tooltip has been shown
    const counts = JSON.parse(localStorage.getItem('able_tooltip_counts') || '{}')
    const shown  = counts[key] || 0

    if (shown >= 3) {
      // Seen 3+ times: grey out the icon, disable tooltip
      icon.style.opacity = '0.3'
      icon.title = ''
      return
    }

    icon.addEventListener('click', (e) => {
      e.stopPropagation()

      // Increment count
      counts[key] = shown + 1
      localStorage.setItem('able_tooltip_counts', JSON.stringify(counts))

      // Adjust opacity based on familiarity
      const opacity = shown === 0 ? 1 : 0.7

      toggleTooltip(icon, { opacity })
    })
  })

  document.addEventListener('click', closeAllTooltips)
}
```

HTML attribute: `data-tooltip-key="tooltip-snap-cards"` added alongside `data-tooltip="Short moments..."` on each `ⓘ` element.

The greying-out is the feature. Not hiding the icon entirely — that would make the UI feel broken. Graying it out says: this is still here if you need it, but we know you don't.

---

## Moment 2: The Orientation Card That Knows When Not to Appear

**What it is:** Section orientation cards are shown on first open of a section the artist hasn't used. But the 20/10 version adds one additional condition: the card does not appear if the artist has been active for more than 30 days. An artist who signs up, uses ABLE for a month, and then finally opens the Broadcasts section for the first time is not a beginner. They know how the product works. The orientation card would be condescending.

Instead, when a veteran artist (30+ days, 30+ admin sessions) opens a section for the first time, they see a two-line contextual note — not the full orientation card. For broadcasts: "Write to your list. Plain text, your voice. Your fans asked to hear from you." No three-paragraph explanation. One sentence about what it is. One sentence about what their fans already did. That is all a veteran artist needs.

**Why it's 20/10:** Orientation cards are for new users. Contextual notes are for experienced users encountering a new feature. The distinction is not cosmetic — it is respectful. An artist who has been managing their page for six weeks and then discovers broadcasts for the first time does not need to be told what a fan is. They need to know what this button does. The veteran note says exactly that and nothing more.

**Exact implementation:**

In the orientation card render function, add a veteran check before showing the full card:

```javascript
function shouldShowOrientationCard(nudgeId) {
  const dismissed = JSON.parse(localStorage.getItem('able_dismissed_nudges') || '[]')
  if (dismissed.includes(nudgeId)) return 'none'

  // Check account age and activity
  const firstSeen  = parseInt(localStorage.getItem('able_first_seen') || Date.now())
  const sessionCount = parseInt(localStorage.getItem('able_session_count') || '0')
  const daysSince  = (Date.now() - firstSeen) / 86400000

  if (daysSince > 30 && sessionCount > 30) return 'veteran'
  return 'full'
}
```

Then in the section render:

```javascript
const mode = shouldShowOrientationCard('orientation-broadcasts')

if (mode === 'none') {
  // No card — artist has dismissed or seen it
} else if (mode === 'veteran') {
  showVeteranNote(VETERAN_NOTES['orientation-broadcasts'])
} else {
  showOrientationCard('orientation-broadcasts')
}
```

Veteran notes inventory (two lines each):

| Section | Line 1 | Line 2 |
|---|---|---|
| Broadcasts | Write to your list. Plain text, your voice. | Your fans asked to hear from you. |
| Snap Cards | A moment between releases — a thought, a clip. | It lives on your page until you replace it. |
| Close Circle | Let people support you monthly, directly. | You set the amount. |
| Gig Mode | Your page shifts — venue, time, tickets front. | Resets automatically after 24 hours. |
| Connections | The people you've made music with. | Confirmed by both sides. |

CSS: `.veteran-note { font-size: 13px; color: var(--t2); line-height: 1.6; padding: 12px 0; border-top: 1px solid var(--dash-border); }` — understated, not a card, just text.

---

## Moment 3: The Help Doc That Writes Itself

**What it is:** When an artist submits a support ticket via the in-app "Report an issue" form, the ticket is routed through the AI VA (Phi-4 14B via n8n) before reaching James. The VA produces three things: a P0/P1/P2/P3 classification, a probable root cause category, and — if the issue is a common question rather than a bug — a direct link to the relevant section of the help docs.

If no help doc exists for this issue, the VA flags it with: "No existing documentation covers this. Draft a help doc paragraph?" James approves the draft, and the help doc is updated. Every support ticket that reveals a documentation gap generates its own documentation within 24 hours.

**Why it's 20/10:** Help docs that are written from the inside out — by developers who know the product — consistently miss the questions real users actually ask. Help docs written from support tickets are the inverse: they are the product of confusion, corrected. The 20/10 version uses every support ticket as a signal to make the explainer system more complete. The artist who asks a question today prevents a thousand future artists from having the same confusion — because their question becomes the next help doc paragraph.

**Exact implementation:**

n8n flow triggered by new Supabase row in `support_tickets`:

```
Trigger: Supabase webhook → new row in support_tickets

Node 1 — Triage (Phi-4 14B via Ollama API):
  Input: ticket text + artist account age + browser/device if captured
  Output: { priority, category, is_common_question, existing_doc_id or null }

Node 2 — If is_common_question is true:
  → Telegram to James: "[P{priority}] {category}: '{ticket summary}' — see {doc_link}"
  → Mark ticket: auto_response_available = true

Node 3 — If no existing doc:
  → AI generates a draft help doc paragraph (150 words max, ABLE voice)
  → Telegram to James: "New topic not in docs. Draft: '{draft paragraph}'. Approve to add?"
  → Wait for James's reply

Node 4 — If James approves:
  → Update help docs Markdown file (or Notion database, depending on implementation)
  → Link this ticket to the new doc for future reference
  → Reply to artist with direct link to the new doc section
```

The help doc paragraph format enforced by the AI generation prompt:

```
System: You write help documentation for ABLE in two parts:
  1. What this thing is — one sentence, plain English, no jargon
  2. What to do if it has gone wrong — specific steps, numbered, under 4 steps
Voice: Direct, factual, no reassurance words ("Don't worry", "This is easy", "Simply").
Max length: 120 words.
```

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when an artist opens a section they haven't used before, sees exactly two sentences explaining what it does, and starts using it immediately — because the two sentences said the only thing they needed to know, in the words they would have used to describe what they were looking for.
