// PortfolioSection.jsx
// src/app/hooks/useFetchProyectos.js
'use client';
import { useEffect, useState } from 'react';

export function useFetchProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/proyectos/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar proyectos");
        return res.json();
      })
      .then((data) => {
        setProyectos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { proyectos, loading, error };
}
