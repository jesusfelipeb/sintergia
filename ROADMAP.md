# Sintergia — Roadmap

> Documento vivo. Plan en olas, decisiones pendientes, próximo paso.
> Actualizado: **2026-05-19** (cierre de sesión rediseño visual v3).

## Pivot estratégico (decisión 2026-05-07)

Sintergia es el **dogfood de Mediagent**: el primer "cliente real" que valida la promesa del producto. Las features de Mediagent que faltan en Sintergia se implementan acá → con lo aprendido se mejora Mediagent.

## Estructura objetivo

```
🌐 Sintergia (landing comercial + dogfood de Mediagent)
├── /                          Landing dark-tech v3 con sistema visual coherente
├── Chat widget flotante       ✅ FloatingChatWidget + speech bubble persistente
├── SEO completo               🟡 JSON-LD ProfessionalService + LocalBusiness CABA
├── Cal.com + confirmation     🟡 Agendar calls
└── /api/chat                  Groq + tag JSON estructurado → N8N

🔧 Infraestructura local (infra/)
├── PostgreSQL 16 + Redis 7 (para N8N)
├── N8N (workflows v2 con Sheets ✅ funcional)
├── WhatsApp Bot Baileys 7      ✓ funcional, pendiente vincular QR
└── Evolution API + dedicated Postgres/Redis  ✓ código listo, pendiente up + QR
```

---

## OLA 1 — Reconciliación arquitectónica ✅ (decisiones tomadas)

| ID | Decisión | Resultado |
|---|---|---|
| 1.1 | Evolution API vs Baileys 7 | **Ambos en paralelo** — A/B test |
| 1.2 | Fuente de verdad arquitectónica | Sintergia adopta Mediagent. Ola 3 mejora Mediagent |
| 1.3 | Naming "Mediagent" | Mantener interno, no es nombre público |
| 1.4 | Target Mediagent | Multi-vertical |
| 1.5 | Cal.com en Sintergia | Sí, para calls de venta |

---

## OLA 2 — Aplicar Mediagent en Sintergia (en curso, 5/8 hecho)

### ✅ Paso 1 — `config.json` + Zod (2026-05-07)
### ✅ Paso 2 — Tag JSON estructurado en respuestas LLM (2026-05-07)
### ✅ Paso 3 — Workflow N8N v2 con Google Sheets (2026-05-12 validado end-to-end)
### ✅ Paso 4 — Evolution API setup paralelo (2026-05-19, código listo, **setup manual pendiente**)
### ✅ Paso 6 — Chat widget flotante mobile-first (2026-05-19, HECHO con bonus)

**Implementación (más rica que la prometida):**
- `src/components/ui/FloatingControls.tsx` — orchestrator que coordina widget + WhatsApp con state compartido
- `src/components/ui/FloatingChatWidget.tsx` — burbuja bottom-right siempre visible + panel expandible:
  - **Mobile**: bottom-sheet `85svh` con backdrop blur + body-scroll lock + drag handle visual
  - **Desktop**: panel `380×580` fixed bottom-right con scale+fade
- `src/components/ui/Chat.tsx` — refactor con prop `variant: "standalone" | "embedded"` (backward compatible)
- `src/components/ui/FloatingWhatsApp.tsx` — reposicionado a **bottom-left** + acepta `hideOnMobileChatOpen`
- **Speech bubble persistente** visible siempre que el chat esté cerrado, con texto:
  - Desktop: "¿Tenés dudas? Habla con nuestro agente."
  - Mobile: "¿Dudas? Habla con el agente."
  - X dismissible (no persiste entre reloads)
  - Delay 1.5s para no ser invasivo en primera carga
- **Custom event `sintergia:open-chat`** — cualquier botón puede abrir el widget (ej: CTA "Probar el agente" del Hero)
- ESC para cerrar + backdrop click en mobile + iOS safe-area aware
- Reemplaza el viejo `AgentSection` (archivo huérfano en disco)

