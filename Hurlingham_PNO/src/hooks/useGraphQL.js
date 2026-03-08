/**
 * ============================================================================
 * CUSTOM HOOK: useGraphQL
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Hook genérico para realizar peticiones a la API de GraphQL.
 * Maneja automáticamente la inyección del JWT.
 * ============================================================================
 */

export const useGraphQL = () => {
  const query = async (gqlQuery, variables = {}) => {
    const token = localStorage.getItem("accessToken");
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    const gqlUrl = baseUrl.replace("/api", "/graphql");

    try {
      const response = await fetch(gqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          query: gqlQuery,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (err) {
      console.error("GraphQL Request Error:", err);
      throw err;
    }
  };

  return { query };
};
