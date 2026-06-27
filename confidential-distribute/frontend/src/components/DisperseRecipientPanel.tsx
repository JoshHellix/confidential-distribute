"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import {
  RegistryBrowser,
  useConfidentialBalance,
  shortenAddress,
  type TokenWrapperPair,
} from "@zama-season3/shared";
import { LockIcon } from "@/components/icons";

/** Recipients of a confidential disperse decrypt their allocation via ERC-7984 balance. */
export function DisperseRecipientPanel() {
  const [selectedPair, setSelectedPair] = useState<TokenWrapperPair | null>(null);
  const token = selectedPair?.confidentialTokenAddress;
  const { balance, loading, error, neverShielded, decryptBalance } = useConfidentialBalance(token);
  const formattedBalance = balance !== null ? formatUnits(balance, 6) : null;

  return (
    <div className="cd-recipient-portal cd-recipient-portal-secondary">
      <div className="cd-recipient-card card-hover">
        <div className="cd-recipient-icon">
          <LockIcon size={28} />
        </div>
        <h3>Disperse allocation</h3>
        <p className="zama-muted cd-recipient-sub">
          Received a bulk confidential payout? Select your ERC-7984 token and decrypt your share (EIP-712).
        </p>

        {selectedPair && (
          <p className="zama-muted" style={{ marginBottom: "1rem" }}>
            Token: <code>{shortenAddress(selectedPair.confidentialTokenAddress, 8)}</code>
          </p>
        )}

        <RegistryBrowser chainKey="sepolia" selected={selectedPair} onSelect={setSelectedPair} />

        <button
          type="button"
          className="cd-btn cd-btn-iris"
          style={{ marginTop: "1rem" }}
          disabled={!token || loading}
          onClick={() => void decryptBalance()}
        >
          {loading ? "Decrypting…" : "Verify & Decrypt My Allocation"}
        </button>

        {formattedBalance !== null && (
          <div className="cd-reveal-box" style={{ marginTop: "1rem" }}>
            <p className="cd-label">Your decrypted balance</p>
            <p className="cd-reveal-value">{formattedBalance} USDC</p>
          </div>
        )}
        {neverShielded && !formattedBalance && token && (
          <p className="zama-muted" style={{ marginTop: "0.75rem" }}>
            No allocation found yet — confirm the admin included your wallet in the disperse.
          </p>
        )}
        {error && <p className="zama-error">{error}</p>}
      </div>
    </div>
  );
}
