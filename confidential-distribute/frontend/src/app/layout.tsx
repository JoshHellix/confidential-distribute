import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "./providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@zama-season3/shared/styles.css";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Confidential Distribute | TokenOps × Zama",
  description: "Confidential airdrops and bulk disperse — allocation amounts encrypted onchain via TokenOps SDK.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
