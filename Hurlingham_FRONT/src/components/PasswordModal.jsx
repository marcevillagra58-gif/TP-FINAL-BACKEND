import React from "react";
import PasswordInput from "./PasswordInput";

/**
 * ============================================================================
 * COMPONENTE: PasswordModal
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Modal para cambio de contraseña con validación de contraseña actual,
 * nueva contraseña y confirmación. Usado desde páginas de perfil de usuario.
 *
 * RECIBE DATOS DE:
 * - ProducerDetailsPage.jsx o páginas que usan usePasswordChange hook
 *
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de formulario)
 *
 * PROPS:
 * - isOpen {boolean}: Control de visibilidad del modal
 * - passwordData {Object}: {oldPassword, newPassword, confirmPassword}
 * - onPasswordChange {Function}: Handler para submit del formulario
 * - onClose {Function}: Handler para cerrar modal
 * - onFieldChange {Function}: Handler para cambios de campo (field, value)
 *
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable modal component for password change functionality
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Object} props.passwordData - Object with oldPassword, newPassword, confirmPassword
 * @param {Function} props.onPasswordChange - Handler for form submission
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onFieldChange - Handler for field changes (field, value)
 */
const PasswordModal = ({
  isOpen,
  passwordData,
  onPasswordChange,
  onClose,
  onFieldChange,
}) => {
  // Estado local para mostrar/ocultar las contraseñas
  const [showPasswords, setShowPasswords] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordChange();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            id="oldPassword"
            label="Contraseña Actual"
            value={passwordData.oldPassword}
            onChange={(e) => onFieldChange("oldPassword", e.target.value)}
            placeholder="Ingresa tu contraseña actual"
            required
          />
          <PasswordInput
            id="newPassword"
            label="Nueva Contraseña"
            value={passwordData.newPassword}
            onChange={(e) => onFieldChange("newPassword", e.target.value)}
            placeholder="Mín. 8 caracteres, mayúscula y número"
            required
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirmar Nueva Contraseña"
            value={passwordData.confirmPassword}
            onChange={(e) => onFieldChange("confirmPassword", e.target.value)}
            placeholder="Confirma tu nueva contraseña"
            required
          />
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              CANCELAR
            </button>
            <button type="submit" className="save-btn">
              CAMBIAR CONTRASEÑA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
