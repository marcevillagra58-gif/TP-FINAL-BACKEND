import React from 'react';
import Escritor from '../components/Escritor';
import AtomicVisualization from '../components/AtomicVisualization';
import { educationData } from '../data/educacionData';
import '../css/educacion.css';

/**
 * ============================================================================
 * PÁGINA: EducacionPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página de educación con visualización atómica de instituciones educativas.
 * Muestra UNaHur en el centro y 3 órbitas con instituciones alrededor.
 * 
 * RUTA:
 * - /educacion
 * 
 * FUNCIONALIDADES:
 * - Título animado "Educacion" con TextoManuscrito
 * - Visualización atómica interactiva con AtomicVisualization
 * - 3 órbitas giratorias con 17 instituciones educativas
 * - Links clicables a sitios de instituciones
 * 
 * DATOS:
 * - educationData desde src/data/educacionData.js
 * 
 * COMPONENTES:
 * - Escritor/TextoManuscrito: Título animado
 * - AtomicVisualization: Sistema completo de visualización
 * ============================================================================
 */

const EducacionPage = () => {
    return (
        <div className="educacion-page">
            <div className="educacion-container">
                <Escritor
                    texto="Instituciones Educativas de Hurlingham"
                    tamano={50}
                    color="white"
                />

                <AtomicVisualization data={educationData} />
            </div>
        </div>
    );
};

export default EducacionPage;
