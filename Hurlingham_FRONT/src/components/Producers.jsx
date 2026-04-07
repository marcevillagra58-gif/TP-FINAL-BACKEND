import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/mercadolingham.css";
import { API_ML } from "../utils/API";

const PLACEHOLDER_AVATAR = `${import.meta.env.BASE_URL}placeholder_avatar.png`;

/**
 * COMPONENTE: Producers
 * Lista de productores del MercadoLingham.
 * Props:
 *   categoryFilter {string} - categoría seleccionada ('' = todos)
 *   onCategoriesReady {Function} - callback con array de nombres de categorías activas
 */
const Producers = ({ categoryFilter = "", onCategoriesReady }) => {
  const navigate = useNavigate();
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await fetch(API_ML);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducers(data);

        // Derivar categorías únicas con productores activos y notificar al padre
        if (onCategoriesReady) {
          const seen = new Set();
          const cats = [];
          data.forEach((p) => {
            if (p.category) {
              const lower = p.category.toLowerCase();
              if (!seen.has(lower)) {
                seen.add(lower);
                cats.push(lower);
              }
            }
          });
          onCategoriesReady(cats);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducers();
  }, []);

  if (loading) return <div>Cargando productores...</div>;
  if (error) return <div>Error al cargar los productores: {error.message}</div>;

  const filtered = categoryFilter
    ? producers.filter((p) => p.category?.toLowerCase() === categoryFilter.toLowerCase())
    : producers;

  if (filtered.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
        No hay productores en esta categoría.
      </p>
    );
  }

  return (
    <div className="producer-list">
      {filtered.map((producer) => (
        <div key={producer._id} className="producer-card">
          <img
            src={producer.imageUrl || PLACEHOLDER_AVATAR}
            alt={producer.name}
            className="producer-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = PLACEHOLDER_AVATAR;
            }}
          />
          <div className="producer-info">
            <h3>{producer.name}</h3>
            <p>{producer.description}</p>
            {(producer.phone || producer.email) && <strong>Contacto:</strong>}
            {producer.phone && <p>{producer.phone}</p>}
            {producer.email && <p>{producer.email}</p>}
            <button
              onClick={() => navigate(`/mercadolingham/producer/${producer._id}`)}
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
