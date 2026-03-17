# Build-Your-Own Tools — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when an artist says "ABLE knows things about my audience that I didn't know were knowable."

---

## Moment 1: The Campaign State at Sign-Up

**What it is:** The Fan CRM captures which campaign state was active the moment each fan signed up, surfacing intelligence that no generic email tool can generate.

**Why it's 20/10:** A musician with 300 fans has always known how many they have. They have never known that 42 of them signed up during the pre-save countdown — and that those 42 open every email at twice the rate of fans who signed up in profile mode. The moment an artist sees that breakdown for the first time, they understand something about their own audience that no tool has ever shown them. That is a discovery, not a feature.

**Exact implementation:**

Fan capture in `able-v7.html` — append `campaignState` to the fan record at write time:

```js
// In the fan sign-up handler, read current state before writing
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
const stateNow = profile.stateOverride || 'profile'
const fanRecord = { email, ts: Date.now(), source: utmSource, campaignState: stateNow }
fans.push(fanRecord)
localStorage.setItem('able_fans', JSON.stringify(fans))
```

In the admin Fan CRM, add a segment row above the fan list:

```
Your fans by moment
──────────────────────────────────────────
Pre-save fans       42     [Filter]
Gig fans            8      [Filter]
Social fans         58     [Filter]
Other               11     [Filter]
```

Copy on hover over "Pre-save fans": "These people signed up while your release was counting down. They're your most interested listeners."

When an artist exports to CSV, add a `campaign_state` column. The column header in the CSV is `moment_of_signup` — plain language, not a technical label.

---

## Moment 2: The Uptime Page That Makes ABLE Look Bigger Than It Is

**What it is:** A public status page at `status.ablemusic.co` built from a GitHub Action — green/amber/red for Supabase, Netlify, and Resend — that any artist can check when something feels wrong.

**Why it's 20/10:** An independent artist using a tool they pay £9/month for has no idea whether a problem is their fault or the platform's. An uptime page removes that ambiguity. But more than that: it signals that ABLE is run by someone who takes reliability seriously. Statuspage.io charges £79/month for the same green dot. When an artist sees `status.ablemusic.co`, they feel safe with their data on ABLE in a way that no landing page copy can produce. Trust built by infrastructure, not promises.

**Exact implementation:**

GitHub Action (`.github/workflows/status-check.yml`):

```yaml
name: Status Check
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check services
        run: |
          node scripts/check-status.js
      - name: Commit status.json
        run: |
          git config user.email "status@ablemusic.co"
          git config user.name "ABLE Status Bot"
          git add public/status.json
          git diff --staged --quiet || git commit -m "status: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
          git push
```

`status.html` top banner — the three states, exact copy:

- All green: "Everything is running normally."
- One amber: "Degraded performance on [service]. Your page and fan sign-ups are not affected."
- One red: "We're aware of an issue with [service] and are monitoring it. Fan sign-ups may be delayed."

The incident log is the git history of `status.json`. No separate incident database needed.

---

## Moment 3: The Analytics Dashboard Sentence That Mixpanel Cannot Write

**What it is:** A single sentence in the analytics dashboard, generated from ABLE's own campaign state data, that quantifies the value of each page mode in a way no generic analytics tool can produce.

**Why it's 20/10:** Mixpanel, PostHog, and Google Analytics can tell an artist how many people visited their page. None of them can write: "Your pre-release countdown converts fans at 6.2% — three times higher than your default profile state." That sentence exists only because ABLE captures both the page view and the fan sign-up, knows which state was active for each, and can do the arithmetic. The first time an artist reads it, they understand that ABLE is not a link-in-bio tool. It is an intelligence layer.

**Exact implementation:**

In `admin.html` analytics section, above the source breakdown bar chart, add a "Campaign insight" card. It renders only when the artist has data from at least two different states:

```js
function buildCampaignInsight(views, fans) {
  // Group fan conversion rate by campaignState
  const stateViews  = {}
  const stateFans   = {}
  views.forEach(v => { stateViews[v.state]  = (stateViews[v.state]  || 0) + 1 })
  fans.forEach(f  => { stateFans[f.campaignState] = (stateFans[f.campaignState] || 0) + 1 })

  const rates = Object.keys(stateViews).map(state => ({
    state,
    rate: stateFans[state] ? (stateFans[state] / stateViews[state]) * 100 : 0
  })).sort((a, b) => b.rate - a.rate)

  if (rates.length < 2 || rates[0].rate === 0) return null

  const best   = rates[0]
  const worst  = rates[rates.length - 1]
  const labels = { pre: 'pre-release countdown', live: 'release week', gig: 'gig mode', profile: 'default profile' }

  return `Your ${labels[best.state]} converts fans at ${best.rate.toFixed(1)}% —
  ${Math.round(best.rate / Math.max(worst.rate, 0.1))}× higher than your ${labels[worst.state]}.`
}
```

The insight card uses no chart — just the sentence, set in `font-size: 1rem`, `font-weight: 500`, inside a card with the accent colour at 8% opacity as background. One sentence. No decoration.

---

## The 20/10 test

An artist reads the campaign insight sentence, screenshots it, and sends it to another artist — not because it looks good, but because they've never seen their own data explained to them that clearly before.

---

*See also: `docs/systems/build-your-own/SPEC.md` — full specs for all 15 tools*
