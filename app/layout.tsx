import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bookchaowalit-agencyrenting.vercel.app"),
  title: {
    default: "Agency Renting",
    template: "%s | Agency Renting",
  },
  description:
    "Rent and sell condominiums and houses in Thailand. Find your dream property with our expert real estate services.",
  keywords: [
    "real estate",
    "property rental",
    "condominiums",
    "houses",
    "Thailand",
    "Bangkok",
    "Phuket",
    "Pattaya",
  ],
  authors: [{ name: "Agency Renting" }],
  creator: "Agency Renting",
  publisher: "Agency Renting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agencyrenting.com",
    title: "Agency Renting - Premium Real Estate Services",
    description:
      "Find your perfect property in Thailand. Luxury condominiums and houses in prime locations.",
    siteName: "Agency Renting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Renting - Premium Real Estate Services",
    description:
      "Find your perfect property in Thailand. Luxury condominiums and houses in prime locations.",
    creator: "@agencyrenting",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {/* impeccable:contract
          THESIS: A property desk helps visitors find a fitting next address.
          OWN-WORLD: Cracktro listing queue: emissive void, dust fields, amber signal, no enclosing cards.
          STORY: Scan the signal, narrow the sample inventory, then hand off to a human.
          FIRST VIEWPORT: The address thesis and first listing rows are visible immediately.
          FORM: Baseline-led queue with image strips and depth through brightness, never card containers.
          FINISH: Product-specific bilingual copy, legible facts, reduced-motion drift, and honest demo boundaries.
          CONCEPT-SEED: 9a371622 / assigned candidate 5 / direction
        */}
  {/* Structured Data for SEO */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Agencyrenting',
        url: 'https://bookchaowalit-agencyrenting.vercel.app',
        description: 'Agencyrenting by Bookchaowalit - A modern web application',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Person',
          name: 'Bookchaowalit',
          url: 'https://bookchaowalit.com'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Bookchaowalit',
          url: 'https://bookchaowalit.com'
        }
      })
    }}
  />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Agencyrenting',
        url: 'https://bookchaowalit-agencyrenting.vercel.app',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://bookchaowalit-agencyrenting.vercel.app/more-projects',
          'query-input': 'required name=search_term'
        }
      })
    }}
  />


        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1"><Analytics />
        <SpeedInsights />
        {children}</div>
        </div>
      </body>
    </html>
  );
}
