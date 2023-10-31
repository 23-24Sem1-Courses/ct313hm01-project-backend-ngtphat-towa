import { NextFunction, Request, Response } from "express";

/** /add */
const addToCart = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "add to cart " });
};

/** / */
/** parms token */
const getCartItems = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "get to cart " });
};

/** /update/{cartItemId} */
const updateCartItem = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "update to cart " });
};

/** /delete/{cartItemId} */
const deleteCartItem = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "delete to cart " });
};

export default {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
