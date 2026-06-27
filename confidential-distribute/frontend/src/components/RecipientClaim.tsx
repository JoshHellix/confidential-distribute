"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatUnits } from "viem";
import { useClaim } from "@tokenops/sdk/fhe-airdrop/react";
import { useConfidentialBalance, shortenAddress } from "@zama-season3/shared";
import { LockIcon } from "@/components/icons";
import type { ClaimPayload } from "./AirdropAdmin";

interface RecipientClaimProps {
  payload: ClaimPayload | null;
  onClaimed?: () => void;
}

function RecipientClaimInner({ payload, onClaimed }: { payload: ClaimPayload; onClaimed?: () => void }) {
  const queryClient = useQueryClient();
  const claim = useClaim({ address: payload.airdropAddress });
  const { balance, loading, error: decryptError, neverShielded, decryptBalance } = useConfidentialBalance(
    payload.tokenAddress,
  );
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);
  const [decrypted, setDecrypted] = useState(false);

  async function handleClaim() {
    setClaimError(null);
    try {
      await claim.mutateAsync({
        encryptedInput: payload.encryptedInput,
        signature: payload.signature,
      });
      queryClient.invalidateQueries({ queryKey: ["tokenops-sdk", "fhe-airdrop"] });
      setClaimed(true);
      onClaimed?.();
    } catch (e) {
      setClaimError(e instanceof Error ? e.message : "Claim failed");
    }
  }

  async function handleDecrypt() {
    await decryptBalance();
    setDecrypted(true);
  }

  const formattedBalance = balance !== null ? formatUnits(balance, 6) : null;

  return (
    <div className="cd-recipient-portal">
      <div className="cd-recipient-card card-hover">
        <div className="cd-recipient-icon">
          <LockIcon size={28} />
        </div>
        <h3>Claim your allocation</h3>
        <p className="zama-muted cd-recipient-sub">
          Airdrop <code>{shortenAddress(payload.airdropAddress, 8)}</code> · Token{" "}
          <code>{shortenAddress(payload.tokenAddress, 8)}</code>
        </p>

        {claim.isPending && (
          <div className="cd-claim-progress">
            <p>Claiming… Signing EIP-712 authorization</p>
            <div className="cd-progress-bar skeleton" />
          </div>
        )}

        {!claimed && !claim.isPending && (
          <button type="button" className="cd-btn cd-btn-primary cd-btn-lg" disabled={claim.isPending} onClick={handleClaim}>
            Claim Confidential Tokens
          </button>
        )}

        {claimed && (
          <>
            <p className="cd-success-inline">Claim submitted successfully</p>
            <div className="cd-reveal-box">
              <p className="cd-label">Your encrypted allocation</p>
              <p className="cd-reveal-value">{decrypted && formattedBalance ? `${formattedBalance} USDC` : "●●●●●●●●"}</p>
            </div>
            <button type="button" className="cd-btn cd-btn-iris" disabled={loading} onClick={() => void handleDecrypt()}>
              {loading ? "Decrypting…" : "Verify & Decrypt Balance"}
            </button>
          </>
        )}

        {neverShielded && claimed && !formattedBalance && (
          <p className="zama-muted" style={{ marginTop: "0.75rem" }}>
            Decrypt may take a moment after the claim confirms onchain.
          </p>
        )}
        {claimError && <p className="zama-error">{claimError}</p>}
        {decryptError && <p className="zama-error">{decryptError}</p>}
      </div>
    </div>
  );
}

export function RecipientClaim({ payload, onClaimed }: RecipientClaimProps) {
  if (!payload) {
    return (
      <div className="cd-recipient-portal">
        <div className="cd-recipient-card card-hover">
          <div className="cd-recipient-icon">
            <LockIcon size={28} />
          </div>
          <h3>Recipient portal</h3>
          <p className="zama-muted">
            Open a claim link from your admin, or launch a campaign first. Only the authorized recipient can claim and
            decrypt their allocation.
          </p>
        </div>
      </div>
    );
  }

  return <RecipientClaimInner payload={payload} onClaimed={onClaimed} />;
}
