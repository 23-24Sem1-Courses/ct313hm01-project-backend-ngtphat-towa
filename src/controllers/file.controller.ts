import { NextFunction, Request, Response } from "express";

/** handleFileUpload */
const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "handleFileUpload" });
};

/** getListFiles */
const getListFiles = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getListFiles" });
};

/** /files/{filename:.+} */
const getFile = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "getFile" });
};

export default {
  handleFileUpload,
  getListFiles,
  getFile,
};
