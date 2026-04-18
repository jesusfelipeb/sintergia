"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Planes", href: "#planes" },
  { label: "Agente", href: "#agente" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 h-14">
        <a href="#" className="font-display text-xl font-bold text-accent tracking-wide flex items-center gap-2">
          {/* Espacio para estampar el SVG/PNG del Logo Ciber-Cubo */}
          <div className="w-6 h-6 bg-accent rounded-sm opacity-80" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")' }}></div>
          Sintergia
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink("Hola, quiero saber más sobre Sintergia")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-dark transition-colors"
          >
            Contáctenos
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-text-muted"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18" /><path d="M6 6l12 12" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12h16" /><path d="M4 6h16" /><path d="M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-bg px-4 pb-4 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-text-muted hover:text-accent border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink("Hola, quiero saber más sobre Sintergia")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-full bg-accent text-bg shadow-lg shadow-accent/10"
          >
            Contáctenos
          </a>
        </div>
      )}
    </nav>
  );
}
