# Monetisation — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is a monetisation system so clean that artists tell each other "the fees are honest" — and the first Stripe payout notification feels like the platform earned it.

---

## Moment 1: The Fan Cap That Feels Like a Gift

**What it is:** When a Free artist reaches 80 fans, a progress bar appears in admin.html above the fan list: "80 of 100 fans — your free list is nearly full." Below it: "20 spots left. Artist gives you 2,000." At 100 fans, the bar fills red. The copy changes: "You've reached 100 fans. That's a real audience. Your next 1,900 are one step away."

**Why it's 20/10:** The fan cap is a gate. Every platform has gates. What separates a 20/10 gate from a generic paywall is specificity and timing. "20 spots left. Artist gives you 2,000." gives the artist an exact number — not a percentage, not a tier comparison table, just the number they are currently missing. "That's a real audience" acknowledges what they have built before asking them to pay. The artist who reaches 100 fans has already proved they can grow an audience. The upgrade prompt at that moment is not a dark pattern — it is honest information delivered when it is most relevant and most valuable.

**Exact implementation:**

The full `renderFanCapProgress()` function is specified in PATH-TO-10.md P0.1. The 20/10 detail is the copy precision at the exact cap threshold:

```javascript
// At 100 fans exactly — the upgrade moment
const overlayHtml = `
  <div class="fan-cap-overlay">
    <p class="fan-cap-overlay-headline">You've reached 100 fans.</p>
    <p class="fan-cap-overlay-body">That's a real audience. Your next 1,900 are one step away.</p>
    <button class="fan-cap-overlay-cta" onclick="openUpgradeSheet('fan-list')">
      See Artist plans
    </button>
    <button class="fan-cap-overlay-dismiss" onclick="this.parentElement.remove()">
      Stay on Free
    </button>
  </div>
`;
```

The "Stay on Free" dismiss button is critical. It acknowledges that Free is a real choice. The artist is not being trapped — they are being informed. If they dismiss, the progress bar (in red) remains. The gate is still visible. But the artist chose it. That respect for their agency is what makes the upgrade feel like a decision rather than a capture.

---

## Moment 2: The First Stripe Payout

**What it is:** When an artist receives their first fan support payment and the Stripe payout clears to their bank account, ABLE sends a single email — not from Stripe, from ABLE — with the subject: "Your first payout cleared." The body: "£[amount] is in your account. [Fan name or email] supported you. ABLE's 5%: £[amount]. Your payment: £[amount]."

**Why it's 20/10:** The first payout is a milestone. Not financially — the first payment is usually small. But emotionally, it is the first time an artist has been paid directly by a fan through a platform that did not take 30% and did not obscure who the fan was. The email makes the relationship explicit: this specific person paid you this specific amount and here is exactly what ABLE took. That level of transparency — "ABLE's 5%: £0.50" written as a line item — is unusual enough to be memorable. The artist will tell someone about it.

**Exact implementation:**

```javascript
// netlify/functions/stripe-webhook.js — handles charge.succeeded
// Triggered when a fan support payment clears

case 'charge.succeeded': {
  const charge = event.data.object;
  const artistId = charge.metadata.artist_id;
  const fanEmail = charge.billing_details?.email;
  const gross = charge.amount / 100; // pence to £
  const ableFee = parseFloat((gross * 0.05).toFixed(2));
  const stripeFee = parseFloat(((gross * 0.014) + 0.20).toFixed(2)); // UK card estimate
  const artistNet = parseFloat((gross - ableFee - stripeFee).toFixed(2));

  // First payout detection: query Supabase for prior charges from this artist
  const { count } = await supabase
    .from('charges')
    .select('*', { count: 'exact', head: true })
    .eq('artist_id', artistId);

  const isFirstPayout = count === 0;

  // Send email via Resend
  await resend.emails.send({
    from: 'ABLE <hello@mail.ablemusic.co>',
    to: artistEmail,
    subject: isFirstPayout ? 'Your first payout cleared.' : `£${artistNet} cleared.`,
    html: buildPayoutEmail({
      isFirstPayout,
      fanEmail,
      gross,
      ableFee,
      stripeFee,
      artistNet,
    }),
  });
  break;
}
```

