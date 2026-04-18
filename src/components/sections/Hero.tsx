import Image from "next/image";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative px-4 pt-24 pb-16 md:pt-32 md:pb-24 bg-bg overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Columna Izquierda: Texto y CTA */}
        <div className="text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Su negocio atendiendo
            <span className="text-accent block mt-1"> mientras usted descansa</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
            Bots de WhatsApp con inteligencia artificial que responden consultas,
            agendan citas y venden por usted. Las 24 horas, los 7 días.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href={whatsappLink("Hola, quiero saber cómo un bot puede ayudar a mi negocio")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shadow-lg shadow-primary/20"
            >
              Obtener mi Bot
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              href="#agente"
              className="w-full sm:w-auto"
            >
              Pruebe el agente
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-xs font-medium text-text-muted">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sin contratos
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Resultados 1ª semana
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Setup en 48hs
            </div>
          </div>
        </div>

        {/* Columna Derecha: Imagen e impacto visual */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none mt-8 lg:mt-0">
          {/* Fondo difuminado decorativo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-primary/10 to-accent/20 rounded-3xl blur-3xl transform rotate-3 scale-105"></div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
            <Image
              src="/hero.png"
              alt="AI Assistant en smartphone"
              width={800}
              height={600}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Overlay sutil para mejorar la legibilidad de elementos flotantes si cruzaran */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent mix-blend-multiply opacity-20"></div>
          </div>

          {/* Notificaciones flotantes (Glassmorphism) */}
          <div 
            className="hidden sm:flex absolute -left-6 top-1/4 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl shadow-accent/10 rounded-2xl p-3 items-center gap-3 w-48 animate-float z-20"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-primary">Nuevo Lead</p>
              <p className="text-[10px] text-text-muted">Hace 2 min</p>
            </div>
          </div>

          <div 
            className="hidden sm:flex absolute -right-8 top-2/3 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl shadow-purple-500/15 rounded-2xl p-3 items-center gap-3 w-48 animate-float-delayed z-20"
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-500 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-primary">Cita Agendada</p>
              <p className="text-[10px] text-text-muted">Automático</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
