import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * COMPONENTE: CommentsSection
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Sección de comentarios para la ficha del productor.
 * Los usuarios autenticados pueden comentar; el autor y el admin pueden eliminar.
 *
 * PROPS:
 * - producerId {string}: ObjectId de MongoDB del productor
 * - comments {Array}: Lista de comentarios cargados por useProducerData
 * - onCommentsChange {Function}: Callback para actualizar el estado del productor
 * ============================================================================
 */

const CommentsSection = ({ producerId, comments = [], onCommentsChange }) => {
  const { user, isAuthenticated } = useAuth();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      const response = await apiFetch(`/producers/${producerId}/comments`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al enviar el comentario");
      }

      const newComment = await response.json();
      // Agregar al inicio de la lista
      onCommentsChange([newComment, ...comments]);
      setText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("¿Eliminar este comentario?")) return;
    try {
      const response = await apiFetch(
        `/producers/${producerId}/comments/${commentId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar el comentario");
      }
      onCommentsChange(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      alert(err.message);
    }
  };

  const canDelete = (comment) =>
    user && (user.id === comment.userId || user.role === "admin");

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="comments-section">
      <h2>Comentarios</h2>

      {/* Formulario de nuevo comentario */}
      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribí tu comentario..."
            maxLength={500}
            rows={3}
            disabled={submitting}
          />
          <div className="comment-form-footer">
            <span className="char-count">{text.length}/500</span>
            {error && <span className="comment-error">{error}</span>}
            <button type="submit" disabled={submitting || !text.trim()}>
              {submitting ? "Enviando..." : "Comentar"}
            </button>
          </div>
        </form>
      ) : (
        <p className="comment-login-msg">
          <em>Iniciá sesión para dejar un comentario.</em>
        </p>
      )}

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <p className="no-comments">Aún no hay comentarios. ¡Sé el primero!</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong className="comment-username">{comment.username}</strong>
                <span className="comment-date">
                  {formatDate(comment.createdAt)}
                </span>
                {canDelete(comment) && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleDelete(comment.id)}
                    title="Eliminar comentario"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="comment-text">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentsSection;
