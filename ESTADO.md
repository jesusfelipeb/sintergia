# ESTADO — Sintergia

> Última actualización: **2026-05-19** (cierre sesión rediseño visual v3)
> **Para retomar contexto:** leer `ROADMAP.md` y este archivo.

## Dónde estamos

### Landing visual v3 (✅ COMPLETADA esta sesión)
- [x] Sistema de tokens Tailwind 4 `@theme` rediseñado: navy preservado + accent cyan + purple + **lima sazón** + success + whatsapp + safe-area
- [x] 4 stacks tipográficos: **Fraunces** (italic muted), **Inter Tight** (display tech), **Plus Jakarta** (body), **JetBrains Mono** (eyebrows/meta)
- [x] `framer-motion@12.39` instalado y usado en todas las secciones para `whileInView` staggered reveals
- [x] `.nvmrc` con Node 22 (Sintergia tenía Node 18 system)
- [x] **Hero v3**: aurora animada 3 blobs + grain SVG + dot-grid + highlight cyan rotado en "atendiendo" + Fraunces italic en "mientras" + phone con conversación staggered + 3 sidecards flotantes + marquee
- [x] **§ 01 Problema**: grid newspaper con `gap-px`, números editoriales mono + glyphs (☏ ◷ ↻)
- [x] **§ 02 ComoFunciona**: 3 pasos con número Inter Tight 72-80px, card central highlight cyan + badge "Core" (id renombrado a `#metodo`)
- [x] **§ 03 OtrosServicios**: featured Agentes IA + mini chat rotado + 4 cards complementarios (id renombrado a `#servicios`)
- [x] **§ 04 Portafolio** (nueva sección): 6 cards con thumbnails generados (gradient hash + emoji + mock browser bar)
- [x] **§ 05 Planes**: scarcity badge + 3 cards numerados, central elevada con shadow cyan
- [x] **CTA Final**: aurora fuerte detrás + h2 con highlight cyan rotado en "su negocio"
- [x] **Footer**: 3 columnas mono editorial minimalista
- [x] **Nav**: 3 links (Servicios / Planes / Portafolio) + botón Contáctenos
- [x] **`BackgroundPattern.tsx`**: componente reutilizable (dots / dots-sparse / grid / lines) con props `intensity` y `mask`
- [x] **Ritmo de fondos** alternado aplicado a 5 secciones

### Floating Controls (✅ COMPLETADO esta sesión)
- [x] `FloatingControls.tsx` — orchestrator que coordina widget + WhatsApp
- [x] `FloatingChatWidget.tsx` — burbuja cyan bottom-right + panel expandible:
  - **Mobile**: bottom-sheet 85svh + backdrop blur + body-scroll lock + drag handle
  - **Desktop**: panel fixed 380×580 bottom-right
- [x] **Speech bubble persistente** dismissible — "¿Tenés dudas? Habla con nuestro agente."
- [x] **Custom event `sintergia:open-chat`** — CTA "Probar el agente" del Hero abre el widget
- [x] `FloatingWhatsApp.tsx` reposicionado a **bottom-left** + acepta `hideOnMobileChatOpen`
- [x] `Chat.tsx` refactorizado con prop `variant: "standalone" | "embedded"`
- [x] ESC cierra + backdrop click cierra en mobile + iOS safe-area

### Configuración como código (✅ completado 2026-05-07)
- [x] `config/sintergia.json` + `src/lib/config.ts` (Zod) + `src/lib/agent-prompt.ts` + refactor de `constants.ts`

### Clasificación de leads con LLM (✅ completado 2026-05-07)
- [x] Tag JSON `---META---\n{lead_quality, intent}` con stream-filter HOLDBACK + fallback keywords + no notifica si "curioso"

### Workflow N8N v2 con Google Sheets (✅ validado 2026-05-12)
- [x] `infra/workflow-lead-capture-v2.json` activo, end-to-end OK
- [x] 14 columnas en Sheet ID `18Gq-pPc9...`
- [x] Telegram con emoji por temperatura + tag de intent

### Evolution API paralelo a Baileys 7 (✅ código 2026-05-19, **setup manual pendiente**)
- [x] `infra/docker-compose.yml` + `.env` + `workflow-whatsapp-evolution.json` + `EVOLUTION_SETUP.md`
- [ ] **Felipe pendiente** (~15 min): docker up + crear instancia + escanear QR + importar workflow

### Pendiente Ola 2 (post-Evolution)
- [ ] **Paso 5** — SEO completo + JSON-LD + Google Business Profile (alta prioridad declarada)
- [ ] **Paso 7** — Cal.com + confirmation workflow
- [ ] **Paso 8** — Validar `create-client.sh` con Sintergia como template

