"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chat from "./Chat";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Widget de chat flotante mobile-first.
 *
 * - Burbuja fija bottom-right siempre visible (no espera scroll).
 * - Speech bubble visible siempre que invita a hablar con el agente
 *   (dismissible con X, no persiste entre reloads).
 * - Click expande:
 *    · Mobile: bottom-sheet ~85vh con backdrop blur, slide-up.
 *    · Desktop: panel 380×580 fixed bottom-right, scale+fade.
 * - Reutiliza <Chat variant="embedded" /> (misma lógica Groq + tag JSON).
 * - ESC para cerrar. Backdrop click para cerrar (mobile).
 * - Body scroll-lock cuando abierto en mobile.
 * - Touch targets ≥56px. iOS safe-area.
 */
export default function FloatingChatWidget({ open, onOpenChange }: Props) {
  // El "bocadillo" invita a hablar con el agente. Si el usuario lo descarta,
  // queda solo la burbuja por el resto de la sesión.
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  // ESC cierra
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  // Lock body scroll en mobile cuando está abierto
  useEffect(() => {
    if (!open) return;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* ── Speech bubble teaser (visible siempre que chat esté cerrado) ─ */}
      <AnimatePresence>
        {!open && !teaserDismissed && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 24, delay: 1.5 }}
            className="fixed right-4 sm:right-6 z-50 max-w-[260px] sm:max-w-[280px]"
            style={{
              bottom: "calc(5.5rem + var(--safe-bottom))",
            }}
          >
            <button
              type="button"
              onClick={() => onOpenChange(true)}
              className="group relative w-full text-left rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-md p-3 sm:p-3.5 pr-9 shadow-xl shadow-accent/10 hover:shadow-accent/30 hover:border-accent/40 transition-all"
              aria-label="Abrir chat con el asistente"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                ● Asistente Sintergia
              </p>
              <p className="mt-1 text-[13px] sm:text-[13.5px] leading-snug text-text">
                <span className="hidden sm:inline">
                  ¿Tenés dudas? Habla con nuestro agente.
                </span>
                <span className="sm:hidden">
                  ¿Dudas? Habla con el agente.
                </span>
              </p>
              {/* Cola del bocadillo apuntando a la burbuja */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 right-7 sm:right-9 h-3 w-3 rotate-45 bg-surface border-r border-b border-white/10"
              />
            </button>
            {/* X dismiss */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTeaserDismissed(true);
              }}
              className="absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center rounded-full text-text-muted hover:text-text hover:bg-white/5 transition-colors"
              aria-label="Cerrar mensaje del agente"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Burbuja flotante (botón cerrado) ────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="bubble"
            type="button"
            onClick={() => onOpenChange(true)}
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 40 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="fixed right-4 sm:right-6 z-50 group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/40 hover:scale-110 hover:shadow-2xl hover:shadow-accent/60 transition-transform"
            style={{ bottom: "calc(1.5rem + var(--safe-bottom))" }}
            aria-label="Abrir chat con el asistente"
          >
            {/* Pulso constante */}
            <span className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-60" />

            {/* Icono chat-bubble */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            {/* Dot online */}
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 h-3 w-3 rounded-full bg-success ring-2 ring-bg" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Panel expandido ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop solo en mobile */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm sm:hidden"
              aria-hidden="true"
            />

            {/* Panel: bottom-sheet en mobile, panel en desktop */}
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Chat con el asistente de Sintergia"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className={[
                // Mobile: bottom-sheet full-width
                "fixed left-0 right-0 z-50 flex flex-col",
                "h-[85svh] sm:h-auto sm:max-h-[640px]",
                "rounded-t-2xl sm:rounded-2xl",
                // Desktop: panel anclado bottom-right
                "sm:left-auto sm:right-6 sm:w-[380px]",
                // Estética
                "bg-bg-alt border border-white/10 shadow-2xl shadow-accent/10 overflow-hidden",
              ].join(" ")}
              style={{
                bottom: 0,
                paddingBottom: "var(--safe-bottom)",
              }}
            >
              {/* Header del widget */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-accent/15 to-transparent">
                {/* Drag handle visual en mobile */}
                <span
                  aria-hidden="true"
                  className="sm:hidden absolute left-1/2 -translate-x-1/2 top-1.5 h-1 w-10 rounded-full bg-white/20"
                />

                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-accent text-bg flex items-center justify-center text-sm font-bold">
                    S
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-bg-alt" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text leading-tight">
                    Asistente Sintergia
                  </p>
                  <p className="text-[11px] text-success font-mono tracking-wider">
                    ● EN LÍNEA · RESPONDE AL INSTANTE
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-full text-text-muted hover:text-text hover:bg-white/5 transition-colors"
                  aria-label="Cerrar chat"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Cuerpo: Chat embebido */}
              <div className="flex-1 min-h-0 flex flex-col">
                <Chat variant="embedded" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
