import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Custom Hooks
import { useProducerData } from "../hooks/useProducerData";
import { useProducerEdit } from "../hooks/useProducerEdit";
import { usePasswordChange } from "../hooks/usePasswordChange";
import { useProductManager } from "../hooks/useProductManager";

// Components
import ProducerHeader from "../components/ProducerHeader";
import ProducerInfo from "../components/ProducerInfo";
import ProductCarousel from "../components/ProductCarousel";
import PasswordModal from "../components/PasswordModal";

// Styles
import "../css/producerDetails.css";

/**
 * ============================================================================
 * PÁGINA: ProducerDetailsPage
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Página de perfil de productor con información, productos y edición inline.
 * Permite al dueño editar datos, cambiar contraseña y gestionar productos.
 *
 * RUTA:
 * - /mercadolingham/producer/:id
 *
 * FUNCIONALIDADES:
 * - Vista de perfil de productor (nombre, descripción, contactos)
 * - Carrusel vertical de productos con efecto coverflow
 * - Edición inline de perfil (solo para dueño)
 * - Cambio de contraseña (solo para dueño)
 * - CRUD de productos: crear, editar, eliminar (solo para dueño)
 * - Máximo 20 productos por productor
 *
 * PERMISOS:
 * - Vista pública: Cualquiera puede ver
 * - Edición: Solo dueño (user.idProductor === producer.idProductor)
 *
 * HOOKS UTILIZADOS:
 * - useProducerData: Carga de datos del productor
 * - useProducerEdit: Edición inline de perfil
 * - usePasswordChange: Cambio de contraseña
 * - useProductManager: CRUD de productos (slots 1-20)
 * - useAuth: Verificación de ownership
 * - useParams: Obtención de ID desde URL
 *
 * COMPONENTES:
 * - ProducerHeader: Header con nombre, descripción y botones
 * - ProducerInfo: Avatar y contactos
 * - ProductCarousel: Carrusel de productos con Swiper
 * - PasswordModal: Modal de cambio de contraseña
 * ============================================================================
 */

const ProducerDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // Hooks for data and logic management
  const { producer, setProducer, loading, error } = useProducerData(id);
  const { isEditing, editFormData, handleEditClick, handleInputChange } =
    useProducerEdit(producer, id, setProducer);
  const {
    isPasswordModalOpen,
    passwordData,
    handlePasswordChange,
    openPasswordModal,
    closePasswordModal,
    setPasswordField,
  } = usePasswordChange();
  const {
    newProductIndex,
    handleNewProduct,
    handleSaveProduct,
    handleDeleteProduct,
    handleCancelNewProduct,
    buildProductsList,
  } = useProductManager();

  // Loading and error states
  if (loading) {
    return (
      <div className="producer-details-page">
        <p>Cargando productor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="producer-details-page">
        <p>Error al cargar el productor: {error.message}</p>
      </div>
    );
  }

  if (!producer) {
    return (
      <div className="producer-details-page">
        <p>Productor no encontrado.</p>
      </div>
    );
  }

  // Solo el propio productor puede editar su perfil
  const isOwner = user && producer && user.id === producer.userId;

  return (
    <div className="producer-details-page">
      <ProducerHeader
        producer={producer}
        isEditing={isEditing}
        isOwner={isOwner}
        editFormData={editFormData}
        onEditClick={handleEditClick}
        onPasswordClick={openPasswordModal}
        onInputChange={handleInputChange}
      />

      <div className="producer-content">
        <ProducerInfo
          producer={producer}
          isEditing={isEditing}
          editFormData={editFormData}
          onInputChange={handleInputChange}
        />

        <section className="producer-carousel-section">
          <div className="carousel-header-row">
            <h2>Nuestros Productos</h2>
            {isEditing && (
              <button
                className="new-product-btn"
                onClick={() => handleNewProduct(producer)}
                disabled={newProductIndex !== null}
              >
                NUEVO
              </button>
            )}
          </div>

          <ProductCarousel
            products={buildProductsList(producer, newProductIndex)}
            direction="vertical"
            isEditing={isEditing}
            onSaveProduct={(idx, data) =>
              handleSaveProduct(id, idx, data, producer, setProducer)
            }
            onDeleteProduct={(idx) =>
              handleDeleteProduct(
                id,
                idx,
                producer,
                setProducer,
                newProductIndex,
                handleCancelNewProduct,
              )
            }
            onCancelNewProduct={handleCancelNewProduct}
          />
        </section>
      </div>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        passwordData={passwordData}
        onPasswordChange={() => handlePasswordChange(user?.id)}
        onClose={closePasswordModal}
        onFieldChange={setPasswordField}
      />
    </div>
  );
};

export default ProducerDetailsPage;
