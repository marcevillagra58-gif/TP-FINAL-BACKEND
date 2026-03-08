import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: ProducerHeader
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Header de página de productor con nombre, descripción y botones de acción.
 * Alterna entre modo visualización y edición, mostrando inputs editables.
 * 
 * RECIBE DATOS DE:
 * - ProducerDetailsPage.jsx (componente padre)
 * - useProducerEdit hook (para datos de edición)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de presentación)
 * 
 * PROPS:
 * - producer {Object}: Datos del productor
 * - isEditing {boolean}: Estado de modo edición
 * - isOwner {boolean}: Si el usuario actual es el dueño
 * - editFormData {Object}: Datos del formulario de edición
 * - onEditClick {Function}: Handler para botón editar
 * - onPasswordClick {Function}: Handler para cambio de contraseña
 * - onInputChange {Function}: Handler para cambios en inputs
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Reusable component for producer header with edit functionality
 * @param {Object} props
 * @param {Object} props.producer - Producer data object
 * @param {boolean} props.isEditing - Whether edit mode is active
 * @param {boolean} props.isOwner - Whether current user is the owner
 * @param {Object} props.editFormData - Form data for editing
 * @param {Function} props.onEditClick - Handler for edit button click
 * @param {Function} props.onPasswordClick - Handler for password change button click
 * @param {Function} props.onInputChange - Handler for input changes
 */
const ProducerHeader = ({
    producer,
    isEditing,
    isOwner,
    editFormData,
    onEditClick,
    onPasswordClick,
    onInputChange
}) => {
    return (
        <div className="producer-header">
            <div className="producer-header-content">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={onInputChange}
                            className="edit-producer-name"
                            placeholder="Nombre del Productor"
                        />
                        <textarea
                            name="description"
                            value={editFormData.description}
                            onChange={onInputChange}
                            className="edit-producer-description"
                            placeholder="Descripción"
                        />
                    </>
                ) : (
                    <>
                        <h1>{producer.name}</h1>
                        <p>{producer.description}</p>
                    </>
                )}
            </div>
            {isOwner && (
                <>
                    <button
                        className="edit-producer-btn"
                        onClick={onEditClick}
                        style={{ right: '260px' }}
                    >
                        {isEditing ? 'Finalizar Edición' : 'Editar'}
                    </button>
                    <button
                        className="edit-producer-btn"
                        onClick={onPasswordClick}
                        style={{
                            right: '20px',
                            background: 'linear-gradient(135deg, #eddd53 0%, #e89c3c 100%)',
                            boxShadow: '0 4px 15px rgba(237, 221, 83, 0.4)'
                        }}
                    >
                        Cambiar Contraseña
                    </button>
                </>
            )}
        </div>
    );
};

export default ProducerHeader;
