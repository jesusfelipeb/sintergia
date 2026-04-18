import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TIERS, whatsappLink } from "@/lib/constants";

export default function Planes() {
  return (
    <Section id="planes">
      <SectionHeading
        title="Planes a su medida"
        subtitle="Setup único + mantenimiento mensual. Sin contratos de permanencia."
      />
      <div className="text-center max-w-lg mx-auto mb-10 -mt-2">
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Limitamos el onboard a 3 negocios por mes para garantizar calidad.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.slug}
            className={`relative flex flex-col rounded-2xl border p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 ${
              tier.popular
                ? "border-accent bg-white/10 shadow-lg shadow-accent/20 ring-1 ring-accent/30"
                : "border-white/10 bg-white/5"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-accent text-white">
                Más elegido
              </span>
            )}

            <h3 className="font-display text-xl font-semibold text-primary">
              {tier.name}
            </h3>

            <div className="mt-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                {tier.price}
              </span>
              <span className="text-sm text-text-muted ml-1">setup</span>
              <p className="text-sm text-text-muted mt-1">
                + {tier.monthly} mantenimiento
              </p>
            </div>

            <ul className="flex-1 space-y-2.5 mb-6">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-text-muted"
                >
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
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.popular ? "primary" : "ghost"}
              href={whatsappLink(
                `Hola, me interesa el plan ${tier.name} de Sintergia`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center"
            >
              Contáctenos
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
