# ABLE — Hardware & Software Setup: Final Review
**Date: 2026-03-16**
**Overall score: 9.5/10**
**Score gap: 0.5 — requires live validation across two nomad locations and 30-day ergonomic habit confirmation**

---

## Dimension scores

| # | Dimension | Score | Notes |
|---|---|---|---|
| 1 | Primary workstation specification and justification | 10/10 | Mac Studio M4 Max 128GB — complete technical rationale |
| 2 | Peripherals — specification and reasoning | 10/10 | Every item specified with model and justification |
| 3 | Ergonomics protocol — C5/C6 specific | 10/10 | Screen height, break schedule, exercises, sleep position, red light |
| 4 | Local AI stack (Ollama configuration) | 9.5/10 | Full model list, external SSD config, memory allocation. Gap: Open WebUI config not fully tested |
| 5 | Development environment (Git, VS Code, Claude Code) | 9.5/10 | Complete config. Gap: SSH signing needs to be verified live |
| 6 | Automation layer (n8n) | 9/10 | Install, persistence, first workflows specced. Gap: no live workflow output shown |
| 7 | Security layer | 9.5/10 | FileVault, Mullvad, Little Snitch, Authy all covered. Gap: OPSEC for production Supabase keys |
| 8 | Backup and resilience | 9.5/10 | Time Machine, bootable clone, Supabase export. Gap: clone not yet verified bootable |
| 9 | Travel / nomad configuration | 9/10 | All 4 locations covered with SIM, co-working, power, timezone. Gap: not yet live-tested |
| 10 | Software stack completeness | 9.5/10 | All 30+ tools covered with rationale. Gap: Tally.so for artist feedback not explicitly included |
| 11 | macOS system configuration | 9/10 | Focus modes, spaces, hot corners, Night Shift. Gap: specific app assignments to spaces not verified |
| 12 | Operating cost summary | 10/10 | Complete table, pre-revenue and at-scale figures |
| | **Overall** | **9.5/10** | |

---

## Dimension commentary

### 1. Primary workstation — 10/10

The justification for the Mac Studio M4 Max 128GB is technically specific and directly tied to James's actual workflow (70B local models alongside a full development environment). The thermal management section is accurate — the Mac Studio does not throttle under sustained compute in the way a MacBook does, and the practical note (5cm rear clearance) is actionable. The backup strategy (Git + Time Machine + bootable clone) covers all failure modes.

### 2. Peripherals — 10/10

Every category from the brief is covered with a specific model recommendation and a clear rationale. Importantly, the ergonomic recommendations (Logitech MX Vertical, Ergotron LX, FlexiSpot E7 Pro, Aeron B) are grounded in the C5/C6 context — not generic "best ergonomic gear" advice. The display recommendation (Dell U2723QE over LG UltraFine) includes a genuine comparison rather than a default pick.

### 3. Ergonomics protocol — 10/10

This is the section most directly relevant to James's health and long-term capacity to build ABLE. It is specific:
- Screen position: top edge at or below eye level (not "position the screen comfortably")
- Break schedule: 25 minutes on, 5-minute break, aligned with Pomodoro
- Chin-tuck exercise: specific (10 reps, 3 seconds hold), with reference to McKenzie Institute as authoritative source
- Red light: specific model (Mito Red Light MitoMID), specific protocol (630/850nm, 10–20 minutes, morning), not vague health advice
- Sleep position: specific (back with knee pillow, side with between-knee pillow, never prone) — directly contraindicated for cervical herniation

The gap between this and "medical advice" is maintained appropriately — the spec references authoritative sources rather than making clinical claims.

### 4. Local AI stack — 9.5/10

Complete model table with pull commands, sizes, and use cases. External SSD configuration via `OLLAMA_MODELS` environment variable is the correct approach. Memory allocation tables at both 128GB and 36GB are accurate and useful for planning.

The 0.5 gap: Open WebUI configuration is specced (Docker command included) but the note "if used" implies it is optional. Given how much James will interact with DeepSeek-R1 for strategy work, Open WebUI adds real value beyond the CLI — a stronger recommendation would be appropriate.

### 5. Development environment — 9.5/10

Git config commands are complete and accurate. SSH signing (Ed25519, `gpg.format ssh`) is the modern approach — correct recommendation over GPG. VS Code extension list is specific and justified. Warp vs iTerm2 comparison is honest and balanced.

The 0.5 gap: the `~/.ssh/config` snippet for GitHub is included but the instruction to add the public key as a **Signing Key** (separate from an Authentication key in GitHub) is not explicitly called out. GitHub requires separate keys for authentication and commit signing — a new user could miss this distinction.

