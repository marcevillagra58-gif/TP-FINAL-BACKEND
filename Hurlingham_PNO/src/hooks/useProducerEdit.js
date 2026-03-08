import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useProducerEdit
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook para gestionar la edición de datos de productor contra el backend propio.
 * Realiza el mapeo inverso (UI -> DB) para guardar los datos.
 * ============================================================================
 */

export const useProducerEdit = (producer, producerId, setProducer) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleEditClick = async () => {
    if (isEditing) {
      // Guardar cambios
      try {
        // MAPEO INVERSO (UI -> DB)
        const payload = {
          name: editFormData.name,
          description: editFormData.description,
          phone: editFormData.phone,
          email: editFormData.email,
          location: editFormData.location,
        };

        const response = await apiFetch(`/producers/${producerId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMsg =
            errorData.error ||
            errorData.errors?.[0]?.msg ||
            `HTTP error! status: ${response.status}`;
          throw new Error(errorMsg);
        }

        const updatedData = await response.json();

        // Actualizar estado local mapeado
        setProducer({
          ...updatedData,
          id: updatedData._id,
          avatar: updatedData.imageUrl,
          phone: updatedData.phone,
          email: updatedData.email,
        });

        setIsEditing(false);
      } catch (err) {
        console.error("Error updating producer info:", err);
        alert(
          err.message || "Error al actualizar la información del productor.",
        );
      }
    } else {
      // Entrar en modo de edición: inicializar datos del formulario
      setEditFormData({
        name: producer.name || "",
        description: producer.description || "",
        phone: producer.phone || "",
        email: producer.email || "",
        location: producer.location || "",
      });
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { isEditing, editFormData, handleEditClick, handleInputChange };
};
