// componentes/DjangoMessage.jsx
// No 'use client' si este componente solo recibe un prop (message) y no usa hooks o eventos del cliente.
// Si la lógica de fetch estuviera AQUI, necesitaría 'use client'.

import React from 'react';

function DjangoMessage({ message }) {
  return (
    <section className="py-16 bg-white"> {/* Puedes ajustar el fondo */}
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-indigo-50 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestro compromiso</h2>
          <p className="text-lg text-gray-600 italic">
            {/* Muestra el mensaje recibido como prop */}
            {message || "Cargando última actualización..."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default DjangoMessage; // Exporta el componente