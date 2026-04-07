import React, { useState } from 'react';
import { apiFetch } from '../utils/API';
import TextInput from './TextInput';
import '../css/LoginForm.css';

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
    <div className="contact-form-overlay" onClick={onClose}>
      <div className="contact-form-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>

        <h2 style={{ marginBottom: '1rem' }}>🔑 Olvidé mi contraseña</h2>

        {status === 'success' ? (
          <div className="modal-success" style={{ textAlign: 'center', color: '#333' }}>
            <p>✅ {message}</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Revisá el correo del administrador para continuar.</p>
            <button className="submit-button" onClick={onClose} style={{ marginTop: 16 }}>
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: '#555', marginBottom: 16, fontSize: '0.9rem', textAlign: 'center' }}>
              Ingresá el email de tu cuenta y te enviaremos las instrucciones.
            </p>
            
            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="usuario@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            {status === 'error' && (
              <p className="error-message">{message}</p>
            )}
            
            <button
              type="submit"
              className="submit-button"
              disabled={status === 'loading'}
              style={{ marginTop: 16 }}
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
