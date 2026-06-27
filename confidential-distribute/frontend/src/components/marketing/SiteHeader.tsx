"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { ConnectButton } from "@zama-season3/shared";
import { FaIcon } from "@/components/FaIcon";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onApp = pathname.startsWith("/app");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`cd-header ${scrolled || onApp ? "cd-header-scrolled" : !onApp ? "cd-header-hero" : ""}`}
    >
      <div className="cd-container cd-header-row">
        <Link href="/" className="cd-brand cd-brand-link">
          <div className="cd-logo-mark">
            <FaIcon icon={faGift} size="sm" />
          </div>
          <span className="cd-brand-name">Confidential Distribute</span>
        </Link>
        <nav className="cd-nav" aria-label="Sections">
          <Link href="/#product">Product</Link>
          <Link href="/#privacy">Privacy</Link>
          <Link href="/app" className={onApp ? "cd-nav-active" : undefined}>
            App
          </Link>
        </nav>
        <div className="cd-header-actions">
          {onApp ? (
            <Link href="/" className="cd-btn cd-btn-outline cd-btn-sm">
              Overview
            </Link>
          ) : (
            <Link href="/app" className="cd-btn cd-btn-primary cd-btn-sm">
              Open App
            </Link>
          )}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
