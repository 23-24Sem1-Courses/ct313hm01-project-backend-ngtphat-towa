import express from "express";
import controller from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.route("/all").get(controller.findAllUser);

UserRouter.route("/signup").post(controller.signUp);

UserRouter.route("/signin").post(controller.signIn);

export default UserRouter;
