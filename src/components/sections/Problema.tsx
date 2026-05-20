"use client";

import { motion } from "framer-motion";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

/* ─────────────────────────────────────────────────────────────
 * § 01 — El Diagnóstico
 * Editorial: número grande mono, símbolo, título + descripción.
 * Reveal staggered al entrar en viewport.
 * Mobile-first.
 * ──────────────────────────────────────────────────────────── */

const PROBLEMS = [
  {
    n: "01",
    glyph: "☏",
    title: "El teléfono no para de sonar.",
    description:
      "Usted o su equipo pasan horas respondiendo las mismas preguntas: horarios, precios, disponibilidad. Tiempo que debería estar en lo que importa.",
  },
  {
    n: "02",
    glyph: "◷",
    title: "Las citas se pierden.",
    description:
      "Clientes que llaman fuera de horario, mensajes que quedan sin leer, turnos que se cruzan. Cada cita perdida es dinero que se va.",
  },
  {
    n: "03",
    glyph: "↻",
    title: "Las mismas preguntas, 20 veces al día.",
    description:
      "¿Cuánto cuesta? ¿Tienen turno? ¿Dónde quedan? Su equipo las responde manualmente una y otra vez. Un bot las resuelve al instante.",
  },
];

export default function Problema() {
  return (
    <section
      id="problema"
      className="relative bg-bg-alt/40 py-20 sm:py-28 overflow-hidden border-y border-white/5"
    >
      <BackgroundPattern variant="dots" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          <span>§ 01</span>
          <span className="h-px w-8 bg-accent" />
          <span>El Diagnóstico</span>
        </div>

        {/* H2 con highlight selectivo */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-5 font-display-tech text-3xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.035em] font-medium text-text max-w-3xl"
        >
          ¿Le suena{" "}
          <span className="font-display italic font-light text-text-muted">
            familiar?
          </span>
        </motion.h2>
        <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
          Estos problemas le cuestan tiempo y clientes todos los días.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 border border-white/10 rounded-2xl overflow-hidden">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-bg p-7 sm:p-8 min-h-[260px] flex flex-col justify-between hover:bg-surface/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                  {p.n}
                </span>
                <span
                  aria-hidden="true"
                  className="font-display-tech text-3xl text-text-muted/60 group-hover:text-accent transition-colors"
                >
                  {p.glyph}
                </span>
              </div>

              <div>
                <h3 className="font-display-tech text-xl sm:text-2xl font-medium tracking-[-0.025em] leading-[1.18] text-text">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
