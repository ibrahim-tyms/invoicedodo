/**
 * Facts used on the legal pages. Fill in every value marked TODO before launch,
 * and have a lawyer review both pages. They are a thorough starting draft, not legal advice.
 */
export const LEGAL = {
  company: "Tyms Inc.",
  product: "InvoiceDodo",
  effectiveDate: "November 23, 2026",
  lastUpdated: "November 23, 2026",

  // TODO: confirm these before publishing.
  website: "invoicedodo.com", // TODO: your production domain
  mailingAddress: "[Tyms Inc. mailing address]", // TODO
  stateOfIncorporation: "[State of incorporation]", // TODO, e.g. Delaware
  governingLawState: "[Governing-law state]", // TODO: usually the state of incorporation
  venue: "[County, State]", // TODO: courts for non-arbitrable disputes
  privacyEmail: "privacy@invoicedodo.com", // TODO: make sure this inbox exists
  legalEmail: "legal@invoicedodo.com", // TODO
  supportEmail: "hello@invoicedodo.com", // TODO
} as const;
