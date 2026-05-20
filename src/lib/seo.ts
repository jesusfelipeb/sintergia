import config from "./config";

/* ─────────────────────────────────────────────────────────────
 * Helpers SEO + Generadores JSON-LD
 *
 * Lee de config/sintergia.json. Cuando cambies el dominio (al
 * comprar uno), actualizá `business.url` en el config y se
 * propaga a metadata + sitemap + robots + JSON-LD.
 * ──────────────────────────────────────────────────────────── */

export const SITE_URL = config.business.url.replace(/\/$/, "");

/** Build absolute URL from a path. */
export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ─────────────────────────────────────────────────────
 * JSON-LD
 *
 * 3 entidades estructuradas:
 *  - Organization     identidad de marca
 *  - WebSite          metadata del sitio + SearchAction (sitelinks)
 *  - ProfessionalService  servicio remoto LATAM con areaServed CABA
 *
 * Schema.org: https://schema.org/ProfessionalService
 * ───────────────────────────────────────────────────── */

interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

export function buildJsonLd(): JsonLdGraph {
  const { business, contact, location, services } = config;
  const url = SITE_URL;

  const sameAs = [
    contact.social.twitter,
    contact.social.instagram,
    contact.social.linkedin,
  ].filter((u): u is string => typeof u === "string" && u.length > 0);

  const orgId = `${url}#organization`;
  const webSiteId = `${url}#website`;
  const serviceId = `${url}#service`;

  // ── Organization ───────────────────────────────────
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": orgId,
    name: business.name,
    legalName: business.legal_name,
    url,
    description: business.short_description,
    foundingDate: String(business.founded_year),
    telephone: contact.phone_e164,
    areaServed: location.service_areas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    sameAs,
  };
  if (contact.email) organization.email = contact.email;

  // ── WebSite + SearchAction (para sitelinks de Google) ──
  const webSite = {
    "@type": "WebSite",
    "@id": webSiteId,
    url,
    name: business.name,
    description: business.tagline,
    publisher: { "@id": orgId },
    inLanguage: business.language,
  };

  // ── ProfessionalService (servicio remoto + presencial CABA) ──
  const professionalService: Record<string, unknown> = {
    "@type": "ProfessionalService",
    "@id": serviceId,
    name: business.name,
    description: business.short_description,
    url,
    provider: { "@id": orgId },
    telephone: contact.phone_e164,
    areaServed: location.service_areas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    serviceType: [
      services.primary.name,
      ...services.complementary.map((s) => s.name),
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planes de bots IA",
      itemListElement: services.tiers.map((t, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: `Plan ${t.name}`,
        description: t.features.slice(0, 3).join(" · "),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: t.price.replace(/[^\d.]/g, ""),
          priceCurrency: "USD",
        },
      })),
    },
  };

  // Reuniones presenciales en CABA → indicar como contactPoint
  if (location.in_person_city) {
    professionalService.contactPoint = {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: contact.phone_e164,
      areaServed: location.in_person_city,
      availableLanguage: ["Spanish", "es-AR"],
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [organization, webSite, professionalService],
  };
}

/* ─────────────────────────────────────────────────────
 * Open Graph + Twitter (consumido por layout.tsx)
 * ───────────────────────────────────────────────────── */

export const SEO_DEFAULTS = {
  title: `${config.business.name} — ${config.business.tagline}`,
  description: config.business.short_description,
  url: SITE_URL,
  locale: config.business.language.replace("-", "_"), // es-AR → es_AR
  alternateLocales: ["es_MX", "es_CO", "es_CL", "es_PE"] as const,
  siteName: config.business.name,
};
