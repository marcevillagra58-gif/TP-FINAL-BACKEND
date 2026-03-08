import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ============================================================================
 * COMPONENTE: ProtectedRoute
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Componente de ruta protegida que valida autenticación y permisos.
 * Redirige a usuarios no autenticados o sin permisos adecuados.
 * 
 * RECIBE DATOS DE:
 * - App.jsx (usado en definición de rutas de react-router)
 * - AuthContext (useAuth para validación de autenticación)
 * 
 * PROPORCIONA DATOS A:
 * - Outlet (renderiza componentes hijos si está autenticado)
 * 
 * PROPS:
 * - adminOnly {boolean}: Si true, solo permite acceso a administradores
 * 
 * DEPENDENCIAS:
 * - react-router-dom: Navigate y Outlet para enrutamiento
 * - AuthContext: Validación de autenticación y datos de usuario
 * ============================================================================
 */

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  // Si no está autenticado, redirige a 404
  if (!isAuthenticated) {
    return <Navigate to="/404" replace />;
  }

  // Si es una ruta solo para admin y el usuario no lo es, redirige a principal
  if (adminOnly && user?.name !== 'admin') {
    return <Navigate to="/principal" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
