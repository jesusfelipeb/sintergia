"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/config";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

/* ─────────────────────────────────────────────────────────────
 * Portafolio — Sintergia v3
 * Inspirado en Variant A: grid de thumbnails generados (gradient + emoji
 * + mock browser bar). 5 reales + 1 "Su próximo proyecto" empty con
 * dashed border. Mobile-first: 1 col → 2 col (md) → 3 col (lg).
 * ──────────────────────────────────────────────────────────── */

type Project = {
  title: string;
  tag: string;
  description: string;
  glyph: string;
  url?: string;
  empty?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Banana Express",
    tag: "E-COMMERCE",
    description: "Verdulería con pedidos por WhatsApp y entrega en el día.",
    glyph: "🍌",
  },
  {
    title: "Dr. Méndez & Asoc.",
    tag: "SITIO INSTITUCIONAL",
    description: "Estudio jurídico con sistema de turnos integrado.",
    glyph: "⚖️",
  },
  {
    title: "Estudio Aurora",
    tag: "LANDING PAGE",
    description: "Captación de pacientes para clínica de estética.",
    glyph: "✨",
  },
  {
    title: "Contador García",
    tag: "AGENTE IA",
    description: "Bot que agenda consultas y responde FAQs de clientes.",
    glyph: "📊",
  },
  {
    title: "Pilates Norte",
    tag: "AUTOMATIZACIÓN",
    description: "Reservas, cobros y recordatorios de clases automáticos.",
    glyph: "🧘",
  },
  {
    title: "Su próximo proyecto",
    tag: "DISPONIBLE",
    description: "Lugar disponible este mes. ¿Hablamos por WhatsApp?",
    glyph: "✦",
    empty: true,
  },
];

export default function Portafolio() {
  return (
    <section
      id="portafolio"
      className="relative bg-bg py-20 sm:py-28 overflow-hidden border-y border-white/5"
    >
      <BackgroundPattern variant="dots" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Eyebrow editorial */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          <span>§ 04</span>
          <span className="h-px w-8 bg-accent" />
          <span>Portafolio</span>
        </div>

        <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
          <h2 className="font-display-tech text-3xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.035em] font-medium text-text max-w-2xl">
            Algunos proyectos{" "}
            <span className="font-display italic font-light text-text-muted">
              que construimos.
            </span>
          </h2>
          <p className="max-w-sm text-base text-text-muted leading-relaxed">
            Sitios, ecommerce y automatizaciones para distintos rubros. Cada uno,
            diseñado a medida.
          </p>
        </div>

        {/* Grid */}
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <ProjectCard p={p} />
            </motion.li>
          ))}
        </ul>

        {/* Banner inferior CTA */}
        <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-surface/40 px-5 py-4 text-center font-mono text-[12px] tracking-[0.06em] text-text-muted">
          ↗{" "}
          <a
            href={whatsappLink(
              "Hola, tengo un proyecto en mente, ¿podemos conversar?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-accent transition-colors"
          >
            ¿Tiene un proyecto en mente? Cuéntenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
 * Card individual con hover translateY + border accent
 * ───────────────────────────────────────────────────── */
function ProjectCard({ p }: { p: Project }) {
  const isEmpty = !!p.empty;

  return (
    <a
      href={
        isEmpty
          ? whatsappLink("Hola, quiero conversar sobre un proyecto nuevo")
          : "#"
      }
      target={isEmpty ? "_blank" : undefined}
      rel={isEmpty ? "noopener noreferrer" : undefined}
      className={[
        "group block h-full rounded-2xl overflow-hidden",
        "border transition-all duration-300",
        isEmpty
          ? "border-dashed border-white/10 hover:border-accent/40"
          : "border-white/10 bg-surface/60 hover:border-accent/50",
        "hover:-translate-y-1",
      ].join(" ")}
    >
      {/* Thumbnail */}
      {isEmpty ? <EmptyThumb /> : <Thumb title={p.title} glyph={p.glyph} />}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        <div className="flex items-center justify-between">
          <span
            className={[
              "font-mono text-[10.5px] tracking-[0.12em]",
              isEmpty ? "text-text-muted" : "text-accent",
            ].join(" ")}
          >
            {p.tag}
          </span>
          {!isEmpty && (
            <span className="text-[11px] text-text-muted group-hover:text-accent transition-colors">
              ↗
            </span>
          )}
        </div>
        <h3 className="text-[17px] sm:text-lg font-medium tracking-[-0.02em] text-text">
          {p.title}
        </h3>
        <p className="text-[13px] text-text-muted leading-relaxed">{p.description}</p>
      </div>
    </a>
  );
}

/* Thumb generado: gradient determinista por hash del título + emoji + mock browser bar */
function Thumb({ title, glyph }: { title: string; glyph: string }) {
  const palettes = [
    ["#FCD34D", "#10B981"],
    ["#1E293B", "#475569"],
    ["#FDA4AF", "#E11D48"],
    ["#3B82F6", "#4F46E5"],
    ["#2DD4BF", "#059669"],
    ["#A78BFA", "#7C3AED"],
  ];
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0;
  const [c1, c2] = palettes[h % palettes.length];

  const url = title.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";

  return (
    <div
      className="relative h-44 sm:h-48 overflow-hidden flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
    >
      {/* dot grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* mock browser bar */}
      <div className="absolute top-3 left-3 right-3 flex h-5 items-center gap-1 rounded bg-white/90 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 truncate font-mono text-[9px] tracking-[0.04em] text-zinc-600">
          {url}
        </span>
      </div>

      {/* glyph */}
      <div
        className="relative pt-4 text-5xl sm:text-6xl"
        style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.30))" }}
      >
        {glyph}
      </div>
    </div>
  );
}

/* Empty card: pattern de líneas diagonales sutiles + "+" */
function EmptyThumb() {
  return (
    <div
      className="flex h-44 sm:h-48 items-center justify-center bg-bg-alt/60 border-b border-dashed border-white/10"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(248,250,252,0.04), rgba(248,250,252,0.04) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <span className="text-3xl text-text-muted">+</span>
    </div>
  );
}
