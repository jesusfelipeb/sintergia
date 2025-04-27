// componentes/Hero.jsx
'use client'; // Este componente usa hooks de React que requieren el cliente

import { useEffect, useState, useRef } from 'react'; // Importa hooks si se usan en el componente
import Link from 'next/link'; // Importa Link si se usa en el componente
import Image from 'next/image'; // Importa Image si se usa en el componente
import { ArrowRight } from 'lucide-react'; // Importa solo los iconos que se usan AQUI


function Hero() {
  // Estado para controlar la aparición de elementos cuando están en viewport
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para activar la animación después de que la página cargue
  useEffect(() => {
    setIsVisible(true);

    // Opcional: Seguimiento de conversión para el CTA
    const ctaButton = document.getElementById('hero-cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        // Aquí podrías implementar Analytics (ejemplo: GA4)
        console.log('CTA clicked');
      });
    }
    // Cleanup: Eliminar el event listener al desmontar el componente
    return () => {
      if (ctaButton) {
        ctaButton.removeEventListener('click', () => {
           console.log('CTA clicked'); // La función debe ser la misma para removerla
        });
      }
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-8 md:py-16 border-gray-500 border-b-2 ">
      {/* Preloader para imagen de fondo con prioridad alta */}
      

      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className={`flex flex-col items-center text-center transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Logo pequeño (opcional) */}
          <div className="w-16 h-16 mb-4 md:mb-6">
            <Image
              src="/logo.png"
              alt="Sintergia Logo"
              width={64}
              height={64}
              className="animate-pulse-slow" // Asegúrate de que animate-pulse-slow esté en tus estilos globales/tailwind.config.js
            />
          </div>

          {/* Título principal con tamaño ajustado para mobile */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6
                         leading-normal pt-4 pb-1 bg-gradient-to-r from-teal-200 to-purple-700
                         bg-clip-text text-transparent">
            Sintergia Studio
          </h1>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 md:mb-3">
            Soluciones Digitales
          </p>

          {/* Especialidad */}
          <p className="text-base sm:text-lg md:text-xl text-cyan-100 font-medium tracking-wide mb-3 md:mb-4">
            Desarrollo Web & Inteligencia Artificial
          </p>

          {/* Línea decorativa con animación mejorada */}
          {/* La animación de ancho por estilo con estado isVisible requiere 'use client' */}
          <div className="h-1 w-16 sm:w-24 bg-indigo-400 mx-auto mt-2 mb-6 transition-all duration-700 ease-out"
               style={{ width: isVisible ? '6rem' : '0' }} // 6rem es el ancho de w-24 en Tailwind por defecto (16*0.25rem = 4rem, 24*0.25rem = 6rem)
          />

          {/* Texto descriptivo optimizado y más persuasivo */}
          <p className="text-base sm:text-lg md:text-xl text-indigo-50 max-w-xl md:max-w-2xl mb-8 md:mb-10 px-4">
            Transformamos ideas innovadoras en <span className="font-semibold">soluciones rentables</span> con tecnología de vanguardia adaptada a tus necesidades
          </p>

          {/* Contenedor de CTA con badge de "Consulta Gratis" */}
          <div className="relative">
            

            {/* Botón CTA con mejor contraste y llamada a la acción clara */}
            <Link
              href="#contact" // Enlace a la sección de contacto (usando el id="#contact")
              id="hero-cta" // ID para seguimiento opcional en useEffect
              className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 sm:px-8 md:px-10 py-4 rounded-lg text-base sm:text-lg md:text-xl font-bold shadow-lg hover:shadow-xl hover:from-indigo-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105 transform"
              aria-label="Solicitar consulta para tu proyecto digital" // Mejora de accesibilidad
            >
              ¡Impulsa tu proyecto ahora!
            </Link>
          </div>

          {/* Social proof / Testimonios breves (opcional) */}
          <div className="mt-8 text-sm text-gray-300 flex items-center gap-2">
            <span>⭐⭐⭐⭐⭐</span> {/* Considera usar un componente de estrellas SVG si lo necesitas */}
            <span>Proyectos exitosos</span>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"> {/* Asegúrate de que animate-bounce esté definido */}
        <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero; // Exporta el componente