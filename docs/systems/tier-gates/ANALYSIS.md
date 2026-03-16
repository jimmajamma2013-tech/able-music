# Tier Gate System — Analysis
**Date: 2026-03-15**
**Overall score: 5.2/10**
**Status: Named and intended — not yet specified or implemented consistently**

---

## Summary

The tier gate concept is named in CLAUDE.md ("Gold lock pattern") and referenced in the admin DESIGN-SPEC (Section 14: upgrade bottom sheet, Section 15: gate copy rules). But there is no canonical component spec, no full copy inventory, no consistent visual pattern, and no limit-warning system. The bones are right. The flesh is missing.

---

## Dimension scores

### 1. Visual gate pattern — 4/10

**What exists:** The "gold lock" concept is described in CLAUDE.md in one sentence: "Pro features show blurred preview + tasteful overlay with specific value proposition." The admin DESIGN-SPEC (§14) references a `.glo-btn` class that triggers the upgrade sheet, but no component HTML, CSS, or usage example is defined.

**What's missing:**
- No canonical `.tier-gate` component with DOM structure
- No CSS spec for the blur, overlay, icon, or amber treatment
- No guidance on what the "blurred preview" actually shows (skeleton? real data at reduced opacity? a placeholder?)
- No spec for how the gate behaves at different breakpoints
- Inconsistent naming: "gold lock" in CLAUDE.md, `.glo-btn` in DESIGN-SPEC — these appear to be the same thing but are never formally linked

**Path:** Define a single `<div class="tier-gate">` wrapper component with consistent CSS. One component, used everywhere.

---

### 2. Gate copy specificity — 6/10

**What exists:** CLAUDE.md explicitly bans generic "Upgrade" copy and mandates specific value propositions. The admin DESIGN-SPEC (§15) reinforces: "All tier gates: specific value prop + price, not just 'Upgrade'." Three example gate headlines exist in CLAUDE.md context.

**What's missing:**
- No complete inventory of every gated feature with its specific headline
- The three examples in the brief are hypothetical — none are committed to a spec file
- No guidance on headline format (sentence case? title case? how long?)
- No spec for the sub-copy line beneath the headline (is there one?)
- No spec for whether the CTA button says "See plans" or "See Artist Pro" or something else

**Path:** Write one headline + one CTA label for every gated feature. No placeholders.

---

### 3. Upgrade flow UX — 5/10

**What exists:** Section 14 of admin DESIGN-SPEC defines an upgrade bottom sheet with a DOM stub. It lists the trigger conditions: `.glo-btn` click, fan cap CTA, analytics gate CTA. The sheet shows three tiers with a comparison row and CTAs.

**What's missing:**
- The bottom sheet DOM is a stub — no tier comparison row HTML, no tier card structure
- No spec for what "current tier highlighted" looks like
- No transition spec for the sheet itself (same CSS pattern as campaign sheet, or different?)
- No spec for what happens after the artist taps a tier CTA — does it go to a Stripe checkout? A waitlist? A "coming soon" holding page?
- No handling for when artist taps a tier they already have

**Path:** Complete the upgrade sheet DOM and CSS spec. Define the post-tap flow even if Stripe is not wired yet (interim: "Get notified when billing is live").

---

### 4. Free tier experience — 5/10

**What exists:** CLAUDE.md lists the Free tier: basic profile, 1 snap card, 100 fan sign-ups, basic stats. The milestone system (admin DESIGN-SPEC §7) acknowledges the 100-fan limit with specific copy: "This is the free tier limit — and it means 100 people found you on their own."

**What's missing:**
- No holistic spec for what the Free tier experience looks like day-to-day — which features are visible at all? Which are gated? Which are hidden?
- The 1-snap-card limit: is the "+ Add snap card" button hidden, gated, or shows a gate? Not specced.
- No spec for what a Free profile looks like in Campaign HQ — can they use pre-release mode? (Artist tier gate)
- No "Free feels generous" principle translated into UI decisions

**Path:** Map every admin feature to a Free/Artist/Pro/Label availability state. Make explicit decisions, not assumptions.

---

### 5. Limit approach warnings — 3/10

**What exists:** The milestone system (§7) shows a card at the 100-fan milestone, and its copy implicitly acknowledges the limit. Nothing else.

**What's missing:**
- No amber toast at 80 fans
- No persistent banner at 95 fans
- No fan-count progress indicator anywhere in admin (the fan stat just shows the number)
- No snap card count indicator (you have 1/1 snap cards)
- No warning copy specced at all

