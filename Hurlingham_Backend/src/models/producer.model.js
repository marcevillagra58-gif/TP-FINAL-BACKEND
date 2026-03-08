/**
 * ============================================================================
 * MODELS/PRODUCER.MODEL.JS — Esquema Mongoose para productores
 * ============================================================================
 *
 * Colección: producers
 * Almacena: datos del productor, imágenes (URLs de Cloudinary), y embebidos
 * los productos directamente dentro del documento del productor.
 * ============================================================================
 */

import mongoose from "mongoose";

// Sub-esquema de comentario (embebido dentro del productor)
const CommentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // UUID del usuario en Supabase
    username: { type: String, required: true }, // Nombre del autor
    text: { type: String, required: true, trim: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true, timestamps: false },
);

// Sub-esquema de producto (embebido dentro del productor)
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, min: 0 },
    unit: { type: String, default: "unidad" }, // kg, unidad, docena, etc.
    imageUrl: { type: String }, // URL de Cloudinary
    available: { type: Boolean, default: true },
  },
  { _id: true, timestamps: false },
);

// Esquema principal del productor
const ProducerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del productor es requerido"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    imageUrl: {
      type: String, // Foto principal del productor — URL Cloudinary
    },
    imagePublicId: {
      type: String, // public_id en Cloudinary (para poder eliminar la imagen)
    },
    category: {
      type: String,
      enum: [
        "frutas",
        "verduras",
        "lacteos",
        "carnes",
        "panaderia",
        "conservas",
        "otros",
      ],
      default: "otros",
    },
    products: [ProductSchema], // Productos embebidos
    comments: [CommentSchema], // Comentarios embebidos
    active: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: String, // UUID del usuario en Supabase que gestiona este productor
      default: null,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false, // Elimina el campo __v
  },
);

// Índice de texto para búsqueda full-text
ProducerSchema.index({ name: "text", description: "text", category: "text" });

export const Producer = mongoose.model("Producer", ProducerSchema);
