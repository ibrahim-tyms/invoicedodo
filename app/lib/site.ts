/** Site-wide facts used by metadata, structured data, sitemaps and social images. */
export const SITE = {
  name: "InvoiceDodo",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://invoicedodo.com").replace(/\/$/, ""),
  tagline: "Get paid on time. Without the awkward chase.",
  /** Home page search title (about 60 characters) and meta description (about 150). Keyword first, brand last. */
  homeTitle: "Free Invoice Software With Automatic Reminders | InvoiceDodo",
  homeDescription:
    "Free invoicing software for freelancers and small businesses. Automatic payment reminders, tax set-asides and 1099-ready totals, so you get paid on time.",
  description:
    "InvoiceDodo builds your invoice from a sentence, sends it, and follows up politely until you're paid. Keep your Stripe, PayPal or Square account, see what to set aside for taxes, and stop chasing clients. Free to use.",
  locale: "en_US",
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || undefined,
  sameAs: [] as string[], // add social profile URLs here as they go live
} as const;

export const absoluteUrl = (path = "/") => new URL(path, SITE.url + "/").toString();

/** Serialise JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const organizationLd = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/brand/app-icon.svg"),
    width: 512,
    height: 512,
  },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
