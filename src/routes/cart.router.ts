import express from "express";
import controller from "../controllers/cart.controller";
import userController from "../controllers/user.controller";
const CartRouter = express.Router();

/** get all cart */
CartRouter.route("/").get(
  userController.validateToken,
  controller.getCartItems
);

/** /add */
CartRouter.route("/").post(userController.validateToken, controller.addToCart);

/** /update/{cartItemId} */
CartRouter.route("/:id").put(
  userController.validateToken,
  controller.updateCartItem
);

/** /delete/{cartItemId} */
CartRouter.route("/").delete(
  userController.validateToken,
  controller.removeCartItem
);

export default CartRouter;
