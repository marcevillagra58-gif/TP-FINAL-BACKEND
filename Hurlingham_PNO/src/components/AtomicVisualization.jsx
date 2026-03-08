import React from 'react';
import AtomOrbit from './AtomOrbit';
import InstitutionCard from './InstitutionCard';

/**
 * ============================================================================
 * COMPONENTE: AtomicVisualization
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Renderiza la visualización atómica completa de instituciones educativas,
 * mostrando una institución central y múltiples órbitas giratorias con
 * instituciones distribuidas en ellas.
 * 
 * RECIBE DATOS DE:
 * - EducacionPage.jsx (componente padre que pasa los datos)
 * - educacionData.js (estructura de datos con centro y órbitas)
 * 
 * PROPORCIONA DATOS A:
 * - AtomOrbit.jsx (pasa radius, institutions, orbitIndex)
 * - InstitutionCard.jsx (pasa name, image, link, size)
 * 
 * PROPS:
 * - data {Object}: Objeto con estructura { center, orbits }
 *   - center {Object}: Datos de la institución central
 *   - orbits {Array}: Array de órbitas con instituciones
 * 
 * DEPENDENCIAS:
 * - AtomOrbit: Renderiza cada órbita individual
 * - InstitutionCard: Renderiza cada institución como tarjeta circular
 * ============================================================================
 */

/**
 * Visualización atómica completa con centro y órbitas
 * @param {Object} props
 * @param {Object} props.data - Datos de educación con centro y órbitas
 */
const AtomicVisualization = ({ data }) => {
    return (
        <div className="atomic-visualization">
            {/* Institución central (UNaHur) */}
            <div className="atom-center">
                <InstitutionCard
                    name={data.center.name}
                    image={data.center.image}
                    link={data.center.link}
                    size={120}
                />
            </div>

            {/* Órbitas con instituciones */}
            {data.orbits.map((orbit, index) => (
                <AtomOrbit
                    key={orbit.id}
                    radius={orbit.radius}
                    institutions={orbit.institutions}
                    orbitIndex={index}
                />
            ))}
        </div>
    );
};

export default AtomicVisualization;
