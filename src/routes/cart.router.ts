import express from "express";
import controller from "../controllers/cart.controller";
import userController from "../controllers/user.controller";
const CartRouter = express.Router();

/** get all cart */
CartRouter.route("/all").get(
  userController.validateToken,
  controller.getCartItems
);

/** /add */
CartRouter.route("/add").post(
  userController.validateToken,
  controller.addToCart
);

/** /update/{cartItemId} */
CartRouter.route("/:id").put(
  userController.validateToken,
  controller.updateCartItem
);

/** /delete/{cartItemId} */
CartRouter.route("/remove").delete(
  userController.validateToken,
  controller.removeCartItem
);

/** /delete/{cartItemId} */
CartRouter.route("/all").delete(
  userController.validateToken,
  controller.removeCart
);

export default CartRouter;
