# 🎨 Hurlingham PNO — Frontend

Interfaz de usuario moderna y premium para la plataforma informativa de Hurlingham.  
Desarrollado con **React + Vite**, enfocado en una experiencia de usuario fluida con animaciones de alta gama.

## 🌟 Características

- **Diseño Glassmorphism**: Estética moderna con transparencias y desenfoques.
- **Notificaciones en Tiempo Real**: Integración dual con **Socket.io** y **SSE**.
- **Consumo Híbrido de API**: Conexión optimizada vía **REST** y **GraphQL**.
- **Animaciones Premium**: Transiciones de página y efectos visuales avanzados (Vara, Swiper).
- **Widgets Dinámicos**: Información meteorológica y noticias en vivo.

## 🚀 Inicio Rápido

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar Entorno:**
   Crea un archivo `.env` basado en `.env.example`:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. **Ejecutar en desarrollo:**

   ```bash
   npm run dev
   ```

4. **Build para producción:**
   ```bash
   npm run build
   ```

## 📂 Estructura del Proyecto

- `src/components/`: Componentes reutilizables de UI.
- `src/context/`: Gestión de estado global (Auth, Notifications).
- `src/hooks/`: Lógica de negocio extraída (GraphQL, External Data).
- `src/pages/`: Vistas principales de la aplicación.
- `src/utils/`: Utilidades de red y formato.

## 📱 Responsividad

La aplicación está optimizada para dispositivos móviles, tablets y escritorio, adaptando sus layouts dinámicamente.

---

_Parte del proyecto integrado para el TP Final de Backend - UTN._
