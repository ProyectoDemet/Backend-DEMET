import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API DEMET",
      version: "4.0.0",
      description: "Este proyecto implementa una API modular para la gestión de reservas, socios, espacios, tarifas y extras, utilizando Express como framework principal. Cada módulo cuenta con validación estricta mediante Zod, asegurando la integridad de los datos recibidos. El sistema emplea autenticación basada en tokens JWT almacenados en cookies HTTP-only, lo que permite un control de acceso seguro a las rutas protegidas. Además, toda la API está documentada con Swagger/OpenAPI, proporcionando una referencia clara, ordenada y fácilmente consumible para desarrolladores y aplicaciones cliente.",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

export const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


