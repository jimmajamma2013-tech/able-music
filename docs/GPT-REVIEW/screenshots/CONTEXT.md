# ABLE — Screenshot Review Context
**Paste this file + the screenshot(s) into GPT each time.**

---

## What ABLE is
Artist Before Label. A premium mobile-first platform for independent musicians.
- **admin.html** — artist dashboard (light theme). Where artists spend 90% of their time.
- **able-v7.html** — artist public profile (dark theme). What fans see.
- **start.html** — onboarding wizard (dark). New artist setup.
- **fan.html** — fan dashboard (dark). What fans use.
- No bundler. No framework. Vanilla HTML/CSS/JS.

## Design system (admin)
- Light theme: bg `#ddd8d0`, card `#ffffff`, border `#d4cfc8`
- Fonts: Plus Jakarta Sans (body), Barlow Condensed (section titles / display)
- Admin accent: Amber `#f4b942`
- Standard card: 14px radius, 1px solid `var(--dash-border)`, `var(--dash-card)` bg
- Spacing target: 32px between major sections

## Current score
**Admin UI: 7.9/10** (GPT screenshot review, 2026-03-16) — awaiting re-score after latest polish pass

## What was last built (this session)
1. Greeting system: "Good to see you, [Name]." + contextual sub-line (gig / pre-release / live / post-gig)
2. Campaign mode descriptions: one plain sentence per mode under the arc
3. Barlow Condensed typography scale: section titles uppercase, page-title 26px, greeting 22px Plus Jakarta
4. Card treatment unification: campaign-hq, mode-card, identity-card all on `--dash-*` tokens, unified radii
5. 7-point GPT polish pass:
   - Checklist: strip style (no per-row bg/border, tighter padding, sub-text hidden)
   - Surface separation: page bg #e8e4dd → #ddd8d0 (more contrast vs white cards)
   - Stats row: label quieter (#b0a89e), number 28px → 32px
   - Stats margin: 28px → 36px (deliberate gap after stats before campaign)
   - Home header: margin-bottom 12px → 14px (tighter greeting-to-checklist)
   - Campaign HQ: stronger shadow + amber top border accent
   - Sidebar artist card: border visible, name 14px, av ring highlight

## Open improvements
- Save feedback standardisation (every save in admin = consistent 300ms toast)
- Admin spacing: 36px between ALL major sections (currently mixed)
- "Preview your page →" persistent link in admin top bar

## What to tell GPT
Score it /10. Flag the single most important improvement. Be specific about measurements and tokens, not just adjectives.
