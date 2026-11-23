import { OG_SIZE, renderOg } from "../lib/og";

export const alt = "The InvoiceDodo Blog";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Blog",
    title: "Get paid on time.",
    highlight: "Keep more of it.",
    footer: "www.invoicedodo.com/blog",
    accent: "sky",
  });
}
