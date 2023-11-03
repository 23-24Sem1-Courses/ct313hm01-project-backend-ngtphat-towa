import { NextFunction, Request, Response } from "express";

/** findAllUser */
const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "findAllUser" });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "findAllUser" });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "register" });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "login" });
};

export default {
  findAllUsers,
  validateToken,
  register,
  login,
};
