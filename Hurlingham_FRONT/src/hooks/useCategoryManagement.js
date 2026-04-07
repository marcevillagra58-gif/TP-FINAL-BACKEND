/**
 * Hook: useCategoryManagement
 * Operaciones CRUD de categorías para el panel de admin.
 * Expone: crearCategoria, editarCategoria, eliminarCategoria.
 */
import { apiFetch } from '../utils/API';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
});

export const useCategoryManagement = () => {

  const crearCategoria = async ({ nombre, icono }) => {
    const res = await apiFetch('/categorias', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre, icono }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear la categoría');
    return data;
  };

  const editarCategoria = async (id, { nombre, icono }) => {
    const res = await apiFetch(`/categorias/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre, icono }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al editar la categoría');
    return data;
  };

  const eliminarCategoria = async (id) => {
    const res = await apiFetch(`/categorias/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al eliminar la categoría');
    return data;
  };

  return { crearCategoria, editarCategoria, eliminarCategoria };
};
