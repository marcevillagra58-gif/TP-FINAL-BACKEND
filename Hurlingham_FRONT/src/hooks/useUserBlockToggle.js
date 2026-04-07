import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useUserBlockToggle
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook para bloquear/desbloquear usuarios en el backend propio.
 * ============================================================================
 */

export const useUserBlockToggle = () => {
  const [isTogglingBlock, setIsTogglingBlock] = useState(false);

  const toggleUserBlock = async (user) => {
    setIsTogglingBlock(true);
    try {
      // El backend tiene un endpoint específico para esto
      const response = await apiFetch(`/users/${user.id}/block`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      // data.user contiene el objeto actualizado { id, username, is_blocked }

      setIsTogglingBlock(false);

      // Retornamos el usuario con el estado actualizado (mapeado a lo que el frontend espera si es necesario)
      // MockAPI usaba 'state', el backend usa 'is_blocked'
      return {
        ...user,
        is_blocked: data.user.is_blocked,
        state: !data.user.is_blocked, // Mantenemos compatible con UI si usa 'state'
      };
    } catch (err) {
      console.error("Error updating user state:", err);
      alert("Error al actualizar estado del usuario.");
      setIsTogglingBlock(false);
      return null;
    }
  };

  return { isTogglingBlock, toggleUserBlock };
};
