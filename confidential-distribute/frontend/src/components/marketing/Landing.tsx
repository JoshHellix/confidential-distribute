"use client";

import Link from "next/link";
import { useState } from "react";
import {
  faArrowRight,
  faGift,
  faLink,
  faLock,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollReveal } from "./ScrollReveal";
import { FaIcon } from "@/components/FaIcon";

function HeroVideo() {
  return (
    <div className="cd-hero-media" aria-hidden>
      <div className="cd-hero-video-frame">
        <video className="cd-hero-video" autoPlay muted loop playsInline>
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="cd-hero-watermark-shield" />
      <div className="cd-hero-overlay" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="cd-hero-full">
      <HeroVideo />
      <div className="cd-container cd-hero-inner">
        <ScrollReveal>
          <p className="cd-hero-eyebrow">
            <FaIcon icon={faLock} size="sm" />
            Encrypted allocations
          </p>
          <h1 className="cd-hero-title">Distribute tokens without exposing who got how much.</h1>
          <p className="cd-hero-sub">
            Confidential airdrops, payroll runs, and bulk disperse on Ethereum — amounts and per-wallet shares stay
            encrypted until each recipient authorizes decrypt.
          </p>
          <div className="cd-hero-cta">
            <Link href="/app" className="cd-btn cd-btn-primary cd-btn-icon">
              Launch Distribution
              <FaIcon icon={faArrowRight} size="sm" />
            </Link>
            <Link href="/#privacy" className="cd-btn cd-btn-outline">
              Privacy model
            </Link>
          </div>
          <ul className="cd-hero-features">
            <li>
              <FaIcon icon={faGift} />
              <span>Airdrop campaigns</span>
            </li>
            <li>
              <FaIcon icon={faUsers} />
              <span>Bulk disperse</span>
            </li>
            <li>
              <FaIcon icon={faLink} />
              <span>Claim links</span>
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ProblemSection() {
  const items = [
    {
      icon: faGift,
      title: "Airdrops leak",
      body: "Public chains reveal allocation amounts. Front-runners and analysts scrape recipient data in seconds.",
    },
    {
      icon: faWallet,
      title: "Payroll leaks",
      body: "Employer distributions expose compensation bands. Sensitive payroll becomes permanent public record.",
    },
    {
      icon: faLock,
      title: "Our approach",
      body: "Encrypt every allocation onchain. Recipients decrypt only their share via EIP-712 — nothing plaintext.",
      highlight: true,
    },
  ];

  return (
    <section id="product" className="cd-section">
      <div className="cd-container">
        <ScrollReveal className="cd-section-head">
          <h2>Why public distribution fails</h2>
          <p>Amounts and recipient lists have always been visible onchain. Confidential Distribute fixes that.</p>
        </ScrollReveal>
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.title} className="col-md-4">
              <ScrollReveal>
                <div className={`cd-problem-card card-hover ${item.highlight ? "cd-problem-highlight" : ""}`}>
                  <div className="cd-problem-icon">
                    <FaIcon icon={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const steps = [
    { icon: faLock, title: "Admin encrypts", desc: "Deploy campaign or disperse. Allocations stay encrypted." },
    { icon: faLink, title: "Share privately", desc: "Send claim link. Nothing plaintext on Etherscan." },
    { icon: faGift, title: "Recipient claims", desc: "EIP-712 → claim → decrypt their allocation." },
  ];

  return (
    <section className="cd-section cd-section-alt">
      <div className="cd-container">
        <ScrollReveal className="cd-section-head">
          <h2>How it works</h2>
          <p>Encrypt → share → claim &amp; decrypt</p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="cd-stepper">
            {steps.map((step, idx) => (
              <button
                key={step.title}
                type="button"
                className={`cd-stepper-item ${active === idx ? "is-active" : ""}`}
                onClick={() => setActive(idx)}
              >
                <div className="cd-stepper-circle">
                  <FaIcon icon={step.icon} size="sm" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function PrivacySection() {
  const [decrypted, setDecrypted] = useState(false);

  return (
    <section id="privacy" className="cd-section">
      <div className="cd-container">
        <ScrollReveal className="cd-section-head">
          <h2>Public vs confidential</h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="cd-table-wrap">
            <table className="cd-privacy-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Public blockchains</th>
                  <th className="cd-teal">Confidential Distribute</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Distribution amounts", "Visible", "Encrypted"],
                  ["Per-recipient allocations", "Visible", "Encrypted"],
                  ["Recipient can claim", "N/A", "EIP-712 authorized"],
                  ["Recipient can decrypt", "N/A", "Own allocation only"],
                ].map(([data, pub, priv]) => (
                  <tr key={data}>
                    <td>{data}</td>
                    <td>{pub}</td>
                    <td className="cd-teal">{priv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="cd-reveal-widget card-hover">
            <h3>Try the reveal</h3>
            <div className="cd-reveal-box">
              <p className="cd-label">Your balance</p>
              <p className="cd-reveal-value">{decrypted ? "1.00 USDC" : "●●●●●●"}</p>
            </div>
            <button
              type="button"
              className={`cd-btn ${decrypted ? "cd-btn-success" : "cd-btn-primary"}`}
              onClick={() => setDecrypted(!decrypted)}
            >
              {decrypted ? "Decrypted ✓" : "Decrypt my allocation"}
            </button>
            <p className="cd-caption cd-caption-center">Only authorized recipients can decrypt their own allocation</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function AppCTASection() {
  return (
    <section id="app" className="cd-section cd-app-cta-section">
      <div className="cd-container cd-app-cta-inner">
        <ScrollReveal>
          <h2>Run your first confidential campaign</h2>
          <p className="cd-app-cta-sub">
            The distribution console is on a dedicated page — connect your wallet, pick a token, and launch without
            scrolling through marketing copy.
          </p>
          <div className="cd-hero-cta">
            <Link href="/app" className="cd-btn cd-btn-primary cd-btn-icon">
              Open Distribution App
              <FaIcon icon={faArrowRight} size="sm" />
            </Link>
            <Link href="/app?tab=recipient" className="cd-btn cd-btn-outline">
              I have a claim link
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export type ActivityItem = {
  type: "launch" | "disperse" | "claim";
  description: string;
  txHash?: string;
  time: string;
};

const MOCK_ACTIVITY: ActivityItem[] = [
  { type: "launch", description: "Confidential airdrop campaign deployed", txHash: "0x3d5a…21f9", time: "Example" },
  { type: "claim", description: "Recipient claimed encrypted allocation", txHash: "0x8b2c…4e1a", time: "Example" },
  { type: "disperse", description: "Bulk disperse to 3 wallets", txHash: "0x1f9e…7c02", time: "Example" },
];

export function ActivitySection({ items }: { items: ActivityItem[] }) {
  const list = items.length > 0 ? items : MOCK_ACTIVITY;
  const showMockNote = items.length === 0;

  return (
    <section className="cd-section">
      <div className="cd-container">
        <ScrollReveal className="cd-section-head">
          <h2>Recent Activity</h2>
          {showMockNote && <p className="cd-caption cd-caption-center">Launch a campaign to see live activity here</p>}
        </ScrollReveal>
        <div className="cd-activity-list">
          {list.map((a, i) => (
            <ScrollReveal key={`${a.description}-${i}`}>
              <div className={`cd-activity-row cd-activity-${a.type}`}>
                <div>
                  <p className="cd-activity-title">{a.description}</p>
                  <p className="cd-activity-meta">
                    {a.time}
                    {a.txHash ? ` · ${a.txHash}` : ""}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="cd-footer">
      <div className="cd-container cd-footer-inner">
        <p>
          <strong className="cd-teal">Confidential Distribute</strong>
        </p>
        <p className="cd-caption">TokenOps SDK × Zama FHE × ERC-7984</p>
        <p className="cd-footer-program">Zama Developer Program Season 3 · Special Bounty</p>
        <p className="cd-footer-tagline">Give privately. Pay in bulk. Stay encrypted.</p>
      </div>
    </footer>
  );
}
