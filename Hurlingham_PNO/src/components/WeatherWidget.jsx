import React from 'react';
import { useExternalData } from '../hooks/useExternalData';
import '../css/WeatherWidget.css';

/**
 * ============================================================================
 * COMPONENTE: WeatherWidget
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Muestra el clima en tiempo real de Hurlingham con un diseño premium.
 * Utiliza datos de Open-Meteo vía el backend propio.
 * ============================================================================
 */

const WeatherWidget = () => {
    const { weather, loading, error } = useExternalData();

    if (loading.weather) return <div className="weather-widget loading">Cargando clima...</div>;
    if (error.weather) return null;

    // Mapeo simple de códigos de clima de Open-Meteo a iconos/descripciones
    const getWeatherInfo = (code) => {
        if (code === 0) return { icon: "☀️", label: "Despejado" };
        if (code >= 1 && code <= 3) return { icon: "🌤️", label: "Parcialmente nublado" };
        if (code >= 45 && code <= 48) return { icon: "🌫️", label: "Neblina" };
        if (code >= 51 && code <= 67) return { icon: "🌧️", label: "Lluvia" };
        if (code >= 71 && code <= 77) return { icon: "❄️", label: "Nieve" };
        if (code >= 80 && code <= 82) return { icon: "🌦️", label: "Chubascos" };
        if (code >= 95) return { icon: "⛈️", label: "Tormenta" };
        return { icon: "☁️", label: "Nublado" };
    };

    const info = getWeatherInfo(weather.weathercode);

    return (
        <div className="weather-widget">
            <div className="weather-header">
                <span className="location-pin">📍</span>
                <span className="location-name">{weather.location}</span>
            </div>
            <div className="weather-main">
                <div className="weather-icon">{info.icon}</div>
                <div className="weather-temp">
                    {Math.round(weather.temperature)}
                    <span className="temp-unit">°C</span>
                </div>
            </div>
            <div className="weather-footer">
                <span className="weather-label">{info.label}</span>
                <span className="weather-wind">💨 {weather.windspeed} km/h</span>
            </div>
        </div>
    );
};

export default WeatherWidget;