```javascript
function buildPayoutEmail({ isFirstPayout, fanEmail, gross, ableFee, stripeFee, artistNet }) {
  const fanLine = fanEmail
    ? `<p>${fanEmail} supported you.</p>`
    : `<p>A fan supported you.</p>`;

  return `
    ${isFirstPayout ? '<p>Your first payout cleared.</p>' : ''}
    ${fanLine}
    <table style="font-size:13px;line-height:1.8;border-collapse:collapse;">
      <tr><td>Fan payment</td><td style="padding-left:24px;">£${gross.toFixed(2)}</td></tr>
      <tr><td>Stripe fee</td><td style="padding-left:24px;">−£${stripeFee.toFixed(2)}</td></tr>
      <tr><td>ABLE's 5%</td><td style="padding-left:24px;">−£${ableFee.toFixed(2)}</td></tr>
      <tr style="font-weight:600;"><td>Your payment</td><td style="padding-left:24px;">£${artistNet.toFixed(2)}</td></tr>
    </table>
    <p style="margin-top:16px;">It's in your Stripe account. Standard payout to your bank: 2–7 days.</p>
    <p style="font-size:12px;color:#888;">ABLE · ablemusic.co</p>
  `;
}
```

"ABLE's 5%" — labelled exactly that, with the percentage. No euphemism. No "platform service fee." Just what it is.

---

## Moment 3: The Support Pack Fan Who Gets Named

**What it is:** In admin.html, when a fan purchases a Support Pack, they appear in a new row in the fans section with a small badge: "Supporter — Inner Circle — £10". The artist can see exactly who supported them and at what level. When the artist opens that fan's record, a line reads: "Alex has supported you. They signed up 4 months ago."

**Why it's 20/10:** Every payment platform shows you a transaction. ABLE shows you a person. The fan who paid £10 for the Inner Circle tier is not a transaction number — they are Alex, who signed up four months ago from your Instagram, who has been on your list through two campaign cycles, and who decided to pay you. When an artist sees this, the support pack is no longer a product. It is a relationship. The artist remembers Alex. They might reply to the confirmation email. They might mention them in a story. This is what ABLE means by "your relationship, not ours."

**Exact implementation:**

```javascript
// In admin.html fan list renderer — when fan has a support entry
function renderFanRow(fan) {
  const supportBadge = fan.support?.length
    ? `<span class="fan-support-badge">
         Supporter · ${fan.support[0].packLabel} · £${(fan.support[0].amount / 100).toFixed(0)}
       </span>`
    : '';

  const signupAge = getRelativeAge(fan.ts); // e.g. "4 months ago"

  return `
    <div class="fan-row ${fan.support?.length ? 'fan-row--supporter' : ''}">
      <div class="fan-row-email">${fan.email}</div>
      <div class="fan-row-meta">
        ${supportBadge}
        <span class="fan-row-age">Joined ${signupAge}</span>
      </div>
    </div>
  `;
}
```

```css
.fan-row--supporter {
  border-left: 2px solid var(--acc);
  padding-left: 12px;
}

.fan-support-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--acc);
  background: rgba(var(--acc-rgb), 0.1);
  padding: 2px 8px;
  border-radius: 100px;
  letter-spacing: 0.02em;
}
```

When the artist opens the fan detail sheet, the first line after the email reads: "[Name or email] has supported you. They signed up [age]." — warm, specific, in ABLE's voice. Not: "Transaction received from fan@example.com on 2026-03-15."

---

## The 20/10 test

You know the monetisation system has crossed into extraordinary when an artist receives their first payout email, screenshots the fee breakdown, and shares it with another artist as evidence that ABLE is honest — and the other artist signs up because of it.
