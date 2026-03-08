/**
 * ============================================================================
 * MÓDULO DE CONSTANTES: authErrors.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Constantes de mensajes de error para autenticación.
 * Centraliza textos de error para consistencia en toda la app.
 * 
 * EXPORT:
 * - AUTH_ERRORS: Objeto con mensajes de error de autenticación
 * 
 * ERRORES DEFINIDOS:
 * - INVALID_CREDENTIALS: Usuario o contraseña incorrectos
 * - USER_BLOCKED: Usuario inhabilitado (requiere contacto con admin)
 * - CONNECTION_ERROR: Error de conexión con servicio de auth
 * 
 * USADO POR:
 * - useAuthValidation.js (validación de credenciales)
 * - AuthContext.jsx (manejo de errores de login)
 * - LoginForm.jsx (display de errores)
 * 
 * PATRÓN:
 * - Centralización de strings
 * - Facilita i18n futura
 * - Consistencia de mensajes
 * ============================================================================
 */

/**
 * Authentication error messages constants
 */
export const AUTH_ERRORS = {
    INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos.',
    USER_BLOCKED: 'Usuario temporalmente inhabilitado, comuníquese con el administrador a través del formulario de contacto.',
    CONNECTION_ERROR: 'Error al conectar con el servicio de autenticación.',
};
