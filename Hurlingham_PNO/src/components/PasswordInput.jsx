import React, { useState } from 'react';
import PasswordToggleButton from './PasswordToggleButton';

/**
 * ============================================================================
 * COMPONENTE: PasswordInput
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Input de contraseña reutilizable con funcionalidad de mostrar/ocultar.
 * Incluye botón toggle para alternar visibilidad de la contraseña.
 * 
 * RECIBE DATOS DE:
 * - LoginForm.jsx, PasswordModal.jsx y otros formularios de autenticación
 * 
 * PROPORCIONA DATOS A:
 * - PasswordToggleButton.jsx (pasa showPassword y onToggle)
 * 
 * PROPS:
 * - id {string}: ID del input (default: 'password')
 * - value {string}: Valor del input
 * - onChange {Function}: Handler de cambio
 * - label {string}: Texto del label (default: 'Contraseña')
 * - required {boolean}: Si el campo es requerido
 * 
 * DEPENDENCIAS:
 * - PasswordToggleButton: Botón para toggle de visibilidad
 * ============================================================================
 */

/**
 * Reusable password input with toggle visibility
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Input label text
 * @param {boolean} props.required - Whether field is required
 */
const PasswordInput = ({ id = 'password', value, onChange, label = 'Contraseña', required = false }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group password-group">
            <label htmlFor={id}>{label}</label>
            <div className="password-input-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                <PasswordToggleButton
                    showPassword={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                />
            </div>
        </div>
    );
};

export default PasswordInput;