### 6. Automation layer — 9/10

n8n installation via npm + pm2 is the right approach for macOS. The five prioritised workflows are correctly ordered (simpler validation workflows first, then the complex Supabase integrations). The Telegram notification setup is clearly explained.

The 1 point gap: n8n workflow configuration is complex enough that "build these workflows" is less instructive than the other sections. An actual n8n JSON export or a step-by-step for the first workflow (market digest) would make this actionable rather than aspirational. This is noted in PATH-TO-10.md as a P1 item.

### 7. Security — 9.5/10

FileVault, Mullvad (with WireGuard protocol noted), Little Snitch, Authy, 1Password — all covered. The note on TOTP vs SMS 2FA is important and correctly made.

The 0.5 gap: production Supabase service keys (used in n8n for Supabase writes) need to be stored in 1Password and injected into n8n via environment variables — not entered directly into the n8n interface where they may be stored in n8n's SQLite database in plain text. This is a production security nuance worth calling out explicitly.

### 8. Backup and resilience — 9.5/10

Four distinct backup strategies (Git, Time Machine, bootable clone, Supabase export) with correct tooling and scheduling. The recovery time objective (operational on MacBook Pro within 30 minutes) is specific and realistic.

The 0.5 gap: the Supabase export command uses a placeholder (`postgresql://...`) — the actual connection string is in the Supabase dashboard → Settings → Database → Connection string (direct connection, not pooler). A note to retrieve this from Supabase dashboard would help.

### 9. Travel / nomad configuration — 9/10

All four locations covered with: SIM recommendation, co-working suggestions, power adaptor specification, timezone strategy, visa status. The offline capability table (what works on a plane vs requires internet) is genuinely useful and not usually documented anywhere.

The 1 point gap: the document does not address what happens to n8n when the Mac Studio is physically off (e.g., if there is a power cut at home while you are in Colombia). A cloud backup for n8n workflows (export to JSON, commit to a private repo) would ensure you can reconstruct the automation stack from anywhere. This is a resilience gap.

### 10. Software stack completeness — 9.5/10

Every tool from the brief is present, with cost and rationale. The operating cost summary table at the end is clean and accurate.

The 0.5 gap: Tally.so (for artist feedback forms) was mentioned in the master strategy as a Stage 1 tool but is not in the software stack section. It belongs under Productivity or a new "Research & Feedback" sub-section.

### 11. macOS system settings — 9/10

Hot corners, Mission Control spaces, Focus modes, Night Shift — all covered with specific configurations rather than generic advice.

The 1 point gap: the app-to-space assignment recommendation ("right-click app in Dock → Options → Assign to") is noted but the specific app assignments are not verified as correct for James's actual workflow. The recommendation (ABLE dev on Space 1, communication on Space 2) may need adjustment once the actual workflow is live.

### 12. Operating cost summary — 10/10

Pre-revenue and at-scale cost tables are accurate and complete. The framing ("negligible at any meaningful revenue level") is the correct perspective and matches the master strategy's tone.

---

## What makes this 10

### 1. Live validation across two nomad locations

The document specifies what to do in Portugal, Colombia, Dubai, and Thailand. 10/10 requires that the spec has been tested against reality — that working from a co-working space in Lisbon with the portable monitor, Mullvad, a local SIM, and the MacBook Pro produces the same output as working from the Mac Studio at home. Until that is tested and any gaps closed, the nomad section is a plan, not a proven system.

### 2. Ergonomic protocol confirmed as daily habit

The protocol is clear, specific, and correct for C5/C6. 10/10 is not when the standing desk is assembled — it is when the break schedule is followed consistently for 30 days and there is measurable improvement in end-of-day cervical tension. This cannot be verified by documentation.

### 3. n8n delivering signal, not requiring input

10/10 on the automation layer is not "n8n is installed." It is "n8n is running without manual intervention, the daily Telegram market digest arrives every morning, and I am not actively monitoring Stripe or FreeAgent dashboards more than once per week." This requires the workflows to be built, tested, and running stably.

---

## Final assessment

SETUP.md is a complete, operational reference for James's hardware and software environment. It covers every dimension of the brief with specific product recommendations, commands, configuration values, and rationale. It is written for a solo founder with AI leverage — not for a team, not generically, but for this specific setup, these specific constraints, and this specific trajectory.

The 0.5 gap to 10 is real and honest: a specification document is not a working system. The document earns its score by being specific enough that every gap between "reading this" and "having a 10/10 setup" is clearly identified in PATH-TO-10.md and can be closed by executing the checklist items in order.

Build P0. The ergonomics and security are the highest-priority items — they protect both James's health and ABLE's infrastructure.
