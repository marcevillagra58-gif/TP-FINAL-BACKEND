import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * COMPONENTE: CommentsSection
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Sección de comentarios con soporte de hilos (threaded comments).
 * Los comentarios raíz pueden recibir respuestas anidadas formando un hilo.
 * Los usuarios autenticados pueden comentar y responder.
 * El autor de cada comentario y el admin pueden eliminarlo.
 *
 * PROPS:
 * - producerId {string}: ObjectId de MongoDB del productor
 * - comments {Array}: Lista plana de todos los comentarios (raíces + respuestas)
 * - onCommentsChange {Function}: Callback para actualizar el estado del productor
 *
 * FLUJO DE HILO:
 *   Usuario escribe comentario → Productor responde (parentId = id del comentario)
 *   → Usuario ve la respuesta anidada → puede responder de vuelta (hilo continuo)
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
        { method: "DELETE" },
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar el comentario");
      }
      // Eliminar el comentario y todas sus respuestas del estado local
      onCommentsChange(
        comments.filter((c) => c._id !== commentId && c.parentId !== commentId),
      );
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

  // Separar comentarios raíz (sin parentId) de las respuestas
  const rootComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId) =>
    comments.filter((c) => c.parentId === parentId);

  return (
    <section className="comments-section">
      <h2>Comentarios</h2>

      {/* Formulario de nuevo comentario raíz */}
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

      {/* Lista de comentarios raíz con sus hilos de respuestas */}
      {rootComments.length === 0 ? (
        <p className="no-comments">Aún no hay comentarios. ¡Sé el primero!</p>
      ) : (
        <ul className="comments-list">
          {rootComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              replies={getReplies(comment._id)}
              producerId={producerId}
              user={user}
              isAuthenticated={isAuthenticated}
              canDelete={canDelete}
              formatDate={formatDate}
              onDelete={handleDelete}
              onReplyPosted={(newReply) =>
                onCommentsChange([...comments, newReply])
              }
            />
          ))}
        </ul>
      )}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Sub-componente: un comentario raíz con su hilo de respuestas
// ─────────────────────────────────────────────────────────────
const CommentItem = ({
  comment,
  replies,
  producerId,
  user,
  isAuthenticated,
  canDelete,
  formatDate,
  onDelete,
  onReplyPosted,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyError, setReplyError] = useState("");

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSubmitting(true);
    setReplyError("");
    try {
      const response = await apiFetch(`/producers/${producerId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          text: replyText.trim(),
          parentId: comment._id,   // ← vincula la respuesta al comentario padre
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al enviar la respuesta");
      }

      const newReply = await response.json();
      onReplyPosted(newReply);
      setReplyText("");
      setShowReplyForm(false);
    } catch (err) {
      setReplyError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li className="comment-item">
      {/* Encabezado del comentario raíz */}
      <div className="comment-header">
        <strong className="comment-username">{comment.username}</strong>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
        {canDelete(comment) && (
          <button
            className="comment-delete-btn"
            onClick={() => onDelete(comment._id)}
            title="Eliminar comentario"
          >
            ✕
          </button>
        )}
      </div>
      <p className="comment-text">{comment.text}</p>

      {/* Botón para abrir/cerrar el formulario de respuesta */}
      {isAuthenticated && (
        <button
          className="comment-reply-btn"
          onClick={() => setShowReplyForm((v) => !v)}
        >
          {showReplyForm ? "Cancelar" : "↩ Responder"}
        </button>
      )}

      {/* Formulario de respuesta inline */}
      {showReplyForm && (
        <form className="comment-reply-form" onSubmit={handleReply}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Responder a ${comment.username}...`}
            maxLength={500}
            rows={2}
            disabled={submitting}
            autoFocus
          />
          <div className="comment-form-footer">
            <span className="char-count">{replyText.length}/500</span>
            {replyError && (
              <span className="comment-error">{replyError}</span>
            )}
            <button type="submit" disabled={submitting || !replyText.trim()}>
              {submitting ? "Enviando..." : "Enviar respuesta"}
            </button>
          </div>
        </form>
      )}

      {/* Respuestas anidadas con sangría visual */}
      {replies.length > 0 && (
        <ul className="comments-replies">
          {replies.map((reply) => (
            <li key={reply._id} className="comment-item comment-item--reply">
              <div className="comment-header">
                <strong className="comment-username">{reply.username}</strong>
                <span className="comment-date">
                  {formatDate(reply.createdAt)}
                </span>
                {canDelete(reply) && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => onDelete(reply._id)}
                    title="Eliminar respuesta"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="comment-text">{reply.text}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentsSection;
