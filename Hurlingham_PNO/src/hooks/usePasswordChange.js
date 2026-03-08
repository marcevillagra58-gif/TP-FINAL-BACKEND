import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: usePasswordChange
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook refactorizado para el nuevo backend propio.
 * Usa el endpoint seguro PUT /api/users/:id/password.
 * ============================================================================
 */

export const usePasswordChange = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const setPasswordField = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Procesa el cambio de contraseña delegando la seguridad al backend.
   * @param {string} userId - UUID del usuario en Supabase
   */
  const handlePasswordChange = async (userId) => {
    // Validación en cliente
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas nuevas no coinciden.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      // Requisito de seguridad aumentado
      alert("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const response = await apiFetch(`/users/${userId}/password`, {
        method: "PUT",
        body: JSON.stringify({
          currentPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cambiar la contraseña.");
      }

      alert("Contraseña actualizada correctamente.");
      closePasswordModal();
    } catch (err) {
      console.error("Error changing password:", err);
      alert(err.message || "Error al cambiar la contraseña.");
    }
  };

  return {
    isPasswordModalOpen,
    passwordData,
    handlePasswordChange,
    openPasswordModal,
    closePasswordModal,
    setPasswordField,
  };
};
