import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useUserDelete
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook para eliminar usuarios en el backend propio.
 * ============================================================================
 */

export const useUserDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async (userOrId) => {
    // Soporta tanto recibir el objeto user completo como un id directo
    const userId = userOrId?.id ?? userOrId;

    if (!userId) {
      alert("No se pudo identificar el usuario a eliminar.");
      return false;
    }

    setIsDeleting(true);
    try {
      const response = await apiFetch(`/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      setIsDeleting(false);
      return true;
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.message || "Error al eliminar usuario.");
      setIsDeleting(false);
      return false;
    }
  };

  return { isDeleting, deleteUser };
};
