"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useZamaSDK } from "@zama-fhe/react-sdk";
import { useAccount } from "wagmi";
import {
  useIsRegistered,
  useRegister,
  usePreflightDisperse,
  useDisperse,
} from "@tokenops/sdk/fhe-disperse/react";
import { RegistryBrowser, shortenAddress, type TokenWrapperPair } from "@zama-season3/shared";
import { AdminTokenPrep } from "@/components/AdminTokenPrep";
import { parseUsdcLines } from "@/lib/claimLink";

interface DisperseAdminProps {
  onSuccess?: (hash: string) => void;
}

export function DisperseAdmin({ onSuccess }: DisperseAdminProps) {
  const { address } = useAccount();
  const zamaSDK = useZamaSDK();
  const queryClient = useQueryClient();
  const [selectedPair, setSelectedPair] = useState<TokenWrapperPair | null>(null);

  const token = selectedPair?.confidentialTokenAddress;
  const { data: isRegistered } = useIsRegistered({ user: address });
  const register = useRegister();
  const disperse = useDisperse({ encryptor: () => zamaSDK.relayer });

  const [recipientsText, setRecipientsText] = useState("");
  const [amountsText, setAmountsText] = useState("1.00\n0.50");
  const [status, setStatus] = useState<string | null>(null);

  const recipients = recipientsText.split("\n").map((s) => s.trim()).filter(Boolean) as `0x${string}`[];
  const amounts = parseUsdcLines(amountsText);

  const { data: report } = usePreflightDisperse({
    user: address,
    token: token as `0x${string}` | undefined,
    recipients,
    amounts,
    mode: "wallet",
  });

  async function handleRegister() {
    if (!token) {
      setStatus("Select a token from the registry");
      return;
    }
    await register.mutateAsync({ token });
    queryClient.invalidateQueries({ queryKey: ["tokenops-sdk", "fhe-disperse"] });
    setStatus("Registered for confidential disperse");
  }

  async function handleDisperse() {
    setStatus(null);
    if (!token) {
      setStatus("Select a token");
      return;
    }
    if (!report?.ready) {
      setStatus(report?.blockerErrors?.map((e) => e.message).join("; ") ?? "Preflight not ready");
      return;
    }
    try {
      const { hash } = await disperse.mutateAsync({
        token,
        mode: "wallet",
        recipients,
        amounts,
      });
      setStatus(`Dispersed successfully — tx ${shortenAddress(hash, 6)}`);
      onSuccess?.(hash);
      queryClient.invalidateQueries({ queryKey: ["tokenops-sdk", "fhe-disperse"] });
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Disperse failed");
    }
  }

  return (
    <div className="dist-grid dist-grid-2">
      <section className="zama-panel">
        <h2>Confidential Disperse</h2>
        <p className="zama-muted">Bulk payouts with encrypted per-recipient amounts via TokenOps singleton.</p>

        <p className="zama-muted" style={{ marginBottom: "0.75rem" }}>
          Token:{" "}
          {selectedPair ? (
            <code>{shortenAddress(selectedPair.confidentialTokenAddress, 8)}</code>
          ) : (
            "Select from registry →"
          )}
        </p>

        {token && !isRegistered && (
          <button type="button" className="zama-btn zama-btn-outline" disabled={register.isPending} onClick={handleRegister}>
            {register.isPending ? "Registering…" : "Register (one-time per token)"}
          </button>
        )}

        {isRegistered && <p className="zama-badge zama-badge-ok">Registered for this token</p>}

        <label className="zama-field">
          <span>Recipients (one address per line)</span>
          <textarea className="zama-input" rows={4} value={recipientsText} onChange={(e) => setRecipientsText(e.target.value)} placeholder="0x…" />
        </label>
        <label className="zama-field">
          <span>Amounts in USDC (one per line, e.g. 1.00)</span>
          <textarea className="zama-input" rows={4} value={amountsText} onChange={(e) => setAmountsText(e.target.value)} />
        </label>

        {report && !report.ready && report.blockerErrors.length > 0 && (
          <ul className="zama-error">
            {report.blockerErrors.map((err) => (
              <li key={err.code}>{err.message}</li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="zama-btn zama-btn-primary"
          disabled={!report?.ready || disperse.isPending || !token}
          onClick={handleDisperse}
        >
          {disperse.isPending ? "Dispersing…" : "Disperse Confidentially"}
        </button>

        {status && <p className="zama-muted" style={{ marginTop: "1rem" }}>{status}</p>}
      </section>

      <RegistryBrowser chainKey="sepolia" selected={selectedPair} onSelect={setSelectedPair} />
      <AdminTokenPrep selectedPair={selectedPair} />
    </div>
  );
}
