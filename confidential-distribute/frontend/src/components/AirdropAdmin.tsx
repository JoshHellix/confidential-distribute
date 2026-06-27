"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useZamaSDK } from "@zama-fhe/react-sdk";
import {
  useCreateConfidentialAirdropAndGetAddress,
  useSignClaimAuthorization,
  encryptUint64,
} from "@tokenops/sdk/fhe-airdrop/react";
import { useAccount } from "wagmi";
import { RegistryBrowser, shortenAddress, type TokenWrapperPair } from "@zama-season3/shared";
import { CopyIcon } from "@/components/icons";
import { AdminTokenPrep } from "@/components/AdminTokenPrep";
import { buildClaimUrl, parseUsdcInput } from "@/lib/claimLink";

export interface ClaimPayload {
  airdropAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  encryptedInput: { handle: `0x${string}`; inputProof: `0x${string}` };
  signature: `0x${string}`;
}

interface AirdropAdminProps {
  onCampaignReady: (payload: ClaimPayload) => void;
}

export function AirdropAdmin({ onCampaignReady }: AirdropAdminProps) {
  const { address } = useAccount();
  const zamaSDK = useZamaSDK();
  const queryClient = useQueryClient();
  const create = useCreateConfidentialAirdropAndGetAddress();
  const sign = useSignClaimAuthorization();

  const [selectedPair, setSelectedPair] = useState<TokenWrapperPair | null>(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("1.00");
  const [error, setError] = useState<string | null>(null);
  const [claimLink, setClaimLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleLaunch() {
    setError(null);
    setClaimLink(null);
    if (!address) {
      setError("Connect wallet");
      return;
    }
    if (!selectedPair) {
      setError("Select a confidential token from the registry");
      return;
    }
    if (!recipient.startsWith("0x")) {
      setError("Invalid recipient address");
      return;
    }

    const token = selectedPair.confidentialTokenAddress;

    try {
      const now = Math.floor(Date.now() / 1000);
      const { airdrop } = await create.mutateAsync({
        params: {
          token,
          startTimestamp: now + 60,
          endTimestamp: now + 30 * 86400,
          canExtendClaimWindow: false,
          admin: address,
        },
        userSalt: `0x${"01".repeat(32)}` as `0x${string}`,
      });

      queryClient.invalidateQueries({ queryKey: ["tokenops-sdk", "fhe-airdrop"] });

      const encrypted = await encryptUint64({
        encryptor: zamaSDK.relayer,
        contractAddress: airdrop,
        userAddress: recipient as `0x${string}`,
        value: parseUsdcInput(amount),
      });

      const signature = await sign.mutateAsync({
        airdropAddress: airdrop,
        recipient: recipient as `0x${string}`,
        encryptedAmountHandle: encrypted.handle,
      });

      const payload: ClaimPayload = {
        airdropAddress: airdrop,
        tokenAddress: token,
        encryptedInput: encrypted,
        signature,
      };

      const link = buildClaimUrl(payload);
      setClaimLink(link);
      onCampaignReady(payload);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Launch failed");
    }
  }

  async function copyLink() {
    if (!claimLink) return;
    await navigator.clipboard.writeText(claimLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="dist-grid dist-grid-2">
      <section className="zama-panel">
        <h2>Launch Confidential Airdrop</h2>
        <p className="zama-muted">
          Deploy via TokenOps factory, encrypt allocation, sign EIP-712 claim authorization for the recipient.
        </p>

        <label className="zama-field">
          <span>Recipient wallet</span>
          <input
            className="zama-input"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x…"
          />
        </label>
        <label className="zama-field">
          <span>Allocation (USDC, encrypted onchain)</span>
          <input className="zama-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1.00" />
        </label>

        <p className="zama-muted" style={{ marginBottom: "0.75rem" }}>
          Token:{" "}
          {selectedPair ? (
            <code>{shortenAddress(selectedPair.confidentialTokenAddress, 8)}</code>
          ) : (
            "Select from registry →"
          )}
        </p>

        <button
          type="button"
          className="zama-btn zama-btn-primary"
          disabled={create.isPending || sign.isPending}
          onClick={handleLaunch}
        >
          {create.isPending ? "Deploying…" : sign.isPending ? "Signing…" : "Launch Campaign"}
        </button>

        {error && <p className="zama-error">{error}</p>}

        {claimLink && (
          <div className="dist-success">
            <strong>Campaign live.</strong> Share this claim link with {shortenAddress(recipient as `0x${string}`, 4)}:
            <div className="dist-link-row">
              <input className="dist-link-input" readOnly value={claimLink} />
              <button type="button" className="zama-btn zama-btn-outline" onClick={copyLink}>
                <CopyIcon size={14} /> {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          </div>
        )}
      </section>

      <RegistryBrowser chainKey="sepolia" selected={selectedPair} onSelect={setSelectedPair} />
      <AdminTokenPrep selectedPair={selectedPair} />
    </div>
  );
}
