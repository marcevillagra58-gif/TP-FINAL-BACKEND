import { useState, useEffect } from 'react';

/**
 * ============================================================================
 * CUSTOM HOOK: useResponsiveFontSize
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Hook personalizado que calcula y actualiza automáticamente el tamaño de 
 * fuente según el ancho de la ventana del navegador. Se ajusta dinámicamente
 * cuando el usuario redimensiona la ventana.
 * 
 * USADO EN:
 * - TextoManuscrito.jsx (para títulos animados con escritura manuscrita)
 * 
 * PARÁMETROS:
 * @param {number} baseSize - Tamaño base de la fuente para desktop (por defecto: 50)
 * 
 * RETORNA:
 * @returns {number} fontSize - Tamaño de fuente ajustado según el ancho de pantalla
 * 
 * BREAKPOINTS Y ESCALADO:
 * - ≤ 480px:  50% del tamaño base (móviles extra pequeños)
 * - ≤ 600px:  60% del tamaño base (móviles pequeños)
 * - ≤ 768px:  70% del tamaño base (móviles medianos / tablets pequeñas)
 * - ≤ 912px:  85% del tamaño base (móviles grandes / tablets)
 * - ≤ 1200px: 95% del tamaño base (tablets landscape / desktop pequeño)
 * - > 1200px: 100% del tamaño base (desktop)
 * 
 * EJEMPLO DE USO:
 * ```javascript
 * const fontSize = useResponsiveFontSize(50);
 * // fontSize será 25 en móviles de 480px
 * // fontSize será 50 en desktop de 1920px
 * ```
 * 
 * DEPENDENCIAS:
 * - React hooks: useState, useEffect
 * - DOM API: window.innerWidth, window.addEventListener
 * ============================================================================
 */
function useResponsiveFontSize(baseSize = 50) {
    const [fontSize, setFontSize] = useState(baseSize);

    useEffect(() => {
        // Función que calcula el tamaño de fuente basado en el ancho de ventana
        const calculateFontSize = () => {
            const width = window.innerWidth;

            // Retorna el tamaño escalado según breakpoints
            if (width <= 480) {
                return baseSize * 0.5;  // 50% para móviles extra pequeños
            } else if (width <= 600) {
                return baseSize * 0.6;  // 60% para móviles pequeños
            } else if (width <= 768) {
                return baseSize * 0.7;  // 70% para móviles medianos
            } else if (width <= 912) {
                return baseSize * 0.85; // 85% para tablets
            } else if (width <= 1200) {
                return baseSize * 0.95; // 95% para desktop pequeño
            } else {
                return baseSize;        // 100% para desktop
            }
        };

        // Handler que actualiza el estado cuando cambia el tamaño de ventana
        const handleResize = () => {
            setFontSize(calculateFontSize());
        };

        // Calcular tamaño inicial
        handleResize();

        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', handleResize);

        // Cleanup: remover event listener al desmontar
        return () => window.removeEventListener('resize', handleResize);
    }, [baseSize]); // Re-ejecutar si cambia el tamaño base

    return fontSize;
}

export default useResponsiveFontSize;