### Pendiente Ola 4 (producción)
- [ ] Dominio personalizado
- [ ] Migrar N8N a VPS público
- [ ] Conectar `N8N_WEBHOOK_URL` real en Vercel

## Stack actual

### Frontend
- **Next.js 16.2.4** + React 19 + TypeScript
- **Tailwind 4** con `@theme` tokens semánticos
- **Framer Motion 12.39** (animaciones whileInView + aurora + widget)
- **Fonts**: Fraunces + Plus Jakarta Sans + Inter Tight + JetBrains Mono
- **Node 22** (pin en `.nvmrc`)

### Backend
- **Groq API** (Llama 3.3 70B) raw fetch + streaming + filtro META tag
- **N8N** workflows (Sheets + Telegram + Evolution + Baileys 7)
- **Vercel** deploy frontend

### Containers Docker (al cierre 2026-05-19)
| Servicio | Puerto | Estado |
|---|---|---|
| `n8n` | 5678 | ✅ Up 3+ días |
| `postgres` (N8N) | 5432 interno | ✅ Up 8+ días |
| `redis` (N8N) | 6379 interno | ✅ Up 8+ días |
| `whatsapp-bot` (Baileys 7) | 3001 | ✅ Up 8+ días, QR pendiente |
| `evolution-postgres` | interno | 🟡 Definido, no levantado |
| `evolution-redis` | interno | 🟡 Definido, no levantado |
| `evolution-api` | 8087 | 🟡 Definido, no levantado |

## Componentes UI actuales

| Componente | Rol |
|---|---|
| `Button` | Variants: primary, ghost, whatsapp. Acepta onClick via spread (`<a>` underlying) |
| `Chat` | Streaming Groq + variant prop ("standalone" / "embedded") |
| `FloatingControls` | Orchestrator coord widget + WhatsApp + listener custom event |
| `FloatingChatWidget` | Burbuja + speech bubble + panel expandible mobile-first |
| `FloatingWhatsApp` | Bottom-left con hide-on-mobile-chat-open |
| `BackgroundPattern` | 4 variantes de pattern decorativo server-friendly |
| `Nav` | Sticky backdrop-blur con 3 links + CTA Contáctenos |
| `Footer` | 3 columnas mono editorial |

## Archivos huérfanos (no importados, mantener como referencia)

- `src/components/sections/AgentSection.tsx`
- `src/components/sections/Casos.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/SectionHeading.tsx`

## Mapeo final de IDs

| Componente | ID | Link en Nav |
|---|---|---|
| `Problema` | `#problema` | — |
| `ComoFunciona` (§ 02 El Método) | `#metodo` | — |
| `OtrosServicios` (§ 03 El Ecosistema) | `#servicios` | **Servicios →** |
| `Portafolio` (§ 04) | `#portafolio` | **Portafolio →** |
| `Planes` (§ 05) | `#planes` | **Planes →** |

## Decisiones técnicas acumuladas

- **2026-05-07** — Pivot: Sintergia es dogfood de Mediagent
- **2026-05-07** — `config.json` + Zod como fuente única de verdad
- **2026-05-07** — Tag JSON estructurado en LLM responses
- **2026-05-07** — Workflow v2 con Sheets (mantiene Telegram)
- **2026-05-07** — Evolution API revertida: paralelo a Baileys
- **2026-05-12** — Bug N8N v2.16 versionado descubierto + workaround
- **2026-05-19** — Evolution agregado al stack (puerto 8087, instance `sintergia`, webhook auth apikey)
- **2026-05-19** — FloatingChatWidget mobile-first + speech bubble + custom event open-chat
- **2026-05-19** — **Rediseño visual Sintergia v3 completo** (Hero + 5 secciones + Footer + Nav + tokens + Portafolio nuevo + BackgroundPattern + ritmo alternado)
- **2026-05-19** — IDs renombrados: `#servicios` → `#metodo` (ComoFunciona), `#ecosistema` → `#servicios` (OtrosServicios)

## Bloqueos

Ninguno técnico. Pendiente operacional: setup manual Evolution (~15 min).

## Cómo levantar el proyecto

```bash
cd ~/Documentos/agente/sintergia
nvm use            # Node 22 (lee .nvmrc)
npm run dev        # http://localhost:3000

# Infra Docker:
cd infra
docker compose up -d
# N8N: http://localhost:5678
# Bot QR: http://localhost:3001/qr
# Evolution (cuando lo levantes): http://localhost:8087
```
