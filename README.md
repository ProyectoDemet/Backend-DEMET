<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" width="120" alt="Node.js Logo"/>
</p>

<h1 align="center"> Backend DEMET</h1>

<p align="center">
  <b>API Backend para un Sistema de Gestión de Reservas Hoteleras, desarrollada con <b>Node.js + Express + PostgreSQL</b>.  
  Permite administrar reservas, espacios, solicitudes, empleados, tarifas y servicios adicionales, aplicando una arquitectura modular, validaciones estrictas y mecanismos de seguridad avanzados.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge&logo=github&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Scalar-5C2D91?style=for-the-badge&logo=swagger&logoColor=white"/>
</p>

---

## Descripción general

**Backend DEMET** es un proyecto backend personal enfocado en la construcción de una API robusta y escalable para la **gestión integral de un entorno hotelero**.
El sistema permite administrar reservas, habitaciones o espacios, solicitudes internas, empleados, tarifas y servicios adicionales.

El proyecto está diseñado siguiendo principios de **separación de responsabilidades**, **seguridad por capas** y **documentación completa**, lo que facilita su mantenimiento, escalabilidad y consumo por aplicaciones frontend o móviles.

---

## 🛠 Tecnologías utilizadas

* **Node.js** – Entorno de ejecución para JavaScript del lado del servidor.
* **Express.js** – Framework para la creación de APIs REST.
* **PostgreSQL** – Base de datos relacional.
* **JWT (Access & Refresh Tokens)** – Autenticación y autorización.
* **Cookies HTTP-only** – Protección de credenciales y sesiones.
* **Zod** – Validación estricta de datos en las rutas.
* **Swagger / Scalar** – Documentación interactiva de la API.
* **ExcelJS** – Generación de reportes en formato Excel (XLSX).
* **Nodemailer** – Envío de correos electrónicos.
* **dotenv** – Gestión de variables de entorno.

---

## ⚙️ Configuración del proyecto

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/backend-demet.git
cd backend-demet
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

---

### 3️⃣ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=
ACCESS_SECRET=
ACCESS_EXPIRE_IN='1h'
REFRESH_SECRET=
REFRESH_EXPIRE_IN='7d'
PORT=3002
GOOGLE_USER=
GOOGLE_PWD=
EMAIL_ADMIN=
```

📌 Estas variables permiten:

* Conexión segura a la base de datos PostgreSQL.
* Manejo de **tokens de acceso y refresco**.
* Envío de correos mediante SMTP (Google).
* Configuración del puerto del servidor.

---

### 4️⃣ Ejecutar el servidor

```bash
npm run dev
```

La API estará disponible en:

```
http://localhost:3002
```

---

## 📂 Estructura del proyecto

```
src/
├── controller/        # Controladores de la aplicación
├── routes/            # Definición de rutas
├── service/           # Lógica de negocio
├── middleware/        # Autenticación, autorización y middlewares
├── validator/         # Esquemas Zod para validación
├── lib/               # Conexión a PostgreSQL y utilidades
├── util/
│   └── templates/     # Plantillas de correos y reportes
└── server.js  # Punto de entrada del servidor
```

Esta arquitectura permite un **backend desacoplado, mantenible y escalable**.

---

## 🔒 Seguridad

* **Autenticación basada en JWT**, utilizando:

  * Access Token (corto tiempo de vida)
  * Refresh Token (larga duración)
* **Tokens almacenados en cookies HTTP-only**, reduciendo riesgos XSS.
* **Protección de rutas** mediante middlewares.
* **Validación de datos con Zod**, asegurando integridad y consistencia.

---

## 📊 Reportes y notificaciones

* 📄 Generación de **reportes en Excel (XLSX)** con múltiples hojas a partir de diferentes conjuntos de datos.
* 📧 Envío de **correos electrónicos automáticos** para notificaciones del sistema (confirmaciones, alertas, avisos administrativos).

---

## 📚 Documentación de la API

La API está documentada utilizando **Scalar**, ofreciendo una interfaz moderna e interactiva para explorar y probar los endpoints.

<p align="center">
  <img src="./docs/scalar-demo.gif" alt="Documentación Scalar DEMET" width="80%"/>
</p>

📍 Acceso a la documentación:

```
http://localhost:3002/reference
```

---

## 👨‍💻 Autor

<p align="center">
  <a href="https://github.com/bskcfv" target="_blank">
    <img src="https://github.com/bskcfv.png" width="100" alt="Cristian Valderrama" style="border-radius:50%;"/>
  </a>
</p>

<p align="center">
  <b><a href="https://github.com/bskcfv" target="_blank">Cristian Valderrama</a></b><br/>
  Backend Developer – Proyecto personal
</p>
