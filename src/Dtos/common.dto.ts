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

export function parseUserToDTO<T>(req: Request, schema: Joi.ObjectSchema): T {
  if (!req.body.user) {
    throw new MissingRequiredParameterErrorResponse("Request body");
  }

  const { error, value } = schema.validate(req.body.user);

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

export function parseBodyToDTOs<T>(
  req: Request,
  schema: Joi.ObjectSchema
): T[] {
  if (!req.body) {
    throw new MissingRequiredParameterErrorResponse("Request body");
  }

  // Ensure req.body is an array
  if (!Array.isArray(req.body)) {
    throw new TypeError("Request body must be an array");
  }

  return req.body.map((item) => {
    const { error, value } = schema.validate(item);

    if (error) {
      throw new JoiValidationError(error);
    }

    return value as T;
  });
}
export function parseParamsToDTO<T>(req: Request, schema: Joi.ObjectSchema): T {
  if (!req.params) {
    throw new MissingRequiredParameterErrorResponse("Request parameters");
  }
  const { error, value } = schema.validate(req.params);

  if (error) {
    throw new JoiValidationError(error);
  }

  return value as T;
}
