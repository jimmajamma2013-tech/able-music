# Tier Gate System — Path to 10
**Date: 2026-03-16 | Updated: 2026-03-16 (session 12)**
**~~Current score: 3.7/10~~ Updated: 7/10 — P0 complete**
**Target: 7/10 after checkTierGate() + gold lock CSS implemented ✅**
**Target: 9/10 after server-side enforcement**
**Target: 10/10 after billing is live and tested**

---

## The localStorage vulnerability and V2 plan

**Read ANALYSIS.md first.** The critical context: every tier gate currently reads from `localStorage.getItem('able_tier')`. A user who opens DevTools and sets `localStorage.setItem('able_tier', 'artist-pro')` immediately bypasses every gate. This is V1 acceptable (no real money at stake, no registered users yet). It becomes unacceptable the moment Stripe subscriptions go live.

**V2 plan: server-side tier enforcement via Supabase RLS**

When Supabase auth is wired:
1. The artist's tier lives in `profiles.tier` in Supabase, not in localStorage
2. Supabase Row Level Security (RLS) policies enforce what each tier can read/write at the database level
3. The client reads tier from the authenticated session, not from localStorage
4. localStorage.setItem cannot change what the server returns

Until then: localStorage is the tier source of truth, and the gates are front-end only.

---

## P0 — Current (3.7/10) → 7/10
**Theme: Make the gate system buildable and wire it consistently**

---

### P0.1 — `checkTierGate(featureName)` function

Add this function to the shared admin JS. It is the single entry point for all tier checks. Every feature that needs a gate calls this and gets a boolean.

```javascript
/**
 * checkTierGate
 * Returns true if the current artist has access to the named feature.
 * Returns false if the feature is above their tier.
 *
 * featureName must match a key in GATE_COPY (e.g. 'email-broadcasts', 'snap-cards').
 *
 * KNOWN VULNERABILITY (V1): tier is read from localStorage and can be manipulated
 * via DevTools. This is accepted for V1 (no real money at stake). Close in V2 via
 * Supabase RLS + server-side enforcement. See ANALYSIS.md for full context.
 */
function checkTierGate(featureName) {
  const gateConfig = GATE_COPY[featureName];
  if (!gateConfig) {
    // Unknown feature — fail open (don't block unknown features)
    console.warn(`checkTierGate: unknown feature "${featureName}" — failing open`);
    return true;
  }
  return tierAtLeast(gateConfig.tier);
}

// Tier hierarchy
const TIER_ORDER = { free: 0, artist: 1, 'artist-pro': 2, label: 3 };

function getCurrentTier() {
  return localStorage.getItem('able_tier') || 'free';
}

function tierAtLeast(required) {
  return (TIER_ORDER[getCurrentTier()] || 0) >= (TIER_ORDER[required] || 0);
}
```

**Usage across admin.html:**
```javascript
// Check before rendering a gated section:
if (!checkTierGate('email-broadcasts')) {
  document.getElementById('emailBroadcastsSection').classList.add('tier-gated');
}

// Or use the declarative applyGates() approach (see P0.2):
applyGates(); // Called once on page load — handles all .tier-gate elements automatically
```

---

### P0.2 — Gold lock CSS component (`.tier-gate`)

The gold lock pattern is the visual system for all gated features. Blurred preview behind an amber overlay with a specific value proposition. This is the component from `SPEC.md §2.1`. It must be consistent across every gated feature — no bare padlock icons, no toast-based gates, no redirects.

```css
/* ── Tier gate wrapper ── */
.tier-gate {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

/* ── Blurred preview (the actual feature content, dimmed) ── */
.tier-gate-content {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
  opacity: 0.55;
}

/* ── Gold overlay ── */
.tier-gate-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: rgba(9, 9, 15, 0.72);           /* --bg at 72% */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.22); /* amber at 22% */
  text-align: center;
}

/* ── Icon (✦ is the ABLE tier marker) ── */
.tier-gate-icon {
  font-size: 18px;
  color: var(--acc);
  line-height: 1;
}

/* ── Specific value headline ── */
.tier-gate-headline {
  font-family: var(--font);
  font-size: 13px;
  font-weight: 500;
  color: var(--dash-text);
  line-height: 1.45;
  max-width: 260px;
  margin: 0;
}

/* ── CTA button ── */
.tier-gate-cta {
  margin-top: 4px;
  padding: 8px 18px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 700;
  color: var(--acc);
  background: rgba(var(--acc-rgb), 0.12);
  border: 1px solid rgba(var(--acc-rgb), 0.30);
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease;
  min-height: 36px;
  white-space: nowrap;
}

.tier-gate-cta:hover {
  background: rgba(var(--acc-rgb), 0.20);
  border-color: rgba(var(--acc-rgb), 0.48);
}

.tier-gate-cta:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--acc),
              0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

**`applyGates()` — called on every admin page load:**

```javascript
function applyGates() {
  document.querySelectorAll('.tier-gate').forEach(gate => {
    const required = gate.dataset.tier;
    if (!required) return;

    if (tierAtLeast(required)) {
      // Artist has access — remove gate, reveal content
      gate.classList.remove('tier-gate');
      const overlay = gate.querySelector('.tier-gate-overlay');
      const content = gate.querySelector('.tier-gate-content');
      if (overlay) overlay.remove();
      if (content) {
        content.removeAttribute('aria-hidden');
        content.removeAttribute('tabindex');
        content.style.filter = '';
        content.style.opacity = '';
        content.style.pointerEvents = '';
      }
    }
    // else: gate remains as-is — overlay is visible, content is blurred
  });
}

