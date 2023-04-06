import express, { Router } from "express";
import { UserController } from "../controllers/userContorller";

const UserRouter: Router = express.Router();

UserRouter.route("").post(UserController.createUser);

UserRouter.route("/:userId")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

export { UserRouter };
