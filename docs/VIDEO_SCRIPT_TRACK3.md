# Confidential Distribute — 3-Minute Special Bounty Video Pitch (Updated)

**Track:** Special Bounty × TokenOps · **2,500 cUSDT** (1 winner)  
**Target length:** **2:50 – 3:10** (hard stop at 3:15)  
**Live demo:** https://confidential-distribute.vercel.app  
**App URL:** https://confidential-distribute.vercel.app/app  
**Recipient claim shortcut:** https://confidential-distribute.vercel.app/app?tab=recipient

---

## Timing guide

| Rule | Value |
|------|--------|
| Speaking pace | **125–130 words/minute** |
| Max spoken words (with demos) | **~330** |
| This script spoken total | **~300 words** |
| Silent demo time | **~75 seconds** (deploy tx, claim, disperse) |

---

## Before you record

- [ ] MetaMask **Sepolia**, test ETH  
- [ ] **Admin** wallet + **Recipient** wallet (different addresses)  
- [ ] Rehearse: landing → app → airdrop full path → disperse → recipient decrypt  
- [ ] 1080p · copy claim link ready to paste in second browser/profile

**Judges care about:** TokenOps SDK · UX polish · sender + recipient end-to-end · real-world use case

---

## FULL SCRIPT

### [0:00 – 0:18] HOOK — landing (~48 words)

**DO:** **https://confidential-distribute.vercel.app** — hero video (emerald on midnight), headline *“Distribute tokens without exposing who got how much.”*

**SAY:**

> Hi, I'm **[your name]**. This is **Confidential Distribute** — confidential token distribution on **TokenOps** and Zama FHEVM. **[Season 3 Special Bounty.]**
>
> Public chains leak **airdrop sizes**, **payroll**, and **investor allocations**. We keep amounts **encrypted**; recipients decrypt **only their share**.

**[46 words]**

**DO:** Click **Launch Distribution** or header **Open App**.

---

### [0:18 – 0:38] PROBLEM — landing (~50 words)

**DO:** Scroll **Why public distribution fails** cards (airdrops / payroll / our approach). **PAUSE 2s** on highlighted card.

**SAY:**

> **DAOs** reward communities without front-runners reading allocations. **Startups** pay contractors without salary tiers on Etherscan. **Funds** distribute to LPs without cap-table leakage.
>
> TokenOps ships **FHE Airdrop** and **FHE Disperse**. We built the **frontend** so it feels like a product, not a lab demo.

**[48 words]**

**DO:** Click **Open Distribution App** → **/app** — “Distribution console”.

---

### [0:38 – 1:18] AIRDROP ADMIN (~60 words + 25s silence)

**DO:** **Airdrop** tab · **Connect Wallet** (Admin). **PAUSE.**

**SAY:**

> **Airdrop tab** — admin flow.

**DO:** Registry table → **Select** ERC-7984 token.

**SAY:**

> Official **Wrappers Registry** picker — same pairs Zama documents for Season 3.

**DO:** **Prepare tokens** — **Mint Test Tokens** → **Shield (Wrap)** if needed. **SILENCE on txs.**

**SAY:**

> Admin needs confidential balance first: faucet mint, then shield.

**DO:** **Launch Confidential Airdrop** — recipient address, allocation **1.00** → **Launch Campaign** → deploy tx + EIP-712 sign. **SILENCE.**

**SAY:**

> TokenOps deploys the campaign, encrypts the allocation, I authorize **this recipient only**.

**DO:** **Copy link** — show URL bar briefly.

**SAY:**

> **Claim link** — share privately. No plaintext amount onchain.

**[52 words + ~25s txs]**

---

### [1:18 – 1:48] RECIPIENT CLAIM (~45 words + 20s silence)

**DO:** Second wallet / incognito → open claim link OR **Recipient** tab with payload.

**SAY:**

> **Recipient** connects the **authorized wallet only**.

**DO:** **Claim Confidential Tokens** → confirm. **SILENCE.**

**SAY:**

> EIP-712 claim via TokenOps.

**DO:** **Verify & Decrypt Balance** → sign → show **1.00 USDC**. **PAUSE 3s.**

**SAY:**

> They see **their** allocation — nobody else's.

**[32 words + claim wait]**

---

### [1:48 – 2:18] DISPERSE BULK (~50 words + 22s silence)

**DO:** Back to Admin → **Disperse** tab.

**SAY:**

> For **bulk payouts** — payroll, team bonuses — **Disperse**.

**DO:** Select token → **Register** if needed → paste **Recipients** + **Amounts** (2–3 lines demo) → **Disperse Confidentially** → confirm. **SILENCE.**

**SAY:**

> Each line is an **encrypted** amount. Addresses visible; values are not.

**[28 words + disperse tx]**

---

### [2:18 – 2:35] DISPERSE RECIPIENT DECRYPT (~40 words + 10s silence)

**DO:** Recipient wallet → **Recipient** tab → **Disperse allocation** → select token → **Verify & Decrypt My Allocation**.

**SAY:**

> Disperse recipients don't need a claim link. They decrypt **their** ERC-7984 allocation from the app.

**[22 words]**

---

### [2:35 – 2:52] PRIVACY + UX (~45 words)

**DO:** Optional: landing **Public vs confidential** table scroll (5 sec).

**SAY:**

> **Stack:** `@tokenops/sdk` airdrop and disperse modules, SDK v3, ERC-7984, Next.js.
>
> This bounty is judged on **UX** — landing, dedicated app, tabs, claim links, progress states — because privacy tools must be **simple**.

**[38 words]**

---

### [2:52 – 3:05] CLOSE (~35 words)

**DO:** Landing hero or end card.

**SAY:**

> **Confidential Distribute** — airdrops and bulk disperse without leaks.

> **confidential-distribute.vercel.app** on Sepolia. Thanks — **#ZamaDeveloperProgram**.

**[24 words]**

```
Confidential Distribute
https://confidential-distribute.vercel.app
TokenOps SDK × Zama FHEVM
```

---

## UI click map (2026 layout)

| Flow | Where | Click |
|------|--------|--------|
| Enter app | Landing header/hero | **Open App** / **Launch Distribution** |
| Airdrop admin | `/app` → Airdrop | Registry **Select** |
| Prepare | Prepare tokens panel | Mint → **Shield (Wrap)** |
| Launch | Launch form | **Launch Campaign** → **Copy link** |
| Recipient | `/app?tab=recipient` or claim URL | **Claim** → **Verify & Decrypt** |
| Disperse admin | Disperse tab | Register → **Disperse Confidentially** |
| Disperse recipient | Recipient tab | **Verify & Decrypt My Allocation** |

---

## YouTube description

```
Confidential Distribute | Zama Season 3 × TokenOps

Confidential airdrops + bulk disperse — amounts encrypted onchain.
Recipients claim via EIP-712 and decrypt only their share.

🔗 https://confidential-distribute.vercel.app

#ZamaDeveloperProgram #FHE #TokenOps #Privacy
```

---

## Over time? Cut in this order

1. Landing problem cards (one sentence only)  
2. Disperse recipient decrypt (mention verbally, skip demo)  
3. Privacy table scroll
