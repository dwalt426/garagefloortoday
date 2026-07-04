import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";
import { organizationLd } from "../lib/schema-org";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garagefloortoday.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "GarageFloorToday | Beautiful Garage Floors. Built to Perform for Decades.",
    template: "%s | GarageFloorToday",
  },
  description:
    "America's premium concrete coating company. Documented ArmorPrep™ preparation, engineered material selection, and a FloorPassport™ record on every floor.",
  openGraph: {
    type: "website",
    siteName: "GarageFloorToday",
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
