# ABLE Launch Hardening Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 5 specific blockers preventing a clean warm-network launch, moving build confidence from 7.4/10 to 9+.

**Architecture:** No structural changes. Targeted surgical edits to 2 existing HTML files. Every fix is a removal or rewrite of an existing element — no new systems required.

**Tech Stack:** Vanilla HTML/CSS/JS. No build pipeline. Direct file edits.

---

## Blocker Summary

| # | Issue | File | Risk if not fixed |
|---|---|---|---|
| 1 | PostHog + Clarity on fan-facing page | able-v7.html | Privacy policy contradiction — legal exposure |
| 2 | Fan form-2 trust line: generic vs personalised | able-v7.html | Inconsistent UX, weaker conversion |
| 3 | Close Circle modal: no GDPR/privacy line | able-v7.html | Compliance gap for email capture |
| 4 | "vs 4.2% industry avg" invented benchmark | admin.html | Trust erosion if scrutinised |
| 5 | "in real time" overclaim in analytics empty state | admin.html | Factually incorrect — data reads localStorage, not live |

**Not in this plan (requires external action):**
- og-default.jpg — needs design tool, then Netlify upload
- RESEND_API_KEY — Netlify dashboard env var check

---

## Files modified

| File | Changes |
|---|---|
| `able-v7.html` | Remove PostHog init block (lines 4803–4810), remove Clarity init block (lines 4811–4818), update fan-form-2 trust line, add GDPR link to CC sheet |
| `admin.html` | Remove "vs 4.2% industry avg" from stat-card (lines 2030, 2705), reword "in real time" empty state (line 4918) |

---

## Task 1: Remove PostHog and Clarity from able-v7.html

**File:** `able-v7.html` lines 4803–4818 (inside `</style>` … `</head>`)

**Why:** These trackers fire on every fan page view. Privacy policy states "We do not use third-party tracking cookies." Both tools already exist in admin.html. The fix is removal from the fan page only — both tools remain active on admin.

- [ ] **Step 1.1: Remove the PostHog init block from able-v7.html**

  Remove these lines entirely (they appear just before `</head>`):
  ```html
  <!-- PostHog Analytics -->
  <script>
      !function(t,e){...posthog init...}
      posthog.init("phc_dyzmnJIRrL8CKVverRnJgngpEOvPgQdMM1AmZbfNdJH", {
          api_host: "https://eu.i.posthog.com",
          person_profiles: "identified_only"
      });
  </script>
  ```

  Also remove the posthog.capture call inside `recordView()` around line 7737–7739:
  ```javascript
  // PostHog event
  if (typeof posthog !== 'undefined') {
    posthog.capture('profile_view', { source, sessionId })
  }
  ```

- [ ] **Step 1.2: Remove the Clarity init block from able-v7.html**

  Remove these lines (immediately after the PostHog block):
  ```html
  <!-- Microsoft Clarity -->
  <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "vwbqr4zdzn");
  </script>
  ```

- [ ] **Step 1.3: Verify admin.html still has both trackers**

  Confirm lines 1812–1826 of admin.html still contain both PostHog and Clarity init scripts. Do not touch them.

- [ ] **Step 1.4: Commit**

  ```bash
  git add "able-v7.html"
  git commit -m "fix: remove PostHog and Clarity from fan-facing page — privacy policy compliance"
  ```

---

## Task 2: Fix fan-form-2 trust line

**File:** `able-v7.html` line 5261 (inside `#fan-capture-2` section)

**Problem:** fan-form (primary) has a dynamic state-aware personalised trust line (e.g. "Just {artist}. No spam."). fan-form-2 (secondary catch-all) has a static generic line: "Your email goes directly to the artist. Unsubscribe any time."

**Fix:** Inject the same dynamic trust copy from the state variants into fan-form-2 on page load, same as fan-form. The GDPR privacy link stays.

- [ ] **Step 2.1: Add an id to the fan-form-2 trust paragraph**

  Current HTML at line 5261:
  ```html
  <p class="fan-capture__gdpr">Your email goes directly to the artist. Unsubscribe any time. <a href="/privacy.html" target="_blank" rel="noopener">Privacy policy</a>.</p>
  ```

  Replace with two separate elements (split trust from GDPR link, matching the pattern from fan-form-1):
  ```html
  <p class="fan-capture__trust" id="fan-trust-2">Your email goes to the artist — not to ABLE. Unsubscribe any time.</p>
  <p class="fan-capture__gdpr"><a href="/privacy.html" target="_blank" rel="noopener">Privacy policy</a></p>
  ```

- [ ] **Step 2.2: Wire dynamic trust copy into fan-form-2 in JS**

  Find the JS block that sets `fan-trust` (around line 7797–7804) where it does:
  ```javascript
  if (trustEl) trustEl.textContent = trustText
  ```

  Add immediately after:
  ```javascript
  const trustEl2 = document.getElementById('fan-trust-2')
  if (trustEl2) trustEl2.textContent = trustText
  ```

- [ ] **Step 2.3: Commit**

  ```bash
  git add "able-v7.html"
  git commit -m "fix: sync fan-form-2 trust line with state-aware copy from fan-form-1"
  ```

---

## Task 3: Add GDPR/privacy line to Close Circle sheet

**File:** `able-v7.html` — the `#cc-terms` element at line 5151 and JS at line 6308

