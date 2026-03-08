import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: MuralGallery
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Galería en grid para mostrar murales de la ciudad. Renderiza imágenes
 * en un layout de cuadrícula con clases dinámicas para posicionamiento.
 * 
 * RECIBE DATOS DE:
 * - CulturaPage.jsx o página que muestra murales
 * - Props con array de murales
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - murals {Array}: Array de objetos {id, imageUrl, alt}
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Gallery grid component for displaying murals
 * @param {Object} props
 * @param {Array} props.murals - Array of mural objects with id, imageUrl, and alt
 */
const MuralGallery = ({ murals }) => {
    return (
        <div className="parent">
            {murals.map((mural, index) => (
                <div key={mural.id} className={`div${index + 1}`}>
                    <img src={mural.imageUrl} alt={mural.alt} />
                </div>
            ))}
        </div>
    );
};

export default MuralGallery;
