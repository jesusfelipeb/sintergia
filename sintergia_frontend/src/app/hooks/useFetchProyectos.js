
// src/app/hooks/useFetchProyectos.js
// useFetchProyectos.js
'use client';
import { useEffect, useState } from 'react';

export function useFetchProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => { // Usamos async/await para un manejo más limpio
      try {
        setLoading(true);
        setError(null); // Resetear error en cada intento

        // ** --- CORRECCIÓN CLAVE: Usar la variable de entorno --- **
        // Leemos la URL base del backend desde la variable de entorno.
        // Si no está definida (desarrollo local sin .env.local), usamos la URL local como fallback.
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

        // Construimos la URL completa del endpoint de la API concatenando la URL base
        // (leída de la variable de entorno o el fallback) con la ruta específica de la API.
        const response = await fetch(`${backendUrl}/api/proyectos/`);

        if (!response.ok) {
          // Si la respuesta no es 2xx, lanzar un error
          const errorText = response.statusText || 'Error desconocido al cargar proyectos';
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setProyectos(data);

      } catch (err) {
        console.error('Error al obtener proyectos:', err); // Loggea el objeto error para más detalles
        setError(err.message); // Guarda solo el mensaje de error
      } finally {
        setLoading(false); // Asegura que el estado de carga termine
      }
    };

    fetchData();
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  return { proyectos, loading, error };
}