// Call on DOM ready, after profile is loaded
document.addEventListener('DOMContentLoaded', () => {
  applyGates();
  applyTierPill();
  renderFanCapProgress(); // See monetisation/PATH-TO-10.md §P0
});
```

**HTML structure for any gated feature:**
```html
<div class="tier-gate" data-tier="artist-pro" data-feature="email-broadcasts">
  <div class="tier-gate-content" aria-hidden="true" tabindex="-1">
    <!-- Real feature markup OR a skeleton approximation of it -->
  </div>
  <div class="tier-gate-overlay" role="complementary" aria-label="Feature locked">
    <span class="tier-gate-icon" aria-hidden="true">✦</span>
    <p class="tier-gate-headline">
      Send a message directly to every fan on your list. Artist Pro.
    </p>
    <button
      class="tier-gate-cta"
      onclick="openUpgradeSheet('email-broadcasts')"
      aria-label="See Artist Pro plans to unlock email broadcasts"
    >
      See Artist Pro plans
    </button>
  </div>
</div>
```

---

### P0.3 — The 7 upgrade trigger moments

These are the specific moments when an upgrade prompt must fire. Each is a high-intent user action — the artist is doing something that requires a higher tier. The prompt must appear at exactly this moment and not before.

**Moment 1: Fan list reaches 80 (soft warning)**
- Progress bar appears in admin.html Fans page header
- Amber, shows count and remaining capacity
- See `monetisation/PATH-TO-10.md §P0.1` for exact component

**Moment 2: Fan list reaches 100 (hard cap)**
- Full upgrade prompt appears above fan list in admin.html
- Copy: "You've reached 100 fans. That's a real audience. Your next 1,900 are one step away."
- CTA: opens upgrade sheet with 'fan-list' context
- See `monetisation/PATH-TO-10.md §P0.2` for exact component

**Moment 3: Artist tries to add a second snap card**
- The `+  Add snap card` slot shows `.tier-gate` component instead of a functional button
- Gate headline: "Add as many snap cards as you want. Artist."
- Does not hide the add button — replaces it with the gate overlay

**Moment 4: Artist tries to switch campaign state (pre-release, live, or gig)**
- State selector buttons in Campaign HQ are wrapped in `.tier-gate` at the button level
- Gate headline: "Set a release date, run a live window, or go into gig mode. Artist."
- Profile state button remains fully functional (it is Free)

**Moment 5: Artist tries to add a connection**
- Connections section in admin.html wrapped in `.tier-gate`
- Gate headline: "Link to the people you've made music with. Artist."

**Moment 6: Artist tries to access email broadcasts**
- Broadcasts section in Fans page wrapped in `.tier-gate`
- Gate headline: "Send a message directly to every fan on your list. Artist Pro."

**Moment 7: Artist tries to access advanced analytics**
- Advanced analytics section (click breakdown, source attribution, sparklines beyond 7 days) wrapped in `.tier-gate`
- Gate headline: "See where your fans come from, what they tap, and when they show up. Artist Pro."

---

### P0.4 — `GATE_COPY` lookup table in admin.html

```javascript
const GATE_COPY = {
  'snap-cards': {
    headline: 'Add as many snap cards as you want. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'campaign-modes': {
    headline: 'Set a release date, run a live window, or go into gig mode. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'connections': {
    headline: "Link to the people you've made music with. Artist.",
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'fan-list': {
    headline: "You've reached 100 fans. Your next 1,900 are one step away. Artist.",
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'email-broadcasts': {
    headline: 'Send a message directly to every fan on your list. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'fan-crm': {
    headline: 'See your most engaged fans, filter by source, and act on it. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'advanced-analytics': {
    headline: 'See where your fans come from, what they tap, and when they show up. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'support-packs': {
    headline: 'Let fans support you directly — on your terms. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'broadcast-scheduling': {
    headline: "Schedule a message to go out when the moment's right. Artist Pro.",
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'export-fans': {
    headline: 'Download your full fan list and take it anywhere. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'multiple-pages': {
    headline: 'Manage up to 10 artist pages from one account. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'team-access': {
    headline: "Give your team access without sharing your login. Label.",
    cta: 'See Label plans',
    tier: 'label'
  },
  'aggregate-analytics': {
    headline: 'See how all your artists are performing in one place. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'api-access': {
    headline: 'Connect your own tools to your fan data. Label.',
    cta: 'See Label plans',
    tier: 'label'
  }
};
```

---

## P1 — 7/10 → 8.5/10
**Theme: Complete upgrade flow. Make tier visible. Free feels whole.**

### P1.1 — Upgrade bottom sheet (full spec in `SPEC.md §2.3`)
- Full DOM as specced in §2.3.2
- CSS as specced in §2.3.3
- `openUpgradeSheet(featureId)` pre-populates context headline from `GATE_COPY`
- `highlightCurrentTier()` marks current tier card, removes its CTA
- `handleTierSelect(tier)` — interim: toast "We'll let you know when [tier] billing is live."
- Focus trap: first focusable element inside sheet receives focus on open
- Escape key closes sheet. Backdrop tap closes sheet. Focus returns to trigger element.

### P1.2 — Tier indicator (SPEC.md §2.7)
- `.tier-pill` in sidebar identity card (desktop) and "More" sheet header (mobile)
- `applyTierPill()` called on admin init
- Free: grey/muted. Paid: amber accent.
- Updates immediately when `able_tier` changes (for test toggling)

### P1.3 — Free tier completeness audit
Walk every admin section. Verify each feature is either:
- (a) Fully functional on Free, or
- (b) Gated with `.tier-gate` component

No third state (half-functional, broken, silent failure).

---

## P2 (7/10 → 9/10): Server-side tier enforcement via Supabase RLS

**This is the fix for the localStorage vulnerability.** Must be complete before Stripe goes live.

### Architecture

When Supabase auth is wired:

**1. Tier moves to Supabase `profiles` table:**
```sql
-- profiles table includes:
tier TEXT NOT NULL DEFAULT 'free'
  CHECK (tier IN ('free', 'artist', 'artist-pro', 'label')),
tier_expires_at TIMESTAMPTZ,   -- null = active subscription
stripe_customer_id TEXT,
stripe_subscription_id TEXT
```

**2. RLS policies enforce tier at the data layer:**
```sql
-- Example: broadcasts are Artist Pro only
CREATE POLICY "broadcasts_artist_pro_only"
ON broadcasts
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.tier IN ('artist-pro', 'label')
  )
);
```

**3. Client reads tier from session, not localStorage:**
```javascript
// On admin load (after Supabase auth is live):
const { data: profile } = await supabase
  .from('profiles')
  .select('tier')
  .eq('id', user.id)
  .single();

// Write to localStorage as a cache — but this is now server-validated, not user-settable
localStorage.setItem('able_tier', profile.tier);
applyGates();
applyTierPill();
```

**4. Stripe webhook updates tier on payment events:**
```javascript
// netlify/functions/stripe-webhook.js
// Handles: checkout.session.completed, customer.subscription.deleted, invoice.payment_failed

case 'checkout.session.completed':
  // Update profiles.tier in Supabase to the purchased tier
  await supabase
    .from('profiles')
    .update({ tier: purchasedTier, stripe_subscription_id: subscriptionId })
    .eq('stripe_customer_id', customerId);
  break;

case 'customer.subscription.deleted':
  // Downgrade tier to 'free' at billing period end
  await supabase
    .from('profiles')
    .update({ tier: 'free', tier_expires_at: null })
    .eq('stripe_subscription_id', subscriptionId);
  break;
```

**After P2 is complete:** localStorage manipulation no longer bypasses tier gates. Setting `localStorage.setItem('able_tier', 'artist-pro')` changes the client display, but any API call will be rejected by Supabase RLS. The tier pill shows the cached value; the actual feature access is server-enforced.

---

## P3 (9/10 → 10/10): Billing live and tested

10/10 requires:

1. **Live Stripe integration** — payment tested end-to-end in production (not test mode)
2. **Conversion rate measurement** — what percentage of artists who see a gate tap "See plans"? What percentage complete checkout?
3. **Downgrade path tested** — at least one real cancel-and-re-subscribe cycle in production
4. **Label tier live** — at least one Label customer using multi-page management
5. **A/B test on gate headline copy** — conversion data to confirm which headlines work

---

## Dimension targets by phase

| # | Dimension | Current | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|---|
| 1 | Visual gate pattern | 5 | 8 | 9 | 9 | 9.5 |
| 2 | Gate copy specificity | 7 | 9 | 9.5 | 9.5 | 10 |
| 3 | Upgrade flow UX | 5 | 6 | 9 | 9 | 9.5 |
| 4 | Free tier experience | 5 | 7 | 9 | 9 | 9 |
| 5 | Fan count progress bar | 0 | 8 | 8 | 8 | 8.5 |
| 6 | Limit reached UX | 4 | 8 | 9 | 9 | 9 |
| 7 | Tier visibility | 3 | 5 | 9 | 9 | 9.5 |
| 8 | localStorage vulnerability | known/accepted | documented | documented | closed | — |
| 9 | Payment integration | 2 | 2 | 2 | 8.5 | 10 |
| 10 | Downgrade path | 2 | 2 | 2 | 8.5 | 9.5 |
| | **Overall** | **3.7** | **6.8** | **8.0** | **8.75** | **~9.5** |
