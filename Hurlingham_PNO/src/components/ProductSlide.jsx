import React from 'react';
import ImageUploadSection from './ImageUploadSection';

/**
 * ============================================================================
 * COMPONENTE: ProductSlide
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Slide individual de producto dentro del carrusel. Alterna entre modo
 * visualización y modo edición, mostrando la información del producto o
 * formularios editables según el estado.
 * 
 * RECIBE DATOS DE:
 * - ProductCarousel.jsx (componente padre que pasa todas las props)
 * - useProductCarousel hook (estado y handlers)
 * 
 * PROPORCIONA DATOS A:
 * - ImageUploadSection.jsx (pasa image, uploading, onImageUpload, inputId)
 * 
 * PROPS:
 * - product {Object}: Datos del producto actual
 * - index {number}: Índice del producto en el array
 * - editingIndex {number}: Índice del producto en edición (-1 si ninguno)
 * - editForm {Object}: Datos del formulario de edición {name, description, image}
 * - isEditing {boolean}: Indica si el carrusel está en modo edición
 * - uploading {boolean}: Estado de carga de imagen
 * - onEditClick {Function}: Handler para activar modo edición
 * - onSaveClick {Function}: Handler para guardar cambios
 * - onCancelClick {Function}: Handler para cancelar edición
 * - onDeleteClick {Function}: Handler para eliminar producto
 * - onInputChange {Function}: Handler para cambios en inputs
 * - onImageUpload {Function}: Handler para carga de imagen
 * 
 * DEPENDENCIAS:
 * - ImageUploadSection: Componente de carga de imagen reutilizable
 * ============================================================================
 */

/**
 * Componente de slide de producto individual
 * @param {Object} product - Datos del producto
 * @param {number} index - Índice del producto
 * @param {number} editingIndex - Índice del producto en edición
 * @param {Object} editForm - Datos del formulario de edición
 * @param {boolean} isEditing - Indica si el carrusel está en modo edición
 * @param {boolean} uploading - Estado de carga de imagen
 * @param {Function} onEditClick - Handler de clic en editar
 * @param {Function} onSaveClick - Handler de clic en guardar
 * @param {Function} onCancelClick - Handler de clic en cancelar
 * @param {Function} onDeleteClick - Handler de clic en eliminar
 * @param {Function} onInputChange - Handler de cambio en inputs
 * @param {Function} onImageUpload - Handler de carga de imagen
 */
const ProductSlide = ({
    product,
    index,
    editingIndex,
    editForm,
    isEditing,
    uploading,
    onEditClick,
    onSaveClick,
    onCancelClick,
    onDeleteClick,
    onInputChange,
    onImageUpload
}) => {
    const isCurrentlyEditing = editingIndex === index;

    return (
        <div className="slide-content-wrapper">
            <div className="img-card">
                {isCurrentlyEditing ? (
                    <ImageUploadSection
                        image={editForm.image}
                        uploading={uploading}
                        onImageUpload={onImageUpload}
                        inputId={`file-input-${index}`}
                    />
                ) : (
                    <img src={product.image} alt={product.name} />
                )}

                <div className="product-info-carousel">
                    {isCurrentlyEditing ? (
                        <div className="edit-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del producto"
                                value={editForm.name}
                                onChange={onInputChange}
                                className="edit-input-name"
                            />
                            <textarea
                                name="description"
                                placeholder="Descripción del producto"
                                value={editForm.description}
                                onChange={onInputChange}
                                className="edit-input-desc"
                            />
                        </div>
                    ) : (
                        <>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Acciones Externas */}
            {isEditing && (
                <div className="external-actions">
                    {isCurrentlyEditing ? (
                        <>
                            <button
                                className="cancel-btn-card swiper-no-swiping"
                                onClick={() => onCancelClick(product)}
                            >
                                CANCELAR
                            </button>
                            <button
                                className="save-btn-card swiper-no-swiping"
                                onClick={() => onSaveClick(product.originalIndex)}
                            >
                                GUARDAR
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="edit-btn-card swiper-no-swiping"
                                onClick={() => onEditClick(index, product)}
                            >
                                EDITAR
                            </button>
                            <button
                                className="delete-btn-card swiper-no-swiping"
                                onClick={() => onDeleteClick(product.originalIndex)}
                            >
                                BORRAR
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductSlide;
