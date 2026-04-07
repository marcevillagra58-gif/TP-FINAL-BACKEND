import React, { useState, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/transition.css';
import { getAssetPath } from '../utils/assetPath.js';

const TransitionContext = createContext();

/**
 * ============================================================================
 * COMPONENTE: Transition (Provider y Hook)
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Context Provider que gestiona transiciones animadas entre rutas.
 * Muestra overlay con logo durante navegación entre páginas.
 * 
 * EXPORTS:
 * - TransitionProvider: Provider component para envolver la app
 * - useTransition: Hook para acceder a función transition()
 * 
 * RECIBE DATOS DE:
 * - App.jsx (envuelve toda la aplicación)
 * - Componentes que usan useTransition para navegación
 * 
 * PROPORCIONA DATOS A:
 * - children: Componentes hijos (toda la app)
 * - transition(to): Función de navegación con animación
 * 
 * PROPS (TransitionProvider):
 * - children {ReactNode}: Componentes a envolver
 * 
 * DEPENDENCIAS:
 * - react-router-dom: useNavigate, useLocation
 * - Context API: createContext, useContext
 * ============================================================================
 */

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionClass, setTransitionClass] = useState('');

    const transition = (to) => {
        if (isTransitioning || location.pathname === to) {
            return;
        }

        setIsTransitioning(true);
        setTransitionClass('show');

        setTimeout(() => {
            navigate(to);
            setTransitionClass('hide');
            setTimeout(() => {
                setTransitionClass('');
                setIsTransitioning(false);
            }, 1000); // shrink animation duration
        }, 700); // grow animation duration
    };

    return (
        <TransitionContext.Provider value={{ transition }}>
            {children}
            {(isTransitioning || transitionClass) && (
                <div id="transition-overlay" className={transitionClass}>
                    <img src={getAssetPath("/assets/logo H.png")} alt="transition" />
                </div>
            )}
        </TransitionContext.Provider>
    );
};
