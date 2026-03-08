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
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({ weather: true, news: true });
  const [error, setError] = useState({ weather: null, news: null });

  const fetchWeather = async () => {
    try {
      const response = await apiFetch("/external/weather");
      if (!response.ok) throw new Error("Error fetching weather");
      const data = await response.json();
      setWeather(data);
      setLoading((prev) => ({ ...prev, weather: false }));
    } catch (err) {
      console.error(err);
      setError((prev) => ({ ...prev, weather: "No disponible" }));
      setLoading((prev) => ({ ...prev, weather: false }));
    }
  };

  const fetchNews = async () => {
    try {
      const response = await apiFetch("/external/news");
      if (!response.ok) throw new Error("Error fetching news");
      const data = await response.json();
      // Normalizar: garantizar siempre array
      const articles = Array.isArray(data) ? data : data.articles || [];
      setNews(articles);
      setLoading((prev) => ({ ...prev, news: false }));
    } catch (err) {
      console.error(err);
      setError((prev) => ({ ...prev, news: "No disponible" }));
      setLoading((prev) => ({ ...prev, news: false }));
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchNews();
  }, []);

  return {
    weather,
    news,
    loading,
    error,
    refreshWeather: fetchWeather,
    refreshNews: fetchNews,
  };
};
