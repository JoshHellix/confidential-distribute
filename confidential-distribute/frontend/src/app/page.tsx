"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AppCTASection,
  HeroSection,
  HowItWorksSection,
  PrivacySection,
  ProblemSection,
  SiteFooter,
} from "@/components/marketing/Landing";
import { SiteHeader } from "@/components/marketing/SiteHeader";

function ClaimRedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const claim = searchParams.get("claim");
    if (claim) {
      router.replace(`/app?claim=${encodeURIComponent(claim)}`);
    }
  }, [router, searchParams]);

  return null;
}

export default function HomePage() {
  return (
    <main className="cd-landing">
      <Suspense fallback={null}>
        <ClaimRedirectInner />
      </Suspense>
      <SiteHeader />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <PrivacySection />
      <AppCTASection />
      <SiteFooter />
    </main>
  );
}
