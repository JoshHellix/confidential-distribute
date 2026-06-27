# Confidential Distribute — contracts

This track integrates **TokenOps-deployed** FHE contracts via `@tokenops/sdk`. We do not re-deploy airdrop/disperse logic; the frontend drives the official factory and singleton on Sepolia.

## What lives here

| Path | Purpose |
|------|---------|
| `interfaces/IFHEAirdropFactory.sol` | Factory used when launching a campaign |
| `interfaces/IFHEDisperseSingleton.sol` | Singleton for bulk confidential payouts |
| `deployments/sepolia.json` | Sepolia addresses (mirrors TokenOps SDK registry) |

## Sepolia addresses

| Contract | Address |
|----------|---------|
| Confidential Airdrop Factory | `0xbE6A3B78B36684fFee48De77d47Bc3393F5Acd4c` |
| Disperse Singleton | `0x710dD9885Cc9986EfD234E7719483147a6d8DBb4` |

Runtime calls, encryption, and React hooks live in the frontend (`@tokenops/sdk/fhe-airdrop`, `@tokenops/sdk/fhe-disperse`).

Frontend code: [`../frontend/`](../frontend/)
