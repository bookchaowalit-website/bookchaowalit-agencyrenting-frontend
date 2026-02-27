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
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}

// SEO TODO: Add Open Graph tags for social sharing
