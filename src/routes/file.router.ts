import express from "express";
import controller from "../controllers/file.controller";
const FileUpdloadRouter = express.Router();

/** handleFileUpload */
FileUpdloadRouter.route("/").post(controller.handleFileUpload);

/** getListFiles */
FileUpdloadRouter.route("/").get(controller.getListFiles);

/** getFile */
FileUpdloadRouter.route("/:filename").get(controller.getFile);

export default FileUpdloadRouter;
