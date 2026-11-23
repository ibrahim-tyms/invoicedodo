/** Currency and country reference data for pickers. Names come from Intl so they stay correct and localisable. */

// Active ISO 4217 currencies (2026). Obsolete codes (BGN, HRK, SLL, ANG, ZWL...) are left out on purpose.
const CURRENCY_CODES = [
  "AED", "AFN", "ALL", "AMD", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BHD", "BIF", "BMD", "BND", "BOB",
  "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF",
  "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD",
  "HKD", "HNL", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF",
  "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT",
  "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN",
  "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP",
  "SLE", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH",
  "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XCG", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWG",
];

export const POPULAR_CURRENCIES = ["USD", "CAD", "EUR", "GBP", "AUD"];

// ISO 3166-1 alpha-2.
const COUNTRY_CODES = [
  "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB",
  "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM",
  "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ",
  "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF",
  "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN",
  "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR",
  "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ",
  "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI",
  "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR",
  "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL",
  "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ",
  "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU",
  "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW",
];

export const POPULAR_COUNTRIES = ["US", "CA", "GB", "AU"];

// Extra search words so people find what they type ("UK", "USA", "Holland", "Ivory Coast").
const COUNTRY_ALIASES: Record<string, string> = {
  US: "usa america united states",
  GB: "uk britain england scotland wales great britain",
  AE: "uae emirates dubai",
  NL: "holland",
  CI: "ivory coast",
  KR: "south korea",
  KP: "north korea",
  CZ: "czech republic",
  MM: "burma",
  SZ: "swaziland",
  TR: "turkey",
  CD: "drc congo kinshasa",
  CG: "congo brazzaville",
};

function names(type: "currency" | "region") {
  try {
    return new Intl.DisplayNames(["en"], { type });
  } catch {
    return null;
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function currencySymbol(code: string) {
  try {
    const part = new Intl.NumberFormat("en-US", { style: "currency", currency: code, currencyDisplay: "narrowSymbol" })
      .formatToParts(0)
      .find((p) => p.type === "currency");
    return part?.value ?? code;
  } catch {
    return code;
  }
}

export function currencyDecimals(code: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: code }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
}

export type CurrencyInfo = { code: string; name: string; symbol: string };
let currencyCache: CurrencyInfo[] | null = null;
export function currencies(): CurrencyInfo[] {
  if (currencyCache) return currencyCache;
  const dn = names("currency");
  currencyCache = CURRENCY_CODES.map((code) => {
    const n = dn?.of(code);
    return { code, name: n && n !== code ? cap(n) : code, symbol: currencySymbol(code) };
  }).sort((a, b) => a.name.localeCompare(b.name));
  return currencyCache;
}

export function currencyName(code: string) {
  return currencies().find((c) => c.code === code)?.name ?? code;
}

export type CountryInfo = { code: string; name: string; flag: string; aliases: string };
let countryCache: CountryInfo[] | null = null;
export function countries(): CountryInfo[] {
  if (countryCache) return countryCache;
  const dn = names("region");
  countryCache = COUNTRY_CODES.map((code) => ({
    code,
    name: dn?.of(code) ?? code,
    flag: flag(code),
    aliases: COUNTRY_ALIASES[code] ?? "",
  })).sort((a, b) => a.name.localeCompare(b.name));
  return countryCache;
}

export function countryName(code: string) {
  if (!code) return "";
  return countries().find((c) => c.code === code)?.name ?? code;
}

function flag(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}
