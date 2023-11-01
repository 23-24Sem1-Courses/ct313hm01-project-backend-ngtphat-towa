import express from "express";
import controller from "../controllers/wishlist.controller";
const WishlistRouter = express.Router();

WishlistRouter.route("/:token").get(controller.getWishList);

WishlistRouter.route("/add").post(controller.addWishList);

export default WishlistRouter;
