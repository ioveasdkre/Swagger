import { Options } from "swagger-jsdoc";
import swaggerAutogen from "swagger-autogen";

const options: Options = {
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
  forceSchemaTag: true, // 強制在每個 schema 中加上 tag
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/*Router.ts"];

swaggerAutogen(outputFile, endpointsFiles, options);
