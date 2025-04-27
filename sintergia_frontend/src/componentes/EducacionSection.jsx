// componentes/EducacionSection.jsx
'use client'; // Usa useFetchYoutubeVideos que puede usar useEffect/useState

import React from 'react';
import Image from 'next/image'; // Si usas next/image para las miniaturas
import Link from 'next/link'; // Si el enlace "Ver todos los videos" es interno

// Importa tu hook personalizado
import { useFetchYoutubeVideos } from '../app/hooks/useFetchYoutubeVideos'; // Ajusta la ruta si es necesario

function EducacionSection({ limit }) { // Renombrado y acepta un prop limit
  const channelId = 'UCwkp8tP064mnL6t1yZ-m8og'; // Reemplaza con tu canal
  const { videos, loading, error } = useFetchYoutubeVideos(channelId, limit || 3); // Usa el límite si se proporciona, por defecto 3

  if (loading) return <p className="text-center py-8">Cargando videos...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error al cargar videos: {error.message}</p>; // Muestra el mensaje de error

  return (
    // Eliminado el div adicional que envolvía la section
    <section id="educacion" className="py-16 "> {/* Añadido ID */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 pb-6 text-center text-white">
          Aprendamos Juntos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => {
            const videoId = video.id.videoId;
            const titulo  = video.snippet.title;
            const cover   = video.snippet.thumbnails.medium.url; // URL de la miniatura

            return (
              <div key={videoId} className="bg-indigo-50 p-4 rounded shadow-md text-center flex flex-col"> {/* Añadido flex-col */}

                {/* Miniatura del video (opcional, puedes usar iframe directamente si prefieres) */}
                {/* Considera usar next/image si descargas las miniaturas y las sirves localmente */}
                 {/* <Image src={cover} alt={`Miniatura de video: ${titulo}`} width={320} height={180} className="w-full h-auto object-cover mb-2 rounded" /> */}

                <h3 className="text-indigo-600 font-semibold mb-2">{titulo}</h3>
                {/* iframe para reproducir video */}
                {/* **CORREGIDO:** src para iframe de YouTube debe ser embed, no youtube.com/0 */}
                {/* **CORREGIDO:** Protocolo https para evitar warnings de contenido mixto */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* Contenedor para mantener la relación de aspecto 16:9 */}
                   <iframe
                     className="absolute top-0 left-0 w-full h-full rounded"
                     src={`https://www.youtube.com/embed/${videoId}`} // <-- RUTA CORREGIDA
                     title={titulo}
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                </div>
              </div>
            );
          })}
        </div>
        {/* Enlace a la página con todos los videos */}
        <div className="text-center mt-8">
          {/* Usar Link si /educacion es una página interna de Next.js */}
          <Link
            href="/educacion" // Ruta a la otra página de educación
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Ver todos los videos
          </Link>
          {/* Usar <a> si /educacion es una ruta externa o un archivo */}
          {/* <a href="/educacion" className="inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"> Ver todos los videos </a> */}
        </div>
      </div>
    </section>
  );
}

export default EducacionSection; // Exporta el componente