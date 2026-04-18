import { whatsappLink } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg-alt/30 text-text-muted px-4 py-12 relative overflow-hidden">
      {/* Sutil glow cian en el footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-24 bg-accent/10 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
          <span className="font-display text-xl font-bold text-primary flex items-center gap-2">
            <div className="w-5 h-5 bg-accent rounded-sm opacity-80" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")' }}></div>
            Sintergia
          </span>
          <p className="text-xs text-text-muted/80">
            Bots y automatizaciones para su negocio.
          </p>
        </div>

        <a
          href={whatsappLink("Hola, quiero saber más sobre Sintergia")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Contáctenos por WhatsApp
        </a>

        <p className="text-xs text-text-muted/50">
          &copy; {year} Sintergia Studio
        </p>
      </div>
    </footer>
  );
}
