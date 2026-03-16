# ABLE — Hardware & Software Setup: Path to 10
**Date: 2026-03-16**
**Current score: 7.5/10 (initial spec, partial hardware, software install pending)**
**Target: 10/10 (fully operational, ergonomics verified, nomad config live)**

---

## Current state assessment

The SETUP.md document is complete and covers every required domain. The gaps between now and 10/10 are not documentation gaps — they are **implementation gaps**: things that need to be purchased, installed, configured, or validated in the physical world.

Score breakdown at time of writing:

| Domain | Current | Notes |
|---|---|---|
| Mac Studio — hardware acquisition | 8/10 | Machine incoming — confirm spec (128GB) before delivery |
| Peripherals — ergonomic setup | 4/10 | Likely none of the recommended peripherals in place yet |
| Travel setup | 6/10 | MacBook Pro M4 Pro exists; peripherals unknown |
| Ollama + models | 3/10 | Installed but models likely not fully populated |
| n8n workflows | 2/10 | n8n not yet self-hosted or wired to Supabase |
| Security layer | 5/10 | 1Password likely active; FileVault, Mullvad, Little Snitch unknown |
| Git configuration | 7/10 | Git working; SSH signing and global gitignore may not be configured |
| macOS system settings | 4/10 | Likely default settings — Focus modes, spaces, hot corners not configured |
| Backup system | 5/10 | Git is active; Time Machine and bootable clone unknown |
| Nomad configuration | 3/10 | Portugal/Colombia/Dubai protocols not yet live |
| **Overall** | **4.7/10** | |

---

## P0 — Score: 4.7 → 7.0
**Goal: Core workstation fully operational with ergonomics and security in place.**

### P0.1 — Verify Mac Studio delivery and spec
- Confirm 128GB unified memory (Apple System Information → Memory)
- Run `system_profiler SPHardwareDataType` to verify full hardware spec
- Log the serial number in 1Password for warranty/AppleCare reference

### P0.2 — Ergonomic setup (non-negotiable for C5/C6)
Purchase and configure in this order of priority:

1. **Monitor arm (Ergotron LX)** — highest priority: screen at eye level immediately
2. **Vertical mouse (Logitech MX Vertical)** — second priority: reduces cervical nerve aggravation from sustained pronation
3. **Standing desk or converter** — third priority. If a full FlexiSpot E7 Pro desk is not immediate, a desk converter (FlexiSpot M7B, ~£180) can be placed on the existing desk as a bridge
4. **Keyboard (Keychron K8 Pro low-profile)** — fourth priority
5. **Chair (Herman Miller Aeron B or equivalent)** — fifth priority (existing chair may suffice short-term with a lumbar roll)

Quality gate: the screen's top edge must be at or just below eye level when sitting upright with your back against the chair. Test by sitting naturally and checking — if you are looking down at the screen, the arm is set too low.

### P0.3 — Samsung T9 4TB — model storage
- Purchase Samsung T9 4TB
- Create folder: `/Volumes/Samsung T9/ollama-models`
- Add `export OLLAMA_MODELS="/Volumes/Samsung T9/ollama-models"` to `~/.zshrc`
- Verify: `ollama pull phi4` and confirm model appears on the T9, not on internal SSD
- Check with `du -sh /Volumes/Samsung\ T9/ollama-models` after pulling

### P0.4 — Pull core Ollama models
In priority order (largest first, download overnight):
```bash
ollama pull deepseek-r1:70b    # ~45GB — primary reasoning
ollama pull llama3.3:70b       # ~45GB — general tasks
ollama pull qwen2.5-coder:32b  # ~20GB — code tasks
ollama pull phi4               # ~9GB  — fast tasks
ollama pull llama3.2:3b        # ~2GB  — monitoring
```
Total: ~121GB — pull on a fast connection. Use overnight.

