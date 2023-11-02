import express from "express";
import controller from "../controllers/product.controller";
const ProductRouter = express.Router();

ProductRouter.route("/").get(controller.getAll);
ProductRouter.route("/").post(controller.create);
ProductRouter.route("/").delete(controller.deleteAll);

ProductRouter.route("/:id").get(controller.getById);
ProductRouter.route("/:id").put(controller.update);
ProductRouter.route("/:id").delete(controller.deleteById);

export default ProductRouter;
