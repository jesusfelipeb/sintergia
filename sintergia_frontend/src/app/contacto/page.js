// src/app/contacto/page.js
'use client'; // Necesitamos 'use client' porque ContactForm es un componente de cliente

import React from 'react';
// Importa el componente ContactForm - ¡AJUSTA LA RUTA!
// Tu página está en src/app/contacto. Tu formulario está en src/componentes.
// Necesitas subir dos niveles (../ then ../) para salir de 'contacto' y 'app',
// y luego bajar a 'componentes'.
import ContactForm from '../../componentes/ContactForm'; // <-- **¡AJUSTA LA RUTA SI ES NECESARIO!**

// Importa iconos para redes sociales y WhatsApp (si usas MessageCircle)
import { Instagram, Mail, X, Youtube, MessageCircle } from 'lucide-react'; // Asegúrate de tener lucide-react instalado


// Este es el componente que se renderizará en la ruta /contacto
export default function ContactoPage() {

  // Define los enlaces a tus redes sociales y tu email
  const socialLinks = [
    // **¡IMPORTANTE! Reemplaza las URLs y el email con tu información real.**
    { name: 'Instagram', icon: <Instagram size={24} />, url: 'https://www.instagram.com/tucuenta/' }, // <-- REEMPLAZA ESTA URL
    { name: 'Email', icon: <Mail size={24} />, url: 'mailto:tuemail@ejemplo.com' }, // <-- REEMPLAZA ESTE EMAIL
    { name: 'X (Twitter)', icon: <X size={24} />, url: 'https://x.com/tucuenta/' }, // <-- REEMPLAZA ESTA URL
    { name: 'YouTube', icon: <Youtube size={24} />, url: 'https://www.youtube.com/tucanal/' }, // <-- REEMPLAZA ESTA URL
  ];

  // Define la URL de WhatsApp (usa tu número real)
  // **¡IMPORTANTE! Reemplaza '541132924310' con tu número real de WhatsApp (incluyendo código de país sin +).**
  const whatsappUrl = "https://wa.me/541132924310?text=Hola%2C%20quiero%20contactarlos%20desde%20su%20p%C3%A1gina%20de%20contacto."; // <-- REEMPLAZA EL NÚMERO

  return (
    // Contenedor principal de la página con padding superior e inferior
    // El video de fondo global y el overlay del layout.js se verán detrás de este contenido.
    <div className="container mx-auto px-4 py-16 relative z-10"> {/* z-10 para estar por encima del overlay global z-0 */}
      {/* Contenedor interno para centrar y alinear el contenido */}
      <div className="flex flex-col items-center text-center">

        {/* Título de la Página */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
          Hablemos de tu Proyecto
        </h1>

        {/* Párrafo Introductorio */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12">
          ¡Ponte en contacto con nosotros! Completa el formulario o encuéntranos en nuestras redes sociales. Estamos listos para transformar tus ideas en soluciones digitales rentables.
        </p>

        {/* Sección de Redes Sociales */}
        <div className="w-full max-w-lg mb-12"> {/* Ancho máximo para la sección de redes */}
          <h2 className="text-2xl font-semibold text-white mb-6">Nuestras Redes</h2>
          {/* Contenedor flex para alinear los enlaces de redes */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {/* Mapea el array socialLinks para crear un enlace por cada red */}
            {socialLinks.map((link) => (
              // Enlace individual de red social
              <a
                key={link.name} // Key única
                href={link.url} // URL de la red social
                target="_blank" // Abre en una nueva pestaña
                rel="noopener noreferrer" // Mejora de seguridad al abrir en nueva pestaña
                className="flex items-center text-gray-300 hover:text-secondary transition-colors duration-300 text-lg font-medium" // Estilos y efecto hover usando color de paleta
                aria-label={`Enlace a nuestro perfil de ${link.name}`} // Accesibilidad
              >
                {link.icon} {/* Icono */}
                {/* <span className="ml-2">{link.name}</span> Agrega el nombre si quieres mostrarlo junto al icono */}
              </a>
            ))}
             {/* Añade el enlace de WhatsApp aquí también */}
             <a
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center text-green-500 hover:text-green-400 transition-colors duration-300 text-lg font-medium"
               aria-label="Contactar por WhatsApp"
             >
               {/* Icono de mensaje o WhatsApp si lo tienes */}
               <MessageCircle size={24} /> {/* Usando el icono MessageCircle */}
               {/* <span className="ml-2">WhatsApp</span> Agrega el nombre si quieres mostrarlo */}
             </a>
          </div>
        </div>

        {/* Sección del Formulario de Contacto */}
        {/* Un contenedor con un fondo semi-transparente y padding para separar visualmente el formulario */}
        <div className="w-full max-w-xl bg-dark-surface/50 p-8 rounded-lg shadow-xl text-left"> {/* Usando color de paleta y opacidad */}
           <h2 className="text-2xl font-semibold text-light-text mb-6 text-center">Envíanos un Mensaje Directo</h2> {/* Usando color de paleta */}
           <ContactForm /> {/* Renderiza el formulario importado */}
        </div>

      </div>
    </div>
  );
}