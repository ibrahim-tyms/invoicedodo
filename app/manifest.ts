import type { MetadataRoute } from "next";
import { SITE } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#174E48",
    icons: [{ src: "/brand/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
