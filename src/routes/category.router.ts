import express from "express";
import controller from "../controllers/catagory.controller";
const CategoryRouter = express.Router();

/** get all cart */
CategoryRouter.route("/").get(controller.getCategories);

/** get by id */
CategoryRouter.route("/:id").put(controller.getCategoryById);

/** /add */
CategoryRouter.route("/").post(controller.createCategory);

/** /update/{:id} */
CategoryRouter.route("/:id").put(controller.updateCategory);

export default CategoryRouter;
