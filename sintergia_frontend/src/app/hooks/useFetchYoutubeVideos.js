'use client';
import { useEffect, useState } from 'react';

export function useFetchYoutubeVideos(channelId, maxResults) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!channelId) return; // Evita llamadas si no hay channelId

    const fetchVideos = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Variable de entorno
        // Ordenamos por fecha y limitamos el número de resultados
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;


        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Error al cargar videos de YouTube');
        }

        const data = await res.json();
        // data.items es un array de videos
        setVideos(data.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId, maxResults]);

  return { videos, loading, error };
}
