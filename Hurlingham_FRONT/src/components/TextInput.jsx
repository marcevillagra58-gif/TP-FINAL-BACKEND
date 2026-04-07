import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: TextInput
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Input de texto reutilizable con label y soporte para diferentes tipos.
 * Componente controlado para formularios.
 * 
 * RECIBE DATOS DE:
 * - LoginForm.jsx, CreateUserModal.jsx y otros formularios
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de input puro)
 * 
 * PROPS:
 * - id {string}: ID del input
 * - type {string}: Tipo de input (default: 'text')
 * - value {string}: Valor del input
 * - onChange {Function}: Handler de cambio
 * - label {string}: Texto del label
 * - placeholder {string}: Placeholder del input
 * - required {boolean}: Si el campo es requerido
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable text input component
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} props.type - Input type (default: 'text')
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Input label text
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Whether field is required
 */
const TextInput = ({
    id,
    type = 'text',
    value,
    onChange,
    label,
    placeholder = '',
    required = false
}) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default TextInput;
