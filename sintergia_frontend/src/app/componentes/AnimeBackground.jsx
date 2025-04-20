'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimeBackground = () => {
  const containerRef = useRef(null);
  const count = 1000; // Podés subirlo a 2024 si querés el efecto original
  const distance = 20;
  const duration = 10000;

  const angle = i => anime.random(0, 100) * (Math.PI / 360); // Variabilidad
  const hue = i => Math.round((360 / count) * i);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Limpiar el contenido
    container.innerHTML = '';

    // Crear los divs
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.backgroundColor = `hsl(${hue(i)}, 60%, 60%)`;
      container.appendChild(el);
    }

    anime({
      targets: '#anime-background div',
      translateX: (_, i) => `${Math.sin(i * 0.1) * distance}rem`,
      translateY: (_, i) => `${Math.cos(i * 0.1) * distance}rem`,
      scale: [0, 0.4, 0.2, 0.9, 0],
      duration,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger([0, duration]),
    });

    return () => anime.remove('#anime-background div');
  }, []);

  return (
    <div
      id="anime-background"
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100dvh',
      }}
    />
  );
};

export default AnimeBackground;
