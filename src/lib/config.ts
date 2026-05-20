import { z } from "zod";
import rawConfig from "../../config/sintergia.json";

// ─────────────────────────────────────────────────────────────
// Schema Zod — fuente de verdad del shape del config.
// Si falla la validación, el build de Next.js se detiene.
// ─────────────────────────────────────────────────────────────

const TierSchema = z.object({
  name:     z.string().min(1),
  slug:     z.string().min(1),
  price:    z.string().min(1),
  monthly:  z.string().min(1),
  popular:  z.boolean().default(false),
  features: z.array(z.string()).min(1),
});

const ServiceSchema = z.object({
  name:        z.string(),
  description: z.string(),
});

const CaseSchema = z.object({
  name:        z.string(),
  vertical:    z.string(),
  location:    z.string().optional(),
  description: z.string(),
  is_real:     z.boolean(),
});

const ConfigSchema = z.object({
  business: z.object({
    name:              z.string(),
    legal_name:        z.string(),
    tagline:           z.string(),
    short_description: z.string(),
    profession_type:   z.string(),
    language:          z.string(),
    tone:              z.string(),
    founded_year:      z.number().int(),
    url:               z.string().url(),
  }),

  contact: z.object({
    whatsapp_number:          z.string().regex(/^\d+$/, "solo dígitos, sin + ni espacios"),
    phone_e164:               z.string().regex(/^\+\d{8,15}$/, "formato E.164 (con +)"),
    whatsapp_default_message: z.string(),
    email:                    z.string().email().nullable(),
    calendar_url:             z.string().url().nullable(),
    social: z.object({
      twitter:   z.string().nullable(),
      instagram: z.string().nullable(),
      linkedin:  z.string().nullable(),
    }),
  }),

  location: z.object({
    type:              z.enum(["physical", "service_area", "remote_only"]),
    country:           z.string().length(2),
    service_areas:     z.array(z.string()).min(1),
    in_person_city:    z.string().nullable().optional(),
    in_person_country: z.string().length(2).nullable().optional(),
    currency:          z.string().length(3),
  }),

  services: z.object({
    primary:       ServiceSchema,
    complementary: z.array(ServiceSchema),
    tiers:         z.array(TierSchema).min(1),
  }),

  process: z.array(z.string()).min(1),
  cases:   z.array(CaseSchema),
  guarantees: z.array(z.string()),

  scarcity: z.object({
    monthly_capacity: z.number().int().positive(),
    label:            z.string(),
  }),

  agent: z.object({
    provider:                       z.enum(["groq", "openai", "anthropic"]),
    model:                          z.string(),
    temperature:                    z.number().min(0).max(2),
    max_messages_per_session:       z.number().int().positive(),
    max_chars_per_message:          z.number().int().positive(),
    max_tokens_response:            z.number().int().positive(),
    suggested_questions:            z.array(z.string()).min(1),
    lead_signals:                   z.array(z.string()).min(1),
    lead_signals_min_matches:       z.number().int().positive(),
    lead_signals_min_user_messages: z.number().int().positive(),
  }),

  rules: z.object({
    do_use_pronoun:              z.enum(["usted", "vos", "tu"]),
    do_not_mention:              z.array(z.string()),
    no_invented_data:            z.boolean(),
    no_discounts:                z.boolean(),
    redirect_complex_to_whatsapp: z.boolean(),
  }),
});

export type SintergiaConfig = z.infer<typeof ConfigSchema>;
export type Tier            = z.infer<typeof TierSchema>;
export type Service         = z.infer<typeof ServiceSchema>;
export type CaseStudy       = z.infer<typeof CaseSchema>;

// ─────────────────────────────────────────────────────────────
// Loader: valida una sola vez al importar este módulo.
// Si el JSON es inválido, lanza error explícito al build/start.
// ─────────────────────────────────────────────────────────────
function loadConfig(): SintergiaConfig {
  const result = ConfigSchema.safeParse(rawConfig);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `\n[config] config/sintergia.json inválido:\n${issues}\n`
    );
  }
  return result.data;
}

const config = loadConfig();
export default config;

// ─────────────────────────────────────────────────────────────
// Helpers útiles (azúcar para componentes)
// ─────────────────────────────────────────────────────────────

export function whatsappUrl(): string {
  return `https://wa.me/${config.contact.whatsapp_number}`;
}

export function whatsappLink(message?: string): string {
  const text = message ?? config.contact.whatsapp_default_message;
  return `${whatsappUrl()}?text=${encodeURIComponent(text)}`;
}
