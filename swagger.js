import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API DEMET",
      version: "4.0.0",
      description:
        "Esta API implementa una arquitectura modular para la gestión completa de reservas, espacios, tarifas, extras, socios y solicitudes (requests), utilizando Express como framework principal. " +
        "Cada ruta aplica validaciones estrictas mediante Zod, garantizando la estructura y el tipo correcto de los datos recibidos. " +
        "El sistema de autenticación se basa en tokens JWT almacenados en cookies HTTP-only, permitiendo un acceso seguro a las rutas protegidas y evitando exposición en el cliente. " +
        "La API también incluye generación y descarga de reportes en formato Excel (xlsx), integrando distintos datasets en un único archivo multi-hoja. " +
        "Toda la documentación se genera automáticamente con Swagger/OpenAPI para proporcionar una referencia clara, organizada y fácil de consumir por desarrolladores y aplicaciones cliente.",
    },
    servers: [
      {
        url: "https://backdemet.bskcfv.online",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


