import { useState, useEffect } from "react";
import { useGraphQL } from "./useGraphQL";

/**
 * ============================================================================
 * CUSTOM HOOK: useUserManagement (v2 — GraphQL)
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Obtiene la lista de usuarios mediante GraphQL.
 * Mantiene compatibilidad de campos (name/state) para la UI.
 * ============================================================================
 */

export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useGraphQL();

  const fetchUsers = async () => {
    try {
      const GET_USERS = `
                query GetUsers {
                    users {
                        id
                        username
                        email
                        role
                        avatar
                        is_blocked
                    }
                }
            `;

      const data = await query(GET_USERS);

      // MAPEO PARA COMPATIBILIDAD CON UI
      const mappedUsers = data.users.map((u) => ({
        ...u,
        name: u.username, // username -> name
        state: !u.is_blocked, // is_blocked -> state
        avatar: u.avatar || "https://i.ibb.co/rRVQzhtV/nuevo-item.png",
      }));

      setUsers(mappedUsers);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error fetching users via GraphQL:", err);
      setError("Error al cargar usuarios.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const refreshUsers = () => {
    setLoading(true);
    fetchUsers();
  };

  const addUser = (user) => {
    const mapped = {
      ...user,
      name: user.username,
      state: !user.is_blocked,
    };
    setUsers((prev) => [mapped, ...prev]);
  };

  const removeUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const updateUser = (userId, updates) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const merged = { ...u, ...updates };
          if (updates.is_blocked !== undefined)
            merged.state = !updates.is_blocked;
          if (updates.username !== undefined) merged.name = updates.username;
          return merged;
        }
        return u;
      }),
    );
  };

  return {
    users,
    loading,
    error,
    refreshUsers,
    addUser,
    removeUser,
    updateUser,
  };
};
