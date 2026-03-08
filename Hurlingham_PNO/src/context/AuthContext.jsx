import React, { createContext, useState, useContext, useEffect } from 'react';
import { validateUserCredentials } from '../hooks/useAuthValidation';
import { API_BASE_URL } from '../utils/API';

/**
 * ============================================================================
 * CONTEXT: AuthContext
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Contexto global para manejar el estado de autenticación del usuario (JWT).
 * Gestiona accessToken y refreshToken para persistencia segura.
 * ============================================================================
 */

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // EFECTO: Cargar sesión persistente al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error parsing stored user data", e);
        logout();
      }
    }
    setLoading(false);
  }, []);

  /**
   * Función para iniciar sesión
   * @param {string} email - Email (antes era 'name' en MockAPI)
   * @param {string} password - Contraseña
   */
    const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const result = await validateUserCredentials(email, password);

    if (result.success) {
      const { userData, accessToken, refreshToken } = result;
      
      // MAPEO DE COMPATIBILIDAD
      const mappedUser = {
        ...userData,
        name: userData.username,
        state: !userData.is_blocked
      };

      setUser(mappedUser);
      setIsAuthenticated(true);
      
      // Persistencia en localStorage
      localStorage.setItem('user', JSON.stringify(mappedUser));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      setLoading(false);
      return true;
    } else {
      setError(result.error);
      setLoading(false);
      return false;
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    // Opcional: Avisar al backend para invalidar el refreshToken
    if (refreshToken) {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });
        } catch (e) {
            console.error('Error logging out from backend', e);
        }
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
