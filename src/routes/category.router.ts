import express from "express";
import controller from "../controllers/catagory.controller";
import userController from "../controllers/user.controller";
const CategoryRouter = express.Router();

CategoryRouter.route("/all").get(controller.getAll);
CategoryRouter.route("/:id").get(controller.getById);

CategoryRouter.route("/create").post(
  userController.validateToken,
  userController.validateAdminRole,
  controller.create
);
CategoryRouter.route("/:id").put(
  userController.validateToken,
  userController.validateAdminRole,
  controller.update
);

export default CategoryRouter;
