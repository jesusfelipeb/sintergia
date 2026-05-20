import config from "@/lib/config";
import OpenGraphImage from "./opengraph-image";

/* ─────────────────────────────────────────────────────────────
 * Twitter card image (1200×630 — mismo aspect que OG).
 * Reutiliza el render de opengraph-image.tsx pero los segment
 * configs (`runtime`, `alt`, `size`, `contentType`) DEBEN
 * declararse directamente en este archivo — Next.js no permite
 * re-exportarlos desde otro módulo (Turbopack los parsea static).
 * ──────────────────────────────────────────────────────────── */

export const runtime = "edge";
export const alt = `${config.business.name} — ${config.business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpenGraphImage;
