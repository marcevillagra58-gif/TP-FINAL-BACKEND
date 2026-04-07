import React, { useState, useCallback } from 'react';
import Producers from '../components/Producers';
import '../css/mercadolingham.css';
import Escritor from '../components/Escritor';

const MercadolinghamPage = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [activeCategories, setActiveCategories] = useState([]);

    // Callback que nos llega desde Producers con las categorías que realmente tienen productores
    const handleCategoriesReady = useCallback((cats) => {
        setActiveCategories(cats);
    }, []);

    return (
        <div className="mercadolingham-container">
            <div className="mercadolingham-header">
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
                <div className="directory-header">
                    <h2>Directorio de Productores</h2>

                    {/* Filtro por categoría */}
                    <div className="category-filter">
                        <label htmlFor="cat-select" className="category-filter__label">
                            Ver categoría:
                        </label>
                        <select
                            id="cat-select"
                            className="category-filter__select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {activeCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Producers
                    categoryFilter={categoryFilter}
                    onCategoriesReady={handleCategoriesReady}
                />
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
