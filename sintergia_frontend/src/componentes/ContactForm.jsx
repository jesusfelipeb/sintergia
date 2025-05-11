"use client";
import { useState } from "react";

export default function ContactForm() {
  // 1. Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  // 2. Maneja el cambio de cada input/textarea
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // 3. Envía los datos al backend al hacer submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      // ** --- CORRECCIÓN CLAVE: Usar la variable de entorno --- **
      // Leemos la URL base del backend desde la variable de entorno.
      // Si no está definida (desarrollo local sin .env.local), usamos la URL local como fallback.
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      // Construimos la URL completa del endpoint de la API
      const response = await fetch(`${backendUrl}/api/contacto/`, { // <-- ¡Usar la URL construida!
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Formulario enviado con éxito");
        // Limpia el formulario
        setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
      } else {
        // Mejora en el manejo de errores: intentar leer el mensaje de error del backend
        const errorData = await response.json().catch(() => ({})); // Intenta parsear JSON, si falla usa un objeto vacío
        const errorMessage = errorData.detail || errorData.message || `Error al enviar el formulario: ${response.status} ${response.statusText}`;
        alert(errorMessage);
        console.error("Error al enviar el formulario:", response.status, response.statusText, errorData);
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      // Mostrar el mensaje de error de red/fetch
      alert("Error en el envío: " + error.message);
    }
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 pb-6 text-center text-white">
          ¡Hagamos realidad tu proyecto!
        </h2>
        <p className="text-center text-gray-100 mb-10">
          Cuéntanos tu idea y te enviaremos una cotización a medida. 🚀
        </p>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* 4. Agregamos onSubmit al form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Nombre</label>
              {/* 5. name, value, onChange */}
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-gray-700"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-gray-700"
                placeholder="correo@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Teléfono (opcional)</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-gray-700"
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Descripción del proyecto</label>
              <textarea
                rows="4"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-gray-700"
                placeholder="Cuéntanos más sobre lo que necesitas..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Solicitar Cotización
            </button>
          </form>
        </div>

        {/* Botón de WhatsApp */}
        <div className="text-center mt-8">
          <a
            href="https://wa.me/5491123456789?text=Hola%20quiero%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            📲 Chatear por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
