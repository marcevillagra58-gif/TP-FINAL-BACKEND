/**
 * ============================================================================
 * ARCHIVO DE DATOS: carouselData.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Array de objetos con las imágenes y descripciones para el carrusel
 * de lugares emblemáticos de Hurlingham.
 * 
 * USADO POR:
 * - Carousel.jsx (importa y renderiza las imágenes)
 * 
 * ESTRUCTURA DE DATOS:
 * - Array de objetos con:
 *   - imagePath: Ruta completa a la imagen (usando getAssetPath)
 *   - description: Texto descriptivo de la imagen
 * 
 * ============================================================================
 */

import { getAssetPath } from '../utils/assetPath.js';

export const carouselImages = [
    { imagePath: getAssetPath("/assets/Carrusel/imagen 1.jpg"), description: "Centro Cultural Leopoldo Marechal" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 10.jpg"), description: "Centro Comercial Peseo Florido" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 2.jpg"), description: "Estación Hurlingham" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 3.jpg"), description: "Edificio Municipal de noche" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 4.jpg"), description: "Hospital San Bernardino" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 5.jpg"), description: "Edificio Municipal" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 6.jpg"), description: "Parroquia Nuestra Señora del Camino" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 7.jpeg"), description: "Plaza Jhon Ravenscroft" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 8.webp"), description: "Hurlingham Club" },
    { imagePath: getAssetPath("/assets/Carrusel/imagen 9.jpg"), description: "Universidad de Hurlingham" }
];
