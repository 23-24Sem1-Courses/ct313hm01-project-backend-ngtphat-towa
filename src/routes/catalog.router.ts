import express from "express";
import controller from "../controllers/catalog.controller";
const CatalogRouter = express.Router();

CatalogRouter
  .route("/")
  .get(controller.getItemAll)
  .post(controller.createItem)
  .delete(controller.deleteAllItems);

CatalogRouter
  .route("/:id")
  .get(controller.getItemById)
  .put(controller.updateItem)
  .delete(controller.deleteItem);

export default CatalogRouter;
