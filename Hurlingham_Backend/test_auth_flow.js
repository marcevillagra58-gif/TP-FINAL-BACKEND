/**
 * TEST_AUTH_FLOW.JS
 * Prueba el circuito completo de auth: login -> forgot-password -> reset-password -> login (nuevo)
 */
import bcrypt from "bcrypt";
import { supabase } from "./src/db/supabase.js";
import { ResetToken } from "./src/models/resetToken.model.js";
import { connectMongoDB } from "./src/db/mongo.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const testFlow = async () => {
  console.log("🚀 Iniciando prueba de flujo de auth...");

  try {
    // 1. Conectar a MongoDB
    await connectMongoDB();
    console.log("✅ MongoDB conectado");

    const TEST_EMAIL = "productor01@test.com";
    const NEW_PWD = "NewPassword123!";

    // 2. Buscar usuario
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", TEST_EMAIL)
      .single();

    if (error || !user) throw new Error("Usuario no encontrado en Supabase");
    console.log(`✅ Usuario encontrado: ${user.username}`);

    // 3. Simular Forgot Password (generar token)
    console.log("📝 Generando token de reset...");
    const token = "test-token-" + Date.now();
    const expiresAt = new Date(Date.now() + 3600000);

    await ResetToken.deleteMany({ email: TEST_EMAIL });
    await ResetToken.create({ email: TEST_EMAIL, token, expiresAt });
    console.log("✅ Token guardado en MongoDB");

    // 4. Simular Reset Password
    console.log("🔐 Reseteando contraseña...");
    const hashedNew = await bcrypt.hash(NEW_PWD, 12);

    const { data: updated, error: updateError } = await supabase
      .from("users")
      .update({ password: hashedNew })
      .eq("email", TEST_EMAIL)
      .select();

    if (updateError || !updated || updated.length === 0)
      throw new Error("Falla al actualizar en Supabase");
    console.log("✅ Contraseña actualizada en Supabase");

    // 5. Simular Login con nueva contraseña
    console.log("🔑 Probando login con nueva contraseña...");
    const reFetched = await supabase
      .from("users")
      .select("password")
      .eq("email", TEST_EMAIL)
      .single();

    const isValid = await bcrypt.compare(NEW_PWD, reFetched.data.password);
    console.log(`📊 bcrypt.compare resultado: ${isValid}`);

    if (isValid) {
      console.log("✨ ¡EL FLUJO FUNCIONA PERFECTAMENTE EN EL SCRIPT!");
    } else {
      console.log("❌ ¡EL FLUJO FALLA! Password no coincide tras el update.");
    }
  } catch (err) {
    console.error("❌ Error en test:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

testFlow();
