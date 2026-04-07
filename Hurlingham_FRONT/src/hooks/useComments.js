import { useState } from "react";
import { apiFetch } from "../utils/API";

/**
 * Hook para gestionar comentarios de un productor.
 * Permite leer comentarios (del estado del productor), escribir nuevos (incluso anónimos)
 * y eliminar comentarios (admin solamente).
 */
export const useComments = (producerId, initialComments = [], onCommentsUpdate) => {
  const [comments, setComments] = useState(initialComments);
  const [newText, setNewText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Helper que actualiza el estado local y notifica al padre
  const updateComments = (updater) => {
    setComments((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      onCommentsUpdate?.(next); // sincroniza al padre si el callback existe
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) {
      setError("El mensaje no puede estar vacío.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await apiFetch(`/producers/${producerId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          text: newText.trim(),
          authorName: authorName.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      const saved = await res.json();
      updateComments((prev) => [saved, ...prev]);
      setNewText("");
      setAuthorName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await apiFetch(
        `/producers/${producerId}/comments/${commentId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }
      updateComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReply = async (toComment) => {
    if (!replyText.trim()) return;
    try {
      const res = await apiFetch(`/producers/${producerId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          text: replyText.trim(),
          parentId: toComment._id,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al responder");
      }
      const saved = await res.json();
      updateComments((prev) => [saved, ...prev]);
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      alert(err.message);
    }
  };

  return {
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
  };
};
