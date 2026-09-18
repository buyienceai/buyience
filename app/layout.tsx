import type { Metadata } from "next";
import { Manrope, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import DeferredGTM from "@/components/DeferredGTM";
import { getSiteUrl, isSeoIndexingEnabled, seoRobots } from "@/lib/seo";
import "./globals.css";

const GTM_ID = "GTM-KMWGZ8VH";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const defaultTitle = "B2B Commerce Platform with AI Quoting | Buyience Nova Core";
const defaultDescription =
  "AI-powered B2B commerce platform for wholesalers & distributors. Customer-specific pricing, real-time inventory, and quote generation. Launch in days.";

const seoEnabled = isSeoIndexingEnabled();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: "%s",
  },
  description: defaultDescription,
  // Search Console verification only on the indexed production host.
  ...(seoEnabled
    ? {
        verification: {
          google: "HT1ZDn2e00LbZe1Aq9wW2iYNu9Y3MN6kkhDZMz5N5RE",
        },
      }
    : {}),
  robots: seoRobots(),
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    ...(seoEnabled ? { url: "/" } : {}),
    siteName: "Buyience",
    type: "website",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <CurrencyProvider>{children}</CurrencyProvider>
        <DeferredGTM />
        <DeferredAnalytics />
      </body>
    </html>
  );
}