**Path:** Define the warning thresholds (80%, 95%, 100%) and the exact copy and component for each. Amber toast for soft warning. Persistent dismissible banner for hard warning.

---

### 6. Limit reached UX — 4/10

**What exists:** The brief implies the sign-up form on the public profile should convert to an upgrade CTA when the fan cap is hit. The milestone copy at 100 is warm and celebratory ("That's a real audience."). That is good instinct but not implemented.

**What's missing:**
- What exactly happens to the fan sign-up form on able-v7.html when fans.length >= 100 and the artist is on Free?
- Does it disappear? Show an artist-facing message? Show something else to fans?
- Is there a fallback so fans who find the page don't hit a broken or confusing form?
- No spec for the CTA that replaces the sign-up — what does it say? Where does it link?

**Path:** Define the exact DOM state change at cap. Fans should never see a broken experience. Artist should see an upgrade prompt. These are two different messages.

---

### 7. Tier visibility — 4/10

**What exists:** Nothing. There is no UI element in admin.html showing the artist's current tier. The topbar and sidebar specs in DESIGN-SPEC have no tier indicator.

**What's missing:**
- No tier badge in the topbar or sidebar identity card
- No tier badge in the "More" or Settings section
- No visual differentiation between a Free and paid admin experience
- No spec for how tier is stored (localStorage key? Supabase profile field?)

**Path:** Add a tier indicator to the sidebar artist identity card (desktop) and to the "More" bottom sheet (mobile). Small pill: "Free" / "Artist" / "Artist Pro" / "Label". Low-profile but always visible.

---

### 8. Label tier — 2/10

**What exists:** CLAUDE.md lists Label tier at £49/mo with "10 artist pages, team access, aggregate analytics, API." That is the entirety of its specification.

**What's missing:**
- No admin UX for multi-artist management
- No spec for what "team access" means (roles? permissions? shared login?)
- No spec for aggregate analytics across 10 pages
- No API spec or even a placeholder
- No onboarding or sign-up flow for Label tier

**This is intentional at this stage.** Label is a future tier. But the gate for it (when an Artist account tries to add an 11th page, for example) should be designed now. Score reflects being entirely unspecced.

**Path:** Define the Label gate (what triggers it, what the gate says). Full UX design is P2+.

---

### 9. Payment integration readiness — 2/10

**What exists:** Nothing. Stripe is mentioned zero times in any current spec. CLAUDE.md references Supabase + Netlify as the backend plan. The upgrade sheet mentions tier CTAs but provides no post-tap flow.

**What's missing:**
- No Stripe integration spec
- No webhook handling spec (tier updates from Stripe → Supabase profile)
- No billing page design
- No failed payment handling
- No free trial spec (is there one?)

**Path:** This is a P2 item. The P0/P1 work is: spec the upgrade flow so the post-tap destination is defined, even if it's a waitlist or holding page. Stripe integration spec is P2.

---

### 10. Downgrade path — 2/10

**What exists:** Nothing. No spec for what happens when an artist cancels their subscription.

**What's missing:**
- No data retention policy (fans list, analytics, snap cards — kept for how long?)
- No grace period spec
- No UI spec for a downgraded account (which features become gated again? does excess data disappear?)
- No copy for the "you've been downgraded" state

**Path:** P2 item. Define: 30-day data retention after cancel, features gate immediately or at end of billing period, clear in-app notification.

---

## Score summary

| # | Dimension | Score |
|---|---|---|
| 1 | Visual gate pattern | 4/10 |
| 2 | Gate copy specificity | 6/10 |
| 3 | Upgrade flow UX | 5/10 |
| 4 | Free tier experience | 5/10 |
| 5 | Limit approach warnings | 3/10 |
| 6 | Limit reached UX | 4/10 |
| 7 | Tier visibility | 4/10 |
| 8 | Label tier | 2/10 |
| 9 | Payment integration readiness | 2/10 |
| 10 | Downgrade path | 2/10 |
| | **Overall** | **3.7/10** |

The 5.2 headline score in the header reflects that the *intent* and *copy philosophy* are well-established — the product principle (specific value prop, not generic upgrade) is correct and explicitly stated. The 3.7 component average reflects the implementation gap: almost nothing is concretely specced enough to build from.

---

## What this analysis surfaces

The tier gate system is the most under-specced major system in ABLE. It touches every page. The upgrade bottom sheet is named but empty. The visual pattern has a one-sentence description. The copy has three examples and no inventory. The limit warnings don't exist.

The good news: the philosophy is sound. The copy instinct ("You've reached 100 fans. That's a real audience.") is exactly right. The bones are there. The SPEC.md below makes this buildable.
