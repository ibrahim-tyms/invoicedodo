import { OG_SIZE, renderOg } from "./lib/og";

export const alt = "InvoiceDodo: Get paid on time. Without the chase.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Get paid on time.",
    highlight: "Without the chase.",
  });
}
