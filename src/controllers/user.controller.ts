import { NextFunction, Request, Response } from "express";

/** findAllUser */
const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "findAllUser" });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "findAllUser" });
};

const signUp = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "signUp" });
};

const signIn = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "signIn" });
};

export default {
  findAllUsers,
  validateToken,
  signUp,
  signIn,
};