### 🟡 Paso 5 — SEO completo (siguiente — alta prioridad Felipe)
- `app/sitemap.ts` + `app/robots.ts`
- `app/opengraph-image.tsx` + `app/twitter-image.tsx` dinámicos
- Metadata extendida + canonical
- JSON-LD `ProfessionalService` (remoto LATAM) + `LocalBusiness` (CABA presencial)
- NAP consistency
- **Acción manual Felipe:** crear Google Business Profile (Service Area Business)
- **Estimado:** 1.5h

### 🟡 Paso 7 — Cal.com + confirmation workflow
- Cuenta Cal.com + event "Llamada Sintergia 30 min"
- `config/sintergia.json` setear `contact.calendar_url`
- Webhook Cal.com → N8N workflow nuevo (WhatsApp + Email + Telegram)
- **Estimado:** 2h

### 🟡 Paso 8 — Validar `create-client.sh` con Sintergia como template
- Probar clonación <1min, debug si falla
- **Estimado:** 30min — 1h

---

## OLA VISUAL — Rediseño Sintergia v3 (2026-05-19) ✅ COMPLETADA

**Pivot visual**: refresh del branding manteniendo navy + cyan + Fraunces (signatura), agregando Inter Tight (display tech) + JetBrains Mono (eyebrows) + lima como sazón estratégica. Sistema editorial coherente en toda la landing.

### Setup base (PRE-Tier 1)
- ✅ `framer-motion@12.39` instalado
- ✅ Tokens Tailwind 4 `@theme` rediseñados en `globals.css`: `--color-surface`, `--color-accent-2` (purple), `--color-accent-warm` (lima `#C7F94A`), `--color-success`, `--color-whatsapp`, `--font-display-tech`, `--font-mono`, `--safe-bottom`
- ✅ 4 fuentes vía `next/font/google`: Fraunces + Plus Jakarta Sans + **Inter Tight** + **JetBrains Mono**
- ✅ `.nvmrc` con Node 22 (evita bug Node 18 + Next 16)
- ✅ Keyframes nuevos: `animate-marquee` 30s linear infinite

### Tier 1 — Estructura visual coherente

| ID | Componente | Detalle |
|---|---|---|
| V.1 | **Hero v3** | Aurora animada 3 blobs (cyan/purple/lima) respirando + grain SVG + dot-grid con mask radial; badge mono editorial; h1 76px Inter Tight con highlight cyan rotado en "atendiendo" + Fraunces italic muted en "mientras"; trust row mono; phone WhatsApp con 4 mensajes staggered + dots typing; sidecards flotantes desktop; **marquee** horizontal infinite con 12 keywords |
| V.2 | **§ 01 Problema** | Eyebrow editorial, h2 con "_familiar?_" italic muted; grid 3 cards con `gap: 1px` (look newspaper); cada card con número mono + glyph editorial (☏ ◷ ↻); fondo `bg-bg-alt/40` |
| V.3 | **§ 02 ComoFunciona (El Método)** | Tres pasos con número Inter Tight 72-80px; card central highlight cyan + glow + badge "Core"; meta footer mono; id renombrado a `#metodo` |
| V.4 | **§ 03 OtrosServicios (Servicios)** | Featured card grande arriba "Agentes IA en WhatsApp" + mini mockup chat rotado; 4 cards complementarios abajo (Sitios/Landings/E-commerce/Auto) con SVG icons custom; glow purple sutil; **id renombrado a `#servicios`** |
| V.5 | **§ 04 Portafolio** (nueva sección) | 6 cards: 5 reales + 1 empty con dashed border; thumbnails generados (gradient hash + dot grid overlay + mock browser bar + emoji con drop-shadow); banner inferior CTA WhatsApp |
| V.6 | **§ 05 Planes** | Scarcity badge con dot ping; 3 cards numerados `01 · ARRANQUE`...; central elevada `lg:-translate-y-2` con shadow cyan + badge "★ Más elegido"; precios 48px Inter Tight |
| V.7 | **CTA Final** | Aurora fuerte detrás (2 blobs respirando); badge mono "Aceptando proyectos · Buenos Aires"; h2 76px con highlight cyan rotado en "**su negocio**"; CTAs WhatsApp + Ver casos |
| V.8 | **Footer** | 3 columnas mono uppercase editorial; logo SVG + `Sintergia · Studio · 2026`; meta "Buenos Aires → Built with AI" |
| V.9 | **Nav actualizado** | Servicios (`#servicios` → OtrosServicios), Planes, Portafolio + botón Contáctenos WhatsApp |
| V.10 | **BackgroundPattern** (componente reutilizable) | `src/components/ui/BackgroundPattern.tsx` con 4 variantes (`dots` 20px / `dots-sparse` 40px / `grid` 48px / `lines` 32px); props `intensity` y `mask` (`radial`/`top`/`none`); server-friendly |
| V.11 | **Ritmo alternado de fondos** | Hero (rico) → Problema (alt + dots) → ComoFunciona (bg + grid) → OtrosServicios (alt + dots-sparse) → Portafolio (bg + dots) → Planes (bg + grid) → CTA (rico) → Footer (limpio) |

