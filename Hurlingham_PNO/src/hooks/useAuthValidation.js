import { API_BASE_URL } from "../utils/API";
import { AUTH_ERRORS } from "../utils/authErrors";

/**
 * ============================================================================
 * MÓDULO DE UTILIDADES: useAuthValidation
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Funciones de validación de autenticación contra el CULTO BACKEND PROPIO.
 * Implementa el flujo de login con JWT.
 * ============================================================================
 */

/**
 * Valida credenciales contra el backend real.
 * @param {string} email - Email del usuario (reemplaza 'name' de MockAPI)
 * @param {string} password - Contraseña en texto plano
 */
export const validateUserCredentials = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      // data contiene: { accessToken, refreshToken, user }
      return {
        success: true,
        userData: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        error: null,
      };
    } else {
      // Manejar errores específicos del backend
      let errorMessage = AUTH_ERRORS.INVALID_CREDENTIALS;

      if (data.error === "Usuario bloqueado. Contactá al administrador.") {
        errorMessage = AUTH_ERRORS.USER_BLOCKED;
      }

      return {
        success: false,
        userData: null,
        error: errorMessage,
      };
    }
  } catch (err) {
    console.error("Auth validation error:", err);
    return {
      success: false,
      userData: null,
      error: AUTH_ERRORS.CONNECTION_ERROR,
    };
  }
};
