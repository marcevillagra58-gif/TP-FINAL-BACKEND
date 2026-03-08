import React from 'react';
import '../css/NotFoundPage.css';

/**
 * ============================================================================
 * COMPONENTE: DecorativeCircles
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Elemento decorativo SVG con círculos concéntricos animados.
 * Usado como fondo visual en páginas de error (404, etc).
 * 
 * RECIBE DATOS DE:
 * - NotFoundPage.jsx o páginas de error
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente puramente visual)
 * 
 * PROPS:
 * - Ninguna
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Decorative animated circles background
 */
const DecorativeCircles = () => {
    return (
        <div className="error-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                <path d="M 100 20 L 100 180 M 20 100 L 180 100" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            </svg>
        </div>
    );
};

export default DecorativeCircles;
