import React, { useState } from 'react';
import '../css/ContactForm.css';

/**
 * ============================================================================
 * COMPONENTE: ContactForm
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Formulario modal de contacto con campos de nombre, email y mensaje.
 * Muestra confirmación tras el envío (simulado).
 * 
 * RECIBE DATOS DE:
 * - Footer.jsx (componente padre que controla apertura)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (formulario standalone)
 * 
 * PROPS:
 * - onClose {Function}: Handler para cerrar el formulario
 * 
 * DEPENDENCIAS:
 * - Ninguna
 * ============================================================================
 */

function ContactForm({ onClose }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="contact-form-overlay">
        <div className="contact-form-container">
          <p>Ya recibimos tu mensaje! Pronto nos contactaremos!</p>
          <button onClick={onClose} className="submit-button">OK</button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-overlay">
      <div className="contact-form-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="4" required ></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;