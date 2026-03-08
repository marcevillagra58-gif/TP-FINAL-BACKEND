import React from 'react';
import Producers from '../components/Producers';
import '../css/mercadolingham.css';
import Escritor from '../components/Escritor';

/**
 * ============================================================================
 * PÁGINA: MercadolinghamPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página de MercadoLingham - marketplace local que conecta productores
 * con clientes. Vidriera de contacto sin intermediación en transacciones.
 * 
 * RUTA:
 * - /mercadolingham
 * 
 * FUNCIONALIDADES:
 * - Título animado "MercadoLingham"
 * - Explicación de misión y objetivos
 * - Directorio completo de productores locales
 * - Call-to-action para productores que quieren sumarse
 * - Aclaraciones legales sobre responsabilidades
 * 
 * SECCIONES:
 * 1. Header: Título y tagline
 * 2. Misión: Explicación del propósito
 * 3. Directorio: Lista de productores (componente Producers)
 * 4. Call-to-action: Invitación a sumarse
 * 5. Footer: Aclaraciones legales
 * 
 * ACLARACIONES:
 * - No intermediación en transacciones
 * - Responsabilidad exclusiva de productor y cliente
 * - Vidriera de contacto solamente
 * 
 * COMPONENTES:
 * - Escritor: Título animado
 * - Producers: Lista de productores con carga de API
 * ============================================================================
 */

const MercadolinghamPage = () => {
    return (
        <div className="mercadolingham-container">
            <div className="mercadolingham-header">
                {/* <h1>MercadoLingham</h1> */}
                <Escritor
                    texto="MercadoLingham"
                    tamano={50}
                    color="green"
                />
                <p>Formando puentes entre <span className="highlighted-text">productores locales</span> y sus potenciales <span className="highlighted-text">clientes</span>.</p>
            </div>

            <section className="mercadolingham-intro">
                <h2>Nuestra Misión</h2>
                <p>
                    Este es un espacio pensado para tender un puente directo entre los emprendedores y productores de nuestra ciudad y vos.
                    El objetivo es simple: facilitar el contacto para que puedas conocer y adquirir lo que se hace en Hurlingham, apoyando la economía local sin intermediarios.
                </p>
            </section>

            <section className="producer-directory">
                <h2>Directorio de Productores</h2>
                <Producers />
            </section>

            <section className="call-to-action">
                <h2>¿Sos productor y querés sumarte?</h2>
                <p>
                    Si producís en Hurlingham y te gustaría ser parte de este directorio, ¡nos encantaría conocerte!
                    Comunicate con nosotros a través del "formulario de contacto" al pie de la página para que podamos agregarte.
                </p>
            </section>

            <div className="mercadolingham-footer">
                <p>
                    <strong>Aclaración:</strong> "Mercadolingham" es una vidriera de contacto.
                    No intervenimos en las transacciones comerciales, pagos o entregas, las cuales son responsabilidad exclusiva del productor y el cliente.
                </p>
            </div>
        </div>
    );
};

export default MercadolinghamPage;
