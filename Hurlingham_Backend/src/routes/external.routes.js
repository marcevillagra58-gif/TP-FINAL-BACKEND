/**
 * ============================================================================
 * ROUTES/EXTERNAL.ROUTES.JS — Rutas para APIs externas
 * ============================================================================
 */

import express from "express";
import { getWeather, getNews } from "../controllers/external.controller.js";

const router = express.Router();

// Rutas públicas (no requieren login para ver el clima o noticias)
router.get("/weather", getWeather);
router.get("/news", getNews);

export default router;
