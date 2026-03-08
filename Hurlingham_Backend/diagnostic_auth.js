/**
 * DIAGNOSTIC_AUTH.JS
 * Script para verificar el estado de los usuarios en Supabase.
 */
import { supabase } from "./src/db/supabase.js";
import dotenv from "dotenv";

dotenv.config();

const checkUsers = async () => {
  console.log("🔍 Verificando tabla 'users' en Supabase...");

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, email, role, is_blocked, password");

    if (error) throw error;

    console.log(`\n👥 Usuarios encontrados: ${users.length}`);
    users.forEach((u) => {
      console.log(`\n--- Usuario: ${u.username} ---`);
      console.log(`ID:       ${u.id}`);
      console.log(`Email:    ${u.email}`);
      console.log(`Rol:      ${u.role}`);
      console.log(`Bloqueado: ${u.is_blocked}`);
      console.log(
        `Hash Pwd: ${u.password ? u.password.substring(0, 20) + "..." : "NULL"}`,
      );
    });
  } catch (err) {
    console.error("❌ Error verificando usuarios:", err.message);
  } finally {
    process.exit(0);
  }
};

checkUsers();
