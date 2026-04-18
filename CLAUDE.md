# Sintergia · Manual de Claude Code

## Qué es Sintergia
Empresa de servicios tecnológicos (bots, automatizaciones, landings, e-commerce) para profesionales locales y emprendedores latinos.
Pricing bots: USD 600 / 1500 / 3000 setup + recurrente desde USD 80/mes.
Servicios complementarios: Sitios web, E-commerce (Tiendanube/Shopify), Automatizaciones integrales.

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
src/
├── app/
│   ├── api/chat/route.ts    ← Groq streaming endpoint
│   ├── layout.tsx            ← root layout (fonts, metadata, FloatingWhatsApp)
│   ├── page.tsx              ← landing (todas las secciones)
│   └── globals.css           ← paleta dark tech + keyframes float
├── components/
│   ├── ui/                   ← Button, Section, SectionHeading, Chat, FloatingWhatsApp
│   ├── sections/             ← Hero, Problema, ComoFunciona, OtrosServicios, Casos, Planes, AgentSection, CTAFinal
│   └── layout/               ← Nav, Footer
├── lib/
│   └── constants.ts          ← WhatsApp, tiers, system prompt (con cross-selling), suggested questions
├── types/
│   └── index.ts              ← Message, Tier, FAQItem
└── public/
    └── hero.png              ← imagen hero (AI assistant en smartphone)
```

## Componentes
- `Button` (variants: primary, ghost, whatsapp; sizes: default, lg; dark theme con shadow accent)
- `Section` (wrapper con padding, alt bg opcional)
- `SectionHeading` (título display + subtítulo)
- `Chat` (client component, streaming, chips sugeridos, burbujas cyan/glass, auto-scroll interno, fallback WA)
- `FloatingWhatsApp` (botón fijo bottom-right, aparece después de 300px scroll, animate-ping, tooltip)
- `Nav` (sticky, backdrop-blur, responsive con hamburger, logo SVG mask)
- `Footer` (dark, glow sutil, logo SVG mask)

## WhatsApp
- Número: +5491132924310
- Todos los CTAs usan `wa.me/5491132924310?text=...` con mensaje pre-rellenado
- CTA principal: "Obtener mi Bot"
- FloatingWhatsApp: persistente después del Hero
- El agente de WhatsApp (IA) es fase 2

## Chat Agent (Groq)
- Modelo: Llama 3.3 70B Versatile
- API key en `.env.local` (GROQ_API_KEY)
- System prompt en `lib/constants.ts`:
  - Servicios principales (bots IA) + complementarios (web, e-commerce, automatizaciones)
  - Cross-selling inteligente: detecta si el lead necesita infraestructura y ofrece combo
  - Precios, caso Banana Express, proceso, reglas de tono
- Streaming: raw fetch → SSE → plain text transform
- Límites: 20 mensajes por sesión, 500 chars por mensaje, 400 tokens max respuesta
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

## Fase 2 (post-launch)
- N8N self-hosted para captura de leads → Google Sheets
- N8N para notificaciones a Felipe (WhatsApp/email) cuando hay lead caliente
- Bot de WhatsApp con Groq via N8N (mismo system prompt)
- Arquitectura: chat web directo a Groq (rápido) + N8N async para workflows

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
