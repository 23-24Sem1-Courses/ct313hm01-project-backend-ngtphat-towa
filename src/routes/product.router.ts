import express from "express";
import controller from "../controllers/product.controller";
const ProductRouter = express.Router();

ProductRouter.route("/all").get(controller.getAll);
ProductRouter.route("/:id").get(controller.getById);

//TODO : Get validate user role
ProductRouter.route("/add").post(controller.create);
ProductRouter.route("/:id").put(controller.update);

ProductRouter.route("/all").delete(controller.deleteAll);
ProductRouter.route("/:id").delete(controller.deleteById);

export default ProductRouter;
