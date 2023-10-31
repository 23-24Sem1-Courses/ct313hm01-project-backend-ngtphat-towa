import { NextFunction, Request, Response } from "express";

/** all */
const getCategories = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "get all categories " });
};
const getCategoryById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getCategoryById " });
};

/** create */
const createCategory = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "createCategory" });
};

/** update/:id */
const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "updateCategory" });
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  getCategoryById,
};
