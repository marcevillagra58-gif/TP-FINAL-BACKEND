/**
 * ============================================================================
 * ROUTES/AUTH.ROUTES.JS — Rutas de autenticación
 * ============================================================================
 *
 * POST /api/auth/login    → Login con email + password
 * POST /api/auth/refresh  → Renovar access token
 * POST /api/auth/logout   → Cerrar sesión
 * ============================================================================
 */

import { Router } from "express";
import { body } from "express-validator";
import {
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { loginRateLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

// Validaciones para el login
const loginValidation = [
  body("email").notEmpty().withMessage("Email o usuario es requerido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];

// POST /api/auth/login
router.post("/login", loginRateLimiter, loginValidation, login);

// POST /api/auth/refresh
router.post("/refresh", refreshToken);

// POST /api/auth/logout
router.post("/logout", logout);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

export default router;
