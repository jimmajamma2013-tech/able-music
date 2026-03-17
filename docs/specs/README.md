# ABLE — Spec-Driven Workflow
**Every significant feature gets a spec before any code is written.**

---

## Why specs first

ABLE is built by one developer with AI agents. Without a written spec:
- Build decisions get made mid-implementation based on assumptions
- Agents make plausible-looking but wrong calls
- Features need to be rebuilt because the design was wrong, not the code

A spec costs 30 minutes. A rebuild costs a session.

---

## What counts as "significant"

Spec required for:
- Any new page or section
- Any feature that touches localStorage schema
- Any feature that involves a new Netlify function
- Any feature that changes the CTA architecture
- Any cross-page data flow

Spec not required for:
- Bug fixes
- Copy changes
- CSS token adjustments
- Adding a single new UI element to an existing pattern

---

## Three files per feature

Each feature lives in its own directory under `docs/specs/[feature-name]/`:

### `requirements.md`
What the feature must do. Written before any design decisions.
- Uses EARS pattern: "When X, the system shall Y"
- Includes scope limits ("out of scope for V1")
- Includes acceptance criteria (testable, not subjective)

### `design.md`
How it will work. Written after requirements are approved.
- Data model (localStorage keys, Supabase tables)
- UI components and their states
- Error states and edge cases
- Copy decisions (exact strings for key moments)

### `tasks.md`
What to build, in order. Written after design is approved.
- Atomic tasks — each maps to specific files and line ranges
- Estimated time per task
- Dependency order
- Verification step per task

---

## Approval gate

Before moving from spec to code:
1. Requirements reviewed — no ambiguities
2. Design reviewed — no missing states
3. Tasks reviewed — nothing blocked

In practice: James reads and says "build it". That's the approval.

---

## Naming convention

Directory name: kebab-case of the feature. Examples:
- `supabase-auth` — Supabase magic link authentication
- `freelancer-profile` — Freelancer profile page
- `email-broadcasts` — Pro-tier fan email broadcasts
- `press-pack` — Auto-generated EPK

---

## Current specs

| Feature | Status | Priority |
|---|---|---|
| `supabase-auth` | Draft | High — artists must own their data before launch |
