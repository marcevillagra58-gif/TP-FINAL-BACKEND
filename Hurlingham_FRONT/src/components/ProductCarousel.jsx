import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/productCarousel.css";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useProductCarousel } from "../hooks/useProductCarousel";
import ProductSlide from "./ProductSlide";
import DeleteConfirmModal from "./DeleteConfirmModal";

/**
 * ============================================================================
 * COMPONENTE: ProductCarousel
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Carrusel de productos con efecto coverflow usando Swiper. Gestiona la
 * visualización y edición de productos, permitiendo navegación fluida entre
 * slides con animaciones 3D.
 *
 * RECIBE DATOS DE:
 * - ProducerDetailsPage.jsx o ProductoresPage.jsx (componente padre)
 * - useProductCarousel hook (toda la lógica de estado y handlers)
 *
 * PROPORCIONA DATOS A:
 * - ProductSlide.jsx (pasa product, index, estado y event handlers)
 * - DeleteConfirmModal.jsx (pasa isOpen, onClose, onConfirm, title, message)
 *
 * PROPS:
 * - products {Array}: Array de objetos de producto
 * - direction {string}: Dirección del carrusel ('horizontal' o 'vertical')
 * - isEditing {boolean}: Indica si el carrusel está en modo edición
 * - onSaveProduct {Function}: Callback al guardar producto
 * - onDeleteProduct {Function}: Callback al eliminar producto
 * - onCancelNewProduct {Function}: Callback al cancelar nuevo producto
 *
 * DEPENDENCIAS:
 * - swiper/react: Librería de carruseles
 * - useProductCarousel: Hook personalizado con lógica del carrusel
 * - ProductSlide: Componente de slide individual
 * - DeleteConfirmModal: Modal de confirmación de eliminación
 * ============================================================================
 */

function ProductCarousel({
  products,
  direction = "horizontal",
  isEditing = false,
  onSaveProduct,
  onDeleteProduct,
  onCancelNewProduct,
}) {
  const {
    editingIndex,
    editForm,
    deleteModalOpen,
    uploading,
    setSwiper,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    handleInputChange,
    handleImageUpload,
  } = useProductCarousel(
    products,
    onSaveProduct,
    onDeleteProduct,
    onCancelNewProduct,
  );

  if (!products || products.length === 0) {
    return <p>No hay productos para mostrar.</p>;
  }

  return (
    <>
      <Swiper
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          // Si hay un nuevo producto, deslizar hacia él inmediatamente
          const newProductIndex = products.findIndex((p) => p.isNew);
          if (newProductIndex !== -1) {
            swiperInstance.slideToLoop(newProductIndex, 500);
          }
        }}
        key={products.length}
        modules={[EffectCoverflow, Pagination, Navigation]}
        direction={direction}
        loop={products.length > 1}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={direction === "vertical" ? 1.35 : "auto"}
        coverflowEffect={
          direction === "vertical"
            ? {
                rotate: 0,
                stretch: 80,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }
            : {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }
        }
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={
          direction === "vertical"
            ? {}
            : {
                480: {
                  slidesPerView: 1,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 2,
                  },
                },
                768: {
                  slidesPerView: 2,
                  coverflowEffect: {
                    rotate: 30,
                    stretch: 10,
                    depth: 150,
                    modifier: 1,
                  },
                },
              }
        }
        className={`swiper-container mySwiper ${direction === "vertical" ? "vertical-swiper" : ""}`}
        style={direction === "vertical" ? { height: "600px" } : {}}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductSlide
              product={product}
              index={index}
              editingIndex={editingIndex}
              editForm={editForm}
              isEditing={isEditing}
              uploading={uploading}
              onEditClick={handleEditClick}
              onSaveClick={handleSaveClick}
              onCancelClick={handleCancelClick}
              onDeleteClick={handleDeleteClick}
              onInputChange={handleInputChange}
              onImageUpload={handleImageUpload}
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </Swiper>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="¿Estás seguro?"
        message="¿Realmente deseas eliminar este producto? Esta acción no se puede deshacer."
      />
    </>
  );
}

export default ProductCarousel;
