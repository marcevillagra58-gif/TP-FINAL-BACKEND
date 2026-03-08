import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: HistoriaModal
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Modal que muestra información histórica detallada de una localidad.
 * Incluye título, descripción y galería de imágenes históricas.
 * 
 * RECIBE DATOS DE:
 * - HistoriaPage.jsx (componente padre que controla estado del modal)
 * - historiaData.js (datos de título, descripción e imágenes)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - locality {Object}: Objeto con {id, title, description, images}
 * - onClose {Function}: Handler para cerrar el modal
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

const HistoriaModal = ({ locality, onClose }) => {
    if (!locality) return null;

    return (
        <div id={`${locality.id}-info`} className="info-modal show">
            <div>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>{locality.title}</h2>
                <p>{locality.description}</p>
                {locality.images.map((imgSrc, index) => (
                    <img
                        key={index}
                        src={imgSrc}
                        alt={`foto-historica ${locality.title} ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HistoriaModal;
