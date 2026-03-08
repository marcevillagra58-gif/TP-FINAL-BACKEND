import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/API';
import '../css/LoginForm.css';

/**
 * Página de restablecimiento de contraseña.
 * Ruta: /reset-password?token=xxxx
 */
const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('token');
    if (t) setToken(t);
    else setMessage('Token no encontrado en la URL.');
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      setStatus('error');
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    setStatus('loading');
    try {
      const res = await apiFetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => navigate('/homepage'), 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al restablecer la contraseña');
      }
    } catch {
      setStatus('error');
      setMessage('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="container">
      <div className="login-form-wrapper" style={{ maxWidth: 420, margin: '80px auto' }}>
        <h2 className="login-title">🔒 Nueva contraseña</h2>

        {status === 'success' ? (
          <div className="modal-success">
            <p>✅ {message}</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: 8 }}>
              Redirigiendo al login en 3 segundos…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <p style={{ color: '#ccc', marginBottom: 16, fontSize: '0.9rem' }}>
              Ingresá tu nueva contraseña para la cuenta asociada al link de recuperación.
            </p>
            <input
              type="password"
              className="form-input"
              placeholder="Nueva contraseña (mín. 6 caracteres)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
              required
              disabled={status === 'loading'}
            />
            <input
              type="password"
              className="form-input"
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              disabled={status === 'loading'}
              style={{ marginTop: 12 }}
            />
            {status === 'error' && (
              <p className="form-error">{message}</p>
            )}
            {!token && (
              <p className="form-error">Token inválido. Solicitá un nuevo link.</p>
            )}
            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading' || !token}
              style={{ marginTop: 16 }}
            >
              {status === 'loading' ? 'Guardando…' : 'Establecer nueva contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
