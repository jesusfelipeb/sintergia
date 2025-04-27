// app/page.js
'use client'; // Mantenemos 'use client' porque usamos useState y useEffect aquí

import { useEffect, useState } from 'react'; // Importa hooks necesarios para esta página

// Importa las secciones/componentes refactorizados
import Hero from '../componentes/Hero'; // Ajusta la ruta si es necesario
import ServicesSection from '../componentes/ServicesSection'; // Ajusta la ruta si es necesario
import PortfolioSection from '../componentes/PortfolioSection'; // Ajusta la ruta si es necesario
import EducacionSection from '../componentes/EducacionSection'; // Ajusta la ruta si es necesario
import ContactoSection from '../componentes/ContactoSection'; // Ajusta la ruta si es necesario
import DjangoMessage from '../componentes/DjangoMessage'; // Ajusta la ruta si es necesario




// Este es el componente principal que se renderizará en la ruta '/'
export default function Home() {
  // Estado para el mensaje del backend Django
  const [message, setMessage] = useState('');
  // Estado para controlar la carga del mensaje
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [errorLoadingMessage, setErrorLoadingMessage] = useState(null);


  // Efecto para obtener el mensaje del backend Django al cargar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMessage(true);
        setErrorLoadingMessage(null); // Resetear error en cada intento
        // ** --- MODIFICACIÓN CLAVE PARA VARIABLES DE ENTORNO --- **
        // En lugar de usar la URL local hardcodeada, leemos la URL base del backend
        // desde la variable de entorno 'NEXT_PUBLIC_BACKEND_URL'.
        // Si esta variable NO está definida (por ejemplo, en tu entorno de desarrollo local
        // sin un archivo .env.local configurado para esta variable), usamos 'http://127.0.0.1:8000'
        // como una URL de fallback para que siga funcionando localmente.
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

        // Construimos la URL completa del endpoint de la API concatenando la URL base del backend
        // (leída de la variable de entorno o el fallback) con la ruta específica de la API.
        const response = await fetch(`${backendUrl}/api/home/`);
        if (!response.ok) {
          // Si la respuesta no es 2xx, lanzar un error
          const errorText = response.statusText || 'Error desconocido del servidor';
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error al obtener datos del backend:', error);
        setErrorLoadingMessage(error); // Guardar el objeto error
        // Mensaje amigable para el usuario en caso de error
        setMessage('Actualmente optimizando nuestros servicios - ¡Vuelve pronto!');
      } finally {
         setLoadingMessage(false); // Terminar estado de carga
      }
    };

    fetchData();
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente


  return (
    // Contenedor principal. Layout.js ya le da flex-col y min-h-screen al body.
    // Este div no es estrictamente necesario si main ya tiene flex-grow y se gestiona en layout.
    // Pero lo mantenemos si prefieres un wrapper adicional dentro de <main>.
     <> {/* Usamos un Fragment <> si no necesitamos un div wrapper */}

      {/* Renderiza las secciones/componentes refactorizados */}
      <Hero />
      <ServicesSection />
      {/* Pasamos un prop 'limit' si queremos mostrar solo los primeros N proyectos */}
      <PortfolioSection limit={6} /> {/* Ejemplo: mostrar solo 6 proyectos */}
      {/* Pasamos un prop 'limit' si queremos mostrar solo los primeros N videos */}
      <EducacionSection limit={3} /> {/* Ejemplo: mostrar solo 3 videos */}
      <ContactoSection />

      {/* Renderiza el mensaje de Django, pasando el mensaje obtenido */}
      {/* Puedes añadir lógica condicional si solo quieres mostrarlo cuando no hay error y loading es false */}
      {/* Por ejemplo: {!loadingMessage && !errorLoadingMessage && <DjangoMessage message={message} />} */}
      {/* O simplemente pasas el mensaje y el componente maneja su estado interno/texto */}
      {/*<DjangoMessage message={message} />  El componente DjangoMessage ahora recibe el mensaje */}

    </> // Cerramos el Fragment

    /*
    // Si prefieres un div wrapper, asegúrate de que no interfiera con el layout de body en layout.js
    <div className="min-h-screen flex flex-col">
       <Hero />
       <ServicesSection />
       <PortfolioSection limit={6} />
       <EducacionSection limit={3} />
       <ContactoSection />
       <DjangoMessage message={message} />
    </div>
    */
  );
}