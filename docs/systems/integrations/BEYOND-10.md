# Integrations — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is an onboarding where an artist pastes one URL, and ABLE fills in 80% of their profile before they've typed a word — and then shows them exactly what their page already looks like.

---

## Moment 1: The Spotify Import That Fills the Page

**What it is:** In the onboarding wizard, an artist pastes their Spotify artist URL. Within 3 seconds, their name, artwork, genres, and top track are pulled in and the live preview on the right side of the screen updates in real time. The artist sees their page taking shape before they have typed a single character.

**Why it's 20/10:** Onboarding is where artists decide whether ABLE is worth their time. The moment the import resolves and the preview renders with their name and artwork, something shifts: this is already me. The page is not a template they are filling in — it is already theirs. The Spotify import is not a time-saving feature. It is the moment of recognition that converts a sceptical artist into an engaged one. Every second they spend filling in a form before seeing their page is a second they might leave.

**Exact implementation:**

In `start.html`, the Spotify import triggers the live preview update immediately on data return:

```javascript
async function handleSpotifyImport(artistId) {
  setImportLoading(true);

  try {
    const res = await fetch('/.netlify/functions/spotify-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artistId }),
    });

    if (!res.ok) throw await res.json();
    const data = await res.json();

    // Populate form fields silently — no alert, no "import complete" banner
    document.getElementById('artistName').value = data.name;
    document.getElementById('artistArtwork').src = data.images[0]?.url || '';
    if (data.genres?.[0]) {
      // Map first genre to nearest ABLE feel token
      document.getElementById('artistFeel').value = genreToFeel(data.genres[0]);
    }

    // Update the live preview panel — this is the 20/10 moment
    updatePreview({
      name:       data.name,
      artworkUrl: data.images[0]?.url,
      spotifyUrl: `https://open.spotify.com/artist/${artistId}`,
    });

    setImportLoading(false);

    // Subtle confirmation — not a toast, just the preview updating is enough
    // The visual change IS the confirmation
  } catch (err) {
    setImportLoading(false);
    showImportError(importErrorCopy(err.code));
  }
}

// Map Spotify genre strings to ABLE feel tokens
function genreToFeel(genre) {
  const g = genre.toLowerCase();
  if (g.includes('hip hop') || g.includes('rap'))    return 'hiphop';
  if (g.includes('r&b') || g.includes('soul'))       return 'rnb';
  if (g.includes('electronic') || g.includes('edm')) return 'electronic';
  if (g.includes('indie'))                            return 'indie';
  if (g.includes('pop'))                              return 'pop';
  if (g.includes('rock') || g.includes('metal'))     return 'rock';
  if (g.includes('folk') || g.includes('acoustic'))  return 'folk';
  return null; // Do not force a feel if genre doesn't map cleanly
}
```

The live preview panel in `start.html` updates without debounce when the import resolves. The artist watches their artwork appear, their name appear, their profile fill in. There is no "Import complete" message. The visual change is the message.

---

## Moment 2: Shows That Are Already There

**What it is:** After the Spotify import step, ABLE auto-runs a Ticketmaster lookup for the artist's name. If upcoming shows are found, they appear in the wizard preview with a single confirmation prompt: "[N] shows found. Add them to your page?" The artist taps yes and their shows section is populated. They did not enter a single date or venue name.

**Why it's 20/10:** For a touring artist, manually entering their shows is the second most painful part of any link-in-bio setup. They have done it on every platform. ABLE does it for them, silently, in the background, while they are still choosing their accent colour. The copy "shows found" is deliberate — it is a discovery, not a feature. The artist did not request this. ABLE found something for them. That asymmetry — ABLE doing work the artist did not ask for — is the signature of a platform that thinks ahead.

**Exact implementation:**

```javascript
// In start.html — triggered automatically after Spotify import resolves
async function autoImportShows(artistName) {
  try {
    const res = await fetch('/.netlify/functions/ticketmaster-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artistName }),
    });
    if (!res.ok) return; // Silent fail — shows auto-import is best-effort

    const data = await res.json();
    if (!data.shows || data.shows.length === 0) return; // Nothing found — no UI

    // Show the confirmation prompt in the wizard
    showShowsFound(data.shows);
  } catch (_) {
    // Silent — the artist will add shows manually if needed
  }
}

