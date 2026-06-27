# Confidential Distribute

TokenOps special-bounty submission for **Zama Developer Program — Season 3**.

Live app: **https://confidential-distribute.vercel.app**

Connect on Sepolia, run a confidential airdrop or a bulk disperse, hand a recipient a claim link, and let them decrypt only their own allocation. No local setup required for judges.

Landing at `/`. Admin + recipient flows at `/app`.

---

## Repository layout (contracts + frontend in one repo)

```
confidential-distribute/
  contracts/   ← TokenOps factory/singleton interfaces + Sepolia addresses
  frontend/    ← Next.js dApp (Vercel root)
packages/shared/   ← registry picker, faucet, wrap panel (monorepo root)
```

Onchain airdrop/disperse logic is **TokenOps-deployed**; `contracts/` documents those integrations. The frontend drives them through `@tokenops/sdk`.

---

## What this app does

Teams and DAOs distribute tokens all the time — airdrops, payroll, investor unlocks, community rewards. On a normal chain, **everyone sees every allocation**. That invites front-running, cap-table leakage, and awkward compensation politics.

Confidential Distribute wraps the **TokenOps SDK** so distribution amounts stay encrypted onchain (`euint64`), while recipients can still **verify and decrypt their own share** through EIP-712. One polished frontend covers both **confidential airdrop** (campaign + signed claim link) and **confidential disperse** (bulk encrypted payouts).

---

## Real-world use cases

- **Community airdrops** — reward early users without broadcasting who got how much
- **Team / payroll payouts** — salaries and bonuses stay private between employer and employee
- **Investor distributions** — vesting unlocks without leaking allocation tiers onchain
- **DAO grants** — committee-approved payouts where grant size is not public gossip

---

## Live demo

**https://confidential-distribute.vercel.app** · Sepolia testnet

---

## Features (bounty alignment)

| Requirement | How it works |
|-------------|--------------|
| TokenOps SDK (`@tokenops/sdk` npm) | `fhe-airdrop` + `fhe-disperse` React hooks |
| ERC-7984 confidential tokens | Official Wrappers Registry picker on Sepolia |
| Confidential airdrop | Deploy campaign → encrypt allocation → sign claim auth → share link |
| Confidential disperse | One-time register → encrypt per-recipient amounts → disperse |
| Recipient verify + decrypt | Claim via EIP-712, then decrypt own balance / allocation |
| Amounts confidential onchain | Encrypted `euint64` via TokenOps + FHEVM |
| Smart contract + frontend | TokenOps-deployed contracts via SDK; Next.js admin + recipient UI |
| Polished UX | Marketing landing, tabbed app, progress states, claim links, activity feed |
| Admin token prep | Sepolia faucet + shield panel (mint underlying → wrap before distributing) |

TokenOps handles the onchain contracts — this repo integrates them through the SDK rather than shipping custom Solidity for airdrop/disperse.

| Module | Package | Model |
|--------|---------|-------|
| FHE Airdrop | `@tokenops/sdk/fhe-airdrop` | New campaign contract per launch |
| FHE Disperse | `@tokenops/sdk/fhe-disperse` | Singleton on Sepolia |

---

## How to test (Sepolia)

### Airdrop — sender → recipient

1. Open **Airdrop** tab → select an ERC-7984 token from the registry
2. **Prepare tokens** → faucet mint + shield if you need balance
3. Enter recipient address + amount → **Launch Campaign**
4. Copy the **claim link** → open in recipient wallet (or switch to **Recipient** tab)
5. **Claim Confidential Tokens** → **Verify & Decrypt Balance**

### Disperse — bulk payout

1. Open **Disperse** tab → select token → **Register** (once per token)
2. Paste recipient addresses and amounts (one per line)
3. **Disperse Confidentially**
4. Recipient: **Recipient** tab → **Disperse allocation** → pick token → **Verify & Decrypt My Allocation**

---

## Judging criteria

| Criterion | What we built |
|-----------|---------------|
| **UX / frontend** | Premium landing, clear tabs, human-readable amounts, claim links, empty states and errors |
| **Functionality** | End-to-end airdrop + disperse + recipient decrypt on Sepolia |
| **Demo quality** | Video script walks problem → admin setup → recipient flow → privacy model ([`docs/VIDEO_SCRIPT_TRACK3.md`](../docs/VIDEO_SCRIPT_TRACK3.md)) |
| **Real-world viability** | Payroll, airdrops, investor unlocks — documented above; one app for both distribution modes |
| **Code quality** | TypeScript, TokenOps hooks, shared registry/wrap components in `packages/shared/` |

---

## Run locally

```bash
npm install
npm run dev:tokenops    # http://localhost:3002
```

Copy `confidential-distribute/.env.example` → `confidential-distribute/.env.local` for custom RPC or WalletConnect.

---

## Deploy to Vercel

1. Import repo → **Root Directory** = `confidential-distribute/frontend`
2. Install: `cd .. && npm install` (set in `vercel.json`)
3. Add env vars from `.env.example`
4. Deploy

---

## Submission checklist

| Item | Status |
|------|--------|
| Live URL | https://confidential-distribute.vercel.app |
| TokenOps SDK integration | Airdrop + disperse |
| ERC-7984 tokens | Registry picker |
| Sender configure + execute | Admin tabs |
| Recipient verify + decrypt | Recipient tab |
| Real-world use case | Documented above |
| Documentation | This file |
| Demo video | Recorded (script in `docs/`) |
| X thread / article | Publish before deadline |

**Reward:** 2,500 cUSDT (1 winner) · Submit via [Developer Hub](https://www.zama.org/developer-hub#developer-program) · **Deadline:** July 7, 2026, 23:59 AOE

Form description (copy-paste): [`docs/SUBMISSION_DESCRIPTIONS.md`](../docs/SUBMISSION_DESCRIPTIONS.md)

---

## Tech stack

Next.js 15 · TypeScript · `@tokenops/sdk` · `@zama-fhe/sdk` v3 · `@zama-fhe/react-sdk` v3 · wagmi · viem

---

## Repo layout

Each submission repo contains **contracts + frontend** for that track. Vercel root directories:

| Track | Vercel Root Directory |
|-------|------------------------|
| Wrapper Registry | `wrapper-registry/frontend` |
| Factor | `factor/frontend` |
| Confidential Distribute | `confidential-distribute/frontend` |

Publish a track-only repo: `node scripts/publish-track-repo.mjs <track-name>`
