# Data Architecture — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a data layer so clean, so invisible, and so intelligent that an artist migrates from localStorage to Supabase without touching a setting, and ABLE knows things about their audience that no other platform could have known.

---

## Moment 1: The Silent Migration

**What it is:** The `flushToSupabase()` function runs in 8 lines of orchestration after first auth, and the artist never sees a loading spinner, a migration message, or a "syncing" state. Their data simply appears in the cloud.

**Why it's 20/10:** Every other platform with a migration makes the artist feel the friction. They show progress bars, warnings, "this may take a moment." ABLE's migration is silent because it is fast and idempotent. The artist logs in, and their 73 fans, their 4 shows, their profile — all of it is there. The only signal that something happened: a quiet green toast that says "Your data is synced." No drama. The emotional register is relief, not effort.

**Exact implementation:**

```javascript
// Called once after auth.signIn() resolves — before admin.html renders its first state
async function silentFlush(supabase, artistId) {
  const { success, errors } = await flushToSupabase(supabase, artistId);

  // The only user-visible signal — a green toast that fades in 5 seconds
  if (success) {
    showToast('Your data is synced.', 'green');
  } else {
    // Log silently — localStorage is still the fallback, no user action needed
    console.warn('[ABLE] Flush partial:', errors);
    // No toast — the artist still has full functionality via localStorage
    // The flush will retry on next login
  }
}
```

The `showToast('Your data is synced.', 'green')` call triggers the existing toast component. The artist sees it for 5 seconds and it dismisses itself. They are in their dashboard. Nothing broke. Everything worked. The migration is done.

---

## Moment 2: The Campaign State Intelligence

**What it is:** Every fan sign-up record captures `pageState` at the moment of sign-up — the profile was in `pre-release`, `live`, `gig`, or `profile` mode when that specific fan arrived. Over time, this becomes a segmentation layer no other platform has: which fans arrived during a campaign vs. which found you between campaigns.

**Why it's 20/10:** No link-in-bio tool, no Mailchimp, no Linktree captures what was happening when a fan joined. ABLE captures it in one field. Six months after release, an artist can see: "Of my 340 fans, 180 signed up during the Echoes campaign. I should email them when I announce the follow-up." That is intelligence that feels like a superpower. The artist did not build this — ABLE built it by being precise about what it records.

**Exact implementation:**

In `able-v7.html` fan sign-up handler:

```javascript
// Capture state at the exact moment of sign-up — never derived retroactively
const fanRecord = {
  email,
  ts: Date.now(),
  source: urlParams.get('src') || 'direct',
  pageState: computedPageState,    // 'profile' | 'pre-release' | 'live' | 'gig'
  releaseTitle: profile.releaseTitle || null,  // which release they signed up for
  sessionId: SESSION_ID,           // links this sign-up to their clicks
  optIn: true,
  consent_ts: new Date().toISOString(),
};
```

In `admin.html` fan list, a segmentation label renders under each fan's email:

```html
<!-- Rendered per fan in the fan list -->
<span class="fan-campaign-badge fan-campaign-badge--{{ fan.pageState }}">
  {{ pageStateLabelMap[fan.pageState] }}
</span>
```

```javascript
const pageStateLabelMap = {
  'pre-release': 'Signed up before Echoes',
  'live':        'Signed up on release day',
  'gig':         'Signed up at the show',
  'profile':     'Found you directly',
};
```

CSS badge: `background: rgba(var(--acc-rgb), 0.1); color: var(--acc); font-size: 10px; padding: 2px 7px; border-radius: 100px; font-weight: 600;`

---

## Moment 3: The Data Export That Builds Trust

**What it is:** The fan list CSV export includes a `campaign_context` column — the release title and page state at sign-up — so when an artist imports their list into Mailchimp or Klaviyo, they can immediately segment by which campaign a fan arrived through.

**Why it's 20/10:** Data portability is a legal requirement (GDPR). Most platforms offer it grudgingly — a raw CSV with no context. ABLE's export is a gift: it contains more insight than what the artist could reconstruct themselves. When they open the spreadsheet, they do not just see emails — they see a story. "42 fans came in during the pre-release window. 18 signed up on release day. 9 found me at the Jazz Café." This is the moment an artist decides ABLE is not a tool, it's a partner.

**Exact implementation:**

```javascript
function exportFansAsCSV() {
  const fans = safeGet('able_fans', []);
  const starred = new Set(safeGet('able_starred_fans', []));

  const header = [
    'Email', 'Name', 'Date joined', 'Source',
    'Signed up during',    // human-readable pageState
    'Release',             // releaseTitle at sign-up
    'Starred', 'Opted in'
  ];

  const pageStateCopy = {
    'pre-release': 'Pre-release campaign',
    'live':        'Release day',
    'gig':         'Live show',
    'profile':     'Between campaigns',
  };

  const rows = fans.map(f => [
    f.email,
    f.name || '',
    new Date(f.ts).toISOString().split('T')[0],
    f.source,
    pageStateCopy[f.pageState] || 'Unknown',
    f.releaseTitle || '',
    (f.isStarred || starred.has(f.email)) ? 'Yes' : 'No',
    f.optIn ? 'Yes' : 'No',
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  a.download = `able-fans-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
```

---

## The 20/10 test

You know the data architecture has crossed into extraordinary when an artist exports their fan list, opens it in a spreadsheet, and says: "This tells me more about my audience than I knew I had."
