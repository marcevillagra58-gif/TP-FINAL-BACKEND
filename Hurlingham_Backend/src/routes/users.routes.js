/**
 * ============================================================================
 * ROUTES/USERS.ROUTES.JS — Rutas de usuarios
 * ============================================================================
 *
 * GET    /api/users              → Listar todos (solo admin)
 * GET    /api/users/:id          → Ver uno (admin o propio usuario)
 * POST   /api/users              → Registrar nuevo usuario (público)
 * PUT    /api/users/:id          → Actualizar perfil (admin o propio)
 * DELETE /api/users/:id          → Eliminar (solo admin)
 * PATCH  /api/users/:id/block    → Bloquear/desbloquear (solo admin)
 * PUT    /api/users/:id/password → Cambiar contraseña (solo propio)
 * ============================================================================
 */

import { Router } from "express";
import { body } from "express-validator";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser,
  changePassword,
} from "../controllers/users.controller.js";
import {
  authMiddleware,
  adminMiddleware,
  optionalAuthMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

// Validaciones reutilizables
const createUserValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username debe tener entre 3 y 50 caracteres"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre público debe tener entre 3 y 100 caracteres"),
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe incluir al menos una mayúscula")
    .matches(/[0-9]/)
    .withMessage("Debe incluir al menos un número"),
];

const updateUserValidation = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username inválido"),
  body("avatar")
    .optional()
    .isURL()
    .withMessage("Avatar debe ser una URL válida"),
];

const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("La contraseña actual es requerida"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("La nueva contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe incluir al menos una mayúscula")
    .matches(/[0-9]/)
    .withMessage("Debe incluir al menos un número"),
];

// ─── Rutas ───────────────────────────────────
// GET /api/users → solo admin
router.get("/", authMiddleware, adminMiddleware, getUsers);

// GET /api/users/:id → admin o propio usuario
router.get("/:id", authMiddleware, getUserById);

// POST /api/users → público (pero con auth opcional para detectar si es admin)
router.post("/", optionalAuthMiddleware, createUserValidation, createUser);

// PUT /api/users/:id → admin o propio
router.put("/:id", authMiddleware, updateUserValidation, updateUser);

// DELETE /api/users/:id → solo admin
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

// PATCH /api/users/:id/block → solo admin
router.patch("/:id/block", authMiddleware, adminMiddleware, toggleBlockUser);

// PUT /api/users/:id/password → propio usuario
router.put(
  "/:id/password",
  authMiddleware,
  changePasswordValidation,
  changePassword,
);

export default router;
