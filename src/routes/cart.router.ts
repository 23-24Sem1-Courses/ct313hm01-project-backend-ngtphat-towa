import express from "express";
import controller from "../controllers/cart.controller";
const CartRouter = express.Router();

/** get all cart */
CartRouter.route("/").get(controller.getCartItems);

/** /add */
CartRouter.route("/").post(controller.addToCart);

/** /update/{cartItemId} */
CartRouter.route("/:id").put(controller.updateCartItem);

/** /delete/{cartItemId} */
CartRouter.route("/:id").delete(controller.deleteCartItem);

export default CartRouter;
