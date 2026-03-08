/**
 * ============================================================================
 * MIDDLEWARE/RATE-LIMIT.MIDDLEWARE.JS — Protección contra fuerza bruta
 * ============================================================================
 *
 * Limita los intentos de login a 5 por cada 15 minutos por IP.
 * Si se superan los intentos, devuelve 429 Too Many Requests.
 * ============================================================================
 */

import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50, // máximo 5 intentos por IP
  message: {
    error: "Demasiados intentos de login. Esperá 15 minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
