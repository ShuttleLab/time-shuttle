import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://time.shuttlelab.org";
  const lastModified = new Date();

  const bilingualPaths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const bilingual = bilingualPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}/`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: { en: `${baseUrl}${path}/`, zh: `${baseUrl}/zh${path}/`, "x-default": `${baseUrl}${path}/` } },
  }));

  const toolPaths = [
    "/tools/unix-timestamp-converter",
    "/tools/timestamp-to-date",
    "/tools/timezone-converter",
    "/tools/current-unix-timestamp",
  ];

  const tools = toolPaths.map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...bilingual, ...tools];
}
