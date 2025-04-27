// next.config.js
// Este archivo de configuración se ejecuta en el entorno de Node.js durante el build de Next.js.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode ayuda a identificar problemas potenciales en tu código React.
  // Es buena práctica mantenerlo activado en desarrollo.
  reactStrictMode: true,

  // --- Manejo de Variables de Entorno ---
  // Las variables definidas aquí en 'env' están disponibles en process.env
  // solo durante el build y en el entorno del servidor (Node.js).
  // Para variables que necesites en el lado del cliente (el navegador), usa el prefijo NEXT_PUBLIC_.
  // En este caso, usaremos directamente NEXT_PUBLIC_BACKEND_URL para que sea consistente
  // con el código del lado del cliente (page.js) y esté disponible durante el build (donde se evalúa 'images.domains').
  // Eliminamos el bloque 'env' anterior ya que no lo necesitamos si usamos NEXT_PUBLIC_ como fuente de verdad.
  // env: {
  //   BACKEND_URL: "http://127.0.0.1:8000", // Ejemplo de cómo era antes
  // },
  // --- Fin Manejo de Variables de Entorno ---


  // --- Configuración de next/image ---
  images: {
    // La propiedad 'domains' es un array de hostnames permitidos para cargar imágenes externas.
    domains: [
      // Mantener estos hostnames para permitir cargar imágenes desde tu backend local
      // durante el desarrollo (npm run dev).
      '127.0.0.1',
      'localhost',

      // ** --- MODIFICACIÓN CLAVE: Añadir el hostname del backend desplegado dinámicamente --- **
      // Leemos la variable de entorno NEXT_PUBLIC_BACKEND_URL.
      // Vercel (y Next.js con .env.local) hace que las variables NEXT_PUBLIC_ estén disponibles AQUÍ, durante el build.
      // Usamos el constructor URL para parsear de forma segura la URL que viene de la variable
      // y extraemos solo el 'hostname' (ej: 'api.tudominio.com').
      // Si process.env.NEXT_PUBLIC_BACKEND_URL no está definida (ej: un build sin la variable),
      // usamos 'null' para evitar errores.
      process.env.NEXT_PUBLIC_BACKEND_URL ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL).hostname : null,

      // Añade aquí cualquier otro dominio externo desde el que cargues imágenes
      // que NO sean de tu backend (ej: 'cdn.otraweb.com', 'images.unsplash.com').
      // 'otro-dominio-imagenes.net',

      // .filter(Boolean) es un truco de JavaScript para eliminar cualquier entrada que sea "falsa"
      // del array, como 'null', 'undefined', '', 0. Esto es útil si la variable de entorno
      // no está definida, ya que el `? null` añadirá un null que filter(Boolean) eliminará,
      // manteniendo el array limpio.
    ].filter(Boolean),
    // ** -------------------------------------------------------------------- **


    // Opcional: 'remotePatterns' ofrece más flexibilidad que 'domains'.
    // Te permite especificar protocolos (http/https), hostnames, puertos y paths específicos.
    // Si tu backend desplegado usa HTTPS, un puerto diferente al 80/443, o solo sirve imágenes
    // bajo un path específico (ej: /media/), puede que necesites usar remotePatterns en lugar de domains
    // o además de domains para una configuración más precisa.
    //
    // remotePatterns: [
    //   {
    //     protocol: process.env.NEXT_PUBLIC_BACKEND_URL ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL).protocol.replace(':', '') : 'http', // 'http' o 'https'
    //     hostname: process.env.NEXT_PUBLIC_BACKEND_URL ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL).hostname : '127.0.0.1',
    //     port: process.env.NEXT_PUBLIC_BACKEND_URL ? (new URL(process.env.NEXT_PUBLIC_BACKEND_URL).port || '') : '8000', // Puerto (puede ser cadena vacía si es el puerto por defecto)
    //     pathname: '/media/proyectos/**', // Permite cualquier path bajo /media/proyectos/
    //   },
    //   // Puedes añadir otros patrones para otras fuentes de imágenes si es necesario
    // ],
  },
  // --- Fin Configuración de next/image ---


  // ... si tienes otras configuraciones globales de Next.js (como webpack, sassOptions, etc.), agrégalas aquí
};

// Exporta el objeto de configuración. Para el App Router (con source: true o por defecto),
// generalmente se usa 'export default'. Si usaras Pages Router en la raíz sin src,
// a menudo se usa 'module.exports ='.
export default nextConfig;