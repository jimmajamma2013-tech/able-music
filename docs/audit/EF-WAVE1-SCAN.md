# E+F Dimensions — Wave 1 Code Changes
**Generated: 2026-03-18 | Agent scan of all E/F dimension files**

~432 items across E1–E10 (mobile UX) and F1–F10 (interaction states)

See full agent output for complete list. Key priorities:

## E4 — Input Type Correctness (HIGH PRIORITY — fan sign-up friction)
- V8: fan email type=email, autocomplete=email, inputmode=email, autocapitalize=off, autocorrect=off, spellcheck=false, enterkeyhint=send
- ADM: email type=email, URL fields type=url with autocomplete/inputmode
- STR: same audit for wizard email + URL fields

## E5 — iOS Auto-Zoom Prevention (HIGH PRIORITY — all inputs)
- ALL: input, textarea, select { font-size: max(16px, 1rem) }
- Sub-16px inputs cause iOS Safari to auto-zoom — very bad UX

## E1 — Tap Targets (MEDIUM — verify 44px minimums)
- snap-btn, dc-action, chq-state-btn, close buttons all need 44px check

## E3 — iOS Safe Area
- Most items already implemented (viewport-fit=cover, env() padding)

## F9 — Reduced Motion (MEDIUM — missing overrides in admin)
- ADM: shimmer, fadeInUp, milestoneEnter, stateSpringIn, livePulse2 need @media(prefers-reduced-motion) guards

## F10 — No transition:all
- Quick grep check + fix any found
