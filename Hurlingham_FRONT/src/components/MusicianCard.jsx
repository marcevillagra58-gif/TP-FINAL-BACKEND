import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: MusicianCard
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Tarjeta clickeable para músicos o bandas locales. Muestra imagen, nombre
 * y enlace externo a perfiles o sitios relacionados.
 * 
 * RECIBE DATOS DE:
 * - CulturaPage.jsx o página de músicos locales
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - name {string}: Nombre del músico o banda
 * - imageUrl {string}: URL de la imagen
 * - link {string}: Enlace externo (redes, sitio web, etc.)
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable musician/band card component
 * @param {Object} props
 * @param {string} props.name - Musician or band name
 * @param {string} props.imageUrl - Image URL
 * @param {string} props.link - External link
 */
const MusicianCard = ({ name, imageUrl, link }) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>
            <img src={imageUrl} alt={`Logo ${name}`} />
            <span className="link-text">{name}</span>
        </a>
    );
};

export default MusicianCard;
