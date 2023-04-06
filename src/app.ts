import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./config/swagger2";
import swaggerSpec from "../swagger_output.json";
import { connectToDatabase } from "./connections/mongoDB";
import { handle404Error, handleErrors } from "./middlewares/errorsMiddleware";
import { PostRouter, UserRouter } from "./routers/index";

const app: Application = express();

connectToDatabase();

// 啟用 JSON 解析中介軟體
app.use(express.json());

app.use(PostRouter);
app.use("/user", UserRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 處理 404
app.use(handle404Error);

// 處理程式碼出錯，防止錯誤訊息讓使用者看見
app.use(handleErrors);

export default app;
