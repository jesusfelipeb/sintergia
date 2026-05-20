# Sintergia · Manual de Claude Code

> **Para retomar contexto, leer primero `ROADMAP.md` y `ESTADO.md`. Después este archivo.**
> **Pivot 2026-05-07:** Sintergia es el dogfood de Mediagent. Toda feature nueva valida la promesa de Mediagent.

## Qué es Sintergia
Empresa de servicios tecnológicos (bots, automatizaciones, landings, e-commerce) para profesionales locales y emprendedores latinos.
Pricing bots: USD 600 / 1500 / 3000 setup + recurrente desde USD 80/mes.
Servicios complementarios: Sitios web, E-commerce (Tiendanube/Shopify), Automatizaciones integrales.

**Servicio:** 100% remoto, con reuniones presenciales en CABA.

**Separación crítica:** Sintergia ≠ Soberanía Total. Marcas hermanas, no padre/hijo. Esta landing y materiales comerciales NO mencionan Soberanía Total, Bitcoin, Venezuela ni filosofía.

## Propósito de este repo
Landing page comercial de Sintergia Studio. Single page. Objetivo: convertir visitas en conversaciones de WhatsApp.

## Stack
- Next.js 16.2.4 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 (con @tailwindcss/postcss)
- Groq API (Llama 3.3 70B) para el chat agent — raw fetch, sin AI SDK
- Deploy: Vercel (automático en push a main)
- Sin base de datos, sin auth, sin formularios
- Sin dependencias extra (no clsx, no lucide, no shadcn)
- Dominio: [completar al comprar]

## Audiencia y tono
Profesional local argentino (médico, abogado, contador, comerciante).

Voz: "usted" venezolano (registro de Mérida), reflexivo, directo sin agresividad. NUNCA motivational-speaker. Para Sintergia-empresa: sobrio y profesional.

## Diseño: Dark Tech (V2)
Migración completa a modo oscuro inspirado en el logo institucional ciber-geométrico. Reemplaza la paleta original "Tecnología con Tierra".

### Paleta
- Fondo: `#040b16` (navy profundo)
- Fondo alt: `#0a1526`
- Acento principal: `#00b4d8` (cyber-cyan)
- Acento secundario: `#8B5CF6` (purple)
- Texto: `#F8FAFC` (blanco cálido)
- Texto muted: `#94a3b8` (slate)
- Borde: `#1e293b`

### Tipografías
- Display: **Fraunces** (serif variable, para títulos)
- Body: **Plus Jakarta Sans** (geométrica amigable, para texto)

### Efectos visuales
- Glassmorphism oscuro en todas las cards (`bg-white/5 backdrop-blur-md border-white/10`)
- Glows neón sutiles (accent blur en CTA Final y Footer)
- Hover elevations (`hover:-translate-y-1`)
- Notificaciones flotantes con glassmorphism en el Hero (`animate-float`)
- SVG mask del logo geométrico en Nav y Footer

## Secciones de la landing (implementadas)
1. **Nav** — sticky, backdrop-blur, hamburger mobile, logo SVG mask, CTA WhatsApp
2. **Hero** — split layout (texto + imagen `hero.png`), notificaciones flotantes glassmorphism, badges "Sin contratos / Resultados 1ª semana / Setup en 48hs"
3. **Problema** — 3 cards glassmorphism con hover cyan glow: teléfono, citas, preguntas repetitivas
4. **Cómo funciona** — 3 pasos con hover gradient (purple → cyan)
5. **Otros servicios** — Landings, E-commerce, Automatizaciones (estilo subyugado, no compite con bots)
6. **Casos** — Banana Express (real) + [PILOTO — completar cuando se cierre]
7. **Planes** — 3 tiers con badge scarcity "3 negocios/mes", hover elevation
8. **Agente** — Chat con IA (Groq) como demo del producto (reemplaza FAQ)
9. **CTA Final** — Glow central accent, botón WhatsApp verde con shadow
10. **Footer** — logo SVG mask + WhatsApp + copyright

