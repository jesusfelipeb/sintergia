"use client";

import { motion } from "framer-motion";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

/* ─────────────────────────────────────────────────────────────
 * § 02 — El Método
 * Tres pasos en grid con número grande Inter Tight + meta mono.
 * Card central highlight con accent border + glow sutil.
 * Mobile-first.
 * ──────────────────────────────────────────────────────────── */

const STEPS = [
  {
    n: "01",
    title: "Conversamos",
    description:
      "Por WhatsApp o videollamada. Entendemos qué hace, quiénes son sus clientes y qué preguntas le hacen siempre.",
    meta: "Día 1 · 30 min",
  },
  {
    n: "02",
    title: "Construimos",
    description:
      "Diseñamos y programamos un asistente a medida. En 1–2 semanas tiene un bot listo para probar antes de activarlo.",
    meta: "Día 2 — 10",
    highlight: true,
  },
  {
    n: "03",
    title: "Activamos",
    description:
      "Lo conectamos a su WhatsApp. Lo acompañamos el primer mes y seguimos mejorándolo con cada interacción.",
    meta: "Día 11 +",
  },
];

export default function ComoFunciona() {
  return (
    <section id="metodo" className="relative bg-bg py-20 sm:py-28 overflow-hidden">
      <BackgroundPattern variant="grid" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          <span>§ 02</span>
          <span className="h-px w-8 bg-accent" />
          <span>El Método</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-5 font-display-tech text-3xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.035em] font-medium text-text max-w-3xl"
        >
          Tres pasos.{" "}
          <span className="font-display italic font-light text-text-muted">
            Diez días.
          </span>
        </motion.h2>
        <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
          De la conversación inicial al bot funcionando, en menos de dos semanas.
        </p>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={[
                "relative rounded-2xl border p-6 sm:p-7 flex flex-col gap-4",
                s.highlight
                  ? "border-accent/40 bg-accent/[0.04] shadow-[0_0_40px_rgba(0,180,216,0.08)]"
                  : "border-white/10 bg-surface/40",
              ].join(" ")}
            >
              {/* Número grande */}
              <div className="flex items-baseline justify-between">
                <span
                  className={[
                    "font-display-tech text-6xl sm:text-7xl font-medium tracking-[-0.05em] leading-none",
                    s.highlight ? "text-accent" : "text-text-muted/30",
                  ].join(" ")}
                >
                  {s.n}
                </span>
                {s.highlight && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent px-2 py-1 rounded-full border border-accent/30">
                    Core
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display-tech text-2xl sm:text-[26px] font-medium tracking-[-0.025em] text-text">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm sm:text-[14.5px] text-text-muted leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                {s.meta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
