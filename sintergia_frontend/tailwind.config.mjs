/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // **Rutas CORREGIDAS según tu estructura (src/app/ y src/componentes/)**

    // Esta ruta cubre todos los archivos dentro de src/app/ (incluyendo page.js, layout.js, hooks, etc.)
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // **AÑADE ESTA RUTA** - Es la ruta correcta a tu carpeta de componentes dentro de src/
    "./src/componentes/**/*.{js,ts,jsx,tsx,mdx}",

    // La ruta "./src/pages/..." generalmente no es necesaria si usas solo App Router.
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Puedes eliminar o comentar si no usas src/pages con Tailwind

    // Opcional: Si prefieres una ruta más simple que cubra todo dentro de src/
    // Puedes reemplazar las dos rutas anteriores por esta si te es más cómodo:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // **AÑADE AQUÍ TUS DEFINICIONES DE ANIMACIÓN PERSONALIZADAS**
      // Copia los keyframes y las definiciones de animación si los tenías en otro lado.
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
           '0%, 100%': { opacity: '1' },
           '50%': { opacity: '.5' },
        },
         'line-expand': {
           '0%': { width: '0' },
           '100%': { width: '6rem' }, // Ajusta el ancho final si es diferente en tu diseño
         },
         'gradient-x': { // Define keyframes para el movimiento del gradiente si usas esa animación
            '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
         },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards', // Ajusta la duración, easing y fill-mode
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
        'line-expand': 'line-expand 0.7s ease-out forwards',
        'gradient-x': 'gradient-x 4s ease infinite', // Ajusta la duración y easing
      },
    },
  },
  plugins: [
    // ... tus plugins
  ],
};