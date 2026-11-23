import { OG_SIZE, renderOg } from "../../lib/og";

export const alt = "InvoiceDodo Terms of Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Legal",
    title: "Terms of Service",
    highlight: "The ground rules.",
    footer: "www.invoicedodo.com/terms",
    accent: "amber",
  });
}
