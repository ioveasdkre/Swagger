import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API 說明文件",
    },
  },
  apis: ["./routers/index.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
