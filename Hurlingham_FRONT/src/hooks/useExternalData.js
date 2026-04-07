import { useState, useEffect } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useExternalData
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Obtiene datos de clima y noticias desde el backend propio.
 * ============================================================================
 */

export const useExternalData = () => {
  const [weather,   setWeather]   = useState(null);
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState({ weather: true, transport: true });
  const [error,   setError]   = useState({ weather: null, transport: null });

  const fetchWeather = async () => {
    try {
      const response = await apiFetch("/external/weather");
      if (!response.ok) throw new Error("Error fetching weather");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError((prev) => ({ ...prev, weather: "No disponible" }));
    } finally {
      setLoading((prev) => ({ ...prev, weather: false }));
    }
  };

  const fetchTransport = async () => {
    try {
      const response = await apiFetch("/external/transport");
      const data = await response.json();
      setTransport(data);
    } catch (err) {
      console.error(err);
      setError((prev) => ({ ...prev, transport: "No disponible" }));
    } finally {
      setLoading((prev) => ({ ...prev, transport: false }));
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchTransport();
  }, []);

  return {
    weather,
    transport,
    loading,
    error,
    refreshWeather:   fetchWeather,
    refreshTransport: fetchTransport,
  };
};
