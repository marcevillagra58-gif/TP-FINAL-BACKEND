import React from 'react';
import { useNavigate } from 'react-router-dom';
import DecorativeCircles from '../components/DecorativeCircles';
import '../css/NotFoundPage.css';

/**
 * ============================================================================
 * PÁGINA: NotFoundPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página de error 404 mostrada cuando una ruta no existe o no está autorizada.
 * Diseño limpio con opciones de navegación.
 * 
 * RUTA:
 * - * (catch-all en router)
 * 
 * FUNCIONALIDADES:
 * - Mensaje de error 404
 * - Explicación clara: página no existe o sin autorización
 * - Botón "Volver al Inicio" → navega a /homepage
 * - Botón "Página Anterior" → navega hacia atrás
 * - Elemento decorativo SVG con círculos animados
 * 
 * NAVEGACIÓN:
 * - useNavigate('/homepage') para volver al inicio
 * - useNavigate(-1) para ir a página anterior
 * 
 * DISEÑO:
 * - Layout centrado
 * - Código de error grande y visible (404)
 * - Círculos decorativos de fondo
 * - Dos botones de acción claros
 * 
 * COMPONENTES:
 * - DecorativeCircles: SVG animado de fondo
 * ============================================================================
 */

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <DecorativeCircles />
            <div className="not-found-content">
                <h2 className="error-label">Error</h2>
                <div className="error-code">404</div>
                <h1 className="error-title">Página no encontrada</h1>
                <p className="error-message">
                    Lo sentimos, la página que estás buscando no existe o no tienes autorización para acceder a ella.
                </p>
                <div className="error-actions">
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/homepage')}
                    >
                        Volver al Inicio
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Página Anterior
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
