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
    const fetchServices = async () => { // Usamos async/await para claridad
      try {
        setLoading(true);
        setError(null); // Resetear error en cada intento

        // ** --- CORRECCIÓN CLAVE: Usar la variable de entorno --- **
        // Leemos la URL base del backend desde la variable de entorno.
        // Si no está definida (desarrollo local sin .env.local), usamos la URL local como fallback.
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'; // Usamos localhost:8000 como respaldo aquí por consistencia con tu código original

        // Construimos la URL completa del endpoint de la API concatenando la URL base
        // (leída de la variable de entorno o el fallback) con la ruta específica de la API.
        const response = await fetch(`${backendUrl}/api/servicios/`); // <-- ¡Usar la URL construida!

        if (!response.ok) {
           const errorText = response.statusText || 'Error desconocido al cargar los servicios';
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setServices(data);

      } catch (err) {
        console.error('Error al obtener servicios:', err); // Loggea el objeto error para más detalles
        setError(err.message); // Guarda solo el mensaje de error
      } finally {
        setLoading(false); // Asegura que el estado de carga termine
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
