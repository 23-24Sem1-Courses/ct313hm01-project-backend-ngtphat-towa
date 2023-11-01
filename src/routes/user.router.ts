import express from "express";
import controller from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.route("/all").get(controller.findAllUser);

UserRouter.route("/register").post(controller.signUp);

UserRouter.route("/login").post(controller.signIn);

export default UserRouter;
