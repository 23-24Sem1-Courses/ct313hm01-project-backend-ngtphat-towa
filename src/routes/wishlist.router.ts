import express from "express";
import controller from "../controllers/wishlist.controller";
const WishlistRouter = express.Router();
import userController from "../controllers/user.controller";

WishlistRouter.route("/all").get(
  userController.validateToken,
  controller.getWishList
);

WishlistRouter.route("/add").post(
  userController.validateToken,
  controller.addWishList
);

WishlistRouter.route("/remove").delete(
  userController.validateToken,
  controller.removeWishlist
);

export default WishlistRouter;
