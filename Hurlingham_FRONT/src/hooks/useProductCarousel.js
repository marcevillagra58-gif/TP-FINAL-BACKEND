import { useState, useEffect } from "react";
import { uploadImageToBackend } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useProductCarousel
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook refactorizado para el nuevo backend. Usa uploadImageToBackend y maneja
 * productos reales desde MongoDB.
 * ============================================================================
 */

export const useProductCarousel = (
  products,
  onSaveProduct,
  onDeleteProduct,
  onCancelNewProduct,
) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Efecto para entrar automáticamente en modo de edición para nuevos productos
  useEffect(() => {
    const newProductIndex = products.findIndex((p) => p.isNew);
    if (newProductIndex !== -1 && editingIndex !== newProductIndex) {
      setEditingIndex(newProductIndex);
      setEditForm({
        name: "",
        description: "",
        image: "",
      });
      if (swiper) {
        swiper.slideToLoop(newProductIndex);
      }
    }
  }, [products, editingIndex, swiper]);

  const handleEditClick = (index, product) => {
    setEditingIndex(index);
    setEditForm({
      name: product.name,
      description: product.description,
      image: product.image || product.imageUrl, // Soporte para ambos nombres de campo
    });
  };

  const handleCancelClick = (product) => {
    if (product.isNew && onCancelNewProduct) {
      onCancelNewProduct();
    }
    setEditingIndex(-1);
    setEditForm({
      name: "",
      description: "",
      image: "",
    });
  };

  const handleSaveClick = (originalIndex) => {
    if (!editForm.name || !editForm.description || !editForm.image) {
      alert(
        "Por favor completa todos los datos (Nombre, Descripción e Imagen).",
      );
      return;
    }
    if (onSaveProduct) {
      // Pasamos el objeto del formulario completo
      onSaveProduct(originalIndex, editForm);
    }
    setEditingIndex(-1);
  };

  const handleDeleteClick = (originalIndex) => {
    setProductToDelete(originalIndex);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (onDeleteProduct && productToDelete !== null) {
      onDeleteProduct(productToDelete);
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Usamos la nueva utilidad que sube al backend
      const imageUrl = await uploadImageToBackend(file, "products");
      setEditForm((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      alert("Error al subir la imagen al backend. Intenta nuevamente.");
    } finally {
      setUploading(false);
    }
  };

  return {
    editingIndex,
    editForm,
    deleteModalOpen,
    uploading,
    swiper,
    setSwiper,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    handleInputChange,
    handleImageUpload,
  };
};
