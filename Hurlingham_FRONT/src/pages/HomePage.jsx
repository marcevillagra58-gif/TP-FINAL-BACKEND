import React from 'react';
import { useTransition } from '../components/Transition';
import { getAssetPath } from '../utils/assetPath.js';
import '../css/infinito.css';

/**
 * ============================================================================
 * PÁGINA: HomePage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página de bienvenida con animación de texto circular infinito y escudo
 * de Hurlingham. Primera página que ve el usuario al entrar al sitio.
 * 
 * RUTA:
 * - /homepage (ruta raíz)
 * 
 * FUNCIONALIDADES:
 * - Animación de texto circular "BIENVENIDOS A HURLINGHAM"
 * - Escudo de Hurlingham en el centro
 * - Botón "Ingresar" que navega a /principal con transición
 * - Doble wrapper para efecto visual envolvente
 * 
 * ANIMACIÓN:
 * - Texto split en letras individuales
 * - Rotación circular continua (CSS swirl)
 * - Espacios non-breaking (\u00A0) para separación
 * 
 * NAVEGACIÓN:
 * - useTransition para transición animada a /principal
 * 
 * DISEÑO:
 * - Layout infinito circular
 * - Centrado absoluto de contenido
 * - Responsive
 * ============================================================================
 */

const HomePage = () => {
    const { transition } = useTransition();
    const letters = "BIENVENIDOS A HURLINGHAM".split("");

    const handleNavigate = (e) => {
        e.preventDefault();
        transition('/principal');
    };

    return (
        <div className="container-infinito">
            <div className="wrapper">
                <div className="swirl">
                    {letters.map((letter, i) => (
                        <span key={i}>{letter === ' ' ? '\u00A0' : letter}</span>
                    ))}
                </div>
                <div className="center-content">
                    <img src={getAssetPath('/assets/escudo.jpeg')} alt="Logo" className="logo-infinito" />
                </div>
            </div>
            <div className="wrapper">
                <div className="swirl">
                    {letters.map((letter, i) => (
                        <span key={i}>{letter === ' ' ? '\u00A0' : letter}</span>
                    ))}
                </div>
                <div className="center-content">
                    <button onClick={handleNavigate} className="nav-btn">Ingresar</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
