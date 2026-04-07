import React, { useState } from 'react';
import { useCategorias } from '../hooks/useCategorias';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
import DeleteConfirmModal from './DeleteConfirmModal';

/**
 * ============================================================================
 * COMPONENTE: CategoryManagementPanel
 * ============================================================================
 * Panel de ABM de categorías de productores para el AdminPage.
 * Permite listar, crear, editar (inline) y eliminar categorías.
 * ============================================================================
 */
const CategoryManagementPanel = () => {
  const { categorias, loading, error, recargar } = useCategorias();
  const { crearCategoria, editarCategoria, eliminarCategoria } = useCategoryManagement();

  // Estado para nueva categoría
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoIcono, setNuevoIcono] = useState('🏷️');
  const [creando, setCreando] = useState(false);
  const [formError, setFormError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Estado para edición inline
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editIcono, setEditIcono] = useState('');
  const [editError, setEditError] = useState('');

  // Estado para eliminar
  const [deleteModal, setDeleteModal] = useState({ open: false, cat: null });
  const [eliminando, setEliminando] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // ── Crear ───────────────────────────────────────
  const handleCrear = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!nuevoNombre.trim()) { setFormError('El nombre es requerido'); return; }
    setCreando(true);
    try {
      await crearCategoria({ nombre: nuevoNombre, icono: nuevoIcono });
      setNuevoNombre('');
      setNuevoIcono('🏷️');
      setShowForm(false);
      recargar();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setCreando(false);
    }
  };

  // ── Editar ──────────────────────────────────────
  const iniciarEdicion = (cat) => {
    setEditandoId(cat.id);
    setEditNombre(cat.nombre);
    setEditIcono(cat.icono);
    setEditError('');
  };

  const handleEditar = async (id) => {
    setEditError('');
    if (!editNombre.trim()) { setEditError('El nombre es requerido'); return; }
    try {
      await editarCategoria(id, { nombre: editNombre, icono: editIcono });
      setEditandoId(null);
      recargar();
    } catch (err) {
      setEditError(err.message);
    }
  };

  // ── Eliminar ────────────────────────────────────
  const handleEliminar = async () => {
    setEliminando(true);
    setDeleteError('');
    try {
      await eliminarCategoria(deleteModal.cat.id);
      setDeleteModal({ open: false, cat: null });
      recargar();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <section className="cat-panel">
      <div className="cat-panel__header">
        <h2 className="cat-panel__title">🏷️ Categorías de Productores</h2>
        <button className="create-btn" onClick={() => { setShowForm(!showForm); setFormError(''); }}>
          {showForm ? '✕ Cancelar' : '+ NUEVA CATEGORÍA'}
        </button>
      </div>

      {/* Formulario de alta */}
      {showForm && (
        <form className="cat-form" onSubmit={handleCrear}>
          <input
            className="cat-form__input"
            type="text"
            placeholder="Nombre (ej: panaderia)"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <input
            className="cat-form__input cat-form__input--icon"
            type="text"
            placeholder="Ícono"
            value={nuevoIcono}
            onChange={(e) => setNuevoIcono(e.target.value)}
            maxLength={4}
          />
          <button className="save-btn" type="submit" disabled={creando}>
            {creando ? 'Guardando…' : 'GUARDAR'}
          </button>
          {formError && <p className="cat-form__error">{formError}</p>}
        </form>
      )}

      {/* Lista */}
      {loading && <p className="cat-panel__msg">Cargando categorías…</p>}
      {error && <p className="cat-panel__msg cat-panel__msg--error">{error}</p>}

      {!loading && !error && (
        <table className="cat-table">
          <thead>
            <tr>
              <th>Ícono</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 && (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>Sin categorías</td></tr>
            )}
            {categorias.map((cat) => (
              <tr key={cat.id}>
                {editandoId === cat.id ? (
                  <>
                    <td>
                      <input
                        className="cat-table__edit-icon"
                        value={editIcono}
                        onChange={(e) => setEditIcono(e.target.value)}
                        maxLength={4}
                      />
                    </td>
                    <td>
                      <input
                        className="cat-table__edit-input"
                        value={editNombre}
                        onChange={(e) => setEditNombre(e.target.value)}
                      />
                      {editError && <span className="cat-form__error"> {editError}</span>}
                    </td>
                    <td className="cat-table__actions">
                      <button className="save-btn" onClick={() => handleEditar(cat.id)}>✔ Guardar</button>
                      <button className="cancel-btn" onClick={() => setEditandoId(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="cat-table__icon">{cat.icono}</td>
                    <td className="cat-table__name">{cat.nombre}</td>
                    <td className="cat-table__actions">
                      <button className="view-btn" onClick={() => iniciarEdicion(cat)}>✏️ Editar</button>
                      <button className="delete-btn" onClick={() => { setDeleteModal({ open: true, cat }); setDeleteError(''); }}>🗑️ Eliminar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal confirmación de eliminación */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, cat: null })}
        onConfirm={handleEliminar}
        title="¿Eliminar categoría?"
        message={`¿Estás seguro de que deseas eliminar la categoría`}
        itemName={deleteModal.cat?.nombre}
      />
      {deleteError && <p className="cat-panel__msg cat-panel__msg--error" style={{ marginTop: 8 }}>{deleteError}</p>}
    </section>
  );
};

export default CategoryManagementPanel;