### P0.5 — Security layer
- [ ] FileVault: System Settings → Privacy & Security → FileVault → turn on if not enabled
- [ ] Mullvad VPN: install at `mullvad.net/download`, pay with card or crypto, verify WireGuard is active
- [ ] 1Password: verify all ABLE credentials are in the `ABLE Labs` vault (Stripe, Supabase, Netlify, Resend, GitHub)
- [ ] Authy: install, migrate any SMS 2FA to TOTP on critical accounts (GitHub, Netlify, Supabase, Stripe)
- [ ] Little Snitch: install, review initial alerts for 7 days, create rules for expected connections

### P0.6 — Git configuration
```bash
git config --global user.name "James Cuthbert"
git config --global user.email "james@ablemusic.co"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global core.excludesfile ~/.gitignore_global
```
Create `~/.gitignore_global` with contents from SETUP.md section 3.2.
Verify: `git config --list --global` shows all values correctly.

### P0.7 — Time Machine backup
- Connect external SSD (Samsung T7 Shield 2TB, separate from model storage)
- System Preferences → Time Machine → Add Backup Disk
- Wait for first full backup to complete before proceeding
- Verify: `tmutil latestbackup` returns a recent timestamp

### P0 quality gates
- [ ] Mac Studio running with 128GB confirmed
- [ ] Screen at eye level, wrists neutral, mouse not requiring arm reach
- [ ] Ollama models directory on T9, not internal SSD
- [ ] All 5 Ollama models installed, `ollama list` shows them all
- [ ] FileVault on, Mullvad installed, 1Password active
- [ ] Git global config set, global gitignore active
- [ ] Time Machine first backup completed

---

## P1 — Score: 7.0 → 8.5
**Goal: n8n operational, macOS configured for deep work, travel kit ready.**

### P1.1 — n8n installation and first workflows
```bash
npm install -g n8n pm2
pm2 start n8n -- start
pm2 save
pm2 startup  # follow the output instructions
```
Access at `http://localhost:5678`.

Build these workflows in priority order:
1. **Daily market digest** — Alpha Vantage → DeepSeek-R1 analysis → Telegram. Validates the entire n8n → Ollama → Telegram pipeline.
2. **Supabase new signup alert** — webhook from Supabase → Discord `#n8n-alerts` channel. Validates Supabase → n8n connectivity.
3. **Weekly financial summary** — FreeAgent API → Ollama summary → Telegram.

### P1.2 — macOS system settings for deep work
- [ ] Hot corners configured (top right: Mission Control, bottom right: Lock screen, bottom left: Desktop)
- [ ] Four Mission Control spaces created and apps assigned
- [ ] Deep Work Focus mode created: schedule your primary build hours, block all social notifications
- [ ] Night Shift: enabled from sunset
- [ ] Do Not Disturb during Focus modes: verified working
- [ ] Warp terminal installed, `~/.zshrc` configured with Ollama path, nvm, and any aliases

### P1.3 — Open WebUI for Ollama
- Docker Desktop installed
- Open WebUI container running at `http://localhost:3000`
- Connected to local Ollama instance
- Verify: open a conversation with DeepSeek-R1 via the browser interface

### P1.4 — Travel kit configuration
- [ ] Samsung T7 Shield 2TB purchased and labelled "Travel Backup"
- [ ] ASUS ZenScreen MB16QHD portable monitor tested with MacBook Pro
- [ ] Satechi 165W GaN charger + Condor travel adaptor set: packed
- [ ] Mullvad configured and tested on MacBook Pro
- [ ] MacBook Pro has Ollama installed with Qwen2.5-Coder 32B and Phi-4 at minimum
- [ ] `~/.zshrc` on MacBook Pro matches Mac Studio configuration

### P1 quality gates
- [ ] n8n running as persistent service, survives Mac Studio restart
- [ ] First daily market digest received in Telegram
- [ ] macOS focus modes and spaces operational for a full working week
- [ ] Travel kit tested in a local coffee shop (Mullvad on, portable monitor connected, work confirmed)

---

## P2 — Score: 8.5 → 9.5
**Goal: Full nomad config validated, ergonomics protocol embedded as daily habit, red light therapy active.**

