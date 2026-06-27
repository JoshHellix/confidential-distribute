# Repository layout

This repo contains **one submission track** with smart contracts and frontend in the same repository:

```
confidential-distribute/
  contracts/   ← onchain interfaces + deployment references
  frontend/    ← Next.js dApp
packages/shared/   ← shared Zama UI + registry helpers
```

Vercel **Root Directory:** `confidential-distribute/frontend`

```bash
npm install
npm run dev -w confidential-distribute
```
