/**
 * Hook: useCategorias
 * Carga la lista de categorías desde la API (público, sin auth).
 * Expone: categorias, loading, error, recargar
 */
import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../utils/API';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/categorias');
      if (!res.ok) throw new Error('No se pudieron cargar las categorías');
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { categorias, loading, error, recargar: cargar };
};
