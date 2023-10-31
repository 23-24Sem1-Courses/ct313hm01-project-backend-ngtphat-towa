import express from "express";
import controller from "../controllers/catalog.controller";
const router = express.Router();

router
  .route("/")
  .get(controller.getItemAll)
  .post(controller.createItem)
  .delete(controller.deleteAllItems);

router
  .route("/:id")
  .get(controller.getItemById)
  .put(controller.updateItem)
  .delete(controller.deleteItem);

export default router;
