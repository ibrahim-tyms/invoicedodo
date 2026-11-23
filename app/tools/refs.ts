import type { Ref } from "./ToolPage";

/** Sources used on the tool pages. Each URL was opened and the cited statement checked on the date shown. */
export const REFS = {
  w9: { title: "About Form W-9, Request for Taxpayer Identification Number and Certification", publisher: "IRS", url: "https://www.irs.gov/forms-pubs/about-form-w-9", checked: "Nov 2026" },
  nec: { title: "About Form 1099-NEC, Nonemployee Compensation", publisher: "IRS", url: "https://www.irs.gov/forms-pubs/about-form-1099-nec", checked: "Nov 2026" },
  records: { title: "What kind of records should I keep", publisher: "IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep", checked: "Nov 2026" },
  keep: { title: "How long should I keep records?", publisher: "IRS", url: "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records", checked: "Nov 2026" },
  salesTax: { title: "State and Local Sales Tax Rates, 2026", publisher: "Tax Foundation", url: "https://taxfoundation.org/data/all/state/sales-tax-rates/", checked: "Nov 2026" },
  proforma: { title: "Pro Forma Invoice", publisher: "International Trade Administration (trade.gov)", url: "https://www.trade.gov/pro-forma-invoice", checked: "Nov 2026" },
  incoterms: { title: "Know Your Incoterms", publisher: "International Trade Administration (trade.gov)", url: "https://www.trade.gov/know-your-incoterms", checked: "Nov 2026" },
  commercial: { title: "Commercial Invoice", publisher: "International Trade Administration (trade.gov)", url: "https://www.trade.gov/commercial-invoice", checked: "Nov 2026" },
} satisfies Record<string, Ref>;
