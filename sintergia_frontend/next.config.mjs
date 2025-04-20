/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      BACKEND_URL: "http://127.0.0.1:8000", // Asegúrate de usar la URL correcta de tu backend
    },
  };
  
  export default nextConfig;
  
