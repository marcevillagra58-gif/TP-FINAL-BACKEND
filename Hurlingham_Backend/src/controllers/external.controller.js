/**
 * ============================================================================
 * CONTROLLERS/EXTERNAL.CONTROLLER.JS — Consumo de APIs Externas
 * ============================================================================
 *
 * Gestiona peticiones a servicios meteorológicos y de noticias.
 * Implementa una caché básica en memoria para no saturar las APIs gratuitas.
 * ============================================================================
 */

let weatherCache = { data: null, lastUpdate: 0 };
let newsCache = { data: null, lastUpdate: 0 };

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutos

// ============================================================
// GET /api/external/weather
// ============================================================
export const getWeather = async (req, res) => {
  try {
    const now = Date.now();
    if (weatherCache.data && now - weatherCache.lastUpdate < CACHE_DURATION) {
      return res.json(weatherCache.data);
    }

    // Coordenadas Hurlingham, Buenos Aires
    const lat = -34.588;
    const lon = -58.638;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Error fetching weather");

    const result = {
      temperature: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
      weathercode: data.current_weather.weathercode,
      time: data.current_weather.time,
      location: "Hurlingham, BA",
    };

    weatherCache = { data: result, lastUpdate: now };
    res.json(result);
  } catch (err) {
    console.error("Weather API Error:", err);
    res
      .status(500)
      .json({ error: "No se pudo obtener el clima", fallback: true });
  }
};

// ============================================================
// GET /api/external/news
// ============================================================
export const getNews = async (req, res) => {
  try {
    const now = Date.now();
    if (newsCache.data && now - newsCache.lastUpdate < CACHE_DURATION) {
      return res.json(newsCache.data);
    }

    // Usamos NewsAPI (necesita NEWS_API_KEY en .env)
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      // Sin API key: devolver array directamente (NO un objeto)
      return res.json([
        {
          title: "Conectá tu NewsAPI Key para ver noticias reales",
          description: "Agregá NEWS_API_KEY en el .env del backend.",
          url: "https://newsapi.org/",
          urlToImage: null,
          source: { name: "Sistema" },
          publishedAt: new Date().toISOString(),
        },
      ]);
    }

    const url = `https://newsapi.org/v2/top-headlines?country=ar&category=general&pageSize=6&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Error fetching news");

    // NewsAPI devuelve { articles: [...] }, normalizamos a array
    const articles = Array.isArray(data) ? data : data.articles || [];
    newsCache = { data: articles, lastUpdate: now };
    res.json(articles);
  } catch (err) {
    console.error("News API Error:", err);
    res.status(500).json({ error: "No se pudo obtener las noticias" });
  }
};
