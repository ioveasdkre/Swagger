import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "APIs for managing user accounts",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/docs/main.yml", "./src/docs/user/*.yml"],
};

// 透過 swagger-jsdoc 套件整合 Swagger 規範
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
