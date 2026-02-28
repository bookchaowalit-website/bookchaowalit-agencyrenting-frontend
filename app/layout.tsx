import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}

// SEO TODO: Add Open Graph tags for social sharing
