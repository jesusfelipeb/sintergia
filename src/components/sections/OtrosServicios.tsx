"use client";

import { motion } from "framer-motion";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

/* ─────────────────────────────────────────────────────────────
 * § 03 — El Ecosistema
 * Producto estrella (Agentes IA) featured como card grande arriba.
 * 3 servicios complementarios abajo en grid compacto.
 * Mobile-first.
 * ──────────────────────────────────────────────────────────── */

const SERVICIOS = [
  {
    title: "Sitios web",
    description:
      "Sitios institucionales rápidos, diseñados a medida. Pensados para que su marca transmita seriedad y convierta.",
    icon: "web",
  },
  {
    title: "Landing pages",
    description:
      "Páginas de campaña optimizadas para captar leads o vender un producto específico.",
    icon: "landing",
  },
  {
    title: "E-commerce",
    description:
      "Tiendas online integradas con medios de pago, logística y WhatsApp. Listas para vender.",
    icon: "cart",
  },
  {
    title: "Automatizaciones",
    description:
      "Conectamos sus herramientas para que las tareas repetitivas se hagan solas. Ahorre horas cada semana.",
    icon: "auto",
  },
];

export default function OtrosServicios() {
  return (
    <section
      id="servicios"
      className="relative bg-bg-alt/40 py-20 sm:py-28 overflow-hidden border-y border-white/5"
    >
      <BackgroundPattern variant="dots-sparse" />

      {/* Glow sutil purple */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-2/8 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          <span>§ 03</span>
          <span className="h-px w-8 bg-accent" />
          <span>El Ecosistema</span>
        </div>

        <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display-tech text-3xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.035em] font-medium text-text max-w-2xl"
          >
            Todo lo que su negocio
            <br />
            necesita,{" "}
            <span className="font-display italic font-light text-text-muted">
              en un solo lugar.
            </span>
          </motion.h2>
          <p className="max-w-sm text-base text-text-muted leading-relaxed">
            Soluciones digitales llave en mano. Diseñamos, construimos y le
            acompañamos.
          </p>
        </div>

        {/* Featured: Agentes IA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-surface/60 backdrop-blur-md p-6 sm:p-10"
        >
          {/* Glow del featured */}
          <div
            aria-hidden="true"
            className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl pointer-events-none"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Nuestro producto estrella
              </span>
              <h3 className="mt-5 font-display-tech text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium text-text">
                Agentes de IA
                <br />
                en WhatsApp.
              </h3>
              <p className="mt-4 max-w-md text-base text-text-muted leading-relaxed">
                Asistentes virtuales que responden, agendan citas y califican
                leads por usted, las 24 horas. Conectados con su agenda, CRM y
                sistema de pagos.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-px bg-accent" />
                  Desde USD 600
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-px bg-accent" />
                  Setup 48h
                </span>
              </div>
              <a
                href="#planes"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Ver planes y demo →
              </a>
            </div>

            {/* Mini mockup chat */}
            <ServiceMiniChat />
          </div>
        </motion.div>

        {/* Otros servicios */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SERVICIOS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group rounded-2xl border border-white/10 bg-surface/40 p-5 sm:p-6 min-h-[220px] flex flex-col gap-4 hover:border-accent/40 hover:-translate-y-0.5 transition-all"
            >
              <ServiceIcon name={s.icon} />
              <div>
                <h3 className="font-display-tech text-lg font-medium tracking-[-0.02em] text-text">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-text-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-muted group-hover:text-accent transition-colors">
                <span>Consultar</span>
                <span>↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceMiniChat() {
  return (
    <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
      <div className="rounded-2xl border border-white/10 bg-bg-alt overflow-hidden shadow-2xl shadow-accent/10 -rotate-1">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
          <div className="h-7 w-7 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold">
            S
          </div>
          <span className="text-[12px] font-medium text-text">
            Asistente Sintergia
          </span>
          <span className="ml-auto font-mono text-[10px] text-success tracking-wider">
            ● online
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-white/8 border border-white/8 px-3 py-1.5 text-[12px] text-text leading-tight">
            ¿Cuánto cuesta un bot para mi consultorio?
          </div>
          <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-1.5 text-[12px] text-bg leading-tight">
            Para profesionales recomiendo el plan Profesional. ¿Le explico cómo
            funciona?
          </div>
          <div className="font-mono text-[10px] text-text-muted">
            ● respondió en 1.8s
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const stroke = "currentColor";
  const muted = "rgba(148,163,184,0.6)";
  const sw = 1.4;
  return (
    <div className="text-accent">
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
        {name === "web" && (
          <>
            <rect x="4" y="6" width="28" height="22" rx="2" stroke={stroke} strokeWidth={sw} />
            <line x1="4" y1="12" x2="32" y2="12" stroke={stroke} strokeWidth={sw} />
            <circle cx="8" cy="9" r="0.8" fill={stroke} />
            <circle cx="11" cy="9" r="0.8" fill={stroke} />
            <line x1="8" y1="18" x2="24" y2="18" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
            <line x1="8" y1="22" x2="20" y2="22" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
          </>
        )}
        {name === "landing" && (
          <>
            <rect x="10" y="4" width="16" height="28" rx="2" stroke={stroke} strokeWidth={sw} />
            <line x1="13" y1="10" x2="23" y2="10" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
            <rect x="13" y="14" width="10" height="6" rx="1" fill={stroke} fillOpacity="0.18" stroke={muted} strokeWidth={sw} />
            <line x1="13" y1="24" x2="20" y2="24" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
            <line x1="13" y1="27" x2="18" y2="27" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
          </>
        )}
        {name === "cart" && (
          <>
            <path d="M5 7 L9 7 L11 22 L27 22 L29 12 L11 12" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="13" cy="28" r="2" stroke={stroke} strokeWidth={sw} fill="none" />
            <circle cx="25" cy="28" r="2" stroke={stroke} strokeWidth={sw} fill="none" />
          </>
        )}
        {name === "auto" && (
          <>
            <circle cx="11" cy="18" r="5" stroke={stroke} strokeWidth={sw} />
            <circle cx="25" cy="18" r="5" stroke={stroke} strokeWidth={sw} />
            <path d="M16 18 L20 18" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
            <path d="M11 13 L11 9" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
            <path d="M25 23 L25 27" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
            <path d="M11 23 L11 27" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
            <path d="M25 13 L25 9" stroke={muted} strokeWidth={sw} strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}
