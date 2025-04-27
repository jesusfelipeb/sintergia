'use client'; // Importante añadir esto al inicio


import { useState, useEffect } from 'react';
import Image from 'next/image';



// =======================
// Componente Portfolio
// =======================
function Portfolio() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/proyectos/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar proyectos");
        }
        return response.json();
      })
      .then((data) => {
        setProyectos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-8">Cargando proyectos...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <section id="portafolio" className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 pb-6 text-center text-white">
          Nuestro Portafolio
        </h2>
        <p className="text-xl text-gray-100 text-center mb-12 max-w-2xl mx-auto">
          Descubre algunos de nuestros proyectos más destacados que reflejan la calidad y compromiso de nuestro trabajo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="backdrop-blur-md bg-opacity-25 bg-gray-500 border border-white/10 p-8 rounded-lg shadow-md text-center">
              {proyecto.imagen && (
                <Image
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  width={1920}
                  height={1080}
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


// =======================
// Página de Portafolio
// =======================
export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        <Portfolio />
      </main> 
    </div>
  );
}
