"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import config, { whatsappLink } from "@/lib/config";

/* ─────────────────────────────────────────────────────────────
 * Hero v3 — Sintergia
 * Fondo vivo (aurora animada + grain + dot grid).
 * Editorial: badge mono, highlight rotado en palabra clave (Fraunces italic),
 * trust row mono, phone con conversación staggered + sidecards flotantes.
 * Marquee horizontal con keywords al final.
 * Mobile-first.
 * ──────────────────────────────────────────────────────────── */

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-bg pt-20 sm:pt-28 pb-16 sm:pb-20">
      {/* ── Fondo vivo ────────────────────────────── */}
      <AuroraBackground reduce={!!reduce} />
      <GrainOverlay />
      <DotGrid />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Badge mono */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          <span className="text-text">Sintergia · Studio</span>
          <span className="h-3 w-px bg-white/10" />
          <span>Aceptando {config.scarcity.monthly_capacity} proyectos / mes</span>
        </motion.div>

        <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
          {/* ── Columna copy ────────────────────── */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display-tech text-[40px] sm:text-6xl lg:text-[76px] leading-[1.02] tracking-[-0.035em] font-medium text-text"
            >
              Su negocio
              <br />
              <span className="relative inline-block">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute inset-0 -z-10 bg-accent/85 -rotate-1 rounded-md"
                  aria-hidden="true"
                />
                <span className="relative px-2 sm:px-3 text-bg">atendiendo</span>
              </span>{" "}
              <span className="font-display italic font-light text-text-muted">
                mientras
              </span>
              <br />
              usted descansa.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg lg:text-[19px] text-text-muted leading-relaxed"
            >
              Bots de WhatsApp con{" "}
              <strong className="text-text font-medium">inteligencia artificial</strong>{" "}
              que responden, agendan citas y venden por usted. Las 24 horas, los 7 días.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="primary"
                size="lg"
                href={whatsappLink(
                  "Hola, quiero saber cómo un bot puede ayudar a mi negocio"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shadow-lg shadow-accent/30"
              >
                Obtener mi Bot →
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("sintergia:open-chat"));
                }}
                className="w-full sm:w-auto"
              >
                Probar el agente
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted"
            >
              {config.guarantees.map((g) => (
                <span key={g} className="flex items-center gap-1.5">
                  <span className="w-3 h-px bg-accent" />
                  {g}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Columna mockup ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full"
          >
            <HeroPhone />
          </motion.div>
        </div>
      </div>

      {/* ── Marquee horizontal ────────────── */}
      <div className="relative z-10 mt-16 sm:mt-24 overflow-hidden border-y border-white/5 bg-bg-alt/40 py-5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl sm:text-3xl text-text-muted tracking-[-0.02em]">
          {Array(2)
            .fill(null)
            .flatMap((_, repeat) =>
              [
                "Automatizar",
                "◇",
                "Agendar",
                "◇",
                "Responder",
                "◇",
                "Vender",
                "◇",
                "Calificar leads",
                "◇",
                "Atender 24/7",
                "◇",
              ].map((w, i) => (
                <span key={`${repeat}-${i}`} className={i % 2 === 1 ? "text-accent" : ""}>
                  {w}
                </span>
              ))
            )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
 * Fondo: aurora animada de blobs respirando
 * ───────────────────────────────────────────────────── */
function AuroraBackground({ reduce }: { reduce: boolean }) {
  const blob = (className: string) =>
    "absolute rounded-full blur-3xl mix-blend-screen pointer-events-none " + className;
  const baseTransition = {
    duration: 18,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };

  if (reduce) {
    return (
      <div aria-hidden="true" className="absolute inset-0">
        <div className={blob("top-[-10%] left-[10%] h-[60vh] w-[60vh] bg-accent/25")} />
        <div className={blob("top-[20%] right-[-10%] h-[55vh] w-[55vh] bg-accent-2/25")} />
        <div className={blob("bottom-[-10%] left-[30%] h-[45vh] w-[45vh] bg-accent-warm/10")} />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <motion.div
        className={blob("top-[-10%] left-[10%] h-[60vh] w-[60vh] bg-accent/30")}
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={baseTransition}
      />
      <motion.div
        className={blob("top-[15%] right-[-10%] h-[55vh] w-[55vh] bg-accent-2/30")}
        animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ ...baseTransition, duration: 22 }}
      />
      <motion.div
        className={blob("bottom-[-15%] left-[25%] h-[50vh] w-[50vh] bg-accent-warm/12")}
        animate={{ x: [0, 40, -60, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ ...baseTransition, duration: 26 }}
      />
    </div>
  );
}

function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-screen pointer-events-none"
    >
      <filter id="hero-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
  );
}

function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.25] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(rgba(248,250,252,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────
 * Mockup phone + sidecards (animaciones staggered)
 * ───────────────────────────────────────────────────── */
function HeroPhone() {
  const messages: Array<{ side: "them" | "me"; text: React.ReactNode }> = [
    { side: "them", text: "Hola, ¿atienden los sábados?" },
    { side: "me", text: "¡Hola! Sí, sábados de 9 a 14 hs. ¿Le agendo un turno?" },
    { side: "them", text: "Dale, mañana 10am" },
    {
      side: "me",
      text: (
        <>
          Listo. Le agendé para:
          <span className="mt-1.5 block rounded-md bg-white/15 px-2 py-1 font-mono text-[10.5px]">
            📅 SÁB 10/05 · 10:00 HS
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none lg:mx-0">
      {/* Glow detrás */}
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-accent/30 via-accent-2/20 to-transparent blur-3xl scale-95" />

      {/* Phone */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-[2rem] border border-white/10 bg-surface p-3 shadow-2xl shadow-accent/10"
      >
        <div className="rounded-[1.5rem] bg-bg-alt p-3 sm:p-4 min-h-[420px] sm:min-h-[480px]">
          {/* WA header */}
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
            <div className="h-9 w-9 rounded-full bg-accent text-bg flex items-center justify-center text-sm font-bold">
              S
            </div>
            <div>
              <p className="text-[13px] font-medium text-text leading-tight">
                Asistente Sintergia
              </p>
              <p className="text-[10px] font-mono tracking-wider text-success">
                ● EN LÍNEA
              </p>
            </div>
          </div>

          {/* Messages staggered */}
          <div className="mt-4 flex flex-col gap-2">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.4 }}
                className={`flex ${m.side === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-2xl px-3 py-1.5 text-[12.5px] leading-[1.35]",
                    m.side === "me"
                      ? "bg-accent text-bg rounded-br-sm"
                      : "bg-white/8 border border-white/8 text-text rounded-bl-sm",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {/* typing dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + messages.length * 0.4 + 0.2 }}
              className="flex items-center gap-1 px-1 text-text-muted font-mono text-[10px]"
            >
              <span className="inline-flex gap-0.5">
                <span className="h-1 w-1 rounded-full bg-text-muted animate-bounce" />
                <span className="h-1 w-1 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
                <span className="h-1 w-1 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
              </span>
              respondiendo…
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Sidecards solo desktop — superpuestas sobre el phone */}
      <SideCards />
    </div>
  );
}

function SideCards() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="hidden lg:flex absolute -right-12 top-6 w-60 items-start gap-2 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-md p-3 shadow-xl shadow-accent/10 animate-float"
      >
        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
            ● Nuevo lead · hace 2 min
          </p>
          <p className="mt-1 text-[13px] text-text font-medium">
            Carlos M. — consultorio odontología
          </p>
          <p className="text-[11px] text-text-muted">Calificado · derivado</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="hidden lg:flex absolute -right-16 top-1/2 w-56 items-start gap-2 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-md p-3 shadow-xl shadow-success/10 animate-float-delayed"
      >
        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-success" />
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-success">
            ✓ Cita agendada
          </p>
          <p className="mt-1 text-[13px] text-text font-medium">
            Sáb 10/05 · 10:00 hs
          </p>
          <p className="text-[11px] text-text-muted">Sync · Google Calendar</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="hidden lg:block absolute -right-10 bottom-2 w-52 rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-md p-3 shadow-xl shadow-accent-2/10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
          ◇ Hoy
        </p>
        <div className="mt-2 flex justify-between text-[12px]">
          <span className="text-text-muted">Mensajes</span>
          <span className="font-medium text-text">147</span>
        </div>
        <div className="mt-1 flex justify-between text-[12px]">
          <span className="text-text-muted">Resueltos</span>
          <span className="font-medium text-accent">139 · 94%</span>
        </div>
      </motion.div>
    </>
  );
}
