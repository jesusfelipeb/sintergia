// componentes/PortfolioSection.jsx
'use client'; // Usa useFetchProyectos que puede usar useEffect/useState

import Image from 'next/image'; // Si tus imágenes de proyecto son con next/image


// Importa tu hook personalizado
import { useFetchProyectos } from '../app/hooks/useFetchProyectos'; // Ajusta la ruta si es necesario

function PortfolioSection({ limit }) { // Renombrado y acepta un prop limit
  const { proyectos, loading, error } = useFetchProyectos();

  if (loading) return <p className="text-center py-8">Cargando proyectos...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  // Aplica el límite si se proporciona
  const proyectosFiltrados = limit ? proyectos.slice(0, limit) : proyectos;

  return (
    <section id="portfolio" className="py-16 "> {/* Añadido ID */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 pb-6 text-center text-white">
          Nuestro Portafolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {proyectosFiltrados.map((proyecto) => (
            <div key={proyecto.id} className="backdrop-blur-md bg-opacity-25 bg-gray-500 border border-white/10  p-8 rounded-lg shadow-md text-center flex flex-col"> {/* Añadido flex-col */}
            {/* Considera usar next/image si las imágenes están en public */}
            {proyecto.imagen && (
              <Image
                src={proyecto.imagen} // Asegúrate que esta ruta sea accesible (puede ser URL externa o ruta en public)
                alt={proyecto.titulo || 'Imagen del proyecto'} // Alt text más robusto
                width={400} // Dimensiones de ejemplo, ajusta a las proporciones comunes de tus imágenes
                height={200} // Asegura que se mantiene la relación de aspecto con object-cover
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
              {proyecto.titulo}
            </h3>
            <p className="text-gray-600 flex-grow">{proyecto.descripcion}</p> {/* flex-grow para empujar el enlace hacia abajo */}
            {proyecto.enlace && (
              // Usar <a> si es un enlace externo, Link de Next.js si es a una página interna de portafolio
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

export default PortfolioSection; // Exporta el componente