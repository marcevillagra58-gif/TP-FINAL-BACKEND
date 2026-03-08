/**
 * ============================================================================
 * ROUTES/PRODUCERS.ROUTES.JS — Rutas de productores
 * ============================================================================
 *
 * Públicas (sin auth):
 *   GET /api/producers         → Listar (con filtros: ?category= &search= )
 *   GET /api/producers/:id     → Ver detalle
 *
 * Protegidas (admin):
 *   POST   /api/producers                          → Crear
 *   PUT    /api/producers/:id                      → Actualizar
 *   DELETE /api/producers/:id                      → Eliminar
 *   POST   /api/producers/:id/products             → Agregar producto
 *   DELETE /api/producers/:id/products/:productId  → Eliminar producto
 * ============================================================================
 */

import { Router } from "express";
import { body } from "express-validator";
import {
  getProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
  addProduct,
  deleteProduct,
  addComment,
  deleteComment,
} from "../controllers/producers.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

const VALID_CATEGORIES = [
  "frutas",
  "verduras",
  "lacteos",
  "carnes",
  "panaderia",
  "conservas",
  "otros",
];

const producerValidation = [
  body("name").trim().notEmpty().withMessage("El nombre es requerido"),
  body("category")
    .optional({ checkFalsy: true })
    .isIn(VALID_CATEGORIES)
    .withMessage("Categoría inválida"),
  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email inválido")
    .normalizeEmail(),
];

const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es requerido"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser positivo"),
];

// ─── Rutas públicas ──────────────────────────
router.get("/", getProducers);
router.get("/:id", getProducerById);

// ─── Rutas protegidas (admin) ─────────────────
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  producerValidation,
  createProducer,
);
router.put("/:id", authMiddleware, producerValidation, updateProducer);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProducer);

// ─── Productos embebidos ─────────────────────
router.post("/:id/products", authMiddleware, productValidation, addProduct);
router.delete("/:id/products/:productId", authMiddleware, deleteProduct);

// ─── Comentarios ──────────────────────────────
// POST   /api/producers/:id/comments            → Agregar comentario (auth)
// DELETE /api/producers/:id/comments/:commentId → Eliminar comentario (autor o admin)
router.post("/:id/comments", authMiddleware, addComment);
router.delete("/:id/comments/:commentId", authMiddleware, deleteComment);

export default router;
