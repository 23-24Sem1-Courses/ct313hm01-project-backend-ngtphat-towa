import Joi from "joi";
import {
  MissingRequiredParameterErrorResponse,
  JoiValidationError,
  AuthTokenNotPresentError,
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
export function parseAuthenticationToDTO<T>(
  req: Request,
  schema: Joi.ObjectSchema
): T {
  if (!req.headers.authorization) {
    throw new AuthTokenNotPresentError();
  }
  const { error, value } = schema.validate({
    token: req.headers.authorization?.split(" ")[1],
  });

  if (error) {
    throw new JoiValidationError(error);
  }

  return value as T;
}