function showShowsFound(shows) {
  const el = document.getElementById('showsFoundPrompt');
  const count = shows.length;

  document.getElementById('showsFoundCount').textContent =
    count === 1
      ? '1 show found.'
      : `${count} shows found.`;

  document.getElementById('showsFoundConfirm').onclick = () => {
    // Write shows to sessionStorage — picked up by saveProfile() on completion
    sessionStorage.setItem('able_wizard_shows', JSON.stringify(shows));
    el.hidden = true;
    showToast('Shows added to your page.', 'green');
  };

  document.getElementById('showsFoundSkip').onclick = () => {
    el.hidden = true;
  };

  el.hidden = false;
}
```

```html
<!-- start.html — shows found prompt, slides in below the Spotify import result -->
<div id="showsFoundPrompt" hidden class="shows-found-prompt">
  <span id="showsFoundCount"></span> Add them to your page?
  <button id="showsFoundConfirm" class="link-btn-accent">Yes →</button>
  <button id="showsFoundSkip" class="link-btn-muted">Skip</button>
</div>
```

---

## Moment 3: The Linktree Import That Removes the Switching Cost

**What it is:** In `start.html`, below the Spotify URL field, a secondary option appears: "Coming from Linktree? Paste your URL." The artist pastes their `linktr.ee/username`. ABLE parses the public page, extracts all links, and shows a preview: "We found 6 links. Pick the ones to keep." The artist toggles which links become their Quick Action pills. Their entire Linktree is now their ABLE profile.

**Why it's 20/10:** The single biggest barrier to switching platforms is existing setup. An artist who has spent an hour building their Linktree is not going to rebuild it manually on a new platform, even if the new platform is better. The Linktree import removes this entirely. It does not say "we're better than Linktree." It says "bring what you've already built." The moment the artist sees their own link labels appearing in the ABLE wizard, the switching cost drops to near zero. They are not starting over. They are arriving.

**Exact implementation:**

```javascript
// start.html — Linktree import handler
async function handleLinktreeImport(ltUrl) {
  if (!/^https?:\/\/(www\.)?linktr\.ee\//.test(ltUrl)) {
    showImportError("That doesn't look like a Linktree URL — try linktr.ee/yourname.");
    return;
  }

  setLinktreeLoading(true);

  try {
    const res = await fetch('/.netlify/functions/linktree-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: ltUrl }),
    });
    if (!res.ok) throw await res.json();
    const data = await res.json();

    setLinktreeLoading(false);
    renderLinktreePicker(data.links);

  } catch (err) {
    setLinktreeLoading(false);
    showImportError("Couldn't read that page — paste your links manually.");
  }
}

function renderLinktreePicker(links) {
  const container = document.getElementById('linktreePicker');
  container.innerHTML = `
    <p class="picker-label">We found ${links.length} links. Pick the ones to keep.</p>
    ${links.map((link, i) => `
      <label class="link-picker-row">
        <input type="checkbox" name="ltLink" value="${i}" checked>
        <span class="link-picker-icon link-picker-icon--${link.platform}"></span>
        <span class="link-picker-label">${link.title}</span>
        <span class="link-picker-url">${new URL(link.url).hostname}</span>
      </label>
    `).join('')}
    <button class="btn-primary" onclick="confirmLinktreeImport(${JSON.stringify(links).replace(/"/g, '&quot;')})">
      Import selected →
    </button>
  `;
  container.hidden = false;
}

function confirmLinktreeImport(allLinks) {
  const checked = [...document.querySelectorAll('input[name="ltLink"]:checked')]
    .map(el => allLinks[parseInt(el.value)]);

  // Write selected links as Quick Action CTAs
  sessionStorage.setItem('able_wizard_quick_actions', JSON.stringify(
    checked.map(l => ({ label: l.title, url: l.url, type: l.platform || 'link' }))
  ));

  document.getElementById('linktreePicker').hidden = true;
  showToast(`${checked.length} links imported.`, 'green');
}
```

---

## The 20/10 test

You know the integrations system has crossed into extraordinary when an artist who was on Linktree pastes one URL, confirms two prompts, and sees their page — with their shows, their links, and their Spotify artwork — fully populated before they've written a single word of their own.
