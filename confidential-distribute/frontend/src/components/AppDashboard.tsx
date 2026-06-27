"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { AirdropAdmin, type ClaimPayload } from "@/components/AirdropAdmin";
import { DisperseAdmin } from "@/components/DisperseAdmin";
import { RecipientClaim } from "@/components/RecipientClaim";
import { DisperseRecipientPanel } from "@/components/DisperseRecipientPanel";
import type { ActivityItem } from "@/components/marketing/Landing";

type Tab = "airdrop" | "disperse" | "recipient";

interface AppDashboardProps {
  claimPayload: ClaimPayload | null;
  onCampaignReady: (payload: ClaimPayload) => void;
  onActivity: (item: ActivityItem) => void;
  initialTab?: Tab;
}

export function AppDashboard({ claimPayload, onCampaignReady, onActivity, initialTab = "airdrop" }: AppDashboardProps) {
  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  return (
    <section id="app" className="cd-section cd-app-section">
      <div className="cd-container">
        <ScrollReveal className="cd-section-head">
          <h2>The App</h2>
          <p>Admin: launch campaigns and disperse bulk. Recipients: claim and decrypt your allocation.</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="cd-app-tabs" role="tablist">
            {(
              [
                { id: "airdrop" as const, label: "Airdrop" },
                { id: "disperse" as const, label: "Disperse" },
                { id: "recipient" as const, label: "Recipient" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`cd-app-tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                {tab === t.id && <span className="cd-tab-underline" />}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="cd-app-panel">
            {tab === "airdrop" && (
              <AirdropAdmin
                onCampaignReady={(p) => {
                  onCampaignReady(p);
                  onActivity({
                    type: "launch",
                    description: "Confidential airdrop campaign launched",
                    time: "Just now",
                  });
                }}
              />
            )}
            {tab === "disperse" && (
              <DisperseAdmin
                onSuccess={(hash) =>
                  onActivity({
                    type: "disperse",
                    description: "Bulk confidential disperse submitted",
                    txHash: hash,
                    time: "Just now",
                  })
                }
              />
            )}
            {tab === "recipient" && (
              <>
                <RecipientClaim
                  payload={claimPayload}
                  onClaimed={() =>
                    onActivity({ type: "claim", description: "Recipient claimed allocation", time: "Just now" })
                  }
                />
                <DisperseRecipientPanel />
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
