import React from "react";
import { useCategorias } from "../hooks/useCategorias";

const PLACEHOLDER_AVATAR = `${import.meta.env.BASE_URL}placeholder_avatar.png`;

/**
 * ============================================================================
 * COMPONENTE: ProducerInfo
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Sección de información del productor mostrando avatar y datos de contacto.
 * Alterna entre visualización y edición de contactos.
 *
 * RECIBE DATOS DE:
 * - ProducerDetailsPage.jsx (componente padre)
 * - useProducerEdit hook (para datos de edición)
 *
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 *
 * PROPS:
 * - producer {Object}: Datos del productor {avatar, contact1, contact2}
 * - isEditing {boolean}: Estado de modo edición
 * - editFormData {Object}: Datos del formulario de edición
 * - onInputChange {Function}: Handler para cambios en inputs
 *
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable component for producer information section (avatar and contacts)
 * @param {Object} props
 * @param {Object} props.producer - Producer data object
 * @param {boolean} props.isEditing - Whether edit mode is active
 * @param {Object} props.editFormData - Form data for editing
 * @param {Function} props.onInputChange - Handler for input changes
 * @param {boolean} props.uploadingAvatar - Estado de carga del avatar
 * @param {Function} props.onAvatarUpload - Handler para carga de avatar
 */
const ProducerInfo = ({
  producer,
  isEditing,
  editFormData,
  uploadingAvatar,
  onInputChange,
  onAvatarUpload,
}) => {
  const { categorias } = useCategorias();
  return (
    <section className="producer-info-section">
      <div
        className="producer-avatar-container"
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        <img
          src={
            isEditing
              ? editFormData.avatar || producer.avatar || PLACEHOLDER_AVATAR
              : producer.avatar || PLACEHOLDER_AVATAR
          }
          alt={producer.name}
          className="producer-avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_AVATAR;
          }}
        />
        {isEditing && (
          <div style={{ marginTop: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                color: "#666",
                marginBottom: "5px",
              }}
            >
              Cambiar foto de perfil:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarUpload}
              style={{ fontSize: "0.85rem", maxWidth: "200px" }}
            />
            {uploadingAvatar && (
              <p
                style={{ fontSize: "0.85rem", color: "#666", marginTop: "5px" }}
              >
                Subiendo imagen...
              </p>
            )}
          </div>
        )}
      </div>

      <div className="producer-contact">
        {isEditing ? (
          <>
            <select
              name="location"
              value={editFormData.location}
              onChange={onInputChange}
              className="edit-producer-contact"
            >
              <option value="">— Seleccionar localidad —</option>
              <option value="Hurlingham">Hurlingham</option>
              <option value="William Morris">William Morris</option>
              <option value="Villa Tesei">Villa Tesei</option>
            </select>
            <select
              name="category"
              value={editFormData.category}
              onChange={onInputChange}
              className="edit-producer-contact"
            >
              <option value="">— Seleccionar categoría —</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.icono} {cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phone"
              value={editFormData.phone}
              onChange={onInputChange}
              className="edit-producer-contact"
              placeholder="Teléfono"
            />
            <input
              type="text"
              name="email"
              value={editFormData.email}
              onChange={onInputChange}
              className="edit-producer-contact"
              placeholder="Correo electrónico"
            />
          </>
        ) : (
          <>
            {producer.location && <p>📍 {producer.location}</p>}
            {producer.category && (() => {
              const catLower = producer.category.toLowerCase();
              const cat = categorias.find(c => c.nombre.toLowerCase() === catLower);
              const icono = cat ? cat.icono : '🏷️';
              return (
                <p>{icono} {catLower.charAt(0).toUpperCase() + catLower.slice(1)}</p>
              );
            })()}
            <p>{producer.phone}</p>
            <p>{producer.email}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default ProducerInfo;
