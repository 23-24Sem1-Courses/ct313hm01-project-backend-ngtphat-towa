import Logging from "../common/Logging";
import ApiError from "../common/api.error";
import { Request, Response, NextFunction } from "express";

function methodNotAllowed(req: Request, res: Response, next: NextFunction) {
  if (req.route) {
    const httpMethods = Object.keys(req.route.methods)
      .filter((method) => method !== "_all")
      .map((method) => method.toUpperCase());
    return next(
      new ApiError(405, "Method Not Allowed", {
        Allow: httpMethods.join(", "),
      })
    );
  }
  return next();
}

function resourceNotFound(req: Request, res: Response, next: NextFunction) {
  return next(new ApiError(404, "Resource not found"));
}

function handleError(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logging.error(error);
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.statusCode || 500)
    .set(error.headers || {})
    .json({
      message: error.message || "Internal Server Error",
    });
}

export { methodNotAllowed, resourceNotFound, handleError };
