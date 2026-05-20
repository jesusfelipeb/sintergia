// ─────────────────────────────────────────────────────────────
// Re-exports desde config/sintergia.json (vía lib/config.ts).
// Mantiene compatibilidad con los componentes que ya importan
// de "@/lib/constants". La fuente de verdad es config/sintergia.json.
// ─────────────────────────────────────────────────────────────

import config, { whatsappLink as _whatsappLink, whatsappUrl } from "./config";

export const WHATSAPP_NUMBER    = config.contact.whatsapp_number;
export const WHATSAPP_URL       = whatsappUrl();
export const SUGGESTED_QUESTIONS = config.agent.suggested_questions;
export const TIERS              = config.services.tiers;

export { _whatsappLink as whatsappLink };

// SYSTEM_PROMPT vive en lib/agent-prompt.ts (se construye desde config).
// Re-exportado para no romper imports existentes.
export { SYSTEM_PROMPT } from "./agent-prompt";
