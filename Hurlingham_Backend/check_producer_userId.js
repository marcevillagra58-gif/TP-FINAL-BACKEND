/**
 * CHECK_PRODUCER_USERID.JS — Verifica el userId de los productores en MongoDB
 */
import { Producer } from "./src/models/producer.model.js";
import { connectMongoDB } from "./src/db/mongo.js";
import { supabase } from "./src/db/supabase.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const check = async () => {
  await connectMongoDB();

  const producers = await Producer.find({}).lean();
  console.log(`\n📦 Productores en MongoDB: ${producers.length}`);
  producers.forEach((p) => {
    console.log(`  - ${p.name}: userId = ${p.userId || "❌ SIN userId"}`);
  });

  // Ver qué userId tiene productor01 en Supabase
  const { data: u } = await supabase
    .from("users")
    .select("id, username, email")
    .eq("username", "productor01")
    .single();

  if (u) {
    console.log(`\n👤 Supabase ID de productor01: ${u.id}`);

    // Ver si algún productor tiene ese userId
    const matching = producers.find((p) => p.userId === u.id);
    console.log(
      matching
        ? `  ✅ Productor vinculado: "${matching.name}" (${matching._id})`
        : `  ❌ Ningún productor tiene userId = ${u.id}`,
    );
  }

  await mongoose.connection.close();
  process.exit(0);
};

check().catch((e) => {
  console.error(e);
  process.exit(1);
});
