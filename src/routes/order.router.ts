import express from "express";
import controller from "../controllers/order.controller";
import userController from "../controllers/user.controller";
const OrderRouter = express.Router();

/** create-checkout-session */
OrderRouter.route("/create-checkout-session").post(
  userController.validateToken,
  controller.checkoutList
);

/** place order */
OrderRouter.route("/place-order").post(
  userController.validateToken,
  controller.placeOrder
);

/** get all order by user*/
OrderRouter.route("/").get(
  userController.validateToken,
  controller.getAllOrders
);

/** get all order */
OrderRouter.route("/all").get(
  userController.validateToken,
  userController.validateAdminRole,
  controller.getAllOrders
);

/** get order by id */
OrderRouter.route("/:id").get(
  userController.validateToken,
  controller.getOrderById
);

export default OrderRouter;
