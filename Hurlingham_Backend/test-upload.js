/**
 * TEST-UPLOAD.JS — Script temporal para probar el endpoint de upload
 * Ejecutar: node test-upload.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Login
const loginRes = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@hurlingham.gob.ar",
    password: "Admin1234!",
  }),
});
const { accessToken } = await loginRes.json();
console.log("✅ Login OK");

// 2. Crear imagen PNG 1x1 mínima
const pngBuffer = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk" +
    "YPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64",
);

// 3. Construir FormData nativo de Node.js 18+
const { Blob } = await import("buffer");
const form = new FormData();
form.append("image", new Blob([pngBuffer], { type: "image/png" }), "test.png");

// 4. Hacer el upload
const uploadRes = await fetch(
  "http://localhost:3000/api/upload/image?folder=test",
  {
    method: "POST",
    headers: { Authorization: "Bearer " + accessToken },
    body: form,
  },
);

const result = await uploadRes.json();
console.log("Upload status:", uploadRes.status);
console.log(JSON.stringify(result, null, 2));
