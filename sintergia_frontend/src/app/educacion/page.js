'use client';
import { useFetchYoutubeVideos } from '../hooks/useFetchYoutubeVideos';

export default function Educacion() {
  const channelId = 'UCwkp8tP064mnL6t1yZ-m8og';
  const { videos, loading, error } = useFetchYoutubeVideos(channelId, 50); // por ejemplo, 50 videos

  if (loading) return <p>Cargando todos los videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 pb-6 text-center text-white">
          Aprendamos Juntos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => {
            const videoId = video.id.videoId;
            const titulo  = video.snippet.title;
            const cover   = video.snippet.thumbnails.medium.url;

            return (
              <div key={videoId} className="bg-indigo-50 p-4 rounded shadow-md text-center">
                
                <h3 className="text-indigo-600 font-semibold mb-2">{titulo}</h3>
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
      </div>
    </section>
  );
}

