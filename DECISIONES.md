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
