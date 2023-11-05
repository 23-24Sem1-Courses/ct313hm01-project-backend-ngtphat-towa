import { NextFunction, Request, Response } from "express";

/** /getWishList */
const getAll = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getWishList" });
};

/** /addWishList */
const addNew = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "addWishList" });
};

/** /removeWishList */
const remove = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "removeWishList" });
};

export default {
  getWishList: getAll,
  addWishList: addNew,
  removeWishlist: remove,
};
