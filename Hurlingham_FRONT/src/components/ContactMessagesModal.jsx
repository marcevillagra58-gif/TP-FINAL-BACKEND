import React, { useState, useEffect } from "react";
import { apiFetch } from "../utils/API";
import "./ContactMessagesModal.css";

/**
 * Modal para que el admin visualice los mensajes de contacto
 * recibidos desde el formulario público. Permite marcar como leído
 * y responder abriendo el cliente de correo del sistema.
 */
const ContactMessagesModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("unread"); // "all" | "unread" | "read"

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await apiFetch("/contact");
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Error al cargar mensajes:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  const handleToggleRead = async (msg) => {
    try {
      const res = await apiFetch(`/contact/${msg._id}/read`, {
        method: "PATCH",
        body: JSON.stringify({ read: !msg.read }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m))
        );
      }
    } catch (err) {
      console.error("Error al actualizar mensaje:", err);
    }
  };

  const handleReply = (email) => {
    window.open(
      `https://mail.google.com/mail/u/0/?to=${encodeURIComponent(email)}&fs=1&tf=cm`,
      "_blank"
    );
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return m.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="cmm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cmm-container">
        <div className="cmm-header">
          <div className="cmm-title-row">
            <h2>📬 Mensajes de Contacto</h2>
            {unreadCount > 0 && (
              <span className="cmm-badge">{unreadCount} sin leer</span>
            )}
          </div>
          <div className="cmm-filters">
            {["all", "unread", "read"].map((f) => (
              <button
                key={f}
                className={`cmm-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Todos" : f === "unread" ? "Sin leer" : "Leídos"}
              </button>
            ))}
          </div>
          <button className="cmm-close" onClick={onClose}>✕</button>
        </div>

        <div className="cmm-body">
          {loading ? (
            <p className="cmm-empty">Cargando mensajes...</p>
          ) : filtered.length === 0 ? (
            <p className="cmm-empty">
              {filter === "unread" ? "No hay mensajes sin leer." : "No hay mensajes."}
            </p>
          ) : (
            filtered.map((msg) => (
              <div key={msg._id} className={`cmm-card ${msg.read ? "cmm-read" : "cmm-unread"}`}>
                <div className="cmm-card-header">
                  <div className="cmm-sender">
                    <span className="cmm-name">{msg.name}</span>
                    {!msg.read && <span className="cmm-new-dot" />}
                  </div>
                  <span className="cmm-date">
                    {new Date(msg.createdAt).toLocaleDateString("es-AR", {
                      day: "2-digit", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="cmm-meta">
                  {msg.email && <span>✉️ {msg.email}</span>}
                  {msg.phone && <span>📞 {msg.phone}</span>}
                </div>

                <p className="cmm-message">{msg.message}</p>

                <div className="cmm-actions">
                  <button
                    className="cmm-btn cmm-btn-reply"
                    onClick={() => handleReply(msg.email, msg.name)}
                    title={`Responder a ${msg.email}`}
                  >
                    ✉️ Responder
                  </button>
                  <button
                    className={`cmm-btn ${msg.read ? "cmm-btn-unread" : "cmm-btn-read"}`}
                    onClick={() => handleToggleRead(msg)}
                  >
                    {msg.read ? "Marcar sin leer" : "Marcar leído"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesModal;
