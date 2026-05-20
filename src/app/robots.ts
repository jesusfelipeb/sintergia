import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt
 * - Permite indexar todo el contenido público.
 * - Bloquea `/api/` (Server actions, route handlers no son contenido).
 * - Apunta al sitemap.xml para que crawlers lo descubran rápido.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
