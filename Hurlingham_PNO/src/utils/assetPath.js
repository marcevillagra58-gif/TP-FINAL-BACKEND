/**
 * =============================================================================
 * UTILIDAD: getAssetPath
 * =============================================================================
 * 
 * DESCRIPCIÓN:
 * Función utilitaria para obtener la ruta correcta de assets en deployment
 * de GitHub Pages. Maneja automáticamente el base path según el entorno.
 * 
 * EJEMPLOS:
 * - En desarrollo: devuelve /assets/image.jpg
 * - En producción (GitHub Pages): devuelve /HURLINGHAM_PNO_REACT/assets/image.jpg
 * 
 * PARÁMETROS:
 * @param {string} path - Ruta del asset relativa a carpeta public (ej: "/assets/image.jpg")
 * 
 * RETORNA:
 * @returns {string} - Ruta completa con el base URL
 * 
 * USO:
 * import { getAssetPath } from '../utils/assetPath.js';
 * <img src={getAssetPath("/assets/logo.png")} />
 * =============================================================================
 */
export const getAssetPath = (path) => {
    // Remover slash inicial si existe para evitar dobles slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // import.meta.env.BASE_URL ya incluye el trailing slash
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
