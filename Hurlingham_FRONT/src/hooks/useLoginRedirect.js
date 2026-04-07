import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/API";

/**
 * ============================================================================
 * CUSTOM HOOK: useLoginRedirect
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook refactorizado para el nuevo backend.
 * Redirige según el rol del usuario de Supabase y busca el productor en MongoDB.
 * ============================================================================
 */

export const useLoginRedirect = () => {
  const navigate = useNavigate();

  const redirectAfterLogin = async () => {
    // Pequeño delay para asegurar que el estado/localStorage se actualizó
    setTimeout(async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      // 1. Redirección de ADMINISTRADOR
      if (user.role === "admin") {
        console.log("Redirecting admin to /admin");
        navigate("/admin");
        return;
      }

      // 2. Redirección de PRODUCTOR
      if (user.role === "producer") {
        try {
          // Buscar el productor en MongoDB que tenga este userId (de Supabase)
          const response = await apiFetch("/producers");
          if (!response.ok) throw new Error("Error fetching producers");

          const producers = await response.json();

          // Buscamos coincidencia por userId
          const producer = producers.find((p) => p.userId === user.id);

          if (producer) {
            navigate(`/mercadolingham/producer/${producer._id}`);
          } else {
            // Si es productor pero no tiene registro en MongoDB aún
            navigate("/mercadolingham");
          }
        } catch (err) {
          console.error("Error finding producer for redirect:", err);
          navigate("/mercadolingham");
        }
        return;
      }

      // 3. Redirección para usuarios normales o sin rol específico
      navigate("/mercadolingham");
    }, 150);
  };

  return { redirectAfterLogin };
};
