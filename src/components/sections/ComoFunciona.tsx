import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    step: "01",
    title: "Nos cuenta su negocio",
    description:
      "Conversamos por WhatsApp o videollamada. Entendemos qué hace, quiénes son sus clientes y qué preguntas le hacen siempre.",
  },
  {
    step: "02",
    title: "Armamos su bot",
    description:
      "Diseñamos y programamos un asistente a medida. En 1-2 semanas tiene un bot listo para probar antes de activarlo.",
  },
  {
    step: "03",
    title: "Lo conectamos y acompañamos",
    description:
      "Activamos el bot en su WhatsApp. Lo acompañamos el primer mes y seguimos mejorándolo con cada interacción.",
  },
];

export default function ComoFunciona() {
  return (
    <Section id="servicios">
      <SectionHeading
        title="Así de simple funciona"
        subtitle="De la conversación inicial al bot funcionando, en menos de dos semanas."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.step} className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 hover:backdrop-blur-md hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all duration-300">
            <span className="font-display text-5xl md:text-6xl font-bold text-border group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-accent transition-all duration-500">
              {s.step}
            </span>
            <h3 className="font-display text-lg font-semibold text-primary -mt-2">
              {s.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