## Estructura del proyecto
```
config/
└── sintergia.json            ⭐ Fuente única de verdad (negocio, agente, reglas)

src/
├── app/
│   ├── api/chat/route.ts    ← Groq streaming + filtro stream del marker ---META--- + clasificación → webhook N8N
│   ├── layout.tsx            ← root layout (fonts, metadata, FloatingWhatsApp)
│   ├── page.tsx              ← landing (todas las secciones)
│   └── globals.css           ← paleta dark tech + keyframes float
├── components/
│   ├── ui/                   ← Button, Section, SectionHeading, Chat, FloatingWhatsApp
│   ├── sections/             ← Hero, Problema, ComoFunciona, OtrosServicios, Casos, Planes, AgentSection, CTAFinal
│   └── layout/               ← Nav, Footer
├── lib/
│   ├── config.ts             ⭐ Zod schema + loader del config.json + helpers (whatsappLink, whatsappUrl)
│   ├── agent-prompt.ts       ⭐ Construye system prompt dinámicamente desde config (incluye protocolo tag JSON)
│   └── constants.ts          Re-exports desde config (compat con componentes existentes)
├── types/
│   └── index.ts              ← Message, Tier, FAQItem
└── public/
    └── hero.png              ← imagen hero

infra/
├── docker-compose.yml                  ← N8N + postgres + redis + whatsapp-bot + evolution-* (7 servicios)
├── init-db.sql
├── .env                                Variables (gitignored) — secrets de cada servicio
├── workflow-lead-capture.json          v1 (Telegram only, INACTIVO, respaldo)
├── workflow-lead-capture-v2.json       ⭐ v2 ACTIVO (Telegram + Sheets en paralelo)
├── workflow-whatsapp-evolution.json    ⭐ Workflow para Evolution API (10 nodos con auth apikey)
├── SHEETS_SETUP.md                     Guía Google Sheets OAuth + N8N
├── EVOLUTION_SETUP.md                  ⭐ Guía Evolution API + QR + workflow + test
├── Dockerfile.evolution                Build custom (fallback si latest falla, no usado por default)
└── whatsapp-bot/
    ├── Dockerfile                      Node 22 Alpine + Baileys 7
    ├── package.json
    └── index.js                        Baileys 7 + Groq + QR web panel + lead detection
```

## ROADMAP.md y ESTADO.md
- `ROADMAP.md` — plan vigente en olas (1 decisiones, 2 dogfood Mediagent, 3 mejoras a Mediagent, 4 producción)
- `ESTADO.md` — snapshot del avance al cierre de cada sesión

## Componentes (post-rediseño v3 — 2026-05-19)

### Floating controls
- `FloatingControls` — orchestrator client. State `chatOpen` compartido + listener global `sintergia:open-chat`. Renderiza widget + WhatsApp.
- `FloatingChatWidget` — burbuja cyan bottom-right siempre visible + speech bubble persistente dismissible ("¿Tenés dudas? Habla con nuestro agente.") + panel expandible (mobile bottom-sheet 85svh con backdrop, desktop panel 380×580). ESC cierra. iOS safe-area aware.
- `FloatingWhatsApp` — bottom-left (movido de right). Acepta `hideOnMobileChatOpen` para no competir con el widget en mobile.

### UI
- `Button` — variants: primary, ghost, whatsapp. Es `<a>` con `extends ComponentProps<"a">` → acepta `onClick` para casos como abrir el chat widget.
- `Chat` — streaming Groq + filter META tag + prop `variant: "standalone" | "embedded"`. Standalone = card propia. Embedded = sin wrapper (lo usa FloatingChatWidget).
- `BackgroundPattern` — server-friendly. Variantes `dots` / `dots-sparse` / `grid` / `lines`. Props `intensity` y `mask` (`radial` / `top` / `none`). Usado en todas las secciones para ritmo visual alternado.

