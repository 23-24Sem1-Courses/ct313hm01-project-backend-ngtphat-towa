import express from "express";
import controller from "../controllers/user.controller";
import userController from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.route("/all").get(controller.findAllUsers);

UserRouter.route("/validate").get(
  controller.validateToken,
  userController.checkUser
);

UserRouter.route("/register").post(controller.register);

UserRouter.route("/login").post(controller.login);

UserRouter.route("/logout").post(controller.logout);

export default UserRouter;
