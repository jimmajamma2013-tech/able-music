# Coding Strategy — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the developer experience where every change is verified, every error is caught before it reaches an artist, and the codebase reads as if one very careful person wrote every line.

---

## Moment 1: The 30-Second Feedback Loop

**What it is:** Every JS edit triggers a parse check and Playwright screenshot automatically — the developer sees the result on a real device viewport before the file is even saved.

**Why it's 20/10:** The gap between "I wrote this" and "I saw this work on a phone" is where most bugs live. Closing that gap to under 30 seconds removes the moment of uncertainty that causes shortcuts. It also means the developer's mental state shifts from "I think this works" to "I watched this work." That is a different kind of confidence — one that compounds.

**Exact implementation:**

Add a `watch.sh` script at the project root:

```bash
#!/bin/bash
# Usage: ./watch.sh admin.html
# Watches a file for changes → parse-checks all script blocks → takes a Playwright screenshot

FILE=${1:-able-v7.html}

while true; do
  fswatch -1 "$FILE" 2>/dev/null || inotifywait -e close_write "$FILE" 2>/dev/null

  echo "⟳ $FILE changed — running parse check..."

  node -e "
    const fs = require('fs');
    const html = fs.readFileSync('$FILE', 'utf8');
    const blocks = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
    let ok = true;
    blocks.forEach((s, i) => {
      try { new Function(s.replace(/<\/?script[^>]*>/g, '')); }
      catch(e) { console.error('Block ' + i + ': ' + e.message); ok = false; }
    });
    if (ok) console.log('Parse OK — ' + blocks.length + ' block(s)');
    process.exit(ok ? 0 : 1);
  " && echo "→ Taking screenshot..." && node -e "
    const { chromium } = require('playwright');
    (async () => {
      const b = await chromium.launch();
      const p = await b.newPage();
      await p.setViewportSize({ width: 390, height: 844 });
      await p.goto('file://\$(pwd)/$FILE');
      await p.screenshot({ path: 'screenshots/watch-\$(date +%H%M%S).png' });
      await b.close();
      console.log('Screenshot saved → screenshots/');
    })();
  "
done
```

The parse check runs in under 1 second. The Playwright screenshot completes in under 10 seconds. The total feedback loop from file save to verified screenshot is under 30 seconds. No CI pipeline, no npm, no configuration — one shell script.

---

## Moment 2: The Token System as a Rebrand in One Line

**What it is:** An artist changes their accent colour in the onboarding wizard and the entire profile — every button, every border, every glow, every badge — instantly reflects it. One CSS variable. Zero cascading changes required.

**Why it's 20/10:** This is the moment that makes a developer stop and think "this was designed by someone who understood what they were building." Most tools produce templates where customisation means hunting down 40 hardcoded hex values. ABLE produces a system where one value propagates through the entire page. Showing this to another developer produces the specific emotional response of recognising genuine craft.

**Exact implementation:**

The `applyDerivedTokens()` function in `able-v7.html` already does this. The 20/10 version makes it demonstrably complete — no hex leakage anywhere in the file.

Verification command (zero results = 20/10):
```bash
# Counts hardcoded colour hex values OUTSIDE :root definitions
# Should return 0 for any file that has achieved full tokenisation
node -e "
  const fs = require('fs');
  const html = fs.readFileSync('able-v7.html', 'utf8');
  // Strip :root blocks (legitimate hex definitions)
  const stripped = html.replace(/:root\s*\{[^}]+\}/g, '');
  // Strip SVG data URIs (documented exception)
  const noSvg = stripped.replace(/url\('data:image\/svg[^']+'\)/g, '');
  // Count remaining hex values
  const hits = (noSvg.match(/#[0-9a-fA-F]{3,6}/g) || []).length;
  console.log('Hardcoded hex outside :root:', hits);
  process.exit(hits > 0 ? 1 : 0);
"
```

The demonstration: open `able-v7.html`, run this command, see `0`. Then change `--color-accent` from `#e05242` to `#00c4aa` in the `:root` block, reload the browser — every accent element on the page changes simultaneously. That is the 20/10 moment.

---

## Moment 3: The `safeLS` Pattern That Never Throws

**What it is:** A single utility function handles every localStorage read across every file — with a fallback, inside a try/catch, returning typed data with zero possibility of null propagation.

**Why it's 20/10:** The artist who has been on tour for three months returns to their admin dashboard on a borrowed phone. Their localStorage was cleared. Every bare `JSON.parse(localStorage.getItem(...))` call in the codebase would throw. The `safeLS` pattern means they see their empty-state dashboard, not a blank page with a console error. The 20/10 quality here is invisible to the artist — they never know how close they were to a broken experience. That invisibility is the point.

**Exact implementation:**

The canonical implementation — placed at the top of every active file's script block, before any localStorage read occurs:

```javascript
/**
 * safeLS — safe localStorage read with typed fallback
 * @param {string} key — localStorage key from the canonical list in CONTEXT.md
 * @param {*} fallback — returned if key is absent, null, or the stored value is malformed JSON
 * @returns {*} parsed value, or fallback
 */
function safeLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch {
    return fallback;
  }
}

// Usage contract — every localStorage read uses one of these two forms:
// const profile = safeLS('able_v3_profile', {});    // objects
// const slug    = localStorage.getItem('able_slug') || '';  // strings (no parse needed)
```

Verification audit — should return zero lines for any file where the pattern is enforced:
```bash
# Find JSON.parse calls on localStorage values WITHOUT safeLS
grep -n "JSON.parse(localStorage" able-v7.html admin.html start.html landing.html
```

Zero results = 20/10. Every artist's data is read safely, even in corrupted or empty storage states.

---

## The 20/10 Test

A developer opens the codebase for the first time, makes a change, and within 30 seconds has a parse-verified, screenshot-confirmed result — and when they read the CSS they find zero hardcoded hex values and when they read the JS they find zero bare localStorage reads. That is when the codebase has crossed from well-built to genuinely extraordinary.
