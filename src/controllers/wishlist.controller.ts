import { NextFunction, Request, Response } from "express";

/** /getWishList */
const getWishList = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getWishList" });
};

/** /addWishList */
const addWishList = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "addWishList" });
};

export default {
  getWishList,
  addWishList,
};
