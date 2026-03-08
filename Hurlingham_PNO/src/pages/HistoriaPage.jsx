import React, { useState } from 'react';
import '../css/historia.css';
import Escritor from '../components/Escritor';
import HistoriaMap from '../components/HistoriaMap';
import HistoriaModal from '../components/HistoriaModal';
import { historiaData } from '../data/historiaData';

/**
 * ============================================================================
 * PÁGINA: HistoriaPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página de historia de Hurlingham con mapa interactivo y modales informativos.
 * Muestra 3 localidades: Hurlingham, Villa Tesei, William Morris.
 * 
 * RUTA:
 * - /historia
 * 
 * FUNCIONALIDADES:
 * - Título animado "HURLINGHAM: Su Historia"
 * - Descripción general de la historia
 * - Mapa interactivo con hotspots clicables
 * - Modales con información detallada de cada localidad
 * - Galería de imágenes históricas por localidad
 * 
 * INTERACTIVIDAD:
 * - Click en hotspot → abre modal con datos de localidad
 * - Modal muestra: título, descripción, 2 imágenes históricas
 * - Botón cerrar (×) para cerrar modal
 * 
 * DATOS:
 * - historiaData desde src/data/historiaData.js
 * 
 * ESTADO:
 * - activeLocality: Localidad actualmente seleccionada (null si ninguna)
 * 
 * COMPONENTES:
 * - Escritor: Título animado
 * - HistoriaMap: Mapa con hotspots
 * - HistoriaModal: Modal de información
 * ============================================================================
 */

const HistoriaPage = () => {
  const [activeLocality, setActiveLocality] = useState(null);

  const handleHotspotClick = (locality) => {
    setActiveLocality(locality);
  };

  const closeModal = () => {
    setActiveLocality(null);
  };

  return (
    <>
      <div className="container">
        <div className="main-content historia-main-content">
          <Escritor
            texto={historiaData.title}
            tamano={35}
            color="yellow"
          />
          <p className="mapa-text">{historiaData.description}</p>

          <HistoriaMap
            mapImage={historiaData.mapImage}
            localities={historiaData.localities}
            onHotspotClick={handleHotspotClick}
          />
        </div>
      </div>

      <HistoriaModal
        locality={activeLocality}
        onClose={closeModal}
      />
    </>
  );
};

export default HistoriaPage;