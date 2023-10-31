import express from "express";
import controller from "../controllers/order.controller";
const OrderRouter = express.Router();

/** create-checkout-session */
OrderRouter.route("/create-checkout-sessio").get(controller.checkoutList);

/** place order */
OrderRouter.route("/placeOrder").get(controller.placeOrder);

/** get all order */
OrderRouter.route("/").get(controller.getAllOrders);

/** get order by id */
OrderRouter.route("/{id").get(controller.getOrderById);

export default OrderRouter;
