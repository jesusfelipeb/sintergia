'use client'; // Importante añadir esto al inicio
import { useState, useEffect } from 'react';



// =======================
// Componente ServicesPage
// =======================
function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/servicios/');
        if (!response.ok) {
          throw new Error('Error al cargar los servicios');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">
        <p className="text-lg text-gray-600">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section id="services" className="py-16 ">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 pb-6 text-center text-white">
          Nuestros Servicios
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-indigo-600">
                {service.nombre}
              </h2>
              <p className="text-gray-600 mb-4">{service.descripcion}</p>
              <p className="text-lg font-semibold text-emerald-500">
                Precio: ${service.precio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =======================
// Página de Servicios
// =======================
export default function Services() {
  return (
    <div className="min-h-screen flex flex-col ">
     
      <main className="flex-grow ">
        <ServicesPage />
      </main>
      
    </div>
  );
}
