import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server (HTTP)",
      },
      {
        url: "https://localhost:3000",
        description: "Development server (HTTPS)",
      },
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: "apiKey",
          in: "headers",
          name: "authorization",
          description: "請加上 API Token",
        },
      },
    },
  },

  apis: ["./docs/main.yml", "./docs/user/*.yml"],
};

// 透過 swagger-jsdoc 套件整合 Swagger 規範
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
