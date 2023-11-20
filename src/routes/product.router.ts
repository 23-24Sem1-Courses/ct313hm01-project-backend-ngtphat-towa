import express from "express";
import controller from "../controllers/product.controller";
import userController from "../controllers/user.controller";
const ProductRouter = express.Router();

ProductRouter.route("/all").get(controller.getAll);
ProductRouter.route("/:id").get(controller.getById);

//TODO : Get validate user role
ProductRouter.route("/add").post(
  userController.validateToken,
  userController.validateAdminRole,
  controller.create
);
ProductRouter.route("/:id").put(
  userController.validateToken,
  userController.validateAdminRole,
  controller.update
);

ProductRouter.route("/all").delete(
  userController.validateToken,
  userController.validateAdminRole,
  controller.deleteAll
);
ProductRouter.route("/:id").delete(
  userController.validateToken,
  userController.validateAdminRole,
  controller.deleteById
);

export default ProductRouter;
