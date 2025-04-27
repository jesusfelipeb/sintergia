'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Code, Bot, Globe, CheckCircle } from 'lucide-react';
import { useFetchProyectos } from './hooks/useFetchProyectos';
import { useFetchYoutubeVideos } from './hooks/useFetchYoutubeVideos';
import ContactForm from "./componentes/ContactForm";





// 🎨 Paleta de colores Sintergia:
// Primary: Indigo-600 | Secondary: Emerald-500 | Neutral: Gray-800 | Accent: Sky-500


// 🚀 Mejora: Hero más atractivo y con mejor responsividad
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
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-8 md:py-16">
      {/* Preloader para imagen de fondo con prioridad alta */}
      <div className="absolute inset-0 -z-10">
        {/* Overlay mejorado con gradiente para mejor legibilidad en todos los dispositivos */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10"></div>
        
        {/* Imagen optimizada para mobile-first */}
        <picture>
          {/* Versión mobile - más ligera */}
          <source 
            media="(max-width: 640px)" 
            srcSet="/fondohero-mobile.jpg" 
          />
          {/* Versión desktop */}
          <Image
            src="/fondohero.jpg"
            alt="Soluciones digitales innovadoras para tu negocio - Sintergia Studio"
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/..."
            sizes="100vw"
          />
        </picture>
      </div>

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
              className="animate-pulse-slow"
            />
          </div>

          {/* Título principal con tamaño ajustado para mobile */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 
                         leading-normal pt-4 pb-1 bg-gradient-to-r from-yellow-200 to-orange-500 
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
          <div className="h-1 w-16 sm:w-24 bg-indigo-400 mx-auto mt-2 mb-6 transition-all duration-700 ease-out" 
               style={{ width: isVisible ? '6rem' : '0' }}
          />

          {/* Texto descriptivo optimizado y más persuasivo */}
          <p className="text-base sm:text-lg md:text-xl text-indigo-50 max-w-xl md:max-w-2xl mb-8 md:mb-10 px-4">
            Transformamos ideas innovadoras en <span className="font-semibold">soluciones rentables</span> con tecnología de vanguardia adaptada a tus necesidades
          </p>

          {/* Contenedor de CTA con badge de "Consulta Gratis" */}
          <div className="relative">
            {/* Badge de oferta */}
            <div className="absolute -top-6 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full transform rotate-12 animate-bounce-slow">
              Consulta Inicial Gratis
            </div>
            
            {/* Botón CTA con mejor contraste y llamada a la acción clara */}
            <Link
              href="#contact"
              id="hero-cta"
              className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 sm:px-8 md:px-10 py-4 rounded-lg text-base sm:text-lg md:text-xl font-bold shadow-lg hover:shadow-xl hover:from-indigo-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105 transform"
              aria-label="Solicitar consulta para tu proyecto digital"
            >
              ¡Impulsa tu proyecto ahora!
            </Link>
          </div>

          {/* Social proof / Testimonios breves (opcional) */}
          <div className="mt-8 text-sm text-gray-300 flex items-center gap-2">
            <span>⭐⭐⭐⭐⭐</span>
            <span>Más de 50 proyectos exitosos</span>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// 🚀 Mejora: Sección de Servicios
function Services() {
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
      linkHref: "@/services" // Ruta específica de la página de detalles
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
      linkHref: "@/services" // Ruta específica (incluso si está próximo)
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
      linkHref: "@/services" // Ruta específica
    }
  ];

  // URL base para el enlace de WhatsApp con mensaje prellenado
  // Reemplaza 'CODIGOPAISNUMEROWHATSAPP' con tu número real
  const whatsappBaseUrl = "https://wa.me/541132924310?text=Hola%2C%20quiero%20cotizar%20el%20servicio%20de%20";


  return (
    // Sección principal con ID para navegación, padding vertical, altura mínima y flexbox para centrado (si aplica)
    <section id="services" className="relative py-16 md:py-20 min-h-screen flex items-center">
      {/* Fondo con overlay y imagen */}
      <div className="absolute inset-0 -z-10">
        {/* Overlay con gradiente semi-transparente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10"></div>
        {/* Imagen de fondo con optimización de Next.js */}
        <Image
          src="/fondo3.jpg" // Asegúrate que la ruta sea correcta en /public
          alt="Fondo de servicios de Sintergia Studio"
          width={1920} // Dimensiones intrínsecas de la imagen
          height={1080}
          className="object-cover w-full h-full" // Asegura que la imagen cubra el área
          priority // Prioridad de carga
        />
      </div>

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
                  swiperRef.current.swiper.slideTo(index);
                }}
                aria-label={`Ver servicio ${service.title}`} // Atributo de accesibilidad
              >
                {/* Icono del servicio (siempre visible, opacidad ajustada) */}
                <span className={`${activeIndex === index ? 'opacity-100' : 'opacity-70'} text-white`}>
                  {service.icon}
                </span>
                {/* Título del servicio (visible solo en el indicador activo) */}
                <span className={`ml-2 ${activeIndex === index ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden transition-all text-white whitespace-nowrap`}> {/* w-auto vs w-0 para transición de ancho */}
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
              effect="slide" // Efecto de transición (puedes probar "fade" si importas EffectFade)
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
                  {/* Fondo con gradiente, blur y borde transparente */}
                  <div className={`h-full w-full rounded-xl p-8 bg-gradient-to-br ${service.bgColor} backdrop-blur-sm border border-white/10 flex flex-col`}>
                    {/* Encabezado del slide (Icono y Título) */}
                    <div className="flex items-center mb-6">
                      {/* Contenedor del icono */}
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
                    <div className="mb-8 flex-grow"> {/* flex-grow para ocupar espacio disponible y empujar el CTA hacia abajo */}
                      {/* Título de Beneficios */}
                      <h4 className="text-white text-xl mb-4 font-medium">Lo que ofrecemos:</h4>
                      {/* Grid para mostrar los beneficios */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, index) => (
                          // Item de Beneficio
                          <div key={index} className="flex items-start text-gray-200">
                            {/* Icono de Check */}
                            <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-400" />
                            {/* Texto del beneficio */}
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Área de Botones (Ver detalles y CTA) */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto "> {/* mt-auto empuja al final */}
                      {/* Botón "Ver detalles" (Link a la página de servicios) */}
                      {/* Añadido cursor-pointer explícitamente aunque debería tenerlo por defecto */}
                      <Link
                        href={service.comingSoon ? "/services" : service.linkHref} // Redirige a /services o la ruta específica
                        className={`flex-1 inline-flex cursor-pointer items-center justify-center px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all group`}
                        // Si es "Próximamente", deshabilita la interacción visualmente
                        aria-disabled={service.comingSoon} // Atributo de accesibilidad para deshabilitar
                        tabIndex={service.comingSoon ? -1 : 0} // Evita que sea enfocable si está deshabilitado
                        
                      >
                        <span>{service.comingSoon ? "Próximamente" : "Ver detalles"}</span> {/* Cambia el texto si es Próximamente */}
                         {/* Opcional: Icono de flecha para indicar acción */}
                         {/* <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /> */}
                      </Link>
                      {/* Botón CTA de WhatsApp */}
                      {/* Se mantiene como enlace a WhatsApp */}
                      <a
                        href={`${whatsappBaseUrl}${encodeURIComponent(service.title)}`} // Enlace a WhatsApp con título del servicio
                        target="_blank" // Abre en nueva pestaña
                        rel="noopener noreferrer" // Seguridad al abrir en nueva pestaña
                        className={`flex-1 inline-flex items-center justify-center px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold transition-all cursor-pointer`} // cursor-pointer explícito
                      >
                        <span>{service.cta}</span> {/* Texto del CTA */}
                        {/* Icono de flecha para indicar acción */}
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
        <div className="mt-0 text-center">
          <h3 className="text-2xl text-white mb-6 font-medium">Tecnologías con las que trabajamos</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              {name: 'NextJS', logo: '/tech/nextjs.svg'}, // Considera usar el campo logo
              {name: 'React', logo: '/tech/react.svg'},
              {name: 'Node.js', logo: '/tech/nodejs.svg'},
              {name: 'Python', logo: '/tech/python.svg'},
              {name: 'TailwindCSS', logo: '/tech/tailwind.svg'},
              // Añade más tecnologías aquí
            ].map((tech) => (
              // Item de tecnología
              <div key={tech.name} className="px-5 py-3 bg-white/10 hover:bg-white/15 rounded-lg text-white flex items-center">
                {/* Aquí puedes renderizar la imagen del logo si la agregas al objeto tech */}
                {/* <Image src={tech.logo} alt={`${tech.name} Logo`} width={24} height={24} className="mr-2" /> */}
                {tech.name} {/* Muestra el nombre de la tecnología */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



// 🚀 Sección de Portafolio

function Portfolio({ limit }) {
  const { proyectos, loading, error } = useFetchProyectos();

  if (loading) return <p className="text-center py-8">Cargando proyectos...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  const proyectosFiltrados = limit ? proyectos.slice(0, limit) : proyectos;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Nuestro Portafolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {proyectosFiltrados.map((proyecto) => (
            <div key={proyecto.id} className="bg-indigo-50 p-8 rounded-lg shadow-md text-center">
            {proyecto.imagen && (
              <img
                src={proyecto.imagen}
                alt={proyecto.titulo}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
              {proyecto.titulo}
            </h3>
            <p className="text-gray-600">{proyecto.descripcion}</p>
            {proyecto.enlace && (
              <a
                href={proyecto.enlace}
                className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300 mt-4 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver más
              </a>
            )}
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Seccion Educacion

function Educacion() {
  const channelId = 'UCwkp8tP064mnL6t1yZ-m8og'; // Reemplaza con tu canal
  const { videos, loading, error } = useFetchYoutubeVideos(channelId, 3);

  if (loading) return <p>Cargando videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section id="educacion" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Aprendamos Juntos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => {
              const videoId = video.id.videoId; // Viene en la respuesta
              const titulo  = video.snippet.title;
              const cover   = video.snippet.thumbnails.medium.url;

              return (
                <div key={videoId} className="bg-indigo-50 p-4 rounded shadow-md text-center">
                  
                  <h3 className="text-indigo-600 font-semibold mb-2">{titulo}</h3>
                  {/* iframe para reproducir video */}
                  <iframe
                    className="w-full h-48"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            })}
          </div>
          {/* Enlace a la página con todos los videos */}
          <div className="text-center mt-8">
            <a
              href="/educacion" // Ruta a la otra página
              className="inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
              Ver todos los videos
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

// Seccion Contacto

function Contacto() {
  return (
    <section id="contacto">
        <ContactForm />
      </section>
  )
}


// 🚀 Mejora: Manejo de errores y mejoras en la llamada a Django
function DjangoMessage({ message }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-indigo-50 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestro compromiso</h2>
          <p className="text-lg text-gray-600 italic">
            {message || "Cargando última actualización..."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/home/');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setMessage('Actualmente optimizando nuestros servicios - ¡Vuelve pronto!');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        <Hero />
        <Services /> {/* Aquí comienza la sección de servicios */}
        <Portfolio /> {/* Aquí comienza la sección de portafolio */}
        <Educacion />  {/* Aquí comienza la sección de videos */}
        <Contacto />  {/* Aquí comienza la sección de contacto */}
        {/* <DjangoMessage message={message} /> */}
      </main>
      
    </div>
  );
}


