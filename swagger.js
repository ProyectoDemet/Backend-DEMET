import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API DEMET - Autenticación",
      version: "1.0.0",
      description: "Documentación de endpoints del módulo de autenticación con Express y Zod",
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


