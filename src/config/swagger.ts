import { Options } from "swagger-jsdoc";
import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/*Router.ts"];

const options: Options = {
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
  forceSchemaTag: true, // 強制在每個 schema 中加上 tag
  tags: [
    { name: "Posts", description: "APIs for Posts" },
    { name: "Comments", description: "APIs for Comments" },
    { name: "Users", description: "APIs for Users" },
  ],
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  definitionPrefix: "I",
  basedir: __dirname,
  files: endpointsFiles,
  routePath: "/api-docs",
  exposeSwaggerUI: true,
  exposeApiDocs: false,
};

swaggerAutogen(outputFile, endpointsFiles, options);
