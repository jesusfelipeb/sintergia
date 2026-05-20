"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import config, { whatsappLink } from "@/lib/config";

/* ─────────────────────────────────────────────────────────────
 * § 05 — Los Planes
 * 3 tiers: Arranque / Profesional (highlight) / Integral.
 * Card central elevada con accent border + scarcity badge arriba.
 * Mobile-first: stack vertical sin elevación, desktop grid 3.
 * ──────────────────────────────────────────────────────────── */

export default function Planes() {
  const tiers = config.services.tiers;

  return (
    <section
      id="planes"
      className="relative bg-bg py-20 sm:py-28 overflow-hidden"
    >
      <BackgroundPattern variant="grid" intensity={0.85} />

      {/* Glow sutil cyan en background */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-accent/8 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          <span>§ 05</span>
          <span className="h-px w-8 bg-accent" />
          <span>Los Planes</span>
        </div>

        <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display-tech text-3xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.035em] font-medium text-text"
          >
            Planes{" "}
            <span className="font-display italic font-light text-text-muted">
              a su medida.
            </span>
          </motion.h2>
          <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-text-muted max-w-xs leading-relaxed">
            Setup único + mantenimiento mensual.
            <br />
            Sin contratos de permanencia.
          </p>
        </div>

        {/* Scarcity badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Onboarding limitado a {config.scarcity.monthly_capacity} negocios / mes
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={[
                "relative flex flex-col rounded-2xl p-6 sm:p-7",
                tier.popular
                  ? "lg:-translate-y-2 border border-accent/50 bg-surface shadow-[0_24px_60px_rgba(0,180,216,0.18)]"
                  : "border border-white/10 bg-surface/40",
              ].join(" ")}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-bg font-mono text-[10px] uppercase tracking-[0.1em]">
                  ★ Más elegido
                </span>
              )}

              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-muted">
                  0{i + 1} · {tier.name}
                </span>
              </div>

              {/* Precio */}
              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display-tech text-4xl sm:text-5xl font-medium tracking-[-0.04em] text-text">
                    {tier.price}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                    setup
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-text-muted">
                  + {tier.monthly} mantenimiento
                </p>
              </div>

              {/* CTA */}
              <Button
                variant={tier.popular ? "primary" : "ghost"}
                href={whatsappLink(
                  `Hola, me interesa el plan ${tier.name} de Sintergia`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full justify-center"
              >
                Contáctenos →
              </Button>

              {/* Features */}
              <ul className="mt-6 pt-6 border-t border-white/8 flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-text"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-text/85">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
