/**
 * ============================================================================
 * CONTROLLERS/USERS.CONTROLLER.JS — CRUD de usuarios
 * ============================================================================
 *
 * GET    /api/users           → Listar todos (admin)
 * GET    /api/users/:id       → Obtener uno (admin o el propio usuario)
 * POST   /api/users           → Crear usuario
 * PUT    /api/users/:id       → Actualizar datos de perfil
 * DELETE /api/users/:id       → Eliminar usuario (admin)
 * PATCH  /api/users/:id/block → Bloquear / desbloquear (admin)
 * PUT    /api/users/:id/password → Cambiar contraseña
 * ============================================================================
 */

import bcrypt from "bcrypt";
import { supabase } from "../db/supabase.js";
import { validationResult } from "express-validator";
import { io } from "../../index.js";
import { sendSSENotification } from "./notifications.controller.js";
import { Producer } from "../models/producer.model.js";

const SALT_ROUNDS = 12;

/** Elimina el campo password de un objeto usuario antes de enviarlo al cliente */
const sanitizeUser = (user) => {
  const { password, ...safe } = user;
  return safe;
};

// ─────────────────────────────────────────────
// GET /api/users  (solo admin)
// ─────────────────────────────────────────────
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "id, username, email, role, avatar, is_blocked, created_at, updated_at",
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("Error en getUsers:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// GET /api/users/:id
// ─────────────────────────────────────────────
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo admin puede ver cualquier usuario; el resto solo a sí mismo
    if (req.user.role !== "admin" && req.user.userId !== id) {
      return res
        .status(403)
        .json({ error: "No tenés permiso para ver este usuario" });
    }

    const { data, error } = await supabase
      .from("users")
      .select(
        "id, username, email, role, avatar, is_blocked, created_at, updated_at",
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(data);
  } catch (err) {
    console.error("Error en getUserById:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// POST /api/users  (registro público)
// ─────────────────────────────────────────────
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role, avatar } = req.body;

    // Solo admin puede asignar roles distintos de 'user'
    const assignedRole = req.user?.role === "admin" && role ? role : "user";

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Construir payload (avatar es opcional)
    const insertPayload = {
      username,
      email,
      password: hashedPassword,
      role: assignedRole,
    };
    if (avatar) insertPayload.avatar = avatar;

    const { data, error } = await supabase
      .from("users")
      .insert(insertPayload)
      .select("id, username, email, role, avatar, is_blocked, created_at")
      .single();

    if (error) {
      // Detectar duplicado (email o username ya existe)
      if (error.code === "23505") {
        return res
          .status(409)
          .json({ error: "El email o nombre de usuario ya está en uso" });
      }
      throw error;
    }

    // Si es productor, crear automáticamente el registro en MongoDB
    if (data.role === "producer") {
      try {
        await Producer.create({
          name: data.username,
          userId: data.id, // UUID de Supabase
          imageUrl: data.avatar || null,
          description: "Nuevo productor registrado.",
          category: "otros",
          active: true,
        });
        console.log(
          `✅ Productor MongoDB creado para usuario: ${data.username}`,
        );
      } catch (mongoErr) {
        // No bloqueamos: el usuario en Supabase ya se creó
        console.error(
          "❌ Error al crear productor en MongoDB:",
          mongoErr.message,
        );
      }
    }

    // NOTIFICACIÓN EN TIEMPO REAL
    const notification = {
      type: "user_registered",
      message: `Nuevo usuario registrado: ${data.username}`,
      user: data,
      timestamp: new Date().toISOString(),
    };
    io.emit("admin:notification", notification);
    sendSSENotification(notification);

    res.status(201).json(data);
  } catch (err) {
    console.error("Error en createUser:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// PUT /api/users/:id  (actualizar perfil)
// ─────────────────────────────────────────────
export const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Solo admin o el propio usuario puede editar
    if (req.user.role !== "admin" && req.user.userId !== id) {
      return res
        .status(403)
        .json({ error: "No tenés permiso para editar este usuario" });
    }

    // Campos permitidos (no se permite cambiar password por esta ruta)
    const { username, avatar } = req.body;
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (avatar !== undefined) updates.avatar = avatar;

    // Admin también puede cambiar el rol
    if (req.user.role === "admin" && req.body.role) {
      updates.role = req.body.role;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }

    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select("id, username, email, role, avatar, is_blocked, updated_at")
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("Error en updateUser:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/users/:id  (solo admin)
// ─────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // No se puede eliminar a sí mismo
    if (req.user.userId === id) {
      return res
        .status(400)
        .json({ error: "No podés eliminar tu propia cuenta de admin" });
    }

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) throw error;

    // NOTIFICACIÓN EN TIEMPO REAL
    const notification = {
      type: "user_deleted",
      message: `Usuario eliminado (ID: ${id})`,
      userId: id,
      timestamp: new Date().toISOString(),
    };
    io.emit("admin:notification", notification);
    sendSSENotification(notification);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error en deleteUser:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/users/:id/block  (solo admin)
// ─────────────────────────────────────────────
export const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    // No se puede bloquear a sí mismo
    if (req.user.userId === id) {
      return res.status(400).json({ error: "No podés bloquearte a vos mismo" });
    }

    // Obtener estado actual
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("is_blocked, username")
      .eq("id", id)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newStatus = !user.is_blocked;

    const { data, error } = await supabase
      .from("users")
      .update({ is_blocked: newStatus })
      .eq("id", id)
      .select("id, username, is_blocked")
      .single();

    if (error) throw error;

    res.json({
      message: `Usuario ${data.username} ${newStatus ? "bloqueado" : "desbloqueado"} correctamente`,
      user: data,
    });
  } catch (err) {
    console.error("Error en toggleBlockUser:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ─────────────────────────────────────────────
// PUT /api/users/:id/password
// ─────────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Solo el propio usuario puede cambiar su contraseña (no el admin)
    if (req.user.userId !== id) {
      return res
        .status(403)
        .json({ error: "Solo podés cambiar tu propia contraseña" });
    }

    // Obtener hash actual
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("password")
      .eq("id", id)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña actual
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ error: "La contraseña actual es incorrecta" });
    }

    // Hashear nueva contraseña
    const hashedNew = await bcrypt.hash(newPassword, SALT_ROUNDS);

    const { error } = await supabase
      .from("users")
      .update({ password: hashedNew })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("Error en changePassword:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