### Layout
- `Nav` — 3 links (Servicios / Planes / Portafolio) + CTA Contáctenos. Sticky backdrop-blur.
- `Footer` — 3 columnas mono editorial minimalista.

### Sections (todas rediseñadas v3 con eyebrow numerado `§ NN`)
- `Hero` — aurora animada framer-motion (3 blobs) + grain + dot grid + h1 con highlight cyan rotado + phone con conversación staggered + sidecards desktop + marquee horizontal infinite
- `Problema` (§ 01) — grid newspaper `gap-px` con números editoriales + glyphs (☏ ◷ ↻)
- `ComoFunciona` (§ 02) — 3 pasos con número Inter Tight, central highlight cyan + badge "Core"
- `OtrosServicios` (§ 03) — featured card Agentes IA + mini chat rotado + 4 cards complementarios
- `Portafolio` (§ 04, NUEVA) — 6 cards con thumbnails generados (gradient hash + emoji + mock browser)
- `Planes` (§ 05) — scarcity badge + 3 cards numerados, central elevada con shadow cyan
- `CTAFinal` — aurora fuerte detrás + h2 con highlight cyan rotado en "su negocio"

### Archivos huérfanos (NO importados, mantener como referencia)
- `AgentSection.tsx`, `Casos.tsx`, `Section.tsx`, `SectionHeading.tsx`

## Mapeo de IDs (importante para anchor links)
| Sección | ID | Nav |
|---|---|---|
| Problema | `#problema` | — |
| ComoFunciona (§ 02 El Método) | `#metodo` | — |
| OtrosServicios (§ 03 Servicios) | `#servicios` | **Servicios →** |
| Portafolio (§ 04) | `#portafolio` | **Portafolio →** |
| Planes (§ 05) | `#planes` | **Planes →** |

## Stack tipográfico v3
- `--font-display` Fraunces (italic muted en palabras secundarias selectivas)
- `--font-display-tech` **Inter Tight** (h1/h2, números grandes, stats)
- `--font-body` Plus Jakarta Sans (body)
- `--font-mono` **JetBrains Mono** (eyebrows, meta, units, tags)

## Tokens semánticos v3 (`globals.css` `@theme`)
- Surfaces: `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-surface-2`
- Accents: `--color-accent` (cyan), `--color-accent-2` (purple), `--color-accent-warm` (lima — usar estratégicamente)
- Semánticos: `--color-success`, `--color-whatsapp`
- Safe-area: `--safe-bottom: env(safe-area-inset-bottom, 0px)` — usar en flotantes para iOS

## WhatsApp
- Número: +5491132924310
- Todos los CTAs usan `wa.me/5491132924310?text=...` con mensaje pre-rellenado
- CTA principal: "Obtener mi Bot"
- FloatingWhatsApp: persistente después del Hero
- El agente de WhatsApp (IA) es fase 2

## Chat Agent (Groq)
- **Modelo y parámetros desde `config/sintergia.json` → `agent`**:
  - Llama 3.3 70B Versatile
  - 20 mensajes/sesión, 500 chars/mensaje, 400 tokens/respuesta, temperature 0.7
- API key en `.env.local` (GROQ_API_KEY)
- System prompt construido dinámicamente en `src/lib/agent-prompt.ts` desde el config:
  - Servicios principales (bots IA) + complementarios (web, e-commerce, automatizaciones)
  - Cross-selling inteligente
  - Precios, casos reales, proceso, reglas de tono
  - **Protocolo tag JSON al final de cada respuesta:** `---META---\n{"lead_quality":"caliente|tibio|curioso","intent":"agendar|info|demo|soporte"}`
- Streaming: raw fetch → SSE → filtro on-the-fly del marker `---META---` (no llega al cliente, técnica HOLDBACK por chunk)
- Clasificación enriquecida en `notifyN8N`: `{lead_quality, intent, source}` con whitelist y fallback a keywords
- **No notifica a N8N si `lead_quality === "curioso"`** (filtra ruido de visitantes que solo navegan)
- Burbujas: usuario en cyan (`text-[#040b16]`), asistente en glass (`bg-white/10`)

