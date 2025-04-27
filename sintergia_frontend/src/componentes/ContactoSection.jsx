// componentes/ContactoSection.jsx
'use client'; // ContactForm probablemente usa estado/hooks

import React from 'react';
import ContactForm from "./ContactForm"; // Importa tu formulario de contacto

function ContactoSection() { // Renombrado
  return (
    <section id="contacto" className="py-16 "> {/* Añadido ID y fondo */}
        <ContactForm />
      </section>
  );
}

export default ContactoSection; // Exporta el componente