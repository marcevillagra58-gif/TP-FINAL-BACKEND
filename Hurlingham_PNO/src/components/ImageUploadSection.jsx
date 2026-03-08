import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: ImageUploadSection
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Sección reutilizable para carga de imágenes. Muestra preview de imagen,
 * placeholder de carga, o indicador de progreso según el estado.
 * 
 * RECIBE DATOS DE:
 * - ProductSlide.jsx (componente padre en modo edición)
 * - Puede ser reutilizado por cualquier componente que necesite carga de imagen
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (componente de UI puro)
 * 
 * PROPS:
 * - image {string}: URL de la imagen actual o preview
 * - uploading {boolean}: Indica si hay una carga en progreso
 * - onImageUpload {Function}: Handler llamado al seleccionar archivo
 * - inputId {string}: ID único para el input file
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

/**
 * Componente de sección de carga de imagen
 * @param {string} image - URL de la imagen
 * @param {boolean} uploading - Estado de carga
 * @param {Function} onImageUpload - Handler de carga
 * @param {string} inputId - ID del input file
 */
const ImageUploadSection = ({ image, uploading, onImageUpload, inputId }) => {
    return (
        <div
            className="image-upload-container"
            onClick={() => document.getElementById(inputId).click()}
        >
            {image ? (
                <img src={image} alt="Preview" className="product-image-preview" />
            ) : (
                <div className="upload-placeholder">
                    <span>+ Cargar Imagen</span>
                </div>
            )}
            {uploading && <div className="uploading-overlay">Subiendo...</div>}
            <input
                type="file"
                id={inputId}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={onImageUpload}
            />
        </div>
    );
};

export default ImageUploadSection;
