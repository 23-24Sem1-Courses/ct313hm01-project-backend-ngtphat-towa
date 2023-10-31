import { NextFunction, Request, Response } from "express";

/** /create-checkout-session */
const checkoutList = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "checkoutList" });
};

/** /add */
const placeOrder = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "placeOrder" });
};

/**  get all orders */
const getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getAllOrders" });
};

/** get orderitems for an order */
const getOrderById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getOrderById" });
};

export default {
  checkoutList,
  placeOrder,
  getAllOrders,
  getOrderById,
};
