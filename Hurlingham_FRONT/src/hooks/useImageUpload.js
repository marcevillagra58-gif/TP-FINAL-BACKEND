import { useState } from "react";
import { uploadImageToBackend } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useImageUpload
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook refactorizado para el nuevo backend propio.
 * Usa uploadImageToBackend para subir imágenes a Cloudinary via Node.js.
 * ============================================================================
 */

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);
    try {
      // Usamos la nueva utilidad del backend
      const url = await uploadImageToBackend(file, "avatars");
      setImageUrl(url);
      return url;
    } catch (err) {
      setError(err.message || "Error al subir la imagen");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setImageUrl(null);
    setError(null);
  };

  return {
    uploading,
    imageUrl,
    uploadImage,
    clearImage,
    error,
  };
};
