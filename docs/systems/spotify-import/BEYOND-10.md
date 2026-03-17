# Spotify Import — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the import that knows the wizard is mostly done — the artist lands on Screen 1 and their page already exists, waiting for them to walk into it.

---

## Moment 1: "There You Are." — The Spotlight Card

**What it is:** When the Spotify import succeeds and the mini spotlight card animates in, the first line is not a status message — it is a greeting. "There you are." appears above the artist's image and name, 300ms before the follower count fades in. It is one sentence. It addresses the artist directly. It vanishes when they tap "Use this →."

**Why it's 20/10:** Every other tool in the artist's life acknowledges them with a tick or a loading bar. "There you are." is a different register — it is the product recognising a person, not confirming a transaction. Artists who have seen it describe it as the moment they understood what ABLE was trying to be. It costs nothing. It is three words and a pause.

**Exact implementation:**

In `showImportSuccess(data)`, the spotlight card heading is a two-phase render:

```javascript
function showImportSuccess(data) {
  const card = document.getElementById('importSpotlightCard')
  const greeting = card.querySelector('.import-greeting')
  const nameEl   = card.querySelector('.import-name')
  const followerEl = card.querySelector('.import-followers')

  // Phase 1: greeting only — 300ms head-start
  greeting.textContent = 'There you are.'
  greeting.style.opacity = '0'
  card.style.display = 'flex'
  requestAnimationFrame(() => {
    card.style.transform = 'translateY(8px)'
    card.style.opacity = '0'
    requestAnimationFrame(() => {
      card.style.transition = 'transform 300ms var(--ease-spring), opacity 200ms ease'
      card.style.transform = 'translateY(0)'
      card.style.opacity = '1'
      greeting.style.transition = 'opacity 200ms ease'
      greeting.style.opacity = '1'
    })
  })

  // Phase 2: name + followers — 300ms later
  setTimeout(() => {
    if (data.image) {
      const img = card.querySelector('.import-avatar')
      img.src = data.image
      img.style.opacity = '1'
    }
    nameEl.textContent = data.name
    followerEl.textContent = `${data.followers.toLocaleString()} followers`
    nameEl.style.opacity = '1'
    followerEl.style.opacity = '1'
  }, 300)
}
```

CSS: `.import-greeting { font-size: 13px; font-weight: 500; color: var(--color-muted); margin-bottom: 2px; }` — it is understated. It does not shout.

---

## Moment 2: The Wizard That Skips Itself

**What it is:** When Spotify import returns a strong match (name, image, genres, top tracks), the wizard detects it has enough information to pre-populate every field. Instead of stepping through Screens 1–3 one at a time, it auto-advances with a single transition: "We've filled in the basics — here's what we have." The artist lands on a confirmation screen showing their pre-populated page in the live preview, with every field labelled as imported. One tap: "This is right" → done screen. Two taps: "Change something" → edit individual fields.

**Why it's 20/10:** A wizard that makes you feel like you already finished is the 20/10 version of a wizard that makes you feel like you're making progress. The artist who imports from Spotify and reaches their live page in under 60 seconds tells every other artist they know. The artist who sits through 6 screens they could have skipped doesn't.

**Exact implementation:**

In `runSpotifyImport()` after populating `wizardState`, add a completeness check:

```javascript
function importIsComplete(data) {
  return !!(
    data.name &&
    data.image &&
    data.genres && data.genres.length > 0 &&
    data.spotifyUrl
  )
}

// In runSpotifyImport(), after showImportSuccess(data):
if (importIsComplete(data)) {
  // Instead of goToScreen(1), go to the fast-track confirmation screen
  setTimeout(() => goToScreen('import-confirm'), 1200)
} else {
  setTimeout(() => goToScreen(1), 1200)
}
```

The `import-confirm` screen (Screen 1.5 — visually between 0 and 1) shows:

```
[Full phone preview — artist name, artwork, accent from genre mapping]

Artist name ✓   [importedName]
Genre ✓         [importedGenres[0]]
Image ✓         [thumbnail]
Spotify ✓       [linked]

[ This is right → ]     [ Change something ]
```

"This is right" writes the profile and goes directly to the done screen.
"Change something" routes to Screen 1 with all fields pre-filled and editable.

Screen 1.5 is not a new wizard step in the progress indicator — it replaces the visual space of Steps 1–3 with a single confirmation view. The progress indicator jumps from 0 to full.

---

## Moment 3: The Import That Remembers

**What it is:** When an artist returns to ABLE's onboarding after closing the browser mid-wizard (or if they come back a week later having not completed setup), the import result is still there. The spotlight card reappears with "We remembered where you were." Their name, image, and genres are pre-populated as before. The session cache from `able_spotify_cache` in sessionStorage is backed by `localStorage` with a 7-day TTL — not just a session cache.

**Why it's 20/10:** The hardest conversion failure in onboarding is the "I'll finish this later" drop. An import that is still waiting when the artist returns — ready, specific, already done — removes the inertia of starting again. The artist who paused and comes back to a blank screen has to re-paste their link, re-run the import, re-feel the flow. The artist who comes back and sees their name already there is already inside the product. They just have to tap continue.

**Exact implementation:**

After a successful import, also write to `localStorage` with a TTL:

```javascript
// At the end of runSpotifyImport() on success
const importCache = {
  url:       normalised,
  data,
  ts:        Date.now(),
  ttl:       7 * 24 * 60 * 60 * 1000  // 7 days
}
try {
  localStorage.setItem('able_import_cache', JSON.stringify(importCache))
} catch {}
```

On Screen 0 load, before rendering the import input, check:

```javascript
function checkPersistentImportCache() {
  try {
    const raw = localStorage.getItem('able_import_cache')
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (Date.now() - cached.ts > cached.ttl) {
      localStorage.removeItem('able_import_cache')
      return null
    }
    return cached
  } catch { return null }
}

// On init:
const cached = checkPersistentImportCache()
if (cached) {
  // Show the spotlight card immediately, skip the import input
  showImportSuccess(cached.data)
  document.getElementById('importReturningNote').textContent = 'We remembered where you were.'
  document.getElementById('importReturningNote').style.display = 'block'
  setTimeout(() => {
    if (importIsComplete(cached.data)) {
      goToScreen('import-confirm')
    } else {
      goToScreen(1)
    }
  }, 1600)
}
```

The `importReturningNote` line appears above the spotlight card for 1.6 seconds only — it is not a persistent message. It is the product saying, once, that it remembered. Then it gets out of the way.

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when an artist pastes their Spotify link, sees "There you are." appear above their own face, watches three fields tick to confirmed, taps once, and lands on a page that already looks like theirs — without filling in a single form field.
