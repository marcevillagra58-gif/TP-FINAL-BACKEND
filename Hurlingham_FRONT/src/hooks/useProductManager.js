import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useProductManager
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook refactorizado para el nuevo backend en MongoDB.
 * Gestiona un array dinámico de productos en lugar de slots fijos.
 * ============================================================================
 */

export const useProductManager = () => {
  const [newProductIndex, setNewProductIndex] = useState(null);

  const handleNewProduct = (producer) => {
    if (!producer) return;
    // Simplemente marcamos que queremos agregar uno al final
    setNewProductIndex(producer.products?.length || 0);
  };

  const handleCancelNewProduct = () => {
    setNewProductIndex(null);
  };

  const handleSaveProduct = async (
    producerId,
    index,
    updatedData,
    producer,
    setProducer,
  ) => {
    if (!producer) return;
    try {
      // El backend maneja la adición/actualización
      // Si el producto tiene _id, es una actualización (no implementado endpoint específico, usamos PUT producer)
      // Si el producto no tiene _id o es el newProductIndex, es una adición (POST /products)

      const isNew = index === newProductIndex;

      if (isNew) {
        const response = await apiFetch(`/producers/${producerId}/products`, {
          method: "POST",
          body: JSON.stringify({
            name: updatedData.name,
            description: updatedData.description,
            imageUrl: updatedData.image,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newProduct = await response.json();

        // Actualizar estado local
        setProducer({
          ...producer,
          products: [...(producer.products || []), newProduct],
        });
      } else {
        // Actualización de producto existente (dentro del array)
        // Por simplicidad, usamos PUT /producers/:id con el array completo actualizado
        const updatedProducts = [...producer.products];
        updatedProducts[index] = {
          ...updatedProducts[index],
          name: updatedData.name,
          description: updatedData.description,
          imageUrl: updatedData.image,
        };

        const response = await apiFetch(`/producers/${producerId}`, {
          method: "PUT",
          body: JSON.stringify({ products: updatedProducts }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedProducer = await response.json();
        setProducer({
          ...producer,
          products: updatedProducer.products,
        });
      }

      setNewProductIndex(null);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error al guardar el producto.");
    }
  };

  const handleDeleteProduct = async (
    producerId,
    index,
    producer,
    setProducer,
    currentNewProductIndex,
    cancelNewProduct,
  ) => {
    if (!producer) return;
    try {
      const productToDelete = producer.products[index];

      if (productToDelete && productToDelete._id) {
        // Usamos el endpoint específico de borrado
        const response = await apiFetch(
          `/producers/${producerId}/products/${productToDelete._id}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Actualización optimista o basada en respuesta
      const updatedProducts = (producer.products || []).filter(
        (_, i) => i !== index,
      );
      setProducer({ ...producer, products: updatedProducts });

      if (currentNewProductIndex === index) {
        cancelNewProduct();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error al eliminar el producto.");
    }
  };

  /**
   * Reemplaza buildProductsArray para trabajar con el array real.
   * Mantiene compatibilidad con el carrusel añadiendo el flag isNew.
   */
  const buildProductsList = (producer, includeNewProductIndex) => {
    if (!producer) return [];

    const products = (producer.products || []).map((p, i) => ({
      ...p,
      originalIndex: i,
      image: p.imageUrl || p.image, // Unificar nombres
    }));

    if (includeNewProductIndex !== null) {
      products.push({
        originalIndex: includeNewProductIndex,
        image: "",
        name: "",
        description: "",
        isNew: true,
      });
    }

    return products;
  };

  return {
    newProductIndex,
    handleNewProduct,
    handleSaveProduct,
    handleDeleteProduct,
    handleCancelNewProduct,
    buildProductsList,
  };
};
