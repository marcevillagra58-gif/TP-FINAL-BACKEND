import React from 'react';
import InstitutionCard from './InstitutionCard';

/**
 * ============================================================================
 * COMPONENTE: AtomOrbit
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Renderiza una órbita circular individual con instituciones distribuidas
 * uniformemente. Maneja la rotación animada de la órbita mientras mantiene
 * las imágenes de las instituciones en posición vertical.
 * 
 * RECIBE DATOS DE:
 * - AtomicVisualization.jsx (componente padre que pasa props)
 * - educacionData.js (datos de instituciones en la órbita)
 * 
 * PROPORCIONA DATOS A:
 * - InstitutionCard.jsx (pasa name, image, link, size)
 * 
 * PROPS:
 * - radius {number}: Radio de la órbita en píxeles
 * - institutions {Array}: Array de objetos de instituciones
 * - orbitIndex {number}: Índice de la órbita para calcular desfase de rotación
 * 
 * DEPENDENCIAS:
 * - InstitutionCard: Renderiza cada institución como tarjeta circular clickeable
 * ============================================================================
 */

/**
 * Componente de órbita atómica con instituciones rotatorias
 * @param {Object} props
 * @param {number} props.radius - Radio de la órbita en píxeles
 * @param {Array} props.institutions - Array de objetos de institución
 * @param {number} props.orbitIndex - Índice para el retraso de la animación
 */
const AtomOrbit = ({ radius, institutions, orbitIndex }) => {
    // Calcular desplazamiento de rotación inicial basado en el índice de órbita (0, 120, 240 grados)
    // Agregar 30 grados extra a la 3ra órbita (índice 2) para evitar alineación con órbitas internas
    const initialRotation = orbitIndex * 120 + (orbitIndex === 2 ? 30 : 0);
    const angleStep = 360 / institutions.length;

    return (
        <div
            className="atom-orbit-wrapper"
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${initialRotation}deg)`,
                pointerEvents: 'none'
            }}
        >
            <div className="atom-orbit-animator" style={{ width: '100%', height: '100%' }}>
                {institutions.map((institution, index) => {
                    const angle = angleStep * index;

                    return (
                        <div
                            key={institution.id}
                            className="orbit-item"
                            style={{
                                transform: `rotate(${angle}deg) translateX(${radius}px)`,
                            }}
                        >
                            {/* 1. Animación de contra-rotación para cancelar la rotación de la órbita padre */}
                            <div className="orbit-counter-rotator">
                                {/* 2. Contra-rotación estática para cancelar el ángulo de colocación Y la rotación inicial de la órbita */}
                                <div
                                    className="orbit-static-fixer"
                                    style={{
                                        transform: `rotate(-${angle + initialRotation}deg)`,
                                    }}
                                >
                                    <InstitutionCard
                                        name={institution.name}
                                        image={institution.image}
                                        link={institution.link}
                                        size={70} // Tamaño reducido para evitar superposición
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AtomOrbit;
