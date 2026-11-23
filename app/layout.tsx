import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
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
  title: "InvoiceDodo — Get paid on time. Without the awkward chase.",
  description:
    "Describe your work and Dodo builds the invoice, sends it, and follows up for you. Clients pick a pay date, forward it to finance, and pay in one tap. Free forever. Join the waitlist.",
  openGraph: {
    title: "InvoiceDodo — Get paid on time. Without the awkward chase.",
    description:
      "Dodo builds the invoice, sends it, and follows up for you. Free forever. Join the waitlist.",
    type: "website",
  },
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
    </html>
  );
}
