import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/mercadolingham.css";
import { API_ML } from "../utils/API";

/**
 * ============================================================================
 * COMPONENTE: Producers
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Lista de productores del MercadoLingham. Carga y muestra todos los
 * productores con su información básica y botón para ver detalles.
 *
 * RECIBE DATOS DE:
 * - API_ML (MockAPI con lista de productores)
 * - ProductoresPage.jsx (componente padre)
 *
 * PROPORCIONA DATOS A:
 * - Ninguno (navegación a detalles via useNavigate)
 *
 * PROPS:
 * - Ninguna (obtiene datos de API directamente)
 *
 * DEPENDENCIAS:
 * - fetch: API nativa del browser
 * - API_ML: URL de API de productores
 * - useNavigate: Hook de react-router-dom para navegación
 * ============================================================================
 */

const Producers = () => {
  const navigate = useNavigate();
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await fetch(API_ML);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducers();
  }, []);

  if (loading) {
    return <div>Cargando productores...</div>;
  }

  if (error) {
    return <div>Error al cargar los productores: {error.message}</div>;
  }

  return (
    <div className="producer-list">
      {producers.map((producer) => (
        <div key={producer._id} className="producer-card">
          <img
            src={producer.imageUrl || "/placeholder-producer.png"}
            alt={producer.name}
            className="producer-image"
          />
          <div className="producer-info">
            <h3>{producer.name}</h3>
            <p>{producer.description}</p>
            {(producer.phone || producer.email) && <strong>Contacto:</strong>}
            {producer.phone && <p>{producer.phone}</p>}
            {producer.email && <p>{producer.email}</p>}
            <button
              onClick={() =>
                navigate(`/mercadolingham/producer/${producer._id}`)
              }
            >
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Producers;
