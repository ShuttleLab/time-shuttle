import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Time Shuttle | Free Online Timestamp & Date Converter",
    short_name: "Time Shuttle",
    description: "Convert Unix timestamps, dates, and time zones instantly in your browser. 100% private.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ff",
    theme_color: "#7c3aed",
    orientation: "any",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
