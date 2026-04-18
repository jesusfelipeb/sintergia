import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICIOS = [
  {
    title: "Sitios Web & Landings",
    description: "Si no tiene presencia online, creamos desde cero sitios rápidos y persuasivos para captar clientes desde el primer día.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "E-commerce",
    description: "Tiendas online enfocadas en conversión desarrolladas en Tiendanube y Shopify, integrables con su futuro agente inteligente.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    title: "Automatizaciones",
    description: "Conectamos sus herramientas actuales para que facturen, respondan y sincronicen ventas sin intervención humana.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function OtrosServicios() {
  return (
    <Section id="ecosistema" alt className="border-t border-border/40 relative overflow-hidden">
      {/* Luz ambiental sutil en el fondo */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

      <SectionHeading 
        title="Más allá de los Bots: Un Ecosistema" 
        subtitle="Sintergia es su partner tecnológico. Si aún no cuenta con la infraestructura digital base, empezamos por acompañarlo ahí." 
      />
      <div className="grid gap-6 md:grid-cols-3 mt-4 relative z-10">
        {SERVICIOS.map((s, idx) => (
          <div key={idx} className="group flex flex-col items-start p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl group-hover:bg-purple-500/10 group-hover:text-purple-500 transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-primary">{s.title}</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
