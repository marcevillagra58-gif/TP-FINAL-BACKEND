import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: HistoriaMap
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Mapa interactivo con hotspots clicables para cada localidad de Hurlingham.
 * Muestra el mapa base y áreas clicables posicionadas con coordenadas.
 * 
 * RECIBE DATOS DE:
 * - HistoriaPage.jsx (componente padre que pasa datos)
 * - historiaData.js (datos de localidades y posiciones de hotspots)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - mapImage {string}: URL de la imagen del mapa
 * - localities {Array}: Array de objetos de localidades con hotspot styles
 * - onHotspotClick {Function}: Handler al hacer clic en hotspot
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

const HistoriaMap = ({ mapImage, localities, onHotspotClick }) => {
    return (
        <div className="map-container">
            <img className="mapa" src={mapImage} alt="Mapa de ciudades" />
            {localities.map((locality) => (
                <div
                    key={locality.id}
                    className="hotspot"
                    onClick={() => onHotspotClick(locality)}
                    style={locality.hotspot}
                ></div>
            ))}
        </div>
    );
};

export default HistoriaMap;