### Renombres de IDs (semántica corregida)
- `#servicios` → `#metodo` (ComoFunciona ahora es "El Método")
- `#ecosistema` → `#servicios` (OtrosServicios ahora es la sección de servicios real)
- Nav `#agente` → eliminado (widget reemplaza la sección)

### Archivos huérfanos en disco (NO importados en page.tsx)
- `src/components/sections/AgentSection.tsx`
- `src/components/sections/Casos.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/SectionHeading.tsx`

Felipe pidió **mantenerlos como referencia** (no borrar). Quedan en git history si se necesitan.

---

## OLA 3 — Mejoras a Mediagent (post-validación Ola 2)

| ID | Mejora | Por qué (validado en Sintergia) |
|---|---|---|
| 3.1 | Chat embebido en landing como feature opcional | Sintergia: convierte mejor que solo WhatsApp |
| 3.2 | Telegram al dueño como CRM mínimo pre-Sheets | Sin OAuth, instantáneo |
| 3.3 | Documentar Evolution API + Baileys 7 (dos opciones) | Sintergia validó ambas |
| 3.4 | Lead detection híbrido: tag LLM + keywords fallback | Robustez probada |
| 3.5 | Documentar bug versionado N8N v2.16 + workaround | Lección 2026-05-12 |
| 3.6 | Imagen Evolution `pull_policy: always` | Lección 2026-05-19 |
| 3.7 | Webhook con auth `apikey` header obligatorio | Patrón 2026-05-19 |
| 3.8 | Speech bubble persistente en widget chat | Lección UX 2026-05-19 |
| 3.9 | Sistema de tokens Tailwind 4 `@theme` + 4 fuentes coherente | Patrón Sintergia v3 |
| 3.10 | Componente `BackgroundPattern` con variantes para ritmo visual | Patrón Sintergia v3 |

---

## OLA 4 — Producción y crecimiento

- Migrar N8N a VPS público
- Dominio personalizado Sintergia
- `N8N_WEBHOOK_URL` real en Vercel
- Sentry / observability
- Primera campaña 100 leads

---

## Próximo paso al iniciar siguiente sesión

1. Leer este `ROADMAP.md`
2. Confirmar con Felipe: ¿Evolution API setup manual completado o pendiente?
3. Si Evolution OK → arrancar **Paso 5 (SEO completo)** que es la mayor prioridad declarada
4. Si Evolution falla → debug primero

---

## Comandos útiles

```bash
# Dev server Next.js
cd ~/Documentos/agente/sintergia
nvm use            # lee .nvmrc → Node 22
npm run dev        # http://localhost:3000

# Typecheck
npx tsc --noEmit

# Infra Docker (con Evolution)
cd infra
docker compose ps
docker compose pull evolution-api
docker compose up -d
docker compose logs -f evolution-api
docker compose logs -f n8n
docker compose stop evolution-api evolution-redis evolution-postgres
```
