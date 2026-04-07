import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: PasswordToggleButton
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Botón toggle con iconos de ojo para mostrar/ocultar contraseñas.
 * Botón accesible con aria-label y estados visuales claros.
 * 
 * RECIBE DATOS DE:
 * - PasswordInput.jsx (componente padre)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de UI puro)
 * 
 * PROPS:
 * - showPassword {boolean}: Estado de visibilidad de contraseña
 * - onToggle {Function}: Handler para cambiar estado
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable password toggle button with eye icons
 * @param {Object} props
 * @param {boolean} props.showPassword - Whether password is currently visible
 * @param {Function} props.onToggle - Handler for toggle action
 */
const PasswordToggleButton = ({ showPassword, onToggle }) => {
    return (
        <button
            type="button"
            className="toggle-password-btn"
            onClick={onToggle}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
            {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )}
        </button>
    );
};

export default PasswordToggleButton;
