import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap dinámico.
 * Sintergia es single-page por ahora → solo `/` como url canónica.
 * Anchors (`#problema`, `#servicios`, etc.) NO van en sitemap;
 * los crawlers los descubren leyendo la página.
 *
 * Cuando se agreguen rutas reales (blog, casos individuales, etc.)
 * mapearlas acá.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
