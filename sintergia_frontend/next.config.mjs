/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Tu configuración existente
  env: { // Tu configuración existente
    BACKEND_URL: "http://127.0.0.1:8000", // Asegúrate de usar la URL correcta de tu backend
  },

  // AÑADE ESTA SECCIÓN 'images'
  images: {
    domains: [
      '127.0.0.1', // Permite cargar imágenes desde tu backend local por IP
      'localhost', // Opcional: si accedes a tu backend local por hostname
      // Añade otros dominios si cargas imágenes desde fuentes externas (ej: 'cdn.example.com')
    ],
    // Opcional: Si necesitas especificar puertos, protocolos o paths específicos
    // remotePatterns: [
    //   {
    //     protocol: 'http', // o 'https'
    //     hostname: '127.0.0.1',
    //     port: '8000', // Especifica el puerto 8000
    //     pathname: '/media/proyectos/**', // Permite cualquier path bajo /media/proyectos
    //   },
    // ],
  },

  // ... si tienes otras configuraciones, agrégalas aquí
};

// Asegúrate de que la exportación sea 'module.exports' si usas CommonJS,
// o 'export default nextConfig;' si usas módulos ES (App Router por defecto usa ES Modules)
// Como tienes 'export default', asumiremos que es correcto para tu setup.
export default nextConfig;