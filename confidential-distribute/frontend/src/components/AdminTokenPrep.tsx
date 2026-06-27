"use client";

import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import {
  CHAIN_IDS,
  FaucetPanel,
  WrapUnwrapPanel,
  fetchEnrichedRegistryPairs,
  type TokenWrapperPair,
} from "@zama-season3/shared";

interface AdminTokenPrepProps {
  selectedPair: TokenWrapperPair | null;
}

/** Mint + wrap test tokens before launching a distribution (Sepolia). */
export function AdminTokenPrep({ selectedPair }: AdminTokenPrepProps) {
  const publicClient = usePublicClient({ chainId: CHAIN_IDS.sepolia });

  const { data: pairs = [] } = useQuery({
    queryKey: ["registry-pairs-enriched", "sepolia"],
    queryFn: async () => {
      if (!publicClient) return [];
      return fetchEnrichedRegistryPairs(publicClient, "sepolia");
    },
    enabled: !!publicClient,
  });

  if (!selectedPair) {
    return (
      <p className="zama-muted dist-token-prep-hint">
        Select a confidential token from the registry to mint test tokens and wrap before distributing.
      </p>
    );
  }

  return (
    <section className="zama-panel dist-token-prep">
      <h2>Prepare tokens (Sepolia)</h2>
      <p className="zama-muted">
        Admins need ERC-7984 balance to fund airdrops or disperse. Mint official cTokenMocks, then shield.
      </p>
      <FaucetPanel pairs={pairs} />
      <WrapUnwrapPanel pair={selectedPair} />
    </section>
  );
}
