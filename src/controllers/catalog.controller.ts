import { NextFunction, Request, Response } from "express";

const getItemAll = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Get all items" });
};

const getItemById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Get by id" });
};

const searchByKerword = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Get by id" });
};

const createItem = (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({ message: "Item created successfully" });
};

const updateItem = (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({ message: "Item updated successfully" });
};

const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({ message: "Item deleted successfully" });
};

const deleteAllItems = (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({ message: "All items deleted successfully" });
};

export default {
  getItemAll,
  getItemById,
  searchByKerword,
  createItem,
  updateItem,
  deleteItem,
  deleteAllItems,
};
