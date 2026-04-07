import React from "react";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../context/AuthContext";

/**
 * Modal de comentarios del productor.
 * - Cualquier visitante puede leer y escribir.
 * - Cualquier usuario autenticado puede responder comentarios existentes.
 * - El productor dueño (isOwner) tambien puede responder.
 * - Los admin pueden eliminar cualquier mensaje.
 *
 * PROPS:
 * - onCommentsUpdate {Function}: Callback para sincronizar los comentarios
 *   actualizados de vuelta al estado del padre (evita perder cambios al re-abrir).
 */
const CommentsModal = ({ producerId, initialComments, onClose, isOwner, onCommentsUpdate }) => {
  const { user } = useAuth();
  const {
    comments,
    newText,
    setNewText,
    authorName,
    setAuthorName,
    submitting,
    error,
    handleSubmit,
    handleDelete,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    handleReply,
  } = useComments(producerId, initialComments, onCommentsUpdate);

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: "640px",
          width: "95%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: "16px" }}>💬 Mensajes</h2>

        {/* ── Formulario para escribir ── */}
        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={60}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontFamily: "inherit",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
          <textarea
            rows={3}
            placeholder="Escribí tu mensaje..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            maxLength={500}
          />
          <div className="comment-form-footer">
            <span className="char-count">{newText.length}/500</span>
            {error && <span className="comment-error">{error}</span>}
            <button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "ENVIAR"}
            </button>
          </div>
        </form>

        {/* ── Lista de comentarios ── */}
        {comments.length === 0 ? (
          <p className="no-comments">
            Aún no hay mensajes. ¡Sé el primero en escribir!
          </p>
        ) : (
          <ul className="comments-list">
            {comments
              .filter((c) => !c.parentId)
              .map((c) => (
                <li key={c._id} className="comment-item">
                  <div className="comment-header">
                    <strong className="comment-username">
                      {c.username || "Visitante"}
                    </strong>
                    <span className="comment-date">
                      {formatDate(c.createdAt)}
                    </span>

                    {/* Botón RESPONDER — solo para el productor dueño */}
                    {isOwner && replyingTo !== c._id && (
                      <button
                        className="comment-delete-btn"
                        style={{ color: "#2980b9" }}
                        onClick={() => {
                          setReplyingTo(c._id);
                          setReplyText("");
                        }}
                        title="Responder este mensaje"
                      >
                        ↩ Responder
                      </button>
                    )}

                    {/* Botón eliminar — solo para admin */}
                    {user?.role === "admin" && (
                      <button
                        className="comment-delete-btn"
                        onClick={() => handleDelete(c._id)}
                        title="Eliminar mensaje"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                  <p className="comment-text">{c.text}</p>

                  {/* ── Formulario de respuesta inline ── */}
                  {replyingTo === c._id && (
                    <div
                      style={{
                        marginTop: "10px",
                        paddingLeft: "10px",
                        borderLeft: "3px solid #3498db",
                      }}
                    >
                      <textarea
                        rows={2}
                        placeholder="Escribí tu respuesta..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        maxLength={450}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #3498db",
                          borderRadius: "6px",
                          fontFamily: "inherit",
                          fontSize: "0.9rem",
                          resize: "vertical",
                          boxSizing: "border-box",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginTop: "6px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          className="cancel-btn"
                          style={{ padding: "5px 14px", fontSize: "0.85rem" }}
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancelar
                        </button>
                        <button
                          className="save-btn"
                          style={{ padding: "5px 14px", fontSize: "0.85rem" }}
                          onClick={() => handleReply(c)}
                        >
                          ENVIAR RESPUESTA
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Respuestas anidadas ── */}
                  {comments
                    .filter((reply) => reply.parentId === c._id)
                    .slice()
                    .reverse()
                    .map((reply) => (
                      <div
                        key={reply._id}
                        style={{
                          marginTop: "12px",
                          marginLeft: "24px",
                          padding: "10px 14px",
                          background: "#f8f9f9",
                          borderRadius: "8px",
                          borderLeft: "3px solid #57c785",
                        }}
                      >
                        <div className="comment-header">
                          <strong
                            className="comment-username"
                            style={{ color: "#34495e" }}
                          >
                            {reply.username}
                          </strong>
                          <span className="comment-date">
                            {formatDate(reply.createdAt)}
                          </span>
                          {/* Botón eliminar respuesta — solo admin */}
                          {user?.role === "admin" && (
                            <button
                              className="comment-delete-btn"
                              onClick={() => handleDelete(reply._id)}
                              title="Eliminar respuesta"
                            >
                              🗑
                            </button>
                          )}
                        </div>
                        <p
                          className="comment-text"
                          style={{ fontSize: "0.9rem", color: "#555" }}
                        >
                          {reply.text}
                        </p>
                      </div>
                    ))}
                </li>
              ))}
          </ul>
        )}

        <div className="modal-actions" style={{ marginTop: "20px" }}>
          <button className="cancel-btn" onClick={onClose}>
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
