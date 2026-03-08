import React, { useState } from 'react';
import { apiFetch } from '../utils/API';
import '../css/ForgotPasswordModal.css';

/**
 * Modal "Olvidé mi clave"
 * Props:
 *   onClose {Function} - cierra el modal
 */
const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await apiFetch('/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al procesar la solicitud');
      }
    } catch {
      setStatus('error');
      setMessage('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="forgot-overlay" onClick={onClose}>
      <div className="forgot-box" onClick={(e) => e.stopPropagation()}>
        <button className="forgot-close" onClick={onClose}>×</button>

        <h2 className="forgot-title">🔑 Olvidé mi contraseña</h2>

        {status === 'success' ? (
          <div className="forgot-success">
            <p>✅ {message}</p>
            <p>Revisá el correo del administrador para continuar.</p>
            <button className="forgot-btn" onClick={onClose} style={{ marginTop: 16 }}>
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="forgot-subtitle">
              Ingresá el email de tu cuenta y te enviaremos las instrucciones.
            </p>
            <input
              type="email"
              className="forgot-input"
              placeholder="usuario@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            {status === 'error' && (
              <p className="forgot-error">{message}</p>
            )}
            <button
              type="submit"
              className="forgot-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar instrucciones'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
