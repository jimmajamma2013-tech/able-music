# Growth Loop — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a growth mechanism so elegantly embedded that every artist's page quietly recruits for the platform — and the artists who discover they've referred 8 other artists feel proud of it, not used by it.

---

## Moment 1: The Referred Artist Count

**What it is:** In admin.html, in the fans section, a quiet line appears once another artist has signed up through the referring artist's page: "1 artist has created a page after visiting yours." When that number reaches 5, it appears in a dedicated stat card. The number is never called "referrals." It is called "pages started from yours."

**Why it's 20/10:** This is not a referral programme. ABLE does not offer credits, discounts, or incentives for referring artists. The signal is intrinsic: your page is good enough that another artist saw it and wanted one. That is a different kind of validation from fan sign-ups. It says: you are doing this right, and other artists see it. The copy is precise — "after visiting yours" not "because of you," "pages started" not "signups referred." This is how ABLE respects the artist's intelligence. It states the fact. The artist draws their own conclusion.

**Exact implementation:**

```javascript
// In admin.html — run after profile loads, checks localStorage for profiles with referredBy === slug
function checkReferredArtists() {
  const mySlug = safeGet('able_v3_profile', {}).artistSlug;
  if (!mySlug) return;

  // Phase 1: count referred profiles in localStorage (same-device only)
  // Phase 2 (Supabase): query profiles WHERE referred_by = mySlug
  const allLocalProfiles = []; // In Phase 2, this is replaced with a Supabase query result
  const referredCount = allLocalProfiles.filter(p => p.referredBy === mySlug).length;

  if (referredCount === 0) return; // Card does not exist until first referral

  const nudgeEl = document.getElementById('referredArtistsNudge');
  if (!nudgeEl) return;

  // Singular / plural copy — deliberately low-key
  const label = referredCount === 1
    ? '1 artist has created a page after visiting yours.'
    : `${referredCount} artists have created their pages after visiting yours.`;

  document.getElementById('referredArtistsCount').textContent = label;
  nudgeEl.hidden = false;
}
```

```html
<!-- admin.html Fans section — hidden until referredCount >= 1 -->
<div id="referredArtistsNudge" hidden class="referred-artists-nudge">
  <span id="referredArtistsCount"></span>
</div>
```

```css
.referred-artists-nudge {
  font-size: 12px;
  color: var(--dash-t2);
  padding: 8px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 16px;
}
```

---

## Moment 2: The Fan Who Asks "What Is This?"

**What it is:** The "Made with ABLE ✦" footer is 11px, 0.6 opacity, and positioned 48px from the bottom of the screen. It is specifically designed to be noticed only by the fan who is curious enough to scroll to the bottom of an artist's page. When they tap it and land on `landing.html?ref=nadia`, they see: "Nadia is on ABLE." — a statement, not a pitch.

**Why it's 20/10:** Every other platform puts its branding at a size that competes with the artist's content. ABLE's footer is invisible to the disengaged and visible to the invested. The fan who reaches the bottom of the page, reads "Made with ABLE ✦," and taps it — that fan is curious and engaged. The landing page copy respects that. "Nadia is on ABLE." does not say "Join millions of fans." It says one specific thing: this artist you just experienced, they chose to be here. The curiosity that brought the fan to the footer becomes the seed of ABLE's growth.

**Exact implementation:**

The full `initFooterLink()` function from SPEC.md §3 is the correct implementation. The 20/10 detail is the exact visual treatment:

```css
.able-footer-link {
  font-family: var(--font, 'DM Sans', sans-serif);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-decoration: none;
  color: var(--color-text-3);
  opacity: 0.6;

  /* 44px tap target without increasing visual size */
  display: inline-block;
  padding: 14px 20px;
  margin: -14px -20px;
  min-height: 44px;
  line-height: 44px;

  transition: opacity 0.15s ease;
}

.able-footer-link:hover,
.able-footer-link:focus-visible {
  opacity: 1; /* Only visible at full weight when deliberately engaged */
}
```

And on `landing.html`, the personalised headline is never more than four words. Never more. The slug `the-1975` becomes "The 1975 Is On ABLE." — capitalisation of each word is the Phase 1 approximation. Phase 2 replaces this with the real artist name from Supabase. The four-word limit is the constraint that keeps the landing page from feeling like marketing.

---

## Moment 3: "I Make Music Too"

**What it is:** On `landing.html?ref=nadia`, below the primary CTA ("Create your free page →"), a secondary text link appears: "Already here as a fan? / I make music too →". This link goes to `start.html?ref=nadia&source=artist-page`. When that artist completes setup, the wizard's first screen shows a quiet line: "You found us through Nadia."

**Why it's 20/10:** The "I make music too" fork is a micro-moment of recognition. The visitor landed on a fan landing page. They are not a fan — they are an artist who saw another artist's page and thought: I want that. The fork acknowledges this without making them feel like they were on the wrong page. "Already here as a fan?" is generous — it does not say "Wait, are you an artist?" It says: you might be something else, and that's fine, there's a path for you. The phrase "I make music too" is in the artist's voice, not ABLE's voice. It captures the feeling of discovery that is the best possible reason to sign up.

**Exact implementation:**

```html
<!-- landing.html — only rendered when personaliseHero() runs -->
<div class="landing-fork" id="landing-fork" style="display:none">
  <p class="landing-fork-prompt">Already here as a fan?</p>
  <a href="#" class="landing-fork-link" id="landing-fork-cta">I make music too →</a>
</div>
```

```css
.landing-fork {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.landing-fork-prompt {
  font-size: 13px;
  color: var(--color-text-3);
  opacity: 0.6;
  margin: 0 0 8px;
}

.landing-fork-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: color 0.15s ease;
}

.landing-fork-link:hover { color: var(--color-text); }
```

In `start.html`, when `source=artist-page` is present in the URL, the wizard context note renders on the first screen (below the step indicator, above the name field):

```javascript
// start.html DOMContentLoaded — context note for artist-page source
const params = new URLSearchParams(window.location.search);
const ref = params.get('ref');
const source = params.get('source');

if (source === 'artist-page' && ref) {
  const displayName = ref.split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const el = document.getElementById('wizardContextNote');
  if (el) {
    el.textContent = `You found us through ${displayName}.`;
    el.hidden = false;
  }
}
```

This note is 13px, `color: var(--color-text-3)`, `opacity: 0.7`. It is not a headline. It is an acknowledgement. The artist reads it, knows they are in the right place, and keeps going.

---

## The 20/10 test

You know the growth loop has crossed into extraordinary when an artist you never contacted finds ABLE through another artist's page, completes setup, and writes "Nadia's page is what made me want this" in the onboarding feedback field — and you can prove it in the referral data.