## CRO (Optimización de conversión)
- FloatingWhatsApp persistente con animate-ping
- Badge scarcity "3 negocios/mes" en Planes (animate-pulse)
- Copy de alta intención: "Obtener mi Bot" en vez de "Contáctenos"
- Micro-copy de beneficios: "Sin contratos", "Resultados 1ª semana", "Setup en 48hs"

## Reglas del proyecto
- NO formularios — solo WhatsApp directo
- NO login/auth, NO blog, NO subrutas
- NO mención de Soberanía Total
- NO datos inventados — Banana Express es real, segundo caso marcado [PILOTO — completar]
- NO tracking de terceros (GA, Meta Pixel, Hotjar) hasta decisión explícita
- Responsive mobile-first
- Accesibilidad básica: alt text, contraste AA, landmarks semánticos
- Commits con conventional commits (feat/fix/docs/chore/style)
- Documentar cada decisión no trivial en `DECISIONES.md`

## Fase 2: Infraestructura de leads + WhatsApp Bot (en progreso)

### Docker stack (`infra/docker-compose.yml`)
- **PostgreSQL 16** — DB para N8N
- **Redis 7** — Cache para N8N
- **N8N** (puerto 5678) — Workflows de leads, webhook activo en `/webhook/lead-capture`
- **WhatsApp Bot** (puerto 3001) — Bot custom con Baileys 7 + Groq

### WhatsApp Bot (`infra/whatsapp-bot/`)
- Baileys 7.0.0-rc.9 (ESM, Node 22 Alpine)
- Groq API directa con system prompt adaptado para calificar leads
- Panel web QR: `http://localhost:3001/qr` (dark theme, auto-refresh 15s)
- Detección de leads → webhook async a N8N
- Auth persistido en volumen Docker `whatsapp_auth`
- **Estado:** QR funcional, pendiente vincular WhatsApp

### Lead capture flow
1. Chat web (Vercel) o WhatsApp Bot detectan lead (≥2 señales: precio, negocio, contratar, etc.)
2. Webhook async POST a N8N (`/webhook/lead-capture`)
3. N8N procesa → [pendiente: Google Sheets + Telegram a Felipe]

### Notificaciones a Felipe
- Canal: **Telegram** (no WhatsApp, para separar bot público de notificaciones internas)
- Datos requeridos: nombre completo, número WhatsApp, tipo de negocio, problema, solución ofrecida

### Decisión revertida (2026-05-07): Evolution API + Baileys 7 paralelo (A/B test)
- Decisión previa de descartar Evolution se revierte — Sintergia es el experimento de Mediagent.
- Mediagent vende Evolution como solución default → si Sintergia (dogfood) lo rechaza, hay discrepancia.
- Plan: Baileys 7 sigue corriendo en puerto 3001. Evolution se agrega en otro puerto. A/B test → decidir cuál mantener.
- **Pendiente:** Ola 2 paso 4 — `docker-compose.yml` con Evolution + workflow N8N nuevo + `infra/EVOLUTION_SETUP.md`

## Prohibiciones actuales (runway 90 días, objetivo USD 5K)
- No sugerir Finara, trading bots, apps nativas
- No proponer rewrites de código que ya funciona
- No sugerir "mejoras" estéticas no pedidas
- No tocar `~/Documentos/agente/banana-express/` sin permiso explícito
- Si algo toma más de 2 horas vs estimado, parar y reportar

## Notas técnicas
- AGENTS.md (generado por Next 16): consultar `node_modules/next/dist/docs/` antes de escribir código
- Node v23.9.0: warning con eslint-visitor-keys (no bloqueante)
- Skill `frontend-design` instalado en `.claude/skills/`

## Referencias
- Estado actual: `./ESTADO.md` (léelo al iniciar sesión)
- Decisiones: `./DECISIONES.md`
- Estrategia: `./ESTRATEGIA.md`
- Plan operativo: `./PLAN-90-DIAS.md`
