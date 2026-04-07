import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTransition } from './Transition';
import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import '../css/Header.css';

/**
 * ============================================================================
 * COMPONENTE: Header
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Barra de navegación principal de la aplicación. Gestiona navegación entre
 * páginas, autenticación de usuario, y display de LoginForm.
 * 
 * RECIBE DATOS DE:
 * - App.jsx (renderizado en todas las páginas)
 * - AuthContext (useAuth para estado de autenticación)
 * - Transition context (para transiciones de página)
 * 
 * PROPORCIONA DATOS A:
 * - LoginForm.jsx (pasa onClose handler)
 * 
 * PROPS:
 * - Ninguna (usa contexts)
 * 
 * DEPENDENCIAS:
 * - react-router-dom: Navegación y location
 * - AuthContext: Estado de autenticación y logout
 * - Transition: Transiciones entre páginas
 * - LoginForm: Formulario de login
 * ============================================================================
 */

function Header() {
  const { transition } = useTransition();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, setError } = useAuth();
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLoginForm = () => {
    setError(null);
    setLoginFormVisible(!isLoginFormVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (e, to) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu on navigation
    transition(to);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    navigate('/homepage');
    setTimeout(() => {
      logout();
    }, 50);
  };

  return (
    <header className={location.pathname === '/homepage' ? 'homepage-header' : ''}>
      <nav>
        {location.pathname !== '/homepage' &&
          <>
            <div className="hamburger-menu" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
              <li><a href="/homepage" onClick={(e) => handleNavigate(e, '/homepage')} className={getLinkClass('/homepage')}>Inicio</a></li>
              <li><a href="/principal" onClick={(e) => handleNavigate(e, '/principal')} className={getLinkClass('/principal')}>Principal</a></li>
              <li><a href="/historia" onClick={(e) => handleNavigate(e, '/historia')} className={getLinkClass('/historia')}>Historia</a></li>
              <li><a href="/educacion" onClick={(e) => handleNavigate(e, '/educacion')} className={getLinkClass('/educacion')}>Educación</a></li>
              <li><a href="/cultura" onClick={(e) => handleNavigate(e, '/cultura')} className={getLinkClass('/cultura')}>Cultura</a></li>
              <li><a href="/imagenes" onClick={(e) => handleNavigate(e, '/imagenes')} className={getLinkClass('/imagenes')}>Imágenes</a></li>
              <li><a href="/mercadolingham" onClick={(e) => handleNavigate(e, '/mercadolingham')} className={getLinkClass('/mercadolingham')}>MercadoLingham</a></li>
            </ul>
          </>
        }
        <ul className="auth-links">
          {isAuthenticated ? (
            <>
              {user && user.name === 'admin' && (
                <li><Link to="/admin" className={getLinkClass('/admin')}>Administrar</Link></li>
              )}
              <li className="user-info">Hola, {user.name}</li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <li><a href="#" onClick={(e) => { e.preventDefault(); toggleLoginForm(); }} className={`login-button ${getLinkClass('/login')}`}>Login</a></li>
          )}
        </ul>
        {isLoginFormVisible && <LoginForm onClose={toggleLoginForm} />}
      </nav>
    </header>
  );
}

export default Header;
