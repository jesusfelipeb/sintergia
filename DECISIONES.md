# DECISIONES — Sintergia

Log cronológico de decisiones no triviales del proyecto.

---

## 2026-04-16 · Reorganización de CLAUDE.md

**Qué:** Se reescribió `CLAUDE.md` para eliminar duplicados y consolidar el contexto relevante.

**Por qué:** Archivo tenía encabezados duplicados, stack repetido, reglas workspace-generales mezcladas con contexto específico.

---

## 2026-04-18 · Stack definitivo: Next.js 16

**Qué:** Se eligió Next.js 16.2.4 en lugar de Next.js 14.

**Por qué:** CLAUDE.md original decía Next 14 por inercia. Felipe confirmó actualizar.

**Stack:** Next.js 16.2.4 + React 19 + Tailwind 4 + TypeScript. npm, src-dir, @/* alias.

---

## 2026-04-18 · FAQ reemplazado por agente de IA

**Qué:** La sección FAQ tradicional se reemplazó por un chat con agente de IA (Groq, Llama 3.3 70B).

**Por qué:** Felipe quiere que la landing sea un ejemplo vivo de lo que Sintergia vende. El agente responde preguntas, califica leads y redirige a WhatsApp.

---

## 2026-04-18 · Arquitectura del chat: raw fetch, sin AI SDK

**Qué:** API route llama a Groq directamente con fetch + streaming SSE manual. Zero dependencias.

**Por qué:** Minimizar dependencias. Endpoint simple sin tool calls ni branching complejo.

---

## 2026-04-18 · Fase 2: N8N + WhatsApp bot post-launch

**Qué:** N8N (self-hosted) para leads en Google Sheets y notificaciones. Bot de WhatsApp como fase 2.

**Por qué:** Priorizar landing online. Chat web ya demuestra el producto.

---

## 2026-04-18 · Rediseño a Dark Tech (V2)

**Qué:** Migración completa de la paleta "Tecnología con Tierra" (azul pizarra + terracota + blanco cálido) a un tema Dark Tech (navy #040b16 + cyan #00b4d8 + purple #8B5CF6).

**Por qué:** Alineación con el logo institucional ciber-geométrico de Sintergia. Felipe dirigió el rediseño.

**Cambios:**
- Modo oscuro nativo (bg #040b16)
- Glassmorphism oscuro en todas las cards (bg-white/5, backdrop-blur, border-white/10)
- Glows neón sutiles en CTA Final y Footer
- Hero reestructurado a split layout con imagen + notificaciones flotantes
- SVG mask del logo en Nav y Footer
- Hover elevations y gradientes purple→cyan

---

## 2026-04-18 · Sección OtrosServicios

**Qué:** Nueva sección "Más allá de los Bots: Un Ecosistema" con Sitios Web, E-commerce (Tiendanube/Shopify) y Automatizaciones.

**Por qué:** Ampliar la oferta visible sin quitar foco de los bots IA. Estilo visual subyugado.

---

## 2026-04-18 · Cross-selling en el SYSTEM_PROMPT

**Qué:** El agente de chat ahora detecta si el lead carece de infraestructura digital y ofrece servicios complementarios orgánicamente.

**Por qué:** Maximizar ticket promedio por lead.

---

## 2026-04-18 · CRO: FloatingWhatsApp + scarcity + copy

**Qué:** Botón flotante WhatsApp (aparece después de scroll 300px, animate-ping). Badge scarcity "3 negocios/mes" en Planes. Copy "Obtener mi Bot" + micro-badges "Sin contratos / Setup en 48hs".

**Por qué:** Optimización de conversión. Captar leads pasivos y generar urgencia.

---

## 2026-04-18 · Carpeta sintergia/ (sin "studio")

**Qué:** Proyecto en `sintergia/`, no en `sintergia-studio/`.

**Por qué:** "Sintergia Studio" es marca comercial; `sintergia/` es el folder del repo.

---

## 2026-04-18 · Skills n8n instalados (4 de 7)

**Qué:** Se instalaron 4 skills de `czlonkowski/n8n-skills` en `.claude/skills/`: n8n-workflow-patterns, n8n-code-javascript, n8n-expression-syntax, n8n-node-configuration.

**Por qué:** Preparación para Fase 2 (N8N). Se descartaron 3: n8n-code-python (usaremos JS), n8n-mcp-tools-expert y n8n-validation-expert (requieren MCP server que no tenemos aún). Los 4 instalados son guías markdown puras — patrones de webhooks, agentes IA, expresiones, y configuración de nodos.

---

## 2026-04-18 · Fase 2: Infraestructura N8N + Docker

**Qué:** Se creó `infra/docker-compose.yml` con N8N + PostgreSQL 16 + Redis 7 + WhatsApp Bot, todo local para desarrollo.

**Por qué:** Arrancar Fase 2 sin costos. N8N para workflows de leads, bot custom para WhatsApp.

**Arquitectura:**
- PostgreSQL para N8N
- Redis para N8N
- N8N en puerto 5678
- WhatsApp Bot custom en puerto 3001
- Para producción se migrará a VPS

---

## 2026-04-18 · Lead detection en chat web → N8N webhook

**Qué:** El API route `/api/chat` ahora detecta señales de lead (keywords como "precio", "contratar", "negocio") y envía un webhook async a N8N cuando hay ≥2 señales en la conversación.

**Por qué:** Captura automática de leads sin interrumpir la UX del chat. El webhook es fire-and-forget (no bloquea la respuesta del agente). N8N recibe la conversación y notifica a Felipe.

---

## 2026-04-19 · Evolution API descartada → Bot custom con Baileys 7

**Qué:** Se descartó Evolution API. Se construyó un bot de WhatsApp standalone (`infra/whatsapp-bot/`) con Baileys 7.0.0-rc.9 + Groq directo.

**Por qué:** Evolution API v2.2.3 usa Baileys 6.x, que WhatsApp bloqueó (error 405 en el handshake WebSocket). Baileys 7.x es ESM y no compatible con Evolution API (CJS). Bot custom es más liviano, controlable y funcional.

**Stack bot:**
- Node 22 Alpine + Baileys 7.0.0-rc.9 (ESM)
- Groq API directa (mismo system prompt que el chat web, adaptado para calificar leads)
- Panel web QR en `http://localhost:3001/qr` con diseño dark Sintergia y auto-refresh 15s
- Detección de leads + webhook async a N8N
- Health endpoint en `/health`
- Auth persistido en volumen Docker

---

## 2026-04-19 · Notificación de leads por Telegram (no WhatsApp)

**Qué:** La notificación a Felipe cuando hay un lead calificado se enviará por Telegram, no por WhatsApp.

**Por qué:** Felipe no quiere mezclar el bot de atención al público con sus notificaciones personales. Telegram es más limpio para notificaciones internas.

**Datos requeridos en la notificación:** nombre completo, número de WhatsApp, tipo de negocio, problema del cliente, solución ofrecida por el bot.

---

## 2026-04-24 · Telegram + extracción con Groq implementados

**Qué:** Workflow `Sintergia - Lead Capture` reescrito. Webhook → Formatear Lead → (rama A: Guardar Local) + (rama B: Extraer Datos con Groq → Parsear → Formatear Notificación → Enviar Telegram).

**Extracción:** Un nodo HTTP Request llama a Groq (`llama-3.3-70b-versatile` + `response_format: json_object`) con prompt que pide JSON con `{nombre, whatsapp, negocio, problema, solucion}`. Si un dato no aparece, queda `null` → "No detectado".

**Secrets:** `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` y `GROQ_API_KEY` viven en `infra/.env` y se inyectan al contenedor N8N vía `docker-compose.yml`. Los nodos los leen con `{{ $env.VAR }}`.

**Bloqueo resuelto:** N8N 2.16 trae `N8N_BLOCK_ENV_ACCESS_IN_NODE=true` por defecto, que impide leer env vars desde nodos. Se seteó a `false` en el compose.

---

## 2026-05-07 · Pivot estratégico — Sintergia como dogfood de Mediagent

**Qué:** Sintergia se convierte en el primer "cliente real" que valida la promesa de Mediagent. Las features prometidas por Mediagent que faltan en Sintergia se implementan acá; con lo aprendido se mejora Mediagent.

**Por qué:** Análisis comparativo Sintergia ↔ Mediagent reveló:
- 2 features que Sintergia tiene y Mediagent NO ofrece (chat embebido + Telegram CRM mínimo)
- Discrepancia técnica: Mediagent vende Evolution API, Sintergia lo descartó
- Mediagent prometía multi-tenant pero ningún proyecto Sintergia lo había validado

**Cómo se aplica:** Sintergia adopta la arquitectura de Mediagent (config.json, tag JSON estructurado, Sheets, Cal.com). Lo que sirve queda; lo que no, se reemplaza en Mediagent en Ola 3.

**Plan:** ver `ROADMAP.md`. Olas 1 (decisiones), 2 (aplicar Mediagent en Sintergia, en curso), 3 (mejoras a Mediagent).

---

## 2026-05-07 · `config.json` + Zod como fuente única de verdad

**Qué:** Datos del negocio (servicios, precios, horarios, contacto, casos, reglas del agente) extraídos de hardcoded en componentes/route handlers a `config/sintergia.json`. Validado con Zod en build.

**Por qué:**
1. **Mediagent prometía multi-tenant via config.json** — Sintergia valida la mecánica.
2. Triple fuente de verdad anterior (componentes + route handler + layout metadata) → un solo cambio rompía coherencia.
3. Zod en build → si falta campo o tipo malo, el deploy de Vercel falla antes de salir a producción.

**Implementación:**
- `config/sintergia.json` — datos del negocio
- `src/lib/config.ts` — schema Zod + loader + helpers (`whatsappLink`, `whatsappUrl`)
- `src/lib/agent-prompt.ts` — construye system prompt dinámicamente desde config
- `src/lib/constants.ts` — refactorizado a re-exports (cero cambios en componentes existentes)
- `src/app/api/chat/route.ts` — todas las constantes (MODEL, MAX_*, LEAD_SIGNALS, TEMPERATURE) leen del config

**Resultado:** Cambiar un precio en `sintergia.json` actualiza landing + agente + lead detection en una sola edición.

---

## 2026-05-07 · Tag JSON estructurado en respuestas LLM

**Qué:** El agente Groq emite al final de cada respuesta un marker `---META---` seguido de un JSON con `{lead_quality, intent}`. El server filtra el marker del stream antes de enviarlo al cliente.

**Por qué:** Reemplazar (y complementar) la detección por keywords por clasificación semántica del LLM. N8N puede rutear distinto según temperatura: caliente → alerta inmediata, tibio → nurturing, curioso → ignore.

**Whitelist:**
- `lead_quality`: `caliente | tibio | curioso`
- `intent`: `agendar | info | demo | soporte`

**Implementación:**
- Stream-filter HOLDBACK que retiene los últimos N chars por si el marker viene partido entre chunks SSE
- `parseLLMTag()` valida contra whitelist (rechaza valores inventados)
- `classifyByKeywords()` como fallback heurístico
- **No notifica si `lead_quality === "curioso"`** (filtra ruido de visitantes que solo navegan)

**Beneficio adicional:** alineación con la arquitectura de Mediagent (que ya emitía tag JSON pero sin filtro on-the-fly del stream).

---

## 2026-05-07 · Workflow v2 con Google Sheets

**Qué:** Nuevo workflow N8N `infra/workflow-lead-capture-v2.json` que extiende v1 con un nodo Google Sheets append en paralelo a Telegram.

**Cambios:**
- "Formatear Lead" mapea `classification` del payload (paso 2) a `lead_quality`, `intent`, `classification_source`
- "Formatear Notificación" Telegram con emoji por temperatura (🔥 caliente, 🌡️ tibio, 👀 curioso) + tag de intent visible
- Nuevo nodo "Google Sheets — Leads CRM" en paralelo a Telegram (no las reemplaza)
- 14 columnas en el Sheet: fecha, fuente, lead_quality, intent, classification_source, nombre, whatsapp, negocio, problema, solucion_ofrecida, total_mensajes, primer_mensaje, ultimo_mensaje, conversacion

**Decisión: NO sobrescribir v1.** Felipe importa v2 como workflow nuevo, prueba, después desactiva o borra v1.

**Setup manual pendiente** (15 min de Felipe): crear Sheet con headers, configurar OAuth Google en N8N UI, importar v2, reemplazar `__REPLACE_WITH_YOUR_GOOGLE_SHEET_ID__`. Instrucciones completas en `infra/SHEETS_SETUP.md`.

---

## 2026-05-07 · Evolution API revierte decisión: vuelve como paralelo a Baileys 7

**Qué:** Decisión previa (2026-04-19) de descartar Evolution API se revierte. Sintergia va a tener **ambos**: Baileys 7 corriendo (puerto 3001, ya funcional) + Evolution API en otro puerto, en paralelo, para A/B test.

**Por qué:** Mediagent vende Evolution API como su solución por defecto. Si Sintergia descartó Evolution, hay discrepancia entre lo que Mediagent promete y lo que su propio dogfood usa. Sintergia es el experimento — probamos ambos en condiciones reales y decidimos cuál mantener para futuros clientes.

**Implementación pendiente** (Ola 2 paso 4):
- Modificar `infra/docker-compose.yml`: agregar Evolution API + Postgres dedicado + Redis dedicado
- Mantener Baileys 7 intacto en puerto 3001
- Evolution en puerto distinto (típico 8080)
- Workflow N8N nuevo para Evolution → AI → respond
- Variables: `EVOLUTION_API_KEY`, `EVOLUTION_INSTANCE_NAME`
- Documentar en `infra/EVOLUTION_SETUP.md`

---

## 2026-05-12 · Workflow v2 con Sheets validado end-to-end + bug N8N v2.16 versionado

**Qué validamos:** workflow `Sintergia - Lead Capture v2` corre los 8 nodos en verde end-to-end. Telegram recibe notificación con emoji por temperatura, Google Sheet recibe fila completa con 14 campos.

**Bug encontrado y resuelto — versionado de workflows en N8N v2.16:**

N8N v2.16 introdujo separación entre **draft** (editor) y **active snapshot** (runtime). El workflow ejecutado en producción NO es lo que se ve en el editor, sino el snapshot guardado en `workflow_history` apuntado por `workflow_entity.activeVersionId`.

**Síntoma:** ediciones en N8N UI guardadas correctamente NO se reflejan al ejecutar. El runtime sigue usando snapshot viejo. UPDATEs directos a `workflow_entity.nodes` tampoco surten efecto (la ejecución usa el snapshot).

**Causa raíz:** el `activeVersionId` solo se actualiza al **desactivar + reactivar** el workflow desde UI (o vía API). Save en UI crea nuevo snapshot en `workflow_history` pero no cambia el `activeVersionId`.

**Workaround aplicado (2026-05-12):** parché directo en `workflow_history` del snapshot activo:
```sql
UPDATE workflow_history
SET nodes = jsonb_set(
  nodes::jsonb,
  '{<idx>,parameters,sheetName}',
  '{"__rl":true,"value":"gid=0","mode":"list","cachedResultName":"Leads"}'::jsonb
)
WHERE "versionId" = (
  SELECT "activeVersionId" FROM workflow_entity WHERE name = 'Sintergia - Lead Capture v2'
);
```
+ `docker stop infra-n8n-1 && docker start infra-n8n-1` para forzar reload del runtime.

**Lección operacional:** después de cualquier edit en UI a un workflow activo, **toggle Active → Inactive → Active** desde UI. NUNCA modificar `workflow_entity.nodes` directamente esperando que afecte runtime.

**Lección adicional:** el campo `sheetName` del nodo `n8n-nodes-base.googleSheets` v4.5 usa Resource Locator. `mode: "list"` espera el gid numérico como string (ej `"gid=0"`), no el nombre. Para Sheets recién creados con una sola pestaña, el gid es 0. Si seleccionás desde el dropdown de N8N UI, guarda el gid correcto automáticamente.

**Mejora pendiente Mediagent (Ola 3.5):** documentar este bug + workaround en la guía de Mediagent. Cualquier cliente que edite workflows en UI sin saber esto va a romper su instancia.

---

## 2026-05-19 · Evolution API agregado al stack (Ola 2 paso 4)

**Qué:** stack Docker Compose extendido con 3 servicios nuevos para Evolution API, **sin tocar los 4 existentes** (n8n / postgres-n8n / redis-n8n / whatsapp-bot Baileys 7).

**Configuración:**
- **Puerto externo Evolution:** `8087` (alejado de los típicos 8080-8086 admin dev)
- **Instancia:** `sintergia`
- **Webhook a N8N:** `http://n8n:5678/webhook/whatsapp-evolution` con header `apikey` para auth
- **Postgres dedicado:** `evolution-postgres` (interno, no expuesto)
- **Redis dedicado:** `evolution-redis` (interno, no expuesto, DB index 6)
- **Imagen:** `atendai/evolution-api:latest` con `pull_policy: always` (porque la local tenía 15 meses)

**Secrets generados con `openssl rand`:**
- `EVOLUTION_API_KEY` (64 hex chars) — reemplaza el `evo_api_key_secure_2026_sintergia` viejo del intento abril
- `EVOLUTION_POSTGRES_PASSWORD` (48 hex chars) — para la DB dedicada

**Por qué Evolution latest (no rebuild custom):** la imagen oficial está mantenida y el bug Baileys 6.x error 405 que motivaba el patch experimental (`Dockerfile.evolution` con `WhiskeySockets/Baileys#fix/web-version`) tiene 7+ meses de antigüedad — debería estar resuelto upstream. Si Evolution latest falla, fallback al Dockerfile custom queda disponible (imagen `infra-evolution-api:latest` sigue local).

**Workflow N8N nuevo:** `infra/workflow-whatsapp-evolution.json` con 10 nodos:
1. Webhook Evolution
2. **Verificar apikey** (IF: header `apikey` debe coincidir con `$env.EVOLUTION_API_KEY`)
3. **Filter mensaje entrante texto** (IF: `event=messages.upsert` + `fromMe=false` + `text no vacío`)
4. Extraer mensaje (Set: `instance, phone, text, push_name, timestamp`)
5. Cadencia humana 3s (Wait)
6. AI Agent (HTTP Request a Groq con system prompt simplificado + protocolo META tag)
7. Parsear respuesta + META (Code: separa texto visible del JSON META, valida whitelist)
8. Responder WhatsApp (HTTP a `evolution-api:8080/message/sendText/{instance}`)
9. NoOp "Ignorar" (rama no-mensaje)
10. NoOp "Rechazado" (rama apikey inválida)

**Limpieza colateral en `.env`:** detectada y corregida indentación accidental en `TELEGRAM_CHAT_ID` (2 espacios al inicio). Reorganizado con secciones comentadas por servicio.

**Estado actual:** todos los archivos listos y validados (`docker compose config --quiet` OK, JSON parseado OK). **`docker compose up` y creación de instancia + QR pendientes de Felipe** (~15 min, instrucciones en `infra/EVOLUTION_SETUP.md`).

**Decisión consciente:** Sintergia NO desactivó Baileys 7. Ambos van a correr en paralelo durante 1-2 semanas para A/B test (estabilidad, latencia, bloqueos de WhatsApp, UX de gestión). El ganador queda como default en Mediagent.

---

## 2026-05-19 · Chat widget flotante mobile-first (Ola 2 paso 6)

**Qué:** Reemplazo de la sección embebida `<AgentSection />` por un widget flotante persistente al estilo Intercom/Crisp. El chat agent (Groq) ahora vive en una burbuja siempre visible bottom-right.

**Arquitectura del widget:**

- **`FloatingControls.tsx`** — orchestrator client que coordina dos botones flotantes con state compartido. Escucha el evento global `sintergia:open-chat` para que cualquier botón pueda abrir el widget sin pasar refs.
- **`FloatingChatWidget.tsx`** — burbuja cyan bottom-right siempre visible (sin esperar scroll) + panel expandible:
  - **Mobile**: bottom-sheet `85svh` con backdrop blur + body-scroll lock + drag handle visual + slide-up spring animation
  - **Desktop**: panel fixed `380×580` bottom-right con scale+fade
  - ESC para cerrar + backdrop click en mobile + iOS safe-area aware
- **Speech bubble persistente** visible siempre que el chat esté cerrado — invita activamente a usar el agente:
  - Desktop: "¿Tenés dudas? Habla con nuestro agente."
  - Mobile: "¿Dudas? Habla con el agente."
  - X dismissible (no persiste entre reloads — simple, sin localStorage)
  - Delay 1.5s en entrada para no ser invasivo en primer paint
  - Cola apuntando a la burbuja debajo
- **`FloatingWhatsApp.tsx`** — reposicionado de bottom-right a **bottom-left**. Acepta prop `hideOnMobileChatOpen` para ocultarse en mobile cuando el widget está expandido (evita doble bubble visual). En desktop ambos coexisten.
- **`Chat.tsx`** refactorizado con prop `variant: "standalone" | "embedded"`. Default standalone = comportamiento idéntico al actual (backward compatible). En "embedded" oculta el header propio porque el widget provee uno.

**Custom event `sintergia:open-chat`**: `window.dispatchEvent(new CustomEvent("sintergia:open-chat"))`. Lo usa el CTA "Probar el agente" del Hero. Cualquier botón futuro puede dispararlo. Patrón pragmático que evita Context para state share entre componentes lejanos.

**`AgentSection.tsx`** queda huérfano en disco (no importado en page.tsx). Decisión Felipe: NO borrar por si se necesita rescatar.

---

## 2026-05-19 · Rediseño visual Sintergia v3 (Ola Visual completa)

**Qué:** Rediseño visual de toda la landing manteniendo el ADN navy + cyan + Fraunces como signatura, agregando capas editoriales (Inter Tight como display tech, JetBrains Mono como mono editorial, lima `#C7F94A` como sazón estratégica). Sistema visual coherente con eyebrows numerados editoriales (§ 01...§ 05), highlights de palabras clave con bg cyan rotado, animaciones `whileInView` staggered.

### Setup base (PRE-Tier 1)

- **`framer-motion@12.39`** instalado. Usado en Hero (aurora animada), todas las secciones (whileInView reveals), CTA Final (aurora respirando), FloatingChatWidget (spring entry/exit).
- **Tokens Tailwind 4 `@theme`** rediseñados en `globals.css`:
  - Colores: `--color-surface`, `--color-surface-2`, `--color-accent-2` (purple `#8B5CF6`), `--color-accent-warm` (lima `#C7F94A`), `--color-success`, `--color-whatsapp`
  - Tipos: `--font-display` (Fraunces), `--font-display-tech` (Inter Tight), `--font-body` (Plus Jakarta), `--font-mono` (JetBrains Mono)
  - Safe-area: `--safe-bottom: env(safe-area-inset-bottom, 0px)`
  - Keyframes nuevos: `animate-marquee` 30s linear infinite
- **`.nvmrc`** con `22` para evitar el bug Node 18 + Next 16 (Sintergia tenía Node 18 system).
- **4 fuentes vía `next/font/google`** en `layout.tsx`: Fraunces + Plus_Jakarta_Sans + Inter_Tight + JetBrains_Mono.

### Hero v3 (la pieza más densa del rediseño)

- **Aurora animada**: 3 blobs (cyan/purple/lima) respirando con `framer-motion` (`x`, `y`, `scale`, durations 18-26s, repeat mirror). Honors `prefers-reduced-motion` con fallback estático.
- **Grain SVG** (`feTurbulence` baseFrequency 0.85) overlay `mix-blend-screen opacity-[0.06]`.
- **Dot grid** con mask radial `(ellipse center, black 30%, transparent 75%)` — concentrado en el centro.
- **Badge mono** editorial superior con dot ping success + "Aceptando 3 proyectos / mes" (lee de `config.scarcity`).
- **H1 76px** Inter Tight con **highlight cyan rotado `-rotate-1`** + `motion.span scaleX 0→1` en la palabra "atendiendo" (signatura visual). Fraunces italic muted en "mientras".
- **Phone WhatsApp** con 4 mensajes staggered + dots typing animation.
- **3 sidecards flotantes** (Nuevo lead / Cita agendada / Stats hoy) desktop-only con `animate-float`.
- **Marquee horizontal** infinite con 12 keywords + separadores cyan.
- CTAs: "Obtener mi Bot" (WhatsApp) + "Probar el agente" (`window.dispatchEvent("sintergia:open-chat")`).

### Lenguaje visual coherente aplicado a todas las secciones

Cada sección sigue el patrón:
```
§ NN ─ NOMBRE EDITORIAL           ← eyebrow mono cyan con línea separadora
H2 Inter Tight con italic muted   ← display tech + Fraunces italic en palabra secundaria
subtítulo body                    ← Plus Jakarta
contenido con whileInView         ← framer-motion stagger
```

Sections rediseñadas:
- **§ 01 Problema**: grid 3 cards con `gap-px` (look newspaper) + números mono + glyphs (☏ ◷ ↻)
- **§ 02 ComoFunciona** ("El Método"): 3 cards con número Inter Tight 72-80px, central highlight cyan + badge "Core" mono
- **§ 03 OtrosServicios**: featured card grande Agentes IA + mini mockup chat rotado `-rotate-1` + 4 cards complementarios con SVG icons custom + glow purple sutil
- **§ 04 Portafolio** (NUEVA): 6 cards (5 reales + 1 empty dashed) con thumbnails generados (gradient hash determinista + dot grid overlay + mock browser bar Mac + emoji con drop-shadow)
- **§ 05 Planes**: scarcity badge con dot ping + 3 cards numeradas `01 · ARRANQUE`, central elevada `lg:-translate-y-2` con shadow cyan + badge "★ Más elegido"
- **CTA Final**: aurora animada fuerte detrás (2 blobs respirando) + grain + h2 76px con highlight cyan rotado en "**su negocio**"
- **Footer**: 3 columnas mono uppercase editorial minimalista
- **Nav**: 3 links (Servicios / Planes / Portafolio) + CTA Contáctenos. Eliminado "Casos" y "Agente" (este último reemplazado por widget).

### Sistema de fondos alternados con `BackgroundPattern`

Componente nuevo `src/components/ui/BackgroundPattern.tsx` (server-friendly, sin "use client") con 4 variantes:
- `dots` (20px puntos cerrados) — sensación tech-paper
- `dots-sparse` (40px puntos esparcidos) — ambiente
- `grid` (48px líneas cruzadas) — esquema/blueprint
- `lines` (32px líneas horizontales) — editorial newspaper

Props: `intensity` (0..1), `mask` (`radial` / `top` / `none`).

**Ritmo alternado aplicado:**
```
Hero (aurora rica) → § 01 (alt + dots) → § 02 (bg + grid) → § 03 (alt + dots-sparse)
 → § 04 (bg + dots) → § 05 (bg + grid) → CTA (aurora rica) → Footer (limpio)
```

Bordes `border-y border-white/5` en alt sections + Portafolio para marcar transiciones editoriales.

### Renombre de IDs (semántica corregida)

| Antes | Después | Componente |
|---|---|---|
| `id="servicios"` | `id="metodo"` | ComoFunciona (es "El Método", no "Servicios") |
| `id="ecosistema"` | `id="servicios"` | OtrosServicios (esto sí es servicios real) |
| `id="agente"` | (eliminado) | AgentSection ya no se importa |
| `id="casos"` | (eliminado) | Casos ya no se importa |

Nav `href` actualizado para mapear con los IDs nuevos.

### Archivos huérfanos en disco (decisión: NO borrar)

Estos archivos NO se importan en `page.tsx` pero quedan como referencia/respaldo:
- `src/components/sections/AgentSection.tsx`
- `src/components/sections/Casos.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/SectionHeading.tsx`

Si en el futuro se necesitan, están ahí. Si nunca, `git history` los preserva al borrarlos.

### Mobile-first verificado en cada pieza

- H1 Hero: `text-[40px] sm:text-6xl lg:text-[76px]` (40 → 60 → 76px)
- Grids: `grid-cols-1 md:grid-cols-3` (o equivalente)
- Card highlight central Planes: `lg:-translate-y-2` (elevación solo desktop)
- Sidecards Hero: `hidden lg:flex`
- Speech bubble: copy compacto en mobile, completo en desktop
- Widget chat: bottom-sheet en mobile, panel en desktop
- Touch targets ≥44×44px en todo botón flotante
- iOS safe-area-inset-bottom respetada
