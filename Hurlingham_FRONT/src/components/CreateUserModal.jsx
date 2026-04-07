import React, { useState } from "react";
import { useCategorias } from "../hooks/useCategorias";

const PLACEHOLDER_AVATAR = `${import.meta.env.BASE_URL}placeholder_avatar.png`;

/**
 * ============================================================================
 * COMPONENTE: CreateUserModal
 * ============================================================================
 * Modal para creación de nuevos usuarios. Si el rol es "producer", muestra
 * un <select> de categoría cargado dinámicamente desde la API.
 * ============================================================================
 */
const CreateUserModal = ({
  isOpen,
  onClose,
  onCreate,
  uploading,
  imageUrl,
  onImageUpload,
}) => {
  const { categorias, loading: cargandoCats } = useCategorias();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    avatar: "",
    role: "producer",
    category: "",
  });
  const [uploadError, setUploadError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.name || !formData.email) {
      alert("Por favor completa usuario, nombre público y email.");
      return;
    }

    const finalAvatar = imageUrl || null;
    onCreate({ ...formData, avatar: finalAvatar });
    setFormData({
      username: "",
      name: "",
      email: "",
      avatar: "",
      role: "producer",
      category: "",
    });
    setUploadError("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError("");
      try {
        await onImageUpload(file);
      } catch (err) {
        setUploadError(
          err.message ||
            "Error al subir la imagen. Probá con una imagen más pequeña (máx. 10 MB) en formato JPG, PNG o WebP.",
        );
      }
    }
  };

  const handleClose = () => {
    setFormData({
      username: "",
      name: "",
      email: "",
      avatar: "",
      role: "producer",
      category: "",
    });
    setUploadError("");
    onClose();
  };

  const selectStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "inherit",
    fontSize: "1rem",
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario para ingreso</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Ej: milagritos123 (sin espacios)"
            />
          </div>
          <div className="form-group">
            <label>Nombre Público / Marca</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ej: Panadería Los Milagros"
            />
          </div>
          <div className="form-group">
            <label>Email (para recuperación de contraseña)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Ej: panaderia@gmail.com"
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value, category: "" })
              }
              style={selectStyle}
            >
              <option value="producer">Productor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Categoría — solo si es Productor */}
          {formData.role === "producer" && (
            <div className="form-group">
              <label>Categoría del Productor</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                style={selectStyle}
                disabled={cargandoCats}
              >
                <option value="">
                  {cargandoCats ? "Cargando categorías…" : "— Sin categoría —"}
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.icono} {cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Avatar (Opcional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && <p>Subiendo imagen...</p>}
            {uploadError && (
              <p style={{ color: "red", fontSize: "0.85rem", marginTop: "6px" }}>
                {uploadError}
              </p>
            )}
            {imageUrl && !uploadError && (
              <img
                src={imageUrl}
                alt="Preview"
                style={{ width: "50px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              CANCELAR
            </button>
            <button type="submit" className="save-btn" disabled={uploading}>
              GUARDAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
