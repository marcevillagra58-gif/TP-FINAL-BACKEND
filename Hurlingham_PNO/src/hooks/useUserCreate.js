import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useUserCreate
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook para crear nuevos usuarios en el backend propio.
 * ============================================================================
 */

/** Convierte "doñapepa María" → "doapepa-maria" (válido para emails) */
const sanitizeForEmail = (name) =>
  name
    .normalize("NFD") // separa letras de sus diacríticos (ñ → n + ̃)
    .replace(/[\u0300-\u036f]/g, "") // elimina los diacríticos (tildes, ñ, etc.)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // elimina todo lo que no sea letra o número
    .slice(0, 30) || "usuario"; // máximo 30 chars, fallback por si queda vacío

export const useUserCreate = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createUser = async (userData) => {
    setIsCreating(true);
    try {
      // 1. Crear usuario en el backend (Supabase)
      const generatedPassword = userData.password || "123456Aa";
      const sanitizedName = sanitizeForEmail(userData.name);

      const userPayload = {
        username: userData.name,
        email: userData.email || `${sanitizedName}@test.com`,
        password: generatedPassword,
        role: userData.role || "user",
        avatar: userData.avatar || null,
      };

      // Enviar con apiFetch para incluir el token del admin
      const response = await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const createdUser = await response.json();

      setIsCreating(false);
      // Devolvemos también la contraseña para que el admin pueda verla
      return { ...createdUser, generatedPassword };
    } catch (err) {
      console.error("Error creating user:", err);
      alert(err.message || "Error al crear usuario.");
      setIsCreating(false);
      return null;
    }
  };

  return { isCreating, createUser };
};
