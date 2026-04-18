import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const PROBLEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: "El teléfono no para de sonar",
    description:
      "Usted o su equipo pasan horas respondiendo las mismas preguntas: horarios, precios, disponibilidad. Tiempo que debería estar en lo que importa.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Las citas se pierden",
    description:
      "Clientes que llaman fuera de horario, mensajes que quedan sin leer, turnos que se cruzan. Cada cita perdida es dinero que se va.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Las mismas 5 preguntas, 20 veces al día",
    description:
      "\"¿Cuánto cuesta?\", \"¿Tienen turno?\", \"¿Dónde quedan?\". Su equipo las responde manualmente una y otra vez. Un bot las resuelve al instante.",
  },
];

export default function Problema() {
  return (
    <Section id="problema" alt>
      <SectionHeading
        title="¿Le suena familiar?"
        subtitle="Estos problemas le cuestan tiempo y clientes todos los días."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {PROBLEMS.map((p) => (
          <div
            key={p.title}
            className="group flex flex-col items-start gap-4 rounded-2xl bg-white/5 backdrop-blur-md p-6 border border-white/10 hover:border-cyan-500/30 hover:shadow-[0_8px_30px_rgba(0,184,216,0.15)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
              {p.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-primary">
              {p.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