### P2.1 — Full ergonomic setup complete
- [ ] Standing desk (FlexiSpot E7 Pro or converter): installed, heights memorised or programmed
- [ ] Standing at least once per hour, tracked via Focus Flow or a simple physical timer
- [ ] Chin-tuck exercise performed at every Pomodoro break (10 reps, 3 seconds hold)
- [ ] Sleep position confirmed: on back with pillow under knees, or side with pillow between knees
- [ ] Mito Red Light MitoMID ordered and 10-minute morning protocol established

Quality gate: one full week operating the protocol with no missed breaks or standing periods. This is a habit formation check, not a one-time setup.

### P2.2 — First nomad trip (Portugal recommended as first location)
- [ ] D8 Digital Nomad Visa application started (or 90-day tourist period used while visa processes)
- [ ] Accommodation confirmed with dedicated fast internet (test with a speed test before booking)
- [ ] NOS or Vodafone PT SIM purchased on arrival
- [ ] Mullvad on from the moment you connect to any non-home WiFi
- [ ] First full working week from Portugal with no productivity degradation vs home setup

Quality gate: same output rate in Portugal as at home. If output drops, identify and resolve the specific constraint (internet, ergonomics, timezone, distraction).

### P2.3 — Bootable clone
- Carbon Copy Cloner or SuperDuper installed
- Monthly clone scheduled (first Sunday of month)
- First clone completed and boot-tested (hold Option on startup, select clone drive, verify it boots)

### P2.4 — Supabase export automation
```bash
# Add to crontab (via n8n or cron):
# Every Sunday 08:00: export Supabase DB to encrypted local backup
supabase db dump --db-url "postgresql://..." | gpg --encrypt -r james@ablemusic.co > ~/backups/supabase-$(date +%Y%m%d).sql.gpg
```
Store on Samsung T7 Shield 2TB travel backup.

### P2 quality gates
- [ ] Standing desk in daily use, break schedule followed for 2 consecutive weeks
- [ ] Red light therapy panel in use daily for 1 month
- [ ] First nomad trip completed, productivity maintained
- [ ] Bootable clone created and boot-verified
- [ ] Supabase export running on schedule

---

## What makes this 10

10/10 requires three things that cannot be achieved by equipment alone:

### 1. The ergonomic protocol is a daily habit, not a setup

The hardware (standing desk, monitor arm, vertical mouse) only prevents damage if used correctly. 10/10 is not "the equipment is purchased." It is "I have not sat for more than 25 minutes without a break for 30 consecutive days." The protocol is embedded in your daily rhythm.

Verify: after 30 days, do you notice less end-of-day neck stiffness than you had before? If yes, the setup is working. If not, identify the deviation (skipping breaks, screen angle wrong, mouse position drifted).

### 2. The nomad configuration has been live-tested in at least two locations

Portugal can be treated as a dry run. Colombia or Thailand is the real test: time zone offset, different internet conditions, different power, a different ergonomic setup in a co-working space. 10/10 means you can operate ABLE at full capacity from any location on the list.

### 3. The automation layer (n8n) is reducing active monitoring time to under 30 minutes per week

10/10 on the software stack is not "all tools are installed." It is "the tools are working together." The market digest arrives in Telegram every morning. The financial summary arrives every Monday. Supabase alerts arrive when an artist signs up. You are reading signals, not polling dashboards.

Verify: track how often you open Stripe, FreeAgent, or Supabase dashboards in a week. If you are opening them daily, n8n is not yet doing its job. 10/10 is when you open them only when n8n surfaces a reason to.

---

## Gap summary

| Gap | Priority | Effort | Blocks |
|---|---|---|---|
| Ergonomic peripherals purchased | P0 | Low (buy) | Daily disc management |
| Ollama models on external SSD | P0 | Low (configure) | Local AI capability |
| n8n first workflows live | P1 | Medium (build) | Automation layer |
| Travel kit fully tested | P1 | Medium (trip) | Nomad freedom |
| Red light protocol established | P2 | Low (buy + habit) | C5/C6 recovery |
| Bootable clone | P2 | Low (configure) | Machine resilience |
| First nomad trip (Portugal) | P2 | High (logistics) | Location freedom |
| Ergonomic habits embedded | P2 | Ongoing discipline | Long-term disc health |
