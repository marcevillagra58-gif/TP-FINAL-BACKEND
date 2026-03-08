import { useState, useEffect } from "react";
import { API_ML } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useProducerData
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook para obtener datos de un productor específico por ID desde la API REST.
 * Mantiene compatibilidad con la UI del TP 1.
 * ============================================================================
 */

export const useProducerData = (id) => {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducer = async () => {
    if (!id) {
      setError(new Error("No ID provided"));
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_ML}/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Mapeo de campos (REST -> UI)
      const mappedProducer = {
        ...data,
        // Campos UI compatibles con TP 1
        id: data._id,
        avatar: data.imageUrl || "https://i.ibb.co/rRVQzhtV/nuevo-item.png",
        // phone y email ya vienen directamente del objeto data
        products: (data.products || []).map((p) => ({
          ...p,
          id: p._id,
          // Unificar nombre del campo imagen
          image: p.imageUrl || p.image || "",
        })),
        comments: data.comments || [],
      };

      setProducer(mappedProducer);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error fetching producer:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducer();
  }, [id]);

  const refreshProducer = () => {
    setLoading(true);
    fetchProducer();
  };

  return { producer, setProducer, loading, error, refreshProducer };
};
