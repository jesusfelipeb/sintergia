import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const CASES = [
  {
    name: "Banana Express",
    type: "Verdulería — Palermo, Buenos Aires",
    challenge:
      "Recibían decenas de mensajes diarios con las mismas preguntas: disponibilidad de productos, horarios, y precios. El equipo perdía tiempo respondiendo manualmente.",
    solution:
      "Bot de WhatsApp que responde consultas de disponibilidad, horarios y pedidos de forma automática.",
    results: [
      "Reducción de llamadas repetitivas",
      "Equipo enfocado en atención presencial",
      "Atención 24/7 sin costo adicional",
    ],
    active: true,
  },
  {
    name: "[PILOTO — completar cuando se cierre]",
    type: "Próximo caso de éxito",
    challenge:
      "Profesional local que necesita automatizar la atención de su negocio.",
    solution: "En desarrollo.",
    results: ["Resultados próximamente"],
    active: false,
  },
];

export default function Casos() {
  return (
    <Section id="casos" alt>
      <SectionHeading
        title="Casos reales"
        subtitle="No vendemos promesas. Estos son negocios reales usando nuestras soluciones."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {CASES.map((c) => (
          <div
            key={c.name}
            className={`rounded-2xl border p-6 md:p-8 transition-all duration-300 ${
              c.active
                ? "bg-white/5 border-white/10"
                : "bg-transparent border-white/10 border-dashed opacity-60 grayscale hover:grayscale-0 hover:bg-white/5"
            }`}
          >
            <div className="mb-4">
              <h3 className="font-display text-xl font-semibold text-primary">
                {c.name}
              </h3>
              <p className="text-xs text-text-muted mt-1">{c.type}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-primary">Desafío: </span>
                <span className="text-text-muted">{c.challenge}</span>
              </div>
              <div>
                <span className="font-semibold text-primary">Solución: </span>
                <span className="text-text-muted">{c.solution}</span>
              </div>
              <div>
                <span className="font-semibold text-primary">Resultados:</span>
                <ul className="mt-2 space-y-1">
                  {c.results.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-text-muted">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-accent shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
