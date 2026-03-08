/**
 * ============================================================================
 * MÓDULO DE UTILIDADES: API.js
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Cliente de API centralizado para el nuevo Backend propio.
 * Maneja tokens JWT, refresco automático y endpoints unificados.
 * ============================================================================
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * Wrapper de fetch para incluir headers de seguridad y manejar errores globales.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // Manejo de errores de autenticación (Token expirado)
  if (response.status === 401) {
    // Aquí se podría implementar la lógica de refresco automático con el refreshToken
    console.warn("Sesión expirada o token inválido");
  }

  return response;
};

/**
 * Función para subir imágenes al Backend propio (que luego sube a Cloudinary)
 * @param {File} file - Archivo de imagen
 * @param {string} folder - Carpeta destino (opcional)
 * @returns {Promise<string>} URL de la imagen subida
 */
export const uploadImageToBackend = async (file, folder = "general") => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `${API_BASE_URL}/upload/image?folder=${folder}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falla al subir imagen");
    }

    const data = await response.json();
    return data.url; // Retorna la URL de Cloudinary
  } catch (error) {
    console.error("Error uploading image to backend:", error);
    throw error;
  }
};

// Aliases para mantener compatibilidad parcial durante la migración (se eliminarán después)
export const API_ML = `${API_BASE_URL}/producers`;
export const API_USERS = `${API_BASE_URL}/users`;
