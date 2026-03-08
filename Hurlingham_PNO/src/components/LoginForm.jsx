import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../css/LoginForm.css';
import ForgotPasswordModal from './ForgotPasswordModal';

// Hooks Personalizados
import { useLoginRedirect } from '../hooks/useLoginRedirect';

// Componentes
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';

/**
 * ============================================================================
 * COMPONENTE: LoginForm
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Formulario de inicio de sesión con validación de credenciales.
 * Maneja la autenticación de usuarios y redirección post-login.
 * 
 * RECIBE DATOS DE:
 * - Header.jsx (componente padre que controla apertura/cierre)
 * - AuthContext (useAuth para login y errores)
 * - useLoginRedirect hook (para redirección post-login)
 * 
 * PROPORCIONA DATOS A:
 * - TextInput.jsx (pasa id, label, value, onChange)
 * - PasswordInput.jsx (pasa id, label, value, onChange)
 * 
 * PROPS:
 * - onClose {Function}: Handler para cerrar el formulario
 * 
 * DEPENDENCIAS:
 * - AuthContext: Contexto de autenticación
 * - useLoginRedirect: Hook para redirección según rol de usuario
 * - TextInput: Input de texto reutilizable
 * - PasswordInput: Input de contraseña con show/hide
 * ============================================================================
 */

function LoginForm({ onClose }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const { redirectAfterLogin } = useLoginRedirect();
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(name, password);

    if (success) {
      onClose();
      redirectAfterLogin();
    }
  };

  return (
    <div className="contact-form-overlay">
      <div className="contact-form-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="name"
            label="Usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <PasswordInput
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">Ingresar</button>

          <p style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </p>
        </form>
      </div>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
    </div>
  );
}

export default LoginForm;