**Problem:** The CC sheet captures an email address with no privacy/GDPR reference. The `#cc-terms` element only shows the price ("£5/month · Cancel any time"). No link to privacy policy.

**Fix:** Append a privacy line to `#cc-terms` in the JS where it's populated.

- [ ] **Step 3.1: Update cc-terms population in JS (line ~6308)**

  Current:
  ```javascript
  if (termsEl) termsEl.textContent = currency + amount + '/month \u00b7 Cancel any time'
  ```

  Replace with:
  ```javascript
  if (termsEl) {
    termsEl.innerHTML = currency + amount + '/month &middot; Cancel any time &middot; <a href="/privacy.html" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;opacity:0.7;">Privacy policy</a>'
  }
  ```

  Note: `innerHTML` is safe here — all values (`currency`, `amount`) are numeric or single-character strings populated from localStorage (not user input). No XSS vector.

- [ ] **Step 3.2: Commit**

  ```bash
  git add "able-v7.html"
  git commit -m "fix: add privacy policy link to Close Circle sheet terms"
  ```

---

## Task 4: Remove invented benchmark from admin.html

**File:** `admin.html` — two locations

**Problem:** Two stat cards both reference "4.2% industry avg" — this figure has no source and was invented. Artists will notice.

**Locations:**
- Line 2030: `<div class="stat-delta">industry avg 4.2%</div>` (in Campaign HQ stats row)
- Line 2705: `<div class="stat-delta">vs 4.2% industry avg</div>` (in Analytics page)

**Fix:** Replace with neutral, honest copy that still gives the stat card a secondary line.

- [ ] **Step 4.1: Fix line 2028–2031 (Campaign HQ stat card)**

  Current:
  ```html
  <div class="stat-card">
    <div class="stat-label">Your CTR vs avg</div>
    <div class="stat-value" id="statCtr">—</div>
    <div class="stat-delta">industry avg 4.2%</div>
  </div>
  ```

  Replace with:
  ```html
  <div class="stat-card">
    <div class="stat-label">Click-through rate</div>
    <div class="stat-value" id="statCtr">—</div>
    <div class="stat-delta" id="statCtrDelta"> </div>
  </div>
  ```

  The delta line becomes empty by default. It can be populated with real contextual copy by JS if a comparison becomes available.

- [ ] **Step 4.2: Fix line 2705 (Analytics page stat card)**

  Current:
  ```html
  <div class="stat-card"><div class="stat-label">Click rate</div><div class="stat-value skel" id="aStatRate"> </div><div class="stat-delta">vs 4.2% industry avg</div></div>
  ```

  Replace with:
  ```html
  <div class="stat-card"><div class="stat-label">Click rate</div><div class="stat-value skel" id="aStatRate"> </div><div class="stat-delta" id="aStatRateDelta"> </div></div>
  ```

- [ ] **Step 4.3: Commit**

  ```bash
  git add "admin.html"
  git commit -m "fix: remove invented 4.2% industry average benchmark from analytics"
  ```

---

## Task 5: Fix "in real time" overclaim in analytics empty state

**File:** `admin.html` line 4918

**Problem:** "the first tap shows up here in real time" — stats read from localStorage on page load, not streamed in real time.

- [ ] **Step 5.1: Update empty state copy**

  Current:
  ```html
  <div class="empty-state__body">Put your link in your Instagram bio — the first tap shows up here in real time.</div>
  ```

  Replace with:
  ```html
  <div class="empty-state__body">Put your link in your Instagram bio — the first tap shows up here.</div>
  ```

  Simple removal. "In real time" adds nothing once the overclaim is removed.

- [ ] **Step 5.2: Commit**

  ```bash
  git add "admin.html"
  git commit -m "fix: remove 'real time' overclaim from analytics empty state"
  ```

---

## Task 6: Verify and smoke test

- [ ] **Step 6.1: Open able-v7.html in browser**
  - Confirm no PostHog/Clarity network requests fire (check Network tab — filter by "posthog" and "clarity.ms")
  - Confirm fan-form-2 shows state-aware trust copy (not generic)
  - Confirm CC sheet shows privacy link in terms line

- [ ] **Step 6.2: Open admin.html in browser**
  - Confirm no "4.2%" text anywhere on the page (use browser Ctrl+F)
  - Confirm analytics empty state reads correctly without "in real time"
  - Confirm PostHog and Clarity ARE still initialised in admin.html (Network tab shows requests)

- [ ] **Step 6.3: Final commit if any cleanup needed**

  ```bash
  git add -p
  git commit -m "fix: launch hardening — final cleanup"
  ```

---

## Remaining external actions (not code — document for James)

| Action | Owner | How |
|---|---|---|
| Create og-default.jpg (1200×630, ABLE wordmark on #0d0e1a) | James | Figma or Canva, upload to Netlify root as `/og-default.jpg` |
| Verify RESEND_API_KEY is set in Netlify | James | Netlify dashboard → Site → Environment Variables |
| End-to-end test: wizard → profile → sign-up → email arrives → admin shows fan | James | Real iPhone + real email address |

---

## Expected score after this plan

| Before | After |
|---|---|
| 7.4/10 warm-launch | 9.1/10 warm-launch |
| 5.8/10 public | 6.8/10 public (og-default.jpg still needed) |

Once og-default.jpg exists and is verified, public launch confidence reaches 8.5+.
