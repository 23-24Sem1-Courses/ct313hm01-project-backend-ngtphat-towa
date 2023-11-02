import express from "express";
import controller from "../controllers/catagory.controller";
const CategoryRouter = express.Router();

/** get all cart */
CategoryRouter.route("/").get(controller.getAll);

/** get by id */
CategoryRouter.route("/:id").get(controller.getById);

/** /add */
CategoryRouter.route("/").post(controller.create);

/** /update/{:id} */
CategoryRouter.route("/:id").put(controller.update);

export default CategoryRouter;
