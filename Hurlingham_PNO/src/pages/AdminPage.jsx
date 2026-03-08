import React, { useState } from "react";
import "../css/admin.css";

// Hooks Personalizados
import { useUserManagement } from "../hooks/useUserManagement";
import { useUserCreate } from "../hooks/useUserCreate";
import { useUserDelete } from "../hooks/useUserDelete";
import { useUserBlockToggle } from "../hooks/useUserBlockToggle";
import { useImageUpload } from "../hooks/useImageUpload";

// Componentes
import UserCard from "../components/UserCard";
import CreateUserModal from "../components/CreateUserModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

/**
 * ============================================================================
 * PÁGINA: AdminPage
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Página de administración para gestión completa de usuarios. Permite crear,
 * bloquear/desbloquear y eliminar usuarios. Solo accesible para admin.
 *
 * RUTA:
 * - /admin (protegida con ProtectedRoute adminOnly=true)
 *
 * FUNCIONALIDADES:
 * - Listar todos los usuarios con avatares y estados
 * - Crear nuevos usuarios con avatar (modal CreateUserModal)
 * - Bloquear/desbloquear usuarios (toggle state)
 * - Eliminar usuarios (modal DeleteConfirmModal)
 * - Vista responsive de tarjetas de usuario
 *
 * HOOKS UTILIZADOS:
 * - useUserManagement: Lista y gestión de usuarios
 * - useUserCreate: Creación de usuarios
 * - useUserDelete: Eliminación de usuarios
 * - useUserBlockToggle: Bloqueo/desbloqueo
 * - useImageUpload: Carga de avatares
 *
 * COMPONENTES:
 * - UserCard: Tarjeta individual de usuario
 * - CreateUserModal: Modal de creación con avatar
 * - DeleteConfirmModal: Confirmación de eliminación
 *
 * ACCESO:
 * - Solo admin (user.name === 'admin')
 * - Protegida con ProtectedRoute
 * ============================================================================
 */

function AdminPage() {
  // Hooks para gestión de usuarios
  const { users, loading, error, addUser, removeUser, updateUser } =
    useUserManagement();
  const { isCreating, createUser } = useUserCreate();
  const { isDeleting, deleteUser } = useUserDelete();
  const { isTogglingBlock, toggleUserBlock } = useUserBlockToggle();
  const { uploading, imageUrl, uploadImage, clearImage } = useImageUpload();

  // Estados locales de modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Manejadores simplificados
  const handleCreateUser = async (userData) => {
    const newUser = await createUser(userData);
    if (newUser) {
      addUser(newUser);
      setIsCreateModalOpen(false);
      clearImage();
      // Informar al admin las credenciales generadas para el nuevo usuario
      alert(
        `✅ Usuario creado exitosamente.\n\n` +
          `👤 Nombre: ${newUser.username}\n` +
          `📧 Email: ${newUser.email}\n` +
          `🔑 Contraseña temporal: ${newUser.generatedPassword}\n\n` +
          `Comunicale estas credenciales al usuario para que pueda iniciar sesión.`,
      );
    }
  };

  const handleDeleteUser = async () => {
    const success = await deleteUser(userToDelete);
    if (success) {
      removeUser(userToDelete.id);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleBlockToggle = async (user) => {
    const updatedUser = await toggleUserBlock(user);
    if (updatedUser) {
      updateUser(user.id, updatedUser);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  if (loading)
    return <div className="admin-container">Cargando usuarios...</div>;
  if (error) return <div className="admin-container">{error}</div>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Administración de Usuarios</h1>
        <button
          className="create-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + NUEVO USUARIO
        </button>
      </header>

      <div className="users-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onBlock={handleBlockToggle}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          clearImage();
        }}
        onCreate={handleCreateUser}
        uploading={uploading}
        imageUrl={imageUrl}
        onImageUpload={uploadImage}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteUser}
        title="¿Eliminar Usuario?"
        message="¿Estás seguro de que deseas eliminar a"
        itemName={userToDelete?.name}
      />
    </div>
  );
}

export default AdminPage;
