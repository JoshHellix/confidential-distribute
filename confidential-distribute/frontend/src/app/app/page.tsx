"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppDashboard } from "@/components/AppDashboard";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { ActivitySection, SiteFooter, type ActivityItem } from "@/components/marketing/Landing";
import type { ClaimPayload } from "@/components/AirdropAdmin";
import { decodeClaimPayload } from "@/lib/claimLink";

function AppPageInner() {
  const searchParams = useSearchParams();
  const [claimPayload, setClaimPayload] = useState<ClaimPayload | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [appTab, setAppTab] = useState<"airdrop" | "disperse" | "recipient">("airdrop");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "airdrop" || tab === "disperse" || tab === "recipient") {
      setAppTab(tab);
    }

    const encoded = searchParams.get("claim");
    if (!encoded) return;
    const payload = decodeClaimPayload(encoded);
    if (payload) {
      setClaimPayload(payload);
      setAppTab("recipient");
    }
  }, [searchParams]);

  function pushActivity(item: ActivityItem) {
    setActivity((prev) => [item, ...prev].slice(0, 5));
  }

  return (
    <main className="dist-page dist-app-page">
      <SiteHeader />
      <div className="cd-app-hero">
        <div className="cd-container">
          <h1 className="cd-app-hero-title">Distribution console</h1>
          <p className="cd-app-hero-sub">
            Launch confidential airdrops, run bulk disperse, or claim your allocation — all on Sepolia via TokenOps.
          </p>
        </div>
      </div>
      <AppDashboard
        claimPayload={claimPayload}
        onCampaignReady={setClaimPayload}
        onActivity={pushActivity}
        initialTab={appTab}
      />
      <ActivitySection items={activity} />
      <SiteFooter />
    </main>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<main className="dist-page dist-app-page" style={{ padding: "2rem" }}>Loading…</main>}>
      <AppPageInner />
    </Suspense>
  );
}
