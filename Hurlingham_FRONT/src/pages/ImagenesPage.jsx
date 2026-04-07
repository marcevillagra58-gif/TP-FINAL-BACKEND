import React from 'react';
import Carousel from '../components/Carousel';
import '../css/imagenes.css';

/**
 * ============================================================================
 * PÁGINA: ImagenesPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Galería de imágenes de lugares emblemáticos de Hurlingham.
 * Carrusel con efecto 3D coverflow de 10 imágenes.
 * 
 * RUTA:
 * - /imagenes
 * 
 * FUNCIONALIDADES:
 * - Carrusel Swiper con efecto coverflow
 * - 10 imágenes de lugares emblemáticos
 * - Navegación con flechas y paginación
 * - Descripciones de cada lugar
 * - Responsive con breakpoints
 * 
 * LUGARES MOSTRADOS:
 * - Centro Cultural Leopoldo Marechal
 * - Centro Comercial Paseo Florido
 * - Estación Hurlingham
 * - Edificio Municipal
 * - Hospital San Bernardino
 * - Y más...
 * 
 * COMPONENTES:
 * - Carousel: Carrusel completo con Swiper
 * ============================================================================
 */

const ImagenesPage = () => {
    return (
        <div>
            <Carousel />
        </div>
    );
};

export default ImagenesPage;