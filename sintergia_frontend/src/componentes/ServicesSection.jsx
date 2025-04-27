// componentes/ServicesSection.jsx
'use client'; // Este componente usa hooks de React y Swiper

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Importaciones de Swiper y sus módulos
import { Swiper, SwiperSlide } from 'swiper/react';
// Pagination y Autoplay para el carrusel
import { Pagination, Autoplay } from 'swiper/modules'; // Importa los módulos necesarios

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
// Importa estilos de efectos si los usas (por ejemplo, 'swiper/css/effect-fade')
// import 'swiper/css/effect-fade'; // Descomentar si cambias effect="slide" a "fade"

// Importa iconos (ajusta la ruta si no están en lucide-react)
import { Code, Bot, Globe, CheckCircle, ArrowRight } from 'lucide-react';


function ServicesSection() { // Renombrado a ServicesSection para claridad
  // Estado para controlar el índice del slide activo (para los indicadores)
  const [activeIndex, setActiveIndex] = useState(0);
  // Ref para acceder a la instancia de Swiper y controlar el cambio de slide desde los indicadores
  const swiperRef = useRef(null);

  // Datos de servicios: un array de objetos para definir cada servicio dinámicamente
  const services = [
    {
      id: 1,
      title: "Desarrollo Web",
      icon: <Code size={32} className="text-orange-500" />,
      description: "Creamos sitios web y aplicaciones a medida que convierten visitantes en clientes.",
      benefits: [
        "Diseño responsive optimizado para móviles",
        "Optimización SEO para mayor visibilidad",
        "Experiencia de usuario intuitiva",
        "Alto rendimiento y tiempos de carga rápidos"
      ],
      cta: "Cotizar Desarrollo Web", // CTA más específico
      color: "text-orange-600", // Color principal para el título del slide
      bgColor: "from-orange-500/20 to-transparent", // Degradado de fondo para el slide
      linkHref: "/services/desarrollo-web" // Ruta específica de la página de detalles
    },
    {
      id: 2,
      title: "Agentes de IA",
      icon: <Bot size={32} className="text-indigo-500" />,
      description: "Asistentes inteligentes que automatizan procesos y mejoran la atención al cliente.",
      benefits: [
        "Atención 24/7 con respuestas personalizadas",
        "Integración con tus sistemas existentes",
        "Aprendizaje continuo y mejora automática",
        "Incremento en satisfacción del cliente"
      ],
      cta: "Cotizar Agente IA", // CTA más específico
      color: "text-indigo-600",
      bgColor: "from-indigo-500/20 to-transparent",
      comingSoon: true, // Bandera para indicar que está próximo
      linkHref: "/services/agentes-ia" // Ruta específica (incluso si está próximo) - decide si esta ruta tiene una página de "próximamente" o similar
    },
    {
      id: 3,
      title: "Soluciones Digitales",
      icon: <Globe size={32} className="text-cyan-500" />,
      description: "Estrategias digitales completas adaptadas a los objetivos de tu negocio.",
      benefits: [
        "Análisis de necesidades y objetivos",
        "Implementación de tecnologías a medida",
        "Soporte técnico y mantenimiento continuo",
        "Escalabilidad según el crecimiento de tu negocio"
      ],
      cta: "Cotizar Solución Digital", // CTA más específico
      color: "text-cyan-600",
      bgColor: "from-cyan-500/20 to-transparent",
      linkHref: "/services/soluciones-digitales" // Ruta específica
    }
  ];

  // URL base para el enlace de WhatsApp con mensaje prellenado
  // **IMPORTANTE:** Reemplaza 'CODIGOPAISNUMEROWHATSAPP' con tu número real (ej: 54911...)
  const whatsappBaseUrl = "https://wa.me/541132924310?text=Hola%2C%20quiero%20cotizar%20el%20servicio%20de%20"; // Reemplaza con tu número


  return (
    // Sección principal con ID para navegación, padding vertical, altura mínima y flexbox para centrado (si aplica)
    <section id="services" className="relative py-16 md:py-20 min-h-screen flex items-center">
      
      {/* Contenedor principal del contenido con centrado y padding */}
      <div className="container mx-auto px-4 relative z-20">
        {/* Encabezado de la sección (Título y párrafo introductorio) */}
        <div className="text-center mb-12">
          {/* Título principal de la sección */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Nuestros Servicios
          </h2>
          {/* Párrafo descriptivo */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Soluciones tecnológicas avanzadas diseñadas para impulsar tu negocio en el mundo digital
          </p>
        </div>

        {/* Área del carrusel de servicios */}
        <div className="max-w-4xl mx-auto">
          {/* Indicadores personalizados (botones que controlan el slide activo) */}
          <div className="flex justify-center space-x-3 mb-8">
            {services.map((service, index) => (
              // Botón indicador
              <button
                key={`indicator-${service.id}`} // Key único
                // Clases dinámicas para resaltar el indicador activo
                className={`flex items-center transition-all duration-300 px-4 py-2 rounded-full cursor-pointer ${
                  activeIndex === index
                    ? `bg-white/20 border border-white/30 shadow-lg`
                    : `bg-white/5 hover:bg-white/10`
                }`}
                // Al hacer clic, desliza el carrusel al slide correspondiente
                onClick={() => {
                  if (swiperRef.current && swiperRef.current.swiper) {
                     swiperRef.current.swiper.slideTo(index);
                  }
                }}
                aria-label={`Ver servicio ${service.title}`} // Atributo de accesibilidad
              >
                {/* Icono del servicio (siempre visible, opacidad ajustada) */}
                <span className={`${activeIndex === index ? 'opacity-100' : 'opacity-70'} text-white`}>
                  {service.icon}
                </span>
                {/* Título del servicio (visible solo en el indicador activo) */}
                <span className={`ml-2 ${activeIndex === index ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden transition-all text-white whitespace-nowrap`}>
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          {/* Contenedor del Carrusel (Swiper) */}
          {/* Altura fija para permitir el scroll vertical */}
          <div className="h-[500px] sm:h-[450px] w-full"> {/* Ajusta la altura según necesites */}
            <Swiper
              ref={swiperRef} // Asigna la ref para control externo
              spaceBetween={30} // Espacio entre slides
              slidesPerView={1} // Muestra 1 slide a la vez
              modules={[Pagination, Autoplay]} // Módulos usados
              effect="slide" // Efecto de transición
              className="h-full w-full" // Asegura que Swiper ocupe el contenedor
              loop={true} // Habilita el bucle infinito
              autoplay={{ // Configuración de autoplay
                delay: 6000, // Tiempo entre slides
                disableOnInteraction: false, // No se detiene si el usuario interactúa
                pauseOnMouseEnter: true, // Pausa al pasar el ratón
              }}
              // Actualiza el estado del índice activo al cambiar de slide
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {/* Mapea el array de servicios para crear un SwiperSlide por cada uno */}
              {services.map((service) => (
                <SwiperSlide key={service.id}>
                  {/* Contenido de cada slide del servicio */}
                  <div className={`h-full w-full rounded-xl p-8 bg-gradient-to-br ${service.bgColor} backdrop-blur-sm border border-white/10 flex flex-col`}>
                    {/* Encabezado del slide (Icono y Título) */}
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-lg bg-white/10 mr-5">
                        {service.icon} {/* Icono del servicio */}
                      </div>
                      <div>
                        {/* Título del servicio en el slide */}
                        <h3 className={`text-4xl sm:text-5xl font-bold ${service.color}`}>
                          {service.title}
                        </h3>
                        {/* Indicador "Próximamente" si aplica */}
                        {service.comingSoon && (
                          <span className="mt-1 inline-block text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                            Próximamente
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Descripción del servicio */}
                    <p className="text-white text-xl mb-8">
                      {service.description}
                    </p>

                    {/* Sección de Beneficios */}
                    <div className="mb-8 flex-grow">
                      <h4 className="text-white text-xl mb-4 font-medium">Lo que ofrecemos:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start text-gray-200">
                            <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-400" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Área de Botones (Ver detalles y CTA) */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto ">
                      {/* Botón "Ver detalles" (Link a la página de servicios) */}
                      <Link
                        href={service.comingSoon ? "/services" : service.linkHref} // Decide si la ruta "/services" para "Próximamente" es correcta
                        className={`flex-1 inline-flex cursor-pointer items-center justify-center px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all group ${service.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`} // Añadido clases para deshabilitar visualmente y cambiar cursor
                        aria-disabled={service.comingSoon} // Atributo de accesibilidad
                        tabIndex={service.comingSoon ? -1 : 0} // Evita que sea enfocable
                         onClick={(e) => { // Previene la navegación y detiene propagación si es Próximamente
                           if (service.comingSoon) {
                             e.preventDefault();
                             e.stopPropagation(); // Detiene propagación incluso si se previene el default
                           } else {
                             e.stopPropagation(); // Detiene propagación para clics normales
                           }
                         }}
                      >
                        <span>{service.comingSoon ? "Próximamente" : "Ver detalles"}</span>
                      </Link>
                      {/* Botón CTA de WhatsApp (Enlace <a>) */}
                      <a
                        href={`${whatsappBaseUrl}${encodeURIComponent(service.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 inline-flex items-center justify-center px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold transition-all cursor-pointer`}
                        onClick={(e) => {
                           e.stopPropagation(); // Detiene la propagación para el enlace de WhatsApp
                        }}
                      >
                        <span>{service.cta}</span>
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Contador de servicios */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              <span className="text-xl font-medium text-white">{activeIndex + 1}</span>
              <span className="mx-2">/</span>
              <span>{services.length}</span>
            </p>
          </div>
        </div>

        {/* Sección de tecnologías */}
        <div className="mt-20 text-center"> {/* Ajustado margen top */}
          <h3 className="text-2xl text-white mb-6 font-medium">Tecnologías con las que trabajamos</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              {name: 'NextJS', logo: '/tech/nextjs.svg'},
              {name: 'React', logo: '/tech/react.svg'},
              {name: 'Node.js', logo: '/tech/nodejs.svg'},
              {name: 'Python', logo: '/tech/python.svg'},
              {name: 'TailwindCSS', logo: '/tech/tailwind.svg'},
            ].map((tech) => (
              <div key={tech.name} className="px-5 py-3 bg-white/10 hover:bg-white/15 rounded-lg text-white flex items-center">
                {/* Considera renderizar logos aquí */}
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection; // Exporta el componente