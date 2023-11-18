import express from "express";
import controller from "../controllers/order.controller";
import userController from "../controllers/user.controller";
const OrderRouter = express.Router();

/// ------------ ADMIN
/** get all order */
OrderRouter.route("/admin").get(
  userController.validateToken,
  userController.validateAdminRole,
  controller.getAllOrders
);
/** update */
OrderRouter.route("/admin/update").get(
  userController.validateToken,
  userController.validateAdminRole,
  controller.updateOrderStatus
);
/** get  order by id */
OrderRouter.route("/admin/:id").get(
  userController.validateToken,
  userController.validateAdminRole,
  controller.getOrderById
);


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

/** get all user order*/
OrderRouter.route("/all").get(
  userController.validateToken,
  controller.getAllOrdersByUser
);

/** get user order by id */
OrderRouter.route("/:id").get(
  userController.validateToken,
  controller.getUserOrderById
);


export default OrderRouter;
