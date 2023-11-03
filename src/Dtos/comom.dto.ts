import Joi from "joi";
import {
  MissingRequiredParameterErrorResponse,
  JoiValidationError,
} from "../common/api.error";
import { Request } from "express";
import Logging from "../common/Logging";

export function parseBodyToDTO<T>(req: Request, schema: Joi.ObjectSchema): T {
  if (!req.body) {
    throw new MissingRequiredParameterErrorResponse("Request body");
  }

  const { error, value } = schema.validate(req.body);

  if (error) {
    throw new JoiValidationError(error);
  }

  return value as T;
}
