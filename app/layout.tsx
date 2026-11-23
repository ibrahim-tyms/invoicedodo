import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { SITE } from "./lib/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "InvoiceDodo: Invoicing That Chases Late Payments For You",
    template: "%s | InvoiceDodo",
  },
  description: SITE.description,
  applicationName: SITE.name,
  category: "business",
  keywords: [
    "invoice app",
    "invoicing software for freelancers",
    "automatic payment reminders",
    "late payment follow-up",
    "get paid faster",
    "small business invoicing",
    "free invoice generator",
    "Stripe invoicing",
    "PayPal invoicing",
    "1099 freelancer taxes",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "InvoiceDodo Blog" }] },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: "InvoiceDodo: Get paid on time. Without the awkward chase.",
    description:
      "Describe the work and Dodo builds the invoice, sends it and follows up politely until you're paid. Keep your Stripe, PayPal or Square account. Free to use.",
  },
  twitter: {
    card: "summary_large_image",
    ...(SITE.twitter ? { site: SITE.twitter, creator: SITE.twitter } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E3F0EC" },
    { media: "(prefers-color-scheme: dark)", color: "#121716" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
