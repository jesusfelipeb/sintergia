'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimeBackground from './componentes/AnimeBackground';
import { useFetchProyectos } from './hooks/useFetchProyectos';
import { useFetchYoutubeVideos } from './hooks/useFetchYoutubeVideos';
import ContactForm from "./componentes/ContactForm";
import Lottie from 'lottie-react';
import webAnimation from '../../public/dev.json';
import financeAnimation from '../../public/finance.json';
import techAnimation from '../../public/ia.json';




// 🎨 Paleta de colores Sintergia:
// Primary: Indigo-600 | Secondary: Emerald-500 | Neutral: Gray-800 | Accent: Sky-500


// 🚀 Mejora: Hero más atractivo y con mejor responsividad
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <div className="absolute bg-black inset-0 z-0 w-full h-full">
        <AnimeBackground />
             
      </div>

      {/* Contenido centrado */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Título principal con animaciones */}
          <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mx-2 animate-gradient-x'>Sintergia Studio</h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight animate-fade-in-up">
            <span className="block text-[#f8fafc] mb-4 md:mb-6">
              Soluciones            
              Digitales              
            </span>
            
            <div className="space-y-2">
              <span className="block text-lg md:text-xl lg:text-2xl text-cyan-100 font-medium tracking-wide">
                Desarrollo Web & Inteligencia Artificial
              </span>
              <div className="h-1 w-24 bg-indigo-400 mx-auto animate-line-expand" />
            </div>
          </h2>

          {/* Texto descriptivo */}
          <p className="text-lg md:text-xl lg:text-2xl text-indigo-50 max-w-2xl mb-8 md:mb-12 px-4 animate-slide-up delay-100">
            Transformamos ideas innovadoras en realidades estratégicas con tecnología de vanguardia
          </p>

          {/* Botón CTA con animación */}
          <Link
            href="#contact"
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-10 py-5 rounded-xl text-lg md:text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-pulse-slow"
          >
            ¡Impulsa tu proyecto!
          </Link>
        </div>
      </div>
    </section>
  );
}

// 🚀 Mejora: Sección de Servicios
function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Nuestros Servicios
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Ofrecemos soluciones personalizadas para ayudarte a lograr tus objetivos en el mundo digital.
        </p>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Desarrollo Web */}
          <Link href="/services" className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Desarrollo Web</h3>
            <div className="mb-4 mx-auto" style={{ width: '200px', height: '250px' }}>
              <Lottie
                animationData={webAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <p className="text-gray-600">
              Creamos páginas web innovadoras, eficientes y adaptadas a las necesidades de tu negocio.
            </p>
          </Link>

          {/* Educación Tecnológica */}
          <Link href="/services" className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Tecnología</h3>
            <div className="mb-4 mx-auto" style={{ width: '200px', height: '250px' }}>
              <Lottie
                animationData={techAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <p className="text-gray-600">
              Te impulsamos con tecnología, blockchain e inteligencia artificial para que estés siempre a la vanguardia.
            </p>
          </Link>


          {/* Educación Financiera */}
          <Link href="/services" className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Finanzas</h3>
            <div className="mb-4 mx-auto" style={{ width: '200px', height: '250px' }}>
              <Lottie
                animationData={financeAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <p className="text-gray-600">
              Te educamos en el mundo de las inversiones y la gestión financiera para maximizar tu rendimiento.
            </p>
          </Link>

          
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
                  <img src={cover} alt={titulo} className="mx-auto mb-2 w-full h-48 object-cover rounded"/>
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


