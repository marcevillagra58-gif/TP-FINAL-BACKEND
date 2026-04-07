import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: InstitutionCard
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Tarjeta circular clickeable que representa una institución educativa.
 * Abre el enlace de la institución en una nueva pestaña al hacer clic.
 * 
 * RECIBE DATOS DE:
 * - AtomOrbit.jsx (componente padre en órbitas)
 * - AtomicVisualization.jsx (componente padre para institución central)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente terminal/hoja)
 * 
 * PROPS:
 * - name {string}: Nombre de la institución
 * - image {string}: URL de la imagen de la institución
 * - link {string}: Enlace externo a la página de la institución
 * - size {number}: Diámetro del círculo en píxeles (default: 120)
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Circular institution card component
 * @param {Object} props
 * @param {string} props.name - Institution name
 * @param {string} props.image - Image URL
 * @param {string} props.link - External link
 * @param {number} props.size - Circle diameter in pixels
 */
const InstitutionCard = ({ name, image, link, size = 120 }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="institution-card"
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
            title={name}
        >
            <img src={image} alt={name} />
        </a>
    );
};

export default InstitutionCard;
