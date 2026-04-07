import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: DeleteConfirmModal
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Modal reutilizable de confirmación para operaciones de eliminación.
 * Muestra un mensaje de advertencia y botones de confirmación/cancelación.
 * 
 * RECIBE DATOS DE:
 * - ProductCarousel.jsx (para eliminar productos)
 * - AdminPage.jsx o UserCard.jsx (para eliminar usuarios)
 * - Cualquier componente que necesite confirmación de eliminación
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de UI puro)
 * 
 * PROPS:
 * - isOpen {boolean}: Controla la visibilidad del modal
 * - onClose {Function}: Handler para cerrar el modal
 * - onConfirm {Function}: Handler para confirmar la acción
 * - title {string}: Título del modal
 * - message {string}: Mensaje de confirmación
 * - itemName {string}: Nombre del item a eliminar (opcional)
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable confirmation modal for delete operations
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onConfirm - Handler for confirming the action
 * @param {string} props.title - Title of the modal
 * @param {string} props.message - Confirmation message
 * @param {string} props.itemName - Name of the item to delete (optional)
 */
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>
                    {message} {itemName && <strong>{itemName}</strong>}? Esta acción no se puede deshacer.
                </p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>CANCELAR</button>
                    <button className="delete-btn" onClick={onConfirm}>ELIMINAR</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
