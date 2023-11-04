import Logging from "../common/Logging";
import ApiError, {
  MethodNotAllowedErrorResponse,
  ResourceNotFoundErrorResponse,
} from "../common/api.error";
import { Request, Response, NextFunction } from "express";

function methodNotAllowed(req: Request, res: Response, next: NextFunction) {
  if (req.route) {
    const httpMethods = Object.keys(req.route.methods)
      .filter((method) => method !== "_all")
      .map((method) => method.toUpperCase());
    return next(new MethodNotAllowedErrorResponse(httpMethods));
  }
  return next();
}

function resourceNotFound(req: Request, res: Response, next: NextFunction) {
  return next(new ResourceNotFoundErrorResponse());
}

function handleError(
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logging.error(error);
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ApiError) {
    return handleApiError(error, res);
  } else {
    return handleGenericError(res);
  }
}
function handleGenericError(res: Response) {
  return res.status(500).json({});
}
function handleApiError(error: ApiError, res: Response) {
  if (error.details !== null && error.details?.length! > 0) {
    return res
      .status(error.statusCode || 500)
      .set(error.headers || {})
      .json({
        message: error.message || "Internal Server Error",
        details: error.details,
      });
  } else {
    return res
      .status(error.statusCode || 500)
      .set(error.headers || {})
      .json({
        message: error.message || "Internal Server Error",
      });
  }
}

export { methodNotAllowed, resourceNotFound, handleError };
