/**
 * TEST-CONTACT.JS — Script para probar el endpoint de contacto
 */

// 1. Enviar mensaje público
const sendRes = await fetch("http://localhost:3000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Usuario Test",
    email: "test@usuario.com",
    phone: "11-9999-8888",
    message: "Hola, este es un mensaje de prueba para verificar el sistema.",
  }),
});
const sendData = await sendRes.json();
console.log("POST /contact ->", sendRes.status, sendData.message);

// 2. Intentar listar sin token (Debe fallar)
const getFailRes = await fetch("http://localhost:3000/api/contact");
console.log("GET /contact (sin token) ->", getFailRes.status);

// 3. Login admin para obtener token
const loginRes = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@hurlingham.gob.ar",
    password: "Admin1234!",
  }),
});
const { accessToken } = await loginRes.json();

// 4. Listar mensajes con token
const getRes = await fetch("http://localhost:3000/api/contact", {
  headers: { Authorization: "Bearer " + accessToken },
});
const messages = await getRes.json();
console.log(
  "GET /contact (con token) ->",
  getRes.status,
  "Total:",
  messages.length,
);

if (messages.length > 0) {
  const msgId = messages[0]._id;
  // 5. Marcar como leído
  const readRes = await fetch(
    `http://localhost:3000/api/contact/${msgId}/read`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ read: true }),
    },
  );
  const readData = await readRes.json();
  console.log("PATCH /contact/:id/read ->", readRes.status, readData.message);
}
