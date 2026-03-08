/**
 * ============================================================================
 * ROUTES/CONTACT.ROUTES.JS — Rutas para el formulario de contacto
 * ============================================================================
 */

import { Router } from "express";
import { body } from "express-validator";
import {
  sendContactMessage,
  getContactMessages,
  markAsRead,
} from "../controllers/contact.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

// Validaciones
const contactValidation = [
  body("name").trim().notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("El mensaje debe tener al menos 10 caracteres"),
];

// ─── Rutas públicas ──────────────────────────
// POST /api/contact → Enviar mensaje
router.post("/", contactValidation, sendContactMessage);

// ─── Rutas protegidas (admin) ─────────────────
// GET /api/contact → Listar mensajes
router.get("/", authMiddleware, adminMiddleware, getContactMessages);

// PATCH /api/contact/:id/read → Marcar como leído
router.patch("/:id/read", authMiddleware, adminMiddleware, markAsRead);

export default router;
