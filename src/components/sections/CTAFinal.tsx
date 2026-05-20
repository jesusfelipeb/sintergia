"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/lib/config";

/* ─────────────────────────────────────────────────────────────
 * CTA Final — fullbleed con aurora fuerte detrás
 * H2 grande con highlight cyan rotado (signatura visual).
 * Mobile-first.
 * ──────────────────────────────────────────────────────────── */

export default function CTAFinal() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-bg py-24 sm:py-32 border-t border-white/5">
      {/* Aurora detrás */}
      {!reduce ? (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] sm:w-[80vw] h-[60vh] rounded-full bg-accent/30 blur-3xl mix-blend-screen pointer-events-none"
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[-20%] left-1/3 w-[60vw] h-[50vh] rounded-full bg-accent-2/25 blur-3xl mix-blend-screen pointer-events-none"
            animate={{ x: [0, 60, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent-2/15 to-transparent pointer-events-none"
        />
      )}

      {/* Grain overlay */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-screen pointer-events-none"
      >
        <filter id="cta-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 backdrop-blur-md px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Aceptando proyectos · Buenos Aires
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display-tech text-4xl sm:text-6xl lg:text-[76px] leading-[1.02] tracking-[-0.04em] font-medium text-text"
        >
          ¿Listo para hacer
          <br />
          crecer{" "}
          <span className="relative inline-block">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 -z-10 bg-accent/85 -rotate-1 rounded-md"
              aria-hidden="true"
            />
            <span className="relative px-2 sm:px-3 text-bg">su negocio</span>
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 max-w-xl mx-auto text-base sm:text-lg text-text-muted leading-relaxed"
        >
          Cuéntenos qué necesita. Sitio, ecommerce, automatización o agente de IA.
          Le armamos un plan a medida.{" "}
          <span className="text-text font-medium">Sin compromiso.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button
            variant="whatsapp"
            size="lg"
            href={whatsappLink(
              "Hola, quiero conversar sobre un bot para mi negocio"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shadow-xl shadow-[#25D366]/30 hover:scale-105 transition-transform"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp directo
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href="#portafolio"
            className="w-full sm:w-auto"
          >
            Ver casos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
